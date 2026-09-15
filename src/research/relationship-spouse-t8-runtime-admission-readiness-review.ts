import type {
  ClaimTypeDefinition,
  ClaimValueSchemaDefinition,
  InterpretationPack,
  MethodologyDefinition,
  RuleDefinition,
} from '../contracts/interpretation.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_T6_INPUT_REQUIREMENT,
  buildRelationshipSpouseT8RoleNeutralT6InputGovernance,
} from './relationship-spouse-t8-role-neutral-t6-input-governance.js';

export const RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_READINESS_VERSION =
  'myeonghwa-relationship-spouse-t8-runtime-admission-readiness-v1' as const;

const READINESS_METHODOLOGY_ID =
  'relationship-spouse-t8-role-neutral-day-master-polarity-readiness-witness' as const;
const READINESS_METHODOLOGY_VERSION = '0.0.0-readiness-only' as const;
const READINESS_RULE_SET_ID = 'relationship-spouse-t8-readiness-witness' as const;
const READINESS_CLAIM_TYPE = 'relationship.spouse.role_neutral_spouse_star_marker' as const;
const READINESS_CLAIM_SCHEMA_ID =
  'relationship.spouse.role_neutral_spouse_star_marker.schema' as const;

export const RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_CLAIM_VALUE_SCHEMA_WITNESS =
  Object.freeze({
    schemaId: READINESS_CLAIM_SCHEMA_ID,
    version: '0.0.0-readiness-only',
    root: {
      kind: 'union',
      anyOf: [
        {
          kind: 'object',
          required: [
            'dayMasterPolarity',
            'spouseStarSemantic',
            'tenGodNativeLabel',
            'tenGodHanjaLabel',
          ],
          properties: {
            dayMasterPolarity: { kind: 'literal', value: '양' },
            spouseStarSemantic: { kind: 'literal', value: 'INDIRECT_WEALTH' },
            tenGodNativeLabel: { kind: 'literal', value: '편재' },
            tenGodHanjaLabel: { kind: 'literal', value: '偏財' },
          },
          additionalProperties: false,
        },
        {
          kind: 'object',
          required: [
            'dayMasterPolarity',
            'spouseStarSemantic',
            'tenGodNativeLabel',
            'tenGodHanjaLabel',
          ],
          properties: {
            dayMasterPolarity: { kind: 'literal', value: '음' },
            spouseStarSemantic: { kind: 'literal', value: 'INDIRECT_POWER' },
            tenGodNativeLabel: { kind: 'literal', value: '편관' },
            tenGodHanjaLabel: { kind: 'literal', value: '偏官' },
          },
          additionalProperties: false,
        },
      ],
    },
  } as const satisfies ClaimValueSchemaDefinition);

export const RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_CLAIM_TYPE_WITNESS = Object.freeze({
  claimType: READINESS_CLAIM_TYPE,
  version: '0.0.0-readiness-only',
  valueSchemaRef: {
    id: READINESS_CLAIM_SCHEMA_ID,
    version: '0.0.0-readiness-only',
  },
  scope: 'natal',
  exclusiveValue: true,
  scenarioSensitive: false,
  materialForNarrative: false,
  allowedTaxonomyTiers: ['T8'],
} as const satisfies ClaimTypeDefinition);

export const RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_METHODOLOGY_WITNESS = Object.freeze({
  methodologyId: READINESS_METHODOLOGY_ID,
  version: READINESS_METHODOLOGY_VERSION,
  family: 'ten_gods',
  name: 'Role-neutral spouse-star Day-Master-polarity readiness witness',
  description:
    'Research-only type witness proving the existing methodology contract can carry the already-governed resolved Day Master polarity input. This object is not registered.',
  assumptions: [
    'Exact five-of-five Relationship / Spouse T8 research authority is required before any separate runtime admission.',
    'Only resolved canonical derivedFacts.dayMaster may be consumed.',
  ],
  requiredFactTypes: ['derivedFacts.dayMaster'],
  inputContract: {
    factInputs: [
      {
        source: 'derived_fact',
        pathPattern: 'derivedFacts.dayMaster',
        mode: 'required',
        rationale:
          'The governed T6 contract consumes only resolved canonical Day Master polarity and reconstructs no T5 subtype.',
      },
    ],
  },
  sourceIds: [],
  status: 'research',
} as const satisfies MethodologyDefinition);

