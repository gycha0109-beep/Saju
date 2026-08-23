import { describe, expect, it } from 'vitest';
import {
  I199_ACQUISITION_CONTROL_IDS,
  I199_ACQUISITION_PATH_IDS,
  I199_EVIDENCE_FUNCTION_IDS,
  type I199QuWei2001GenuinelyNewDirectEvidenceAcquisitionReadinessReviewReport,
} from '../src/research/i199-qu-wei-2001-genuinely-new-direct-evidence-acquisition-readiness-review.js';
import { buildI200QuWei2001GenuinelyNewDirectEvidenceAcquisitionEvidence } from '../src/research/i200-qu-wei-2001-genuinely-new-direct-evidence-acquisition-evidence.js';

function validI199(): I199QuWei2001GenuinelyNewDirectEvidenceAcquisitionReadinessReviewReport {
  return {
    reviewId: 'i199_fixture',
    status: 'RESOLVED_QU_WEI_2001_GENUINELY_NEW_DIRECT_EVIDENCE_ACQUISITION_READINESS_REVIEW',
    decision: 'I198_BOUNDARY_SUPPORTS_QU_WEI_2001_GENUINELY_NEW_DIRECT_EVIDENCE_ACQUISITION_FOUR_PATHS_SIX_FUNCTIONS_SIXTEEN_CONTROLS_FROZEN_EVIDENCE_COLLECTION_ONLY_NO_REBINDING_NO_INDEPENDENCE',
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI198BoundaryAccepted: true,
    targetPriorWitnessId: 'QU_WEI_SIZHU_XIANGZHEN_2001',
    targetAuthor: '曲炜',
    targetTitle: '《四柱详真》',
    targetAppearanceYear: 2001,
    unresolvedGapCountAtEntry: 3,
    publicationIdentityGapOpenAtEntry: true,
    canonicalWitnessNormalizationGapOpenAtEntry: true,
    exactTargetPassageBindingGapOpenAtEntry: true,
    directDoctrinalAntecedentMustBePreserved: true,
    printProductionContextMayBeUsedAsHistoricalContextOnly: true,
    publicationPathRequires2001SpecificBinding: true,
    primaryBibliographicPathRequiresExplicit2001Binding: true,
    laterMetadataMayBackfill2001PublicationIdentity: false,
    secondaryCatalogMayResolve2001PublicationIdentity: false,
    normalizationPathRequiresStableComparisonEvidence: true,
    normalizationPathAllowsHashEvidence: true,
    normalizationPathAllowsTransformationProvenance: true,
    normalizationPathRequiresStructureAnchorsWhereAvailable: true,
    representationVarianceAloneMayResolveNormalization: false,
    targetPassagePathRequiresDirect2001Witness: true,
    targetPassagePathRequiresContextAnchorWhereObservable: true,
    targetPassage2001To2003SequenceComparisonRequired: true,
    doctrineLevelAntecedentAloneMayResolveExactPassageBinding: false,
    gapCrossBackfillAllowed: false,
    acquisitionPathIds: I199_ACQUISITION_PATH_IDS,
    acquisitionPathCount: 4,
    acquisitionPathsFrozenProspectively: true,
    evidenceFunctionIds: I199_EVIDENCE_FUNCTION_IDS,
    evidenceFunctionCount: 6,
    acquisitionControlIds: I199_ACQUISITION_CONTROL_IDS,
    acquisitionControlCount: 16,
    acquisitionControlsFrozenProspectively: true,
    genuinelyNewDirectEvidenceAcquisitionMayProceed: true,
    authorizationIsEvidenceCollectionOnly: true,
    identicalNineChannelSurfaceRepeatAuthorizedByThisGate: false,
    acquisitionExecutedByThisGate: false,
    evidenceAcquiredByThisGate: false,
    gapResolvedByThisGateCount: 0,
    explicitNegativeFindingCountCreatedByThisGate: 0,
    searchSilenceCreatesNegativeFinding: false,
    accessFailureCreatesNegativeFinding: false,
    nonAcquisitionCreatesNegativeFinding: false,
    targetedDiscoveryExhaustionEstablished: false,
    corpusExhaustionEstablished: false,
    allThreeGapsRequiredBeforeRebindingReadiness: true,
    evidenceRebindingMethodologicallyReady: false,
    evidenceRebindingAuthorizedByThisGate: false,
    evidenceRebindingExecutedByThisGate: false,
    sameAuthor2001To2003DoctrinalDependencyPreserved: true,
    externalTargetLineageUnresolvedQuestionCount: 3,
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
    candidateSelectedByThisGate: false,
    candidateRegistrationAuthorizedByThisGate: false,
    candidateSetMutatedByThisGate: false,
    candidateSetReevaluationAuthorizedByThisGate: false,
    candidateSetAdmissibilityEstablishedByThisGate: false,
    newCandidateSetVersionCreatedByThisGate: false,
    newInputPackageVersionCreatedByThisGate: false,
    currentV2PackageAndCandidateSetRemainImmutable: true,
    currentV2ProvenanceDisposition: 'BLOCKED_UNDER_CURRENT_EVIDENCE',
    liSameTargetPathSuspendedNotRetired: true,
    liSameTargetMayReopenOnMateriallyNewDirectLead: true,
    liPublicationMediumOrEntityGapStillOpen: true,
    liCanonicalDigitalWitnessNormalizationGapStillOpen: true,
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
    recommendedNextGate: 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_QU_WEI_2001_GENUINELY_NEW_DIRECT_EVIDENCE_ACQUISITION_EVIDENCE',
  } as unknown as I199QuWei2001GenuinelyNewDirectEvidenceAcquisitionReadinessReviewReport;
}

