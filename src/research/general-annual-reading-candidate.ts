import type { TenGod } from '../contracts/calculation.js';
import type {
  ClaimTypeDefinition,
  ClaimValueSchemaDefinition,
  InterpretationPack,
  MethodologyDefinition,
  RuleDefinition,
  SourceReference,
} from '../contracts/interpretation.js';
import { createRuleRegistrySnapshot } from '../interpretation/rule-registry.js';

export const GENERAL_ANNUAL_READING_CANDIDATE_VERSION = '0.1.0-research' as const;

const METHOD_ID = 'M-GENERAL-ANNUAL-T9-MYEONGHA-POLICY-V1';
const ACTIVATION_RULE_SET = 'general-annual-t9-activation';
const TENSION_RULE_SET = 'general-annual-t9-branch-clash-tension';
const COMBINATION_RULE_SET = 'general-annual-t9-six-combination-context';
const COMBINATION_METHOD_ID = 'M-GENERAL-ANNUAL-T9-SIX-COMBINATION-SOURCE-V1';

export type GeneralAnnualThemeFamily = 'peer' | 'resource' | 'output' | 'wealth' | 'officer';

export const GENERAL_ANNUAL_POLICY_SOURCE = Object.freeze({
  sourceId: 'SRC-MYEONGHA-ANNUAL-INTERPRETATION-POLICY-V1',
  sourceType: 'internal_research',
  title: 'MyeongHa Annual Interpretation Policy v1',
  language: 'ko',
  provenanceTier: 'internal',
  notes:
    'Product policy for request-scoped annual interpretation. The civil Asia/Seoul target year is resolved by the request adapter, annual stem Ten-God is treated as a bounded activation theme, and annual-to-natal branch clash is treated only as a tension signal. It does not authorize deterministic events, luck scores, health outcomes, wealth magnitude, spouse outcomes, or guaranteed timing.',
} satisfies SourceReference);

export const GENERAL_ANNUAL_SIX_COMBINATION_SOURCE: SourceReference = Object.freeze({
  sourceId: 'SRC-T0-XUANZE-YAOLUE-UPPER',
  sourceType: 'classical_text',
  title: '選擇要略 上 — 地支六合',
  language: 'zh-Hant',
  url: 'https://zh.wikisource.org/zh-hant/%E9%81%B8%E6%93%87%E8%A6%81%E7%95%A5/%E4%B8%8A',
  accessedAt: '2026-11-03',
  provenanceTier: 'cross_reference',
  rights: { copyrightStatus: 'public_domain', reusePolicy: 'paraphrase_only' },
  notes: 'Existing canonical T0 catalog source for 地支六合 pair classification only. No 合化, transformation, luck polarity or real-world relationship outcome is inferred.',
});

const QUALITY: RuleDefinition['quality'] = Object.freeze({
  provenanceQuality: 'heuristic',
  testCoverage: 'fixture_matrix',
  methodologyStability: 'experimental',
  reviewerStatus: 'unreviewed',
});

const TEN_GOD_THEME: Readonly<
  Record<TenGod, { family: GeneralAnnualThemeFamily; semanticKey: string }>
> = Object.freeze({
  비견: { family: 'peer', semanticKey: 'ANNUAL_PEER_SELF_DIRECTION' },
  겁재: { family: 'peer', semanticKey: 'ANNUAL_PEER_COMPETITION_COORDINATION' },
  식신: { family: 'output', semanticKey: 'ANNUAL_OUTPUT_STEADY_PRODUCTION' },
  상관: { family: 'output', semanticKey: 'ANNUAL_OUTPUT_EXPRESSION_CHANGE' },
  편재: { family: 'wealth', semanticKey: 'ANNUAL_WEALTH_EXTERNAL_RESOURCES' },
  정재: { family: 'wealth', semanticKey: 'ANNUAL_WEALTH_STRUCTURED_RESOURCES' },
  편관: { family: 'officer', semanticKey: 'ANNUAL_OFFICER_PRESSURE_RESPONSE' },
  정관: { family: 'officer', semanticKey: 'ANNUAL_OFFICER_ROLE_RESPONSIBILITY' },
  편인: { family: 'resource', semanticKey: 'ANNUAL_RESOURCE_ALTERNATIVE_LEARNING' },
  정인: { family: 'resource', semanticKey: 'ANNUAL_RESOURCE_SUPPORT_LEARNING' },
});

