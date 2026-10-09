import { describe, expect, it } from 'vitest';
import { FR312G_RELIABILITY_FAMILIES } from './traditional-neutral-metric-reliability-study-fr312g.js';
import { FR312G7_SOURCE_CATALOGUE, FR312G7_AXIS_EVIDENCE_MATRIX } from './traditional-neutral-metric-source-evidence-audit-fr312g7.js';
import { FR312G6_NUMERIC_GOVERNANCE_REVIEW } from './traditional-neutral-metric-numeric-governance-review-fr312g6.js';
import {
  FR312G8_SOURCE_FEASIBILITY,
  FR312G8_AXIS_FEASIBILITY,
  FR312G8_FEASIBILITY_VERDICT,
  FR312G8_EXACT_AXIS_REPRODUCTION_REQUIREMENTS,
  assertExactAxisEvidenceFeasibilityFR312G8,
} from './traditional-neutral-metric-source-feasibility-fr312g8.js';

describe('FR312G8 source access and exact-axis feasibility', () => {
  it('checks seven actual source routes and preserves FR312G7 identity', () => {
    expect(() => assertExactAxisEvidenceFeasibilityFR312G8()).not.toThrow();
    expect(FR312G8_SOURCE_FEASIBILITY).toHaveLength(7);
    expect(FR312G8_SOURCE_FEASIBILITY.map((source) => source.sourceId))
      .toEqual(FR312G7_SOURCE_CATALOGUE.map((source) => source.sourceId));
    expect(FR312G8_SOURCE_FEASIBILITY[0]?.accessRoute).toBe('stale_distribution_link');
    expect(FR312G8_SOURCE_FEASIBILITY[1]?.accessRoute)
      .toBe('signed_organizational_agreement_required');
    expect(FR312G8_SOURCE_FEASIBILITY[2]?.accessRoute)
      .toBe('noncommercial_research_licence_only');
    for (const source of FR312G8_SOURCE_FEASIBILITY) {
      expect(source.currentDataAccessConfirmed).toBe(false);
      expect(source.productCompatibleRightsConfirmed).toBe(false);
      expect(source.existingRawDataUseAuthorized).toBe(false);
      expect(source.exactAxisObservationsAvailable).toBe(false);
      expect(source.independentParticipantsLinkable).toBe(false);
      expect(source.pairedSessionsAndAcceptedCapturesVerified).toBe(false);
      expect(source.missingnessAndWithdrawalAvailable).toBe(false);
    }
  });

  it('retains eight source-bound precise metric axis requirements', () => {
    const references = FR312G_RELIABILITY_FAMILIES.flatMap((f) =>
      f.metricAxes.map((a) => a.metricRef));
    expect(FR312G8_AXIS_FEASIBILITY).toHaveLength(8);
    expect(FR312G8_EXACT_AXIS_REPRODUCTION_REQUIREMENTS).toHaveLength(8);
    expect(FR312G8_AXIS_FEASIBILITY.map((a) => a.metricRef)).toEqual(references);
    expect(FR312G8_AXIS_FEASIBILITY.map((a) => a.metricRef))
      .toEqual(FR312G7_AXIS_EVIDENCE_MATRIX.map((a) => a.metricRef));
    expect(FR312G8_AXIS_FEASIBILITY[3]?.definitionRequirement).toContain('468-landmark');
    expect(FR312G8_AXIS_FEASIBILITY[7]?.definitionRequirement).toContain('squared mouth width');
  });

  it('does not silently infer complete licence, per-axis matched variance, temporal pairs or missingness', () => {
    for (const a of FR312G8_AXIS_FEASIBILITY) {
      expect(a.definitionProof).toBe('not_established');
      expect(a.lawfulCommercialResearchRights).toBe('not_established');
      expect(a.participantClusteredSessionPairEvidence).toBe('not_established');
      expect(a.exactAxisVarianceEvidence).toBe('not_established');
      expect(a.missingnessWithdrawalEvidence).toBe('not_established');
      expect(a.outcome).toBe('hold_for_evidence');
      expect(a.numericReviewCandidateApproved).toBe(false);
    }
    expect(FR312G8_FEASIBILITY_VERDICT.verifiedExactAxisNumericEvidenceCount).toBe(0);
    expect(FR312G8_FEASIBILITY_VERDICT.reviewableExternalNumericCandidates).toBe(0);
    expect(FR312G8_FEASIBILITY_VERDICT.dataRightsVerifiedSources).toBe(0);
  });

  it('cannot authorize sample sizing, image acquisition, recruitment, FR312G or FR312H', () => {
    expect(FR312G6_NUMERIC_GOVERNANCE_REVIEW.participantCount).toBeNull();
    expect(FR312G6_NUMERIC_GOVERNANCE_REVIEW.partitionRatios).toBeNull();
    expect(FR312G6_NUMERIC_GOVERNANCE_REVIEW.evidencePacketIssued).toBe(false);
    expect(FR312G8_FEASIBILITY_VERDICT.disposition)
      .toBe('halt_numeric_sizing_pending_governed_exact_axis_evidence');
    for (const [name, value] of Object.entries(FR312G8_FEASIBILITY_VERDICT)) {
      if (name.endsWith('Authorized')) expect(value, name).toBe(false);
    }
  });
});
