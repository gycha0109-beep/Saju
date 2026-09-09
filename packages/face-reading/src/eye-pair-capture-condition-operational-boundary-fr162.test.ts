import { describe, expect, it } from 'vitest';
import {
  FR162_NEXT_FRONTIER,
  getEyePairCaptureConditionOperationalBoundaryFR162,
} from './eye-pair-capture-condition-operational-boundary-fr162.js';

describe('FR162 eye-pair capture-condition operational boundary', () => {
  it('allows capture coaching without promoting it into a validated quality gate', () => {
    const boundary = getEyePairCaptureConditionOperationalBoundaryFR162();

    expect(boundary.empiricalBoundary.localCaptureConditionExecutionOccurred).toBe(true);
    expect(boundary.empiricalBoundary.descriptiveObservationsMayMotivateCaptureCoaching).toBe(true);
    expect(boundary.empiricalBoundary.descriptiveObservationsEstablishCaptureQualityValidity).toBe(false);
    expect(boundary.empiricalBoundary.descriptiveObservationsEstablishRepeatability).toBe(false);

    expect(boundary.operationalCaptureGuidance.frontalNeutralPoseRequested).toBe(true);
    expect(boundary.operationalCaptureGuidance.cameraNearEyeLevelRequested).toBe(true);
    expect(boundary.operationalCaptureGuidance.avoidIntentionallyExtremeNearOrFarFraming).toBe(true);
    expect(boundary.operationalCaptureGuidance.avoidIntentionallyHighOrLowCameraAngle).toBe(true);
    expect(boundary.operationalCaptureGuidance.guidanceIsNumericAcceptanceThreshold).toBe(false);
    expect(boundary.operationalCaptureGuidance.guidanceMeansCaptureQualityValidated).toBe(false);
    expect(boundary.operationalCaptureGuidance.guidanceMayRejectAUserCaptureAutomatically).toBe(false);
  });

  it('keeps all automatic quality and repeatability thresholds closed', () => {
    const boundary = getEyePairCaptureConditionOperationalBoundaryFR162();

    expect(boundary.productBoundary.automaticCaptureQualityGateAuthorized).toBe(false);
    expect(boundary.productBoundary.automaticMetricSuppressionThresholdAuthorized).toBe(false);
    expect(boundary.productBoundary.automaticRetakeThresholdAuthorized).toBe(false);
    expect(boundary.productBoundary.userFacingCaptureCoachingAllowed).toBe(true);
    expect(boundary.productBoundary.userFacingPassFailQualityLabelAllowed).toBe(false);
    expect(boundary.productBoundary.numericRepeatabilityAcceptanceThreshold).toBeNull();
    expect(boundary.productBoundary.numericCaptureQualityThreshold).toBeNull();

    expect(boundary.authorityBoundary.empiricalRepeatabilityEstablished).toBe(false);
    expect(boundary.authorityBoundary.captureQualityValidated).toBe(false);
    expect(boundary.authorityBoundary.captureQualityMeasurementConstructValidated).toBe(false);
    expect(boundary.authorityBoundary.thresholdsIssued).toBe(false);
    expect(boundary.authorityBoundary.traditionalSemanticAuthority).toBe(false);
  });

  it('keeps user face-derived numeric observations and biometric material out of public evidence', () => {
    const boundary = getEyePairCaptureConditionOperationalBoundaryFR162();

    expect(boundary.empiricalBoundary.publicParticipantDerivedNumericMeasurementsStored).toBe(false);
    expect(boundary.empiricalBoundary.publicRawImagesStored).toBe(false);
    expect(boundary.empiricalBoundary.publicRawProviderPayloadStored).toBe(false);
    expect(boundary.empiricalBoundary.publicRawLandmarksStored).toBe(false);
    expect(boundary.empiricalBoundary.participantIdentityInferencePerformed).toBe(false);

    expect(boundary.privacyBoundary.participantDerivedNumericMetricValuesPersistedInPublicEvidence).toBe(false);
    expect(boundary.privacyBoundary.faceEmbeddingPersisted).toBe(false);
    expect(boundary.privacyBoundary.identityTemplatePersisted).toBe(false);
    expect(boundary.nextFrontier).toBe(FR162_NEXT_FRONTIER);
  });
});
