import { describe, expect, test } from 'vitest';
import type {
  CanonicalSajuSnapshot,
  EarthlyBranch,
  FiveElement,
  HeavenlyStem,
  HiddenStemChartFact,
  PillarFact,
  StructuralRelationCandidate,
  YinYang,
} from '../src/contracts/calculation.js';
import { GENERAL_NATAL_GEJU_CANDIDATE_OPEN_PREDICATE_GAPS } from '../src/research/general-natal-geju-candidate-source-frontier.js';
import {
  GENERAL_NATAL_GEJU_SELECTION_SIGNAL_OBSERVATION_VERSION,
  buildGeneralNatalGejuSelectionSignalObservation,
} from '../src/research/general-natal-geju-selection-signal-observation.js';

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

function fullThreeRelation(
  monthBranch: EarthlyBranch,
  otherBranches: readonly [EarthlyBranch, EarthlyBranch],
  relationId = 'synthetic_selection_signal_three_combination',
): StructuralRelationCandidate {
  return {
    relationId,
    kind: 'branch_three_combination',
    participants: [
      { pillar: 'month', component: 'branch', value: monthBranch },
      { pillar: 'day', component: 'branch', value: otherBranches[0] },
      { pillar: 'hour', component: 'branch', value: otherBranches[1] },
    ],
    sourceIds: ['synthetic-structural-source'],
    semantics: {
      structuralMatchOnly: true,
      transformationEstablished: false,
    },
  };
}

function snapshot(options: {
  monthBranch?: EarthlyBranch;
  monthHiddenStems?: readonly HeavenlyStem[];
  yearStem?: HeavenlyStem;
  monthStem?: HeavenlyStem;
  dayStem?: HeavenlyStem;
  hourStem?: HeavenlyStem;
  meetingBranches?: readonly [EarthlyBranch, EarthlyBranch];
  includeMeeting?: boolean;
  structuralRelationsResolved?: boolean;
} = {}): CanonicalSajuSnapshot {
  const monthBranch = options.monthBranch ?? '진';
  const yearStem = options.yearStem ?? '갑';
  const monthStem = options.monthStem ?? '병';
  const dayStem = options.dayStem ?? '정';
  const hourStem = options.hourStem ?? '경';
  const meetingBranches = options.meetingBranches ?? ['신', '자'];
  const includeMeeting = options.includeMeeting ?? false;
  const structuralRelationsResolved = options.structuralRelationsResolved ?? true;

  return {
    snapshotId: `synthetic_general_natal_selection_signal_${monthBranch}`,
    schemaVersion: 'saju-canonical-v1.4',
    calculationHash: '9'.repeat(64),
    createdAt: '2026-09-12T00:00:00.000Z',
    input: {
      calendarType: 'solar',
      date: { year: 2000, month: 1, day: 1 },
      time: { known: true, hour: 12, minute: 0 },
      sexForTraditionalCalculation: 'unspecified',
    },
    policy: {
      policyId: 'synthetic/general-natal-selection-signal-observation',
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
      clockTime: { status: 'resolved', value: { hour: 12, minute: 0 } },
      timeZone: 'Asia/Seoul',
      appliedCorrections: [],
    },
    pillars: {
      year: { status: 'resolved', value: pillar(yearStem, '축') },
      month: { status: 'resolved', value: pillar(monthStem, monthBranch) },
      day: { status: 'resolved', value: pillar(dayStem, meetingBranches[0]) },
      hour: { status: 'resolved', value: pillar(hourStem, meetingBranches[1]) },
    },
    derivedFacts: {
      dayMaster: { status: 'resolved', value: { value: dayStem, ...STEM_META[dayStem] } },
      tenGods: { status: 'unavailable', reasonCode: 'synthetic-not-needed' },
      voidBranches: { status: 'resolved', value: [] },
      hiddenStems: hiddenMonth(options.monthHiddenStems ?? ['계', '을', '무']),
      structuralRelations: structuralRelationsResolved
        ? {
            status: 'resolved',
            value: includeMeeting
              ? [fullThreeRelation(monthBranch, meetingBranches)]
              : [],
          }
        : { status: 'unavailable', reasonCode: 'synthetic-structural-relations-unavailable' },
    },
    luckCycle: { status: 'unavailable', reasonCode: 'synthetic-not-needed' },
    scenarios: [],
    completeness: {
      birthTimeKnown: true,
      fullyResolved: false,
      resolvedPaths: [],
      ambiguousPaths: [],
      unavailablePaths: [],
    },
    provenance: {
      engine: { name: 'synthetic', version: '1' },
      adapter: { name: 'synthetic', version: '1' },
      policy: { id: 'synthetic/general-natal-selection-signal-observation', version: '1' },
      schema: { id: 'myeonghwa-canonical-saju', version: 'saju-canonical-v1.4' },
    },
  };
}

