import {
  FR146_NEXT_FRONTIER,
  assertIssuedSquareBroadFangRepeatedGovernedRealCaptureDatasetFR146,
  getSquareBroadFangRepeatedGovernedRealCaptureContractFR146,
  type SquareBroadFangRepeatedGovernedRealCaptureDatasetFR146V1,
} from './five-officers-square-broad-fang-repeated-governed-real-capture-dataset-fr146.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR147_RECORD_ID =
  'research.face_reading.shenxiang.five_officers.square_broad_fang_multi_session_condition_governance.fr147' as const;
export const FR147_RESEARCH_NOTE_REF =
  'repo:research/face-reading/fr147-square-broad-fang-multi-session-condition-governance.md' as const;
export const FR147_NEXT_FRONTIER =
  'square_broad_fang_objective_capture_quality_metric_admission_and_real_multi_session_acquisition_without_semantic_binding' as const;

const SAFE_REF = /^[A-Za-z0-9][A-Za-z0-9._:/-]{0,255}$/u;
const MIN_SESSION_COUNT = 2;
const ISSUED = new WeakSet<object>();

export interface SquareBroadFangCaptureSessionConditionRecordFR147V1 {
  readonly sessionRef: string;
  readonly captureRefs: readonly string[];
  readonly captureProtocolRef: string;
  readonly neutralExpressionInstructionRef: string;
  readonly headPoseInstructionRef: string;
  readonly cameraConfigurationRef: string;
  readonly illuminationConditionRef: string;
  readonly backgroundConditionRef: string;
  readonly captureDistanceConditionRef: string;
  readonly operatorProcedureRef: string;
}

export interface SquareBroadFangMultiSessionConditionGovernanceRequestFR147V1 {
  readonly schemaVersion: 'fr147-square-broad-fang-multi-session-condition-governance-request-v1';
  readonly dataset: SquareBroadFangRepeatedGovernedRealCaptureDatasetFR146V1;
  readonly sessions: readonly SquareBroadFangCaptureSessionConditionRecordFR147V1[];
}

export interface SquareBroadFangGovernedCaptureSessionFR147V1 {
  readonly sessionRef: string;
  readonly captureRefs: readonly string[];
  readonly captureCount: number;
  readonly captureProtocolRef: string;
  readonly neutralExpressionInstructionRef: string;
  readonly headPoseInstructionRef: string;
  readonly cameraConfigurationRef: string;
  readonly illuminationConditionRef: string;
  readonly backgroundConditionRef: string;
  readonly captureDistanceConditionRef: string;
  readonly operatorProcedureRef: string;
  readonly conditionDocumentationComplete: true;
  readonly physicalConditionEqualityEstablished: false;
  readonly captureQualityValidated: false;
}

