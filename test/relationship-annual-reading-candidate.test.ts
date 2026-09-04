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
import { RELATIONSHIP_NATAL_READING_RULES } from '../src/research/relationship-natal-reading-candidate.js';
import {
  RELATIONSHIP_ANNUAL_ACTIVATION_RULES,
  RELATIONSHIP_ANNUAL_READING_CANDIDATE_VERSION,
  RELATIONSHIP_ANNUAL_READING_METHODOLOGY,
  RELATIONSHIP_ANNUAL_READING_PACK,
  RELATIONSHIP_ANNUAL_TENSION_CLAIM_TYPE,
  RELATIONSHIP_ANNUAL_TENSION_RULES,
  RELATIONSHIP_ANNUAL_THEME_CLAIM_TYPE,
  createRelationshipAnnualReadingCandidateRegistry,
} from '../src/research/relationship-annual-reading-candidate.js';

const NOW = new Date('2026-09-04T04:00:00.000Z');

function snapshot(timeKnown = true): CanonicalSajuSnapshot {
  return calculateCanonicalSajuSnapshot(
    {
      calendarType: 'solar',
      date: { year: 1996, month: 1, day: 9 },
      time: timeKnown ? { known: true, hour: 9, minute: 30 } : { known: false },
      sexForTraditionalCalculation: 'unspecified',
    },
    PRODUCTION_DEFAULT_CALCULATION_POLICY,
    { now: NOW },
  );
}

