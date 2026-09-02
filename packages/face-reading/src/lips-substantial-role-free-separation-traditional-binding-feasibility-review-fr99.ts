import {
  assertIssuedFiveOfficerMouthMetricBindingReviewFR81,
  reviewFiveOfficerMouthMetricBindingsFR81,
} from './five-officers-mouth-metric-binding-review-fr81.js';
import {
  assertIssuedRoleFreeCrossContourCorrespondenceFeasibilityReviewFR86,
  reviewRoleFreeCrossContourCorrespondenceFeasibilityFR86,
} from './role-free-cross-contour-correspondence-feasibility-review-fr86.js';
import {
  assertIssuedRoleFreeArclengthMeanNeutralMetricDefinitionReviewFR97,
  reviewRoleFreeArclengthMeanNeutralMetricDefinitionFR97,
} from './role-free-arclength-mean-neutral-metric-definition-review-fr97.js';
import {
  assertIssuedGovernedRoleFreeArclengthMeanNeutralMetricFR98,
  bindIssuedFR96ToNeutralMetricValueFR98,
} from './role-free-arclength-mean-neutral-metric-value-runtime-fr98.js';
import { FaceAuthorityValidationError } from './validation.js';

const CRITERION_ID = 'criterion.intake.lips_substantial' as const;
const SOURCE_CONCEPT = '端厚' as const;
const METRIC_REF = 'neutral.mouth.contour_set.symmetric_arclength_mean_nearest_set_distance@0.1.0' as const;

