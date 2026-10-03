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
  GENERAL_NATAL_VISIBLE_BIJIAN_DANG_ZHONG_CONSTITUENT_SOURCE,
} from './general-natal-visible-bijian-dang-zhong-constituent-authority.js';
import {
  SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_RESEARCH_EVIDENCE_DEFINITION,
  SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_RESEARCH_EVIDENCE_TYPE,
  SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_RESEARCH_EVIDENCE_VERSION,
} from './shared-natal-visible-bijian-support-research-evidence-adapter.js';

export const SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_STRUCTURAL_CLAIM_VERSION =
  '0.1.0-research' as const;

export const SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_CLAIM_TYPE =
  'DAY_MASTER_VISIBLE_BIJIAN_SUPPORT_CONSTITUENT_EVIDENCE' as const;

export const SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_CLAIM_SCHEMA_ID =
  'day_master.visible_bijian_support_constituent_evidence.schema' as const;

export const SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_METHODOLOGY_ID =
  'M-STRENGTH-FUYI-VISIBLE-BIJIAN-SUPPORT-CONSTITUENT' as const;

export const SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_RULE_SET_ID =
  'saju-r7-visible-bijian-support-constituent' as const;

export const SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_EVIDENCE_DEFINITION_REF =
  Object.freeze({
    id: SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_RESEARCH_EVIDENCE_DEFINITION.definitionId,
    version:
      SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_RESEARCH_EVIDENCE_DEFINITION.version,
  }) satisfies VersionedRef;

export const SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_METHODOLOGY_RESEARCH_INPUT =
  Object.freeze({
    source: 'research_evidence',
    evidenceType: SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_RESEARCH_EVIDENCE_TYPE,
    evidenceVersion: SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_RESEARCH_EVIDENCE_VERSION,
    definitionRef: SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_EVIDENCE_DEFINITION_REF,
    mode: 'allowed',
    rationale:
      'Consumes only exact snapshot-bound R7 visible-比肩 support evidence. The upstream 1/2/3 peer count remains a bounded operand only and is not converted to 黨眾, strength weight, score, or generalized support aggregation.',
  }) satisfies MethodologyResearchEvidenceInputContract;

export const SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_RULE_INPUT_REQUIREMENT =
  Object.freeze({
    key: 'visibleBijianSupportEvidence',
    source: 'research_evidence',
    pathOrClaimType: SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_RESEARCH_EVIDENCE_TYPE,
    required: true,
    ambiguityBehavior: 'requires_resolved',
    evidenceVersion: SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_RESEARCH_EVIDENCE_VERSION,
    researchEvidenceDefinitionRef:
      SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_EVIDENCE_DEFINITION_REF,
  }) satisfies RuleInputRequirement;

export const SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_SOURCE = Object.freeze({
  sourceId: 'SRC-GENERAL-NATAL-VISIBLE-BIJIAN-SUPPORT-CONSTITUENT',
  sourceType: 'web',
  title: GENERAL_NATAL_VISIBLE_BIJIAN_DANG_ZHONG_CONSTITUENT_SOURCE.title,
  language: 'zh-Hant',
  locator: {
    section: GENERAL_NATAL_VISIBLE_BIJIAN_DANG_ZHONG_CONSTITUENT_SOURCE.section,
  },
  url: GENERAL_NATAL_VISIBLE_BIJIAN_DANG_ZHONG_CONSTITUENT_SOURCE.url,
  accessedAt: GENERAL_NATAL_VISIBLE_BIJIAN_DANG_ZHONG_CONSTITUENT_SOURCE.accessedAt,
  provenanceTier: 'cross_reference',
  rights: {
    copyrightStatus: 'unknown',
    reusePolicy: 'metadata_only',
  },
  notes:
    '기존 governed visible 比肩 -> 比劫 support-constituent 권한을 재사용한다. R7은 劫財, 印綬, 通根扶助 또는 집계 규칙을 추가하지 않는다.',
} as const satisfies SourceReference);

