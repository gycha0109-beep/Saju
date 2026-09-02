import { describe, expect, it } from 'vitest';

import {
  assertIssuedRoleFreeSymmetricSetDistanceFeasibilityReviewFR87,
  reviewRoleFreeSymmetricSetDistanceFeasibilityFR87,
  type RoleFreeSymmetricSetDistanceFeasibilityReviewFR87V1,
} from './role-free-symmetric-set-distance-feasibility-review-fr87.js';
import { FaceAuthorityValidationError } from './validation.js';

describe('FR87 role-free symmetric set-distance feasibility review', () => {
  it('admits only research-neutral functional specifications and issues no runtime metric', () => {
    const review = reviewRoleFreeSymmetricSetDistanceFeasibilityFR87();
    assertIssuedRoleFreeSymmetricSetDistanceFeasibilityReviewFR87(review);

    expect(review.authorityState).toBe('role_free_symmetric_set_distance_feasibility_review_completed_no_runtime_metric_issued');
    expect(review.feasibilityDecision.researchNeutralFunctionalSpecificationsAdmitted).toBe(2);
    expect(review.feasibilityDecision.productionNeutralMetricDefinitionsIssued).toBe(0);
    expect(review.feasibilityDecision.runtimeMetricValuesIssued).toBe(0);
    expect(review.neutralMetricDefinitionsIssued).toBe(0);
    expect(review.neutralMetricValuesIssued).toBe(0);
    expect(review.crossContourCorrespondencePairsIssued).toBe(0);
    expect(review.thicknessMetricIssued).toBe(false);
    expect(review.anatomicalRolesIssued).toBe(0);
    expect(review.criterionStatesIssued).toBe(0);
    expect(review.claimsIssued).toBe(0);
    expect(review.traditionalSemanticAuthority).toBe(false);
  });

  it('requires continuous closed-polyline set semantics and rejects discrete vertex-only substitution', () => {
    const review = reviewRoleFreeSymmetricSetDistanceFeasibilityFR87();

    expect(review.setModel.contourRepresentation).toBe('closed_piecewise_linear_boundary_through_governed_contour_vertices');
    expect(review.setModel.contourRoleRequirement).toBe('unordered_role_free_pair');
    expect(review.candidates.every((candidate) => candidate.continuousPolylineInterpretationRequired)).toBe(true);
    expect(review.candidates.every((candidate) => candidate.discreteLandmarkOnlyApproximationAuthorized === false)).toBe(true);
    expect(review.mathematicalDefinitions.discreteVertexHausdorffEqualsContinuousPolylineHausdorffGuaranteed).toBe(false);
  });

  it('establishes both functionals as symmetric, cycle-index invariant, correspondence-free research specifications', () => {
    const review = reviewRoleFreeSymmetricSetDistanceFeasibilityFR87();

    expect(review.candidates.map((candidate) => candidate.functional)).toEqual([
      'minimum_set_separation',
      'bidirectional_hausdorff_distance',
    ]);
    for (const candidate of review.candidates) {
      expect(candidate.mathematicalDefinitionClosed).toBe(true);
      expect(candidate.compactSetFiniteValueGuaranteed).toBe(true);
      expect(candidate.symmetricUnderContourSwap).toBe(true);
      expect(candidate.cycleStartIndexInvariant).toBe(true);
      expect(candidate.cycleOrientationInvariant).toBe(true);
      expect(candidate.explicitPointPairCorrespondenceRequired).toBe(false);
      expect(candidate.anatomicalRolesRequired).toBe(false);
      expect(candidate.providerComponentOrderRequired).toBe(false);
      expect(candidate.physicalAnthropometricInterpretationAuthorized).toBe(false);
      expect(candidate.thicknessSemanticAuthorized).toBe(false);
      expect(candidate.traditionalSemanticAuthorized).toBe(false);
    }
  });

  it('selects minimum separation as the next exact runtime frontier without calling it band width or thickness', () => {
    const review = reviewRoleFreeSymmetricSetDistanceFeasibilityFR87();
    const minimum = review.candidates[0];
    const hausdorff = review.candidates[1];

    expect(minimum.exactRuntimeRecipeState).toBe('finite_segment_pair_minimum_recipe_available');
    expect(minimum.limitation).toBe('closest_boundary_gap_only_not_representative_band_width');
    expect(hausdorff.exactRuntimeRecipeState).toBe('continuous_directed_maximum_solver_not_yet_governed');
    expect(hausdorff.limitation).toBe('worst_case_set_mismatch_not_local_band_width');
    expect(review.feasibilityDecision.preferredNextRuntimeFunctional).toBe('minimum_set_separation');
    expect(review.feasibilityDecision.hausdorffRuntimeDeferred).toBe(true);
    expect(review.recommendedNextFrontier.frontierKey).toBe('role_free_minimum_set_separation_runtime');
    expect(review.recommendedNextFrontier.thicknessSemanticAssignmentAllowed).toBe(false);
    expect(review.recommendedNextFrontier.traditionalSemanticAssignmentAllowed).toBe(false);
  });

  it('preserves semantic and authority blockers after resolving the set-distance review gap', () => {
    const review = reviewRoleFreeSymmetricSetDistanceFeasibilityFR87();

    expect(review.resolvedProcessGap).toBe('role_free_symmetric_cross_contour_distance_functional_not_reviewed');
    expect(review.newlyExposedPrerequisiteBlockers).toEqual([
      'role_free_minimum_set_separation_runtime_not_implemented',
      'continuous_polyline_hausdorff_runtime_algorithm_not_governed',
    ]);
    expect(review.remainingBlockers).toContain('outer_inner_lip_roles_not_authorized');
    expect(review.remainingBlockers).toContain('role_free_cross_contour_correspondence_not_defined');
    expect(review.remainingBlockers).toContain('lips_substantial_thickness_metric_not_defined');
    expect(review.authorityBoundary.minimumSetSeparationMeansLipThickness).toBe(false);
    expect(review.authorityBoundary.hausdorffDistanceMeansLipThickness).toBe(false);
    expect(review.authorityBoundary.setDistanceMeansTraditionalDuanHou).toBe(false);
  });

  it('rejects forged review objects', () => {
    const issued = reviewRoleFreeSymmetricSetDistanceFeasibilityFR87();
    const forged = JSON.parse(JSON.stringify(issued)) as RoleFreeSymmetricSetDistanceFeasibilityReviewFR87V1;
    expect(() => assertIssuedRoleFreeSymmetricSetDistanceFeasibilityReviewFR87(forged)).toThrow(FaceAuthorityValidationError);
  });
});
