import {
  buildI42ChallengeTargetStemTransformationScopeMethodologyReview,
} from './i42-challenge-target-stem-transformation-scope-methodology-review.js';
import {
  buildI76ChallengeCombinationSupportChannelRelationKindSpecificCombinationBindingInteractionSettlementMethodologyReview,
} from './i76-challenge-combination-support-channel-relation-kind-specific-combination-binding-interaction-settlement-methodology-review.js';
import {
  R177_AUTHORITY,
  R177_JIA_JI_COMPETING_RELATION_BRIDGE_VERSION,
  R177_JIA_JI_DUAL_RELATION_SURFACE,
} from './general-natal-predicate-candidate-jia-ji-competing-relation-bridge.js';

export const R178_JIA_JI_SCOPE_TRANSFER_BLOCK_VERSION =
  '0.1.0-research' as const;

const i42 =
  buildI42ChallengeTargetStemTransformationScopeMethodologyReview();
const i76 =
  buildI76ChallengeCombinationSupportChannelRelationKindSpecificCombinationBindingInteractionSettlementMethodologyReview();

const stemFivePolicy = i76.kindPolicies.find(
  (policy) => policy.relationKind === 'stem_five_combination',
);

if (stemFivePolicy === undefined) {
  throw new Error('R178 missing I76 stem-five policy');
}

export const R178_EXACT_PAIR_SCOPE = Object.freeze({
  dayMaster: '임' as const,
  dayMasterHanja: '壬' as const,
  pair: R177_JIA_JI_DUAL_RELATION_SURFACE.koreanPair,
  pairHanja: R177_JIA_JI_DUAL_RELATION_SURFACE.pair,
  leftIsDayMaster:
    R177_JIA_JI_DUAL_RELATION_SURFACE.koreanPair[0] === '임',
  rightIsDayMaster:
    R177_JIA_JI_DUAL_RELATION_SURFACE.koreanPair[1] === '임',
  bothParticipantsAreNonDayMaster:
    R177_JIA_JI_DUAL_RELATION_SURFACE.koreanPair.every(
      (stem) => stem !== '임',
    ),
  structuralRelationKind:
    R177_JIA_JI_DUAL_RELATION_SURFACE.structuralRelationKind,
  structuralRelationId:
    R177_JIA_JI_DUAL_RELATION_SURFACE.structuralRelationId,
  dualRelationSurfaceObserved:
    R177_JIA_JI_DUAL_RELATION_SURFACE.dualRelationSurfaceObserved,
});

export const R178_I42_SCOPE_BINDING = Object.freeze({
  decision: i42.decision,
  challengeTargetMechanismsAreNonSelfRelations:
    i42.challengeTargetMechanismsAreNonSelfRelations,
  visibleChallengeTargetStemCannotBeDayMasterStem:
    i42.visibleChallengeTargetStemCannotBeDayMasterStem,
  traditionalHuaQiResultSubjectIsDayStem:
    i42.traditionalHuaQiResultSubjectIsDayStem,
  dayStemHuaQiResultContractDirectTransferAuthorized:
    i42.dayStemHuaQiResultContractDirectTransferAuthorized,
  dayStemTransformationConditionSetDirectResultReuseAuthorized:
    i42.dayStemTransformationConditionSetDirectResultReuseAuthorized,
  challengeTargetStemTransformationStateEmissionAuthorized:
    i42.challengeTargetStemTransformationStateEmissionAuthorized,
  challengeTargetStemTransformationTargetElementAdoptionAuthorized:
    i42.challengeTargetStemTransformationTargetElementAdoptionAuthorized,
  challengeTargetStemNoTransformationConclusionAuthorized:
    i42.challengeTargetStemNoTransformationConclusionAuthorized,
  genericChallengeTargetBindingVerdictTransferAuthorized:
    i42.genericChallengeTargetBindingVerdictTransferAuthorized,
  challengeTargetStemBindingEffectEmissionAuthorized:
    i42.challengeTargetStemBindingEffectEmissionAuthorized,
  combinationStructuralInteractionEvidenceStillRelevant:
    i42.combinationStructuralInteractionEvidenceStillRelevant,
  combinationInteractionSettlementPolicyStillRequired:
    i42.combinationInteractionSettlementPolicyStillRequired,
});

