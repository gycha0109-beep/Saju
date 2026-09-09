import { describe, expect, it } from 'vitest';
import {
  FR163_NEXT_FRONTIER,
  getEyePairProspectiveRecurrenceProtocolFR163,
} from './eye-pair-prospective-recurrence-protocol-fr163.js';

describe('FR163 eye-pair prospective recurrence protocol', () => {
  it('freezes the future recurrence design after FR162 without retroactively admitting A-G', () => {
    const protocol = getEyePairProspectiveRecurrenceProtocolFR163();

    expect(protocol.prospectiveDesign.protocolFrozenBeforeFutureSessionCapture).toBe(true);
    expect(protocol.prospectiveDesign.historicalAThroughGCapturesEligibleForProspectiveRecurrenceEvidence).toBe(false);
    expect(protocol.prospectiveDesign.minimumProspectiveSessionRefsForRecurrenceDescription).toBe(2);
    expect(protocol.prospectiveDesign.eachSessionRequiresGovernedFR161Series).toBe(true);
    expect(protocol.prospectiveDesign.eachSessionMinimumDistinctSourceByteCaptures).toBe(2);
    expect(protocol.prospectiveDesign.eachSessionRequiresFR162CaptureCoaching).toBe(true);
    expect(protocol.prospectiveDesign.sameCaptureSetupAttestationRequired).toBe(true);
    expect(protocol.prospectiveDesign.postProtocolFreshCaptureAttestationRequired).toBe(true);
    expect(protocol.prospectiveDesign.distinctSessionRefRequired).toBe(true);
    expect(protocol.prospectiveDesign.distinctSessionRefMeansIndependentSession).toBe(false);
    expect(protocol.prospectiveDesign.recurrenceMayBeDescribedWithoutIndependenceClaim).toBe(true);
  });

  it('keeps independent-session authority unavailable from self-attestation, refs, timestamps, or byte distinctness', () => {
    const protocol = getEyePairProspectiveRecurrenceProtocolFR163();
    const boundary = protocol.independenceBoundary;

    expect(boundary.operatorDeclaredSessionRefsSufficientForIndependence).toBe(false);
    expect(boundary.callerAttestedDifferentDaySufficientForIndependence).toBe(false);
    expect(boundary.userSuppliedTimestampSufficientForIndependence).toBe(false);
    expect(boundary.byteDistinctCapturesSufficientForIndependentSessionProof).toBe(false);
    expect(boundary.sameParticipantAttestationMeansIdentityProof).toBe(false);
    expect(boundary.identityMatchingPerformed).toBe(false);
    expect(boundary.independentSessionAdmissionImplementedForEyePair).toBe(false);
    expect(boundary.externalWitnessTrustRootAvailableToThisProtocol).toBe(false);
    expect(boundary.independentSessionClaimAllowed).toBe(false);
  });

  it('allows descriptive recurrence comparison but no threshold, quality gate, or pass-fail derivation', () => {
    const protocol = getEyePairProspectiveRecurrenceProtocolFR163();

    expect(protocol.descriptiveComparisonBoundary.allowedStatistics).toContain('mean');
    expect(protocol.descriptiveComparisonBoundary.allowedStatistics).toContain('range');
    expect(protocol.descriptiveComparisonBoundary.allowedStatistics).toContain('relative_mean_shift_descriptive_convenience');
    expect(protocol.descriptiveComparisonBoundary.correlationOrRedundancyConclusionAuthorized).toBe(false);
    expect(protocol.descriptiveComparisonBoundary.repeatabilityPassFailAuthorized).toBe(false);
    expect(protocol.descriptiveComparisonBoundary.captureSensitivityPassFailAuthorized).toBe(false);
    expect(protocol.descriptiveComparisonBoundary.numericThresholdMayBeDerivedFromObservedSamples).toBe(false);
    expect(protocol.descriptiveComparisonBoundary.productQualityGateMayBeDerivedFromObservedSamples).toBe(false);

    expect(protocol.productBoundary.userFacingCaptureCoachingAllowed).toBe(true);
    expect(protocol.productBoundary.automaticCaptureQualityGateAuthorized).toBe(false);
    expect(protocol.productBoundary.automaticRetakeThresholdAuthorized).toBe(false);
    expect(protocol.productBoundary.automaticMetricSuppressionThresholdAuthorized).toBe(false);
    expect(protocol.productBoundary.userFacingRepeatabilityPassFailLabelAllowed).toBe(false);
    expect(protocol.productBoundary.numericRepeatabilityAcceptanceThreshold).toBeNull();
    expect(protocol.productBoundary.numericCaptureQualityThreshold).toBeNull();
  });

  it('does not promote protocol definition into empirical or semantic authority', () => {
    const protocol = getEyePairProspectiveRecurrenceProtocolFR163();

    expect(protocol.authorityBoundary.prospectiveRecurrenceProtocolFrozen).toBe(true);
    expect(protocol.authorityBoundary.prospectiveRecurrenceExecutionPerformed).toBe(false);
    expect(protocol.authorityBoundary.independentMultiSessionEvidenceAdmitted).toBe(false);
    expect(protocol.authorityBoundary.multiSessionIndependenceVerified).toBe(false);
    expect(protocol.authorityBoundary.empiricalRepeatabilityEstablished).toBe(false);
    expect(protocol.authorityBoundary.captureQualityValidated).toBe(false);
    expect(protocol.authorityBoundary.captureQualityMeasurementConstructValidated).toBe(false);
    expect(protocol.authorityBoundary.thresholdsIssued).toBe(false);
    expect(protocol.authorityBoundary.traditionalSemanticAuthority).toBe(false);
    expect(protocol.nextFrontier).toBe(FR163_NEXT_FRONTIER);
  });

  it('keeps sensitive capture and biometric material outside public evidence', () => {
    const privacy = getEyePairProspectiveRecurrenceProtocolFR163().privacyBoundary;

    expect(privacy.rawImagePersisted).toBe(false);
    expect(privacy.rawProviderResponsePersisted).toBe(false);
    expect(privacy.rawLandmarkSetPersisted).toBe(false);
    expect(privacy.derivedFullFaceMetricGeometryPersisted).toBe(false);
    expect(privacy.participantDerivedNumericMetricValuesPersistedInPublicEvidence).toBe(false);
    expect(privacy.exactCaptureTimestampRequiredOrPersisted).toBe(false);
    expect(privacy.geolocationRequiredOrPersisted).toBe(false);
    expect(privacy.deviceIdentifierRequiredOrPersisted).toBe(false);
    expect(privacy.faceEmbeddingPersisted).toBe(false);
    expect(privacy.identityTemplatePersisted).toBe(false);
  });
});
