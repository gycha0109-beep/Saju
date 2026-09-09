import {
  FR162_NEXT_FRONTIER,
  getEyePairCaptureConditionOperationalBoundaryFR162,
} from './eye-pair-capture-condition-operational-boundary-fr162.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR163_EYE_PAIR_PROSPECTIVE_RECURRENCE_PROTOCOL_ID =
  'research.face_reading.neutral.eye_pair.prospective_recurrence_protocol.fr163' as const;

export const FR163_RESEARCH_NOTE_REF =
  'repo:research/face-reading/fr163-eye-pair-prospective-recurrence-protocol.md' as const;

export const FR163_NEXT_FRONTIER =
  'execute_future_post_fr163_coached_session_series_and_describe_cross_session_recurrence_without_independence_repeatability_threshold_or_semantic_promotion' as const;

function assertFR162Predecessor(): void {
  const predecessor = getEyePairCaptureConditionOperationalBoundaryFR162();
  if (
    predecessor.nextFrontier !== FR162_NEXT_FRONTIER
    || predecessor.predecessor.fr161RealCaptureExecutionImplemented !== true
    || predecessor.predecessor.fr161DescriptiveOnlyBoundaryRetained !== true
    || predecessor.operationalCaptureGuidance.frontalNeutralPoseRequested !== true
    || predecessor.operationalCaptureGuidance.cameraNearEyeLevelRequested !== true
    || predecessor.operationalCaptureGuidance.avoidIntentionallyExtremeNearOrFarFraming !== true
    || predecessor.operationalCaptureGuidance.avoidIntentionallyHighOrLowCameraAngle !== true
    || predecessor.operationalCaptureGuidance.guidanceIsNumericAcceptanceThreshold !== false
    || predecessor.productBoundary.automaticCaptureQualityGateAuthorized !== false
    || predecessor.productBoundary.automaticRetakeThresholdAuthorized !== false
    || predecessor.authorityBoundary.empiricalRepeatabilityEstablished !== false
    || predecessor.authorityBoundary.captureQualityValidated !== false
    || predecessor.authorityBoundary.thresholdsIssued !== false
    || predecessor.authorityBoundary.traditionalSemanticAuthority !== false
  ) {
    throw new FaceAuthorityValidationError('FR-163 FR-162 predecessor authority drift.');
  }
}

export function getEyePairProspectiveRecurrenceProtocolFR163() {
  assertFR162Predecessor();

  return Object.freeze({
    schemaVersion: 'fr163-eye-pair-prospective-recurrence-protocol-v1' as const,
    artifactVersion: '0.1.0' as const,
    recordId: FR163_EYE_PAIR_PROSPECTIVE_RECURRENCE_PROTOCOL_ID,
    predecessor: Object.freeze({
      requiredFR162NextFrontier: FR162_NEXT_FRONTIER,
      captureCoachingBoundaryFrozen: true as const,
      automaticQualityGateAuthorized: false as const,
      repeatabilityEstablished: false as const,
      numericRepeatabilityAcceptanceThreshold: null,
      numericCaptureQualityThreshold: null,
    }),
    prospectiveDesign: Object.freeze({
      protocolFrozenBeforeFutureSessionCapture: true as const,
      historicalAThroughGCapturesEligibleForProspectiveRecurrenceEvidence: false as const,
      minimumProspectiveSessionRefsForRecurrenceDescription: 2 as const,
      eachSessionRequiresGovernedFR161Series: true as const,
      eachSessionMinimumDistinctSourceByteCaptures: 2 as const,
      eachSessionRequiresFR162CaptureCoaching: true as const,
      sameCaptureSetupAttestationRequired: true as const,
      postProtocolFreshCaptureAttestationRequired: true as const,
      distinctSessionRefRequired: true as const,
      distinctSessionRefMeansIndependentSession: false as const,
      recurrenceMayBeDescribedWithoutIndependenceClaim: true as const,
      recurrencePassFailIssued: false as const,
    }),
    independenceBoundary: Object.freeze({
      operatorDeclaredSessionRefsSufficientForIndependence: false as const,
      callerAttestedDifferentDaySufficientForIndependence: false as const,
      userSuppliedTimestampSufficientForIndependence: false as const,
      byteDistinctCapturesSufficientForIndependentSessionProof: false as const,
      sameParticipantAttestationMeansIdentityProof: false as const,
      identityMatchingPerformed: false as const,
      independentSessionAdmissionImplementedForEyePair: false as const,
      externalWitnessTrustRootAvailableToThisProtocol: false as const,
      independentSessionClaimAllowed: false as const,
    }),
    descriptiveComparisonBoundary: Object.freeze({
      allowedStatistics: Object.freeze([
        'count',
        'min',
        'max',
        'mean',
        'range',
        'range_over_mean_descriptive_convenience',
        'absolute_mean_difference',
        'relative_mean_shift_descriptive_convenience',
      ] as const),
      correlationOrRedundancyConclusionAuthorized: false as const,
      repeatabilityPassFailAuthorized: false as const,
      captureSensitivityPassFailAuthorized: false as const,
      numericThresholdMayBeDerivedFromObservedSamples: false as const,
      productQualityGateMayBeDerivedFromObservedSamples: false as const,
    }),
    productBoundary: Object.freeze({
      userFacingCaptureCoachingAllowed: true as const,
      automaticCaptureQualityGateAuthorized: false as const,
      automaticRetakeThresholdAuthorized: false as const,
      automaticMetricSuppressionThresholdAuthorized: false as const,
      userFacingRepeatabilityPassFailLabelAllowed: false as const,
      numericRepeatabilityAcceptanceThreshold: null,
      numericCaptureQualityThreshold: null,
    }),
    authorityBoundary: Object.freeze({
      prospectiveRecurrenceProtocolFrozen: true as const,
      prospectiveRecurrenceExecutionPerformed: false as const,
      independentMultiSessionEvidenceAdmitted: false as const,
      multiSessionIndependenceVerified: false as const,
      empiricalRepeatabilityEstablished: false as const,
      captureQualityValidated: false as const,
      captureQualityMeasurementConstructValidated: false as const,
      calibrationIssued: false as const,
      thresholdsIssued: false as const,
      constructValidity: 'unresolved' as const,
      traditionalBinding: 'unresolved' as const,
      traditionalSemanticAuthority: false as const,
    }),
    privacyBoundary: Object.freeze({
      rawImagePersisted: false as const,
      rawProviderResponsePersisted: false as const,
      rawLandmarkSetPersisted: false as const,
      derivedFullFaceMetricGeometryPersisted: false as const,
      participantDerivedNumericMetricValuesPersistedInPublicEvidence: false as const,
      exactCaptureTimestampRequiredOrPersisted: false as const,
      geolocationRequiredOrPersisted: false as const,
      deviceIdentifierRequiredOrPersisted: false as const,
      faceEmbeddingPersisted: false as const,
      identityTemplatePersisted: false as const,
    }),
    researchNoteRef: FR163_RESEARCH_NOTE_REF,
    nextFrontier: FR163_NEXT_FRONTIER,
  });
}
