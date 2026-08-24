import { describe, expect, it } from 'vitest';
import type { I175Li1998IdentityEvidenceAdequacyRebindingReadinessReviewReport } from '../src/research/i175-li-1998-prior-witness-identity-evidence-adequacy-rebinding-readiness-review.js';
import {
  I176_DISCOVERY_CONTROL_IDS,
  I176_PUBLICATION_MEDIUM_SEARCH_CHANNEL_IDS,
  I176_WITNESS_NORMALIZATION_SEARCH_CHANNEL_IDS,
  buildI176Li1998GapTargetedDiscoveryReadinessReview,
} from '../src/research/i176-li-1998-publication-medium-canonical-witness-gap-targeted-discovery-readiness-review.js';

function validI175(): I175Li1998IdentityEvidenceAdequacyRebindingReadinessReviewReport {
  return {
    reviewId: 'i175_fixture',
    status: 'RESOLVED_LI_1998_IDENTITY_EVIDENCE_ADEQUACY_REBINDING_READINESS_REVIEW',
    decision:
      'LI_1998_IDENTITY_EVIDENCE_PARTIALLY_ADEQUATE_FOUR_OF_SIX_FUNCTIONS_SATISFIED_PUBLICATION_MEDIUM_AND_CANONICAL_WITNESS_NORMALIZATION_UNRESOLVED_REBINDING_NOT_READY_TARGETED_GAP_DISCOVERY_MAY_PROCEED_NO_INDEPENDENCE',
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI174BoundaryAccepted: true,
    evaluatedIdentityFunctionCount: 6,
    satisfiedIdentityFunctionCount: 4,
    unresolvedIdentityFunctionCount: 2,
    partialIdentityEvidenceAdequacyEstablished: true,
    completeIdentityEvidenceAdequacyEstablished: false,
    publicationMediumOrEntityIdentityResolved: false,
    canonicalDigitalWitnessNormalizationResolved: false,
    evidenceRebindingMethodologicallyReady: false,
    evidenceRebindingAuthorizedByThisGate: false,
    evidenceRebindingSelectedByThisGate: false,
    evidenceRebindingExecutedByThisGate: false,
    targetedGapIds: [
      'LI_1998_PUBLICATION_MEDIUM_OR_ENTITY_IDENTITY_GAP',
      'LI_1998_CANONICAL_DIGITAL_WITNESS_NORMALIZATION_GAP',
    ],
    targetedGapCount: 2,
    targetedGapDiscoveryReadinessReviewMethodologicallyJustified: true,
    targetedGapDiscoveryReadinessReviewAuthorized: true,
    adequacyRequirementCount: 10,
    adequacyRequirementsFrozen: true,
    current2004WitnessPresumedOriginRetired: true,
    prior1998SameAuthorWitnessConfirmed: true,
    prior1998WitnessIndependentProvenanceEstablished: false,
    sameAuthor1998To2004DerivativeChainMustRemainBound: true,
    externalLineageUnresolvedQuestionCount: 3,
    externalLineageUnresolvedStatusPreserved: true,
    candidateSelectedByThisGate: false,
    remediationStrategySelectedByThisGate: false,
    remediationExecutionAuthorizedByThisGate: false,
    candidateSetMutatedByThisGate: false,
    candidateRemovedByThisGate: false,
    candidateReplacedByThisGate: false,
    newCandidateSetVersionCreatedByThisGate: false,
    newInputPackageVersionCreatedByThisGate: false,
    provenanceIndependenceAdjudicatedByThisGate: false,
    independentNormativeProvenanceEstablishedCount: 0,
    I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate: false,
    I132IndependentNormativeProvenanceRequirementRemainsNormative: true,
    I132PolicyRelaxationAuthorizedByThisGate: false,
    searchSilenceCreatesNegativeFinding: false,
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
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_1998_PUBLICATION_MEDIUM_CANONICAL_WITNESS_GAP_TARGETED_DISCOVERY_READINESS_REVIEW',
  } as unknown as I175Li1998IdentityEvidenceAdequacyRebindingReadinessReviewReport;
}

