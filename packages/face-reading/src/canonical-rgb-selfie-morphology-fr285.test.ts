import { describe, expect, it } from 'vitest';
import type {
  FR284CanonicalRgbSelfieMorphologyPayload,
} from './canonical-rgb-selfie-morphology-fr284.js';
import {
  assembleCanonicalRgbSelfieMorphologyFR285,
  assertCanonicalMouthFeaturesFR285,
  extractCanonicalRgbSelfieMorphologyFR285,
  materializeCanonicalMouthFeaturesFR285,
  type FR285ExistingMouthSources,
} from './canonical-rgb-selfie-morphology-fr285.js';
import type {
  GovernedMetricGeometryCandidateFR77V1,
} from './governed-metric-geometry-runtime-fr77.js';
import type {
  PoseNormalizedLipsGeometryFR79V1,
} from './pose-normalized-lips-geometry-fr79.js';
import {
  FR285_PRODUCT_COLUMN_MAP,
  assertFR285ProductColumnMap,
} from './rgb-selfie-product-column-map-fr285.js';

const RUN = 'fr285:test-source';
const DIGEST = `sha256:${'b'.repeat(64)}`;

function q(dependency:
  | 'canonical_metric_geometry'
  | 'canonical_metric_geometry_and_fr283_viewpoint_context'
  | 'appearance_image_quality') {
  return {
    dependency,
    viewpointSensitivity:
      dependency === 'canonical_metric_geometry_and_fr283_viewpoint_context'
        ? 'documented_low_angle_sensitivity_fr283' as const
        : dependency === 'appearance_image_quality'
          ? 'not_applicable' as const
          : 'not_characterized_by_fr283' as const,
    evidenceRefs:
      dependency === 'canonical_metric_geometry_and_fr283_viewpoint_context'
        ? [
            'packages/face-reading/src/observable-morphology-fr76-eye-chord-propagation-fr283.ts',
            'research/face-reading/evidence/fr283-fixed-still-fr76-eye-chord-propagation/fr283-empirical-evidence.json',
          ]
        : [],
    poseAcceptanceThresholdIssued: false as const,
    correctionApplied: false as const,
    currentCapturePoseAdjudication: 'not_issued' as const,
  };
}

