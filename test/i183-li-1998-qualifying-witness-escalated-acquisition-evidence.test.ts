import { describe, expect, it } from 'vitest';
import type { I182Li1998QualifyingWitnessAcquisitionPathReassessmentReadinessReviewReport } from '../src/research/i182-li-1998-qualifying-witness-acquisition-path-reassessment-readiness-review.js';
import { buildI183Li1998QualifyingWitnessEscalatedAcquisitionEvidence } from '../src/research/i183-li-1998-qualifying-witness-escalated-acquisition-evidence.js';

function validI182(): I182Li1998QualifyingWitnessAcquisitionPathReassessmentReadinessReviewReport {
  return {
    reviewId: 'i182_fixture',
    status: 'RESOLVED_LI_1998_QUALIFYING_WITNESS_ACQUISITION_PATH_REASSESSMENT_READINESS_REVIEW',
    decision:
      'QUALIFYING_WITNESS_ACQUISITION_ESCALATION_PATHS_FROZEN_PUBLICATION_BINDING_AND_DIRECT_VARIANT_COMPARISON_REMAIN_OPEN_NO_EVIDENCE_ACQUIRED_NO_REBINDING_NO_INDEPENDENCE',
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI181BoundaryAccepted: true,
    priorNonresolvingProgressAccepted: true,
    publicationMediumOrEntityGapStillOpen: true,
    canonicalDigitalWitnessNormalizationGapStillOpen: true,
    escalationPathCount: 4,
    escalationPathsFrozenProspectively: true,
    publicationIdentityEscalationReady: true,
    directColophonImprintEscalationReady: true,
    directComparableVariantEscalationReady: true,
    stableFileIdentityEscalationReady: true,
    explicit1998SpecificBindingRequired: true,
    formal1998PublicationBindingAdmissible: true,
    explicitNonformal1998DistributionBindingAdmissible: true,
    institutionalOrPrimarySurfacePriorityRequired: true,
    aggregatorListingMayRouteDiscovery: true,
    aggregatorListingAloneMayResolvePublicationIdentity: false,
    later2002MetadataMayBackfill1998Identity: false,
    chronologyCompanyCoLocationMayEstablishPublisherIdentity: false,
    directComparableWitnessAccessRequired: true,
    comparisonMustIncludeTitleImprintTocPaginationTargetPassageAndStructure: true,
    stableFileIdentityOrHashRequiredWhenFilesObtained: true,
    pageCountAloneMayResolveVariantRelationship: false,
    fileSizeAloneMayResolveVariantRelationship: false,
    filenameAloneMayResolveVariantRelationship: false,
    coverSurfaceAloneMayResolveCanonicalWitness: false,
    acquisitionPathReadinessEstablished: true,
    acquisitionExecutionAuthorized: true,
    evidenceAcquiredByThisGate: false,
    publicationIdentityBindingAcquiredByThisGate: false,
    variantNormalizationCompletedByThisGate: false,
    stableFileIdentityAcquiredByThisGate: false,
    onePathSuccessSufficientForRebinding: false,
    bothIdentityFunctionsRequiredBeforeRebindingReadiness: true,
    evidenceRebindingMethodologicallyReady: false,
    evidenceRebindingAuthorizedByThisGate: false,
    evidenceRebindingSelectedByThisGate: false,
    evidenceRebindingExecutedByThisGate: false,
    targetedDiscoveryExhaustionEstablished: false,
    corpusExhaustionEstablished: false,
    explicitNegativeFindingCount: 0,
    searchSilenceCreatesNegativeFinding: false,
    failedAccessCreatesNegativeFinding: false,
    repetitiveGenericSearchAloneCountsAsProgress: false,
    acquisitionPathRequirementCount: 12,
    acquisitionPathRequirementsFrozen: true,
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
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_1998_QUALIFYING_WITNESS_ESCALATED_ACQUISITION_EVIDENCE',
  } as unknown as I182Li1998QualifyingWitnessAcquisitionPathReassessmentReadinessReviewReport;
}

