import {
  FACE_READING_RGB_SELFIE_FEATURE_AUTHORITY_MATRIX_FR282,
  assertFaceReadingRgbSelfieFeatureAuthorityMatrixFR282,
  type FR282Readiness,
} from './rgb-selfie-feature-authority-matrix-fr282.js';
import {
  FR293_PRODUCT_COLUMN_MAP,
  assertFR293ProductColumnMap,
} from './rgb-selfie-product-column-map-fr293.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR294_HARD_GAP_FRONTIER_CONTRACT_VERSION =
  'FR294-HARD-GAP-EXECUTION-FRONTIER-v1' as const;

export type FR294HardGapLane =
  | 'new_image_model'
  | 'rgb_relative_3d_benchmark'
  | 'ear_visibility_then_image_model'
  | 'remain_unavailable';

export interface FR294HardGapFrontierEntry {
  readonly featureKey: string;
  readonly fr282Readiness: FR282Readiness;
  readonly lane: FR294HardGapLane;
  readonly nextEvidenceRequirement: string;
  readonly prohibitedShortcuts: readonly string[];
  readonly canonicalMaterializationAllowedNow: false;
}

function entry(
  value: FR294HardGapFrontierEntry,
): FR294HardGapFrontierEntry {
  return Object.freeze({
    ...value,
    prohibitedShortcuts: Object.freeze([
      ...value.prohibitedShortcuts,
    ]),
  });
}

export const FR294_HARD_GAP_FRONTIER = Object.freeze([
  entry({
    featureKey: 'forehead.visible_width_shape',
    fr282Readiness: 'new_image_model_required',
    lane: 'new_image_model',
    nextEvidenceRequirement:
      'validate a governed visible forehead skin-region segmentation against representative ordinary RGB selfies before issuing width/shape axes',
    prohibitedShortcuts: [
      'mediapipe_face_oval_to_hairline',
      'full_face_width_to_forehead_width',
      'traditional_forehead_text_to_segmentation',
    ],
    canonicalMaterializationAllowedNow: false,
  }),
  entry({
    featureKey: 'forehead.visible_hairline_boundary',
    fr282Readiness: 'new_image_model_required',
    lane: 'new_image_model',
    nextEvidenceRequirement:
      'validate a governed visible hair/skin boundary segmentation with visibility and occlusion handling',
    prohibitedShortcuts: [
      'mediapipe_face_oval_to_hairline',
      'face_mesh_top_vertices_to_hairline',
      'hidden_hairline_completion',
    ],
    canonicalMaterializationAllowedNow: false,
  }),
  entry({
    featureKey: 'forehead.relative_surface_curvature',
    fr282Readiness: 'relative_3d_benchmark_required',
    lane: 'rgb_relative_3d_benchmark',
    nextEvidenceRequirement:
      'benchmark provider-neutral monocular RGB relative-shape outputs on the same governed captures before any curvature axis is admitted',
    prohibitedShortcuts: [
      'mediapipe_z_to_ground_truth_depth',
      'single_provider_relative_z_to_physical_depth',
      '2d_forehead_contour_to_surface_curvature',
    ],
    canonicalMaterializationAllowedNow: false,
  }),
  entry({
    featureKey: 'eyebrow.visible_hair_density_texture',
    fr282Readiness: 'new_image_model_required',
    lane: 'new_image_model',
    nextEvidenceRequirement:
      'validate an appearance model on explicitly visible eyebrow-hair regions under controlled image-quality conditions',
    prohibitedShortcuts: [
      'eyebrow_geometry_to_hair_density',
      'provider_landmark_count_to_density',
      'uncalibrated_darkness_to_density',
    ],
    canonicalMaterializationAllowedNow: false,
  }),
  entry({
    featureKey: 'eye.eyelid_crease_or_hooded_category',
    fr282Readiness: 'new_image_model_required',
    lane: 'new_image_model',
    nextEvidenceRequirement:
      'validate an image-visible crease/hooded observation model with an explicit unavailable path for insufficient visibility',
    prohibitedShortcuts: [
      'eye_aspect_ratio_to_hooded_category',
      'provider_landmark_geometry_to_crease_presence',
      'traditional_eye_label_to_image_class',
    ],
    canonicalMaterializationAllowedNow: false,
  }),
  entry({
    featureKey: 'nose.tip_bridge_relative_projection',
    fr282Readiness: 'relative_3d_benchmark_required',
    lane: 'rgb_relative_3d_benchmark',
    nextEvidenceRequirement:
      'benchmark same-selfie provider-neutral relative nasal projection against a frozen independent reference protocol without claiming metric depth',
    prohibitedShortcuts: [
      'mediapipe_z_to_ground_truth_depth',
      'fr267_candidate_to_product_without_benchmark',
      'tip_circularity_to_projection',
    ],
    canonicalMaterializationAllowedNow: false,
  }),
  entry({
    featureKey: 'mouth.visible_lip_color',
    fr282Readiness: 'new_image_model_required',
    lane: 'new_image_model',
    nextEvidenceRequirement:
      'validate controlled visible-lip color observation with illumination/color-quality admission before issuing neutral color axes',
    prohibitedShortcuts: [
      'uncalibrated_rgb_to_traditional_red_lips',
      'geometry_to_color',
      'single_pixel_color_to_visible_lip_color',
    ],
    canonicalMaterializationAllowedNow: false,
  }),
  entry({
    featureKey: 'ear.visible_boundary_height_shape',
    fr282Readiness: 'visibility_gate_required',
    lane: 'ear_visibility_then_image_model',
    nextEvidenceRequirement:
      'issue and validate an ear-specific visibility admission gate first, then validate a visible external-pinna segmentation/model on admitted captures',
    prohibitedShortcuts: [
      'profile_capture_presence_to_ear_visibility_guarantee',
      'mediapipe_face_mesh_to_external_pinna_boundary',
      'gnm_authoring_ear_surface_to_subject_observation',
    ],
    canonicalMaterializationAllowedNow: false,
  }),
  entry({
    featureKey: 'ear.thickness_attachment_canal_boundary',
    fr282Readiness: 'unavailable',
    lane: 'remain_unavailable',
    nextEvidenceRequirement:
      'retain explicit unavailable status until a separate ordinary-RGB observation authority establishes reliable visible constructs',
    prohibitedShortcuts: [
      'external_pinna_outline_to_ear_thickness',
      'profile_image_to_attachment_or_canal_boundary',
      'provider_head_mesh_to_subject_ear_internal_geometry',
    ],
    canonicalMaterializationAllowedNow: false,
  }),
  entry({
    featureKey: 'cheek_midface.relative_3d_prominence',
    fr282Readiness: 'relative_3d_benchmark_required',
    lane: 'rgb_relative_3d_benchmark',
    nextEvidenceRequirement:
      'benchmark provider-neutral monocular RGB relative cheek prominence on the same governed captures before product admission',
    prohibitedShortcuts: [
      'visible_cheek_contour_to_3d_prominence',
      'mediapipe_z_to_ground_truth_depth',
      'skeletal_zygion_claim_from_rgb_relative_shape',
    ],
    canonicalMaterializationAllowedNow: false,
  }),
  entry({
    featureKey: 'chin_lower_face.relative_projection',
    fr282Readiness: 'relative_3d_benchmark_required',
    lane: 'rgb_relative_3d_benchmark',
    nextEvidenceRequirement:
      'benchmark provider-neutral monocular RGB relative lower-face projection on governed same-capture observations',
    prohibitedShortcuts: [
      'visible_lower_face_contour_to_3d_projection',
      'mediapipe_z_to_ground_truth_depth',
      'soft_tissue_projection_to_skeletal_chin_claim',
    ],
    canonicalMaterializationAllowedNow: false,
  }),
] as const);

