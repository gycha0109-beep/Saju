import { describe, expect, it } from 'vitest';
import {
  exactBinary64ToRationalFR94,
  exactNearestClosedPolylineSquaredDistanceFR94,
  exactRationalPointFromBinary64FR94,
  exactRationalPointToSegmentSquaredDistanceFR94,
  floorSqrtBigIntFR94,
  getExactRationalDistanceEnclosurePrimitivesRuntimeFR94,
  makeExactRationalFR94,
  rationalSqrtOutwardEnclosureFR94,
} from './exact-rational-distance-enclosure-primitives-runtime-fr94.js';

describe('FR94 exact rational primitive runtime hardening', () => {
  it('canonicalizes rational signs and zero without decimal reconstruction', () => {
    expect(makeExactRationalFR94(2n, -4n)).toEqual({ numerator: -1n, denominator: 2n });
    expect(makeExactRationalFR94(-2n, -4n)).toEqual({ numerator: 1n, denominator: 2n });
    expect(makeExactRationalFR94(0n, -999n)).toEqual({ numerator: 0n, denominator: 1n });
    expect(() => makeExactRationalFR94(1n, 0n)).toThrow(/denominator must be non-zero/u);
    expect(exactBinary64ToRationalFR94(0.1)).not.toEqual({ numerator: 1n, denominator: 10n });
  });

  it('keeps nearest closed-polyline squared distance invariant under cycle rotation and reversal', () => {
    const point = exactRationalPointFromBinary64FR94(1, 1);
    const a = exactRationalPointFromBinary64FR94(0, 0);
    const b = exactRationalPointFromBinary64FR94(3, 0);
    const c = exactRationalPointFromBinary64FR94(3, 2);
    const d = exactRationalPointFromBinary64FR94(0, 2);

    const baseline = exactNearestClosedPolylineSquaredDistanceFR94(point, [a, b, c, d]);
    const rotated = exactNearestClosedPolylineSquaredDistanceFR94(point, [c, d, a, b]);
    const reversed = exactNearestClosedPolylineSquaredDistanceFR94(point, [a, d, c, b]);

    expect(rotated.squaredDistance).toEqual(baseline.squaredDistance);
    expect(reversed.squaredDistance).toEqual(baseline.squaredDistance);
    expect(rotated.targetSegmentIdentityIssued).toBe(false);
    expect(reversed.targetSegmentIdentityIssued).toBe(false);
  });

  it('does not turn exact nearest-segment geometry into a correspondence artifact', () => {
    const point = exactRationalPointFromBinary64FR94(1, 1);
    const result = exactNearestClosedPolylineSquaredDistanceFR94(point, [
      exactRationalPointFromBinary64FR94(0, 0),
      exactRationalPointFromBinary64FR94(2, 0),
      exactRationalPointFromBinary64FR94(2, 2),
      exactRationalPointFromBinary64FR94(0, 2),
    ]);

    expect(result.correspondencePairIssued).toBe(false);
    expect(result.targetSegmentIdentityIssued).toBe(false);
    expect(JSON.stringify(result, (_key, value) => typeof value === 'bigint' ? value.toString() : value))
      .not.toMatch(/segmentIndex|closestPoint|outer|inner|thickness|traditional/ui);
  });

  it('rejects invalid sqrt precision and negative domains rather than applying an epsilon repair', () => {
    expect(() => rationalSqrtOutwardEnclosureFR94(makeExactRationalFR94(-1n), 8))
      .toThrow(/must be non-negative/u);
    expect(() => rationalSqrtOutwardEnclosureFR94(makeExactRationalFR94(2n), -1))
      .toThrow(/non-negative safe integer/u);
    expect(() => rationalSqrtOutwardEnclosureFR94(makeExactRationalFR94(2n), 1.5))
      .toThrow(/non-negative safe integer/u);
    expect(() => rationalSqrtOutwardEnclosureFR94(makeExactRationalFR94(2n), Number.MAX_SAFE_INTEGER + 1))
      .toThrow(/non-negative safe integer/u);
    expect(() => floorSqrtBigIntFR94(-1n)).toThrow(/must be non-negative/u);
  });

  it('preserves the formal width bound at several precision levels', () => {
    const value = makeExactRationalFR94(2n);
    for (const precisionBits of [0, 1, 4, 16, 32]) {
      const enclosure = rationalSqrtOutwardEnclosureFR94(value, precisionBits);
      const maxWidth = makeExactRationalFR94(1n, 1n << BigInt(precisionBits));
      const left = enclosure.width.numerator * maxWidth.denominator;
      const right = maxWidth.numerator * enclosure.width.denominator;
      expect(left <= right).toBe(true);
      expect(enclosure.floatingPointSqrtUsed).toBe(false);
      expect(enclosure.empiricalToleranceApplied).toBe(false);
    }
  });

  it('keeps exact point-to-segment outputs free of anatomy and semantic labels', () => {
    const result = exactRationalPointToSegmentSquaredDistanceFR94(
      exactRationalPointFromBinary64FR94(1, 0.5),
      exactRationalPointFromBinary64FR94(0, 0),
      exactRationalPointFromBinary64FR94(2, 0),
    );
    const serialized = JSON.stringify(result, (_key, value) => typeof value === 'bigint' ? value.toString() : value);
    expect(serialized).not.toMatch(/outer|inner|lipThickness|duan|hou|criterion|morphology/ui);
    expect(result.correspondencePairIssued).toBe(false);
  });

  it('keeps all semantic and anthropometric authority closed on the runtime descriptor', () => {
    const runtime = getExactRationalDistanceEnclosurePrimitivesRuntimeFR94();
    expect(runtime.authorityBoundary).toEqual({
      exactBinary64RecoveryMeansOriginalPhysicalQuantityExact: false,
      exactRationalSquaredDistanceMeansAnatomicalTruth: false,
      nearestTargetSegmentMeansCorrespondencePair: false,
      sqrtEnclosurePrecisionBitsMeanMorphologyThreshold: false,
      certifiedDistanceEnclosureMeansLipThickness: false,
      primitiveRuntimeMeansArclengthMeanMetric: false,
      primitiveRuntimeMeansProductionMetricBinding: false,
      primitiveRuntimeMeansTraditionalDuanHou: false,
    });
    expect(runtime.newlyExposedPrerequisiteBlockers).toEqual([
      'certified_sqrt_enclosure_precision_allocation_not_governed',
      'certified_arclength_mean_total_error_composition_not_governed',
    ]);
    expect(runtime.prohibitedShortcuts).toContain('nearest_target_segment_to_cross_contour_correspondence_pair');
    expect(runtime.prohibitedShortcuts).toContain('certified_distance_enclosure_to_lip_thickness');
    expect(runtime.prohibitedShortcuts).toContain('primitive_runtime_to_traditional_duan_hou_semantics');
  });

  it('rejects an empty target polyline rather than inventing a distance', () => {
    expect(() => exactNearestClosedPolylineSquaredDistanceFR94(
      exactRationalPointFromBinary64FR94(0, 0),
      [],
    )).toThrow(/at least one point/u);
  });
});
