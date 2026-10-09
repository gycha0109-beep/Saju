import type {
  ClaimTypeDefinition,
  ClaimValueSchemaDefinition,
  InterpretationPack,
  MethodologyDefinition,
  MethodologyResearchEvidenceInputContract,
  RuleDefinition,
  RuleInputRequirement,
} from '../contracts/interpretation.js';
import { createRuleRegistrySnapshot } from '../interpretation/rule-registry.js';
import { GOVERNED_SUPPORT_PARTIAL_ORDER_AUTHORITY } from './shared-natal-governed-support-partial-order-authority.js';
import { GOVERNED_SUPPORT_PARTIAL_ORDER_EVIDENCE_DEFINITION as definition } from './shared-natal-governed-support-partial-order-research-evidence-adapter.js';
import { VISIBLE_STEM_YINSHOU_SUPPORT_COLLECTION_SOURCES } from './shared-natal-visible-stem-yinshou-support-collection-structural-claim.js';

const version = '0.1.0-research';
const methodologyId = 'M-STRENGTH-FUYI-GOVERNED-BOUNDED-SUPPORT-PARTIAL-ORDER';
const ruleSetId = 'saju-r29-governed-support-partial-order';
const schemaId = 'day_master.governed_bounded_support_partial_order.schema';
const definitionRef = { id: definition.definitionId, version: definition.version };
export const GOVERNED_SUPPORT_PARTIAL_ORDER_CLAIM_TYPE =
  'DAY_MASTER_GOVERNED_BOUNDED_SUPPORT_PARTIAL_ORDER_EVIDENCE';
