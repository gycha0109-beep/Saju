import type { FaceMorphologyLabel } from './calibration-protocol.js';
import { FR183_REMAINING_BLOCKERS } from './eye-pair-xi-chang-operationalization-requirements-rereview-fr183.js';
import {
  assertIssuedEyePairXiChangMappingHypothesisProvenanceFR186,
  FR186_MAPPING_HYPOTHESES,
  FR186_NEXT_FRONTIER,
  FR186_REMAINING_UNSATISFIED_EVIDENCE_REQUIREMENTS,
  FR186_VERDICT,
  issueEyePairXiChangMappingHypothesisProvenanceFR186,
  type FR186MappingHypothesisV1,
} from './eye-pair-xi-chang-mapping-hypothesis-provenance-fr186.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR187_RECORD_ID =
  'research.face_reading.eye_pair.xi_chang_blinded_expert_operationalization_protocol.fr187' as const;
export const FR187_RESEARCH_NOTE_REF =
  'repo:research/face-reading/fr187-eye-pair-xi-chang-blinded-expert-operationalization-protocol.md' as const;
export const FR187_PROTOCOL_REF =
  'research.face_reading.xi_chang_blinded_expert_operationalization_protocol.fr187.v1' as const;
export const FR187_VERDICT =
  'GOVERNED_XI_CHANG_BLINDED_EXPERT_OPERATIONALIZATION_PROTOCOL_DEFINED_EVIDENCE_COLLECTION_MAPPING_DIRECTIONALITY_AND_CALIBRATION_NOT_ADMITTED' as const;
export const FR187_NEXT_FRONTIER =
  'define_governed_xi_chang_repeat_capture_and_dataset_split_protocol_before_any_evidence_collection_directionality_or_calibration' as const;

export const FR187_LABEL_SET = Object.freeze(['met', 'not_met', 'abstain'] as const satisfies readonly FaceMorphologyLabel[]);
export const FR187_REVIEWER_MUST_NOT_SEE = Object.freeze([
  'metric_values',
  'candidate_threshold',
  'peer_labels',
  'fortune_output',
  'candidate_directionality',
  'mapping_outcome',
] as const);
export const FR187_PROHIBITED_REVIEWER_INFERENCES = Object.freeze([
  'metric_formula_from_source_wording',
  'metric_directionality_from_source_wording',
  'machine_threshold_from_source_wording',
  'traditional_cun_to_normalized_ratio_conversion',
  'traditional_ji_operationalization',
  'compound_xi_er_chang_boolean_semantics',
] as const);

export interface FR187ReviewerPlanV1 {
  readonly reviewersPerItem: 3;
  readonly independentInitialLabels: true;
  readonly allowAbstain: true;
  readonly blindToMetricValues: true;
  readonly blindToCandidateThreshold: true;
  readonly blindToPeerLabels: true;
  readonly blindToFortuneOutput: true;
  readonly blindToCandidateDirectionality: true;
  readonly blindToMappingOutcome: true;
  readonly agreementRule: {
    readonly kind: 'supermajority_non_abstain';
    readonly minAgreementFraction: number;
    readonly minNonAbstainLabels: 2;
    readonly noConsensusIsFailClosed: true;
  };
  readonly adjudicationMayOverwriteInitialLabels: false;
  readonly initialLabelsRemainAuditable: true;
}

