import { describe, expect, it } from 'vitest';
import type { GovernedMetricGeometryCandidateFR77V1 } from './governed-metric-geometry-runtime-fr77.js';
import {
  assertEyeAsymmetrySurfaceFR215,
  computeEyeAsymmetrySurfaceFR215,
  computeEyeCycleShapeFR215,
  computeUnorderedEyeCycleAsymmetryFR215,
  type FR215EyeAsymmetrySurface,
  type FR215Point3D,
} from './eye-asymmetry-surface-fr215.js';

function ellipse16(rx: number, ry: number): FR215Point3D[] {
  return Array.from({ length: 16 }, (_, index) => {
    const angle = 2 * Math.PI * index / 16;
    return { x: rx * Math.cos(angle), y: ry * Math.sin(angle), z: 0 };
  });
}

function rotate<T>(values: readonly T[], amount: number): T[] {
  return [...values.slice(amount), ...values.slice(0, amount)];
}

describe('FR215 role-invariant individual-eye asymmetry surface', () => {
  it('is invariant to eye-cycle swap, cycle start, and cycle orientation', () => {
    const first = ellipse16(2, 0.8);
    const second = ellipse16(2.2, 1.1);

    const baseline = computeUnorderedEyeCycleAsymmetryFR215(first, second);
    const swapped = computeUnorderedEyeCycleAsymmetryFR215(second, first);
    const reindexed = computeUnorderedEyeCycleAsymmetryFR215(
      rotate(first, 5),
      [...rotate(second, 9)].reverse(),
    );

    expect(swapped).toEqual(baseline);
    expect(reindexed.horizontalSpanRelativeDifference)
      .toBeCloseTo(baseline.horizontalSpanRelativeDifference, 12);
    expect(reindexed.geometricYToXRatioAbsoluteDifference)
      .toBeCloseTo(baseline.geometricYToXRatioAbsoluteDifference, 12);
    expect(reindexed.meanTurningAngleAbsoluteDifferenceRadian)
      .toBeCloseTo(baseline.meanTurningAngleAbsoluteDifferenceRadian, 12);
  });

  it('reports zero asymmetry for congruent cycles regardless of translation', () => {
    const first = ellipse16(2, 1);
    const second = ellipse16(2, 1).map((point) => ({
      x: point.x + 5,
      y: point.y - 3,
      z: point.z + 2,
    }));
    const result = computeUnorderedEyeCycleAsymmetryFR215(first, second);

    expect(result.horizontalSpanRelativeDifference).toBeCloseTo(0, 12);
    expect(result.geometricYToXRatioAbsoluteDifference).toBeCloseTo(0, 12);
    expect(result.meanTurningAngleAbsoluteDifferenceRadian).toBeCloseTo(0, 12);
  });

  it('separates span and aspect asymmetry as continuous axes', () => {
    const first = ellipse16(2, 1);
    const second = ellipse16(2.2, 0.8);
    const result = computeUnorderedEyeCycleAsymmetryFR215(first, second);

    expect(result.horizontalSpanRelativeDifference).toBeCloseTo(0.4 / 4.2, 12);
    expect(result.geometricYToXRatioAbsoluteDifference)
      .toBeCloseTo(Math.abs((2 / 4) - (1.6 / 4.4)), 12);
    expect(result.meanTurningAngleAbsoluteDifferenceRadian).toBeGreaterThanOrEqual(0);
  });

  it('rejects degenerate cycle edges and non-positive X span without fallback', () => {
    const duplicate = ellipse16(2, 1);
    duplicate[4] = { ...duplicate[3]! };
    expect(() => computeEyeCycleShapeFR215(duplicate))
      .toThrow(/degenerate adjacent segment/u);

    const vertical = Array.from({ length: 16 }, (_, index) => ({
      x: 0,
      y: index,
      z: 0,
    }));
    expect(() => computeEyeCycleShapeFR215(vertical))
      .toThrow(/X span must be finite and positive/u);
  });

  it('rejects forged FR77 geometry before issuing asymmetry axes', () => {
    expect(() => computeEyeAsymmetrySurfaceFR215(
      {} as GovernedMetricGeometryCandidateFR77V1,
    )).toThrow(/not issued by the active FR-77 runtime boundary/u);
  });

  it('rejects any attempted laterality, score, classifier, or traditional authority widening', () => {
    const forged = {
      schemaVersion: 'fr215-eye-asymmetry-surface-v1',
      artifactVersion: '0.1.0',
      contractVersion: 'FR215-ROLE-INVARIANT-EYE-ASYMMETRY-SURFACE-v1',
      authorityState: 'unordered_pair_continuous_eye_asymmetry_axes_only',
      source: {
        fr77ProviderRunRef: 'fr215:test',
        fr77CanonicalAssetDigest: `sha256:${'a'.repeat(64)}`,
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
          value: 0.1,
          unit: 'ratio',
        },
        geometricYToXRatioAbsoluteDifference: {
          metricRef: 'neutral.eye_pair.asymmetry.absolute_y_to_x_span_ratio_difference@0.1.0',
          value: 0.05,
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
        scoreIssued: true,
        rankIssued: false,
        classifierIssued: false,
        thresholdIssued: false,
        calibrationIssued: false,
        traditionalBindingIssued: false,
        productionActivated: false,
        commerceActivated: false,
      },
    } as unknown as FR215EyeAsymmetrySurface;

    expect(() => assertEyeAsymmetrySurfaceFR215(forged))
      .toThrow(/authority widened/u);
  });
});
