import { describe, expect, it } from 'vitest';
import type { I184Li1998EscalatedEvidenceAdequacyRemainingPathReassessmentReviewReport } from '../src/research/i184-li-1998-escalated-acquisition-evidence-adequacy-remaining-path-reassessment-review.js';
import {
  I185_ACQUISITION_REQUIREMENT_IDS,
  I185_DIRECT_PRIMARY_PATH_IDS,
  buildI185Li1998RemainingDirectPrimaryWitnessAcquisitionReadinessReview,
} from '../src/research/i185-li-1998-remaining-direct-primary-witness-acquisition-readiness-review.js';

function validI184(): I184Li1998EscalatedEvidenceAdequacyRemainingPathReassessmentReviewReport {
  return {
    reviewId: 'i184_fixture',
    status: 'RESOLVED_LI_1998_ESCALATED_EVIDENCE_ADEQUACY_REMAINING_PATH_REASSESSMENT_REVIEW',
    decision:
      'I183_ESCALATED_ACQUISITION_EVIDENCE_ADEQUATE_TO_RECORD_PATH_LEVEL_PROGRESS_ZERO_1998_BINDING_ZERO_VARIANT_NORMALIZATION_TWO_GAPS_REMAIN_UNRESOLVED_REBINDING_NOT_READY_REMAINING_PRIMARY_AND_DIRECT_WITNESS_PATHS_MAY_CONTINUE_NO_INDEPENDENCE',
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI183BoundaryAccepted: true,
    pathLevelProgressAdequate: true,
    publicationIdentityResolutionEvidenceAdequate: false,
    canonicalWitnessNormalizationEvidenceAdequate: false,
    qualifying1998PublicationIdentityBindingCount: 0,
    completeVariantNormalizationCount: 0,
    stableFileIdentityOrHashAcquiredCount: 0,
    publicationMediumOrEntityGapResolved: false,
    canonicalDigitalWitnessNormalizationGapResolved: false,
    directTargetRegistryRecordStillRequired: true,
    later2002FormalEditionMayBackfill1998PublicationIdentity: false,
    physical314PageListingMayResolve1998PublicationIdentity: false,
    representationVarianceCreatesDistinctNormativeEdition: false,
    representationVarianceCreatesCanonicalWitness: false,
    directFullComparableWitnessesStillRequired: true,
    stableFileIdentityOrTransformationProvenanceStillRequired: true,
    remainingPathIds: [
      'DIRECT_TARGET_TITLE_COPYRIGHT_REGISTRY_CERTIFICATE_OR_REGISTRATION_NUMBER',
      'DIRECT_1998_PRIMARY_COLOPHON_IMPRINT_OR_DISTRIBUTION_RECORD',
      'DIRECT_FULL_314_OR_413_WITNESS_ACQUISITION',
      'DIRECT_FULL_202_OR_422_REFERENCE_WITNESS_FOR_STRUCTURAL_COMPARISON',
      'STABLE_FILE_HASH_OR_TRANSFORMATION_PROVENANCE_FOR_COMPARABLE_VARIANTS',
    ],
    remainingPathCount: 5,
    remainingPathsMethodologicallyOpen: true,
    furtherAcquisitionExecutionAuthorizedByThisGate: true,
    evidenceAcquiredByThisGate: false,
    directRegistryEvidenceAcquiredByThisGate: false,
    direct1998PublicationBindingAcquiredByThisGate: false,
    directComparableWitnessAcquiredByThisGate: false,
    stableFileIdentityAcquiredByThisGate: false,
    targetedDiscoveryExhaustionEstablished: false,
    corpusExhaustionEstablished: false,
    explicitNegativeFindingCount: 0,
    failedRegistryAccessCreatesNegativeFinding: false,
    failedWitnessAccessCreatesNegativeFinding: false,
    searchSilenceCreatesNegativeFinding: false,
    equivalentAggregatorSurfaceCountsAsNewProgress: false,
    bothIdentityFunctionsRequiredBeforeRebindingReadiness: true,
    oneIdentityFunctionResolutionSufficientForRebinding: false,
    evidenceRebindingMethodologicallyReady: false,
    evidenceRebindingAuthorizedByThisGate: false,
    evidenceRebindingSelectedByThisGate: false,
    evidenceRebindingExecutedByThisGate: false,
    reassessmentRequirementCount: 12,
    reassessmentRequirementsFrozen: true,
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
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_1998_REMAINING_DIRECT_PRIMARY_WITNESS_ACQUISITION_READINESS_REVIEW',
  } as unknown as I184Li1998EscalatedEvidenceAdequacyRemainingPathReassessmentReviewReport;
}