function annualRequest(year: number): ReadingRequest {
  return {
    requestId: `relationship-annual-${year}`,
    intent: { domain: 'relationship', temporalScope: 'annual', relationshipScope: 'general' },
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
  if (context === undefined) throw new Error('relationship annual request must produce temporal context');
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

describe('MyeongHa Relationship Annual T9 reading candidate', () => {
  it('reuses Relationship Natal T8 and remains research-only', () => {
    const registry = createRelationshipAnnualReadingCandidateRegistry();

    expect(RELATIONSHIP_ANNUAL_READING_CANDIDATE_VERSION).toBe('0.1.0-research');
    expect(RELATIONSHIP_ANNUAL_READING_PACK.status).toBe('research');
    expect(RELATIONSHIP_ANNUAL_READING_METHODOLOGY.status).toBe('research');
    expect(RELATIONSHIP_ANNUAL_READING_METHODOLOGY.family).toBe('time_dynamics');
    expect(RELATIONSHIP_ANNUAL_ACTIVATION_RULES).toHaveLength(10);
    expect(RELATIONSHIP_ANNUAL_TENSION_RULES).toHaveLength(4);
    expect(
      RELATIONSHIP_NATAL_READING_RULES.every((rule) =>
        registry.rules.some(
          (registered) => registered.ruleId === rule.ruleId && registered.version === rule.version,
        ),
      ),
    ).toBe(true);
    expect(
      registry.rules.some(
        (rule) =>
          rule.taxonomy.tier === 'T9' &&
          rule.taxonomy.category === 'general' &&
          rule.taxonomy.subcategory === 'annual',
      ),
    ).toBe(false);
  });

  it('emits exactly one personalized Relationship Annual activation from temporal facts', () => {
    const natal = snapshot();
    const facts = temporalFacts(natal, 2026);
    const registry = createRelationshipAnnualReadingCandidateRegistry();
    const execution = runInterpretation(natal, registry, { temporalFacts: facts, now: NOW });
    const activations = execution.claims.filter(
      (claim) => claim.claimType === RELATIONSHIP_ANNUAL_THEME_CLAIM_TYPE,
    );

    if (natal.derivedFacts.dayMaster.status !== 'resolved') throw new Error('fixture requires day master');
    expect(facts.annualStemTenGod).toBe(
      deriveAnnualStemTenGod(natal.derivedFacts.dayMaster.value, facts.annualPillar.stem),
    );
    expect(activations).toHaveLength(1);
    expect(activations[0]?.taxonomy).toEqual({
      tier: 'T9',
      category: 'relationship',
      subcategory: 'annual',
    });
    expect(activations[0]?.factRefs).toEqual(
      expect.arrayContaining(['temporal.targetYear', 'temporal.annualPillar', 'temporal.annualStemTenGod']),
    );
    const evaluation = execution.evaluations.find((candidate) =>
      candidate.emittedClaimIds.includes(activations[0]?.claimId ?? ''),
    );
    expect(
      evaluation?.inputRefs
        .filter((ref) => ref.idOrPath.startsWith('temporal.'))
        .every((ref) => ref.sourceType === 'temporal_fact'),
    ).toBe(true);
  });

  it('makes relationship/general annual complete with T8 plus T9 evidence', () => {
    const natal = snapshot();
    const request = annualRequest(2026);
    const registry = createRelationshipAnnualReadingCandidateRegistry();
    const execution = runInterpretation(natal, registry, {
      requestId: request.requestId,
      temporalFacts: temporalFacts(natal, 2026),
      now: NOW,
    });
    const composition = buildReadingCompositionEvidence(natal, execution, registry, request, {
      narrativePolicyVersion: 'myeongha-relationship-annual-narrative-v1',
    });

    expect(composition.selection.coverageState).toBe('complete');
    expect(composition.selection.missingRequirements).toEqual([]);
    expect(composition.selection.profileRef?.id).toBe(
      'myeonghwa-reading-profile-relationship-general-annual-v1',
    );
    expect(composition.selection.constraints.mayPromoteResearchAuthority).toBe(false);
    expect(
      composition.evidence?.bundle.claims.some(
        (claim) =>
          claim.taxonomy.tier === 'T8' &&
          claim.taxonomy.category === 'relationship' &&
          claim.taxonomy.subcategory === 'general',
      ),
    ).toBe(true);
    expect(
      composition.evidence?.bundle.claims.some(
        (claim) =>
          claim.taxonomy.tier === 'T9' &&
          claim.taxonomy.category === 'relationship' &&
          claim.taxonomy.subcategory === 'annual',
      ),
    ).toBe(true);
  });

  it('is deterministic for the same target year and changes annual semantics for another year', () => {
    const natal = snapshot();
    const registry = createRelationshipAnnualReadingCandidateRegistry();
    const first = runInterpretation(natal, registry, { temporalFacts: temporalFacts(natal, 2026), now: NOW });
    const repeated = runInterpretation(natal, registry, { temporalFacts: temporalFacts(natal, 2026), now: NOW });
    const nextYear = runInterpretation(natal, registry, { temporalFacts: temporalFacts(natal, 2027), now: NOW });

    expect(repeated.run.runHash).toBe(first.run.runHash);
    expect(repeated.claims).toEqual(first.claims);
    expect(nextYear.run.runHash).not.toBe(first.run.runHash);
    expect(
      nextYear.claims.find((claim) => claim.claimType === RELATIONSHIP_ANNUAL_THEME_CLAIM_TYPE)?.value,
    ).not.toEqual(
      first.claims.find((claim) => claim.claimType === RELATIONSHIP_ANNUAL_THEME_CLAIM_TYPE)?.value,
    );
  });

  it('bounds branch clash to relationship interaction adjustment pressure', () => {
    const natal = withDayBranchClash(snapshot());
    const execution = runInterpretation(natal, createRelationshipAnnualReadingCandidateRegistry(), {
      temporalFacts: temporalFacts(natal, 2026),
      now: NOW,
    });
    const tension = execution.claims.find(
      (claim) =>
        claim.claimType === RELATIONSHIP_ANNUAL_TENSION_CLAIM_TYPE &&
        (claim.value as { natalPillar?: string }).natalPillar === 'day',
    );

    expect(tension).toBeDefined();
    expect(tension?.factRefs).toContain('temporal.annualBranchRelations.day');
    expect(tension?.value).toMatchObject({
      relation: 'clash',
      boundedTo: 'relationship_interaction_adjustment_pressure',
      adjustmentAreas: ['communication', 'expectations', 'boundaries', 'relational_pace'],
      specificPersonPredictionAuthorized: false,
      relationshipOutcomePredictionAuthorized: false,
    });
  });

  it('does not fabricate hour relation evidence when birth time is unknown', () => {
    const natal = snapshot(false);
    const facts = temporalFacts(natal, 2026);
    const execution = runInterpretation(natal, createRelationshipAnnualReadingCandidateRegistry(), {
      temporalFacts: facts,
      now: NOW,
    });

    expect(facts.annualBranchRelations.hour.status).not.toBe('resolved');
    expect(
      execution.claims.some((claim) => claim.claimType === RELATIONSHIP_ANNUAL_THEME_CLAIM_TYPE),
    ).toBe(true);
    expect(
      execution.claims.some(
        (claim) =>
          claim.claimType === RELATIONSHIP_ANNUAL_TENSION_CLAIM_TYPE &&
          (claim.value as { natalPillar?: string }).natalPillar === 'hour',
      ),
    ).toBe(false);
  });
});
