import {
  FR312F_PARTITION_POLICY,
  FR312F_SAMPLE_DESIGN,
} from './traditional-morphology-pilot-dataset-capture-protocol-fr312f.js';
import {
  FR312G_STUDY_DESIGN,
  assertNeutralMetricReliabilityStudyDesignFR312G,
} from './traditional-neutral-metric-reliability-study-fr312g.js';
import {
  FR312G3_CONSENT_WITHDRAWAL_PROTOCOL,
  assertParticipantConsentWithdrawalProtocolFR312G3,
} from './traditional-neutral-metric-consent-withdrawal-protocol-fr312g3.js';
import {
  FR312G4_PLANNING_CONTRACT,
  FR312G4_REQUIRED_NUMERIC_APPROVAL_INPUTS,
  assertParticipantCountPlanningRationaleFR312G4,
} from './traditional-neutral-metric-participant-count-rationale-fr312g4.js';
import {
  FR312G5_FUTURE_ALLOCATOR_PREREQUISITES,
  FR312G5_PARTITION_ALLOCATION_RATIONALE,
  assertPartitionAllocationRationaleFR312G5,
} from './traditional-neutral-metric-partition-allocation-rationale-fr312g5.js';

export const FR312G6_REVIEW_ID =
  'fr312g6.evidence_backed_numeric_governance_review' as const;

export const FR312G6_REQUIRED_APPROVAL_RECORDS = Object.freeze([
  'versioned_study_and_analysis_plan',
  'pre_registered_per_axis_estimand_and_precision_objectives',
  'governed_variance_availability_provenance_and_permissions',
  'participant_clustered_uncertainty_and_repeat_dependency',
  'missingness_withdrawal_and_attrition_sensitivity',
  'effective_development_n_rationale',
  'calibration_and_holdout_purpose_specific_rationale',
  'participant_level_proposed_counts_and_ratio_reconciliation',
  'pre_observation_freeze_and_no_leakage_attestation',
  'independent_methodological_reviewer_signoff',
  'versioned_non_biometric_decision_audit_and_replan_trigger',
] as const);

export const FR312G6_NUMERIC_GOVERNANCE_REVIEW = Object.freeze({
  reviewId: FR312G6_REVIEW_ID,
  authorityState:
    'numeric_governance_review_contract_issued_no_evidence_approval' as const,
  studyProtocolId: FR312G_STUDY_DESIGN.protocolId,
  consentProtocolId: FR312G3_CONSENT_WITHDRAWAL_PROTOCOL.protocolId,
  samplePlanningRationaleId: FR312G4_PLANNING_CONTRACT.rationaleId,
  partitionAllocationRationaleId:
    FR312G5_PARTITION_ALLOCATION_RATIONALE.rationaleId,
  independentUnit: 'participant' as const,
  partitions: Object.freeze([...FR312F_PARTITION_POLICY.partitions]),
  studyComparatorFamilies: FR312G_STUDY_DESIGN.comparatorFamilyCount,
  studyMetricAxes: FR312G_STUDY_DESIGN.neutralMetricAxisCount,
  sourceSizingApprovalInputs: FR312G4_REQUIRED_NUMERIC_APPROVAL_INPUTS,
  sourceAllocatorPrerequisites: FR312G5_FUTURE_ALLOCATOR_PREREQUISITES,
  requiredApprovalRecords: FR312G6_REQUIRED_APPROVAL_RECORDS,
  futureReviewPolicy: Object.freeze({
    dataProvenanceAndUseAuthorityRequired: true as const,
    externalOrSeparatelyGovernedEvidenceRequired: true as const,
    precisionObjectivesRegisteredBeforeStudyObservations: true as const,
    axisByAxisJustificationRequired: true as const,
    repeatedCaptureRowsCountAsIndependentParticipants: false as const,
    participantClusteredUncertaintyRequired: true as const,
    developmentNCheckedAgainstEffectiveN: true as const,
    calibrationOrHoldoutUsedToDeriveReliabilityN: false as const,
    futureAssociationStudyNeedsSeparateAuthorization: true as const,
    calibrationAndHoldoutPurposeSpecificSizingRequired: true as const,
    unknownAxisVarianceCannotBeReplacedByInventedEstimate: true as const,
    missingnessAndWithdrawalSensitivityRequired: true as const,
    prospectiveReplanOnlyBeforeOutcomeAccess: true as const,
    metricOrLabelAwareTopupAllowed: false as const,
    approvalRecordSeparateFromCollectionAdmission: true as const,
    designReviewDoesNotEstablishLegalSufficiency: true as const,
    noBiometricIdentityMatchingForAllocation: true as const,
  }),
  evidencePacketIssued: false as const,
  numericReviewerSignoffIssued: false as const,
  evidenceBackedParticipantCountApproved: false as const,
  numericPartitionAllocationApproved: false as const,
  perAxisPrecisionTarget: null,
  provenanceBoundVarianceEstimates: null,
  effectiveDevelopmentParticipantCount: null,
  participantCount: null,
  partitionCounts: null,
  partitionRatios: null,
  allocatorAlgorithm: null,
  allocatorSeed: null,
  evidenceFreezeRecord: null,
  reviewerDecisionRecord: null,
  participantRecruitmentAuthorized: false as const,
  empiricalRuntimeIssued: false as const,
  empiricalAdmissionIssued: false as const,
  actualParticipantCollectionAuthorized: false as const,
  fr312gReliabilityExecutionAuthorized: false as const,
  fr312hEntryAuthorized: false as const,
  nextAction:
    'obtain_governed_external_or_preapproved_evidence_and_independent_numeric_review_before_any_empirical_runtime_or_admission' as const,
});

