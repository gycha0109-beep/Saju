import { describe, expect, it } from 'vitest';
import type { PoseNormalizedLipsGeometryFR79V1 } from './pose-normalized-lips-geometry-fr79.js';
import {
  assertIssuedGovernedRoleFreeMinimumSetSeparationFR88,
  computeRoleFreeClosedPolylineMinimumSetSeparationFR88,
  evaluateIssuedPoseNormalizedLipsMinimumSetSeparationFR88,
  type GovernedRoleFreeMinimumSetSeparationFR88V1,
} from './role-free-minimum-set-separation-runtime-fr88.js';

const OUTER = [
  { x: 0, y: 0 },
  { x: 10, y: 0 },
  { x: 10, y: 10 },
  { x: 0, y: 10 },
] as const;

const INNER = [
  { x: 3, y: 3 },
  { x: 7, y: 3 },
  { x: 7, y: 7 },
  { x: 3, y: 7 },
] as const;

function rotate<T>(values: readonly T[], offset: number): readonly T[] {
  return [...values.slice(offset), ...values.slice(0, offset)];
}

describe('FR88 role-free minimum set separation runtime', () => {
  it('computes exact continuous closed-polyline minimum separation for nested boundaries', () => {
    const result = computeRoleFreeClosedPolylineMinimumSetSeparationFR88(
      { contourRef: 'outer', points: OUTER },
      { contourRef: 'inner', points: INNER },
    );

    expect(result).toMatchObject({
      schemaVersion: 'fr88-role-free-minimum-set-separation-computation-v1',
      authorityState: 'pure_coordinate_closed_polyline_minimum_separation_only',
      functionalRef: 'fr88:role-free-minimum-set-separation@0.1.0',
      functional: 'minimum_set_separation',
      runtimeAlgorithm: 'minimum_over_all_closed_polyline_segment_pair_euclidean_distances',
      numericPolicy: 'ieee754_double_deterministic_segment_pair_minimum_no_empirical_tolerance',
      continuousPolylineInterpretation: true,
      discreteVertexOnlyApproximationUsed: false,
      segmentPairCount: 16,
      minimumSeparation: 3,
      valueIsZero: false,
      explicitPointPairCorrespondenceRequired: false,
      explicitPointPairCorrespondenceIssued: false,
      anatomicalRolesRequired: false,
      anatomicalRolesIssued: 0,
      empiricalToleranceApplied: false,
      calibrationThresholdApplied: false,
      thicknessMetricIssued: false,
      traditionalSemanticAuthority: false,
    });
  });

  it('returns zero when continuous segments cross even though no vertices coincide', () => {
    const crossing = [
      { x: -1, y: 4 },
      { x: 5, y: 4 },
      { x: 5, y: 6 },
      { x: -1, y: 6 },
    ] as const;

    const result = computeRoleFreeClosedPolylineMinimumSetSeparationFR88(
      { contourRef: 'outer', points: OUTER },
      { contourRef: 'crossing', points: crossing },
    );

    expect(result.minimumSeparation).toBe(0);
    expect(result.valueIsZero).toBe(true);
    expect(result.discreteVertexOnlyApproximationUsed).toBe(false);
  });

  it('is invariant to contour swap, cycle start rotation, and cycle orientation', () => {
    const baseline = computeRoleFreeClosedPolylineMinimumSetSeparationFR88(
      { contourRef: 'a', points: OUTER },
      { contourRef: 'b', points: INNER },
    );
    const swapped = computeRoleFreeClosedPolylineMinimumSetSeparationFR88(
      { contourRef: 'b', points: INNER },
      { contourRef: 'a', points: OUTER },
    );
    const rotated = computeRoleFreeClosedPolylineMinimumSetSeparationFR88(
      { contourRef: 'a', points: rotate(OUTER, 2) },
      { contourRef: 'b', points: rotate(INNER, 1) },
    );
    const reversed = computeRoleFreeClosedPolylineMinimumSetSeparationFR88(
      { contourRef: 'a', points: [...OUTER].reverse() },
      { contourRef: 'b', points: [...INNER].reverse() },
    );

    expect(swapped.minimumSeparation).toBe(baseline.minimumSeparation);
    expect(rotated.minimumSeparation).toBe(baseline.minimumSeparation);
    expect(reversed.minimumSeparation).toBe(baseline.minimumSeparation);
  });

  it('computes disjoint boundary separation without requiring nesting or anatomical roles', () => {
    const right = [
      { x: 20, y: 0 },
      { x: 30, y: 0 },
      { x: 30, y: 10 },
      { x: 20, y: 10 },
    ] as const;

    const result = computeRoleFreeClosedPolylineMinimumSetSeparationFR88(
      { contourRef: 'left', points: OUTER },
      { contourRef: 'right', points: right },
    );

    expect(result.minimumSeparation).toBe(10);
    expect(result.anatomicalRolesIssued).toBe(0);
    expect(result.explicitPointPairCorrespondenceIssued).toBe(false);
  });

  it('requires an actually issued FR79 source before the governed wrapper can run', () => {
    const forged = {
      schemaVersion: 'fr79-pose-normalized-lips-geometry-v1',
      artifactVersion: '0.1.0',
      authorityState: 'governed_pose_normalized_lips_geometry_candidate_only',
    } as unknown as PoseNormalizedLipsGeometryFR79V1;

    expect(() => evaluateIssuedPoseNormalizedLipsMinimumSetSeparationFR88(forged))
      .toThrow(/not issued by the active FR-79 projection boundary/u);
  });

  it('rejects structurally plausible but unissued governed FR88 output', () => {
    const forged = {
      schemaVersion: 'fr88-governed-role-free-minimum-set-separation-v1',
      authorityState: 'governed_role_free_minimum_boundary_separation_geometry_only',
    } as unknown as GovernedRoleFreeMinimumSetSeparationFR88V1;

    expect(() => assertIssuedGovernedRoleFreeMinimumSetSeparationFR88(forged))
      .toThrow(/not issued by the active FR-88 boundary/u);
  });
});