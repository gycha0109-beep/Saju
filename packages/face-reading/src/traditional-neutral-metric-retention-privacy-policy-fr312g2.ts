import {
  FR312G_STUDY_DESIGN,
  assertNeutralMetricReliabilityStudyDesignFR312G,
} from './traditional-neutral-metric-reliability-study-fr312g.js';
import {
  FR312G1_REQUIRED_DEDICATED_ARTIFACTS,
  FR312G1_REVIEW,
  assertCollectionPrerequisiteReuseReviewFR312G1,
} from './traditional-neutral-metric-collection-prerequisite-review-fr312g1.js';

export const FR312G2_POLICY_ID =
  'fr312g2.dedicated_retention_privacy_policy' as const;

export const FR312G2_MAX_REVIEW_IMAGE_RETENTION_DAYS = 30 as const;

export interface NeutralMetricRetentionPrivacyPolicyFR312G2 {
  readonly policyId: typeof FR312G2_POLICY_ID;
  readonly authorityState:
    'dedicated_retention_privacy_policy_issued_collection_still_blocked';
  readonly studyBinding: {
    readonly fr312gProtocolId: typeof FR312G_STUDY_DESIGN.protocolId;
    readonly fr312g1ReviewId: typeof FR312G1_REVIEW.reviewId;
    readonly dedicatedArtifactKey: 'fr312g_retention_and_privacy_policy';
    readonly sourceRuntimeAuthorityInherited: false;
  };
  readonly numericDecision: {
    readonly maxReviewImageRetentionDays:
      typeof FR312G2_MAX_REVIEW_IMAGE_RETENTION_DAYS;
    readonly finiteMaximumIssued: true;
    readonly fr239ThirtyDayPrecedentConsulted: true;
    readonly inheritedAutomaticallyFromFR239: false;
    readonly rationale:
      'thirty_days_is_a_dedicated_operational_upper_bound_for_short_lived_annotation_adjudication_and_audit_with_mandatory_earlier_deletion_when_work_completes';
    readonly legalSufficiencyClaimed: false;
    readonly empiricalSufficiencyClaimed: false;
  };
  readonly rawCaptureLifecycle: {
    readonly persistenceClass: 'ephemeral_processing_only';
    readonly admittedToResearchDatasetAsRawOriginal: false;
    readonly embeddedMetadataSanitizationBeforeReviewArtifact: true;
    readonly sanitizedReviewArtifactMustBindSameCapture: true;
    readonly deleteRawOriginalAfterSanitizedReviewArtifactCreation: true;
    readonly trainingReuseAllowed: false;
    readonly productionReuseAllowed: false;
  };
  readonly reviewArtifactLifecycle: {
    readonly artifactClass: 'sanitized_morphology_research_review_image';
    readonly potentiallyIdentifyingFaceAcknowledged: true;
    readonly maxRetentionDays:
      typeof FR312G2_MAX_REVIEW_IMAGE_RETENTION_DAYS;
    readonly deleteEarlierWhenAnnotationAdjudicationMetricAuditComplete: true;
    readonly unboundedRetentionAuthorized: false;
    readonly retentionExtensionAuthorizedByDefault: false;
    readonly embeddedMetadataSanitizationRequired: true;
    readonly rawProviderResponseRetentionAllowed: false;
    readonly rawLandmarkRetentionAllowed: false;
    readonly metricValuesEmbeddedInImageArtifact: false;
    readonly traditionalSemanticTailEmbeddedInImageArtifact: false;
    readonly trainingReuseAllowed: false;
    readonly productionReuseAllowed: false;
    readonly productPersonalizationReuseAllowed: false;
  };
  readonly accessPolicy: {
    readonly assignedResearchOperatorAccessAllowed: true;
    readonly assignedPrimaryAnnotatorAccessAllowed: true;
    readonly assignedAdjudicatorAccessAllowed: true;
    readonly assignedAuditorAccessAllowed: true;
    readonly generalProductAccessAllowed: false;
    readonly publicAccessAllowed: false;
    readonly accessPurposeMustBeResearchTaskBound: true;
  };
  readonly identityBoundary: {
    readonly pseudonymousParticipantRefRequired: true;
    readonly realNameRequiredInMeasurementDataset: false;
    readonly biometricIdentityMatchingAllowed: false;
    readonly faceEmbeddingAllowed: false;
    readonly identityTemplateAllowed: false;
    readonly identityInferenceAllowed: false;
  };
  readonly deletionEvidence: {
    readonly deletionEventRequired: true;
    readonly participantRefRequired: true;
    readonly artifactRefRequired: true;
    readonly deletionReasonRequired: true;
    readonly deletionTimestampRequired: true;
    readonly rawImageBytesInDeletionEvidenceAllowed: false;
    readonly deletedImageReconstructionDataAllowed: false;
  };
  readonly withdrawalInteraction: {
    readonly validWithdrawalStopsFutureCapture: true;
    readonly validWithdrawalStopsNewAnnotationWork: true;
    readonly retainedReviewImageDeletionRequired: true;
    readonly retainedRawOriginalDeletionRequired: true;
    readonly participantLevelMetricAndAnnotationDisposition:
      'must_be_defined_by_dedicated_fr312g_consent_withdrawal_protocol';
    readonly consentWithdrawalProtocolStillRequired: true;
    readonly thisPolicyAloneAuthorizesCollection: false;
  };
  readonly blockerResolution: {
    readonly dedicatedRetentionPrivacyPolicyIssued: true;
    readonly dedicatedConsentWithdrawalProtocolIssued: false;
    readonly participantCountRationaleIssued: false;
    readonly partitionAllocationRationaleIssued: false;
    readonly empiricalCollectionRuntimeIssued: false;
    readonly empiricalCollectionAdmissionIssued: false;
    readonly actualParticipantCollectionAuthorized: false;
    readonly fr312gReliabilityExecutionAuthorized: false;
    readonly fr312hEntryAuthorized: false;
  };
  readonly nextAction:
    'issue_dedicated_fr312g_participant_consent_and_withdrawal_protocol';
}

