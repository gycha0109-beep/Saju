import { describe, expect, it } from 'vitest';
import {
  FR210_CONTRACT_VERSION,
  type FR210EyeAxis,
  type FR210EyeNeutralAxisBundle,
} from './eye-neutral-axis-bundle-fr210.js';
import {
  FR215_CONTRACT_VERSION,
  type FR215EyeAsymmetrySurface,
} from './eye-asymmetry-surface-fr215.js';
import {
  assertCanonicalRgbSelfieMorphologyPayloadFR284,
  materializeCanonicalEyeMorphologyFR284,
} from './canonical-rgb-selfie-morphology-fr284.js';
import {
  FR284_PRODUCT_COLUMN_MAP,
  assertFR284ProductColumnMap,
} from './rgb-selfie-product-column-map-fr284.js';

const DIGEST = `sha256:${'a'.repeat(64)}`;
const RUN = 'fr284:test-eye-source';

function axis(
  axisKey: FR210EyeAxis['axisKey'],
  value: number,
  unit: FR210EyeAxis['unit'],
  sourceMetricRef: string,
): FR210EyeAxis {
  return {
    axisKey,
    value,
    unit,
    sourceMetricRef,
    semanticScope: axisKey === 'outer_corner_tilt'
      ? 'bilateral_visible_corner_geometry_only'
      : 'closed_cycle_geometry_only',
    classificationApplied: false,
    thresholdApplied: false,
    calibrationApplied: false,
    traditionalBindingApplied: false,
    anatomicalInterpretationAllowed: false,
  };
}

function eyeAxes(): FR210EyeNeutralAxisBundle {
  return {
    schemaVersion: 'fr210-eye-neutral-axis-bundle-v1',
    artifactVersion: '0.1.0',
    contractVersion: FR210_CONTRACT_VERSION,
    authorityState: 'reused_neutral_eye_geometry_axes_research_only',
    source: {
      fr77ProviderRunRef: RUN,
      fr77CanonicalAssetDigest: DIGEST,
      fr158SchemaVersion: 'fr158-role-invariant-eye-pair-neutral-shape-metric-runtime-v1',
      fr178SchemaVersion: 'fr178-eye-pair-geometric-y-span-runtime-v1',
      fr209DerivationAttempted: true,
      fr207MayProceedWithoutNewAnatomicalResearch: true,
    },
    axes: {
      relativeHorizontalSpan: axis(
        'relative_horizontal_span',
        0.11,
        'ratio',
        'neutral.eye_pair.metric_3d.mean_cycle_x_span_to_full_mesh_x_span_ratio@0.1.0',
      ),
      geometricVerticalToHorizontalRatio: axis(
        'geometric_vertical_to_horizontal_ratio',
        0.31,
        'ratio',
        'neutral.eye_pair.metric_3d.mean_cycle_y_to_x_span_ratio@0.1.0',
      ),
      centroidSeparation: axis(
        'centroid_separation',
        0.42,
        'ratio',
        'neutral.eye_pair.metric_3d.centroid_separation_to_full_mesh_x_span_ratio@0.1.0',
      ),
      closedCycleTurningAngle: axis(
        'closed_cycle_turning_angle',
        0.39,
        'radian',
        'neutral.eye_pair.metric_3d.mean_closed_cycle_absolute_turning_angle@0.1.0',
      ),
      outerCornerTilt: axis(
        'outer_corner_tilt',
        8.9,
        'degree',
        'neutral.eye.outer_corner_tilt.mean_degrees@0.1.0',
      ),
    },
    unsupportedImageTraits: [
      'eyelid_crease_category',
      'hooded_eyelid_category',
      'ocular_radiance_or_visible_brightness_quality',
    ],
    unresolvedProductSurface: ['product_individual_eye_asymmetry_surface'],
    authorityBoundary: {
      newAnatomicalResearchRequired: false,
      providerIndexToAnatomyBindingIssued: false,
      anatomicalLateralityIssued: false,
      physiologicalEyeApertureIssued: false,
      almondRoundNarrowClassifierIssued: false,
      upturnedDownturnedClassifierIssued: false,
      eyelidCreaseClassifierIssued: false,
      hoodedEyelidClassifierIssued: false,
      thresholdIssued: false,
      calibrationIssued: false,
      traditionalBindingIssued: false,
      productionActivated: false,
      commerceActivated: false,
    },
  };
}

function eyeAsymmetry(): FR215EyeAsymmetrySurface {
  return {
    schemaVersion: 'fr215-eye-asymmetry-surface-v1',
    artifactVersion: '0.1.0',
    contractVersion: FR215_CONTRACT_VERSION,
    authorityState: 'unordered_pair_continuous_eye_asymmetry_axes_only',
    source: {
      fr77ProviderRunRef: RUN,
      fr77CanonicalAssetDigest: DIGEST,
      coordinateFrame: 'canonical_aligned_right_handed_metric_3d',
      coordinateUnit: 'centimeter',
      eyeTopologyWitnessRegionCount: 2,
      eyeTopologyWitnessPointCounts: [16, 16],
      pairConsumedAsUnordered: true,
      providerTopologySymbolsUsedAsSemanticSides: false,
      anatomicalLateralityResolved: false,
    },
    axes: {
      horizontalSpanRelativeDifference: {
        metricRef: 'neutral.eye_pair.asymmetry.absolute_relative_x_span_difference@0.1.0',
        value: 0.04,
        unit: 'ratio',
      },
      geometricYToXRatioAbsoluteDifference: {
        metricRef: 'neutral.eye_pair.asymmetry.absolute_y_to_x_span_ratio_difference@0.1.0',
        value: 0.03,
        unit: 'ratio',
      },
      meanTurningAngleAbsoluteDifference: {
        metricRef: 'neutral.eye_pair.asymmetry.absolute_mean_turning_angle_difference@0.1.0',
        value: 0.02,
        unit: 'radian',
      },
    },
    invariance: {
      eyeCycleSwapInvariant: true,
      cycleStartInvariant: true,
      cycleOrientationInvariant: true,
    },
    authorityBoundary: {
      observableMorphologyOnly: true,
      anatomicalLateralityIssued: false,
      sideIdentityIssued: false,
      physiologicalEyeApertureIssued: false,
      diagnosisIssued: false,
      scoreIssued: false,
      rankIssued: false,
      classifierIssued: false,
      thresholdIssued: false,
      calibrationIssued: false,
      traditionalBindingIssued: false,
      productionActivated: false,
      commerceActivated: false,
    },
  };
}

