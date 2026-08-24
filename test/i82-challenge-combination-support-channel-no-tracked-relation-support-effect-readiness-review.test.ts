import { describe, expect, test } from 'vitest';
import type {
  ChallengeCombinationSupportChannelPairLocalClashParticipantSupportSourceSettlementDependencyResolutionReadinessReviewReport,
  ChallengeCombinationSupportChannelActivationPersistenceMethodologyReviewReport,
  ChallengeCombinationSupportInterferenceEffectMethodologyReviewReport,
} from '../src/index.js';
import { buildI51ChallengeCombinationSupportInterferenceEffectMethodologyReview } from '../src/research/i51-challenge-combination-support-interference-effect-methodology-review.js';
import { buildI53ChallengeCombinationSupportChannelActivationPersistenceMethodologyReview } from '../src/research/i53-challenge-combination-support-channel-activation-persistence-methodology-review.js';
import { buildI82ChallengeCombinationSupportChannelNoTrackedRelationSupportEffectReadinessReview } from '../src/research/i82-challenge-combination-support-channel-no-tracked-relation-support-effect-readiness-review.js';

function readinessItem(
  readiness:
    | 'NO_RELATION_SETTLEMENT_DEPENDENCY_EFFECT_METHODOLOGY_REQUIRED'
    | 'SAME_RELATION_CYCLE_POLICY_REQUIRED',
  sourceValue: string,
) {
  const cleared = readiness === 'NO_RELATION_SETTLEMENT_DEPENDENCY_EFFECT_METHODOLOGY_REQUIRED';
  return {
    mechanism: 'OUTPUT_LEAKAGE',
    evaluatedClashRelationId: 'branch_clash:year:branch:자|month:branch:오',
    participantRole: 'FIRST_CLASH_PARTICIPANT',
    participantPosition: 'year',
    participantBranch: '자',
    sourcePillar: 'day',
    sourceComponent: 'branch',
    sourceValue,
    dependencyClass: cleared
      ? 'NO_TRACKED_RELATION_SETTLEMENT_DEPENDENCY_EFFECT_STILL_UNRESOLVED'
      : 'EVALUATED_CLASH_RECURSIVE_SETTLEMENT_DEPENDENCY',
    readiness,
    relationSettlementDependencyCleared: cleared,
    sameRelationCyclePolicyRequired: !cleared,
    supportSourceSpecificSettlementAuthorityRequired: false,
    crossRelationPrecedenceRequired: false,
    currentAuthoritySufficientForEffectiveSupportResolution: false,
    sourceActivationOrPersistenceResolved: false,
    effectiveSupportResolved: false,
    relativeForceVerdict: 'not_determined',
    numericWeight: 'not_assigned',
  };
}

function i75(): ChallengeCombinationSupportChannelPairLocalClashParticipantSupportSourceSettlementDependencyResolutionReadinessReviewReport {
  return {
    reviewId: 'i75_i82_fixture',
    reviewVersion: 'fixture',
    status: 'RESOLVED_DEPENDENCY_RESOLUTION_READINESS',
    decision: 'DEPENDENCY_RESOLUTION_PATHS_SEPARATED_NO_GENERIC_RESOLVER_AUTHORIZED',
    upstreamI74ReportId: 'i74',
    items: [
      readinessItem('NO_RELATION_SETTLEMENT_DEPENDENCY_EFFECT_METHODOLOGY_REQUIRED', '해'),
      readinessItem('SAME_RELATION_CYCLE_POLICY_REQUIRED', '자'),
    ],
    dependencyResolutionPathsSeparated: true,
    relationSettlementIndependentPathObserved: true,
    sameRelationCyclePathObserved: true,
    supportSourceSpecificSettlementPathObserved: false,
    multiTouchPrecedencePathObserved: false,
    genericDependencyResolverAuthorized: false,
    sameRelationCyclePolicyAuthorized: false,
    iterativeFixedPointResolutionAuthorized: false,
    numericConvergenceResolutionAuthorized: false,
    preInteractionSupportStateSubstitutionAuthorized: false,
    arbitrarySupportSourceClashSettlementAuthorized: false,
    arbitrarySupportSourceCombinationSettlementAuthorized: false,
    crossRelationPrecedenceAuthorized: false,
    sourceActivationVerdictAuthorized: false,
    sourcePersistenceVerdictAuthorized: false,
    sourceEffectiveSupportVerdictAuthorized: false,
    relativeForceVerdictAuthorized: false,
    clashWinnerVerdictAuthorized: false,
    rescueEffectAuthorized: false,
    clashSettlementAuthorized: false,
    targetPostRelationRootState: 'not_determined',
    effectiveMechanismForceVerdict: 'not_determined',
    relationSpecificUsefulnessHarmfulness: 'not_determined',
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    recommendedNextGate: 'NO_TRACKED_RELATION_SUPPORT_EFFECT_READINESS_REVIEW',
    notes: [],
  } as unknown as ChallengeCombinationSupportChannelPairLocalClashParticipantSupportSourceSettlementDependencyResolutionReadinessReviewReport;
}

