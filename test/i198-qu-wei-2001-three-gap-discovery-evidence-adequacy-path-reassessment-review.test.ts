import { describe, expect, it } from 'vitest';
import type { I197QuWei2001ThreeGapTargetedDiscoveryEvidenceReport } from '../src/research/i197-qu-wei-2001-three-gap-targeted-discovery-evidence.js';
import {
  I198_REVIEWABLE_PATH_IDS,
  buildI198QuWei2001ThreeGapDiscoveryEvidenceAdequacyPathReassessmentReview,
} from '../src/research/i198-qu-wei-2001-three-gap-discovery-evidence-adequacy-path-reassessment-review.js';

function validI197(): I197QuWei2001ThreeGapTargetedDiscoveryEvidenceReport {
  return {
    evidenceRecordSetId: 'i197_fixture',
    status: 'RESOLVED_QU_WEI_2001_THREE_GAP_TARGETED_DISCOVERY_EVIDENCE',
    decision: 'QU_WEI_2001_THREE_GAP_TARGETED_DISCOVERY_EXECUTED_NINE_CHANNELS_ZERO_GAPS_RESOLVED_THREE_REMAIN_UNRESOLVED_PRINT_PRODUCTION_CONTEXT_STRENGTHENED_VARIANT_PROVENANCE_AND_EXACT_PASSAGE_BINDING_UNRESOLVED_NO_REBINDING_NO_INDEPENDENCE',
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI196BoundaryAccepted: true,
    discoveryChannelCountExecuted: 9,
    allNineFrozenChannelsExecuted: true,
    gapEvidenceRecords: [
      {
        gapId: 'QU_WEI_2001_PUBLICATION_MEDIUM_OR_ENTITY_IDENTITY_GAP',
        finding: 'UNRESOLVED_AFTER_BOUNDED_TARGETED_DISCOVERY',
        sourceLocators: [], observations: [], qualifyingResolutionEvidenceAcquired: false,
      },
      {
        gapId: 'QU_WEI_2001_CANONICAL_WITNESS_NORMALIZATION_GAP',
        finding: 'UNRESOLVED_AFTER_BOUNDED_TARGETED_DISCOVERY',
        sourceLocators: [], observations: [], qualifyingResolutionEvidenceAcquired: false,
      },
      {
        gapId: 'QU_WEI_2001_EXACT_TARGET_PASSAGE_BINDING_GAP',
        finding: 'UNRESOLVED_AFTER_BOUNDED_TARGETED_DISCOVERY',
        sourceLocators: [], observations: [], qualifyingResolutionEvidenceAcquired: false,
      },
    ],
    gapEvidenceRecordCount: 3,
    resolvedGapCount: 0,
    unresolvedGapCount: 3,
    explicitNegativeFindingCount: 0,
    publicationGapFinding: 'UNRESOLVED_AFTER_BOUNDED_TARGETED_DISCOVERY',
    contemporaryPrintProductionContextObserved: true,
    sharedFrontMatterStatesTypesettingAndPrintingUnderway: true,
    sharedFrontMatterUsesPublicationOccasionLanguage: true,
    sharedFrontMatterStatesPrintingNotYetComplete: true,
    printProductionContextStrengthened: true,
    printProductionContextQualifiesAs2001SpecificIssuerBinding: false,
    printProductionContextQualifiesAsDirect2001ColophonBinding: false,
    formal2001PublisherEstablished: false,
    formal2001IsbnEstablished: false,
    explicit2001IssuingEntityEstablished: false,
    explicit2001NonformalPublicationStatusEstablished: false,
    publicationGapResolved: false,
    normalizationGapFinding: 'UNRESOLVED_AFTER_BOUNDED_TARGETED_DISCOVERY',
    directDigitalRepresentationsObserved: true,
    observedRepresentationDescriptors: ['94-page', '184-page', '5.95 MB', '20.0 MB'],
    representationPageCountVarianceObserved: true,
    representationFileSizeVarianceObserved: true,
    stableCrossRepresentationFileHashFamilyEstablished: false,
    scanTransformationProvenanceEstablished: false,
    titleImprintTocPaginationComparisonComplete: false,
    canonicalWitnessFamilyEstablished: false,
    representationVarianceCreatesDistinctAuthority: false,
    normalizationGapResolved: false,
    exactPassageGapFinding: 'UNRESOLVED_AFTER_BOUNDED_TARGETED_DISCOVERY',
    direct2001TargetScopeTextReinspected: true,
    direct2001PositionSensitiveForceDoctrineReconfirmed: true,
    direct2001TightVsGapForceDoctrineReconfirmed: true,
    direct2001SeparatedClashNoForceLanguageObserved: true,
    alternate2001RepresentationCrossCheckAttempted: true,
    exact2003RoutePhraseLocatedIn2001: false,
    nearVerbatim2003RouteSequenceLocatedIn2001: false,
    doctrineLevelAntecedentStillEstablished: true,
    doctrineLevelAntecedentMayResolveExactPassageGap: false,
    failureToLocateExactPhraseCreatesNegativeFinding: false,
    exactPassageGapResolved: false,
    allThreeGapsRequiredBeforeRebindingReadiness: true,
    evidenceRebindingMethodologicallyReadyByThisGate: false,
    evidenceRebindingAuthorizedByThisGate: false,
    evidenceRebindingExecutedByThisGate: false,
    sameAuthor2001To2003DoctrinalDependencyPreserved: true,
    externalTargetLineageUnresolvedQuestionCountPreserved: 3,
    provenanceIndependenceAdjudicatedByThisGate: false,
    independentNormativeProvenanceEstablishedCount: 0,
    explicitDerivativeRelationshipCheckRequired: true,
    derivativeRetransmissionCountsAsIndependentAuthority: false,
    unresolvedLineageDefaultDisposition: 'REJECT_INDEPENDENCE_CLAIM',
    I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate: false,
    I132IndependentNormativeProvenanceRequirementRemainsNormative: true,
    I132PolicyRelaxationAuthorizedByThisGate: false,
    sourceClassAloneSufficient: false,
    sourceCountMayBecomeNumericWeight: false,
    provenanceTierMayBecomeNumericWeight: false,
    searchSilenceCreatesNegativeFinding: false,
    channelAccessFailureCreatesNegativeFinding: false,
    currentV2PackageAndCandidateSetRemainImmutable: true,
    currentV2ProvenanceDisposition: 'BLOCKED_UNDER_CURRENT_EVIDENCE',
    candidateSelectedByThisGate: false,
    candidateRegistrationAuthorizedByThisGate: false,
    candidateSetMutatedByThisGate: false,
    candidateSetReevaluationAuthorizedByThisGate: false,
    candidateSetAdmissibilityEstablishedByThisGate: false,
    liSameTargetPathSuspendedNotRetired: true,
    liSameTargetMayReopenOnMateriallyNewDirectLead: true,
    liPublicationMediumOrEntityGapStillOpen: true,
    liCanonicalDigitalWitnessNormalizationGapStillOpen: true,
    targetedDiscoveryExhaustionEstablished: false,
    corpusExhaustionEstablished: false,
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
    recommendedNextGate: 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_QU_WEI_2001_THREE_GAP_DISCOVERY_EVIDENCE_ADEQUACY_AND_PATH_REASSESSMENT_REVIEW',
  } as unknown as I197QuWei2001ThreeGapTargetedDiscoveryEvidenceReport;
}

