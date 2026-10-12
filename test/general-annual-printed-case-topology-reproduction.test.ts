import { describe, expect, test } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { resolved, unavailable } from '../src/contracts/common.js';
import type {
  CanonicalSajuSnapshot, PillarFact, PillarSlot,
} from '../src/contracts/calculation.js';
import type { ReadingRequest } from '../src/contracts/reading.js';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import {
  ANNUAL_PRINTED_TOPOLOGY_PATTERNS,
  ANNUAL_PRINTED_TOPOLOGY_UNRESOLVED,
  buildAnnualPrintedTopologyEvidence,
  auditAnnualPrintedTopologyReproduction,
} from '../src/research/general-annual-printed-case-topology-reproduction.js';

const BRANCH = {
  자: { value: '자', hanja: '子', element: '수', yinYang: '양' },
  인: { value: '인', hanja: '寅', element: '목', yinYang: '양' },
  묘: { value: '묘', hanja: '卯', element: '목', yinYang: '음' },
  진: { value: '진', hanja: '辰', element: '토', yinYang: '양' },
  사: { value: '사', hanja: '巳', element: '화', yinYang: '음' },
  오: { value: '오', hanja: '午', element: '화', yinYang: '양' },
  미: { value: '미', hanja: '未', element: '토', yinYang: '음' },
  신: { value: '신', hanja: '申', element: '금', yinYang: '양' },
  유: { value: '유', hanja: '酉', element: '금', yinYang: '음' },
  술: { value: '술', hanja: '戌', element: '토', yinYang: '양' },
  해: { value: '해', hanja: '亥', element: '수', yinYang: '음' },
  축: { value: '축', hanja: '丑', element: '토', yinYang: '음' },
} as const;
type TestBranch = keyof typeof BRANCH;

function annual(year: number, instant: string): ReadingRequest {
  return {
    requestId: 'source-topology-casebook',
    intent: { domain: 'general', temporalScope: 'annual' },
    targetPeriod: {
      scope: 'annual', year, timeZone: 'Asia/Seoul',
      referenceDateTime: instant, resolution: 'relative_current',
    },
  };
}

