import type { TenGod } from '../contracts/calculation.js';
import type {
  ClaimTypeDefinition,
  ClaimValueSchemaDefinition,
  InterpretationPack,
  MethodologyDefinition,
  RuleDefinition,
} from '../contracts/interpretation.js';
import { createRuleRegistrySnapshot } from '../interpretation/rule-registry.js';
import { careerMethodologyDecision, careerMethodologyMayAuthorTier } from './career-personalization-methodology-gate.js';
import { GENERAL_NATAL_CONCLUSION_SOURCE } from './general-natal-conclusion-synthesis-candidate.js';
import { GENERAL_NATAL_USEFUL_READING_SOURCE } from './general-natal-useful-reading-candidate.js';

export const CAREER_PERSONALIZED_T5_SUBSTRATE_VERSION = '0.1.0-research' as const;
export const CAREER_T5_SUBTYPE_CLAIM_TYPE = 'CAREER_T5_TEN_GOD_SUBTYPE_SEMANTIC' as const;
export const CAREER_T5_FAMILY_RELATION_CLAIM_TYPE = 'CAREER_T5_FAMILY_RELATION_CONTEXT' as const;

const SUBTYPE_METHOD_ID = 'M-CAREER-PERSONALIZED-T5-TEN-GOD-SUBTYPE-V1';
const RELATION_METHOD_ID = 'M-CAREER-PERSONALIZED-T5-FAMILY-RELATION-V1';
const SUBTYPE_RULE_SET = 'career-personalized-t5-ten-god-subtype';
const RELATION_RULE_SET = 'career-personalized-t5-family-relation';

export type CareerT5Family = 'peer' | 'resource' | 'output' | 'wealth' | 'officer';
export type CareerT5SubtypeFacet =
  | 'self_direction'
  | 'peer_competition'
  | 'steady_output'
  | 'critical_expression'
  | 'adaptive_resource_operation'
  | 'stable_resource_management'
  | 'pressure_and_constraint'
  | 'formal_responsibility'
  | 'exploratory_learning'
  | 'structured_learning';

interface CareerT5SubtypeSemantic {
  semanticKey: string;
  exactTenGod: TenGod;
  family: CareerT5Family;
  facet: CareerT5SubtypeFacet;
  scope: 'semantic_substrate_only';
  forbiddenInferences: readonly string[];
}

interface CareerT5Slot {
  slotId: string;
  logicalPath: string;
}

interface CareerT5FamilyRelationSpec {
  id: string;
  semanticKey: string;
  sourceFamily: CareerT5Family;
  targetFamily: CareerT5Family;
  relationKind: 'generation' | 'control';
  relation:
    | 'output_generates_wealth'
    | 'wealth_generates_officer'
    | 'officer_generates_resource'
    | 'peer_controls_wealth'
    | 'wealth_controls_resource'
    | 'officer_controls_peer';
}

const QUALITY: RuleDefinition['quality'] = {
  provenanceQuality: 'multi_source_supported',
  testCoverage: 'fixture_matrix',
  methodologyStability: 'contested',
  reviewerStatus: 'unreviewed',
};

const SUBTYPE_QUALITY: RuleDefinition['quality'] = {
  provenanceQuality: 'secondary_only',
  testCoverage: 'fixture_matrix',
  methodologyStability: 'contested',
  reviewerStatus: 'unreviewed',
};

const SLOTS = [
  { slotId: 'year-stem', logicalPath: 'derivedFacts.tenGods.year.stem' },
  { slotId: 'year-branch', logicalPath: 'derivedFacts.tenGods.year.branch' },
  { slotId: 'month-stem', logicalPath: 'derivedFacts.tenGods.month.stem' },
  { slotId: 'month-branch', logicalPath: 'derivedFacts.tenGods.month.branch' },
  { slotId: 'day-branch', logicalPath: 'derivedFacts.tenGods.day.branch' },
  { slotId: 'hour-stem', logicalPath: 'derivedFacts.tenGods.hour.stem' },
  { slotId: 'hour-branch', logicalPath: 'derivedFacts.tenGods.hour.branch' },
] as const satisfies readonly CareerT5Slot[];

const FORBIDDEN_INFERENCES = [
  'specific_occupation',
  'career_success',
  'salary_outcome',
  'promotion_outcome',
  'future_timing',
  'numeric_career_score',
] as const;

