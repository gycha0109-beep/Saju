import { describe, expect, it } from 'vitest';
import type { CanonicalSajuSnapshot, TenGodChartFact } from '../src/contracts/calculation.js';
import { resolved } from '../src/contracts/common.js';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { buildReadingCompositionEvidence } from '../src/reading/reading-intent-composition.js';
import { inspectMyeonghwaProductionComposition } from '../src/production/production-composition.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import {
  CAREER_NATAL_READING_CANDIDATE_VERSION,
  CAREER_NATAL_READING_METHODOLOGY,
  CAREER_NATAL_READING_PACK,
  CAREER_NATAL_READING_RULES,
  createCareerNatalReadingCandidateRegistry,
} from '../src/research/career-natal-reading-candidate.js';

const FIVE_FAMILY_TEN_GODS: TenGodChartFact = {
  year: { stem: resolved('비견'), branch: resolved('정인') },
  month: { stem: resolved('편재'), branch: resolved('정재') },
  day: { stem: resolved('일간'), branch: resolved('상관') },
  hour: { stem: resolved('편관'), branch: resolved('식신') },
};

const OUTPUT_ONLY_TEN_GODS: TenGodChartFact = {
  year: { stem: resolved('식신'), branch: resolved('상관') },
  month: { stem: resolved('상관'), branch: resolved('식신') },
  day: { stem: resolved('일간'), branch: resolved('식신') },
  hour: { stem: resolved('상관'), branch: resolved('식신') },
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
    { now: new Date('2026-08-24T06:00:00.000Z') },
  );
  return {
    ...base,
    derivedFacts: { ...base.derivedFacts, tenGods: resolved(tenGods) },
  };
}

