import { describe, expect, it } from 'vitest';
import type { CanonicalSajuSnapshot } from '../src/contracts/calculation.js';
import { ambiguous, resolved } from '../src/contracts/common.js';
import type { RuleDefinition } from '../src/contracts/interpretation.js';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { evaluateRule } from '../src/interpretation/rule-evaluator.js';
import { createRuleRegistrySnapshot } from '../src/interpretation/rule-registry.js';
import { inspectMyeonghwaProductionComposition } from '../src/production/production-composition.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import {
  GENERAL_NATAL_SOURCE_CONDITION_CLAIM_DEFINITION,
  GENERAL_NATAL_SOURCE_CONDITION_CLAIM_TYPE,
  GENERAL_NATAL_SOURCE_CONDITION_FACT_PATHS,
  GENERAL_NATAL_SOURCE_CONDITION_METHODOLOGY,
  GENERAL_NATAL_SOURCE_CONDITION_PACK,
  GENERAL_NATAL_SOURCE_CONDITION_PRODUCER_VERSION,
  GENERAL_NATAL_SOURCE_CONDITION_RULES,
  GENERAL_NATAL_SOURCE_CONDITION_SOURCE,
  GENERAL_NATAL_SOURCE_CONDITION_VALUE_SCHEMA,
  createGeneralNatalSourceConditionCandidateRegistry,
  type GeneralNatalSourceConditionKey,
} from '../src/research/general-natal-source-conditioned-lower-tier-producer.js';

const FIXTURES = [
  {
    conditionKey: 'pian_cai_ge',
    factPath: GENERAL_NATAL_SOURCE_CONDITION_FACT_PATHS.pianCaiGe,
    payload: { patternEstablished: true, applicableContext: true },
    incompletePayload: { patternEstablished: true, applicableContext: false },
    requiredQualifiers: ['pattern_established', 'applicable_context'],
  },
  {
    conditionKey: 'yin_shou_ge_applicable_context',
    factPath: GENERAL_NATAL_SOURCE_CONDITION_FACT_PATHS.yinShouGeApplicable,
    payload: { patternEstablished: true, applicableContext: true },
    incompletePayload: { patternEstablished: false, applicableContext: true },
    requiredQualifiers: ['pattern_established', 'applicable_context'],
  },
  {
    conditionKey: 'shang_guan_shang_jin',
    factPath: GENERAL_NATAL_SOURCE_CONDITION_FACT_PATHS.shangGuanShangJin,
    payload: { qualificationSatisfied: true },
    incompletePayload: { qualificationSatisfied: false },
    requiredQualifiers: ['shang_guan_shang_jin'],
  },
  {
    conditionKey: 'shi_shen_ge_flourishing_no_clash_break',
    factPath: GENERAL_NATAL_SOURCE_CONDITION_FACT_PATHS.shiShenGeQualified,
    payload: {
      patternEstablished: true,
      dayMasterFlourishing: true,
      foodGodFlourishing: true,
      noClashBreak: true,
    },
    incompletePayload: {
      patternEstablished: true,
      dayMasterFlourishing: true,
      foodGodFlourishing: true,
      noClashBreak: false,
    },
    requiredQualifiers: [
      'pattern_established',
      'day_master_flourishing',
      'food_god_flourishing',
      'no_clash_break',
    ],
  },
] as const satisfies readonly {
  conditionKey: GeneralNatalSourceConditionKey;
  factPath: string;
  payload: Record<string, boolean>;
  incompletePayload: Record<string, boolean>;
  requiredQualifiers: readonly string[];
}[];

function snapshot(): CanonicalSajuSnapshot {
  return calculateCanonicalSajuSnapshot(
    {
      calendarType: 'solar',
      date: { year: 2024, month: 3, day: 10 },
      time: { known: true, hour: 12, minute: 0 },
      sexForTraditionalCalculation: 'unspecified',
    },
    PRODUCTION_DEFAULT_CALCULATION_POLICY,
    { now: new Date('2026-09-07T00:00:00.000Z') },
  );
}

