import { describe, expect, it } from 'vitest';
import {
  computeCertifiedRoleFreeSymmetricArclengthMeanFR96,
} from './certified-role-free-symmetric-arclength-mean-runtime-fr96.js';
import {
  compareExactRationalsFR94,
  makeExactRationalFR94,
} from './exact-rational-distance-enclosure-primitives-runtime-fr94.js';

const source = Object.freeze({
  contourRef: 'source',
  points: Object.freeze([{ x: 0, y: 0 }, { x: 1, y: 0 }]),
});
const target = Object.freeze({
  contourRef: 'target',
  points: Object.freeze([{ x: 0, y: 1 }, { x: 1, y: 1 }]),
});

describe('FR96 certified role-free symmetric arclength mean runtime', () => {
  it('certifies the constant unit separation between parallel closed two-point polylines', () => {
    const result = computeCertifiedRoleFreeSymmetricArclengthMeanFR96(source, target);
    const exactOne = makeExactRationalFR94(1n);

    expect(compareExactRationalsFR94(result.symmetricLower, exactOne)).toBeLessThanOrEqual(0);
    expect(compareExactRationalsFR94(result.symmetricUpper, exactOne)).toBeGreaterThanOrEqual(0);
    expect(result.exactTruthContainedInInterval).toBe(true);
    expect(result.fr91SymmetricBudgetCertified).toBe(true);
    expect(compareExactRationalsFR94(
      result.symmetricAbsoluteErrorCertificate,
      result.conservativeFR91SymmetricBudget,
    )).toBeLessThanOrEqual(0);
    expect(result.directedAtoB.additionalStrictSlackSubdivisionBatchApplied).toBe(true);
    expect(result.directedBtoA.additionalStrictSlackSubdivisionBatchApplied).toBe(true);
    expect(result.directedAtoB.finalLeafCount).toBeGreaterThan(result.directedAtoB.initialSourceSegmentCount);
    expect(result.directedAtoB.finalSqrtPrecisionBits).toBeGreaterThanOrEqual(0);
  });

  it('keeps directed certificates inside their conservative FR91 budgets', () => {
    const result = computeCertifiedRoleFreeSymmetricArclengthMeanFR96(source, target);
    for (const directed of [result.directedAtoB, result.directedBtoA]) {
      expect(directed.exactTruthContainedInInterval).toBe(true);
      expect(directed.fr91DirectedBudgetCertified).toBe(true);
      expect(compareExactRationalsFR94(
        directed.absoluteErrorCertificate,
        directed.conservativeFR91Budget,
      )).toBeLessThanOrEqual(0);
      expect(directed.providerSegmentIdentityUsedForTieBreak).toBe(false);
      expect(directed.crossContourCorrespondencePairsIssued).toBe(0);
    }
  });

  it('is symmetric under contour swap', () => {
    const forward = computeCertifiedRoleFreeSymmetricArclengthMeanFR96(source, target);
    const swapped = computeCertifiedRoleFreeSymmetricArclengthMeanFR96(target, source);

    expect(swapped.symmetricLower).toEqual(forward.symmetricLower);
    expect(swapped.symmetricUpper).toEqual(forward.symmetricUpper);
    expect(swapped.symmetricPointEstimate).toEqual(forward.symmetricPointEstimate);
    expect(swapped.symmetricAbsoluteErrorCertificate).toEqual(forward.symmetricAbsoluteErrorCertificate);
    expect(swapped.conservativeFR91SymmetricBudget).toEqual(forward.conservativeFR91SymmetricBudget);
  });

  it('issues only a role-free geometry functional computation', () => {
    const result = computeCertifiedRoleFreeSymmetricArclengthMeanFR96(source, target);

    expect(result.functional).toBe('symmetric_arclength_mean_nearest_set_distance');
    expect(result.explicitPointPairCorrespondenceRequired).toBe(false);
    expect(result.explicitPointPairCorrespondenceIssued).toBe(false);
    expect(result.anatomicalRolesRequired).toBe(false);
    expect(result.empiricalToleranceApplied).toBe(false);
    expect(result.calibrationThresholdApplied).toBe(false);
    expect(result.thicknessMetricIssued).toBe(false);
    expect(result.traditionalSemanticAuthority).toBe(false);
    expect(result.valueCoordinateUnit).toBe('source_coordinate_unit');
  });

  it('rejects duplicate contour refs and degenerate source perimeter', () => {
    expect(() => computeCertifiedRoleFreeSymmetricArclengthMeanFR96(
      { ...source, contourRef: 'same' },
      { ...target, contourRef: 'same' },
    )).toThrow(/references must be distinct/u);

    expect(() => computeCertifiedRoleFreeSymmetricArclengthMeanFR96(
      { contourRef: 'zero', points: [{ x: 0, y: 0 }, { x: 0, y: 0 }] },
      target,
    )).toThrow(/perimeter must be non-zero/u);
  });
});
