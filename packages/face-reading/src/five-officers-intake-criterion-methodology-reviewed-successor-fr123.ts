import type { FaceAuthorityRegistry, FaceMethodologyDefinition } from './contracts.js';
import {
  assessFiveOfficerIntakeMouthSemanticExecutionAdmissionFR122,
  assertIssuedFiveOfficerIntakeMouthSemanticExecutionAdmissionFR122,
} from './five-officers-intake-mouth-semantic-execution-admission-fr122.js';
import { FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY } from './five-officers-intake-criterion-methodology-witness-qualified-registry-admission-implementation-fr119.js';
import { FIVE_OFFICER_CRITERIA_FR121_WITNESS_QUALIFIED } from './five-officers-intake-criterion-definition-witness-qualified-source-rebind-implementation-fr121.js';
import { FaceAuthorityValidationError, validateFaceAuthorityRegistry } from './validation.js';

const METHODOLOGY_ID = 'method.shenxiang.five_officers.intake_criteria' as const;
const RESEARCH_VERSION = '0.2.0' as const;
const RESEARCH_REF = `${METHODOLOGY_ID}@${RESEARCH_VERSION}` as const;
const REVIEWED_VERSION = '0.3.0' as const;
const REVIEWED_REF = `${METHODOLOGY_ID}@${REVIEWED_VERSION}` as const;
const FULL_METHODOLOGY_REF = 'method.shenxiang.five_officers@0.1.0' as const;
const WITNESS_QUALIFIED_PASSAGE_REF = 'passage.shenxiang.five_officers.intake.nlc_1925' as const;
const HISTORICAL_PASSAGE_REF = 'passage.shenxiang.five_officers.intake' as const;
const SQUARE_BROAD = 'criterion.intake.square_broad' as const;

const REVIEWED_LIMITATIONS = Object.freeze([
  '이 reviewed successor는 historical full 五官 methodology와 research predecessor를 변경하거나 대체하지 않는다.',
  'reviewed 상태는 scan_checked witness에서 出納官 criterion 문구를 확인한 범위에만 적용되며 metric binding, monotonic direction, numeric threshold, calibration result를 승인하지 않는다.',
  '方大의 두 neutral mouth metric은 research candidate observation path일 뿐 traditional 方/大 또는 compound 方大 operationalization으로 승격되지 않는다.',
  'methodology review는 methodology pack membership, runtime criterion evaluation, claim issuance, narrative issuance 또는 production semantic authority를 승인하지 않는다.',
] as const);

export const FR123_INTAKE_CRITERION_METHODOLOGY_WITNESS_QUALIFIED_REVIEWED_SUCCESSOR: FaceMethodologyDefinition & {
  readonly methodologyId: typeof METHODOLOGY_ID;
  readonly version: typeof REVIEWED_VERSION;
  readonly traditionalTerm: '出納官';
  readonly scope: 'static_face';
  readonly sourceRefs: readonly [typeof WITNESS_QUALIFIED_PASSAGE_REF];
  readonly reviewStatus: 'reviewed';
} = Object.freeze({
  methodologyId: METHODOLOGY_ID,
  version: REVIEWED_VERSION,
  traditionalTerm: '出納官',
  scope: 'static_face',
  sourceRefs: Object.freeze([WITNESS_QUALIFIED_PASSAGE_REF]) as readonly [typeof WITNESS_QUALIFIED_PASSAGE_REF],
  description: '神相全編 出納官의 다섯 criterion 문구를 witness-qualified NLC 1925 scan_checked passage에 결속한 reviewed methodology unit. Metric operationalization과 threshold authority는 별도 calibration chain으로 유지한다.',
  limitations: REVIEWED_LIMITATIONS,
  reviewStatus: 'reviewed',
});

export const FACE_AUTHORITY_FR123_INTAKE_CRITERION_METHODOLOGY_REVIEWED_REGISTRY: FaceAuthorityRegistry = Object.freeze({
  ...FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY,
  methodologies: Object.freeze([
    ...FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY.methodologies,
    FR123_INTAKE_CRITERION_METHODOLOGY_WITNESS_QUALIFIED_REVIEWED_SUCCESSOR,
  ]),
});