export interface SquareBroadFangMultiSessionConditionGovernanceFR147V1 {
  readonly schemaVersion: 'fr147-square-broad-fang-multi-session-condition-governance-v1';
  readonly artifactVersion: '0.1.0';
  readonly recordId: typeof FR147_RECORD_ID;
  readonly authorityState: 'square_broad_fang_multi_session_condition_documentation_governed_no_quality_or_repeatability_interpretation';
  readonly targetCriterionRef: 'criterion.intake.square_broad';
  readonly activeConstructScope: 'fang_shape_candidate_features_only';
  readonly predecessor: {
    readonly fr146NextFrontier: typeof FR146_NEXT_FRONTIER;
    readonly fr146IssuedDatasetRequired: true;
    readonly repeatedCaptureDatasetMeansEmpiricalRepeatabilityEstablished: false;
    readonly predecessorCaptureQualityValidated: false;
  };
  readonly researchSubjectRef: string;
  readonly captureSeriesRef: string;
  readonly observedCaptureCount: number;
  readonly observedSessionCount: number;
  readonly sharedProcedureRefs: {
    readonly captureProtocolRef: string;
    readonly neutralExpressionInstructionRef: string;
    readonly headPoseInstructionRef: string;
  };
  readonly sessions: readonly SquareBroadFangGovernedCaptureSessionFR147V1[];
  readonly governanceBoundary: {
    readonly minimumDistinctSessions: 2;
    readonly multiSessionConditionCoverageSatisfied: true;
    readonly allPredecessorCapturesCoveredExactlyOnce: true;
    readonly sharedCaptureProtocolRequiredAcrossSessions: true;
    readonly sharedNeutralExpressionInstructionRequiredAcrossSessions: true;
    readonly sharedHeadPoseInstructionRequiredAcrossSessions: true;
    readonly setupConditionRefsDocumentedPerSession: true;
    readonly conditionReferenceEqualityMeansPhysicalConditionEquality: false;
    readonly conditionDocumentationMeansNeutralExpressionValidity: false;
    readonly conditionDocumentationMeansIndependentCaptureEvent: false;
    readonly objectiveCaptureQualityMetricsIssued: 0;
    readonly objectiveCaptureQualityValidated: false;
    readonly empiricalRepeatabilityEstablished: false;
    readonly repeatabilityClassificationIssued: false;
    readonly repeatabilityInterpretationAuthorized: false;
    readonly numericRepeatabilityAcceptanceThreshold: null;
  };
  readonly privacyBoundary: {
    readonly rawImagePersisted: false;
    readonly rawProviderResponsePersisted: false;
    readonly sourceDigestPersisted: false;
    readonly embeddingPersisted: false;
    readonly identityTemplatePersisted: false;
    readonly deviceSerialNumberRequired: false;
    readonly operatorIdentityRequired: false;
    readonly exactCaptureTimestampRequired: false;
  };
  readonly semanticAuthority: {
    readonly humanSemanticLabelsIssued: 0;
    readonly traditionalClassLabelsIssued: 0;
    readonly constructValidity: 'unresolved';
    readonly traditionalBinding: 'unresolved';
    readonly criterionState: null;
    readonly structuredClaim: null;
    readonly boundedNarrative: null;
  };
  readonly traditionalSemanticAuthority: false;
  readonly researchNoteRef: typeof FR147_RESEARCH_NOTE_REF;
  readonly nextFrontier: typeof FR147_NEXT_FRONTIER;
}

export interface SquareBroadFangMultiSessionConditionGovernanceDependenciesFR147V1 {
  readonly assertFR146Dataset: typeof assertIssuedSquareBroadFangRepeatedGovernedRealCaptureDatasetFR146;
  readonly getFR146Contract: typeof getSquareBroadFangRepeatedGovernedRealCaptureContractFR146;
}

