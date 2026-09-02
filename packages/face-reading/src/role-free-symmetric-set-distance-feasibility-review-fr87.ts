import {
  assertIssuedRoleFreeCrossContourCorrespondenceFeasibilityReviewFR86,
  reviewRoleFreeCrossContourCorrespondenceFeasibilityFR86,
} from './role-free-cross-contour-correspondence-feasibility-review-fr86.js';
import { FaceAuthorityValidationError } from './validation.js';

export type RoleFreeSymmetricSetDistanceFunctionalFR87V1 =
  | 'minimum_set_separation'
  | 'bidirectional_hausdorff_distance';

export interface RoleFreeSymmetricSetDistanceCandidateFR87V1 {
  readonly functional: RoleFreeSymmetricSetDistanceFunctionalFR87V1;
  readonly domain: 'continuous_closed_polyline_boundary_sets_in_shared_pose_normalized_metric_plane';
  readonly distanceKernel: 'euclidean_2d';
  readonly mathematicalDefinitionClosed: true;
  readonly compactSetFiniteValueGuaranteed: true;
  readonly symmetricUnderContourSwap: true;
  readonly cycleStartIndexInvariant: true;
  readonly cycleOrientationInvariant: true;
  readonly explicitPointPairCorrespondenceRequired: false;
  readonly anatomicalRolesRequired: false;
  readonly providerComponentOrderRequired: false;
  readonly continuousPolylineInterpretationRequired: true;
  readonly discreteLandmarkOnlyApproximationAuthorized: false;
  readonly researchNeutralFunctionalSpecificationAdmitted: true;
  readonly runtimeValueIssuanceAdmitted: false;
  readonly physicalAnthropometricInterpretationAuthorized: false;
  readonly thicknessSemanticAuthorized: false;
  readonly traditionalSemanticAuthorized: false;
  readonly exactRuntimeRecipeState:
    | 'finite_segment_pair_minimum_recipe_available'
    | 'continuous_directed_maximum_solver_not_yet_governed';
  readonly limitation:
    | 'closest_boundary_gap_only_not_representative_band_width'
    | 'worst_case_set_mismatch_not_local_band_width';
}

