import { describe, expect, it } from 'vitest';
import type { I177Li1998GapTargetedDiscoveryEvidenceReport } from '../src/research/i177-li-1998-publication-medium-canonical-witness-gap-targeted-discovery-evidence.js';
import {
  I178_REASSESSMENT_REQUIREMENT_IDS,
  I178_REVIEWABLE_PATH_IDS,
  buildI178Li1998TwoGapReassessmentReview,
} from '../src/research/i178-li-1998-two-gap-reassessment-review.js';

function validI177(): I177Li1998GapTargetedDiscoveryEvidenceReport {
  return {
    evidenceRecordSetId: 'i177_fixture',
    evidenceVersion: 'myeonghwa-li-1998-publication-medium-canonical-witness-gap-targeted-discovery-evidence-v1',
    status: 'RESOLVED_LI_1998_PUBLICATION_MEDIUM_CANONICAL_WITNESS_GAP_TARGETED_DISCOVERY_EVIDENCE',
    decision:
      'BOUNDED_TWO_GAP_DISCOVERY_EXECUTED_PUBLICATION_MEDIUM_AND_CANONICAL_WITNESS_NORMALIZATION_BOTH_REMAIN_UNRESOLVED_NO_EXPLICIT_NEGATIVE_NO_REBINDING_NO_INDEPENDENCE',
    upstreamI176ReviewId: 'i176_fixture',
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI176BoundaryAccepted: true,
    targetedGapCount: 2,
    resolvedGapCount: 0,
    unresolvedGapCount: 2,
    explicitNegativeFindingCount: 0,
    gapEvidenceRecords: [
      {
        targetGapId: 'LI_1998_PUBLICATION_MEDIUM_OR_ENTITY_IDENTITY_GAP',
        finding: 'UNRESOLVED_AFTER_BOUNDED_TARGETED_DISCOVERY',
        sourceLocators: [],
        evidenceSummary: [],
        unresolvedReason: 'fixture',
      },
      {
        targetGapId: 'LI_1998_CANONICAL_DIGITAL_WITNESS_NORMALIZATION_GAP',
        finding: 'UNRESOLVED_AFTER_BOUNDED_TARGETED_DISCOVERY',
        sourceLocators: [],
        evidenceSummary: [],
        unresolvedReason: 'fixture',
      },
    ],
    official1998AppearanceRecordObserved: true,
    official1998CompanyCreationRecordObserved: true,
    companyCreationAndBookAppearanceCoLocatedInChronology: true,
    official1998PublisherOrIssuingEntityBound: false,
    companyMayBeInferredAs1998PublisherFromChronologyCoLocation: false,
    formal1998PublisherOrIsbnEstablished: false,
    explicit1998NonformalPublicationStatusEstablished: false,
    later2002FormalEditionObserved: true,
    later2002FormalEditionMayBackfill1998: false,
    ambiguousUploaderFieldObserved: true,
    ambiguousUploaderFieldRoleDisambiguatedAsPublicationStatus: false,
    ambiguousUploaderFieldResolves1998PublicationMedium: false,
    retail314PageBookRepresentationObserved: true,
    retail314PageBookRepresentationBoundSpecificallyTo1998: false,
    digital314PageRepresentationObserved: true,
    digital413PageRepresentationObserved: true,
    multipleFileSizeRepresentationsObserved: true,
    observedRepresentationPageCounts: [314, 413],
    observedRepresentationSizesMb: [15.48, 47.37, 47.44, 49.6],
    titleAuthorAndTargetContentContinuityObservedAcrossPublicWitnesses: true,
    titleOrImprintPageComparisonCompletedAcrossVariants: false,
    editionSpecificAdditionDeletionReorderingComparisonCompleted: false,
    canonicalDigitalWitnessEstablished: false,
    normalizedWitnessFamilyEstablished: false,
    allObservedDigitalVariantRelationshipsExplicitlyResolved: false,
    pageCountDifferenceAloneCreatesDistinctEdition: false,
    fileSizeDifferenceAloneCreatesDistinctEdition: false,
    filenameDifferenceAloneCreatesDistinctEdition: false,
    searchSilenceCreatesNegativeFinding: false,
    targetedDiscoveryExhaustionEstablished: false,
    evidenceRebindingMethodologicallyReadyByThisGate: false,
    evidenceRebindingAuthorizedByThisGate: false,
    evidenceRebindingSelectedByThisGate: false,
    evidenceRebindingExecutedByThisGate: false,
    candidateSelectedByThisGate: false,
    remediationStrategySelectedByThisGate: false,
    remediationExecutionAuthorizedByThisGate: false,
    candidateSetMutatedByThisGate: false,
    newCandidateSetVersionCreatedByThisGate: false,
    newInputPackageVersionCreatedByThisGate: false,
    provenanceIndependenceAdjudicatedByThisGate: false,
    independentNormativeProvenanceEstablishedCount: 0,
    I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate: false,
    I132IndependentNormativeProvenanceRequirementRemainsNormative: true,
    I132PolicyRelaxationAuthorizedByThisGate: false,
    sourceCountVotingAllowed: false,
    provenanceTierWeightingAllowed: false,
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
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_1998_TWO_GAP_DISCOVERY_EXHAUSTION_AND_REBINDING_PATH_REASSESSMENT_REVIEW',
    notes: [],
  };
}

