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
import {
  SAJU_R37_SUPPORT_PRECEDENCE_AUTHORITY as authority,
  SAJU_R37_SUPPORT_PRECEDENCE_EVIDENCE_DEFINITION as definition,
  SAJU_R37_ROOT_CLASSES,
} from './shared-natal-r37-support-precedence-research-evidence-adapter.js';

const version = '0.1.0-research';
const methodId = 'M-SAJU-R37-SOURCE-BOUNDED-SUPPORT-PRECEDENCE';
const ruleSetId = 'saju-r37-bounded-support-precedence';
const schemaId = 'day_master.r37_root_v_bijian.schema';
const definitionRef = { id: definition.definitionId, version: definition.version };

export const SAJU_R37_SUPPORT_PRECEDENCE_CLAIM_TYPE =
  'DAY_MASTER_SOURCE_BOUNDED_ROOT_OVER_BIJIAN_PRECEDENCE';

export const SAJU_R37_SUPPORT_PRECEDENCE_SOURCES = [{
  sourceId: definition.sourceIds[0],
  sourceType: 'web',
  title: '滴天髓闡微 — 衰旺（根與比肩之定性對照）',
  language: 'zh-Hant',
  url: 'https://zh.wikisource.org/wiki/滴天髓闡微',
  accessedAt: '2026-10-08',
  provenanceTier: 'cross_reference',
  rights: { copyrightStatus: 'unknown', reusePolicy: 'metadata_only' },
  notes:
    'Existing I21 partial-order basis only: bounded root candidate vs visible 比肩. No 劫財 analogy, force magnitude, or ordinary strength verdict.',
}] as const;

const researchInput = {
  source: 'research_evidence',
  evidenceType: definition.evidenceType,
  evidenceVersion: definition.evidenceVersion,
  definitionRef,
  mode: 'allowed',
  rationale:
    'I21 precedent requires independent R31 source-root facet, R34 same-branch intrinsic presence, and exact visible 比肩.',
} as const satisfies MethodologyResearchEvidenceInputContract;

const input = {
  key: 'boundedSupportPrecedence',
  source: 'research_evidence',
  pathOrClaimType: definition.evidenceType,
  required: true,
  ambiguityBehavior: 'requires_resolved',
  evidenceVersion: definition.evidenceVersion,
  researchEvidenceDefinitionRef: definitionRef,
} as const satisfies RuleInputRequirement;

export function sajuR37PrecedenceClaimValue(rootClass: (typeof SAJU_R37_ROOT_CLASSES)[number]) {
  return {
    evidenceKind: 'source_bounded_root_over_visible_bijian_precedence',
    sourceScope: authority.semanticScope,
    rootClass,
    comparison: 'ROOT_CLASS_PRECEDES_VISIBLE_BIJIAN',
    comparisonBasis: 'validated_snapshot_bound_r31_r34_i21',
    sourceWitnessIdentities: 'validated_research_evidence_only',
    repeatedObservationAggregation: 'not_authorized',
    effectiveSupport: 'not_determined',
    relativeMechanismForce: 'not_determined',
    qiangRuo: 'not_determined',
    wangShuai: 'not_determined',
    rootWeight: 'not_assigned',
    narrativeMateriality: false,
    productionAuthority: false,
  } as const;
}

const variants = SAJU_R37_ROOT_CLASSES.map((rootClass) => ({
  rootClass,
  value: sajuR37PrecedenceClaimValue(rootClass),
}));

export const SAJU_R37_SUPPORT_PRECEDENCE_CLAIM_VALUE_SCHEMA = {
  schemaId,
  version,
  root: {
    kind: 'union',
    anyOf: variants.map(({ value }) => ({
      kind: 'object' as const,
      required: Object.keys(value),
      properties: Object.fromEntries(
        Object.entries(value).map(([key, literal]) => [
          key, { kind: 'literal' as const, value: literal },
        ]),
      ),
      additionalProperties: false,
    })),
  },
} as const satisfies ClaimValueSchemaDefinition;

export const SAJU_R37_SUPPORT_PRECEDENCE_CLAIM_TYPE_DEFINITION = {
  claimType: SAJU_R37_SUPPORT_PRECEDENCE_CLAIM_TYPE,
  version,
  valueSchemaRef: { id: schemaId, version },
  scope: 'natal',
  exclusiveValue: false,
  scenarioSensitive: true,
  materialForNarrative: false,
  allowedTaxonomyTiers: ['T2'],
} as const satisfies ClaimTypeDefinition;

