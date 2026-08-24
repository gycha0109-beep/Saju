import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { ChallengeCombinationSupportChannelContestTopologyState } from './i53-challenge-combination-support-channel-activation-persistence-methodology-review.js';

export const I55_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_CONTEST_SETTLEMENT_METHODOLOGY_REVIEW_VERSION =
  'myeonghwa-challenge-combination-support-channel-contest-settlement-methodology-review-v1';

export type ChallengeCombinationSupportChannelContestSettlementDependency =
  | 'CURRENT_COMBINATION_BINDING_INTERACTION_SETTLEMENT'
  | 'CLASH_RELATIVE_FORCE_SETTLEMENT'
  | 'CLASH_RESCUE_SETTLEMENT_WHERE_APPLICABLE'
  | 'CLASH_INTERACTION_SETTLEMENT'
  | 'COMPETING_COMBINATION_BINDING_INTERACTION_SETTLEMENT'
  | 'TOUCH_SPECIFIC_RELATION_SETTLEMENT'
  | 'COMPETING_RELATION_SETTLEMENT';

export interface ChallengeCombinationSupportChannelContestSettlementRoute {
  contestTopologyState: ChallengeCombinationSupportChannelContestTopologyState;
  directContestSettlementRequired: boolean;
  requiredSettlementDependencies: readonly ChallengeCombinationSupportChannelContestSettlementDependency[];
  wholeConfigurationStillRequiredForActivationPersistence: true;
  directOutcomeVerdictAuthorized: false;
  supportChannelActivationVerdictAuthorized: false;
  supportChannelPersistenceVerdictAuthorized: false;
  supportChannelNeutralizationVerdictAuthorized: false;
  supportChannelDestructionVerdictAuthorized: false;
  fixedCrossRelationPrecedenceAuthorized: false;
}

export interface ChallengeCombinationSupportChannelContestSettlementMethodologyReviewReport {
  reviewId: string;
  reviewVersion: string;
  decision: 'RELATION_SPECIFIC_SETTLEMENT_ROUTING_AUTHORIZED_CONTEST_OUTCOME_VERDICT_BLOCKED';
  relationSpecificSettlementRoutingAuthorized: true;
  noTrackedRelationTouchRequiresDirectContestSettlement: false;
  noTrackedRelationTouchMeansActivated: false;
  noTrackedRelationTouchMeansPersistent: false;
  currentCombinationParticipationRequiresBindingInteractionSettlement: true;
  currentCombinationParticipationMeansBound: false;
  currentCombinationParticipationMeansNeutralized: false;
  competingClashTouchRequiresRelativeForceSettlement: true;
  competingClashTouchRequiresRescueSettlementWhereApplicable: true;
  competingClashTouchRequiresInteractionSettlement: true;
  competingClashTouchMeansDestroyed: false;
  competingClashTouchMeansInactive: false;
  competingCombinationTouchRequiresBindingInteractionSettlement: true;
  competingCombinationTouchMeansBound: false;
  competingCombinationTouchMeansNeutralized: false;
  multipleTrackedRelationTouchesRequireTouchSpecificSettlement: true;
  multipleTrackedRelationTouchesRequireCompetingRelationSettlement: true;
  multipleTrackedRelationTouchesAuthorizeFixedPrecedence: false;
  directContestTopologyToOutcomeVerdictAuthorized: false;
  directContestTopologyToActivationVerdictAuthorized: false;
  directContestTopologyToPersistenceVerdictAuthorized: false;
  directContestTopologyToNetSupportEffectAuthorized: false;
  contestSettlementToEffectiveMechanismForceAuthorized: false;
  contestSettlementToUsefulnessHarmfulnessAuthorized: false;
  supportChannelAggregationAuthorized: false;
  relationTouchCountMagnitudeInferenceAuthorized: false;
  numericSupportWeightingAuthorized: false;
  targetPostRelationRootState: 'not_determined';
  supportChannelNetEffect: 'not_resolved';
  effectiveMechanismForceVerdict: 'not_determined';
  relationSpecificUsefulnessHarmfulness: 'not_determined';
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  settlementRoutes: readonly ChallengeCombinationSupportChannelContestSettlementRoute[];
  sourceBasis: readonly {
    sourceId: string;
    supportType: 'direct_basis' | 'scope_limit' | 'cross_reference';
    finding: string;
  }[];
  requiredNextImplementationGuards: readonly string[];
  notes: readonly string[];
}