describe('I178 Li 1998 two-gap discovery evidence adequacy and rebinding path reassessment', () => {
  it('accepts the exact I177 boundary and distinguishes adequacy for unresolved findings from gap resolution', () => {
    const report = buildI178Li1998TwoGapReassessmentReview(validI177());
    expect(report.status).toBe('RESOLVED_LI_1998_TWO_GAP_DISCOVERY_EVIDENCE_ADEQUACY_REBINDING_PATH_REASSESSMENT_REVIEW');
    expect(report.decision).toBe(
      'TWO_GAP_DISCOVERY_EVIDENCE_ADEQUATE_FOR_TWO_UNRESOLVED_FINDINGS_REBINDING_NOT_READY_NO_EXHAUSTION_NO_POLICY_RELAXATION_DIRECT_PRIMARY_WITNESS_OR_VARIANT_NORMALIZATION_READINESS_REVIEW_MAY_PROCEED',
    );
    expect(report.exactI177BoundaryAccepted).toBe(true);
    expect(report.assessedGapCount).toBe(2);
    expect(report.unresolvedFindingCount).toBe(2);
    expect(report.evidenceAdequateForRecordedUnresolvedFindings).toBe(true);
    expect(report.publicationMediumOrEntityGapResolved).toBe(false);
    expect(report.canonicalDigitalWitnessNormalizationGapResolved).toBe(false);
    expect(report.completePriorWitnessIdentityAdequacyEstablished).toBe(false);
  });

  it('keeps rebinding fail-closed despite adequate unresolved findings', () => {
    const report = buildI178Li1998TwoGapReassessmentReview(validI177());
    expect(report.evidenceRebindingMethodologicallyReady).toBe(false);
    expect(report.evidenceRebindingAuthorizedByThisGate).toBe(false);
    expect(report.evidenceRebindingSelectedByThisGate).toBe(false);
    expect(report.evidenceRebindingExecutedByThisGate).toBe(false);
    expect(report.candidateSelectedByThisGate).toBe(false);
    expect(report.remediationStrategySelectedByThisGate).toBe(false);
    expect(report.remediationExecutionAuthorizedByThisGate).toBe(false);
  });

  it('rejects exhaustion and identical generic-search repetition as remediation progress', () => {
    const report = buildI178Li1998TwoGapReassessmentReview(validI177());
    expect(report.targetedDiscoveryExhaustionEstablished).toBe(false);
    expect(report.corpusExhaustionEstablished).toBe(false);
    expect(report.universalNoFurtherEvidenceClaimEstablished).toBe(false);
    expect(report.identicalGenericSearchRepetitionCountsAsRemediationProgress).toBe(false);
    expect(report.genuinelyNewEvidenceClassRequiredForFurtherSameTargetDiscovery).toBe(true);
    expect(report.searchSilenceCreatesNegativeFinding).toBe(false);
    expect(report.explicitNegativeFindingCount).toBe(0);
  });

  it('freezes ten reassessment requirements and four conclusion-neutral reviewable paths', () => {
    const report = buildI178Li1998TwoGapReassessmentReview(validI177());
    expect(report.reassessmentRequirementIds).toEqual(I178_REASSESSMENT_REQUIREMENT_IDS);
    expect(report.reassessmentRequirementCount).toBe(10);
    expect(report.reassessmentRequirementsFrozen).toBe(true);
    expect(report.reviewablePathIds).toEqual(I178_REVIEWABLE_PATH_IDS);
    expect(report.reviewablePathCount).toBe(4);
    expect(report.reviewablePathSelectedByThisGate).toBe(false);
    expect(report.direct1998PrimaryWitnessOrBibliographicBindingStillReviewable).toBe(true);
    expect(report.directVariantStructureComparisonStillReviewable).toBe(true);
  });

  it('authorizes only a readiness review for genuinely new primary-witness or variant-normalization evidence', () => {
    const report = buildI178Li1998TwoGapReassessmentReview(validI177());
    expect(report.directPrimaryWitnessVariantNormalizationReadinessReviewMethodologicallyJustified).toBe(true);
    expect(report.directPrimaryWitnessVariantNormalizationReadinessReviewAuthorized).toBe(true);
    expect(report.recommendedNextGate).toBe(
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_1998_DIRECT_PRIMARY_WITNESS_AND_VARIANT_NORMALIZATION_EVIDENCE_ACQUISITION_READINESS_REVIEW',
    );
    expect(report.evidenceRebindingAuthorizedByThisGate).toBe(false);
    expect(report.candidateSetReevaluationAuthorizedByThisGate).toBe(false);
  });

  it('preserves metadata and representation non-inference rules', () => {
    const report = buildI178Li1998TwoGapReassessmentReview(validI177());
    expect(report.chronologyCoLocationEstablishes1998PublisherIdentity).toBe(false);
    expect(report.later2002MetadataMayBackfill1998Identity).toBe(false);
    expect(report.ambiguousUploaderMetadataMayResolve1998PublicationStatus).toBe(false);
    expect(report.pageCountDifferenceAloneCreatesDistinctEdition).toBe(false);
    expect(report.fileSizeDifferenceAloneCreatesDistinctEdition).toBe(false);
    expect(report.filenameDifferenceAloneCreatesDistinctEdition).toBe(false);
  });

  it('preserves I132, same-author lineage, v2 immutability, production guards, and hidden-stem gap', () => {
    const report = buildI178Li1998TwoGapReassessmentReview(validI177());
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
    expect(report.candidateSetMutatedByThisGate).toBe(false);
    expect(report.newCandidateSetVersionCreatedByThisGate).toBe(false);
    expect(report.newInputPackageVersionCreatedByThisGate).toBe(false);
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

  it('fails closed when I177 claims a resolved canonical witness', () => {
    const mutated = {
      ...validI177(),
      canonicalDigitalWitnessEstablished: true,
    } as unknown as I177Li1998GapTargetedDiscoveryEvidenceReport;
    const report = buildI178Li1998TwoGapReassessmentReview(mutated);
    expect(report.status).toBe('I177_TWO_GAP_EVIDENCE_BOUNDARY_INVALID');
    expect(report.decision).toBe('LI_1998_TWO_GAP_REASSESSMENT_NOT_READY');
    expect(report.exactI177BoundaryAccepted).toBe(false);
    expect(report.assessedGapCount).toBe(0);
    expect(report.evidenceAdequateForRecordedUnresolvedFindings).toBe(false);
    expect(report.reviewablePathCount).toBe(0);
    expect(report.directPrimaryWitnessVariantNormalizationReadinessReviewAuthorized).toBe(false);
    expect(report.I132IndependentNormativeProvenanceRequirementRemainsNormative).toBe(false);
  });
});
