import type { StructuralRelationKind } from '../calculation/structural-relations.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { ChallengeCombinationSupportChannelContestSettlementDependency } from './i55-challenge-combination-support-channel-contest-settlement-methodology-review.js';
import type { ChallengeCombinationSupportChannelRelationIdentityPair } from './i61-challenge-combination-support-channel-relation-identity-pair-evidence.js';

export const I62_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_TOUCH_SPECIFIC_SETTLEMENT_DISPATCH_METHODOLOGY_REVIEW_VERSION =
  'myeonghwa-challenge-combination-support-channel-touch-specific-settlement-dispatch-methodology-review-v1';

export type TouchSpecificSettlementDispatchClass =
  | 'CURRENT_COMBINATION_SETTLEMENT_ROUTE'
  | 'COMPETING_CLASH_SETTLEMENT_ROUTE'
  | 'COMPETING_COMBINATION_SETTLEMENT_ROUTE';

export interface TouchSpecificSettlementDispatchRule {
  dispatchClass: TouchSpecificSettlementDispatchClass;
  relationKinds: readonly StructuralRelationKind[];
  currentCombinationRelation: boolean;
  routedDependencies: readonly ChallengeCombinationSupportChannelContestSettlementDependency[];
  precedenceWithinMultiTouch: 'not_determined';
  settlementOutcome: 'not_determined';
}

export interface ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchMethodologyReviewReport {
  reviewId: string;
  reviewVersion: string;
  decision: 'PAIR_KIND_DISPATCH_AUTHORIZED_PRECEDENCE_AND_OUTCOME_BLOCKED';
  exactI61PairRequired: true;
  touchSpecificSettlementDispatchAuthorized: true;
  currentCombinationPairDispatchAuthorized: true;
  competingClashPairDispatchAuthorized: true;
  competingCombinationPairDispatchAuthorized: true;
  pairDispatchMayReuseI55DependencyVocabulary: true;
  crossRelationPrecedenceAuthorized: false;
  multiTouchAggregationAuthorized: false;
  pairOrderSignificanceAuthorized: false;
  dispatchToSettlementOutcomeAuthorized: false;
  clashDispatchToRelativeForceVerdictAuthorized: false;
  clashDispatchToRescueEffectAuthorized: false;
  combinationDispatchToBindingVerdictAuthorized: false;
  combinationDispatchToNeutralizationVerdictAuthorized: false;
  dispatchToSupportChannelActivationAuthorized: false;
  dispatchToSupportChannelPersistenceAuthorized: false;
  dispatchToSupportChannelDestructionAuthorized: false;
  dispatchToSupportChannelNetEffectAuthorized: false;
  dispatchToEffectiveMechanismForceAuthorized: false;
  dispatchToUsefulnessHarmfulnessAuthorized: false;
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  dispatchRules: readonly TouchSpecificSettlementDispatchRule[];
  notes: readonly string[];
}

const CURRENT_COMBINATION_DEPENDENCIES = Object.freeze([
  'CURRENT_COMBINATION_BINDING_INTERACTION_SETTLEMENT',
] as const satisfies readonly ChallengeCombinationSupportChannelContestSettlementDependency[]);

const COMPETING_CLASH_DEPENDENCIES = Object.freeze([
  'CLASH_RELATIVE_FORCE_SETTLEMENT',
  'CLASH_RESCUE_SETTLEMENT_WHERE_APPLICABLE',
  'CLASH_INTERACTION_SETTLEMENT',
] as const satisfies readonly ChallengeCombinationSupportChannelContestSettlementDependency[]);

const COMPETING_COMBINATION_DEPENDENCIES = Object.freeze([
  'COMPETING_COMBINATION_BINDING_INTERACTION_SETTLEMENT',
] as const satisfies readonly ChallengeCombinationSupportChannelContestSettlementDependency[]);

const COMBINATION_RELATION_KINDS = Object.freeze([
  'stem_five_combination',
  'branch_six_combination',
  'branch_three_combination',
] as const satisfies readonly StructuralRelationKind[]);

const DISPATCH_RULES: readonly TouchSpecificSettlementDispatchRule[] = Object.freeze([
  {
    dispatchClass: 'CURRENT_COMBINATION_SETTLEMENT_ROUTE',
    relationKinds: COMBINATION_RELATION_KINDS,
    currentCombinationRelation: true,
    routedDependencies: CURRENT_COMBINATION_DEPENDENCIES,
    precedenceWithinMultiTouch: 'not_determined',
    settlementOutcome: 'not_determined',
  },
  {
    dispatchClass: 'COMPETING_CLASH_SETTLEMENT_ROUTE',
    relationKinds: ['branch_clash'],
    currentCombinationRelation: false,
    routedDependencies: COMPETING_CLASH_DEPENDENCIES,
    precedenceWithinMultiTouch: 'not_determined',
    settlementOutcome: 'not_determined',
  },
  {
    dispatchClass: 'COMPETING_COMBINATION_SETTLEMENT_ROUTE',
    relationKinds: COMBINATION_RELATION_KINDS,
    currentCombinationRelation: false,
    routedDependencies: COMPETING_COMBINATION_DEPENDENCIES,
    precedenceWithinMultiTouch: 'not_determined',
    settlementOutcome: 'not_determined',
  },
]);

