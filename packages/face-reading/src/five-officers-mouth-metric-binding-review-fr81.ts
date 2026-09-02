import {
  FACE_FR3_METHOD_REFS_V0,
  FACE_FR3_METHODOLOGIES_V0,
  FACE_FR3_PASSAGES_V0,
  FIVE_OFFICER_CRITERIA_V0,
  type FiveOfficerCriterionModality,
} from './five-officers-six-fus-research-v0.js';
import { FACE_CALIBRATION_EVIDENCE_RESEARCH_V0 } from './calibration-authority.js';
import { FACE_NOSE_BRIDGE_CALIBRATION_PROTOCOL_RESEARCH_V0 } from './calibration-protocol.js';
import { getNeutralMouthContourMetricDefinitionFR80 } from './neutral-mouth-contour-metric-fr80.js';
import { FaceAuthorityValidationError } from './validation.js';

const FR80_METRIC_REF = 'neutral.mouth.contour_set.bounding_box_aspect_ratio@0.1.0' as const;

export const FR81_INTAKE_CRITERION_IDS = Object.freeze([
  'criterion.intake.square_broad',
  'criterion.intake.lips_substantial',
  'criterion.intake.corners_arched',
  'criterion.intake.open_close_relation',
  'criterion.intake.red_lip_color',
] as const);

export type FR81IntakeCriterionId = (typeof FR81_INTAKE_CRITERION_IDS)[number];

export interface FiveOfficerMouthMetricBindingCriterionReviewFR81V1 {
  readonly criterionId: FR81IntakeCriterionId;
  readonly sourceConcept: string;
  readonly modality: FiveOfficerCriterionModality;
  readonly staticV1Eligible: boolean;
  readonly candidateNeutralMetricRefs: readonly string[];
  readonly candidateRelation: 'partial_shape_observation_only' | 'no_applicable_neutral_metric_admitted';
  readonly traditionalMetricBindingRef: null;
  readonly calibrationRef: null;
  readonly thresholdRef: null;
  readonly automaticCriterionStateAuthorized: false;
  readonly bindingDecision: 'not_admitted';
  readonly missingAuthority: readonly string[];
}

