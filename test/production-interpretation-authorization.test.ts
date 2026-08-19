import { describe, expect, test } from 'vitest';
import {
  ExecutionPlanError,
  buildInterpretationExecutionPlan,
  createRuleRegistrySnapshot,
  type InterpretationPack,
  type MethodologyDefinition,
  type RuleDefinition,
  type SourceReference,
} from '../src/index.js';

const sourceA: SourceReference = {
  sourceId: 'SOURCE-I15-SYNTHETIC-A',
  sourceType: 'paper',
  title: 'Synthetic I15 authorization fixture A',
  provenanceTier: 'scholarly_secondary',
  rights: { copyrightStatus: 'unknown', reusePolicy: 'metadata_only' },
};
const sourceB: SourceReference = {
  sourceId: 'SOURCE-I15-SYNTHETIC-B',
  sourceType: 'paper',
  title: 'Synthetic I15 authorization fixture B',
  provenanceTier: 'scholarly_secondary',
  rights: { copyrightStatus: 'unknown', reusePolicy: 'metadata_only' },
};
const internalSource: SourceReference = {
  sourceId: 'SOURCE-I15-INTERNAL',
  sourceType: 'internal_research',
  title: 'Synthetic internal source',
  provenanceTier: 'internal',
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
      polarity: 'neutral',
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

function registry(
  packStatus: InterpretationPack['status'],
  methodStatus: MethodologyDefinition['status'],
  ruleStatus: RuleDefinition['status'],
  quality: RuleDefinition['quality'],
) {
  return createRuleRegistrySnapshot(
    {
      rules: [rule(ruleStatus, quality)],
      methodologies: [methodology(methodStatus)],
      sources: [sourceA, sourceB],
    },
    pack(packStatus),
  );
}

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

function expectPlanError(
  action: () => unknown,
  code: ExecutionPlanError['code'],
): void {
  try {
    action();
    throw new Error(`Expected ExecutionPlanError ${code}`);
  } catch (error) {
    expect(error).toBeInstanceOf(ExecutionPlanError);
    if (!(error instanceof ExecutionPlanError)) throw error;
    expect(error.code).toBe(code);
  }
}

describe('I15 production interpretation authorization gate', () => {
  test('research packs retain research/unreviewed execution behavior', () => {
    const plan = buildInterpretationExecutionPlan(
      registry('research', 'research', 'research', researchQuality),
    );
    expect(plan.orderedRuleRefs).toHaveLength(1);
  });

  test('production rejects a research methodology even if a rule is active', () => {
    expectPlanError(
      () =>
        buildInterpretationExecutionPlan(
          registry('production', 'research', 'active', productionQuality),
        ),
      'METHODOLOGY_NOT_EXECUTABLE_FOR_PACK',
    );
  });

  test('production rejects an active rule that has not received domain review', () => {
    expectPlanError(
      () =>
        buildInterpretationExecutionPlan(
          registry('production', 'active', 'active', {
            ...productionQuality,
            reviewerStatus: 'internal_reviewed',
          }),
        ),
      'RULE_QUALITY_NOT_AUTHORIZED_FOR_PACK',
    );
  });

  test('production rejects inadequate tests and heuristic provenance independently of active status', () => {
    expectPlanError(
      () =>
        buildInterpretationExecutionPlan(
          registry('production', 'active', 'active', {
            ...productionQuality,
            testCoverage: 'unit',
          }),
        ),
      'RULE_QUALITY_NOT_AUTHORIZED_FOR_PACK',
    );

    expectPlanError(
      () =>
        buildInterpretationExecutionPlan(
          registry('production', 'active', 'active', {
            ...productionQuality,
            provenanceQuality: 'heuristic',
          }),
        ),
      'RULE_QUALITY_NOT_AUTHORIZED_FOR_PACK',
    );
  });

  test('production accepts only an explicitly active and domain-reviewed high-evidence fixture', () => {
    const plan = buildInterpretationExecutionPlan(
      registry('production', 'active', 'active', productionQuality),
    );
    expect(plan.orderedRuleRefs).toHaveLength(1);
  });

  test('staging permits reviewed methodology plus internally reviewed unit-tested non-heuristic rule', () => {
    const plan = buildInterpretationExecutionPlan(
      registry('staging', 'reviewed', 'reviewed', stagingQuality),
    );
    expect(plan.orderedRuleRefs).toHaveLength(1);
  });

  test('staging rejects research methodology and heuristic or unknown rule provenance', () => {
    expectPlanError(
      () =>
        buildInterpretationExecutionPlan(
          registry('staging', 'research', 'reviewed', stagingQuality),
        ),
      'METHODOLOGY_NOT_EXECUTABLE_FOR_PACK',
    );

    expectPlanError(
      () =>
        buildInterpretationExecutionPlan(
          registry('staging', 'reviewed', 'reviewed', {
            ...stagingQuality,
            provenanceQuality: 'heuristic',
          }),
        ),
      'RULE_QUALITY_NOT_AUTHORIZED_FOR_PACK',
    );
  });

  test('production methodology must carry at least one explicit source reference', () => {
    const withoutSources = createRuleRegistrySnapshot(
      {
        rules: [rule('active', productionQuality, { sourceRefs: [] })],
        methodologies: [methodology('active', { sourceIds: [] })],
        sources: [],
      },
      pack('production'),
    );

    expectPlanError(
      () => buildInterpretationExecutionPlan(withoutSources),
      'METHODOLOGY_SOURCE_NOT_AUTHORIZED_FOR_PACK',
    );
  });

  test('production cross-checks multi-source declaration against actual source count', () => {
    const singleSource = createRuleRegistrySnapshot(
      {
        rules: [
          rule('active', productionQuality, {
            sourceRefs: [{ sourceId: sourceA.sourceId, supportType: 'implementation_reference' }],
          }),
        ],
        methodologies: [methodology('active', { sourceIds: [sourceA.sourceId] })],
        sources: [sourceA],
      },
      pack('production'),
    );

    expectPlanError(
      () => buildInterpretationExecutionPlan(singleSource),
      'RULE_SOURCE_NOT_AUTHORIZED_FOR_PACK',
    );
  });

  test('production rejects internal source tiers even when metadata claims high quality', () => {
    const internalRegistry = createRuleRegistrySnapshot(
      {
        rules: [
          rule('active', productionQuality, {
            sourceRefs: [
              { sourceId: sourceA.sourceId, supportType: 'implementation_reference' },
              { sourceId: internalSource.sourceId, supportType: 'implementation_reference' },
            ],
          }),
        ],
        methodologies: [
          methodology('active', { sourceIds: [sourceA.sourceId, internalSource.sourceId] }),
        ],
        sources: [sourceA, internalSource],
      },
      pack('production'),
    );

    expectPlanError(
      () => buildInterpretationExecutionPlan(internalRegistry),
      'METHODOLOGY_SOURCE_NOT_AUTHORIZED_FOR_PACK',
    );
  });
});
