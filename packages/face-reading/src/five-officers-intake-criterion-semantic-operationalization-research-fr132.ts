import {
  assessFiveOfficerIntakeProjectOwnerMethodologyReviewGovernanceMaterializationFR131,
  assertIssuedFiveOfficerIntakeProjectOwnerMethodologyReviewGovernanceMaterializationFR131,
} from './five-officers-intake-methodology-review-project-owner-governance-materialization-fr131.js';
import { FACE_FR124_METHODOLOGY_REVIEW_DECISION_REGISTRY } from './five-officers-intake-methodology-review-decision-authority-fr124.js';
import { FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY } from './five-officers-intake-criterion-methodology-witness-qualified-registry-admission-implementation-fr119.js';
import { FIVE_OFFICER_CRITERIA_FR121_WITNESS_QUALIFIED } from './five-officers-intake-criterion-definition-witness-qualified-source-rebind-implementation-fr121.js';
import { getNeutralMouthContourMetricDefinitionFR80 } from './neutral-mouth-contour-metric-fr80.js';
import { getNeutralMouthRelativeSizeMetricDefinitionFR82 } from './neutral-mouth-relative-size-metric-fr82.js';
import {
  assertIssuedRoleFreeArclengthMeanNeutralMetricDefinitionReviewFR97,
  reviewRoleFreeArclengthMeanNeutralMetricDefinitionFR97,
} from './role-free-arclength-mean-neutral-metric-definition-review-fr97.js';
import { FaceAuthorityValidationError } from './validation.js';

const TARGET_METHOD_REF = 'method.shenxiang.five_officers.intake_criteria@0.2.0' as const;
const PROPOSED_REVIEWED_REF = 'method.shenxiang.five_officers.intake_criteria@0.3.0' as const;
const SOURCE_REF = 'passage.shenxiang.five_officers.intake.nlc_1925' as const;
const SOURCE_TEXT = '口須要方大，唇紅端厚，角弓，開大合小，乃為出納官成。' as const;
const RESEARCH_NOTE_REF = 'repo:research/face-reading/fr132-intake-criterion-semantic-operationalization.md' as const;

export type IntakeCriterionSemanticObservabilityFR132V1 =
  | 'partially_observable_static_geometry'
  | 'capture_sensitive_multifeature_geometry'
  | 'controlled_multi_state_dynamic_geometry'
  | 'appearance_requires_capture_calibration';

export interface IntakeCriterionSemanticResearchRecordFR132V1 {
  readonly criterionId:
    | 'criterion.intake.square_broad'
    | 'criterion.intake.lips_substantial'
    | 'criterion.intake.corners_arched'
    | 'criterion.intake.open_close_relation'
    | 'criterion.intake.red_lip_color';
  readonly sourceConcept: '方大' | '端厚' | '角弓' | '開大合小' | '唇紅';
  readonly analyticalParts: readonly string[];
  readonly directSourceSupport: 'compound_present_in_scan_checked_passage';
  readonly contextualSupportStatus: 'research_comparanda_only_not_governed_authority';
  readonly sourceGroundedInterpretation: readonly string[];
  readonly observability: IntakeCriterionSemanticObservabilityFR132V1;
  readonly candidateNeutralMeasurementRefs: readonly string[];
  readonly missingOperationalConstructs: readonly string[];
  readonly confounders: readonly string[];
  readonly constructValidityStatus: 'not_established';
  readonly traditionalMetricBindingAuthorized: false;
  readonly calibrationAuthorized: false;
  readonly thresholdAuthorized: false;
  readonly automaticCriterionStateAuthorized: false;
}

