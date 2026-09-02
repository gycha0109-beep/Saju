import { describe, expect, it } from 'vitest';

import {
  assertIssuedRoleFreeCrossContourCorrespondenceFeasibilityReviewFR86,
  reviewRoleFreeCrossContourCorrespondenceFeasibilityFR86,
  type RoleFreeCrossContourCorrespondenceFeasibilityReviewFR86V1,
} from './role-free-cross-contour-correspondence-feasibility-review-fr86.js';
import { FaceAuthorityValidationError } from './validation.js';

describe('FR86 role-free cross-contour correspondence feasibility review', () => {
  it('completes the review without admitting a correspondence method or metric', () => {
    const review = reviewRoleFreeCrossContourCorrespondenceFeasibilityFR86();
    assertIssuedRoleFreeCrossContourCorrespondenceFeasibilityReviewFR86(review);

    expect(review.schemaVersion).toBe('fr86-role-free-cross-contour-correspondence-feasibility-review-v1');
    expect(review.authorityState).toBe('role_free_cross_contour_correspondence_feasibility_review_completed_no_method_admitted');
    expect(review.upstreamAuthority.fr84ReviewCompleted).toBe(true);
    expect(review.upstreamAuthority.fr85RoleFreeNestingPredicateAvailable).toBe(true);
    expect(review.upstreamAuthority.strictNestingCanIssueGeometricRoles).toBe(true);
    expect(review.upstreamAuthority.geometricRolesAreAnatomicalRoles).toBe(false);
    expect(review.feasibilityDecision.correspondenceMethodAdmitted).toBe(false);
    expect(review.feasibilityDecision.correspondencePairsIssued).toBe(0);
    expect(review.crossContourCorrespondencePairsIssued).toBe(0);
    expect(review.neutralMetricDefinitionsIssued).toBe(0);
    expect(review.neutralMetricValuesIssued).toBe(0);
    expect(review.thicknessMetricIssued).toBe(false);
    expect(review.anatomicalRolesIssued).toBe(0);
    expect(review.criterionStatesIssued).toBe(0);
    expect(review.claimsIssued).toBe(0);
    expect(review.traditionalSemanticAuthority).toBe(false);
  });

  it('rejects all four candidate pairing methods for explicit authority reasons', () => {
    const review = reviewRoleFreeCrossContourCorrespondenceFeasibilityFR86();

    expect(review.candidates.map((candidate) => candidate.method)).toEqual([
      'nearest_point_projection',
      'local_normal_projection',
      'radial_intersection',
      'normalized_arc_length_pairing',
    ]);
    expect(review.candidates.every((candidate) => candidate.mathematicallyExpressible)).toBe(true);
    expect(review.candidates.every((candidate) => candidate.admitted === false)).toBe(true);
    expect(review.candidates.every((candidate) => candidate.currentAuthoritySuppliesAdditionalPolicy === false)).toBe(true);

    const nearest = review.candidates[0];
    expect(nearest.wellDefinedFromCurrentGovernedContract).toBe(true);
    expect(nearest.globallyUniquePairingGuaranteed).toBe(false);
    expect(nearest.oneToOnePairingGuaranteed).toBe(false);
    expect(nearest.symmetricPairingGuaranteed).toBe(false);
    expect(nearest.rejectionReason).toBe('nonunique_and_nonbijective_general_case');

    const normal = review.candidates[1];
    expect(normal.wellDefinedFromCurrentGovernedContract).toBe(false);
    expect(normal.additionalPolicyRequirements).toContain('vertex_tangent_normal_policy');
    expect(normal.rejectionReason).toBe('curve_tangent_normal_and_intersection_policy_missing');

    const radial = review.candidates[2];
    expect(radial.wellDefinedFromCurrentGovernedContract).toBe(false);
    expect(radial.additionalPolicyRequirements).toContain('shared_center_definition');
    expect(radial.rejectionReason).toBe('center_and_star_shapedness_authority_missing');

    const arcLength = review.candidates[3];
    expect(arcLength.wellDefinedFromCurrentGovernedContract).toBe(false);
    expect(arcLength.additionalPolicyRequirements).toContain('cross_cycle_start_anchor');
    expect(arcLength.additionalPolicyRequirements).toContain('cross_cycle_orientation_alignment');
    expect(arcLength.rejectionReason).toBe('cross_cycle_start_anchor_and_orientation_alignment_missing');
  });

  it('keeps the next frontier role-free and correspondence-free', () => {
    const review = reviewRoleFreeCrossContourCorrespondenceFeasibilityFR86();

    expect(review.recommendedNextFrontier.frontierKey).toBe('role_free_symmetric_cross_contour_distance_functionals_feasibility_review');
    expect(review.recommendedNextFrontier.candidateFunctionals).toEqual([
      'minimum_set_separation',
      'bidirectional_hausdorff_distance',
    ]);
    expect(review.recommendedNextFrontier.neutralMetricIssuanceAllowedAtThisStage).toBe(false);
    expect(review.recommendedNextFrontier.anatomicalRoleAssignmentAllowed).toBe(false);
    expect(review.recommendedNextFrontier.thicknessSemanticAssignmentAllowed).toBe(false);
    expect(review.recommendedNextFrontier.traditionalSemanticAssignmentAllowed).toBe(false);
    expect(review.newlyExposedPrerequisiteBlockers).toEqual([
      'role_free_symmetric_cross_contour_distance_functional_not_reviewed',
    ]);
    expect(review.remainingBlockers).toContain('role_free_cross_contour_correspondence_not_defined');
    expect(review.remainingBlockers).toContain('lips_substantial_thickness_metric_not_defined');
  });

  it('preserves the explicit shortcut prohibitions', () => {
    const review = reviewRoleFreeCrossContourCorrespondenceFeasibilityFR86();

    expect(review.authorityBoundary.nearestPointMeansAuthorizedCorrespondence).toBe(false);
    expect(review.authorityBoundary.normalProjectionMeansAuthorizedCorrespondence).toBe(false);
    expect(review.authorityBoundary.radialIntersectionMeansAuthorizedCorrespondence).toBe(false);
    expect(review.authorityBoundary.normalizedArcLengthMeansAuthorizedCorrespondence).toBe(false);
    expect(review.authorityBoundary.geometricEnclosingEnclosedRolesProvideCrossCyclePhaseAnchor).toBe(false);
    expect(review.authorityBoundary.setDistanceMeansLipThickness).toBe(false);
    expect(review.prohibitedShortcuts).toContain('nearest_point_to_lip_thickness');
    expect(review.prohibitedShortcuts).toContain('provider_cycle_index_to_cross_contour_correspondence');
    expect(review.prohibitedShortcuts).toContain('geometric_enclosing_enclosed_to_anatomical_outer_inner');
  });

  it('rejects forged review objects even when their fields look admissible', () => {
    const issued = reviewRoleFreeCrossContourCorrespondenceFeasibilityFR86();
    const forged = JSON.parse(JSON.stringify(issued)) as RoleFreeCrossContourCorrespondenceFeasibilityReviewFR86V1;

    expect(() => assertIssuedRoleFreeCrossContourCorrespondenceFeasibilityReviewFR86(forged)).toThrow(FaceAuthorityValidationError);
  });
});
