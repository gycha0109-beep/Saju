import { describe, expect, test } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { resolved, unavailable } from '../src/contracts/common.js';
import type { CanonicalSajuSnapshot, PillarFact } from '../src/contracts/calculation.js';
import type { ReadingRequest } from '../src/contracts/reading.js';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import {
  buildGeneralAnnualThreeLayerFactCorpus,
} from '../src/research/general-annual-three-layer-fact-corpus.js';
import {
  PIAN_GUAN_THREE_LAYER_TEXT_CONSIDERATIONS,
  PIAN_GUAN_THREE_LAYER_UNRESOLVED,
  buildPianGuanThreeLayerTextMethodAudit,
  auditPianGuanThreeLayerMethodForAnnualRequest,
} from '../src/research/general-annual-pian-guan-three-layer-method-audit.js';

function annual(year: number, date: string): ReadingRequest {
  return {
    requestId: 'annual-pian-guan-method-gate',
    intent: { domain: 'general', temporalScope: 'annual' },
    targetPeriod: {
      scope: 'annual', year, timeZone: 'Asia/Seoul',
      referenceDateTime: date, resolution: 'relative_current',
    },
  };
}

function snapshot(options: {
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
  if (base.pillars.day.status !== 'resolved') throw new Error('Expected day pillar');
  const p: PillarFact = base.pillars.day.value;
  const years = options.startYears ?? 1;
  return {
    ...base,
    luckCycle: options.unknownLuck
      ? unavailable('test-luck-unavailable')
      : resolved({
          direction: 'forward',
          start: { age: years, years, months: 0, days: 0 },
          pillars: Array.from({ length: 10 }, (_, i) => ({
            age: years + i * 10, pillar: p,
          })),
        }),
    pillars: {
      ...base.pillars,
      ...(options.unknownHour ? { hour: unavailable('test-hour-unavailable') } : {}),
    },
  };
}

describe('Annual Pian Guan historical three-layer method gate', () => {
  test('ties each documentary consideration to a section without pretending it is an executable rule', () => {
    const doc = buildPianGuanThreeLayerTextMethodAudit();
    expect(doc.sourceConsiderations).toBe(PIAN_GUAN_THREE_LAYER_TEXT_CONSIDERATIONS);
    expect(doc.sourceConsiderations.map((x) => x.section)).toEqual([
      '論大運', '論太歲', '總論歲運', '總論歲運',
    ]);
    expect(doc.sourceConsiderations.every((x) =>
      x.witnessLevel === 'digital_transcription_only' &&
      x.appliesToExactPianGuanAsExecutableRule === false,
    )).toBe(true);
    expect(doc.methodBoundary).toEqual({
      textMentionsNatalDayunAndAnnual: true,
      textSuppliesACompleteComputableCompositionAlgorithmForThisPianGuanExample: false,
      traditionalPrecedenceRuleAuthorized: false,
      automaticPositiveOrNegativeJudgmentAuthorized: false,
      pianCaiRescueReusableForPianGuan: false,
      modernEventOutcomeAuthorized: false,
    });
    expect(doc.unresolved).toBe(PIAN_GUAN_THREE_LAYER_UNRESOLVED);
    const { auditHash, ...data } = doc;
    expect(auditHash).toBe(deterministicContentHash(data));
    expect(buildPianGuanThreeLayerTextMethodAudit()).toEqual(doc);
  });

  test('reuses the actual nine structural pair checks without converting matches to severity', () => {
    const natal = snapshot();
    const request = annual(2026, '2026-06-15T12:00:00.000Z');
    const facts = buildGeneralAnnualThreeLayerFactCorpus(natal, request);
    expect(facts.state).toBe('research_three_layer_facts_only');
    if (facts.state !== 'research_three_layer_facts_only') return;
    const result = auditPianGuanThreeLayerMethodForAnnualRequest(natal, request);
    expect(result.status).toBe('research_three_layer_method_hold');
    if (result.status !== 'research_three_layer_method_hold') return;
    expect(result.threeLayerFactCorpusHash).toBe(facts.corpusHash);
    expect(result.pairObservations).toHaveLength(9);
    expect(new Set(result.pairObservations.map((x) => x.pairKey)).size).toBe(9);
    expect(result.natalPillars).toHaveLength(4);
    expect(result.dayunPillar.stem).toBe(facts.dayun.stem);
    expect(result.annualPillar.stem).toBe(facts.annualPillar.stem);
    expect(result.computedAnnualTenGod)
      .toBe(facts.computedTenGodRelations.annualStemToNatalDayMaster);
    expect(result.observedRelationTotal).toBe(facts.pairMatches.length);
    for (const pair of result.pairObservations) {
      const fromSource = facts.pairChecks.find((x) => x.pairKey === pair.pairKey);
      expect(pair.relationKinds).toEqual(fromSource?.observedKinds);
      expect(pair.adjudicatedWinner).toBeNull();
      expect(pair.severity).toBeNull();
    }
    expect(result.unresolvedCoexistence).toBe(
      facts.pairMatches.length > 1 || result.pairObservations.some((x) => x.observedCount > 1),
    );
    expect(Object.values(result.evidenceOnly).every((v) =>
      v === false || v === true,
    )).toBe(true);
    expect(result.evidenceOnly.hasNineStructuralComparisons).toBe(true);
    expect(result.evidenceOnly.hasTraditionalMethodAdjudication).toBe(false);
    expect(result.evidenceOnly.mayRankAnnualOverDayun).toBe(false);
    expect(result.evidenceOnly.mayComputeIndividualSeverity).toBe(false);
    expect(result.evidenceOnly.mayBorrowPianCaiRescue).toBe(false);
    expect(result.interpretationClaim).toBeNull();
    expect(result.careerOrHealthOutcome).toBeNull();
    expect(result.appliedHistoricalSeverity).toBeNull();
  });

  test('LiChun 00:00 KST cases are deterministic, preserve source input and never invent Geng years', () => {
    const natal = snapshot();
    const original = JSON.stringify(natal);
    const dates = [
      annual(2026, '2026-02-03T14:59:59.000Z'),
      annual(2026, '2026-02-03T15:00:00.000Z'),
      annual(2027, '2027-02-03T15:00:00.000Z'),
    ];
    const results = dates.map((x) => auditPianGuanThreeLayerMethodForAnnualRequest(natal, x));
    const stamps: string[] = [];
    for (const result of results) {
      expect(result.status).toBe('research_three_layer_method_hold');
      if (result.status !== 'research_three_layer_method_hold') continue;
      expect(result.exactHistoricalGengJiaExample).toBe(false);
      expect(result.interpretationClaim).toBeNull();
      expect(result.appliedHistoricalSeverity).toBeNull();
      expect(result.evidenceOnly.productionAuthorized).toBe(false);
      expect(result.evidenceOnly.mayGenerateInterpretationClaim).toBe(false);
      const { reviewHash, ...material } = result;
      expect(reviewHash).toBe(deterministicContentHash(material));
      stamps.push(result.annualPillar.stem);
    }
    expect(stamps).toEqual(['을', '병', '정']);
    expect(results[0]).not.toEqual(results[1]);
    expect(results[1]).not.toEqual(results[2]);
    expect(auditPianGuanThreeLayerMethodForAnnualRequest(natal, dates[1]!))
      .toEqual(results[1]);
    expect(JSON.stringify(natal)).toBe(original);
  });

  test('unknown birth-hour and Dayun, transition year, unsupported year and monthly request block upstream', () => {
    const when = annual(2026, '2026-06-15T12:00:00.000Z');
    expect(auditPianGuanThreeLayerMethodForAnnualRequest(
      snapshot({ unknownHour: true }), when,
    )).toMatchObject({ status: 'input_unavailable', reasonCode: 'hour' });
    expect(auditPianGuanThreeLayerMethodForAnnualRequest(
      snapshot({ unknownLuck: true }), when,
    )).toMatchObject({ status: 'input_unavailable', reasonCode: 'luck_cycle_unavailable' });
    expect(auditPianGuanThreeLayerMethodForAnnualRequest(
      snapshot({ startYears: 6 }), when,
    )).toMatchObject({ status: 'input_unavailable', reasonCode: 'DAYUN_MULTIPLE_SEGMENTS' });
    expect(auditPianGuanThreeLayerMethodForAnnualRequest(
      snapshot(), annual(2028, '2028-02-04T01:00:00.000Z'),
    )).toEqual({
      status: 'input_unavailable',
      reasonCode: 'ANNUAL_E1_DATE_UNAVAILABLE',
      productionAuthorized: false,
    });
    const monthly: ReadingRequest = {
      ...when,
      intent: { domain: 'general', temporalScope: 'monthly' },
      targetPeriod: {
        scope: 'monthly', year: 2026, month: 6, timeZone: 'Asia/Seoul',
        referenceDateTime: '2026-06-15T12:00:00.000Z',
        resolution: 'relative_current',
      },
    };
    expect(auditPianGuanThreeLayerMethodForAnnualRequest(snapshot(), monthly))
      .toEqual({
        status: 'input_unavailable',
        reasonCode: 'ANNUAL_REQUEST_REQUIRED',
        productionAuthorized: false,
      });
  });
});
