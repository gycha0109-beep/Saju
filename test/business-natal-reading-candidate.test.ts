import { describe, expect, it } from 'vitest';
import type { CanonicalSajuSnapshot, TenGodChartFact } from '../src/contracts/calculation.js';
import { resolved } from '../src/contracts/common.js';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { buildReadingCompositionEvidence } from '../src/reading/reading-intent-composition.js';
import { buildReadingCompositionEvidence as buildGovernedReadingCompositionEvidence } from '../src/reading/reading-profile-authorization.js';
import { inspectMyeonghwaProductionComposition } from '../src/production/production-composition.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import { createRelationshipNatalReadingCandidateRegistry } from '../src/research/relationship-natal-reading-candidate.js';
import {
  BUSINESS_NATAL_READING_CANDIDATE_VERSION,
  BUSINESS_NATAL_READING_METHODOLOGY,
  BUSINESS_NATAL_READING_PACK,
  BUSINESS_NATAL_READING_RULES,
  createBusinessNatalReadingCandidateRegistry,
} from '../src/research/business-natal-reading-candidate.js';

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
    { now: new Date('2026-08-24T07:20:00.000Z') },
  );
  return {
    ...base,
    derivedFacts: { ...base.derivedFacts, tenGods: resolved(tenGods) },
  };
}

function businessClaims(execution: ReturnType<typeof runInterpretation>) {
  return execution.claims.filter((claim) => claim.predicate === 'business_conclusion');
}

