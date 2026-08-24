import { describe, expect, test } from 'vitest';
import type {
  InterpretationPack,
  MethodologyDefinition,
  ReviewAttestation,
  ReviewerTrustContext,
  RuleDefinition,
  SourceReference,
} from '../src/index.js';
import {
  ExecutionPlanError,
  buildInterpretationExecutionPlan,
} from '../src/interpretation/execution-plan.js';
import {
  RegistryConfigurationError,
  createRuleRegistrySnapshot,
  deterministicContentHash,
} from '../src/interpretation/rule-registry.js';

const methodology: MethodologyDefinition = {
  methodologyId: 'METHOD-SYNTHETIC',
  version: '1.0.0',
  family: 'structural_balance',
  name: 'Synthetic methodology',
  description: 'Test-only methodology with no saju authority.',
  assumptions: [],
  requiredFactTypes: [],
  sourceIds: [],
  status: 'research',
};

const pack: InterpretationPack = {
  packId: 'PACK-SYNTHETIC',
  version: '1.0.0',
  name: 'Synthetic test pack',
  methodologyRefs: [{ id: methodology.methodologyId, version: methodology.version }],
  enabledRuleSets: ['synthetic'],
  conflictPolicy: 'preserve_all',
  ambiguityPolicy: 'propagate',
  compositionPolicyRef: { id: 'COMPOSITION-SYNTHETIC', version: '1.0.0' },
  status: 'research',
};

function rule(
  ruleId: string,
  claimType: string,
  options: {
    status?: RuleDefinition['status'];
    requiredClaimType?: string;
    requires?: readonly string[];
  } = {},
): RuleDefinition {
  const inputs: RuleDefinition['inputs'] = options.requiredClaimType
    ? [
        {
          key: 'upstream',
          source: 'interpretation_claim',
          pathOrClaimType: options.requiredClaimType,
          required: true,
          ambiguityBehavior: 'requires_resolved',
        },
      ]
    : [
        {
          key: 'dayMaster',
          source: 'canonical_fact',
          pathOrClaimType: 'derivedFacts.dayMaster',
          acceptedStatuses: ['resolved'],
          required: true,
          ambiguityBehavior: 'requires_resolved',
        },
      ];

  return {
    ruleId,
    version: '1.0.0',
    ruleSetId: 'synthetic',
    taxonomy: { tier: 'T1', category: 'synthetic' },
    methodologyRef: { id: methodology.methodologyId, version: methodology.version },
    title: ruleId,
    description: 'Synthetic planner test rule.',
    inputs,
    condition: { op: 'exists', value: { kind: 'input', key: inputs[0]?.key ?? 'dayMaster' } },
    output: {
      claimType,
      subject: 'synthetic-subject',
      predicate: 'synthetic-predicate',
      value: ruleId,
    },
    sourceRefs: [],
    quality: {
      provenanceQuality: 'unknown',
      testCoverage: 'unit',
      methodologyStability: 'experimental',
      reviewerStatus: 'unreviewed',
    },
    status: options.status ?? 'research',
    ...(options.requires === undefined ? {} : { relations: { requires: options.requires } }),
  };
}

function registry(rules: readonly RuleDefinition[], selectedPack = pack) {
  return createRuleRegistrySnapshot(
    { rules, methodologies: [methodology] },
    selectedPack,
    '2026-08-19T00:00:00.000Z',
  );
}

const productionSources: readonly SourceReference[] = [
  {
    sourceId: 'SOURCE-PLANNER-PROD-A',
    sourceType: 'paper',
    title: 'Synthetic production planner source A',
    provenanceTier: 'scholarly_secondary',
  },
  {
    sourceId: 'SOURCE-PLANNER-PROD-B',
    sourceType: 'paper',
    title: 'Synthetic production planner source B',
    provenanceTier: 'scholarly_secondary',
  },
];

