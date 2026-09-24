import {
  FACE_READING_RGB_SELFIE_FEATURE_AUTHORITY_MATRIX_FR282,
  assertFaceReadingRgbSelfieFeatureAuthorityMatrixFR282,
  type FR282RegionKey,
} from './rgb-selfie-feature-authority-matrix-fr282.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR284_COLUMN_MAP_CONTRACT_VERSION =
  'FR284-RGB-SELFIE-PRODUCT-COLUMN-MAP-v1' as const;

export type FR284ColumnImplementationState =
  | 'canonical_extractor_materialized'
  | 'source_extractor_exists_binding_missing'
  | 'extractor_required'
  | 'deferred_unavailable';

export type FR284CanonicalOutputType =
  | 'scalar_ratio'
  | 'scalar_degree'
  | 'composite_continuous_axes'
  | 'composite_geometry'
  | 'contour_geometry'
  | 'segmentation_geometry'
  | 'relative_3d_shape'
  | 'appearance_descriptor'
  | 'categorical_observation'
  | 'visibility_descriptor'
  | 'unavailable';

export type FR284QualityDependency =
  | 'canonical_metric_geometry'
  | 'canonical_metric_geometry_and_fr283_viewpoint_context'
  | 'governed_contour_geometry'
  | 'segmentation_and_visibility'
  | 'appearance_image_quality'
  | 'rgb_relative_3d_provider_validation'
  | 'visibility_gate'
  | 'currently_unavailable';

export interface FR284ProductColumnMapEntry {
  readonly featureKey: string;
  readonly regionKey: FR282RegionKey;
  readonly implementationState: FR284ColumnImplementationState;
  readonly sourcePrimitives: readonly string[];
  readonly requiredExtractor: string;
  readonly outputType: FR284CanonicalOutputType;
  readonly qualityDependency: FR284QualityDependency;
}

