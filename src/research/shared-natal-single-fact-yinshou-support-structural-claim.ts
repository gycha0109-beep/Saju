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
  GENERAL_NATAL_YINSHOU_DANG_ZHONG_SUPPORT_CONSTITUENT_AUTHORITY,
} from './general-natal-yinshou-dang-zhong-support-constituent-authority.js';
import {
  SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_RESEARCH_EVIDENCE_DEFINITION,
  SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_RESEARCH_EVIDENCE_TYPE,
  SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_RESEARCH_EVIDENCE_VERSION,
} from './shared-natal-single-fact-yinshou-support-research-evidence-adapter.js';

export const SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_STRUCTURAL_CLAIM_VERSION =
  '0.1.0-research' as const;

export const SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_CLAIM_TYPE =
  'DAY_MASTER_SINGLE_FACT_YINSHOU_SUPPORT_CONSTITUENT_EVIDENCE' as const;

export const SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_CLAIM_SCHEMA_ID =
  'day_master.single_fact_yinshou_support_constituent_evidence.schema' as const;

export const SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_METHODOLOGY_ID =
  'M-STRENGTH-FUYI-SINGLE-FACT-YINSHOU-SUPPORT-CONSTITUENT' as const;

export const SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_RULE_SET_ID =
  'saju-r9-single-fact-yinshou-support-constituent' as const;

export const SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_EVIDENCE_DEFINITION_REF =
  Object.freeze({
    id: SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_RESEARCH_EVIDENCE_DEFINITION.definitionId,
    version:
      SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_RESEARCH_EVIDENCE_DEFINITION.version,
  }) satisfies VersionedRef;

export const SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_METHODOLOGY_RESEARCH_INPUT =
  Object.freeze({
    source: 'research_evidence',
    evidenceType:
      SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_RESEARCH_EVIDENCE_TYPE,
    evidenceVersion:
      SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_RESEARCH_EVIDENCE_VERSION,
    definitionRef:
      SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_EVIDENCE_DEFINITION_REF,
    mode: 'allowed',
    rationale:
      'Consumes only exact snapshot-bound R9 evidence produced from one caller-selected resolved visible stem Ten-God fact. It does not scan/count 印綬, assign selected-position semantics, aggregate support families, or settle 黨眾/助寡/強弱/旺衰.',
  }) satisfies MethodologyResearchEvidenceInputContract;

export const SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_RULE_INPUT_REQUIREMENT =
  Object.freeze({
    key: 'singleFactYinshouSupportEvidence',
    source: 'research_evidence',
    pathOrClaimType:
      SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_RESEARCH_EVIDENCE_TYPE,
    required: true,
    ambiguityBehavior: 'requires_resolved',
    evidenceVersion:
      SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_RESEARCH_EVIDENCE_VERSION,
    researchEvidenceDefinitionRef:
      SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_EVIDENCE_DEFINITION_REF,
  }) satisfies RuleInputRequirement;

export const SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_SOURCE = Object.freeze({
  sourceId: 'SRC-GENERAL-NATAL-SINGLE-FACT-YINSHOU-SUPPORT-CONSTITUENT',
  sourceType: 'web',
  title:
    GENERAL_NATAL_YINSHOU_DANG_ZHONG_SUPPORT_CONSTITUENT_AUTHORITY.source.title,
  language: 'zh-Hant',
  url:
    GENERAL_NATAL_YINSHOU_DANG_ZHONG_SUPPORT_CONSTITUENT_AUTHORITY.source.url,
  accessedAt:
    GENERAL_NATAL_YINSHOU_DANG_ZHONG_SUPPORT_CONSTITUENT_AUTHORITY.source
      .accessedAt,
  provenanceTier: 'cross_reference',
  rights: {
    copyrightStatus: 'unknown',
    reusePolicy: 'metadata_only',
  },
  notes:
    '기존 governed single-fact 정인/편인 -> 印綬 membership과 印綬 -> support constituent bridge를 재사용한다. R9은 caller-selected visible stem fact 한 건만 소비한다.',
} as const satisfies SourceReference);

