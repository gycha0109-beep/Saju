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
  primaryPromptStrategy:
    'dual_side_prompt_pair_non_authoritative_laterality' as const,
  primaryPromptPair: ['left external ear', 'right external ear'] as const,
  genericPromptPrimary: false as const,
  genericPromptDiagnosticOnly: true as const,
  promptSideLabelsAuthoritative: false as const,
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
  pairwiseEvidence: {
    recordBoundingBoxOverlap: true as const,
    recordBoundingBoxIoU: true as const,
    recordCentroidDistance: true as const,
    recordPolygonAreaRatio: true as const,
    automaticConsensusAcceptanceAuthorized: false as const,
    numericAcceptanceThresholdAuthorized: false as const,
  },
  plausibilityEvidence: {
    recordBoundingBox: true as const,
    recordCentroid: true as const,
    recordPolygonArea: true as const,
    recordImageRelativeCoordinates: true as const,
    faceGeometryPlausibilityGateImplemented: false as const,
    automaticPlausibilityClassificationAuthorized: false as const,
    numericAcceptanceThresholdAuthorized: false as const,
  },
  empiricalFindings: {
    clearVisibleEarSidePromptLocalizationObserved: true as const,
    leftRightPromptSemanticSeparationObserved: false as const,
    genericPromptClearEarLeakageObserved: true as const,
    genericPromptFrontalHallucinationObserved: true as const,
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
    pairMetricsMayBeCalledValidatedEarConsensus: false as const,
    neutralRuntimeEarObservationAuthorized: false as const,
    anatomicalLateralityAuthorized: false as const,
    traditionalBindingAuthorized: false as const,
    appearanceInferenceAuthorized: false as const,
    depthOrFullnessInferenceAuthorized: false as const,
    numericAcceptanceThresholdAuthorized: false as const,
    productionAuthorization: false as const,
  },
  nextGate:
    'validate_dual_prompt_pair_metrics_then_add_governed_face_geometry_plausibility_gate' as const,
});
