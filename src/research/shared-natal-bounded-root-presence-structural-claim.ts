import type {
  ClaimTypeDefinition,
  ClaimValueSchemaDefinition,
  InterpretationPack,
  MethodologyDefinition,
  RuleDefinition,
  SourceReference,
} from '../contracts/interpretation.js';
import { createRuleRegistrySnapshot } from '../interpretation/rule-registry.js';
import {
  GENERAL_NATAL_BOUNDED_SIZHU_FOUR_YANG_LU_ROOT_PRESENCE_SOURCE,
} from './general-natal-bounded-sizhu-four-yang-lu-root-presence-authority.js';
import {
  SHARED_NATAL_BOUNDED_ROOT_METHODOLOGY_RESEARCH_INPUT,
  SHARED_NATAL_BOUNDED_ROOT_RULE_INPUT_REQUIREMENT,
} from './shared-natal-bounded-root-research-consumer-input-contract.js';

export const SHARED_NATAL_BOUNDED_ROOT_PRESENCE_STRUCTURAL_CLAIM_VERSION =
  '0.1.0-research' as const;

export const SHARED_NATAL_BOUNDED_ROOT_PRESENCE_CLAIM_TYPE =
  'DAY_MASTER_BOUNDED_ROOT_PRESENCE_EVIDENCE' as const;

export const SHARED_NATAL_BOUNDED_ROOT_PRESENCE_CLAIM_SCHEMA_ID =
  'day_master.bounded_root_presence_evidence.schema' as const;

export const SHARED_NATAL_BOUNDED_ROOT_PRESENCE_METHODOLOGY_ID =
  'M-STRENGTH-FUYI-BOUNDED-ROOT-PRESENCE-EVIDENCE' as const;

export const SHARED_NATAL_BOUNDED_ROOT_PRESENCE_RULE_SET_ID =
  'saju-r4-bounded-root-presence-evidence' as const;

export const SHARED_NATAL_BOUNDED_ROOT_PRESENCE_SOURCE = Object.freeze({
  sourceId: 'SRC-GENERAL-NATAL-BOUNDED-ROOT-SELECTED-SOURCE',
  sourceType: 'web',
  title: GENERAL_NATAL_BOUNDED_SIZHU_FOUR_YANG_LU_ROOT_PRESENCE_SOURCE.title,
  language: 'zh-Hant',
  locator: {
    section: GENERAL_NATAL_BOUNDED_SIZHU_FOUR_YANG_LU_ROOT_PRESENCE_SOURCE.section,
  },
  url: GENERAL_NATAL_BOUNDED_SIZHU_FOUR_YANG_LU_ROOT_PRESENCE_SOURCE.url,
  accessedAt: GENERAL_NATAL_BOUNDED_SIZHU_FOUR_YANG_LU_ROOT_PRESENCE_SOURCE.accessedAt,
  provenanceTier: 'cross_reference',
  rights: {
    copyrightStatus: 'unknown',
    reusePolicy: 'metadata_only',
  },
  notes:
    'Reuses the already-governed selected transcription/commentary source behind the R2 bounded positive root-presence surface. R4 adds no new source proposition.',
} satisfies SourceReference);

export const SHARED_NATAL_BOUNDED_ROOT_PRESENCE_CLAIM_VALUE = Object.freeze({
  evidenceKind: 'bounded_positive_root_presence',
  semanticScope: 'positive_observation_only',
  rootPresenceObserved: true,
  canonicalSizhuHasRoot: 'not_determined',
  noRoot: 'not_determined',
  observationCountSemantics: 'not_authorized',
  positionWeighting: 'not_authorized',
  tonggenSupportConstituent: 'not_determined',
  dangZhong: 'not_determined',
  zhuGua: 'not_determined',
  qiangRuo: 'not_determined',
  wangShuai: 'not_determined',
  gyeokguk: 'not_determined',
  numericStrength: 'not_authorized',
  productionAuthority: false,
} as const);

