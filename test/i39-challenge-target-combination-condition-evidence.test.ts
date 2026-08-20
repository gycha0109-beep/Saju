import { describe, expect, test } from 'vitest';
import {
  buildI36ChallengeTargetCombinationTransformationPolicyMethodologyReview,
  buildI37ChallengeTargetCombinationTransformationReference,
  buildI38ChallengeTargetCombinationConditionApplicabilityMethodologyReview,
  buildResolvedI29ChallengeTargetIntrinsicRootEvidence,
  buildResolvedI31ChallengeTargetRelationParticipationEvidence,
  buildResolvedI35ChallengeTargetCombinationDependencyEvidence,
  buildResolvedI39ChallengeTargetCombinationConditionEvidence,
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

function contiguousThreeCombinationPillars(): StructuralPillarInput {
  return {
    year: pillar('병', '인'),
    month: pillar('정', '오'),
    day: pillar('갑', '술'),
    hour: pillar('경', '신'),
  };
}

function separatedThreeCombinationPillars(): StructuralPillarInput {
  return {
    year: pillar('병', '인'),
    month: pillar('임', '자'),
    day: pillar('갑', '오'),
    hour: pillar('경', '술'),
  };
}

function upstream(pillars: StructuralPillarInput) {
  const roots = buildResolvedI29ChallengeTargetIntrinsicRootEvidence(pillars);
  const relations = buildResolvedI31ChallengeTargetRelationParticipationEvidence(pillars, roots);
  const combinations = buildResolvedI35ChallengeTargetCombinationDependencyEvidence(
    pillars,
    roots,
    relations,
  );
  const transformationPolicy =
    buildI36ChallengeTargetCombinationTransformationPolicyMethodologyReview();
  const references = buildI37ChallengeTargetCombinationTransformationReference(
    combinations,
    transformationPolicy,
  );
  const methodology =
    buildI38ChallengeTargetCombinationConditionApplicabilityMethodologyReview();
  return { roots, relations, combinations, references, methodology };
}

describe('I39 challenge target combination condition evidence adapter', () => {
  test('materializes stem seasonal/support/competition condition substrate without deciding transformation or binding', () => {
    const pillars = stemCombinationPillars();
    const { combinations, references, methodology } = upstream(pillars);
    const report = buildResolvedI39ChallengeTargetCombinationConditionEvidence(
      pillars,
      combinations,
      references,
      methodology,
    );
    const output = report.items.find(
      (item) =>
        item.mechanism === 'OUTPUT_LEAKAGE' &&
        item.subjectKind === 'VISIBLE_TARGET_STEM' &&
        item.subjectPosition === 'year',
    );

    expect(report.status).toBe('RESOLVED_CONDITION_EVIDENCE');
    expect(output?.relationKind).toBe('stem_five_combination');
    expect(output?.seasonalCondition.conditionEffect).toBe('not_resolved');
    expect(output?.supportInterference.participantContexts).toHaveLength(2);
    expect(output?.supportInterference.completeEffectModelAvailable).toBe(false);
    expect(output?.conditionEvidenceState).toBe('CANDIDATE_SUBSTRATE_ONLY');
    expect(output?.transformationConditionVerdict).toBe('not_determined');
    expect(output?.trueTransformationVerdict).toBe('not_determined');
    expect(output?.bindingState).toBe('not_determined');
  });

  test('records complete contiguous three-combination membership and visible bureau-element lead-out without establishing an effective bureau', () => {
    const pillars = contiguousThreeCombinationPillars();
    const { combinations, references, methodology } = upstream(pillars);
    const report = buildResolvedI39ChallengeTargetCombinationConditionEvidence(
      pillars,
      combinations,
      references,
      methodology,
    );
    const output = report.items.find(
      (item) =>
        item.mechanism === 'OUTPUT_LEAKAGE' &&
        item.relationKind === 'branch_three_combination',
    );

    expect(output?.threeBranchCondition).toEqual(
      expect.objectContaining({
        fullMembershipNecessary: true,
        fullMembershipObserved: true,
        adjacencyState: 'CONTIGUOUS_THREE_SLOTS',
        traditionalBureauReferenceElement: '화',
        leadOutState: 'VISIBLE_REFERENCE_ELEMENT_STEM_PRESENT',
        effectiveBureauVerdict: 'not_determined',
      }),
    );
    expect(output?.threeBranchCondition?.visibleLeadOutStemPositions).toEqual(
      expect.arrayContaining(['year', 'month']),
    );
  });

  test('preserves separated three-combination placement and touching clash topology as candidate evidence only', () => {
    const pillars = separatedThreeCombinationPillars();
    const { combinations, references, methodology } = upstream(pillars);
    const report = buildResolvedI39ChallengeTargetCombinationConditionEvidence(
      pillars,
      combinations,
      references,
      methodology,
    );
    const output = report.items.find(
      (item) =>
        item.mechanism === 'OUTPUT_LEAKAGE' &&
        item.relationKind === 'branch_three_combination',
    );

    expect(output?.threeBranchCondition?.adjacencyState).toBe('SEPARATED_WITH_GAP');
    expect(output?.threeBranchCondition?.clashTopology.length).toBeGreaterThan(0);
    expect(
      output?.threeBranchCondition?.clashTopology.some(
        (relation) => relation.relationKind === 'branch_clash',
      ),
    ).toBe(true);
    expect(output?.threeBranchCondition?.effectiveBureauVerdict).toBe('not_determined');
    expect(output?.targetPostRelationRootState).toBe('not_determined');
  });

  test('keeps six-combination transformation convention explicitly unresolved instead of manufacturing a target element', () => {
    const pillars = sixCombinationPillars();
    const { combinations, references, methodology } = upstream(pillars);
    const report = buildResolvedI39ChallengeTargetCombinationConditionEvidence(
      pillars,
      combinations,
      references,
      methodology,
    );
    const output = report.items.find(
      (item) =>
        item.mechanism === 'OUTPUT_LEAKAGE' &&
        item.relationKind === 'branch_six_combination',
    );

    expect(output?.sixCombinationConventionState).toBe(
      'UNIFORM_TRANSFORMATION_CONVENTION_UNRESOLVED_SCOPE_MISMATCH',
    );
    expect(output?.threeBranchCondition).toBeUndefined();
    expect(output?.transformationConditionVerdict).toBe('not_determined');
    expect(output?.trueTransformationVerdict).toBe('not_determined');
  });

  test('fails closed on cross-material reference evidence and keeps deterministic downstream guards on aligned evidence', () => {
    const pillars = stemCombinationPillars();
    const aligned = upstream(pillars);
    const other = upstream(sixCombinationPillars());
    const rejected = buildResolvedI39ChallengeTargetCombinationConditionEvidence(
      pillars,
      aligned.combinations,
      other.references,
      aligned.methodology,
    );
    const report = buildResolvedI39ChallengeTargetCombinationConditionEvidence(
      pillars,
      aligned.combinations,
      aligned.references,
      aligned.methodology,
    );
    const repeated = buildResolvedI39ChallengeTargetCombinationConditionEvidence(
      pillars,
      aligned.combinations,
      aligned.references,
      aligned.methodology,
    );

    expect(rejected.status).toBe('REFERENCE_EVIDENCE_MISALIGNED');
    expect(rejected.items).toEqual([]);
    expect(report.challengeSpecificConditionEvidenceAvailable).toBe(true);
    expect(report.transformationConditionVerdict).toBe('not_determined');
    expect(report.challengeTransformationStateEmissionAuthorized).toBe(false);
    expect(report.combinationBindingStateEmissionAuthorized).toBe(false);
    expect(report.postCombinationSubjectIdentityPolicyResolved).toBe(false);
    expect(report.targetPostRelationRootState).toBe('not_determined');
    expect(report.effectiveMechanismForceVerdict).toBe('not_determined');
    expect(report.relationSpecificUsefulnessHarmfulness).toBe('not_determined');
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
    expect(report.reportId).toBe(repeated.reportId);
  });
});
