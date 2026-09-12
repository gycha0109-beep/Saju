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
import { GENERAL_NATAL_GEJU_CANDIDATE_OPEN_PREDICATE_GAPS } from '../src/research/general-natal-geju-candidate-source-frontier.js';
import {
  GENERAL_NATAL_GEJU_SOURCE_OBSERVED_TRANSPARENCY_SLOTS,
  GENERAL_NATAL_GEJU_TRANSPARENCY_SLOT_SOURCE_EVIDENCE_VERSION,
  GENERAL_NATAL_GEJU_TRANSPARENCY_SLOT_SOURCE_REFERENCES,
  buildGeneralNatalGejuTransparencySlotSourceEvidence,
} from '../src/research/general-natal-geju-transparency-slot-source-evidence.js';

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

function snapshot(options: {
  monthHiddenStems?: readonly HeavenlyStem[];
  yearStem?: HeavenlyStem;
  monthStem?: HeavenlyStem;
  dayStem?: HeavenlyStem;
  hourStem?: HeavenlyStem;
  monthBranch?: EarthlyBranch;
  hourResolved?: boolean;
} = {}): CanonicalSajuSnapshot {
  const hourResolved = options.hourResolved ?? true;
  const yearStem = options.yearStem ?? '계';
  const monthStem = options.monthStem ?? '기';
  const dayStem = options.dayStem ?? '정';
  const hourStem = options.hourStem ?? '신';
  const monthBranch = options.monthBranch ?? '축';

  return {
    snapshotId: 'synthetic_general_natal_geju_slot_evidence',
    schemaVersion: 'saju-canonical-v1.4',
    calculationHash: 'e'.repeat(64),
    createdAt: '2026-09-12T00:00:00.000Z',
    input: {
      calendarType: 'solar',
      date: { year: 2000, month: 1, day: 1 },
      time: hourResolved ? { known: true, hour: 12, minute: 0 } : { known: false },
      sexForTraditionalCalculation: 'unspecified',
    },
    policy: {
      policyId: 'synthetic/general-natal-geju-slot-evidence',
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
      month: { status: 'resolved', value: pillar(monthStem, monthBranch) },
      day: { status: 'resolved', value: pillar(dayStem, '오') },
      hour: hourResolved
        ? { status: 'resolved', value: pillar(hourStem, '유') }
        : { status: 'unavailable', reasonCode: 'synthetic-missing-hour' },
    },
    derivedFacts: {
      dayMaster: { status: 'resolved', value: { value: dayStem, ...STEM_META[dayStem] } },
      tenGods: { status: 'unavailable', reasonCode: 'synthetic-not-needed' },
      voidBranches: { status: 'resolved', value: [] },
      hiddenStems: hiddenMonth(options.monthHiddenStems ?? ['기', '신', '계']),
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
      policy: { id: 'synthetic/general-natal-geju-slot-evidence', version: '1' },
      schema: { id: 'myeonghwa-canonical-saju', version: 'saju-canonical-v1.4' },
    },
  };
}

