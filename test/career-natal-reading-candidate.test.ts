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

const ALTERNATE_VISIBLE_TEN_GODS: TenGodChartFact = {
  year: { stem: resolved('정재'), branch: resolved('정인') },
  month: { stem: resolved('상관'), branch: resolved('편재') },
  day: { stem: resolved('일간'), branch: resolved('편관') },
  hour: { stem: resolved('식신'), branch: resolved('비견') },
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
    { now: new Date('2026-08-24T08:30:00.000Z') },
  );
  return {
    ...base,
    derivedFacts: { ...base.derivedFacts, tenGods: resolved(tenGods) },
  };
}

function careerClaims(execution: ReturnType<typeof runInterpretation>) {
  return execution.claims.filter((claim) => claim.predicate === 'career_conclusion');
}

function careerContext(execution: ReturnType<typeof runInterpretation>) {
  return execution.claims.filter((claim) => claim.predicate === 'career_context');
}

function careerTypes(snapshot: CanonicalSajuSnapshot): readonly string[] {
  return careerClaims(runInterpretation(snapshot, createCareerNatalReadingCandidateRegistry()))
    .map((claim) => claim.claimType)
    .sort();
}

function previewFallbackCoreText(snapshot: CanonicalSajuSnapshot): string {
  const first = careerClaims(
    runInterpretation(snapshot, createCareerNatalReadingCandidateRegistry()),
  )[0];
  if (first === undefined) throw new Error('Expected a direct career conclusion.');
  const value = first.value as { summary?: string };
  if (typeof value.summary !== 'string') throw new Error('Expected career summary.');
  return value.summary;
}

