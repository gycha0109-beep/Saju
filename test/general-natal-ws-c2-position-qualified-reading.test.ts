import { describe, expect, it } from 'vitest';
import type { TenGod } from '../src/contracts/calculation.js';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import {
  GENERAL_NATAL_POSITION_QUALIFIED_T5_RULES,
  GENERAL_NATAL_POSITION_QUALIFIED_RESEARCH_PACK,
  createGeneralNatalPositionQualifiedResearchRegistry,
} from '../src/interpretation/general-natal-position-qualified-reading.js';
import {
  createGeneralNatalIntegratedReadingRegistry,
} from '../src/interpretation/general-natal-integrated-reading-registry.js';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { buildReadingCompositionEvidence } from '../src/reading/reading-intent-composition.js';
import { inspectMyeonghwaProductionComposition } from '../src/production/production-composition.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';

const now = new Date('2026-10-11T00:00:00.000Z');
const chartDates = [
  { year: 1984, month: 6, day: 14 },
  { year: 1984, month: 2, day: 6 },
  { year: 2024, month: 3, day: 10 },
] as const;
const FAMILIES: Readonly<Record<string, readonly TenGod[]>> = {
  PEER: ['비견', '겁재'],
  RESOURCE: ['편인', '정인'],
  OUTPUT: ['식신', '상관'],
  WEALTH: ['편재', '정재'],
  OFFICER: ['편관', '정관'],
};
const PATHS = [
  'year.stem', 'month.stem', 'hour.stem',
  'year.branch', 'month.branch', 'day.branch', 'hour.branch',
] as const;

function chart(date: (typeof chartDates)[number]) {
  return calculateCanonicalSajuSnapshot({
    calendarType: 'solar',
    date,
    time: { known: true, hour: 5, minute: 30 },
    sexForTraditionalCalculation: 'male',
  }, PRODUCTION_DEFAULT_CALCULATION_POLICY, { now });
}

