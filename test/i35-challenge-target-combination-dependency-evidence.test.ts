import { describe, expect, test } from 'vitest';
import {
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

function sparsePillars(): StructuralPillarInput {
  return {
    year: pillar('병', '인'),
    month: pillar('임', '자'),
    day: pillar('갑', '묘'),
    hour: pillar('경', '유'),
  };
}

function build(pillars: StructuralPillarInput) {
  const roots = buildResolvedI29ChallengeTargetIntrinsicRootEvidence(pillars);
  const relations = buildResolvedI31ChallengeTargetRelationParticipationEvidence(pillars, roots);
  return {
    roots,
    relations,
    report: buildResolvedI35ChallengeTargetCombinationDependencyEvidence(
      pillars,
      roots,
      relations,
    ),
  };
}

describe('I35 challenge target combination dependency evidence adapter', () => {
  test('materializes visible target-stem five-combination dependency context without a transformation product', () => {
    const { report } = build(stemCombinationPillars());
    const outputStem = report.candidates.find(
      (item) =>
        item.mechanism === 'OUTPUT_LEAKAGE' &&
        item.subjectKind === 'VISIBLE_TARGET_STEM' &&
        item.subjectPosition === 'year',
    );

    expect(report.status).toBe('RESOLVED_DEPENDENCY_EVIDENCE');
    expect(outputStem).toEqual(
      expect.objectContaining({
        targetElement: '화',
        subjectValue: '병',
        relationKind: 'stem_five_combination',
        relationArity: 2,
        structuralMembershipComplete: true,
        transformationEstablished: false,
        transformationTargetElement: 'not_emitted',
        combinationTransformationConditions: 'not_resolved',
        combinationEffectVerdict: 'not_determined',
      }),
    );
    expect(outputStem?.participants).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ pillar: 'year', component: 'stem', value: '병' }),
        expect.objectContaining({ pillar: 'hour', component: 'stem', value: '신' }),
      ]),
    );
    expect(outputStem?.relationSourceIds).toEqual(
      expect.arrayContaining(['SRC-T0-YISI-ZHAN-10', 'SRC-T0-XUANZE-YAOLUE-UPPER']),
    );
  });

  test('materializes branch six-combination context and competing clash topology without precedence or effect', () => {
    const { report } = build(sixCombinationPillars());
    const outputSix = report.candidates.find(
      (item) =>
        item.mechanism === 'OUTPUT_LEAKAGE' &&
        item.subjectKind === 'TARGET_ROOT_CANDIDATE' &&
        item.subjectPosition === 'year' &&
        item.relationKind === 'branch_six_combination',
    );

    expect(outputSix?.subjectValue).toBe('인');
    expect(outputSix?.relationArity).toBe(2);
    expect(outputSix?.participants.every((participant) => participant.supportInterferenceEffect === 'not_resolved')).toBe(true);
    expect(outputSix?.competingRelationTopology).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          relationKind: 'branch_clash',
          sharedParticipantPositions: expect.arrayContaining(['year']),
          precedence: 'not_determined',
          relationEffect: 'not_determined',
        }),
      ]),
    );
    expect(outputSix?.transformationEstablished).toBe(false);
    expect(outputSix?.transformationTargetElement).toBe('not_emitted');
  });

  test('preserves complete three-combination membership as structural only and routes competing topology', () => {
    const { report } = build(threeCombinationPillars());
    const outputThree = report.candidates.find(
      (item) =>
        item.mechanism === 'OUTPUT_LEAKAGE' &&
        item.subjectKind === 'TARGET_ROOT_CANDIDATE' &&
        item.subjectPosition === 'year' &&
        item.relationKind === 'branch_three_combination',
    );

    expect(outputThree?.relationArity).toBe(3);
    expect(outputThree?.participants.map((participant) => participant.value)).toEqual(
      expect.arrayContaining(['인', '오', '술']),
    );
    expect(outputThree?.structuralMembershipComplete).toBe(true);
    expect(outputThree?.transformationEstablished).toBe(false);
    expect(outputThree?.transformationTargetElement).toBe('not_emitted');
    expect(outputThree?.relationSourceIds).toEqual(
      expect.arrayContaining(['SRC-T0-XUANZE-YAOLUE-UPPER', 'SRC-T0-SANMING-TONGHUI-V2']),
    );
    expect(outputThree?.competingRelationTopology).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ relationKind: 'branch_clash' }),
      ]),
    );
  });

  test('rejects cross-material root or relation identity instead of mixing combination dependencies', () => {
    const heavy = stemCombinationPillars();
    const sparse = sparsePillars();
    const heavyRoots = buildResolvedI29ChallengeTargetIntrinsicRootEvidence(heavy);
    const sparseRoots = buildResolvedI29ChallengeTargetIntrinsicRootEvidence(sparse);
    const sparseRelations = buildResolvedI31ChallengeTargetRelationParticipationEvidence(
      sparse,
      sparseRoots,
    );

    const rootMismatch = buildResolvedI35ChallengeTargetCombinationDependencyEvidence(
      heavy,
      sparseRoots,
      sparseRelations,
    );
    expect(rootMismatch.status).toBe('ROOT_EVIDENCE_MISALIGNED');
    expect(rootMismatch.candidates).toEqual([]);

    const relationMismatch = buildResolvedI35ChallengeTargetCombinationDependencyEvidence(
      heavy,
      heavyRoots,
      sparseRelations,
    );
    expect(relationMismatch.status).toBe('RELATION_EVIDENCE_MISALIGNED');
    expect(relationMismatch.candidates).toEqual([]);
  });

  test('keeps transformation, root-state, effective-force, classification, and scoring guards deterministic', () => {
    const { roots, relations, report } = build(stemCombinationPillars());
    const repeated = buildResolvedI35ChallengeTargetCombinationDependencyEvidence(
      stemCombinationPillars(),
      roots,
      relations,
    );

    expect(report.transformationTargetElementEmissionAuthorized).toBe(false);
    expect(report.completeSupportInterferenceModelAvailable).toBe(false);
    expect(report.hiddenOnlyTargetCombinationRootEffectAuthorized).toBe(false);
    expect(report.earthTargetCombinationRootEffectAuthorized).toBe(false);
    expect(report.combinationEffectVerdict).toBe('not_determined');
    expect(report.targetPostRelationRootState).toBe('not_determined');
    expect(report.effectiveMechanismForceVerdict).toBe('not_determined');
    expect(report.relationSpecificUsefulnessHarmfulness).toBe('not_determined');
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
    expect(report.candidates.every((item) => item.transformationTargetElement === 'not_emitted')).toBe(true);
    expect(report.reportId).toBe(repeated.reportId);
  });
});