export const FR312G6_AUTHORITY_BOUNDARY = Object.freeze({
  numericParticipantCountAuthorized: false as const,
  numericPartitionAllocationAuthorized: false as const,
  independentEmpiricalAdmissionAuthorized: false as const,
  actualParticipantCollectionAuthorized: false as const,
  calibrationOrHoldoutReadAuthorized: false as const,
  reliabilityExecutionAuthorized: false as const,
  morphologyLabelAssociationAuthorized: false as const,
  thresholdDiscoveryAuthorized: false as const,
  traditionalMeaningValidationAuthorized: false as const,
  automaticTraditionalBindingAuthorized: false as const,
  productInterpretationAuthorized: false as const,
});

export interface SyntheticNumericReviewPacketFR312G6 {
  readonly hypotheticalEnrollmentCount: number;
  readonly hypotheticalEffectiveDevelopmentCount: number;
  readonly hypotheticalPartitionCounts: {
    readonly development: number;
    readonly calibration: number;
    readonly holdout: number;
  };
  readonly preRegisteredAxisPrecisionEvidence: boolean;
  readonly governedVarianceAndAvailabilityEvidence: boolean;
  readonly participantClusteredCalculation: boolean;
  readonly attritionWithdrawalAndMissingnessSensitivity: boolean;
  readonly calibrationHoldoutPurposeJustification: boolean;
  readonly noOutcomeAwareOrHoldoutTuning: boolean;
  readonly reviewerSignoffRecorded: boolean;
  readonly versionedNonBiometricAuditRecorded: boolean;
}

/**
 * Synthetic numerical coherence diagnostic. It does not calculate required N,
 * authenticate source evidence, authorize recruitment or issue a decision.
 */
export function reviewSyntheticNumericPacketFR312G6(
  packet: SyntheticNumericReviewPacketFR312G6,
): Readonly<{
  structuralChecksPassed: boolean;
  violations: readonly string[];
  numericDecisionAuthorized: false;
  empiricalCollectionAuthorized: false;
}> {
  const violations: string[] = [];
  const counts = packet.hypotheticalPartitionCounts;
  const values = [
    packet.hypotheticalEnrollmentCount,
    packet.hypotheticalEffectiveDevelopmentCount,
    counts.development,
    counts.calibration,
    counts.holdout,
  ];
  if (values.some((value) => !Number.isSafeInteger(value) || value < 0)) {
    violations.push('invalid_nonnegative_participant_counts');
  } else {
    if (
      counts.development + counts.calibration + counts.holdout
      !== packet.hypotheticalEnrollmentCount
    ) {
      violations.push('partition_counts_do_not_reconcile');
    }
    if (
      packet.hypotheticalEffectiveDevelopmentCount > counts.development
    ) {
      violations.push('effective_n_exceeds_development_count');
    }
    if (packet.hypotheticalEnrollmentCount === 0) {
      violations.push('no_hypothetical_participants');
    }
  }

  const evidenceChecks = [
    ['missing_preregistered_axis_precision', packet.preRegisteredAxisPrecisionEvidence],
    ['missing_governed_variance_provenance', packet.governedVarianceAndAvailabilityEvidence],
    ['missing_participant_clustered_calculation', packet.participantClusteredCalculation],
    ['missing_attrition_withdrawal_sensitivity', packet.attritionWithdrawalAndMissingnessSensitivity],
    ['missing_calibration_holdout_purpose_rationale', packet.calibrationHoldoutPurposeJustification],
    ['outcome_or_holdout_tuning_not_excluded', packet.noOutcomeAwareOrHoldoutTuning],
    ['missing_independent_review_signoff', packet.reviewerSignoffRecorded],
    ['missing_versioned_non_biometric_audit', packet.versionedNonBiometricAuditRecorded],
  ] as const);
  for (const [violation, passed] of evidenceChecks) {
    if (!passed) violations.push(violation);
  }

  return Object.freeze({
    structuralChecksPassed: violations.length === 0,
    violations: Object.freeze(violations),
    numericDecisionAuthorized: false as const,
    empiricalCollectionAuthorized: false as const,
  });
}