export const R178_I76_ROUTE = Object.freeze({
  relationKind: stemFivePolicy.relationKind,
  readiness: stemFivePolicy.readiness,
  structuralRelationAuthorityAvailable:
    stemFivePolicy.structuralRelationAuthorityAvailable,
  exactCurrentChartCandidateSubstrateAvailable:
    stemFivePolicy.exactCurrentChartCandidateSubstrateAvailable,
  transformationResultRouteAuthorized:
    stemFivePolicy.transformationResultRouteAuthorized,
  directBindingVerdictAuthorized:
    stemFivePolicy.directBindingVerdictAuthorized,
  directInteractionOutcomeAuthorized:
    stemFivePolicy.directInteractionOutcomeAuthorized,
  noEffectConclusionAuthorized:
    stemFivePolicy.noEffectConclusionAuthorized,
  postInteractionStateResolved:
    stemFivePolicy.postInteractionStateResolved,
  postCombinationSubjectIdentityPolicyResolved:
    stemFivePolicy.postCombinationSubjectIdentityPolicyResolved,
  requiredAuthorityRefs: stemFivePolicy.requiredAuthorityRefs,
});

export const R178_PAIR_LOCAL_OUTCOME_BOUNDARY = Object.freeze({
  structuralCombinationMembershipPreserved: true,
  traditionalHuaQiReferenceMetadataMayRemain:
    i42.traditionalStemTransformationReferenceMetadataMayRemain,
  jiaJiTransformationVerdict: 'not_determined' as const,
  jiaJiBindingVerdict: 'not_determined' as const,
  jiaJiInteractionOutcome: 'not_determined' as const,
  jiaJiNeutralizationVerdict: 'not_determined' as const,
  jiaJiNoEffectVerdict: 'not_determined' as const,
  postCombinationSubjectIdentity: 'not_determined' as const,
  controlSurfaceStillObserved:
    R177_AUTHORITY.jiaJiElementControlSurfaceObserved,
  combinationSurfaceStillObserved:
    R177_AUTHORITY.jiaJiStemCombinationCandidateObserved,
  dualRelationSettlementStillUnresolved:
    !R177_AUTHORITY.settlementEstablished,
  genericControlOverCombinationPrecedenceEstablished: false,
  genericCombinationOverControlPrecedenceEstablished: false,
});

export const R178_REQUIRED_FOLLOW_UP = Object.freeze([
  'SOURCE_BOUNDED_NON_DAY_MASTER_STEM_FIVE_INTERACTION_EFFECT',
  'PAIR_LOCAL_BINDING_OR_NON_BINDING_EVIDENCE_FOR_JIA_JI',
  'POST_COMBINATION_SUBJECT_IDENTITY_EVIDENCE',
  'JIA_JI_CONTROL_AND_COMBINATION_COEXISTENCE_EVIDENCE',
  'PAIR_LOCAL_OUTCOME_BEFORE_CROSS_RELATION_PRECEDENCE',
] as const);

export const R178_REJECTED_SHORTCUTS = Object.freeze([
  'JIA_JI_STRUCTURAL_COMBINATION_EQUALS_HUA_TU',
  'TRADITIONAL_DAY_STEM_HUA_QI_EQUALS_NON_DAY_MASTER_PAIR_RESULT',
  'BLOCKED_TRANSFORMATION_SCOPE_EQUALS_NO_EFFECT',
  'BLOCKED_TRANSFORMATION_SCOPE_EQUALS_UNBOUND',
  'STRUCTURAL_MEMBERSHIP_EQUALS_BINDING',
  'STRUCTURAL_MEMBERSHIP_EQUALS_TRANSFORMATION',
  'HE_ER_BU_HUA_LANGUAGE_EQUALS_GENERIC_JIA_JI_BINDING',
  'SCOPE_TRANSFER_BLOCK_EQUALS_CONTROL_WINS',
  'SCOPE_TRANSFER_BLOCK_EQUALS_COMBINATION_WINS',
  'PAIR_LOCAL_SCOPE_ROUTE_EQUALS_CROSS_RELATION_SETTLEMENT',
] as const);

