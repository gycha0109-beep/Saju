import { describe, expect, test } from 'vitest';
import type {
  CanonicalSajuSnapshot,
  EarthlyBranch,
  FiveElement,
  HeavenlyStem,
  HiddenStemChartFact,
  PillarFact,
  YinYang,
} from '../src/contracts/calculation.js';
import {
  GENERAL_NATAL_GEJU_CANDIDATE_OPEN_PREDICATE_GAPS,
} from '../src/research/general-natal-geju-candidate-source-frontier.js';
import {
  GENERAL_NATAL_GEJU_MONTH_ORDER_TRANSPARENCY_OBSERVATION_VERSION,
  buildGeneralNatalGejuMonthOrderTransparencyObservation,
} from '../src/research/general-natal-geju-month-order-transparency-observation.js';

const STEM_META: Readonly<
  Record<HeavenlyStem, { hanja: string; element: FiveElement; yinYang: YinYang }>
> = {
  갑: { hanja: '甲', element: '목', yinYang: '양' },
  을: { hanja: '乙', element: '목', yinYang: '음' },
  병: { hanja: '丙', element: '화', yinYang: '양' },
  정: { hanja: '丁', element: '화', yinYang: '음' },
  무: { hanja: '戊', element: '토', yinYang: '양' },
  기: { hanja: '己', element: '토', yinYang: '음' },
  경: { hanja: '庚', element: '금', yinYang: '양' },
  신: { hanja: '辛', element: '금', yinYang: '음' },
  임: { hanja: '壬', element: '수', yinYang: '양' },
  계: { hanja: '癸', element: '수', yinYang: '음' },
};

const BRANCH_META: Readonly<
  Record<EarthlyBranch, { hanja: string; element: FiveElement; yinYang: YinYang }>
> = {
  자: { hanja: '子', element: '수', yinYang: '양' },
  축: { hanja: '丑', element: '토', yinYang: '음' },
  인: { hanja: '寅', element: '목', yinYang: '양' },
  묘: { hanja: '卯', element: '목', yinYang: '음' },
  진: { hanja: '辰', element: '토', yinYang: '양' },
  사: { hanja: '巳', element: '화', yinYang: '음' },
  오: { hanja: '午', element: '화', yinYang: '양' },
  미: { hanja: '未', element: '토', yinYang: '음' },
  신: { hanja: '申', element: '금', yinYang: '양' },
  유: { hanja: '酉', element: '금', yinYang: '음' },
  술: { hanja: '戌', element: '토', yinYang: '양' },
  해: { hanja: '亥', element: '수', yinYang: '음' },
};

function pillar(stem: HeavenlyStem, branch: EarthlyBranch): PillarFact {
  return {
    stem: { value: stem, ...STEM_META[stem] },
    branch: { value: branch, ...BRANCH_META[branch] },
  };
}

function hiddenMonth(stems: readonly HeavenlyStem[]): HiddenStemChartFact {
  return {
    year: { status: 'unavailable', reasonCode: 'synthetic-not-needed' },
    month: { status: 'resolved', value: stems },
    day: { status: 'unavailable', reasonCode: 'synthetic-not-needed' },
    hour: { status: 'unavailable', reasonCode: 'synthetic-not-needed' },
  };
}

