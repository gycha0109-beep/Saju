import { describe, expect, it } from 'vitest';
import {
  FR312G_STUDY_DESIGN,
} from './traditional-neutral-metric-reliability-study-fr312g.js';
import {
  FR312G1_REQUIRED_DEDICATED_ARTIFACTS,
  FR312G1_REVIEW,
} from './traditional-neutral-metric-collection-prerequisite-review-fr312g1.js';
import {
  FR312G2_AUTHORITY_BOUNDARY,
  FR312G2_MAX_REVIEW_IMAGE_RETENTION_DAYS,
  FR312G2_POLICY,
  assertDedicatedRetentionPrivacyPolicyFR312G2,
} from './traditional-neutral-metric-retention-privacy-policy-fr312g2.js';

describe('FR312G2 dedicated retention and privacy policy', () => {
  it('binds to FR312G and the FR312G1 reuse review without inheriting runtime authority', () => {
    expect(() => assertDedicatedRetentionPrivacyPolicyFR312G2())
      .not.toThrow();

    expect(FR312G2_POLICY.studyBinding.fr312gProtocolId)
      .toBe(FR312G_STUDY_DESIGN.protocolId);
    expect(FR312G2_POLICY.studyBinding.fr312g1ReviewId)
      .toBe(FR312G1_REVIEW.reviewId);
    expect(FR312G1_REQUIRED_DEDICATED_ARTIFACTS)
      .toContain(FR312G2_POLICY.studyBinding.dedicatedArtifactKey);
    expect(FR312G2_POLICY.studyBinding.sourceRuntimeAuthorityInherited)
      .toBe(false);
  });

  it('issues a finite 30-day operational maximum as a dedicated decision', () => {
    expect(FR312G2_MAX_REVIEW_IMAGE_RETENTION_DAYS).toBe(30);
    expect(FR312G2_POLICY.numericDecision.maxReviewImageRetentionDays)
      .toBe(30);
    expect(FR312G2_POLICY.numericDecision.finiteMaximumIssued).toBe(true);
    expect(FR312G2_POLICY.numericDecision.fr239ThirtyDayPrecedentConsulted)
      .toBe(true);
    expect(FR312G2_POLICY.numericDecision.inheritedAutomaticallyFromFR239)
      .toBe(false);
    expect(FR312G2_POLICY.numericDecision.rationale)
      .toContain('dedicated_operational_upper_bound');
    expect(FR312G2_POLICY.numericDecision.legalSufficiencyClaimed)
      .toBe(false);
    expect(FR312G2_POLICY.numericDecision.empiricalSufficiencyClaimed)
      .toBe(false);
  });

  it('keeps raw originals ephemeral and stores only sanitized review artifacts', () => {
    expect(FR312G2_POLICY.rawCaptureLifecycle.persistenceClass)
      .toBe('ephemeral_processing_only');
    expect(
      FR312G2_POLICY.rawCaptureLifecycle
        .admittedToResearchDatasetAsRawOriginal,
    ).toBe(false);
    expect(
      FR312G2_POLICY.rawCaptureLifecycle
        .embeddedMetadataSanitizationBeforeReviewArtifact,
    ).toBe(true);
    expect(
      FR312G2_POLICY.rawCaptureLifecycle
        .sanitizedReviewArtifactMustBindSameCapture,
    ).toBe(true);
    expect(
      FR312G2_POLICY.rawCaptureLifecycle
        .deleteRawOriginalAfterSanitizedReviewArtifactCreation,
    ).toBe(true);

    expect(FR312G2_POLICY.reviewArtifactLifecycle.artifactClass)
      .toBe('sanitized_morphology_research_review_image');
    expect(
      FR312G2_POLICY.reviewArtifactLifecycle
        .potentiallyIdentifyingFaceAcknowledged,
    ).toBe(true);
    expect(FR312G2_POLICY.reviewArtifactLifecycle.maxRetentionDays).toBe(30);
    expect(
      FR312G2_POLICY.reviewArtifactLifecycle
        .deleteEarlierWhenAnnotationAdjudicationMetricAuditComplete,
    ).toBe(true);
    expect(
      FR312G2_POLICY.reviewArtifactLifecycle.unboundedRetentionAuthorized,
    ).toBe(false);
  });

  it('forbids training, production, product-personalization, and identity reuse', () => {
    expect(FR312G2_POLICY.rawCaptureLifecycle.trainingReuseAllowed)
      .toBe(false);
    expect(FR312G2_POLICY.rawCaptureLifecycle.productionReuseAllowed)
      .toBe(false);
    expect(FR312G2_POLICY.reviewArtifactLifecycle.trainingReuseAllowed)
      .toBe(false);
    expect(FR312G2_POLICY.reviewArtifactLifecycle.productionReuseAllowed)
      .toBe(false);
    expect(
      FR312G2_POLICY.reviewArtifactLifecycle.productPersonalizationReuseAllowed,
    ).toBe(false);

    expect(FR312G2_POLICY.identityBoundary.pseudonymousParticipantRefRequired)
      .toBe(true);
    expect(FR312G2_POLICY.identityBoundary.biometricIdentityMatchingAllowed)
      .toBe(false);
    expect(FR312G2_POLICY.identityBoundary.faceEmbeddingAllowed).toBe(false);
    expect(FR312G2_POLICY.identityBoundary.identityTemplateAllowed).toBe(false);
    expect(FR312G2_POLICY.identityBoundary.identityInferenceAllowed).toBe(false);
  });

  it('restricts image access to assigned research roles', () => {
    expect(FR312G2_POLICY.accessPolicy.assignedResearchOperatorAccessAllowed)
      .toBe(true);
    expect(FR312G2_POLICY.accessPolicy.assignedPrimaryAnnotatorAccessAllowed)
      .toBe(true);
    expect(FR312G2_POLICY.accessPolicy.assignedAdjudicatorAccessAllowed)
      .toBe(true);
    expect(FR312G2_POLICY.accessPolicy.assignedAuditorAccessAllowed)
      .toBe(true);
    expect(FR312G2_POLICY.accessPolicy.generalProductAccessAllowed)
      .toBe(false);
    expect(FR312G2_POLICY.accessPolicy.publicAccessAllowed).toBe(false);
    expect(FR312G2_POLICY.accessPolicy.accessPurposeMustBeResearchTaskBound)
      .toBe(true);
  });

  it('requires deletion evidence without retaining reconstructive image data', () => {
    expect(FR312G2_POLICY.deletionEvidence.deletionEventRequired).toBe(true);
    expect(FR312G2_POLICY.deletionEvidence.participantRefRequired).toBe(true);
    expect(FR312G2_POLICY.deletionEvidence.artifactRefRequired).toBe(true);
    expect(FR312G2_POLICY.deletionEvidence.deletionReasonRequired).toBe(true);
    expect(FR312G2_POLICY.deletionEvidence.deletionTimestampRequired)
      .toBe(true);
    expect(
      FR312G2_POLICY.deletionEvidence.rawImageBytesInDeletionEvidenceAllowed,
    ).toBe(false);
    expect(
      FR312G2_POLICY.deletionEvidence.deletedImageReconstructionDataAllowed,
    ).toBe(false);
  });

  it('defines withdrawal handling for retained images while leaving consent governance separate', () => {
    expect(
      FR312G2_POLICY.withdrawalInteraction.validWithdrawalStopsFutureCapture,
    ).toBe(true);
    expect(
      FR312G2_POLICY.withdrawalInteraction.validWithdrawalStopsNewAnnotationWork,
    ).toBe(true);
    expect(
      FR312G2_POLICY.withdrawalInteraction.retainedReviewImageDeletionRequired,
    ).toBe(true);
    expect(
      FR312G2_POLICY.withdrawalInteraction.retainedRawOriginalDeletionRequired,
    ).toBe(true);
    expect(
      FR312G2_POLICY.withdrawalInteraction
        .participantLevelMetricAndAnnotationDisposition,
    ).toBe(
      'must_be_defined_by_dedicated_fr312g_consent_withdrawal_protocol',
    );
    expect(
      FR312G2_POLICY.withdrawalInteraction
        .consentWithdrawalProtocolStillRequired,
    ).toBe(true);
    expect(
      FR312G2_POLICY.withdrawalInteraction.thisPolicyAloneAuthorizesCollection,
    ).toBe(false);
  });

  it('resolves only the dedicated retention/privacy blocker', () => {
    expect(
      FR312G2_POLICY.blockerResolution.dedicatedRetentionPrivacyPolicyIssued,
    ).toBe(true);
    expect(
      FR312G2_POLICY.blockerResolution.dedicatedConsentWithdrawalProtocolIssued,
    ).toBe(false);
    expect(
      FR312G2_POLICY.blockerResolution.participantCountRationaleIssued,
    ).toBe(false);
    expect(
      FR312G2_POLICY.blockerResolution.partitionAllocationRationaleIssued,
    ).toBe(false);
    expect(
      FR312G2_POLICY.blockerResolution.empiricalCollectionRuntimeIssued,
    ).toBe(false);
    expect(
      FR312G2_POLICY.blockerResolution.actualParticipantCollectionAuthorized,
    ).toBe(false);
    expect(
      FR312G2_POLICY.blockerResolution.fr312gReliabilityExecutionAuthorized,
    ).toBe(false);
    expect(FR312G2_POLICY.blockerResolution.fr312hEntryAuthorized).toBe(false);
  });

  it('keeps all downstream scientific and product authority closed', () => {
    for (const [key, value] of Object.entries(FR312G2_AUTHORITY_BOUNDARY)) {
      expect(value, key).toBe(false);
    }
  });
});
