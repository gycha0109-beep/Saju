import { describe, expect, test } from 'vitest';
import {
  ENRICHED_CANONICAL_SCHEMA_VERSION,
  HIDDEN_STEM_MEMBERSHIP,
  HIDDEN_STEM_MEMBERSHIP_CONTENT_HASH,
  HIDDEN_STEM_MEMBERSHIP_SOURCE,
  calculateCanonicalSajuSnapshot,
  getHiddenStemMembership,
  type CalculationPolicySnapshot,
  type EarthlyBranch,
  type HeavenlyStem,
  type PillarFact,
} from '../src/index.js';
import { BRANCH_CLASH_CONTEXT_ENRICHED_CANONICAL_SCHEMA_VERSION } from '../src/calculation/branch-clash-context-facts.js';
import { STRUCTURAL_RELATION_ENRICHED_CANONICAL_SCHEMA_VERSION } from '../src/calculation/structural-relation-facts.js';

const EXPECTED_MEMBERSHIP: Readonly<Record<EarthlyBranch, readonly HeavenlyStem[]>> = {
  자: ['계'],
  축: ['기', '신', '계'],
  인: ['갑', '병', '무'],
  묘: ['을'],
  진: ['을', '무', '계'],
  사: ['병', '무', '경'],
  오: ['정', '기'],
  미: ['을', '정', '기'],
  신: ['무', '경', '임'],
  유: ['신'],
  술: ['정', '무', '신'],
  해: ['갑', '임'],
};

const policy: CalculationPolicySnapshot = {
  policyId: 'myeonghwa/hidden-stem-test',
  policyVersion: '1.0.0',
  dayBoundary: 'midnight',
  trueSolarTime: {
    enabled: false,
    longitudeSource: 'not-applicable',
    applyEquationOfTime: false,
    applyHistoricalDst: false,
  },
  timeZonePolicy: { source: 'service-default', timeZone: 'Asia/Seoul' },
  unknownBirthTimePolicy: 'preserve-unknown-and-enumerate-boundaries',
};

function knownInput() {
  return {
    calendarType: 'solar' as const,
    date: { year: 2024, month: 3, day: 10 },
    time: { known: true as const, hour: 12, minute: 0 },
    sexForTraditionalCalculation: 'unspecified' as const,
  };
}

function resolvedPillarBranch(pillar: { status: string; value?: PillarFact }): EarthlyBranch {
  if (pillar.status !== 'resolved' || pillar.value === undefined) {
    throw new Error(`expected resolved pillar, got ${pillar.status}`);
  }
  return pillar.value.branch.value;
}

