import { describe, expect, it } from 'vitest';
import type { I187Li1998DirectPrimaryAcquisitionEvidenceAdequacyRemediationPathReassessmentReviewReport } from '../src/research/i187-li-1998-direct-primary-acquisition-evidence-adequacy-remediation-path-reassessment-review.js';
import {
  I188_DISCOVERY_CONTROL_IDS,
  I188_SEARCH_CHANNEL_IDS,
  buildI188ThirdWaveNewProvenanceCandidateDiscoveryReadinessReview,
} from '../src/research/i188-third-wave-new-provenance-candidate-discovery-readiness-review.js';

function validI187(): I187Li1998DirectPrimaryAcquisitionEvidenceAdequacyRemediationPathReassessmentReviewReport {
  return {
    reviewId: 'i187_fixture',
    status: 'RESOLVED_LI_1998_DIRECT_PRIMARY_ACQUISITION_EVIDENCE_ADEQUACY_REMEDIATION_PATH_REASSESSMENT_REVIEW',
    decision:
      'I186_EVIDENCE_ADEQUATE_ZERO_QUALIFYING_GAIN_TWO_GAPS_UNRESOLVED_SAME_TARGET_NOT_EXHAUSTED_EQUIVALENT_REPEAT_NOT_JUSTIFIED_THIRD_WAVE_NEW_PROVENANCE_DISCOVERY_READINESS_MAY_PROCEED_NO_REBINDING_NO_POLICY_RELAXATION',
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI186BoundaryAccepted: true,
    i186EvidenceAdequateForReassessment: true,
    i186FiveFrozenPathsExecuted: true,
    i186ObservationalEvidenceAccepted: true,
    i186QualifyingAcquisitionCount: 0,
    publicationMediumOrEntityGapStillOpen: true,
    canonicalDigitalWitnessNormalizationGapStillOpen: true,
    sameTargetDirectPrimaryPathExhausted: false,
    targetedDiscoveryExhaustionEstablished: false,
    corpusExhaustionEstablished: false,
    explicitNegativeFindingCount: 0,
    nonAcquisitionCreatesNegativeFinding: false,
    searchSilenceCreatesNegativeFinding: false,
    failedRegistryAccessCreatesNegativeFinding: false,
    failedWitnessAccessCreatesNegativeFinding: false,
    sameTargetDirectPrimaryPathRemainsMethodologicallyOpen: true,
    immediateEquivalentSameTargetRepeatJustified: false,
    materiallyNewDirectLeadRequiredBeforeEquivalentSameTargetRepeat: true,
    materiallyNewDirectLeadMayReturnWorkToSameTargetPath: true,
    currentSameTargetPathSuspendedNotRetired: true,
    thirdWaveNewProvenanceDiscoveryReadinessMethodologicallyJustified: true,
    thirdWaveNewProvenanceDiscoveryReadinessReviewAuthorized: true,
    thirdWaveDiscoveryExecutedByThisGate: false,
    thirdWaveCandidateAcquiredByThisGate: false,
    thirdWaveCandidateSelectedByThisGate: false,
    thirdWaveCandidateSetMutationAuthorizedByThisGate: false,
    thirdWaveDiscoveryMustBeConclusionNeutral: true,
    thirdWaveDiscoveryMustApplyExplicitDerivativeRelationshipCheck: true,
    thirdWaveDiscoverySourceClassAloneSufficient: false,
    thirdWaveDiscoverySourceCountMayBecomeNumericWeight: false,
    thirdWaveDiscoveryProvenanceTierMayBecomeNumericWeight: false,
    thirdWaveDerivativeRetransmissionCountsAsIndependentAuthority: false,
    bothIdentityFunctionsRequiredBeforeLiRebindingReadiness: true,
    oneIdentityFunctionResolutionSufficientForLiRebinding: false,
    evidenceRebindingMethodologicallyReady: false,
    evidenceRebindingAuthorizedByThisGate: false,
    evidenceRebindingSelectedByThisGate: false,
    evidenceRebindingExecutedByThisGate: false,
    remediationStrategySelectedByThisGate: false,
    current2004WitnessPresumedOriginRetired: true,
    prior1998SameAuthorWitnessConfirmed: true,
    prior1998WitnessIndependentProvenanceEstablished: false,
    sameAuthor1998To2004DerivativeChainMustRemainBound: true,
    externalLineageUnresolvedQuestionCount: 3,
    externalLineageUnresolvedStatusPreserved: true,
    provenanceIndependenceAdjudicatedByThisGate: false,
    independentNormativeProvenanceEstablishedCount: 0,
    I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate: false,
    I132IndependentNormativeProvenanceRequirementRemainsNormative: true,
    I132ExplicitDerivativeRelationshipCheckRequired: true,
    I132DerivativeRetransmissionCountsAsIndependentAuthority: false,
    I132SourceClassAloneSufficient: false,
    I132SourceCountMayBecomeNumericWeight: false,
    I132ProvenanceTierMayBecomeNumericWeight: false,
    I132PolicyRelaxationAuthorizedByThisGate: false,
    currentV2PackageAndCandidateSetRemainImmutable: true,
    currentV2ProvenanceDisposition: 'BLOCKED_UNDER_CURRENT_EVIDENCE',
    candidateSetReevaluationAuthorizedByThisGate: false,
    candidateSetAdmissibilityEstablishedByThisGate: false,
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
    reassessmentRequirementCount: 12,
    reassessmentRequirementsFrozen: true,
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_THIRD_WAVE_NEW_PROVENANCE_CANDIDATE_DISCOVERY_READINESS_REVIEW',
  } as unknown as I187Li1998DirectPrimaryAcquisitionEvidenceAdequacyRemediationPathReassessmentReviewReport;
}