export interface LipsSubstantialRoleFreeSeparationTraditionalBindingFeasibilityReviewFR99V1 {
  readonly schemaVersion: 'fr99-lips-substantial-role-free-separation-traditional-binding-feasibility-review-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'lips_substantial_role_free_separation_traditional_binding_feasibility_review_completed_no_binding_admitted';
  readonly upstreamAuthority: {
    readonly fr81PriorTraditionalBindingReviewCompleted: true;
    readonly fr81PriorApplicableNeutralMetricCount: 0;
    readonly fr86CorrespondenceFeasibilityReviewCompleted: true;
    readonly fr86CorrespondenceMethodAdmitted: false;
    readonly fr86PointCorrespondenceRequiredBeforeThicknessInterpretation: true;
    readonly fr97NeutralMetricDefinitionAdmitted: true;
    readonly fr98NeutralMetricValueBindingRuntimeSurfaceAvailable: true;
    readonly fr98IssuedArtifactStillRequiredForAnyMetricValue: true;
  };
  readonly traditionalTarget: {
    readonly criterionId: typeof CRITERION_ID;
    readonly sourceConcept: typeof SOURCE_CONCEPT;
    readonly modality: 'static_geometry';
    readonly staticV1Eligible: true;
    readonly existingOperationalizationNote: 'neutral-mouth capture에서 lip thickness 후보.';
    readonly passageId: 'passage.shenxiang.five_officers.intake';
    readonly originalText: '口須要方大，唇紅端厚，角弓，開大合小，乃為出納官成。';
    readonly verificationStatus: 'unverified_ocr';
    readonly methodologyReviewStatus: 'research';
    readonly requiredForTraditionalFormation: true;
  };
  readonly candidateNeutralMetric: {
    readonly metricRef: typeof METRIC_REF;
    readonly relationClass: 'role_free_whole_contour_separation_proxy_candidate_only';
    readonly researchCandidateInventoryAdmitted: true;
    readonly coordinateFrame: 'pose_normalized_face_2d';
    readonly unit: 'canonical_metric_plane_distance';
    readonly formula: 'certified symmetric arclength mean nearest-set distance between two unordered pose-normalized contour cycles';
    readonly contourRoleSemantics: 'unordered_role_free_contour_pair';
    readonly explicitPointPairCorrespondenceRequiredByMetric: false;
    readonly outerInnerAnatomicalRoleRequiredByMetric: false;
    readonly physicalAnthropometricInterpretationAllowedByMetric: false;
    readonly thicknessInterpretationAllowedByMetric: false;
    readonly directTraditionalConstructMatchEstablished: false;
    readonly anatomicalLipThicknessMeasurementEstablished: false;
    readonly physicalLipThicknessMeasurementEstablished: false;
    readonly traditionalMetricBindingRef: null;
    readonly calibrationRef: null;
    readonly thresholdRef: null;
  };
  readonly feasibilityDecision: {
    readonly candidateMetricMayBeListedForResearchReview: true;
    readonly traditionalMetricBindingAdmitted: false;
    readonly bindingDecision: 'not_admitted';
    readonly reason: 'role_free_set_separation_is_not_authorized_anatomical_lip_thickness_and_traditional_source_construct_validity_calibration_authority_remain_missing';
    readonly neutralProxyCandidateMeansThicknessMetric: false;
    readonly neutralProxyCandidateMeansTraditionalBinding: false;
    readonly scanCheckedSourceRequiredBeforeTraditionalBinding: true;
    readonly constructValidityEvidenceRequiredBeforeProxyBinding: true;
    readonly criterionSpecificCalibrationEvidenceRequired: true;
    readonly criterionSpecificCalibrationProtocolRequired: true;
    readonly calibratedDecisionThresholdRequiredBeforeCriterionState: true;
    readonly automaticCriterionStateAuthorized: false;
  };
  readonly neutralMetricDefinitionsReviewed: 1;
  readonly neutralMetricValuesReviewed: 0;
  readonly researchCandidateMetricRefsListed: 1;
  readonly traditionalMetricBindingsIssued: 0;
  readonly calibrationRefsIssued: 0;
  readonly thresholdRefsIssued: 0;
  readonly anatomicalRolesIssued: 0;
  readonly crossContourCorrespondencePairsIssued: 0;
  readonly thicknessMetricIssued: false;
  readonly physicalAnthropometricInterpretationAuthorized: false;
  readonly morphologyProduced: false;
  readonly criterionStatesIssued: 0;
  readonly claimsIssued: 0;
  readonly traditionalSemanticAuthority: false;
  readonly resolvedProcessGap: 'lips_substantial_role_free_separation_metric_traditional_binding_not_reviewed';
  readonly newlyExposedPrerequisiteBlockers: readonly [
    'lips_substantial_role_free_separation_metric_construct_validity_requirements_not_reviewed',
    'lips_substantial_role_free_separation_metric_construct_validity_evidence_absent',
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
    readonly researchCandidateInventoryMeansTraditionalBinding: false;
    readonly roleFreeWholeContourSeparationMeansLipThickness: false;
    readonly canonicalMetricPlaneDistanceMeansPhysicalLipThickness: false;
    readonly nearestSetDistanceMeansCrossContourCorrespondence: false;
    readonly metricRuntimeAvailabilityMeansConstructValidity: false;
    readonly unverifiedOcrMeansScanCheckedSource: false;
    readonly researchMethodologyMeansProductionAuthority: false;
    readonly sourceConceptMeansNumericThreshold: false;
    readonly bindingFeasibilityReviewMeansCriterionState: false;
  };
  readonly prohibitedShortcuts: readonly [
    'research_candidate_metric_to_traditional_binding',
    'role_free_arclength_mean_separation_to_lip_thickness',
    'canonical_metric_plane_distance_to_physical_lip_thickness',
    'nearest_set_distance_to_cross_contour_correspondence_pair',
    'fr98_metric_value_to_traditional_duan_hou_semantics',
    'unverified_ocr_to_scan_checked_source',
    'research_methodology_to_production_authority',
    'source_concept_to_uncalibrated_threshold',
    'binding_feasibility_review_to_criterion_state',
  ];
  readonly recommendedNextFrontier: {
    readonly frontierKey: 'lips_substantial_role_free_separation_metric_construct_validity_requirements_review';
    readonly purpose: 'define the evidence and study requirements needed to test whether the admitted neutral role-free separation metric can serve as a criterion-specific research proxy, without issuing anatomical thickness, traditional binding, calibration thresholds, or criterion states';
    readonly sourceScanVerificationStillRequired: true;
    readonly neutralProxyResearchProtocolMayBeReviewedNext: true;
    readonly anatomicalThicknessMetricIssuanceAllowed: false;
    readonly traditionalBindingIssuanceAllowed: false;
    readonly calibrationThresholdIssuanceAllowed: false;
    readonly criterionStateIssuanceAllowed: false;
  };
}