describe('I185 Li 1998 remaining direct primary witness acquisition readiness review', () => {
  it('accepts exact I184 and freezes all five remaining direct-primary acquisition paths', () => {
    const report = buildI185Li1998RemainingDirectPrimaryWitnessAcquisitionReadinessReview(validI184());
    expect(report.status).toBe('RESOLVED_LI_1998_REMAINING_DIRECT_PRIMARY_WITNESS_ACQUISITION_READINESS_REVIEW');
    expect(report.decision).toBe(
      'I184_FIVE_REMAINING_DIRECT_PRIMARY_PATHS_ACCEPTED_ACQUISITION_REQUIREMENTS_FROZEN_EXECUTION_READY_NO_EVIDENCE_ACQUIRED_TWO_GAPS_UNRESOLVED_NO_REBINDING_NO_INDEPENDENCE',
    );
    expect(report.exactI184BoundaryAccepted).toBe(true);
    expect(report.directPrimaryPathIds).toEqual(I185_DIRECT_PRIMARY_PATH_IDS);
    expect(report.directPrimaryPathCount).toBe(5);
    expect(report.directPrimaryPathRequirementCount).toBe(5);
    expect(report.pathPrioritiesFrozenProspectively).toBe(true);
    expect(report.acquisitionReadinessEstablished).toBe(true);
    expect(report.boundedAcquisitionExecutionAuthorizedByThisGate).toBe(true);
  });

  it('requires exact target registry and 1998-specific publication binding without later-edition backfill', () => {
    const report = buildI185Li1998RemainingDirectPrimaryWitnessAcquisitionReadinessReview(validI184());
    expect(report.directTargetRegistryCertificateOrRegistrationNumberRequired).toBe(true);
    expect(report.directTargetRegistryMustBindExactTargetTitle).toBe(true);
    expect(report.directTargetRegistryMustBindAuthorIdentity).toBe(true);
    expect(report.directTargetRegistryContextWithoutRecordMayResolveGap).toBe(false);
    expect(report.direct1998PublicationBindingRequired).toBe(true);
    expect(report.formal1998BindingMayUsePublisherIssuerOrDistributor).toBe(true);
    expect(report.explicitNonformal1998DistributionBindingAdmissible).toBe(true);
    expect(report.chronologyCompanyCoLocationMayEstablishPublisherIdentity).toBe(false);
    expect(report.later2002FormalMetadataMayBackfill1998Identity).toBe(false);
    expect(report.laterEditionTocContinuityMayBackfill1998Identity).toBe(false);
  });

  it('requires direct full witness comparison plus stable file or transformation provenance for normalization', () => {
    const report = buildI185Li1998RemainingDirectPrimaryWitnessAcquisitionReadinessReview(validI184());
    expect(report.directFullComparableWitnessAccessRequired).toBe(true);
    expect(report.comparisonTitleImprintCopyrightRequired).toBe(true);
    expect(report.comparisonTocPaginationTargetPassageStructureRequired).toBe(true);
    expect(report.comparisonAdditionDeletionReorderingRequired).toBe(true);
    expect(report.stableFileHashOrTransformationProvenanceRequired).toBe(true);
    expect(report.directPrimaryPathRequirements[2]?.targetGap).toBe('LI_1998_CANONICAL_DIGITAL_WITNESS_NORMALIZATION_GAP');
    expect(report.directPrimaryPathRequirements[4]?.priority).toBe(5);
  });

  it('keeps page count, physical format, file size, filename, cover and aggregator surfaces non-authoritative', () => {
    const report = buildI185Li1998RemainingDirectPrimaryWitnessAcquisitionReadinessReview(validI184());
    expect(report.pageCountAloneMayResolveVariantIdentity).toBe(false);
    expect(report.physicalFormatAloneMayResolveVariantIdentity).toBe(false);
    expect(report.fileSizeAloneMayResolveVariantIdentity).toBe(false);
    expect(report.filenameAloneMayResolveVariantIdentity).toBe(false);
    expect(report.coverSurfaceAloneMayResolveVariantIdentity).toBe(false);
    expect(report.aggregatorMayRouteDiscovery).toBe(true);
    expect(report.aggregatorAloneMayResolvePublicationIdentity).toBe(false);
    expect(report.aggregatorAloneMayResolveCanonicalWitnessNormalization).toBe(false);
  });

  it('acquires no evidence and resolves neither gap at readiness time', () => {
    const report = buildI185Li1998RemainingDirectPrimaryWitnessAcquisitionReadinessReview(validI184());
    expect(report.publicationMediumOrEntityGapStillOpen).toBe(true);
    expect(report.canonicalDigitalWitnessNormalizationGapStillOpen).toBe(true);
    expect(report.evidenceAcquiredByThisGate).toBe(false);
    expect(report.directRegistryEvidenceAcquiredByThisGate).toBe(false);
    expect(report.direct1998PublicationBindingAcquiredByThisGate).toBe(false);
    expect(report.directComparableWitnessAcquiredByThisGate).toBe(false);
    expect(report.stableFileIdentityAcquiredByThisGate).toBe(false);
    expect(report.publicationMediumOrEntityGapResolvedByThisGate).toBe(false);
    expect(report.canonicalDigitalWitnessNormalizationGapResolvedByThisGate).toBe(false);
  });

  it('does not turn failed access or search silence into negative or exhaustion findings', () => {
    const report = buildI185Li1998RemainingDirectPrimaryWitnessAcquisitionReadinessReview(validI184());
    expect(report.targetedDiscoveryExhaustionEstablished).toBe(false);
    expect(report.corpusExhaustionEstablished).toBe(false);
    expect(report.explicitNegativeFindingCount).toBe(0);
    expect(report.failedRegistryAccessCreatesNegativeFinding).toBe(false);
    expect(report.failedWitnessAccessCreatesNegativeFinding).toBe(false);
    expect(report.searchSilenceCreatesNegativeFinding).toBe(false);
    expect(report.repetitiveEquivalentSurfaceCountsAsProgress).toBe(false);
  });

  it('freezes 14 controls and preserves rebinding, independence, v2, threshold, numeric and production guards', () => {
    const report = buildI185Li1998RemainingDirectPrimaryWitnessAcquisitionReadinessReview(validI184());
    expect(report.acquisitionRequirementIds).toEqual(I185_ACQUISITION_REQUIREMENT_IDS);
    expect(report.acquisitionRequirementCount).toBe(14);
    expect(report.acquisitionRequirementsFrozen).toBe(true);
    expect(report.bothIdentityFunctionsRequiredBeforeRebindingReadiness).toBe(true);
    expect(report.oneIdentityFunctionResolutionSufficientForRebinding).toBe(false);
    expect(report.evidenceRebindingMethodologicallyReady).toBe(false);
    expect(report.evidenceRebindingAuthorizedByThisGate).toBe(false);
    expect(report.evidenceRebindingExecutedByThisGate).toBe(false);
    expect(report.prior1998WitnessIndependentProvenanceEstablished).toBe(false);
    expect(report.independentNormativeProvenanceEstablishedCount).toBe(0);
    expect(report.I132IndependentNormativeProvenanceRequirementRemainsNormative).toBe(true);
    expect(report.I132PolicyRelaxationAuthorizedByThisGate).toBe(false);
    expect(report.currentV2PackageAndCandidateSetRemainImmutable).toBe(true);
    expect(report.currentV2ProvenanceDisposition).toBe('BLOCKED_UNDER_CURRENT_EVIDENCE');
    expect(report.candidateSetReevaluationAuthorizedByThisGate).toBe(false);
    expect(report.actualCompositionPerformedByThisGate).toBe(false);
    expect(report.multiSourceCompositionAuthorized).toBe(false);
    expect(report.visibleStemBinaryEffectiveInteractionEligibilityResolved).toBe(false);
    expect(report.thresholdRuleCreatedByThisGate).toBe(false);
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
    expect(report.hiddenStemAuthorityGap).toBe('SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED');
  });

  it('fails closed if the exact I184 five-path boundary is mutated', () => {
    const mutated = {
      ...validI184(),
      remainingPathCount: 4,
    } as unknown as I184Li1998EscalatedEvidenceAdequacyRemainingPathReassessmentReviewReport;
    const report = buildI185Li1998RemainingDirectPrimaryWitnessAcquisitionReadinessReview(mutated);
    expect(report.status).toBe('I184_REMAINING_PATH_BOUNDARY_INVALID');
    expect(report.decision).toBe('LI_1998_REMAINING_DIRECT_PRIMARY_WITNESS_ACQUISITION_NOT_READY');
    expect(report.exactI184BoundaryAccepted).toBe(false);
    expect(report.directPrimaryPathCount).toBe(0);
    expect(report.directPrimaryPathRequirementCount).toBe(0);
    expect(report.acquisitionReadinessEstablished).toBe(false);
    expect(report.boundedAcquisitionExecutionAuthorizedByThisGate).toBe(false);
    expect(report.I132IndependentNormativeProvenanceRequirementRemainsNormative).toBe(false);
  });
});
