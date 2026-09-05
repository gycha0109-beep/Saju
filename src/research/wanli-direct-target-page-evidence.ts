import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_WANLI_MULTI_WITNESS_COLLATION_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_WANLI_MULTI_WITNESS_COLLATION_EVIDENCE_VERSION,
  RELATIONSHIP_SPOUSE_T8_WANLI_MULTI_WITNESS_COLLATION_RECORDS,
  type RelationshipSpouseT8WanliMultiWitnessCollationEvidenceReport,
} from './relationship-spouse-t8-wanli-multi-witness-collation-evidence.js';

export const WANLI_DIRECT_TARGET_PAGE_EVIDENCE_VERSION =
  'myeonghwa-wanli-direct-target-page-evidence-v1' as const;

export const WANLI_DIRECT_TARGET_PAGE_SOURCE_WITNESS = Object.freeze({
  sourceId: 'NLC892-411999029701-66491',
  institution: 'National Library of China',
  title: '三命通會',
  volumeLabel: '第14冊',
  volumePart: '卷之七下',
  pageCount: 63,
  sourceBytes: 21_351_812,
  sourceSha1: 'e23875add1ce23db1b3be3251433af3e0f46d641',
  sourceClass: 'institutional_wanli_print_facsimile',
} as const);

export const WANLI_DIRECT_TARGET_PAGE_RECORDS = Object.freeze([
  Object.freeze({
    scanPage: 46,
    sha256: 'd15171ce870f5ee6d53a9a7b71f31806e5d7e2c455665acbe3d173a139f578b5',
    observedHeading: '論六親',
    role: 'CONTEXT_ANCHOR',
    targetPassageVisible: false,
  }),
  Object.freeze({
    scanPage: 50,
    sha256: '44ddc6eaa4ad43bdb4d55b88e8aefd652ba52526a9cf186731197201ff825de2',
    observedHeading: '妻妾引例章',
    observedTargetExcerpt: '正財妻偏財妾也',
    role: 'DIRECT_TARGET',
    targetPassageVisible: true,
  }),
  Object.freeze({
    scanPage: 51,
    sha256: 'adb418b2bd7c53a956e69cf22ba4007b249ab9be4fd3aa4773224d1a85e3fa48',
    observedHeading: '子息引例章',
    role: 'NEXT_SECTION_BOUNDARY',
    targetPassageVisible: false,
  }),
] as const);

export const WANLI_DIRECT_TARGET_PAGE_CONTROL_IDS = Object.freeze([
  'DIRECT_TARGET_PAGE_EVIDENCE_ACCEPTS_ONLY_THE_EXACT_CONTENT_ADDRESSED_WANLI_MULTI_WITNESS_COLLATION_BOUNDARY',
  'NLC_VOLUME_14_SOURCE_ID_PAGE_COUNT_BYTE_COUNT_AND_SHA1_ARE_FROZEN',
  'SCAN_46_LUN_LIUQIN_CONTEXT_ANCHOR_IS_CONTENT_ADDRESSED_BY_SHA256',
  'SCAN_50_WIFE_CONCUBINE_EXAMPLE_TARGET_IS_CONTENT_ADDRESSED_BY_SHA256',
  'SCAN_51_ZIXI_EXAMPLE_NEXT_SECTION_BOUNDARY_IS_CONTENT_ADDRESSED_BY_SHA256',
  'SCAN_50_IS_BOUND_AS_THE_EXACT_FIRST_PRINT_TARGET_SCAN_PAGE',
  'SCAN_50_TARGET_IMAGE_WAS_DIRECTLY_VISUALLY_INSPECTED',
  'ADJACENT_SCAN_46_AND_51_SECTION_BOUNDARIES_GUARD_TARGET_CHAPTER_IDENTITY',
  'DIRECTLY_VISIBLE_HISTORICAL_GENDERED_WORDING_IS_RECORDED_AS_HISTORICAL_EVIDENCE_ONLY',
  'QUALIFYING_PRIMARY_WITNESS_GAP_IS_CLOSED_BY_DIRECT_PAGE_BINDING_AND_IMAGE_INSPECTION',
  'INDEPENDENT_NORMATIVE_PROVENANCE_FOR_CURRENT_SPOUSE_METHOD_REMAINS_NOT_ESTABLISHED',
  'EXPLICIT_ROLE_NEUTRAL_SPOUSE_NATAL_MAPPING_REMAINS_NOT_ESTABLISHED',
  'CURRENT_GOVERNED_METHOD_SEMANTIC_CORRESPONDENCE_REMAINS_NOT_ESTABLISHED',
  'CURRENT_RELATIONSHIP_T6_INPUT_PATH_REMAINS_NOT_ESTABLISHED',
  'EXACTLY_ONE_OF_FIVE_AUTHORITY_GAPS_IS_CLOSED',
  'AUTHORITY_ADMISSION_REMAINS_NOT_READY_WITH_FOUR_GAPS_OPEN',
  'NO_SPOUSE_T8_PRODUCER_RULE_CLAIM_PACK_NARRATIVE_PREVIEW_OR_PRODUCTION_EFFECT',
  'NO_CROSS_SOURCE_STITCHING_OR_MODERN_APPLICABILITY_INFERENCE_IS_AUTHORIZED',
] as const);

