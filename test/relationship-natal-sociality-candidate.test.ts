import { describe, expect, it } from 'vitest';
import type { TenGod } from '../src/contracts/calculation.js';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import { inspectMyeonghwaProductionComposition } from '../src/production/production-composition.js';
import {
  RELATIONSHIP_NATAL_SOCIALITY_PACK,
  RELATIONSHIP_NATAL_SOCIALITY_RULES,
  RELATIONSHIP_NATAL_SOCIALITY_SOURCE,
  RELATIONSHIP_NATAL_SOCIALITY_T5_RULES,
  RELATIONSHIP_NATAL_SOCIALITY_T8_RULES,
  createRelationshipNatalSocialityRegistry,
} from '../src/research/relationship-natal-sociality-candidate.js';

const registry = createRelationshipNatalSocialityRegistry();
const NOW = new Date('2026-11-26T00:00:00.000Z');

function sample(known = true) {
  return calculateCanonicalSajuSnapshot({
    calendarType: 'solar',
    date: { year: 2024, month: 3, day: 10 },
    time: known
      ? { known: true, hour: 12, minute: 0 } as const
      : { known: false } as const,
    sexForTraditionalCalculation: 'unspecified',
  }, PRODUCTION_DEFAULT_CALCULATION_POLICY, { now: NOW });
}

describe('source-pinned Relationship natal sociality candidate', () => {
  it('keeps the new method separate, secondary-only, and research-only', () => {
    expect(RELATIONSHIP_NATAL_SOCIALITY_PACK.packId)
      .toBe('PACK-RELATIONSHIP-NATAL-KIM-KI-SEUNG-SOCIALITY-RESEARCH');
    expect(RELATIONSHIP_NATAL_SOCIALITY_RULES).toHaveLength(40);
    expect(RELATIONSHIP_NATAL_SOCIALITY_T5_RULES).toHaveLength(20);
    expect(RELATIONSHIP_NATAL_SOCIALITY_T8_RULES).toHaveLength(20);
    expect(RELATIONSHIP_NATAL_SOCIALITY_SOURCE.provenanceTier).toBe('scholarly_secondary');
    expect(RELATIONSHIP_NATAL_SOCIALITY_SOURCE.locator?.page).toBe('29-33');

    for (const rule of RELATIONSHIP_NATAL_SOCIALITY_RULES) {
      expect(rule.status).toBe('research');
      expect(rule.quality.provenanceQuality).toBe('secondary_only');
      expect(rule.quality.methodologyStability).toBe('contested');
      expect(rule.quality.reviewerStatus).toBe('unreviewed');
      expect(rule.sourceRefs).toEqual([
        expect.objectContaining({
          sourceId: RELATIONSHIP_NATAL_SOCIALITY_SOURCE.sourceId,
          supportType: 'interpretive_basis',
        }),
      ]);
    }

    expect(registry.pack.status).toBe('research');
    expect(registry.rules.some(rule =>
      rule.ruleId.startsWith('RULE-RELATIONSHIP_NATAL_MULTIFACTOR_'))).toBe(false);
    expect(inspectMyeonghwaProductionComposition({ registry }).status).toBe('blocked');
  });

  it('emits source-bound sociality facets only from exact Ten-God observations in the same chart', () => {
    const snapshot = sample();
    const execution = runInterpretation(snapshot, registry, { now: NOW });
    const tenGods = snapshot.derivedFacts.tenGods;
    expect(tenGods.status).toBe('resolved');

    const observations = execution.claims.filter(claim =>
      claim.taxonomy.tier === 'T5' &&
      claim.taxonomy.category === 'ten_gods' &&
      claim.predicate === 'relationship_sociality_observation');
    const sociality = execution.claims.filter(claim =>
      claim.taxonomy.tier === 'T8' &&
      claim.taxonomy.category === 'relationship' &&
      claim.predicate === 'relationship_sociality_orientation');

    expect(observations.length).toBeGreaterThan(0);
    expect(sociality).toHaveLength(observations.length);

    for (const claim of observations) {
      const value = claim.value as { tenGod: TenGod; channel: 'visible_stems' | 'branches'; dominance: string };
      const slots = value.channel === 'visible_stems'
        ? ['year', 'month', 'hour'] as const
        : ['year', 'month', 'day', 'hour'] as const;
      const key = value.channel === 'visible_stems' ? 'stem' : 'branch';
      const observed = slots.some(slot => {
        const position = tenGods.value[slot][key];
        return position?.status === 'resolved' && position.value === value.tenGod;
      });

      expect(observed).toBe(true);
      expect(value.dominance).toBe('not_scored');
      expect(claim.snapshotId).toBe(snapshot.snapshotId);
      expect(claim.sourceRefs).toContain(RELATIONSHIP_NATAL_SOCIALITY_SOURCE.sourceId);
    }

    for (const claim of sociality) {
      expect(claim.upstreamClaimRefs).toHaveLength(1);
      const upstream = execution.claims.find(item => item.claimId === claim.upstreamClaimRefs[0]);
      expect(upstream?.predicate).toBe('relationship_sociality_observation');
      expect(upstream?.snapshotId).toBe(snapshot.snapshotId);
      expect(claim.snapshotId).toBe(snapshot.snapshotId);
      expect(claim.sourceRefs).toContain(RELATIONSHIP_NATAL_SOCIALITY_SOURCE.sourceId);

      const value = claim.value as {
        relationshipScope: string;
        dominance: string;
        relationshipOutcomeAuthorized: boolean;
        romanceAuthorized: boolean;
        spouseAuthorized: boolean;
        compatibilityAuthorized: boolean;
        familyRoleAuthorized: boolean;
        futureTimingAuthorized: boolean;
        diagnosisAuthorized: boolean;
        wholeRelationshipConclusionAuthorized: boolean;
      };
      expect(value.relationshipScope).toBe('general_sociality');
      expect(value.dominance).toBe('not_scored');
      expect(value.relationshipOutcomeAuthorized).toBe(false);
      expect(value.romanceAuthorized).toBe(false);
      expect(value.spouseAuthorized).toBe(false);
      expect(value.compatibilityAuthorized).toBe(false);
      expect(value.familyRoleAuthorized).toBe(false);
      expect(value.futureTimingAuthorized).toBe(false);
      expect(value.diagnosisAuthorized).toBe(false);
      expect(value.wholeRelationshipConclusionAuthorized).toBe(false);
    }
  });

  it('does not infer sociality when the canonical Ten-God fact is unavailable', () => {
    const snapshot = sample(false);
    expect(snapshot.derivedFacts.tenGods.status).toBe('unavailable');

    const execution = runInterpretation(snapshot, registry, { now: NOW });
    expect(execution.claims.filter(claim =>
      claim.predicate === 'relationship_sociality_observation' ||
      claim.predicate === 'relationship_sociality_orientation')).toHaveLength(0);
  });
});
