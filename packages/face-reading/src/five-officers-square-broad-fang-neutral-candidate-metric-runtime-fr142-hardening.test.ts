import { describe, expect, it } from 'vitest';
import {
  assertIssuedSquareBroadFangNeutralCandidateMetricRuntimeFR142,
  computeSquareBroadFangNeutralCandidateKernelFR142,
  getSquareBroadFangNeutralCandidateMetricDefinitionsFR142,
  type NeutralClosedCyclePointFR142V1,
  type SquareBroadFangNeutralCandidateMetricRuntimeFR142V1,
} from './five-officers-square-broad-fang-neutral-candidate-metric-runtime-fr142.js';
import { getSquareBroadNeutralShapeMetricDefinitionsFR134 } from './five-officers-square-broad-neutral-shape-metric-runtime-fr134.js';
import { FaceAuthorityValidationError } from './validation.js';

function circle(scale: number): readonly NeutralClosedCyclePointFR142V1[] {
  return Object.freeze(Array.from({ length: 20 }, (_, index) => {
    const theta = (2 * Math.PI * index) / 20;
    return Object.freeze({ x: scale * Math.cos(theta), y: scale * Math.sin(theta) });
  }));
}

describe('FR142 square-broad 方 neutral candidate metric hardening', () => {
  it('rejects forged runtime-shaped objects even when visible authority fields look safe', () => {
    const forged = {
      schemaVersion: 'fr142-square-broad-fang-neutral-candidate-metric-runtime-v1',
      artifactVersion: '0.1.0',
      authorityState: 'square_broad_fang_source_grounded_role_invariant_neutral_candidate_metrics_implemented_no_traditional_binding',
      execution: {
        traditionalMetricBindingsIssued: 0,
        thresholdsIssued: 0,
        criterionStatesIssued: 0,
        traditionalSemanticAuthority: false,
      },
    } as unknown as SquareBroadFangNeutralCandidateMetricRuntimeFR142V1;

    expect(() => assertIssuedSquareBroadFangNeutralCandidateMetricRuntimeFR142(forged))
      .toThrow(FaceAuthorityValidationError);
  });

  it('rejects kernel inputs that are not exactly two 20-point positive-edge closed cycles', () => {
    const valid = circle(1);
    expect(() => computeSquareBroadFangNeutralCandidateKernelFR142([valid]))
      .toThrow(/exactly two/u);
    expect(() => computeSquareBroadFangNeutralCandidateKernelFR142([
      valid.slice(0, 19),
      valid,
    ])).toThrow(/exactly 20/u);

    const duplicateAdjacent = [...valid];
    duplicateAdjacent[1] = duplicateAdjacent[0]!;
    expect(() => computeSquareBroadFangNeutralCandidateKernelFR142([
      duplicateAdjacent,
      valid,
    ])).toThrow(/positive length/u);
  });

  it('rejects unauthorized point metadata instead of accepting provider indices or semantic roles', () => {
    const valid = circle(1).map((point) => ({ ...point }));
    const contaminated = valid.map((point, index) => (
      index === 0 ? { ...point, providerVertexIndex: 61 } : point
    )) as unknown as readonly NeutralClosedCyclePointFR142V1[];

    expect(() => computeSquareBroadFangNeutralCandidateKernelFR142([
      contaminated,
      circle(0.7),
    ])).toThrow(/unauthorized field/u);
  });

  it('keeps every definition unbound and refuses named-corner, threshold, or anatomical-role requirements', () => {
    const definitions = getSquareBroadFangNeutralCandidateMetricDefinitionsFR142();
    for (const definition of definitions) {
      expect(definition.traditionalCriterionBindingRef).toBeNull();
      expect(definition.calibrationRef).toBeNull();
      expect(definition.numericClassificationThreshold).toBeNull();
      expect(definition.outerInnerAnatomicalRoleRequired).toBe(false);
      expect(definition.providerVertexIdentityRequired).toBe(false);
      expect(definition.namedMouthCornerRequired).toBe(false);
    }
    expect(definitions[2]!.interpretationBoundary).toContain('no_four_vertex_selection');
    expect(definitions[2]!.interpretationBoundary).toContain('no_named_mouth_corners');
  });

  it('does not mutate or promote FR134 historical neutral metrics', () => {
    const before = getSquareBroadNeutralShapeMetricDefinitionsFR134();
    getSquareBroadFangNeutralCandidateMetricDefinitionsFR142();
    const after = getSquareBroadNeutralShapeMetricDefinitionsFR134();
    expect(after).toEqual(before);
    expect(after.map((definition) => definition.metricRef)).toEqual([
      'neutral.mouth.contour_set.closed_cycle_axis_alignment_mean@0.1.0',
      'neutral.mouth.contour_set.closed_cycle_mean_absolute_turning_angle@0.1.0',
    ]);
    expect(after.every((definition) => definition.traditionalCriterionBindingRef === null)).toBe(true);
    expect(after.every((definition) => definition.calibrationRef === null)).toBe(true);
  });

  it('does not encode a hidden four-corner detector into the turning concentration formula', () => {
    const turn = getSquareBroadFangNeutralCandidateMetricDefinitionsFR142()[2]!;
    expect(turn.formula).toContain('normalized_Herfindahl_index');
    expect(turn.formula).not.toContain('top4');
    expect(turn.formula).not.toContain('four_corner');
    expect(turn.providerVertexIdentityRequired).toBe(false);
    expect(turn.namedMouthCornerRequired).toBe(false);
  });
});