const researchInput = {
  source: 'research_evidence',
  evidenceType: definition.evidenceType,
  evidenceVersion: definition.evidenceVersion,
  definitionRef,
  mode: 'allowed',
  rationale:
    'Only exact same-snapshot R6/R23/R28 reproduction may bind selected-source observations to the eligible partial-order frontier. Dominated, incomparable and unranked observations are retained without support-effect settlement.',
} as const satisfies MethodologyResearchEvidenceInputContract;
const input = {
  key: 'governedSupportPartialOrderEvidence',
  source: 'research_evidence',
  pathOrClaimType: definition.evidenceType,
  required: true,
  ambiguityBehavior: 'requires_resolved',
  evidenceVersion: definition.evidenceVersion,
  researchEvidenceDefinitionRef: definitionRef,
} as const satisfies RuleInputRequirement;
export const GOVERNED_SUPPORT_PARTIAL_ORDER_CLAIM_VALUE = {
  evidenceKind: 'governed_bounded_support_partial_order',
  semanticScope: 'selected_source_eligible_observations_only',
  supportObservationPresent: true,
  dominatedEvidencePreserved: true,
  incomparableEvidencePreserved: true,
  unrankedEvidencePreserved: true,
  wholeChartComplete: false,
  supportCountOrScore: 'not_authorized',
  repeatedEvidenceAggregation: 'not_authorized',
  compositionVerdict: 'not_determined',
  dangZhong: 'not_determined',
  zhuGua: 'not_determined',
  qiangRuo: 'not_determined',
  wangShuai: 'not_determined',
  gyeokguk: 'not_determined',
  narrativeMateriality: false,
  productionAuthority: false,
} as const;
export const GOVERNED_SUPPORT_PARTIAL_ORDER_CLAIM_VALUE_SCHEMA = {
  schemaId,
  version,
  root: {
    kind: 'object',
    required: Object.keys(GOVERNED_SUPPORT_PARTIAL_ORDER_CLAIM_VALUE),
    properties: Object.fromEntries(
      Object.entries(GOVERNED_SUPPORT_PARTIAL_ORDER_CLAIM_VALUE).map(([key, value]) => [
        key,
        { kind: 'literal' as const, value },
      ]),
    ),
    additionalProperties: false,
  },
} as const satisfies ClaimValueSchemaDefinition;
export const GOVERNED_SUPPORT_PARTIAL_ORDER_CLAIM_TYPE_DEFINITION = {
  claimType: GOVERNED_SUPPORT_PARTIAL_ORDER_CLAIM_TYPE,
  version,
  valueSchemaRef: { id: schemaId, version },
  scope: 'natal',
  exclusiveValue: true,
  scenarioSensitive: true,
  materialForNarrative: false,
  allowedTaxonomyTiers: ['T2'],
} as const satisfies ClaimTypeDefinition;
export const GOVERNED_SUPPORT_PARTIAL_ORDER_METHODOLOGY = {
  methodologyId,
  version,
  family: 'day_master_strength',
  name: 'Governed bounded support partial-order composition',
  description: GOVERNED_SUPPORT_PARTIAL_ORDER_AUTHORITY.authorityBoundary,
  assumptions: [
    'Every input is replayed from the same snapshot; all pillars and the visible non-self domain must be resolved.',
    'Existing selected-source positive predicates, not legacy raw root tables, admit root classes.',
    'Only non-Earth roots and exact 比肩 enter authorized comparisons; 印綬 and Earth stay unordered.',
    '겁재 remains unranked outside the eligible frontier; no 比肩 comparison is inherited.',
    'Repeated observations preserve provenance and are never summed; singleton frontier is not strength.',
    'No current observation or absent claim cannot establish no support, 無根, 助寡 or weak.',
  ],
  requiredFactTypes: [],
  inputContract: { researchEvidenceInputs: [researchInput] },
  sourceIds: VISIBLE_STEM_YINSHOU_SUPPORT_COLLECTION_SOURCES.map((source) => source.sourceId),
  status: 'research',
} as const satisfies MethodologyDefinition;
export const GOVERNED_SUPPORT_PARTIAL_ORDER_RULE: RuleDefinition = {
  ruleId: 'RULE-SAJU-R29-GOVERNED-BOUNDED-SUPPORT-PARTIAL-ORDER',
  version,
  ruleSetId,
  taxonomy: {
    tier: 'T2',
    category: 'day_master_strength',
    subcategory: 'governed_bounded_support_partial_order',
  },
  methodologyRef: { id: methodologyId, version },
  title: 'Governed bounded support partial-order evidence observed',
  description:
    'Non-narrative structural marker; detailed provenance and eligible-only ordering remain in validated evidence.',
  inputs: [input],
  condition: {
    op: 'eq',
    left: { kind: 'input', key: input.key, path: 'supportObservationPresent' },
    right: { kind: 'literal', value: true },
  },
  output: {
    claimType: GOVERNED_SUPPORT_PARTIAL_ORDER_CLAIM_TYPE,
    subject: 'day_master',
    predicate: 'governed_bounded_support_partial_order_observed',
    value: GOVERNED_SUPPORT_PARTIAL_ORDER_CLAIM_VALUE,
    polarity: 'neutral',
    emphasis: 'minor',
    tags: ['research', 'support', 'partial-order', 'non-additive'],
  },
  sourceRefs: VISIBLE_STEM_YINSHOU_SUPPORT_COLLECTION_SOURCES.map((source) => ({
    sourceId: source.sourceId,
    supportType: 'interpretive_basis',
    notes:
      'R29 explicitly binds existing governed observations and selected-source-compatible comparisons, with unresolved precedence preserved.',
  })),
  quality: {
    provenanceQuality: 'secondary_only',
    testCoverage: 'fixture_matrix',
    methodologyStability: 'contested',
    reviewerStatus: 'unreviewed',
  },
  status: 'research',
};
export const GOVERNED_SUPPORT_PARTIAL_ORDER_PACK = {
  packId: 'PACK-SAJU-R29-GOVERNED-BOUNDED-SUPPORT-PARTIAL-ORDER-RESEARCH',
  version,
  name: 'SAJU-R29 Governed Bounded Support Partial Order Research Pack',
  methodologyRefs: [{ id: methodologyId, version }],
  enabledRuleSets: [ruleSetId],
  conflictPolicy: 'preserve_all',
  ambiguityPolicy: 'skip_requires_resolved',
  compositionPolicyRef: {
    id: 'COMPOSITION-SAJU-R29-GOVERNED-BOUNDED-SUPPORT-PARTIAL-ORDER-RESEARCH',
    version,
  },
  claimContractMode: 'registered_required',
  status: 'research',
} as const satisfies InterpretationPack;
export function createGovernedSupportPartialOrderResearchRegistry(
  createdAt = '1970-01-01T00:00:00.000Z',
) {
  return createRuleRegistrySnapshot(
    {
      rules: [GOVERNED_SUPPORT_PARTIAL_ORDER_RULE],
      methodologies: [GOVERNED_SUPPORT_PARTIAL_ORDER_METHODOLOGY],
      sources: [...VISIBLE_STEM_YINSHOU_SUPPORT_COLLECTION_SOURCES],
      claimTypeDefinitions: [GOVERNED_SUPPORT_PARTIAL_ORDER_CLAIM_TYPE_DEFINITION],
      claimValueSchemas: [GOVERNED_SUPPORT_PARTIAL_ORDER_CLAIM_VALUE_SCHEMA],
      reviewAttestations: [],
    },
    GOVERNED_SUPPORT_PARTIAL_ORDER_PACK,
    createdAt,
  );
}
