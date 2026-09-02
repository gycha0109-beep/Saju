import {
  FACE_FR3_METHOD_REFS_V0,
  FACE_FR3_METHODOLOGIES_V0,
  FACE_FR3_PASSAGES_V0,
  FIVE_OFFICER_CRITERIA_V0,
  type FiveOfficerCriterionModality,
} from './five-officers-six-fus-research-v0.js';
import { FACE_CALIBRATION_EVIDENCE_RESEARCH_V0 } from './calibration-authority.js';
import { FACE_NOSE_BRIDGE_CALIBRATION_PROTOCOL_RESEARCH_V0 } from './calibration-protocol.js';
import { FR14_NEUTRAL_CONSUMER_SLOTS } from './neutral-provider-binding-contract-fr14.js';
import {
  validateMediaPipeWebMetricGeometryGapFR69,
  type MediaPipeWebMetricGeometryGapFR69V1,
} from './mediapipe-web-metric-geometry-gap-fr69.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR70_INTAKE_CRITERION_IDS = Object.freeze([
  'criterion.intake.square_broad',
  'criterion.intake.lips_substantial',
  'criterion.intake.corners_arched',
  'criterion.intake.open_close_relation',
  'criterion.intake.red_lip_color',
] as const);

export type FR70IntakeCriterionId = (typeof FR70_INTAKE_CRITERION_IDS)[number];

export interface FiveOfficerMouthCriterionAdmissionFR70V1 {
  readonly criterionId: FR70IntakeCriterionId;
  readonly sourceConcept: string;
  readonly modality: FiveOfficerCriterionModality;
  readonly requiredForTraditionalFormation: true;
  readonly staticV1Eligible: boolean;
  readonly operationalizationState: 'candidate_note_only' | 'capture_or_dynamic_blocked';
  readonly metricBindingRef: null;
  readonly calibrationRef: null;
  readonly automaticCriterionStateAuthorized: false;
}

