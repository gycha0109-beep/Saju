import { describe, expect, test } from 'vitest';
import { buildI53ChallengeCombinationSupportChannelActivationPersistenceMethodologyReview } from '../src/index.js';

describe('I53 challenge combination support-channel activation/persistence methodology review', () => {
  test('authorizes only direct contest topology routing', () => {
    const review = buildI53ChallengeCombinationSupportChannelActivationPersistenceMethodologyReview();

    expect(review.decision).toBe(
      'DIRECT_CONTEST_ROUTING_AUTHORIZED_ACTIVATION_PERSISTENCE_VERDICT_BLOCKED',
    );
    expect(review.supportChannelContestTopologyRoutingAuthorized).toBe(true);
    expect(review.authorizedContestTopologyStates).toEqual([
      'NO_TRACKED_RELATION_TOUCH',
      'CURRENT_COMBINATION_PARTICIPATION',
      'COMPETING_CLASH_TOUCH',
      'COMPETING_COMBINATION_TOUCH',
      'MULTIPLE_TRACKED_RELATION_TOUCHES',
    ]);
  });

  test('does not treat untracked contest absence as activation or persistence', () => {
    const review = buildI53ChallengeCombinationSupportChannelActivationPersistenceMethodologyReview();

    expect(review.noTrackedRelationTouchStateAuthorized).toBe(true);
    expect(review.noTrackedRelationTouchMeansActivated).toBe(false);
    expect(review.noTrackedRelationTouchMeansPersistent).toBe(false);
  });

  test('does not convert clash or combination touch into broken, bound or neutralized states', () => {
    const review = buildI53ChallengeCombinationSupportChannelActivationPersistenceMethodologyReview();

    expect(review.currentCombinationParticipationMeansNeutralized).toBe(false);
    expect(review.competingClashTouchMeansBroken).toBe(false);
    expect(review.competingCombinationTouchMeansBound).toBe(false);
    expect(review.directContestTopologyToActivationVerdictAuthorized).toBe(false);
    expect(review.directContestTopologyToPersistenceVerdictAuthorized).toBe(false);
    expect(review.directContestTopologyToNeutralizationVerdictAuthorized).toBe(false);
  });

  test('requires relation-specific settlement for contested support-channel persistence', () => {
    const review = buildI53ChallengeCombinationSupportChannelActivationPersistenceMethodologyReview();

    expect(review.clashRelativeForceSettlementRequiredForClashPersistence).toBe(true);
    expect(review.clashRescueSettlementRequiredWhereApplicable).toBe(true);
    expect(review.combinationBindingSettlementRequiredForCombinationPersistence).toBe(true);
    expect(review.competingRelationSettlementRequiredForMultiTouchPersistence).toBe(true);
    expect(review.supportChannelCountMagnitudeInferenceAuthorized).toBe(false);
    expect(review.supportChannelAggregationAuthorized).toBe(false);
  });

  test('remains deterministic and preserves net-effect, force, scoring and classification guards', () => {
    const first = buildI53ChallengeCombinationSupportChannelActivationPersistenceMethodologyReview();
    const second = buildI53ChallengeCombinationSupportChannelActivationPersistenceMethodologyReview();

    expect(first.reviewId).toBe(second.reviewId);
    expect(first.activationPersistenceToNetSupportEffectAuthorized).toBe(false);
    expect(first.activationPersistenceToPostInteractionBureauStateAuthorized).toBe(false);
    expect(first.activationPersistenceToTargetPostRelationRootStateAuthorized).toBe(false);
    expect(first.activationPersistenceToEffectiveMechanismForceAuthorized).toBe(false);
    expect(first.targetPostRelationRootState).toBe('not_determined');
    expect(first.effectiveMechanismForceVerdict).toBe('not_determined');
    expect(first.relationSpecificUsefulnessHarmfulness).toBe('not_determined');
    expect(first.classificationAuthorized).toBe(false);
    expect(first.numericScoringAuthorized).toBe(false);
  });
});
