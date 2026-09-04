import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_AUTHORITY_REQUIREMENTS,
  type RelationshipSpouseT8AuthorityGapId,
} from './relationship-spouse-t8-authority-acquisition-readiness-review.js';
import {
  RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_EXECUTION_EVIDENCE_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_EXECUTION_EVIDENCE_RECORDS,
  RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_ACTIVE_REMEDIATION_EXECUTION_EVIDENCE_VERSION,
  type RelationshipSpouseT8CurrentT5T6SemanticBridgeActiveRemediationExecutionEvidenceReport,
} from './relationship-spouse-t8-current-t5-t6-semantic-bridge-active-remediation-execution-evidence.js';

export const RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_REMEDIATION_EVIDENCE_ADEQUACY_RESIDUAL_PATH_REASSESSMENT_REVIEW_VERSION =
  'myeonghwa-relationship-spouse-t8-current-t5-t6-semantic-bridge-remediation-evidence-adequacy-residual-path-reassessment-review-v1' as const;

export type RelationshipSpouseT8BridgeResidualPathId =
  | 'WYG_0810_DIRECT_FACSIMILE_PAGE_BINDING'
  | 'YUANHAI_PRIMARY_WITNESS_CORROBORATION_UPGRADE'
  | 'MODERN_GENDER_NEUTRAL_SPOUSE_APPLICABILITY_AUTHORITY_DISCOVERY'
  | 'SPOUSE_MULTI_CLAIM_COMPOSITION_SCOPE_AUTHORITY_DISCOVERY';

export type RelationshipSpouseT8BridgeResidualPathStatus =
  | 'TARGETED_PRIMARY_WITNESS_ACCESS_REQUIRED'
  | 'ACTIVE_PRIMARY_CORROBORATION_UPGRADE_REQUIRED'
  | 'ACTIVE_DOMAIN_APPLICABILITY_AUTHORITY_DISCOVERY_REQUIRED'
  | 'ACTIVE_COMPOSITION_SCOPE_AUTHORITY_DISCOVERY_REQUIRED';

export interface RelationshipSpouseT8BridgeResidualPath {
  pathId: RelationshipSpouseT8BridgeResidualPathId;
  status: RelationshipSpouseT8BridgeResidualPathStatus;
  targetGapIds: readonly RelationshipSpouseT8AuthorityGapId[];
  objective: string;
  knownAccessTargetUrl: string | null;
  existingExecutionEvidenceMaySatisfyAuthority: false;
  newEvidenceRequired: true;
  sourceBoundCorrespondenceRequired: true;
  explicitApplicabilityBoundaryRequired: true;
  independentNormativeProvenanceRequiredForAdmission: true;
  crossSourceStitchingForSameGapAllowed: false;
  executionAuthorizedByThisReview: false;
}

const SEMANTIC_AND_PROVENANCE_GAPS = Object.freeze([
  'SPOUSE_SPECIFIC_SEMANTIC_BINDING_MISSING',
  'SPOUSE_NORMATIVE_PROVENANCE_REVIEW_MISSING',
] as const satisfies readonly RelationshipSpouseT8AuthorityGapId[]);

const APPLICABILITY_GAP = Object.freeze([
  'SPOUSE_APPLICABILITY_BOUNDARY_MISSING',
] as const satisfies readonly RelationshipSpouseT8AuthorityGapId[]);

const COMPOSITION_SCOPE_GAPS = Object.freeze([
  'SPOUSE_MULTI_CLAIM_COMPOSITION_METHOD_MISSING',
  'SPOUSE_SCOPE_LIMITS_AND_EXCEPTIONS_MISSING',
] as const satisfies readonly RelationshipSpouseT8AuthorityGapId[]);

