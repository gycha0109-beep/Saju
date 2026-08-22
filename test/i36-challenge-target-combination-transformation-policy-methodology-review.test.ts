import { describe, expect, test } from 'vitest';
import {
  buildI36ChallengeTargetCombinationTransformationPolicyMethodologyReview,
} from '../src/index.js';

describe('I36 challenge target combination transformation policy methodology review', () => {
  test('allows traditional stem-pair mappings only as day-stem-scoped references', () => {
    const report = buildI36ChallengeTargetCombinationTransformationPolicyMethodologyReview();

    expect(report.decision).toBe('REFERENCE_MAPPINGS_ONLY_TRANSFORMATION_STATE_BLOCKED');
    expect(report.stemPairTraditionalReferenceEmissionAuthorized).toBe(true);
    expect(report.stemPairReferenceDirectChallengeTransformationUseAuthorized).toBe(false);
    expect(report.stemTransformationDayStemScopeExplicit).toBe(true);
    expect(report.stemReferences).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ pair: ['갑', '기'], traditionalElement: '토' }),
        expect.objectContaining({ pair: ['을', '경'], traditionalElement: '금' }),
        expect.objectContaining({ pair: ['병', '신'], traditionalElement: '수' }),
        expect.objectContaining({ pair: ['정', '임'], traditionalElement: '목' }),
        expect.objectContaining({ pair: ['무', '계'], traditionalElement: '화' }),
      ]),
    );
    expect(report.stemReferences.every((item) => item.scope === 'DAY_STEM_SCOPED_REFERENCE_ONLY')).toBe(true);
    expect(report.stemReferences.every((item) => item.challengeTransformationStateAuthorized === false)).toBe(true);
  });

  test('requires month/time vitality and interfering-stem context before any stem transformation policy could advance', () => {
    const report = buildI36ChallengeTargetCombinationTransformationPolicyMethodologyReview();

    expect(report.stemTransformationMonthOrTimeConditionDependencyRequired).toBe(true);
    expect(report.stemTransformationCompetingStemInterferenceDependencyRequired).toBe(true);
    expect(report.challengeTransformationStateEmissionAuthorized).toBe(false);
    expect(report.combinationBindingStateEmissionAuthorized).toBe(false);
  });

  test('allows exact full three-combination bureau references without treating them as effective bureaus', () => {
    const report = buildI36ChallengeTargetCombinationTransformationPolicyMethodologyReview();

    expect(report.threeCombinationTraditionalBureauReferenceEmissionAuthorized).toBe(true);
    expect(report.threeCombinationFullMembershipRequired).toBe(true);
    expect(report.threeCombinationFullMembershipEstablishesEffectiveBureau).toBe(false);
    expect(report.threeCombinationClashOrCompetingTopologyCanMatter).toBe(true);
    expect(report.threeCombinationReferences).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ branches: ['신', '자', '진'], traditionalBureauElement: '수' }),
        expect.objectContaining({ branches: ['사', '유', '축'], traditionalBureauElement: '금' }),
        expect.objectContaining({ branches: ['해', '묘', '미'], traditionalBureauElement: '목' }),
        expect.objectContaining({ branches: ['인', '오', '술'], traditionalBureauElement: '화' }),
      ]),
    );
    expect(
      report.threeCombinationReferences.every(
        (item) =>
          item.fullMembershipRequiredBySource === true &&
          item.structuralMembershipAloneEstablishesEffectiveBureau === false &&
          item.challengeRootTransformationStateAuthorized === false,
      ),
    ).toBe(true);
  });

  test('keeps six-combination transformed-element mapping unresolved instead of importing an unsupported convention', () => {
    const report = buildI36ChallengeTargetCombinationTransformationPolicyMethodologyReview();

    expect(report.sixCombinationTraditionalTransformedElementMappingResolved).toBe(false);
    expect(report.sixCombinationTransformationTargetElementEmissionAuthorized).toBe(false);
    expect(report.postCombinationSubjectIdentityPolicyResolved).toBe(false);
  });

  test('preserves all downstream guards and deterministic identity', () => {
    const report = buildI36ChallengeTargetCombinationTransformationPolicyMethodologyReview();
    const repeated = buildI36ChallengeTargetCombinationTransformationPolicyMethodologyReview();

    expect(report.targetPostRelationRootState).toBe('not_determined');
    expect(report.effectiveMechanismForceVerdict).toBe('not_determined');
    expect(report.relationSpecificUsefulnessHarmfulness).toBe('not_determined');
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
    expect(report.requiredNextImplementationGuards).toEqual(
      expect.arrayContaining([
        expect.stringContaining('day-stem-scoped reference'),
        expect.stringContaining('full three-branch structural candidate'),
        expect.stringContaining('branch six-combination transformed element'),
      ]),
    );
    expect(report.reviewId).toBe(repeated.reviewId);
  });
});
