import { describe, expect, it } from 'vitest';
import type { I183Li1998QualifyingWitnessEscalatedAcquisitionEvidenceReport } from '../src/research/i183-li-1998-qualifying-witness-escalated-acquisition-evidence.js';
import {
  I184_REASSESSMENT_REQUIREMENT_IDS,
  I184_REMAINING_PATH_IDS,
  buildI184Li1998EscalatedEvidenceAdequacyRemainingPathReassessmentReview,
} from '../src/research/i184-li-1998-escalated-acquisition-evidence-adequacy-remaining-path-reassessment-review.js';

function validI183(): I183Li1998QualifyingWitnessEscalatedAcquisitionEvidenceReport {
  return {
    evidenceRecordSetId: 'i183_fixture',
    status: 'RESOLVED_LI_1998_QUALIFYING_WITNESS_ESCALATED_ACQUISITION_EVIDENCE',
    decision:
      'ESCALATED_QUALIFYING_PATH_ACQUISITION_EXECUTED_THREE_NEW_PATH_RELEVANT_OBSERVATIONS_ZERO_1998_SPECIFIC_PUBLICATION_BINDINGS_ZERO_DIRECT_COMPARABLE_NORMALIZATIONS_ZERO_STABLE_FILE_IDENTITIES_TWO_GAPS_REMAIN_UNRESOLVED_NO_REBINDING_NO_INDEPENDENCE',
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI182BoundaryAccepted: true,
    escalatedAcquisitionExecuted: true,
    executedEscalationPathCount: 4,
    escalatedEvidenceRecordCount: 4,
    newPathRelevantObservationCount: 3,
    qualifying1998PublicationIdentityBindingCount: 0,
    direct1998InstitutionalBibliographicRecordAcquiredCount: 0,
    direct1998CopyrightRegistrationCertificateAcquiredCount: 0,
    direct1998ColophonOrImprintWitnessAcquiredCount: 0,
    direct1998PublisherIssuerDistributorBindingCount: 0,
    explicit1998NonformalDistributionBindingCount: 0,
    authorReported2018CopyrightProtectionCenterRegistrationObserved: true,
    authorReportedRegistrationCoversWorksSince1997: true,
    authorReportedRegistrationIncludesTargetWorkFamily: true,
    authorReportedRegistrationIsDirectRegistryRecord: false,
    authorReportedRegistrationEstablishes1998PublicationMedium: false,
    later2002FormalEditionObserved: true,
    later2002FormalEditionIsbn: '9789627943679',
    later2002FormalEditionPageCount: 422,
    later2002FormalEditionTocObserved: true,
    later2002FormalEditionContainsTargetChapterStructure: true,
    later2002FormalEditionMayBackfill1998PublicationIdentity: false,
    physical314PageListingObserved: true,
    physical314PageListingFormat: '32开',
    physical314PageListingBoundSpecificallyTo1998: false,
    observedRepresentationPageCounts: [202, 314, 413, 422],
    observedRepresentationPageCountCount: 4,
    directComparableFullWitnessSetAcquired: false,
    crossVariantTitleImprintCopyrightComparisonCompleted: false,
    crossVariantTocPaginationTargetPassageStructureComparisonCompleted: false,
    crossVariantAdditionDeletionReorderingComparisonCompleted: false,
    canonicalDigitalWitnessEstablished: false,
    normalizedWitnessFamilyEstablished: false,
    completeVariantNormalizationCount: 0,
    stableFileIdentityOrHashAcquiredCount: 0,
    pageCountDifferenceAloneCreatesDistinctEdition: false,
    physicalFormatListingAloneCreates1998Binding: false,
    laterFormalEditionTocContinuityCreates1998Binding: false,
    publicationMediumOrEntityGapResolved: false,
    canonicalDigitalWitnessNormalizationGapResolved: false,
    bothIdentityFunctionsRequiredBeforeRebindingReadiness: true,
    onePathSuccessSufficientForRebinding: false,
    evidenceRebindingMethodologicallyReady: false,
    evidenceRebindingAuthorizedByThisGate: false,
    evidenceRebindingSelectedByThisGate: false,
    evidenceRebindingExecutedByThisGate: false,
    targetedDiscoveryExhaustionEstablished: false,
    corpusExhaustionEstablished: false,
    explicitNegativeFindingCount: 0,
    searchSilenceCreatesNegativeFinding: false,
    failedRegistrySearchCreatesNegativeFinding: false,
    failedDirectWitnessAccessCreatesNegativeFinding: false,
    repetitiveGenericSearchAloneCountsAsProgress: false,
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
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_1998_ESCALATED_ACQUISITION_EVIDENCE_ADEQUACY_AND_REMAINING_PATH_REASSESSMENT_REVIEW',
  } as unknown as I183Li1998QualifyingWitnessEscalatedAcquisitionEvidenceReport;
}

