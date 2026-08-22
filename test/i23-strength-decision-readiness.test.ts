import { describe, expect, test } from 'vitest';
import {
  buildI22SupportCompositionFrontier,
  buildI23StrengthDecisionReadiness,
  type ClashRescueRouterReport,
  type PostRelationRootEffectReviewReport,
  type SpecialPatternReviewRouterReport,
} from '../src/index.js';

function specialPattern(
  status: SpecialPatternReviewRouterReport['status'] = 'NO_BASELINE_SPECIAL_SIGNAL',
): SpecialPatternReviewRouterReport {
  return {
    reportId: `special-${status}`,
    routerVersion: 'test',
    status,
    signals:
      status === 'SPECIAL_PATTERN_REVIEW_REQUIRED'
        ? ['DAY_STEM_COMBINATION_CANDIDATE']
        : [],
    sourceIds: [],
    routingCoverage: 'baseline_follow_transform_three_combination_signals',
    finalSpecialPatternClassificationAuthorized: false,
    ordinaryStrengthClassificationAuthorized: false,
    numericScoringAuthorized: false,
    notes: [],
  };
}

function postRelation(
  unresolved = false,
  inputIndeterminate = false,
): PostRelationRootEffectReviewReport {
  return {
    reviewId: `post-root-${unresolved}-${inputIndeterminate}`,
    reviewVersion: 'test',
    upstreamReviewId: 'root-upstream',
    upstreamStatus: inputIndeterminate ? 'SCENARIO_REVIEW_REQUIRED' : 'RESOLVED_BASIS_ROUTED',
    terminalDecision: inputIndeterminate
      ? 'INPUT_INDETERMINATE'
      : 'ROOT_EFFECT_RESOLUTION_BLOCKED_BY_PRECLASSIFICATION_DEPENDENCIES',
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

function clashRescue(withCandidate = false, inputIndeterminate = false): ClashRescueRouterReport {
  return {
    reportId: `rescue-${withCandidate}-${inputIndeterminate}`,
    reportVersion: 'test',
    status: inputIndeterminate ? 'INPUT_INDETERMINATE' : 'RESOLVED_RESCUE_ROUTING',
    rootRelationReviewId: 'root-upstream',
    candidates: withCandidate
      ? [
          {
            clashRelationId: 'clash-1',
            rescueRelationId: 'rescue-1',
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

describe('I23 non-numeric strength decision readiness graph', () => {
  test('ordinary-looking resolved inputs still stop at methodology blockers instead of emitting strong/weak', () => {
    const frontier = buildI22SupportCompositionFrontier([
      { evidenceId: 'root-1', evidenceClass: 'strong_birth_lu_wang_candidate' },
    ]);
    const report = buildI23StrengthDecisionReadiness({
      specialPattern: specialPattern(),
      postRelationRoot: postRelation(),
      supportFrontier: frontier,
      clashRescue: clashRescue(),
    });

    expect(report.status).toBe('METHODOLOGY_BLOCKED');
    expect(report.terminalDecision).toBe('STOP_FOR_METHODOLOGY_REVIEW');
    expect(report.blockers).toEqual([
      'SUPPORT_EFFECT_VERDICT_UNRESOLVED',
      'CHALLENGE_EFFECT_COMPOSITION_MISSING',
      'CLASSIFIER_POLICY_NOT_AUTHORIZED',
    ]);
    expect(report.strongWeakVerdict).toBe('not_emitted');
    expect(report.ordinaryStrengthClassificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
  });

  test('special-pattern signals route before ordinary strength methodology', () => {
    const report = buildI23StrengthDecisionReadiness({
      specialPattern: specialPattern('SPECIAL_PATTERN_REVIEW_REQUIRED'),
      postRelationRoot: postRelation(),
      supportFrontier: buildI22SupportCompositionFrontier([]),
      clashRescue: clashRescue(),
    });

    expect(report.status).toBe('SPECIAL_PATTERN_REVIEW_REQUIRED');
    expect(report.terminalDecision).toBe('ROUTE_SPECIAL_PATTERN_REVIEW');
    expect(report.blockers).toContain('SPECIAL_PATTERN_REVIEW_UNRESOLVED');
    expect(report.strongWeakVerdict).toBe('not_emitted');
  });

  test('unresolved scenarios or inputs have the highest stop priority', () => {
    const report = buildI23StrengthDecisionReadiness({
      specialPattern: specialPattern('INDETERMINATE_SCENARIO'),
      postRelationRoot: postRelation(false, true),
      supportFrontier: buildI22SupportCompositionFrontier([]),
      clashRescue: clashRescue(false, true),
    });

    expect(report.status).toBe('INPUT_INDETERMINATE');
    expect(report.terminalDecision).toBe('STOP_WITH_INDETERMINATE');
    expect(report.blockers[0]).toBe('INPUT_OR_SCENARIO_INDETERMINATE');
  });

  test('preserves independent blockers instead of collapsing them into a score or single winner', () => {
    const frontier = buildI22SupportCompositionFrontier([
      { evidenceId: 'strong-root', evidenceClass: 'strong_birth_lu_wang_candidate' },
      { evidenceId: 'resource-visible', evidenceClass: 'visible_resource_support' },
      { evidenceId: 'earth-root', evidenceClass: 'earth_root_class_unresolved' },
      { evidenceId: 'post-root', evidenceClass: 'post_relation_root_state' },
    ]);
    const report = buildI23StrengthDecisionReadiness({
      specialPattern: specialPattern(),
      postRelationRoot: postRelation(true),
      supportFrontier: frontier,
      clashRescue: clashRescue(true),
    });

    expect(report.blockers).toEqual(
      expect.arrayContaining([
        'POST_RELATION_ROOT_EFFECT_UNRESOLVED',
        'SUPPORT_FRONTIER_INCOMPARABLE',
        'RESOURCE_SUPPORT_EFFECT_UNRESOLVED',
        'EARTH_ROOT_CLASS_UNRESOLVED',
        'POST_RELATION_ROOT_PRECEDENCE_UNRESOLVED',
        'RESCUE_EFFECT_UNRESOLVED',
        'SUPPORT_EFFECT_VERDICT_UNRESOLVED',
        'CHALLENGE_EFFECT_COMPOSITION_MISSING',
        'CLASSIFIER_POLICY_NOT_AUTHORIZED',
      ]),
    );
    expect(report.strongWeakVerdict).toBe('not_emitted');
  });

  test('report identity is deterministic for identical upstream evidence', () => {
    const input = {
      specialPattern: specialPattern(),
      postRelationRoot: postRelation(),
      supportFrontier: buildI22SupportCompositionFrontier([
        { evidenceId: 'peer', evidenceClass: 'visible_peer_support' as const },
      ]),
      clashRescue: clashRescue(),
    };

    expect(buildI23StrengthDecisionReadiness(input).reportId).toBe(
      buildI23StrengthDecisionReadiness(input).reportId,
    );
  });
});
