import { describe, expect, it } from 'vitest';
import {
  I202_ACQUISITION_CONTROL_IDS,
  I202_ACQUISITION_PATH_IDS,
  I202_EVIDENCE_OBLIGATION_IDS,
  type I202QuWei2001HigherProvenanceSubstrateAcquisitionReadinessReviewReport,
} from '../src/research/i202-qu-wei-2001-higher-provenance-substrate-acquisition-readiness-review.js';
import {
  I203_RESOLVED_GAP_IDS,
  I203_UNRESOLVED_GAP_IDS,
  buildI203QuWei2001HigherProvenanceSubstrateAcquisitionEvidence,
} from '../src/research/i203-qu-wei-2001-higher-provenance-substrate-acquisition-evidence.js';

function validI202(): I202QuWei2001HigherProvenanceSubstrateAcquisitionReadinessReviewReport {
  return {
    reviewId: 'i202_fixture',
    status: 'RESOLVED_QU_WEI_2001_HIGHER_PROVENANCE_SUBSTRATE_ACQUISITION_READINESS_REVIEW',
    decision:
      'I201_BOUNDARY_SUPPORTS_QU_WEI_2001_HIGHER_PROVENANCE_SUBSTRATE_ACQUISITION_FOUR_PATHS_EIGHT_OBLIGATIONS_EIGHTEEN_CONTROLS_FROZEN_EVIDENCE_COLLECTION_ONLY_INACCESSIBILITY_NON_NEGATIVE_NO_REBINDING_NO_INDEPENDENCE',
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI201BoundaryAccepted: true,
    targetPriorWitnessId: 'QU_WEI_SIZHU_XIANGZHEN_2001',
    targetAuthor: '曲炜',
    targetTitle: '《四柱详真》',
    targetAppearanceYear: 2001,
    unresolvedGapCountAtEntry: 3,
    publicationIdentityGapOpenAtEntry: true,
    canonicalWitnessNormalizationGapOpenAtEntry: true,
    exactTargetPassageBindingGapOpenAtEntry: true,
    acquisitionPathIds: I202_ACQUISITION_PATH_IDS,
    acquisitionPathCount: 4,
    acquisitionPathsFrozenProspectively: true,
    evidenceObligationIds: I202_EVIDENCE_OBLIGATION_IDS,
    evidenceObligationCount: 8,
    evidenceObligationsFrozenProspectively: true,
    acquisitionControlIds: I202_ACQUISITION_CONTROL_IDS,
    acquisitionControlCount: 18,
    acquisitionControlsFrozenProspectively: true,
    physicalOrFirstGenerationWitnessRequiresReproducibleIdentity: true,
    physicalOrFirstGenerationWitnessRequiresProvenanceContext: true,
    directWitnessTitleCopyrightImprintColophonCaptureRequired: true,
    firstPartyOrArchiveRecordRequiresExplicitAuthorTitle2001Binding: true,
    laterMetadataMayBackfill2001IssuanceIdentity: false,
    secondaryCatalogMayBackfill2001IssuanceIdentity: false,
    byteStableRepresentationHashesOrEquivalentIdsRequired: true,
    scanLineageOrTransformationProvenanceRequiredWhereAvailable: true,
    directStructureComparisonRequiredForNormalization: true,
    pageCountFileSizeFilenameHostVarianceAloneMayResolveNormalization: false,
    targetFacsimileRequiresCanonical2001Binding: true,
    targetFacsimileRequiresContextAnchor: true,
    direct2001To2003SequenceComparisonRequired: true,
    doctrineLevelAntecedentAloneMayResolveExactPassageBinding: false,
    evidenceForOneGapMayBackfillAnotherGap: false,
    higherProvenanceSubstrateAcquisitionMayProceed: true,
    authorizationIsEvidenceCollectionOnly: true,
    acquisitionExecutedByThisGate: false,
    evidenceAcquiredByThisGate: false,
    inaccessibleSubstrateCreatesNegativeFinding: false,
    unavailableCustodianCreatesNegativeFinding: false,
    nonAcquisitionCreatesNegativeFinding: false,
    accessFailureCreatesNegativeFinding: false,
    onlineCorpusExhaustionEstablished: false,
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
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_QU_WEI_2001_HIGHER_PROVENANCE_SUBSTRATE_ACQUISITION_EVIDENCE',
  } as unknown as I202QuWei2001HigherProvenanceSubstrateAcquisitionReadinessReviewReport;
}