export interface FiveOfficerIntakeCriterionMethodologyReviewedSuccessorFR123V1 {
  readonly schemaVersion: 'fr123-five-officers-intake-criterion-methodology-reviewed-successor-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'witness_qualified_intake_methodology_review_gate_open_metric_and_calibration_authority_still_closed';
  readonly predecessor: {
    readonly fr122AuthorityState: 'mouth_semantic_vertical_slice_blocked_no_authoritative_machine_criterion_state';
    readonly executableCriterionId: null;
    readonly closestStaticCandidateCriterionId: typeof SQUARE_BROAD;
    readonly researchMethodologyRef: typeof RESEARCH_REF;
    readonly researchMethodologyRetained: true;
    readonly researchMethodologyReviewStatus: 'research';
  };
  readonly persistedState: {
    readonly registryValidated: true;
    readonly reviewedMethodologyRef: typeof REVIEWED_REF;
    readonly reviewedMethodologyReviewStatus: 'reviewed';
    readonly reviewedSourceRef: typeof WITNESS_QUALIFIED_PASSAGE_REF;
    readonly reviewedSourceVerificationStatus: 'scan_checked';
    readonly historicalPassageRetained: true;
    readonly researchPredecessorRetained: true;
    readonly fullFiveOfficersMethodologyRetained: true;
    readonly fullFiveOfficersMethodologyUnchanged: true;
    readonly methodologyPackUnchanged: true;
    readonly fr121CriterionDefinitionsUnchanged: true;
  };
  readonly calibrationGateAssessment: {
    readonly criterionId: typeof SQUARE_BROAD;
    readonly sourceGate: {
      readonly required: 'scan_checked';
      readonly current: 'scan_checked';
      readonly open: true;
    };
    readonly methodologyGate: {
      readonly required: 'reviewed';
      readonly current: 'reviewed';
      readonly methodologyRef: typeof REVIEWED_REF;
      readonly open: true;
    };
    readonly linkedProtocolGate: {
      readonly squareBroadProtocolRegistryIssued: false;
      readonly approvedRetentionPolicyAvailable: false;
      readonly open: false;
    };
    readonly humanCalibrationCollectionAuthorized: false;
  };
  readonly execution: {
    readonly methodologyDefinitionsPersisted: 1;
    readonly methodologyReviewGateOpened: true;
    readonly methodologyPackMutations: 0;
    readonly metricBindingsIssued: 0;
    readonly operationalizationsIssued: 0;
    readonly calibrationProtocolsIssued: 0;
    readonly calibrationEvidenceIssued: 0;
    readonly thresholdsIssued: 0;
    readonly deterministicCriterionEvaluatorsIssued: 0;
    readonly criterionStatesIssued: 0;
    readonly structuredClaimsIssued: 0;
    readonly boundedNarrativesIssued: 0;
    readonly traditionalSemanticAuthority: false;
  };
  readonly authorityBoundary: {
    readonly reviewedMethodologyMeansMetricBinding: false;
    readonly reviewedMethodologyMeansMetricDirection: false;
    readonly reviewedMethodologyMeansNumericThreshold: false;
    readonly reviewedMethodologyMeansCalibrationEvidence: false;
    readonly reviewedMethodologyMeansCriterionState: false;
    readonly reviewedMethodologyMeansClaim: false;
    readonly reviewedMethodologyMeansProductionPromotion: false;
    readonly researchPredecessorMutated: false;
    readonly historicalArtifactMutated: false;
  };
  readonly nextFrontier: 'square_broad_calibration_protocol_materialization_and_policy_review';
}

