export type FR282RegionKey =
  | 'forehead'
  | 'eyebrow'
  | 'eye_pair'
  | 'nose'
  | 'mouth_lips'
  | 'ear'
  | 'cheek_mid_face'
  | 'chin_lower_face';

export type FR282ObservationClass =
  | 'rgb_2d_landmark_geometry'
  | 'rgb_contour_or_segmentation'
  | 'rgb_relative_3d_shape'
  | 'visibility_dependent'
  | 'unavailable';

export type FR282Readiness =
  | 'reusable_now'
  | 'partial_gap'
  | 'new_image_model_required'
  | 'relative_3d_benchmark_required'
  | 'visibility_gate_required'
  | 'unavailable';

export interface FR282FeatureAuthorityEntry {
  readonly featureKey: string;
  readonly regionKey: FR282RegionKey;
  readonly observationClass: FR282ObservationClass;
  readonly readiness: FR282Readiness;
  readonly reusableRefs: readonly string[];
  readonly specialDepthHardwareRequired: false;
  readonly metric3DRequired: false;
  readonly traditionalBindingIssued: false;
  readonly note: string;
}

export interface FR282RgbSelfieFeatureAuthorityMatrix {
  readonly schemaVersion: 'fr282-rgb-selfie-feature-authority-matrix-v1';
  readonly contractVersion: 'FR282-RGB-SELFIE-FEATURE-AUTHORITY-MATRIX-v1';
  readonly productCaptureBoundary: {
    readonly cameraClass: 'ordinary_smartphone_rgb_front_camera';
    readonly distanceCm: readonly [25, 30];
    readonly manufacturerSpecificDepthRequired: false;
    readonly arcoreRequired: false;
    readonly truedepthRequired: false;
    readonly tofRequired: false;
    readonly externalDepthSensorRequired: false;
  };
  readonly featureEntries: readonly FR282FeatureAuthorityEntry[];
  readonly authorityBoundary: {
    readonly observableMorphologyOnly: true;
    readonly physicalMillimeterDepthPresumedNecessary: false;
    readonly rgb3dModelMayBeCalledGroundTruth: false;
    readonly traditionalInterpretationDownstreamOnly: true;
    readonly thresholdIssued: false;
    readonly classificationIssued: false;
    readonly productionActivated: false;
  };
  readonly nextFrontier:
    'benchmark_same_rgb_selfie_across_landmark_segmentation_and_relative_3d_providers';
}

function feature(
  value: FR282FeatureAuthorityEntry,
): FR282FeatureAuthorityEntry {
  return Object.freeze({
    ...value,
    reusableRefs: Object.freeze([...value.reusableRefs]),
  });
}

const NONE: readonly string[] = Object.freeze([]);