export interface FiveOfficerMouthMetricBindingReviewFR81V1 {
  readonly schemaVersion: 'fr81-five-officers-mouth-metric-binding-review-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'traditional_metric_binding_review_completed_no_binding_admitted';
  readonly neutralMetricDefinition: {
    readonly metricRef: typeof FR80_METRIC_REF;
    readonly metricKey: 'neutral.mouth.contour_set.bounding_box_aspect_ratio';
    readonly metricVersion: '0.1.0';
    readonly coordinateFrame: 'pose_normalized_face_2d';
    readonly unit: 'ratio';
    readonly requiredGeometry: 'two_unordered_pose_normalized_lips_contours';
    readonly formula: '(max_x-min_x)/(max_y-min_y) over the union of both contour point sets';
    readonly outerInnerAnatomicalRoleRequired: false;
    readonly absoluteWidthHeightIssued: false;
    readonly physicalAnthropometricInterpretationAllowed: false;
    readonly traditionalCriterionBindingRef: null;
    readonly calibrationRef: null;
  };
  readonly traditionalSource: {
    readonly passageId: 'passage.shenxiang.five_officers.intake';
    readonly verificationStatus: 'unverified_ocr';
    readonly methodologyRef: 'method.shenxiang.five_officers@0.1.0';
    readonly methodologyReviewStatus: 'research';
    readonly originalText: '口須要方大，唇紅端厚，角弓，開大合小，乃為出納官成。';
  };
  readonly criterionReviews: readonly FiveOfficerMouthMetricBindingCriterionReviewFR81V1[];
  readonly bindingSummary: {
    readonly traditionalMetricBindingReviewCompleted: true;
    readonly neutralMetricDefinitionsReviewed: 1;
    readonly traditionalMetricBindingsIssued: 0;
    readonly calibrationRefsIssued: 0;
    readonly thresholdRefsIssued: 0;
    readonly morphologyProduced: false;
    readonly criterionStatesIssued: 0;
    readonly claimsIssued: 0;
    readonly traditionalFormationAuthorized: false;
    readonly traditionalSemanticAuthority: false;
  };
  readonly authorityBoundary: {
    readonly partialShapeCandidateMeansTraditionalBinding: false;
    readonly aspectRatioMeansRelativeMouthSize: false;
    readonly canonicalMetricPlaneMeansPhysicalAnthropometry: false;
    readonly operationalizationNoteMeansReviewedBinding: false;
    readonly sourceConceptMeansMachineThreshold: false;
    readonly staticV1EligibleMeansAutomaticCriterionState: false;
    readonly researchMethodologyMeansProductionAuthority: false;
    readonly unverifiedOcrMeansScanCheckedSource: false;
    readonly noOuterInnerRolesMeansLipThicknessUnavailable: true;
  };
  readonly remainingBlockers: readonly [
    'fr15_mouth_consumer_slot_not_issued',
    'five_officers_source_not_scan_checked',
    'five_officers_methodology_research_only',
    'square_broad_relative_mouth_size_metric_not_defined',
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
  readonly prohibitedShortcuts: readonly [
    'fr80_aspect_ratio_to_square_broad_binding',
    'fr80_aspect_ratio_to_square_broad_state',
    'fr80_aspect_ratio_to_lips_substantial_binding',
    'partial_shape_observation_to_compound_fang_da_completion',
    'canonical_metric_plane_to_physical_mouth_size',
    'unordered_contours_to_outer_inner_anatomy',
    'normalized_geometry_to_lip_thickness',
    'research_operationalization_note_to_metric_binding_authority',
    'source_concept_to_uncalibrated_threshold',
    'binding_review_to_criterion_state',
  ];
}

const EXPECTED_CRITERIA = Object.freeze([
  Object.freeze({ criterionId: 'criterion.intake.square_broad' as const, sourceConcept: '方大', modality: 'static_geometry' as const, staticV1Eligible: true, operationalizationNote: 'mouth aspect/width 후보이나 方/大 threshold는 별도 calibration이 필요하다.' }),
  Object.freeze({ criterionId: 'criterion.intake.lips_substantial' as const, sourceConcept: '端厚', modality: 'static_geometry' as const, staticV1Eligible: true, operationalizationNote: 'neutral-mouth capture에서 lip thickness 후보.' }),
  Object.freeze({ criterionId: 'criterion.intake.corners_arched' as const, sourceConcept: '角弓', modality: 'capture_sensitive' as const, staticV1Eligible: false, operationalizationNote: '표정에 따라 mouth corner curvature가 변하므로 neutral-expression gate가 필요하다.' }),
  Object.freeze({ criterionId: 'criterion.intake.open_close_relation' as const, sourceConcept: '開大合小', modality: 'capture_sensitive' as const, staticV1Eligible: false, operationalizationNote: '의도적 입 벌림/다묾 상태와 혼동되므로 단일 neutral frame에서 자동판정하지 않는다.' }),
  Object.freeze({ criterionId: 'criterion.intake.red_lip_color' as const, sourceConcept: '唇紅', modality: 'dynamic_appearance' as const, staticV1Eligible: false, operationalizationNote: 'lip color는 조명·화장 confound가 커 static v1에서 차단한다.' }),
] as const);

const REMAINING_BLOCKERS = Object.freeze([
  'fr15_mouth_consumer_slot_not_issued',
  'five_officers_source_not_scan_checked',
  'five_officers_methodology_research_only',
  'square_broad_relative_mouth_size_metric_not_defined',
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
  'fr80_aspect_ratio_to_square_broad_binding',
  'fr80_aspect_ratio_to_square_broad_state',
  'fr80_aspect_ratio_to_lips_substantial_binding',
  'partial_shape_observation_to_compound_fang_da_completion',
  'canonical_metric_plane_to_physical_mouth_size',
  'unordered_contours_to_outer_inner_anatomy',
  'normalized_geometry_to_lip_thickness',
  'research_operationalization_note_to_metric_binding_authority',
  'source_concept_to_uncalibrated_threshold',
  'binding_review_to_criterion_state',
] as const);

const REVIEW_ISSUED = new WeakSet<object>();

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-81 ${message}`);
}

function sameSequence<T>(actual: readonly T[], expected: readonly T[]): boolean {
  return actual.length === expected.length && actual.every((value, index) => value === expected[index]);
}

function validateCurrentAuthorityInputs(): void {
  const definition = getNeutralMouthContourMetricDefinitionFR80();
  if (
    definition.metricRef !== FR80_METRIC_REF ||
    definition.coordinateFrame !== 'pose_normalized_face_2d' ||
    definition.unit !== 'ratio' ||
    definition.requiredGeometry !== 'two_unordered_pose_normalized_lips_contours' ||
    definition.formula !== '(max_x-min_x)/(max_y-min_y) over the union of both contour point sets' ||
    definition.outerInnerAnatomicalRoleRequired !== false ||
    definition.absoluteWidthHeightIssued !== false ||
    definition.physicalAnthropometricInterpretationAllowed !== false ||
    definition.traditionalCriterionBindingRef !== null ||
    definition.calibrationRef !== null
  ) fail('FR-80 neutral metric definition authority drift.');

  const passage = FACE_FR3_PASSAGES_V0.find((item) => item.passageId === 'passage.shenxiang.five_officers.intake');
  if (
    passage === undefined ||
    passage.verificationStatus !== 'unverified_ocr' ||
    passage.originalText !== '口須要方大，唇紅端厚，角弓，開大合小，乃為出納官成。'
  ) fail('intake source passage authority drift.');

  const methodology = FACE_FR3_METHODOLOGIES_V0.find(
    (item) => `${item.methodologyId}@${item.version}` === FACE_FR3_METHOD_REFS_V0.shenxiangFiveOfficers,
  );
  if (
    methodology === undefined ||
    methodology.reviewStatus !== 'research' ||
    !methodology.sourceRefs.some((sourceRef) => sourceRef === 'passage.shenxiang.five_officers.intake')
  ) fail('Five Officers methodology authority drift.');

  const criteria = FIVE_OFFICER_CRITERIA_V0.filter((item) => item.officerKey === 'intake');
  if (!sameSequence(criteria.map((item) => item.criterionId), FR81_INTAKE_CRITERION_IDS)) fail('intake criterion registry drift.');
  criteria.forEach((criterion, index) => {
    const expected = EXPECTED_CRITERIA[index]!;
    if (
      criterion.criterionId !== expected.criterionId ||
      criterion.sourceConcept !== expected.sourceConcept ||
      criterion.modality !== expected.modality ||
      criterion.staticV1Eligible !== expected.staticV1Eligible ||
      criterion.operationalizationNote !== expected.operationalizationNote ||
      criterion.requiredForTraditionalFormation !== true ||
      criterion.anatomicalTarget !== 'mouth' ||
      criterion.traditionalOfficerName !== '出納官'
    ) fail(`intake criterion authority drift at index ${index}.`);
  });

  const criterionSet = new Set<string>(FR81_INTAKE_CRITERION_IDS);
  if (FACE_CALIBRATION_EVIDENCE_RESEARCH_V0.evidence.some((item) => item.criterionRefs.some((ref) => criterionSet.has(ref)))) {
    fail('mouth calibration evidence now exists; FR-81 binding review must be re-reviewed.');
  }
  const protocol = FACE_NOSE_BRIDGE_CALIBRATION_PROTOCOL_RESEARCH_V0;
  if (
    protocol.supportArtifacts.some((item) => item.kind === 'labeling_instruction' && criterionSet.has(item.criterionId)) ||
    protocol.labelingProtocols.some((item) => criterionSet.has(item.criterionId)) ||
    protocol.studies.some((item) => criterionSet.has(item.criterionId))
  ) fail('mouth calibration protocol now exists; FR-81 binding review must be re-reviewed.');
}

function criterionReviews(): readonly FiveOfficerMouthMetricBindingCriterionReviewFR81V1[] {
  return Object.freeze([
    Object.freeze({
      criterionId: 'criterion.intake.square_broad' as const,
      sourceConcept: '方大',
      modality: 'static_geometry' as const,
      staticV1Eligible: true,
      candidateNeutralMetricRefs: Object.freeze([FR80_METRIC_REF]),
      candidateRelation: 'partial_shape_observation_only' as const,
      traditionalMetricBindingRef: null,
      calibrationRef: null,
      thresholdRef: null,
      automaticCriterionStateAuthorized: false as const,
      bindingDecision: 'not_admitted' as const,
      missingAuthority: Object.freeze(['relative_mouth_size_metric_definition', 'scan_checked_traditional_source', 'criterion_specific_calibration_evidence', 'criterion_specific_calibration_protocol', 'calibrated_decision_threshold']),
    }),
    Object.freeze({
      criterionId: 'criterion.intake.lips_substantial' as const,
      sourceConcept: '端厚',
      modality: 'static_geometry' as const,
      staticV1Eligible: true,
      candidateNeutralMetricRefs: Object.freeze([]),
      candidateRelation: 'no_applicable_neutral_metric_admitted' as const,
      traditionalMetricBindingRef: null,
      calibrationRef: null,
      thresholdRef: null,
      automaticCriterionStateAuthorized: false as const,
      bindingDecision: 'not_admitted' as const,
      missingAuthority: Object.freeze(['outer_inner_lip_anatomical_roles', 'lip_thickness_metric_definition', 'scan_checked_traditional_source', 'criterion_specific_calibration_evidence', 'criterion_specific_calibration_protocol', 'calibrated_decision_threshold']),
    }),
    ...EXPECTED_CRITERIA.slice(2).map((criterion) => Object.freeze({
      criterionId: criterion.criterionId,
      sourceConcept: criterion.sourceConcept,
      modality: criterion.modality,
      staticV1Eligible: criterion.staticV1Eligible,
      candidateNeutralMetricRefs: Object.freeze([]),
      candidateRelation: 'no_applicable_neutral_metric_admitted' as const,
      traditionalMetricBindingRef: null,
      calibrationRef: null,
      thresholdRef: null,
      automaticCriterionStateAuthorized: false as const,
      bindingDecision: 'not_admitted' as const,
      missingAuthority: Object.freeze([
        criterion.modality === 'dynamic_appearance' ? 'dynamic_appearance_authority' : 'capture_state_protocol_and_neutral_expression_gate',
        'scan_checked_traditional_source',
      ]),
    })),
  ]);
}

export function reviewFiveOfficerMouthMetricBindingsFR81(): FiveOfficerMouthMetricBindingReviewFR81V1 {
  validateCurrentAuthorityInputs();
  const definition = getNeutralMouthContourMetricDefinitionFR80();
  const result: FiveOfficerMouthMetricBindingReviewFR81V1 = Object.freeze({
    schemaVersion: 'fr81-five-officers-mouth-metric-binding-review-v1' as const,
    artifactVersion: '0.1.0' as const,
    authorityState: 'traditional_metric_binding_review_completed_no_binding_admitted' as const,
    neutralMetricDefinition: Object.freeze({
      metricRef: FR80_METRIC_REF,
      metricKey: definition.metricKey,
      metricVersion: definition.metricVersion,
      coordinateFrame: definition.coordinateFrame,
      unit: definition.unit,
      requiredGeometry: definition.requiredGeometry,
      formula: definition.formula,
      outerInnerAnatomicalRoleRequired: definition.outerInnerAnatomicalRoleRequired,
      absoluteWidthHeightIssued: definition.absoluteWidthHeightIssued,
      physicalAnthropometricInterpretationAllowed: definition.physicalAnthropometricInterpretationAllowed,
      traditionalCriterionBindingRef: definition.traditionalCriterionBindingRef,
      calibrationRef: definition.calibrationRef,
    }),
    traditionalSource: Object.freeze({
      passageId: 'passage.shenxiang.five_officers.intake' as const,
      verificationStatus: 'unverified_ocr' as const,
      methodologyRef: FACE_FR3_METHOD_REFS_V0.shenxiangFiveOfficers,
      methodologyReviewStatus: 'research' as const,
      originalText: '口須要方大，唇紅端厚，角弓，開大合小，乃為出納官成。' as const,
    }),
    criterionReviews: criterionReviews(),
    bindingSummary: Object.freeze({
      traditionalMetricBindingReviewCompleted: true as const,
      neutralMetricDefinitionsReviewed: 1 as const,
      traditionalMetricBindingsIssued: 0 as const,
      calibrationRefsIssued: 0 as const,
      thresholdRefsIssued: 0 as const,
      morphologyProduced: false as const,
      criterionStatesIssued: 0 as const,
      claimsIssued: 0 as const,
      traditionalFormationAuthorized: false as const,
      traditionalSemanticAuthority: false as const,
    }),
    authorityBoundary: Object.freeze({
      partialShapeCandidateMeansTraditionalBinding: false as const,
      aspectRatioMeansRelativeMouthSize: false as const,
      canonicalMetricPlaneMeansPhysicalAnthropometry: false as const,
      operationalizationNoteMeansReviewedBinding: false as const,
      sourceConceptMeansMachineThreshold: false as const,
      staticV1EligibleMeansAutomaticCriterionState: false as const,
      researchMethodologyMeansProductionAuthority: false as const,
      unverifiedOcrMeansScanCheckedSource: false as const,
      noOuterInnerRolesMeansLipThicknessUnavailable: true as const,
    }),
    remainingBlockers: REMAINING_BLOCKERS,
    prohibitedShortcuts: PROHIBITED_SHORTCUTS,
  });
  REVIEW_ISSUED.add(result);
  return result;
}

export function assertIssuedFiveOfficerMouthMetricBindingReviewFR81(review: FiveOfficerMouthMetricBindingReviewFR81V1): void {
  if (!REVIEW_ISSUED.has(review)) fail('mouth metric binding review was not issued by the active FR-81 boundary.');
  if (
    review.schemaVersion !== 'fr81-five-officers-mouth-metric-binding-review-v1' ||
    review.authorityState !== 'traditional_metric_binding_review_completed_no_binding_admitted' ||
    review.neutralMetricDefinition.metricRef !== FR80_METRIC_REF ||
    review.bindingSummary.traditionalMetricBindingReviewCompleted !== true ||
    review.bindingSummary.neutralMetricDefinitionsReviewed !== 1 ||
    review.bindingSummary.traditionalMetricBindingsIssued !== 0 ||
    review.bindingSummary.calibrationRefsIssued !== 0 ||
    review.bindingSummary.thresholdRefsIssued !== 0 ||
    review.bindingSummary.morphologyProduced !== false ||
    review.bindingSummary.criterionStatesIssued !== 0 ||
    review.bindingSummary.claimsIssued !== 0 ||
    review.bindingSummary.traditionalSemanticAuthority !== false ||
    review.criterionReviews.some((item) => item.traditionalMetricBindingRef !== null || item.calibrationRef !== null || item.thresholdRef !== null || item.automaticCriterionStateAuthorized !== false || item.bindingDecision !== 'not_admitted')
  ) fail('issued FR-81 review authority widened or identity drifted.');
}
