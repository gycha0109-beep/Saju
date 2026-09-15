import type { FactState } from '../contracts/common.js';
import type { StemFact, YinYang } from '../contracts/calculation.js';
import type { RuleInputRequirement, TaxonomyTier } from '../contracts/interpretation.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_SEMANTIC_CORRESPONDENCE_MAP,
  buildRelationshipSpouseT8RoleNeutralSemanticCorrespondenceGovernance,
  type RelationshipSpouseT8GovernedSpouseStarCorrespondenceRecord,
} from './relationship-spouse-t8-role-neutral-semantic-correspondence-governance.js';

export const RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_T6_INPUT_GOVERNANCE_VERSION =
  'myeonghwa-relationship-spouse-t8-role-neutral-t6-input-governance-v2' as const;

export const RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_T6_INPUT_REQUIREMENT = Object.freeze({
  key: 'relationship_spouse_role_neutral_day_master',
  source: 'derived_fact',
  pathOrClaimType: 'derivedFacts.dayMaster',
  acceptedStatuses: Object.freeze(['resolved'] as const),
  required: true,
  ambiguityBehavior: 'requires_resolved',
} satisfies RuleInputRequirement);

export interface RelationshipSpouseT8RoleNeutralT6InputEnvelope {
  taxonomyTier: 'T6';
  source: 'derived_fact';
  pathOrClaimType: 'derivedFacts.dayMaster';
  selectorField: 'value.yinYang';
  factStatus: 'resolved';
  dayMasterPolarity: YinYang;
  correspondence: RelationshipSpouseT8GovernedSpouseStarCorrespondenceRecord;
}

export const RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_T6_INPUT_GOVERNANCE = Object.freeze({
  governanceId: 'RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_T6_INPUT',
  frontierIssue: 595,
  failedSupersededPr: 597,
  domain: 'relationship',
  subcategory: 'spouse',
  temporalScope: 'natal',
  statusClass: 'research',
  authorityScope: 'repository_owned_relationship_t6_input_contract_only',
  targetTaxonomyTier: 'T6' as const satisfies TaxonomyTier,
  standardInputRequirement: RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_T6_INPUT_REQUIREMENT,
  canonicalContract: Object.freeze({
    snapshotContract: 'CanonicalSajuSnapshot',
    sourceFactPath: 'derivedFacts.dayMaster',
    sourceFactContract: 'FactState<StemFact>',
    factDiscriminator: 'status',
    acceptedFactStatus: 'resolved',
    selectorField: 'value.yinYang',
    selectorType: 'YinYang',
    selectorValues: Object.freeze(['양', '음'] satisfies readonly YinYang[]),
    traceabilityMode: 'canonical_fact_path_and_future_rule_evaluation_input_ref',
    syntheticProvenanceFieldAuthorized: false,
    ambiguousFactProducesT6Input: false,
    unavailableFactProducesT6Input: false,
  } as const),
  historicalFailClosedBoundary: Object.freeze({
    priorFeasibilityPr: 312,
    broadT5FamilyPresenceCannotBeRelabelledAsSpouseAuthority: true,
    discardedT5SubtypeReconstructionAuthorized: false,
    discardedT5SlotReconstructionAuthorized: false,
    generalRelationshipT8RelabellingAuthorized: false,
    oldT5InformationLossFindingOverridden: false,
    t5FamilyInputRequired: false,
    currentPathConsumesCanonicalDayMasterFactDirectly: true,
  } as const),
  semanticBoundary: Object.freeze({
    usesOnlyPreviouslyGovernedSemanticCorrespondence: true,
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
    crossSourceSemanticStitchingAuthorized: false,
  } as const),
  runtimeBoundary: Object.freeze({
    researchT6InputContractEstablished: true,
    methodologyRegistered: false,
    producerRegistered: false,
    ruleRegistered: false,
    claimTypeRegistered: false,
    interpretationPackRegistered: false,
    consumerNarrativeActivated: false,
    compatibilityConsumerActivated: false,
    previewDefaultRouteChanged: false,
    productionBehaviorChanged: false,
  } as const),
} as const);