export const RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_RESIDUAL_PATHS = Object.freeze([
  Object.freeze({
    pathId: 'WYG_0810_DIRECT_FACSIMILE_PAGE_BINDING',
    status: 'TARGETED_PRIMARY_WITNESS_ACCESS_REQUIRED',
    targetGapIds: SEMANTIC_AND_PROVENANCE_GAPS,
    objective:
      'Bind the publicly indexed 文淵閣四庫全書 0810冊 facsimile to the exact 三命通會 volume-five and volume-six target folios, inspect the actual page images, and compare them against the already observed transcription/indexed text before reevaluating any historical Ten-God-to-spouse correspondence.',
    knownAccessTargetUrl:
      'https://zh.wikisource.org/zh-hans/Index:%E6%96%87%E6%B7%B5%E9%96%A3%E5%9B%9B%E5%BA%AB%E5%85%A8%E6%9B%B8_0810%E5%86%8A.djvu',
    existingExecutionEvidenceMaySatisfyAuthority: false,
    newEvidenceRequired: true,
    sourceBoundCorrespondenceRequired: true,
    explicitApplicabilityBoundaryRequired: true,
    independentNormativeProvenanceRequiredForAdmission: true,
    crossSourceStitchingForSameGapAllowed: false,
    executionAuthorizedByThisReview: false,
  }),
  Object.freeze({
    pathId: 'YUANHAI_PRIMARY_WITNESS_CORROBORATION_UPGRADE',
    status: 'ACTIVE_PRIMARY_CORROBORATION_UPGRADE_REQUIRED',
    targetGapIds: SEMANTIC_AND_PROVENANCE_GAPS,
    objective:
      'Upgrade the 淵海子平 六親總篇 transcription lead to an independently inspectable primary or otherwise verified witness with exact locator and bounded context; transcription agreement alone remains corroboration discovery evidence.',
    knownAccessTargetUrl: null,
    existingExecutionEvidenceMaySatisfyAuthority: false,
    newEvidenceRequired: true,
    sourceBoundCorrespondenceRequired: true,
    explicitApplicabilityBoundaryRequired: true,
    independentNormativeProvenanceRequiredForAdmission: true,
    crossSourceStitchingForSameGapAllowed: false,
    executionAuthorizedByThisReview: false,
  }),
  Object.freeze({
    pathId: 'MODERN_GENDER_NEUTRAL_SPOUSE_APPLICABILITY_AUTHORITY_DISCOVERY',
    status: 'ACTIVE_DOMAIN_APPLICABILITY_AUTHORITY_DISCOVERY_REQUIRED',
    targetGapIds: APPLICABILITY_GAP,
    objective:
      'Discover and review separately governed authority for whether any historical spouse-role mapping can support a gender-neutral modern spouse product contract without inferring user or partner sex and without rewriting historical source meaning.',
    knownAccessTargetUrl: null,
    existingExecutionEvidenceMaySatisfyAuthority: false,
    newEvidenceRequired: true,
    sourceBoundCorrespondenceRequired: true,
    explicitApplicabilityBoundaryRequired: true,
    independentNormativeProvenanceRequiredForAdmission: true,
    crossSourceStitchingForSameGapAllowed: false,
    executionAuthorizedByThisReview: false,
  }),
  Object.freeze({
    pathId: 'SPOUSE_MULTI_CLAIM_COMPOSITION_SCOPE_AUTHORITY_DISCOVERY',
    status: 'ACTIVE_COMPOSITION_SCOPE_AUTHORITY_DISCOVERY_REQUIRED',
    targetGapIds: COMPOSITION_SCOPE_GAPS,
    objective:
      'Discover authority that explicitly governs which current upstream claim classes may compose into spouse-specific T8 synthesis, how conflict or ambiguity is preserved, and which spouse outcomes or partner attributes remain excluded; a single historical role symbol may not supply this method.',
    knownAccessTargetUrl: null,
    existingExecutionEvidenceMaySatisfyAuthority: false,
    newEvidenceRequired: true,
    sourceBoundCorrespondenceRequired: true,
    explicitApplicabilityBoundaryRequired: true,
    independentNormativeProvenanceRequiredForAdmission: true,
    crossSourceStitchingForSameGapAllowed: false,
    executionAuthorizedByThisReview: false,
  }),
] as const satisfies readonly RelationshipSpouseT8BridgeResidualPath[]);

