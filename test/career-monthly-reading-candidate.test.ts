import { describe, expect, it } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import type { CanonicalSajuSnapshot } from '../src/contracts/calculation.js';
import type { ReadingRequest } from '../src/contracts/reading.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import { buildMonthlyInterpretationFacts } from '../src/reading/monthly-interpretation-facts.js';
import { buildReadingCompositionEvidence } from '../src/reading/reading-intent-composition.js';
import { buildTemporalReadingContext } from '../src/reading/temporal-reading-context.js';
import { CAREER_NATAL_READING_RULES } from '../src/research/career-natal-reading-candidate.js';
import {
  CAREER_MONTHLY_ACTIVATION_RULES,
  CAREER_MONTHLY_NATAL_REUSED_CLAIM_TYPE_DEFINITIONS,
  CAREER_MONTHLY_READING_CANDIDATE_VERSION,
  CAREER_MONTHLY_READING_METHODOLOGY,
  CAREER_MONTHLY_READING_PACK,
  CAREER_MONTHLY_TENSION_CLAIM_TYPE,
  CAREER_MONTHLY_TENSION_RULES,
  CAREER_MONTHLY_THEME_CLAIM_TYPE,
  createCareerMonthlyReadingCandidateRegistry,
} from '../src/research/career-monthly-reading-candidate.js';

const NOW = new Date('2026-09-03T13:00:00.000Z');

function snapshot(day = 9, timeKnown = true): CanonicalSajuSnapshot {
  return calculateCanonicalSajuSnapshot(
    {
      calendarType: 'solar',
      date: { year: 1996, month: 1, day },
      time: timeKnown ? { known: true, hour: 9, minute: 30 } : { known: false },
      sexForTraditionalCalculation: 'male',
    },
    PRODUCTION_DEFAULT_CALCULATION_POLICY,
    { now: NOW },
  );
}

