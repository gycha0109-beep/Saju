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
  GENERAL_NATAL_TONGGEN_DANG_ZHONG_SUPPORT_CONSTITUENT_SOURCE,
} from './general-natal-tonggen-dang-zhong-support-constituent-authority.js';
import {
  GENERAL_NATAL_WANG_CHANGSHENG_LU_TONGGEN_SUPPORT_CONSTITUENT_SOURCE,
} from './general-natal-wang-changsheng-lu-tonggen-dang-zhong-support-constituent-authority.js';
import {
  SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_RESEARCH_EVIDENCE_DEFINITION,
  SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_RESEARCH_EVIDENCE_TYPE,
  SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_RESEARCH_EVIDENCE_VERSION,
} from './shared-natal-bounded-tonggen-support-research-evidence-adapter.js';

export const SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_STRUCTURAL_CLAIM_VERSION =
  '0.1.0-research' as const;

export const SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_CLAIM_TYPE =
  'DAY_MASTER_BOUNDED_TONGGEN_SUPPORT_CONSTITUENT_EVIDENCE' as const;

export const SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_CLAIM_SCHEMA_ID =
  'day_master.bounded_tonggen_support_constituent_evidence.schema' as const;

export const SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_METHODOLOGY_ID =
  'M-STRENGTH-FUYI-BOUNDED-TONGGEN-SUPPORT-CONSTITUENT' as const;

export const SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_RULE_SET_ID =
  'saju-r6-bounded-tonggen-support-constituent' as const;

export const SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_EVIDENCE_DEFINITION_REF =
  Object.freeze({
    id: SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_RESEARCH_EVIDENCE_DEFINITION.definitionId,
    version:
      SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_RESEARCH_EVIDENCE_DEFINITION.version,
  }) satisfies VersionedRef;

export const SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_METHODOLOGY_RESEARCH_INPUT =
  Object.freeze({
    source: 'research_evidence',
    evidenceType:
      SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_RESEARCH_EVIDENCE_TYPE,
    evidenceVersion:
      SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_RESEARCH_EVIDENCE_VERSION,
    definitionRef:
      SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_EVIDENCE_DEFINITION_REF,
    mode: 'allowed',
    rationale:
      'Consumes only exact snapshot-bound R6 通根扶助 constituent evidence. It does not assign constituent count/position weight, complete the support collection, aggregate 比劫/印綬/通根, settle 黨眾/助寡, or classify 強弱/旺衰/格局.',
  }) satisfies MethodologyResearchEvidenceInputContract;

export const SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_RULE_INPUT_REQUIREMENT =
  Object.freeze({
    key: 'boundedTonggenSupportEvidence',
    source: 'research_evidence',
    pathOrClaimType:
      SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_RESEARCH_EVIDENCE_TYPE,
    required: true,
    ambiguityBehavior: 'requires_resolved',
    evidenceVersion:
      SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_RESEARCH_EVIDENCE_VERSION,
    researchEvidenceDefinitionRef:
      SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_EVIDENCE_DEFINITION_REF,
  }) satisfies RuleInputRequirement;

export const SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_SOURCES = Object.freeze([
  {
    sourceId: 'SRC-GENERAL-NATAL-TONGGEN-SUPPORT-CONSTITUENT-MUKU-YUQI',
    sourceType: 'web',
    title: GENERAL_NATAL_TONGGEN_DANG_ZHONG_SUPPORT_CONSTITUENT_SOURCE.title,
    language: 'zh-Hant',
    locator: {
      section:
        GENERAL_NATAL_TONGGEN_DANG_ZHONG_SUPPORT_CONSTITUENT_SOURCE.section,
    },
    url: GENERAL_NATAL_TONGGEN_DANG_ZHONG_SUPPORT_CONSTITUENT_SOURCE.url,
    accessedAt:
      GENERAL_NATAL_TONGGEN_DANG_ZHONG_SUPPORT_CONSTITUENT_SOURCE.accessedAt,
    provenanceTier: 'cross_reference',
    rights: {
      copyrightStatus: 'unknown',
      reusePolicy: 'metadata_only',
    },
    notes:
      '기존 non-Earth 墓庫/餘氣 bounded 通根 -> 通根扶助 구성요소 권한을 재사용한다. 새 전통 명제를 추가하지 않는다.',
  },
  {
    sourceId:
      'SRC-GENERAL-NATAL-TONGGEN-SUPPORT-CONSTITUENT-WANG-CHANGSHENG-LU',
    sourceType: 'web',
    title:
      GENERAL_NATAL_WANG_CHANGSHENG_LU_TONGGEN_SUPPORT_CONSTITUENT_SOURCE
        .title,
    language: 'zh-Hant',
    locator: {
      section:
        GENERAL_NATAL_WANG_CHANGSHENG_LU_TONGGEN_SUPPORT_CONSTITUENT_SOURCE
          .section,
    },
    url:
      GENERAL_NATAL_WANG_CHANGSHENG_LU_TONGGEN_SUPPORT_CONSTITUENT_SOURCE.url,
    accessedAt:
      GENERAL_NATAL_WANG_CHANGSHENG_LU_TONGGEN_SUPPORT_CONSTITUENT_SOURCE
        .accessedAt,
    provenanceTier: 'cross_reference',
    rights: {
      copyrightStatus: 'unknown',
      reusePolicy: 'metadata_only',
    },
    notes:
      '기존 旺/陽長生/四陽祿 bounded 通根 -> 通根扶助 구성요소 권한을 재사용한다. 새 전통 명제를 추가하지 않는다.',
  },
] as const satisfies readonly SourceReference[]);

