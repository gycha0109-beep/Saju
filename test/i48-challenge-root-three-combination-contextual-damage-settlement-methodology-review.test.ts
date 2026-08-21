import { describe, expect, test } from 'vitest';
import {
  buildI48ChallengeRootThreeCombinationContextualDamageSettlementMethodologyReview,
} from '../src/index.js';

describe('I48 challenge root three-combination contextual damage settlement methodology review', () => {
  test('closes placement-only deterministic settlement for the two I47 contextual classes', () => {
    const review = buildI48ChallengeRootThreeCombinationContextualDamageSettlementMethodologyReview();

    expect(review.decision).toBe(
      'PLACEMENT_ONLY_CONTEXTUAL_SETTLEMENT_NOT_DETERMINISTIC_SOURCE_BOUNDED_AMBIGUITY',
    );
    expect(review.contextualPlacementClassesConfirmed).toEqual([
      'EMBEDDED_WITHIN_BUREAU_SPAN_NOT_TIGHT',
      'OUTSIDE_BUREAU_SPAN_TIGHT_TO_CLASHED_PARTICIPANT',
    ]);
    expect(review.contextualPlacementEvidenceAvailable).toBe(true);
    expect(review.placementOnlyIntactVerdictAuthorized).toBe(false);
    expect(review.placementOnlyDamagedVerdictAuthorized).toBe(false);
  });

  test('preserves the I46 tight embedded direct-break rule without reopening it', () => {
    const review = buildI48ChallengeRootThreeCombinationContextualDamageSettlementMethodologyReview();

    expect(review.tightEmbeddedDirectBreakRuleReopened).toBe(false);
    expect(review.tightEmbeddedDirectBreakRuleRemainsAuthorized).toBe(true);
    expect(review.genericPostInteractionBureauStateEmissionAuthorized).toBe(false);
  });

  test('authorizes only a source-bounded ambiguity marker, not damage magnitude or severity', () => {
    const review = buildI48ChallengeRootThreeCombinationContextualDamageSettlementMethodologyReview();

    expect(review.contextualAmbiguityStateAuthorized).toBe(true);
    expect(review.contextualAmbiguityState).toBe(
      'SOURCE_BOUNDED_CONTEXTUAL_INTACT_OR_DAMAGED_AMBIGUITY',
    );
    expect(review.deterministicDamageMagnitudeAuthorized).toBe(false);
    expect(review.deterministicDamageSeverityClassAuthorized).toBe(false);
    expect(review.deterministicContextPrecedenceRuleResolved).toBe(false);
    expect(review.sourceProvidesCompleteAdditionalContextDecisionRule).toBe(false);
  });

  test('requires independent future effect methodology rather than guessing intactness from no direct break', () => {
    const review = buildI48ChallengeRootThreeCombinationContextualDamageSettlementMethodologyReview();

    expect(review.additionalIndependentEffectMethodologyRequiredForFurtherResolution).toBe(true);
    expect(review.noTrackedClashIntactVerdictAuthorized).toBe(false);
    expect(review.outsideNonTightIntactVerdictAuthorized).toBe(false);
    expect(
      review.requiredAvailabilityRefinement.some((item) =>
        item.includes('SOURCE_BOUNDED_CONTEXTUAL_INTACT_OR_DAMAGED_AMBIGUITY'),
      ),
    ).toBe(true);
  });

  test('keeps contextual ambiguity separate from root state, effective force, scoring and classification', () => {
    const first = buildI48ChallengeRootThreeCombinationContextualDamageSettlementMethodologyReview();
    const second = buildI48ChallengeRootThreeCombinationContextualDamageSettlementMethodologyReview();

    expect(first.reviewId).toBe(second.reviewId);
    expect(first.targetPostRelationRootState).toBe('not_determined');
    expect(first.effectiveMechanismForceVerdict).toBe('not_determined');
    expect(first.relationSpecificUsefulnessHarmfulness).toBe('not_determined');
    expect(first.classificationAuthorized).toBe(false);
    expect(first.numericScoringAuthorized).toBe(false);
  });
});
