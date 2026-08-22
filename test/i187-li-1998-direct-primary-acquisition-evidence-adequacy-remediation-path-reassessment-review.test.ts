import { describe, expect, it } from 'vitest';
import type { I186Li1998RemainingDirectPrimaryWitnessAcquisitionEvidenceReport } from '../src/research/i186-li-1998-remaining-direct-primary-witness-acquisition-evidence.js';
import {
  I187_REASSESSMENT_REQUIREMENT_IDS,
  buildI187Li1998DirectPrimaryAcquisitionEvidenceAdequacyRemediationPathReassessmentReview,
} from '../src/research/i187-li-1998-direct-primary-acquisition-evidence-adequacy-remediation-path-reassessment-review.js';

function validI186(): I186Li1998RemainingDirectPrimaryWitnessAcquisitionEvidenceReport {
  return {
    evidenceRecordSetId: 'i186_fixture',
    status: 'RESOLVED_LI_1998_REMAINING_DIRECT_PRIMARY_WITNESS_ACQUISITION_EVIDENCE',
    decision:
      'REMAINING_DIRECT_PRIMARY_WITNESS_ACQUISITION_EXECUTED_FIVE_PATHS_ZERO_QUALIFYING_1998_PUBLICATION_BINDINGS_ZERO_DIRECT_COMPARABLE_WITNESSES_ZERO_STABLE_FILE_IDENTITIES_TWO_GAPS_REMAIN_UNRESOLVED_NO_REBINDING_NO_INDEPENDENCE',
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI185BoundaryAccepted: true,
    acquisitionExecuted: true,
    executedPathCount: 5,
    evidenceRecordCount: 5,
    observationalEvidenceRecordedByThisGate: true,
    qualifyingIdentityEvidenceAcquiredByThisGate: false,
    qualifyingAcquisitionCount: 0,
    directTargetRegistryInfrastructureIdentified: true,
    directTargetRegistryRecordAcquiredCount: 0,
    directTargetRegistryCertificateAcquiredCount: 0,
    directTargetRegistrationNumberAcquiredCount: 0,
    authorReported2018RegistrationContextReconfirmed: true,
    authorReportedRegistrationCountsAsDirectRegistryEvidence: false,
    authorReportedRegistrationEstablishes1998PublicationMedium: false,
    authorChronology1998AppearanceReconfirmed: true,
    authorChronologyCompanyCoLocationEstablishesPublisherIdentity: false,
    direct1998ColophonOrImprintWitnessAcquiredCount: 0,
    direct1998PublisherIssuerDistributorBindingCount: 0,
    explicit1998NonformalDistributionBindingCount: 0,
    later2002FormalEditionReconfirmed: true,
    later2002FormalEditionIsbn: '9789627943679',
    later2002FormalEditionPageCount: 422,
    later2002FormalEditionMayBackfill1998PublicationIdentity: false,
    directComparableFullWitnessSetAcquired: false,
    stableFileIdentityOrHashAcquiredCount: 0,
    transformationProvenanceAcquiredCount: 0,
    completeVariantNormalizationCount: 0,
    publicationMediumOrEntityGapResolved: false,
    canonicalDigitalWitnessNormalizationGapResolved: false,
    bothIdentityFunctionsRequiredBeforeRebindingReadiness: true,
    oneIdentityFunctionResolutionSufficientForRebinding: false,
    evidenceRebindingMethodologicallyReady: false,
    evidenceRebindingAuthorizedByThisGate: false,
    evidenceRebindingSelectedByThisGate: false,
    evidenceRebindingExecutedByThisGate: false,
    targetedDiscoveryExhaustionEstablished: false,
    corpusExhaustionEstablished: false,
    explicitNegativeFindingCount: 0,
    searchSilenceCreatesNegativeFinding: false,
    failedRegistryAccessCreatesNegativeFinding: false,
    failedWitnessAccessCreatesNegativeFinding: false,
    nonAcquisitionCreatesNegativeFinding: false,
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
    I132PolicyRelaxationAuthorizedByThisGate: false,
    sourceCountVotingAllowed: false,
    provenanceTierWeightingAllowed: false,
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
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_1998_REMAINING_DIRECT_PRIMARY_WITNESS_ACQUISITION_EVIDENCE_ADEQUACY_AND_REMEDIATION_PATH_REASSESSMENT_REVIEW',
  } as unknown as I186Li1998RemainingDirectPrimaryWitnessAcquisitionEvidenceReport;
}

