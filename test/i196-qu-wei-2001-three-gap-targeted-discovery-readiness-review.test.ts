import { describe, expect, it } from 'vitest';
import type { I195QuWei2001PriorWitnessIdentityTargetPassageEvidenceAdequacyRebindingReadinessReviewReport } from '../src/research/i195-qu-wei-2001-prior-witness-identity-target-passage-evidence-adequacy-rebinding-readiness-review.js';
import {
  I196_DISCOVERY_CHANNEL_IDS,
  I196_DISCOVERY_CONTROL_IDS,
  I196_TARGET_GAP_IDS,
  buildI196QuWei2001ThreeGapTargetedDiscoveryReadinessReview,
} from '../src/research/i196-qu-wei-2001-three-gap-targeted-discovery-readiness-review.js';

function validI195(): I195QuWei2001PriorWitnessIdentityTargetPassageEvidenceAdequacyRebindingReadinessReviewReport {
  return {
    reviewId: 'i195_fixture',
    status: 'RESOLVED_QU_WEI_2001_PRIOR_WITNESS_IDENTITY_TARGET_PASSAGE_EVIDENCE_ADEQUACY_REBINDING_READINESS_REVIEW',
    decision: 'I194_EVIDENCE_ADEQUATE_TO_ESTABLISH_DIRECT_2001_DOCTRINAL_ANTECEDENT_BUT_REBINDING_NOT_READY_THREE_GAPS_PUBLICATION_IDENTITY_CANONICAL_WITNESS_NORMALIZATION_AND_EXACT_TARGET_PASSAGE_BINDING_REMAIN_TARGETED_THREE_GAP_DISCOVERY_READINESS_MAY_PROCEED_NO_INDEPENDENCE_NO_POLICY_RELAXATION',
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy', policyVersion: 'v1-definition', adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set', currentInputPackageVersion: 'v2-input-package', exactI194BoundaryAccepted: true,
    i194EvidenceAdequateForReassessment: true, directDoctrinalAntecedentEvidenceAdequate: true,
    doctrineLevelAntecedentEqualsExactTargetPassageIdentity: false, remainingGapCount: 3, allThreeGapsRemainOpen: true,
    publicationGapStatus: 'UNRESOLVED', canonicalWitnessNormalizationGapStatus: 'UNRESOLVED', exactTargetPassageBindingGapStatus: 'UNRESOLVED',
    searchSilenceCreatesNegativeFinding: false, exactPhraseNotFoundProvesPhraseAbsentFrom2001: false,
    secondaryCatalogStatusMayBackfillPublicationIdentity: false, unverifiedAggregatorIsbnMayBackfillPublicationIdentity: false,
    representationPageCountVarianceCreatesDistinctAuthority: false, allThreeRemainingGapsRequiredBeforeRebindingReadiness: true,
    oneGapResolutionAloneSufficientForRebinding: false, evidenceRebindingMethodologicallyReady: false,
    evidenceRebindingAuthorizedByThisGate: false, targetedThreeGapDiscoveryReadinessReviewAuthorized: true,
    sameAuthor2001To2003DoctrinalDependencyPreserved: true, externalTargetLineageUnresolvedQuestionCount: 3,
    provenanceIndependenceAdjudicatedByThisGate: false, independentNormativeProvenanceEstablishedCount: 0,
    explicitDerivativeRelationshipCheckRequired: true, derivativeRetransmissionCountsAsIndependentAuthority: false,
    unresolvedLineageDefaultDisposition: 'REJECT_INDEPENDENCE_CLAIM', I132IndependentNormativeProvenanceRequirementRemainsNormative: true,
    I132PolicyRelaxationAuthorizedByThisGate: false, sourceClassAloneSufficient: false, sourceCountMayBecomeNumericWeight: false,
    provenanceTierMayBecomeNumericWeight: false, currentV2PackageAndCandidateSetRemainImmutable: true,
    currentV2ProvenanceDisposition: 'BLOCKED_UNDER_CURRENT_EVIDENCE', candidateSetReevaluationAuthorizedByThisGate: false,
    candidateSetAdmissibilityEstablishedByThisGate: false, liSameTargetPathSuspendedNotRetired: true,
    liSameTargetMayReopenOnMateriallyNewDirectLead: true, liPublicationMediumOrEntityGapStillOpen: true,
    liCanonicalDigitalWitnessNormalizationGapStillOpen: true, targetedDiscoveryExhaustionEstablished: false, corpusExhaustionEstablished: false,
    productionPolicyExecutionAuthorized: false, actualCompositionPerformedByThisGate: false, multiSourceCompositionAuthorized: false,
    authorityAcquiredByThisGate: false, visibleStemBinaryEffectiveInteractionEligibilityResolved: false, thresholdRuleCreatedByThisGate: false,
    damageEvaluationAuthorized: false, classificationAuthorized: false, numericScoringAuthorized: false,
    hiddenStemInteractionEligibilityGapRemains: true, hiddenStemAuthorityGap: 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED',
    recommendedNextGate: 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_QU_WEI_2001_THREE_GAP_TARGETED_DISCOVERY_READINESS_REVIEW',
  } as unknown as I195QuWei2001PriorWitnessIdentityTargetPassageEvidenceAdequacyRebindingReadinessReviewReport;
}

