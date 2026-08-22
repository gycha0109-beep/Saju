import { describe, expect, it } from 'vitest';
import type { I176Li1998GapTargetedDiscoveryReadinessReviewReport } from '../src/research/i176-li-1998-publication-medium-canonical-witness-gap-targeted-discovery-readiness-review.js';
import { buildI177Li1998GapTargetedDiscoveryEvidence } from '../src/research/i177-li-1998-publication-medium-canonical-witness-gap-targeted-discovery-evidence.js';

function validI176(): I176Li1998GapTargetedDiscoveryReadinessReviewReport {
  return {
    reviewId: 'i176_fixture',
    status: 'RESOLVED_LI_1998_PUBLICATION_MEDIUM_CANONICAL_WITNESS_GAP_TARGETED_DISCOVERY_READINESS_REVIEW',
    decision:
      'TWO_LI_1998_IDENTITY_GAPS_READY_FOR_BOUNDED_TARGETED_DISCOVERY_1998_SPECIFIC_PUBLICATION_BINDING_AND_CANONICAL_WITNESS_NORMALIZATION_REQUIRED_NO_REBINDING_NO_INDEPENDENCE',
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI175BoundaryAccepted: true,
    targetGapCount: 2,
    targetGapIds: [
      'LI_1998_PUBLICATION_MEDIUM_OR_ENTITY_IDENTITY_GAP',
      'LI_1998_CANONICAL_DIGITAL_WITNESS_NORMALIZATION_GAP',
    ],
    discoveryControlCount: 12,
    discoveryControlsFrozenProspectively: true,
    publicationMediumSearchChannelCount: 5,
    witnessNormalizationSearchChannelCount: 5,
    publicationMediumResolutionRequires1998SpecificBinding: true,
    laterEditionMetadataMayBackfill1998: false,
    ambiguousMetadataMayEstablishPublicationStatusWithoutFieldDisambiguation: false,
    canonicalWitnessNormalizationRequiresContentComparison: true,
    pageCountDifferenceAloneCreatesDistinctEdition: false,
    fileSizeDifferenceAloneCreatesDistinctEdition: false,
    filenameDifferenceAloneCreatesDistinctEdition: false,
    searchSilenceCreatesNegativeFinding: false,
    boundedTargetedDiscoveryMayProceed: true,
    authorizationIsDiscoveryEvidenceCollection: true,
    authorizationIsEvidenceRebinding: false,
    authorizationIsProvenanceIndependenceAdjudication: false,
    evidenceRebindingMethodologicallyReady: false,
    evidenceRebindingSelectedByThisGate: false,
    evidenceRebindingExecutedByThisGate: false,
    provenanceIndependenceAdjudicatedByThisGate: false,
    independentNormativeProvenanceEstablishedCount: 0,
    I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate: false,
    I132IndependentNormativeProvenanceRequirementRemainsNormative: true,
    I132PolicyRelaxationAuthorizedByThisGate: false,
    current2004WitnessPresumedOriginRetired: true,
    prior1998SameAuthorWitnessConfirmed: true,
    prior1998WitnessIndependentProvenanceEstablished: false,
    sameAuthor1998To2004DerivativeChainMustRemainBound: true,
    externalLineageUnresolvedQuestionCount: 3,
    externalLineageUnresolvedStatusPreserved: true,
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
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_1998_PUBLICATION_MEDIUM_CANONICAL_WITNESS_GAP_TARGETED_DISCOVERY_EVIDENCE',
  } as unknown as I176Li1998GapTargetedDiscoveryReadinessReviewReport;
}