function baseSnapshot(options: {
  monthHiddenStems?: HiddenStemChartFact;
  yearStem?: HeavenlyStem;
  monthStem?: HeavenlyStem;
  dayStem?: HeavenlyStem;
  hourStem?: HeavenlyStem;
  monthBranch?: EarthlyBranch;
  hourResolved?: boolean;
  monthResolved?: boolean;
} = {}): CanonicalSajuSnapshot {
  const hourResolved = options.hourResolved ?? true;
  const monthResolved = options.monthResolved ?? true;
  const yearStem = options.yearStem ?? '계';
  const monthStem = options.monthStem ?? '기';
  const dayStem = options.dayStem ?? '정';
  const hourStem = options.hourStem ?? '신';
  const monthBranch = options.monthBranch ?? '축';

  return {
    snapshotId: 'synthetic_general_natal_geju_observation',
    schemaVersion: 'saju-canonical-v1.4',
    calculationHash: 'd'.repeat(64),
    createdAt: '2026-09-12T00:00:00.000Z',
    input: {
      calendarType: 'solar',
      date: { year: 2000, month: 1, day: 1 },
      time: hourResolved ? { known: true, hour: 12, minute: 0 } : { known: false },
      sexForTraditionalCalculation: 'unspecified',
    },
    policy: {
      policyId: 'synthetic/general-natal-geju-observation',
      policyVersion: '1',
      dayBoundary: 'midnight',
      trueSolarTime: {
        enabled: false,
        longitudeSource: 'not-applicable',
        applyEquationOfTime: false,
        applyHistoricalDst: false,
      },
      timeZonePolicy: { source: 'service-default', timeZone: 'Asia/Seoul' },
      unknownBirthTimePolicy: 'preserve-unknown-and-enumerate-boundaries',
    },
    normalized: {
      solarDate: { status: 'resolved', value: { year: 2000, month: 1, day: 1 } },
      clockTime: hourResolved
        ? { status: 'resolved', value: { hour: 12, minute: 0 } }
        : { status: 'unavailable', reasonCode: 'synthetic-missing-hour' },
      timeZone: 'Asia/Seoul',
      appliedCorrections: [],
    },
    pillars: {
      year: { status: 'resolved', value: pillar(yearStem, '자') },
      month: monthResolved
        ? { status: 'resolved', value: pillar(monthStem, monthBranch) }
        : { status: 'unavailable', reasonCode: 'synthetic-missing-month' },
      day: { status: 'resolved', value: pillar(dayStem, '오') },
      hour: hourResolved
        ? { status: 'resolved', value: pillar(hourStem, '유') }
        : { status: 'unavailable', reasonCode: 'synthetic-missing-hour' },
    },
    derivedFacts: {
      dayMaster: { status: 'resolved', value: { value: dayStem, ...STEM_META[dayStem] } },
      tenGods: { status: 'unavailable', reasonCode: 'synthetic-not-needed' },
      voidBranches: { status: 'resolved', value: [] },
      hiddenStems: options.monthHiddenStems ?? hiddenMonth(['기', '신', '계']),
    },
    luckCycle: { status: 'unavailable', reasonCode: 'synthetic-not-needed' },
    scenarios: [],
    completeness: {
      birthTimeKnown: hourResolved,
      fullyResolved: false,
      resolvedPaths: [],
      ambiguousPaths: [],
      unavailablePaths: [],
    },
    provenance: {
      engine: { name: 'synthetic', version: '1' },
      adapter: { name: 'synthetic', version: '1' },
      policy: { id: 'synthetic/general-natal-geju-observation', version: '1' },
      schema: { id: 'myeonghwa-canonical-saju', version: 'saju-canonical-v1.4' },
    },
  };
}

