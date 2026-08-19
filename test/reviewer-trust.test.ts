import { describe, expect, test } from 'vitest';
import {
  buildInterpretationExecutionPlan,
  calculateCanonicalSajuSnapshot,
  createRuleRegistrySnapshot,
  deterministicContentHash,
  normalizeReviewerTrustContext,
  reviewerIsTrustedForLevel,
  reviewerTrustPolicyRef,
  reviewerTrustsAttestation,
  runInterpretation,
  type CalculationPolicySnapshot,
  type InterpretationPack,
  type MethodologyDefinition,
  type ReviewAttestation,
  type ReviewerTrustContext,
  type RuleDefinition,
  type SourceReference,
} from '../src/index.js';

const sources: readonly SourceReference[] = [
  {
    sourceId: 'SOURCE-I17-A',
    sourceType: 'paper',
    title: 'Synthetic source A',
    provenanceTier: 'scholarly_secondary',
  },
  {
    sourceId: 'SOURCE-I17-B',
    sourceType: 'paper',
    title: 'Synthetic source B',
    provenanceTier: 'scholarly_secondary',
  },
];

function methodology(): MethodologyDefinition {
  return {
    methodologyId: 'METHOD-I17',
    version: '1.0.0',
    family: 'structural_balance',
    name: 'Synthetic trusted methodology',
    description: 'Test-only.',
    assumptions: [],
    requiredFactTypes: ['pillars.day'],
    sourceIds: sources.map((source) => source.sourceId),
    status: 'active',
  };
}

function rule(): RuleDefinition {
  return {
    ruleId: 'RULE-I17',
    version: '1.0.0',
    ruleSetId: 'i17',
    taxonomy: { tier: 'T1', category: 'synthetic_trust' },
    methodologyRef: { id: 'METHOD-I17', version: '1.0.0' },
    title: 'Synthetic trusted rule',
    description: 'Test-only.',
    inputs: [
      {
        key: 'day',
        source: 'canonical_fact',
        pathOrClaimType: 'pillars.day',
        acceptedStatuses: ['resolved'],
        required: true,
        ambiguityBehavior: 'requires_resolved',
      },
    ],
    condition: { op: 'exists', value: { kind: 'input', key: 'day' } },
    output: { claimType: 'CLAIM-I17', subject: 'synthetic', predicate: 'trusted', value: true },
    sourceRefs: sources.map((source) => ({
      sourceId: source.sourceId,
      supportType: 'implementation_reference' as const,
    })),
    quality: {
      provenanceQuality: 'multi_source_supported',
      testCoverage: 'fixture_matrix',
      methodologyStability: 'stable_within_method',
      reviewerStatus: 'domain_reviewed',
    },
    status: 'active',
  };
}

function productionPack(): InterpretationPack {
  return {
    packId: 'PACK-I17-PRODUCTION',
    version: '1.0.0',
    name: 'Synthetic production trust pack',
    methodologyRefs: [{ id: 'METHOD-I17', version: '1.0.0' }],
    enabledRuleSets: ['i17'],
    conflictPolicy: 'preserve_all',
    ambiguityPolicy: 'propagate',
    compositionPolicyRef: { id: 'COMPOSITION-I17', version: '1.0.0' },
    status: 'production',
  };
}

function reviewsFor(
  method: MethodologyDefinition,
  candidateRule: RuleDefinition,
): readonly ReviewAttestation[] {
  return [
    {
      attestationId: 'ATTEST-I17-METHOD',
      subjectType: 'methodology',
      subjectRef: {
        id: method.methodologyId,
        version: method.version,
        contentHash: deterministicContentHash(method),
      },
      reviewLevel: 'domain',
      reviewerId: 'domain-a',
      reviewedAt: '2026-08-19T00:00:00.000Z',
      decision: 'approved',
    },
    {
      attestationId: 'ATTEST-I17-RULE',
      subjectType: 'rule',
      subjectRef: {
        id: candidateRule.ruleId,
        version: candidateRule.version,
        contentHash: deterministicContentHash(candidateRule),
      },
      reviewLevel: 'domain',
      reviewerId: 'domain-a',
      reviewedAt: '2026-08-19T00:00:00.000Z',
      decision: 'approved',
    },
  ];
}

function trustFor(reviews: readonly ReviewAttestation[]): ReviewerTrustContext {
  return {
    policyId: 'TRUST-I17',
    version: '2.0.0',
    grants: [
      {
        reviewerId: 'domain-a',
        allowedReviewLevels: ['domain'],
        trustedAttestationContentHashes: reviews.map(deterministicContentHash),
        status: 'active',
      },
    ],
  };
}

