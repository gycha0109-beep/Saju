import { deterministicContentHash } from '../interpretation/rule-registry.js';

export const I42_CHALLENGE_TARGET_STEM_TRANSFORMATION_SCOPE_METHODOLOGY_REVIEW_VERSION =
  'myeonghwa-challenge-target-stem-transformation-scope-methodology-review-v1';

export interface ChallengeTargetStemTransformationScopeMethodologyReviewReport {
  reviewId: string;
  reviewVersion: string;
  decision: 'NON_DAY_MASTER_CHALLENGE_STEM_TRANSFORMATION_SCOPE_TRANSFER_BLOCKED';
  challengeTargetMechanismsAreNonSelfRelations: true;
  visibleChallengeTargetStemCannotBeDayMasterStem: true;
  traditionalHuaQiResultSubjectIsDayStem: true;
  dayStemHuaQiResultContractDirectTransferAuthorized: false;
  dayStemTransformationConditionSetDirectResultReuseAuthorized: false;
  traditionalStemTransformationReferenceMetadataMayRemain: true;
  challengeTargetStemTransformationStateEmissionAuthorized: false;
  challengeTargetStemTransformationTargetElementAdoptionAuthorized: false;
  challengeTargetStemNoTransformationConclusionAuthorized: false;
  sourceBindingLanguageObserved: true;
  genericChallengeTargetBindingVerdictTransferAuthorized: false;
  challengeTargetStemBindingEffectEmissionAuthorized: false;
  combinationStructuralInteractionEvidenceStillRelevant: true;
  combinationInteractionSettlementPolicyStillRequired: true;
  postCombinationSubjectIdentityPolicyResolved: false;
  targetPostRelationRootState: 'not_determined';
  effectiveMechanismForceVerdict: 'not_determined';
  relationSpecificUsefulnessHarmfulness: 'not_determined';
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  sourceBasis: readonly {
    sourceId: string;
    supportType: 'direct_scope' | 'cross_reference' | 'domain_invariant';
    finding: string;
  }[];
  requiredNextImplementationGuards: readonly string[];
  notes: readonly string[];
}

export const I42_CHALLENGE_TARGET_STEM_TRANSFORMATION_SCOPE_SOURCE_BASIS = Object.freeze([
  {
    sourceId: 'SRC-T0-SANMING-TONGHUI-V2',
    supportType: 'direct_scope' as const,
    finding:
      'The 化氣 section explicitly states “大凡化氣，只取日干而言配合之神”, making the traditional transformation result subject the day stem and its combining counterpart.',
  },
  {
    sourceId: 'SRC-T0-SANMING-TONGHUI-V2',
    supportType: 'cross_reference' as const,
    finding:
      'Month/time vitality and interfering-stem conditions are presented inside that day-stem-scoped 化氣 doctrine; they do not independently authorize transformation of an arbitrary non-day-master stem.',
  },
  {
    sourceId: 'SRC-METHOD-DITIANSUI-CHANWEI-WIKISOURCE',
    supportType: 'cross_reference' as const,
    finding:
      'The commentary discusses 合而不化 as 羈絆 through day-master, useful-god, favorable/unfavorable and whole-chart contexts, so the binding consequence is contextual rather than a generic result of any non-transforming stem combination.',
  },
  {
    sourceId: 'MYEONGHWA-CHALLENGE-RELATION-TAXONOMY',
    supportType: 'domain_invariant' as const,
    finding:
      'Challenge mechanisms are output, wealth, and officer/control relations to the day master. A visible stem carrying a challenge target element is therefore not the day-master stem itself.',
  },
] as const);

const NEXT_IMPLEMENTATION_GUARDS = Object.freeze([
  'Close direct day-stem 化氣 result-contract transfer for visible challenge-target stems; do not leave it as an open transformation route.',
  'Keep I36/I37 traditional stem-pair transformation elements as historical/reference metadata only.',
  'Do not reinterpret blocked scope transfer as proof that the structural stem combination has no effect.',
  'Do not emit a challenge-target transformed element or replace the challenge-target subject identity from the traditional day-stem mapping.',
  'Do not convert 合而不化 or 羈絆 language into a generic challenge-target binding verdict without a separate source-bounded interaction/effect policy.',
  'Retain seasonal, support/interference, and competing-relation observations as structural/context evidence where already materialized.',
  'Keep post-combination subject identity, post-relation root state, effective force, usefulness/harmfulness, scoring, and classification unresolved or unauthorized.',
] as const);

export function buildI42ChallengeTargetStemTransformationScopeMethodologyReview(): ChallengeTargetStemTransformationScopeMethodologyReviewReport {
  const material = {
    reviewVersion: I42_CHALLENGE_TARGET_STEM_TRANSFORMATION_SCOPE_METHODOLOGY_REVIEW_VERSION,
    decision: 'NON_DAY_MASTER_CHALLENGE_STEM_TRANSFORMATION_SCOPE_TRANSFER_BLOCKED' as const,
    challengeTargetMechanismsAreNonSelfRelations: true as const,
    visibleChallengeTargetStemCannotBeDayMasterStem: true as const,
    traditionalHuaQiResultSubjectIsDayStem: true as const,
    dayStemHuaQiResultContractDirectTransferAuthorized: false as const,
    dayStemTransformationConditionSetDirectResultReuseAuthorized: false as const,
    traditionalStemTransformationReferenceMetadataMayRemain: true as const,
    challengeTargetStemTransformationStateEmissionAuthorized: false as const,
    challengeTargetStemTransformationTargetElementAdoptionAuthorized: false as const,
    challengeTargetStemNoTransformationConclusionAuthorized: false as const,
    sourceBindingLanguageObserved: true as const,
    genericChallengeTargetBindingVerdictTransferAuthorized: false as const,
    challengeTargetStemBindingEffectEmissionAuthorized: false as const,
    combinationStructuralInteractionEvidenceStillRelevant: true as const,
    combinationInteractionSettlementPolicyStillRequired: true as const,
    postCombinationSubjectIdentityPolicyResolved: false as const,
    targetPostRelationRootState: 'not_determined' as const,
    effectiveMechanismForceVerdict: 'not_determined' as const,
    relationSpecificUsefulnessHarmfulness: 'not_determined' as const,
    classificationAuthorized: false as const,
    numericScoringAuthorized: false as const,
    sourceBasis: I42_CHALLENGE_TARGET_STEM_TRANSFORMATION_SCOPE_SOURCE_BASIS,
    requiredNextImplementationGuards: NEXT_IMPLEMENTATION_GUARDS,
    notes: [
      'I42 resolves the scope-transfer question negatively: the traditional 化氣 result contract is explicitly day-stem scoped and is not a result contract for a non-day-master challenge-target stem.',
      'This negative scope closure does not assert that a visible challenge-target stem combination has no structural or contextual effect.',
      'Traditional transformation elements remain reference metadata because source history and structural pair identity remain auditable even when result reuse is blocked.',
      'The separate 合而不化/羈絆 discussion does not authorize a generic challenge-target binding result; interaction/binding effect remains a dedicated unresolved policy problem.',
      'No post-combination subject identity, post-relation root state, effective mechanism force, usefulness/harmfulness, score, or strong/weak category is emitted.',
    ],
  };

  return {
    reviewId: `challenge_target_stem_transformation_scope_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