export function buildRelationshipSpouseT8RoleNeutralT6InputFromDayMaster(
  dayMaster: FactState<StemFact>,
): RelationshipSpouseT8RoleNeutralT6InputEnvelope | null {
  if (dayMaster.status !== 'resolved') return null;

  const dayMasterPolarity = dayMaster.value.yinYang;
  return Object.freeze({
    taxonomyTier: 'T6' as const,
    source: 'derived_fact' as const,
    pathOrClaimType: 'derivedFacts.dayMaster' as const,
    selectorField: 'value.yinYang' as const,
    factStatus: 'resolved' as const,
    dayMasterPolarity,
    correspondence: RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_SEMANTIC_CORRESPONDENCE_MAP[dayMasterPolarity],
  });
}

export const RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_T6_INPUT_GOVERNANCE_CONTROL_IDS = Object.freeze([
  'EXACT_UPSTREAM_FOUR_OF_FIVE_AUTHORITY_STATE_IS_REQUIRED',
  'STANDARD_RULE_INPUT_REQUIREMENT_VOCABULARY_IS_REUSED',
  'TARGET_TAXONOMY_TIER_IS_T6',
  'T6_SOURCE_IS_DERIVED_FACT',
  'T6_CANONICAL_SOURCE_PATH_IS_DERIVED_FACTS_DAY_MASTER',
  'T6_SELECTOR_FIELD_IS_RESOLVED_DAY_MASTER_VALUE_YIN_YANG',
  'FACTSTATE_DISCRIMINATOR_IS_STATUS',
  'T6_ACCEPTED_FACT_STATUS_IS_RESOLVED_ONLY',
  'T6_AMBIGUITY_BEHAVIOR_REQUIRES_RESOLVED',
  'NO_SYNTHETIC_PROVENANCE_FIELD_IS_INTRODUCED',
  'AMBIGUOUS_DAY_MASTER_PRODUCES_NO_T6_INPUT',
  'UNAVAILABLE_DAY_MASTER_PRODUCES_NO_T6_INPUT',
  'RESOLVED_YANG_REUSES_GOVERNED_INDIRECT_WEALTH_PIANCAI_CORRESPONDENCE',
  'RESOLVED_YIN_REUSES_GOVERNED_INDIRECT_POWER_PIANGUAN_CORRESPONDENCE',
  'CURRENT_T5_FAMILY_PRESENCE_TUPLE_IS_NOT_CONSUMED',
  'DISCARDED_T5_SUBTYPE_RECONSTRUCTION_REMAINS_FORBIDDEN',
  'DISCARDED_T5_SLOT_RECONSTRUCTION_REMAINS_FORBIDDEN',
  'GENERAL_RELATIONSHIP_T8_RELABELLING_REMAINS_FORBIDDEN',
  'HISTORICAL_PR_312_INFORMATION_LOSS_FINDING_IS_NOT_OVERRIDDEN',
  'NATIVE_SEX_INPUT_IS_NOT_REQUIRED',
  'PARTNER_SEX_INPUT_IS_NOT_REQUIRED',
  'PARTNER_IDENTITY_INPUT_IS_NOT_REQUIRED',
  'SEXUAL_ORIENTATION_INPUT_IS_NOT_REQUIRED',
  'SECOND_CHART_INPUT_IS_NOT_REQUIRED',
  'COMPATIBILITY_INPUT_AND_SCORING_ARE_NOT_AUTHORIZED',
  'MARRIAGE_GUARANTEE_INFERENCE_IS_NOT_AUTHORIZED',
  'FERTILITY_INFERENCE_IS_NOT_AUTHORIZED',
  'RELATIONSHIP_LEGALITY_OR_ETHICS_INFERENCE_IS_NOT_AUTHORIZED',
  'RELATIONSHIP_T6_INPUT_ALONE_MOVES_OPEN_TO_CLOSED',
  'EXACTLY_FIVE_OF_FIVE_AUTHORITY_GAPS_ARE_CLOSED',
  'AUTHORITY_ADMISSION_REMAINS_NOT_READY',
  'SPOUSE_T8_PRODUCER_REMAINS_NOT_READY',
  'NO_RUNTIME_REGISTRY_OR_CONSUMER_ACTIVATION',
  'PRODUCTION_PROMOTION_REMAINS_NOT_READY',
  'PRODUCTION_REMAINS_HOLD',
] as const);

