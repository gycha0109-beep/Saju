import { describe, expect, test } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { resolved, unavailable } from '../src/contracts/common.js';
import type { CanonicalSajuSnapshot, PillarFact } from '../src/contracts/calculation.js';
import type { ReadingRequest } from '../src/contracts/reading.js';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import {
  ANNUAL_PERSONAL_SEMANTIC_ADMISSION_AUDIT_VERSION,
  auditAnnualPersonalSemanticAdmission,
} from '../src/research/general-annual-personal-semantic-admission-audit.js';

function annual(year: number, timestamp: string): ReadingRequest {
  return {
    requestId: 'annual-semantic-admission-2026',
    intent: { domain: 'general', temporalScope: 'annual' },
    targetPeriod: {
      scope: 'annual', year, timeZone: 'Asia/Seoul',
      referenceDateTime: timestamp, resolution: 'relative_current',
    },
  };
}

function natal(options: {
  startYears?: number;
  dayunBranch?: '자' | '오';
  natalDayBranch?: '자';
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
  if (base.pillars.day.status !== 'resolved') {
    throw new Error('Test requires resolved natal day');
  }
  const basis = base.pillars.day.value;
  const dayun: PillarFact = {
    ...basis,
    ...(options.dayunBranch === undefined ? {} : {
      branch: {
        value: options.dayunBranch,
        hanja: options.dayunBranch === '자' ? '子' : '午',
        element: options.dayunBranch === '자' ? '수' : '화',
        yinYang: '양',
      },
    }),
  };
  const startYears = options.startYears ?? 1;
  return {
    ...base,
    luckCycle: options.unknownLuck
      ? unavailable('test-luck-unavailable')
      : resolved({
          direction: 'forward',
          start: { age: startYears, years: startYears, months: 0, days: 0 },
          pillars: Array.from({ length: 10 }, (_, i) => ({
            age: startYears + i * 10,
            pillar: dayun,
          })),
        }),
    pillars: {
      ...base.pillars,
      ...(options.natalDayBranch === '자' ? {
        day: resolved({
          ...basis,
          branch: { value: '자', hanja: '子', element: '수', yinYang: '양' },
        }),
      } : {}),
      ...(options.unknownHour ? {
        hour: unavailable('test-hour-unavailable'),
      } : {}),
    },
  };
}

describe('SA-7D source-bound personalized annual semantic admission audit', () => {
  test('separates all 14 current rule antecedents from meaning authority and binds sources', () => {
    const snapshot = natal({ dayunBranch: '자', natalDayBranch: '자' });
    const unchanged = JSON.stringify(snapshot);
    const request = annual(2026, '2026-06-15T12:00:00.000Z');
    const result = auditAnnualPersonalSemanticAdmission(snapshot, request);
    expect(result.status).toBe('research_semantic_admission_hold');
    if (result.status !== 'research_semantic_admission_hold') return;
    expect(result.version).toBe(ANNUAL_PERSONAL_SEMANTIC_ADMISSION_AUDIT_VERSION);
    expect(result).toMatchObject({
      effectiveYear: 2026,
      annualStem: '병',
      yearScopedCandidateCount: 14,
      exactPrimaryIdentityMatches: 0,
      meaningAdmittedCandidateCount: 0,
      semanticGate: {
        inputsResolved: true,
        threeLayerFactReviewComplete: true,
        existingResearchMeaningAuthorityGranted: false,
        schoolSpecificMeaningAuthorityGranted: false,
        crossLayerPrecedenceGranted: false,
        counterexampleReconciliationGranted: false,
        concreteLifeEventInferenceGranted: false,
        mayGenerateAnnualInterpretation: false,
        mayRenderOfficialReading: false,
        mayCallModel: false,
        productionAuthorized: false,
        commerceAuthorized: false,
        monthlyAuthorized: false,
      },
    });
    expect(result.candidates).toHaveLength(14);
    expect(new Set(result.candidates.map((row) => row.ruleId)).size).toBe(14);
    expect(new Set(result.candidates.map((row) => row.semanticKey)).size).toBe(14);
    expect(result.candidates.filter((row) => row.kind === 'ten_god_modern_theme'))
      .toHaveLength(10);
    expect(result.candidates.filter((row) => row.kind === 'annual_natal_branch_clash_tension'))
      .toHaveLength(4);
    expect(result.factMatchedCandidateCount).toBe(
      result.candidates.filter((row) => row.matchedComputedInput).length,
    );
    expect(result.candidates.filter((row) =>
      row.matchedComputedInput && row.matchedTenGod !== null,
    )).toHaveLength(1);
    expect(result.candidates.find((row) => row.semanticKey === 'ANNUAL_BRANCH_CLASH_DAY'))
      .toMatchObject({
        matchedComputedInput: true,
        matchedNatalPillar: 'day',
        applicability: 'COMPUTED_INPUT_MATCHED_SEMANTICS_HOLD',
      });
    expect(result.candidates.every((row) =>
      row.currentMeaningEvidence === 'INSUFFICIENT' &&
      row.allRequiredEvidenceSatisfied === false &&
      row.missingEvidence.length === 7 &&
      row.sourceRefs.length > 0 &&
      row.counterexamples.length > 0 &&
      row.sourceSpecificOpenQuestions.length > 0 &&
      row.sourceBoundMeaningAuthorized === false &&
      row.productionInterpretationAuthorized === false &&
      row.proposedFortuneSentence === null,
    )).toBe(true);
    expect(result.candidates.filter((row) => row.exactVerifiedPrimaryPairId !== null))
      .toHaveLength(0);
    expect(result.casebookHash).toMatch(/^[a-f0-9]{64}$/u);
    expect(result.designId).toMatch(/^[a-f0-9]{64}$/u);
    expect(result.factualResultHash).toMatch(/^[a-f0-9]{64}$/u);
    expect(result.threeLayerCorpusHash).toMatch(/^[a-f0-9]{64}$/u);
    const { status, auditHash, ...data } = result;
    expect(status).toBe('research_semantic_admission_hold');
    expect(auditHash).toBe(deterministicContentHash(data));
    expect(auditAnnualPersonalSemanticAdmission(snapshot, request)).toEqual(result);
    expect(JSON.stringify(snapshot)).toBe(unchanged);
  });

  test('keeps multiple coincident clashes without promoting severity or an event', () => {
    const result = auditAnnualPersonalSemanticAdmission(
      natal({ dayunBranch: '자', natalDayBranch: '자' }),
      annual(2026, '2026-06-15T12:00:00.000Z'),
    );
    if (result.status !== 'research_semantic_admission_hold') return;
    const dayClash = result.candidates.find(
      (row) => row.semanticKey === 'ANNUAL_BRANCH_CLASH_DAY',
    );
    expect(dayClash?.matchedComputedInput).toBe(true);
    expect(dayClash?.sourceBoundMeaningAuthorized).toBe(false);
    expect(result.semanticGate.crossLayerPrecedenceGranted).toBe(false);
    expect(result.semanticGate.concreteLifeEventInferenceGranted).toBe(false);
    expect(JSON.stringify(result)).not.toMatch(
      /"luckScore":|"prediction":|"winners":|"eventPrediction":|"approvedFortuneText":/u,
    );
  });

  test('applicability changes with LiChun at 00:00 KST but semantic authority never changes', () => {
    const snapshot = natal();
    const before = auditAnnualPersonalSemanticAdmission(
      snapshot, annual(2026, '2026-02-03T14:59:59.000Z'),
    );
    const after = auditAnnualPersonalSemanticAdmission(
      snapshot, annual(2026, '2026-02-03T15:00:00.000Z'),
    );
    const next = auditAnnualPersonalSemanticAdmission(
      snapshot, annual(2027, '2027-02-03T15:00:00.000Z'),
    );
    for (const item of [before, after, next]) {
      expect(item.status).toBe('research_semantic_admission_hold');
      if (item.status !== 'research_semantic_admission_hold') continue;
      expect(item.exactPrimaryIdentityMatches).toBe(0);
      expect(item.meaningAdmittedCandidateCount).toBe(0);
      expect(item.candidates.filter((row) =>
        row.matchedComputedInput && row.matchedTenGod !== null,
      )).toHaveLength(1);
      expect(item.semanticGate.mayGenerateAnnualInterpretation).toBe(false);
    }
    if (before.status !== 'research_semantic_admission_hold' ||
        after.status !== 'research_semantic_admission_hold' ||
        next.status !== 'research_semantic_admission_hold') return;
    expect(before.effectiveYear).toBe(2025);
    expect(after.effectiveYear).toBe(2026);
    expect(next.effectiveYear).toBe(2027);
    expect(before.auditHash).not.toBe(after.auditHash);
    expect(after.auditHash).not.toBe(next.auditHash);
  });

  test('rejects unregistered LiChun source and partial/multiple Dayun inputs', () => {
    expect(auditAnnualPersonalSemanticAdmission(
      natal(), annual(2028, '2028-02-04T01:00:00.000Z'),
    )).toEqual({
      status: 'unavailable',
      reasonCode: 'ANNUAL_E1_DATE_UNAVAILABLE',
      annualInterpretationAuthorized: false,
      productionAuthorized: false,
    });
    expect(auditAnnualPersonalSemanticAdmission(
      natal({ startYears: 6 }), annual(2026, '2026-06-15T12:00:00.000Z'),
    )).toMatchObject({
      status: 'unavailable',
      reasonCode: 'DAYUN_MULTIPLE_SEGMENTS',
    });
    expect(auditAnnualPersonalSemanticAdmission(
      natal({ startYears: 36 }), annual(2026, '2026-06-15T12:00:00.000Z'),
    )).toMatchObject({
      status: 'unavailable',
      reasonCode: 'DAYUN_PARTIAL_YEAR_COVERAGE',
    });
  });

  test('does not substitute invented values for missing natal hour or Dayun', () => {
    expect(auditAnnualPersonalSemanticAdmission(
      natal({ unknownHour: true }), annual(2026, '2026-06-15T12:00:00.000Z'),
    )).toMatchObject({
      status: 'unavailable',
      reasonCode: 'hour',
      annualInterpretationAuthorized: false,
    });
    expect(auditAnnualPersonalSemanticAdmission(
      natal({ unknownLuck: true }), annual(2026, '2026-06-15T12:00:00.000Z'),
    )).toMatchObject({
      status: 'unavailable',
      reasonCode: 'luck_cycle_unavailable',
      annualInterpretationAuthorized: false,
    });
  });

  test('does not transfer annual semantic research to monthly scope', () => {
    const month: ReadingRequest = {
      ...annual(2026, '2026-06-15T12:00:00.000Z'),
      intent: { domain: 'general', temporalScope: 'monthly' },
      targetPeriod: {
        scope: 'monthly', year: 2026, month: 6, timeZone: 'Asia/Seoul',
        referenceDateTime: '2026-06-15T12:00:00.000Z',
        resolution: 'relative_current',
      },
    };
    expect(auditAnnualPersonalSemanticAdmission(natal(), month)).toEqual({
      status: 'unavailable',
      reasonCode: 'ANNUAL_REQUEST_REQUIRED',
      annualInterpretationAuthorized: false,
      productionAuthorized: false,
    });
  });
});
