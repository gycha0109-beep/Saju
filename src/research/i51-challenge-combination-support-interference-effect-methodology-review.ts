import { deterministicContentHash } from '../interpretation/rule-registry.js';

export const I51_CHALLENGE_COMBINATION_SUPPORT_INTERFERENCE_EFFECT_METHODOLOGY_REVIEW_VERSION =
  'myeonghwa-challenge-combination-support-interference-effect-methodology-review-v1';

export type ChallengeCombinationSupportChannelKind =
  | 'SAME_ELEMENT_PEER_SUPPORT_CHANNEL'
  | 'RESOURCE_GENERATION_SUPPORT_CHANNEL';

export interface ChallengeCombinationSupportInterferenceEffectMethodologyReviewReport {
  reviewId: string;
  reviewVersion: string;
  decision: 'SUPPORT_CHANNEL_DIRECTION_AUTHORIZED_NET_EFFECT_BLOCKED';
  sameElementSupportDirectionAuthorized: true;
  resourceGenerationSupportDirectionAuthorized: true;
  supportChannelPresenceStateAuthorized: true;
  noTrackedSupportChannelStateAuthorized: true;
  noTrackedSupportChannelMeansNegativeForce: false;
  participantLocalSupportChannelIdentityAuthorized: true;
  subjectLocalSupportChannelIdentityAuthorized: true;
  visibleStemSupportChannelAuthorized: true;
  branchSupportChannelAuthorized: true;
  supportChannelMultiplicityMagnitudeInferenceAuthorized: false;
  supportChannelCountAggregationAuthorized: false;
  visibleStemVersusBranchFixedPrecedenceResolved: false;
  sameElementVersusResourceFixedPrecedenceResolved: false;
  supportChannelActivationVerdictAuthorized: false;
  supportChannelPersistenceThroughClashAuthorized: false;
  supportChannelPersistenceThroughCombinationAuthorized: false;
  competingRelationNeutralizationVerdictAuthorized: false;
  netSupportInterferenceEffectAuthorized: false;
  supportDirectionToTransformationVerdictAuthorized: false;
  supportDirectionToBindingVerdictAuthorized: false;
  supportDirectionToPostInteractionBureauStateAuthorized: false;
  supportDirectionToTargetPostRelationRootStateAuthorized: false;
  supportDirectionToEffectiveMechanismForceAuthorized: false;
  numericSupportWeightingAuthorized: false;
  additiveSupportScoringAuthorized: false;
  postCombinationSubjectIdentityPolicyResolved: false;
  targetPostRelationRootState: 'not_determined';
  effectiveMechanismForceVerdict: 'not_determined';
  relationSpecificUsefulnessHarmfulness: 'not_determined';
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  sourceBasis: readonly {
    sourceId: string;
    supportType: 'direct_basis' | 'scope_limit' | 'cross_reference';
    finding: string;
  }[];
  authorizedChannelKinds: readonly ChallengeCombinationSupportChannelKind[];
  requiredNextImplementationGuards: readonly string[];
  notes: readonly string[];
}

export const I51_CHALLENGE_COMBINATION_SUPPORT_INTERFERENCE_SOURCE_BASIS = Object.freeze([
  {
    sourceId: 'SRC-METHOD-DITIANSUI-CHANWEI-GANZHI-ROOT-SUPPORT',
    supportType: 'direct_basis' as const,
    finding:
      '滴天髓闡微 states that when a stem roots in a branch, branch 生扶 makes the root firm while branch 衝剋 can pull the root out; support and interference therefore have directional structural meaning but are interaction-sensitive.',
  },
  {
    sourceId: 'SRC-METHOD-DITIANSUI-CHANWEI-DIWANG-XIJING',
    supportType: 'direct_basis' as const,
    finding:
      '滴天髓闡微 explains 地旺喜靜 through the absence of clashing/controlling disturbance together with the presence of 生助, showing that support cannot be interpreted independently of competing disturbance.',
  },
  {
    sourceId: 'SRC-METHOD-DITIANSUI-HEJU',
    supportType: 'scope_limit' as const,
    finding:
      '滴天髓/滴天髓闡微 合局 distinguishes combinations that assist, remove, bind, or strengthen an unfavorable structure; the same structural relation can therefore support or interfere depending on role and whether the relation actually resolves.',
  },
  {
    sourceId: 'SRC-METHOD-DITIANSUI-HUAXIANG-SUPPORT',
    supportType: 'cross_reference' as const,
    finding:
      'The 化象 discussion uses 生助 when a transformed qi is insufficient, but that result-specific contract is not directly transferred to arbitrary challenge-target combination outcomes; only the general directional concept of generative support is retained here.',
  },
] as const);

const AUTHORIZED_CHANNEL_KINDS = Object.freeze([
  'SAME_ELEMENT_PEER_SUPPORT_CHANNEL',
  'RESOURCE_GENERATION_SUPPORT_CHANNEL',
] as const satisfies readonly ChallengeCombinationSupportChannelKind[]);

