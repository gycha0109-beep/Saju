import type { CanonicalSajuSnapshot } from '../contracts/calculation.js';
import type {
  ClaimTypeDefinition,
  ClaimValueSchemaDefinition,
  InterpretationPack,
  MethodologyDefinition,
  RuleDefinition,
} from '../contracts/interpretation.js';
import {
  runInterpretation,
  type InterpretationExecutionResult,
  type InterpretationRunOptions,
} from '../interpretation/interpretation-engine.js';
import { createRuleRegistrySnapshot } from '../interpretation/rule-registry.js';
import { RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_T6_INPUT_REQUIREMENT } from './relationship-spouse-t8-role-neutral-t6-input-governance.js';

export const RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_VERSION = '1.0.0' as const;
export const RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_CLAIM_TYPE =
  'relationship.spouse.role_neutral_spouse_star_marker' as const;

const CLAIM_SCHEMA_ID = 'relationship.spouse.role_neutral_spouse_star_marker.schema' as const;
const METHODOLOGY_ID = 'relationship-spouse-t8-role-neutral-day-master-polarity' as const;
const RULE_SET_ID = 'relationship-spouse-t8-role-neutral-runtime-admission' as const;

export const RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_CLAIM_VALUE_SCHEMA = Object.freeze({
  schemaId: CLAIM_SCHEMA_ID,
  version: RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_VERSION,
  root: {
    kind: 'union',
    anyOf: [
      {
        kind: 'object',
        required: [
          'dayMasterPolarity',
          'spouseStarSemantic',
          'tenGodNativeLabel',
          'tenGodHanjaLabel',
        ],
        properties: {
          dayMasterPolarity: { kind: 'literal', value: '양' },
          spouseStarSemantic: { kind: 'literal', value: 'INDIRECT_WEALTH' },
          tenGodNativeLabel: { kind: 'literal', value: '편재' },
          tenGodHanjaLabel: { kind: 'literal', value: '偏財' },
        },
        additionalProperties: false,
      },
      {
        kind: 'object',
        required: [
          'dayMasterPolarity',
          'spouseStarSemantic',
          'tenGodNativeLabel',
          'tenGodHanjaLabel',
        ],
        properties: {
          dayMasterPolarity: { kind: 'literal', value: '음' },
          spouseStarSemantic: { kind: 'literal', value: 'INDIRECT_POWER' },
          tenGodNativeLabel: { kind: 'literal', value: '편관' },
          tenGodHanjaLabel: { kind: 'literal', value: '偏官' },
        },
        additionalProperties: false,
      },
    ],
  },
} as const satisfies ClaimValueSchemaDefinition);

export const RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_CLAIM_TYPE_DEFINITION = Object.freeze({
  claimType: RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_CLAIM_TYPE,
  version: RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_VERSION,
  valueSchemaRef: {
    id: CLAIM_SCHEMA_ID,
    version: RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_VERSION,
  },
  scope: 'natal',
  exclusiveValue: true,
  scenarioSensitive: false,
  materialForNarrative: false,
  allowedTaxonomyTiers: ['T8'],
} as const satisfies ClaimTypeDefinition);

export const RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_METHODOLOGY = Object.freeze({
  methodologyId: METHODOLOGY_ID,
  version: RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_VERSION,
  family: 'ten_gods',
  name: 'Role-neutral spouse-star Day-Master-polarity runtime admission',
  description:
    'Research-only Relationship / Spouse T8 runtime admission of the already-governed resolved Day Master polarity correspondence. It neither reconstructs T5 subtype/slot data nor activates a consumer path.',
  assumptions: [
    'The five-of-five Relationship / Spouse T8 research authority is already closed and authority-admission-ready.',
    'Only resolved canonical derivedFacts.dayMaster is consumed.',
    'The admitted claim is a bounded role-neutral spouse-star marker, not a marriage, fertility, compatibility, identity, legality, or ethics conclusion.',
  ],
  requiredFactTypes: ['derivedFacts.dayMaster'],
  inputContract: {
    factInputs: [
      {
        source: 'derived_fact',
        pathPattern: 'derivedFacts.dayMaster',
        mode: 'required',
        rationale:
          'The governed role-neutral contract consumes only resolved canonical Day Master polarity; no T5 or demographic reconstruction is permitted.',
      },
    ],
  },
  sourceIds: [],
  status: 'research',
} as const satisfies MethodologyDefinition);

