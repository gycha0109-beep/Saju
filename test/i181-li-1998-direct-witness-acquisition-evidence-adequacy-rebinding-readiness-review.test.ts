import { describe, expect, it } from 'vitest';
import type { I180Li1998DirectWitnessAcquisitionEvidenceReport } from '../src/research/i180-li-1998-direct-witness-acquisition-evidence.js';
import {
  I181_ADEQUACY_REQUIREMENT_IDS,
  I181_QUALIFYING_FURTHER_EVIDENCE_PATH_IDS,
  buildI181Li1998DirectWitnessEvidenceAdequacyRebindingReadinessReview,
} from '../src/research/i181-li-1998-direct-witness-acquisition-evidence-adequacy-rebinding-readiness-review.js';

function validI180(): I180Li1998DirectWitnessAcquisitionEvidenceReport {
  return {
    evidenceRecordSetId: 'i180_fixture',
    status: 'RESOLVED_LI_1998_DIRECT_PRIMARY_WITNESS_VARIANT_NORMALIZATION_EVIDENCE_ACQUISITION_RECORD',
    decision:
      'DIRECT_WITNESS_ACQUISITION_EXECUTED_ONE_STABLE_COVER_SURFACE_OBSERVED_ZERO_1998_SPECIFIC_PUBLICATION_BINDINGS_ZERO_COMPLETE_VARIANT_NORMALIZATIONS_TWO_GAPS_REMAIN_UNRESOLVED_NO_REBINDING_NO_INDEPENDENCE',
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI179BoundaryAccepted: true,
    evidenceAcquisitionExecuted: true,
    publicationIdentityLaneExecuted: true,
    variantNormalizationLaneExecuted: true,
    evidenceObservationCount: 6,
    newDirectWitnessSurfaceAcquiredCount: 1,
    qualifying1998PublicationIdentityBindingCount: 0,
    completeVariantNormalizationCount: 0,
    directStableCoverSurfaceObserved: true,
    scribdDocumentId: '744317976',
    scribdReportedDocumentPageCount: 202,
    directCoverTitleObserved: true,
    directCoverAuthorObserved: true,
    directCoverSeriesMarkerObserved: true,
    directCoverSeriesMarker: '预测研究系列丛书',
    directCover1998DateObserved: false,
    directCoverPublisherObserved: false,
    directCoverIssuingEntityObserved: false,
    directCoverIsbnObserved: false,
    directCoverEstablishes1998PublicationIdentity: false,
    publicationMediumOrEntityGapResolved: false,
    observedRepresentationPageCounts: [202, 314, 413],
    direct202FullWitnessAccessObtained: false,
    direct314FullWitnessAccessObtained: false,
    direct413FullWitnessAccessObtained: false,
    direct314And413ComparableWitnessSetObtained: false,
    crossVariantTitleImprintCopyrightComparisonCompleted: false,
    crossVariantPaginationTocTargetPassageComparisonCompleted: false,
    crossVariantAdditionDeletionReorderingComparisonCompleted: false,
    crossVariantScanArtifactComparisonCompleted: false,
    cryptographicHashOrStableFileIdentityAcquiredCount: 0,
    canonicalDigitalWitnessEstablished: false,
    normalizedWitnessFamilyEstablished: false,
    canonicalDigitalWitnessNormalizationGapResolved: false,
    oneLaneResolutionSufficientForRebinding: false,
    bothIdentityFunctionsRequiredBeforeRebindingReadiness: true,
    evidenceRebindingMethodologicallyReady: false,
    evidenceRebindingAuthorizedByThisGate: false,
    evidenceRebindingSelectedByThisGate: false,
    evidenceRebindingExecutedByThisGate: false,
    explicitNegativeFindingCount: 0,
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
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_1998_DIRECT_WITNESS_ACQUISITION_EVIDENCE_ADEQUACY_REBINDING_READINESS_REVIEW',
  } as unknown as I180Li1998DirectWitnessAcquisitionEvidenceReport;
}

