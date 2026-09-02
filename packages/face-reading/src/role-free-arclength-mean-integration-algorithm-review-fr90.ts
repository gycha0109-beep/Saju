import {
  assertIssuedRoleFreeWholeContourSeparationSummaryFeasibilityReviewFR89,
  reviewRoleFreeWholeContourSeparationSummaryFeasibilityFR89,
} from './role-free-whole-contour-separation-summary-feasibility-review-fr89.js';
import { FaceAuthorityValidationError } from './validation.js';

export type ArclengthIntegrationAlgorithmCandidateStatusFR90 =
  | 'algorithm_class_admitted_preferred_certificate_required'
  | 'mathematically_possible_not_selected_degeneracy_complexity'
  | 'not_admitted_no_nonsmooth_error_certificate'
  | 'rejected_sampling_substitution'
  | 'rejected_nondeterministic';

export interface ArclengthIntegrationAlgorithmCandidateFR90V1 {
  readonly candidateKey:
    | 'lipschitz_certified_adaptive_midpoint'
    | 'exact_lower_envelope_analytic_partition'
    | 'generic_adaptive_simpson'
    | 'fixed_uniform_point_sampling'
    | 'provider_vertex_weighted_sampling'
    | 'monte_carlo_arclength_sampling';
  readonly status: ArclengthIntegrationAlgorithmCandidateStatusFR90;
  readonly deterministic: boolean;
  readonly continuousArclengthTarget: boolean;
  readonly providerVertexDensityIndependentByDefinition: boolean;
  readonly nonsmoothClosestPrimitiveSwitchesHandledByCertificate: boolean;
  readonly explicitPointPairCorrespondenceRequired: false;
  readonly anatomicalRolesRequired: false;
  readonly interpretationBoundary: string;
}

