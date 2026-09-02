import {
  assertIssuedNeutralLipBandGeometryFeasibilityReviewFR84,
  reviewNeutralLipBandGeometryFeasibilityFR84,
} from './neutral-lip-band-geometry-feasibility-review-fr84.js';
import { classifyRoleFreeClosedContourRelationFR85 } from './role-free-lips-contour-nesting-runtime-fr85.js';
import { FaceAuthorityValidationError } from './validation.js';

export type RoleFreeCorrespondenceMethodFR86V1 =
  | 'nearest_point_projection'
  | 'local_normal_projection'
  | 'radial_intersection'
  | 'normalized_arc_length_pairing';

export interface RoleFreeCorrespondenceCandidateFR86V1 {
  readonly method: RoleFreeCorrespondenceMethodFR86V1;
  readonly mathematicallyExpressible: true;
  readonly wellDefinedFromCurrentGovernedContract: boolean;
  readonly globallyUniquePairingGuaranteed: boolean;
  readonly oneToOnePairingGuaranteed: boolean;
  readonly symmetricPairingGuaranteed: boolean;
  readonly additionalPolicyRequirements: readonly string[];
  readonly currentAuthoritySuppliesAdditionalPolicy: false;
  readonly admitted: false;
  readonly rejectionReason:
    | 'nonunique_and_nonbijective_general_case'
    | 'curve_tangent_normal_and_intersection_policy_missing'
    | 'center_and_star_shapedness_authority_missing'
    | 'cross_cycle_start_anchor_and_orientation_alignment_missing';
}