describe('I198 Qu Wei 2001 three-gap discovery evidence adequacy and path reassessment', () => {
  it('accepts I197 as adequate evidence for three unresolved findings without resolving any gap', () => {
    const r = buildI198QuWei2001ThreeGapDiscoveryEvidenceAdequacyPathReassessmentReview(validI197());
    expect(r.status).toBe('RESOLVED_QU_WEI_2001_THREE_GAP_DISCOVERY_EVIDENCE_ADEQUACY_PATH_REASSESSMENT_REVIEW');
    expect(r.decision).toBe('I197_EVIDENCE_ADEQUATE_FOR_THREE_UNRESOLVED_FINDINGS_REBINDING_NOT_READY_NO_EXHAUSTION_EQUIVALENT_REPEAT_NOT_JUSTIFIED_GENUINELY_NEW_DIRECT_EVIDENCE_ACQUISITION_READINESS_MAY_PROCEED_NO_INDEPENDENCE_NO_POLICY_RELAXATION');
    expect(r.exactI197BoundaryAccepted).toBe(true);
    expect(r.assessedGapCount).toBe(3);
    expect(r.unresolvedFindingCount).toBe(3);
    expect(r.explicitNegativeFindingCount).toBe(0);
    expect(r.evidenceAdequateForRecordedUnresolvedFindings).toBe(true);
  });

  it('preserves print-production context without letting it close publication identity', () => {
    const r = buildI198QuWei2001ThreeGapDiscoveryEvidenceAdequacyPathReassessmentReview(validI197());
    expect(r.printProductionContextAcceptedAsHistoricalContext).toBe(true);
    expect(r.printProductionContextMayResolvePublicationIdentity).toBe(false);
    expect(r.laterPublishedWorkClassificationMayBackfill2001Identity).toBe(false);
    expect(r.secondaryCatalogMayResolvePublicationIdentity).toBe(false);
    expect(r.publicationMediumOrEntityGapResolved).toBe(false);
  });

  it('keeps representation variance non-authoritative and canonical normalization unresolved', () => {
    const r = buildI198QuWei2001ThreeGapDiscoveryEvidenceAdequacyPathReassessmentReview(validI197());
    expect(r.pageCountFileSizeFilenameVarianceMayResolveNormalization).toBe(false);
    expect(r.canonicalWitnessNormalizationGapResolved).toBe(false);
    expect(r.directCrossRepresentationNormalizationStillReviewable).toBe(true);
  });

  it('preserves the direct doctrinal antecedent without promoting exact passage identity', () => {
    const r = buildI198QuWei2001ThreeGapDiscoveryEvidenceAdequacyPathReassessmentReview(validI197());
    expect(r.directDoctrinalAntecedentEvidencePreserved).toBe(true);
    expect(r.doctrineLevelAntecedentEqualsExactTargetPassageIdentity).toBe(false);
    expect(r.doctrineLevelSimilarityMayResolveExactPassageBinding).toBe(false);
    expect(r.exactTargetPassageBindingGapResolved).toBe(false);
    expect(r.directAlternate2001TargetPassageComparisonStillReviewable).toBe(true);
  });

  it('does not convert zero qualifying gain into negative evidence or exhaustion and blocks equivalent repetition as progress', () => {
    const r = buildI198QuWei2001ThreeGapDiscoveryEvidenceAdequacyPathReassessmentReview(validI197());
    expect(r.searchSilenceCreatesNegativeFinding).toBe(false);
    expect(r.channelAccessFailureCreatesNegativeFinding).toBe(false);
    expect(r.failureToLocateExactPhraseCreatesNegativeFinding).toBe(false);
    expect(r.targetedDiscoveryExhaustionEstablished).toBe(false);
    expect(r.corpusExhaustionEstablished).toBe(false);
    expect(r.universalNoFurtherEvidenceClaimEstablished).toBe(false);
    expect(r.identicalNineChannelSurfaceRepeatCountsAsRemediationProgress).toBe(false);
    expect(r.immediateEquivalentNineChannelRepeatJustified).toBe(false);
    expect(r.materiallyNewDirectLeadOrEvidenceClassRequiredBeforeEquivalentRepeat).toBe(true);
  });

  it('routes only genuinely new direct evidence classes to a later acquisition-readiness gate', () => {
    const r = buildI198QuWei2001ThreeGapDiscoveryEvidenceAdequacyPathReassessmentReview(validI197());
    expect(r.reviewablePathIds).toEqual(I198_REVIEWABLE_PATH_IDS);
    expect(r.reviewablePathCount).toBe(4);
    expect(r.direct2001TitleColophonIssuerBindingStillReviewable).toBe(true);
    expect(r.explicit2001PrimaryBibliographicBindingStillReviewable).toBe(true);
    expect(r.directCrossRepresentationNormalizationStillReviewable).toBe(true);
    expect(r.directAlternate2001TargetPassageComparisonStillReviewable).toBe(true);
    expect(r.reviewablePathSelectedByThisGate).toBe(false);
    expect(r.materiallyNewDirectEvidenceAcquisitionReadinessReviewMethodologicallyJustified).toBe(true);
    expect(r.materiallyNewDirectEvidenceAcquisitionReadinessReviewAuthorized).toBe(true);
    expect(r.acquisitionExecutedByThisGate).toBe(false);
    expect(r.qualifyingEvidenceAcquiredByThisGate).toBe(false);
  });

  it('keeps rebinding, provenance independence, frozen v2 and production authority fail-closed', () => {
    const r = buildI198QuWei2001ThreeGapDiscoveryEvidenceAdequacyPathReassessmentReview(validI197());
    expect(r.evidenceRebindingMethodologicallyReady).toBe(false);
    expect(r.evidenceRebindingAuthorizedByThisGate).toBe(false);
    expect(r.evidenceRebindingExecutedByThisGate).toBe(false);
    expect(r.sameAuthor2001To2003DoctrinalDependencyPreserved).toBe(true);
    expect(r.externalTargetLineageUnresolvedQuestionCount).toBe(3);
    expect(r.provenanceIndependenceAdjudicatedByThisGate).toBe(false);
    expect(r.independentNormativeProvenanceEstablishedCount).toBe(0);
    expect(r.I132IndependentNormativeProvenanceRequirementRemainsNormative).toBe(true);
    expect(r.I132PolicyRelaxationAuthorizedByThisGate).toBe(false);
    expect(r.currentV2PackageAndCandidateSetRemainImmutable).toBe(true);
    expect(r.currentV2ProvenanceDisposition).toBe('BLOCKED_UNDER_CURRENT_EVIDENCE');
    expect(r.candidateSetMutatedByThisGate).toBe(false);
    expect(r.candidateSetReevaluationAuthorizedByThisGate).toBe(false);
    expect(r.actualCompositionPerformedByThisGate).toBe(false);
    expect(r.thresholdRuleCreatedByThisGate).toBe(false);
    expect(r.classificationAuthorized).toBe(false);
    expect(r.numericScoringAuthorized).toBe(false);
    expect(r.hiddenStemAuthorityGap).toBe('SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED');
  });

  it('fails closed if an I197 unresolved gap is mutated into a resolved result', () => {
    const mutated = { ...validI197(), publicationGapResolved: true } as unknown as I197QuWei2001ThreeGapTargetedDiscoveryEvidenceReport;
    const r = buildI198QuWei2001ThreeGapDiscoveryEvidenceAdequacyPathReassessmentReview(mutated);
    expect(r.status).toBe('I197_THREE_GAP_DISCOVERY_EVIDENCE_BOUNDARY_INVALID');
    expect(r.decision).toBe('QU_WEI_2001_THREE_GAP_EVIDENCE_ADEQUACY_PATH_REASSESSMENT_NOT_READY');
    expect(r.exactI197BoundaryAccepted).toBe(false);
    expect(r.assessedGapCount).toBe(0);
    expect(r.unresolvedFindingCount).toBe(0);
    expect(r.evidenceAdequateForRecordedUnresolvedFindings).toBe(false);
    expect(r.reviewablePathIds).toEqual([]);
    expect(r.reviewablePathCount).toBe(0);
    expect(r.materiallyNewDirectEvidenceAcquisitionReadinessReviewAuthorized).toBe(false);
  });
});