describe('I181 Li 1998 direct witness evidence adequacy and rebinding readiness review', () => {
  it('accepts the exact I180 boundary and records nonresolving evidence progress', () => {
    const report = buildI181Li1998DirectWitnessEvidenceAdequacyRebindingReadinessReview(validI180());
    expect(report.status).toBe('RESOLVED_LI_1998_DIRECT_WITNESS_EVIDENCE_ADEQUACY_REBINDING_READINESS_REVIEW');
    expect(report.decision).toBe(
      'I180_DIRECT_WITNESS_EVIDENCE_ADEQUATE_TO_RECORD_NONRESOLVING_PROGRESS_TWO_IDENTITY_GAPS_REMAIN_UNRESOLVED_REBINDING_NOT_READY_FURTHER_ACQUISITION_REQUIRES_QUALIFYING_PRIMARY_BINDING_OR_DIRECT_VARIANT_COMPARISON_NO_INDEPENDENCE',
    );
    expect(report.exactI180BoundaryAccepted).toBe(true);
    expect(report.evidenceAcquisitionExecutionAccepted).toBe(true);
    expect(report.evidenceObservationCount).toBe(6);
    expect(report.newDirectWitnessSurfaceCount).toBe(1);
    expect(report.validNonresolvingEvidenceProgressEstablished).toBe(true);
  });

  it('keeps both identity gaps unresolved because qualifying resolution counts remain zero', () => {
    const report = buildI181Li1998DirectWitnessEvidenceAdequacyRebindingReadinessReview(validI180());
    expect(report.qualifying1998PublicationIdentityBindingCount).toBe(0);
    expect(report.completeVariantNormalizationCount).toBe(0);
    expect(report.publicationMediumOrEntityGapResolved).toBe(false);
    expect(report.canonicalDigitalWitnessNormalizationGapResolved).toBe(false);
    expect(report.completePriorWitnessIdentityAdequacyEstablished).toBe(false);
  });

  it('treats 202/314/413 variance as observation rather than edition or canonical authority', () => {
    const report = buildI181Li1998DirectWitnessEvidenceAdequacyRebindingReadinessReview(validI180());
    expect(report.observedRepresentationPageCounts).toEqual([202, 314, 413]);
    expect(report.representationVarianceCreatesEditionAuthority).toBe(false);
    expect(report.representationVarianceCreatesCanonicalWitnessAuthority).toBe(false);
    expect(report.directCoverSeriesMarkerAddsWorkIdentityContext).toBe(true);
    expect(report.directCoverSeriesMarkerResolves1998Issuer).toBe(false);
  });

  it('keeps rebinding not ready and requires both identity functions', () => {
    const report = buildI181Li1998DirectWitnessEvidenceAdequacyRebindingReadinessReview(validI180());
    expect(report.bothIdentityFunctionsRequiredBeforeRebindingReadiness).toBe(true);
    expect(report.oneLaneResolutionSufficientForRebinding).toBe(false);
    expect(report.evidenceRebindingMethodologicallyReady).toBe(false);
    expect(report.evidenceRebindingAuthorizedByThisGate).toBe(false);
    expect(report.evidenceRebindingSelectedByThisGate).toBe(false);
    expect(report.evidenceRebindingExecutedByThisGate).toBe(false);
  });

  it('freezes only qualifying further-evidence paths and rejects generic-search inflation', () => {
    const report = buildI181Li1998DirectWitnessEvidenceAdequacyRebindingReadinessReview(validI180());
    expect(report.qualifyingFurtherEvidencePathIds).toEqual(I181_QUALIFYING_FURTHER_EVIDENCE_PATH_IDS);
    expect(report.qualifyingFurtherEvidencePathCount).toBe(5);
    expect(report.furtherSameTargetAcquisitionMethodologicallyJustified).toBe(true);
    expect(report.furtherSameTargetAcquisitionAuthorizedByThisGate).toBe(true);
    expect(report.furtherSameTargetAcquisitionRequiresNewQualifyingEvidence).toBe(true);
    expect(report.repetitiveGenericSearchAloneCountsAsProgress).toBe(false);
  });

  it('does not turn unsuccessful qualifying acquisition into exhaustion or a negative finding', () => {
    const report = buildI181Li1998DirectWitnessEvidenceAdequacyRebindingReadinessReview(validI180());
    expect(report.targetedDiscoveryExhaustionEstablished).toBe(false);
    expect(report.corpusExhaustionEstablished).toBe(false);
    expect(report.universalNoFurtherEvidenceClaimEstablished).toBe(false);
    expect(report.explicitNegativeFindingCount).toBe(0);
    expect(report.searchSilenceCreatesNegativeFinding).toBe(false);
    expect(report.failedQualifyingAcquisitionCreatesNegativeFinding).toBe(false);
  });

  it('preserves all provenance, v2, production, threshold, numeric, and hidden-stem guards', () => {
    const report = buildI181Li1998DirectWitnessEvidenceAdequacyRebindingReadinessReview(validI180());
    expect(report.adequacyRequirementIds).toEqual(I181_ADEQUACY_REQUIREMENT_IDS);
    expect(report.adequacyRequirementCount).toBe(10);
    expect(report.adequacyRequirementsFrozen).toBe(true);
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

  it('fails closed when I180 is mutated to claim a qualifying publication binding', () => {
    const mutated = {
      ...validI180(),
      qualifying1998PublicationIdentityBindingCount: 1,
    } as unknown as I180Li1998DirectWitnessAcquisitionEvidenceReport;
    const report = buildI181Li1998DirectWitnessEvidenceAdequacyRebindingReadinessReview(mutated);
    expect(report.status).toBe('I180_DIRECT_WITNESS_EVIDENCE_BOUNDARY_INVALID');
    expect(report.decision).toBe('LI_1998_DIRECT_WITNESS_EVIDENCE_ADEQUACY_REVIEW_NOT_READY');
    expect(report.exactI180BoundaryAccepted).toBe(false);
    expect(report.validNonresolvingEvidenceProgressEstablished).toBe(false);
    expect(report.qualifyingFurtherEvidencePathCount).toBe(0);
    expect(report.I132IndependentNormativeProvenanceRequirementRemainsNormative).toBe(false);
  });
});
