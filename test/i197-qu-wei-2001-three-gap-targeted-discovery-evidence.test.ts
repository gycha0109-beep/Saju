import { describe, expect, it } from 'vitest';
import type { I196QuWei2001ThreeGapTargetedDiscoveryReadinessReviewReport } from '../src/research/i196-qu-wei-2001-three-gap-targeted-discovery-readiness-review.js';
import { buildI197QuWei2001ThreeGapTargetedDiscoveryEvidence } from '../src/research/i197-qu-wei-2001-three-gap-targeted-discovery-evidence.js';

function validI196(): I196QuWei2001ThreeGapTargetedDiscoveryReadinessReviewReport {
  return {
    reviewId: 'i196_fixture',
    status: 'RESOLVED_QU_WEI_2001_THREE_GAP_TARGETED_DISCOVERY_READINESS_REVIEW',
    decision: 'QU_WEI_2001_THREE_GAP_TARGETED_DISCOVERY_READY_THREE_GAPS_NINE_CHANNELS_FIFTEEN_CONTROLS_FROZEN_DISCOVERY_ONLY_NO_REBINDING_NO_INDEPENDENCE',
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy', policyVersion: 'v1-definition', adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set', currentInputPackageVersion: 'v2-input-package', exactI195BoundaryAccepted: true,
    targetGapCount: 3, allThreeTargetGapsOpenAtEntry: true, discoveryChannelCount: 9, discoveryChannelsFrozenProspectively: true,
    discoveryControlCount: 15, discoveryControlsFrozenProspectively: true, gapAcquisitionPlanCount: 3,
    publicationIdentityRequires2001SpecificBinding: true, laterEditionMayBackfill2001PublicationIdentity: false,
    secondaryCatalogAloneMayResolvePublicationIdentity: false, unverifiedAggregatorIsbnAloneMayResolvePublicationIdentity: false,
    canonicalNormalizationRequiresDirectComparisonOrTransformationProvenance: true,
    pageCountFileSizeOrFilenameVarianceAloneMayResolveNormalization: false, exactPassageBindingRequiresDirect2001TextWitness: true,
    doctrineLevelSimilarityAloneMayResolveExactPassageBinding: false, searchFailureForExactPhraseMayResolveGapAsAbsent: false,
    gapCrossBackfillAllowed: false, allThreeGapsRequiredBeforeRebindingReadiness: true, oneGapResolutionAloneSufficientForRebinding: false,
    targetedDiscoveryEvidenceMayProceed: true, discoveryExecutedByThisGate: false, evidenceAcquiredByThisGate: false,
    gapResolvedByThisGateCount: 0, evidenceRebindingMethodologicallyReady: false, evidenceRebindingAuthorizedByThisGate: false,
    sameAuthor2001To2003DoctrinalDependencyPreserved: true, direct2001DoctrinalAntecedentPreserved: true,
    externalTargetLineageUnresolvedQuestionCount: 3, provenanceIndependenceAdjudicatedByThisGate: false,
    independentNormativeProvenanceEstablishedCount: 0, explicitDerivativeRelationshipCheckRequired: true,
    derivativeRetransmissionCountsAsIndependentAuthority: false, unresolvedLineageDefaultDisposition: 'REJECT_INDEPENDENCE_CLAIM',
    I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate: false, I132IndependentNormativeProvenanceRequirementRemainsNormative: true,
    I132PolicyRelaxationAuthorizedByThisGate: false, sourceClassAloneSufficient: false, sourceCountMayBecomeNumericWeight: false,
    provenanceTierMayBecomeNumericWeight: false, currentV2PackageAndCandidateSetRemainImmutable: true,
    currentV2ProvenanceDisposition: 'BLOCKED_UNDER_CURRENT_EVIDENCE', candidateSetReevaluationAuthorizedByThisGate: false,
    candidateSetAdmissibilityEstablishedByThisGate: false, liSameTargetPathSuspendedNotRetired: true,
    liSameTargetMayReopenOnMateriallyNewDirectLead: true, liPublicationMediumOrEntityGapStillOpen: true,
    liCanonicalDigitalWitnessNormalizationGapStillOpen: true, targetedDiscoveryExhaustionEstablished: false,
    corpusExhaustionEstablished: false, searchSilenceCreatesNegativeFinding: false, productionPolicyExecutionAuthorized: false,
    actualCompositionPerformedByThisGate: false, multiSourceCompositionAuthorized: false, authorityAcquiredByThisGate: false,
    visibleStemBinaryEffectiveInteractionEligibilityResolved: false, thresholdRuleCreatedByThisGate: false,
    damageEvaluationAuthorized: false, classificationAuthorized: false, numericScoringAuthorized: false,
    hiddenStemInteractionEligibilityGapRemains: true, hiddenStemAuthorityGap: 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED',
    recommendedNextGate: 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_QU_WEI_2001_THREE_GAP_TARGETED_DISCOVERY_EVIDENCE',
  } as unknown as I196QuWei2001ThreeGapTargetedDiscoveryReadinessReviewReport;
}