describe('I200 Qu Wei 2001 genuinely-new direct evidence acquisition evidence', () => {
  it('executes all four frozen I199 paths and records zero resolved gaps', () => {
    const r = buildI200QuWei2001GenuinelyNewDirectEvidenceAcquisitionEvidence(validI199());
    expect(r.status).toBe('RESOLVED_QU_WEI_2001_GENUINELY_NEW_DIRECT_EVIDENCE_ACQUISITION_EVIDENCE');
    expect(r.exactI199BoundaryAccepted).toBe(true);
    expect(r.acquisitionPathCountExecuted).toBe(4);
    expect(r.allFourFrozenAcquisitionPathsExecuted).toBe(true);
    expect(r.acquisitionPathEvidenceRecordCount).toBe(4);
    expect(r.resolvedGapCount).toBe(0);
    expect(r.unresolvedGapCount).toBe(3);
    expect(r.explicitNegativeFindingCount).toBe(0);
  });

  it('does not manufacture a 2001 publication or primary bibliographic binding', () => {
    const r = buildI200QuWei2001GenuinelyNewDirectEvidenceAcquisitionEvidence(validI199());
    expect(r.publicationIdentityDirectBindingFinding).toBe('UNRESOLVED_AFTER_BOUNDED_NEW_DIRECT_ACQUISITION');
    expect(r.direct2001TitleCopyrightImprintColophonOrIssuerBindingAcquired).toBe(false);
    expect(r.explicit2001PrimaryBibliographicRecordAcquired).toBe(false);
    expect(r.formal2001PublisherEstablished).toBe(false);
    expect(r.formal2001IsbnEstablished).toBe(false);
    expect(r.explicit2001IssuingEntityEstablished).toBe(false);
    expect(r.publicationIdentityGapResolved).toBe(false);
  });

  it('records genuinely new representation context without normalizing a canonical witness', () => {
    const r = buildI200QuWei2001GenuinelyNewDirectEvidenceAcquisitionEvidence(validI199());
    expect(r.newRepresentationContextFinding).toBe('CONTEXTUAL_NEW_EVIDENCE_ACQUIRED_GAP_UNRESOLVED');
    expect(r.additionalRepresentationMetadataObserved).toBe(true);
    expect(r.additionalRepresentationDescriptors).toHaveLength(5);
    expect(r.sellerCatalog274PageRepresentationObserved).toBe(true);
    expect(r.sellerCatalog334PageRepresentationObserved).toBe(true);
    expect(r.doublePage140RepresentationWith41MbDescriptorObserved).toBe(true);
    expect(r.librarySite1779MbDescriptorObserved).toBe(true);
    expect(r.laterAuthorQAndAReferencesInternalPages184And204).toBe(true);
    expect(r.stableCrossRepresentationHashFamilyAcquired).toBe(false);
    expect(r.scanTransformationProvenanceAcquired).toBe(false);
    expect(r.canonicalWitnessNormalizationGapResolved).toBe(false);
  });

  it('records a new title-bearing target-section representation but does not year-bind or promote it to exact passage identity', () => {
    const r = buildI200QuWei2001GenuinelyNewDirectEvidenceAcquisitionEvidence(validI199());
    expect(r.alternateTargetSectionContextFinding).toBe('CONTEXTUAL_NEW_EVIDENCE_ACQUIRED_GAP_UNRESOLVED');
    expect(r.alternateTitleBearingWitnessRepresentationAcquired).toBe(true);
    expect(r.alternateRepresentationProvidesTightVsSeparatedForceDoctrine).toBe(true);
    expect(r.alternateRepresentationProvidesSeparatedClashImageWithoutForceDoctrine).toBe(true);
    expect(r.alternateRepresentationCanonicallyBoundToOriginal2001Edition).toBe(false);
    expect(r.alternateRepresentationDirectlyYearBoundTo2001).toBe(false);
    expect(r.exact2003RouteSequenceLocatedInNewRepresentation).toBe(false);
    expect(r.nearVerbatim2003RouteSequenceLocatedInNewRepresentation).toBe(false);
    expect(r.directDoctrinalAntecedentPreserved).toBe(true);
    expect(r.exactTargetPassageBindingGapResolved).toBe(false);
  });

  it('keeps contextual gains separate from qualifying gap-resolution evidence', () => {
    const r = buildI200QuWei2001GenuinelyNewDirectEvidenceAcquisitionEvidence(validI199());
    expect(r.contextualNewEvidencePathCount).toBe(2);
    expect(r.qualifyingGapResolutionEvidenceCount).toBe(0);
    expect(r.acquisitionPathEvidenceRecords.filter((x) => x.contextualNewEvidenceAcquired)).toHaveLength(2);
    expect(r.acquisitionPathEvidenceRecords.every((x) => x.qualifyingGapResolutionEvidenceAcquired === false)).toBe(true);
    expect(r.evidenceForOneGapMayBackfillAnotherGap).toBe(false);
  });

  it('does not turn non-acquisition or exact-phrase failure into negative evidence or exhaustion', () => {
    const r = buildI200QuWei2001GenuinelyNewDirectEvidenceAcquisitionEvidence(validI199());
    expect(r.searchSilenceCreatesNegativeFinding).toBe(false);
    expect(r.accessFailureCreatesNegativeFinding).toBe(false);
    expect(r.nonAcquisitionCreatesNegativeFinding).toBe(false);
    expect(r.failureToAcquirePrimaryBibliographicRecordCreatesNegativeFinding).toBe(false);
    expect(r.failureToLocateExactPhraseCreatesNegativeFinding).toBe(false);
    expect(r.targetedDiscoveryExhaustionEstablished).toBe(false);
    expect(r.onlineCorpusExhaustionEstablished).toBe(false);
    expect(r.corpusExhaustionEstablished).toBe(false);
    expect(r.priorNineChannelSurfaceRepeatedAsProgress).toBe(false);
  });

  it('keeps rebinding, independence, frozen v2 and production authority fail-closed', () => {
    const r = buildI200QuWei2001GenuinelyNewDirectEvidenceAcquisitionEvidence(validI199());
    expect(r.allThreeGapsRequiredBeforeRebindingReadiness).toBe(true);
    expect(r.evidenceRebindingMethodologicallyReadyByThisGate).toBe(false);
    expect(r.evidenceRebindingAuthorizedByThisGate).toBe(false);
    expect(r.evidenceRebindingExecutedByThisGate).toBe(false);
    expect(r.sameAuthor2001To2003DoctrinalDependencyPreserved).toBe(true);
    expect(r.externalTargetLineageUnresolvedQuestionCountPreserved).toBe(3);
    expect(r.provenanceIndependenceAdjudicatedByThisGate).toBe(false);
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
  });

  it('fails closed when I199 is mutated to allow the prior nine-channel surface', () => {
    const mutated = { ...validI199(), identicalNineChannelSurfaceRepeatAuthorizedByThisGate: true } as unknown as I199QuWei2001GenuinelyNewDirectEvidenceAcquisitionReadinessReviewReport;
    const r = buildI200QuWei2001GenuinelyNewDirectEvidenceAcquisitionEvidence(mutated);
    expect(r.status).toBe('I199_NEW_DIRECT_EVIDENCE_ACQUISITION_READINESS_BOUNDARY_INVALID');
    expect(r.decision).toBe('QU_WEI_2001_GENUINELY_NEW_DIRECT_EVIDENCE_ACQUISITION_EVIDENCE_NOT_EXECUTED');
    expect(r.exactI199BoundaryAccepted).toBe(false);
    expect(r.acquisitionPathCountExecuted).toBe(0);
    expect(r.acquisitionPathEvidenceRecords).toEqual([]);
    expect(r.unresolvedGapCount).toBe(0);
    expect(r.contextualNewEvidencePathCount).toBe(0);
    expect(r.currentV2ProvenanceDisposition).toBe('NOT_ASSESSED');
  });
});