function fixture() {
  const method = methodology();
  const candidateRule = rule();
  const reviews = reviewsFor(method, candidateRule);
  const registry = createRuleRegistrySnapshot(
    {
      rules: [candidateRule],
      methodologies: [method],
      sources,
      reviewAttestations: reviews,
    },
    productionPack(),
  );
  return { method, candidateRule, reviews, registry, trust: trustFor(reviews) };
}

const calculationPolicy: CalculationPolicySnapshot = {
  policyId: 'myeonghwa/i17-test',
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

function snapshot() {
  return calculateCanonicalSajuSnapshot(
    {
      calendarType: 'solar',
      date: { year: 1992, month: 10, day: 24 },
      time: { known: true, hour: 5, minute: 30 },
      sexForTraditionalCalculation: 'unspecified',
    },
    calculationPolicy,
  );
}

describe('I17 reviewer trust-root', () => {
  test('trust identity is deterministic across grant, level, and attestation-hash order', () => {
    const { reviews, trust } = fixture();
    const reordered: ReviewerTrustContext = {
      policyId: trust.policyId,
      version: trust.version,
      grants: [
        {
          reviewerId: 'domain-a',
          allowedReviewLevels: ['domain', 'domain'],
          trustedAttestationContentHashes: [
            deterministicContentHash(reviews[1]),
            deterministicContentHash(reviews[0]),
            deterministicContentHash(reviews[0]),
          ],
          status: 'active',
        },
      ],
    };
    expect(reviewerTrustPolicyRef(reordered)).toEqual(reviewerTrustPolicyRef(trust));
  });

  test('normalization deep-freezes levels and attestation hash pins', () => {
    const { trust } = fixture();
    const normalized = normalizeReviewerTrustContext(trust);
    const first = normalized.grants[0];
    if (first === undefined) throw new Error('fixture requires grants');
    expect(Object.isFrozen(normalized)).toBe(true);
    expect(Object.isFrozen(normalized.grants)).toBe(true);
    expect(Object.isFrozen(first)).toBe(true);
    expect(Object.isFrozen(first.allowedReviewLevels)).toBe(true);
    expect(Object.isFrozen(first.trustedAttestationContentHashes)).toBe(true);
  });

  test('trusted identity/level alone cannot authorize an unpinned attestation', () => {
    const { reviews, trust } = fixture();
    const approved = reviews[0];
    if (approved === undefined) throw new Error('fixture requires review');
    const forged: ReviewAttestation = {
      ...approved,
      attestationId: 'ATTEST-I17-FORGED',
      reviewedAt: '2026-08-19T00:00:01.000Z',
    };
    expect(reviewerIsTrustedForLevel(trust, 'domain-a', 'domain')).toBe(true);
    expect(reviewerTrustsAttestation(trust, approved)).toBe(true);
    expect(reviewerTrustsAttestation(trust, forged)).toBe(false);
  });

  test('revoked/wrong-level grants and malformed trust pins are rejected or untrusted', () => {
    const { reviews } = fixture();
    const pinned = deterministicContentHash(reviews[0]);
    const revoked: ReviewerTrustContext = {
      policyId: 'TRUST-REVOKED',
      version: '1.0.0',
      grants: [
        {
          reviewerId: 'domain-a',
          allowedReviewLevels: ['domain'],
          trustedAttestationContentHashes: [pinned],
          status: 'revoked',
        },
      ],
    };
    expect(reviewerIsTrustedForLevel(revoked, 'domain-a', 'domain')).toBe(false);
    expect(() =>
      normalizeReviewerTrustContext({
        policyId: 'T',
        version: '1',
        grants: [
          {
            reviewerId: 'active-no-pins',
            allowedReviewLevels: ['domain'],
            trustedAttestationContentHashes: [],
            status: 'active',
          },
        ],
      }),
    ).toThrow(TypeError);
    expect(() =>
      normalizeReviewerTrustContext({
        policyId: 'T',
        version: '1',
        grants: [
          {
            reviewerId: 'bad-hash',
            allowedReviewLevels: ['domain'],
            trustedAttestationContentHashes: ['not-a-sha256'],
            status: 'active',
          },
        ],
      }),
    ).toThrow(TypeError);
  });

  test('production execution plan and InterpretationRun persist the exact trust-policy ref', () => {
    const { registry, trust } = fixture();
    const plan = buildInterpretationExecutionPlan(registry, trust);
    const result = runInterpretation(snapshot(), registry, {
      reviewerTrustContext: trust,
      now: new Date('2026-08-19T00:01:00.000Z'),
    });
    expect(plan.reviewerTrustPolicyRef).toEqual(reviewerTrustPolicyRef(trust));
    expect(result.executionPlan.reviewerTrustPolicyRef).toEqual(plan.reviewerTrustPolicyRef);
    expect(result.run.reviewerTrustPolicyRef).toEqual(plan.reviewerTrustPolicyRef);
  });
});
