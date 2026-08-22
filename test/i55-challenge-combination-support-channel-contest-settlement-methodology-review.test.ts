import { describe, expect, test } from 'vitest';
import {
  buildI55ChallengeCombinationSupportChannelContestSettlementMethodologyReview,
  routeI55ChallengeCombinationSupportChannelContestSettlement,
} from '../src/index.js';

describe('I55 challenge combination support-channel contest settlement methodology review', () => {
  test('keeps NO_TRACKED_RELATION_TOUCH free of direct contest settlement while blocking ACTIVE/PERSISTED inference', () => {
    const route = routeI55ChallengeCombinationSupportChannelContestSettlement(
      'NO_TRACKED_RELATION_TOUCH',
    );

    expect(route.directContestSettlementRequired).toBe(false);
    expect(route.requiredSettlementDependencies).toEqual([]);
    expect(route.wholeConfigurationStillRequiredForActivationPersistence).toBe(true);
    expect(route.supportChannelActivationVerdictAuthorized).toBe(false);
    expect(route.supportChannelPersistenceVerdictAuthorized).toBe(false);
  });

  test('routes CURRENT_COMBINATION_PARTICIPATION to binding/interaction settlement without BOUND or NEUTRALIZED verdicts', () => {
    const review = buildI55ChallengeCombinationSupportChannelContestSettlementMethodologyReview();
    const route = routeI55ChallengeCombinationSupportChannelContestSettlement(
      'CURRENT_COMBINATION_PARTICIPATION',
    );

    expect(route.requiredSettlementDependencies).toEqual([
      'CURRENT_COMBINATION_BINDING_INTERACTION_SETTLEMENT',
    ]);
    expect(review.currentCombinationParticipationMeansBound).toBe(false);
    expect(review.currentCombinationParticipationMeansNeutralized).toBe(false);
    expect(route.directOutcomeVerdictAuthorized).toBe(false);
  });

  test('routes COMPETING_CLASH_TOUCH to relative-force, rescue-aware, and clash interaction settlement without destruction', () => {
    const review = buildI55ChallengeCombinationSupportChannelContestSettlementMethodologyReview();
    const route = routeI55ChallengeCombinationSupportChannelContestSettlement(
      'COMPETING_CLASH_TOUCH',
    );

    expect(route.requiredSettlementDependencies).toEqual([
      'CLASH_RELATIVE_FORCE_SETTLEMENT',
      'CLASH_RESCUE_SETTLEMENT_WHERE_APPLICABLE',
      'CLASH_INTERACTION_SETTLEMENT',
    ]);
    expect(review.competingClashTouchMeansDestroyed).toBe(false);
    expect(review.competingClashTouchMeansInactive).toBe(false);
    expect(route.supportChannelDestructionVerdictAuthorized).toBe(false);
  });

  test('routes COMPETING_COMBINATION_TOUCH to relation-specific binding/interaction settlement without neutralization', () => {
    const review = buildI55ChallengeCombinationSupportChannelContestSettlementMethodologyReview();
    const route = routeI55ChallengeCombinationSupportChannelContestSettlement(
      'COMPETING_COMBINATION_TOUCH',
    );

    expect(route.requiredSettlementDependencies).toEqual([
      'COMPETING_COMBINATION_BINDING_INTERACTION_SETTLEMENT',
    ]);
    expect(review.competingCombinationTouchMeansBound).toBe(false);
    expect(review.competingCombinationTouchMeansNeutralized).toBe(false);
    expect(route.supportChannelNeutralizationVerdictAuthorized).toBe(false);
  });

  test('routes MULTIPLE_TRACKED_RELATION_TOUCHES to touch-specific plus competing-relation settlement without fixed precedence', () => {
    const review = buildI55ChallengeCombinationSupportChannelContestSettlementMethodologyReview();
    const route = routeI55ChallengeCombinationSupportChannelContestSettlement(
      'MULTIPLE_TRACKED_RELATION_TOUCHES',
    );

    expect(route.requiredSettlementDependencies).toEqual([
      'TOUCH_SPECIFIC_RELATION_SETTLEMENT',
      'COMPETING_RELATION_SETTLEMENT',
    ]);
    expect(route.fixedCrossRelationPrecedenceAuthorized).toBe(false);
    expect(review.multipleTrackedRelationTouchesAuthorizeFixedPrecedence).toBe(false);
  });

  test('preserves deterministic review identity and all force/scoring/classification guards', () => {
    const first = buildI55ChallengeCombinationSupportChannelContestSettlementMethodologyReview();
    const second = buildI55ChallengeCombinationSupportChannelContestSettlementMethodologyReview();

    expect(first.reviewId).toBe(second.reviewId);
    expect(first.decision).toBe(
      'RELATION_SPECIFIC_SETTLEMENT_ROUTING_AUTHORIZED_CONTEST_OUTCOME_VERDICT_BLOCKED',
    );
    expect(first.directContestTopologyToOutcomeVerdictAuthorized).toBe(false);
    expect(first.directContestTopologyToActivationVerdictAuthorized).toBe(false);
    expect(first.directContestTopologyToPersistenceVerdictAuthorized).toBe(false);
    expect(first.directContestTopologyToNetSupportEffectAuthorized).toBe(false);
    expect(first.contestSettlementToEffectiveMechanismForceAuthorized).toBe(false);
    expect(first.contestSettlementToUsefulnessHarmfulnessAuthorized).toBe(false);
    expect(first.supportChannelAggregationAuthorized).toBe(false);
    expect(first.relationTouchCountMagnitudeInferenceAuthorized).toBe(false);
    expect(first.numericSupportWeightingAuthorized).toBe(false);
    expect(first.targetPostRelationRootState).toBe('not_determined');
    expect(first.supportChannelNetEffect).toBe('not_resolved');
    expect(first.effectiveMechanismForceVerdict).toBe('not_determined');
    expect(first.relationSpecificUsefulnessHarmfulness).toBe('not_determined');
    expect(first.classificationAuthorized).toBe(false);
    expect(first.numericScoringAuthorized).toBe(false);
    expect(first.settlementRoutes).toHaveLength(5);
  });
});
