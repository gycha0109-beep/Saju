import { FR183_REMAINING_BLOCKERS } from './eye-pair-xi-chang-operationalization-requirements-rereview-fr183.js';
import { FR184_CHANG_METRIC_REF, FR184_XI_METRIC_REF } from './eye-pair-xi-chang-metric-to-concept-mapping-feasibility-fr184.js';
import { FR186_REMAINING_UNSATISFIED_EVIDENCE_REQUIREMENTS } from './eye-pair-xi-chang-mapping-hypothesis-provenance-fr186.js';
import {
  assertIssuedEyePairXiChangBlindedExpertOperationalizationProtocolFR187,
  FR187_NEXT_FRONTIER,
  FR187_PROTOCOL_REF,
  FR187_VERDICT,
  issueEyePairXiChangBlindedExpertOperationalizationProtocolFR187,
} from './eye-pair-xi-chang-blinded-expert-operationalization-protocol-fr187.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR188_RECORD_ID = 'research.face_reading.eye_pair.xi_chang_repeat_capture_dataset_split_protocol.fr188' as const;
export const FR188_RESEARCH_NOTE_REF = 'repo:research/face-reading/fr188-eye-pair-xi-chang-repeat-capture-dataset-split-protocol.md' as const;
export const FR188_CAPTURE_PROTOCOL_REF = 'research.face_reading.xi_chang_repeat_capture_protocol.fr188.v1' as const;
export const FR188_SPLIT_POLICY_REF = 'research.face_reading.xi_chang_dataset_split_policy.fr188.v1' as const;
export const FR188_VERDICT = 'GOVERNED_XI_CHANG_REPEAT_CAPTURE_AND_DATASET_SPLIT_PROTOCOL_DEFINED_SUPPORT_AUTHORITY_AND_EVIDENCE_COLLECTION_NOT_ADMITTED' as const;
export const FR188_NEXT_FRONTIER = 'define_governed_xi_chang_capture_quality_and_review_artifact_retention_support_before_study_registration_or_evidence_collection' as const;

export const FR188_METRIC_REFS = Object.freeze([FR184_XI_METRIC_REF, FR184_CHANG_METRIC_REF] as const);
export const FR188_PARTITIONS = Object.freeze(['selection', 'holdout'] as const);
export const FR188_UNRESOLVED_SUPPORT_REQUIREMENTS = Object.freeze([
  'xi_chang_capture_quality_policy_not_issued',
  'xi_chang_review_artifact_retention_policy_not_issued',
] as const);

export interface FR188CaptureProtocolV1 {
  readonly protocolRef: typeof FR188_CAPTURE_PROTOCOL_REF;
  readonly metricRefs: typeof FR188_METRIC_REFS;
  readonly captureMode: 'single_frontal';
  readonly requiredViewKeys: readonly ['frontal'];
  readonly sessionsPerParticipant: 2;
  readonly acceptedCapturesPerSession: 2;
  readonly independentRecaptureRequired: true;
  readonly rejectedCaptureRequiresReason: true;
  readonly rejectedCaptureMayBecomeReviewItem: false;
  readonly supportAuthorityIssued: false;
  readonly registryRegistrationReady: false;
  readonly frozenBeforeEvidenceCollection: true;
  readonly postHocMutationAuthorized: false;
  readonly repeatCaptureStabilityEvidenceIssued: false;
  readonly executionAuthorized: false;
}

export const FR188_CAPTURE_PROTOCOL: FR188CaptureProtocolV1 = Object.freeze({
  protocolRef: FR188_CAPTURE_PROTOCOL_REF,
  metricRefs: FR188_METRIC_REFS,
  captureMode: 'single_frontal',
  requiredViewKeys: Object.freeze(['frontal'] as const),
  sessionsPerParticipant: 2,
  acceptedCapturesPerSession: 2,
  independentRecaptureRequired: true,
  rejectedCaptureRequiresReason: true,
  rejectedCaptureMayBecomeReviewItem: false,
  supportAuthorityIssued: false,
  registryRegistrationReady: false,
  frozenBeforeEvidenceCollection: true,
  postHocMutationAuthorized: false,
  repeatCaptureStabilityEvidenceIssued: false,
  executionAuthorized: false,
});

export interface FR188SplitPolicyV1 {
  readonly policyRef: typeof FR188_SPLIT_POLICY_REF;
  readonly splitUnit: 'participant';
  readonly partitions: typeof FR188_PARTITIONS;
  readonly participantLeakageAllowed: false;
  readonly captureFamilyLeakageAllowed: false;
  readonly thresholdSelectionMayReadHoldout: false;
  readonly finalEvaluationMayReadSelectionLabels: false;
  readonly assignmentFrozenBeforeMetricValuesObserved: true;
  readonly assignmentFrozenBeforeExpertLabelsObserved: true;
  readonly postHocReassignmentAuthorized: false;
  readonly executionAuthorized: false;
}

