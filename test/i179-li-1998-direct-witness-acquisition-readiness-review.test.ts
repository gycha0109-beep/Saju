import { describe, expect, it } from 'vitest';
import type { I178Li1998TwoGapReassessmentReviewReport } from '../src/research/i178-li-1998-two-gap-reassessment-review.js';
import {
  I179_ACQUISITION_REQUIREMENT_IDS,
  I179_PUBLICATION_IDENTITY_EVIDENCE_CLASSES,
  I179_VARIANT_NORMALIZATION_EVIDENCE_CLASSES,
  buildI179Li1998DirectWitnessAcquisitionReadinessReview,
} from '../src/research/i179-li-1998-direct-witness-acquisition-readiness-review.js';

function validI178(): I178Li1998TwoGapReassessmentReviewReport {
  return {
    reviewId: 'i178_fixture',
    reviewVersion: 'myeonghwa-li-1998-two-gap-discovery-evidence-adequacy-rebinding-path-reassessment-review-v1',
    status: 'RESOLVED_LI_1998_TWO_GAP_DISCOVERY_EVIDENCE_ADEQUACY_REBINDING_PATH_REASSESSMENT_REVIEW',
    decision:
      'TWO_GAP_DISCOVERY_EVIDENCE_ADEQUATE_FOR_TWO_UNRESOLVED_FINDINGS_REBINDING_NOT_READY_NO_EXHAUSTION_NO_POLICY_RELAXATION_DIRECT_PRIMARY_WITNESS_OR_VARIANT_NORMALIZATION_READINESS_REVIEW_MAY_PROCEED',
    upstreamI177EvidenceRecordSetId: 'i177_fixture',
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI177BoundaryAccepted: true,
    assessedGapCount: 2,
    unresolvedFindingCount: 2,
    explicitNegativeFindingCount: 0,
    evidenceAdequateForRecordedUnresolvedFindings: true,
    publicationMediumOrEntityGapResolved: false,
    canonicalDigitalWitnessNormalizationGapResolved: false,
    completePriorWitnessIdentityAdequacyEstablished: false,
    evidenceRebindingMethodologicallyReady: false,
    evidenceRebindingAuthorizedByThisGate: false,
    evidenceRebindingSelectedByThisGate: false,
    evidenceRebindingExecutedByThisGate: false,
    targetedDiscoveryExhaustionEstablished: false,
    corpusExhaustionEstablished: false,
    universalNoFurtherEvidenceClaimEstablished: false,
    identicalGenericSearchRepetitionCountsAsRemediationProgress: false,
    genuinelyNewEvidenceClassRequiredForFurtherSameTargetDiscovery: true,
    direct1998PrimaryWitnessOrBibliographicBindingStillReviewable: true,
    directVariantStructureComparisonStillReviewable: true,
    reviewablePathIds: [
      'DIRECT_1998_TITLE_PAGE_COPYRIGHT_PAGE_COLOPHON_OR_IMPRINT_ACQUISITION',
      'EXPLICIT_1998_LIBRARY_ARCHIVE_OR_PRIMARY_BIBLIOGRAPHIC_RECORD_ACQUISITION',
      'DIRECT_314_413_VARIANT_IMPRINT_PAGINATION_TOC_AND_CONTENT_STRUCTURE_COMPARISON',
      'GENUINELY_NEW_EXTERNAL_LINEAGE_OR_SOURCE_ORIGIN_EVIDENCE_ACQUISITION',
    ],
    reviewablePathCount: 4,
    reviewablePathSelectedByThisGate: false,
    directPrimaryWitnessVariantNormalizationReadinessReviewMethodologicallyJustified: true,
    directPrimaryWitnessVariantNormalizationReadinessReviewAuthorized: true,
    reassessmentRequirementIds: [
      'EXACT_I177_TWO_UNRESOLVED_GAP_EVIDENCE_BOUNDARY_REQUIRED',
      'I177_EVIDENCE_MAY_BE_ADEQUATE_FOR_UNRESOLVED_FINDINGS_WITHOUT_RESOLVING_GAPS',
      'UNRESOLVED_GAPS_MUST_NOT_BE_PROMOTED_TO_RESOLVED_OR_NEGATIVE_FINDINGS',
      '1998_PUBLICATION_IDENTITY_REQUIRES_NEW_1998_SPECIFIC_PRIMARY_OR_BIBLIOGRAPHIC_BINDING',
      'LATER_EDITION_METADATA_AND_CHRONOLOGY_COLOCATION_MUST_NOT_BACKFILL_PUBLISHER_IDENTITY',
      'CANONICAL_WITNESS_NORMALIZATION_REQUIRES_DIRECT_IMPRINT_OR_CONTENT_STRUCTURE_COMPARISON',
      'PAGE_COUNT_FILE_SIZE_FILENAME_VARIANCE_MUST_NOT_CREATE_EDITION_AUTHORITY',
      'IDENTICAL_GENERIC_SEARCH_REPETITION_WITHOUT_NEW_EVIDENCE_CLASS_MUST_NOT_BE_TREATED_AS_REMEDIATION_PROGRESS',
      'SAME_AUTHOR_1998_TO_2004_DERIVATIVE_CHAIN_AND_EXTERNAL_LINEAGE_UNRESOLVED_STATUS_MUST_REMAIN_BOUND',
      'NO_REBINDING_SELECTION_MUTATION_INDEPENDENCE_REEVALUATION_OR_POLICY_RELAXATION_AT_REASSESSMENT_STAGE',
    ],
    reassessmentRequirementCount: 10,
    reassessmentRequirementsFrozen: true,
    chronologyCoLocationEstablishes1998PublisherIdentity: false,
    later2002MetadataMayBackfill1998Identity: false,
    ambiguousUploaderMetadataMayResolve1998PublicationStatus: false,
    pageCountDifferenceAloneCreatesDistinctEdition: false,
    fileSizeDifferenceAloneCreatesDistinctEdition: false,
    filenameDifferenceAloneCreatesDistinctEdition: false,
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
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_1998_DIRECT_PRIMARY_WITNESS_AND_VARIANT_NORMALIZATION_EVIDENCE_ACQUISITION_READINESS_REVIEW',
    notes: [],
  };
}

