import {
  FACE_READING_RGB_SELFIE_FEATURE_AUTHORITY_MATRIX_FR282,
  assertFaceReadingRgbSelfieFeatureAuthorityMatrixFR282,
} from './rgb-selfie-feature-authority-matrix-fr282.js';
import {
  FR291_PRODUCT_COLUMN_MAP,
  assertFR291ProductColumnMap,
} from './rgb-selfie-product-column-map-fr291.js';
import type {
  FR284ProductFeatureKey,
} from './rgb-selfie-product-column-map-fr284.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR292_COLUMN_MAP_CONTRACT_VERSION =
  'FR292-RGB-SELFIE-PRODUCT-COLUMN-MAP-v1' as const;

const TARGET =
  'eyebrow.span_arch_tail_orientation' as const;

export const FR292_PRODUCT_COLUMN_MAP = Object.freeze(
  FR291_PRODUCT_COLUMN_MAP.map((entry) => {
    if (entry.featureKey !== TARGET) return entry;
    return Object.freeze({
      ...entry,
      implementationState:
        'canonical_extractor_materialized' as const,
      sourcePrimitives: Object.freeze([
        'packages/face-reading/src/visible-eyebrow-pair-geometry-fr292.ts',
        'packages/face-reading/src/cross-face-neutral-observable-primitives-fr208.ts',
      ]),
      requiredExtractor:
        'visible_eyebrow_pair_geometry_fr292',
    });
  }),
);

export function assertFR292ProductColumnMap(): void {
  assertFaceReadingRgbSelfieFeatureAuthorityMatrixFR282(
    FACE_READING_RGB_SELFIE_FEATURE_AUTHORITY_MATRIX_FR282,
  );
  assertFR291ProductColumnMap();

  const matrix =
    FACE_READING_RGB_SELFIE_FEATURE_AUTHORITY_MATRIX_FR282
      .featureEntries;

  if (
    FR292_PRODUCT_COLUMN_MAP.length !== 29 ||
    FR292_PRODUCT_COLUMN_MAP.length !== matrix.length
  ) {
    throw new FaceAuthorityValidationError(
      'FR-292 product column map cardinality drift.',
    );
  }

  const keys = FR292_PRODUCT_COLUMN_MAP.map(
    (entry) => entry.featureKey,
  );
  if (new Set(keys).size !== keys.length) {
    throw new FaceAuthorityValidationError(
      'FR-292 product column map contains duplicate feature keys.',
    );
  }

  for (const entry of matrix) {
    if (!keys.includes(entry.featureKey as FR284ProductFeatureKey)) {
      throw new FaceAuthorityValidationError(
        `FR-292 missing FR282 feature column: ${entry.featureKey}.`,
      );
    }
  }

  const materialized = FR292_PRODUCT_COLUMN_MAP
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
    TARGET,
  ] as const;

  if (
    materialized.length !== expected.length ||
    expected.some((key) => !materialized.includes(key))
  ) {
    throw new FaceAuthorityValidationError(
      'FR-292 materialized feature set must equal FR291 plus visible eyebrow-pair geometry.',
    );
  }

  const target = FR292_PRODUCT_COLUMN_MAP.find(
    (entry) => entry.featureKey === TARGET,
  );
  if (
    target?.implementationState !==
      'canonical_extractor_materialized' ||
    target.requiredExtractor !==
      'visible_eyebrow_pair_geometry_fr292'
  ) {
    throw new FaceAuthorityValidationError(
      'FR-292 target extractor binding drift.',
    );
  }
}
