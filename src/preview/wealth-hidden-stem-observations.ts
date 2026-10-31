import type {
  CanonicalSajuSnapshot, EarthlyBranch, HeavenlyStem, PillarSlot,
} from '../contracts/calculation.js';
import {
  getHiddenStemMembership,
  HIDDEN_STEM_MEMBERSHIP_SOURCE,
} from '../calculation/hidden-stems.js';
import { deriveAnnualStemTenGod } from '../reading/annual-interpretation-facts.js';

/**
 * Canonical hidden-stem MEMBERSHIP observations only. A hidden wealth stem
 * does not prove a strong, active, favourable, or even usable Wealth T5/T8
 * interpretation. Do not use this output to satisfy a T8 rule input.
 */
export interface WealthHiddenStemObservation {
  pillar: PillarSlot;
  branch: EarthlyBranch;
  hiddenStem: HeavenlyStem;
  derivedTenGod: '편재' | '정재';
  factPaths: readonly [string, string];
  membershipSourceUrl: string;
  meaningAuthority: 'calculated_membership_only';
  wealthConclusionAuthorized: false;
}

const SLOTS = ['year', 'month', 'day', 'hour'] as const satisfies readonly PillarSlot[];

export function observeHiddenWealthMembership(
  snapshot: CanonicalSajuSnapshot,
): readonly WealthHiddenStemObservation[] {
  const master = snapshot.derivedFacts.dayMaster;
  const hidden = snapshot.derivedFacts.hiddenStems;
  if (!snapshot.completeness.birthTimeKnown ||
      master.status !== 'resolved' || hidden === undefined) return [];

  const observations: WealthHiddenStemObservation[] = [];
  for (const pillar of SLOTS) {
    const state = snapshot.pillars[pillar];
    const members = hidden[pillar];
    if (state.status !== 'resolved' || members.status !== 'resolved') continue;
    const canonical = getHiddenStemMembership(state.value.branch.value);
    if (members.value.length !== canonical.length ||
        members.value.some(stem => !canonical.includes(stem))) {
      throw new TypeError('Hidden wealth observation requires actual canonical branch membership');
    }
    for (const stem of members.value) {
      const tenGod = deriveAnnualStemTenGod(master.value, stem);
      if (tenGod !== '편재' && tenGod !== '정재') continue;
      observations.push({
        pillar,
        branch: state.value.branch.value,
        hiddenStem: stem,
        derivedTenGod: tenGod,
        factPaths: ['derivedFacts.dayMaster', `derivedFacts.hiddenStems.${pillar}`],
        membershipSourceUrl: HIDDEN_STEM_MEMBERSHIP_SOURCE.url,
        meaningAuthority: 'calculated_membership_only',
        wealthConclusionAuthorized: false,
      });
    }
  }
  return observations;
}
