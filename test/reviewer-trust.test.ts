import { describe, expect, test } from 'vitest';
import {
  buildInterpretationExecutionPlan,
  calculateCanonicalSajuSnapshot,
  createRuleRegistrySnapshot,
  deterministicContentHash,
  normalizeReviewerTrustContext,
  reviewerIsTrustedForLevel,
  reviewerTrustPolicyRef,
  runInterpretation,
  type CalculationPolicySnapshot,
  type InterpretationPack,
  type MethodologyDefinition,
  type ReviewAttestation,
  type ReviewerTrustContext,
  type RuleDefinition,
  type SourceReference,
} from '../src/index.js';

const trustA: ReviewerTrustContext = {
  policyId: 'TRUST-I17',
  version: '1.0.0',
  grants: [
    { reviewerId: 'domain-a', allowedReviewLevels: ['domain'], status: 'active' },
    { reviewerId: 'internal-a', allowedReviewLevels: ['internal'], status: 'active' },
  ],
};

const sources: readonly SourceReference[] = [
  { sourceId: 'SOURCE-I17-A', sourceType: 'paper', title: 'Synthetic source A', provenanceTier: 'scholarly_secondary' },
  { sourceId: 'SOURCE-I17-B', sourceType: 'paper', title: 'Synthetic source B', provenanceTier: 'scholarly_secondary' },
];

function methodology(): MethodologyDefinition {
  return {
    methodologyId: 'METHOD-I17', version: '1.0.0', family: 'structural_balance',
    name: 'Synthetic trusted methodology', description: 'Test-only.', assumptions: [],
    requiredFactTypes: ['pillars.day'], sourceIds: sources.map((source) => source.sourceId), status: 'active',
  };
}

function rule(): RuleDefinition {
  return {
    ruleId: 'RULE-I17', version: '1.0.0', ruleSetId: 'i17',
    taxonomy: { tier: 'T1', category: 'synthetic_trust' },
    methodologyRef: { id: 'METHOD-I17', version: '1.0.0' }, title: 'Synthetic trusted rule', description: 'Test-only.',
    inputs: [{ key: 'day', source: 'canonical_fact', pathOrClaimType: 'pillars.day', acceptedStatuses: ['resolved'], required: true, ambiguityBehavior: 'requires_resolved' }],
    condition: { op: 'exists', value: { kind: 'input', key: 'day' } },
    output: { claimType: 'CLAIM-I17', subject: 'synthetic', predicate: 'trusted', value: true },
    sourceRefs: sources.map((source) => ({ sourceId: source.sourceId, supportType: 'implementation_reference' as const })),
    quality: { provenanceQuality: 'multi_source_supported', testCoverage: 'fixture_matrix', methodologyStability: 'stable_within_method', reviewerStatus: 'domain_reviewed' },
    status: 'active',
  };
}

function productionPack(): InterpretationPack {
  return {
    packId: 'PACK-I17-PRODUCTION', version: '1.0.0', name: 'Synthetic production trust pack',
    methodologyRefs: [{ id: 'METHOD-I17', version: '1.0.0' }], enabledRuleSets: ['i17'],
    conflictPolicy: 'preserve_all', ambiguityPolicy: 'propagate',
    compositionPolicyRef: { id: 'COMPOSITION-I17', version: '1.0.0' }, status: 'production',
  };
}

function registry() {
  const method = methodology();
  const candidateRule = rule();
  const reviews: readonly ReviewAttestation[] = [
    {
      attestationId: 'ATTEST-I17-METHOD', subjectType: 'methodology',
      subjectRef: { id: method.methodologyId, version: method.version, contentHash: deterministicContentHash(method) },
      reviewLevel: 'domain', reviewerId: 'domain-a', reviewedAt: '2026-08-19T00:00:00.000Z', decision: 'approved',
    },
    {
      attestationId: 'ATTEST-I17-RULE', subjectType: 'rule',
      subjectRef: { id: candidateRule.ruleId, version: candidateRule.version, contentHash: deterministicContentHash(candidateRule) },
      reviewLevel: 'domain', reviewerId: 'domain-a', reviewedAt: '2026-08-19T00:00:00.000Z', decision: 'approved',
    },
  ];
  return createRuleRegistrySnapshot({ rules: [candidateRule], methodologies: [method], sources, reviewAttestations: reviews }, productionPack());
}