export const SAJU_R37_SUPPORT_PRECEDENCE_METHODOLOGY = {
  methodologyId: methodId,
  version,
  family: 'day_master_strength',
  name: 'Bounded source-specific root precedence over visible Bijian',
  description:
    'Execute authorized I21 qualitative comparison when source-bound R6 candidate and R34 intrinsic branch presence both hold against actual visible 比肩.',
  assumptions: [
    'I21 precedence of root classes over visible 比肩 is qualitative, not a numeric support-effect magnitude.',
    'R31 symbolic 比劫 collection is not a licence to substitute 劫財 for 比肩.',
    'R6 長生 may be incompatible with R33/R34 Yin intrinsic root; such root witnesses are excluded from this comparison.',
    '土 root class, resource support, root interactions and multiple-comparison aggregation remain unresolved.',
    'No universal effective support, ordinary strength, category priority or Production authority is implied.',
  ],
  requiredFactTypes: [],
  inputContract: { researchEvidenceInputs: [researchInput] },
  sourceIds: SAJU_R37_SUPPORT_PRECEDENCE_SOURCES.map((source) => source.sourceId),
  status: 'research',
} as const satisfies MethodologyDefinition;

export const SAJU_R37_SUPPORT_PRECEDENCE_RULES = variants.map(
  ({ rootClass, value }, index): RuleDefinition => ({
    ruleId: 'RULE-SAJU-R37-ROOT-V-BIJIAN-' + index,
    version,
    ruleSetId,
    taxonomy: {
      tier: 'T2',
      category: 'day_master_strength',
      subcategory: 'source_bounded_support_precedence',
    },
    methodologyRef: { id: methodId, version },
    title: 'Bounded root > visible 比肩: ' + rootClass,
    description:
      'Source-backed partial support ordering, with actual witness identities held in independently replayed research evidence.',
    inputs: [input],
    condition: {
      op: 'eq',
      left: { kind: 'input', key: input.key, path: 'comparisons.' + rootClass + '.observed' },
      right: { kind: 'literal', value: true },
    },
    output: {
      claimType: SAJU_R37_SUPPORT_PRECEDENCE_CLAIM_TYPE,
      subject: 'day_master',
      predicate: 'bounded_root_over_visible_bijian_precedence_observed',
      value,
      polarity: 'neutral',
      emphasis: 'minor',
      tags: ['research', 'root-class', 'bijian-only', 'qualitative-precedence'],
    },
    sourceRefs: SAJU_R37_SUPPORT_PRECEDENCE_SOURCES.map((source) => ({
      sourceId: source.sourceId,
      supportType: 'interpretive_basis',
      notes: 'Existing I21 source-specific comparison, without effective-support settlement.',
    })),
    quality: {
      provenanceQuality: 'secondary_only',
      testCoverage: 'fixture_matrix',
      methodologyStability: 'contested',
      reviewerStatus: 'unreviewed',
    },
    status: 'research',
  }),
);

export const SAJU_R37_SUPPORT_PRECEDENCE_PACK = {
  packId: 'PACK-SAJU-R37-ROOT-V-BIJIAN-RESEARCH',
  version,
  name: 'SAJU-R37 Bounded Root versus Bijian Precedence',
  methodologyRefs: [{ id: methodId, version }],
  enabledRuleSets: [ruleSetId],
  conflictPolicy: 'preserve_all',
  ambiguityPolicy: 'skip_requires_resolved',
  compositionPolicyRef: { id: 'COMPOSITION-SAJU-R37-BOUND-ORDER-RESEARCH', version },
  claimContractMode: 'registered_required',
  status: 'research',
} as const satisfies InterpretationPack;

export function createSajuR37SupportPrecedenceResearchRegistry(
  createdAt = '1970-01-01T00:00:00.000Z',
) {
  return createRuleRegistrySnapshot(
    {
      rules: SAJU_R37_SUPPORT_PRECEDENCE_RULES,
      methodologies: [SAJU_R37_SUPPORT_PRECEDENCE_METHODOLOGY],
      sources: [...SAJU_R37_SUPPORT_PRECEDENCE_SOURCES],
      claimTypeDefinitions: [SAJU_R37_SUPPORT_PRECEDENCE_CLAIM_TYPE_DEFINITION],
      claimValueSchemas: [SAJU_R37_SUPPORT_PRECEDENCE_CLAIM_VALUE_SCHEMA],
      reviewAttestations: [],
    },
    SAJU_R37_SUPPORT_PRECEDENCE_PACK,
    createdAt,
  );
}
