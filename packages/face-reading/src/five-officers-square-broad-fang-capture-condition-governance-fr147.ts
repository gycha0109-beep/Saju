import {
  FR146_NEXT_FRONTIER,
  assertIssuedSquareBroadFangRepeatedGovernedRealCaptureDatasetFR146,
  getSquareBroadFangRepeatedGovernedRealCaptureContractFR146,
  type SquareBroadFangRepeatedGovernedRealCaptureDatasetFR146V1,
} from './five-officers-square-broad-fang-repeated-governed-real-capture-dataset-fr146.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR147_RECORD_ID =
  'research.face_reading.shenxiang.five_officers.square_broad_fang_capture_condition_governance.fr147' as const;
export const FR147_RESEARCH_NOTE_REF =
  'repo:research/face-reading/fr147-square-broad-fang-capture-condition-governance.md' as const;
export const FR147_NEXT_FRONTIER =
  'square_broad_fang_capture_quality_measurement_construct_validation_and_independent_multi_session_evidence_acquisition_before_repeatability_interpretation' as const;

const SAFE_REF = /^[A-Za-z0-9][A-Za-z0-9._:/-]{0,255}$/u;
const REQUEST_KEYS = new Set(['schemaVersion', 'fr146Dataset', 'captureConditions']);
const CONDITION_KEYS = new Set([
  'captureRef',
  'captureSessionRef',
  'captureEventRef',
  'sessionEvidence',
  'protocolIntent',
  'qualityEvidence',
]);
const PROTOCOL_INTENT_KEYS = new Set([
  'expression',
  'headPosition',
  'framing',
]);
const QUALITY_EVIDENCE_KEYS = new Set([
  'state',
  'sharpnessMetricValidated',
  'exposureMetricValidated',
  'lightingMetricValidated',
  'occlusionValidityVerified',
  'captureQualityThresholdsDefined',
]);
const MIN_DISTINCT_SESSION_REFS = 2;
const ISSUED = new WeakSet<object>();

export interface SquareBroadFangCaptureConditionProtocolIntentFR147V1 {
  readonly expression: 'neutral_expression_requested_not_verified';
  readonly headPosition: 'natural_head_position_requested_not_verified';
  readonly framing: 'full_face_framing_requested_not_verified';
}

export interface SquareBroadFangCaptureQualityEvidenceFR147V1 {
  readonly state: 'not_validated_no_threshold_authority';
  readonly sharpnessMetricValidated: false;
  readonly exposureMetricValidated: false;
  readonly lightingMetricValidated: false;
  readonly occlusionValidityVerified: false;
  readonly captureQualityThresholdsDefined: false;
}

export interface SquareBroadFangCaptureConditionInputFR147V1 {
  readonly captureRef: string;
  readonly captureSessionRef: string;
  readonly captureEventRef: string;
  readonly sessionEvidence: 'study_operator_declared_session_ref_not_independently_verified';
  readonly protocolIntent: SquareBroadFangCaptureConditionProtocolIntentFR147V1;
  readonly qualityEvidence: SquareBroadFangCaptureQualityEvidenceFR147V1;
}

export interface SquareBroadFangCaptureConditionGovernanceRequestFR147V1 {
  readonly schemaVersion: 'fr147-square-broad-fang-capture-condition-governance-request-v1';
  readonly fr146Dataset: SquareBroadFangRepeatedGovernedRealCaptureDatasetFR146V1;
  readonly captureConditions: readonly SquareBroadFangCaptureConditionInputFR147V1[];
}

export interface SquareBroadFangCaptureConditionLedgerEntryFR147V1 {
  readonly captureRef: string;
  readonly captureSessionRef: string;
  readonly captureEventRef: string;
  readonly sessionEvidence: 'study_operator_declared_session_ref_not_independently_verified';
  readonly neutralExpressionProtocolRequested: true;
  readonly naturalHeadPositionProtocolRequested: true;
  readonly fullFaceFramingProtocolRequested: true;
  readonly sessionIndependenceVerified: false;
  readonly captureEventIndependenceVerified: false;
  readonly captureQualityValidated: false;
}

