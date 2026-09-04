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
import {
  CAREER_NATAL_READING_CANDIDATE_VERSION,
  CAREER_NATAL_READING_METHODOLOGY,
  CAREER_NATAL_READING_RULES,
} from './career-natal-reading-candidate.js';
import {
  CAREER_TEN_GOD_SEMANTIC_SPECS,
  careerTenGodClaimType,
  type CareerConclusionKind,
  type CareerTenGodChannel,
} from './career-natal-reading-schema.js';
import { GENERAL_NATAL_USEFUL_READING_SOURCE } from './general-natal-useful-reading-candidate.js';
import { GENERAL_NATAL_CONCLUSION_SOURCE } from './general-natal-conclusion-synthesis-candidate.js';

export const CAREER_ANNUAL_READING_CANDIDATE_VERSION = '0.1.0-research' as const;

const METHOD_ID = 'M-CAREER-ANNUAL-T9-MYEONGHA-POLICY-V1';
const ACTIVATION_RULE_SET = 'career-annual-t9-activation';
const TENSION_RULE_SET = 'career-annual-t9-branch-clash-tension';

export type CareerAnnualAxis =
  | 'self_direction'
  | 'coordination'
  | 'production'
  | 'expression_change'
  | 'external_resources'
  | 'structured_resources'
  | 'pressure_response'
  | 'formal_responsibility'
  | 'alternative_learning'
  | 'foundation_learning';

interface CareerAnnualThemeSpec {
  axis: CareerAnnualAxis;
  semanticKey: string;
}

export const CAREER_ANNUAL_POLICY_SOURCE = Object.freeze({
  sourceId: 'SRC-MYEONGHA-CAREER-ANNUAL-INTERPRETATION-POLICY-V1',
  sourceType: 'internal_research',
  title: 'MyeongHa Career Annual Interpretation Policy v1',
  language: 'ko',
  provenanceTier: 'internal',
  notes:
    'Product policy for request-scoped Career Annual interpretation. It reuses the resolved annual pillar, annual stem Ten-God, and annual-to-natal branch relations from the existing temporal runtime, projects them only into bounded career working-pattern tendencies, and forbids deterministic employment, firing, resignation, promotion, compensation, or business-success predictions.',
} satisfies SourceReference);

const QUALITY: RuleDefinition['quality'] = Object.freeze({
  provenanceQuality: 'heuristic',
  testCoverage: 'fixture_matrix',
  methodologyStability: 'experimental',
  reviewerStatus: 'unreviewed',
});

const TEN_GOD_THEME: Readonly<Record<TenGod, CareerAnnualThemeSpec>> = Object.freeze({
  비견: {
    axis: 'self_direction',
    semanticKey: 'CAREER_ANNUAL_SELF_DIRECTED_WORK_DIRECTION',
  },
  겁재: {
    axis: 'coordination',
    semanticKey: 'CAREER_ANNUAL_PEER_COORDINATION_PRESSURE',
  },
  식신: {
    axis: 'production',
    semanticKey: 'CAREER_ANNUAL_STEADY_PRODUCTION_CADENCE',
  },
  상관: {
    axis: 'expression_change',
    semanticKey: 'CAREER_ANNUAL_EXPRESSION_PROCESS_CHANGE',
  },
  편재: {
    axis: 'external_resources',
    semanticKey: 'CAREER_ANNUAL_EXTERNAL_PROJECT_RESOURCE_HANDLING',
  },
  정재: {
    axis: 'structured_resources',
    semanticKey: 'CAREER_ANNUAL_STRUCTURED_WORK_RESOURCE_MANAGEMENT',
  },
  편관: {
    axis: 'pressure_response',
    semanticKey: 'CAREER_ANNUAL_PRESSURE_ACCOUNTABILITY_RESPONSE',
  },
  정관: {
    axis: 'formal_responsibility',
    semanticKey: 'CAREER_ANNUAL_FORMAL_ROLE_RESPONSIBILITY',
  },
  편인: {
    axis: 'alternative_learning',
    semanticKey: 'CAREER_ANNUAL_ALTERNATIVE_LEARNING_PROBLEM_SOLVING',
  },
  정인: {
    axis: 'foundation_learning',
    semanticKey: 'CAREER_ANNUAL_FORMAL_SUPPORT_FOUNDATION',
  },
});

