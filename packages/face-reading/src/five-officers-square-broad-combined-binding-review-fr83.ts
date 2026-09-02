import {
  assertIssuedFiveOfficerMouthMetricBindingReviewFR81,
  reviewFiveOfficerMouthMetricBindingsFR81,
} from './five-officers-mouth-metric-binding-review-fr81.js';
import { getNeutralMouthContourMetricDefinitionFR80 } from './neutral-mouth-contour-metric-fr80.js';
import { getNeutralMouthRelativeSizeMetricDefinitionFR82 } from './neutral-mouth-relative-size-metric-fr82.js';
import { FaceAuthorityValidationError } from './validation.js';

const FR80_METRIC_REF = 'neutral.mouth.contour_set.bounding_box_aspect_ratio@0.1.0' as const;
const FR82_METRIC_REF = 'neutral.mouth.contour_set.horizontal_span_to_full_mesh_horizontal_span_ratio@0.1.0' as const;
const SQUARE_BROAD_CRITERION_ID = 'criterion.intake.square_broad' as const;

export interface FiveOfficerSquareBroadCombinedBindingReviewFR83V1 {
  readonly schemaVersion: 'fr83-five-officers-square-broad-combined-binding-review-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'combined_neutral_metric_binding_review_completed_no_traditional_binding_admitted';
  readonly traditionalTarget: {
    readonly criterionId: typeof SQUARE_BROAD_CRITERION_ID;
    readonly sourceConcept: '方大';
    readonly traditionalOfficerName: '出納官';
    readonly anatomicalTarget: 'mouth';
    readonly modality: 'static_geometry';
    readonly staticV1Eligible: true;
    readonly sourcePassageId: 'passage.shenxiang.five_officers.intake';
    readonly sourceVerificationStatus: 'unverified_ocr';
    readonly methodologyRef: 'method.shenxiang.five_officers@0.1.0';
    readonly methodologyReviewStatus: 'research';
  };
  readonly upstreamReview: {
    readonly schemaVersion: 'fr81-five-officers-mouth-metric-binding-review-v1';
    readonly authorityState: 'traditional_metric_binding_review_completed_no_binding_admitted';
    readonly traditionalMetricBindingsIssued: 0;
    readonly calibrationRefsIssued: 0;
    readonly thresholdRefsIssued: 0;
  };
  readonly candidateNeutralMetrics: readonly [
    {
      readonly metricRef: typeof FR80_METRIC_REF;
      readonly neutralObservationRole: 'unordered_contour_set_shape_ratio';
      readonly sourceConceptRelation: 'candidate_shape_observation_not_traditional_fang_semantics';
      readonly unit: 'ratio';
      readonly traditionalCriterionBindingRef: null;
      readonly calibrationRef: null;
    },
    {
      readonly metricRef: typeof FR82_METRIC_REF;
      readonly neutralObservationRole: 'mouth_span_relative_to_full_468_mesh_span';
      readonly sourceConceptRelation: 'candidate_relative_size_observation_not_traditional_da_semantics';
      readonly unit: 'ratio';
      readonly denominatorAnatomicalRole: null;
      readonly traditionalCriterionBindingRef: null;
      readonly calibrationRef: null;
    },
  ];
  readonly combinedReview: {
    readonly combinedMetricBindingReviewCompleted: true;
    readonly candidateNeutralMetricCount: 2;
    readonly shapeObservationAvailable: true;
    readonly relativeSizeObservationAvailable: true;
    readonly traditionalFangSemanticsOperationalized: false;
    readonly traditionalDaSemanticsOperationalized: false;
    readonly compoundFangDaOperationalized: false;
    readonly traditionalMetricBindingRef: null;
    readonly calibrationRef: null;
    readonly thresholdRef: null;
    readonly automaticCriterionStateAuthorized: false;
    readonly bindingDecision: 'not_admitted';
  };
  readonly resolvedBlockers: readonly ['square_broad_combined_metric_binding_not_reviewed'];
  readonly remainingBlockers: readonly [
    'fr15_mouth_consumer_slot_not_issued',
    'five_officers_source_not_scan_checked',
    'five_officers_methodology_research_only',
    'square_broad_metric_to_source_concept_mapping_not_authorized',
    'square_broad_calibration_evidence_absent',
    'square_broad_calibration_protocol_absent',
    'square_broad_threshold_not_calibrated',
    'outer_inner_lip_roles_not_authorized',
    'lips_substantial_thickness_metric_not_defined',
    'lips_substantial_calibration_evidence_absent',
    'lips_substantial_calibration_protocol_absent',
    'lips_substantial_threshold_not_calibrated',
    'capture_sensitive_intake_criteria_not_authorized',
    'dynamic_lip_color_not_authorized',
  ];
  readonly authorityBoundary: {
    readonly twoNeutralMetricsMeanTraditionalBinding: false;
    readonly aspectRatioMeansTraditionalFang: false;
    readonly relativeMeshSpanMeansTraditionalDa: false;
    readonly fullMeshSpanMeansAnatomicalFaceWidth: false;
    readonly neutralMetricsMeanCompoundFangDa: false;
    readonly reviewCompletionMeansOperationalization: false;
    readonly researchSourceMeansProductionAuthority: false;
    readonly unverifiedOcrMeansScanCheckedSource: false;
    readonly candidateMetricPairMeansCalibrationEvidence: false;
    readonly metricValueMeansCriterionState: false;
  };
  readonly prohibitedShortcuts: readonly [
    'fr80_aspect_ratio_to_traditional_fang_semantics',
    'fr82_relative_mesh_span_to_traditional_da_semantics',
    'fr80_plus_fr82_to_square_broad_binding',
    'fr80_plus_fr82_values_to_square_broad_state',
    'full_468_landmark_mesh_span_to_anatomical_face_width',
    'combined_binding_review_to_operationalized_methodology',
    'research_source_text_to_production_metric_binding',
    'uncalibrated_metric_pair_to_threshold',
    'static_v1_eligible_to_automatic_criterion_state',
  ];
  readonly morphologyProduced: false;
  readonly criterionStatesIssued: 0;
  readonly claimsIssued: 0;
  readonly traditionalFormationAuthorized: false;
  readonly traditionalSemanticAuthority: false;
}