describe('natal career consumer reading research candidate', () => {
  it('remains research-only, unreviewed, and non-predictive by contract', () => {
    expect(CAREER_NATAL_READING_CANDIDATE_VERSION).toBe('0.3.0-research');
    expect(CAREER_NATAL_READING_PACK.status).toBe('research');
    expect(CAREER_NATAL_READING_METHODOLOGY.status).toBe('research');
    expect(CAREER_NATAL_READING_RULES).toHaveLength(11);
    expect(
      CAREER_NATAL_READING_RULES.every(
        (rule) => rule.status === 'research' && rule.quality.reviewerStatus === 'unreviewed',
      ),
    ).toBe(true);
  });

  it('emits bounded T8 career conclusions from the five-family fixture', () => {
    const execution = runInterpretation(fixture(), createCareerNatalReadingCandidateRegistry(), {
      now: new Date('2026-08-24T06:01:00.000Z'),
    });
    const claims = execution.claims.filter((claim) => claim.predicate === 'career_conclusion');

    expect(claims).toHaveLength(11);
    expect(
      claims.every(
        (claim) => claim.taxonomy.tier === 'T8' && claim.taxonomy.category === 'career',
      ),
    ).toBe(true);
    expect(
      new Set(claims.map((claim) => (claim.value as { careerKind: string }).careerKind)),
    ).toEqual(new Set(['driver', 'fit', 'environment', 'friction']));
  });

  it('keeps career evidence useful even when only one family is represented', () => {
    const snapshot = fixture(OUTPUT_ONLY_TEN_GODS);
    const registry = createCareerNatalReadingCandidateRegistry();
    const execution = runInterpretation(snapshot, registry);
    const claims = execution.claims.filter((claim) => claim.predicate === 'career_conclusion');

    expect(claims).toHaveLength(1);
    expect(claims[0]?.claimType).toBe('CAREER_NATAL_CONCLUSION_OUTPUT_MAKING_ENGINE');

    const career = buildReadingCompositionEvidence(
      snapshot,
      execution,
      registry,
      {
        requestId: 'career-single-family',
        intent: { domain: 'career', temporalScope: 'natal' },
      },
      { narrativePolicyVersion: 'career-natal-reading-v1' },
    );
    expect(career.selection.coverageState).toBe('complete');
    const bundledCareerClaims =
      career.evidence?.bundle.claims.filter((claim) => claim.predicate === 'career_conclusion') ?? [];
    expect(bundledCareerClaims).toHaveLength(1);
    expect(bundledCareerClaims[0]?.claimType).toBe('CAREER_NATAL_CONCLUSION_OUTPUT_MAKING_ENGINE');
    expect(
      career.evidence?.bundle.claims.some((claim) => claim.predicate === 'ten_god_family_presence'),
    ).toBe(true);
  });

  it('opens natal career intent while annual career remains partial without T9 period evidence', () => {
    const snapshot = fixture();
    const registry = createCareerNatalReadingCandidateRegistry();
    const execution = runInterpretation(snapshot, registry);

    const natal = buildReadingCompositionEvidence(
      snapshot,
      execution,
      registry,
      {
        requestId: 'career-natal-open',
        intent: { domain: 'career', temporalScope: 'natal' },
      },
      { narrativePolicyVersion: 'career-natal-reading-v1' },
    );
    expect(natal.selection.coverageState).toBe('complete');
    const bundledCareerClaims =
      natal.evidence?.bundle.claims.filter((claim) => claim.predicate === 'career_conclusion') ?? [];
    expect(bundledCareerClaims.length).toBeGreaterThan(0);
    expect(bundledCareerClaims.every((claim) => claim.taxonomy.category === 'career')).toBe(true);
    expect(
      natal.evidence?.bundle.claims.some((claim) => claim.predicate === 'ten_god_family_presence'),
    ).toBe(true);

    const annual = buildReadingCompositionEvidence(
      snapshot,
      execution,
      registry,
      {
        requestId: 'career-annual-stays-temporally-closed',
        intent: { domain: 'career', temporalScope: 'annual' },
      },
      { narrativePolicyVersion: 'career-natal-reading-v1' },
    );
    expect(annual.selection.coverageState).toBe('partial_coverage');
    expect(annual.selection.missingRequirements).toContain('ANNUAL_CAREER_PERIOD_CLAIM_REQUIRED');
  });

  it('binds every career conclusion only to already-materialized family claims', () => {
    const execution = runInterpretation(fixture(), createCareerNatalReadingCandidateRegistry());
    const familyIds = new Set(
      execution.claims
        .filter((claim) => claim.predicate === 'ten_god_family_presence')
        .map((claim) => claim.claimId),
    );

    for (const claim of execution.claims.filter(
      (candidate) => candidate.predicate === 'career_conclusion',
    )) {
      expect(claim.upstreamClaimRefs.length).toBeGreaterThanOrEqual(1);
      expect(claim.upstreamClaimRefs.every((ref) => familyIds.has(ref))).toBe(true);
    }
  });

  it('does not emit occupation assignment, salary, success, or future-event authority', () => {
    const execution = runInterpretation(fixture(), createCareerNatalReadingCandidateRegistry());
    const claims = execution.claims.filter((claim) => claim.predicate === 'career_conclusion');
    const encoded = JSON.stringify(claims);

    for (const forbidden of [
      'career_success":true',
      'specific_occupation',
      'salary_prediction',
      'promotion_prediction',
      'future_event',
      'lucky_score',
      'strong_day_master',
      'weak_day_master',
    ]) {
      expect(encoded).not.toContain(forbidden);
    }
    expect(
      claims.every((claim) => {
        const value = claim.value as {
          specificOccupationAuthorized?: boolean;
          careerSuccessAuthorized?: boolean;
          incomeOutcomeAuthorized?: boolean;
          futureTimingAuthorized?: boolean;
          numericScoringAuthorized?: boolean;
        };
        return (
          value.specificOccupationAuthorized === false &&
          value.careerSuccessAuthorized === false &&
          value.incomeOutcomeAuthorized === false &&
          value.futureTimingAuthorized === false &&
          value.numericScoringAuthorized === false
        );
      }),
    ).toBe(true);
  });

  it('still fails closed at production composition', () => {
    const inspection = inspectMyeonghwaProductionComposition({
      registry: createCareerNatalReadingCandidateRegistry(),
    });
    expect(inspection.status).toBe('blocked');
    if (inspection.status !== 'blocked') throw new Error('Expected blocked composition.');
    expect(inspection.blockers).toContainEqual(
      expect.objectContaining({ code: 'INTERPRETATION_PACK_NOT_PRODUCTION' }),
    );
  });
});