export const FR282_RGB_SELFIE_FEATURE_ENTRIES:
readonly FR282FeatureAuthorityEntry[] = Object.freeze([
  feature({
    featureKey: 'forehead.visible_width_shape',
    regionKey: 'forehead',
    observationClass: 'rgb_contour_or_segmentation',
    readiness: 'new_image_model_required',
    reusableRefs: ['packages/face-reading/src/face-reading-whole-face-minimum-measurement-inventory-fr207.ts'],
    specialDepthHardwareRequired: false,
    metric3DRequired: false,
    traditionalBindingIssued: false,
    note: 'Visible forehead extent is an image-visible construct; MediaPipe face oval must not be relabeled as hairline.',
  }),
  feature({
    featureKey: 'forehead.visible_hairline_boundary',
    regionKey: 'forehead',
    observationClass: 'rgb_contour_or_segmentation',
    readiness: 'new_image_model_required',
    reusableRefs: ['packages/face-reading/src/face-reading-whole-face-minimum-measurement-inventory-fr207.ts'],
    specialDepthHardwareRequired: false,
    metric3DRequired: false,
    traditionalBindingIssued: false,
    note: 'Requires hair/skin boundary segmentation when visible.',
  }),
  feature({
    featureKey: 'forehead.relative_surface_curvature',
    regionKey: 'forehead',
    observationClass: 'rgb_relative_3d_shape',
    readiness: 'relative_3d_benchmark_required',
    reusableRefs: NONE,
    specialDepthHardwareRequired: false,
    metric3DRequired: false,
    traditionalBindingIssued: false,
    note: 'Relative shape is sufficient; no physical millimeter depth requirement is established.',
  }),

  feature({
    featureKey: 'eyebrow.span_arch_tail_orientation',
    regionKey: 'eyebrow',
    observationClass: 'rgb_2d_landmark_geometry',
    readiness: 'partial_gap',
    reusableRefs: [
      'packages/face-reading/src/cross-face-neutral-observable-primitives-fr208.ts',
      'packages/face-reading/src/mediapipe-published-eyebrow-component-decomposition-fr39.ts',
    ],
    specialDepthHardwareRequired: false,
    metric3DRequired: false,
    traditionalBindingIssued: false,
    note: 'FR208 defines neutral span/arch/tail axes but product brow boundary/role wiring remains incomplete.',
  }),
  feature({
    featureKey: 'eyebrow.visible_hair_density_texture',
    regionKey: 'eyebrow',
    observationClass: 'rgb_contour_or_segmentation',
    readiness: 'new_image_model_required',
    reusableRefs: ['packages/face-reading/src/face-reading-whole-face-minimum-measurement-inventory-fr207.ts'],
    specialDepthHardwareRequired: false,
    metric3DRequired: false,
    traditionalBindingIssued: false,
    note: 'Appearance construct; unrelated geometry must not be used as a proxy.',
  }),

  feature({
    featureKey: 'eye.width_height_ratio',
    regionKey: 'eye_pair',
    observationClass: 'rgb_2d_landmark_geometry',
    readiness: 'reusable_now',
    reusableRefs: [
      'packages/face-reading/src/eye-neutral-axis-bundle-fr210.ts',
      'packages/face-reading/src/eye-pair-geometric-y-span-runtime-fr178.ts',
    ],
    specialDepthHardwareRequired: false,
    metric3DRequired: false,
    traditionalBindingIssued: false,
    note: 'Neutral continuous axis already exists.',
  }),
  feature({
    featureKey: 'eye.inter_eye_spacing_ratio',
    regionKey: 'eye_pair',
    observationClass: 'rgb_2d_landmark_geometry',
    readiness: 'reusable_now',
    reusableRefs: ['packages/face-reading/src/eye-neutral-axis-bundle-fr210.ts'],
    specialDepthHardwareRequired: false,
    metric3DRequired: false,
    traditionalBindingIssued: false,
    note: 'Centroid-separation ratio is already available as neutral geometry.',
  }),
  feature({
    featureKey: 'eye.outer_corner_tilt',
    regionKey: 'eye_pair',
    observationClass: 'rgb_2d_landmark_geometry',
    readiness: 'reusable_now',
    reusableRefs: [
      'packages/face-reading/src/cross-face-neutral-observable-primitives-fr208.ts',
      'packages/face-reading/src/eye-neutral-axis-bundle-fr210.ts',
      'packages/face-reading/src/observable-morphology-validation-fr218.ts',
    ],
    specialDepthHardwareRequired: false,
    metric3DRequired: false,
    traditionalBindingIssued: false,
    note: 'Neutral observable orientation exists and has a blinded human-review validation path.',
  }),
  feature({
    featureKey: 'eye.bilateral_shape_asymmetry',
    regionKey: 'eye_pair',
    observationClass: 'rgb_2d_landmark_geometry',
    readiness: 'reusable_now',
    reusableRefs: ['packages/face-reading/src/eye-asymmetry-surface-fr215.ts'],
    specialDepthHardwareRequired: false,
    metric3DRequired: false,
    traditionalBindingIssued: false,
    note: 'Unordered bilateral continuous asymmetry axes are implemented.',
  }),
  feature({
    featureKey: 'eye.eyelid_crease_or_hooded_category',
    regionKey: 'eye_pair',
    observationClass: 'rgb_contour_or_segmentation',
    readiness: 'new_image_model_required',
    reusableRefs: ['packages/face-reading/src/face-reading-observable-morphology-measurement-boundary-fr206.ts'],
    specialDepthHardwareRequired: false,
    metric3DRequired: false,
    traditionalBindingIssued: false,
    note: 'Must use an image-visible classifier/segmentation route or return unavailable.',
  }),

  feature({
    featureKey: 'nose.bridge_centerline_deviation',
    regionKey: 'nose',
    observationClass: 'rgb_2d_landmark_geometry',
    readiness: 'reusable_now',
    reusableRefs: ['packages/face-reading/src/nose-geometry.ts'],
    specialDepthHardwareRequired: false,
    metric3DRequired: false,
    traditionalBindingIssued: false,
    note: 'Existing governed neutral nose geometry.',
  }),
  feature({
    featureKey: 'nose.tip_contour_circularity',
    regionKey: 'nose',
    observationClass: 'rgb_contour_or_segmentation',
    readiness: 'reusable_now',
    reusableRefs: ['packages/face-reading/src/nose-geometry.ts'],
    specialDepthHardwareRequired: false,
    metric3DRequired: false,
    traditionalBindingIssued: false,
    note: 'Existing visible tip-contour geometry; must not be relabeled as fullness.',
  }),
  feature({
    featureKey: 'nose.alar_width_and_nostril_geometry',
    regionKey: 'nose',
    observationClass: 'rgb_contour_or_segmentation',
    readiness: 'partial_gap',
    reusableRefs: ['packages/face-reading/src/face-reading-whole-face-minimum-measurement-inventory-fr207.ts'],
    specialDepthHardwareRequired: false,
    metric3DRequired: false,
    traditionalBindingIssued: false,
    note: 'Needs explicit visible alar/nostril boundary measurement rather than provider-index semantics.',
  }),
  feature({
    featureKey: 'nose.tip_bridge_relative_projection',
    regionKey: 'nose',
    observationClass: 'rgb_relative_3d_shape',
    readiness: 'relative_3d_benchmark_required',
    reusableRefs: [
      'packages/face-reading/src/nasal-apex-geometry-candidate-study-fr267.ts',
      'packages/face-reading/src/nasal-apex-empirical-bundle-fr268.ts',
    ],
    specialDepthHardwareRequired: false,
    metric3DRequired: false,
    traditionalBindingIssued: false,
    note: 'The product question is relative facial projection from RGB, not physical millimeter depth.',
  }),

  feature({
    featureKey: 'mouth.width_and_relative_size',
    regionKey: 'mouth_lips',
    observationClass: 'rgb_2d_landmark_geometry',
    readiness: 'reusable_now',
    reusableRefs: [
      'packages/face-reading/src/neutral-mouth-contour-metric-fr80.ts',
      'packages/face-reading/src/neutral-mouth-relative-size-metric-fr82.ts',
    ],
    specialDepthHardwareRequired: false,
    metric3DRequired: false,
    traditionalBindingIssued: false,
    note: 'Neutral contour/relative-size geometry exists.',
  }),
  feature({
    featureKey: 'mouth.corner_orientation',
    regionKey: 'mouth_lips',
    observationClass: 'rgb_2d_landmark_geometry',
    readiness: 'reusable_now',
    reusableRefs: ['packages/face-reading/src/visible-mouth-corner-orientation-fr212.ts'],
    specialDepthHardwareRequired: false,
    metric3DRequired: false,
    traditionalBindingIssued: false,
    note: 'Visible mouth-corner orientation is implemented as a neutral continuous axis.',
  }),
  feature({
    featureKey: 'mouth.outline_angularity',
    regionKey: 'mouth_lips',
    observationClass: 'rgb_contour_or_segmentation',
    readiness: 'reusable_now',
    reusableRefs: ['packages/face-reading/src/role-free-mouth-outline-angularity-fr214.ts'],
    specialDepthHardwareRequired: false,
    metric3DRequired: false,
    traditionalBindingIssued: false,
    note: 'Role-free visible mouth-outline angularity is implemented.',
  }),
  feature({
    featureKey: 'mouth.visible_lip_fullness',
    regionKey: 'mouth_lips',
    observationClass: 'rgb_contour_or_segmentation',
    readiness: 'partial_gap',
    reusableRefs: ['packages/face-reading/src/face-reading-whole-face-minimum-measurement-inventory-fr207.ts'],
    specialDepthHardwareRequired: false,
    metric3DRequired: false,
    traditionalBindingIssued: false,
    note: 'Requires governed upper/lower visible boundary roles; current contour separation alone is insufficient.',
  }),
  feature({
    featureKey: 'mouth.philtrum_length_width',
    regionKey: 'mouth_lips',
    observationClass: 'rgb_2d_landmark_geometry',
    readiness: 'partial_gap',
    reusableRefs: NONE,
    specialDepthHardwareRequired: false,
    metric3DRequired: false,
    traditionalBindingIssued: false,
    note: 'Reference-image taxonomy requires a neutral measurable philtrum axis not yet frozen in the current inventory.',
  }),
  feature({
    featureKey: 'mouth.visible_lip_color',
    regionKey: 'mouth_lips',
    observationClass: 'rgb_contour_or_segmentation',
    readiness: 'new_image_model_required',
    reusableRefs: ['packages/face-reading/src/face-reading-whole-face-minimum-measurement-inventory-fr207.ts'],
    specialDepthHardwareRequired: false,
    metric3DRequired: false,
    traditionalBindingIssued: false,
    note: 'Appearance feature requires controlled image modeling; no uncalibrated traditional color label.',
  }),

  feature({
    featureKey: 'ear.visible_boundary_height_shape',
    regionKey: 'ear',
    observationClass: 'visibility_dependent',
    readiness: 'visibility_gate_required',
    reusableRefs: [
      'packages/face-reading/src/face-reading-product-capture-view-contract-fr191.ts',
      'packages/face-geometry/README.md',
    ],
    specialDepthHardwareRequired: false,
    metric3DRequired: false,
    traditionalBindingIssued: false,
    note: 'External pinna may be hidden in a frontal selfie; analyze only when visibly admitted.',
  }),
  feature({
    featureKey: 'ear.thickness_attachment_canal_boundary',
    regionKey: 'ear',
    observationClass: 'unavailable',
    readiness: 'unavailable',
    reusableRefs: ['packages/face-reading/src/face-reading-whole-face-minimum-measurement-inventory-fr207.ts'],
    specialDepthHardwareRequired: false,
    metric3DRequired: false,
    traditionalBindingIssued: false,
    note: 'Current ordinary frontal RGB selfie does not establish reliable observation authority.',
  }),

  feature({
    featureKey: 'cheek_midface.visible_width_ratio',
    regionKey: 'cheek_mid_face',
    observationClass: 'rgb_2d_landmark_geometry',
    readiness: 'reusable_now',
    reusableRefs: ['packages/face-reading/src/visible-midface-band-fr211.ts'],
    specialDepthHardwareRequired: false,
    metric3DRequired: false,
    traditionalBindingIssued: false,
    note: 'Visible midface width is implemented without claiming skeletal bizygomatic breadth.',
  }),
  feature({
    featureKey: 'cheek_midface.visible_contour_prominence',
    regionKey: 'cheek_mid_face',
    observationClass: 'rgb_2d_landmark_geometry',
    readiness: 'reusable_now',
    reusableRefs: ['packages/face-reading/src/visible-cheek-contour-prominence-fr217.ts'],
    specialDepthHardwareRequired: false,
    metric3DRequired: false,
    traditionalBindingIssued: false,
    note: 'Visible side-contour deviation is implemented as neutral morphology.',
  }),
  feature({
    featureKey: 'cheek_midface.relative_3d_prominence',
    regionKey: 'cheek_mid_face',
    observationClass: 'rgb_relative_3d_shape',
    readiness: 'relative_3d_benchmark_required',
    reusableRefs: NONE,
    specialDepthHardwareRequired: false,
    metric3DRequired: false,
    traditionalBindingIssued: false,
    note: 'Optional relative-shape augmentation; not a prerequisite for current 2D cheek observables.',
  }),

  feature({
    featureKey: 'chin_lower_face.visible_width_ratio',
    regionKey: 'chin_lower_face',
    observationClass: 'rgb_2d_landmark_geometry',
    readiness: 'reusable_now',
    reusableRefs: ['packages/face-reading/src/visible-lower-face-width-fr213.ts'],
    specialDepthHardwareRequired: false,
    metric3DRequired: false,
    traditionalBindingIssued: false,
    note: 'Visible soft-tissue lower-face width is implemented without jaw-bone claims.',
  }),
  feature({
    featureKey: 'chin_lower_face.visible_contour',
    regionKey: 'chin_lower_face',
    observationClass: 'rgb_contour_or_segmentation',
    readiness: 'reusable_now',
    reusableRefs: ['packages/face-reading/src/canonical-visible-lower-face-contour-fr216.ts'],
    specialDepthHardwareRequired: false,
    metric3DRequired: false,
    traditionalBindingIssued: false,
    note: 'Canonical visible soft-tissue lower-face contour is implemented.',
  }),
  feature({
    featureKey: 'chin_lower_face.chin_height_width_center_deviation',
    regionKey: 'chin_lower_face',
    observationClass: 'rgb_2d_landmark_geometry',
    readiness: 'partial_gap',
    reusableRefs: [
      'packages/face-reading/src/canonical-visible-lower-face-contour-fr216.ts',
      'packages/face-reading/src/central-chin-reference-trace-protocol-fr54.ts',
    ],
    specialDepthHardwareRequired: false,
    metric3DRequired: false,
    traditionalBindingIssued: false,
    note: 'Can be derived from visible contour/reference axes after a product-neutral definition is frozen.',
  }),
  feature({
    featureKey: 'chin_lower_face.relative_projection',
    regionKey: 'chin_lower_face',
    observationClass: 'rgb_relative_3d_shape',
    readiness: 'relative_3d_benchmark_required',
    reusableRefs: NONE,
    specialDepthHardwareRequired: false,
    metric3DRequired: false,
    traditionalBindingIssued: false,
    note: 'Relative projection may enrich profile morphology but no physical millimeter requirement is established.',
  }),
]);