export type WanliDirectTargetPageAuthorityGapStatus = Readonly<{
  QUALIFYING_PRIMARY_WITNESS: 'CLOSED' | 'OPEN';
  INDEPENDENT_NORMATIVE_PROVENANCE: 'OPEN';
  EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING: 'OPEN';
  CURRENT_GOVERNED_SEMANTIC_CORRESPONDENCE: 'OPEN';
  RELATIONSHIP_T6_INPUT: 'OPEN';
}>;

export interface WanliDirectTargetPageEvidenceReport {
  evidenceId: string;
  evidenceVersion: typeof WANLI_DIRECT_TARGET_PAGE_EVIDENCE_VERSION;
  status:
    | 'RESOLVED_WANLI_DIRECT_TARGET_PAGE_EVIDENCE'
    | 'UPSTREAM_WANLI_MULTI_WITNESS_COLLATION_EVIDENCE_INVALID';
  decision:
    | 'WANLI_FIRST_PRINT_SCAN_50_DIRECTLY_INSPECTED_QUALIFYING_PRIMARY_WITNESS_ESTABLISHED_ONE_OF_FIVE_AUTHORITY_GAPS_CLOSED'
    | 'WANLI_DIRECT_TARGET_PAGE_EVIDENCE_NOT_ESTABLISHED';
  upstreamCollationEvidenceId: string;
  exactUpstreamCollationBoundaryAccepted: boolean;
  domain: 'relationship';
  subcategory: 'spouse';
  temporalScope: 'natal';
  statusClass: 'research';
  sourceWitness: typeof WANLI_DIRECT_TARGET_PAGE_SOURCE_WITNESS | null;
  directPageRecords: readonly (typeof WANLI_DIRECT_TARGET_PAGE_RECORDS)[number][];
  directPageRecordCount: 3 | 0;
  exactFirstPrintTargetScanPageEstablished: boolean;
  exactFirstPrintTargetScanPage: 50 | null;
  directFirstPrintTargetPageImageInspected: boolean;
  historicalGenderedRuleDirectlyVisible: boolean;
  qualifyingPrimaryWitnessEstablished: boolean;
  qualifyingPrimaryWitnessGapStatus: 'CLOSED' | 'OPEN';
  authorityGapStatus: WanliDirectTargetPageAuthorityGapStatus;
  authorityGapsClosedCount: 1 | 0;
  authorityGapsOpenCount: 4 | 5;
  allFiveAuthorityGapsRemainOpen: boolean;
  independentNormativeProvenanceForCurrentSpouseMethodEstablished: false;
  explicitRoleNeutralSpouseNatalMappingEstablished: false;
  currentGovernedMethodSemanticCorrespondenceEstablished: false;
  currentRelationshipT6InputPathEstablished: false;
  applicabilityGapStatus: 'PARTIAL_EVIDENCE_NOT_ADEQUATE';
  crossSourceStitchingAuthorized: false;
  qualifyingAuthorityCandidateCount: 0;
  authorityAcceptedCandidateCount: 0;
  authorityAdmissionReady: false;
  semanticProducerImplementationAuthorized: false;
  spouseT8RuleAuthoringAuthorized: false;
  spouseT8ClaimTypeCreationAuthorized: false;
  spouseInterpretationPackCreationAuthorized: false;
  consumerNarrativeAuthorized: false;
  previewDefaultSwitchAuthorized: false;
  productionPromotionAuthorized: false;
  controlIds: readonly (typeof WANLI_DIRECT_TARGET_PAGE_CONTROL_IDS)[number][];
  controlCount: 18 | 0;
  controlsFrozen: boolean;
  implementationEffects: {
    exactTargetScanPagesBound: 1 | 0;
    directTargetImagesInspected: 1 | 0;
    qualifyingPrimaryWitnessesEstablished: 1 | 0;
    authorityGapsClosed: 1 | 0;
    authorityRequirementsSatisfied: 1 | 0;
    authorityCandidatesAccepted: 0;
    methodologyChoicesMade: 0;
    ruleDefinitionsCreated: 0;
    claimTypesCreated: 0;
    interpretationPacksCreated: 0;
    narrativePlansCreated: 0;
    previewRoutesChanged: 0;
    productionRoutesChanged: 0;
  };
  recommendedNextAction:
    | 'CLOSE_REMAINING_INDEPENDENT_NORMATIVE_ROLE_NEUTRAL_NATAL_GOVERNED_SEMANTIC_AND_RELATIONSHIP_T6_GAPS_BEFORE_ANY_SPOUSE_T8_PRODUCER_GATE'
    | 'REESTABLISH_WANLI_MULTI_WITNESS_COLLATION_EVIDENCE';
}

