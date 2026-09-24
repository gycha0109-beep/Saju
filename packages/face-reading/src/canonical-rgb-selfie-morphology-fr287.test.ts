import { describe, expect, it } from 'vitest';
import {
  assertCanonicalNoseFeaturesFR287,
  extractCanonicalRgbSelfieMorphologyFR287,
  materializeCanonicalNoseFeaturesFR287,
  type FR287GovernedNeutralNoseGeometryInput,
} from './canonical-rgb-selfie-morphology-fr287.js';
import type {
  GovernedMetricGeometryCandidateFR77V1,
} from './governed-metric-geometry-runtime-fr77.js';
import type {
  PoseNormalizedLipsGeometryFR79V1,
} from './pose-normalized-lips-geometry-fr79.js';
import {
  FR287_PRODUCT_COLUMN_MAP,
  assertFR287ProductColumnMap,
} from './rgb-selfie-product-column-map-fr287.js';

function provenance(refs: readonly string[]) {
  return {
    observationContractVersion: 'fr287-test-neutral-nose-v1',
    extractorVersion: 'fr287-test-extractor-v1',
    modelVersion: 'fr287-test-model-v1',
    coordinateFrame: 'pose_normalized_face_2d' as const,
    poseCompensated: true,
    sourceLandmarkRefs: refs,
  };
}

function input(): FR287GovernedNeutralNoseGeometryInput {
  return {
    schemaVersion:
      'fr287-governed-neutral-nose-geometry-input-v1',
    authorityState:
      'governed_neutral_nose_geometry_input_only',
    sameCaptureVerified: true,
    providerSpecificIndicesExposed: false,
    rawLandmarksExposed: false,
    traditionalBindingApplied: false,
    bridge: {
      provenance: provenance([
        'neutral:nose_bridge:start',
        'neutral:nose_bridge:middle',
        'neutral:nose_bridge:end',
      ]),
      centerlinePoints: [
        { x: 0, y: 0 },
        { x: 0.05, y: 1 },
        { x: 0, y: 2 },
      ],
    },
    tip: {
      provenance: provenance([
        'neutral:nose_tip:contour',
      ]),
      contourPoints: [
        { x: 1, y: 0 },
        { x: 0.5, y: 0.8660254038 },
        { x: -0.5, y: 0.8660254038 },
        { x: -1, y: 0 },
        { x: -0.5, y: -0.8660254038 },
        { x: 0.5, y: -0.8660254038 },
      ],
    },
  };
}

describe('FR287 canonical RGB selfie nose cluster', () => {
  it('promotes exactly the two FR282 reusable nose columns on top of FR286', () => {
    expect(() => assertFR287ProductColumnMap()).not.toThrow();
    expect(FR287_PRODUCT_COLUMN_MAP).toHaveLength(29);
    expect(
      FR287_PRODUCT_COLUMN_MAP
        .filter((entry) =>
          entry.implementationState ===
            'canonical_extractor_materialized')
        .map((entry) => entry.featureKey),
    ).toEqual([
      'eye.width_height_ratio',
      'eye.inter_eye_spacing_ratio',
      'eye.outer_corner_tilt',
      'eye.bilateral_shape_asymmetry',
      'nose.bridge_centerline_deviation',
      'nose.tip_contour_circularity',
      'mouth.width_and_relative_size',
      'mouth.corner_orientation',
      'mouth.outline_angularity',
      'cheek_midface.visible_width_ratio',
      'cheek_midface.visible_contour_prominence',
      'chin_lower_face.visible_width_ratio',
      'chin_lower_face.visible_contour',
    ]);
  });

  it('materializes bridge deviation and tip circularity while keeping the remaining two nose columns explicit', () => {
    const features = materializeCanonicalNoseFeaturesFR287(input());
    expect(features).toHaveLength(4);
    expect(() => assertCanonicalNoseFeaturesFR287(features))
      .not.toThrow();

    const bridge = features.find((feature) =>
      feature.featureKey === 'nose.bridge_centerline_deviation');
    expect(bridge?.status).toBe('available');
    if (bridge?.status === 'available') {
      expect(bridge.value.value).toBeGreaterThan(0);
      expect(bridge.sourceLandmarkRefsExposed).toBe(false);
    }

    const tip = features.find((feature) =>
      feature.featureKey === 'nose.tip_contour_circularity');
    expect(tip?.status).toBe('available');
    if (tip?.status === 'available') {
      expect(tip.value.value).toBeGreaterThan(0);
      expect(tip.value.value).toBeLessThanOrEqual(1);
    }

    expect(features.find((feature) =>
      feature.featureKey === 'nose.alar_width_and_nostril_geometry'))
      .toMatchObject({
        status: 'unavailable',
        reason: 'alar_nostril_extractor_not_materialized',
        fallbackInvented: false,
      });

    expect(features.find((feature) =>
      feature.featureKey === 'nose.tip_bridge_relative_projection'))
      .toMatchObject({
        status: 'unavailable',
        reason: 'rgb_relative_3d_provider_not_materialized',
        fallbackInvented: false,
      });
  });

  it('rejects bridge/tip inputs from different governed extractor/model contracts', () => {
    const mixed = input();
    const forged = {
      ...mixed,
      tip: {
        ...mixed.tip,
        provenance: {
          ...mixed.tip.provenance,
          extractorVersion: 'different-extractor',
        },
      },
    } as FR287GovernedNeutralNoseGeometryInput;

    expect(() => materializeCanonicalNoseFeaturesFR287(forged))
      .toThrow(/same governed nose observation\/extractor\/model/u);
  });

  it('does not expose source refs or invoke traditional classification', () => {
    const features = materializeCanonicalNoseFeaturesFR287(input());
    for (const feature of features) {
      expect(feature.providerLandmarkIndicesExposed).toBe(false);
      expect(feature.rawLandmarksExposed).toBe(false);
      expect(feature.sourceLandmarkRefsExposed).toBe(false);
      expect(feature.traditionalBindingApplied).toBe(false);
      expect(feature.classificationApplied).toBe(false);
      expect(feature.thresholdApplied).toBe(false);
    }
  });

  it('rejects forged upstream FR77 geometry before a combined payload can be issued', () => {
    expect(() => extractCanonicalRgbSelfieMorphologyFR287(
      {} as GovernedMetricGeometryCandidateFR77V1,
      {} as PoseNormalizedLipsGeometryFR79V1,
      input(),
    )).toThrow(/not issued/u);
  });
});
