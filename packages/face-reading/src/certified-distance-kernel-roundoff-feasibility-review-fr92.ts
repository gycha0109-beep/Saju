import {
  assertIssuedCertifiedArclengthMeanRuntimeNumericPolicyReviewFR91,
  reviewCertifiedArclengthMeanRuntimeNumericPolicyFR91,
} from './certified-arclength-mean-runtime-numeric-policy-review-fr91.js';
import { FaceAuthorityValidationError } from './validation.js';

export type DistanceKernelRoundoffCandidateStatusFR92 =
  | 'rejected_total_error_certificate_gap'
  | 'rejected_empirical_nonproof'
  | 'feasibility_admitted_preferred_research_path'
  | 'not_admitted_precision_without_outward_certificate';

export interface DistanceKernelRoundoffCandidateFR92V1 {
  readonly candidateKey:
    | 'native_binary64_direct_distance_kernel'
    | 'native_binary64_plus_empirical_epsilon'
    | 'exact_binary64_dyadic_rational_geometry_plus_outward_sqrt_enclosures'
    | 'arbitrary_precision_decimal_without_outward_error_proof';
  readonly status: DistanceKernelRoundoffCandidateStatusFR92;
  readonly exactInputValueRecovery: boolean;
  readonly exactBranchComparisonsPossible: boolean;
  readonly directedOutwardDistanceEnclosurePossible: boolean;
  readonly totalCertificatePathPossible: boolean;
  readonly empiricalToleranceRequired: boolean;
  readonly interpretationBoundary: string;
}