export interface RelationshipSpouseT8RoleNeutralT6InputGovernanceReport {
  evidenceId: string;
  evidenceVersion: typeof RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_T6_INPUT_GOVERNANCE_VERSION;
  upstreamEvidenceId: string;
  status:
    | 'GOVERNED_ROLE_NEUTRAL_RELATIONSHIP_T6_INPUT_CONTRACT_ESTABLISHED'
    | 'UPSTREAM_FOUR_OF_FIVE_AUTHORITY_STATE_INVALID';
  domain: 'relationship';
  subcategory: 'spouse';
  temporalScope: 'natal';
  statusClass: 'research';
  governance: typeof RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_T6_INPUT_GOVERNANCE;
  exactUpstreamFourOfFiveStateAccepted: boolean;
  canonicalSourceFactPath: 'derivedFacts.dayMaster';
  selectorField: 'value.yinYang';
  factDiscriminator: 'status';
  acceptedFactStatus: 'resolved';
  syntheticProvenanceFieldIntroduced: false;
  explicitRoleNeutralNatalMappingEstablished: boolean;
  currentGovernedMethodSemanticCorrespondenceEstablished: boolean;
  currentRelationshipT6InputPathEstablished: boolean;
  relationshipT6InputGapClosedByThisEvidence: boolean;
  qualifyingPrimaryWitnessRemainsClosed: boolean;
  independentNormativeProvenanceRemainsClosed: boolean;
  authorityGapsClosedCount: 5 | 0;
  authorityGapsOpenCount: 0 | 5;
  authorityAdmissionReady: false;
  crossSourceStitchingAuthorized: false;
  spouseT8ProducerReady: false;
  methodologyRegistered: false;
  producerRegistered: false;
  ruleRegistered: false;
  claimTypeRegistered: false;
  interpretationPackRegistered: false;
  consumerNarrativeActivated: false;
  compatibilityConsumerActivated: false;
  previewDefaultRouteChanged: false;
  productionPromotionReady: false;
  productionState: 'HOLD';
  controlIds: readonly (typeof RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_T6_INPUT_GOVERNANCE_CONTROL_IDS)[number][];
  controlCount: number;
  recommendedNextAction:
    | 'REVIEW_SEPARATE_RUNTIME_ADMISSION_AFTER_FIVE_OF_FIVE_RESEARCH_AUTHORITY'
    | 'REESTABLISH_FOUR_OF_FIVE_AUTHORITY_STATE';
}

type UpstreamReport = ReturnType<
  typeof buildRelationshipSpouseT8RoleNeutralSemanticCorrespondenceGovernance
>;

function contentAddressedUpstreamIdentityValid(upstream: UpstreamReport): boolean {
  const { evidenceId, ...material } = upstream;
  return (
    evidenceId ===
    `relationship_spouse_t8_role_neutral_semantic_correspondence_governance_${deterministicContentHash(material).slice(0, 24)}`
  );
}

