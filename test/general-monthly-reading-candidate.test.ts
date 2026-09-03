import { describe, expect, it } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import type { CanonicalSajuSnapshot } from '../src/contracts/calculation.js';
import type { ReadingRequest } from '../src/contracts/reading.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import { buildMonthlyInterpretationFacts } from '../src/reading/monthly-interpretation-facts.js';
import { buildReadingCompositionEvidence } from '../src/reading/reading-intent-composition.js';
import { buildTemporalReadingContext } from '../src/reading/temporal-reading-context.js';
import {
  createGeneralMonthlyReadingCandidateRegistry,
  GENERAL_MONTHLY_TENSION_CLAIM_TYPE,
  GENERAL_MONTHLY_THEME_CLAIM_TYPE,
} from '../src/research/general-monthly-reading-candidate.js';

const NOW = new Date('2026-09-03T13:00:00.000Z');

function snapshot(day = 9, timeKnown = true): CanonicalSajuSnapshot {
  return calculateCanonicalSajuSnapshot(
    {
      calendarType: 'solar',
      date: { year: 1996, month: 1, day },
      time: timeKnown ? { known: true, hour: 9, minute: 30 } : { known: false },
      sexForTraditionalCalculation: 'unspecified',
    },
    PRODUCTION_DEFAULT_CALCULATION_POLICY,
    { now: NOW },
  );
}

function request(month: number): ReadingRequest {
  return {
    requestId: `general-monthly-${month}`,
    intent: { domain: 'general', temporalScope: 'monthly' },
    targetPeriod: {
      scope: 'monthly',
      year: 2026,
      month,
      timeZone: 'Asia/Seoul',
      referenceDateTime: NOW.toISOString(),
      resolution: 'relative_current',
    },
  };
}

function execute(natal: CanonicalSajuSnapshot, month: number) {
  const readingRequest = request(month);
  const temporalContext = buildTemporalReadingContext(readingRequest);
  if (temporalContext === undefined || temporalContext.scope !== 'monthly') {
    throw new Error('fixture requires monthly temporal context');
  }
  const monthlyFacts = buildMonthlyInterpretationFacts(natal, temporalContext);
  const registry = createGeneralMonthlyReadingCandidateRegistry(NOW.toISOString());
  const execution = runInterpretation(natal, registry, {
    requestId: readingRequest.requestId,
    temporalFacts: { ...monthlyFacts },
    now: NOW,
  });
  return { readingRequest, temporalContext, monthlyFacts, registry, execution };
}

function activeThemeClaims(execution: ReturnType<typeof runInterpretation>) {
  return execution.claims.filter(
    (claim) => claim.state === 'active' && claim.claimType === GENERAL_MONTHLY_THEME_CLAIM_TYPE.claimType,
  );
}

