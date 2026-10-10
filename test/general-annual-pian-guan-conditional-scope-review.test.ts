import { describe, expect, test } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { resolved, unavailable } from '../src/contracts/common.js';
import type { CanonicalSajuSnapshot, PillarFact } from '../src/contracts/calculation.js';
import type { ReadingRequest } from '../src/contracts/reading.js';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import {
  PIAN_GUAN_CONDITIONAL_CLAUSE_SCOPES,
  PIAN_GUAN_CONDITIONAL_UNRESOLVED,
  PIAN_GUAN_CONDITIONAL_WITNESSES,
  buildPianGuanConditionalHistoricalScopeReview,
  inspectPianGuanConditionalHistoricalScope,
  reviewPianGuanConditionalScopeForAnnualRequest,
} from '../src/research/general-annual-pian-guan-conditional-scope-review.js';

function annual(year: number, date: string): ReadingRequest {
  return {
    requestId: 'pian-guan-conditional-scope',
    intent: { domain: 'general', temporalScope: 'annual' },
    targetPeriod: {
      scope: 'annual', year, timeZone: 'Asia/Seoul',
      referenceDateTime: date, resolution: 'relative_current',
    },
  };
}

function snapshot(options: { unknownHour?: boolean; unknownLuck?: boolean; startYears?: number } = {}): CanonicalSajuSnapshot {
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
  if (base.pillars.day.status !== 'resolved') throw new Error('day pillar not resolved');
  const day: PillarFact = base.pillars.day.value;
  const years = options.startYears ?? 1;
  return {
    ...base,
    luckCycle: options.unknownLuck
      ? unavailable('test-luck-unavailable')
      : resolved({
          direction: 'forward',
          start: { age: years, years, months: 0, days: 0 },
          pillars: Array.from({ length: 10 }, (_, i) => ({
            age: years + i * 10, pillar: day,
          })),
        }),
    pillars: {
      ...base.pillars,
      ...(options.unknownHour ? { hour: unavailable('test-hour-unavailable') } : {}),
    },
  };
}

