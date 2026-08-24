import { describe, expect, it } from 'vitest';
import {
  I170_ALLOWED_LINEAGE_FINDINGS,
  I170_LINEAGE_QUESTION_IDS,
  I170_LINEAGE_REQUIREMENT_IDS,
  type I170SecondWaveCandidateEvidenceAdequacyLineageReadinessReviewReport,
} from '../src/research/i170-second-wave-candidate-evidence-adequacy-lineage-readiness-review.js';
import { buildI171LiShunxiangTargetedLineageEvidence } from '../src/research/i171-li-shunxiang-targeted-lineage-evidence.js';

function validI170(): I170SecondWaveCandidateEvidenceAdequacyLineageReadinessReviewReport {
  return {
    reviewId: 'i170_fixture',
    status: 'RESOLVED_SECOND_WAVE_CANDIDATE_EVIDENCE_ADEQUACY_LINEAGE_READINESS_REVIEW',
    decision:
      'LI_SHUNXIANG_ONLY_MINIMUM_ADEQUACY_CANDIDATE_READY_FOR_TARGETED_LINEAGE_ADJUDICATION_FOUR_QUESTIONS_FROZEN_THREE_INCOMPLETE_OBSERVATIONS_NOT_PROMOTED_NO_INDEPENDENCE_OR_SELECTION',
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI169BoundaryAccepted: true,
    discoveryObservationCount: 4,
    minimumAdequacyReviewCandidateCount: 1,
    lineageAdjudicationTargetRecordId: 'LI_SHUNXIANG_SIZHU_XUANJI_2004',
    lineageAdjudicationTargetCount: 1,
    incompleteObservationRecordIds: [
      'SHAO_GANG_YIHUN_SIZHU_PIAN_AUTHOR_HOSTED',
      'ZHAO_ZHIYI_BAZI_ZHENJIAN_2003',
      'CHEN_BINGDI_TIANGAN_XIANGKE_WEB_ARTICLE',
    ],
    incompleteObservationCount: 3,
    incompleteObservationsFrozenOutsideLineageAdjudication: true,
    lineageRequirementIds: I170_LINEAGE_REQUIREMENT_IDS,
    lineageRequirementCount: 10,
    lineageRequirementsFrozen: true,
    lineageQuestionIds: I170_LINEAGE_QUESTION_IDS,
    lineageQuestionCount: 4,
    lineageQuestionsFrozenProspectively: true,
    allowedLineageFindings: I170_ALLOWED_LINEAGE_FINDINGS,
    allowedLineageFindingCount: 3,
    selectedSetChenYuanMaterialSimilarityCreatesDependencyAutomatically: false,
    chronologyCreatesDependencyOrIndependenceAutomatically: false,
    shaoResearchCenterAssociationCreatesDependencyAutomatically: false,
    zhangZhichunEditorCreditCreatesTargetRuleAuthorshipAutomatically: false,
    semanticSimilarityCreatesDependencyAutomatically: false,
    searchSilenceCreatesNegativeFinding: false,
    explicitNegativeFindingAloneEstablishesIndependence: false,
    uniqueSourceIdentityAloneEstablishesIndependence: false,
    sourceCountVotingAllowed: false,
    provenanceTierWeightingAllowed: false,
    targetedLineageAdjudicationMethodologicallyJustified: true,
    targetedLineageAdjudicationAuthorized: true,
    actualTargetedLineageDiscoveryExecutedByThisGate: false,
    lineageFindingRecordedByThisGate: false,
    independentNormativeProvenanceEstablishedByThisGate: false,
    candidateSelectedByThisGate: false,
    remediationStrategySelectedByThisGate: false,
    remediationExecutionAuthorizedByThisGate: false,
    evidenceReboundByThisGate: false,
    candidateSetMutatedByThisGate: false,
    newCandidateSetVersionCreatedByThisGate: false,
    newInputPackageVersionCreatedByThisGate: false,
    provenanceIndependenceAdjudicatedByThisGate: false,
    I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate: false,
    I132IndependentNormativeProvenanceRequirementRemainsNormative: true,
    I132PolicyRelaxationAuthorizedByThisGate: false,
    candidateSetReevaluationAuthorizedByThisGate: false,
    candidateSetReevaluationPerformedByThisGate: false,
    candidateSetAdmissibilityEstablishedByThisGate: false,
    currentV2PackageAndCandidateSetRemainImmutable: true,
    currentV2ProvenanceDisposition: 'BLOCKED_UNDER_CURRENT_EVIDENCE',
    productionPolicyExecutionAuthorized: false,
    actualCompositionPerformedByThisGate: false,
    multiSourceCompositionAuthorized: false,
    authorityAcquiredByThisGate: false,
    visibleStemBinaryEffectiveInteractionEligibilityResolved: false,
    thresholdRuleCreatedByThisGate: false,
    damageEvaluationAuthorized: false,
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    hiddenStemInteractionEligibilityGapRemains: true,
    hiddenStemAuthorityGap: 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED',
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_SHUNXIANG_TARGETED_LINEAGE_ADJUDICATION_EVIDENCE',
  } as unknown as I170SecondWaveCandidateEvidenceAdequacyLineageReadinessReviewReport;
}