describe('General Natal Gyeokguk selection signal observation', () => {
  test('represents zero currently governed source signals without claiming no candidate exists', () => {
    const report = buildGeneralNatalGejuSelectionSignalObservation(snapshot());

    expect(report.status).toBe('resolved_zero_governed_source_signals');
    expect(report.signalCount).toBe(0);
    expect(report.signals).toEqual([]);
    expect(report.signalSetExhaustiveAuthorized).toBe(false);
    expect(report.zeroSignalMeansNoCandidateAuthorized).toBe(false);
  });

  test('represents one positive transparency signal as an observation rather than a candidate', () => {
    const report = buildGeneralNatalGejuSelectionSignalObservation(
      snapshot({ monthHiddenStems: ['계'], yearStem: '계' }),
    );

    expect(report.status).toBe('resolved_one_governed_source_signal');
    expect(report.signalCount).toBe(1);
    expect(report.signals[0]).toMatchObject({
      signalKind: 'transparency',
      stem: '계',
      sourceObservedExactMatchPositions: ['year'],
      selectionEffectEstablished: false,
      candidateIdentityEstablished: false,
      rankAssigned: false,
      precedenceAssigned: false,
      strengthAssigned: false,
      candidateEmitted: false,
    });
  });

  test('preserves multiple transparent hidden-stem observations without assigning order semantics', () => {
    const report = buildGeneralNatalGejuSelectionSignalObservation(
      snapshot({ monthHiddenStems: ['계', '기'], yearStem: '계', monthStem: '기' }),
    );

    expect(report.status).toBe('resolved_multiple_governed_source_signals');
    expect(report.signalCount).toBe(2);
    expect(report.signals.every((signal) => signal.signalKind === 'transparency')).toBe(true);
    expect(report.signalArrayOrderSemanticAuthorized).toBe(false);
    expect(report.singleWinnerRequirementAuthorized).toBe(false);
    expect(report.signalRankingAuthorized).toBe(false);
    expect(report.signalPrecedenceAuthorized).toBe(false);
  });

  test('keeps plural visible positions for one hidden stem inside one transparency signal', () => {
    const report = buildGeneralNatalGejuSelectionSignalObservation(
      snapshot({ monthHiddenStems: ['계'], yearStem: '계', hourStem: '계' }),
    );

    expect(report.status).toBe('resolved_one_governed_source_signal');
    expect(report.signalCount).toBe(1);
    expect(report.signals[0]).toMatchObject({
      signalKind: 'transparency',
      stem: '계',
      sourceObservedExactMatchPositions: ['hour', 'year'],
    });
  });

  test('represents transparency and source-aligned meeting as coexisting signals without candidate multiplicity', () => {
    const report = buildGeneralNatalGejuSelectionSignalObservation(
      snapshot({
        monthHiddenStems: ['계'],
        yearStem: '계',
        includeMeeting: true,
        meetingBranches: ['신', '자'],
      }),
    );

    expect(report.status).toBe('resolved_multiple_governed_source_signals');
    expect(report.signalCount).toBe(2);
    expect(new Set(report.signals.map((signal) => signal.signalKind))).toEqual(
      new Set(['transparency', 'branch_meeting']),
    );
    expect(report.sourceSignalCoexistenceAuthorized).toBe(true);
    expect(report.multipleCandidateRepresentationAuthorized).toBe(false);
    expect(report.candidateDerivationAuthorized).toBe(false);
  });

  test('represents a source-aligned meeting alone as one governed signal', () => {
    const report = buildGeneralNatalGejuSelectionSignalObservation(
      snapshot({ includeMeeting: true, meetingBranches: ['신', '자'] }),
    );

    expect(report.status).toBe('resolved_one_governed_source_signal');
    expect(report.signalCount).toBe(1);
    expect(report.signals[0]).toMatchObject({
      signalKind: 'branch_meeting',
      sourceExampleId: 'CHEN_SHEN_ZI_MEETING',
      monthBranch: '진',
      selectionEffectEstablished: false,
      candidateIdentityEstablished: false,
      candidateEmitted: false,
    });
  });

  test('does not apply the signal representation outside the selected mixed-qi source scope', () => {
    const report = buildGeneralNatalGejuSelectionSignalObservation(
      snapshot({ monthBranch: '인', monthHiddenStems: ['갑'], yearStem: '갑' }),
    );

    expect(report.status).toBe('outside_selected_mixed_qi_scope');
    expect(report.mixedQiSourceScopeApplies).toBe(false);
    expect(report.signals).toEqual([]);
    expect(report.signalCount).toBe(0);
  });

  test('fails closed rather than returning a partial signal list when an upstream substrate is unavailable', () => {
    const report = buildGeneralNatalGejuSelectionSignalObservation(
      snapshot({
        monthHiddenStems: ['계'],
        yearStem: '계',
        structuralRelationsResolved: false,
      }),
    );

    expect(report.status).toBe('canonical_substrate_unavailable');
    expect(report.unavailableReasonCode).toBe(
      'general-natal-geju-branch-meeting-requires-resolved-structural-relations',
    );
    expect(report.signals).toEqual([]);
    expect(report.signalCount).toBe(0);
  });

  test('keeps signal, candidate, establishment, production-facing authority separated and deterministic', () => {
    const first = buildGeneralNatalGejuSelectionSignalObservation(
      snapshot({ monthHiddenStems: ['계'], yearStem: '계', includeMeeting: true }),
    );
    const second = buildGeneralNatalGejuSelectionSignalObservation(
      snapshot({ monthHiddenStems: ['계'], yearStem: '계', includeMeeting: true }),
    );

    expect(GENERAL_NATAL_GEJU_SELECTION_SIGNAL_OBSERVATION_VERSION).toBe('0.1.0-research');
    expect(first.governedSourceSignalObservationAuthorized).toBe(true);
    expect(first.zeroOneMultipleSignalCardinalityObservationAuthorized).toBe(true);
    expect(first.signalSetExhaustiveAuthorized).toBe(false);
    expect(first.zeroSignalMeansNoCandidateAuthorized).toBe(false);
    expect(first.signalArrayOrderSemanticAuthorized).toBe(false);
    expect(first.singleWinnerRequirementAuthorized).toBe(false);
    expect(first.signalRankingAuthorized).toBe(false);
    expect(first.signalPrecedenceAuthorized).toBe(false);
    expect(first.signalStrengthAuthorized).toBe(false);
    expect(first.candidateIdentityAuthorized).toBe(false);
    expect(first.multipleCandidateRepresentationAuthorized).toBe(false);
    expect(first.candidateDerivationAuthorized).toBe(false);
    expect(first.establishmentPredicateAuthorized).toBe(false);
    expect(first.candidateFactsEmitted).toBe(false);
    expect(first.establishmentFactsEmitted).toBe(false);
    expect(first.openPredicateGaps).toEqual(GENERAL_NATAL_GEJU_CANDIDATE_OPEN_PREDICATE_GAPS);
    expect(first.reportId).toBe(second.reportId);
    expect(first.signals.map((signal) => signal.signalId)).toEqual(
      second.signals.map((signal) => signal.signalId),
    );
  });
});
