import { describe, expect, test } from 'vitest';
import type {
  BranchClashContextFact,
  CanonicalSajuSnapshot,
  EarthlyBranch,
  FiveElement,
  HeavenlyStem,
  HiddenStemChartFact,
  PillarFact,
  YinYang,
} from '../src/contracts/calculation.js';
import {
  BRANCH_CLASH_QUALIFIER_OBSERVATION_SCHEMA_VERSION,
  BRANCH_CLASH_QUALIFIER_OBSERVATION_VERSION,
  enrichCanonicalBranchClashQualifierObservations,
} from '../src/calculation/branch-clash-qualifier-observation-facts.js';

const STEM_META: Readonly<Record<HeavenlyStem, { hanja: string; element: FiveElement; yinYang: YinYang }>> = {
  갑: { hanja: '甲', element: '목', yinYang: '양' }, 을: { hanja: '乙', element: '목', yinYang: '음' },
  병: { hanja: '丙', element: '화', yinYang: '양' }, 정: { hanja: '丁', element: '화', yinYang: '음' },
  무: { hanja: '戊', element: '토', yinYang: '양' }, 기: { hanja: '己', element: '토', yinYang: '음' },
  경: { hanja: '庚', element: '금', yinYang: '양' }, 신: { hanja: '辛', element: '금', yinYang: '음' },
  임: { hanja: '壬', element: '수', yinYang: '양' }, 계: { hanja: '癸', element: '수', yinYang: '음' },
};

const BRANCH_META: Readonly<Record<EarthlyBranch, { hanja: string; element: FiveElement; yinYang: YinYang }>> = {
  자: { hanja: '子', element: '수', yinYang: '양' }, 축: { hanja: '丑', element: '토', yinYang: '음' },
  인: { hanja: '寅', element: '목', yinYang: '양' }, 묘: { hanja: '卯', element: '목', yinYang: '음' },
  진: { hanja: '辰', element: '토', yinYang: '양' }, 사: { hanja: '巳', element: '화', yinYang: '음' },
  오: { hanja: '午', element: '화', yinYang: '양' }, 미: { hanja: '未', element: '토', yinYang: '음' },
  신: { hanja: '申', element: '금', yinYang: '양' }, 유: { hanja: '酉', element: '금', yinYang: '음' },
  술: { hanja: '戌', element: '토', yinYang: '양' }, 해: { hanja: '亥', element: '수', yinYang: '음' },
};

function pillar(stem: HeavenlyStem, branch: EarthlyBranch): PillarFact {
  return { stem: { value: stem, ...STEM_META[stem] }, branch: { value: branch, ...BRANCH_META[branch] } };
}

const hiddenStems: HiddenStemChartFact = {
  year: { status: 'resolved', value: ['계'] },
  month: { status: 'resolved', value: ['기', '신', '계'] },
  day: { status: 'resolved', value: ['정', '기'] },
  hour: { status: 'resolved', value: ['갑', '임'] },
};

const yearDayClash: BranchClashContextFact = {
  relationId: 'branch_clash:year:branch:자|day:branch:오',
  kind: 'branch_clash',
  pairKey: 'year_day',
  participants: [
    { pillar: 'year', branch: '자', hiddenStems: ['계'] },
    { pillar: 'day', branch: '오', hiddenStems: ['정', '기'] },
  ],
  sourceIds: ['SRC-T0-YISI-ZHAN-10', 'SRC-T0-XUANZE-YAOLUE-UPPER'],
  sourceFactRefs: [
    'derivedFacts.structuralRelations',
    'derivedFacts.hiddenStems.year',
    'derivedFacts.hiddenStems.day',
  ],
  semantics: { structuralMatchOnly: true, transformationEstablished: false },
};

