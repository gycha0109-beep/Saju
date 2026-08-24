import { describe, expect, test } from 'vitest';
import {
  RegistryConfigurationError,
  createRuleRegistrySnapshot,
  verifyResolvedRegistryContentIntegrity,
  type ClaimTypeDefinition,
  type ClaimValueSchemaDefinition,
  type InterpretationPack,
  type MethodologyDefinition,
  type ResolvedRuleRegistrySnapshot,
  type RuleDefinition,
} from '../src/index.js';

const SCHEMA: ClaimValueSchemaDefinition = {
  schemaId: 'SCHEMA-CAREER-PATTERN-V1',
  version: '1.0.0',
  root: {
    kind: 'object',
    required: ['semanticKey', 'axis', 'pattern', 'narrativeRole', 'forbiddenInferences'],
    properties: {
      semanticKey: { kind: 'string' },
      axis: {
        kind: 'string',
        enum: [
          'execution_style',
          'decision_style',
          'work_environment',
          'responsibility',
          'value_creation',
          'collaboration',
          'tension',
        ],
      },
      pattern: { kind: 'string' },
      narrativeRole: {
        kind: 'string',
        enum: ['primary_candidate', 'secondary', 'tension', 'limitation'],
      },
      forbiddenInferences: { kind: 'array', items: { kind: 'string' } },
    },
    additionalProperties: false,
  },
};

const CLAIM_TYPE: ClaimTypeDefinition = {
  claimType: 'CAREER_PERSONALIZED_PATTERN',
  version: '1.0.0',
  valueSchemaRef: { id: SCHEMA.schemaId, version: SCHEMA.version },
  scope: 'natal',
  exclusiveValue: false,
  scenarioSensitive: true,
  materialForNarrative: true,
  allowedTaxonomyTiers: ['T8'],
};

function method(inputContract: MethodologyDefinition['inputContract'] = undefined): MethodologyDefinition {
  return {
    methodologyId: 'METHOD-PERSONALIZED-CLAIM-CONTRACT',
    version: '1.0.0',
    family: 'domain_synthesis',
    name: 'Personalized claim contract fixture',
    description: 'Synthetic test methodology.',
    assumptions: ['Synthetic fixture only.'],
    requiredFactTypes: ['derivedFacts.tenGods.month.stem'],
    ...(inputContract === undefined ? {} : { inputContract }),
    sourceIds: [],
    status: 'research',
  };
}

function outputValue() {
  return {
    semanticKey: 'CAREER_EXECUTION_SYNTHETIC',
    axis: 'execution_style',
    pattern: 'synthetic_pattern',
    narrativeRole: 'primary_candidate',
    forbiddenInferences: ['specific_occupation', 'career_success'],
  } as const;
}

function rule(overrides: Partial<RuleDefinition> = {}): RuleDefinition {
  return {
    ruleId: 'RULE-PERSONALIZED-CLAIM-CONTRACT',
    version: '1.0.0',
    ruleSetId: 'personalized-career',
    taxonomy: { tier: 'T8', category: 'career', subcategory: 'execution_style' },
    methodologyRef: { id: 'METHOD-PERSONALIZED-CLAIM-CONTRACT', version: '1.0.0' },
    title: 'Personalized contract fixture',
    description: 'Synthetic strict contract rule.',
    inputs: [],
    condition: { op: 'exists', value: { kind: 'literal', value: true } },
    output: {
      claimType: CLAIM_TYPE.claimType,
      subject: 'natal_chart',
      predicate: 'career_pattern',
      value: outputValue(),
    },
    sourceRefs: [],
    quality: {
      provenanceQuality: 'unknown',
      testCoverage: 'unit',
      methodologyStability: 'experimental',
      reviewerStatus: 'unreviewed',
    },
    status: 'research',
    ...overrides,
  };
}

function pack(strict = true): InterpretationPack {
  return {
    packId: 'PACK-PERSONALIZED-CLAIM-CONTRACT',
    version: '1.0.0',
    name: 'Personalized claim contract fixture',
    methodologyRefs: [{ id: 'METHOD-PERSONALIZED-CLAIM-CONTRACT', version: '1.0.0' }],
    enabledRuleSets: ['personalized-career'],
    conflictPolicy: 'preserve_all',
    ambiguityPolicy: 'propagate',
    compositionPolicyRef: { id: 'COMPOSITION-PERSONALIZED-CLAIM-CONTRACT', version: '1.0.0' },
    ...(strict ? { claimContractMode: 'registered_required' as const } : {}),
    status: 'research',
  };
}

