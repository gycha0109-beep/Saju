import { describe, expect, it } from 'vitest';
import {
  FR24_EYE_TOPOLOGY_SERIALIZATION_ORDER,
  FR24_EYE_TOPOLOGY_WITNESS_EDGES,
} from './face-eye-pair-research-bridge-fr24.js';
import type { GovernedMetricGeometryCandidateFR77V1 } from './governed-metric-geometry-runtime-fr77.js';
import type { PoseNormalizedLipsGeometryFR79V1 } from './pose-normalized-lips-geometry-fr79.js';
import { orderClosedCycleProviderVerticesFR16 } from './provider-adapter-evidence-fr16.js';
import {
  FR209_STATIC_UNAVAILABLE_SLOTS,
  adaptGovernedGeometryToFR208FR209,
  deriveEyeOuterCornerTiltInputFromMetricGeometryFR209,
  deriveMouthCornerElevationInputFromContourUnionFR209,
  deriveMouthCornerElevationInputFromIssuedFR79FR209,
} from './governed-geometry-to-fr208-adapter-fr209.js';
import {
  computeEyeOuterCornerTiltFR208,
  computeMouthCornerElevationFR208,
} from './cross-face-neutral-observable-primitives-fr208.js';

function eyeFixture() {
  const points = Array.from({ length: 468 }, () => ({ x: 0, y: 0, z: 0 }));
  points[1] = { x: -5, y: 0, z: 0 };
  points[2] = { x: 5, y: 0, z: 0 };

  const cycles = FR24_EYE_TOPOLOGY_SERIALIZATION_ORDER.map((symbol) =>
    orderClosedCycleProviderVerticesFR16(FR24_EYE_TOPOLOGY_WITNESS_EDGES[symbol]),
  );
  const negative = cycles[0]!;
  const positive = cycles[1]!;

  negative.forEach((vertex, index) => {
    const t = index / (negative.length - 1);
    points[vertex] = {
      x: -2 + t,
      y: index === 0 ? 1 : index === negative.length - 1 ? 0 : 0.4,
      z: 0,
    };
  });
  positive.forEach((vertex, index) => {
    const t = index / (positive.length - 1);
    points[vertex] = {
      x: 1 + t,
      y: index === 0 ? 0 : index === positive.length - 1 ? 1 : 0.4,
      z: 0,
    };
  });

  return points;
}

describe('FR209 governed geometry to FR208 adapter', () => {
  it('derives role-invariant eye extrema around the mesh midline and feeds FR208', () => {
    const derived = deriveEyeOuterCornerTiltInputFromMetricGeometryFR209(eyeFixture());
    expect(derived.status).toBe('available');
    if (derived.status !== 'available') return;

    const result = computeEyeOuterCornerTiltFR208(derived.input);
    expect(result.mean.value).toBeGreaterThan(0);
    expect(result.mean.classificationApplied).toBe(false);
    expect(result.mean.traditionalBindingApplied).toBe(false);
    expect(result.mean.anatomicalInterpretationAllowed).toBe(false);
    expect(derived.input.sourceObservationRefs).toContain(
      'fr209:role_invariant_cycle_extrema_relative_to_mesh_midline',
    );
  });

  it('returns unavailable instead of guessing when both eye cycles fall on the same mesh side', () => {
    const points = eyeFixture();
    const cycles = FR24_EYE_TOPOLOGY_SERIALIZATION_ORDER.map((symbol) =>
      orderClosedCycleProviderVerticesFR16(FR24_EYE_TOPOLOGY_WITNESS_EDGES[symbol]),
    );
    cycles[1]!.forEach((vertex, index) => {
      points[vertex] = { x: -4 + index / 100, y: 0.2, z: 0 };
    });

    expect(deriveEyeOuterCornerTiltInputFromMetricGeometryFR209(points)).toEqual({
      status: 'unavailable',
      reason: 'eye_cycles_not_bilateral_around_mesh_midline',
    });
  });

  it('derives mouth X-extrema plus union bounding-box center without outer/inner contour roles', () => {
    const derived = deriveMouthCornerElevationInputFromContourUnionFR209(
      [
        { x: -2, y: 1 },
        { x: -1, y: 2 },
        { x: 0, y: -2 },
        { x: 1, y: 2 },
        { x: 2, y: 1 },
      ],
      ['fr79:contour:1', 'fr79:contour:2', 'fr209:bbox-center'],
    );
    expect(derived.status).toBe('available');
    if (derived.status !== 'available') return;

    expect(derived.input.visibleMouthCenter).toEqual({ x: 0, y: 0 });
    const result = computeMouthCornerElevationFR208(derived.input);
    expect(result.mean.value).toBeCloseTo(0.25, 8);
    expect(result.mean.anatomicalInterpretationAllowed).toBe(false);
  });

  it('returns unavailable when mouth horizontal extrema are ambiguous', () => {
    expect(deriveMouthCornerElevationInputFromContourUnionFR209(
      [
        { x: -2, y: 1 },
        { x: -2, y: 0 },
        { x: 2, y: 1 },
        { x: 2, y: 0 },
      ],
      ['fr209:test'],
    )).toEqual({
      status: 'unavailable',
      reason: 'mouth_horizontal_extrema_ambiguous',
    });
  });

  it('keeps unsupported brow, mid-face, and lower-face paths explicitly unavailable', () => {
    expect(FR209_STATIC_UNAVAILABLE_SLOTS).toEqual({
      eyebrow: {
        status: 'unavailable',
        primitiveKey: 'eyebrow_visible_span_arch_and_lateral_tilt',
        reason: 'neutral_brow_curve_not_authorized',
        fallbackInvented: false,
      },
      midfaceWidth: {
        status: 'unavailable',
        primitiveKey: 'visible_midface_width_ratio',
        reason: 'governed_midface_band_not_authorized',
        fallbackInvented: false,
      },
      lowerFaceWidth: {
        status: 'unavailable',
        primitiveKey: 'visible_lower_face_width_ratio',
        reason: 'canonical_lower_face_projection_not_authorized',
        fallbackInvented: false,
      },
    });
  });

  it('rejects forged/unissued FR77 and FR79 sources', () => {
    expect(() => adaptGovernedGeometryToFR208FR209(
      {} as GovernedMetricGeometryCandidateFR77V1,
    )).toThrow(/not issued by the active FR-77 runtime boundary/u);

    expect(() => deriveMouthCornerElevationInputFromIssuedFR79FR209(
      {} as PoseNormalizedLipsGeometryFR79V1,
    )).toThrow(/not issued by the active FR-79 projection boundary/u);
  });
});
