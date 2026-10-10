import { describe, expect, test } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { resolved, unavailable } from '../src/contracts/common.js';
import type {
  CanonicalSajuSnapshot, PillarFact,
} from '../src/contracts/calculation.js';
import type { ReadingRequest } from '../src/contracts/reading.js';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import {
  PIAN_GUAN_COEXISTENCE_TEXT_ANCHORS,
  PIAN_GUAN_COEXISTENCE_UNRESOLVED,
  buildPianGuanCoexistenceTextEvidence,
  auditPianGuanCoexistingRelationCounterexamples,
} from '../src/research/general-annual-pian-guan-coexistence-counterexamples.js';

function annual(year: number, time: string): ReadingRequest {
  return {
    requestId: 'research-pian-guan-coexistence',
    intent: { domain: 'general', temporalScope: 'annual' },
    targetPeriod: {
      scope: 'annual', year, timeZone: 'Asia/Seoul',
      referenceDateTime: time, resolution: 'relative_current',
    },
  };
}

const BRANCH = {
  자: { value: '자', hanja: '子', element: '수', yinYang: '양' },
  오: { value: '오', hanja: '午', element: '화', yinYang: '양' },
} as const;

const STEM = {
  병: { value: '병', hanja: '丙', element: '화', yinYang: '양' },
  신: { value: '신', hanja: '辛', element: '금', yinYang: '음' },
} as const;