const COMMON_RULE_FIELDS = {
  version: '0.0.0-readiness-only',
  ruleSetId: READINESS_RULE_SET_ID,
  taxonomy: {
    tier: 'T8',
    category: 'relationship',
    subcategory: 'spouse',
  },
  methodologyRef: {
    id: READINESS_METHODOLOGY_ID,
    version: READINESS_METHODOLOGY_VERSION,
  },
  inputs: [RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_T6_INPUT_REQUIREMENT],
  sourceRefs: [],
  quality: {
    provenanceQuality: 'primary_supported',
    testCoverage: 'unit',
    methodologyStability: 'contested',
    reviewerStatus: 'unreviewed',
  },
  status: 'research',
} as const;

export const RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_RULE_WITNESSES = Object.freeze([
  {
    ...COMMON_RULE_FIELDS,
    ruleId: 'relationship-spouse-t8-readiness-yang-day-master',
    title: 'Readiness witness: Yang Day Master spouse-star marker',
    description:
      'Type-only readiness witness. A resolved Yang Day Master may map only to the already-governed Indirect Wealth spouse-star correspondence.',
    condition: {
      op: 'eq',
      left: {
        kind: 'input',
        key: 'relationship_spouse_role_neutral_day_master',
        path: 'value.yinYang',
      },
      right: { kind: 'literal', value: '양' },
    },
    output: {
      claimType: READINESS_CLAIM_TYPE,
      subject: 'native_chart',
      predicate: 'role_neutral_spouse_star_marker',
      value: {
        dayMasterPolarity: '양',
        spouseStarSemantic: 'INDIRECT_WEALTH',
        tenGodNativeLabel: '편재',
        tenGodHanjaLabel: '偏財',
      },
      polarity: 'neutral',
      tags: ['relationship', 'spouse', 'role_neutral', 'readiness_only'],
    },
  } as const satisfies RuleDefinition,
  {
    ...COMMON_RULE_FIELDS,
    ruleId: 'relationship-spouse-t8-readiness-yin-day-master',
    title: 'Readiness witness: Yin Day Master spouse-star marker',
    description:
      'Type-only readiness witness. A resolved Yin Day Master may map only to the already-governed Indirect Power spouse-star correspondence.',
    condition: {
      op: 'eq',
      left: {
        kind: 'input',
        key: 'relationship_spouse_role_neutral_day_master',
        path: 'value.yinYang',
      },
      right: { kind: 'literal', value: '음' },
    },
    output: {
      claimType: READINESS_CLAIM_TYPE,
      subject: 'native_chart',
      predicate: 'role_neutral_spouse_star_marker',
      value: {
        dayMasterPolarity: '음',
        spouseStarSemantic: 'INDIRECT_POWER',
        tenGodNativeLabel: '편관',
        tenGodHanjaLabel: '偏官',
      },
      polarity: 'neutral',
      tags: ['relationship', 'spouse', 'role_neutral', 'readiness_only'],
    },
  } as const satisfies RuleDefinition,
]);

export const RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_PACK_WITNESS = Object.freeze({
  packId: 'relationship-spouse-t8-runtime-admission-readiness-witness',
  version: '0.0.0-readiness-only',
  name: 'Relationship Spouse T8 runtime admission readiness witness',
  methodologyRefs: [
    {
      id: READINESS_METHODOLOGY_ID,
      version: READINESS_METHODOLOGY_VERSION,
    },
  ],
  enabledRuleSets: [READINESS_RULE_SET_ID],
  conflictPolicy: 'preserve_all',
  ambiguityPolicy: 'skip_requires_resolved',
  compositionPolicyRef: {
    id: 'readiness-only-unregistered-composition-policy',
    version: '0.0.0-readiness-only',
  },
  claimContractMode: 'registered_required',
  status: 'research',
} as const satisfies InterpretationPack);

export const RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_READINESS_GATES = Object.freeze({
  fiveOfFiveResearchAuthorityRequired: true,
  standardT6DerivedFactInputRepresentable: true,
  relationshipSpouseTaxonomyRepresentable: true,
  methodologyInputContractRepresentable: true,
  failClosedRuleRepresentable: true,
  boundedSpouseStarClaimSchemaRepresentable: true,
  interpretationPackRepresentable: true,
  twoStaticRulesPreservePolarityCorrespondenceWithoutDynamicOutputSchema: true,
  runtimeSchemaInventionRequired: false,
} as const);

export const RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_NON_ACTIVATION_BOUNDARY = Object.freeze({
  methodologyRegistered: false,
  ruleRegistered: false,
  producerRegistered: false,
  claimTypeRegistered: false,
  claimValueSchemaRegistered: false,
  interpretationPackRegistered: false,
  compositionPolicyRegistered: false,
  consumerNarrativeActivated: false,
  compatibilityConsumerActivated: false,
  previewDefaultRouteChanged: false,
  productionBehaviorChanged: false,
  spouseT8ProducerReady: false,
  productionPromotionReady: false,
  productionState: 'HOLD' as const,
} as const);

