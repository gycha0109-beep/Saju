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
  GENERAL_NATAL_JIA_YI_JIECAI_EXACT_RELATION_SOURCE,
} from './general-natal-jia-yi-jiecai-exact-relation-authority.js';
import {
  SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_RESEARCH_EVIDENCE_DEFINITION,
  SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_RESEARCH_EVIDENCE_TYPE,
  SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_RESEARCH_EVIDENCE_VERSION,
} from './shared-natal-exact-jia-yi-bijie-support-research-evidence-adapter.js';

export const SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_STRUCTURAL_CLAIM_VERSION =
  '0.1.0-research' as const;

export const SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_CLAIM_TYPE =
  'DAY_MASTER_EXACT_JIA_YI_BIJIE_SUPPORT_CONSTITUENT_EVIDENCE' as const;

export const SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_CLAIM_SCHEMA_ID =
  'day_master.exact_jia_yi_bijie_support_constituent_evidence.schema' as const;

export const SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_METHODOLOGY_ID =
  'M-STRENGTH-FUYI-EXACT-JIA-YI-BIJIE-SUPPORT-CONSTITUENT' as const;

export const SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_RULE_SET_ID =
  'saju-r8-exact-jia-yi-bijie-support-constituent' as const;

export const SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_EVIDENCE_DEFINITION_REF =
  Object.freeze({
    id: SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_RESEARCH_EVIDENCE_DEFINITION.definitionId,
    version:
      SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_RESEARCH_EVIDENCE_DEFINITION.version,
  }) satisfies VersionedRef;

export const SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_METHODOLOGY_RESEARCH_INPUT =
  Object.freeze({
    source: 'research_evidence',
    evidenceType:
      SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_RESEARCH_EVIDENCE_TYPE,
    evidenceVersion:
      SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_RESEARCH_EVIDENCE_VERSION,
    definitionRef:
      SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_EVIDENCE_DEFINITION_REF,
    mode: 'allowed',
    rationale:
      'Consumes only exact snapshot-bound R8 evidence for one explicitly selected visible pillar slot. It does not scan the chart, generalize 劫財, alias canonical 겁재, count 劫財, aggregate 比肩+劫財, or settle 黨眾/助寡/強弱/旺衰.',
  }) satisfies MethodologyResearchEvidenceInputContract;

export const SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_RULE_INPUT_REQUIREMENT =
  Object.freeze({
    key: 'exactJiaYiBijieSupportEvidence',
    source: 'research_evidence',
    pathOrClaimType:
      SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_RESEARCH_EVIDENCE_TYPE,
    required: true,
    ambiguityBehavior: 'requires_resolved',
    evidenceVersion:
      SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_RESEARCH_EVIDENCE_VERSION,
    researchEvidenceDefinitionRef:
      SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_EVIDENCE_DEFINITION_REF,
  }) satisfies RuleInputRequirement;

export const SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_SOURCE = Object.freeze({
  sourceId: 'SRC-GENERAL-NATAL-EXACT-JIA-YI-BIJIE-SUPPORT-CONSTITUENT',
  sourceType: 'web',
  title: GENERAL_NATAL_JIA_YI_JIECAI_EXACT_RELATION_SOURCE.title,
  language: 'zh-Hant',
  locator: {
    section: GENERAL_NATAL_JIA_YI_JIECAI_EXACT_RELATION_SOURCE.section,
  },
  url: GENERAL_NATAL_JIA_YI_JIECAI_EXACT_RELATION_SOURCE.url,
  accessedAt: GENERAL_NATAL_JIA_YI_JIECAI_EXACT_RELATION_SOURCE.accessedAt,
  provenanceTier: 'cross_reference',
  rights: {
    copyrightStatus: 'unknown',
    reusePolicy: 'metadata_only',
  },
  notes:
    '기존 exact 甲逢乙為劫財 relation과 별도 승인된 exact Jia-Yi -> 比劫 support bridge를 재사용한다. R8은 caller가 명시한 visible slot 한 개만 검증한다.',
} as const satisfies SourceReference);