function upstreamFourOfFiveStateAccepted(upstream: UpstreamReport): boolean {
  return (
    contentAddressedUpstreamIdentityValid(upstream) &&
    upstream.status ===
      'GOVERNED_CANONICAL_DAY_MASTER_POLARITY_SPOUSE_STAR_SEMANTIC_CORRESPONDENCE_ESTABLISHED' &&
    upstream.explicitRoleNeutralNatalMappingEstablished === true &&
    upstream.currentGovernedMethodSemanticCorrespondenceEstablished === true &&
    upstream.currentRelationshipT6InputPathEstablished === false &&
    upstream.semanticCorrespondenceGapClosedByThisEvidence === true &&
    upstream.relationshipT6InputGapClosedByThisEvidence === false &&
    upstream.qualifyingPrimaryWitnessRemainsClosed === true &&
    upstream.independentNormativeProvenanceRemainsClosed === true &&
    upstream.authorityGapsClosedCount === 4 &&
    upstream.authorityGapsOpenCount === 1 &&
    upstream.authorityAdmissionReady === false &&
    upstream.crossSourceStitchingAuthorized === false &&
    upstream.spouseT8ProducerReady === false &&
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

export function buildRelationshipSpouseT8RoleNeutralT6InputGovernance(): RelationshipSpouseT8RoleNeutralT6InputGovernanceReport {
  const upstream = buildRelationshipSpouseT8RoleNeutralSemanticCorrespondenceGovernance();
  const accepted = upstreamFourOfFiveStateAccepted(upstream);
  const material = {
    evidenceVersion: RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_T6_INPUT_GOVERNANCE_VERSION,
    upstreamEvidenceId: upstream.evidenceId,
    status: accepted
      ? ('GOVERNED_ROLE_NEUTRAL_RELATIONSHIP_T6_INPUT_CONTRACT_ESTABLISHED' as const)
      : ('UPSTREAM_FOUR_OF_FIVE_AUTHORITY_STATE_INVALID' as const),
    domain: 'relationship' as const,
    subcategory: 'spouse' as const,
    temporalScope: 'natal' as const,
    statusClass: 'research' as const,
    governance: RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_T6_INPUT_GOVERNANCE,
    exactUpstreamFourOfFiveStateAccepted: accepted,
    canonicalSourceFactPath: 'derivedFacts.dayMaster' as const,
    selectorField: 'value.yinYang' as const,
    factDiscriminator: 'status' as const,
    acceptedFactStatus: 'resolved' as const,
    syntheticProvenanceFieldIntroduced: false as const,
    explicitRoleNeutralNatalMappingEstablished: accepted,
    currentGovernedMethodSemanticCorrespondenceEstablished: accepted,
    currentRelationshipT6InputPathEstablished: accepted,
    relationshipT6InputGapClosedByThisEvidence: accepted,
    qualifyingPrimaryWitnessRemainsClosed: accepted,
    independentNormativeProvenanceRemainsClosed: accepted,
    authorityGapsClosedCount: accepted ? (5 as const) : (0 as const),
    authorityGapsOpenCount: accepted ? (0 as const) : (5 as const),
    authorityAdmissionReady: false as const,
    crossSourceStitchingAuthorized: false as const,
    spouseT8ProducerReady: false as const,
    methodologyRegistered: false as const,
    producerRegistered: false as const,
    ruleRegistered: false as const,
    claimTypeRegistered: false as const,
    interpretationPackRegistered: false as const,
    consumerNarrativeActivated: false as const,
    compatibilityConsumerActivated: false as const,
    previewDefaultRouteChanged: false as const,
    productionPromotionReady: false as const,
    productionState: 'HOLD' as const,
    controlIds: accepted
      ? RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_T6_INPUT_GOVERNANCE_CONTROL_IDS
      : Object.freeze([]),
    controlCount: accepted
      ? RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_T6_INPUT_GOVERNANCE_CONTROL_IDS.length
      : 0,
    recommendedNextAction: accepted
      ? ('REVIEW_SEPARATE_RUNTIME_ADMISSION_AFTER_FIVE_OF_FIVE_RESEARCH_AUTHORITY' as const)
      : ('REESTABLISH_FOUR_OF_FIVE_AUTHORITY_STATE' as const),
  };

  return {
    evidenceId: `relationship_spouse_t8_role_neutral_t6_input_governance_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
