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
  SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_RESEARCH_EVIDENCE_DEFINITION,
  SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_RESEARCH_EVIDENCE_TYPE,
  SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_RESEARCH_EVIDENCE_VERSION,
} from './shared-natal-single-fact-gyeopjae-bijie-support-research-evidence-adapter.js';

export const SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_STRUCTURAL_CLAIM_VERSION =
  '0.1.0-research' as const;

export const SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_CLAIM_TYPE =
  'DAY_MASTER_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_CONSTITUENT_EVIDENCE' as const;

export const SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_CLAIM_SCHEMA_ID =
  'day_master.single_fact_gyeopjae_bijie_support_constituent_evidence.schema' as const;

export const SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_METHODOLOGY_ID =
  'M-STRENGTH-FUYI-SINGLE-FACT-GYEOPJAE-BIJIE-SUPPORT-CONSTITUENT' as const;

export const SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_RULE_SET_ID =
  'saju-r12-single-fact-gyeopjae-bijie-support-constituent' as const;

export const SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_EVIDENCE_DEFINITION_REF =
  Object.freeze({
    id:
      SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_RESEARCH_EVIDENCE_DEFINITION
        .definitionId,
    version:
      SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_RESEARCH_EVIDENCE_DEFINITION
        .version,
  }) satisfies VersionedRef;

export const SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_METHODOLOGY_RESEARCH_INPUT =
  Object.freeze({
    source: 'research_evidence',
    evidenceType:
      SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_RESEARCH_EVIDENCE_TYPE,
    evidenceVersion:
      SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_RESEARCH_EVIDENCE_VERSION,
    definitionRef:
      SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_EVIDENCE_DEFINITION_REF,
    mode: 'allowed',
    rationale:
      'Consumes only exact snapshot-bound R12 evidence produced from one caller-supplied canonical Ten-God fact whose exact source fact ref has been structurally verified against the snapshot. It does not select a pillar, scan/count 劫財, aggregate 比肩+劫財, complete 比劫 collection, or settle 黨眾/助寡/強弱/旺衰.',
  }) satisfies MethodologyResearchEvidenceInputContract;

export const SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_RULE_INPUT_REQUIREMENT =
  Object.freeze({
    key: 'singleFactGyeopjaeBijieSupportEvidence',
    source: 'research_evidence',
    pathOrClaimType:
      SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_RESEARCH_EVIDENCE_TYPE,
    required: true,
    ambiguityBehavior: 'requires_resolved',
    evidenceVersion:
      SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_RESEARCH_EVIDENCE_VERSION,
    researchEvidenceDefinitionRef:
      SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_EVIDENCE_DEFINITION_REF,
  }) satisfies RuleInputRequirement;

export const SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_SOURCE =
  Object.freeze({
    sourceId:
      'SRC-GENERAL-NATAL-SINGLE-FACT-GYEOPJAE-BIJIE-SUPPORT-CONSTITUENT',
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
      'R11의 governed canonical 겁재 -> 劫財 -> 比劫 membership과 比劫 support constituent bridge를 재사용한다. R12는 caller-selected visible stem fact 한 건만 소비한다.',
  } as const satisfies SourceReference);

