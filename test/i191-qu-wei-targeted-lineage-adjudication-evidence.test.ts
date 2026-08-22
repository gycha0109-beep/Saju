import { describe, expect, it } from 'vitest';
import type { I190ThirdWaveCandidateEvidenceAdequacyLineageAdjudicationReadinessReviewReport } from '../src/research/i190-third-wave-candidate-evidence-adequacy-lineage-adjudication-readiness-review.js';
import {
  buildI191QuWeiTargetedLineageAdjudicationEvidence,
} from '../src/research/i191-qu-wei-targeted-lineage-adjudication-evidence.js';

function validI190(): I190ThirdWaveCandidateEvidenceAdequacyLineageAdjudicationReadinessReviewReport {
  return {
    reviewId: 'i190_fixture',
    status: 'RESOLVED_THIRD_WAVE_CANDIDATE_EVIDENCE_ADEQUACY_LINEAGE_ADJUDICATION_READINESS_REVIEW',
    decision:
      'I189_EVIDENCE_ADEQUATE_ONE_MINIMUM_ADEQUACY_CANDIDATE_QU_WEI_READY_FOR_TARGETED_LINEAGE_ADJUDICATION_FOUR_QUESTIONS_FROZEN_LI_HONGCHENG_NOT_PROMOTED_THREE_DERIVATIVE_RISK_SURFACES_NOT_PROMOTED_ZERO_INDEPENDENCE_ZERO_SELECTION',
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI189BoundaryAccepted: true,
    i189EvidenceAdequateForReadiness: true,
    targetedLineageCandidateCount: 1,
    targetedLineageCandidateIds: ['QU_WEI_2003_SIZHU_TEXUNBAN_JIANGYI'],
    onlyQuWeiPromotedToTargetedLineage: true,
    quWeiCurrentLineageDisposition: 'UNRESOLVED_REJECT_INDEPENDENCE_CLAIM',
    lineageQuestionCount: 4,
    lineageQuestionIds: [
      'QU_WEI_PRIOR_SAME_AUTHOR_WORK_TARGET_PASSAGE_OR_DOCTRINE_DEPENDENCY',
      'QU_WEI_LI_HANCHEN_DOCTRINAL_LINEAGE_DEPENDENCY',
      'QU_WEI_LI_HONGCHENG_RELATIONSHIP_OR_INDEPENDENT_PARALLEL_DEVELOPMENT',
      'QU_WEI_OTHER_EARLIER_DISTINCTIVE_SOURCE_DEPENDENCY',
    ],
    lineageQuestionsFrozenProspectively: true,
    targetedLineageAdjudicationReadinessEstablished: true,
    targetedLineageEvidenceAcquisitionAuthorizedByThisGate: true,
    targetedLineageAdjudicationExecutedByThisGate: false,
    explicitDerivativeRelationshipCheckRequired: true,
    derivativeRetransmissionCountsAsIndependentAuthority: false,
    unresolvedLineageDefaultDisposition: 'REJECT_INDEPENDENCE_CLAIM',
    provenanceIndependenceAdjudicatedByThisGate: false,
    independentNormativeProvenanceEstablishedCount: 0,
    candidateSelectedByThisGate: false,
    candidateSetMutatedByThisGate: false,
    currentV2PackageAndCandidateSetRemainImmutable: true,
    currentV2ProvenanceDisposition: 'BLOCKED_UNDER_CURRENT_EVIDENCE',
    targetedDiscoveryExhaustionEstablished: false,
    corpusExhaustionEstablished: false,
    searchSilenceCreatesNegativeFinding: false,
    I132IndependentNormativeProvenanceRequirementRemainsNormative: true,
    I132PolicyRelaxationAuthorizedByThisGate: false,
    evidenceRebindingMethodologicallyReady: false,
    productionPolicyExecutionAuthorized: false,
    actualCompositionPerformedByThisGate: false,
    multiSourceCompositionAuthorized: false,
    visibleStemBinaryEffectiveInteractionEligibilityResolved: false,
    thresholdRuleCreatedByThisGate: false,
    damageEvaluationAuthorized: false,
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    hiddenStemInteractionEligibilityGapRemains: true,
    hiddenStemAuthorityGap: 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED',
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_QU_WEI_TARGETED_LINEAGE_ADJUDICATION_EVIDENCE',
  } as unknown as I190ThirdWaveCandidateEvidenceAdequacyLineageAdjudicationReadinessReviewReport;
}

