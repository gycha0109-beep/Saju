import {
  NEUTRAL_EAR_EMPIRICAL_RUNNER_AUTHORITY_FR102,
} from './neutral-ear-empirical-bundle-fr102.js';

export const NEUTRAL_EAR_CANDIDATE_VALIDATION_FR103 = Object.freeze({
  phase: 'FR103_EXTERNAL_EAR_CANDIDATE_VALIDATION' as const,
  predecessorPhase:
    NEUTRAL_EAR_EMPIRICAL_RUNNER_AUTHORITY_FR102.phase,
  empiricalIssue: 1707 as const,
  modelId: 'microsoft/Florence-2-base' as const,
  modelRevision:
    '5ca5edf5bd017b9919c05d08aebef5e4c7ac3bac' as const,
  primaryPrompt: 'external ear' as const,
  sideSpecificPromptPrimary: false as const,
  sideSpecificPromptAuthoritative: false as const,
  sideAssignmentDeferredToFaceGeometry: true as const,
  exactDegeneratePolygonReject: {
    enabled: true as const,
    conditions: [
      'zero_bbox_width',
      'zero_bbox_height',
      'zero_polygon_area',
    ] as const,
    rejectedState: 'unavailable' as const,
  },
  plausibilityEvidence: {
    recordBoundingBox: true as const,
    recordCentroid: true as const,
    recordPolygonArea: true as const,
    recordImageRelativeCoordinates: true as const,
    numericAcceptanceThresholdAuthorized: false as const,
    automaticPlausibilityClassificationAuthorized: false as const,
  },
  empiricalFindings: {
    clearVisibleEarLocalizationObserved: true as const,
    leftRightPromptSemanticSeparationObserved: false as const,
    partialOcclusionLocalizationObserved: true as const,
    partialOcclusionContourCompletionReliable: false as const,
    fullyOccludedRectangularMaskProducedDegeneratePolygon: true as const,
    frontalNoVisibleEarHallucinationObserved: true as const,
  },
  privacy: {
    userImagesAllowedInRepositoryHistory: false as const,
    qaOverlaysAllowedInRepositoryHistory: false as const,
    rawUserImagePolygonsAllowedInRepositoryHistory: false as const,
    repositorySummaryMustBeDeidentified: true as const,
  },
  authority: {
    neutralRuntimeEarObservationAuthorized: false as const,
    traditionalBindingAuthorized: false as const,
    appearanceInferenceAuthorized: false as const,
    depthOrFullnessInferenceAuthorized: false as const,
    numericAcceptanceThresholdAuthorized: false as const,
    productionAuthorization: false as const,
  },
  nextGate:
    'rerun_bounded_capture_cases_with_generic_prompt_and_validate_reject_behavior' as const,
});
