import type { VersionedRef } from '../contracts/common.js';
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
import {
  GENERAL_NATAL_CANONICAL_GYEOPJAE_BIJIE_CATEGORY_MEMBER_SOURCE,
} from './general-natal-canonical-gyeopjae-bijie-category-member-authority.js';
import {
  GENERAL_NATAL_VISIBLE_BIJIAN_DANG_ZHONG_CONSTITUENT_SOURCE,
} from './general-natal-visible-bijian-dang-zhong-constituent-authority.js';
import {
  SHARED_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_RESEARCH_EVIDENCE_DEFINITION,
  SHARED_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_RESEARCH_EVIDENCE_TYPE,
  SHARED_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_RESEARCH_EVIDENCE_VERSION,
} from './shared-natal-visible-stem-bijie-category-member-union-research-evidence-adapter.js';

export const SHARED_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_STRUCTURAL_CLAIM_VERSION =
  '0.1.0-research' as const;

export const SHARED_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_CLAIM_TYPE =
  'DAY_MASTER_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_EVIDENCE' as const;

export const SHARED_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_CLAIM_SCHEMA_ID =
  'day_master.visible_stem_bijie_category_member_union_evidence.schema' as const;

export const SHARED_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_METHODOLOGY_ID =
  'M-STRENGTH-FUYI-VISIBLE-STEM-BIJIE-CATEGORY-MEMBER-UNION' as const;

export const SHARED_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_RULE_SET_ID =
  'saju-r19-visible-stem-bijie-category-member-union' as const;

export const SHARED_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_EVIDENCE_DEFINITION_REF =
  Object.freeze({
    id:
      SHARED_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_RESEARCH_EVIDENCE_DEFINITION
        .definitionId,
    version:
      SHARED_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_RESEARCH_EVIDENCE_DEFINITION
        .version,
  }) satisfies VersionedRef;

export const SHARED_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_METHODOLOGY_RESEARCH_INPUT =
  Object.freeze({
    source: 'research_evidence',
    evidenceType:
      SHARED_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_RESEARCH_EVIDENCE_TYPE,
    evidenceVersion:
      SHARED_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_RESEARCH_EVIDENCE_VERSION,
    definitionRef:
      SHARED_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_EVIDENCE_DEFINITION_REF,
    mode: 'allowed',
    rationale:
      'Consumes only exact snapshot-bound R19 category-member union evidence over canonical year/month/hour visible stems. Slot identity and 비견/겁재 member kind remain evidence provenance; the claim exposes only positive visible 比劫 category presence without count, support union, complete collection, or downstream settlement.',
  }) satisfies MethodologyResearchEvidenceInputContract;

export const SHARED_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_RULE_INPUT_REQUIREMENT =
  Object.freeze({
    key: 'visibleStemBijieCategoryMemberUnionEvidence',
    source: 'research_evidence',
    pathOrClaimType:
      SHARED_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_RESEARCH_EVIDENCE_TYPE,
    required: true,
    ambiguityBehavior: 'requires_resolved',
    evidenceVersion:
      SHARED_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_RESEARCH_EVIDENCE_VERSION,
    researchEvidenceDefinitionRef:
      SHARED_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_EVIDENCE_DEFINITION_REF,
  }) satisfies RuleInputRequirement;

export const SHARED_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_SOURCES =
  Object.freeze([
    Object.freeze({
      sourceId: 'SRC-GENERAL-NATAL-VISIBLE-BIJIAN-BIJIE-CATEGORY',
      sourceType: 'web',
      title: GENERAL_NATAL_VISIBLE_BIJIAN_DANG_ZHONG_CONSTITUENT_SOURCE.title,
      language: 'zh-Hant',
      url: GENERAL_NATAL_VISIBLE_BIJIAN_DANG_ZHONG_CONSTITUENT_SOURCE.url,
      accessedAt:
        GENERAL_NATAL_VISIBLE_BIJIAN_DANG_ZHONG_CONSTITUENT_SOURCE.accessedAt,
      provenanceTier: 'cross_reference',
      rights: {
        copyrightStatus: 'unknown',
        reusePolicy: 'metadata_only',
      },
      notes:
        'R19 reuses the already-governed exact visible 比肩 surface only for category membership on fixed visible-stem slots. It does not import the upstream chart-level support meaning into the union.',
    } as const satisfies SourceReference),
    Object.freeze({
      sourceId: 'SRC-GENERAL-NATAL-CANONICAL-GYEOPJAE-BIJIE-CATEGORY',
      sourceType: 'web',
      title:
        GENERAL_NATAL_CANONICAL_GYEOPJAE_BIJIE_CATEGORY_MEMBER_SOURCE.title,
      language: 'zh-Hant',
      url: GENERAL_NATAL_CANONICAL_GYEOPJAE_BIJIE_CATEGORY_MEMBER_SOURCE.url,
      accessedAt:
        GENERAL_NATAL_CANONICAL_GYEOPJAE_BIJIE_CATEGORY_MEMBER_SOURCE
          .accessedAt,
      provenanceTier: 'cross_reference',
      rights: {
        copyrightStatus: 'unknown',
        reusePolicy: 'metadata_only',
      },
      notes:
        'R19 reuses the governed canonical 겁재 -> 劫財 -> 比劫 category-member authority and fixed R15 slot coverage, without carrying R15 supportEvaluation into the union payload.',
    } as const satisfies SourceReference),
  ] as const);

