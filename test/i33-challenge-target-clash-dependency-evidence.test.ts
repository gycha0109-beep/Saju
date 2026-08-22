import { describe, expect, test } from 'vitest';
import {
  buildResolvedI29ChallengeTargetIntrinsicRootEvidence,
  buildResolvedI31ChallengeTargetRelationParticipationEvidence,
  buildResolvedI33ChallengeTargetClashDependencyEvidence,
  type EarthlyBranch,
  type FiveElement,
  type HeavenlyStem,
  type PillarFact,
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

const relationHeavyPillars = {
  year: pillar('병', '인'),
  month: pillar('무', '진'),
  day: pillar('갑', '술'),
  hour: pillar('신', '신'),
};

const sparseRelationPillars = {
  year: pillar('병', '인'),
  month: pillar('임', '자'),
  day: pillar('갑', '묘'),
  hour: pillar('경', '유'),
};

const sixCombinationRescuePillars = {
  year: pillar('병', '인'),
  month: pillar('임', '해'),
  day: pillar('갑', '술'),
  hour: pillar('경', '신'),
};

const threeCombinationRescuePillars = {
  year: pillar('병', '인'),
  month: pillar('정', '오'),
  day: pillar('갑', '술'),
  hour: pillar('경', '신'),
};

function build(pillars: typeof relationHeavyPillars) {
  const roots = buildResolvedI29ChallengeTargetIntrinsicRootEvidence(pillars);
  const relations = buildResolvedI31ChallengeTargetRelationParticipationEvidence(pillars, roots);
  return buildResolvedI33ChallengeTargetClashDependencyEvidence(pillars, roots, relations);
}

describe('I33 challenge target clash dependency evidence adapter', () => {
  test('materializes seasonal phase and positional support channels for an aligned challenge-root clash', () => {
    const report = build(relationHeavyPillars);
    const output = report.candidates.find(
      (item) => item.mechanism === 'OUTPUT_LEAKAGE' && item.targetRootCandidatePosition === 'year',
    );

    expect(report.status).toBe('RESOLVED_DEPENDENCY_EVIDENCE');
    expect(report.commandElement).toBe('토');
    expect(output?.targetRootCandidateBranch).toBe('인');
    expect(output?.participants[0]).toEqual(
      expect.objectContaining({
        role: 'TARGET_ROOT_CANDIDATE',
        position: 'year',
        branch: '인',
        seasonalPhase: '囚',
        visibleSameElementStemPositions: expect.arrayContaining(['day']),
        supportEffect: 'not_resolved',
        relativeForceVerdict: 'not_determined',
      }),
    );
    expect(output?.participants[1]).toEqual(
      expect.objectContaining({
        role: 'CLASH_COUNTERPART',
        position: 'hour',
        branch: '신',
        seasonalPhase: '相',
        visibleResourceStemPositions: expect.arrayContaining(['month']),
        resourceBranchPositions: expect.arrayContaining(['month', 'day']),
      }),
    );
    expect(output?.seasonalAdvantageCandidate).toBe('CLASH_COUNTERPART');
  });

  test('routes six- and three-combination rescue topology without assigning rescue effect or settlement', () => {
    const six = build(sixCombinationRescuePillars);
    const sixOutput = six.candidates.find(
      (item) => item.mechanism === 'OUTPUT_LEAKAGE' && item.targetRootCandidatePosition === 'year',
    );
    expect(sixOutput?.rescueTopologyCandidates).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          rescueKind: 'SIX_COMBINATION_RESCUE_CANDIDATE',
          sharedClashParticipantPositions: expect.arrayContaining(['year']),
          rescueStrength: 'not_evaluated',
          rescueEffect: 'not_resolved',
          clashSettlement: 'not_determined',
        }),
      ]),
    );

    const three = build(threeCombinationRescuePillars);
    const threeOutput = three.candidates.find(
      (item) => item.mechanism === 'OUTPUT_LEAKAGE' && item.targetRootCandidatePosition === 'year',
    );
    expect(threeOutput?.rescueTopologyCandidates).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          rescueKind: 'THREE_COMBINATION_RESCUE_CANDIDATE',
          sharedClashParticipantPositions: expect.arrayContaining(['year']),
          rescueStrength: 'not_evaluated',
          rescueEffect: 'not_resolved',
          clashSettlement: 'not_determined',
        }),
      ]),
    );
  });

  test('emits no clash dependency candidate for a mechanism whose root candidate has no touching tracked clash', () => {
    const report = build(sparseRelationPillars);
    const outputCandidates = report.candidates.filter((item) => item.mechanism === 'OUTPUT_LEAKAGE');

    expect(report.status).toBe('RESOLVED_DEPENDENCY_EVIDENCE');
    expect(outputCandidates).toEqual([]);
    expect(report.targetPostRelationRootState).toBe('not_determined');
  });

  test('rejects cross-material I29 or I31 identity instead of mixing clash dependencies', () => {
    const roots = buildResolvedI29ChallengeTargetIntrinsicRootEvidence(relationHeavyPillars);
    const mismatchedRoots = buildResolvedI29ChallengeTargetIntrinsicRootEvidence(sparseRelationPillars);
    const mismatchedRelations = buildResolvedI31ChallengeTargetRelationParticipationEvidence(
      sparseRelationPillars,
      mismatchedRoots,
    );

    const rootMismatch = buildResolvedI33ChallengeTargetClashDependencyEvidence(
      relationHeavyPillars,
      mismatchedRoots,
      mismatchedRelations,
    );
    expect(rootMismatch.status).toBe('ROOT_EVIDENCE_MISALIGNED');
    expect(rootMismatch.candidates).toEqual([]);

    const relationMismatch = buildResolvedI33ChallengeTargetClashDependencyEvidence(
      relationHeavyPillars,
      roots,
      mismatchedRelations,
    );
    expect(relationMismatch.status).toBe('RELATION_EVIDENCE_MISALIGNED');
    expect(relationMismatch.candidates).toEqual([]);
  });

  test('preserves earth and all downstream verdict guards while keeping deterministic identity', () => {
    const report = build(relationHeavyPillars);
    const repeated = build(relationHeavyPillars);
    const earthCandidates = report.candidates.filter(
      (item) => item.mechanism === 'WEALTH_EXPENDITURE_CONTROL',
    );

    expect(earthCandidates.length).toBeGreaterThan(0);
    expect(earthCandidates.every((item) => item.earthTargetRootEffectResolutionAuthorized === false)).toBe(true);
    expect(earthCandidates.every((item) => item.targetPostRelationRootState === 'not_determined')).toBe(true);
    expect(report.lowerLevelI20ReportContractReused).toBe(false);
    expect(report.lowerLevelI20bReportContractReused).toBe(false);
    expect(report.lowerLevelI20cReportContractReused).toBe(false);
    expect(report.lowerLevelI20dReportContractReused).toBe(false);
    expect(report.relativeBranchForceVerdict).toBe('not_determined');
    expect(report.clashWinnerVerdict).toBe('not_determined');
    expect(report.effectiveMechanismForceVerdict).toBe('not_determined');
    expect(report.relationSpecificUsefulnessHarmfulness).toBe('not_determined');
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
    expect(report.reportId).toBe(repeated.reportId);
  });
});
