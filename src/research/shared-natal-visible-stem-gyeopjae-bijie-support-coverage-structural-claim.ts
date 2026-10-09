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
  GENERAL_NATAL_GYEOPJAE_BIJIE_DANG_ZHONG_SUPPORT_CONSTITUENT_AUTHORITY,
} from './general-natal-gyeopjae-bijie-dang-zhong-support-constituent-authority.js';
import {
  SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_RESEARCH_EVIDENCE_DEFINITION,
  SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_RESEARCH_EVIDENCE_TYPE,
  SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_RESEARCH_EVIDENCE_VERSION,
} from './shared-natal-visible-stem-gyeopjae-bijie-support-coverage-research-evidence-adapter.js';

export const SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_STRUCTURAL_CLAIM_VERSION =
  '0.1.0-research' as const;

export const SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_CLAIM_TYPE =
  'DAY_MASTER_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_EVIDENCE' as const;

export const SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_CLAIM_SCHEMA_ID =
  'day_master.visible_stem_gyeopjae_bijie_support_coverage_evidence.schema' as const;

export const SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_METHODOLOGY_ID =
  'M-STRENGTH-FUYI-VISIBLE-STEM-GYEOPJAE-BIJIE-SUPPORT-COVERAGE' as const;

export const SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_RULE_SET_ID =
  'saju-r15-visible-stem-gyeopjae-bijie-support-coverage' as const;

export const SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_EVIDENCE_DEFINITION_REF =
  Object.freeze({
    id:
      SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_RESEARCH_EVIDENCE_DEFINITION
        .definitionId,
    version:
      SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_RESEARCH_EVIDENCE_DEFINITION
        .version,
  }) satisfies VersionedRef;

export const SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_METHODOLOGY_RESEARCH_INPUT =
  Object.freeze({
    source: 'research_evidence',
    evidenceType:
      SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_RESEARCH_EVIDENCE_TYPE,
    evidenceVersion:
      SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_RESEARCH_EVIDENCE_VERSION,
    definitionRef:
      SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_EVIDENCE_DEFINITION_REF,
    mode: 'allowed',
    rationale:
      'Consumes only exact snapshot-bound R15 evidence over the fixed canonical year/month/hour visible-stem scope. Slot detail remains evidence provenance only; the claim exposes positive presence without 겁재 count, 比肩+겁재 union, complete 比劫 collection, or downstream settlement.',
  }) satisfies MethodologyResearchEvidenceInputContract;

export const SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_RULE_INPUT_REQUIREMENT =
  Object.freeze({
    key: 'visibleStemGyeopjaeBijieSupportCoverageEvidence',
    source: 'research_evidence',
    pathOrClaimType:
      SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_RESEARCH_EVIDENCE_TYPE,
    required: true,
    ambiguityBehavior: 'requires_resolved',
    evidenceVersion:
      SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_RESEARCH_EVIDENCE_VERSION,
    researchEvidenceDefinitionRef:
      SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_EVIDENCE_DEFINITION_REF,
  }) satisfies RuleInputRequirement;

export const SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_SOURCE =
  Object.freeze({
    sourceId:
      'SRC-GENERAL-NATAL-VISIBLE-STEM-GYEOPJAE-BIJIE-SUPPORT-COVERAGE',
    sourceType: 'web',
    title:
      GENERAL_NATAL_GYEOPJAE_BIJIE_DANG_ZHONG_SUPPORT_CONSTITUENT_AUTHORITY
        .source.title,
    language: 'zh-Hant',
    url:
      GENERAL_NATAL_GYEOPJAE_BIJIE_DANG_ZHONG_SUPPORT_CONSTITUENT_AUTHORITY
        .source.url,
    accessedAt:
      GENERAL_NATAL_GYEOPJAE_BIJIE_DANG_ZHONG_SUPPORT_CONSTITUENT_AUTHORITY
        .source.accessedAt,
    provenanceTier: 'cross_reference',
    rights: {
      copyrightStatus: 'unknown',
      reusePolicy: 'metadata_only',
    },
    notes:
      'R15는 R11의 canonical 겁재 -> 劫財 -> 比劫 membership/support 의미를 canonical year/month/hour visible-stem 고정 범위에 적용한다. count, 比肩 union, branch/hidden coverage 또는 aggregation은 만들지 않는다.',
  } as const satisfies SourceReference);