export const FR284_PRODUCT_COLUMN_MAP = Object.freeze([
  {
    featureKey: 'forehead.visible_width_shape',
    regionKey: 'forehead',
    implementationState: 'extractor_required',
    sourcePrimitives: Object.freeze([
      'packages/face-reading/src/face-reading-whole-face-minimum-measurement-inventory-fr207.ts',
    ]),
    requiredExtractor: 'visible_forehead_segmentation_geometry',
    outputType: 'segmentation_geometry',
    qualityDependency: 'segmentation_and_visibility',
  },
  {
    featureKey: 'forehead.visible_hairline_boundary',
    regionKey: 'forehead',
    implementationState: 'extractor_required',
    sourcePrimitives: Object.freeze([
      'packages/face-reading/src/face-reading-whole-face-minimum-measurement-inventory-fr207.ts',
    ]),
    requiredExtractor: 'visible_hairline_boundary_segmentation',
    outputType: 'contour_geometry',
    qualityDependency: 'segmentation_and_visibility',
  },
  {
    featureKey: 'forehead.relative_surface_curvature',
    regionKey: 'forehead',
    implementationState: 'extractor_required',
    sourcePrimitives: Object.freeze([]),
    requiredExtractor: 'provider_neutral_rgb_relative_3d_forehead_shape',
    outputType: 'relative_3d_shape',
    qualityDependency: 'rgb_relative_3d_provider_validation',
  },
  {
    featureKey: 'eyebrow.span_arch_tail_orientation',
    regionKey: 'eyebrow',
    implementationState: 'source_extractor_exists_binding_missing',
    sourcePrimitives: Object.freeze([
      'packages/face-reading/src/cross-face-neutral-observable-primitives-fr208.ts',
      'packages/face-reading/src/mediapipe-published-eyebrow-component-decomposition-fr39.ts',
    ]),
    requiredExtractor: 'canonical_eyebrow_geometry_binding',
    outputType: 'composite_continuous_axes',
    qualityDependency: 'canonical_metric_geometry',
  },
  {
    featureKey: 'eyebrow.visible_hair_density_texture',
    regionKey: 'eyebrow',
    implementationState: 'extractor_required',
    sourcePrimitives: Object.freeze([
      'packages/face-reading/src/face-reading-whole-face-minimum-measurement-inventory-fr207.ts',
    ]),
    requiredExtractor: 'visible_eyebrow_hair_appearance_model',
    outputType: 'appearance_descriptor',
    qualityDependency: 'appearance_image_quality',
  },
  {
    featureKey: 'eye.width_height_ratio',
    regionKey: 'eye_pair',
    implementationState: 'canonical_extractor_materialized',
    sourcePrimitives: Object.freeze([
      'packages/face-reading/src/eye-neutral-axis-bundle-fr210.ts',
      'packages/face-reading/src/eye-pair-geometric-y-span-runtime-fr178.ts',
    ]),
    requiredExtractor: 'canonical_eye_pair_morphology_fr284',
    outputType: 'scalar_ratio',
    qualityDependency: 'canonical_metric_geometry',
  },
  {
    featureKey: 'eye.inter_eye_spacing_ratio',
    regionKey: 'eye_pair',
    implementationState: 'canonical_extractor_materialized',
    sourcePrimitives: Object.freeze([
      'packages/face-reading/src/eye-neutral-axis-bundle-fr210.ts',
    ]),
    requiredExtractor: 'canonical_eye_pair_morphology_fr284',
    outputType: 'scalar_ratio',
    qualityDependency: 'canonical_metric_geometry',
  },
  {
    featureKey: 'eye.outer_corner_tilt',
    regionKey: 'eye_pair',
    implementationState: 'canonical_extractor_materialized',
    sourcePrimitives: Object.freeze([
      'packages/face-reading/src/cross-face-neutral-observable-primitives-fr208.ts',
      'packages/face-reading/src/eye-neutral-axis-bundle-fr210.ts',
      'packages/face-reading/src/observable-morphology-fr76-eye-chord-propagation-fr283.ts',
    ]),
    requiredExtractor: 'canonical_eye_pair_morphology_fr284',
    outputType: 'scalar_degree',
    qualityDependency: 'canonical_metric_geometry_and_fr283_viewpoint_context',
  },
  {
    featureKey: 'eye.bilateral_shape_asymmetry',
    regionKey: 'eye_pair',
    implementationState: 'canonical_extractor_materialized',
    sourcePrimitives: Object.freeze([
      'packages/face-reading/src/eye-asymmetry-surface-fr215.ts',
    ]),
    requiredExtractor: 'canonical_eye_pair_morphology_fr284',
    outputType: 'composite_continuous_axes',
    qualityDependency: 'canonical_metric_geometry',
  },
  {
    featureKey: 'eye.eyelid_crease_or_hooded_category',
    regionKey: 'eye_pair',
    implementationState: 'extractor_required',
    sourcePrimitives: Object.freeze([
      'packages/face-reading/src/face-reading-observable-morphology-measurement-boundary-fr206.ts',
    ]),
    requiredExtractor: 'eyelid_visible_appearance_model',
    outputType: 'categorical_observation',
    qualityDependency: 'appearance_image_quality',
  },
  {
    featureKey: 'nose.bridge_centerline_deviation',
    regionKey: 'nose',
    implementationState: 'source_extractor_exists_binding_missing',
    sourcePrimitives: Object.freeze([
      'packages/face-reading/src/nose-geometry.ts',
    ]),
    requiredExtractor: 'canonical_nose_geometry_binding',
    outputType: 'scalar_ratio',
    qualityDependency: 'governed_contour_geometry',
  },
  {
    featureKey: 'nose.tip_contour_circularity',
    regionKey: 'nose',
    implementationState: 'source_extractor_exists_binding_missing',
    sourcePrimitives: Object.freeze([
      'packages/face-reading/src/nose-geometry.ts',
    ]),
    requiredExtractor: 'canonical_nose_geometry_binding',
    outputType: 'scalar_ratio',
    qualityDependency: 'governed_contour_geometry',
  },
  {
    featureKey: 'nose.alar_width_and_nostril_geometry',
    regionKey: 'nose',
    implementationState: 'extractor_required',
    sourcePrimitives: Object.freeze([
      'packages/face-reading/src/face-reading-whole-face-minimum-measurement-inventory-fr207.ts',
    ]),
    requiredExtractor: 'visible_alar_and_nostril_contour_geometry',
    outputType: 'composite_geometry',
    qualityDependency: 'segmentation_and_visibility',
  },
  {
    featureKey: 'nose.tip_bridge_relative_projection',
    regionKey: 'nose',
    implementationState: 'extractor_required',
    sourcePrimitives: Object.freeze([
      'packages/face-reading/src/nasal-apex-geometry-candidate-study-fr267.ts',
      'packages/face-reading/src/nasal-apex-empirical-bundle-fr268.ts',
    ]),
    requiredExtractor: 'provider_neutral_rgb_relative_3d_nose_projection',
    outputType: 'relative_3d_shape',
    qualityDependency: 'rgb_relative_3d_provider_validation',
  },
  {
    featureKey: 'mouth.width_and_relative_size',
    regionKey: 'mouth_lips',
    implementationState: 'source_extractor_exists_binding_missing',
    sourcePrimitives: Object.freeze([
      'packages/face-reading/src/neutral-mouth-contour-metric-fr80.ts',
      'packages/face-reading/src/neutral-mouth-relative-size-metric-fr82.ts',
    ]),
    requiredExtractor: 'canonical_mouth_geometry_binding',
    outputType: 'composite_continuous_axes',
    qualityDependency: 'governed_contour_geometry',
  },
  {
    featureKey: 'mouth.corner_orientation',
    regionKey: 'mouth_lips',
    implementationState: 'source_extractor_exists_binding_missing',
    sourcePrimitives: Object.freeze([
      'packages/face-reading/src/visible-mouth-corner-orientation-fr212.ts',
    ]),
    requiredExtractor: 'canonical_mouth_geometry_binding',
    outputType: 'scalar_ratio',
    qualityDependency: 'governed_contour_geometry',
  },
  {
    featureKey: 'mouth.outline_angularity',
    regionKey: 'mouth_lips',
    implementationState: 'source_extractor_exists_binding_missing',
    sourcePrimitives: Object.freeze([
      'packages/face-reading/src/role-free-mouth-outline-angularity-fr214.ts',
    ]),
    requiredExtractor: 'canonical_mouth_geometry_binding',
    outputType: 'scalar_degree',
    qualityDependency: 'governed_contour_geometry',
  },
  {
    featureKey: 'mouth.visible_lip_fullness',
    regionKey: 'mouth_lips',
    implementationState: 'extractor_required',
    sourcePrimitives: Object.freeze([
      'packages/face-reading/src/face-reading-whole-face-minimum-measurement-inventory-fr207.ts',
    ]),
    requiredExtractor: 'governed_visible_upper_lower_lip_fullness_geometry',
    outputType: 'composite_geometry',
    qualityDependency: 'governed_contour_geometry',
  },
  {
    featureKey: 'mouth.philtrum_length_width',
    regionKey: 'mouth_lips',
    implementationState: 'extractor_required',
    sourcePrimitives: Object.freeze([]),
    requiredExtractor: 'canonical_visible_philtrum_geometry',
    outputType: 'composite_continuous_axes',
    qualityDependency: 'segmentation_and_visibility',
  },
  {
    featureKey: 'mouth.visible_lip_color',
    regionKey: 'mouth_lips',
    implementationState: 'extractor_required',
    sourcePrimitives: Object.freeze([
      'packages/face-reading/src/face-reading-whole-face-minimum-measurement-inventory-fr207.ts',
    ]),
    requiredExtractor: 'controlled_visible_lip_color_observation',
    outputType: 'appearance_descriptor',
    qualityDependency: 'appearance_image_quality',
  },
  {
    featureKey: 'ear.visible_boundary_height_shape',
    regionKey: 'ear',
    implementationState: 'extractor_required',
    sourcePrimitives: Object.freeze([
      'packages/face-reading/src/face-reading-product-capture-view-contract-fr191.ts',
      'packages/face-geometry/README.md',
    ]),
    requiredExtractor: 'visible_ear_admission_and_shape_model',
    outputType: 'visibility_descriptor',
    qualityDependency: 'visibility_gate',
  },
  {
    featureKey: 'ear.thickness_attachment_canal_boundary',
    regionKey: 'ear',
    implementationState: 'deferred_unavailable',
    sourcePrimitives: Object.freeze([
      'packages/face-reading/src/face-reading-whole-face-minimum-measurement-inventory-fr207.ts',
    ]),
    requiredExtractor: 'none_current_rgb_selfie_authority_unavailable',
    outputType: 'unavailable',
    qualityDependency: 'currently_unavailable',
  },
  {
    featureKey: 'cheek_midface.visible_width_ratio',
    regionKey: 'cheek_mid_face',
    implementationState: 'source_extractor_exists_binding_missing',
    sourcePrimitives: Object.freeze([
      'packages/face-reading/src/visible-midface-band-fr211.ts',
    ]),
    requiredExtractor: 'canonical_midface_geometry_binding',
    outputType: 'scalar_ratio',
    qualityDependency: 'canonical_metric_geometry',
  },
  {
    featureKey: 'cheek_midface.visible_contour_prominence',
    regionKey: 'cheek_mid_face',
    implementationState: 'source_extractor_exists_binding_missing',
    sourcePrimitives: Object.freeze([
      'packages/face-reading/src/visible-cheek-contour-prominence-fr217.ts',
    ]),
    requiredExtractor: 'canonical_midface_geometry_binding',
    outputType: 'scalar_ratio',
    qualityDependency: 'canonical_metric_geometry',
  },
  {
    featureKey: 'cheek_midface.relative_3d_prominence',
    regionKey: 'cheek_mid_face',
    implementationState: 'extractor_required',
    sourcePrimitives: Object.freeze([]),
    requiredExtractor: 'provider_neutral_rgb_relative_3d_cheek_prominence',
    outputType: 'relative_3d_shape',
    qualityDependency: 'rgb_relative_3d_provider_validation',
  },
  {
    featureKey: 'chin_lower_face.visible_width_ratio',
    regionKey: 'chin_lower_face',
    implementationState: 'source_extractor_exists_binding_missing',
    sourcePrimitives: Object.freeze([
      'packages/face-reading/src/visible-lower-face-width-fr213.ts',
    ]),
    requiredExtractor: 'canonical_lower_face_geometry_binding',
    outputType: 'scalar_ratio',
    qualityDependency: 'canonical_metric_geometry',
  },
  {
    featureKey: 'chin_lower_face.visible_contour',
    regionKey: 'chin_lower_face',
    implementationState: 'source_extractor_exists_binding_missing',
    sourcePrimitives: Object.freeze([
      'packages/face-reading/src/canonical-visible-lower-face-contour-fr216.ts',
    ]),
    requiredExtractor: 'canonical_lower_face_geometry_binding',
    outputType: 'contour_geometry',
    qualityDependency: 'governed_contour_geometry',
  },
  {
    featureKey: 'chin_lower_face.chin_height_width_center_deviation',
    regionKey: 'chin_lower_face',
    implementationState: 'extractor_required',
    sourcePrimitives: Object.freeze([
      'packages/face-reading/src/canonical-visible-lower-face-contour-fr216.ts',
      'packages/face-reading/src/central-chin-reference-trace-protocol-fr54.ts',
    ]),
    requiredExtractor: 'canonical_chin_dimension_and_centering_geometry',
    outputType: 'composite_continuous_axes',
    qualityDependency: 'governed_contour_geometry',
  },
  {
    featureKey: 'chin_lower_face.relative_projection',
    regionKey: 'chin_lower_face',
    implementationState: 'extractor_required',
    sourcePrimitives: Object.freeze([]),
    requiredExtractor: 'provider_neutral_rgb_relative_3d_chin_projection',
    outputType: 'relative_3d_shape',
    qualityDependency: 'rgb_relative_3d_provider_validation',
  },
] as const);