const RESOLVED_BLOCKERS = Object.freeze([
  'square_broad_combined_metric_binding_not_reviewed',
] as const);

const REMAINING_BLOCKERS = Object.freeze([
  'fr15_mouth_consumer_slot_not_issued',
  'five_officers_source_not_scan_checked',
  'five_officers_methodology_research_only',
  'square_broad_metric_to_source_concept_mapping_not_authorized',
  'square_broad_calibration_evidence_absent',
  'square_broad_calibration_protocol_absent',
  'square_broad_threshold_not_calibrated',
  'outer_inner_lip_roles_not_authorized',
  'lips_substantial_thickness_metric_not_defined',
  'lips_substantial_calibration_evidence_absent',
  'lips_substantial_calibration_protocol_absent',
  'lips_substantial_threshold_not_calibrated',
  'capture_sensitive_intake_criteria_not_authorized',
  'dynamic_lip_color_not_authorized',
] as const);

const PROHIBITED_SHORTCUTS = Object.freeze([
  'fr80_aspect_ratio_to_traditional_fang_semantics',
  'fr82_relative_mesh_span_to_traditional_da_semantics',
  'fr80_plus_fr82_to_square_broad_binding',
  'fr80_plus_fr82_values_to_square_broad_state',
  'full_468_landmark_mesh_span_to_anatomical_face_width',
  'combined_binding_review_to_operationalized_methodology',
  'research_source_text_to_production_metric_binding',
  'uncalibrated_metric_pair_to_threshold',
  'static_v1_eligible_to_automatic_criterion_state',
] as const);

