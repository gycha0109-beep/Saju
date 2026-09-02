import { describe, expect, it } from 'vitest';
import {
  assertIssuedRoleFreeWholeContourSeparationSummaryFeasibilityReviewFR89,
  reviewRoleFreeWholeContourSeparationSummaryFeasibilityFR89,
  type RoleFreeWholeContourSeparationSummaryFeasibilityReviewFR89V1,
} from './role-free-whole-contour-separation-summary-feasibility-review-fr89.js';

describe('FR89 role-free whole-contour separation summary feasibility review', () => {
  it('admits only continuous arclength mean/RMS research specifications and selects mean for algorithm review', () => {
    const result = reviewRoleFreeWholeContourSeparationSummaryFeasibilityFR89();
    assertIssuedRoleFreeWholeContourSeparationSummaryFeasibilityReviewFR89(result);

    expect(result).toMatchObject({
      schemaVersion: 'fr89-role-free-whole-contour-separation-summary-feasibility-review-v1',
      authorityState: 'role_free_whole_contour_separation_summary_feasibility_review_completed_no_runtime_value_issued',
      reviewScope: 'continuous_closed_polyline_whole_contour_separation_summaries_only',
      feasibilityDecision: {
        admittedResearchSpecificationCount: 2,
        preferredCandidate: 'symmetric_arclength_mean_nearest_set_distance',
        minimumSetSeparationAloneRepresentative: false,
        hausdorffDistanceRepresentativeAverage: false,
        vertexOnlyAggregationAllowed: false,
        runtimeAlgorithmAdmitted: false,
        runtimeValueIssued: false,
      },
      runtimeGeometryFunctionalDefinitionsIssued: 0,
      runtimeGeometryValuesIssued: 0,
      neutralMetricDefinitionsIssued: 0,
      neutralMetricValuesIssued: 0,
      anatomicalRolesIssued: 0,
      crossContourCorrespondencePairsIssued: 0,
      thicknessMetricIssued: false,
      representativeBandWidthSemanticIssued: false,
      physicalAnthropometricInterpretationAuthorized: false,
      morphologyProduced: false,
      criterionStatesIssued: 0,
      claimsIssued: 0,
      traditionalSemanticAuthority: false,
      resolvedProcessGap: 'role_free_representative_band_width_functional_not_reviewed',
    });
  });

  it('requires continuous arclength measure rather than provider vertex-count measure', () => {
    const result = reviewRoleFreeWholeContourSeparationSummaryFeasibilityFR89();

    expect(result.mathematicalDefinitions).toEqual({
      symmetricArclengthMeanNearestSetDistance: '0.5*((1/L_A)*integral_A d(a,B) ds + (1/L_B)*integral_B d(b,A) ds)',
      symmetricArclengthRmsNearestSetDistance: 'sqrt(0.5*((1/L_A)*integral_A d(a,B)^2 ds + (1/L_B)*integral_B d(b,A)^2 ds))',
      arclengthMeasureRequirement: 'continuous_polyline_arclength_measure_not_provider_vertex_count_measure',
      nearestSetDistanceDefinition: 'd(p,S)=inf_{s_in_S} euclidean_distance(p,s)',
    });

    const mean = result.candidates[0];
    const rms = result.candidates[1];
    const median = result.candidates[2];
    const vertexMean = result.candidates[3];

    expect(mean).toMatchObject({
      candidateKey: 'symmetric_arclength_mean_nearest_set_distance',
      status: 'research_spec_admitted_preferred_for_runtime_algorithm_review',
      continuousClosedPolylineFunctional: true,
      symmetricUnderContourSwap: true,
      explicitPointPairCorrespondenceRequired: false,
      anatomicalRolesRequired: false,
      samplingDensityInvariantByDefinition: true,
      wholeContourCoverage: 'continuous_arclength',
    });
    expect(rms.status).toBe('research_spec_admitted_secondary_not_selected');
    expect(median.status).toBe('not_admitted_requires_quantile_convention_and_runtime_solver');
    expect(vertexMean).toMatchObject({
      candidateKey: 'vertex_mean_nearest_neighbor_distance',
      status: 'rejected_sampling_density_dependent',
      continuousClosedPolylineFunctional: false,
      samplingDensityInvariantByDefinition: false,
      wholeContourCoverage: 'discrete_vertices_only',
    });
  });

  it('keeps local minimum and worst-case Hausdorff out of representative-average semantics', () => {
    const result = reviewRoleFreeWholeContourSeparationSummaryFeasibilityFR89();

    expect(result.candidates[4]).toMatchObject({
      candidateKey: 'minimum_set_separation',
      status: 'existing_runtime_local_extreme_not_representative',
      wholeContourCoverage: 'continuous_extreme_only',
    });
    expect(result.candidates[5]).toMatchObject({
      candidateKey: 'bidirectional_hausdorff_distance',
      status: 'existing_research_spec_worst_case_not_representative',
      wholeContourCoverage: 'continuous_extreme_only',
    });
    expect(result.authorityBoundary.minimumSetSeparationMeansRepresentativeWholeContourWidth).toBe(false);
    expect(result.authorityBoundary.hausdorffMeansRepresentativeWholeContourWidth).toBe(false);
  });

  it('routes the next frontier to runtime-algorithm governance rather than implementation', () => {
    const result = reviewRoleFreeWholeContourSeparationSummaryFeasibilityFR89();

    expect(result.newlyExposedPrerequisiteBlockers).toEqual([
      'continuous_arclength_mean_nearest_set_distance_runtime_algorithm_not_governed',
    ]);
    expect(result.recommendedNextFrontier).toEqual({
      frontierKey: 'role_free_arclength_mean_nearest_set_distance_runtime_algorithm_review',
      purpose: 'govern_exact_or_certified_continuous_arclength_integration_of_nearest_set_distance_without_vertex_sampling_substitution',
      runtimeImplementationAllowedBeforeAlgorithmReview: false,
      discreteVertexSamplingSubstitutionAllowed: false,
      correspondenceAssignmentAllowed: false,
      anatomicalRoleAssignmentAllowed: false,
      thicknessSemanticAssignmentAllowed: false,
      traditionalSemanticAssignmentAllowed: false,
    });
  });

  it('rejects structurally plausible but unissued FR89 review values', () => {
    const forged = {
      schemaVersion: 'fr89-role-free-whole-contour-separation-summary-feasibility-review-v1',
      authorityState: 'role_free_whole_contour_separation_summary_feasibility_review_completed_no_runtime_value_issued',
    } as unknown as RoleFreeWholeContourSeparationSummaryFeasibilityReviewFR89V1;

    expect(() => assertIssuedRoleFreeWholeContourSeparationSummaryFeasibilityReviewFR89(forged))
      .toThrow(/not issued by the active FR-89 boundary/u);
  });
});