export const FR312G2_POLICY:
NeutralMetricRetentionPrivacyPolicyFR312G2 = Object.freeze({
  policyId: FR312G2_POLICY_ID,
  authorityState:
    'dedicated_retention_privacy_policy_issued_collection_still_blocked',
  studyBinding: Object.freeze({
    fr312gProtocolId: FR312G_STUDY_DESIGN.protocolId,
    fr312g1ReviewId: FR312G1_REVIEW.reviewId,
    dedicatedArtifactKey: 'fr312g_retention_and_privacy_policy',
    sourceRuntimeAuthorityInherited: false,
  }),
  numericDecision: Object.freeze({
    maxReviewImageRetentionDays: FR312G2_MAX_REVIEW_IMAGE_RETENTION_DAYS,
    finiteMaximumIssued: true,
    fr239ThirtyDayPrecedentConsulted: true,
    inheritedAutomaticallyFromFR239: false,
    rationale:
      'thirty_days_is_a_dedicated_operational_upper_bound_for_short_lived_annotation_adjudication_and_audit_with_mandatory_earlier_deletion_when_work_completes',
    legalSufficiencyClaimed: false,
    empiricalSufficiencyClaimed: false,
  }),
  rawCaptureLifecycle: Object.freeze({
    persistenceClass: 'ephemeral_processing_only',
    admittedToResearchDatasetAsRawOriginal: false,
    embeddedMetadataSanitizationBeforeReviewArtifact: true,
    sanitizedReviewArtifactMustBindSameCapture: true,
    deleteRawOriginalAfterSanitizedReviewArtifactCreation: true,
    trainingReuseAllowed: false,
    productionReuseAllowed: false,
  }),
  reviewArtifactLifecycle: Object.freeze({
    artifactClass: 'sanitized_morphology_research_review_image',
    potentiallyIdentifyingFaceAcknowledged: true,
    maxRetentionDays: FR312G2_MAX_REVIEW_IMAGE_RETENTION_DAYS,
    deleteEarlierWhenAnnotationAdjudicationMetricAuditComplete: true,
    unboundedRetentionAuthorized: false,
    retentionExtensionAuthorizedByDefault: false,
    embeddedMetadataSanitizationRequired: true,
    rawProviderResponseRetentionAllowed: false,
    rawLandmarkRetentionAllowed: false,
    metricValuesEmbeddedInImageArtifact: false,
    traditionalSemanticTailEmbeddedInImageArtifact: false,
    trainingReuseAllowed: false,
    productionReuseAllowed: false,
    productPersonalizationReuseAllowed: false,
  }),
  accessPolicy: Object.freeze({
    assignedResearchOperatorAccessAllowed: true,
    assignedPrimaryAnnotatorAccessAllowed: true,
    assignedAdjudicatorAccessAllowed: true,
    assignedAuditorAccessAllowed: true,
    generalProductAccessAllowed: false,
    publicAccessAllowed: false,
    accessPurposeMustBeResearchTaskBound: true,
  }),
  identityBoundary: Object.freeze({
    pseudonymousParticipantRefRequired: true,
    realNameRequiredInMeasurementDataset: false,
    biometricIdentityMatchingAllowed: false,
    faceEmbeddingAllowed: false,
    identityTemplateAllowed: false,
    identityInferenceAllowed: false,
  }),
  deletionEvidence: Object.freeze({
    deletionEventRequired: true,
    participantRefRequired: true,
    artifactRefRequired: true,
    deletionReasonRequired: true,
    deletionTimestampRequired: true,
    rawImageBytesInDeletionEvidenceAllowed: false,
    deletedImageReconstructionDataAllowed: false,
  }),
  withdrawalInteraction: Object.freeze({
    validWithdrawalStopsFutureCapture: true,
    validWithdrawalStopsNewAnnotationWork: true,
    retainedReviewImageDeletionRequired: true,
    retainedRawOriginalDeletionRequired: true,
    participantLevelMetricAndAnnotationDisposition:
      'must_be_defined_by_dedicated_fr312g_consent_withdrawal_protocol',
    consentWithdrawalProtocolStillRequired: true,
    thisPolicyAloneAuthorizesCollection: false,
  }),
  blockerResolution: Object.freeze({
    dedicatedRetentionPrivacyPolicyIssued: true,
    dedicatedConsentWithdrawalProtocolIssued: false,
    participantCountRationaleIssued: false,
    partitionAllocationRationaleIssued: false,
    empiricalCollectionRuntimeIssued: false,
    empiricalCollectionAdmissionIssued: false,
    actualParticipantCollectionAuthorized: false,
    fr312gReliabilityExecutionAuthorized: false,
    fr312hEntryAuthorized: false,
  }),
  nextAction:
    'issue_dedicated_fr312g_participant_consent_and_withdrawal_protocol',
});