describe('I183 Li 1998 qualifying witness escalated acquisition evidence', () => {
  it('executes all four frozen escalation paths and records three new path-relevant observations', () => {
    const report = buildI183Li1998QualifyingWitnessEscalatedAcquisitionEvidence(validI182());
    expect(report.status).toBe('RESOLVED_LI_1998_QUALIFYING_WITNESS_ESCALATED_ACQUISITION_EVIDENCE');
    expect(report.decision).toBe(
      'ESCALATED_QUALIFYING_PATH_ACQUISITION_EXECUTED_THREE_NEW_PATH_RELEVANT_OBSERVATIONS_ZERO_1998_SPECIFIC_PUBLICATION_BINDINGS_ZERO_DIRECT_COMPARABLE_NORMALIZATIONS_ZERO_STABLE_FILE_IDENTITIES_TWO_GAPS_REMAIN_UNRESOLVED_NO_REBINDING_NO_INDEPENDENCE',
    );
    expect(report.exactI182BoundaryAccepted).toBe(true);
    expect(report.escalatedAcquisitionExecuted).toBe(true);
    expect(report.executedEscalationPathCount).toBe(4);
    expect(report.escalatedEvidenceRecordCount).toBe(4);
    expect(report.newPathRelevantObservationCount).toBe(3);
  });

  it('keeps every 1998-specific publication binding count at zero', () => {
    const report = buildI183Li1998QualifyingWitnessEscalatedAcquisitionEvidence(validI182());
    expect(report.qualifying1998PublicationIdentityBindingCount).toBe(0);
    expect(report.direct1998InstitutionalBibliographicRecordAcquiredCount).toBe(0);
    expect(report.direct1998CopyrightRegistrationCertificateAcquiredCount).toBe(0);
    expect(report.direct1998ColophonOrImprintWitnessAcquiredCount).toBe(0);
    expect(report.direct1998PublisherIssuerDistributorBindingCount).toBe(0);
    expect(report.explicit1998NonformalDistributionBindingCount).toBe(0);
    expect(report.publicationMediumOrEntityGapResolved).toBe(false);
  });

  it('records copyright-registration context without promoting it into a direct registry or publication-medium finding', () => {
    const report = buildI183Li1998QualifyingWitnessEscalatedAcquisitionEvidence(validI182());
    expect(report.authorReported2018CopyrightProtectionCenterRegistrationObserved).toBe(true);
    expect(report.authorReportedRegistrationCoversWorksSince1997).toBe(true);
    expect(report.authorReportedRegistrationIncludesTargetWorkFamily).toBe(true);
    expect(report.authorReportedRegistrationIsDirectRegistryRecord).toBe(false);
    expect(report.authorReportedRegistrationEstablishes1998PublicationMedium).toBe(false);
  });

  it('records the later 2002 formal edition but prevents backfilling 1998 identity', () => {
    const report = buildI183Li1998QualifyingWitnessEscalatedAcquisitionEvidence(validI182());
    expect(report.later2002FormalEditionObserved).toBe(true);
    expect(report.later2002FormalEditionIsbn).toBe('9789627943679');
    expect(report.later2002FormalEditionPageCount).toBe(422);
    expect(report.later2002FormalEditionFormat).toBe('25开');
    expect(report.later2002FormalEditionBinding).toBe('平裝');
    expect(report.later2002FormalEditionTextLayout).toBe('繁体竖排');
    expect(report.later2002FormalEditionTocObserved).toBe(true);
    expect(report.later2002FormalEditionContainsTargetChapterStructure).toBe(true);
    expect(report.later2002FormalEditionMayBackfill1998PublicationIdentity).toBe(false);
  });

  it('expands representation metadata to 202/314/413/422 but keeps normalization unresolved', () => {
    const report = buildI183Li1998QualifyingWitnessEscalatedAcquisitionEvidence(validI182());
    expect(report.physical314PageListingObserved).toBe(true);
    expect(report.physical314PageListingFormat).toBe('32开');
    expect(report.physical314PageListingBoundSpecificallyTo1998).toBe(false);
    expect(report.observedRepresentationPageCounts).toEqual([202, 314, 413, 422]);
    expect(report.observedRepresentationPageCountCount).toBe(4);
    expect(report.directComparableFullWitnessSetAcquired).toBe(false);
    expect(report.crossVariantTitleImprintCopyrightComparisonCompleted).toBe(false);
    expect(report.crossVariantTocPaginationTargetPassageStructureComparisonCompleted).toBe(false);
    expect(report.crossVariantAdditionDeletionReorderingComparisonCompleted).toBe(false);
    expect(report.canonicalDigitalWitnessEstablished).toBe(false);
    expect(report.normalizedWitnessFamilyEstablished).toBe(false);
    expect(report.completeVariantNormalizationCount).toBe(0);
    expect(report.stableFileIdentityOrHashAcquiredCount).toBe(0);
    expect(report.canonicalDigitalWitnessNormalizationGapResolved).toBe(false);
  });

  it('does not convert representation metadata or failed access into authority, negatives, or exhaustion', () => {
    const report = buildI183Li1998QualifyingWitnessEscalatedAcquisitionEvidence(validI182());
    expect(report.pageCountDifferenceAloneCreatesDistinctEdition).toBe(false);
    expect(report.physicalFormatListingAloneCreates1998Binding).toBe(false);
    expect(report.laterFormalEditionTocContinuityCreates1998Binding).toBe(false);
    expect(report.targetedDiscoveryExhaustionEstablished).toBe(false);
    expect(report.corpusExhaustionEstablished).toBe(false);
    expect(report.explicitNegativeFindingCount).toBe(0);
    expect(report.searchSilenceCreatesNegativeFinding).toBe(false);
    expect(report.failedRegistrySearchCreatesNegativeFinding).toBe(false);
    expect(report.failedDirectWitnessAccessCreatesNegativeFinding).toBe(false);
    expect(report.repetitiveGenericSearchAloneCountsAsProgress).toBe(false);
  });

  it('preserves rebinding, provenance, v2, production, threshold, numeric, and hidden-stem guards', () => {
    const report = buildI183Li1998QualifyingWitnessEscalatedAcquisitionEvidence(validI182());
    expect(report.bothIdentityFunctionsRequiredBeforeRebindingReadiness).toBe(true);
    expect(report.onePathSuccessSufficientForRebinding).toBe(false);
    expect(report.evidenceRebindingMethodologicallyReady).toBe(false);
    expect(report.evidenceRebindingAuthorizedByThisGate).toBe(false);
    expect(report.evidenceRebindingSelectedByThisGate).toBe(false);
    expect(report.evidenceRebindingExecutedByThisGate).toBe(false);
    expect(report.current2004WitnessPresumedOriginRetired).toBe(true);
    expect(report.prior1998SameAuthorWitnessConfirmed).toBe(true);
    expect(report.prior1998WitnessIndependentProvenanceEstablished).toBe(false);
    expect(report.sameAuthor1998To2004DerivativeChainMustRemainBound).toBe(true);
    expect(report.externalLineageUnresolvedQuestionCount).toBe(3);
    expect(report.externalLineageUnresolvedStatusPreserved).toBe(true);
    expect(report.provenanceIndependenceAdjudicatedByThisGate).toBe(false);
    expect(report.independentNormativeProvenanceEstablishedCount).toBe(0);
    expect(report.I132IndependentNormativeProvenanceRequirementRemainsNormative).toBe(true);
    expect(report.I132PolicyRelaxationAuthorizedByThisGate).toBe(false);
    expect(report.currentV2PackageAndCandidateSetRemainImmutable).toBe(true);
    expect(report.currentV2ProvenanceDisposition).toBe('BLOCKED_UNDER_CURRENT_EVIDENCE');
    expect(report.candidateSetReevaluationAuthorizedByThisGate).toBe(false);
    expect(report.productionPolicyExecutionAuthorized).toBe(false);
    expect(report.actualCompositionPerformedByThisGate).toBe(false);
    expect(report.multiSourceCompositionAuthorized).toBe(false);
    expect(report.visibleStemBinaryEffectiveInteractionEligibilityResolved).toBe(false);
    expect(report.thresholdRuleCreatedByThisGate).toBe(false);
    expect(report.damageEvaluationAuthorized).toBe(false);
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
    expect(report.hiddenStemAuthorityGap).toBe('SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED');
  });

  it('fails closed if I182 is mutated to permit later-edition backfill', () => {
    const mutated = {
      ...validI182(),
      later2002MetadataMayBackfill1998Identity: true,
    } as unknown as I182Li1998QualifyingWitnessAcquisitionPathReassessmentReadinessReviewReport;
    const report = buildI183Li1998QualifyingWitnessEscalatedAcquisitionEvidence(mutated);
    expect(report.status).toBe('I182_ESCALATION_BOUNDARY_INVALID');
    expect(report.decision).toBe('LI_1998_ESCALATED_ACQUISITION_EVIDENCE_NOT_EXECUTED');
    expect(report.exactI182BoundaryAccepted).toBe(false);
    expect(report.escalatedAcquisitionExecuted).toBe(false);
    expect(report.executedEscalationPathCount).toBe(0);
    expect(report.escalatedEvidenceRecordCount).toBe(0);
    expect(report.newPathRelevantObservationCount).toBe(0);
    expect(report.I132IndependentNormativeProvenanceRequirementRemainsNormative).toBe(false);
  });
});