export interface CertifiedDistanceKernelRoundoffFeasibilityReviewFR92V1 {
  readonly schemaVersion: 'fr92-certified-distance-kernel-roundoff-feasibility-review-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'distance_kernel_roundoff_certificate_feasibility_review_completed_no_runtime_value_issued';
  readonly sourceAuthority: {
    readonly fr91SchemaVersion: 'fr91-certified-arclength-mean-runtime-numeric-policy-review-v1';
    readonly fr90CertificateType: 'deterministic_absolute_integration_error_upper_bound';
    readonly fr91RuntimeArithmetic: 'ieee754_binary64_finite_only';
    readonly fr91RuntimeConstructionAllowed: true;
    readonly fr91RuntimeValueAlreadyIssued: false;
  };
  readonly discoveredAuthorityGap: {
    readonly gapKey: 'binary64_distance_kernel_roundoff_total_error_certificate_not_governed';
    readonly quadratureCertificateAssumesExactDistanceOracle: true;
    readonly nativeBinary64PointToSegmentRoundoffBoundGoverned: false;
    readonly nativeBinary64SqrtRoundoffBoundGoverned: false;
    readonly nativeBinary64MinReductionRoundoffBoundGoverned: false;
    readonly fullRuntimeMathematicalAbsoluteErrorCertificateAvailable: false;
    readonly runtimeMayClaimQuadratureOnlyCertificateWithoutContractRevision: false;
  };
  readonly exactDyadicResearchPath: {
    readonly binary64FiniteValueExactlyRecoverableAsDyadicRational: true;
    readonly dyadicSubdivisionParameterExactlyRepresentableAsRational: true;
    readonly midpointCoordinatesExactlyComputableAsRational: true;
    readonly segmentSquaredLengthExactlyComputableAsRational: true;
    readonly pointToSegmentProjectionBranchExactlyDecidableAsRational: true;
    readonly interiorProjectionSquaredDistanceExactlyComputableAsRational: true;
    readonly nearestSegmentSquaredDistanceExactlyComparableAsRational: true;
    readonly dyadicSubdivisionCertificateHSquaredExactlyComputableAsRational: true;
    readonly irrationalEuclideanLengthRequiresCertifiedSqrtEnclosure: true;
    readonly integralContributionRequiresOutwardEnclosure: true;
    readonly directedMeanDivisionRequiresOutwardEnclosure: true;
    readonly nativeJavaScriptDirectedRoundingPrimitiveAvailable: false;
  };
  readonly candidates: readonly [
    DistanceKernelRoundoffCandidateFR92V1,
    DistanceKernelRoundoffCandidateFR92V1,
    DistanceKernelRoundoffCandidateFR92V1,
    DistanceKernelRoundoffCandidateFR92V1,
  ];
  readonly feasibilityDecision: {
    readonly admittedResearchPathCount: 1;
    readonly preferredResearchPath: 'exact_binary64_dyadic_rational_geometry_plus_outward_sqrt_enclosures';
    readonly nativeBinary64DirectRuntimeTotalCertificateAdmitted: false;
    readonly empiricalEpsilonRepairAdmitted: false;
    readonly arbitraryPrecisionAloneCountsAsCertificate: false;
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
  readonly resolvedProcessGap: 'binary64_roundoff_certificate_gap_not_explicitly_reviewed';
  readonly newlyExposedPrerequisiteBlockers: readonly [
    'exact_binary64_dyadic_rational_conversion_contract_not_issued',
    'certified_rational_sqrt_outward_enclosure_contract_not_issued',
    'certified_arclength_mean_total_error_composition_not_governed',
  ];
  readonly remainingBlockers: readonly [
    'certified_arclength_mean_runtime_implementation_not_issued',
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
    readonly quadratureErrorCertificateMeansTotalFloatingPointErrorCertificate: false;
    readonly finiteBinary64ArithmeticMeansCertifiedExactArithmetic: false;
    readonly arbitraryPrecisionMeansCertifiedOutwardEnclosure: false;
    readonly empiricalEpsilonMeansRoundoffProof: false;
    readonly exactDyadicRecoveryMeansPhysicalAnthropometricExactness: false;
    readonly certifiedDistanceEnclosureMeansLipThickness: false;
    readonly roundoffReviewMeansProductionMetricBinding: false;
    readonly roundoffReviewMeansTraditionalDuanHou: false;
  };
  readonly prohibitedShortcuts: readonly [
    'quadrature_certificate_to_total_runtime_error_certificate',
    'finite_binary64_to_exact_arithmetic',
    'machine_epsilon_to_universal_distance_kernel_roundoff_bound',
    'empirical_epsilon_to_roundoff_proof',
    'more_decimal_digits_to_outward_error_certificate',
    'exact_dyadic_coordinate_to_physical_anthropometric_exactness',
    'certified_set_distance_to_lip_thickness',
    'roundoff_review_to_runtime_value',
    'roundoff_review_to_neutral_metric_binding',
    'roundoff_review_to_traditional_duan_hou_semantics',
  ];
  readonly recommendedNextFrontier: {
    readonly frontierKey: 'exact_dyadic_rational_distance_enclosure_primitives_review';
    readonly purpose: 'govern exact binary64-to-dyadic conversion, rational point-to-segment squared-distance branches, and certified outward square-root enclosures before total-error-certified runtime construction';
    readonly nativeBinary64DirectRuntimeAllowed: false;
    readonly empiricalToleranceRepairAllowed: false;
    readonly runtimeValueIssuanceAllowed: false;
    readonly anatomicalRoleAssignmentAllowed: false;
    readonly correspondencePairIssuanceAllowed: false;
    readonly thicknessSemanticAssignmentAllowed: false;
    readonly physicalAnthropometricInterpretationAllowed: false;
    readonly traditionalSemanticAssignmentAllowed: false;
  };
}

const ISSUED = new WeakSet<object>();

const CANDIDATES = Object.freeze([
  Object.freeze({
    candidateKey: 'native_binary64_direct_distance_kernel' as const,
    status: 'rejected_total_error_certificate_gap' as const,
    exactInputValueRecovery: false,
    exactBranchComparisonsPossible: false,
    directedOutwardDistanceEnclosurePossible: false,
    totalCertificatePathPossible: false,
    empiricalToleranceRequired: false,
    interpretationBoundary: 'finite binary64 evaluation is deterministic but the active contracts contain no rigorous compound roundoff bound for subtraction, multiplication, projection, sqrt, and reduction',
  }),
  Object.freeze({
    candidateKey: 'native_binary64_plus_empirical_epsilon' as const,
    status: 'rejected_empirical_nonproof' as const,
    exactInputValueRecovery: false,
    exactBranchComparisonsPossible: false,
    directedOutwardDistanceEnclosurePossible: false,
    totalCertificatePathPossible: false,
    empiricalToleranceRequired: true,
    interpretationBoundary: 'an observed or guessed epsilon is not a mathematical enclosure proof and cannot repair the FR90 absolute certificate',
  }),
  Object.freeze({
    candidateKey: 'exact_binary64_dyadic_rational_geometry_plus_outward_sqrt_enclosures' as const,
    status: 'feasibility_admitted_preferred_research_path' as const,
    exactInputValueRecovery: true,
    exactBranchComparisonsPossible: true,
    directedOutwardDistanceEnclosurePossible: true,
    totalCertificatePathPossible: true,
    empiricalToleranceRequired: false,
    interpretationBoundary: 'binary64 input values are treated as exact dyadic rationals; irrational Euclidean lengths must remain certified outward enclosures rather than unbounded Number approximations',
  }),
  Object.freeze({
    candidateKey: 'arbitrary_precision_decimal_without_outward_error_proof' as const,
    status: 'not_admitted_precision_without_outward_certificate' as const,
    exactInputValueRecovery: true,
    exactBranchComparisonsPossible: true,
    directedOutwardDistanceEnclosurePossible: false,
    totalCertificatePathPossible: false,
    empiricalToleranceRequired: false,
    interpretationBoundary: 'additional digits reduce numerical error but do not by themselves prove that a returned interval contains the exact value',
  }),
] as const);

const NEW_BLOCKERS = Object.freeze([
  'exact_binary64_dyadic_rational_conversion_contract_not_issued',
  'certified_rational_sqrt_outward_enclosure_contract_not_issued',
  'certified_arclength_mean_total_error_composition_not_governed',
] as const);

const REMAINING = Object.freeze([
  'certified_arclength_mean_runtime_implementation_not_issued',
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
  'quadrature_certificate_to_total_runtime_error_certificate',
  'finite_binary64_to_exact_arithmetic',
  'machine_epsilon_to_universal_distance_kernel_roundoff_bound',
  'empirical_epsilon_to_roundoff_proof',
  'more_decimal_digits_to_outward_error_certificate',
  'exact_dyadic_coordinate_to_physical_anthropometric_exactness',
  'certified_set_distance_to_lip_thickness',
  'roundoff_review_to_runtime_value',
  'roundoff_review_to_neutral_metric_binding',
  'roundoff_review_to_traditional_duan_hou_semantics',
] as const);

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-92 ${message}`);
}

function validateFR91Authority(): void {
  const fr91 = reviewCertifiedArclengthMeanRuntimeNumericPolicyFR91();
  assertIssuedCertifiedArclengthMeanRuntimeNumericPolicyReviewFR91(fr91);
  if (
    fr91.schemaVersion !== 'fr91-certified-arclength-mean-runtime-numeric-policy-review-v1' ||
    fr91.authorityState !== 'certified_arclength_mean_numeric_policy_review_completed_no_runtime_value_issued' ||
    fr91.sourceAuthority.certificateType !== 'deterministic_absolute_integration_error_upper_bound' ||
    fr91.deterministicSubdivisionPolicy.runtimeArithmetic !== 'ieee754_binary64_finite_only' ||
    fr91.policyDecision.neutralRuntimeImplementationMayBeReviewedNext !== true ||
    fr91.policyDecision.runtimeImplementationIssued !== false ||
    fr91.policyDecision.runtimeValueIssued !== false ||
    fr91.recommendedNextFrontier.frontierKey !== 'certified_arclength_mean_runtime_implementation' ||
    fr91.recommendedNextFrontier.runtimeConstructionAllowed !== true ||
    fr91.recommendedNextFrontier.runtimeValueAlreadyIssued !== false ||
    fr91.thicknessMetricIssued !== false ||
    fr91.traditionalSemanticAuthority !== false
  ) fail('FR-91 numeric policy or runtime gate authority drift.');
}

export function reviewCertifiedDistanceKernelRoundoffFeasibilityFR92(): CertifiedDistanceKernelRoundoffFeasibilityReviewFR92V1 {
  validateFR91Authority();

  const result: CertifiedDistanceKernelRoundoffFeasibilityReviewFR92V1 = Object.freeze({
    schemaVersion: 'fr92-certified-distance-kernel-roundoff-feasibility-review-v1' as const,
    artifactVersion: '0.1.0' as const,
    authorityState: 'distance_kernel_roundoff_certificate_feasibility_review_completed_no_runtime_value_issued' as const,
    sourceAuthority: Object.freeze({
      fr91SchemaVersion: 'fr91-certified-arclength-mean-runtime-numeric-policy-review-v1' as const,
      fr90CertificateType: 'deterministic_absolute_integration_error_upper_bound' as const,
      fr91RuntimeArithmetic: 'ieee754_binary64_finite_only' as const,
      fr91RuntimeConstructionAllowed: true as const,
      fr91RuntimeValueAlreadyIssued: false as const,
    }),
    discoveredAuthorityGap: Object.freeze({
      gapKey: 'binary64_distance_kernel_roundoff_total_error_certificate_not_governed' as const,
      quadratureCertificateAssumesExactDistanceOracle: true as const,
      nativeBinary64PointToSegmentRoundoffBoundGoverned: false as const,
      nativeBinary64SqrtRoundoffBoundGoverned: false as const,
      nativeBinary64MinReductionRoundoffBoundGoverned: false as const,
      fullRuntimeMathematicalAbsoluteErrorCertificateAvailable: false as const,
      runtimeMayClaimQuadratureOnlyCertificateWithoutContractRevision: false as const,
    }),
    exactDyadicResearchPath: Object.freeze({
      binary64FiniteValueExactlyRecoverableAsDyadicRational: true as const,
      dyadicSubdivisionParameterExactlyRepresentableAsRational: true as const,
      midpointCoordinatesExactlyComputableAsRational: true as const,
      segmentSquaredLengthExactlyComputableAsRational: true as const,
      pointToSegmentProjectionBranchExactlyDecidableAsRational: true as const,
      interiorProjectionSquaredDistanceExactlyComputableAsRational: true as const,
      nearestSegmentSquaredDistanceExactlyComparableAsRational: true as const,
      dyadicSubdivisionCertificateHSquaredExactlyComputableAsRational: true as const,
      irrationalEuclideanLengthRequiresCertifiedSqrtEnclosure: true as const,
      integralContributionRequiresOutwardEnclosure: true as const,
      directedMeanDivisionRequiresOutwardEnclosure: true as const,
      nativeJavaScriptDirectedRoundingPrimitiveAvailable: false as const,
    }),
    candidates: CANDIDATES,
    feasibilityDecision: Object.freeze({
      admittedResearchPathCount: 1 as const,
      preferredResearchPath: 'exact_binary64_dyadic_rational_geometry_plus_outward_sqrt_enclosures' as const,
      nativeBinary64DirectRuntimeTotalCertificateAdmitted: false as const,
      empiricalEpsilonRepairAdmitted: false as const,
      arbitraryPrecisionAloneCountsAsCertificate: false as const,
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
    resolvedProcessGap: 'binary64_roundoff_certificate_gap_not_explicitly_reviewed' as const,
    newlyExposedPrerequisiteBlockers: NEW_BLOCKERS,
    remainingBlockers: REMAINING,
    authorityBoundary: Object.freeze({
      quadratureErrorCertificateMeansTotalFloatingPointErrorCertificate: false as const,
      finiteBinary64ArithmeticMeansCertifiedExactArithmetic: false as const,
      arbitraryPrecisionMeansCertifiedOutwardEnclosure: false as const,
      empiricalEpsilonMeansRoundoffProof: false as const,
      exactDyadicRecoveryMeansPhysicalAnthropometricExactness: false as const,
      certifiedDistanceEnclosureMeansLipThickness: false as const,
      roundoffReviewMeansProductionMetricBinding: false as const,
      roundoffReviewMeansTraditionalDuanHou: false as const,
    }),
    prohibitedShortcuts: PROHIBITED,
    recommendedNextFrontier: Object.freeze({
      frontierKey: 'exact_dyadic_rational_distance_enclosure_primitives_review' as const,
      purpose: 'govern exact binary64-to-dyadic conversion, rational point-to-segment squared-distance branches, and certified outward square-root enclosures before total-error-certified runtime construction' as const,
      nativeBinary64DirectRuntimeAllowed: false as const,
      empiricalToleranceRepairAllowed: false as const,
      runtimeValueIssuanceAllowed: false as const,
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

export function assertIssuedCertifiedDistanceKernelRoundoffFeasibilityReviewFR92(
  value: CertifiedDistanceKernelRoundoffFeasibilityReviewFR92V1,
): void {
  if (!ISSUED.has(value as object)) fail('value was not issued by the active FR-92 boundary.');
}