export interface RoleFreeSymmetricSetDistanceFeasibilityReviewFR87V1 {
  readonly schemaVersion: 'fr87-role-free-symmetric-set-distance-feasibility-review-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'role_free_symmetric_set_distance_feasibility_review_completed_no_runtime_metric_issued';
  readonly upstreamAuthority: {
    readonly fr86ReviewCompleted: true;
    readonly correspondenceMethodAdmitted: false;
    readonly correspondencePairsIssued: 0;
    readonly requestedFrontierMatches: true;
    readonly requestedCandidateFunctionalsMatch: true;
  };
  readonly setModel: {
    readonly sourceCoordinateFrame: 'pose_normalized_face_2d';
    readonly sourceCoordinateUnit: 'centimeter';
    readonly contourRepresentation: 'closed_piecewise_linear_boundary_through_governed_contour_vertices';
    readonly contourRoleRequirement: 'unordered_role_free_pair';
    readonly euclideanKernel: true;
    readonly absoluteCoordinateDistanceMeansPhysicalSoftTissueMeasurement: false;
  };
  readonly candidates: readonly [
    RoleFreeSymmetricSetDistanceCandidateFR87V1,
    RoleFreeSymmetricSetDistanceCandidateFR87V1,
  ];
  readonly feasibilityDecision: {
    readonly researchNeutralFunctionalSpecificationsAdmitted: 2;
    readonly productionNeutralMetricDefinitionsIssued: 0;
    readonly runtimeMetricValuesIssued: 0;
    readonly correspondenceStillRequiredForThicknessInterpretation: true;
    readonly preferredNextRuntimeFunctional: 'minimum_set_separation';
    readonly preferredReason: 'exact_finite_closed_polyline_segment_pair_minimum_requires_no_additional_semantic_pairing_policy';
    readonly hausdorffRuntimeDeferred: true;
    readonly hausdorffDeferralReason: 'continuous_polyline_directed_maximum_algorithm_not_yet_governed_and_vertex_only_proxy_forbidden';
  };
  readonly mathematicalDefinitions: {
    readonly minimumSetSeparation: 'inf_{a_in_A,b_in_B} euclidean_distance(a,b)';
    readonly bidirectionalHausdorffDistance: 'max(sup_{a_in_A} inf_{b_in_B} d(a,b), sup_{b_in_B} inf_{a_in_A} d(a,b))';
    readonly compactClosedPolylinesAttainFiniteExtrema: true;
    readonly minimumSetSeparationFiniteAlgorithm: 'minimum_over_all_closed_polyline_segment_pair_euclidean_distances';
    readonly discreteVertexHausdorffEqualsContinuousPolylineHausdorffGuaranteed: false;
  };
  readonly recommendedNextFrontier: {
    readonly frontierKey: 'role_free_minimum_set_separation_runtime';
    readonly purpose: 'implement the exact continuous closed-polyline minimum boundary separation as neutral role-free geometry only';
    readonly requiresExplicitPointPairCorrespondence: false;
    readonly requiresAnatomicalRoles: false;
    readonly neutralMetricSemanticBindingAllowed: false;
    readonly thicknessSemanticAssignmentAllowed: false;
    readonly traditionalSemanticAssignmentAllowed: false;
  };
  readonly resolvedProcessGap: 'role_free_symmetric_cross_contour_distance_functional_not_reviewed';
  readonly newlyExposedPrerequisiteBlockers: readonly [
    'role_free_minimum_set_separation_runtime_not_implemented',
    'continuous_polyline_hausdorff_runtime_algorithm_not_governed',
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
  ];
  readonly authorityBoundary: {
    readonly symmetricSetDistanceMeansPointCorrespondence: false;
    readonly minimumSetSeparationMeansLipThickness: false;
    readonly hausdorffDistanceMeansLipThickness: false;
    readonly continuousPolylineDistanceMeansPhysicalAnthropometry: false;
    readonly researchFunctionalSpecificationMeansProductionMetric: false;
    readonly minimumGapMeansRepresentativeBandWidth: false;
    readonly hausdorffMeansRepresentativeBandWidth: false;
    readonly setDistanceMeansTraditionalDuanHou: false;
    readonly setDistanceMeansLipsSubstantialCriterionState: false;
  };
  readonly prohibitedShortcuts: readonly [
    'minimum_set_separation_to_lip_thickness',
    'hausdorff_distance_to_lip_thickness',
    'continuous_polyline_distance_to_physical_soft_tissue_measurement',
    'discrete_vertex_hausdorff_to_continuous_polyline_hausdorff',
    'set_distance_to_outer_inner_anatomy',
    'set_distance_to_traditional_duan_hou_semantics',
    'set_distance_to_lips_substantial_state',
    'research_functional_specification_to_production_metric',
  ];
  readonly neutralMetricDefinitionsIssued: 0;
  readonly neutralMetricValuesIssued: 0;
  readonly anatomicalRolesIssued: 0;
  readonly crossContourCorrespondencePairsIssued: 0;
  readonly thicknessMetricIssued: false;
  readonly morphologyProduced: false;
  readonly criterionStatesIssued: 0;
  readonly claimsIssued: 0;
  readonly traditionalSemanticAuthority: false;
}

const REVIEW_ISSUED = new WeakSet<object>();

const NEWLY_EXPOSED = Object.freeze([
  'role_free_minimum_set_separation_runtime_not_implemented',
  'continuous_polyline_hausdorff_runtime_algorithm_not_governed',
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
] as const);

