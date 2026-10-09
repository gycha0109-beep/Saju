import { describe, expect, it } from 'vitest';
import { FR312F_SAMPLE_DESIGN } from './traditional-morphology-pilot-dataset-capture-protocol-fr312f.js';
import { FR312G_STUDY_DESIGN } from './traditional-neutral-metric-reliability-study-fr312g.js';
import { FR312G3_CONSENT_WITHDRAWAL_PROTOCOL } from './traditional-neutral-metric-consent-withdrawal-protocol-fr312g3.js';
import {
  FR312G4_PLANNING_CONTRACT,
  FR312G4_REQUIRED_NUMERIC_APPROVAL_INPUTS,
} from './traditional-neutral-metric-participant-count-rationale-fr312g4.js';
import {
  FR312G5_FUTURE_ALLOCATOR_PREREQUISITES,
  FR312G5_PARTITION_ALLOCATION_RATIONALE,
} from './traditional-neutral-metric-partition-allocation-rationale-fr312g5.js';
import {
  FR312G6_AUTHORITY_BOUNDARY,
  FR312G6_NUMERIC_GOVERNANCE_REVIEW,
  FR312G6_REQUIRED_APPROVAL_RECORDS,
  assertNumericGovernanceReviewFR312G6,
  reviewSyntheticNumericPacketFR312G6,
  type SyntheticNumericReviewPacketFR312G6,
} from './traditional-neutral-metric-numeric-governance-review-fr312g6.js';

const hypotheticalPacket: SyntheticNumericReviewPacketFR312G6 = {
  hypotheticalEnrollmentCount: 24,
  hypotheticalEffectiveDevelopmentCount: 10,
  hypotheticalPartitionCounts: {
    development: 12,
    calibration: 6,
    holdout: 6,
  },
  preRegisteredAxisPrecisionEvidence: true,
  governedVarianceAndAvailabilityEvidence: true,
  participantClusteredCalculation: true,
  attritionWithdrawalAndMissingnessSensitivity: true,
  calibrationHoldoutPurposeJustification: true,
  noOutcomeAwareOrHoldoutTuning: true,
  reviewerSignoffRecorded: true,
  versionedNonBiometricAuditRecorded: true,
};

