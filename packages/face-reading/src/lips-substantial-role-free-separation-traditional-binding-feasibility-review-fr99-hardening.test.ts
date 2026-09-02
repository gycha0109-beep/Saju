import { describe, expect, it } from 'vitest';
import {
  assertIssuedLipsSubstantialRoleFreeSeparationTraditionalBindingFeasibilityReviewFR99,
  reviewLipsSubstantialRoleFreeSeparationTraditionalBindingFeasibilityFR99,
  type LipsSubstantialRoleFreeSeparationTraditionalBindingFeasibilityReviewFR99V1,
} from './lips-substantial-role-free-separation-traditional-binding-feasibility-review-fr99.js';

describe('FR99 lips-substantial binding feasibility hardening', () => {
  it('rejects structurally plausible but unissued review artifacts', () => {
    const forged = {
      schemaVersion: 'fr99-lips-substantial-role-free-separation-traditional-binding-feasibility-review-v1',
      authorityState: 'lips_substantial_role_free_separation_traditional_binding_feasibility_review_completed_no_binding_admitted',
      candidateNeutralMetric: {
        metricRef: 'neutral.mouth.contour_set.symmetric_arclength_mean_nearest_set_distance@0.1.0',
        researchCandidateInventoryAdmitted: true,
        directTraditionalConstructMatchEstablished: false,
      },
      feasibilityDecision: { traditionalMetricBindingAdmitted: false },
      traditionalMetricBindingsIssued: 0,
      calibrationRefsIssued: 0,
      thresholdRefsIssued: 0,
      anatomicalRolesIssued: 0,
      crossContourCorrespondencePairsIssued: 0,
      thicknessMetricIssued: false,
      morphologyProduced: false,
      criterionStatesIssued: 0,
      claimsIssued: 0,
      traditionalSemanticAuthority: false,
      recommendedNextFrontier: {
        frontierKey: 'lips_substantial_role_free_separation_metric_construct_validity_requirements_review',
      },
    } as unknown as LipsSubstantialRoleFreeSeparationTraditionalBindingFeasibilityReviewFR99V1;

    expect(() => assertIssuedLipsSubstantialRoleFreeSeparationTraditionalBindingFeasibilityReviewFR99(forged))
      .toThrow(/not issued by the active FR-99 boundary/u);
  });

  it('preserves the separation/thickness/correspondence/traditional distinctions', () => {
    const review = reviewLipsSubstantialRoleFreeSeparationTraditionalBindingFeasibilityFR99();

    expect(review.authorityBoundary.researchCandidateInventoryMeansTraditionalBinding).toBe(false);
    expect(review.authorityBoundary.roleFreeWholeContourSeparationMeansLipThickness).toBe(false);
    expect(review.authorityBoundary.canonicalMetricPlaneDistanceMeansPhysicalLipThickness).toBe(false);
    expect(review.authorityBoundary.nearestSetDistanceMeansCrossContourCorrespondence).toBe(false);
    expect(review.authorityBoundary.metricRuntimeAvailabilityMeansConstructValidity).toBe(false);
    expect(review.authorityBoundary.unverifiedOcrMeansScanCheckedSource).toBe(false);
    expect(review.authorityBoundary.researchMethodologyMeansProductionAuthority).toBe(false);
    expect(review.authorityBoundary.sourceConceptMeansNumericThreshold).toBe(false);
    expect(review.authorityBoundary.bindingFeasibilityReviewMeansCriterionState).toBe(false);
  });

  it('keeps all dangerous shortcut promotions prohibited', () => {
    const review = reviewLipsSubstantialRoleFreeSeparationTraditionalBindingFeasibilityFR99();

    expect(review.prohibitedShortcuts).toEqual([
      'research_candidate_metric_to_traditional_binding',
      'role_free_arclength_mean_separation_to_lip_thickness',
      'canonical_metric_plane_distance_to_physical_lip_thickness',
      'nearest_set_distance_to_cross_contour_correspondence_pair',
      'fr98_metric_value_to_traditional_duan_hou_semantics',
      'unverified_ocr_to_scan_checked_source',
      'research_methodology_to_production_authority',
      'source_concept_to_uncalibrated_threshold',
      'binding_feasibility_review_to_criterion_state',
    ]);
  });

  it('does not convert research candidacy into calibration or criterion output', () => {
    const review = reviewLipsSubstantialRoleFreeSeparationTraditionalBindingFeasibilityFR99();

    expect(review.neutralMetricDefinitionsReviewed).toBe(1);
    expect(review.neutralMetricValuesReviewed).toBe(0);
    expect(review.researchCandidateMetricRefsListed).toBe(1);
    expect(review.calibrationRefsIssued).toBe(0);
    expect(review.thresholdRefsIssued).toBe(0);
    expect(review.anatomicalRolesIssued).toBe(0);
    expect(review.crossContourCorrespondencePairsIssued).toBe(0);
    expect(review.physicalAnthropometricInterpretationAuthorized).toBe(false);
    expect(review.morphologyProduced).toBe(false);
    expect(review.criterionStatesIssued).toBe(0);
    expect(review.claimsIssued).toBe(0);
  });
});
