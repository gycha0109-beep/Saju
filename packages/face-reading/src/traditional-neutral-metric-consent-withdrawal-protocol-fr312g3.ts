import {
  FR312G_STUDY_DESIGN,
  assertNeutralMetricReliabilityStudyDesignFR312G,
} from './traditional-neutral-metric-reliability-study-fr312g.js';
import {
  FR312G2_POLICY,
  assertDedicatedRetentionPrivacyPolicyFR312G2,
} from './traditional-neutral-metric-retention-privacy-policy-fr312g2.js';

export const FR312G3_PROTOCOL_ID =
  'fr312g3.participant_consent_withdrawal_protocol' as const;

export const FR312G3_REQUIRED_CONSENT_ITEMS = Object.freeze([
  'study_notice_read',
  'voluntary_participation_confirmed',
  'face_capture_consent',
  'transient_raw_capture_processing_consent',
  'sanitized_review_image_retention_consent',
  'pseudonymous_morphology_annotation_storage_consent',
  'pseudonymous_neutral_metric_storage_consent',
  'no_training_reuse_acknowledged',
  'no_production_or_product_personalization_reuse_acknowledged',
  'no_biometric_identity_matching_acknowledged',
  'withdrawal_procedure_acknowledged',
] as const);

export type ParticipantConsentItemFR312G3 =
  typeof FR312G3_REQUIRED_CONSENT_ITEMS[number];

export interface ParticipantConsentReceiptContractFR312G3 {
  readonly studyProtocolId: typeof FR312G_STUDY_DESIGN.protocolId;
  readonly consentProtocolId: typeof FR312G3_PROTOCOL_ID;
  readonly participantRefType: 'protocol_local_pseudonymous_participant_ref';
  readonly consentRecordedAtRequired: true;
  readonly explicitConfirmationRequiredForEveryConsentItem: true;
  readonly withdrawalHandleIssuedAtConsent: true;
  readonly withdrawalHandleMustNotEncodeDirectIdentity: true;
  readonly lossOfWithdrawalHandleMustNotEliminateWithdrawalPath: true;
  readonly realNameStoredInMeasurementDataset: false;
  readonly emailStoredInMeasurementDataset: false;
  readonly signatureImageStoredInMeasurementDataset: false;
  readonly faceEmbeddingStored: false;
  readonly identityTemplateStored: false;
  readonly biometricIdentityMatchingRequired: false;
  readonly legalConsentSufficiencyEstablishedByReceipt: false;
  readonly receiptAloneAuthorizesCollection: false;
}

export interface ParticipantWithdrawalProtocolFR312G3 {
  readonly withdrawalRequestMustBindStudyParticipant: true;
  readonly withdrawalHandleOrGovernedNonBiometricVerificationSupported: true;
  readonly withdrawalHandleLossBlocksWithdrawal: false;
  readonly biometricIdentityMatchingForWithdrawalAuthorized: false;
  readonly withdrawalRequestTimestampRequired: true;
  readonly withdrawalRequestAuditEventRequired: true;
  readonly futureCaptureStopsOnValidWithdrawal: true;
  readonly newPrimaryAnnotationStopsOnValidWithdrawal: true;
  readonly newAdjudicationStopsOnValidWithdrawal: true;
  readonly retainedRawImageDeletionRequired: true;
  readonly retainedReviewImageDeletionRequired: true;
  readonly participantLinkedMorphologyAnnotationDeletionRequired: true;
  readonly participantLinkedNeutralMetricDeletionRequired: true;
  readonly participantPartitionAssignmentDeletionRequired: true;
  readonly participantStudyLinkageRetirementRequired: true;
  readonly futureAnalysisEligibilityAfterWithdrawal: false;
  readonly participantLevelDeletionEvidenceRequired: true;
  readonly deletionEvidenceMustNotContainImageBytes: true;
}

export interface AggregateWithoutParticipantLinkageBoundaryFR312G3 {
  readonly participantLinkedRowsMustBeRemovedBeforeFutureAnalysis: true;
  readonly aggregateWithoutParticipantLevelLinkageMayRemain: true;
  readonly deidentificationSufficiencyEstablished: false;
  readonly aggregateMayBeUsedToReidentifyParticipant: false;
  readonly participantLevelLinkageMayBeRecreatedFromAggregate: false;
  readonly thisProtocolClaimsLegalRightToRetainAggregate: false;
  readonly laterGovernanceMayRequireStricterDisposition: true;
}

