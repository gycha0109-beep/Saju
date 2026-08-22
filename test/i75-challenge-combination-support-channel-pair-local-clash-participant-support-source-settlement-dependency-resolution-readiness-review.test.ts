import { describe, expect, test } from 'vitest';
import type {
  ChallengeCombinationSupportChannelPairLocalClashParticipantSupportSourceSettlementDependencyEvidenceReport,
  I74ParticipantSupportSourceSettlementDependencyEvidence,
} from '../src/index.js';
import { buildI75ChallengeCombinationSupportChannelPairLocalClashParticipantSupportSourceSettlementDependencyResolutionReadinessReview } from '../src/research/i75-challenge-combination-support-channel-pair-local-clash-participant-support-source-settlement-dependency-resolution-readiness-review.js';

const EVALUATED_CLASH_ID = 'branch_clash:day:branch:인|hour:branch:신';

function source(
  sourceValue: string,
  dependencyClass: I74ParticipantSupportSourceSettlementDependencyEvidence['dependencyClass'],
  options: {
    sameEvaluatedClashCircularity?: boolean;
    independentRelationSettlementRequired?: boolean;
    crossRelationPrecedenceMayBeRequired?: boolean;
    contestTopologyState?: I74ParticipantSupportSourceSettlementDependencyEvidence['contestTopologyState'];
  } = {},
): I74ParticipantSupportSourceSettlementDependencyEvidence {
  return {
    participantRole: 'TARGET_ROOT_CANDIDATE',
    participantPosition: 'hour',
    participantBranch: '신',
    sourcePillar: 'year',
    sourceComponent: 'branch',
    sourceValue,
    supportSignals: ['ADDITIONAL_SAME_ELEMENT_BRANCH_SUPPORT'],
    contestTopologyState: options.contestTopologyState ?? 'NO_TRACKED_RELATION_TOUCH',
    dependencyClass,
    touchDependencies: [],
    sameEvaluatedClashCircularity: options.sameEvaluatedClashCircularity ?? false,
    independentRelationSettlementRequired: options.independentRelationSettlementRequired ?? false,
    crossRelationPrecedenceMayBeRequired: options.crossRelationPrecedenceMayBeRequired ?? false,
    sourceActive: 'not_determined',
    sourcePersisted: 'not_determined',
    effectiveSupportEffect: 'not_resolved',
    relativeForceVerdict: 'not_determined',
    numericWeight: 'not_assigned',
  };
}

function i74(): ChallengeCombinationSupportChannelPairLocalClashParticipantSupportSourceSettlementDependencyEvidenceReport {
  return {
    reportId: 'i74_i75_fixture',
    evidenceVersion: 'fixture',
    status: 'RESOLVED_SUPPORT_SOURCE_SETTLEMENT_DEPENDENCY_EVIDENCE',
    upstreamI72ReportId: 'i72_fixture',
    upstreamI73ReviewId: 'i73_fixture',
    items: [
      {
        mechanism: 'OUTPUT_LEAKAGE',
        evaluatedClashRelationId: EVALUATED_CLASH_ID,
        participantSupportSources: [
          source(
            '자',
            'NO_TRACKED_RELATION_SETTLEMENT_DEPENDENCY_EFFECT_STILL_UNRESOLVED',
          ),
          source('축', 'EVALUATED_CLASH_RECURSIVE_SETTLEMENT_DEPENDENCY', {
            sameEvaluatedClashCircularity: true,
            contestTopologyState: 'EVALUATED_CLASH_PARTICIPATION',
          }),
          source('인', 'OTHER_CLASH_SETTLEMENT_DEPENDENCY', {
            independentRelationSettlementRequired: true,
            contestTopologyState: 'OTHER_CLASH_TOUCH',
          }),
          source('묘', 'COMBINATION_BINDING_SETTLEMENT_DEPENDENCY', {
            independentRelationSettlementRequired: true,
            contestTopologyState: 'COMBINATION_TOUCH',
          }),
          source('진', 'MULTI_TOUCH_COMPOSITE_SETTLEMENT_DEPENDENCY', {
            sameEvaluatedClashCircularity: true,
            independentRelationSettlementRequired: true,
            crossRelationPrecedenceMayBeRequired: true,
            contestTopologyState: 'MULTIPLE_TRACKED_RELATION_TOUCHES',
          }),
        ],
        anySameEvaluatedClashCircularity: true,
        anyIndependentRelationSettlementDependency: true,
        anyCrossRelationPrecedenceDependency: true,
        sourceActivationVerdictAuthorized: false,
        sourcePersistenceVerdictAuthorized: false,
        sourceEffectiveSupportVerdictAuthorized: false,
        relativeForceVerdict: 'not_determined',
        clashWinnerVerdict: 'not_determined',
        rescueEffectVerdict: 'not_resolved',
        clashSettlementVerdict: 'not_determined',
        targetPostRelationRootState: 'not_determined',
        effectiveMechanismForceVerdict: 'not_determined',
        relationSpecificUsefulnessHarmfulness: 'not_determined',
        numericScore: 'not_assigned',
      },
    ],
    supportSourceSettlementDependencyEvidenceAvailable: true,
    perTouchDependencyEvidenceAvailable: true,
    sameEvaluatedClashCircularityEvidenceAvailable: true,
    iterativeFixedPointResolutionAuthorized: false,
    numericConvergenceResolutionAuthorized: false,
    preInteractionSupportStateSubstitutionAuthorized: false,
    sourceActivationVerdictAuthorized: false,
    sourcePersistenceVerdictAuthorized: false,
    sourceEffectiveSupportVerdictAuthorized: false,
    relativeForceVerdictAuthorized: false,
    clashWinnerVerdictAuthorized: false,
    rescueEffectAuthorized: false,
    clashSettlementAuthorized: false,
    crossRelationPrecedenceAuthorized: false,
    targetPostRelationRootState: 'not_determined',
    effectiveMechanismForceVerdict: 'not_determined',
    relationSpecificUsefulnessHarmfulness: 'not_determined',
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    notes: [],
  };
}

