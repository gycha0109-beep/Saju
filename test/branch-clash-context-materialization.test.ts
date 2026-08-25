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
import {
  BRANCH_CLASH_CONTEXT_ENRICHED_CANONICAL_SCHEMA_VERSION,
  BRANCH_CLASH_CONTEXT_PROJECTION_VERSION,
  enrichCanonicalBranchClashContexts,
} from '../src/calculation/branch-clash-context-facts.js';

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

const clash: StructuralRelationCandidate = {
  relationId: 'branch_clash:year:branch:자|month:branch:오',
  kind: 'branch_clash',
  participants: [
    { pillar: 'year', component: 'branch', value: '자' },
    { pillar: 'month', component: 'branch', value: '오' },
  ],
  sourceIds: ['SRC-T0-YISI-ZHAN-10', 'SRC-T0-XUANZE-YAOLUE-UPPER'],
  semantics: { structuralMatchOnly: true, transformationEstablished: false },
};

const hidden: HiddenStemChartFact = {
  year: { status: 'resolved', value: ['계'] },
  month: { status: 'resolved', value: ['정', '기'] },
  day: { status: 'resolved', value: ['기', '신', '계'] },
  hour: { status: 'resolved', value: ['갑', '병', '무'] },
};

function baseSnapshot(options: {
  relations?: CanonicalSajuSnapshot['derivedFacts']['structuralRelations'];
  hiddenStems?: HiddenStemChartFact;
} = {}): CanonicalSajuSnapshot {
  const relations = options.relations ?? { status: 'resolved' as const, value: [clash] };
  const hiddenStems = options.hiddenStems ?? hidden;
  return {
    snapshotId: 'synthetic_structural_v12',
    schemaVersion: 'saju-canonical-v1.2',
    calculationHash: 'a'.repeat(64),
    createdAt: '2026-08-25T00:00:00.000Z',
    input: {
      calendarType: 'solar',
      date: { year: 2000, month: 1, day: 1 },
      time: { known: true, hour: 12, minute: 0 },
      sexForTraditionalCalculation: 'unspecified',
    },
    policy: {
      policyId: 'synthetic/branch-clash-context',
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
      year: { status: 'resolved', value: pillar('갑', '자') },
      month: { status: 'resolved', value: pillar('병', '오') },
      day: { status: 'resolved', value: pillar('무', '축') },
      hour: { status: 'resolved', value: pillar('경', '인') },
    },
    derivedFacts: {
      dayMaster: { status: 'resolved', value: { value: '무', ...STEM_META.무 } },
      tenGods: { status: 'unavailable', reasonCode: 'synthetic-not-needed' },
      voidBranches: { status: 'resolved', value: [] },
      hiddenStems,
      structuralRelations: relations,
    },
    luckCycle: { status: 'unavailable', reasonCode: 'synthetic-not-needed' },
    scenarios: [],
    completeness: {
      birthTimeKnown: true,
      fullyResolved: false,
      resolvedPaths: [
        'pillars.year', 'pillars.month', 'pillars.day', 'pillars.hour',
        'derivedFacts.hiddenStems.year', 'derivedFacts.hiddenStems.month',
        'derivedFacts.hiddenStems.day', 'derivedFacts.hiddenStems.hour',
        'derivedFacts.structuralRelations',
      ],
      ambiguousPaths: [],
      unavailablePaths: ['derivedFacts.tenGods', 'luckCycle'],
    },
    provenance: {
      engine: { name: 'synthetic', version: '1' },
      adapter: { name: 'synthetic', version: '1' },
      policy: { id: 'synthetic/branch-clash-context', version: '1' },
      schema: { id: 'myeonghwa-canonical-saju', version: 'saju-canonical-v1.2' },
    },
  };
}