describe('I191 Qu Wei targeted lineage adjudication evidence', () => {
  it('accepts exact I190 and executes all four frozen lineage questions', () => {
    const report = buildI191QuWeiTargetedLineageAdjudicationEvidence(validI190());
    expect(report.status).toBe('RESOLVED_QU_WEI_TARGETED_LINEAGE_ADJUDICATION_EVIDENCE');
    expect(report.decision).toBe(
      'QU_WEI_TARGETED_LINEAGE_DISCOVERY_EXECUTED_PRIOR_SAME_AUTHOR_DOCTRINAL_DEPENDENCY_FOUND_LI_HANCHEN_EARLIER_DOCTRINAL_SOURCE_AND_SUCCESSION_RISK_DIRECT_DEPENDENCY_UNRESOLVED_LI_HONGCHENG_GENERAL_TEACHING_LINEAGE_FOUND_TARGET_SCOPE_DEPENDENCY_UNRESOLVED_OTHER_EARLIER_DISTINCTIVE_SOURCE_RELATIONSHIP_UNRESOLVED_ZERO_INDEPENDENCE_2003_PRESUMED_ORIGIN_REQUIRES_REASSESSMENT',
    );
    expect(report.exactI190BoundaryAccepted).toBe(true);
    expect(report.targetedCandidateId).toBe('QU_WEI_2003_SIZHU_TEXUNBAN_JIANGYI');
    expect(report.targetedLineageAdjudicationExecutedByThisGate).toBe(true);
    expect(report.lineageQuestionResultCount).toBe(4);
    expect(report.lineageQuestionResults).toHaveLength(4);
    expect(report.allFourFrozenQuestionsExecuted).toBe(true);
  });

  it('finds a prior same-author doctrinal dependency from the 2003 lecture to 2001 Sizhuxiangzhen', () => {
    const report = buildI191QuWeiTargetedLineageAdjudicationEvidence(validI190());
    expect(report.priorSameAuthorDependencyFound).toBe(true);
    expect(report.priorSameAuthorWorkIdentity).toBe('QU_WEI_SIZHU_XIANGZHEN_2001');
    expect(report.priorSameAuthorWorkTitle).toBe('《四柱详真》');
    expect(report.priorSameAuthorWorkChronologyEstablished).toBe(true);
    expect(report.priorSameAuthorWorkYear).toBe(2001);
    expect(report.target2003PrefaceExplicitlyBasesLectureOnPriorWorks).toBe(true);
    expect(report.priorWorkContainsDistanceSensitiveStemForceDoctrine).toBe(true);
    expect(report.priorWorkContainsAdjacentVsGapForceDifferentiation).toBe(true);
    expect(report.priorWorkContainsCrossPillarDirectInteractionRestriction).toBe(true);
    expect(report.priorWorkContainsGapClashNoEffectiveForceRule).toBe(true);
    expect(report.exact2003PassageVerbatimInPriorWorkEstablished).toBe(false);
    expect(report.sameAuthorDependencyRelationship).toBe('PRIOR_SAME_AUTHOR_DOCTRINAL_DEPENDENCY');
    expect(report.explicitDerivativeRelationshipFindingCount).toBe(1);
  });

  it('retires the 2003 presumed-origin assumption without authorizing any prior-witness rebinding', () => {
    const report = buildI191QuWeiTargetedLineageAdjudicationEvidence(validI190());
    expect(report.quWei2003MayRemainPresumedOrigin).toBe(false);
    expect(report.quWei2003RequiresOriginReassessment).toBe(true);
    expect(report.quWeiPriorWitnessRebindingExecutedByThisGate).toBe(false);
    expect(report.quWeiPriorWitnessRebindingAuthorizedByThisGate).toBe(false);
    expect(report.quWeiPriorWitnessIdentityAcquisitionAuthorizedByThisGate).toBe(false);
    expect(report.evidenceRebindingMethodologicallyReady).toBe(false);
    expect(report.evidenceRebindingAuthorizedByThisGate).toBe(false);
  });

  it('records the earlier Li Hanchen doctrine and succession-risk signal but does not manufacture a direct dependency edge', () => {
    const report = buildI191QuWeiTargetedLineageAdjudicationEvidence(validI190());
    expect(report.liHanchenEarlierWorkIdentityEstablished).toBe(true);
    expect(report.liHanchenEarlierWorkTitle).toBe('《八字预测真踪》');
    expect(report.liHanchenEarlierWorkYear).toBe(1999);
    expect(report.liHanchenEarlierWorkContainsGeBuZuoyongDoctrine).toBe(true);
    expect(report.thirdPartyQuWeiSuccessionSignalObserved).toBe(true);
    expect(report.directQuWeiToLiHanchenCitationOrTeachingDependencyEstablished).toBe(false);
    expect(report.liHanchenTargetScopeDependencyResolved).toBe(false);
    expect(report.thirdPartySuccessionClaimAloneEstablishesDerivativeEdge).toBe(false);
    expect(report.earlierDoctrineChronologyAloneEstablishesDerivativeEdge).toBe(false);
  });

  it('finds Qu Wei general teaching lineage to Li Hongcheng while leaving target remote-ke dependency unresolved', () => {
    const report = buildI191QuWeiTargetedLineageAdjudicationEvidence(validI190());
    expect(report.liHongchengGeneralTeachingLineageEstablished).toBe(true);
    expect(report.liHongchengTeacherStudentRelationshipEvidenceObserved).toBe(true);
    expect(report.quWeiPriorWorkDirectlyCitesLiHongchengMethods).toBe(true);
    expect(report.liHongchengCitedMethodScopeIncludesScoringAndLayerTheory).toBe(true);
    expect(report.liHongchengTargetRemoteKeDependencyEstablished).toBe(false);
    expect(report.liHongchengTargetScopeRelationshipResolved).toBe(false);
    expect(report.generalTeacherRelationshipAloneEstablishesTargetScopeDependency).toBe(false);
  });

  it('records one resolved same-author dependency and keeps the other three target-dependency questions unresolved fail-closed', () => {
    const report = buildI191QuWeiTargetedLineageAdjudicationEvidence(validI190());
    expect(report.otherEarlierDistinctiveSourceObserved).toBe(true);
    expect(report.otherEarlierDistinctiveSourceRelationshipToQuWeiResolved).toBe(false);
    expect(report.explicitDerivativeRelationshipFindingCount).toBe(1);
    expect(report.unresolvedTargetDependencyQuestionCount).toBe(3);
    expect(report.explicitNegativeFindingCount).toBe(0);
    expect(report.searchSilenceCreatesNegativeFinding).toBe(false);
    expect(report.absenceOfDirectDependencyEvidenceEstablishesIndependence).toBe(false);
    expect(report.priorSameAuthorWorkCountsAsIndependentAuthority).toBe(false);
    expect(report.lineageQuestionResults.filter((result) => result.resolvedAsDerivativeDependency)).toHaveLength(1);
    expect(report.lineageQuestionResults.every((result) => result.unresolvedDefaultDispositionPreserved)).toBe(true);
  });

  it('preserves zero independence, immutable v2 state, I132 and all production guards', () => {
    const report = buildI191QuWeiTargetedLineageAdjudicationEvidence(validI190());
    expect(report.targetCandidateIndependentNormativeProvenanceEstablished).toBe(false);
    expect(report.provenanceIndependenceAdjudicatedByThisGate).toBe(false);
    expect(report.independentNormativeProvenanceEstablishedCount).toBe(0);
    expect(report.explicitDerivativeRelationshipCheckRequired).toBe(true);
    expect(report.derivativeRetransmissionCountsAsIndependentAuthority).toBe(false);
    expect(report.unresolvedLineageDefaultDisposition).toBe('REJECT_INDEPENDENCE_CLAIM');
    expect(report.candidateSelectedByThisGate).toBe(false);
    expect(report.candidateRegistrationAuthorizedByThisGate).toBe(false);
    expect(report.candidateSetMutatedByThisGate).toBe(false);
    expect(report.candidateSetReevaluationAuthorizedByThisGate).toBe(false);
    expect(report.currentV2PackageAndCandidateSetRemainImmutable).toBe(true);
    expect(report.currentV2ProvenanceDisposition).toBe('BLOCKED_UNDER_CURRENT_EVIDENCE');
    expect(report.I132IndependentNormativeProvenanceRequirementRemainsNormative).toBe(true);
    expect(report.I132PolicyRelaxationAuthorizedByThisGate).toBe(false);
    expect(report.actualCompositionPerformedByThisGate).toBe(false);
    expect(report.multiSourceCompositionAuthorized).toBe(false);
    expect(report.thresholdRuleCreatedByThisGate).toBe(false);
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
    expect(report.productionPolicyExecutionAuthorized).toBe(false);
    expect(report.hiddenStemAuthorityGap).toBe('SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED');
  });

  it('fails closed if I190 is mutated to claim that lineage was already adjudicated', () => {
    const mutated = {
      ...validI190(),
      targetedLineageAdjudicationExecutedByThisGate: true,
    } as unknown as I190ThirdWaveCandidateEvidenceAdequacyLineageAdjudicationReadinessReviewReport;
    const report = buildI191QuWeiTargetedLineageAdjudicationEvidence(mutated);
    expect(report.status).toBe('I190_LINEAGE_READINESS_BOUNDARY_INVALID');
    expect(report.decision).toBe('QU_WEI_TARGETED_LINEAGE_DISCOVERY_NOT_EXECUTED');
    expect(report.exactI190BoundaryAccepted).toBe(false);
    expect(report.targetedCandidateId).toBeNull();
    expect(report.targetedLineageAdjudicationExecutedByThisGate).toBe(false);
    expect(report.lineageQuestionResultCount).toBe(0);
    expect(report.lineageQuestionResults).toHaveLength(0);
    expect(report.priorSameAuthorDependencyFound).toBe(false);
    expect(report.currentV2ProvenanceDisposition).toBe('NOT_ASSESSED');
  });
});