export interface TouchSpecificSettlementDispatchResult {
  relationId: string;
  relationKind: StructuralRelationKind;
  isCurrentCombinationRelation: boolean;
  dispatchClass: TouchSpecificSettlementDispatchClass;
  routedDependencies: readonly ChallengeCombinationSupportChannelContestSettlementDependency[];
  precedenceWithinMultiTouch: 'not_determined';
  settlementOutcome: 'not_determined';
}

export function routeI62TouchSpecificSettlementPair(
  pair: ChallengeCombinationSupportChannelRelationIdentityPair,
): TouchSpecificSettlementDispatchResult {
  let rule: TouchSpecificSettlementDispatchRule | undefined;
  if (pair.isCurrentCombinationRelation) {
    rule = DISPATCH_RULES.find(
      (candidate) =>
        candidate.currentCombinationRelation && candidate.relationKinds.includes(pair.relationKind),
    );
  } else if (pair.relationKind === 'branch_clash') {
    rule = DISPATCH_RULES.find(
      (candidate) => candidate.dispatchClass === 'COMPETING_CLASH_SETTLEMENT_ROUTE',
    );
  } else {
    rule = DISPATCH_RULES.find(
      (candidate) =>
        candidate.dispatchClass === 'COMPETING_COMBINATION_SETTLEMENT_ROUTE' &&
        candidate.relationKinds.includes(pair.relationKind),
    );
  }

  if (rule === undefined) {
    throw new Error(
      `Unsupported I62 relation-pair dispatch: ${pair.relationId}|${pair.relationKind}|${String(pair.isCurrentCombinationRelation)}`,
    );
  }

  return {
    relationId: pair.relationId,
    relationKind: pair.relationKind,
    isCurrentCombinationRelation: pair.isCurrentCombinationRelation,
    dispatchClass: rule.dispatchClass,
    routedDependencies: rule.routedDependencies,
    precedenceWithinMultiTouch: 'not_determined',
    settlementOutcome: 'not_determined',
  };
}

export function buildI62ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchMethodologyReview(): ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchMethodologyReviewReport {
  const material = {
    reviewVersion:
      I62_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_TOUCH_SPECIFIC_SETTLEMENT_DISPATCH_METHODOLOGY_REVIEW_VERSION,
    decision: 'PAIR_KIND_DISPATCH_AUTHORIZED_PRECEDENCE_AND_OUTCOME_BLOCKED' as const,
    exactI61PairRequired: true as const,
    touchSpecificSettlementDispatchAuthorized: true as const,
    currentCombinationPairDispatchAuthorized: true as const,
    competingClashPairDispatchAuthorized: true as const,
    competingCombinationPairDispatchAuthorized: true as const,
    pairDispatchMayReuseI55DependencyVocabulary: true as const,
    crossRelationPrecedenceAuthorized: false as const,
    multiTouchAggregationAuthorized: false as const,
    pairOrderSignificanceAuthorized: false as const,
    dispatchToSettlementOutcomeAuthorized: false as const,
    clashDispatchToRelativeForceVerdictAuthorized: false as const,
    clashDispatchToRescueEffectAuthorized: false as const,
    combinationDispatchToBindingVerdictAuthorized: false as const,
    combinationDispatchToNeutralizationVerdictAuthorized: false as const,
    dispatchToSupportChannelActivationAuthorized: false as const,
    dispatchToSupportChannelPersistenceAuthorized: false as const,
    dispatchToSupportChannelDestructionAuthorized: false as const,
    dispatchToSupportChannelNetEffectAuthorized: false as const,
    dispatchToEffectiveMechanismForceAuthorized: false as const,
    dispatchToUsefulnessHarmfulnessAuthorized: false as const,
    classificationAuthorized: false as const,
    numericScoringAuthorized: false as const,
    dispatchRules: DISPATCH_RULES,
    notes: [
      'I62 dispatches only exact authoritative I61 relation-id/kind pairs; it does not infer or reconstruct relation identity from I54 separate metadata arrays.',
      'A pair marked as the current combination relation routes to the existing I55 CURRENT_COMBINATION_BINDING_INTERACTION_SETTLEMENT dependency.',
      'A competing branch clash routes to the existing I55 clash relative-force, rescue-where-applicable, and interaction settlement dependencies.',
      'A competing stem-five, branch-six, or branch-three combination routes to the existing I55 COMPETING_COMBINATION_BINDING_INTERACTION_SETTLEMENT dependency.',
      'Dispatch is per pair and unordered. Multiple dispatched relations are not aggregated, ranked, or assigned fixed precedence.',
      'Dispatch identifies the next relation-specific settlement domain only; it does not resolve relative force, rescue, binding, neutralization, activation, persistence, destruction, net effect, effective force, usefulness/harmfulness, numeric score, or strong/weak classification.',
    ],
  };

  return {
    reviewId: `challenge_combination_support_channel_touch_specific_settlement_dispatch_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
