import { describe, expect, test } from 'vitest';
import {
  buildI18DRootRelationReview,
  buildI19PostRelationRootEffectReview,
  calculateCanonicalSajuSnapshot,
  reviewResolvedRootRelationEffects,
  type BranchFact,
  type CalculationPolicySnapshot,
  type EarthlyBranch,
  type FiveElement,
  type PillarFact,
} from '../src/index.js';

const policy: CalculationPolicySnapshot = {
  policyId: 'myeonghwa/i19-test',
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
  자: '수', 축: '토', 인: '목', 묘: '목', 진: '토', 사: '화',
  오: '화', 미: '토', 신: '금', 유: '금', 술: '토', 해: '수',
};
const BRANCH_YINYANG: Readonly<Record<EarthlyBranch, '양' | '음'>> = {
  자: '양', 축: '음', 인: '양', 묘: '음', 진: '양', 사: '음',
  오: '양', 미: '음', 신: '양', 유: '음', 술: '양', 해: '음',
};
const BRANCH_HANJA: Readonly<Record<EarthlyBranch, string>> = {
  자: '子', 축: '丑', 인: '寅', 묘: '卯', 진: '辰', 사: '巳',
  오: '午', 미: '未', 신: '申', 유: '酉', 술: '戌', 해: '亥',
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

describe('I19 post-relation root effect methodology review', () => {
  test('clash effect stays unresolved until independent relative-force context exists', () => {
    const upstream = reviewResolvedRootRelationEffects('목', {
      year: pillar('묘'),
      month: pillar('유'),
      day: pillar('진'),
      hour: pillar('축'),
    });
    const report = buildI19PostRelationRootEffectReview(upstream);
    const year = report.items.find((item) => item.position === 'year');

    expect(report.terminalDecision).toBe(
      'ROOT_EFFECT_RESOLUTION_BLOCKED_BY_PRECLASSIFICATION_DEPENDENCIES',
    );
    expect(report.circularityRiskDetected).toBe(true);
    expect(year?.state).toBe('UNRESOLVED_CLASH_RELATIVE_FORCE');
    expect(year?.dependencies).toEqual([
      'EXTERNAL_SUPPORT_RESCUE',
      'RELATIVE_BRANCH_FORCE',
      'SEASONAL_COMMAND_CONTEXT',
    ]);
    expect(year?.effectiveRootState).toBe('not_determined');
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
  });

  test('combination presence requires separate transformation and precedence conditions', () => {
    const upstream = reviewResolvedRootRelationEffects('목', {
      year: pillar('인'),
      month: pillar('해'),
      day: pillar('진'),
      hour: pillar('축'),
    });
    const report = buildI19PostRelationRootEffectReview(upstream);
    const routed = report.items.filter((item) => item.requirements.length > 0);

    expect(routed.length).toBeGreaterThan(0);
    for (const item of routed) {
      expect(item.state).toBe('UNRESOLVED_COMBINATION_CONDITIONS');
      expect(item.dependencies).toContain('COMBINATION_TRANSFORMATION_CONDITIONS');
      expect(item.dependencies).toContain('COMPETING_RELATION_PRECEDENCE');
      expect(item.finalEffectAuthorized).toBe(false);
    }
    expect(report.circularityRiskDetected).toBe(false);
  });

  test('absence of a tracked relation candidate is not mislabeled as preserved root', () => {
    const upstream = reviewResolvedRootRelationEffects('목', {
      year: pillar('묘'),
      month: pillar('진'),
      day: pillar('축'),
      hour: pillar('자'),
    });
    const report = buildI19PostRelationRootEffectReview(upstream);
    const year = report.items.find((item) => item.position === 'year');

    expect(year?.state).toBe('NO_TRACKED_RELATION_CANDIDATE');
    expect(year?.dependencies).toEqual([]);
    expect(year?.effectiveRootState).toBe('not_determined');
    expect('preserved' in (year ?? {})).toBe(false);
  });

  test('unknown-time base snapshots remain indeterminate before root-effect resolution', () => {
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
    const upstream = buildI18DRootRelationReview(snapshot);
    const report = buildI19PostRelationRootEffectReview(upstream);

    expect(snapshot.scenarios.length).toBeGreaterThan(1);
    expect(report.terminalDecision).toBe('INPUT_INDETERMINATE');
    expect(report.items).toEqual([]);
    expect(report.preClassificationDependencyRequired).toBe(true);
    expect(report.classificationAuthorized).toBe(false);
  });

  test('review identity is deterministic', () => {
    const upstream = reviewResolvedRootRelationEffects('목', {
      year: pillar('묘'),
      month: pillar('유'),
      day: pillar('진'),
      hour: pillar('축'),
    });
    expect(buildI19PostRelationRootEffectReview(upstream).reviewId).toBe(
      buildI19PostRelationRootEffectReview(upstream).reviewId,
    );
  });
});
