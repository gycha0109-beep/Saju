import { describe, expect, test } from 'vitest';
import {
  buildInterpretationExecutionPlan,
  calculateCanonicalSajuSnapshot,
  createRuleRegistrySnapshot,
  evaluateRule,
  type CalculationPolicySnapshot,
  type InterpretationClaim,
  type InterpretationPack,
  type MethodologyDefinition,
  type RuleDefinition,
  type RuleInputRequirement,
} from '../src/index.js';

const calculationPolicy: CalculationPolicySnapshot = {
  policyId: 'myeonghwa/claim-selector-test',
  policyVersion: '1.0.0',
  dayBoundary: 'midnight',
  trueSolarTime: {
    enabled: false,
    longitudeSource: 'not-applicable',
    applyEquationOfTime: false,
    applyHistoricalDst: false,
  },
  timeZonePolicy: { source: 'service-default', timeZone: 'Asia/Seoul' },
  unknownBirthTimePolicy: 'preserve-unknown-and-enumerate-boundaries',
};

const pack: InterpretationPack = {
  packId: 'PACK-CLAIM-SELECTOR-TEST',
  version: '1.0.0',
  name: 'Claim selector infrastructure fixture',
  methodologyRefs: [{ id: 'METHOD-CLAIM-SELECTOR-TEST', version: '1.0.0' }],
  enabledRuleSets: ['selector-test'],
  conflictPolicy: 'preserve_all',
  ambiguityPolicy: 'propagate',
  compositionPolicyRef: { id: 'COMPOSITION-CLAIM-SELECTOR-TEST', version: '1.0.0' },
  status: 'research',
};

const methodology: MethodologyDefinition = {
  methodologyId: 'METHOD-CLAIM-SELECTOR-TEST',
  version: '1.0.0',
  family: 'domain_synthesis',
  name: 'Claim selector infrastructure fixture',
  description: 'Synthetic infrastructure-only methodology.',
  assumptions: ['No saju semantics.'],
  requiredFactTypes: [],
  sourceIds: [],
  status: 'research',
};

function snapshot() {
  return calculateCanonicalSajuSnapshot(
    {
      calendarType: 'solar',
      date: { year: 2024, month: 3, day: 10 },
      time: { known: true, hour: 12, minute: 0 },
      sexForTraditionalCalculation: 'unspecified',
    },
    calculationPolicy,
    { now: new Date('2026-08-24T10:00:00.000Z') },
  );
}

function upstream(
  claimId: string,
  options: {
    subcategory?: string;
    predicate?: string;
    semanticKey?: string;
    methodologyId?: string;
    scenarioRef?: string;
  } = {},
): InterpretationClaim {
  const stableSnapshot = snapshot();
  return {
    claimId,
    schemaVersion: 'synthetic',
    snapshotId: stableSnapshot.snapshotId,
    ...(options.scenarioRef === undefined ? {} : { scenarioRef: options.scenarioRef }),
    taxonomy: {
      tier: 'T5',
      category: 'ten_gods',
      ...(options.subcategory === undefined ? {} : { subcategory: options.subcategory }),
    },
    claimType: 'CLAIM-UPSTREAM-SELECTABLE',
    subject: 'natal_chart',
    predicate: options.predicate ?? 'ten_god_context',
    value: {
      semanticKey: options.semanticKey ?? 'SYNTHETIC-A',
      axis: 'synthetic',
    },
    methodologyRef: {
      id: options.methodologyId ?? 'METHOD-CLAIM-SELECTOR-TEST',
      version: '1.0.0',
    },
    ruleRefs: [],
    factRefs: [],
    upstreamClaimRefs: [],
    sourceRefs: [],
    state: 'active',
  };
}

function claimInput(
  overrides: Partial<RuleInputRequirement> = {},
): RuleInputRequirement {
  return {
    key: 'upstream',
    source: 'interpretation_claim',
    pathOrClaimType: 'CLAIM-UPSTREAM-SELECTABLE',
    required: true,
    ambiguityBehavior: 'scenario_preserving',
    ...overrides,
  };
}