const SUBTYPE_SEMANTICS = {
  비견: {
    semanticKey: 'TEN_GOD_BI_GYEON_SELF_DIRECTION',
    exactTenGod: '비견',
    family: 'peer',
    facet: 'self_direction',
    scope: 'semantic_substrate_only',
    forbiddenInferences: FORBIDDEN_INFERENCES,
  },
  겁재: {
    semanticKey: 'TEN_GOD_GEOP_JAE_PEER_COMPETITION',
    exactTenGod: '겁재',
    family: 'peer',
    facet: 'peer_competition',
    scope: 'semantic_substrate_only',
    forbiddenInferences: FORBIDDEN_INFERENCES,
  },
  식신: {
    semanticKey: 'TEN_GOD_SIK_SIN_STEADY_OUTPUT',
    exactTenGod: '식신',
    family: 'output',
    facet: 'steady_output',
    scope: 'semantic_substrate_only',
    forbiddenInferences: FORBIDDEN_INFERENCES,
  },
  상관: {
    semanticKey: 'TEN_GOD_SANG_GWAN_CRITICAL_EXPRESSION',
    exactTenGod: '상관',
    family: 'output',
    facet: 'critical_expression',
    scope: 'semantic_substrate_only',
    forbiddenInferences: FORBIDDEN_INFERENCES,
  },
  편재: {
    semanticKey: 'TEN_GOD_PYEON_JAE_ADAPTIVE_RESOURCE_OPERATION',
    exactTenGod: '편재',
    family: 'wealth',
    facet: 'adaptive_resource_operation',
    scope: 'semantic_substrate_only',
    forbiddenInferences: FORBIDDEN_INFERENCES,
  },
  정재: {
    semanticKey: 'TEN_GOD_JEONG_JAE_STABLE_RESOURCE_MANAGEMENT',
    exactTenGod: '정재',
    family: 'wealth',
    facet: 'stable_resource_management',
    scope: 'semantic_substrate_only',
    forbiddenInferences: FORBIDDEN_INFERENCES,
  },
  편관: {
    semanticKey: 'TEN_GOD_PYEON_GWAN_PRESSURE_AND_CONSTRAINT',
    exactTenGod: '편관',
    family: 'officer',
    facet: 'pressure_and_constraint',
    scope: 'semantic_substrate_only',
    forbiddenInferences: FORBIDDEN_INFERENCES,
  },
  정관: {
    semanticKey: 'TEN_GOD_JEONG_GWAN_FORMAL_RESPONSIBILITY',
    exactTenGod: '정관',
    family: 'officer',
    facet: 'formal_responsibility',
    scope: 'semantic_substrate_only',
    forbiddenInferences: FORBIDDEN_INFERENCES,
  },
  편인: {
    semanticKey: 'TEN_GOD_PYEON_IN_EXPLORATORY_LEARNING',
    exactTenGod: '편인',
    family: 'resource',
    facet: 'exploratory_learning',
    scope: 'semantic_substrate_only',
    forbiddenInferences: FORBIDDEN_INFERENCES,
  },
  정인: {
    semanticKey: 'TEN_GOD_JEONG_IN_STRUCTURED_LEARNING',
    exactTenGod: '정인',
    family: 'resource',
    facet: 'structured_learning',
    scope: 'semantic_substrate_only',
    forbiddenInferences: FORBIDDEN_INFERENCES,
  },
} as const satisfies Readonly<Record<TenGod, CareerT5SubtypeSemantic>>;

