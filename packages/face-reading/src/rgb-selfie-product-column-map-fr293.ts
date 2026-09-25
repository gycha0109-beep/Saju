import {
  FACE_READING_RGB_SELFIE_FEATURE_AUTHORITY_MATRIX_FR282,
  assertFaceReadingRgbSelfieFeatureAuthorityMatrixFR282,
} from './rgb-selfie-feature-authority-matrix-fr282.js';
import {
  FR292_PRODUCT_COLUMN_MAP,
  assertFR292ProductColumnMap,
} from './rgb-selfie-product-column-map-fr292.js';
import type {
  FR284ProductFeatureKey,
} from './rgb-selfie-product-column-map-fr284.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR293_COLUMN_MAP_CONTRACT_VERSION =
  'FR293-RGB-SELFIE-PRODUCT-COLUMN-MAP-v1' as const;

const TARGET = 'mouth.visible_lip_fullness' as const;

export const FR293_PRODUCT_COLUMN_MAP = Object.freeze(
  FR292_PRODUCT_COLUMN_MAP.map((entry) => {
    if (entry.featureKey !== TARGET) return entry;
    return Object.freeze({
      ...entry,
      implementationState:
        'canonical_extractor_materialized' as const,
      sourcePrimitives: Object.freeze([
        'packages/face-reading/src/visible-lip-band-fullness-fr293.ts',
        'packages/face-reading/src/visible-philtrum-geometry-fr291.ts',
        'packages/face-reading/src/face-reading-observable-morphology-measurement-boundary-fr206.ts',
      ]),
      requiredExtractor:
        'visible_lip_band_fullness_fr293',
    });
  }),
);

export function assertFR293ProductColumnMap(): void {
  assertFaceReadingRgbSelfieFeatureAuthorityMatrixFR282(
    FACE_READING_RGB_SELFIE_FEATURE_AUTHORITY_MATRIX_FR282,
  );
  assertFR292ProductColumnMap();

  const matrix =
    FACE_READING_RGB_SELFIE_FEATURE_AUTHORITY_MATRIX_FR282
      .featureEntries;

  if (
    FR293_PRODUCT_COLUMN_MAP.length !== 29 ||
    FR293_PRODUCT_COLUMN_MAP.length !== matrix.length
  ) {
    throw new FaceAuthorityValidationError(
      'FR-293 product column map cardinality drift.',
    );
  }

  const keys = FR293_PRODUCT_COLUMN_MAP.map(
    (entry) => entry.featureKey,
  );
  if (new Set(keys).size !== keys.length) {
    throw new FaceAuthorityValidationError(
      'FR-293 product column map contains duplicate feature keys.',
    );
  }

  for (const entry of matrix) {
    if (!keys.includes(entry.featureKey as FR284ProductFeatureKey)) {
      throw new FaceAuthorityValidationError(
        `FR-293 missing FR282 feature column: ${entry.featureKey}.`,
      );
    }
  }

  const materialized = FR293_PRODUCT_COLUMN_MAP
    .filter((entry) =>
      entry.implementationState ===
        'canonical_extractor_materialized')
    .map((entry) => entry.featureKey);

  const expected = [
    'eye.width_height_ratio',
    'eye.inter_eye_spacing_ratio',
    'eye.outer_corner_tilt',
    'eye.bilateral_shape_asymmetry',
    'mouth.width_and_relative_size',
    'mouth.corner_orientation',
    'mouth.outline_angularity',
    'cheek_midface.visible_width_ratio',
    'cheek_midface.visible_contour_prominence',
    'chin_lower_face.visible_width_ratio',
    'chin_lower_face.visible_contour',
    'nose.bridge_centerline_deviation',
    'nose.tip_contour_circularity',
    'chin_lower_face.chin_height_width_center_deviation',
    'nose.alar_width_and_nostril_geometry',
    'mouth.philtrum_length_width',
    'eyebrow.span_arch_tail_orientation',
    TARGET,
  ] as const;

  if (
    materialized.length !== expected.length ||
    expected.some((key) => !materialized.includes(key))
  ) {
    throw new FaceAuthorityValidationError(
      'FR-293 materialized feature set must equal FR292 plus visible lip-band fullness geometry.',
    );
  }

  const target = FR293_PRODUCT_COLUMN_MAP.find(
    (entry) => entry.featureKey === TARGET,
  );
  if (
    target?.implementationState !==
      'canonical_extractor_materialized' ||
    target.requiredExtractor !==
      'visible_lip_band_fullness_fr293'
  ) {
    throw new FaceAuthorityValidationError(
      'FR-293 target extractor binding drift.',
    );
  }
}
