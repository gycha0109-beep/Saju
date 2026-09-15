import type { YinYang } from '../contracts/calculation.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { buildRelationshipSpouseT8DailyAstroNeutralColumnCompatibilityAccessBoundaryEvidence } from './relationship-spouse-t8-dailyastro-neutral-column-compatibility-access-boundary-evidence.js';

export const RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_SEMANTIC_CORRESPONDENCE_GOVERNANCE_VERSION =
  'myeonghwa-relationship-spouse-t8-role-neutral-semantic-correspondence-governance-v1' as const;

export type RelationshipSpouseT8GovernedSpouseStarSemantic =
  | 'INDIRECT_WEALTH'
  | 'INDIRECT_POWER';

export interface RelationshipSpouseT8GovernedSpouseStarCorrespondence {
  dayMasterPolarity: YinYang;
  spouseStarSemantic: RelationshipSpouseT8GovernedSpouseStarSemantic;
  tenGodNativeLabel: '편재';
  tenGodHanjaLabel: '偏財';
}

export interface RelationshipSpouseT8GovernedSpouseStarPowerCorrespondence {
  dayMasterPolarity: YinYang;
  spouseStarSemantic: RelationshipSpouseT8GovernedSpouseStarSemantic;
  tenGodNativeLabel: '편관';
  tenGodHanjaLabel: '偏官';
}

export type RelationshipSpouseT8GovernedSpouseStarCorrespondenceRecord =
  | RelationshipSpouseT8GovernedSpouseStarCorrespondence
  | RelationshipSpouseT8GovernedSpouseStarPowerCorrespondence;

export const RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_SEMANTIC_CORRESPONDENCE_MAP = Object.freeze({
  양: Object.freeze({
    dayMasterPolarity: '양',
    spouseStarSemantic: 'INDIRECT_WEALTH',
    tenGodNativeLabel: '편재',
    tenGodHanjaLabel: '偏財',
  } as const),
  음: Object.freeze({
    dayMasterPolarity: '음',
    spouseStarSemantic: 'INDIRECT_POWER',
    tenGodNativeLabel: '편관',
    tenGodHanjaLabel: '偏官',
  } as const),
} satisfies Readonly<Record<YinYang, RelationshipSpouseT8GovernedSpouseStarCorrespondenceRecord>>);