describe('I196 Qu Wei 2001 three-gap targeted discovery readiness', () => {
  it('accepts exact I195 and freezes exactly three target gaps', () => {
    const r = buildI196QuWei2001ThreeGapTargetedDiscoveryReadinessReview(validI195());
    expect(r.status).toBe('RESOLVED_QU_WEI_2001_THREE_GAP_TARGETED_DISCOVERY_READINESS_REVIEW');
    expect(r.exactI195BoundaryAccepted).toBe(true);
    expect(r.targetGapIds).toEqual(I196_TARGET_GAP_IDS);
    expect(r.targetGapCount).toBe(3);
    expect(r.allThreeTargetGapsOpenAtEntry).toBe(true);
  });

  it('freezes nine channels and fifteen controls before evidence collection', () => {
    const r = buildI196QuWei2001ThreeGapTargetedDiscoveryReadinessReview(validI195());
    expect(r.discoveryChannelIds).toEqual(I196_DISCOVERY_CHANNEL_IDS);
    expect(r.discoveryChannelCount).toBe(9);
    expect(r.discoveryChannelsFrozenProspectively).toBe(true);
    expect(r.discoveryControlIds).toEqual(I196_DISCOVERY_CONTROL_IDS);
    expect(r.discoveryControlCount).toBe(15);
    expect(r.discoveryControlsFrozenProspectively).toBe(true);
    expect(r.gapAcquisitionPlanCount).toBe(3);
  });

  it('requires 2001-specific publication binding and rejects metadata shortcuts', () => {
    const r = buildI196QuWei2001ThreeGapTargetedDiscoveryReadinessReview(validI195());
    expect(r.publicationIdentityRequires2001SpecificBinding).toBe(true);
    expect(r.laterEditionMayBackfill2001PublicationIdentity).toBe(false);
    expect(r.secondaryCatalogAloneMayResolvePublicationIdentity).toBe(false);
    expect(r.unverifiedAggregatorIsbnAloneMayResolvePublicationIdentity).toBe(false);
  });

  it('requires direct representation comparison or transformation provenance for canonical normalization', () => {
    const r = buildI196QuWei2001ThreeGapTargetedDiscoveryReadinessReview(validI195());
    expect(r.canonicalNormalizationRequiresDirectComparisonOrTransformationProvenance).toBe(true);
    expect(r.pageCountFileSizeOrFilenameVarianceAloneMayResolveNormalization).toBe(false);
    const plan = r.gapAcquisitionPlans.find((p) => p.gapId === 'QU_WEI_2001_CANONICAL_WITNESS_NORMALIZATION_GAP');
    expect(plan?.channelIds.length).toBe(3);
    expect(plan?.mayResolveGapAtReadinessStage).toBe(false);
  });

  it('requires a direct 2001 witness for exact target-passage binding and rejects doctrine-only shortcut', () => {
    const r = buildI196QuWei2001ThreeGapTargetedDiscoveryReadinessReview(validI195());
    expect(r.exactPassageBindingRequiresDirect2001TextWitness).toBe(true);
    expect(r.doctrineLevelSimilarityAloneMayResolveExactPassageBinding).toBe(false);
    expect(r.searchFailureForExactPhraseMayResolveGapAsAbsent).toBe(false);
    expect(r.gapCrossBackfillAllowed).toBe(false);
  });

  it('authorizes discovery evidence only and leaves all three gaps unresolved at readiness stage', () => {
    const r = buildI196QuWei2001ThreeGapTargetedDiscoveryReadinessReview(validI195());
    expect(r.targetedDiscoveryEvidenceMayProceed).toBe(true);
    expect(r.discoveryExecutedByThisGate).toBe(false);
    expect(r.evidenceAcquiredByThisGate).toBe(false);
    expect(r.gapResolvedByThisGateCount).toBe(0);
    expect(r.allThreeGapsRequiredBeforeRebindingReadiness).toBe(true);
    expect(r.oneGapResolutionAloneSufficientForRebinding).toBe(false);
    expect(r.evidenceRebindingMethodologicallyReady).toBe(false);
    expect(r.evidenceRebindingAuthorizedByThisGate).toBe(false);
  });

  it('preserves doctrinal antecedent, same-author dependency, I132, v2, Li path and production guards', () => {
    const r = buildI196QuWei2001ThreeGapTargetedDiscoveryReadinessReview(validI195());
    expect(r.direct2001DoctrinalAntecedentPreserved).toBe(true);
    expect(r.sameAuthor2001To2003DoctrinalDependencyPreserved).toBe(true);
    expect(r.externalTargetLineageUnresolvedQuestionCount).toBe(3);
    expect(r.independentNormativeProvenanceEstablishedCount).toBe(0);
    expect(r.unresolvedLineageDefaultDisposition).toBe('REJECT_INDEPENDENCE_CLAIM');
    expect(r.I132IndependentNormativeProvenanceRequirementRemainsNormative).toBe(true);
    expect(r.I132PolicyRelaxationAuthorizedByThisGate).toBe(false);
    expect(r.currentV2PackageAndCandidateSetRemainImmutable).toBe(true);
    expect(r.currentV2ProvenanceDisposition).toBe('BLOCKED_UNDER_CURRENT_EVIDENCE');
    expect(r.liSameTargetPathSuspendedNotRetired).toBe(true);
    expect(r.actualCompositionPerformedByThisGate).toBe(false);
    expect(r.visibleStemBinaryEffectiveInteractionEligibilityResolved).toBe(false);
    expect(r.thresholdRuleCreatedByThisGate).toBe(false);
    expect(r.classificationAuthorized).toBe(false);
    expect(r.numericScoringAuthorized).toBe(false);
    expect(r.hiddenStemAuthorityGap).toBe('SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED');
  });

  it('fails closed if I195 incorrectly treats one gap as enough for rebinding', () => {
    const mutated = { ...validI195(), oneGapResolutionAloneSufficientForRebinding: true } as unknown as I195QuWei2001PriorWitnessIdentityTargetPassageEvidenceAdequacyRebindingReadinessReviewReport;
    const r = buildI196QuWei2001ThreeGapTargetedDiscoveryReadinessReview(mutated);
    expect(r.status).toBe('I195_THREE_GAP_BOUNDARY_INVALID');
    expect(r.decision).toBe('QU_WEI_2001_THREE_GAP_TARGETED_DISCOVERY_NOT_READY');
    expect(r.exactI195BoundaryAccepted).toBe(false);
    expect(r.targetGapCount).toBe(0);
    expect(r.targetedDiscoveryEvidenceMayProceed).toBe(false);
  });
});
