import type {
  ClaimTypeDefinition,
  ClaimValueSchemaDefinition,
  InterpretationPack,
  MethodologyDefinition,
  RuleDefinition,
  SourceReference,
} from '../contracts/interpretation.js';
import { createRuleRegistrySnapshot } from '../interpretation/rule-registry.js';

export const GENERAL_NATAL_SOURCE_CONDITION_PRODUCER_VERSION = '0.1.0-research' as const;
export const GENERAL_NATAL_SOURCE_CONDITION_CLAIM_TYPE = 'GEJU_SOURCE_CONDITION_STATE' as const;

const METHODOLOGY_ID = 'M-GEJU-SOURCE-CONDITION-NORMALIZATION';
const RULE_SET_ID = 'general-natal-source-conditioned-lower-tier-producer';
const VALUE_SCHEMA_ID = 'SCHEMA-GEJU-SOURCE-CONDITION-STATE';

export const GENERAL_NATAL_SOURCE_CONDITION_FACT_PATHS = Object.freeze({
  pianCaiGe: 'derivedFacts.generalNatalSourceConditions.pianCaiGe',
  yinShouGeApplicable: 'derivedFacts.generalNatalSourceConditions.yinShouGeApplicable',
  shangGuanShangJin: 'derivedFacts.generalNatalSourceConditions.shangGuanShangJin',
  shiShenGeQualified: 'derivedFacts.generalNatalSourceConditions.shiShenGeQualified',
} as const);

export type GeneralNatalSourceConditionKey =
  | 'pian_cai_ge'
  | 'yin_shou_ge_applicable_context'
  | 'shang_guan_shang_jin'
  | 'shi_shen_ge_flourishing_no_clash_break';

export const GENERAL_NATAL_SOURCE_CONDITION_SOURCE = Object.freeze({
  sourceId: 'SRC-GENERAL-NATAL-SAMYEONG-V5-SOURCE-CONDITIONS-KANRIPO',
  sourceType: 'classical_text',
  title: '三命通會（四庫全書本）卷五',
  language: 'zh-Hant',
  locator: {
    volume: '005',
    section: '偏財 / 印綬 / 傷官 / 食神',
    anchor: '[005-49a] / [005-56b] / [005-81b]-[005-82a] / [005-84b]',
  },
  provenanceTier: 'cross_reference',
  rights: {
    copyrightStatus: 'unknown',
    reusePolicy: 'metadata_only',
  },
  notes:
    'Research text surface used only to preserve the exact source-condition topology recorded by the 2026-09-07 General Natal authority review. This source object is not a production primary-witness promotion.',
} satisfies SourceReference);

export const GENERAL_NATAL_SOURCE_CONDITION_METHODOLOGY: MethodologyDefinition = Object.freeze({
  methodologyId: METHODOLOGY_ID,
  version: GENERAL_NATAL_SOURCE_CONDITION_PRODUCER_VERSION,
  family: 'gyeokguk',
  name: 'General Natal source-condition normalization candidate',
  description:
    'Research-only lower-tier producer that emits a T3 source-condition claim only when an upstream structural resolver has explicitly resolved the complete classical condition. It does not infer pattern establishment from generic Ten-God presence.',
  assumptions: [
    'This methodology normalizes already-resolved source conditions; it does not itself establish Gyeokguk from raw pillars or Ten-God presence.',
    'Missing or ambiguous upstream source-condition facts remain missing or ambiguous and must not be converted into a negative or positive condition.',
    'Generic 偏財, 印, 傷官, 食神, Wealth, Resource, or Output-family presence is not sufficient input for any rule in this producer.',
    'The emitted T3 claim is structural evidence only and does not authorize personality, health, body, lifespan, wealth magnitude, rank, spouse/child, timing, fortune polarity, work, money, or relationship conclusions.',
    'No source-condition claim produced here is production-authorized without an exact governed upstream resolver, claim review, ReviewAttestation, reviewer trust, and production preflight.',
  ],
  requiredFactTypes: Object.values(GENERAL_NATAL_SOURCE_CONDITION_FACT_PATHS),
  inputContract: {
    factInputs: Object.values(GENERAL_NATAL_SOURCE_CONDITION_FACT_PATHS).map((pathPattern) => ({
      source: 'derived_fact' as const,
      pathPattern,
      mode: 'required' as const,
      rationale:
        'The source-conditioned producer may consume only an explicit resolved structural/qualification fact for the exact classical condition.',
    })),
  },
  sourceIds: [GENERAL_NATAL_SOURCE_CONDITION_SOURCE.sourceId],
  status: 'research',
});