export const SHARED_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_CLAIM_VALUE =
  Object.freeze({
    evidenceKind: 'visible_stem_bijie_category_member_union',
    semanticScope: 'fixed_visible_stem_category_presence_only',
    sourceCategory: '比劫',
    visibleStemBijieMemberObserved: true,
    slotDetails: 'research_evidence_only',
    memberKinds: 'research_evidence_only',
    unifiedBijieCount: 'not_authorized',
    bijianCount: 'preserved_upstream_only',
    gyeopjaeCount: 'not_authorized',
    perSlotSupportConstituent: 'not_authorized',
    supportConstituentUnion: 'not_authorized',
    completeBijieCollection: false,
    supportAggregation: 'not_authorized',
    dangZhong: 'not_determined',
    zhuGua: 'not_determined',
    qiangRuo: 'not_determined',
    wangShuai: 'not_determined',
    gyeokguk: 'not_determined',
    numericStrength: 'not_authorized',
    narrativeMateriality: false,
    productionAuthority: false,
  } as const);

export const SHARED_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_CLAIM_VALUE_SCHEMA =
  Object.freeze({
    schemaId:
      SHARED_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_CLAIM_SCHEMA_ID,
    version:
      SHARED_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_STRUCTURAL_CLAIM_VERSION,
    root: {
      kind: 'object',
      required: [
        'evidenceKind',
        'semanticScope',
        'sourceCategory',
        'visibleStemBijieMemberObserved',
        'slotDetails',
        'memberKinds',
        'unifiedBijieCount',
        'bijianCount',
        'gyeopjaeCount',
        'perSlotSupportConstituent',
        'supportConstituentUnion',
        'completeBijieCollection',
        'supportAggregation',
        'dangZhong',
        'zhuGua',
        'qiangRuo',
        'wangShuai',
        'gyeokguk',
        'numericStrength',
        'narrativeMateriality',
        'productionAuthority',
      ],
      properties: {
        evidenceKind: {
          kind: 'literal',
          value: 'visible_stem_bijie_category_member_union',
        },
        semanticScope: {
          kind: 'literal',
          value: 'fixed_visible_stem_category_presence_only',
        },
        sourceCategory: { kind: 'literal', value: '比劫' },
        visibleStemBijieMemberObserved: { kind: 'literal', value: true },
        slotDetails: { kind: 'literal', value: 'research_evidence_only' },
        memberKinds: { kind: 'literal', value: 'research_evidence_only' },
        unifiedBijieCount: { kind: 'literal', value: 'not_authorized' },
        bijianCount: { kind: 'literal', value: 'preserved_upstream_only' },
        gyeopjaeCount: { kind: 'literal', value: 'not_authorized' },
        perSlotSupportConstituent: {
          kind: 'literal',
          value: 'not_authorized',
        },
        supportConstituentUnion: {
          kind: 'literal',
          value: 'not_authorized',
        },
        completeBijieCollection: { kind: 'literal', value: false },
        supportAggregation: { kind: 'literal', value: 'not_authorized' },
        dangZhong: { kind: 'literal', value: 'not_determined' },
        zhuGua: { kind: 'literal', value: 'not_determined' },
        qiangRuo: { kind: 'literal', value: 'not_determined' },
        wangShuai: { kind: 'literal', value: 'not_determined' },
        gyeokguk: { kind: 'literal', value: 'not_determined' },
        numericStrength: { kind: 'literal', value: 'not_authorized' },
        narrativeMateriality: { kind: 'literal', value: false },
        productionAuthority: { kind: 'literal', value: false },
      },
      additionalProperties: false,
    },
  } as const satisfies ClaimValueSchemaDefinition);

