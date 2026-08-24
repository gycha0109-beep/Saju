import { describe, expect, it } from 'vitest';
import type { I189ThirdWaveNewProvenanceCandidateDiscoveryEvidenceReport } from '../src/research/i189-third-wave-new-provenance-candidate-discovery-evidence.js';
import {
  I190_QU_WEI_LINEAGE_QUESTION_IDS,
  buildI190ThirdWaveCandidateEvidenceAdequacyLineageAdjudicationReadinessReview,
} from '../src/research/i190-third-wave-candidate-evidence-adequacy-lineage-adjudication-readiness-review.js';

function validI189(): I189ThirdWaveNewProvenanceCandidateDiscoveryEvidenceReport {
  return {
    evidenceId: 'i189_fixture',
    status: 'RESOLVED_THIRD_WAVE_NEW_PROVENANCE_CANDIDATE_DISCOVERY_EVIDENCE',
    decision:
      'THIRD_WAVE_DISCOVERY_EXECUTED_FIVE_OBSERVATIONS_ONE_MINIMUM_ADEQUACY_REVIEW_CANDIDATE_QU_WEI_LI_HONGCHENG_SOURCE_IDENTITY_INCOMPLETE_THREE_DERIVATIVE_RISK_SURFACES_ZERO_INDEPENDENCE_ZERO_SELECTION',
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI188BoundaryAccepted: true,
    conclusionNeutralDiscoveryPreserved: true,
    searchChannelExecutionCount: 6,
    allSixFrozenSearchChannelsExecuted: true,
    discoveryExecutedByThisGate: true,
    discoveryObservationCount: 5,
    observations: [{}, {}, {}, {}, {}],
    candidateEvidenceAcquiredByThisGate: true,
    genuinelyNewAuthorOrWorkObservationCount: 2,
    minimumAdequacyReviewCandidateCount: 1,
    minimumAdequacyReviewCandidateIds: ['QU_WEI_2003_SIZHU_TEXUNBAN_JIANGYI'],
    sourceIdentityIncompleteObservationCount: 1,
    derivativeRiskOrRetransmissionObservationCount: 3,
    quWeiExactScopeEvidenceObserved: true,
    quWeiSelfDated2003WorkIdentityObserved: true,
    quWeiMinimumAdequacyReviewCandidate: true,
    quWeiLineageRiskSignalObserved: true,
    quWeiLineageAdjudicationComplete: false,
    quWeiIndependentNormativeProvenanceEstablished: false,
    liHongchengExactScopeEvidenceObserved: true,
    liHongchengAuthorAnd2003ChronologyObserved: true,
    liHongchengExactPassageSingleWorkPublicationIdentityComplete: false,
    liHongchengMinimumAdequacyReviewCandidate: false,
    huXiaosanDerivativeRiskUnresolved: true,
    huanglinNearVerbatimRetransmissionRiskObserved: true,
    moguExactUpstreamSchoolAttributionObserved: true,
    moguMayQualifyAsIndependentOrigin: false,
    explicitDerivativeRelationshipCheckStillRequired: true,
    derivativeRetransmissionCountsAsIndependentAuthority: false,
    unresolvedLineageDefaultDisposition: 'REJECT_INDEPENDENCE_CLAIM',
    sourceClassAloneSufficient: false,
    sourceCountMayBecomeNumericWeight: false,
    provenanceTierMayBecomeNumericWeight: false,
    provenanceIndependenceAdjudicatedByThisGate: false,
    independentNormativeProvenanceEstablishedCount: 0,
    candidateSelectedByThisGate: false,
    candidateRegistrationAuthorizedByThisGate: false,
    candidateSetMutatedByThisGate: false,
    candidateSetReevaluationAuthorizedByThisGate: false,
    currentV2PackageAndCandidateSetRemainImmutable: true,
    currentV2ProvenanceDisposition: 'BLOCKED_UNDER_CURRENT_EVIDENCE',
    liSameTargetDirectPrimaryPathRemainsMethodologicallyOpen: true,
    liSameTargetPathSuspendedNotRetired: true,
    liSameTargetMayReopenOnMateriallyNewDirectLead: true,
    targetedDiscoveryExhaustionEstablished: false,
    corpusExhaustionEstablished: false,
    searchSilenceCreatesNegativeFinding: false,
    I132IndependentNormativeProvenanceRequirementRemainsNormative: true,
    I132PolicyRelaxationAuthorizedByThisGate: false,
    evidenceRebindingMethodologicallyReady: false,
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
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_THIRD_WAVE_CANDIDATE_EVIDENCE_ADEQUACY_LINEAGE_ADJUDICATION_READINESS_REVIEW',
  } as unknown as I189ThirdWaveNewProvenanceCandidateDiscoveryEvidenceReport;
}

