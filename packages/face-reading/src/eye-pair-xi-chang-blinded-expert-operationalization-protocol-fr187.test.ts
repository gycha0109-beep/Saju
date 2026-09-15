import { describe, expect, it } from 'vitest';
import { FR183_REMAINING_BLOCKERS } from './eye-pair-xi-chang-operationalization-requirements-rereview-fr183.js';
import {
  FR186_MAPPING_HYPOTHESES,
  FR186_NEXT_FRONTIER,
  FR186_REMAINING_UNSATISFIED_EVIDENCE_REQUIREMENTS,
  issueEyePairXiChangMappingHypothesisProvenanceFR186,
} from './eye-pair-xi-chang-mapping-hypothesis-provenance-fr186.js';
import {
  assertFR187AuthorityBoundary,
  assertFR187OperationalizationTask,
  assertFR187ReviewerPlan,
  assertIssuedEyePairXiChangBlindedExpertOperationalizationProtocolFR187,
  evaluateFR187Consensus,
  FR187_LABEL_SET,
  FR187_NEXT_FRONTIER,
  FR187_OPERATIONALIZATION_TASKS,
  FR187_REVIEWER_MUST_NOT_SEE,
  FR187_VERDICT,
  issueEyePairXiChangBlindedExpertOperationalizationProtocolFR187,
  type EyePairXiChangBlindedExpertOperationalizationProtocolFR187V1,
  type FR187AuthorityBoundaryV1,
  type FR187OperationalizationTaskV1,
  type FR187ReviewerPlanV1,
} from './eye-pair-xi-chang-blinded-expert-operationalization-protocol-fr187.js';

function forgedFR187(): EyePairXiChangBlindedExpertOperationalizationProtocolFR187V1 {
  return Object.freeze({}) as unknown as EyePairXiChangBlindedExpertOperationalizationProtocolFR187V1;
}