export const RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_RESIDUAL_REASSESSMENT_CONTROL_IDS = Object.freeze([
  'EXECUTION_EVIDENCE_IS_ADEQUATE_TO_ESTABLISH_RESEARCH_OUTCOME_NOT_SPOUSE_AUTHORITY',
  'WYG_IMAGE_ACCESS_FAILURE_DOES_NOT_IMPLY_TARGET_PASSAGE_OR_WITNESS_NONEXISTENCE',
  'WYG_0810_PUBLIC_FACSIMILE_INDEX_IS_A_TARGETED_ACCESS_PATH_NOT_AN_INSPECTED_WITNESS',
  'TRANSCRIPTION_AGREEMENT_DOES_NOT_SATISFY_PRIMARY_WITNESS_OR_NORMATIVE_PROVENANCE',
  'YUANHAI_CORROBORATION_MUST_BE_UPGRADED_INDEPENDENTLY_BEFORE_PROVENANCE_ADMISSION',
  'HISTORICAL_HUSBAND_WIFE_ROLE_SPLIT_REMAINS_EXPLICIT_AND_MAY_NOT_BE_UNIVERSALIZED',
  'MODERN_GENDER_NEUTRAL_APPLICABILITY_REQUIRES_SEPARATE_AUTHORITY',
  'MULTI_CLAIM_COMPOSITION_AND_SCOPE_REQUIRE_SEPARATE_GOVERNED_AUTHORITY',
  'NO_PARTNER_ATTRIBUTE_MARRIAGE_BREAKUP_FIDELITY_TIMING_OR_COMPATIBILITY_PROMOTION',
  'NO_CURRENT_RELATIONSHIP_T6_PATH_OR_RESIDUAL_T6_TASK_IS_CREATED',
  'NO_CROSS_SOURCE_OR_CROSS_PATH_STITCHING_TO_SIMULATE_SINGLE_GAP_AUTHORITY',
  'ALL_FIVE_SPOUSE_T8_AUTHORITY_GAPS_REMAIN_OPEN',
  'RESIDUAL_PATH_SELECTION_DOES_NOT_AUTHORIZE_EXECUTION_OR_AUTHORITY_PROMOTION',
  'NO_SPOUSE_T8_RULE_CLAIM_PACK_NARRATIVE_PREVIEW_OR_PRODUCTION_ARTIFACT',
] as const);

