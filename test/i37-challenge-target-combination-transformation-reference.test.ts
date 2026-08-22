import { describe, expect, test } from 'vitest';
import {
  buildI36ChallengeTargetCombinationTransformationPolicyMethodologyReview,
  buildI37ChallengeTargetCombinationTransformationReference,
  buildResolvedI29ChallengeTargetIntrinsicRootEvidence,
  buildResolvedI31ChallengeTargetRelationParticipationEvidence,
  buildResolvedI35ChallengeTargetCombinationDependencyEvidence,
  type EarthlyBranch,
  type FiveElement,
  type HeavenlyStem,
  type PillarFact,
  type StructuralPillarInput,
} from '../src/index.js';

const STEM: Readonly<
  Record<HeavenlyStem, { hanja: string; element: FiveElement; yinYang: '양' | '음' }>
> = {
  갑: { hanja: '甲', element: '목', yinYang: '양' },
  을: { hanja: '乙', element: '목', yinYang: '음' },
  병: { hanja: '丙', element: '화', yinYang: '양' },
  정: { hanja: '丁', element: '화', yinYang: '음' },
  무: { hanja: '戊', element: '토', yinYang: '양' },
  기: { hanja: '己', element: '토', yinYang: '음' },
  경: { hanja: '庚', element: '금', yinYang: '양' },
  신: { hanja: '辛', element: '금', yinYang: '음' },
  임: { hanja: '壬', element: '수', yinYang: '양' },
  계: { hanja: '癸', element: '수', yinYang: '음' },
};

const BRANCH: Readonly<
  Record<EarthlyBranch, { hanja: string; element: FiveElement; yinYang: '양' | '음' }>
> = {
  자: { hanja: '子', element: '수', yinYang: '양' },
  축: { hanja: '丑', element: '토', yinYang: '음' },
  인: { hanja: '寅', element: '목', yinYang: '양' },
  묘: { hanja: '卯', element: '목', yinYang: '음' },
  진: { hanja: '辰', element: '토', yinYang: '양' },
  사: { hanja: '巳', element: '화', yinYang: '음' },
  오: { hanja: '午', element: '화', yinYang: '양' },
  미: { hanja: '未', element: '토', yinYang: '음' },
  신: { hanja: '申', element: '금', yinYang: '양' },
  유: { hanja: '酉', element: '금', yinYang: '음' },
  술: { hanja: '戌', element: '토', yinYang: '양' },
  해: { hanja: '亥', element: '수', yinYang: '음' },
};

function pillar(stem: HeavenlyStem, branch: EarthlyBranch): PillarFact {
  return {
    stem: { value: stem, ...STEM[stem] },
    branch: { value: branch, ...BRANCH[branch] },
  };
}

function stemCombinationPillars(): StructuralPillarInput {
  return {
    year: pillar('병', '인'),
    month: pillar('무', '진'),
    day: pillar('갑', '술'),
    hour: pillar('신', '신'),
  };
}

function sixCombinationPillars(): StructuralPillarInput {
  return {
    year: pillar('병', '인'),
    month: pillar('임', '해'),
    day: pillar('갑', '술'),
    hour: pillar('경', '신'),
  };
}

function threeCombinationPillars(): StructuralPillarInput {
  return {
    year: pillar('병', '인'),
    month: pillar('정', '오'),
    day: pillar('갑', '술'),
    hour: pillar('경', '신'),
  };
}

function buildCombinationEvidence(pillars: StructuralPillarInput) {
  const roots = buildResolvedI29ChallengeTargetIntrinsicRootEvidence(pillars);
  const relations = buildResolvedI31ChallengeTargetRelationParticipationEvidence(pillars, roots);
  return buildResolvedI35ChallengeTargetCombinationDependencyEvidence(pillars, roots, relations);
}

