import { describe, expect, it } from 'vitest';
import {
  I169_DISCOVERY_RECORD_IDS,
  type I169SecondWaveProvenanceCandidateDiscoveryEvidenceReport,
} from '../src/research/i169-second-wave-provenance-candidate-discovery-evidence.js';
import {
  I170_ALLOWED_LINEAGE_FINDINGS,
  I170_LINEAGE_QUESTION_IDS,
  I170_LINEAGE_REQUIREMENT_IDS,
  buildI170SecondWaveCandidateEvidenceAdequacyLineageReadinessReview,
} from '../src/research/i170-second-wave-candidate-evidence-adequacy-lineage-readiness-review.js';

function record(recordId: (typeof I169_DISCOVERY_RECORD_IDS)[number], qualifies: boolean) {
  return {
    recordId,
    identityStatus:
      recordId === 'LI_SHUNXIANG_SIZHU_XUANJI_2004'
        ? 'EXACT_PRINT_EDITION_IDENTITY_ESTABLISHED'
        : 'AUTHOR_WORK_IDENTITY_ESTABLISHED_PRINT_EDITION_INCOMPLETE',
    targetRelevance:
      recordId === 'LI_SHUNXIANG_SIZHU_XUANJI_2004'
        ? 'DIRECT_POSITIONAL_FORCE_AND_BINARY_EXCEPTION_RELEVANCE'
        : 'DIRECT_REMOTE_INTERACTION_AND_BINARY_EXCEPTION_RELEVANCE',
    lineageFinding: 'UNRESOLVED_AFTER_SECOND_WAVE_DISCOVERY',
    independentNormativeProvenanceEstablished: false,
    qualifiesForLaterEvidenceAdequacyReview: qualifies,
  };
}

function validI169(): I169SecondWaveProvenanceCandidateDiscoveryEvidenceReport {
  return {
    evidenceRecordSetId: 'i169_fixture',
    status: 'RESOLVED_SECOND_WAVE_PROVENANCE_CANDIDATE_DISCOVERY_EVIDENCE',
    decision:
      'SECOND_WAVE_DISCOVERY_EXECUTED_FOUR_NEW_PROVENANCE_OBSERVATIONS_ONE_MINIMUM_ADEQUACY_REVIEW_CANDIDATE_ZERO_INDEPENDENCE_ZERO_SELECTION_LINEAGE_AND_IDENTITY_GAPS_REMAIN',
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI168BoundaryAccepted: true,
    discoveryExecuted: true,
    discoveryRecords: [
      record('LI_SHUNXIANG_SIZHU_XUANJI_2004', true),
      record('SHAO_GANG_YIHUN_SIZHU_PIAN_AUTHOR_HOSTED', false),
      record('ZHAO_ZHIYI_BAZI_ZHENJIAN_2003', false),
      record('CHEN_BINGDI_TIANGAN_XIANGKE_WEB_ARTICLE', false),
    ],
    discoveryObservationCount: 4,
    newNormativeProvenanceIdentityObservedCount: 4,
    exactPrintEditionIdentityEstablishedCount: 1,
    directBinaryExceptionLanguageObservedCount: 2,
    minimumAdequacyReviewCandidateCount: 1,
    lineageUnresolvedCount: 4,
    derivativeDependencyFoundCount: 0,
    explicitNegativeDerivativeFindingCount: 0,
    independentNormativeProvenanceEstablishedCount: 0,
    searchSilenceUsedAsNegativeFinding: false,
    chronologyUsedAsIndependenceFinding: false,
    sourceIdentityUsedAsIndependenceFinding: false,
    sourceCountVotingAllowed: false,
    provenanceTierWeightingAllowed: false,
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
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_SECOND_WAVE_CANDIDATE_EVIDENCE_ADEQUACY_LINEAGE_ADJUDICATION_READINESS_REVIEW',
  } as unknown as I169SecondWaveProvenanceCandidateDiscoveryEvidenceReport;
}

