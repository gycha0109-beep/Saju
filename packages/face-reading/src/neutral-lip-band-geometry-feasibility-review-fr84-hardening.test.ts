import { describe, expect, it } from 'vitest';
import {
  assertIssuedNeutralLipBandGeometryFeasibilityReviewFR84,
  reviewNeutralLipBandGeometryFeasibilityFR84,
} from './neutral-lip-band-geometry-feasibility-review-fr84.js';

describe('FR84 neutral lip-band geometry feasibility hardening', () => {
  it('freezes the issued review and all authority-bearing nested collections', () => {
    const review = reviewNeutralLipBandGeometryFeasibilityFR84();

    expect(Object.isFrozen(review)).toBe(true);
    expect(Object.isFrozen(review.sourceGeometry)).toBe(true);
    expect(Object.isFrozen(review.sourceGeometry.componentPointCounts)).toBe(true);
    expect(Object.isFrozen(review.existingRoleFreeNeutralMetrics)).toBe(true);
    expect(Object.isFrozen(review.existingRoleFreeNeutralMetrics[0])).toBe(true);
    expect(Object.isFrozen(review.existingRoleFreeNeutralMetrics[1])).toBe(true);
    expect(Object.isFrozen(review.feasibilityReview)).toBe(true);
    expect(Object.isFrozen(review.recommendedNextFrontier)).toBe(true);
    expect(Object.isFrozen(review.newlyExposedPrerequisiteBlockers)).toBe(true);
    expect(Object.isFrozen(review.remainingBlockers)).toBe(true);
    expect(Object.isFrozen(review.authorityBoundary)).toBe(true);
    expect(Object.isFrozen(review.prohibitedShortcuts)).toBe(true);
  });

  it('keeps every semantic widening route explicitly false while allowing only mathematical feasibility statements', () => {
    const review = reviewNeutralLipBandGeometryFeasibilityFR84();

    expect(review.feasibilityReview.componentLocalAreaOrPerimeterMathematicallyDefinable).toBe(true);
    expect(review.feasibilityReview.crossComponentDistanceMathematicallyDefinable).toBe(true);
    expect(review.feasibilityReview.perSampleNestingRelationMathematicallyTestable).toBe(true);

    expect(review.feasibilityReview.providerTopologyAloneAuthorizesNestingRelation).toBe(false);
    expect(review.feasibilityReview.crossContourPointCorrespondenceAuthorized).toBe(false);
    expect(review.feasibilityReview.outerInnerAnatomicalRolesAuthorized).toBe(false);
    expect(review.feasibilityReview.geometricEnclosingEnclosedRolesAuthorized).toBe(false);
    expect(review.feasibilityReview.lipBandAreaAuthorized).toBe(false);
    expect(review.feasibilityReview.neutralThicknessLikeMetricDefinitionAdmitted).toBe(false);
    expect(review.feasibilityReview.traditionalSubstantialThicknessSemanticsOperationalized).toBe(false);
  });

  it('does not close the actual lips-substantial authority blockers merely because feasibility was reviewed', () => {
    const review = reviewNeutralLipBandGeometryFeasibilityFR84();

    expect(review.remainingBlockers).toEqual([
      'fr15_mouth_consumer_slot_not_issued',
      'five_officers_source_not_scan_checked',
      'five_officers_methodology_research_only',
      'outer_inner_lip_roles_not_authorized',
      'lips_substantial_thickness_metric_not_defined',
      'lips_substantial_calibration_evidence_absent',
      'lips_substantial_calibration_protocol_absent',
      'lips_substantial_threshold_not_calibrated',
    ]);
    expect(review.resolvedProcessGap).not.toBe('outer_inner_lip_roles_not_authorized');
    expect(review.resolvedProcessGap).not.toBe('lips_substantial_thickness_metric_not_defined');
  });

  it('requires the active issuer after a valid review has been produced', () => {
    const review = reviewNeutralLipBandGeometryFeasibilityFR84();
    expect(() => assertIssuedNeutralLipBandGeometryFeasibilityReviewFR84(review)).not.toThrow();

    const clone = structuredClone(review);
    expect(() => assertIssuedNeutralLipBandGeometryFeasibilityReviewFR84(clone)).toThrow(
      /not issued by the active FR-84 boundary/u,
    );
  });
});
