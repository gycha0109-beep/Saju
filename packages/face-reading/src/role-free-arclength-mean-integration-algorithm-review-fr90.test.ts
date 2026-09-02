import { describe, expect, it } from 'vitest';
import {
  assertIssuedRoleFreeArclengthMeanIntegrationAlgorithmReviewFR90,
  reviewRoleFreeArclengthMeanIntegrationAlgorithmFR90,
  type RoleFreeArclengthMeanIntegrationAlgorithmReviewFR90V1,
} from './role-free-arclength-mean-integration-algorithm-review-fr90.js';

describe('FR90 role-free certified arclength-mean integration algorithm review', () => {
  it('admits only Lipschitz-certified adaptive midpoint as the preferred algorithm class', () => {
    const result = reviewRoleFreeArclengthMeanIntegrationAlgorithmFR90();
    assertIssuedRoleFreeArclengthMeanIntegrationAlgorithmReviewFR90(result);

    expect(result).toMatchObject({
      schemaVersion: 'fr90-role-free-arclength-mean-integration-algorithm-review-v1',
      authorityState: 'certified_arclength_mean_integration_algorithm_class_review_completed_no_runtime_value_issued',
      algorithmDecision: {
        admittedAlgorithmClassCount: 1,
        preferredAlgorithmClass: 'lipschitz_certified_adaptive_midpoint',
        certificateType: 'deterministic_absolute_integration_error_upper_bound',
        adaptiveSubdivisionPolicy: 'split_intervals_until_global_certificate_meets_governed_numeric_accuracy_budget',
        subdivisionSelectionTieBreakRequired: true,
        nearestSetEvaluationMustUseContinuousTargetSegments: true,
        exactAnalyticLowerEnvelopeRequired: false,
        runtimePrecisionPolicyDefined: false,
        runtimeImplementationAuthorized: false,
        runtimeValueIssued: false,
      },
      runtimeGeometryFunctionalDefinitionsIssued: 0,
      runtimeGeometryValuesIssued: 0,
      neutralMetricDefinitionsIssued: 0,
      neutralMetricValuesIssued: 0,
      anatomicalRolesIssued: 0,
      crossContourCorrespondencePairsIssued: 0,
      thicknessMetricIssued: false,
      physicalAnthropometricInterpretationAuthorized: false,
      morphologyProduced: false,
      criterionStatesIssued: 0,
      claimsIssued: 0,
      traditionalSemanticAuthority: false,
    });
  });

  it('freezes the exact Lipschitz midpoint certificate mathematics', () => {
    const result = reviewRoleFreeArclengthMeanIntegrationAlgorithmFR90();

    expect(result.mathematicalBasis).toEqual({
      distanceToClosedSetLipschitzProperty: '|d(p,S)-d(q,S)| <= euclidean_distance(p,q)',
      unitSpeedArclengthConsequence: '|f(s)-f(t)| <= |s-t| for f(s)=d(gamma(s),S)',
      midpointIntervalIntegralErrorBound: '|integral_I f(s) ds - h*f(mid(I))| <= h^2/4',
      partitionDirectedIntegralErrorBound: 'sum_i h_i^2/4',
      normalizedDirectedMeanErrorBound: '(sum_i h_i^2)/(4*L_source)',
      symmetricMeanErrorBound: '0.5*(E_A_to_B + E_B_to_A)',
      nearestSetEvaluationRequirement: 'midpoint_distance_must_be_minimum_over_all_target_closed_polyline_segments',
    });
  });

  it('separates admitted certified integration from non-certified or sampling-based candidates', () => {
    const result = reviewRoleFreeArclengthMeanIntegrationAlgorithmFR90();

    expect(result.candidates[0]).toMatchObject({
      candidateKey: 'lipschitz_certified_adaptive_midpoint',
      status: 'algorithm_class_admitted_preferred_certificate_required',
      deterministic: true,
      continuousArclengthTarget: true,
      providerVertexDensityIndependentByDefinition: true,
      nonsmoothClosestPrimitiveSwitchesHandledByCertificate: true,
    });
    expect(result.candidates[1].status).toBe('mathematically_possible_not_selected_degeneracy_complexity');
    expect(result.candidates[2]).toMatchObject({
      candidateKey: 'generic_adaptive_simpson',
      status: 'not_admitted_no_nonsmooth_error_certificate',
      nonsmoothClosestPrimitiveSwitchesHandledByCertificate: false,
    });
    expect(result.candidates[3].status).toBe('rejected_sampling_substitution');
    expect(result.candidates[4]).toMatchObject({
      candidateKey: 'provider_vertex_weighted_sampling',
      status: 'rejected_sampling_substitution',
      providerVertexDensityIndependentByDefinition: false,
    });
    expect(result.candidates[5]).toMatchObject({
      candidateKey: 'monte_carlo_arclength_sampling',
      status: 'rejected_nondeterministic',
      deterministic: false,
    });
  });

  it('resolves algorithm-class governance but leaves numeric accuracy and deterministic subdivision policy open', () => {
    const result = reviewRoleFreeArclengthMeanIntegrationAlgorithmFR90();

    expect(result.resolvedProcessGap).toBe('continuous_arclength_mean_nearest_set_distance_runtime_algorithm_not_governed');
    expect(result.newlyExposedPrerequisiteBlockers).toEqual([
      'certified_arclength_mean_runtime_numeric_accuracy_policy_not_governed',
      'certified_arclength_mean_runtime_subdivision_tiebreak_not_governed',
    ]);
    expect(result.recommendedNextFrontier).toEqual({
      frontierKey: 'certified_arclength_mean_runtime_numeric_policy_review',
      purpose: 'govern deterministic numeric accuracy budget and subdivision tie-break rules before any runtime value can be issued',
      runtimeImplementationAllowed: false,
      semanticThresholdSelectionAllowed: false,
      anatomicalRoleAssignmentAllowed: false,
      thicknessSemanticAssignmentAllowed: false,
      traditionalSemanticAssignmentAllowed: false,
    });
  });

  it('rejects structurally plausible but unissued FR90 values', () => {
    const forged = {
      schemaVersion: 'fr90-role-free-arclength-mean-integration-algorithm-review-v1',
      authorityState: 'certified_arclength_mean_integration_algorithm_class_review_completed_no_runtime_value_issued',
    } as unknown as RoleFreeArclengthMeanIntegrationAlgorithmReviewFR90V1;

    expect(() => assertIssuedRoleFreeArclengthMeanIntegrationAlgorithmReviewFR90(forged))
      .toThrow(/not issued by the active FR-90 boundary/u);
  });
});