function eyePayload(): FR284CanonicalRgbSelfieMorphologyPayload {
  return {
    schemaVersion: 'fr284-canonical-rgb-selfie-morphology-payload-v1',
    contractVersion: 'FR284-CANONICAL-RGB-SELFIE-MORPHOLOGY-v1',
    authorityState:
      'product_facing_canonical_observable_morphology_no_traditional_semantics',
    captureBoundary: {
      cameraClass: 'ordinary_smartphone_rgb_front_camera',
      distanceCm: [25, 30],
      specialDepthHardwareRequired: false,
    },
    materializedRegionKeys: ['eye_pair'],
    features: [
      {
        featureKey: 'eye.width_height_ratio',
        regionKey: 'eye_pair',
        status: 'available',
        value: { kind: 'scalar', value: 0.31, unit: 'ratio' },
        sourceMetricRefs: [
          'neutral.eye_pair.metric_3d.mean_cycle_y_to_x_span_ratio@0.1.0',
        ],
        quality: q('canonical_metric_geometry'),
        providerLandmarkIndicesExposed: false,
        rawLandmarksExposed: false,
        traditionalBindingApplied: false,
        classificationApplied: false,
        thresholdApplied: false,
      },
      {
        featureKey: 'eye.inter_eye_spacing_ratio',
        regionKey: 'eye_pair',
        status: 'available',
        value: { kind: 'scalar', value: 0.42, unit: 'ratio' },
        sourceMetricRefs: [
          'neutral.eye_pair.metric_3d.centroid_separation_to_full_mesh_x_span_ratio@0.1.0',
        ],
        quality: q('canonical_metric_geometry'),
        providerLandmarkIndicesExposed: false,
        rawLandmarksExposed: false,
        traditionalBindingApplied: false,
        classificationApplied: false,
        thresholdApplied: false,
      },
      {
        featureKey: 'eye.outer_corner_tilt',
        regionKey: 'eye_pair',
        status: 'available',
        value: { kind: 'scalar', value: 8.9, unit: 'degree' },
        sourceMetricRefs: [
          'neutral.eye.outer_corner_tilt.mean_degrees@0.1.0',
        ],
        quality: q(
          'canonical_metric_geometry_and_fr283_viewpoint_context',
        ),
        providerLandmarkIndicesExposed: false,
        rawLandmarksExposed: false,
        traditionalBindingApplied: false,
        classificationApplied: false,
        thresholdApplied: false,
      },
      {
        featureKey: 'eye.bilateral_shape_asymmetry',
        regionKey: 'eye_pair',
        status: 'available',
        value: {
          kind: 'continuous_axes',
          axes: [
            {
              axisKey: 'horizontal_span_relative_difference',
              value: 0.04,
              unit: 'ratio',
              sourceMetricRef:
                'neutral.eye_pair.asymmetry.absolute_relative_x_span_difference@0.1.0',
            },
          ],
        },
        sourceMetricRefs: [
          'neutral.eye_pair.asymmetry.absolute_relative_x_span_difference@0.1.0',
          'neutral.eye_pair.asymmetry.absolute_y_to_x_span_ratio_difference@0.1.0',
          'neutral.eye_pair.asymmetry.absolute_mean_turning_angle_difference@0.1.0',
        ],
        quality: q('canonical_metric_geometry'),
        providerLandmarkIndicesExposed: false,
        rawLandmarksExposed: false,
        traditionalBindingApplied: false,
        classificationApplied: false,
        thresholdApplied: false,
      },
      {
        featureKey: 'eye.eyelid_crease_or_hooded_category',
        regionKey: 'eye_pair',
        status: 'unavailable',
        reason: 'image_model_extractor_not_materialized',
        fallbackInvented: false,
        sourceMetricRefs: [],
        quality: q('appearance_image_quality'),
        providerLandmarkIndicesExposed: false,
        rawLandmarksExposed: false,
        traditionalBindingApplied: false,
        classificationApplied: false,
        thresholdApplied: false,
      },
    ],
    pendingFeatureKeys: FR285_PRODUCT_COLUMN_MAP
      .map((entry) => entry.featureKey)
      .filter((featureKey) => !featureKey.startsWith('eye.')),
    provenance: {
      sourceGeometryCoordinateFrame:
        'canonical_aligned_right_handed_metric_3d',
      sourceGeometryProviderOpaque: true,
      sourceProviderRunRefExposed: false,
      sourceCanonicalAssetDigestExposed: false,
      sameGovernedGeometrySourceVerified: true,
      sourceContracts: [
        'FR210-EYE-NEUTRAL-AXIS-BUNDLE-v1',
        'FR215-ROLE-INVARIANT-EYE-ASYMMETRY-SURFACE-v1',
      ],
    },
    authorityBoundary: {
      rawImageExposed: false,
      rawLandmarksExposed: false,
      providerLandmarkIndicesExposed: false,
      identityRecognitionApplied: false,
      biometricTemplateCreated: false,
      depthHardwareRequired: false,
      physicalMillimeterGroundTruthClaimed: false,
      traditionalInterpretationIncluded: false,
      traditionalBindingIssued: false,
      thresholdIssued: false,
      correctionFormulaApplied: false,
    },
  };
}

function mouthSources(
  cornerAvailable = true,
): FR285ExistingMouthSources {
  return {
    contour: {
      schemaVersion: 'fr80-neutral-mouth-contour-metric-v1',
      metric: {
        metricRef:
          'neutral.mouth.contour_set.bounding_box_aspect_ratio@0.1.0',
        unit: 'ratio',
        value: 2.7,
        classificationApplied: false,
        calibrationApplied: false,
        traditionalBindingApplied: false,
      },
      provenance: {
        providerRunRef: RUN,
        canonicalAssetDigest: DIGEST,
      },
    } as FR285ExistingMouthSources['contour'],
    relativeSize: {
      schemaVersion: 'fr82-neutral-mouth-relative-size-metric-v1',
      metric: {
        metricRef:
          'neutral.mouth.contour_set.horizontal_span_to_full_mesh_horizontal_span_ratio@0.1.0',
        unit: 'ratio',
        value: 0.36,
        classificationApplied: false,
        calibrationApplied: false,
        traditionalBindingApplied: false,
      },
      provenance: {
        providerRunRef: RUN,
        canonicalAssetDigest: DIGEST,
      },
    } as FR285ExistingMouthSources['relativeSize'],
    corner: cornerAvailable
      ? {
          schemaVersion: 'fr212-mouth-corner-orientation-v1',
          status: 'available',
          metric: {
            metricRef:
              'neutral.mouth.corner_elevation.mean_to_mouth_width_ratio@0.1.0',
            unit: 'ratio',
            value: 0.04,
          },
          source: {
            fr79ProviderRunRef: RUN,
            fr79CanonicalAssetDigest: DIGEST,
          },
        } as FR285ExistingMouthSources['corner']
      : {
          schemaVersion: 'fr212-mouth-corner-orientation-v1',
          status: 'unavailable',
          reason: 'mouth_horizontal_span_collapsed',
          fallbackInvented: false,
          source: {
            fr79ProviderRunRef: RUN,
            fr79CanonicalAssetDigest: DIGEST,
          },
        } as FR285ExistingMouthSources['corner'],
    angularity: {
      schemaVersion: 'fr214-mouth-outline-angularity-v1',
      metric: {
        metricRef:
          'neutral.mouth.outline.mean_rms_absolute_turning_angle_degrees@0.1.0',
        unit: 'degree',
        value: 17.5,
      },
      source: {
        fr79ProviderRunRef: RUN,
        fr79CanonicalAssetDigest: DIGEST,
      },
    } as FR285ExistingMouthSources['angularity'],
  };
}