export const FR312G2_AUTHORITY_BOUNDARY = Object.freeze({
  actualParticipantCollectionAuthorized: false as const,
  reliabilityExecutionAuthorized: false as const,
  consentSufficiencyEstablished: false as const,
  legalComplianceEstablished: false as const,
  morphologyEquivalenceAuthorized: false as const,
  thresholdDiscoveryAuthorized: false as const,
  traditionalSemanticValidationAuthorized: false as const,
  automaticTraditionalBindingAuthorized: false as const,
  populationNormAuthorized: false as const,
  productInterpretationAuthorized: false as const,
});

export function assertDedicatedRetentionPrivacyPolicyFR312G2(): void {
  assertNeutralMetricReliabilityStudyDesignFR312G();
  assertCollectionPrerequisiteReuseReviewFR312G1();

  if (
    !FR312G1_REQUIRED_DEDICATED_ARTIFACTS.includes(
      FR312G2_POLICY.studyBinding.dedicatedArtifactKey,
    )
  ) {
    throw new Error('fr312g2_artifact_not_required_by_fr312g1');
  }

  if (
    FR312G2_POLICY.studyBinding.fr312gProtocolId
      !== FR312G_STUDY_DESIGN.protocolId
    || FR312G2_POLICY.studyBinding.fr312g1ReviewId
      !== FR312G1_REVIEW.reviewId
    || FR312G2_POLICY.studyBinding.sourceRuntimeAuthorityInherited !== false
  ) {
    throw new Error('fr312g2_dedicated_binding_drift');
  }

  if (
    FR312G2_POLICY.numericDecision.maxReviewImageRetentionDays !== 30
    || FR312G2_POLICY.numericDecision.finiteMaximumIssued !== true
    || FR312G2_POLICY.numericDecision.inheritedAutomaticallyFromFR239
      !== false
    || FR312G2_POLICY.numericDecision.legalSufficiencyClaimed !== false
    || FR312G2_POLICY.numericDecision.empiricalSufficiencyClaimed !== false
  ) {
    throw new Error('fr312g2_retention_numeric_decision_drift');
  }

  if (
    FR312G2_POLICY.rawCaptureLifecycle.persistenceClass
      !== 'ephemeral_processing_only'
    || FR312G2_POLICY.rawCaptureLifecycle
      .admittedToResearchDatasetAsRawOriginal !== false
    || FR312G2_POLICY.rawCaptureLifecycle
      .deleteRawOriginalAfterSanitizedReviewArtifactCreation !== true
    || FR312G2_POLICY.reviewArtifactLifecycle.maxRetentionDays !== 30
    || FR312G2_POLICY.reviewArtifactLifecycle
      .deleteEarlierWhenAnnotationAdjudicationMetricAuditComplete !== true
    || FR312G2_POLICY.reviewArtifactLifecycle.unboundedRetentionAuthorized
      !== false
    || FR312G2_POLICY.reviewArtifactLifecycle.trainingReuseAllowed !== false
    || FR312G2_POLICY.reviewArtifactLifecycle.productionReuseAllowed !== false
  ) {
    throw new Error('fr312g2_artifact_lifecycle_drift');
  }

  if (
    FR312G2_POLICY.identityBoundary.pseudonymousParticipantRefRequired
      !== true
    || FR312G2_POLICY.identityBoundary.biometricIdentityMatchingAllowed
      !== false
    || FR312G2_POLICY.identityBoundary.faceEmbeddingAllowed !== false
    || FR312G2_POLICY.identityBoundary.identityTemplateAllowed !== false
    || FR312G2_POLICY.identityBoundary.identityInferenceAllowed !== false
  ) {
    throw new Error('fr312g2_identity_boundary_drift');
  }

  if (
    FR312G2_POLICY.withdrawalInteraction.validWithdrawalStopsFutureCapture
      !== true
    || FR312G2_POLICY.withdrawalInteraction
      .retainedReviewImageDeletionRequired !== true
    || FR312G2_POLICY.withdrawalInteraction
      .consentWithdrawalProtocolStillRequired !== true
    || FR312G2_POLICY.withdrawalInteraction
      .thisPolicyAloneAuthorizesCollection !== false
  ) {
    throw new Error('fr312g2_withdrawal_boundary_drift');
  }

  if (
    FR312G2_POLICY.blockerResolution.dedicatedRetentionPrivacyPolicyIssued
      !== true
    || FR312G2_POLICY.blockerResolution
      .dedicatedConsentWithdrawalProtocolIssued !== false
    || FR312G2_POLICY.blockerResolution.actualParticipantCollectionAuthorized
      !== false
    || FR312G2_POLICY.blockerResolution.fr312gReliabilityExecutionAuthorized
      !== false
    || FR312G2_POLICY.blockerResolution.fr312hEntryAuthorized !== false
  ) {
    throw new Error('fr312g2_blocker_resolution_drift');
  }

  for (const [key, value] of Object.entries(FR312G2_AUTHORITY_BOUNDARY)) {
    if (value !== false) {
      throw new Error('fr312g2_authority_widening:' + key);
    }
  }
}
