import { describe, expect, it } from 'vitest';
import {
  I206_REMAINING_GAP_IDS,
  type I206QuWei2001TwoRemainingGapCompletionAcquisitionEvidenceReport,
} from '../src/research/i206-qu-wei-2001-two-remaining-gap-completion-acquisition-evidence.js';
import {
  I207_REASSESSMENT_CONTROL_IDS,
  I207_RESIDUAL_PATH_IDS,
  buildI207QuWei2001TwoGapAcquisitionEvidenceAdequacyResidualPathReassessmentReview,
} from '../src/research/i207-qu-wei-2001-two-gap-acquisition-evidence-adequacy-residual-path-reassessment-review.js';

function validI206(): I206QuWei2001TwoRemainingGapCompletionAcquisitionEvidenceReport {
  return {
    evidenceRecordSetId: 'i206_fixture',
    status: 'RESOLVED_QU_WEI_2001_TWO_REMAINING_GAP_COMPLETION_ACQUISITION_EVIDENCE',
    decision:
      'QU_WEI_2001_TWO_REMAINING_GAP_ACQUISITION_EXECUTED_TWO_PATHS_CONTEXTUAL_REPRESENTATION_AND_DIRECT_UNBOUND_SEQUENCE_COMPARISON_ACQUIRED_ZERO_GAPS_RESOLVED_TWO_GAPS_REMAIN_NO_NEGATIVE_FINDING_NO_REBINDING_NO_INDEPENDENCE',
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI205BoundaryAccepted: true,
    targetPriorWitnessId: 'QU_WEI_SIZHU_XIANGZHEN_2001',
    resolvedPublicationGapPreserved: true,
    publicationGapRetargetedByThisGate: false,
    acquisitionPathCountExecuted: 2,
    allTwoFrozenAcquisitionPathsExecuted: true,
    acquisitionPathEvidenceRecordCount: 2,
    evidenceObligationCountAccepted: 8,
    acquisitionControlCountAccepted: 16,
    contextualEvidencePathCount: 2,
    qualifyingGapResolutionEvidenceCount: 0,
    resolvedGapCount: 0,
    unresolvedGapIds: I206_REMAINING_GAP_IDS,
    unresolvedGapCount: 2,
    explicitNegativeFindingCount: 0,
    publicRepresentationVarianceObserved: true,
    publicRepresentationLocatorCount: 2,
    byteStableRepresentationPairAcquired: false,
    reproducibleHashOrEquivalentContentIdentityAcquired: false,
    scanLineageTransformationOrProvenanceChainAcquired: false,
    directTitleTocPaginationTargetStructureAlignmentCompleted: false,
    pageCountFileSizeFilenameHostVarianceCreatesCanonicalIdentity: false,
    canonicalWitnessNormalizationGapResolved: false,
    unboundSizhuXiangzhenTargetSectionTextAcquired: true,
    unboundSizhuXiangzhenTargetSectionTitle: '第九章 五行生克路线',
    unboundSizhuXiangzhenRouteSequenceObserved: true,
    governed2003ZuoyonglunRouteSequenceAcquired: true,
    governed2003SourceIdentifiedAs2003TrainingMaterial: true,
    substantialRouteSequenceCorrespondenceObserved: true,
    correspondingRouteElementCount: 3,
    correspondingRouteElements: [
      'SAME_PILLAR_STEM_BRANCH_ROUTE',
      'STEM_STEM_SHENG_KE_HE_CHONG_ROUTE',
      'BRANCH_BRANCH_XING_CHONG_HE_HAI_ROUTE',
    ],
    canonically2001BoundTargetSectionFacsimileAcquired: false,
    directCanonical2001ContextAndPageAnchorAcquired: false,
    directCanonical2001To2003SequenceComparisonCompleted: false,
    exact2003RouteSequenceBoundIntoCanonical2001Witness: false,
    nearVerbatim2003RouteSequenceBoundIntoCanonical2001Witness: false,
    unboundPublicTextSimilarityMayResolveExactPassageGap: false,
    directDoctrinalAntecedentPreserved: true,
    doctrineLevelAntecedentMayResolveExactPassageGap: false,
    exactTargetPassageBindingGapResolved: false,
    oneRemainingGapMayBackfillTheOther: false,
    nonAcquisitionCreatesNegativeFinding: false,
    accessFailureCreatesNegativeFinding: false,
    searchSilenceCreatesNegativeFinding: false,
    paywallCreatesNegativeFinding: false,
    inaccessibleSubstrateCreatesNegativeFinding: false,
    failureToAcquireByteStablePairCreatesNegativeFinding: false,
    failureToAcquireCanonicalFacsimileCreatesNegativeFinding: false,
    targetedDiscoveryExhaustionEstablished: false,
    onlineCorpusExhaustionEstablished: false,
    corpusExhaustionEstablished: false,
    allTwoRemainingGapsRequiredBeforeRebindingReadiness: true,
    evidenceRebindingMethodologicallyReadyByThisGate: false,
    evidenceRebindingAuthorizedByThisGate: false,
    evidenceRebindingExecutedByThisGate: false,
    sameAuthor2001To2003DoctrinalDependencyPreserved: true,
    externalTargetLineageUnresolvedQuestionCountPreserved: 3,
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
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_QU_WEI_2001_TWO_GAP_ACQUISITION_EVIDENCE_ADEQUACY_RESIDUAL_PATH_REASSESSMENT_REVIEW',
  } as unknown as I206QuWei2001TwoRemainingGapCompletionAcquisitionEvidenceReport;
}

