import { describe, expect, it } from 'vitest';
import type { CanonicalSajuSnapshot, TenGodChartFact } from '../src/contracts/calculation.js';
import { resolved } from '../src/contracts/common.js';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { buildReadingCompositionEvidence } from '../src/reading/reading-intent-composition.js';
import { inspectMyeonghwaProductionComposition } from '../src/production/production-composition.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import {
  WEALTH_NATAL_READING_CANDIDATE_VERSION,
  WEALTH_NATAL_READING_METHODOLOGY,
  WEALTH_NATAL_READING_PACK,
  WEALTH_NATAL_READING_RULES,
  createWealthNatalReadingCandidateRegistry,
} from '../src/research/wealth-natal-reading-candidate.js';

const FIVE_FAMILY_TEN_GODS: TenGodChartFact = {
  year: { stem: resolved('비견'), branch: resolved('정인') },
  month: { stem: resolved('편재'), branch: resolved('정재') },
  day: { stem: resolved('일간'), branch: resolved('상관') },
  hour: { stem: resolved('편관'), branch: resolved('식신') },
};

const RESOURCE_ONLY_TEN_GODS: TenGodChartFact = {
  year: { stem: resolved('정인'), branch: resolved('편인') },
  month: { stem: resolved('편인'), branch: resolved('정인') },
  day: { stem: resolved('일간'), branch: resolved('정인') },
  hour: { stem: resolved('편인'), branch: resolved('정인') },
};

function fixture(tenGods: TenGodChartFact = FIVE_FAMILY_TEN_GODS): CanonicalSajuSnapshot {
  const base = calculateCanonicalSajuSnapshot(
    {
      calendarType: 'solar',
      date: { year: 2024, month: 3, day: 10 },
      time: { known: true, hour: 12, minute: 0 },
      sexForTraditionalCalculation: 'unspecified',
    },
    PRODUCTION_DEFAULT_CALCULATION_POLICY,
    { now: new Date('2026-08-24T06:30:00.000Z') },
  );
  return {
    ...base,
    derivedFacts: { ...base.derivedFacts, tenGods: resolved(tenGods) },
  };
}

