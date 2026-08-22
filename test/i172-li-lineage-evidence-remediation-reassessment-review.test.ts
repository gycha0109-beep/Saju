import { describe, expect, it } from 'vitest';
import type { I171LiShunxiangTargetedLineageEvidenceReport } from '../src/research/i171-li-shunxiang-targeted-lineage-evidence.js';
import {
  I172_PRIOR_WITNESS_IDENTITY_REQUIREMENT_IDS,
  I172_REASSESSMENT_REQUIREMENT_IDS,
  buildI172LiLineageEvidenceRemediationReassessmentReview,
} from '../src/research/i172-li-lineage-evidence-remediation-reassessment-review.js';

function validI171(): I171LiShunxiangTargetedLineageEvidenceReport {
  const records = [
    {
      questionId: 'LI_TARGET_RULE_TO_CHEN_YUAN_1995_SELECTED_SET_DEPENDENCY',
      finding: 'UNRESOLVED_AFTER_TARGETED_LINEAGE_DISCOVERY',
    },
    {
      questionId: 'LI_TARGET_RULE_TO_SHAO_WEIHUA_OR_RESEARCH_CENTER_LINEAGE',
      finding: 'UNRESOLVED_AFTER_TARGETED_LINEAGE_DISCOVERY',
    },
    {
      questionId: 'ZHANG_ZHICHUN_EDITORIAL_ROLE_IN_TARGET_RULE_AUTHORSHIP',
      finding: 'UNRESOLVED_AFTER_TARGETED_LINEAGE_DISCOVERY',
    },
    {
      questionId: 'LI_TARGET_RULE_OTHER_EARLIER_SOURCE_ORIGIN',
      finding: 'DERIVATIVE_DEPENDENCY_FOUND',
    },
  ];

  return {
    evidenceRecordSetId: 'i171_fixture',
    status: 'RESOLVED_LI_SHUNXIANG_TARGETED_LINEAGE_ADJUDICATION_EVIDENCE',
    decision:
      'LI_SHUNXIANG_TARGETED_LINEAGE_DISCOVERY_EXECUTED_ONE_PRIOR_SAME_AUTHOR_DERIVATIVE_DEPENDENCY_FOUND_THREE_LINEAGE_QUESTIONS_UNRESOLVED_ZERO_EXPLICIT_NEGATIVE_ZERO_INDEPENDENCE_CURRENT_2004_WITNESS_REQUIRES_REASSESSMENT_BEFORE_REMEDIATION',
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI170BoundaryAccepted: true,
    lineageTargetRecordId: 'LI_SHUNXIANG_SIZHU_XUANJI_2004',
    targetedLineageDiscoveryExecuted: true,
    lineageEvidenceRecords: records,
    lineageEvidenceRecordCount: 4,
    derivativeDependencyFoundCount: 1,
    unresolvedAfterTargetedLineageDiscoveryCount: 3,
    explicitNegativeDerivativeFindingCount: 0,
    independentNormativeProvenanceEstablishedCount: 0,
    selectedSetChenYuanDependencyEstablished: false,
    shaoWeihuaOrResearchCenterSpecificTargetDependencyEstablished: false,
    zhangZhichunTargetRuleAuthorshipEstablished: false,
    priorSameAuthorWorkDependencyEstablished: true,
    priorSameAuthorWorkId: 'LI_SHUNXIANG_SIZHU_MINGLI_ZIXIU_JIAOCHENG_PUJIBAN_1998',
    current2004WitnessDisposition:
      'PRIOR_SAME_AUTHOR_NORMATIVE_WITNESS_LOCATED_CURRENT_2004_WITNESS_NOT_ORIGINAL_ORIGIN_REBINDING_OR_REMEDIATION_REASSESSMENT_REQUIRED',
    current2004WitnessMayCountAsNewIndependentProvenanceWithoutReassessment: false,
    prior1998SameAuthorWitnessAutomaticallyEstablishesIndependenceFromSelectedSet: false,
    chronologyUsedAsIndependenceFinding: false,
    semanticSimilarityUsedAsDependencyFindingWithoutLineageEvidence: false,
    institutionalAssociationUsedAsSpecificDependencyFinding: false,
    editorCreditUsedAsTargetAuthorshipFinding: false,
    searchSilenceUsedAsNegativeFinding: false,
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
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_SHUNXIANG_LINEAGE_EVIDENCE_ADEQUACY_AND_REMEDIATION_REASSESSMENT_REVIEW',
  } as unknown as I171LiShunxiangTargetedLineageEvidenceReport;
}

