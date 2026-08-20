import { describe, expect, test } from 'vitest';
import {
  buildI20BClashSeasonalAdvantage,
  buildResolvedRelativeForceEvidence,
  reviewResolvedRootRelationEffects,
  type BranchFact,
  type EarthlyBranch,
  type FiveElement,
  type HeavenlyStem,
  type PillarFact,
} from '../src/index.js';

const STEM_ELEMENT: Readonly<Record<HeavenlyStem, FiveElement>> = {
  갑: '목', 을: '목', 병: '화', 정: '화', 무: '토', 기: '토', 경: '금', 신: '금', 임: '수', 계: '수',
};
const STEM_HANJA: Readonly<Record<HeavenlyStem, string>> = {
  갑: '甲', 을: '乙', 병: '丙', 정: '丁', 무: '戊', 기: '己', 경: '庚', 신: '辛', 임: '壬', 계: '癸',
};
const STEM_YINYANG: Readonly<Record<HeavenlyStem, '양' | '음'>> = {
  갑: '양', 을: '음', 병: '양', 정: '음', 무: '양', 기: '음', 경: '양', 신: '음', 임: '양', 계: '음',
};
const BRANCH_ELEMENT: Readonly<Record<EarthlyBranch, FiveElement>> = {
  자: '수', 축: '토', 인: '목', 묘: '목', 진: '토', 사: '화',
  오: '화', 미: '토', 신: '금', 유: '금', 술: '토', 해: '수',
};
const BRANCH_HANJA: Readonly<Record<EarthlyBranch, string>> = {
  자: '子', 축: '丑', 인: '寅', 묘: '卯', 진: '辰', 사: '巳',
  오: '午', 미: '未', 신: '申', 유: '酉', 술: '戌', 해: '亥',
};
const BRANCH_YINYANG: Readonly<Record<EarthlyBranch, '양' | '음'>> = {
  자: '양', 축: '음', 인: '양', 묘: '음', 진: '양', 사: '음',
  오: '양', 미: '음', 신: '양', 유: '음', 술: '양', 해: '음',
};

function branch(value: EarthlyBranch): BranchFact {
  return {
    value,
    hanja: BRANCH_HANJA[value],
    element: BRANCH_ELEMENT[value],
    yinYang: BRANCH_YINYANG[value],
  };
}

function pillar(stem: HeavenlyStem, branchValue: EarthlyBranch): PillarFact {
  return {
    stem: {
      value: stem,
      hanja: STEM_HANJA[stem],
      element: STEM_ELEMENT[stem],
      yinYang: STEM_YINYANG[stem],
    },
    branch: branch(branchValue),
  };
}

describe('I20B clash seasonal advantage candidates', () => {
  test('marks only a seasonal advantage candidate when clash participants have different phases', () => {
    const pillars = {
      year: pillar('임', '자'),
      month: pillar('병', '오'),
      day: pillar('갑', '묘'),
      hour: pillar('기', '축'),
    };
    const evidence = buildResolvedRelativeForceEvidence(pillars);
    const roots = reviewResolvedRootRelationEffects('목', pillars);
    const report = buildI20BClashSeasonalAdvantage(evidence, roots);
    const clash = report.candidates.find((candidate) =>
      candidate.participants.some((participant) => participant.branch === '자'),
    );

    expect(report.status).toBe('RESOLVED_CANDIDATES');
    expect(clash?.participants.map((participant) => participant.seasonalPhase)).toEqual(['囚', '旺']);
    expect(clash?.seasonalAdvantageCandidate).toBe('SECOND_PARTICIPANT');
    expect(clash?.localSupportEffect).toBe('not_resolved');
    expect(clash?.rescueEffect).toBe('not_resolved');
    expect(clash?.relativeForceVerdict).toBe('not_determined');
    expect(clash?.rootEffectVerdict).toBe('not_determined');
    expect(clash?.numericScore).toBe('not_assigned');
    expect(report.relativeForceVerdictAuthorized).toBe(false);
    expect(report.rootEffectResolutionAuthorized).toBe(false);
  });

  test('same-element earth clash preserves a seasonal tie instead of inventing a winner', () => {
    const pillars = {
      year: pillar('기', '축'),
      month: pillar('무', '미'),
      day: pillar('갑', '묘'),
      hour: pillar('병', '사'),
    };
    const report = buildI20BClashSeasonalAdvantage(
      buildResolvedRelativeForceEvidence(pillars),
      reviewResolvedRootRelationEffects('목', pillars),
    );
    const clash = report.candidates.find((candidate) =>
      candidate.participants.some((participant) => participant.branch === '축'),
    );

    expect(clash?.participants.map((participant) => participant.seasonalPhase)).toEqual(['旺', '旺']);
    expect(clash?.seasonalAdvantageCandidate).toBe('TIED_SEASONAL_PHASE');
    expect(clash?.relativeForceVerdict).toBe('not_determined');
  });

  test('unresolved upstream evidence is fail-closed', () => {
    const evidence = buildResolvedRelativeForceEvidence({
      year: pillar('임', '자'),
      month: pillar('병', '오'),
      day: pillar('갑', '묘'),
      hour: pillar('기', '축'),
    });
    const unresolvedEvidence = { ...evidence, status: 'PILLARS_UNRESOLVED' as const };
    const roots = reviewResolvedRootRelationEffects('목', {
      year: pillar('임', '자'),
      month: pillar('병', '오'),
      day: pillar('갑', '묘'),
      hour: pillar('기', '축'),
    });
    const report = buildI20BClashSeasonalAdvantage(unresolvedEvidence, roots);

    expect(report.status).toBe('INPUT_INDETERMINATE');
    expect(report.candidates).toEqual([]);
    expect(report.relativeForceVerdictAuthorized).toBe(false);
  });

  test('report identity is deterministic', () => {
    const pillars = {
      year: pillar('임', '자'),
      month: pillar('병', '오'),
      day: pillar('갑', '묘'),
      hour: pillar('기', '축'),
    };
    const evidence = buildResolvedRelativeForceEvidence(pillars);
    const roots = reviewResolvedRootRelationEffects('목', pillars);

    expect(buildI20BClashSeasonalAdvantage(evidence, roots).reportId).toBe(
      buildI20BClashSeasonalAdvantage(evidence, roots).reportId,
    );
  });
});
