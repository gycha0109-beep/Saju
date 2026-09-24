import {
  FACE_READING_RGB_SELFIE_FEATURE_AUTHORITY_MATRIX_FR282,
  assertFaceReadingRgbSelfieFeatureAuthorityMatrixFR282,
} from './rgb-selfie-feature-authority-matrix-fr282.js';
import {
  FR286_PRODUCT_COLUMN_MAP,
  assertFR286ProductColumnMap,
} from './rgb-selfie-product-column-map-fr286.js';
import type {
  FR284ProductFeatureKey,
} from './rgb-selfie-product-column-map-fr284.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR287_COLUMN_MAP_CONTRACT_VERSION =
  'FR287-RGB-SELFIE-PRODUCT-COLUMN-MAP-v1' as const;

const MATERIALIZED = new Set<FR284ProductFeatureKey>([
  'nose.bridge_centerline_deviation',
  'nose.tip_contour_circularity',
]);

export const FR287_PRODUCT_COLUMN_MAP = Object.freeze(
  FR286_PRODUCT_COLUMN_MAP.map((entry) => {
    if (!MATERIALIZED.has(entry.featureKey as FR284ProductFeatureKey)) {
      return entry;
    }
    return Object.freeze({
      ...entry,
      implementationState: 'canonical_extractor_materialized' as const,
      requiredExtractor: 'canonical_nose_morphology_fr287',
    });
  }),
);

export function assertFR287ProductColumnMap(): void {
  assertFaceReadingRgbSelfieFeatureAuthorityMatrixFR282(
    FACE_READING_RGB_SELFIE_FEATURE_AUTHORITY_MATRIX_FR282,
  );
  assertFR286ProductColumnMap();

  const matrix =
    FACE_READING_RGB_SELFIE_FEATURE_AUTHORITY_MATRIX_FR282.featureEntries;
  if (
    FR287_PRODUCT_COLUMN_MAP.length !== 29 ||
    FR287_PRODUCT_COLUMN_MAP.length !== matrix.length
  ) {
    throw new FaceAuthorityValidationError(
      'FR-287 product column map cardinality drift.',
    );
  }

  const keys = FR287_PRODUCT_COLUMN_MAP.map((entry) => entry.featureKey);
  if (new Set(keys).size !== keys.length) {
    throw new FaceAuthorityValidationError(
      'FR-287 product column map contains duplicate feature keys.',
    );
  }
  for (const entry of matrix) {
    if (!keys.includes(entry.featureKey as FR284ProductFeatureKey)) {
      throw new FaceAuthorityValidationError(
        `FR-287 missing FR282 feature column: ${entry.featureKey}.`,
      );
    }
  }

  const materialized = FR287_PRODUCT_COLUMN_MAP
    .filter((entry) =>
      entry.implementationState === 'canonical_extractor_materialized')
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
  ] as const;

  if (
    materialized.length !== expected.length ||
    expected.some((key) => !materialized.includes(key))
  ) {
    throw new FaceAuthorityValidationError(
      'FR-287 materialized feature set must equal the FR286 set plus the two FR282 reusable nose columns.',
    );
  }
}
