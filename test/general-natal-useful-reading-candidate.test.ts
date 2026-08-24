import { describe, expect, it } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { buildReadingCompositionEvidence } from '../src/reading/reading-intent-composition.js';
import { inspectMyeonghwaProductionComposition } from '../src/production/production-composition.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import {
  GENERAL_NATAL_TEN_GOD_THEME_METHODOLOGY,
  GENERAL_NATAL_USEFUL_READING_CANDIDATE_VERSION,
  GENERAL_NATAL_USEFUL_READING_PACK,
  GENERAL_NATAL_USEFUL_READING_SOURCE,
  GENERAL_NATAL_USEFUL_SYNTHESIS_METHODOLOGY,
  GENERAL_NATAL_USEFUL_T8_RULES,
  GENERAL_NATAL_USEFUL_TEN_GOD_RULES,
  createGeneralNatalUsefulReadingCandidateRegistry,
} from '../src/research/general-natal-useful-reading-candidate.js';

function userFixture() {
  return calculateCanonicalSajuSnapshot(
    {
      calendarType: 'solar',
      date: { year: 1996, month: 1, day: 9 },
      time: { known: true, hour: 9, minute: 10 },
      sexForTraditionalCalculation: 'male',
    },
    PRODUCTION_DEFAULT_CALCULATION_POLICY,
    { now: new Date('2026-08-24T04:00:00.000Z') },
  );
}

function pillarText(snapshot: ReturnType<typeof userFixture>, slot: 'year' | 'month' | 'day' | 'hour') {
  const pillar = snapshot.pillars[slot];
  if (pillar.status !== 'resolved') throw new Error(`Expected resolved ${slot} pillar.`);
  return `${pillar.value.stem.value}${pillar.value.branch.value}`;
}