export const SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_CLAIM_VALUE =
  Object.freeze({
    evidenceKind: 'exact_jia_yi_bijie_support_constituent',
    semanticScope: 'selected_visible_pair_positive_observation_only',
    dayMaster: '갑',
    selectedVisibleStem: '을',
    sourceRelation: '劫財',
    sourceSupportCategory: '比劫',
    supportConstituentObserved: true,
    selectedPositionSemantics: 'not_authorized',
    wholeChartScan: 'not_authorized',
    jiecaiCount: 'not_authorized',
    bijianJiecaiAggregation: 'not_authorized',
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

export const SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_CLAIM_VALUE_SCHEMA =
  Object.freeze({
    schemaId: SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_CLAIM_SCHEMA_ID,
    version: SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_STRUCTURAL_CLAIM_VERSION,
    root: {
      kind: 'object',
      required: [
        'evidenceKind',
        'semanticScope',
        'dayMaster',
        'selectedVisibleStem',
        'sourceRelation',
        'sourceSupportCategory',
        'supportConstituentObserved',
        'selectedPositionSemantics',
        'wholeChartScan',
        'jiecaiCount',
        'bijianJiecaiAggregation',
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
          value: 'exact_jia_yi_bijie_support_constituent',
        },
        semanticScope: {
          kind: 'literal',
          value: 'selected_visible_pair_positive_observation_only',
        },
        dayMaster: { kind: 'literal', value: '갑' },
        selectedVisibleStem: { kind: 'literal', value: '을' },
        sourceRelation: { kind: 'literal', value: '劫財' },
        sourceSupportCategory: { kind: 'literal', value: '比劫' },
        supportConstituentObserved: { kind: 'literal', value: true },
        selectedPositionSemantics: {
          kind: 'literal',
          value: 'not_authorized',
        },
        wholeChartScan: { kind: 'literal', value: 'not_authorized' },
        jiecaiCount: { kind: 'literal', value: 'not_authorized' },
        bijianJiecaiAggregation: {
          kind: 'literal',
          value: 'not_authorized',
        },
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

export const SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_CLAIM_TYPE_DEFINITION =
  Object.freeze({
    claimType: SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_CLAIM_TYPE,
    version: SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_STRUCTURAL_CLAIM_VERSION,
    valueSchemaRef: {
      id: SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_CLAIM_SCHEMA_ID,
      version: SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_STRUCTURAL_CLAIM_VERSION,
    },
    scope: 'natal',
    exclusiveValue: true,
    scenarioSensitive: true,
    materialForNarrative: false,
    allowedTaxonomyTiers: ['T2'],
  } as const satisfies ClaimTypeDefinition);

export const SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_METHODOLOGY =
  Object.freeze({
    methodologyId: SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_METHODOLOGY_ID,
    version: SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_STRUCTURAL_CLAIM_VERSION,
    family: 'day_master_strength',
    name: 'Exact Jia-Yi Jiecai-to-Bijie support constituent materialization',
    description:
      'Research-only T2 materialization of one explicitly selected visible 甲/乙 pair through the existing exact 劫財 relation and exact 比劫 support bridge. It performs no chart scan, generalized 劫財 resolution, count, support aggregation, or final structural classification.',
    assumptions: [
      'The caller must explicitly select exactly one visible year/month/hour pillar slot.',
      'R8 validates only that selected visible stem against the resolved canonical day master.',
      'Only exact 甲 day master + selected visible 乙 is positive.',
      'A non-match for the selected pair is not a whole-chart no-劫財 verdict.',
      'No hidden stem, branch Ten-God, canonical 겁재 alias, generalized 劫財 ontology, count, or 比肩+劫財 aggregation is created.',
      'No narrative, Preview, Official, public semantic, or Production authority is created.',
    ],
    requiredFactTypes: [],
    inputContract: {
      researchEvidenceInputs: [
        SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_METHODOLOGY_RESEARCH_INPUT,
      ],
    },
    sourceIds: [SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_SOURCE.sourceId],
    status: 'research',
  } as const satisfies MethodologyDefinition);

export const SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_RULE =
  Object.freeze({
    ruleId: 'RULE-SAJU-R8-EXACT-JIA-YI-BIJIE-SUPPORT-CONSTITUENT',
    version: SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_STRUCTURAL_CLAIM_VERSION,
    ruleSetId: SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_RULE_SET_ID,
    taxonomy: {
      tier: 'T2',
      category: 'day_master_strength',
      subcategory: 'exact_jia_yi_bijie_support_constituent',
    },
    methodologyRef: {
      id: SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_METHODOLOGY_ID,
      version: SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_STRUCTURAL_CLAIM_VERSION,
    },
    title: 'Exact Jia-Yi Jiecai-to-Bijie support constituent observed',
    description:
      'Emits one research-only T2 marker when exact R8 evidence for the explicitly selected visible slot proves 甲 day master + visible 乙 -> 劫財 -> 比劫 support constituent. The selected position itself carries no semantic weight.',
    inputs: [SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_RULE_INPUT_REQUIREMENT],
    condition: {
      op: 'eq',
      left: {
        kind: 'input',
        key: SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_RULE_INPUT_REQUIREMENT.key,
        path: 'supportConstituentObserved',
      },
      right: { kind: 'literal', value: true },
    },
    output: {
      claimType: SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_CLAIM_TYPE,
      subject: 'day_master',
      predicate: 'exact_jia_yi_bijie_support_constituent_observed',
      value: SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_CLAIM_VALUE,
      polarity: 'neutral',
      emphasis: 'moderate',
      tags: [
        'research',
        'day-master-strength',
        'exact-jia-yi',
        'jiecai',
        'bijie-support-constituent',
        'explicit-selected-slot',
        'non-aggregated',
      ],
    },
    sourceRefs: [
      {
        sourceId: SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_SOURCE.sourceId,
        supportType: 'interpretive_basis',
        notes:
          '기존 exact 甲/乙 relation과 support bridge를 재사용한다. selected slot 이외의 visible stems를 탐색하지 않는다.',
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

export const SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_PACK =
  Object.freeze({
    packId: 'PACK-SAJU-R8-EXACT-JIA-YI-BIJIE-SUPPORT-RESEARCH',
    version: SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_STRUCTURAL_CLAIM_VERSION,
    name: 'SAJU-R8 Exact Jia-Yi Bijie Support Research Pack',
    methodologyRefs: [
      {
        id: SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_METHODOLOGY_ID,
        version: SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_STRUCTURAL_CLAIM_VERSION,
      },
    ],
    enabledRuleSets: [SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_RULE_SET_ID],
    conflictPolicy: 'preserve_all',
    ambiguityPolicy: 'skip_requires_resolved',
    compositionPolicyRef: {
      id: 'COMPOSITION-SAJU-R8-EXACT-JIA-YI-BIJIE-SUPPORT-RESEARCH',
      version: SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_STRUCTURAL_CLAIM_VERSION,
    },
    claimContractMode: 'registered_required',
    status: 'research',
  } as const satisfies InterpretationPack);

export function createSharedNatalExactJiaYiBijieSupportResearchRegistry(
  createdAt = '1970-01-01T00:00:00.000Z',
) {
  return createRuleRegistrySnapshot(
    {
      rules: [SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_RULE],
      methodologies: [SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_METHODOLOGY],
      sources: [SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_SOURCE],
      claimTypeDefinitions: [
        SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_CLAIM_TYPE_DEFINITION,
      ],
      claimValueSchemas: [
        SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_CLAIM_VALUE_SCHEMA,
      ],
      reviewAttestations: [],
    },
    SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_PACK,
    createdAt,
  );
}

export const SHARED_NATAL_EXACT_JIA_YI_BIJIE_SUPPORT_AUTHORITY_BOUNDARY =
  Object.freeze({
    runtimeScope: 'isolated_research_pack_only' as const,
    exactR8EvidenceBindingRequired: true as const,
    explicitSingleVisibleSlotRequired: true as const,
    wholeChartJiecaiScanAuthorized: false as const,
    selectedPositionSemanticWeightAuthorized: false as const,
    exactJiaYiOnly: true as const,
    generalizedJiecaiResolverAuthorized: false as const,
    sameElementOppositePolarityGeneralizationAuthorized: false as const,
    yiDayMasterJiaSymmetryAuthorized: false as const,
    canonicalGyeopjaeAliasAuthorized: false as const,
    globalJiecaiBijieOntologyAuthorized: false as const,
    hiddenStemConsumed: false as const,
    branchTenGodConsumed: false as const,
    jiecaiCountAuthorized: false as const,
    bijianJiecaiAggregationAuthorized: false as const,
    supportAggregationAuthorized: false as const,
    constituentCollectionComplete: false as const,
    selectedPairNonMatchMeansGlobalNoJiecai: false as const,
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