const TEN_GODS = Object.keys(TEN_GOD_THEME) as TenGod[];
const PILLAR_SLOTS = ['year', 'month', 'day', 'hour'] as const;

export const GENERAL_ANNUAL_THEME_SCHEMA = Object.freeze({
  schemaId: 'SCHEMA-GENERAL-ANNUAL-THEME-V1',
  version: '1.0.0',
  root: {
    kind: 'object',
    required: [
      'semanticKey',
      'themeFamily',
      'tenGod',
      'activationKind',
      'narrativeRole',
      'forbiddenInferences',
    ],
    properties: {
      semanticKey: { kind: 'string', enum: TEN_GODS.map((god) => TEN_GOD_THEME[god].semanticKey) },
      themeFamily: { kind: 'string', enum: ['peer', 'resource', 'output', 'wealth', 'officer'] },
      tenGod: { kind: 'string', enum: TEN_GODS },
      activationKind: { kind: 'literal', value: 'annual_stem_ten_god' },
      narrativeRole: { kind: 'literal', value: 'primary' },
      forbiddenInferences: { kind: 'array', items: { kind: 'string' }, minItems: 1 },
    },
    additionalProperties: false,
  },
} satisfies ClaimValueSchemaDefinition);

export const GENERAL_ANNUAL_TENSION_SCHEMA = Object.freeze({
  schemaId: 'SCHEMA-GENERAL-ANNUAL-TENSION-V1',
  version: '1.0.0',
  root: {
    kind: 'object',
    required: ['semanticKey', 'natalPillar', 'relation', 'narrativeRole', 'forbiddenInferences'],
    properties: {
      semanticKey: {
        kind: 'string',
        enum: PILLAR_SLOTS.map((slot) => `ANNUAL_BRANCH_CLASH_${slot.toUpperCase()}`),
      },
      natalPillar: { kind: 'string', enum: PILLAR_SLOTS },
      relation: { kind: 'literal', value: 'clash' },
      narrativeRole: { kind: 'literal', value: 'tension' },
      forbiddenInferences: { kind: 'array', items: { kind: 'string' }, minItems: 1 },
    },
    additionalProperties: false,
  },
} satisfies ClaimValueSchemaDefinition);

export const GENERAL_ANNUAL_THEME_CLAIM_TYPE = Object.freeze({
  claimType: 'GENERAL_ANNUAL_THEME_ACTIVATION',
  version: '1.0.0',
  valueSchemaRef: { id: GENERAL_ANNUAL_THEME_SCHEMA.schemaId, version: GENERAL_ANNUAL_THEME_SCHEMA.version },
  scope: 'period',
  exclusiveValue: true,
  scenarioSensitive: false,
  materialForNarrative: true,
  allowedTaxonomyTiers: ['T9'],
} satisfies ClaimTypeDefinition);

export const GENERAL_ANNUAL_TENSION_CLAIM_TYPE = Object.freeze({
  claimType: 'GENERAL_ANNUAL_BRANCH_CLASH_TENSION',
  version: '1.0.0',
  valueSchemaRef: {
    id: GENERAL_ANNUAL_TENSION_SCHEMA.schemaId,
    version: GENERAL_ANNUAL_TENSION_SCHEMA.version,
  },
  scope: 'period',
  exclusiveValue: false,
  scenarioSensitive: true,
  materialForNarrative: true,
  allowedTaxonomyTiers: ['T9'],
} satisfies ClaimTypeDefinition);

