import { describe, expect, test } from 'vitest';
import type {
  InterpretationPack,
  MethodologyDefinition,
  RuleDefinition,
} from '../src/index.js';
import {
  ExecutionPlanError,
  buildInterpretationExecutionPlan,
} from '../src/interpretation/execution-plan.js';
import {
  RegistryConfigurationError,
  createRuleRegistrySnapshot,
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
  status: 'active',
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
  status: 'production',
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
      reviewerStatus: 'internal_reviewed',
    },
    status: options.status ?? 'active',
    ...(options.requires === undefined
      ? {}
      : { relations: { requires: options.requires } }),
  };
}

function registry(rules: readonly RuleDefinition[], selectedPack = pack) {
  return createRuleRegistrySnapshot(
    {
      rules,
      methodologies: [methodology],
    },
    selectedPack,
    '2026-08-19T00:00:00.000Z',
  );
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
  test('claim dependency creates a deterministic producer-before-consumer stage', () => {
    const producer = rule('RULE-PRODUCER', 'CLAIM-BASE');
    const consumer = rule('RULE-CONSUMER', 'CLAIM-SYNTH', {
      requiredClaimType: 'CLAIM-BASE',
    });

    const plan = buildInterpretationExecutionPlan(registry([consumer, producer]));

    expect(plan.stages).toHaveLength(2);
    expect(plan.stages[0]?.ruleRefs.map((ref) => ref.id)).toEqual(['RULE-PRODUCER']);
    expect(plan.stages[1]?.ruleRefs.map((ref) => ref.id)).toEqual(['RULE-CONSUMER']);
    expect(plan.dependencyEdges).toEqual([
      expect.objectContaining({
        fromRuleRef: { id: 'RULE-PRODUCER', version: '1.0.0' },
        toRuleRef: { id: 'RULE-CONSUMER', version: '1.0.0' },
        reason: 'interpretation_claim_requirement',
        claimType: 'CLAIM-BASE',
      }),
    ]);
  });

  test('independent rules have stable lexical ordering inside a stage', () => {
    const plan = buildInterpretationExecutionPlan(
      registry([
        rule('RULE-Z', 'CLAIM-Z'),
        rule('RULE-A', 'CLAIM-A'),
        rule('RULE-M', 'CLAIM-M'),
      ]),
    );

    expect(plan.stages).toHaveLength(1);
    expect(plan.orderedRuleRefs.map((ref) => ref.id)).toEqual(['RULE-A', 'RULE-M', 'RULE-Z']);
  });

  test('same logical registry yields identical execution-plan identity', () => {
    const rules = [
      rule('RULE-PRODUCER', 'CLAIM-BASE'),
      rule('RULE-CONSUMER', 'CLAIM-SYNTH', { requiredClaimType: 'CLAIM-BASE' }),
    ];

    const first = buildInterpretationExecutionPlan(registry(rules));
    const second = buildInterpretationExecutionPlan(registry([...rules].reverse()));

    expect(first.executionPlanId).toBe(second.executionPlanId);
    expect(first.planHash).toBe(second.planHash);
    expect(first).toEqual(second);
  });

  test('explicit dependency cycle is rejected instead of choosing an arbitrary order', () => {
    const a = rule('RULE-A', 'CLAIM-A', { requires: ['RULE-B'] });
    const b = rule('RULE-B', 'CLAIM-B', { requires: ['RULE-A'] });

    expect(() => buildInterpretationExecutionPlan(registry([a, b]))).toThrow(
      ExecutionPlanError,
    );
    try {
      buildInterpretationExecutionPlan(registry([a, b]));
    } catch (error) {
      expect((error as ExecutionPlanError).code).toBe('EXECUTION_PLAN_INVALID_CYCLE');
    }
  });

  test('missing required claim producer rejects the plan', () => {
    const consumer = rule('RULE-CONSUMER', 'CLAIM-SYNTH', {
      requiredClaimType: 'CLAIM-NOT-PRODUCED',
    });

    expect(() => buildInterpretationExecutionPlan(registry([consumer]))).toThrow(
      ExecutionPlanError,
    );
    try {
      buildInterpretationExecutionPlan(registry([consumer]));
    } catch (error) {
      expect((error as ExecutionPlanError).code).toBe('CLAIM_DEPENDENCY_MISSING');
    }
  });

  test('production pack rejects research rules even if the rule set is enabled', () => {
    const researchRule = rule('RULE-RESEARCH', 'CLAIM-RESEARCH', { status: 'research' });

    expect(() => buildInterpretationExecutionPlan(registry([researchRule]))).toThrow(
      ExecutionPlanError,
    );
    try {
      buildInterpretationExecutionPlan(registry([researchRule]));
    } catch (error) {
      expect((error as ExecutionPlanError).code).toBe('RULE_NOT_EXECUTABLE_FOR_PACK');
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
