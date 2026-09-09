export const FR162_EYE_PAIR_CAPTURE_CONDITION_OPERATIONAL_BOUNDARY_ID =
  'research.face_reading.neutral.eye_pair.capture_condition_operational_boundary.fr162' as const;

export const FR162_RESEARCH_NOTE_REF =
  'repo:research/face-reading/fr162-eye-pair-capture-condition-operational-boundary.md' as const;

export const FR162_NEXT_FRONTIER =
  'prospective_independent_session_recurrence_and_capture_coaching_evaluation_without_numeric_quality_threshold_or_semantic_promotion' as const;

export function getEyePairCaptureConditionOperationalBoundaryFR162() {
  return Object.freeze({
    schemaVersion: 'fr162-eye-pair-capture-condition-operational-boundary-v1' as const,
    artifactVersion: '0.1.0' as const,
    recordId: FR162_EYE_PAIR_CAPTURE_CONDITION_OPERATIONAL_BOUNDARY_ID,
    predecessor: Object.freeze({
      fr161RealCaptureExecutionImplemented: true as const,
      fr161DescriptiveOnlyBoundaryRetained: true as const,
      preregisteredPrimaryMetricCount: 2 as const,
      coordinateFrame: 'canonical_aligned_right_handed_metric_3d' as const,
    }),
    empiricalBoundary: Object.freeze({
      localCaptureConditionExecutionOccurred: true as const,
      publicParticipantDerivedNumericMeasurementsStored: false as const,
      publicRawImagesStored: false as const,
      publicRawProviderPayloadStored: false as const,
      publicRawLandmarksStored: false as const,
      participantIdentityInferencePerformed: false as const,
      descriptiveObservationsMayMotivateCaptureCoaching: true as const,
      descriptiveObservationsEstablishCaptureQualityValidity: false as const,
      descriptiveObservationsEstablishRepeatability: false as const,
      captureSensitivityPassFailIssued: false as const,
    }),
    operationalCaptureGuidance: Object.freeze({
      purpose: 'reduce_uncontrolled_capture_variation_without_claiming_validated_quality' as const,
      frontalNeutralPoseRequested: true as const,
      cameraNearEyeLevelRequested: true as const,
      avoidIntentionallyExtremeNearOrFarFraming: true as const,
      avoidIntentionallyHighOrLowCameraAngle: true as const,
      consistentFramingAcrossRepeatedCapturesRequested: true as const,
      guidanceIsNumericAcceptanceThreshold: false as const,
      guidanceMeansCaptureQualityValidated: false as const,
      guidanceMayRejectAUserCaptureAutomatically: false as const,
    }),
    productBoundary: Object.freeze({
      automaticCaptureQualityGateAuthorized: false as const,
      automaticMetricSuppressionThresholdAuthorized: false as const,
      automaticRetakeThresholdAuthorized: false as const,
      userFacingCaptureCoachingAllowed: true as const,
      userFacingPassFailQualityLabelAllowed: false as const,
      numericRepeatabilityAcceptanceThreshold: null,
      numericCaptureQualityThreshold: null,
    }),
    authorityBoundary: Object.freeze({
      empiricalRepeatabilityEstablished: false as const,
      captureQualityValidated: false as const,
      captureQualityMeasurementConstructValidated: false as const,
      identityMatchingPerformed: false as const,
      biometricTemplateIssued: false as const,
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
      faceEmbeddingPersisted: false as const,
      identityTemplatePersisted: false as const,
    }),
    researchNoteRef: FR162_RESEARCH_NOTE_REF,
    nextFrontier: FR162_NEXT_FRONTIER,
  });
}
