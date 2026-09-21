import { describe, expect, it } from 'vitest';
import { preregisterObservableMorphologyRepeatabilityStudyFR237 } from './observable-morphology-repeatability-study-preregistration-fr237.js';
import { materializeResearchLiveCaptureRuntimeFR238 } from './observable-morphology-research-live-capture-session-runtime-fr238.js';
import {
  assertPrecollectionRetentionPrivacyPolicyFR239,
  issuePrecollectionRetentionPrivacyPolicyFR239,
} from './observable-morphology-repeatability-retention-privacy-policy-fr239.js';

function policy() {
  return issuePrecollectionRetentionPrivacyPolicyFR239(
    materializeResearchLiveCaptureRuntimeFR238(
      preregisterObservableMorphologyRepeatabilityStudyFR237(),
    ),
  );
}

function persisted<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

describe('FR239 repeatability precollection retention/privacy policy', () => {
  it('issues a finite 30-day maximum review-image retention policy', () => {
    const result = policy();
    expect(result.rawCapturePolicy.persistenceClass).toBe('ephemeral_processing_only');
    expect(result.rawCapturePolicy.deleteAfterQualityAndMetricExtraction).toBe(true);
    expect(result.reviewImagePolicy.maxRetentionDays).toBe(30);
    expect(result.reviewImagePolicy.deleteEarlierWhenQualityReviewAndAuditComplete).toBe(true);
    expect(result.reviewImagePolicy.embeddedMetadataSanitizationRequired).toBe(true);
    expect(() => assertPrecollectionRetentionPrivacyPolicyFR239(result)).not.toThrow();
  });

  it('forbids training, production reuse, biometric matching, embeddings, and identity templates', () => {
    const result = policy();
    expect(result.rawCapturePolicy.trainingReuseAllowed).toBe(false);
    expect(result.rawCapturePolicy.productionReuseAllowed).toBe(false);
    expect(result.reviewImagePolicy.trainingReuseAllowed).toBe(false);
    expect(result.reviewImagePolicy.generalProductAccessAllowed).toBe(false);
    expect(result.identityPolicy.biometricIdentityMatchingAllowed).toBe(false);
    expect(result.identityPolicy.faceEmbeddingAllowed).toBe(false);
    expect(result.identityPolicy.identityTemplateAllowed).toBe(false);
  });

  it('keeps real participant collection blocked until a consent/admission protocol exists', () => {
    const result = policy();
    expect(result.precollectionGate.finiteRetentionPolicyIssued).toBe(true);
    expect(result.precollectionGate.privacyPolicyIssued).toBe(true);
    expect(result.precollectionGate.participantConsentProtocolIssued).toBe(false);
    expect(result.precollectionGate.realParticipantCollectionAuthorized).toBe(false);
    expect(result.authorityBoundary.policyIssuanceMeansConsentObtained).toBe(false);
    expect(result.authorityBoundary.participantDataCollectedByThisArtifact).toBe(false);
  });

  it('preserves empirical and interpretation authority boundaries', () => {
    const result = policy();
    expect(result.authorityBoundary.captureQualityValidated).toBe(false);
    expect(result.authorityBoundary.empiricalRepeatabilityEstablished).toBe(false);
    expect(result.authorityBoundary.empiricalSufficiencyEstablished).toBe(false);
    expect(result.authorityBoundary.interpretationValidityEstablished).toBe(false);
    expect(result.authorityBoundary.traditionalBindingIssued).toBe(false);
    expect(result.authorityBoundary.productionActivated).toBe(false);
    expect(result.authorityBoundary.commerceActivated).toBe(false);
  });

  it('rejects reconstructed policies as active authority', () => {
    const result = policy();
    expect(() => assertPrecollectionRetentionPrivacyPolicyFR239(persisted(result)))
      .toThrow(/active FR239 runtime/u);
  });
});
