import { describe, expect, test } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { resolved, unavailable } from '../src/contracts/common.js';
import type { CanonicalSajuSnapshot, PillarFact } from '../src/contracts/calculation.js';
import type { ReadingRequest } from '../src/contracts/reading.js';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import {
  ANNUAL_THREE_LAYER_CLASSICAL_PRINT_SOURCES,
  ANNUAL_THREE_LAYER_CLASSICAL_CLAUSES,
  ANNUAL_THREE_LAYER_CLASSICAL_GATE_QUESTIONS,
  ANNUAL_THREE_LAYER_CLASSICAL_UNRESOLVED,
  buildAnnualThreeLayerClassicalSourceBridge,
  auditAnnualThreeLayerClassicalSourceScope,
} from '../src/research/general-annual-three-layer-classical-source-bridge.js';

function annual(year: number, instant: string): ReadingRequest {
  return {
    requestId: 'printed-three-layer-bridge',
    intent: { domain: 'general', temporalScope: 'annual' },
    targetPeriod: {
      scope: 'annual', year, timeZone: 'Asia/Seoul',
      referenceDateTime: instant, resolution: 'relative_current',
    },
  };
}
function fixture(options: {
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
  if (base.pillars.day.status !== 'resolved') throw new Error('Fixture day missing');
  const day: PillarFact = base.pillars.day.value;
  const age = options.startYears ?? 1;
  return {
    ...base,
    pillars: options.unknownHour
      ? { ...base.pillars, hour: unavailable('test-hour-unavailable') }
      : base.pillars,
    luckCycle: options.unknownLuck
      ? unavailable('test-luck-unavailable')
      : resolved({
          direction: 'forward',
          start: { age, years: age, months: 0, days: 0 },
          pillars: Array.from({ length: 10 }, (_, index) => ({
            age: age + index * 10, pillar: day,
          })),
        }),
  };
}

describe('NLC printed classical passages: three temporal layers are cited, not executable', () => {
  test('two identifiable scanned sources with distinct scopes and exact pages', () => {
    expect(ANNUAL_THREE_LAYER_CLASSICAL_PRINT_SOURCES).toHaveLength(2);
    expect(ANNUAL_THREE_LAYER_CLASSICAL_PRINT_SOURCES[0]).toMatchObject({
      title: '子平真詮',
      section: '論行運',
      pdfPagesOneBased: [56, 58],
      printedPages: ['四十七', '四十九'],
      directlyAttestsNatalAndLuck: true,
      directlyAttestsNatalLuckAndAnnualInOneMethod: false,
      printDateAndOriginalEditionConfirmed: false,
    });
    expect(ANNUAL_THREE_LAYER_CLASSICAL_PRINT_SOURCES[1]).toMatchObject({
      title: '三命通會',
      section: '論太歲；總論歲運',
      pdfPagesOneBased: [25, 26, 27],
      directlyAttestsNatalLuckAndAnnualInOneMethod: true,
      printDateAndOriginalEditionConfirmed: false,
    });
    expect(ANNUAL_THREE_LAYER_CLASSICAL_PRINT_SOURCES.every(
      (source) => source.evidenceTier === 'specific_scanned_print_pages_visually_inspected',
    )).toBe(true);
  });

  test('each cited fragment is a historical scope statement, not an algorithm', () => {
    expect(ANNUAL_THREE_LAYER_CLASSICAL_CLAUSES).toHaveLength(7);
    expect(ANNUAL_THREE_LAYER_CLASSICAL_CLAUSES.map((x) => x.pdfPageOneBased))
      .toEqual([56, 58, 58, 26, 26, 27, 27]);
    expect(ANNUAL_THREE_LAYER_CLASSICAL_CLAUSES.map((x) => x.excerpt))
      .toEqual([
        '論運與看命無二法也',
        '本命巳酉有相會則沖無力',
        '年支亥未則卯逢年會',
        '要大運日主與太歲相和相順',
        '運干支傷沖太歲亦曰征',
        '運與流年二者相為表裏',
        '最怕行運與太歲沖剋',
      ]);
    expect(ANNUAL_THREE_LAYER_CLASSICAL_CLAUSES.every((c) =>
      c.supportsTemporalConsideration &&
      !c.supportsTripleClashWinner &&
      !c.permitsModernInterpretation)).toBe(true);
  });

  test('half-combination, ambiguity and year/dayun clash do not promote false priority', () => {
    const evidence = buildAnnualThreeLayerClassicalSourceBridge();
    expect(evidence.questions).toBe(ANNUAL_THREE_LAYER_CLASSICAL_GATE_QUESTIONS);
    expect(evidence.questions).toHaveLength(7);
    expect(evidence.questions.filter((q) => q.sourceAttestsRelation)).toHaveLength(3);
    expect(evidence.questions.every((q) => !q.executableRuleAuthorized)).toBe(true);
    expect(evidence.questions.find((q) => q.id ===
      'DOES_ANNUAL_ALWAYS_OVERRIDE_DAYUN_AND_NATAL')?.answer)
      .toBe('HOLD_NO_GLOBAL_TEMPORAL_WINNER');
    expect(evidence.questions.find((q) => q.id ===
      'CAN_NATAL_DAYUN_ANNUAL_BRANCH_TRIPLES_ALWAYS_BE_RECONCILED')?.answer)
      .toBe('HOLD_NO_COMPLETE_BRANCH_TRIPLE_COMPETITION_ALGORITHM');
    expect(evidence.questions.find((q) => q.id ===
      'CAN_HAI_WEI_IN_ONE_NATAL_YEAR_SLOT_BE_AUTO_ASSIGNED')?.answer)
      .toBe('HOLD_ORIGINAL_ALTERNATIVE_OR_ABBREVIATION_AMBIGUITY');
    expect(evidence.unresolved).toBe(ANNUAL_THREE_LAYER_CLASSICAL_UNRESOLVED);
    expect(evidence.authority).toMatchObject({
      natalDayunConsiderationTextuallyAttested: true,
      natalDayunAnnualConsiderationTextuallyAttested: true,
      dayunAnnualClashConsiderationTextuallyAttested: true,
      originalNatalConditionAutomaticallyPortableAsAnnualTripleRule: false,
      fullySpecifiedTripleClashResolutionAlgorithm: false,
      severityOrGlobalLayerWinnerAuthorized: false,
      modernPersonalOutcomeAuthorized: false,
      officialReadingAuthorized: false,
      productionAuthorized: false,
    });
    const { evidenceHash, ...material } = evidence;
    expect(evidenceHash).toBe(deterministicContentHash(material));
    expect(buildAnnualThreeLayerClassicalSourceBridge()).toEqual(evidence);
  });

  test('annual snapshot keeps 9-pair/16-triple research parent hash and no event claim', () => {
    const snapshot = fixture();
    const before = JSON.stringify(snapshot);
    const req = annual(2026, '2026-06-15T12:00:00.000Z');
    const audit = auditAnnualThreeLayerClassicalSourceScope(snapshot, req);
    expect(audit.status).toBe('research_three_layer_scope_attested_priority_hold');
    if (audit.status !== 'research_three_layer_scope_attested_priority_hold') {
      throw new Error('Expected fail-closed research witness result');
    }
    expect(audit.printedTemporalLayerReferencesVerified).toBe(3);
    expect(audit.completeHistoricalTripleClashAlgorithmCount).toBe(0);
    expect(audit.temporalLayerPrecedence).toBeNull();
    expect(audit.branchTripleClashResolution).toBeNull();
    expect(audit.outcomeSeverity).toBeNull();
    expect(audit.individualPrediction).toBeNull();
    expect(audit.authority.productionAuthorized).toBe(false);
    const { auditHash, ...material } = audit;
    expect(auditHash).toBe(deterministicContentHash(material));
    expect(auditAnnualThreeLayerClassicalSourceScope(snapshot, req)).toEqual(audit);
    expect(JSON.stringify(snapshot)).toBe(before);
  });

  test('LiChun rollover changes temporal observation, not printed evidence', () => {
    const snapshot = fixture();
    const before = auditAnnualThreeLayerClassicalSourceScope(
      snapshot, annual(2026, '2026-02-03T14:59:59.000Z'));
    const after = auditAnnualThreeLayerClassicalSourceScope(
      snapshot, annual(2026, '2026-02-03T15:00:00.000Z'));
    expect(before.status).toBe('research_three_layer_scope_attested_priority_hold');
    expect(after.status).toBe('research_three_layer_scope_attested_priority_hold');
    if (before.status !== 'research_three_layer_scope_attested_priority_hold' ||
        after.status !== 'research_three_layer_scope_attested_priority_hold') return;
    expect(before.evidenceHash).toBe(after.evidenceHash);
    expect(before.auditHash).not.toBe(after.auditHash);
    expect(after.temporalLayerPrecedence).toBeNull();
  });

  test('missing hour, missing/turning Dayun, unsupported E1 and monthly fail closed', () => {
    const req = annual(2026, '2026-06-15T12:00:00.000Z');
    expect(auditAnnualThreeLayerClassicalSourceScope(fixture({ unknownHour: true }), req))
      .toEqual({ status: 'input_unavailable', reasonCode: 'hour', productionAuthorized: false });
    expect(auditAnnualThreeLayerClassicalSourceScope(fixture({ unknownLuck: true }), req))
      .toEqual({
        status: 'input_unavailable', reasonCode: 'luck_cycle_unavailable',
        productionAuthorized: false,
      });
    expect(auditAnnualThreeLayerClassicalSourceScope(fixture({ startYears: 6 }), req))
      .toMatchObject({ status: 'input_unavailable', reasonCode: 'DAYUN_MULTIPLE_SEGMENTS' });
    expect(auditAnnualThreeLayerClassicalSourceScope(
      fixture(), annual(2028, '2028-02-04T01:00:00.000Z')))
      .toEqual({
        status: 'input_unavailable', reasonCode: 'ANNUAL_E1_DATE_UNAVAILABLE',
        productionAuthorized: false,
      });
    const monthly: ReadingRequest = {
      ...req,
      intent: { domain: 'general', temporalScope: 'monthly' },
      targetPeriod: {
        scope: 'monthly', year: 2026, month: 6,
        timeZone: 'Asia/Seoul',
        referenceDateTime: '2026-06-15T12:00:00.000Z',
        resolution: 'relative_current',
      },
    };
    expect(auditAnnualThreeLayerClassicalSourceScope(fixture(), monthly))
      .toEqual({
        status: 'input_unavailable', reasonCode: 'ANNUAL_REQUEST_REQUIRED',
        productionAuthorized: false,
      });
  });
});
