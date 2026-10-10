import { describe, expect, test } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { resolved, unavailable } from '../src/contracts/common.js';
import type {
  CanonicalSajuSnapshot, PillarFact, PillarSlot,
} from '../src/contracts/calculation.js';
import type { ReadingRequest } from '../src/contracts/reading.js';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import { buildGeneralAnnualThreeLayerFactCorpus } from '../src/research/general-annual-three-layer-fact-corpus.js';
import {
  ANNUAL_TRIPLE_CLASH_UNRESOLVED,
  ANNUAL_TRIPLE_CLASH_WITNESSES,
  auditAnnualTripleClashSlotOverlap,
} from '../src/research/general-annual-triple-clash-slot-overlap-audit.js';

const BRANCH = {
  자: { value: '자', hanja: '子', element: '수', yinYang: '양' },
  인: { value: '인', hanja: '寅', element: '목', yinYang: '양' },
  오: { value: '오', hanja: '午', element: '화', yinYang: '양' },
  술: { value: '술', hanja: '戌', element: '토', yinYang: '양' },
  신: { value: '신', hanja: '申', element: '금', yinYang: '양' },
  진: { value: '진', hanja: '辰', element: '토', yinYang: '양' },
} as const;

const STEM = {
  신: { value: '신', hanja: '辛', element: '금', yinYang: '음' },
} as const;

type TestBranch = keyof typeof BRANCH;

function annual(year: number, instant: string): ReadingRequest {
  return {
    requestId: 'research-triple-clash-identity',
    intent: { domain: 'general', temporalScope: 'annual' },
    targetPeriod: {
      scope: 'annual', year, timeZone: 'Asia/Seoul',
      referenceDateTime: instant, resolution: 'relative_current',
    },
  };
}