function productionResearchRuleFixture() {
  const productionMethodology: MethodologyDefinition = {
    ...methodology,
    sourceIds: productionSources.map((source) => source.sourceId),
    status: 'active',
  };
  const researchRule: RuleDefinition = {
    ...rule('RULE-RESEARCH', 'CLAIM-RESEARCH', { status: 'research' }),
    methodologyRef: {
      id: productionMethodology.methodologyId,
      version: productionMethodology.version,
    },
    sourceRefs: productionSources.map((source) => ({
      sourceId: source.sourceId,
      supportType: 'implementation_reference' as const,
    })),
    quality: {
      provenanceQuality: 'multi_source_supported',
      testCoverage: 'fixture_matrix',
      methodologyStability: 'stable_within_method',
      reviewerStatus: 'domain_reviewed',
    },
  };
  const productionPack: InterpretationPack = {
    ...pack,
    methodologyRefs: [
      { id: productionMethodology.methodologyId, version: productionMethodology.version },
    ],
    status: 'production',
  };
  const reviews: readonly ReviewAttestation[] = [
    {
      attestationId: 'ATTEST-PLANNER-PROD-METHOD',
      subjectType: 'methodology',
      subjectRef: {
        id: productionMethodology.methodologyId,
        version: productionMethodology.version,
        contentHash: deterministicContentHash(productionMethodology),
      },
      reviewLevel: 'domain',
      reviewerId: 'synthetic-domain-reviewer',
      reviewedAt: '2026-08-19T00:00:00.000Z',
      decision: 'approved',
    },
    {
      attestationId: 'ATTEST-PLANNER-PROD-RULE',
      subjectType: 'rule',
      subjectRef: {
        id: researchRule.ruleId,
        version: researchRule.version,
        contentHash: deterministicContentHash(researchRule),
      },
      reviewLevel: 'domain',
      reviewerId: 'synthetic-domain-reviewer',
      reviewedAt: '2026-08-19T00:00:00.000Z',
      decision: 'approved',
    },
  ];
  const trust: ReviewerTrustContext = {
    policyId: 'TRUST-PLANNER-PRODUCTION',
    version: '2.0.0',
    grants: [
      {
        reviewerId: 'synthetic-domain-reviewer',
        allowedReviewLevels: ['domain'],
        trustedAttestationContentHashes: reviews.map(deterministicContentHash),
        status: 'active',
      },
    ],
  };
  const selectedRegistry = createRuleRegistrySnapshot(
    {
      rules: [researchRule],
      methodologies: [productionMethodology],
      sources: productionSources,
      reviewAttestations: reviews,
    },
    productionPack,
    '2026-08-19T00:00:00.000Z',
  );
  return { registry: selectedRegistry, trust };
}

describe('rule registry snapshots', () => {
  test('registry identity is independent of registration order', () => {
    const a = rule('RULE-A', 'CLAIM-A');
    const b = rule('RULE-B', 'CLAIM-B');
    const forward = registry([a, b]);
    const reverse = registry([b, a]);
    expect(forward.snapshot.registrySnapshotId).toBe(reverse.snapshot.registrySnapshotId);
    expect(forward.snapshot.rules).toEqual(reverse.snapshot.rules);
  });

  test('duplicate rule id/version is rejected before planning', () => {
    const duplicate = rule('RULE-DUPLICATE', 'CLAIM-X');
    expect(() => registry([duplicate, duplicate])).toThrow(RegistryConfigurationError);
    try {
      registry([duplicate, duplicate]);
    } catch (error) {
      expect((error as RegistryConfigurationError).code).toBe('DUPLICATE_RULE_VERSION');
    }
  });

  test('pack methodology version mismatch fails closed', () => {
    const mismatchedPack: InterpretationPack = {
      ...pack,
      methodologyRefs: [{ id: methodology.methodologyId, version: '9.9.9' }],
    };
    expect(() => registry([rule('RULE-A', 'CLAIM-A')], mismatchedPack)).toThrow(
      RegistryConfigurationError,
    );
    try {
      registry([rule('RULE-A', 'CLAIM-A')], mismatchedPack);
    } catch (error) {
      expect((error as RegistryConfigurationError).code).toBe(
        'PACK_METHODOLOGY_VERSION_MISMATCH',
      );
    }
  });
});

