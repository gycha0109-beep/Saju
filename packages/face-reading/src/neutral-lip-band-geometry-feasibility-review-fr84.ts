import { assessGovernedMetricLipsSurfaceReadinessFR78 } from './governed-metric-lips-surface-fr78.js';
import { getPoseNormalizedLipsProjectionRuleFR79 } from './pose-normalized-lips-geometry-fr79.js';
import { getNeutralMouthContourMetricDefinitionFR80 } from './neutral-mouth-contour-metric-fr80.js';
import { getNeutralMouthRelativeSizeMetricDefinitionFR82 } from './neutral-mouth-relative-size-metric-fr82.js';
import {
  assertIssuedFiveOfficerSquareBroadCombinedMetricBindingFR83,
  reviewFiveOfficerSquareBroadCombinedMetricBindingFR83,
} from './five-officers-square-broad-combined-binding-review-fr83.js';
import { FaceAuthorityValidationError } from './validation.js';

const FR80_METRIC_REF = 'neutral.mouth.contour_set.bounding_box_aspect_ratio@0.1.0' as const;
const FR82_METRIC_REF = 'neutral.mouth.contour_set.horizontal_span_to_full_mesh_horizontal_span_ratio@0.1.0' as const;

export interface NeutralLipBandGeometryFeasibilityReviewFR84V1 {
  readonly schemaVersion: 'fr84-neutral-lip-band-geometry-feasibility-review-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'neutral_lip_band_geometry_feasibility_review_completed_no_thickness_metric_admitted';
  readonly sourceGeometry: {
    readonly providerReleaseCommit: 'f8ef212d5c962c0e853db7e59d217056b187084b';
    readonly providerTopologySymbol: 'FACE_LANDMARKS_LIPS';
    readonly connectedComponentCount: 2;
    readonly closedCycleComponentCount: 2;
    readonly componentPointCounts: readonly [20, 20];
    readonly componentRoleLabelsPublished: false;
    readonly poseNormalizedCoordinateFrame: 'pose_normalized_face_2d';
    readonly contourConsumptionState: 'unordered_set_no_outer_inner_role';
  };
  readonly existingRoleFreeNeutralMetrics: readonly [
    {
      readonly metricRef: typeof FR80_METRIC_REF;
      readonly role: 'union_contour_set_shape_ratio';
      readonly outerInnerRoleRequired: false;
      readonly traditionalBindingRef: null;
    },
    {
      readonly metricRef: typeof FR82_METRIC_REF;
      readonly role: 'union_contour_set_relative_horizontal_size';
      readonly outerInnerRoleRequired: false;
      readonly traditionalBindingRef: null;
    },
  ];
  readonly feasibilityReview: {
    readonly unorderedContourSetGeometryAvailable: true;
    readonly perComponentClosedCycleGeometryAvailable: true;
    readonly componentLocalAreaOrPerimeterMathematicallyDefinable: true;
    readonly crossComponentDistanceMathematicallyDefinable: true;
    readonly perSampleNestingRelationMathematicallyTestable: true;
    readonly providerTopologyAloneAuthorizesNestingRelation: false;
    readonly crossContourPointCorrespondenceAuthorized: false;
    readonly outerInnerAnatomicalRolesAuthorized: false;
    readonly geometricEnclosingEnclosedRolesAuthorized: false;
    readonly lipBandAreaAuthorized: false;
    readonly neutralThicknessLikeMetricDefinitionAdmitted: false;
    readonly traditionalSubstantialThicknessSemanticsOperationalized: false;
    readonly reviewDecision: 'prerequisite_geometry_only_more_validation_required';
  };
  readonly recommendedNextFrontier: {
    readonly frontierKey: 'role_free_per_sample_contour_nesting_and_nonintersection_validation';
    readonly purpose: 'determine whether the two unordered pose-normalized contour cycles admit stable geometric enclosing/enclosed roles without anatomical naming';
    readonly anatomicalRoleAssignmentAllowed: false;
    readonly traditionalSemanticAssignmentAllowed: false;
    readonly thicknessMetricIssuanceAllowed: false;
  };
  readonly resolvedProcessGap: 'lips_substantial_neutral_geometry_feasibility_not_reviewed';
  readonly newlyExposedPrerequisiteBlockers: readonly [
    'role_free_contour_nesting_not_validated',
    'role_free_cross_contour_correspondence_not_defined',
  ];
  readonly remainingBlockers: readonly [
    'fr15_mouth_consumer_slot_not_issued',
    'five_officers_source_not_scan_checked',
    'five_officers_methodology_research_only',
    'outer_inner_lip_roles_not_authorized',
    'lips_substantial_thickness_metric_not_defined',
    'lips_substantial_calibration_evidence_absent',
    'lips_substantial_calibration_protocol_absent',
    'lips_substantial_threshold_not_calibrated',
  ];
  readonly authorityBoundary: {
    readonly mathematicalDistanceMeansLipThickness: false;
    readonly componentAreaDifferenceMeansLipBandArea: false;
    readonly geometricNestingMeansOuterInnerAnatomy: false;
    readonly geometricEnclosingEnclosedMeansOuterInnerAnatomy: false;
    readonly providerClosedCyclesMeanNesting: false;
    readonly providerComponentOrderMeansSemanticRole: false;
    readonly feasibilityReviewMeansMetricDefinition: false;
    readonly neutralGeometryMeansTraditionalDuanHou: false;
    readonly sourceConceptMeansNumericThreshold: false;
  };
  readonly prohibitedShortcuts: readonly [
    'unordered_contours_to_outer_inner_anatomy',
    'provider_component_order_to_outer_inner_anatomy',
    'two_closed_cycles_to_assumed_contour_nesting',
    'cross_component_distance_to_lip_thickness',
    'component_area_difference_to_lip_band_area_without_nesting',
    'geometric_enclosing_enclosed_to_anatomical_outer_inner',
    'neutral_geometry_to_traditional_duan_hou_semantics',
    'neutral_geometry_to_lips_substantial_state',
    'research_source_text_to_thickness_threshold',
  ];
  readonly neutralMetricDefinitionsIssued: 0;
  readonly neutralMetricValuesIssued: 0;
  readonly anatomicalRolesIssued: 0;
  readonly morphologyProduced: false;
  readonly criterionStatesIssued: 0;
  readonly claimsIssued: 0;
  readonly traditionalSemanticAuthority: false;
}