export const GENERAL_NATAL_SOURCE_CONDITION_VALUE_SCHEMA = Object.freeze({
  schemaId: VALUE_SCHEMA_ID,
  version: GENERAL_NATAL_SOURCE_CONDITION_PRODUCER_VERSION,
  root: {
    kind: 'object',
    required: [
      'conditionKey',
      'state',
      'requiredQualifiers',
      'sourceConditionPreserved',
      'rawTenGodPresenceSufficient',
      'consumerMeaningAuthorized',
    ],
    properties: {
      conditionKey: {
        kind: 'string',
        enum: [
          'pian_cai_ge',
          'yin_shou_ge_applicable_context',
          'shang_guan_shang_jin',
          'shi_shen_ge_flourishing_no_clash_break',
        ],
      },
      state: { kind: 'literal', value: 'satisfied' },
      requiredQualifiers: {
        kind: 'array',
        minItems: 1,
        items: {
          kind: 'string',
          enum: [
            'pattern_established',
            'applicable_context',
            'shang_guan_shang_jin',
            'day_master_flourishing',
            'food_god_flourishing',
            'no_clash_break',
          ],
        },
      },
      sourceConditionPreserved: { kind: 'literal', value: true },
      rawTenGodPresenceSufficient: { kind: 'literal', value: false },
      consumerMeaningAuthorized: { kind: 'literal', value: false },
    },
    additionalProperties: false,
  },
} satisfies ClaimValueSchemaDefinition);

export const GENERAL_NATAL_SOURCE_CONDITION_CLAIM_DEFINITION = Object.freeze({
  claimType: GENERAL_NATAL_SOURCE_CONDITION_CLAIM_TYPE,
  version: GENERAL_NATAL_SOURCE_CONDITION_PRODUCER_VERSION,
  valueSchemaRef: {
    id: VALUE_SCHEMA_ID,
    version: GENERAL_NATAL_SOURCE_CONDITION_PRODUCER_VERSION,
  },
  scope: 'natal',
  exclusiveValue: false,
  scenarioSensitive: true,
  materialForNarrative: false,
  allowedTaxonomyTiers: ['T3'],
} satisfies ClaimTypeDefinition);

const candidateQuality: RuleDefinition['quality'] = Object.freeze({
  provenanceQuality: 'secondary_only',
  testCoverage: 'fixture_matrix',
  methodologyStability: 'contested',
  reviewerStatus: 'unreviewed',
});

interface SourceConditionRuleSpec {
  readonly ruleId: string;
  readonly factPath: string;
  readonly conditionKey: GeneralNatalSourceConditionKey;
  readonly condition: RuleDefinition['condition'];
  readonly requiredQualifiers: readonly string[];
  readonly sourceNote: string;
}

