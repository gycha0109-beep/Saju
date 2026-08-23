import { describe, expect, it } from 'vitest';
import {
  I205_ACQUISITION_CONTROL_IDS,
  I205_ACQUISITION_PATH_IDS,
  I205_EVIDENCE_OBLIGATION_IDS,
  type I205QuWei2001TwoRemainingGapCompletionAcquisitionReadinessReviewReport,
} from '../src/research/i205-qu-wei-2001-two-remaining-gap-completion-acquisition-readiness-review.js';
import {
  I206_REMAINING_GAP_IDS,
  buildI206QuWei2001TwoRemainingGapCompletionAcquisitionEvidence,
} from '../src/research/i206-qu-wei-2001-two-remaining-gap-completion-acquisition-evidence.js';

function validI205(): I205QuWei2001TwoRemainingGapCompletionAcquisitionReadinessReviewReport {
  return {
    reviewId: 'i205_fixture',
    status: 'RESOLVED_QU_WEI_2001_TWO_REMAINING_GAP_COMPLETION_ACQUISITION_READINESS_REVIEW',
    decision:
      'I204_BOUNDARY_SUPPORTS_TWO_REMAINING_GAP_COMPLETION_ACQUISITION_TWO_PATHS_EIGHT_OBLIGATIONS_SIXTEEN_CONTROLS_FROZEN_PUBLICATION_RESOLUTION_PRESERVED_EVIDENCE_COLLECTION_ONLY_NO_REBINDING_NO_INDEPENDENCE',
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI204BoundaryAccepted: true,
    targetPriorWitnessId: 'QU_WEI_SIZHU_XIANGZHEN_2001',
    resolvedPublicationGapPreserved: true,
    firstParty2001BookMediumBindingPreserved: true,
    publicationGapTargetedByThisGate: false,
    publicationGapMayBeReopenedWithoutContradictoryPrimaryEvidence: false,
    remainingGapCountAtEntry: 2,
    canonicalWitnessNormalizationGapOpenAtEntry: true,
    exactTargetPassageBindingGapOpenAtEntry: true,
    acquisitionPathIds: I205_ACQUISITION_PATH_IDS,
    acquisitionPathCount: 2,
    acquisitionPathsFrozenProspectively: true,
    evidenceObligationIds: I205_EVIDENCE_OBLIGATION_IDS,
    evidenceObligationCount: 8,
    evidenceObligationsFrozenProspectively: true,
    acquisitionControlIds: I205_ACQUISITION_CONTROL_IDS,
    acquisitionControlCount: 16,
    acquisitionControlsFrozenProspectively: true,
    byteStableRepresentationPairRequired: true,
    reproducibleHashOrEquivalentContentIdentityRequired: true,
    scanLineageTransformationOrProvenanceContextRequired: true,
    directTitleTocPaginationTargetStructureAlignmentRequired: true,
    pageCountFileSizeFilenameHostVarianceAloneMayResolveNormalization: false,
    canonically2001BoundTargetSectionFacsimileRequired: true,
    direct2001ContextAndPageAnchorRequired: true,
    governed2003TargetRouteSequenceRequired: true,
    direct2001To2003SequenceComparisonRequired: true,
    unboundPublicTextSimilarityMayResolveExactPassageGap: false,
    doctrineLevelAntecedentAloneMayResolveExactPassageGap: false,
    oneRemainingGapMayBackfillTheOther: false,
    twoGapCompletionAcquisitionMayProceed: true,
    authorizationIsEvidenceCollectionOnly: true,
    acquisitionExecutedByThisGate: false,
    evidenceAcquiredByThisGate: false,
    gapResolvedByThisGateCount: 0,
    explicitNegativeFindingCountCreatedByThisGate: 0,
    nonAcquisitionCreatesNegativeFinding: false,
    accessFailureCreatesNegativeFinding: false,
    searchSilenceCreatesNegativeFinding: false,
    paywallCreatesNegativeFinding: false,
    inaccessibleSubstrateCreatesNegativeFinding: false,
    targetedDiscoveryExhaustionEstablished: false,
    onlineCorpusExhaustionEstablished: false,
    corpusExhaustionEstablished: false,
    allTwoRemainingGapsRequiredBeforeRebindingReadiness: true,
    oneRemainingGapResolutionAloneSufficientForRebinding: false,
    evidenceRebindingMethodologicallyReady: false,
    evidenceRebindingAuthorizedByThisGate: false,
    evidenceRebindingExecutedByThisGate: false,
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
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_QU_WEI_2001_TWO_REMAINING_GAP_COMPLETION_ACQUISITION_EVIDENCE',
  } as unknown as I205QuWei2001TwoRemainingGapCompletionAcquisitionReadinessReviewReport;
}

