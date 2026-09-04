import { describe, expect, it } from 'vitest';
import type { CanonicalSajuSnapshot, TenGodChartFact } from '../src/contracts/calculation.js';
import { resolved } from '../src/contracts/common.js';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { buildReadingCompositionEvidence } from '../src/reading/reading-intent-composition.js';
import { buildReadingCompositionEvidence as buildGovernedReadingCompositionEvidence } from '../src/reading/reading-profile-authorization.js';
import { inspectMyeonghwaProductionComposition } from '../src/production/production-composition.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import { createWealthNatalReadingCandidateRegistry } from '../src/research/wealth-natal-reading-candidate.js';
import {
  RELATIONSHIP_NATAL_READING_CANDIDATE_VERSION,
  RELATIONSHIP_NATAL_READING_METHODOLOGY,
  RELATIONSHIP_NATAL_READING_PACK,
  RELATIONSHIP_NATAL_READING_RULES,
  createRelationshipNatalReadingCandidateRegistry,
} from '../src/research/relationship-natal-reading-candidate.js';

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
    { now: new Date('2026-08-24T07:00:00.000Z') },
  );
  return {
    ...base,
    derivedFacts: { ...base.derivedFacts, tenGods: resolved(tenGods) },
  };
}

function relationshipClaims(execution: ReturnType<typeof runInterpretation>) {
  return execution.claims.filter((claim) => claim.predicate === 'relationship_conclusion');
}

