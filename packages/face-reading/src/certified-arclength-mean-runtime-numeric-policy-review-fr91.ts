import {
  assertIssuedRoleFreeArclengthMeanIntegrationAlgorithmReviewFR90,
  reviewRoleFreeArclengthMeanIntegrationAlgorithmFR90,
} from './role-free-arclength-mean-integration-algorithm-review-fr90.js';
import { FaceAuthorityValidationError } from './validation.js';

export interface CertifiedArclengthMeanRuntimeNumericPolicyReviewFR91V1 {
  readonly schemaVersion: 'fr91-certified-arclength-mean-runtime-numeric-policy-review-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'certified_arclength_mean_numeric_policy_review_completed_no_runtime_value_issued';
  readonly sourceAuthority: {
    readonly fr90SchemaVersion: 'fr90-role-free-arclength-mean-integration-algorithm-review-v1';
    readonly preferredAlgorithmClass: 'lipschitz_certified_adaptive_midpoint';
    readonly certificateType: 'deterministic_absolute_integration_error_upper_bound';
    readonly runtimePrecisionPolicyDefinedBeforeFR91: false;
    readonly runtimeImplementationAuthorizedBeforeFR91: false;
  };
  readonly numericAccuracyPolicy: {
    readonly budgetKind: 'source_perimeter_relative_dyadic_absolute_error_bound';
    readonly directedMeanRelativeErrorExponent: 12;
    readonly directedMeanRelativeErrorFraction: '2^-12';
    readonly directedMeanRelativeErrorDenominator: 4096;
    readonly directedMeanAbsoluteErrorBudget: 'L_source/4096';
    readonly symmetricMeanAbsoluteErrorBudget: '(L_A+L_B)/8192';
    readonly empiricalCalibrationUsed: false;
    readonly morphologyThreshold: false;
    readonly traditionalSemanticThreshold: false;
    readonly physicalAnthropometricTolerance: false;
    readonly policyClass: 'engineering_numeric_certification_contract';
  };
  readonly deterministicSubdivisionPolicy: {
    readonly intervalPriority: 'largest_h_squared_over_4_certificate_contribution_first';
    readonly exactTiePolicy: 'split_all_equal_maximum_binary64_certificate_intervals_in_same_round';
    readonly providerSegmentIndexTieBreakAllowed: false;
    readonly fuzzyCoordinateEpsilonTieBreakAllowed: false;
    readonly contourStartIndexInvariantByConstruction: true;
    readonly contourOrientationInvariantByConstruction: true;
    readonly selectedIntervalBisection: 'arclength_midpoint_binary_bisection';
    readonly nearestSetEvaluation: 'minimum_distance_to_all_continuous_target_closed_polyline_segments';
    readonly stopRule: 'each_directed_mean_certificate_lte_source_perimeter_over_4096';
    readonly runtimeArithmetic: 'ieee754_binary64_finite_only';
    readonly nonFiniteArithmeticFailsClosed: true;
    readonly bisectionStagnationFailsClosed: true;
  };
  readonly terminationCertificate: {
    readonly sufficientLeafLengthCondition: 'max_leaf_h_lte_L_source/1024';
    readonly sufficientConditionProof: 'sum_h_squared_lte_max_h_times_L_source_then_directed_mean_error_lte_L_source/4096';
    readonly maximumDyadicDepthPerInitialIntervalToReachSufficientCondition: 10;
    readonly maximumLeafMultiplierPerInitialInterval: 1024;
    readonly maximumLeafCountFormula: 'initial_source_segment_count*1024';
    readonly arbitraryIterationCapRequiredForMathematicalTermination: false;
    readonly implementationMustStillFailClosedOnBinary64Stagnation: true;
  };
  readonly policyDecision: {
    readonly numericAccuracyPolicyGoverned: true;
    readonly deterministicSubdivisionTiePolicyGoverned: true;
    readonly providerOrderIndependentSelectionGoverned: true;
    readonly neutralRuntimeImplementationMayBeReviewedNext: true;
    readonly runtimeImplementationIssued: false;
    readonly runtimeValueIssued: false;
    readonly neutralMetricBindingIssued: false;
  };
  readonly runtimeGeometryFunctionalDefinitionsIssued: 0;
  readonly runtimeGeometryValuesIssued: 0;
  readonly neutralMetricDefinitionsIssued: 0;
  readonly neutralMetricValuesIssued: 0;
  readonly anatomicalRolesIssued: 0;
  readonly crossContourCorrespondencePairsIssued: 0;
  readonly thicknessMetricIssued: false;
  readonly physicalAnthropometricInterpretationAuthorized: false;
  readonly morphologyProduced: false;
  readonly criterionStatesIssued: 0;
  readonly claimsIssued: 0;
  readonly traditionalSemanticAuthority: false;
  readonly resolvedProcessGaps: readonly [
    'certified_arclength_mean_runtime_numeric_accuracy_policy_not_governed',
    'certified_arclength_mean_runtime_subdivision_tiebreak_not_governed',
  ];
  readonly newlyExposedPrerequisiteBlockers: readonly [
    'certified_arclength_mean_runtime_implementation_not_issued',
  ];
  readonly remainingBlockers: readonly [
    'fr15_mouth_consumer_slot_not_issued',
    'five_officers_source_not_scan_checked',
    'five_officers_methodology_research_only',
    'outer_inner_lip_roles_not_authorized',
    'role_free_cross_contour_correspondence_not_defined',
    'lips_substantial_thickness_metric_not_defined',
    'lips_substantial_calibration_evidence_absent',
    'lips_substantial_calibration_protocol_absent',
    'lips_substantial_threshold_not_calibrated',
    'continuous_polyline_hausdorff_runtime_algorithm_not_governed',
  ];
  readonly authorityBoundary: {
    readonly dyadicNumericBudgetMeansEmpiricalMorphologyThreshold: false;
    readonly dyadicNumericBudgetMeansTraditionalThicknessThreshold: false;
    readonly sourcePerimeterScaleMeansPhysicalAnthropometricScale: false;
    readonly equalMaximumBatchSplitMeansProviderSemanticOrdering: false;
    readonly certifiedNumericConvergenceMeansLipThickness: false;
    readonly certifiedNumericConvergenceMeansPhysicalBandWidth: false;
    readonly numericPolicyReviewMeansProductionMetricBinding: false;
    readonly numericPolicyReviewMeansTraditionalDuanHou: false;
  };
  readonly prohibitedShortcuts: readonly [
    'numeric_accuracy_budget_to_morphology_threshold',
    'numeric_accuracy_budget_to_traditional_thickness_threshold',
    'source_perimeter_coordinate_scale_to_physical_anthropometric_scale',
    'provider_segment_index_to_subdivision_tiebreak',
    'fuzzy_coordinate_epsilon_to_subdivision_tiebreak',
    'certificate_convergence_to_lip_thickness',
    'certificate_convergence_to_physical_band_width',
    'numeric_policy_review_to_runtime_value',
    'numeric_policy_review_to_neutral_metric_binding',
    'numeric_policy_review_to_traditional_duan_hou_semantics',
  ];
  readonly recommendedNextFrontier: {
    readonly frontierKey: 'certified_arclength_mean_runtime_implementation';
    readonly purpose: 'implement the role-free certified symmetric arclength-mean nearest-set runtime under the governed FR90 algorithm and FR91 numeric policy';
    readonly runtimeConstructionAllowed: true;
    readonly runtimeValueAlreadyIssued: false;
    readonly anatomicalRoleAssignmentAllowed: false;
    readonly correspondencePairIssuanceAllowed: false;
    readonly thicknessSemanticAssignmentAllowed: false;
    readonly physicalAnthropometricInterpretationAllowed: false;
    readonly traditionalSemanticAssignmentAllowed: false;
  };
}

