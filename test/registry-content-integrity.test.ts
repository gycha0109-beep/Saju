import { describe, expect, test } from 'vitest';
import {
  ExecutionPlanError,
  buildInterpretationExecutionPlan,
  createRuleRegistrySnapshot,
  verifyResolvedRegistryContentIntegrity,
  type InterpretationPack,
  type MethodologyDefinition,
  type ResolvedRuleRegistrySnapshot,
  type RuleDefinition,
} from '../src/index.js';

function methodology(): MethodologyDefinition {
  return {
    methodologyId: 'METHOD-REGISTRY-INTEGRITY',
    version: '1.0.0',
    family: 'structural_balance',
    name: 'Registry integrity methodology',
    description: 'Synthetic integrity fixture.',
    assumptions: ['Synthetic test only.'],
    requiredFactTypes: ['pillars.day'],
    sourceIds: [],
    status: 'research',
  };
}

function rule(): RuleDefinition {
  return {
    ruleId: 'RULE-REGISTRY-INTEGRITY',
    version: '1.0.0',
    ruleSetId: 'registry-integrity',
    taxonomy: { tier: 'T1', category: 'synthetic_integrity' },
    methodologyRef: { id: 'METHOD-REGISTRY-INTEGRITY', version: '1.0.0' },
    title: 'Original rule title',
    description: 'Synthetic integrity fixture.',
    inputs: [],
    condition: { op: 'exists', value: { kind: 'literal', value: true } },
    output: {
      claimType: 'CLAIM-REGISTRY-INTEGRITY',
      subject: 'synthetic',
      predicate: 'integrity_fixture',
      value: true,
    },
    sourceRefs: [],
    quality: {
      provenanceQuality: 'unknown',
      testCoverage: 'unit',
      methodologyStability: 'experimental',
      reviewerStatus: 'unreviewed',
    },
    status: 'research',
  };
}

function pack(): InterpretationPack {
  return {
    packId: 'PACK-REGISTRY-INTEGRITY',
    version: '1.0.0',
    name: 'Registry integrity pack',
    methodologyRefs: [{ id: 'METHOD-REGISTRY-INTEGRITY', version: '1.0.0' }],
    enabledRuleSets: ['registry-integrity'],
    conflictPolicy: 'preserve_all',
    ambiguityPolicy: 'propagate',
    compositionPolicyRef: { id: 'COMPOSITION-REGISTRY-INTEGRITY', version: '1.0.0' },
    status: 'research',
  };
}

function registry() {
  return createRuleRegistrySnapshot(
    { rules: [rule()], methodologies: [methodology()], sources: [] },
    pack(),
  );
}

function expectIntegrityFailure(action: () => unknown): void {
  try {
    action();
    throw new Error('Expected registry integrity failure.');
  } catch (error) {
    expect(error).toBeInstanceOf(ExecutionPlanError);
    if (!(error instanceof ExecutionPlanError)) throw error;
    expect(error.code).toBe('REGISTRY_CONTENT_INTEGRITY_FAILED');
  }
}

describe('content-addressed registry runtime integrity', () => {
  test('registry clones input so later caller mutation cannot alter executable authority', () => {
    const inputRule = rule();
    const inputMethod = methodology();
    const inputPack = pack();
    const resolved = createRuleRegistrySnapshot(
      { rules: [inputRule], methodologies: [inputMethod], sources: [] },
      inputPack,
    );

    inputRule.title = 'Caller changed this after registry creation';
    inputMethod.name = 'Caller changed methodology';
    inputPack.name = 'Caller changed pack';

    expect(resolved.rules[0]?.title).toBe('Original rule title');
    expect(resolved.methodologies[0]?.name).toBe('Registry integrity methodology');
    expect(resolved.pack.name).toBe('Registry integrity pack');
    expect(verifyResolvedRegistryContentIntegrity(resolved)).toEqual([]);
  });

  test('resolved authority objects are deeply frozen at runtime', () => {
    const resolved = registry();
    const firstRule = resolved.rules[0];
    if (firstRule === undefined) throw new Error('fixture requires one rule');

    expect(Object.isFrozen(resolved)).toBe(true);
    expect(Object.isFrozen(resolved.rules)).toBe(true);
    expect(Object.isFrozen(firstRule)).toBe(true);
    expect(Object.isFrozen(resolved.snapshot)).toBe(true);

    expect(() => {
      (firstRule as { title: string }).title = 'tampered';
    }).toThrow(TypeError);
  });

  test('execution rejects a forged rule body paired with the original snapshot', () => {
    const resolved = registry();
    const original = resolved.rules[0];
    if (original === undefined) throw new Error('fixture requires one rule');
    const forged: ResolvedRuleRegistrySnapshot = {
      ...resolved,
      rules: [{ ...original, title: 'forged after snapshot' }],
    };

    expect(verifyResolvedRegistryContentIntegrity(forged)).toContain(
      'rule content differs from registry snapshot',
    );
    expectIntegrityFailure(() => buildInterpretationExecutionPlan(forged));
  });

  test('execution rejects a forged pack body paired with the original packRef', () => {
    const resolved = registry();
    const forged: ResolvedRuleRegistrySnapshot = {
      ...resolved,
      pack: { ...resolved.pack, name: 'forged pack' },
    };

    expect(verifyResolvedRegistryContentIntegrity(forged)).toContain(
      'pack content differs from registry snapshot',
    );
    expectIntegrityFailure(() => buildInterpretationExecutionPlan(forged));
  });

  test('unmodified registry remains executable and internally self-consistent', () => {
    const resolved = registry();
    expect(verifyResolvedRegistryContentIntegrity(resolved)).toEqual([]);
    expect(buildInterpretationExecutionPlan(resolved).orderedRuleRefs).toHaveLength(1);
  });
});