const TEN_GODS = Object.keys(TEN_GOD_THEME) as TenGod[];
const PILLAR_SLOTS = ['year', 'month', 'day', 'hour'] as const;
const CAREER_CHANNELS: readonly CareerTenGodChannel[] = ['visible_stems', 'branches'];
const CAREER_KINDS: readonly CareerConclusionKind[] = ['driver', 'fit', 'environment', 'friction'];

export const CAREER_NATAL_REUSED_CLAIM_SCHEMA = Object.freeze({
  schemaId: 'SCHEMA-CAREER-NATAL-REUSED-TEN-GOD-CLAIM-V1',
  version: '1.0.0',
  root: {
    kind: 'object',
    required: [
      'careerKind',
      'tenGod',
      'channel',
      'specificOccupationAuthorized',
      'careerSuccessAuthorized',
      'incomeOutcomeAuthorized',
      'futureTimingAuthorized',
      'numericScoringAuthorized',
    ],
    properties: {
      careerKind: { kind: 'string', enum: CAREER_KINDS },
      tenGod: { kind: 'string', enum: TEN_GODS },
      channel: { kind: 'string', enum: CAREER_CHANNELS },
      specificOccupationAuthorized: { kind: 'literal', value: false },
      careerSuccessAuthorized: { kind: 'literal', value: false },
      incomeOutcomeAuthorized: { kind: 'literal', value: false },
      futureTimingAuthorized: { kind: 'literal', value: false },
      numericScoringAuthorized: { kind: 'literal', value: false },
    },
    additionalProperties: false,
  },
} satisfies ClaimValueSchemaDefinition);

export const CAREER_ANNUAL_THEME_SCHEMA = Object.freeze({
  schemaId: 'SCHEMA-CAREER-ANNUAL-THEME-V1',
  version: '1.0.0',
  root: {
    kind: 'object',
    required: [
      'semanticKey',
      'careerAxis',
      'tenGod',
      'activationKind',
      'narrativeRole',
      'boundedTo',
      'forbiddenInferences',
    ],
    properties: {
      semanticKey: { kind: 'string', enum: TEN_GODS.map((god) => TEN_GOD_THEME[god].semanticKey) },
      careerAxis: {
        kind: 'string',
        enum: TEN_GODS.map((god) => TEN_GOD_THEME[god].axis),
      },
      tenGod: { kind: 'string', enum: TEN_GODS },
      activationKind: { kind: 'literal', value: 'annual_stem_ten_god' },
      narrativeRole: { kind: 'literal', value: 'primary' },
      boundedTo: { kind: 'literal', value: 'career_working_pattern_tendency' },
      forbiddenInferences: { kind: 'array', items: { kind: 'string' }, minItems: 1 },
    },
    additionalProperties: false,
  },
} satisfies ClaimValueSchemaDefinition);

export const CAREER_ANNUAL_TENSION_SCHEMA = Object.freeze({
  schemaId: 'SCHEMA-CAREER-ANNUAL-TENSION-V1',
  version: '1.0.0',
  root: {
    kind: 'object',
    required: [
      'semanticKey',
      'natalPillar',
      'relation',
      'narrativeRole',
      'boundedTo',
      'adjustmentAreas',
      'forbiddenInferences',
    ],
    properties: {
      semanticKey: {
        kind: 'string',
        enum: PILLAR_SLOTS.map((slot) => `CAREER_ANNUAL_BRANCH_CLASH_${slot.toUpperCase()}`),
      },
      natalPillar: { kind: 'string', enum: PILLAR_SLOTS },
      relation: { kind: 'literal', value: 'clash' },
      narrativeRole: { kind: 'literal', value: 'tension' },
      boundedTo: { kind: 'literal', value: 'work_adjustment_pressure' },
      adjustmentAreas: {
        kind: 'array',
        items: { kind: 'string', enum: ['role', 'schedule', 'team_collaboration', 'working_method'] },
        minItems: 1,
      },
      forbiddenInferences: { kind: 'array', items: { kind: 'string' }, minItems: 1 },
    },
    additionalProperties: false,
  },
} satisfies ClaimValueSchemaDefinition);