function fixture(options: {
  dayunStem?: '병' | '신';
  dayunBranch?: '자' | '오';
  natalDayBranch?: '자' | '오';
  natalMonthBranch?: '자';
  unknownLuck?: boolean;
  unknownHour?: boolean;
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
  if (base.pillars.day.status !== 'resolved' ||
      base.pillars.month.status !== 'resolved') {
    throw new Error('Test fixture requires resolved natal day and month');
  }
  const baseDay: PillarFact = base.pillars.day.value;
  const baseMonth: PillarFact = base.pillars.month.value;
  // This is a controlled *synthetic* structural fixture, not a claim about
  // one historically possible personal birth chart or dayun sequence.
  const dayun: PillarFact = {
    stem: options.dayunStem === undefined ? baseDay.stem : STEM[options.dayunStem],
    branch: options.dayunBranch === undefined ? baseDay.branch : BRANCH[options.dayunBranch],
  };
  const years = options.startYears ?? 1;
  return {
    ...base,
    luckCycle: options.unknownLuck
      ? unavailable('test-luck-unavailable')
      : resolved({
          direction: 'forward',
          start: { age: years, years, months: 0, days: 0 },
          pillars: Array.from({ length: 10 }, (_, i) => ({
            age: years + i * 10, pillar: dayun,
          })),
        }),
    pillars: {
      ...base.pillars,
      ...(options.natalDayBranch
        ? { day: resolved({
          ...baseDay, branch: BRANCH[options.natalDayBranch],
        }) }
        : {}),
      ...(options.natalMonthBranch
        ? { month: resolved({
          ...baseMonth, branch: BRANCH[options.natalMonthBranch],
        }) }
        : {}),
      ...(options.unknownHour ? {
        hour: unavailable('test-hour-unavailable'),
      } : {}),
    },
  };
}

describe('Pian Guan / three-layer competing-relationship counterexample audit', () => {
  test('source quotations are identified as digital witnesses, never executable forecasts', () => {
    const witness = buildPianGuanCoexistenceTextEvidence();
    expect(witness.anchors).toBe(PIAN_GUAN_COEXISTENCE_TEXT_ANCHORS);
    expect(witness.anchors.map((x) => x.section))
      .toEqual(['論太歲', '總論歲運', '論太歲']);
    expect(witness.anchors.every((x) =>
      x.witnessStatus === 'digital_transcription_only' &&
      x.fullPrintedLineRechecked === false,
    )).toBe(true);
    expect(witness.method).toMatchObject({
      exactJiaZiExampleGeneralized: false,
      historicalMisfortuneClaimAdmitted: false,
      realWorldOutcomeValidated: false,
      personalMeaningApproved: false,
      productionAuthorized: false,
    });
    expect(witness.unresolved).toBe(PIAN_GUAN_COEXISTENCE_UNRESOLVED);
    const { evidenceHash, ...material } = witness;
    expect(evidenceHash).toBe(deterministicContentHash(material));
  });

  test('same annual/dayun pillars may coexist with two observed clashes to the natal day', () => {
    const natal = fixture({
      dayunStem: '병', dayunBranch: '오', natalDayBranch: '자',
    });
    const original = JSON.stringify(natal);
    const request = annual(2026, '2026-06-15T12:00:00.000Z');
    const result = auditPianGuanCoexistingRelationCounterexamples(natal, request);
    expect(result.status).toBe('research_structural_counterexamples_only_hold');
    if (result.status !== 'research_structural_counterexamples_only_hold') return;
    expect(result.annualStem).toBe('병');
    expect(result.annualBranch).toBe('오');
    expect(result.dayunStem).toBe('병');
    expect(result.dayunBranch).toBe('오');
    expect(result.pairUniverseCount).toBe(9);
    const same = result.counterexamples.find((x) =>
      x.id === 'IDENTICAL_ANNUAL_AND_DAYUN_PILLARS');
    expect(same).toMatchObject({
      observedPairKeys: [],
      witnessAnchorId: 'TX-ANNUAL-DAYUN-SAME-PILLAR',
      sourceHistoricalOutcomeApplied: null,
      meaningOrSeverity: null,
    });
    const parallel = result.counterexamples.find((x) =>
      x.id === 'PARALLEL_TEMPORAL_MATCH_TO_NATAL_DAY');
    expect(parallel).toMatchObject({
      observedPairKeys: ['annual:natal:day', 'dayun:natal:day'],
      witnessAnchorId: null,
      winningRelation: null,
      consumerClaim: null,
    });
    expect(result.exactHistoricalGengJiaExample).toBe(false);
    expect(result.gates.samePillarHistoricalOutcomeAuthorized).toBe(false);
    expect(result.possibleTraditionalOutcome).toBeNull();
    expect(result.modernPersonalEvent).toBeNull();
    expect(result.interpretationClaim).toBeNull();
    const { auditHash, ...material } = result;
    expect(auditHash).toBe(deterministicContentHash(material));
    expect(auditPianGuanCoexistingRelationCounterexamples(natal, request))
      .toEqual(result);
    expect(JSON.stringify(natal)).toBe(original);
  });

  test('a stem combination and branch clash in the same temporal pair are not ranked or cancelled', () => {
    const result = auditPianGuanCoexistingRelationCounterexamples(
      fixture({
        dayunStem: '신', dayunBranch: '자',
        natalDayBranch: '자', natalMonthBranch: '자',
      }),
      annual(2026, '2026-06-15T12:00:00.000Z'),
    );
    expect(result.status).toBe('research_structural_counterexamples_only_hold');
    if (result.status !== 'research_structural_counterexamples_only_hold') return;
    expect(result.counterexamples).toEqual(expect.arrayContaining([
      expect.objectContaining({
        id: 'MULTIPLE_CANDIDATES_WITHIN_ONE_PAIR',
        observedPairKeys: ['annual:dayun'],
        sourceHistoricalOutcomeApplied: null,
        winningRelation: null,
        meaningOrSeverity: null,
      }),
      expect.objectContaining({
        id: 'MONTH_BRANCH_CLASH_OBSERVED',
        observedPairKeys: ['annual:natal:month'],
        witnessAnchorId: 'TX-TEMPORAL-MONTH-CLASH',
      }),
      expect.objectContaining({
        id: 'ANNUAL_DAYUN_AND_NATAL_RELATIONS_COEXIST',
        observedOnly: true,
      }),
    ]));
    expect(result.counterexamples.find((x) =>
      x.id === 'IDENTICAL_ANNUAL_AND_DAYUN_PILLARS')).toBeUndefined();
    expect(result.gates.monthClashHistoricalOutcomeAuthorized).toBe(false);
    expect(result.gates.crossPairConflictResolverAuthorized).toBe(false);
    expect(result.gates.winnerOrSeverityAuthorized).toBe(false);
    expect(result.modernPersonalEvent).toBeNull();
  });

  test('LiChun transition changes the observed annual identity, not authority', () => {
    const natal = fixture({ dayunStem: '병', dayunBranch: '오' });
    const dates = [
      annual(2026, '2026-02-03T14:59:59.000Z'),
      annual(2026, '2026-02-03T15:00:00.000Z'),
      annual(2027, '2027-02-03T15:00:00.000Z'),
    ];
    const result = dates.map((x) => auditPianGuanCoexistingRelationCounterexamples(natal, x));
    expect(result.map((x) => x.status)).toEqual([
      'research_structural_counterexamples_only_hold',
      'research_structural_counterexamples_only_hold',
      'research_structural_counterexamples_only_hold',
    ]);
    const observed = result.filter((x): x is Extract<typeof x, {
      status: 'research_structural_counterexamples_only_hold'
    }> => x.status === 'research_structural_counterexamples_only_hold');
    expect(observed.map((x) => x.annualStem)).toEqual(['을', '병', '정']);
    expect(observed[0]?.counterexamples.some(
      (x) => x.id === 'IDENTICAL_ANNUAL_AND_DAYUN_PILLARS',
    )).toBe(false);
    expect(observed[1]?.counterexamples.some(
      (x) => x.id === 'IDENTICAL_ANNUAL_AND_DAYUN_PILLARS',
    )).toBe(true);
    expect(observed[2]?.counterexamples.some(
      (x) => x.id === 'IDENTICAL_ANNUAL_AND_DAYUN_PILLARS',
    )).toBe(false);
    expect(observed.every((x) => !x.gates.productionAuthorized)).toBe(true);
    expect(observed[0]?.auditHash).not.toBe(observed[1]?.auditHash);
  });

  test('unknown inputs, Dayun crossover and monthly/unsupported annual requests fail closed', () => {
    const req = annual(2026, '2026-06-15T12:00:00.000Z');
    expect(auditPianGuanCoexistingRelationCounterexamples(
      fixture({ unknownHour: true }), req,
    )).toMatchObject({
      status: 'input_unavailable', reasonCode: 'hour',
    });
    expect(auditPianGuanCoexistingRelationCounterexamples(
      fixture({ unknownLuck: true }), req,
    )).toMatchObject({
      status: 'input_unavailable', reasonCode: 'luck_cycle_unavailable',
    });
    expect(auditPianGuanCoexistingRelationCounterexamples(
      fixture({ startYears: 6 }), req,
    )).toMatchObject({
      status: 'input_unavailable', reasonCode: 'DAYUN_MULTIPLE_SEGMENTS',
    });
    expect(auditPianGuanCoexistingRelationCounterexamples(
      fixture(), annual(2028, '2028-02-04T01:00:00.000Z'),
    )).toEqual({
      status: 'input_unavailable',
      reasonCode: 'ANNUAL_E1_DATE_UNAVAILABLE',
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
    expect(auditPianGuanCoexistingRelationCounterexamples(
      fixture(), monthly,
    )).toEqual({
      status: 'input_unavailable',
      reasonCode: 'ANNUAL_REQUEST_REQUIRED',
      productionAuthorized: false,
    });
  });
});