const ISSUED = new WeakSet<object>();
let CACHED: LipsSubstantialRoleFreeSeparationTraditionalBindingFeasibilityReviewFR99V1 | null = null;

const NEW_BLOCKERS = Object.freeze([
  'lips_substantial_role_free_separation_metric_construct_validity_requirements_not_reviewed',
  'lips_substantial_role_free_separation_metric_construct_validity_evidence_absent',
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
  'research_candidate_metric_to_traditional_binding',
  'role_free_arclength_mean_separation_to_lip_thickness',
  'canonical_metric_plane_distance_to_physical_lip_thickness',
  'nearest_set_distance_to_cross_contour_correspondence_pair',
  'fr98_metric_value_to_traditional_duan_hou_semantics',
  'unverified_ocr_to_scan_checked_source',
  'research_methodology_to_production_authority',
  'source_concept_to_uncalibrated_threshold',
  'binding_feasibility_review_to_criterion_state',
] as const);

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-99 ${message}`);
}

function validatePriorTraditionalReview(): void {
  const fr81 = reviewFiveOfficerMouthMetricBindingsFR81();
  assertIssuedFiveOfficerMouthMetricBindingReviewFR81(fr81);
  const criterion = fr81.criterionReviews.find((item) => item.criterionId === CRITERION_ID);
  if (
    fr81.authorityState !== 'traditional_metric_binding_review_completed_no_binding_admitted' ||
    fr81.traditionalSource.passageId !== 'passage.shenxiang.five_officers.intake' ||
    fr81.traditionalSource.originalText !== '口須要方大，唇紅端厚，角弓，開大合小，乃為出納官成。' ||
    fr81.traditionalSource.verificationStatus !== 'unverified_ocr' ||
    fr81.traditionalSource.methodologyReviewStatus !== 'research' ||
    criterion === undefined ||
    criterion.sourceConcept !== SOURCE_CONCEPT ||
    criterion.modality !== 'static_geometry' ||
    criterion.staticV1Eligible !== true ||
    criterion.candidateNeutralMetricRefs.length !== 0 ||
    criterion.candidateRelation !== 'no_applicable_neutral_metric_admitted' ||
    criterion.traditionalMetricBindingRef !== null ||
    criterion.calibrationRef !== null ||
    criterion.thresholdRef !== null ||
    criterion.bindingDecision !== 'not_admitted' ||
    criterion.automaticCriterionStateAuthorized !== false ||
    !criterion.missingAuthority.includes('outer_inner_lip_anatomical_roles') ||
    !criterion.missingAuthority.includes('lip_thickness_metric_definition') ||
    !criterion.missingAuthority.includes('scan_checked_traditional_source') ||
    !criterion.missingAuthority.includes('criterion_specific_calibration_evidence') ||
    !criterion.missingAuthority.includes('criterion_specific_calibration_protocol') ||
    !criterion.missingAuthority.includes('calibrated_decision_threshold') ||
    fr81.bindingSummary.traditionalMetricBindingsIssued !== 0 ||
    fr81.bindingSummary.criterionStatesIssued !== 0 ||
    fr81.bindingSummary.traditionalSemanticAuthority !== false
  ) fail('FR-81 lips-substantial source or prior binding authority drift.');
}

function validateCorrespondenceBoundary(): void {
  const fr86 = reviewRoleFreeCrossContourCorrespondenceFeasibilityFR86();
  assertIssuedRoleFreeCrossContourCorrespondenceFeasibilityReviewFR86(fr86);
  if (
    fr86.authorityState !== 'role_free_cross_contour_correspondence_feasibility_review_completed_no_method_admitted' ||
    fr86.feasibilityDecision.correspondenceMethodAdmitted !== false ||
    fr86.feasibilityDecision.correspondencePairsIssued !== 0 ||
    fr86.feasibilityDecision.pointCorrespondenceRequiredBeforeThicknessInterpretation !== true ||
    fr86.authorityBoundary.setDistanceMeansLipThickness !== false ||
    fr86.authorityBoundary.neutralGeometryMeansTraditionalDuanHou !== false ||
    fr86.thicknessMetricIssued !== false ||
    fr86.traditionalSemanticAuthority !== false
  ) fail('FR-86 correspondence or thickness boundary drift.');
}

function validateNeutralMetricDefinition(): void {
  const fr97 = reviewRoleFreeArclengthMeanNeutralMetricDefinitionFR97();
  assertIssuedRoleFreeArclengthMeanNeutralMetricDefinitionReviewFR97(fr97);
  if (
    fr97.metricDefinition.metricRef !== METRIC_REF ||
    fr97.metricDefinition.region !== 'mouth' ||
    fr97.metricDefinition.coordinateFrame !== 'pose_normalized_face_2d' ||
    fr97.metricDefinition.unit !== 'canonical_metric_plane_distance' ||
    fr97.metricDefinition.formula !== 'certified symmetric arclength mean nearest-set distance between two unordered pose-normalized contour cycles' ||
    fr97.metricDefinition.contourRoleSemantics !== 'unordered_role_free_contour_pair' ||
    fr97.metricDefinition.outerInnerAnatomicalRoleRequired !== false ||
    fr97.metricDefinition.explicitPointPairCorrespondenceRequired !== false ||
    fr97.metricDefinition.physicalAnthropometricInterpretationAllowed !== false ||
    fr97.metricDefinition.thicknessInterpretationAllowed !== false ||
    fr97.metricDefinition.traditionalCriterionBindingRef !== null ||
    fr97.metricDefinition.calibrationRef !== null ||
    fr97.metricDefinition.thresholdRef !== null ||
    fr97.reviewDecision.neutralMetricDefinitionAdmitted !== true ||
    fr97.reviewDecision.thicknessSemanticAssignmentAuthorized !== false ||
    fr97.reviewDecision.traditionalSemanticAssignmentAuthorized !== false ||
    fr97.neutralMetricDefinitionsIssued !== 1 ||
    fr97.thicknessMetricIssued !== false ||
    fr97.traditionalSemanticAuthority !== false
  ) fail('FR-97 neutral metric definition authority drift.');
}

function validateFR98RuntimeSurface(): void {
  if (
    typeof bindIssuedFR96ToNeutralMetricValueFR98 !== 'function' ||
    typeof assertIssuedGovernedRoleFreeArclengthMeanNeutralMetricFR98 !== 'function'
  ) fail('FR-98 neutral metric value binding runtime surface is unavailable.');
}

export function reviewLipsSubstantialRoleFreeSeparationTraditionalBindingFeasibilityFR99(): LipsSubstantialRoleFreeSeparationTraditionalBindingFeasibilityReviewFR99V1 {
  if (CACHED !== null) return CACHED;
  validatePriorTraditionalReview();
  validateCorrespondenceBoundary();
  validateNeutralMetricDefinition();
  validateFR98RuntimeSurface();

  const result: LipsSubstantialRoleFreeSeparationTraditionalBindingFeasibilityReviewFR99V1 = Object.freeze({
    schemaVersion: 'fr99-lips-substantial-role-free-separation-traditional-binding-feasibility-review-v1' as const,
    artifactVersion: '0.1.0' as const,
    authorityState: 'lips_substantial_role_free_separation_traditional_binding_feasibility_review_completed_no_binding_admitted' as const,
    upstreamAuthority: Object.freeze({
      fr81PriorTraditionalBindingReviewCompleted: true as const,
      fr81PriorApplicableNeutralMetricCount: 0 as const,
      fr86CorrespondenceFeasibilityReviewCompleted: true as const,
      fr86CorrespondenceMethodAdmitted: false as const,
      fr86PointCorrespondenceRequiredBeforeThicknessInterpretation: true as const,
      fr97NeutralMetricDefinitionAdmitted: true as const,
      fr98NeutralMetricValueBindingRuntimeSurfaceAvailable: true as const,
      fr98IssuedArtifactStillRequiredForAnyMetricValue: true as const,
    }),
    traditionalTarget: Object.freeze({
      criterionId: CRITERION_ID,
      sourceConcept: SOURCE_CONCEPT,
      modality: 'static_geometry' as const,
      staticV1Eligible: true as const,
      existingOperationalizationNote: 'neutral-mouth capture에서 lip thickness 후보.' as const,
      passageId: 'passage.shenxiang.five_officers.intake' as const,
      originalText: '口須要方大，唇紅端厚，角弓，開大合小，乃為出納官成。' as const,
      verificationStatus: 'unverified_ocr' as const,
      methodologyReviewStatus: 'research' as const,
      requiredForTraditionalFormation: true as const,
    }),
    candidateNeutralMetric: Object.freeze({
      metricRef: METRIC_REF,
      relationClass: 'role_free_whole_contour_separation_proxy_candidate_only' as const,
      researchCandidateInventoryAdmitted: true as const,
      coordinateFrame: 'pose_normalized_face_2d' as const,
      unit: 'canonical_metric_plane_distance' as const,
      formula: 'certified symmetric arclength mean nearest-set distance between two unordered pose-normalized contour cycles' as const,
      contourRoleSemantics: 'unordered_role_free_contour_pair' as const,
      explicitPointPairCorrespondenceRequiredByMetric: false as const,
      outerInnerAnatomicalRoleRequiredByMetric: false as const,
      physicalAnthropometricInterpretationAllowedByMetric: false as const,
      thicknessInterpretationAllowedByMetric: false as const,
      directTraditionalConstructMatchEstablished: false as const,
      anatomicalLipThicknessMeasurementEstablished: false as const,
      physicalLipThicknessMeasurementEstablished: false as const,
      traditionalMetricBindingRef: null,
      calibrationRef: null,
      thresholdRef: null,
    }),
    feasibilityDecision: Object.freeze({
      candidateMetricMayBeListedForResearchReview: true as const,
      traditionalMetricBindingAdmitted: false as const,
      bindingDecision: 'not_admitted' as const,
      reason: 'role_free_set_separation_is_not_authorized_anatomical_lip_thickness_and_traditional_source_construct_validity_calibration_authority_remain_missing' as const,
      neutralProxyCandidateMeansThicknessMetric: false as const,
      neutralProxyCandidateMeansTraditionalBinding: false as const,
      scanCheckedSourceRequiredBeforeTraditionalBinding: true as const,
      constructValidityEvidenceRequiredBeforeProxyBinding: true as const,
      criterionSpecificCalibrationEvidenceRequired: true as const,
      criterionSpecificCalibrationProtocolRequired: true as const,
      calibratedDecisionThresholdRequiredBeforeCriterionState: true as const,
      automaticCriterionStateAuthorized: false as const,
    }),
    neutralMetricDefinitionsReviewed: 1 as const,
    neutralMetricValuesReviewed: 0 as const,
    researchCandidateMetricRefsListed: 1 as const,
    traditionalMetricBindingsIssued: 0 as const,
    calibrationRefsIssued: 0 as const,
    thresholdRefsIssued: 0 as const,
    anatomicalRolesIssued: 0 as const,
    crossContourCorrespondencePairsIssued: 0 as const,
    thicknessMetricIssued: false as const,
    physicalAnthropometricInterpretationAuthorized: false as const,
    morphologyProduced: false as const,
    criterionStatesIssued: 0 as const,
    claimsIssued: 0 as const,
    traditionalSemanticAuthority: false as const,
    resolvedProcessGap: 'lips_substantial_role_free_separation_metric_traditional_binding_not_reviewed' as const,
    newlyExposedPrerequisiteBlockers: NEW_BLOCKERS,
    remainingBlockers: REMAINING,
    authorityBoundary: Object.freeze({
      researchCandidateInventoryMeansTraditionalBinding: false as const,
      roleFreeWholeContourSeparationMeansLipThickness: false as const,
      canonicalMetricPlaneDistanceMeansPhysicalLipThickness: false as const,
      nearestSetDistanceMeansCrossContourCorrespondence: false as const,
      metricRuntimeAvailabilityMeansConstructValidity: false as const,
      unverifiedOcrMeansScanCheckedSource: false as const,
      researchMethodologyMeansProductionAuthority: false as const,
      sourceConceptMeansNumericThreshold: false as const,
      bindingFeasibilityReviewMeansCriterionState: false as const,
    }),
    prohibitedShortcuts: PROHIBITED,
    recommendedNextFrontier: Object.freeze({
      frontierKey: 'lips_substantial_role_free_separation_metric_construct_validity_requirements_review' as const,
      purpose: 'define the evidence and study requirements needed to test whether the admitted neutral role-free separation metric can serve as a criterion-specific research proxy, without issuing anatomical thickness, traditional binding, calibration thresholds, or criterion states' as const,
      sourceScanVerificationStillRequired: true as const,
      neutralProxyResearchProtocolMayBeReviewedNext: true as const,
      anatomicalThicknessMetricIssuanceAllowed: false as const,
      traditionalBindingIssuanceAllowed: false as const,
      calibrationThresholdIssuanceAllowed: false as const,
      criterionStateIssuanceAllowed: false as const,
    }),
  });

  ISSUED.add(result);
  CACHED = result;
  return result;
}

export function assertIssuedLipsSubstantialRoleFreeSeparationTraditionalBindingFeasibilityReviewFR99(
  value: LipsSubstantialRoleFreeSeparationTraditionalBindingFeasibilityReviewFR99V1,
): void {
  if (!ISSUED.has(value as object)) fail('review object was not issued by the active FR-99 boundary.');
  if (
    value.schemaVersion !== 'fr99-lips-substantial-role-free-separation-traditional-binding-feasibility-review-v1' ||
    value.authorityState !== 'lips_substantial_role_free_separation_traditional_binding_feasibility_review_completed_no_binding_admitted' ||
    value.candidateNeutralMetric.metricRef !== METRIC_REF ||
    value.candidateNeutralMetric.researchCandidateInventoryAdmitted !== true ||
    value.candidateNeutralMetric.directTraditionalConstructMatchEstablished !== false ||
    value.feasibilityDecision.traditionalMetricBindingAdmitted !== false ||
    value.traditionalMetricBindingsIssued !== 0 ||
    value.calibrationRefsIssued !== 0 ||
    value.thresholdRefsIssued !== 0 ||
    value.anatomicalRolesIssued !== 0 ||
    value.crossContourCorrespondencePairsIssued !== 0 ||
    value.thicknessMetricIssued !== false ||
    value.morphologyProduced !== false ||
    value.criterionStatesIssued !== 0 ||
    value.claimsIssued !== 0 ||
    value.traditionalSemanticAuthority !== false ||
    value.recommendedNextFrontier.frontierKey !== 'lips_substantial_role_free_separation_metric_construct_validity_requirements_review'
  ) fail('issued FR-99 traditional binding feasibility authority drift.');
}