describe('I37 challenge target combination transformation reference adapter', () => {
  test('attaches a day-stem-scoped traditional element reference to a challenge stem combination without transforming it', () => {
    const policy = buildI36ChallengeTargetCombinationTransformationPolicyMethodologyReview();
    const report = buildI37ChallengeTargetCombinationTransformationReference(
      buildCombinationEvidence(stemCombinationPillars()),
      policy,
    );
    const output = report.references.find(
      (item) =>
        item.mechanism === 'OUTPUT_LEAKAGE' &&
        item.subjectKind === 'VISIBLE_TARGET_STEM' &&
        item.subjectPosition === 'year',
    );

    expect(report.status).toBe('RESOLVED_REFERENCE_METADATA');
    expect(output).toEqual(
      expect.objectContaining({
        referenceKind: 'STEM_DAY_MASTER_SCOPED_TRADITIONAL_REFERENCE',
        traditionalReferenceElement: '수',
        referenceScope: 'DAY_STEM_SCOPED_REFERENCE_ONLY',
        referenceDirectChallengeTransformationUseAuthorized: false,
        currentTransformationEstablished: false,
        currentTransformationTargetElement: 'not_emitted',
      }),
    );
  });

  test('attaches a full-three-branch bureau reference without promoting structural membership to an effective bureau', () => {
    const policy = buildI36ChallengeTargetCombinationTransformationPolicyMethodologyReview();
    const report = buildI37ChallengeTargetCombinationTransformationReference(
      buildCombinationEvidence(threeCombinationPillars()),
      policy,
    );
    const output = report.references.find(
      (item) =>
        item.mechanism === 'OUTPUT_LEAKAGE' &&
        item.subjectKind === 'TARGET_ROOT_CANDIDATE' &&
        item.subjectPosition === 'year' &&
        item.upstreamRelationKind === 'branch_three_combination',
    );

    expect(output).toEqual(
      expect.objectContaining({
        referenceKind: 'THREE_COMBINATION_BUREAU_REFERENCE',
        traditionalReferenceElement: '화',
        referenceScope: 'FULL_THREE_BRANCH_BUREAU_REFERENCE_ONLY',
        fullThreeBranchMembershipRequired: true,
        fullThreeBranchMembershipObserved: true,
        referenceDirectChallengeTransformationUseAuthorized: false,
        currentTransformationEstablished: false,
        currentTransformationTargetElement: 'not_emitted',
      }),
    );
  });

  test('keeps six-combination transformed-element mapping explicitly unresolved', () => {
    const policy = buildI36ChallengeTargetCombinationTransformationPolicyMethodologyReview();
    const report = buildI37ChallengeTargetCombinationTransformationReference(
      buildCombinationEvidence(sixCombinationPillars()),
      policy,
    );
    const output = report.references.find(
      (item) =>
        item.mechanism === 'OUTPUT_LEAKAGE' &&
        item.subjectKind === 'TARGET_ROOT_CANDIDATE' &&
        item.subjectPosition === 'year' &&
        item.upstreamRelationKind === 'branch_six_combination',
    );

    expect(output?.referenceKind).toBe('SIX_COMBINATION_REFERENCE_MAPPING_UNRESOLVED');
    expect(output?.referenceScope).toBe('UNRESOLVED');
    expect(output?.traditionalReferenceElement).toBeUndefined();
    expect(output?.currentTransformationTargetElement).toBe('not_emitted');
  });

  test('emits no reference metadata when I35 combination evidence is unresolved', () => {
    const policy = buildI36ChallengeTargetCombinationTransformationPolicyMethodologyReview();
    const unresolved = buildResolvedI35ChallengeTargetCombinationDependencyEvidence(
      { month: pillar('무', '진'), day: pillar('갑', '술') },
      buildResolvedI29ChallengeTargetIntrinsicRootEvidence({
        month: pillar('무', '진'),
        day: pillar('갑', '술'),
      }),
      buildResolvedI31ChallengeTargetRelationParticipationEvidence(
        { month: pillar('무', '진'), day: pillar('갑', '술') },
        buildResolvedI29ChallengeTargetIntrinsicRootEvidence({
          month: pillar('무', '진'),
          day: pillar('갑', '술'),
        }),
      ),
    );
    const report = buildI37ChallengeTargetCombinationTransformationReference(unresolved, policy);

    expect(report.status).toBe('COMBINATION_EVIDENCE_UNRESOLVED');
    expect(report.references).toEqual([]);
  });

  test('keeps all current transformation and downstream verdicts blocked with deterministic identity', () => {
    const policy = buildI36ChallengeTargetCombinationTransformationPolicyMethodologyReview();
    const evidence = buildCombinationEvidence(stemCombinationPillars());
    const report = buildI37ChallengeTargetCombinationTransformationReference(evidence, policy);
    const repeated = buildI37ChallengeTargetCombinationTransformationReference(evidence, policy);

    expect(report.traditionalReferenceMetadataAuthorized).toBe(true);
    expect(report.challengeTransformationStateEmissionAuthorized).toBe(false);
    expect(report.transformationTargetElementEmissionAuthorized).toBe(false);
    expect(report.combinationBindingStateEmissionAuthorized).toBe(false);
    expect(report.postCombinationSubjectIdentityPolicyResolved).toBe(false);
    expect(report.targetPostRelationRootState).toBe('not_determined');
    expect(report.effectiveMechanismForceVerdict).toBe('not_determined');
    expect(report.relationSpecificUsefulnessHarmfulness).toBe('not_determined');
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
    expect(
      report.references.every(
        (item) =>
          item.currentTransformationEstablished === false &&
          item.currentTransformationTargetElement === 'not_emitted' &&
          item.bindingState === 'not_determined' &&
          item.postCombinationSubjectIdentity === 'not_determined',
      ),
    ).toBe(true);
    expect(report.reportId).toBe(repeated.reportId);
  });
});