describe('WS-C2 positional Ten-God T5 lineage through existing T8', () => {
  it('defines exactly 35 exact-slot variants without adding new consumer meanings', () => {
    expect(GENERAL_NATAL_POSITION_QUALIFIED_T5_RULES).toHaveLength(35);
    for (const rule of GENERAL_NATAL_POSITION_QUALIFIED_T5_RULES) {
      expect(rule.taxonomy.tier).toBe('T5');
      expect(rule.status).toBe('research');
      expect(rule.inputs).toHaveLength(1);
      expect(rule.inputs[0]?.pathOrClaimType).toMatch(
        /^derivedFacts\.tenGods\.(year|month|day|hour)\.(stem|branch)$/u,
      );
      expect(rule.condition.op).toBe('in');
      expect(rule.output.predicate).toBe('ten_god_theme');
      expect(rule.output.value).not.toHaveProperty('positionMeaning');
      expect(rule.output.value).not.toHaveProperty('fortuneScore');
    }
    expect(GENERAL_NATAL_POSITION_QUALIFIED_RESEARCH_PACK.status).toBe('research');
  });

  it.each(chartDates)(
    'actual chart $year-$month-$day: T5 binds exact positions and T8 consumes every matching witness',
    (date) => {
      const snapshot = chart(date);
      const snapshotHash = deterministicContentHash(snapshot);
      expect(snapshot.derivedFacts.tenGods.status).toBe('resolved');
      if (snapshot.derivedFacts.tenGods.status !== 'resolved') return;
      const positions = snapshot.derivedFacts.tenGods.value;
      const registry = createGeneralNatalPositionQualifiedResearchRegistry();
      const execution = runInterpretation(snapshot, registry, { now });
      const baseline = runInterpretation(
        snapshot, createGeneralNatalIntegratedReadingRegistry(), { now },
      );
      expect(runInterpretation(snapshot, registry, { now })).toEqual(execution);

      const positionClaims = execution.claims.filter((claim) =>
        claim.taxonomy.tier === 'T5' && claim.predicate === 'ten_god_theme',
      );
      const allExpected: string[] = [];
      for (const path of PATHS) {
        const [pillar, channel] = path.split('.') as [
          keyof typeof positions, 'stem' | 'branch',
        ];
        const position = positions[pillar][channel];
        expect(position.status).toBe('resolved');
        if (position.status !== 'resolved') continue;
        const family = Object.entries(FAMILIES).find(([, gods]) =>
          gods.includes(position.value as TenGod),
        )?.[0];
        expect(family).toBeDefined();
        if (family === undefined) continue;
        const normalizedChannel = channel === 'stem' ? 'VISIBLE_STEMS' : 'BRANCHES';
        const claimType = `TEN_GOD_${family}_${normalizedChannel}_THEME`;
        const ref = `derivedFacts.tenGods.${path}`;
        const matched = positionClaims.filter((claim) =>
          claim.claimType === claimType && claim.factRefs.length === 1 &&
          claim.factRefs[0] === ref,
        );
        expect(matched).toHaveLength(1);
        allExpected.push(matched[0]!.claimId);

        const t8Type = `GENERAL_NATAL_${family}_${normalizedChannel}_THEME`;
        const t8 = execution.claims.filter((claim) => claim.claimType === t8Type);
        expect(t8).toHaveLength(1);
        expect(t8[0]?.upstreamClaimRefs).toContain(matched[0]?.claimId);
        expect(t8[0]?.methodologyRef).not.toEqual(matched[0]?.methodologyRef);
      }
      expect(positionClaims).toHaveLength(allExpected.length);
      expect(new Set(allExpected).size).toBe(allExpected.length);

      // The T8 semantic values stay identical; only their upstream fact
      // attribution becomes exact. No new position-specific conclusion.
      const oldThemes = baseline.claims
        .filter((claim) => claim.predicate === 'consumer_theme')
        .map((claim) => ({ claimType: claim.claimType, value: claim.value }))
        .sort((a, b) => a.claimType.localeCompare(b.claimType));
      const newThemes = execution.claims
        .filter((claim) => claim.predicate === 'consumer_theme')
        .map((claim) => ({ claimType: claim.claimType, value: claim.value }))
        .sort((a, b) => a.claimType.localeCompare(b.claimType));
      expect(newThemes).toEqual(oldThemes);

      const selection = buildReadingCompositionEvidence(snapshot, execution, registry, {
        requestId: 'ws-c2-' + date.month + '-' + date.day,
        intent: { domain: 'general', temporalScope: 'natal' },
      });
      expect(selection.selection.coverageState).toBe('complete');
      expect(selection.selection.missingRequirements).toEqual([]);
      expect(deterministicContentHash(snapshot)).toBe(snapshotHash);
    },
  );

  it('retains default Preview registry and refuses Production authority', () => {
    const oldRegistry = createGeneralNatalIntegratedReadingRegistry();
    const newRegistry = createGeneralNatalPositionQualifiedResearchRegistry();
    expect(oldRegistry.rules.filter((rule) =>
      rule.ruleSetId === 'general-natal-useful-ten-god-family-theme',
    )).toHaveLength(10);
    expect(newRegistry.rules.filter((rule) =>
      rule.ruleSetId === 'general-natal-useful-ten-god-family-theme',
    )).toHaveLength(35);
    expect(oldRegistry.rules.some((rule) => rule.ruleId.includes('-POSITION-'))).toBe(false);

    const production = inspectMyeonghwaProductionComposition({ registry: newRegistry });
    expect(production.status).toBe('blocked');
    if (production.status !== 'blocked') throw new Error('C2 remains research-only');
    expect(production.blockers).toContainEqual(
      expect.objectContaining({ code: 'INTERPRETATION_PACK_NOT_PRODUCTION' }),
    );
  });
});