describe('I206 Qu Wei 2001 two remaining gap completion acquisition evidence', () => {
  it('executes both I205 paths but resolves neither remaining gap', () => {
    const r = buildI206QuWei2001TwoRemainingGapCompletionAcquisitionEvidence(validI205());
    expect(r.status).toBe('RESOLVED_QU_WEI_2001_TWO_REMAINING_GAP_COMPLETION_ACQUISITION_EVIDENCE');
    expect(r.exactI205BoundaryAccepted).toBe(true);
    expect(r.acquisitionPathCountExecuted).toBe(2);
    expect(r.allTwoFrozenAcquisitionPathsExecuted).toBe(true);
    expect(r.acquisitionPathEvidenceRecordCount).toBe(2);
    expect(r.contextualEvidencePathCount).toBe(2);
    expect(r.qualifyingGapResolutionEvidenceCount).toBe(0);
    expect(r.resolvedGapCount).toBe(0);
    expect(r.unresolvedGapCount).toBe(2);
    expect(r.unresolvedGapIds).toEqual(I206_REMAINING_GAP_IDS);
  });

  it('preserves the resolved publication gap and never retargets it', () => {
    const r = buildI206QuWei2001TwoRemainingGapCompletionAcquisitionEvidence(validI205());
    expect(r.resolvedPublicationGapPreserved).toBe(true);
    expect(r.publicationGapRetargetedByThisGate).toBe(false);
  });

  it('records representation context without manufacturing canonical witness normalization', () => {
    const r = buildI206QuWei2001TwoRemainingGapCompletionAcquisitionEvidence(validI205());
    expect(r.publicRepresentationVarianceObserved).toBe(true);
    expect(r.publicRepresentationLocatorCount).toBe(2);
    expect(r.byteStableRepresentationPairAcquired).toBe(false);
    expect(r.reproducibleHashOrEquivalentContentIdentityAcquired).toBe(false);
    expect(r.scanLineageTransformationOrProvenanceChainAcquired).toBe(false);
    expect(r.directTitleTocPaginationTargetStructureAlignmentCompleted).toBe(false);
    expect(r.pageCountFileSizeFilenameHostVarianceCreatesCanonicalIdentity).toBe(false);
    expect(r.canonicalWitnessNormalizationGapResolved).toBe(false);
  });

  it('records direct unbound route-sequence correspondence without promoting it to canonical 2001 passage identity', () => {
    const r = buildI206QuWei2001TwoRemainingGapCompletionAcquisitionEvidence(validI205());
    expect(r.unboundSizhuXiangzhenTargetSectionTextAcquired).toBe(true);
    expect(r.unboundSizhuXiangzhenTargetSectionTitle).toBe('第九章 五行生克路线');
    expect(r.unboundSizhuXiangzhenRouteSequenceObserved).toBe(true);
    expect(r.governed2003ZuoyonglunRouteSequenceAcquired).toBe(true);
    expect(r.governed2003SourceIdentifiedAs2003TrainingMaterial).toBe(true);
    expect(r.substantialRouteSequenceCorrespondenceObserved).toBe(true);
    expect(r.correspondingRouteElementCount).toBe(3);
    expect(r.correspondingRouteElements).toEqual([
      'SAME_PILLAR_STEM_BRANCH_ROUTE',
      'STEM_STEM_SHENG_KE_HE_CHONG_ROUTE',
      'BRANCH_BRANCH_XING_CHONG_HE_HAI_ROUTE',
    ]);
    expect(r.canonically2001BoundTargetSectionFacsimileAcquired).toBe(false);
    expect(r.directCanonical2001To2003SequenceComparisonCompleted).toBe(false);
    expect(r.exact2003RouteSequenceBoundIntoCanonical2001Witness).toBe(false);
    expect(r.nearVerbatim2003RouteSequenceBoundIntoCanonical2001Witness).toBe(false);
    expect(r.exactTargetPassageBindingGapResolved).toBe(false);
  });

  it('keeps doctrine and unbound text similarity below the exact-passage promotion boundary', () => {
    const r = buildI206QuWei2001TwoRemainingGapCompletionAcquisitionEvidence(validI205());
    expect(r.unboundPublicTextSimilarityMayResolveExactPassageGap).toBe(false);
    expect(r.directDoctrinalAntecedentPreserved).toBe(true);
    expect(r.doctrineLevelAntecedentMayResolveExactPassageGap).toBe(false);
    expect(r.oneRemainingGapMayBackfillTheOther).toBe(false);
  });

  it('keeps non-acquisition non-negative and makes no exhaustion claim', () => {
    const r = buildI206QuWei2001TwoRemainingGapCompletionAcquisitionEvidence(validI205());
    expect(r.explicitNegativeFindingCount).toBe(0);
    expect(r.nonAcquisitionCreatesNegativeFinding).toBe(false);
    expect(r.accessFailureCreatesNegativeFinding).toBe(false);
    expect(r.searchSilenceCreatesNegativeFinding).toBe(false);
    expect(r.paywallCreatesNegativeFinding).toBe(false);
    expect(r.failureToAcquireByteStablePairCreatesNegativeFinding).toBe(false);
    expect(r.failureToAcquireCanonicalFacsimileCreatesNegativeFinding).toBe(false);
    expect(r.targetedDiscoveryExhaustionEstablished).toBe(false);
    expect(r.onlineCorpusExhaustionEstablished).toBe(false);
    expect(r.corpusExhaustionEstablished).toBe(false);
  });

  it('keeps rebinding, independence, I132, frozen v2, and production guards fail-closed', () => {
    const r = buildI206QuWei2001TwoRemainingGapCompletionAcquisitionEvidence(validI205());
    expect(r.allTwoRemainingGapsRequiredBeforeRebindingReadiness).toBe(true);
    expect(r.evidenceRebindingMethodologicallyReadyByThisGate).toBe(false);
    expect(r.evidenceRebindingAuthorizedByThisGate).toBe(false);
    expect(r.evidenceRebindingExecutedByThisGate).toBe(false);
    expect(r.sameAuthor2001To2003DoctrinalDependencyPreserved).toBe(true);
    expect(r.externalTargetLineageUnresolvedQuestionCountPreserved).toBe(3);
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

  it('fails closed if I205 is mutated to allow unbound text similarity to resolve the exact passage gap', () => {
    const mutated = {
      ...validI205(),
      unboundPublicTextSimilarityMayResolveExactPassageGap: true,
    } as unknown as I205QuWei2001TwoRemainingGapCompletionAcquisitionReadinessReviewReport;
    const r = buildI206QuWei2001TwoRemainingGapCompletionAcquisitionEvidence(mutated);
    expect(r.status).toBe('I205_TWO_GAP_COMPLETION_READINESS_BOUNDARY_INVALID');
    expect(r.decision).toBe('QU_WEI_2001_TWO_REMAINING_GAP_COMPLETION_ACQUISITION_EVIDENCE_NOT_EXECUTED');
    expect(r.exactI205BoundaryAccepted).toBe(false);
    expect(r.acquisitionPathCountExecuted).toBe(0);
    expect(r.acquisitionPathEvidenceRecords).toEqual([]);
    expect(r.unresolvedGapCount).toBe(0);
    expect(r.currentV2ProvenanceDisposition).toBe('NOT_ASSESSED');
  });
});
