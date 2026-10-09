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
import { GENERAL_NATAL_CANONICAL_YIN_YINSHOU_CATEGORY_MEMBER_AUTHORITY } from './general-natal-canonical-yin-yinshou-category-member-authority.js';
import {
  VISIBLE_STEM_YINSHOU_SUPPORT_COLLECTION_AUTHORITY,
  VISIBLE_STEM_YINSHOU_SUPPORT_SLOTS,
  type VisibleStemYinshouSupportSlot,
} from './general-natal-visible-stem-yinshou-support-collection-authority.js';
import { SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_SOURCE } from './shared-natal-single-fact-yinshou-support-structural-claim.js';
import { VISIBLE_STEM_YINSHOU_SUPPORT_COLLECTION_EVIDENCE_DEFINITION as definition } from './shared-natal-visible-stem-yinshou-support-collection-research-evidence-adapter.js';

const version = '0.1.0-research';
const methodologyId = 'M-STRENGTH-FUYI-VISIBLE-STEM-YINSHOU-SUPPORT-COLLECTION';
const ruleSetId = 'saju-r28-visible-stem-yinshou-support-collection';
const schemaId = 'day_master.visible_stem_yinshou_support_collection_member.schema';
const definitionRef = { id: definition.definitionId, version: definition.version };
export const VISIBLE_STEM_YINSHOU_SUPPORT_COLLECTION_CLAIM_TYPE =
  'DAY_MASTER_VISIBLE_STEM_YINSHOU_SUPPORT_COLLECTION_MEMBER_EVIDENCE';
export const VISIBLE_STEM_YINSHOU_SUPPORT_COLLECTION_SOURCES = [
  SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_SOURCE,
  {
    ...SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_SOURCE,
    sourceId: 'SRC-SAJU-R28-YINSHOU-ZHENG-PIAN-CATEGORY',
    url: GENERAL_NATAL_CANONICAL_YIN_YINSHOU_CATEGORY_MEMBER_AUTHORITY.source.url,
    notes:
      'Existing governed 正印/偏印 category authority; collection policy does not generalize the chapter into a 格局 or strength rule.',
  },
] as const;
const researchInput = {
  source: 'research_evidence',
  evidenceType: definition.evidenceType,
  evidenceVersion: definition.evidenceVersion,
  definitionRef,
  mode: 'allowed',
  rationale:
    'Consumes only complete fixed-domain R28 evidence reproducing unchanged R9 results. A slot marker conveys neither weight nor whole-chart absence.',
} as const satisfies MethodologyResearchEvidenceInputContract;
const input = {
  key: 'visibleStemYinshouSupportCollectionEvidence',
  source: 'research_evidence',
  pathOrClaimType: definition.evidenceType,
  required: true,
  ambiguityBehavior: 'requires_resolved',
  evidenceVersion: definition.evidenceVersion,
  researchEvidenceDefinitionRef: definitionRef,
} as const satisfies RuleInputRequirement;

export function visibleStemYinshouSupportCollectionClaimValue(
  slot: VisibleStemYinshouSupportSlot,
  member: '정인' | '편인',
) {
  return {
    evidenceKind: 'visible_stem_yinshou_support_collection_member',
    semanticScope: VISIBLE_STEM_YINSHOU_SUPPORT_COLLECTION_AUTHORITY.semanticScope,
    slot,
    sourceFactRef: `derivedFacts.tenGods.${slot}.stem`,
    canonicalConstituent: member,
    sourceSupportCategory: '印綬',
    supportConstituentObserved: true,
    wholeChartCollectionComplete: false,
    yinshouCount: 'not_authorized',
    supportWeight: 'not_authorized',
    supportComposition: 'not_authorized',
    dangZhong: 'not_determined',
    zhuGua: 'not_determined',
    qiangRuo: 'not_determined',
    wangShuai: 'not_determined',
    gyeokguk: 'not_determined',
    narrativeMateriality: false,
    productionAuthority: false,
  } as const;
}