export interface FR187OperationalizationTaskV1 {
  readonly taskId:
    | 'research.face_reading.xi_blinded_operationalization_task.fr187.v1'
    | 'research.face_reading.chang_blinded_operationalization_task.fr187.v1';
  readonly protocolRef: typeof FR187_PROTOCOL_REF;
  readonly hypothesisId: FR186MappingHypothesisV1['hypothesisId'];
  readonly traditionalConcept: FR186MappingHypothesisV1['traditionalConcept'];
  readonly candidateMetricRefInternalOnly: FR186MappingHypothesisV1['candidateMetricRef'];
  readonly reviewerMaySeeCandidateMetricRef: false;
  readonly sourceWorkRef: 'work.shenxiang_quanbian';
  readonly sourceWitnessId: 'witness.shenxiang_quanbian.nlc_1925';
  readonly sourceClauses: readonly string[];
  readonly exactSourcePage: 146;
  readonly instructionRef: string;
  readonly sourceGroundedInstruction: string;
  readonly labelSet: typeof FR187_LABEL_SET;
  readonly reviewerMustNotSee: typeof FR187_REVIEWER_MUST_NOT_SEE;
  readonly prohibitedReviewerInferences: typeof FR187_PROHIBITED_REVIEWER_INFERENCES;
  readonly reviewerPlan: FR187ReviewerPlanV1;
  readonly protocolFrozenBeforeEvidenceCollection: true;
  readonly postHocMutationAuthorized: false;
  readonly reviewItemsObserved: 0;
  readonly labelsCollected: 0;
  readonly consensusProduced: false;
  readonly operationalizationEvidenceIssued: false;
  readonly executionAuthorized: false;
}

const REVIEWER_PLAN: FR187ReviewerPlanV1 = Object.freeze({
  reviewersPerItem: 3 as const,
  independentInitialLabels: true as const,
  allowAbstain: true as const,
  blindToMetricValues: true as const,
  blindToCandidateThreshold: true as const,
  blindToPeerLabels: true as const,
  blindToFortuneOutput: true as const,
  blindToCandidateDirectionality: true as const,
  blindToMappingOutcome: true as const,
  agreementRule: Object.freeze({
    kind: 'supermajority_non_abstain' as const,
    minAgreementFraction: 2 / 3,
    minNonAbstainLabels: 2 as const,
    noConsensusIsFailClosed: true as const,
  }),
  adjudicationMayOverwriteInitialLabels: false as const,
  initialLabelsRemainAuditable: true as const,
});

const XI_HYPOTHESIS = FR186_MAPPING_HYPOTHESES[0]!;
const CHANG_HYPOTHESIS = FR186_MAPPING_HYPOTHESES[1]!;