export interface RoleFreeArclengthMeanIntegrationAlgorithmReviewFR90V1 {
  readonly schemaVersion: 'fr90-role-free-arclength-mean-integration-algorithm-review-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'certified_arclength_mean_integration_algorithm_class_review_completed_no_runtime_value_issued';
  readonly sourceAuthority: {
    readonly fr89SchemaVersion: 'fr89-role-free-whole-contour-separation-summary-feasibility-review-v1';
    readonly preferredFunctional: 'symmetric_arclength_mean_nearest_set_distance';
    readonly runtimeImplementationAllowedBeforeAlgorithmReview: false;
  };
  readonly mathematicalBasis: {
    readonly distanceToClosedSetLipschitzProperty: '|d(p,S)-d(q,S)| <= euclidean_distance(p,q)';
    readonly unitSpeedArclengthConsequence: '|f(s)-f(t)| <= |s-t| for f(s)=d(gamma(s),S)';
    readonly midpointIntervalIntegralErrorBound: '|integral_I f(s) ds - h*f(mid(I))| <= h^2/4';
    readonly partitionDirectedIntegralErrorBound: 'sum_i h_i^2/4';
    readonly normalizedDirectedMeanErrorBound: '(sum_i h_i^2)/(4*L_source)';
    readonly symmetricMeanErrorBound: '0.5*(E_A_to_B + E_B_to_A)';
    readonly nearestSetEvaluationRequirement: 'midpoint_distance_must_be_minimum_over_all_target_closed_polyline_segments';
  };
  readonly candidates: readonly [
    ArclengthIntegrationAlgorithmCandidateFR90V1,
    ArclengthIntegrationAlgorithmCandidateFR90V1,
    ArclengthIntegrationAlgorithmCandidateFR90V1,
    ArclengthIntegrationAlgorithmCandidateFR90V1,
    ArclengthIntegrationAlgorithmCandidateFR90V1,
    ArclengthIntegrationAlgorithmCandidateFR90V1,
  ];
  readonly algorithmDecision: {
    readonly admittedAlgorithmClassCount: 1;
    readonly preferredAlgorithmClass: 'lipschitz_certified_adaptive_midpoint';
    readonly certificateType: 'deterministic_absolute_integration_error_upper_bound';
    readonly adaptiveSubdivisionPolicy: 'split_intervals_until_global_certificate_meets_governed_numeric_accuracy_budget';
    readonly subdivisionSelectionTieBreakRequired: true;
    readonly nearestSetEvaluationMustUseContinuousTargetSegments: true;
    readonly exactAnalyticLowerEnvelopeRequired: false;
    readonly runtimePrecisionPolicyDefined: false;
    readonly runtimeImplementationAuthorized: false;
    readonly runtimeValueIssued: false;
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
  readonly resolvedProcessGap: 'continuous_arclength_mean_nearest_set_distance_runtime_algorithm_not_governed';
  readonly newlyExposedPrerequisiteBlockers: readonly [
    'certified_arclength_mean_runtime_numeric_accuracy_policy_not_governed',
    'certified_arclength_mean_runtime_subdivision_tiebreak_not_governed',
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
    readonly certifiedNumericalIntegralMeansExactAnalyticIntegral: false;
    readonly numericalAccuracyBudgetMeansEmpiricalMorphologyThreshold: false;
    readonly nearestSetMidpointEvaluationMeansPointCorrespondence: false;
    readonly arclengthMeanSeparationMeansLipThickness: false;
    readonly arclengthMeanSeparationMeansPhysicalBandWidth: false;
    readonly coordinateCentimeterMeansPhysicalSoftTissueAnthropometry: false;
    readonly certifiedAlgorithmClassMeansProductionMetricBinding: false;
    readonly certifiedAlgorithmClassMeansTraditionalDuanHou: false;
  };
  readonly prohibitedShortcuts: readonly [
    'fixed_uniform_samples_to_certified_continuous_arclength_integral',
    'provider_vertices_to_continuous_arclength_measure',
    'generic_adaptive_simpson_without_nonsmooth_certificate_to_certified_integral',
    'monte_carlo_samples_to_deterministic_certified_integral',
    'numeric_accuracy_budget_to_morphology_threshold',
    'nearest_set_evaluation_to_point_correspondence',
    'arclength_mean_separation_to_lip_thickness',
    'arclength_mean_separation_to_physical_band_width',
    'coordinate_centimeter_to_physical_soft_tissue_anthropometry',
    'certified_algorithm_to_neutral_metric_semantic_binding',
    'certified_algorithm_to_traditional_duan_hou_semantics',
  ];
  readonly recommendedNextFrontier: {
    readonly frontierKey: 'certified_arclength_mean_runtime_numeric_policy_review';
    readonly purpose: 'govern deterministic numeric accuracy budget and subdivision tie-break rules before any runtime value can be issued';
    readonly runtimeImplementationAllowed: false;
    readonly semanticThresholdSelectionAllowed: false;
    readonly anatomicalRoleAssignmentAllowed: false;
    readonly thicknessSemanticAssignmentAllowed: false;
    readonly traditionalSemanticAssignmentAllowed: false;
  };
}

const ISSUED = new WeakSet<object>();

const CANDIDATES = Object.freeze([
  Object.freeze({
    candidateKey: 'lipschitz_certified_adaptive_midpoint' as const,
    status: 'algorithm_class_admitted_preferred_certificate_required' as const,
    deterministic: true,
    continuousArclengthTarget: true,
    providerVertexDensityIndependentByDefinition: true,
    nonsmoothClosestPrimitiveSwitchesHandledByCertificate: true,
    explicitPointPairCorrespondenceRequired: false as const,
    anatomicalRolesRequired: false as const,
    interpretationBoundary: 'certified numerical integration of a role-free set-distance functional only; no thickness or traditional semantics',
  }),
  Object.freeze({
    candidateKey: 'exact_lower_envelope_analytic_partition' as const,
    status: 'mathematically_possible_not_selected_degeneracy_complexity' as const,
    deterministic: true,
    continuousArclengthTarget: true,
    providerVertexDensityIndependentByDefinition: true,
    nonsmoothClosestPrimitiveSwitchesHandledByCertificate: true,
    explicitPointPairCorrespondenceRequired: false as const,
    anatomicalRolesRequired: false as const,
    interpretationBoundary: 'requires exact closest-primitive regime partition and degenerate-case governance; not required for current certified numerical path',
  }),
  Object.freeze({
    candidateKey: 'generic_adaptive_simpson' as const,
    status: 'not_admitted_no_nonsmooth_error_certificate' as const,
    deterministic: true,
    continuousArclengthTarget: true,
    providerVertexDensityIndependentByDefinition: true,
    nonsmoothClosestPrimitiveSwitchesHandledByCertificate: false,
    explicitPointPairCorrespondenceRequired: false as const,
    anatomicalRolesRequired: false as const,
    interpretationBoundary: 'heuristic convergence alone does not certify closest-primitive switch nonsmoothness',
  }),
  Object.freeze({
    candidateKey: 'fixed_uniform_point_sampling' as const,
    status: 'rejected_sampling_substitution' as const,
    deterministic: true,
    continuousArclengthTarget: false,
    providerVertexDensityIndependentByDefinition: true,
    nonsmoothClosestPrimitiveSwitchesHandledByCertificate: false,
    explicitPointPairCorrespondenceRequired: false as const,
    anatomicalRolesRequired: false as const,
    interpretationBoundary: 'finite sample average without a rigorous global error certificate cannot substitute for the continuous integral',
  }),
  Object.freeze({
    candidateKey: 'provider_vertex_weighted_sampling' as const,
    status: 'rejected_sampling_substitution' as const,
    deterministic: true,
    continuousArclengthTarget: false,
    providerVertexDensityIndependentByDefinition: false,
    nonsmoothClosestPrimitiveSwitchesHandledByCertificate: false,
    explicitPointPairCorrespondenceRequired: false as const,
    anatomicalRolesRequired: false as const,
    interpretationBoundary: 'provider topology density is not continuous arclength measure',
  }),
  Object.freeze({
    candidateKey: 'monte_carlo_arclength_sampling' as const,
    status: 'rejected_nondeterministic' as const,
    deterministic: false,
    continuousArclengthTarget: false,
    providerVertexDensityIndependentByDefinition: true,
    nonsmoothClosestPrimitiveSwitchesHandledByCertificate: false,
    explicitPointPairCorrespondenceRequired: false as const,
    anatomicalRolesRequired: false as const,
    interpretationBoundary: 'stochastic estimate is not the deterministic certified runtime contract under review',
  }),
] as const);

const NEW_BLOCKERS = Object.freeze([
  'certified_arclength_mean_runtime_numeric_accuracy_policy_not_governed',
  'certified_arclength_mean_runtime_subdivision_tiebreak_not_governed',
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
  'fixed_uniform_samples_to_certified_continuous_arclength_integral',
  'provider_vertices_to_continuous_arclength_measure',
  'generic_adaptive_simpson_without_nonsmooth_certificate_to_certified_integral',
  'monte_carlo_samples_to_deterministic_certified_integral',
  'numeric_accuracy_budget_to_morphology_threshold',
  'nearest_set_evaluation_to_point_correspondence',
  'arclength_mean_separation_to_lip_thickness',
  'arclength_mean_separation_to_physical_band_width',
  'coordinate_centimeter_to_physical_soft_tissue_anthropometry',
  'certified_algorithm_to_neutral_metric_semantic_binding',
  'certified_algorithm_to_traditional_duan_hou_semantics',
] as const);

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-90 ${message}`);
}

function validateFR89Authority(): void {
  const fr89 = reviewRoleFreeWholeContourSeparationSummaryFeasibilityFR89();
  assertIssuedRoleFreeWholeContourSeparationSummaryFeasibilityReviewFR89(fr89);
  if (
    fr89.schemaVersion !== 'fr89-role-free-whole-contour-separation-summary-feasibility-review-v1' ||
    fr89.authorityState !== 'role_free_whole_contour_separation_summary_feasibility_review_completed_no_runtime_value_issued' ||
    fr89.feasibilityDecision.preferredCandidate !== 'symmetric_arclength_mean_nearest_set_distance' ||
    fr89.feasibilityDecision.runtimeAlgorithmAdmitted !== false ||
    fr89.feasibilityDecision.runtimeValueIssued !== false ||
    fr89.recommendedNextFrontier.frontierKey !== 'role_free_arclength_mean_nearest_set_distance_runtime_algorithm_review' ||
    fr89.recommendedNextFrontier.runtimeImplementationAllowedBeforeAlgorithmReview !== false ||
    fr89.recommendedNextFrontier.discreteVertexSamplingSubstitutionAllowed !== false ||
    fr89.thicknessMetricIssued !== false ||
    fr89.traditionalSemanticAuthority !== false ||
    !fr89.newlyExposedPrerequisiteBlockers.includes('continuous_arclength_mean_nearest_set_distance_runtime_algorithm_not_governed')
  ) fail('FR-89 preferred functional or runtime gate authority drift.');
}

export function reviewRoleFreeArclengthMeanIntegrationAlgorithmFR90(): RoleFreeArclengthMeanIntegrationAlgorithmReviewFR90V1 {
  validateFR89Authority();
  const result: RoleFreeArclengthMeanIntegrationAlgorithmReviewFR90V1 = Object.freeze({
    schemaVersion: 'fr90-role-free-arclength-mean-integration-algorithm-review-v1' as const,
    artifactVersion: '0.1.0' as const,
    authorityState: 'certified_arclength_mean_integration_algorithm_class_review_completed_no_runtime_value_issued' as const,
    sourceAuthority: Object.freeze({
      fr89SchemaVersion: 'fr89-role-free-whole-contour-separation-summary-feasibility-review-v1' as const,
      preferredFunctional: 'symmetric_arclength_mean_nearest_set_distance' as const,
      runtimeImplementationAllowedBeforeAlgorithmReview: false as const,
    }),
    mathematicalBasis: Object.freeze({
      distanceToClosedSetLipschitzProperty: '|d(p,S)-d(q,S)| <= euclidean_distance(p,q)' as const,
      unitSpeedArclengthConsequence: '|f(s)-f(t)| <= |s-t| for f(s)=d(gamma(s),S)' as const,
      midpointIntervalIntegralErrorBound: '|integral_I f(s) ds - h*f(mid(I))| <= h^2/4' as const,
      partitionDirectedIntegralErrorBound: 'sum_i h_i^2/4' as const,
      normalizedDirectedMeanErrorBound: '(sum_i h_i^2)/(4*L_source)' as const,
      symmetricMeanErrorBound: '0.5*(E_A_to_B + E_B_to_A)' as const,
      nearestSetEvaluationRequirement: 'midpoint_distance_must_be_minimum_over_all_target_closed_polyline_segments' as const,
    }),
    candidates: CANDIDATES,
    algorithmDecision: Object.freeze({
      admittedAlgorithmClassCount: 1 as const,
      preferredAlgorithmClass: 'lipschitz_certified_adaptive_midpoint' as const,
      certificateType: 'deterministic_absolute_integration_error_upper_bound' as const,
      adaptiveSubdivisionPolicy: 'split_intervals_until_global_certificate_meets_governed_numeric_accuracy_budget' as const,
      subdivisionSelectionTieBreakRequired: true as const,
      nearestSetEvaluationMustUseContinuousTargetSegments: true as const,
      exactAnalyticLowerEnvelopeRequired: false as const,
      runtimePrecisionPolicyDefined: false as const,
      runtimeImplementationAuthorized: false as const,
      runtimeValueIssued: false as const,
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
    resolvedProcessGap: 'continuous_arclength_mean_nearest_set_distance_runtime_algorithm_not_governed' as const,
    newlyExposedPrerequisiteBlockers: NEW_BLOCKERS,
    remainingBlockers: REMAINING,
    authorityBoundary: Object.freeze({
      certifiedNumericalIntegralMeansExactAnalyticIntegral: false as const,
      numericalAccuracyBudgetMeansEmpiricalMorphologyThreshold: false as const,
      nearestSetMidpointEvaluationMeansPointCorrespondence: false as const,
      arclengthMeanSeparationMeansLipThickness: false as const,
      arclengthMeanSeparationMeansPhysicalBandWidth: false as const,
      coordinateCentimeterMeansPhysicalSoftTissueAnthropometry: false as const,
      certifiedAlgorithmClassMeansProductionMetricBinding: false as const,
      certifiedAlgorithmClassMeansTraditionalDuanHou: false as const,
    }),
    prohibitedShortcuts: PROHIBITED,
    recommendedNextFrontier: Object.freeze({
      frontierKey: 'certified_arclength_mean_runtime_numeric_policy_review' as const,
      purpose: 'govern deterministic numeric accuracy budget and subdivision tie-break rules before any runtime value can be issued' as const,
      runtimeImplementationAllowed: false as const,
      semanticThresholdSelectionAllowed: false as const,
      anatomicalRoleAssignmentAllowed: false as const,
      thicknessSemanticAssignmentAllowed: false as const,
      traditionalSemanticAssignmentAllowed: false as const,
    }),
  });
  ISSUED.add(result);
  return result;
}

export function assertIssuedRoleFreeArclengthMeanIntegrationAlgorithmReviewFR90(
  result: RoleFreeArclengthMeanIntegrationAlgorithmReviewFR90V1,
): void {
  if (!ISSUED.has(result)) fail('review was not issued by the active FR-90 boundary.');
  if (
    result.schemaVersion !== 'fr90-role-free-arclength-mean-integration-algorithm-review-v1' ||
    result.authorityState !== 'certified_arclength_mean_integration_algorithm_class_review_completed_no_runtime_value_issued' ||
    result.algorithmDecision.admittedAlgorithmClassCount !== 1 ||
    result.algorithmDecision.preferredAlgorithmClass !== 'lipschitz_certified_adaptive_midpoint' ||
    result.algorithmDecision.runtimePrecisionPolicyDefined !== false ||
    result.algorithmDecision.runtimeImplementationAuthorized !== false ||
    result.algorithmDecision.runtimeValueIssued !== false ||
    result.runtimeGeometryFunctionalDefinitionsIssued !== 0 ||
    result.runtimeGeometryValuesIssued !== 0 ||
    result.neutralMetricDefinitionsIssued !== 0 ||
    result.neutralMetricValuesIssued !== 0 ||
    result.anatomicalRolesIssued !== 0 ||
    result.crossContourCorrespondencePairsIssued !== 0 ||
    result.thicknessMetricIssued !== false ||
    result.physicalAnthropometricInterpretationAuthorized !== false ||
    result.morphologyProduced !== false ||
    result.criterionStatesIssued !== 0 ||
    result.claimsIssued !== 0 ||
    result.traditionalSemanticAuthority !== false ||
    result.resolvedProcessGap !== 'continuous_arclength_mean_nearest_set_distance_runtime_algorithm_not_governed' ||
    result.recommendedNextFrontier.runtimeImplementationAllowed !== false ||
    result.recommendedNextFrontier.semanticThresholdSelectionAllowed !== false ||
    result.authorityBoundary.arclengthMeanSeparationMeansLipThickness !== false ||
    result.authorityBoundary.certifiedAlgorithmClassMeansTraditionalDuanHou !== false
  ) fail('issued FR-90 authority boundary drift.');
}