export interface FiveOfficerIntakeCriterionSemanticOperationalizationResearchFR132V1 {
  readonly schemaVersion: 'fr132-five-officers-intake-criterion-semantic-operationalization-research-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'intake_criterion_semantics_decomposed_operationalization_research_active_reviewed_promotion_deferred';
  readonly predecessor: {
    readonly fr131AuthorityState: 'methodology_review_project_owner_single_approver_governance_materialized_target_decision_pending';
    readonly projectOwnerGovernanceActive: true;
    readonly targetSpecificDecisionCount: 0;
    readonly reviewedPromotionAuthorized: false;
  };
  readonly governedSource: {
    readonly passageRef: typeof SOURCE_REF;
    readonly text: typeof SOURCE_TEXT;
    readonly verificationStatus: 'scan_checked';
    readonly methodologyRef: typeof TARGET_METHOD_REF;
    readonly methodologyReviewStatus: 'research';
  };
  readonly researchComparanda: readonly [
    {
      readonly evidenceRef: 'external:ctext:shenxiang_five_officers_context';
      readonly relation: 'same_work_context_electronic_comparandum';
      readonly supports: readonly ['大_with_containment', '弓_upward_orientation_and_no_exposed_teeth'];
      readonly authorityStatus: 'research_only_unverified_for_project_authority';
    },
    {
      readonly evidenceRef: 'external:wikisource:gujin_tushu_jicheng_art_634_mouth';
      readonly relation: 'compiled_mouth_context_comparandum';
      readonly supports: readonly ['方闊有稜', '形如角弓', '橫闊而厚', '口色欲紅', '口脣欲厚'];
      readonly authorityStatus: 'research_only_unverified_for_project_authority';
    },
    {
      readonly evidenceRef: 'external:ctext:liuzhuang_five_officers_mouth';
      readonly relation: 'cross_tradition_comparandum';
      readonly supports: readonly ['角弓開大合小', '上下唇配齒', '配四方'];
      readonly authorityStatus: 'research_only_unverified_for_project_authority';
    },
  ];
  readonly criterionResearch: readonly IntakeCriterionSemanticResearchRecordFR132V1[];
  readonly semanticFindings: {
    readonly squareBroadMustNotCollapseToAspectRatio: true;
    readonly squareBroadMustSeparateShapeAndRelativeSizeConstructs: true;
    readonly daIncludesContainmentContextCandidate: true;
    readonly duanHouMustNotCollapseToThickness: true;
    readonly houThicknessFullnessSupportStrongerThanDuanOperationalMeaning: true;
    readonly duanOperationalMeaningResolved: false;
    readonly cornersArchedMustNotCollapseToCornerCurvature: true;
    readonly bowContextIncludesUpwardOrientationAndTeethNonExposure: true;
    readonly openCloseRelationRequiresMultipleControlledStates: true;
    readonly lipRedRequiresColorCalibratedCaptureBeforeOperationalization: true;
    readonly compoundSegmentationAuthoritative: false;
  };
  readonly neutralMetricAssessment: {
    readonly fr80MetricRef: 'neutral.mouth.contour_set.bounding_box_aspect_ratio@0.1.0';
    readonly fr80CanProveTraditionalFang: false;
    readonly fr82MetricRef: 'neutral.mouth.contour_set.horizontal_span_to_full_mesh_horizontal_span_ratio@0.1.0';
    readonly fr82CanProveTraditionalDa: false;
    readonly fr82DenominatorHasAnatomicalFaceWidthRole: false;
    readonly fr97MetricRef: 'neutral.mouth.contour_set.symmetric_arclength_mean_nearest_set_distance@0.1.0';
    readonly fr97CanBeInterpretedAsLipThickness: false;
    readonly existingNeutralMetricsSufficientForAnyTraditionalCriterionState: false;
  };
  readonly promotionStatus: {
    readonly projectOwnerApprovalPolicyExists: true;
    readonly targetSpecificApprovalExplicitlyDeferred: true;
    readonly researchMethodologyRemainsResearch: true;
    readonly proposedReviewedSuccessorPresent: false;
    readonly methodologyReviewDecisionRecordsIssued: 0;
    readonly reviewedMethodologyDefinitionsIssued: 0;
  };
  readonly execution: {
    readonly semanticResearchRecordsIssued: 5;
    readonly traditionalMetricBindingsIssued: 0;
    readonly calibrationProtocolsIssued: 0;
    readonly thresholdsIssued: 0;
    readonly criterionStatesIssued: 0;
    readonly structuredClaimsIssued: 0;
    readonly boundedNarrativesIssued: 0;
    readonly traditionalSemanticAuthority: false;
  };
  readonly authorityBoundary: {
    readonly contextualComparandumMeansGovernedSourceAuthority: false;
    readonly lexicalDecompositionMeansTraditionalMetricBinding: false;
    readonly imageObservabilityMeansConstructValidity: false;
    readonly candidateNeutralMetricMeansTraditionalConstruct: false;
    readonly semanticResearchMeansReviewedPromotion: false;
    readonly projectOwnerGovernanceMeansTargetApproval: false;
    readonly researchFindingMeansThreshold: false;
    readonly researchFindingMeansCriterionState: false;
    readonly historicalArtifactMutated: false;
  };
  readonly researchNoteRef: typeof RESEARCH_NOTE_REF;
  readonly nextFrontier: 'source_grounded_square_broad_construct_operationalization_and_calibration_design';
}

