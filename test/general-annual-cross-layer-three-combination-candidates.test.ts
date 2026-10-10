import { describe, expect, test } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { resolved, unavailable } from '../src/contracts/common.js';
import type {
  CanonicalSajuSnapshot, PillarFact, PillarSlot,
} from '../src/contracts/calculation.js';
import type { ReadingRequest } from '../src/contracts/reading.js';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import {
  ANNUAL_CROSS_LAYER_TRIPLE_SOURCE,
  ANNUAL_CROSS_LAYER_TRIPLE_UNRESOLVED,
  inspectAnnualCrossLayerTripleCandidates,
} from '../src/research/general-annual-cross-layer-three-combination-candidates.js';

const BRANCH = {
  자: { value: '자', hanja: '子', element: '수', yinYang: '양' },
  인: { value: '인', hanja: '寅', element: '목', yinYang: '양' },
  오: { value: '오', hanja: '午', element: '화', yinYang: '양' },
  술: { value: '술', hanja: '戌', element: '토', yinYang: '양' },
  신: { value: '신', hanja: '申', element: '금', yinYang: '양' },
  진: { value: '진', hanja: '辰', element: '토', yinYang: '양' },
} as const;

type TestBranch = keyof typeof BRANCH;

function annual(year: number, instant: string): ReadingRequest {
  return {
    requestId: 'research-cross-temporal-triples',
    intent: { domain: 'general', temporalScope: 'annual' },
    targetPeriod: {
      scope: 'annual', year, timeZone: 'Asia/Seoul',
      referenceDateTime: instant, resolution: 'relative_current',
    },
  };
}

function fixture(options: {
  natal?: Partial<Record<PillarSlot, TestBranch>>;
  dayun?: TestBranch;
  unknownHour?: boolean;
  unknownLuck?: boolean;
  startYears?: number;
} = {}): CanonicalSajuSnapshot {
  const base = calculateCanonicalSajuSnapshot(
    {
      calendarType: 'solar',
      date: { year: 1990, month: 5, day: 15 },
      time: { known: true, hour: 14, minute: 30 },
      sexForTraditionalCalculation: 'male',
    },
    PRODUCTION_DEFAULT_CALCULATION_POLICY,
    { now: new Date('2026-10-10T12:00:00.000Z') },
  );
  if (base.pillars.day.status !== 'resolved') throw new Error('Day pillar unavailable');
  const basis = base.pillars.day.value;
  const age = options.startYears ?? 1;
  const luckPillar: PillarFact = options.dayun
    ? { ...basis, branch: BRANCH[options.dayun] }
    : basis;
  const nextPillars = { ...base.pillars };
  for (const slot of ['year', 'month', 'day', 'hour'] as const) {
    const nextBranch = options.natal?.[slot];
    if (!nextBranch) continue;
    const original = base.pillars[slot];
    if (original.status !== 'resolved') throw new Error('Natal pillar unavailable: ' + slot);
    nextPillars[slot] = resolved({ ...original.value, branch: BRANCH[nextBranch] });
  }
  return {
    ...base,
    // Controlled structural counterexamples; not real birth-chart or luck-cycle claims.
    pillars: options.unknownHour
      ? { ...nextPillars, hour: unavailable('test-hour-unavailable') }
      : nextPillars,
    luckCycle: options.unknownLuck
      ? unavailable('test-luck-unavailable')
      : resolved({
          direction: 'forward',
          start: { age, years: age, months: 0, days: 0 },
          pillars: Array.from({ length: 10 }, (_, index) => ({
            age: age + 10 * index,
            pillar: luckPillar,
          })),
        }),
  };
}

function checked(
  output: ReturnType<typeof inspectAnnualCrossLayerTripleCandidates>,
): Extract<typeof output, { status: 'research_triple_candidates_only_hold' }> {
  if (output.status !== 'research_triple_candidates_only_hold') {
    throw new Error('Expected structural-only triple observation');
  }
  return output;
}

