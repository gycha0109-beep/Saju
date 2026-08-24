import { describe, expect, it } from 'vitest';
import type { CanonicalSajuSnapshot, TenGodChartFact } from '../src/contracts/calculation.js';
import { resolved } from '../src/contracts/common.js';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import { createBusinessNatalReadingCandidateRegistry } from '../src/research/business-natal-reading-candidate.js';

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
    { now: new Date('2026-08-24T08:00:00.000Z') },
  );
  return {
    ...base,
    derivedFacts: { ...base.derivedFacts, tenGods: resolved(FIVE_FAMILY_TEN_GODS) },
  };
}

const SPECIALIST_PREDICATES = new Set([
  'career_conclusion',
  'career_context',
  'wealth_conclusion',
  'relationship_conclusion',
  'business_conclusion',
]);

const CONTEXT_SPECIFIC_EXAMPLES = [
  '코드',
  '디자인',
  '기획안',
  '서비스',
  '고객 반응',
  '매출',
  '작은 제품',
  '프로젝트',
  '요구사항',
  '전문지식',
  '장비',
  '운영비',
  '시제품',
  '판매 페이지',
  '사용 여부',
  '구매 같은',
] as const;

describe('consumer copy neutrality guard', () => {
  it('keeps specialist consumer copy free of author-context-specific examples', () => {
    const execution = runInterpretation(fixture(), createBusinessNatalReadingCandidateRegistry());
    const specialistClaims = execution.claims.filter((claim) =>
      SPECIALIST_PREDICATES.has(claim.predicate),
    );
    const consumerCopy = JSON.stringify(specialistClaims.map((claim) => claim.value));

    for (const example of CONTEXT_SPECIFIC_EXAMPLES) {
      expect(consumerCopy).not.toContain(example);
    }
  });

  it('keeps direct career output visible-stem-specific and branch observations contextual', () => {
    const execution = runInterpretation(fixture(), createBusinessNatalReadingCandidateRegistry());
    const familyClaimIds = new Set(
      execution.claims
        .filter((claim) => claim.predicate === 'ten_god_family_presence')
        .map((claim) => claim.claimId),
    );

    const careerConclusions = execution.claims.filter(
      (claim) => claim.predicate === 'career_conclusion',
    );
    const careerContext = execution.claims.filter((claim) => claim.predicate === 'career_context');

    expect(careerConclusions).toHaveLength(3);
    expect(careerContext).toHaveLength(4);
    expect(
      careerConclusions.every((claim) => {
        const value = claim.value as { tenGod?: string; channel?: string };
        return (
          claim.taxonomy.tier === 'T8' &&
          claim.factRefs.includes('derivedFacts.tenGods') &&
          claim.upstreamClaimRefs.length === 0 &&
          typeof value.tenGod === 'string' &&
          value.channel === 'visible_stems'
        );
      }),
    ).toBe(true);
    expect(
      careerContext.every((claim) => {
        const value = claim.value as { tenGod?: string; channel?: string };
        return (
          claim.taxonomy.tier === 'T8' &&
          claim.factRefs.includes('derivedFacts.tenGods') &&
          claim.upstreamClaimRefs.length === 0 &&
          typeof value.tenGod === 'string' &&
          value.channel === 'branches'
        );
      }),
    ).toBe(true);

    const expectedCounts = new Map([
      ['wealth_conclusion', 9],
      ['relationship_conclusion', 10],
      ['business_conclusion', 10],
    ] as const);

    for (const [predicate, expectedCount] of expectedCounts) {
      const claims = execution.claims.filter((claim) => claim.predicate === predicate);
      expect(claims).toHaveLength(expectedCount);
      expect(claims.every((claim) => claim.taxonomy.tier === 'T8')).toBe(true);
      expect(claims.every((claim) => claim.factRefs.includes('derivedFacts.tenGods'))).toBe(true);
      expect(
        claims.every(
          (claim) =>
            claim.upstreamClaimRefs.length > 0 &&
            claim.upstreamClaimRefs.every((ref) => familyClaimIds.has(ref)),
        ),
      ).toBe(true);
    }
  });
});