const FAMILY_RELATIONS = [
  {
    id: 'OUTPUT-GENERATES-WEALTH',
    semanticKey: 'TEN_GOD_FAMILY_OUTPUT_GENERATES_WEALTH',
    sourceFamily: 'output',
    targetFamily: 'wealth',
    relationKind: 'generation',
    relation: 'output_generates_wealth',
  },
  {
    id: 'WEALTH-GENERATES-OFFICER',
    semanticKey: 'TEN_GOD_FAMILY_WEALTH_GENERATES_OFFICER',
    sourceFamily: 'wealth',
    targetFamily: 'officer',
    relationKind: 'generation',
    relation: 'wealth_generates_officer',
  },
  {
    id: 'OFFICER-GENERATES-RESOURCE',
    semanticKey: 'TEN_GOD_FAMILY_OFFICER_GENERATES_RESOURCE',
    sourceFamily: 'officer',
    targetFamily: 'resource',
    relationKind: 'generation',
    relation: 'officer_generates_resource',
  },
  {
    id: 'PEER-CONTROLS-WEALTH',
    semanticKey: 'TEN_GOD_FAMILY_PEER_CONTROLS_WEALTH',
    sourceFamily: 'peer',
    targetFamily: 'wealth',
    relationKind: 'control',
    relation: 'peer_controls_wealth',
  },
  {
    id: 'WEALTH-CONTROLS-RESOURCE',
    semanticKey: 'TEN_GOD_FAMILY_WEALTH_CONTROLS_RESOURCE',
    sourceFamily: 'wealth',
    targetFamily: 'resource',
    relationKind: 'control',
    relation: 'wealth_controls_resource',
  },
  {
    id: 'OFFICER-CONTROLS-PEER',
    semanticKey: 'TEN_GOD_FAMILY_OFFICER_CONTROLS_PEER',
    sourceFamily: 'officer',
    targetFamily: 'peer',
    relationKind: 'control',
    relation: 'officer_controls_peer',
  },
] as const satisfies readonly CareerT5FamilyRelationSpec[];

export const CAREER_T5_SUBTYPE_VALUE_SCHEMA = {
  schemaId: 'SCHEMA-CAREER-T5-TEN-GOD-SUBTYPE-SEMANTIC-V1',
  version: CAREER_PERSONALIZED_T5_SUBSTRATE_VERSION,
  root: {
    kind: 'object',
    required: ['semanticKey', 'exactTenGod', 'family', 'facet', 'scope', 'forbiddenInferences'],
    properties: {
      semanticKey: { kind: 'string' },
      exactTenGod: {
        kind: 'string',
        enum: ['비견', '겁재', '식신', '상관', '편재', '정재', '편관', '정관', '편인', '정인'],
      },
      family: { kind: 'string', enum: ['peer', 'resource', 'output', 'wealth', 'officer'] },
      facet: {
        kind: 'string',
        enum: [
          'self_direction',
          'peer_competition',
          'steady_output',
          'critical_expression',
          'adaptive_resource_operation',
          'stable_resource_management',
          'pressure_and_constraint',
          'formal_responsibility',
          'exploratory_learning',
          'structured_learning',
        ],
      },
      scope: { kind: 'string', enum: ['semantic_substrate_only'] },
      forbiddenInferences: { kind: 'array', items: { kind: 'string' }, minItems: 6, maxItems: 6 },
    },
    additionalProperties: false,
  },
} satisfies ClaimValueSchemaDefinition;

export const CAREER_T5_FAMILY_RELATION_VALUE_SCHEMA = {
  schemaId: 'SCHEMA-CAREER-T5-FAMILY-RELATION-CONTEXT-V1',
  version: CAREER_PERSONALIZED_T5_SUBSTRATE_VERSION,
  root: {
    kind: 'object',
    required: [
      'semanticKey',
      'sourceFamily',
      'targetFamily',
      'relationKind',
      'relation',
      'scope',
      'forbiddenInferences',
    ],
    properties: {
      semanticKey: { kind: 'string' },
      sourceFamily: { kind: 'string', enum: ['peer', 'resource', 'output', 'wealth', 'officer'] },
      targetFamily: { kind: 'string', enum: ['peer', 'resource', 'output', 'wealth', 'officer'] },
      relationKind: { kind: 'string', enum: ['generation', 'control'] },
      relation: {
        kind: 'string',
        enum: [
          'output_generates_wealth',
          'wealth_generates_officer',
          'officer_generates_resource',
          'peer_controls_wealth',
          'wealth_controls_resource',
          'officer_controls_peer',
        ],
      },
      scope: { kind: 'string', enum: ['structural_context_only'] },
      forbiddenInferences: { kind: 'array', items: { kind: 'string' }, minItems: 6, maxItems: 6 },
    },
    additionalProperties: false,
  },
} satisfies ClaimValueSchemaDefinition;

export const CAREER_T5_SUBTYPE_CLAIM_DEFINITION = {
  claimType: CAREER_T5_SUBTYPE_CLAIM_TYPE,
  version: CAREER_PERSONALIZED_T5_SUBSTRATE_VERSION,
  valueSchemaRef: {
    id: CAREER_T5_SUBTYPE_VALUE_SCHEMA.schemaId,
    version: CAREER_T5_SUBTYPE_VALUE_SCHEMA.version,
  },
  scope: 'natal',
  exclusiveValue: false,
  scenarioSensitive: true,
  materialForNarrative: false,
  allowedTaxonomyTiers: ['T5'],
} satisfies ClaimTypeDefinition;