const NEXT_IMPLEMENTATION_GUARDS = Object.freeze([
  'A next adapter may classify an exact same-element structural support position as SAME_ELEMENT_PEER_SUPPORT_CHANNEL and an exact resource-generating position as RESOURCE_GENERATION_SUPPORT_CHANNEL.',
  'Support channels must remain bound to their subject or participant identity and source position; do not collapse all positions into one count.',
  'The absence of a tracked same-element/resource channel may be recorded only as NO_TRACKED_SUPPORT_CHANNEL; it must not be converted to weakness, damage, or negative force.',
  'Do not infer that multiple support channels are stronger than one channel, or that visible-stem support outranks branch support, without a separate authorized methodology.',
  'Do not infer that same-element support outranks resource support or vice versa.',
  'Do not mark a support channel as activated, preserved, neutralized, or dominant merely from presence because clash, combination, spacing, and competing-relation settlement remain separate dependencies.',
  'Do not convert support-channel direction into transformation, binding, post-interaction bureau state, post-relation root state, effective mechanism force, usefulness/harmfulness, numeric score, or strong/weak classification.',
] as const);

export function buildI51ChallengeCombinationSupportInterferenceEffectMethodologyReview(): ChallengeCombinationSupportInterferenceEffectMethodologyReviewReport {
  const material = {
    reviewVersion: I51_CHALLENGE_COMBINATION_SUPPORT_INTERFERENCE_EFFECT_METHODOLOGY_REVIEW_VERSION,
    decision: 'SUPPORT_CHANNEL_DIRECTION_AUTHORIZED_NET_EFFECT_BLOCKED' as const,
    sameElementSupportDirectionAuthorized: true as const,
    resourceGenerationSupportDirectionAuthorized: true as const,
    supportChannelPresenceStateAuthorized: true as const,
    noTrackedSupportChannelStateAuthorized: true as const,
    noTrackedSupportChannelMeansNegativeForce: false as const,
    participantLocalSupportChannelIdentityAuthorized: true as const,
    subjectLocalSupportChannelIdentityAuthorized: true as const,
    visibleStemSupportChannelAuthorized: true as const,
    branchSupportChannelAuthorized: true as const,
    supportChannelMultiplicityMagnitudeInferenceAuthorized: false as const,
    supportChannelCountAggregationAuthorized: false as const,
    visibleStemVersusBranchFixedPrecedenceResolved: false as const,
    sameElementVersusResourceFixedPrecedenceResolved: false as const,
    supportChannelActivationVerdictAuthorized: false as const,
    supportChannelPersistenceThroughClashAuthorized: false as const,
    supportChannelPersistenceThroughCombinationAuthorized: false as const,
    competingRelationNeutralizationVerdictAuthorized: false as const,
    netSupportInterferenceEffectAuthorized: false as const,
    supportDirectionToTransformationVerdictAuthorized: false as const,
    supportDirectionToBindingVerdictAuthorized: false as const,
    supportDirectionToPostInteractionBureauStateAuthorized: false as const,
    supportDirectionToTargetPostRelationRootStateAuthorized: false as const,
    supportDirectionToEffectiveMechanismForceAuthorized: false as const,
    numericSupportWeightingAuthorized: false as const,
    additiveSupportScoringAuthorized: false as const,
    postCombinationSubjectIdentityPolicyResolved: false as const,
    targetPostRelationRootState: 'not_determined' as const,
    effectiveMechanismForceVerdict: 'not_determined' as const,
    relationSpecificUsefulnessHarmfulness: 'not_determined' as const,
    classificationAuthorized: false as const,
    numericScoringAuthorized: false as const,
    sourceBasis: I51_CHALLENGE_COMBINATION_SUPPORT_INTERFERENCE_SOURCE_BASIS,
    authorizedChannelKinds: AUTHORIZED_CHANNEL_KINDS,
    requiredNextImplementationGuards: NEXT_IMPLEMENTATION_GUARDS,
    notes: [
      'I51 resolves only support-channel direction and presence topology. It does not resolve the net support/interference effect of the combination context.',
      'Same-element positions are peer-support channels and resource-element positions are generative-support channels at the structural evidence layer.',
      'Support direction remains identity-local; channel multiplicity is not magnitude and channel presence is not an activation or persistence verdict.',
      'Clash, combination, spacing, and competing-relation topology may alter whether a channel remains effective, so net effect is deliberately withheld.',
      'The source discussion of true 化象 support is not reused as a challenge-target transformation result rule.',
      'No numeric weight, additive score, effective mechanism force, usefulness/harmfulness, post-relation root state, or strength classification is authorized.',
    ],
  };

  return {
    reviewId: `challenge_combination_support_interference_effect_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
