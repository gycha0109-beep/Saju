import { describe, expect, test } from 'vitest';
import {
  calculateCanonicalSajuSnapshot,
  deriveStructuralRelationCandidates,
  STRUCTURAL_RELATION_DEFINITION_CONTENT_HASH,
  STRUCTURAL_RELATION_DERIVATION_VERSION,
  type CalculationPolicySnapshot,
  type PillarFact,
} from '../src/index.js';
import { BRANCH_CLASH_CONTEXT_ENRICHED_CANONICAL_SCHEMA_VERSION } from '../src/calculation/branch-clash-context-facts.js';
import { STRUCTURAL_RELATION_ENRICHED_CANONICAL_SCHEMA_VERSION } from '../src/calculation/structural-relation-facts.js';

const policy: CalculationPolicySnapshot = {
  policyId: 'myeonghwa/structural-relation-materialization-test',
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

const knownInput = {
  calendarType: 'solar' as const,
  date: { year: 2024, month: 3, day: 10 },
  time: { known: true as const, hour: 12, minute: 0 },
  sexForTraditionalCalculation: 'unspecified' as const,
};

function pillar(state: { status: string; value?: PillarFact }, slot: string): PillarFact {
  if (state.status !== 'resolved' || state.value === undefined) {
    throw new Error(`expected resolved ${slot} pillar`);
  }
  return state.value;
}

describe('structural relation candidate materialization', () => {
  test('known-time canonical snapshots materialize the existing structural candidate derivation exactly', () => {
    const snapshot = calculateCanonicalSajuSnapshot(knownInput, policy);
    const state = snapshot.derivedFacts.structuralRelations;
    expect(state?.status).toBe('resolved');
    if (state?.status !== 'resolved') throw new Error('structural relations not resolved');

    const expected = deriveStructuralRelationCandidates({
      year: pillar(snapshot.pillars.year, 'year'),
      month: pillar(snapshot.pillars.month, 'month'),
      day: pillar(snapshot.pillars.day, 'day'),
      hour: pillar(snapshot.pillars.hour, 'hour'),
    });
    expect(state.value).toEqual(expected);
    expect(snapshot.completeness.resolvedPaths).toContain('derivedFacts.structuralRelations');
  });

  test('materialized candidates remain structural matches and never claim transformation', () => {
    const snapshot = calculateCanonicalSajuSnapshot(knownInput, policy);
    const state = snapshot.derivedFacts.structuralRelations;
    if (state?.status !== 'resolved') throw new Error('structural relations not resolved');
    for (const relation of state.value) {
      expect(relation.semantics).toEqual({
        structuralMatchOnly: true,
        transformationEstablished: false,
      });
      expect(relation.sourceIds.length).toBeGreaterThan(0);
    }
  });

  test('structural relation stage is v1.2 while the final canonical schema advances independently', () => {
    const snapshot = calculateCanonicalSajuSnapshot(knownInput, policy);
    expect(STRUCTURAL_RELATION_ENRICHED_CANONICAL_SCHEMA_VERSION).toBe('saju-canonical-v1.2');
    expect(snapshot.schemaVersion).toBe(BRANCH_CLASH_CONTEXT_ENRICHED_CANONICAL_SCHEMA_VERSION);
    expect(snapshot.schemaVersion).toBe('saju-canonical-v1.3');
    expect(snapshot.provenance.schema.version).toBe('saju-canonical-v1.3');
    expect(STRUCTURAL_RELATION_DERIVATION_VERSION).toBe('myeonghwa-structural-relations-v1');
    expect(STRUCTURAL_RELATION_DEFINITION_CONTENT_HASH).toMatch(/^[0-9a-f]{64}$/);

    const dataset = snapshot.provenance.datasets?.find(
      (item) => item.name === 'myeonghwa-structural-relation-candidates',
    );
    expect(dataset?.version).toBe(STRUCTURAL_RELATION_DERIVATION_VERSION);
    expect(dataset?.notes).toContain(STRUCTURAL_RELATION_DEFINITION_CONTENT_HASH);
    expect(dataset?.notes).toContain('Structural matching only');
  });

  test('unknown birth time fails closed rather than presenting an incomplete four-pillar relation set as complete', () => {
    const snapshot = calculateCanonicalSajuSnapshot(
      { ...knownInput, time: { known: false as const } },
      policy,
    );
    const state = snapshot.derivedFacts.structuralRelations;
    expect(state?.status).toBe('unavailable');
    if (state?.status === 'unavailable') {
      expect(state.reasonCode).toBe('structural-relations-require-fully-resolved-four-pillars');
    }
    expect(snapshot.completeness.unavailablePaths).toContain('derivedFacts.structuralRelations');
    expect(snapshot.completeness.fullyResolved).toBe(false);
  });

  test('unknown-time scenarios are rebound to the final snapshot identity without fabricating relation overrides', () => {
    const snapshot = calculateCanonicalSajuSnapshot(
      {
        calendarType: 'solar',
        date: { year: 2024, month: 2, day: 4 },
        time: { known: false as const },
        sexForTraditionalCalculation: 'unspecified' as const,
      },
      { ...policy, dayBoundary: 'jasi' },
    );
    expect(snapshot.scenarios.length).toBeGreaterThan(1);
    for (const [index, scenario] of snapshot.scenarios.entries()) {
      expect(scenario.snapshotId).toBe(snapshot.snapshotId);
      expect(scenario.scenarioId).toBe(`${snapshot.snapshotId}:scenario:${index + 1}`);
      expect(
        scenario.factOverrides.some((override) => override.path === 'derivedFacts.structuralRelations'),
      ).toBe(false);
    }
  });

  test('structural relation enrichment remains deterministic across audit timestamps', () => {
    const first = calculateCanonicalSajuSnapshot(knownInput, policy, {
      now: new Date('2026-08-25T00:00:00.000Z'),
    });
    const second = calculateCanonicalSajuSnapshot(knownInput, policy, {
      now: new Date('2026-08-26T00:00:00.000Z'),
    });
    expect(first.snapshotId).toBe(second.snapshotId);
    expect(first.calculationHash).toBe(second.calculationHash);
    expect(first.derivedFacts.structuralRelations).toEqual(second.derivedFacts.structuralRelations);
    expect(first.createdAt).not.toBe(second.createdAt);
  });
});
