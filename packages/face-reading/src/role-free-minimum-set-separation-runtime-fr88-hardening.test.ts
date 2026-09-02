import { describe, expect, it } from 'vitest';
import {
  computeRoleFreeClosedPolylineMinimumSetSeparationFR88,
} from './role-free-minimum-set-separation-runtime-fr88.js';

const BASE = [
  { x: 0, y: 0 },
  { x: 4, y: 0 },
  { x: 4, y: 4 },
  { x: 0, y: 4 },
] as const;

describe('FR88 role-free minimum set separation hardening', () => {
  it('does not collapse a tiny positive separation through an empirical tolerance', () => {
    const epsilon = 1e-12;
    const near = [
      { x: 4 + epsilon, y: 0 },
      { x: 8 + epsilon, y: 0 },
      { x: 8 + epsilon, y: 4 },
      { x: 4 + epsilon, y: 4 },
    ] as const;

    const result = computeRoleFreeClosedPolylineMinimumSetSeparationFR88(
      { contourRef: 'base', points: BASE },
      { contourRef: 'near', points: near },
    );

    expect(result.minimumSeparation).toBeGreaterThan(0);
    expect(result.valueIsZero).toBe(false);
    expect(result.empiricalToleranceApplied).toBe(false);
    expect(result.calibrationThresholdApplied).toBe(false);
  });

  it('handles zero-length segments deterministically without inventing a rejection threshold', () => {
    const withDuplicate = [
      { x: 10, y: 0 },
      { x: 10, y: 0 },
      { x: 14, y: 0 },
      { x: 14, y: 4 },
      { x: 10, y: 4 },
    ] as const;

    const result = computeRoleFreeClosedPolylineMinimumSetSeparationFR88(
      { contourRef: 'base', points: BASE },
      { contourRef: 'duplicate-edge', points: withDuplicate },
    );

    expect(result.minimumSeparation).toBe(6);
    expect(result.segmentPairCount).toBe(20);
  });

  it('rejects non-finite coordinates, unauthorized point fields, and same contour references', () => {
    expect(() => computeRoleFreeClosedPolylineMinimumSetSeparationFR88(
      { contourRef: 'a', points: BASE },
      { contourRef: 'b', points: [{ x: Number.NaN, y: 0 }, { x: 1, y: 0 }] },
    )).toThrow(/finite x\/y/u);

    expect(() => computeRoleFreeClosedPolylineMinimumSetSeparationFR88(
      { contourRef: 'a', points: BASE },
      { contourRef: 'b', points: [{ x: 0, y: 0, z: 1 }, { x: 1, y: 0, z: 1 }] as never },
    )).toThrow(/unauthorized field z/u);

    expect(() => computeRoleFreeClosedPolylineMinimumSetSeparationFR88(
      { contourRef: 'same', points: BASE },
      { contourRef: 'same', points: BASE },
    )).toThrow(/references must be distinct/u);
  });

  it('keeps the output free of thickness, anatomical, criterion-state, and traditional claims', () => {
    const other = [
      { x: 6, y: 1 },
      { x: 8, y: 1 },
      { x: 8, y: 3 },
      { x: 6, y: 3 },
    ] as const;

    const result = computeRoleFreeClosedPolylineMinimumSetSeparationFR88(
      { contourRef: 'a', points: BASE },
      { contourRef: 'b', points: other },
    );
    const serialized = JSON.stringify(result);

    expect(result.thicknessMetricIssued).toBe(false);
    expect(result.anatomicalRolesIssued).toBe(0);
    expect(result.traditionalSemanticAuthority).toBe(false);
    expect(serialized).not.toContain('outerLip');
    expect(serialized).not.toContain('innerLip');
    expect(serialized).not.toContain('traditionalCriterionState');
    expect(serialized).not.toContain('lipsSubstantialState');
  });
});