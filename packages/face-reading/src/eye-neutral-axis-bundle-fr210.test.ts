import { describe, expect, it } from 'vitest';
import type { GovernedMetricGeometryCandidateFR77V1 } from './governed-metric-geometry-runtime-fr77.js';
import type { RoleInvariantEyePairNeutralShapeMetricValueFR158V1 } from './role-invariant-eye-pair-neutral-shape-metric-runtime-fr158.js';
import type { EyePairGeometricYSpanMetricValueFR178V1 } from './eye-pair-geometric-y-span-runtime-fr178.js';
import {
  assertEyeNeutralAxisBundleFR210,
  computeEyeNeutralAxisBundleFR210,
  selectUniqueFR158MetricFR210,
  selectUniqueFR178MetricFR210,
  type FR210EyeNeutralAxisBundle,
} from './eye-neutral-axis-bundle-fr210.js';

function fr158Metric(
  metricRef: RoleInvariantEyePairNeutralShapeMetricValueFR158V1['metricRef'],
  value: number,
  unit: RoleInvariantEyePairNeutralShapeMetricValueFR158V1['unit'] = 'ratio',
): RoleInvariantEyePairNeutralShapeMetricValueFR158V1 {
  return {
    metricRef,
    value,
    unit,
    coordinateFrame: 'canonical_aligned_right_handed_metric_3d',
    contributingClosedCycleCount: 2,
    contributingElementCount: metricRef.includes('perimeter') || metricRef.includes('turning_angle') ? 32 : 2,
    classificationApplied: false,
    calibrationApplied: false,
    thresholdApplied: false,
    identityMatchingApplied: false,
    traditionalBindingApplied: false,
  };
}

function fr178Metric(
  metricRef: EyePairGeometricYSpanMetricValueFR178V1['metricRef'],
  value: number,
): EyePairGeometricYSpanMetricValueFR178V1 {
  return {
    metricRef,
    value,
    unit: 'ratio',
    coordinateFrame: 'canonical_aligned_right_handed_metric_3d',
    contributingClosedCycleCount: 2,
    contributingElementCount: 2,
    individualEyeValuesExposed: false,
    classificationApplied: false,
    calibrationApplied: false,
    thresholdApplied: false,
    identityMatchingApplied: false,
    traditionalBindingApplied: false,
  };
}

describe('FR210 eye neutral axis bundle', () => {
  it('selects existing FR158 and FR178 metrics by exact ref without relabeling them', () => {
    const xRef =
      'neutral.eye_pair.metric_3d.mean_cycle_x_span_to_full_mesh_x_span_ratio@0.1.0' as const;
    const yxRef =
      'neutral.eye_pair.metric_3d.mean_cycle_y_to_x_span_ratio@0.1.0' as const;

    expect(selectUniqueFR158MetricFR210([fr158Metric(xRef, 0.12)], xRef).value).toBe(0.12);
    expect(selectUniqueFR178MetricFR210([fr178Metric(yxRef, 0.31)], yxRef).value).toBe(0.31);
  });

  it('fails closed on missing or duplicate metric refs', () => {
    const xRef =
      'neutral.eye_pair.metric_3d.mean_cycle_x_span_to_full_mesh_x_span_ratio@0.1.0' as const;
    const yxRef =
      'neutral.eye_pair.metric_3d.mean_cycle_y_to_x_span_ratio@0.1.0' as const;

    expect(() => selectUniqueFR158MetricFR210([], xRef)).toThrow(/found 0/u);
    expect(() => selectUniqueFR158MetricFR210(
      [fr158Metric(xRef, 0.1), fr158Metric(xRef, 0.2)],
      xRef,
    )).toThrow(/found 2/u);
    expect(() => selectUniqueFR178MetricFR210(
      [fr178Metric(yxRef, 0.3), fr178Metric(yxRef, 0.4)],
      yxRef,
    )).toThrow(/found 2/u);
  });

  it('rejects forged FR77 instead of turning unissued geometry into eye labels', () => {
    expect(() => computeEyeNeutralAxisBundleFR210(
      {} as GovernedMetricGeometryCandidateFR77V1,
    )).toThrow(/not issued by the active FR-77 runtime boundary/u);
  });

  it('rejects any attempted authority widening on a completed bundle', () => {
    const forged = {
      schemaVersion: 'fr210-eye-neutral-axis-bundle-v1',
      artifactVersion: '0.1.0',
      contractVersion: 'FR210-EYE-NEUTRAL-AXIS-BUNDLE-v1',
      authorityState: 'reused_neutral_eye_geometry_axes_research_only',
      source: {
        fr77ProviderRunRef: 'fr210:test',
        fr77CanonicalAssetDigest: `sha256:${'a'.repeat(64)}`,
        fr158SchemaVersion: 'fr158-role-invariant-eye-pair-neutral-shape-metric-runtime-v1',
        fr178SchemaVersion: 'fr178-eye-pair-geometric-y-span-runtime-v1',
        fr209DerivationAttempted: true,
        fr207MayProceedWithoutNewAnatomicalResearch: true,
      },
      axes: {
        relativeHorizontalSpan: {},
        geometricVerticalToHorizontalRatio: {},
        centroidSeparation: {},
        closedCycleTurningAngle: {},
        outerCornerTilt: {
          axisKey: 'outer_corner_tilt',
          status: 'unavailable',
          reason: 'eye_cycle_extrema_ambiguous',
          fallbackInvented: false,
        },
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
        almondRoundNarrowClassifierIssued: true,
        upturnedDownturnedClassifierIssued: false,
        eyelidCreaseClassifierIssued: false,
        hoodedEyelidClassifierIssued: false,
        thresholdIssued: false,
        calibrationIssued: false,
        traditionalBindingIssued: false,
        productionActivated: false,
        commerceActivated: false,
      },
    } as unknown as FR210EyeNeutralAxisBundle;

    expect(() => assertEyeNeutralAxisBundleFR210(forged)).toThrow(/authority widening/u);
  });
});
