import { describe, expect, it } from 'vitest';
import type { CanonicalSajuSnapshot, PillarFact } from '../src/contracts/calculation.js';
import { resolved } from '../src/contracts/common.js';
import type { ReadingRequest } from '../src/contracts/reading.js';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import {
  buildAnnualInterpretationFacts,
  buildPrecedingAnnualInterpretationFacts,
  deriveAnnualStemTenGod,
} from '../src/reading/annual-interpretation-facts.js';
import { buildReadingCompositionEvidence } from '../src/reading/reading-intent-composition.js';
import { buildTemporalReadingContext } from '../src/reading/temporal-reading-context.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import {
  GENERAL_ANNUAL_ACTIVATION_RULES,
  GENERAL_ANNUAL_READING_CANDIDATE_VERSION,
  GENERAL_ANNUAL_READING_PACK,
  GENERAL_ANNUAL_READING_METHODOLOGY,
  GENERAL_ANNUAL_TENSION_RULES,
  GENERAL_ANNUAL_THEME_CLAIM_TYPE,
  GENERAL_ANNUAL_TENSION_CLAIM_TYPE,
  GENERAL_ANNUAL_COMBINATION_RULES,
  GENERAL_ANNUAL_COMBINATION_CLAIM_TYPE,
  GENERAL_ANNUAL_SIX_COMBINATION_SOURCE,
  createGeneralAnnualReadingCandidateRegistry,
  createGeneralAnnualCivilYearCandidateRegistry,
} from '../src/research/general-annual-reading-candidate.js';

const NOW = new Date('2026-09-03T13:00:00.000Z');

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
    requestId: `annual-${year}`,
    intent: { domain: 'general', temporalScope: 'annual' },
    targetPeriod: {
      scope: 'annual',
      year,
      timeZone: 'Asia/Seoul',
      referenceDateTime: NOW.toISOString(),
      resolution: 'relative_current',
    },
  };
}

function temporalFacts(value: CanonicalSajuSnapshot, year: number) {
  const context = buildTemporalReadingContext(annualRequest(year));
  if (context === undefined) throw new Error('annual request must produce temporal context');
  return { ...buildAnnualInterpretationFacts(value, context) };
}

function withDayBranchClash(value: CanonicalSajuSnapshot): CanonicalSajuSnapshot {
  if (value.pillars.day.status !== 'resolved') throw new Error('fixture requires resolved day pillar');
  const day: PillarFact = {
    ...value.pillars.day.value,
    branch: { value: '자', hanja: '子', element: '수', yinYang: '양' },
  };
  return {
    ...value,
    pillars: { ...value.pillars, day: resolved(day) },
  };
}