const ISSUED = new WeakSet<object>();

const RESOLVED = Object.freeze([
  'certified_arclength_mean_runtime_numeric_accuracy_policy_not_governed',
  'certified_arclength_mean_runtime_subdivision_tiebreak_not_governed',
] as const);

const NEW_BLOCKERS = Object.freeze([
  'certified_arclength_mean_runtime_implementation_not_issued',
] as const);

const REMAINING = Object.freeze([
  'fr15_mouth_consumer_slot_not_issued',
  'five_officers_source_not_scan_checked',
  'five_officers_methodology_research_only',
  'outer_inner_lip_roles_not_authorized',
  'role_free_cross_contour_correspondence_not_defined',
  'lips_substantial_thickness_metric_not_defined',
  'lips_substantial_calibration_evidence_absent',
  'lips_substantial_calibration_protocol_absent',
  'lips_substantial_threshold_not_calibrated',
  'continuous_polyline_hausdorff_runtime_algorithm_not_governed',
] as const);

const PROHIBITED = Object.freeze([
  'numeric_accuracy_budget_to_morphology_threshold',
  'numeric_accuracy_budget_to_traditional_thickness_threshold',
  'source_perimeter_coordinate_scale_to_physical_anthropometric_scale',
  'provider_segment_index_to_subdivision_tiebreak',
  'fuzzy_coordinate_epsilon_to_subdivision_tiebreak',
  'certificate_convergence_to_lip_thickness',
  'certificate_convergence_to_physical_band_width',
  'numeric_policy_review_to_runtime_value',
  'numeric_policy_review_to_neutral_metric_binding',
  'numeric_policy_review_to_traditional_duan_hou_semantics',
] as const);

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-91 ${message}`);
}

function validateFR90Authority(): void {
  const fr90 = reviewRoleFreeArclengthMeanIntegrationAlgorithmFR90();
  assertIssuedRoleFreeArclengthMeanIntegrationAlgorithmReviewFR90(fr90);
  if (
    fr90.schemaVersion !== 'fr90-role-free-arclength-mean-integration-algorithm-review-v1' ||
    fr90.authorityState !== 'certified_arclength_mean_integration_algorithm_class_review_completed_no_runtime_value_issued' ||
    fr90.algorithmDecision.preferredAlgorithmClass !== 'lipschitz_certified_adaptive_midpoint' ||
    fr90.algorithmDecision.certificateType !== 'deterministic_absolute_integration_error_upper_bound' ||
    fr90.algorithmDecision.runtimePrecisionPolicyDefined !== false ||
    fr90.algorithmDecision.runtimeImplementationAuthorized !== false ||
    fr90.algorithmDecision.runtimeValueIssued !== false ||
    fr90.recommendedNextFrontier.frontierKey !== 'certified_arclength_mean_runtime_numeric_policy_review' ||
    !fr90.newlyExposedPrerequisiteBlockers.includes('certified_arclength_mean_runtime_numeric_accuracy_policy_not_governed') ||
    !fr90.newlyExposedPrerequisiteBlockers.includes('certified_arclength_mean_runtime_subdivision_tiebreak_not_governed') ||
    fr90.thicknessMetricIssued !== false ||
    fr90.traditionalSemanticAuthority !== false
  ) fail('FR-90 algorithm or numeric-policy gate authority drift.');
}

export function reviewCertifiedArclengthMeanRuntimeNumericPolicyFR91(): CertifiedArclengthMeanRuntimeNumericPolicyReviewFR91V1 {
  validateFR90Authority();

  const result: CertifiedArclengthMeanRuntimeNumericPolicyReviewFR91V1 = Object.freeze({
    schemaVersion: 'fr91-certified-arclength-mean-runtime-numeric-policy-review-v1' as const,
    artifactVersion: '0.1.0' as const,
    authorityState: 'certified_arclength_mean_numeric_policy_review_completed_no_runtime_value_issued' as const,
    sourceAuthority: Object.freeze({
      fr90SchemaVersion: 'fr90-role-free-arclength-mean-integration-algorithm-review-v1' as const,
      preferredAlgorithmClass: 'lipschitz_certified_adaptive_midpoint' as const,
      certificateType: 'deterministic_absolute_integration_error_upper_bound' as const,
      runtimePrecisionPolicyDefinedBeforeFR91: false as const,
      runtimeImplementationAuthorizedBeforeFR91: false as const,
    }),
    numericAccuracyPolicy: Object.freeze({
      budgetKind: 'source_perimeter_relative_dyadic_absolute_error_bound' as const,
      directedMeanRelativeErrorExponent: 12 as const,
      directedMeanRelativeErrorFraction: '2^-12' as const,
      directedMeanRelativeErrorDenominator: 4096 as const,
      directedMeanAbsoluteErrorBudget: 'L_source/4096' as const,
      symmetricMeanAbsoluteErrorBudget: '(L_A+L_B)/8192' as const,
      empiricalCalibrationUsed: false as const,
      morphologyThreshold: false as const,
      traditionalSemanticThreshold: false as const,
      physicalAnthropometricTolerance: false as const,
      policyClass: 'engineering_numeric_certification_contract' as const,
    }),
    deterministicSubdivisionPolicy: Object.freeze({
      intervalPriority: 'largest_h_squared_over_4_certificate_contribution_first' as const,
      exactTiePolicy: 'split_all_equal_maximum_binary64_certificate_intervals_in_same_round' as const,
      providerSegmentIndexTieBreakAllowed: false as const,
      fuzzyCoordinateEpsilonTieBreakAllowed: false as const,
      contourStartIndexInvariantByConstruction: true as const,
      contourOrientationInvariantByConstruction: true as const,
      selectedIntervalBisection: 'arclength_midpoint_binary_bisection' as const,
      nearestSetEvaluation: 'minimum_distance_to_all_continuous_target_closed_polyline_segments' as const,
      stopRule: 'each_directed_mean_certificate_lte_source_perimeter_over_4096' as const,
      runtimeArithmetic: 'ieee754_binary64_finite_only' as const,
      nonFiniteArithmeticFailsClosed: true as const,
      bisectionStagnationFailsClosed: true as const,
    }),
    terminationCertificate: Object.freeze({
      sufficientLeafLengthCondition: 'max_leaf_h_lte_L_source/1024' as const,
      sufficientConditionProof: 'sum_h_squared_lte_max_h_times_L_source_then_directed_mean_error_lte_L_source/4096' as const,
      maximumDyadicDepthPerInitialIntervalToReachSufficientCondition: 10 as const,
      maximumLeafMultiplierPerInitialInterval: 1024 as const,
      maximumLeafCountFormula: 'initial_source_segment_count*1024' as const,
      arbitraryIterationCapRequiredForMathematicalTermination: false as const,
      implementationMustStillFailClosedOnBinary64Stagnation: true as const,
    }),
    policyDecision: Object.freeze({
      numericAccuracyPolicyGoverned: true as const,
      deterministicSubdivisionTiePolicyGoverned: true as const,
      providerOrderIndependentSelectionGoverned: true as const,
      neutralRuntimeImplementationMayBeReviewedNext: true as const,
      runtimeImplementationIssued: false as const,
      runtimeValueIssued: false as const,
      neutralMetricBindingIssued: false as const,
    }),
    runtimeGeometryFunctionalDefinitionsIssued: 0 as const,
    runtimeGeometryValuesIssued: 0 as const,
    neutralMetricDefinitionsIssued: 0 as const,
    neutralMetricValuesIssued: 0 as const,
    anatomicalRolesIssued: 0 as const,
    crossContourCorrespondencePairsIssued: 0 as const,
    thicknessMetricIssued: false as const,
    physicalAnthropometricInterpretationAuthorized: false as const,
    morphologyProduced: false as const,
    criterionStatesIssued: 0 as const,
    claimsIssued: 0 as const,
    traditionalSemanticAuthority: false as const,
    resolvedProcessGaps: RESOLVED,
    newlyExposedPrerequisiteBlockers: NEW_BLOCKERS,
    remainingBlockers: REMAINING,
    authorityBoundary: Object.freeze({
      dyadicNumericBudgetMeansEmpiricalMorphologyThreshold: false as const,
      dyadicNumericBudgetMeansTraditionalThicknessThreshold: false as const,
      sourcePerimeterScaleMeansPhysicalAnthropometricScale: false as const,
      equalMaximumBatchSplitMeansProviderSemanticOrdering: false as const,
      certifiedNumericConvergenceMeansLipThickness: false as const,
      certifiedNumericConvergenceMeansPhysicalBandWidth: false as const,
      numericPolicyReviewMeansProductionMetricBinding: false as const,
      numericPolicyReviewMeansTraditionalDuanHou: false as const,
    }),
    prohibitedShortcuts: PROHIBITED,
    recommendedNextFrontier: Object.freeze({
      frontierKey: 'certified_arclength_mean_runtime_implementation' as const,
      purpose: 'implement the role-free certified symmetric arclength-mean nearest-set runtime under the governed FR90 algorithm and FR91 numeric policy' as const,
      runtimeConstructionAllowed: true as const,
      runtimeValueAlreadyIssued: false as const,
      anatomicalRoleAssignmentAllowed: false as const,
      correspondencePairIssuanceAllowed: false as const,
      thicknessSemanticAssignmentAllowed: false as const,
      physicalAnthropometricInterpretationAllowed: false as const,
      traditionalSemanticAssignmentAllowed: false as const,
    }),
  });

  ISSUED.add(result);
  return result;
}

export function assertIssuedCertifiedArclengthMeanRuntimeNumericPolicyReviewFR91(
  value: CertifiedArclengthMeanRuntimeNumericPolicyReviewFR91V1,
): void {
  if (!ISSUED.has(value as object)) fail('value was not issued by the active FR-91 boundary.');
}