function baseSnapshot(options: {
  contextState?: NonNullable<CanonicalSajuSnapshot['derivedFacts']['branchClashContexts']>;
  hidden?: HiddenStemChartFact;
  hourResolved?: boolean;
} = {}): CanonicalSajuSnapshot {
  const contextState = options.contextState ?? {
    status: 'resolved' as const,
    value: { year_day: yearDayClash },
  };
  const hidden = options.hidden ?? hiddenStems;
  const hourResolved = options.hourResolved ?? true;

  return {
    snapshotId: 'synthetic_clash_context_v13',
    schemaVersion: 'saju-canonical-v1.3',
    calculationHash: 'c'.repeat(64),
    createdAt: '2026-08-25T00:00:00.000Z',
    input: {
      calendarType: 'solar',
      date: { year: 2000, month: 1, day: 1 },
      time: { known: hourResolved, ...(hourResolved ? { hour: 12, minute: 0 } : {}) } as CanonicalSajuSnapshot['input']['time'],
      sexForTraditionalCalculation: 'unspecified',
    },
    policy: {
      policyId: 'synthetic/branch-clash-qualifier-observation',
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
        : { status: 'unavailable', reasonCode: 'synthetic-missing' },
      timeZone: 'Asia/Seoul',
      appliedCorrections: [],
    },
    pillars: {
      year: { status: 'resolved', value: pillar('계', '자') },
      month: { status: 'resolved', value: pillar('기', '축') },
      day: { status: 'resolved', value: pillar('정', '오') },
      hour: hourResolved
        ? { status: 'resolved', value: pillar('계', '해') }
        : { status: 'unavailable', reasonCode: 'synthetic-missing' },
    },
    derivedFacts: {
      dayMaster: { status: 'resolved', value: { value: '정', ...STEM_META.정 } },
      tenGods: { status: 'unavailable', reasonCode: 'synthetic-not-needed' },
      voidBranches: { status: 'resolved', value: [] },
      hiddenStems: hidden,
      branchClashContexts: contextState,
    },
    luckCycle: { status: 'unavailable', reasonCode: 'synthetic-not-needed' },
    scenarios: [],
    completeness: {
      birthTimeKnown: hourResolved,
      fullyResolved: false,
      resolvedPaths: ['derivedFacts.branchClashContexts'],
      ambiguousPaths: [],
      unavailablePaths: [],
    },
    provenance: {
      engine: { name: 'synthetic', version: '1' },
      adapter: { name: 'synthetic', version: '1' },
      policy: { id: 'synthetic/branch-clash-qualifier-observation', version: '1' },
      schema: { id: 'myeonghwa-canonical-saju', version: 'saju-canonical-v1.3' },
    },
  };
}