export const FACE_READING_RGB_SELFIE_FEATURE_AUTHORITY_MATRIX_FR282:
FR282RgbSelfieFeatureAuthorityMatrix = Object.freeze({
  schemaVersion: 'fr282-rgb-selfie-feature-authority-matrix-v1',
  contractVersion: 'FR282-RGB-SELFIE-FEATURE-AUTHORITY-MATRIX-v1',
  productCaptureBoundary: Object.freeze({
    cameraClass: 'ordinary_smartphone_rgb_front_camera' as const,
    distanceCm: Object.freeze([25, 30] as const),
    manufacturerSpecificDepthRequired: false as const,
    arcoreRequired: false as const,
    truedepthRequired: false as const,
    tofRequired: false as const,
    externalDepthSensorRequired: false as const,
  }),
  featureEntries: FR282_RGB_SELFIE_FEATURE_ENTRIES,
  authorityBoundary: Object.freeze({
    observableMorphologyOnly: true as const,
    physicalMillimeterDepthPresumedNecessary: false as const,
    rgb3dModelMayBeCalledGroundTruth: false as const,
    traditionalInterpretationDownstreamOnly: true as const,
    thresholdIssued: false as const,
    classificationIssued: false as const,
    productionActivated: false as const,
  }),
  nextFrontier:
    'benchmark_same_rgb_selfie_across_landmark_segmentation_and_relative_3d_providers' as const,
});