describe('general natal Gyeokguk month-order transparency observation', () => {
  test('enumerates resolved month hidden stems and records exact visible stem positions only', () => {
    const report = buildGeneralNatalGejuMonthOrderTransparencyObservation(baseSnapshot());

    expect(report.status).toBe('resolved_observation_only');
    expect(report.monthHiddenStemObservations).toEqual([
      {
        stem: '기',
        visibleExactStemPositions: ['month'],
        exactVisibilityObserved: true,
        rankAssigned: false,
        selectionEffectEstablished: false,
        candidateEmitted: false,
      },
      {
        stem: '신',
        visibleExactStemPositions: ['hour'],
        exactVisibilityObserved: true,
        rankAssigned: false,
        selectionEffectEstablished: false,
        candidateEmitted: false,
      },
      {
        stem: '계',
        visibleExactStemPositions: ['year'],
        exactVisibilityObserved: true,
        rankAssigned: false,
        selectionEffectEstablished: false,
        candidateEmitted: false,
      },
    ]);
  });

  test('preserves zero and plural exact visibility observations without assigning selection semantics', () => {
    const plural = buildGeneralNatalGejuMonthOrderTransparencyObservation(
      baseSnapshot({
        monthHiddenStems: hiddenMonth(['계']),
        yearStem: '계',
        hourStem: '계',
      }),
    );
    expect(plural.monthHiddenStemObservations[0]?.visibleExactStemPositions).toEqual([
      'year',
      'hour',
    ]);
    expect(plural.monthHiddenStemObservations[0]?.selectionEffectEstablished).toBe(false);

    const zero = buildGeneralNatalGejuMonthOrderTransparencyObservation(
      baseSnapshot({
        monthHiddenStems: hiddenMonth(['갑', '병', '무']),
        monthBranch: '인',
      }),
    );
    expect(zero.monthHiddenStemObservations.every((item) => !item.exactVisibilityObserved)).toBe(
      true,
    );
    expect(zero.multipleCandidateRepresentationAuthorized).toBe(false);
  });

  test('never interprets hidden-stem storage order as rank or candidate precedence', () => {
    const report = buildGeneralNatalGejuMonthOrderTransparencyObservation(
      baseSnapshot({ monthHiddenStems: hiddenMonth(['계', '신', '기']) }),
    );

    expect(report.monthHiddenStemObservations.map((item) => item.stem)).toEqual(['계', '신', '기']);
    expect(report.hiddenStemStorageOrderRankingAuthorized).toBe(false);
    expect(report.monthHiddenStemObservations.every((item) => item.rankAssigned === false)).toBe(
      true,
    );
    expect(report.transparencySelectionPredicateAuthorized).toBe(false);
    expect(report.candidateDerivationAuthorized).toBe(false);
  });

  test('fails closed when any visible pillar stem is unresolved', () => {
    const report = buildGeneralNatalGejuMonthOrderTransparencyObservation(
      baseSnapshot({ hourResolved: false }),
    );

    expect(report.status).toBe('canonical_substrate_unavailable');
    expect(report.unavailableReasonCode).toBe(
      'general-natal-geju-observation-requires-resolved-four-pillar-stems',
    );
    expect(report.monthHiddenStemObservations).toEqual([]);
  });

  test('fails closed when month pillar or month hidden-stem membership is unresolved', () => {
    const missingMonth = buildGeneralNatalGejuMonthOrderTransparencyObservation(
      baseSnapshot({ monthResolved: false }),
    );
    expect(missingMonth.status).toBe('canonical_substrate_unavailable');
    expect(missingMonth.unavailableReasonCode).toBe(
      'general-natal-geju-observation-requires-resolved-month-pillar',
    );

    const missingHidden = buildGeneralNatalGejuMonthOrderTransparencyObservation(
      baseSnapshot({
        monthHiddenStems: {
          ...hiddenMonth(['기', '신', '계']),
          month: { status: 'unavailable', reasonCode: 'synthetic-missing-hidden' },
        },
      }),
    );
    expect(missingHidden.status).toBe('canonical_substrate_unavailable');
    expect(missingHidden.unavailableReasonCode).toBe(
      'general-natal-geju-observation-requires-resolved-month-hidden-stems',
    );
  });

  test('keeps all coarse candidate and establishment authority gaps open', () => {
    const first = buildGeneralNatalGejuMonthOrderTransparencyObservation(baseSnapshot());
    const second = buildGeneralNatalGejuMonthOrderTransparencyObservation(baseSnapshot());

    expect(GENERAL_NATAL_GEJU_MONTH_ORDER_TRANSPARENCY_OBSERVATION_VERSION).toBe(
      '0.1.0-research',
    );
    expect(first.openPredicateGaps).toEqual(GENERAL_NATAL_GEJU_CANDIDATE_OPEN_PREDICATE_GAPS);
    expect(first.candidateFactsEmitted).toBe(false);
    expect(first.establishmentFactsEmitted).toBe(false);
    expect(first.branchMeetingSelectionEffectAuthorized).toBe(false);
    expect(first.establishmentPredicateAuthorized).toBe(false);
    expect(first.reportId).toBe(second.reportId);
  });
});
