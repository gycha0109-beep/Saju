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
  GENERAL_NATAL_GEJU_SOURCE_SEMANTIC_USE_IDENTITY_VERSION,
  buildGeneralNatalGejuSourceSemanticUseIdentity,
} from '../src/research/general-natal-geju-source-semantic-use-identity.js';

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
): StructuralRelationCandidate {
  return {
    relationId: `synthetic_source_semantic_use_${monthBranch}_${otherBranches.join('_')}`,
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
  dayMasterResolved?: boolean;
} = {}): CanonicalSajuSnapshot {
  const monthBranch = options.monthBranch ?? '진';
  const yearStem = options.yearStem ?? '병';
  const monthStem = options.monthStem ?? '경';
  const dayStem = options.dayStem ?? '갑';
  const hourStem = options.hourStem ?? '을';
  const meetingBranches = options.meetingBranches ?? ['신', '자'];
  const includeMeeting = options.includeMeeting ?? false;
  const structuralRelationsResolved = options.structuralRelationsResolved ?? true;
  const dayMasterResolved = options.dayMasterResolved ?? true;

  return {
    snapshotId: `synthetic_source_semantic_use_${monthBranch}_${dayStem}`,
    schemaVersion: 'saju-canonical-v1.4',
    calculationHash: '8'.repeat(64),
    createdAt: '2026-09-12T00:00:00.000Z',
    input: {
      calendarType: 'solar',
      date: { year: 2000, month: 1, day: 1 },
      time: { known: true, hour: 12, minute: 0 },
      sexForTraditionalCalculation: 'unspecified',
    },
    policy: {
      policyId: 'synthetic/general-natal-source-semantic-use-identity',
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
      dayMaster: dayMasterResolved
        ? { status: 'resolved', value: { value: dayStem, ...STEM_META[dayStem] } }
        : { status: 'unavailable', reasonCode: 'synthetic-day-master-unavailable' },
      tenGods: { status: 'unavailable', reasonCode: 'synthetic-not-needed' },
      voidBranches: { status: 'resolved', value: [] },
      hiddenStems: hiddenMonth(options.monthHiddenStems ?? []),
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
      policy: { id: 'synthetic/general-natal-source-semantic-use-identity', version: '1' },
      schema: { id: 'myeonghwa-canonical-saju', version: 'saju-canonical-v1.4' },
    },
  };
}