describe('I170 second-wave candidate evidence adequacy and lineage readiness', () => {
  it('accepts exact I169 and targets only Li Shunxiang for lineage adjudication', () => {
    const report = buildI170SecondWaveCandidateEvidenceAdequacyLineageReadinessReview(validI169());
    expect(report.status).toBe('RESOLVED_SECOND_WAVE_CANDIDATE_EVIDENCE_ADEQUACY_LINEAGE_READINESS_REVIEW');
    expect(report.lineageAdjudicationTargetRecordId).toBe('LI_SHUNXIANG_SIZHU_XUANJI_2004');
    expect(report.lineageAdjudicationTargetCount).toBe(1);
    expect(report.minimumAdequacyReviewCandidateCount).toBe(1);
    expect(report.targetedLineageAdjudicationAuthorized).toBe(true);
  });

  it('freezes the other three I169 observations outside lineage adjudication', () => {
    const report = buildI170SecondWaveCandidateEvidenceAdequacyLineageReadinessReview(validI169());
    expect(report.incompleteObservationRecordIds).toEqual(I169_DISCOVERY_RECORD_IDS.slice(1));
    expect(report.incompleteObservationCount).toBe(3);
    expect(report.incompleteObservationsFrozenOutsideLineageAdjudication).toBe(true);
  });

  it('freezes ten requirements and four prospective lineage questions', () => {
    const report = buildI170SecondWaveCandidateEvidenceAdequacyLineageReadinessReview(validI169());
    expect(report.lineageRequirementIds).toEqual(I170_LINEAGE_REQUIREMENT_IDS);
    expect(report.lineageRequirementCount).toBe(10);
    expect(report.lineageRequirementsFrozen).toBe(true);
    expect(report.lineageQuestionIds).toEqual(I170_LINEAGE_QUESTION_IDS);
    expect(report.lineageQuestionCount).toBe(4);
    expect(report.lineageQuestionsFrozenProspectively).toBe(true);
  });

  it('freezes the exact tri-state findings without pre-adjudicating any question', () => {
    const report = buildI170SecondWaveCandidateEvidenceAdequacyLineageReadinessReview(validI169());
    expect(report.allowedLineageFindings).toEqual(I170_ALLOWED_LINEAGE_FINDINGS);
    expect(report.allowedLineageFindingCount).toBe(3);
    expect(report.actualTargetedLineageDiscoveryExecutedByThisGate).toBe(false);
    expect(report.lineageFindingRecordedByThisGate).toBe(false);
    expect(report.independentNormativeProvenanceEstablishedByThisGate).toBe(false);
  });

  it('does not infer dependency or independence from similarity, chronology, institutional association, or editor credit', () => {
    const report = buildI170SecondWaveCandidateEvidenceAdequacyLineageReadinessReview(validI169());
    expect(report.selectedSetChenYuanMaterialSimilarityCreatesDependencyAutomatically).toBe(false);
    expect(report.chronologyCreatesDependencyOrIndependenceAutomatically).toBe(false);
    expect(report.shaoResearchCenterAssociationCreatesDependencyAutomatically).toBe(false);
    expect(report.zhangZhichunEditorCreditCreatesTargetRuleAuthorshipAutomatically).toBe(false);
    expect(report.semanticSimilarityCreatesDependencyAutomatically).toBe(false);
    expect(report.searchSilenceCreatesNegativeFinding).toBe(false);
    expect(report.explicitNegativeFindingAloneEstablishesIndependence).toBe(false);
    expect(report.uniqueSourceIdentityAloneEstablishesIndependence).toBe(false);
  });

  it('does not select remediation or mutate/package/reevaluate the frozen v2 set', () => {
    const report = buildI170SecondWaveCandidateEvidenceAdequacyLineageReadinessReview(validI169());
    expect(report.candidateSelectedByThisGate).toBe(false);
    expect(report.remediationStrategySelectedByThisGate).toBe(false);
    expect(report.remediationExecutionAuthorizedByThisGate).toBe(false);
    expect(report.evidenceReboundByThisGate).toBe(false);
    expect(report.candidateSetMutatedByThisGate).toBe(false);
    expect(report.newCandidateSetVersionCreatedByThisGate).toBe(false);
    expect(report.newInputPackageVersionCreatedByThisGate).toBe(false);
    expect(report.candidateSetReevaluationAuthorizedByThisGate).toBe(false);
    expect(report.currentV2PackageAndCandidateSetRemainImmutable).toBe(true);
  });

  it('retains I132, production, threshold, numeric, and hidden-stem guards', () => {
    const report = buildI170SecondWaveCandidateEvidenceAdequacyLineageReadinessReview(validI169());
    expect(report.provenanceIndependenceAdjudicatedByThisGate).toBe(false);
    expect(report.I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate).toBe(false);
    expect(report.I132IndependentNormativeProvenanceRequirementRemainsNormative).toBe(true);
    expect(report.I132PolicyRelaxationAuthorizedByThisGate).toBe(false);
    expect(report.productionPolicyExecutionAuthorized).toBe(false);
    expect(report.actualCompositionPerformedByThisGate).toBe(false);
    expect(report.multiSourceCompositionAuthorized).toBe(false);
    expect(report.authorityAcquiredByThisGate).toBe(false);
    expect(report.visibleStemBinaryEffectiveInteractionEligibilityResolved).toBe(false);
    expect(report.thresholdRuleCreatedByThisGate).toBe(false);
    expect(report.damageEvaluationAuthorized).toBe(false);
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
    expect(report.hiddenStemAuthorityGap).toBe('SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED');
  });

  it('fails closed if a second incomplete I169 observation is promoted into adequacy review', () => {
    const mutated = validI169();
    const records = [...mutated.discoveryRecords];
    records[1] = { ...records[1], qualifiesForLaterEvidenceAdequacyReview: true } as (typeof records)[number];
    const report = buildI170SecondWaveCandidateEvidenceAdequacyLineageReadinessReview({ ...mutated, discoveryRecords: records } as I169SecondWaveProvenanceCandidateDiscoveryEvidenceReport);
    expect(report.status).toBe('I169_DISCOVERY_EVIDENCE_INVALID');
    expect(report.decision).toBe('SECOND_WAVE_LINEAGE_ADJUDICATION_NOT_READY');
    expect(report.targetedLineageAdjudicationAuthorized).toBe(false);
    expect(report.lineageAdjudicationTargetRecordId).toBeNull();
  });
});
