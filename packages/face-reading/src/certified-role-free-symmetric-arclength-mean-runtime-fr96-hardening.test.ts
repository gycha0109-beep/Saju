import { describe, expect, it } from 'vitest';
import {
  computeCertifiedRoleFreeSymmetricArclengthMeanFR96,
} from './certified-role-free-symmetric-arclength-mean-runtime-fr96.js';

describe('FR96 certified symmetric arclength runtime hardening', () => {
  it('is invariant to closed-cycle start rotation and orientation', () => {
    const leftPoints = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 0, y: 1 },
    ] as const;
    const rightPoints = [
      { x: 0, y: 3 },
      { x: 1, y: 3 },
      { x: 1, y: 4 },
      { x: 0, y: 4 },
    ] as const;

    const baseline = computeCertifiedRoleFreeSymmetricArclengthMeanFR96(
      { contourRef: 'left', points: leftPoints },
      { contourRef: 'right', points: rightPoints },
    );
    const rotated = computeCertifiedRoleFreeSymmetricArclengthMeanFR96(
      { contourRef: 'left', points: [leftPoints[2], leftPoints[3], leftPoints[0], leftPoints[1]] },
      { contourRef: 'right', points: [rightPoints[1], rightPoints[2], rightPoints[3], rightPoints[0]] },
    );
    const reversed = computeCertifiedRoleFreeSymmetricArclengthMeanFR96(
      { contourRef: 'left', points: [leftPoints[0], leftPoints[3], leftPoints[2], leftPoints[1]] },
      { contourRef: 'right', points: [rightPoints[0], rightPoints[3], rightPoints[2], rightPoints[1]] },
    );

    for (const candidate of [rotated, reversed]) {
      expect(candidate.symmetricLower).toEqual(baseline.symmetricLower);
      expect(candidate.symmetricUpper).toEqual(baseline.symmetricUpper);
      expect(candidate.symmetricPointEstimate).toEqual(baseline.symmetricPointEstimate);
      expect(candidate.symmetricAbsoluteErrorCertificate).toEqual(baseline.symmetricAbsoluteErrorCertificate);
    }
  });

  it('does not expose target segment identity or correspondence pairs', () => {
    const result = computeCertifiedRoleFreeSymmetricArclengthMeanFR96(
      { contourRef: 'a', points: [{ x: 0, y: 0 }, { x: 1, y: 0 }] },
      { contourRef: 'b', points: [{ x: 0, y: 2 }, { x: 1, y: 2 }] },
    );

    for (const directed of [result.directedAtoB, result.directedBtoA]) {
      expect(directed.providerSegmentIdentityUsedForTieBreak).toBe(false);
      expect(directed.crossContourCorrespondencePairsIssued).toBe(0);
      expect(Object.keys(directed)).not.toContain('closestSegmentIndex');
      expect(Object.keys(directed)).not.toContain('closestPoint');
      expect(Object.keys(directed)).not.toContain('correspondencePairs');
    }
    expect(result.explicitPointPairCorrespondenceIssued).toBe(false);
  });

  it('keeps numerical controls separate from calibration and traditional semantics', () => {
    const result = computeCertifiedRoleFreeSymmetricArclengthMeanFR96(
      { contourRef: 'a', points: [{ x: 0, y: 0 }, { x: 1, y: 0 }] },
      { contourRef: 'b', points: [{ x: 0, y: 1 }, { x: 1, y: 1 }] },
    );

    expect(result.empiricalToleranceApplied).toBe(false);
    expect(result.calibrationThresholdApplied).toBe(false);
    expect(result.thicknessMetricIssued).toBe(false);
    expect(result.traditionalSemanticAuthority).toBe(false);
    expect(result.directedAtoB.finalSqrtPrecisionBits).toBeGreaterThanOrEqual(0);
    expect(result.directedBtoA.finalSqrtPrecisionBits).toBeGreaterThanOrEqual(0);
  });

  it('fails closed on malformed or widened coordinate points', () => {
    expect(() => computeCertifiedRoleFreeSymmetricArclengthMeanFR96(
      { contourRef: 'a', points: [{ x: 0, y: 0 }, { x: Number.NaN, y: 1 }] },
      { contourRef: 'b', points: [{ x: 0, y: 1 }, { x: 1, y: 1 }] },
    )).toThrow(/finite x\/y/u);

    expect(() => computeCertifiedRoleFreeSymmetricArclengthMeanFR96(
      { contourRef: 'a', points: [{ x: 0, y: 0, z: 0 } as never, { x: 1, y: 0 }] },
      { contourRef: 'b', points: [{ x: 0, y: 1 }, { x: 1, y: 1 }] },
    )).toThrow(/unauthorized field z/u);

    expect(() => computeCertifiedRoleFreeSymmetricArclengthMeanFR96(
      { contourRef: 'a', points: [{ x: 0, y: 0 }] },
      { contourRef: 'b', points: [{ x: 0, y: 1 }, { x: 1, y: 1 }] },
    )).toThrow(/at least two points/u);
  });
});