const REVIEW_ISSUED = new WeakSet<object>();

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-83 ${message}`);
}

function sameSequence<T>(actual: readonly T[], expected: readonly T[]): boolean {
  return actual.length === expected.length && actual.every((value, index) => value === expected[index]);
}

function validateUpstreamAuthority(): void {
  const fr81 = reviewFiveOfficerMouthMetricBindingsFR81();
  assertIssuedFiveOfficerMouthMetricBindingReviewFR81(fr81);
  const squareBroad = fr81.criterionReviews.find((item) => item.criterionId === SQUARE_BROAD_CRITERION_ID);
  if (
    fr81.traditionalSource.passageId !== 'passage.shenxiang.five_officers.intake' ||
    fr81.traditionalSource.verificationStatus !== 'unverified_ocr' ||
    fr81.traditionalSource.methodologyRef !== 'method.shenxiang.five_officers@0.1.0' ||
    fr81.traditionalSource.methodologyReviewStatus !== 'research' ||
    fr81.bindingSummary.traditionalMetricBindingsIssued !== 0 ||
    fr81.bindingSummary.calibrationRefsIssued !== 0 ||
    fr81.bindingSummary.thresholdRefsIssued !== 0 ||
    squareBroad === undefined ||
    squareBroad.sourceConcept !== '方大' ||
    squareBroad.modality !== 'static_geometry' ||
    squareBroad.staticV1Eligible !== true ||
    squareBroad.traditionalMetricBindingRef !== null ||
    squareBroad.calibrationRef !== null ||
    squareBroad.thresholdRef !== null ||
    squareBroad.automaticCriterionStateAuthorized !== false ||
    squareBroad.bindingDecision !== 'not_admitted'
  ) fail('FR-81 mouth binding review authority drift.');

  const fr80 = getNeutralMouthContourMetricDefinitionFR80();
  if (
    fr80.metricRef !== FR80_METRIC_REF ||
    fr80.unit !== 'ratio' ||
    fr80.coordinateFrame !== 'pose_normalized_face_2d' ||
    fr80.traditionalCriterionBindingRef !== null ||
    fr80.calibrationRef !== null ||
    fr80.physicalAnthropometricInterpretationAllowed !== false
  ) fail('FR-80 shape metric definition authority drift.');

  const fr82 = getNeutralMouthRelativeSizeMetricDefinitionFR82();
  if (
    fr82.metricRef !== FR82_METRIC_REF ||
    fr82.unit !== 'ratio' ||
    fr82.comparisonAxis !== 'shared_canonical_metric_x' ||
    fr82.fullMeshLandmarkCount !== 468 ||
    fr82.faceOvalTopologyRequired !== false ||
    fr82.faceWidthAnatomicalRoleAssigned !== false ||
    fr82.physicalAnthropometricInterpretationAllowed !== false ||
    fr82.traditionalCriterionBindingRef !== null ||
    fr82.calibrationRef !== null
  ) fail('FR-82 relative-size metric definition authority drift.');
}

export function reviewFiveOfficerSquareBroadCombinedMetricBindingFR83(): FiveOfficerSquareBroadCombinedBindingReviewFR83V1 {
  validateUpstreamAuthority();
  const result: FiveOfficerSquareBroadCombinedBindingReviewFR83V1 = Object.freeze({
    schemaVersion: 'fr83-five-officers-square-broad-combined-binding-review-v1' as const,
    artifactVersion: '0.1.0' as const,
    authorityState: 'combined_neutral_metric_binding_review_completed_no_traditional_binding_admitted' as const,
    traditionalTarget: Object.freeze({
      criterionId: SQUARE_BROAD_CRITERION_ID,
      sourceConcept: '方大' as const,
      traditionalOfficerName: '出納官' as const,
      anatomicalTarget: 'mouth' as const,
      modality: 'static_geometry' as const,
      staticV1Eligible: true as const,
      sourcePassageId: 'passage.shenxiang.five_officers.intake' as const,
      sourceVerificationStatus: 'unverified_ocr' as const,
      methodologyRef: 'method.shenxiang.five_officers@0.1.0' as const,
      methodologyReviewStatus: 'research' as const,
    }),
    upstreamReview: Object.freeze({
      schemaVersion: 'fr81-five-officers-mouth-metric-binding-review-v1' as const,
      authorityState: 'traditional_metric_binding_review_completed_no_binding_admitted' as const,
      traditionalMetricBindingsIssued: 0 as const,
      calibrationRefsIssued: 0 as const,
      thresholdRefsIssued: 0 as const,
    }),
    candidateNeutralMetrics: Object.freeze([
      Object.freeze({
        metricRef: FR80_METRIC_REF,
        neutralObservationRole: 'unordered_contour_set_shape_ratio' as const,
        sourceConceptRelation: 'candidate_shape_observation_not_traditional_fang_semantics' as const,
        unit: 'ratio' as const,
        traditionalCriterionBindingRef: null,
        calibrationRef: null,
      }),
      Object.freeze({
        metricRef: FR82_METRIC_REF,
        neutralObservationRole: 'mouth_span_relative_to_full_468_mesh_span' as const,
        sourceConceptRelation: 'candidate_relative_size_observation_not_traditional_da_semantics' as const,
        unit: 'ratio' as const,
        denominatorAnatomicalRole: null,
        traditionalCriterionBindingRef: null,
        calibrationRef: null,
      }),
    ] as const),
    combinedReview: Object.freeze({
      combinedMetricBindingReviewCompleted: true as const,
      candidateNeutralMetricCount: 2 as const,
      shapeObservationAvailable: true as const,
      relativeSizeObservationAvailable: true as const,
      traditionalFangSemanticsOperationalized: false as const,
      traditionalDaSemanticsOperationalized: false as const,
      compoundFangDaOperationalized: false as const,
      traditionalMetricBindingRef: null,
      calibrationRef: null,
      thresholdRef: null,
      automaticCriterionStateAuthorized: false as const,
      bindingDecision: 'not_admitted' as const,
    }),
    resolvedBlockers: RESOLVED_BLOCKERS,
    remainingBlockers: REMAINING_BLOCKERS,
    authorityBoundary: Object.freeze({
      twoNeutralMetricsMeanTraditionalBinding: false as const,
      aspectRatioMeansTraditionalFang: false as const,
      relativeMeshSpanMeansTraditionalDa: false as const,
      fullMeshSpanMeansAnatomicalFaceWidth: false as const,
      neutralMetricsMeanCompoundFangDa: false as const,
      reviewCompletionMeansOperationalization: false as const,
      researchSourceMeansProductionAuthority: false as const,
      unverifiedOcrMeansScanCheckedSource: false as const,
      candidateMetricPairMeansCalibrationEvidence: false as const,
      metricValueMeansCriterionState: false as const,
    }),
    prohibitedShortcuts: PROHIBITED_SHORTCUTS,
    morphologyProduced: false as const,
    criterionStatesIssued: 0 as const,
    claimsIssued: 0 as const,
    traditionalFormationAuthorized: false as const,
    traditionalSemanticAuthority: false as const,
  });
  REVIEW_ISSUED.add(result);
  return result;
}

export function assertIssuedFiveOfficerSquareBroadCombinedMetricBindingFR83(
  review: FiveOfficerSquareBroadCombinedBindingReviewFR83V1,
): void {
  if (!REVIEW_ISSUED.has(review)) fail('combined square-broad binding review was not issued by the active FR-83 boundary.');
  if (
    review.schemaVersion !== 'fr83-five-officers-square-broad-combined-binding-review-v1' ||
    review.artifactVersion !== '0.1.0' ||
    review.authorityState !== 'combined_neutral_metric_binding_review_completed_no_traditional_binding_admitted' ||
    review.traditionalTarget.criterionId !== SQUARE_BROAD_CRITERION_ID ||
    review.traditionalTarget.sourceConcept !== '方大' ||
    review.traditionalTarget.sourceVerificationStatus !== 'unverified_ocr' ||
    review.traditionalTarget.methodologyReviewStatus !== 'research' ||
    review.candidateNeutralMetrics.length !== 2 ||
    review.candidateNeutralMetrics[0].metricRef !== FR80_METRIC_REF ||
    review.candidateNeutralMetrics[1].metricRef !== FR82_METRIC_REF ||
    review.candidateNeutralMetrics[1].denominatorAnatomicalRole !== null ||
    review.combinedReview.combinedMetricBindingReviewCompleted !== true ||
    review.combinedReview.candidateNeutralMetricCount !== 2 ||
    review.combinedReview.traditionalFangSemanticsOperationalized !== false ||
    review.combinedReview.traditionalDaSemanticsOperationalized !== false ||
    review.combinedReview.compoundFangDaOperationalized !== false ||
    review.combinedReview.traditionalMetricBindingRef !== null ||
    review.combinedReview.calibrationRef !== null ||
    review.combinedReview.thresholdRef !== null ||
    review.combinedReview.automaticCriterionStateAuthorized !== false ||
    review.combinedReview.bindingDecision !== 'not_admitted' ||
    review.morphologyProduced !== false ||
    review.criterionStatesIssued !== 0 ||
    review.claimsIssued !== 0 ||
    review.traditionalFormationAuthorized !== false ||
    review.traditionalSemanticAuthority !== false
  ) fail('issued FR-83 combined binding review authority widened or identity drifted.');
  if (!sameSequence(review.resolvedBlockers, RESOLVED_BLOCKERS)) fail('issued FR-83 resolved blocker drift.');
  if (!sameSequence(review.remainingBlockers, REMAINING_BLOCKERS)) fail('issued FR-83 remaining blocker drift.');
  if (!sameSequence(review.prohibitedShortcuts, PROHIBITED_SHORTCUTS)) fail('issued FR-83 prohibited-shortcut drift.');
  if (
    review.authorityBoundary.twoNeutralMetricsMeanTraditionalBinding !== false ||
    review.authorityBoundary.aspectRatioMeansTraditionalFang !== false ||
    review.authorityBoundary.relativeMeshSpanMeansTraditionalDa !== false ||
    review.authorityBoundary.fullMeshSpanMeansAnatomicalFaceWidth !== false ||
    review.authorityBoundary.neutralMetricsMeanCompoundFangDa !== false ||
    review.authorityBoundary.reviewCompletionMeansOperationalization !== false ||
    review.authorityBoundary.researchSourceMeansProductionAuthority !== false ||
    review.authorityBoundary.unverifiedOcrMeansScanCheckedSource !== false ||
    review.authorityBoundary.candidateMetricPairMeansCalibrationEvidence !== false ||
    review.authorityBoundary.metricValueMeansCriterionState !== false
  ) fail('issued FR-83 authority boundary widened.');
}