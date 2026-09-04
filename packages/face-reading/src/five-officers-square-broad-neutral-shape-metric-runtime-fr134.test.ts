import { describe, expect, it } from 'vitest';
import type { PoseNormalizedLipsGeometryFR79V1 } from './pose-normalized-lips-geometry-fr79.js';
import {
  assertIssuedSquareBroadNeutralShapeMetricRuntimeFR134,
  computeSquareBroadNeutralShapeMetricsFR134,
  getSquareBroadNeutralShapeMetricDefinitionsFR134,
  type SquareBroadNeutralShapeMetricRuntimeFR134V1,
} from './five-officers-square-broad-neutral-shape-metric-runtime-fr134.js';
import {
  assessSquareBroadImageMeasurementConstructDesignFR133,
  assertIssuedSquareBroadImageMeasurementConstructDesignFR133,
} from './five-officers-square-broad-image-measurement-construct-design-fr133.js';

describe('FR134 square-broad neutral shape metric runtime', () => {
  it('defines two role-invariant neutral shape metrics without traditional binding', () => {
    const definitions = getSquareBroadNeutralShapeMetricDefinitionsFR134();
    expect(definitions).toHaveLength(2);
    expect(definitions.map((definition) => definition.metricRef)).toEqual([
      'neutral.mouth.contour_set.closed_cycle_axis_alignment_mean@0.1.0',
      'neutral.mouth.contour_set.closed_cycle_mean_absolute_turning_angle@0.1.0',
    ]);
    expect(definitions.map((definition) => definition.unit)).toEqual(['ratio', 'radian']);
    expect(definitions.every((definition) => definition.outerInnerAnatomicalRoleRequired === false)).toBe(true);
    expect(definitions.every((definition) => definition.providerComponentOrderRequired === false)).toBe(true);
    expect(definitions.every((definition) => definition.traditionalCriterionBindingRef === null)).toBe(true);
    expect(definitions.every((definition) => definition.calibrationRef === null)).toBe(true);
  });

  it('consumes exactly the FR133 role-invariant candidates while preserving machine-measurability false', () => {
    const predecessor = assessSquareBroadImageMeasurementConstructDesignFR133();
    assertIssuedSquareBroadImageMeasurementConstructDesignFR133(predecessor);
    expect(predecessor.nextFrontier).toBe(
      'square_broad_neutral_shape_metric_implementation_and_construct_validity_dataset_design',
    );
    expect(predecessor.findings.fangRoleInvariantCycleOrientationCandidateDerivable).toBe(true);
    expect(predecessor.findings.fangRoleInvariantTurningAngleCandidateDerivable).toBe(true);
    expect(predecessor.findings.fangExternalOutlineSquarenessCurrentlyGoverned).toBe(false);
    expect(predecessor.findings.squareBroadCriterionMachineMeasurableUnderCurrentAuthority).toBe(false);
    expect(predecessor.predecessor.targetSpecificApprovalExplicitlyDeferred).toBe(true);
  });

  it('rejects structurally plausible but unissued FR79 geometry before metric computation', () => {
    const forged = {
      schemaVersion: 'fr79-pose-normalized-lips-geometry-v1',
      artifactVersion: '0.1.0',
      authorityState: 'governed_pose_normalized_lips_geometry_candidate_only',
    } as unknown as PoseNormalizedLipsGeometryFR79V1;
    expect(() => computeSquareBroadNeutralShapeMetricsFR134(forged))
      .toThrow(/FR-79|FR-134/u);
  });

  it('rejects forged FR134 runtime output outside the active issuer', () => {
    const forged = {
      schemaVersion: 'fr134-square-broad-neutral-shape-metric-runtime-v1',
      authorityState: 'square_broad_role_invariant_neutral_shape_metrics_implemented_construct_validity_pending',
    } as unknown as SquareBroadNeutralShapeMetricRuntimeFR134V1;
    expect(() => assertIssuedSquareBroadNeutralShapeMetricRuntimeFR134(forged))
      .toThrow(/FR-134/u);
  });
});