export interface RelationshipSpouseT8CurrentT5T6SemanticBridgeRemediationEvidenceAdequacyResidualPathReassessmentReviewReport {
  reviewId: string;
  reviewVersion: typeof RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_REMEDIATION_EVIDENCE_ADEQUACY_RESIDUAL_PATH_REASSESSMENT_REVIEW_VERSION;
  status:
    | 'RESOLVED_RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_REMEDIATION_EVIDENCE_ADEQUACY_RESIDUAL_PATH_REASSESSMENT'
    | 'UPSTREAM_EXECUTION_EVIDENCE_BOUNDARY_INVALID';
  decision:
    | 'EXECUTION_OUTCOMES_VALID_ZERO_AUTHORITY_FOUR_RESIDUAL_PATHS_SELECTED_ALL_FIVE_GAPS_OPEN'
    | 'REMEDIATION_EVIDENCE_ADEQUACY_RESIDUAL_PATH_REASSESSMENT_NOT_ESTABLISHED';
  upstreamExecutionEvidenceId: string;
  exactExecutionEvidenceBoundaryAccepted: boolean;
  domain: 'relationship';
  subcategory: 'spouse';
  temporalScope: 'natal';
  statusClass: 'research';
  executionEvidenceAdequateForResearchOutcomeOnly: boolean;
  executionEvidenceAdequateForAuthorityAdmission: false;
  executionEvidenceAdequateForGapClosure: false;
  requiredWygDirectImagesStillMissing: boolean;
  requiredWygWitnessNonexistenceInferred: false;
  wyg0810TargetedFacsimileAccessPathSelected: boolean;
  wyg0810DirectTargetPagesAlreadyInspectedByThisReview: false;
  yuanhaiTranscriptionCorroborationLeadPreserved: boolean;
  yuanhaiIndependentPrimaryWitnessStillRequired: boolean;
  independentNormativeProvenanceEstablished: false;
  historicalMappingGenderRoleBound: boolean;
  genderNeutralSpouseApplicabilityEstablished: false;
  modernApplicabilityAuthorityDiscoveryRequired: boolean;
  compositionAuthorityStillMissing: boolean;
  scopeLimitsAuthorityStillMissing: boolean;
  residualPaths: readonly RelationshipSpouseT8BridgeResidualPath[];
  residualPathCount: 4 | 0;
  targetedPrimaryWitnessAccessPathCount: 1 | 0;
  activeAuthorityDiscoveryPathCount: 3 | 0;
  activeAuthorityDiscoveryPathIds: readonly RelationshipSpouseT8BridgeResidualPathId[];
  rawHistoricalMappingPromotionAuthorized: false;
  userOrPartnerSexInferenceAuthorized: false;
  partnerAttributeOrOutcomePromotionAuthorized: false;
  compatibilityOrTimingPromotionAuthorized: false;
  currentRelationshipT6InputPathEstablished: false;
  relationshipT6ResidualPathCreated: false;
  crossSourceStitchingAuthorized: false;
  crossPathStitchingAuthorized: false;
  allFiveGapsRemainOpen: true;
  unresolvedGapIds: readonly RelationshipSpouseT8AuthorityGapId[];
  authorityAcquiredByThisGate: false;
  authorityGapClosedByThisGate: false;
  residualPathExecutionAuthorizedByThisGate: false;
  spouseT8RuleAuthoringAuthorized: false;
  spouseT8ClaimTypeCreationAuthorized: false;
  spouseInterpretationPackCreationAuthorized: false;
  consumerNarrativeAuthorized: false;
  compatibilityAuthorityAuthorized: false;
  previewDefaultSwitchAuthorized: false;
  productionPromotionAuthorized: false;
  controlIds: readonly (typeof RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_RESIDUAL_REASSESSMENT_CONTROL_IDS)[number][];
  controlCount: 14 | 0;
  controlsFrozen: boolean;
  implementationEffects: {
    directWitnessAccessesPerformed: 0;
    primaryWitnessDiscoveryExecutionsPerformed: 0;
    authorityDiscoveryExecutionsPerformed: 0;
    residualPathsSelected: 4 | 0;
    candidatesRegistered: 0;
    authorityCandidatesAccepted: 0;
    authorityGapsClosed: 0;
    ruleDefinitionsCreated: 0;
    claimTypesCreated: 0;
    interpretationPacksCreated: 0;
    narrativePlansCreated: 0;
    previewRoutesChanged: 0;
  };
  recommendedNextGate:
    | 'RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_AUTHORITY_PATH_EXECUTION_READINESS_REVIEW'
    | 'RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_ACTIVE_REMEDIATION_EXECUTION_EVIDENCE';
}

const ALL_GAP_IDS = Object.freeze(
  RELATIONSHIP_SPOUSE_T8_AUTHORITY_REQUIREMENTS.map((requirement) => requirement.gapId),
);

const ACTIVE_DISCOVERY_PATH_IDS = Object.freeze([
  'YUANHAI_PRIMARY_WITNESS_CORROBORATION_UPGRADE',
  'MODERN_GENDER_NEUTRAL_SPOUSE_APPLICABILITY_AUTHORITY_DISCOVERY',
  'SPOUSE_MULTI_CLAIM_COMPOSITION_SCOPE_AUTHORITY_DISCOVERY',
] as const satisfies readonly RelationshipSpouseT8BridgeResidualPathId[]);

function contentAddressedExecutionEvidenceIdentityValid(
  evidence: RelationshipSpouseT8CurrentT5T6SemanticBridgeActiveRemediationExecutionEvidenceReport,
): boolean {
  const { evidenceId, ...material } = evidence;
  return (
    evidenceId ===
    `relationship_spouse_t8_current_bridge_active_remediation_evidence_${deterministicContentHash(material).slice(0, 24)}`
  );
}