export interface SquareBroadFangCaptureConditionGovernanceFR147V1 {
  readonly schemaVersion: 'fr147-square-broad-fang-capture-condition-governance-v1';
  readonly artifactVersion: '0.1.0';
  readonly recordId: typeof FR147_RECORD_ID;
  readonly authorityState: 'square_broad_fang_capture_quality_and_multi_session_condition_governance_materialized_no_repeatability_interpretation';
  readonly targetCriterionRef: 'criterion.intake.square_broad';
  readonly activeConstructScope: 'fang_shape_candidate_features_only';
  readonly predecessor: {
    readonly fr146NextFrontier: typeof FR146_NEXT_FRONTIER;
    readonly issuedFR146DatasetRequired: true;
    readonly fr146CaptureQualityValidated: false;
    readonly fr146EmpiricalRepeatabilityEstablished: false;
  };
  readonly conditionLedger: readonly SquareBroadFangCaptureConditionLedgerEntryFR147V1[];
  readonly observedCaptureCount: number;
  readonly observedSessionRefCount: number;
  readonly observedCaptureEventRefCount: number;
  readonly governanceBoundary: {
    readonly captureConditionCoverageComplete: true;
    readonly distinctCaptureEventRefsRequired: true;
    readonly minimumDistinctSessionRefsRequired: 2;
    readonly multiSessionReferenceRequirementSatisfied: true;
    readonly sessionAssignmentAuthority: 'study_operator_declared_not_independently_verified';
    readonly distinctSessionRefsMeanIndependentCaptureSessions: false;
    readonly distinctCaptureEventRefsMeanIndependentCaptureEvents: false;
    readonly protocolIntentMeansNeutralExpressionVerified: false;
    readonly protocolIntentMeansNaturalHeadPositionVerified: false;
    readonly protocolIntentMeansFullFaceFramingVerified: false;
    readonly captureQualityMeasurementConstructValidated: false;
    readonly captureQualityThresholdsDefined: false;
    readonly captureQualityValidated: false;
    readonly multiSessionIndependenceVerified: false;
    readonly repeatabilityInterpretationAllowed: false;
    readonly empiricalRepeatabilityEstablished: false;
    readonly repeatabilityClassificationIssued: false;
    readonly numericRepeatabilityAcceptanceThreshold: null;
  };
  readonly privacyBoundary: {
    readonly rawImagePersisted: false;
    readonly rawProviderResponsePersisted: false;
    readonly sourceDigestPersisted: false;
    readonly sourceDigestReturned: false;
    readonly embeddingPersisted: false;
    readonly identityTemplatePersisted: false;
    readonly captureTimestampPersisted: false;
    readonly geolocationPersisted: false;
    readonly deviceIdentifierPersisted: false;
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

export interface SquareBroadFangCaptureConditionGovernanceDependenciesFR147V1 {
  readonly assertFR146Dataset: typeof assertIssuedSquareBroadFangRepeatedGovernedRealCaptureDatasetFR146;
  readonly getFR146Contract: typeof getSquareBroadFangRepeatedGovernedRealCaptureContractFR146;
}

export const DEFAULT_SQUARE_BROAD_FANG_CAPTURE_CONDITION_GOVERNANCE_DEPENDENCIES_FR147:
SquareBroadFangCaptureConditionGovernanceDependenciesFR147V1 = Object.freeze({
  assertFR146Dataset: assertIssuedSquareBroadFangRepeatedGovernedRealCaptureDatasetFR146,
  getFR146Contract: getSquareBroadFangRepeatedGovernedRealCaptureContractFR146,
});

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-147 ${message}`);
}

function opaqueRef(value: string, label: string): string {
  if (!SAFE_REF.test(value)) fail(`${label} must be a bounded opaque reference without whitespace.`);
  return value;
}

function exactKeys(value: object, allowed: ReadonlySet<string>, label: string): void {
  const unexpected = Object.keys(value).find((key) => !allowed.has(key));
  if (unexpected !== undefined) fail(`${label} contains unauthorized field: ${unexpected}.`);
}

function validateFR146Predecessor(
  dataset: SquareBroadFangRepeatedGovernedRealCaptureDatasetFR146V1,
  dependencies: SquareBroadFangCaptureConditionGovernanceDependenciesFR147V1,
): void {
  dependencies.assertFR146Dataset(dataset);
  const contract = dependencies.getFR146Contract();
  if (
    contract.nextFrontier !== FR146_NEXT_FRONTIER
    || contract.acquisition.captureQualityValidatedByThisArtifact !== false
    || contract.acquisition.numericRepeatabilityAcceptanceThresholds !== null
    || contract.authorityBoundary.repeatedCaptureDatasetMeansEmpiricalRepeatabilityEstablished !== false
    || contract.privacyBoundary.rawImageStoredByThisArtifact !== false
    || contract.privacyBoundary.rawProviderResponseStoredByThisArtifact !== false
    || contract.semanticAuthority.constructValidity !== 'unresolved'
    || contract.semanticAuthority.traditionalBinding !== 'unresolved'
    || contract.semanticAuthority.traditionalSemanticAuthority !== false
  ) fail('FR-146 predecessor contract drift.');

  if (
    dataset.schemaVersion !== 'fr146-square-broad-fang-repeated-governed-real-capture-dataset-v1'
    || dataset.nextFrontier !== FR146_NEXT_FRONTIER
    || dataset.observedCaptureCount < 2
    || dataset.observedCaptureSeriesCount !== 1
    || dataset.observedResearchSubjectCount !== 1
    || dataset.captureLedger.length !== dataset.observedCaptureCount
    || dataset.seriesSummary.captureCount !== dataset.observedCaptureCount
    || dataset.seriesSummary.captureQualityValidated !== false
    || dataset.seriesSummary.empiricalRepeatabilityEstablished !== false
    || dataset.seriesSummary.repeatabilityClassificationIssued !== false
    || dataset.seriesSummary.repeatabilityAcceptanceThresholdApplied !== false
    || dataset.repeatedCaptureBoundary.captureQualityValidated !== false
    || dataset.repeatedCaptureBoundary.empiricalRepeatabilityEstablished !== false
    || dataset.repeatedCaptureBoundary.repeatabilityClassificationIssued !== false
    || dataset.repeatedCaptureBoundary.numericRepeatabilityAcceptanceThreshold !== null
    || dataset.privacyBoundary.rawImagePersisted !== false
    || dataset.privacyBoundary.rawProviderResponsePersisted !== false
    || dataset.privacyBoundary.sourceDigestPersisted !== false
    || dataset.privacyBoundary.sourceDigestReturned !== false
    || dataset.privacyBoundary.embeddingPersisted !== false
    || dataset.privacyBoundary.identityTemplatePersisted !== false
    || dataset.semanticAuthority.constructValidity !== 'unresolved'
    || dataset.semanticAuthority.traditionalBinding !== 'unresolved'
    || dataset.semanticAuthority.criterionState !== null
    || dataset.semanticAuthority.structuredClaim !== null
    || dataset.semanticAuthority.boundedNarrative !== null
    || dataset.traditionalSemanticAuthority !== false
  ) fail('FR-146 predecessor dataset widened empirical, privacy, or semantic authority.');

  const captureRefs = new Set<string>();
  for (const entry of dataset.captureLedger) {
    opaqueRef(entry.captureRef, 'FR146 captureRef');
    if (captureRefs.has(entry.captureRef)) fail(`FR-146 capture ledger duplicates captureRef ${entry.captureRef}.`);
    captureRefs.add(entry.captureRef);
    if (
      entry.fr144AcquisitionValidation !== 'PASS'
      || entry.captureQualityValidated !== false
      || entry.sourceImageContentEqualityCheckedForOutput !== false
    ) fail(`FR-146 capture ${entry.captureRef} widened capture authority.`);
  }
}

function validateCaptureCondition(
  condition: SquareBroadFangCaptureConditionInputFR147V1,
  index: number,
): void {
  if (typeof condition !== 'object' || condition === null) fail(`capture condition ${index} must be an object.`);
  exactKeys(condition, CONDITION_KEYS, `capture condition ${index}`);
  opaqueRef(condition.captureRef, `capture condition ${index} captureRef`);
  opaqueRef(condition.captureSessionRef, `capture condition ${index} captureSessionRef`);
  opaqueRef(condition.captureEventRef, `capture condition ${index} captureEventRef`);
  if (condition.sessionEvidence !== 'study_operator_declared_session_ref_not_independently_verified') {
    fail(`capture condition ${index} session evidence authority is unsupported.`);
  }

  if (typeof condition.protocolIntent !== 'object' || condition.protocolIntent === null) {
    fail(`capture condition ${index} protocolIntent must be an object.`);
  }
  exactKeys(condition.protocolIntent, PROTOCOL_INTENT_KEYS, `capture condition ${index} protocolIntent`);
  if (
    condition.protocolIntent.expression !== 'neutral_expression_requested_not_verified'
    || condition.protocolIntent.headPosition !== 'natural_head_position_requested_not_verified'
    || condition.protocolIntent.framing !== 'full_face_framing_requested_not_verified'
  ) fail(`capture condition ${index} protocol intent must remain request-only and unverified.`);

  if (typeof condition.qualityEvidence !== 'object' || condition.qualityEvidence === null) {
    fail(`capture condition ${index} qualityEvidence must be an object.`);
  }
  exactKeys(condition.qualityEvidence, QUALITY_EVIDENCE_KEYS, `capture condition ${index} qualityEvidence`);
  if (
    condition.qualityEvidence.state !== 'not_validated_no_threshold_authority'
    || condition.qualityEvidence.sharpnessMetricValidated !== false
    || condition.qualityEvidence.exposureMetricValidated !== false
    || condition.qualityEvidence.lightingMetricValidated !== false
    || condition.qualityEvidence.occlusionValidityVerified !== false
    || condition.qualityEvidence.captureQualityThresholdsDefined !== false
  ) fail(`capture condition ${index} cannot promote unvalidated capture-quality evidence.`);
}

function validateRequest(
  request: SquareBroadFangCaptureConditionGovernanceRequestFR147V1,
  dependencies: SquareBroadFangCaptureConditionGovernanceDependenciesFR147V1,
): void {
  if (typeof request !== 'object' || request === null) fail('request must be an object.');
  exactKeys(request, REQUEST_KEYS, 'request');
  if (request.schemaVersion !== 'fr147-square-broad-fang-capture-condition-governance-request-v1') {
    fail('request schemaVersion is unsupported.');
  }
  if (typeof request.fr146Dataset !== 'object' || request.fr146Dataset === null) {
    fail('fr146Dataset must be an issued FR-146 dataset object.');
  }
  validateFR146Predecessor(request.fr146Dataset, dependencies);
  if (!Array.isArray(request.captureConditions)) fail('captureConditions must be an array.');
  if (request.captureConditions.length !== request.fr146Dataset.observedCaptureCount) {
    fail('captureConditions must provide exactly one condition record for every FR-146 capture.');
  }

  const predecessorCaptureRefs = new Set(request.fr146Dataset.captureLedger.map((entry) => entry.captureRef));
  const captureRefs = new Set<string>();
  const sessionRefs = new Set<string>();
  const eventRefs = new Set<string>();

  request.captureConditions.forEach((condition, index) => {
    validateCaptureCondition(condition, index);
    if (!predecessorCaptureRefs.has(condition.captureRef)) {
      fail(`capture condition references unknown FR-146 captureRef ${condition.captureRef}.`);
    }
    if (captureRefs.has(condition.captureRef)) fail(`capture condition duplicates captureRef ${condition.captureRef}.`);
    if (eventRefs.has(condition.captureEventRef)) fail(`capture condition duplicates captureEventRef ${condition.captureEventRef}.`);
    captureRefs.add(condition.captureRef);
    sessionRefs.add(condition.captureSessionRef);
    eventRefs.add(condition.captureEventRef);
  });

  if (captureRefs.size !== predecessorCaptureRefs.size) {
    fail('capture-condition coverage must exactly match the FR-146 capture ledger.');
  }
  if (sessionRefs.size < MIN_DISTINCT_SESSION_REFS) {
    fail('capture-condition governance requires at least two distinct study-local session refs before multi-session interpretation can even be considered.');
  }
}

export function getSquareBroadFangCaptureConditionGovernanceContractFR147() {
  const predecessor = getSquareBroadFangRepeatedGovernedRealCaptureContractFR146();
  if (
    predecessor.nextFrontier !== FR146_NEXT_FRONTIER
    || predecessor.acquisition.captureQualityValidatedByThisArtifact !== false
    || predecessor.authorityBoundary.repeatedCaptureDatasetMeansEmpiricalRepeatabilityEstablished !== false
    || predecessor.semanticAuthority.traditionalSemanticAuthority !== false
  ) fail('FR-146 predecessor contract drift while constructing FR-147 contract.');

  return Object.freeze({
    schemaVersion: 'fr147-square-broad-fang-capture-condition-governance-contract-v1' as const,
    artifactVersion: '0.1.0' as const,
    recordId: FR147_RECORD_ID,
    predecessor: Object.freeze({
      fr146NextFrontier: FR146_NEXT_FRONTIER,
      issuedFR146DatasetRequired: true as const,
    }),
    admission: Object.freeze({
      exactCaptureConditionCoverageRequired: true as const,
      distinctCaptureEventRefsRequired: true as const,
      minimumDistinctSessionRefsRequired: MIN_DISTINCT_SESSION_REFS as 2,
      sessionAssignmentAuthority: 'study_operator_declared_not_independently_verified' as const,
      captureTimestampsRequired: false as const,
      deviceIdentifiersRequired: false as const,
      geolocationRequired: false as const,
    }),
    authorityBoundary: Object.freeze({
      distinctSessionRefsMeanIndependentCaptureSessions: false as const,
      distinctCaptureEventRefsMeanIndependentCaptureEvents: false as const,
      protocolIntentMeansNeutralExpressionVerified: false as const,
      protocolIntentMeansCaptureQualityValidated: false as const,
      captureQualityMeasurementConstructValidated: false as const,
      captureQualityThresholdsDefined: false as const,
      repeatabilityInterpretationAllowed: false as const,
      empiricalRepeatabilityEstablished: false as const,
      traditionalSemanticAuthority: false as const,
    }),
    privacyBoundary: Object.freeze({
      rawImageStoredByThisArtifact: false as const,
      rawProviderResponseStoredByThisArtifact: false as const,
      sourceDigestStoredByThisArtifact: false as const,
      captureTimestampStoredByThisArtifact: false as const,
      geolocationStoredByThisArtifact: false as const,
      deviceIdentifierStoredByThisArtifact: false as const,
    }),
    nextFrontier: FR147_NEXT_FRONTIER,
  });
}

export function materializeSquareBroadFangCaptureConditionGovernanceFR147(
  request: SquareBroadFangCaptureConditionGovernanceRequestFR147V1,
  dependencies: SquareBroadFangCaptureConditionGovernanceDependenciesFR147V1 =
    DEFAULT_SQUARE_BROAD_FANG_CAPTURE_CONDITION_GOVERNANCE_DEPENDENCIES_FR147,
): SquareBroadFangCaptureConditionGovernanceFR147V1 {
  validateRequest(request, dependencies);
  const sessionRefs = new Set(request.captureConditions.map((condition) => condition.captureSessionRef));
  const eventRefs = new Set(request.captureConditions.map((condition) => condition.captureEventRef));

  const conditionLedger = Object.freeze(request.captureConditions.map((condition) => Object.freeze({
    captureRef: condition.captureRef,
    captureSessionRef: condition.captureSessionRef,
    captureEventRef: condition.captureEventRef,
    sessionEvidence: condition.sessionEvidence,
    neutralExpressionProtocolRequested: true as const,
    naturalHeadPositionProtocolRequested: true as const,
    fullFaceFramingProtocolRequested: true as const,
    sessionIndependenceVerified: false as const,
    captureEventIndependenceVerified: false as const,
    captureQualityValidated: false as const,
  })));

  const output: SquareBroadFangCaptureConditionGovernanceFR147V1 = Object.freeze({
    schemaVersion: 'fr147-square-broad-fang-capture-condition-governance-v1' as const,
    artifactVersion: '0.1.0' as const,
    recordId: FR147_RECORD_ID,
    authorityState: 'square_broad_fang_capture_quality_and_multi_session_condition_governance_materialized_no_repeatability_interpretation' as const,
    targetCriterionRef: 'criterion.intake.square_broad' as const,
    activeConstructScope: 'fang_shape_candidate_features_only' as const,
    predecessor: Object.freeze({
      fr146NextFrontier: FR146_NEXT_FRONTIER,
      issuedFR146DatasetRequired: true as const,
      fr146CaptureQualityValidated: false as const,
      fr146EmpiricalRepeatabilityEstablished: false as const,
    }),
    conditionLedger,
    observedCaptureCount: request.fr146Dataset.observedCaptureCount,
    observedSessionRefCount: sessionRefs.size,
    observedCaptureEventRefCount: eventRefs.size,
    governanceBoundary: Object.freeze({
      captureConditionCoverageComplete: true as const,
      distinctCaptureEventRefsRequired: true as const,
      minimumDistinctSessionRefsRequired: 2 as const,
      multiSessionReferenceRequirementSatisfied: true as const,
      sessionAssignmentAuthority: 'study_operator_declared_not_independently_verified' as const,
      distinctSessionRefsMeanIndependentCaptureSessions: false as const,
      distinctCaptureEventRefsMeanIndependentCaptureEvents: false as const,
      protocolIntentMeansNeutralExpressionVerified: false as const,
      protocolIntentMeansNaturalHeadPositionVerified: false as const,
      protocolIntentMeansFullFaceFramingVerified: false as const,
      captureQualityMeasurementConstructValidated: false as const,
      captureQualityThresholdsDefined: false as const,
      captureQualityValidated: false as const,
      multiSessionIndependenceVerified: false as const,
      repeatabilityInterpretationAllowed: false as const,
      empiricalRepeatabilityEstablished: false as const,
      repeatabilityClassificationIssued: false as const,
      numericRepeatabilityAcceptanceThreshold: null,
    }),
    privacyBoundary: Object.freeze({
      rawImagePersisted: false as const,
      rawProviderResponsePersisted: false as const,
      sourceDigestPersisted: false as const,
      sourceDigestReturned: false as const,
      embeddingPersisted: false as const,
      identityTemplatePersisted: false as const,
      captureTimestampPersisted: false as const,
      geolocationPersisted: false as const,
      deviceIdentifierPersisted: false as const,
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

export function assertIssuedSquareBroadFangCaptureConditionGovernanceFR147(
  value: SquareBroadFangCaptureConditionGovernanceFR147V1,
): void {
  if (!ISSUED.has(value)) fail('governance artifact was not issued by the active FR-147 boundary.');
}