describe('FR187 Xi/Chang blinded expert operationalization protocol', () => {
  it('continues exactly from FR186 without treating protocol definition as evidence', () => {
    const fr186 = issueEyePairXiChangMappingHypothesisProvenanceFR186();
    const result = issueEyePairXiChangBlindedExpertOperationalizationProtocolFR187();

    expect(FR186_NEXT_FRONTIER).toBe(
      'define_governed_blinded_expert_operationalization_protocol_for_xi_chang_mapping_hypotheses_before_evidence_collection_directionality_or_calibration',
    );
    expect(fr186.hypotheses).toBe(FR186_MAPPING_HYPOTHESES);
    expect(result.upstreamAuthority.hypothesesRemainFrozen).toBe(true);
    expect(result.evidenceProgression.newlySatisfiedMappingEvidenceRequirements).toEqual([]);
    expect(result.evidenceProgression.remainingUnsatisfiedMappingEvidenceRequirements)
      .toBe(FR186_REMAINING_UNSATISFIED_EVIDENCE_REQUIREMENTS);
    expect(result.evidenceProgression.remainingUnsatisfiedMappingEvidenceRequirements)
      .toContain('independent_blinded_expert_operationalization');
    expect(result.evidenceProgression.operationalizationProtocolPrerequisiteDefined).toBe(true);
    expect(result.evidenceProgression.independentBlindedExpertOperationalizationEvidenceStillRequired).toBe(true);
  });

  it('defines exactly two source-grounded tasks with repository-compatible blinded labeling rules', () => {
    const result = issueEyePairXiChangBlindedExpertOperationalizationProtocolFR187();
    expect(result.protocol.tasks).toBe(FR187_OPERATIONALIZATION_TASKS);
    expect(result.protocol.tasks).toHaveLength(2);
    expect(result.protocol.labelSet).toBe(FR187_LABEL_SET);
    expect(result.protocol.labelSet).toEqual(['met', 'not_met', 'abstain']);
    expect(result.protocol.reviewerMustNotSee).toBe(FR187_REVIEWER_MUST_NOT_SEE);
    expect(result.protocol.reviewerMustNotSee).toEqual([
      'metric_values',
      'candidate_threshold',
      'peer_labels',
      'fortune_output',
      'candidate_directionality',
      'mapping_outcome',
    ]);
    expect(result.protocol.reviewerPlan.reviewersPerItem).toBe(3);
    expect(result.protocol.reviewerPlan.independentInitialLabels).toBe(true);
    expect(result.protocol.reviewerPlan.allowAbstain).toBe(true);
    expect(result.protocol.reviewerPlan.agreementRule.minAgreementFraction).toBe(2 / 3);
    expect(result.protocol.reviewerPlan.agreementRule.minNonAbstainLabels).toBe(2);
    expect(result.protocol.reviewerPlan.agreementRule.noConsensusIsFailClosed).toBe(true);
    expect(result.protocol.reviewerPlan.adjudicationMayOverwriteInitialLabels).toBe(false);
    expect(() => assertFR187ReviewerPlan(result.protocol.reviewerPlan)).not.toThrow();

    for (let index = 0; index < result.protocol.tasks.length; index += 1) {
      const task = result.protocol.tasks[index]!;
      expect(task.hypothesisId).toBe(FR186_MAPPING_HYPOTHESES[index]!.hypothesisId);
      expect(task.reviewerMaySeeCandidateMetricRef).toBe(false);
      expect(task.protocolFrozenBeforeEvidenceCollection).toBe(true);
      expect(task.postHocMutationAuthorized).toBe(false);
      expect(task.reviewItemsObserved).toBe(0);
      expect(task.labelsCollected).toBe(0);
      expect(task.consensusProduced).toBe(false);
      expect(task.operationalizationEvidenceIssued).toBe(false);
      expect(task.executionAuthorized).toBe(false);
    }
  });

  it('defines fail-closed consensus without rewriting individual labels', () => {
    expect(evaluateFR187Consensus(['met', 'met', 'abstain'])).toBe('met');
    expect(evaluateFR187Consensus(['not_met', 'not_met', 'met'])).toBe('not_met');
    expect(evaluateFR187Consensus(['met', 'not_met', 'abstain'])).toBe('no_consensus');
    expect(evaluateFR187Consensus(['abstain', 'abstain', 'met'])).toBe('no_consensus');
    expect(() => evaluateFR187Consensus(['met', 'met'])).toThrow(/exactly three/u);
  });

  it('rejects reviewer-plan weakening and post-hoc or execution widening', () => {
    const result = issueEyePairXiChangBlindedExpertOperationalizationProtocolFR187();
    const plan = result.protocol.reviewerPlan;
    const invalidPlans = [
      { ...plan, reviewersPerItem: 2 },
      { ...plan, allowAbstain: false },
      { ...plan, blindToMetricValues: false },
      { ...plan, blindToCandidateThreshold: false },
      { ...plan, blindToPeerLabels: false },
      { ...plan, blindToFortuneOutput: false },
      { ...plan, blindToCandidateDirectionality: false },
      { ...plan, blindToMappingOutcome: false },
      { ...plan, adjudicationMayOverwriteInitialLabels: true },
    ] as unknown as FR187ReviewerPlanV1[];
    for (const invalid of invalidPlans) expect(() => assertFR187ReviewerPlan(invalid)).toThrow(/weakening|drift/u);

    const base = FR187_OPERATIONALIZATION_TASKS[0]!;
    const invalidTasks = [
      { ...base, reviewerMaySeeCandidateMetricRef: true },
      { ...base, postHocMutationAuthorized: true },
      { ...base, reviewItemsObserved: 1 },
      { ...base, labelsCollected: 1 },
      { ...base, consensusProduced: true },
      { ...base, operationalizationEvidenceIssued: true },
      { ...base, executionAuthorized: true },
      { ...base, labelSet: Object.freeze(['met', 'not_met']) },
    ] as unknown as FR187OperationalizationTaskV1[];
    for (const invalid of invalidTasks) {
      expect(() => assertFR187OperationalizationTask(invalid, base)).toThrow(/widening|drift/u);
    }
  });

  it('preserves all thirteen existing mapping, directionality, calibration, and composition blockers', () => {
    const result = issueEyePairXiChangBlindedExpertOperationalizationProtocolFR187();
    expect(result.blockerAccounting.resolvedExistingFR184Blockers).toEqual([]);
    expect(result.blockerAccounting.remainingBlockers).toBe(FR183_REMAINING_BLOCKERS);
    expect(result.blockerAccounting.remainingBlockers).toHaveLength(13);
    expect(result.blockerAccounting.protocolDefinitionDoesNotResolveMappingBlocker).toBe(true);
    expect(result.blockerAccounting.protocolDefinitionDoesNotResolveDirectionalityBlocker).toBe(true);
    expect(result.blockerAccounting.protocolDefinitionDoesNotResolveCalibrationBlockers).toBe(true);
    expect(result.blockerAccounting.protocolDefinitionDoesNotResolveCompoundBlocker).toBe(true);
  });

  it('rejects evidence collection, semantic binding, calibration, composition, and Production widening', () => {
    const result = issueEyePairXiChangBlindedExpertOperationalizationProtocolFR187();
    expect(() => assertFR187AuthorityBoundary(result.authorityBoundary)).not.toThrow();

    const invalid = [
      { ...result.authorityBoundary, protocolDefinitionCountsAsOperationalizationEvidence: true },
      { ...result.authorityBoundary, independentBlindedExpertOperationalizationEvidenceIssued: true },
      { ...result.authorityBoundary, evidenceCollectionAuthorized: true },
      { ...result.authorityBoundary, reviewArtifactIngestionAuthorized: true },
      { ...result.authorityBoundary, repeatCaptureProtocolIssued: true },
      { ...result.authorityBoundary, datasetSplitProtocolIssued: true },
      { ...result.authorityBoundary, xiMetricBindingAuthorized: true },
      { ...result.authorityBoundary, changMetricBindingAuthorized: true },
      { ...result.authorityBoundary, metricDirectionalityAuthorized: true },
      { ...result.authorityBoundary, stableCriterionIdentityIssued: true },
      { ...result.authorityBoundary, thresholdIssued: true },
      { ...result.authorityBoundary, calibrationEvidenceIssued: true },
      { ...result.authorityBoundary, calibrationProtocolIssued: true },
      { ...result.authorityBoundary, classifierIssued: true },
      { ...result.authorityBoundary, compoundXiErChangRuleAuthorized: true },
      { ...result.authorityBoundary, morphologyProduced: true },
      { ...result.authorityBoundary, productionRuleAuthorized: true },
      { ...result.authorityBoundary, traditionalSemanticAuthorityPromoted: true },
    ] as unknown as FR187AuthorityBoundaryV1[];
    for (const boundary of invalid) expect(() => assertFR187AuthorityBoundary(boundary)).toThrow(/widening/u);
  });

  it('issues only the protocol definition and advances to repeat-capture / split protocol work', () => {
    const result = issueEyePairXiChangBlindedExpertOperationalizationProtocolFR187();
    expect(result.verdict).toBe(FR187_VERDICT);
    expect(FR187_VERDICT).toBe(
      'GOVERNED_XI_CHANG_BLINDED_EXPERT_OPERATIONALIZATION_PROTOCOL_DEFINED_EVIDENCE_COLLECTION_MAPPING_DIRECTIONALITY_AND_CALIBRATION_NOT_ADMITTED',
    );
    expect(result.nextFrontier).toBe(FR187_NEXT_FRONTIER);
    expect(FR187_NEXT_FRONTIER).toBe(
      'define_governed_xi_chang_repeat_capture_and_dataset_split_protocol_before_any_evidence_collection_directionality_or_calibration',
    );
    expect(Object.values(result.privacyBoundary).every((value) => value === false)).toBe(true);
    expect(result.authorityBoundary.productionRuleAuthorized).toBe(false);
    expect(result.authorityBoundary.traditionalSemanticAuthorityPromoted).toBe(false);
    expect(() => assertIssuedEyePairXiChangBlindedExpertOperationalizationProtocolFR187(result)).not.toThrow();
    expect(() => assertIssuedEyePairXiChangBlindedExpertOperationalizationProtocolFR187(forgedFR187())).toThrow(/not issued/u);
  });
});