export const SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_CLAIM_VALUE =
  Object.freeze({
    evidenceKind: 'visible_stem_gyeopjae_bijie_support_coverage',
    semanticScope: 'fixed_visible_stem_positive_presence_only',
    canonicalConstituent: '겁재',
    sourceMemberLabel: '劫財',
    sourceSupportCategory: '比劫',
    visibleStemSupportObserved: true,
    slotDetails: 'research_evidence_only',
    gyeopjaeCount: 'not_authorized',
    bijianGyeopjaeUnion: 'not_authorized',
    unifiedBijieCount: 'not_authorized',
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

export const SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_CLAIM_VALUE_SCHEMA =
  Object.freeze({
    schemaId:
      SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_CLAIM_SCHEMA_ID,
    version:
      SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_STRUCTURAL_CLAIM_VERSION,
    root: {
      kind: 'object',
      required: [
        'evidenceKind',
        'semanticScope',
        'canonicalConstituent',
        'sourceMemberLabel',
        'sourceSupportCategory',
        'visibleStemSupportObserved',
        'slotDetails',
        'gyeopjaeCount',
        'bijianGyeopjaeUnion',
        'unifiedBijieCount',
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
          value: 'visible_stem_gyeopjae_bijie_support_coverage',
        },
        semanticScope: {
          kind: 'literal',
          value: 'fixed_visible_stem_positive_presence_only',
        },
        canonicalConstituent: { kind: 'literal', value: '겁재' },
        sourceMemberLabel: { kind: 'literal', value: '劫財' },
        sourceSupportCategory: { kind: 'literal', value: '比劫' },
        visibleStemSupportObserved: { kind: 'literal', value: true },
        slotDetails: { kind: 'literal', value: 'research_evidence_only' },
        gyeopjaeCount: { kind: 'literal', value: 'not_authorized' },
        bijianGyeopjaeUnion: {
          kind: 'literal',
          value: 'not_authorized',
        },
        unifiedBijieCount: { kind: 'literal', value: 'not_authorized' },
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

export const SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_CLAIM_TYPE_DEFINITION =
  Object.freeze({
    claimType:
      SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_CLAIM_TYPE,
    version:
      SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_STRUCTURAL_CLAIM_VERSION,
    valueSchemaRef: {
      id:
        SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_CLAIM_SCHEMA_ID,
      version:
        SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_STRUCTURAL_CLAIM_VERSION,
    },
    scope: 'natal',
    exclusiveValue: true,
    scenarioSensitive: true,
    materialForNarrative: false,
    allowedTaxonomyTiers: ['T2'],
  } as const satisfies ClaimTypeDefinition);

export const SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_METHODOLOGY =
  Object.freeze({
    methodologyId:
      SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_METHODOLOGY_ID,
    version:
      SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_STRUCTURAL_CLAIM_VERSION,
    family: 'day_master_strength',
    name: 'Visible-stem Gyeopjae Bijie support coverage materialization',
    description:
      'Research-only T2 materialization of positive canonical 겁재 presence across the fixed year/month/hour visible-stem scope. It preserves slot detail only in ResearchEvidence and emits at most one chart-level presence marker without count, 比肩 union, complete 比劫 collection, or structural settlement.',
    assumptions: [
      'The canonical Ten-God chart and every visible stem fact are resolved.',
      'The day stem remains the canonical self marker and is excluded from the coverage slots.',
      'Resolved 겁재 is the only positive visible-slot input.',
      'Resolved non-겁재 slots are bounded outside-scope results, not universal non-比劫 verdicts.',
      'One, two, or three positive slots still produce only one presence claim.',
      'Branch Ten-Gods and hidden stems are not consumed.',
      'No Narrative, Preview, Official, public semantic, or Production authority is created.',
    ],
    requiredFactTypes: [],
    inputContract: {
      researchEvidenceInputs: [
        SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_METHODOLOGY_RESEARCH_INPUT,
      ],
    },
    sourceIds: [
      SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_SOURCE.sourceId,
    ],
    status: 'research',
  } as const satisfies MethodologyDefinition);

export const SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_RULE =
  Object.freeze({
    ruleId:
      'RULE-SAJU-R15-VISIBLE-STEM-GYEOPJAE-BIJIE-SUPPORT-COVERAGE',
    version:
      SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_STRUCTURAL_CLAIM_VERSION,
    ruleSetId:
      SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_RULE_SET_ID,
    taxonomy: {
      tier: 'T2',
      category: 'day_master_strength',
      subcategory: 'visible_stem_gyeopjae_bijie_support_coverage',
    },
    methodologyRef: {
      id:
        SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_METHODOLOGY_ID,
      version:
        SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_STRUCTURAL_CLAIM_VERSION,
    },
    title: 'Visible-stem Gyeopjae Bijie support observed',
    description:
      'Emits one research-only T2 presence marker when exact R15 evidence proves at least one canonical year/month/hour visible stem is governed 겁재 -> 劫財 -> 比劫 support. Slot detail and multiplicity remain evidence-only and are not emitted as count or aggregation semantics.',
    inputs: [
      SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_RULE_INPUT_REQUIREMENT,
    ],
    condition: {
      op: 'eq',
      left: {
        kind: 'input',
        key:
          SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_RULE_INPUT_REQUIREMENT
            .key,
        path: 'visibleStemGyeopjaeSupportObserved',
      },
      right: { kind: 'literal', value: true },
    },
    output: {
      claimType:
        SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_CLAIM_TYPE,
      subject: 'day_master',
      predicate: 'visible_stem_gyeopjae_bijie_support_observed',
      value:
        SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_CLAIM_VALUE,
      polarity: 'neutral',
      emphasis: 'moderate',
      tags: [
        'research',
        'day-master-strength',
        'gyeopjae',
        'bijie',
        'visible-stem',
        'coverage',
        'presence-only',
        'non-aggregated',
      ],
    },
    sourceRefs: [
      {
        sourceId:
          SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_SOURCE
            .sourceId,
        supportType: 'interpretive_basis',
        notes:
          'R11 겁재 -> 比劫 membership/support semantics를 R15 fixed visible-stem coverage evidence가 재사용한다.',
      },
    ],
    quality: {
      provenanceQuality: 'secondary_only',
      testCoverage: 'fixture_matrix',
      methodologyStability: 'contested',
      reviewerStatus: 'unreviewed',
    },
    status: 'research',
  } as const satisfies RuleDefinition);

export const SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_RULES =
  Object.freeze([
    SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_RULE,
  ] as const);

export const SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_PACK =
  Object.freeze({
    packId:
      'PACK-SAJU-R15-VISIBLE-STEM-GYEOPJAE-BIJIE-SUPPORT-COVERAGE-RESEARCH',
    version:
      SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_STRUCTURAL_CLAIM_VERSION,
    name: 'SAJU-R15 Visible-Stem Gyeopjae Bijie Support Coverage Research Pack',
    methodologyRefs: [
      {
        id:
          SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_METHODOLOGY_ID,
        version:
          SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_STRUCTURAL_CLAIM_VERSION,
      },
    ],
    enabledRuleSets: [
      SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_RULE_SET_ID,
    ],
    conflictPolicy: 'preserve_all',
    ambiguityPolicy: 'skip_requires_resolved',
    compositionPolicyRef: {
      id:
        'COMPOSITION-SAJU-R15-VISIBLE-STEM-GYEOPJAE-BIJIE-SUPPORT-COVERAGE-RESEARCH',
      version:
        SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_STRUCTURAL_CLAIM_VERSION,
    },
    claimContractMode: 'registered_required',
    status: 'research',
  } as const satisfies InterpretationPack);

export function createSharedNatalVisibleStemGyeopjaeBijieSupportCoverageResearchRegistry(
  createdAt = '1970-01-01T00:00:00.000Z',
) {
  return createRuleRegistrySnapshot(
    {
      rules:
        SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_RULES,
      methodologies: [
        SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_METHODOLOGY,
      ],
      sources: [
        SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_SOURCE,
      ],
      claimTypeDefinitions: [
        SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_CLAIM_TYPE_DEFINITION,
      ],
      claimValueSchemas: [
        SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_CLAIM_VALUE_SCHEMA,
      ],
      reviewAttestations: [],
    },
    SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_PACK,
    createdAt,
  );
}

export const SHARED_NATAL_VISIBLE_STEM_GYEOPJAE_BIJIE_SUPPORT_COVERAGE_AUTHORITY_BOUNDARY =
  Object.freeze({
    runtimeScope: 'isolated_research_pack_only' as const,
    exactR15EvidenceBindingRequired: true as const,
    fixedVisibleStemCoverageAuthorizedResearchOnly: true as const,
    sourceSlotIdentityPreserved: true as const,
    daySelfMarkerRequired: true as const,
    visibleStemGyeopjaePresenceAuthorized: true as const,
    visibleStemGyeopjaeCountAuthorized: false as const,
    resolvedOtherTenGodUniversalNonBijieVerdictAuthorized: false as const,
    bijianGyeopjaeUnionAuthorized: false as const,
    unifiedBijieCountAuthorized: false as const,
    completeBijieCollectionAuthorized: false as const,
    wholeChartJiecaiScanAuthorized: false as const,
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

