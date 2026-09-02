import {
  assertIssuedRoleFreeSymmetricSetDistanceFeasibilityReviewFR87,
  reviewRoleFreeSymmetricSetDistanceFeasibilityFR87,
} from './role-free-symmetric-set-distance-feasibility-review-fr87.js';
import { computeRoleFreeClosedPolylineMinimumSetSeparationFR88 } from './role-free-minimum-set-separation-runtime-fr88.js';
import { FaceAuthorityValidationError } from './validation.js';

export type WholeContourSeparationCandidateStatusFR89 =
  | 'research_spec_admitted_preferred_for_runtime_algorithm_review'
  | 'research_spec_admitted_secondary_not_selected'
  | 'not_admitted_requires_quantile_convention_and_runtime_solver'
  | 'rejected_sampling_density_dependent'
  | 'existing_runtime_local_extreme_not_representative'
  | 'existing_research_spec_worst_case_not_representative';

export interface WholeContourSeparationCandidateFR89V1 {
  readonly candidateKey:
    | 'symmetric_arclength_mean_nearest_set_distance'
    | 'symmetric_arclength_rms_nearest_set_distance'
    | 'symmetric_arclength_median_nearest_set_distance'
    | 'vertex_mean_nearest_neighbor_distance'
    | 'minimum_set_separation'
    | 'bidirectional_hausdorff_distance';
  readonly status: WholeContourSeparationCandidateStatusFR89;
  readonly continuousClosedPolylineFunctional: boolean;
  readonly symmetricUnderContourSwap: boolean;
  readonly cycleStartIndexInvariantByDefinition: boolean;
  readonly cycleOrientationInvariantByDefinition: boolean;
  readonly explicitPointPairCorrespondenceRequired: boolean;
  readonly anatomicalRolesRequired: boolean;
  readonly samplingDensityInvariantByDefinition: boolean;
  readonly wholeContourCoverage: 'continuous_arclength' | 'continuous_extreme_only' | 'discrete_vertices_only';
  readonly interpretationBoundary: string;
}