function exactExecutionEvidenceBoundaryAccepted(
  evidence: RelationshipSpouseT8CurrentT5T6SemanticBridgeActiveRemediationExecutionEvidenceReport,
): boolean {
  return (
    contentAddressedExecutionEvidenceIdentityValid(evidence) &&
    evidence.evidenceVersion ===
      RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_ACTIVE_REMEDIATION_EXECUTION_EVIDENCE_VERSION &&
    evidence.status ===
      'RESOLVED_RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_ACTIVE_REMEDIATION_EXECUTION_EVIDENCE' &&
    evidence.decision ===
      'V5_V6_DIRECT_FACSIMILE_ACCESS_BLOCKED_PARTIAL_TEXT_AND_INDEPENDENT_CLASSIC_LEADS_MODERN_SCOPE_REQUIRES_ADDITIONAL_AUTHORITY_NO_AUTHORITY_ACQUIRED' &&
    evidence.exactReadinessBoundaryAccepted &&
    evidence.executionPerformed &&
    evidence.taskEvidenceRecordCount === 3 &&
    deterministicContentHash(evidence.taskEvidenceRecords) ===
      deterministicContentHash(RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_EXECUTION_EVIDENCE_RECORDS) &&
    evidence.totalSourceAttemptCount === 9 &&
    evidence.samyeongV5PrimaryDisposition === 'ACCESS_BLOCKED' &&
    evidence.samyeongV5DirectFacsimileImageInspected === false &&
    evidence.samyeongV5RequiredWygPrimaryWitnessSatisfied === false &&
    evidence.samyeongV6PrimaryDisposition === 'ACCESS_BLOCKED' &&
    evidence.samyeongV6WygIndexedPageLocatorConfirmed &&
    evidence.samyeongV6DirectFacsimileImageInspected === false &&
    evidence.samyeongV6RequiredWygPrimaryWitnessSatisfied === false &&
    evidence.independentClassicCorroborationLeadObserved &&
    evidence.independentClassicCorroborationSourceCount === 1 &&
    evidence.independentNormativeProvenanceEstablished === false &&
    evidence.modernScopePrimaryDisposition === 'MODERN_SCOPE_REQUIRES_ADDITIONAL_AUTHORITY' &&
    evidence.modernScopeAdjudicationPerformed &&
    evidence.historicalMappingGenderRoleBound &&
    evidence.genderNeutralSpouseApplicabilityEstablished === false &&
    evidence.modernScopeAdditionalAuthorityRequired &&
    evidence.currentRelationshipT6InputPathEstablished === false &&
    evidence.currentRelationshipT6ExecutionTaskCreated === false &&
    evidence.allFiveGapsRemainOpen &&
    deterministicContentHash(evidence.unresolvedGapIds) === deterministicContentHash(ALL_GAP_IDS) &&
    evidence.authorityAcquiredByThisGate === false &&
    evidence.authorityGapClosedByThisGate === false &&
    evidence.productionPromotionAuthorized === false &&
    evidence.controlsFrozen &&
    evidence.controlCount === 15 &&
    deterministicContentHash(evidence.controlIds) ===
      deterministicContentHash(RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_EXECUTION_EVIDENCE_CONTROL_IDS) &&
    evidence.recommendedNextGate ===
      'RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_REMEDIATION_EVIDENCE_ADEQUACY_RESIDUAL_PATH_REASSESSMENT_REVIEW'
  );
}