describe('I172 Li lineage evidence remediation reassessment', () => {
  it('accepts exact I171 and retires 2004 only as presumed normative origin', () => {
    const report = buildI172LiLineageEvidenceRemediationReassessmentReview(validI171());
    expect(report.status).toBe('RESOLVED_LI_LINEAGE_EVIDENCE_REMEDIATION_REASSESSMENT_REVIEW');
    expect(report.exactI171BoundaryAccepted).toBe(true);
    expect(report.I171EvidenceAdequateToRecordPriorSameAuthorDependency).toBe(true);
    expect(report.current2004WitnessPresumedNormativeOriginStatus).toBe(
      'RETIRED_AS_PRESUMED_ORIGIN_PRIOR_SAME_AUTHOR_WITNESS_LOCATED',
    );
    expect(report.current2004WitnessMayRemainNewProvenanceCandidateWithoutReassessment).toBe(false);
  });

  it('routes the 1998 same-author witness to identity acquisition, not immediate rebinding', () => {
    const report = buildI172LiLineageEvidenceRemediationReassessmentReview(validI171());
    expect(report.prior1998WitnessId).toBe('LI_SHUNXIANG_SIZHU_MINGLI_ZIXIU_JIAOCHENG_PUJIBAN_1998');
    expect(report.prior1998WitnessStatus).toBe(
      'PRIOR_SAME_AUTHOR_WITNESS_IDENTITY_ACQUISITION_REQUIRED_BEFORE_REBINDING',
    );
    expect(report.prior1998WitnessIsNewIndependentProvenanceIdentity).toBe(false);
    expect(report.prior1998WitnessIndependenceFromChenShaoLineageEstablished).toBe(false);
    expect(report.evidenceRebindingPathNowMethodologicallyRelevant).toBe(true);
    expect(report.evidenceRebindingSelectedByThisGate).toBe(false);
    expect(report.evidenceRebindingExecutedByThisGate).toBe(false);
  });

  it('freezes ten reassessment and eight prior-witness identity requirements', () => {
    const report = buildI172LiLineageEvidenceRemediationReassessmentReview(validI171());
    expect(report.reassessmentRequirementIds).toEqual(I172_REASSESSMENT_REQUIREMENT_IDS);
    expect(report.reassessmentRequirementCount).toBe(10);
    expect(report.reassessmentRequirementsFrozen).toBe(true);
    expect(report.priorWitnessIdentityRequirementIds).toEqual(I172_PRIOR_WITNESS_IDENTITY_REQUIREMENT_IDS);
    expect(report.priorWitnessIdentityRequirementCount).toBe(8);
    expect(report.priorWitnessIdentityRequirementsFrozenProspectively).toBe(true);
  });

  it('preserves all three external-lineage questions as unresolved', () => {
    const report = buildI172LiLineageEvidenceRemediationReassessmentReview(validI171());
    expect(report.derivativeDependencyFoundCount).toBe(1);
    expect(report.unresolvedExternalLineageQuestionCount).toBe(3);
    expect(report.explicitNegativeDerivativeFindingCount).toBe(0);
    expect(report.independentNormativeProvenanceEstablishedCount).toBe(0);
    expect(report.ChenYuanSelectedSetDependencyRemainsUnresolved).toBe(true);
    expect(report.ShaoResearchCenterSpecificDependencyRemainsUnresolved).toBe(true);
    expect(report.ZhangZhichunTargetRuleAuthorshipRemainsUnresolved).toBe(true);
  });

  it('authorizes only a future identity-acquisition readiness review', () => {
    const report = buildI172LiLineageEvidenceRemediationReassessmentReview(validI171());
    expect(report.priorWitnessIdentityAcquisitionReadinessReviewMethodologicallyJustified).toBe(true);
    expect(report.priorWitnessIdentityAcquisitionReadinessReviewAuthorized).toBe(true);
    expect(report.authorizationIsIdentityAcquisition).toBe(false);
    expect(report.authorizationIsEvidenceRebinding).toBe(false);
    expect(report.authorizationIsCandidateReplacement).toBe(false);
    expect(report.authorizationIsCandidateSelection).toBe(false);
    expect(report.authorizationIsRemediationExecution).toBe(false);
  });

  it('does not infer identity or independence from chronology, same authorship, silence, counts, or tiers', () => {
    const report = buildI172LiLineageEvidenceRemediationReassessmentReview(validI171());
    expect(report.chronologyAloneEstablishesPriorWitnessIdentityOrIndependence).toBe(false);
    expect(report.sameAuthorIdentityAloneEstablishesIndependence).toBe(false);
    expect(report.searchSilenceCreatesNegativeFinding).toBe(false);
    expect(report.sourceCountVotingAllowed).toBe(false);
    expect(report.provenanceTierWeightingAllowed).toBe(false);
    expect(report.I171EvidenceAdequateToEstablishIndependentNormativeProvenance).toBe(false);
  });

  it('retains no-selection, no-mutation, I132, production, threshold, numeric, and hidden-stem guards', () => {
    const report = buildI172LiLineageEvidenceRemediationReassessmentReview(validI171());
    expect(report.candidateSelectedByThisGate).toBe(false);
    expect(report.remediationStrategySelectedByThisGate).toBe(false);
    expect(report.remediationExecutionAuthorizedByThisGate).toBe(false);
    expect(report.candidateSetMutatedByThisGate).toBe(false);
    expect(report.newCandidateSetVersionCreatedByThisGate).toBe(false);
    expect(report.newInputPackageVersionCreatedByThisGate).toBe(false);
    expect(report.provenanceIndependenceAdjudicatedByThisGate).toBe(false);
    expect(report.I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate).toBe(false);
    expect(report.I132IndependentNormativeProvenanceRequirementRemainsNormative).toBe(true);
    expect(report.I132PolicyRelaxationAuthorizedByThisGate).toBe(false);
    expect(report.candidateSetReevaluationAuthorizedByThisGate).toBe(false);
    expect(report.currentV2PackageAndCandidateSetRemainImmutable).toBe(true);
    expect(report.productionPolicyExecutionAuthorized).toBe(false);
    expect(report.visibleStemBinaryEffectiveInteractionEligibilityResolved).toBe(false);
    expect(report.thresholdRuleCreatedByThisGate).toBe(false);
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
    expect(report.hiddenStemAuthorityGap).toBe('SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED');
  });

  it('fails closed if I171 no longer has the prior same-author dependency', () => {
    const mutated = {
      ...validI171(),
      priorSameAuthorWorkDependencyEstablished: false,
    } as unknown as I171LiShunxiangTargetedLineageEvidenceReport;
    const report = buildI172LiLineageEvidenceRemediationReassessmentReview(mutated);
    expect(report.status).toBe('I171_LINEAGE_EVIDENCE_INVALID');
    expect(report.decision).toBe('LI_REMEDIATION_REASSESSMENT_NOT_READY');
    expect(report.exactI171BoundaryAccepted).toBe(false);
    expect(report.priorWitnessIdentityAcquisitionReadinessReviewAuthorized).toBe(false);
    expect(report.current2004WitnessPresumedNormativeOriginStatus).toBe('NOT_ASSESSED');
  });
});
