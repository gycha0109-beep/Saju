import { deterministicContentHash } from '../interpretation/rule-registry.js';

export const I44_CHALLENGE_ROOT_THREE_COMBINATION_EFFECTIVE_BUREAU_QUALIFICATION_METHODOLOGY_REVIEW_VERSION =
  'myeonghwa-challenge-root-three-combination-effective-bureau-qualification-methodology-review-v1';

export interface ChallengeRootThreeCombinationEffectiveBureauQualificationMethodologyReviewReport {
  reviewId: string;
  reviewVersion: string;
  decision: 'FULL_MEMBERSHIP_BUREAU_FORMATION_AUTHORIZED_POST_INTERACTION_STATE_BLOCKED';
  fullThreeMembershipRequiredForTraditionalBureau: true;
  missingOneBranchBlocksFullThreeBureauFormation: true;
  fullThreeMembershipAuthorizesStructuralBureauFormation: true;
  structuralBureauFormationStateEmissionAuthorized: true;
  traditionalBureauElementReferenceMayBeUsedForFormationIdentity: true;
  structuralBureauFormationEqualsPostInteractionEffectiveBureau: false;
  fullThreeAdjacencyRequiredForFormation: false;
  fullThreeVisibleLeadOutRequiredForFormation: false;
  twoBranchAdjacencyRuleTransferToFullThreeAuthorized: false;
  twoBranchLeadOutRuleTransferToFullThreeAuthorized: false;
  clashCanBreakOrDamageBureau: true;
  clashProximityCanChangeBureauDamageInterpretation: true;
  deterministicClashBreakDamageSettlementPolicyResolved: false;
  postInteractionBureauStateEmissionAuthorized: false;
  postInteractionEffectiveBureauVerdictAuthorized: false;
  seasonalCommandRequiredForStructuralBureauFormation: false;
  supportInterferenceRequiredForStructuralBureauFormation: false;
  seasonalCommandEffectOnChallengeForceResolved: false;
  supportInterferenceEffectOnChallengeForceResolved: false;
  competingRelationInteractionSettlementResolved: false;
  postCombinationSubjectIdentityPolicyResolved: false;
  targetPostRelationRootState: 'not_determined';
  effectiveMechanismForceVerdict: 'not_determined';
  relationSpecificUsefulnessHarmfulness: 'not_determined';
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  sourceBasis: readonly {
    sourceId: string;
    supportType: 'direct_formation' | 'interaction_limit' | 'scope_limit';
    finding: string;
  }[];
  requiredNextImplementationGuards: readonly string[];
  notes: readonly string[];
}

export const I44_CHALLENGE_ROOT_THREE_COMBINATION_SOURCE_BASIS = Object.freeze([
  {
    sourceId: 'SRC-T0-SANMING-TONGHUI-V2-ZHIYUAN-SANHE',
    supportType: 'direct_formation' as const,
    finding:
      'The 支元三合 section identifies 申子辰 as water bureau and the other three full groups likewise, and explicitly states that if one of the three characters is missing the bureau cannot be formed and must not be treated as 三合化局.',
  },
  {
    sourceId: 'SRC-METHOD-DITIANSUI-CHANWEI-FANGJU',
    supportType: 'direct_formation' as const,
    finding:
      'The commentary states that 亥卯未, 寅午戌, 巳酉丑, and 申子辰 are three-position combination bureaus and that when all three branches meet in the pillars the combined tendency has substantial force.',
  },
  {
    sourceId: 'SRC-METHOD-DITIANSUI-CHANWEI-FANGJU',
    supportType: 'interaction_limit' as const,
    finding:
      'The same commentary warns that combinations dislike clash: a tightly placed opposing clash may break the bureau, while differently placed clash can produce a damaged/contested bureau requiring contextual judgment.',
  },
  {
    sourceId: 'SRC-METHOD-DITIANSUI-CHANWEI-FANGJU',
    supportType: 'scope_limit' as const,
    finding:
      'Adjacency and visible-stem lead-out requirements are stated explicitly in the discussion of two-branch partial combinations; the text does not establish them as mandatory formation prerequisites for an already complete three-branch bureau.',
  },
] as const);