export const GENERAL_ANNUAL_COMBINATION_SCHEMA = Object.freeze({
  schemaId: 'SCHEMA-GENERAL-ANNUAL-SIX-COMBINATION-V1',
  version: '1.0.0',
  root: {
    kind: 'object',
    required: ['semanticKey', 'natalPillar', 'relation', 'narrativeRole', 'transformationAuthorized', 'forbiddenInferences'],
    properties: {
      semanticKey: {
        kind: 'string',
        enum: PILLAR_SLOTS.map(slot => `ANNUAL_BRANCH_SIX_COMBINATION_${slot.toUpperCase()}`),
      },
      natalPillar: { kind: 'string', enum: PILLAR_SLOTS },
      relation: { kind: 'literal', value: 'six_combination' },
      narrativeRole: { kind: 'literal', value: 'context' },
      transformationAuthorized: { kind: 'literal', value: false },
      forbiddenInferences: { kind: 'array', items: { kind: 'string' }, minItems: 1 },
    },
    additionalProperties: false,
  },
} satisfies ClaimValueSchemaDefinition);

export const GENERAL_ANNUAL_COMBINATION_CLAIM_TYPE = Object.freeze({
  claimType: 'GENERAL_ANNUAL_BRANCH_SIX_COMBINATION_CONTEXT',
  version: '1.0.0',
  valueSchemaRef: {
    id: GENERAL_ANNUAL_COMBINATION_SCHEMA.schemaId,
    version: GENERAL_ANNUAL_COMBINATION_SCHEMA.version,
  },
  scope: 'period',
  exclusiveValue: false,
  scenarioSensitive: true,
  materialForNarrative: true,
  allowedTaxonomyTiers: ['T9'],
} satisfies ClaimTypeDefinition);

export const GENERAL_ANNUAL_COMBINATION_METHODOLOGY: MethodologyDefinition = Object.freeze({
  methodologyId: COMBINATION_METHOD_ID,
  version: GENERAL_ANNUAL_READING_CANDIDATE_VERSION,
  family: 'time_dynamics',
  name: 'Request-year to natal pillar 地支六合 observation (research)',
  description: 'Uses the existing T0 six-combination calculation to identify a bounded annual-to-natal structural connection, not a prediction.',
  assumptions: [
    'Only precisely resolved natal pillar and selected civil-year annual branch pair can establish this context.',
    '六合 pair membership is not evidence of 合化, transformed elements, favorable luck, event occurrence, relationships or success.',
    'This context is separate from the annual stem Ten-God theme and cannot synthesize a new temporal forecast.',
    'No official, publishable or commercial reading authority is granted.',
  ],
  requiredFactTypes: ['temporal.targetYear', 'temporal.annualPillar'],
  optionalFactTypes: ['temporal.annualBranchRelations'],
  inputContract: {
    factInputs: [
      { source: 'temporal_fact', pathPattern: 'targetYear', mode: 'required',
        rationale: 'The observed combination must belong to the exact target year.' },
      { source: 'temporal_fact', pathPattern: 'annualPillar', mode: 'required',
        rationale: 'The annual branch must be part of the same request-scoped pillar.' },
      ...PILLAR_SLOTS.map(slot => ({
        source: 'temporal_fact' as const,
        pathPattern: `annualBranchRelations.${slot}`,
        mode: 'allowed' as const,
        rationale: 'A resolved canonical six-combination relation for this natal pillar.',
      })),
    ],
  },
  sourceIds: [GENERAL_ANNUAL_POLICY_SOURCE.sourceId, GENERAL_ANNUAL_SIX_COMBINATION_SOURCE.sourceId],
  status: 'research',
});