export const RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_SEMANTIC_BOUNDARY = Object.freeze({
  t5SubtypeReconstructionAuthorized: false,
  t5SlotReconstructionAuthorized: false,
  genericRelationshipT8RelabellingAuthorized: false,
  nativeSexInputRequired: false,
  partnerSexInputRequired: false,
  partnerIdentityInputRequired: false,
  sexualOrientationInputRequired: false,
  secondChartInputRequired: false,
  compatibilityInputRequired: false,
  marriageGuaranteeInferenceAuthorized: false,
  fertilityInferenceAuthorized: false,
  relationshipLegalityOrEthicsInferenceAuthorized: false,
  compatibilityScoringAuthorized: false,
} as const);

export const RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_READINESS_CONTROL_IDS = Object.freeze([
  'EXACT_UPSTREAM_FIVE_OF_FIVE_RESEARCH_AUTHORITY_IS_REQUIRED',
  'STANDARD_T6_DERIVED_FACT_INPUT_IS_RUNTIME_REPRESENTABLE',
  'T8_RELATIONSHIP_SPOUSE_TAXONOMY_IS_RUNTIME_REPRESENTABLE',
  'METHODOLOGY_FACT_INPUT_CONTRACT_IS_RUNTIME_REPRESENTABLE',
  'RESOLVED_ONLY_REQUIRES_RESOLVED_BOUNDARY_IS_PRESERVED',
  'TWO_STATIC_RULES_CAN_PRESERVE_BOUNDED_POLARITY_CORRESPONDENCE',
  'BOUNDED_SPOUSE_STAR_CLAIM_SCHEMA_IS_RUNTIME_REPRESENTABLE',
  'RESEARCH_INTERPRETATION_PACK_IS_RUNTIME_REPRESENTABLE',
  'NO_RUNTIME_SCHEMA_INVENTION_IS_REQUIRED',
  'AUTHORITY_ADMISSION_READINESS_DOES_NOT_REGISTER_RUNTIME_OBJECTS',
  'T5_RECONSTRUCTION_REMAINS_FORBIDDEN',
  'DEMOGRAPHIC_OR_SECOND_CHART_INPUT_REMAINS_FORBIDDEN',
  'COMPATIBILITY_AND_OUTCOME_INFERENCE_REMAINS_FORBIDDEN',
  'SPOUSE_T8_PRODUCER_REMAINS_NOT_READY',
  'PRODUCTION_REMAINS_HOLD',
] as const);

export interface RelationshipSpouseT8RuntimeAdmissionReadinessReport {
  evidenceId: string;
  evidenceVersion: typeof RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_READINESS_VERSION;
  upstreamEvidenceId: string;
  status:
    | 'RUNTIME_ADMISSION_REPRESENTABLE_AFTER_FIVE_OF_FIVE_RESEARCH_AUTHORITY'
    | 'UPSTREAM_FIVE_OF_FIVE_RESEARCH_AUTHORITY_INVALID';
  exactUpstreamFiveOfFiveStateAccepted: boolean;
  fiveOfFiveResearchAuthorityAvailable: boolean;
  standardT6DerivedFactInputRepresentable: boolean;
  relationshipSpouseTaxonomyRepresentable: boolean;
  methodologyInputContractRepresentable: boolean;
  failClosedRuleRepresentable: boolean;
  boundedSpouseStarClaimSchemaRepresentable: boolean;
  interpretationPackRepresentable: boolean;
  twoStaticRulesPreservePolarityCorrespondenceWithoutDynamicOutputSchema: boolean;
  runtimeSchemaInventionRequired: false;
  authorityAdmissionReady: boolean;
  methodologyRegistered: false;
  ruleRegistered: false;
  producerRegistered: false;
  claimTypeRegistered: false;
  claimValueSchemaRegistered: false;
  interpretationPackRegistered: false;
  compositionPolicyRegistered: false;
  consumerNarrativeActivated: false;
  compatibilityConsumerActivated: false;
  previewDefaultRouteChanged: false;
  spouseT8ProducerReady: false;
  productionPromotionReady: false;
  productionState: 'HOLD';
  controlIds: readonly (typeof RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_READINESS_CONTROL_IDS)[number][];
  controlCount: number;
  recommendedNextAction:
    | 'REGISTER_SEPARATE_RUNTIME_ADMISSION_CONTRACTS_WITHOUT_PRODUCTION_ACTIVATION'
    | 'REESTABLISH_EXACT_FIVE_OF_FIVE_RESEARCH_AUTHORITY';
}

type UpstreamReport = ReturnType<typeof buildRelationshipSpouseT8RoleNeutralT6InputGovernance>;

