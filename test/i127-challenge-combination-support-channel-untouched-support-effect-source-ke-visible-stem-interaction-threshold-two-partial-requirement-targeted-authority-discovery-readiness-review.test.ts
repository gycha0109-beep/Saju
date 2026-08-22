import { describe, expect, test } from 'vitest';
import {
  buildI127ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdTwoPartialRequirementTargetedAuthorityDiscoveryReadinessReview,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdSingleCandidateFullSixRequirementCoverageEvaluationEvidenceReport,
} from '../src/index.js';

const PARTIAL_IDS = [
  'VISIBLE_STEM_POSITION_SCOPE_AND_POSITION_CLASS_APPLICABILITY',
  'WU_LI_BOUNDARY_SEMANTICS_AND_EXCEPTIONS',
] as const;

function i126(
  overrides: Record<string, unknown> = {},
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdSingleCandidateFullSixRequirementCoverageEvaluationEvidenceReport {
  const base = {
    evidenceId: 'i126_i127_fixture',
    evidenceVersion: 'fixture',
    status:
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_SINGLE_CANDIDATE_FULL_SIX_REQUIREMENT_COVERAGE_EVALUATION_EVIDENCE',
    decision:
      'WU_HUAIYUN_CANDIDATE_SATISFIES_FOUR_OF_SIX_I118_REQUIREMENTS_TWO_PARTIAL_GAPS_REMAIN_NO_THRESHOLD_AUTHORITY',
    upstreamI125EvidenceId: 'i125_fixture',
    candidateSourceId:
      'source_wu_huaiyun_yinyang_wuxing_bazi_yucexue_chuji_scribd_733612933',
    candidateSourceTitle: '阴阳五行八字预测学（初级教材）',
    candidateSourceAuthor: '吴怀云',
    coverage: [],
    evaluatedRequirementCount: 6,
    satisfiedRequirementCount: 4,
    partialRequirementCount: 2,
    unsupportedRequirementCount: 0,
    allSixRequirementsEvaluated: true,
    candidateSatisfiesAllSixRequirements: false,
    thresholdAuthorityCoverageSatisfied: false,
    explicitBinaryEffectiveInteractionSemanticsSatisfied: true,
    visibleStemPositionScopeAndPositionClassApplicabilitySatisfied: false,
    qualitativeForceVsBinaryEligibilitySeparationSatisfied: true,
    wuLiBoundarySemanticsAndExceptionsSatisfied: false,
    contextAndExceptionConditionsSatisfied: true,
    independentNormativeProvenanceSatisfied: true,
    partialRequirementIds: [...PARTIAL_IDS],
    unsupportedRequirementIds: [],
    remotePositionQualitativeForceRuleObserved: true,
    remotePositionNoEffectiveControlExamplesObserved: true,
    remotePositionEffectiveControlExamplesObserved: true,
    distanceAloneCannotDefineBinaryEligibilityFromThisSource: true,
    sourceProvidesExhaustivePositionToBinaryPredicate: false,
    literalWuLiExamplesHaveSourceLocalConsequences: true,
    sourceExplicitlyDefinesWuLiAsUniversalNoInteraction: false,
    sourceExplicitlyDefinesWuLiAsUniversalZeroEffect: false,
    sourceExplicitlyDefinesWuLiAsUniversalNegligibleForce: false,
    sourceProvidesExhaustiveWuLiExceptionBoundary: false,
    workedWuLiExamplesMayBePromotedToUniversalThreshold: false,
    candidateAcceptedForThresholdAuthority: false,
    candidatePromotedToThresholdAuthority: false,
    authorityAcquiredByThisGate: false,
    promotionReadinessReviewRequired: false,
    targetedPartialRequirementDiscoveryRequired: true,
    priorCandidateCoverageImported: false,
    crossCandidateCompositionPerformed: false,
    crossCandidateCompositionAuthorized: false,
    searchSnippetAloneAcceptedAsAuthority: false,
    modelSynthesisAcceptedAsAuthority: false,
    numericCalibrationAcceptedAsAuthority: false,
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
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_TWO_PARTIAL_REQUIREMENT_TARGETED_AUTHORITY_DISCOVERY_READINESS_REVIEW',
    notes: [],
  };

  return { ...base, ...overrides } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdSingleCandidateFullSixRequirementCoverageEvaluationEvidenceReport;
}

describe('I127 source 克 visible-stem threshold two-partial targeted discovery readiness', () => {
  test('authorizes targeted discovery for exactly the two I126 partial requirements', () => {
    const report = buildI127ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdTwoPartialRequirementTargetedAuthorityDiscoveryReadinessReview(i126());

    expect(report.status).toBe(
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_TWO_PARTIAL_REQUIREMENT_TARGETED_DISCOVERY_READINESS',
    );
    expect(report.decision).toBe(
      'POSITION_BINARY_APPLICABILITY_AND_WU_LI_BOUNDARY_TARGETED_DISCOVERY_AUTHORIZED_SINGLE_CANDIDATE_FULL_SIX_CONTRACT_PRESERVED',
    );
    expect(report.targetRequirementIds).toEqual(PARTIAL_IDS);
    expect(report.targetRequirementCount).toBe(2);
    expect(report.targetedDiscoveryMayProceed).toBe(true);
    expect(report.discoveryMode).toBe(
      'SAME_CANDIDATE_FIRST_TWO_PARTIAL_REQUIREMENTS_WITH_FULL_SIX_RECHECK',
    );
  });

  test('freezes explicit target questions rather than treating topical relevance as satisfaction', () => {
    const report = buildI127ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdTwoPartialRequirementTargetedAuthorityDiscoveryReadinessReview(i126());
    const position = report.targetRequirements[0]!;
    const wuLi = report.targetRequirements[1]!;

    expect(position.requirementId).toBe(
      'VISIBLE_STEM_POSITION_SCOPE_AND_POSITION_CLASS_APPLICABILITY',
    );
    expect(position.exactTargetQuestion).toContain('Boolean effective-interaction applicability');
    expect(position.sameCandidateExplicitEvidenceRequired).toBe(true);
    expect(position.workedExampleAloneMaySatisfy).toBe(false);
    expect(position.qualitativeForceAloneMaySatisfy).toBe(false);
    expect(wuLi.requirementId).toBe('WU_LI_BOUNDARY_SEMANTICS_AND_EXCEPTIONS');
    expect(wuLi.exactTargetQuestion).toContain('无力/無力');
    expect(wuLi.workedExampleAloneMaySatisfy).toBe(false);
  });

  test('allows same-work supplementation while retaining the four supported requirements only within the same source identity', () => {
    const report = buildI127ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdTwoPartialRequirementTargetedAuthorityDiscoveryReadinessReview(i126());

    expect(report.currentCandidateReinspectionAuthorized).toBe(true);
    expect(report.verifiedSameWorkAlternateWitnessMayBeInspectedAfterIdentityResolution).toBe(true);
    expect(report.verifiedSameWorkNewLocatorMaySupplementCurrentCandidate).toBe(true);
    expect(report.currentCandidateFourSupportedRequirementsMayBeRetainedWithinSameSourceIdentity).toBe(true);
    expect(report.currentCandidateFourSupportedRequirementsMayBeTransferredToDifferentCandidate).toBe(false);
  });

  test('requires every different candidate to satisfy all six without borrowing Wu Huaiyun coverage', () => {
    const report = buildI127ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdTwoPartialRequirementTargetedAuthorityDiscoveryReadinessReview(i126());

    expect(report.newCandidateDiscoveryAuthorized).toBe(true);
    expect(report.newCandidateMustIndependentlySatisfyAllSixI118Requirements).toBe(true);
    expect(report.differentCandidateMayBorrowCurrentCandidateSupportedCoverage).toBe(false);
    expect(report.differentCandidateMayBorrowCurrentCandidatePartialCoverage).toBe(false);
    expect(report.crossCandidateCompositionAuthorized).toBe(false);
    expect(report.multiSourceCompositionAuthorized).toBe(false);
    expect(report.semanticEquivalenceAcrossSourcesAuthorized).toBe(false);
  });

  test('requires an explicit position-to-binary rule that reconciles operative and inoperative remote cases', () => {
    const report = buildI127ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdTwoPartialRequirementTargetedAuthorityDiscoveryReadinessReview(i126());

    expect(report.positionTargetRequiresExplicitBinaryApplicabilityStatement).toBe(true);
    expect(report.positionTargetMustReconcileRemoteOperativeAndInoperativeExamples).toBe(true);
    expect(report.distanceAloneMayBeAssumedBinaryThreshold).toBe(false);
    expect(report.remoteQualitativeForceMayBePromotedToBooleanEligibility).toBe(false);
  });

  test('requires an explicit general Wu Li boundary and exceptions rather than universalizing examples', () => {
    const report = buildI127ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdTwoPartialRequirementTargetedAuthorityDiscoveryReadinessReview(i126());

    expect(report.wuLiTargetRequiresExplicitGeneralSemanticBoundary).toBe(true);
    expect(report.wuLiTargetRequiresExplicitExceptionOrConditionBoundary).toBe(true);
    expect(report.sourceLocalWuLiWorkedExamplesMayBeUniversalized).toBe(false);
    expect(report.wuLiMayBeEquatedToNoInteractionWithoutSameSourceDefinition).toBe(false);
    expect(report.wuLiMayBeEquatedToZeroEffectWithoutSameSourceDefinition).toBe(false);
    expect(report.wuLiMayBeEquatedToNegligibleForceWithoutSameSourceDefinition).toBe(false);
  });

  test('keeps authority closed and deterministically routes to targeted discovery evidence', () => {
    const first = buildI127ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdTwoPartialRequirementTargetedAuthorityDiscoveryReadinessReview(i126());
    const second = buildI127ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdTwoPartialRequirementTargetedAuthorityDiscoveryReadinessReview(i126());

    expect(first.reviewId).toBe(second.reviewId);
    expect(first.targetedRequirementHitAloneMayAuthorizeThreshold).toBe(false);
    expect(first.targetedRequirementHitAloneMayResolveEffectiveInteractionSet).toBe(false);
    expect(first.fullSixCoverageReevaluationRequiredAfterNewEvidence).toBe(true);
    expect(first.discoveryPerformedByThisGate).toBe(false);
    expect(first.authorityAcquiredByThisGate).toBe(false);
    expect(first.visibleStemBinaryEffectiveInteractionEligibilityResolved).toBe(false);
    expect(first.effectiveInteractionSetResolved).toBe(false);
    expect(first.thresholdRuleCreatedByThisGate).toBe(false);
    expect(first.classificationAuthorized).toBe(false);
    expect(first.numericScoringAuthorized).toBe(false);
    expect(first.recommendedNextGate).toBe(
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_TWO_PARTIAL_REQUIREMENT_TARGETED_AUTHORITY_DISCOVERY_EVIDENCE',
    );
  });

  test('fails closed if the I126 partial-gap shape changes', () => {
    const report = buildI127ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdTwoPartialRequirementTargetedAuthorityDiscoveryReadinessReview(
      i126({ candidateSatisfiesAllSixRequirements: true }),
    );

    expect(report.status).toBe('I126_UNRESOLVED_OR_INVALID');
    expect(report.decision).toBe('TWO_PARTIAL_REQUIREMENT_TARGETED_DISCOVERY_READINESS_NOT_ESTABLISHED');
    expect(report.targetedDiscoveryMayProceed).toBe(false);
    expect(report.targetRequirementCount).toBe(0);
    expect(report.discoveryMode).toBe('NONE');
    expect(report.recommendedNextGate).toBe(
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_SINGLE_CANDIDATE_FULL_SIX_REQUIREMENT_COVERAGE_EVALUATION_EVIDENCE',
    );
  });
});