export const FR187_OPERATIONALIZATION_TASKS: readonly FR187OperationalizationTaskV1[] = Object.freeze([
  Object.freeze({
    taskId: 'research.face_reading.xi_blinded_operationalization_task.fr187.v1' as const,
    protocolRef: FR187_PROTOCOL_REF,
    hypothesisId: XI_HYPOTHESIS.hypothesisId,
    traditionalConcept: XI_HYPOTHESIS.traditionalConcept,
    candidateMetricRefInternalOnly: XI_HYPOTHESIS.candidateMetricRef,
    reviewerMaySeeCandidateMetricRef: false as const,
    sourceWorkRef: XI_HYPOTHESIS.sourceWorkRef,
    sourceWitnessId: XI_HYPOTHESIS.sourceWitnessId,
    sourceClauses: XI_HYPOTHESIS.sourceClauses,
    exactSourcePage: XI_HYPOTHESIS.exactSourcePage,
    instructionRef: `${FR187_RESEARCH_NOTE_REF}#xi-reviewer-instruction`,
    sourceGroundedInstruction: 'Using only the cited direct-source concept wording and the future quality-approved review artifact, independently label whether the review item supports the traditional concept 細 as met, not_met, or abstain. Do not infer or use any metric formula, metric direction, threshold, percentile, fortune output, peer judgment, or mapping outcome.',
    labelSet: FR187_LABEL_SET,
    reviewerMustNotSee: FR187_REVIEWER_MUST_NOT_SEE,
    prohibitedReviewerInferences: FR187_PROHIBITED_REVIEWER_INFERENCES,
    reviewerPlan: REVIEWER_PLAN,
    protocolFrozenBeforeEvidenceCollection: true as const,
    postHocMutationAuthorized: false as const,
    reviewItemsObserved: 0 as const,
    labelsCollected: 0 as const,
    consensusProduced: false as const,
    operationalizationEvidenceIssued: false as const,
    executionAuthorized: false as const,
  }),
  Object.freeze({
    taskId: 'research.face_reading.chang_blinded_operationalization_task.fr187.v1' as const,
    protocolRef: FR187_PROTOCOL_REF,
    hypothesisId: CHANG_HYPOTHESIS.hypothesisId,
    traditionalConcept: CHANG_HYPOTHESIS.traditionalConcept,
    candidateMetricRefInternalOnly: CHANG_HYPOTHESIS.candidateMetricRef,
    reviewerMaySeeCandidateMetricRef: false as const,
    sourceWorkRef: CHANG_HYPOTHESIS.sourceWorkRef,
    sourceWitnessId: CHANG_HYPOTHESIS.sourceWitnessId,
    sourceClauses: CHANG_HYPOTHESIS.sourceClauses,
    exactSourcePage: CHANG_HYPOTHESIS.exactSourcePage,
    instructionRef: `${FR187_RESEARCH_NOTE_REF}#chang-reviewer-instruction`,
    sourceGroundedInstruction: 'Using only the cited direct-source concept wording and the future quality-approved review artifact, independently label whether the review item supports the traditional concept 長 as met, not_met, or abstain. Do not convert 寸 into a normalized ratio and do not infer or use any metric formula, metric direction, threshold, percentile, fortune output, peer judgment, or mapping outcome.',
    labelSet: FR187_LABEL_SET,
    reviewerMustNotSee: FR187_REVIEWER_MUST_NOT_SEE,
    prohibitedReviewerInferences: FR187_PROHIBITED_REVIEWER_INFERENCES,
    reviewerPlan: REVIEWER_PLAN,
    protocolFrozenBeforeEvidenceCollection: true as const,
    postHocMutationAuthorized: false as const,
    reviewItemsObserved: 0 as const,
    labelsCollected: 0 as const,
    consensusProduced: false as const,
    operationalizationEvidenceIssued: false as const,
    executionAuthorized: false as const,
  }),
] as const);

export type FR187ConsensusState = 'met' | 'not_met' | 'no_consensus';

export function evaluateFR187Consensus(labels: readonly FaceMorphologyLabel[]): FR187ConsensusState {
  if (labels.length !== REVIEWER_PLAN.reviewersPerItem) {
    throw new FaceAuthorityValidationError('FR-187 consensus requires exactly three independent initial labels.');
  }
  if (labels.some((label) => !FR187_LABEL_SET.includes(label))) {
    throw new FaceAuthorityValidationError('FR-187 consensus received unsupported label.');
  }
  const metCount = labels.filter((label) => label === 'met').length;
  const notMetCount = labels.filter((label) => label === 'not_met').length;
  const nonAbstainCount = metCount + notMetCount;
  if (nonAbstainCount < REVIEWER_PLAN.agreementRule.minNonAbstainLabels) return 'no_consensus';
  if (metCount / nonAbstainCount >= REVIEWER_PLAN.agreementRule.minAgreementFraction && metCount > notMetCount) return 'met';
  if (notMetCount / nonAbstainCount >= REVIEWER_PLAN.agreementRule.minAgreementFraction && notMetCount > metCount) return 'not_met';
  return 'no_consensus';
}

