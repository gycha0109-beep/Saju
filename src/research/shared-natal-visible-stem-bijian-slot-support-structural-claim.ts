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
  SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_RESEARCH_EVIDENCE_DEFINITION,
  SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_RESEARCH_EVIDENCE_TYPE,
  SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_RESEARCH_EVIDENCE_VERSION,
} from './shared-natal-visible-stem-bijian-slot-support-research-evidence-adapter.js';

export const SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_STRUCTURAL_CLAIM_VERSION =
  '0.1.0-research' as const;

export const SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_CLAIM_TYPE =
  'DAY_MASTER_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_CONSTITUENT_EVIDENCE' as const;

export const SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_CLAIM_SCHEMA_ID =
  'day_master.visible_stem_bijian_slot_support_constituent_evidence.schema' as const;

export const SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_METHODOLOGY_ID =
  'M-STRENGTH-FUYI-VISIBLE-STEM-BIJIAN-SLOT-SUPPORT' as const;

export const SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_RULE_SET_ID =
  'saju-r21-visible-stem-bijian-slot-support' as const;

export const SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_EVIDENCE_DEFINITION_REF =
  Object.freeze({
    id:
      SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_RESEARCH_EVIDENCE_DEFINITION
        .definitionId,
    version:
      SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_RESEARCH_EVIDENCE_DEFINITION
        .version,
  }) satisfies VersionedRef;

export const SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_METHODOLOGY_RESEARCH_INPUT =
  Object.freeze({
    source: 'research_evidence',
    evidenceType:
      SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_RESEARCH_EVIDENCE_TYPE,
    evidenceVersion:
      SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_RESEARCH_EVIDENCE_VERSION,
    definitionRef:
      SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_EVIDENCE_DEFINITION_REF,
    mode: 'allowed',
    rationale:
      'Consumes only snapshot-bound R21 evidence that binds exact canonical 比肩 observations on fixed year/month/hour visible-stem slots to the already-governed 比劫 support meaning. Slot detail remains evidence-only; no count, 比肩+겁재 support union, aggregation, or downstream settlement is authorized.',
  }) satisfies MethodologyResearchEvidenceInputContract;

export const SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_RULE_INPUT_REQUIREMENT =
  Object.freeze({
    key: 'visibleStemBijianSlotSupportEvidence',
    source: 'research_evidence',
    pathOrClaimType:
      SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_RESEARCH_EVIDENCE_TYPE,
    required: true,
    ambiguityBehavior: 'requires_resolved',
    evidenceVersion:
      SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_RESEARCH_EVIDENCE_VERSION,
    researchEvidenceDefinitionRef:
      SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_EVIDENCE_DEFINITION_REF,
  }) satisfies RuleInputRequirement;

export const SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_SOURCE =
  Object.freeze({
    sourceId:
      'SRC-GENERAL-NATAL-VISIBLE-STEM-BIJIAN-SLOT-SUPPORT',
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
      'R21 reuses the already-governed visible 比肩 support source and binds that existing support meaning only to R17 exact year/month/hour 比肩 slot provenance. It adds no count or union semantics.',
  } as const satisfies SourceReference);

