import { describe, expect, it } from 'vitest';
import type { FaceAuthorityRegistry, FaceRuleExpression } from './contracts.js';
import {
  FACE_AUTHORITY_RESEARCH_REGISTRY_V0 as registry,
  FACE_RESEARCH_PACK_V0 as pack,
} from './research-pack-v0.js';
import { evaluateFaceRuleExpression, evaluateRegisteredFaceRule } from './rule-evaluation.js';

const rule = registry.rules[0]!;
const packRef = `${pack.packId}@${pack.version}`;
const ruleRef = `${rule.ruleId}@${rule.version}`;
const run = (overrides: Partial<Parameters<typeof evaluateRegisteredFaceRule>[0]> = {}) =>
  evaluateRegisteredFaceRule({
    registry,
    methodologyPackRef: packRef,
    ruleRef,
    executionStatus: 'research',
    inputs: { threeDivisionRelation: 'upper_longest' },
    ...overrides,
  });
function withRule(changes: Partial<typeof rule>): FaceAuthorityRegistry {
  return { ...registry, rules: [{ ...rule, ...changes }] };
}

describe('closed declarative Face conditions', () => {
  it.each([
    [{ op: 'eq', input: 'x', value: 2 }, true],
    [{ op: 'in', input: 'x', values: [1, 2] }, true],
    [{ op: 'lt', input: 'x', value: 2 }, false],
    [{ op: 'lte', input: 'x', value: 2 }, true],
    [{ op: 'gt', input: 'x', value: 2 }, false],
    [{ op: 'gte', input: 'x', value: 2 }, true],
    [{ op: 'between', input: 'x', min: 2, max: 3 }, true],
    [{ op: 'exists', input: 'x' }, true],
  ] as const)('evaluates %j', (expression, expected) => {
    expect(evaluateFaceRuleExpression(expression, { x: 2 })).toBe(expected);
  });

  it('never coerces numeric strings or converts unknown through not', () => {
    const expression: FaceRuleExpression = {
      op: 'not',
      expression: { op: 'gt', input: 'x', value: 1 },
    };
    for (const inputs of [{}, { x: null }, { x: '2' }, { x: [] }]) {
      expect(evaluateFaceRuleExpression(expression, inputs)).toBeNull();
    }
    expect(evaluateFaceRuleExpression({ op: 'eq', input: 'x', value: 2 }, { x: '2' })).toBe(false);
    expect(evaluateFaceRuleExpression({ op: 'exists', input: 'x' }, { x: 0 })).toBe(true);
    expect(evaluateFaceRuleExpression({ op: 'exists', input: 'x' }, {})).toBe(false);
  });

  it('preserves three-valued boolean logic and validates every branch', () => {
    const unknown: FaceRuleExpression = { op: 'eq', input: 'missing', value: true };
    const yes: FaceRuleExpression = { op: 'exists', input: 'x' };
    const no: FaceRuleExpression = { op: 'not', expression: yes };
    expect(
      evaluateFaceRuleExpression({ op: 'and', expressions: [yes, unknown] }, { x: true }),
    ).toBeNull();
    expect(evaluateFaceRuleExpression({ op: 'and', expressions: [no, unknown] }, { x: true })).toBe(
      false,
    );
    expect(evaluateFaceRuleExpression({ op: 'or', expressions: [yes, unknown] }, { x: true })).toBe(
      true,
    );
    expect(
      evaluateFaceRuleExpression({ op: 'or', expressions: [no, unknown] }, { x: true }),
    ).toBeNull();
    expect(() =>
      evaluateFaceRuleExpression(
        { op: 'or', expressions: [yes, { op: 'eval' }] } as unknown as FaceRuleExpression,
        { x: true },
      ),
    ).toThrow();
  });

  it('quantifies collection members with lexical $item and explicit empty-set behavior', () => {
    const expression = { op: 'gte', input: '$item', value: 2 } as const;
    expect(evaluateFaceRuleExpression({ op: 'all', input: 'xs', expression }, { xs: [2, 3] })).toBe(
      true,
    );
    expect(evaluateFaceRuleExpression({ op: 'all', input: 'xs', expression }, { xs: [1, 3] })).toBe(
      false,
    );
    expect(evaluateFaceRuleExpression({ op: 'any', input: 'xs', expression }, { xs: [1, 3] })).toBe(
      true,
    );
    expect(evaluateFaceRuleExpression({ op: 'all', input: 'xs', expression }, { xs: [] })).toBe(
      true,
    );
    expect(evaluateFaceRuleExpression({ op: 'any', input: 'xs', expression }, { xs: [] })).toBe(
      false,
    );
    expect(
      evaluateFaceRuleExpression({ op: 'all', input: 'xs', expression }, { xs: ['unknown'] }),
    ).toBeNull();
    expect(evaluateFaceRuleExpression({ op: 'any', input: 'xs', expression }, {})).toBeNull();
    expect(() => evaluateFaceRuleExpression(expression, {})).toThrow();
    expect(() =>
      evaluateFaceRuleExpression({ op: 'all', input: 'xs', expression }, { xs: [], $item: 3 }),
    ).toThrow();
  });

  it.each([
    { op: 'between', input: 'x', min: 3, max: 1 },
    { op: 'eq', input: 'x', value: {} },
    { op: 'gt', input: 'x', value: Infinity },
    { op: 'and', expressions: [] },
    { op: 'eq', input: 'x', value: 1, script: 'unapproved' },
    { op: 'exists', input: 'constructor' },
  ])('rejects invalid expression %j', (expression) => {
    expect(() => evaluateFaceRuleExpression(expression as FaceRuleExpression, { x: 2 })).toThrow();
  });

  it('rejects non-JSON values, sparse arrays, accessors, cycles and excessive work', () => {
    const expression = { op: 'exists', input: 'x' } as const;
    expect(() => evaluateFaceRuleExpression(expression, { x: NaN })).toThrow();
    expect(() => evaluateFaceRuleExpression(expression, { x: Array(2) as number[] })).toThrow();
    let called = false;
    const accessor = Object.defineProperty({}, 'x', {
      enumerable: true,
      get() {
        called = true;
        return true;
      },
    });
    expect(() => evaluateFaceRuleExpression(expression, accessor)).toThrow();
    expect(called).toBe(false);
    const cyclic = { op: 'not', expression: null } as unknown as {
      op: 'not';
      expression: FaceRuleExpression;
    };
    cyclic.expression = cyclic;
    expect(() => evaluateFaceRuleExpression(cyclic, {})).toThrow(/resource limit/u);
    const nested = {
      op: 'all',
      input: 'xs',
      expression: { op: 'all', input: 'xs', expression: { op: 'exists', input: '$item' } },
    } as const;
    expect(() => evaluateFaceRuleExpression(nested, { xs: Array(65).fill(1) as number[] })).toThrow(
      /resource limit/u,
    );
  });
});

