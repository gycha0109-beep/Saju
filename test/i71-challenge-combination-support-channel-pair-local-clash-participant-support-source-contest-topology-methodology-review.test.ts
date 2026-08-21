import { describe, expect, test } from 'vitest';
import { buildI71ChallengeCombinationSupportChannelPairLocalClashParticipantSupportSourceContestTopologyMethodologyReview } from '../src/research/i71-challenge-combination-support-channel-pair-local-clash-participant-support-source-contest-topology-methodology-review.js';

describe('I71 pair-local clash participant support-source contest topology methodology', () => {
  test('authorizes exact source identity and topology only', () => {
    const report = buildI71ChallengeCombinationSupportChannelPairLocalClashParticipantSupportSourceContestTopologyMethodologyReview();
    expect(report.decision).toBe(
      'EXACT_SUPPORT_SOURCE_IDENTITY_AND_CONTEST_TOPOLOGY_AUTHORIZED_EFFECT_VERDICTS_BLOCKED',
    );
    expect(report.resolvedPillarsRequiredForSourceValueMaterialization).toBe(true);
    expect(report.structuralRelationGraphIndependentRecomputationAuthorized).toBe(true);
    expect(report.authoritativeRelationIdKindPairEmissionAuthorized).toBe(true);
    expect(report.sourceIdentityMayBeInferredFromSignalLabelAlone).toBe(false);
  });

  test('maps visible support to stems and branch support to branches', () => {
    const report = buildI71ChallengeCombinationSupportChannelPairLocalClashParticipantSupportSourceContestTopologyMethodologyReview();
    const mapping = new Map(report.supportSignalSourceMappings.map((item) => [item.signal, item.sourceComponent]));
    expect(mapping.get('SAME_PILLAR_VISIBLE_SAME_ELEMENT_SUPPORT')).toBe('stem');
    expect(mapping.get('EXTERNAL_VISIBLE_SAME_ELEMENT_SUPPORT')).toBe('stem');
    expect(mapping.get('VISIBLE_RESOURCE_SUPPORT')).toBe('stem');
    expect(mapping.get('ADDITIONAL_SAME_ELEMENT_BRANCH_SUPPORT')).toBe('branch');
    expect(mapping.get('RESOURCE_BRANCH_SUPPORT')).toBe('branch');
  });

  test('distinguishes evaluated clash, other clash, combination, untouched, and multi-touch topology', () => {
    const report = buildI71ChallengeCombinationSupportChannelPairLocalClashParticipantSupportSourceContestTopologyMethodologyReview();
    expect(report.topologyRules.map((item) => item.state)).toEqual([
      'NO_TRACKED_RELATION_TOUCH',
      'EVALUATED_CLASH_PARTICIPATION',
      'OTHER_CLASH_TOUCH',
      'COMBINATION_TOUCH',
      'MULTIPLE_TRACKED_RELATION_TOUCHES',
    ]);
  });

  test('does not promote topology to activation, persistence, destruction, or neutralization', () => {
    const report = buildI71ChallengeCombinationSupportChannelPairLocalClashParticipantSupportSourceContestTopologyMethodologyReview();
    expect(report.noTrackedRelationTouchMeansActive).toBe(false);
    expect(report.noTrackedRelationTouchMeansPersistent).toBe(false);
    expect(report.evaluatedClashParticipationMeansDestroyed).toBe(false);
    expect(report.otherClashTouchMeansDestroyed).toBe(false);
    expect(report.combinationTouchMeansNeutralized).toBe(false);
    expect(report.multiTouchFixedPrecedenceAuthorized).toBe(false);
  });

  test('keeps all effect and downstream verdicts blocked', () => {
    const report = buildI71ChallengeCombinationSupportChannelPairLocalClashParticipantSupportSourceContestTopologyMethodologyReview();
    expect(report.sourceActivationVerdictAuthorized).toBe(false);
    expect(report.sourcePersistenceVerdictAuthorized).toBe(false);
    expect(report.sourceEffectiveSupportVerdictAuthorized).toBe(false);
    expect(report.relativeForceVerdictAuthorized).toBe(false);
    expect(report.clashWinnerVerdictAuthorized).toBe(false);
    expect(report.rescueEffectAuthorized).toBe(false);
    expect(report.clashSettlementAuthorized).toBe(false);
    expect(report.crossRelationPrecedenceAuthorized).toBe(false);
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
  });

  test('is deterministic and prohibits magnitude inference', () => {
    const first = buildI71ChallengeCombinationSupportChannelPairLocalClashParticipantSupportSourceContestTopologyMethodologyReview();
    const second = buildI71ChallengeCombinationSupportChannelPairLocalClashParticipantSupportSourceContestTopologyMethodologyReview();
    expect(first.reviewId).toBe(second.reviewId);
    expect(first.relationTouchCountMagnitudeInferenceAuthorized).toBe(false);
    expect(first.supportSourceCountMagnitudeInferenceAuthorized).toBe(false);
    expect(first.supportCategoryFixedPrecedenceAuthorized).toBe(false);
  });
});
