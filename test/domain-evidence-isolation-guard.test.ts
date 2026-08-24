import { describe, expect, it } from 'vitest';
import type { CanonicalSajuSnapshot, TenGodChartFact } from '../src/contracts/calculation.js';
import { resolved } from '../src/contracts/common.js';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { buildReadingCompositionEvidence } from '../src/reading/reading-intent-composition.js';
import {
  buildReadingCompositionEvidence as buildGovernedReadingCompositionEvidence,
  resolveReadingProfileSelectionAuthorization,
} from '../src/reading/reading-profile-authorization.js';
import { resolveDomainReadingProfile } from '../src/reading/reading-intent-composition.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import { createWealthNatalReadingCandidateRegistry } from '../src/research/wealth-natal-reading-candidate.js';

const FIVE_FAMILY_TEN_GODS: TenGodChartFact = {
  year: { stem: resolved('비견'), branch: resolved('정인') },
  month: { stem: resolved('편재'), branch: resolved('정재') },
  day: { stem: resolved('일간'), branch: resolved('상관') },
  hour: { stem: resolved('편관'), branch: resolved('식신') },
};

function fixture(): CanonicalSajuSnapshot {
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
    derivedFacts: { ...base.derivedFacts, tenGods: resolved(FIVE_FAMILY_TEN_GODS) },
  };
}

function claimsByIds(
  execution: ReturnType<typeof runInterpretation>,
  ids: readonly string[],
) {
  const selected = new Set(ids);
  return execution.claims.filter((claim) => selected.has(claim.claimId));
}

describe('consumer domain evidence isolation guard', () => {
  it('keeps the general natal profile authorized after narrowing it to category=general', () => {
    const resolvedProfile = resolveDomainReadingProfile({
      domain: 'general',
      temporalScope: 'natal',
    });
    expect(resolvedProfile).toBeDefined();
    if (resolvedProfile === undefined) throw new Error('general natal profile must resolve');

    expect(
      resolvedProfile.profile.requiredClaimSelectors[0]?.anyOf[0]?.taxonomy?.categories,
    ).toEqual(['general']);
    expect(resolveReadingProfileSelectionAuthorization(resolvedProfile.profileRef).state).toBe(
      'authorized',
    );
  });

  it('does not select career or wealth T8 claims for general natal from a cumulative registry', () => {
    const snapshot = fixture();
    const registry = createWealthNatalReadingCandidateRegistry();
    const execution = runInterpretation(snapshot, registry);

    const general = buildReadingCompositionEvidence(
      snapshot,
      execution,
      registry,
      { requestId: 'general-isolation', intent: { domain: 'general', temporalScope: 'natal' } },
      { narrativePolicyVersion: 'domain-isolation-v1' },
    );

    expect(general.selection.coverageState).toBe('complete');
    const targets = claimsByIds(execution, general.selection.targetClaimIds);
    expect(targets.length).toBeGreaterThan(0);
    expect(targets.every((claim) => claim.taxonomy.tier === 'T8')).toBe(true);
    expect(targets.every((claim) => claim.taxonomy.category === 'general')).toBe(true);

    const bundledT8 =
      general.evidence?.bundle.claims.filter((claim) => claim.taxonomy.tier === 'T8') ?? [];
    expect(bundledT8.length).toBeGreaterThan(0);
    expect(bundledT8.every((claim) => claim.taxonomy.category === 'general')).toBe(true);
    expect(bundledT8.some((claim) => claim.taxonomy.category === 'career')).toBe(false);
    expect(bundledT8.some((claim) => claim.taxonomy.category === 'wealth')).toBe(false);
  });

  it('keeps career and wealth target selections isolated from each other', () => {
    const snapshot = fixture();
    const registry = createWealthNatalReadingCandidateRegistry();
    const execution = runInterpretation(snapshot, registry);

    for (const domain of ['career', 'wealth'] as const) {
      const result = buildReadingCompositionEvidence(
        snapshot,
        execution,
        registry,
        { requestId: `${domain}-isolation`, intent: { domain, temporalScope: 'natal' } },
        { narrativePolicyVersion: 'domain-isolation-v1' },
      );
      expect(result.selection.coverageState).toBe('complete');
      const targets = claimsByIds(execution, result.selection.targetClaimIds);
      expect(targets.length).toBeGreaterThan(0);
      expect(targets.every((claim) => claim.taxonomy.category === domain)).toBe(true);
      const wrongDomain = domain === 'career' ? 'wealth' : 'career';
      expect(targets.some((claim) => claim.taxonomy.category === wrongDomain)).toBe(false);
    }
  });

  it('does not fall back to general claims when relationship evidence is missing', () => {
    const snapshot = fixture();
    const registry = createWealthNatalReadingCandidateRegistry();
    const execution = runInterpretation(snapshot, registry);

    const relationship = buildGovernedReadingCompositionEvidence(
      snapshot,
      execution,
      registry,
      {
        requestId: 'relationship-missing-no-general-fallback',
        intent: { domain: 'relationship', temporalScope: 'natal', relationshipScope: 'general' },
      },
      { narrativePolicyVersion: 'domain-isolation-v1' },
    );

    expect(relationship.selection.coverageState).toBe('insufficient_evidence');
    expect(relationship.selection.targetClaimIds).toEqual([]);
    expect(relationship.selection.selectedClaimIds).toEqual([]);
    expect(relationship.selection.missingRequirements).toContain(
      'RELATIONSHIP_GENERAL_DOMAIN_CLAIM_REQUIRED',
    );
    expect(relationship.evidence).toBeUndefined();
  });
});
