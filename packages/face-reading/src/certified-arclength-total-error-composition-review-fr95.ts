import {
  assertIssuedRoleFreeArclengthMeanIntegrationAlgorithmReviewFR90,
  reviewRoleFreeArclengthMeanIntegrationAlgorithmFR90,
} from './role-free-arclength-mean-integration-algorithm-review-fr90.js';
import {
  assertIssuedCertifiedArclengthMeanRuntimeNumericPolicyReviewFR91,
  reviewCertifiedArclengthMeanRuntimeNumericPolicyFR91,
} from './certified-arclength-mean-runtime-numeric-policy-review-fr91.js';
import {
  assertIssuedExactRationalDistanceEnclosurePrimitivesRuntimeFR94,
  getExactRationalDistanceEnclosurePrimitivesRuntimeFR94,
} from './exact-rational-distance-enclosure-primitives-runtime-fr94.js';
import { FaceAuthorityValidationError } from './validation.js';

export interface CertifiedArclengthTotalErrorCompositionReviewFR95V1 {
  readonly schemaVersion: 'fr95-certified-arclength-total-error-composition-review-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'certified_arclength_total_error_composition_review_completed_no_arclength_runtime_value_issued';
  readonly sourceAuthority: {
    readonly fr90SchemaVersion: 'fr90-role-free-arclength-mean-integration-algorithm-review-v1';
    readonly fr91SchemaVersion: 'fr91-certified-arclength-mean-runtime-numeric-policy-review-v1';
    readonly fr94SchemaVersion: 'fr94-exact-rational-distance-enclosure-primitives-runtime-v1';
    readonly preferredAlgorithmClass: 'lipschitz_certified_adaptive_midpoint';
    readonly directedMeanBudget: 'L_source/4096';
    readonly primitiveRuntimeIssued: true;
    readonly arclengthMeanRuntimeValueIssuedBeforeFR95: false;
  };
  readonly exactQuadratureComposition: {
    readonly leafSquaredArclengthExactRational: true;
    readonly nearestMidpointSquaredDistanceExactRational: true;
    readonly midpointContributionSquaredForm: 'h_squared_times_nearest_distance_squared';
    readonly midpointContribution: 'sqrt(h_squared_times_nearest_distance_squared)';
    readonly midpointContributionEnclosedByFR94SqrtPrimitive: true;
    readonly directedQuadratureIntegralErrorCertificate: 'Q=sum_leaf(h_squared)/4';
    readonly quadratureCertificateExactRational: true;
    readonly exactIntegralContainment: 'I_exact_in_[max(0,S_lower-Q),S_upper+Q]';
  };
  readonly perimeterAndDivisionComposition: {
    readonly sourcePerimeterEnclosure: 'L_in_[L_lower,L_upper]_from_sum_of_segment_sqrt_enclosures';
    readonly positiveLowerPerimeterRequired: true;
    readonly directedMeanContainment: 'M_exact_in_[I_lower/L_upper,I_upper/L_lower]';
    readonly intervalDivisionUsesPositiveRationalBoundsOnly: true;
    readonly returnedPointEstimateIfRuntimeLater: 'midpoint_of_certified_mean_interval';
    readonly returnedAbsoluteErrorCertificateIfRuntimeLater: 'half_width_of_certified_mean_interval';
  };
  readonly strictQuadratureSlackPolicy: {
    readonly fixedFractionBudgetSplitAdmitted: false;
    readonly firstFR91BudgetSatisfactionMayConsumeFullBudget: true;
    readonly additionalSubdivisionRequiredBeforeArithmeticCertification: true;
    readonly additionalSubdivisionRule: 'one_more_equal_maximum_certificate_batch_after_first_fr91_quadrature_budget_satisfaction';
    readonly zeroQuadratureException: 'skip_extra_batch_only_if_Q_equals_zero';
    readonly strictSlackConsequence: 'Q_strictly_less_than_L_source_squared_over_4096_when_Q_nonzero';
    readonly providerSegmentIndexTieBreakAllowed: false;
    readonly empiricalToleranceUsed: false;
  };
  readonly sqrtPrecisionAllocationPolicy: {
    readonly commonPrecisionPerDirectedComputation: true;
    readonly precisionDomain: 'nonnegative_integer_bits';
    readonly selectionRule: 'minimum_p_whose_certified_directed_mean_interval_half_width_lte_L_lower_over_4096';
    readonly searchOrder: 'p_equals_0_1_2_3_in_strictly_increasing_order';
    readonly perimeterLowerBoundMustBePositive: true;
    readonly fixedMagicPrecisionAdmitted: false;
    readonly empiricalPrecisionTuningAdmitted: false;
    readonly strictQuadratureSlackGuaranteesFinitePrecisionExistsForNondegenerateSource: true;
    readonly precisionBitsAreEngineeringCertificateResolutionOnly: true;
  };
  readonly directedCertificateAcceptance: {
    readonly exactTruthContainedInReturnedInterval: true;
    readonly pointEstimate: 'C=(M_lower+M_upper)/2';
    readonly absoluteErrorCertificate: 'R=(M_upper-M_lower)/2';
    readonly acceptanceRule: 'R<=L_lower/4096';
    readonly implication: 'R<=L_source/4096';
    readonly fr91DirectedBudgetSatisfiedByConstruction: true;
  };
  readonly symmetricComposition: {
    readonly twoDirectedCertificatesRequired: true;
    readonly symmetricInterval: '[0.5*(A_lower+B_lower),0.5*(A_upper+B_upper)]';
    readonly symmetricPointEstimate: 'midpoint_of_symmetric_interval';
    readonly symmetricRadiusBound: 'R_sym<=0.5*(L_A_lower/4096+L_B_lower/4096)';
    readonly fr91SymmetricBudgetImplication: 'R_sym<=(L_A+L_B)/8192';
    readonly contourSwapInvariantByConstruction: true;
  };
  readonly compositionDecision: {
    readonly sqrtPrecisionAllocationGoverned: true;
    readonly quadratureAndArithmeticTotalErrorCompositionGoverned: true;
    readonly arbitraryFixedErrorBudgetSplitRequired: false;
    readonly certifiedDirectedMeanRuntimeMayBeImplementedNext: true;
    readonly certifiedSymmetricMeanRuntimeMayBeImplementedNext: true;
    readonly arclengthMeanRuntimeImplementationIssued: false;
    readonly arclengthMeanRuntimeValueIssued: false;
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
    'certified_sqrt_enclosure_precision_allocation_not_governed',
    'certified_arclength_mean_total_error_composition_not_governed',
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
    readonly totalErrorBudgetMeansMorphologyThreshold: false;
    readonly totalErrorBudgetMeansTraditionalThicknessThreshold: false;
    readonly additionalSubdivisionMeansSemanticCalibration: false;
    readonly minimumPrecisionBitsMeanBiologicalPrecision: false;
    readonly certifiedArclengthMeanSeparationMeansLipThickness: false;
    readonly certifiedArclengthMeanSeparationMeansPhysicalBandWidth: false;
    readonly coordinateCentimeterMeansPhysicalSoftTissueAnthropometry: false;
    readonly totalErrorCompositionReviewMeansProductionMetricBinding: false;
    readonly totalErrorCompositionReviewMeansTraditionalDuanHou: false;
  };
  readonly prohibitedShortcuts: readonly [
    'numeric_total_error_budget_to_morphology_threshold',
    'numeric_total_error_budget_to_traditional_thickness_threshold',
    'extra_quadrature_subdivision_to_semantic_calibration',
    'sqrt_precision_bits_to_biological_precision',
    'certified_arclength_mean_separation_to_lip_thickness',
    'certified_arclength_mean_separation_to_physical_band_width',
    'coordinate_centimeter_to_physical_soft_tissue_anthropometry',
    'total_error_composition_review_to_runtime_value',
    'total_error_composition_review_to_neutral_metric_binding',
    'total_error_composition_review_to_traditional_duan_hou_semantics',
  ];
  readonly recommendedNextFrontier: {
    readonly frontierKey: 'certified_role_free_symmetric_arclength_mean_runtime_implementation';
    readonly purpose: 'implement the FR90 adaptive midpoint functional using FR94 exact/enclosure primitives and the FR95 combined certificate policy, while issuing only a role-free neutral geometry functional interval/value';
    readonly runtimeConstructionAllowed: true;
    readonly runtimeValueAlreadyIssued: false;
    readonly neutralMetricBindingAllowed: false;
    readonly anatomicalRoleAssignmentAllowed: false;
    readonly correspondencePairIssuanceAllowed: false;
    readonly thicknessSemanticAssignmentAllowed: false;
    readonly physicalAnthropometricInterpretationAllowed: false;
    readonly traditionalSemanticAssignmentAllowed: false;
  };
}

