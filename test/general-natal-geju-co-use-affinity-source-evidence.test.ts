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
  GENERAL_NATAL_GEJU_CO_USE_AFFINITY_SOURCE_EVIDENCE_VERSION,
  GENERAL_NATAL_GEJU_CO_USE_AFFINITY_SOURCE_EXEMPLARS,
  GENERAL_NATAL_GEJU_CO_USE_AFFINITY_SOURCE_REFERENCES,
  buildGeneralNatalGejuCoUseAffinitySourceEvidence,
} from '../src/research/general-natal-geju-co-use-affinity-source-evidence.js';

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
    relationId: `synthetic_${monthBranch}_${otherBranches.join('_')}`,
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
  dayMaster: HeavenlyStem;
  monthBranch: EarthlyBranch;
  monthHiddenStems: readonly HeavenlyStem[];
  meetingBranches: readonly [EarthlyBranch, EarthlyBranch];
  yearStem?: HeavenlyStem;
  monthStem?: HeavenlyStem;
  hourStem?: HeavenlyStem;
  includeMeeting?: boolean;
  structuralRelationsResolved?: boolean;
  dayMasterResolved?: boolean;
}): CanonicalSajuSnapshot {
  const yearStem = options.yearStem ?? '경';
  const monthStem = options.monthStem ?? '무';
  const hourStem = options.hourStem ?? '병';
  const includeMeeting = options.includeMeeting ?? true;
  const structuralRelationsResolved = options.structuralRelationsResolved ?? true;
  const dayMasterResolved = options.dayMasterResolved ?? true;
  const relations = includeMeeting
    ? [fullThreeRelation(options.monthBranch, options.meetingBranches)]
    : [];

  return {
    snapshotId: `synthetic_co_use_${options.dayMaster}_${options.monthBranch}`,
    schemaVersion: 'saju-canonical-v1.4',
    calculationHash: 'c'.repeat(64),
    createdAt: '2026-09-12T00:00:00.000Z',
    input: {
      calendarType: 'solar',
      date: { year: 2000, month: 1, day: 1 },
      time: { known: true, hour: 12, minute: 0 },
      sexForTraditionalCalculation: 'unspecified',
    },
    policy: {
      policyId: 'synthetic/general-natal-geju-co-use-affinity',
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
      month: { status: 'resolved', value: pillar(monthStem, options.monthBranch) },
      day: {
        status: 'resolved',
        value: pillar(options.dayMaster, options.meetingBranches[0]),
      },
      hour: { status: 'resolved', value: pillar(hourStem, options.meetingBranches[1]) },
    },
    derivedFacts: {
      dayMaster: dayMasterResolved
        ? {
            status: 'resolved',
            value: { value: options.dayMaster, ...STEM_META[options.dayMaster] },
          }
        : { status: 'unavailable', reasonCode: 'synthetic-day-master-unavailable' },
      tenGods: { status: 'unavailable', reasonCode: 'synthetic-not-needed' },
      voidBranches: { status: 'resolved', value: [] },
      hiddenStems: hiddenMonth(options.monthHiddenStems),
      structuralRelations: structuralRelationsResolved
        ? { status: 'resolved', value: relations }
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
      policy: { id: 'synthetic/general-natal-geju-co-use-affinity', version: '1' },
      schema: { id: 'myeonghwa-canonical-saju', version: 'saju-canonical-v1.4' },
    },
  };
}

