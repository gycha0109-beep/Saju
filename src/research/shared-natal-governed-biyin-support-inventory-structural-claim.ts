import type {
  ClaimTypeDefinition,
  ClaimValueSchemaDefinition,
  InterpretationPack,
  MethodologyDefinition,
  MethodologyResearchEvidenceInputContract,
  RuleDefinition,
  RuleInputRequirement,
  SourceReference,
} from '../contracts/interpretation.js';
import { createRuleRegistrySnapshot } from '../interpretation/rule-registry.js';
import { GOVERNED_BIYIN_SUPPORT_INVENTORY_AUTHORITY as authority } from './governed-biyin-support-inventory-authority.js';
import { GOVERNED_BIYIN_SUPPORT_INVENTORY_EVIDENCE_DEFINITION as definition } from './shared-natal-governed-biyin-support-inventory-research-evidence-adapter.js';
import { HIDDEN_BIYIN_SUPPORT_CONSTITUENT_SOURCES } from './shared-natal-hidden-biyin-support-constituent-structural-claim.js';

const version = '0.1.0-research';
const methodologyId = 'M-STRENGTH-FUYI-GOVERNED-BIYIN-SUPPORT-INVENTORY';
const ruleSetId = 'saju-r31-governed-biyin-support-inventory';
const schemaId = 'day_master.governed_biyin_support_inventory.schema';
const definitionRef = { id: definition.definitionId, version: definition.version };
export const GOVERNED_BIYIN_SUPPORT_INVENTORY_CLAIM_TYPE =
  'DAY_MASTER_GOVERNED_BIYIN_SUPPORT_INVENTORY_EVIDENCE';