export interface FR187AuthorityBoundaryV1 {
  readonly blindedExpertOperationalizationProtocolDefined: true;
  readonly protocolDefinitionCountsAsOperationalizationEvidence: false;
  readonly independentBlindedExpertOperationalizationEvidenceIssued: false;
  readonly evidenceCollectionAuthorized: false;
  readonly reviewArtifactIngestionAuthorized: false;
  readonly repeatCaptureProtocolIssued: false;
  readonly datasetSplitProtocolIssued: false;
  readonly xiMetricBindingAuthorized: false;
  readonly changMetricBindingAuthorized: false;
  readonly metricDirectionalityAuthorized: false;
  readonly stableCriterionIdentityIssued: false;
  readonly thresholdIssued: false;
  readonly percentileIssued: false;
  readonly referencePopulationIssued: false;
  readonly calibrationEvidenceIssued: false;
  readonly calibrationProtocolIssued: false;
  readonly calibratedDecisionRuleIssued: false;
  readonly classifierIssued: false;
  readonly scoreIssued: false;
  readonly rankIssued: false;
  readonly traditionalJiOperationalizationAuthorized: false;
  readonly traditionalCunMappingAuthorized: false;
  readonly compoundXiErChangRuleAuthorized: false;
  readonly morphologyProduced: false;
  readonly criterionStatesIssued: 0;
  readonly structuredClaimsIssued: 0;
  readonly boundedNarrativesIssued: 0;
  readonly productionRuleAuthorized: false;
  readonly traditionalSemanticAuthorityPromoted: false;
}

export interface EyePairXiChangBlindedExpertOperationalizationProtocolFR187V1 {
  readonly schemaVersion: 'fr187-eye-pair-xi-chang-blinded-expert-operationalization-protocol-v1';
  readonly artifactVersion: '0.1.0';
  readonly recordId: typeof FR187_RECORD_ID;
  readonly authorityState: 'blinded_expert_operationalization_protocol_defined_no_evidence_collected';
  readonly upstreamAuthority: {
    readonly fr186Verdict: typeof FR186_VERDICT;
    readonly fr186NextFrontier: typeof FR186_NEXT_FRONTIER;
    readonly hypothesesRemainFrozen: true;
  };
  readonly protocol: {
    readonly protocolRef: typeof FR187_PROTOCOL_REF;
    readonly tasks: typeof FR187_OPERATIONALIZATION_TASKS;
    readonly labelSet: typeof FR187_LABEL_SET;
    readonly reviewerMustNotSee: typeof FR187_REVIEWER_MUST_NOT_SEE;
    readonly reviewerPlan: FR187ReviewerPlanV1;
    readonly protocolFrozenBeforeEvidenceCollection: true;
    readonly postHocProtocolMutationAuthorized: false;
  };
  readonly evidenceProgression: {
    readonly newlySatisfiedMappingEvidenceRequirements: readonly [];
    readonly remainingUnsatisfiedMappingEvidenceRequirements: typeof FR186_REMAINING_UNSATISFIED_EVIDENCE_REQUIREMENTS;
    readonly operationalizationProtocolPrerequisiteDefined: true;
    readonly independentBlindedExpertOperationalizationEvidenceStillRequired: true;
  };
  readonly blockerAccounting: {
    readonly resolvedExistingFR184Blockers: readonly [];
    readonly remainingBlockers: typeof FR183_REMAINING_BLOCKERS;
    readonly protocolDefinitionDoesNotResolveMappingBlocker: true;
    readonly protocolDefinitionDoesNotResolveDirectionalityBlocker: true;
    readonly protocolDefinitionDoesNotResolveCalibrationBlockers: true;
    readonly protocolDefinitionDoesNotResolveCompoundBlocker: true;
  };
  readonly authorityBoundary: FR187AuthorityBoundaryV1;
  readonly privacyBoundary: {
    readonly participantDataCollected: false;
    readonly participantImageAccepted: false;
    readonly reviewArtifactAccepted: false;
    readonly expertLabelsCollected: false;
    readonly rawProviderResponseAccepted: false;
    readonly rawLandmarkSetAccepted: false;
    readonly metricValuesObserved: false;
    readonly metricValuesPersisted: false;
    readonly faceEmbeddingAccepted: false;
    readonly identityTemplateAccepted: false;
    readonly biometricIdentityMatchingPerformed: false;
  };
  readonly verdict: typeof FR187_VERDICT;
  readonly researchNoteRef: typeof FR187_RESEARCH_NOTE_REF;
  readonly nextFrontier: typeof FR187_NEXT_FRONTIER;
}

