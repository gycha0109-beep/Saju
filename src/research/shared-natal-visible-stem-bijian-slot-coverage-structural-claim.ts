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
  GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_SOURCE,
} from './general-natal-bijian-bounded-left-operand-authority.js';
import {
  SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_RESEARCH_EVIDENCE_DEFINITION,
  SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_RESEARCH_EVIDENCE_TYPE,
  SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_RESEARCH_EVIDENCE_VERSION,
} from './shared-natal-visible-stem-bijian-slot-coverage-research-evidence-adapter.js';

export const SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_STRUCTURAL_CLAIM_VERSION =
  '0.1.0-research' as const;

export const SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_CLAIM_TYPE =
  'DAY_MASTER_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_EVIDENCE' as const;

export const SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_CLAIM_SCHEMA_ID =
  'day_master.visible_stem_bijian_slot_coverage_evidence.schema' as const;

export const SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_METHODOLOGY_ID =
  'M-STRENGTH-FUYI-VISIBLE-STEM-BIJIAN-SLOT-COVERAGE' as const;

export const SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_RULE_SET_ID =
  'saju-r17-visible-stem-bijian-slot-coverage' as const;

export const SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_EVIDENCE_DEFINITION_REF =
  Object.freeze({
    id:
      SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_RESEARCH_EVIDENCE_DEFINITION
        .definitionId,
    version:
      SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_RESEARCH_EVIDENCE_DEFINITION
        .version,
  }) satisfies VersionedRef;

export const SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_METHODOLOGY_RESEARCH_INPUT =
  Object.freeze({
    source: 'research_evidence',
    evidenceType:
      SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_RESEARCH_EVIDENCE_TYPE,
    evidenceVersion:
      SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_RESEARCH_EVIDENCE_VERSION,
    definitionRef:
      SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_EVIDENCE_DEFINITION_REF,
    mode: 'allowed',
    rationale:
      'Consumes only exact snapshot-bound R17 evidence over canonical year/month/hour visible stems. The evidence preserves exact 比肩 slot identity and verifies parity with the already-authorized R7 bounded count without creating new count semantics, per-slot support meaning, 比肩+겁재 union, or downstream settlement.',
  }) satisfies MethodologyResearchEvidenceInputContract;

export const SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_RULE_INPUT_REQUIREMENT =
  Object.freeze({
    key: 'visibleStemBijianSlotCoverageEvidence',
    source: 'research_evidence',
    pathOrClaimType:
      SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_RESEARCH_EVIDENCE_TYPE,
    required: true,
    ambiguityBehavior: 'requires_resolved',
    evidenceVersion:
      SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_RESEARCH_EVIDENCE_VERSION,
    researchEvidenceDefinitionRef:
      SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_EVIDENCE_DEFINITION_REF,
  }) satisfies RuleInputRequirement;

export const SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_SOURCE =
  Object.freeze({
    sourceId:
      'SRC-GENERAL-NATAL-VISIBLE-STEM-BIJIAN-SLOT-COVERAGE',
    sourceType: 'web',
    title: GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_SOURCE.title,
    language: 'zh-Hant',
    url: GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_SOURCE.url,
    accessedAt: GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_SOURCE.accessedAt,
    provenanceTier: 'cross_reference',
    rights: {
      copyrightStatus: 'unknown',
      reusePolicy: 'metadata_only',
    },
    notes:
      'R17은 R7에서 이미 canonical visible stem의 exact 比肩를 관측하는 범위를 그대로 두고, year/month/hour 슬롯 provenance만 별도 materialize한다. 기존 bounded count와 support semantics는 변경하지 않는다.',
  } as const satisfies SourceReference);

