import {
  FR24_EYE_TOPOLOGY_SERIALIZATION_ORDER,
  type ProviderEyeTopologySymbolFR24,
} from './face-eye-pair-research-bridge-fr24.js';
import {
  MEDIAPIPE_PUBLISHED_FACE_LANDMARKER_NAMED_TOPOLOGIES_FR37,
} from './mediapipe-published-topology-surface-gap-fr37.js';

export interface NeutralEarLateralitySourceWitnessFR104V1 {
  readonly repository: 'google-ai-edge/mediapipe';
  readonly releaseTag: 'v0.10.35';
  readonly releaseCommit: 'f8ef212d5c962c0e853db7e59d217056b187084b';
  readonly path: string;
  readonly gitBlobSha: string;
  readonly evidenceRole:
    | 'published_face_landmarker_named_side_topologies'
    | 'web_vision_image_processing_surface'
    | 'normalized_landmark_coordinate_container';
}

export const NEUTRAL_EAR_LATERALITY_SOURCE_WITNESSES_FR104:
readonly NeutralEarLateralitySourceWitnessFR104V1[] = Object.freeze([
  Object.freeze({
    repository: 'google-ai-edge/mediapipe' as const,
    releaseTag: 'v0.10.35' as const,
    releaseCommit: 'f8ef212d5c962c0e853db7e59d217056b187084b' as const,
    path:
      'mediapipe/tasks/web/vision/face_landmarker/face_landmarks_connections.ts',
    gitBlobSha: '644de9d8c7cd90880d92b2393b4913fa93ace927',
    evidenceRole:
      'published_face_landmarker_named_side_topologies' as const,
  }),
  Object.freeze({
    repository: 'google-ai-edge/mediapipe' as const,
    releaseTag: 'v0.10.35' as const,
    releaseCommit: 'f8ef212d5c962c0e853db7e59d217056b187084b' as const,
    path:
      'mediapipe/tasks/web/vision/core/image_processing_options.d.ts',
    gitBlobSha: '9d463591a7579086458f9ac4028f3848c3e725df',
    evidenceRole:
      'web_vision_image_processing_surface' as const,
  }),
  Object.freeze({
    repository: 'google-ai-edge/mediapipe' as const,
    releaseTag: 'v0.10.35' as const,
    releaseCommit: 'f8ef212d5c962c0e853db7e59d217056b187084b' as const,
    path: 'mediapipe/framework/formats/landmark.proto',
    gitBlobSha: '151dff2360e93b7c4c0cedf5bddabe3093e709d1',
    evidenceRole:
      'normalized_landmark_coordinate_container' as const,
  }),
]);

const REQUIRED_EYE_LABELS: readonly ProviderEyeTopologySymbolFR24[] =
  Object.freeze([
    'FACE_LANDMARKS_LEFT_EYE',
    'FACE_LANDMARKS_RIGHT_EYE',
  ]);

export const NEUTRAL_EAR_LATERALITY_SOURCE_AUDIT_FR104 = Object.freeze({
  phase: 'FR104_ANATOMICAL_LATERALITY_SOURCE_AUDIT' as const,
  authorityState:
    'source_pinned_named_side_labels_found_anatomical_mapping_not_admitted' as const,

  providerNamedSideSurface: Object.freeze({
    requiredEyeLabels: REQUIRED_EYE_LABELS,
    fr24LabelsMatchExactPinnedSurface:
      REQUIRED_EYE_LABELS.every(
        (label) =>
          FR24_EYE_TOPOLOGY_SERIALIZATION_ORDER.includes(label)
          && MEDIAPIPE_PUBLISHED_FACE_LANDMARKER_NAMED_TOPOLOGIES_FR37
            .includes(label),
      ),
    literalLeftRightLabelsPublished: true as const,
    providerLabelMayBeCalledAnatomicalLaterality: false as const,
    horizontalMirrorBehaviorEstablishedByPinnedLabelFile: false as const,
    mirroredInputLabelInvarianceEstablished: false as const,
    mirroredInputLabelSwapEstablished: false as const,
  }),

  webImageProcessingSurface: Object.freeze({
    regionOfInterestOptionPublished: true as const,
    rotationDegreesOptionPublished: true as const,
    horizontalMirrorOptionPublishedInPinnedInterface: false as const,
    selfieModeOptionPublishedInPinnedInterface: false as const,
    externalPreMirroringExcludedByPinnedInterface: false as const,
    exifAutoApplicationEstablishedByPinnedInterface: false as const,
  }),

  normalizedLandmarkContainer: Object.freeze({
    normalizedCoordinateRangeDocumented: true as const,
    anatomicalSideFieldPresent: false as const,
    mirrorProvenanceFieldPresent: false as const,
    exifProvenanceFieldPresent: false as const,
  }),

  existingProjectAuthority: Object.freeze({
    fr24SideAuthority: 'provider_label_only' as const,
    fr24PairConsumptionState:
      'unordered_provider_labeled_pair_only' as const,
    fr24AnatomicalLateralityReady: false as const,
    florencePromptSideAuthoritative: false as const,
    imageSpaceHorizontalSignAuthoritative: false as const,
  }),

  prohibitedShortcuts: Object.freeze([
    'literal_provider_left_right_label_to_anatomical_side_without_semantic_witness',
    'normalized_x_sign_to_anatomical_side_without_orientation_and_mirror_provenance',
    'rotation_support_to_horizontal_mirror_proof',
    'absence_of_mirror_option_to_proof_input_was_not_pre_mirrored',
    'face_detection_side_labels_to_face_landmarker_mirror_semantics',
    'gnm_reference_side_group_to_subject_photo_anatomical_laterality',
  ] as const),

  blockers: Object.freeze([
    'provider_named_side_semantics_not_admitted_as_anatomical_authority',
    'face_landmarker_horizontal_mirror_behavior_not_source_pinned',
    'capture_pipeline_pixel_transform_provenance_not_independently_verified',
    'florence_candidate_to_provider_anatomical_side_mapping_not_reviewed',
  ] as const),

  requiredNextEvidence: Object.freeze([
    'controlled exact-runtime original-versus-horizontally-mirrored FaceLandmarker execution that records only bounded side-topology scalar behavior and no user image',
    'capture-pipeline receipt that independently records decoded orientation, EXIF application, rotation, and horizontal mirror transforms before both Florence and FaceLandmarker',
    'reviewed mapping from verified pixel-frame provenance plus governed provider side evidence to anatomical side',
  ] as const),

  decision: Object.freeze({
    anatomicalLateralityMappingAdmitted: false as const,
    anatomicalLateralityAuthorized: false as const,
    neutralRuntimeEarObservationAuthorized: false as const,
    traditionalBindingAuthorized: false as const,
    productionAuthorization: false as const,
    nextGate:
      'controlled_exact_runtime_mirror_pair_and_capture_transform_provenance' as const,
  }),
});
