import { describe, expect, it } from 'vitest';

import {
  assertIssuedRoleFreeSymmetricSetDistanceFeasibilityReviewFR87,
  reviewRoleFreeSymmetricSetDistanceFeasibilityFR87,
} from './role-free-symmetric-set-distance-feasibility-review-fr87.js';

describe('FR87 symmetric set-distance feasibility hardening', () => {
  it('is deterministic across governed review executions', () => {
    const first = reviewRoleFreeSymmetricSetDistanceFeasibilityFR87();
    const second = reviewRoleFreeSymmetricSetDistanceFeasibilityFR87();

    expect(first).not.toBe(second);
    expect(JSON.stringify(first)).toBe(JSON.stringify(second));
    assertIssuedRoleFreeSymmetricSetDistanceFeasibilityReviewFR87(first);
    assertIssuedRoleFreeSymmetricSetDistanceFeasibilityReviewFR87(second);
  });

  it('freezes the review and all reusable collection surfaces', () => {
    const review = reviewRoleFreeSymmetricSetDistanceFeasibilityFR87();

    expect(Object.isFrozen(review)).toBe(true);
    expect(Object.isFrozen(review.candidates)).toBe(true);
    expect(review.candidates.every((candidate) => Object.isFrozen(candidate))).toBe(true);
    expect(Object.isFrozen(review.setModel)).toBe(true);
    expect(Object.isFrozen(review.feasibilityDecision)).toBe(true);
    expect(Object.isFrozen(review.mathematicalDefinitions)).toBe(true);
    expect(Object.isFrozen(review.recommendedNextFrontier)).toBe(true);
    expect(Object.isFrozen(review.newlyExposedPrerequisiteBlockers)).toBe(true);
    expect(Object.isFrozen(review.remainingBlockers)).toBe(true);
    expect(Object.isFrozen(review.prohibitedShortcuts)).toBe(true);
  });

  it('keeps research functional admission distinct from production metric issuance', () => {
    const review = reviewRoleFreeSymmetricSetDistanceFeasibilityFR87();

    expect(review.candidates.every((candidate) => candidate.researchNeutralFunctionalSpecificationAdmitted)).toBe(true);
    expect(review.candidates.every((candidate) => candidate.runtimeValueIssuanceAdmitted === false)).toBe(true);
    expect(review.feasibilityDecision.productionNeutralMetricDefinitionsIssued).toBe(0);
    expect(review.neutralMetricDefinitionsIssued).toBe(0);
    expect(review.neutralMetricValuesIssued).toBe(0);
  });

  it('keeps minimum separation local and Hausdorff global without semantic promotion', () => {
    const review = reviewRoleFreeSymmetricSetDistanceFeasibilityFR87();

    expect(review.candidates[0].limitation).toBe('closest_boundary_gap_only_not_representative_band_width');
    expect(review.candidates[1].limitation).toBe('worst_case_set_mismatch_not_local_band_width');
    expect(review.authorityBoundary.minimumGapMeansRepresentativeBandWidth).toBe(false);
    expect(review.authorityBoundary.hausdorffMeansRepresentativeBandWidth).toBe(false);
    expect(review.prohibitedShortcuts).toContain('minimum_set_separation_to_lip_thickness');
    expect(review.prohibitedShortcuts).toContain('hausdorff_distance_to_lip_thickness');
    expect(review.prohibitedShortcuts).toContain('research_functional_specification_to_production_metric');
  });

  it('does not resolve source, anatomical, calibration, or traditional blockers', () => {
    const review = reviewRoleFreeSymmetricSetDistanceFeasibilityFR87();

    expect(review.remainingBlockers).toEqual([
      'fr15_mouth_consumer_slot_not_issued',
      'five_officers_source_not_scan_checked',
      'five_officers_methodology_research_only',
      'outer_inner_lip_roles_not_authorized',
      'role_free_cross_contour_correspondence_not_defined',
      'lips_substantial_thickness_metric_not_defined',
      'lips_substantial_calibration_evidence_absent',
      'lips_substantial_calibration_protocol_absent',
      'lips_substantial_threshold_not_calibrated',
    ]);
    expect(review.thicknessMetricIssued).toBe(false);
    expect(review.morphologyProduced).toBe(false);
    expect(review.criterionStatesIssued).toBe(0);
    expect(review.claimsIssued).toBe(0);
    expect(review.traditionalSemanticAuthority).toBe(false);
  });
});
