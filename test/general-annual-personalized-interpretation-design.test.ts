import { describe, expect, test } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { resolved, unavailable } from '../src/contracts/common.js';
import type { CanonicalSajuSnapshot, PillarFact } from '../src/contracts/calculation.js';
import type { ReadingRequest } from '../src/contracts/reading.js';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import {
  designGeneralAnnualPersonalInterpretation,
  GENERAL_ANNUAL_PERSONAL_INTERPRETATION_DESIGN_VERSION,
} from '../src/research/general-annual-personalized-interpretation-design.js';

function annual(year: number, timestamp: string): ReadingRequest {
  return {
    requestId: 'research-annual-interpretation-design',
    intent: { domain: 'general', temporalScope: 'annual' },
    targetPeriod: {
      scope: 'annual',
      year,
      timeZone: 'Asia/Seoul',
      referenceDateTime: timestamp,
      resolution: 'relative_current',
    },
  };
}

function fixture(options: {
  startYears?: number;
  dayunBranch?: '자' | '오';
  dayBranch?: '자';
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
  if (base.pillars.day.status !== 'resolved') throw new Error('fixture day missing');
  const originalPillar = base.pillars.day.value;
  const dayunPillar: PillarFact = {
    ...originalPillar,
    ...(options.dayunBranch === undefined
      ? {}
      : {
          branch: {
            value: options.dayunBranch,
            hanja: options.dayunBranch === '자' ? '子' : '午',
            element: options.dayunBranch === '자' ? '수' : '화',
            yinYang: '양',
          },
        }),
  };
  const startYears = options.startYears ?? 1;
  const luck = resolved({
    direction: 'forward' as const,
    start: { age: startYears, years: startYears, months: 0, days: 0 },
    pillars: Array.from({ length: 10 }, (_, index) => ({
      age: startYears + index * 10,
      pillar: dayunPillar,
    })),
  });
  return {
    ...base,
    luckCycle: options.unknownLuck ? unavailable('test-luck-unavailable') : luck,
    pillars: {
      ...base.pillars,
      ...(options.dayBranch === undefined
        ? {}
        : {
            day: resolved({
              ...originalPillar,
              branch: { value: '자', hanja: '子', element: '수', yinYang: '양' },
            }),
          }),
      ...(options.unknownHour ? { hour: unavailable('test-hour-unavailable') } : {}),
    },
  };
}

describe('SA-7D personalized annual interpretation design only', () => {
  test('provides six blocked interpretation slots bound to the existing three-layer evidence', () => {
    const natal = fixture({ dayunBranch: '자', dayBranch: '자' });
    const original = JSON.stringify(natal);
    const request = annual(2026, '2026-06-15T12:00:00.000Z');
    const plan = designGeneralAnnualPersonalInterpretation(natal, request);
    expect(plan.status).toBe('design_only');
    if (plan.status !== 'design_only') throw new Error('design-only contract expected');

    expect(plan).toMatchObject({
      gate: 'FACTS_READY_SEMANTICS_BLOCKED',
      schemaVersion: GENERAL_ANNUAL_PERSONAL_INTERPRETATION_DESIGN_VERSION,
      targetYear: 2026,
      effectiveYear: 2026,
      inputs: {
        natalPillarCount: 4,
        dayunSegmentCount: 1,
        annualPillarCount: 1,
        computedPairCount: 9,
      },
      authority: {
        approvedModernAnnualRuleCount: 0,
        natalBaselineMutationAuthorized: false,
        annualOverDayunPriorityAuthorized: false,
        dayunOverAnnualPriorityAuthorized: false,
        numericWeightOrSeverityAuthorized: false,
        mayGenerateAnnualInterpretation: false,
        mayCallModel: false,
        mayIssueInterpretationClaim: false,
        mayRenderOfficialReading: false,
        productionAuthorized: false,
        commerceAuthorized: false,
      },
    });
    expect(plan.coexistence).toHaveLength(9);
    expect(plan.coexistence.find((pair) => pair.pairKey === 'annual:dayun'))
      .toMatchObject({
        observedRelationKinds: expect.arrayContaining(['branch_clash']),
        winningRelation: null,
        strengthRanking: null,
        eventImplication: null,
      });
    expect(plan.coexistence.find((pair) => pair.pairKey === 'annual:natal:day')
      ?.observedRelationKinds).toContain('branch_clash');
    expect(plan.slots.map((item) => item.slot)).toEqual([
      'annual_ten_god_theme',
      'natal_dayun_annual_interaction',
      'coexisting_relations',
      'annual_effect_timing',
      'personal_life_domain',
      'exceptions_and_counterexamples',
    ]);
    expect(plan.slots.every((item) =>
      item.status === 'RESEARCH_HOLD' &&
      item.candidateInterpretationText === null &&
      item.emittedClaimCount === 0 &&
      item.prerequisiteEvidenceCodes.length > 0,
    )).toBe(true);
    expect(plan.unresolvedEvidence).toContain('GLOBAL_PRECEDENCE_NOT_AUTHORIZED');
    expect(plan.unresolvedEvidence).toContain('ANNUAL_MODERN_THEME_EVIDENCE_MISSING');
    expect(plan.sourceBindings.threeLayerCorpusHash).toMatch(/^[0-9a-f]{64}$/u);
    expect(plan.sourceBindings.fourteenRuleDecisionHash).toMatch(/^[0-9a-f]{64}$/u);
    expect(plan.coexistence.flatMap((pair) => pair.evidenceIds)).toEqual(
      expect.arrayContaining([expect.stringMatching(/^[0-9a-f]{64}$/u)]),
    );
    const { status, gate, designId, ...input } = plan;
    expect(status).toBe('design_only');
    expect(gate).toBe('FACTS_READY_SEMANTICS_BLOCKED');
    expect(designId).toBe(deterministicContentHash(input));
    expect(designGeneralAnnualPersonalInterpretation(natal, request)).toEqual(plan);
    expect(JSON.stringify(natal)).toBe(original);
  });

  test('does not make annual precedence change simply because the LiChun boundary changes', () => {
    const natal = fixture();
    const before = designGeneralAnnualPersonalInterpretation(
      natal, annual(2026, '2026-02-03T14:59:59.000Z'),
    );
    const after = designGeneralAnnualPersonalInterpretation(
      natal, annual(2026, '2026-02-03T15:00:00.000Z'),
    );
    expect(before).toMatchObject({
      status: 'design_only', targetYear: 2026, effectiveYear: 2025,
    });
    expect(after).toMatchObject({
      status: 'design_only', targetYear: 2026, effectiveYear: 2026,
    });
    if (before.status !== 'design_only' || after.status !== 'design_only') return;
    expect(before.designId).not.toBe(after.designId);
    expect(before.sourceBindings.dayunContextId).toBe(after.sourceBindings.dayunContextId);
    expect(before.authority).toEqual(after.authority);
  });

  test('does not choose a winner from multiple simultaneous relations', () => {
    const plan = designGeneralAnnualPersonalInterpretation(
      fixture({ dayunBranch: '자', dayBranch: '자' }),
      annual(2026, '2026-06-15T12:00:00.000Z'),
    );
    if (plan.status !== 'design_only') throw new Error('design-only contract expected');
    expect(plan.inputs.observedPairMatchCount).toBeGreaterThanOrEqual(2);
    expect(plan.unresolvedRelationCoexistence).toBe(true);
    for (const pair of plan.coexistence) {
      expect(pair.winningRelation).toBeNull();
      expect(pair.strengthRanking).toBeNull();
      expect(pair.eventImplication).toBeNull();
      expect(pair.evidenceIds).toHaveLength(pair.observedRelationCount);
    }
    expect(JSON.stringify(plan)).not.toMatch(
      /"narrativeText":"|"luckScore":|"eventPrediction":|"primaryWinner":/u,
    );
  });

  test('does not make an empty or unknown input look like a favorable year', () => {
    const malformed = designGeneralAnnualPersonalInterpretation(
      fixture({ unknownLuck: true }),
      annual(2026, '2026-06-15T12:00:00.000Z'),
    );
    expect(malformed).toEqual({
      status: 'blocked',
      gate: 'INPUT_UNAVAILABLE',
      upstreamReasonCode: 'luck_cycle_unavailable',
      interpretationAllowed: false,
      productionAuthorized: false,
    });
    const unknownHour = designGeneralAnnualPersonalInterpretation(
      fixture({ unknownHour: true }),
      annual(2026, '2026-06-15T12:00:00.000Z'),
    );
    expect(unknownHour).toMatchObject({
      status: 'blocked',
      gate: 'INPUT_UNAVAILABLE',
      upstreamReasonCode: 'hour',
    });
  });

  test('preserves the Dayun boundary-year blocker and unknown LiChun source blocker', () => {
    expect(designGeneralAnnualPersonalInterpretation(
      fixture({ startYears: 6 }),
      annual(2026, '2026-06-15T12:00:00.000Z'),
    )).toMatchObject({
      status: 'blocked', upstreamReasonCode: 'DAYUN_MULTIPLE_SEGMENTS',
    });
    expect(designGeneralAnnualPersonalInterpretation(
      fixture(),
      annual(2028, '2028-02-04T01:00:00.000Z'),
    )).toMatchObject({
      status: 'blocked',
      upstreamReasonCode: 'ANNUAL_E1_DATE_UNAVAILABLE',
    });
  });

  test('does not inherit annual analysis permission into monthly interpretation', () => {
    const request: ReadingRequest = {
      ...annual(2026, '2026-06-15T12:00:00.000Z'),
      intent: { domain: 'general', temporalScope: 'monthly' },
      targetPeriod: {
        scope: 'monthly', year: 2026, month: 6, timeZone: 'Asia/Seoul',
        referenceDateTime: '2026-06-15T12:00:00.000Z', resolution: 'relative_current',
      },
    };
    expect(designGeneralAnnualPersonalInterpretation(fixture(), request))
      .toMatchObject({
        status: 'blocked',
        gate: 'INPUT_UNAVAILABLE',
        upstreamReasonCode: 'ANNUAL_REQUEST_REQUIRED',
        interpretationAllowed: false,
        productionAuthorized: false,
      });
  });

  test('no current output slot may emit a user-facing interpretation sentence', () => {
    const result = designGeneralAnnualPersonalInterpretation(
      fixture(), annual(2027, '2027-06-15T12:00:00.000Z'),
    );
    if (result.status !== 'design_only') throw new Error('design-only contract expected');
    expect(result.authority.mayGenerateAnnualInterpretation).toBe(false);
    expect(result.slots).toHaveLength(6);
    expect(result.slots.every((slot) =>
      slot.status === 'RESEARCH_HOLD' &&
      slot.candidateInterpretationText === null &&
      slot.emittedClaimCount === 0,
    )).toBe(true);
    expect(result.unresolvedEvidence).toContain('SCHOOL_SCOPE_EXCEPTIONS_UNREVIEWED');
  });
});