export interface RoleFreeWholeContourSeparationSummaryFeasibilityReviewFR89V1 {
  readonly schemaVersion: 'fr89-role-free-whole-contour-separation-summary-feasibility-review-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'role_free_whole_contour_separation_summary_feasibility_review_completed_no_runtime_value_issued';
  readonly reviewScope: 'continuous_closed_polyline_whole_contour_separation_summaries_only';
  readonly sourceAuthority: {
    readonly fr87SchemaVersion: 'fr87-role-free-symmetric-set-distance-feasibility-review-v1';
    readonly fr88RuntimeState: 'role_free_minimum_set_separation_runtime_implemented_upstream';
    readonly contourRepresentation: 'two_unordered_continuous_closed_polylines_in_shared_pose_normalized_metric_plane';
  };
  readonly mathematicalDefinitions: {
    readonly symmetricArclengthMeanNearestSetDistance: '0.5*((1/L_A)*integral_A d(a,B) ds + (1/L_B)*integral_B d(b,A) ds)';
    readonly symmetricArclengthRmsNearestSetDistance: 'sqrt(0.5*((1/L_A)*integral_A d(a,B)^2 ds + (1/L_B)*integral_B d(b,A)^2 ds))';
    readonly arclengthMeasureRequirement: 'continuous_polyline_arclength_measure_not_provider_vertex_count_measure';
    readonly nearestSetDistanceDefinition: 'd(p,S)=inf_{s_in_S} euclidean_distance(p,s)';
  };
  readonly candidates: readonly [
    WholeContourSeparationCandidateFR89V1,
    WholeContourSeparationCandidateFR89V1,
    WholeContourSeparationCandidateFR89V1,
    WholeContourSeparationCandidateFR89V1,
    WholeContourSeparationCandidateFR89V1,
    WholeContourSeparationCandidateFR89V1,
  ];
  readonly feasibilityDecision: {
    readonly admittedResearchSpecificationCount: 2;
    readonly preferredCandidate: 'symmetric_arclength_mean_nearest_set_distance';
    readonly preferredCandidateReason: 'continuous_sampling_density_invariant_symmetric_average_of_nearest_set_distance_over_both_contours';
    readonly minimumSetSeparationAloneRepresentative: false;
    readonly hausdorffDistanceRepresentativeAverage: false;
    readonly vertexOnlyAggregationAllowed: false;
    readonly runtimeAlgorithmAdmitted: false;
    readonly runtimeValueIssued: false;
  };
  readonly runtimeGeometryFunctionalDefinitionsIssued: 0;
  readonly runtimeGeometryValuesIssued: 0;
  readonly neutralMetricDefinitionsIssued: 0;
  readonly neutralMetricValuesIssued: 0;
  readonly anatomicalRolesIssued: 0;
  readonly crossContourCorrespondencePairsIssued: 0;
  readonly thicknessMetricIssued: false;
  readonly representativeBandWidthSemanticIssued: false;
  readonly physicalAnthropometricInterpretationAuthorized: false;
  readonly morphologyProduced: false;
  readonly criterionStatesIssued: 0;
  readonly claimsIssued: 0;
  readonly traditionalSemanticAuthority: false;
  readonly resolvedProcessGap: 'role_free_representative_band_width_functional_not_reviewed';
  readonly newlyExposedPrerequisiteBlockers: readonly [
    'continuous_arclength_mean_nearest_set_distance_runtime_algorithm_not_governed',
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
    readonly meanNearestSetDistanceMeansLipThickness: false;
    readonly meanNearestSetDistanceMeansRepresentativePhysicalBandWidth: false;
    readonly rmsNearestSetDistanceMeansLipThickness: false;
    readonly minimumSetSeparationMeansRepresentativeWholeContourWidth: false;
    readonly hausdorffMeansRepresentativeWholeContourWidth: false;
    readonly continuousArclengthMeasureMeansAnatomicalCorrespondence: false;
    readonly coordinateCentimeterMeansPhysicalSoftTissueAnthropometry: false;
    readonly researchFunctionalSpecificationMeansNeutralMetricBinding: false;
    readonly researchFunctionalSpecificationMeansTraditionalDuanHou: false;
  };
  readonly prohibitedShortcuts: readonly [
    'arclength_mean_nearest_set_distance_to_lip_thickness',
    'arclength_mean_nearest_set_distance_to_physical_band_width',
    'arclength_rms_nearest_set_distance_to_lip_thickness',
    'minimum_set_separation_to_representative_whole_contour_width',
    'hausdorff_distance_to_representative_whole_contour_width',
    'provider_vertex_mean_to_continuous_arclength_mean',
    'continuous_arclength_measure_to_point_correspondence',
    'coordinate_centimeter_to_physical_soft_tissue_anthropometry',
    'research_functional_specification_to_neutral_metric_binding',
    'research_functional_specification_to_traditional_duan_hou_semantics',
  ];
  readonly recommendedNextFrontier: {
    readonly frontierKey: 'role_free_arclength_mean_nearest_set_distance_runtime_algorithm_review';
    readonly purpose: 'govern_exact_or_certified_continuous_arclength_integration_of_nearest_set_distance_without_vertex_sampling_substitution';
    readonly runtimeImplementationAllowedBeforeAlgorithmReview: false;
    readonly discreteVertexSamplingSubstitutionAllowed: false;
    readonly correspondenceAssignmentAllowed: false;
    readonly anatomicalRoleAssignmentAllowed: false;
    readonly thicknessSemanticAssignmentAllowed: false;
    readonly traditionalSemanticAssignmentAllowed: false;
  };
}

const ISSUED = new WeakSet<object>();