describe('existing authority registry and exact-version execution', () => {
  it('executes the existing research rule, deterministically, with source trace and semantic template only', () => {
    const result = run();
    expect(result).toEqual(run());
    expect(result.outcome).toBe('matched');
    expect(result.executionStatus).toBe('research');
    expect(result.output).toEqual(rule.output);
    const passage = registry.passages.find((entry) => entry.passageId === result.sourceRefs[0])!;
    const witness = registry.witnesses.find((entry) => entry.witnessId === passage.witnessId)!;
    expect(registry.works.some((entry) => entry.workId === witness.workId)).toBe(true);
    expect(run({ inputs: { threeDivisionRelation: 'lower_longest' } }).outcome).toBe('not_matched');
    expect(Object.isFrozen(result.output)).toBe(true);
  });

  it('isolates missing required inputs and preserves unknown optional observations through negation', () => {
    expect(run({ inputs: {} })).toMatchObject({
      outcome: 'unavailable',
      output: null,
      missingInputKeys: ['threeDivisionRelation'],
    });
    const optional = withRule({
      inputs: rule.inputs.map((entry) => ({ ...entry, required: false })),
      condition: { op: 'not', expression: rule.condition },
    });
    expect(run({ registry: optional, inputs: {} }).outcome).toBe('unavailable');
    expect(run().outcome).toBe('matched');
  });

  it('blocks research production, unpinned refs, disabled tiers and unselected methodology', () => {
    expect(() => run({ executionStatus: 'production_authorized' })).toThrow(/production/u);
    expect(() => run({ ruleRef: rule.ruleId })).toThrow(/exact/u);
    expect(() => run({ methodologyPackRef: pack.packId })).toThrow(/exact/u);
    expect(() =>
      run({ registry: { ...registry, methodologyPacks: [{ ...pack, enabledTiers: ['F0'] }] } }),
    ).toThrow(/disabled/u);
    expect(() =>
      run({
        registry: { ...registry, methodologyPacks: [{ ...pack, methodologyDefinitionRefs: [] }] },
      }),
    ).toThrow(/outside/u);
  });

  it('reuses claim/source authority checks, blocks color inputs and undeclared condition references', () => {
    expect(() =>
      run({
        registry: withRule({
          output: { claimType: 'UNREGISTERED', semanticKey: 'synthetic.test' },
        }),
      }),
    ).toThrow(/claimType/u);
    expect(() => run({ registry: withRule({ sourceRefs: ['passage.missing'] }) })).toThrow();
    expect(() =>
      run({ registry: withRule({ condition: { op: 'exists', input: 'other' } }) }),
    ).toThrow(/undeclared/u);
    expect(() => run({ inputs: { threeDivisionRelation: 'upper_longest', extra: true } })).toThrow(
      /undeclared/u,
    );
    const forbidden = withRule({
      inputs: [{ ...rule.inputs[0]!, inputKey: 'observations.colorAppearance.hue' }],
    });
    expect(() => run({ registry: forbidden, inputs: {} })).toThrow(/forbidden/u);
  });

  it('does not mix region maps from different methodologies or copy prose into templates', () => {
    expect(() =>
      run({ registry: { ...registry, methodologyPacks: [{ ...pack, regionMapRefs: [] }] } }),
    ).toThrow(/region map/u);
    const metricMap = registry.metrics.find(
      (entry) => entry.regionMapRef !== undefined,
    )!.regionMapRef!;
    const mixed = {
      ...registry,
      regionMaps: registry.regionMaps.map((entry) =>
        `${entry.regionMapId}@${entry.version}` === metricMap
          ? {
              ...entry,
              methodologyRef: pack.methodologyDefinitionRefs.find(
                (ref) => ref !== rule.methodologyRef,
              )!,
            }
          : entry,
      ),
    };
    expect(() => run({ registry: mixed })).toThrow(/region map/u);
    const prose = { ...rule.output, text: 'consumer prose' };
    expect(() => run({ registry: withRule({ output: prose }) })).toThrow(/template/u);
    expect(() =>
      run({
        registry: withRule({ output: { ...rule.output, semanticKey: 'consumer prose sentence' } }),
      }),
    ).toThrow(/identifier/u);
    const nestedProse = {
      ...rule.output,
      pattern: { text: 'consumer prose' },
    } as unknown as typeof rule.output;
    expect(() => run({ registry: withRule({ output: nestedProse }) })).toThrow(/identifier/u);
  });

  it('enforces production dependencies using an explicitly synthetic registry, without promoting real content', () => {
    const passage = {
      passageId: 'passage.synthetic.test',
      witnessId: 'witness.synthetic.test',
      originalText: 'Synthetic fixture, not a traditional authority',
      verificationStatus: 'scan_checked' as const,
    };
    const methodRef = 'method.synthetic.test@1.0.0';
    const metricRef = 'metric.synthetic.test@1.0.0';
    const syntheticRule = {
      ...rule,
      ruleId: 'rule.synthetic.test',
      version: '1.0.0',
      methodologyRef: methodRef,
      sourceRefs: [passage.passageId],
      promotionStatus: 'production_authorized' as const,
      inputs: [{ inputKey: 'x', sourceType: 'metric' as const, ref: metricRef, required: true }],
      condition: { op: 'exists', input: 'x' } as const,
      output: { claimType: rule.output.claimType, semanticKey: 'synthetic.observation.present' },
      laterality: {
        schemaVersion: 'fr21a-v1' as const,
        outputRequirement: 'side_invariant' as const,
        inputs: [{ inputRef: 'x', sensitivity: 'side_invariant' as const }],
      },
    };
    const synthetic: FaceAuthorityRegistry = {
      works: [
        {
          workId: 'work.synthetic.test',
          canonicalTitle: 'Synthetic',
          alternateTitles: [],
          attributedAuthors: [],
          sourceClass: 'modern_secondary',
        },
      ],
      witnesses: [
        {
          witnessId: passage.witnessId,
          workId: 'work.synthetic.test',
          editionLabel: 'Synthetic only',
          witnessStatus: 'verified',
        },
      ],
      passages: [passage],
      lineage: [],
      conflicts: [],
      regionMaps: [],
      operationalizations: [],
      methodologies: [
        {
          methodologyId: 'method.synthetic.test',
          version: '1.0.0',
          traditionalTerm: 'Synthetic',
          scope: 'static_face',
          sourceRefs: [passage.passageId],
          description: 'Synthetic only',
          limitations: ['No real authority'],
          reviewStatus: 'production_authorized',
        },
      ],
      metrics: [
        {
          metricKey: 'metric.synthetic.test',
          version: '1.0.0',
          methodologyRef: methodRef,
          sourceRefs: [passage.passageId],
          formula: 'synthetic_anchor',
          requiredAnchorRefs: ['synthetic_anchor'],
          unit: 'ratio',
          stabilityRequirements: ['synthetic only'],
          reviewStatus: 'production_authorized',
          laterality: {
            schemaVersion: 'fr21a-v1',
            outputRequirement: 'side_invariant',
            inputs: [{ inputRef: 'synthetic_anchor', sensitivity: 'side_invariant' }],
          },
        },
      ],
      claimTypes: registry.claimTypes,
      comparisonPolicies: [],
      rules: [syntheticRule],
      methodologyPacks: [
        {
          ...pack,
          packId: 'pack.synthetic.test',
          version: '1.0.0',
          methodologyDefinitionRefs: [methodRef],
          regionMapRefs: [],
          comparisonPolicyRef: 'comparison.synthetic.test@1.0.0',
        },
      ],
    };
    const productionRegistry: FaceAuthorityRegistry = {
      ...synthetic,
      comparisonPolicies: [{ policyId: 'comparison.synthetic.test', version: '1.0.0', groups: [] }],
    };
    const execute = (selected = productionRegistry) =>
      run({
        registry: selected,
        ruleRef: 'rule.synthetic.test@1.0.0',
        methodologyPackRef: 'pack.synthetic.test@1.0.0',
        executionStatus: 'production_authorized',
        inputs: { x: 1 },
      });
    expect(execute().outcome).toBe('matched');
    expect(() =>
      execute({
        ...productionRegistry,
        witnesses: productionRegistry.witnesses.map((entry) => ({
          ...entry,
          witnessStatus: 'candidate',
        })),
      }),
    ).toThrow(/verified source witness/u);
    expect(() =>
      execute({
        ...productionRegistry,
        methodologies: productionRegistry.methodologies.map((entry) => ({
          ...entry,
          reviewStatus: 'research',
        })),
      }),
    ).toThrow(/production/u);
    expect(() =>
      execute({
        ...productionRegistry,
        metrics: productionRegistry.metrics.map((entry) => ({
          ...entry,
          reviewStatus: 'research',
        })),
      }),
    ).toThrow(/production/u);
    expect(() =>
      execute({
        ...productionRegistry,
        passages: [{ ...passage, verificationStatus: 'unverified_ocr' }],
      }),
    ).toThrow(/scan_checked/u);
    expect(() =>
      execute({ ...productionRegistry, rules: [{ ...syntheticRule, tier: 'F5' }] }),
    ).toThrow();
  });
});