describe('general natal minimum useful reading research candidate', () => {
  it('is research-only, source-addressable, non-scoring, and unreviewed', () => {
    expect(GENERAL_NATAL_USEFUL_READING_CANDIDATE_VERSION).toBe('0.1.0-research');
    expect(GENERAL_NATAL_USEFUL_READING_PACK.status).toBe('research');
    expect(GENERAL_NATAL_TEN_GOD_THEME_METHODOLOGY.status).toBe('research');
    expect(GENERAL_NATAL_USEFUL_SYNTHESIS_METHODOLOGY.status).toBe('research');
    expect(GENERAL_NATAL_USEFUL_READING_SOURCE.provenanceTier).toBe('cross_reference');
    expect(GENERAL_NATAL_USEFUL_READING_SOURCE.rights?.reusePolicy).toBe('paraphrase_only');
    expect(GENERAL_NATAL_USEFUL_TEN_GOD_RULES).toHaveLength(10);
    expect(GENERAL_NATAL_USEFUL_T8_RULES).toHaveLength(16);
    expect(
      [...GENERAL_NATAL_USEFUL_TEN_GOD_RULES, ...GENERAL_NATAL_USEFUL_T8_RULES].every(
        (rule) =>
          rule.status === 'research' &&
          rule.quality.reviewerStatus === 'unreviewed' &&
          rule.quality.testCoverage === 'fixture_matrix',
      ),
    ).toBe(true);
  });

  it('calculates the user fixture consistently before interpreting it', () => {
    const snapshot = userFixture();
    expect([
      pillarText(snapshot, 'year'),
      pillarText(snapshot, 'month'),
      pillarText(snapshot, 'day'),
      pillarText(snapshot, 'hour'),
    ]).toEqual(['을해', '기축', '을사', '신사']);
    expect(snapshot.derivedFacts.dayMaster).toEqual(
      expect.objectContaining({
        status: 'resolved',
        value: expect.objectContaining({ value: '을', element: '목' }),
      }),
    );
  });

  it('turns the user fixture into multiple consumer theme axes instead of one month-branch fact', () => {
    const snapshot = userFixture();
    const registry = createGeneralNatalUsefulReadingCandidateRegistry();
    const execution = runInterpretation(snapshot, registry, {
      now: new Date('2026-08-24T04:00:00.000Z'),
    });

    const t5 = execution.claims.filter((claim) => claim.taxonomy.tier === 'T5');
    const t8 = execution.claims.filter((claim) => claim.taxonomy.tier === 'T8');

    expect(t5.map((claim) => claim.claimType).sort()).toEqual(
      [
        'TEN_GOD_OFFICER_VISIBLE_STEMS_THEME',
        'TEN_GOD_OUTPUT_BRANCHES_THEME',
        'TEN_GOD_PEER_VISIBLE_STEMS_THEME',
        'TEN_GOD_RESOURCE_BRANCHES_THEME',
        'TEN_GOD_WEALTH_BRANCHES_THEME',
        'TEN_GOD_WEALTH_VISIBLE_STEMS_THEME',
      ].sort(),
    );

    expect(t8.map((claim) => claim.claimType).sort()).toEqual(
      [
        'GENERAL_NATAL_DAY_MASTER_BASELINE',
        'GENERAL_NATAL_OFFICER_VISIBLE_STEMS_THEME',
        'GENERAL_NATAL_OUTPUT_BRANCHES_THEME',
        'GENERAL_NATAL_PEER_VISIBLE_STEMS_THEME',
        'GENERAL_NATAL_RESOURCE_BRANCHES_THEME',
        'GENERAL_NATAL_USEFUL_READING_SCOPE-GUARD',
        'GENERAL_NATAL_WEALTH_BRANCHES_THEME',
        'GENERAL_NATAL_WEALTH_VISIBLE_STEMS_THEME',
      ].sort(),
    );

    expect(t8.every((claim) => claim.polarity === 'neutral')).toBe(true);
    expect(
      new Set(
        t8
          .filter((claim) => claim.claimType !== 'GENERAL_NATAL_USEFUL_READING_SCOPE-GUARD')
          .map((claim) => (claim.value as { consumerSection?: string }).consumerSection),
      ),
    ).toEqual(
      new Set([
        'self_baseline',
        'relationships_and_agency',
        'learning_and_support',
        'expression_and_workstyle',
        'resources_and_results',
        'responsibility_and_pressure',
      ]),
    );
  });

  it('keeps T8 consumer themes bound to upstream T5 claims', () => {
    const snapshot = userFixture();
    const registry = createGeneralNatalUsefulReadingCandidateRegistry();
    const execution = runInterpretation(snapshot, registry, {
      now: new Date('2026-08-24T04:00:00.000Z'),
    });

    const thematicT8 = execution.claims.filter(
      (claim) => claim.taxonomy.tier === 'T8' && claim.predicate === 'consumer_theme',
    );
    expect(thematicT8).toHaveLength(6);
    expect(thematicT8.every((claim) => claim.upstreamClaimRefs.length === 1)).toBe(true);
    for (const claim of thematicT8) {
      const upstream = execution.claims.find((candidate) => candidate.claimId === claim.upstreamClaimRefs[0]);
      expect(upstream?.taxonomy.tier).toBe('T5');
      expect(upstream?.factRefs).toContain('derivedFacts.tenGods');
    }
  });

  it('makes general natal evidence complete while career-specific intent still fails closed', () => {
    const snapshot = userFixture();
    const registry = createGeneralNatalUsefulReadingCandidateRegistry();
    const execution = runInterpretation(snapshot, registry, {
      now: new Date('2026-08-24T04:00:00.000Z'),
    });

    const general = buildReadingCompositionEvidence(
      snapshot,
      execution,
      registry,
      {
        requestId: 'general-natal-useful-user-fixture',
        intent: { domain: 'general', temporalScope: 'natal' },
      },
      { narrativePolicyVersion: 'general-natal-useful-v1' },
    );
    expect(general.selection.coverageState).toBe('complete');
    expect(general.selection.targetClaimIds).toHaveLength(8);
    expect(general.evidence?.bundle.claims.some((claim) => claim.taxonomy.tier === 'T5')).toBe(true);

    const career = buildReadingCompositionEvidence(
      snapshot,
      execution,
      registry,
      {
        requestId: 'career-natal-still-unsupported',
        intent: { domain: 'career', temporalScope: 'natal' },
      },
      { narrativePolicyVersion: 'general-natal-useful-v1' },
    );
    expect(career.selection.coverageState).toBe('insufficient_evidence');
    expect(career.selection.targetClaimIds).toEqual([]);
  });

  it('contains no deterministic success, wealth-level, spouse, health, future, or numeric claim', () => {
    const snapshot = userFixture();
    const execution = runInterpretation(snapshot, createGeneralNatalUsefulReadingCandidateRegistry());
    const encoded = JSON.stringify(execution.claims);

    for (const forbidden of [
      'success_probability',
      'wealth_score',
      'wealth_level":"high',
      'spouse_prediction',
      'health_prediction',
      'death_prediction',
      'future_event',
      'lucky_score',
    ]) {
      expect(encoded).not.toContain(forbidden);
    }
    const guard = execution.claims.find(
      (claim) => claim.claimType === 'GENERAL_NATAL_USEFUL_READING_SCOPE-GUARD',
    );
    expect(guard?.value).toEqual(
      expect.objectContaining({
        fortunePolarityAuthorized: false,
        careerSuccessAuthorized: false,
        wealthLevelAuthorized: false,
        spouseOutcomeAuthorized: false,
        healthOutcomeAuthorized: false,
        futureTimingAuthorized: false,
        numericScoringAuthorized: false,
      }),
    );
  });

  it('remains blocked from production composition', () => {
    const registry = createGeneralNatalUsefulReadingCandidateRegistry();
    const inspection = inspectMyeonghwaProductionComposition({ registry });
    expect(inspection.status).toBe('blocked');
    if (inspection.status !== 'blocked') throw new Error('Expected blocked composition.');
    expect(inspection.blockers).toContainEqual(
      expect.objectContaining({
        code: 'INTERPRETATION_PACK_NOT_PRODUCTION',
        component: 'interpretation',
      }),
    );
  });
});
