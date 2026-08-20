import { describe, expect, test } from 'vitest';
import {
  buildI18DRootRelationReview,
  calculateCanonicalSajuSnapshot,
  reviewResolvedRootRelationEffects,
  type BranchFact,
  type CalculationPolicySnapshot,
  type EarthlyBranch,
  type FiveElement,
  type PillarFact,
} from '../src/index.js';

const policy: CalculationPolicySnapshot = {
  policyId: 'myeonghwa/i18d-test',
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

const BRANCH_ELEMENT: Readonly<Record<EarthlyBranch, FiveElement>> = {
  자: '수',
  축: '토',
  인: '목',
  묘: '목',
  진: '토',
  사: '화',
  오: '화',
  미: '토',
  신: '금',
  유: '금',
  술: '토',
  해: '수',
};

const BRANCH_YINYANG: Readonly<Record<EarthlyBranch, '양' | '음'>> = {
  자: '양',
  축: '음',
  인: '양',
  묘: '음',
  진: '양',
  사: '음',
  오: '양',
  미: '음',
  신: '양',
  유: '음',
  술: '양',
  해: '음',
};

const BRANCH_HANJA: Readonly<Record<EarthlyBranch, string>> = {
  자: '子',
  축: '丑',
  인: '寅',
  묘: '卯',
  진: '辰',
  사: '巳',
  오: '午',
  미: '未',
  신: '申',
  유: '酉',
  술: '戌',
  해: '亥',
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

describe('I18D root relation-effect review routing', () => {
  test('routes a clash touching a wood root without declaring damage', () => {
    const report = reviewResolvedRootRelationEffects('목', {
      year: pillar('묘'),
      month: pillar('유'),
      day: pillar('진'),
      hour: pillar('축'),
    });
    const year = report.rootPositions.find((root) => root.position === 'year');

    expect(report.status).toBe('RESOLVED_BASIS_ROUTED');
    expect(report.terminalDecision).toBe('RELATION_EFFECT_NOT_RESOLVED');
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
    expect(year?.branch).toBe('묘');
    expect(year?.reviewRequirements).toContain('CLASH_EFFECT_REVIEW_REQUIRED');
    expect(year?.relationEffect).toBe('unresolved');
    expect(year?.effectiveRootState).toBe('not_determined');
    expect(year?.numericWeight).toBe('not_assigned');
  });

  test('routes six-combination and three-combination candidates as review requirements only', () => {
    const six = reviewResolvedRootRelationEffects('목', {
      year: pillar('인'),
      month: pillar('해'),
      day: pillar('진'),
      hour: pillar('축'),
    });
    expect(
      six.rootPositions.some((root) =>
        root.reviewRequirements.includes('SIX_COMBINATION_EFFECT_REVIEW_REQUIRED'),
      ),
    ).toBe(true);

    const three = reviewResolvedRootRelationEffects('목', {
      year: pillar('해'),
      month: pillar('묘'),
      day: pillar('미'),
      hour: pillar('축'),
    });
    expect(
      three.rootPositions.filter((root) =>
        root.reviewRequirements.includes('THREE_COMBINATION_EFFECT_REVIEW_REQUIRED'),
      ),
    ).toHaveLength(3);
    expect(three.relationCandidates.some((candidate) => candidate.semantics.transformationEstablished)).toBe(false);
  });

  test('a root without tracked branch relation remains non-numeric and non-conclusive', () => {
    const report = reviewResolvedRootRelationEffects('목', {
      year: pillar('묘'),
      month: pillar('진'),
      day: pillar('축'),
      hour: pillar('자'),
    });
    const year = report.rootPositions.find((root) => root.position === 'year');

    expect(year?.reviewRequirements).toEqual([]);
    expect(year?.relationEffect).toBe('no_tracked_relation_candidate');
    expect(year?.effectiveRootState).toBe('not_determined');
  });

  test('unknown-time scenario snapshots are rejected from base-snapshot relation routing', () => {
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
    const report = buildI18DRootRelationReview(snapshot);

    expect(snapshot.scenarios.length).toBeGreaterThan(1);
    expect(report.status).toBe('SCENARIO_REVIEW_REQUIRED');
    expect(report.rootPositions).toEqual([]);
    expect(report.relationCandidates).toEqual([]);
    expect(report.terminalDecision).toBe('RELATION_EFFECT_NOT_RESOLVED');
  });

  test('review identity is deterministic for the same resolved structural input', () => {
    const pillars = {
      year: pillar('묘'),
      month: pillar('유'),
      day: pillar('진'),
      hour: pillar('축'),
    };
    expect(reviewResolvedRootRelationEffects('목', pillars).reviewId).toBe(
      reviewResolvedRootRelationEffects('목', pillars).reviewId,
    );
  });
});
