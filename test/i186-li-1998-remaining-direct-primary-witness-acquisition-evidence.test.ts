import { describe, expect, it } from 'vitest';
import type { I185Li1998RemainingDirectPrimaryWitnessAcquisitionReadinessReviewReport } from '../src/research/i185-li-1998-remaining-direct-primary-witness-acquisition-readiness-review.js';
import { buildI186Li1998RemainingDirectPrimaryWitnessAcquisitionEvidence } from '../src/research/i186-li-1998-remaining-direct-primary-witness-acquisition-evidence.js';

function validI185(): I185Li1998RemainingDirectPrimaryWitnessAcquisitionReadinessReviewReport {
  return {
    reviewId: 'i185_fixture',
    status: 'RESOLVED_LI_1998_REMAINING_DIRECT_PRIMARY_WITNESS_ACQUISITION_READINESS_REVIEW',
    decision:
      'I184_FIVE_REMAINING_DIRECT_PRIMARY_PATHS_ACCEPTED_ACQUISITION_REQUIREMENTS_FROZEN_EXECUTION_READY_NO_EVIDENCE_ACQUIRED_TWO_GAPS_UNRESOLVED_NO_REBINDING_NO_INDEPENDENCE',
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI184BoundaryAccepted: true,
    upstreamPathLevelProgressAccepted: true,
    publicationMediumOrEntityGapStillOpen: true,
    canonicalDigitalWitnessNormalizationGapStillOpen: true,
    directPrimaryPathCount: 5,
    directPrimaryPathRequirementCount: 5,
    pathPrioritiesFrozenProspectively: true,
    acquisitionRequirementCount: 14,
    acquisitionRequirementsFrozen: true,
    directTargetRegistryCertificateOrRegistrationNumberRequired: true,
    directTargetRegistryMustBindExactTargetTitle: true,
    directTargetRegistryMustBindAuthorIdentity: true,
    directTargetRegistryContextWithoutRecordMayResolveGap: false,
    direct1998PublicationBindingRequired: true,
    formal1998BindingMayUsePublisherIssuerOrDistributor: true,
    explicitNonformal1998DistributionBindingAdmissible: true,
    chronologyCompanyCoLocationMayEstablishPublisherIdentity: false,
    later2002FormalMetadataMayBackfill1998Identity: false,
    laterEditionTocContinuityMayBackfill1998Identity: false,
    directFullComparableWitnessAccessRequired: true,
    comparisonTitleImprintCopyrightRequired: true,
    comparisonTocPaginationTargetPassageStructureRequired: true,
    comparisonAdditionDeletionReorderingRequired: true,
    stableFileHashOrTransformationProvenanceRequired: true,
    pageCountAloneMayResolveVariantIdentity: false,
    physicalFormatAloneMayResolveVariantIdentity: false,
    fileSizeAloneMayResolveVariantIdentity: false,
    filenameAloneMayResolveVariantIdentity: false,
    coverSurfaceAloneMayResolveVariantIdentity: false,
    aggregatorMayRouteDiscovery: true,
    aggregatorAloneMayResolvePublicationIdentity: false,
    aggregatorAloneMayResolveCanonicalWitnessNormalization: false,
    acquisitionReadinessEstablished: true,
    boundedAcquisitionExecutionAuthorizedByThisGate: true,
    evidenceAcquiredByThisGate: false,
    directRegistryEvidenceAcquiredByThisGate: false,
    direct1998PublicationBindingAcquiredByThisGate: false,
    directComparableWitnessAcquiredByThisGate: false,
    stableFileIdentityAcquiredByThisGate: false,
    publicationMediumOrEntityGapResolvedByThisGate: false,
    canonicalDigitalWitnessNormalizationGapResolvedByThisGate: false,
    targetedDiscoveryExhaustionEstablished: false,
    corpusExhaustionEstablished: false,
    explicitNegativeFindingCount: 0,
    failedRegistryAccessCreatesNegativeFinding: false,
    failedWitnessAccessCreatesNegativeFinding: false,
    searchSilenceCreatesNegativeFinding: false,
    repetitiveEquivalentSurfaceCountsAsProgress: false,
    bothIdentityFunctionsRequiredBeforeRebindingReadiness: true,
    oneIdentityFunctionResolutionSufficientForRebinding: false,
    evidenceRebindingMethodologicallyReady: false,
    evidenceRebindingAuthorizedByThisGate: false,
    evidenceRebindingSelectedByThisGate: false,
    evidenceRebindingExecutedByThisGate: false,
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
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_1998_REMAINING_DIRECT_PRIMARY_WITNESS_ACQUISITION_EVIDENCE',
  } as unknown as I185Li1998RemainingDirectPrimaryWitnessAcquisitionReadinessReviewReport;
}

