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
  ANNUAL_TRIPLE_CLASH_PRIORITY_SOURCE_ANCHORS,
  ANNUAL_TRIPLE_CLASH_PRIORITY_UNRESOLVED,
  ANNUAL_TRIPLE_CLASH_PRIORITY_QUESTIONS,
  buildAnnualTripleClashPrioritySourceAdmissibility,
  auditAnnualTripleClashPriorityAdmissibility,
} from '../src/research/general-annual-triple-clash-priority-admissibility.js';

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
    requestId: 'research-source-precedence-review',
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
  unknownHour?: boolean;
  unknownLuck?: boolean;
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
  const day = base.pillars.day;
  if (day.status !== 'resolved') throw new Error('Test day unresolved');
  const luck: PillarFact = {
    stem: options.dayunStem ? STEM[options.dayunStem] : day.value.stem,
    branch: options.dayunBranch ? BRANCH[options.dayunBranch] : day.value.branch,
  };
  const pillars = { ...base.pillars };
  for (const slot of ['year', 'month', 'day', 'hour'] as const) {
    const branch = options.natal?.[slot];
    if (!branch) continue;
    const previous = base.pillars[slot];
    if (previous.status !== 'resolved') throw new Error('Test natal unresolved');
    pillars[slot] = resolved({ ...previous.value, branch: BRANCH[branch] });
  }
  const age = options.startYears ?? 1;
  return {
    ...base,
    // Deliberately synthetic structural combinations, not real personal fortunes.
    pillars: options.unknownHour
      ? { ...pillars, hour: unavailable('test-hour-unavailable') }
      : pillars,
    luckCycle: options.unknownLuck
      ? unavailable('test-luck-unavailable')
      : resolved({
          direction: 'forward',
          start: { age, years: age, months: 0, days: 0 },
          pillars: Array.from({ length: 10 }, (_, index) => ({
            age: age + index * 10, pillar: luck,
          })),
        }),
  };
}

function available(value: ReturnType<typeof auditAnnualTripleClashPriorityAdmissibility>) {
  if (value.status !== 'research_precedence_source_admissibility_hold') {
    throw new Error('Expected research-only precedence evidence gate');
  }
  return value;
}