export const GENERAL_ANNUAL_READING_METHODOLOGY = Object.freeze({
  methodologyId: METHOD_ID,
  version: GENERAL_ANNUAL_READING_CANDIDATE_VERSION,
  family: 'time_dynamics',
  name: 'MyeongHa request-scoped annual theme policy v1',
  description:
    'Projects a request-scoped annual stem Ten-God into one bounded annual theme and records resolved annual-to-natal branch clashes as tension signals without deterministic event prediction.',
  assumptions: [
    'The target period is the civil Asia/Seoul year already resolved by the consumer request adapter.',
    'The annual stem Ten-God is an activation theme, not a luck score, outcome guarantee, or proof of a specific event.',
    'Annual branch clash is a tension signal only; it does not establish loss, illness, separation, accident, or other concrete events.',
    'Unknown or ambiguous natal pillars do not authorize fabricated annual relation claims.',
    'Narrative wording must remain inside the semantic boundaries encoded by the claim contracts.',
  ],
  requiredFactTypes: ['temporal.targetYear', 'temporal.annualPillar', 'temporal.annualStemTenGod'],
  optionalFactTypes: ['temporal.annualBranchRelations'],
  inputContract: {
    factInputs: [
      {
        source: 'temporal_fact',
        pathPattern: 'targetYear',
        mode: 'required',
        rationale: 'Every annual claim must be bound to the request-resolved target year.',
      },
      {
        source: 'temporal_fact',
        pathPattern: 'annualPillar',
        mode: 'required',
        rationale: 'Every annual claim must be bound to the request-resolved annual sexagenary pillar.',
      },
      {
        source: 'temporal_fact',
        pathPattern: 'annualStemTenGod',
        mode: 'required',
        rationale: 'Primary annual activation is personalized against the resolved natal day master.',
      },
      ...PILLAR_SLOTS.map((slot) => ({
        source: 'temporal_fact' as const,
        pathPattern: `annualBranchRelations.${slot}`,
        mode: 'allowed' as const,
        rationale: 'Optional resolved annual-to-natal branch clash signal.',
      })),
    ],
  },
  sourceIds: [GENERAL_ANNUAL_POLICY_SOURCE.sourceId],
  status: 'research',
} satisfies MethodologyDefinition);

function sourceRefs(): RuleDefinition['sourceRefs'] {
  return [
    {
      sourceId: GENERAL_ANNUAL_POLICY_SOURCE.sourceId,
      supportType: 'implementation_reference',
      notes: 'MyeongHa Annual Interpretation Policy v1 bounds the permitted annual semantics.',
    },
  ];
}

function corePeriodInputs(): RuleDefinition['inputs'] {
  return [
    {
      key: 'targetYear',
      source: 'temporal_fact',
      pathOrClaimType: 'targetYear',
      required: true,
      ambiguityBehavior: 'requires_resolved',
    },
    {
      key: 'annualPillar',
      source: 'temporal_fact',
      pathOrClaimType: 'annualPillar',
      required: true,
      ambiguityBehavior: 'requires_resolved',
    },
  ];
}

function activationRule(tenGod: TenGod): RuleDefinition {
  const theme = TEN_GOD_THEME[tenGod];
  return {
    ruleId: `RULE-GENERAL-ANNUAL-T9-${tenGod}`,
    version: GENERAL_ANNUAL_READING_CANDIDATE_VERSION,
    ruleSetId: ACTIVATION_RULE_SET,
    taxonomy: { tier: 'T9', category: 'general', subcategory: 'annual' },
    methodologyRef: { id: METHOD_ID, version: GENERAL_ANNUAL_READING_CANDIDATE_VERSION },
    title: `Annual ${tenGod} activation theme`,
    description:
      'Emits one bounded annual activation theme only when the request-scoped annual stem Ten-God matches.',
    inputs: [
      ...corePeriodInputs(),
      {
        key: 'annualStemTenGod',
        source: 'temporal_fact',
        pathOrClaimType: 'annualStemTenGod',
        required: true,
        ambiguityBehavior: 'requires_resolved',
      },
    ],
    condition: {
      op: 'and',
      expressions: [
        { op: 'exists', value: { kind: 'input', key: 'targetYear' } },
        { op: 'exists', value: { kind: 'input', key: 'annualPillar' } },
        {
          op: 'eq',
          left: { kind: 'input', key: 'annualStemTenGod' },
          right: { kind: 'literal', value: tenGod },
        },
      ],
    },
    output: {
      claimType: GENERAL_ANNUAL_THEME_CLAIM_TYPE.claimType,
      subject: 'annual_period',
      predicate: 'annual_theme_activation',
      value: {
        semanticKey: theme.semanticKey,
        themeFamily: theme.family,
        tenGod,
        activationKind: 'annual_stem_ten_god',
        narrativeRole: 'primary',
        forbiddenInferences: [
          'deterministic_future_event',
          'luck_score',
          'wealth_magnitude',
          'health_outcome',
          'relationship_outcome',
        ],
      },
      polarity: 'neutral',
      emphasis: 'major',
      tags: ['research', 'general', 'annual', 'request-scoped', 'activation'],
    },
    sourceRefs: sourceRefs(),
    quality: QUALITY,
    status: 'research',
  };
}

