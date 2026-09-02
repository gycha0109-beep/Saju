import { describe, expect, it } from 'vitest';
import {
  assertIssuedLipsSubstantialRoleFreeSeparationTraditionalBindingFeasibilityReviewFR99,
  reviewLipsSubstantialRoleFreeSeparationTraditionalBindingFeasibilityFR99,
} from './lips-substantial-role-free-separation-traditional-binding-feasibility-review-fr99.js';

describe('FR99 lips-substantial role-free separation traditional binding feasibility review', () => {
  it('adds the FR97 separation metric only to the research candidate inventory', () => {
    const review = reviewLipsSubstantialRoleFreeSeparationTraditionalBindingFeasibilityFR99();
    assertIssuedLipsSubstantialRoleFreeSeparationTraditionalBindingFeasibilityReviewFR99(review);

    expect(review.traditionalTarget).toMatchObject({
      criterionId: 'criterion.intake.lips_substantial',
      sourceConcept: '端厚',
      verificationStatus: 'unverified_ocr',
      methodologyReviewStatus: 'research',
    });
    expect(review.upstreamAuthority.fr81PriorApplicableNeutralMetricCount).toBe(0);
    expect(review.candidateNeutralMetric.metricRef).toBe(
      'neutral.mouth.contour_set.symmetric_arclength_mean_nearest_set_distance@0.1.0',
    );
    expect(review.candidateNeutralMetric.relationClass).toBe(
      'role_free_whole_contour_separation_proxy_candidate_only',
    );
    expect(review.candidateNeutralMetric.researchCandidateInventoryAdmitted).toBe(true);
    expect(review.researchCandidateMetricRefsListed).toBe(1);
  });

  it('does not admit traditional binding or thickness semantics', () => {
    const review = reviewLipsSubstantialRoleFreeSeparationTraditionalBindingFeasibilityFR99();

    expect(review.candidateNeutralMetric.directTraditionalConstructMatchEstablished).toBe(false);
    expect(review.candidateNeutralMetric.anatomicalLipThicknessMeasurementEstablished).toBe(false);
    expect(review.candidateNeutralMetric.physicalLipThicknessMeasurementEstablished).toBe(false);
    expect(review.candidateNeutralMetric.traditionalMetricBindingRef).toBeNull();
    expect(review.feasibilityDecision.traditionalMetricBindingAdmitted).toBe(false);
    expect(review.feasibilityDecision.bindingDecision).toBe('not_admitted');
    expect(review.traditionalMetricBindingsIssued).toBe(0);
    expect(review.thicknessMetricIssued).toBe(false);
    expect(review.traditionalSemanticAuthority).toBe(false);
  });

  it('keeps source, construct-validity and calibration prerequisites explicit', () => {
    const review = reviewLipsSubstantialRoleFreeSeparationTraditionalBindingFeasibilityFR99();

    expect(review.feasibilityDecision.scanCheckedSourceRequiredBeforeTraditionalBinding).toBe(true);
    expect(review.feasibilityDecision.constructValidityEvidenceRequiredBeforeProxyBinding).toBe(true);
    expect(review.feasibilityDecision.criterionSpecificCalibrationEvidenceRequired).toBe(true);
    expect(review.feasibilityDecision.criterionSpecificCalibrationProtocolRequired).toBe(true);
    expect(review.feasibilityDecision.calibratedDecisionThresholdRequiredBeforeCriterionState).toBe(true);
    expect(review.newlyExposedPrerequisiteBlockers).toEqual([
      'lips_substantial_role_free_separation_metric_construct_validity_requirements_not_reviewed',
      'lips_substantial_role_free_separation_metric_construct_validity_evidence_absent',
    ]);
    expect(review.remainingBlockers).toContain('five_officers_source_not_scan_checked');
    expect(review.remainingBlockers).toContain('role_free_cross_contour_correspondence_not_defined');
    expect(review.remainingBlockers).toContain('lips_substantial_thickness_metric_not_defined');
    expect(review.remainingBlockers).toContain('lips_substantial_calibration_evidence_absent');
    expect(review.remainingBlockers).toContain('lips_substantial_threshold_not_calibrated');
  });

  it('recommends construct-validity requirements review without widening authority', () => {
    const review = reviewLipsSubstantialRoleFreeSeparationTraditionalBindingFeasibilityFR99();

    expect(review.recommendedNextFrontier.frontierKey).toBe(
      'lips_substantial_role_free_separation_metric_construct_validity_requirements_review',
    );
    expect(review.recommendedNextFrontier.neutralProxyResearchProtocolMayBeReviewedNext).toBe(true);
    expect(review.recommendedNextFrontier.anatomicalThicknessMetricIssuanceAllowed).toBe(false);
    expect(review.recommendedNextFrontier.traditionalBindingIssuanceAllowed).toBe(false);
    expect(review.recommendedNextFrontier.calibrationThresholdIssuanceAllowed).toBe(false);
    expect(review.recommendedNextFrontier.criterionStateIssuanceAllowed).toBe(false);
    expect(review.criterionStatesIssued).toBe(0);
    expect(review.claimsIssued).toBe(0);
  });
});
