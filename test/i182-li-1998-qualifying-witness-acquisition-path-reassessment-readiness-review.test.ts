import { describe, expect, it } from 'vitest';
import type { I181Li1998DirectWitnessEvidenceAdequacyRebindingReadinessReviewReport } from '../src/research/i181-li-1998-direct-witness-acquisition-evidence-adequacy-rebinding-readiness-review.js';
import {
  I182_ACQUISITION_PATH_REQUIREMENT_IDS,
  I182_ESCALATION_PATH_IDS,
  buildI182Li1998QualifyingWitnessAcquisitionPathReassessmentReadinessReview,
} from '../src/research/i182-li-1998-qualifying-witness-acquisition-path-reassessment-readiness-review.js';

function validI181(): I181Li1998DirectWitnessEvidenceAdequacyRebindingReadinessReviewReport {
  return {
    reviewId: 'i181_fixture',
    status: 'RESOLVED_LI_1998_DIRECT_WITNESS_EVIDENCE_ADEQUACY_REBINDING_READINESS_REVIEW',
    decision:
      'I180_DIRECT_WITNESS_EVIDENCE_ADEQUATE_TO_RECORD_NONRESOLVING_PROGRESS_TWO_IDENTITY_GAPS_REMAIN_UNRESOLVED_REBINDING_NOT_READY_FURTHER_ACQUISITION_REQUIRES_QUALIFYING_PRIMARY_BINDING_OR_DIRECT_VARIANT_COMPARISON_NO_INDEPENDENCE',
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI180BoundaryAccepted: true,
    evidenceAcquisitionExecutionAccepted: true,
    evidenceObservationCount: 6,
    newDirectWitnessSurfaceCount: 1,
    validNonresolvingEvidenceProgressEstablished: true,
    qualifying1998PublicationIdentityBindingCount: 0,
    completeVariantNormalizationCount: 0,
    publicationMediumOrEntityGapResolved: false,
    canonicalDigitalWitnessNormalizationGapResolved: false,
    completePriorWitnessIdentityAdequacyEstablished: false,
    observedRepresentationPageCounts: [202, 314, 413],
    representationVarianceCreatesEditionAuthority: false,
    representationVarianceCreatesCanonicalWitnessAuthority: false,
    directCoverSeriesMarkerAddsWorkIdentityContext: true,
    directCoverSeriesMarkerResolves1998Issuer: false,
    bothIdentityFunctionsRequiredBeforeRebindingReadiness: true,
    oneLaneResolutionSufficientForRebinding: false,
    evidenceRebindingMethodologicallyReady: false,
    evidenceRebindingAuthorizedByThisGate: false,
    evidenceRebindingSelectedByThisGate: false,
    evidenceRebindingExecutedByThisGate: false,
    targetedDiscoveryExhaustionEstablished: false,
    corpusExhaustionEstablished: false,
    universalNoFurtherEvidenceClaimEstablished: false,
    explicitNegativeFindingCount: 0,
    searchSilenceCreatesNegativeFinding: false,
    failedQualifyingAcquisitionCreatesNegativeFinding: false,
    qualifyingFurtherEvidencePathCount: 5,
    furtherSameTargetAcquisitionMethodologicallyJustified: true,
    furtherSameTargetAcquisitionAuthorizedByThisGate: true,
    furtherSameTargetAcquisitionRequiresNewQualifyingEvidence: true,
    repetitiveGenericSearchAloneCountsAsProgress: false,
    adequacyRequirementCount: 10,
    adequacyRequirementsFrozen: true,
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
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_1998_QUALIFYING_WITNESS_ACQUISITION_PATH_REASSESSMENT_READINESS_REVIEW',
  } as unknown as I181Li1998DirectWitnessEvidenceAdequacyRebindingReadinessReviewReport;
}

