import { describe, expect, test } from 'vitest';
import { buildI30ChallengeTargetPostRelationRootStateMethodologyReview } from '../src/index.js';

describe('I30 challenge target post-relation root-state methodology review', () => {
  test('requires a challenge-specific review instead of direct I19 reuse', () => {
    const report = buildI30ChallengeTargetPostRelationRootStateMethodologyReview();

    expect(report.decision).toBe('CHALLENGE_SPECIFIC_POST_RELATION_REVIEW_REQUIRED');
    expect(report.i19DirectReuseAuthorized).toBe(false);
    expect(report.challengeSpecificRelationRoutingImplementationAuthorized).toBe(true);
  });

  test('routes clash conditionally and never treats relation presence as a final root effect', () => {
    const report = buildI30ChallengeTargetPostRelationRootStateMethodologyReview();
    const clash = report.relationAudit.find(
      (item) => item.capability === 'ROOT_CANDIDATE_BRANCH_CLASH_PARTICIPATION',
    );

    expect(report.branchClashConditionalSemanticsReusable).toBe(true);
    expect(clash?.disposition).toBe('ADAPT_UNDER_CHALLENGE_NAMESPACE');
    expect(clash?.dependencies).toEqual(
      expect.arrayContaining([
        'RELATIVE_BRANCH_FORCE',
        'SEASONAL_COMMAND_CONTEXT',
        'EXTERNAL_SUPPORT_RESCUE',
      ]),
    );
    expect(report.targetPostRelationRootState).toBe('not_determined');
  });

  test('routes stem and branch combinations without authorizing transformation', () => {
    const report = buildI30ChallengeTargetPostRelationRootStateMethodologyReview();
    const stem = report.relationAudit.find(
      (item) => item.capability === 'VISIBLE_TARGET_STEM_FIVE_COMBINATION_PARTICIPATION',
    );
    const six = report.relationAudit.find(
      (item) => item.capability === 'ROOT_CANDIDATE_BRANCH_SIX_COMBINATION_PARTICIPATION',
    );
    const three = report.relationAudit.find(
      (item) => item.capability === 'ROOT_CANDIDATE_BRANCH_THREE_COMBINATION_PARTICIPATION',
    );

    expect(report.stemCombinationPresenceDeterminesTransformation).toBe(false);
    expect(report.branchCombinationPresenceDeterminesEffect).toBe(false);
    expect(stem?.dependencies).toContain('COMBINATION_TRANSFORMATION_CONDITIONS');
    expect(six?.dependencies).toContain('COMPETING_RELATION_PRECEDENCE');
    expect(three?.dependencies).toContain('COMPETING_RELATION_PRECEDENCE');
  });

  test('keeps no-relation, hidden-only, earth, and untracked relation families fail-closed', () => {
    const report = buildI30ChallengeTargetPostRelationRootStateMethodologyReview();

    expect(report.noTrackedRelationCandidateMeansPreserved).toBe(false);
    expect(report.hiddenOnlyTargetPostRelationRootStateAuthorized).toBe(false);
    expect(report.earthRootConventionResolved).toBe(false);
    expect(report.untrackedRelationEffectsAuthorized).toBe(false);
    expect(report.explicitlyUntrackedRelationFamilies).toEqual([
      'branch_punishment',
      'branch_harm',
      'branch_break',
    ]);
  });

  test('preserves downstream guards and deterministic identity', () => {
    const report = buildI30ChallengeTargetPostRelationRootStateMethodologyReview();
    const repeated = buildI30ChallengeTargetPostRelationRootStateMethodologyReview();

    expect(report.targetIntrinsicRootQualityVerdict).toBe('not_determined');
    expect(report.effectiveMechanismForceVerdict).toBe('not_determined');
    expect(report.relationSpecificUsefulnessHarmfulness).toBe('not_determined');
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
    expect(report.requiredNextImplementationGuards).toEqual(
      expect.arrayContaining([
        expect.stringContaining('visible target-stem positions'),
        expect.stringContaining('root-candidate branch positions'),
        expect.stringContaining('punishment, harm, or break'),
      ]),
    );
    expect(report.reviewId).toBe(repeated.reviewId);
  });
});
