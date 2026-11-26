import { describe, expect, it } from 'vitest';
import type { CanonicalSajuSnapshot, TenGod, TenGodChartFact } from '../src/contracts/calculation.js';
import { resolved } from '../src/contracts/common.js';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { inspectMyeonghwaProductionComposition } from '../src/production/production-composition.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import {
  RELATIONSHIP_NATAL_SOCIALITY_T5_METHODOLOGY,
  RELATIONSHIP_NATAL_SOCIALITY_T5_PACK,
  RELATIONSHIP_NATAL_SOCIALITY_T5_RULES,
  RELATIONSHIP_NATAL_SOCIALITY_T5_SOURCE,
  RELATIONSHIP_NATAL_SOCIALITY_T5_VERSION,
  createRelationshipNatalSocialityT5Registry,
} from '../src/research/relationship-natal-sociality-t5-candidate.js';

const TEN_GODS: readonly TenGod[] = [
  '비견', '겁재', '식신', '상관', '정재',
  '편재', '정관', '편관', '정인', '편인',
];

function fixtureFor(tenGod: TenGod, sex: 'male' | 'female' | 'unspecified' = 'unspecified'): CanonicalSajuSnapshot {
  const base = calculateCanonicalSajuSnapshot(
    {
      calendarType: 'solar',
      date: { year: 2024, month: 3, day: 10 },
      time: { known: true, hour: 12, minute: 0 },
      sexForTraditionalCalculation: sex,
    },
    PRODUCTION_DEFAULT_CALCULATION_POLICY,
    { now: new Date('2026-11-26T00:00:00.000Z') },
  );
  const tenGods: TenGodChartFact = {
    year: { stem: resolved(tenGod), branch: resolved(tenGod) },
    month: { stem: resolved('일간'), branch: resolved('정인') },
    day: { stem: resolved('일간'), branch: resolved('정재') },
    hour: { stem: resolved('일간'), branch: resolved('상관') },
  };
  return {
    ...base,
    derivedFacts: {
      ...base.derivedFacts,
      tenGods: resolved(tenGods),
    },
  };
}

function execute(tenGod: TenGod, sex: 'male' | 'female' | 'unspecified' = 'unspecified') {
  const registry = createRelationshipNatalSocialityT5Registry();
  const snapshot = fixtureFor(tenGod, sex);
  return runInterpretation(snapshot, registry, {
    now: new Date('2026-11-26T00:00:00.000Z'),
  });
}

describe('relationship natal sociality T5 research candidate', () => {
  it('is secondary-source, research-only, non-commercial, and T5-only', () => {
    expect(RELATIONSHIP_NATAL_SOCIALITY_T5_VERSION).toBe('0.1.0-research');
    expect(RELATIONSHIP_NATAL_SOCIALITY_T5_SOURCE.provenanceTier).toBe('scholarly_secondary');
    expect(RELATIONSHIP_NATAL_SOCIALITY_T5_SOURCE.rights?.license).toBe('CC BY-NC 3.0');
    expect(RELATIONSHIP_NATAL_SOCIALITY_T5_SOURCE.rights?.reusePolicy).toBe('paraphrase_only');
    expect(RELATIONSHIP_NATAL_SOCIALITY_T5_METHODOLOGY.status).toBe('research');
    expect(RELATIONSHIP_NATAL_SOCIALITY_T5_PACK.status).toBe('research');
    expect(RELATIONSHIP_NATAL_SOCIALITY_T5_PACK.enabledRuleSets).toEqual([
      'relationship-natal-sociality-t5-research',
    ]);
    expect(RELATIONSHIP_NATAL_SOCIALITY_T5_RULES).toHaveLength(20);
    expect(RELATIONSHIP_NATAL_SOCIALITY_T5_RULES.every(
      (rule) => rule.taxonomy.tier === 'T5' && rule.status === 'research',
    )).toBe(true);
  });

  it.each(TEN_GODS)('maps %s to separate visible-stem and branch T5 facets', (tenGod) => {
    const execution = execute(tenGod);
    const claims = execution.claims.filter(
      (claim) => claim.claimType.startsWith('RELATIONSHIP_SOCIALITY_T5_') &&
        (claim.value as { tenGod?: TenGod }).tenGod === tenGod,
    );

    expect(claims).toHaveLength(2);
    expect(claims.every((claim) => claim.taxonomy.tier === 'T5')).toBe(true);
    expect(claims.map((claim) => (claim.value as { channel: string }).channel).sort()).toEqual([
      'branches',
      'visible_stems',
    ]);
    expect(claims.every((claim) => claim.factRefs.includes('derivedFacts.tenGods'))).toBe(true);
    expect(claims.every((claim) => claim.polarity === 'neutral')).toBe(true);
  });

  it('does not use sex, spouse roles, or relationship outcomes to select a facet', () => {
    const male = execute('비견', 'male').claims.filter((claim) =>
      claim.claimType.startsWith('RELATIONSHIP_SOCIALITY_T5_') &&
      (claim.value as { tenGod?: TenGod }).tenGod === '비견',
    );
    const female = execute('비견', 'female').claims.filter((claim) =>
      claim.claimType.startsWith('RELATIONSHIP_SOCIALITY_T5_') &&
      (claim.value as { tenGod?: TenGod }).tenGod === '비견',
    );
    const unspecified = execute('비견', 'unspecified').claims.filter((claim) =>
      claim.claimType.startsWith('RELATIONSHIP_SOCIALITY_T5_') &&
      (claim.value as { tenGod?: TenGod }).tenGod === '비견',
    );

    const values = (claims: typeof male) => claims.map((claim) => claim.value);
    expect(values(male)).toEqual(values(female));
    expect(values(male)).toEqual(values(unspecified));
  });

  it('does not create a T8 relationship conclusion or authorize commercial delivery', () => {
    const execution = execute('식신');
    const socialityClaims = execution.claims.filter((claim) =>
      claim.claimType.startsWith('RELATIONSHIP_SOCIALITY_T5_'),
    );
    expect(socialityClaims.length).toBeGreaterThan(0);
    expect(socialityClaims.every((claim) => claim.taxonomy.tier === 'T5')).toBe(true);
    expect(execution.claims.some((claim) =>
      claim.claimType.startsWith('RELATIONSHIP_SOCIALITY_T8_'),
    )).toBe(false);

    for (const claim of socialityClaims) {
      expect(claim.value).toEqual(expect.objectContaining({
        dominance: 'not_scored',
        actualBehaviourAuthorized: false,
        personalityConclusionAuthorized: false,
        relationshipQualityAuthorized: false,
        relationshipOutcomeAuthorized: false,
        wholeRelationshipConclusionAuthorized: false,
        romanceAuthorized: false,
        spouseAuthorized: false,
        compatibilityAuthorized: false,
        familyRoleAuthorized: false,
        futureTimingAuthorized: false,
        diagnosisAuthorized: false,
        commercialUseAuthorized: false,
      }));
    }
  });

  it('remains blocked from production composition', () => {
    const inspection = inspectMyeonghwaProductionComposition({
      registry: createRelationshipNatalSocialityT5Registry(),
    });
    expect(inspection.status).toBe('blocked');
    if (inspection.status !== 'blocked') throw new Error('Expected blocked composition.');
    expect(inspection.blockers).toContainEqual(expect.objectContaining({
      code: 'INTERPRETATION_PACK_NOT_PRODUCTION',
      component: 'interpretation',
    }));
  });
});