function branchClashRule(slot: (typeof PILLAR_SLOTS)[number]): RuleDefinition {
  return {
    ruleId: `RULE-GENERAL-ANNUAL-T9-BRANCH-CLASH-${slot.toUpperCase()}`,
    version: GENERAL_ANNUAL_READING_CANDIDATE_VERSION,
    ruleSetId: TENSION_RULE_SET,
    taxonomy: { tier: 'T9', category: 'general', subcategory: 'annual' },
    methodologyRef: { id: METHOD_ID, version: GENERAL_ANNUAL_READING_CANDIDATE_VERSION },
    title: `Annual branch clash tension at natal ${slot} pillar`,
    description:
      'Records a resolved annual-to-natal branch clash as a bounded tension signal without inferring a concrete event.',
    inputs: [
      ...corePeriodInputs(),
      {
        key: 'relation',
        source: 'temporal_fact',
        pathOrClaimType: `annualBranchRelations.${slot}`,
        required: false,
        ambiguityBehavior: 'requires_resolved',
      },
    ],
    condition: {
      op: 'and',
      expressions: [
        { op: 'exists', value: { kind: 'input', key: 'targetYear' } },
        { op: 'exists', value: { kind: 'input', key: 'annualPillar' } },
        {
          op: 'eq',
          left: { kind: 'input', key: 'relation', path: 'relation' },
          right: { kind: 'literal', value: 'clash' },
        },
      ],
    },
    output: {
      claimType: GENERAL_ANNUAL_TENSION_CLAIM_TYPE.claimType,
      subject: 'annual_period',
      predicate: 'annual_branch_clash_tension',
      value: {
        semanticKey: `ANNUAL_BRANCH_CLASH_${slot.toUpperCase()}`,
        natalPillar: slot,
        relation: 'clash',
        narrativeRole: 'tension',
        forbiddenInferences: [
          'specific_event',
          'accident_prediction',
          'health_outcome',
          'separation_prediction',
          'financial_loss_prediction',
        ],
      },
      polarity: 'challenging',
      emphasis: slot === 'day' ? 'moderate' : 'minor',
      tags: ['research', 'general', 'annual', 'request-scoped', 'branch-clash', 'tension'],
    },
    sourceRefs: sourceRefs(),
    quality: QUALITY,
    status: 'research',
  };
}

export const GENERAL_ANNUAL_ACTIVATION_RULES: readonly RuleDefinition[] = Object.freeze(
  TEN_GODS.map(activationRule),
);

export const GENERAL_ANNUAL_TENSION_RULES: readonly RuleDefinition[] = Object.freeze(
  PILLAR_SLOTS.map(branchClashRule),
);

