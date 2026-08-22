import { describe, expect, test } from 'vitest';
import {
  buildI20RelativeForceEvidence,
  buildResolvedRelativeForceEvidence,
  calculateCanonicalSajuSnapshot,
  seasonalElementPhase,
  type BranchFact,
  type CalculationPolicySnapshot,
  type EarthlyBranch,
  type FiveElement,
  type HeavenlyStem,
  type PillarFact,
} from '../src/index.js';

const policy: CalculationPolicySnapshot = {
  policyId: 'myeonghwa/i20-test',
  policyVersion: '1.0.0',
  dayBoundary: 'midnight',
  trueSolarTime: {
    enabled: false,
    longitudeSource: 'not-applicable',
    applyEquationOfTime: false,
    applyHistoricalDst: false,
  },
  timeZonePolicy: { source: 'service-default', timeZone: 'Asia/Seoul' },
  unknownBirthTimePolicy: 'preserve-unknown-and-enumerate-boundaries',
};

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

describe('I20 independent relative-force evidence', () => {
  test('seasonal element phase maps the five relations without a numeric score', () => {
    expect(seasonalElementPhase('목', '목')).toBe('旺');
    expect(seasonalElementPhase('목', '화')).toBe('相');
    expect(seasonalElementPhase('목', '수')).toBe('休');
    expect(seasonalElementPhase('목', '금')).toBe('囚');
    expect(seasonalElementPhase('목', '토')).toBe('死');

    const elements = ['목', '화', '토', '금', '수'] as const;
    for (const command of elements) {
      expect(new Set(elements.map((target) => seasonalElementPhase(command, target))).size).toBe(5);
    }
  });

  test('records positional support context without deciding relative force', () => {
    const report = buildResolvedRelativeForceEvidence({
      year: pillar('갑', '인'),
      month: pillar('병', '오'),
      day: pillar('경', '신'),
      hour: pillar('임', '자'),
    });
    const year = report.positions.find((item) => item.position === 'year');

    expect(report.status).toBe('RESOLVED_EVIDENCE');
    expect(report.commandElement).toBe('화');
    expect(year?.seasonalPhase).toBe('休');
    expect(year?.visibleSameElementStemPositions).toEqual(['year']);
    expect(year?.visibleResourceStemPositions).toEqual(['hour']);
    expect(year?.sameElementBranchPositions).toEqual(['year']);
    expect(year?.resourceBranchPositions).toEqual(['hour']);
    expect(year?.relativeForceVerdict).toBe('not_determined');
    expect(year?.numericWeight).toBe('not_assigned');
    expect(report.relativeForceVerdictAuthorized).toBe(false);
    expect(report.rootEffectResolutionAuthorized).toBe(false);
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
  });

  test('known canonical snapshots emit four position records but no force verdict', () => {
    const snapshot = calculateCanonicalSajuSnapshot(
      {
        calendarType: 'solar',
        date: { year: 1992, month: 10, day: 24 },
        time: { known: true, hour: 5, minute: 30 },
        sexForTraditionalCalculation: 'unspecified',
      },
      policy,
      { now: new Date('2026-08-20T00:00:00.000Z') },
    );
    const report = buildI20RelativeForceEvidence(snapshot);

    expect(report.status).toBe('RESOLVED_EVIDENCE');
    expect(report.positions).toHaveLength(4);
    expect(report.positions.every((item) => item.relativeForceVerdict === 'not_determined')).toBe(true);
    expect(report.positions.every((item) => item.numericWeight === 'not_assigned')).toBe(true);
  });

  test('unknown-time base snapshots require scenario materialization', () => {
    const snapshot = calculateCanonicalSajuSnapshot(
      {
        calendarType: 'solar',
        date: { year: 2024, month: 2, day: 4 },
        time: { known: false },
        sexForTraditionalCalculation: 'unspecified',
      },
      { ...policy, dayBoundary: 'jasi' },
      { now: new Date('2026-08-20T00:00:00.000Z') },
    );
    const report = buildI20RelativeForceEvidence(snapshot);

    expect(snapshot.scenarios.length).toBeGreaterThan(1);
    expect(report.status).toBe('SCENARIO_MATERIALIZATION_REQUIRED');
    expect(report.positions).toEqual([]);
    expect(report.relativeForceVerdictAuthorized).toBe(false);
  });
});