describe('I186 Li 1998 remaining direct primary witness acquisition evidence', () => {
  it('accepts exact I185 and executes all five frozen acquisition paths with zero qualifying acquisitions', () => {
    const report = buildI186Li1998RemainingDirectPrimaryWitnessAcquisitionEvidence(validI185());
    expect(report.status).toBe('RESOLVED_LI_1998_REMAINING_DIRECT_PRIMARY_WITNESS_ACQUISITION_EVIDENCE');
    expect(report.decision).toBe(
      'REMAINING_DIRECT_PRIMARY_WITNESS_ACQUISITION_EXECUTED_FIVE_PATHS_ZERO_QUALIFYING_1998_PUBLICATION_BINDINGS_ZERO_DIRECT_COMPARABLE_WITNESSES_ZERO_STABLE_FILE_IDENTITIES_TWO_GAPS_REMAIN_UNRESOLVED_NO_REBINDING_NO_INDEPENDENCE',
    );
    expect(report.exactI185BoundaryAccepted).toBe(true);
    expect(report.acquisitionExecuted).toBe(true);
    expect(report.executedPathCount).toBe(5);
    expect(report.evidenceRecordCount).toBe(5);
    expect(report.observationalEvidenceRecordedByThisGate).toBe(true);
    expect(report.qualifyingIdentityEvidenceAcquiredByThisGate).toBe(false);
    expect(report.qualifyingAcquisitionCount).toBe(0);
    expect(report.evidenceRecords.every((record) => record.qualifyingAcquisitionCount === 0)).toBe(true);
  });

  it('identifies official registry infrastructure but acquires no direct target registry record, certificate, or number', () => {
    const report = buildI186Li1998RemainingDirectPrimaryWitnessAcquisitionEvidence(validI185());
    expect(report.directTargetRegistryInfrastructureIdentified).toBe(true);
    expect(report.authorReported2018RegistrationContextReconfirmed).toBe(true);
    expect(report.directTargetRegistryRecordAcquiredCount).toBe(0);
    expect(report.directTargetRegistryCertificateAcquiredCount).toBe(0);
    expect(report.directTargetRegistrationNumberAcquiredCount).toBe(0);
    expect(report.authorReportedRegistrationCountsAsDirectRegistryEvidence).toBe(false);
    expect(report.authorReportedRegistrationEstablishes1998PublicationMedium).toBe(false);
    expect(report.evidenceRecords[0]?.negativeFindingEstablished).toBe(false);
  });

  it('reconfirms 1998 appearance and later 2002 formal edition without inventing a 1998 publication binding', () => {
    const report = buildI186Li1998RemainingDirectPrimaryWitnessAcquisitionEvidence(validI185());
    expect(report.authorChronology1998AppearanceReconfirmed).toBe(true);
    expect(report.authorChronologyCompanyCoLocationEstablishesPublisherIdentity).toBe(false);
    expect(report.direct1998ColophonOrImprintWitnessAcquiredCount).toBe(0);
    expect(report.direct1998PublisherIssuerDistributorBindingCount).toBe(0);
    expect(report.explicit1998NonformalDistributionBindingCount).toBe(0);
    expect(report.later2002FormalEditionReconfirmed).toBe(true);
    expect(report.later2002FormalEditionIsbn).toBe('9789627943679');
    expect(report.later2002FormalEditionPageCount).toBe(422);
    expect(report.later2002FormalEditionMayBackfill1998PublicationIdentity).toBe(false);
  });

  it('records 314/413 representation and file-size variance without treating listings or uploader metadata as normalization authority', () => {
    const report = buildI186Li1998RemainingDirectPrimaryWitnessAcquisitionEvidence(validI185());
    expect(report.listing314PageRepresentationReconfirmed).toBe(true);
    expect(report.listing413PageRepresentationReconfirmed).toBe(true);
    expect(report.listing413PageFileSizeMb).toBe(47.44);
    expect(report.alternate413RepresentationFileSizeMb).toBe(47.37);
    expect(report.alternateTargetFileSizeMb).toBe(15.48);
    expect(report.uploaderNonformalFieldObserved).toBe(true);
    expect(report.uploaderNonformalFieldEstablishes1998PublicationStatus).toBe(false);
    expect(report.pageCountDifferenceAloneCreatesDistinctEdition).toBe(false);
    expect(report.fileSizeDifferenceAloneCreatesDistinctEdition).toBe(false);
    expect(report.filenameDifferenceAloneCreatesDistinctEdition).toBe(false);
    expect(report.listingSurfaceAloneCreatesCanonicalWitness).toBe(false);
  });

  it('acquires no direct comparable 202/314/413/422 full-witness set, hash, transformation provenance, or normalization', () => {
    const report = buildI186Li1998RemainingDirectPrimaryWitnessAcquisitionEvidence(validI185());
    expect(report.directFull314WitnessAcquiredCount).toBe(0);
    expect(report.directFull413WitnessAcquiredCount).toBe(0);
    expect(report.directFull202ReferenceWitnessAcquiredCount).toBe(0);
    expect(report.directFull422ReferenceWitnessAcquiredCount).toBe(0);
    expect(report.later422MetadataAndTocObservedWithoutFullComparableWitness).toBe(true);
    expect(report.directComparableFullWitnessSetAcquired).toBe(false);
    expect(report.crossVariantTitleImprintCopyrightComparisonCompleted).toBe(false);
    expect(report.crossVariantTocPaginationTargetPassageStructureComparisonCompleted).toBe(false);
    expect(report.crossVariantAdditionDeletionReorderingComparisonCompleted).toBe(false);
    expect(report.stableFileIdentityOrHashAcquiredCount).toBe(0);
    expect(report.transformationProvenanceAcquiredCount).toBe(0);
    expect(report.completeVariantNormalizationCount).toBe(0);
  });

  it('keeps both gaps unresolved and does not convert non-acquisition into negative or exhaustion evidence', () => {
    const report = buildI186Li1998RemainingDirectPrimaryWitnessAcquisitionEvidence(validI185());
    expect(report.publicationMediumOrEntityGapResolved).toBe(false);
    expect(report.canonicalDigitalWitnessNormalizationGapResolved).toBe(false);
    expect(report.targetedDiscoveryExhaustionEstablished).toBe(false);
    expect(report.corpusExhaustionEstablished).toBe(false);
    expect(report.explicitNegativeFindingCount).toBe(0);
    expect(report.searchSilenceCreatesNegativeFinding).toBe(false);
    expect(report.failedRegistryAccessCreatesNegativeFinding).toBe(false);
    expect(report.failedWitnessAccessCreatesNegativeFinding).toBe(false);
    expect(report.nonAcquisitionCreatesNegativeFinding).toBe(false);
    expect(report.evidenceRecords.every((record) => record.resolvesTargetGap === false)).toBe(true);
  });

  it('preserves rebinding, independence, v2 package, threshold, numeric and production guards', () => {
    const report = buildI186Li1998RemainingDirectPrimaryWitnessAcquisitionEvidence(validI185());
    expect(report.bothIdentityFunctionsRequiredBeforeRebindingReadiness).toBe(true);
    expect(report.oneIdentityFunctionResolutionSufficientForRebinding).toBe(false);
    expect(report.evidenceRebindingMethodologicallyReady).toBe(false);
    expect(report.evidenceRebindingAuthorizedByThisGate).toBe(false);
    expect(report.evidenceRebindingSelectedByThisGate).toBe(false);
    expect(report.evidenceRebindingExecutedByThisGate).toBe(false);
    expect(report.prior1998WitnessIndependentProvenanceEstablished).toBe(false);
    expect(report.independentNormativeProvenanceEstablishedCount).toBe(0);
    expect(report.I132IndependentNormativeProvenanceRequirementRemainsNormative).toBe(true);
    expect(report.I132PolicyRelaxationAuthorizedByThisGate).toBe(false);
    expect(report.currentV2PackageAndCandidateSetRemainImmutable).toBe(true);
    expect(report.currentV2ProvenanceDisposition).toBe('BLOCKED_UNDER_CURRENT_EVIDENCE');
    expect(report.candidateSetReevaluationAuthorizedByThisGate).toBe(false);
    expect(report.candidateSetAdmissibilityEstablishedByThisGate).toBe(false);
    expect(report.productionPolicyExecutionAuthorized).toBe(false);
    expect(report.actualCompositionPerformedByThisGate).toBe(false);
    expect(report.multiSourceCompositionAuthorized).toBe(false);
    expect(report.authorityAcquiredByThisGate).toBe(false);
    expect(report.visibleStemBinaryEffectiveInteractionEligibilityResolved).toBe(false);
    expect(report.thresholdRuleCreatedByThisGate).toBe(false);
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
    expect(report.hiddenStemAuthorityGap).toBe('SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED');
  });

  it('fails closed if I185 is mutated to claim readiness-stage evidence acquisition', () => {
    const mutated = {
      ...validI185(),
      evidenceAcquiredByThisGate: true,
    } as unknown as I185Li1998RemainingDirectPrimaryWitnessAcquisitionReadinessReviewReport;
    const report = buildI186Li1998RemainingDirectPrimaryWitnessAcquisitionEvidence(mutated);
    expect(report.status).toBe('I185_DIRECT_PRIMARY_ACQUISITION_BOUNDARY_INVALID');
    expect(report.decision).toBe('LI_1998_REMAINING_DIRECT_PRIMARY_WITNESS_ACQUISITION_NOT_EXECUTED');
    expect(report.exactI185BoundaryAccepted).toBe(false);
    expect(report.acquisitionExecuted).toBe(false);
    expect(report.executedPathCount).toBe(0);
    expect(report.evidenceRecordCount).toBe(0);
    expect(report.observationalEvidenceRecordedByThisGate).toBe(false);
    expect(report.I132IndependentNormativeProvenanceRequirementRemainsNormative).toBe(false);
  });
});
