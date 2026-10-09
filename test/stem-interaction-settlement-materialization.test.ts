import { describe, expect, test } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import {
  STEM_FIVE_COMBINATION_SETTLEMENT_POLICY_CONTENT_HASH,
  STEM_THIRD_PARTY_INTERFERENCE_POLICY_CONTENT_HASH,
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

describe('R191 stem interaction settlement materialization', () => {
  test('known-time snapshots materialize network-aware settlement facts and v1.7 schema', () => {
    const snapshot = calculateCanonicalSajuSnapshot(
      knownInput,
      PRODUCTION_DEFAULT_CALCULATION_POLICY,
    );
    expect(snapshot.derivedFacts.stemInteractionSettlements?.status).toBe('resolved');
    expect(snapshot.completeness.resolvedPaths).toContain(
      'derivedFacts.stemInteractionSettlements',
    );
    expect(snapshot.schemaVersion).toBe(STEM_INTERACTION_SETTLEMENT_SCHEMA_VERSION);
    expect(snapshot.schemaVersion).toBe('saju-canonical-v1.7');
    expect(snapshot.provenance.schema.version).toBe('saju-canonical-v1.7');

    const pairPolicy = snapshot.provenance.datasets?.find(
      (item) => item.name === 'myeongha-stem-five-combination-settlement-policy',
    );
    expect(pairPolicy?.notes).toContain(
      STEM_FIVE_COMBINATION_SETTLEMENT_POLICY_CONTENT_HASH,
    );

    const networkPolicy = snapshot.provenance.datasets?.find(
      (item) => item.name === 'myeongha-stem-third-party-interference-policy',
    );
    expect(networkPolicy?.notes).toContain(
      STEM_THIRD_PARTY_INTERFERENCE_POLICY_CONTENT_HASH,
    );
    expect(networkPolicy?.notes).toContain('extends=GH-2230');
  });

  test('materialized settlements, when present, carry base/final network state', () => {
    const snapshot = calculateCanonicalSajuSnapshot(
      knownInput,
      PRODUCTION_DEFAULT_CALCULATION_POLICY,
    );
    const settlements = snapshot.derivedFacts.stemInteractionSettlements;
    if (settlements?.status !== 'resolved') throw new Error('settlements unresolved');

    for (const settlement of settlements.value) {
      expect(typeof settlement.pairControlEffective).toBe('boolean');
      expect(settlement.externalInfluences).toEqual(
        [...settlement.externalInfluences].sort((a, b) =>
          a.influenceId.localeCompare(b.influenceId),
        ),
      );
      expect(settlement.participants.controller.baseFunctionState).toBe('constrained');
      expect(settlement.participants.controlled.baseFunctionState).toBe('impaired');
    }
  });

  test('unknown birth time still fails closed through the structural-relation dependency', () => {
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

  test('network settlement identity remains deterministic across audit timestamps', () => {
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