describe('natal career consumer reading research candidate', () => {
  it('remains research-only, unreviewed, and exact-Ten-God/channel bounded', () => {
    expect(CAREER_NATAL_READING_CANDIDATE_VERSION).toBe('0.4.0-research');
    expect(CAREER_NATAL_READING_PACK.status).toBe('research');
    expect(CAREER_NATAL_READING_METHODOLOGY.status).toBe('research');
    expect(CAREER_NATAL_READING_RULES).toHaveLength(20);
    expect(
      CAREER_NATAL_READING_RULES.every(
        (rule) =>
          rule.status === 'research' &&
          rule.quality.reviewerStatus === 'unreviewed' &&
          rule.taxonomy.tier === 'T8' &&
          rule.taxonomy.category === 'career' &&
          rule.inputs.some((input) => input.pathOrClaimType === 'derivedFacts.tenGods'),
      ),
    ).toBe(true);
  });

  it('surfaces visible stems as direct conclusions and preserves branches as context', () => {
    const execution = runInterpretation(fixture(), createCareerNatalReadingCandidateRegistry(), {
      now: new Date('2026-08-24T08:32:00.000Z'),
    });
    const conclusions = careerClaims(execution);
    const context = careerContext(execution);

    expect(conclusions).toHaveLength(3);
    expect(new Set(conclusions.map((claim) => (claim.value as { tenGod: string }).tenGod))).toEqual(
      new Set(['비견', '편재', '편관']),
    );
    expect(
      conclusions.every(
        (claim) => (claim.value as { channel: string }).channel === 'visible_stems',
      ),
    ).toBe(true);

    expect(context).toHaveLength(4);
    expect(new Set(context.map((claim) => (claim.value as { tenGod: string }).tenGod))).toEqual(
      new Set(['정인', '정재', '상관', '식신']),
    );
    expect(
      context.every((claim) => (claim.value as { channel: string }).channel === 'branches'),
    ).toBe(true);
  });

  it('does not collapse 식신 and 상관 into one generic output-family sentence', () => {
    const snapshot = fixture(OUTPUT_ONLY_TEN_GODS);
    const registry = createCareerNatalReadingCandidateRegistry();
    const execution = runInterpretation(snapshot, registry);
    const conclusions = careerClaims(execution);
    const context = careerContext(execution);

    expect(conclusions.map((claim) => claim.claimType).sort()).toEqual(
      [
        'CAREER_NATAL_TEN_GOD_SANG_GWAN_VISIBLE_STEMS',
        'CAREER_NATAL_TEN_GOD_SIK_SIN_VISIBLE_STEMS',
      ].sort(),
    );
    expect(context.map((claim) => claim.claimType).sort()).toEqual(
      [
        'CAREER_NATAL_TEN_GOD_SANG_GWAN_BRANCHES',
        'CAREER_NATAL_TEN_GOD_SIK_SIN_BRANCHES',
      ].sort(),
    );

    const career = buildReadingCompositionEvidence(
      snapshot,
      execution,
      registry,
      {
        requestId: 'career-exact-output-subtypes',
        intent: { domain: 'career', temporalScope: 'natal' },
      },
      { narrativePolicyVersion: 'career-natal-reading-v2' },
    );
    expect(career.selection.coverageState).toBe('complete');
    const bundledCareerClaims =
      career.evidence?.bundle.claims.filter((claim) => claim.predicate === 'career_conclusion') ?? [];
    const bundledContext =
      career.evidence?.bundle.claims.filter((claim) => claim.predicate === 'career_context') ?? [];
    expect(bundledCareerClaims).toHaveLength(2);
    expect(bundledContext).toHaveLength(2);
    expect(career.evidence?.bundle.canonicalFacts.map((fact) => fact.path)).toContain(
      'derivedFacts.tenGods',
    );
  });

  it('distinguishes synthetic direct-career structures before narrative rendering', () => {
    const first = fixture(ALTERNATE_VISIBLE_TEN_GODS);
    const second = fixture(FIVE_FAMILY_TEN_GODS);
    const firstTypes = careerTypes(first);
    const secondTypes = careerTypes(second);

    expect(firstTypes).toEqual(
      [
        'CAREER_NATAL_TEN_GOD_JEONG_JAE_VISIBLE_STEMS',
        'CAREER_NATAL_TEN_GOD_SANG_GWAN_VISIBLE_STEMS',
        'CAREER_NATAL_TEN_GOD_SIK_SIN_VISIBLE_STEMS',
      ].sort(),
    );
    expect(secondTypes).toEqual(
      [
        'CAREER_NATAL_TEN_GOD_BI_GYEON_VISIBLE_STEMS',
        'CAREER_NATAL_TEN_GOD_PYEON_GWAN_VISIBLE_STEMS',
        'CAREER_NATAL_TEN_GOD_PYEON_JAE_VISIBLE_STEMS',
      ].sort(),
    );
    expect(firstTypes).not.toEqual(secondTypes);
    expect(previewFallbackCoreText(first)).not.toBe(previewFallbackCoreText(second));
  });

  it('keeps branch context from becoming a direct career headline candidate', () => {
    for (const snapshot of [fixture(ALTERNATE_VISIBLE_TEN_GODS), fixture(FIVE_FAMILY_TEN_GODS)]) {
      const execution = runInterpretation(snapshot, createCareerNatalReadingCandidateRegistry());
      expect(
        careerClaims(execution).every(
          (claim) => (claim.value as { channel?: string }).channel === 'visible_stems',
        ),
      ).toBe(true);
      expect(
        careerContext(execution).every(
          (claim) => (claim.value as { channel?: string }).channel === 'branches',
        ),
      ).toBe(true);
    }
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
      { narrativePolicyVersion: 'career-natal-reading-v2' },
    );
    expect(natal.selection.coverageState).toBe('complete');
    const bundledCareerClaims =
      natal.evidence?.bundle.claims.filter((claim) => claim.predicate === 'career_conclusion') ?? [];
    expect(bundledCareerClaims.length).toBeGreaterThan(0);
    expect(bundledCareerClaims.every((claim) => claim.taxonomy.category === 'career')).toBe(true);

    const annual = buildReadingCompositionEvidence(
      snapshot,
      execution,
      registry,
      {
        requestId: 'career-annual-stays-temporally-closed',
        intent: { domain: 'career', temporalScope: 'annual' },
      },
      { narrativePolicyVersion: 'career-natal-reading-v2' },
    );
    expect(annual.selection.coverageState).toBe('partial_coverage');
    expect(annual.selection.missingRequirements).toContain('ANNUAL_CAREER_PERIOD_CLAIM_REQUIRED');
  });

  it('binds all direct and contextual career observations to the resolved Ten-God layout', () => {
    const execution = runInterpretation(fixture(), createCareerNatalReadingCandidateRegistry());
    const claims = [...careerClaims(execution), ...careerContext(execution)];

    for (const claim of claims) {
      expect(claim.factRefs).toContain('derivedFacts.tenGods');
      expect(claim.upstreamClaimRefs).toEqual([]);
      const value = claim.value as { tenGod?: string; channel?: string };
      expect(typeof value.tenGod).toBe('string');
      expect(['visible_stems', 'branches']).toContain(value.channel);
    }
  });

  it('does not emit occupation assignment, salary, success, or future-event authority', () => {
    const execution = runInterpretation(fixture(), createCareerNatalReadingCandidateRegistry());
    const claims = [...careerClaims(execution), ...careerContext(execution)];
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
