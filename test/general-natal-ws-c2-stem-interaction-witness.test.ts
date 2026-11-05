import { describe, expect, it } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { createGeneralNatalPositionQualifiedResearchRegistry } from '../src/interpretation/general-natal-position-qualified-reading.js';
import { bindGeneralNatalStemInteractionWitnesses } from '../src/interpretation/general-natal-stem-interaction-witness.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';

const now = new Date('2026-10-11T00:00:00.000Z');
const sample = { calendarType: 'solar' as const,
  date: { year: 1984, month: 6, day: 14 },
  time: { known: true as const, hour: 5, minute: 30 },
  sexForTraditionalCalculation: 'male' as const };

describe('WS-C2 actual settled stem interaction to position-qualified T5 provenance', () => {
  it('never fabricates effect claims, preserves exact positions and deterministic output', () => {
    const snapshot = calculateCanonicalSajuSnapshot(sample, PRODUCTION_DEFAULT_CALCULATION_POLICY, { now });
    const registry = createGeneralNatalPositionQualifiedResearchRegistry();
    const execution = runInterpretation(snapshot, registry, { now });
    const hash = deterministicContentHash(snapshot);
    const first = bindGeneralNatalStemInteractionWitnesses(snapshot, execution);
    expect(bindGeneralNatalStemInteractionWitnesses(snapshot, execution)).toEqual(first);
    for (const witness of first) {
      const settlement = snapshot.derivedFacts.stemInteractionSettlements;
      expect(settlement?.status).toBe('resolved');
      if (settlement?.status !== 'resolved') continue;
      const original = settlement.value.find(s => s.settlementId === witness.settlementId);
      expect(original).toBeDefined();
      const participant = original?.participants[witness.participantRole];
      expect(participant?.pillar).toBe(witness.pillar);
      expect(participant?.tenGod).toBe(witness.tenGod);
      expect(participant?.functionState).toBe(witness.functionState);
      expect(witness.sourceFactRef).toBe(`derivedFacts.tenGods.${witness.pillar}.stem`);
      expect(execution.claims.some(c=>c.claimId===witness.claimId)).toBe(true);
      expect(witness.semanticScope).toBe('structural_provenance_only');
      expect(witness.t6EffectClaimAuthorized).toBe(false);
      expect(witness.consumerProjectionAuthorized).toBe(false);
      expect(witness.transformationApplied).toBe(false);
    }
    expect(deterministicContentHash(snapshot)).toBe(hash);
  });

  it('fails closed on different chart/execution identities', () => {
    const chart1 = calculateCanonicalSajuSnapshot(sample, PRODUCTION_DEFAULT_CALCULATION_POLICY, { now });
    const chart2 = calculateCanonicalSajuSnapshot({
      ...sample,
      date: { year: 1984, month: 6, day: 15 },
    }, PRODUCTION_DEFAULT_CALCULATION_POLICY, { now });
    const execution = runInterpretation(chart1, createGeneralNatalPositionQualifiedResearchRegistry(), { now });
    expect(() => bindGeneralNatalStemInteractionWitnesses(chart2, execution))
      .toThrow('WS_C2_SNAPSHOT_MISMATCH');
  });

  it('rejects stale hash, invalid claim graph, absent or duplicated T5 and altered relation', () => {
    const dates = [
      { year: 1984, month: 6, day: 14 },
      { year: 1984, month: 5, day: 20 },
      { year: 1984, month: 5, day: 21 },
      { year: 1984, month: 5, day: 22 },
    ];
    const snapshots = dates.map((date) => calculateCanonicalSajuSnapshot({
      ...sample, date,
    }, PRODUCTION_DEFAULT_CALCULATION_POLICY, { now }));
    const snapshot = snapshots.find((item) =>
      item.derivedFacts.stemInteractionSettlements?.status === 'resolved' &&
      item.derivedFacts.stemInteractionSettlements.value.length > 0
    );
    expect(snapshot).toBeDefined();
    if (snapshot === undefined) return;
    const execution = runInterpretation(
      snapshot, createGeneralNatalPositionQualifiedResearchRegistry(), { now },
    );
    const original = bindGeneralNatalStemInteractionWitnesses(snapshot, execution);
    expect(original).toHaveLength(snapshot.derivedFacts.stemInteractionSettlements?.status === 'resolved'
      ? snapshot.derivedFacts.stemInteractionSettlements.value.length * 2 : 0);
    expect(original.length).toBeGreaterThan(0);
    const item = original[0]!;
    const settlement = snapshot.derivedFacts.stemInteractionSettlements;
    expect(settlement?.status).toBe('resolved');
    if (settlement?.status !== 'resolved') return;
    const canonical = settlement.value.find((value) => value.settlementId === item.settlementId);
    expect(item.pairControlEffective).toBe(canonical?.pairControlEffective);

    expect(() => bindGeneralNatalStemInteractionWitnesses(snapshot, {
      ...execution, run: { ...execution.run, snapshotHash: 'stale-hash' },
    })).toThrow('WS_C2_SNAPSHOT_MISMATCH');
    expect(() => bindGeneralNatalStemInteractionWitnesses(snapshot, {
      ...execution, integrity: { valid: false, errors: ['tampered'] },
    })).toThrow('WS_C2_CLAIM_GRAPH_INVALID');
    expect(() => bindGeneralNatalStemInteractionWitnesses(snapshot, {
      ...execution,
      claims: [...execution.claims, {
        ...execution.claims[0]!, snapshotId: 'another_snapshot',
      }],
    })).toThrow('WS_C2_CLAIM_SNAPSHOT_MISMATCH');
    expect(() => bindGeneralNatalStemInteractionWitnesses(snapshot, {
      ...execution,
      claims: execution.claims.filter((claim) => claim.claimId !== item.claimId),
    })).toThrow('WS_C2_POSITION_T5_NOT_UNIQUE');
    const source = execution.claims.find((claim) => claim.claimId === item.claimId);
    expect(source).toBeDefined();
    if (source !== undefined) {
      expect(() => bindGeneralNatalStemInteractionWitnesses(snapshot, {
        ...execution,
        claims: [...execution.claims, { ...source, claimId: 'tampered-duplicate' }],
      })).toThrow('WS_C2_POSITION_T5_NOT_UNIQUE');
    }
    const tampered = {
      ...snapshot,
      derivedFacts: {
        ...snapshot.derivedFacts,
        stemInteractionSettlements: {
          status: 'resolved' as const,
          value: settlement.value.map((value, index) =>
            index === 0 ? { ...value, relationId: 'wrong-relation' } : value
          ),
        },
      },
    };
    expect(() => bindGeneralNatalStemInteractionWitnesses(tampered, execution))
      .toThrow('WS_C2_SETTLEMENT_RELATION_MISMATCH');
    expect(bindGeneralNatalStemInteractionWitnesses(snapshot, execution)).toEqual(original);
  });

  it('returns no T6 witness when canonical interaction is unresolved', () => {
    const snapshot = calculateCanonicalSajuSnapshot(sample, PRODUCTION_DEFAULT_CALCULATION_POLICY, { now });
    const execution = runInterpretation(
      snapshot, createGeneralNatalPositionQualifiedResearchRegistry(), { now },
    );
    const unavailable = {
      ...snapshot,
      derivedFacts: {
        ...snapshot.derivedFacts,
        stemInteractionSettlements: { status: 'unavailable' as const, reasonCode: 'test-unresolved' },
      },
    };
    expect(bindGeneralNatalStemInteractionWitnesses(unavailable, execution)).toEqual([]);
  });
});