describe('I177 Li 1998 publication-medium and canonical-witness targeted discovery evidence', () => {
  it('accepts the exact I176 boundary and records two unresolved findings', () => {
    const report = buildI177Li1998GapTargetedDiscoveryEvidence(validI176());
    expect(report.status).toBe('RESOLVED_LI_1998_PUBLICATION_MEDIUM_CANONICAL_WITNESS_GAP_TARGETED_DISCOVERY_EVIDENCE');
    expect(report.decision).toBe(
      'BOUNDED_TWO_GAP_DISCOVERY_EXECUTED_PUBLICATION_MEDIUM_AND_CANONICAL_WITNESS_NORMALIZATION_BOTH_REMAIN_UNRESOLVED_NO_EXPLICIT_NEGATIVE_NO_REBINDING_NO_INDEPENDENCE',
    );
    expect(report.targetedGapCount).toBe(2);
    expect(report.resolvedGapCount).toBe(0);
    expect(report.unresolvedGapCount).toBe(2);
    expect(report.explicitNegativeFindingCount).toBe(0);
    expect(report.gapEvidenceRecords.map((record) => record.finding)).toEqual([
      'UNRESOLVED_AFTER_BOUNDED_TARGETED_DISCOVERY',
      'UNRESOLVED_AFTER_BOUNDED_TARGETED_DISCOVERY',
    ]);
  });

  it('keeps the 1998 publication-medium and issuing-entity identity unresolved', () => {
    const report = buildI177Li1998GapTargetedDiscoveryEvidence(validI176());
    expect(report.official1998AppearanceRecordObserved).toBe(true);
    expect(report.official1998CompanyCreationRecordObserved).toBe(true);
    expect(report.companyCreationAndBookAppearanceCoLocatedInChronology).toBe(true);
    expect(report.official1998PublisherOrIssuingEntityBound).toBe(false);
    expect(report.companyMayBeInferredAs1998PublisherFromChronologyCoLocation).toBe(false);
    expect(report.formal1998PublisherOrIsbnEstablished).toBe(false);
    expect(report.explicit1998NonformalPublicationStatusEstablished).toBe(false);
  });

  it('forbids later-edition and ambiguous uploader metadata from backfilling 1998', () => {
    const report = buildI177Li1998GapTargetedDiscoveryEvidence(validI176());
    expect(report.later2002FormalEditionObserved).toBe(true);
    expect(report.later2002FormalEditionMayBackfill1998).toBe(false);
    expect(report.ambiguousUploaderFieldObserved).toBe(true);
    expect(report.ambiguousUploaderFieldRoleDisambiguatedAsPublicationStatus).toBe(false);
    expect(report.ambiguousUploaderFieldResolves1998PublicationMedium).toBe(false);
    expect(report.retail314PageBookRepresentationObserved).toBe(true);
    expect(report.retail314PageBookRepresentationBoundSpecificallyTo1998).toBe(false);
  });

  it('records multiple digital representations without declaring a canonical witness', () => {
    const report = buildI177Li1998GapTargetedDiscoveryEvidence(validI176());
    expect(report.digital314PageRepresentationObserved).toBe(true);
    expect(report.digital413PageRepresentationObserved).toBe(true);
    expect(report.multipleFileSizeRepresentationsObserved).toBe(true);
    expect(report.observedRepresentationPageCounts).toEqual([314, 413]);
    expect(report.observedRepresentationSizesMb).toEqual([15.48, 47.37, 47.44, 49.6]);
    expect(report.titleAuthorAndTargetContentContinuityObservedAcrossPublicWitnesses).toBe(true);
    expect(report.canonicalDigitalWitnessEstablished).toBe(false);
    expect(report.normalizedWitnessFamilyEstablished).toBe(false);
  });

  it('does not infer distinct editions or exhaustion from superficial representation differences or silence', () => {
    const report = buildI177Li1998GapTargetedDiscoveryEvidence(validI176());
    expect(report.titleOrImprintPageComparisonCompletedAcrossVariants).toBe(false);
    expect(report.editionSpecificAdditionDeletionReorderingComparisonCompleted).toBe(false);
    expect(report.allObservedDigitalVariantRelationshipsExplicitlyResolved).toBe(false);
    expect(report.pageCountDifferenceAloneCreatesDistinctEdition).toBe(false);
    expect(report.fileSizeDifferenceAloneCreatesDistinctEdition).toBe(false);
    expect(report.filenameDifferenceAloneCreatesDistinctEdition).toBe(false);
    expect(report.searchSilenceCreatesNegativeFinding).toBe(false);
    expect(report.targetedDiscoveryExhaustionEstablished).toBe(false);
  });

  it('does not authorize rebinding, remediation, candidate mutation, or version creation', () => {
    const report = buildI177Li1998GapTargetedDiscoveryEvidence(validI176());
    expect(report.evidenceRebindingMethodologicallyReadyByThisGate).toBe(false);
    expect(report.evidenceRebindingAuthorizedByThisGate).toBe(false);
    expect(report.evidenceRebindingSelectedByThisGate).toBe(false);
    expect(report.evidenceRebindingExecutedByThisGate).toBe(false);
    expect(report.candidateSelectedByThisGate).toBe(false);
    expect(report.remediationStrategySelectedByThisGate).toBe(false);
    expect(report.remediationExecutionAuthorizedByThisGate).toBe(false);
    expect(report.candidateSetMutatedByThisGate).toBe(false);
    expect(report.newCandidateSetVersionCreatedByThisGate).toBe(false);
    expect(report.newInputPackageVersionCreatedByThisGate).toBe(false);
  });

  it('preserves I132, same-author lineage, frozen v2, production, threshold, numeric, and hidden-stem guards', () => {
    const report = buildI177Li1998GapTargetedDiscoveryEvidence(validI176());
    expect(report.provenanceIndependenceAdjudicatedByThisGate).toBe(false);
    expect(report.independentNormativeProvenanceEstablishedCount).toBe(0);
    expect(report.I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate).toBe(false);
    expect(report.I132IndependentNormativeProvenanceRequirementRemainsNormative).toBe(true);
    expect(report.I132PolicyRelaxationAuthorizedByThisGate).toBe(false);
    expect(report.current2004WitnessPresumedOriginRetired).toBe(true);
    expect(report.prior1998SameAuthorWitnessConfirmed).toBe(true);
    expect(report.prior1998WitnessIndependentProvenanceEstablished).toBe(false);
    expect(report.sameAuthor1998To2004DerivativeChainMustRemainBound).toBe(true);
    expect(report.externalLineageUnresolvedQuestionCount).toBe(3);
    expect(report.externalLineageUnresolvedStatusPreserved).toBe(true);
    expect(report.currentV2PackageAndCandidateSetRemainImmutable).toBe(true);
    expect(report.currentV2ProvenanceDisposition).toBe('BLOCKED_UNDER_CURRENT_EVIDENCE');
    expect(report.candidateSetReevaluationAuthorizedByThisGate).toBe(false);
    expect(report.productionPolicyExecutionAuthorized).toBe(false);
    expect(report.actualCompositionPerformedByThisGate).toBe(false);
    expect(report.multiSourceCompositionAuthorized).toBe(false);
    expect(report.visibleStemBinaryEffectiveInteractionEligibilityResolved).toBe(false);
    expect(report.thresholdRuleCreatedByThisGate).toBe(false);
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
    expect(report.hiddenStemAuthorityGap).toBe('SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED');
  });

  it('fails closed if I176 claims evidence-rebinding readiness', () => {
    const mutated = {
      ...validI176(),
      evidenceRebindingMethodologicallyReady: true,
    } as unknown as I176Li1998GapTargetedDiscoveryReadinessReviewReport;
    const report = buildI177Li1998GapTargetedDiscoveryEvidence(mutated);
    expect(report.status).toBe('I176_DISCOVERY_BOUNDARY_INVALID');
    expect(report.decision).toBe('LI_1998_TWO_GAP_TARGETED_DISCOVERY_EVIDENCE_NOT_EXECUTED');
    expect(report.exactI176BoundaryAccepted).toBe(false);
    expect(report.targetedGapCount).toBe(0);
    expect(report.unresolvedGapCount).toBe(0);
    expect(report.gapEvidenceRecords).toEqual([]);
    expect(report.I132IndependentNormativeProvenanceRequirementRemainsNormative).toBe(false);
  });
});
