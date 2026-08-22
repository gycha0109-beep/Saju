import { deterministicContentHash } from '../interpretation/rule-registry.js';

export const I53_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_ACTIVATION_PERSISTENCE_METHODOLOGY_REVIEW_VERSION =
  'myeonghwa-challenge-combination-support-channel-activation-persistence-methodology-review-v1';

export type ChallengeCombinationSupportChannelContestTopologyState =
  | 'NO_TRACKED_RELATION_TOUCH'
  | 'CURRENT_COMBINATION_PARTICIPATION'
  | 'COMPETING_CLASH_TOUCH'
  | 'COMPETING_COMBINATION_TOUCH'
  | 'MULTIPLE_TRACKED_RELATION_TOUCHES';

export interface ChallengeCombinationSupportChannelActivationPersistenceMethodologyReviewReport {
  reviewId: string;
  reviewVersion: string;
  decision: 'DIRECT_CONTEST_ROUTING_AUTHORIZED_ACTIVATION_PERSISTENCE_VERDICT_BLOCKED';
  supportChannelContestTopologyRoutingAuthorized: true;
  noTrackedRelationTouchStateAuthorized: true;
  currentCombinationParticipationTouchAuthorized: true;
  competingClashTouchAuthorized: true;
  competingCombinationTouchAuthorized: true;
  multipleTrackedRelationTouchesAuthorized: true;
  noTrackedRelationTouchMeansActivated: false;
  noTrackedRelationTouchMeansPersistent: false;
  currentCombinationParticipationMeansNeutralized: false;
  competingClashTouchMeansBroken: false;
  competingCombinationTouchMeansBound: false;
  directContestTopologyToActivationVerdictAuthorized: false;
  directContestTopologyToPersistenceVerdictAuthorized: false;
  directContestTopologyToNeutralizationVerdictAuthorized: false;
  clashRelativeForceSettlementRequiredForClashPersistence: true;
  clashRescueSettlementRequiredWhereApplicable: true;
  combinationBindingSettlementRequiredForCombinationPersistence: true;
  competingRelationSettlementRequiredForMultiTouchPersistence: true;
  supportChannelCountMagnitudeInferenceAuthorized: false;
  supportChannelAggregationAuthorized: false;
  numericSupportWeightingAuthorized: false;
  activationPersistenceToNetSupportEffectAuthorized: false;
  activationPersistenceToPostInteractionBureauStateAuthorized: false;
  activationPersistenceToTargetPostRelationRootStateAuthorized: false;
  activationPersistenceToEffectiveMechanismForceAuthorized: false;
  targetPostRelationRootState: 'not_determined';
  effectiveMechanismForceVerdict: 'not_determined';
  relationSpecificUsefulnessHarmfulness: 'not_determined';
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  authorizedContestTopologyStates: readonly ChallengeCombinationSupportChannelContestTopologyState[];
  sourceBasis: readonly {
    sourceId: string;
    supportType: 'direct_basis' | 'scope_limit' | 'cross_reference';
    finding: string;
  }[];
  requiredNextImplementationGuards: readonly string[];
  notes: readonly string[];
}

export const I53_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_ACTIVATION_PERSISTENCE_SOURCE_BASIS = Object.freeze([
  {
    sourceId: 'SRC-METHOD-DITIANSUI-CHANWEI-GANZHI-ROOT-SUPPORT',
    supportType: 'direct_basis' as const,
    finding:
      '滴天髓闡微 states that a rooted stem becomes firm when its supporting branch receives 生扶 and can lose that root when the branch receives 衝剋, so direct interaction with a support source is materially relevant to persistence.',
  },
  {
    sourceId: 'SRC-METHOD-DITIANSUI-CHANWEI-CHONG-RELATIVE-FORCE',
    supportType: 'scope_limit' as const,
    finding:
      'The clash discussion requires first examining relative flourishing/decline, rescue, restraint, assistance, leakage, and the overall configuration; clash presence alone does not determine removal or preservation.',
  },
  {
    sourceId: 'SRC-METHOD-DITIANSUI-CHANWEI-HEJU',
    supportType: 'scope_limit' as const,
    finding:
      'The 合局 discussion distinguishes combinations that assist, remove, quiet, bind, conceal, or strengthen an unfavorable structure depending on role and whether the relation actually resolves, so combination participation alone cannot determine support-channel activation or persistence.',
  },
  {
    sourceId: 'SRC-METHOD-DITIANSUI-CHANWEI-DIWANG-XIJING',
    supportType: 'cross_reference' as const,
    finding:
      'The 地旺喜靜 discussion associates a stable condition with absence of clash/control and presence of support, but it is a scoped pattern explanation rather than a universal rule that every unchallenged support channel is automatically active.',
  },
] as const);

const AUTHORIZED_CONTEST_TOPOLOGY_STATES = Object.freeze([
  'NO_TRACKED_RELATION_TOUCH',
  'CURRENT_COMBINATION_PARTICIPATION',
  'COMPETING_CLASH_TOUCH',
  'COMPETING_COMBINATION_TOUCH',
  'MULTIPLE_TRACKED_RELATION_TOUCHES',
] as const satisfies readonly ChallengeCombinationSupportChannelContestTopologyState[]);

