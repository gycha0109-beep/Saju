import { describe, expect, it } from 'vitest';
import {
  assertIssuedExactRationalDistanceEnclosurePrimitivesRuntimeFR94,
  compareExactRationalsFR94,
  exactBinary64ToRationalFR94,
  exactNearestClosedPolylineSquaredDistanceFR94,
  exactRationalPointFromBinary64FR94,
  exactRationalPointToSegmentSquaredDistanceFR94,
  floorSqrtBigIntFR94,
  getExactRationalDistanceEnclosurePrimitivesRuntimeFR94,
  makeExactRationalFR94,
  rationalSqrtOutwardEnclosureFR94,
  type ExactRationalDistanceEnclosurePrimitivesRuntimeFR94V1,
} from './exact-rational-distance-enclosure-primitives-runtime-fr94.js';

describe('FR94 exact rational distance enclosure primitive runtime', () => {
  it('recovers finite binary64 values exactly as reduced rationals', () => {
    expect(exactBinary64ToRationalFR94(0)).toEqual({ numerator: 0n, denominator: 1n });
    expect(exactBinary64ToRationalFR94(-0)).toEqual({ numerator: 0n, denominator: 1n });
    expect(exactBinary64ToRationalFR94(0.5)).toEqual({ numerator: 1n, denominator: 2n });
    expect(exactBinary64ToRationalFR94(-1.5)).toEqual({ numerator: -3n, denominator: 2n });
    expect(exactBinary64ToRationalFR94(0.1)).toEqual({
      numerator: 3602879701896397n,
      denominator: 36028797018963968n,
    });
    expect(exactBinary64ToRationalFR94(Number.MIN_VALUE)).toEqual({
      numerator: 1n,
      denominator: 1n << 1074n,
    });
  });

  it('rejects non-finite binary64 values', () => {
    expect(() => exactBinary64ToRationalFR94(Number.NaN)).toThrow(/must be finite/u);
    expect(() => exactBinary64ToRationalFR94(Number.POSITIVE_INFINITY)).toThrow(/must be finite/u);
    expect(() => exactBinary64ToRationalFR94(Number.NEGATIVE_INFINITY)).toThrow(/must be finite/u);
  });

  it('implements all exact point-to-segment squared-distance branches', () => {
    const start = exactRationalPointFromBinary64FR94(0, 0);
    const end = exactRationalPointFromBinary64FR94(2, 0);

    const interior = exactRationalPointToSegmentSquaredDistanceFR94(
      exactRationalPointFromBinary64FR94(1, 1), start, end,
    );
    expect(interior.branch).toBe('interior_projection');
    expect(interior.squaredDistance).toEqual({ numerator: 1n, denominator: 1n });

    const before = exactRationalPointToSegmentSquaredDistanceFR94(
      exactRationalPointFromBinary64FR94(-1, 0), start, end,
    );
    expect(before.branch).toBe('before_start');
    expect(before.squaredDistance).toEqual({ numerator: 1n, denominator: 1n });

    const after = exactRationalPointToSegmentSquaredDistanceFR94(
      exactRationalPointFromBinary64FR94(3, 0), start, end,
    );
    expect(after.branch).toBe('after_end');
    expect(after.squaredDistance).toEqual({ numerator: 1n, denominator: 1n });

    const degenerate = exactRationalPointToSegmentSquaredDistanceFR94(
      exactRationalPointFromBinary64FR94(3, 4), start, start,
    );
    expect(degenerate.branch).toBe('degenerate_segment');
    expect(degenerate.squaredDistance).toEqual({ numerator: 25n, denominator: 1n });

    for (const result of [interior, before, after, degenerate]) {
      expect(result.sqrtApplied).toBe(false);
      expect(result.correspondencePairIssued).toBe(false);
    }
  });

  it('computes nearest closed-polyline squared distance without issuing segment identity', () => {
    const square = [
      exactRationalPointFromBinary64FR94(0, 0),
      exactRationalPointFromBinary64FR94(2, 0),
      exactRationalPointFromBinary64FR94(2, 2),
      exactRationalPointFromBinary64FR94(0, 2),
    ] as const;
    const point = exactRationalPointFromBinary64FR94(1, 1);
    const result = exactNearestClosedPolylineSquaredDistanceFR94(point, square);

    expect(result.squaredDistance).toEqual({ numerator: 1n, denominator: 1n });
    expect(result.targetSegmentCount).toBe(4);
    expect(result.targetSegmentIdentityIssued).toBe(false);
    expect(result.correspondencePairIssued).toBe(false);
    expect(result.sqrtApplied).toBe(false);
    expect(Object.keys(result)).not.toContain('targetSegmentIndex');
    expect(Object.keys(result)).not.toContain('closestPoint');
  });

  it('computes exact bigint floor square roots', () => {
    expect(floorSqrtBigIntFR94(0n)).toBe(0n);
    expect(floorSqrtBigIntFR94(1n)).toBe(1n);
    expect(floorSqrtBigIntFR94(2n)).toBe(1n);
    expect(floorSqrtBigIntFR94(15n)).toBe(3n);
    expect(floorSqrtBigIntFR94(16n)).toBe(4n);
    expect(floorSqrtBigIntFR94((1n << 200n) - 1n)).toBe((1n << 100n) - 1n);
  });

  it('produces certified outward dyadic sqrt enclosures', () => {
    const sqrt2 = rationalSqrtOutwardEnclosureFR94(makeExactRationalFR94(2n), 4);
    expect(sqrt2.lower).toEqual({ numerator: 11n, denominator: 8n });
    expect(sqrt2.upper).toEqual({ numerator: 23n, denominator: 16n });
    expect(sqrt2.width).toEqual({ numerator: 1n, denominator: 16n });
    expect(sqrt2.exact).toBe(false);
    expect(sqrt2.floatingPointSqrtUsed).toBe(false);
    expect(sqrt2.empiricalToleranceApplied).toBe(false);

    const exact = rationalSqrtOutwardEnclosureFR94(makeExactRationalFR94(9n, 4n), 4);
    expect(exact.lower).toEqual({ numerator: 3n, denominator: 2n });
    expect(exact.upper).toEqual({ numerator: 3n, denominator: 2n });
    expect(exact.width).toEqual({ numerator: 0n, denominator: 1n });
    expect(exact.exact).toBe(true);
  });

  it('issues only the primitive runtime and keeps mouth authority closed', () => {
    const runtime = getExactRationalDistanceEnclosurePrimitivesRuntimeFR94();
    assertIssuedExactRationalDistanceEnclosurePrimitivesRuntimeFR94(runtime);

    expect(runtime.primitiveImplementations).toEqual({
      binary64ToExactRational: true,
      exactRationalPointToSegmentSquaredDistance: true,
      exactNearestClosedPolylineSquaredDistance: true,
      bigintFloorSqrt: true,
      rationalSqrtOutwardEnclosure: true,
      implementationCount: 5,
    });
    expect(runtime.implementationDecision).toMatchObject({
      primitiveRuntimeImplementationIssued: true,
      exactBinary64InputRecoveryIssued: true,
      exactSquaredDistanceRuntimeIssued: true,
      certifiedSqrtEnclosureRuntimeIssued: true,
      arclengthMeanRuntimeAuthorized: false,
      arclengthMeanRuntimeValueIssued: false,
      runtimeGeometryFunctionalDefinitionsIssued: 0,
      runtimeGeometryValuesIssued: 0,
    });
    expect(runtime.crossContourCorrespondencePairsIssued).toBe(0);
    expect(runtime.thicknessMetricIssued).toBe(false);
    expect(runtime.physicalAnthropometricInterpretationAuthorized).toBe(false);
    expect(runtime.morphologyProduced).toBe(false);
    expect(runtime.criterionStatesIssued).toBe(0);
    expect(runtime.claimsIssued).toBe(0);
    expect(runtime.traditionalSemanticAuthority).toBe(false);
    expect(runtime.recommendedNextFrontier.frontierKey)
      .toBe('certified_sqrt_enclosure_precision_allocation_and_total_error_composition_review');
  });

  it('rejects structurally plausible but unissued FR94 runtime descriptors', () => {
    const forged = {
      schemaVersion: 'fr94-exact-rational-distance-enclosure-primitives-runtime-v1',
      authorityState: 'exact_rational_distance_enclosure_primitive_runtime_implemented_no_geometry_value_issued',
    } as unknown as ExactRationalDistanceEnclosurePrimitivesRuntimeFR94V1;

    expect(() => assertIssuedExactRationalDistanceEnclosurePrimitivesRuntimeFR94(forged))
      .toThrow(/not issued by the active FR-94 boundary/u);
  });

  it('compares reduced rationals exactly', () => {
    expect(compareExactRationalsFR94(makeExactRationalFR94(1n, 3n), makeExactRationalFR94(2n, 6n))).toBe(0);
    expect(compareExactRationalsFR94(makeExactRationalFR94(-1n, 2n), makeExactRationalFR94(0n))).toBe(-1);
    expect(compareExactRationalsFR94(makeExactRationalFR94(7n, 4n), makeExactRationalFR94(3n, 2n))).toBe(1);
  });
});