const SOURCE_CONDITION_RULE_SPECS: readonly SourceConditionRuleSpec[] = Object.freeze([
  {
    ruleId: 'RULE-GEJU-SOURCE-CONDITION-PIAN-CAI-GE',
    factPath: GENERAL_NATAL_SOURCE_CONDITION_FACT_PATHS.pianCaiGe,
    conditionKey: 'pian_cai_ge',
    condition: {
      op: 'and',
      expressions: [
        {
          op: 'eq',
          left: { kind: 'input', key: 'sourceCondition', path: 'patternEstablished' },
          right: { kind: 'literal', value: true },
        },
        {
          op: 'eq',
          left: { kind: 'input', key: 'sourceCondition', path: 'applicableContext' },
          right: { kind: 'literal', value: true },
        },
      ],
    },
    requiredQualifiers: ['pattern_established', 'applicable_context'],
    sourceNote:
      'Kanripo KR3g0042/WYG/005 [005-49a] attaches the bounded proposition to 偏財格 rather than generic Wealth-family presence.',
  },
  {
    ruleId: 'RULE-GEJU-SOURCE-CONDITION-YIN-SHOU-APPLICABLE',
    factPath: GENERAL_NATAL_SOURCE_CONDITION_FACT_PATHS.yinShouGeApplicable,
    conditionKey: 'yin_shou_ge_applicable_context',
    condition: {
      op: 'and',
      expressions: [
        {
          op: 'eq',
          left: { kind: 'input', key: 'sourceCondition', path: 'patternEstablished' },
          right: { kind: 'literal', value: true },
        },
        {
          op: 'eq',
          left: { kind: 'input', key: 'sourceCondition', path: 'applicableContext' },
          right: { kind: 'literal', value: true },
        },
      ],
    },
    requiredQualifiers: ['pattern_established', 'applicable_context'],
    sourceNote:
      'Kanripo KR3g0042/WYG/005 [005-56b] uses 此格 in the preceding 印綬/month-context structure; generic Resource-family presence is not equivalent.',
  },
  {
    ruleId: 'RULE-GEJU-SOURCE-CONDITION-SHANG-GUAN-SHANG-JIN',
    factPath: GENERAL_NATAL_SOURCE_CONDITION_FACT_PATHS.shangGuanShangJin,
    conditionKey: 'shang_guan_shang_jin',
    condition: {
      op: 'eq',
      left: { kind: 'input', key: 'sourceCondition', path: 'qualificationSatisfied' },
      right: { kind: 'literal', value: true },
    },
    requiredQualifiers: ['shang_guan_shang_jin'],
    sourceNote:
      'Kanripo KR3g0042/WYG/005 [005-81b]-[005-82a] qualifies the proposition by 傷官傷盡; generic Output-family presence is not equivalent.',
  },
  {
    ruleId: 'RULE-GEJU-SOURCE-CONDITION-SHI-SHEN-QUALIFIED',
    factPath: GENERAL_NATAL_SOURCE_CONDITION_FACT_PATHS.shiShenGeQualified,
    conditionKey: 'shi_shen_ge_flourishing_no_clash_break',
    condition: {
      op: 'and',
      expressions: [
        {
          op: 'eq',
          left: { kind: 'input', key: 'sourceCondition', path: 'patternEstablished' },
          right: { kind: 'literal', value: true },
        },
        {
          op: 'eq',
          left: { kind: 'input', key: 'sourceCondition', path: 'dayMasterFlourishing' },
          right: { kind: 'literal', value: true },
        },
        {
          op: 'eq',
          left: { kind: 'input', key: 'sourceCondition', path: 'foodGodFlourishing' },
          right: { kind: 'literal', value: true },
        },
        {
          op: 'eq',
          left: { kind: 'input', key: 'sourceCondition', path: 'noClashBreak' },
          right: { kind: 'literal', value: true },
        },
      ],
    },
    requiredQualifiers: [
      'pattern_established',
      'day_master_flourishing',
      'food_god_flourishing',
      'no_clash_break',
    ],
    sourceNote:
      'Kanripo KR3g0042/WYG/005 [005-84b] explicitly requires 食神格 with 日主食神俱生旺 and 無衝破; generic 食神 presence is not equivalent.',
  },
]);

