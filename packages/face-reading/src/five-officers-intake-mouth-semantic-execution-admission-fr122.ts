import type { FiveOfficerCriterionModality } from './five-officers-six-fus-research-v0.js';
import { FIVE_OFFICER_CRITERIA_V0 } from './five-officers-six-fus-research-v0.js';
import {
  FIVE_OFFICER_CRITERIA_FR121_WITNESS_QUALIFIED,
} from './five-officers-intake-criterion-definition-witness-qualified-source-rebind-implementation-fr121.js';
import { FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY } from './five-officers-intake-criterion-methodology-witness-qualified-registry-admission-implementation-fr119.js';
import {
  assertIssuedFiveOfficerSquareBroadCombinedMetricBindingFR83,
  reviewFiveOfficerSquareBroadCombinedMetricBindingFR83,
} from './five-officers-square-broad-combined-binding-review-fr83.js';
import {
  assertIssuedLipsSubstantialRoleFreeSeparationTraditionalBindingFeasibilityReviewFR99,
  reviewLipsSubstantialRoleFreeSeparationTraditionalBindingFeasibilityFR99,
} from './lips-substantial-role-free-separation-traditional-binding-feasibility-review-fr99.js';
import { FaceAuthorityValidationError, validateFaceAuthorityRegistry } from './validation.js';

const HISTORICAL_PASSAGE_REF = 'passage.shenxiang.five_officers.intake' as const;
const WITNESS_QUALIFIED_PASSAGE_REF = 'passage.shenxiang.five_officers.intake.nlc_1925' as const;
const SUCCESSOR_METHODOLOGY_REF = 'method.shenxiang.five_officers.intake_criteria@0.2.0' as const;
const DEFINITION_SET_ID = 'criteria.shenxiang.five_officers.fr121_witness_qualified' as const;
const SQUARE_BROAD = 'criterion.intake.square_broad' as const;
const LIPS_SUBSTANTIAL = 'criterion.intake.lips_substantial' as const;
const CORNERS_ARCHED = 'criterion.intake.corners_arched' as const;
const OPEN_CLOSE = 'criterion.intake.open_close_relation' as const;
const RED_LIP_COLOR = 'criterion.intake.red_lip_color' as const;
const INTAKE_CRITERION_IDS = Object.freeze([
  SQUARE_BROAD,
  LIPS_SUBSTANTIAL,
  CORNERS_ARCHED,
  OPEN_CLOSE,
  RED_LIP_COLOR,
] as const);

const SQUARE_BROAD_METRICS = Object.freeze([
  'neutral.mouth.contour_set.bounding_box_aspect_ratio@0.1.0',
  'neutral.mouth.contour_set.horizontal_span_to_full_mesh_horizontal_span_ratio@0.1.0',
] as const);
const LIPS_SUBSTANTIAL_METRICS = Object.freeze([
  'neutral.mouth.contour_set.symmetric_arclength_mean_nearest_set_distance@0.1.0',
] as const);

export type IntakeCriterionIdFR122 = typeof INTAKE_CRITERION_IDS[number];
export type MouthSemanticAdmissionStateFR122 = 'blocked';

export interface MouthCriterionSemanticExecutionReadinessFR122V1 {
  readonly criterionId: IntakeCriterionIdFR122;
  readonly sourceConcept: string;
  readonly modality: FiveOfficerCriterionModality;
  readonly staticV1Eligible: boolean;
  readonly witnessQualifiedSourceRef: typeof WITNESS_QUALIFIED_PASSAGE_REF;
  readonly machineObservationPath: {
    readonly state: 'existing_neutral_metric_path' | 'not_admissible_for_static_v1';
    readonly metricRefs: readonly string[];
  };
  readonly traditionalMetricBindingAuthorized: false;
  readonly calibratedThresholdAuthorized: false;
  readonly machineCriterionStateAuthorized: false;
  readonly semanticSliceAuthorized: false;
  readonly blockers: readonly string[];
}

