import { describe, expect, it } from 'vitest';
import type { I188ThirdWaveNewProvenanceCandidateDiscoveryReadinessReviewReport } from '../src/research/i188-third-wave-new-provenance-candidate-discovery-readiness-review.js';
import { I188_SEARCH_CHANNEL_IDS } from '../src/research/i188-third-wave-new-provenance-candidate-discovery-readiness-review.js';
import {
  I189_DISCOVERY_OBSERVATION_IDS,
  buildI189ThirdWaveNewProvenanceCandidateDiscoveryEvidence,
} from '../src/research/i189-third-wave-new-provenance-candidate-discovery-evidence.js';

function validI188(): I188ThirdWaveNewProvenanceCandidateDiscoveryReadinessReviewReport {
  return {
    reviewId: 'i188_fixture',
    status: 'RESOLVED_THIRD_WAVE_NEW_PROVENANCE_CANDIDATE_DISCOVERY_READINESS_REVIEW',
    decision:
      'THIRD_WAVE_NEW_PROVENANCE_CANDIDATE_DISCOVERY_READY_CONCLUSION_NEUTRAL_NEW_ORIGIN_SEARCH_SCOPE_AND_I132_PROVENANCE_CONTROLS_FROZEN_ZERO_DISCOVERY_ZERO_SELECTION_ZERO_MUTATION',
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI187BoundaryAccepted: true,
    conclusionNeutralDiscoveryRequired: true,
    discoveryReadinessEstablished: true,
    discoveryExecutionAuthorizedByThisGate: true,
    discoveryExecutedByThisGate: false,
    discoveryObservationCount: 0,
    candidateEvidenceAcquiredByThisGate: false,
    genuinelyNewProvenanceCandidateRequired: true,
    existingOriginalSixAliasMayQualifyAsNewCandidate: false,
    existingRemediationCandidateAliasMayQualifyAsNewCandidate: false,
    sameAuthorRetransmissionMayQualifyAsNewIndependentCandidate: false,
    republicationWithoutOriginResolutionMayQualifyAsIndependent: false,
    exactScopeRelevanceRequired: true,
    exactScopeTarget: 'VISIBLE_STEM_REMOTE_KE_INTERACTION_FORCE_APPLICABILITY',
    genericKeVocabularyAloneSufficientForScope: false,
    searchChannelIds: I188_SEARCH_CHANNEL_IDS,
    searchChannelCount: 6,
    searchChannels: I188_SEARCH_CHANNEL_IDS.map((channelId) => ({
      channelId,
      objective: 'fixture',
      minimumRecordFields: Object.freeze(['fixture']),
      mayCreateDiscoveryObservation: true,
      mayEstablishIndependentAuthorityByItself: false,
    })),
    searchChannelsFrozenProspectively: true,
    discoveryControlCount: 14,
    discoveryControlsFrozenProspectively: true,
    explicitDerivativeRelationshipCheckRequired: true,
    derivativeRetransmissionCountsAsIndependentAuthority: false,
    unresolvedLineageDefaultDisposition: 'REJECT_INDEPENDENCE_CLAIM',
    sourceClassAloneSufficient: false,
    sourceCountMayBecomeNumericWeight: false,
    provenanceTierMayBecomeNumericWeight: false,
    searchResultCountMayEstablishAuthority: false,
    semanticAgreementAloneMayEstablishIndependence: false,
    candidateMustReceiveLineageAdjudicationBeforeIndependence: true,
    candidateSelectionAuthorizedByThisGate: false,
    candidateRegistrationAuthorizedByThisGate: false,
    candidateRebindingAuthorizedByThisGate: false,
    candidateSetReevaluationAuthorizedByThisGate: false,
    currentV2PackageAndCandidateSetRemainImmutable: true,
    currentV2ProvenanceDisposition: 'BLOCKED_UNDER_CURRENT_EVIDENCE',
    liSameTargetDirectPrimaryPathRemainsMethodologicallyOpen: true,
    liSameTargetImmediateEquivalentRepeatJustified: false,
    liSameTargetPathSuspendedNotRetired: true,
    liSameTargetMayReopenOnMateriallyNewDirectLead: true,
    targetedDiscoveryExhaustionEstablished: false,
    corpusExhaustionEstablished: false,
    searchSilenceCreatesNegativeFinding: false,
    I132IndependentNormativeProvenanceRequirementRemainsNormative: true,
    I132PolicyRelaxationAuthorizedByThisGate: false,
    provenanceIndependenceAdjudicatedByThisGate: false,
    independentNormativeProvenanceEstablishedCount: 0,
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
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_THIRD_WAVE_NEW_PROVENANCE_CANDIDATE_DISCOVERY_EVIDENCE',
  } as unknown as I188ThirdWaveNewProvenanceCandidateDiscoveryReadinessReviewReport;
}

