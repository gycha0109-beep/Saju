import { describe, expect, it } from 'vitest';
import type { CanonicalSajuSnapshot, PillarFact } from '../src/contracts/calculation.js';
import { resolved } from '../src/contracts/common.js';
import type { ReadingRequest } from '../src/contracts/reading.js';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import {
  buildAnnualInterpretationFacts,
  deriveAnnualStemTenGod,
} from '../src/reading/annual-interpretation-facts.js';
import { buildReadingCompositionEvidence } from '../src/reading/reading-intent-composition.js';
import { buildTemporalReadingContext } from '../src/reading/temporal-reading-context.js';
import { CAREER_NATAL_READING_RULES } from '../src/research/career-natal-reading-candidate.js';
import {
  CAREER_ANNUAL_ACTIVATION_RULES,
  CAREER_ANNUAL_READING_CANDIDATE_VERSION,
  CAREER_ANNUAL_READING_METHODOLOGY,
  CAREER_ANNUAL_READING_PACK,
  CAREER_ANNUAL_TENSION_CLAIM_TYPE,
  CAREER_ANNUAL_TENSION_RULES,
  CAREER_ANNUAL_THEME_CLAIM_TYPE,
  CAREER_NATAL_REUSED_CLAIM_TYPE_DEFINITIONS,
  createCareerAnnualReadingCandidateRegistry,
} from '../src/research/career-annual-reading-candidate.js';

const NOW = new Date('2026-09-04T01:00:00.000Z');

function snapshot(timeKnown = true): CanonicalSajuSnapshot {
  return calculateCanonicalSajuSnapshot(
    {
      calendarType: 'solar',
      date: { year: 1996, month: 1, day: 9 },
      time: timeKnown ? { known: true, hour: 9, minute: 30 } : { known: false },
      sexForTraditionalCalculation: 'male',
    },
    PRODUCTION_DEFAULT_CALCULATION_POLICY,
    { now: NOW },
  );
}

function annualRequest(year: number): ReadingRequest {
  return {
    requestId: `career-annual-${year}`,
    intent: { domain: 'career', temporalScope: 'annual' },
    targetPeriod: {
      scope: 'annual',
      year,
      timeZone: 'Asia/Seoul',
      referenceDateTime: NOW.toISOString(),
      resolution: 'explicit',
    },
  };
}

function temporalFacts(value: CanonicalSajuSnapshot, year: number) {
  const context = buildTemporalReadingContext(annualRequest(year));
  if (context === undefined) throw new Error('career annual request must produce temporal context');
  return { ...buildAnnualInterpretationFacts(value, context) };
}

function withDayBranchClash(value: CanonicalSajuSnapshot): CanonicalSajuSnapshot {
  if (value.pillars.day.status !== 'resolved') throw new Error('fixture requires resolved day pillar');
  const day: PillarFact = {
    ...value.pillars.day.value,
    branch: { value: '자', hanja: '子', element: '수', yinYang: '양' },
  };
  return { ...value, pillars: { ...value.pillars, day: resolved(day) } };
}