export const CAREER_T5_FAMILY_RELATION_CLAIM_DEFINITION = {
  claimType: CAREER_T5_FAMILY_RELATION_CLAIM_TYPE,
  version: CAREER_PERSONALIZED_T5_SUBSTRATE_VERSION,
  valueSchemaRef: {
    id: CAREER_T5_FAMILY_RELATION_VALUE_SCHEMA.schemaId,
    version: CAREER_T5_FAMILY_RELATION_VALUE_SCHEMA.version,
  },
  scope: 'natal',
  exclusiveValue: false,
  scenarioSensitive: true,
  materialForNarrative: false,
  allowedTaxonomyTiers: ['T5'],
} satisfies ClaimTypeDefinition;

export const CAREER_T5_SUBTYPE_METHODOLOGY = {
  methodologyId: SUBTYPE_METHOD_ID,
  version: CAREER_PERSONALIZED_T5_SUBSTRATE_VERSION,
  family: 'ten_gods',
  name: 'Career T5 exact Ten-God subtype semantic substrate (research)',
  description:
    'Materializes narrow exact Ten-God subtype semantics as non-narrative T5 substrate while preserving the precise logical fact path in provenance.',
  assumptions: [
    'Exact subtype semantics are lower-tier interpretation substrate, not a direct Career conclusion.',
    'Pillar position, stem/branch channel, hidden-stem participation, occurrence count, season, roots, and interactions do not change the semantic value in this methodology.',
    'Repeated observations may produce repeated evidence claims but repetition is not magnitude, rank, or dominance.',
    'Specific occupation, career success, salary, promotion, future timing, and numeric Career scoring are not authorized.',
    'Unknown or unavailable Ten-God facts fail closed and are not reconstructed inside interpretation.',
  ],
  requiredFactTypes: ['derivedFacts.tenGods'],
  inputContract: {
    factInputs: SLOTS.map((slot) => ({
      source: 'derived_fact' as const,
      pathPattern: slot.logicalPath,
      mode: 'allowed' as const,
      rationale: 'P1 authorizes exact Ten-God subtype semantics at T5; the slot is retained only as provenance.',
    })),
  },
  sourceIds: [GENERAL_NATAL_USEFUL_READING_SOURCE.sourceId],
  status: 'research',
} satisfies MethodologyDefinition;

export const CAREER_T5_FAMILY_RELATION_METHODOLOGY = {
  methodologyId: RELATION_METHOD_ID,
  version: CAREER_PERSONALIZED_T5_SUBSTRATE_VERSION,
  family: 'ten_gods',
  name: 'Career T5 broad-family relation context (research)',
  description:
    'Materializes only source-bound Ten-God family generation/control context from already-emitted exact-subtype T5 claims.',
  assumptions: [
    'Family coexistence and relation vocabulary are structural context only, not a Career T8 conclusion.',
    'The number of upstream subtype observations is not interpreted as strength, magnitude, or priority.',
    'No conflict winner, weighted precedence, occupation assignment, success outcome, salary, promotion, or future timing is authorized.',
  ],
  requiredFactTypes: [],
  inputContract: {
    claimInputs: [
      {
        source: 'interpretation_claim',
        claimType: CAREER_T5_SUBTYPE_CLAIM_TYPE,
        mode: 'allowed',
        rationale: 'P1 broad-family context may consume only bounded subtype T5 claims.',
      },
    ],
  },
  sourceIds: [GENERAL_NATAL_USEFUL_READING_SOURCE.sourceId, GENERAL_NATAL_CONCLUSION_SOURCE.sourceId],
  status: 'research',
} satisfies MethodologyDefinition;

function subtypeSourceRefs(): RuleDefinition['sourceRefs'] {
  return [
    {
      sourceId: GENERAL_NATAL_USEFUL_READING_SOURCE.sourceId,
      supportType: 'interpretive_basis',
      notes: 'Supports narrow exact Ten-God semantic vocabulary only; direct Career outcome inference remains excluded.',
    },
  ];
}