const COMMON_RULE_FIELDS = {
  version: RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_VERSION,
  ruleSetId: RULE_SET_ID,
  taxonomy: {
    tier: 'T8',
    category: 'relationship',
    subcategory: 'spouse',
  },
  methodologyRef: {
    id: METHODOLOGY_ID,
    version: RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_VERSION,
  },
  inputs: [RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_T6_INPUT_REQUIREMENT],
  sourceRefs: [],
  quality: {
    provenanceQuality: 'unknown',
    testCoverage: 'regression_suite',
    methodologyStability: 'stable_within_method',
    reviewerStatus: 'unreviewed',
  },
  status: 'research',
} as const;

export const RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_RULES = Object.freeze([
  {
    ...COMMON_RULE_FIELDS,
    ruleId: 'relationship-spouse-t8-yang-day-master',
    title: 'Yang Day Master role-neutral spouse-star marker',
    description:
      'Resolved Yang Day Master maps only to the governed Indirect Wealth / 편재 / 偏財 role-neutral spouse-star marker.',
    condition: {
      op: 'eq',
      left: {
        kind: 'input',
        key: 'relationship_spouse_role_neutral_day_master',
        path: 'yinYang',
      },
      right: { kind: 'literal', value: '양' },
    },
    output: {
      claimType: RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_CLAIM_TYPE,
      subject: 'native_chart',
      predicate: 'role_neutral_spouse_star_marker',
      value: {
        dayMasterPolarity: '양',
        spouseStarSemantic: 'INDIRECT_WEALTH',
        tenGodNativeLabel: '편재',
        tenGodHanjaLabel: '偏財',
      },
      polarity: 'neutral',
      tags: ['relationship', 'spouse', 'role_neutral', 'research_only'],
    },
  } as const satisfies RuleDefinition,
  {
    ...COMMON_RULE_FIELDS,
    ruleId: 'relationship-spouse-t8-yin-day-master',
    title: 'Yin Day Master role-neutral spouse-star marker',
    description:
      'Resolved Yin Day Master maps only to the governed Indirect Power / 편관 / 偏官 role-neutral spouse-star marker.',
    condition: {
      op: 'eq',
      left: {
        kind: 'input',
        key: 'relationship_spouse_role_neutral_day_master',
        path: 'yinYang',
      },
      right: { kind: 'literal', value: '음' },
    },
    output: {
      claimType: RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_CLAIM_TYPE,
      subject: 'native_chart',
      predicate: 'role_neutral_spouse_star_marker',
      value: {
        dayMasterPolarity: '음',
        spouseStarSemantic: 'INDIRECT_POWER',
        tenGodNativeLabel: '편관',
        tenGodHanjaLabel: '偏官',
      },
      polarity: 'neutral',
      tags: ['relationship', 'spouse', 'role_neutral', 'research_only'],
    },
  } as const satisfies RuleDefinition,
]);

export const RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_PACK = Object.freeze({
  packId: 'relationship-spouse-t8-runtime-admission',
  version: RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_VERSION,
  name: 'Relationship Spouse T8 isolated runtime admission',
  methodologyRefs: [
    {
      id: METHODOLOGY_ID,
      version: RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_VERSION,
    },
  ],
  enabledRuleSets: [RULE_SET_ID],
  conflictPolicy: 'preserve_all',
  ambiguityPolicy: 'skip_requires_resolved',
  compositionPolicyRef: {
    id: 'relationship-spouse-t8-runtime-admission-policy',
    version: RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_VERSION,
  },
  claimContractMode: 'registered_required',
  status: 'research',
} as const satisfies InterpretationPack);

export const RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_REGISTRY = createRuleRegistrySnapshot(
  {
    rules: RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_RULES,
    methodologies: [RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_METHODOLOGY],
    claimTypeDefinitions: [RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_CLAIM_TYPE_DEFINITION],
    claimValueSchemas: [RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_CLAIM_VALUE_SCHEMA],
  },
  RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_PACK,
);

export const RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_BOUNDARY = Object.freeze({
  authorityAdmissionReady: true,
  spouseT8ProducerReady: true,
  runtimeScope: 'isolated_research_only' as const,
  consumerNarrativeActivated: false,
  compatibilityConsumerActivated: false,
  previewDefaultRouteChanged: false,
  productionBehaviorChanged: false,
  productionPromotionReady: false,
  productionState: 'HOLD' as const,
} as const);

export function runRelationshipSpouseT8RuntimeAdmission(
  snapshot: CanonicalSajuSnapshot,
  options: InterpretationRunOptions = {},
): InterpretationExecutionResult {
  return runInterpretation(snapshot, RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_REGISTRY, options);
}