function contentAddressedUpstreamIdentityValid(
  evidence: RelationshipSpouseT8WanliMultiWitnessCollationEvidenceReport,
): boolean {
  const { evidenceId, ...material } = evidence;
  return (
    evidenceId ===
    `relationship_spouse_t8_wanli_multi_witness_collation_evidence_${deterministicContentHash(material).slice(0, 24)}`
  );
}

function exactUpstreamCollationBoundaryAccepted(
  evidence: RelationshipSpouseT8WanliMultiWitnessCollationEvidenceReport,
): boolean {
  return (
    contentAddressedUpstreamIdentityValid(evidence) &&
    evidence.evidenceVersion ===
      RELATIONSHIP_SPOUSE_T8_WANLI_MULTI_WITNESS_COLLATION_EVIDENCE_VERSION &&
    evidence.status ===
      'RESOLVED_RELATIONSHIP_SPOUSE_T8_WANLI_MULTI_WITNESS_COLLATION_EVIDENCE' &&
    evidence.decision ===
      'WANLI_1578_FIRST_PRINT_IDENTITY_AND_THREE_WITNESS_COLLATION_PROVENANCE_FROZEN_TARGET_PAGE_STILL_UNBOUND_ZERO_GAP_CLOSURE' &&
    evidence.recordCount === 3 &&
    deterministicContentHash(evidence.records) ===
      deterministicContentHash(RELATIONSHIP_SPOUSE_T8_WANLI_MULTI_WITNESS_COLLATION_RECORDS) &&
    evidence.exactFirstPrintTargetScanPageEstablished === false &&
    evidence.directFirstPrintTargetPageImageInspected === false &&
    evidence.qualifyingPrimaryWitnessEstablished === false &&
    evidence.independentNormativeProvenanceForCurrentSpouseMethodEstablished === false &&
    evidence.explicitRoleNeutralSpouseNatalMappingEstablished === false &&
    evidence.currentGovernedMethodSemanticCorrespondenceEstablished === false &&
    evidence.currentRelationshipT6InputPathEstablished === false &&
    evidence.authorityGapsClosedCount === 0 &&
    evidence.allFiveAuthorityGapsRemainOpen &&
    evidence.authorityAdmissionReady === false &&
    evidence.semanticProducerImplementationAuthorized === false &&
    evidence.controlCount === 17 &&
    evidence.controlsFrozen &&
    deterministicContentHash(evidence.controlIds) ===
      deterministicContentHash(RELATIONSHIP_SPOUSE_T8_WANLI_MULTI_WITNESS_COLLATION_CONTROL_IDS)
  );
}

