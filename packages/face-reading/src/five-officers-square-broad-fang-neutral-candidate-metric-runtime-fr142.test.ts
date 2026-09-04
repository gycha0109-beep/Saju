import { describe, expect, it } from 'vitest';
import type { PoseNormalizedLipsGeometryFR79V1 } from './pose-normalized-lips-geometry-fr79.js';
import {
  FR142_NEXT_FRONTIER,
  computeSquareBroadFangNeutralCandidateKernelFR142,
  computeSquareBroadFangNeutralCandidateMetricsFR142,
  getSquareBroadFangNeutralCandidateMetricDefinitionsFR142,
  type NeutralClosedCyclePointFR142V1,
} from './five-officers-square-broad-fang-neutral-candidate-metric-runtime-fr142.js';
import {
  assessSquareBroadFangSourceLineageConstructRefinementFR141,
  assertIssuedSquareBroadFangSourceLineageConstructRefinementFR141,
} from './five-officers-square-broad-fang-source-lineage-construct-refinement-fr141.js';

function ellipse(scaleX: number, scaleY: number): readonly NeutralClosedCyclePointFR142V1[] {
  return Object.freeze(Array.from({ length: 20 }, (_, index) => {
    const theta = (2 * Math.PI * index) / 20;
    return Object.freeze({ x: scaleX * Math.cos(theta), y: scaleY * Math.sin(theta) });
  }));
}

function rectangle(scale: number): readonly NeutralClosedCyclePointFR142V1[] {
  const corners = [
    [-2 * scale, -scale],
    [2 * scale, -scale],
    [2 * scale, scale],
    [-2 * scale, scale],
  ] as const;
  const points: NeutralClosedCyclePointFR142V1[] = [];
  for (let side = 0; side < 4; side += 1) {
    const start = corners[side]!;
    const end = corners[(side + 1) % 4]!;
    for (let step = 0; step < 5; step += 1) {
      const t = step / 5;
      points.push(Object.freeze({
        x: start[0] + ((end[0] - start[0]) * t),
        y: start[1] + ((end[1] - start[1]) * t),
      }));
    }
  }
  return Object.freeze(points);
}

function rotateStart<T>(values: readonly T[], shift: number): readonly T[] {
  return Object.freeze([...values.slice(shift), ...values.slice(0, shift)]);
}

function reverseCycle<T>(values: readonly T[]): readonly T[] {
  return Object.freeze([...values].reverse());
}

function expectKernelClose(
  left: ReturnType<typeof computeSquareBroadFangNeutralCandidateKernelFR142>,
  right: ReturnType<typeof computeSquareBroadFangNeutralCandidateKernelFR142>,
): void {
  expect(left.horizontalReflectionNearestSetResidualRatio)
    .toBeCloseTo(right.horizontalReflectionNearestSetResidualRatio, 12);
  expect(left.orthogonalEdgeOrientationConcentration)
    .toBeCloseTo(right.orthogonalEdgeOrientationConcentration, 12);
  expect(left.turningAngleConcentrationIndex)
    .toBeCloseTo(right.turningAngleConcentrationIndex, 12);
}