describe('FR312G6 numeric sizing and partition governance review', () => {
  it('preserves upstream protocol identities and partition population units', () => {
    expect(() => assertNumericGovernanceReviewFR312G6()).not.toThrow();
    const r = FR312G6_NUMERIC_GOVERNANCE_REVIEW;
    expect(r.studyProtocolId).toBe(FR312G_STUDY_DESIGN.protocolId);
    expect(r.consentProtocolId).toBe(FR312G3_CONSENT_WITHDRAWAL_PROTOCOL.protocolId);
    expect(r.samplePlanningRationaleId).toBe(FR312G4_PLANNING_CONTRACT.rationaleId);
    expect(r.partitionAllocationRationaleId)
      .toBe(FR312G5_PARTITION_ALLOCATION_RATIONALE.rationaleId);
    expect(r.independentUnit).toBe('participant');
    expect(r.partitions).toEqual(['development', 'calibration', 'holdout']);
    expect(r.studyComparatorFamilies).toBe(4);
    expect(r.studyMetricAxes).toBe(8);
  });

  it('requires provenance, precision, clustered effective N and independent review', () => {
    const r = FR312G6_NUMERIC_GOVERNANCE_REVIEW;
    expect(FR312G6_REQUIRED_APPROVAL_RECORDS).toHaveLength(11);
    expect(r.sourceSizingApprovalInputs).toEqual(FR312G4_REQUIRED_NUMERIC_APPROVAL_INPUTS);
    expect(r.sourceAllocatorPrerequisites).toEqual(FR312G5_FUTURE_ALLOCATOR_PREREQUISITES);
    expect(r.futureReviewPolicy.precisionObjectivesRegisteredBeforeStudyObservations).toBe(true);
    expect(r.futureReviewPolicy.dataProvenanceAndUseAuthorityRequired).toBe(true);
    expect(r.futureReviewPolicy.participantClusteredUncertaintyRequired).toBe(true);
    expect(r.futureReviewPolicy.repeatedCaptureRowsCountAsIndependentParticipants).toBe(false);
    expect(r.futureReviewPolicy.calibrationOrHoldoutUsedToDeriveReliabilityN).toBe(false);
    expect(r.futureReviewPolicy.metricOrLabelAwareTopupAllowed).toBe(false);
    expect(r.futureReviewPolicy.approvalRecordSeparateFromCollectionAdmission).toBe(true);
  });

  it('does not issue any population count, allocation ratios, estimate or signoff', () => {
    const r = FR312G6_NUMERIC_GOVERNANCE_REVIEW;
    expect(FR312F_SAMPLE_DESIGN.participantCount).toBeNull();
    expect(FR312F_SAMPLE_DESIGN.partitionRatios).toBeNull();
    expect(r.evidencePacketIssued).toBe(false);
    expect(r.numericReviewerSignoffIssued).toBe(false);
    expect(r.evidenceBackedParticipantCountApproved).toBe(false);
    expect(r.numericPartitionAllocationApproved).toBe(false);
    expect(r.perAxisPrecisionTarget).toBeNull();
    expect(r.provenanceBoundVarianceEstimates).toBeNull();
    expect(r.effectiveDevelopmentParticipantCount).toBeNull();
    expect(r.participantCount).toBeNull();
    expect(r.partitionCounts).toBeNull();
    expect(r.partitionRatios).toBeNull();
    expect(r.allocatorAlgorithm).toBeNull();
    expect(r.allocatorSeed).toBeNull();
    expect(r.evidenceFreezeRecord).toBeNull();
    expect(r.reviewerDecisionRecord).toBeNull();
  });

  it('treats a hypothetical numerically consistent packet only as structural diagnostic', () => {
    const result = reviewSyntheticNumericPacketFR312G6(hypotheticalPacket);
    expect(result.structuralChecksPassed).toBe(true);
    expect(result.violations).toEqual([]);
    expect(result.numericDecisionAuthorized).toBe(false);
    expect(result.empiricalCollectionAuthorized).toBe(false);
  });

  it('rejects inconsistent partition totals and effective N inflation', () => {
    expect(reviewSyntheticNumericPacketFR312G6({
      ...hypotheticalPacket,
      hypotheticalPartitionCounts: {development: 13,calibration: 6,holdout: 6},
      hypotheticalEffectiveDevelopmentCount: 20,
    }).violations).toEqual(expect.arrayContaining([
      'partition_counts_do_not_reconcile',
      'effective_n_exceeds_development_count',
    ]));
  });

  it('rejects non-integer, negative, zero or invalid hypothetical counts', () => {
    expect(reviewSyntheticNumericPacketFR312G6({
      ...hypotheticalPacket,
      hypotheticalEnrollmentCount: Number.NaN,
      hypotheticalPartitionCounts: {development: -1,calibration: 6,holdout: 6},
    }).violations).toContain('invalid_nonnegative_participant_counts');
    expect(reviewSyntheticNumericPacketFR312G6({
      ...hypotheticalPacket,
      hypotheticalEnrollmentCount: 0,
      hypotheticalEffectiveDevelopmentCount: 0,
      hypotheticalPartitionCounts: {development: 0,calibration: 0,holdout: 0},
    }).violations).toContain('no_hypothetical_participants');
    expect(reviewSyntheticNumericPacketFR312G6({
      ...hypotheticalPacket,
      hypotheticalEffectiveDevelopmentCount: 0.5,
    }).violations).toContain('invalid_nonnegative_participant_counts');
  });

  it('flags absent evidence and fails closed even if the numbers reconcile', () => {
    const result = reviewSyntheticNumericPacketFR312G6({
      ...hypotheticalPacket,
      preRegisteredAxisPrecisionEvidence: false,
      governedVarianceAndAvailabilityEvidence: false,
      participantClusteredCalculation: false,
      attritionWithdrawalAndMissingnessSensitivity: false,
      calibrationHoldoutPurposeJustification: false,
      noOutcomeAwareOrHoldoutTuning: false,
      reviewerSignoffRecorded: false,
      versionedNonBiometricAuditRecorded: false,
    });
    expect(result.structuralChecksPassed).toBe(false);
    expect(result.violations).toHaveLength(8);
    expect(result.violations).toContain('missing_governed_variance_provenance');
    expect(result.violations).toContain('missing_independent_review_signoff');
    expect(result.violations).toContain('outcome_or_holdout_tuning_not_excluded');
    expect(result.numericDecisionAuthorized).toBe(false);
  });

  it('remains collection-blocked even when all synthetic checkboxes are true', () => {
    for (const [key, value] of Object.entries(FR312G6_AUTHORITY_BOUNDARY)) {
      expect(value, key).toBe(false);
    }
    const r = FR312G6_NUMERIC_GOVERNANCE_REVIEW;
    expect(r.participantRecruitmentAuthorized).toBe(false);
    expect(r.empiricalRuntimeIssued).toBe(false);
    expect(r.empiricalAdmissionIssued).toBe(false);
    expect(r.actualParticipantCollectionAuthorized).toBe(false);
    expect(r.fr312gReliabilityExecutionAuthorized).toBe(false);
    expect(r.fr312hEntryAuthorized).toBe(false);
    expect(FR312G5_PARTITION_ALLOCATION_RATIONALE.numericAllocationAuthorized).toBe(false);
    expect(FR312G4_PLANNING_CONTRACT.participantCountAuthorized).toBe(false);
  });
});
