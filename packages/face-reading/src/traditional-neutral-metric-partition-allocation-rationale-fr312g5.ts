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
  assertParticipantCountPlanningRationaleFR312G4,
} from './traditional-neutral-metric-participant-count-rationale-fr312g4.js';

export const FR312G5_RATIONALE_ID =
  'fr312g5.participant_partition_allocation_rationale' as const;

export const FR312G5_FUTURE_ALLOCATOR_PREREQUISITES = Object.freeze([
  'evidence_backed_participant_count_and_effective_n_signoff',
  'approved_partition_purpose_and_allocation_rationale',
  'approved_partition_counts_or_ratios',
  'versioned_allocation_algorithm_configuration_and_seed',
  'non_biometric_participant_lineage_and_consent_eligibility',
  'pre_metric_pre_label_assignment_freeze_record',
  'approved_input_manifest_and_authorization_record',
  'tamper_evident_non_image_allocation_audit',
  'independent_empirical_runtime_and_admission_approval',
] as const);

export const FR312G5_PARTITION_PURPOSES = Object.freeze({
  development: Object.freeze({
    currentResearchPurpose:
      'neutral_metric_repeatability_missingness_capture_sensitivity' as const,
    fr312gReliabilityReadAuthorized: false as const,
    mayInformFutureProtocolRevisionAfterSeparateAdmission: true as const,
    morphologyLabelAssociationAuthorized: false as const,
    traditionalSemanticValidationAuthorized: false as const,
  }),
  calibration: Object.freeze({
    reservedFuturePurpose:
      'separately_authorized_morphology_metric_association_research' as const,
    fr312gReliabilityReadAuthorized: false as const,
    currentAssociationResearchAuthorized: false as const,
    currentAccessAuthorized: false as const,
  }),
  holdout: Object.freeze({
    reservedFuturePurpose:
      'independent_evaluation_after_analysis_plan_freeze_and_admission' as const,
    fr312gReliabilityReadAuthorized: false as const,
    currentAccessAuthorized: false as const,
    analysisPlanFreezeAndNewAdmissionRequired: true as const,
    exploratoryThresholdSearchAuthorized: false as const,
  }),
});

export const FR312G5_PARTITION_ALLOCATION_RATIONALE = Object.freeze({
  rationaleId: FR312G5_RATIONALE_ID,
  authorityState:
    'partition_allocation_method_defined_no_numeric_allocation_or_execution' as const,
  studyProtocolId: FR312G_STUDY_DESIGN.protocolId,
  consentProtocolId: FR312G3_CONSENT_WITHDRAWAL_PROTOCOL.protocolId,
  participantCountRationaleId: FR312G4_PLANNING_CONTRACT.rationaleId,
  splitUnit: FR312F_PARTITION_POLICY.splitUnit,
  partitions: Object.freeze([...FR312F_PARTITION_POLICY.partitions]),
  purposes: FR312G5_PARTITION_PURPOSES,
  lineage: Object.freeze({
    oneAssignmentPerParticipant: true as const,
    studyLocalPseudonymousParticipantRefRequired: true as const,
    participantGroupingRequiresNonBiometricProvenance: true as const,
    faceEmbeddingForGroupingAllowed: false as const,
    biometricIdentityMatchingForGroupingAllowed: false as const,
    sessionInheritsParticipantPartition: true as const,
    captureFamilyInheritsParticipantPartition: true as const,
    imageInheritsParticipantPartition: true as const,
    annotationAndMetricInheritParticipantPartition: true as const,
    snapshotsCachesExportsDerivativesPreservePartitionProvenance: true as const,
    crossPartitionParticipantSessionCaptureOrImageReuseAllowed: false as const,
    unprovenLineageAdmissionAllowed: false as const,
  }),
  freezePolicy: Object.freeze({
    beforeNeutralMetricValuesObserved: true as const,
    beforeMorphologyAnnotationsObserved: true as const,
    beforeTraditionalSemanticTailObserved: true as const,
    postHocReassignmentAllowed: false as const,
    metricOrLabelAwareAllocationAllowed: false as const,
    extraCaptureCherryPickingAllowed: false as const,
    outcomeAwareReplacementAllowed: false as const,
    holdoutThresholdDiscoveryAllowed: false as const,
  }),
  withdrawalPolicy: Object.freeze({
    participantLinkedPartitionAssignmentDeleted: true as const,
    participantStudyLinkageRetired: true as const,
    futureAnalysisEligibilityAfterWithdrawal: false as const,
    assignWithdrawnParticipantElsewhereAllowed: false as const,
    recoverLinkageFromAggregateAllowed: false as const,
    deletionEvidenceContainsReconstructiveImageData: false as const,
    replenishMissingCountByPostHocReassignmentAllowed: false as const,
    shortageRequiresProspectiveReplanAndSeparateSignoff: true as const,
  }),
  futureAllocatorPrerequisites: FR312G5_FUTURE_ALLOCATOR_PREREQUISITES,
  approvedParticipantCount: null,
  approvedDevelopmentEffectiveParticipantCount: null,
  approvedPartitionRatios: null,
  approvedPartitionCounts: null,
  allocationAlgorithm: null,
  allocationSeed: null,
  approvedSamplingQuota: null,
  allocatorVersion: null,
  allocationManifest: null,
  allocationAuditLog: null,
  numericAllocationAuthorized: false as const,
  partitionAssignmentRuntimeIssued: false as const,
  participantRecruitmentAuthorized: false as const,
  actualCollectionAuthorized: false as const,
  fr312gExecutionAuthorized: false as const,
  fr312hEntryAuthorized: false as const,
  nextAction:
    'obtain_evidence_backed_numeric_count_and_partition_signoff_then_review_dedicated_empirical_runtime_admission' as const,
});