describe('FR285 canonical RGB selfie mouth cluster', () => {
  it('promotes exactly the three governed FR282 mouth geometry columns', () => {
    expect(() => assertFR285ProductColumnMap()).not.toThrow();
    expect(FR285_PRODUCT_COLUMN_MAP).toHaveLength(29);
    expect(
      FR285_PRODUCT_COLUMN_MAP
        .filter((entry) =>
          entry.implementationState === 'canonical_extractor_materialized')
        .map((entry) => entry.featureKey),
    ).toEqual([
      'eye.width_height_ratio',
      'eye.inter_eye_spacing_ratio',
      'eye.outer_corner_tilt',
      'eye.bilateral_shape_asymmetry',
      'mouth.width_and_relative_size',
      'mouth.corner_orientation',
      'mouth.outline_angularity',
    ]);
  });

  it('materializes mouth size, corner orientation, and outline angularity while preserving three explicit gaps', () => {
    const features = materializeCanonicalMouthFeaturesFR285(
      mouthSources(),
    );
    expect(features).toHaveLength(6);
    expect(() => assertCanonicalMouthFeaturesFR285(features)).not.toThrow();

    const size = features.find((feature) =>
      feature.featureKey === 'mouth.width_and_relative_size');
    expect(size?.status).toBe('available');
    if (size?.status === 'available' &&
        size.value.kind === 'continuous_axes') {
      expect(size.value.axes.map((axis) => axis.value))
        .toEqual([2.7, 0.36]);
    }

    const corner = features.find((feature) =>
      feature.featureKey === 'mouth.corner_orientation');
    expect(corner?.status).toBe('available');

    expect(features.find((feature) =>
      feature.featureKey === 'mouth.visible_lip_fullness'))
      .toMatchObject({
        status: 'unavailable',
        reason: 'governed_lip_fullness_extractor_not_materialized',
      });
    expect(features.find((feature) =>
      feature.featureKey === 'mouth.philtrum_length_width'))
      .toMatchObject({
        status: 'unavailable',
        reason: 'philtrum_extractor_not_materialized',
      });
    expect(features.find((feature) =>
      feature.featureKey === 'mouth.visible_lip_color'))
      .toMatchObject({
        status: 'unavailable',
        reason: 'appearance_model_extractor_not_materialized',
      });
  });

  it('propagates an unavailable FR212 mouth corner without inventing a fallback', () => {
    const features = materializeCanonicalMouthFeaturesFR285(
      mouthSources(false),
    );
    expect(features.find((feature) =>
      feature.featureKey === 'mouth.corner_orientation'))
      .toMatchObject({
        status: 'unavailable',
        reason:
          'source_geometry_mouth_corner_orientation_unavailable',
        sourceReason: 'mouth_horizontal_span_collapsed',
        fallbackInvented: false,
      });
  });

  it('assembles eye + mouth into 11 canonical FR282 columns with 18 still pending', () => {
    const payload = assembleCanonicalRgbSelfieMorphologyFR285(
      eyePayload(),
      materializeCanonicalMouthFeaturesFR285(mouthSources()),
    );
    expect(payload.features).toHaveLength(11);
    expect(payload.pendingFeatureKeys).toHaveLength(18);
    expect(payload.materializedRegionKeys)
      .toEqual(['eye_pair', 'mouth_lips']);
    expect(payload.authorityBoundary.traditionalInterpretationIncluded)
      .toBe(false);
    expect(payload.authorityBoundary.rawLandmarksExposed).toBe(false);
  });

  it('rejects forged geometry before the actual production extractor can issue product morphology', () => {
    expect(() => extractCanonicalRgbSelfieMorphologyFR285(
      {} as GovernedMetricGeometryCandidateFR77V1,
      {} as PoseNormalizedLipsGeometryFR79V1,
    )).toThrow(/not issued/u);
  });
});