describe('I197 Qu Wei 2001 three-gap targeted discovery evidence', () => {
  it('executes all nine channels while leaving all three gaps unresolved', () => {
    const r = buildI197QuWei2001ThreeGapTargetedDiscoveryEvidence(validI196());
    expect(r.status).toBe('RESOLVED_QU_WEI_2001_THREE_GAP_TARGETED_DISCOVERY_EVIDENCE');
    expect(r.exactI196BoundaryAccepted).toBe(true);
    expect(r.discoveryChannelCountExecuted).toBe(9);
    expect(r.allNineFrozenChannelsExecuted).toBe(true);
    expect(r.gapEvidenceRecordCount).toBe(3);
    expect(r.resolvedGapCount).toBe(0);
    expect(r.unresolvedGapCount).toBe(3);
    expect(r.explicitNegativeFindingCount).toBe(0);
  });

  it('strengthens print-production context without claiming a qualifying 2001 issuer or colophon binding', () => {
    const r = buildI197QuWei2001ThreeGapTargetedDiscoveryEvidence(validI196());
    expect(r.contemporaryPrintProductionContextObserved).toBe(true);
    expect(r.sharedFrontMatterStatesTypesettingAndPrintingUnderway).toBe(true);
    expect(r.sharedFrontMatterUsesPublicationOccasionLanguage).toBe(true);
    expect(r.sharedFrontMatterStatesPrintingNotYetComplete).toBe(true);
    expect(r.printProductionContextStrengthened).toBe(true);
    expect(r.printProductionContextQualifiesAs2001SpecificIssuerBinding).toBe(false);
    expect(r.printProductionContextQualifiesAsDirect2001ColophonBinding).toBe(false);
    expect(r.formal2001PublisherEstablished).toBe(false);
    expect(r.formal2001IsbnEstablished).toBe(false);
    expect(r.explicit2001IssuingEntityEstablished).toBe(false);
    expect(r.publicationGapResolved).toBe(false);
  });

  it('does not let later published-work classification or secondary catalog labels backfill 2001 publication identity', () => {
    const r = buildI197QuWei2001ThreeGapTargetedDiscoveryEvidence(validI196());
    expect(r.officialAuthorChronologyStillSupports2001Appearance).toBe(true);
    expect(r.officialAuthorSiteLaterListsTitleAmongPublishedWorks).toBe(true);
    expect(r.laterCurrentPublishedWorksClassificationBackfillsExact2001PublicationEntity).toBe(false);
    expect(r.secondaryCatalogInternalMaterialLabelStillObserved).toBe(true);
    expect(r.secondaryCatalogInternalMaterialLabelResolvesPublicationGap).toBe(false);
    expect(r.explicit2001NonformalPublicationStatusEstablished).toBe(false);
  });

  it('observes representation variance but does not normalize a canonical witness family', () => {
    const r = buildI197QuWei2001ThreeGapTargetedDiscoveryEvidence(validI196());
    expect(r.directDigitalRepresentationsObserved).toBe(true);
    expect(r.observedRepresentationDescriptors.length).toBe(4);
    expect(r.representationPageCountVarianceObserved).toBe(true);
    expect(r.representationFileSizeVarianceObserved).toBe(true);
    expect(r.stableCrossRepresentationFileHashFamilyEstablished).toBe(false);
    expect(r.scanTransformationProvenanceEstablished).toBe(false);
    expect(r.titleImprintTocPaginationComparisonComplete).toBe(false);
    expect(r.canonicalWitnessFamilyEstablished).toBe(false);
    expect(r.representationVarianceCreatesDistinctAuthority).toBe(false);
    expect(r.normalizationGapResolved).toBe(false);
  });

  it('reconfirms the direct 2001 doctrine but does not promote it into exact or near-verbatim passage identity', () => {
    const r = buildI197QuWei2001ThreeGapTargetedDiscoveryEvidence(validI196());
    expect(r.direct2001TargetScopeTextReinspected).toBe(true);
    expect(r.direct2001PositionSensitiveForceDoctrineReconfirmed).toBe(true);
    expect(r.direct2001TightVsGapForceDoctrineReconfirmed).toBe(true);
    expect(r.direct2001SeparatedClashNoForceLanguageObserved).toBe(true);
    expect(r.alternate2001RepresentationCrossCheckAttempted).toBe(true);
    expect(r.exact2003RoutePhraseLocatedIn2001).toBe(false);
    expect(r.nearVerbatim2003RouteSequenceLocatedIn2001).toBe(false);
    expect(r.doctrineLevelAntecedentStillEstablished).toBe(true);
    expect(r.doctrineLevelAntecedentMayResolveExactPassageGap).toBe(false);
    expect(r.exactPassageGapResolved).toBe(false);
  });

  it('does not turn phrase-search or channel-access failure into negative evidence', () => {
    const r = buildI197QuWei2001ThreeGapTargetedDiscoveryEvidence(validI196());
    expect(r.failureToLocateExactPhraseCreatesNegativeFinding).toBe(false);
    expect(r.searchSilenceCreatesNegativeFinding).toBe(false);
    expect(r.channelAccessFailureCreatesNegativeFinding).toBe(false);
    expect(r.targetedDiscoveryExhaustionEstablished).toBe(false);
    expect(r.corpusExhaustionEstablished).toBe(false);
  });

  it('keeps rebinding, provenance independence, frozen v2 and production authority fail-closed', () => {
    const r = buildI197QuWei2001ThreeGapTargetedDiscoveryEvidence(validI196());
    expect(r.allThreeGapsRequiredBeforeRebindingReadiness).toBe(true);
    expect(r.evidenceRebindingMethodologicallyReadyByThisGate).toBe(false);
    expect(r.evidenceRebindingAuthorizedByThisGate).toBe(false);
    expect(r.evidenceRebindingExecutedByThisGate).toBe(false);
    expect(r.sameAuthor2001To2003DoctrinalDependencyPreserved).toBe(true);
    expect(r.externalTargetLineageUnresolvedQuestionCountPreserved).toBe(3);
    expect(r.independentNormativeProvenanceEstablishedCount).toBe(0);
    expect(r.unresolvedLineageDefaultDisposition).toBe('REJECT_INDEPENDENCE_CLAIM');
    expect(r.I132IndependentNormativeProvenanceRequirementRemainsNormative).toBe(true);
    expect(r.I132PolicyRelaxationAuthorizedByThisGate).toBe(false);
    expect(r.currentV2PackageAndCandidateSetRemainImmutable).toBe(true);
    expect(r.currentV2ProvenanceDisposition).toBe('BLOCKED_UNDER_CURRENT_EVIDENCE');
    expect(r.actualCompositionPerformedByThisGate).toBe(false);
    expect(r.visibleStemBinaryEffectiveInteractionEligibilityResolved).toBe(false);
    expect(r.thresholdRuleCreatedByThisGate).toBe(false);
    expect(r.classificationAuthorized).toBe(false);
    expect(r.numericScoringAuthorized).toBe(false);
    expect(r.hiddenStemAuthorityGap).toBe('SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED');
  });

  it('fails closed if I196 allows one-gap rebinding readiness', () => {
    const mutated = { ...validI196(), oneGapResolutionAloneSufficientForRebinding: true } as unknown as I196QuWei2001ThreeGapTargetedDiscoveryReadinessReviewReport;
    const r = buildI197QuWei2001ThreeGapTargetedDiscoveryEvidence(mutated);
    expect(r.status).toBe('I196_THREE_GAP_DISCOVERY_READINESS_BOUNDARY_INVALID');
    expect(r.decision).toBe('QU_WEI_2001_THREE_GAP_TARGETED_DISCOVERY_NOT_EXECUTED');
    expect(r.exactI196BoundaryAccepted).toBe(false);
    expect(r.discoveryChannelCountExecuted).toBe(0);
    expect(r.gapEvidenceRecordCount).toBe(0);
    expect(r.unresolvedGapCount).toBe(0);
  });
});