describe('General Natal Gyeokguk transparency + branch-meeting co-use affinity source evidence', () => {
  test('records source-scoped co-use without inventing a generalized quality classification', () => {
    const report = buildGeneralNatalGejuCoUseAffinitySourceEvidence(
      snapshot({
        dayMaster: '갑',
        monthBranch: '축',
        monthHiddenStems: ['기', '신', '계'],
        meetingBranches: ['사', '유'],
        monthStem: '기',
      }),
    );

    expect(report.status).toBe('resolved_source_co_use_observed_quality_unsettled');
    expect(report.transparencyAndMeetingCoUseObserved).toBe(true);
    expect(report.positiveTransparencyStems).toContain('기');
    expect(report.sourceAlignedMeetingExampleIds).toEqual(['CHOU_SI_YOU_MEETING']);
    expect(report.directExemplarEvidence).toEqual([]);
    expect(report.transparencyAndMeetingCoUseSourceBoundaryAuthorized).toBe(true);
    expect(report.sourcePluralCoUseBoundaryObserved).toBe(true);
    expect(report.singleWinnerRequirementAuthorized).toBe(false);
  });

  test('binds the direct 甲辰 癸 + 申子 source exemplar only as having-affinity evidence', () => {
    const report = buildGeneralNatalGejuCoUseAffinitySourceEvidence(
      snapshot({
        dayMaster: '갑',
        monthBranch: '진',
        monthHiddenStems: ['무', '을', '계'],
        meetingBranches: ['신', '자'],
        yearStem: '계',
      }),
    );

    expect(report.status).toBe('resolved_source_co_use_with_direct_exemplar_quality_evidence');
    expect(report.directExemplarEvidence).toEqual([
      expect.objectContaining({
        exemplarId: 'JIA_CHEN_GUI_SHEN_ZI_HAVING_AFFINITY',
        affinityClassification: 'source_direct_having_affinity',
        sourceDirectClassificationObserved: true,
        generalizedAffinityPredicateEstablished: false,
        branchMeetingSelectionEffectEstablished: false,
        candidateEmitted: false,
        establishmentVerdictEmitted: false,
      }),
    ]);
  });

  test('binds the direct 壬未 己 + 亥卯 source exemplar only as lacking-affinity evidence', () => {
    const report = buildGeneralNatalGejuCoUseAffinitySourceEvidence(
      snapshot({
        dayMaster: '임',
        monthBranch: '미',
        monthHiddenStems: ['기', '정', '을'],
        meetingBranches: ['해', '묘'],
        monthStem: '기',
      }),
    );

    expect(report.status).toBe('resolved_source_co_use_with_direct_exemplar_quality_evidence');
    expect(report.directExemplarEvidence[0]).toMatchObject({
      exemplarId: 'REN_WEI_JI_HAI_MAO_LACKING_AFFINITY',
      affinityClassification: 'source_direct_lacking_affinity',
      sourceDirectClassificationObserved: true,
      generalizedAffinityPredicateEstablished: false,
      candidateEmitted: false,
      establishmentVerdictEmitted: false,
    });
  });

  test('requires both 辛 and 丁 before matching the direct 甲戌 source exemplar', () => {
    const complete = buildGeneralNatalGejuCoUseAffinitySourceEvidence(
      snapshot({
        dayMaster: '갑',
        monthBranch: '술',
        monthHiddenStems: ['무', '신', '정'],
        meetingBranches: ['인', '오'],
        yearStem: '신',
        hourStem: '정',
      }),
    );
    const incomplete = buildGeneralNatalGejuCoUseAffinitySourceEvidence(
      snapshot({
        dayMaster: '갑',
        monthBranch: '술',
        monthHiddenStems: ['무', '신', '정'],
        meetingBranches: ['인', '오'],
        yearStem: '신',
        hourStem: '병',
      }),
    );

    expect(complete.directExemplarEvidence[0]).toMatchObject({
      exemplarId: 'JIA_XU_XIN_DING_YIN_WU_LACKING_AFFINITY',
      requiredTransparencyStems: ['신', '정'],
      affinityClassification: 'source_direct_lacking_affinity',
    });
    expect(incomplete.status).toBe('resolved_source_co_use_observed_quality_unsettled');
    expect(incomplete.directExemplarEvidence).toEqual([]);
  });

  test('does not create co-use evidence when the source-aligned meeting is absent', () => {
    const report = buildGeneralNatalGejuCoUseAffinitySourceEvidence(
      snapshot({
        dayMaster: '갑',
        monthBranch: '진',
        monthHiddenStems: ['무', '을', '계'],
        meetingBranches: ['신', '자'],
        yearStem: '계',
        includeMeeting: false,
      }),
    );

    expect(report.status).toBe('resolved_no_joint_transparency_meeting_evidence');
    expect(report.transparencyAndMeetingCoUseObserved).toBe(false);
    expect(report.directExemplarEvidence).toEqual([]);
  });

  test('does not apply the selected mixed-qi co-use frontier outside 辰戌丑未', () => {
    const report = buildGeneralNatalGejuCoUseAffinitySourceEvidence(
      snapshot({
        dayMaster: '갑',
        monthBranch: '인',
        monthHiddenStems: ['갑', '병', '무'],
        meetingBranches: ['오', '술'],
        yearStem: '갑',
      }),
    );

    expect(report.status).toBe('outside_selected_mixed_qi_scope');
    expect(report.mixedQiSourceScopeApplies).toBe(false);
    expect(report.directExemplarEvidence).toEqual([]);
  });

  test('fails closed when upstream structural-relation substrate is unavailable', () => {
    const report = buildGeneralNatalGejuCoUseAffinitySourceEvidence(
      snapshot({
        dayMaster: '갑',
        monthBranch: '진',
        monthHiddenStems: ['무', '을', '계'],
        meetingBranches: ['신', '자'],
        yearStem: '계',
        structuralRelationsResolved: false,
      }),
    );

    expect(report.status).toBe('canonical_substrate_unavailable');
    expect(report.transparencyAndMeetingCoUseObserved).toBe(false);
    expect(report.directExemplarEvidence).toEqual([]);
  });

  test('keeps generalized quality, selection, candidate, and establishment authority fail-closed', () => {
    const first = buildGeneralNatalGejuCoUseAffinitySourceEvidence(
      snapshot({
        dayMaster: '갑',
        monthBranch: '진',
        monthHiddenStems: ['무', '을', '계'],
        meetingBranches: ['신', '자'],
        yearStem: '계',
      }),
    );
    const second = buildGeneralNatalGejuCoUseAffinitySourceEvidence(
      snapshot({
        dayMaster: '갑',
        monthBranch: '진',
        monthHiddenStems: ['무', '을', '계'],
        meetingBranches: ['신', '자'],
        yearStem: '계',
      }),
    );

    expect(GENERAL_NATAL_GEJU_CO_USE_AFFINITY_SOURCE_EVIDENCE_VERSION).toBe('0.1.0-research');
    expect(first.directSourceExemplarAffinityEvidenceAuthorized).toBe(true);
    expect(first.generalizedAffinityPredicateAuthorized).toBe(false);
    expect(first.generalizedDisaffinityPredicateAuthorized).toBe(false);
    expect(first.transparencySelectionPredicateAuthorized).toBe(false);
    expect(first.branchMeetingSelectionEffectAuthorized).toBe(false);
    expect(first.postInteractionEffectiveBureauAuthorized).toBe(false);
    expect(first.multipleCandidateRepresentationAuthorized).toBe(false);
    expect(first.candidateDerivationAuthorized).toBe(false);
    expect(first.establishmentPredicateAuthorized).toBe(false);
    expect(first.candidateFactsEmitted).toBe(false);
    expect(first.establishmentFactsEmitted).toBe(false);
    expect(first.openPredicateGaps).toEqual(GENERAL_NATAL_GEJU_CANDIDATE_OPEN_PREDICATE_GAPS);
    expect(first.reportId).toBe(second.reportId);
  });

  test('pins the coexistence rule and three intentionally bounded direct quality exemplars', () => {
    expect(GENERAL_NATAL_GEJU_CO_USE_AFFINITY_SOURCE_REFERENCES.coUseRule.locator.anchor).toContain(
      '透與會並用',
    );
    expect(GENERAL_NATAL_GEJU_CO_USE_AFFINITY_SOURCE_REFERENCES.affinityDefinition.locator.anchor).toContain(
      '順而相成',
    );
    expect(GENERAL_NATAL_GEJU_CO_USE_AFFINITY_SOURCE_EXEMPLARS).toHaveLength(3);
  });
});