export const FR188_SPLIT_POLICY: FR188SplitPolicyV1 = Object.freeze({
  policyRef: FR188_SPLIT_POLICY_REF,
  splitUnit: 'participant',
  partitions: FR188_PARTITIONS,
  participantLeakageAllowed: false,
  captureFamilyLeakageAllowed: false,
  thresholdSelectionMayReadHoldout: false,
  finalEvaluationMayReadSelectionLabels: false,
  assignmentFrozenBeforeMetricValuesObserved: true,
  assignmentFrozenBeforeExpertLabelsObserved: true,
  postHocReassignmentAuthorized: false,
  executionAuthorized: false,
});

export interface FR188AuthorityBoundaryV1 {
  readonly repeatCaptureProtocolDefined: true;
  readonly datasetSplitProtocolDefined: true;
  readonly supportAuthorityIssued: false;
  readonly protocolDefinitionCountsAsRepeatCaptureStabilityEvidence: false;
  readonly repeatCaptureStabilityEvidenceIssued: false;
  readonly operationalizationEvidenceIssued: false;
  readonly registryRegistrationAuthorized: false;
  readonly studyProtocolIssued: false;
  readonly evidenceCollectionAuthorized: false;
  readonly mappingAuthorized: false;
  readonly directionalityAuthorized: false;
  readonly calibrationAuthorized: false;
  readonly compoundRuleAuthorized: false;
  readonly productionRuleAuthorized: false;
  readonly traditionalSemanticAuthorityPromoted: false;
}

export interface EyePairXiChangRepeatCaptureDatasetSplitProtocolFR188V1 {
  readonly schemaVersion: 'fr188-eye-pair-xi-chang-repeat-capture-dataset-split-protocol-v1';
  readonly artifactVersion: '0.1.0';
  readonly recordId: typeof FR188_RECORD_ID;
  readonly authorityState: 'repeat_capture_and_dataset_split_protocol_defined_no_evidence_collected';
  readonly upstreamAuthority: {
    readonly fr187Verdict: typeof FR187_VERDICT;
    readonly fr187NextFrontier: typeof FR187_NEXT_FRONTIER;
    readonly fr187LabelingProtocolRef: typeof FR187_PROTOCOL_REF;
  };
  readonly captureProtocol: typeof FR188_CAPTURE_PROTOCOL;
  readonly splitPolicy: typeof FR188_SPLIT_POLICY;
  readonly unresolvedSupportRequirements: typeof FR188_UNRESOLVED_SUPPORT_REQUIREMENTS;
  readonly remainingUnsatisfiedMappingEvidenceRequirements: typeof FR186_REMAINING_UNSATISFIED_EVIDENCE_REQUIREMENTS;
  readonly remainingBlockers: typeof FR183_REMAINING_BLOCKERS;
  readonly authorityBoundary: FR188AuthorityBoundaryV1;
  readonly verdict: typeof FR188_VERDICT;
  readonly researchNoteRef: typeof FR188_RESEARCH_NOTE_REF;
  readonly nextFrontier: typeof FR188_NEXT_FRONTIER;
}