export interface FiveOfficerMouthCriterionAuthorityGapFR70V1 {
  readonly schemaVersion: 'fr70-five-officers-mouth-criterion-authority-gap-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'research_source_and_static_candidate_authority_only';
  readonly upstream: {
    readonly fr69SchemaVersion: 'fr69-mediapipe-web-metric-geometry-gap-v1';
    readonly fr69AuthorityState: 'release_exact_web_metric_geometry_surface_gap';
    readonly metricLipsGeometryIssued: false;
    readonly poseNormalizedLipsGeometryIssued: false;
    readonly neutralMetricDefinitionsIssued: 0;
    readonly criterionStatesIssued: 0;
    readonly traditionalSemanticAuthority: false;
  };
  readonly traditionalSource: {
    readonly passageId: 'passage.shenxiang.five_officers.intake';
    readonly verificationStatus: 'unverified_ocr';
    readonly methodologyRef: 'method.shenxiang.five_officers@0.1.0';
    readonly methodologyReviewStatus: 'research';
    readonly traditionalOfficerName: '出納官';
    readonly anatomicalTarget: 'mouth';
  };
  readonly baseNeutralContract: {
    readonly consumerSlots: readonly [
      'neutral.face.brow_midline',
      'neutral.face.nose_region',
      'neutral.face.left_brow_region',
      'neutral.face.right_brow_region',
      'neutral.face.left_eye_region',
      'neutral.face.right_eye_region',
    ];
    readonly mouthConsumerSlotIssued: false;
  };
  readonly criterionAdmissions: readonly FiveOfficerMouthCriterionAdmissionFR70V1[];
  readonly calibrationInventory: {
    readonly criterionSpecificEvidenceRefs: readonly [];
    readonly criterionSpecificProtocolRefs: readonly [];
    readonly criterionSpecificStudyRefs: readonly [];
    readonly productionAuthorizedCalibrationCount: 0;
  };
  readonly existingResearchEvaluator: {
    readonly acceptsCallerSuppliedCriterionStates: true;
    readonly generatesCriterionStatesFromGeometry: false;
    readonly productionCriterionStateAuthority: false;
    readonly researchClaimBuilderProductionAuthorized: false;
  };
  readonly mouthMetricBindingReviewed: false;
  readonly mouthStaticThresholdsCalibrated: false;
  readonly morphologyProduced: false;
  readonly criterionStatesIssued: 0;
  readonly claimsIssued: 0;
  readonly traditionalFormationAuthorized: false;
  readonly traditionalSemanticAuthority: false;
  readonly authorityBoundary: {
    readonly staticV1EligibleMeansExecutableOperationalization: false;
    readonly operationalizationNoteMeansMetricDefinition: false;
    readonly genericCalibrationFrameworkMeansCriterionCalibration: false;
    readonly callerSuppliedResearchStateMeansGeneratedState: false;
    readonly researchStaticSupportMeansTraditionalFormation: false;
    readonly unverifiedOcrMeansProductionSourceAuthority: false;
    readonly canonicalImageLipsGeometryMeansPoseNormalizedGeometry: false;
    readonly normalizedLandmarkZMeansLipThickness: false;
    readonly unorderedLipContoursMeanOuterInnerAnatomy: false;
    readonly geometryMeansHumanLabelAssertion: false;
  };
  readonly remainingBlockers: readonly [
    'fr69_metric_lips_geometry_not_issued',
    'fr69_pose_normalized_lips_geometry_not_issued',
    'fr15_mouth_consumer_slot_not_issued',
    'intake_source_not_scan_checked',
    'five_officers_methodology_research_only',
    'mouth_metric_binding_not_reviewed',
    'mouth_calibration_evidence_absent',
    'mouth_calibration_protocol_absent',
    'mouth_static_thresholds_not_calibrated',
    'outer_inner_lip_roles_not_authorized',
    'capture_sensitive_intake_criteria_not_authorized',
    'dynamic_lip_color_not_authorized',
  ];
  readonly prohibitedShortcuts: readonly [
    'static_v1_eligible_to_automatic_criterion_state',
    'operationalization_note_to_executable_metric',
    'generic_calibration_framework_to_criterion_specific_threshold',
    'research_ocr_source_to_production_authority',
    'caller_supplied_research_state_to_cv_generated_state',
    'mouth_contour_geometry_to_square_broad',
    'unordered_lips_contours_to_lips_substantial',
    'normalized_landmark_z_to_lip_thickness',
    'partial_static_support_to_traditional_formation',
    'geometry_to_human_label_assertion',
  ];
}

const EXPECTED_CRITERIA = Object.freeze([
  Object.freeze({
    criterionId: 'criterion.intake.square_broad' as const,
    sourceConcept: '方大',
    modality: 'static_geometry' as const,
    staticV1Eligible: true,
  }),
  Object.freeze({
    criterionId: 'criterion.intake.lips_substantial' as const,
    sourceConcept: '端厚',
    modality: 'static_geometry' as const,
    staticV1Eligible: true,
  }),
  Object.freeze({
    criterionId: 'criterion.intake.corners_arched' as const,
    sourceConcept: '角弓',
    modality: 'capture_sensitive' as const,
    staticV1Eligible: false,
  }),
  Object.freeze({
    criterionId: 'criterion.intake.open_close_relation' as const,
    sourceConcept: '開大合小',
    modality: 'capture_sensitive' as const,
    staticV1Eligible: false,
  }),
  Object.freeze({
    criterionId: 'criterion.intake.red_lip_color' as const,
    sourceConcept: '唇紅',
    modality: 'dynamic_appearance' as const,
    staticV1Eligible: false,
  }),
] as const);

