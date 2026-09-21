import { describe, expect, it } from 'vitest';
import {
  FR237_PRIMARY_METRIC,
  assertObservableMorphologyRepeatabilityStudyFR237,
  preregisterObservableMorphologyRepeatabilityStudyFR237,
} from './observable-morphology-repeatability-study-preregistration-fr237.js';

function persisted<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

describe('FR237 observable-morphology repeatability study preregistration', () => {
  it('freezes the first real-person endpoint and repeat-capture design before collection', () => {
    const protocol = preregisterObservableMorphologyRepeatabilityStudyFR237();

    expect(protocol.primaryEndpoint.metricRef).toBe(FR237_PRIMARY_METRIC);
    expect(protocol.primaryEndpoint.endpointCount).toBe(1);
    expect(protocol.participantDesign.sessionsPerParticipant).toBe(2);
    expect(protocol.participantDesign.acceptedCapturesPerSession).toBe(2);
    expect(protocol.participantDesign.minimumAcceptedCapturesPerParticipant).toBe(4);
    expect(protocol.participantDesign.participantLeakageForbidden).toBe(true);
    expect(protocol.participantDesign.captureFamilyLeakageForbidden).toBe(true);
    expect(() => assertObservableMorphologyRepeatabilityStudyFR237(protocol)).not.toThrow();
  });

  it('requires live fresh-session capture mechanics without claiming identity proof', () => {
    const protocol = preregisterObservableMorphologyRepeatabilityStudyFR237();

    expect(protocol.acquisitionDesign.liveCaptureOnly).toBe(true);
    expect(protocol.acquisitionDesign.galleryUploadEligible).toBe(false);
    expect(protocol.acquisitionDesign.freshSessionNonceRequired).toBe(true);
    expect(protocol.acquisitionDesign.freshCaptureNonceRequired).toBe(true);
    expect(protocol.acquisitionDesign.serverTimestampRequired).toBe(true);
    expect(protocol.acquisitionDesign.biometricIdentityMatchingRequired).toBe(false);
    expect(protocol.authorityBoundary.captureFreshnessIndependentlyVerified).toBe(false);
    expect(protocol.authorityBoundary.sameParticipantIdentityIndependentlyVerified).toBe(false);
  });

  it('keeps collection blocked until runtime and finite retention policy exist', () => {
    const protocol = preregisterObservableMorphologyRepeatabilityStudyFR237();

    expect(protocol.privacyDesign.finiteReviewImageRetentionRequiredBeforeCollection).toBe(true);
    expect(protocol.privacyDesign.maxReviewImageRetentionDays).toBeNull();
    expect(protocol.collectionAuthorization.researchCaptureRuntimeImplemented).toBe(false);
    expect(protocol.collectionAuthorization.finiteRetentionPolicyIssued).toBe(false);
    expect(protocol.collectionAuthorization.actualParticipantCollectionAuthorized).toBe(false);
  });

  it('does not invent thresholds, sample size, calibration, interpretation validity, or traditional authority', () => {
    const protocol = preregisterObservableMorphologyRepeatabilityStudyFR237();

    expect(protocol.analysisFreeze.numericRepeatabilityAcceptanceThreshold).toBeNull();
    expect(protocol.analysisFreeze.confirmatorySampleSize).toBeNull();
    expect(protocol.analysisFreeze.calibrationRef).toBeNull();
    expect(protocol.analysisFreeze.traditionalBindingRef).toBeNull();
    expect(protocol.authorityBoundary.empiricalRepeatabilityEstablished).toBe(false);
    expect(protocol.authorityBoundary.empiricalSufficiencyEstablished).toBe(false);
    expect(protocol.authorityBoundary.interpretationValidityEstablished).toBe(false);
    expect(protocol.authorityBoundary.physiognomyScientificallyValidated).toBe(false);
    expect(protocol.authorityBoundary.productionActivated).toBe(false);
    expect(protocol.authorityBoundary.commerceActivated).toBe(false);
  });

  it('rejects a reconstructed JSON-shaped protocol as active authority', () => {
    const protocol = preregisterObservableMorphologyRepeatabilityStudyFR237();
    expect(() => assertObservableMorphologyRepeatabilityStudyFR237(
      persisted(protocol),
    )).toThrow(/active FR237 runtime/u);
  });
});