function request(month: number): ReadingRequest {
  return {
    requestId: `career-monthly-${month}`,
    intent: { domain: 'career', temporalScope: 'monthly' },
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
  const registry = createCareerMonthlyReadingCandidateRegistry(NOW.toISOString());
  const execution = runInterpretation(natal, registry, {
    requestId: readingRequest.requestId,
    temporalFacts: { ...monthlyFacts },
    now: NOW,
  });
  return { readingRequest, monthlyFacts, registry, execution };
}

function activeThemes(execution: ReturnType<typeof runInterpretation>) {
  return execution.claims.filter(
    (claim) => claim.state === 'active' && claim.claimType === CAREER_MONTHLY_THEME_CLAIM_TYPE.claimType,
  );
}

describe('MyeongHa Career Monthly T9 reading candidate', () => {
  it('reuses Career Natal T8 and registers strict Career Monthly contracts without General Monthly leakage', () => {
    const registry = createCareerMonthlyReadingCandidateRegistry();

    expect(CAREER_MONTHLY_READING_CANDIDATE_VERSION).toBe('0.1.0-research');
    expect(CAREER_MONTHLY_READING_PACK.status).toBe('research');
    expect(CAREER_MONTHLY_READING_PACK.claimContractMode).toBe('registered_required');
    expect(CAREER_MONTHLY_READING_METHODOLOGY.status).toBe('research');
    expect(CAREER_MONTHLY_READING_METHODOLOGY.family).toBe('time_dynamics');
    expect(CAREER_MONTHLY_ACTIVATION_RULES).toHaveLength(20);
    expect(CAREER_MONTHLY_TENSION_RULES).toHaveLength(8);
    expect(CAREER_MONTHLY_NATAL_REUSED_CLAIM_TYPE_DEFINITIONS).toHaveLength(20);
    expect(
      CAREER_NATAL_READING_RULES.every((rule) =>
        registry.rules.some(
          (registered) => registered.ruleId === rule.ruleId && registered.version === rule.version,
        ),
      ),
    ).toBe(true);
    expect(
      registry.rules.some(
        (rule) => rule.taxonomy.tier === 'T9' && rule.taxonomy.category === 'general',
      ),
    ).toBe(false);
  });

  it('emits one personalized Career Monthly activation for each before/after jeol segment from temporal facts', () => {
    const result = execute(snapshot(), 9);
    const themes = activeThemes(result.execution);

    expect(themes).toHaveLength(2);
    expect(themes.map((claim) => claim.taxonomy)).toEqual([
      { tier: 'T9', category: 'career', subcategory: 'monthly' },
      { tier: 'T9', category: 'career', subcategory: 'monthly' },
    ]);
    expect(themes.map((claim) => (claim.value as { segmentId: string }).segmentId).sort()).toEqual([
      'after_jeol',
      'before_jeol',
    ]);
    for (const claim of themes) {
      const segmentId = (claim.value as { segmentId: string }).segmentId;
      const prefix = `temporal.segmentsById.${segmentId}`;
      expect(claim.factRefs).toEqual(
        expect.arrayContaining([
          'temporal.targetYear',
          'temporal.targetMonth',
          'temporal.jeolBoundary.at',
          `${prefix}.segmentId`,
          `${prefix}.monthlyPillar`,
          `${prefix}.monthlyStemTenGod`,
        ]),
      );
      const evaluation = result.execution.evaluations.find((candidate) =>
        candidate.emittedClaimIds.includes(claim.claimId),
      );
      expect(
        evaluation?.inputRefs
          .filter((ref) => ref.idOrPath.startsWith('temporal.'))
          .every((ref) => ref.sourceType === 'temporal_fact'),
      ).toBe(true);
    }
    expect(result.execution.integrity.valid).toBe(true);
  });

  it('makes career/monthly complete with Career Natal T8 plus Career Monthly T9 evidence', () => {
    const natal = snapshot();
    const result = execute(natal, 9);
    const composition = buildReadingCompositionEvidence(
      natal,
      result.execution,
      result.registry,
      result.readingRequest,
      { narrativePolicyVersion: 'myeongha-career-monthly-narrative-v1' },
    );

    expect(composition.selection.coverageState).toBe('complete');
    expect(composition.selection.missingRequirements).toEqual([]);
    expect(composition.selection.profileRef?.id).toBe('myeonghwa-reading-profile-career-monthly-v1');
    expect(composition.selection.constraints.mayPromoteResearchAuthority).toBe(false);
    expect(composition.evidence?.bundle.claims.some((claim) => claim.taxonomy.tier === 'T8')).toBe(true);
    expect(
      composition.evidence?.bundle.claims.some(
        (claim) =>
          claim.taxonomy.tier === 'T9' &&
          claim.taxonomy.category === 'career' &&
          claim.taxonomy.subcategory === 'monthly',
      ),
    ).toBe(true);
  });

  it('is deterministic for the same target month and changes monthly career semantics across adjacent months', () => {
    const natal = snapshot();
    const septemberA = execute(natal, 9);
    const septemberB = execute(natal, 9);
    const october = execute(natal, 10);
    const keys = (execution: ReturnType<typeof runInterpretation>) =>
      activeThemes(execution)
        .map((claim) => (claim.value as { semanticKey: string }).semanticKey)
        .sort();

    expect(septemberB.execution.run.runHash).toBe(septemberA.execution.run.runHash);
    expect(septemberB.execution.claims).toEqual(septemberA.execution.claims);
    expect(keys(october.execution)).not.toEqual(keys(septemberA.execution));
  });

  it('emits resolved branch clashes only as bounded work-adjustment pressure', () => {
    let found = false;
    for (let day = 1; day <= 12; day += 1) {
      const result = execute(snapshot(day), 9);
      const tensions = result.execution.claims.filter(
        (claim) =>
          claim.state === 'active' && claim.claimType === CAREER_MONTHLY_TENSION_CLAIM_TYPE.claimType,
      );
      for (const claim of tensions) {
        const value = claim.value as { segmentId: string; natalPillar: string };
        expect(claim.taxonomy).toEqual({ tier: 'T9', category: 'career', subcategory: 'monthly' });
        expect(claim.value).toMatchObject({
          relation: 'clash',
          boundedTo: 'work_adjustment_pressure',
          adjustmentAreas: ['role', 'schedule', 'team_collaboration', 'working_method'],
        });
        expect(claim.factRefs).toContain(
          `temporal.segmentsById.${value.segmentId}.monthlyBranchRelations.${value.natalPillar}.relation`,
        );
        found = true;
      }
    }
    expect(found).toBe(true);
  });

  it('keeps monthly themes but never fabricates hour relation evidence when birth time is unknown', () => {
    const result = execute(snapshot(9, false), 9);

    expect(activeThemes(result.execution)).toHaveLength(2);
    expect(
      result.execution.claims.some(
        (claim) =>
          claim.state === 'active' &&
          claim.claimType === CAREER_MONTHLY_TENSION_CLAIM_TYPE.claimType &&
          (claim.value as { natalPillar?: string }).natalPillar === 'hour',
      ),
    ).toBe(false);
    for (const segment of result.monthlyFacts.segments) {
      expect(segment.monthlyBranchRelations.hour.status).not.toBe('resolved');
    }
  });
});
