import { describe, expect, test } from 'vitest';
import {
  buildI46ChallengeRootThreeCombinationClashBreakDamageSettlementMethodologyReview,
} from '../src/index.js';

describe('I46 challenge root three-combination clash break/damage settlement methodology review', () => {
  test('authorizes only the tight embedded clash as a deterministic bureau-break rule', () => {
    const review = buildI46ChallengeRootThreeCombinationClashBreakDamageSettlementMethodologyReview();
    const direct = review.placementPolicies.find(
      (item) =>
        item.placement === 'EMBEDDED_WITHIN_BUREAU_SPAN_TIGHT_TO_CLASHED_PARTICIPANT',
    );

    expect(review.decision).toBe(
      'TIGHT_EMBEDDED_CLASH_BREAK_AUTHORIZED_OTHER_SETTLEMENT_STATES_CONTEXTUAL',
    );
    expect(review.tightEmbeddedClashBreakVerdictAuthorized).toBe(true);
    expect(review.tightEmbeddedClashBreakVerdict).toBe('BROKEN_BY_TIGHT_EMBEDDED_CLASH');
    expect(direct).toEqual({
      placement: 'EMBEDDED_WITHIN_BUREAU_SPAN_TIGHT_TO_CLASHED_PARTICIPANT',
      settlement: 'BREAK_AUTHORIZED',
      deterministicBureauState: 'BROKEN_BY_TIGHT_EMBEDDED_CLASH',
    });
  });

  test('keeps embedded non-tight and outside tight cases contextual rather than manufacturing damage', () => {
    const review = buildI46ChallengeRootThreeCombinationClashBreakDamageSettlementMethodologyReview();
    const embeddedNonTight = review.placementPolicies.find(
      (item) => item.placement === 'EMBEDDED_WITHIN_BUREAU_SPAN_NOT_TIGHT',
    );
    const outsideTight = review.placementPolicies.find(
      (item) => item.placement === 'OUTSIDE_BUREAU_SPAN_TIGHT_TO_CLASHED_PARTICIPANT',
    );

    expect(embeddedNonTight?.settlement).toBe('CONTEXTUAL_INTACT_OR_DAMAGED_UNRESOLVED');
    expect(outsideTight?.settlement).toBe('CONTEXTUAL_INTACT_OR_DAMAGED_UNRESOLVED');
    expect(review.embeddedNonTightDeterministicDamageVerdictAuthorized).toBe(false);
    expect(review.outsideTightDeterministicDamageVerdictAuthorized).toBe(false);
    expect(review.damagedBureauMagnitudeClassificationAuthorized).toBe(false);
  });

  test('does not infer intactness from outside non-tight placement or absence of tracked clash', () => {
    const review = buildI46ChallengeRootThreeCombinationClashBreakDamageSettlementMethodologyReview();
    const outsideNonTight = review.placementPolicies.find(
      (item) => item.placement === 'OUTSIDE_BUREAU_SPAN_NOT_TIGHT',
    );
    const noClash = review.placementPolicies.find(
      (item) => item.placement === 'NO_TRACKED_CLASH',
    );

    expect(outsideNonTight?.settlement).toBe('NO_DIRECT_SETTLEMENT_FROM_THIS_RULE');
    expect(noClash?.settlement).toBe('NO_DIRECT_SETTLEMENT_FROM_THIS_RULE');
    expect(review.outsideNonTightDeterministicSettlementAuthorized).toBe(false);
    expect(review.noTrackedClashIntactVerdictAuthorized).toBe(false);
    expect(review.genericPostInteractionBureauStateEmissionAuthorized).toBe(false);
  });

  test('preserves placement/proximity as categorical topology without weighting or aggregation', () => {
    const review = buildI46ChallengeRootThreeCombinationClashBreakDamageSettlementMethodologyReview();

    expect(review.structuralBureauFormationRequiredBeforeSettlement).toBe(true);
    expect(review.trackedClashTopologyRequiredForClashSettlement).toBe(true);
    expect(review.placementClassificationAuthorized).toBe(true);
    expect(review.bureauSpanDefinitionAuthorized).toBe(true);
    expect(review.tightAdjacencyDefinitionAuthorized).toBe(true);
    expect(review.multipleClashAggregationAuthorized).toBe(false);
    expect(review.clashForceWeightingAuthorized).toBe(false);
    expect(review.seasonalOverrideOfTightEmbeddedBreakResolved).toBe(false);
    expect(review.supportOverrideOfTightEmbeddedBreakResolved).toBe(false);
  });

  test('keeps break settlement separate from root state, effective force, scoring and classification', () => {
    const first = buildI46ChallengeRootThreeCombinationClashBreakDamageSettlementMethodologyReview();
    const second = buildI46ChallengeRootThreeCombinationClashBreakDamageSettlementMethodologyReview();

    expect(first.reviewId).toBe(second.reviewId);
    expect(first.postInteractionBureauStateEmissionAuthorizedForTightEmbeddedBreakOnly).toBe(true);
    expect(first.genericPostInteractionBureauStateEmissionAuthorized).toBe(false);
    expect(first.targetPostRelationRootState).toBe('not_determined');
    expect(first.effectiveMechanismForceVerdict).toBe('not_determined');
    expect(first.relationSpecificUsefulnessHarmfulness).toBe('not_determined');
    expect(first.classificationAuthorized).toBe(false);
    expect(first.numericScoringAuthorized).toBe(false);
  });
});
