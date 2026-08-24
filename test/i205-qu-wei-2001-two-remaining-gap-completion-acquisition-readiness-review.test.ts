import { describe, expect, it } from 'vitest';
import {
  I204_REASSESSMENT_CONTROL_IDS,
  I204_REMAINING_REMEDIATION_PATH_IDS,
  type I204QuWei2001HigherProvenanceEvidenceAdequacyRebindingPathReassessmentReviewReport,
} from '../src/research/i204-qu-wei-2001-higher-provenance-evidence-adequacy-rebinding-path-reassessment-review.js';
import {
  I205_ACQUISITION_CONTROL_IDS,
  I205_ACQUISITION_PATH_IDS,
  I205_EVIDENCE_OBLIGATION_IDS,
  buildI205QuWei2001TwoRemainingGapCompletionAcquisitionReadinessReview,
} from '../src/research/i205-qu-wei-2001-two-remaining-gap-completion-acquisition-readiness-review.js';

function validI204(): I204QuWei2001HigherProvenanceEvidenceAdequacyRebindingPathReassessmentReviewReport {
  return {
    reviewId: 'i204_fixture',
    status: 'RESOLVED_QU_WEI_2001_HIGHER_PROVENANCE_EVIDENCE_ADEQUACY_REBINDING_PATH_REASSESSMENT_REVIEW',
    decision:
      'I203_EVIDENCE_ADEQUATE_PUBLICATION_GAP_RESOLUTION_ACCEPTED_TWO_GAPS_REMAIN_REBINDING_NOT_READY_TWO_PATH_REMEDIATION_READINESS_MAY_PROCEED_NO_EXHAUSTION_NO_INDEPENDENCE_NO_POLICY_RELAXATION',
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI203BoundaryAccepted: true,
    i203EvidenceAdequateForReassessment: true,
    assessedOriginalGapCount: 3,
    resolvedOriginalGapCount: 1,
    remainingGapCount: 2,
    explicitNegativeFindingCountAccepted: 0,
    firstParty2001BookMediumBindingAccepted: true,
    explicit2001NonformalPublicationStatusAccepted: true,
    publicationMediumIdentityAccepted: true,
    publicationEntityIdentityRequiredAfterMediumResolution: false,
    formal2001PublisherEstablished: false,
    formal2001IsbnEstablished: false,
    secondaryAggregatorMetadataAcceptedAsAuthority: false,
    publicationIdentityGapResolved: true,
    publicationGapReopenedByThisGate: false,
    contradictoryPrimaryPublicationEvidenceObserved: false,
    canonicalWitnessNormalizationGapResolved: false,
    exactTargetPassageBindingGapResolved: false,
    publicationResolutionMayBackfillNormalization: false,
    publicationResolutionMayBackfillExactPassage: false,
    directDoctrinalAntecedentPreserved: true,
    doctrineLevelAntecedentEqualsExactOrNearVerbatimBinding: false,
    remainingRemediationPathIds: I204_REMAINING_REMEDIATION_PATH_IDS,
    remainingRemediationPathCount: 2,
    remainingRemediationPathsFrozenProspectively: true,
    byteStableNormalizationPathStillReviewable: true,
    canonicalTargetFacsimileSequencePathStillReviewable: true,
    remainingPathSelectedByThisGate: false,
    twoGapCompletionReadinessReviewMethodologicallyJustified: true,
    twoGapCompletionReadinessReviewAuthorized: true,
    acquisitionExecutedByThisGate: false,
    evidenceAcquiredByThisGate: false,
    twoRemainingGapsRequiredBeforeRebindingReadiness: true,
    oneRemainingGapResolutionAloneSufficientForRebinding: false,
    evidenceRebindingMethodologicallyReady: false,
    evidenceRebindingAuthorizedByThisGate: false,
    evidenceRebindingExecutedByThisGate: false,
    nonAcquisitionCreatesNegativeFinding: false,
    accessFailureCreatesNegativeFinding: false,
    searchSilenceCreatesNegativeFinding: false,
    failureToAcquireByteStablePairCreatesNegativeFinding: false,
    failureToAcquireCanonicalFacsimileCreatesNegativeFinding: false,
    targetedDiscoveryExhaustionEstablished: false,
    onlineCorpusExhaustionEstablished: false,
    corpusExhaustionEstablished: false,
    universalNoFurtherEvidenceClaimEstablished: false,
    sameAuthor2001To2003DoctrinalDependencyPreserved: true,
    externalTargetLineageUnresolvedQuestionCount: 3,
    provenanceIndependenceAdjudicatedByThisGate: false,
    independentNormativeProvenanceEstablishedCount: 0,
    explicitDerivativeRelationshipCheckRequired: true,
    derivativeRetransmissionCountsAsIndependentAuthority: false,
    unresolvedLineageDefaultDisposition: 'REJECT_INDEPENDENCE_CLAIM',
    I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate: false,
    I132IndependentNormativeProvenanceRequirementRemainsNormative: true,
    I132PolicyRelaxationAuthorizedByThisGate: false,
    sourceClassAloneSufficient: false,
    sourceCountMayBecomeNumericWeight: false,
    provenanceTierMayBecomeNumericWeight: false,
    reassessmentControlIds: I204_REASSESSMENT_CONTROL_IDS,
    reassessmentControlCount: 12,
    reassessmentControlsFrozen: true,
    candidateSelectedByThisGate: false,
    candidateRegistrationAuthorizedByThisGate: false,
    candidateSetMutatedByThisGate: false,
    candidateSetReevaluationAuthorizedByThisGate: false,
    candidateSetAdmissibilityEstablishedByThisGate: false,
    newCandidateSetVersionCreatedByThisGate: false,
    newInputPackageVersionCreatedByThisGate: false,
    currentV2PackageAndCandidateSetRemainImmutable: true,
    currentV2ProvenanceDisposition: 'BLOCKED_UNDER_CURRENT_EVIDENCE',
    liSameTargetPathSuspendedNotRetired: true,
    liSameTargetMayReopenOnMateriallyNewDirectLead: true,
    liPublicationMediumOrEntityGapStillOpen: true,
    liCanonicalDigitalWitnessNormalizationGapStillOpen: true,
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
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_QU_WEI_2001_TWO_REMAINING_GAP_COMPLETION_ACQUISITION_READINESS_REVIEW',
  } as unknown as I204QuWei2001HigherProvenanceEvidenceAdequacyRebindingPathReassessmentReviewReport;
}