function ruleFor(conditionKey: GeneralNatalSourceConditionKey): RuleDefinition {
  const rule = GENERAL_NATAL_SOURCE_CONDITION_RULES.find(
    (candidate) =>
      (candidate.output.value as { conditionKey: GeneralNatalSourceConditionKey }).conditionKey ===
      conditionKey,
  );
  if (rule === undefined) throw new Error(`Missing source-condition rule: ${conditionKey}`);
  return rule;
}

describe('general natal source-conditioned lower-tier producer', () => {
  it('is a strict research-only T3 producer with no review attestation or direct T8 output', () => {
    const registry = createGeneralNatalSourceConditionCandidateRegistry();

    expect(GENERAL_NATAL_SOURCE_CONDITION_PRODUCER_VERSION).toBe('0.1.0-research');
    expect(GENERAL_NATAL_SOURCE_CONDITION_PACK.status).toBe('research');
    expect(GENERAL_NATAL_SOURCE_CONDITION_PACK.claimContractMode).toBe('registered_required');
    expect(GENERAL_NATAL_SOURCE_CONDITION_METHODOLOGY.status).toBe('research');
    expect(GENERAL_NATAL_SOURCE_CONDITION_RULES).toHaveLength(4);
    expect(registry.reviewAttestations).toEqual([]);
    expect(registry.claimTypeDefinitions).toEqual([GENERAL_NATAL_SOURCE_CONDITION_CLAIM_DEFINITION]);
    expect(registry.claimValueSchemas).toEqual([GENERAL_NATAL_SOURCE_CONDITION_VALUE_SCHEMA]);
    expect(
      GENERAL_NATAL_SOURCE_CONDITION_RULES.every(
        (rule) =>
          rule.status === 'research' &&
          rule.quality.reviewerStatus === 'unreviewed' &&
          rule.quality.testCoverage === 'fixture_matrix' &&
          rule.taxonomy.tier === 'T3' &&
          rule.taxonomy.category === 'gyeokguk' &&
          rule.output.claimType === GENERAL_NATAL_SOURCE_CONDITION_CLAIM_TYPE,
      ),
    ).toBe(true);
    expect(GENERAL_NATAL_SOURCE_CONDITION_RULES.some((rule) => rule.taxonomy.tier === 'T8')).toBe(
      false,
    );
  });

  it.each(FIXTURES)(
    'emits one schema-bound T3 claim only when $conditionKey is explicitly resolved',
    ({ conditionKey, factPath, payload, requiredQualifiers }) => {
      const currentSnapshot = snapshot();
      const result = evaluateRule(ruleFor(conditionKey), {
        snapshot: currentSnapshot,
        pack: GENERAL_NATAL_SOURCE_CONDITION_PACK,
        factOverrides: { [factPath]: resolved(payload) },
        now: new Date('2026-09-07T00:00:00.000Z'),
      });

      expect(result.evaluation.status).toBe('matched');
      expect(result.claims).toHaveLength(1);
      expect(result.claims[0]).toMatchObject({
        claimType: GENERAL_NATAL_SOURCE_CONDITION_CLAIM_TYPE,
        taxonomy: {
          tier: 'T3',
          category: 'gyeokguk',
          subcategory: 'source_condition',
        },
        subject: 'natal_chart',
        predicate: 'source_condition_satisfied',
        polarity: 'neutral',
        value: {
          conditionKey,
          state: 'satisfied',
          requiredQualifiers,
          sourceConditionPreserved: true,
          rawTenGodPresenceSufficient: false,
          consumerMeaningAuthorized: false,
        },
      });
      expect(result.claims[0]?.factRefs).toContain(factPath);
      expect(result.claims[0]?.upstreamClaimRefs).toEqual([]);
    },
  );

  it.each(FIXTURES)(
    'does not emit $conditionKey when any required source qualifier is not satisfied',
    ({ conditionKey, factPath, incompletePayload }) => {
      const result = evaluateRule(ruleFor(conditionKey), {
        snapshot: snapshot(),
        pack: GENERAL_NATAL_SOURCE_CONDITION_PACK,
        factOverrides: { [factPath]: resolved(incompletePayload) },
        now: new Date('2026-09-07T00:00:00.000Z'),
      });

      expect(result.evaluation.status).toBe('not_matched');
      expect(result.claims).toEqual([]);
    },
  );

  it('does not treat ordinary derivedFacts.tenGods presence as a substitute for any source condition', () => {
    const currentSnapshot = snapshot();
    expect(currentSnapshot.derivedFacts.tenGods).toBeDefined();

    for (const rule of GENERAL_NATAL_SOURCE_CONDITION_RULES) {
      expect(rule.inputs.map((input) => input.pathOrClaimType)).not.toContain('derivedFacts.tenGods');
      const result = evaluateRule(rule, {
        snapshot: currentSnapshot,
        pack: GENERAL_NATAL_SOURCE_CONDITION_PACK,
        now: new Date('2026-09-07T00:00:00.000Z'),
      });
      expect(result.evaluation.status).toBe('skipped_missing_input');
      expect(result.claims).toEqual([]);
    }
  });

  it('preserves ambiguity instead of silently resolving a source condition', () => {
    const factPath = GENERAL_NATAL_SOURCE_CONDITION_FACT_PATHS.pianCaiGe;
    const result = evaluateRule(ruleFor('pian_cai_ge'), {
      snapshot: snapshot(),
      pack: GENERAL_NATAL_SOURCE_CONDITION_PACK,
      factOverrides: {
        [factPath]: ambiguous(
          [
            {
              candidateId: 'candidate-established',
              value: { patternEstablished: true, applicableContext: true },
              reasonRefs: ['fixture-established'],
            },
            {
              candidateId: 'candidate-not-established',
              value: { patternEstablished: false, applicableContext: true },
              reasonRefs: ['fixture-not-established'],
            },
          ],
          ['SOURCE_CONDITION_UNRESOLVED_FIXTURE'],
        ),
      },
      now: new Date('2026-09-07T00:00:00.000Z'),
    });

    expect(result.evaluation.status).toBe('skipped_ambiguous_input');
    expect(result.claims).toEqual([]);
  });

  it('does not fabricate source-condition claims in a real run when the upstream resolver is absent', () => {
    const execution = runInterpretation(snapshot(), createGeneralNatalSourceConditionCandidateRegistry(), {
      now: new Date('2026-09-07T00:00:00.000Z'),
    });

    expect(
      execution.claims.filter(
        (claim) => claim.claimType === GENERAL_NATAL_SOURCE_CONDITION_CLAIM_TYPE,
      ),
    ).toEqual([]);
    expect(execution.evaluations).toHaveLength(4);
    expect(
      execution.evaluations.every((evaluation) => evaluation.status === 'skipped_missing_input'),
    ).toBe(true);
  });

  it('rejects consumer-domain fields at the strict claim-value schema boundary', () => {
    const firstRule = GENERAL_NATAL_SOURCE_CONDITION_RULES[0];
    if (firstRule === undefined) throw new Error('Missing source-condition rule fixture.');
    const invalidRule = structuredClone(firstRule);
    invalidRule.output.value = {
      ...(invalidRule.output.value as Record<string, unknown>),
      personality: 'forbidden consumer meaning',
    };
    const rules = GENERAL_NATAL_SOURCE_CONDITION_RULES.map((rule, index) =>
      index === 0 ? invalidRule : rule,
    );

    expect(() =>
      createRuleRegistrySnapshot(
        {
          rules,
          methodologies: [GENERAL_NATAL_SOURCE_CONDITION_METHODOLOGY],
          sources: [GENERAL_NATAL_SOURCE_CONDITION_SOURCE],
          claimTypeDefinitions: [GENERAL_NATAL_SOURCE_CONDITION_CLAIM_DEFINITION],
          claimValueSchemas: [GENERAL_NATAL_SOURCE_CONDITION_VALUE_SCHEMA],
        },
        GENERAL_NATAL_SOURCE_CONDITION_PACK,
      ),
    ).toThrow(/additional property not allowed/);
  });

  it('remains blocked by production composition and cannot authorize Commerce work', () => {
    const inspection = inspectMyeonghwaProductionComposition({
      registry: createGeneralNatalSourceConditionCandidateRegistry(),
    });

    expect(inspection.status).toBe('blocked');
    if (inspection.status !== 'blocked') throw new Error('Expected blocked production composition.');
    expect(inspection.blockers).toContainEqual(
      expect.objectContaining({
        code: 'INTERPRETATION_PACK_NOT_PRODUCTION',
        component: 'interpretation',
      }),
    );
  });
});
