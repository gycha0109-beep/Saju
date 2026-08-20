import { describe, expect, test } from 'vitest';
import {
  buildI22SupportCompositionFrontier,
  buildI23StrengthDecisionReadinessV2,
  buildI24ChallengeMechanismComposition,
  type ClashRescueRouterReport,
  type PostRelationRootEffectReviewReport,
  type SpecialPatternReviewRouterReport,
} from '../src/index.js';

function specialPattern(
  status: SpecialPatternReviewRouterReport['status'] = 'NO_BASELINE_SPECIAL_SIGNAL',
): SpecialPatternReviewRouterReport {
  return {
    reportId: `special-v2-${status}`,
    routerVersion: 'test',
    status,
    signals:
      status === 'SPECIAL_PATTERN_REVIEW_REQUIRED'
        ? ['FOLLOW_STYLE_NO_SUPPORT_CANDIDATE']
        : [],
    sourceIds: [],
    routingCoverage: 'baseline_follow_transform_three_combination_signals',
    finalSpecialPatternClassificationAuthorized: false,
    ordinaryStrengthClassificationAuthorized: false,
    numericScoringAuthorized: false,
    notes: [],
  };
}

function postRelation(unresolved = false): PostRelationRootEffectReviewReport {
  return {
    reviewId: `post-root-v2-${unresolved}`,
    reviewVersion: 'test',
    upstreamReviewId: 'root-upstream-v2',
    upstreamStatus: 'RESOLVED_BASIS_ROUTED',
    terminalDecision: 'ROOT_EFFECT_RESOLUTION_BLOCKED_BY_PRECLASSIFICATION_DEPENDENCIES',
    items: unresolved
      ? [
          {
            position: 'year',
            branch: '묘',
            state: 'UNRESOLVED_CLASH_RELATIVE_FORCE',
            requirements: ['CLASH_EFFECT_REVIEW_REQUIRED'],
            dependencies: ['RELATIVE_BRANCH_FORCE'],
            effectiveRootState: 'not_determined',
            finalEffectAuthorized: false,
            numericWeight: 'not_assigned',
          },
        ]
      : [],
    preClassificationDependencyRequired: unresolved,
    circularityRiskDetected: unresolved,
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    sourceBasis: [],
    notes: [],
  };
}

function clashRescue(withCandidate = false): ClashRescueRouterReport {
  return {
    reportId: `rescue-v2-${withCandidate}`,
    reportVersion: 'test',
    status: 'RESOLVED_RESCUE_ROUTING',
    rootRelationReviewId: 'root-upstream-v2',
    candidates: withCandidate
      ? [
          {
            clashRelationId: 'clash-v2',
            rescueRelationId: 'rescue-v2',
            rescueKind: 'SIX_COMBINATION_RESCUE_CANDIDATE',
            sharedClashParticipantPositions: ['year'],
            rescueStrength: 'not_evaluated',
            rescueEffect: 'not_resolved',
            clashSettlement: 'not_determined',
            relativeForceVerdict: 'not_determined',
            rootEffectVerdict: 'not_determined',
            numericScore: 'not_assigned',
          },
        ]
      : [],
    rescueEffectAuthorized: false,
    clashSettlementAuthorized: false,
    relativeForceVerdictAuthorized: false,
    rootEffectResolutionAuthorized: false,
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    sourceBasis: [],
    notes: [],
  };
}