describe('I82 no-tracked-relation support effect readiness', () => {
  test('preserves the no-touch path as relation-settlement independent but effect-authority insufficient', () => {
    const report = buildI82ChallengeCombinationSupportChannelNoTrackedRelationSupportEffectReadinessReview(i75());
    const item = report.items.find((candidate) => candidate.sourceValue === '해');
    expect(report.status).toBe('RESOLVED_NO_TRACKED_RELATION_SUPPORT_EFFECT_READINESS');
    expect(item?.readiness).toBe('RELATION_SETTLEMENT_DEPENDENCY_CLEARED_EFFECT_AUTHORITY_INSUFFICIENT');
    expect(item?.relationSettlementDependencyCleared).toBe(true);
    expect(item?.trackedDirectContestAbsent).toBe(true);
  });

  test('does not apply the no-touch effect path when a same-relation cycle dependency remains', () => {
    const report = buildI82ChallengeCombinationSupportChannelNoTrackedRelationSupportEffectReadinessReview(i75());
    const item = report.items.find((candidate) => candidate.sourceValue === '자');
    expect(item?.readiness).toBe('NOT_APPLICABLE_RELATION_SETTLEMENT_DEPENDENCY_REMAINS');
    expect(item?.relationSettlementDependencyCleared).toBe(false);
  });

  test('does not convert absence of tracked contest into active, persistent, or effective support', () => {
    const report = buildI82ChallengeCombinationSupportChannelNoTrackedRelationSupportEffectReadinessReview(i75());
    const item = report.items.find((candidate) => candidate.sourceValue === '해');
    expect(report.noTrackedRelationTouchMeansActivated).toBe(false);
    expect(report.noTrackedRelationTouchMeansPersistent).toBe(false);
    expect(report.noTrackedRelationTouchMeansEffectiveSupport).toBe(false);
    expect(item?.sourceActive).toBe('not_determined');
    expect(item?.sourcePersisted).toBe('not_determined');
    expect(item?.effectiveSupportEffect).toBe('not_resolved');
  });

  test('fails closed when I75 attempts to authorize effective support resolution', () => {
    const invalid = {
      ...i75(),
      sourceEffectiveSupportVerdictAuthorized: true,
    } as unknown as ChallengeCombinationSupportChannelPairLocalClashParticipantSupportSourceSettlementDependencyResolutionReadinessReviewReport;
    const report = buildI82ChallengeCombinationSupportChannelNoTrackedRelationSupportEffectReadinessReview(invalid);
    expect(report.status).toBe('I75_UNRESOLVED_OR_INVALID');
    expect(report.items).toEqual([]);
  });

  test('requires canonical I51 support-direction methodology', () => {
    const canonical = buildI51ChallengeCombinationSupportInterferenceEffectMethodologyReview();
    const invalid = {
      ...canonical,
      reviewId: 'stale_i51',
    } as ChallengeCombinationSupportInterferenceEffectMethodologyReviewReport;
    const report = buildI82ChallengeCombinationSupportChannelNoTrackedRelationSupportEffectReadinessReview(
      i75(),
      invalid,
    );
    expect(report.status).toBe('I51_METHODOLOGY_NOT_CANONICAL');
  });

  test('requires canonical I53 contest-topology methodology', () => {
    const canonical = buildI53ChallengeCombinationSupportChannelActivationPersistenceMethodologyReview();
    const invalid = {
      ...canonical,
      reviewId: 'stale_i53',
    } as ChallengeCombinationSupportChannelActivationPersistenceMethodologyReviewReport;
    const report = buildI82ChallengeCombinationSupportChannelNoTrackedRelationSupportEffectReadinessReview(
      i75(),
      buildI51ChallengeCombinationSupportInterferenceEffectMethodologyReview(),
      invalid,
    );
    expect(report.status).toBe('I53_METHODOLOGY_NOT_CANONICAL');
  });

  test('is deterministic and keeps relative force, scoring, classification, and precedence blocked', () => {
    const first = buildI82ChallengeCombinationSupportChannelNoTrackedRelationSupportEffectReadinessReview(i75());
    const second = buildI82ChallengeCombinationSupportChannelNoTrackedRelationSupportEffectReadinessReview(i75());
    expect(first.reviewId).toBe(second.reviewId);
    expect(first.effectiveSupportToRelativeForceAuthorized).toBe(false);
    expect(first.relativeForceVerdictAuthorized).toBe(false);
    expect(first.crossRelationPrecedenceAuthorized).toBe(false);
    expect(first.classificationAuthorized).toBe(false);
    expect(first.numericScoringAuthorized).toBe(false);
    expect(first.authorityGap).toBe('UNIVERSAL_UNTOUCHED_SUPPORT_ACTIVATION_PERSISTENCE_EFFECT_RULE_NOT_ESTABLISHED');
  });
});