export const R178_GOVERNANCE = Object.freeze({
  upstreamDualRelationSurfacePreserved:
    R177_AUTHORITY.dualRelationSurfaceObserved,
  upstreamSettlementStillClosed:
    !R177_AUTHORITY.settlementEstablished,
  exactPairIsNonDayMasterPair:
    R178_EXACT_PAIR_SCOPE.bothParticipantsAreNonDayMaster,
  i42DirectResultTransferStillClosed:
    !R178_I42_SCOPE_BINDING.dayStemHuaQiResultContractDirectTransferAuthorized,
  i76StemFiveRouteIsScopeTransferBlocked:
    R178_I76_ROUTE.readiness ===
    'STRUCTURAL_INTERACTION_ONLY_SCOPE_TRANSFER_BLOCKED',
  structuralEvidencePreservedWithoutOutcomePromotion: true,
  pairLocalOutcomeRequiredBeforeCrossRelationPrecedence: true,
});

export const R178_SUMMARY = Object.freeze({
  participantCount: R178_EXACT_PAIR_SCOPE.pair.length,
  nonDayMasterParticipantCount:
    R178_EXACT_PAIR_SCOPE.pair.filter((stem) => stem !== '임').length,
  structuralRelationKindCount: 1,
  authorizedTransformationOutcomeCount: 0,
  authorizedBindingOutcomeCount: 0,
  authorizedNoEffectOutcomeCount: 0,
  requiredFollowUpCount: R178_REQUIRED_FOLLOW_UP.length,
});

export const R178_UPSTREAM_BINDINGS = Object.freeze({
  r177: {
    version: R177_JIA_JI_COMPETING_RELATION_BRIDGE_VERSION,
    structuralRelationId:
      R177_JIA_JI_DUAL_RELATION_SURFACE.structuralRelationId,
    structuralRelationKind:
      R177_JIA_JI_DUAL_RELATION_SURFACE.structuralRelationKind,
    settlementEstablished: R177_AUTHORITY.settlementEstablished,
  },
  i42: {
    reviewId: i42.reviewId,
    decision: i42.decision,
  },
  i76: {
    reviewId: i76.reviewId,
    relationKind: stemFivePolicy.relationKind,
    readiness: stemFivePolicy.readiness,
  },
});

export const R178_AUTHORITY = Object.freeze({
  status: 'RESEARCH_JIA_JI_NON_DAY_MASTER_STEM_FIVE_SCOPE_ROUTE_COMPLETE' as const,
  researchOnly: true,
  exactJiaJiPairBound: true,
  bothPairParticipantsNonDayMasterEstablished: true,
  structuralStemFiveCombinationPreserved: true,
  stemFiveScopeTransferBlocked: true,
  traditionalHuaQiDirectTransferAuthorized: false,
  jiaJiTransformationEstablished: false,
  jiaJiBindingEstablished: false,
  jiaJiNoEffectEstablished: false,
  postCombinationSubjectIdentityResolved: false,
  pairLocalInteractionOutcomeEstablished: false,
  genericControlOverCombinationPrecedenceEstablished: false,
  genericCombinationOverControlPrecedenceEstablished: false,
  crossRelationPrecedenceAuthorized: false,
  competingRelationSettlementResolved: false,
  exactConfigurationTuplePredicateEstablished: false,
  exactMinimalPredicateSetEstablished: false,
  matchingSufficiencyEstablished: false,
  outcomeSufficiencyEstablished: false,
  settlementEstablished: false,
  mechanismRankingAuthorized: false,
  numericWeightAuthorized: false,
  executableResolverAuthorized: false,
  automaticEngineAdmissionAuthorized: false,
  interpretationClaimEmissionAuthorized: false,
  previewPromotionAuthorized: false,
  productionAuthorityPromoted: false,
});
