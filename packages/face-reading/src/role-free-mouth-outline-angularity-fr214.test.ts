import { describe, expect, it } from 'vitest';
import type { PoseNormalizedLipsGeometryFR79V1 } from './pose-normalized-lips-geometry-fr79.js';
import {
  assertRoleFreeMouthOutlineAngularityFR214,
  computeClosedContourRmsAbsoluteTurningAngleDegreesFR214,
  computeRoleFreeMouthOutlineAngularityFR214,
  type FR214MouthOutlineAngularityResult,
} from './role-free-mouth-outline-angularity-fr214.js';

function regularPolygon20(radiusX = 3, radiusY = 1.2) {
  return Array.from({ length: 20 }, (_, index) => {
    const angle = 2 * Math.PI * index / 20;
    return { x: radiusX * Math.cos(angle), y: radiusY * Math.sin(angle) };
  });
}

function rotate<T>(values: readonly T[], amount: number): T[] {
  return [...values.slice(amount), ...values.slice(0, amount)];
}

describe('FR214 role-free mouth outline angularity', () => {
  it('is invariant to closed-cycle start index and orientation', () => {
    const contour = regularPolygon20();
    const baseline = computeClosedContourRmsAbsoluteTurningAngleDegreesFR214(contour);
    const rotated = computeClosedContourRmsAbsoluteTurningAngleDegreesFR214(rotate(contour, 7));
    const reversed = computeClosedContourRmsAbsoluteTurningAngleDegreesFR214([...contour].reverse());

    expect(baseline).toBeGreaterThan(0);
    expect(rotated).toBeCloseTo(baseline, 12);
    expect(reversed).toBeCloseTo(baseline, 12);
  });

  it('reports 18 degrees for a regular 20-gon', () => {
    const contour = regularPolygon20(2, 2);
    expect(computeClosedContourRmsAbsoluteTurningAngleDegreesFR214(contour))
      .toBeCloseTo(18, 10);
  });

  it('responds to turning-angle concentration rather than only bounding-box aspect ratio', () => {
    const smooth = regularPolygon20(3, 1);
    const angular = [
      { x: -3, y: 0 }, { x: -2.5, y: 0 }, { x: -2, y: 0 }, { x: -1.5, y: 0 },
      { x: -1, y: 0 }, { x: -0.5, y: 0 }, { x: 0, y: 0 }, { x: 0.5, y: 0 },
      { x: 1, y: 0 }, { x: 3, y: 1 },
      { x: 1, y: 2 }, { x: 0.5, y: 2 }, { x: 0, y: 2 }, { x: -0.5, y: 2 },
      { x: -1, y: 2 }, { x: -1.5, y: 2 }, { x: -2, y: 2 }, { x: -2.5, y: 2 },
      { x: -3, y: 2 }, { x: -3, y: 1 },
    ];
    const smoothValue = computeClosedContourRmsAbsoluteTurningAngleDegreesFR214(smooth);
    const angularValue = computeClosedContourRmsAbsoluteTurningAngleDegreesFR214(angular);
    expect(angularValue).toBeGreaterThan(smoothValue);
  });

  it('rejects a degenerate adjacent segment instead of smoothing or resampling it', () => {
    const contour = regularPolygon20();
    contour[4] = { ...contour[3]! };
    expect(() => computeClosedContourRmsAbsoluteTurningAngleDegreesFR214(contour))
      .toThrow(/degenerate adjacent segment/u);
  });

  it('rejects forged FR79 geometry before producing a mouth angularity axis', () => {
    expect(() => computeRoleFreeMouthOutlineAngularityFR214(
      {} as PoseNormalizedLipsGeometryFR79V1,
    )).toThrow(/not issued by the active FR-79 projection boundary/u);
  });

  it('rejects any attempted classifier or traditional authority widening', () => {
    const forged = {
      schemaVersion: 'fr214-mouth-outline-angularity-v1',
      artifactVersion: '0.1.0',
      contractVersion: 'FR214-ROLE-FREE-MOUTH-OUTLINE-ANGULARITY-v1',
      authorityState: 'role_free_visible_mouth_outline_continuous_axis_only',
      metric: {
        metricRef: 'neutral.mouth.outline.mean_rms_absolute_turning_angle_degrees@0.1.0',
        value: 25,
        unit: 'degree',
        coordinateFrame: 'canonical_aligned_right_handed_metric_xy',
        contourSwapInvariant: true,
        cycleStartInvariant: true,
        cycleOrientationInvariant: true,
        classificationApplied: false,
        thresholdApplied: false,
        calibrationApplied: false,
        traditionalBindingApplied: false,
        anatomicalInterpretationAllowed: false,
      },
      contourValues: [
        { contourRef: 'a', vertexCount: 20, rmsAbsoluteTurningAngleDegrees: 25 },
        { contourRef: 'b', vertexCount: 20, rmsAbsoluteTurningAngleDegrees: 25 },
      ],
      source: {
        fr79ProviderRunRef: 'fr214:test',
        fr79CanonicalAssetDigest: `sha256:${'a'.repeat(64)}`,
        fr79ProjectionRuleRef: 'fr79:canonical-metric-xy-orthographic@0.1.0',
        contourConsumptionState: 'unordered_set_no_outer_inner_role',
        providerComponentOrderUsedSemantically: false,
        providerVertexIndexExposed: false,
      },
      authorityBoundary: {
        observableMorphologyOnly: true,
        outerInnerLipRoleIssued: false,
        cheilionOrStomionAnatomyIssued: false,
        lipThicknessOrFullnessIssued: false,
        squareMouthClassifierIssued: true,
        fangDaTraditionalStateIssued: false,
        duanHouTraditionalStateIssued: false,
        thresholdIssued: false,
        calibrationIssued: false,
        productionActivated: false,
        commerceActivated: false,
      },
    } as unknown as FR214MouthOutlineAngularityResult;

    expect(() => assertRoleFreeMouthOutlineAngularityFR214(forged))
      .toThrow(/authority widened/u);
  });
});