export const I55_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_CONTEST_SETTLEMENT_SOURCE_BASIS = Object.freeze([
  {
    sourceId: 'SRC-METHOD-DITIANSUI-CHANWEI-GANZHI-ROOT-SUPPORT',
    supportType: 'direct_basis' as const,
    finding:
      '滴天髓闡微 states that a stem root is strengthened when the supporting branch receives 生扶 and may be uprooted when that branch receives 衝剋, establishing that direct relation contact is relevant to persistence without making contact alone a sufficient outcome rule.',
  },
  {
    sourceId: 'SRC-METHOD-DITIANSUI-CHANWEI-CHONG-RELATIVE-FORCE',
    supportType: 'scope_limit' as const,
    finding:
      'The clash discussion requires relative flourishing/decline and the surrounding configuration and explicitly warns that the same clash category does not imply one uniform result, so clash touch must route to clash settlement rather than emit destruction or inactivity.',
  },
  {
    sourceId: 'SRC-METHOD-DITIANSUI-CHANWEI-HEJU',
    supportType: 'scope_limit' as const,
    finding:
      'The 合局 discussion distinguishes assistance, removal, quieting, binding, concealment, and other outcomes according to role and actual resolution; combination participation therefore routes to binding/interaction settlement rather than directly deciding persistence or neutralization.',
  },
  {
    sourceId: 'SRC-METHOD-SANMING-TONGHUI-CHONGHE-LUMA',
    supportType: 'cross_reference' as const,
    finding:
      '三命通會 treats 衝 and 合 as context-sensitive interactions whose favorable or unfavorable result depends on surrounding support, obstruction, exposure, and damage, reinforcing that relation presence is not itself a universal settlement verdict.',
  },
] as const);