describe('natal general-relationship consumer reading research candidate', () => {
  it('remains research-only, unreviewed, and bounded by contract', () => {
    expect(RELATIONSHIP_NATAL_READING_CANDIDATE_VERSION).toBe('0.5.0-research');
    expect(RELATIONSHIP_NATAL_READING_PACK.status).toBe('research');
    expect(RELATIONSHIP_NATAL_READING_METHODOLOGY.status).toBe('research');
    expect(RELATIONSHIP_NATAL_READING_RULES).toHaveLength(11);
    expect(
      RELATIONSHIP_NATAL_READING_RULES.every(
        (rule) =>
          rule.status === 'research' &&
          rule.quality.reviewerStatus === 'unreviewed' &&
          rule.taxonomy.tier === 'T8' &&
          rule.taxonomy.category === 'relationship' &&
          rule.taxonomy.subcategory === 'general',
      ),
    ).toBe(true);
  });

  it('emits useful general-relationship conclusions from the five-family fixture', () => {
    const execution = runInterpretation(fixture(), createRelationshipNatalReadingCandidateRegistry());
    const claims = relationshipClaims(execution);

    expect(claims).toHaveLength(11);
    expect(
      new Set(claims.map((claim) => (claim.value as { relationshipKind: string }).relationshipKind)),
    ).toEqual(new Set(['closeness', 'values', 'expression', 'boundary', 'friction']));
    expect(
      claims.every(
        (claim) =>
          claim.taxonomy.category === 'relationship' && claim.taxonomy.subcategory === 'general',
      ),
    ).toBe(true);
  });

  it('keeps the reading useful with only one represented family', () => {
    const snapshot = fixture(RESOURCE_ONLY_TEN_GODS);
    const registry = createRelationshipNatalReadingCandidateRegistry();
    const execution = runInterpretation(snapshot, registry);
    const claims = relationshipClaims(execution);

    expect(claims).toHaveLength(1);
    expect(claims[0]?.claimType).toBe(
      'RELATIONSHIP_NATAL_CONCLUSION_RESOURCE_UNDERSTAND_BEFORE_CLOSE',
    );

    const reading = buildGovernedReadingCompositionEvidence(
      snapshot,
      execution,
      registry,
      {
        requestId: 'relationship-single-family',
        intent: {
          domain: 'relationship',
          temporalScope: 'natal',
          relationshipScope: 'general',
        },
      },
      { narrativePolicyVersion: 'relationship-natal-reading-v1' },
    );
    expect(reading.selection.profileAuthorization.state).toBe('authorized');
    expect(reading.selection.coverageState).toBe('complete');
    const bundled =
      reading.evidence?.bundle.claims.filter(
        (claim) => claim.predicate === 'relationship_conclusion',
      ) ?? [];
    expect(bundled).toHaveLength(1);
    expect(
      reading.evidence?.bundle.claims.some((claim) => claim.predicate === 'ten_god_family_presence'),
    ).toBe(true);
  });

  it('completes relationship/general profile coverage without selecting other T8 domains', () => {
    const snapshot = fixture();
    const registry = createRelationshipNatalReadingCandidateRegistry();
    const execution = runInterpretation(snapshot, registry);
    const reading = buildGovernedReadingCompositionEvidence(
      snapshot,
      execution,
      registry,
      {
        requestId: 'relationship-general-complete',
        intent: {
          domain: 'relationship',
          temporalScope: 'natal',
          relationshipScope: 'general',
        },
      },
      { narrativePolicyVersion: 'relationship-natal-reading-v1' },
    );

    expect(reading.selection.coverageState).toBe('complete');
    const targets = new Set(reading.selection.targetClaimIds);
    const selectedT8 = execution.claims.filter(
      (claim) => targets.has(claim.claimId) && claim.taxonomy.tier === 'T8',
    );
    expect(selectedT8).toHaveLength(11);
    expect(
      selectedT8.every(
        (claim) =>
          claim.taxonomy.category === 'relationship' && claim.taxonomy.subcategory === 'general',
      ),
    ).toBe(true);
    expect(
      selectedT8.some((claim) => ['general', 'career', 'wealth'].includes(claim.taxonomy.category)),
    ).toBe(false);
  });

  it('does not fall back to general claims when relationship evidence is missing', () => {
    const snapshot = fixture();
    const registry = createWealthNatalReadingCandidateRegistry();
    const execution = runInterpretation(snapshot, registry);
    const reading = buildGovernedReadingCompositionEvidence(
      snapshot,
      execution,
      registry,
      {
        requestId: 'relationship-missing',
        intent: {
          domain: 'relationship',
          temporalScope: 'natal',
          relationshipScope: 'general',
        },
      },
      { narrativePolicyVersion: 'relationship-natal-reading-v1' },
    );

    expect(reading.selection.coverageState).toBe('insufficient_evidence');
    expect(reading.selection.targetClaimIds).toEqual([]);
    expect(reading.selection.selectedClaimIds).toEqual([]);
    expect(reading.selection.missingRequirements).toContain(
      'RELATIONSHIP_GENERAL_DOMAIN_CLAIM_REQUIRED',
    );
    expect(reading.evidence).toBeUndefined();
  });

  it('does not recycle general relationship claims into spouse-specific evidence', () => {
    const snapshot = fixture();
    const registry = createRelationshipNatalReadingCandidateRegistry();
    const execution = runInterpretation(snapshot, registry);
    const spouse = buildGovernedReadingCompositionEvidence(
      snapshot,
      execution,
      registry,
      {
        requestId: 'spouse-stays-closed',
        intent: {
          domain: 'relationship',
          temporalScope: 'natal',
          relationshipScope: 'spouse',
        },
      },
      { narrativePolicyVersion: 'relationship-natal-reading-v1' },
    );

    expect(spouse.selection.coverageState).toBe('insufficient_evidence');
    expect(spouse.selection.targetClaimIds).toEqual([]);
    expect(spouse.selection.missingRequirements).toContain(
      'RELATIONSHIP_SPOUSE_DOMAIN_CLAIM_REQUIRED',
    );
    expect(spouse.evidence).toBeUndefined();
  });

  it('keeps spouse annual reading unsupported without a spouse-specific temporal contract', () => {
    const snapshot = fixture();
    const registry = createRelationshipNatalReadingCandidateRegistry();
    const execution = runInterpretation(snapshot, registry);
    const annual = buildReadingCompositionEvidence(
      snapshot,
      execution,
      registry,
      {
        requestId: 'relationship-spouse-annual-unsupported',
        intent: {
          domain: 'relationship',
          temporalScope: 'annual',
          relationshipScope: 'spouse',
        },
      },
      { narrativePolicyVersion: 'relationship-natal-reading-v1' },
    );

    expect(annual.selection.coverageState).toBe('unsupported_intent');
    expect(annual.selection.targetClaimIds).toEqual([]);
    expect(annual.evidence).toBeUndefined();
  });

  it('binds every relationship conclusion only to already-materialized family claims', () => {
    const execution = runInterpretation(fixture(), createRelationshipNatalReadingCandidateRegistry());
    const familyIds = new Set(
      execution.claims
        .filter((claim) => claim.predicate === 'ten_god_family_presence')
        .map((claim) => claim.claimId),
    );

    for (const claim of relationshipClaims(execution)) {
      expect(claim.upstreamClaimRefs.length).toBeGreaterThanOrEqual(1);
      expect(claim.upstreamClaimRefs.every((ref) => familyIds.has(ref))).toBe(true);
    }
  });

  it('does not emit partner, marriage, breakup, infidelity, future, compatibility, or score authority', () => {
    const claims = relationshipClaims(
      runInterpretation(fixture(), createRelationshipNatalReadingCandidateRegistry()),
    );
    const encoded = JSON.stringify(claims);

    for (const forbidden of [
      'partner_appearance_prediction',
      'partner_job_prediction',
      'marriage_prediction',
      'divorce_prediction',
      'breakup_prediction',
      'infidelity_prediction',
      'relationship_event_prediction',
      'compatibility_score',
      'relationship_score',
    ]) {
      expect(encoded).not.toContain(forbidden);
    }

    expect(
      claims.every((claim) => {
        const value = claim.value as {
          specificPartnerAuthorized?: boolean;
          partnerAttributePredictionAuthorized?: boolean;
          marriageOutcomeAuthorized?: boolean;
          breakupOutcomeAuthorized?: boolean;
          infidelityInferenceAuthorized?: boolean;
          futureTimingAuthorized?: boolean;
          compatibilityAuthorized?: boolean;
          numericScoringAuthorized?: boolean;
        };
        return (
          value.specificPartnerAuthorized === false &&
          value.partnerAttributePredictionAuthorized === false &&
          value.marriageOutcomeAuthorized === false &&
          value.breakupOutcomeAuthorized === false &&
          value.infidelityInferenceAuthorized === false &&
          value.futureTimingAuthorized === false &&
          value.compatibilityAuthorized === false &&
          value.numericScoringAuthorized === false
        );
      }),
    ).toBe(true);
  });

  it('keeps general, career, and wealth target selections isolated after adding relationship claims', () => {
    const snapshot = fixture();
    const registry = createRelationshipNatalReadingCandidateRegistry();
    const execution = runInterpretation(snapshot, registry);

    for (const domain of ['general', 'career', 'wealth'] as const) {
      const reading = buildReadingCompositionEvidence(
        snapshot,
        execution,
        registry,
        { requestId: `${domain}-after-relationship`, intent: { domain, temporalScope: 'natal' } },
        { narrativePolicyVersion: 'relationship-natal-reading-v1' },
      );
      expect(reading.selection.coverageState).toBe('complete');
      const targets = new Set(reading.selection.targetClaimIds);
      const targetT8 = execution.claims.filter(
        (claim) => targets.has(claim.claimId) && claim.taxonomy.tier === 'T8',
      );
      expect(targetT8.length).toBeGreaterThan(0);
      expect(targetT8.every((claim) => claim.taxonomy.category === domain)).toBe(true);
      expect(targetT8.some((claim) => claim.taxonomy.category === 'relationship')).toBe(false);
    }
  });

  it('still fails closed at production composition', () => {
    const inspection = inspectMyeonghwaProductionComposition({
      registry: createRelationshipNatalReadingCandidateRegistry(),
    });
    expect(inspection.status).toBe('blocked');
    if (inspection.status !== 'blocked') throw new Error('Expected blocked composition.');
    expect(inspection.blockers).toContainEqual(
      expect.objectContaining({ code: 'INTERPRETATION_PACK_NOT_PRODUCTION' }),
    );
  });
});