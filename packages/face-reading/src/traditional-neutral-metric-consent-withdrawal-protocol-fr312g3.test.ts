import { describe, expect, it } from 'vitest';
import {
  FR312G_STUDY_DESIGN,
} from './traditional-neutral-metric-reliability-study-fr312g.js';
import {
  FR312G2_POLICY,
} from './traditional-neutral-metric-retention-privacy-policy-fr312g2.js';
import {
  FR312G3_AGGREGATE_WITHOUT_PARTICIPANT_LINKAGE_BOUNDARY,
  FR312G3_AUTHORITY_BOUNDARY,
  FR312G3_CONSENT_RECEIPT_CONTRACT,
  FR312G3_CONSENT_WITHDRAWAL_PROTOCOL,
  FR312G3_REQUIRED_CONSENT_ITEMS,
  FR312G3_STUDY_NOTICE,
  FR312G3_WITHDRAWAL_PROTOCOL,
  assertParticipantConsentWithdrawalProtocolFR312G3,
} from './traditional-neutral-metric-consent-withdrawal-protocol-fr312g3.js';

describe('FR312G3 participant consent and withdrawal protocol', () => {
  it('stays bound to FR312G and FR312G2', () => {
    expect(() => assertParticipantConsentWithdrawalProtocolFR312G3())
      .not.toThrow();
    expect(FR312G3_CONSENT_WITHDRAWAL_PROTOCOL.studyProtocolId)
      .toBe(FR312G_STUDY_DESIGN.protocolId);
    expect(FR312G3_CONSENT_WITHDRAWAL_PROTOCOL.retentionPrivacyPolicyId)
      .toBe(FR312G2_POLICY.policyId);
  });

  it('requires the complete explicit consent checklist', () => {
    expect(FR312G3_REQUIRED_CONSENT_ITEMS).toEqual([
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
    ]);
  });

  it('keeps consent pseudonymous and separate from collection admission', () => {
    expect(FR312G3_CONSENT_RECEIPT_CONTRACT.withdrawalHandleIssuedAtConsent)
      .toBe(true);
    expect(
      FR312G3_CONSENT_RECEIPT_CONTRACT
        .lossOfWithdrawalHandleMustNotEliminateWithdrawalPath,
    ).toBe(true);
    expect(FR312G3_CONSENT_RECEIPT_CONTRACT.biometricIdentityMatchingRequired)
      .toBe(false);
    expect(FR312G3_CONSENT_RECEIPT_CONTRACT.receiptAloneAuthorizesCollection)
      .toBe(false);
    expect(
      FR312G3_CONSENT_RECEIPT_CONTRACT
        .legalConsentSufficiencyEstablishedByReceipt,
    ).toBe(false);
  });

  it('keeps the study notice inside the neutral reliability boundary', () => {
    expect(FR312G3_STUDY_NOTICE.reviewImageMaximumRetentionDays).toBe(30);
    expect(FR312G3_STUDY_NOTICE.traditionalSemanticClaimValidationIncluded)
      .toBe(false);
    expect(FR312G3_STUDY_NOTICE.automatedTraditionalBindingIncluded)
      .toBe(false);
    expect(FR312G3_STUDY_NOTICE.identityRecognitionIncluded).toBe(false);
    expect(FR312G3_STUDY_NOTICE.collectionStillRequiresSeparateEmpiricalAdmission)
      .toBe(true);
  });

  it('keeps withdrawal available without biometric identification', () => {
    expect(
      FR312G3_WITHDRAWAL_PROTOCOL
        .withdrawalHandleOrGovernedNonBiometricVerificationSupported,
    ).toBe(true);
    expect(FR312G3_WITHDRAWAL_PROTOCOL.withdrawalHandleLossBlocksWithdrawal)
      .toBe(false);
    expect(
      FR312G3_WITHDRAWAL_PROTOCOL
        .biometricIdentityMatchingForWithdrawalAuthorized,
    ).toBe(false);
  });

  it('removes participant-linked records from future analysis', () => {
    expect(FR312G3_WITHDRAWAL_PROTOCOL.futureCaptureStopsOnValidWithdrawal)
      .toBe(true);
    expect(FR312G3_WITHDRAWAL_PROTOCOL.retainedReviewImageDeletionRequired)
      .toBe(true);
    expect(
      FR312G3_WITHDRAWAL_PROTOCOL
        .participantLinkedMorphologyAnnotationDeletionRequired,
    ).toBe(true);
    expect(
      FR312G3_WITHDRAWAL_PROTOCOL.participantLinkedNeutralMetricDeletionRequired,
    ).toBe(true);
    expect(
      FR312G3_WITHDRAWAL_PROTOCOL.participantPartitionAssignmentDeletionRequired,
    ).toBe(true);
    expect(FR312G3_WITHDRAWAL_PROTOCOL.participantStudyLinkageRetirementRequired)
      .toBe(true);
    expect(FR312G3_WITHDRAWAL_PROTOCOL.futureAnalysisEligibilityAfterWithdrawal)
      .toBe(false);
  });

  it('does not overclaim aggregate deidentification', () => {
    const boundary =
      FR312G3_AGGREGATE_WITHOUT_PARTICIPANT_LINKAGE_BOUNDARY;
    expect(boundary.participantLinkedRowsMustBeRemovedBeforeFutureAnalysis)
      .toBe(true);
    expect(boundary.aggregateWithoutParticipantLevelLinkageMayRemain)
      .toBe(true);
    expect(boundary.deidentificationSufficiencyEstablished).toBe(false);
    expect(boundary.aggregateMayBeUsedToReidentifyParticipant).toBe(false);
    expect(boundary.participantLevelLinkageMayBeRecreatedFromAggregate)
      .toBe(false);
    expect(boundary.thisProtocolClaimsLegalRightToRetainAggregate).toBe(false);
  });

  it('resolves consent governance only', () => {
    expect(
      FR312G3_CONSENT_WITHDRAWAL_PROTOCOL.blockerResolution
        .dedicatedConsentWithdrawalProtocolIssued,
    ).toBe(true);
    expect(
      FR312G3_CONSENT_WITHDRAWAL_PROTOCOL.blockerResolution
        .participantCountRationaleIssued,
    ).toBe(false);
    expect(
      FR312G3_CONSENT_WITHDRAWAL_PROTOCOL.blockerResolution
        .partitionAllocationRationaleIssued,
    ).toBe(false);
    expect(
      FR312G3_CONSENT_WITHDRAWAL_PROTOCOL.blockerResolution
        .actualParticipantCollectionAuthorized,
    ).toBe(false);
    expect(FR312G3_AUTHORITY_BOUNDARY.consentProtocolDefined).toBe(true);
    for (const [key, value] of Object.entries(FR312G3_AUTHORITY_BOUNDARY)) {
      if (key === 'consentProtocolDefined') continue;
      expect(value, key).toBe(false);
    }
  });
});