export const FR312G3_STUDY_NOTICE = Object.freeze({
  purpose:
    'evaluate_repeatability_missingness_and_capture_sensitivity_of_neutral_visible_morphology_metrics' as const,
  traditionalSemanticClaimValidationIncluded: false as const,
  automatedTraditionalBindingIncluded: false as const,
  productionPersonalizationIncluded: false as const,
  identityRecognitionIncluded: false as const,
  reviewImageMaximumRetentionDays:
    FR312G2_POLICY.reviewArtifactLifecycle.maxRetentionDays,
  reviewImageMayBeDeletedEarlier: true as const,
  participationVoluntary: true as const,
  withdrawalProcedureProvided: true as const,
  collectionStillRequiresSeparateEmpiricalAdmission: true as const,
});

export const FR312G3_CONSENT_RECEIPT_CONTRACT:
ParticipantConsentReceiptContractFR312G3 = Object.freeze({
  studyProtocolId: FR312G_STUDY_DESIGN.protocolId,
  consentProtocolId: FR312G3_PROTOCOL_ID,
  participantRefType: 'protocol_local_pseudonymous_participant_ref',
  consentRecordedAtRequired: true,
  explicitConfirmationRequiredForEveryConsentItem: true,
  withdrawalHandleIssuedAtConsent: true,
  withdrawalHandleMustNotEncodeDirectIdentity: true,
  lossOfWithdrawalHandleMustNotEliminateWithdrawalPath: true,
  realNameStoredInMeasurementDataset: false,
  emailStoredInMeasurementDataset: false,
  signatureImageStoredInMeasurementDataset: false,
  faceEmbeddingStored: false,
  identityTemplateStored: false,
  biometricIdentityMatchingRequired: false,
  legalConsentSufficiencyEstablishedByReceipt: false,
  receiptAloneAuthorizesCollection: false,
});

export const FR312G3_WITHDRAWAL_PROTOCOL:
ParticipantWithdrawalProtocolFR312G3 = Object.freeze({
  withdrawalRequestMustBindStudyParticipant: true,
  withdrawalHandleOrGovernedNonBiometricVerificationSupported: true,
  withdrawalHandleLossBlocksWithdrawal: false,
  biometricIdentityMatchingForWithdrawalAuthorized: false,
  withdrawalRequestTimestampRequired: true,
  withdrawalRequestAuditEventRequired: true,
  futureCaptureStopsOnValidWithdrawal: true,
  newPrimaryAnnotationStopsOnValidWithdrawal: true,
  newAdjudicationStopsOnValidWithdrawal: true,
  retainedRawImageDeletionRequired: true,
  retainedReviewImageDeletionRequired: true,
  participantLinkedMorphologyAnnotationDeletionRequired: true,
  participantLinkedNeutralMetricDeletionRequired: true,
  participantPartitionAssignmentDeletionRequired: true,
  participantStudyLinkageRetirementRequired: true,
  futureAnalysisEligibilityAfterWithdrawal: false,
  participantLevelDeletionEvidenceRequired: true,
  deletionEvidenceMustNotContainImageBytes: true,
});

export const FR312G3_AGGREGATE_WITHOUT_PARTICIPANT_LINKAGE_BOUNDARY:
AggregateWithoutParticipantLinkageBoundaryFR312G3 = Object.freeze({
  participantLinkedRowsMustBeRemovedBeforeFutureAnalysis: true,
  aggregateWithoutParticipantLevelLinkageMayRemain: true,
  deidentificationSufficiencyEstablished: false,
  aggregateMayBeUsedToReidentifyParticipant: false,
  participantLevelLinkageMayBeRecreatedFromAggregate: false,
  thisProtocolClaimsLegalRightToRetainAggregate: false,
  laterGovernanceMayRequireStricterDisposition: true,
});

