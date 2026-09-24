import { describe, expect, it } from 'vitest';
import type {
  FR284CanonicalRgbSelfieMorphologyPayload,
} from './canonical-rgb-selfie-morphology-fr284.js';
import {
  assembleCanonicalRgbSelfieMorphologyFR285,
  materializeCanonicalMouthFeaturesFR285,
  type FR285CanonicalRgbSelfieMorphologyPayload,
  type FR285ExistingMouthSources,
} from './canonical-rgb-selfie-morphology-fr285.js';
import {
  auditFR285MouthTraditionalBindingGateFRB002,
  buildFR285RuntimeCapabilitiesFRB002,
} from './face-reading-binding-fr285-mouth-handshake-frb002.js';
import {
  FR285_PRODUCT_COLUMN_MAP,
} from './rgb-selfie-product-column-map-fr285.js';

const RUN = 'frb002:test-source';
const DIGEST = `sha256:${'c'.repeat(64)}`;

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
        ? ['fr283:implementation', 'fr283:empirical']
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
          axes: [{
            axisKey: 'horizontal_span_relative_difference',
            value: 0.04,
            unit: 'ratio',
            sourceMetricRef:
              'neutral.eye_pair.asymmetry.absolute_relative_x_span_difference@0.1.0',
          }],
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

function payload(
  cornerAvailable = true,
): FR285CanonicalRgbSelfieMorphologyPayload {
  return assembleCanonicalRgbSelfieMorphologyFR285(
    eyePayload(),
    materializeCanonicalMouthFeaturesFR285(
      mouthSources(cornerAvailable),
    ),
  );
}

describe('FRB002 FR285 mouth capability handshake', () => {
  it('exposes a complete 29-feature handshake with the seven FR285 governed geometry features materialized', () => {
    const capabilities = buildFR285RuntimeCapabilitiesFRB002(payload());

    expect(capabilities).toHaveLength(29);
    expect(new Set(capabilities.map((entry) => entry.featureKey)).size)
      .toBe(29);

    for (const featureKey of [
      'eye.width_height_ratio',
      'eye.inter_eye_spacing_ratio',
      'eye.outer_corner_tilt',
      'eye.bilateral_shape_asymmetry',
      'mouth.width_and_relative_size',
      'mouth.corner_orientation',
      'mouth.outline_angularity',
    ]) {
      expect(capabilities.find((entry) => entry.featureKey === featureKey))
        .toMatchObject({
          materializationState: 'materialized',
          availabilityState: 'available',
        });
    }

    for (const featureKey of [
      'mouth.visible_lip_fullness',
      'mouth.philtrum_length_width',
      'mouth.visible_lip_color',
    ]) {
      expect(capabilities.find((entry) => entry.featureKey === featureKey))
        .toMatchObject({
          materializationState: 'not_materialized',
          availabilityState: 'not_evaluated',
        });
    }
  });

  it('preserves a current-capture unavailable mouth corner as materialized but unavailable', () => {
    const capabilities = buildFR285RuntimeCapabilitiesFRB002(payload(false));

    expect(capabilities.find(
      (entry) => entry.featureKey === 'mouth.corner_orientation',
    )).toMatchObject({
      materializationState: 'materialized',
      availabilityState: 'unavailable',
    });
  });

  it('keeps the FR81/FR83 traditional mouth gate closed while exposing neutral mouth capabilities', () => {
    const audit = auditFR285MouthTraditionalBindingGateFRB002(payload());

    expect(audit.mouthFeatureCount).toBe(6);
    expect(audit.materializedAvailableCount).toBe(3);
    expect(audit.materializedCaptureUnavailableCount).toBe(0);
    expect(audit.notMaterializedCount).toBe(3);
    expect(audit.admittedTraditionalMetricBindings).toBe(0);
    expect(audit.thresholdRefsIssued).toBe(0);
    expect(audit.criterionStatesIssued).toBe(0);
    expect(audit.claimsIssued).toBe(0);

    expect(audit.entries.find(
      (entry) => entry.featureKey === 'mouth.width_and_relative_size',
    )).toMatchObject({
      traditionalTargetRef: 'criterion.intake.square_broad',
      traditionalBindingState: 'not_admitted',
      automaticCriterionStateAuthorized: false,
      thresholdRef: null,
      claimIssued: false,
    });

    expect(audit.entries.find(
      (entry) => entry.featureKey === 'mouth.corner_orientation',
    )).toMatchObject({
      traditionalTargetRef: 'criterion.intake.corners_arched',
      traditionalBindingState: 'not_admitted',
    });

    expect(audit.entries.find(
      (entry) => entry.featureKey === 'mouth.outline_angularity',
    )).toMatchObject({
      traditionalTargetRef: null,
      traditionalBindingState: 'no_reviewed_binding_target',
    });

    expect(Object.values(audit.authorityBoundary).every(
      (value) => value === false,
    )).toBe(true);
  });

  it('rejects a forged mouth size metric-ref substitution instead of silently binding it', () => {
    const valid = payload();
    const forgedFeatures = valid.features.map((feature) => {
      if (
        feature.featureKey !== 'mouth.width_and_relative_size'
        || feature.status !== 'available'
      ) {
        return feature;
      }
      return {
        ...feature,
        sourceMetricRefs: [
          'neutral.mouth.forged_metric@0.1.0',
        ],
      };
    });

    const forged = {
      ...valid,
      features: forgedFeatures,
    } as FR285CanonicalRgbSelfieMorphologyPayload;

    expect(() =>
      auditFR285MouthTraditionalBindingGateFRB002(forged))
      .toThrow(/source metric refs drifted/u);
  });
});