import { describe, expect, test } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { resolved, unavailable } from '../src/contracts/common.js';
import type { CanonicalSajuSnapshot, PillarFact } from '../src/contracts/calculation.js';
import type { ReadingRequest } from '../src/contracts/reading.js';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import {
  PIAN_GUAN_ANNUAL_CLAUSE_REVIEW_VERSION,
  PIAN_GUAN_CLASSICAL_CONTEXT_REVIEW,
  PIAN_GUAN_SEMANTIC_MISSING_PREREQUISITES,
  buildPianGuanClassicalClauseEvidenceReview,
  inspectPianGuanExactClassicalCase,
  reviewPianGuanForAnnualRequest,
} from '../src/research/general-annual-pian-guan-classical-clause-review.js';

function annual(year: number, date: string): ReadingRequest {
  return {
    requestId: 'pian-guan-source-review',
    intent: { domain: 'general', temporalScope: 'annual' },
    targetPeriod: {
      scope: 'annual',
      year,
      timeZone: 'Asia/Seoul',
      referenceDateTime: date,
      resolution: 'relative_current',
    },
  };
}

function snapshot(options: {
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
  if (base.pillars.day.status !== 'resolved') throw new Error('Expected resolved day pillar');
  const p: PillarFact = base.pillars.day.value;
  const years = options.startYears ?? 1;
  return {
    ...base,
    luckCycle: options.unknownLuck
      ? unavailable('test-luck-unavailable')
      : resolved({
          direction: 'forward',
          start: { age: years, years, months: 0, days: 0 },
          pillars: Array.from({ length: 10 }, (_, i) => ({
            age: years + i * 10,
            pillar: p,
          })),
        }),
    pillars: {
      ...base.pillars,
      ...(options.unknownHour ? { hour: unavailable('test-hour-unavailable') } : {}),
    },
  };
}

describe('Pian Guan exact classical annual-case boundary', () => {
  test('binds the exact Ming print identity and keeps historical severity in a lower text-evidence tier', () => {
    const record = buildPianGuanClassicalClauseEvidenceReview();
    expect(record).toMatchObject({
      version: PIAN_GUAN_ANNUAL_CLAUSE_REVIEW_VERSION,
      semanticKey: 'ANNUAL_OFFICER_PRESSURE_RESPONSE',
      classicRelationWitness: {
        primarySourceId: 'NLC_MING_WANLI_SANMING_TONGHUI_VOLUME2_LOWER_SCAN',
        primaryPdfPageOneBased: 25,
        exactClause: '歲君傷日者如庚剋甲日為偏官',
        exactCaseId: 'MING_JIA_DAY_GENG_YEAR_PIAN_GUAN',
        directPrimaryEvidenceCeiling: 'exact_annual_ten_god_name_relation_only',
        fullHistoricalSeverityContextIndependentlyPageBound: false,
      },
      admission: {
        classicalIdentitySupported: true,
        historicalComparativeTextLocated: true,
        historicalSeverityContextPrimaryPageVerified: false,
        traditionalAppliedSeverityMeaningApproved: false,
        modernPressureResponseThemeApproved: false,
        annualInterpretationSentenceAuthorized: false,
        concreteEventPredictionAuthorized: false,
        consumerDeliveryAuthorized: false,
        productionAuthorized: false,
      },
    });
    expect(record.classicRelationWitness.primaryPdfSha256).toMatch(/^[0-9a-f]{64}$/u);
    expect(record.qualifiedContext).toBe(PIAN_GUAN_CLASSICAL_CONTEXT_REVIEW);
    expect(record.counterexamples).toHaveLength(5);
    expect(record.unresolved).toEqual(PIAN_GUAN_SEMANTIC_MISSING_PREREQUISITES);
    expect(record.unresolved).toHaveLength(8);
    expect(record.existingCasebookHash).toMatch(/^[0-9a-f]{64}$/u);
    const { evidenceReviewHash, ...data } = record;
    expect(evidenceReviewHash).toBe(deterministicContentHash(data));
    expect(buildPianGuanClassicalClauseEvidenceReview()).toEqual(record);
  });

  test('checks 甲日·庚年·偏官 only; reverse direction, other day and other ten-god are not exact print matches', () => {
    const exact = inspectPianGuanExactClassicalCase('갑', '경', '편관');
    expect(exact).toMatchObject({
      exactPrimaryRelationCaseId: 'MING_JIA_DAY_GENG_YEAR_PIAN_GUAN',
      exactPrimaryCaseMatched: true,
      evidenceGrade: 'EXACT_MING_PRIMARY_RELATION_IDENTITY_ONLY',
      directionalAnnualControlsNatal: true,
      historicalSeverityPhraseIsPredictiveEvidence: false,
      severityRanking: null,
      injuryOrMisfortunePrediction: null,
      careerPressurePrediction: null,
      fortuneSentence: null,
      semanticAdmissionAuthorized: false,
    });
    const contrasts = [
      inspectPianGuanExactClassicalCase('경', '갑', '편관'),
      inspectPianGuanExactClassicalCase('을', '신', '편관'),
      inspectPianGuanExactClassicalCase('갑', '무', '편재'),
      inspectPianGuanExactClassicalCase('갑', '경', '편재'),
      inspectPianGuanExactClassicalCase('갑', '경', null),
    ];
    expect(contrasts.every((item) =>
      !item.exactPrimaryCaseMatched &&
      item.exactPrimaryRelationCaseId === null &&
      item.evidenceGrade === 'NOT_THIS_EXACT_CLASSICAL_PAIR' &&
      item.semanticAdmissionAuthorized === false &&
      item.fortuneSentence === null,
    )).toBe(true);
    expect(inspectPianGuanExactClassicalCase('갑', '경', '편관')).toEqual(exact);
  });

  test('does not transport a 戊年 偏財 rescue condition to a 庚年 偏官 interpretation', () => {
    const context = PIAN_GUAN_CLASSICAL_CONTEXT_REVIEW;
    expect(context.comparedCaseId).toBe('MING_JIA_DAY_GENG_YEAR_PIAN_GUAN');
    expect(context.rescueClauseForComparisonCase).toBe('MING_JIA_DAY_WU_YEAR_PIAN_CAI');
    expect(context.historicalStatements).toHaveLength(3);
    expect(context.historicalStatements.every((x) =>
      x.directPrimaryPageClauseVerifiedSeparately === false,
    )).toBe(true);
    expect(context.modernJobPressureMeaningQualified).toBe(false);
    expect(context.modernHealthOrAccidentMeaningQualified).toBe(false);
    expect(context.textWitnessIsPredictiveValidation).toBe(false);
  });

  test('keeps real 2026 and 2027 annual requests in source-review HOLD without inventing a 庚 year', () => {
    const natal = snapshot();
    const unchanged = JSON.stringify(natal);
    const before = reviewPianGuanForAnnualRequest(
      natal, annual(2026, '2026-02-03T14:59:59.000Z'),
    );
    const after = reviewPianGuanForAnnualRequest(
      natal, annual(2026, '2026-02-03T15:00:00.000Z'),
    );
    const next = reviewPianGuanForAnnualRequest(
      natal, annual(2027, '2027-02-03T15:00:00.000Z'),
    );
    for (const item of [before, after, next]) {
      expect(item.status).toBe('research_reviewed_semantic_hold');
      if (item.status !== 'research_reviewed_semantic_hold') continue;
      expect(item.exactPrimaryRelationCaseMatched).toBe(false);
      expect(item.grade).toBe('NOT_THIS_EXACT_CLASSICAL_PAIR');
      expect(item.unresolved).toHaveLength(8);
      expect(item.outputFortuneText).toBeNull();
      expect(item.authority).toEqual({
        annualInterpretationAuthorized: false,
        modernPressureThemeAuthorized: false,
        modelCallAuthorized: false,
        officialReadingAuthorized: false,
        productionAuthorized: false,
      });
      const { status, reviewHash, ...data } = item;
      expect(status).toBe('research_reviewed_semantic_hold');
      expect(reviewHash).toBe(deterministicContentHash(data));
    }
    if (before.status !== 'research_reviewed_semantic_hold' ||
        after.status !== 'research_reviewed_semantic_hold' ||
        next.status !== 'research_reviewed_semantic_hold') return;
    expect(before.annualStem).toBe('을');
    expect(after.annualStem).toBe('병');
    expect(next.annualStem).toBe('정');
    expect(before.reviewHash).not.toBe(after.reviewHash);
    expect(after.reviewHash).not.toBe(next.reviewHash);
    expect(JSON.stringify(natal)).toBe(unchanged);
    expect(reviewPianGuanForAnnualRequest(natal, annual(2026, '2026-02-03T15:00:00.000Z')))
      .toEqual(after);
  });

  test('rejects unsupported LiChun source, unresolved natal hour, Dayun transition and monthly misuse', () => {
    expect(reviewPianGuanForAnnualRequest(
      snapshot(), annual(2028, '2028-02-04T01:00:00.000Z'),
    )).toEqual({
      status: 'input_unavailable',
      upstreamReasonCode: 'ANNUAL_E1_DATE_UNAVAILABLE',
      productionAuthorized: false,
    });
    expect(reviewPianGuanForAnnualRequest(
      snapshot({ unknownHour: true }), annual(2026, '2026-06-15T12:00:00.000Z'),
    )).toMatchObject({ status: 'input_unavailable', upstreamReasonCode: 'hour' });
    expect(reviewPianGuanForAnnualRequest(
      snapshot({ unknownLuck: true }), annual(2026, '2026-06-15T12:00:00.000Z'),
    )).toMatchObject({ status: 'input_unavailable', upstreamReasonCode: 'luck_cycle_unavailable' });
    expect(reviewPianGuanForAnnualRequest(
      snapshot({ startYears: 6 }), annual(2026, '2026-06-15T12:00:00.000Z'),
    )).toMatchObject({ status: 'input_unavailable', upstreamReasonCode: 'DAYUN_MULTIPLE_SEGMENTS' });
    const monthly: ReadingRequest = {
      ...annual(2026, '2026-06-15T12:00:00.000Z'),
      intent: { domain: 'general', temporalScope: 'monthly' },
      targetPeriod: {
        scope: 'monthly', year: 2026, month: 6, timeZone: 'Asia/Seoul',
        referenceDateTime: '2026-06-15T12:00:00.000Z',
        resolution: 'relative_current',
      },
    };
    expect(reviewPianGuanForAnnualRequest(snapshot(), monthly)).toEqual({
      status: 'input_unavailable',
      upstreamReasonCode: 'ANNUAL_REQUEST_REQUIRED',
      productionAuthorized: false,
    });
  });
});
