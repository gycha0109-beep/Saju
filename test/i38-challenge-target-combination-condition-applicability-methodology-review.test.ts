import { describe, expect, test } from 'vitest';
import {
  buildI38ChallengeTargetCombinationConditionApplicabilityMethodologyReview,
  I38_CHALLENGE_COMBINATION_CONDITION_APPLICABILITY,
} from '../src/index.js';

function applicability(conditionId: string) {
  return I38_CHALLENGE_COMBINATION_CONDITION_APPLICABILITY.find(
    (item) => item.conditionId === conditionId,
  )?.applicability;
}

describe('I38 challenge target combination condition applicability methodology review', () => {
  test('reuses stem condition dimensions as candidate substrate while blocking day-master transformation and binding result contracts', () => {
    const report = buildI38ChallengeTargetCombinationConditionApplicabilityMethodologyReview();

    expect(report.decision).toBe('PARTIAL_CONDITION_APPLICABILITY_ONLY_RESULT_VERDICTS_BLOCKED');
    expect(report.stemDayMasterScopeExplicit).toBe(true);
    expect(report.stemSeasonalCommandDimensionReusable).toBe(true);
    expect(report.stemSupportInterferenceDimensionReusable).toBe(true);
    expect(report.stemCompetingStemDimensionReusable).toBe(true);
    expect(report.stemTrueTransformationVerdictReuseAuthorized).toBe(false);
    expect(report.stemNonTransformationBindingVerdictReuseAuthorized).toBe(false);
    expect(applicability('STEM_SEASONAL_COMMAND')).toBe('REUSE_AS_CANDIDATE_SUBSTRATE');
    expect(applicability('STEM_SUPPORT_INTERFERENCE')).toBe('REUSE_AS_CANDIDATE_SUBSTRATE');
    expect(applicability('STEM_COMPETING_STEM_TOPOLOGY')).toBe('REUSE_AS_CANDIDATE_SUBSTRATE');
    expect(applicability('STEM_TRUE_TRANSFORMATION_RESULT')).toBe('DO_NOT_REUSE_RESULT_CONTRACT');
    expect(applicability('STEM_NON_TRANSFORMATION_BINDING_RESULT')).toBe('DO_NOT_REUSE_RESULT_CONTRACT');
  });

  test('treats exact three-combination membership as necessary but not sufficient and preserves contextual dimensions only as evidence candidates', () => {
    const report = buildI38ChallengeTargetCombinationConditionApplicabilityMethodologyReview();

    expect(report.threeCombinationFullMembershipNecessary).toBe(true);
    expect(report.threeCombinationFullMembershipSufficientForEffectiveBureau).toBe(false);
    expect(report.threeCombinationClashTopologyDimensionReusable).toBe(true);
    expect(report.threeCombinationAdjacencySpacingDimensionReusableAsCandidate).toBe(true);
    expect(report.threeCombinationLeadOutDimensionReusableAsCandidate).toBe(true);
    expect(report.threeCombinationEffectiveBureauVerdictAuthorized).toBe(false);
    expect(applicability('THREE_COMBINATION_FULL_MEMBERSHIP')).toBe(
      'REUSE_AS_NECESSARY_PREREQUISITE',
    );
    expect(applicability('THREE_COMBINATION_CLASH_TOPOLOGY')).toBe(
      'REUSE_AS_CANDIDATE_SUBSTRATE',
    );
    expect(applicability('THREE_COMBINATION_ADJACENCY_SPACING')).toBe(
      'REUSE_AS_CANDIDATE_SUBSTRATE',
    );
    expect(applicability('THREE_COMBINATION_LEAD_OUT_CONTEXT')).toBe(
      'REUSE_AS_CANDIDATE_SUBSTRATE',
    );
    expect(applicability('THREE_COMBINATION_EFFECTIVE_BUREAU_RESULT')).toBe(
      'DO_NOT_REUSE_RESULT_CONTRACT',
    );
  });

  test('records the six-combination mapping-like reference but keeps it scope-mismatched, incomplete, and unauthorized for challenge transformation', () => {
    const report = buildI38ChallengeTargetCombinationConditionApplicabilityMethodologyReview();

    expect(report.sixCombinationMappingLikeReferenceExists).toBe(true);
    expect(report.sixCombinationCompleteUniformTransformationConventionResolved).toBe(false);
    expect(report.sixCombinationSelectionContextDirectSajuChallengeUseAuthorized).toBe(false);
    expect(report.sixCombinationTransformationVerdictAuthorized).toBe(false);
    expect(applicability('SIX_COMBINATION_MAPPING_LIKE_REFERENCE')).toBe(
      'REFERENCE_ONLY_SCOPE_MISMATCH',
    );
    expect(applicability('SIX_COMBINATION_TRANSFORMATION_RESULT')).toBe(
      'DO_NOT_REUSE_RESULT_CONTRACT',
    );
    expect(
      report.sourceBasis.some(
        (item) =>
          item.sourceId === 'SRC-T0-XUANZE-JIYAO-UPPER' &&
          item.finding.includes('午未'),
      ),
    ).toBe(true);
  });

  test('authorizes only a challenge-specific condition evidence adapter and keeps every downstream result boundary closed', () => {
    const report = buildI38ChallengeTargetCombinationConditionApplicabilityMethodologyReview();

    expect(report.challengeSpecificConditionEvidenceAdapterAuthorized).toBe(true);
    expect(report.challengeTransformationStateEmissionAuthorized).toBe(false);
    expect(report.combinationBindingStateEmissionAuthorized).toBe(false);
    expect(report.postCombinationSubjectIdentityPolicyResolved).toBe(false);
    expect(report.targetPostRelationRootState).toBe('not_determined');
    expect(report.effectiveMechanismForceVerdict).toBe('not_determined');
    expect(report.relationSpecificUsefulnessHarmfulness).toBe('not_determined');
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
    expect(
      report.requiredNextImplementationGuards.some((guard) =>
        guard.includes('Do not reuse a day-master true-transformation verdict'),
      ),
    ).toBe(true);
  });

  test('preserves a deterministic methodology identity and explicit source-bounded applicability inventory', () => {
    const report = buildI38ChallengeTargetCombinationConditionApplicabilityMethodologyReview();
    const repeated = buildI38ChallengeTargetCombinationConditionApplicabilityMethodologyReview();

    expect(report.conditionApplicability).toHaveLength(12);
    expect(report.sourceBasis).toHaveLength(5);
    expect(report.sourceBasis.some((item) => item.sourceId === 'SRC-T0-SANMING-TONGHUI-SIKU-V2')).toBe(true);
    expect(report.sourceBasis.some((item) => item.sourceId === 'SRC-T0-SANMING-TONGHUI-V2')).toBe(true);
    expect(report.sourceBasis.some((item) => item.sourceId === 'SRC-METHOD-DITIANSUI-CHANWEI-FANGJU')).toBe(true);
    expect(report.reviewId).toBe(repeated.reviewId);
  });
});