export interface RoleFreeCrossContourCorrespondenceFeasibilityReviewFR86V1 {
  readonly schemaVersion: 'fr86-role-free-cross-contour-correspondence-feasibility-review-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'role_free_cross_contour_correspondence_feasibility_review_completed_no_method_admitted';
  readonly upstreamAuthority: {
    readonly fr84ReviewCompleted: true;
    readonly fr85RoleFreeNestingPredicateAvailable: true;
    readonly strictNestingCanIssueGeometricRoles: true;
    readonly geometricRolesAreAnatomicalRoles: false;
    readonly crossContourPointCorrespondenceAlreadyIssued: false;
    readonly thicknessMetricAlreadyIssued: false;
  };
  readonly candidates: readonly [
    RoleFreeCorrespondenceCandidateFR86V1,
    RoleFreeCorrespondenceCandidateFR86V1,
    RoleFreeCorrespondenceCandidateFR86V1,
    RoleFreeCorrespondenceCandidateFR86V1,
  ];
  readonly feasibilityDecision: {
    readonly correspondenceMethodAdmitted: false;
    readonly correspondencePairsIssued: 0;
    readonly reason: 'no_authority_preserving_unique_pairing_definition_available';
    readonly pointCorrespondenceRequiredBeforeThicknessInterpretation: true;
    readonly mathematicalDefinabilityAloneSufficientForAdmission: false;
  };
  readonly recommendedNextFrontier: {
    readonly frontierKey: 'role_free_symmetric_cross_contour_distance_functionals_feasibility_review';
    readonly purpose: 'review symmetric set-level cross-contour distance functionals that do not require anatomical roles or an explicit point-pair correspondence contract';
    readonly candidateFunctionals: readonly [
      'minimum_set_separation',
      'bidirectional_hausdorff_distance',
    ];
    readonly neutralMetricIssuanceAllowedAtThisStage: false;
    readonly anatomicalRoleAssignmentAllowed: false;
    readonly thicknessSemanticAssignmentAllowed: false;
    readonly traditionalSemanticAssignmentAllowed: false;
  };
  readonly resolvedProcessGap: 'role_free_cross_contour_correspondence_feasibility_not_reviewed';
  readonly newlyExposedPrerequisiteBlockers: readonly [
    'role_free_symmetric_cross_contour_distance_functional_not_reviewed',
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
    readonly nearestPointMeansAuthorizedCorrespondence: false;
    readonly normalProjectionMeansAuthorizedCorrespondence: false;
    readonly radialIntersectionMeansAuthorizedCorrespondence: false;
    readonly normalizedArcLengthMeansAuthorizedCorrespondence: false;
    readonly geometricEnclosingEnclosedRolesProvideCrossCyclePhaseAnchor: false;
    readonly setDistanceMeansLipThickness: false;
    readonly correspondenceFeasibilityReviewMeansMetricDefinition: false;
    readonly neutralGeometryMeansTraditionalDuanHou: false;
    readonly sourceConceptMeansNumericThreshold: false;
  };
  readonly prohibitedShortcuts: readonly [
    'nearest_point_to_lip_thickness',
    'polyline_normal_projection_to_lip_thickness',
    'arbitrary_center_radial_pairing_to_lip_thickness',
    'provider_cycle_index_to_cross_contour_correspondence',
    'normalized_arc_length_without_cross_cycle_anchor_to_correspondence',
    'geometric_enclosing_enclosed_to_anatomical_outer_inner',
    'set_distance_to_traditional_duan_hou_semantics',
    'neutral_geometry_to_lips_substantial_state',
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

const NEWLY_EXPOSED_PREREQUISITES = Object.freeze([
  'role_free_symmetric_cross_contour_distance_functional_not_reviewed',
] as const);

const PROHIBITED_SHORTCUTS = Object.freeze([
  'nearest_point_to_lip_thickness',
  'polyline_normal_projection_to_lip_thickness',
  'arbitrary_center_radial_pairing_to_lip_thickness',
  'provider_cycle_index_to_cross_contour_correspondence',
  'normalized_arc_length_without_cross_cycle_anchor_to_correspondence',
  'geometric_enclosing_enclosed_to_anatomical_outer_inner',
  'set_distance_to_traditional_duan_hou_semantics',
  'neutral_geometry_to_lips_substantial_state',
] as const);

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-86 ${message}`);
}

function validateUpstreamAuthority(): void {
  const fr84 = reviewNeutralLipBandGeometryFeasibilityFR84();
  assertIssuedNeutralLipBandGeometryFeasibilityReviewFR84(fr84);
  if (
    fr84.authorityState !== 'neutral_lip_band_geometry_feasibility_review_completed_no_thickness_metric_admitted' ||
    fr84.feasibilityReview.crossContourPointCorrespondenceAuthorized !== false ||
    fr84.feasibilityReview.neutralThicknessLikeMetricDefinitionAdmitted !== false ||
    !fr84.newlyExposedPrerequisiteBlockers.includes('role_free_cross_contour_correspondence_not_defined')
  ) fail('FR-84 correspondence/thickness authority drift.');

  const enclosing = {
    contourRef: 'fr86:synthetic-enclosing-cycle',
    points: Object.freeze([
      Object.freeze({ x: -2, y: -2 }),
      Object.freeze({ x: 2, y: -2 }),
      Object.freeze({ x: 2, y: 2 }),
      Object.freeze({ x: -2, y: 2 }),
    ]),
  } as const;
  const enclosed = {
    contourRef: 'fr86:synthetic-enclosed-cycle',
    points: Object.freeze([
      Object.freeze({ x: -1, y: -1 }),
      Object.freeze({ x: 1, y: -1 }),
      Object.freeze({ x: 1, y: 1 }),
      Object.freeze({ x: -1, y: 1 }),
    ]),
  } as const;
  const fr85 = classifyRoleFreeClosedContourRelationFR85(enclosing, enclosed);
  if (
    fr85.authorityState !== 'pure_coordinate_geometry_predicate_only_not_anatomical_or_traditional' ||
    fr85.relationState !== 'strictly_nested' ||
    fr85.strictNestingValidated !== true ||
    fr85.geometricRolesIssued !== 2 ||
    fr85.anatomicalRolesIssued !== 0 ||
    fr85.crossContourPointCorrespondenceIssued !== false ||
    fr85.thicknessMetricIssued !== false ||
    fr85.traditionalSemanticAuthority !== false
  ) fail('FR-85 role-free contour relation authority drift.');
}

function candidate(
  input: RoleFreeCorrespondenceCandidateFR86V1,
): RoleFreeCorrespondenceCandidateFR86V1 {
  return Object.freeze({
    ...input,
    additionalPolicyRequirements: Object.freeze([...input.additionalPolicyRequirements]),
  });
}

export function reviewRoleFreeCrossContourCorrespondenceFeasibilityFR86(): RoleFreeCrossContourCorrespondenceFeasibilityReviewFR86V1 {
  validateUpstreamAuthority();

  const candidates = Object.freeze([
    candidate({
      method: 'nearest_point_projection',
      mathematicallyExpressible: true,
      wellDefinedFromCurrentGovernedContract: true,
      globallyUniquePairingGuaranteed: false,
      oneToOnePairingGuaranteed: false,
      symmetricPairingGuaranteed: false,
      additionalPolicyRequirements: Object.freeze([
        'tie_resolution_policy',
        'directionality_or_bidirectional_aggregation_policy',
      ]),
      currentAuthoritySuppliesAdditionalPolicy: false,
      admitted: false,
      rejectionReason: 'nonunique_and_nonbijective_general_case',
    }),
    candidate({
      method: 'local_normal_projection',
      mathematicallyExpressible: true,
      wellDefinedFromCurrentGovernedContract: false,
      globallyUniquePairingGuaranteed: false,
      oneToOnePairingGuaranteed: false,
      symmetricPairingGuaranteed: false,
      additionalPolicyRequirements: Object.freeze([
        'curve_interpolation_policy',
        'vertex_tangent_normal_policy',
        'multiple_intersection_selection_policy',
      ]),
      currentAuthoritySuppliesAdditionalPolicy: false,
      admitted: false,
      rejectionReason: 'curve_tangent_normal_and_intersection_policy_missing',
    }),
    candidate({
      method: 'radial_intersection',
      mathematicallyExpressible: true,
      wellDefinedFromCurrentGovernedContract: false,
      globallyUniquePairingGuaranteed: false,
      oneToOnePairingGuaranteed: false,
      symmetricPairingGuaranteed: false,
      additionalPolicyRequirements: Object.freeze([
        'shared_center_definition',
        'star_shapedness_or_multi_intersection_selection_policy',
      ]),
      currentAuthoritySuppliesAdditionalPolicy: false,
      admitted: false,
      rejectionReason: 'center_and_star_shapedness_authority_missing',
    }),
    candidate({
      method: 'normalized_arc_length_pairing',
      mathematicallyExpressible: true,
      wellDefinedFromCurrentGovernedContract: false,
      globallyUniquePairingGuaranteed: false,
      oneToOnePairingGuaranteed: false,
      symmetricPairingGuaranteed: false,
      additionalPolicyRequirements: Object.freeze([
        'cross_cycle_start_anchor',
        'cross_cycle_orientation_alignment',
        'cycle_phase_invariance_policy',
      ]),
      currentAuthoritySuppliesAdditionalPolicy: false,
      admitted: false,
      rejectionReason: 'cross_cycle_start_anchor_and_orientation_alignment_missing',
    }),
  ] as const);

  const result: RoleFreeCrossContourCorrespondenceFeasibilityReviewFR86V1 = Object.freeze({
    schemaVersion: 'fr86-role-free-cross-contour-correspondence-feasibility-review-v1' as const,
    artifactVersion: '0.1.0' as const,
    authorityState: 'role_free_cross_contour_correspondence_feasibility_review_completed_no_method_admitted' as const,
    upstreamAuthority: Object.freeze({
      fr84ReviewCompleted: true as const,
      fr85RoleFreeNestingPredicateAvailable: true as const,
      strictNestingCanIssueGeometricRoles: true as const,
      geometricRolesAreAnatomicalRoles: false as const,
      crossContourPointCorrespondenceAlreadyIssued: false as const,
      thicknessMetricAlreadyIssued: false as const,
    }),
    candidates,
    feasibilityDecision: Object.freeze({
      correspondenceMethodAdmitted: false as const,
      correspondencePairsIssued: 0 as const,
      reason: 'no_authority_preserving_unique_pairing_definition_available' as const,
      pointCorrespondenceRequiredBeforeThicknessInterpretation: true as const,
      mathematicalDefinabilityAloneSufficientForAdmission: false as const,
    }),
    recommendedNextFrontier: Object.freeze({
      frontierKey: 'role_free_symmetric_cross_contour_distance_functionals_feasibility_review' as const,
      purpose: 'review symmetric set-level cross-contour distance functionals that do not require anatomical roles or an explicit point-pair correspondence contract' as const,
      candidateFunctionals: Object.freeze([
        'minimum_set_separation',
        'bidirectional_hausdorff_distance',
      ] as const),
      neutralMetricIssuanceAllowedAtThisStage: false as const,
      anatomicalRoleAssignmentAllowed: false as const,
      thicknessSemanticAssignmentAllowed: false as const,
      traditionalSemanticAssignmentAllowed: false as const,
    }),
    resolvedProcessGap: 'role_free_cross_contour_correspondence_feasibility_not_reviewed' as const,
    newlyExposedPrerequisiteBlockers: NEWLY_EXPOSED_PREREQUISITES,
    remainingBlockers: REMAINING_BLOCKERS,
    authorityBoundary: Object.freeze({
      nearestPointMeansAuthorizedCorrespondence: false as const,
      normalProjectionMeansAuthorizedCorrespondence: false as const,
      radialIntersectionMeansAuthorizedCorrespondence: false as const,
      normalizedArcLengthMeansAuthorizedCorrespondence: false as const,
      geometricEnclosingEnclosedRolesProvideCrossCyclePhaseAnchor: false as const,
      setDistanceMeansLipThickness: false as const,
      correspondenceFeasibilityReviewMeansMetricDefinition: false as const,
      neutralGeometryMeansTraditionalDuanHou: false as const,
      sourceConceptMeansNumericThreshold: false as const,
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

export function assertIssuedRoleFreeCrossContourCorrespondenceFeasibilityReviewFR86(
  value: RoleFreeCrossContourCorrespondenceFeasibilityReviewFR86V1,
): void {
  if (!REVIEW_ISSUED.has(value)) fail('review object was not issued by the governed FR-86 review path.');
  if (
    value.schemaVersion !== 'fr86-role-free-cross-contour-correspondence-feasibility-review-v1' ||
    value.artifactVersion !== '0.1.0' ||
    value.authorityState !== 'role_free_cross_contour_correspondence_feasibility_review_completed_no_method_admitted' ||
    value.candidates.length !== 4 ||
    value.candidates.some((item) => item.admitted !== false || item.currentAuthoritySuppliesAdditionalPolicy !== false) ||
    value.feasibilityDecision.correspondenceMethodAdmitted !== false ||
    value.feasibilityDecision.correspondencePairsIssued !== 0 ||
    value.recommendedNextFrontier.neutralMetricIssuanceAllowedAtThisStage !== false ||
    value.anatomicalRolesIssued !== 0 ||
    value.crossContourCorrespondencePairsIssued !== 0 ||
    value.thicknessMetricIssued !== false ||
    value.neutralMetricDefinitionsIssued !== 0 ||
    value.neutralMetricValuesIssued !== 0 ||
    value.morphologyProduced !== false ||
    value.criterionStatesIssued !== 0 ||
    value.claimsIssued !== 0 ||
    value.traditionalSemanticAuthority !== false
  ) fail('issued review authority boundary drift.');
}
