import { describe, expect, test } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import {
  STEM_FIVE_COMBINATION_SETTLEMENT_POLICY_CONTENT_HASH,
} from '../src/calculation/stem-interaction-settlement.js';
import {
  STEM_INTERACTION_SETTLEMENT_SCHEMA_VERSION,
} from '../src/calculation/stem-interaction-settlement-facts.js';

const knownInput = {
  calendarType: 'solar' as const,
  date: { year: 1992, month: 10, day: 24 },
  time: { known: true as const, hour: 5, minute: 30 },
  sexForTraditionalCalculation: 'unspecified' as const,
};

describe('R190 stem interaction settlement materialization', () => {
  test('known-time snapshots materialize the generalized settlement fact and v1.6 schema', () => {
    const snapshot = calculateCanonicalSajuSnapshot(
      knownInput,
      PRODUCTION_DEFAULT_CALCULATION_POLICY,
    );
    expect(snapshot.derivedFacts.stemInteractionSettlements?.status).toBe('resolved');
    expect(snapshot.completeness.resolvedPaths).toContain(
      'derivedFacts.stemInteractionSettlements',
    );
    expect(snapshot.schemaVersion).toBe(STEM_INTERACTION_SETTLEMENT_SCHEMA_VERSION);
    expect(snapshot.schemaVersion).toBe('saju-canonical-v1.6');
    expect(snapshot.provenance.schema.version).toBe('saju-canonical-v1.6');

    const dataset = snapshot.provenance.datasets?.find(
      (item) => item.name === 'myeongha-stem-five-combination-settlement-policy',
    );
    expect(dataset?.notes).toContain(
      STEM_FIVE_COMBINATION_SETTLEMENT_POLICY_CONTENT_HASH,
    );
    expect(dataset?.notes).toContain('MyeongHa V1 product convention');
    expect(dataset?.notes).toContain('extends=GH-2219');
  });

  test('existing structural candidates remain structural-only after settlement enrichment', () => {
    const snapshot = calculateCanonicalSajuSnapshot(
      knownInput,
      PRODUCTION_DEFAULT_CALCULATION_POLICY,
    );
    const relations = snapshot.derivedFacts.structuralRelations;
    if (relations?.status !== 'resolved') throw new Error('relations missing');
    for (const relation of relations.value) {
      expect(relation.semantics).toEqual({
        structuralMatchOnly: true,
        transformationEstablished: false,
      });
    }
  });

  test('unknown birth time fails closed through the upstream structural-relation dependency', () => {
    const snapshot = calculateCanonicalSajuSnapshot(
      { ...knownInput, time: { known: false as const } },
      PRODUCTION_DEFAULT_CALCULATION_POLICY,
    );
    const settlements = snapshot.derivedFacts.stemInteractionSettlements;
    expect(settlements?.status).toBe('unavailable');
    if (settlements?.status === 'unavailable') {
      expect(settlements.reasonCode).toBe(
        'stem-interaction-settlement-requires-resolved-structural-relations',
      );
    }
  });

  test('settlement enrichment remains deterministic across audit timestamps', () => {
    const first = calculateCanonicalSajuSnapshot(
      knownInput,
      PRODUCTION_DEFAULT_CALCULATION_POLICY,
      { now: new Date('2026-10-05T00:00:00.000Z') },
    );
    const second = calculateCanonicalSajuSnapshot(
      knownInput,
      PRODUCTION_DEFAULT_CALCULATION_POLICY,
      { now: new Date('2026-10-06T00:00:00.000Z') },
    );

    expect(first.snapshotId).toBe(second.snapshotId);
    expect(first.calculationHash).toBe(second.calculationHash);
    expect(first.derivedFacts.stemInteractionSettlements).toEqual(
      second.derivedFacts.stemInteractionSettlements,
    );
  });
});
