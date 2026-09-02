import {
  assertIssuedCertifiedDistanceKernelRoundoffFeasibilityReviewFR92,
  reviewCertifiedDistanceKernelRoundoffFeasibilityFR92,
} from './certified-distance-kernel-roundoff-feasibility-review-fr92.js';
import { FaceAuthorityValidationError } from './validation.js';

export interface ExactDyadicRationalDistanceEnclosurePrimitivesReviewFR93V1 {
  readonly schemaVersion: 'fr93-exact-dyadic-rational-distance-enclosure-primitives-review-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'exact_rational_distance_enclosure_primitive_algorithms_reviewed_no_runtime_primitive_issued';
  readonly sourceAuthority: {
    readonly fr92SchemaVersion: 'fr92-certified-distance-kernel-roundoff-feasibility-review-v1';
    readonly preferredResearchPath: 'exact_binary64_dyadic_rational_geometry_plus_outward_sqrt_enclosures';
    readonly runtimeImplementationAuthorizedBeforeFR93: false;
    readonly runtimeValueIssuedBeforeFR93: false;
  };
  readonly binary64ToDyadicSpecification: {
    readonly specificationIssued: true;
    readonly inputDomain: 'finite_ieee754_binary64_only';
    readonly extractionMechanism: 'exact_sign_exponent_fraction_bit_pattern_via_dataview_biguint64';
    readonly normalFormula: 'value=(-1)^sign*(2^52+fraction)*2^(exponent_bits-1023-52)';
    readonly subnormalFormula: 'value=(-1)^sign*fraction*2^-1074';
    readonly positiveAndNegativeZeroCanonicalization: 'rational_zero';
    readonly nanAndInfinityRejected: true;
    readonly exactRecoveryOfInputBinary64Value: true;
    readonly rationalCanonicalForm: 'gcd_reduced_numerator_over_positive_denominator';
    readonly decimalStringRoundTripRequired: false;
  };
  readonly exactRationalGeometrySpecification: {
    readonly specificationIssued: true;
    readonly arithmeticDomain: 'bigint_exact_rational';
    readonly midpointUnderDyadicSubdivisionExact: true;
    readonly segmentSquaredLengthExact: true;
    readonly pointToSegmentProjectionDotExact: true;
    readonly projectionBranchComparisonsExact: true;
    readonly degenerateSegmentBranch: 'if_len2_eq_0_use_exact_endpoint_squared_distance';
    readonly beforeSegmentBranch: 'if_dot_lte_0_use_exact_start_endpoint_squared_distance';
    readonly afterSegmentBranch: 'if_dot_gte_len2_use_exact_end_endpoint_squared_distance';
    readonly interiorProjectionSquaredDistanceFormula: 'norm2(point-start)-dot^2/len2';
    readonly nearestTargetSegmentSelection: 'exact_minimum_over_nonnegative_rational_squared_distances';
    readonly sqrtAvoidedDuringNearestSegmentSelection: true;
  };
  readonly outwardSqrtEnclosureSpecification: {
    readonly specificationIssued: true;
    readonly inputDomain: 'nonnegative_reduced_rational_n_over_d';
    readonly precisionParameter: 'nonnegative_integer_precision_bits_p';
    readonly scaledFloorConstruction: 'q=floor((n*2^(2p))/d)';
    readonly integerRootConstruction: 'm=floor_sqrt_bigint(q)';
    readonly lowerBound: 'm/2^p';
    readonly exactnessTest: 'm^2*d==n*2^(2p)';
    readonly upperBound: 'exact?m/2^p:(m+1)/2^p';
    readonly containmentGuarantee: 'lower<=sqrt(n/d)<=upper';
    readonly widthGuarantee: 'upper-lower<=2^-p';
    readonly integerSqrtMustBeExactFloor: true;
    readonly floatingPointSqrtUsedForCertificate: false;
    readonly outwardRoundingByGuessOrEpsilonAllowed: false;
  };
  readonly compositionReadiness: {
    readonly dyadicLeafHSquaredCertificateExactWithoutSqrt: true;
    readonly midpointNearestSquaredDistanceExactBeforeSqrt: true;
    readonly leafMidpointContributionCanBeRewrittenAsSingleSqrt: 'sqrt(source_segment_len2*nearest_distance2)/2^depth';
    readonly sourcePerimeterRequiresSumOfCertifiedSqrtEnclosures: true;
    readonly directedMeanRequiresCertifiedPositiveIntervalDivision: true;
    readonly totalErrorCompositionReadyNow: false;
  };
  readonly reviewDecision: {
    readonly binary64ExactConversionAlgorithmAdmitted: true;
    readonly exactRationalPointToSegmentSquaredDistanceAlgorithmAdmitted: true;
    readonly rationalSqrtOutwardEnclosureAlgorithmAdmitted: true;
    readonly primitiveRuntimeImplementationMayBeReviewedNext: true;
    readonly primitiveRuntimeImplementationIssued: false;
    readonly arclengthMeanRuntimeAuthorized: false;
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
  readonly resolvedProcessGaps: readonly [
    'exact_binary64_dyadic_rational_conversion_contract_not_issued',
    'certified_rational_sqrt_outward_enclosure_contract_not_issued',
  ];
  readonly newlyExposedPrerequisiteBlockers: readonly [
    'exact_rational_distance_enclosure_primitives_runtime_not_issued',
    'certified_sqrt_enclosure_precision_allocation_not_governed',
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
    readonly exactBinary64RecoveryMeansOriginalPhysicalQuantityExact: false;
    readonly exactRationalGeometryMeansAnatomicalTruth: false;
    readonly sqrtEnclosurePrecisionBitsMeanMorphologyThreshold: false;
    readonly certifiedNumericalEnclosureMeansLipThickness: false;
    readonly exactSquaredDistanceMeansCorrespondencePair: false;
    readonly primitiveSpecificationMeansRuntimePrimitive: false;
    readonly primitiveReviewMeansProductionMetricBinding: false;
    readonly primitiveReviewMeansTraditionalDuanHou: false;
  };
  readonly prohibitedShortcuts: readonly [
    'binary64_exact_recovery_to_physical_measurement_exactness',
    'exact_rational_geometry_to_anatomical_role',
    'sqrt_precision_bits_to_morphology_threshold',
    'sqrt_precision_bits_to_traditional_threshold',
    'exact_nearest_segment_to_cross_contour_correspondence_pair',
    'certified_distance_enclosure_to_lip_thickness',
    'primitive_specification_to_runtime_implementation',
    'primitive_review_to_neutral_metric_binding',
    'primitive_review_to_traditional_duan_hou_semantics',
  ];
  readonly recommendedNextFrontier: {
    readonly frontierKey: 'exact_rational_distance_enclosure_primitives_runtime_implementation';
    readonly purpose: 'implement and verify exact binary64-to-rational conversion, exact rational point-to-segment squared distance, bigint floor sqrt, and parameterized rational outward sqrt enclosure primitives without issuing mouth semantics';
    readonly primitiveRuntimeConstructionAllowed: true;
    readonly arclengthMeanRuntimeConstructionAllowed: false;
    readonly runtimeGeometryValueIssuanceAllowed: false;
    readonly anatomicalRoleAssignmentAllowed: false;
    readonly correspondencePairIssuanceAllowed: false;
    readonly thicknessSemanticAssignmentAllowed: false;
    readonly physicalAnthropometricInterpretationAllowed: false;
    readonly traditionalSemanticAssignmentAllowed: false;
  };
}

const ISSUED = new WeakSet<object>();

const RESOLVED = Object.freeze([
  'exact_binary64_dyadic_rational_conversion_contract_not_issued',
  'certified_rational_sqrt_outward_enclosure_contract_not_issued',
] as const);

const NEW_BLOCKERS = Object.freeze([
  'exact_rational_distance_enclosure_primitives_runtime_not_issued',
  'certified_sqrt_enclosure_precision_allocation_not_governed',
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
  'binary64_exact_recovery_to_physical_measurement_exactness',
  'exact_rational_geometry_to_anatomical_role',
  'sqrt_precision_bits_to_morphology_threshold',
  'sqrt_precision_bits_to_traditional_threshold',
  'exact_nearest_segment_to_cross_contour_correspondence_pair',
  'certified_distance_enclosure_to_lip_thickness',
  'primitive_specification_to_runtime_implementation',
  'primitive_review_to_neutral_metric_binding',
  'primitive_review_to_traditional_duan_hou_semantics',
] as const);

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-93 ${message}`);
}

function validateFR92Authority(): void {
  const fr92 = reviewCertifiedDistanceKernelRoundoffFeasibilityFR92();
  assertIssuedCertifiedDistanceKernelRoundoffFeasibilityReviewFR92(fr92);
  if (
    fr92.schemaVersion !== 'fr92-certified-distance-kernel-roundoff-feasibility-review-v1' ||
    fr92.authorityState !== 'distance_kernel_roundoff_certificate_feasibility_review_completed_no_runtime_value_issued' ||
    fr92.feasibilityDecision.preferredResearchPath !== 'exact_binary64_dyadic_rational_geometry_plus_outward_sqrt_enclosures' ||
    fr92.feasibilityDecision.runtimeImplementationAuthorized !== false ||
    fr92.feasibilityDecision.runtimeValueIssued !== false ||
    fr92.recommendedNextFrontier.frontierKey !== 'exact_dyadic_rational_distance_enclosure_primitives_review' ||
    fr92.recommendedNextFrontier.runtimeValueIssuanceAllowed !== false ||
    !fr92.newlyExposedPrerequisiteBlockers.includes('exact_binary64_dyadic_rational_conversion_contract_not_issued') ||
    !fr92.newlyExposedPrerequisiteBlockers.includes('certified_rational_sqrt_outward_enclosure_contract_not_issued') ||
    !fr92.newlyExposedPrerequisiteBlockers.includes('certified_arclength_mean_total_error_composition_not_governed') ||
    fr92.thicknessMetricIssued !== false ||
    fr92.traditionalSemanticAuthority !== false
  ) fail('FR-92 roundoff feasibility or primitive-review gate authority drift.');
}

export function reviewExactDyadicRationalDistanceEnclosurePrimitivesFR93(): ExactDyadicRationalDistanceEnclosurePrimitivesReviewFR93V1 {
  validateFR92Authority();

  const result: ExactDyadicRationalDistanceEnclosurePrimitivesReviewFR93V1 = Object.freeze({
    schemaVersion: 'fr93-exact-dyadic-rational-distance-enclosure-primitives-review-v1' as const,
    artifactVersion: '0.1.0' as const,
    authorityState: 'exact_rational_distance_enclosure_primitive_algorithms_reviewed_no_runtime_primitive_issued' as const,
    sourceAuthority: Object.freeze({
      fr92SchemaVersion: 'fr92-certified-distance-kernel-roundoff-feasibility-review-v1' as const,
      preferredResearchPath: 'exact_binary64_dyadic_rational_geometry_plus_outward_sqrt_enclosures' as const,
      runtimeImplementationAuthorizedBeforeFR93: false as const,
      runtimeValueIssuedBeforeFR93: false as const,
    }),
    binary64ToDyadicSpecification: Object.freeze({
      specificationIssued: true as const,
      inputDomain: 'finite_ieee754_binary64_only' as const,
      extractionMechanism: 'exact_sign_exponent_fraction_bit_pattern_via_dataview_biguint64' as const,
      normalFormula: 'value=(-1)^sign*(2^52+fraction)*2^(exponent_bits-1023-52)' as const,
      subnormalFormula: 'value=(-1)^sign*fraction*2^-1074' as const,
      positiveAndNegativeZeroCanonicalization: 'rational_zero' as const,
      nanAndInfinityRejected: true as const,
      exactRecoveryOfInputBinary64Value: true as const,
      rationalCanonicalForm: 'gcd_reduced_numerator_over_positive_denominator' as const,
      decimalStringRoundTripRequired: false as const,
    }),
    exactRationalGeometrySpecification: Object.freeze({
      specificationIssued: true as const,
      arithmeticDomain: 'bigint_exact_rational' as const,
      midpointUnderDyadicSubdivisionExact: true as const,
      segmentSquaredLengthExact: true as const,
      pointToSegmentProjectionDotExact: true as const,
      projectionBranchComparisonsExact: true as const,
      degenerateSegmentBranch: 'if_len2_eq_0_use_exact_endpoint_squared_distance' as const,
      beforeSegmentBranch: 'if_dot_lte_0_use_exact_start_endpoint_squared_distance' as const,
      afterSegmentBranch: 'if_dot_gte_len2_use_exact_end_endpoint_squared_distance' as const,
      interiorProjectionSquaredDistanceFormula: 'norm2(point-start)-dot^2/len2' as const,
      nearestTargetSegmentSelection: 'exact_minimum_over_nonnegative_rational_squared_distances' as const,
      sqrtAvoidedDuringNearestSegmentSelection: true as const,
    }),
    outwardSqrtEnclosureSpecification: Object.freeze({
      specificationIssued: true as const,
      inputDomain: 'nonnegative_reduced_rational_n_over_d' as const,
      precisionParameter: 'nonnegative_integer_precision_bits_p' as const,
      scaledFloorConstruction: 'q=floor((n*2^(2p))/d)' as const,
      integerRootConstruction: 'm=floor_sqrt_bigint(q)' as const,
      lowerBound: 'm/2^p' as const,
      exactnessTest: 'm^2*d==n*2^(2p)' as const,
      upperBound: 'exact?m/2^p:(m+1)/2^p' as const,
      containmentGuarantee: 'lower<=sqrt(n/d)<=upper' as const,
      widthGuarantee: 'upper-lower<=2^-p' as const,
      integerSqrtMustBeExactFloor: true as const,
      floatingPointSqrtUsedForCertificate: false as const,
      outwardRoundingByGuessOrEpsilonAllowed: false as const,
    }),
    compositionReadiness: Object.freeze({
      dyadicLeafHSquaredCertificateExactWithoutSqrt: true as const,
      midpointNearestSquaredDistanceExactBeforeSqrt: true as const,
      leafMidpointContributionCanBeRewrittenAsSingleSqrt: 'sqrt(source_segment_len2*nearest_distance2)/2^depth' as const,
      sourcePerimeterRequiresSumOfCertifiedSqrtEnclosures: true as const,
      directedMeanRequiresCertifiedPositiveIntervalDivision: true as const,
      totalErrorCompositionReadyNow: false as const,
    }),
    reviewDecision: Object.freeze({
      binary64ExactConversionAlgorithmAdmitted: true as const,
      exactRationalPointToSegmentSquaredDistanceAlgorithmAdmitted: true as const,
      rationalSqrtOutwardEnclosureAlgorithmAdmitted: true as const,
      primitiveRuntimeImplementationMayBeReviewedNext: true as const,
      primitiveRuntimeImplementationIssued: false as const,
      arclengthMeanRuntimeAuthorized: false as const,
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
    resolvedProcessGaps: RESOLVED,
    newlyExposedPrerequisiteBlockers: NEW_BLOCKERS,
    remainingBlockers: REMAINING,
    authorityBoundary: Object.freeze({
      exactBinary64RecoveryMeansOriginalPhysicalQuantityExact: false as const,
      exactRationalGeometryMeansAnatomicalTruth: false as const,
      sqrtEnclosurePrecisionBitsMeanMorphologyThreshold: false as const,
      certifiedNumericalEnclosureMeansLipThickness: false as const,
      exactSquaredDistanceMeansCorrespondencePair: false as const,
      primitiveSpecificationMeansRuntimePrimitive: false as const,
      primitiveReviewMeansProductionMetricBinding: false as const,
      primitiveReviewMeansTraditionalDuanHou: false as const,
    }),
    prohibitedShortcuts: PROHIBITED,
    recommendedNextFrontier: Object.freeze({
      frontierKey: 'exact_rational_distance_enclosure_primitives_runtime_implementation' as const,
      purpose: 'implement and verify exact binary64-to-rational conversion, exact rational point-to-segment squared distance, bigint floor sqrt, and parameterized rational outward sqrt enclosure primitives without issuing mouth semantics' as const,
      primitiveRuntimeConstructionAllowed: true as const,
      arclengthMeanRuntimeConstructionAllowed: false as const,
      runtimeGeometryValueIssuanceAllowed: false as const,
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

export function assertIssuedExactDyadicRationalDistanceEnclosurePrimitivesReviewFR93(
  value: ExactDyadicRationalDistanceEnclosurePrimitivesReviewFR93V1,
): void {
  if (!ISSUED.has(value as object)) fail('value was not issued by the active FR-93 boundary.');
}