export const SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_CLAIM_VALUE =
  Object.freeze({
    evidenceKind: 'single_fact_gyeopjae_bijie_support_constituent',
    semanticScope: 'selected_single_fact_positive_observation_only',
    canonicalConstituent: '겁재',
    sourceMemberLabel: '劫財',
    sourceSupportCategory: '比劫',
    supportConstituentObserved: true,
    selectedPositionSemantics: 'not_authorized',
    wholeChartJiecaiScan: 'not_authorized',
    jiecaiCount: 'not_authorized',
    bijianJiecaiAggregation: 'not_authorized',
    completeBijieCollection: false,
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

export const SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_CLAIM_VALUE_SCHEMA =
  Object.freeze({
    schemaId:
      SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_CLAIM_SCHEMA_ID,
    version:
      SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_STRUCTURAL_CLAIM_VERSION,
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
        'wholeChartJiecaiScan',
        'jiecaiCount',
        'bijianJiecaiAggregation',
        'completeBijieCollection',
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
          value: 'single_fact_gyeopjae_bijie_support_constituent',
        },
        semanticScope: {
          kind: 'literal',
          value: 'selected_single_fact_positive_observation_only',
        },
        canonicalConstituent: { kind: 'literal', value: '겁재' },
        sourceMemberLabel: { kind: 'literal', value: '劫財' },
        sourceSupportCategory: { kind: 'literal', value: '比劫' },
        supportConstituentObserved: { kind: 'literal', value: true },
        selectedPositionSemantics: {
          kind: 'literal',
          value: 'not_authorized',
        },
        wholeChartJiecaiScan: {
          kind: 'literal',
          value: 'not_authorized',
        },
        jiecaiCount: { kind: 'literal', value: 'not_authorized' },
        bijianJiecaiAggregation: {
          kind: 'literal',
          value: 'not_authorized',
        },
        completeBijieCollection: { kind: 'literal', value: false },
        constituentCollectionComplete: { kind: 'literal', value: false },
        supportAggregation: {
          kind: 'literal',
          value: 'not_authorized',
        },
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

export const SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_CLAIM_TYPE_DEFINITION =
  Object.freeze({
    claimType:
      SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_CLAIM_TYPE,
    version:
      SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_STRUCTURAL_CLAIM_VERSION,
    valueSchemaRef: {
      id: SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_CLAIM_SCHEMA_ID,
      version:
        SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_STRUCTURAL_CLAIM_VERSION,
    },
    scope: 'natal',
    exclusiveValue: true,
    scenarioSensitive: true,
    materialForNarrative: false,
    allowedTaxonomyTiers: ['T2'],
  } as const satisfies ClaimTypeDefinition);

export const SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_METHODOLOGY =
  Object.freeze({
    methodologyId:
      SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_METHODOLOGY_ID,
    version:
      SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_STRUCTURAL_CLAIM_VERSION,
    family: 'day_master_strength',
    name: 'Single-fact Gyeopjae Bijie support constituent materialization',
    description:
      'Research-only T2 materialization of one caller-selected resolved visible stem canonical 겁재 fact through R11 canonical 겁재 -> 劫財 -> 比劫 membership and 比劫 support bridge. It performs no chart scan/count, positional weighting, aggregation, or final structural classification.',
    assumptions: [
      'The caller supplies exactly one visible stem Ten-God slot; R12 does not internally choose among pillars.',
      'Only the selected fact is dereferenced and reproduced from the bound snapshot.',
      'Resolved 겁재 is the only positive input.',
      'Other resolved Ten-Gods are bounded non-positive inputs, not universal non-比劫 verdicts.',
      'Ambiguous, unavailable, missing, or semantically invalid selected facts fail closed.',
      'No narrative, Preview, Official, public semantic, or Production authority is created.',
    ],
    requiredFactTypes: [],
    inputContract: {
      researchEvidenceInputs: [
        SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_METHODOLOGY_RESEARCH_INPUT,
      ],
    },
    sourceIds: [
      SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_SOURCE.sourceId,
    ],
    status: 'research',
  } as const satisfies MethodologyDefinition);

export const SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_RULE =
  Object.freeze({
    ruleId:
      'RULE-SAJU-R12-SINGLE-FACT-GYEOPJAE-BIJIE-SUPPORT-CONSTITUENT',
    version:
      SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_STRUCTURAL_CLAIM_VERSION,
    ruleSetId:
      SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_RULE_SET_ID,
    taxonomy: {
      tier: 'T2',
      category: 'day_master_strength',
      subcategory: 'single_fact_gyeopjae_bijie_support_constituent',
    },
    methodologyRef: {
      id: SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_METHODOLOGY_ID,
      version:
        SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_STRUCTURAL_CLAIM_VERSION,
    },
    title: 'Single-fact Gyeopjae Bijie support constituent observed',
    description:
      'Emits one research-only T2 marker when exact R12 evidence proves the caller-selected single visible stem canonical 겁재 fact is a governed 比劫 support constituent. No position semantics, count, aggregation, or chart-level settlement is added.',
    inputs: [
      SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_RULE_INPUT_REQUIREMENT,
    ],
    condition: {
      op: 'and',
      expressions: [
        {
          op: 'eq',
          left: {
            kind: 'input',
            key:
              SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_RULE_INPUT_REQUIREMENT
                .key,
            path: 'supportConstituentObserved',
          },
          right: { kind: 'literal', value: true },
        },
        {
          op: 'eq',
          left: {
            kind: 'input',
            key:
              SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_RULE_INPUT_REQUIREMENT
                .key,
            path: 'supportEvaluation.canonicalConstituent',
          },
          right: { kind: 'literal', value: '겁재' },
        },
      ],
    },
    output: {
      claimType:
        SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_CLAIM_TYPE,
      subject: 'day_master',
      predicate: 'single_fact_gyeopjae_bijie_support_constituent_observed',
      value: SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_CLAIM_VALUE,
      polarity: 'neutral',
      emphasis: 'moderate',
      tags: [
        'research',
        'day-master-strength',
        'gyeopjae',
        'bijie',
        'support-constituent',
        'single-fact',
        'non-aggregated',
      ],
    },
    sourceRefs: [
      {
        sourceId:
          SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_SOURCE.sourceId,
        supportType: 'interpretive_basis',
        notes:
          'R11의 governed single-fact 겁재 -> 比劫 membership과 support bridge를 그대로 재사용한다.',
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

export const SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_RULES =
  Object.freeze([
    SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_RULE,
  ] as const);

export const SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_PACK =
  Object.freeze({
    packId:
      'PACK-SAJU-R12-SINGLE-FACT-GYEOPJAE-BIJIE-SUPPORT-RESEARCH',
    version:
      SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_STRUCTURAL_CLAIM_VERSION,
    name: 'SAJU-R12 Single-Fact Gyeopjae Bijie Support Research Pack',
    methodologyRefs: [
      {
        id: SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_METHODOLOGY_ID,
        version:
          SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_STRUCTURAL_CLAIM_VERSION,
      },
    ],
    enabledRuleSets: [
      SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_RULE_SET_ID,
    ],
    conflictPolicy: 'preserve_all',
    ambiguityPolicy: 'skip_requires_resolved',
    compositionPolicyRef: {
      id: 'COMPOSITION-SAJU-R12-SINGLE-FACT-GYEOPJAE-BIJIE-SUPPORT-RESEARCH',
      version:
        SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_STRUCTURAL_CLAIM_VERSION,
    },
    claimContractMode: 'registered_required',
    status: 'research',
  } as const satisfies InterpretationPack);

export function createSharedNatalSingleFactGyeopjaeBijieSupportResearchRegistry(
  createdAt = '1970-01-01T00:00:00.000Z',
) {
  return createRuleRegistrySnapshot(
    {
      rules: SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_RULES,
      methodologies: [
        SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_METHODOLOGY,
      ],
      sources: [
        SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_SOURCE,
      ],
      claimTypeDefinitions: [
        SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_CLAIM_TYPE_DEFINITION,
      ],
      claimValueSchemas: [
        SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_CLAIM_VALUE_SCHEMA,
      ],
      reviewAttestations: [],
    },
    SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_PACK,
    createdAt,
  );
}

export const SHARED_NATAL_SINGLE_FACT_GYEOPJAE_BIJIE_SUPPORT_AUTHORITY_BOUNDARY =
  Object.freeze({
    runtimeScope: 'isolated_research_pack_only' as const,
    exactR12EvidenceBindingRequired: true as const,
    callerSuppliedSingleFactBindingRequired: true as const,
    callerSuppliedSourceFactRefRequired: true as const,
    internalPillarSelectionAuthorized: false as const,
    sourceFactRefSemanticWeightAuthorized: false as const,
    wholeChartJiecaiScanAuthorized: false as const,
    wholeChartJiecaiCountAuthorized: false as const,
    branchTenGodScanAuthorized: false as const,
    hiddenStemTenGodScanAuthorized: false as const,
    canonicalTenGodRecomputationAuthorized: false as const,
    resolvedOtherTenGodUniversalNonBijieVerdictAuthorized: false as const,
    bijianJiecaiAggregationAuthorized: false as const,
    completeBijieCollectionAuthorized: false as const,
    bijieYinshouAggregationAuthorized: false as const,
    tonggenSupportCompositionAuthorized: false as const,
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