function consumerRule(
  input: RuleInputRequirement,
  overrides: Partial<RuleDefinition> = {},
): RuleDefinition {
  return {
    ruleId: 'RULE-CLAIM-SELECTOR-CONSUMER',
    version: '1.0.0',
    ruleSetId: 'selector-test',
    taxonomy: { tier: 'T8', category: 'career' },
    methodologyRef: { id: methodology.methodologyId, version: methodology.version },
    title: 'Synthetic claim-selector consumer',
    description: 'Infrastructure-only rule.',
    inputs: [input],
    condition: { op: 'exists', value: { kind: 'input', key: input.key } },
    output: {
      claimType: 'CLAIM-SELECTOR-CONSUMER',
      subject: 'synthetic',
      predicate: 'selected',
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
    ...overrides,
  };
}

describe('bounded interpretation-claim selectors', () => {
  test('filters same-type claims by taxonomy, predicate, methodology, and structured value equality', () => {
    const selected = upstream('claim-selected', {
      subcategory: 'positioned_context',
      semanticKey: 'KEEP',
    });
    const wrongSubcategory = upstream('claim-wrong-subcategory', {
      subcategory: 'other',
      semanticKey: 'KEEP',
    });
    const wrongPredicate = upstream('claim-wrong-predicate', {
      subcategory: 'positioned_context',
      predicate: 'other',
      semanticKey: 'KEEP',
    });
    const wrongValue = upstream('claim-wrong-value', {
      subcategory: 'positioned_context',
      semanticKey: 'DROP',
    });
    const wrongMethod = upstream('claim-wrong-method', {
      subcategory: 'positioned_context',
      semanticKey: 'KEEP',
      methodologyId: 'METHOD-OTHER',
    });

    const rule = consumerRule(
      claimInput({
        cardinality: 'exactly_one',
        claimSelector: {
          taxonomy: {
            tiers: ['T5'],
            categories: ['ten_gods'],
            subcategories: ['positioned_context'],
          },
          subjects: ['natal_chart'],
          predicates: ['ten_god_context'],
          methodologyRefs: [{ id: methodology.methodologyId, version: methodology.version }],
          valueEquals: [{ path: 'semanticKey', value: 'KEEP' }],
        },
      }),
    );

    const result = evaluateRule(rule, {
      snapshot: snapshot(),
      pack,
      existingClaims: [wrongValue, wrongPredicate, selected, wrongMethod, wrongSubcategory],
    });

    expect(result.evaluation.status).toBe('matched');
    expect(result.evaluation.inputRefs[0]?.selectedClaimIds).toEqual(['claim-selected']);
    expect(result.claims[0]?.upstreamClaimRefs).toEqual(['claim-selected']);
  });

  test('exactly_one fails closed when multiple claims satisfy the selector', () => {
    const rule = consumerRule(claimInput({ cardinality: 'exactly_one' }));
    const result = evaluateRule(rule, {
      snapshot: snapshot(),
      pack,
      existingClaims: [upstream('claim-b'), upstream('claim-a')],
    });

    expect(result.evaluation.status).toBe('skipped_cardinality_mismatch');
    expect(result.evaluation.inputRefs[0]?.selectedClaimIds).toEqual(['claim-a', 'claim-b']);
    expect(result.claims).toEqual([]);
  });

  test('one_or_more always exposes a deterministic array and preserves all selected provenance', () => {
    const rule = consumerRule(claimInput({ cardinality: 'one_or_more' }));
    const only = upstream('claim-only', { semanticKey: 'ONLY' });
    const result = evaluateRule(rule, {
      snapshot: snapshot(),
      pack,
      existingClaims: [only],
    });

    expect(result.evaluation.status).toBe('matched');
    expect(result.evaluation.inputRefs[0]?.observedValue).toEqual([only.value]);
    expect(result.evaluation.inputRefs[0]?.selectedClaimIds).toEqual(['claim-only']);
    expect(result.claims[0]?.upstreamClaimRefs).toEqual(['claim-only']);
  });

  test('zero_or_more permits an empty deterministic array without inventing negative evidence', () => {
    const rule = consumerRule(
      claimInput({ required: false, cardinality: 'zero_or_more' }),
      {
        condition: {
          op: 'eq',
          left: { kind: 'input', key: 'upstream' },
          right: { kind: 'literal', value: [] },
        },
      },
    );
    const result = evaluateRule(rule, { snapshot: snapshot(), pack, existingClaims: [] });

    expect(result.evaluation.status).toBe('matched');
    expect(result.evaluation.inputRefs[0]?.observedValue).toEqual([]);
    expect(result.evaluation.inputRefs[0]?.selectedClaimIds).toEqual([]);
    expect(result.claims[0]?.upstreamClaimRefs).toEqual([]);
  });

  test('scenario-specific selection cannot consume a sibling scenario claim', () => {
    const global = upstream('claim-global', { semanticKey: 'GLOBAL' });
    const scenarioA = upstream('claim-scenario-a', { semanticKey: 'A', scenarioRef: 'scenario-a' });
    const scenarioB = upstream('claim-scenario-b', { semanticKey: 'B', scenarioRef: 'scenario-b' });
    const rule = consumerRule(claimInput({ cardinality: 'one_or_more' }));

    const result = evaluateRule(rule, {
      snapshot: snapshot(),
      pack,
      scenarioRef: 'scenario-a',
      existingClaims: [scenarioB, scenarioA, global],
    });

    expect(result.evaluation.status).toBe('matched');
    expect(result.evaluation.inputRefs[0]?.selectedClaimIds).toEqual([
      'claim-global',
      'claim-scenario-a',
    ]);
    expect(result.claims[0]?.scenarioRef).toBe('scenario-a');
    expect(result.claims[0]?.upstreamClaimRefs).toEqual(['claim-global', 'claim-scenario-a']);
  });

  test('legacy claim inputs retain scalar-one and array-many behavior when no cardinality is declared', () => {
    const rule = consumerRule(claimInput());
    const first = upstream('claim-a', { semanticKey: 'A' });
    const second = upstream('claim-b', { semanticKey: 'B' });

    const single = evaluateRule(rule, {
      snapshot: snapshot(),
      pack,
      existingClaims: [first],
    });
    expect(single.evaluation.status).toBe('matched');
    expect(single.evaluation.inputRefs[0]?.observedValue).toEqual(first.value);

    const multiple = evaluateRule(rule, {
      snapshot: snapshot(),
      pack,
      existingClaims: [second, first],
    });
    expect(multiple.evaluation.status).toBe('matched');
    expect(multiple.evaluation.inputRefs[0]?.selectedClaimIds).toEqual(['claim-a', 'claim-b']);
    expect(multiple.evaluation.inputRefs[0]?.observedValue).toEqual([first.value, second.value]);
  });

  test('claim-only selector fields on a fact input fail closed as an error evaluation', () => {
    const rule = consumerRule({
      key: 'day',
      source: 'canonical_fact',
      pathOrClaimType: 'pillars.day',
      acceptedStatuses: ['resolved'],
      required: true,
      ambiguityBehavior: 'requires_resolved',
      claimSelector: { predicates: ['not-valid-for-facts'] },
    });

    const result = evaluateRule(rule, { snapshot: snapshot(), pack });
    expect(result.evaluation.status).toBe('error');
    expect(result.claims).toEqual([]);
  });

  test('contradictory required/cardinality declarations fail closed', () => {
    for (const input of [
      claimInput({ required: false, cardinality: 'exactly_one' }),
      claimInput({ required: false, cardinality: 'one_or_more' }),
      claimInput({ required: true, cardinality: 'zero_or_more' }),
    ]) {
      const result = evaluateRule(consumerRule(input), {
        snapshot: snapshot(),
        pack,
        existingClaims: [upstream('claim-one')],
      });
      expect(result.evaluation.status).toBe('error');
      expect(result.claims).toEqual([]);
    }
  });

  test('execution-plan staging still depends on the base claimType, not selector details', () => {
    const producer: RuleDefinition = {
      ...consumerRule(claimInput()),
      ruleId: 'RULE-CLAIM-SELECTOR-PRODUCER',
      inputs: [],
      condition: { op: 'exists', value: { kind: 'literal', value: true } },
      output: {
        claimType: 'CLAIM-UPSTREAM-SELECTABLE',
        subject: 'natal_chart',
        predicate: 'ten_god_context',
        value: { semanticKey: 'PRODUCED' },
      },
    };
    const consumer = consumerRule(
      claimInput({
        cardinality: 'exactly_one',
        claimSelector: {
          predicates: ['ten_god_context'],
          valueEquals: [{ path: 'semanticKey', value: 'PRODUCED' }],
        },
      }),
    );
    const registry = createRuleRegistrySnapshot(
      { rules: [producer, consumer], methodologies: [methodology], sources: [] },
      pack,
    );
    const plan = buildInterpretationExecutionPlan(registry);

    expect(plan.stages).toHaveLength(2);
    expect(plan.dependencyEdges).toContainEqual(
      expect.objectContaining({
        fromRuleRef: { id: producer.ruleId, version: producer.version },
        toRuleRef: { id: consumer.ruleId, version: consumer.version },
        reason: 'interpretation_claim_requirement',
        claimType: 'CLAIM-UPSTREAM-SELECTABLE',
      }),
    );
  });
});
