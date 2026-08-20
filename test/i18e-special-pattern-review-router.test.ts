import { describe, expect, test } from 'vitest';
import {
  buildI18ESpecialPatternReviewRouter,
  calculateCanonicalSajuSnapshot,
  reviewResolvedSpecialPatternSignals,
  type BranchFact,
  type CalculationPolicySnapshot,
  type EarthlyBranch,
  type FiveElement,
  type HeavenlyStem,
  type PillarFact,
} from '../src/index.js';

const policy: CalculationPolicySnapshot = {
  policyId: 'myeonghwa/i18e-test',
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
  자: '수', 축: '토', 인: '목', 묘: '목', 진: '토', 사: '화', 오: '화', 미: '토', 신: '금', 유: '금', 술: '토', 해: '수',
};
const BRANCH_HANJA: Readonly<Record<EarthlyBranch, string>> = {
  자: '子', 축: '丑', 인: '寅', 묘: '卯', 진: '辰', 사: '巳', 오: '午', 미: '未', 신: '申', 유: '酉', 술: '戌', 해: '亥',
};
const BRANCH_YINYANG: Readonly<Record<EarthlyBranch, '양' | '음'>> = {
  자: '양', 축: '음', 인: '양', 묘: '음', 진: '양', 사: '음', 오: '양', 미: '음', 신: '양', 유: '음', 술: '양', 해: '음',
};

function branch(value: EarthlyBranch): BranchFact {
  return { value, hanja: BRANCH_HANJA[value], element: BRANCH_ELEMENT[value], yinYang: BRANCH_YINYANG[value] };
}

function pillar(stem: HeavenlyStem, branchValue: EarthlyBranch): PillarFact {
  return {
    stem: { value: stem, hanja: STEM_HANJA[stem], element: STEM_ELEMENT[stem], yinYang: STEM_YINYANG[stem] },
    branch: branch(branchValue),
  };
}

describe('I18E special-pattern review router', () => {
  test('routes strict no-support follow-style evidence to review without declaring a follow pattern', () => {
    const report = reviewResolvedSpecialPatternSignals('목', {
      year: pillar('경', '유'),
      month: pillar('무', '술'),
      day: pillar('갑', '오'),
      hour: pillar('병', '유'),
    });

    expect(report.status).toBe('SPECIAL_PATTERN_REVIEW_REQUIRED');
    expect(report.signals).toContain('FOLLOW_STYLE_NO_SUPPORT_CANDIDATE');
    expect(report.finalSpecialPatternClassificationAuthorized).toBe(false);
    expect(report.ordinaryStrengthClassificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
    expect('pattern' in report).toBe(false);
  });

  test('routes a day-stem five-combination candidate without asserting transformation', () => {
    const report = reviewResolvedSpecialPatternSignals('목', {
      year: pillar('기', '인'),
      month: pillar('병', '진'),
      day: pillar('갑', '자'),
      hour: pillar('경', '오'),
    });

    expect(report.signals).toContain('DAY_STEM_COMBINATION_CANDIDATE');
    expect(report.status).toBe('SPECIAL_PATTERN_REVIEW_REQUIRED');
    expect(report.finalSpecialPatternClassificationAuthorized).toBe(false);
  });

  test('routes a three-combination candidate without treating a complete set as automatic transformation', () => {
    const report = reviewResolvedSpecialPatternSignals('목', {
      year: pillar('갑', '해'),
      month: pillar('병', '묘'),
      day: pillar('갑', '미'),
      hour: pillar('경', '축'),
    });

    expect(report.signals).toContain('THREE_COMBINATION_CANDIDATE');
    expect(report.status).toBe('SPECIAL_PATTERN_REVIEW_REQUIRED');
    expect(report.ordinaryStrengthClassificationAuthorized).toBe(false);
  });

  test('no baseline signal does not authorize ordinary classification', () => {
    const report = reviewResolvedSpecialPatternSignals('목', {
      year: pillar('갑', '인'),
      month: pillar('병', '진'),
      day: pillar('갑', '축'),
      hour: pillar('경', '오'),
    });

    expect(report.status).toBe('NO_BASELINE_SPECIAL_SIGNAL');
    expect(report.signals).toEqual([]);
    expect(report.ordinaryStrengthClassificationAuthorized).toBe(false);
    expect(report.finalSpecialPatternClassificationAuthorized).toBe(false);
  });

  test('unknown-time snapshots stay indeterminate instead of using the unresolved base snapshot', () => {
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
    const report = buildI18ESpecialPatternReviewRouter(snapshot);

    expect(snapshot.scenarios.length).toBeGreaterThan(1);
    expect(report.status).toBe('INDETERMINATE_SCENARIO');
    expect(report.signals).toEqual([]);
    expect(report.ordinaryStrengthClassificationAuthorized).toBe(false);
  });

  test('router identity is deterministic', () => {
    const pillars = {
      year: pillar('기', '인'),
      month: pillar('병', '진'),
      day: pillar('갑', '자'),
      hour: pillar('경', '오'),
    };
    expect(reviewResolvedSpecialPatternSignals('목', pillars).reportId).toBe(
      reviewResolvedSpecialPatternSignals('목', pillars).reportId,
    );
  });
});