describe('I75 support-source dependency resolution readiness', () => {
  test('separates no-touch, recursive, other-clash, combination, and multi-touch paths', () => {
    const report = buildI75ChallengeCombinationSupportChannelPairLocalClashParticipantSupportSourceSettlementDependencyResolutionReadinessReview(i74());
    expect(report.status).toBe('RESOLVED_DEPENDENCY_RESOLUTION_READINESS');
    expect(report.dependencyResolutionPathsSeparated).toBe(true);
    expect(report.items.map((item) => item.readiness)).toEqual(
      expect.arrayContaining([
        'NO_RELATION_SETTLEMENT_DEPENDENCY_EFFECT_METHODOLOGY_REQUIRED',
        'SAME_RELATION_CYCLE_POLICY_REQUIRED',
        'SUPPORT_SOURCE_SPECIFIC_CLASH_SETTLEMENT_AUTHORITY_REQUIRED',
        'SUPPORT_SOURCE_SPECIFIC_COMBINATION_SETTLEMENT_AUTHORITY_REQUIRED',
        'MULTI_TOUCH_SAME_RELATION_CYCLE_AND_PRECEDENCE_REQUIRED',
      ]),
    );
  });

  test('marks no-touch as relation-settlement independent but not effective-support ready', () => {
    const report = buildI75ChallengeCombinationSupportChannelPairLocalClashParticipantSupportSourceSettlementDependencyResolutionReadinessReview(i74());
    const item = report.items.find((candidate) => candidate.sourceValue === '자');
    expect(item?.relationSettlementDependencyCleared).toBe(true);
    expect(item?.currentAuthoritySufficientForEffectiveSupportResolution).toBe(false);
    expect(item?.sourceActivationOrPersistenceResolved).toBe(false);
    expect(item?.effectiveSupportResolved).toBe(false);
  });

  test('preserves same-relation cycle and precedence requirements for multi-touch sources', () => {
    const report = buildI75ChallengeCombinationSupportChannelPairLocalClashParticipantSupportSourceSettlementDependencyResolutionReadinessReview(i74());
    const item = report.items.find((candidate) => candidate.sourceValue === '진');
    expect(item?.sameRelationCyclePolicyRequired).toBe(true);
    expect(item?.supportSourceSpecificSettlementAuthorityRequired).toBe(true);
    expect(item?.crossRelationPrecedenceRequired).toBe(true);
  });

  test('fails closed when I74 exposes a downstream verdict', () => {
    const evidence = i74();
    const bad = { ...evidence, relativeForceVerdictAuthorized: true as never };
    const report = buildI75ChallengeCombinationSupportChannelPairLocalClashParticipantSupportSourceSettlementDependencyResolutionReadinessReview(bad);
    expect(report.status).toBe('I74_UNRESOLVED_OR_INVALID');
    expect(report.items).toEqual([]);
  });

  test('keeps generic resolution, cycle policy, settlement, effects, scoring, and classification blocked', () => {
    const report = buildI75ChallengeCombinationSupportChannelPairLocalClashParticipantSupportSourceSettlementDependencyResolutionReadinessReview(i74());
    expect(report.genericDependencyResolverAuthorized).toBe(false);
    expect(report.sameRelationCyclePolicyAuthorized).toBe(false);
    expect(report.iterativeFixedPointResolutionAuthorized).toBe(false);
    expect(report.preInteractionSupportStateSubstitutionAuthorized).toBe(false);
    expect(report.arbitrarySupportSourceClashSettlementAuthorized).toBe(false);
    expect(report.arbitrarySupportSourceCombinationSettlementAuthorized).toBe(false);
    expect(report.crossRelationPrecedenceAuthorized).toBe(false);
    expect(report.sourceEffectiveSupportVerdictAuthorized).toBe(false);
    expect(report.relativeForceVerdictAuthorized).toBe(false);
    expect(report.effectiveMechanismForceVerdict).toBe('not_determined');
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
  });

  test('is deterministic', () => {
    const first = buildI75ChallengeCombinationSupportChannelPairLocalClashParticipantSupportSourceSettlementDependencyResolutionReadinessReview(i74());
    const second = buildI75ChallengeCombinationSupportChannelPairLocalClashParticipantSupportSourceSettlementDependencyResolutionReadinessReview(i74());
    expect(first.reviewId).toBe(second.reviewId);
    expect(first.items).toEqual(second.items);
  });
});