const calculationPolicy: CalculationPolicySnapshot = {
  policyId: 'myeonghwa/i17-test', policyVersion: '1.0.0', dayBoundary: 'midnight',
  trueSolarTime: { enabled: false, longitudeSource: 'not-applicable', applyEquationOfTime: false, applyHistoricalDst: false },
  timeZonePolicy: { source: 'service-default', timeZone: 'Asia/Seoul' },
  unknownBirthTimePolicy: 'preserve-unknown-and-enumerate-boundaries',
};

function snapshot() {
  return calculateCanonicalSajuSnapshot({ calendarType: 'solar', date: { year: 1992, month: 10, day: 24 }, time: { known: true, hour: 5, minute: 30 }, sexForTraditionalCalculation: 'unspecified' }, calculationPolicy);
}

describe('I17 reviewer trust-root', () => {
  test('trust policy identity is deterministic regardless of grant order and level duplication', () => {
    const reordered: ReviewerTrustContext = {
      policyId: trustA.policyId,
      version: trustA.version,
      grants: [
        { reviewerId: 'internal-a', allowedReviewLevels: ['internal', 'internal'], status: 'active' },
        { reviewerId: 'domain-a', allowedReviewLevels: ['domain'], status: 'active' },
      ],
    };
    expect(reviewerTrustPolicyRef(reordered)).toEqual(reviewerTrustPolicyRef(trustA));
  });

  test('normalized grants and review-level arrays are frozen', () => {
    const normalized = normalizeReviewerTrustContext(trustA);
    const first = normalized.grants[0];
    if (first === undefined) throw new Error('fixture requires grants');
    expect(Object.isFrozen(normalized)).toBe(true);
    expect(Object.isFrozen(normalized.grants)).toBe(true);
    expect(Object.isFrozen(first)).toBe(true);
    expect(Object.isFrozen(first.allowedReviewLevels)).toBe(true);
  });

  test('revoked or wrong-level grants are not trusted', () => {
    const revoked: ReviewerTrustContext = {
      policyId: 'TRUST-REVOKED', version: '1.0.0',
      grants: [{ reviewerId: 'domain-a', allowedReviewLevels: ['domain'], status: 'revoked' }],
    };
    expect(reviewerIsTrustedForLevel(revoked, 'domain-a', 'domain')).toBe(false);
    expect(reviewerIsTrustedForLevel(trustA, 'internal-a', 'domain')).toBe(false);
    expect(reviewerIsTrustedForLevel(trustA, 'domain-a', 'domain')).toBe(true);
  });

  test('duplicate reviewer grants and empty level grants are rejected', () => {
    expect(() => normalizeReviewerTrustContext({ policyId: 'T', version: '1', grants: [
      { reviewerId: 'same', allowedReviewLevels: ['domain'], status: 'active' },
      { reviewerId: 'same', allowedReviewLevels: ['internal'], status: 'active' },
    ] })).toThrow(TypeError);
    expect(() => normalizeReviewerTrustContext({ policyId: 'T', version: '1', grants: [
      { reviewerId: 'empty-levels', allowedReviewLevels: [], status: 'active' },
    ] })).toThrow(TypeError);
  });

  test('production execution plan and InterpretationRun persist the same trust-policy content ref', () => {
    const selectedRegistry = registry();
    const plan = buildInterpretationExecutionPlan(selectedRegistry, trustA);
    const result = runInterpretation(snapshot(), selectedRegistry, {
      reviewerTrustContext: trustA,
      now: new Date('2026-08-19T00:01:00.000Z'),
    });
    expect(plan.reviewerTrustPolicyRef).toEqual(reviewerTrustPolicyRef(trustA));
    expect(result.executionPlan.reviewerTrustPolicyRef).toEqual(plan.reviewerTrustPolicyRef);
    expect(result.run.reviewerTrustPolicyRef).toEqual(plan.reviewerTrustPolicyRef);
    expect(result.run.authorizationPolicyVersion).toBe('myeonghwa-interpretation-authorization-v3');
    expect(result.run.interpretationEngineVersion).toBe('0.4.0');
  });
});