const REQUIRED_BLOCKERS = Object.freeze([
  'fr69_metric_lips_geometry_not_issued',
  'fr69_pose_normalized_lips_geometry_not_issued',
  'fr15_mouth_consumer_slot_not_issued',
  'intake_source_not_scan_checked',
  'five_officers_methodology_research_only',
  'mouth_metric_binding_not_reviewed',
  'mouth_calibration_evidence_absent',
  'mouth_calibration_protocol_absent',
  'mouth_static_thresholds_not_calibrated',
  'outer_inner_lip_roles_not_authorized',
  'capture_sensitive_intake_criteria_not_authorized',
  'dynamic_lip_color_not_authorized',
] as const);

const REQUIRED_SHORTCUTS = Object.freeze([
  'static_v1_eligible_to_automatic_criterion_state',
  'operationalization_note_to_executable_metric',
  'generic_calibration_framework_to_criterion_specific_threshold',
  'research_ocr_source_to_production_authority',
  'caller_supplied_research_state_to_cv_generated_state',
  'mouth_contour_geometry_to_square_broad',
  'unordered_lips_contours_to_lips_substantial',
  'normalized_landmark_z_to_lip_thickness',
  'partial_static_support_to_traditional_formation',
  'geometry_to_human_label_assertion',
] as const);

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-70 ${message}`);
}

function sameSequence<T>(actual: readonly T[], expected: readonly T[]): boolean {
  return actual.length === expected.length && actual.every((value, index) => value === expected[index]);
}

function validateCurrentResearchAuthorityInputs(): void {
  const passage = FACE_FR3_PASSAGES_V0.find((item) => item.passageId === 'passage.shenxiang.five_officers.intake');
  if (passage === undefined || passage.verificationStatus !== 'unverified_ocr') {
    fail('intake source authority drift; FR-70 requires the current unverified_ocr witness state.');
  }

  const methodology = FACE_FR3_METHODOLOGIES_V0.find(
    (item) => `${item.methodologyId}@${item.version}` === FACE_FR3_METHOD_REFS_V0.shenxiangFiveOfficers,
  );
  if (
    methodology === undefined ||
    methodology.reviewStatus !== 'research' ||
    !methodology.sourceRefs.includes('passage.shenxiang.five_officers.intake')
  ) {
    fail('Five Officers methodology authority drift.');
  }

  const intakeCriteria = FIVE_OFFICER_CRITERIA_V0.filter((item) => item.officerKey === 'intake');
  if (!sameSequence(intakeCriteria.map((item) => item.criterionId), FR70_INTAKE_CRITERION_IDS)) {
    fail('intake criterion registry drift.');
  }
  intakeCriteria.forEach((criterion, index) => {
    const expected = EXPECTED_CRITERIA[index]!;
    if (
      criterion.criterionId !== expected.criterionId ||
      criterion.traditionalOfficerName !== '出納官' ||
      criterion.anatomicalTarget !== 'mouth' ||
      criterion.sourceConcept !== expected.sourceConcept ||
      criterion.modality !== expected.modality ||
      criterion.requiredForTraditionalFormation !== true ||
      criterion.staticV1Eligible !== expected.staticV1Eligible ||
      !criterion.sourceRefs.includes('passage.shenxiang.five_officers.intake')
    ) {
      fail(`intake criterion authority drift at index ${index}.`);
    }
  });

  if (!sameSequence(FR14_NEUTRAL_CONSUMER_SLOTS, [
    'neutral.face.brow_midline',
    'neutral.face.nose_region',
    'neutral.face.left_brow_region',
    'neutral.face.right_brow_region',
    'neutral.face.left_eye_region',
    'neutral.face.right_eye_region',
  ] as const)) {
    fail('FR-14 neutral consumer-slot contract drift.');
  }

  const intakeCriterionSet = new Set<string>(FR70_INTAKE_CRITERION_IDS);
  const mouthEvidence = FACE_CALIBRATION_EVIDENCE_RESEARCH_V0.evidence.filter((item) =>
    item.criterionRefs.some((criterionRef) => intakeCriterionSet.has(criterionRef)),
  );
  if (mouthEvidence.length !== 0) fail('criterion-specific mouth calibration evidence now exists; FR-70 gap must be re-reviewed.');

  const protocols = FACE_NOSE_BRIDGE_CALIBRATION_PROTOCOL_RESEARCH_V0;
  const mouthSupportArtifacts = protocols.supportArtifacts.filter(
    (item) => item.kind === 'labeling_instruction' && intakeCriterionSet.has(item.criterionId),
  );
  const mouthLabelingProtocols = protocols.labelingProtocols.filter((item) => intakeCriterionSet.has(item.criterionId));
  const mouthStudies = protocols.studies.filter((item) => intakeCriterionSet.has(item.criterionId));
  if (mouthSupportArtifacts.length !== 0 || mouthLabelingProtocols.length !== 0 || mouthStudies.length !== 0) {
    fail('criterion-specific mouth calibration protocol now exists; FR-70 gap must be re-reviewed.');
  }
}

function validateUpstream(gap: MediaPipeWebMetricGeometryGapFR69V1): void {
  validateMediaPipeWebMetricGeometryGapFR69(gap);
  if (
    gap.metricLipsGeometryIssued !== false ||
    gap.poseNormalizedLipsGeometryIssued !== false ||
    gap.neutralMetricDefinitionsIssued !== 0 ||
    gap.morphologyProduced !== false ||
    gap.criterionStatesIssued !== 0 ||
    gap.claimsIssued !== 0 ||
    gap.traditionalSemanticAuthority !== false
  ) {
    fail('cannot consume widened FR-69 geometry, metric, morphology, criterion, claim, or semantic authority.');
  }
  for (const blocker of [
    'outer_inner_lip_roles_not_authorized',
    'mouth_metric_definitions_not_reviewed',
    'mouth_static_thresholds_not_calibrated',
    'five_officers_source_not_scan_checked',
  ] as const) {
    if (!gap.remainingBlockers.includes(blocker)) fail(`FR-69 required blocker missing: ${blocker}.`);
  }
}

function criterionAdmissions(): readonly FiveOfficerMouthCriterionAdmissionFR70V1[] {
  return Object.freeze(EXPECTED_CRITERIA.map((criterion) => Object.freeze({
    criterionId: criterion.criterionId,
    sourceConcept: criterion.sourceConcept,
    modality: criterion.modality,
    requiredForTraditionalFormation: true as const,
    staticV1Eligible: criterion.staticV1Eligible,
    operationalizationState: criterion.staticV1Eligible
      ? 'candidate_note_only' as const
      : 'capture_or_dynamic_blocked' as const,
    metricBindingRef: null,
    calibrationRef: null,
    automaticCriterionStateAuthorized: false as const,
  })));
}

export function admitFiveOfficerMouthCriterionAuthorityGapFR70(
  gap: MediaPipeWebMetricGeometryGapFR69V1,
): FiveOfficerMouthCriterionAuthorityGapFR70V1 {
  validateUpstream(gap);
  validateCurrentResearchAuthorityInputs();

  return Object.freeze({
    schemaVersion: 'fr70-five-officers-mouth-criterion-authority-gap-v1' as const,
    artifactVersion: '0.1.0' as const,
    authorityState: 'research_source_and_static_candidate_authority_only' as const,
    upstream: Object.freeze({
      fr69SchemaVersion: gap.schemaVersion,
      fr69AuthorityState: gap.authorityState,
      metricLipsGeometryIssued: gap.metricLipsGeometryIssued,
      poseNormalizedLipsGeometryIssued: gap.poseNormalizedLipsGeometryIssued,
      neutralMetricDefinitionsIssued: gap.neutralMetricDefinitionsIssued,
      criterionStatesIssued: gap.criterionStatesIssued,
      traditionalSemanticAuthority: gap.traditionalSemanticAuthority,
    }),
    traditionalSource: Object.freeze({
      passageId: 'passage.shenxiang.five_officers.intake' as const,
      verificationStatus: 'unverified_ocr' as const,
      methodologyRef: FACE_FR3_METHOD_REFS_V0.shenxiangFiveOfficers,
      methodologyReviewStatus: 'research' as const,
      traditionalOfficerName: '出納官' as const,
      anatomicalTarget: 'mouth' as const,
    }),
    baseNeutralContract: Object.freeze({
      consumerSlots: Object.freeze([...FR14_NEUTRAL_CONSUMER_SLOTS]) as FiveOfficerMouthCriterionAuthorityGapFR70V1['baseNeutralContract']['consumerSlots'],
      mouthConsumerSlotIssued: false as const,
    }),
    criterionAdmissions: criterionAdmissions(),
    calibrationInventory: Object.freeze({
      criterionSpecificEvidenceRefs: Object.freeze([]) as readonly [],
      criterionSpecificProtocolRefs: Object.freeze([]) as readonly [],
      criterionSpecificStudyRefs: Object.freeze([]) as readonly [],
      productionAuthorizedCalibrationCount: 0 as const,
    }),
    existingResearchEvaluator: Object.freeze({
      acceptsCallerSuppliedCriterionStates: true as const,
      generatesCriterionStatesFromGeometry: false as const,
      productionCriterionStateAuthority: false as const,
      researchClaimBuilderProductionAuthorized: false as const,
    }),
    mouthMetricBindingReviewed: false as const,
    mouthStaticThresholdsCalibrated: false as const,
    morphologyProduced: false as const,
    criterionStatesIssued: 0 as const,
    claimsIssued: 0 as const,
    traditionalFormationAuthorized: false as const,
    traditionalSemanticAuthority: false as const,
    authorityBoundary: Object.freeze({
      staticV1EligibleMeansExecutableOperationalization: false as const,
      operationalizationNoteMeansMetricDefinition: false as const,
      genericCalibrationFrameworkMeansCriterionCalibration: false as const,
      callerSuppliedResearchStateMeansGeneratedState: false as const,
      researchStaticSupportMeansTraditionalFormation: false as const,
      unverifiedOcrMeansProductionSourceAuthority: false as const,
      canonicalImageLipsGeometryMeansPoseNormalizedGeometry: false as const,
      normalizedLandmarkZMeansLipThickness: false as const,
      unorderedLipContoursMeanOuterInnerAnatomy: false as const,
      geometryMeansHumanLabelAssertion: false as const,
    }),
    remainingBlockers: REQUIRED_BLOCKERS,
    prohibitedShortcuts: REQUIRED_SHORTCUTS,
  });
}

export function validateFiveOfficerMouthCriterionAuthorityGapFR70(
  gap: FiveOfficerMouthCriterionAuthorityGapFR70V1,
): FiveOfficerMouthCriterionAuthorityGapFR70V1 {
  validateCurrentResearchAuthorityInputs();
  if (
    gap.schemaVersion !== 'fr70-five-officers-mouth-criterion-authority-gap-v1' ||
    gap.artifactVersion !== '0.1.0' ||
    gap.authorityState !== 'research_source_and_static_candidate_authority_only'
  ) fail('identity/state drift.');

  if (
    gap.upstream.fr69SchemaVersion !== 'fr69-mediapipe-web-metric-geometry-gap-v1' ||
    gap.upstream.fr69AuthorityState !== 'release_exact_web_metric_geometry_surface_gap' ||
    gap.upstream.metricLipsGeometryIssued !== false ||
    gap.upstream.poseNormalizedLipsGeometryIssued !== false ||
    gap.upstream.neutralMetricDefinitionsIssued !== 0 ||
    gap.upstream.criterionStatesIssued !== 0 ||
    gap.upstream.traditionalSemanticAuthority !== false
  ) fail('upstream FR-69 boundary widened.');

  if (
    gap.traditionalSource.passageId !== 'passage.shenxiang.five_officers.intake' ||
    gap.traditionalSource.verificationStatus !== 'unverified_ocr' ||
    gap.traditionalSource.methodologyRef !== FACE_FR3_METHOD_REFS_V0.shenxiangFiveOfficers ||
    gap.traditionalSource.methodologyReviewStatus !== 'research' ||
    gap.traditionalSource.traditionalOfficerName !== '出納官' ||
    gap.traditionalSource.anatomicalTarget !== 'mouth'
  ) fail('traditional source/methodology authority widened.');

  if (
    gap.baseNeutralContract.mouthConsumerSlotIssued !== false ||
    !sameSequence(gap.baseNeutralContract.consumerSlots, FR14_NEUTRAL_CONSUMER_SLOTS)
  ) fail('base neutral consumer-slot authority widened.');

  if (gap.criterionAdmissions.length !== EXPECTED_CRITERIA.length) fail('criterion admission count drift.');
  gap.criterionAdmissions.forEach((criterion, index) => {
    const expected = EXPECTED_CRITERIA[index]!;
    if (
      criterion.criterionId !== expected.criterionId ||
      criterion.sourceConcept !== expected.sourceConcept ||
      criterion.modality !== expected.modality ||
      criterion.requiredForTraditionalFormation !== true ||
      criterion.staticV1Eligible !== expected.staticV1Eligible ||
      criterion.operationalizationState !== (expected.staticV1Eligible ? 'candidate_note_only' : 'capture_or_dynamic_blocked') ||
      criterion.metricBindingRef !== null ||
      criterion.calibrationRef !== null ||
      criterion.automaticCriterionStateAuthorized !== false
    ) fail(`criterion admission authority widened at index ${index}.`);
  });

  if (
    gap.calibrationInventory.criterionSpecificEvidenceRefs.length !== 0 ||
    gap.calibrationInventory.criterionSpecificProtocolRefs.length !== 0 ||
    gap.calibrationInventory.criterionSpecificStudyRefs.length !== 0 ||
    gap.calibrationInventory.productionAuthorizedCalibrationCount !== 0
  ) fail('mouth calibration inventory authority widened.');

  if (
    gap.existingResearchEvaluator.acceptsCallerSuppliedCriterionStates !== true ||
    gap.existingResearchEvaluator.generatesCriterionStatesFromGeometry !== false ||
    gap.existingResearchEvaluator.productionCriterionStateAuthority !== false ||
    gap.existingResearchEvaluator.researchClaimBuilderProductionAuthorized !== false ||
    gap.mouthMetricBindingReviewed !== false ||
    gap.mouthStaticThresholdsCalibrated !== false ||
    gap.morphologyProduced !== false ||
    gap.criterionStatesIssued !== 0 ||
    gap.claimsIssued !== 0 ||
    gap.traditionalFormationAuthorized !== false ||
    gap.traditionalSemanticAuthority !== false
  ) fail('metric, evaluator, morphology, criterion, claim, or semantic authority widened.');

  if (Object.values(gap.authorityBoundary).some((value) => value !== false)) {
    fail('authority boundary must remain fully fail-closed.');
  }
  if (!sameSequence(gap.remainingBlockers, REQUIRED_BLOCKERS)) fail('remaining blockers drift.');
  if (!sameSequence(gap.prohibitedShortcuts, REQUIRED_SHORTCUTS)) fail('prohibited shortcuts drift.');

  return gap;
}

export function assertAutomaticMouthCriterionStatesAuthorizedFR70(
  gap: FiveOfficerMouthCriterionAuthorityGapFR70V1,
): never {
  validateFiveOfficerMouthCriterionAuthorityGapFR70(gap);
  return fail('automatic mouth criterion states are not authorized.');
}