export const SHARED_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_CLAIM_TYPE_DEFINITION =
  Object.freeze({
    claimType:
      SHARED_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_CLAIM_TYPE,
    version:
      SHARED_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_STRUCTURAL_CLAIM_VERSION,
    valueSchemaRef: {
      id:
        SHARED_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_CLAIM_SCHEMA_ID,
      version:
        SHARED_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_STRUCTURAL_CLAIM_VERSION,
    },
    scope: 'natal',
    exclusiveValue: true,
    scenarioSensitive: true,
    materialForNarrative: false,
    allowedTaxonomyTiers: ['T2'],
  } as const satisfies ClaimTypeDefinition);

export const SHARED_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_METHODOLOGY =
  Object.freeze({
    methodologyId:
      SHARED_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_METHODOLOGY_ID,
    version:
      SHARED_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_STRUCTURAL_CLAIM_VERSION,
    family: 'day_master_strength',
    name: 'Visible-stem Bijie category-member union materialization',
    description:
      'Research-only T2 materialization of canonical visible-stem 比肩/겁재 membership under the shared 比劫 source category across fixed year/month/hour slots. It preserves slot/member-kind provenance in ResearchEvidence and emits at most one category-presence claim without count or support union.',
    assumptions: [
      'R15 and R17 consume the same canonical Ten-God chart and fixed visible-stem slots.',
      'Slot identity and canonical Ten-God values must agree between the two upstream surfaces.',
      'Exact 비견 and exact 겁재 cannot both be positive for one canonical slot.',
      'Resolved non-member Ten-Gods are bounded outside this visible category-union scope, not universal non-比劫 verdicts.',
      'No upstream support object is copied into the R19 union evidence.',
      'One, two, or three member slots still produce only one presence claim.',
      'Branch Ten-Gods and hidden stems are not consumed.',
      'No Narrative, Preview, Official, public semantic, or Production authority is created.',
    ],
    requiredFactTypes: [],
    inputContract: {
      researchEvidenceInputs: [
        SHARED_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_METHODOLOGY_RESEARCH_INPUT,
      ],
    },
    sourceIds:
      SHARED_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_SOURCES.map(
        (source) => source.sourceId,
      ),
    status: 'research',
  } as const satisfies MethodologyDefinition);

export const SHARED_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_RULE =
  Object.freeze({
    ruleId: 'RULE-SAJU-R19-VISIBLE-STEM-BIJIE-CATEGORY-MEMBER-UNION',
    version:
      SHARED_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_STRUCTURAL_CLAIM_VERSION,
    ruleSetId:
      SHARED_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_RULE_SET_ID,
    taxonomy: {
      tier: 'T2',
      category: 'day_master_strength',
      subcategory: 'visible_stem_bijie_category_member_union',
    },
    methodologyRef: {
      id:
        SHARED_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_METHODOLOGY_ID,
      version:
        SHARED_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_STRUCTURAL_CLAIM_VERSION,
    },
    title: 'Visible-stem Bijie category member observed',
    description:
      'Emits one research-only T2 marker when exact R19 evidence proves at least one fixed visible stem is a governed 비견 or 겁재 member of the 比劫 category. Slot/member-kind detail remains evidence-only; no count or support meaning is emitted.',
    inputs: [
      SHARED_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_RULE_INPUT_REQUIREMENT,
    ],
    condition: {
      op: 'eq',
      left: {
        kind: 'input',
        key:
          SHARED_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_RULE_INPUT_REQUIREMENT
            .key,
        path: 'visibleStemBijieMemberObserved',
      },
      right: { kind: 'literal', value: true },
    },
    output: {
      claimType:
        SHARED_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_CLAIM_TYPE,
      subject: 'day_master',
      predicate: 'visible_stem_bijie_category_member_observed',
      value:
        SHARED_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_CLAIM_VALUE,
      polarity: 'neutral',
      emphasis: 'moderate',
      tags: [
        'research',
        'day-master-strength',
        'bijie',
        'bijian',
        'gyeopjae',
        'visible-stem',
        'category-union',
        'presence-only',
        'non-aggregated',
      ],
    },
    sourceRefs:
      SHARED_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_SOURCES.map(
        (source) => ({
          sourceId: source.sourceId,
          supportType: 'interpretive_basis' as const,
          notes:
            'R19 uses this source only for the bounded visible 比劫 category-member relation; count, support union, and downstream settlement remain outside authority.',
        }),
      ),
    quality: {
      provenanceQuality: 'secondary_only',
      testCoverage: 'fixture_matrix',
      methodologyStability: 'contested',
      reviewerStatus: 'unreviewed',
    },
    status: 'research',
  } as const satisfies RuleDefinition);

