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
  const id = subjectType === 'methodology'
    ? (subject as MethodologyDefinition).methodologyId
    : (subject as RuleDefinition).ruleId;
  return {
    attestationId: `ATTEST-I16-${subjectType}-${suffix}`,
    subjectType,
    subjectRef: {
      id,
      version: subject.version,
      contentHash: deterministicContentHash(subject),
    },
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
    attestation('methodology', method, level, 'approved', '2026-08-19T00:00:00.000Z', 'method-approved'),
    attestation('rule', candidateRule, level, 'approved', '2026-08-19T00:00:00.000Z', 'rule-approved'),
  ];
}

function registry(
  status: InterpretationPack['status'],
  method: MethodologyDefinition,
  candidateRule: RuleDefinition,
  reviews: readonly ReviewAttestation[],
) {
  return createRuleRegistrySnapshot(
    {
      rules: [candidateRule],
      methodologies: [method],
      sources,
      reviewAttestations: reviews,
    },
    pack(status),
  );
}

function expectPlanError(action: () => unknown): void {
  try {
    action();
    throw new Error('Expected review authorization failure.');
  } catch (error) {
    expect(error).toBeInstanceOf(ExecutionPlanError);
    if (!(error instanceof ExecutionPlanError)) throw error;
    expect(error.code).toBe('REVIEW_ATTESTATION_NOT_AUTHORIZED_FOR_PACK');
  }
}

describe('I16 content-bound review attestations', () => {
  test('production rejects self-declared domain-reviewed metadata without exact domain attestations', () => {
    const method = methodology();
    const candidateRule = rule();
    expectPlanError(() =>
      buildInterpretationExecutionPlan(registry('production', method, candidateRule, [])),
    );
  });

  test('production accepts exact-hash domain approvals for methodology and rule', () => {
    const method = methodology();
    const candidateRule = rule();
    const plan = buildInterpretationExecutionPlan(
      registry('production', method, candidateRule, approvedPair(method, candidateRule, 'domain')),
    );
    expect(plan.orderedRuleRefs).toHaveLength(1);
  });

  test('staging accepts exact internal approvals but production does not', () => {
    const method = methodology('reviewed');
    const candidateRule = {
      ...rule('reviewed'),
      quality: {
        ...rule('reviewed').quality,
        reviewerStatus: 'internal_reviewed' as const,
        testCoverage: 'unit' as const,
        provenanceQuality: 'secondary_only' as const,
      },
    };
    const internal = approvedPair(method, candidateRule, 'internal');

    expect(
      buildInterpretationExecutionPlan(
        registry('staging', method, candidateRule, internal),
      ).orderedRuleRefs,
    ).toHaveLength(1);

    const productionMethod = { ...method, status: 'active' as const };
    const productionRule = {
      ...candidateRule,
      status: 'active' as const,
      quality: {
        provenanceQuality: 'multi_source_supported' as const,
        testCoverage: 'fixture_matrix' as const,
        methodologyStability: 'stable_within_method' as const,
        reviewerStatus: 'domain_reviewed' as const,
      },
    };
    const productionInternal = approvedPair(productionMethod, productionRule, 'internal');
    expectPlanError(() =>
      buildInterpretationExecutionPlan(
        registry('production', productionMethod, productionRule, productionInternal),
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

  test('latest domain rejection supersedes an older approval for the exact same content', () => {
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

    expectPlanError(() =>
      buildInterpretationExecutionPlan(
        registry('production', method, candidateRule, reviews),
      ),
    );
  });

  test('a later exact domain approval can supersede an earlier rejection', () => {
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

    expect(
      buildInterpretationExecutionPlan(
        registry('production', method, candidateRule, reviews),
      ).orderedRuleRefs,
    ).toHaveLength(1);
  });

  test('review attestations are content-addressed into registry identity', () => {
    const method = methodology();
    const candidateRule = rule();
    const first = registry(
      'research',
      method,
      candidateRule,
      [attestation('rule', candidateRule, 'internal', 'approved', '2026-08-19T00:00:00.000Z', 'a')],
    );
    const second = registry(
      'research',
      method,
      candidateRule,
      [attestation('rule', candidateRule, 'internal', 'approved', '2026-08-20T00:00:00.000Z', 'b')],
    );

    expect(first.snapshot.registrySnapshotId).not.toBe(second.snapshot.registrySnapshotId);
    expect(first.snapshot.reviewAttestations).toHaveLength(1);
    expect(second.snapshot.reviewAttestations).toHaveLength(1);
  });
});
