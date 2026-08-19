import { describe, expect, test } from 'vitest';
import {
  ExecutionPlanError,
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

const sourceA: SourceReference = {
  sourceId: 'SOURCE-I15-SYNTHETIC-A',
  sourceType: 'paper',
  title: 'Synthetic I15 authorization fixture A',
  provenanceTier: 'scholarly_secondary',
};
const sourceB: SourceReference = {
  sourceId: 'SOURCE-I15-SYNTHETIC-B',
  sourceType: 'paper',
  title: 'Synthetic I15 authorization fixture B',
  provenanceTier: 'scholarly_secondary',
};
const internalSource: SourceReference = {
  sourceId: 'SOURCE-I15-INTERNAL',
  sourceType: 'internal_research',
  title: 'Synthetic internal source',
  provenanceTier: 'internal',
};

const trustContext: ReviewerTrustContext = {
  policyId: 'TRUST-I15-SYNTHETIC',
  version: '1.0.0',
  grants: [
    {
      reviewerId: 'synthetic-domain-reviewer',
      allowedReviewLevels: ['domain'],
      status: 'active',
    },
    {
      reviewerId: 'synthetic-internal-reviewer',
      allowedReviewLevels: ['internal'],
      status: 'active',
    },
  ],
};

const researchQuality: RuleDefinition['quality'] = {
  provenanceQuality: 'unknown',
  testCoverage: 'none',
  methodologyStability: 'experimental',
  reviewerStatus: 'unreviewed',
};
const stagingQuality: RuleDefinition['quality'] = {
  provenanceQuality: 'secondary_only',
  testCoverage: 'unit',
  methodologyStability: 'contested',
  reviewerStatus: 'internal_reviewed',
};
const productionQuality: RuleDefinition['quality'] = {
  provenanceQuality: 'multi_source_supported',
  testCoverage: 'fixture_matrix',
  methodologyStability: 'stable_within_method',
  reviewerStatus: 'domain_reviewed',
};

function methodology(
  status: MethodologyDefinition['status'],
  overrides: Partial<MethodologyDefinition> = {},
): MethodologyDefinition {
  return {
    methodologyId: 'METHOD-I15-SYNTHETIC',
    version: '1.0.0',
    family: 'structural_balance',
    name: 'Synthetic authorization methodology',
    description: 'Infrastructure-only fixture; no Saju domain authority.',
    assumptions: ['Synthetic test only.'],
    requiredFactTypes: ['pillars.day'],
    sourceIds: [sourceA.sourceId, sourceB.sourceId],
    status,
    ...overrides,
  };
}

function rule(
  status: RuleDefinition['status'],
  quality: RuleDefinition['quality'],
  overrides: Partial<RuleDefinition> = {},
): RuleDefinition {
  return {
    ruleId: 'RULE-I15-SYNTHETIC',
    version: '1.0.0',
    ruleSetId: 'i15-synthetic',
    taxonomy: { tier: 'T1', category: 'synthetic_authorization' },
    methodologyRef: { id: 'METHOD-I15-SYNTHETIC', version: '1.0.0' },
    title: 'Synthetic authorization rule',
    description: 'Infrastructure-only fixture; emits no Saju-authorized meaning.',
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
      claimType: 'CLAIM-I15-SYNTHETIC',
      subject: 'synthetic',
      predicate: 'authorization_fixture',
      value: true,
    },
    sourceRefs: [
      { sourceId: sourceA.sourceId, supportType: 'implementation_reference' },
      { sourceId: sourceB.sourceId, supportType: 'implementation_reference' },
    ],
    quality,
    status,
    ...overrides,
  };
}

function pack(status: InterpretationPack['status']): InterpretationPack {
  return {
    packId: `PACK-I15-${status.toUpperCase()}`,
    version: '1.0.0',
    name: `I15 ${status} fixture`,
    methodologyRefs: [{ id: 'METHOD-I15-SYNTHETIC', version: '1.0.0' }],
    enabledRuleSets: ['i15-synthetic'],
    conflictPolicy: 'preserve_all',
    ambiguityPolicy: 'propagate',
    compositionPolicyRef: { id: 'COMPOSITION-I15-SYNTHETIC', version: '1.0.0' },
    status,
  };
}