const variants = VISIBLE_STEM_YINSHOU_SUPPORT_SLOTS.flatMap((slot) =>
  (['정인', '편인'] as const).map((member) => ({
    slot,
    member,
    value: visibleStemYinshouSupportCollectionClaimValue(slot, member),
  })),
);
export const VISIBLE_STEM_YINSHOU_SUPPORT_COLLECTION_CLAIM_VALUE_SCHEMA = {
  schemaId,
  version,
  root: {
    kind: 'union',
    anyOf: variants.map(({ value }) => ({
      kind: 'object' as const,
      required: Object.keys(value),
      properties: Object.fromEntries(
        Object.entries(value).map(([key, literal]) => [
          key,
          { kind: 'literal' as const, value: literal },
        ]),
      ),
      additionalProperties: false,
    })),
  },
} as const satisfies ClaimValueSchemaDefinition;
export const VISIBLE_STEM_YINSHOU_SUPPORT_COLLECTION_CLAIM_TYPE_DEFINITION = {
  claimType: VISIBLE_STEM_YINSHOU_SUPPORT_COLLECTION_CLAIM_TYPE,
  version,
  valueSchemaRef: { id: schemaId, version },
  scope: 'natal',
  exclusiveValue: false,
  scenarioSensitive: true,
  materialForNarrative: false,
  allowedTaxonomyTiers: ['T2'],
} as const satisfies ClaimTypeDefinition;
export const VISIBLE_STEM_YINSHOU_SUPPORT_COLLECTION_METHODOLOGY = {
  methodologyId,
  version,
  family: 'day_master_strength',
  name: 'Fixed visible-stem Yinshou support collection',
  description:
    'R28 explicitly selects all three visible non-self slots and preserves governed R9 observations without counting or composing support.',
  assumptions: [
    'Every year/month/hour fact must be resolved and pass exact R9 evidence replay before any member claim.',
    'The day stem must be the canonical self marker; it is excluded.',
    'Slot identity is provenance only and repeated labels at different slots remain separate observations.',
    'No positive member claim is not a negative chart verdict; unresolved collection cannot become empty collection.',
    'Branch/hidden support admission, whole-chart collection, weight, composition and Production require separate authority.',
  ],
  requiredFactTypes: [],
  inputContract: { researchEvidenceInputs: [researchInput] },
  sourceIds: VISIBLE_STEM_YINSHOU_SUPPORT_COLLECTION_SOURCES.map((source) => source.sourceId),
  status: 'research',
} as const satisfies MethodologyDefinition;
export const VISIBLE_STEM_YINSHOU_SUPPORT_COLLECTION_RULES = variants.map(
  ({ slot, member, value }, index): RuleDefinition => ({
    ruleId: `RULE-SAJU-R28-VISIBLE-STEM-YINSHOU-SUPPORT-${index}`,
    version,
    ruleSetId,
    taxonomy: {
      tier: 'T2',
      category: 'day_master_strength',
      subcategory: 'visible_stem_yinshou_support_collection_member',
    },
    methodologyRef: { id: methodologyId, version },
    title: `Visible ${slot} ${member} Yinshou support constituent`,
    description:
      'Positive slot marker from exact governed R9 evidence; no numeric or chart-level conclusion.',
    inputs: [input],
    condition: {
      op: 'and',
      expressions: [
        {
          op: 'eq',
          left: {
            kind: 'input',
            key: input.key,
            path: `slots.${slot}.governedSingleFact.supportConstituentObserved`,
          },
          right: { kind: 'literal', value: true },
        },
        {
          op: 'eq',
          left: {
            kind: 'input',
            key: input.key,
            path: `slots.${slot}.governedSingleFact.supportEvaluation.canonicalConstituent`,
          },
          right: { kind: 'literal', value: member },
        },
      ],
    },
    output: {
      claimType: VISIBLE_STEM_YINSHOU_SUPPORT_COLLECTION_CLAIM_TYPE,
      subject: 'day_master',
      predicate: 'visible_stem_yinshou_support_collection_member_observed',
      value,
      polarity: 'neutral',
      emphasis: 'minor',
      tags: ['research', 'visible-stem', 'yinshou', 'non-aggregated'],
    },
    sourceRefs: VISIBLE_STEM_YINSHOU_SUPPORT_COLLECTION_SOURCES.map((source) => ({
      sourceId: source.sourceId,
      supportType: 'interpretive_basis',
      notes:
        'Existing single-fact membership and support meaning are unchanged; fixed-domain collection is explicitly governed by R28.',
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
export const VISIBLE_STEM_YINSHOU_SUPPORT_COLLECTION_PACK = {
  packId: 'PACK-SAJU-R28-VISIBLE-STEM-YINSHOU-SUPPORT-COLLECTION-RESEARCH',
  version,
  name: 'SAJU-R28 Visible-Stem Yinshou Support Collection Research Pack',
  methodologyRefs: [{ id: methodologyId, version }],
  enabledRuleSets: [ruleSetId],
  conflictPolicy: 'preserve_all',
  ambiguityPolicy: 'skip_requires_resolved',
  compositionPolicyRef: {
    id: 'COMPOSITION-SAJU-R28-VISIBLE-STEM-YINSHOU-SUPPORT-COLLECTION-RESEARCH',
    version,
  },
  claimContractMode: 'registered_required',
  status: 'research',
} as const satisfies InterpretationPack;
export function createVisibleStemYinshouSupportCollectionResearchRegistry(
  createdAt = '1970-01-01T00:00:00.000Z',
) {
  return createRuleRegistrySnapshot(
    {
      rules: VISIBLE_STEM_YINSHOU_SUPPORT_COLLECTION_RULES,
      methodologies: [VISIBLE_STEM_YINSHOU_SUPPORT_COLLECTION_METHODOLOGY],
      sources: [...VISIBLE_STEM_YINSHOU_SUPPORT_COLLECTION_SOURCES],
      claimTypeDefinitions: [VISIBLE_STEM_YINSHOU_SUPPORT_COLLECTION_CLAIM_TYPE_DEFINITION],
      claimValueSchemas: [VISIBLE_STEM_YINSHOU_SUPPORT_COLLECTION_CLAIM_VALUE_SCHEMA],
      reviewAttestations: [],
    },
    VISIBLE_STEM_YINSHOU_SUPPORT_COLLECTION_PACK,
    createdAt,
  );
}
