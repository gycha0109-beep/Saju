import { describe, expect, test } from 'vitest';
import {
  buildI42ChallengeTargetStemTransformationScopeMethodologyReview,
  I42_CHALLENGE_TARGET_STEM_TRANSFORMATION_SCOPE_SOURCE_BASIS,
} from '../src/index.js';

describe('I42 challenge target stem transformation scope methodology review', () => {
  test('blocks direct transfer of the day-stem HuaQi result contract to a visible challenge-target stem', () => {
    const report = buildI42ChallengeTargetStemTransformationScopeMethodologyReview();

    expect(report.decision).toBe(
      'NON_DAY_MASTER_CHALLENGE_STEM_TRANSFORMATION_SCOPE_TRANSFER_BLOCKED',
    );
    expect(report.traditionalHuaQiResultSubjectIsDayStem).toBe(true);
    expect(report.challengeTargetMechanismsAreNonSelfRelations).toBe(true);
    expect(report.visibleChallengeTargetStemCannotBeDayMasterStem).toBe(true);
    expect(report.dayStemHuaQiResultContractDirectTransferAuthorized).toBe(false);
    expect(report.dayStemTransformationConditionSetDirectResultReuseAuthorized).toBe(false);
  });

  test('keeps traditional stem transformation elements as reference metadata without adopting a challenge transformation target', () => {
    const report = buildI42ChallengeTargetStemTransformationScopeMethodologyReview();

    expect(report.traditionalStemTransformationReferenceMetadataMayRemain).toBe(true);
    expect(report.challengeTargetStemTransformationStateEmissionAuthorized).toBe(false);
    expect(report.challengeTargetStemTransformationTargetElementAdoptionAuthorized).toBe(false);
    expect(report.challengeTargetStemNoTransformationConclusionAuthorized).toBe(false);
  });

  test('does not convert source binding language into a generic challenge-target binding verdict', () => {
    const report = buildI42ChallengeTargetStemTransformationScopeMethodologyReview();

    expect(report.sourceBindingLanguageObserved).toBe(true);
    expect(report.genericChallengeTargetBindingVerdictTransferAuthorized).toBe(false);
    expect(report.challengeTargetStemBindingEffectEmissionAuthorized).toBe(false);
    expect(report.combinationStructuralInteractionEvidenceStillRelevant).toBe(true);
    expect(report.combinationInteractionSettlementPolicyStillRequired).toBe(true);
  });

  test('records explicit source scope and contextual binding findings', () => {
    const findings = I42_CHALLENGE_TARGET_STEM_TRANSFORMATION_SCOPE_SOURCE_BASIS;

    expect(findings.some((item) => item.supportType === 'direct_scope' && item.finding.includes('day stem'))).toBe(true);
    expect(findings.some((item) => item.finding.includes('羈絆'))).toBe(true);
    expect(findings.some((item) => item.supportType === 'domain_invariant')).toBe(true);
  });

  test('is deterministic and preserves all downstream fail-closed boundaries', () => {
    const first = buildI42ChallengeTargetStemTransformationScopeMethodologyReview();
    const second = buildI42ChallengeTargetStemTransformationScopeMethodologyReview();

    expect(first.reviewId).toBe(second.reviewId);
    expect(first.postCombinationSubjectIdentityPolicyResolved).toBe(false);
    expect(first.targetPostRelationRootState).toBe('not_determined');
    expect(first.effectiveMechanismForceVerdict).toBe('not_determined');
    expect(first.relationSpecificUsefulnessHarmfulness).toBe('not_determined');
    expect(first.classificationAuthorized).toBe(false);
    expect(first.numericScoringAuthorized).toBe(false);
  });
});