function finalized(
  material: Omit<
    RelationshipSpouseT8CurrentT5T6SemanticBridgeRemediationEvidenceAdequacyResidualPathReassessmentReviewReport,
    'reviewId'
  >,
): RelationshipSpouseT8CurrentT5T6SemanticBridgeRemediationEvidenceAdequacyResidualPathReassessmentReviewReport {
  return {
    reviewId: `relationship_spouse_t8_current_bridge_residual_path_reassessment_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildRelationshipSpouseT8CurrentT5T6SemanticBridgeRemediationEvidenceAdequacyResidualPathReassessmentReview(
  evidence: RelationshipSpouseT8CurrentT5T6SemanticBridgeActiveRemediationExecutionEvidenceReport,
): RelationshipSpouseT8CurrentT5T6SemanticBridgeRemediationEvidenceAdequacyResidualPathReassessmentReviewReport {
  const accepted = exactExecutionEvidenceBoundaryAccepted(evidence);

  return finalized({
    reviewVersion:
      RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_REMEDIATION_EVIDENCE_ADEQUACY_RESIDUAL_PATH_REASSESSMENT_REVIEW_VERSION,
    status: accepted
      ? 'RESOLVED_RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_REMEDIATION_EVIDENCE_ADEQUACY_RESIDUAL_PATH_REASSESSMENT'
      : 'UPSTREAM_EXECUTION_EVIDENCE_BOUNDARY_INVALID',
    decision: accepted
      ? 'EXECUTION_OUTCOMES_VALID_ZERO_AUTHORITY_FOUR_RESIDUAL_PATHS_SELECTED_ALL_FIVE_GAPS_OPEN'
      : 'REMEDIATION_EVIDENCE_ADEQUACY_RESIDUAL_PATH_REASSESSMENT_NOT_ESTABLISHED',
    upstreamExecutionEvidenceId: evidence.evidenceId,
    exactExecutionEvidenceBoundaryAccepted: accepted,
    domain: 'relationship',
    subcategory: 'spouse',
    temporalScope: 'natal',
    statusClass: 'research',
    executionEvidenceAdequateForResearchOutcomeOnly: accepted,
    executionEvidenceAdequateForAuthorityAdmission: false,
    executionEvidenceAdequateForGapClosure: false,
    requiredWygDirectImagesStillMissing: accepted,
    requiredWygWitnessNonexistenceInferred: false,
    wyg0810TargetedFacsimileAccessPathSelected: accepted,
    wyg0810DirectTargetPagesAlreadyInspectedByThisReview: false,
    yuanhaiTranscriptionCorroborationLeadPreserved: accepted,
    yuanhaiIndependentPrimaryWitnessStillRequired: accepted,
    independentNormativeProvenanceEstablished: false,
    historicalMappingGenderRoleBound: accepted,
    genderNeutralSpouseApplicabilityEstablished: false,
    modernApplicabilityAuthorityDiscoveryRequired: accepted,
    compositionAuthorityStillMissing: accepted,
    scopeLimitsAuthorityStillMissing: accepted,
    residualPaths: accepted
      ? RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_RESIDUAL_PATHS
      : Object.freeze([]),
    residualPathCount: accepted ? 4 : 0,
    targetedPrimaryWitnessAccessPathCount: accepted ? 1 : 0,
    activeAuthorityDiscoveryPathCount: accepted ? 3 : 0,
    activeAuthorityDiscoveryPathIds: accepted ? ACTIVE_DISCOVERY_PATH_IDS : Object.freeze([]),
    rawHistoricalMappingPromotionAuthorized: false,
    userOrPartnerSexInferenceAuthorized: false,
    partnerAttributeOrOutcomePromotionAuthorized: false,
    compatibilityOrTimingPromotionAuthorized: false,
    currentRelationshipT6InputPathEstablished: false,
    relationshipT6ResidualPathCreated: false,
    crossSourceStitchingAuthorized: false,
    crossPathStitchingAuthorized: false,
    allFiveGapsRemainOpen: true,
    unresolvedGapIds: ALL_GAP_IDS,
    authorityAcquiredByThisGate: false,
    authorityGapClosedByThisGate: false,
    residualPathExecutionAuthorizedByThisGate: false,
    spouseT8RuleAuthoringAuthorized: false,
    spouseT8ClaimTypeCreationAuthorized: false,
    spouseInterpretationPackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    compatibilityAuthorityAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    controlIds: accepted
      ? RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_RESIDUAL_REASSESSMENT_CONTROL_IDS
      : Object.freeze([]),
    controlCount: accepted ? 14 : 0,
    controlsFrozen: accepted,
    implementationEffects: {
      directWitnessAccessesPerformed: 0,
      primaryWitnessDiscoveryExecutionsPerformed: 0,
      authorityDiscoveryExecutionsPerformed: 0,
      residualPathsSelected: accepted ? 4 : 0,
      candidatesRegistered: 0,
      authorityCandidatesAccepted: 0,
      authorityGapsClosed: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
    },
    recommendedNextGate: accepted
      ? 'RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_AUTHORITY_PATH_EXECUTION_READINESS_REVIEW'
      : 'RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_ACTIVE_REMEDIATION_EXECUTION_EVIDENCE',
  });
}
