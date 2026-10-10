import { describe, expect, test } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { resolved, unavailable } from '../src/contracts/common.js';
import type { CanonicalSajuSnapshot, PillarFact } from '../src/contracts/calculation.js';
import type { ReadingRequest } from '../src/contracts/reading.js';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import {
  buildGeneralAnnualThreeLayerFactCorpus,
  GENERAL_ANNUAL_THREE_LAYER_CORPUS_VERSION,
} from '../src/research/general-annual-three-layer-fact-corpus.js';

function annual(year: number, timestamp: string): ReadingRequest {
  return {
    requestId: 'three-layer-annual-test',
    intent: { domain: 'general', temporalScope: 'annual' },
    targetPeriod: {
      scope: 'annual',
      year,
      timeZone: 'Asia/Seoul',
      referenceDateTime: timestamp,
      resolution: 'relative_current',
    },
  };
}

function snapshot(options: {
  startYears?: number;
  dayunBranch?: '자' | '오';
  unknownHour?: boolean;
  unknownLuck?: boolean;
  natalDayBranch?: '자';
} = {}): CanonicalSajuSnapshot {
  const calculated = calculateCanonicalSajuSnapshot(
    {
      calendarType: 'solar',
      date: { year: 1990, month: 5, day: 15 },
      time: { known: true, hour: 14, minute: 30 },
      sexForTraditionalCalculation: 'male',
    },
    PRODUCTION_DEFAULT_CALCULATION_POLICY,
    { now: new Date('2026-10-10T12:00:00Z') },
  );
  if (calculated.pillars.day.status !== 'resolved') {
    throw new Error('test fixture needs day pillar');
  }
  const basis = calculated.pillars.day.value;
  const dayun: PillarFact = {
    ...basis,
    branch: options.dayunBranch === undefined
      ? basis.branch
      : {
          value: options.dayunBranch,
          hanja: options.dayunBranch === '자' ? '子' : '午',
          element: options.dayunBranch === '자' ? '수' : '화',
          yinYang: '양',
        },
  };
  const startYears = options.startYears ?? 1;
  const luckCycle = resolved({
    direction: 'forward' as const,
    start: { age: startYears, years: startYears, months: 0, days: 0 },
    pillars: Array.from({ length: 10 }, (_, index) => ({
      age: startYears + index * 10,
      pillar: dayun,
    })),
  });
  const changedDay: PillarFact | undefined = options.natalDayBranch === '자'
    ? {
        ...basis,
        branch: { value: '자', hanja: '子', element: '수', yinYang: '양' },
      }
    : undefined;
  return {
    ...calculated,
    luckCycle: options.unknownLuck ? unavailable('test-luck-unavailable') : luckCycle,
    pillars: {
      ...calculated.pillars,
      ...(changedDay === undefined ? {} : { day: resolved(changedDay) }),
      ...(options.unknownHour
        ? { hour: unavailable('test-hour-unavailable') }
        : {}),
    },
  };
}