export interface FiveOfficerIntakeMouthSemanticExecutionAdmissionFR122V1 {
  readonly schemaVersion: 'fr122-five-officers-intake-mouth-semantic-execution-admission-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'mouth_semantic_vertical_slice_blocked_no_authoritative_machine_criterion_state';
  readonly definitionSetId: typeof DEFINITION_SET_ID;
  readonly provenance: {
    readonly witnessQualifiedPassageRef: typeof WITNESS_QUALIFIED_PASSAGE_REF;
    readonly witnessQualifiedPassageVerificationStatus: 'scan_checked';
    readonly successorMethodologyRef: typeof SUCCESSOR_METHODOLOGY_REF;
    readonly successorMethodologyReviewStatus: 'research';
    readonly historicalPassageRetained: true;
    readonly historicalCriterionDefinitionsRetained: true;
    readonly semanticIdentityEquivalenceAsserted: false;
  };
  readonly criterionReadiness: readonly MouthCriterionSemanticExecutionReadinessFR122V1[];
  readonly executableCriterionId: null;
  readonly closestStaticCandidateCriterionId: typeof SQUARE_BROAD;
  readonly execution: {
    readonly observationAdaptersIssued: 0;
    readonly deterministicCriterionEvaluatorsIssued: 0;
    readonly criterionStatesIssued: 0;
    readonly structuredClaimsIssued: 0;
    readonly boundedNarrativesIssued: 0;
    readonly traditionalFormationAuthorized: false;
    readonly traditionalSemanticAuthority: false;
  };
  readonly authorityBoundary: {
    readonly witnessQualifiedSourceMeansMetricBinding: false;
    readonly neutralMetricMeansTraditionalSourceConcept: false;
    readonly runtimeMetricValueMeansCriterionState: false;
    readonly staticV1EligibleMeansExecutable: false;
    readonly researchMethodologyMeansExecutionAuthority: false;
    readonly captureSensitiveCriterionMayUseStaticV1Shortcut: false;
    readonly dynamicColorMayUseStaticGeometryShortcut: false;
    readonly llmMayClassifyCriterion: false;
    readonly llmMayGenerateClaimWithoutCriterionState: false;
  };
  readonly nextFrontier: 'square_broad_metric_to_source_operationalization_and_calibration_authority';
}