describe('General Natal Gyeokguk source semantic-use identity observation', () => {
  test('observes two governed mechanisms on one source-named 印 use only for the exact 甲辰 exemplar', () => {
    const report = buildGeneralNatalGejuSourceSemanticUseIdentity(
      snapshot({
        monthBranch: '진',
        monthHiddenStems: ['계'],
        yearStem: '계',
        dayStem: '갑',
        includeMeeting: true,
        meetingBranches: ['신', '자'],
      }),
    );

    expect(report.status).toBe('resolved_source_direct_semantic_use_identity_observed');
    expect(report.matchedDirectExemplarId).toBe('JIA_CHEN_GUI_SHEN_ZI_ONE_YIN_USE');
    expect(report.governedSignalCount).toBe(2);
    expect(report.sourceSemanticUseCount).toBe(1);
    expect(report.sourceSemanticUses).toHaveLength(1);
    expect(report.sourceSemanticUses[0]).toMatchObject({
      semanticUseKey: 'source_yin',
      sourceLabel: '印',
      sourceDirectIdentityObserved: true,
      candidateIdentityEstablished: false,
      candidateEmitted: false,
    });
    expect(new Set(report.sourceSemanticUses[0]?.supportingSignalKinds)).toEqual(
      new Set(['transparency', 'branch_meeting']),
    );
    expect(report.relationObservations).toContain(
      'source_direct_same_semantic_use_across_signal_kinds',
    );
  });

  test('observes 官 and 傷官 as distinct source-named uses in the exact 壬未 exemplar', () => {
    const report = buildGeneralNatalGejuSourceSemanticUseIdentity(
      snapshot({
        monthBranch: '미',
        monthHiddenStems: ['기'],
        yearStem: '기',
        dayStem: '임',
        includeMeeting: true,
        meetingBranches: ['해', '묘'],
      }),
    );

    expect(report.status).toBe('resolved_source_direct_semantic_use_identity_observed');
    expect(report.matchedDirectExemplarId).toBe('REN_WEI_JI_HAI_MAO_GUAN_AND_SHANG_GUAN_USES');
    expect(report.governedSignalCount).toBe(2);
    expect(report.sourceSemanticUseCount).toBe(2);
    expect(new Set(report.sourceSemanticUses.map((use) => use.sourceLabel))).toEqual(
      new Set(['官', '傷官']),
    );
    expect(report.relationObservations).toContain('source_direct_distinct_semantic_uses');
  });

  test('observes three governed signals mapping to two source-named uses in the exact 甲戌 exemplar', () => {
    const report = buildGeneralNatalGejuSourceSemanticUseIdentity(
      snapshot({
        monthBranch: '술',
        monthHiddenStems: ['신', '정'],
        yearStem: '신',
        monthStem: '정',
        dayStem: '갑',
        includeMeeting: true,
        meetingBranches: ['인', '오'],
      }),
    );

    expect(report.status).toBe('resolved_source_direct_semantic_use_identity_observed');
    expect(report.matchedDirectExemplarId).toBe('JIA_XU_XIN_DING_YIN_WU_THREE_SIGNALS_TWO_USES');
    expect(report.governedSignalCount).toBe(3);
    expect(report.sourceSemanticUseCount).toBe(2);
    expect(new Set(report.sourceSemanticUses.map((use) => use.sourceLabel))).toEqual(
      new Set(['官', '傷官']),
    );
    const shangGuan = report.sourceSemanticUses.find((use) => use.sourceLabel === '傷官');
    expect(new Set(shangGuan?.supportingSignalKinds)).toEqual(
      new Set(['transparency', 'branch_meeting']),
    );
    expect(report.relationObservations).toContain(
      'source_direct_many_signals_to_fewer_semantic_uses',
    );
  });

  test('does not generalize an exact source exemplar when an extra governed signal is present', () => {
    const report = buildGeneralNatalGejuSourceSemanticUseIdentity(
      snapshot({
        monthBranch: '진',
        monthHiddenStems: ['계', '무'],
        yearStem: '계',
        monthStem: '무',
        dayStem: '갑',
        includeMeeting: true,
        meetingBranches: ['신', '자'],
      }),
    );

    expect(report.status).toBe('resolved_no_direct_source_identity_exemplar');
    expect(report.governedSignalCount).toBe(3);
    expect(report.sourceSemanticUses).toEqual([]);
    expect(report.sourceSemanticUseCount).toBe(0);
    expect(report.noDirectExemplarMeansNoSemanticUseAuthorized).toBe(false);
  });

  test('keeps source-use identity observation separate from candidate identity and candidate deduplication', () => {
    const report = buildGeneralNatalGejuSourceSemanticUseIdentity(
      snapshot({
        monthBranch: '진',
        monthHiddenStems: ['계'],
        yearStem: '계',
        dayStem: '갑',
        includeMeeting: true,
        meetingBranches: ['신', '자'],
      }),
    );

    expect(report.sourceDirectSemanticUseIdentityObservationAuthorized).toBe(true);
    expect(report.sourceDirectCrossSignalSameUseObservationAuthorized).toBe(true);
    expect(report.sourceDirectDistinctUseObservationAuthorized).toBe(true);
    expect(report.sourceDirectManySignalsToFewerUsesObservationAuthorized).toBe(true);
    expect(report.semanticUseSetExhaustiveAuthorized).toBe(false);
    expect(report.generalSignalToSemanticUseIdentityPredicateAuthorized).toBe(false);
    expect(report.semanticUseArrayOrderSemanticAuthorized).toBe(false);
    expect(report.signalSemanticDeduplicationIntoCandidateAuthorized).toBe(false);
    expect(report.candidateIdentityAuthorized).toBe(false);
    expect(report.multipleCandidateRepresentationAuthorized).toBe(false);
    expect(report.candidateDerivationAuthorized).toBe(false);
    expect(report.signalRankingAuthorized).toBe(false);
    expect(report.signalPrecedenceAuthorized).toBe(false);
    expect(report.signalStrengthAuthorized).toBe(false);
    expect(report.establishmentPredicateAuthorized).toBe(false);
    expect(report.candidateFactsEmitted).toBe(false);
    expect(report.establishmentFactsEmitted).toBe(false);
    expect(report.openPredicateGaps).toEqual(GENERAL_NATAL_GEJU_CANDIDATE_OPEN_PREDICATE_GAPS);
  });

  test('does not apply outside the selected mixed-qi source scope', () => {
    const report = buildGeneralNatalGejuSourceSemanticUseIdentity(
      snapshot({ monthBranch: '인', dayStem: '갑', monthHiddenStems: ['갑'], yearStem: '갑' }),
    );

    expect(report.status).toBe('outside_selected_mixed_qi_scope');
    expect(report.sourceSemanticUses).toEqual([]);
    expect(report.sourceSemanticUseCount).toBe(0);
  });

  test('fails closed when the day-master identity required by the direct exemplar contract is unavailable', () => {
    const report = buildGeneralNatalGejuSourceSemanticUseIdentity(
      snapshot({
        monthBranch: '진',
        monthHiddenStems: ['계'],
        yearStem: '계',
        dayStem: '갑',
        includeMeeting: true,
        meetingBranches: ['신', '자'],
        dayMasterResolved: false,
      }),
    );

    expect(report.status).toBe('canonical_substrate_unavailable');
    expect(report.unavailableReasonCode).toBe(
      'general-natal-geju-source-semantic-use-requires-resolved-day-master',
    );
    expect(report.sourceSemanticUses).toEqual([]);
  });

  test('inherits upstream fail-close when structural-relation substrate is unavailable', () => {
    const report = buildGeneralNatalGejuSourceSemanticUseIdentity(
      snapshot({
        monthBranch: '진',
        monthHiddenStems: ['계'],
        yearStem: '계',
        dayStem: '갑',
        structuralRelationsResolved: false,
      }),
    );

    expect(report.status).toBe('canonical_substrate_unavailable');
    expect(report.unavailableReasonCode).toBe(
      'general-natal-geju-branch-meeting-requires-resolved-structural-relations',
    );
    expect(report.sourceSemanticUses).toEqual([]);
  });

  test('is deterministic and remains research-only', () => {
    const input = snapshot({
      monthBranch: '술',
      monthHiddenStems: ['신', '정'],
      yearStem: '신',
      monthStem: '정',
      dayStem: '갑',
      includeMeeting: true,
      meetingBranches: ['인', '오'],
    });
    const first = buildGeneralNatalGejuSourceSemanticUseIdentity(input);
    const second = buildGeneralNatalGejuSourceSemanticUseIdentity(input);

    expect(GENERAL_NATAL_GEJU_SOURCE_SEMANTIC_USE_IDENTITY_VERSION).toBe('0.1.0-research');
    expect(first.reportId).toBe(second.reportId);
    expect(first).toEqual(second);
    expect(first.candidateFactsEmitted).toBe(false);
    expect(first.establishmentFactsEmitted).toBe(false);
  });
});