const CANDIDATES = Object.freeze([
  Object.freeze({
    candidateKey: 'symmetric_arclength_mean_nearest_set_distance' as const,
    status: 'research_spec_admitted_preferred_for_runtime_algorithm_review' as const,
    continuousClosedPolylineFunctional: true,
    symmetricUnderContourSwap: true,
    cycleStartIndexInvariantByDefinition: true,
    cycleOrientationInvariantByDefinition: true,
    explicitPointPairCorrespondenceRequired: false,
    anatomicalRolesRequired: false,
    samplingDensityInvariantByDefinition: true,
    wholeContourCoverage: 'continuous_arclength' as const,
    interpretationBoundary: 'average nearest-boundary separation over continuous arclength only; not lip thickness or physical band width',
  }),
  Object.freeze({
    candidateKey: 'symmetric_arclength_rms_nearest_set_distance' as const,
    status: 'research_spec_admitted_secondary_not_selected' as const,
    continuousClosedPolylineFunctional: true,
    symmetricUnderContourSwap: true,
    cycleStartIndexInvariantByDefinition: true,
    cycleOrientationInvariantByDefinition: true,
    explicitPointPairCorrespondenceRequired: false,
    anatomicalRolesRequired: false,
    samplingDensityInvariantByDefinition: true,
    wholeContourCoverage: 'continuous_arclength' as const,
    interpretationBoundary: 'tail-sensitive nearest-boundary separation summary; not lip thickness or physical band width',
  }),
  Object.freeze({
    candidateKey: 'symmetric_arclength_median_nearest_set_distance' as const,
    status: 'not_admitted_requires_quantile_convention_and_runtime_solver' as const,
    continuousClosedPolylineFunctional: true,
    symmetricUnderContourSwap: true,
    cycleStartIndexInvariantByDefinition: true,
    cycleOrientationInvariantByDefinition: true,
    explicitPointPairCorrespondenceRequired: false,
    anatomicalRolesRequired: false,
    samplingDensityInvariantByDefinition: true,
    wholeContourCoverage: 'continuous_arclength' as const,
    interpretationBoundary: 'quantile convention and exact continuous solver are not governed; no runtime or semantic admission',
  }),
  Object.freeze({
    candidateKey: 'vertex_mean_nearest_neighbor_distance' as const,
    status: 'rejected_sampling_density_dependent' as const,
    continuousClosedPolylineFunctional: false,
    symmetricUnderContourSwap: true,
    cycleStartIndexInvariantByDefinition: true,
    cycleOrientationInvariantByDefinition: true,
    explicitPointPairCorrespondenceRequired: false,
    anatomicalRolesRequired: false,
    samplingDensityInvariantByDefinition: false,
    wholeContourCoverage: 'discrete_vertices_only' as const,
    interpretationBoundary: 'provider vertex density and topology weighting can change the value; cannot substitute for continuous arclength measure',
  }),
  Object.freeze({
    candidateKey: 'minimum_set_separation' as const,
    status: 'existing_runtime_local_extreme_not_representative' as const,
    continuousClosedPolylineFunctional: true,
    symmetricUnderContourSwap: true,
    cycleStartIndexInvariantByDefinition: true,
    cycleOrientationInvariantByDefinition: true,
    explicitPointPairCorrespondenceRequired: false,
    anatomicalRolesRequired: false,
    samplingDensityInvariantByDefinition: true,
    wholeContourCoverage: 'continuous_extreme_only' as const,
    interpretationBoundary: 'closest boundary gap only; one local minimum cannot represent the whole contour',
  }),
  Object.freeze({
    candidateKey: 'bidirectional_hausdorff_distance' as const,
    status: 'existing_research_spec_worst_case_not_representative' as const,
    continuousClosedPolylineFunctional: true,
    symmetricUnderContourSwap: true,
    cycleStartIndexInvariantByDefinition: true,
    cycleOrientationInvariantByDefinition: true,
    explicitPointPairCorrespondenceRequired: false,
    anatomicalRolesRequired: false,
    samplingDensityInvariantByDefinition: true,
    wholeContourCoverage: 'continuous_extreme_only' as const,
    interpretationBoundary: 'worst-case set mismatch only; not a representative average separation or thickness',
  }),
] as const);

const NEW_BLOCKERS = Object.freeze([
  'continuous_arclength_mean_nearest_set_distance_runtime_algorithm_not_governed',
] as const);

