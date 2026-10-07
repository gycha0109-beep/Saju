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
import { HIDDEN_BIYIN_SUPPORT_CONSTITUENT_AUTHORITY as authority } from './hidden-biyin-support-constituent-authority.js';
import { HIDDEN_BIYIN_SUPPORT_CONSTITUENT_EVIDENCE_DEFINITION as definition } from './shared-natal-hidden-biyin-support-constituent-research-evidence-adapter.js';

const version = '0.1.0-research';
const methodologyId = 'M-STRENGTH-FUYI-HIDDEN-BIYIN-SYMBOLIC-CONSTITUENTS';
const ruleSetId = 'saju-r30-hidden-biyin-support-constituents';
const schemaId = 'day_master.hidden_biyin_symbolic_constituents.schema';
const definitionRef = { id: definition.definitionId, version: definition.version };
export const HIDDEN_BIYIN_SUPPORT_CONSTITUENT_CLAIM_TYPE =
  'DAY_MASTER_HIDDEN_BIYIN_SYMBOLIC_SUPPORT_CONSTITUENT_EVIDENCE';
export const HIDDEN_BIYIN_SUPPORT_CONSTITUENT_SOURCES = definition.sourceIds.map(
  (url, index) =>
    ({
      sourceId: `SRC-SAJU-R30-HIDDEN-BIYIN-${index}`,
      sourceType: 'web',
      title: index === 0 ? authority.source.title : 'Existing governed 比劫 / 印綬 category source',
      language: 'zh-Hant',
      url,
      accessedAt:
        index === 0 ? authority.source.accessedAt : authority.categorySourceAccessDates[index - 1]!,
      provenanceTier: 'cross_reference',
      rights: { copyrightStatus: 'unknown', reusePolicy: 'metadata_only' },
      notes:
        index === 0
          ? authority.scopeAdoption
          : 'Existing label/category meaning only; R30 separately admits derived hidden occurrence scope without canonical fact promotion.',
    }) as const satisfies SourceReference,
);
const researchInput = {
  source: 'research_evidence',
  evidenceType: definition.evidenceType,
  evidenceVersion: definition.evidenceVersion,
  definitionRef,
  mode: 'allowed',
  rationale:
    'Exact R27 replay and explicit R30 hidden symbolic constituent scope are both required. Mapping is not usable support or 通根.',
} as const satisfies MethodologyResearchEvidenceInputContract;
const input = {
  key: 'hiddenBiyinConstituentEvidence',
  source: 'research_evidence',
  pathOrClaimType: definition.evidenceType,
  required: true,
  ambiguityBehavior: 'requires_resolved',
  evidenceVersion: definition.evidenceVersion,
  researchEvidenceDefinitionRef: definitionRef,
} as const satisfies RuleInputRequirement;
export const HIDDEN_BIYIN_SUPPORT_CONSTITUENT_CLAIM_VALUE = {
  evidenceKind: 'hidden_biyin_symbolic_support_constituents',
  semanticScope: authority.semanticScope,
  supportConstituentObserved: true,
  occurrenceDetails: 'validated_research_evidence_only',
  hiddenManifestation: 'not_determined',
  usableSupportEffect: 'not_determined',
  tonggen: 'not_determined',
  wholeChartEffectiveSupportComplete: false,
  countOrWeight: 'not_authorized',
  hiddenPlusRootAggregation: 'not_authorized',
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
export const HIDDEN_BIYIN_SUPPORT_CONSTITUENT_CLAIM_VALUE_SCHEMA = {
  schemaId,
  version,
  root: {
    kind: 'object',
    required: Object.keys(HIDDEN_BIYIN_SUPPORT_CONSTITUENT_CLAIM_VALUE),
    properties: Object.fromEntries(
      Object.entries(HIDDEN_BIYIN_SUPPORT_CONSTITUENT_CLAIM_VALUE).map(([key, value]) => [
        key,
        { kind: 'literal' as const, value },
      ]),
    ),
    additionalProperties: false,
  },
} as const satisfies ClaimValueSchemaDefinition;
export const HIDDEN_BIYIN_SUPPORT_CONSTITUENT_CLAIM_TYPE_DEFINITION = {
  claimType: HIDDEN_BIYIN_SUPPORT_CONSTITUENT_CLAIM_TYPE,
  version,
  valueSchemaRef: { id: schemaId, version },
  scope: 'natal',
  exclusiveValue: true,
  scenarioSensitive: true,
  materialForNarrative: false,
  allowedTaxonomyTiers: ['T2'],
} as const satisfies ClaimTypeDefinition;
export const HIDDEN_BIYIN_SUPPORT_CONSTITUENT_METHODOLOGY = {
  methodologyId,
  version,
  family: 'day_master_strength',
  name: 'Hidden BiYin symbolic support constituents',
  description: authority.scopeAdoption,
  assumptions: [
    'All four canonical branch hidden-member sets must be reproduced by the unchanged R27 mapper; one unresolved input aborts the collection.',
    'R30 adopts hidden occurrence scope under the source branch 比印 context. R23/R28 visible and R27 mapping authorities are not widened.',
    '比肩/劫財/正印/偏印 have symbolic constituent membership only; activation, manifestation, usable support and root are separate decisions.',
    'Outside-scope labels are retained and are not universal negative support evidence.',
    'Same-stem occurrences in different slots remain distinct; branch representatives and visible day self are excluded.',
    'Hidden members and R6 roots may describe overlapping support substrate; no addition, score, composition or R29 frontier inclusion is authorized.',
  ],
  requiredFactTypes: [],
  inputContract: { researchEvidenceInputs: [researchInput] },
  sourceIds: HIDDEN_BIYIN_SUPPORT_CONSTITUENT_SOURCES.map((source) => source.sourceId),
  status: 'research',
} as const satisfies MethodologyDefinition;
export const HIDDEN_BIYIN_SUPPORT_CONSTITUENT_RULE: RuleDefinition = {
  ruleId: 'RULE-SAJU-R30-HIDDEN-BIYIN-SYMBOLIC-SUPPORT-CONSTITUENTS',
  version,
  ruleSetId,
  taxonomy: {
    tier: 'T2',
    category: 'day_master_strength',
    subcategory: 'hidden_biyin_symbolic_constituents',
  },
  methodologyRef: { id: methodologyId, version },
  title: 'Hidden BiYin symbolic constituents observed',
  description:
    'Non-narrative structural marker with occurrence provenance retained in validated evidence; no support effect conclusion.',
  inputs: [input],
  condition: {
    op: 'eq',
    left: { kind: 'input', key: input.key, path: 'supportConstituentObserved' },
    right: { kind: 'literal', value: true },
  },
  output: {
    claimType: HIDDEN_BIYIN_SUPPORT_CONSTITUENT_CLAIM_TYPE,
    subject: 'day_master',
    predicate: 'hidden_biyin_symbolic_support_constituents_observed',
    value: HIDDEN_BIYIN_SUPPORT_CONSTITUENT_CLAIM_VALUE,
    polarity: 'neutral',
    emphasis: 'minor',
    tags: ['research', 'hidden', 'support', 'symbolic-constituents'],
  },
  sourceRefs: HIDDEN_BIYIN_SUPPORT_CONSTITUENT_SOURCES.map((source) => ({
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
export const HIDDEN_BIYIN_SUPPORT_CONSTITUENT_PACK = {
  packId: 'PACK-SAJU-R30-HIDDEN-BIYIN-SYMBOLIC-CONSTITUENTS-RESEARCH',
  version,
  name: 'SAJU-R30 Hidden BiYin Symbolic Support Constituents Research Pack',
  methodologyRefs: [{ id: methodologyId, version }],
  enabledRuleSets: [ruleSetId],
  conflictPolicy: 'preserve_all',
  ambiguityPolicy: 'skip_requires_resolved',
  compositionPolicyRef: { id: 'COMPOSITION-SAJU-R30-HIDDEN-BIYIN-RESEARCH', version },
  claimContractMode: 'registered_required',
  status: 'research',
} as const satisfies InterpretationPack;
export function createHiddenBiyinSupportConstituentResearchRegistry(
  createdAt = '1970-01-01T00:00:00.000Z',
) {
  return createRuleRegistrySnapshot(
    {
      rules: [HIDDEN_BIYIN_SUPPORT_CONSTITUENT_RULE],
      methodologies: [HIDDEN_BIYIN_SUPPORT_CONSTITUENT_METHODOLOGY],
      sources: HIDDEN_BIYIN_SUPPORT_CONSTITUENT_SOURCES,
      claimTypeDefinitions: [HIDDEN_BIYIN_SUPPORT_CONSTITUENT_CLAIM_TYPE_DEFINITION],
      claimValueSchemas: [HIDDEN_BIYIN_SUPPORT_CONSTITUENT_CLAIM_VALUE_SCHEMA],
      reviewAttestations: [],
    },
    HIDDEN_BIYIN_SUPPORT_CONSTITUENT_PACK,
    createdAt,
  );
}
