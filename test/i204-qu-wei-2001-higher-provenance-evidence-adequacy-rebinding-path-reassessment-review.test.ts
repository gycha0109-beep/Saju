import { describe, expect, it } from 'vitest';
import {
  I203_RESOLVED_GAP_IDS,
  I203_UNRESOLVED_GAP_IDS,
  type I203QuWei2001HigherProvenanceSubstrateAcquisitionEvidenceReport,
} from '../src/research/i203-qu-wei-2001-higher-provenance-substrate-acquisition-evidence.js';
import {
  I204_REASSESSMENT_CONTROL_IDS,
  I204_REMAINING_REMEDIATION_PATH_IDS,
  buildI204QuWei2001HigherProvenanceEvidenceAdequacyRebindingPathReassessmentReview,
} from '../src/research/i204-qu-wei-2001-higher-provenance-evidence-adequacy-rebinding-path-reassessment-review.js';

function validI203(): I203QuWei2001HigherProvenanceSubstrateAcquisitionEvidenceReport {
  return {
    evidenceRecordSetId: 'i203_fixture',
    status: 'RESOLVED_QU_WEI_2001_HIGHER_PROVENANCE_SUBSTRATE_ACQUISITION_EVIDENCE',
    decision:
      'QU_WEI_2001_HIGHER_PROVENANCE_ACQUISITION_EXECUTED_FOUR_PATHS_FIRST_PARTY_2001_BOOK_MEDIUM_BINDING_RESOLVES_PUBLICATION_GAP_TWO_GAPS_REMAIN_NO_CANONICAL_NORMALIZATION_NO_EXACT_PASSAGE_BINDING_NO_NEGATIVE_FINDING_NO_REBINDING_NO_INDEPENDENCE',
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI202BoundaryAccepted: true,
    targetPriorWitnessId: 'QU_WEI_SIZHU_XIANGZHEN_2001',
    acquisitionPathCountExecuted: 4,
    allFourFrozenAcquisitionPathsExecuted: true,
    acquisitionPathEvidenceRecordCount: 4,
    evidenceObligationCountAccepted: 8,
    acquisitionControlCountAccepted: 18,
    higherProvenanceEvidencePathCount: 1,
    qualifyingGapResolutionEvidenceCount: 1,
    resolvedGapIds: I203_RESOLVED_GAP_IDS,
    unresolvedGapIds: I203_UNRESOLVED_GAP_IDS,
    resolvedGapCount: 1,
    unresolvedGapCount: 2,
    explicitNegativeFindingCount: 0,
    physicalOrFirstGenerationWitnessAcquired: false,
    physicalWitnessTitleCopyrightImprintOrColophonCaptured: false,
    physicalWitnessChainOfCustodyEstablished: false,
    authorBrandedFirstPartyIssuanceRecordAcquired: true,
    firstPartyIssuanceRecordSourceLocator: 'https://www.zhouyiqw.com/qwjj.php',
    firstPartyRecordExplicitlyBindsAuthorIdentity: true,
    firstPartyRecordExplicitlyBindsTitle: true,
    firstPartyRecordExplicitlyBinds2001: true,
    firstPartyRecordIdentifiesBookMedium: true,
    firstPartyRecordEstablishesMadeAvailableStatus: true,
    explicit2001NonformalPublicationStatusEstablished: true,
    publicationMediumIdentityEstablished: true,
    publicationEntityIdentityEstablished: false,
    formal2001PublisherEstablished: false,
    formal2001IsbnEstablished: false,
    secondaryAggregatorPublisherLabelUsedAsAuthority: false,
    secondaryAggregatorIsbnUsedAsAuthority: false,
    publicationMediumOrEntityIdentityEstablished: true,
    publicationIdentityGapResolved: true,
    byteStableDirectFilePairAcquired: false,
    stableCrossRepresentationHashFamilyAcquired: false,
    scanLineageOrTransformationProvenanceAcquired: false,
    directCrossRepresentationStructureNormalizationCompleted: false,
    pageCountFileSizeFilenameHostVarianceCreatesCanonicalIdentity: false,
    canonicalWitnessNormalizationGapResolved: false,
    canonicallyBound2001TargetSectionFacsimileAcquired: false,
    direct2001TargetSectionContextAnchorAcquiredByThisGate: false,
    direct2001To2003TargetSequenceComparisonCompletedByThisGate: false,
    exact2003RouteSequenceBoundIntoCanonical2001Witness: false,
    nearVerbatim2003RouteSequenceBoundIntoCanonical2001Witness: false,
    directDoctrinalAntecedentPreserved: true,
    doctrineLevelAntecedentMayResolveExactPassageGap: false,
    exactTargetPassageBindingGapResolved: false,
    evidenceForOneGapMayBackfillAnotherGap: false,
    inaccessibleSubstrateCreatesNegativeFinding: false,
    unavailableCustodianCreatesNegativeFinding: false,
    nonAcquisitionCreatesNegativeFinding: false,
    accessFailureCreatesNegativeFinding: false,
    failureToAcquirePhysicalWitnessCreatesNegativeFinding: false,
    failureToAcquireByteStablePairCreatesNegativeFinding: false,
    failureToAcquireCanonicalFacsimileCreatesNegativeFinding: false,
    onlineCorpusExhaustionEstablished: false,
    corpusExhaustionEstablished: false,
    allOriginalThreeGapRequirementsMustBeSatisfiedBeforeRebinding: true,
    twoGapsRemainBlockingRebinding: true,
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
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_QU_WEI_2001_HIGHER_PROVENANCE_SUBSTRATE_ACQUISITION_EVIDENCE_ADEQUACY_REBINDING_PATH_REASSESSMENT_REVIEW',
  } as unknown as I203QuWei2001HigherProvenanceSubstrateAcquisitionEvidenceReport;
}