export const SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_CLAIM_VALUE =
  Object.freeze({
    evidenceKind: 'visible_stem_bijian_slot_support_constituent',
    semanticScope: 'fixed_visible_stem_support_presence_only',
    canonicalConstituent: '비견',
    sourceSupportCategory: '比劫',
    visibleStemBijianSupportObserved: true,
    slotDetails: 'research_evidence_only',
    r7BoundedCount: 'preserved_upstream_only',
    newBijianCount: 'not_authorized',
    gyeopjaeCount: 'not_authorized',
    visibleBijieSupportUnion: 'not_authorized',
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

export const SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_CLAIM_VALUE_SCHEMA =
  Object.freeze({
    schemaId:
      SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_CLAIM_SCHEMA_ID,
    version:
      SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_STRUCTURAL_CLAIM_VERSION,
    root: {
      kind: 'object',
      required: [
        'evidenceKind',
        'semanticScope',
        'canonicalConstituent',
        'sourceSupportCategory',
        'visibleStemBijianSupportObserved',
        'slotDetails',
        'r7BoundedCount',
        'newBijianCount',
        'gyeopjaeCount',
        'visibleBijieSupportUnion',
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
          value: 'visible_stem_bijian_slot_support_constituent',
        },
        semanticScope: {
          kind: 'literal',
          value: 'fixed_visible_stem_support_presence_only',
        },
        canonicalConstituent: { kind: 'literal', value: '비견' },
        sourceSupportCategory: { kind: 'literal', value: '比劫' },
        visibleStemBijianSupportObserved: { kind: 'literal', value: true },
        slotDetails: { kind: 'literal', value: 'research_evidence_only' },
        r7BoundedCount: { kind: 'literal', value: 'preserved_upstream_only' },
        newBijianCount: { kind: 'literal', value: 'not_authorized' },
        gyeopjaeCount: { kind: 'literal', value: 'not_authorized' },
        visibleBijieSupportUnion: { kind: 'literal', value: 'not_authorized' },
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

export const SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_CLAIM_TYPE_DEFINITION =
  Object.freeze({
    claimType:
      SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_CLAIM_TYPE,
    version:
      SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_STRUCTURAL_CLAIM_VERSION,
    valueSchemaRef: {
      id:
        SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_CLAIM_SCHEMA_ID,
      version:
        SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_STRUCTURAL_CLAIM_VERSION,
    },
    scope: 'natal',
    exclusiveValue: true,
    scenarioSensitive: true,
    materialForNarrative: false,
    allowedTaxonomyTiers: ['T2'],
  } as const satisfies ClaimTypeDefinition);

export const SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_METHODOLOGY =
  Object.freeze({
    methodologyId:
      SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_METHODOLOGY_ID,
    version:
      SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_STRUCTURAL_CLAIM_VERSION,
    family: 'day_master_strength',
    name: 'Visible-stem Bijian slot support constituent materialization',
    description:
      'Research-only T2 materialization of exact visible-stem 比肩 slots as bounded 比劫 support constituents. R17 slot provenance and existing chart-level support parity are required; no count, union, aggregation, or settlement semantics are added.',
    assumptions: [
      'R17 exact 比肩 slot coverage is resolved and its R7 bounded-count parity guard passes.',
      'Existing visible-比肩 chart-level support authority resolves consistently with whether any exact 比肩 slot exists.',
      'Each exact canonical 比肩 slot is bound only to the already-governed 比劫 support category.',
      'Resolved non-比肩 visible stems are negative only for this bounded slot-support binding.',
      'R7 count remains upstream-only and is not copied into claim value.',
      '겁재 is not consumed by this R21 binding.',
      'Branch Ten-Gods and hidden stems are not consumed.',
      'No Narrative, Preview, Official, public semantic, or Production authority is created.',
    ],
    requiredFactTypes: [],
    inputContract: {
      researchEvidenceInputs: [
        SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_METHODOLOGY_RESEARCH_INPUT,
      ],
    },
    sourceIds: [SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_SOURCE.sourceId],
    status: 'research',
  } as const satisfies MethodologyDefinition);

export const SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_RULE =
  Object.freeze({
    ruleId: 'RULE-SAJU-R21-VISIBLE-STEM-BIJIAN-SLOT-SUPPORT',
    version:
      SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_STRUCTURAL_CLAIM_VERSION,
    ruleSetId:
      SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_RULE_SET_ID,
    taxonomy: {
      tier: 'T2',
      category: 'day_master_strength',
      subcategory: 'visible_stem_bijian_slot_support',
    },
    methodologyRef: {
      id: SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_METHODOLOGY_ID,
      version:
        SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_STRUCTURAL_CLAIM_VERSION,
    },
    title: 'Visible-stem Bijian slot support constituent observed',
    description:
      'Emits one research-only T2 marker when exact R21 evidence proves at least one fixed visible-stem 比肩 slot is a bounded 比劫 support constituent. Slot details remain evidence-only and no count or union meaning is emitted.',
    inputs: [
      SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_RULE_INPUT_REQUIREMENT,
    ],
    condition: {
      op: 'eq',
      left: {
        kind: 'input',
        key:
          SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_RULE_INPUT_REQUIREMENT
            .key,
        path: 'visibleStemBijianSupportObserved',
      },
      right: { kind: 'literal', value: true },
    },
    output: {
      claimType:
        SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_CLAIM_TYPE,
      subject: 'day_master',
      predicate: 'visible_stem_bijian_slot_support_constituent_observed',
      value: SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_CLAIM_VALUE,
      polarity: 'neutral',
      emphasis: 'moderate',
      tags: [
        'research',
        'day-master-strength',
        'bijian',
        'bijie',
        'visible-stem',
        'slot-support',
        'support-constituent',
        'non-aggregated',
      ],
    },
    sourceRefs: [
      {
        sourceId:
          SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_SOURCE.sourceId,
        supportType: 'interpretive_basis' as const,
        notes:
          'R21 uses this source only for the bounded visible 比肩 -> 比劫 support relation; count, support union, and downstream settlement remain outside authority.',
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

export const SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_RULES =
  Object.freeze([
    SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_RULE,
  ] as const);

export const SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_PACK =
  Object.freeze({
    packId: 'PACK-SAJU-R21-VISIBLE-STEM-BIJIAN-SLOT-SUPPORT-RESEARCH',
    version:
      SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_STRUCTURAL_CLAIM_VERSION,
    name: 'SAJU-R21 Visible-Stem Bijian Slot Support Research Pack',
    methodologyRefs: [
      {
        id: SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_METHODOLOGY_ID,
        version:
          SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_STRUCTURAL_CLAIM_VERSION,
      },
    ],
    enabledRuleSets: [
      SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_RULE_SET_ID,
    ],
    conflictPolicy: 'preserve_all',
    ambiguityPolicy: 'skip_requires_resolved',
    compositionPolicyRef: {
      id: 'COMPOSITION-SAJU-R21-VISIBLE-STEM-BIJIAN-SLOT-SUPPORT-RESEARCH',
      version:
        SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_STRUCTURAL_CLAIM_VERSION,
    },
    claimContractMode: 'registered_required',
    status: 'research',
  } as const satisfies InterpretationPack);

export function createSharedNatalVisibleStemBijianSlotSupportResearchRegistry(
  createdAt = '1970-01-01T00:00:00.000Z',
) {
  return createRuleRegistrySnapshot(
    {
      rules: SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_RULES,
      methodologies: [
        SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_METHODOLOGY,
      ],
      sources: [SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_SOURCE],
      claimTypeDefinitions: [
        SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_CLAIM_TYPE_DEFINITION,
      ],
      claimValueSchemas: [
        SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_CLAIM_VALUE_SCHEMA,
      ],
      reviewAttestations: [],
    },
    SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_PACK,
    createdAt,
  );
}

export const SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_SUPPORT_AUTHORITY_BOUNDARY =
  Object.freeze({
    runtimeScope: 'isolated_research_pack_only' as const,
    exactR21EvidenceBindingRequired: true as const,
    fixedVisibleStemDomainOnly: true as const,
    sourceSlotIdentityPreserved: true as const,
    exactBijianOnly: true as const,
    upstreamChartSupportParityRequired: true as const,
    perSlotSupportConstituentAuthorizedResearchOnly: true as const,
    r7BoundedCountReinterpreted: false as const,
    newBijianCountAuthorized: false as const,
    gyeopjaeConsumed: false as const,
    gyeopjaeCountAuthorized: false as const,
    visibleBijieSupportUnionAuthorized: false as const,
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
