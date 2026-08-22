import { describe, expect, test } from 'vitest';
import {
  ExecutionPlanError,
  RegistryConfigurationError,
  buildInterpretationExecutionPlan,
  createRuleRegistrySnapshot,
  deterministicContentHash,
  type InterpretationPack,
  type MethodologyDefinition,
  type ReviewAttestation,
  type ReviewerTrustContext,
  type RuleDefinition,
  type SourceReference,
} from '../src/index.js';

const sources: readonly SourceReference[] = [
  {
    sourceId: 'SOURCE-I16-A',
    sourceType: 'paper',
    title: 'Synthetic review source A',
    provenanceTier: 'scholarly_secondary',
  },
  {
    sourceId: 'SOURCE-I16-B',
    sourceType: 'paper',
    title: 'Synthetic review source B',
    provenanceTier: 'scholarly_secondary',
  },
];

function methodology(status: MethodologyDefinition['status'] = 'active'): MethodologyDefinition {
  return {
    methodologyId: 'METHOD-I16-SYNTHETIC',
    version: '1.0.0',
    family: 'structural_balance',
    name: 'Synthetic review methodology',
    description: 'Infrastructure-only review fixture.',
    assumptions: ['Synthetic test only.'],
    requiredFactTypes: ['pillars.day'],
    sourceIds: sources.map((source) => source.sourceId),
    status,
  };
}

function rule(
  status: RuleDefinition['status'] = 'active',
  title = 'Synthetic reviewed rule',
): RuleDefinition {
  return {
    ruleId: 'RULE-I16-SYNTHETIC',
    version: '1.0.0',
    ruleSetId: 'i16-synthetic',
    taxonomy: { tier: 'T1', category: 'synthetic_review' },
    methodologyRef: { id: 'METHOD-I16-SYNTHETIC', version: '1.0.0' },
    title,
    description: 'Infrastructure-only review fixture.',
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
    output: {
      claimType: 'CLAIM-I16-SYNTHETIC',
      subject: 'synthetic',
      predicate: 'review_fixture',
      value: true,
    },
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
    status,
  };
}

function pack(status: InterpretationPack['status']): InterpretationPack {
  return {
    packId: `PACK-I16-${status.toUpperCase()}`,
    version: '1.0.0',
    name: `I16 ${status} fixture`,
    methodologyRefs: [{ id: 'METHOD-I16-SYNTHETIC', version: '1.0.0' }],
    enabledRuleSets: ['i16-synthetic'],
    conflictPolicy: 'preserve_all',
    ambiguityPolicy: 'propagate',
    compositionPolicyRef: { id: 'COMPOSITION-I16', version: '1.0.0' },
    status,
  };
}

function attestation(
  subjectType: ReviewAttestation['subjectType'],
  subject: MethodologyDefinition | RuleDefinition,
  reviewLevel: ReviewAttestation['reviewLevel'],
  decision: ReviewAttestation['decision'],
  reviewedAt: string,
  suffix: string,
): ReviewAttestation {
  const id =
    subjectType === 'methodology'
      ? (subject as MethodologyDefinition).methodologyId
      : (subject as RuleDefinition).ruleId;
  return {
    attestationId: `ATTEST-I16-${subjectType}-${suffix}`,
    subjectType,
    subjectRef: { id, version: subject.version, contentHash: deterministicContentHash(subject) },
    reviewLevel,
    reviewerId: `reviewer-${reviewLevel}`,
    reviewedAt,
    decision,
  };
}

function approvedPair(
  method: MethodologyDefinition,
  candidateRule: RuleDefinition,
  level: ReviewAttestation['reviewLevel'],
): readonly ReviewAttestation[] {
  return [
    attestation(
      'methodology',
      method,
      level,
      'approved',
      '2026-08-19T00:00:00.000Z',
      'method-approved',
    ),
    attestation(
      'rule',
      candidateRule,
      level,
      'approved',
      '2026-08-19T00:00:00.000Z',
      'rule-approved',
    ),
  ];
}

function trustFor(reviews: readonly ReviewAttestation[]): ReviewerTrustContext {
  const grouped = new Map<string, ReviewAttestation[]>();
  for (const review of reviews) {
    const values = grouped.get(review.reviewerId) ?? [];
    values.push(review);
    grouped.set(review.reviewerId, values);
  }
  return {
    policyId: 'TRUST-I16-SYNTHETIC',
    version: '2.0.0',
    grants: [...grouped.entries()].map(([reviewerId, reviewerReviews]) => ({
      reviewerId,
      allowedReviewLevels: [...new Set(reviewerReviews.map((review) => review.reviewLevel))],
      trustedAttestationContentHashes: reviewerReviews.map(deterministicContentHash),
      status: 'active' as const,
    })),
  };
}

function registry(
  status: InterpretationPack['status'],
  method: MethodologyDefinition,
  candidateRule: RuleDefinition,
  reviews: readonly ReviewAttestation[],
) {
  return createRuleRegistrySnapshot(
    { rules: [candidateRule], methodologies: [method], sources, reviewAttestations: reviews },
    pack(status),
  );
}

function plan(
  registryValue: ReturnType<typeof registry>,
  reviews: readonly ReviewAttestation[],
  trust: ReviewerTrustContext = trustFor(reviews),
) {
  return buildInterpretationExecutionPlan(registryValue, trust);
}