export const SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_CLAIM_VALUE = Object.freeze({
  evidenceKind: 'visible_bijian_support_constituent',
  semanticScope: 'positive_constituent_observation_only',
  canonicalConstituent: '비견',
  sourceSupportCategory: '比劫',
  supportConstituentObserved: true,
  peerCountSemantics: 'bounded_operand_only',
  jiecaiIncluded: false,
  constituentCollectionComplete: false,
  supportAggregation: 'not_authorized',
  dangZhong: 'not_determined',
  zhuGua: 'not_determined',
  qiangRuo: 'not_determined',
  wangShuai: 'not_determined',
  gyeokguk: 'not_determined',
  numericStrength: 'not_authorized',
  productionAuthority: false,
} as const);

export const SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_CLAIM_VALUE_SCHEMA =
  Object.freeze({
    schemaId: SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_CLAIM_SCHEMA_ID,
    version: SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_STRUCTURAL_CLAIM_VERSION,
    root: {
      kind: 'object',
      required: [
        'evidenceKind',
        'semanticScope',
        'canonicalConstituent',
        'sourceSupportCategory',
        'supportConstituentObserved',
        'peerCountSemantics',
        'jiecaiIncluded',
        'constituentCollectionComplete',
        'supportAggregation',
        'dangZhong',
        'zhuGua',
        'qiangRuo',
        'wangShuai',
        'gyeokguk',
        'numericStrength',
        'productionAuthority',
      ],
      properties: {
        evidenceKind: {
          kind: 'literal',
          value: 'visible_bijian_support_constituent',
        },
        semanticScope: {
          kind: 'literal',
          value: 'positive_constituent_observation_only',
        },
        canonicalConstituent: { kind: 'literal', value: '비견' },
        sourceSupportCategory: { kind: 'literal', value: '比劫' },
        supportConstituentObserved: { kind: 'literal', value: true },
        peerCountSemantics: { kind: 'literal', value: 'bounded_operand_only' },
        jiecaiIncluded: { kind: 'literal', value: false },
        constituentCollectionComplete: { kind: 'literal', value: false },
        supportAggregation: { kind: 'literal', value: 'not_authorized' },
        dangZhong: { kind: 'literal', value: 'not_determined' },
        zhuGua: { kind: 'literal', value: 'not_determined' },
        qiangRuo: { kind: 'literal', value: 'not_determined' },
        wangShuai: { kind: 'literal', value: 'not_determined' },
        gyeokguk: { kind: 'literal', value: 'not_determined' },
        numericStrength: { kind: 'literal', value: 'not_authorized' },
        productionAuthority: { kind: 'literal', value: false },
      },
      additionalProperties: false,
    },
  } as const satisfies ClaimValueSchemaDefinition);

export const SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_CLAIM_TYPE_DEFINITION =
  Object.freeze({
    claimType: SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_CLAIM_TYPE,
    version: SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_STRUCTURAL_CLAIM_VERSION,
    valueSchemaRef: {
      id: SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_CLAIM_SCHEMA_ID,
      version: SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_STRUCTURAL_CLAIM_VERSION,
    },
    scope: 'natal',
    exclusiveValue: true,
    scenarioSensitive: true,
    materialForNarrative: false,
    allowedTaxonomyTiers: ['T2'],
  } as const satisfies ClaimTypeDefinition);

export const SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_METHODOLOGY =
  Object.freeze({
    methodologyId: SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_METHODOLOGY_ID,
    version: SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_STRUCTURAL_CLAIM_VERSION,
    family: 'day_master_strength',
    name: 'Visible Bijian support constituent materialization',
    description:
      'Research-only T2 materialization of exact R7 visible 比肩 support evidence. It records only the bounded positive visible-比肩 constituent family and does not convert peer count into 黨眾, strength weight, score, support aggregation, or Production authority.',
    assumptions: [
      'Only exact R7 snapshot-bound research evidence may be consumed.',
      'Visible stem Ten-God facts must already be canonical and resolved; R7 performs no Ten-God recomputation.',
      'Only exact 比肩 is admitted. 劫財, branch Ten-Gods, hidden stems, and the day self marker are not counted as peer stems.',
      'The upstream 1/2/3 peer count remains a bounded operand and is not a strength or 黨眾 metric.',
      'Zero visible 比肩 is not evidence of no support, 助寡, 弱, or 從.',
      'No narrative, Preview, Official, public semantic, or Production authority is created.',
    ],
    requiredFactTypes: [],
    inputContract: {
      researchEvidenceInputs: [
        SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_METHODOLOGY_RESEARCH_INPUT,
      ],
    },
    sourceIds: [SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_SOURCE.sourceId],
    status: 'research',
  } as const satisfies MethodologyDefinition);