const ISSUED = new WeakSet<object>();
let CACHED: FiveOfficerIntakeMouthSemanticExecutionAdmissionFR122V1 | null = null;

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-122 ${message}`);
}

function sameSequence<T>(actual: readonly T[], expected: readonly T[]): boolean {
  return actual.length === expected.length && actual.every((value, index) => value === expected[index]);
}

function validateFR121Persistence(): void {
  validateFaceAuthorityRegistry(FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY);
  const historicalIntake = FIVE_OFFICER_CRITERIA_V0.filter((criterion) => criterion.officerKey === 'intake');
  const currentIntake = FIVE_OFFICER_CRITERIA_FR121_WITNESS_QUALIFIED.filter((criterion) => criterion.officerKey === 'intake');
  const historicalNonIntake = FIVE_OFFICER_CRITERIA_V0.filter((criterion) => criterion.officerKey !== 'intake');
  const currentNonIntake = FIVE_OFFICER_CRITERIA_FR121_WITNESS_QUALIFIED.filter((criterion) => criterion.officerKey !== 'intake');

  if (
    historicalIntake.length !== 5 ||
    currentIntake.length !== 5 ||
    !sameSequence(currentIntake.map((criterion) => criterion.criterionId), INTAKE_CRITERION_IDS) ||
    historicalIntake.some((criterion) => !sameSequence(criterion.sourceRefs, [HISTORICAL_PASSAGE_REF])) ||
    currentIntake.some((criterion) => !sameSequence(criterion.sourceRefs, [WITNESS_QUALIFIED_PASSAGE_REF])) ||
    historicalNonIntake.length !== currentNonIntake.length ||
    historicalNonIntake.some((criterion, index) => criterion !== currentNonIntake[index])
  ) fail('FR-121 derived criterion-set persistence drift.');

  const passage = FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY.passages.find(
    (entry) => entry.passageId === WITNESS_QUALIFIED_PASSAGE_REF,
  );
  const methodology = FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY.methodologies.find(
    (entry) => `${entry.methodologyId}@${entry.version}` === SUCCESSOR_METHODOLOGY_REF,
  );
  if (
    passage === undefined ||
    passage.verificationStatus !== 'scan_checked' ||
    passage.witnessId !== 'witness.shenxiang_quanbian.nlc_1925' ||
    methodology === undefined ||
    methodology.reviewStatus !== 'research' ||
    !sameSequence(methodology.sourceRefs, [WITNESS_QUALIFIED_PASSAGE_REF])
  ) fail('witness-qualified passage or successor methodology provenance drift.');
}

function validateExistingMouthBindingBoundaries(): void {
  const squareBroad = reviewFiveOfficerSquareBroadCombinedMetricBindingFR83();
  assertIssuedFiveOfficerSquareBroadCombinedMetricBindingFR83(squareBroad);
  if (
    !sameSequence(squareBroad.candidateNeutralMetrics.map((entry) => entry.metricRef), SQUARE_BROAD_METRICS) ||
    squareBroad.combinedReview.traditionalFangSemanticsOperationalized !== false ||
    squareBroad.combinedReview.traditionalDaSemanticsOperationalized !== false ||
    squareBroad.combinedReview.compoundFangDaOperationalized !== false ||
    squareBroad.combinedReview.traditionalMetricBindingRef !== null ||
    squareBroad.combinedReview.thresholdRef !== null ||
    squareBroad.combinedReview.automaticCriterionStateAuthorized !== false ||
    squareBroad.criterionStatesIssued !== 0 ||
    squareBroad.claimsIssued !== 0
  ) fail('FR-83 square-broad binding boundary drift.');

  const lips = reviewLipsSubstantialRoleFreeSeparationTraditionalBindingFeasibilityFR99();
  assertIssuedLipsSubstantialRoleFreeSeparationTraditionalBindingFeasibilityReviewFR99(lips);
  if (
    lips.candidateNeutralMetric.metricRef !== LIPS_SUBSTANTIAL_METRICS[0] ||
    lips.feasibilityDecision.traditionalMetricBindingAdmitted !== false ||
    lips.feasibilityDecision.constructValidityEvidenceRequiredBeforeProxyBinding !== true ||
    lips.feasibilityDecision.calibratedDecisionThresholdRequiredBeforeCriterionState !== true ||
    lips.feasibilityDecision.automaticCriterionStateAuthorized !== false ||
    lips.thicknessMetricIssued !== false ||
    lips.criterionStatesIssued !== 0 ||
    lips.claimsIssued !== 0
  ) fail('FR-99 lips-substantial binding boundary drift.');
}

function criterion(
  criterionId: IntakeCriterionIdFR122,
): (typeof FIVE_OFFICER_CRITERIA_FR121_WITNESS_QUALIFIED)[number] {
  const value = FIVE_OFFICER_CRITERIA_FR121_WITNESS_QUALIFIED.find((entry) => entry.criterionId === criterionId);
  if (value === undefined) fail(`missing witness-qualified criterion: ${criterionId}`);
  return value;
}

function readiness(
  criterionId: IntakeCriterionIdFR122,
  state: MouthCriterionSemanticExecutionReadinessFR122V1['machineObservationPath']['state'],
  metricRefs: readonly string[],
  blockers: readonly string[],
): MouthCriterionSemanticExecutionReadinessFR122V1 {
  const definition = criterion(criterionId);
  if (definition.sourceRefs.length !== 1 || definition.sourceRefs[0] !== WITNESS_QUALIFIED_PASSAGE_REF) {
    fail(`criterion source drift: ${criterionId}`);
  }
  return Object.freeze({
    criterionId,
    sourceConcept: definition.sourceConcept,
    modality: definition.modality,
    staticV1Eligible: definition.staticV1Eligible,
    witnessQualifiedSourceRef: WITNESS_QUALIFIED_PASSAGE_REF,
    machineObservationPath: Object.freeze({ state, metricRefs: Object.freeze([...metricRefs]) }),
    traditionalMetricBindingAuthorized: false as const,
    calibratedThresholdAuthorized: false as const,
    machineCriterionStateAuthorized: false as const,
    semanticSliceAuthorized: false as const,
    blockers: Object.freeze([...blockers]),
  });
}

export function assessFiveOfficerIntakeMouthSemanticExecutionAdmissionFR122(): FiveOfficerIntakeMouthSemanticExecutionAdmissionFR122V1 {
  if (CACHED !== null) return CACHED;
  validateFR121Persistence();
  validateExistingMouthBindingBoundaries();

  const result: FiveOfficerIntakeMouthSemanticExecutionAdmissionFR122V1 = Object.freeze({
    schemaVersion: 'fr122-five-officers-intake-mouth-semantic-execution-admission-v1' as const,
    artifactVersion: '0.1.0' as const,
    authorityState: 'mouth_semantic_vertical_slice_blocked_no_authoritative_machine_criterion_state' as const,
    definitionSetId: DEFINITION_SET_ID,
    provenance: Object.freeze({
      witnessQualifiedPassageRef: WITNESS_QUALIFIED_PASSAGE_REF,
      witnessQualifiedPassageVerificationStatus: 'scan_checked' as const,
      successorMethodologyRef: SUCCESSOR_METHODOLOGY_REF,
      successorMethodologyReviewStatus: 'research' as const,
      historicalPassageRetained: true as const,
      historicalCriterionDefinitionsRetained: true as const,
      semanticIdentityEquivalenceAsserted: false as const,
    }),
    criterionReadiness: Object.freeze([
      readiness(SQUARE_BROAD, 'existing_neutral_metric_path', SQUARE_BROAD_METRICS, [
        'square_broad_metric_to_source_concept_mapping_not_authorized',
        'square_broad_calibration_evidence_absent',
        'square_broad_threshold_not_calibrated',
        'successor_methodology_execution_not_authorized',
      ]),
      readiness(LIPS_SUBSTANTIAL, 'existing_neutral_metric_path', LIPS_SUBSTANTIAL_METRICS, [
        'lips_substantial_traditional_metric_binding_not_admitted',
        'lips_substantial_construct_validity_evidence_absent',
        'lips_substantial_calibration_evidence_absent',
        'lips_substantial_threshold_not_calibrated',
        'successor_methodology_execution_not_authorized',
      ]),
      readiness(CORNERS_ARCHED, 'not_admissible_for_static_v1', [], [
        'criterion_capture_sensitive',
        'criterion_static_v1_ineligible',
        'controlled_capture_operationalization_not_authorized',
      ]),
      readiness(OPEN_CLOSE, 'not_admissible_for_static_v1', [], [
        'criterion_capture_sensitive',
        'criterion_static_v1_ineligible',
        'controlled_capture_operationalization_not_authorized',
      ]),
      readiness(RED_LIP_COLOR, 'not_admissible_for_static_v1', [], [
        'criterion_dynamic_appearance',
        'criterion_static_v1_ineligible',
        'dynamic_color_appearance_consumption_not_authorized',
      ]),
    ]),
    executableCriterionId: null,
    closestStaticCandidateCriterionId: SQUARE_BROAD,
    execution: Object.freeze({
      observationAdaptersIssued: 0 as const,
      deterministicCriterionEvaluatorsIssued: 0 as const,
      criterionStatesIssued: 0 as const,
      structuredClaimsIssued: 0 as const,
      boundedNarrativesIssued: 0 as const,
      traditionalFormationAuthorized: false as const,
      traditionalSemanticAuthority: false as const,
    }),
    authorityBoundary: Object.freeze({
      witnessQualifiedSourceMeansMetricBinding: false as const,
      neutralMetricMeansTraditionalSourceConcept: false as const,
      runtimeMetricValueMeansCriterionState: false as const,
      staticV1EligibleMeansExecutable: false as const,
      researchMethodologyMeansExecutionAuthority: false as const,
      captureSensitiveCriterionMayUseStaticV1Shortcut: false as const,
      dynamicColorMayUseStaticGeometryShortcut: false as const,
      llmMayClassifyCriterion: false as const,
      llmMayGenerateClaimWithoutCriterionState: false as const,
    }),
    nextFrontier: 'square_broad_metric_to_source_operationalization_and_calibration_authority' as const,
  });
  ISSUED.add(result);
  CACHED = result;
  return result;
}

export function assertIssuedFiveOfficerIntakeMouthSemanticExecutionAdmissionFR122(
  value: FiveOfficerIntakeMouthSemanticExecutionAdmissionFR122V1,
): void {
  if (!ISSUED.has(value)) fail('semantic execution admission artifact was not issued by the active FR-122 boundary.');
  if (
    value.authorityState !== 'mouth_semantic_vertical_slice_blocked_no_authoritative_machine_criterion_state' ||
    value.definitionSetId !== DEFINITION_SET_ID ||
    value.provenance.witnessQualifiedPassageVerificationStatus !== 'scan_checked' ||
    value.provenance.successorMethodologyReviewStatus !== 'research' ||
    value.executableCriterionId !== null ||
    value.closestStaticCandidateCriterionId !== SQUARE_BROAD ||
    value.criterionReadiness.length !== 5 ||
    value.criterionReadiness.some((entry) => entry.machineCriterionStateAuthorized || entry.semanticSliceAuthorized) ||
    value.execution.observationAdaptersIssued !== 0 ||
    value.execution.deterministicCriterionEvaluatorsIssued !== 0 ||
    value.execution.criterionStatesIssued !== 0 ||
    value.execution.structuredClaimsIssued !== 0 ||
    value.execution.boundedNarrativesIssued !== 0 ||
    value.execution.traditionalSemanticAuthority !== false ||
    value.authorityBoundary.llmMayClassifyCriterion !== false ||
    value.authorityBoundary.llmMayGenerateClaimWithoutCriterionState !== false
  ) fail('semantic execution admission artifact drift.');
}
