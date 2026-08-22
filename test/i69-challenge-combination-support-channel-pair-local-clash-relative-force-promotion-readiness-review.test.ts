import { describe, expect, test } from 'vitest';
import { buildI69ChallengeCombinationSupportChannelPairLocalClashRelativeForcePromotionReadinessReview } from '../src/research/i69-challenge-combination-support-channel-pair-local-clash-relative-force-promotion-readiness-review.js';

describe('I69 pair-local clash relative-force promotion readiness', () => {
  test('blocks promotion of I68 partial-order states to final relative force', () => {
    const report = buildI69ChallengeCombinationSupportChannelPairLocalClashRelativeForcePromotionReadinessReview();
    expect(report.decision).toBe(
      'PARTIAL_ORDER_PROMOTION_BLOCKED_EFFECTIVE_SUPPORT_EFFECT_UNRESOLVED',
    );
    expect(report.trackedEvidencePartialOrderSufficientForRelativeForceVerdict).toBe(false);
    expect(report.dominanceCandidatePromotableToRelativeForceWinner).toBe(false);
    expect(report.evidenceEquivalencePromotableToRelativeForceTie).toBe(false);
    expect(report.relativeForcePromotionAuthorized).toBe(false);
  });

  test('does not generalize day-master support precedence to arbitrary clash participants', () => {
    const report = buildI69ChallengeCombinationSupportChannelPairLocalClashRelativeForcePromotionReadinessReview();
    expect(report.i21DayMasterSameElementPrecedenceReusableForArbitraryClashParticipantSupport).toBe(false);
    expect(report.i22DayMasterSupportFrontierReusableForArbitraryClashParticipantSupport).toBe(false);
  });

  test('requires participant-local support-effect methodology and evidence', () => {
    const report = buildI69ChallengeCombinationSupportChannelPairLocalClashRelativeForcePromotionReadinessReview();
    expect(report.clashParticipantEffectiveSupportEffectResolved).toBe(false);
    expect(report.pairLocalClashSupportEffectMethodologyRequired).toBe(true);
    expect(report.pairLocalClashSupportEffectEvidenceRequiredAfterMethodology).toBe(true);
  });

  test('keeps support weighting, counting, and net-effect authority closed', () => {
    const report = buildI69ChallengeCombinationSupportChannelPairLocalClashRelativeForcePromotionReadinessReview();
    expect(report.supportSignalSetInclusionSufficientForEffectiveSupportVerdict).toBe(false);
    expect(report.supportSignalPresenceSufficientForEffectiveSupportVerdict).toBe(false);
    expect(report.supportCategoryWeightingAuthorized).toBe(false);
    expect(report.supportPositionCountAggregationAuthorized).toBe(false);
    expect(report.i51NetSupportInterferenceEffectAuthorityAvailable).toBe(false);
  });

  test('keeps downstream clash and force outcomes blocked', () => {
    const report = buildI69ChallengeCombinationSupportChannelPairLocalClashRelativeForcePromotionReadinessReview();
    expect(report.relativeForceVerdict).toBe('not_determined');
    expect(report.clashWinnerVerdictAuthorized).toBe(false);
    expect(report.rescueEffectAuthorized).toBe(false);
    expect(report.clashSettlementAuthorized).toBe(false);
    expect(report.crossRelationPrecedenceAuthorized).toBe(false);
    expect(report.targetPostRelationRootState).toBe('not_determined');
    expect(report.effectiveMechanismForceVerdict).toBe('not_determined');
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
  });

  test('is deterministic', () => {
    const first = buildI69ChallengeCombinationSupportChannelPairLocalClashRelativeForcePromotionReadinessReview();
    const second = buildI69ChallengeCombinationSupportChannelPairLocalClashRelativeForcePromotionReadinessReview();
    expect(first.reviewId).toBe(second.reviewId);
  });
});