describe('MyeongHa general monthly T9 candidate', () => {
  it('emits one bounded activation claim for each before/after jeol segment and completes general monthly coverage', () => {
    const natal = snapshot();
    const result = execute(natal, 9);
    const themes = activeThemeClaims(result.execution);

    expect(themes).toHaveLength(2);
    expect(themes.map((claim) => claim.taxonomy)).toEqual([
      { tier: 'T9', category: 'general', subcategory: 'monthly' },
      { tier: 'T9', category: 'general', subcategory: 'monthly' },
    ]);
    expect(
      themes.map((claim) => (claim.value as { segmentId: string }).segmentId).sort(),
    ).toEqual(['after_jeol', 'before_jeol']);
    expect(
      themes.every((claim) =>
        claim.factRefs.includes('temporal.targetYear') &&
        claim.factRefs.includes('temporal.targetMonth') &&
        claim.factRefs.includes('temporal.jeolBoundary') &&
        claim.factRefs.includes('temporal.segments'),
      ),
    ).toBe(true);

    const composition = buildReadingCompositionEvidence(
      natal,
      result.execution,
      result.registry,
      result.readingRequest,
      { narrativePolicyVersion: 'monthly-candidate-test' },
    );
    expect(composition.selection.coverageState).toBe('complete');
    expect(composition.selection.selectedClaimIds).toEqual(
      expect.arrayContaining(themes.map((claim) => claim.claimId)),
    );
  });

  it('fails closed when monthly target identity exists but enriched monthly segment facts are absent', () => {
    const natal = snapshot();
    const readingRequest = request(9);
    const temporalContext = buildTemporalReadingContext(readingRequest);
    if (temporalContext === undefined) throw new Error('fixture requires temporal context');
    const registry = createGeneralMonthlyReadingCandidateRegistry(NOW.toISOString());
    const execution = runInterpretation(natal, registry, {
      requestId: readingRequest.requestId,
      temporalFacts: { ...temporalContext },
      now: NOW,
    });

    expect(activeThemeClaims(execution)).toHaveLength(0);
    expect(
      execution.evaluations.filter((evaluation) =>
        evaluation.ruleRef.id.startsWith('RULE-GENERAL-MONTHLY-T9-'),
      ).every((evaluation) => evaluation.status !== 'matched'),
    ).toBe(true);

    const composition = buildReadingCompositionEvidence(
      natal,
      execution,
      registry,
      readingRequest,
      { narrativePolicyVersion: 'monthly-candidate-test' },
    );
    expect(composition.selection.coverageState).not.toBe('complete');
  });

  it('is deterministic for the same natal/month and changes semantic activation across adjacent target months', () => {
    const natal = snapshot();
    const septemberA = execute(natal, 9);
    const septemberB = execute(natal, 9);
    const october = execute(natal, 10);

    const semanticKeys = (execution: ReturnType<typeof runInterpretation>) =>
      activeThemeClaims(execution)
        .map((claim) => (claim.value as { semanticKey: string }).semanticKey)
        .sort();

    expect(semanticKeys(septemberB.execution)).toEqual(semanticKeys(septemberA.execution));
    expect(septemberB.execution.run.interpretationRunId).toBe(
      septemberA.execution.run.interpretationRunId,
    );
    expect(semanticKeys(october.execution)).not.toEqual(semanticKeys(septemberA.execution));
  });

  it('personalizes the same target month through the natal day master', () => {
    const left = execute(snapshot(9), 9);
    const right = execute(snapshot(10), 9);
    const leftKeys = activeThemeClaims(left.execution)
      .map((claim) => (claim.value as { semanticKey: string }).semanticKey)
      .sort();
    const rightKeys = activeThemeClaims(right.execution)
      .map((claim) => (claim.value as { semanticKey: string }).semanticKey)
      .sort();

    expect(right.monthlyFacts.segments.map((segment) => segment.monthlyPillar)).toEqual(
      left.monthlyFacts.segments.map((segment) => segment.monthlyPillar),
    );
    expect(rightKeys).not.toEqual(leftKeys);
  });

  it('keeps both monthly phase themes with unknown birth time and never fabricates an hour clash claim', () => {
    const result = execute(snapshot(9, false), 9);
    expect(activeThemeClaims(result.execution)).toHaveLength(2);

    const hourTensions = result.execution.claims.filter(
      (claim) =>
        claim.state === 'active' &&
        claim.claimType === GENERAL_MONTHLY_TENSION_CLAIM_TYPE.claimType &&
        (claim.value as { natalPillar?: string }).natalPillar === 'hour',
    );
    expect(hourTensions).toHaveLength(0);
  });

  it('emits a bounded tension claim only when an actual segment-to-natal clash is resolved', () => {
    let found = false;
    for (let day = 1; day <= 12; day += 1) {
      const result = execute(snapshot(day), 9);
      const tensions = result.execution.claims.filter(
        (claim) =>
          claim.state === 'active' && claim.claimType === GENERAL_MONTHLY_TENSION_CLAIM_TYPE.claimType,
      );
      for (const claim of tensions) {
        expect(claim.taxonomy).toEqual({ tier: 'T9', category: 'general', subcategory: 'monthly' });
        expect(claim.value).toMatchObject({ relation: 'clash', narrativeRole: 'tension' });
        found = true;
      }
    }
    expect(found).toBe(true);
  });
});