export const FR294_HARD_GAP_COUNTS = Object.freeze({
  total: 11 as const,
  newImageModel: 5 as const,
  rgbRelative3DBenchmark: 4 as const,
  earVisibilityThenImageModel: 1 as const,
  remainUnavailable: 1 as const,
});

function fail(message: string): never {
  throw new FaceAuthorityValidationError(
    `FR-294 ${message}`,
  );
}

export function assertFR294HardGapFrontier(): void {
  assertFaceReadingRgbSelfieFeatureAuthorityMatrixFR282(
    FACE_READING_RGB_SELFIE_FEATURE_AUTHORITY_MATRIX_FR282,
  );
  assertFR293ProductColumnMap();

  const gaps = FR293_PRODUCT_COLUMN_MAP.filter(
    (candidate) =>
      candidate.implementationState !==
        'canonical_extractor_materialized',
  );
  const gapKeys = gaps.map((candidate) => candidate.featureKey);
  const ledgerKeys = FR294_HARD_GAP_FRONTIER.map(
    (candidate) => candidate.featureKey,
  );

  if (
    gaps.length !== FR294_HARD_GAP_COUNTS.total ||
    ledgerKeys.length !== FR294_HARD_GAP_COUNTS.total ||
    new Set(ledgerKeys).size !== ledgerKeys.length ||
    gapKeys.some((key) => !ledgerKeys.includes(key)) ||
    ledgerKeys.some((key) => !gapKeys.includes(key))
  ) {
    fail('ledger must equal the exact 11 non-materialized FR293 columns.');
  }

  const matrixByKey = new Map(
    FACE_READING_RGB_SELFIE_FEATURE_AUTHORITY_MATRIX_FR282
      .featureEntries
      .map((candidate) => [
        candidate.featureKey,
        candidate,
      ]),
  );

  for (const candidate of FR294_HARD_GAP_FRONTIER) {
    const authority = matrixByKey.get(candidate.featureKey);
    if (
      authority === undefined ||
      authority.readiness !== candidate.fr282Readiness ||
      candidate.canonicalMaterializationAllowedNow !== false ||
      candidate.nextEvidenceRequirement.trim().length === 0 ||
      candidate.prohibitedShortcuts.length === 0 ||
      new Set(candidate.prohibitedShortcuts).size !==
        candidate.prohibitedShortcuts.length
    ) {
      fail(
        `hard-gap authority drift: ${candidate.featureKey}.`,
      );
    }

    if (
      authority.readiness === 'reusable_now' ||
      authority.readiness === 'partial_gap'
    ) {
      fail(
        `FR293 must leave no reusable-now or partial-gap column unresolved: ${candidate.featureKey}.`,
      );
    }
  }

  const count = (lane: FR294HardGapLane) =>
    FR294_HARD_GAP_FRONTIER.filter(
      (candidate) => candidate.lane === lane,
    ).length;

  if (
    count('new_image_model') !==
      FR294_HARD_GAP_COUNTS.newImageModel ||
    count('rgb_relative_3d_benchmark') !==
      FR294_HARD_GAP_COUNTS.rgbRelative3DBenchmark ||
    count('ear_visibility_then_image_model') !==
      FR294_HARD_GAP_COUNTS.earVisibilityThenImageModel ||
    count('remain_unavailable') !==
      FR294_HARD_GAP_COUNTS.remainUnavailable
  ) {
    fail('hard-gap lane counts drift.');
  }

  if (
    FR293_PRODUCT_COLUMN_MAP.filter(
      (candidate) =>
        candidate.implementationState ===
          'canonical_extractor_materialized',
    ).length !== 18
  ) {
    fail('FR294 must not promote an FR293 product column.');
  }
}

assertFR294HardGapFrontier();