export const CAREER_NATAL_REUSED_CLAIM_TYPE_DEFINITIONS: readonly ClaimTypeDefinition[] =
  Object.freeze(
    CAREER_CHANNELS.flatMap((channel) =>
      TEN_GODS.map((god) => ({
        claimType: careerTenGodClaimType(god, channel),
        version: '1.0.0',
        valueSchemaRef: {
          id: CAREER_NATAL_REUSED_CLAIM_SCHEMA.schemaId,
          version: CAREER_NATAL_REUSED_CLAIM_SCHEMA.version,
        },
        scope: 'natal' as const,
        exclusiveValue: true,
        scenarioSensitive: true,
        materialForNarrative: true,
        allowedTaxonomyTiers: ['T8'] as const,
      })),
    ),
  );

export const CAREER_ANNUAL_THEME_CLAIM_TYPE = Object.freeze({
  claimType: 'CAREER_ANNUAL_THEME_ACTIVATION',
  version: '1.0.0',
  valueSchemaRef: { id: CAREER_ANNUAL_THEME_SCHEMA.schemaId, version: CAREER_ANNUAL_THEME_SCHEMA.version },
  scope: 'period',
  exclusiveValue: true,
  scenarioSensitive: false,
  materialForNarrative: true,
  allowedTaxonomyTiers: ['T9'],
} satisfies ClaimTypeDefinition);

export const CAREER_ANNUAL_TENSION_CLAIM_TYPE = Object.freeze({
  claimType: 'CAREER_ANNUAL_BRANCH_CLASH_TENSION',
  version: '1.0.0',
  valueSchemaRef: {
    id: CAREER_ANNUAL_TENSION_SCHEMA.schemaId,
    version: CAREER_ANNUAL_TENSION_SCHEMA.version,
  },
  scope: 'period',
  exclusiveValue: false,
  scenarioSensitive: true,
  materialForNarrative: true,
  allowedTaxonomyTiers: ['T9'],
} satisfies ClaimTypeDefinition);

export const CAREER_ANNUAL_READING_METHODOLOGY = Object.freeze({
  methodologyId: METHOD_ID,
  version: CAREER_ANNUAL_READING_CANDIDATE_VERSION,
  family: 'time_dynamics',
  name: 'MyeongHa request-scoped Career Annual policy v1',
  description:
    'Projects the request-scoped annual stem Ten-God into one bounded career working-pattern tendency and records resolved annual-to-natal branch clashes only as work-adjustment pressure signals.',
  assumptions: [
    'The target period is the civil Asia/Seoul year already resolved by the consumer request adapter.',
    'The annual stem Ten-God is interpreted only as a bounded career working-pattern tendency, never as proof of hiring, firing, resignation, promotion, compensation, or business success.',
    'Annual branch clash may indicate adjustment pressure around role, schedule, team or collaboration structure, or working method; it never establishes a concrete career event.',
    'Unknown or ambiguous natal hour information does not authorize fabricated hour-pillar relation evidence.',
    'Career Natal T8 remains the existing research candidate and is reused without rewriting or authority promotion.',
  ],
  requiredFactTypes: ['temporal.targetYear', 'temporal.annualPillar', 'temporal.annualStemTenGod'],
  optionalFactTypes: ['temporal.annualBranchRelations'],
  inputContract: {
    factInputs: [
      {
        source: 'temporal_fact',
        pathPattern: 'targetYear',
        mode: 'required',
        rationale: 'Every Career Annual T9 claim must be bound to the request-resolved target year.',
      },
      {
        source: 'temporal_fact',
        pathPattern: 'annualPillar',
        mode: 'required',
        rationale: 'Every Career Annual T9 claim must be bound to the request-resolved annual pillar.',
      },
      {
        source: 'temporal_fact',
        pathPattern: 'annualStemTenGod',
        mode: 'required',
        rationale: 'Primary Career Annual activation is personalized against the natal day master.',
      },
      ...PILLAR_SLOTS.map((slot) => ({
        source: 'temporal_fact' as const,
        pathPattern: `annualBranchRelations.${slot}`,
        mode: 'allowed' as const,
        rationale: 'Optional resolved annual-to-natal branch clash signal.',
      })),
    ],
  },
  sourceIds: [CAREER_ANNUAL_POLICY_SOURCE.sourceId],
  status: 'research',
} satisfies MethodologyDefinition);

