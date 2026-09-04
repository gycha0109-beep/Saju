import { describe, expect, it } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import type { CanonicalSajuSnapshot } from '../src/contracts/calculation.js';
import type { ReadingRequest } from '../src/contracts/reading.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import { buildMonthlyInterpretationFacts } from '../src/reading/monthly-interpretation-facts.js';
import { buildReadingCompositionEvidence } from '../src/reading/reading-intent-composition.js';
import { buildTemporalReadingContext } from '../src/reading/temporal-reading-context.js';
import { createBusinessNatalReadingCandidateRegistry } from '../src/research/business-natal-reading-candidate.js';
import {
  BUSINESS_MONTHLY_ACTIVATION_RULES,
  BUSINESS_MONTHLY_READING_CANDIDATE_VERSION,
  BUSINESS_MONTHLY_READING_METHODOLOGY,
  BUSINESS_MONTHLY_TENSION_CLAIM_TYPE,
  BUSINESS_MONTHLY_TENSION_RULES,
  BUSINESS_MONTHLY_THEME_CLAIM_TYPE,
  createBusinessMonthlyReadingCandidateRegistry,
} from '../src/research/business-monthly-reading-candidate.js';

const NOW = new Date('2026-09-05T00:35:00+09:00');

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
    requestId: `business-monthly-${month}`,
    intent: { domain: 'business', temporalScope: 'monthly' },
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
  const registry = createBusinessMonthlyReadingCandidateRegistry(NOW.toISOString());
  const execution = runInterpretation(natal, registry, {
    requestId: readingRequest.requestId,
    temporalFacts: { ...monthlyFacts },
    now: NOW,
  });
  return { readingRequest, monthlyFacts, registry, execution };
}

function activeThemes(execution: ReturnType<typeof runInterpretation>) {
  return execution.claims.filter(
    (claim) => claim.state === 'active' && claim.claimType === BUSINESS_MONTHLY_THEME_CLAIM_TYPE,
  );
}

describe('MyeongHa Business Monthly T9 reading candidate', () => {
  it('reuses the shared-channel-gated Business Natal T8 registry without Annual T9 leakage', () => {
    const natalRegistry = createBusinessNatalReadingCandidateRegistry();
    const registry = createBusinessMonthlyReadingCandidateRegistry();
    const natalBusinessRules = natalRegistry.rules.filter(
      (rule) => rule.taxonomy.tier === 'T8' && rule.taxonomy.category === 'business',
    );

    expect(BUSINESS_MONTHLY_READING_CANDIDATE_VERSION).toBe('0.1.0-research');
    expect(registry.pack.status).toBe('research');
    expect(BUSINESS_MONTHLY_READING_METHODOLOGY.family).toBe('time_dynamics');
    expect(BUSINESS_MONTHLY_ACTIVATION_RULES).toHaveLength(20);
    expect(BUSINESS_MONTHLY_TENSION_RULES).toHaveLength(8);
    expect(natalBusinessRules.length).toBeGreaterThan(0);
    expect(
      natalBusinessRules.every((rule) =>
        registry.rules.some(
          (registered) => registered.ruleId === rule.ruleId && registered.version === rule.version,
        ),
      ),
    ).toBe(true);
    expect(
      registry.rules.some(
        (rule) =>
          rule.taxonomy.tier === 'T9' &&
          rule.taxonomy.category === 'business' &&
          rule.taxonomy.subcategory === 'annual',
      ),
    ).toBe(false);
  });

  it('emits one personalized Business Monthly activation for each before/after jeol segment', () => {
    const result = execute(snapshot(), 9);
    const themes = activeThemes(result.execution);

    expect(themes).toHaveLength(2);
    expect(themes.map((claim) => (claim.value as { segmentId: string }).segmentId).sort()).toEqual([
      'after_jeol',
      'before_jeol',
    ]);
    for (const claim of themes) {
      expect(claim.taxonomy).toEqual({ tier: 'T9', category: 'business', subcategory: 'monthly' });
      expect(claim.value).toMatchObject({
        boundedTo: 'business_operating_tendency',
        businessSuccessPredictionAuthorized: false,
        revenueOutcomePredictionAuthorized: false,
        fundingOutcomePredictionAuthorized: false,
        failureOutcomePredictionAuthorized: false,
        financialAdviceAuthorized: false,
      });
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

  it('makes business/monthly complete only with Business Natal T8 plus Business Monthly T9 evidence', () => {
    const natal = snapshot();
    const result = execute(natal, 9);
    const composition = buildReadingCompositionEvidence(
      natal,
      result.execution,
      result.registry,
      result.readingRequest,
      { narrativePolicyVersion: 'myeongha-business-monthly-narrative-v1' },
    );

    expect(composition.selection.coverageState).toBe('complete');
    expect(composition.selection.missingRequirements).toEqual([]);
    expect(composition.selection.profileRef?.id).toBe('myeonghwa-reading-profile-business-monthly-v1');
    expect(composition.selection.constraints.mayPromoteResearchAuthority).toBe(false);
    expect(
      composition.evidence?.bundle.claims.some(
        (claim) => claim.taxonomy.tier === 'T8' && claim.taxonomy.category === 'business',
      ),
    ).toBe(true);
    expect(
      composition.evidence?.bundle.claims.some(
        (claim) =>
          claim.taxonomy.tier === 'T9' &&
          claim.taxonomy.category === 'business' &&
          claim.taxonomy.subcategory === 'monthly',
      ),
    ).toBe(true);
    expect(
      composition.evidence?.bundle.claims.some(
        (claim) =>
          claim.taxonomy.tier === 'T9' &&
          claim.taxonomy.category === 'business' &&
          claim.taxonomy.subcategory === 'annual',
      ),
    ).toBe(false);
  });

  it('is deterministic for the same month and changes Business Monthly semantics across adjacent months', () => {
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

  it('emits resolved clashes only as bounded business-operating adjustment pressure', () => {
    let found = false;
    for (let day = 1; day <= 12; day += 1) {
      const result = execute(snapshot(day), 9);
      const tensions = result.execution.claims.filter(
        (claim) => claim.state === 'active' && claim.claimType === BUSINESS_MONTHLY_TENSION_CLAIM_TYPE,
      );
      for (const claim of tensions) {
        const value = claim.value as { segmentId: string; natalPillar: string };
        expect(claim.taxonomy).toEqual({ tier: 'T9', category: 'business', subcategory: 'monthly' });
        expect(claim.value).toMatchObject({
          relation: 'clash',
          boundedTo: 'business_operating_adjustment_pressure',
          adjustmentAreas: [
            'decision_rights',
            'resource_allocation',
            'partner_team_coordination',
            'operating_cadence',
          ],
          businessSuccessPredictionAuthorized: false,
          financialAdviceAuthorized: false,
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
          claim.claimType === BUSINESS_MONTHLY_TENSION_CLAIM_TYPE &&
          (claim.value as { natalPillar?: string }).natalPillar === 'hour',
      ),
    ).toBe(false);
    for (const segment of result.monthlyFacts.segments) {
      expect(segment.monthlyBranchRelations.hour.status).not.toBe('resolved');
    }
  });
});
