import { describe, expect, it } from 'vitest';

import {
  assertIssuedRoleFreeCrossContourCorrespondenceFeasibilityReviewFR86,
  reviewRoleFreeCrossContourCorrespondenceFeasibilityFR86,
} from './role-free-cross-contour-correspondence-feasibility-review-fr86.js';

describe('FR86 correspondence feasibility hardening', () => {
  it('is deterministic across governed review executions', () => {
    const first = reviewRoleFreeCrossContourCorrespondenceFeasibilityFR86();
    const second = reviewRoleFreeCrossContourCorrespondenceFeasibilityFR86();

    expect(first).not.toBe(second);
    expect(JSON.stringify(first)).toBe(JSON.stringify(second));
    assertIssuedRoleFreeCrossContourCorrespondenceFeasibilityReviewFR86(first);
    assertIssuedRoleFreeCrossContourCorrespondenceFeasibilityReviewFR86(second);
  });

  it('freezes the review, candidate list, candidates, and additional policy lists', () => {
    const review = reviewRoleFreeCrossContourCorrespondenceFeasibilityFR86();

    expect(Object.isFrozen(review)).toBe(true);
    expect(Object.isFrozen(review.candidates)).toBe(true);
    expect(review.candidates.every((candidate) => Object.isFrozen(candidate))).toBe(true);
    expect(review.candidates.every((candidate) => Object.isFrozen(candidate.additionalPolicyRequirements))).toBe(true);
    expect(Object.isFrozen(review.recommendedNextFrontier)).toBe(true);
    expect(Object.isFrozen(review.recommendedNextFrontier.candidateFunctionals)).toBe(true);
  });

  it('keeps every candidate fail-closed even when it is mathematically expressible', () => {
    const review = reviewRoleFreeCrossContourCorrespondenceFeasibilityFR86();

    for (const candidate of review.candidates) {
      expect(candidate.mathematicallyExpressible).toBe(true);
      expect(candidate.admitted).toBe(false);
      expect(candidate.currentAuthoritySuppliesAdditionalPolicy).toBe(false);
      expect(candidate.additionalPolicyRequirements.length).toBeGreaterThan(0);
    }
  });

  it('does not silently resolve downstream semantic or calibration blockers', () => {
    const review = reviewRoleFreeCrossContourCorrespondenceFeasibilityFR86();

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
    expect(review.morphologyProduced).toBe(false);
    expect(review.criterionStatesIssued).toBe(0);
    expect(review.claimsIssued).toBe(0);
    expect(review.traditionalSemanticAuthority).toBe(false);
  });
});
