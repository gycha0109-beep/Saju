import { describe, expect, it } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { HIDDEN_STEM_MEMBERSHIP_SOURCE, getHiddenStemMembership } from '../src/calculation/hidden-stems.js';
import { resolved } from '../src/contracts/common.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import { deriveAnnualStemTenGod } from '../src/reading/annual-interpretation-facts.js';
import { observeHiddenWealthMembership } from '../src/preview/wealth-hidden-stem-observations.js';
import {
  projectSnapshotBoundHiddenStemTenGodOccurrences,
  SNAPSHOT_BOUND_HIDDEN_STEM_TEN_GOD_OCCURRENCE_AUTHORITY,
} from '../src/research/snapshot-bound-hidden-stem-ten-god-occurrences.js';

const NOW = new Date('2026-10-25T00:00:00.000Z');
function sample(month: number, day: number, known = true) {
  return calculateCanonicalSajuSnapshot({
    calendarType: 'solar',
    date: { year: 1981, month, day },
    time: known ? { known: true, hour: 13, minute: 52 } : { known: false },
    sexForTraditionalCalculation: 'male',
  }, PRODUCTION_DEFAULT_CALCULATION_POLICY, { now: NOW });
}

describe('source-grounded hidden wealth membership; not a new interpretation', () => {
  it('reports only real hidden stems and their deterministic day-master Ten-God, without T8 authority', () => {
    let positive = 0;
    for (const month of [1, 2, 4, 6, 8, 10, 12]) {
      const snapshot = sample(month, 10);
      const memberships = observeHiddenWealthMembership(snapshot);
      const r27 = projectSnapshotBoundHiddenStemTenGodOccurrences(snapshot);
      expect(r27.status).toBe('resolved');
      if (r27.status !== 'resolved') continue;
      expect(memberships).toEqual(
        r27.projection.occurrences
          .filter(member => member.tenGod === '편재' || member.tenGod === '정재')
          .map(member => ({
            pillar: member.pillarSlot,
            branch: member.branch,
            hiddenStem: member.hiddenStem,
            derivedTenGod: member.tenGod,
            factPaths: ['derivedFacts.dayMaster', member.sourceFactRef],
            sourcePillarRef: member.sourcePillarRef,
            occurrenceId: member.occurrenceId,
            membershipSourceUrl: HIDDEN_STEM_MEMBERSHIP_SOURCE.url,
            mappingAuthorityDefinitionHash:
              SNAPSHOT_BOUND_HIDDEN_STEM_TEN_GOD_OCCURRENCE_AUTHORITY.definitionHash,
            meaningAuthority: 'calculated_membership_only',
            wealthConclusionAuthorized: false,
          })),
      );
      const master = snapshot.derivedFacts.dayMaster;
      expect(master.status).toBe('resolved');
      if (master.status !== 'resolved') continue;
      const slots = ['year', 'month', 'day', 'hour'] as const;
      for (const observation of memberships) {
        positive++;
        const branchState = snapshot.pillars[observation.pillar];
        expect(branchState.status).toBe('resolved');
        if (branchState.status !== 'resolved') continue;
        expect(observation.branch).toBe(branchState.value.branch.value);
        expect(getHiddenStemMembership(observation.branch))
          .toContain(observation.hiddenStem);
        expect(observation.derivedTenGod).toBe(
          deriveAnnualStemTenGod(master.value, observation.hiddenStem));
        expect(['편재', '정재']).toContain(observation.derivedTenGod);
        expect(observation.factPaths).toEqual([
          'derivedFacts.dayMaster', `derivedFacts.hiddenStems.${observation.pillar}`,
        ]);
        expect(observation.membershipSourceUrl).toBe(HIDDEN_STEM_MEMBERSHIP_SOURCE.url);
        expect(observation.sourcePillarRef).toBe(`pillars.${observation.pillar}`);
        expect(observation.occurrenceId).toBe(
          `${observation.pillar}:${observation.hiddenStem}`);
        expect(observation.mappingAuthorityDefinitionHash).toBe(
          SNAPSHOT_BOUND_HIDDEN_STEM_TEN_GOD_OCCURRENCE_AUTHORITY.definitionHash);
        expect(SNAPSHOT_BOUND_HIDDEN_STEM_TEN_GOD_OCCURRENCE_AUTHORITY
          .narrativeMaterialityAuthorized).toBe(false);
        expect(observation.wealthConclusionAuthorized).toBe(false);
        expect(observation.meaningAuthority).toBe('calculated_membership_only');
        expect(slots).toContain(observation.pillar);
      }
    }
    expect(positive).toBeGreaterThan(0);
  });

  it('keeps unknown birth hour unresolved and rejects invented hidden-stem membership', () => {
    const unknown = sample(2, 1, false);
    expect(observeHiddenWealthMembership(unknown)).toHaveLength(0);
    const snapshot = sample(2, 1);
    const hidden = snapshot.derivedFacts.hiddenStems!;
    const forged = {
      ...snapshot,
      derivedFacts: {
        ...snapshot.derivedFacts,
        hiddenStems: { ...hidden,
          year: resolved(['갑', '을', '병', '정'] as const),
        },
      },
    };
    expect(() => observeHiddenWealthMembership(forged))
      .toThrow('actual canonical branch membership');
    const withUnmaterializedScenarios = sample(2, 1);
    withUnmaterializedScenarios.scenarios = [{
      scenarioId: 'not-materialized', snapshotId: withUnmaterializedScenarios.snapshotId,
      factOverrides: [], reasonRefs: ['unresolved'],
    }];
    expect(observeHiddenWealthMembership(withUnmaterializedScenarios)).toEqual([]);
    const inconsistentMaster = sample(2, 1);
    if (inconsistentMaster.derivedFacts.dayMaster.status !== 'resolved')
      throw new Error('expected day master');
    inconsistentMaster.derivedFacts.dayMaster = resolved({
      ...inconsistentMaster.derivedFacts.dayMaster.value,
      value: inconsistentMaster.derivedFacts.dayMaster.value.value === '갑' ? '을' : '갑',
    });
    expect(() => observeHiddenWealthMembership(inconsistentMaster))
      .toThrow('actual canonical branch membership');
  });
});
