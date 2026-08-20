import { describe, expect, test } from 'vitest';
import { buildI34ChallengeTargetCombinationDependencyMethodologyReview } from '../src/index.js';

describe('I34 challenge target combination dependency methodology review', () => {
  test('authorizes structural combination dependency adaptation without transformation verdicts', () => {
    const report = buildI34ChallengeTargetCombinationDependencyMethodologyReview();

    expect(report.decision).toBe('CHALLENGE_SPECIFIC_COMBINATION_DEPENDENCY_ADAPTER_REQUIRED');
    expect(report.i31CombinationParticipationReuseAuthorized).toBe(true);
    expect(report.structuralRelationParticipantReuseAuthorized).toBe(true);
    expect(report.challengeSpecificCombinationDependencyEvidenceImplementationAuthorized).toBe(true);
    expect(report.combinationEffectVerdictAuthorized).toBe(false);
  });

  test('keeps stem, six-combination, and three-combination structural presence distinct from transformation', () => {
    const report = buildI34ChallengeTargetCombinationDependencyMethodologyReview();

    expect(report.stemCombinationPresenceDeterminesTransformation).toBe(false);
    expect(report.branchSixCombinationPresenceDeterminesTransformation).toBe(false);
    expect(report.branchThreeCombinationStructuralCompletionDeterminesTransformation).toBe(false);
    expect(report.transformationTargetElementEmissionAuthorized).toBe(false);
    expect(report.directSanmingDayStemTransformationContractReuseAuthorized).toBe(false);
  });

  test('allows seasonal, positional support, and competing-relation topology only as dependency context', () => {
    const report = buildI34ChallengeTargetCombinationDependencyMethodologyReview();

    expect(report.seasonalCommandContextReuseAuthorized).toBe(true);
    expect(report.positionalSameElementResourceContextReuseAuthorized).toBe(true);
    expect(report.competingRelationTopologyReuseAuthorized).toBe(true);
    expect(report.completeSupportInterferenceModelAvailable).toBe(false);
    expect(
      report.reuseAudit.find((item) => item.capability === 'COMPETING_RELATION_TOPOLOGY')?.disposition,
    ).toBe('ADAPT_UNDER_CHALLENGE_NAMESPACE');
  });

  test('keeps transformation products, hidden-only root effects, and earth root effects blocked', () => {
    const report = buildI34ChallengeTargetCombinationDependencyMethodologyReview();

    expect(
      report.reuseAudit.find((item) => item.capability === 'STEM_COMBINATION_TRANSFORMATION_TARGET_ELEMENT')?.disposition,
    ).toBe('DO_NOT_EMIT_FROM_CURRENT_METHODOLOGY');
    expect(
      report.reuseAudit.find((item) => item.capability === 'BRANCH_COMBINATION_TRANSFORMATION_TARGET_ELEMENT')?.disposition,
    ).toBe('DO_NOT_EMIT_FROM_CURRENT_METHODOLOGY');
    expect(report.hiddenOnlyTargetCombinationRootEffectAuthorized).toBe(false);
    expect(report.earthTargetCombinationRootEffectAuthorized).toBe(false);
  });

  test('preserves all downstream guards and deterministic review identity', () => {
    const report = buildI34ChallengeTargetCombinationDependencyMethodologyReview();
    const repeated = buildI34ChallengeTargetCombinationDependencyMethodologyReview();

    expect(report.targetPostRelationRootState).toBe('not_determined');
    expect(report.effectiveMechanismForceVerdict).toBe('not_determined');
    expect(report.relationSpecificUsefulnessHarmfulness).toBe('not_determined');
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
    expect(report.requiredNextImplementationGuards).toEqual(
      expect.arrayContaining([
        expect.stringContaining('same resolved pillar and I29 identity'),
        expect.stringContaining('transformation target elements'),
        expect.stringContaining('three-combination'),
      ]),
    );
    expect(report.reviewId).toBe(repeated.reviewId);
  });
});
