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
  GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_SOURCE,
} from './general-natal-muku-yuqi-bounded-tonggen-authority.js';
import {
  GENERAL_NATAL_WANG_CHANGSHENG_LU_BOUNDED_TONGGEN_SOURCE,
} from './general-natal-wang-changsheng-lu-bounded-tonggen-authority.js';
import {
  SHARED_NATAL_BOUNDED_TONGGEN_RESEARCH_EVIDENCE_DEFINITION,
  SHARED_NATAL_BOUNDED_TONGGEN_RESEARCH_EVIDENCE_TYPE,
  SHARED_NATAL_BOUNDED_TONGGEN_RESEARCH_EVIDENCE_VERSION,
} from './shared-natal-bounded-tonggen-research-evidence-adapter.js';

export const SHARED_NATAL_BOUNDED_TONGGEN_STRUCTURAL_CLAIM_VERSION =
  '0.1.0-research' as const;

export const SHARED_NATAL_BOUNDED_TONGGEN_CLAIM_TYPE =
  'DAY_MASTER_BOUNDED_TONGGEN_EVIDENCE' as const;

export const SHARED_NATAL_BOUNDED_TONGGEN_CLAIM_SCHEMA_ID =
  'day_master.bounded_tonggen_evidence.schema' as const;

export const SHARED_NATAL_BOUNDED_TONGGEN_METHODOLOGY_ID =
  'M-STRENGTH-FUYI-BOUNDED-TONGGEN-EVIDENCE' as const;

export const SHARED_NATAL_BOUNDED_TONGGEN_RULE_SET_ID =
  'saju-r5-bounded-tonggen-evidence' as const;

export const SHARED_NATAL_BOUNDED_TONGGEN_EVIDENCE_DEFINITION_REF =
  Object.freeze({
    id: SHARED_NATAL_BOUNDED_TONGGEN_RESEARCH_EVIDENCE_DEFINITION.definitionId,
    version: SHARED_NATAL_BOUNDED_TONGGEN_RESEARCH_EVIDENCE_DEFINITION.version,
  }) satisfies VersionedRef;

export const SHARED_NATAL_BOUNDED_TONGGEN_METHODOLOGY_RESEARCH_INPUT =
  Object.freeze({
    source: 'research_evidence',
    evidenceType: SHARED_NATAL_BOUNDED_TONGGEN_RESEARCH_EVIDENCE_TYPE,
    evidenceVersion: SHARED_NATAL_BOUNDED_TONGGEN_RESEARCH_EVIDENCE_VERSION,
    definitionRef: SHARED_NATAL_BOUNDED_TONGGEN_EVIDENCE_DEFINITION_REF,
    mode: 'allowed',
    rationale:
      'Consumes only the exact snapshot-bound R5 bounded Tonggen evidence. It does not infer global 不通根 from absence, assign Tonggen count/position weight, settle support constituents or 黨眾/助寡, or classify 強弱/旺衰/格局.',
  }) satisfies MethodologyResearchEvidenceInputContract;

export const SHARED_NATAL_BOUNDED_TONGGEN_RULE_INPUT_REQUIREMENT =
  Object.freeze({
    key: 'boundedTonggenEvidence',
    source: 'research_evidence',
    pathOrClaimType: SHARED_NATAL_BOUNDED_TONGGEN_RESEARCH_EVIDENCE_TYPE,
    required: true,
    ambiguityBehavior: 'requires_resolved',
    evidenceVersion: SHARED_NATAL_BOUNDED_TONGGEN_RESEARCH_EVIDENCE_VERSION,
    researchEvidenceDefinitionRef:
      SHARED_NATAL_BOUNDED_TONGGEN_EVIDENCE_DEFINITION_REF,
  }) satisfies RuleInputRequirement;