describe('Annual cross-layer triple structural candidates / research-only', () => {
  test('complete 寅午戌 across annual, Dayun and natal is a candidate, not 化局', () => {
    const natal = fixture({ dayun: '인', natal: { day: '술' } });
    const before = JSON.stringify(natal);
    const req = annual(2026, '2026-06-15T12:00:00.000Z');
    const output = checked(inspectAnnualCrossLayerTripleCandidates(natal, req));
    expect(output.annualBranch).toBe('오');
    expect(output.dayunBranch).toBe('인');
    expect(output.tripleCheckCount).toBe(16);
    expect(output.pairCheckCountUnchanged).toBe(9);
    expect(output.checks).toHaveLength(16);
    expect(new Set(output.checks.map((x) => x.slots.join('|'))).size).toBe(16);
    expect(output.checks.filter((x) => x.scope === 'annual_dayun_natal')).toHaveLength(4);
    expect(output.checks.filter((x) => x.scope === 'annual_two_natal')).toHaveLength(6);
    expect(output.checks.filter((x) => x.scope === 'dayun_two_natal')).toHaveLength(6);
    const match = output.checks.find((x) =>
      x.slots.join('|') === 'annual|dayun|natal:day');
    expect(match).toMatchObject({
      observedBranches: ['오', '인', '술'],
      candidateKind: 'branch_three_combination',
      structuralMatchOnly: true,
      transformationEstablished: false,
      severityOrOutcomeEstablished: false,
    });
    expect(match?.matchingSourceIds).toContain('SRC-T0-SANMING-TONGHUI-V2');
    expect(output.authority.pairAndTriplePrecedenceAdmitted).toBe(false);
    expect(output.appliedTransformation).toBeNull();
    expect(output.winningRelation).toBeNull();
    expect(output.personalFortuneClaim).toBeNull();
    expect(output.unresolved).toBe(ANNUAL_CROSS_LAYER_TRIPLE_UNRESOLVED);
    const { auditHash, ...material } = output;
    expect(auditHash).toBe(deterministicContentHash(material));
    expect(inspectAnnualCrossLayerTripleCandidates(natal, req)).toEqual(output);
    expect(JSON.stringify(natal)).toBe(before);
  });

  test('two natal pillars + annual: distinguish scope from all-three-layer', () => {
    const output = checked(inspectAnnualCrossLayerTripleCandidates(
      fixture({
        dayun: '자',
        natal: { year: '인', month: '술', day: '자', hour: '자' },
      }),
      annual(2026, '2026-06-15T12:00:00.000Z'),
    ));
    const match = output.checks.find((x) =>
      x.slots.join('|') === 'annual|natal:year|natal:month');
    expect(match).toMatchObject({
      scope: 'annual_two_natal',
      observedBranches: ['오', '인', '술'],
      candidateKind: 'branch_three_combination',
      transformationEstablished: false,
    });
    expect(output.authority.consumerClaimAdmitted).toBe(false);
  });

  test('Dayun + two natal: detect 申子辰 without an annual-based rule', () => {
    const output = checked(inspectAnnualCrossLayerTripleCandidates(
      fixture({
        dayun: '신',
        natal: { year: '자', month: '진', day: '자', hour: '자' },
      }),
      annual(2026, '2026-06-15T12:00:00.000Z'),
    ));
    const match = output.checks.find((x) =>
      x.slots.join('|') === 'dayun|natal:year|natal:month');
    expect(match).toMatchObject({
      scope: 'dayun_two_natal',
      observedBranches: ['신', '자', '진'],
      candidateKind: 'branch_three_combination',
      severityOrOutcomeEstablished: false,
    });
    expect(output.authority.classicalSeverityAdmitted).toBe(false);
  });

  test('two distinct natal pillars with the same branch remain separately identified', () => {
    const output = checked(inspectAnnualCrossLayerTripleCandidates(
      fixture({
        dayun: '인',
        natal: { year: '술', month: '술', day: '자', hour: '자' },
      }),
      annual(2026, '2026-06-15T12:00:00.000Z'),
    ));
    const matches = output.checks.filter((x) =>
      x.scope === 'annual_dayun_natal' && x.candidateKind !== null);
    expect(matches.map((x) => x.slots.join('|'))).toEqual([
      'annual|dayun|natal:year', 'annual|dayun|natal:month',
    ]);
    expect(output.observedCandidateCount).toBeGreaterThanOrEqual(2);
    expect(output.authority.tripleFoundDoesNotProveTransformation).toBe(true);
  });

  test('incomplete triple is not silently promoted and zero matches is not reassurance', () => {
    const output = checked(inspectAnnualCrossLayerTripleCandidates(
      fixture({
        dayun: '자',
        natal: { year: '자', month: '자', day: '자', hour: '자' },
      }),
      annual(2026, '2026-06-15T12:00:00.000Z'),
    ));
    expect(output.observedCandidateCount).toBe(0);
    expect(output.checks.every((x) => x.candidateKind === null &&
      x.matchingSourceIds.length === 0)).toBe(true);
    expect(output.authority.missingTripleDoesNotMeanSafety).toBe(true);
    expect(output.personalFortuneClaim).toBeNull();
    expect(ANNUAL_CROSS_LAYER_TRIPLE_SOURCE.automaticTransformationAuthorized).toBe(false);
    expect(ANNUAL_CROSS_LAYER_TRIPLE_SOURCE.witness)
      .toBe('digital_transcription_not_reverified_against_print');
  });

  test('2026 and 2027 LiChun boundaries change candidate inputs, never meaning authority', () => {
    const natal = fixture({ dayun: '인', natal: { day: '술' } });
    const dates = [
      annual(2026, '2026-02-03T14:59:59.000Z'),
      annual(2026, '2026-02-03T15:00:00.000Z'),
      annual(2027, '2027-02-03T15:00:00.000Z'),
    ];
    const results = dates.map((r) => checked(inspectAnnualCrossLayerTripleCandidates(natal, r)));
    expect(results.map((x) => x.effectiveYear)).toEqual([2025, 2026, 2027]);
    expect(results.map((x) => x.annualBranch)).toEqual(['사', '오', '미']);
    expect(results[0]?.auditHash).not.toBe(results[1]?.auditHash);
    expect(results[1]?.auditHash).not.toBe(results[2]?.auditHash);
    expect(results.every((x) => !x.authority.productionAuthorized &&
      !x.authority.realWorldOutcomeAdmitted)).toBe(true);
  });

  test('unknown natal hour, Dayun gap, unsupported E1 and Monthly fail closed', () => {
    const req = annual(2026, '2026-06-15T12:00:00.000Z');
    expect(inspectAnnualCrossLayerTripleCandidates(
      fixture({ unknownHour: true }), req,
    )).toMatchObject({ status: 'input_unavailable', reasonCode: 'hour' });
    expect(inspectAnnualCrossLayerTripleCandidates(
      fixture({ unknownLuck: true }), req,
    )).toMatchObject({ status: 'input_unavailable', reasonCode: 'luck_cycle_unavailable' });
    expect(inspectAnnualCrossLayerTripleCandidates(
      fixture({ startYears: 6 }), req,
    )).toMatchObject({ status: 'input_unavailable', reasonCode: 'DAYUN_MULTIPLE_SEGMENTS' });
    expect(inspectAnnualCrossLayerTripleCandidates(
      fixture(), annual(2028, '2028-02-04T01:00:00.000Z'),
    )).toEqual({
      status: 'input_unavailable', reasonCode: 'ANNUAL_E1_DATE_UNAVAILABLE',
      productionAuthorized: false,
    });
    const monthly: ReadingRequest = {
      ...req,
      intent: { domain: 'general', temporalScope: 'monthly' },
      targetPeriod: {
        scope: 'monthly', year: 2026, month: 6,
        timeZone: 'Asia/Seoul',
        referenceDateTime: '2026-06-15T12:00:00.000Z',
        resolution: 'relative_current',
      },
    };
    expect(inspectAnnualCrossLayerTripleCandidates(
      fixture(), monthly,
    )).toEqual({
      status: 'input_unavailable', reasonCode: 'ANNUAL_REQUEST_REQUIRED',
      productionAuthorized: false,
    });
  });
});