describe('I188 third-wave new provenance candidate discovery readiness review', () => {
  it('accepts exact I187 and freezes a conclusion-neutral readiness boundary with zero discovery', () => {
    const report = buildI188ThirdWaveNewProvenanceCandidateDiscoveryReadinessReview(validI187());
    expect(report.status).toBe('RESOLVED_THIRD_WAVE_NEW_PROVENANCE_CANDIDATE_DISCOVERY_READINESS_REVIEW');
    expect(report.decision).toBe(
      'THIRD_WAVE_NEW_PROVENANCE_CANDIDATE_DISCOVERY_READY_CONCLUSION_NEUTRAL_NEW_ORIGIN_SEARCH_SCOPE_AND_I132_PROVENANCE_CONTROLS_FROZEN_ZERO_DISCOVERY_ZERO_SELECTION_ZERO_MUTATION',
    );
    expect(report.exactI187BoundaryAccepted).toBe(true);
    expect(report.conclusionNeutralDiscoveryRequired).toBe(true);
    expect(report.discoveryReadinessEstablished).toBe(true);
    expect(report.discoveryExecutionAuthorizedByThisGate).toBe(true);
    expect(report.discoveryExecutedByThisGate).toBe(false);
    expect(report.discoveryObservationCount).toBe(0);
    expect(report.candidateEvidenceAcquiredByThisGate).toBe(false);
  });

  it('requires genuinely new provenance rather than aliases, republications, or same-author retransmissions', () => {
    const report = buildI188ThirdWaveNewProvenanceCandidateDiscoveryReadinessReview(validI187());
    expect(report.genuinelyNewProvenanceCandidateRequired).toBe(true);
    expect(report.existingOriginalSixAliasMayQualifyAsNewCandidate).toBe(false);
    expect(report.existingRemediationCandidateAliasMayQualifyAsNewCandidate).toBe(false);
    expect(report.sameAuthorRetransmissionMayQualifyAsNewIndependentCandidate).toBe(false);
    expect(report.republicationWithoutOriginResolutionMayQualifyAsIndependent).toBe(false);
  });

  it('freezes the exact remote visible-stem ke scope and traceable identity requirements', () => {
    const report = buildI188ThirdWaveNewProvenanceCandidateDiscoveryReadinessReview(validI187());
    expect(report.exactScopeRelevanceRequired).toBe(true);
    expect(report.exactScopeTarget).toBe('VISIBLE_STEM_REMOTE_KE_INTERACTION_FORCE_APPLICABILITY');
    expect(report.genericKeVocabularyAloneSufficientForScope).toBe(false);
    expect(report.explicitRemoteDistancePositionConditionOrLimitationPreferred).toBe(true);
    expect(report.traceableAuthorIdentityRequiredForPromotion).toBe(true);
    expect(report.traceableWorkIdentityRequiredForPromotion).toBe(true);
    expect(report.traceableEditionOrPublicationIdentityRequiredForPromotion).toBe(true);
    expect(report.primaryOrNearPrimaryPublicationIdentityPreferred).toBe(true);
  });

  it('freezes six search channels and keeps each channel non-authoritative by itself', () => {
    const report = buildI188ThirdWaveNewProvenanceCandidateDiscoveryReadinessReview(validI187());
    expect(report.searchChannelIds).toEqual(I188_SEARCH_CHANNEL_IDS);
    expect(report.searchChannelCount).toBe(6);
    expect(report.searchChannels).toHaveLength(6);
    expect(report.searchChannelsFrozenProspectively).toBe(true);
    expect(report.searchChannels.every((channel) => channel.mayCreateDiscoveryObservation)).toBe(true);
    expect(report.searchChannels.every((channel) => channel.mayEstablishIndependentAuthorityByItself === false)).toBe(true);
    expect(report.aggregatorMayRouteDiscovery).toBe(true);
    expect(report.aggregatorAloneMayEstablishIndependentAuthority).toBe(false);
  });

  it('reapplies I132 lineage controls before any independence claim', () => {
    const report = buildI188ThirdWaveNewProvenanceCandidateDiscoveryReadinessReview(validI187());
    expect(report.explicitDerivativeRelationshipCheckRequired).toBe(true);
    expect(report.derivativeRetransmissionCountsAsIndependentAuthority).toBe(false);
    expect(report.sameAuthorPriorOrLaterWorkCountsAsIndependentFromItself).toBe(false);
    expect(report.unresolvedLineageDefaultDisposition).toBe('REJECT_INDEPENDENCE_CLAIM');
    expect(report.sourceClassAloneSufficient).toBe(false);
    expect(report.sourceCountMayBecomeNumericWeight).toBe(false);
    expect(report.provenanceTierMayBecomeNumericWeight).toBe(false);
    expect(report.searchResultCountMayEstablishAuthority).toBe(false);
    expect(report.semanticAgreementAloneMayEstablishIndependence).toBe(false);
    expect(report.thirdPartyQuotationAloneMayEstablishOrigin).toBe(false);
    expect(report.laterEditionMayBackfillEarlierOriginIdentityWithoutBinding).toBe(false);
    expect(report.candidateMustReceiveLineageAdjudicationBeforeIndependence).toBe(true);
  });

  it('keeps the Li path suspended-not-retired and preserves non-exhaustion', () => {
    const report = buildI188ThirdWaveNewProvenanceCandidateDiscoveryReadinessReview(validI187());
    expect(report.liSameTargetDirectPrimaryPathRemainsMethodologicallyOpen).toBe(true);
    expect(report.liSameTargetImmediateEquivalentRepeatJustified).toBe(false);
    expect(report.liSameTargetPathSuspendedNotRetired).toBe(true);
    expect(report.liSameTargetMayReopenOnMateriallyNewDirectLead).toBe(true);
    expect(report.liPublicationMediumOrEntityGapStillOpen).toBe(true);
    expect(report.liCanonicalDigitalWitnessNormalizationGapStillOpen).toBe(true);
    expect(report.li1998WitnessIndependentProvenanceEstablished).toBe(false);
    expect(report.liSameAuthor1998To2004DerivativeChainMustRemainBound).toBe(true);
    expect(report.targetedDiscoveryExhaustionEstablished).toBe(false);
    expect(report.corpusExhaustionEstablished).toBe(false);
    expect(report.noThirdWaveCandidateFoundWouldEstablishNonexistence).toBe(false);
  });

  it('freezes fourteen controls and preserves candidate-set, rebinding, threshold, numeric and production guards', () => {
    const report = buildI188ThirdWaveNewProvenanceCandidateDiscoveryReadinessReview(validI187());
    expect(report.discoveryControlIds).toEqual(I188_DISCOVERY_CONTROL_IDS);
    expect(report.discoveryControlCount).toBe(14);
    expect(report.discoveryControlsFrozenProspectively).toBe(true);
    expect(report.candidateSelectionAuthorizedByThisGate).toBe(false);
    expect(report.candidateRegistrationAuthorizedByThisGate).toBe(false);
    expect(report.candidateRebindingAuthorizedByThisGate).toBe(false);
    expect(report.candidateSetReevaluationAuthorizedByThisGate).toBe(false);
    expect(report.currentV2PackageAndCandidateSetRemainImmutable).toBe(true);
    expect(report.I132IndependentNormativeProvenanceRequirementRemainsNormative).toBe(true);
    expect(report.I132PolicyRelaxationAuthorizedByThisGate).toBe(false);
    expect(report.independentNormativeProvenanceEstablishedCount).toBe(0);
    expect(report.evidenceRebindingMethodologicallyReady).toBe(false);
    expect(report.actualCompositionPerformedByThisGate).toBe(false);
    expect(report.multiSourceCompositionAuthorized).toBe(false);
    expect(report.thresholdRuleCreatedByThisGate).toBe(false);
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
    expect(report.productionPolicyExecutionAuthorized).toBe(false);
    expect(report.hiddenStemAuthorityGap).toBe('SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED');
  });

  it('fails closed if I187 is mutated to claim same-target exhaustion', () => {
    const mutated = {
      ...validI187(),
      sameTargetDirectPrimaryPathExhausted: true,
    } as unknown as I187Li1998DirectPrimaryAcquisitionEvidenceAdequacyRemediationPathReassessmentReviewReport;
    const report = buildI188ThirdWaveNewProvenanceCandidateDiscoveryReadinessReview(mutated);
    expect(report.status).toBe('I187_THIRD_WAVE_ROUTING_BOUNDARY_INVALID');
    expect(report.decision).toBe('THIRD_WAVE_NEW_PROVENANCE_CANDIDATE_DISCOVERY_NOT_READY');
    expect(report.exactI187BoundaryAccepted).toBe(false);
    expect(report.discoveryReadinessEstablished).toBe(false);
    expect(report.discoveryExecutionAuthorizedByThisGate).toBe(false);
    expect(report.searchChannels).toHaveLength(0);
    expect(report.candidateEvidenceAcquiredByThisGate).toBe(false);
    expect(report.I132IndependentNormativeProvenanceRequirementRemainsNormative).toBe(false);
  });
});