export const SHARED_NATAL_BOUNDED_TONGGEN_SOURCES = Object.freeze([
  {
    sourceId: 'SRC-GENERAL-NATAL-BOUNDED-TONGGEN-MUKU-YUQI',
    sourceType: 'web',
    title: GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_SOURCE.title,
    language: 'zh-Hant',
    locator: {
      section: GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_SOURCE.section,
    },
    url: GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_SOURCE.url,
    accessedAt: GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_SOURCE.accessedAt,
    provenanceTier: 'cross_reference',
    rights: {
      copyrightStatus: 'unknown',
      reusePolicy: 'metadata_only',
    },
    notes:
      'Existing governed non-Earth 墓庫/餘氣 to bounded 通根 source boundary. R5 introduces no new proposition.',
  },
  {
    sourceId: 'SRC-GENERAL-NATAL-BOUNDED-TONGGEN-WANG-CHANGSHENG-LU',
    sourceType: 'web',
    title: GENERAL_NATAL_WANG_CHANGSHENG_LU_BOUNDED_TONGGEN_SOURCE.title,
    language: 'zh-Hant',
    locator: {
      section: GENERAL_NATAL_WANG_CHANGSHENG_LU_BOUNDED_TONGGEN_SOURCE.section,
    },
    url: GENERAL_NATAL_WANG_CHANGSHENG_LU_BOUNDED_TONGGEN_SOURCE.url,
    accessedAt: GENERAL_NATAL_WANG_CHANGSHENG_LU_BOUNDED_TONGGEN_SOURCE.accessedAt,
    provenanceTier: 'cross_reference',
    rights: {
      copyrightStatus: 'unknown',
      reusePolicy: 'metadata_only',
    },
    notes:
      'Existing governed 旺 / Yang 長生 / four-Yang 祿 to bounded 通根 source boundary. R5 introduces no new proposition.',
  },
] as const satisfies readonly SourceReference[]);

export const SHARED_NATAL_BOUNDED_TONGGEN_CLAIM_VALUE = Object.freeze({
  evidenceKind: 'bounded_positive_tonggen',
  semanticScope: 'positive_observation_only',
  tonggenObserved: true,
  globalNotTonggen: 'not_determined',
  canonicalSizhuHasRoot: 'not_determined',
  noRoot: 'not_determined',
  observationCountSemantics: 'not_authorized',
  positionWeighting: 'not_authorized',
  supportConstituent: 'not_determined',
  dangZhong: 'not_determined',
  zhuGua: 'not_determined',
  qiangRuo: 'not_determined',
  wangShuai: 'not_determined',
  gyeokguk: 'not_determined',
  numericStrength: 'not_authorized',
  productionAuthority: false,
} as const);