describe('General Natal Gyeokguk transparency slot source evidence', () => {
  test('binds only source-observed positive year/month/hour placement evidence', () => {
    const report = buildGeneralNatalGejuTransparencySlotSourceEvidence(snapshot());

    expect(report.status).toBe('resolved_partial_slot_evidence_only');
    expect(report.sourceObservedTransparencySlots).toEqual(['year', 'month', 'hour']);
    expect(GENERAL_NATAL_GEJU_SOURCE_OBSERVED_TRANSPARENCY_SLOTS).toEqual([
      'year',
      'month',
      'hour',
    ]);
    expect(report.hiddenStemEvidence).toEqual([
      {
        stem: '기',
        status: 'positive_source_scoped_transparency_observed',
        sourceObservedAdmissibleExactMatchPositions: ['month'],
        daySlotExactMatchObserved: false,
        positiveTransparencyExistenceOnObservedSlotsEstablished: true,
        fullTransparencyPredicateEstablished: false,
        selectionEffectEstablished: false,
        candidateEmitted: false,
      },
      {
        stem: '신',
        status: 'positive_source_scoped_transparency_observed',
        sourceObservedAdmissibleExactMatchPositions: ['hour'],
        daySlotExactMatchObserved: false,
        positiveTransparencyExistenceOnObservedSlotsEstablished: true,
        fullTransparencyPredicateEstablished: false,
        selectionEffectEstablished: false,
        candidateEmitted: false,
      },
      {
        stem: '계',
        status: 'positive_source_scoped_transparency_observed',
        sourceObservedAdmissibleExactMatchPositions: ['year'],
        daySlotExactMatchObserved: false,
        positiveTransparencyExistenceOnObservedSlotsEstablished: true,
        fullTransparencyPredicateEstablished: false,
        selectionEffectEstablished: false,
        candidateEmitted: false,
      },
    ]);
  });

  test('keeps a day-only exact match unresolved rather than inferring inclusion or exclusion', () => {
    const report = buildGeneralNatalGejuTransparencySlotSourceEvidence(
      snapshot({ monthHiddenStems: ['정'] }),
    );

    expect(report.hiddenStemEvidence).toEqual([
      {
        stem: '정',
        status: 'day_slot_match_source_admissibility_unresolved',
        sourceObservedAdmissibleExactMatchPositions: [],
        daySlotExactMatchObserved: true,
        positiveTransparencyExistenceOnObservedSlotsEstablished: false,
        fullTransparencyPredicateEstablished: false,
        selectionEffectEstablished: false,
        candidateEmitted: false,
      },
    ]);
    expect(report.daySlotAdmissibilityAuthorized).toBe(false);
    expect(report.sourceObservedSlotSetExhaustive).toBe(false);
  });

  test('preserves plural positive positions without introducing precedence', () => {
    const report = buildGeneralNatalGejuTransparencySlotSourceEvidence(
      snapshot({ monthHiddenStems: ['계'], yearStem: '계', hourStem: '계' }),
    );

    expect(report.hiddenStemEvidence[0]?.sourceObservedAdmissibleExactMatchPositions).toEqual([
      'year',
      'hour',
    ]);
    expect(report.hiddenStemEvidence[0]?.positiveTransparencyExistenceOnObservedSlotsEstablished).toBe(
      true,
    );
    expect(report.multipleCandidateRepresentationAuthorized).toBe(false);
    expect(report.candidateFactsEmitted).toBe(false);
  });

  test('does not apply the selected mixed-qi source rule outside 辰戌丑未', () => {
    const report = buildGeneralNatalGejuTransparencySlotSourceEvidence(
      snapshot({ monthBranch: '인' }),
    );

    expect(report.status).toBe('outside_selected_mixed_qi_scope');
    expect(report.mixedQiSourceScopeApplies).toBe(false);
    expect(report.hiddenStemEvidence).toEqual([]);
  });

  test('fails closed when the canonical four-stem observation substrate is unavailable', () => {
    const report = buildGeneralNatalGejuTransparencySlotSourceEvidence(
      snapshot({ hourResolved: false }),
    );

    expect(report.status).toBe('canonical_substrate_unavailable');
    expect(report.unavailableReasonCode).toBe(
      'general-natal-geju-observation-requires-resolved-four-pillar-stems',
    );
    expect(report.hiddenStemEvidence).toEqual([]);
  });

  test('keeps selection, candidate, establishment, production-facing authority fail-closed', () => {
    const first = buildGeneralNatalGejuTransparencySlotSourceEvidence(snapshot());
    const second = buildGeneralNatalGejuTransparencySlotSourceEvidence(snapshot());

    expect(GENERAL_NATAL_GEJU_TRANSPARENCY_SLOT_SOURCE_EVIDENCE_VERSION).toBe(
      '0.1.0-research',
    );
    expect(first.positiveTransparencyExistenceOnObservedSlotsAuthorized).toBe(true);
    expect(first.fullTransparencyPredicateAuthorized).toBe(false);
    expect(first.transparencySelectionPredicateAuthorized).toBe(false);
    expect(first.branchMeetingSelectionEffectAuthorized).toBe(false);
    expect(first.candidateDerivationAuthorized).toBe(false);
    expect(first.establishmentPredicateAuthorized).toBe(false);
    expect(first.candidateFactsEmitted).toBe(false);
    expect(first.establishmentFactsEmitted).toBe(false);
    expect(first.openPredicateGaps).toEqual(GENERAL_NATAL_GEJU_CANDIDATE_OPEN_PREDICATE_GAPS);
    expect(first.reportId).toBe(second.reportId);
  });

  test('pins distinct source locators for year/hour and month placement evidence', () => {
    expect(GENERAL_NATAL_GEJU_TRANSPARENCY_SLOT_SOURCE_REFERENCES.yearHourPlacement.locator.anchor).toContain(
      '財印分居年時',
    );
    expect(GENERAL_NATAL_GEJU_TRANSPARENCY_SLOT_SOURCE_REFERENCES.monthPlacement.locator.anchor).toContain(
      '壬辰月',
    );
  });
});