describe('MyeongHa general annual T9 reading candidate', () => {
  it('derives request-scoped personalized annual facts without mutating the natal snapshot', () => {
    const natal = snapshot();
    const originalDayMaster = natal.derivedFacts.dayMaster;
    const facts = temporalFacts(natal, 2026);

    expect(facts).toMatchObject({
      schemaVersion: 'myeongha-annual-interpretation-facts-v1',
      policyId: 'myeongha-annual-interpretation-policy-v1',
      scope: 'annual',
      targetYear: 2026,
      annualPillar: { stem: '병', branch: '오', cycleIndex: 42 },
    });
    if (natal.derivedFacts.dayMaster.status !== 'resolved') {
      throw new Error('fixture requires resolved day master');
    }
    expect(facts.annualStemTenGod).toBe(
      deriveAnnualStemTenGod(natal.derivedFacts.dayMaster.value, '병'),
    );
    expect(Object.keys(facts.annualBranchRelations).sort()).toEqual(['day', 'hour', 'month', 'year']);
    expect(natal.derivedFacts.dayMaster).toEqual(originalDayMaster);
  });

  it('uses registered period claim contracts and emits exactly one annual activation theme', () => {
    const registry = createGeneralAnnualReadingCandidateRegistry();
    const natal = snapshot();
    const facts = temporalFacts(natal, 2026);
    const execution = runInterpretation(natal, registry, { temporalFacts: facts, now: NOW });
    const activations = execution.claims.filter(
      (claim) => claim.claimType === GENERAL_ANNUAL_THEME_CLAIM_TYPE.claimType,
    );

    expect(GENERAL_ANNUAL_READING_CANDIDATE_VERSION).toBe('0.1.0-research');
    expect(GENERAL_ANNUAL_READING_PACK.status).toBe('research');
    expect(GENERAL_ANNUAL_READING_PACK.claimContractMode).toBe('registered_required');
    expect(GENERAL_ANNUAL_READING_METHODOLOGY.family).toBe('time_dynamics');
    expect(GENERAL_ANNUAL_ACTIVATION_RULES).toHaveLength(10);
    expect(GENERAL_ANNUAL_TENSION_RULES).toHaveLength(4);
    expect(GENERAL_ANNUAL_COMBINATION_RULES).toHaveLength(4);
    expect(registry.claimTypeDefinitions.map((definition) => definition.claimType).sort()).toEqual(
      [GENERAL_ANNUAL_THEME_CLAIM_TYPE.claimType, GENERAL_ANNUAL_TENSION_CLAIM_TYPE.claimType,
        GENERAL_ANNUAL_COMBINATION_CLAIM_TYPE.claimType].sort(),
    );
    expect(activations).toHaveLength(1);
    expect(activations[0]?.taxonomy).toEqual({ tier: 'T9', category: 'general', subcategory: 'annual' });
    expect(activations[0]?.factRefs).toEqual(
      expect.arrayContaining([
        'temporal.targetYear',
        'temporal.annualPillar',
        'temporal.annualStemTenGod',
      ]),
    );
    expect(execution.integrity.valid).toBe(true);
  });

  it('makes the existing general annual reading profile complete with real T9 period evidence', () => {
    const registry = createGeneralAnnualReadingCandidateRegistry();
    const natal = snapshot();
    const request = annualRequest(2026);
    const execution = runInterpretation(natal, registry, {
      temporalFacts: temporalFacts(natal, 2026),
      now: NOW,
    });
    const composition = buildReadingCompositionEvidence(
      natal,
      execution,
      registry,
      request);

    expect(composition.selection.coverageState).toBe('complete');
    expect(composition.selection.missingRequirements).toEqual([]);
    expect(composition.selection.targetClaimIds.length).toBeGreaterThan(0);
    expect(
      composition.evidence?.bundle.claims.every(
        (claim) => claim.taxonomy.tier === 'T9' && claim.taxonomy.subcategory === 'annual',
      ),
    ).toBe(true);
  });

  it('selects both researched civil-year claims and preserves their distinct fact paths', () => {
    const natal = calculateCanonicalSajuSnapshot({
      calendarType: 'solar',
      date: { year: 1967, month: 8, day: 22 },
      time: { known: true, hour: 10, minute: 28 },
      sexForTraditionalCalculation: 'male',
    }, PRODUCTION_DEFAULT_CALCULATION_POLICY, { now: NOW });
    const current = temporalFacts(natal, 2026);
    const preceding = buildPrecedingAnnualInterpretationFacts(natal, current);
    const registry = createGeneralAnnualCivilYearCandidateRegistry(NOW.toISOString());
    const execution = runInterpretation(natal, registry, {
      temporalFacts: { ...current, segmentsById: { before_ipchun: preceding } },
      now: NOW,
    });
    expect(execution.integrity).toEqual({ valid: true, errors: [] });
    const composition = buildReadingCompositionEvidence(natal, execution, registry, annualRequest(2026));
    const primary = composition.evidence?.bundle.claims.filter(
      claim => claim.claimType === GENERAL_ANNUAL_THEME_CLAIM_TYPE.claimType,
    );
    expect(primary).toHaveLength(2);
    expect(primary).toEqual(expect.arrayContaining([
      expect.objectContaining({ subject: 'annual_period', value: expect.objectContaining({ tenGod: current.annualStemTenGod }),
        factRefs: expect.arrayContaining(['temporal.annualStemTenGod']) }),
      expect.objectContaining({ subject: 'annual_period_before_ipchun', value: expect.objectContaining({ tenGod: preceding.annualStemTenGod }),
        factRefs: expect.arrayContaining(['temporal.segmentsById.before_ipchun.annualStemTenGod']) }),
    ]));
    expect(new Set(primary?.map(claim => claim.claimId)).size).toBe(2);
    const expectedCombinations = [
      { facts: current, subject: 'annual_period', prefix: 'temporal.' },
      { facts: preceding, subject: 'annual_period_before_ipchun', prefix: 'temporal.segmentsById.before_ipchun.' },
    ].flatMap(({ facts, subject, prefix }) => Object.entries(facts.annualBranchRelations)
      .filter(([, relation]) => relation.status === 'resolved' && relation.value.relation === 'six_combination')
      .map(([slot]) => ({ subject, path: `${prefix}annualBranchRelations.${slot}` })));
    expect(expectedCombinations).toHaveLength(2);
    const actualCombinations = execution.claims
      .filter(claim => claim.state === 'active' && claim.predicate === 'annual_branch_six_combination_context')
      .map(claim => ({ subject: claim.subject, path: claim.factRefs.find(path => path.includes('.annualBranchRelations.')) }));
    expect(actualCombinations).toHaveLength(expectedCombinations.length);
    expect(actualCombinations).toEqual(expect.arrayContaining(expectedCombinations));
    expect(registry.pack.status).toBe('research');
  });

  it('changes deterministic run identity when the target year changes', () => {
    const registry = createGeneralAnnualReadingCandidateRegistry();
    const natal = snapshot();
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
  });

  it('fails closed without annual temporal facts', () => {
    const registry = createGeneralAnnualReadingCandidateRegistry();
    const natal = snapshot();
    const execution = runInterpretation(natal, registry, { now: NOW });
    const composition = buildReadingCompositionEvidence(
      natal,
      execution,
      registry,
      annualRequest(2026));

    expect(execution.claims).toEqual([]);
    expect(execution.run.status).toBe('partial');
    expect(composition.selection.coverageState).toBe('insufficient_evidence');
    expect(composition.selection.missingRequirements).toContain('ANNUAL_PERIOD_CLAIM_REQUIRED');
  });

  it('emits a bounded branch-clash tension claim only for a resolved clash', () => {
    const registry = createGeneralAnnualReadingCandidateRegistry();
    const natal = withDayBranchClash(snapshot());
    const facts = temporalFacts(natal, 2026);
    expect(facts.annualBranchRelations.day).toEqual(
      resolved({ pillar: 'day', natalBranch: '자', annualBranch: '오', relation: 'clash' }),
    );

    const execution = runInterpretation(natal, registry, { temporalFacts: facts, now: NOW });
    const tension = execution.claims.find(
      (claim) =>
        claim.claimType === GENERAL_ANNUAL_TENSION_CLAIM_TYPE.claimType &&
        (claim.value as { natalPillar?: string }).natalPillar === 'day',
    );
    expect(tension?.polarity).toBe('challenging');
    expect(tension?.factRefs).toContain('temporal.annualBranchRelations.day');
    expect(JSON.stringify(tension?.value)).not.toContain('accident_prediction":"true');
  });

  it('emits a distinct source-owned annual 六合 context only for observed opposite branches', () => {
    const natal = snapshot();
    if (natal.pillars.day.status !== 'resolved') throw new Error('resolved birth required');
    const sixCombiningDay: PillarFact = {
      ...natal.pillars.day.value,
      branch: { value: '미', hanja: '未', element: '토', yinYang: '음' },
    };
    const chart: CanonicalSajuSnapshot = {
      ...natal, pillars: { ...natal.pillars, day: resolved(sixCombiningDay) },
    };
    const facts = temporalFacts(chart, 2026);
    expect(facts.annualBranchRelations.day).toEqual(resolved({
      pillar: 'day', natalBranch: '미', annualBranch: '오', relation: 'six_combination',
    }));
    const registry = createGeneralAnnualReadingCandidateRegistry();
    const execution = runInterpretation(chart, registry, { temporalFacts: facts, now: NOW });
    const support = execution.claims.find(claim =>
      claim.claimType === GENERAL_ANNUAL_COMBINATION_CLAIM_TYPE.claimType &&
      (claim.value as { natalPillar?: string }).natalPillar === 'day');
    expect(support).toBeDefined();
    expect(support?.polarity).toBe('neutral');
    expect(support?.factRefs).toContain('temporal.annualBranchRelations.day');
    expect(support?.methodologyRef.id).toBe('M-GENERAL-ANNUAL-T9-SIX-COMBINATION-SOURCE-V1');
    expect(support?.sourceRefs).toContain(GENERAL_ANNUAL_SIX_COMBINATION_SOURCE.sourceId);
    expect(support?.value).toMatchObject({
      relation: 'six_combination', transformationAuthorized: false,
      narrativeRole: 'context',
    });
    expect(execution.claims.some(claim =>
      claim.claimType === GENERAL_ANNUAL_TENSION_CLAIM_TYPE.claimType &&
      (claim.value as { natalPillar?: string }).natalPillar === 'day')).toBe(false);
    expect(execution.integrity.valid).toBe(true);
  });

  it('keeps unknown birth-time relation uncertainty from blocking the annual activation rule set', () => {
    const registry = createGeneralAnnualReadingCandidateRegistry();
    const natal = snapshot(false);
    const facts = temporalFacts(natal, 2026);
    expect(facts.annualBranchRelations.hour.status).not.toBe('resolved');

    const execution = runInterpretation(natal, registry, { temporalFacts: facts, now: NOW });
    expect(
      execution.claims.some((claim) => claim.claimType === GENERAL_ANNUAL_THEME_CLAIM_TYPE.claimType),
    ).toBe(true);
    expect(execution.run.completeness.blockedCoreGroups).not.toContain(
      'general-annual-t9-branch-clash-tension',
    );
  });
});