export const FR312G5_BLOCKER_ACCOUNTING = Object.freeze({
  retentionPrivacyPolicyIssued: true as const,
  consentWithdrawalProtocolIssued: true as const,
  participantCountSizingMethodDefined: true as const,
  partitionAllocationMethodDefined: true as const,
  evidenceBackedParticipantCountApproved: false as const,
  numericPartitionAllocationApproved: false as const,
  empiricalCollectionRuntimeIssued: false as const,
  empiricalCollectionAdmissionIssued: false as const,
  actualParticipantCollectionAuthorized: false as const,
  fr312gReliabilityExecutionAuthorized: false as const,
  fr312hEntryAuthorized: false as const,
});

export const FR312G5_AUTHORITY_BOUNDARY = Object.freeze({
  numericParticipantCountAuthorized: false as const,
  numericPartitionRatioAuthorized: false as const,
  allocationAlgorithmAuthorized: false as const,
  demographicQuotaAuthorized: false as const,
  recruitmentAuthorized: false as const,
  actualCollectionAuthorized: false as const,
  neutralMetricReliabilityExecutionAuthorized: false as const,
  calibrationOrHoldoutResearchAuthorized: false as const,
  morphologyEquivalenceAuthorized: false as const,
  thresholdDiscoveryAuthorized: false as const,
  traditionalBindingAuthorized: false as const,
  productInterpretationAuthorized: false as const,
});

export interface SyntheticPartitionLineageRowFR312G5 {
  readonly participantRef: string;
  readonly sessionRef: string;
  readonly captureFamilyRef: string;
  readonly imageRef: string;
  readonly partition: typeof FR312F_PARTITION_POLICY.partitions[number];
  readonly assignmentFrozenBeforeMeasurementAndLabels: boolean;
  readonly participantWithdrawn: boolean;
}

/**
 * Pure diagnostic for explicitly synthetic test fixtures only.
 * Does not allocate participants, read study data, or authorize collection.
 */
export function reviewSyntheticPartitionLineageFR312G5(
  rows: readonly SyntheticPartitionLineageRowFR312G5[],
): readonly string[] {
  const violations = new Set<string>();
  const participantPartition = new Map<string, string>();
  const lineageOwnership = new Map<string, string>();
  for (const row of rows) {
    if (
      !row.participantRef.trim()
      || !row.sessionRef.trim()
      || !row.captureFamilyRef.trim()
      || !row.imageRef.trim()
    ) {
      violations.add('missing_non_biometric_lineage');
      continue;
    }
    if (!FR312F_PARTITION_POLICY.partitions.includes(row.partition)) {
      violations.add('unapproved_partition');
    }
    const previousPartition = participantPartition.get(row.participantRef);
    if (previousPartition !== undefined && previousPartition !== row.partition) {
      violations.add('participant_cross_partition_leakage');
    }
    participantPartition.set(row.participantRef, row.partition);
    for (const ref of [
      'session:' + row.sessionRef,
      'capture_family:' + row.captureFamilyRef,
      'image:' + row.imageRef,
    ]) {
      const owner = lineageOwnership.get(ref);
      if (owner !== undefined && owner !== row.participantRef) {
        violations.add('lineage_cross_participant_reuse');
      }
      lineageOwnership.set(ref, row.participantRef);
    }
    if (!row.assignmentFrozenBeforeMeasurementAndLabels) {
      violations.add('assignment_not_frozen_before_observation');
    }
    if (row.participantWithdrawn) {
      violations.add('withdrawn_participant_lineage_retained');
    }
  }
  return Object.freeze([...violations]);
}