describe('branch clash context T0 projection', () => {
  test('copies one explicit T0 branch clash and its exact participant hidden stems losslessly', () => {
    const result = enrichCanonicalBranchClashContexts(baseSnapshot());
    const state = result.derivedFacts.branchClashContexts;
    expect(state?.status).toBe('resolved');
    if (state?.status !== 'resolved') throw new Error('branch clash contexts not resolved');

    expect(state.value.year_month).toEqual({
      relationId: clash.relationId,
      kind: 'branch_clash',
      pairKey: 'year_month',
      participants: [
        { pillar: 'year', branch: '자', hiddenStems: ['계'] },
        { pillar: 'month', branch: '오', hiddenStems: ['정', '기'] },
      ],
      sourceIds: clash.sourceIds,
      sourceFactRefs: [
        'derivedFacts.structuralRelations',
        'derivedFacts.hiddenStems.year',
        'derivedFacts.hiddenStems.month',
      ],
      semantics: { structuralMatchOnly: true, transformationEstablished: false },
    });
  });

  test('does not invent effect winner damage weighting or settlement fields', () => {
    const state = enrichCanonicalBranchClashContexts(baseSnapshot()).derivedFacts.branchClashContexts;
    if (state?.status !== 'resolved') throw new Error('branch clash contexts not resolved');
    const serialized = JSON.stringify(state.value.year_month);
    for (const forbidden of ['winner', 'damage', 'weight', 'score', 'destruction', 'settlement']) {
      expect(serialized.toLowerCase()).not.toContain(forbidden);
    }
  });

  test('a chart with no branch clash resolves to an empty context index rather than fabricating one', () => {
    const result = enrichCanonicalBranchClashContexts(
      baseSnapshot({ relations: { status: 'resolved', value: [] } }),
    );
    expect(result.derivedFacts.branchClashContexts).toEqual({ status: 'resolved', value: {} });
  });

  test('unresolved structural relations fail closed', () => {
    const result = enrichCanonicalBranchClashContexts(
      baseSnapshot({ relations: { status: 'unavailable', reasonCode: 'synthetic-missing' } }),
    );
    const state = result.derivedFacts.branchClashContexts;
    expect(state?.status).toBe('unavailable');
    if (state?.status === 'unavailable') {
      expect(state.reasonCode).toBe('branch-clash-context-requires-resolved-structural-relations');
    }
  });

  test('an unresolved participant hidden-stem fact fails closed instead of emitting partial context', () => {
    const result = enrichCanonicalBranchClashContexts(
      baseSnapshot({
        hiddenStems: {
          ...hidden,
          month: { status: 'unavailable', reasonCode: 'synthetic-missing' },
        },
      }),
    );
    const state = result.derivedFacts.branchClashContexts;
    expect(state?.status).toBe('unavailable');
    if (state?.status === 'unavailable') {
      expect(state.reasonCode).toBe('branch-clash-context-requires-resolved-participant-hidden-stems');
    }
  });

  test('projection advances canonical identity to v1.3 and records the completeness path', () => {
    const result = enrichCanonicalBranchClashContexts(baseSnapshot());
    expect(BRANCH_CLASH_CONTEXT_PROJECTION_VERSION).toBe('myeonghwa-branch-clash-context-projection-v1');
    expect(BRANCH_CLASH_CONTEXT_ENRICHED_CANONICAL_SCHEMA_VERSION).toBe('saju-canonical-v1.3');
    expect(result.schemaVersion).toBe('saju-canonical-v1.3');
    expect(result.provenance.schema.version).toBe('saju-canonical-v1.3');
    expect(result.completeness.resolvedPaths).toContain('derivedFacts.branchClashContexts');
    expect(result.calculationHash).not.toBe(baseSnapshot().calculationHash);
  });

  test('projection identity is deterministic for identical synthetic facts', () => {
    const first = enrichCanonicalBranchClashContexts(baseSnapshot());
    const second = enrichCanonicalBranchClashContexts(baseSnapshot());
    expect(first.snapshotId).toBe(second.snapshotId);
    expect(first.calculationHash).toBe(second.calculationHash);
    expect(first.derivedFacts.branchClashContexts).toEqual(second.derivedFacts.branchClashContexts);
  });
});