describe('General Annual: Natal + Dayun + Annual three-layer research corpus', () => {
  test('binds all three layers and nine pair checks without a semantic claim', () => {
    const natal = snapshot({ dayunBranch: '자', natalDayBranch: '자' });
    const original = JSON.stringify(natal);
    const result = buildGeneralAnnualThreeLayerFactCorpus(
      natal, annual(2026, '2026-06-15T12:00:00.000Z'),
    );
    expect(result.state).toBe('research_three_layer_facts_only');
    if (result.state !== 'research_three_layer_facts_only') return;
    expect(result.corpusVersion).toBe(GENERAL_ANNUAL_THREE_LAYER_CORPUS_VERSION);
    expect(result.annualPillar).toMatchObject({ stem: '병', branch: '오' });
    expect(result.dayun).toMatchObject({ branch: '자' });
    expect(result.natal.map((x) => x.slot)).toEqual(['year', 'month', 'day', 'hour']);
    expect(result.pairChecks).toHaveLength(9);
    expect(new Set(result.pairChecks.map((x) => x.pairKey)).size).toBe(9);
    expect(result.pairMatches).toEqual(expect.arrayContaining([
      expect.objectContaining({
        pairKey: 'annual:dayun',
        kind: 'branch_clash',
        structuralMatchOnly: true,
        transformationEstablished: false,
        strengthOrOutcomeDetermined: false,
      }),
      expect.objectContaining({
        pairKey: 'annual:natal:day',
        kind: 'branch_clash',
        structuralMatchOnly: true,
      }),
    ]));
    expect(result.sourceBinding.existingDayunContextId).toBe(result.dayun.contextId);
    expect(result.sourceBinding.structuralRelationDefinitionHash).toMatch(/^[a-f0-9]{64}$/u);
    expect(result.limits).toMatchObject({
      natalBaselineUnchanged: true,
      multipleEffectsCombined: false,
      precedenceOrStrengthRankingAuthorized: false,
      tenGodMeaningAuthorized: false,
      mayGenerateAnnualInterpretation: false,
      mayRenderOfficialReading: false,
      mayCallModel: false,
      productionAuthorized: false,
    });
    const { state, corpusHash, ...material } = result;
    expect(state).toBe('research_three_layer_facts_only');
    expect(corpusHash).toBe(deterministicContentHash(material));
    expect(buildGeneralAnnualThreeLayerFactCorpus(natal, annual(2026, '2026-06-15T12:00:00.000Z')))
      .toEqual(result);
    expect(JSON.stringify(natal)).toBe(original);
    expect(JSON.stringify(result)).not.toMatch(
      /annual_theme_activation|annual_branch_clash_tension|luck_score|event_prediction|annual_interpretation_claim/iu,
    );
  });

  test('honors 00:00 KST LiChun boundary without rewriting the same Dayun', () => {
    const natal = snapshot();
    const before = buildGeneralAnnualThreeLayerFactCorpus(
      natal, annual(2026, '2026-02-03T14:59:59.000Z'),
    );
    const after = buildGeneralAnnualThreeLayerFactCorpus(
      natal, annual(2026, '2026-02-03T15:00:00.000Z'),
    );
    expect(before).toMatchObject({
      state: 'research_three_layer_facts_only',
      effectiveYear: 2025,
      annualPillar: { stem: '을', branch: '사' },
    });
    expect(after).toMatchObject({
      state: 'research_three_layer_facts_only',
      effectiveYear: 2026,
      annualPillar: { stem: '병', branch: '오' },
    });
    if (
      before.state !== 'research_three_layer_facts_only' ||
      after.state !== 'research_three_layer_facts_only'
    ) return;
    expect(before.dayun.contextId).toBe(after.dayun.contextId);
    expect(before.computedTenGodRelations.dayunStemToNatalDayMaster)
      .toBe(after.computedTenGodRelations.dayunStemToNatalDayMaster);
    expect(before.corpusHash).not.toBe(after.corpusHash);
  });

  test('preserves a different Annual source year while keeping the Natal identity', () => {
    const natal = snapshot();
    const next = buildGeneralAnnualThreeLayerFactCorpus(
      natal, annual(2027, '2027-06-15T12:00:00.000Z'),
    );
    expect(next).toMatchObject({
      state: 'research_three_layer_facts_only',
      targetYear: 2027, effectiveYear: 2027,
      annualPillar: { stem: '정', branch: '미' },
    });
    if (next.state !== 'research_three_layer_facts_only') return;
    expect(next.snapshotId).toBe(natal.snapshotId);
    expect(next.dayun.segmentIndex).toBeGreaterThanOrEqual(0);
  });

  test('blocks a two-Dayun-segment boundary year instead of choosing an arbitrary winner', () => {
    const result = buildGeneralAnnualThreeLayerFactCorpus(
      snapshot({ startYears: 6 }), annual(2026, '2026-06-15T12:00:00.000Z'),
    );
    expect(result).toEqual({
      state: 'unavailable', reasonCode: 'DAYUN_MULTIPLE_SEGMENTS', productionAuthorized: false,
    });
  });

  test('blocks a lone partial-year Dayun segment', () => {
    const result = buildGeneralAnnualThreeLayerFactCorpus(
      snapshot({ startYears: 36 }), annual(2026, '2026-06-15T12:00:00.000Z'),
    );
    expect(result).toEqual({
      state: 'unavailable', reasonCode: 'DAYUN_PARTIAL_YEAR_COVERAGE', productionAuthorized: false,
    });
  });

  test('blocks missing Dayun context and unresolved natal hour instead of filling facts', () => {
    expect(buildGeneralAnnualThreeLayerFactCorpus(
      snapshot({ unknownLuck: true }), annual(2026, '2026-06-15T12:00:00.000Z'),
    )).toMatchObject({
      state: 'unavailable',
      reasonCode: 'DAYUN_CONTEXT_UNAVAILABLE',
      upstreamReasonCode: 'luck_cycle_unavailable',
    });
    expect(buildGeneralAnnualThreeLayerFactCorpus(
      snapshot({ unknownHour: true }), annual(2026, '2026-06-15T12:00:00.000Z'),
    )).toEqual({
      state: 'unavailable',
      reasonCode: 'NATAL_PILLAR_UNRESOLVED',
      upstreamReasonCode: 'hour',
      productionAuthorized: false,
    });
  });

  test('rejects unsupported Annual E1 year and Monthly requests', () => {
    expect(buildGeneralAnnualThreeLayerFactCorpus(
      snapshot(), annual(2028, '2028-02-04T01:00:00.000Z'),
    )).toMatchObject({
      state: 'unavailable',
      reasonCode: 'ANNUAL_FACTS_UNAVAILABLE',
      upstreamReasonCode: 'ANNUAL_E1_DATE_UNAVAILABLE',
    });
    const monthly: ReadingRequest = {
      ...annual(2026, '2026-06-15T12:00:00.000Z'),
      intent: { domain: 'general', temporalScope: 'monthly' },
      targetPeriod: {
        scope: 'monthly', year: 2026, month: 6,
        timeZone: 'Asia/Seoul', referenceDateTime: '2026-06-15T12:00:00.000Z',
        resolution: 'relative_current',
      },
    };
    expect(buildGeneralAnnualThreeLayerFactCorpus(snapshot(), monthly)).toMatchObject({
      state: 'unavailable',
      reasonCode: 'ANNUAL_FACTS_UNAVAILABLE',
      upstreamReasonCode: 'ANNUAL_REQUEST_REQUIRED',
    });
  });
});