function relationSourceRefs(): RuleDefinition['sourceRefs'] {
  return [
    {
      sourceId: GENERAL_NATAL_CONCLUSION_SOURCE.sourceId,
      supportType: 'interpretive_basis',
      notes: 'Supports broad generation/control relations among Ten-God families as structural context.',
    },
    {
      sourceId: GENERAL_NATAL_USEFUL_READING_SOURCE.sourceId,
      supportType: 'corroboration',
      notes: 'Corroborates the bounded family vocabulary without authorizing Career outcomes.',
    },
  ];
}

function safeId(value: string): string {
  return value.replaceAll('_', '-').replaceAll(' ', '-').toUpperCase();
}

function subtypeRule(slot: CareerT5Slot, tenGod: TenGod): RuleDefinition {
  const semantic = SUBTYPE_SEMANTICS[tenGod];
  return {
    ruleId: `RULE-CAREER-PERSONALIZED-T5-${safeId(slot.slotId)}-${safeId(semantic.semanticKey)}`,
    version: CAREER_PERSONALIZED_T5_SUBSTRATE_VERSION,
    ruleSetId: SUBTYPE_RULE_SET,
    taxonomy: { tier: 'T5', category: 'career', subcategory: 'ten_god_subtype' },
    methodologyRef: {
      id: CAREER_T5_SUBTYPE_METHODOLOGY.methodologyId,
      version: CAREER_T5_SUBTYPE_METHODOLOGY.version,
    },
    title: `Career T5 exact subtype ${tenGod} at ${slot.slotId}`,
    description:
      'Emits one exact-subtype semantic claim from one precise logical Ten-God fact path. Slot identity remains provenance and does not alter semantic meaning.',
    inputs: [
      {
        key: 'tenGod',
        source: 'derived_fact',
        pathOrClaimType: slot.logicalPath,
        acceptedStatuses: ['resolved'],
        required: true,
        ambiguityBehavior: 'scenario_preserving',
      },
    ],
    condition: {
      op: 'eq',
      left: { kind: 'input', key: 'tenGod' },
      right: { kind: 'literal', value: tenGod },
    },
    output: {
      claimType: CAREER_T5_SUBTYPE_CLAIM_TYPE,
      subject: 'natal_chart',
      predicate: 'career_t5_subtype_semantic',
      value: semantic,
      polarity: 'neutral',
      tags: ['research', 'career', 't5', 'semantic-substrate', 'non-narrative'],
    },
    sourceRefs: subtypeSourceRefs(),
    quality: SUBTYPE_QUALITY,
    status: 'research',
  };
}

function familyInput(key: string, family: CareerT5Family): RuleDefinition['inputs'][number] {
  return {
    key,
    source: 'interpretation_claim',
    pathOrClaimType: CAREER_T5_SUBTYPE_CLAIM_TYPE,
    required: true,
    ambiguityBehavior: 'scenario_preserving',
    cardinality: 'one_or_more',
    claimSelector: {
      taxonomy: { tiers: ['T5'], categories: ['career'], subcategories: ['ten_god_subtype'] },
      subjects: ['natal_chart'],
      predicates: ['career_t5_subtype_semantic'],
      methodologyRefs: [
        {
          id: CAREER_T5_SUBTYPE_METHODOLOGY.methodologyId,
          version: CAREER_T5_SUBTYPE_METHODOLOGY.version,
        },
      ],
      valueEquals: [{ path: 'family', value: family }],
    },
  };
}

function relationRule(spec: CareerT5FamilyRelationSpec): RuleDefinition {
  return {
    ruleId: `RULE-CAREER-PERSONALIZED-T5-FAMILY-${spec.id}`,
    version: CAREER_PERSONALIZED_T5_SUBSTRATE_VERSION,
    ruleSetId: RELATION_RULE_SET,
    taxonomy: { tier: 'T5', category: 'career', subcategory: 'family_relation_context' },
    methodologyRef: {
      id: CAREER_T5_FAMILY_RELATION_METHODOLOGY.methodologyId,
      version: CAREER_T5_FAMILY_RELATION_METHODOLOGY.version,
    },
    title: `Career T5 family context ${spec.relation}`,
    description:
      'Emits one broad-family structural relation context only when both source and target families are represented by bounded subtype T5 claims.',
    inputs: [familyInput('sourceFamilyClaims', spec.sourceFamily), familyInput('targetFamilyClaims', spec.targetFamily)],
    condition: {
      op: 'and',
      expressions: [
        { op: 'exists', value: { kind: 'input', key: 'sourceFamilyClaims' } },
        { op: 'exists', value: { kind: 'input', key: 'targetFamilyClaims' } },
      ],
    },
    output: {
      claimType: CAREER_T5_FAMILY_RELATION_CLAIM_TYPE,
      subject: 'natal_chart',
      predicate: 'career_t5_family_relation_context',
      value: {
        semanticKey: spec.semanticKey,
        sourceFamily: spec.sourceFamily,
        targetFamily: spec.targetFamily,
        relationKind: spec.relationKind,
        relation: spec.relation,
        scope: 'structural_context_only',
        forbiddenInferences: FORBIDDEN_INFERENCES,
      },
      polarity: 'neutral',
      tags: ['research', 'career', 't5', 'family-relation', 'non-narrative'],
    },
    sourceRefs: relationSourceRefs(),
    quality: QUALITY,
    status: 'research',
  };
}