export const GOVERNED_BIYIN_SUPPORT_INVENTORY_SOURCES = definition.sourceIds.map(
  (url, index) =>
    ({
      sourceId: `SRC-SAJU-R31-GOVERNED-BIYIN-${index}`,
      sourceType: 'web',
      title: index === 0 ? authority.source.title : 'Existing governed 比劫 / 印綬 category source',
      language: 'zh-Hant',
      url,
      accessedAt:
        index === 0
          ? authority.source.accessedAt
          : HIDDEN_BIYIN_SUPPORT_CONSTITUENT_SOURCES[index]!.accessedAt,
      provenanceTier: 'cross_reference',
      rights: { copyrightStatus: 'unknown', reusePolicy: 'metadata_only' },
      notes:
        index === 0
          ? authority.scopeAdoption
          : 'Existing upstream category source; joint inventory admission is explicitly R31 and does not promote symbolic presence to effect.',
    }) as const satisfies SourceReference,
);
const researchInput = {
  source: 'research_evidence',
  evidenceType: definition.evidenceType,
  evidenceVersion: definition.evidenceVersion,
  definitionRef,
  mode: 'allowed',
  rationale:
    'Independent R23/R28/R30/R6 replay plus explicit R31 non-additive inventory admission are required. Branch co-location is not hidden-root identity or usable support.',
} as const satisfies MethodologyResearchEvidenceInputContract;
const input = {
  key: 'governedBiyinInventoryEvidence',
  source: 'research_evidence',
  pathOrClaimType: definition.evidenceType,
  required: true,
  ambiguityBehavior: 'requires_resolved',
  evidenceVersion: definition.evidenceVersion,
  researchEvidenceDefinitionRef: definitionRef,
} as const satisfies RuleInputRequirement;
export const GOVERNED_BIYIN_SUPPORT_INVENTORY_CLAIM_VALUE = {
  evidenceKind: 'governed_biyin_support_inventory',
  semanticScope: authority.semanticScope,
  supportConstituentObserved: true,
  occurrenceDetails: 'validated_research_evidence_only',
  hiddenManifestation: 'not_determined',
  usableSupportEffect: 'not_determined',
  tonggen: 'not_determined',
  wholeChartEffectiveSupportComplete: false,
  countOrWeight: 'not_authorized',
  hiddenPlusRootAggregation: 'not_authorized',
  branchAssociation: 'context_only',
  symbolicOccurrenceDomainResolved: true,
  supportComposition: 'not_authorized',
  r29FrontierInclusion: 'not_authorized',
  dangZhong: 'not_determined',
  zhuGua: 'not_determined',
  qiangRuo: 'not_determined',
  wangShuai: 'not_determined',
  gyeokguk: 'not_determined',
  narrativeMateriality: false,
  productionAuthority: false,
} as const;
export const GOVERNED_BIYIN_SUPPORT_INVENTORY_CLAIM_VALUE_SCHEMA = {
  schemaId,
  version,
  root: {
    kind: 'object',
    required: Object.keys(GOVERNED_BIYIN_SUPPORT_INVENTORY_CLAIM_VALUE),
    properties: Object.fromEntries(
      Object.entries(GOVERNED_BIYIN_SUPPORT_INVENTORY_CLAIM_VALUE).map(([key, value]) => [
        key,
        { kind: 'literal' as const, value },
      ]),
    ),
    additionalProperties: false,
  },
} as const satisfies ClaimValueSchemaDefinition;
export const GOVERNED_BIYIN_SUPPORT_INVENTORY_CLAIM_TYPE_DEFINITION = {
  claimType: GOVERNED_BIYIN_SUPPORT_INVENTORY_CLAIM_TYPE,
  version,
  valueSchemaRef: { id: schemaId, version },
  scope: 'natal',
  exclusiveValue: true,
  scenarioSensitive: true,
  materialForNarrative: false,
  allowedTaxonomyTiers: ['T2'],
} as const satisfies ClaimTypeDefinition;
export const GOVERNED_BIYIN_SUPPORT_INVENTORY_METHODOLOGY = {
  methodologyId,
  version,
  family: 'day_master_strength',
  name: 'Governed BiYin support inventory',
  description: authority.scopeAdoption,
  assumptions: [
    'R23/R28/R30/R6 must independently replay against one fully resolved snapshot; partial inventory is unavailable.',
    'Visible non-self slots and hidden four-branch occurrences retain separate identity and all outside-scope labels.',
    'R6 roots are branch-context facets, never extra occurrence members; co-location is not exact hidden-root identity.',
    'No addition, count, weight, effect composition, frontier extension or complete effective support is authorized.',
    'Resolved no-positive evidence is bounded and missing evidence or claim is not negative support.',
  ],
  requiredFactTypes: [],
  inputContract: { researchEvidenceInputs: [researchInput] },
  sourceIds: GOVERNED_BIYIN_SUPPORT_INVENTORY_SOURCES.map((source) => source.sourceId),
  status: 'research',
} as const satisfies MethodologyDefinition;
export const GOVERNED_BIYIN_SUPPORT_INVENTORY_RULE: RuleDefinition = {
  ruleId: 'RULE-SAJU-R31-GOVERNED-BIYIN-SUPPORT-INVENTORY',
  version,
  ruleSetId,
  taxonomy: {
    tier: 'T2',
    category: 'day_master_strength',
    subcategory: 'governed_biyin_support_inventory',
  },
  methodologyRef: { id: methodologyId, version },
  title: 'Governed BiYin support inventory observed',
  description:
    'Non-narrative structural marker with occurrence provenance retained in validated evidence; no support effect conclusion.',
  inputs: [input],
  condition: {
    op: 'eq',
    left: { kind: 'input', key: input.key, path: 'supportConstituentObserved' },
    right: { kind: 'literal', value: true },
  },
  output: {
    claimType: GOVERNED_BIYIN_SUPPORT_INVENTORY_CLAIM_TYPE,
    subject: 'day_master',
    predicate: 'governed_biyin_support_inventory_observed',
    value: GOVERNED_BIYIN_SUPPORT_INVENTORY_CLAIM_VALUE,
    polarity: 'neutral',
    emphasis: 'minor',
    tags: ['research', 'support', 'symbolic-inventory'],
  },
  sourceRefs: GOVERNED_BIYIN_SUPPORT_INVENTORY_SOURCES.map((source) => ({
    sourceId: source.sourceId,
    supportType: 'interpretive_basis',
    notes: authority.scopeAdoption,
  })),
  quality: {
    provenanceQuality: 'secondary_only',
    testCoverage: 'fixture_matrix',
    methodologyStability: 'contested',
    reviewerStatus: 'unreviewed',
  },
  status: 'research',
};
export const GOVERNED_BIYIN_SUPPORT_INVENTORY_PACK = {
  packId: 'PACK-SAJU-R31-GOVERNED-BIYIN-SUPPORT-INVENTORY-RESEARCH',
  version,
  name: 'SAJU-R31 Governed BiYin Support Inventory Research Pack',
  methodologyRefs: [{ id: methodologyId, version }],
  enabledRuleSets: [ruleSetId],
  conflictPolicy: 'preserve_all',
  ambiguityPolicy: 'skip_requires_resolved',
  compositionPolicyRef: { id: 'COMPOSITION-SAJU-R31-GOVERNED-BIYIN-RESEARCH', version },
  claimContractMode: 'registered_required',
  status: 'research',
} as const satisfies InterpretationPack;
export function createGovernedBiyinSupportInventoryResearchRegistry(
  createdAt = '1970-01-01T00:00:00.000Z',
) {
  return createRuleRegistrySnapshot(
    {
      rules: [GOVERNED_BIYIN_SUPPORT_INVENTORY_RULE],
      methodologies: [GOVERNED_BIYIN_SUPPORT_INVENTORY_METHODOLOGY],
      sources: GOVERNED_BIYIN_SUPPORT_INVENTORY_SOURCES,
      claimTypeDefinitions: [GOVERNED_BIYIN_SUPPORT_INVENTORY_CLAIM_TYPE_DEFINITION],
      claimValueSchemas: [GOVERNED_BIYIN_SUPPORT_INVENTORY_CLAIM_VALUE_SCHEMA],
      reviewAttestations: [],
    },
    GOVERNED_BIYIN_SUPPORT_INVENTORY_PACK,
    createdAt,
  );
}