describe('I171 Li Shunxiang targeted lineage evidence', () => {
  it('accepts exact I170 and records one derivative plus three unresolved findings', () => {
    const report = buildI171LiShunxiangTargetedLineageEvidence(validI170());
    expect(report.status).toBe('RESOLVED_LI_SHUNXIANG_TARGETED_LINEAGE_ADJUDICATION_EVIDENCE');
    expect(report.targetedLineageDiscoveryExecuted).toBe(true);
    expect(report.lineageEvidenceRecordCount).toBe(4);
    expect(report.derivativeDependencyFoundCount).toBe(1);
    expect(report.unresolvedAfterTargetedLineageDiscoveryCount).toBe(3);
    expect(report.explicitNegativeDerivativeFindingCount).toBe(0);
    expect(report.independentNormativeProvenanceEstablishedCount).toBe(0);
  });

  it('keeps Chen Yuan selected-set dependency unresolved despite chronology and semantic similarity', () => {
    const report = buildI171LiShunxiangTargetedLineageEvidence(validI170());
    const finding = report.lineageEvidenceRecords[0];
    expect(finding?.questionId).toBe('LI_TARGET_RULE_TO_CHEN_YUAN_1995_SELECTED_SET_DEPENDENCY');
    expect(finding?.finding).toBe('UNRESOLVED_AFTER_TARGETED_LINEAGE_DISCOVERY');
    expect(finding?.chronologyEstablished).toBe(true);
    expect(finding?.semanticSimilarityEstablished).toBe(true);
    expect(finding?.explicitTargetAttributionLocated).toBe(false);
    expect(report.selectedSetChenYuanDependencyEstablished).toBe(false);
  });

  it('keeps Shao/research-center lineage and Zhang editorial authorship unresolved', () => {
    const report = buildI171LiShunxiangTargetedLineageEvidence(validI170());
    expect(report.lineageEvidenceRecords[1]?.finding).toBe('UNRESOLVED_AFTER_TARGETED_LINEAGE_DISCOVERY');
    expect(report.lineageEvidenceRecords[2]?.finding).toBe('UNRESOLVED_AFTER_TARGETED_LINEAGE_DISCOVERY');
    expect(report.shaoWeihuaOrResearchCenterSpecificTargetDependencyEstablished).toBe(false);
    expect(report.zhangZhichunTargetRuleAuthorshipEstablished).toBe(false);
    expect(report.institutionalAssociationUsedAsSpecificDependencyFinding).toBe(false);
    expect(report.editorCreditUsedAsTargetAuthorshipFinding).toBe(false);
  });

  it('establishes a prior same-author dependency from the 2004 witness to Li 1998 tutorial', () => {
    const report = buildI171LiShunxiangTargetedLineageEvidence(validI170());
    const finding = report.lineageEvidenceRecords[3];
    expect(finding?.questionId).toBe('LI_TARGET_RULE_OTHER_EARLIER_SOURCE_ORIGIN');
    expect(finding?.finding).toBe('DERIVATIVE_DEPENDENCY_FOUND');
    expect(finding?.relationshipClass).toBe('PRIOR_SAME_AUTHOR_WORK_RETRANSMISSION');
    expect(finding?.dependencyTarget).toBe('LI_SHUNXIANG_SIZHU_MINGLI_ZIXIU_JIAOCHENG_PUJIBAN_1998');
    expect(finding?.explicitTargetAttributionLocated).toBe(true);
    expect(report.priorSameAuthorWorkDependencyEstablished).toBe(true);
    expect(report.priorSameAuthorWorkId).toBe('LI_SHUNXIANG_SIZHU_MINGLI_ZIXIU_JIAOCHENG_PUJIBAN_1998');
  });

  it('requires reassessment before the current 2004 witness could enter remediation', () => {
    const report = buildI171LiShunxiangTargetedLineageEvidence(validI170());
    expect(report.current2004WitnessDisposition).toBe(
      'PRIOR_SAME_AUTHOR_NORMATIVE_WITNESS_LOCATED_CURRENT_2004_WITNESS_NOT_ORIGINAL_ORIGIN_REBINDING_OR_REMEDIATION_REASSESSMENT_REQUIRED',
    );
    expect(report.current2004WitnessMayCountAsNewIndependentProvenanceWithoutReassessment).toBe(false);
    expect(report.prior1998SameAuthorWitnessAutomaticallyEstablishesIndependenceFromSelectedSet).toBe(false);
  });

  it('does not manufacture negative or independence findings from silence, chronology, similarity, association, or source count', () => {
    const report = buildI171LiShunxiangTargetedLineageEvidence(validI170());
    expect(report.searchSilenceUsedAsNegativeFinding).toBe(false);
    expect(report.chronologyUsedAsIndependenceFinding).toBe(false);
    expect(report.semanticSimilarityUsedAsDependencyFindingWithoutLineageEvidence).toBe(false);
    expect(report.institutionalAssociationUsedAsSpecificDependencyFinding).toBe(false);
    expect(report.sourceCountVotingAllowed).toBe(false);
    expect(report.provenanceTierWeightingAllowed).toBe(false);
    expect(report.lineageEvidenceRecords.every((record) => record.independentNormativeProvenanceEstablished === false)).toBe(true);
  });

  it('retains no-remediation, no-mutation, I132, production, threshold, numeric, and hidden-stem guards', () => {
    const report = buildI171LiShunxiangTargetedLineageEvidence(validI170());
    expect(report.candidateSelectedByThisGate).toBe(false);
    expect(report.remediationStrategySelectedByThisGate).toBe(false);
    expect(report.remediationExecutionAuthorizedByThisGate).toBe(false);
    expect(report.evidenceReboundByThisGate).toBe(false);
    expect(report.candidateSetMutatedByThisGate).toBe(false);
    expect(report.newCandidateSetVersionCreatedByThisGate).toBe(false);
    expect(report.newInputPackageVersionCreatedByThisGate).toBe(false);
    expect(report.provenanceIndependenceAdjudicatedByThisGate).toBe(false);
    expect(report.I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate).toBe(false);
    expect(report.I132IndependentNormativeProvenanceRequirementRemainsNormative).toBe(true);
    expect(report.candidateSetReevaluationAuthorizedByThisGate).toBe(false);
    expect(report.currentV2PackageAndCandidateSetRemainImmutable).toBe(true);
    expect(report.productionPolicyExecutionAuthorized).toBe(false);
    expect(report.visibleStemBinaryEffectiveInteractionEligibilityResolved).toBe(false);
    expect(report.thresholdRuleCreatedByThisGate).toBe(false);
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
    expect(report.hiddenStemAuthorityGap).toBe('SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED');
  });

  it('fails closed when I170 lineage authorization is absent', () => {
    const mutated = {
      ...validI170(),
      targetedLineageAdjudicationAuthorized: false,
    } as unknown as I170SecondWaveCandidateEvidenceAdequacyLineageReadinessReviewReport;
    const report = buildI171LiShunxiangTargetedLineageEvidence(mutated);
    expect(report.status).toBe('I170_LINEAGE_READINESS_INVALID');
    expect(report.targetedLineageDiscoveryExecuted).toBe(false);
    expect(report.lineageEvidenceRecords).toEqual([]);
    expect(report.derivativeDependencyFoundCount).toBe(0);
    expect(report.unresolvedAfterTargetedLineageDiscoveryCount).toBe(0);
  });
});