describe('natal wealth consumer reading research candidate', () => {
  it('remains research-only, unreviewed, and non-advisory by contract', () => {
    expect(WEALTH_NATAL_READING_CANDIDATE_VERSION).toBe('0.4.0-research');
    expect(WEALTH_NATAL_READING_PACK.status).toBe('research');
    expect(WEALTH_NATAL_READING_METHODOLOGY.status).toBe('research');
    expect(WEALTH_NATAL_READING_RULES).toHaveLength(11);
    expect(
      WEALTH_NATAL_READING_RULES.every(
        (rule) => rule.status === 'research' && rule.quality.reviewerStatus === 'unreviewed',
      ),
    ).toBe(true);
  });

  it('emits bounded T8 wealth conclusions from the five-family fixture', () => {
    const execution = runInterpretation(fixture(), createWealthNatalReadingCandidateRegistry(), {
      now: new Date('2026-08-24T06:31:00.000Z'),
    });
    const claims = execution.claims.filter((claim) => claim.predicate === 'wealth_conclusion');

    expect(claims).toHaveLength(11);
    expect(
      claims.every(
        (claim) => claim.taxonomy.tier === 'T8' && claim.taxonomy.category === 'wealth',
      ),
    ).toBe(true);
    expect(
      new Set(claims.map((claim) => (claim.value as { wealthKind: string }).wealthKind)),
    ).toEqual(new Set(['value_creation', 'spending', 'management', 'friction']));
  });

  it('keeps wealth evidence useful even when only one family is represented', () => {
    const snapshot = fixture(RESOURCE_ONLY_TEN_GODS);
    const registry = createWealthNatalReadingCandidateRegistry();
    const execution = runInterpretation(snapshot, registry);
    const claims = execution.claims.filter((claim) => claim.predicate === 'wealth_conclusion');

    expect(claims).toHaveLength(1);
    expect(claims[0]?.claimType).toBe('WEALTH_NATAL_CONCLUSION_RESOURCE_CAPABILITY_SPEND');

    const wealth = buildReadingCompositionEvidence(
      snapshot,
      execution,
      registry,
      {
        requestId: 'wealth-single-family',
        intent: { domain: 'wealth', temporalScope: 'natal' },
      },
      { narrativePolicyVersion: 'wealth-natal-reading-v1' },
    );
    expect(wealth.selection.coverageState).toBe('complete');
    const bundledWealthClaims =
      wealth.evidence?.bundle.claims.filter((claim) => claim.predicate === 'wealth_conclusion') ?? [];
    expect(bundledWealthClaims).toHaveLength(1);
    expect(bundledWealthClaims[0]?.claimType).toBe(
      'WEALTH_NATAL_CONCLUSION_RESOURCE_CAPABILITY_SPEND',
    );
    expect(
      wealth.evidence?.bundle.claims.some((claim) => claim.predicate === 'ten_god_family_presence'),
    ).toBe(true);
  });

  it('opens natal wealth intent while annual wealth remains partial without T9 period evidence', () => {
    const snapshot = fixture();
    const registry = createWealthNatalReadingCandidateRegistry();
    const execution = runInterpretation(snapshot, registry);

    const natal = buildReadingCompositionEvidence(
      snapshot,
      execution,
      registry,
      {
        requestId: 'wealth-natal-open',
        intent: { domain: 'wealth', temporalScope: 'natal' },
      },
      { narrativePolicyVersion: 'wealth-natal-reading-v1' },
    );
    expect(natal.selection.coverageState).toBe('complete');
    const bundledWealthClaims =
      natal.evidence?.bundle.claims.filter((claim) => claim.predicate === 'wealth_conclusion') ?? [];
    expect(bundledWealthClaims.length).toBeGreaterThan(0);
    expect(bundledWealthClaims.every((claim) => claim.taxonomy.category === 'wealth')).toBe(true);

    const annual = buildReadingCompositionEvidence(
      snapshot,
      execution,
      registry,
      {
        requestId: 'wealth-annual-stays-temporally-closed',
        intent: { domain: 'wealth', temporalScope: 'annual' },
      },
      { narrativePolicyVersion: 'wealth-natal-reading-v1' },
    );
    expect(annual.selection.coverageState).toBe('partial_coverage');
    expect(annual.selection.missingRequirements).toContain('ANNUAL_WEALTH_PERIOD_CLAIM_REQUIRED');
  });

  it('binds every wealth conclusion only to already-materialized family claims', () => {
    const execution = runInterpretation(fixture(), createWealthNatalReadingCandidateRegistry());
    const familyIds = new Set(
      execution.claims
        .filter((claim) => claim.predicate === 'ten_god_family_presence')
        .map((claim) => claim.claimId),
    );

    for (const claim of execution.claims.filter(
      (candidate) => candidate.predicate === 'wealth_conclusion',
    )) {
      expect(claim.upstreamClaimRefs.length).toBeGreaterThanOrEqual(1);
      expect(claim.upstreamClaimRefs.every((ref) => familyIds.has(ref))).toBe(true);
    }
  });

  it('does not emit wealth magnitude, investment-return, windfall, advice, or future timing authority', () => {
    const execution = runInterpretation(fixture(), createWealthNatalReadingCandidateRegistry());
    const claims = execution.claims.filter((claim) => claim.predicate === 'wealth_conclusion');
    const encoded = JSON.stringify(claims);

    for (const forbidden of [
      'net_worth_prediction',
      'salary_prediction',
      'investment_return_prediction',
      'lottery_prediction',
      'windfall_prediction',
      'future_money_event',
      'lucky_score',
    ]) {
      expect(encoded).not.toContain(forbidden);
    }
    expect(
      claims.every((claim) => {
        const value = claim.value as {
          netWorthAuthorized?: boolean;
          investmentReturnAuthorized?: boolean;
          windfallAuthorized?: boolean;
          financialAdviceAuthorized?: boolean;
          futureMoneyTimingAuthorized?: boolean;
          numericScoringAuthorized?: boolean;
        };
        return (
          value.netWorthAuthorized === false &&
          value.investmentReturnAuthorized === false &&
          value.windfallAuthorized === false &&
          value.financialAdviceAuthorized === false &&
          value.futureMoneyTimingAuthorized === false &&
          value.numericScoringAuthorized === false
        );
      }),
    ).toBe(true);
  });

  it('still fails closed at production composition', () => {
    const inspection = inspectMyeonghwaProductionComposition({
      registry: createWealthNatalReadingCandidateRegistry(),
    });
    expect(inspection.status).toBe('blocked');
    if (inspection.status !== 'blocked') throw new Error('Expected blocked composition.');
    expect(inspection.blockers).toContainEqual(
      expect.objectContaining({ code: 'INTERPRETATION_PACK_NOT_PRODUCTION' }),
    );
  });
});