const SETTLEMENT_ROUTES = Object.freeze([
  {
    contestTopologyState: 'NO_TRACKED_RELATION_TOUCH',
    directContestSettlementRequired: false,
    requiredSettlementDependencies: [],
    wholeConfigurationStillRequiredForActivationPersistence: true,
    directOutcomeVerdictAuthorized: false,
    supportChannelActivationVerdictAuthorized: false,
    supportChannelPersistenceVerdictAuthorized: false,
    supportChannelNeutralizationVerdictAuthorized: false,
    supportChannelDestructionVerdictAuthorized: false,
    fixedCrossRelationPrecedenceAuthorized: false,
  },
  {
    contestTopologyState: 'CURRENT_COMBINATION_PARTICIPATION',
    directContestSettlementRequired: true,
    requiredSettlementDependencies: [
      'CURRENT_COMBINATION_BINDING_INTERACTION_SETTLEMENT',
    ],
    wholeConfigurationStillRequiredForActivationPersistence: true,
    directOutcomeVerdictAuthorized: false,
    supportChannelActivationVerdictAuthorized: false,
    supportChannelPersistenceVerdictAuthorized: false,
    supportChannelNeutralizationVerdictAuthorized: false,
    supportChannelDestructionVerdictAuthorized: false,
    fixedCrossRelationPrecedenceAuthorized: false,
  },
  {
    contestTopologyState: 'COMPETING_CLASH_TOUCH',
    directContestSettlementRequired: true,
    requiredSettlementDependencies: [
      'CLASH_RELATIVE_FORCE_SETTLEMENT',
      'CLASH_RESCUE_SETTLEMENT_WHERE_APPLICABLE',
      'CLASH_INTERACTION_SETTLEMENT',
    ],
    wholeConfigurationStillRequiredForActivationPersistence: true,
    directOutcomeVerdictAuthorized: false,
    supportChannelActivationVerdictAuthorized: false,
    supportChannelPersistenceVerdictAuthorized: false,
    supportChannelNeutralizationVerdictAuthorized: false,
    supportChannelDestructionVerdictAuthorized: false,
    fixedCrossRelationPrecedenceAuthorized: false,
  },
  {
    contestTopologyState: 'COMPETING_COMBINATION_TOUCH',
    directContestSettlementRequired: true,
    requiredSettlementDependencies: [
      'COMPETING_COMBINATION_BINDING_INTERACTION_SETTLEMENT',
    ],
    wholeConfigurationStillRequiredForActivationPersistence: true,
    directOutcomeVerdictAuthorized: false,
    supportChannelActivationVerdictAuthorized: false,
    supportChannelPersistenceVerdictAuthorized: false,
    supportChannelNeutralizationVerdictAuthorized: false,
    supportChannelDestructionVerdictAuthorized: false,
    fixedCrossRelationPrecedenceAuthorized: false,
  },
  {
    contestTopologyState: 'MULTIPLE_TRACKED_RELATION_TOUCHES',
    directContestSettlementRequired: true,
    requiredSettlementDependencies: [
      'TOUCH_SPECIFIC_RELATION_SETTLEMENT',
      'COMPETING_RELATION_SETTLEMENT',
    ],
    wholeConfigurationStillRequiredForActivationPersistence: true,
    directOutcomeVerdictAuthorized: false,
    supportChannelActivationVerdictAuthorized: false,
    supportChannelPersistenceVerdictAuthorized: false,
    supportChannelNeutralizationVerdictAuthorized: false,
    supportChannelDestructionVerdictAuthorized: false,
    fixedCrossRelationPrecedenceAuthorized: false,
  },
] as const satisfies readonly ChallengeCombinationSupportChannelContestSettlementRoute[]);

const NEXT_IMPLEMENTATION_GUARDS = Object.freeze([
  'A next adapter may bind each I54 topology item to the settlement dependency route defined here, preserving exact source pillar + component + value and touching relation ids/kinds.',
  'NO_TRACKED_RELATION_TOUCH may carry no direct tracked-contest settlement dependency, but it must still not be promoted to ACTIVE or PERSISTED because whole-configuration support effect remains unresolved.',
  'CURRENT_COMBINATION_PARTICIPATION must route to the current combination binding/interaction settlement and must not emit BOUND or NEUTRALIZED.',
  'COMPETING_CLASH_TOUCH must route to clash relative-force, rescue where applicable, and clash interaction settlement and must not emit DESTROYED or INACTIVE.',
  'COMPETING_COMBINATION_TOUCH must route to the touched combination binding/interaction settlement and must not emit BOUND or NEUTRALIZED.',
  'MULTIPLE_TRACKED_RELATION_TOUCHES must preserve touch-specific settlement dependencies and the competing-relation settlement gap; do not invent fixed precedence.',
  'Do not aggregate relation touches, support channels, or settlement dependencies into force magnitude, net support effect, numeric score, or classification.',
] as const);

export function routeI55ChallengeCombinationSupportChannelContestSettlement(
  topologyState: ChallengeCombinationSupportChannelContestTopologyState,
): ChallengeCombinationSupportChannelContestSettlementRoute {
  const route = SETTLEMENT_ROUTES.find(
    (candidate) => candidate.contestTopologyState === topologyState,
  );
  if (route === undefined) {
    throw new Error(`Unsupported I55 contest topology state: ${String(topologyState)}`);
  }
  return route;
}