const PROHIBITED_SHORTCUTS = Object.freeze([
  'minimum_set_separation_to_lip_thickness',
  'hausdorff_distance_to_lip_thickness',
  'continuous_polyline_distance_to_physical_soft_tissue_measurement',
  'discrete_vertex_hausdorff_to_continuous_polyline_hausdorff',
  'set_distance_to_outer_inner_anatomy',
  'set_distance_to_traditional_duan_hou_semantics',
  'set_distance_to_lips_substantial_state',
  'research_functional_specification_to_production_metric',
] as const);

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-87 ${message}`);
}

function validateUpstreamFR86(): void {
  const fr86 = reviewRoleFreeCrossContourCorrespondenceFeasibilityFR86();
  assertIssuedRoleFreeCrossContourCorrespondenceFeasibilityReviewFR86(fr86);
  if (
    fr86.authorityState !== 'role_free_cross_contour_correspondence_feasibility_review_completed_no_method_admitted' ||
    fr86.feasibilityDecision.correspondenceMethodAdmitted !== false ||
    fr86.feasibilityDecision.correspondencePairsIssued !== 0 ||
    fr86.recommendedNextFrontier.frontierKey !== 'role_free_symmetric_cross_contour_distance_functionals_feasibility_review' ||
    fr86.recommendedNextFrontier.candidateFunctionals[0] !== 'minimum_set_separation' ||
    fr86.recommendedNextFrontier.candidateFunctionals[1] !== 'bidirectional_hausdorff_distance' ||
    fr86.recommendedNextFrontier.neutralMetricIssuanceAllowedAtThisStage !== false ||
    fr86.thicknessMetricIssued !== false ||
    fr86.traditionalSemanticAuthority !== false
  ) fail('FR-86 correspondence/set-distance frontier authority drift.');
}

function candidate(input: RoleFreeSymmetricSetDistanceCandidateFR87V1): RoleFreeSymmetricSetDistanceCandidateFR87V1 {
  return Object.freeze({ ...input });
}

export function reviewRoleFreeSymmetricSetDistanceFeasibilityFR87(): RoleFreeSymmetricSetDistanceFeasibilityReviewFR87V1 {
  validateUpstreamFR86();

  const candidates = Object.freeze([
    candidate({
      functional: 'minimum_set_separation',
      domain: 'continuous_closed_polyline_boundary_sets_in_shared_pose_normalized_metric_plane',
      distanceKernel: 'euclidean_2d',
      mathematicalDefinitionClosed: true,
      compactSetFiniteValueGuaranteed: true,
      symmetricUnderContourSwap: true,
      cycleStartIndexInvariant: true,
      cycleOrientationInvariant: true,
      explicitPointPairCorrespondenceRequired: false,
      anatomicalRolesRequired: false,
      providerComponentOrderRequired: false,
      continuousPolylineInterpretationRequired: true,
      discreteLandmarkOnlyApproximationAuthorized: false,
      researchNeutralFunctionalSpecificationAdmitted: true,
      runtimeValueIssuanceAdmitted: false,
      physicalAnthropometricInterpretationAuthorized: false,
      thicknessSemanticAuthorized: false,
      traditionalSemanticAuthorized: false,
      exactRuntimeRecipeState: 'finite_segment_pair_minimum_recipe_available',
      limitation: 'closest_boundary_gap_only_not_representative_band_width',
    }),
    candidate({
      functional: 'bidirectional_hausdorff_distance',
      domain: 'continuous_closed_polyline_boundary_sets_in_shared_pose_normalized_metric_plane',
      distanceKernel: 'euclidean_2d',
      mathematicalDefinitionClosed: true,
      compactSetFiniteValueGuaranteed: true,
      symmetricUnderContourSwap: true,
      cycleStartIndexInvariant: true,
      cycleOrientationInvariant: true,
      explicitPointPairCorrespondenceRequired: false,
      anatomicalRolesRequired: false,
      providerComponentOrderRequired: false,
      continuousPolylineInterpretationRequired: true,
      discreteLandmarkOnlyApproximationAuthorized: false,
      researchNeutralFunctionalSpecificationAdmitted: true,
      runtimeValueIssuanceAdmitted: false,
      physicalAnthropometricInterpretationAuthorized: false,
      thicknessSemanticAuthorized: false,
      traditionalSemanticAuthorized: false,
      exactRuntimeRecipeState: 'continuous_directed_maximum_solver_not_yet_governed',
      limitation: 'worst_case_set_mismatch_not_local_band_width',
    }),
  ] as const);

  const result: RoleFreeSymmetricSetDistanceFeasibilityReviewFR87V1 = Object.freeze({
    schemaVersion: 'fr87-role-free-symmetric-set-distance-feasibility-review-v1' as const,
    artifactVersion: '0.1.0' as const,
    authorityState: 'role_free_symmetric_set_distance_feasibility_review_completed_no_runtime_metric_issued' as const,
    upstreamAuthority: Object.freeze({
      fr86ReviewCompleted: true as const,
      correspondenceMethodAdmitted: false as const,
      correspondencePairsIssued: 0 as const,
      requestedFrontierMatches: true as const,
      requestedCandidateFunctionalsMatch: true as const,
    }),
    setModel: Object.freeze({
      sourceCoordinateFrame: 'pose_normalized_face_2d' as const,
      sourceCoordinateUnit: 'centimeter' as const,
      contourRepresentation: 'closed_piecewise_linear_boundary_through_governed_contour_vertices' as const,
      contourRoleRequirement: 'unordered_role_free_pair' as const,
      euclideanKernel: true as const,
      absoluteCoordinateDistanceMeansPhysicalSoftTissueMeasurement: false as const,
    }),
    candidates,
    feasibilityDecision: Object.freeze({
      researchNeutralFunctionalSpecificationsAdmitted: 2 as const,
      productionNeutralMetricDefinitionsIssued: 0 as const,
      runtimeMetricValuesIssued: 0 as const,
      correspondenceStillRequiredForThicknessInterpretation: true as const,
      preferredNextRuntimeFunctional: 'minimum_set_separation' as const,
      preferredReason: 'exact_finite_closed_polyline_segment_pair_minimum_requires_no_additional_semantic_pairing_policy' as const,
      hausdorffRuntimeDeferred: true as const,
      hausdorffDeferralReason: 'continuous_polyline_directed_maximum_algorithm_not_yet_governed_and_vertex_only_proxy_forbidden' as const,
    }),
    mathematicalDefinitions: Object.freeze({
      minimumSetSeparation: 'inf_{a_in_A,b_in_B} euclidean_distance(a,b)' as const,
      bidirectionalHausdorffDistance: 'max(sup_{a_in_A} inf_{b_in_B} d(a,b), sup_{b_in_B} inf_{a_in_A} d(a,b))' as const,
      compactClosedPolylinesAttainFiniteExtrema: true as const,
      minimumSetSeparationFiniteAlgorithm: 'minimum_over_all_closed_polyline_segment_pair_euclidean_distances' as const,
      discreteVertexHausdorffEqualsContinuousPolylineHausdorffGuaranteed: false as const,
    }),
    recommendedNextFrontier: Object.freeze({
      frontierKey: 'role_free_minimum_set_separation_runtime' as const,
      purpose: 'implement the exact continuous closed-polyline minimum boundary separation as neutral role-free geometry only' as const,
      requiresExplicitPointPairCorrespondence: false as const,
      requiresAnatomicalRoles: false as const,
      neutralMetricSemanticBindingAllowed: false as const,
      thicknessSemanticAssignmentAllowed: false as const,
      traditionalSemanticAssignmentAllowed: false as const,
    }),
    resolvedProcessGap: 'role_free_symmetric_cross_contour_distance_functional_not_reviewed' as const,
    newlyExposedPrerequisiteBlockers: NEWLY_EXPOSED,
    remainingBlockers: REMAINING_BLOCKERS,
    authorityBoundary: Object.freeze({
      symmetricSetDistanceMeansPointCorrespondence: false as const,
      minimumSetSeparationMeansLipThickness: false as const,
      hausdorffDistanceMeansLipThickness: false as const,
      continuousPolylineDistanceMeansPhysicalAnthropometry: false as const,
      researchFunctionalSpecificationMeansProductionMetric: false as const,
      minimumGapMeansRepresentativeBandWidth: false as const,
      hausdorffMeansRepresentativeBandWidth: false as const,
      setDistanceMeansTraditionalDuanHou: false as const,
      setDistanceMeansLipsSubstantialCriterionState: false as const,
    }),
    prohibitedShortcuts: PROHIBITED_SHORTCUTS,
    neutralMetricDefinitionsIssued: 0 as const,
    neutralMetricValuesIssued: 0 as const,
    anatomicalRolesIssued: 0 as const,
    crossContourCorrespondencePairsIssued: 0 as const,
    thicknessMetricIssued: false as const,
    morphologyProduced: false as const,
    criterionStatesIssued: 0 as const,
    claimsIssued: 0 as const,
    traditionalSemanticAuthority: false as const,
  });

  REVIEW_ISSUED.add(result);
  return result;
}

export function assertIssuedRoleFreeSymmetricSetDistanceFeasibilityReviewFR87(
  value: RoleFreeSymmetricSetDistanceFeasibilityReviewFR87V1,
): void {
  if (!REVIEW_ISSUED.has(value)) fail('review object was not issued by the governed FR-87 review path.');
  if (
    value.schemaVersion !== 'fr87-role-free-symmetric-set-distance-feasibility-review-v1' ||
    value.artifactVersion !== '0.1.0' ||
    value.authorityState !== 'role_free_symmetric_set_distance_feasibility_review_completed_no_runtime_metric_issued' ||
    value.candidates.length !== 2 ||
    value.candidates.some((item) => item.researchNeutralFunctionalSpecificationAdmitted !== true || item.runtimeValueIssuanceAdmitted !== false) ||
    value.feasibilityDecision.researchNeutralFunctionalSpecificationsAdmitted !== 2 ||
    value.feasibilityDecision.productionNeutralMetricDefinitionsIssued !== 0 ||
    value.feasibilityDecision.runtimeMetricValuesIssued !== 0 ||
    value.recommendedNextFrontier.frontierKey !== 'role_free_minimum_set_separation_runtime' ||
    value.neutralMetricDefinitionsIssued !== 0 ||
    value.neutralMetricValuesIssued !== 0 ||
    value.anatomicalRolesIssued !== 0 ||
    value.crossContourCorrespondencePairsIssued !== 0 ||
    value.thicknessMetricIssued !== false ||
    value.morphologyProduced !== false ||
    value.criterionStatesIssued !== 0 ||
    value.claimsIssued !== 0 ||
    value.traditionalSemanticAuthority !== false
  ) fail('issued review authority boundary drift.');
}