describe('I189 third-wave new provenance candidate discovery evidence', () => {
  it('accepts exact I188 and executes six channels into five controlled observations', () => {
    const report = buildI189ThirdWaveNewProvenanceCandidateDiscoveryEvidence(validI188());
    expect(report.status).toBe('RESOLVED_THIRD_WAVE_NEW_PROVENANCE_CANDIDATE_DISCOVERY_EVIDENCE');
    expect(report.decision).toBe(
      'THIRD_WAVE_DISCOVERY_EXECUTED_FIVE_OBSERVATIONS_ONE_MINIMUM_ADEQUACY_REVIEW_CANDIDATE_QU_WEI_LI_HONGCHENG_SOURCE_IDENTITY_INCOMPLETE_THREE_DERIVATIVE_RISK_SURFACES_ZERO_INDEPENDENCE_ZERO_SELECTION',
    );
    expect(report.exactI188BoundaryAccepted).toBe(true);
    expect(report.conclusionNeutralDiscoveryPreserved).toBe(true);
    expect(report.searchChannelIds).toEqual(I188_SEARCH_CHANNEL_IDS);
    expect(report.searchChannelExecutionCount).toBe(6);
    expect(report.allSixFrozenSearchChannelsExecuted).toBe(true);
    expect(report.discoveryExecutedByThisGate).toBe(true);
    expect(report.discoveryObservationIds).toEqual(I189_DISCOVERY_OBSERVATION_IDS);
    expect(report.discoveryObservationCount).toBe(5);
    expect(report.observations).toHaveLength(5);
  });

  it('promotes only Qu Wei 2003 to minimum-adequacy review while preserving unresolved lineage and zero independence', () => {
    const report = buildI189ThirdWaveNewProvenanceCandidateDiscoveryEvidence(validI188());
    expect(report.genuinelyNewAuthorOrWorkObservationCount).toBe(2);
    expect(report.minimumAdequacyReviewCandidateCount).toBe(1);
    expect(report.minimumAdequacyReviewCandidateIds).toEqual(['QU_WEI_2003_SIZHU_TEXUNBAN_JIANGYI']);
    expect(report.quWeiExactScopeEvidenceObserved).toBe(true);
    expect(report.quWeiSelfDated2003WorkIdentityObserved).toBe(true);
    expect(report.quWeiMinimumAdequacyReviewCandidate).toBe(true);
    expect(report.quWeiLineageRiskSignalObserved).toBe(true);
    expect(report.quWeiLineageAdjudicationComplete).toBe(false);
    expect(report.quWeiIndependentNormativeProvenanceEstablished).toBe(false);
    const quWei = report.observations.find((item) => item.observationId === 'QU_WEI_2003_SIZHU_TEXUNBAN_JIANGYI');
    expect(quWei?.disposition).toBe('MINIMUM_ADEQUACY_REVIEW_CANDIDATE_LINEAGE_UNRESOLVED');
    expect(quWei?.minimumAdequacyReviewCandidate).toBe(true);
    expect(quWei?.independentNormativeProvenanceEstablished).toBe(false);
  });

  it('records Li Hongcheng exact-scope material but blocks promotion because the exact passage source identity is incomplete', () => {
    const report = buildI189ThirdWaveNewProvenanceCandidateDiscoveryEvidence(validI188());
    expect(report.sourceIdentityIncompleteObservationCount).toBe(1);
    expect(report.liHongchengExactScopeEvidenceObserved).toBe(true);
    expect(report.liHongchengAuthorAnd2003ChronologyObserved).toBe(true);
    expect(report.liHongchengExactPassageSingleWorkPublicationIdentityComplete).toBe(false);
    expect(report.liHongchengMinimumAdequacyReviewCandidate).toBe(false);
    const li = report.observations.find((item) => item.observationId === 'LI_HONGCHENG_REMOTE_KE_COMPILATION_PASSAGE');
    expect(li?.disposition).toBe('SOURCE_IDENTITY_INCOMPLETE');
    expect(li?.workIdentityTraceable).toBe(false);
    expect(li?.minimumAdequacyReviewCandidate).toBe(false);
  });

  it('keeps Hu Xiaosan, Huanglin and Mogu as derivative-risk or retransmission observations rather than new independent origins', () => {
    const report = buildI189ThirdWaveNewProvenanceCandidateDiscoveryEvidence(validI188());
    expect(report.derivativeRiskOrRetransmissionObservationCount).toBe(3);
    expect(report.huXiaosanExactScopeEvidenceObserved).toBe(true);
    expect(report.huXiaosanDerivativeRiskUnresolved).toBe(true);
    expect(report.huanglinExactScopeEvidenceObserved).toBe(true);
    expect(report.huanglinNearVerbatimRetransmissionRiskObserved).toBe(true);
    expect(report.moguExactUpstreamSchoolAttributionObserved).toBe(true);
    expect(report.moguMayQualifyAsIndependentOrigin).toBe(false);
    const dispositions = report.observations.slice(2).map((item) => item.disposition);
    expect(dispositions).toEqual([
      'DERIVATIVE_RISK_UNRESOLVED',
      'DERIVATIVE_RISK_UNRESOLVED',
      'EXPLICIT_SCHOOL_RETRANSMISSION_SIGNAL',
    ]);
    expect(report.observations.slice(2).every((item) => item.independentNormativeProvenanceEstablished === false)).toBe(true);
  });

  it('keeps discovery observations separate from I132 provenance independence', () => {
    const report = buildI189ThirdWaveNewProvenanceCandidateDiscoveryEvidence(validI188());
    expect(report.candidateEvidenceAcquiredByThisGate).toBe(true);
    expect(report.explicitDerivativeRelationshipCheckStillRequired).toBe(true);
    expect(report.derivativeRetransmissionCountsAsIndependentAuthority).toBe(false);
    expect(report.unresolvedLineageDefaultDisposition).toBe('REJECT_INDEPENDENCE_CLAIM');
    expect(report.sourceClassAloneSufficient).toBe(false);
    expect(report.sourceCountMayBecomeNumericWeight).toBe(false);
    expect(report.provenanceTierMayBecomeNumericWeight).toBe(false);
    expect(report.searchResultCountMayEstablishAuthority).toBe(false);
    expect(report.semanticAgreementAloneMayEstablishIndependence).toBe(false);
    expect(report.provenanceIndependenceAdjudicatedByThisGate).toBe(false);
    expect(report.independentNormativeProvenanceEstablishedCount).toBe(0);
  });

  it('preserves frozen candidate-set, Li suspension, non-exhaustion and all production guards', () => {
    const report = buildI189ThirdWaveNewProvenanceCandidateDiscoveryEvidence(validI188());
    expect(report.candidateSelectedByThisGate).toBe(false);
    expect(report.candidateRegistrationAuthorizedByThisGate).toBe(false);
    expect(report.candidateSetMutatedByThisGate).toBe(false);
    expect(report.candidateSetReevaluationAuthorizedByThisGate).toBe(false);
    expect(report.currentV2PackageAndCandidateSetRemainImmutable).toBe(true);
    expect(report.currentV2ProvenanceDisposition).toBe('BLOCKED_UNDER_CURRENT_EVIDENCE');
    expect(report.liSameTargetDirectPrimaryPathRemainsMethodologicallyOpen).toBe(true);
    expect(report.liSameTargetPathSuspendedNotRetired).toBe(true);
    expect(report.liSameTargetMayReopenOnMateriallyNewDirectLead).toBe(true);
    expect(report.liPublicationMediumOrEntityGapStillOpen).toBe(true);
    expect(report.liCanonicalDigitalWitnessNormalizationGapStillOpen).toBe(true);
    expect(report.targetedDiscoveryExhaustionEstablished).toBe(false);
    expect(report.corpusExhaustionEstablished).toBe(false);
    expect(report.searchSilenceCreatesNegativeFinding).toBe(false);
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

  it('records reproducible evidence locators without treating mirrors or later surfaces as authority', () => {
    const report = buildI189ThirdWaveNewProvenanceCandidateDiscoveryEvidence(validI188());
    expect(report.observations.every((item) => item.primaryLocator.startsWith('https://'))).toBe(true);
    expect(report.observations[0]?.corroboratingLocators.length).toBeGreaterThan(0);
    expect(report.observations[0]?.publicationOrWitnessIdentityComplete).toBe(false);
    expect(report.observations[2]?.publicationOrWitnessIdentityComplete).toBe(true);
    expect(report.observations[3]?.derivativeRelationshipRiskObserved).toBe(true);
    expect(report.observations[4]?.explicitUpstreamSchoolAttributionObserved).toBe(true);
    expect(report.independentNormativeProvenanceEstablishedCount).toBe(0);
  });

  it('fails closed if I188 is mutated to let derivative retransmission count as independent authority', () => {
    const mutated = {
      ...validI188(),
      derivativeRetransmissionCountsAsIndependentAuthority: true,
    } as unknown as I188ThirdWaveNewProvenanceCandidateDiscoveryReadinessReviewReport;
    const report = buildI189ThirdWaveNewProvenanceCandidateDiscoveryEvidence(mutated);
    expect(report.status).toBe('I188_DISCOVERY_READINESS_BOUNDARY_INVALID');
    expect(report.decision).toBe('THIRD_WAVE_DISCOVERY_NOT_EXECUTED');
    expect(report.exactI188BoundaryAccepted).toBe(false);
    expect(report.discoveryExecutedByThisGate).toBe(false);
    expect(report.discoveryObservationCount).toBe(0);
    expect(report.observations).toHaveLength(0);
    expect(report.candidateEvidenceAcquiredByThisGate).toBe(false);
    expect(report.currentV2ProvenanceDisposition).toBe('NOT_ASSESSED');
    expect(report.I132IndependentNormativeProvenanceRequirementRemainsNormative).toBe(false);
  });
});