describe('FR284 product-facing canonical RGB selfie morphology', () => {
  it('maps exactly the 29 FR282 columns and materializes only the four reusable eye geometry columns', () => {
    expect(() => assertFR284ProductColumnMap()).not.toThrow();
    expect(FR284_PRODUCT_COLUMN_MAP).toHaveLength(29);
    expect(
      FR284_PRODUCT_COLUMN_MAP
        .filter((entry) => entry.implementationState === 'canonical_extractor_materialized')
        .map((entry) => entry.featureKey),
    ).toEqual([
      'eye.width_height_ratio',
      'eye.inter_eye_spacing_ratio',
      'eye.outer_corner_tilt',
      'eye.bilateral_shape_asymmetry',
    ]);
  });

  it('projects governed eye geometry into provider-neutral product columns without raw landmark indices', () => {
    const payload = materializeCanonicalEyeMorphologyFR284(
      eyeAxes(),
      eyeAsymmetry(),
    );

    expect(payload.features).toHaveLength(5);
    expect(payload.pendingFeatureKeys).toHaveLength(24);
    expect(payload.authorityBoundary.rawLandmarksExposed).toBe(false);
    expect(payload.authorityBoundary.providerLandmarkIndicesExposed).toBe(false);
    expect(payload.authorityBoundary.traditionalInterpretationIncluded).toBe(false);
    expect(payload.captureBoundary.distanceCm).toEqual([25, 30]);

    const widthHeight = payload.features.find(
      (feature) => feature.featureKey === 'eye.width_height_ratio',
    );
    expect(widthHeight?.status).toBe('available');
    if (widthHeight?.status === 'available' && widthHeight.value.kind === 'scalar') {
      expect(widthHeight.value.value).toBe(0.31);
      expect(widthHeight.value.unit).toBe('ratio');
    }

    const spacing = payload.features.find(
      (feature) => feature.featureKey === 'eye.inter_eye_spacing_ratio',
    );
    expect(spacing?.status).toBe('available');
    if (spacing?.status === 'available' && spacing.value.kind === 'scalar') {
      expect(spacing.value.value).toBe(0.42);
    }

    const asymmetry = payload.features.find(
      (feature) => feature.featureKey === 'eye.bilateral_shape_asymmetry',
    );
    expect(asymmetry?.status).toBe('available');
    if (asymmetry?.status === 'available' && asymmetry.value.kind === 'continuous_axes') {
      expect(asymmetry.value.axes.map((entry) => entry.value)).toEqual([0.04, 0.03, 0.02]);
    }

    expect(() => assertCanonicalRgbSelfieMorphologyPayloadFR284(payload)).not.toThrow();
  });

  it('carries FR283 only as low-angle sensitivity context on eye tilt and issues no correction/threshold', () => {
    const payload = materializeCanonicalEyeMorphologyFR284(
      eyeAxes(),
      eyeAsymmetry(),
    );
    const tilt = payload.features.find(
      (feature) => feature.featureKey === 'eye.outer_corner_tilt',
    );

    expect(tilt?.quality.viewpointSensitivity)
      .toBe('documented_low_angle_sensitivity_fr283');
    expect(tilt?.quality.poseAcceptanceThresholdIssued).toBe(false);
    expect(tilt?.quality.correctionApplied).toBe(false);
    expect(tilt?.quality.currentCapturePoseAdjudication).toBe('not_issued');
  });

  it('keeps the FR282 eyelid appearance column explicitly unavailable instead of fabricating a geometry label', () => {
    const payload = materializeCanonicalEyeMorphologyFR284(
      eyeAxes(),
      eyeAsymmetry(),
    );
    const eyelid = payload.features.find(
      (feature) => feature.featureKey === 'eye.eyelid_crease_or_hooded_category',
    );

    expect(eyelid).toMatchObject({
      status: 'unavailable',
      reason: 'image_model_extractor_not_materialized',
      fallbackInvented: false,
    });
  });

  it('fails closed when FR210 and FR215 artifacts come from different governed geometry runs', () => {
    const mismatch = eyeAsymmetry();
    const forged = {
      ...mismatch,
      source: {
        ...mismatch.source,
        fr77ProviderRunRef: 'fr284:different-run',
      },
    } as FR215EyeAsymmetrySurface;

    expect(() => materializeCanonicalEyeMorphologyFR284(
      eyeAxes(),
      forged,
    )).toThrow(/same governed geometry source/u);
  });
});
