import { describe, expect, test } from 'vitest';
import {
  buildResolvedI27ChallengeMechanismForceEvidence,
  challengeTargetElement,
  type EarthlyBranch,
  type FiveElement,
  type HeavenlyStem,
  type PillarFact,
} from '../src/index.js';

const STEM: Readonly<Record<HeavenlyStem, { hanja: string; element: FiveElement; yinYang: '양' | '음' }>> = {
  갑: { hanja: '甲', element: '목', yinYang: '양' }, 을: { hanja: '乙', element: '목', yinYang: '음' },
  병: { hanja: '丙', element: '화', yinYang: '양' }, 정: { hanja: '丁', element: '화', yinYang: '음' },
  무: { hanja: '戊', element: '토', yinYang: '양' }, 기: { hanja: '己', element: '토', yinYang: '음' },
  경: { hanja: '庚', element: '금', yinYang: '양' }, 신: { hanja: '辛', element: '금', yinYang: '음' },
  임: { hanja: '壬', element: '수', yinYang: '양' }, 계: { hanja: '癸', element: '수', yinYang: '음' },
};

const BRANCH: Readonly<Record<EarthlyBranch, { hanja: string; element: FiveElement; yinYang: '양' | '음' }>> = {
  자: { hanja: '子', element: '수', yinYang: '양' }, 축: { hanja: '丑', element: '토', yinYang: '음' },
  인: { hanja: '寅', element: '목', yinYang: '양' }, 묘: { hanja: '卯', element: '목', yinYang: '음' },
  진: { hanja: '辰', element: '토', yinYang: '양' }, 사: { hanja: '巳', element: '화', yinYang: '음' },
  오: { hanja: '午', element: '화', yinYang: '양' }, 미: { hanja: '未', element: '토', yinYang: '음' },
  신: { hanja: '申', element: '금', yinYang: '양' }, 유: { hanja: '酉', element: '금', yinYang: '음' },
  술: { hanja: '戌', element: '토', yinYang: '양' }, 해: { hanja: '亥', element: '수', yinYang: '음' },
};

function pillar(stem: HeavenlyStem, branch: EarthlyBranch): PillarFact {
  return {
    stem: { value: stem, ...STEM[stem] },
    branch: { value: branch, ...BRANCH[branch] },
  };
}

describe('I27 challenge mechanism structural force evidence', () => {
  test('derives output, wealth, and officer target elements from day-master element', () => {
    expect(challengeTargetElement('목', 'OUTPUT_LEAKAGE')).toBe('화');
    expect(challengeTargetElement('목', 'WEALTH_EXPENDITURE_CONTROL')).toBe('토');
    expect(challengeTargetElement('목', 'OFFICER_CONTROL_PRESSURE')).toBe('금');

    expect(challengeTargetElement('화', 'OUTPUT_LEAKAGE')).toBe('토');
    expect(challengeTargetElement('화', 'WEALTH_EXPENDITURE_CONTROL')).toBe('금');
    expect(challengeTargetElement('화', 'OFFICER_CONTROL_PRESSURE')).toBe('수');

    expect(challengeTargetElement('토', 'OUTPUT_LEAKAGE')).toBe('금');
    expect(challengeTargetElement('토', 'WEALTH_EXPENDITURE_CONTROL')).toBe('수');
    expect(challengeTargetElement('토', 'OFFICER_CONTROL_PRESSURE')).toBe('목');

    expect(challengeTargetElement('금', 'OUTPUT_LEAKAGE')).toBe('수');
    expect(challengeTargetElement('금', 'WEALTH_EXPENDITURE_CONTROL')).toBe('목');
    expect(challengeTargetElement('금', 'OFFICER_CONTROL_PRESSURE')).toBe('화');

    expect(challengeTargetElement('수', 'OUTPUT_LEAKAGE')).toBe('목');
    expect(challengeTargetElement('수', 'WEALTH_EXPENDITURE_CONTROL')).toBe('화');
    expect(challengeTargetElement('수', 'OFFICER_CONTROL_PRESSURE')).toBe('토');
  });

  test('preserves visible-stem, branch-main-element, and hidden-membership channels separately', () => {
    const report = buildResolvedI27ChallengeMechanismForceEvidence({
      year: pillar('임', '자'),
      month: pillar('병', '인'),
      day: pillar('갑', '진'),
      hour: pillar('경', '유'),
    });

    const output = report.mechanisms.find((item) => item.mechanism === 'OUTPUT_LEAKAGE');
    const wealth = report.mechanisms.find((item) => item.mechanism === 'WEALTH_EXPENDITURE_CONTROL');
    const officer = report.mechanisms.find((item) => item.mechanism === 'OFFICER_CONTROL_PRESSURE');

    expect(report.status).toBe('RESOLVED_EVIDENCE');
    expect(report.dayMasterElement).toBe('목');
    expect(output?.targetElement).toBe('화');
    expect(output?.visibleStemPositions).toContain('month');
    expect(output?.hiddenMembershipPositions).toContain('month');

    expect(wealth?.targetElement).toBe('토');
    expect(wealth?.branchMainElementPositions).toContain('day');

    expect(officer?.targetElement).toBe('금');
    expect(officer?.visibleStemPositions).toContain('hour');
    expect(officer?.branchMainElementPositions).toContain('hour');
    expect(officer?.hiddenMembershipPositions).toContain('hour');
  });

  test('seasonal phase is emitted as evidence without effective-force resolution', () => {
    const report = buildResolvedI27ChallengeMechanismForceEvidence({
      year: pillar('임', '자'),
      month: pillar('병', '인'),
      day: pillar('갑', '진'),
      hour: pillar('경', '유'),
    });

    expect(report.commandElement).toBe('목');
    expect(report.mechanisms.find((item) => item.mechanism === 'OUTPUT_LEAKAGE')?.seasonalPhase).toBe('相');
    expect(report.mechanisms.find((item) => item.mechanism === 'WEALTH_EXPENDITURE_CONTROL')?.seasonalPhase).toBe('死');
    expect(report.mechanisms.find((item) => item.mechanism === 'OFFICER_CONTROL_PRESSURE')?.seasonalPhase).toBe('囚');
    expect(report.mechanisms.every((item) => item.effectiveForce === 'not_determined')).toBe(true);
    expect(report.mechanisms.every((item) => item.numericMagnitude === 'not_assigned')).toBe(true);
  });

  test('fails closed when all four resolved pillars are not available', () => {
    const report = buildResolvedI27ChallengeMechanismForceEvidence({
      month: pillar('병', '인'),
      day: pillar('갑', '진'),
    });

    expect(report.status).toBe('PILLARS_UNRESOLVED');
    expect(report.mechanisms).toEqual([]);
    expect(report.challengeEffectVerdict).toBe('not_determined');
    expect(report.classificationAuthorized).toBe(false);
  });

  test('report identity is deterministic for identical resolved pillars', () => {
    const pillars = {
      year: pillar('임', '자'),
      month: pillar('병', '인'),
      day: pillar('갑', '진'),
      hour: pillar('경', '유'),
    };
    expect(buildResolvedI27ChallengeMechanismForceEvidence(pillars).reportId).toBe(
      buildResolvedI27ChallengeMechanismForceEvidence(pillars).reportId,
    );
  });
});
