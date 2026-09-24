import { describe, expect, it } from 'vitest';
import {
  FACE_READING_RGB_SELFIE_FEATURE_AUTHORITY_MATRIX_FR282,
  assertFaceReadingRgbSelfieFeatureAuthorityMatrixFR282,
} from './rgb-selfie-feature-authority-matrix-fr282.js';

describe('FR282 ordinary-smartphone RGB selfie feature authority matrix', () => {
  it('freezes the 25-30 cm ordinary RGB selfie boundary without special depth hardware', () => {
    const matrix = FACE_READING_RGB_SELFIE_FEATURE_AUTHORITY_MATRIX_FR282;
    expect(matrix.productCaptureBoundary.distanceCm).toEqual([25, 30]);
    expect(matrix.productCaptureBoundary.cameraClass).toBe('ordinary_smartphone_rgb_front_camera');
    expect(matrix.productCaptureBoundary.arcoreRequired).toBe(false);
    expect(matrix.productCaptureBoundary.truedepthRequired).toBe(false);
    expect(matrix.productCaptureBoundary.tofRequired).toBe(false);
    expect(matrix.productCaptureBoundary.externalDepthSensorRequired).toBe(false);
  });

  it('keeps all feature authority on observable RGB morphology and never invents metric-3D necessity', () => {
    const matrix = FACE_READING_RGB_SELFIE_FEATURE_AUTHORITY_MATRIX_FR282;
    expect(matrix.featureEntries.every((entry) => entry.specialDepthHardwareRequired === false)).toBe(true);
    expect(matrix.featureEntries.every((entry) => entry.metric3DRequired === false)).toBe(true);
    expect(matrix.featureEntries.every((entry) => entry.traditionalBindingIssued === false)).toBe(true);
    expect(matrix.authorityBoundary.physicalMillimeterDepthPresumedNecessary).toBe(false);
    expect(matrix.authorityBoundary.rgb3dModelMayBeCalledGroundTruth).toBe(false);
  });

  it('covers all eight whole-face regions and points next to a same-RGB-input provider benchmark', () => {
    const matrix = FACE_READING_RGB_SELFIE_FEATURE_AUTHORITY_MATRIX_FR282;
    expect(new Set(matrix.featureEntries.map((entry) => entry.regionKey))).toEqual(
      new Set([
        'forehead',
        'eyebrow',
        'eye_pair',
        'nose',
        'mouth_lips',
        'ear',
        'cheek_mid_face',
        'chin_lower_face',
      ]),
    );
    expect(matrix.nextFrontier).toBe(
      'benchmark_same_rgb_selfie_across_landmark_segmentation_and_relative_3d_providers',
    );
    expect(() => assertFaceReadingRgbSelfieFeatureAuthorityMatrixFR282(matrix)).not.toThrow();
  });

  it('preserves unavailable/visibility-dependent paths instead of fabricating ear geometry', () => {
    const matrix = FACE_READING_RGB_SELFIE_FEATURE_AUTHORITY_MATRIX_FR282;
    expect(matrix.featureEntries.find((entry) => entry.featureKey === 'ear.visible_boundary_height_shape'))
      .toMatchObject({
        observationClass: 'visibility_dependent',
        readiness: 'visibility_gate_required',
      });
    expect(matrix.featureEntries.find((entry) => entry.featureKey === 'ear.thickness_attachment_canal_boundary'))
      .toMatchObject({
        observationClass: 'unavailable',
        readiness: 'unavailable',
      });
  });
});
