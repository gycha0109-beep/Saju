import { describe, expect, it } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import {
  GENERAL_NATAL_C2_STEM_SETTLEMENT_LINK_VERSION,
  linkGeneralNatalC2StemSettlementsToT5,
} from '../src/interpretation/general-natal-c2-stem-interaction-evidence.js';
import {
  createGeneralNatalPositionQualifiedResearchRegistry,
} from '../src/interpretation/general-natal-position-qualified-reading.js';
import {
  createGeneralNatalIntegratedReadingRegistry,
} from '../src/interpretation/general-natal-integrated-reading-registry.js';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';

const now = new Date('2026-10-11T00:00:00.000Z');
const samples = [
  { year: 1984, month: 5, day: 20 },
  { year: 1984, month: 5, day: 21 },
  { year: 1984, month: 5, day: 22 },
  { year: 1992, month: 10, day: 24 },
] as const;

function chart(date: (typeof samples)[number]) {
  return calculateCanonicalSajuSnapshot({
    calendarType: 'solar',
    date,
    time: { known: true, hour: 5, minute: 30 },
    sexForTraditionalCalculation: 'unspecified',
  }, PRODUCTION_DEFAULT_CALCULATION_POLICY, { now });
}

describe('WS-C2 T6-ready canonical stem settlement and exact-position T5 witness', () => {
  it('binds genuine canonical interaction participants without inventing semantic effect', () => {
    let positiveEvidenceCount = 0;
    for (const date of samples) {
      const snapshot = chart(date);
      const snapshotBefore = deterministicContentHash(snapshot);
      const execution = runInterpretation(
        snapshot,
        createGeneralNatalPositionQualifiedResearchRegistry(),
        { now },
      );
      const result = linkGeneralNatalC2StemSettlementsToT5(snapshot, execution);
      expect(result.status).toBe('resolved');
      if (result.status !== 'resolved') continue;
      expect(linkGeneralNatalC2StemSettlementsToT5(snapshot, execution)).toEqual(result);
      const settlements = snapshot.derivedFacts.stemInteractionSettlements;
      expect(settlements?.status).toBe('resolved');
      if (settlements?.status !== 'resolved') continue;
      expect(result.evidence).toHaveLength(settlements.value.length);
      positiveEvidenceCount += result.evidence.length;

      for (const item of result.evidence) {
        const original = settlements.value.find(
          (candidate) => candidate.settlementId === item.settlementId,
        );
        expect(original).toBeDefined();
        expect(item.schemaVersion).toBe(GENERAL_NATAL_C2_STEM_SETTLEMENT_LINK_VERSION);
        expect(item.relationId).toBe(original?.relationId);
        expect(item.semanticScope).toBe('canonical_structural_settlement_only');
        expect(item.transformationApplied).toBe(false);
        expect(item.interpretationEffectAuthorized).toBe(false);
        expect(item.consumerProjectionAuthorized).toBe(false);
        expect(item.pairControlEffective).toBe(original?.pairControlEffective);
        expect(item.participants).toHaveLength(2);

        const refs = item.participants.map((participant) => participant.t5ClaimId).sort();
        expect(item.upstreamT5ClaimIds).toEqual(refs);
        for (const participant of item.participants) {
          const canonical = original?.participants[participant.role];
          expect(participant.pillar).toBe(canonical?.pillar);
          expect(participant.tenGod).toBe(canonical?.tenGod);
          expect(participant.functionState).toBe(canonical?.functionState);
          const actualT5 = execution.claims.find(
            (claim) => claim.claimId === participant.t5ClaimId,
          );
          expect(actualT5?.taxonomy).toMatchObject({ tier: 'T5', category: 'ten_gods' });
          expect(actualT5?.factRefs).toEqual([participant.factRef]);
        }
      }
      expect(deterministicContentHash(snapshot)).toBe(snapshotBefore);
    }
    expect(positiveEvidenceCount).toBeGreaterThan(0);
  });

  it('fails closed for stale execution, broken graph or missing position witnesses', () => {
    const snapshot = chart(samples[0]);
    const positioned = runInterpretation(
      snapshot,
      createGeneralNatalPositionQualifiedResearchRegistry(),
      { now },
    );
    const stale = linkGeneralNatalC2StemSettlementsToT5(snapshot, {
      ...positioned,
      run: { ...positioned.run, snapshotHash: 'stale-canonical-hash' },
    });
    expect(stale).toEqual({
      status: 'unavailable',
      reason: 'CALCULATION_INTERPRETATION_SNAPSHOT_MISMATCH',
    });
    const invalidGraph = linkGeneralNatalC2StemSettlementsToT5(snapshot, {
      ...positioned,
      integrity: { valid: false, errors: ['test-graph-invalid'] },
    });
    expect(invalidGraph).toEqual({
      status: 'unavailable',
      reason: 'CLAIM_GRAPH_INTEGRITY_FAILED',
    });
    const settlements = snapshot.derivedFacts.stemInteractionSettlements;
    if (settlements?.status === 'resolved' && settlements.value.length > 0) {
      const unpositioned = runInterpretation(
        snapshot,
        createGeneralNatalIntegratedReadingRegistry(),
        { now },
      );
      expect(linkGeneralNatalC2StemSettlementsToT5(snapshot, unpositioned)).toEqual({
        status: 'unavailable',
        reason: 'EXACT_POSITION_T5_WITNESS_MISSING_OR_DUPLICATED',
      });
    }
  });

  it('preserves unknown-time uncertainty without projecting invented interactions', () => {
    const snapshot = calculateCanonicalSajuSnapshot({
      calendarType: 'solar',
      date: { year: 1984, month: 5, day: 20 },
      time: { known: false },
      sexForTraditionalCalculation: 'unspecified',
    }, PRODUCTION_DEFAULT_CALCULATION_POLICY, { now });
    const execution = runInterpretation(
      snapshot,
      createGeneralNatalPositionQualifiedResearchRegistry(),
      { now },
    );
    const result = linkGeneralNatalC2StemSettlementsToT5(snapshot, execution);
    if (snapshot.derivedFacts.stemInteractionSettlements?.status === 'resolved') {
      expect(result.status).toBe('resolved');
    } else {
      expect(result).toEqual({
        status: 'unavailable',
        reason: 'CANONICAL_STEM_SETTLEMENT_UNRESOLVED',
      });
    }
  });
});