function exactUpstreamFiveOfFiveStateAccepted(upstream: UpstreamReport): boolean {
  return (
    upstream.status === 'GOVERNED_ROLE_NEUTRAL_RELATIONSHIP_T6_INPUT_CONTRACT_ESTABLISHED' &&
    upstream.exactUpstreamFourOfFiveStateAccepted === true &&
    upstream.explicitRoleNeutralNatalMappingEstablished === true &&
    upstream.currentGovernedMethodSemanticCorrespondenceEstablished === true &&
    upstream.currentRelationshipT6InputPathEstablished === true &&
    upstream.relationshipT6InputGapClosedByThisEvidence === true &&
    upstream.qualifyingPrimaryWitnessRemainsClosed === true &&
    upstream.independentNormativeProvenanceRemainsClosed === true &&
    upstream.authorityGapsClosedCount === 5 &&
    upstream.authorityGapsOpenCount === 0 &&
    upstream.authorityAdmissionReady === false &&
    upstream.spouseT8ProducerReady === false &&
    upstream.methodologyRegistered === false &&
    upstream.producerRegistered === false &&
    upstream.ruleRegistered === false &&
    upstream.claimTypeRegistered === false &&
    upstream.interpretationPackRegistered === false &&
    upstream.consumerNarrativeActivated === false &&
    upstream.compatibilityConsumerActivated === false &&
    upstream.previewDefaultRouteChanged === false &&
    upstream.productionPromotionReady === false &&
    upstream.productionState === 'HOLD'
  );
}

export function buildRelationshipSpouseT8RuntimeAdmissionReadiness(): RelationshipSpouseT8RuntimeAdmissionReadinessReport {
  const upstream = buildRelationshipSpouseT8RoleNeutralT6InputGovernance();
  const upstreamAccepted = exactUpstreamFiveOfFiveStateAccepted(upstream);
  const gates = RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_READINESS_GATES;
  const authorityAdmissionReady =
    upstreamAccepted &&
    gates.standardT6DerivedFactInputRepresentable &&
    gates.relationshipSpouseTaxonomyRepresentable &&
    gates.methodologyInputContractRepresentable &&
    gates.failClosedRuleRepresentable &&
    gates.boundedSpouseStarClaimSchemaRepresentable &&
    gates.interpretationPackRepresentable &&
    gates.twoStaticRulesPreservePolarityCorrespondenceWithoutDynamicOutputSchema &&
    gates.runtimeSchemaInventionRequired === false;

  const material = {
    evidenceVersion: RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_READINESS_VERSION,
    upstreamEvidenceId: upstream.evidenceId,
    status: upstreamAccepted
      ? ('RUNTIME_ADMISSION_REPRESENTABLE_AFTER_FIVE_OF_FIVE_RESEARCH_AUTHORITY' as const)
      : ('UPSTREAM_FIVE_OF_FIVE_RESEARCH_AUTHORITY_INVALID' as const),
    exactUpstreamFiveOfFiveStateAccepted: upstreamAccepted,
    fiveOfFiveResearchAuthorityAvailable: upstreamAccepted,
    standardT6DerivedFactInputRepresentable: gates.standardT6DerivedFactInputRepresentable,
    relationshipSpouseTaxonomyRepresentable: gates.relationshipSpouseTaxonomyRepresentable,
    methodologyInputContractRepresentable: gates.methodologyInputContractRepresentable,
    failClosedRuleRepresentable: gates.failClosedRuleRepresentable,
    boundedSpouseStarClaimSchemaRepresentable: gates.boundedSpouseStarClaimSchemaRepresentable,
    interpretationPackRepresentable: gates.interpretationPackRepresentable,
    twoStaticRulesPreservePolarityCorrespondenceWithoutDynamicOutputSchema:
      gates.twoStaticRulesPreservePolarityCorrespondenceWithoutDynamicOutputSchema,
    runtimeSchemaInventionRequired: false as const,
    authorityAdmissionReady,
    ...RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_NON_ACTIVATION_BOUNDARY,
    controlIds: upstreamAccepted
      ? RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_READINESS_CONTROL_IDS
      : Object.freeze([]),
    controlCount: upstreamAccepted
      ? RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_READINESS_CONTROL_IDS.length
      : 0,
    recommendedNextAction: upstreamAccepted
      ? ('REGISTER_SEPARATE_RUNTIME_ADMISSION_CONTRACTS_WITHOUT_PRODUCTION_ACTIVATION' as const)
      : ('REESTABLISH_EXACT_FIVE_OF_FIVE_RESEARCH_AUTHORITY' as const),
  };

  return Object.freeze({
    evidenceId: `relationship_spouse_t8_runtime_admission_readiness_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  });
}