describe('branch clash qualifier observation materialization', () => {
  test('preserves exact visible-stem and hidden-occurrence locations for clash participant hidden stems', () => {
    const result = enrichCanonicalBranchClashQualifierObservations(baseSnapshot());
    const state = result.derivedFacts.branchClashQualifierObservations;
    expect(state?.status).toBe('resolved');
    if (state?.status !== 'resolved') throw new Error('qualifier observations not resolved');

    const observation = state.value.year_day;
    expect(observation?.interveningPillars).toEqual(['month']);
    expect(observation?.participants[0]).toEqual({
      pillar: 'year',
      branch: '자',
      hiddenStemObservations: [
        {
          stem: '계',
          visibleExactStemPositions: ['year', 'hour'],
          hiddenOccurrenceBranchPositions: ['year', 'month'],
        },
      ],
    });
    expect(observation?.participants[1]).toEqual({
      pillar: 'day',
      branch: '오',
      hiddenStemObservations: [
        {
          stem: '정',
          visibleExactStemPositions: ['day'],
          hiddenOccurrenceBranchPositions: ['day'],
        },
        {
          stem: '기',
          visibleExactStemPositions: ['month'],
          hiddenOccurrenceBranchPositions: ['month', 'day'],
        },
      ],
    });
  });

  test('position observation records intervening pillars rather than assigning a distance weight', () => {
    const state = enrichCanonicalBranchClashQualifierObservations(baseSnapshot()).derivedFacts
      .branchClashQualifierObservations;
    if (state?.status !== 'resolved') throw new Error('qualifier observations not resolved');
    const observation = state.value.year_day;
    expect(observation?.interveningPillars).toEqual(['month']);
    expect(observation?.semantics.separationEffectEstablished).toBe(false);
    expect(observation?.semantics.numericWeightAssigned).toBe(false);
  });

  test('visibility and plurality remain raw location observations with no activation or strength verdict', () => {
    const state = enrichCanonicalBranchClashQualifierObservations(baseSnapshot()).derivedFacts
      .branchClashQualifierObservations;
    if (state?.status !== 'resolved') throw new Error('qualifier observations not resolved');
    const observation = state.value.year_day;
    expect(observation?.semantics).toEqual({
      observationOnly: true,
      visibilityEffectEstablished: false,
      separationEffectEstablished: false,
      pluralityEffectEstablished: false,
      numericWeightAssigned: false,
    });
    const serialized = JSON.stringify(observation).toLowerCase();
    expect(serialized).not.toContain('winner');
    expect(serialized).not.toContain('damage');
    expect(serialized).not.toContain('score');
  });

  test('resolved no-clash context produces an empty observation index', () => {
    const result = enrichCanonicalBranchClashQualifierObservations(
      baseSnapshot({ contextState: { status: 'resolved', value: {} } }),
    );
    expect(result.derivedFacts.branchClashQualifierObservations).toEqual({
      status: 'resolved',
      value: {},
    });
  });

  test('unresolved clash context fails closed', () => {
    const result = enrichCanonicalBranchClashQualifierObservations(
      baseSnapshot({
        contextState: { status: 'unavailable', reasonCode: 'synthetic-missing-context' },
      }),
    );
    const state = result.derivedFacts.branchClashQualifierObservations;
    expect(state?.status).toBe('unavailable');
    if (state?.status === 'unavailable') {
      expect(state.reasonCode).toBe(
        'branch-clash-qualifier-observation-requires-resolved-clash-contexts',
      );
    }
  });

  test('unresolved four-pillar visibility surface fails closed', () => {
    const result = enrichCanonicalBranchClashQualifierObservations(
      baseSnapshot({ hourResolved: false }),
    );
    const state = result.derivedFacts.branchClashQualifierObservations;
    expect(state?.status).toBe('unavailable');
    if (state?.status === 'unavailable') {
      expect(state.reasonCode).toBe(
        'branch-clash-qualifier-observation-requires-resolved-four-pillars',
      );
    }
  });

  test('unresolved hidden-stem surface fails closed rather than producing partial plurality evidence', () => {
    const result = enrichCanonicalBranchClashQualifierObservations(
      baseSnapshot({
        hidden: {
          ...hiddenStems,
          hour: { status: 'unavailable', reasonCode: 'synthetic-missing-hidden' },
        },
      }),
    );
    const state = result.derivedFacts.branchClashQualifierObservations;
    expect(state?.status).toBe('unavailable');
    if (state?.status === 'unavailable') {
      expect(state.reasonCode).toBe(
        'branch-clash-qualifier-observation-requires-resolved-hidden-stems',
      );
    }
  });

  test('projection advances canonical identity to v1.4 and remains deterministic', () => {
    const first = enrichCanonicalBranchClashQualifierObservations(baseSnapshot());
    const second = enrichCanonicalBranchClashQualifierObservations(baseSnapshot());
    expect(BRANCH_CLASH_QUALIFIER_OBSERVATION_VERSION).toBe(
      'myeonghwa-branch-clash-qualifier-observation-v1',
    );
    expect(BRANCH_CLASH_QUALIFIER_OBSERVATION_SCHEMA_VERSION).toBe('saju-canonical-v1.4');
    expect(first.schemaVersion).toBe('saju-canonical-v1.4');
    expect(first.provenance.schema.version).toBe('saju-canonical-v1.4');
    expect(first.completeness.resolvedPaths).toContain(
      'derivedFacts.branchClashQualifierObservations',
    );
    expect(first.snapshotId).toBe(second.snapshotId);
    expect(first.calculationHash).toBe(second.calculationHash);
    expect(first.derivedFacts.branchClashQualifierObservations).toEqual(
      second.derivedFacts.branchClashQualifierObservations,
    );
  });
});
