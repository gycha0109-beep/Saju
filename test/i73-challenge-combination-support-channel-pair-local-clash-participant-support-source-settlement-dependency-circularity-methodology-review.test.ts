import { describe, expect, test } from 'vitest';
import { buildI73ChallengeCombinationSupportChannelPairLocalClashParticipantSupportSourceSettlementDependencyCircularityMethodologyReview } from '../src/research/i73-challenge-combination-support-channel-pair-local-clash-participant-support-source-settlement-dependency-circularity-methodology-review.js';

describe('I73 support-source settlement dependency circularity methodology', () => {
  test('classifies all I72 topology states without resolving outcomes', () => {
    const report = buildI73ChallengeCombinationSupportChannelPairLocalClashParticipantSupportSourceSettlementDependencyCircularityMethodologyReview();
    expect(report.decision).toBe(
      'SOURCE_LOCAL_SETTLEMENT_DEPENDENCY_CLASSIFICATION_AUTHORIZED_RECURSIVE_EFFECT_RESOLUTION_BLOCKED',
    );
    expect(report.dependencyRules.map((rule) => rule.topologyState)).toEqual([
      'NO_TRACKED_RELATION_TOUCH',
      'EVALUATED_CLASH_PARTICIPATION',
      'OTHER_CLASH_TOUCH',
      'COMBINATION_TOUCH',
      'MULTIPLE_TRACKED_RELATION_TOUCHES',
    ]);
    expect(report.dependencyClassificationIsSettlementOutcome).toBe(false);
  });

  test('detects evaluated-clash support recursion and forbids implicit cycle resolution', () => {
    const report = buildI73ChallengeCombinationSupportChannelPairLocalClashParticipantSupportSourceSettlementDependencyCircularityMethodologyReview();
    const rule = report.dependencyRules.find(
      (candidate) => candidate.topologyState === 'EVALUATED_CLASH_PARTICIPATION',
    );
    expect(rule?.dependencyClass).toBe('EVALUATED_CLASH_RECURSIVE_SETTLEMENT_DEPENDENCY');
    expect(rule?.sameEvaluatedClashCircularity).toBe(true);
    expect(report.evaluatedClashSelfDependencyMayBeIgnored).toBe(false);
    expect(report.evaluatedClashPersistenceMayFeedSameClashRelativeForceWithoutCyclePolicy).toBe(false);
    expect(report.iterativeFixedPointResolutionAuthorized).toBe(false);
    expect(report.numericConvergenceResolutionAuthorized).toBe(false);
    expect(report.preInteractionSupportStateSubstitutionAuthorized).toBe(false);
  });

  test('keeps arbitrary support-source clash and combination outcomes outside I33/I35 direct reuse', () => {
    const report = buildI73ChallengeCombinationSupportChannelPairLocalClashParticipantSupportSourceSettlementDependencyCircularityMethodologyReview();
    expect(report.otherClashMayReuseI33ArbitrarySupportSourceOutcomeAuthority).toBe(false);
    expect(report.combinationTouchMayReuseI35ArbitrarySupportSourceOutcomeAuthority).toBe(false);
  });

  test('preserves multi-touch dependencies without fixed precedence', () => {
    const report = buildI73ChallengeCombinationSupportChannelPairLocalClashParticipantSupportSourceSettlementDependencyCircularityMethodologyReview();
    const rule = report.dependencyRules.find(
      (candidate) => candidate.topologyState === 'MULTIPLE_TRACKED_RELATION_TOUCHES',
    );
    expect(rule?.dependencyClass).toBe('MULTI_TOUCH_COMPOSITE_SETTLEMENT_DEPENDENCY');
    expect(rule?.crossRelationPrecedenceMayBeRequired).toBe(true);
    expect(report.multiTouchPerRelationDependencyPreservationRequired).toBe(true);
    expect(report.multiTouchFixedPrecedenceAuthorized).toBe(false);
  });

  test('keeps no-touch distinct from effective support and downstream verdicts', () => {
    const report = buildI73ChallengeCombinationSupportChannelPairLocalClashParticipantSupportSourceSettlementDependencyCircularityMethodologyReview();
    expect(report.noTrackedRelationTouchMeansNoTrackedSettlementDependencyOnly).toBe(true);
    expect(report.noTrackedRelationTouchMeansEffectiveSupport).toBe(false);
    expect(report.sourceActivationVerdictAuthorized).toBe(false);
    expect(report.sourcePersistenceVerdictAuthorized).toBe(false);
    expect(report.sourceEffectiveSupportVerdictAuthorized).toBe(false);
    expect(report.relativeForceVerdictAuthorized).toBe(false);
    expect(report.clashWinnerVerdictAuthorized).toBe(false);
    expect(report.rescueEffectAuthorized).toBe(false);
    expect(report.clashSettlementAuthorized).toBe(false);
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
  });

  test('is deterministic', () => {
    const first = buildI73ChallengeCombinationSupportChannelPairLocalClashParticipantSupportSourceSettlementDependencyCircularityMethodologyReview();
    const second = buildI73ChallengeCombinationSupportChannelPairLocalClashParticipantSupportSourceSettlementDependencyCircularityMethodologyReview();
    expect(first.reviewId).toBe(second.reviewId);
  });
});