const REMAINING_BLOCKERS = Object.freeze([
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
  'arclength_mean_nearest_set_distance_to_lip_thickness',
  'arclength_mean_nearest_set_distance_to_physical_band_width',
  'arclength_rms_nearest_set_distance_to_lip_thickness',
  'minimum_set_separation_to_representative_whole_contour_width',
  'hausdorff_distance_to_representative_whole_contour_width',
  'provider_vertex_mean_to_continuous_arclength_mean',
  'continuous_arclength_measure_to_point_correspondence',
  'coordinate_centimeter_to_physical_soft_tissue_anthropometry',
  'research_functional_specification_to_neutral_metric_binding',
  'research_functional_specification_to_traditional_duan_hou_semantics',
] as const);

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-89 ${message}`);
}

function validateFR87Authority(): void {
  const fr87 = reviewRoleFreeSymmetricSetDistanceFeasibilityFR87();
  assertIssuedRoleFreeSymmetricSetDistanceFeasibilityReviewFR87(fr87);
  if (
    fr87.schemaVersion !== 'fr87-role-free-symmetric-set-distance-feasibility-review-v1' ||
    fr87.authorityState !== 'role_free_symmetric_set_distance_feasibility_review_completed_no_runtime_metric_issued' ||
    fr87.mathematicalDefinitions.minimumSetSeparation !== 'inf_{a_in_A,b_in_B} euclidean_distance(a,b)' ||
    fr87.feasibilityDecision.researchNeutralFunctionalSpecificationsAdmitted !== 2 ||
    fr87.candidates[0].functional !== 'minimum_set_separation' ||
    fr87.candidates[0].researchNeutralFunctionalSpecificationAdmitted !== true ||
    fr87.candidates[1].functional !== 'bidirectional_hausdorff_distance' ||
    fr87.candidates[1].researchNeutralFunctionalSpecificationAdmitted !== true ||
    fr87.authorityBoundary.minimumGapMeansRepresentativeBandWidth !== false ||
    fr87.authorityBoundary.hausdorffMeansRepresentativeBandWidth !== false ||
    fr87.thicknessMetricIssued !== false ||
    fr87.traditionalSemanticAuthority !== false ||
    typeof computeRoleFreeClosedPolylineMinimumSetSeparationFR88 !== 'function'
  ) fail('FR-87/FR-88 whole-contour frontier authority drift.');
}

export function reviewRoleFreeWholeContourSeparationSummaryFeasibilityFR89(): RoleFreeWholeContourSeparationSummaryFeasibilityReviewFR89V1 {
  validateFR87Authority();

  const result: RoleFreeWholeContourSeparationSummaryFeasibilityReviewFR89V1 = Object.freeze({
    schemaVersion: 'fr89-role-free-whole-contour-separation-summary-feasibility-review-v1' as const,
    artifactVersion: '0.1.0' as const,
    authorityState: 'role_free_whole_contour_separation_summary_feasibility_review_completed_no_runtime_value_issued' as const,
    reviewScope: 'continuous_closed_polyline_whole_contour_separation_summaries_only' as const,
    sourceAuthority: Object.freeze({
      fr87SchemaVersion: 'fr87-role-free-symmetric-set-distance-feasibility-review-v1' as const,
      fr88RuntimeState: 'role_free_minimum_set_separation_runtime_implemented_upstream' as const,
      contourRepresentation: 'two_unordered_continuous_closed_polylines_in_shared_pose_normalized_metric_plane' as const,
    }),
    mathematicalDefinitions: Object.freeze({
      symmetricArclengthMeanNearestSetDistance: '0.5*((1/L_A)*integral_A d(a,B) ds + (1/L_B)*integral_B d(b,A) ds)' as const,
      symmetricArclengthRmsNearestSetDistance: 'sqrt(0.5*((1/L_A)*integral_A d(a,B)^2 ds + (1/L_B)*integral_B d(b,A)^2 ds))' as const,
      arclengthMeasureRequirement: 'continuous_polyline_arclength_measure_not_provider_vertex_count_measure' as const,
      nearestSetDistanceDefinition: 'd(p,S)=inf_{s_in_S} euclidean_distance(p,s)' as const,
    }),
    candidates: CANDIDATES,
    feasibilityDecision: Object.freeze({
      admittedResearchSpecificationCount: 2 as const,
      preferredCandidate: 'symmetric_arclength_mean_nearest_set_distance' as const,
      preferredCandidateReason: 'continuous_sampling_density_invariant_symmetric_average_of_nearest_set_distance_over_both_contours' as const,
      minimumSetSeparationAloneRepresentative: false as const,
      hausdorffDistanceRepresentativeAverage: false as const,
      vertexOnlyAggregationAllowed: false as const,
      runtimeAlgorithmAdmitted: false as const,
      runtimeValueIssued: false as const,
    }),
    runtimeGeometryFunctionalDefinitionsIssued: 0 as const,
    runtimeGeometryValuesIssued: 0 as const,
    neutralMetricDefinitionsIssued: 0 as const,
    neutralMetricValuesIssued: 0 as const,
    anatomicalRolesIssued: 0 as const,
    crossContourCorrespondencePairsIssued: 0 as const,
    thicknessMetricIssued: false as const,
    representativeBandWidthSemanticIssued: false as const,
    physicalAnthropometricInterpretationAuthorized: false as const,
    morphologyProduced: false as const,
    criterionStatesIssued: 0 as const,
    claimsIssued: 0 as const,
    traditionalSemanticAuthority: false as const,
    resolvedProcessGap: 'role_free_representative_band_width_functional_not_reviewed' as const,
    newlyExposedPrerequisiteBlockers: NEW_BLOCKERS,
    remainingBlockers: REMAINING_BLOCKERS,
    authorityBoundary: Object.freeze({
      meanNearestSetDistanceMeansLipThickness: false as const,
      meanNearestSetDistanceMeansRepresentativePhysicalBandWidth: false as const,
      rmsNearestSetDistanceMeansLipThickness: false as const,
      minimumSetSeparationMeansRepresentativeWholeContourWidth: false as const,
      hausdorffMeansRepresentativeWholeContourWidth: false as const,
      continuousArclengthMeasureMeansAnatomicalCorrespondence: false as const,
      coordinateCentimeterMeansPhysicalSoftTissueAnthropometry: false as const,
      researchFunctionalSpecificationMeansNeutralMetricBinding: false as const,
      researchFunctionalSpecificationMeansTraditionalDuanHou: false as const,
    }),
    prohibitedShortcuts: PROHIBITED,
    recommendedNextFrontier: Object.freeze({
      frontierKey: 'role_free_arclength_mean_nearest_set_distance_runtime_algorithm_review' as const,
      purpose: 'govern_exact_or_certified_continuous_arclength_integration_of_nearest_set_distance_without_vertex_sampling_substitution' as const,
      runtimeImplementationAllowedBeforeAlgorithmReview: false as const,
      discreteVertexSamplingSubstitutionAllowed: false as const,
      correspondenceAssignmentAllowed: false as const,
      anatomicalRoleAssignmentAllowed: false as const,
      thicknessSemanticAssignmentAllowed: false as const,
      traditionalSemanticAssignmentAllowed: false as const,
    }),
  });

  ISSUED.add(result);
  return result;
}

export function assertIssuedRoleFreeWholeContourSeparationSummaryFeasibilityReviewFR89(
  result: RoleFreeWholeContourSeparationSummaryFeasibilityReviewFR89V1,
): void {
  if (!ISSUED.has(result)) fail('review was not issued by the active FR-89 boundary.');
  if (
    result.schemaVersion !== 'fr89-role-free-whole-contour-separation-summary-feasibility-review-v1' ||
    result.artifactVersion !== '0.1.0' ||
    result.authorityState !== 'role_free_whole_contour_separation_summary_feasibility_review_completed_no_runtime_value_issued' ||
    result.feasibilityDecision.admittedResearchSpecificationCount !== 2 ||
    result.feasibilityDecision.preferredCandidate !== 'symmetric_arclength_mean_nearest_set_distance' ||
    result.feasibilityDecision.vertexOnlyAggregationAllowed !== false ||
    result.feasibilityDecision.runtimeAlgorithmAdmitted !== false ||
    result.feasibilityDecision.runtimeValueIssued !== false ||
    result.runtimeGeometryFunctionalDefinitionsIssued !== 0 ||
    result.runtimeGeometryValuesIssued !== 0 ||
    result.neutralMetricDefinitionsIssued !== 0 ||
    result.neutralMetricValuesIssued !== 0 ||
    result.anatomicalRolesIssued !== 0 ||
    result.crossContourCorrespondencePairsIssued !== 0 ||
    result.thicknessMetricIssued !== false ||
    result.representativeBandWidthSemanticIssued !== false ||
    result.physicalAnthropometricInterpretationAuthorized !== false ||
    result.morphologyProduced !== false ||
    result.criterionStatesIssued !== 0 ||
    result.claimsIssued !== 0 ||
    result.traditionalSemanticAuthority !== false ||
    result.resolvedProcessGap !== 'role_free_representative_band_width_functional_not_reviewed' ||
    result.recommendedNextFrontier.runtimeImplementationAllowedBeforeAlgorithmReview !== false ||
    result.recommendedNextFrontier.discreteVertexSamplingSubstitutionAllowed !== false ||
    result.authorityBoundary.meanNearestSetDistanceMeansLipThickness !== false ||
    result.authorityBoundary.researchFunctionalSpecificationMeansTraditionalDuanHou !== false
  ) fail('issued FR-89 authority boundary drift.');
}