export const RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_SEMANTIC_CORRESPONDENCE_GOVERNANCE =
  Object.freeze({
    governanceId: 'RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_SEMANTIC_CORRESPONDENCE',
    frontierIssue: 591,
    domain: 'relationship',
    subcategory: 'spouse',
    temporalScope: 'natal',
    statusClass: 'research',
    authorityScope: 'repository_owned_semantic_correspondence_only',
    canonicalContract: Object.freeze({
      snapshotContract: 'CanonicalSajuSnapshot',
      dayMasterContract: 'StemFact',
      canonicalInputPath: 'derivedFacts.dayMaster.yinYang',
      canonicalInputType: 'YinYang',
      canonicalInputValues: Object.freeze(['양', '음'] satisfies readonly YinYang[]),
      t5FamilyTupleRequired: false,
      t5TenGodSubtypeReconstructionRequired: false,
      relationshipT6ObjectRequiredForSemanticCorrespondence: false,
    } as const),
    correspondence: RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_SEMANTIC_CORRESPONDENCE_MAP,
    historicalFailClosedBoundary: Object.freeze({
      priorFeasibilityPr: 312,
      broadT5FamilyPresenceCannotBeRelabelledAsSpouseAuthority: true,
      discardedT5SubtypeReconstructionAuthorized: false,
      generalRelationshipT8RelabellingAuthorized: false,
      oldT5InformationLossFindingOverridden: false,
      currentPathBypassesLossyT5TupleByUsingExistingCanonicalDayMasterPolarity: true,
    } as const),
    semanticBoundary: Object.freeze({
      meansGovernedSpouseStarMarkerForAdmittedMethodologyFamily: true,
      meansNativeSex: false,
      meansPartnerSex: false,
      meansPartnerIdentity: false,
      meansSexualOrientation: false,
      meansMarriageExistsOrIsGuaranteed: false,
      meansFertility: false,
      meansRelationshipLegalityOrEthics: false,
      meansCompatibilityScore: false,
      meansSecondChartProperties: false,
      schoolDependenceCaveatPreserved: true,
      dailyAstroBilateralCompatibilitySemanticsImported: false,
      dailyAstroNayinFallbackImported: false,
      crossSourceSemanticStitchingAuthorized: false,
    } as const),
    runtimeBoundary: Object.freeze({
      relationshipT6InputPathEstablished: false,
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

export const RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_SEMANTIC_CORRESPONDENCE_GOVERNANCE_CONTROL_IDS =
  Object.freeze([
    'EXACT_UPSTREAM_THREE_OF_FIVE_AUTHORITY_STATE_IS_REQUIRED',
    'CANONICAL_SAJU_SNAPSHOT_DAY_MASTER_POLARITY_IS_THE_ONLY_GOVERNED_SELECTOR_INPUT_PATH',
    'CANONICAL_INPUT_PATH_IS_DERIVED_FACTS_DAY_MASTER_YIN_YANG',
    'CANONICAL_YIN_YANG_CONTRACT_REMAINS_EXACTLY_YANG_OR_YIN',
    'YANG_DAY_MASTER_MAPS_TO_INDIRECT_WEALTH_PIANCAI_SPOUSE_STAR_MARKER',
    'YIN_DAY_MASTER_MAPS_TO_INDIRECT_POWER_PIANGUAN_SPOUSE_STAR_MARKER',
    'CURRENT_T5_FAMILY_PRESENCE_TUPLE_IS_NOT_REQUIRED',
    'DISCARDED_T5_SUBTYPE_RECONSTRUCTION_REMAINS_FORBIDDEN',
    'GENERAL_RELATIONSHIP_T8_RELABELLING_REMAINS_FORBIDDEN',
    'HISTORICAL_PR_312_INFORMATION_LOSS_FINDING_IS_NOT_OVERRIDDEN',
    'CANONICAL_DAY_MASTER_POLARITY_PATH_AVOIDS_LOSSY_T5_RECONSTRUCTION',
    'SEMANTIC_CORRESPONDENCE_MEANS_SPOUSE_STAR_MARKER_ONLY',
    'NATIVE_SEX_INFERENCE_IS_NOT_AUTHORIZED',
    'PARTNER_SEX_INFERENCE_IS_NOT_AUTHORIZED',
    'PARTNER_IDENTITY_INFERENCE_IS_NOT_AUTHORIZED',
    'SEXUAL_ORIENTATION_INFERENCE_IS_NOT_AUTHORIZED',
    'MARRIAGE_EXISTENCE_OR_GUARANTEE_INFERENCE_IS_NOT_AUTHORIZED',
    'FERTILITY_INFERENCE_IS_NOT_AUTHORIZED',
    'RELATIONSHIP_LEGALITY_OR_ETHICS_INFERENCE_IS_NOT_AUTHORIZED',
    'COMPATIBILITY_SCORE_INFERENCE_IS_NOT_AUTHORIZED',
    'SECOND_CHART_PROPERTIES_ARE_NOT_IMPORTED',
    'WHISPER_SCHOOL_DEPENDENCE_CAVEAT_IS_PRESERVED',
    'DAILYASTRO_BILATERAL_COMPATIBILITY_AND_NAYIN_SEMANTICS_ARE_NOT_IMPORTED',
    'NO_CROSS_SOURCE_STITCHING_TO_MANUFACTURE_REPOSITORY_SEMANTICS',
    'CURRENT_GOVERNED_SEMANTIC_CORRESPONDENCE_IS_CLOSED_BY_REPOSITORY_GOVERNANCE_ONLY',
    'RELATIONSHIP_T6_INPUT_REMAINS_OPEN',
    'NO_T6_PRODUCER_RULE_CLAIM_PACK_NARRATIVE_COMPATIBILITY_OR_PREVIEW_ACTIVATION',
    'QUALIFYING_PRIMARY_WITNESS_REMAINS_CLOSED',
    'INDEPENDENT_NORMATIVE_PROVENANCE_REMAINS_CLOSED',
    'EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING_REMAINS_CLOSED',
    'EXACTLY_FOUR_OF_FIVE_AUTHORITY_GAPS_ARE_CLOSED_AND_PRODUCTION_REMAINS_HOLD',
  ] as const);

export interface RelationshipSpouseT8RoleNeutralSemanticCorrespondenceGovernanceReport {
  evidenceId: string;
  evidenceVersion: typeof RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_SEMANTIC_CORRESPONDENCE_GOVERNANCE_VERSION;
  upstreamEvidenceId: string;
  status:
    | 'GOVERNED_CANONICAL_DAY_MASTER_POLARITY_SPOUSE_STAR_SEMANTIC_CORRESPONDENCE_ESTABLISHED'
    | 'UPSTREAM_THREE_OF_FIVE_AUTHORITY_STATE_INVALID';
  domain: 'relationship';
  subcategory: 'spouse';
  temporalScope: 'natal';
  statusClass: 'research';
  governance: typeof RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_SEMANTIC_CORRESPONDENCE_GOVERNANCE;
  exactUpstreamThreeOfFiveStateAccepted: boolean;
  canonicalInputPath: 'derivedFacts.dayMaster.yinYang';
  canonicalDayMasterPolarityContractGoverned: true;
  t5FamilyTupleRequired: false;
  t5SubtypeReconstructionAuthorized: false;
  generalRelationshipRelabellingAuthorized: false;
  explicitRoleNeutralNatalMappingEstablished: boolean;
  currentGovernedMethodSemanticCorrespondenceEstablished: boolean;
  currentRelationshipT6InputPathEstablished: false;
  semanticCorrespondenceGapClosedByThisEvidence: boolean;
  relationshipT6InputGapClosedByThisEvidence: false;
  qualifyingPrimaryWitnessRemainsClosed: boolean;
  independentNormativeProvenanceRemainsClosed: boolean;
  authorityGapsClosedCount: 4 | 0;
  authorityGapsOpenCount: 1 | 5;
  authorityAdmissionReady: false;
  crossSourceStitchingAuthorized: false;
  spouseT8ProducerReady: false;
  producerRegistered: false;
  ruleRegistered: false;
  claimTypeRegistered: false;
  interpretationPackRegistered: false;
  consumerNarrativeActivated: false;
  compatibilityConsumerActivated: false;
  previewDefaultRouteChanged: false;
  productionPromotionReady: false;
  productionState: 'HOLD';
  controlIds: readonly (typeof RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_SEMANTIC_CORRESPONDENCE_GOVERNANCE_CONTROL_IDS)[number][];
  controlCount: number;
  recommendedNextAction:
    | 'GOVERN_RELATIONSHIP_T6_INPUT_FOR_ADMITTED_ROLE_NEUTRAL_SPOUSE_SELECTOR'
    | 'REESTABLISH_THREE_OF_FIVE_AUTHORITY_STATE';
}

type UpstreamReport = ReturnType<
  typeof buildRelationshipSpouseT8DailyAstroNeutralColumnCompatibilityAccessBoundaryEvidence
>;

function contentAddressedUpstreamIdentityValid(upstream: UpstreamReport): boolean {
  const { evidenceId, ...material } = upstream;
  return (
    evidenceId ===
    `relationship_spouse_t8_dailyastro_neutral_column_compatibility_access_boundary_${deterministicContentHash(material).slice(0, 24)}`
  );
}

function upstreamThreeOfFiveStateAccepted(upstream: UpstreamReport): boolean {
  return (
    contentAddressedUpstreamIdentityValid(upstream) &&
    upstream.status ===
      'PUBLIC_INDEXED_OPERATIONAL_ROLE_NEUTRAL_TWO_CHART_COMPATIBILITY_SIGNAL_NO_FULL_BODY_NO_SINGLE_NATIVE_ADMISSION_DECISION' &&
    upstream.exactUpstreamThreeOfFiveStateAccepted === true &&
    upstream.dailyAstroAdditionalAuthorityGapsClosedCount === 0 &&
    upstream.explicitRoleNeutralNatalMappingEstablished === true &&
    upstream.currentGovernedMethodSemanticCorrespondenceEstablished === false &&
    upstream.currentRelationshipT6InputPathEstablished === false &&
    upstream.qualifyingPrimaryWitnessRemainsClosed === true &&
    upstream.independentNormativeProvenanceRemainsClosed === true &&
    upstream.authorityGapsClosedCount === 3 &&
    upstream.authorityGapsOpenCount === 2 &&
    upstream.authorityAdmissionReady === false &&
    upstream.crossSourceStitchingAuthorized === false &&
    upstream.spouseT8ProducerReady === false &&
    upstream.productionPromotionReady === false &&
    upstream.productionState === 'HOLD'
  );
}

export function buildRelationshipSpouseT8RoleNeutralSemanticCorrespondenceGovernance(): RelationshipSpouseT8RoleNeutralSemanticCorrespondenceGovernanceReport {
  const upstream =
    buildRelationshipSpouseT8DailyAstroNeutralColumnCompatibilityAccessBoundaryEvidence();
  const accepted = upstreamThreeOfFiveStateAccepted(upstream);
  const material = {
    evidenceVersion:
      RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_SEMANTIC_CORRESPONDENCE_GOVERNANCE_VERSION,
    upstreamEvidenceId: upstream.evidenceId,
    status: accepted
      ? ('GOVERNED_CANONICAL_DAY_MASTER_POLARITY_SPOUSE_STAR_SEMANTIC_CORRESPONDENCE_ESTABLISHED' as const)
      : ('UPSTREAM_THREE_OF_FIVE_AUTHORITY_STATE_INVALID' as const),
    domain: 'relationship' as const,
    subcategory: 'spouse' as const,
    temporalScope: 'natal' as const,
    statusClass: 'research' as const,
    governance: RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_SEMANTIC_CORRESPONDENCE_GOVERNANCE,
    exactUpstreamThreeOfFiveStateAccepted: accepted,
    canonicalInputPath: 'derivedFacts.dayMaster.yinYang' as const,
    canonicalDayMasterPolarityContractGoverned: true as const,
    t5FamilyTupleRequired: false as const,
    t5SubtypeReconstructionAuthorized: false as const,
    generalRelationshipRelabellingAuthorized: false as const,
    explicitRoleNeutralNatalMappingEstablished: accepted,
    currentGovernedMethodSemanticCorrespondenceEstablished: accepted,
    currentRelationshipT6InputPathEstablished: false as const,
    semanticCorrespondenceGapClosedByThisEvidence: accepted,
    relationshipT6InputGapClosedByThisEvidence: false as const,
    qualifyingPrimaryWitnessRemainsClosed: accepted,
    independentNormativeProvenanceRemainsClosed: accepted,
    authorityGapsClosedCount: accepted ? (4 as const) : (0 as const),
    authorityGapsOpenCount: accepted ? (1 as const) : (5 as const),
    authorityAdmissionReady: false as const,
    crossSourceStitchingAuthorized: false as const,
    spouseT8ProducerReady: false as const,
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
      ? RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_SEMANTIC_CORRESPONDENCE_GOVERNANCE_CONTROL_IDS
      : Object.freeze([]),
    controlCount: accepted
      ? RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_SEMANTIC_CORRESPONDENCE_GOVERNANCE_CONTROL_IDS.length
      : 0,
    recommendedNextAction: accepted
      ? ('GOVERN_RELATIONSHIP_T6_INPUT_FOR_ADMITTED_ROLE_NEUTRAL_SPOUSE_SELECTOR' as const)
      : ('REESTABLISH_THREE_OF_FIVE_AUTHORITY_STATE' as const),
  };

  return {
    evidenceId: `relationship_spouse_t8_role_neutral_semantic_correspondence_governance_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
