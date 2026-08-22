import { describe, expect, test } from 'vitest';
import {
  buildI105ChallengeCombinationSupportChannelUntouchedSupportEffectBlockedVocabularyAuthorityAcquisitionReadinessReview,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectExistingSubstrateSourceVocabularyBindingPromotionReadinessReviewReport,
} from '../src/index.js';

function i104(): ChallengeCombinationSupportChannelUntouchedSupportEffectExistingSubstrateSourceVocabularyBindingPromotionReadinessReviewReport {
  return {
    reviewId: 'i104_i105_fixture',
    reviewVersion: 'fixture',
    status: 'RESOLVED_EXISTING_SUBSTRATE_SOURCE_VOCABULARY_BINDING_PROMOTION_READINESS',
    decision: 'EXISTING_SUBSTRATE_BINDINGS_VERIFIED_FULL_METHODOLOGY_MATERIALIZATION_BLOCKED_BY_KE_XING_WEI_AND_EFFECT_SEMANTICS',
    upstreamI98ContractId: 'i98_fixture',
    upstreamI103EvidenceId: 'i103_fixture',
    candidateSourceId: 'source_chenyuan_sizhu_yuce_rumen_1995_isbn9787805922515',
    items: [],
    verifiedExistingSubstrateTerms: ['合', '冲', '生'],
    authorityBlockedTerms: ['克', '刑', '卫'],
    verifiedExistingSubstrateTermCount: 3,
    authorityBlockedTermCount: 3,
    vocabularyBindingProgress: 'PARTIAL_3_OF_6',
    sourceHeBindingVerified: true,
    sourceChongBindingVerified: true,
    sourceShengBindingVerified: true,
    sourceKeAuthorityStillMissing: true,
    sourceXingAuthorityStillMissing: true,
    sourceWeiAuthorityStillMissing: true,
    existingSubstrateBindingsMayReplaceI98UnresolvedBindingForThoseTerms: true,
    allSixI98VocabularyBindingsResolved: false,
    exactDamageVocabularyEvaluationResolved: false,
    supportOrProtectionConditionEvaluationResolved: false,
    noUnresolvedRequiredBindingConditionSatisfied: false,
    canonicalRequiredFactBindingsResolvedForI98Materialization: false,
    partialMethodologyDefinitionMaterializationAuthorized: false,
    researchMethodologyMaterializationAuthorized: false,
    methodologyDefinitionCreatedByThisGate: false,
    methodologyRegisteredByThisGate: false,
    ruleDefinitionCreatedByThisGate: false,
    registrySnapshotMutatedByThisGate: false,
    reviewAttestationCreatedByThisGate: false,
    evidenceBindingMayBePromotedToEffectOutcome: false,
    zeroBindingMayBePromotedToEffectAbsence: false,
    noTrackedRelationTouchMayCoverUnmodeledVocabulary: false,
    sourceActivationVerdictAuthorized: false,
    sourcePersistenceVerdictAuthorized: false,
    sourceEffectiveSupportVerdictAuthorized: false,
    relativeForceVerdictAuthorized: false,
    clashWinnerVerdictAuthorized: false,
    rescueEffectAuthorized: false,
    clashSettlementAuthorized: false,
    crossRelationPrecedenceAuthorized: false,
    targetPostRelationRootState: 'not_determined',
    effectiveMechanismForceVerdict: 'not_determined',
    relationSpecificUsefulnessHarmfulness: 'not_determined',
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    recommendedNextGate: 'UNTOUCHED_SUPPORT_EFFECT_BLOCKED_VOCABULARY_AUTHORITY_ACQUISITION_READINESS_REVIEW',
    notes: [],
  };
}

