import {
  MEDIAPIPE_FACE_GEOMETRY_TRANSFORM_RELEASE_WITNESS_FR68,
} from './mediapipe-face-geometry-transform-semantics-fr68.js';
import {
  NEUTRAL_EAR_REFERENCE_TARGET_FR100,
} from './neutral-ear-reference-target-fr100.js';
import {
  NEUTRAL_EAR_CANDIDATE_VALIDATION_FR103,
} from './neutral-ear-candidate-validation-fr103.js';
import {
  FR257_CONTRACT_VERSION,
} from './observable-morphology-capture-geometry-attribution-fr257.js';

export const NEUTRAL_EAR_GEOMETRY_PLAUSIBILITY_READINESS_FR104 = Object.freeze({
  phase: 'FR104_EXTERNAL_EAR_GEOMETRY_PLAUSIBILITY_READINESS' as const,
  issue: 1810 as const,
  predecessorPhase: NEUTRAL_EAR_CANDIDATE_VALIDATION_FR103.phase,
  authorityState:
    'reuse_map_frozen_plausibility_implementation_not_yet_authorized' as const,

  fr103CloseoutEvidence: Object.freeze({
    clearVisibleEarLocalizationObserved: true as const,
    oppositeOrientationLocalizationObserved: true as const,
    frontalCentralFaceHallucinationObserved: true as const,
    fullOcclusionExactDegeneracyFailClosedObserved: true as const,
    partialOcclusionNearLineOccluderEdgeFalsePositiveObserved: true as const,
    pairAgreementMayEstablishEarValidity: false as const,
    nonDegeneratePolygonMayEstablishEarValidity: false as const,
    promptSideMayEstablishAnatomicalLaterality: false as const,
  }),

  reusableGeometryAuthority: Object.freeze({
    fr62: Object.freeze({
      artifact: 'governed-neutral-geometry-fr62' as const,
      coordinateFrame: 'canonical_image_normalized_2d' as const,
      use: 'authority_safe_region_candidate_pattern_only' as const,
      anatomicalLateralityResolved: false as const,
      earDetectorAuthority: false as const,
    }),
    fr68: Object.freeze({
      artifact: 'mediapipe-face-geometry-transform-semantics-fr68' as const,
      releaseTag:
        MEDIAPIPE_FACE_GEOMETRY_TRANSFORM_RELEASE_WITNESS_FR68.release.tag,
      transformSemanticsReviewed: true as const,
      directImage2DTransformAuthorized: false as const,
    }),
    fr76fr77: Object.freeze({
      artifact: 'governed-metric-geometry-runtime-fr77' as const,
      coordinateFrame: 'canonical_aligned_right_handed_metric_3d' as const,
      metricLandmarkCount: 468 as const,
      poseTransformElementCount: 16 as const,
      parallelPoseNormalizationStackAuthorized: false as const,
    }),
    fr257: Object.freeze({
      artifact: 'observable-morphology-capture-geometry-attribution-fr257' as const,
      contractVersion: FR257_CONTRACT_VERSION,
      reusableScalars: Object.freeze([
        'lateralOrientationRadians',
        'verticalOrientationRadians',
        'relativeRotationFromFirstAcceptedCaptureRadians',
        'inPlaneLateralAxisOrientationRadians',
        'poseUniformScaleComponent',
        'screenFaceBoxWidthFraction',
        'screenFaceBoxHeightFraction',
        'screenFaceBoxAreaFraction',
      ] as const),
      geometryIsDescriptiveOnly: true as const,
      poseThresholdAuthorized: false as const,
      poseClassificationAuthorized: false as const,
    }),
    fr100: Object.freeze({
      artifact: 'neutral-ear-reference-target-fr100' as const,
      neutralReferenceTargetAuthorized:
        NEUTRAL_EAR_REFERENCE_TARGET_FR100.neutralReferenceTargetAuthorized,
      subjectPhotoEarObservationAvailable:
        NEUTRAL_EAR_REFERENCE_TARGET_FR100.runtimeBoundary
          .subjectPhotoEarObservationAvailable,
      subjectSpecificRegistrationImplemented:
        NEUTRAL_EAR_REFERENCE_TARGET_FR100.runtimeBoundary
          .subjectSpecificRegistrationImplemented,
      mayAutoRegisterReferenceToSubjectEar: false as const,
    }),
    fr103: Object.freeze({
      artifact: 'neutral-ear-candidate-validation-fr103' as const,
      dualProbePrimary:
        NEUTRAL_EAR_CANDIDATE_VALIDATION_FR103.primaryPromptStrategy ===
        'dual_side_prompt_pair_non_authoritative_laterality',
      promptSideLabelsAuthoritative:
        NEUTRAL_EAR_CANDIDATE_VALIDATION_FR103.promptSideLabelsAuthoritative,
      automaticConsensusAcceptanceAuthorized:
        NEUTRAL_EAR_CANDIDATE_VALIDATION_FR103.pairwiseEvidence
          .automaticConsensusAcceptanceAuthorized,
      numericAcceptanceThresholdAuthorized:
        NEUTRAL_EAR_CANDIDATE_VALIDATION_FR103.pairwiseEvidence
          .numericAcceptanceThresholdAuthorized,
    }),
  }),

  unresolvedGates: Object.freeze([
    'canonical_pixel_orientation_and_exif_provenance',
    'front_camera_mirror_provenance',
    'candidate_shape_plausibility_evidence',
    'candidate_to_face_relative_frame_mapping',
    'lateral_region_plausibility_evidence',
    'visibility_crop_occlusion_qualification',
    'anatomical_laterality_assignment',
    'prospective_calibration_before_any_numeric_cutoff',
  ] as const),

  requiredPipelineOrder: Object.freeze([
    'florence_candidate_polygon',
    'exact_structural_validity',
    'shape_plausibility_evidence',
    'canonical_orientation_provenance',
    'mirror_provenance',
    'existing_fr76_fr77_fr257_pose_geometry',
    'face_relative_lateral_plausibility',
    'visibility_crop_occlusion_qualification',
    'anatomical_laterality_when_supportable',
    'neutral_external_ear_observation_candidate',
  ] as const),

  prohibitedShortcuts: Object.freeze([
    'prompt_side_to_anatomical_laterality',
    'pair_overlap_to_validated_ear',
    'nonzero_near_line_polygon_to_automatic_acceptance',
    'fixed_image_x_cutoff_to_ear_zone',
    'screen_left_right_to_anatomical_side_without_orientation_and_mirror_provenance',
    'gnm_reference_surface_to_subject_observed_ear',
    'missing_or_occluded_ear_to_negative_traditional_criterion',
    'neutral_ear_candidate_to_traditional_semantics',
  ] as const),

  privacy: Object.freeze({
    userImagesAllowedInRepositoryHistory: false as const,
    qaOverlaysAllowedInRepositoryHistory: false as const,
    rawUserImagePolygonsAllowedInRepositoryHistory: false as const,
    privateImageDigestsAllowedInResearchRecord: false as const,
  }),

  authority: Object.freeze({
    faceGeometryPlausibilityGateImplemented: false as const,
    automaticShapeRejectionThresholdAuthorized: false as const,
    automaticLateralZoneThresholdAuthorized: false as const,
    anatomicalLateralityAuthorized: false as const,
    neutralRuntimeEarObservationAuthorized: false as const,
    traditionalBindingAuthorized: false as const,
    productionAuthorization: false as const,
  }),

  nextGate:
    'define_shape_and_face_relative_evidence_contract_without_numeric_thresholds' as const,
});
