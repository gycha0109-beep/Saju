import { describe, expect, it } from 'vitest';
import type { I179Li1998DirectWitnessAcquisitionReadinessReviewReport } from '../src/research/i179-li-1998-direct-witness-acquisition-readiness-review.js';
import { buildI180Li1998DirectWitnessAcquisitionEvidence } from '../src/research/i180-li-1998-direct-witness-acquisition-evidence.js';

function validI179(): I179Li1998DirectWitnessAcquisitionReadinessReviewReport {
  return {
    reviewId: 'i179_fixture',
    status: 'RESOLVED_LI_1998_DIRECT_PRIMARY_WITNESS_VARIANT_NORMALIZATION_EVIDENCE_ACQUISITION_READINESS_REVIEW',
    decision:
      'DIRECT_PRIMARY_WITNESS_AND_VARIANT_NORMALIZATION_ACQUISITION_PROTOCOL_FROZEN_TWO_LANES_READY_NO_EVIDENCE_ACQUIRED_NO_REBINDING_NO_INDEPENDENCE',
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI178BoundaryAccepted: true,
    acquisitionLaneCount: 2,
    publicationIdentityLaneReady: true,
    variantNormalizationLaneReady: true,
    publicationIdentityEvidenceClassCount: 4,
    variantNormalizationEvidenceClassCount: 6,
    acquisitionRequirementCount: 12,
    acquisitionRequirementsFrozenProspectively: true,
    formalAndNonformalPublicationPathsBothPermitted: true,
    explicit1998BindingRequired: true,
    later2002MetadataMayBackfill1998Identity: false,
    companyChronologyMayEstablish1998PublisherIdentity: false,
    ambiguousUploaderFieldMayResolve1998PublicationStatus: false,
    directComparableVariantAccessRequired: true,
    titleImprintPaginationTocTargetPassageAndStructuralComparisonRequired: true,
    stableFileIdentityRecordRequiredWhenAvailable: true,
    OCRSnippetAloneMayResolveVariantRelationship: false,
    pageCountAloneMayResolveVariantRelationship: false,
    fileSizeAloneMayResolveVariantRelationship: false,
    filenameAloneMayResolveVariantRelationship: false,
    oneLaneResolutionSufficientForRebinding: false,
    bothIdentityFunctionsRequiredBeforeRebindingReadiness: true,
    evidenceAcquisitionExecutedByThisGate: false,
    publicationIdentityEvidenceAcquiredCount: 0,
    variantNormalizationEvidenceAcquiredCount: 0,
    publicationMediumOrEntityGapResolvedByThisGate: false,
    canonicalDigitalWitnessNormalizationGapResolvedByThisGate: false,
    evidenceRebindingMethodologicallyReady: false,
    evidenceRebindingAuthorizedByThisGate: false,
    evidenceRebindingSelectedByThisGate: false,
    evidenceRebindingExecutedByThisGate: false,
    targetedDiscoveryExhaustionEstablished: false,
    corpusExhaustionEstablished: false,
    searchSilenceCreatesNegativeFinding: false,
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
    candidateSelectedByThisGate: false,
    remediationStrategySelectedByThisGate: false,
    remediationExecutionAuthorizedByThisGate: false,
    candidateSetMutatedByThisGate: false,
    candidateRemovedByThisGate: false,
    candidateReplacedByThisGate: false,
    newCandidateSetVersionCreatedByThisGate: false,
    newInputPackageVersionCreatedByThisGate: false,
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
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_1998_DIRECT_PRIMARY_WITNESS_AND_VARIANT_NORMALIZATION_EVIDENCE_ACQUISITION_RECORD',
  } as unknown as I179Li1998DirectWitnessAcquisitionReadinessReviewReport;
}