describe('I190 third-wave candidate evidence adequacy and lineage adjudication readiness review', () => {
  it('accepts exact I189 and restricts targeted lineage readiness to Qu Wei only', () => {
    const report = buildI190ThirdWaveCandidateEvidenceAdequacyLineageAdjudicationReadinessReview(validI189());
    expect(report.status).toBe('RESOLVED_THIRD_WAVE_CANDIDATE_EVIDENCE_ADEQUACY_LINEAGE_ADJUDICATION_READINESS_REVIEW');
    expect(report.decision).toBe(
      'I189_EVIDENCE_ADEQUATE_ONE_MINIMUM_ADEQUACY_CANDIDATE_QU_WEI_READY_FOR_TARGETED_LINEAGE_ADJUDICATION_FOUR_QUESTIONS_FROZEN_LI_HONGCHENG_NOT_PROMOTED_THREE_DERIVATIVE_RISK_SURFACES_NOT_PROMOTED_ZERO_INDEPENDENCE_ZERO_SELECTION',
    );
    expect(report.exactI189BoundaryAccepted).toBe(true);
    expect(report.i189EvidenceAdequateForReadiness).toBe(true);
    expect(report.i189FiveObservationRecordAccepted).toBe(true);
    expect(report.i189SixSearchChannelExecutionAccepted).toBe(true);
    expect(report.i189IndependenceZeroAccepted).toBe(true);
    expect(report.targetedLineageCandidateIds).toEqual(['QU_WEI_2003_SIZHU_TEXUNBAN_JIANGYI']);
    expect(report.targetedLineageCandidateCount).toBe(1);
    expect(report.onlyQuWeiPromotedToTargetedLineage).toBe(true);
  });

  it('accepts Qu Wei identity and exact scope for lineage review without manufacturing formal publication authority', () => {
    const report = buildI190ThirdWaveCandidateEvidenceAdequacyLineageAdjudicationReadinessReview(validI189());
    expect(report.quWeiExactScopeEvidenceAdequateForLineageReview).toBe(true);
    expect(report.quWeiAuthorAndWorkIdentityAdequateForLineageReview).toBe(true);
    expect(report.quWeiSelfDated2003ChronologyAdequateForLineageReview).toBe(true);
    expect(report.quWeiFormalPublicationIdentityRequiredBeforeLineageDiscovery).toBe(false);
    expect(report.quWeiCurrentLineageDisposition).toBe('UNRESOLVED_REJECT_INDEPENDENCE_CLAIM');
    expect(report.quWeiLineageRiskSignalFromLiHanchenSuccessionTaxonomyPreserved).toBe(true);
    expect(report.quWeiIndependenceEstablishedByThisGate).toBe(false);
  });

  it('freezes exactly four targeted lineage questions before evidence acquisition', () => {
    const report = buildI190ThirdWaveCandidateEvidenceAdequacyLineageAdjudicationReadinessReview(validI189());
    expect(report.lineageQuestionIds).toEqual(I190_QU_WEI_LINEAGE_QUESTION_IDS);
    expect(report.lineageQuestionCount).toBe(4);
    expect(report.lineageQuestions).toHaveLength(4);
    expect(report.lineageQuestionsFrozenProspectively).toBe(true);
    expect(report.priorSameAuthorWorkComparisonRequired).toBe(true);
    expect(report.liHanchenDependencyAdjudicationRequired).toBe(true);
    expect(report.liHongchengRelationshipAdjudicationRequired).toBe(true);
    expect(report.otherEarlierDistinctiveSourceSearchRequired).toBe(true);
    expect(report.lineageQuestions.every((question) => question.answeredByThisGate === false)).toBe(true);
    expect(report.lineageQuestions.every((question) => question.unresolvedDefaultDisposition === 'REJECT_INDEPENDENCE_CLAIM')).toBe(true);
  });

  it('does not promote Li Hongcheng or the three derivative-risk surfaces', () => {
    const report = buildI190ThirdWaveCandidateEvidenceAdequacyLineageAdjudicationReadinessReview(validI189());
    expect(report.liHongchengExactScopeObservationPreserved).toBe(true);
    expect(report.liHongchengExactPassageSourceIdentityStillIncomplete).toBe(true);
    expect(report.liHongchengPromotedToTargetedLineageByThisGate).toBe(false);
    expect(report.huXiaosanDerivativeRiskPreserved).toBe(true);
    expect(report.huanglinRetransmissionRiskPreserved).toBe(true);
    expect(report.moguExplicitHanchenSchoolSignalPreserved).toBe(true);
    expect(report.derivativeRiskSurfacePromotedToIndependentCandidateCount).toBe(0);
  });

  it('keeps the lineage protocol symmetric and fail-closed rather than inferring either dependency or independence', () => {
    const report = buildI190ThirdWaveCandidateEvidenceAdequacyLineageAdjudicationReadinessReview(validI189());
    expect(report.sameAuthorPriorWorkCountsAsIndependentAuthority).toBe(false);
    expect(report.thirdPartySuccessionClaimAloneEstablishesDerivativeEdge).toBe(false);
    expect(report.absenceOfDependencyEvidenceEstablishesIndependence).toBe(false);
    expect(report.semanticDifferenceAloneEstablishesIndependence).toBe(false);
    expect(report.chronologyDifferenceAloneEstablishesIndependence).toBe(false);
    expect(report.targetedLineageAdjudicationReadinessEstablished).toBe(true);
    expect(report.targetedLineageEvidenceAcquisitionAuthorizedByThisGate).toBe(true);
    expect(report.targetedLineageAdjudicationExecutedByThisGate).toBe(false);
    expect(report.explicitDerivativeRelationshipCheckRequired).toBe(true);
    expect(report.derivativeRetransmissionCountsAsIndependentAuthority).toBe(false);
    expect(report.unresolvedLineageDefaultDisposition).toBe('REJECT_INDEPENDENCE_CLAIM');
  });

  it('preserves I132, candidate-set, rebinding, threshold, numeric and production guards', () => {
    const report = buildI190ThirdWaveCandidateEvidenceAdequacyLineageAdjudicationReadinessReview(validI189());
    expect(report.sourceClassAloneSufficient).toBe(false);
    expect(report.sourceCountMayBecomeNumericWeight).toBe(false);
    expect(report.provenanceTierMayBecomeNumericWeight).toBe(false);
    expect(report.provenanceIndependenceAdjudicatedByThisGate).toBe(false);
    expect(report.independentNormativeProvenanceEstablishedCount).toBe(0);
    expect(report.candidateSelectedByThisGate).toBe(false);
    expect(report.candidateRegistrationAuthorizedByThisGate).toBe(false);
    expect(report.candidateSetMutatedByThisGate).toBe(false);
    expect(report.candidateSetReevaluationAuthorizedByThisGate).toBe(false);
    expect(report.currentV2PackageAndCandidateSetRemainImmutable).toBe(true);
    expect(report.I132IndependentNormativeProvenanceRequirementRemainsNormative).toBe(true);
    expect(report.I132PolicyRelaxationAuthorizedByThisGate).toBe(false);
    expect(report.evidenceRebindingMethodologicallyReady).toBe(false);
    expect(report.actualCompositionPerformedByThisGate).toBe(false);
    expect(report.multiSourceCompositionAuthorized).toBe(false);
    expect(report.thresholdRuleCreatedByThisGate).toBe(false);
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
    expect(report.productionPolicyExecutionAuthorized).toBe(false);
  });

  it('preserves the suspended Li 1998 path and non-exhaustion while opening only Qu Wei lineage evidence acquisition', () => {
    const report = buildI190ThirdWaveCandidateEvidenceAdequacyLineageAdjudicationReadinessReview(validI189());
    expect(report.liSameTargetDirectPrimaryPathRemainsMethodologicallyOpen).toBe(true);
    expect(report.liSameTargetPathSuspendedNotRetired).toBe(true);
    expect(report.liSameTargetMayReopenOnMateriallyNewDirectLead).toBe(true);
    expect(report.liPublicationMediumOrEntityGapStillOpen).toBe(true);
    expect(report.liCanonicalDigitalWitnessNormalizationGapStillOpen).toBe(true);
    expect(report.li1998WitnessIndependentProvenanceEstablished).toBe(false);
    expect(report.targetedDiscoveryExhaustionEstablished).toBe(false);
    expect(report.corpusExhaustionEstablished).toBe(false);
    expect(report.searchSilenceCreatesNegativeFinding).toBe(false);
    expect(report.hiddenStemAuthorityGap).toBe('SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED');
    expect(report.recommendedNextGate).toBe(
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_QU_WEI_TARGETED_LINEAGE_ADJUDICATION_EVIDENCE',
    );
  });

  it('fails closed if I189 is mutated to claim independent provenance', () => {
    const mutated = {
      ...validI189(),
      independentNormativeProvenanceEstablishedCount: 1,
    } as unknown as I189ThirdWaveNewProvenanceCandidateDiscoveryEvidenceReport;
    const report = buildI190ThirdWaveCandidateEvidenceAdequacyLineageAdjudicationReadinessReview(mutated);
    expect(report.status).toBe('I189_DISCOVERY_EVIDENCE_BOUNDARY_INVALID');
    expect(report.decision).toBe('THIRD_WAVE_CANDIDATE_LINEAGE_ADJUDICATION_NOT_READY');
    expect(report.exactI189BoundaryAccepted).toBe(false);
    expect(report.targetedLineageCandidateCount).toBe(0);
    expect(report.lineageQuestions).toHaveLength(0);
    expect(report.targetedLineageAdjudicationReadinessEstablished).toBe(false);
    expect(report.targetedLineageEvidenceAcquisitionAuthorizedByThisGate).toBe(false);
    expect(report.currentV2ProvenanceDisposition).toBe('NOT_ASSESSED');
    expect(report.I132IndependentNormativeProvenanceRequirementRemainsNormative).toBe(false);
  });
});