describe('I105 untouched-support blocked vocabulary authority acquisition readiness', () => {
  test('splits 克 刑 卫 into three independent governed authority lanes', () => {
    const report = buildI105ChallengeCombinationSupportChannelUntouchedSupportEffectBlockedVocabularyAuthorityAcquisitionReadinessReview(i104());
    expect(report.status).toBe('RESOLVED_BLOCKED_VOCABULARY_AUTHORITY_ACQUISITION_READINESS');
    expect(report.blockedTerms).toEqual(['克', '刑', '卫']);
    expect(report.laneCount).toBe(3);
    expect(report.allThreeBlockedTermsAssignedIndependentLane).toBe(true);
    expect(report.lanes.map((lane) => lane.laneId)).toEqual([
      'SOURCE_KE_CONTROL_DIRECTION_AUTHORITY',
      'SOURCE_XING_BRANCH_PUNISHMENT_IDENTITY_AUTHORITY',
      'SOURCE_WEI_PROTECTION_EFFECT_CRITERIA_AUTHORITY',
    ]);
  });

  test('requires exact control-cycle authority for 克 without creating a structural relation kind', () => {
    const report = buildI105ChallengeCombinationSupportChannelUntouchedSupportEffectBlockedVocabularyAuthorityAcquisitionReadinessReview(i104());
    const lane = report.lanes.find((item) => item.sourceTerm === '克');
    expect(lane?.requiredAuthority).toEqual([
      'EXACT_FIVE_ELEMENT_CONTROL_CYCLE',
      'SOURCE_LOCAL_CONTROL_DIRECTION_MAPPING',
      'STEM_BRANCH_COMPONENT_APPLICABILITY',
      'CONTROL_DIRECTION_VS_DAMAGE_OUTCOME_SEPARATION',
    ]);
    expect(lane?.structuralRelationKindRequiredAfterAuthority).toBe(false);
    expect(lane?.directionalEvidenceAdapterRequiredAfterAuthority).toBe(true);
    expect(report.sourceKeMayInferControlCycleFromFiveElementFacts).toBe(false);
  });

  test('requires independent branch-punishment identity authority for 刑', () => {
    const report = buildI105ChallengeCombinationSupportChannelUntouchedSupportEffectBlockedVocabularyAuthorityAcquisitionReadinessReview(i104());
    const lane = report.lanes.find((item) => item.sourceTerm === '刑');
    expect(lane?.requiredAuthority).toContain('EXACT_BRANCH_PUNISHMENT_MEMBERSHIP');
    expect(lane?.requiredAuthority).toContain('PUNISHMENT_RELATION_ARITY');
    expect(lane?.requiredAuthority).toContain('SELF_PUNISHMENT_CONVENTION');
    expect(lane?.structuralRelationKindRequiredAfterAuthority).toBe(true);
    expect(report.sourceXingMayCollapseIntoBranchClash).toBe(false);
  });

  test('treats 卫 as protection-effect authority rather than support or clash-rescue alias', () => {
    const report = buildI105ChallengeCombinationSupportChannelUntouchedSupportEffectBlockedVocabularyAuthorityAcquisitionReadinessReview(i104());
    const lane = report.lanes.find((item) => item.sourceTerm === '卫');
    expect(lane?.requiredAuthority).toContain('GENERIC_PROTECTION_CRITERIA');
    expect(lane?.requiredAuthority).toContain('PROTECTION_VS_SUPPORT_AND_CLASH_RESCUE_SEPARATION');
    expect(lane?.structuralRelationKindRequiredAfterAuthority).toBe(false);
    expect(lane?.protectionEffectStateTaxonomyRequiredAfterAuthority).toBe(true);
    expect(report.sourceWeiMayInferProtectionFromSupportPresence).toBe(false);
    expect(report.sourceWeiMayCollapseIntoClashRescue).toBe(false);
  });

  test('blocks cross-lane and general-knowledge substitution', () => {
    const report = buildI105ChallengeCombinationSupportChannelUntouchedSupportEffectBlockedVocabularyAuthorityAcquisitionReadinessReview(i104());
    expect(report.crossLaneSubstitutionAuthorized).toBe(false);
    expect(report.partialLaneCompletionMaySatisfyAllSixI98Bindings).toBe(false);
    expect(report.generalKnowledgeInferenceAuthorized).toBe(false);
    expect(report.existingCandidateVocabularyMentionMayCloseAuthorityGap).toBe(false);
    expect(report.lanes.every((lane) => lane.generalKnowledgeMaySubstitute === false && lane.otherLaneAuthorityMaySubstitute === false)).toBe(true);
  });

  test('requires governed original-source registration but does not directly implement taxonomy or adapters', () => {
    const report = buildI105ChallengeCombinationSupportChannelUntouchedSupportEffectBlockedVocabularyAuthorityAcquisitionReadinessReview(i104());
    expect(report.lanes.every((lane) => lane.originalSourceInspectionRequired && lane.reproducibleLocatorRequired && lane.independentRegistrationRequired && lane.mayReuseI87SourceRegistrationContract)).toBe(true);
    expect(report.lanes.every((lane) => lane.implementationAuthorizedByThisGate === false)).toBe(true);
    expect(report.acquisitionResultMayDirectlyCreateMethodologyDefinition).toBe(false);
    expect(report.acquisitionResultMayDirectlyCreateRuleDefinition).toBe(false);
    expect(report.acquisitionResultMayDirectlyMutateRegistry).toBe(false);
    expect(report.acquisitionResultMayDirectlyAuthorizeExecution).toBe(false);
  });

  test('fails closed when I104 no-unresolved-binding guard is weakened', () => {
    const invalid = { ...i104(), partialMethodologyDefinitionMaterializationAuthorized: true } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectExistingSubstrateSourceVocabularyBindingPromotionReadinessReviewReport;
    const report = buildI105ChallengeCombinationSupportChannelUntouchedSupportEffectBlockedVocabularyAuthorityAcquisitionReadinessReview(invalid);
    expect(report.status).toBe('I104_UNRESOLVED_OR_INVALID');
    expect(report.lanes).toEqual([]);
    expect(report.recommendedNextGate).toBe('UNTOUCHED_SUPPORT_EFFECT_EXISTING_SUBSTRATE_SOURCE_VOCABULARY_BINDING_PROMOTION_READINESS_REVIEW');
  });

  test('is deterministic and preserves all downstream effect scoring and classification guards', () => {
    const first = buildI105ChallengeCombinationSupportChannelUntouchedSupportEffectBlockedVocabularyAuthorityAcquisitionReadinessReview(i104());
    const second = buildI105ChallengeCombinationSupportChannelUntouchedSupportEffectBlockedVocabularyAuthorityAcquisitionReadinessReview(i104());
    expect(first.reviewId).toBe(second.reviewId);
    expect(first.decision).toBe('KE_XING_WEI_AUTHORITY_ACQUISITION_LANES_SEPARATED_CROSS_LANE_SUBSTITUTION_BLOCKED');
    expect(first.sourceActivationVerdictAuthorized).toBe(false);
    expect(first.sourcePersistenceVerdictAuthorized).toBe(false);
    expect(first.sourceEffectiveSupportVerdictAuthorized).toBe(false);
    expect(first.relativeForceVerdictAuthorized).toBe(false);
    expect(first.crossRelationPrecedenceAuthorized).toBe(false);
    expect(first.targetPostRelationRootState).toBe('not_determined');
    expect(first.effectiveMechanismForceVerdict).toBe('not_determined');
    expect(first.classificationAuthorized).toBe(false);
    expect(first.numericScoringAuthorized).toBe(false);
    expect(first.recommendedNextGate).toBe('UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_AUTHORITY_CANDIDATE_DISCOVERY_READINESS_REVIEW');
  });
});