export function assertNumericGovernanceReviewFR312G6(): void {
  assertNeutralMetricReliabilityStudyDesignFR312G();
  assertParticipantConsentWithdrawalProtocolFR312G3();
  assertParticipantCountPlanningRationaleFR312G4();
  assertPartitionAllocationRationaleFR312G5();
  const r = FR312G6_NUMERIC_GOVERNANCE_REVIEW;

  if (
    r.studyProtocolId !== FR312G_STUDY_DESIGN.protocolId
    || r.consentProtocolId !== FR312G3_CONSENT_WITHDRAWAL_PROTOCOL.protocolId
    || r.samplePlanningRationaleId !== FR312G4_PLANNING_CONTRACT.rationaleId
    || r.partitionAllocationRationaleId !== FR312G5_PARTITION_ALLOCATION_RATIONALE.rationaleId
    || r.independentUnit !== 'participant'
    || r.partitions.join('|') !== 'development|calibration|holdout'
    || r.partitions.join('|') !== FR312F_PARTITION_POLICY.partitions.join('|')
    || r.studyComparatorFamilies !== 4
    || r.studyMetricAxes !== 8
  ) {
    throw new Error('fr312g6_upstream_binding_drift');
  }

  if (
    r.sourceSizingApprovalInputs.join('|')
      !== FR312G4_REQUIRED_NUMERIC_APPROVAL_INPUTS.join('|')
    || r.sourceAllocatorPrerequisites.join('|')
      !== FR312G5_FUTURE_ALLOCATOR_PREREQUISITES.join('|')
    || r.requiredApprovalRecords.length !== 11
    || new Set(r.requiredApprovalRecords).size !== 11
    || !r.futureReviewPolicy.precisionObjectivesRegisteredBeforeStudyObservations
    || !r.futureReviewPolicy.participantClusteredUncertaintyRequired
    || !r.futureReviewPolicy.calibrationAndHoldoutPurposeSpecificSizingRequired
    || r.futureReviewPolicy.repeatedCaptureRowsCountAsIndependentParticipants
    || r.futureReviewPolicy.calibrationOrHoldoutUsedToDeriveReliabilityN
    || r.futureReviewPolicy.metricOrLabelAwareTopupAllowed
    || !r.futureReviewPolicy.approvalRecordSeparateFromCollectionAdmission
  ) {
    throw new Error('fr312g6_governance_review_drift');
  }

  if (
    FR312F_SAMPLE_DESIGN.participantCount !== null
    || FR312F_SAMPLE_DESIGN.partitionRatios !== null
    || FR312G4_PLANNING_CONTRACT.participantCountAuthorized
    || FR312G5_PARTITION_ALLOCATION_RATIONALE.numericAllocationAuthorized
    || r.evidencePacketIssued
    || r.numericReviewerSignoffIssued
    || r.evidenceBackedParticipantCountApproved
    || r.numericPartitionAllocationApproved
    || r.perAxisPrecisionTarget !== null
    || r.provenanceBoundVarianceEstimates !== null
    || r.effectiveDevelopmentParticipantCount !== null
    || r.participantCount !== null
    || r.partitionCounts !== null
    || r.partitionRatios !== null
    || r.allocatorAlgorithm !== null
    || r.allocatorSeed !== null
    || r.evidenceFreezeRecord !== null
    || r.reviewerDecisionRecord !== null
  ) {
    throw new Error('fr312g6_premature_numeric_approval');
  }

  for (const [key, value] of Object.entries(FR312G6_AUTHORITY_BOUNDARY)) {
    if (value !== false) {
      throw new Error('fr312g6_authority_widening:' + key);
    }
  }
  if (
    r.participantRecruitmentAuthorized
    || r.empiricalRuntimeIssued
    || r.empiricalAdmissionIssued
    || r.actualParticipantCollectionAuthorized
    || r.fr312gReliabilityExecutionAuthorized
    || r.fr312hEntryAuthorized
  ) {
    throw new Error('fr312g6_empirical_or_downstream_gate_bypass');
  }
}