export const SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_CLAIM_VALUE = Object.freeze({
  evidenceKind: 'bounded_tonggen_support_constituent',
  semanticScope: 'positive_constituent_observation_only',
  sourceConstituent: '通根',
  sourceSupportPhrase: '通根扶助',
  supportConstituentObserved: true,
  constituentCollectionComplete: false,
  constituentCountSemantics: 'not_authorized',
  positionWeighting: 'not_authorized',
  supportAggregation: 'not_authorized',
  dangZhong: 'not_determined',
  zhuGua: 'not_determined',
  qiangRuo: 'not_determined',
  wangShuai: 'not_determined',
  gyeokguk: 'not_determined',
  numericStrength: 'not_authorized',
  productionAuthority: false,
} as const);

export const SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_CLAIM_VALUE_SCHEMA =
  Object.freeze({
    schemaId: SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_CLAIM_SCHEMA_ID,
    version: SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_STRUCTURAL_CLAIM_VERSION,
    root: {
      kind: 'object',
      required: [
        'evidenceKind',
        'semanticScope',
        'sourceConstituent',
        'sourceSupportPhrase',
        'supportConstituentObserved',
        'constituentCollectionComplete',
        'constituentCountSemantics',
        'positionWeighting',
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
          value: 'bounded_tonggen_support_constituent',
        },
        semanticScope: {
          kind: 'literal',
          value: 'positive_constituent_observation_only',
        },
        sourceConstituent: { kind: 'literal', value: '通根' },
        sourceSupportPhrase: { kind: 'literal', value: '通根扶助' },
        supportConstituentObserved: { kind: 'literal', value: true },
        constituentCollectionComplete: { kind: 'literal', value: false },
        constituentCountSemantics: {
          kind: 'literal',
          value: 'not_authorized',
        },
        positionWeighting: { kind: 'literal', value: 'not_authorized' },
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

export const SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_CLAIM_TYPE_DEFINITION =
  Object.freeze({
    claimType: SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_CLAIM_TYPE,
    version: SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_STRUCTURAL_CLAIM_VERSION,
    valueSchemaRef: {
      id: SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_CLAIM_SCHEMA_ID,
      version: SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_STRUCTURAL_CLAIM_VERSION,
    },
    scope: 'natal',
    exclusiveValue: true,
    scenarioSensitive: true,
    materialForNarrative: false,
    allowedTaxonomyTiers: ['T2'],
  } as const satisfies ClaimTypeDefinition);

export const SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_METHODOLOGY =
  Object.freeze({
    methodologyId: SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_METHODOLOGY_ID,
    version: SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_STRUCTURAL_CLAIM_VERSION,
    family: 'day_master_strength',
    name: 'Bounded 通根扶助 support constituent materialization',
    description:
      'Research-only T2 materialization of exact R6 bounded 通根扶助 constituent evidence. It records only the observed constituent family and does not complete or count the support surface, aggregate 比劫/印綬/通根, settle 黨眾/助寡, classify 強弱/旺衰, derive 格局, or create product authority.',
    assumptions: [
      'Only exact R6 snapshot-bound research evidence may be consumed.',
      'R6 evidence itself is constrained to exact R5 bounded 通根 parity plus existing 通根扶助 support-constituent bridges.',
      'An observation is one bounded constituent observation, not a count, score, threshold, or completed collection.',
      'Absence of current bounded constituents does not mean no support, 助寡, 弱, or 不通根.',
      '通根扶助 may not be aggregated with 比劫 or 印綬 in this task.',
      'No narrative, Preview, Official, public semantic, or Production authority is created.',
    ],
    requiredFactTypes: [],
    inputContract: {
      researchEvidenceInputs: [
        SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_METHODOLOGY_RESEARCH_INPUT,
      ],
    },
    sourceIds: SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_SOURCES.map(
      (source) => source.sourceId,
    ),
    status: 'research',
  } as const satisfies MethodologyDefinition);

export const SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_RULE =
  Object.freeze({
    ruleId: 'RULE-SAJU-R6-BOUNDED-TONGGEN-SUPPORT-CONSTITUENT',
    version: SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_STRUCTURAL_CLAIM_VERSION,
    ruleSetId: SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_RULE_SET_ID,
    taxonomy: {
      tier: 'T2',
      category: 'day_master_strength',
      subcategory: 'bounded_tonggen_support_constituent',
    },
    methodologyRef: {
      id: SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_METHODOLOGY_ID,
      version: SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_STRUCTURAL_CLAIM_VERSION,
    },
    title: 'Bounded 通根扶助 support constituent observed',
    description:
      'Emits one research-only T2 marker when exact R6 evidence contains at least one governed 通根扶助 constituent observation. No count, aggregation, 黨眾/助寡, strength, or 格局 conclusion is emitted.',
    inputs: [SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_RULE_INPUT_REQUIREMENT],
    condition: {
      op: 'eq',
      left: {
        kind: 'input',
        key: SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_RULE_INPUT_REQUIREMENT.key,
        path: 'supportConstituentObserved',
      },
      right: { kind: 'literal', value: true },
    },
    output: {
      claimType: SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_CLAIM_TYPE,
      subject: 'day_master',
      predicate: 'bounded_tonggen_support_constituent_observed',
      value: SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_CLAIM_VALUE,
      polarity: 'neutral',
      emphasis: 'moderate',
      tags: [
        'research',
        'day-master-strength',
        'tonggen-support-constituent',
        'positive-observation-only',
        'non-aggregated',
      ],
    },
    sourceRefs: SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_SOURCES.map((source) => ({
      sourceId: source.sourceId,
      supportType: 'interpretive_basis' as const,
      notes:
        '기존 governed 通根 -> 通根扶助 구성요소 권한을 재사용한다. R6는 집계나 최종 구조 판정을 추가하지 않는다.',
    })),
    quality: {
      provenanceQuality: 'secondary_only',
      testCoverage: 'fixture_matrix',
      methodologyStability: 'contested',
      reviewerStatus: 'unreviewed',
    },
    status: 'research',
  } as const satisfies RuleDefinition);

export const SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_PACK =
  Object.freeze({
    packId: 'PACK-SAJU-R6-BOUNDED-TONGGEN-SUPPORT-RESEARCH',
    version: SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_STRUCTURAL_CLAIM_VERSION,
    name: 'SAJU-R6 Bounded Tonggen Support Constituent Research Pack',
    methodologyRefs: [
      {
        id: SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_METHODOLOGY_ID,
        version: SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_STRUCTURAL_CLAIM_VERSION,
      },
    ],
    enabledRuleSets: [SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_RULE_SET_ID],
    conflictPolicy: 'preserve_all',
    ambiguityPolicy: 'skip_requires_resolved',
    compositionPolicyRef: {
      id: 'COMPOSITION-SAJU-R6-BOUNDED-TONGGEN-SUPPORT-RESEARCH',
      version: SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_STRUCTURAL_CLAIM_VERSION,
    },
    claimContractMode: 'registered_required',
    status: 'research',
  } as const satisfies InterpretationPack);

export function createSharedNatalBoundedTonggenSupportResearchRegistry(
  createdAt = '1970-01-01T00:00:00.000Z',
) {
  return createRuleRegistrySnapshot(
    {
      rules: [SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_RULE],
      methodologies: [SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_METHODOLOGY],
      sources: SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_SOURCES,
      claimTypeDefinitions: [
        SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_CLAIM_TYPE_DEFINITION,
      ],
      claimValueSchemas: [
        SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_CLAIM_VALUE_SCHEMA,
      ],
      reviewAttestations: [],
    },
    SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_PACK,
    createdAt,
  );
}

export const SHARED_NATAL_BOUNDED_TONGGEN_SUPPORT_AUTHORITY_BOUNDARY =
  Object.freeze({
    runtimeScope: 'isolated_research_pack_only' as const,
    exactR6EvidenceBindingRequired: true as const,
    exactR5TonggenParityRequired: true as const,
    positiveConstituentObservationOnly: true as const,
    constituentCollectionComplete: false as const,
    constituentCountSemanticsAuthorized: false as const,
    positionWeightingAuthorized: false as const,
    supportAggregationAuthorized: false as const,
    noCurrentConstituentMeansNoSupport: false as const,
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