export const FR312G3_CONSENT_WITHDRAWAL_PROTOCOL = Object.freeze({
  protocolId: FR312G3_PROTOCOL_ID,
  authorityState:
    'dedicated_consent_withdrawal_protocol_defined_collection_still_blocked' as const,
  studyProtocolId: FR312G_STUDY_DESIGN.protocolId,
  retentionPrivacyPolicyId: FR312G2_POLICY.policyId,
  requiredConsentItems: FR312G3_REQUIRED_CONSENT_ITEMS,
  studyNotice: FR312G3_STUDY_NOTICE,
  receiptContract: FR312G3_CONSENT_RECEIPT_CONTRACT,
  withdrawalProtocol: FR312G3_WITHDRAWAL_PROTOCOL,
  aggregateWithoutParticipantLinkageBoundary:
    FR312G3_AGGREGATE_WITHOUT_PARTICIPANT_LINKAGE_BOUNDARY,
  blockerResolution: Object.freeze({
    dedicatedRetentionPrivacyPolicyIssued: true as const,
    dedicatedConsentWithdrawalProtocolIssued: true as const,
    participantCountRationaleIssued: false as const,
    partitionAllocationRationaleIssued: false as const,
    empiricalCollectionRuntimeIssued: false as const,
    empiricalCollectionAdmissionIssued: false as const,
    actualParticipantCollectionAuthorized: false as const,
    fr312gReliabilityExecutionAuthorized: false as const,
    fr312hEntryAuthorized: false as const,
  }),
  nextAction:
    'issue_fr312g_participant_count_and_partition_allocation_rationale_before_empirical_runtime_admission' as const,
});

export const FR312G3_AUTHORITY_BOUNDARY = Object.freeze({
  consentProtocolDefined: true as const,
  consentReceiptCollectionAuthorized: false as const,
  actualParticipantCollectionAuthorized: false as const,
  participantCountAuthorized: false as const,
  partitionAllocationAuthorized: false as const,
  empiricalRuntimeAuthorized: false as const,
  reliabilityExecutionAuthorized: false as const,
  morphologyEquivalenceAuthorized: false as const,
  thresholdDiscoveryAuthorized: false as const,
  traditionalSemanticValidationAuthorized: false as const,
  automaticTraditionalBindingAuthorized: false as const,
  productionPromotionAuthorized: false as const,
  productInterpretationAuthorized: false as const,
  legalConsentSufficiencyEstablished: false as const,
});

function sameStrings(
  actual: readonly string[],
  expected: readonly string[],
): boolean {
  return actual.length === expected.length
    && actual.every((value, index) => value === expected[index]);
}