describe('I184 Li 1998 escalated evidence adequacy and remaining path reassessment review', () => {
  it('accepts exact I183 and records path-level progress without gap resolution', () => {
    const report = buildI184Li1998EscalatedEvidenceAdequacyRemainingPathReassessmentReview(validI183());
    expect(report.status).toBe('RESOLVED_LI_1998_ESCALATED_EVIDENCE_ADEQUACY_REMAINING_PATH_REASSESSMENT_REVIEW');
    expect(report.decision).toBe(
      'I183_ESCALATED_ACQUISITION_EVIDENCE_ADEQUATE_TO_RECORD_PATH_LEVEL_PROGRESS_ZERO_1998_BINDING_ZERO_VARIANT_NORMALIZATION_TWO_GAPS_REMAIN_UNRESOLVED_REBINDING_NOT_READY_REMAINING_PRIMARY_AND_DIRECT_WITNESS_PATHS_MAY_CONTINUE_NO_INDEPENDENCE',
    );
    expect(report.exactI183BoundaryAccepted).toBe(true);
    expect(report.escalatedAcquisitionExecutionAccepted).toBe(true);
    expect(report.escalatedEvidenceRecordCount).toBe(4);
    expect(report.newPathRelevantObservationCount).toBe(3);
    expect(report.pathLevelProgressAdequate).toBe(true);
    expect(report.publicationIdentityResolutionEvidenceAdequate).toBe(false);
    expect(report.canonicalWitnessNormalizationEvidenceAdequate).toBe(false);
  });

  it('keeps both unresolved gap counts at zero resolution and preserves direct registry requirement', () => {
    const report = buildI184Li1998EscalatedEvidenceAdequacyRemainingPathReassessmentReview(validI183());
    expect(report.qualifying1998PublicationIdentityBindingCount).toBe(0);
    expect(report.completeVariantNormalizationCount).toBe(0);
    expect(report.stableFileIdentityOrHashAcquiredCount).toBe(0);
    expect(report.publicationMediumOrEntityGapResolved).toBe(false);
    expect(report.canonicalDigitalWitnessNormalizationGapResolved).toBe(false);
    expect(report.authorReported2018RegistrationContextAcceptedAsPathEvidence).toBe(true);
    expect(report.authorReported2018RegistrationCountsAsDirectRegistryEvidence).toBe(false);
    expect(report.directTargetRegistryRecordStillRequired).toBe(true);
  });

  it('accepts later-edition and 314-page observations only as context and representation evidence', () => {
    const report = buildI184Li1998EscalatedEvidenceAdequacyRemainingPathReassessmentReview(validI183());
    expect(report.later2002FormalEditionMetadataAcceptedAsLaterEditionContext).toBe(true);
    expect(report.later2002FormalEditionMayBackfill1998PublicationIdentity).toBe(false);
    expect(report.later2002TocContinuityMayResolve1998PublicationIdentity).toBe(false);
    expect(report.physical314PageListingAcceptedAsRepresentationEvidence).toBe(true);
    expect(report.physical314PageListingMayResolve1998PublicationIdentity).toBe(false);
  });

  it('keeps 202/314/413/422 variance non-authoritative and requires direct comparable witnesses plus provenance', () => {
    const report = buildI184Li1998EscalatedEvidenceAdequacyRemainingPathReassessmentReview(validI183());
    expect(report.observedRepresentationPageCounts).toEqual([202, 314, 413, 422]);
    expect(report.representationVarianceCreatesDistinctNormativeEdition).toBe(false);
    expect(report.representationVarianceCreatesCanonicalWitness).toBe(false);
    expect(report.directFullComparableWitnessesStillRequired).toBe(true);
    expect(report.stableFileIdentityOrTransformationProvenanceStillRequired).toBe(true);
  });

  it('freezes five remaining direct and primary evidence paths without acquiring evidence', () => {
    const report = buildI184Li1998EscalatedEvidenceAdequacyRemainingPathReassessmentReview(validI183());
    expect(report.remainingPathIds).toEqual(I184_REMAINING_PATH_IDS);
    expect(report.remainingPathCount).toBe(5);
    expect(report.remainingPathsMethodologicallyOpen).toBe(true);
    expect(report.furtherAcquisitionExecutionAuthorizedByThisGate).toBe(true);
    expect(report.evidenceAcquiredByThisGate).toBe(false);
    expect(report.directRegistryEvidenceAcquiredByThisGate).toBe(false);
    expect(report.direct1998PublicationBindingAcquiredByThisGate).toBe(false);
    expect(report.directComparableWitnessAcquiredByThisGate).toBe(false);
    expect(report.stableFileIdentityAcquiredByThisGate).toBe(false);
  });

  it('does not convert failed access, search silence, or equivalent aggregators into negative or exhaustion findings', () => {
    const report = buildI184Li1998EscalatedEvidenceAdequacyRemainingPathReassessmentReview(validI183());
    expect(report.targetedDiscoveryExhaustionEstablished).toBe(false);
    expect(report.corpusExhaustionEstablished).toBe(false);
    expect(report.explicitNegativeFindingCount).toBe(0);
    expect(report.failedRegistryAccessCreatesNegativeFinding).toBe(false);
    expect(report.failedWitnessAccessCreatesNegativeFinding).toBe(false);
    expect(report.searchSilenceCreatesNegativeFinding).toBe(false);
    expect(report.equivalentAggregatorSurfaceCountsAsNewProgress).toBe(false);
  });

  it('preserves all rebinding, provenance, v2, production, threshold, numeric, and hidden-stem guards', () => {
    const report = buildI184Li1998EscalatedEvidenceAdequacyRemainingPathReassessmentReview(validI183());
    expect(report.bothIdentityFunctionsRequiredBeforeRebindingReadiness).toBe(true);
    expect(report.oneIdentityFunctionResolutionSufficientForRebinding).toBe(false);
    expect(report.evidenceRebindingMethodologicallyReady).toBe(false);
    expect(report.evidenceRebindingAuthorizedByThisGate).toBe(false);
    expect(report.evidenceRebindingSelectedByThisGate).toBe(false);
    expect(report.evidenceRebindingExecutedByThisGate).toBe(false);
    expect(report.reassessmentRequirementIds).toEqual(I184_REASSESSMENT_REQUIREMENT_IDS);
    expect(report.reassessmentRequirementCount).toBe(12);
    expect(report.reassessmentRequirementsFrozen).toBe(true);
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

  it('fails closed if I183 is mutated to claim a direct registry certificate', () => {
    const mutated = {
      ...validI183(),
      direct1998CopyrightRegistrationCertificateAcquiredCount: 1,
    } as unknown as I183Li1998QualifyingWitnessEscalatedAcquisitionEvidenceReport;
    const report = buildI184Li1998EscalatedEvidenceAdequacyRemainingPathReassessmentReview(mutated);
    expect(report.status).toBe('I183_ESCALATED_EVIDENCE_BOUNDARY_INVALID');
    expect(report.decision).toBe('LI_1998_ESCALATED_EVIDENCE_ADEQUACY_REASSESSMENT_NOT_READY');
    expect(report.exactI183BoundaryAccepted).toBe(false);
    expect(report.pathLevelProgressAdequate).toBe(false);
    expect(report.remainingPathCount).toBe(0);
    expect(report.remainingPathsMethodologicallyOpen).toBe(false);
    expect(report.furtherAcquisitionExecutionAuthorizedByThisGate).toBe(false);
    expect(report.I132IndependentNormativeProvenanceRequirementRemainsNormative).toBe(false);
  });
});
