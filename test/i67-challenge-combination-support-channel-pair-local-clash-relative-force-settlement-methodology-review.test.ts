import { describe, expect, test } from 'vitest';
import { buildI67ChallengeCombinationSupportChannelPairLocalClashRelativeForceSettlementMethodologyReview } from '../src/research/i67-challenge-combination-support-channel-pair-local-clash-relative-force-settlement-methodology-review.js';

describe('I67 pair-local clash relative-force settlement methodology review', () => {
  test('authorizes only a tracked-evidence partial order and not a final relative-force verdict', () => {
    const report =
      buildI67ChallengeCombinationSupportChannelPairLocalClashRelativeForceSettlementMethodologyReview();

    expect(report.decision).toBe(
      'TRACKED_EVIDENCE_PARTIAL_ORDER_COMPARISON_AUTHORIZED_FINAL_RELATIVE_FORCE_VERDICT_BLOCKED',
    );
    expect(report.trackedEvidencePartialOrderClassificationAuthorized).toBe(true);
    expect(report.relativeForceVerdictAuthorized).toBe(false);
    expect(report.clashWinnerVerdictAuthorized).toBe(false);
    expect(report.trackedEvidenceDominanceCandidateIsRelativeForceVerdict).toBe(false);
    expect(report.trackedEvidenceEquivalentIsRelativeForceTieVerdict).toBe(false);
  });

  test('uses the traditional seasonal order only as an ordinal evidence dimension', () => {
    const report =
      buildI67ChallengeCombinationSupportChannelPairLocalClashRelativeForceSettlementMethodologyReview();

    expect(report.seasonalPhaseOrder).toEqual(['旺', '相', '休', '囚', '死']);
    expect(report.seasonalPhaseOrdinalComparisonAuthorized).toBe(true);
    expect(report.seasonalAdvantageAloneSufficientForRelativeForceVerdict).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
  });

  test('compares support only by qualitative signal-set inclusion without counts or weights', () => {
    const report =
      buildI67ChallengeCombinationSupportChannelPairLocalClashRelativeForceSettlementMethodologyReview();

    expect(report.trackedSupportSignalUniverse).toEqual([
      'SAME_PILLAR_VISIBLE_SAME_ELEMENT_SUPPORT',
      'EXTERNAL_VISIBLE_SAME_ELEMENT_SUPPORT',
      'VISIBLE_RESOURCE_SUPPORT',
      'ADDITIONAL_SAME_ELEMENT_BRANCH_SUPPORT',
      'RESOURCE_BRANCH_SUPPORT',
    ]);
    expect(report.noTrackedSupportContextTreatedAsEmptySignalSet).toBe(true);
    expect(report.supportSignalSetInclusionComparisonAuthorized).toBe(true);
    expect(report.supportSignalCategoryWeightingAuthorized).toBe(false);
    expect(report.supportPositionCountComparisonAuthorized).toBe(false);
    expect(report.supportMagnitudeInferenceAuthorized).toBe(false);
    expect(report.supportEffectResolutionAuthorized).toBe(false);
  });

  test('defines conservative dominance/equivalence/incomparable topology without forcing conflict to a winner', () => {
    const report =
      buildI67ChallengeCombinationSupportChannelPairLocalClashRelativeForceSettlementMethodologyReview();

    expect(report.supportSetRelationRules.map((rule) => rule.relation)).toEqual([
      'EQUAL_TRACKED_SUPPORT_SIGNAL_SET',
      'FIRST_STRICT_TRACKED_SUPPORT_SIGNAL_SUPERSET',
      'SECOND_STRICT_TRACKED_SUPPORT_SIGNAL_SUPERSET',
      'INCOMPARABLE_TRACKED_SUPPORT_SIGNAL_SETS',
    ]);
    expect(report.partialOrderRules.map((rule) => rule.state)).toEqual([
      'FIRST_TRACKED_EVIDENCE_DOMINANCE_CANDIDATE',
      'SECOND_TRACKED_EVIDENCE_DOMINANCE_CANDIDATE',
      'TRACKED_EVIDENCE_EQUIVALENT',
      'TRACKED_EVIDENCE_INCOMPARABLE',
    ]);
    expect(report.trackedEvidenceIncomparableMayBeForcedToWinner).toBe(false);
  });

  test('keeps rescue, clash settlement, precedence, force, usefulness, scoring, and classification downstream', () => {
    const report =
      buildI67ChallengeCombinationSupportChannelPairLocalClashRelativeForceSettlementMethodologyReview();

    expect(report.rescueEffectAuthorized).toBe(false);
    expect(report.clashSettlementAuthorized).toBe(false);
    expect(report.crossRelationPrecedenceAuthorized).toBe(false);
    expect(report.targetPostRelationRootState).toBe('not_determined');
    expect(report.effectiveMechanismForceVerdict).toBe('not_determined');
    expect(report.relationSpecificUsefulnessHarmfulness).toBe('not_determined');
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
  });

  test('is deterministic and preserves explicit anti-additive implementation guards', () => {
    const first =
      buildI67ChallengeCombinationSupportChannelPairLocalClashRelativeForceSettlementMethodologyReview();
    const second =
      buildI67ChallengeCombinationSupportChannelPairLocalClashRelativeForceSettlementMethodologyReview();

    expect(first.reviewId).toBe(second.reviewId);
    expect(
      first.requiredNextImplementationGuards.some((guard) =>
        guard.includes('Do not compare the number of supporting positions'),
      ),
    ).toBe(true);
    expect(
      first.requiredNextImplementationGuards.some((guard) =>
        guard.includes('preserve TRACKED_EVIDENCE_INCOMPARABLE'),
      ),
    ).toBe(true);
  });
});