function approvedReviews(
  packStatus: InterpretationPack['status'],
  method: MethodologyDefinition,
  candidateRule: RuleDefinition,
): readonly ReviewAttestation[] {
  if (packStatus === 'research' || packStatus === 'deprecated') return [];
  const reviewLevel = packStatus === 'production' ? 'domain' : 'internal';
  return [
    {
      attestationId: `ATTEST-I15-${packStatus}-METHOD`,
      subjectType: 'methodology',
      subjectRef: {
        id: method.methodologyId,
        version: method.version,
        contentHash: deterministicContentHash(method),
      },
      reviewLevel,
      reviewerId: `synthetic-${reviewLevel}-reviewer`,
      reviewedAt: '2026-08-19T00:00:00.000Z',
      decision: 'approved',
    },
    {
      attestationId: `ATTEST-I15-${packStatus}-RULE`,
      subjectType: 'rule',
      subjectRef: {
        id: candidateRule.ruleId,
        version: candidateRule.version,
        contentHash: deterministicContentHash(candidateRule),
      },
      reviewLevel,
      reviewerId: `synthetic-${reviewLevel}-reviewer`,
      reviewedAt: '2026-08-19T00:00:00.000Z',
      decision: 'approved',
    },
  ];
}

function makeRegistry(options: {
  packStatus: InterpretationPack['status'];
  method: MethodologyDefinition;
  candidateRule: RuleDefinition;
  sources: readonly SourceReference[];
  reviews?: readonly ReviewAttestation[];
}) {
  return createRuleRegistrySnapshot(
    {
      rules: [options.candidateRule],
      methodologies: [options.method],
      sources: options.sources,
      reviewAttestations:
        options.reviews ?? approvedReviews(options.packStatus, options.method, options.candidateRule),
    },
    pack(options.packStatus),
  );
}

function registry(
  packStatus: InterpretationPack['status'],
  methodStatus: MethodologyDefinition['status'],
  ruleStatus: RuleDefinition['status'],
  quality: RuleDefinition['quality'],
) {
  return makeRegistry({
    packStatus,
    method: methodology(methodStatus),
    candidateRule: rule(ruleStatus, quality),
    sources: [sourceA, sourceB],
  });
}

function plan(registryValue: ReturnType<typeof registry> | ReturnType<typeof makeRegistry>) {
  return buildInterpretationExecutionPlan(registryValue, trustContext);
}

function expectPlanError(action: () => unknown, code: ExecutionPlanError['code']): void {
  try {
    action();
    throw new Error(`Expected ExecutionPlanError ${code}`);
  } catch (error) {
    expect(error).toBeInstanceOf(ExecutionPlanError);
    if (!(error instanceof ExecutionPlanError)) throw error;
    expect(error.code).toBe(code);
  }
}