describe('I207 Qu Wei 2001 two-gap acquisition evidence adequacy and residual path reassessment', () => {
  it('accepts I206 as adequate for two unresolved findings and zero resolutions', () => {
    const r = buildI207QuWei2001TwoGapAcquisitionEvidenceAdequacyResidualPathReassessmentReview(validI206());
    expect(r.status).toBe('RESOLVED_QU_WEI_2001_TWO_GAP_ACQUISITION_EVIDENCE_ADEQUACY_RESIDUAL_PATH_REASSESSMENT_REVIEW');
    expect(r.exactI206BoundaryAccepted).toBe(true);
    expect(r.i206EvidenceAdequateForRecordedUnresolvedFindings).toBe(true);
    expect(r.assessedRemainingGapCount).toBe(2);
    expect(r.resolvedRemainingGapCount).toBe(0);
    expect(r.unresolvedRemainingGapCount).toBe(2);
    expect(r.unresolvedGapIdsAccepted).toEqual(I206_REMAINING_GAP_IDS);
  });

  it('preserves the resolved publication gap outside the remaining remediation surface', () => {
    const r = buildI207QuWei2001TwoGapAcquisitionEvidenceAdequacyResidualPathReassessmentReview(validI206());
    expect(r.resolvedPublicationGapPreserved).toBe(true);
    expect(r.publicationGapReopenedByThisGate).toBe(false);
  });

  it('accepts public representation overlap as targeting context but not canonical identity', () => {
    const r = buildI207QuWei2001TwoGapAcquisitionEvidenceAdequacyResidualPathReassessmentReview(validI206());
    expect(r.publicRepresentationOverlapAcceptedAsContext).toBe(true);
    expect(r.publicRepresentationOverlapQualifiesAsCanonicalIdentity).toBe(false);
    expect(r.byteStableRepresentationPairStillMissing).toBe(true);
    expect(r.scanLineageOrTransformationProvenanceStillMissing).toBe(true);
    expect(r.directFullStructureNormalizationStillMissing).toBe(true);
    expect(r.publicRepresentationOverlapSupportsTargetingButNotNormalization).toBe(true);
    expect(r.canonicalWitnessNormalizationGapResolved).toBe(false);
  });

  it('accepts three-element route correspondence as materially useful but still unbound', () => {
    const r = buildI207QuWei2001TwoGapAcquisitionEvidenceAdequacyResidualPathReassessmentReview(validI206());
    expect(r.unboundRouteSequenceComparisonAcceptedAsContext).toBe(true);
    expect(r.substantialRouteSequenceCorrespondenceAccepted).toBe(true);
    expect(r.correspondingRouteElementCountAccepted).toBe(3);
    expect(r.unboundSequenceComparisonHasMaterialDoctrinalValue).toBe(true);
    expect(r.unboundSequenceComparisonQualifiesAsExactOrNearVerbatimBinding).toBe(false);
    expect(r.sequenceCorrespondenceStrengthensSameAuthorDependencyContext).toBe(true);
    expect(r.governed2003SequenceAvailableForFutureCanonicalComparison).toBe(true);
    expect(r.canonically2001BoundTargetSectionStillMissing).toBe(true);
    expect(r.exactTargetPassageBindingGapResolved).toBe(false);
  });

  it('rejects equivalent public-surface repetition and freezes two materially new residual paths', () => {
    const r = buildI207QuWei2001TwoGapAcquisitionEvidenceAdequacyResidualPathReassessmentReview(validI206());
    expect(r.equivalentPublicSurfaceRepeatCountsAsRemediationProgress).toBe(false);
    expect(r.immediateEquivalentPublicSurfaceRepeatJustified).toBe(false);
    expect(r.materiallyNewCustodianOrCanonicallyBoundSubstrateRequired).toBe(true);
    expect(r.residualPathIds).toEqual(I207_RESIDUAL_PATH_IDS);
    expect(r.residualPathCount).toBe(2);
    expect(r.residualPathsFrozenProspectively).toBe(true);
    expect(r.custodianOrFirstGenerationWitnessPathStillReviewable).toBe(true);
    expect(r.canonicallyBoundTargetFacsimilePathStillReviewable).toBe(true);
    expect(r.residualAcquisitionReadinessReviewAuthorized).toBe(true);
  });

  it('keeps non-acquisition non-negative and makes no exhaustion claim', () => {
    const r = buildI207QuWei2001TwoGapAcquisitionEvidenceAdequacyResidualPathReassessmentReview(validI206());
    expect(r.explicitNegativeFindingCountAccepted).toBe(0);
    expect(r.nonAcquisitionCreatesNegativeFinding).toBe(false);
    expect(r.accessFailureCreatesNegativeFinding).toBe(false);
    expect(r.searchSilenceCreatesNegativeFinding).toBe(false);
    expect(r.paywallCreatesNegativeFinding).toBe(false);
    expect(r.targetedDiscoveryExhaustionEstablished).toBe(false);
    expect(r.onlineCorpusExhaustionEstablished).toBe(false);
    expect(r.corpusExhaustionEstablished).toBe(false);
    expect(r.universalNoFurtherEvidenceClaimEstablished).toBe(false);
  });

  it('keeps rebinding, independence, I132, frozen v2 and production guards closed', () => {
    const r = buildI207QuWei2001TwoGapAcquisitionEvidenceAdequacyResidualPathReassessmentReview(validI206());
    expect(r.allTwoRemainingGapsRequiredBeforeRebindingReadiness).toBe(true);
    expect(r.evidenceRebindingMethodologicallyReady).toBe(false);
    expect(r.evidenceRebindingAuthorizedByThisGate).toBe(false);
    expect(r.provenanceIndependenceAdjudicatedByThisGate).toBe(false);
    expect(r.I132IndependentNormativeProvenanceRequirementRemainsNormative).toBe(true);
    expect(r.I132PolicyRelaxationAuthorizedByThisGate).toBe(false);
    expect(r.reassessmentControlIds).toEqual(I207_REASSESSMENT_CONTROL_IDS);
    expect(r.reassessmentControlCount).toBe(12);
    expect(r.reassessmentControlsFrozen).toBe(true);
    expect(r.currentV2PackageAndCandidateSetRemainImmutable).toBe(true);
    expect(r.candidateSetMutatedByThisGate).toBe(false);
    expect(r.candidateSetReevaluationAuthorizedByThisGate).toBe(false);
    expect(r.actualCompositionPerformedByThisGate).toBe(false);
    expect(r.thresholdRuleCreatedByThisGate).toBe(false);
    expect(r.classificationAuthorized).toBe(false);
    expect(r.numericScoringAuthorized).toBe(false);
  });

  it('fails closed if I206 is mutated to treat unbound text similarity as exact-passage authority', () => {
    const mutated = {
      ...validI206(),
      unboundPublicTextSimilarityMayResolveExactPassageGap: true,
    } as unknown as I206QuWei2001TwoRemainingGapCompletionAcquisitionEvidenceReport;
    const r = buildI207QuWei2001TwoGapAcquisitionEvidenceAdequacyResidualPathReassessmentReview(mutated);
    expect(r.status).toBe('I206_TWO_GAP_ACQUISITION_EVIDENCE_BOUNDARY_INVALID');
    expect(r.decision).toBe('QU_WEI_2001_TWO_GAP_ACQUISITION_EVIDENCE_REASSESSMENT_NOT_READY');
    expect(r.exactI206BoundaryAccepted).toBe(false);
    expect(r.assessedRemainingGapCount).toBe(0);
    expect(r.unresolvedRemainingGapCount).toBe(0);
    expect(r.residualPathCount).toBe(0);
    expect(r.residualAcquisitionReadinessReviewAuthorized).toBe(false);
    expect(r.currentV2ProvenanceDisposition).toBe('NOT_ASSESSED');
  });
});
