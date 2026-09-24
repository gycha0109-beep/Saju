import {
  FACE_READING_RGB_SELFIE_FEATURE_AUTHORITY_MATRIX_FR282,
  assertFaceReadingRgbSelfieFeatureAuthorityMatrixFR282,
} from './rgb-selfie-feature-authority-matrix-fr282.js';
import {
  FR284_PRODUCT_COLUMN_MAP,
  assertFR284ProductColumnMap,
  type FR284ProductFeatureKey,
} from './rgb-selfie-product-column-map-fr284.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR285_COLUMN_MAP_CONTRACT_VERSION =
  'FR285-RGB-SELFIE-PRODUCT-COLUMN-MAP-v1' as const;

const MOUTH_MATERIALIZED = new Set<FR284ProductFeatureKey>([
  'mouth.width_and_relative_size',
  'mouth.corner_orientation',
  'mouth.outline_angularity',
]);

export const FR285_PRODUCT_COLUMN_MAP = Object.freeze(
  FR284_PRODUCT_COLUMN_MAP.map((entry) => {
    if (!MOUTH_MATERIALIZED.has(entry.featureKey as FR284ProductFeatureKey)) {
      return entry;
    }
    return Object.freeze({
      ...entry,
      implementationState: 'canonical_extractor_materialized' as const,
      requiredExtractor: 'canonical_mouth_morphology_fr285',
    });
  }),
);

export function assertFR285ProductColumnMap(): void {
  assertFaceReadingRgbSelfieFeatureAuthorityMatrixFR282(
    FACE_READING_RGB_SELFIE_FEATURE_AUTHORITY_MATRIX_FR282,
  );
  assertFR284ProductColumnMap();

  const matrix =
    FACE_READING_RGB_SELFIE_FEATURE_AUTHORITY_MATRIX_FR282.featureEntries;
  if (
    FR285_PRODUCT_COLUMN_MAP.length !== 29 ||
    FR285_PRODUCT_COLUMN_MAP.length !== matrix.length
  ) {
    throw new FaceAuthorityValidationError(
      'FR-285 product column map cardinality drift.',
    );
  }

  const keys = FR285_PRODUCT_COLUMN_MAP.map((entry) => entry.featureKey);
  if (new Set(keys).size !== keys.length) {
    throw new FaceAuthorityValidationError(
      'FR-285 product column map contains duplicate feature keys.',
    );
  }
  for (const entry of matrix) {
    if (!keys.includes(entry.featureKey as FR284ProductFeatureKey)) {
      throw new FaceAuthorityValidationError(
        `FR-285 missing FR282 feature column: ${entry.featureKey}.`,
      );
    }
  }

  const materialized = FR285_PRODUCT_COLUMN_MAP
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
  ] as const;

  if (
    materialized.length !== expected.length ||
    expected.some((key) => !materialized.includes(key))
  ) {
    throw new FaceAuthorityValidationError(
      'FR-285 materialized feature set must be the FR284 eye cluster plus the three governed mouth geometry columns.',
    );
  }
}