describe('interpretation execution DAG', () => {
  test('claim dependency creates deterministic producer-before-consumer stages', () => {
    const producer = rule('RULE-PRODUCER', 'CLAIM-BASE');
    const consumer = rule('RULE-CONSUMER', 'CLAIM-SYNTH', {
      requiredClaimType: 'CLAIM-BASE',
    });
    const plan = buildInterpretationExecutionPlan(registry([consumer, producer]));
    expect(plan.stages).toHaveLength(2);
    expect(plan.stages[0]?.ruleRefs.map((value) => value.id)).toEqual(['RULE-PRODUCER']);
    expect(plan.stages[1]?.ruleRefs.map((value) => value.id)).toEqual(['RULE-CONSUMER']);
    expect(plan.dependencyEdges).toEqual([
      expect.objectContaining({
        fromRuleRef: { id: 'RULE-PRODUCER', version: '1.0.0' },
        toRuleRef: { id: 'RULE-CONSUMER', version: '1.0.0' },
        reason: 'interpretation_claim_requirement',
        claimType: 'CLAIM-BASE',
      }),
    ]);
  });

  test('independent rules have stable lexical ordering and identity', () => {
    const rules = [
      rule('RULE-Z', 'CLAIM-Z'),
      rule('RULE-A', 'CLAIM-A'),
      rule('RULE-M', 'CLAIM-M'),
    ];
    const forward = buildInterpretationExecutionPlan(registry(rules));
    const reverse = buildInterpretationExecutionPlan(registry([...rules].reverse()));
    expect(forward.orderedRuleRefs.map((value) => value.id)).toEqual([
      'RULE-A',
      'RULE-M',
      'RULE-Z',
    ]);
    expect(forward.executionPlanId).toBe(reverse.executionPlanId);
    expect(forward.planHash).toBe(reverse.planHash);
  });

  test('explicit dependency cycle is rejected', () => {
    const a = rule('RULE-A', 'CLAIM-A', { requires: ['RULE-B'] });
    const b = rule('RULE-B', 'CLAIM-B', { requires: ['RULE-A'] });
    try {
      buildInterpretationExecutionPlan(registry([a, b]));
      throw new Error('Expected cycle failure');
    } catch (error) {
      expect(error).toBeInstanceOf(ExecutionPlanError);
      if (!(error instanceof ExecutionPlanError)) throw error;
      expect(error.code).toBe('EXECUTION_PLAN_INVALID_CYCLE');
    }
  });

  test('missing required claim producer rejects the plan', () => {
    const consumer = rule('RULE-CONSUMER', 'CLAIM-SYNTH', {
      requiredClaimType: 'CLAIM-NOT-PRODUCED',
    });
    try {
      buildInterpretationExecutionPlan(registry([consumer]));
      throw new Error('Expected claim dependency failure');
    } catch (error) {
      expect(error).toBeInstanceOf(ExecutionPlanError);
      if (!(error instanceof ExecutionPlanError)) throw error;
      expect(error.code).toBe('CLAIM_DEPENDENCY_MISSING');
    }
  });

  test('production rejects research rules after every trust prerequisite is satisfied', () => {
    const selected = productionResearchRuleFixture();
    try {
      buildInterpretationExecutionPlan(selected.registry, selected.trust);
      throw new Error('Expected production rule-status failure');
    } catch (error) {
      expect(error).toBeInstanceOf(ExecutionPlanError);
      if (!(error instanceof ExecutionPlanError)) throw error;
      expect(error.code).toBe('RULE_NOT_EXECUTABLE_FOR_PACK');
    }
  });

  test('deprecated packs cannot execute', () => {
    const deprecatedPack: InterpretationPack = { ...pack, status: 'deprecated' };
    try {
      buildInterpretationExecutionPlan(registry([rule('RULE-A', 'CLAIM-A')], deprecatedPack));
      throw new Error('Expected deprecated-pack failure');
    } catch (error) {
      expect(error).toBeInstanceOf(ExecutionPlanError);
      if (!(error instanceof ExecutionPlanError)) throw error;
      expect(error.code).toBe('PACK_NOT_EXECUTABLE');
    }
  });

  test('multiple selected versions of the same rule id fail closed', () => {
    const v1 = rule('RULE-VERSIONED', 'CLAIM-V1');
    const v2: RuleDefinition = {
      ...v1,
      version: '2.0.0',
      output: { ...v1.output, claimType: 'CLAIM-V2' },
    };
    try {
      buildInterpretationExecutionPlan(registry([v1, v2]));
      throw new Error('Expected rule-version failure');
    } catch (error) {
      expect(error).toBeInstanceOf(ExecutionPlanError);
      if (!(error instanceof ExecutionPlanError)) throw error;
      expect(error.code).toBe('RULE_VERSION_SELECTION_AMBIGUOUS');
    }
  });

  test('disabling a producer makes its consumer dependency unresolved', () => {
    const producer = rule('RULE-PRODUCER', 'CLAIM-BASE');
    const consumer = rule('RULE-CONSUMER', 'CLAIM-SYNTH', {
      requiredClaimType: 'CLAIM-BASE',
    });
    const disabledProducerPack: InterpretationPack = {
      ...pack,
      disabledRuleIds: ['RULE-PRODUCER'],
    };
    expect(() =>
      buildInterpretationExecutionPlan(registry([producer, consumer], disabledProducerPack)),
    ).toThrow(ExecutionPlanError);
  });
});
