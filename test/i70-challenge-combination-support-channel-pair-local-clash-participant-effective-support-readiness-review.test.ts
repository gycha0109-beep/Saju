import { describe, expect, test } from 'vitest';
import { buildI70ChallengeCombinationSupportChannelPairLocalClashParticipantEffectiveSupportReadinessReview } from '../src/research/i70-challenge-combination-support-channel-pair-local-clash-participant-effective-support-readiness-review.js';

describe('I70 pair-local clash participant effective support readiness', () => {
  test('requires exact support-source contest alignment before effective support', () => {
    const report = buildI70ChallengeCombinationSupportChannelPairLocalClashParticipantEffectiveSupportReadinessReview();
    expect(report.decision).toBe(
      'SUPPORT_SOURCE_CONTEST_ALIGNMENT_REQUIRED_EFFECTIVE_SUPPORT_EFFECT_BLOCKED',
    );
    expect(report.exactSupportSourceIdentityRequired).toBe(true);
    expect(report.exactSupportSourceContestTopologyRequired).toBe(true);
    expect(report.supportChannelActivationPersistenceRequiredBeforeEffectiveSupport).toBe(true);
    expect(report.effectiveSupportEffectResolutionAuthorized).toBe(false);
  });

  test('reuses I20c evidence only as category and position substrate', () => {
    const report = buildI70ChallengeCombinationSupportChannelPairLocalClashParticipantEffectiveSupportReadinessReview();
    expect(report.i20cNamedSupportCategoryEvidenceReusable).toBe(true);
    expect(report.i20cSupportPositionEvidenceReusable).toBe(true);
    expect(report.i20cSupportEffectAlreadyResolved).toBe(false);
    expect(report.i20cExactSupportSourceRelationContestIdentityAvailable).toBe(false);
  });

  test('does not directly reuse scoped I52-I65 results for arbitrary clash participants', () => {
    const report = buildI70ChallengeCombinationSupportChannelPairLocalClashParticipantEffectiveSupportReadinessReview();
    expect(report.existingI52ToI65CombinationSupportChannelChainDirectlyReusableForArbitraryClashParticipantSupport).toBe(false);
    expect(report.i53ContestTopologyMethodologyConceptReusable).toBe(true);
    expect(report.i53ActivationPersistenceVerdictReusableWithoutExactChannelAlignment).toBe(false);
  });

  test('keeps untouched and present support distinct from effective support', () => {
    const report = buildI70ChallengeCombinationSupportChannelPairLocalClashParticipantEffectiveSupportReadinessReview();
    expect(report.untouchedSupportSourceMayBeAssumedEffective).toBe(false);
    expect(report.supportSignalPresenceMayBeAssumedEffective).toBe(false);
    expect(report.supportSignalMultiplicityMagnitudeInferenceAuthorized).toBe(false);
    expect(report.supportCategoryFixedPrecedenceAuthorized).toBe(false);
  });

  test('keeps settlement and downstream verdicts closed', () => {
    const report = buildI70ChallengeCombinationSupportChannelPairLocalClashParticipantEffectiveSupportReadinessReview();
    expect(report.relationSpecificSettlementRequiredForContestedSupportSource).toBe(true);
    expect(report.multiTouchPrecedenceRequiredWhereApplicable).toBe(true);
    expect(report.relativeForcePromotionAuthorized).toBe(false);
    expect(report.relativeForceVerdict).toBe('not_determined');
    expect(report.clashWinnerVerdictAuthorized).toBe(false);
    expect(report.rescueEffectAuthorized).toBe(false);
    expect(report.clashSettlementAuthorized).toBe(false);
    expect(report.crossRelationPrecedenceAuthorized).toBe(false);
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
  });

  test('is deterministic', () => {
    const first = buildI70ChallengeCombinationSupportChannelPairLocalClashParticipantEffectiveSupportReadinessReview();
    const second = buildI70ChallengeCombinationSupportChannelPairLocalClashParticipantEffectiveSupportReadinessReview();
    expect(first.reviewId).toBe(second.reviewId);
  });
});