const ISSUED = new WeakSet<object>();

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-187 ${message}`);
}

function assertStringArrayEqual(actual: readonly string[], expected: readonly string[]): void {
  if (actual.length !== expected.length || actual.some((value, index) => value !== expected[index])) {
    fail('array content drift.');
  }
}

export function assertFR187ReviewerPlan(plan: FR187ReviewerPlanV1): void {
  if (
    plan.reviewersPerItem !== 3
    || plan.independentInitialLabels !== true
    || plan.allowAbstain !== true
    || plan.blindToMetricValues !== true
    || plan.blindToCandidateThreshold !== true
    || plan.blindToPeerLabels !== true
    || plan.blindToFortuneOutput !== true
    || plan.blindToCandidateDirectionality !== true
    || plan.blindToMappingOutcome !== true
    || plan.agreementRule.kind !== 'supermajority_non_abstain'
    || plan.agreementRule.minAgreementFraction !== 2 / 3
    || plan.agreementRule.minNonAbstainLabels !== 2
    || plan.agreementRule.noConsensusIsFailClosed !== true
    || plan.adjudicationMayOverwriteInitialLabels !== false
    || plan.initialLabelsRemainAuditable !== true
  ) fail('reviewer plan weakening or drift.');
}

export function assertFR187OperationalizationTask(
  actual: FR187OperationalizationTaskV1,
  expected: FR187OperationalizationTaskV1,
): void {
  if (
    actual.taskId !== expected.taskId
    || actual.protocolRef !== FR187_PROTOCOL_REF
    || actual.hypothesisId !== expected.hypothesisId
    || actual.traditionalConcept !== expected.traditionalConcept
    || actual.candidateMetricRefInternalOnly !== expected.candidateMetricRefInternalOnly
    || actual.reviewerMaySeeCandidateMetricRef !== false
    || actual.sourceWorkRef !== expected.sourceWorkRef
    || actual.sourceWitnessId !== expected.sourceWitnessId
    || actual.exactSourcePage !== 146
    || actual.instructionRef !== expected.instructionRef
    || actual.sourceGroundedInstruction !== expected.sourceGroundedInstruction
    || actual.labelSet !== FR187_LABEL_SET
    || actual.reviewerMustNotSee !== FR187_REVIEWER_MUST_NOT_SEE
    || actual.prohibitedReviewerInferences !== FR187_PROHIBITED_REVIEWER_INFERENCES
    || actual.protocolFrozenBeforeEvidenceCollection !== true
    || actual.postHocMutationAuthorized !== false
    || actual.reviewItemsObserved !== 0
    || actual.labelsCollected !== 0
    || actual.consensusProduced !== false
    || actual.operationalizationEvidenceIssued !== false
    || actual.executionAuthorized !== false
  ) fail('operationalization task authority widening or provenance drift.');
  assertStringArrayEqual(actual.sourceClauses, expected.sourceClauses);
  assertFR187ReviewerPlan(actual.reviewerPlan);
}

export function assertFR187AuthorityBoundary(boundary: FR187AuthorityBoundaryV1): void {
  if (
    boundary.blindedExpertOperationalizationProtocolDefined !== true
    || boundary.protocolDefinitionCountsAsOperationalizationEvidence !== false
    || boundary.independentBlindedExpertOperationalizationEvidenceIssued !== false
    || boundary.evidenceCollectionAuthorized !== false
    || boundary.reviewArtifactIngestionAuthorized !== false
    || boundary.repeatCaptureProtocolIssued !== false
    || boundary.datasetSplitProtocolIssued !== false
    || boundary.xiMetricBindingAuthorized !== false
    || boundary.changMetricBindingAuthorized !== false
    || boundary.metricDirectionalityAuthorized !== false
    || boundary.stableCriterionIdentityIssued !== false
    || boundary.thresholdIssued !== false
    || boundary.percentileIssued !== false
    || boundary.referencePopulationIssued !== false
    || boundary.calibrationEvidenceIssued !== false
    || boundary.calibrationProtocolIssued !== false
    || boundary.calibratedDecisionRuleIssued !== false
    || boundary.classifierIssued !== false
    || boundary.scoreIssued !== false
    || boundary.rankIssued !== false
    || boundary.traditionalJiOperationalizationAuthorized !== false
    || boundary.traditionalCunMappingAuthorized !== false
    || boundary.compoundXiErChangRuleAuthorized !== false
    || boundary.morphologyProduced !== false
    || boundary.criterionStatesIssued !== 0
    || boundary.structuredClaimsIssued !== 0
    || boundary.boundedNarrativesIssued !== 0
    || boundary.productionRuleAuthorized !== false
    || boundary.traditionalSemanticAuthorityPromoted !== false
  ) fail('authority widening detected.');
}

function validateUpstreamAuthority(): void {
  const fr186 = issueEyePairXiChangMappingHypothesisProvenanceFR186();
  assertIssuedEyePairXiChangMappingHypothesisProvenanceFR186(fr186);
  if (
    fr186.verdict !== FR186_VERDICT
    || fr186.nextFrontier !== FR186_NEXT_FRONTIER
    || fr186.hypotheses !== FR186_MAPPING_HYPOTHESES
    || fr186.hypotheses.length !== 2
    || fr186.hypotheses.some((hypothesis) =>
      hypothesis.frozenBeforeEvidenceCollection !== true
      || hypothesis.postHocMutationAuthorized !== false
      || hypothesis.evidenceCollected !== false
      || hypothesis.expertLabelsCollected !== false
      || hypothesis.metricValuesObserved !== false
      || hypothesis.mappingAuthorized !== false
      || hypothesis.directionality !== null
      || hypothesis.thresholdRef !== null
      || hypothesis.calibrationRef !== null
    )
  ) fail('FR-186 frozen pre-evidence hypothesis boundary drift.');
  if (!FR186_REMAINING_UNSATISFIED_EVIDENCE_REQUIREMENTS.includes('independent_blinded_expert_operationalization')) {
    fail('FR-186 no longer requires blinded expert operationalization evidence.');
  }
}

export function issueEyePairXiChangBlindedExpertOperationalizationProtocolFR187(): EyePairXiChangBlindedExpertOperationalizationProtocolFR187V1 {
  validateUpstreamAuthority();
  for (let index = 0; index < FR187_OPERATIONALIZATION_TASKS.length; index += 1) {
    const task = FR187_OPERATIONALIZATION_TASKS[index]!;
    assertFR187OperationalizationTask(task, task);
  }
  assertFR187ReviewerPlan(REVIEWER_PLAN);

  const result: EyePairXiChangBlindedExpertOperationalizationProtocolFR187V1 = Object.freeze({
    schemaVersion: 'fr187-eye-pair-xi-chang-blinded-expert-operationalization-protocol-v1' as const,
    artifactVersion: '0.1.0' as const,
    recordId: FR187_RECORD_ID,
    authorityState: 'blinded_expert_operationalization_protocol_defined_no_evidence_collected' as const,
    upstreamAuthority: Object.freeze({
      fr186Verdict: FR186_VERDICT,
      fr186NextFrontier: FR186_NEXT_FRONTIER,
      hypothesesRemainFrozen: true as const,
    }),
    protocol: Object.freeze({
      protocolRef: FR187_PROTOCOL_REF,
      tasks: FR187_OPERATIONALIZATION_TASKS,
      labelSet: FR187_LABEL_SET,
      reviewerMustNotSee: FR187_REVIEWER_MUST_NOT_SEE,
      reviewerPlan: REVIEWER_PLAN,
      protocolFrozenBeforeEvidenceCollection: true as const,
      postHocProtocolMutationAuthorized: false as const,
    }),
    evidenceProgression: Object.freeze({
      newlySatisfiedMappingEvidenceRequirements: Object.freeze([] as const),
      remainingUnsatisfiedMappingEvidenceRequirements: FR186_REMAINING_UNSATISFIED_EVIDENCE_REQUIREMENTS,
      operationalizationProtocolPrerequisiteDefined: true as const,
      independentBlindedExpertOperationalizationEvidenceStillRequired: true as const,
    }),
    blockerAccounting: Object.freeze({
      resolvedExistingFR184Blockers: Object.freeze([] as const),
      remainingBlockers: FR183_REMAINING_BLOCKERS,
      protocolDefinitionDoesNotResolveMappingBlocker: true as const,
      protocolDefinitionDoesNotResolveDirectionalityBlocker: true as const,
      protocolDefinitionDoesNotResolveCalibrationBlockers: true as const,
      protocolDefinitionDoesNotResolveCompoundBlocker: true as const,
    }),
    authorityBoundary: Object.freeze({
      blindedExpertOperationalizationProtocolDefined: true as const,
      protocolDefinitionCountsAsOperationalizationEvidence: false as const,
      independentBlindedExpertOperationalizationEvidenceIssued: false as const,
      evidenceCollectionAuthorized: false as const,
      reviewArtifactIngestionAuthorized: false as const,
      repeatCaptureProtocolIssued: false as const,
      datasetSplitProtocolIssued: false as const,
      xiMetricBindingAuthorized: false as const,
      changMetricBindingAuthorized: false as const,
      metricDirectionalityAuthorized: false as const,
      stableCriterionIdentityIssued: false as const,
      thresholdIssued: false as const,
      percentileIssued: false as const,
      referencePopulationIssued: false as const,
      calibrationEvidenceIssued: false as const,
      calibrationProtocolIssued: false as const,
      calibratedDecisionRuleIssued: false as const,
      classifierIssued: false as const,
      scoreIssued: false as const,
      rankIssued: false as const,
      traditionalJiOperationalizationAuthorized: false as const,
      traditionalCunMappingAuthorized: false as const,
      compoundXiErChangRuleAuthorized: false as const,
      morphologyProduced: false as const,
      criterionStatesIssued: 0 as const,
      structuredClaimsIssued: 0 as const,
      boundedNarrativesIssued: 0 as const,
      productionRuleAuthorized: false as const,
      traditionalSemanticAuthorityPromoted: false as const,
    }),
    privacyBoundary: Object.freeze({
      participantDataCollected: false as const,
      participantImageAccepted: false as const,
      reviewArtifactAccepted: false as const,
      expertLabelsCollected: false as const,
      rawProviderResponseAccepted: false as const,
      rawLandmarkSetAccepted: false as const,
      metricValuesObserved: false as const,
      metricValuesPersisted: false as const,
      faceEmbeddingAccepted: false as const,
      identityTemplateAccepted: false as const,
      biometricIdentityMatchingPerformed: false as const,
    }),
    verdict: FR187_VERDICT,
    researchNoteRef: FR187_RESEARCH_NOTE_REF,
    nextFrontier: FR187_NEXT_FRONTIER,
  });

  assertFR187AuthorityBoundary(result.authorityBoundary);
  ISSUED.add(result);
  return result;
}

export function assertIssuedEyePairXiChangBlindedExpertOperationalizationProtocolFR187(
  result: EyePairXiChangBlindedExpertOperationalizationProtocolFR187V1,
): void {
  if (!ISSUED.has(result)) fail('result was not issued by the governed FR-187 authority function.');
  assertFR187AuthorityBoundary(result.authorityBoundary);
  if (
    result.verdict !== FR187_VERDICT
    || result.nextFrontier !== FR187_NEXT_FRONTIER
    || result.protocol.tasks !== FR187_OPERATIONALIZATION_TASKS
    || result.evidenceProgression.remainingUnsatisfiedMappingEvidenceRequirements !== FR186_REMAINING_UNSATISFIED_EVIDENCE_REQUIREMENTS
    || result.blockerAccounting.remainingBlockers !== FR183_REMAINING_BLOCKERS
  ) fail('issued record drift.');
}