const REMAINING_BLOCKERS = Object.freeze([
  'fr15_mouth_consumer_slot_not_issued',
  'five_officers_source_not_scan_checked',
  'five_officers_methodology_research_only',
  'outer_inner_lip_roles_not_authorized',
  'lips_substantial_thickness_metric_not_defined',
  'lips_substantial_calibration_evidence_absent',
  'lips_substantial_calibration_protocol_absent',
  'lips_substantial_threshold_not_calibrated',
] as const);

const NEWLY_EXPOSED_PREREQUISITES = Object.freeze([
  'role_free_contour_nesting_not_validated',
  'role_free_cross_contour_correspondence_not_defined',
] as const);

const PROHIBITED_SHORTCUTS = Object.freeze([
  'unordered_contours_to_outer_inner_anatomy',
  'provider_component_order_to_outer_inner_anatomy',
  'two_closed_cycles_to_assumed_contour_nesting',
  'cross_component_distance_to_lip_thickness',
  'component_area_difference_to_lip_band_area_without_nesting',
  'geometric_enclosing_enclosed_to_anatomical_outer_inner',
  'neutral_geometry_to_traditional_duan_hou_semantics',
  'neutral_geometry_to_lips_substantial_state',
  'research_source_text_to_thickness_threshold',
] as const);

