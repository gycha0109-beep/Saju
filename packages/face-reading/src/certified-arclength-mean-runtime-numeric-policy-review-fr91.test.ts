import { describe, expect, it } from 'vitest';
import {
  assertIssuedCertifiedArclengthMeanRuntimeNumericPolicyReviewFR91,
  reviewCertifiedArclengthMeanRuntimeNumericPolicyFR91,
  type CertifiedArclengthMeanRuntimeNumericPolicyReviewFR91V1,
} from './certified-arclength-mean-runtime-numeric-policy-review-fr91.js';

describe('FR91 certified arclength-mean runtime numeric policy review', () => {
  it('governs a dyadic source-perimeter-relative numerical certificate budget', () => {
    const result = reviewCertifiedArclengthMeanRuntimeNumericPolicyFR91();
    assertIssuedCertifiedArclengthMeanRuntimeNumericPolicyReviewFR91(result);

    expect(result).toMatchObject({
      schemaVersion: 'fr91-certified-arclength-mean-runtime-numeric-policy-review-v1',
      authorityState: 'certified_arclength_mean_numeric_policy_review_completed_no_runtime_value_issued',
      numericAccuracyPolicy: {
        budgetKind: 'source_perimeter_relative_dyadic_absolute_error_bound',
        directedMeanRelativeErrorExponent: 12,
        directedMeanRelativeErrorFraction: '2^-12',
        directedMeanRelativeErrorDenominator: 4096,
        directedMeanAbsoluteErrorBudget: 'L_source/4096',
        symmetricMeanAbsoluteErrorBudget: '(L_A+L_B)/8192',
        empiricalCalibrationUsed: false,
        morphologyThreshold: false,
        traditionalSemanticThreshold: false,
      },
    });
  });

  it('governs provider-order-independent equal-maximum batch bisection', () => {
    const result = reviewCertifiedArclengthMeanRuntimeNumericPolicyFR91();

    expect(result.deterministicSubdivisionPolicy).toEqual({
      intervalPriority: 'largest_h_squared_over_4_certificate_contribution_first',
      exactTiePolicy: 'split_all_equal_maximum_binary64_certificate_intervals_in_same_round',
      providerSegmentIndexTieBreakAllowed: false,
      fuzzyCoordinateEpsilonTieBreakAllowed: false,
      contourStartIndexInvariantByConstruction: true,
      contourOrientationInvariantByConstruction: true,
      selectedIntervalBisection: 'arclength_midpoint_binary_bisection',
      nearestSetEvaluation: 'minimum_distance_to_all_continuous_target_closed_polyline_segments',
      stopRule: 'each_directed_mean_certificate_lte_source_perimeter_over_4096',
      runtimeArithmetic: 'ieee754_binary64_finite_only',
      nonFiniteArithmeticFailsClosed: true,
      bisectionStagnationFailsClosed: true,
    });
  });

  it('freezes a finite certificate-derived dyadic termination bound', () => {
    const result = reviewCertifiedArclengthMeanRuntimeNumericPolicyFR91();

    expect(result.terminationCertificate).toEqual({
      sufficientLeafLengthCondition: 'max_leaf_h_lte_L_source/1024',
      sufficientConditionProof: 'sum_h_squared_lte_max_h_times_L_source_then_directed_mean_error_lte_L_source/4096',
      maximumDyadicDepthPerInitialIntervalToReachSufficientCondition: 10,
      maximumLeafMultiplierPerInitialInterval: 1024,
      maximumLeafCountFormula: 'initial_source_segment_count*1024',
      arbitraryIterationCapRequiredForMathematicalTermination: false,
      implementationMustStillFailClosedOnBinary64Stagnation: true,
    });
  });

  it('resolves the FR90 numeric blockers while issuing no runtime or semantic value', () => {
    const result = reviewCertifiedArclengthMeanRuntimeNumericPolicyFR91();

    expect(result.resolvedProcessGaps).toEqual([
      'certified_arclength_mean_runtime_numeric_accuracy_policy_not_governed',
      'certified_arclength_mean_runtime_subdivision_tiebreak_not_governed',
    ]);
    expect(result.newlyExposedPrerequisiteBlockers).toEqual([
      'certified_arclength_mean_runtime_implementation_not_issued',
    ]);
    expect(result.policyDecision).toMatchObject({
      numericAccuracyPolicyGoverned: true,
      deterministicSubdivisionTiePolicyGoverned: true,
      providerOrderIndependentSelectionGoverned: true,
      neutralRuntimeImplementationMayBeReviewedNext: true,
      runtimeImplementationIssued: false,
      runtimeValueIssued: false,
      neutralMetricBindingIssued: false,
    });
    expect(result.runtimeGeometryValuesIssued).toBe(0);
    expect(result.neutralMetricValuesIssued).toBe(0);
    expect(result.thicknessMetricIssued).toBe(false);
    expect(result.morphologyProduced).toBe(false);
    expect(result.criterionStatesIssued).toBe(0);
    expect(result.claimsIssued).toBe(0);
    expect(result.traditionalSemanticAuthority).toBe(false);
  });

  it('rejects structurally plausible but unissued FR91 values', () => {
    const forged = {
      schemaVersion: 'fr91-certified-arclength-mean-runtime-numeric-policy-review-v1',
      authorityState: 'certified_arclength_mean_numeric_policy_review_completed_no_runtime_value_issued',
    } as unknown as CertifiedArclengthMeanRuntimeNumericPolicyReviewFR91V1;

    expect(() => assertIssuedCertifiedArclengthMeanRuntimeNumericPolicyReviewFR91(forged))
      .toThrow(/not issued by the active FR-91 boundary/u);
  });
});