export function assertFaceReadingRgbSelfieFeatureAuthorityMatrixFR282(
  value: FR282RgbSelfieFeatureAuthorityMatrix,
): void {
  if (
    value.schemaVersion !== 'fr282-rgb-selfie-feature-authority-matrix-v1' ||
    value.contractVersion !== 'FR282-RGB-SELFIE-FEATURE-AUTHORITY-MATRIX-v1'
  ) throw new Error('fr282_identity_drift');

  if (
    value.productCaptureBoundary.cameraClass !== 'ordinary_smartphone_rgb_front_camera' ||
    value.productCaptureBoundary.distanceCm[0] !== 25 ||
    value.productCaptureBoundary.distanceCm[1] !== 30 ||
    value.productCaptureBoundary.manufacturerSpecificDepthRequired !== false ||
    value.productCaptureBoundary.arcoreRequired !== false ||
    value.productCaptureBoundary.truedepthRequired !== false ||
    value.productCaptureBoundary.tofRequired !== false ||
    value.productCaptureBoundary.externalDepthSensorRequired !== false
  ) throw new Error('fr282_product_capture_boundary_drift');

  if (value.featureEntries.length < 20) throw new Error('fr282_feature_inventory_too_small');
  if (new Set(value.featureEntries.map((entry) => entry.featureKey)).size !== value.featureEntries.length) {
    throw new Error('fr282_duplicate_feature_key');
  }

  const requiredRegions: readonly FR282RegionKey[] = [
    'forehead',
    'eyebrow',
    'eye_pair',
    'nose',
    'mouth_lips',
    'ear',
    'cheek_mid_face',
    'chin_lower_face',
  ];
  for (const region of requiredRegions) {
    if (!value.featureEntries.some((entry) => entry.regionKey === region)) {
      throw new Error(`fr282_missing_region:${region}`);
    }
  }

  for (const entry of value.featureEntries) {
    if (
      entry.specialDepthHardwareRequired !== false ||
      entry.metric3DRequired !== false ||
      entry.traditionalBindingIssued !== false
    ) throw new Error(`fr282_authority_widened:${entry.featureKey}`);
  }

  if (
    value.authorityBoundary.observableMorphologyOnly !== true ||
    value.authorityBoundary.physicalMillimeterDepthPresumedNecessary !== false ||
    value.authorityBoundary.rgb3dModelMayBeCalledGroundTruth !== false ||
    value.authorityBoundary.traditionalInterpretationDownstreamOnly !== true ||
    value.authorityBoundary.thresholdIssued !== false ||
    value.authorityBoundary.classificationIssued !== false ||
    value.authorityBoundary.productionActivated !== false
  ) throw new Error('fr282_authority_boundary_drift');

  if (
    value.nextFrontier !==
    'benchmark_same_rgb_selfie_across_landmark_segmentation_and_relative_3d_providers'
  ) throw new Error('fr282_next_frontier_drift');
}
