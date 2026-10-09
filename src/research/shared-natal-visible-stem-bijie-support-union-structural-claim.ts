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
  GENERAL_NATAL_GYEOPJAE_BIJIE_DANG_ZHONG_SUPPORT_CONSTITUENT_SOURCE,
} from './general-natal-gyeopjae-bijie-dang-zhong-support-constituent-authority.js';
import {
  GENERAL_NATAL_VISIBLE_BIJIAN_DANG_ZHONG_CONSTITUENT_SOURCE,
} from './general-natal-visible-bijian-dang-zhong-constituent-authority.js';
import {
  SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_RESEARCH_EVIDENCE_DEFINITION,
  SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_RESEARCH_EVIDENCE_TYPE,
  SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_RESEARCH_EVIDENCE_VERSION,
} from './shared-natal-visible-stem-bijie-support-union-research-evidence-adapter.js';

export const SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_STRUCTURAL_CLAIM_VERSION =
  '0.1.0-research' as const;

export const SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_CLAIM_TYPE =
  'DAY_MASTER_VISIBLE_STEM_BIJIE_SUPPORT_CONSTITUENT_UNION_EVIDENCE' as const;

export const SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_CLAIM_SCHEMA_ID =
  'day_master.visible_stem_bijie_support_constituent_union_evidence.schema' as const;

export const SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_METHODOLOGY_ID =
  'M-STRENGTH-FUYI-VISIBLE-STEM-BIJIE-SUPPORT-UNION' as const;

export const SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_RULE_SET_ID =
  'saju-r23-visible-stem-bijie-support-union' as const;

export const SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_EVIDENCE_DEFINITION_REF =
  Object.freeze({
    id:
      SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_RESEARCH_EVIDENCE_DEFINITION
        .definitionId,
    version:
      SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_RESEARCH_EVIDENCE_DEFINITION
        .version,
  }) satisfies VersionedRef;

export const SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_METHODOLOGY_RESEARCH_INPUT =
  Object.freeze({
    source: 'research_evidence',
    evidenceType:
      SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_RESEARCH_EVIDENCE_TYPE,
    evidenceVersion:
      SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_RESEARCH_EVIDENCE_VERSION,
    definitionRef:
      SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_EVIDENCE_DEFINITION_REF,
    mode: 'allowed',
    rationale:
      'Consumes only snapshot-bound R23 evidence that unifies exact visible-stem 比肩/겁재 support constituents over fixed year/month/hour slots after R21/R15/R19 three-way parity. Slot/member detail remains evidence-only; no count, support aggregation, complete collection, or downstream settlement is authorized.',
  }) satisfies MethodologyResearchEvidenceInputContract;

export const SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_RULE_INPUT_REQUIREMENT =
  Object.freeze({
    key: 'visibleStemBijieSupportUnionEvidence',
    source: 'research_evidence',
    pathOrClaimType:
      SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_RESEARCH_EVIDENCE_TYPE,
    required: true,
    ambiguityBehavior: 'requires_resolved',
    evidenceVersion:
      SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_RESEARCH_EVIDENCE_VERSION,
    researchEvidenceDefinitionRef:
      SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_EVIDENCE_DEFINITION_REF,
  }) satisfies RuleInputRequirement;

export const SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_SOURCES =
  Object.freeze([
    Object.freeze({
      sourceId: 'SRC-GENERAL-NATAL-R23-VISIBLE-BIJIAN-SUPPORT',
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
        'R23 reuses the governed R21 visible 比肩 support meaning and fixed-slot provenance. No upstream visible-比肩 count is copied or reinterpreted.',
    } as const satisfies SourceReference),
    Object.freeze({
      sourceId: 'SRC-GENERAL-NATAL-R23-VISIBLE-GYEOPJAE-SUPPORT',
      sourceType: 'web',
      title:
        GENERAL_NATAL_GYEOPJAE_BIJIE_DANG_ZHONG_SUPPORT_CONSTITUENT_SOURCE.title,
      language: 'zh-Hant',
      url:
        GENERAL_NATAL_GYEOPJAE_BIJIE_DANG_ZHONG_SUPPORT_CONSTITUENT_SOURCE.url,
      accessedAt:
        GENERAL_NATAL_GYEOPJAE_BIJIE_DANG_ZHONG_SUPPORT_CONSTITUENT_SOURCE
          .accessedAt,
      provenanceTier: 'cross_reference',
      rights: {
        copyrightStatus: 'unknown',
        reusePolicy: 'metadata_only',
      },
      notes:
        'R23 reuses the governed R15 per-slot 겁재 support surface. It introduces no 겁재 count.',
    } as const satisfies SourceReference),
  ] as const);