export function assertParticipantConsentWithdrawalProtocolFR312G3(): void {
  assertNeutralMetricReliabilityStudyDesignFR312G();
  assertDedicatedRetentionPrivacyPolicyFR312G2();

  if (
    FR312G3_CONSENT_WITHDRAWAL_PROTOCOL.studyProtocolId
      !== FR312G_STUDY_DESIGN.protocolId
    || FR312G3_CONSENT_WITHDRAWAL_PROTOCOL.retentionPrivacyPolicyId
      !== FR312G2_POLICY.policyId
  ) {
    throw new Error('fr312g3_upstream_binding_drift');
  }

  if (
    !sameStrings(
      FR312G3_CONSENT_WITHDRAWAL_PROTOCOL.requiredConsentItems,
      [
        'study_notice_read',
        'voluntary_participation_confirmed',
        'face_capture_consent',
        'transient_raw_capture_processing_consent',
        'sanitized_review_image_retention_consent',
        'pseudonymous_morphology_annotation_storage_consent',
        'pseudonymous_neutral_metric_storage_consent',
        'no_training_reuse_acknowledged',
        'no_production_or_product_personalization_reuse_acknowledged',
        'no_biometric_identity_matching_acknowledged',
        'withdrawal_procedure_acknowledged',
      ],
    )
  ) {
    throw new Error('fr312g3_required_consent_drift');
  }

  if (
    FR312G3_STUDY_NOTICE.reviewImageMaximumRetentionDays !== 30
    || FR312G3_STUDY_NOTICE.traditionalSemanticClaimValidationIncluded
      !== false
    || FR312G3_STUDY_NOTICE.identityRecognitionIncluded !== false
    || FR312G3_STUDY_NOTICE.collectionStillRequiresSeparateEmpiricalAdmission
      !== true
  ) {
    throw new Error('fr312g3_study_notice_drift');
  }

  if (
    FR312G3_CONSENT_RECEIPT_CONTRACT
      .explicitConfirmationRequiredForEveryConsentItem !== true
    || FR312G3_CONSENT_RECEIPT_CONTRACT.withdrawalHandleIssuedAtConsent
      !== true
    || FR312G3_CONSENT_RECEIPT_CONTRACT
      .withdrawalHandleMustNotEncodeDirectIdentity !== true
    || FR312G3_CONSENT_RECEIPT_CONTRACT
      .lossOfWithdrawalHandleMustNotEliminateWithdrawalPath !== true
    || FR312G3_CONSENT_RECEIPT_CONTRACT
      .biometricIdentityMatchingRequired !== false
    || FR312G3_CONSENT_RECEIPT_CONTRACT
      .legalConsentSufficiencyEstablishedByReceipt !== false
    || FR312G3_CONSENT_RECEIPT_CONTRACT.receiptAloneAuthorizesCollection
      !== false
  ) {
    throw new Error('fr312g3_consent_receipt_boundary_drift');
  }

  if (
    FR312G3_WITHDRAWAL_PROTOCOL.futureCaptureStopsOnValidWithdrawal !== true
    || FR312G3_WITHDRAWAL_PROTOCOL
      .participantLinkedMorphologyAnnotationDeletionRequired !== true
    || FR312G3_WITHDRAWAL_PROTOCOL
      .participantLinkedNeutralMetricDeletionRequired !== true
    || FR312G3_WITHDRAWAL_PROTOCOL
      .participantPartitionAssignmentDeletionRequired !== true
    || FR312G3_WITHDRAWAL_PROTOCOL
      .participantStudyLinkageRetirementRequired !== true
    || FR312G3_WITHDRAWAL_PROTOCOL.futureAnalysisEligibilityAfterWithdrawal
      !== false
    || FR312G3_WITHDRAWAL_PROTOCOL
      .withdrawalHandleOrGovernedNonBiometricVerificationSupported !== true
    || FR312G3_WITHDRAWAL_PROTOCOL.withdrawalHandleLossBlocksWithdrawal
      !== false
    || FR312G3_WITHDRAWAL_PROTOCOL
      .biometricIdentityMatchingForWithdrawalAuthorized !== false
  ) {
    throw new Error('fr312g3_withdrawal_disposition_drift');
  }

  if (
    FR312G3_AGGREGATE_WITHOUT_PARTICIPANT_LINKAGE_BOUNDARY
      .participantLinkedRowsMustBeRemovedBeforeFutureAnalysis !== true
    || FR312G3_AGGREGATE_WITHOUT_PARTICIPANT_LINKAGE_BOUNDARY
      .aggregateWithoutParticipantLevelLinkageMayRemain !== true
    || FR312G3_AGGREGATE_WITHOUT_PARTICIPANT_LINKAGE_BOUNDARY
      .deidentificationSufficiencyEstablished !== false
    || FR312G3_AGGREGATE_WITHOUT_PARTICIPANT_LINKAGE_BOUNDARY
      .aggregateMayBeUsedToReidentifyParticipant !== false
    || FR312G3_AGGREGATE_WITHOUT_PARTICIPANT_LINKAGE_BOUNDARY
      .participantLevelLinkageMayBeRecreatedFromAggregate !== false
    || FR312G3_AGGREGATE_WITHOUT_PARTICIPANT_LINKAGE_BOUNDARY
      .thisProtocolClaimsLegalRightToRetainAggregate !== false
  ) {
    throw new Error('fr312g3_deidentified_aggregate_boundary_drift');
  }

  if (
    FR312G3_CONSENT_WITHDRAWAL_PROTOCOL.blockerResolution
      .dedicatedRetentionPrivacyPolicyIssued !== true
    || FR312G3_CONSENT_WITHDRAWAL_PROTOCOL.blockerResolution
      .dedicatedConsentWithdrawalProtocolIssued !== true
    || FR312G3_CONSENT_WITHDRAWAL_PROTOCOL.blockerResolution
      .participantCountRationaleIssued !== false
    || FR312G3_CONSENT_WITHDRAWAL_PROTOCOL.blockerResolution
      .partitionAllocationRationaleIssued !== false
    || FR312G3_CONSENT_WITHDRAWAL_PROTOCOL.blockerResolution
      .actualParticipantCollectionAuthorized !== false
    || FR312G3_CONSENT_WITHDRAWAL_PROTOCOL.blockerResolution
      .fr312gReliabilityExecutionAuthorized !== false
    || FR312G3_CONSENT_WITHDRAWAL_PROTOCOL.blockerResolution
      .fr312hEntryAuthorized !== false
  ) {
    throw new Error('fr312g3_blocker_resolution_drift');
  }

  for (const [key, value] of Object.entries(FR312G3_AUTHORITY_BOUNDARY)) {
    if (key === 'consentProtocolDefined') {
      if (value !== true) {
        throw new Error('fr312g3_consent_protocol_not_defined');
      }
      continue;
    }
    if (value !== false) {
      throw new Error('fr312g3_authority_widening:' + key);
    }
  }
}