const ISSUED = new WeakSet<object>();

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-188 ${message}`);
}

function exactStrings(actual: readonly string[], expected: readonly string[]): boolean {
  return actual.length === expected.length && actual.every((value, index) => value === expected[index]);
}

export function assertFR188CaptureProtocol(value: FR188CaptureProtocolV1): void {
  if (
    value.protocolRef !== FR188_CAPTURE_PROTOCOL_REF
    || !exactStrings(value.metricRefs, FR188_METRIC_REFS)
    || value.captureMode !== 'single_frontal'
    || !exactStrings(value.requiredViewKeys, ['frontal'])
    || value.sessionsPerParticipant !== 2
    || value.acceptedCapturesPerSession !== 2
    || value.independentRecaptureRequired !== true
    || value.rejectedCaptureRequiresReason !== true
    || value.rejectedCaptureMayBecomeReviewItem !== false
    || value.supportAuthorityIssued !== false
    || value.registryRegistrationReady !== false
    || value.frozenBeforeEvidenceCollection !== true
    || value.postHocMutationAuthorized !== false
    || value.repeatCaptureStabilityEvidenceIssued !== false
    || value.executionAuthorized !== false
  ) fail('capture protocol weakening or authority widening detected.');
}

export function assertFR188SplitPolicy(value: FR188SplitPolicyV1): void {
  if (
    value.policyRef !== FR188_SPLIT_POLICY_REF
    || value.splitUnit !== 'participant'
    || !exactStrings(value.partitions, FR188_PARTITIONS)
    || value.participantLeakageAllowed !== false
    || value.captureFamilyLeakageAllowed !== false
    || value.thresholdSelectionMayReadHoldout !== false
    || value.finalEvaluationMayReadSelectionLabels !== false
    || value.assignmentFrozenBeforeMetricValuesObserved !== true
    || value.assignmentFrozenBeforeExpertLabelsObserved !== true
    || value.postHocReassignmentAuthorized !== false
    || value.executionAuthorized !== false
  ) fail('dataset split weakening or post-hoc mutation detected.');
}

export function assertFR188AuthorityBoundary(value: FR188AuthorityBoundaryV1): void {
  if (
    value.repeatCaptureProtocolDefined !== true
    || value.datasetSplitProtocolDefined !== true
    || value.supportAuthorityIssued !== false
    || value.protocolDefinitionCountsAsRepeatCaptureStabilityEvidence !== false
    || value.repeatCaptureStabilityEvidenceIssued !== false
    || value.operationalizationEvidenceIssued !== false
    || value.registryRegistrationAuthorized !== false
    || value.studyProtocolIssued !== false
    || value.evidenceCollectionAuthorized !== false
    || value.mappingAuthorized !== false
    || value.directionalityAuthorized !== false
    || value.calibrationAuthorized !== false
    || value.compoundRuleAuthorized !== false
    || value.productionRuleAuthorized !== false
    || value.traditionalSemanticAuthorityPromoted !== false
  ) fail('authority widening detected.');
}

function validateUpstream(): void {
  const fr187 = issueEyePairXiChangBlindedExpertOperationalizationProtocolFR187();
  assertIssuedEyePairXiChangBlindedExpertOperationalizationProtocolFR187(fr187);
  if (
    fr187.verdict !== FR187_VERDICT
    || fr187.nextFrontier !== FR187_NEXT_FRONTIER
    || fr187.protocol.protocolRef !== FR187_PROTOCOL_REF
    || fr187.authorityBoundary.repeatCaptureProtocolIssued !== false
    || fr187.authorityBoundary.datasetSplitProtocolIssued !== false
    || fr187.authorityBoundary.evidenceCollectionAuthorized !== false
    || fr187.authorityBoundary.productionRuleAuthorized !== false
  ) fail('FR-187 upstream authority drift.');
}

export function issueEyePairXiChangRepeatCaptureDatasetSplitProtocolFR188(): EyePairXiChangRepeatCaptureDatasetSplitProtocolFR188V1 {
  validateUpstream();
  assertFR188CaptureProtocol(FR188_CAPTURE_PROTOCOL);
  assertFR188SplitPolicy(FR188_SPLIT_POLICY);
  const result: EyePairXiChangRepeatCaptureDatasetSplitProtocolFR188V1 = Object.freeze({
    schemaVersion: 'fr188-eye-pair-xi-chang-repeat-capture-dataset-split-protocol-v1',
    artifactVersion: '0.1.0',
    recordId: FR188_RECORD_ID,
    authorityState: 'repeat_capture_and_dataset_split_protocol_defined_no_evidence_collected',
    upstreamAuthority: Object.freeze({
      fr187Verdict: FR187_VERDICT,
      fr187NextFrontier: FR187_NEXT_FRONTIER,
      fr187LabelingProtocolRef: FR187_PROTOCOL_REF,
    }),
    captureProtocol: FR188_CAPTURE_PROTOCOL,
    splitPolicy: FR188_SPLIT_POLICY,
    unresolvedSupportRequirements: FR188_UNRESOLVED_SUPPORT_REQUIREMENTS,
    remainingUnsatisfiedMappingEvidenceRequirements: FR186_REMAINING_UNSATISFIED_EVIDENCE_REQUIREMENTS,
    remainingBlockers: FR183_REMAINING_BLOCKERS,
    authorityBoundary: Object.freeze({
      repeatCaptureProtocolDefined: true,
      datasetSplitProtocolDefined: true,
      supportAuthorityIssued: false,
      protocolDefinitionCountsAsRepeatCaptureStabilityEvidence: false,
      repeatCaptureStabilityEvidenceIssued: false,
      operationalizationEvidenceIssued: false,
      registryRegistrationAuthorized: false,
      studyProtocolIssued: false,
      evidenceCollectionAuthorized: false,
      mappingAuthorized: false,
      directionalityAuthorized: false,
      calibrationAuthorized: false,
      compoundRuleAuthorized: false,
      productionRuleAuthorized: false,
      traditionalSemanticAuthorityPromoted: false,
    }),
    verdict: FR188_VERDICT,
    researchNoteRef: FR188_RESEARCH_NOTE_REF,
    nextFrontier: FR188_NEXT_FRONTIER,
  });
  assertFR188AuthorityBoundary(result.authorityBoundary);
  ISSUED.add(result);
  return result;
}

export function assertIssuedEyePairXiChangRepeatCaptureDatasetSplitProtocolFR188(value: EyePairXiChangRepeatCaptureDatasetSplitProtocolFR188V1): void {
  if (!ISSUED.has(value)) fail('artifact was not issued by the governed FR-188 issuer.');
  if (value.verdict !== FR188_VERDICT || value.nextFrontier !== FR188_NEXT_FRONTIER) fail('issued artifact drift.');
  assertFR188CaptureProtocol(value.captureProtocol);
  assertFR188SplitPolicy(value.splitPolicy);
  assertFR188AuthorityBoundary(value.authorityBoundary);
}