describe('I205 Qu Wei 2001 two remaining gap completion acquisition readiness', () => {
  it('accepts I204 and freezes exactly two completion acquisition paths', () => {
    const r = buildI205QuWei2001TwoRemainingGapCompletionAcquisitionReadinessReview(validI204());
    expect(r.status).toBe('RESOLVED_QU_WEI_2001_TWO_REMAINING_GAP_COMPLETION_ACQUISITION_READINESS_REVIEW');
    expect(r.exactI204BoundaryAccepted).toBe(true);
    expect(r.remainingGapCountAtEntry).toBe(2);
    expect(r.acquisitionPathIds).toEqual(I205_ACQUISITION_PATH_IDS);
    expect(r.acquisitionPathCount).toBe(2);
    expect(r.acquisitionPathsFrozenProspectively).toBe(true);
  });

  it('preserves the resolved publication gap and excludes it from retargeting', () => {
    const r = buildI205QuWei2001TwoRemainingGapCompletionAcquisitionReadinessReview(validI204());
    expect(r.resolvedPublicationGapPreserved).toBe(true);
    expect(r.firstParty2001BookMediumBindingPreserved).toBe(true);
    expect(r.publicationGapTargetedByThisGate).toBe(false);
    expect(r.publicationGapMayBeReopenedWithoutContradictoryPrimaryEvidence).toBe(false);
    expect(r.canonicalWitnessNormalizationGapOpenAtEntry).toBe(true);
    expect(r.exactTargetPassageBindingGapOpenAtEntry).toBe(true);
  });

  it('freezes eight evidence obligations and sixteen controls', () => {
    const r = buildI205QuWei2001TwoRemainingGapCompletionAcquisitionReadinessReview(validI204());
    expect(r.evidenceObligationIds).toEqual(I205_EVIDENCE_OBLIGATION_IDS);
    expect(r.evidenceObligationCount).toBe(8);
    expect(r.evidenceObligationsFrozenProspectively).toBe(true);
    expect(r.acquisitionControlIds).toEqual(I205_ACQUISITION_CONTROL_IDS);
    expect(r.acquisitionControlCount).toBe(16);
    expect(r.acquisitionControlsFrozenProspectively).toBe(true);
  });

  it('requires byte-stable provenance and structure alignment for normalization', () => {
    const r = buildI205QuWei2001TwoRemainingGapCompletionAcquisitionReadinessReview(validI204());
    expect(r.byteStableRepresentationPairRequired).toBe(true);
    expect(r.reproducibleHashOrEquivalentContentIdentityRequired).toBe(true);
    expect(r.scanLineageTransformationOrProvenanceContextRequired).toBe(true);
    expect(r.directTitleTocPaginationTargetStructureAlignmentRequired).toBe(true);
    expect(r.pageCountFileSizeFilenameHostVarianceAloneMayResolveNormalization).toBe(false);
  });

  it('requires canonical 2001 binding and direct sequence comparison for exact passage promotion', () => {
    const r = buildI205QuWei2001TwoRemainingGapCompletionAcquisitionReadinessReview(validI204());
    expect(r.canonically2001BoundTargetSectionFacsimileRequired).toBe(true);
    expect(r.direct2001ContextAndPageAnchorRequired).toBe(true);
    expect(r.governed2003TargetRouteSequenceRequired).toBe(true);
    expect(r.direct2001To2003SequenceComparisonRequired).toBe(true);
    expect(r.unboundPublicTextSimilarityMayResolveExactPassageGap).toBe(false);
    expect(r.doctrineLevelAntecedentAloneMayResolveExactPassageGap).toBe(false);
    expect(r.oneRemainingGapMayBackfillTheOther).toBe(false);
  });

  it('authorizes evidence collection only and keeps non-acquisition non-negative', () => {
    const r = buildI205QuWei2001TwoRemainingGapCompletionAcquisitionReadinessReview(validI204());
    expect(r.twoGapCompletionAcquisitionMayProceed).toBe(true);
    expect(r.authorizationIsEvidenceCollectionOnly).toBe(true);
    expect(r.acquisitionExecutedByThisGate).toBe(false);
    expect(r.evidenceAcquiredByThisGate).toBe(false);
    expect(r.gapResolvedByThisGateCount).toBe(0);
    expect(r.nonAcquisitionCreatesNegativeFinding).toBe(false);
    expect(r.accessFailureCreatesNegativeFinding).toBe(false);
    expect(r.searchSilenceCreatesNegativeFinding).toBe(false);
    expect(r.paywallCreatesNegativeFinding).toBe(false);
    expect(r.targetedDiscoveryExhaustionEstablished).toBe(false);
  });

  it('keeps rebinding, independence, I132, frozen v2, and production guards closed', () => {
    const r = buildI205QuWei2001TwoRemainingGapCompletionAcquisitionReadinessReview(validI204());
    expect(r.allTwoRemainingGapsRequiredBeforeRebindingReadiness).toBe(true);
    expect(r.oneRemainingGapResolutionAloneSufficientForRebinding).toBe(false);
    expect(r.evidenceRebindingMethodologicallyReady).toBe(false);
    expect(r.evidenceRebindingAuthorizedByThisGate).toBe(false);
    expect(r.provenanceIndependenceAdjudicatedByThisGate).toBe(false);
    expect(r.I132IndependentNormativeProvenanceRequirementRemainsNormative).toBe(true);
    expect(r.I132PolicyRelaxationAuthorizedByThisGate).toBe(false);
    expect(r.currentV2PackageAndCandidateSetRemainImmutable).toBe(true);
    expect(r.candidateSetMutatedByThisGate).toBe(false);
    expect(r.candidateSetReevaluationAuthorizedByThisGate).toBe(false);
    expect(r.actualCompositionPerformedByThisGate).toBe(false);
    expect(r.thresholdRuleCreatedByThisGate).toBe(false);
    expect(r.classificationAuthorized).toBe(false);
    expect(r.numericScoringAuthorized).toBe(false);
  });

  it('fails closed when I204 improperly reopens the resolved publication gap', () => {
    const mutated = {
      ...validI204(),
      publicationGapReopenedByThisGate: true,
    } as unknown as I204QuWei2001HigherProvenanceEvidenceAdequacyRebindingPathReassessmentReviewReport;
    const r = buildI205QuWei2001TwoRemainingGapCompletionAcquisitionReadinessReview(mutated);
    expect(r.status).toBe('I204_TWO_REMAINING_GAP_REASSESSMENT_BOUNDARY_INVALID');
    expect(r.decision).toBe('QU_WEI_2001_TWO_REMAINING_GAP_COMPLETION_ACQUISITION_NOT_READY');
    expect(r.exactI204BoundaryAccepted).toBe(false);
    expect(r.remainingGapCountAtEntry).toBe(0);
    expect(r.twoGapCompletionAcquisitionMayProceed).toBe(false);
    expect(r.currentV2ProvenanceDisposition).toBe('NOT_ASSESSED');
  });
});