describe('I176 Li 1998 publication-medium and canonical-witness gap discovery readiness', () => {
  it('accepts the exact I175 boundary and binds exactly two gaps', () => {
    const report = buildI176Li1998GapTargetedDiscoveryReadinessReview(validI175());
    expect(report.status).toBe('RESOLVED_LI_1998_PUBLICATION_MEDIUM_CANONICAL_WITNESS_GAP_TARGETED_DISCOVERY_READINESS_REVIEW');
    expect(report.exactI175BoundaryAccepted).toBe(true);
    expect(report.targetGapIds).toEqual([
      'LI_1998_PUBLICATION_MEDIUM_OR_ENTITY_IDENTITY_GAP',
      'LI_1998_CANONICAL_DIGITAL_WITNESS_NORMALIZATION_GAP',
    ]);
    expect(report.targetGapCount).toBe(2);
  });

  it('freezes twelve controls and two five-channel discovery plans', () => {
    const report = buildI176Li1998GapTargetedDiscoveryReadinessReview(validI175());
    expect(report.discoveryControlIds).toEqual(I176_DISCOVERY_CONTROL_IDS);
    expect(report.discoveryControlCount).toBe(12);
    expect(report.discoveryControlsFrozenProspectively).toBe(true);
    expect(report.publicationMediumSearchChannelIds).toEqual(I176_PUBLICATION_MEDIUM_SEARCH_CHANNEL_IDS);
    expect(report.publicationMediumSearchChannelCount).toBe(5);
    expect(report.witnessNormalizationSearchChannelIds).toEqual(I176_WITNESS_NORMALIZATION_SEARCH_CHANNEL_IDS);
    expect(report.witnessNormalizationSearchChannelCount).toBe(5);
  });

  it('requires 1998-specific publication binding and forbids metadata backfill', () => {
    const report = buildI176Li1998GapTargetedDiscoveryReadinessReview(validI175());
    expect(report.publicationMediumResolutionRequires1998SpecificBinding).toBe(true);
    expect(report.laterEditionMetadataMayBackfill1998).toBe(false);
    expect(report.ambiguousMetadataMayEstablishPublicationStatusWithoutFieldDisambiguation).toBe(false);
    expect(report.imprintOrColophonWitnessPreferred).toBe(true);
    expect(report.explicitNonformalStatusMayResolvePublicationMediumIf1998SpecificAndReproducible).toBe(true);
    expect(report.formalPublisherOrIsbnRequiredUnconditionally).toBe(false);
  });

  it('requires content-aware witness normalization rather than superficial file differences', () => {
    const report = buildI176Li1998GapTargetedDiscoveryReadinessReview(validI175());
    expect(report.canonicalWitnessNormalizationRequiresContentComparison).toBe(true);
    expect(report.pageCountDifferenceAloneCreatesDistinctEdition).toBe(false);
    expect(report.fileSizeDifferenceAloneCreatesDistinctEdition).toBe(false);
    expect(report.filenameDifferenceAloneCreatesDistinctEdition).toBe(false);
    expect(report.duplicateDerivativeScanRelationshipMustBeRecorded).toBe(true);
  });

  it('authorizes bounded discovery evidence collection only', () => {
    const report = buildI176Li1998GapTargetedDiscoveryReadinessReview(validI175());
    expect(report.boundedTargetedDiscoveryMayProceed).toBe(true);
    expect(report.authorizationIsDiscoveryEvidenceCollection).toBe(true);
    expect(report.authorizationIsEvidenceRebinding).toBe(false);
    expect(report.authorizationIsProvenanceIndependenceAdjudication).toBe(false);
    expect(report.evidenceRebindingMethodologicallyReady).toBe(false);
    expect(report.evidenceRebindingSelectedByThisGate).toBe(false);
    expect(report.evidenceRebindingExecutedByThisGate).toBe(false);
  });

  it('preserves the 2004/1998 lineage boundary and three unresolved external-lineage questions', () => {
    const report = buildI176Li1998GapTargetedDiscoveryReadinessReview(validI175());
    expect(report.current2004WitnessPresumedOriginRetired).toBe(true);
    expect(report.prior1998SameAuthorWitnessConfirmed).toBe(true);
    expect(report.prior1998WitnessIndependentProvenanceEstablished).toBe(false);
    expect(report.sameAuthor1998To2004DerivativeChainMustRemainBound).toBe(true);
    expect(report.externalLineageUnresolvedQuestionCount).toBe(3);
    expect(report.externalLineageUnresolvedStatusPreserved).toBe(true);
  });

  it('preserves I132, frozen v2, production, threshold, numeric, and hidden-stem guards', () => {
    const report = buildI176Li1998GapTargetedDiscoveryReadinessReview(validI175());
    expect(report.searchSilenceCreatesNegativeFinding).toBe(false);
    expect(report.provenanceIndependenceAdjudicatedByThisGate).toBe(false);
    expect(report.independentNormativeProvenanceEstablishedCount).toBe(0);
    expect(report.I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate).toBe(false);
    expect(report.I132IndependentNormativeProvenanceRequirementRemainsNormative).toBe(true);
    expect(report.I132PolicyRelaxationAuthorizedByThisGate).toBe(false);
    expect(report.currentV2PackageAndCandidateSetRemainImmutable).toBe(true);
    expect(report.currentV2ProvenanceDisposition).toBe('BLOCKED_UNDER_CURRENT_EVIDENCE');
    expect(report.candidateSetReevaluationAuthorizedByThisGate).toBe(false);
    expect(report.productionPolicyExecutionAuthorized).toBe(false);
    expect(report.visibleStemBinaryEffectiveInteractionEligibilityResolved).toBe(false);
    expect(report.thresholdRuleCreatedByThisGate).toBe(false);
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
    expect(report.hiddenStemAuthorityGap).toBe('SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED');
  });

  it('fails closed if I175 claims rebinding readiness', () => {
    const mutated = {
      ...validI175(),
      evidenceRebindingMethodologicallyReady: true,
    } as unknown as I175Li1998IdentityEvidenceAdequacyRebindingReadinessReviewReport;
    const report = buildI176Li1998GapTargetedDiscoveryReadinessReview(mutated);
    expect(report.status).toBe('I175_TWO_GAP_BOUNDARY_INVALID');
    expect(report.decision).toBe('LI_1998_IDENTITY_GAP_TARGETED_DISCOVERY_NOT_READY');
    expect(report.exactI175BoundaryAccepted).toBe(false);
    expect(report.targetGapCount).toBe(0);
    expect(report.boundedTargetedDiscoveryMayProceed).toBe(false);
  });
});
