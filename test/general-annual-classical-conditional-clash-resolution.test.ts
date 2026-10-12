import { describe, expect, test } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { resolved, unavailable } from '../src/contracts/common.js';
import type { CanonicalSajuSnapshot, PillarFact } from '../src/contracts/calculation.js';
import type { ReadingRequest } from '../src/contracts/reading.js';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import {
  ANNUAL_CLASSICAL_RESOLUTION_METHOD_VERSION,
  CLASSICAL_RESOLUTION_PRINT_WITNESS,
  CLASSICAL_RESOLUTION_CLAUSES,
  CLASSICAL_RESOLUTION_METHOD_QUESTIONS,
  CLASSICAL_RESOLUTION_METHOD_UNRESOLVED,
  buildClassicalConditionalResolutionEvidence,
  auditAnnualClassicalResolutionMethodScope,
} from '../src/research/general-annual-classical-conditional-clash-resolution.js';

function annual(year: number, instant: string): ReadingRequest {
  return {
    requestId: 'classical-conditional-resolution',
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

describe('classical conditional triple/clash method: print-scanned cases', () => {
  test('printed source is chapter VII and pages 14-16, not digital editor annotations', () => {
    expect(ANNUAL_CLASSICAL_RESOLUTION_METHOD_VERSION).toContain('v1');
    expect(CLASSICAL_RESOLUTION_PRINT_WITNESS).toMatchObject({
      title: '子平真詮',
      chapter: '七、論刑沖會合解法',
      pdfPageOneBasedStart: 23,
      pdfPageOneBasedEnd: 25,
      printedLeafPageStart: '十四',
      printedLeafPageEnd: '十六',
      printScanPageChecked: true,
      titleSpecificPrintEditionDated: false,
      appendedDigitalEditorNotesCountAsPrint: false,
      originalNatalFourPillarsContext: true,
      natalDayunAnnualInteractionExplicitlyAttested: false,
    });
    expect(CLASSICAL_RESOLUTION_CLAUSES).toHaveLength(4);
    expect(CLASSICAL_RESOLUTION_CLAUSES.map((x) => x.pdfPageOneBased))
      .toEqual([24, 24, 25, 25]);
    expect(CLASSICAL_RESOLUTION_CLAUSES[0]?.excerpt)
      .toBe('有亥與未則卯與亥未會而不沖');
    expect(CLASSICAL_RESOLUTION_CLAUSES[1]?.excerpt)
      .toBe('有巳與丑則酉與巳丑會而不沖');
    expect(CLASSICAL_RESOLUTION_CLAUSES[2]?.excerpt)
      .toBe('而時逢巳酉則丑與巳酉會而子復沖午');
    expect(CLASSICAL_RESOLUTION_CLAUSES[3]?.excerpt).toBe('一合而一刑');
  });

  test('affirmations and counterexamples preclude blanket resolution', () => {
    const evidence = buildClassicalConditionalResolutionEvidence();
    expect(evidence.clauses.filter((x) => x.historicalExampleAffirmsResolution)).toHaveLength(2);
    expect(evidence.clauses.filter((x) => x.historicalExampleAffirmsReinstatement))
      .toHaveLength(2);
    expect(evidence.clauses.every((x) =>
      x.fourPillarSourceScenarioNotPortableToCrossTemporalLayers &&
      !x.admitsAutomaticWinner)).toBe(true);
    expect(evidence.questionGates).toBe(CLASSICAL_RESOLUTION_METHOD_QUESTIONS);
    expect(evidence.questionGates).toHaveLength(7);
    expect(evidence.questionGates.filter((x) =>
      x.historicalStatementDirectlyAttested)).toHaveLength(2);
    expect(evidence.questionGates.every((x) => !x.executableModernRuleAuthorized)).toBe(true);
    expect(evidence.questionGates.find((x) =>
      x.id === 'DOES_TRIPLE_ALWAYS_OUTRANK_CLASH')?.decision)
      .toBe('HOLD_DIRECT_COUNTEREXAMPLE_TO_BLANKET_PRIORITY');
    expect(evidence.questionGates.find((x) =>
      x.id === 'DO_FOUR_PILLAR_EXAMPLES_DEFINE_ANNUAL_DAYUN_NATAL_LAYER_PORTABILITY')
      ?.decision).toBe('HOLD_ORIGINAL_CONTEXT_NOT_THREE_TEMPORAL_LAYERS');
    expect(evidence.authority.natalDayunAnnualTransportMethodAuthorized).toBe(false);
    expect(evidence.authority.modernIndividualInterpretationAuthorized).toBe(false);
    expect(evidence.unresolved).toBe(CLASSICAL_RESOLUTION_METHOD_UNRESOLVED);
    const { classicalMethodHash, ...material } = evidence;
    expect(classicalMethodHash).toBe(deterministicContentHash(material));
    expect(buildClassicalConditionalResolutionEvidence()).toEqual(evidence);
  });

  test('illustrative five branches cannot be interpreted as four literal pillar slots', () => {
    const caseId = CLASSICAL_RESOLUTION_CLAUSES.find((x) =>
      x.id === 'SECOND_COMBINATION_REINSTATES_ZI_WU_CLASH');
    expect(caseId?.referencedBranches).toEqual(['子', '午', '丑', '巳', '酉']);
    expect(caseId?.referencedBranches.length).toBeGreaterThan(4);
    expect(caseId?.admitsAutomaticWinner).toBe(false);
    expect(CLASSICAL_RESOLUTION_METHOD_UNRESOLVED)
      .toContain('FIVE_BRANCH_ILLUSTRATION_CANNOT_BE_LOADED_INTO_FOUR_DISTINCT_PILLAR_SLOTS_AS_WRITTEN');
    expect(CLASSICAL_RESOLUTION_METHOD_UNRESOLVED)
      .toContain('SOURCE_USES_SANHUI_FOR_SHEN_ZI_CHEN_NOT_MODERN_SANHUI_TERMINOLOGY');
  });

  test('annual result stays research-only; upstream hashes and inputs stable', () => {
    const snapshot = fixture();
    const before = JSON.stringify(snapshot);
    const request = annual(2026, '2026-06-15T12:00:00.000Z');
    const audit = auditAnnualClassicalResolutionMethodScope(snapshot, request);
    expect(audit.status).toBe('research_conditional_method_scope_hold');
    if (audit.status !== 'research_conditional_method_scope_hold') {
      throw new Error('Fixture unexpectedly unavailable');
    }
    expect(audit.contextualHistoricalCases).toBe(4);
    expect(audit.observedModernCasesAdjudicatedByHistoricalPrecedence).toBe(0);
    expect(audit.possibleHistoricalAnalogiesAsAuthorizedForecasts).toBe(0);
    expect(audit.globalTripleOrClashPriority).toBeNull();
    expect(audit.natalDayunAnnualResolutionAlgorithm).toBeNull();
    expect(audit.personalOutcome).toBeNull();
    expect(audit.authority.productionAuthorized).toBe(false);
    const { auditHash, ...material } = audit;
    expect(auditHash).toBe(deterministicContentHash(material));
    expect(auditAnnualClassicalResolutionMethodScope(snapshot, request)).toEqual(audit);
    expect(JSON.stringify(snapshot)).toBe(before);
  });

  test('LiChun changes contextual temporal audit but not historical evidence hash', () => {
    const snapshot = fixture();
    const prior = auditAnnualClassicalResolutionMethodScope(
      snapshot, annual(2026, '2026-02-03T14:59:59.000Z'));
    const next = auditAnnualClassicalResolutionMethodScope(
      snapshot, annual(2026, '2026-02-03T15:00:00.000Z'));
    expect(prior.status).toBe('research_conditional_method_scope_hold');
    expect(next.status).toBe('research_conditional_method_scope_hold');
    if (prior.status !== 'research_conditional_method_scope_hold' ||
        next.status !== 'research_conditional_method_scope_hold') return;
    expect(prior.auditHash).not.toBe(next.auditHash);
    expect(prior.classicalMethodHash).toBe(next.classicalMethodHash);
    expect(next.natalDayunAnnualResolutionAlgorithm).toBeNull();
  });

  test('unknown hour, missing/turning Dayun, unsupported year and monthly fail closed', () => {
    const request = annual(2026, '2026-06-15T12:00:00.000Z');
    expect(auditAnnualClassicalResolutionMethodScope(fixture({ unknownHour: true }), request))
      .toEqual({ status: 'input_unavailable', reasonCode: 'hour', productionAuthorized: false });
    expect(auditAnnualClassicalResolutionMethodScope(fixture({ unknownLuck: true }), request))
      .toEqual({
        status: 'input_unavailable', reasonCode: 'luck_cycle_unavailable',
        productionAuthorized: false,
      });
    expect(auditAnnualClassicalResolutionMethodScope(fixture({ startYears: 6 }), request))
      .toMatchObject({ status: 'input_unavailable', reasonCode: 'DAYUN_MULTIPLE_SEGMENTS' });
    expect(auditAnnualClassicalResolutionMethodScope(
      fixture(), annual(2028, '2028-02-04T01:00:00.000Z')))
      .toEqual({
        status: 'input_unavailable', reasonCode: 'ANNUAL_E1_DATE_UNAVAILABLE',
        productionAuthorized: false,
      });
    const monthly: ReadingRequest = {
      ...request,
      intent: { domain: 'general', temporalScope: 'monthly' },
      targetPeriod: {
        scope: 'monthly', year: 2026, month: 6,
        timeZone: 'Asia/Seoul',
        referenceDateTime: '2026-06-15T12:00:00.000Z',
        resolution: 'relative_current',
      },
    };
    expect(auditAnnualClassicalResolutionMethodScope(fixture(), monthly))
      .toEqual({
        status: 'input_unavailable', reasonCode: 'ANNUAL_REQUEST_REQUIRED',
        productionAuthorized: false,
      });
  });
});
