import { describe, expect, it } from 'vitest';
import {
  assertIssuedEyePairGeometricYSpanAspectRatioFeasibilityFR177,
  FR177_CANDIDATE_DEFINITIONS,
  FR177_CANDIDATE_METRIC_REFS,
  FR177_NEXT_FRONTIER,
  FR177_RESEARCH_NOTE_REF,
  FR177_VERDICT,
  issueEyePairGeometricYSpanAspectRatioFeasibilityFR177,
  type EyePairGeometricYSpanAspectRatioFeasibilityFR177V1,
} from './eye-pair-geometric-y-span-aspect-ratio-feasibility-fr177.js';

function forgedFR177(): EyePairGeometricYSpanAspectRatioFeasibilityFR177V1 {
  return Object.freeze({}) as unknown as EyePairGeometricYSpanAspectRatioFeasibilityFR177V1;
}

describe('FR177 Eye-Pair geometric Y-span/aspect-ratio feasibility', () => {
  it('pins only the inherited release-pinned role-invariant Eye-Pair geometry authority', () => {
    const review = issueEyePairGeometricYSpanAspectRatioFeasibilityFR177();

    expect(review.inheritedAuthority).toMatchObject({
      providerPackage: '@mediapipe/tasks-vision',
      providerVersion: '0.10.35',
      providerLandmarkCount: 478,
      governedMetricGeometryLandmarkCount: 468,
      coordinateFrame: 'canonical_aligned_right_handed_metric_3d',
      eyeCycleCount: 2,
      eyeCyclePointCount: 16,
      eyeCyclesClosed: true,
      roleInvariantAggregationOverTwoEyeCycles: true,
      anatomicalLateralityResolved: false,
    });
    expect(review.inheritedAuthority.currentMetricRefs).toEqual([
      'neutral.eye_pair.metric_3d.mean_cycle_x_span_to_full_mesh_x_span_ratio@0.1.0',
      'neutral.eye_pair.metric_3d.mean_cycle_perimeter_to_full_mesh_x_span_ratio@0.1.0',
      'neutral.eye_pair.metric_3d.centroid_separation_to_full_mesh_x_span_ratio@0.1.0',
      'neutral.eye_pair.metric_3d.mean_closed_cycle_absolute_turning_angle@0.1.0',
    ]);
  });

  it('records the repeated FR175/FR176 need without using source semantics to define geometry', () => {
    const review = issueEyePairGeometricYSpanAspectRatioFeasibilityFR177();

    expect(review.sourceNeed).toEqual({
      fr175Clause: '或細長極寸',
      fr176Clause: '細而長',
      repeatedNeutralDimensionNeedConfirmed: true,
      sourceSemanticsUsedToDefineGeometry: false,
      traditionalUnitMappingUsed: false,
    });
  });

  it('defines geometric Y-span as a coordinate extrema span, not physiological aperture', () => {
    const review = issueEyePairGeometricYSpanAspectRatioFeasibilityFR177();

    expect(FR177_CANDIDATE_DEFINITIONS.cycleYSpan).toBe(
      'max(y_i)-min(y_i) over the exact release-pinned 16-point closed Eye cycle',
    );
    expect(review.geometryReview).toMatchObject({
      yAxisBoundingSpanRequiresUpperLowerLidRoleAssignment: false,
      yAxisBoundingSpanRequiresAnatomicalLaterality: false,
      yAxisBoundingSpanIsPhysiologicalAperture: false,
      yAxisBoundingSpanIsEyeHeightSemanticLabel: false,
      yToXSpanRatioIsTraditionalThinnessSemantic: false,
    });
  });

  it('pins two candidate-only role-invariant ratios and exact fail-closed denominator rules', () => {
    const review = issueEyePairGeometricYSpanAspectRatioFeasibilityFR177();

    expect(review.geometryReview.candidateMetricRefs).toBe(FR177_CANDIDATE_METRIC_REFS);
    expect(FR177_CANDIDATE_METRIC_REFS).toEqual([
      'candidate:neutral.eye_pair.metric_3d.mean_cycle_y_span_to_full_mesh_x_span_ratio@fr177-feasibility',
      'candidate:neutral.eye_pair.metric_3d.mean_cycle_y_to_x_span_ratio@fr177-feasibility',
    ]);
    expect(FR177_CANDIDATE_DEFINITIONS.meanCycleYSpanToFullMeshXSpanRatio).toMatch(/full_mesh_x_span > 0/u);
    expect(FR177_CANDIDATE_DEFINITIONS.meanCycleYToXSpanRatio).toMatch(/each cycle_x_span > 0/u);
    expect(review.geometryReview).toMatchObject({
      denominatorRuleInventsEpsilon: false,
      nonFiniteOperandFailsClosed: true,
      nonPositiveFullMeshXSpanFailsClosed: true,
      nonPositivePerCycleXSpanFailsClosed: true,
    });
  });

  it('authorizes feasibility methodology only and issues no runtime metric or semantic authority', () => {
    const review = issueEyePairGeometricYSpanAspectRatioFeasibilityFR177();

    expect(review.verdict).toBe(FR177_VERDICT);
    expect(review.verdict).toBe('NEUTRAL_GEOMETRY_METHODOLOGY_FEASIBLE_RUNTIME_NOT_ISSUED');
    expect(review.decisionBoundary).toEqual({
      methodologyCandidateAuthorized: true,
      candidateMetricRegistrationAuthorized: false,
      runtimeMetricIssued: false,
      newObservationPrimitiveIssued: false,
      anatomicalRoleAssignmentIssued: false,
      individualEyeAsymmetryOutputAuthorized: false,
      thresholdIssued: false,
      scoreIssued: false,
      rankIssued: false,
      calibrationIssued: false,
      categoricalClassifierIssued: false,
      traditionalUnitMappingIssued: false,
      traditionalSemanticBindingAuthorized: false,
      structuredSemanticClaimAuthorized: false,
      productionRuleAuthorized: false,
    });
  });

  it('changes no sensitive persistence or biometric/provenance boundary', () => {
    const review = issueEyePairGeometricYSpanAspectRatioFeasibilityFR177();

    expect(Object.values(review.persistenceBoundary).every((value) => value === false)).toBe(true);
    expect(review.provenanceBoundary).toEqual({
      c2paRequiredForNeutralGeometryFeasibility: false,
      samePersonInferencePerformed: false,
      biometricIdentityMatchingPerformed: false,
    });
  });

  it('rejects structural lookalikes and advances only to a separate release-pinned runtime task', () => {
    const review = issueEyePairGeometricYSpanAspectRatioFeasibilityFR177();

    expect(() => assertIssuedEyePairGeometricYSpanAspectRatioFeasibilityFR177(review)).not.toThrow();
    expect(() => assertIssuedEyePairGeometricYSpanAspectRatioFeasibilityFR177(forgedFR177())).toThrow(/not issued/u);
    expect(FR177_RESEARCH_NOTE_REF).toBe(
      'repo:research/face-reading/fr177-eye-pair-geometric-y-span-aspect-ratio-feasibility.md',
    );
    expect(FR177_NEXT_FRONTIER).toBe(
      'implement_release_pinned_eye_pair_geometric_y_span_and_y_to_x_span_ratio_runtime_with_exact_fr177_fail_closed_denominator_rules',
    );
  });
});