describe('natal business consumer reading research candidate', () => {
  it('remains research-only, unreviewed, and bounded by contract', () => {
    expect(BUSINESS_NATAL_READING_CANDIDATE_VERSION).toBe('0.6.0-research');
    expect(BUSINESS_NATAL_READING_PACK.status).toBe('research');
    expect(BUSINESS_NATAL_READING_METHODOLOGY.status).toBe('research');
    expect(BUSINESS_NATAL_READING_RULES).toHaveLength(11);
    expect(
      BUSINESS_NATAL_READING_RULES.every(
        (rule) =>
          rule.status === 'research' &&
          rule.quality.reviewerStatus === 'unreviewed' &&
          rule.taxonomy.tier === 'T8' &&
          rule.taxonomy.category === 'business',
      ),
    ).toBe(true);
  });

  it('emits business-specific operating conclusions from the five-family fixture', () => {
    const execution = runInterpretation(fixture(), createBusinessNatalReadingCandidateRegistry());
    const claims = businessClaims(execution);

    expect(claims).toHaveLength(11);
    expect(
      new Set(claims.map((claim) => (claim.value as { businessKind: string }).businessKind)),
    ).toEqual(
      new Set([
        'uncertainty',
        'decision_execution',
        'allocation',
        'partnership',
        'accountability',
        'pressure',
        'friction',
      ]),
    );
    expect(claims.every((claim) => claim.taxonomy.category === 'business')).toBe(true);
  });

  it('keeps business reading useful with only one represented family', () => {
    const snapshot = fixture(RESOURCE_ONLY_TEN_GODS);
    const registry = createBusinessNatalReadingCandidateRegistry();
    const execution = runInterpretation(snapshot, registry);
    const claims = businessClaims(execution);

    expect(claims).toHaveLength(1);
    expect(claims[0]?.claimType).toBe(
      'BUSINESS_NATAL_CONCLUSION_RESOURCE_UNCERTAINTY_BEFORE_COMMIT',
    );

    const reading = buildGovernedReadingCompositionEvidence(
      snapshot,
      execution,
      registry,
      { requestId: 'business-single-family', intent: { domain: 'business', temporalScope: 'natal' } },
      { narrativePolicyVersion: 'business-natal-reading-v1' },
    );
    expect(reading.selection.profileAuthorization.state).toBe('authorized');
    expect(reading.selection.coverageState).toBe('complete');
    const bundled =
      reading.evidence?.bundle.claims.filter((claim) => claim.predicate === 'business_conclusion') ?? [];
    expect(bundled).toHaveLength(1);
    expect(
      reading.evidence?.bundle.claims.some((claim) => claim.predicate === 'ten_god_family_presence'),
    ).toBe(true);
  });

  it('completes business/natal coverage without selecting another T8 domain', () => {
    const snapshot = fixture();
    const registry = createBusinessNatalReadingCandidateRegistry();
    const execution = runInterpretation(snapshot, registry);
    const reading = buildGovernedReadingCompositionEvidence(
      snapshot,
      execution,
      registry,
      { requestId: 'business-natal-complete', intent: { domain: 'business', temporalScope: 'natal' } },
      { narrativePolicyVersion: 'business-natal-reading-v1' },
    );

    expect(reading.selection.coverageState).toBe('complete');
    const targets = new Set(reading.selection.targetClaimIds);
    const selectedT8 = execution.claims.filter(
      (claim) => targets.has(claim.claimId) && claim.taxonomy.tier === 'T8',
    );
    expect(selectedT8).toHaveLength(11);
    expect(selectedT8.every((claim) => claim.taxonomy.category === 'business')).toBe(true);
  });

  it('does not fall back to general or career claims when business evidence is missing', () => {
    const snapshot = fixture();
    const registry = createRelationshipNatalReadingCandidateRegistry();
    const execution = runInterpretation(snapshot, registry);
    const reading = buildGovernedReadingCompositionEvidence(
      snapshot,
      execution,
      registry,
      { requestId: 'business-missing', intent: { domain: 'business', temporalScope: 'natal' } },
      { narrativePolicyVersion: 'business-natal-reading-v1' },
    );

    expect(reading.selection.coverageState).toBe('insufficient_evidence');
    expect(reading.selection.targetClaimIds).toEqual([]);
    expect(reading.selection.selectedClaimIds).toEqual([]);
    expect(reading.selection.missingRequirements).toContain('NATAL_BUSINESS_DOMAIN_CLAIM_REQUIRED');
    expect(reading.evidence).toBeUndefined();
  });

  it('keeps annual business partial until separate T9 period evidence exists', () => {
    const snapshot = fixture();
    const registry = createBusinessNatalReadingCandidateRegistry();
    const execution = runInterpretation(snapshot, registry);
    const annual = buildReadingCompositionEvidence(
      snapshot,
      execution,
      registry,
      { requestId: 'business-annual-stays-closed', intent: { domain: 'business', temporalScope: 'annual' } },
      { narrativePolicyVersion: 'business-natal-reading-v1' },
    );

    expect(annual.selection.coverageState).toBe('partial_coverage');
    expect(annual.selection.missingRequirements).toContain('ANNUAL_BUSINESS_PERIOD_CLAIM_REQUIRED');
    const targets = new Set(annual.selection.targetClaimIds);
    expect(
      execution.claims
        .filter((claim) => targets.has(claim.claimId))
        .every((claim) => claim.taxonomy.tier === 'T8' && claim.taxonomy.category === 'business'),
    ).toBe(true);
  });

  it('binds every business conclusion only to already-materialized family claims', () => {
    const execution = runInterpretation(fixture(), createBusinessNatalReadingCandidateRegistry());
    const familyIds = new Set(
      execution.claims
        .filter((claim) => claim.predicate === 'ten_god_family_presence')
        .map((claim) => claim.claimId),
    );

    for (const claim of businessClaims(execution)) {
      expect(claim.upstreamClaimRefs.length).toBeGreaterThanOrEqual(1);
      expect(claim.upstreamClaimRefs.every((ref) => familyIds.has(ref))).toBe(true);
    }
  });

  it('does not recycle career semantics as business evidence', () => {
    const claims = businessClaims(
      runInterpretation(fixture(), createBusinessNatalReadingCandidateRegistry()),
    );
    const encoded = JSON.stringify(claims);

    expect(encoded).not.toContain('careerKind');
    expect(encoded).not.toContain('specificOccupationAuthorized');
    expect(claims.every((claim) => claim.claimType.startsWith('BUSINESS_NATAL_CONCLUSION_'))).toBe(true);
  });

  it('does not emit entrepreneur suitability, success, revenue, funding, failure, future, advice, or score authority', () => {
    const claims = businessClaims(
      runInterpretation(fixture(), createBusinessNatalReadingCandidateRegistry()),
    );
    const encoded = JSON.stringify(claims);

    for (const forbidden of [
      'founder_score',
      'entrepreneur_score',
      'business_success_probability',
      'revenue_prediction',
      'profit_prediction',
      'funding_prediction',
      'bankruptcy_prediction',
      'business_event_prediction',
      'business_luck_score',
    ]) {
      expect(encoded).not.toContain(forbidden);
    }

    expect(
      claims.every((claim) => {
        const value = claim.value as {
          entrepreneurSuitabilityAuthorized?: boolean;
          specificIndustryAuthorized?: boolean;
          businessSuccessAuthorized?: boolean;
          revenueOutcomeAuthorized?: boolean;
          fundingOutcomeAuthorized?: boolean;
          failureOutcomeAuthorized?: boolean;
          futureTimingAuthorized?: boolean;
          financialAdviceAuthorized?: boolean;
          numericScoringAuthorized?: boolean;
        };
        return (
          value.entrepreneurSuitabilityAuthorized === false &&
          value.specificIndustryAuthorized === false &&
          value.businessSuccessAuthorized === false &&
          value.revenueOutcomeAuthorized === false &&
          value.fundingOutcomeAuthorized === false &&
          value.failureOutcomeAuthorized === false &&
          value.futureTimingAuthorized === false &&
          value.financialAdviceAuthorized === false &&
          value.numericScoringAuthorized === false
        );
      }),
    ).toBe(true);
  });

  it('keeps existing domain target selections isolated after adding business claims', () => {
    const snapshot = fixture();
    const registry = createBusinessNatalReadingCandidateRegistry();
    const execution = runInterpretation(snapshot, registry);

    const requests = [
      { requestId: 'general-after-business', intent: { domain: 'general', temporalScope: 'natal' } },
      { requestId: 'career-after-business', intent: { domain: 'career', temporalScope: 'natal' } },
      { requestId: 'wealth-after-business', intent: { domain: 'wealth', temporalScope: 'natal' } },
      {
        requestId: 'relationship-after-business',
        intent: { domain: 'relationship', temporalScope: 'natal', relationshipScope: 'general' },
      },
    ] as const;

    for (const request of requests) {
      const reading = buildReadingCompositionEvidence(snapshot, execution, registry, request, {
        narrativePolicyVersion: 'business-natal-reading-v1',
      });
      expect(reading.selection.coverageState).toBe('complete');
      const targets = new Set(reading.selection.targetClaimIds);
      const targetT8 = execution.claims.filter(
        (claim) => targets.has(claim.claimId) && claim.taxonomy.tier === 'T8',
      );
      expect(targetT8.length).toBeGreaterThan(0);
      expect(targetT8.every((claim) => claim.taxonomy.category === request.intent.domain)).toBe(true);
      expect(targetT8.some((claim) => claim.taxonomy.category === 'business')).toBe(false);
    }
  });

  it('still fails closed at production composition', () => {
    const inspection = inspectMyeonghwaProductionComposition({
      registry: createBusinessNatalReadingCandidateRegistry(),
    });
    expect(inspection.status).toBe('blocked');
    if (inspection.status !== 'blocked') throw new Error('Expected blocked composition.');
    expect(inspection.blockers).toContainEqual(
      expect.objectContaining({ code: 'INTERPRETATION_PACK_NOT_PRODUCTION' }),
    );
  });
});