const NEXT_IMPLEMENTATION_GUARDS = Object.freeze([
  'A next adapter may classify whether each I52 support-channel source position is untouched by tracked relation topology, participates in the current combination, is touched by a competing clash, is touched by a competing combination, or has multiple tracked touches.',
  'Topology classification must remain source-position-local and must not aggregate channel counts into magnitude.',
  'NO_TRACKED_RELATION_TOUCH is only an absence-of-tracked-contest state; it must not be converted to ACTIVE or PERSISTED.',
  'CURRENT_COMBINATION_PARTICIPATION must not be converted to BOUND, NEUTRALIZED, PRESERVED, or DESTROYED without relation-specific binding/interaction settlement.',
  'COMPETING_CLASH_TOUCH must not be converted to BROKEN or INACTIVE without relative-force and rescue settlement where applicable.',
  'COMPETING_COMBINATION_TOUCH must not be converted to BOUND or NEUTRALIZED without the corresponding combination interaction settlement.',
  'MULTIPLE_TRACKED_RELATION_TOUCHES require competing-relation settlement; do not invent fixed clash-over-combination or combination-over-clash precedence.',
  'Do not emit net support effect, post-interaction bureau state, post-relation root state, effective mechanism force, usefulness/harmfulness, numeric scoring, or strong/weak classification.',
] as const);

export function buildI53ChallengeCombinationSupportChannelActivationPersistenceMethodologyReview(): ChallengeCombinationSupportChannelActivationPersistenceMethodologyReviewReport {
  const material = {
    reviewVersion: I53_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_ACTIVATION_PERSISTENCE_METHODOLOGY_REVIEW_VERSION,
    decision: 'DIRECT_CONTEST_ROUTING_AUTHORIZED_ACTIVATION_PERSISTENCE_VERDICT_BLOCKED' as const,
    supportChannelContestTopologyRoutingAuthorized: true as const,
    noTrackedRelationTouchStateAuthorized: true as const,
    currentCombinationParticipationTouchAuthorized: true as const,
    competingClashTouchAuthorized: true as const,
    competingCombinationTouchAuthorized: true as const,
    multipleTrackedRelationTouchesAuthorized: true as const,
    noTrackedRelationTouchMeansActivated: false as const,
    noTrackedRelationTouchMeansPersistent: false as const,
    currentCombinationParticipationMeansNeutralized: false as const,
    competingClashTouchMeansBroken: false as const,
    competingCombinationTouchMeansBound: false as const,
    directContestTopologyToActivationVerdictAuthorized: false as const,
    directContestTopologyToPersistenceVerdictAuthorized: false as const,
    directContestTopologyToNeutralizationVerdictAuthorized: false as const,
    clashRelativeForceSettlementRequiredForClashPersistence: true as const,
    clashRescueSettlementRequiredWhereApplicable: true as const,
    combinationBindingSettlementRequiredForCombinationPersistence: true as const,
    competingRelationSettlementRequiredForMultiTouchPersistence: true as const,
    supportChannelCountMagnitudeInferenceAuthorized: false as const,
    supportChannelAggregationAuthorized: false as const,
    numericSupportWeightingAuthorized: false as const,
    activationPersistenceToNetSupportEffectAuthorized: false as const,
    activationPersistenceToPostInteractionBureauStateAuthorized: false as const,
    activationPersistenceToTargetPostRelationRootStateAuthorized: false as const,
    activationPersistenceToEffectiveMechanismForceAuthorized: false as const,
    targetPostRelationRootState: 'not_determined' as const,
    effectiveMechanismForceVerdict: 'not_determined' as const,
    relationSpecificUsefulnessHarmfulness: 'not_determined' as const,
    classificationAuthorized: false as const,
    numericScoringAuthorized: false as const,
    authorizedContestTopologyStates: AUTHORIZED_CONTEST_TOPOLOGY_STATES,
    sourceBasis: I53_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_ACTIVATION_PERSISTENCE_SOURCE_BASIS,
    requiredNextImplementationGuards: NEXT_IMPLEMENTATION_GUARDS,
    notes: [
      'I53 resolves only direct contest topology routing for I52 support-channel sources; it does not resolve channel activation or persistence.',
      'A support source touched by clash or combination requires the corresponding relation-specific settlement rather than a generic presence-based verdict.',
      'An untouched support source is merely free of tracked direct contest in the current structural graph; this is not proof that the channel is active or force-bearing.',
      'Multiple relation touches remain a competing-relation settlement problem and do not authorize a universal precedence rule.',
      'The clash and combination source discussions explicitly make outcome dependent on relative force, rescue, role, and actual relation resolution.',
      'Net support effect, post-relation root state, effective mechanism force, usefulness/harmfulness, scoring, and classification remain unresolved or unauthorized.',
    ],
  };

  return {
    reviewId: `challenge_combination_support_channel_activation_persistence_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