function expectRegistryError(code: RegistryConfigurationError['code'], action: () => unknown): void {
  try {
    action();
    throw new Error(`Expected ${code}.`);
  } catch (error) {
    expect(error).toBeInstanceOf(RegistryConfigurationError);
    if (!(error instanceof RegistryConfigurationError)) throw error;
    expect(error.code).toBe(code);
  }
}

describe('personalized claim contract registry foundation', () => {
  test('legacy permissive registries remain valid without claim definitions', () => {
    const resolved = createRuleRegistrySnapshot(
      { rules: [rule()], methodologies: [method()], sources: [] },
      pack(false),
    );

    expect(resolved.claimTypeDefinitions).toEqual([]);
    expect(resolved.claimValueSchemas).toEqual([]);
    expect(resolved.snapshot.claimTypeDefinitions).toBeUndefined();
    expect(resolved.snapshot.claimValueSchemas).toBeUndefined();
    expect(verifyResolvedRegistryContentIntegrity(resolved)).toEqual([]);
  });

  test('strict packs reject unregistered output claim types', () => {
    expectRegistryError('RULE_CLAIM_TYPE_UNREGISTERED', () =>
      createRuleRegistrySnapshot(
        { rules: [rule()], methodologies: [method()], sources: [] },
        pack(true),
      ),
    );
  });

  test('strict packs accept a registered structured semantic claim and pin its contracts', () => {
    const resolved = createRuleRegistrySnapshot(
      {
        rules: [rule()],
        methodologies: [method()],
        sources: [],
        claimTypeDefinitions: [CLAIM_TYPE],
        claimValueSchemas: [SCHEMA],
      },
      pack(true),
    );

    expect(resolved.claimTypeDefinitions).toHaveLength(1);
    expect(resolved.claimValueSchemas).toHaveLength(1);
    expect(resolved.snapshot.claimTypeDefinitions).toHaveLength(1);
    expect(resolved.snapshot.claimValueSchemas).toHaveLength(1);
    expect(Object.isFrozen(resolved.claimTypeDefinitions[0])).toBe(true);
    expect(Object.isFrozen(resolved.claimValueSchemas[0])).toBe(true);
    expect(verifyResolvedRegistryContentIntegrity(resolved)).toEqual([]);
  });

  test('registered claim contracts reject consumer prose or other undeclared fields', () => {
    const badRule = rule({
      output: {
        ...rule().output,
        value: { ...outputValue(), summary: 'consumer prose must not live in the semantic claim' },
      },
    });

    expectRegistryError('RULE_CLAIM_VALUE_SCHEMA_MISMATCH', () =>
      createRuleRegistrySnapshot(
        {
          rules: [badRule],
          methodologies: [method()],
          sources: [],
          claimTypeDefinitions: [CLAIM_TYPE],
          claimValueSchemas: [SCHEMA],
        },
        pack(true),
      ),
    );
  });

  test('registered claim contracts reject taxonomy tiers outside the definition', () => {
    const badRule = rule({ taxonomy: { tier: 'T5', category: 'career' } });

    expectRegistryError('RULE_CLAIM_TAXONOMY_NOT_ALLOWED', () =>
      createRuleRegistrySnapshot(
        {
          rules: [badRule],
          methodologies: [method()],
          sources: [],
          claimTypeDefinitions: [CLAIM_TYPE],
          claimValueSchemas: [SCHEMA],
        },
        pack(true),
      ),
    );
  });

  test('methodology input contracts admit precise declared fact paths', () => {
    const contractedMethod = method({
      factInputs: [
        {
          source: 'derived_fact',
          pathPattern: 'derivedFacts.tenGods.month.stem',
          mode: 'allowed',
          rationale: 'Synthetic precise-path contract.',
        },
      ],
    });
    const contractedRule = rule({
      inputs: [
        {
          key: 'monthStemTenGod',
          source: 'derived_fact',
          pathOrClaimType: 'derivedFacts.tenGods.month.stem',
          acceptedStatuses: ['resolved'],
          required: true,
          ambiguityBehavior: 'scenario_preserving',
        },
      ],
    });

    expect(() =>
      createRuleRegistrySnapshot(
        {
          rules: [contractedRule],
          methodologies: [contractedMethod],
          sources: [],
          claimTypeDefinitions: [CLAIM_TYPE],
          claimValueSchemas: [SCHEMA],
        },
        pack(true),
      ),
    ).not.toThrow();
  });

  test('methodology input contracts reject undeclared broad-object fact access', () => {
    const contractedMethod = method({
      factInputs: [
        {
          source: 'derived_fact',
          pathPattern: 'derivedFacts.tenGods.month.stem',
          mode: 'allowed',
          rationale: 'Only the precise path is allowed.',
        },
      ],
    });
    const broadRule = rule({
      inputs: [
        {
          key: 'allTenGods',
          source: 'derived_fact',
          pathOrClaimType: 'derivedFacts.tenGods',
          acceptedStatuses: ['resolved'],
          required: true,
          ambiguityBehavior: 'scenario_preserving',
        },
      ],
    });

    expectRegistryError('RULE_INPUT_NOT_ALLOWED_BY_METHODOLOGY', () =>
      createRuleRegistrySnapshot(
        {
          rules: [broadRule],
          methodologies: [contractedMethod],
          sources: [],
          claimTypeDefinitions: [CLAIM_TYPE],
          claimValueSchemas: [SCHEMA],
        },
        pack(true),
      ),
    );
  });

  test('methodology input contracts reject explicitly forbidden inputs', () => {
    const contractedMethod = method({
      factInputs: [
        {
          source: 'derived_fact',
          pathPattern: 'derivedFacts.tenGods.**',
          mode: 'forbidden',
          rationale: 'Synthetic forbidden subtree.',
        },
      ],
    });
    const contractedRule = rule({
      inputs: [
        {
          key: 'monthStemTenGod',
          source: 'derived_fact',
          pathOrClaimType: 'derivedFacts.tenGods.month.stem',
          acceptedStatuses: ['resolved'],
          required: true,
          ambiguityBehavior: 'scenario_preserving',
        },
      ],
    });

    expectRegistryError('RULE_INPUT_NOT_ALLOWED_BY_METHODOLOGY', () =>
      createRuleRegistrySnapshot(
        {
          rules: [contractedRule],
          methodologies: [contractedMethod],
          sources: [],
          claimTypeDefinitions: [CLAIM_TYPE],
          claimValueSchemas: [SCHEMA],
        },
        pack(true),
      ),
    );
  });

  test('strict validation applies only to rule sets actually enabled by the pack', () => {
    const legacyRule = rule({
      ruleId: 'RULE-LEGACY-UNREGISTERED',
      ruleSetId: 'legacy-career',
      output: { ...rule().output, claimType: 'LEGACY-UNREGISTERED-CLAIM' },
    });

    expect(() =>
      createRuleRegistrySnapshot(
        {
          rules: [rule(), legacyRule],
          methodologies: [method()],
          sources: [],
          claimTypeDefinitions: [CLAIM_TYPE],
          claimValueSchemas: [SCHEMA],
        },
        pack(true),
      ),
    ).not.toThrow();
  });

  test('claim contract content tampering is detected by registry integrity verification', () => {
    const resolved = createRuleRegistrySnapshot(
      {
        rules: [rule()],
        methodologies: [method()],
        sources: [],
        claimTypeDefinitions: [CLAIM_TYPE],
        claimValueSchemas: [SCHEMA],
      },
      pack(true),
    );
    const definition = resolved.claimTypeDefinitions[0];
    if (definition === undefined) throw new Error('fixture requires a claim type definition');
    const forged: ResolvedRuleRegistrySnapshot = {
      ...resolved,
      claimTypeDefinitions: [{ ...definition, materialForNarrative: false }],
    };

    expect(verifyResolvedRegistryContentIntegrity(forged)).toContain(
      'claim type definition content differs from registry snapshot',
    );
  });
});