describe('I204 Qu Wei 2001 higher-provenance evidence adequacy and rebinding path reassessment', () => {
  it('accepts the exact I203 one-resolved two-unresolved boundary', () => {
    const r = buildI204QuWei2001HigherProvenanceEvidenceAdequacyRebindingPathReassessmentReview(validI203());
    expect(r.status).toBe('RESOLVED_QU_WEI_2001_HIGHER_PROVENANCE_EVIDENCE_ADEQUACY_REBINDING_PATH_REASSESSMENT_REVIEW');
    expect(r.exactI203BoundaryAccepted).toBe(true);
    expect(r.i203EvidenceAdequateForReassessment).toBe(true);
    expect(r.assessedOriginalGapCount).toBe(3);
    expect(r.resolvedOriginalGapCount).toBe(1);
    expect(r.remainingGapCount).toBe(2);
    expect(r.resolvedGapIdsAccepted).toEqual(I203_RESOLVED_GAP_IDS);
    expect(r.remainingGapIdsAccepted).toEqual(I203_UNRESOLVED_GAP_IDS);
  });

  it('preserves the first-party 2001 book-medium resolution without inventing publisher or ISBN', () => {
    const r = buildI204QuWei2001HigherProvenanceEvidenceAdequacyRebindingPathReassessmentReview(validI203());
    expect(r.firstParty2001BookMediumBindingAccepted).toBe(true);
    expect(r.explicit2001NonformalPublicationStatusAccepted).toBe(true);
    expect(r.publicationMediumIdentityAccepted).toBe(true);
    expect(r.publicationIdentityGapResolved).toBe(true);
    expect(r.publicationEntityIdentityRequiredAfterMediumResolution).toBe(false);
    expect(r.formal2001PublisherEstablished).toBe(false);
    expect(r.formal2001IsbnEstablished).toBe(false);
    expect(r.secondaryAggregatorMetadataAcceptedAsAuthority).toBe(false);
    expect(r.publicationGapReopenedByThisGate).toBe(false);
  });

  it('does not let the resolved publication gap backfill either remaining gap', () => {
    const r = buildI204QuWei2001HigherProvenanceEvidenceAdequacyRebindingPathReassessmentReview(validI203());
    expect(r.canonicalWitnessNormalizationGapResolved).toBe(false);
    expect(r.exactTargetPassageBindingGapResolved).toBe(false);
    expect(r.publicationResolutionMayBackfillNormalization).toBe(false);
    expect(r.publicationResolutionMayBackfillExactPassage).toBe(false);
    expect(r.directDoctrinalAntecedentPreserved).toBe(true);
    expect(r.doctrineLevelAntecedentEqualsExactOrNearVerbatimBinding).toBe(false);
  });

  it('freezes exactly two remaining remediation paths', () => {
    const r = buildI204QuWei2001HigherProvenanceEvidenceAdequacyRebindingPathReassessmentReview(validI203());
    expect(r.remainingRemediationPathIds).toEqual(I204_REMAINING_REMEDIATION_PATH_IDS);
    expect(r.remainingRemediationPathCount).toBe(2);
    expect(r.remainingRemediationPathsFrozenProspectively).toBe(true);
    expect(r.byteStableNormalizationPathStillReviewable).toBe(true);
    expect(r.canonicalTargetFacsimileSequencePathStillReviewable).toBe(true);
    expect(r.remainingPathSelectedByThisGate).toBe(false);
    expect(r.twoGapCompletionReadinessReviewMethodologicallyJustified).toBe(true);
    expect(r.twoGapCompletionReadinessReviewAuthorized).toBe(true);
    expect(r.acquisitionExecutedByThisGate).toBe(false);
  });

  it('keeps both remaining gaps mandatory before rebinding and non-acquisition non-negative', () => {
    const r = buildI204QuWei2001HigherProvenanceEvidenceAdequacyRebindingPathReassessmentReview(validI203());
    expect(r.twoRemainingGapsRequiredBeforeRebindingReadiness).toBe(true);
    expect(r.oneRemainingGapResolutionAloneSufficientForRebinding).toBe(false);
    expect(r.evidenceRebindingMethodologicallyReady).toBe(false);
    expect(r.evidenceRebindingAuthorizedByThisGate).toBe(false);
    expect(r.evidenceRebindingExecutedByThisGate).toBe(false);
    expect(r.nonAcquisitionCreatesNegativeFinding).toBe(false);
    expect(r.accessFailureCreatesNegativeFinding).toBe(false);
    expect(r.searchSilenceCreatesNegativeFinding).toBe(false);
    expect(r.targetedDiscoveryExhaustionEstablished).toBe(false);
    expect(r.corpusExhaustionEstablished).toBe(false);
  });

  it('freezes twelve reassessment controls', () => {
    const r = buildI204QuWei2001HigherProvenanceEvidenceAdequacyRebindingPathReassessmentReview(validI203());
    expect(r.reassessmentControlIds).toEqual(I204_REASSESSMENT_CONTROL_IDS);
    expect(r.reassessmentControlCount).toBe(12);
    expect(r.reassessmentControlsFrozen).toBe(true);
    expect(r.explicitNegativeFindingCountAccepted).toBe(0);
  });

  it('keeps independence, I132, frozen v2 and production guards unchanged', () => {
    const r = buildI204QuWei2001HigherProvenanceEvidenceAdequacyRebindingPathReassessmentReview(validI203());
    expect(r.sameAuthor2001To2003DoctrinalDependencyPreserved).toBe(true);
    expect(r.externalTargetLineageUnresolvedQuestionCount).toBe(3);
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

  it('fails closed if I203 publication resolution is mutated to depend on secondary aggregator authority', () => {
    const mutated = {
      ...validI203(),
      secondaryAggregatorPublisherLabelUsedAsAuthority: true,
    } as unknown as I203QuWei2001HigherProvenanceSubstrateAcquisitionEvidenceReport;
    const r = buildI204QuWei2001HigherProvenanceEvidenceAdequacyRebindingPathReassessmentReview(mutated);
    expect(r.status).toBe('I203_HIGHER_PROVENANCE_EVIDENCE_BOUNDARY_INVALID');
    expect(r.decision).toBe('QU_WEI_2001_HIGHER_PROVENANCE_EVIDENCE_REASSESSMENT_NOT_READY');
    expect(r.exactI203BoundaryAccepted).toBe(false);
    expect(r.assessedOriginalGapCount).toBe(0);
    expect(r.resolvedOriginalGapCount).toBe(0);
    expect(r.remainingGapCount).toBe(0);
    expect(r.publicationIdentityGapResolved).toBe(false);
    expect(r.twoGapCompletionReadinessReviewAuthorized).toBe(false);
    expect(r.currentV2ProvenanceDisposition).toBe('NOT_ASSESSED');
  });
});
