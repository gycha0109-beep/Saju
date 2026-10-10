import { describe, expect, test } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { resolved, unavailable } from '../src/contracts/common.js';
import type { CanonicalSajuSnapshot, PillarFact } from '../src/contracts/calculation.js';
import type { ReadingRequest } from '../src/contracts/reading.js';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import {
  ANNUAL_SOURCE_BOUND_SENTENCE_VERSION,
  EXACT_PRIMARY_ANNUAL_TEN_GOD_CASES,
  buildAnnualSourceBoundEvidenceCasebook,
  buildAnnualSourceBoundFactSentences,
  matchExactPrimaryAnnualTenGodCase,
} from '../src/research/general-annual-source-bound-fact-sentences.js';

function annual(year: number, timestamp: string): ReadingRequest {
  return {
    requestId: 'source-bound-annual-test',
    intent: { domain: 'general', temporalScope: 'annual' },
    targetPeriod: {
      scope: 'annual', year, timeZone: 'Asia/Seoul',
      referenceDateTime: timestamp, resolution: 'relative_current',
    },
  };
}

function fixture(options: {
  startYears?: number;
  dayunBranch?: '자' | '오';
  natalDayBranch?: '자';
  unknownHour?: boolean;
  unknownLuck?: boolean;
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
  const pillar = base.pillars.day.value;
  const dayun: PillarFact = {
    ...pillar,
    ...(options.dayunBranch === undefined
      ? {}
      : {
          branch: {
            value: options.dayunBranch,
            hanja: options.dayunBranch === '자' ? '子' : '午',
            element: options.dayunBranch === '자' ? '수' : '화',
            yinYang: '양',
          },
        }),
  };
  const startYears = options.startYears ?? 1;
  return {
    ...base,
    luckCycle: options.unknownLuck
      ? unavailable('test-luck-unavailable')
      : resolved({
          direction: 'forward',
          start: { age: startYears, years: startYears, months: 0, days: 0 },
          pillars: Array.from({ length: 10 }, (_, index) => ({
            age: startYears + index * 10,
            pillar: dayun,
          })),
        }),
    pillars: {
      ...base.pillars,
      ...(options.natalDayBranch === undefined
        ? {}
        : { day: resolved({
            ...pillar,
            branch: { value: '자', hanja: '子', element: '수', yinYang: '양' },
          }) }),
      ...(options.unknownHour ? { hour: unavailable('test-hour-unavailable') } : {}),
    },
  };
}

describe('SA-7D source-bound annual factual wording and counterexamples', () => {
  test('adjudicates each of the 14 existing modern claims with direct evidence and counterexamples', () => {
    const data = buildAnnualSourceBoundEvidenceCasebook();
    expect(data.version).toBe(ANNUAL_SOURCE_BOUND_SENTENCE_VERSION);
    expect(data.rows).toHaveLength(14);
    expect(new Set(data.rows.map((item) => item.ruleId)).size).toBe(14);
    expect(new Set(data.rows.map((item) => item.semanticKey)).size).toBe(14);
    expect(data.rows.filter((item) => item.kind === 'ten_god_modern_theme')).toHaveLength(10);
    expect(data.rows.filter((item) => item.kind === 'annual_natal_branch_clash_tension')).toHaveLength(4);
    expect(data.rows.filter((item) => item.exactPrimaryExampleIds.length > 0)).toHaveLength(2);
    expect(data.rows.every((item) =>
      item.modernMeaningStatus === 'RESEARCH_HOLD' &&
      item.modernMeaningEvidenceGrade === 'INSUFFICIENT' &&
      item.allowedWording === 'computed_relation_only' &&
      item.fortuneSentenceAuthorized === false &&
      item.sourceRefs.length > 0 &&
      item.counterexamples.length > 0 &&
      item.requiredNextEvidence.length > 0,
    )).toBe(true);
    expect(data).toMatchObject({
      primaryWitnessPdfPageOneBased: 25,
      authority: {
        exactPrimaryRelationExampleCount: 2,
        approvedModernMeaningCount: 0,
        mayEmitInterpretationClaim: false,
        mayProduceAnnualFortune: false,
        productionAuthorized: false,
      },
    });
    const { casebookHash, ...material } = data;
    expect(casebookHash).toBe(deterministicContentHash(material));
    expect(buildAnnualSourceBoundEvidenceCasebook()).toEqual(data);
  });

  test('binds Ming direct evidence only to the two exact directed Ten-God identities', () => {
    expect(EXACT_PRIMARY_ANNUAL_TEN_GOD_CASES).toHaveLength(2);
    expect(matchExactPrimaryAnnualTenGodCase('갑', '경', '편관')).toMatchObject({
      caseId: 'MING_JIA_DAY_GENG_YEAR_PIAN_GUAN',
      modernThemeAuthorized: false,
    });
    expect(matchExactPrimaryAnnualTenGodCase('갑', '무', '편재')).toMatchObject({
      caseId: 'MING_JIA_DAY_WU_YEAR_PIAN_CAI',
      modernThemeAuthorized: false,
    });
    expect(matchExactPrimaryAnnualTenGodCase('경', '갑', '편관')).toBeNull();
    expect(matchExactPrimaryAnnualTenGodCase('갑', '경', '편재')).toBeNull();
    expect(matchExactPrimaryAnnualTenGodCase('갑', '기', '편재')).toBeNull();
    expect(matchExactPrimaryAnnualTenGodCase('갑', '병', '식신')).toBeNull();
  });

  test('produces only deterministic Korean calculated-fact lines, never fortune sentences', () => {
    const snapshot = fixture({ dayunBranch: '자', natalDayBranch: '자' });
    const original = JSON.stringify(snapshot);
    const request = annual(2026, '2026-06-15T12:00:00.000Z');
    const result = buildAnnualSourceBoundFactSentences(snapshot, request);
    expect(result.status).toBe('research_fact_sentences_only');
    if (result.status !== 'research_fact_sentences_only') return;
    expect(result.sentences.map((line) => line.kind)).toEqual([
      'effective_annual_pillar',
      'annual_stem_ten_god_calculation',
      'dayun_stem_ten_god_calculation',
      'cross_layer_relation_count',
      'no_event_inference_notice',
    ]);
    expect(result.sentences[0]?.text).toContain('병오');
    expect(result.sentences[1]?.text).toContain('계산상 십신 관계');
    expect(result.sentences[2]?.text).toContain('대운 천간');
    expect(result.sentences[3]?.text).toContain('9개 기둥 쌍');
    expect(result.sentences[4]?.text).toContain('판단하지 않습니다');
    expect(result.sentences.every((line) =>
      line.level === 'FACT_ONLY' &&
      line.interpretationAuthorized === false &&
      line.consumerDeliveryAuthorized === false &&
      line.evidenceRef.length > 0,
    )).toBe(true);
    expect(result.exactClassicalAnnualTenGodExample).toBeUndefined();
    expect(result.classicalExample).toEqual({
      exactMatch: false, caseId: null, sourceId: null,
    });
    expect(result).toMatchObject({
      emittedFortuneSentenceCount: 0,
      authority: {
        mayGenerateAnnualInterpretation: false,
        mayCallModel: false,
        mayIssueInterpretationClaim: false,
        mayRenderOfficialReading: false,
        productionAuthorized: false,
        commerceAuthorized: false,
      },
    });
    expect(result.blockedSemanticSlots).toHaveLength(6);
    const { status, resultHash, ...payload } = result;
    expect(status).toBe('research_fact_sentences_only');
    expect(resultHash).toBe(deterministicContentHash(payload));
    expect(buildAnnualSourceBoundFactSentences(snapshot, request)).toEqual(result);
    expect(JSON.stringify(snapshot)).toBe(original);
  });

  test('preserves the 2026 and 2027 midnight LiChun split and does not infer new events', () => {
    const snapshot = fixture();
    const before = buildAnnualSourceBoundFactSentences(
      snapshot, annual(2026, '2026-02-03T14:59:59.000Z'),
    );
    const after = buildAnnualSourceBoundFactSentences(
      snapshot, annual(2026, '2026-02-03T15:00:00.000Z'),
    );
    const next = buildAnnualSourceBoundFactSentences(
      snapshot, annual(2027, '2027-02-03T15:00:00.000Z'),
    );
    expect(before.status).toBe('research_fact_sentences_only');
    expect(after.status).toBe('research_fact_sentences_only');
    expect(next.status).toBe('research_fact_sentences_only');
    if (before.status !== 'research_fact_sentences_only' ||
        after.status !== 'research_fact_sentences_only' ||
        next.status !== 'research_fact_sentences_only') return;
    expect(before.sentences[0]?.text).toContain('을사');
    expect(after.sentences[0]?.text).toContain('병오');
    expect(next.sentences[0]?.text).toContain('정미');
    expect(before.resultHash).not.toBe(after.resultHash);
    for (const row of [before, after, next]) {
      expect(row.blockedSemanticSlots).toHaveLength(6);
      expect(row.emittedFortuneSentenceCount).toBe(0);
    }
  });

  test('keeps multiple simultaneous clashes as count-only instead of winner, conflict severity, or event', () => {
    const result = buildAnnualSourceBoundFactSentences(
      fixture({ dayunBranch: '자', natalDayBranch: '자' }),
      annual(2026, '2026-06-15T12:00:00.000Z'),
    );
    expect(result.status).toBe('research_fact_sentences_only');
    if (result.status !== 'research_fact_sentences_only') return;
    expect(result.sentences[3]?.text).toMatch(/관계 일치 [2-9][0-9]*건/);
    const serialized = JSON.stringify(result);
    expect(serialized).not.toMatch(
      /"winner":|"severity":|"luckScore":|"eventPrediction":|"conclusion":/u,
    );
  });

  test('fails closed for absent E1, Dayun transitions, unknown natal hour and monthly input', () => {
    expect(buildAnnualSourceBoundFactSentences(
      fixture(), annual(2028, '2028-02-04T00:00:00.000Z'),
    )).toEqual({
      status: 'unavailable',
      upstreamReasonCode: 'ANNUAL_E1_DATE_UNAVAILABLE',
      productionAuthorized: false,
    });
    expect(buildAnnualSourceBoundFactSentences(
      fixture({ startYears: 6 }), annual(2026, '2026-06-15T12:00:00.000Z'),
    )).toMatchObject({
      status: 'unavailable',
      upstreamReasonCode: 'DAYUN_MULTIPLE_SEGMENTS',
      productionAuthorized: false,
    });
    expect(buildAnnualSourceBoundFactSentences(
      fixture({ unknownHour: true }), annual(2026, '2026-06-15T12:00:00.000Z'),
    )).toMatchObject({
      status: 'unavailable',
      upstreamReasonCode: 'hour',
      productionAuthorized: false,
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
    expect(buildAnnualSourceBoundFactSentences(fixture(), monthly))
      .toMatchObject({
        status: 'unavailable',
        upstreamReasonCode: 'ANNUAL_REQUEST_REQUIRED',
        productionAuthorized: false,
      });
  });
});
