import { describe, expect, test } from 'vitest';
import {
  buildI62ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchMethodologyReview,
  routeI62TouchSpecificSettlementPair,
  type ChallengeCombinationSupportChannelRelationIdentityPair,
} from '../src/index.js';

function pair(
  relationId: string,
  relationKind: ChallengeCombinationSupportChannelRelationIdentityPair['relationKind'],
  isCurrentCombinationRelation: boolean,
): ChallengeCombinationSupportChannelRelationIdentityPair {
  return {
    relationId,
    relationKind,
    isCurrentCombinationRelation,
    precedence: 'not_determined',
    settlementOutcome: 'not_determined',
  };
}

describe('I62 touch-specific settlement dispatch methodology review', () => {
  test('routes an exact current-combination pair to current combination binding/interaction settlement only', () => {
    const result = routeI62TouchSpecificSettlementPair(
      pair('current-six', 'branch_six_combination', true),
    );

    expect(result.dispatchClass).toBe('CURRENT_COMBINATION_SETTLEMENT_ROUTE');
    expect(result.routedDependencies).toEqual([
      'CURRENT_COMBINATION_BINDING_INTERACTION_SETTLEMENT',
    ]);
    expect(result.precedenceWithinMultiTouch).toBe('not_determined');
    expect(result.settlementOutcome).toBe('not_determined');
  });

  test('routes a competing clash pair to the existing I55 clash dependency family without resolving any member', () => {
    const result = routeI62TouchSpecificSettlementPair(
      pair('competing-clash', 'branch_clash', false),
    );

    expect(result.dispatchClass).toBe('COMPETING_CLASH_SETTLEMENT_ROUTE');
    expect(result.routedDependencies).toEqual([
      'CLASH_RELATIVE_FORCE_SETTLEMENT',
      'CLASH_RESCUE_SETTLEMENT_WHERE_APPLICABLE',
      'CLASH_INTERACTION_SETTLEMENT',
    ]);
    expect(result.settlementOutcome).toBe('not_determined');
  });

  test.each([
    'stem_five_combination',
    'branch_six_combination',
    'branch_three_combination',
  ] as const)('routes competing %s to competing combination binding/interaction settlement', (kind) => {
    const result = routeI62TouchSpecificSettlementPair(pair(`competing-${kind}`, kind, false));

    expect(result.dispatchClass).toBe('COMPETING_COMBINATION_SETTLEMENT_ROUTE');
    expect(result.routedDependencies).toEqual([
      'COMPETING_COMBINATION_BINDING_INTERACTION_SETTLEMENT',
    ]);
  });

  test('keeps dispatch pair-local and unordered rather than authorizing multi-touch precedence', () => {
    const clash = routeI62TouchSpecificSettlementPair(
      pair('clash', 'branch_clash', false),
    );
    const combination = routeI62TouchSpecificSettlementPair(
      pair('combination', 'branch_six_combination', false),
    );
    const review =
      buildI62ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchMethodologyReview();

    expect(clash.precedenceWithinMultiTouch).toBe('not_determined');
    expect(combination.precedenceWithinMultiTouch).toBe('not_determined');
    expect(review.crossRelationPrecedenceAuthorized).toBe(false);
    expect(review.multiTouchAggregationAuthorized).toBe(false);
    expect(review.pairOrderSignificanceAuthorized).toBe(false);
  });

  test('does not turn a dispatch route into clash, rescue, binding, activation, persistence, or effective-force verdicts', () => {
    const review =
      buildI62ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchMethodologyReview();

    expect(review.touchSpecificSettlementDispatchAuthorized).toBe(true);
    expect(review.dispatchToSettlementOutcomeAuthorized).toBe(false);
    expect(review.clashDispatchToRelativeForceVerdictAuthorized).toBe(false);
    expect(review.clashDispatchToRescueEffectAuthorized).toBe(false);
    expect(review.combinationDispatchToBindingVerdictAuthorized).toBe(false);
    expect(review.combinationDispatchToNeutralizationVerdictAuthorized).toBe(false);
    expect(review.dispatchToSupportChannelActivationAuthorized).toBe(false);
    expect(review.dispatchToSupportChannelPersistenceAuthorized).toBe(false);
    expect(review.dispatchToSupportChannelDestructionAuthorized).toBe(false);
    expect(review.dispatchToSupportChannelNetEffectAuthorized).toBe(false);
    expect(review.dispatchToEffectiveMechanismForceAuthorized).toBe(false);
  });

  test('is deterministic and keeps scoring, usefulness/harmfulness, and classification closed', () => {
    const left =
      buildI62ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchMethodologyReview();
    const right =
      buildI62ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchMethodologyReview();

    expect(left.reviewId).toBe(right.reviewId);
    expect(left.decision).toBe(
      'PAIR_KIND_DISPATCH_AUTHORIZED_PRECEDENCE_AND_OUTCOME_BLOCKED',
    );
    expect(left.exactI61PairRequired).toBe(true);
    expect(left.dispatchToUsefulnessHarmfulnessAuthorized).toBe(false);
    expect(left.classificationAuthorized).toBe(false);
    expect(left.numericScoringAuthorized).toBe(false);
    expect(
      left.dispatchRules.every(
        (rule) =>
          rule.precedenceWithinMultiTouch === 'not_determined' &&
          rule.settlementOutcome === 'not_determined',
      ),
    ).toBe(true);
  });
});