function branchSixCombinationRule(slot: (typeof PILLAR_SLOTS)[number]): RuleDefinition {
  return {
    ruleId: `RULE-GENERAL-ANNUAL-T9-BRANCH-SIX-COMBINATION-${slot.toUpperCase()}`,
    version: GENERAL_ANNUAL_READING_CANDIDATE_VERSION,
    ruleSetId: COMBINATION_RULE_SET,
    taxonomy: { tier: 'T9', category: 'general', subcategory: 'annual' },
    methodologyRef: { id: COMBINATION_METHOD_ID, version: GENERAL_ANNUAL_READING_CANDIDATE_VERSION },
    title: `Annual six-combination context at natal ${slot} pillar`,
    description: 'Preserves an exact canonical 六合 pair as limited annual structural context, never outcome or transformation.',
    inputs: [
      ...corePeriodInputs(),
      {
        key: 'relation',
        source: 'temporal_fact',
        pathOrClaimType: `annualBranchRelations.${slot}`,
        required: false,
        ambiguityBehavior: 'requires_resolved',
      },
    ],
    condition: {
      op: 'and',
      expressions: [
        { op: 'exists', value: { kind: 'input', key: 'targetYear' } },
        { op: 'exists', value: { kind: 'input', key: 'annualPillar' } },
        { op: 'eq', left: { kind: 'input', key: 'relation', path: 'relation' },
          right: { kind: 'literal', value: 'six_combination' } },
      ],
    },
    output: {
      claimType: GENERAL_ANNUAL_COMBINATION_CLAIM_TYPE.claimType,
      subject: 'annual_period',
      predicate: 'annual_branch_six_combination_context',
      value: {
        semanticKey: `ANNUAL_BRANCH_SIX_COMBINATION_${slot.toUpperCase()}`,
        natalPillar: slot,
        relation: 'six_combination',
        narrativeRole: 'context',
        transformationAuthorized: false,
        forbiddenInferences: ['favorable_luck', 'transformation', 'specific_event',
          'relationship_outcome', 'career_outcome', 'financial_outcome'],
      },
      polarity: 'neutral',
      emphasis: 'minor',
      tags: ['research', 'general', 'annual', 'six-combination', 'source-bound', 'context'],
    },
    sourceRefs: [
      ...sourceRefs(),
      { sourceId: GENERAL_ANNUAL_SIX_COMBINATION_SOURCE.sourceId,
        supportType: 'interpretive_basis',
        notes: 'Classical source describes the 六合 pair; does not authorize outcome or 合化.' },
    ],
    quality: QUALITY,
    status: 'research',
  };
}

export const GENERAL_ANNUAL_COMBINATION_RULES: readonly RuleDefinition[] = Object.freeze(
  PILLAR_SLOTS.map(branchSixCombinationRule),
);

export const GENERAL_ANNUAL_READING_PACK = Object.freeze({
  packId: 'PACK-GENERAL-ANNUAL-READING-CANDIDATE',
  version: GENERAL_ANNUAL_READING_CANDIDATE_VERSION,
  name: 'General Annual Reading Research Candidate',
  methodologyRefs: [{ id: METHOD_ID, version: GENERAL_ANNUAL_READING_CANDIDATE_VERSION },
    { id: COMBINATION_METHOD_ID, version: GENERAL_ANNUAL_READING_CANDIDATE_VERSION }],
  enabledRuleSets: [ACTIVATION_RULE_SET, TENSION_RULE_SET, COMBINATION_RULE_SET],
  conflictPolicy: 'preserve_all',
  ambiguityPolicy: 'propagate',
  compositionPolicyRef: {
    id: 'COMPOSITION-GENERAL-ANNUAL-READING-RESEARCH',
    version: GENERAL_ANNUAL_READING_CANDIDATE_VERSION,
  },
  claimContractMode: 'registered_required',
  status: 'research',
} satisfies InterpretationPack);

export function createGeneralAnnualReadingCandidateRegistry(
  createdAt = '1970-01-01T00:00:00.000Z',
) {
  return createRuleRegistrySnapshot(
    {
      rules: [...GENERAL_ANNUAL_ACTIVATION_RULES, ...GENERAL_ANNUAL_TENSION_RULES,
        ...GENERAL_ANNUAL_COMBINATION_RULES],
      methodologies: [GENERAL_ANNUAL_READING_METHODOLOGY, GENERAL_ANNUAL_COMBINATION_METHODOLOGY],
      sources: [GENERAL_ANNUAL_POLICY_SOURCE, GENERAL_ANNUAL_SIX_COMBINATION_SOURCE],
      claimTypeDefinitions: [GENERAL_ANNUAL_THEME_CLAIM_TYPE, GENERAL_ANNUAL_TENSION_CLAIM_TYPE,
        GENERAL_ANNUAL_COMBINATION_CLAIM_TYPE],
      claimValueSchemas: [GENERAL_ANNUAL_THEME_SCHEMA, GENERAL_ANNUAL_TENSION_SCHEMA,
        GENERAL_ANNUAL_COMBINATION_SCHEMA],
    },
    GENERAL_ANNUAL_READING_PACK,
    createdAt,
  );
}