export const SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_CLAIM_VALUE =
  Object.freeze({
    evidenceKind: 'visible_stem_bijie_support_constituent_union',
    semanticScope: 'fixed_visible_stem_support_presence_only',
    sourceSupportCategory: '比劫',
    visibleStemBijieSupportObserved: true,
    slotDetails: 'research_evidence_only',
    memberKinds: 'research_evidence_only',
    bijianCount: 'not_authorized',
    gyeopjaeCount: 'not_authorized',
    unifiedBijieCount: 'not_authorized',
    supportCount: 'not_authorized',
    supportWeight: 'not_authorized',
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

export const SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_CLAIM_VALUE_SCHEMA =
  Object.freeze({
    schemaId:
      SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_CLAIM_SCHEMA_ID,
    version:
      SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_STRUCTURAL_CLAIM_VERSION,
    root: {
      kind: 'object',
      required: [
        'evidenceKind',
        'semanticScope',
        'sourceSupportCategory',
        'visibleStemBijieSupportObserved',
        'slotDetails',
        'memberKinds',
        'bijianCount',
        'gyeopjaeCount',
        'unifiedBijieCount',
        'supportCount',
        'supportWeight',
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
          value: 'visible_stem_bijie_support_constituent_union',
        },
        semanticScope: {
          kind: 'literal',
          value: 'fixed_visible_stem_support_presence_only',
        },
        sourceSupportCategory: { kind: 'literal', value: '比劫' },
        visibleStemBijieSupportObserved: { kind: 'literal', value: true },
        slotDetails: { kind: 'literal', value: 'research_evidence_only' },
        memberKinds: { kind: 'literal', value: 'research_evidence_only' },
        bijianCount: { kind: 'literal', value: 'not_authorized' },
        gyeopjaeCount: { kind: 'literal', value: 'not_authorized' },
        unifiedBijieCount: { kind: 'literal', value: 'not_authorized' },
        supportCount: { kind: 'literal', value: 'not_authorized' },
        supportWeight: { kind: 'literal', value: 'not_authorized' },
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

export const SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_CLAIM_TYPE_DEFINITION =
  Object.freeze({
    claimType:
      SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_CLAIM_TYPE,
    version:
      SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_STRUCTURAL_CLAIM_VERSION,
    valueSchemaRef: {
      id: SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_CLAIM_SCHEMA_ID,
      version:
        SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_STRUCTURAL_CLAIM_VERSION,
    },
    scope: 'natal',
    exclusiveValue: true,
    scenarioSensitive: true,
    materialForNarrative: false,
    allowedTaxonomyTiers: ['T2'],
  } as const satisfies ClaimTypeDefinition);

export const SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_METHODOLOGY =
  Object.freeze({
    methodologyId:
      SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_METHODOLOGY_ID,
    version:
      SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_STRUCTURAL_CLAIM_VERSION,
    family: 'day_master_strength',
    name: 'Visible-stem Bijie support constituent union materialization',
    description:
      'Research-only T2 materialization of exact visible-stem 比肩/겁재 support constituents over fixed year/month/hour slots. R21 and R15 supply support semantics while R19 is only a member-kind parity guard. No count, support aggregation, or downstream settlement is introduced.',
    assumptions: [
      'R21, R15, and R19 are independently re-evaluated from the same canonical Ten-God facts.',
      'Slot identity, sourceFactRef, and canonical Ten-God must agree across all three surfaces.',
      'Exact 比肩 and exact 겁재 cannot both be positive on one canonical slot.',
      'R19 member kind must exactly match whichever support surface is positive.',
      'Resolved non-member Ten-Gods are negative only inside this fixed visible-stem union.',
      'No upstream count is copied or reinterpreted.',
      'Branch Ten-Gods and hidden stems are not consumed.',
      'No Narrative, Preview, Official, public semantic, or Production authority is created.',
    ],
    requiredFactTypes: [],
    inputContract: {
      researchEvidenceInputs: [
        SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_METHODOLOGY_RESEARCH_INPUT,
      ],
    },
    sourceIds:
      SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_SOURCES.map(
        (source) => source.sourceId,
      ),
    status: 'research',
  } as const satisfies MethodologyDefinition);

export const SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_RULE =
  Object.freeze({
    ruleId: 'RULE-SAJU-R23-VISIBLE-STEM-BIJIE-SUPPORT-UNION',
    version:
      SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_STRUCTURAL_CLAIM_VERSION,
    ruleSetId:
      SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_RULE_SET_ID,
    taxonomy: {
      tier: 'T2',
      category: 'day_master_strength',
      subcategory: 'visible_stem_bijie_support_union',
    },
    methodologyRef: {
      id: SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_METHODOLOGY_ID,
      version:
        SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_STRUCTURAL_CLAIM_VERSION,
    },
    title: 'Visible-stem Bijie support constituent observed',
    description:
      'Emits one research-only T2 marker when exact R23 evidence proves at least one fixed visible-stem 比肩/겁재 slot is a governed 比劫 support constituent. Slot/member detail remains evidence-only and no count or aggregation meaning is emitted.',
    inputs: [
      SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_RULE_INPUT_REQUIREMENT,
    ],
    condition: {
      op: 'eq',
      left: {
        kind: 'input',
        key:
          SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_RULE_INPUT_REQUIREMENT
            .key,
        path: 'visibleStemBijieSupportObserved',
      },
      right: { kind: 'literal', value: true },
    },
    output: {
      claimType:
        SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_CLAIM_TYPE,
      subject: 'day_master',
      predicate: 'visible_stem_bijie_support_constituent_observed',
      value: SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_CLAIM_VALUE,
      polarity: 'neutral',
      emphasis: 'moderate',
      tags: [
        'research',
        'day-master-strength',
        'bijie',
        'bijian',
        'gyeopjae',
        'visible-stem',
        'support-union',
        'support-constituent',
        'presence-only',
        'non-aggregated',
      ],
    },
    sourceRefs:
      SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_SOURCES.map(
        (source) => ({
          sourceId: source.sourceId,
          supportType: 'interpretive_basis' as const,
          notes:
            'R23 uses governed sources only for bounded visible 比劫 support membership; count, complete collection, and downstream settlement remain outside authority.',
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

export const SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_RULES =
  Object.freeze([
    SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_RULE,
  ] as const);

export const SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_PACK =
  Object.freeze({
    packId: 'PACK-SAJU-R23-VISIBLE-STEM-BIJIE-SUPPORT-UNION-RESEARCH',
    version:
      SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_STRUCTURAL_CLAIM_VERSION,
    name: 'SAJU-R23 Visible-Stem Bijie Support Union Research Pack',
    methodologyRefs: [
      {
        id: SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_METHODOLOGY_ID,
        version:
          SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_STRUCTURAL_CLAIM_VERSION,
      },
    ],
    enabledRuleSets: [
      SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_RULE_SET_ID,
    ],
    conflictPolicy: 'preserve_all',
    ambiguityPolicy: 'skip_requires_resolved',
    compositionPolicyRef: {
      id: 'COMPOSITION-SAJU-R23-VISIBLE-STEM-BIJIE-SUPPORT-UNION-RESEARCH',
      version:
        SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_STRUCTURAL_CLAIM_VERSION,
    },
    claimContractMode: 'registered_required',
    status: 'research',
  } as const satisfies InterpretationPack);

export function createSharedNatalVisibleStemBijieSupportUnionResearchRegistry(
  createdAt = '1970-01-01T00:00:00.000Z',
) {
  return createRuleRegistrySnapshot(
    {
      rules: SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_RULES,
      methodologies: [
        SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_METHODOLOGY,
      ],
      sources: [...SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_SOURCES],
      claimTypeDefinitions: [
        SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_CLAIM_TYPE_DEFINITION,
      ],
      claimValueSchemas: [
        SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_CLAIM_VALUE_SCHEMA,
      ],
      reviewAttestations: [],
    },
    SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_PACK,
    createdAt,
  );
}

export const SHARED_NATAL_VISIBLE_STEM_BIJIE_SUPPORT_UNION_AUTHORITY_BOUNDARY =
  Object.freeze({
    runtimeScope: 'isolated_research_pack_only' as const,
    exactR23EvidenceBindingRequired: true as const,
    fixedVisibleStemDomainOnly: true as const,
    sourceSlotIdentityPreserved: true as const,
    canonicalMemberKindPreserved: true as const,
    upstreamThreeWayParityRequired: true as const,
    categoryUnionUsedOnlyAsParityGuard: true as const,
    supportConstituentUnionAuthorizedResearchOnly: true as const,
    bijianCountAuthorized: false as const,
    gyeopjaeCountAuthorized: false as const,
    unifiedBijieCountAuthorized: false as const,
    supportCountAuthorized: false as const,
    supportWeightAuthorized: false as const,
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