describe('MyeongHa Career Annual T9 reading candidate', () => {
  it('reuses Career Natal T8 and registers the strict Career Annual contracts without authority promotion', () => {
    const registry = createCareerAnnualReadingCandidateRegistry();

    expect(CAREER_ANNUAL_READING_CANDIDATE_VERSION).toBe('0.1.0-research');
    expect(CAREER_ANNUAL_READING_PACK.status).toBe('research');
    expect(CAREER_ANNUAL_READING_PACK.claimContractMode).toBe('registered_required');
    expect(CAREER_ANNUAL_READING_METHODOLOGY.status).toBe('research');
    expect(CAREER_ANNUAL_READING_METHODOLOGY.family).toBe('time_dynamics');
    expect(CAREER_ANNUAL_ACTIVATION_RULES).toHaveLength(10);
    expect(CAREER_ANNUAL_TENSION_RULES).toHaveLength(4);
    expect(CAREER_NATAL_REUSED_CLAIM_TYPE_DEFINITIONS).toHaveLength(20);
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

  it('emits exactly one personalized Career Annual activation from request-scoped temporal facts', () => {
    const natal = snapshot();
    const facts = temporalFacts(natal, 2026);
    const registry = createCareerAnnualReadingCandidateRegistry();
    const execution = runInterpretation(natal, registry, { temporalFacts: facts, now: NOW });
    const activations = execution.claims.filter(
      (claim) => claim.claimType === CAREER_ANNUAL_THEME_CLAIM_TYPE.claimType,
    );

    if (natal.derivedFacts.dayMaster.status !== 'resolved') {
      throw new Error('fixture requires resolved day master');
    }
    expect(facts.annualStemTenGod).toBe(
      deriveAnnualStemTenGod(natal.derivedFacts.dayMaster.value, facts.annualPillar.stem),
    );
    expect(activations).toHaveLength(1);
    expect(activations[0]?.taxonomy).toEqual({ tier: 'T9', category: 'career', subcategory: 'annual' });
    expect(activations[0]?.factRefs).toEqual(
      expect.arrayContaining([
        'temporal.targetYear',
        'temporal.annualPillar',
        'temporal.annualStemTenGod',
      ]),
    );
    const activationEvaluation = execution.evaluations.find((evaluation) =>
      evaluation.emittedClaimIds.includes(activations[0]?.claimId ?? ''),
    );
    expect(
      activationEvaluation?.inputRefs
        .filter((ref) => ref.idOrPath.startsWith('temporal.'))
        .every((ref) => ref.sourceType === 'temporal_fact'),
    ).toBe(true);
    expect(execution.integrity.valid).toBe(true);
  });

  it('makes the career/annual profile complete with both Career Natal T8 and Career Annual T9 evidence', () => {
    const natal = snapshot();
    const request = annualRequest(2026);
    const registry = createCareerAnnualReadingCandidateRegistry();
    const execution = runInterpretation(natal, registry, {
      requestId: request.requestId,
      temporalFacts: temporalFacts(natal, 2026),
      now: NOW,
    });
    const composition = buildReadingCompositionEvidence(natal, execution, registry, request, {
      narrativePolicyVersion: 'myeongha-career-annual-narrative-v1',
    });

    expect(composition.selection.coverageState).toBe('complete');
    expect(composition.selection.missingRequirements).toEqual([]);
    expect(composition.selection.profileAuthorization.state).toBe('authorized');
    expect(composition.selection.constraints.mayPromoteResearchAuthority).toBe(false);
    expect(composition.evidence?.bundle.claims.some((claim) => claim.taxonomy.tier === 'T8')).toBe(true);
    expect(
      composition.evidence?.bundle.claims.some(
        (claim) =>
          claim.taxonomy.tier === 'T9' &&
          claim.taxonomy.category === 'career' &&
          claim.taxonomy.subcategory === 'annual',
      ),
    ).toBe(true);
  });

  it('is deterministic for the same target year and changes interpretation identity for another year', () => {
    const natal = snapshot();
    const registry = createCareerAnnualReadingCandidateRegistry();
    const first = runInterpretation(natal, registry, {
      temporalFacts: temporalFacts(natal, 2026),
      now: NOW,
    });
    const repeated = runInterpretation(natal, registry, {
      temporalFacts: temporalFacts(natal, 2026),
      now: NOW,
    });
    const nextYear = runInterpretation(natal, registry, {
      temporalFacts: temporalFacts(natal, 2027),
      now: NOW,
    });

    expect(repeated.run.runHash).toBe(first.run.runHash);
    expect(repeated.claims).toEqual(first.claims);
    expect(nextYear.run.runHash).not.toBe(first.run.runHash);
    expect(
      nextYear.claims.find((claim) => claim.claimType === CAREER_ANNUAL_THEME_CLAIM_TYPE.claimType)?.value,
    ).not.toEqual(
      first.claims.find((claim) => claim.claimType === CAREER_ANNUAL_THEME_CLAIM_TYPE.claimType)?.value,
    );
  });

  it('emits branch-clash evidence only as bounded work-adjustment pressure', () => {
    const natal = withDayBranchClash(snapshot());
    const registry = createCareerAnnualReadingCandidateRegistry();
    const execution = runInterpretation(natal, registry, {
      temporalFacts: temporalFacts(natal, 2026),
      now: NOW,
    });
    const tension = execution.claims.find(
      (claim) =>
        claim.claimType === CAREER_ANNUAL_TENSION_CLAIM_TYPE.claimType &&
        (claim.value as { natalPillar?: string }).natalPillar === 'day',
    );

    expect(tension).toBeDefined();
    expect(tension?.factRefs).toContain('temporal.annualBranchRelations.day');
    expect(tension?.value).toMatchObject({
      relation: 'clash',
      boundedTo: 'work_adjustment_pressure',
      adjustmentAreas: ['role', 'schedule', 'team_collaboration', 'working_method'],
    });
    expect(JSON.stringify(tension?.value)).not.toContain('promotionAuthorized');
  });

  it('does not fabricate hour relation evidence when birth time is unknown', () => {
    const natal = snapshot(false);
    const facts = temporalFacts(natal, 2026);
    const registry = createCareerAnnualReadingCandidateRegistry();
    const execution = runInterpretation(natal, registry, { temporalFacts: facts, now: NOW });

    expect(facts.annualBranchRelations.hour.status).not.toBe('resolved');
    expect(
      execution.claims.some((claim) => claim.claimType === CAREER_ANNUAL_THEME_CLAIM_TYPE.claimType),
    ).toBe(true);
    expect(
      execution.claims.some(
        (claim) =>
          claim.claimType === CAREER_ANNUAL_TENSION_CLAIM_TYPE.claimType &&
          (claim.value as { natalPillar?: string }).natalPillar === 'hour',
      ),
    ).toBe(false);
  });
});