describe('hidden-stem structural enrichment', () => {
  test('all 12 branch memberships match the source-backed membership table', () => {
    for (const branch of Object.keys(EXPECTED_MEMBERSHIP) as EarthlyBranch[]) {
      expect(getHiddenStemMembership(branch), branch).toEqual(EXPECTED_MEMBERSHIP[branch]);
      expect(HIDDEN_STEM_MEMBERSHIP[branch], branch).toEqual(EXPECTED_MEMBERSHIP[branch]);
    }
    expect(HIDDEN_STEM_MEMBERSHIP_CONTENT_HASH).toMatch(/^[0-9a-f]{64}$/);
  });

  test('source scope explicitly forbids treating storage order as strength weighting', () => {
    expect(HIDDEN_STEM_MEMBERSHIP_SOURCE.scope).toContain('membership only');
    expect(HIDDEN_STEM_MEMBERSHIP_SOURCE.scope).toContain('must not be interpreted');
  });

  test('known-time public snapshots preserve hidden stems through the final canonical schema', () => {
    const snapshot = calculateCanonicalSajuSnapshot(knownInput(), policy);
    expect(ENRICHED_CANONICAL_SCHEMA_VERSION).toBe('saju-canonical-v1.1');
    expect(STRUCTURAL_RELATION_ENRICHED_CANONICAL_SCHEMA_VERSION).toBe('saju-canonical-v1.2');
    expect(snapshot.schemaVersion).toBe(BRANCH_CLASH_CONTEXT_ENRICHED_CANONICAL_SCHEMA_VERSION);
    expect(snapshot.schemaVersion).toBe('saju-canonical-v1.3');
    expect(snapshot.provenance.schema.version).toBe(BRANCH_CLASH_CONTEXT_ENRICHED_CANONICAL_SCHEMA_VERSION);
    expect(snapshot.derivedFacts.hiddenStems).toBeDefined();

    const hidden = snapshot.derivedFacts.hiddenStems;
    if (hidden === undefined) throw new Error('hidden stems missing from enriched snapshot');
    for (const slot of ['year', 'month', 'day', 'hour'] as const) {
      const state = hidden[slot];
      expect(state.status).toBe('resolved');
      if (state.status === 'resolved') {
        const branch = resolvedPillarBranch(snapshot.pillars[slot]);
        expect(state.value).toEqual(EXPECTED_MEMBERSHIP[branch]);
      }
      expect(snapshot.completeness.resolvedPaths).toContain(`derivedFacts.hiddenStems.${slot}`);
    }

    const dataset = snapshot.provenance.datasets?.find(
      (item) => item.name === 'myeonghwa-hidden-stem-membership',
    );
    expect(dataset?.notes).toContain(HIDDEN_STEM_MEMBERSHIP_CONTENT_HASH);
  });

  test('unknown hour stays unavailable while invariant hidden stems remain available', () => {
    const snapshot = calculateCanonicalSajuSnapshot(
      { ...knownInput(), time: { known: false } },
      policy,
    );
    const hidden = snapshot.derivedFacts.hiddenStems;
    if (hidden === undefined) throw new Error('hidden stems missing from enriched snapshot');

    expect(hidden.year.status).toBe('resolved');
    expect(hidden.month.status).toBe('resolved');
    expect(hidden.day.status).toBe('resolved');
    expect(hidden.hour.status).toBe('unavailable');
    expect(snapshot.completeness.unavailablePaths).toContain('derivedFacts.hiddenStems.hour');
  });

  test('scenario overrides propagate day master, void branches, and hidden stems with day changes', () => {
    const snapshot = calculateCanonicalSajuSnapshot(
      {
        calendarType: 'solar',
        date: { year: 2024, month: 2, day: 4 },
        time: { known: false },
        sexForTraditionalCalculation: 'unspecified',
      },
      { ...policy, dayBoundary: 'jasi' },
    );

    expect(snapshot.scenarios.length).toBeGreaterThan(1);
    for (const scenario of snapshot.scenarios) {
      const dayOverride = scenario.factOverrides.find((item) => item.path === 'pillars.day');
      if (dayOverride === undefined) continue;
      const day = dayOverride.value as PillarFact;
      const dayMaster = scenario.factOverrides.find(
        (item) => item.path === 'derivedFacts.dayMaster',
      );
      const voidBranches = scenario.factOverrides.find(
        (item) => item.path === 'derivedFacts.voidBranches',
      );
      const hiddenStems = scenario.factOverrides.find(
        (item) => item.path === 'derivedFacts.hiddenStems.day',
      );

      expect(dayMaster?.value).toEqual(day.stem);
      expect(voidBranches).toBeDefined();
      expect(hiddenStems?.value).toEqual(EXPECTED_MEMBERSHIP[day.branch.value]);
    }
  });

  test('enriched calculation identity is stable across audit timestamps', () => {
    const first = calculateCanonicalSajuSnapshot(knownInput(), policy, {
      now: new Date('2026-08-19T00:00:00.000Z'),
    });
    const second = calculateCanonicalSajuSnapshot(knownInput(), policy, {
      now: new Date('2026-08-20T00:00:00.000Z'),
    });

    expect(first.snapshotId).toBe(second.snapshotId);
    expect(first.calculationHash).toBe(second.calculationHash);
    expect(first.derivedFacts.hiddenStems).toEqual(second.derivedFacts.hiddenStems);
    expect(first.createdAt).not.toBe(second.createdAt);
  });
});