describe('I179 Li 1998 direct primary witness and variant-normalization evidence acquisition readiness', () => {
  it('accepts the exact I178 boundary and freezes two acquisition lanes without collecting evidence', () => {
    const report = buildI179Li1998DirectWitnessAcquisitionReadinessReview(validI178());
    expect(report.status).toBe('RESOLVED_LI_1998_DIRECT_PRIMARY_WITNESS_VARIANT_NORMALIZATION_EVIDENCE_ACQUISITION_READINESS_REVIEW');
    expect(report.decision).toBe(
      'DIRECT_PRIMARY_WITNESS_AND_VARIANT_NORMALIZATION_ACQUISITION_PROTOCOL_FROZEN_TWO_LANES_READY_NO_EVIDENCE_ACQUIRED_NO_REBINDING_NO_INDEPENDENCE',
    );
    expect(report.exactI178BoundaryAccepted).toBe(true);
    expect(report.acquisitionLaneCount).toBe(2);
    expect(report.publicationIdentityLaneReady).toBe(true);
    expect(report.variantNormalizationLaneReady).toBe(true);
    expect(report.evidenceAcquisitionExecutedByThisGate).toBe(false);
    expect(report.publicationIdentityEvidenceAcquiredCount).toBe(0);
    expect(report.variantNormalizationEvidenceAcquiredCount).toBe(0);
  });

  it('freezes the exact prospective evidence classes and twelve acquisition requirements', () => {
    const report = buildI179Li1998DirectWitnessAcquisitionReadinessReview(validI178());
    expect(report.publicationIdentityEvidenceClasses).toEqual(I179_PUBLICATION_IDENTITY_EVIDENCE_CLASSES);
    expect(report.publicationIdentityEvidenceClassCount).toBe(4);
    expect(report.variantNormalizationEvidenceClasses).toEqual(I179_VARIANT_NORMALIZATION_EVIDENCE_CLASSES);
    expect(report.variantNormalizationEvidenceClassCount).toBe(6);
    expect(report.acquisitionRequirementIds).toEqual(I179_ACQUISITION_REQUIREMENT_IDS);
    expect(report.acquisitionRequirementCount).toBe(12);
    expect(report.acquisitionRequirementsFrozenProspectively).toBe(true);
  });

  it('permits formal and explicit nonformal 1998 publication paths but requires 1998-specific binding', () => {
    const report = buildI179Li1998DirectWitnessAcquisitionReadinessReview(validI178());
    expect(report.formalAndNonformalPublicationPathsBothPermitted).toBe(true);
    expect(report.explicit1998BindingRequired).toBe(true);
    expect(report.later2002MetadataMayBackfill1998Identity).toBe(false);
    expect(report.companyChronologyMayEstablish1998PublisherIdentity).toBe(false);
    expect(report.ambiguousUploaderFieldMayResolve1998PublicationStatus).toBe(false);
  });

  it('requires direct comparable variant evidence and structural comparison', () => {
    const report = buildI179Li1998DirectWitnessAcquisitionReadinessReview(validI178());
    expect(report.directComparableVariantAccessRequired).toBe(true);
    expect(report.titleImprintPaginationTocTargetPassageAndStructuralComparisonRequired).toBe(true);
    expect(report.stableFileIdentityRecordRequiredWhenAvailable).toBe(true);
    expect(report.OCRSnippetAloneMayResolveVariantRelationship).toBe(false);
    expect(report.pageCountAloneMayResolveVariantRelationship).toBe(false);
    expect(report.fileSizeAloneMayResolveVariantRelationship).toBe(false);
    expect(report.filenameAloneMayResolveVariantRelationship).toBe(false);
  });

  it('requires both identity functions before rebinding readiness and leaves both unresolved', () => {
    const report = buildI179Li1998DirectWitnessAcquisitionReadinessReview(validI178());
    expect(report.oneLaneResolutionSufficientForRebinding).toBe(false);
    expect(report.bothIdentityFunctionsRequiredBeforeRebindingReadiness).toBe(true);
    expect(report.publicationMediumOrEntityGapResolvedByThisGate).toBe(false);
    expect(report.canonicalDigitalWitnessNormalizationGapResolvedByThisGate).toBe(false);
    expect(report.evidenceRebindingMethodologicallyReady).toBe(false);
    expect(report.evidenceRebindingAuthorizedByThisGate).toBe(false);
    expect(report.evidenceRebindingSelectedByThisGate).toBe(false);
    expect(report.evidenceRebindingExecutedByThisGate).toBe(false);
  });

  it('does not establish exhaustion, negative findings, selection, mutation, or versions', () => {
    const report = buildI179Li1998DirectWitnessAcquisitionReadinessReview(validI178());
    expect(report.targetedDiscoveryExhaustionEstablished).toBe(false);
    expect(report.corpusExhaustionEstablished).toBe(false);
    expect(report.searchSilenceCreatesNegativeFinding).toBe(false);
    expect(report.candidateSelectedByThisGate).toBe(false);
    expect(report.remediationStrategySelectedByThisGate).toBe(false);
    expect(report.remediationExecutionAuthorizedByThisGate).toBe(false);
    expect(report.candidateSetMutatedByThisGate).toBe(false);
    expect(report.candidateRemovedByThisGate).toBe(false);
    expect(report.candidateReplacedByThisGate).toBe(false);
    expect(report.newCandidateSetVersionCreatedByThisGate).toBe(false);
    expect(report.newInputPackageVersionCreatedByThisGate).toBe(false);
  });

  it('preserves provenance, v2, production, threshold, numeric, and hidden-stem guards', () => {
    const report = buildI179Li1998DirectWitnessAcquisitionReadinessReview(validI178());
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
    expect(report.recommendedNextGate).toBe(
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_1998_DIRECT_PRIMARY_WITNESS_AND_VARIANT_NORMALIZATION_EVIDENCE_ACQUISITION_RECORD',
    );
  });

  it('fails closed when I178 incorrectly authorizes rebinding', () => {
    const mutated = {
      ...validI178(),
      evidenceRebindingAuthorizedByThisGate: true,
    } as unknown as I178Li1998TwoGapReassessmentReviewReport;
    const report = buildI179Li1998DirectWitnessAcquisitionReadinessReview(mutated);
    expect(report.status).toBe('I178_REASSESSMENT_BOUNDARY_INVALID');
    expect(report.decision).toBe('LI_1998_DIRECT_WITNESS_ACQUISITION_READINESS_NOT_ESTABLISHED');
    expect(report.exactI178BoundaryAccepted).toBe(false);
    expect(report.acquisitionLaneCount).toBe(0);
    expect(report.publicationIdentityLaneReady).toBe(false);
    expect(report.variantNormalizationLaneReady).toBe(false);
    expect(report.acquisitionRequirementsFrozenProspectively).toBe(false);
    expect(report.I132IndependentNormativeProvenanceRequirementRemainsNormative).toBe(false);
  });
});