export const SHARED_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_RULES =
  Object.freeze([
    SHARED_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_RULE,
  ] as const);

export const SHARED_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_PACK =
  Object.freeze({
    packId: 'PACK-SAJU-R19-VISIBLE-STEM-BIJIE-CATEGORY-MEMBER-UNION-RESEARCH',
    version:
      SHARED_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_STRUCTURAL_CLAIM_VERSION,
    name: 'SAJU-R19 Visible-Stem Bijie Category Member Union Research Pack',
    methodologyRefs: [
      {
        id:
          SHARED_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_METHODOLOGY_ID,
        version:
          SHARED_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_STRUCTURAL_CLAIM_VERSION,
      },
    ],
    enabledRuleSets: [
      SHARED_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_RULE_SET_ID,
    ],
    conflictPolicy: 'preserve_all',
    ambiguityPolicy: 'skip_requires_resolved',
    compositionPolicyRef: {
      id: 'COMPOSITION-SAJU-R19-VISIBLE-STEM-BIJIE-CATEGORY-MEMBER-UNION-RESEARCH',
      version:
        SHARED_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_STRUCTURAL_CLAIM_VERSION,
    },
    claimContractMode: 'registered_required',
    status: 'research',
  } as const satisfies InterpretationPack);

export function createSharedNatalVisibleStemBijieCategoryMemberUnionResearchRegistry(
  createdAt = '1970-01-01T00:00:00.000Z',
) {
  return createRuleRegistrySnapshot(
    {
      rules: SHARED_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_RULES,
      methodologies: [
        SHARED_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_METHODOLOGY,
      ],
      sources: [...SHARED_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_SOURCES],
      claimTypeDefinitions: [
        SHARED_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_CLAIM_TYPE_DEFINITION,
      ],
      claimValueSchemas: [
        SHARED_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_CLAIM_VALUE_SCHEMA,
      ],
      reviewAttestations: [],
    },
    SHARED_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_PACK,
    createdAt,
  );
}

export const SHARED_NATAL_VISIBLE_STEM_BIJIE_CATEGORY_MEMBER_UNION_AUTHORITY_BOUNDARY =
  Object.freeze({
    runtimeScope: 'isolated_research_pack_only' as const,
    exactR19EvidenceBindingRequired: true as const,
    categoryUnionAuthorizedResearchOnly: true as const,
    fixedVisibleStemDomainOnly: true as const,
    sourceSlotIdentityPreserved: true as const,
    canonicalMemberKindPreserved: true as const,
    upstreamSupportObjectsConsumedIntoUnion: false as const,
    perSlotSupportConstituentAuthorized: false as const,
    supportConstituentUnionAuthorized: false as const,
    unifiedBijieCountAuthorized: false as const,
    completeBijieCollectionAuthorized: false as const,
    branchTenGodScanAuthorized: false as const,
    hiddenStemTenGodScanAuthorized: false as const,
    supportAggregationAuthorized: false as const,
    dangZhongSettlementAuthorized: false as const,
    zhuGuaSettlementAuthorized: false as const,
    qiangRuoClassificationAuthorized: false as const,
    wangShuaiClassificationAuthorized: false as const,
    gyeokgukDerivationAuthorized: false as const,
    numericStrengthAuthorized: false as const,
    narrativeMaterialityAuthorized: false as const,
    defaultRuntimeRouteChanged: false as const,
    previewAuthorityAuthorized: false as const,
    officialReadingAuthorityAuthorized: false as const,
    publicSemanticAuthorityAuthorized: false as const,
    productionPackAuthorized: false as const,
    productionAuthorityAuthorized: false as const,
    externalHumanDomainReviewRequired: false as const,
    production: 'HOLD' as const,
  });