const ISSUED = new WeakSet<object>();

const RESOLVED = Object.freeze([
  'certified_sqrt_enclosure_precision_allocation_not_governed',
  'certified_arclength_mean_total_error_composition_not_governed',
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
  'numeric_total_error_budget_to_morphology_threshold',
  'numeric_total_error_budget_to_traditional_thickness_threshold',
  'extra_quadrature_subdivision_to_semantic_calibration',
  'sqrt_precision_bits_to_biological_precision',
  'certified_arclength_mean_separation_to_lip_thickness',
  'certified_arclength_mean_separation_to_physical_band_width',
  'coordinate_centimeter_to_physical_soft_tissue_anthropometry',
  'total_error_composition_review_to_runtime_value',
  'total_error_composition_review_to_neutral_metric_binding',
  'total_error_composition_review_to_traditional_duan_hou_semantics',
] as const);

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-95 ${message}`);
}

function validateSources(): void {
  const fr90 = reviewRoleFreeArclengthMeanIntegrationAlgorithmFR90();
  assertIssuedRoleFreeArclengthMeanIntegrationAlgorithmReviewFR90(fr90);
  if (
    fr90.algorithmDecision.preferredAlgorithmClass !== 'lipschitz_certified_adaptive_midpoint' ||
    fr90.algorithmDecision.certificateType !== 'deterministic_absolute_integration_error_upper_bound' ||
    fr90.algorithmDecision.runtimeValueIssued !== false
  ) fail('FR-90 algorithm authority drift.');

  const fr91 = reviewCertifiedArclengthMeanRuntimeNumericPolicyFR91();
  assertIssuedCertifiedArclengthMeanRuntimeNumericPolicyReviewFR91(fr91);
  if (
    fr91.numericAccuracyPolicy.directedMeanRelativeErrorDenominator !== 4096 ||
    fr91.numericAccuracyPolicy.directedMeanAbsoluteErrorBudget !== 'L_source/4096' ||
    fr91.numericAccuracyPolicy.symmetricMeanAbsoluteErrorBudget !== '(L_A+L_B)/8192' ||
    fr91.deterministicSubdivisionPolicy.providerSegmentIndexTieBreakAllowed !== false ||
    fr91.policyDecision.runtimeValueIssued !== false
  ) fail('FR-91 numeric budget or deterministic subdivision authority drift.');

  const fr94 = getExactRationalDistanceEnclosurePrimitivesRuntimeFR94();
  assertIssuedExactRationalDistanceEnclosurePrimitivesRuntimeFR94(fr94);
  if (
    fr94.schemaVersion !== 'fr94-exact-rational-distance-enclosure-primitives-runtime-v1' ||
    fr94.implementationDecision.primitiveRuntimeImplementationIssued !== true ||
    fr94.implementationDecision.exactSquaredDistanceRuntimeIssued !== true ||
    fr94.implementationDecision.certifiedSqrtEnclosureRuntimeIssued !== true ||
    fr94.implementationDecision.arclengthMeanRuntimeAuthorized !== false ||
    fr94.implementationDecision.arclengthMeanRuntimeValueIssued !== false ||
    fr94.recommendedNextFrontier.frontierKey !== 'certified_sqrt_enclosure_precision_allocation_and_total_error_composition_review' ||
    fr94.thicknessMetricIssued !== false ||
    fr94.traditionalSemanticAuthority !== false
  ) fail('FR-94 primitive runtime or composition gate authority drift.');
}

export function reviewCertifiedArclengthTotalErrorCompositionFR95(): CertifiedArclengthTotalErrorCompositionReviewFR95V1 {
  validateSources();

  const result: CertifiedArclengthTotalErrorCompositionReviewFR95V1 = Object.freeze({
    schemaVersion: 'fr95-certified-arclength-total-error-composition-review-v1' as const,
    artifactVersion: '0.1.0' as const,
    authorityState: 'certified_arclength_total_error_composition_review_completed_no_arclength_runtime_value_issued' as const,
    sourceAuthority: Object.freeze({
      fr90SchemaVersion: 'fr90-role-free-arclength-mean-integration-algorithm-review-v1' as const,
      fr91SchemaVersion: 'fr91-certified-arclength-mean-runtime-numeric-policy-review-v1' as const,
      fr94SchemaVersion: 'fr94-exact-rational-distance-enclosure-primitives-runtime-v1' as const,
      preferredAlgorithmClass: 'lipschitz_certified_adaptive_midpoint' as const,
      directedMeanBudget: 'L_source/4096' as const,
      primitiveRuntimeIssued: true as const,
      arclengthMeanRuntimeValueIssuedBeforeFR95: false as const,
    }),
    exactQuadratureComposition: Object.freeze({
      leafSquaredArclengthExactRational: true as const,
      nearestMidpointSquaredDistanceExactRational: true as const,
      midpointContributionSquaredForm: 'h_squared_times_nearest_distance_squared' as const,
      midpointContribution: 'sqrt(h_squared_times_nearest_distance_squared)' as const,
      midpointContributionEnclosedByFR94SqrtPrimitive: true as const,
      directedQuadratureIntegralErrorCertificate: 'Q=sum_leaf(h_squared)/4' as const,
      quadratureCertificateExactRational: true as const,
      exactIntegralContainment: 'I_exact_in_[max(0,S_lower-Q),S_upper+Q]' as const,
    }),
    perimeterAndDivisionComposition: Object.freeze({
      sourcePerimeterEnclosure: 'L_in_[L_lower,L_upper]_from_sum_of_segment_sqrt_enclosures' as const,
      positiveLowerPerimeterRequired: true as const,
      directedMeanContainment: 'M_exact_in_[I_lower/L_upper,I_upper/L_lower]' as const,
      intervalDivisionUsesPositiveRationalBoundsOnly: true as const,
      returnedPointEstimateIfRuntimeLater: 'midpoint_of_certified_mean_interval' as const,
      returnedAbsoluteErrorCertificateIfRuntimeLater: 'half_width_of_certified_mean_interval' as const,
    }),
    strictQuadratureSlackPolicy: Object.freeze({
      fixedFractionBudgetSplitAdmitted: false as const,
      firstFR91BudgetSatisfactionMayConsumeFullBudget: true as const,
      additionalSubdivisionRequiredBeforeArithmeticCertification: true as const,
      additionalSubdivisionRule: 'one_more_equal_maximum_certificate_batch_after_first_fr91_quadrature_budget_satisfaction' as const,
      zeroQuadratureException: 'skip_extra_batch_only_if_Q_equals_zero' as const,
      strictSlackConsequence: 'Q_strictly_less_than_L_source_squared_over_4096_when_Q_nonzero' as const,
      providerSegmentIndexTieBreakAllowed: false as const,
      empiricalToleranceUsed: false as const,
    }),
    sqrtPrecisionAllocationPolicy: Object.freeze({
      commonPrecisionPerDirectedComputation: true as const,
      precisionDomain: 'nonnegative_integer_bits' as const,
      selectionRule: 'minimum_p_whose_certified_directed_mean_interval_half_width_lte_L_lower_over_4096' as const,
      searchOrder: 'p_equals_0_1_2_3_in_strictly_increasing_order' as const,
      perimeterLowerBoundMustBePositive: true as const,
      fixedMagicPrecisionAdmitted: false as const,
      empiricalPrecisionTuningAdmitted: false as const,
      strictQuadratureSlackGuaranteesFinitePrecisionExistsForNondegenerateSource: true as const,
      precisionBitsAreEngineeringCertificateResolutionOnly: true as const,
    }),
    directedCertificateAcceptance: Object.freeze({
      exactTruthContainedInReturnedInterval: true as const,
      pointEstimate: 'C=(M_lower+M_upper)/2' as const,
      absoluteErrorCertificate: 'R=(M_upper-M_lower)/2' as const,
      acceptanceRule: 'R<=L_lower/4096' as const,
      implication: 'R<=L_source/4096' as const,
      fr91DirectedBudgetSatisfiedByConstruction: true as const,
    }),
    symmetricComposition: Object.freeze({
      twoDirectedCertificatesRequired: true as const,
      symmetricInterval: '[0.5*(A_lower+B_lower),0.5*(A_upper+B_upper)]' as const,
      symmetricPointEstimate: 'midpoint_of_symmetric_interval' as const,
      symmetricRadiusBound: 'R_sym<=0.5*(L_A_lower/4096+L_B_lower/4096)' as const,
      fr91SymmetricBudgetImplication: 'R_sym<=(L_A+L_B)/8192' as const,
      contourSwapInvariantByConstruction: true as const,
    }),
    compositionDecision: Object.freeze({
      sqrtPrecisionAllocationGoverned: true as const,
      quadratureAndArithmeticTotalErrorCompositionGoverned: true as const,
      arbitraryFixedErrorBudgetSplitRequired: false as const,
      certifiedDirectedMeanRuntimeMayBeImplementedNext: true as const,
      certifiedSymmetricMeanRuntimeMayBeImplementedNext: true as const,
      arclengthMeanRuntimeImplementationIssued: false as const,
      arclengthMeanRuntimeValueIssued: false as const,
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
      totalErrorBudgetMeansMorphologyThreshold: false as const,
      totalErrorBudgetMeansTraditionalThicknessThreshold: false as const,
      additionalSubdivisionMeansSemanticCalibration: false as const,
      minimumPrecisionBitsMeanBiologicalPrecision: false as const,
      certifiedArclengthMeanSeparationMeansLipThickness: false as const,
      certifiedArclengthMeanSeparationMeansPhysicalBandWidth: false as const,
      coordinateCentimeterMeansPhysicalSoftTissueAnthropometry: false as const,
      totalErrorCompositionReviewMeansProductionMetricBinding: false as const,
      totalErrorCompositionReviewMeansTraditionalDuanHou: false as const,
    }),
    prohibitedShortcuts: PROHIBITED,
    recommendedNextFrontier: Object.freeze({
      frontierKey: 'certified_role_free_symmetric_arclength_mean_runtime_implementation' as const,
      purpose: 'implement the FR90 adaptive midpoint functional using FR94 exact/enclosure primitives and the FR95 combined certificate policy, while issuing only a role-free neutral geometry functional interval/value' as const,
      runtimeConstructionAllowed: true as const,
      runtimeValueAlreadyIssued: false as const,
      neutralMetricBindingAllowed: false as const,
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

export function assertIssuedCertifiedArclengthTotalErrorCompositionReviewFR95(
  value: CertifiedArclengthTotalErrorCompositionReviewFR95V1,
): void {
  if (!ISSUED.has(value as object)) fail('value was not issued by the active FR-95 boundary.');
  if (
    value.schemaVersion !== 'fr95-certified-arclength-total-error-composition-review-v1' ||
    value.authorityState !== 'certified_arclength_total_error_composition_review_completed_no_arclength_runtime_value_issued' ||
    value.compositionDecision.sqrtPrecisionAllocationGoverned !== true ||
    value.compositionDecision.quadratureAndArithmeticTotalErrorCompositionGoverned !== true ||
    value.compositionDecision.arclengthMeanRuntimeImplementationIssued !== false ||
    value.compositionDecision.arclengthMeanRuntimeValueIssued !== false ||
    value.thicknessMetricIssued !== false ||
    value.traditionalSemanticAuthority !== false
  ) fail('issued FR-95 total-error composition authority drift.');
}