const NEXT_IMPLEMENTATION_GUARDS = Object.freeze([
  'Allow full three-branch membership to emit a source-bounded structural bureau-formation state tied to the I36/I37 traditional bureau element reference.',
  'Do not label structural bureau formation as a post-interaction effective bureau, post-relation root state, or effective mechanism force.',
  'Remove adjacency/spacing and visible lead-out as mandatory formation blockers for full-three membership; preserve observed values only as contextual evidence unless a later source-bounded effect rule needs them.',
  'Do not reuse the two-branch adjacency/lead-out rule as a full-three prerequisite.',
  'Route any clash touching the bureau into a dedicated break/damage/settlement review; do not infer intactness, breakage, or damage magnitude from clash presence alone.',
  'Keep seasonal-command and support/interference evidence relevant to challenge-force effect without making them prerequisites for structural bureau formation.',
  'Keep competing-relation settlement, post-combination subject identity, post-relation root state, effective force, usefulness/harmfulness, scoring, and classification unresolved or unauthorized.',
] as const);

export function buildI44ChallengeRootThreeCombinationEffectiveBureauQualificationMethodologyReview(): ChallengeRootThreeCombinationEffectiveBureauQualificationMethodologyReviewReport {
  const material = {
    reviewVersion:
      I44_CHALLENGE_ROOT_THREE_COMBINATION_EFFECTIVE_BUREAU_QUALIFICATION_METHODOLOGY_REVIEW_VERSION,
    decision: 'FULL_MEMBERSHIP_BUREAU_FORMATION_AUTHORIZED_POST_INTERACTION_STATE_BLOCKED' as const,
    fullThreeMembershipRequiredForTraditionalBureau: true as const,
    missingOneBranchBlocksFullThreeBureauFormation: true as const,
    fullThreeMembershipAuthorizesStructuralBureauFormation: true as const,
    structuralBureauFormationStateEmissionAuthorized: true as const,
    traditionalBureauElementReferenceMayBeUsedForFormationIdentity: true as const,
    structuralBureauFormationEqualsPostInteractionEffectiveBureau: false as const,
    fullThreeAdjacencyRequiredForFormation: false as const,
    fullThreeVisibleLeadOutRequiredForFormation: false as const,
    twoBranchAdjacencyRuleTransferToFullThreeAuthorized: false as const,
    twoBranchLeadOutRuleTransferToFullThreeAuthorized: false as const,
    clashCanBreakOrDamageBureau: true as const,
    clashProximityCanChangeBureauDamageInterpretation: true as const,
    deterministicClashBreakDamageSettlementPolicyResolved: false as const,
    postInteractionBureauStateEmissionAuthorized: false as const,
    postInteractionEffectiveBureauVerdictAuthorized: false as const,
    seasonalCommandRequiredForStructuralBureauFormation: false as const,
    supportInterferenceRequiredForStructuralBureauFormation: false as const,
    seasonalCommandEffectOnChallengeForceResolved: false as const,
    supportInterferenceEffectOnChallengeForceResolved: false as const,
    competingRelationInteractionSettlementResolved: false as const,
    postCombinationSubjectIdentityPolicyResolved: false as const,
    targetPostRelationRootState: 'not_determined' as const,
    effectiveMechanismForceVerdict: 'not_determined' as const,
    relationSpecificUsefulnessHarmfulness: 'not_determined' as const,
    classificationAuthorized: false as const,
    numericScoringAuthorized: false as const,
    sourceBasis: I44_CHALLENGE_ROOT_THREE_COMBINATION_SOURCE_BASIS,
    requiredNextImplementationGuards: NEXT_IMPLEMENTATION_GUARDS,
    notes: [
      'I44 resolves full three-branch membership as sufficient for source-bounded structural bureau formation, not for a final post-interaction effective-bureau verdict.',
      'The current research model had been too conservative in leaving even full-three bureau formation unresolved and too broad in carrying two-branch adjacency/lead-out requirements into the full-three path.',
      'Clash remains capable of breaking or damaging a formed bureau, but the deterministic break/damage/settlement policy is not resolved by this review.',
      'Seasonal and support/interference context can still matter to challenge force without being prerequisites for structural three-combination bureau formation.',
      'No post-combination subject replacement, post-relation root state, effective mechanism force, usefulness/harmfulness, score, or strong/weak category is emitted.',
    ],
  };

  return {
    reviewId: `challenge_root_three_combination_bureau_qualification_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