function sourceConditionRule(spec: SourceConditionRuleSpec): RuleDefinition {
  return {
    ruleId: spec.ruleId,
    version: GENERAL_NATAL_SOURCE_CONDITION_PRODUCER_VERSION,
    ruleSetId: RULE_SET_ID,
    taxonomy: {
      tier: 'T3',
      category: 'gyeokguk',
      subcategory: 'source_condition',
    },
    methodologyRef: {
      id: METHODOLOGY_ID,
      version: GENERAL_NATAL_SOURCE_CONDITION_PRODUCER_VERSION,
    },
    title: `Source-conditioned ${spec.conditionKey} structural state`,
    description:
      'Research-only lower-tier mapping from one explicit resolved source-condition fact to one schema-bound structural claim. No consumer-domain meaning is emitted.',
    inputs: [
      {
        key: 'sourceCondition',
        source: 'derived_fact',
        pathOrClaimType: spec.factPath,
        acceptedStatuses: ['resolved'],
        required: true,
        ambiguityBehavior: 'scenario_preserving',
      },
    ],
    condition: spec.condition,
    output: {
      claimType: GENERAL_NATAL_SOURCE_CONDITION_CLAIM_TYPE,
      subject: 'natal_chart',
      predicate: 'source_condition_satisfied',
      value: {
        conditionKey: spec.conditionKey,
        state: 'satisfied',
        requiredQualifiers: [...spec.requiredQualifiers],
        sourceConditionPreserved: true,
        rawTenGodPresenceSufficient: false,
        consumerMeaningAuthorized: false,
      },
      polarity: 'neutral',
      emphasis: 'moderate',
      tags: ['research', 'gyeokguk', 'source-conditioned', 'lower-tier'],
    },
    sourceRefs: [
      {
        sourceId: GENERAL_NATAL_SOURCE_CONDITION_SOURCE.sourceId,
        supportType: 'direct_basis',
        notes: spec.sourceNote,
      },
    ],
    quality: candidateQuality,
    status: 'research',
  };
}

export const GENERAL_NATAL_SOURCE_CONDITION_RULES: readonly RuleDefinition[] = Object.freeze(
  SOURCE_CONDITION_RULE_SPECS.map(sourceConditionRule),
);

export const GENERAL_NATAL_SOURCE_CONDITION_PACK: InterpretationPack = Object.freeze({
  packId: 'PACK-GENERAL-NATAL-SOURCE-CONDITION-LOWER-TIER-CANDIDATE',
  version: GENERAL_NATAL_SOURCE_CONDITION_PRODUCER_VERSION,
  name: 'General Natal Source-Condition Lower-Tier Research Candidate',
  methodologyRefs: [
    {
      id: METHODOLOGY_ID,
      version: GENERAL_NATAL_SOURCE_CONDITION_PRODUCER_VERSION,
    },
  ],
  enabledRuleSets: [RULE_SET_ID],
  conflictPolicy: 'preserve_all',
  ambiguityPolicy: 'propagate',
  compositionPolicyRef: {
    id: 'COMPOSITION-GENERAL-NATAL-SOURCE-CONDITION-RESEARCH',
    version: GENERAL_NATAL_SOURCE_CONDITION_PRODUCER_VERSION,
  },
  claimContractMode: 'registered_required',
  status: 'research',
});

export function createGeneralNatalSourceConditionCandidateRegistry(
  createdAt = '1970-01-01T00:00:00.000Z',
) {
  return createRuleRegistrySnapshot(
    {
      rules: GENERAL_NATAL_SOURCE_CONDITION_RULES,
      methodologies: [GENERAL_NATAL_SOURCE_CONDITION_METHODOLOGY],
      sources: [GENERAL_NATAL_SOURCE_CONDITION_SOURCE],
      claimTypeDefinitions: [GENERAL_NATAL_SOURCE_CONDITION_CLAIM_DEFINITION],
      claimValueSchemas: [GENERAL_NATAL_SOURCE_CONDITION_VALUE_SCHEMA],
    },
    GENERAL_NATAL_SOURCE_CONDITION_PACK,
    createdAt,
  );
}