describe('I187 Li 1998 direct-primary acquisition evidence adequacy and remediation-path reassessment', () => {
  it('accepts exact I186 and records an adequate zero-qualifying-gain reassessment boundary', () => {
    const report = buildI187Li1998DirectPrimaryAcquisitionEvidenceAdequacyRemediationPathReassessmentReview(validI186());
    expect(report.status).toBe(
      'RESOLVED_LI_1998_DIRECT_PRIMARY_ACQUISITION_EVIDENCE_ADEQUACY_REMEDIATION_PATH_REASSESSMENT_REVIEW',
    );
    expect(report.decision).toBe(
      'I186_EVIDENCE_ADEQUATE_ZERO_QUALIFYING_GAIN_TWO_GAPS_UNRESOLVED_SAME_TARGET_NOT_EXHAUSTED_EQUIVALENT_REPEAT_NOT_JUSTIFIED_THIRD_WAVE_NEW_PROVENANCE_DISCOVERY_READINESS_MAY_PROCEED_NO_REBINDING_NO_POLICY_RELAXATION',
    );
    expect(report.exactI186BoundaryAccepted).toBe(true);
    expect(report.i186EvidenceAdequateForReassessment).toBe(true);
    expect(report.i186FiveFrozenPathsExecuted).toBe(true);
    expect(report.i186ObservationalEvidenceAccepted).toBe(true);
    expect(report.i186QualifyingAcquisitionCount).toBe(0);
  });

  it('keeps both Li identity gaps unresolved without promoting registry context, later metadata or listings', () => {
    const report = buildI187Li1998DirectPrimaryAcquisitionEvidenceAdequacyRemediationPathReassessmentReview(validI186());
    expect(report.i186DirectTargetRegistryRecordCount).toBe(0);
    expect(report.i186Direct1998PublicationBindingCount).toBe(0);
    expect(report.i186DirectComparableFullWitnessSetAcquired).toBe(false);
    expect(report.i186StableFileIdentityOrHashCount).toBe(0);
    expect(report.i186CompleteVariantNormalizationCount).toBe(0);
    expect(report.publicationMediumOrEntityGapStillOpen).toBe(true);
    expect(report.canonicalDigitalWitnessNormalizationGapStillOpen).toBe(true);
  });

  it('does not declare same-target, targeted or corpus exhaustion from non-acquisition', () => {
    const report = buildI187Li1998DirectPrimaryAcquisitionEvidenceAdequacyRemediationPathReassessmentReview(validI186());
    expect(report.sameTargetDirectPrimaryPathExhausted).toBe(false);
    expect(report.targetedDiscoveryExhaustionEstablished).toBe(false);
    expect(report.corpusExhaustionEstablished).toBe(false);
    expect(report.explicitNegativeFindingCount).toBe(0);
    expect(report.nonAcquisitionCreatesNegativeFinding).toBe(false);
    expect(report.searchSilenceCreatesNegativeFinding).toBe(false);
    expect(report.failedRegistryAccessCreatesNegativeFinding).toBe(false);
    expect(report.failedWitnessAccessCreatesNegativeFinding).toBe(false);
  });

  it('suspends equivalent same-target repetition until a materially new direct lead appears without retiring the path', () => {
    const report = buildI187Li1998DirectPrimaryAcquisitionEvidenceAdequacyRemediationPathReassessmentReview(validI186());
    expect(report.sameTargetDirectPrimaryPathRemainsMethodologicallyOpen).toBe(true);
    expect(report.immediateEquivalentSameTargetRepeatJustified).toBe(false);
    expect(report.materiallyNewDirectLeadRequiredBeforeEquivalentSameTargetRepeat).toBe(true);
    expect(report.materiallyNewDirectLeadMayReturnWorkToSameTargetPath).toBe(true);
    expect(report.currentSameTargetPathSuspendedNotRetired).toBe(true);
  });

  it('routes only a conclusion-neutral third-wave new-provenance discovery readiness review', () => {
    const report = buildI187Li1998DirectPrimaryAcquisitionEvidenceAdequacyRemediationPathReassessmentReview(validI186());
    expect(report.thirdWaveNewProvenanceDiscoveryReadinessMethodologicallyJustified).toBe(true);
    expect(report.thirdWaveNewProvenanceDiscoveryReadinessReviewAuthorized).toBe(true);
    expect(report.thirdWaveDiscoveryExecutedByThisGate).toBe(false);
    expect(report.thirdWaveCandidateAcquiredByThisGate).toBe(false);
    expect(report.thirdWaveCandidateSelectedByThisGate).toBe(false);
    expect(report.thirdWaveCandidateSetMutationAuthorizedByThisGate).toBe(false);
    expect(report.thirdWaveDiscoveryMustBeConclusionNeutral).toBe(true);
    expect(report.recommendedNextGate).toBe(
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_THIRD_WAVE_NEW_PROVENANCE_CANDIDATE_DISCOVERY_READINESS_REVIEW',
    );
  });

  it('reapplies I132 derivative and independence controls to the routed third-wave discovery', () => {
    const report = buildI187Li1998DirectPrimaryAcquisitionEvidenceAdequacyRemediationPathReassessmentReview(validI186());
    expect(report.thirdWaveDiscoveryMustApplyExplicitDerivativeRelationshipCheck).toBe(true);
    expect(report.thirdWaveDiscoverySourceClassAloneSufficient).toBe(false);
    expect(report.thirdWaveDiscoverySourceCountMayBecomeNumericWeight).toBe(false);
    expect(report.thirdWaveDiscoveryProvenanceTierMayBecomeNumericWeight).toBe(false);
    expect(report.thirdWaveDerivativeRetransmissionCountsAsIndependentAuthority).toBe(false);
    expect(report.I132IndependentNormativeProvenanceRequirementRemainsNormative).toBe(true);
    expect(report.I132ExplicitDerivativeRelationshipCheckRequired).toBe(true);
    expect(report.I132DerivativeRetransmissionCountsAsIndependentAuthority).toBe(false);
    expect(report.I132SourceClassAloneSufficient).toBe(false);
    expect(report.I132SourceCountMayBecomeNumericWeight).toBe(false);
    expect(report.I132ProvenanceTierMayBecomeNumericWeight).toBe(false);
    expect(report.I132PolicyRelaxationAuthorizedByThisGate).toBe(false);
  });

  it('freezes 12 controls and preserves rebinding, candidate-set, threshold, numeric and production guards', () => {
    const report = buildI187Li1998DirectPrimaryAcquisitionEvidenceAdequacyRemediationPathReassessmentReview(validI186());
    expect(report.reassessmentRequirementIds).toEqual(I187_REASSESSMENT_REQUIREMENT_IDS);
    expect(report.reassessmentRequirementCount).toBe(12);
    expect(report.reassessmentRequirementsFrozen).toBe(true);
    expect(report.bothIdentityFunctionsRequiredBeforeLiRebindingReadiness).toBe(true);
    expect(report.oneIdentityFunctionResolutionSufficientForLiRebinding).toBe(false);
    expect(report.evidenceRebindingMethodologicallyReady).toBe(false);
    expect(report.evidenceRebindingAuthorizedByThisGate).toBe(false);
    expect(report.evidenceRebindingSelectedByThisGate).toBe(false);
    expect(report.evidenceRebindingExecutedByThisGate).toBe(false);
    expect(report.remediationStrategySelectedByThisGate).toBe(false);
    expect(report.independentNormativeProvenanceEstablishedCount).toBe(0);
    expect(report.currentV2PackageAndCandidateSetRemainImmutable).toBe(true);
    expect(report.candidateSetReevaluationAuthorizedByThisGate).toBe(false);
    expect(report.candidateSetAdmissibilityEstablishedByThisGate).toBe(false);
    expect(report.productionPolicyExecutionAuthorized).toBe(false);
    expect(report.actualCompositionPerformedByThisGate).toBe(false);
    expect(report.multiSourceCompositionAuthorized).toBe(false);
    expect(report.visibleStemBinaryEffectiveInteractionEligibilityResolved).toBe(false);
    expect(report.thresholdRuleCreatedByThisGate).toBe(false);
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
    expect(report.hiddenStemAuthorityGap).toBe('SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED');
  });

  it('fails closed if I186 is mutated to claim a qualifying acquisition', () => {
    const mutated = {
      ...validI186(),
      qualifyingAcquisitionCount: 1,
    } as unknown as I186Li1998RemainingDirectPrimaryWitnessAcquisitionEvidenceReport;
    const report = buildI187Li1998DirectPrimaryAcquisitionEvidenceAdequacyRemediationPathReassessmentReview(mutated);
    expect(report.status).toBe('I186_ACQUISITION_EVIDENCE_BOUNDARY_INVALID');
    expect(report.decision).toBe('LI_1998_DIRECT_PRIMARY_ACQUISITION_EVIDENCE_REASSESSMENT_NOT_READY');
    expect(report.exactI186BoundaryAccepted).toBe(false);
    expect(report.i186EvidenceAdequateForReassessment).toBe(false);
    expect(report.sameTargetDirectPrimaryPathRemainsMethodologicallyOpen).toBe(false);
    expect(report.thirdWaveNewProvenanceDiscoveryReadinessReviewAuthorized).toBe(false);
    expect(report.I132IndependentNormativeProvenanceRequirementRemainsNormative).toBe(false);
  });
});