describe('Pian Guan historical conditional scope / research-only gate', () => {
  test('records original exact relation separately from unverified full comparative paragraph', () => {
    const doc = buildPianGuanConditionalHistoricalScopeReview();
    expect(doc.verifiedPrintedRelationPage).toBe(25);
    expect(doc.printedWitnessSha256).toMatch(/^[0-9a-f]{64}$/u);
    expect(PIAN_GUAN_CONDITIONAL_WITNESSES).toHaveLength(3);
    expect(PIAN_GUAN_CONDITIONAL_WITNESSES[0]?.exactRelationPreviouslyPageVerified).toBe(true);
    expect(PIAN_GUAN_CONDITIONAL_WITNESSES.every(
      (x) => x.independentlyVerifiedForFullConditionalParagraph === false,
    )).toBe(true);
    expect(doc.literaryProposition.antecedent).toEqual({
      natalDayStem: '갑', annualStem: '경', relation: '편관',
      direction: 'annual_stem_controls_day_stem',
    });
    expect(doc.literaryProposition.meaningFromPrintedFullParagraphIndependentlyVerified).toBe(false);
    expect(doc.authority).toMatchObject({
      descriptiveHistoryOnly: true,
      individualSeverityAdmitted: false,
      otherCaseRescueInherited: false,
      annualInterpretationAuthorized: false,
      productionAuthorized: false,
    });
    const { evidenceHash, ...material } = doc;
    expect(evidenceHash).toBe(deterministicContentHash(material));
    expect(buildPianGuanConditionalHistoricalScopeReview()).toEqual(doc);
  });

  test('the literary comparison stays with Geng-year/Jia-day and never implies a forecast', () => {
    const exact = inspectPianGuanConditionalHistoricalScope('갑', '경', '편관');
    expect(exact).toEqual({
      exactSourceCaseMatched: true,
      historicalClauseId: 'PG-02-HISTORICAL_RELATIVE_SEVERITY',
      mayReportWhatTheSourceHistoricallySays: true,
      conditionalPersonalInterpretationAuthorized: false,
      individualSeverity: null,
      inheritedPianCaiRescue: null,
      modernLifeEvent: null,
      consumerFortuneText: null,
      productionAuthorized: false,
    });
    expect(PIAN_GUAN_CONDITIONAL_CLAUSE_SCOPES.map((x) => x.exactCase)).toEqual([
      'MING_JIA_DAY_GENG_YEAR_PIAN_GUAN',
      'MING_JIA_DAY_GENG_YEAR_PIAN_GUAN',
      'MING_JIA_DAY_WU_YEAR_PIAN_CAI',
    ]);
    expect(PIAN_GUAN_CONDITIONAL_CLAUSE_SCOPES.every(
      (x) => !x.applicableModernOutcome && !x.primaryFullSentenceRecheckedNow,
    )).toBe(true);
  });

  test('reversed stem direction, other Pian Guan, Pian Cai, wrong god and missing relation all HOLD', () => {
    for (const [day, year, god] of [
      ['경', '갑', '편관'],
      ['을', '신', '편관'],
      ['갑', '무', '편재'],
      ['갑', '경', '편재'],
      ['갑', '경', null],
    ] as const) {
      const result = inspectPianGuanConditionalHistoricalScope(day, year, god);
      expect(result.exactSourceCaseMatched).toBe(false);
      expect(result.historicalClauseId).toBeNull();
      expect(result.mayReportWhatTheSourceHistoricallySays).toBe(false);
      expect(result.inheritedPianCaiRescue).toBeNull();
      expect(result.consumerFortuneText).toBeNull();
    }
  });

  test('the Wu-year rescue/affection case is not a Geng-year license; no severity score', () => {
    const doc = buildPianGuanConditionalHistoricalScopeReview();
    expect(doc.separatedOtherCase).toBe('MING_JIA_DAY_WU_YEAR_PIAN_CAI');
    expect(doc.clauseScopes[2]?.historicallyDiscussedCase).toBe('jia_day_wu_year');
    expect(doc.clauseScopes[2]?.historicalFunction)
      .toBe('rescue_affection_examples_following_other_case');
    expect(doc.authority.otherCaseRescueInherited).toBe(false);
    expect(doc.unresolved).toEqual(PIAN_GUAN_CONDITIONAL_UNRESOLVED);
    expect(doc.unresolved).toHaveLength(7);
  });

  test('actual LiChun policy stays exact and both approved annual years remain HOLD', () => {
    const natal = snapshot();
    const beforeSnapshot = JSON.stringify(natal);
    const before = reviewPianGuanConditionalScopeForAnnualRequest(
      natal, annual(2026, '2026-02-03T14:59:59.000Z'),
    );
    const after = reviewPianGuanConditionalScopeForAnnualRequest(
      natal, annual(2026, '2026-02-03T15:00:00.000Z'),
    );
    const next = reviewPianGuanConditionalScopeForAnnualRequest(
      natal, annual(2027, '2027-02-03T15:00:00.000Z'),
    );
    for (const item of [before, after, next]) {
      expect(item.status).toBe('research_historical_context_only_hold');
      if (item.status !== 'research_historical_context_only_hold') continue;
      expect(item.exactSourceCaseMatched).toBe(false);
      expect(item.sourceClauseId).toBeNull();
      expect(item.personalAppliedHistoricalSeverity).toBeNull();
      expect(item.consumerFortuneText).toBeNull();
      expect(Object.values(item.authority).every((v) => v === false)).toBe(true);
      const { reviewHash, ...material } = item;
      expect(reviewHash).toBe(deterministicContentHash(material));
    }
    expect(after).not.toEqual(before);
    expect(next).not.toEqual(after);
    expect(JSON.stringify(natal)).toBe(beforeSnapshot);
    expect(reviewPianGuanConditionalScopeForAnnualRequest(
      natal, annual(2026, '2026-02-03T15:00:00.000Z'),
    )).toEqual(after);
  });

  test('unregistered annual evidence, unknown birth hour, Dayun ambiguity, monthly misuse fail closed', () => {
    const base = snapshot();
    const unsupported = reviewPianGuanConditionalScopeForAnnualRequest(
      base, annual(2028, '2028-02-04T01:00:00.000Z'),
    );
    expect(unsupported).toEqual({
      status: 'input_unavailable', reasonCode: 'ANNUAL_E1_DATE_UNAVAILABLE',
      productionAuthorized: false,
    });
    const unknownHour = reviewPianGuanConditionalScopeForAnnualRequest(
      snapshot({ unknownHour: true }), annual(2026, '2026-06-15T12:00:00.000Z'),
    );
    expect(unknownHour).toMatchObject({ status: 'input_unavailable', reasonCode: 'hour' });
    const unknownLuck = reviewPianGuanConditionalScopeForAnnualRequest(
      snapshot({ unknownLuck: true }), annual(2026, '2026-06-15T12:00:00.000Z'),
    );
    expect(unknownLuck).toMatchObject({
      status: 'input_unavailable', reasonCode: 'luck_cycle_unavailable',
    });
    const crossing = reviewPianGuanConditionalScopeForAnnualRequest(
      snapshot({ startYears: 6 }), annual(2026, '2026-06-15T12:00:00.000Z'),
    );
    expect(crossing).toMatchObject({
      status: 'input_unavailable', reasonCode: 'DAYUN_MULTIPLE_SEGMENTS',
    });
    const monthly: ReadingRequest = {
      ...annual(2026, '2026-06-15T12:00:00.000Z'),
      intent: { domain: 'general', temporalScope: 'monthly' },
      targetPeriod: {
        scope: 'monthly', year: 2026, month: 6, timeZone: 'Asia/Seoul',
        referenceDateTime: '2026-06-15T12:00:00.000Z',
        resolution: 'relative_current',
      },
    };
    expect(reviewPianGuanConditionalScopeForAnnualRequest(base, monthly)).toEqual({
      status: 'input_unavailable', reasonCode: 'ANNUAL_REQUEST_REQUIRED',
      productionAuthorized: false,
    });
  });
});