function fixture(options: {
  natal?: Partial<Record<PillarSlot, TestBranch>>;
  dayun?: TestBranch;
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
  if (base.pillars.day.status !== 'resolved') throw new Error('Missing fixture day');
  const day: PillarFact = base.pillars.day.value;
  const luckPillar: PillarFact = {
    ...day, branch: options.dayun ? BRANCH[options.dayun] : day.branch,
  };
  const pillars = { ...base.pillars };
  for (const slot of ['year', 'month', 'day', 'hour'] as const) {
    const branch = options.natal?.[slot];
    if (!branch) continue;
    const original = base.pillars[slot];
    if (original.status !== 'resolved') throw new Error('Missing fixture ' + slot);
    pillars[slot] = resolved({ ...original.value, branch: BRANCH[branch] });
  }
  const startYears = options.startYears ?? 1;
  return {
    ...base,
    // Synthetic relation topology only. Not a person's astronomical birth data.
    pillars: options.unknownHour
      ? { ...pillars, hour: unavailable('test-hour-unavailable') }
      : pillars,
    luckCycle: options.unknownLuck
      ? unavailable('test-luck-unavailable')
      : resolved({
          direction: 'forward',
          start: { age: startYears, years: startYears, months: 0, days: 0 },
          pillars: Array.from({ length: 10 }, (_, index) => ({
            age: startYears + index * 10, pillar: luckPillar,
          })),
        }),
  };
}

function accepted(
  result: ReturnType<typeof auditAnnualPrintedTopologyReproduction>,
): Extract<typeof result, { status: 'research_printed_topology_analogies_only_hold' }> {
  if (result.status !== 'research_printed_topology_analogies_only_hold') {
    throw new Error('Expected research-only printed topology comparison');
  }
  return result;
}

const in2027 = annual(2027, '2027-06-15T12:00:00.000Z');

describe('printed natal source topology vs multi-layer annual structural cases', () => {
  test('printed case catalog is source-bound but cannot authorize a temporal priority', () => {
    expect(ANNUAL_PRINTED_TOPOLOGY_PATTERNS.map((x) => x.clauseId)).toEqual([
      'THREE_BRANCH_HAI_MAO_WEI_RESOLVES_MAO_YOU_CLASH',
      'THREE_BRANCH_SI_YOU_CHOU_RESOLVES_MAO_YOU_CLASH',
    ]);
    expect(ANNUAL_PRINTED_TOPOLOGY_PATTERNS.map((x) => x.branchTriple)).toEqual([
      ['해', '묘', '미'], ['사', '유', '축'],
    ]);
    expect(ANNUAL_PRINTED_TOPOLOGY_PATTERNS.every((x) =>
      !x.printQuoteProvesCrossTemporalMethod && !x.printQuoteProvesGlobalWinner,
    )).toBe(true);
    const evidence = buildAnnualPrintedTopologyEvidence();
    expect(evidence.patterns).toBe(ANNUAL_PRINTED_TOPOLOGY_PATTERNS);
    expect(evidence.unresolved).toBe(ANNUAL_PRINTED_TOPOLOGY_UNRESOLVED);
    expect(evidence.authority).toMatchObject({
      printedBranchGroupsCanBeComparedStructurally: true,
      printedOriginalNatalExampleIsCrossTemporalRule: false,
      identicalBranchSetMeansSamePillarSlots: false,
      printedExampleOutcomePortableToAnnualReading: false,
      globalTripleClashWinnerAuthorized: false,
      officialReadingAuthorized: false,
      productionAuthorized: false,
    });
    const { patternEvidenceHash, ...material } = evidence;
    expect(patternEvidenceHash).toBe(deterministicContentHash(material));
    expect(buildAnnualPrintedTopologyEvidence()).toEqual(evidence);
  });

  test('2027 亥卯未 cross all three layers with 卯酉 Dayun–natal clash: topology only', () => {
    const snapshot = fixture({
      dayun: '묘',
      natal: { year: '해', month: '유', day: '축', hour: '자' },
    });
    const before = JSON.stringify(snapshot);
    const result = accepted(auditAnnualPrintedTopologyReproduction(snapshot, in2027));
    expect(result.observedTripleCandidates).toBe(1);
    expect(result.observedPairClashes).toBe(2);
    expect(result.observations).toHaveLength(2);
    expect(result.counts).toEqual({
      sameSlotPrintedAnalogies: 1,
      disjointSlotValueLookalikes: 0,
      withoutIdenticalPrintedBranchValues: 1,
    });
    expect(result.observations).toEqual(expect.arrayContaining([
      expect.objectContaining({
        tripleSlots: ['annual', 'dayun', 'natal:year'],
        tripleScope: 'annual_dayun_natal',
        tripleBranches: ['미', '묘', '해'],
        clashPairKey: 'dayun:natal:month',
        clashBranches: ['묘', '유'],
        sharedSlots: ['dayun'],
        classification: 'same_branch_values_and_shared_slot_analogy_only',
        printedClauseIdForSameSlotAnalogy:
          'THREE_BRANCH_HAI_MAO_WEI_RESOLVES_MAO_YOU_CLASH',
        classicalRuleTransportedToTemporalLayers: false,
        actualClashCancelled: null,
        appliedBranchTripleTransformation: null,
        competingRuleWinner: null,
        lifeEventOrSeverity: null,
      }),
      expect.objectContaining({
        clashPairKey: 'annual:natal:day',
        sharedSlots: ['annual'],
        classification: 'no_printed_case_with_identical_branch_values',
        printedClauseIdForSameSlotAnalogy: null,
      }),
    ]));
    const { auditHash, ...material } = result;
    expect(auditHash).toBe(deterministicContentHash(material));
    expect(auditAnnualPrintedTopologyReproduction(snapshot, in2027)).toEqual(result);
    expect(JSON.stringify(snapshot)).toBe(before);
  });

  test('2027 巳酉丑 Dayun + two natal, 卯酉 clash: different temporal placement', () => {
    const result = accepted(auditAnnualPrintedTopologyReproduction(
      fixture({ dayun: '유',
        natal: { year: '사', month: '축', day: '묘', hour: '자' } }),
      in2027,
    ));
    expect(result.observedTripleCandidates).toBe(1);
    expect(result.counts.sameSlotPrintedAnalogies).toBe(1);
    const match = result.observations.find((x) =>
      x.printedClauseIdForSameSlotAnalogy ===
      'THREE_BRANCH_SI_YOU_CHOU_RESOLVES_MAO_YOU_CLASH');
    expect(match).toMatchObject({
      tripleSlots: ['dayun', 'natal:year', 'natal:month'],
      tripleScope: 'dayun_two_natal',
      tripleBranches: ['유', '사', '축'],
      clashPairKey: 'dayun:natal:day',
      clashBranches: ['유', '묘'],
      sharedSlots: ['dayun'],
      classification: 'same_branch_values_and_shared_slot_analogy_only',
      actualClashCancelled: null,
      competingRuleWinner: null,
    });
    expect(result.authority.globalTripleClashWinnerAuthorized).toBe(false);
  });

  test('same branch glyph 卯 in different natal slots cannot impersonate same slot', () => {
    const result = accepted(auditAnnualPrintedTopologyReproduction(
      fixture({ dayun: '유',
        natal: { year: '해', month: '묘', day: '묘', hour: '자' } }),
      in2027,
    ));
    expect(result.observedTripleCandidates).toBe(2);
    expect(result.observedPairClashes).toBe(2);
    expect(result.observations).toHaveLength(4);
    expect(result.counts).toEqual({
      sameSlotPrintedAnalogies: 2,
      disjointSlotValueLookalikes: 2,
      withoutIdenticalPrintedBranchValues: 0,
    });
    expect(result.observations).toEqual(expect.arrayContaining([
      expect.objectContaining({
        tripleSlots: ['annual', 'natal:year', 'natal:month'],
        clashPairKey: 'dayun:natal:day',
        sharedSlots: [],
        classification: 'same_branch_values_but_different_pillar_slots',
        printedClauseIdForSameSlotAnalogy: null,
        relatedPrintedClauseIdsForBranchValues: [
          'THREE_BRANCH_HAI_MAO_WEI_RESOLVES_MAO_YOU_CLASH'],
      }),
      expect.objectContaining({
        tripleSlots: ['annual', 'natal:year', 'natal:day'],
        clashPairKey: 'dayun:natal:day',
        sharedSlots: ['natal:day'],
        classification: 'same_branch_values_and_shared_slot_analogy_only',
      }),
    ]));
    expect(result.observations.every((x) =>
      x.classicalRuleTransportedToTemporalLayers === false &&
      x.actualClashCancelled === null &&
      x.competingRuleWinner === null)).toBe(true);
  });

  test('2026 寅午戌 and 午子 coexist; no classical print case with same full relation', () => {
    const result = accepted(auditAnnualPrintedTopologyReproduction(
      fixture({ dayun: '인',
        natal: { year: '술', month: '자', day: '신', hour: '진' } }),
      annual(2026, '2026-06-15T12:00:00.000Z'),
    ));
    expect(result.observedTripleCandidates).toBe(1);
    expect(result.observedPairClashes).toBeGreaterThan(0);
    expect(result.counts.sameSlotPrintedAnalogies).toBe(0);
    expect(result.counts.disjointSlotValueLookalikes).toBe(0);
    expect(result.counts.withoutIdenticalPrintedBranchValues)
      .toBe(result.observations.length);
    expect(result.observations).toEqual(expect.arrayContaining([
      expect.objectContaining({
        tripleBranches: ['오', '인', '술'],
        clashPairKey: 'annual:natal:month',
        clashBranches: ['오', '자'],
        classification: 'no_printed_case_with_identical_branch_values',
      }),
    ]));
    expect(result.classicalRuleAppliedCount).toBe(0);
    expect(result.selectedRulePriority).toBeNull();
    expect(result.calculatedModernOutcome).toBeNull();
  });

  test('no triple despite repeated clashes: zero printed analogies is not good fortune', () => {
    const result = accepted(auditAnnualPrintedTopologyReproduction(
      fixture({ dayun: '자',
        natal: { year: '자', month: '자', day: '자', hour: '자' } }),
      annual(2026, '2026-06-15T12:00:00.000Z'),
    ));
    expect(result.observedTripleCandidates).toBe(0);
    expect(result.observedPairClashes).toBeGreaterThan(0);
    expect(result.observations).toHaveLength(0);
    expect(result.counts).toEqual({
      sameSlotPrintedAnalogies: 0,
      disjointSlotValueLookalikes: 0,
      withoutIdenticalPrintedBranchValues: 0,
    });
    expect(result.authority.productionAuthorized).toBe(false);
    expect(result.selectedRulePriority).toBeNull();
  });

  test('LiChun changes annual structural cases, not printed source evidence', () => {
    const snapshot = fixture({ dayun: '묘',
      natal: { year: '해', month: '유', day: '축', hour: '자' } });
    const prior = accepted(auditAnnualPrintedTopologyReproduction(
      snapshot, annual(2027, '2027-02-03T14:59:59.000Z')));
    const next = accepted(auditAnnualPrintedTopologyReproduction(
      snapshot, annual(2027, '2027-02-03T15:00:00.000Z')));
    expect(prior.auditHash).not.toBe(next.auditHash);
    expect(prior.printedPatternEvidenceHash).toBe(next.printedPatternEvidenceHash);
    expect(next.authority.printedExampleOutcomePortableToAnnualReading).toBe(false);
  });

  test('unknown hour/luck, Dayun turnover, unsupported E1, monthly fail closed', () => {
    expect(auditAnnualPrintedTopologyReproduction(
      fixture({ unknownHour: true }), in2027,
    )).toEqual({ status: 'input_unavailable', reasonCode: 'hour', productionAuthorized: false });
    expect(auditAnnualPrintedTopologyReproduction(
      fixture({ unknownLuck: true }), in2027,
    )).toEqual({
      status: 'input_unavailable', reasonCode: 'luck_cycle_unavailable',
      productionAuthorized: false,
    });
    expect(auditAnnualPrintedTopologyReproduction(
      fixture({ startYears: 6 }), annual(2026, '2026-06-15T12:00:00.000Z'),
    )).toMatchObject({ status: 'input_unavailable', reasonCode: 'DAYUN_MULTIPLE_SEGMENTS' });
    expect(auditAnnualPrintedTopologyReproduction(
      fixture(), annual(2028, '2028-02-04T01:00:00.000Z'),
    )).toEqual({
      status: 'input_unavailable', reasonCode: 'ANNUAL_E1_DATE_UNAVAILABLE',
      productionAuthorized: false,
    });
    const monthly: ReadingRequest = {
      ...in2027,
      intent: { domain: 'general', temporalScope: 'monthly' },
      targetPeriod: {
        scope: 'monthly', year: 2027, month: 6, timeZone: 'Asia/Seoul',
        referenceDateTime: '2027-06-15T12:00:00.000Z',
        resolution: 'relative_current',
      },
    };
    expect(auditAnnualPrintedTopologyReproduction(fixture(), monthly))
      .toEqual({
        status: 'input_unavailable', reasonCode: 'ANNUAL_REQUEST_REQUIRED',
        productionAuthorized: false,
      });
  });
});