function sourceRefs(): RuleDefinition['sourceRefs'] {
  return [
    {
      sourceId: CAREER_ANNUAL_POLICY_SOURCE.sourceId,
      supportType: 'implementation_reference',
      notes: 'MyeongHa Career Annual Policy v1 bounds the permitted T9 career semantics.',
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
    ruleId: `RULE-CAREER-ANNUAL-T9-${tenGod}`,
    version: CAREER_ANNUAL_READING_CANDIDATE_VERSION,
    ruleSetId: ACTIVATION_RULE_SET,
    taxonomy: { tier: 'T9', category: 'career', subcategory: 'annual' },
    methodologyRef: { id: METHOD_ID, version: CAREER_ANNUAL_READING_CANDIDATE_VERSION },
    title: `Career Annual ${tenGod} activation`,
    description:
      'Emits one bounded career working-pattern tendency only when the request-scoped annual stem Ten-God matches.',
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
      claimType: CAREER_ANNUAL_THEME_CLAIM_TYPE.claimType,
      subject: 'annual_period',
      predicate: 'career_annual_theme_activation',
      value: {
        semanticKey: theme.semanticKey,
        careerAxis: theme.axis,
        tenGod,
        activationKind: 'annual_stem_ten_god',
        narrativeRole: 'primary',
        boundedTo: 'career_working_pattern_tendency',
        forbiddenInferences: [
          'hiring_prediction',
          'firing_prediction',
          'resignation_prediction',
          'job_change_prediction',
          'promotion_prediction',
          'compensation_prediction',
          'business_success_prediction',
        ],
      },
      polarity: 'neutral',
      emphasis: 'major',
      tags: ['research', 'career', 'annual', 'request-scoped', 'activation'],
    },
    sourceRefs: sourceRefs(),
    quality: QUALITY,
    status: 'research',
  };
}

function branchClashRule(slot: (typeof PILLAR_SLOTS)[number]): RuleDefinition {
  return {
    ruleId: `RULE-CAREER-ANNUAL-T9-BRANCH-CLASH-${slot.toUpperCase()}`,
    version: CAREER_ANNUAL_READING_CANDIDATE_VERSION,
    ruleSetId: TENSION_RULE_SET,
    taxonomy: { tier: 'T9', category: 'career', subcategory: 'annual' },
    methodologyRef: { id: METHOD_ID, version: CAREER_ANNUAL_READING_CANDIDATE_VERSION },
    title: `Career Annual branch clash tension at natal ${slot} pillar`,
    description:
      'Records a resolved annual-to-natal branch clash only as bounded career work-adjustment pressure.',
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
      claimType: CAREER_ANNUAL_TENSION_CLAIM_TYPE.claimType,
      subject: 'annual_period',
      predicate: 'career_annual_branch_clash_tension',
      value: {
        semanticKey: `CAREER_ANNUAL_BRANCH_CLASH_${slot.toUpperCase()}`,
        natalPillar: slot,
        relation: 'clash',
        narrativeRole: 'tension',
        boundedTo: 'work_adjustment_pressure',
        adjustmentAreas: ['role', 'schedule', 'team_collaboration', 'working_method'],
        forbiddenInferences: [
          'firing_prediction',
          'job_loss_prediction',
          'resignation_prediction',
          'job_change_prediction',
          'promotion_prediction',
          'specific_career_event',
        ],
      },
      polarity: 'challenging',
      emphasis: slot === 'day' ? 'moderate' : 'minor',
      tags: ['research', 'career', 'annual', 'request-scoped', 'branch-clash', 'tension'],
    },
    sourceRefs: sourceRefs(),
    quality: QUALITY,
    status: 'research',
  };
}