export type FR284ProductFeatureKey =
  (typeof FR284_PRODUCT_COLUMN_MAP)[number]['featureKey'];

export function assertFR284ProductColumnMap(): void {
  assertFaceReadingRgbSelfieFeatureAuthorityMatrixFR282(
    FACE_READING_RGB_SELFIE_FEATURE_AUTHORITY_MATRIX_FR282,
  );

  const matrixEntries =
    FACE_READING_RGB_SELFIE_FEATURE_AUTHORITY_MATRIX_FR282.featureEntries;
  if (FR284_PRODUCT_COLUMN_MAP.length !== matrixEntries.length) {
    throw new FaceAuthorityValidationError(
      'FR-284 product column map cardinality does not match FR282.',
    );
  }

  const mapKeys = new Set(FR284_PRODUCT_COLUMN_MAP.map((entry) => entry.featureKey));
  if (mapKeys.size !== FR284_PRODUCT_COLUMN_MAP.length) {
    throw new FaceAuthorityValidationError(
      'FR-284 product column map contains duplicate feature keys.',
    );
  }

  for (const matrixEntry of matrixEntries) {
    const mapped = FR284_PRODUCT_COLUMN_MAP.find(
      (entry) => entry.featureKey === matrixEntry.featureKey,
    );
    if (mapped === undefined) {
      throw new FaceAuthorityValidationError(
        `FR-284 missing FR282 feature column: ${matrixEntry.featureKey}.`,
      );
    }
    if (mapped.regionKey !== matrixEntry.regionKey) {
      throw new FaceAuthorityValidationError(
        `FR-284 region mismatch for ${matrixEntry.featureKey}.`,
      );
    }
    if (
      mapped.implementationState === 'canonical_extractor_materialized' &&
      matrixEntry.readiness !== 'reusable_now'
    ) {
      throw new FaceAuthorityValidationError(
        `FR-284 materialized non-reusable FR282 feature: ${matrixEntry.featureKey}.`,
      );
    }
    if (
      mapped.implementationState === 'deferred_unavailable' &&
      matrixEntry.readiness !== 'unavailable'
    ) {
      throw new FaceAuthorityValidationError(
        `FR-284 deferred an FR282 feature that is not unavailable: ${matrixEntry.featureKey}.`,
      );
    }
  }

  const materialized = FR284_PRODUCT_COLUMN_MAP
    .filter((entry) => entry.implementationState === 'canonical_extractor_materialized')
    .map((entry) => entry.featureKey);
  const expectedMaterialized = [
    'eye.width_height_ratio',
    'eye.inter_eye_spacing_ratio',
    'eye.outer_corner_tilt',
    'eye.bilateral_shape_asymmetry',
  ] as const;
  if (
    materialized.length !== expectedMaterialized.length ||
    expectedMaterialized.some((key) => !materialized.includes(key))
  ) {
    throw new FaceAuthorityValidationError(
      'FR-284 first materialized cluster must remain the four FR282 reusable eye geometry features.',
    );
  }
}

export function getFR284ProductColumn(
  featureKey: FR284ProductFeatureKey,
): (typeof FR284_PRODUCT_COLUMN_MAP)[number] {
  const entry = FR284_PRODUCT_COLUMN_MAP.find(
    (candidate) => candidate.featureKey === featureKey,
  );
  if (entry === undefined) {
    throw new FaceAuthorityValidationError(
      `FR-284 unknown product feature key: ${featureKey}.`,
    );
  }
  return entry;
}
