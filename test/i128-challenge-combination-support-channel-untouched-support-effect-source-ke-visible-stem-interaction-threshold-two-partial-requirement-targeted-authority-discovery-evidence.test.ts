import { describe, expect, test } from 'vitest';
import {
  buildI128ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdTwoPartialRequirementTargetedAuthorityDiscoveryEvidence,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdTwoPartialRequirementTargetedAuthorityDiscoveryReadinessReviewReport,
} from '../src/index.js';

const TARGET_IDS = [
  'VISIBLE_STEM_POSITION_SCOPE_AND_POSITION_CLASS_APPLICABILITY',
  'WU_LI_BOUNDARY_SEMANTICS_AND_EXCEPTIONS',
] as const;

function i127(
  overrides: Record<string, unknown> = {},
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdTwoPartialRequirementTargetedAuthorityDiscoveryReadinessReviewReport {
  const base = {
    reviewId: 'i127_i128_fixture',
    reviewVersion: 'fixture',
    status:
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_TWO_PARTIAL_REQUIREMENT_TARGETED_DISCOVERY_READINESS',
    decision:
      'POSITION_BINARY_APPLICABILITY_AND_WU_LI_BOUNDARY_TARGETED_DISCOVERY_AUTHORIZED_SINGLE_CANDIDATE_FULL_SIX_CONTRACT_PRESERVED',
    upstreamI126EvidenceId: 'i126_fixture',
    currentCandidateSourceId:
      'source_wu_huaiyun_yinyang_wuxing_bazi_yucexue_chuji_scribd_733612933',
    currentCandidateTitle: '阴阳五行八字预测学（初级教材）',
    targetRequirementIds: [...TARGET_IDS],
    targetRequirements: [],
    targetRequirementCount: 2,
    targetedDiscoveryMayProceed: true,
    discoveryMode: 'SAME_CANDIDATE_FIRST_TWO_PARTIAL_REQUIREMENTS_WITH_FULL_SIX_RECHECK',
    currentCandidateReinspectionAuthorized: true,
    verifiedSameWorkAlternateWitnessMayBeInspectedAfterIdentityResolution: true,
    verifiedSameWorkNewLocatorMaySupplementCurrentCandidate: true,
    currentCandidateFourSupportedRequirementsMayBeRetainedWithinSameSourceIdentity: true,
    currentCandidateFourSupportedRequirementsMayBeTransferredToDifferentCandidate: false,
    newCandidateDiscoveryAuthorized: true,
    newCandidateMustIndependentlySatisfyAllSixI118Requirements: true,
    differentCandidateMayBorrowCurrentCandidateSupportedCoverage: false,
    differentCandidateMayBorrowCurrentCandidatePartialCoverage: false,
    crossCandidateCompositionAuthorized: false,
    multiSourceCompositionAuthorized: false,
    semanticEquivalenceAcrossSourcesAuthorized: false,
    searchSnippetMaySatisfyTarget: false,
    modelSynthesisMaySatisfyTarget: false,
    numericCalibrationMaySatisfyTarget: false,
    positionTargetRequiresExplicitBinaryApplicabilityStatement: true,
    positionTargetMustReconcileRemoteOperativeAndInoperativeExamples: true,
    distanceAloneMayBeAssumedBinaryThreshold: false,
    remoteQualitativeForceMayBePromotedToBooleanEligibility: false,
    wuLiTargetRequiresExplicitGeneralSemanticBoundary: true,
    wuLiTargetRequiresExplicitExceptionOrConditionBoundary: true,
    sourceLocalWuLiWorkedExamplesMayBeUniversalized: false,
    wuLiMayBeEquatedToNoInteractionWithoutSameSourceDefinition: false,
    wuLiMayBeEquatedToZeroEffectWithoutSameSourceDefinition: false,
    wuLiMayBeEquatedToNegligibleForceWithoutSameSourceDefinition: false,
    targetedRequirementHitAloneMayAuthorizeThreshold: false,
    targetedRequirementHitAloneMayResolveEffectiveInteractionSet: false,
    fullSixCoverageReevaluationRequiredAfterNewEvidence: true,
    discoveryPerformedByThisGate: false,
    candidateRegisteredByThisGate: false,
    requirementCoverageEvaluatedByThisGate: false,
    authorityAcquiredByThisGate: false,
    visibleStemBinaryEffectiveInteractionEligibilityResolved: false,
    effectiveInteractionSetResolved: false,
    thresholdRuleCreatedByThisGate: false,
    damageEvaluationAuthorized: false,
    i98KeDamageVocabularyEvaluationResolved: false,
    i98ResearchMethodologyMaterializationAuthorized: false,
    hiddenStemInteractionEligibilityGapRemains: true,
    hiddenStemAuthorityGap:
      'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED',
    methodologyDefinitionCreatedByThisGate: false,
    ruleDefinitionCreatedByThisGate: false,
    registrySnapshotMutatedByThisGate: false,
    reviewAttestationCreatedByThisGate: false,
    noTrackedRelationTouchSemanticsRemainUnchanged: true,
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_TWO_PARTIAL_REQUIREMENT_TARGETED_AUTHORITY_DISCOVERY_EVIDENCE',
    notes: [],
  };

  return { ...base, ...overrides } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdTwoPartialRequirementTargetedAuthorityDiscoveryReadinessReviewReport;
}

describe('I128 source 克 visible-stem threshold targeted two-partial discovery evidence', () => {
  test('performs same-work-first and broadened discovery without closing either partial gap', () => {
    const report = buildI128ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdTwoPartialRequirementTargetedAuthorityDiscoveryEvidence(i127());

    expect(report.status).toBe(
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_TWO_PARTIAL_REQUIREMENT_TARGETED_AUTHORITY_DISCOVERY_EVIDENCE',
    );
    expect(report.decision).toBe(
      'TARGETED_TWO_PARTIAL_DISCOVERY_REINSPECTED_CURRENT_CANDIDATE_AND_EXTERNAL_CORPUS_NO_EXPLICIT_SAME_CANDIDATE_POSITION_BOOLEAN_PREDICATE_OR_GENERAL_WU_LI_BOUNDARY_VERIFIED',
    );
    expect(report.targetRequirementIds).toEqual(TARGET_IDS);
    expect(report.targetedDiscoveryPerformed).toBe(true);
    expect(report.sameWorkFirstSearchPerformed).toBe(true);
    expect(report.broadenedExternalSearchPerformed).toBe(true);
    expect(report.positionPartialGapClosed).toBe(false);
    expect(report.wuLiPartialGapClosed).toBe(false);
    expect(report.sameWorkTargetGapClosureCount).toBe(0);
  });

  test('confirms the same Wu Huaiyun work contains both operative and inoperative remote cases', () => {
    const report = buildI128ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdTwoPartialRequirementTargetedAuthorityDiscoveryEvidence(i127());
    const current = report.inspectedCandidates.find(
      (item) => item.disposition === 'CURRENT_CANDIDATE_REINSPECTED_NO_TARGET_GAP_CLOSURE',
    );

    expect(report.currentCandidateReinspected).toBe(true);
    expect(report.currentCandidateFourSupportedRequirementsRetained).toBe(true);
    expect(report.sameWorkRemoteOperativeExamplesConfirmed).toBe(true);
    expect(report.sameWorkRemoteInoperativeExamplesConfirmed).toBe(true);
    expect(report.sameWorkLiteralWuLiExamplesConfirmed).toBe(true);
    expect(report.sameWorkGeneralTaxonomyIncludesWuLi).toBe(true);
    expect(report.sameWorkNewPositionBinaryPredicateFound).toBe(false);
    expect(report.sameWorkNewGeneralWuLiBoundaryFound).toBe(false);
    expect(current?.explicitPositionBinaryApplicabilityStatementVerified).toBe(false);
    expect(current?.explicitGeneralWuLiSemanticBoundaryVerified).toBe(false);
  });

  test('records Wei Qianli as strong position-boundary evidence but not a full-six candidate', () => {
    const report = buildI128ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdTwoPartialRequirementTargetedAuthorityDiscoveryEvidence(i127());
    const wei = report.inspectedCandidates.find(
      (item) => item.disposition === 'POSITION_BOUNDARY_ONLY_NO_FULL_SIX_ADMISSION',
    );

    expect(report.externalPositionBoundaryCandidateObserved).toBe(true);
    expect(wei?.author).toBe('韦千里');
    expect(wei?.explicitPositionBinaryApplicabilityStatementVerified).toBe(true);
    expect(wei?.remoteOperativeAndInoperativeCasesReconciledByGeneralRule).toBe(true);
    expect(wei?.literalWuLiVerified).toBe(false);
    expect(wei?.allSixI118RequirementsIndependentlyVerified).toBe(false);
    expect(wei?.candidateRegisteredByThisGate).toBe(false);
  });

  test('records Di Tian Sui as a local Wu Li case contrast without universalizing it', () => {
    const report = buildI128ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdTwoPartialRequirementTargetedAuthorityDiscoveryEvidence(i127());
    const di = report.inspectedCandidates.find(
      (item) => item.disposition === 'WU_LI_CASE_BOUNDARY_ONLY_NO_FULL_SIX_ADMISSION',
    );

    expect(report.externalWuLiCaseBoundaryCandidateObserved).toBe(true);
    expect(di?.literalWuLiVerified).toBe(true);
    expect(di?.explicitGeneralWuLiSemanticBoundaryVerified).toBe(false);
    expect(di?.explicitWuLiExceptionBoundaryVerified).toBe(false);
    expect(di?.allSixI118RequirementsIndependentlyVerified).toBe(false);
  });

  test('records generic Wu Li force criteria as different-candidate context only', () => {
    const report = buildI128ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdTwoPartialRequirementTargetedAuthorityDiscoveryEvidence(i127());
    const generic = report.inspectedCandidates.find(
      (item) => item.disposition === 'GENERIC_WU_LI_FORCE_CRITERIA_ONLY_NO_FULL_SIX_ADMISSION',
    );

    expect(report.externalGenericWuLiForceCriteriaCandidateObserved).toBe(true);
    expect(generic?.literalWuLiVerified).toBe(true);
    expect(generic?.explicitGeneralWuLiSemanticBoundaryVerified).toBe(true);
    expect(generic?.explicitWuLiExceptionBoundaryVerified).toBe(true);
    expect(generic?.explicitPositionBinaryApplicabilityStatementVerified).toBe(false);
    expect(generic?.allSixI118RequirementsIndependentlyVerified).toBe(false);
  });

  test('forbids every cross-candidate completion path despite complementary external evidence', () => {
    const report = buildI128ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdTwoPartialRequirementTargetedAuthorityDiscoveryEvidence(i127());

    expect(report.complementaryExternalEvidenceExists).toBe(true);
    expect(report.complementaryExternalEvidenceMayCompleteCurrentCandidate).toBe(false);
    expect(report.currentCandidateCoverageMayBeCombinedWithWeiQianli).toBe(false);
    expect(report.currentCandidateCoverageMayBeCombinedWithDiTianSui).toBe(false);
    expect(report.currentCandidateCoverageMayBeCombinedWithGenericWuLiSecondary).toBe(false);
    expect(report.crossCandidateCompositionPerformed).toBe(false);
    expect(report.crossCandidateCompositionAuthorized).toBe(false);
    expect(report.multiSourceCompositionAuthorized).toBe(false);
    expect(report.semanticEquivalenceAcrossSourcesAuthorized).toBe(false);
  });

  test('keeps threshold authority closed and routes to scoped exhaustion-contract reassessment', () => {
    const first = buildI128ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdTwoPartialRequirementTargetedAuthorityDiscoveryEvidence(i127());
    const second = buildI128ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdTwoPartialRequirementTargetedAuthorityDiscoveryEvidence(i127());

    expect(first.evidenceId).toBe(second.evidenceId);
    expect(first.currentCandidateFullSixAchieved).toBe(false);
    expect(first.newIndependentFullSixCandidateFound).toBe(false);
    expect(first.newCandidateRegisteredCount).toBe(0);
    expect(first.currentCandidateAcceptedForThresholdAuthority).toBe(false);
    expect(first.candidatePromotionAuthorizedByThisGate).toBe(false);
    expect(first.authorityAcquiredByThisGate).toBe(false);
    expect(first.fullSixCoverageReevaluationAuthorizedByThisEvidence).toBe(false);
    expect(first.visibleStemBinaryEffectiveInteractionEligibilityResolved).toBe(false);
    expect(first.effectiveInteractionSetResolved).toBe(false);
    expect(first.thresholdRuleCreatedByThisGate).toBe(false);
    expect(first.classificationAuthorized).toBe(false);
    expect(first.numericScoringAuthorized).toBe(false);
    expect(first.absenceInInspectedCorpusMayBeClaimedAsUniversalAbsence).toBe(false);
    expect(first.recommendedNextGate).toBe(
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_TWO_PARTIAL_REQUIREMENT_DISCOVERY_EXHAUSTION_AND_CONTRACT_REASSESSMENT_REVIEW',
    );
  });

  test('fails closed if I127 no longer authorizes same-candidate targeted discovery', () => {
    const report = buildI128ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdTwoPartialRequirementTargetedAuthorityDiscoveryEvidence(
      i127({ targetedDiscoveryMayProceed: false }),
    );

    expect(report.status).toBe('I127_UNRESOLVED_OR_INVALID');
    expect(report.decision).toBe('TWO_PARTIAL_REQUIREMENT_TARGETED_DISCOVERY_NOT_PERFORMED');
    expect(report.targetedDiscoveryPerformed).toBe(false);
    expect(report.inspectedCandidateCount).toBe(0);
    expect(report.inspectedCandidates).toEqual([]);
    expect(report.recommendedNextGate).toBe(
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_TWO_PARTIAL_REQUIREMENT_TARGETED_AUTHORITY_DISCOVERY_READINESS_REVIEW',
    );
  });
});