function expectReviewFailure(action: () => unknown): void {
  try {
    action();
    throw new Error('Expected review authorization failure.');
  } catch (error) {
    expect(error).toBeInstanceOf(ExecutionPlanError);
    if (!(error instanceof ExecutionPlanError)) throw error;
    expect(error.code).toBe('REVIEW_ATTESTATION_NOT_AUTHORIZED_FOR_PACK');
  }
}

describe('I16/I17 content-bound trusted review attestations', () => {
  test('production rejects self-declared domain-reviewed metadata without attestations', () => {
    const method = methodology();
    const candidateRule = rule();
    const reviews: readonly ReviewAttestation[] = [];
    expectReviewFailure(() => plan(registry('production', method, candidateRule, reviews), reviews));
  });

  test('exact attestations from an untrusted reviewer identity are not authorization', () => {
    const method = methodology();
    const candidateRule = rule();
    const reviews = approvedPair(method, candidateRule, 'domain');
    const untrusted: ReviewerTrustContext = {
      policyId: 'TRUST-I16-UNTRUSTED',
      version: '1.0.0',
      grants: [
        {
          reviewerId: 'someone-else',
          allowedReviewLevels: ['domain'],
          trustedAttestationContentHashes: reviews.map(deterministicContentHash),
          status: 'active',
        },
      ],
    };
    expectReviewFailure(() =>
      plan(registry('production', method, candidateRule, reviews), reviews, untrusted),
    );
  });

  test('production accepts exact domain approvals only when the exact attestations are pinned', () => {
    const method = methodology();
    const candidateRule = rule();
    const reviews = approvedPair(method, candidateRule, 'domain');
    const trust = trustFor(reviews);
    const executionPlan = plan(registry('production', method, candidateRule, reviews), reviews, trust);
    expect(executionPlan.orderedRuleRefs).toHaveLength(1);
    expect(executionPlan.reviewerTrustPolicyRef?.id).toBe(trust.policyId);
  });

  test('staging accepts trusted internal approvals but production requires domain approvals', () => {
    const method = methodology('reviewed');
    const baseRule = rule('reviewed');
    const candidateRule: RuleDefinition = {
      ...baseRule,
      quality: {
        ...baseRule.quality,
        reviewerStatus: 'internal_reviewed',
        testCoverage: 'unit',
        provenanceQuality: 'secondary_only',
      },
    };
    const internal = approvedPair(method, candidateRule, 'internal');
    expect(plan(registry('staging', method, candidateRule, internal), internal).orderedRuleRefs).toHaveLength(1);

    const productionMethod: MethodologyDefinition = { ...method, status: 'active' };
    const productionRule: RuleDefinition = {
      ...candidateRule,
      status: 'active',
      quality: {
        provenanceQuality: 'multi_source_supported',
        testCoverage: 'fixture_matrix',
        methodologyStability: 'stable_within_method',
        reviewerStatus: 'domain_reviewed',
      },
    };
    const productionInternal = approvedPair(productionMethod, productionRule, 'internal');
    expectReviewFailure(() =>
      plan(
        registry('production', productionMethod, productionRule, productionInternal),
        productionInternal,
      ),
    );
  });

  test('stale content hash is rejected when registry is assembled', () => {
    const method = methodology();
    const originalRule = rule();
    const changedRule = rule('active', 'Changed after review');
    const stale = approvedPair(method, originalRule, 'domain');
    expect(() => registry('production', method, changedRule, stale)).toThrowError(
      RegistryConfigurationError,
    );
    try {
      registry('production', method, changedRule, stale);
    } catch (error) {
      if (!(error instanceof RegistryConfigurationError)) throw error;
      expect(error.code).toBe('REVIEW_ATTESTATION_SUBJECT_MISMATCH');
    }
  });

  test('latest trust-pinned domain rejection supersedes an older approval', () => {
    const method = methodology();
    const candidateRule = rule();
    const reviews: ReviewAttestation[] = [
      ...approvedPair(method, candidateRule, 'domain'),
      attestation(
        'rule',
        candidateRule,
        'domain',
        'rejected',
        '2026-08-20T00:00:00.000Z',
        'rule-later-rejection',
      ),
    ];
    expectReviewFailure(() => plan(registry('production', method, candidateRule, reviews), reviews));
  });

  test('later trust-pinned domain approval can supersede an earlier rejection', () => {
    const method = methodology();
    const candidateRule = rule();
    const reviews: ReviewAttestation[] = [
      attestation(
        'methodology',
        method,
        'domain',
        'approved',
        '2026-08-19T00:00:00.000Z',
        'method-approved',
      ),
      attestation(
        'rule',
        candidateRule,
        'domain',
        'rejected',
        '2026-08-19T00:00:00.000Z',
        'rule-rejected',
      ),
      attestation(
        'rule',
        candidateRule,
        'domain',
        'approved',
        '2026-08-21T00:00:00.000Z',
        'rule-later-approved',
      ),
    ];
    expect(plan(registry('production', method, candidateRule, reviews), reviews).orderedRuleRefs).toHaveLength(1);
  });

  test('review attestations remain content-addressed into registry identity', () => {
    const method = methodology();
    const candidateRule = rule();
    const first = registry('research', method, candidateRule, [
      attestation(
        'rule',
        candidateRule,
        'internal',
        'approved',
        '2026-08-19T00:00:00.000Z',
        'a',
      ),
    ]);
    const second = registry('research', method, candidateRule, [
      attestation(
        'rule',
        candidateRule,
        'internal',
        'approved',
        '2026-08-20T00:00:00.000Z',
        'b',
      ),
    ]);
    expect(first.snapshot.registrySnapshotId).not.toBe(second.snapshot.registrySnapshotId);
  });
});