describe('I182 Li 1998 qualifying witness acquisition path reassessment readiness review', () => {
  it('accepts exact I181 and freezes four qualifying escalation paths without acquiring evidence', () => {
    const report = buildI182Li1998QualifyingWitnessAcquisitionPathReassessmentReadinessReview(validI181());
    expect(report.status).toBe('RESOLVED_LI_1998_QUALIFYING_WITNESS_ACQUISITION_PATH_REASSESSMENT_READINESS_REVIEW');
    expect(report.decision).toBe(
      'QUALIFYING_WITNESS_ACQUISITION_ESCALATION_PATHS_FROZEN_PUBLICATION_BINDING_AND_DIRECT_VARIANT_COMPARISON_REMAIN_OPEN_NO_EVIDENCE_ACQUIRED_NO_REBINDING_NO_INDEPENDENCE',
    );
    expect(report.exactI181BoundaryAccepted).toBe(true);
    expect(report.priorNonresolvingProgressAccepted).toBe(true);
    expect(report.escalationPathIds).toEqual(I182_ESCALATION_PATH_IDS);
    expect(report.escalationPathCount).toBe(4);
    expect(report.escalationPathsFrozenProspectively).toBe(true);
    expect(report.evidenceAcquiredByThisGate).toBe(false);
  });

  it('keeps both unresolved identity functions open while making their acquisition paths ready', () => {
    const report = buildI182Li1998QualifyingWitnessAcquisitionPathReassessmentReadinessReview(validI181());
    expect(report.publicationMediumOrEntityGapStillOpen).toBe(true);
    expect(report.canonicalDigitalWitnessNormalizationGapStillOpen).toBe(true);
    expect(report.publicationIdentityEscalationReady).toBe(true);
    expect(report.directColophonImprintEscalationReady).toBe(true);
    expect(report.directComparableVariantEscalationReady).toBe(true);
    expect(report.stableFileIdentityEscalationReady).toBe(true);
    expect(report.acquisitionPathReadinessEstablished).toBe(true);
    expect(report.acquisitionExecutionAuthorized).toBe(true);
  });

  it('requires 1998-specific publication binding and prioritizes qualifying primary surfaces', () => {
    const report = buildI182Li1998QualifyingWitnessAcquisitionPathReassessmentReadinessReview(validI181());
    expect(report.explicit1998SpecificBindingRequired).toBe(true);
    expect(report.formal1998PublicationBindingAdmissible).toBe(true);
    expect(report.explicitNonformal1998DistributionBindingAdmissible).toBe(true);
    expect(report.institutionalOrPrimarySurfacePriorityRequired).toBe(true);
    expect(report.aggregatorListingMayRouteDiscovery).toBe(true);
    expect(report.aggregatorListingAloneMayResolvePublicationIdentity).toBe(false);
    expect(report.later2002MetadataMayBackfill1998Identity).toBe(false);
    expect(report.chronologyCompanyCoLocationMayEstablishPublisherIdentity).toBe(false);
  });

  it('requires direct comparable witness structure and stable file identity rather than representation metadata', () => {
    const report = buildI182Li1998QualifyingWitnessAcquisitionPathReassessmentReadinessReview(validI181());
    expect(report.directComparableWitnessAccessRequired).toBe(true);
    expect(report.comparisonMustIncludeTitleImprintTocPaginationTargetPassageAndStructure).toBe(true);
    expect(report.stableFileIdentityOrHashRequiredWhenFilesObtained).toBe(true);
    expect(report.pageCountAloneMayResolveVariantRelationship).toBe(false);
    expect(report.fileSizeAloneMayResolveVariantRelationship).toBe(false);
    expect(report.filenameAloneMayResolveVariantRelationship).toBe(false);
    expect(report.coverSurfaceAloneMayResolveCanonicalWitness).toBe(false);
  });

  it('separates path readiness from evidence acquisition and keeps rebinding fail-closed', () => {
    const report = buildI182Li1998QualifyingWitnessAcquisitionPathReassessmentReadinessReview(validI181());
    expect(report.publicationIdentityBindingAcquiredByThisGate).toBe(false);
    expect(report.variantNormalizationCompletedByThisGate).toBe(false);
    expect(report.stableFileIdentityAcquiredByThisGate).toBe(false);
    expect(report.onePathSuccessSufficientForRebinding).toBe(false);
    expect(report.bothIdentityFunctionsRequiredBeforeRebindingReadiness).toBe(true);
    expect(report.evidenceRebindingMethodologicallyReady).toBe(false);
    expect(report.evidenceRebindingAuthorizedByThisGate).toBe(false);
    expect(report.evidenceRebindingSelectedByThisGate).toBe(false);
    expect(report.evidenceRebindingExecutedByThisGate).toBe(false);
  });

  it('does not infer exhaustion or negative findings from failed access and rejects generic search inflation', () => {
    const report = buildI182Li1998QualifyingWitnessAcquisitionPathReassessmentReadinessReview(validI181());
    expect(report.targetedDiscoveryExhaustionEstablished).toBe(false);
    expect(report.corpusExhaustionEstablished).toBe(false);
    expect(report.explicitNegativeFindingCount).toBe(0);
    expect(report.searchSilenceCreatesNegativeFinding).toBe(false);
    expect(report.failedAccessCreatesNegativeFinding).toBe(false);
    expect(report.repetitiveGenericSearchAloneCountsAsProgress).toBe(false);
  });

  it('preserves requirements plus provenance, v2, production, threshold, numeric, and hidden-stem guards', () => {
    const report = buildI182Li1998QualifyingWitnessAcquisitionPathReassessmentReadinessReview(validI181());
    expect(report.acquisitionPathRequirementIds).toEqual(I182_ACQUISITION_PATH_REQUIREMENT_IDS);
    expect(report.acquisitionPathRequirementCount).toBe(12);
    expect(report.acquisitionPathRequirementsFrozen).toBe(true);
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

  it('fails closed if I181 is mutated to claim rebinding readiness', () => {
    const mutated = {
      ...validI181(),
      evidenceRebindingMethodologicallyReady: true,
    } as unknown as I181Li1998DirectWitnessEvidenceAdequacyRebindingReadinessReviewReport;
    const report = buildI182Li1998QualifyingWitnessAcquisitionPathReassessmentReadinessReview(mutated);
    expect(report.status).toBe('I181_ADEQUACY_BOUNDARY_INVALID');
    expect(report.decision).toBe('LI_1998_QUALIFYING_WITNESS_ACQUISITION_PATH_REASSESSMENT_NOT_READY');
    expect(report.exactI181BoundaryAccepted).toBe(false);
    expect(report.escalationPathCount).toBe(0);
    expect(report.acquisitionPathReadinessEstablished).toBe(false);
    expect(report.acquisitionExecutionAuthorized).toBe(false);
    expect(report.I132IndependentNormativeProvenanceRequirementRemainsNormative).toBe(false);
  });
});