describe('Annual triple/clash: scoped literary evidence and HOLD', () => {
  test('separates stem break text from branch-triple effects and keeps six gates blocked', () => {
    const source = buildAnnualTripleClashPrioritySourceAdmissibility();
    expect(source.anchors).toBe(ANNUAL_TRIPLE_CLASH_PRIORITY_SOURCE_ANCHORS);
    expect(source.anchors.map((x) => x.section))
      .toEqual(['論支元三合', '論支元三合', '論衝擊', '論衝擊']);
    expect(source.anchors.every((x) =>
      x.witness === 'digital_transcription_only' &&
      x.originalPrintClauseFullyVerified === false &&
      x.supportsGlobalTripleClashPrecedence === false,
    )).toBe(true);
    expect(source.questions).toHaveLength(6);
    expect(source.questions.map((x) => x.id))
      .toEqual(ANNUAL_TRIPLE_CLASH_PRIORITY_QUESTIONS.map((x) => x.id));
    expect(source.questions.every((x) =>
      x.gate.startsWith('HOLD_') &&
      !x.admittedAsExecutableMethod &&
      !x.admittedAsModernPersonalClaim,
    )).toBe(true);
    expect(source.questions.find((x) =>
      x.id === 'STEM_COMBINATION_BREAK_TRANSFERS_TO_THREE_BRANCHES')?.gate)
      .toBe('HOLD_SCOPE_MISMATCH');
    expect(source.unresolved).toBe(ANNUAL_TRIPLE_CLASH_PRIORITY_UNRESOLVED);
    const { sourceAuditHash, ...material } = source;
    expect(sourceAuditHash).toBe(deterministicContentHash(material));
    expect(buildAnnualTripleClashPrioritySourceAdmissibility()).toEqual(source);
  });

  test('annual 2026: triple + clash + stem combine cannot inherit a 破合 rule', () => {
    const natal = fixture({
      dayunBranch: '자', dayunStem: '신',
      natal: { year: '인', month: '술', day: '진', hour: '진' },
    });
    const unchanged = JSON.stringify(natal);
    const req = annual(2026, '2026-06-15T12:00:00.000Z');
    const audit = available(auditAnnualTripleClashPriorityAdmissibility(natal, req));
    expect(audit.observedTripleCandidates).toBeGreaterThanOrEqual(1);
    expect(audit.observedPairClashes).toBeGreaterThanOrEqual(1);
    expect(audit.cases).toEqual(expect.arrayContaining([
      expect.objectContaining({
        tripleSlots: ['annual', 'natal:year', 'natal:month'],
        clashPairKey: 'annual:dayun',
        slotIntersection: 'one_shared_pillar_slot',
        sharedSlots: ['annual'],
        stemFiveCombinationOnClashPair: true,
        breakCombinationClauseAppliesToThreeBranchPriority: false,
        admissiblePriorityDecision: null,
        combinationTransformationOrCancellation: null,
        individualOutcome: null,
      }),
    ]));
    expect(audit.cases.every((x) =>
      x.tripleSourceIds.length > 0 &&
      x.clashSourceIds.length > 0 &&
      x.admissiblePriorityDecision === null &&
      x.individualOutcome === null,
    )).toBe(true);
    expect(audit.authority.tripleClashPrecedenceAuthorized).toBe(false);
    expect(audit.competingRuleWinner).toBeNull();
    expect(audit.severity).toBeNull();
    const { auditHash, ...material } = audit;
    expect(auditHash).toBe(deterministicContentHash(material));
    expect(auditAnnualTripleClashPriorityAdmissibility(natal, req)).toEqual(audit);
    expect(JSON.stringify(natal)).toBe(unchanged);
  });

  test('a nonsharing clash is still observed; its influence is not inferred absent', () => {
    const audit = available(auditAnnualTripleClashPriorityAdmissibility(
      fixture({
        dayunBranch: '신',
        natal: { year: '인', month: '술', day: '인', hour: '진' },
      }),
      annual(2026, '2026-06-15T12:00:00.000Z'),
    ));
    expect(audit.cases).toEqual(expect.arrayContaining([
      expect.objectContaining({
        tripleSlots: ['annual', 'natal:year', 'natal:month'],
        clashPairKey: 'dayun:natal:day',
        slotIntersection: 'disjoint_pillar_slots',
        sharedSlots: [],
        stemFiveCombinationOnClashPair: false,
      }),
    ]));
    expect(audit.authority.unobservedMeansNoConclusion).toBe(true);
  });

  test('no triple means no observed comparison, never a favorable prediction', () => {
    const audit = available(auditAnnualTripleClashPriorityAdmissibility(
      fixture({
        dayunBranch: '자',
        natal: { year: '자', month: '자', day: '자', hour: '자' },
      }),
      annual(2026, '2026-06-15T12:00:00.000Z'),
    ));
    expect(audit.observedTripleCandidates).toBe(0);
    expect(audit.cases).toHaveLength(0);
    expect(audit.questionGates).toHaveLength(6);
    expect(audit.authority.unobservedMeansNoConclusion).toBe(true);
    expect(audit.interpretationClaim).toBeNull();
  });

  test('year boundary changes annual structure, never evidence admission', () => {
    const natal = fixture({
      dayunBranch: '인', natal: { year: '자', month: '자', day: '술', hour: '자' },
    });
    const audits = [
      annual(2026, '2026-02-03T14:59:59.000Z'),
      annual(2026, '2026-02-03T15:00:00.000Z'),
      annual(2027, '2027-02-03T15:00:00.000Z'),
    ].map((r) => available(auditAnnualTripleClashPriorityAdmissibility(natal, r)));
    expect(audits[0]?.auditHash).not.toBe(audits[1]?.auditHash);
    expect(audits[1]?.auditHash).not.toBe(audits[2]?.auditHash);
    expect(audits.every((x) =>
      !x.authority.tripleClashPrecedenceAuthorized &&
      !x.authority.productionAuthorized &&
      x.interpretationClaim === null,
    )).toBe(true);
  });

  test('missing facts, Dayun turnover, 2028 missing E1, monthly request fail closed', () => {
    const req = annual(2026, '2026-06-15T12:00:00.000Z');
    expect(auditAnnualTripleClashPriorityAdmissibility(
      fixture({ unknownHour: true }), req,
    )).toMatchObject({ status: 'input_unavailable', reasonCode: 'hour' });
    expect(auditAnnualTripleClashPriorityAdmissibility(
      fixture({ unknownLuck: true }), req,
    )).toMatchObject({ status: 'input_unavailable', reasonCode: 'luck_cycle_unavailable' });
    expect(auditAnnualTripleClashPriorityAdmissibility(
      fixture({ startYears: 6 }), req,
    )).toMatchObject({ status: 'input_unavailable', reasonCode: 'DAYUN_MULTIPLE_SEGMENTS' });
    expect(auditAnnualTripleClashPriorityAdmissibility(
      fixture(), annual(2028, '2028-02-04T01:00:00.000Z'),
    )).toEqual({
      status: 'input_unavailable', reasonCode: 'ANNUAL_E1_DATE_UNAVAILABLE',
      productionAuthorized: false,
    });
    const monthly: ReadingRequest = {
      ...req,
      intent: { domain: 'general', temporalScope: 'monthly' },
      targetPeriod: {
        scope: 'monthly', year: 2026, month: 6,
        timeZone: 'Asia/Seoul', referenceDateTime: '2026-06-15T12:00:00.000Z',
        resolution: 'relative_current',
      },
    };
    expect(auditAnnualTripleClashPriorityAdmissibility(fixture(), monthly)).toEqual({
      status: 'input_unavailable', reasonCode: 'ANNUAL_REQUEST_REQUIRED',
      productionAuthorized: false,
    });
  });
});