export const SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_RULE =
  Object.freeze({
    ruleId: 'RULE-SAJU-R7-VISIBLE-BIJIAN-SUPPORT-CONSTITUENT',
    version: SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_STRUCTURAL_CLAIM_VERSION,
    ruleSetId: SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_RULE_SET_ID,
    taxonomy: {
      tier: 'T2',
      category: 'day_master_strength',
      subcategory: 'visible_bijian_support_constituent',
    },
    methodologyRef: {
      id: SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_METHODOLOGY_ID,
      version: SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_STRUCTURAL_CLAIM_VERSION,
    },
    title: 'Visible Bijian support constituent observed',
    description:
      'Emits one research-only T2 marker when exact R7 evidence contains a governed positive visible 比肩 support constituent. The underlying 1/2/3 bounded peer count is not emitted as strength or 黨眾 semantics.',
    inputs: [SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_RULE_INPUT_REQUIREMENT],
    condition: {
      op: 'eq',
      left: {
        kind: 'input',
        key: SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_RULE_INPUT_REQUIREMENT.key,
        path: 'supportConstituentObserved',
      },
      right: { kind: 'literal', value: true },
    },
    output: {
      claimType: SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_CLAIM_TYPE,
      subject: 'day_master',
      predicate: 'visible_bijian_support_constituent_observed',
      value: SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_CLAIM_VALUE,
      polarity: 'neutral',
      emphasis: 'moderate',
      tags: [
        'research',
        'day-master-strength',
        'visible-bijian',
        'support-constituent',
        'non-aggregated',
      ],
    },
    sourceRefs: [
      {
        sourceId: SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_SOURCE.sourceId,
        supportType: 'interpretive_basis',
        notes:
          '기존 governed visible 比肩 support-constituent 권한을 재사용한다. R7은 count를 黨眾/강도 의미로 승격하지 않는다.',
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

export const SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_PACK =
  Object.freeze({
    packId: 'PACK-SAJU-R7-VISIBLE-BIJIAN-SUPPORT-RESEARCH',
    version: SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_STRUCTURAL_CLAIM_VERSION,
    name: 'SAJU-R7 Visible Bijian Support Constituent Research Pack',
    methodologyRefs: [
      {
        id: SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_METHODOLOGY_ID,
        version: SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_STRUCTURAL_CLAIM_VERSION,
      },
    ],
    enabledRuleSets: [SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_RULE_SET_ID],
    conflictPolicy: 'preserve_all',
    ambiguityPolicy: 'skip_requires_resolved',
    compositionPolicyRef: {
      id: 'COMPOSITION-SAJU-R7-VISIBLE-BIJIAN-SUPPORT-RESEARCH',
      version: SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_STRUCTURAL_CLAIM_VERSION,
    },
    claimContractMode: 'registered_required',
    status: 'research',
  } as const satisfies InterpretationPack);

export function createSharedNatalVisibleBijianSupportResearchRegistry(
  createdAt = '1970-01-01T00:00:00.000Z',
) {
  return createRuleRegistrySnapshot(
    {
      rules: [SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_RULE],
      methodologies: [SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_METHODOLOGY],
      sources: [SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_SOURCE],
      claimTypeDefinitions: [
        SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_CLAIM_TYPE_DEFINITION,
      ],
      claimValueSchemas: [
        SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_CLAIM_VALUE_SCHEMA,
      ],
      reviewAttestations: [],
    },
    SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_PACK,
    createdAt,
  );
}

export const SHARED_NATAL_VISIBLE_BIJIAN_SUPPORT_AUTHORITY_BOUNDARY =
  Object.freeze({
    runtimeScope: 'isolated_research_pack_only' as const,
    exactR7EvidenceBindingRequired: true as const,
    exactCanonicalTenGodInputRequired: true as const,
    exactBijianOnly: true as const,
    jiecaiIncludedAsBijian: false as const,
    branchTenGodConsumed: false as const,
    hiddenStemConsumed: false as const,
    peerCountIsBoundedOperandOnly: true as const,
    peerCountToDangZhongAuthorized: false as const,
    peerCountToStrengthAuthorized: false as const,
    supportAggregationAuthorized: false as const,
    constituentCollectionComplete: false as const,
    noVisibleBijianMeansNoSupport: false as const,
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