const REVIEW_ISSUED = new WeakSet<object>();

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-84 ${message}`);
}

function sameSequence<T>(actual: readonly T[], expected: readonly T[]): boolean {
  return actual.length === expected.length && actual.every((value, index) => value === expected[index]);
}

function validateUpstreamAuthority(): void {
  const fr78 = assessGovernedMetricLipsSurfaceReadinessFR78();
  if (
    fr78.authorityState !== 'release_exact_metric_lips_projection_ready' ||
    fr78.sourceWitness.releaseCommit !== 'f8ef212d5c962c0e853db7e59d217056b187084b' ||
    fr78.sourceWitness.sourceSymbol !== 'FACE_LANDMARKS_LIPS' ||
    fr78.sourceWitness.connectedComponentCount !== 2 ||
    fr78.sourceWitness.closedCycleComponentCount !== 2 ||
    fr78.sourceWitness.componentRoleLabelsPublished !== false ||
    fr78.contourCount !== 2 ||
    fr78.contourPointCounts[0] !== 20 ||
    fr78.contourPointCounts[1] !== 20 ||
    fr78.outerInnerAnatomicalAssignmentAllowed !== false ||
    fr78.providerComponentOrderSemanticUseAllowed !== false
  ) fail('FR-78 release-exact unordered lips topology authority drift.');

  const fr79 = getPoseNormalizedLipsProjectionRuleFR79();
  if (
    fr79.authorityState !== 'reviewed_neutral_orthographic_projection_rule' ||
    fr79.targetCoordinateFrame !== 'pose_normalized_face_2d' ||
    fr79.projectionKind !== 'canonical_frontal_orthographic_xy' ||
    fr79.recenteringApplied !== false ||
    fr79.rescalingApplied !== false ||
    fr79.poseCompensated !== true ||
    fr79.semanticAuthority !== false
  ) fail('FR-79 pose-normalized neutral projection authority drift.');

  const fr80 = getNeutralMouthContourMetricDefinitionFR80();
  if (
    fr80.metricRef !== FR80_METRIC_REF ||
    fr80.requiredGeometry !== 'two_unordered_pose_normalized_lips_contours' ||
    fr80.outerInnerAnatomicalRoleRequired !== false ||
    fr80.providerComponentOrderRequired !== false ||
    fr80.physicalAnthropometricInterpretationAllowed !== false ||
    fr80.traditionalCriterionBindingRef !== null ||
    fr80.calibrationRef !== null
  ) fail('FR-80 role-free neutral contour metric authority drift.');

  const fr82 = getNeutralMouthRelativeSizeMetricDefinitionFR82();
  if (
    fr82.metricRef !== FR82_METRIC_REF ||
    fr82.outerInnerAnatomicalRoleRequired !== false ||
    fr82.faceWidthAnatomicalRoleAssigned !== false ||
    fr82.physicalAnthropometricInterpretationAllowed !== false ||
    fr82.traditionalCriterionBindingRef !== null ||
    fr82.calibrationRef !== null
  ) fail('FR-82 role-free neutral relative-size authority drift.');

  const fr83 = reviewFiveOfficerSquareBroadCombinedMetricBindingFR83();
  assertIssuedFiveOfficerSquareBroadCombinedMetricBindingFR83(fr83);
  if (
    fr83.combinedReview.bindingDecision !== 'not_admitted' ||
    fr83.combinedReview.traditionalMetricBindingRef !== null ||
    fr83.combinedReview.calibrationRef !== null ||
    fr83.combinedReview.thresholdRef !== null ||
    fr83.combinedReview.automaticCriterionStateAuthorized !== false ||
    !fr83.remainingBlockers.includes('outer_inner_lip_roles_not_authorized') ||
    !fr83.remainingBlockers.includes('lips_substantial_thickness_metric_not_defined') ||
    !fr83.remainingBlockers.includes('five_officers_source_not_scan_checked')
  ) fail('FR-83 mouth semantic/calibration blockers drift.');
}

export function reviewNeutralLipBandGeometryFeasibilityFR84(): NeutralLipBandGeometryFeasibilityReviewFR84V1 {
  validateUpstreamAuthority();

  const result: NeutralLipBandGeometryFeasibilityReviewFR84V1 = Object.freeze({
    schemaVersion: 'fr84-neutral-lip-band-geometry-feasibility-review-v1' as const,
    artifactVersion: '0.1.0' as const,
    authorityState: 'neutral_lip_band_geometry_feasibility_review_completed_no_thickness_metric_admitted' as const,
    sourceGeometry: Object.freeze({
      providerReleaseCommit: 'f8ef212d5c962c0e853db7e59d217056b187084b' as const,
      providerTopologySymbol: 'FACE_LANDMARKS_LIPS' as const,
      connectedComponentCount: 2 as const,
      closedCycleComponentCount: 2 as const,
      componentPointCounts: Object.freeze([20, 20] as const),
      componentRoleLabelsPublished: false as const,
      poseNormalizedCoordinateFrame: 'pose_normalized_face_2d' as const,
      contourConsumptionState: 'unordered_set_no_outer_inner_role' as const,
    }),
    existingRoleFreeNeutralMetrics: Object.freeze([
      Object.freeze({
        metricRef: FR80_METRIC_REF,
        role: 'union_contour_set_shape_ratio' as const,
        outerInnerRoleRequired: false as const,
        traditionalBindingRef: null,
      }),
      Object.freeze({
        metricRef: FR82_METRIC_REF,
        role: 'union_contour_set_relative_horizontal_size' as const,
        outerInnerRoleRequired: false as const,
        traditionalBindingRef: null,
      }),
    ] as const),
    feasibilityReview: Object.freeze({
      unorderedContourSetGeometryAvailable: true as const,
      perComponentClosedCycleGeometryAvailable: true as const,
      componentLocalAreaOrPerimeterMathematicallyDefinable: true as const,
      crossComponentDistanceMathematicallyDefinable: true as const,
      perSampleNestingRelationMathematicallyTestable: true as const,
      providerTopologyAloneAuthorizesNestingRelation: false as const,
      crossContourPointCorrespondenceAuthorized: false as const,
      outerInnerAnatomicalRolesAuthorized: false as const,
      geometricEnclosingEnclosedRolesAuthorized: false as const,
      lipBandAreaAuthorized: false as const,
      neutralThicknessLikeMetricDefinitionAdmitted: false as const,
      traditionalSubstantialThicknessSemanticsOperationalized: false as const,
      reviewDecision: 'prerequisite_geometry_only_more_validation_required' as const,
    }),
    recommendedNextFrontier: Object.freeze({
      frontierKey: 'role_free_per_sample_contour_nesting_and_nonintersection_validation' as const,
      purpose: 'determine whether the two unordered pose-normalized contour cycles admit stable geometric enclosing/enclosed roles without anatomical naming' as const,
      anatomicalRoleAssignmentAllowed: false as const,
      traditionalSemanticAssignmentAllowed: false as const,
      thicknessMetricIssuanceAllowed: false as const,
    }),
    resolvedProcessGap: 'lips_substantial_neutral_geometry_feasibility_not_reviewed' as const,
    newlyExposedPrerequisiteBlockers: NEWLY_EXPOSED_PREREQUISITES,
    remainingBlockers: REMAINING_BLOCKERS,
    authorityBoundary: Object.freeze({
      mathematicalDistanceMeansLipThickness: false as const,
      componentAreaDifferenceMeansLipBandArea: false as const,
      geometricNestingMeansOuterInnerAnatomy: false as const,
      geometricEnclosingEnclosedMeansOuterInnerAnatomy: false as const,
      providerClosedCyclesMeanNesting: false as const,
      providerComponentOrderMeansSemanticRole: false as const,
      feasibilityReviewMeansMetricDefinition: false as const,
      neutralGeometryMeansTraditionalDuanHou: false as const,
      sourceConceptMeansNumericThreshold: false as const,
    }),
    prohibitedShortcuts: PROHIBITED_SHORTCUTS,
    neutralMetricDefinitionsIssued: 0 as const,
    neutralMetricValuesIssued: 0 as const,
    anatomicalRolesIssued: 0 as const,
    morphologyProduced: false as const,
    criterionStatesIssued: 0 as const,
    claimsIssued: 0 as const,
    traditionalSemanticAuthority: false as const,
  });

  REVIEW_ISSUED.add(result);
  return result;
}

export function assertIssuedNeutralLipBandGeometryFeasibilityReviewFR84(
  review: NeutralLipBandGeometryFeasibilityReviewFR84V1,
): void {
  if (!REVIEW_ISSUED.has(review)) fail('neutral lip-band geometry feasibility review was not issued by the active FR-84 boundary.');
  if (
    review.schemaVersion !== 'fr84-neutral-lip-band-geometry-feasibility-review-v1' ||
    review.artifactVersion !== '0.1.0' ||
    review.authorityState !== 'neutral_lip_band_geometry_feasibility_review_completed_no_thickness_metric_admitted' ||
    review.sourceGeometry.connectedComponentCount !== 2 ||
    review.sourceGeometry.closedCycleComponentCount !== 2 ||
    review.sourceGeometry.componentRoleLabelsPublished !== false ||
    review.sourceGeometry.contourConsumptionState !== 'unordered_set_no_outer_inner_role' ||
    review.existingRoleFreeNeutralMetrics.length !== 2 ||
    review.existingRoleFreeNeutralMetrics[0].metricRef !== FR80_METRIC_REF ||
    review.existingRoleFreeNeutralMetrics[1].metricRef !== FR82_METRIC_REF ||
    review.feasibilityReview.providerTopologyAloneAuthorizesNestingRelation !== false ||
    review.feasibilityReview.crossContourPointCorrespondenceAuthorized !== false ||
    review.feasibilityReview.outerInnerAnatomicalRolesAuthorized !== false ||
    review.feasibilityReview.geometricEnclosingEnclosedRolesAuthorized !== false ||
    review.feasibilityReview.neutralThicknessLikeMetricDefinitionAdmitted !== false ||
    review.feasibilityReview.traditionalSubstantialThicknessSemanticsOperationalized !== false ||
    review.recommendedNextFrontier.frontierKey !== 'role_free_per_sample_contour_nesting_and_nonintersection_validation' ||
    review.recommendedNextFrontier.anatomicalRoleAssignmentAllowed !== false ||
    review.recommendedNextFrontier.traditionalSemanticAssignmentAllowed !== false ||
    review.recommendedNextFrontier.thicknessMetricIssuanceAllowed !== false ||
    review.resolvedProcessGap !== 'lips_substantial_neutral_geometry_feasibility_not_reviewed' ||
    !sameSequence(review.newlyExposedPrerequisiteBlockers, NEWLY_EXPOSED_PREREQUISITES) ||
    !sameSequence(review.remainingBlockers, REMAINING_BLOCKERS) ||
    !sameSequence(review.prohibitedShortcuts, PROHIBITED_SHORTCUTS) ||
    review.neutralMetricDefinitionsIssued !== 0 ||
    review.neutralMetricValuesIssued !== 0 ||
    review.anatomicalRolesIssued !== 0 ||
    review.morphologyProduced !== false ||
    review.criterionStatesIssued !== 0 ||
    review.claimsIssued !== 0 ||
    review.traditionalSemanticAuthority !== false
  ) fail('FR-84 feasibility review authority drift.');
}
