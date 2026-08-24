import { describe, expect, test } from 'vitest';
import { buildI51ChallengeCombinationSupportInterferenceEffectMethodologyReview } from '../src/index.js';

describe('I51 challenge combination support/interference effect methodology review', () => {
  test('authorizes only same-element and resource support-channel direction', () => {
    const review = buildI51ChallengeCombinationSupportInterferenceEffectMethodologyReview();

    expect(review.decision).toBe('SUPPORT_CHANNEL_DIRECTION_AUTHORIZED_NET_EFFECT_BLOCKED');
    expect(review.sameElementSupportDirectionAuthorized).toBe(true);
    expect(review.resourceGenerationSupportDirectionAuthorized).toBe(true);
    expect(review.supportChannelPresenceStateAuthorized).toBe(true);
    expect(review.authorizedChannelKinds).toEqual([
      'SAME_ELEMENT_PEER_SUPPORT_CHANNEL',
      'RESOURCE_GENERATION_SUPPORT_CHANNEL',
    ]);
  });

  test('permits a no-tracked-support state without converting absence into negative force', () => {
    const review = buildI51ChallengeCombinationSupportInterferenceEffectMethodologyReview();

    expect(review.noTrackedSupportChannelStateAuthorized).toBe(true);
    expect(review.noTrackedSupportChannelMeansNegativeForce).toBe(false);
    expect(review.subjectLocalSupportChannelIdentityAuthorized).toBe(true);
    expect(review.participantLocalSupportChannelIdentityAuthorized).toBe(true);
  });

  test('blocks count-as-force and fixed support precedence rules', () => {
    const review = buildI51ChallengeCombinationSupportInterferenceEffectMethodologyReview();

    expect(review.supportChannelMultiplicityMagnitudeInferenceAuthorized).toBe(false);
    expect(review.supportChannelCountAggregationAuthorized).toBe(false);
    expect(review.visibleStemVersusBranchFixedPrecedenceResolved).toBe(false);
    expect(review.sameElementVersusResourceFixedPrecedenceResolved).toBe(false);
    expect(review.numericSupportWeightingAuthorized).toBe(false);
    expect(review.additiveSupportScoringAuthorized).toBe(false);
  });

  test('keeps activation, persistence and net interference settlement unresolved', () => {
    const review = buildI51ChallengeCombinationSupportInterferenceEffectMethodologyReview();

    expect(review.supportChannelActivationVerdictAuthorized).toBe(false);
    expect(review.supportChannelPersistenceThroughClashAuthorized).toBe(false);
    expect(review.supportChannelPersistenceThroughCombinationAuthorized).toBe(false);
    expect(review.competingRelationNeutralizationVerdictAuthorized).toBe(false);
    expect(review.netSupportInterferenceEffectAuthorized).toBe(false);
  });

  test('remains deterministic and does not authorize relation results, force, scoring or classification', () => {
    const first = buildI51ChallengeCombinationSupportInterferenceEffectMethodologyReview();
    const second = buildI51ChallengeCombinationSupportInterferenceEffectMethodologyReview();

    expect(first.reviewId).toBe(second.reviewId);
    expect(first.supportDirectionToTransformationVerdictAuthorized).toBe(false);
    expect(first.supportDirectionToBindingVerdictAuthorized).toBe(false);
    expect(first.supportDirectionToPostInteractionBureauStateAuthorized).toBe(false);
    expect(first.supportDirectionToTargetPostRelationRootStateAuthorized).toBe(false);
    expect(first.supportDirectionToEffectiveMechanismForceAuthorized).toBe(false);
    expect(first.targetPostRelationRootState).toBe('not_determined');
    expect(first.effectiveMechanismForceVerdict).toBe('not_determined');
    expect(first.relationSpecificUsefulnessHarmfulness).toBe('not_determined');
    expect(first.classificationAuthorized).toBe(false);
    expect(first.numericScoringAuthorized).toBe(false);
  });
});
