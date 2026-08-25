import { describe, expect, test } from 'vitest';
import {
  calculateCanonicalSajuSnapshot,
  runInterpretation,
  type CalculationPolicySnapshot,
} from '../src/index.js';
import {
  CAREER_PERSONALIZED_T5_FAMILY_RELATION_RULES,
  CAREER_PERSONALIZED_T5_PACK,
  CAREER_PERSONALIZED_T5_RULES,
  CAREER_PERSONALIZED_T5_SUBTYPE_RULES,
  CAREER_T5_FAMILY_RELATION_CLAIM_DEFINITION,
  CAREER_T5_FAMILY_RELATION_CLAIM_TYPE,
  CAREER_T5_FAMILY_RELATION_METHODOLOGY,
  CAREER_T5_SUBTYPE_CLAIM_DEFINITION,
  CAREER_T5_SUBTYPE_CLAIM_TYPE,
  CAREER_T5_SUBTYPE_METHODOLOGY,
  createCareerPersonalizedT5SubstrateRegistry,
} from '../src/research/career-personalized-t5-substrate.js';

const policy: CalculationPolicySnapshot = {
  policyId: 'myeonghwa/career-personalized-t5-test',
  policyVersion: '1.0.0',
  dayBoundary: 'midnight',
  trueSolarTime: {
    enabled: false,
    longitudeSource: 'not-applicable',
    applyEquationOfTime: false,
    applyHistoricalDst: false,
  },
  timeZonePolicy: { source: 'service-default', timeZone: 'Asia/Seoul' },
  unknownBirthTimePolicy: 'preserve-unknown-and-enumerate-boundaries',
};

const LOGICAL_TEN_GOD_PATHS = new Set([
  'derivedFacts.tenGods.year.stem',
  'derivedFacts.tenGods.year.branch',
  'derivedFacts.tenGods.month.stem',
  'derivedFacts.tenGods.month.branch',
  'derivedFacts.tenGods.day.branch',
  'derivedFacts.tenGods.hour.stem',
  'derivedFacts.tenGods.hour.branch',
]);

function knownSnapshot() {
  return calculateCanonicalSajuSnapshot(
    {
      calendarType: 'solar',
      date: { year: 1992, month: 10, day: 24 },
      time: { known: true, hour: 5, minute: 30 },
      sexForTraditionalCalculation: 'unspecified',
    },
    policy,
    { now: new Date('2026-08-25T00:00:00.000Z') },
  );
}

function unknownSnapshot() {
  return calculateCanonicalSajuSnapshot(
    {
      calendarType: 'solar',
      date: { year: 1992, month: 10, day: 24 },
      time: { known: false },
      sexForTraditionalCalculation: 'unspecified',
    },
    policy,
    { now: new Date('2026-08-25T00:00:00.000Z') },
  );
}

function valueRecord(value: unknown): Record<string, unknown> {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error('expected structured claim value');
  }
  return value as Record<string, unknown>;
}