export const SHARED_NATAL_BOUNDED_ROOT_PRESENCE_CLAIM_VALUE_SCHEMA =
  Object.freeze({
    schemaId: SHARED_NATAL_BOUNDED_ROOT_PRESENCE_CLAIM_SCHEMA_ID,
    version: SHARED_NATAL_BOUNDED_ROOT_PRESENCE_STRUCTURAL_CLAIM_VERSION,
    root: {
      kind: 'object',
      required: [
        'evidenceKind',
        'semanticScope',
        'rootPresenceObserved',
        'canonicalSizhuHasRoot',
        'noRoot',
        'observationCountSemantics',
        'positionWeighting',
        'tonggenSupportConstituent',
        'dangZhong',
        'zhuGua',
        'qiangRuo',
        'wangShuai',
        'gyeokguk',
        'numericStrength',
        'productionAuthority',
      ],
      properties: {
        evidenceKind: { kind: 'literal', value: 'bounded_positive_root_presence' },
        semanticScope: { kind: 'literal', value: 'positive_observation_only' },
        rootPresenceObserved: { kind: 'literal', value: true },
        canonicalSizhuHasRoot: { kind: 'literal', value: 'not_determined' },
        noRoot: { kind: 'literal', value: 'not_determined' },
        observationCountSemantics: { kind: 'literal', value: 'not_authorized' },
        positionWeighting: { kind: 'literal', value: 'not_authorized' },
        tonggenSupportConstituent: { kind: 'literal', value: 'not_determined' },
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

export const SHARED_NATAL_BOUNDED_ROOT_PRESENCE_CLAIM_TYPE_DEFINITION =
  Object.freeze({
    claimType: SHARED_NATAL_BOUNDED_ROOT_PRESENCE_CLAIM_TYPE,
    version: SHARED_NATAL_BOUNDED_ROOT_PRESENCE_STRUCTURAL_CLAIM_VERSION,
    valueSchemaRef: {
      id: SHARED_NATAL_BOUNDED_ROOT_PRESENCE_CLAIM_SCHEMA_ID,
      version: SHARED_NATAL_BOUNDED_ROOT_PRESENCE_STRUCTURAL_CLAIM_VERSION,
    },
    scope: 'natal',
    exclusiveValue: true,
    scenarioSensitive: true,
    materialForNarrative: false,
    allowedTaxonomyTiers: ['T2'],
  } as const satisfies ClaimTypeDefinition);

export const SHARED_NATAL_BOUNDED_ROOT_PRESENCE_METHODOLOGY =
  Object.freeze({
    methodologyId: SHARED_NATAL_BOUNDED_ROOT_PRESENCE_METHODOLOGY_ID,
    version: SHARED_NATAL_BOUNDED_ROOT_PRESENCE_STRUCTURAL_CLAIM_VERSION,
    family: 'day_master_strength',
    name: 'Bounded positive root-presence evidence materialization',
    description:
      'Research-only T2 materialization of the exact R2 bounded positive root-presence ResearchEvidence. It records only that governed positive root evidence exists and does not settle canonical 四柱有根, infer 無根, classify strength, establish 黨眾/助寡, or derive 格局.',
    assumptions: [
      'Only the exact R3 type/version/definition-bound research evidence input may be consumed.',
      'A positive R2 rootPresenceObserved value may be materialized only as a bounded positive observation.',
      'Absence of bounded positive evidence is not negative root evidence and emits no inverse claim.',
      'Observation count and pillar position carry no weight or scalar semantics here.',
      'Direct root-to-通根 support-constituent or root-to-黨眾/助寡 conversion is not authorized.',
      'No final 強弱/旺衰, 格局, narrative, Preview, Official, public, or Production authority is created.',
    ],
    requiredFactTypes: [],
    inputContract: {
      researchEvidenceInputs: [SHARED_NATAL_BOUNDED_ROOT_METHODOLOGY_RESEARCH_INPUT],
    },
    sourceIds: [SHARED_NATAL_BOUNDED_ROOT_PRESENCE_SOURCE.sourceId],
    status: 'research',
  } as const satisfies MethodologyDefinition);

export const SHARED_NATAL_BOUNDED_ROOT_PRESENCE_RULE =
  Object.freeze({
    ruleId: 'RULE-SAJU-R4-BOUNDED-POSITIVE-ROOT-PRESENCE',
    version: SHARED_NATAL_BOUNDED_ROOT_PRESENCE_STRUCTURAL_CLAIM_VERSION,
    ruleSetId: SHARED_NATAL_BOUNDED_ROOT_PRESENCE_RULE_SET_ID,
    taxonomy: {
      tier: 'T2',
      category: 'day_master_strength',
      subcategory: 'bounded_root_presence_observation',
    },
    methodologyRef: {
      id: SHARED_NATAL_BOUNDED_ROOT_PRESENCE_METHODOLOGY_ID,
      version: SHARED_NATAL_BOUNDED_ROOT_PRESENCE_STRUCTURAL_CLAIM_VERSION,
    },
    title: 'Bounded positive root-presence evidence observed',
    description:
      'Emits one research-only T2 evidence claim when the exact governed R2 envelope reports rootPresenceObserved=true. No inverse or stronger structural conclusion is emitted.',
    inputs: [SHARED_NATAL_BOUNDED_ROOT_RULE_INPUT_REQUIREMENT],
    condition: {
      op: 'eq',
      left: {
        kind: 'input',
        key: SHARED_NATAL_BOUNDED_ROOT_RULE_INPUT_REQUIREMENT.key,
        path: 'evaluation.rootPresenceObserved',
      },
      right: { kind: 'literal', value: true },
    },
    output: {
      claimType: SHARED_NATAL_BOUNDED_ROOT_PRESENCE_CLAIM_TYPE,
      subject: 'day_master',
      predicate: 'bounded_positive_root_presence_observed',
      value: SHARED_NATAL_BOUNDED_ROOT_PRESENCE_CLAIM_VALUE,
      polarity: 'neutral',
      emphasis: 'moderate',
      tags: [
        'research',
        'day-master-strength',
        'bounded-root',
        'positive-observation-only',
        'non-conclusive',
      ],
    },
    sourceRefs: [
      {
        sourceId: SHARED_NATAL_BOUNDED_ROOT_PRESENCE_SOURCE.sourceId,
        supportType: 'interpretive_basis',
        notes:
          'Inherited selected-source basis from the governed R2 positive root-presence surface. R4 adds only engine claim materialization.',
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

export const SHARED_NATAL_BOUNDED_ROOT_PRESENCE_PACK =
  Object.freeze({
    packId: 'PACK-SAJU-R4-BOUNDED-ROOT-PRESENCE-RESEARCH',
    version: SHARED_NATAL_BOUNDED_ROOT_PRESENCE_STRUCTURAL_CLAIM_VERSION,
    name: 'SAJU-R4 Bounded Root Presence Research Pack',
    methodologyRefs: [
      {
        id: SHARED_NATAL_BOUNDED_ROOT_PRESENCE_METHODOLOGY_ID,
        version: SHARED_NATAL_BOUNDED_ROOT_PRESENCE_STRUCTURAL_CLAIM_VERSION,
      },
    ],
    enabledRuleSets: [SHARED_NATAL_BOUNDED_ROOT_PRESENCE_RULE_SET_ID],
    conflictPolicy: 'preserve_all',
    ambiguityPolicy: 'skip_requires_resolved',
    compositionPolicyRef: {
      id: 'COMPOSITION-SAJU-R4-BOUNDED-ROOT-PRESENCE-RESEARCH',
      version: SHARED_NATAL_BOUNDED_ROOT_PRESENCE_STRUCTURAL_CLAIM_VERSION,
    },
    claimContractMode: 'registered_required',
    status: 'research',
  } as const satisfies InterpretationPack);

export function createSharedNatalBoundedRootPresenceResearchRegistry(
  createdAt = '1970-01-01T00:00:00.000Z',
) {
  return createRuleRegistrySnapshot(
    {
      rules: [SHARED_NATAL_BOUNDED_ROOT_PRESENCE_RULE],
      methodologies: [SHARED_NATAL_BOUNDED_ROOT_PRESENCE_METHODOLOGY],
      sources: [SHARED_NATAL_BOUNDED_ROOT_PRESENCE_SOURCE],
      claimTypeDefinitions: [
        SHARED_NATAL_BOUNDED_ROOT_PRESENCE_CLAIM_TYPE_DEFINITION,
      ],
      claimValueSchemas: [
        SHARED_NATAL_BOUNDED_ROOT_PRESENCE_CLAIM_VALUE_SCHEMA,
      ],
      reviewAttestations: [],
    },
    SHARED_NATAL_BOUNDED_ROOT_PRESENCE_PACK,
    createdAt,
  );
}

export const SHARED_NATAL_BOUNDED_ROOT_PRESENCE_AUTHORITY_BOUNDARY =
  Object.freeze({
    runtimeScope: 'isolated_research_pack_only' as const,
    exactR3EvidenceBindingRequired: true as const,
    positiveObservationOnly: true as const,
    negativeRootClaimAuthorized: false as const,
    canonicalSizhuHasRootSettlementAuthorized: false as const,
    noRootInferenceAuthorized: false as const,
    observationCountSemanticsAuthorized: false as const,
    positionWeightingAuthorized: false as const,
    directRootToTonggenSupportConstituentAuthorized: false as const,
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