const COMMON_VALUE = Object.freeze({
  evidenceKind: 'single_fact_yinshou_support_constituent',
  semanticScope: 'selected_single_fact_positive_observation_only',
  sourceSupportCategory: '印綬',
  supportConstituentObserved: true,
  selectedPositionSemantics: 'not_authorized',
  wholeChartYinScan: 'not_authorized',
  yinshouCount: 'not_authorized',
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

export const SHARED_NATAL_SINGLE_FACT_JEONGIN_YINSHOU_SUPPORT_CLAIM_VALUE =
  Object.freeze({
    ...COMMON_VALUE,
    canonicalConstituent: '정인',
    sourceMemberLabel: '正印',
  } as const);

export const SHARED_NATAL_SINGLE_FACT_PYEONIN_YINSHOU_SUPPORT_CLAIM_VALUE =
  Object.freeze({
    ...COMMON_VALUE,
    canonicalConstituent: '편인',
    sourceMemberLabel: '偏印',
  } as const);

export const SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_CLAIM_VALUE_SCHEMA =
  Object.freeze({
    schemaId: SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_CLAIM_SCHEMA_ID,
    version: SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_STRUCTURAL_CLAIM_VERSION,
    root: {
      kind: 'object',
      required: [
        'evidenceKind',
        'semanticScope',
        'canonicalConstituent',
        'sourceMemberLabel',
        'sourceSupportCategory',
        'supportConstituentObserved',
        'selectedPositionSemantics',
        'wholeChartYinScan',
        'yinshouCount',
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
          value: 'single_fact_yinshou_support_constituent',
        },
        semanticScope: {
          kind: 'literal',
          value: 'selected_single_fact_positive_observation_only',
        },
        canonicalConstituent: {
          kind: 'string',
          enum: ['정인', '편인'],
        },
        sourceMemberLabel: {
          kind: 'string',
          enum: ['正印', '偏印'],
        },
        sourceSupportCategory: { kind: 'literal', value: '印綬' },
        supportConstituentObserved: { kind: 'literal', value: true },
        selectedPositionSemantics: {
          kind: 'literal',
          value: 'not_authorized',
        },
        wholeChartYinScan: { kind: 'literal', value: 'not_authorized' },
        yinshouCount: { kind: 'literal', value: 'not_authorized' },
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

export const SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_CLAIM_TYPE_DEFINITION =
  Object.freeze({
    claimType: SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_CLAIM_TYPE,
    version: SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_STRUCTURAL_CLAIM_VERSION,
    valueSchemaRef: {
      id: SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_CLAIM_SCHEMA_ID,
      version: SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_STRUCTURAL_CLAIM_VERSION,
    },
    scope: 'natal',
    exclusiveValue: true,
    scenarioSensitive: true,
    materialForNarrative: false,
    allowedTaxonomyTiers: ['T2'],
  } as const satisfies ClaimTypeDefinition);

export const SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_METHODOLOGY =
  Object.freeze({
    methodologyId: SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_METHODOLOGY_ID,
    version: SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_STRUCTURAL_CLAIM_VERSION,
    family: 'day_master_strength',
    name: 'Single-fact Yinshou support constituent materialization',
    description:
      'Research-only T2 materialization of one caller-selected resolved visible stem Ten-God fact through existing canonical 정인/편인 -> 印綬 membership and 印綬 support bridge. It performs no chart scan/count, positional weighting, aggregation, or final structural classification.',
    assumptions: [
      'The caller supplies exactly one visible stem Ten-God slot; R9 does not internally choose among pillars.',
      'Only the selected fact is dereferenced and reproduced from the bound snapshot.',
      'Resolved 정인 and 편인 are the only positive inputs.',
      'Other resolved Ten-Gods are bounded non-positive inputs, not universal non-印綬 verdicts.',
      'Ambiguous, unavailable, missing, or semantically invalid selected facts fail closed.',
      'No narrative, Preview, Official, public semantic, or Production authority is created.',
    ],
    requiredFactTypes: [],
    inputContract: {
      researchEvidenceInputs: [
        SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_METHODOLOGY_RESEARCH_INPUT,
      ],
    },
    sourceIds: [SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_SOURCE.sourceId],
    status: 'research',
  } as const satisfies MethodologyDefinition);

function rule(
  id: string,
  title: string,
  canonicalConstituent: '정인' | '편인',
  value:
    | typeof SHARED_NATAL_SINGLE_FACT_JEONGIN_YINSHOU_SUPPORT_CLAIM_VALUE
    | typeof SHARED_NATAL_SINGLE_FACT_PYEONIN_YINSHOU_SUPPORT_CLAIM_VALUE,
): RuleDefinition {
  return {
    ruleId: id,
    version: SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_STRUCTURAL_CLAIM_VERSION,
    ruleSetId: SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_RULE_SET_ID,
    taxonomy: {
      tier: 'T2',
      category: 'day_master_strength',
      subcategory: 'single_fact_yinshou_support_constituent',
    },
    methodologyRef: {
      id: SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_METHODOLOGY_ID,
      version: SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_STRUCTURAL_CLAIM_VERSION,
    },
    title,
    description:
      'Emits one research-only T2 marker when exact R9 evidence proves the caller-selected single visible stem Ten-God fact is a governed 印綬 support constituent. No position semantics, count, aggregation, or chart-level settlement is added.',
    inputs: [SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_RULE_INPUT_REQUIREMENT],
    condition: {
      op: 'and',
      expressions: [
        {
          op: 'eq',
          left: {
            kind: 'input',
            key: SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_RULE_INPUT_REQUIREMENT.key,
            path: 'supportConstituentObserved',
          },
          right: { kind: 'literal', value: true },
        },
        {
          op: 'eq',
          left: {
            kind: 'input',
            key: SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_RULE_INPUT_REQUIREMENT.key,
            path: 'supportEvaluation.canonicalConstituent',
          },
          right: { kind: 'literal', value: canonicalConstituent },
        },
      ],
    },
    output: {
      claimType: SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_CLAIM_TYPE,
      subject: 'day_master',
      predicate: 'single_fact_yinshou_support_constituent_observed',
      value,
      polarity: 'neutral',
      emphasis: 'moderate',
      tags: [
        'research',
        'day-master-strength',
        'yinshou',
        'support-constituent',
        'single-fact',
        'non-aggregated',
      ],
    },
    sourceRefs: [
      {
        sourceId: SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_SOURCE.sourceId,
        supportType: 'interpretive_basis',
        notes:
          '기존 governed single-fact 印綬 membership과 support bridge를 그대로 재사용한다.',
      },
    ],
    quality: {
      provenanceQuality: 'secondary_only',
      testCoverage: 'fixture_matrix',
      methodologyStability: 'contested',
      reviewerStatus: 'unreviewed',
    },
    status: 'research',
  };
}

export const SHARED_NATAL_SINGLE_FACT_JEONGIN_YINSHOU_SUPPORT_RULE =
  Object.freeze(
    rule(
      'RULE-SAJU-R9-SINGLE-FACT-JEONGIN-YINSHOU-SUPPORT-CONSTITUENT',
      'Single-fact Jeongin Yinshou support constituent observed',
      '정인',
      SHARED_NATAL_SINGLE_FACT_JEONGIN_YINSHOU_SUPPORT_CLAIM_VALUE,
    ),
  );

export const SHARED_NATAL_SINGLE_FACT_PYEONIN_YINSHOU_SUPPORT_RULE =
  Object.freeze(
    rule(
      'RULE-SAJU-R9-SINGLE-FACT-PYEONIN-YINSHOU-SUPPORT-CONSTITUENT',
      'Single-fact Pyeonin Yinshou support constituent observed',
      '편인',
      SHARED_NATAL_SINGLE_FACT_PYEONIN_YINSHOU_SUPPORT_CLAIM_VALUE,
    ),
  );

export const SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_RULES = Object.freeze([
  SHARED_NATAL_SINGLE_FACT_JEONGIN_YINSHOU_SUPPORT_RULE,
  SHARED_NATAL_SINGLE_FACT_PYEONIN_YINSHOU_SUPPORT_RULE,
] as const);

export const SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_PACK =
  Object.freeze({
    packId: 'PACK-SAJU-R9-SINGLE-FACT-YINSHOU-SUPPORT-RESEARCH',
    version: SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_STRUCTURAL_CLAIM_VERSION,
    name: 'SAJU-R9 Single-Fact Yinshou Support Research Pack',
    methodologyRefs: [
      {
        id: SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_METHODOLOGY_ID,
        version: SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_STRUCTURAL_CLAIM_VERSION,
      },
    ],
    enabledRuleSets: [SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_RULE_SET_ID],
    conflictPolicy: 'preserve_all',
    ambiguityPolicy: 'skip_requires_resolved',
    compositionPolicyRef: {
      id: 'COMPOSITION-SAJU-R9-SINGLE-FACT-YINSHOU-SUPPORT-RESEARCH',
      version: SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_STRUCTURAL_CLAIM_VERSION,
    },
    claimContractMode: 'registered_required',
    status: 'research',
  } as const satisfies InterpretationPack);

export function createSharedNatalSingleFactYinshouSupportResearchRegistry(
  createdAt = '1970-01-01T00:00:00.000Z',
) {
  return createRuleRegistrySnapshot(
    {
      rules: SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_RULES,
      methodologies: [SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_METHODOLOGY],
      sources: [SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_SOURCE],
      claimTypeDefinitions: [
        SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_CLAIM_TYPE_DEFINITION,
      ],
      claimValueSchemas: [
        SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_CLAIM_VALUE_SCHEMA,
      ],
      reviewAttestations: [],
    },
    SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_PACK,
    createdAt,
  );
}

export const SHARED_NATAL_SINGLE_FACT_YINSHOU_SUPPORT_AUTHORITY_BOUNDARY =
  Object.freeze({
    runtimeScope: 'isolated_research_pack_only' as const,
    exactR9EvidenceBindingRequired: true as const,
    callerSuppliedSingleFactBindingRequired: true as const,
    internalPillarSelectionAuthorized: false as const,
    selectedPositionSemanticWeightAuthorized: false as const,
    wholeChartYinScanAuthorized: false as const,
    wholeChartYinCountAuthorized: false as const,
    branchTenGodScanAuthorized: false as const,
    hiddenStemTenGodScanAuthorized: false as const,
    canonicalTenGodRecomputationAuthorized: false as const,
    resolvedOtherTenGodUniversalNonYinshouVerdictAuthorized: false as const,
    bijieYinshouAggregationAuthorized: false as const,
    tonggenYinshouCompositionAuthorized: false as const,
    constituentCollectionComplete: false as const,
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