describe('FR142 square-broad 方 neutral candidate metric runtime', () => {
  it('defines three continuous neutral candidates with no traditional binding or threshold', () => {
    const definitions = getSquareBroadFangNeutralCandidateMetricDefinitionsFR142();
    expect(definitions.map((definition) => definition.metricRef)).toEqual([
      'neutral.mouth.contour_set.horizontal_reflection_nearest_set_residual_ratio@0.1.0',
      'neutral.mouth.contour_set.orthogonal_edge_orientation_concentration@0.1.0',
      'neutral.mouth.contour_set.turning_angle_concentration_index@0.1.0',
    ]);
    expect(definitions.map((definition) => definition.candidateFamily)).toEqual([
      'structural_regularity_and_alignment',
      'rectilinear_segment_persistence_continuous_surrogate',
      'localized_corner_distinctness_supporting_later_commentary',
    ]);
    for (const definition of definitions) {
      expect(definition.unit).toBe('ratio');
      expect(definition.cycleStartInvariant).toBe(true);
      expect(definition.cycleDirectionInvariant).toBe(true);
      expect(definition.providerComponentOrderInvariant).toBe(true);
      expect(definition.outerInnerAnatomicalRoleRequired).toBe(false);
      expect(definition.providerVertexIdentityRequired).toBe(false);
      expect(definition.namedMouthCornerRequired).toBe(false);
      expect(definition.numericClassificationThreshold).toBeNull();
      expect(definition.traditionalCriterionBindingRef).toBeNull();
      expect(definition.calibrationRef).toBeNull();
    }
  });

  it('preserves the FR141 lineage conflict and research-only boundary', () => {
    const predecessor = assessSquareBroadFangSourceLineageConstructRefinementFR141();
    assertIssuedSquareBroadFangSourceLineageConstructRefinementFR141(predecessor);
    expect(predecessor.sourceLineageFindings.taxonomyConflictPresent).toBe(true);
    expect(predecessor.sourceLineageFindings.fangEqualsSiziKouEstablished).toBe(false);
    expect(predecessor.sourceLineageFindings.fourCornerFangLengIsPrimaryTargetDefinition).toBe(false);
    expect(predecessor.humanReviewTrack.humanSemanticCollectionAuthorized).toBe(false);
    expect(predecessor.execution.traditionalMetricBindingsIssued).toBe(0);
  });

  it('is invariant to cyclic start, traversal reversal, and unordered component swap', () => {
    const first = ellipse(2, 0.8);
    const second = ellipse(1.5, 0.55);
    const baseline = computeSquareBroadFangNeutralCandidateKernelFR142([first, second]);
    const shifted = computeSquareBroadFangNeutralCandidateKernelFR142([
      rotateStart(first, 7),
      rotateStart(second, 13),
    ]);
    const reversed = computeSquareBroadFangNeutralCandidateKernelFR142([
      reverseCycle(first),
      reverseCycle(second),
    ]);
    const swapped = computeSquareBroadFangNeutralCandidateKernelFR142([second, first]);

    expectKernelClose(baseline, shifted);
    expectKernelClose(baseline, reversed);
    expectKernelClose(baseline, swapped);
  });

  it('produces finite continuous statistics and distinguishes a rectilinear synthetic contour from an ellipse', () => {
    const rectangular = computeSquareBroadFangNeutralCandidateKernelFR142([
      rectangle(1),
      rectangle(0.7),
    ]);
    const elliptical = computeSquareBroadFangNeutralCandidateKernelFR142([
      ellipse(2, 1),
      ellipse(1.4, 0.7),
    ]);

    for (const value of Object.values(rectangular)) {
      expect(Number.isFinite(value)).toBe(true);
      expect(value).toBeGreaterThanOrEqual(0);
    }
    expect(rectangular.orthogonalEdgeOrientationConcentration)
      .toBeGreaterThan(elliptical.orthogonalEdgeOrientationConcentration);
    expect(rectangular.turningAngleConcentrationIndex)
      .toBeGreaterThan(elliptical.turningAngleConcentrationIndex);
  });

  it('rejects structurally plausible but unissued FR79 geometry before runtime issuance', () => {
    const forged = {
      schemaVersion: 'fr79-pose-normalized-lips-geometry-v1',
      artifactVersion: '0.1.0',
      authorityState: 'governed_pose_normalized_lips_geometry_candidate_only',
    } as unknown as PoseNormalizedLipsGeometryFR79V1;

    expect(() => computeSquareBroadFangNeutralCandidateMetricsFR142(forged)).toThrow(/FR-79|FR-142/u);
  });

  it('keeps the next frontier at measurement verification rather than traditional binding', () => {
    expect(FR142_NEXT_FRONTIER).toBe(
      'square_broad_fang_neutral_candidate_metric_repeatability_and_synthetic_geometry_discrimination_without_traditional_binding',
    );
  });
});