function fixture(options: {
  natal?: Partial<Record<PillarSlot, TestBranch>>;
  dayunBranch?: TestBranch;
  dayunStem?: '신';
  startYears?: number;
  unknownLuck?: boolean;
  unknownHour?: boolean;
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
  if (base.pillars.day.status !== 'resolved') throw new Error('Test day unavailable');
  const day: PillarFact = base.pillars.day.value;
  const luck: PillarFact = {
    stem: options.dayunStem ? STEM[options.dayunStem] : day.stem,
    branch: options.dayunBranch ? BRANCH[options.dayunBranch] : day.branch,
  };
  const pillars = { ...base.pillars };
  for (const slot of ['year', 'month', 'day', 'hour'] as const) {
    const branch = options.natal?.[slot];
    if (!branch) continue;
    const state = base.pillars[slot];
    if (state.status !== 'resolved') throw new Error('Missing natal ' + slot);
    pillars[slot] = resolved({ ...state.value, branch: BRANCH[branch] });
  }
  const startYears = options.startYears ?? 1;
  return {
    ...base,
    // Deliberately synthetic branch and luck fixtures; not realizable personal data.
    pillars: options.unknownHour
      ? { ...pillars, hour: unavailable('test-hour-unavailable') }
      : pillars,
    luckCycle: options.unknownLuck
      ? unavailable('test-luck-unavailable')
      : resolved({
          direction: 'forward',
          start: { age: startYears, years: startYears, months: 0, days: 0 },
          pillars: Array.from({ length: 10 }, (_, i) => ({
            age: startYears + 10 * i, pillar: luck,
          })),
        }),
  };
}

function accepted(
  output: ReturnType<typeof auditAnnualTripleClashSlotOverlap>,
): Extract<typeof output, { status: 'research_triple_clash_coexistence_hold' }> {
  if (output.status !== 'research_triple_clash_coexistence_hold') {
    throw new Error('Expected research-only triple/clash observation');
  }
  return output;
}

describe('Annual triple–clash slot overlap / structural research-only', () => {
  test('documents the two separate textual sections without asserting a print collation', () => {
    expect(ANNUAL_TRIPLE_CLASH_WITNESSES.map((x) => x.section))
      .toEqual(['論支元三合', '論衝擊']);
    expect(ANNUAL_TRIPLE_CLASH_WITNESSES.every((x) =>
      x.witnessLevel === 'digital_transcription_only' &&
      x.verifiedAgainstOriginalPrintFullContext === false &&
      x.authorizesTransformationOrPersonalOutcome === false,
    )).toBe(true);
  });

  test('annual+dayun+natal triple and annual-to-month clash share annual slot only', () => {
    const natal = fixture({
      dayunBranch: '인',
      natal: { year: '자', month: '자', day: '술', hour: '자' },
    });
    const before = JSON.stringify(natal);
    const req = annual(2026, '2026-06-15T12:00:00.000Z');
    const output = accepted(auditAnnualTripleClashSlotOverlap(natal, req));
    expect(output.pairChecksConsidered).toBe(9);
    expect(output.tripleChecksConsidered).toBe(16);
    expect(output.observedTripleCandidates).toBe(1);
    expect(output.observedPairClashes).toBe(3);
    expect(output.comparisons).toHaveLength(3);
    expect(output.comparisonsWithSharedSlot).toBe(3);
    expect(output.comparisonsWithDisjointSlots).toBe(0);
    const found = output.comparisons.find((x) =>
      x.clashPairKey === 'annual:natal:month');
    expect(found).toMatchObject({
      tripleSlots: ['annual', 'dayun', 'natal:day'],
      tripleBranches: ['오', '인', '술'],
      clashSlots: ['annual', 'natal:month'],
      sharedSlots: ['annual'],
      slotIntersection: 'one_shared_pillar_slot',
      strengthOrWinner: null,
      transformationOrClashCancellation: null,
      modernPersonalOutcome: null,
    });
    expect(output.authority.sharedSlotDoesNotEstablishCancellation).toBe(true);
    expect(output.authority.globalRulePrecedenceAuthorized).toBe(false);
    expect(output.selectedWinner).toBeNull();
    expect(output.calculatedSeverity).toBeNull();
    expect(output.interpretedLifeEvent).toBeNull();
    expect(output.consumerText).toBeNull();
    const { auditHash, ...material } = output;
    expect(auditHash).toBe(deterministicContentHash(material));
    expect(auditAnnualTripleClashSlotOverlap(natal, req)).toEqual(output);
    expect(JSON.stringify(natal)).toBe(before);
  });

  test('same branch value at another natal position does not make shared slot identity', () => {
    const output = accepted(auditAnnualTripleClashSlotOverlap(
      fixture({
        dayunBranch: '신',
        natal: { year: '인', month: '술', day: '인', hour: '진' },
      }),
      annual(2026, '2026-06-15T12:00:00.000Z'),
    ));
    expect(output.comparisons).toEqual(expect.arrayContaining([
      expect.objectContaining({
        tripleSlots: ['annual', 'natal:year', 'natal:month'],
        clashPairKey: 'dayun:natal:day',
        clashSlots: ['dayun', 'natal:day'],
        sharedSlots: [],
        slotIntersection: 'disjoint_pillar_slots',
        sameBranchValueDoesNotProveSamePillar: true,
      }),
      expect.objectContaining({
        tripleSlots: ['annual', 'natal:year', 'natal:month'],
        clashPairKey: 'dayun:natal:year',
        sharedSlots: ['natal:year'],
        slotIntersection: 'one_shared_pillar_slot',
      }),
    ]));
    expect(output.comparisonsWithSharedSlot).toBeGreaterThanOrEqual(1);
    expect(output.comparisonsWithDisjointSlots).toBeGreaterThanOrEqual(1);
    expect(output.authority.disjointSlotsDoNotEstablishIndependenceOfEffects).toBe(true);
  });

  test('stem five-combination + branch clash + triple candidate does not choose a winning rule', () => {
    const natal = fixture({
      dayunBranch: '자', dayunStem: '신',
      natal: { year: '인', month: '술', day: '진', hour: '진' },
    });
    const req = annual(2026, '2026-06-15T12:00:00.000Z');
    const corpus = buildGeneralAnnualThreeLayerFactCorpus(natal, req);
    expect(corpus.state).toBe('research_three_layer_facts_only');
    if (corpus.state !== 'research_three_layer_facts_only') return;
    expect(corpus.pairMatches).toEqual(expect.arrayContaining([
      expect.objectContaining({
        pairKey: 'annual:dayun',
        kind: 'stem_five_combination',
      }),
      expect.objectContaining({
        pairKey: 'annual:dayun',
        kind: 'branch_clash',
      }),
    ]));
    const output = accepted(auditAnnualTripleClashSlotOverlap(natal, req));
    expect(output.comparisons).toEqual(expect.arrayContaining([
      expect.objectContaining({
        tripleSlots: ['annual', 'natal:year', 'natal:month'],
        clashPairKey: 'annual:dayun',
        sharedSlots: ['annual'],
        strengthOrWinner: null,
      }),
    ]));
    expect(output.authority.transformationEstablished).toBe(false);
    expect(output.authority.sourceClaimToModernEventAuthorized).toBe(false);
    expect(output.authority.productionAuthorized).toBe(false);
  });

  test('zero triples but multiple clashes must still HOLD (no optimistic default)', () => {
    const output = accepted(auditAnnualTripleClashSlotOverlap(
      fixture({
        dayunBranch: '자',
        natal: { year: '자', month: '자', day: '자', hour: '자' },
      }),
      annual(2026, '2026-06-15T12:00:00.000Z'),
    ));
    expect(output.observedTripleCandidates).toBe(0);
    expect(output.observedPairClashes).toBeGreaterThan(0);
    expect(output.comparisons).toEqual([]);
    expect(output.authority.absenceOfOverlapIsNotProofOfGoodFortune).toBe(true);
    expect(output.unresolved).toBe(ANNUAL_TRIPLE_CLASH_UNRESOLVED);
    expect(output.consumerText).toBeNull();
  });

  test('LiChun boundaries affect identities, not semantic authority', () => {
    const natal = fixture({
      dayunBranch: '인', natal: { year: '자', month: '자', day: '술', hour: '자' },
    });
    const results = [
      annual(2026, '2026-02-03T14:59:59.000Z'),
      annual(2026, '2026-02-03T15:00:00.000Z'),
      annual(2027, '2027-02-03T15:00:00.000Z'),
    ].map((req) => accepted(auditAnnualTripleClashSlotOverlap(natal, req)));
    expect(results[0]?.auditHash).not.toBe(results[1]?.auditHash);
    expect(results[1]?.auditHash).not.toBe(results[2]?.auditHash);
    expect(results.every((x) => !x.authority.productionAuthorized &&
      x.consumerText === null && x.selectedWinner === null)).toBe(true);
  });

  test('missing hour/luck, crossing Dayun, unsupported E1 and monthly are fail-closed', () => {
    const req = annual(2026, '2026-06-15T12:00:00.000Z');
    expect(auditAnnualTripleClashSlotOverlap(
      fixture({ unknownHour: true }), req,
    )).toMatchObject({ status: 'input_unavailable', reasonCode: 'hour' });
    expect(auditAnnualTripleClashSlotOverlap(
      fixture({ unknownLuck: true }), req,
    )).toMatchObject({ status: 'input_unavailable', reasonCode: 'luck_cycle_unavailable' });
    expect(auditAnnualTripleClashSlotOverlap(
      fixture({ startYears: 6 }), req,
    )).toMatchObject({ status: 'input_unavailable', reasonCode: 'DAYUN_MULTIPLE_SEGMENTS' });
    expect(auditAnnualTripleClashSlotOverlap(
      fixture(), annual(2028, '2028-02-04T01:00:00.000Z'),
    )).toEqual({
      status: 'input_unavailable',
      reasonCode: 'ANNUAL_E1_DATE_UNAVAILABLE',
      productionAuthorized: false,
    });
    const monthly: ReadingRequest = {
      ...req,
      intent: { domain: 'general', temporalScope: 'monthly' },
      targetPeriod: {
        scope: 'monthly', year: 2026, month: 6, timeZone: 'Asia/Seoul',
        referenceDateTime: '2026-06-15T12:00:00.000Z',
        resolution: 'relative_current',
      },
    };
    expect(auditAnnualTripleClashSlotOverlap(fixture(), monthly)).toEqual({
      status: 'input_unavailable',
      reasonCode: 'ANNUAL_REQUEST_REQUIRED',
      productionAuthorized: false,
    });
  });
});