export const CAREER_PERSONALIZED_T5_SUBTYPE_RULES: readonly RuleDefinition[] = SLOTS.flatMap((slot) =>
  (Object.keys(SUBTYPE_SEMANTICS) as TenGod[]).map((tenGod) => subtypeRule(slot, tenGod)),
);

export const CAREER_PERSONALIZED_T5_FAMILY_RELATION_RULES: readonly RuleDefinition[] =
  FAMILY_RELATIONS.map(relationRule);

export const CAREER_PERSONALIZED_T5_RULES: readonly RuleDefinition[] = [
  ...CAREER_PERSONALIZED_T5_SUBTYPE_RULES,
  ...CAREER_PERSONALIZED_T5_FAMILY_RELATION_RULES,
];

export const CAREER_PERSONALIZED_T5_PACK = {
  packId: 'PACK-CAREER-PERSONALIZED-T5-SUBSTRATE',
  version: CAREER_PERSONALIZED_T5_SUBSTRATE_VERSION,
  name: 'Career personalized T5 semantic substrate research pack',
  methodologyRefs: [
    { id: CAREER_T5_SUBTYPE_METHODOLOGY.methodologyId, version: CAREER_T5_SUBTYPE_METHODOLOGY.version },
    {
      id: CAREER_T5_FAMILY_RELATION_METHODOLOGY.methodologyId,
      version: CAREER_T5_FAMILY_RELATION_METHODOLOGY.version,
    },
  ],
  enabledRuleSets: [SUBTYPE_RULE_SET, RELATION_RULE_SET],
  conflictPolicy: 'preserve_all',
  ambiguityPolicy: 'propagate',
  compositionPolicyRef: {
    id: 'COMPOSITION-CAREER-PERSONALIZED-T5-SUBSTRATE',
    version: CAREER_PERSONALIZED_T5_SUBSTRATE_VERSION,
  },
  claimContractMode: 'registered_required',
  status: 'research',
} satisfies InterpretationPack;

function assertP1Gate(): void {
  const subtype = careerMethodologyDecision('exact_ten_god_subtype');
  const family = careerMethodologyDecision('broad_family_context');
  if (
    !careerMethodologyMayAuthorTier('exact_ten_god_subtype', 'T5') ||
    subtype.directCareerT8Authorized ||
    subtype.numericWeightingAuthorized ||
    !careerMethodologyMayAuthorTier('broad_family_context', 'T5') ||
    family.directCareerT8Authorized ||
    family.numericWeightingAuthorized
  ) {
    throw new Error('P1 Career methodology gate does not authorize the bounded P2 T5 substrate.');
  }
}

export function createCareerPersonalizedT5SubstrateRegistry(generatedAt?: string) {
  assertP1Gate();
  return createRuleRegistrySnapshot(
    {
      rules: CAREER_PERSONALIZED_T5_RULES,
      methodologies: [CAREER_T5_SUBTYPE_METHODOLOGY, CAREER_T5_FAMILY_RELATION_METHODOLOGY],
      sources: [GENERAL_NATAL_USEFUL_READING_SOURCE, GENERAL_NATAL_CONCLUSION_SOURCE],
      claimTypeDefinitions: [CAREER_T5_SUBTYPE_CLAIM_DEFINITION, CAREER_T5_FAMILY_RELATION_CLAIM_DEFINITION],
      claimValueSchemas: [CAREER_T5_SUBTYPE_VALUE_SCHEMA, CAREER_T5_FAMILY_RELATION_VALUE_SCHEMA],
    },
    CAREER_PERSONALIZED_T5_PACK,
    generatedAt,
  );
}