const ISSUED = new WeakSet<object>();
let CACHED: FiveOfficerIntakeCriterionSemanticOperationalizationResearchFR132V1 | null = null;

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-132 ${message}`);
}

function methodologyRef(value: { readonly methodologyId: string; readonly version: string }): string {
  return `${value.methodologyId}@${value.version}`;
}

function validatePersistedAuthority(): void {
  const fr131 = assessFiveOfficerIntakeProjectOwnerMethodologyReviewGovernanceMaterializationFR131();
  assertIssuedFiveOfficerIntakeProjectOwnerMethodologyReviewGovernanceMaterializationFR131(fr131);
  if (
    fr131.authorityState !== 'methodology_review_project_owner_single_approver_governance_materialized_target_decision_pending' ||
    fr131.currentGovernance.targetSpecificReviewDecisionCount !== 0 ||
    fr131.admission.reviewedPromotionAuthorized !== false ||
    fr131.execution.methodologyReviewDecisionRecordsIssued !== 0
  ) fail('FR-131 governance or deferred target-decision state drift.');

  if (FACE_FR124_METHODOLOGY_REVIEW_DECISION_REGISTRY.decisions.length !== 0) fail('FR-124 decision registry drift.');

  const registry = FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY;
  const method = registry.methodologies.find((candidate) => methodologyRef(candidate) === TARGET_METHOD_REF);
  const proposed = registry.methodologies.find((candidate) => methodologyRef(candidate) === PROPOSED_REVIEWED_REF);
  const source = registry.passages.find((candidate) => candidate.passageId === SOURCE_REF);
  if (
    method === undefined || method.reviewStatus !== 'research' || method.sourceRefs.length !== 1 || method.sourceRefs[0] !== SOURCE_REF ||
    proposed !== undefined || source === undefined || source.verificationStatus !== 'scan_checked' || source.originalText !== SOURCE_TEXT
  ) fail('witness-qualified research methodology/source authority drift.');

  const intake = FIVE_OFFICER_CRITERIA_FR121_WITNESS_QUALIFIED.filter((criterion) => criterion.officerKey === 'intake');
  const expected = ['方大', '端厚', '角弓', '開大合小', '唇紅'];
  if (
    intake.length !== 5 ||
    intake.some((criterion, index) => criterion.sourceRefs.length !== 1 || criterion.sourceRefs[0] !== SOURCE_REF || criterion.sourceConcept !== expected[index])
  ) fail('FR-121 witness-qualified intake criterion set drift.');

  const fr80 = getNeutralMouthContourMetricDefinitionFR80();
  const fr82 = getNeutralMouthRelativeSizeMetricDefinitionFR82();
  const fr97 = reviewRoleFreeArclengthMeanNeutralMetricDefinitionFR97();
  assertIssuedRoleFreeArclengthMeanNeutralMetricDefinitionReviewFR97(fr97);
  if (
    fr80.metricRef !== 'neutral.mouth.contour_set.bounding_box_aspect_ratio@0.1.0' || fr80.traditionalCriterionBindingRef !== null ||
    fr82.metricRef !== 'neutral.mouth.contour_set.horizontal_span_to_full_mesh_horizontal_span_ratio@0.1.0' || fr82.faceWidthAnatomicalRoleAssigned !== false || fr82.traditionalCriterionBindingRef !== null ||
    fr97.metricDefinition.metricRef !== 'neutral.mouth.contour_set.symmetric_arclength_mean_nearest_set_distance@0.1.0' || fr97.metricDefinition.thicknessInterpretationAllowed !== false || fr97.metricDefinition.traditionalCriterionBindingRef !== null
  ) fail('neutral metric semantic boundary drift.');
}

function records(): readonly IntakeCriterionSemanticResearchRecordFR132V1[] {
  return Object.freeze([
    Object.freeze({
      criterionId: 'criterion.intake.square_broad' as const,
      sourceConcept: '方大' as const,
      analyticalParts: Object.freeze(['方', '大']),
      directSourceSupport: 'compound_present_in_scan_checked_passage' as const,
      contextualSupportStatus: 'research_comparanda_only_not_governed_authority' as const,
      sourceGroundedInterpretation: Object.freeze([
        '方 is a shape/form construct candidate and is not established by bounding-box aspect ratio alone.',
        '大 is a relative-size construct candidate; same-work context also preserves containment/收拾 rather than unrestricted span alone.',
      ]),
      observability: 'partially_observable_static_geometry' as const,
      candidateNeutralMeasurementRefs: Object.freeze([
        'neutral.mouth.contour_set.bounding_box_aspect_ratio@0.1.0',
        'neutral.mouth.contour_set.horizontal_span_to_full_mesh_horizontal_span_ratio@0.1.0',
      ]),
      missingOperationalConstructs: Object.freeze([
        'governed_mouth_outline_rectilinearity_or_angularity_observation_for_fang',
        'anatomically_governed_relative_mouth_size_reference_for_da',
        'source_grounded_containment_observation_for_da_context',
      ]),
      confounders: Object.freeze(['pose', 'expression', 'lip_parting', 'denominator_anatomical_role']),
      constructValidityStatus: 'not_established' as const,
      traditionalMetricBindingAuthorized: false as const,
      calibrationAuthorized: false as const,
      thresholdAuthorized: false as const,
      automaticCriterionStateAuthorized: false as const,
    }),
    Object.freeze({
      criterionId: 'criterion.intake.lips_substantial' as const,
      sourceConcept: '端厚' as const,
      analyticalParts: Object.freeze(['端', '厚']),
      directSourceSupport: 'compound_present_in_scan_checked_passage' as const,
      contextualSupportStatus: 'research_comparanda_only_not_governed_authority' as const,
      sourceGroundedInterpretation: Object.freeze([
        '厚 has contextual support as lip thickness/fullness.',
        '端 contributes meaning not yet operationally resolved and must not be silently collapsed into thickness.',
      ]),
      observability: 'partially_observable_static_geometry' as const,
      candidateNeutralMeasurementRefs: Object.freeze([
        'neutral.mouth.contour_set.symmetric_arclength_mean_nearest_set_distance@0.1.0',
      ]),
      missingOperationalConstructs: Object.freeze([
        'governed_lip_boundary_roles',
        'source_grounded_definition_of_duan_component',
        'validated_visible_lip_fullness_or_thickness_observation',
      ]),
      confounders: Object.freeze(['lip_parting', 'expression', 'projection', 'outer_inner_role_absence']),
      constructValidityStatus: 'not_established' as const,
      traditionalMetricBindingAuthorized: false as const,
      calibrationAuthorized: false as const,
      thresholdAuthorized: false as const,
      automaticCriterionStateAuthorized: false as const,
    }),
    Object.freeze({
      criterionId: 'criterion.intake.corners_arched' as const,
      sourceConcept: '角弓' as const,
      analyticalParts: Object.freeze(['角', '弓']),
      directSourceSupport: 'compound_present_in_scan_checked_passage' as const,
      contextualSupportStatus: 'research_comparanda_only_not_governed_authority' as const,
      sourceGroundedInterpretation: Object.freeze([
        '角弓 must not be reduced to generic mouth-corner curvature.',
        'Same-work context makes upward orientation and non-exposure of teeth relevant to the 弓 research hypothesis.',
      ]),
      observability: 'capture_sensitive_multifeature_geometry' as const,
      candidateNeutralMeasurementRefs: Object.freeze([]),
      missingOperationalConstructs: Object.freeze([
        'mouth_corner_elevation_or_orientation_observation',
        'bow_like_contour_geometry_observation',
        'teeth_visibility_observation',
        'neutral_expression_capture_gate',
      ]),
      confounders: Object.freeze(['smile', 'speech', 'head_pose', 'lip_parting']),
      constructValidityStatus: 'not_established' as const,
      traditionalMetricBindingAuthorized: false as const,
      calibrationAuthorized: false as const,
      thresholdAuthorized: false as const,
      automaticCriterionStateAuthorized: false as const,
    }),
    Object.freeze({
      criterionId: 'criterion.intake.open_close_relation' as const,
      sourceConcept: '開大合小' as const,
      analyticalParts: Object.freeze(['開大', '合小']),
      directSourceSupport: 'compound_present_in_scan_checked_passage' as const,
      contextualSupportStatus: 'research_comparanda_only_not_governed_authority' as const,
      sourceGroundedInterpretation: Object.freeze([
        '開大合小 is treated as an open-versus-closed state relation rather than a single-frame static size property.',
        'The source provides no numeric aperture ratio or state-transition threshold.',
      ]),
      observability: 'controlled_multi_state_dynamic_geometry' as const,
      candidateNeutralMeasurementRefs: Object.freeze([]),
      missingOperationalConstructs: Object.freeze([
        'same_subject_controlled_open_state_observation',
        'same_subject_controlled_closed_state_observation',
        'governed_open_large_closed_small_relation_definition',
      ]),
      confounders: Object.freeze(['voluntary_mouth_pose', 'speech', 'jaw_opening', 'expression']),
      constructValidityStatus: 'not_established' as const,
      traditionalMetricBindingAuthorized: false as const,
      calibrationAuthorized: false as const,
      thresholdAuthorized: false as const,
      automaticCriterionStateAuthorized: false as const,
    }),
    Object.freeze({
      criterionId: 'criterion.intake.red_lip_color' as const,
      sourceConcept: '唇紅' as const,
      analyticalParts: Object.freeze(['唇', '紅']),
      directSourceSupport: 'compound_present_in_scan_checked_passage' as const,
      contextualSupportStatus: 'research_comparanda_only_not_governed_authority' as const,
      sourceGroundedInterpretation: Object.freeze([
        '唇紅 is an appearance/color construct and is not equivalent to uncalibrated camera RGB.',
      ]),
      observability: 'appearance_requires_capture_calibration' as const,
      candidateNeutralMeasurementRefs: Object.freeze([]),
      missingOperationalConstructs: Object.freeze([
        'governed_lip_color_region_segmentation',
        'color_calibrated_capture_protocol',
        'illumination_and_white_balance_normalization',
        'cosmetic_confound_policy',
      ]),
      confounders: Object.freeze(['illumination', 'white_balance', 'exposure', 'cosmetics', 'device_processing']),
      constructValidityStatus: 'not_established' as const,
      traditionalMetricBindingAuthorized: false as const,
      calibrationAuthorized: false as const,
      thresholdAuthorized: false as const,
      automaticCriterionStateAuthorized: false as const,
    }),
  ]);
}

export function assessFiveOfficerIntakeCriterionSemanticOperationalizationResearchFR132(): FiveOfficerIntakeCriterionSemanticOperationalizationResearchFR132V1 {
  if (CACHED !== null) return CACHED;
  validatePersistedAuthority();
  const criterionResearch = records();
  const result: FiveOfficerIntakeCriterionSemanticOperationalizationResearchFR132V1 = Object.freeze({
    schemaVersion: 'fr132-five-officers-intake-criterion-semantic-operationalization-research-v1' as const,
    artifactVersion: '0.1.0' as const,
    authorityState: 'intake_criterion_semantics_decomposed_operationalization_research_active_reviewed_promotion_deferred' as const,
    predecessor: Object.freeze({
      fr131AuthorityState: 'methodology_review_project_owner_single_approver_governance_materialized_target_decision_pending' as const,
      projectOwnerGovernanceActive: true as const,
      targetSpecificDecisionCount: 0 as const,
      reviewedPromotionAuthorized: false as const,
    }),
    governedSource: Object.freeze({
      passageRef: SOURCE_REF,
      text: SOURCE_TEXT,
      verificationStatus: 'scan_checked' as const,
      methodologyRef: TARGET_METHOD_REF,
      methodologyReviewStatus: 'research' as const,
    }),
    researchComparanda: Object.freeze([
      Object.freeze({ evidenceRef: 'external:ctext:shenxiang_five_officers_context' as const, relation: 'same_work_context_electronic_comparandum' as const, supports: Object.freeze(['大_with_containment', '弓_upward_orientation_and_no_exposed_teeth'] as const), authorityStatus: 'research_only_unverified_for_project_authority' as const }),
      Object.freeze({ evidenceRef: 'external:wikisource:gujin_tushu_jicheng_art_634_mouth' as const, relation: 'compiled_mouth_context_comparandum' as const, supports: Object.freeze(['方闊有稜', '形如角弓', '橫闊而厚', '口色欲紅', '口脣欲厚'] as const), authorityStatus: 'research_only_unverified_for_project_authority' as const }),
      Object.freeze({ evidenceRef: 'external:ctext:liuzhuang_five_officers_mouth' as const, relation: 'cross_tradition_comparandum' as const, supports: Object.freeze(['角弓開大合小', '上下唇配齒', '配四方'] as const), authorityStatus: 'research_only_unverified_for_project_authority' as const }),
    ] as const),
    criterionResearch,
    semanticFindings: Object.freeze({
      squareBroadMustNotCollapseToAspectRatio: true as const,
      squareBroadMustSeparateShapeAndRelativeSizeConstructs: true as const,
      daIncludesContainmentContextCandidate: true as const,
      duanHouMustNotCollapseToThickness: true as const,
      houThicknessFullnessSupportStrongerThanDuanOperationalMeaning: true as const,
      duanOperationalMeaningResolved: false as const,
      cornersArchedMustNotCollapseToCornerCurvature: true as const,
      bowContextIncludesUpwardOrientationAndTeethNonExposure: true as const,
      openCloseRelationRequiresMultipleControlledStates: true as const,
      lipRedRequiresColorCalibratedCaptureBeforeOperationalization: true as const,
      compoundSegmentationAuthoritative: false as const,
    }),
    neutralMetricAssessment: Object.freeze({
      fr80MetricRef: 'neutral.mouth.contour_set.bounding_box_aspect_ratio@0.1.0' as const,
      fr80CanProveTraditionalFang: false as const,
      fr82MetricRef: 'neutral.mouth.contour_set.horizontal_span_to_full_mesh_horizontal_span_ratio@0.1.0' as const,
      fr82CanProveTraditionalDa: false as const,
      fr82DenominatorHasAnatomicalFaceWidthRole: false as const,
      fr97MetricRef: 'neutral.mouth.contour_set.symmetric_arclength_mean_nearest_set_distance@0.1.0' as const,
      fr97CanBeInterpretedAsLipThickness: false as const,
      existingNeutralMetricsSufficientForAnyTraditionalCriterionState: false as const,
    }),
    promotionStatus: Object.freeze({
      projectOwnerApprovalPolicyExists: true as const,
      targetSpecificApprovalExplicitlyDeferred: true as const,
      researchMethodologyRemainsResearch: true as const,
      proposedReviewedSuccessorPresent: false as const,
      methodologyReviewDecisionRecordsIssued: 0 as const,
      reviewedMethodologyDefinitionsIssued: 0 as const,
    }),
    execution: Object.freeze({
      semanticResearchRecordsIssued: 5 as const,
      traditionalMetricBindingsIssued: 0 as const,
      calibrationProtocolsIssued: 0 as const,
      thresholdsIssued: 0 as const,
      criterionStatesIssued: 0 as const,
      structuredClaimsIssued: 0 as const,
      boundedNarrativesIssued: 0 as const,
      traditionalSemanticAuthority: false as const,
    }),
    authorityBoundary: Object.freeze({
      contextualComparandumMeansGovernedSourceAuthority: false as const,
      lexicalDecompositionMeansTraditionalMetricBinding: false as const,
      imageObservabilityMeansConstructValidity: false as const,
      candidateNeutralMetricMeansTraditionalConstruct: false as const,
      semanticResearchMeansReviewedPromotion: false as const,
      projectOwnerGovernanceMeansTargetApproval: false as const,
      researchFindingMeansThreshold: false as const,
      researchFindingMeansCriterionState: false as const,
      historicalArtifactMutated: false as const,
    }),
    researchNoteRef: RESEARCH_NOTE_REF,
    nextFrontier: 'source_grounded_square_broad_construct_operationalization_and_calibration_design' as const,
  });
  CACHED = result;
  ISSUED.add(result);
  return result;
}

export function assertIssuedFiveOfficerIntakeCriterionSemanticOperationalizationResearchFR132(
  value: FiveOfficerIntakeCriterionSemanticOperationalizationResearchFR132V1,
): void {
  if (!ISSUED.has(value)) fail('semantic operationalization research artifact was not issued by FR-132.');
  if (
    value.authorityState !== 'intake_criterion_semantics_decomposed_operationalization_research_active_reviewed_promotion_deferred' ||
    value.criterionResearch.length !== 5 ||
    value.promotionStatus.targetSpecificApprovalExplicitlyDeferred !== true ||
    value.promotionStatus.methodologyReviewDecisionRecordsIssued !== 0 ||
    value.execution.traditionalMetricBindingsIssued !== 0 ||
    value.execution.thresholdsIssued !== 0 ||
    value.execution.criterionStatesIssued !== 0 ||
    value.execution.traditionalSemanticAuthority !== false
  ) fail('issued semantic research authority drift.');
}
