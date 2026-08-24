import { describe, expect, test } from 'vitest';
import {
  buildI49ChallengeCombinationSeasonalCommandEffectMethodologyReview,
  I49_SEASONAL_DISPOSITION_BY_PHASE,
} from '../src/index.js';

describe('I49 challenge combination seasonal-command effect methodology review', () => {
  test('authorizes source-bounded categorical seasonal disposition only', () => {
    const review = buildI49ChallengeCombinationSeasonalCommandEffectMethodologyReview();

    expect(review.decision).toBe(
      'SOURCE_BOUNDED_SEASONAL_DISPOSITION_AUTHORIZED_RELATION_RESULT_BLOCKED',
    );
    expect(review.monthCommandSeasonalPhaseContractResolved).toBe(true);
    expect(review.targetElementSeasonalDispositionAuthorized).toBe(true);
    expect(review.participantElementSeasonalDispositionAuthorized).toBe(true);
    expect(review.seasonalDispositionAdapterAuthorized).toBe(true);
  });

  test('preserves the full traditional 旺相休囚死 disposition mapping without numeric weights', () => {
    const review = buildI49ChallengeCombinationSeasonalCommandEffectMethodologyReview();

    expect(I49_SEASONAL_DISPOSITION_BY_PHASE).toEqual({
      旺: 'COMMAND_ELEMENT_FLOURISHING',
      相: 'COMMAND_GENERATED_ASSISTING',
      休: 'GENERATES_COMMAND_RESTING',
      囚: 'CONTROLS_COMMAND_CONFINED',
      死: 'CONTROLLED_BY_COMMAND_DEAD_PHASE',
    });
    expect(review.seasonalDispositionByPhase).toEqual(I49_SEASONAL_DISPOSITION_BY_PHASE);
    expect(review.seasonalDispositionWeightingAuthorized).toBe(false);
    expect(review.additiveSeasonalScoringAuthorized).toBe(false);
  });

  test('allows formed three-combination bureau seasonal context while keeping blocked result-element routes closed', () => {
    const review = buildI49ChallengeCombinationSeasonalCommandEffectMethodologyReview();

    expect(review.formedThreeCombinationBureauElementSeasonalDispositionAuthorized).toBe(true);
    expect(review.formedThreeCombinationBureauElementRequiresStructuralFormationEvidence).toBe(true);
    expect(review.stemChallengeTransformedElementSeasonalDispositionAuthorized).toBe(false);
    expect(review.sixCombinationTransformedElementSeasonalDispositionAuthorized).toBe(false);
  });

  test('does not convert seasonal disposition into relation results, root state or effective force', () => {
    const review = buildI49ChallengeCombinationSeasonalCommandEffectMethodologyReview();

    expect(review.seasonalDispositionIsFinalRelativeForceVerdict).toBe(false);
    expect(review.seasonalDispositionToTransformationVerdictAuthorized).toBe(false);
    expect(review.seasonalDispositionToBindingVerdictAuthorized).toBe(false);
    expect(review.seasonalDispositionToPostInteractionBureauStateAuthorized).toBe(false);
    expect(review.seasonalDispositionToTargetPostRelationRootStateAuthorized).toBe(false);
    expect(review.seasonalDispositionToEffectiveMechanismForceAuthorized).toBe(false);
    expect(review.participantSeasonalDispositionAggregationAuthorized).toBe(false);
  });

  test('remains deterministic and fail-closed on scoring, usefulness and classification', () => {
    const first = buildI49ChallengeCombinationSeasonalCommandEffectMethodologyReview();
    const second = buildI49ChallengeCombinationSeasonalCommandEffectMethodologyReview();

    expect(first.reviewId).toBe(second.reviewId);
    expect(first.postCombinationSubjectIdentityPolicyResolved).toBe(false);
    expect(first.targetPostRelationRootState).toBe('not_determined');
    expect(first.effectiveMechanismForceVerdict).toBe('not_determined');
    expect(first.relationSpecificUsefulnessHarmfulness).toBe('not_determined');
    expect(first.classificationAuthorized).toBe(false);
    expect(first.numericScoringAuthorized).toBe(false);
  });
});
