import { describe, expect, it } from 'vitest';
import {
  assertCanonicalCheekLowerFaceFeaturesFR286,
  extractCanonicalRgbSelfieMorphologyFR286,
  materializeCanonicalCheekLowerFaceFeaturesFR286,
  type FR286ExistingSources,
} from './canonical-rgb-selfie-morphology-fr286.js';
import type {
  GovernedMetricGeometryCandidateFR77V1,
} from './governed-metric-geometry-runtime-fr77.js';
import type {
  PoseNormalizedLipsGeometryFR79V1,
} from './pose-normalized-lips-geometry-fr79.js';
import {
  FR286_PRODUCT_COLUMN_MAP,
  assertFR286ProductColumnMap,
} from './rgb-selfie-product-column-map-fr286.js';

const RUN = 'fr286:test-source';
const DIGEST = `sha256:${'c'.repeat(64)}`;

function source() {
  return {
    fr77ProviderRunRef: RUN,
    fr77CanonicalAssetDigest: DIGEST,
  };
}

function sources(
  available = true,
): FR286ExistingSources {
  return {
    midfaceWidth: available
      ? {
          schemaVersion: 'fr211-visible-midface-band-v1',
          status: 'available',
          metric: {
            metricRef:
              'neutral.midface.visible_width_to_face_width_ratio@0.1.0',
            unit: 'ratio',
            value: 0.73,
          },
          source: source(),
        } as FR286ExistingSources['midfaceWidth']
      : {
          schemaVersion: 'fr211-visible-midface-band-v1',
          status: 'unavailable',
          reason:
            'midface_band_contains_fewer_than_two_contour_points',
          fallbackInvented: false,
          source: source(),
        } as FR286ExistingSources['midfaceWidth'],
    cheekProminence: available
      ? {
          schemaVersion:
            'fr217-visible-cheek-contour-prominence-v1',
          status: 'available',
          metric: {
            metricRef:
              'neutral.cheek_midface.visible_side_contour_deviation_to_face_width.mean@0.1.0',
            unit: 'ratio',
            value: 0.08,
          },
          source: source(),
        } as FR286ExistingSources['cheekProminence']
      : {
          schemaVersion:
            'fr217-visible-cheek-contour-prominence-v1',
          status: 'unavailable',
          reason: 'face_width_collapsed',
          fallbackInvented: false,
          source: source(),
        } as FR286ExistingSources['cheekProminence'],
    lowerFaceWidth: available
      ? {
          schemaVersion: 'fr213-visible-lower-face-width-v1',
          status: 'available',
          metric: {
            metricRef:
              'neutral.lower_face.visible_width_to_face_width_ratio@0.1.0',
            unit: 'ratio',
            value: 0.62,
          },
          source: source(),
        } as FR286ExistingSources['lowerFaceWidth']
      : {
          schemaVersion: 'fr213-visible-lower-face-width-v1',
          status: 'unavailable',
          reason:
            'lower_face_contour_contains_fewer_than_two_points',
          fallbackInvented: false,
          source: source(),
        } as FR286ExistingSources['lowerFaceWidth'],
    lowerFaceContour: available
      ? {
          schemaVersion:
            'fr216-visible-lower-face-contour-v1',
          status: 'available',
          coordinateFrame:
            'canonical_aligned_right_handed_metric_xy',
          coordinateUnit: 'centimeter',
          points: [
            { x: -2, y: -1 },
            { x: 0, y: -2 },
            { x: 2, y: -1 },
          ],
          pointCount: 3,
          source: source(),
        } as FR286ExistingSources['lowerFaceContour']
      : {
          schemaVersion:
            'fr216-visible-lower-face-contour-v1',
          status: 'unavailable',
          reason:
            'lower_face_contour_contains_fewer_than_three_points',
          fallbackInvented: false,
          source: source(),
        } as FR286ExistingSources['lowerFaceContour'],
  };
}

describe('FR286 canonical RGB selfie cheek/lower-face cluster', () => {
  it('promotes exactly four existing-source FR282 columns on top of FR285', () => {
    expect(() => assertFR286ProductColumnMap()).not.toThrow();
    expect(FR286_PRODUCT_COLUMN_MAP).toHaveLength(29);
    expect(
      FR286_PRODUCT_COLUMN_MAP
        .filter((entry) =>
          entry.implementationState ===
            'canonical_extractor_materialized')
        .map((entry) => entry.featureKey),
    ).toEqual([
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
    ]);
  });

  it('materializes cheek/lower-face scalar geometry and an ephemeral provider-neutral contour', () => {
    const features =
      materializeCanonicalCheekLowerFaceFeaturesFR286(sources());
    expect(features).toHaveLength(7);
    expect(() =>
      assertCanonicalCheekLowerFaceFeaturesFR286(features))
      .not.toThrow();

    const contour = features.find((feature) =>
      feature.featureKey === 'chin_lower_face.visible_contour');
    expect(contour?.status).toBe('available');
    if (
      contour?.status === 'available' &&
      contour.value.kind === 'canonical_contour_2d'
    ) {
      expect(contour.value.pointCount).toBe(3);
      expect(contour.value.persistenceAllowed).toBe(false);
      expect(contour.value.points[1]).toEqual({ x: 0, y: -2 });
    }

    expect(features.find((feature) =>
      feature.featureKey === 'cheek_midface.relative_3d_prominence'))
      .toMatchObject({
        status: 'unavailable',
        reason: 'rgb_relative_3d_provider_not_materialized',
      });
    expect(features.find((feature) =>
      feature.featureKey ===
        'chin_lower_face.chin_height_width_center_deviation'))
      .toMatchObject({
        status: 'unavailable',
        reason: 'chin_dimension_extractor_not_materialized',
      });
  });

  it('propagates source unavailability without fabricating fallback geometry', () => {
    const features =
      materializeCanonicalCheekLowerFaceFeaturesFR286(
        sources(false),
      );
    expect(features.find((feature) =>
      feature.featureKey === 'cheek_midface.visible_width_ratio'))
      .toMatchObject({
        status: 'unavailable',
        reason: 'source_geometry_midface_width_unavailable',
        fallbackInvented: false,
      });
    expect(features.find((feature) =>
      feature.featureKey === 'chin_lower_face.visible_contour'))
      .toMatchObject({
        status: 'unavailable',
        reason: 'source_geometry_lower_face_contour_unavailable',
        fallbackInvented: false,
      });
  });

  it('rejects mixed provider-run sources at the product binding boundary', () => {
    const mixed = sources();
    const forged = {
      ...mixed,
      lowerFaceWidth: {
        ...mixed.lowerFaceWidth,
        source: {
          ...mixed.lowerFaceWidth.source,
          fr77ProviderRunRef: 'fr286:different-run',
        },
      },
    } as FR286ExistingSources;
    expect(() =>
      materializeCanonicalCheekLowerFaceFeaturesFR286(forged))
      .toThrow(/same governed provider run/u);
  });

  it('rejects forged FR77 geometry before the real production extractor can materialize a combined payload', () => {
    expect(() => extractCanonicalRgbSelfieMorphologyFR286(
      {} as GovernedMetricGeometryCandidateFR77V1,
      {} as PoseNormalizedLipsGeometryFR79V1,
    )).toThrow(/not issued/u);
  });
});