describe('I15/I17 production interpretation authorization gate', () => {
  test('research packs retain research/unreviewed behavior and ignore reviewer trust policy for plan identity', () => {
    const selected = registry('research', 'research', 'research', researchQuality);
    const withoutTrust = buildInterpretationExecutionPlan(selected);
    const withTrust = plan(selected);
    expect(withoutTrust.orderedRuleRefs).toHaveLength(1);
    expect(withTrust.executionPlanId).toBe(withoutTrust.executionPlanId);
    expect(withTrust.reviewerTrustPolicyRef).toBeUndefined();
  });

  test('promoted active methodology requires an explicit reviewer trust context', () => {
    expectPlanError(
      () =>
        buildInterpretationExecutionPlan(
          registry('production', 'active', 'active', productionQuality),
        ),
      'REVIEWER_TRUST_CONTEXT_REQUIRED',
    );
  });

  test('production rejects research methodology before rule activation can matter', () => {
    expectPlanError(
      () => plan(registry('production', 'research', 'active', productionQuality)),
      'METHODOLOGY_NOT_EXECUTABLE_FOR_PACK',
    );
  });

  test('production rejects active rules without domain-reviewed quality metadata', () => {
    expectPlanError(
      () =>
        plan(
          registry('production', 'active', 'active', {
            ...productionQuality,
            reviewerStatus: 'internal_reviewed',
          }),
        ),
      'RULE_QUALITY_NOT_AUTHORIZED_FOR_PACK',
    );
  });

  test('production rejects inadequate tests and heuristic quality provenance', () => {
    expectPlanError(
      () =>
        plan(
          registry('production', 'active', 'active', {
            ...productionQuality,
            testCoverage: 'unit',
          }),
        ),
      'RULE_QUALITY_NOT_AUTHORIZED_FOR_PACK',
    );
    expectPlanError(
      () =>
        plan(
          registry('production', 'active', 'active', {
            ...productionQuality,
            provenanceQuality: 'heuristic',
          }),
        ),
      'RULE_QUALITY_NOT_AUTHORIZED_FOR_PACK',
    );
  });

  test('production accepts active domain-reviewed high-evidence content only under trusted exact approvals', () => {
    const executionPlan = plan(
      registry('production', 'active', 'active', productionQuality),
    );
    expect(executionPlan.orderedRuleRefs).toHaveLength(1);
    expect(executionPlan.reviewerTrustPolicyRef?.id).toBe(trustContext.policyId);
    expect(executionPlan.reviewerTrustPolicyRef?.version).toBe(trustContext.version);
    expect(executionPlan.reviewerTrustPolicyRef?.contentHash).toHaveLength(64);
  });

  test('staging permits reviewed methodology plus internally reviewed unit-tested non-heuristic rule', () => {
    expect(
      plan(registry('staging', 'reviewed', 'reviewed', stagingQuality)).orderedRuleRefs,
    ).toHaveLength(1);
  });

  test('staging rejects research methodology and heuristic quality provenance', () => {
    expectPlanError(
      () => plan(registry('staging', 'research', 'reviewed', stagingQuality)),
      'METHODOLOGY_NOT_EXECUTABLE_FOR_PACK',
    );
    expectPlanError(
      () =>
        plan(
          registry('staging', 'reviewed', 'reviewed', {
            ...stagingQuality,
            provenanceQuality: 'heuristic',
          }),
        ),
      'RULE_QUALITY_NOT_AUTHORIZED_FOR_PACK',
    );
  });

  test('production methodology must carry explicit sources', () => {
    const method = methodology('active', { sourceIds: [] });
    const candidateRule = rule('active', productionQuality, { sourceRefs: [] });
    const withoutSources = makeRegistry({
      packStatus: 'production',
      method,
      candidateRule,
      sources: [],
    });
    expectPlanError(
      () => plan(withoutSources),
      'METHODOLOGY_SOURCE_NOT_AUTHORIZED_FOR_PACK',
    );
  });

  test('production cross-checks multi-source declaration against actual source count', () => {
    const method = methodology('active', { sourceIds: [sourceA.sourceId] });
    const candidateRule = rule('active', productionQuality, {
      sourceRefs: [{ sourceId: sourceA.sourceId, supportType: 'implementation_reference' }],
    });
    const singleSource = makeRegistry({
      packStatus: 'production',
      method,
      candidateRule,
      sources: [sourceA],
    });
    expectPlanError(
      () => plan(singleSource),
      'RULE_SOURCE_NOT_AUTHORIZED_FOR_PACK',
    );
  });

  test('production rejects internal source tiers even when quality metadata claims high evidence', () => {
    const method = methodology('active', {
      sourceIds: [sourceA.sourceId, internalSource.sourceId],
    });
    const candidateRule = rule('active', productionQuality, {
      sourceRefs: [
        { sourceId: sourceA.sourceId, supportType: 'implementation_reference' },
        { sourceId: internalSource.sourceId, supportType: 'implementation_reference' },
      ],
    });
    const internalRegistry = makeRegistry({
      packStatus: 'production',
      method,
      candidateRule,
      sources: [sourceA, internalSource],
    });
    expectPlanError(
      () => plan(internalRegistry),
      'METHODOLOGY_SOURCE_NOT_AUTHORIZED_FOR_PACK',
    );
  });
});