export function buildI55ChallengeCombinationSupportChannelContestSettlementMethodologyReview(): ChallengeCombinationSupportChannelContestSettlementMethodologyReviewReport {
  const material = {
    reviewVersion: I55_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_CONTEST_SETTLEMENT_METHODOLOGY_REVIEW_VERSION,
    decision:
      'RELATION_SPECIFIC_SETTLEMENT_ROUTING_AUTHORIZED_CONTEST_OUTCOME_VERDICT_BLOCKED' as const,
    relationSpecificSettlementRoutingAuthorized: true as const,
    noTrackedRelationTouchRequiresDirectContestSettlement: false as const,
    noTrackedRelationTouchMeansActivated: false as const,
    noTrackedRelationTouchMeansPersistent: false as const,
    currentCombinationParticipationRequiresBindingInteractionSettlement: true as const,
    currentCombinationParticipationMeansBound: false as const,
    currentCombinationParticipationMeansNeutralized: false as const,
    competingClashTouchRequiresRelativeForceSettlement: true as const,
    competingClashTouchRequiresRescueSettlementWhereApplicable: true as const,
    competingClashTouchRequiresInteractionSettlement: true as const,
    competingClashTouchMeansDestroyed: false as const,
    competingClashTouchMeansInactive: false as const,
    competingCombinationTouchRequiresBindingInteractionSettlement: true as const,
    competingCombinationTouchMeansBound: false as const,
    competingCombinationTouchMeansNeutralized: false as const,
    multipleTrackedRelationTouchesRequireTouchSpecificSettlement: true as const,
    multipleTrackedRelationTouchesRequireCompetingRelationSettlement: true as const,
    multipleTrackedRelationTouchesAuthorizeFixedPrecedence: false as const,
    directContestTopologyToOutcomeVerdictAuthorized: false as const,
    directContestTopologyToActivationVerdictAuthorized: false as const,
    directContestTopologyToPersistenceVerdictAuthorized: false as const,
    directContestTopologyToNetSupportEffectAuthorized: false as const,
    contestSettlementToEffectiveMechanismForceAuthorized: false as const,
    contestSettlementToUsefulnessHarmfulnessAuthorized: false as const,
    supportChannelAggregationAuthorized: false as const,
    relationTouchCountMagnitudeInferenceAuthorized: false as const,
    numericSupportWeightingAuthorized: false as const,
    targetPostRelationRootState: 'not_determined' as const,
    supportChannelNetEffect: 'not_resolved' as const,
    effectiveMechanismForceVerdict: 'not_determined' as const,
    relationSpecificUsefulnessHarmfulness: 'not_determined' as const,
    classificationAuthorized: false as const,
    numericScoringAuthorized: false as const,
    settlementRoutes: SETTLEMENT_ROUTES,
    sourceBasis: I55_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_CONTEST_SETTLEMENT_SOURCE_BASIS,
    requiredNextImplementationGuards: NEXT_IMPLEMENTATION_GUARDS,
    notes: [
      'I55 authorizes deterministic routing from I54 topology states to unresolved relation-specific settlement dependencies only.',
      'Direct contest topology is structurally informative but source-bounded texts do not support a generic topology-to-outcome rule across clash and combination contexts.',
      'An untouched source has no tracked direct-contest settlement dependency, but this absence cannot establish activation or persistence because whole-configuration support effect remains unresolved.',
      'Clash touches require relative-force and rescue-aware settlement where applicable; clash presence alone does not establish destruction, inactivity, or persistence loss.',
      'Combination touches require relation-specific binding/interaction settlement; participation alone does not establish binding, neutralization, preservation, or destruction.',
      'Multiple touches preserve every touch-specific dependency plus competing-relation settlement; no universal precedence is authorized.',
      'Net support effect, post-relation root state, effective mechanism force, usefulness/harmfulness, numeric scoring, and strength classification remain unresolved or unauthorized.',
    ],
  };

  return {
    reviewId: `challenge_combination_support_channel_contest_settlement_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