export const SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_CLAIM_VALUE =
  Object.freeze({
    evidenceKind: 'visible_stem_bijian_slot_coverage',
    semanticScope: 'fixed_visible_stem_positive_presence_only',
    canonicalConstituent: '비견',
    visibleStemBijianObserved: true,
    slotDetails: 'research_evidence_only',
    r7BoundedCount: 'preserved_upstream_only',
    newBijianCountSemantics: 'not_authorized',
    perSlotSupportConstituent: 'not_authorized',
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

export const SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_CLAIM_VALUE_SCHEMA =
  Object.freeze({
    schemaId:
      SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_CLAIM_SCHEMA_ID,
    version:
      SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_STRUCTURAL_CLAIM_VERSION,
    root: {
      kind: 'object',
      required: [
        'evidenceKind',
        'semanticScope',
        'canonicalConstituent',
        'visibleStemBijianObserved',
        'slotDetails',
        'r7BoundedCount',
        'newBijianCountSemantics',
        'perSlotSupportConstituent',
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
          value: 'visible_stem_bijian_slot_coverage',
        },
        semanticScope: {
          kind: 'literal',
          value: 'fixed_visible_stem_positive_presence_only',
        },
        canonicalConstituent: { kind: 'literal', value: '비견' },
        visibleStemBijianObserved: { kind: 'literal', value: true },
        slotDetails: { kind: 'literal', value: 'research_evidence_only' },
        r7BoundedCount: {
          kind: 'literal',
          value: 'preserved_upstream_only',
        },
        newBijianCountSemantics: {
          kind: 'literal',
          value: 'not_authorized',
        },
        perSlotSupportConstituent: {
          kind: 'literal',
          value: 'not_authorized',
        },
        bijianGyeopjaeUnion: {
          kind: 'literal',
          value: 'not_authorized',
        },
        unifiedBijieCount: {
          kind: 'literal',
          value: 'not_authorized',
        },
        completeBijieCollection: { kind: 'literal', value: false },
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
        narrativeMateriality: { kind: 'literal', value: false },
        productionAuthority: { kind: 'literal', value: false },
      },
      additionalProperties: false,
    },
  } as const satisfies ClaimValueSchemaDefinition);

export const SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_CLAIM_TYPE_DEFINITION =
  Object.freeze({
    claimType:
      SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_CLAIM_TYPE,
    version:
      SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_STRUCTURAL_CLAIM_VERSION,
    valueSchemaRef: {
      id:
        SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_CLAIM_SCHEMA_ID,
      version:
        SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_STRUCTURAL_CLAIM_VERSION,
    },
    scope: 'natal',
    exclusiveValue: true,
    scenarioSensitive: true,
    materialForNarrative: false,
    allowedTaxonomyTiers: ['T2'],
  } as const satisfies ClaimTypeDefinition);

export const SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_METHODOLOGY =
  Object.freeze({
    methodologyId:
      SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_METHODOLOGY_ID,
    version:
      SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_STRUCTURAL_CLAIM_VERSION,
    family: 'day_master_strength',
    name: 'Visible-stem Bijian slot coverage materialization',
    description:
      'Research-only T2 materialization of exact canonical 比肩 presence across fixed year/month/hour visible-stem slots. It preserves slot detail in ResearchEvidence and uses R7 bounded count only as parity validation, without adding count or support semantics.',
    assumptions: [
      'The canonical Ten-God chart and every visible stem fact are resolved.',
      'The day stem remains the canonical self marker and is excluded from the coverage slots.',
      'Exact canonical 비견 is the only positive slot observation.',
      'Resolved non-비견 slots are bounded outside-scope observations, not universal non-比劫 verdicts.',
      'R7 bounded count remains the only authorized visible 比肩 count surface.',
      'One, two, or three positive slots still produce only one presence claim.',
      'Branch Ten-Gods and hidden stems are not consumed.',
      'No Narrative, Preview, Official, public semantic, or Production authority is created.',
    ],
    requiredFactTypes: [],
    inputContract: {
      researchEvidenceInputs: [
        SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_METHODOLOGY_RESEARCH_INPUT,
      ],
    },
    sourceIds: [
      SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_SOURCE.sourceId,
    ],
    status: 'research',
  } as const satisfies MethodologyDefinition);

export const SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_RULE =
  Object.freeze({
    ruleId:
      'RULE-SAJU-R17-VISIBLE-STEM-BIJIAN-SLOT-COVERAGE',
    version:
      SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_STRUCTURAL_CLAIM_VERSION,
    ruleSetId:
      SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_RULE_SET_ID,
    taxonomy: {
      tier: 'T2',
      category: 'day_master_strength',
      subcategory: 'visible_stem_bijian_slot_coverage',
    },
    methodologyRef: {
      id:
        SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_METHODOLOGY_ID,
      version:
        SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_STRUCTURAL_CLAIM_VERSION,
    },
    title: 'Visible-stem Bijian slot coverage observed',
    description:
      'Emits one research-only T2 presence marker when exact R17 evidence proves at least one canonical year/month/hour visible stem is 比肩. Slot detail stays in ResearchEvidence, while count and support meanings remain governed by pre-existing R7 authorities.',
    inputs: [
      SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_RULE_INPUT_REQUIREMENT,
    ],
    condition: {
      op: 'eq',
      left: {
        kind: 'input',
        key:
          SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_RULE_INPUT_REQUIREMENT
            .key,
        path: 'visibleStemBijianObserved',
      },
      right: { kind: 'literal', value: true },
    },
    output: {
      claimType:
        SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_CLAIM_TYPE,
      subject: 'day_master',
      predicate: 'visible_stem_bijian_slot_coverage_observed',
      value:
        SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_CLAIM_VALUE,
      polarity: 'neutral',
      emphasis: 'moderate',
      tags: [
        'research',
        'day-master-strength',
        'bijian',
        'visible-stem',
        'slot-coverage',
        'presence-only',
        'non-aggregated',
      ],
    },
    sourceRefs: [
      {
        sourceId:
          SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_SOURCE.sourceId,
        supportType: 'interpretive_basis',
        notes:
          'R17은 R7 visible 比肩 canonical input scope를 유지하면서 슬롯 provenance만 별도 materialize한다.',
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

export const SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_RULES =
  Object.freeze([
    SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_RULE,
  ] as const);

export const SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_PACK =
  Object.freeze({
    packId:
      'PACK-SAJU-R17-VISIBLE-STEM-BIJIAN-SLOT-COVERAGE-RESEARCH',
    version:
      SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_STRUCTURAL_CLAIM_VERSION,
    name: 'SAJU-R17 Visible-Stem Bijian Slot Coverage Research Pack',
    methodologyRefs: [
      {
        id:
          SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_METHODOLOGY_ID,
        version:
          SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_STRUCTURAL_CLAIM_VERSION,
      },
    ],
    enabledRuleSets: [
      SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_RULE_SET_ID,
    ],
    conflictPolicy: 'preserve_all',
    ambiguityPolicy: 'skip_requires_resolved',
    compositionPolicyRef: {
      id:
        'COMPOSITION-SAJU-R17-VISIBLE-STEM-BIJIAN-SLOT-COVERAGE-RESEARCH',
      version:
        SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_STRUCTURAL_CLAIM_VERSION,
    },
    claimContractMode: 'registered_required',
    status: 'research',
  } as const satisfies InterpretationPack);

export function createSharedNatalVisibleStemBijianSlotCoverageResearchRegistry(
  createdAt = '1970-01-01T00:00:00.000Z',
) {
  return createRuleRegistrySnapshot(
    {
      rules: SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_RULES,
      methodologies: [
        SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_METHODOLOGY,
      ],
      sources: [SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_SOURCE],
      claimTypeDefinitions: [
        SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_CLAIM_TYPE_DEFINITION,
      ],
      claimValueSchemas: [
        SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_CLAIM_VALUE_SCHEMA,
      ],
      reviewAttestations: [],
    },
    SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_PACK,
    createdAt,
  );
}

export const SHARED_NATAL_VISIBLE_STEM_BIJIAN_SLOT_COVERAGE_AUTHORITY_BOUNDARY =
  Object.freeze({
    runtimeScope: 'isolated_research_pack_only' as const,
    exactR17EvidenceBindingRequired: true as const,
    fixedVisibleStemCoverageAuthorizedResearchOnly: true as const,
    sourceSlotIdentityPreserved: true as const,
    daySelfMarkerRequired: true as const,
    visibleStemBijianPresenceAuthorized: true as const,
    r7BoundedCountParityRequired: true as const,
    r7BoundedCountReinterpreted: false as const,
    newBijianCountSemanticsAuthorized: false as const,
    perSlotSupportConstituentAuthorized: false as const,
    resolvedOtherTenGodUniversalNonBijieVerdictAuthorized: false as const,
    bijianGyeopjaeUnionAuthorized: false as const,
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
