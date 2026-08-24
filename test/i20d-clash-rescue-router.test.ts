import { describe, expect, test } from 'vitest';
import {
  buildI20DClashRescueRouter,
  reviewResolvedRootRelationEffects,
  type BranchFact,
  type EarthlyBranch,
  type FiveElement,
  type PillarFact,
} from '../src/index.js';

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

function pillar(value: EarthlyBranch): PillarFact {
  return {
    stem: { value: '갑', hanja: '甲', element: '목', yinYang: '양' },
    branch: branch(value),
  };
}

describe('I20D clash rescue relation router', () => {
  test('routes a six-combination touching a clash participant without declaring settlement', () => {
    const review = reviewResolvedRootRelationEffects('목', {
      year: pillar('자'),
      month: pillar('오'),
      day: pillar('축'),
      hour: pillar('진'),
    });
    const report = buildI20DClashRescueRouter(review);
    const candidate = report.candidates.find(
      (item) => item.rescueKind === 'SIX_COMBINATION_RESCUE_CANDIDATE',
    );

    expect(report.status).toBe('RESOLVED_RESCUE_ROUTING');
    expect(candidate).toBeDefined();
    expect(candidate?.sharedClashParticipantPositions).toEqual(['year']);
    expect(candidate?.rescueStrength).toBe('not_evaluated');
    expect(candidate?.rescueEffect).toBe('not_resolved');
    expect(candidate?.clashSettlement).toBe('not_determined');
    expect(candidate?.relativeForceVerdict).toBe('not_determined');
    expect(candidate?.rootEffectVerdict).toBe('not_determined');
    expect(candidate?.numericScore).toBe('not_assigned');
    expect(report.rescueEffectAuthorized).toBe(false);
    expect(report.clashSettlementAuthorized).toBe(false);
  });

  test('routes a full three-combination touching a clash participant as review only', () => {
    const review = reviewResolvedRootRelationEffects('목', {
      year: pillar('자'),
      month: pillar('오'),
      day: pillar('신'),
      hour: pillar('진'),
    });
    const report = buildI20DClashRescueRouter(review);
    const candidate = report.candidates.find(
      (item) => item.rescueKind === 'THREE_COMBINATION_RESCUE_CANDIDATE',
    );

    expect(candidate).toBeDefined();
    expect(candidate?.sharedClashParticipantPositions).toEqual(['year']);
    expect(candidate?.rescueEffect).toBe('not_resolved');
    expect(candidate?.clashSettlement).toBe('not_determined');
    expect(report.rootEffectResolutionAuthorized).toBe(false);
  });

  test('absence of a rescue relation does not imply that the clash is unmitigated', () => {
    const review = reviewResolvedRootRelationEffects('목', {
      year: pillar('자'),
      month: pillar('오'),
      day: pillar('진'),
      hour: pillar('해'),
    });
    const report = buildI20DClashRescueRouter(review);

    expect(report.status).toBe('RESOLVED_RESCUE_ROUTING');
    expect(report.candidates).toEqual([]);
    expect(report.clashSettlementAuthorized).toBe(false);
    expect(report.relativeForceVerdictAuthorized).toBe(false);
  });

  test('unresolved root relation review remains fail-closed', () => {
    const review = reviewResolvedRootRelationEffects('목', {
      year: pillar('자'),
      month: pillar('오'),
      day: pillar('축'),
      hour: pillar('진'),
    });
    const report = buildI20DClashRescueRouter({ ...review, status: 'SCENARIO_REVIEW_REQUIRED' });

    expect(report.status).toBe('INPUT_INDETERMINATE');
    expect(report.candidates).toEqual([]);
    expect(report.rescueEffectAuthorized).toBe(false);
  });

  test('router identity is deterministic', () => {
    const review = reviewResolvedRootRelationEffects('목', {
      year: pillar('자'),
      month: pillar('오'),
      day: pillar('축'),
      hour: pillar('진'),
    });

    expect(buildI20DClashRescueRouter(review).reportId).toBe(
      buildI20DClashRescueRouter(review).reportId,
    );
  });
});