export function assertPartitionAllocationRationaleFR312G5(): void {
  assertNeutralMetricReliabilityStudyDesignFR312G();
  assertParticipantConsentWithdrawalProtocolFR312G3();
  assertParticipantCountPlanningRationaleFR312G4();

  const r = FR312G5_PARTITION_ALLOCATION_RATIONALE;
  if (
    r.studyProtocolId !== FR312G_STUDY_DESIGN.protocolId
    || r.consentProtocolId !== FR312G3_CONSENT_WITHDRAWAL_PROTOCOL.protocolId
    || r.participantCountRationaleId !== FR312G4_PLANNING_CONTRACT.rationaleId
    || r.splitUnit !== 'participant'
    || r.partitions.join('|') !== 'development|calibration|holdout'
    || r.partitions.join('|') !== FR312F_PARTITION_POLICY.partitions.join('|')
  ) {
    throw new Error('fr312g5_upstream_partition_binding_drift');
  }

  if (
    !r.lineage.oneAssignmentPerParticipant
    || !r.lineage.studyLocalPseudonymousParticipantRefRequired
    || !r.lineage.sessionInheritsParticipantPartition
    || !r.lineage.captureFamilyInheritsParticipantPartition
    || !r.lineage.imageInheritsParticipantPartition
    || !r.lineage.annotationAndMetricInheritParticipantPartition
    || !r.lineage.snapshotsCachesExportsDerivativesPreservePartitionProvenance
    || r.lineage.faceEmbeddingForGroupingAllowed !== false
    || r.lineage.biometricIdentityMatchingForGroupingAllowed !== false
    || r.lineage.crossPartitionParticipantSessionCaptureOrImageReuseAllowed
    || r.lineage.unprovenLineageAdmissionAllowed
  ) {
    throw new Error('fr312g5_partition_lineage_drift');
  }

  if (
    !r.freezePolicy.beforeNeutralMetricValuesObserved
    || !r.freezePolicy.beforeMorphologyAnnotationsObserved
    || !r.freezePolicy.beforeTraditionalSemanticTailObserved
    || r.freezePolicy.postHocReassignmentAllowed
    || r.freezePolicy.metricOrLabelAwareAllocationAllowed
    || r.freezePolicy.extraCaptureCherryPickingAllowed
    || r.freezePolicy.outcomeAwareReplacementAllowed
    || r.freezePolicy.holdoutThresholdDiscoveryAllowed
    || r.purposes.calibration.fr312gReliabilityReadAuthorized
    || r.purposes.holdout.fr312gReliabilityReadAuthorized
    || r.purposes.holdout.currentAccessAuthorized
    || FR312G_STUDY_DESIGN.repeatability.calibrationPartitionReadable
    || FR312G_STUDY_DESIGN.repeatability.holdoutPartitionReadable
  ) {
    throw new Error('fr312g5_freeze_or_partition_access_drift');
  }

  if (
    r.withdrawalPolicy.participantLinkedPartitionAssignmentDeleted
      !== FR312G3_CONSENT_WITHDRAWAL_PROTOCOL.withdrawalProtocol
        .participantPartitionAssignmentDeletionRequired
    || r.withdrawalPolicy.participantStudyLinkageRetired
      !== FR312G3_CONSENT_WITHDRAWAL_PROTOCOL.withdrawalProtocol
        .participantStudyLinkageRetirementRequired
    || r.withdrawalPolicy.futureAnalysisEligibilityAfterWithdrawal
      !== false
    || r.withdrawalPolicy.assignWithdrawnParticipantElsewhereAllowed
    || r.withdrawalPolicy.recoverLinkageFromAggregateAllowed
    || r.withdrawalPolicy.deletionEvidenceContainsReconstructiveImageData
    || r.withdrawalPolicy.replenishMissingCountByPostHocReassignmentAllowed
    || !r.withdrawalPolicy.shortageRequiresProspectiveReplanAndSeparateSignoff
  ) {
    throw new Error('fr312g5_withdrawal_and_reassignment_drift');
  }

  if (
    r.futureAllocatorPrerequisites.length !== 9
    || new Set(r.futureAllocatorPrerequisites).size !== 9
    || FR312F_SAMPLE_DESIGN.participantCount !== null
    || FR312F_SAMPLE_DESIGN.partitionRatios !== null
    || FR312G4_PLANNING_CONTRACT.participantCountAuthorized
    || FR312G4_PLANNING_CONTRACT.partitionAllocationAuthorized
    || r.approvedParticipantCount !== null
    || r.approvedDevelopmentEffectiveParticipantCount !== null
    || r.approvedPartitionRatios !== null
    || r.approvedPartitionCounts !== null
    || r.allocationAlgorithm !== null
    || r.allocationSeed !== null
    || r.approvedSamplingQuota !== null
    || r.allocatorVersion !== null
    || r.allocationManifest !== null
    || r.allocationAuditLog !== null
  ) {
    throw new Error('fr312g5_premature_numeric_or_runtime_authority');
  }

  for (const [key, value] of Object.entries(FR312G5_BLOCKER_ACCOUNTING)) {
    const defined = [
      'retentionPrivacyPolicyIssued',
      'consentWithdrawalProtocolIssued',
      'participantCountSizingMethodDefined',
      'partitionAllocationMethodDefined',
    ].includes(key);
    if (value !== defined) {
      throw new Error('fr312g5_blocker_resolution_drift:' + key);
    }
  }
  for (const [key, value] of Object.entries(FR312G5_AUTHORITY_BOUNDARY)) {
    if (value !== false) {
      throw new Error('fr312g5_unauthorized_authority_widening:' + key);
    }
  }
  if (
    r.numericAllocationAuthorized
    || r.partitionAssignmentRuntimeIssued
    || r.participantRecruitmentAuthorized
    || r.actualCollectionAuthorized
    || r.fr312gExecutionAuthorized
    || r.fr312hEntryAuthorized
  ) {
    throw new Error('fr312g5_execution_gate_bypass');
  }
}