describe('Career personalized T5 substrate', () => {
  test('is a strict research-only non-narrative pack with exactly the P1-authorized T5 scope', () => {
    const registry = createCareerPersonalizedT5SubstrateRegistry('2026-08-25T00:00:00.000Z');

    expect(CAREER_PERSONALIZED_T5_PACK.status).toBe('research');
    expect(CAREER_PERSONALIZED_T5_PACK.claimContractMode).toBe('registered_required');
    expect(CAREER_PERSONALIZED_T5_SUBTYPE_RULES).toHaveLength(70);
    expect(CAREER_PERSONALIZED_T5_FAMILY_RELATION_RULES).toHaveLength(6);
    expect(CAREER_PERSONALIZED_T5_RULES).toHaveLength(76);
    expect(CAREER_T5_SUBTYPE_CLAIM_DEFINITION.materialForNarrative).toBe(false);
    expect(CAREER_T5_FAMILY_RELATION_CLAIM_DEFINITION.materialForNarrative).toBe(false);
    expect(CAREER_T5_SUBTYPE_CLAIM_DEFINITION.allowedTaxonomyTiers).toEqual(['T5']);
    expect(CAREER_T5_FAMILY_RELATION_CLAIM_DEFINITION.allowedTaxonomyTiers).toEqual(['T5']);
    expect(registry.rules.every((rule) => rule.taxonomy.tier === 'T5')).toBe(true);
    expect(registry.rules.every((rule) => rule.status === 'research')).toBe(true);
    expect(registry.rules.every((rule) => rule.quality.reviewerStatus === 'unreviewed')).toBe(true);
    expect(registry.pack.enabledRuleSets).toEqual([
      'career-personalized-t5-ten-god-subtype',
      'career-personalized-t5-family-relation',
    ]);
  });

  test('subtype rules consume exactly one logical Ten-God slot and never the broad object or storage .value path', () => {
    for (const rule of CAREER_PERSONALIZED_T5_SUBTYPE_RULES) {
      expect(rule.inputs).toHaveLength(1);
      const input = rule.inputs[0];
      expect(input?.source).toBe('derived_fact');
      expect(LOGICAL_TEN_GOD_PATHS.has(input?.pathOrClaimType ?? '')).toBe(true);
      expect(input?.pathOrClaimType).not.toBe('derivedFacts.tenGods');
      expect(input?.pathOrClaimType).not.toContain('.value.');
      expect(input?.pathOrClaimType.endsWith('.value')).toBe(false);
    }

    expect(CAREER_T5_SUBTYPE_METHODOLOGY.inputContract?.factInputs).toHaveLength(7);
    expect(
      CAREER_T5_SUBTYPE_METHODOLOGY.inputContract?.factInputs?.every((item) =>
        LOGICAL_TEN_GOD_PATHS.has(item.pathPattern),
      ),
    ).toBe(true);
  });

  test('the same exact subtype has identical semantic value across every preserved slot', () => {
    const grouped = new Map<string, string[]>();
    for (const rule of CAREER_PERSONALIZED_T5_SUBTYPE_RULES) {
      const value = valueRecord(rule.output.value);
      const exactTenGod = String(value.exactTenGod);
      const serialized = JSON.stringify(value);
      const existing = grouped.get(exactTenGod) ?? [];
      existing.push(serialized);
      grouped.set(exactTenGod, existing);

      expect(value).not.toHaveProperty('slot');
      expect(value).not.toHaveProperty('position');
      expect(value).not.toHaveProperty('channel');
      expect(value).not.toHaveProperty('hiddenStem');
      expect(value).not.toHaveProperty('count');
      expect(value).not.toHaveProperty('weight');
      expect(value).not.toHaveProperty('score');
      expect(value).not.toHaveProperty('headline');
      expect(value).not.toHaveProperty('summary');
    }

    expect(grouped.size).toBe(10);
    for (const values of grouped.values()) {
      expect(values).toHaveLength(7);
      expect(new Set(values).size).toBe(1);
    }
  });

  test('a known chart emits one subtype claim per observable slot with one precise factRef each', () => {
    const snapshot = knownSnapshot();
    const registry = createCareerPersonalizedT5SubstrateRegistry('2026-08-25T00:00:00.000Z');
    const result = runInterpretation(snapshot, registry, { now: new Date('2026-08-25T00:00:00.000Z') });
    const subtypeClaims = result.claims.filter((claim) => claim.claimType === CAREER_T5_SUBTYPE_CLAIM_TYPE);

    expect(result.integrity).toEqual({ valid: true, errors: [] });
    expect(subtypeClaims).toHaveLength(7);
    for (const claim of subtypeClaims) {
      expect(claim.taxonomy).toEqual({ tier: 'T5', category: 'career', subcategory: 'ten_god_subtype' });
      expect(claim.factRefs).toHaveLength(1);
      expect(LOGICAL_TEN_GOD_PATHS.has(claim.factRefs[0] ?? '')).toBe(true);
      expect(claim.upstreamClaimRefs).toEqual([]);
      const value = valueRecord(claim.value);
      expect(value.scope).toBe('semantic_substrate_only');
      expect(value).not.toHaveProperty('headline');
      expect(value).not.toHaveProperty('summary');
    }
    expect(new Set(subtypeClaims.flatMap((claim) => claim.factRefs))).toEqual(LOGICAL_TEN_GOD_PATHS);
  });

  test('family relation context consumes only subtype claims and does not reinterpret occurrence count', () => {
    const snapshot = knownSnapshot();
    const registry = createCareerPersonalizedT5SubstrateRegistry('2026-08-25T00:00:00.000Z');
    const result = runInterpretation(snapshot, registry, { now: new Date('2026-08-25T00:00:00.000Z') });
    const subtypeIds = new Set(
      result.claims
        .filter((claim) => claim.claimType === CAREER_T5_SUBTYPE_CLAIM_TYPE)
        .map((claim) => claim.claimId),
    );
    const relationClaims = result.claims.filter(
      (claim) => claim.claimType === CAREER_T5_FAMILY_RELATION_CLAIM_TYPE,
    );

    expect(CAREER_T5_FAMILY_RELATION_METHODOLOGY.requiredFactTypes).toEqual([]);
    expect(CAREER_T5_FAMILY_RELATION_METHODOLOGY.inputContract?.claimInputs).toEqual([
      expect.objectContaining({ claimType: CAREER_T5_SUBTYPE_CLAIM_TYPE, mode: 'allowed' }),
    ]);

    for (const claim of relationClaims) {
      expect(claim.factRefs).toEqual([]);
      expect(claim.upstreamClaimRefs.length).toBeGreaterThanOrEqual(2);
      expect(claim.upstreamClaimRefs.every((claimId) => subtypeIds.has(claimId))).toBe(true);
      const value = valueRecord(claim.value);
      expect(value.scope).toBe('structural_context_only');
      expect(value).not.toHaveProperty('count');
      expect(value).not.toHaveProperty('weight');
      expect(value).not.toHaveProperty('priority');
      expect(value).not.toHaveProperty('headline');
      expect(value).not.toHaveProperty('summary');
    }
  });

  test('relation rules require both selected families and cannot use general or legacy Career claims', () => {
    for (const rule of CAREER_PERSONALIZED_T5_FAMILY_RELATION_RULES) {
      expect(rule.inputs).toHaveLength(2);
      for (const input of rule.inputs) {
        expect(input.source).toBe('interpretation_claim');
        expect(input.pathOrClaimType).toBe(CAREER_T5_SUBTYPE_CLAIM_TYPE);
        expect(input.cardinality).toBe('one_or_more');
        expect(input.claimSelector?.taxonomy).toEqual({
          tiers: ['T5'],
          categories: ['career'],
          subcategories: ['ten_god_subtype'],
        });
        expect(input.claimSelector?.predicates).toEqual(['career_t5_subtype_semantic']);
        expect(input.claimSelector?.methodologyRefs).toEqual([
          {
            id: CAREER_T5_SUBTYPE_METHODOLOGY.methodologyId,
            version: CAREER_T5_SUBTYPE_METHODOLOGY.version,
          },
        ]);
      }
    }
  });

  test('unknown-time Ten-God evidence fails closed instead of being reconstructed from pillar scenarios', () => {
    const snapshot = unknownSnapshot();
    const registry = createCareerPersonalizedT5SubstrateRegistry('2026-08-25T00:00:00.000Z');
    const result = runInterpretation(snapshot, registry, { now: new Date('2026-08-25T00:00:00.000Z') });

    expect(snapshot.derivedFacts.tenGods.status).toBe('unavailable');
    expect(result.claims.filter((claim) => claim.claimType === CAREER_T5_SUBTYPE_CLAIM_TYPE)).toEqual([]);
    expect(
      result.claims.filter((claim) => claim.claimType === CAREER_T5_FAMILY_RELATION_CLAIM_TYPE),
    ).toEqual([]);
    expect(
      result.evaluations
        .filter((evaluation) => evaluation.ruleRef.id.includes('CAREER-PERSONALIZED-T5'))
        .some((evaluation) => evaluation.status === 'skipped_missing_input'),
    ).toBe(true);
  });

  test('forbidden Career outcomes and consumer prose are absent from every T5 semantic value', () => {
    const forbiddenKeys = [
      'occupation',
      'salary',
      'promotion',
      'success',
      'futureTiming',
      'numericScore',
      'headline',
      'summary',
      'consumerSection',
    ];

    for (const rule of CAREER_PERSONALIZED_T5_RULES) {
      const value = valueRecord(rule.output.value);
      for (const key of forbiddenKeys) expect(value).not.toHaveProperty(key);
      expect(JSON.stringify(value)).not.toMatch(/developer|software|startup|product|sales page|customer/i);
    }
  });
});