export const DEFAULT_SQUARE_BROAD_FANG_MULTI_SESSION_CONDITION_GOVERNANCE_DEPENDENCIES_FR147:
SquareBroadFangMultiSessionConditionGovernanceDependenciesFR147V1 = Object.freeze({
  assertFR146Dataset: assertIssuedSquareBroadFangRepeatedGovernedRealCaptureDatasetFR146,
  getFR146Contract: getSquareBroadFangRepeatedGovernedRealCaptureContractFR146,
});

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-147 ${message}`);
}

function opaqueRef(value: string, label: string): string {
  if (typeof value !== 'string' || !SAFE_REF.test(value)) {
    fail(`${label} must be a bounded opaque reference without whitespace.`);
  }
  return value;
}

function requireFR146Boundary(
  dataset: SquareBroadFangRepeatedGovernedRealCaptureDatasetFR146V1,
  dependencies: SquareBroadFangMultiSessionConditionGovernanceDependenciesFR147V1,
): void {
  dependencies.assertFR146Dataset(dataset);
  const contract = dependencies.getFR146Contract();
  if (
    contract.nextFrontier !== FR146_NEXT_FRONTIER
    || contract.acquisition.captureQualityValidatedByThisArtifact !== false
    || contract.acquisition.numericRepeatabilityAcceptanceThresholds !== null
    || contract.authorityBoundary.repeatedCaptureDatasetMeansEmpiricalRepeatabilityEstablished !== false
    || contract.semanticAuthority.constructValidity !== 'unresolved'
    || contract.semanticAuthority.traditionalBinding !== 'unresolved'
    || contract.semanticAuthority.traditionalSemanticAuthority !== false
  ) fail('FR-146 predecessor contract drift.');

  if (
    dataset.schemaVersion !== 'fr146-square-broad-fang-repeated-governed-real-capture-dataset-v1'
    || dataset.artifactVersion !== '0.1.0'
    || dataset.authorityState !== 'square_broad_fang_repeated_governed_real_capture_dataset_materialized_descriptive_only_no_semantic_labels'
    || dataset.targetCriterionRef !== 'criterion.intake.square_broad'
    || dataset.activeConstructScope !== 'fang_shape_candidate_features_only'
    || dataset.observedCaptureCount < 2
    || dataset.captureLedger.length !== dataset.observedCaptureCount
    || dataset.observedCaptureSeriesCount !== 1
    || dataset.observedResearchSubjectCount !== 1
    || dataset.repeatedCaptureBoundary.captureQualityValidated !== false
    || dataset.repeatedCaptureBoundary.empiricalRepeatabilityEstablished !== false
    || dataset.repeatedCaptureBoundary.repeatabilityClassificationIssued !== false
    || dataset.repeatedCaptureBoundary.numericRepeatabilityAcceptanceThreshold !== null
    || dataset.privacyBoundary.rawImagePersisted !== false
    || dataset.privacyBoundary.rawProviderResponsePersisted !== false
    || dataset.privacyBoundary.sourceDigestPersisted !== false
    || dataset.privacyBoundary.embeddingPersisted !== false
    || dataset.privacyBoundary.identityTemplatePersisted !== false
    || dataset.semanticAuthority.constructValidity !== 'unresolved'
    || dataset.semanticAuthority.traditionalBinding !== 'unresolved'
    || dataset.semanticAuthority.criterionState !== null
    || dataset.semanticAuthority.structuredClaim !== null
    || dataset.semanticAuthority.boundedNarrative !== null
    || dataset.traditionalSemanticAuthority !== false
    || dataset.nextFrontier !== FR146_NEXT_FRONTIER
  ) fail('FR-146 dataset authority boundary drift.');

  const subjectRefs = new Set(dataset.captureLedger.map((entry) => entry.researchSubjectRef));
  const seriesRefs = new Set(dataset.captureLedger.map((entry) => entry.captureSeriesRef));
  const captureRefs = new Set(dataset.captureLedger.map((entry) => entry.captureRef));
  if (
    subjectRefs.size !== 1
    || seriesRefs.size !== 1
    || captureRefs.size !== dataset.captureLedger.length
    || dataset.captureLedger.some((entry) => entry.captureQualityValidated !== false)
  ) fail('FR-146 capture ledger identity or quality boundary drift.');
}

function validateSessions(
  dataset: SquareBroadFangRepeatedGovernedRealCaptureDatasetFR146V1,
  sessions: readonly SquareBroadFangCaptureSessionConditionRecordFR147V1[],
): {
  sharedCaptureProtocolRef: string;
  sharedNeutralExpressionInstructionRef: string;
  sharedHeadPoseInstructionRef: string;
} {
  if (!Array.isArray(sessions) || sessions.length < MIN_SESSION_COUNT) {
    fail('multi-session governance requires at least two documented capture sessions.');
  }

  const predecessorCaptureRefs = new Set(dataset.captureLedger.map((entry) => entry.captureRef));
  const coveredCaptureRefs = new Set<string>();
  const sessionRefs = new Set<string>();
  let sharedCaptureProtocolRef: string | undefined;
  let sharedNeutralExpressionInstructionRef: string | undefined;
  let sharedHeadPoseInstructionRef: string | undefined;

  sessions.forEach((session, sessionIndex) => {
    if (typeof session !== 'object' || session === null) fail(`session ${sessionIndex} must be an object.`);
    const sessionRef = opaqueRef(session.sessionRef, `session ${sessionIndex} sessionRef`);
    if (sessionRefs.has(sessionRef)) fail(`duplicate sessionRef ${sessionRef}.`);
    sessionRefs.add(sessionRef);

    if (!Array.isArray(session.captureRefs) || session.captureRefs.length === 0) {
      fail(`session ${sessionRef} must cover at least one captureRef.`);
    }
    for (const rawCaptureRef of session.captureRefs) {
      const captureRef = opaqueRef(rawCaptureRef, `session ${sessionRef} captureRef`);
      if (!predecessorCaptureRefs.has(captureRef)) fail(`session ${sessionRef} references unknown captureRef ${captureRef}.`);
      if (coveredCaptureRefs.has(captureRef)) fail(`captureRef ${captureRef} is assigned to more than one session.`);
      coveredCaptureRefs.add(captureRef);
    }

    const captureProtocolRef = opaqueRef(session.captureProtocolRef, `session ${sessionRef} captureProtocolRef`);
    const neutralExpressionInstructionRef = opaqueRef(
      session.neutralExpressionInstructionRef,
      `session ${sessionRef} neutralExpressionInstructionRef`,
    );
    const headPoseInstructionRef = opaqueRef(session.headPoseInstructionRef, `session ${sessionRef} headPoseInstructionRef`);
    opaqueRef(session.cameraConfigurationRef, `session ${sessionRef} cameraConfigurationRef`);
    opaqueRef(session.illuminationConditionRef, `session ${sessionRef} illuminationConditionRef`);
    opaqueRef(session.backgroundConditionRef, `session ${sessionRef} backgroundConditionRef`);
    opaqueRef(session.captureDistanceConditionRef, `session ${sessionRef} captureDistanceConditionRef`);
    opaqueRef(session.operatorProcedureRef, `session ${sessionRef} operatorProcedureRef`);

    sharedCaptureProtocolRef ??= captureProtocolRef;
    sharedNeutralExpressionInstructionRef ??= neutralExpressionInstructionRef;
    sharedHeadPoseInstructionRef ??= headPoseInstructionRef;
    if (captureProtocolRef !== sharedCaptureProtocolRef) fail('captureProtocolRef must remain shared across governed sessions.');
    if (neutralExpressionInstructionRef !== sharedNeutralExpressionInstructionRef) {
      fail('neutralExpressionInstructionRef must remain shared across governed sessions.');
    }
    if (headPoseInstructionRef !== sharedHeadPoseInstructionRef) {
      fail('headPoseInstructionRef must remain shared across governed sessions.');
    }
  });

  if (coveredCaptureRefs.size !== predecessorCaptureRefs.size) {
    fail('session condition records must cover every FR-146 capture exactly once.');
  }

  return {
    sharedCaptureProtocolRef: sharedCaptureProtocolRef!,
    sharedNeutralExpressionInstructionRef: sharedNeutralExpressionInstructionRef!,
    sharedHeadPoseInstructionRef: sharedHeadPoseInstructionRef!,
  };
}

export function getSquareBroadFangMultiSessionConditionGovernanceContractFR147() {
  const predecessor = getSquareBroadFangRepeatedGovernedRealCaptureContractFR146();
  if (
    predecessor.nextFrontier !== FR146_NEXT_FRONTIER
    || predecessor.acquisition.captureQualityValidatedByThisArtifact !== false
    || predecessor.authorityBoundary.repeatedCaptureDatasetMeansEmpiricalRepeatabilityEstablished !== false
  ) fail('FR-146 predecessor contract drift.');

  return Object.freeze({
    schemaVersion: 'fr147-square-broad-fang-multi-session-condition-governance-contract-v1' as const,
    artifactVersion: '0.1.0' as const,
    recordId: FR147_RECORD_ID,
    acquisitionGovernance: Object.freeze({
      minimumDistinctSessions: MIN_SESSION_COUNT as 2,
      completeCapturePartitionRequired: true as const,
      sharedCaptureProtocolAcrossSessionsRequired: true as const,
      sharedNeutralExpressionInstructionAcrossSessionsRequired: true as const,
      sharedHeadPoseInstructionAcrossSessionsRequired: true as const,
      sessionSetupConditionReferencesRequired: true as const,
      objectiveCaptureQualityMetricsRequiredToIssueThisArtifact: false as const,
      objectiveCaptureQualityMetricsIssuedByThisArtifact: 0 as const,
    }),
    authorityBoundary: Object.freeze({
      conditionDocumentationMeansPhysicalConditionEquality: false as const,
      conditionDocumentationMeansNeutralExpressionValidity: false as const,
      conditionDocumentationMeansIndependentCaptureEvent: false as const,
      conditionDocumentationMeansCaptureQualityValidated: false as const,
      multiSessionCoverageMeansEmpiricalRepeatabilityEstablished: false as const,
      repeatabilityInterpretationAuthorized: false as const,
      numericRepeatabilityAcceptanceThreshold: null,
    }),
    privacyBoundary: Object.freeze({
      rawImageStoredByThisArtifact: false as const,
      rawProviderResponseStoredByThisArtifact: false as const,
      sourceDigestStoredByThisArtifact: false as const,
      faceEmbeddingStoredByThisArtifact: false as const,
      identityTemplateStoredByThisArtifact: false as const,
      deviceSerialNumberRequired: false as const,
      operatorIdentityRequired: false as const,
      exactCaptureTimestampRequired: false as const,
    }),
    semanticAuthority: Object.freeze({
      constructValidity: 'unresolved' as const,
      traditionalBinding: 'unresolved' as const,
      criterionState: null,
      structuredClaim: null,
      boundedNarrative: null,
      traditionalSemanticAuthority: false as const,
    }),
    researchNoteRef: FR147_RESEARCH_NOTE_REF,
    nextFrontier: FR147_NEXT_FRONTIER,
  });
}

export function governSquareBroadFangMultiSessionConditionsFR147(
  request: SquareBroadFangMultiSessionConditionGovernanceRequestFR147V1,
  dependencies: SquareBroadFangMultiSessionConditionGovernanceDependenciesFR147V1 =
    DEFAULT_SQUARE_BROAD_FANG_MULTI_SESSION_CONDITION_GOVERNANCE_DEPENDENCIES_FR147,
): SquareBroadFangMultiSessionConditionGovernanceFR147V1 {
  if (typeof request !== 'object' || request === null) fail('request must be an object.');
  if (request.schemaVersion !== 'fr147-square-broad-fang-multi-session-condition-governance-request-v1') {
    fail('request schemaVersion is unsupported.');
  }
  requireFR146Boundary(request.dataset, dependencies);
  const shared = validateSessions(request.dataset, request.sessions);

  const researchSubjectRef = request.dataset.captureLedger[0]!.researchSubjectRef;
  const captureSeriesRef = request.dataset.captureLedger[0]!.captureSeriesRef;
  opaqueRef(researchSubjectRef, 'researchSubjectRef');
  opaqueRef(captureSeriesRef, 'captureSeriesRef');

  const sessions = Object.freeze(request.sessions.map((session) => Object.freeze({
    sessionRef: session.sessionRef,
    captureRefs: Object.freeze([...session.captureRefs]),
    captureCount: session.captureRefs.length,
    captureProtocolRef: session.captureProtocolRef,
    neutralExpressionInstructionRef: session.neutralExpressionInstructionRef,
    headPoseInstructionRef: session.headPoseInstructionRef,
    cameraConfigurationRef: session.cameraConfigurationRef,
    illuminationConditionRef: session.illuminationConditionRef,
    backgroundConditionRef: session.backgroundConditionRef,
    captureDistanceConditionRef: session.captureDistanceConditionRef,
    operatorProcedureRef: session.operatorProcedureRef,
    conditionDocumentationComplete: true as const,
    physicalConditionEqualityEstablished: false as const,
    captureQualityValidated: false as const,
  })));

  const output: SquareBroadFangMultiSessionConditionGovernanceFR147V1 = Object.freeze({
    schemaVersion: 'fr147-square-broad-fang-multi-session-condition-governance-v1' as const,
    artifactVersion: '0.1.0' as const,
    recordId: FR147_RECORD_ID,
    authorityState: 'square_broad_fang_multi_session_condition_documentation_governed_no_quality_or_repeatability_interpretation' as const,
    targetCriterionRef: 'criterion.intake.square_broad' as const,
    activeConstructScope: 'fang_shape_candidate_features_only' as const,
    predecessor: Object.freeze({
      fr146NextFrontier: FR146_NEXT_FRONTIER,
      fr146IssuedDatasetRequired: true as const,
      repeatedCaptureDatasetMeansEmpiricalRepeatabilityEstablished: false as const,
      predecessorCaptureQualityValidated: false as const,
    }),
    researchSubjectRef,
    captureSeriesRef,
    observedCaptureCount: request.dataset.observedCaptureCount,
    observedSessionCount: sessions.length,
    sharedProcedureRefs: Object.freeze({
      captureProtocolRef: shared.sharedCaptureProtocolRef,
      neutralExpressionInstructionRef: shared.sharedNeutralExpressionInstructionRef,
      headPoseInstructionRef: shared.sharedHeadPoseInstructionRef,
    }),
    sessions,
    governanceBoundary: Object.freeze({
      minimumDistinctSessions: 2 as const,
      multiSessionConditionCoverageSatisfied: true as const,
      allPredecessorCapturesCoveredExactlyOnce: true as const,
      sharedCaptureProtocolRequiredAcrossSessions: true as const,
      sharedNeutralExpressionInstructionRequiredAcrossSessions: true as const,
      sharedHeadPoseInstructionRequiredAcrossSessions: true as const,
      setupConditionRefsDocumentedPerSession: true as const,
      conditionReferenceEqualityMeansPhysicalConditionEquality: false as const,
      conditionDocumentationMeansNeutralExpressionValidity: false as const,
      conditionDocumentationMeansIndependentCaptureEvent: false as const,
      objectiveCaptureQualityMetricsIssued: 0 as const,
      objectiveCaptureQualityValidated: false as const,
      empiricalRepeatabilityEstablished: false as const,
      repeatabilityClassificationIssued: false as const,
      repeatabilityInterpretationAuthorized: false as const,
      numericRepeatabilityAcceptanceThreshold: null,
    }),
    privacyBoundary: Object.freeze({
      rawImagePersisted: false as const,
      rawProviderResponsePersisted: false as const,
      sourceDigestPersisted: false as const,
      embeddingPersisted: false as const,
      identityTemplatePersisted: false as const,
      deviceSerialNumberRequired: false as const,
      operatorIdentityRequired: false as const,
      exactCaptureTimestampRequired: false as const,
    }),
    semanticAuthority: Object.freeze({
      humanSemanticLabelsIssued: 0 as const,
      traditionalClassLabelsIssued: 0 as const,
      constructValidity: 'unresolved' as const,
      traditionalBinding: 'unresolved' as const,
      criterionState: null,
      structuredClaim: null,
      boundedNarrative: null,
    }),
    traditionalSemanticAuthority: false as const,
    researchNoteRef: FR147_RESEARCH_NOTE_REF,
    nextFrontier: FR147_NEXT_FRONTIER,
  });
  ISSUED.add(output);
  return output;
}

export function assertIssuedSquareBroadFangMultiSessionConditionGovernanceFR147(
  value: SquareBroadFangMultiSessionConditionGovernanceFR147V1,
): void {
  if (!ISSUED.has(value)) fail('governance record was not issued by the active FR-147 boundary.');
}