describe('I203 Qu Wei 2001 higher-provenance substrate acquisition evidence', () => {
  it('executes all four frozen I202 paths and resolves exactly one of the three gaps', () => {
    const r = buildI203QuWei2001HigherProvenanceSubstrateAcquisitionEvidence(validI202());
    expect(r.status).toBe('RESOLVED_QU_WEI_2001_HIGHER_PROVENANCE_SUBSTRATE_ACQUISITION_EVIDENCE');
    expect(r.exactI202BoundaryAccepted).toBe(true);
    expect(r.acquisitionPathCountExecuted).toBe(4);
    expect(r.allFourFrozenAcquisitionPathsExecuted).toBe(true);
    expect(r.acquisitionPathEvidenceRecordCount).toBe(4);
    expect(r.higherProvenanceEvidencePathCount).toBe(1);
    expect(r.qualifyingGapResolutionEvidenceCount).toBe(1);
    expect(r.resolvedGapCount).toBe(1);
    expect(r.unresolvedGapCount).toBe(2);
    expect(r.explicitNegativeFindingCount).toBe(0);
  });

  it('uses the author-branded first-party 2001 chronology to establish nonformal book-medium publication identity', () => {
    const r = buildI203QuWei2001HigherProvenanceSubstrateAcquisitionEvidence(validI202());
    expect(r.authorBrandedFirstPartyIssuanceRecordAcquired).toBe(true);
    expect(r.firstPartyIssuanceRecordSourceLocator).toBe('https://www.zhouyiqw.com/qwjj.php');
    expect(r.firstPartyRecordExplicitlyBindsAuthorIdentity).toBe(true);
    expect(r.firstPartyRecordExplicitlyBindsTitle).toBe(true);
    expect(r.firstPartyRecordExplicitlyBinds2001).toBe(true);
    expect(r.firstPartyRecordIdentifiesBookMedium).toBe(true);
    expect(r.firstPartyRecordEstablishesMadeAvailableStatus).toBe(true);
    expect(r.explicit2001NonformalPublicationStatusEstablished).toBe(true);
    expect(r.publicationMediumIdentityEstablished).toBe(true);
    expect(r.publicationMediumOrEntityIdentityEstablished).toBe(true);
    expect(r.publicationIdentityGapResolved).toBe(true);
    expect(r.resolvedGapIds).toEqual(I203_RESOLVED_GAP_IDS);
  });

  it('does not invent a formal publisher, ISBN, or publishing entity from the first-party chronology', () => {
    const r = buildI203QuWei2001HigherProvenanceSubstrateAcquisitionEvidence(validI202());
    expect(r.publicationEntityIdentityEstablished).toBe(false);
    expect(r.formal2001PublisherEstablished).toBe(false);
    expect(r.formal2001IsbnEstablished).toBe(false);
    expect(r.secondaryAggregatorPublisherLabelUsedAsAuthority).toBe(false);
    expect(r.secondaryAggregatorIsbnUsedAsAuthority).toBe(false);
  });

  it('keeps inaccessible physical or first-generation witness acquisition unresolved and non-negative', () => {
    const r = buildI203QuWei2001HigherProvenanceSubstrateAcquisitionEvidence(validI202());
    expect(r.physicalOrFirstGenerationWitnessAcquired).toBe(false);
    expect(r.physicalWitnessTitleCopyrightImprintOrColophonCaptured).toBe(false);
    expect(r.physicalWitnessChainOfCustodyEstablished).toBe(false);
    expect(r.failureToAcquirePhysicalWitnessCreatesNegativeFinding).toBe(false);
    expect(r.inaccessibleSubstrateCreatesNegativeFinding).toBe(false);
    expect(r.unavailableCustodianCreatesNegativeFinding).toBe(false);
  });

  it('keeps canonical witness normalization unresolved without byte-stable identity and scan lineage', () => {
    const r = buildI203QuWei2001HigherProvenanceSubstrateAcquisitionEvidence(validI202());
    expect(r.byteStableDirectFilePairAcquired).toBe(false);
    expect(r.stableCrossRepresentationHashFamilyAcquired).toBe(false);
    expect(r.scanLineageOrTransformationProvenanceAcquired).toBe(false);
    expect(r.directCrossRepresentationStructureNormalizationCompleted).toBe(false);
    expect(r.pageCountFileSizeFilenameHostVarianceCreatesCanonicalIdentity).toBe(false);
    expect(r.canonicalWitnessNormalizationGapResolved).toBe(false);
    expect(r.failureToAcquireByteStablePairCreatesNegativeFinding).toBe(false);
  });

  it('keeps exact target-passage binding unresolved while preserving the doctrine-level antecedent', () => {
    const r = buildI203QuWei2001HigherProvenanceSubstrateAcquisitionEvidence(validI202());
    expect(r.canonicallyBound2001TargetSectionFacsimileAcquired).toBe(false);
    expect(r.direct2001TargetSectionContextAnchorAcquiredByThisGate).toBe(false);
    expect(r.direct2001To2003TargetSequenceComparisonCompletedByThisGate).toBe(false);
    expect(r.exact2003RouteSequenceBoundIntoCanonical2001Witness).toBe(false);
    expect(r.nearVerbatim2003RouteSequenceBoundIntoCanonical2001Witness).toBe(false);
    expect(r.directDoctrinalAntecedentPreserved).toBe(true);
    expect(r.doctrineLevelAntecedentMayResolveExactPassageGap).toBe(false);
    expect(r.exactTargetPassageBindingGapResolved).toBe(false);
    expect(r.failureToAcquireCanonicalFacsimileCreatesNegativeFinding).toBe(false);
    expect(r.unresolvedGapIds).toEqual(I203_UNRESOLVED_GAP_IDS);
  });

  it('keeps rebinding, independence, I132, frozen v2, and production authority fail-closed', () => {
    const r = buildI203QuWei2001HigherProvenanceSubstrateAcquisitionEvidence(validI202());
    expect(r.allOriginalThreeGapRequirementsMustBeSatisfiedBeforeRebinding).toBe(true);
    expect(r.twoGapsRemainBlockingRebinding).toBe(true);
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

  it('fails closed if I202 is mutated to let a secondary catalog backfill 2001 issuance identity', () => {
    const mutated = {
      ...validI202(),
      secondaryCatalogMayBackfill2001IssuanceIdentity: true,
    } as unknown as I202QuWei2001HigherProvenanceSubstrateAcquisitionReadinessReviewReport;
    const r = buildI203QuWei2001HigherProvenanceSubstrateAcquisitionEvidence(mutated);
    expect(r.status).toBe('I202_HIGHER_PROVENANCE_ACQUISITION_READINESS_BOUNDARY_INVALID');
    expect(r.decision).toBe('QU_WEI_2001_HIGHER_PROVENANCE_SUBSTRATE_ACQUISITION_EVIDENCE_NOT_EXECUTED');
    expect(r.exactI202BoundaryAccepted).toBe(false);
    expect(r.acquisitionPathCountExecuted).toBe(0);
    expect(r.acquisitionPathEvidenceRecords).toEqual([]);
    expect(r.resolvedGapCount).toBe(0);
    expect(r.unresolvedGapCount).toBe(0);
    expect(r.publicationIdentityGapResolved).toBe(false);
    expect(r.currentV2ProvenanceDisposition).toBe('NOT_ASSESSED');
  });
});
