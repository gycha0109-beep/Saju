import { describe, expect, it } from 'vitest';
import { FR312G_RELIABILITY_FAMILIES } from './traditional-neutral-metric-reliability-study-fr312g.js';
import { FR312G4_PLANNING_CONTRACT } from './traditional-neutral-metric-participant-count-rationale-fr312g4.js';
import { FR312G6_NUMERIC_GOVERNANCE_REVIEW } from './traditional-neutral-metric-numeric-governance-review-fr312g6.js';
import {
  FR312G7_AXIS_EVIDENCE_MATRIX,
  FR312G7_SOURCE_CATALOGUE,
  FR312G7_SUFFICIENCY_VERDICT,
  assertExternalEvidenceAuditFR312G7,
} from './traditional-neutral-metric-source-evidence-audit-fr312g7.js';

describe('FR312G7 source eligibility evidence audit', () => {
  it('matches FR312G and FR312G4 inventories', () => {
    expect(() => assertExternalEvidenceAuditFR312G7()).not.toThrow();
    const refs = FR312G_RELIABILITY_FAMILIES.flatMap((f) => f.metricAxes.map((a) => a.metricRef));
    expect(FR312G_RELIABILITY_FAMILIES).toHaveLength(4);
    expect(FR312G7_AXIS_EVIDENCE_MATRIX.map((a) => a.metricRef)).toEqual(refs);
    expect(refs).toEqual(FR312G4_PLANNING_CONTRACT.axisMetricRefs);
  });
  it('identifies seven sources without elevating source metadata to facial-data permission', () => {
    expect(FR312G7_SOURCE_CATALOGUE).toHaveLength(7);
    expect(new Set(FR312G7_SOURCE_CATALOGUE.map((s) => s.sourceId)).size).toBe(7);
    for (const s of FR312G7_SOURCE_CATALOGUE) {
      expect(s.officialUrl).toMatch(/^https:\/\//);
      expect(s.imageReuseAuthorized).toBe(false);
      expect(s.numericEvidenceForExactFR312GAxes).toBe(false);
      expect(s.independentParticipantVarianceUsable).toBe(false);
      expect(s.missingnessAndWithdrawalUsable).toBe(false);
      expect(s.suitability).not.toBe('eligible_for_numeric_review');
    }
    expect(FR312G7_SOURCE_CATALOGUE.find((s) => s.sourceId === 'FR312G7-S03')?.rights)
      .toBe('noncommercial_only');
    expect(FR312G7_SOURCE_CATALOGUE.find((s) => s.sourceId === 'FR312G7-S02')?.rights)
      .toBe('agreement_required');
  });
  it('retains per-axis missingness and participant cluster evidence gaps', () => {
    expect(FR312G7_AXIS_EVIDENCE_MATRIX).toHaveLength(8);
    for (const axis of FR312G7_AXIS_EVIDENCE_MATRIX) {
      expect(axis.candidateSourceIds.length).toBeGreaterThan(0);
      expect(axis.definitionEquivalence).not.toBe('exact');
      expect(axis.repeatabilityData).toBe('unavailable');
      expect(axis.varianceEvidence).toBe('unavailable');
      expect(axis.missingnessEvidence).toBe('unavailable');
      expect(axis.dataUseRights).toBe('restricted_or_unverified');
      expect(axis.admissionSuitability).toBe('insufficient_evidence');
    }
  });
  it('does not authorize numeric counts, participant collection, or downstream interpretations', () => {
    expect(FR312G7_SUFFICIENCY_VERDICT.conclusion).toBe('insufficient_evidence');
    expect(FR312G7_SUFFICIENCY_VERDICT.eligibleSourceCount).toBe(0);
    expect(FR312G7_SUFFICIENCY_VERDICT.eligibleAxisCount).toBe(0);
    expect(FR312G6_NUMERIC_GOVERNANCE_REVIEW.evidencePacketIssued).toBe(false);
    expect(FR312G6_NUMERIC_GOVERNANCE_REVIEW.participantCount).toBeNull();
    expect(FR312G6_NUMERIC_GOVERNANCE_REVIEW.partitionRatios).toBeNull();
    for (const [key, value] of Object.entries(FR312G7_SUFFICIENCY_VERDICT)) {
      if (key.endsWith('Authorized') || key.endsWith('Approved')) {
        expect(value, key).toBe(false);
      }
    }
  });
});