describe('I23 v2 challenge-aware readiness graph', () => {
  test('replaces missing challenge composition with unresolved challenge-effect verdict', () => {
    const report = buildI23StrengthDecisionReadinessV2({
      specialPattern: specialPattern(),
      postRelationRoot: postRelation(),
      supportFrontier: buildI22SupportCompositionFrontier([
        { evidenceId: 'root', evidenceClass: 'strong_birth_lu_wang_candidate' },
      ]),
      clashRescue: clashRescue(),
      challengeComposition: buildI24ChallengeMechanismComposition([
        { evidenceId: 'output', relation: 'output' },
      ]),
    });

    expect(report.blockers).not.toContain('CHALLENGE_EFFECT_COMPOSITION_MISSING');
    expect(report.blockers).toContain('CHALLENGE_EFFECT_VERDICT_UNRESOLVED');
    expect(report.challengeCompositionState.mechanismCompositionPresent).toBe(true);
    expect(report.strongWeakVerdict).toBe('not_emitted');
  });

  test('mixed challenge mechanisms preserve a separate precedence blocker', () => {
    const report = buildI23StrengthDecisionReadinessV2({
      specialPattern: specialPattern(),
      postRelationRoot: postRelation(),
      supportFrontier: buildI22SupportCompositionFrontier([]),
      clashRescue: clashRescue(),
      challengeComposition: buildI24ChallengeMechanismComposition([
        { evidenceId: 'output', relation: 'output' },
        { evidenceId: 'officer', relation: 'officer' },
      ]),
    });

    expect(report.challengeCompositionState.mixedMechanismsPresent).toBe(true);
    expect(report.blockers).toContain('CHALLENGE_EFFECT_VERDICT_UNRESOLVED');
    expect(report.blockers).toContain('CHALLENGE_MECHANISM_PRECEDENCE_UNRESOLVED');
    expect(report.challengeCompositionState.crossMechanismPrecedenceAuthorized).toBe(false);
  });

  test('single challenge mechanism does not invent a cross-mechanism precedence blocker', () => {
    const report = buildI23StrengthDecisionReadinessV2({
      specialPattern: specialPattern(),
      postRelationRoot: postRelation(),
      supportFrontier: buildI22SupportCompositionFrontier([]),
      clashRescue: clashRescue(),
      challengeComposition: buildI24ChallengeMechanismComposition([
        { evidenceId: 'wealth', relation: 'wealth' },
      ]),
    });

    expect(report.blockers).toContain('CHALLENGE_EFFECT_VERDICT_UNRESOLVED');
    expect(report.blockers).not.toContain('CHALLENGE_MECHANISM_PRECEDENCE_UNRESOLVED');
  });

  test('existing special-pattern and relation blockers remain preserved', () => {
    const report = buildI23StrengthDecisionReadinessV2({
      specialPattern: specialPattern('SPECIAL_PATTERN_REVIEW_REQUIRED'),
      postRelationRoot: postRelation(true),
      supportFrontier: buildI22SupportCompositionFrontier([
        { evidenceId: 'resource', evidenceClass: 'visible_resource_support' },
      ]),
      clashRescue: clashRescue(true),
      challengeComposition: buildI24ChallengeMechanismComposition([
        { evidenceId: 'output', relation: 'output' },
        { evidenceId: 'wealth', relation: 'wealth' },
      ]),
    });

    expect(report.status).toBe('SPECIAL_PATTERN_REVIEW_REQUIRED');
    expect(report.terminalDecision).toBe('ROUTE_SPECIAL_PATTERN_REVIEW');
    expect(report.blockers).toEqual(
      expect.arrayContaining([
        'SPECIAL_PATTERN_REVIEW_UNRESOLVED',
        'POST_RELATION_ROOT_EFFECT_UNRESOLVED',
        'RESOURCE_SUPPORT_EFFECT_UNRESOLVED',
        'RESCUE_EFFECT_UNRESOLVED',
        'CHALLENGE_EFFECT_VERDICT_UNRESOLVED',
        'CHALLENGE_MECHANISM_PRECEDENCE_UNRESOLVED',
        'CLASSIFIER_POLICY_NOT_AUTHORIZED',
      ]),
    );
    expect(report.ordinaryStrengthClassificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
  });

  test('report identity is deterministic for identical evidence', () => {
    const input = {
      specialPattern: specialPattern(),
      postRelationRoot: postRelation(),
      supportFrontier: buildI22SupportCompositionFrontier([]),
      clashRescue: clashRescue(),
      challengeComposition: buildI24ChallengeMechanismComposition([
        { evidenceId: 'officer', relation: 'officer' as const },
      ]),
    };

    expect(buildI23StrengthDecisionReadinessV2(input).reportId).toBe(
      buildI23StrengthDecisionReadinessV2(input).reportId,
    );
  });
});