const ISSUED = new WeakSet<object>();
let CACHED: FiveOfficerIntakeCriterionMethodologyReviewedSuccessorFR123V1 | null = null;

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-123 ${message}`);
}

function sameJson(left: unknown, right: unknown): boolean {
  return JSON.stringify(left) === JSON.stringify(right);
}

function inspectRegistry(): FiveOfficerIntakeCriterionMethodologyReviewedSuccessorFR123V1['persistedState'] {
  validateFaceAuthorityRegistry(FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY);
  validateFaceAuthorityRegistry(FACE_AUTHORITY_FR123_INTAKE_CRITERION_METHODOLOGY_REVIEWED_REGISTRY);

  const beforeResearch = FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY.methodologies.find(
    (method) => `${method.methodologyId}@${method.version}` === RESEARCH_REF,
  );
  const afterResearch = FACE_AUTHORITY_FR123_INTAKE_CRITERION_METHODOLOGY_REVIEWED_REGISTRY.methodologies.find(
    (method) => `${method.methodologyId}@${method.version}` === RESEARCH_REF,
  );
  const reviewed = FACE_AUTHORITY_FR123_INTAKE_CRITERION_METHODOLOGY_REVIEWED_REGISTRY.methodologies.filter(
    (method) => `${method.methodologyId}@${method.version}` === REVIEWED_REF,
  );
  const source = FACE_AUTHORITY_FR123_INTAKE_CRITERION_METHODOLOGY_REVIEWED_REGISTRY.passages.find(
    (passage) => passage.passageId === WITNESS_QUALIFIED_PASSAGE_REF,
  );
  const historical = FACE_AUTHORITY_FR123_INTAKE_CRITERION_METHODOLOGY_REVIEWED_REGISTRY.passages.find(
    (passage) => passage.passageId === HISTORICAL_PASSAGE_REF,
  );
  const fullBefore = FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY.methodologies.find(
    (method) => `${method.methodologyId}@${method.version}` === FULL_METHODOLOGY_REF,
  );
  const fullAfter = FACE_AUTHORITY_FR123_INTAKE_CRITERION_METHODOLOGY_REVIEWED_REGISTRY.methodologies.find(
    (method) => `${method.methodologyId}@${method.version}` === FULL_METHODOLOGY_REF,
  );

  if (
    beforeResearch === undefined ||
    afterResearch === undefined ||
    beforeResearch.reviewStatus !== 'research' ||
    !sameJson(beforeResearch, afterResearch) ||
    reviewed.length !== 1 ||
    reviewed[0]?.reviewStatus !== 'reviewed' ||
    reviewed[0]?.sourceRefs.length !== 1 ||
    reviewed[0]?.sourceRefs[0] !== WITNESS_QUALIFIED_PASSAGE_REF ||
    source?.verificationStatus !== 'scan_checked' ||
    source?.witnessId !== 'witness.shenxiang_quanbian.nlc_1925' ||
    historical === undefined ||
    fullBefore === undefined ||
    fullAfter === undefined ||
    !sameJson(fullBefore, fullAfter) ||
    !sameJson(
      FACE_AUTHORITY_FR119_INTAKE_CRITERION_METHODOLOGY_RESEARCH_REGISTRY.methodologyPacks,
      FACE_AUTHORITY_FR123_INTAKE_CRITERION_METHODOLOGY_REVIEWED_REGISTRY.methodologyPacks,
    )
  ) fail('reviewed successor registry persistence drift.');

  const intake = FIVE_OFFICER_CRITERIA_FR121_WITNESS_QUALIFIED.filter((criterion) => criterion.officerKey === 'intake');
  if (
    intake.length !== 5 ||
    intake.some((criterion) => criterion.sourceRefs.length !== 1 || criterion.sourceRefs[0] !== WITNESS_QUALIFIED_PASSAGE_REF)
  ) fail('FR-121 witness-qualified criterion definitions drift.');

  return Object.freeze({
    registryValidated: true as const,
    reviewedMethodologyRef: REVIEWED_REF,
    reviewedMethodologyReviewStatus: 'reviewed' as const,
    reviewedSourceRef: WITNESS_QUALIFIED_PASSAGE_REF,
    reviewedSourceVerificationStatus: 'scan_checked' as const,
    historicalPassageRetained: true as const,
    researchPredecessorRetained: true as const,
    fullFiveOfficersMethodologyRetained: true as const,
    fullFiveOfficersMethodologyUnchanged: true as const,
    methodologyPackUnchanged: true as const,
    fr121CriterionDefinitionsUnchanged: true as const,
  });
}

export function implementFiveOfficerIntakeCriterionMethodologyReviewedSuccessorFR123(): FiveOfficerIntakeCriterionMethodologyReviewedSuccessorFR123V1 {
  if (CACHED !== null) return CACHED;
  const fr122 = assessFiveOfficerIntakeMouthSemanticExecutionAdmissionFR122();
  assertIssuedFiveOfficerIntakeMouthSemanticExecutionAdmissionFR122(fr122);
  if (
    fr122.authorityState !== 'mouth_semantic_vertical_slice_blocked_no_authoritative_machine_criterion_state' ||
    fr122.executableCriterionId !== null ||
    fr122.closestStaticCandidateCriterionId !== SQUARE_BROAD
  ) fail('FR-122 predecessor authority drift.');

  const persistedState = inspectRegistry();
  const result: FiveOfficerIntakeCriterionMethodologyReviewedSuccessorFR123V1 = Object.freeze({
    schemaVersion: 'fr123-five-officers-intake-criterion-methodology-reviewed-successor-v1' as const,
    artifactVersion: '0.1.0' as const,
    authorityState: 'witness_qualified_intake_methodology_review_gate_open_metric_and_calibration_authority_still_closed' as const,
    predecessor: Object.freeze({
      fr122AuthorityState: fr122.authorityState,
      executableCriterionId: null,
      closestStaticCandidateCriterionId: SQUARE_BROAD,
      researchMethodologyRef: RESEARCH_REF,
      researchMethodologyRetained: true as const,
      researchMethodologyReviewStatus: 'research' as const,
    }),
    persistedState,
    calibrationGateAssessment: Object.freeze({
      criterionId: SQUARE_BROAD,
      sourceGate: Object.freeze({ required: 'scan_checked' as const, current: 'scan_checked' as const, open: true as const }),
      methodologyGate: Object.freeze({ required: 'reviewed' as const, current: 'reviewed' as const, methodologyRef: REVIEWED_REF, open: true as const }),
      linkedProtocolGate: Object.freeze({
        squareBroadProtocolRegistryIssued: false as const,
        approvedRetentionPolicyAvailable: false as const,
        open: false as const,
      }),
      humanCalibrationCollectionAuthorized: false as const,
    }),
    execution: Object.freeze({
      methodologyDefinitionsPersisted: 1 as const,
      methodologyReviewGateOpened: true as const,
      methodologyPackMutations: 0 as const,
      metricBindingsIssued: 0 as const,
      operationalizationsIssued: 0 as const,
      calibrationProtocolsIssued: 0 as const,
      calibrationEvidenceIssued: 0 as const,
      thresholdsIssued: 0 as const,
      deterministicCriterionEvaluatorsIssued: 0 as const,
      criterionStatesIssued: 0 as const,
      structuredClaimsIssued: 0 as const,
      boundedNarrativesIssued: 0 as const,
      traditionalSemanticAuthority: false as const,
    }),
    authorityBoundary: Object.freeze({
      reviewedMethodologyMeansMetricBinding: false as const,
      reviewedMethodologyMeansMetricDirection: false as const,
      reviewedMethodologyMeansNumericThreshold: false as const,
      reviewedMethodologyMeansCalibrationEvidence: false as const,
      reviewedMethodologyMeansCriterionState: false as const,
      reviewedMethodologyMeansClaim: false as const,
      reviewedMethodologyMeansProductionPromotion: false as const,
      researchPredecessorMutated: false as const,
      historicalArtifactMutated: false as const,
    }),
    nextFrontier: 'square_broad_calibration_protocol_materialization_and_policy_review' as const,
  });
  ISSUED.add(result);
  CACHED = result;
  return result;
}

export function assertIssuedFiveOfficerIntakeCriterionMethodologyReviewedSuccessorFR123(
  value: FiveOfficerIntakeCriterionMethodologyReviewedSuccessorFR123V1,
): void {
  if (!ISSUED.has(value)) fail('reviewed successor artifact was not issued by the active FR-123 boundary.');
  if (
    value.authorityState !== 'witness_qualified_intake_methodology_review_gate_open_metric_and_calibration_authority_still_closed' ||
    value.persistedState.reviewedMethodologyRef !== REVIEWED_REF ||
    value.persistedState.reviewedMethodologyReviewStatus !== 'reviewed' ||
    value.persistedState.reviewedSourceVerificationStatus !== 'scan_checked' ||
    value.calibrationGateAssessment.sourceGate.open !== true ||
    value.calibrationGateAssessment.methodologyGate.open !== true ||
    value.calibrationGateAssessment.linkedProtocolGate.open !== false ||
    value.calibrationGateAssessment.humanCalibrationCollectionAuthorized !== false ||
    value.execution.metricBindingsIssued !== 0 ||
    value.execution.thresholdsIssued !== 0 ||
    value.execution.criterionStatesIssued !== 0 ||
    value.execution.structuredClaimsIssued !== 0 ||
    value.execution.traditionalSemanticAuthority !== false
  ) fail('reviewed successor artifact drift.');
}