export const SHARED_NATAL_BOUNDED_TONGGEN_CLAIM_VALUE_SCHEMA =
  Object.freeze({
    schemaId: SHARED_NATAL_BOUNDED_TONGGEN_CLAIM_SCHEMA_ID,
    version: SHARED_NATAL_BOUNDED_TONGGEN_STRUCTURAL_CLAIM_VERSION,
    root: {
      kind: 'object',
      required: [
        'evidenceKind',
        'semanticScope',
        'tonggenObserved',
        'globalNotTonggen',
        'canonicalSizhuHasRoot',
        'noRoot',
        'observationCountSemantics',
        'positionWeighting',
        'supportConstituent',
        'dangZhong',
        'zhuGua',
        'qiangRuo',
        'wangShuai',
        'gyeokguk',
        'numericStrength',
        'productionAuthority',
      ],
      properties: {
        evidenceKind: { kind: 'literal', value: 'bounded_positive_tonggen' },
        semanticScope: { kind: 'literal', value: 'positive_observation_only' },
        tonggenObserved: { kind: 'literal', value: true },
        globalNotTonggen: { kind: 'literal', value: 'not_determined' },
        canonicalSizhuHasRoot: { kind: 'literal', value: 'not_determined' },
        noRoot: { kind: 'literal', value: 'not_determined' },
        observationCountSemantics: { kind: 'literal', value: 'not_authorized' },
        positionWeighting: { kind: 'literal', value: 'not_authorized' },
        supportConstituent: { kind: 'literal', value: 'not_determined' },
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

export const SHARED_NATAL_BOUNDED_TONGGEN_CLAIM_TYPE_DEFINITION =
  Object.freeze({
    claimType: SHARED_NATAL_BOUNDED_TONGGEN_CLAIM_TYPE,
    version: SHARED_NATAL_BOUNDED_TONGGEN_STRUCTURAL_CLAIM_VERSION,
    valueSchemaRef: {
      id: SHARED_NATAL_BOUNDED_TONGGEN_CLAIM_SCHEMA_ID,
      version: SHARED_NATAL_BOUNDED_TONGGEN_STRUCTURAL_CLAIM_VERSION,
    },
    scope: 'natal',
    exclusiveValue: true,
    scenarioSensitive: true,
    materialForNarrative: false,
    allowedTaxonomyTiers: ['T2'],
  } as const satisfies ClaimTypeDefinition);

export const SHARED_NATAL_BOUNDED_TONGGEN_METHODOLOGY =
  Object.freeze({
    methodologyId: SHARED_NATAL_BOUNDED_TONGGEN_METHODOLOGY_ID,
    version: SHARED_NATAL_BOUNDED_TONGGEN_STRUCTURAL_CLAIM_VERSION,
    family: 'day_master_strength',
    name: 'Bounded Tonggen evidence materialization',
    description:
      'Research-only T2 materialization of exact R5 bounded Tonggen evidence. It records only that at least one governed positive 通根 observation exists; absence is non-negative and no support aggregation, strength classification, Gyeokguk, narrative, or Production authority follows.',
    assumptions: [
      'Only exact R5 snapshot-bound research evidence may be consumed.',
      'R5 evidence itself is constrained to exact R2 root-evidence parity plus existing bounded 通根 bridges.',
      'No bounded evidence does not mean global 不通根 or 無根.',
      'Observation count and pillar position carry no weight or threshold semantics.',
      '通根 evidence is not yet a 黨眾/助寡 settlement or final 強弱/旺衰 classification.',
      'No narrative, Preview, Official, public semantic, or Production authority is created.',
    ],
    requiredFactTypes: [],
    inputContract: {
      researchEvidenceInputs: [
        SHARED_NATAL_BOUNDED_TONGGEN_METHODOLOGY_RESEARCH_INPUT,
      ],
    },
    sourceIds: SHARED_NATAL_BOUNDED_TONGGEN_SOURCES.map(
      (source) => source.sourceId,
    ),
    status: 'research',
  } as const satisfies MethodologyDefinition);

export const SHARED_NATAL_BOUNDED_TONGGEN_RULE =
  Object.freeze({
    ruleId: 'RULE-SAJU-R5-BOUNDED-POSITIVE-TONGGEN',
    version: SHARED_NATAL_BOUNDED_TONGGEN_STRUCTURAL_CLAIM_VERSION,
    ruleSetId: SHARED_NATAL_BOUNDED_TONGGEN_RULE_SET_ID,
    taxonomy: {
      tier: 'T2',
      category: 'day_master_strength',
      subcategory: 'bounded_tonggen_observation',
    },
    methodologyRef: {
      id: SHARED_NATAL_BOUNDED_TONGGEN_METHODOLOGY_ID,
      version: SHARED_NATAL_BOUNDED_TONGGEN_STRUCTURAL_CLAIM_VERSION,
    },
    title: 'Bounded positive Tonggen evidence observed',
    description:
      'Emits one research-only T2 evidence claim when the exact R5 envelope reports tonggenObserved=true. No inverse, support aggregation, strength, or Gyeokguk conclusion is emitted.',
    inputs: [SHARED_NATAL_BOUNDED_TONGGEN_RULE_INPUT_REQUIREMENT],
    condition: {
      op: 'eq',
      left: {
        kind: 'input',
        key: SHARED_NATAL_BOUNDED_TONGGEN_RULE_INPUT_REQUIREMENT.key,
        path: 'tonggenObserved',
      },
      right: { kind: 'literal', value: true },
    },
    output: {
      claimType: SHARED_NATAL_BOUNDED_TONGGEN_CLAIM_TYPE,
      subject: 'day_master',
      predicate: 'bounded_positive_tonggen_observed',
      value: SHARED_NATAL_BOUNDED_TONGGEN_CLAIM_VALUE,
      polarity: 'neutral',
      emphasis: 'moderate',
      tags: [
        'research',
        'day-master-strength',
        'bounded-tonggen',
        'positive-observation-only',
        'non-conclusive',
      ],
    },
    sourceRefs: SHARED_NATAL_BOUNDED_TONGGEN_SOURCES.map((source) => ({
      sourceId: source.sourceId,
      supportType: 'interpretive_basis' as const,
      notes:
        'Inherited basis from the existing governed bounded Tonggen bridge. R5 adds no new traditional proposition.',
    })),
    quality: {
      provenanceQuality: 'secondary_only',
      testCoverage: 'fixture_matrix',
      methodologyStability: 'contested',
      reviewerStatus: 'unreviewed',
    },
    status: 'research',
  } as const satisfies RuleDefinition);

export const SHARED_NATAL_BOUNDED_TONGGEN_PACK =
  Object.freeze({
    packId: 'PACK-SAJU-R5-BOUNDED-TONGGEN-RESEARCH',
    version: SHARED_NATAL_BOUNDED_TONGGEN_STRUCTURAL_CLAIM_VERSION,
    name: 'SAJU-R5 Bounded Tonggen Research Pack',
    methodologyRefs: [
      {
        id: SHARED_NATAL_BOUNDED_TONGGEN_METHODOLOGY_ID,
        version: SHARED_NATAL_BOUNDED_TONGGEN_STRUCTURAL_CLAIM_VERSION,
      },
    ],
    enabledRuleSets: [SHARED_NATAL_BOUNDED_TONGGEN_RULE_SET_ID],
    conflictPolicy: 'preserve_all',
    ambiguityPolicy: 'skip_requires_resolved',
    compositionPolicyRef: {
      id: 'COMPOSITION-SAJU-R5-BOUNDED-TONGGEN-RESEARCH',
      version: SHARED_NATAL_BOUNDED_TONGGEN_STRUCTURAL_CLAIM_VERSION,
    },
    claimContractMode: 'registered_required',
    status: 'research',
  } as const satisfies InterpretationPack);

export function createSharedNatalBoundedTonggenResearchRegistry(
  createdAt = '1970-01-01T00:00:00.000Z',
) {
  return createRuleRegistrySnapshot(
    {
      rules: [SHARED_NATAL_BOUNDED_TONGGEN_RULE],
      methodologies: [SHARED_NATAL_BOUNDED_TONGGEN_METHODOLOGY],
      sources: SHARED_NATAL_BOUNDED_TONGGEN_SOURCES,
      claimTypeDefinitions: [
        SHARED_NATAL_BOUNDED_TONGGEN_CLAIM_TYPE_DEFINITION,
      ],
      claimValueSchemas: [SHARED_NATAL_BOUNDED_TONGGEN_CLAIM_VALUE_SCHEMA],
      reviewAttestations: [],
    },
    SHARED_NATAL_BOUNDED_TONGGEN_PACK,
    createdAt,
  );
}

export const SHARED_NATAL_BOUNDED_TONGGEN_AUTHORITY_BOUNDARY =
  Object.freeze({
    runtimeScope: 'isolated_research_pack_only' as const,
    exactR5EvidenceBindingRequired: true as const,
    exactR2RootEvidenceParityRequired: true as const,
    positiveObservationOnly: true as const,
    globalNotTonggenClaimAuthorized: false as const,
    noRootInferenceAuthorized: false as const,
    observationCountSemanticsAuthorized: false as const,
    positionWeightingAuthorized: false as const,
    supportConstituentSettlementAuthorized: false as const,
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