describe('I180 Li 1998 direct witness acquisition evidence', () => {
  it('executes both frozen lanes and records one newly acquired stable direct cover surface', () => {
    const report = buildI180Li1998DirectWitnessAcquisitionEvidence(validI179());
    expect(report.status).toBe('RESOLVED_LI_1998_DIRECT_PRIMARY_WITNESS_VARIANT_NORMALIZATION_EVIDENCE_ACQUISITION_RECORD');
    expect(report.decision).toBe(
      'DIRECT_WITNESS_ACQUISITION_EXECUTED_ONE_STABLE_COVER_SURFACE_OBSERVED_ZERO_1998_SPECIFIC_PUBLICATION_BINDINGS_ZERO_COMPLETE_VARIANT_NORMALIZATIONS_TWO_GAPS_REMAIN_UNRESOLVED_NO_REBINDING_NO_INDEPENDENCE',
    );
    expect(report.exactI179BoundaryAccepted).toBe(true);
    expect(report.evidenceAcquisitionExecuted).toBe(true);
    expect(report.publicationIdentityLaneExecuted).toBe(true);
    expect(report.variantNormalizationLaneExecuted).toBe(true);
    expect(report.evidenceObservationCount).toBe(6);
    expect(report.newDirectWitnessSurfaceAcquiredCount).toBe(1);
  });

  it('binds the Scribd direct cover surface without promoting it to a 1998 publication identity', () => {
    const report = buildI180Li1998DirectWitnessAcquisitionEvidence(validI179());
    expect(report.directStableCoverSurfaceObserved).toBe(true);
    expect(report.scribdDocumentId).toBe('744317976');
    expect(report.scribdReportedDocumentPageCount).toBe(202);
    expect(report.directCoverTitleObserved).toBe(true);
    expect(report.directCoverAuthorObserved).toBe(true);
    expect(report.directCoverSeriesMarkerObserved).toBe(true);
    expect(report.directCoverSeriesMarker).toBe('预测研究系列丛书');
    expect(report.directCover1998DateObserved).toBe(false);
    expect(report.directCoverPublisherObserved).toBe(false);
    expect(report.directCoverIssuingEntityObserved).toBe(false);
    expect(report.directCoverIsbnObserved).toBe(false);
    expect(report.directCoverEstablishes1998PublicationIdentity).toBe(false);
  });

  it('keeps publication identity unresolved despite chronology and external series context', () => {
    const report = buildI180Li1998DirectWitnessAcquisitionEvidence(validI179());
    expect(report.authorPrimaryChronology1998AppearanceRevalidated).toBe(true);
    expect(report.chronologyCompanyCoLocationRevalidated).toBe(true);
    expect(report.chronologyCompanyMayBeInferredAsPublisher).toBe(false);
    expect(report.externalSeriesEditorialContextObserved).toBe(true);
    expect(report.externalSeriesEditorialContextBindsThisWorkTo1998Issuer).toBe(false);
    expect(report.explicit1998LibraryArchiveBibliographicRecordLocated).toBe(false);
    expect(report.explicit1998PublisherIssuerDistributorRecordLocated).toBe(false);
    expect(report.explicit1998NonformalDistributionStatusRecordLocated).toBe(false);
    expect(report.qualifying1998PublicationIdentityBindingCount).toBe(0);
    expect(report.publicationMediumOrEntityGapResolved).toBe(false);
  });

  it('records a third page-count representation without declaring edition or canonical relationships', () => {
    const report = buildI180Li1998DirectWitnessAcquisitionEvidence(validI179());
    expect(report.observedRepresentationPageCounts).toEqual([202, 314, 413]);
    expect(report.observedRepresentationSizesMb).toEqual([15.48, 47.37, 47.44, 49.6]);
    expect(report.direct202FullWitnessAccessObtained).toBe(false);
    expect(report.direct314FullWitnessAccessObtained).toBe(false);
    expect(report.direct413FullWitnessAccessObtained).toBe(false);
    expect(report.direct314And413ComparableWitnessSetObtained).toBe(false);
    expect(report.pageCountDifferenceAloneCreatesDistinctEdition).toBe(false);
    expect(report.fileSizeDifferenceAloneCreatesDistinctEdition).toBe(false);
    expect(report.filenameDifferenceAloneCreatesDistinctEdition).toBe(false);
  });

  it('leaves structural normalization and stable file identity incomplete', () => {
    const report = buildI180Li1998DirectWitnessAcquisitionEvidence(validI179());
    expect(report.crossVariantTitleImprintCopyrightComparisonCompleted).toBe(false);
    expect(report.crossVariantPaginationTocTargetPassageComparisonCompleted).toBe(false);
    expect(report.crossVariantAdditionDeletionReorderingComparisonCompleted).toBe(false);
    expect(report.crossVariantScanArtifactComparisonCompleted).toBe(false);
    expect(report.cryptographicHashOrStableFileIdentityAcquiredCount).toBe(0);
    expect(report.directCoverSurfaceAloneCreatesCanonicalWitness).toBe(false);
    expect(report.canonicalDigitalWitnessEstablished).toBe(false);
    expect(report.normalizedWitnessFamilyEstablished).toBe(false);
    expect(report.completeVariantNormalizationCount).toBe(0);
    expect(report.canonicalDigitalWitnessNormalizationGapResolved).toBe(false);
  });

  it('keeps rebinding and exhaustion fail-closed', () => {
    const report = buildI180Li1998DirectWitnessAcquisitionEvidence(validI179());
    expect(report.oneLaneResolutionSufficientForRebinding).toBe(false);
    expect(report.bothIdentityFunctionsRequiredBeforeRebindingReadiness).toBe(true);
    expect(report.evidenceRebindingMethodologicallyReady).toBe(false);
    expect(report.evidenceRebindingAuthorizedByThisGate).toBe(false);
    expect(report.evidenceRebindingSelectedByThisGate).toBe(false);
    expect(report.evidenceRebindingExecutedByThisGate).toBe(false);
    expect(report.explicitNegativeFindingCount).toBe(0);
    expect(report.targetedDiscoveryExhaustionEstablished).toBe(false);
    expect(report.corpusExhaustionEstablished).toBe(false);
    expect(report.searchSilenceCreatesNegativeFinding).toBe(false);
  });

  it('preserves provenance, v2, production, threshold, numeric, and hidden-stem guards', () => {
    const report = buildI180Li1998DirectWitnessAcquisitionEvidence(validI179());
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
    expect(report.candidateSetMutatedByThisGate).toBe(false);
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

  it('fails closed if I179 incorrectly reports evidence already acquired', () => {
    const mutated = {
      ...validI179(),
      evidenceAcquisitionExecutedByThisGate: true,
    } as unknown as I179Li1998DirectWitnessAcquisitionReadinessReviewReport;
    const report = buildI180Li1998DirectWitnessAcquisitionEvidence(mutated);
    expect(report.status).toBe('I179_ACQUISITION_READINESS_BOUNDARY_INVALID');
    expect(report.decision).toBe('LI_1998_DIRECT_WITNESS_ACQUISITION_NOT_EXECUTED');
    expect(report.exactI179BoundaryAccepted).toBe(false);
    expect(report.evidenceAcquisitionExecuted).toBe(false);
    expect(report.evidenceObservationCount).toBe(0);
    expect(report.newDirectWitnessSurfaceAcquiredCount).toBe(0);
    expect(report.I132IndependentNormativeProvenanceRequirementRemainsNormative).toBe(false);
  });
});