function finalized(
  material: Omit<WanliDirectTargetPageEvidenceReport, 'evidenceId'>,
): WanliDirectTargetPageEvidenceReport {
  return {
    evidenceId: `wanli_direct_target_page_evidence_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildWanliDirectTargetPageEvidence(
  upstream: RelationshipSpouseT8WanliMultiWitnessCollationEvidenceReport,
): WanliDirectTargetPageEvidenceReport {
  const accepted = exactUpstreamCollationBoundaryAccepted(upstream);

  return finalized({
    evidenceVersion: WANLI_DIRECT_TARGET_PAGE_EVIDENCE_VERSION,
    status: accepted
      ? 'RESOLVED_WANLI_DIRECT_TARGET_PAGE_EVIDENCE'
      : 'UPSTREAM_WANLI_MULTI_WITNESS_COLLATION_EVIDENCE_INVALID',
    decision: accepted
      ? 'WANLI_FIRST_PRINT_SCAN_50_DIRECTLY_INSPECTED_QUALIFYING_PRIMARY_WITNESS_ESTABLISHED_ONE_OF_FIVE_AUTHORITY_GAPS_CLOSED'
      : 'WANLI_DIRECT_TARGET_PAGE_EVIDENCE_NOT_ESTABLISHED',
    upstreamCollationEvidenceId: upstream.evidenceId,
    exactUpstreamCollationBoundaryAccepted: accepted,
    domain: 'relationship',
    subcategory: 'spouse',
    temporalScope: 'natal',
    statusClass: 'research',
    sourceWitness: accepted ? WANLI_DIRECT_TARGET_PAGE_SOURCE_WITNESS : null,
    directPageRecords: accepted ? WANLI_DIRECT_TARGET_PAGE_RECORDS : Object.freeze([]),
    directPageRecordCount: accepted ? 3 : 0,
    exactFirstPrintTargetScanPageEstablished: accepted,
    exactFirstPrintTargetScanPage: accepted ? 50 : null,
    directFirstPrintTargetPageImageInspected: accepted,
    historicalGenderedRuleDirectlyVisible: accepted,
    qualifyingPrimaryWitnessEstablished: accepted,
    qualifyingPrimaryWitnessGapStatus: accepted ? 'CLOSED' : 'OPEN',
    authorityGapStatus: Object.freeze({
      QUALIFYING_PRIMARY_WITNESS: accepted ? 'CLOSED' : 'OPEN',
      INDEPENDENT_NORMATIVE_PROVENANCE: 'OPEN',
      EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING: 'OPEN',
      CURRENT_GOVERNED_SEMANTIC_CORRESPONDENCE: 'OPEN',
      RELATIONSHIP_T6_INPUT: 'OPEN',
    }),
    authorityGapsClosedCount: accepted ? 1 : 0,
    authorityGapsOpenCount: accepted ? 4 : 5,
    allFiveAuthorityGapsRemainOpen: !accepted,
    independentNormativeProvenanceForCurrentSpouseMethodEstablished: false,
    explicitRoleNeutralSpouseNatalMappingEstablished: false,
    currentGovernedMethodSemanticCorrespondenceEstablished: false,
    currentRelationshipT6InputPathEstablished: false,
    applicabilityGapStatus: 'PARTIAL_EVIDENCE_NOT_ADEQUATE',
    crossSourceStitchingAuthorized: false,
    qualifyingAuthorityCandidateCount: 0,
    authorityAcceptedCandidateCount: 0,
    authorityAdmissionReady: false,
    semanticProducerImplementationAuthorized: false,
    spouseT8RuleAuthoringAuthorized: false,
    spouseT8ClaimTypeCreationAuthorized: false,
    spouseInterpretationPackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    controlIds: accepted ? WANLI_DIRECT_TARGET_PAGE_CONTROL_IDS : Object.freeze([]),
    controlCount: accepted ? 18 : 0,
    controlsFrozen: accepted,
    implementationEffects: {
      exactTargetScanPagesBound: accepted ? 1 : 0,
      directTargetImagesInspected: accepted ? 1 : 0,
      qualifyingPrimaryWitnessesEstablished: accepted ? 1 : 0,
      authorityGapsClosed: accepted ? 1 : 0,
      authorityRequirementsSatisfied: accepted ? 1 : 0,
      authorityCandidatesAccepted: 0,
      methodologyChoicesMade: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
      productionRoutesChanged: 0,
    },
    recommendedNextAction: accepted
      ? 'CLOSE_REMAINING_INDEPENDENT_NORMATIVE_ROLE_NEUTRAL_NATAL_GOVERNED_SEMANTIC_AND_RELATIONSHIP_T6_GAPS_BEFORE_ANY_SPOUSE_T8_PRODUCER_GATE'
      : 'REESTABLISH_WANLI_MULTI_WITNESS_COLLATION_EVIDENCE',
  });
}