export const CAREER_ANNUAL_ACTIVATION_RULES: readonly RuleDefinition[] = Object.freeze(
  TEN_GODS.map(activationRule),
);

export const CAREER_ANNUAL_TENSION_RULES: readonly RuleDefinition[] = Object.freeze(
  PILLAR_SLOTS.map(branchClashRule),
);

const ALL_RULES: readonly RuleDefinition[] = Object.freeze([
  ...CAREER_NATAL_READING_RULES,
  ...CAREER_ANNUAL_ACTIVATION_RULES,
  ...CAREER_ANNUAL_TENSION_RULES,
]);

const ENABLED_RULE_SETS = Object.freeze([...new Set(ALL_RULES.map((rule) => rule.ruleSetId))]);

export const CAREER_ANNUAL_READING_PACK = Object.freeze({
  packId: 'PACK-CAREER-ANNUAL-READING-CANDIDATE',
  version: CAREER_ANNUAL_READING_CANDIDATE_VERSION,
  name: 'Career Annual Reading Research Candidate',
  methodologyRefs: [
    {
      id: CAREER_NATAL_READING_METHODOLOGY.methodologyId,
      version: CAREER_NATAL_READING_CANDIDATE_VERSION,
    },
    { id: METHOD_ID, version: CAREER_ANNUAL_READING_CANDIDATE_VERSION },
  ],
  enabledRuleSets: ENABLED_RULE_SETS,
  conflictPolicy: 'preserve_all',
  ambiguityPolicy: 'propagate',
  compositionPolicyRef: {
    id: 'COMPOSITION-CAREER-ANNUAL-READING-RESEARCH',
    version: CAREER_ANNUAL_READING_CANDIDATE_VERSION,
  },
  claimContractMode: 'registered_required',
  status: 'research',
} satisfies InterpretationPack);

export function createCareerAnnualReadingCandidateRegistry(
  createdAt = '1970-01-01T00:00:00.000Z',
) {
  return createRuleRegistrySnapshot(
    {
      rules: [...ALL_RULES],
      methodologies: [CAREER_NATAL_READING_METHODOLOGY, CAREER_ANNUAL_READING_METHODOLOGY],
      sources: [
        GENERAL_NATAL_USEFUL_READING_SOURCE,
        GENERAL_NATAL_CONCLUSION_SOURCE,
        CAREER_ANNUAL_POLICY_SOURCE,
      ],
      claimTypeDefinitions: [
        ...CAREER_NATAL_REUSED_CLAIM_TYPE_DEFINITIONS,
        CAREER_ANNUAL_THEME_CLAIM_TYPE,
        CAREER_ANNUAL_TENSION_CLAIM_TYPE,
      ],
      claimValueSchemas: [
        CAREER_NATAL_REUSED_CLAIM_SCHEMA,
        CAREER_ANNUAL_THEME_SCHEMA,
        CAREER_ANNUAL_TENSION_SCHEMA,
      ],
    },
    CAREER_ANNUAL_READING_PACK,
    createdAt,
  );
}
