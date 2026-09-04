import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { RELATIONSHIP_SPOUSE_T8_AUTHORITY_REQUIREMENTS } from './relationship-spouse-t8-authority-acquisition-readiness-review.js';
import {
  RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_RESIDUAL_EXECUTION_CANDIDATES,
  RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_RESIDUAL_EXECUTION_EVIDENCE_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_RESIDUAL_TASK_EXECUTION_EVIDENCE,
  RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_AUTHORITY_PATH_EXECUTION_EVIDENCE_VERSION,
  type RelationshipSpouseT8CurrentT5T6SemanticBridgeResidualAuthorityPathExecutionEvidenceReport,
  type RelationshipSpouseT8ResidualEvidenceCandidateId,
} from './relationship-spouse-t8-current-t5-t6-semantic-bridge-residual-authority-path-execution-evidence.js';

export const RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_DISCOVERY_EVIDENCE_ADEQUACY_METHOD_BOUNDARY_REASSESSMENT_REVIEW_VERSION =
  'myeonghwa-relationship-spouse-t8-current-t5-t6-semantic-bridge-residual-discovery-evidence-adequacy-method-boundary-reassessment-review-v1' as const;

export type RelationshipSpouseT8ResidualMethodBoundaryClassId =
  | 'WYG_DIRECT_PRIMARY_IMAGE_VERIFICATION_FRONTIER'
  | 'YUANHAI_PRIMARY_PASSAGE_VERIFICATION_FRONTIER'
  | 'MODERN_APPLICABILITY_NORMATIVE_PROVENANCE_FRONTIER'
  | 'EXACT_CURRENT_CLAIM_CLASS_COMPOSITION_AUTHORITY_FRONTIER';

export type RelationshipSpouseT8ResidualMethodBoundaryClassStatus =
  | 'ACTIVE_PRIMARY_WITNESS_VERIFICATION'
  | 'ACTIVE_NORMATIVE_PROVENANCE_DISCOVERY'
  | 'ACTIVE_CURRENT_METHOD_AUTHORITY_DISCOVERY';

export interface RelationshipSpouseT8ResidualMethodBoundaryClass {
  classId: RelationshipSpouseT8ResidualMethodBoundaryClassId;
  status: RelationshipSpouseT8ResidualMethodBoundaryClassStatus;
  targetGapIds: readonly string[];
  retainedCandidateIds: readonly RelationshipSpouseT8ResidualEvidenceCandidateId[];
  objective: string;
  mayContinueWithoutHumanMethodologyChoice: boolean;
  humanMethodologyChoiceRequiredBeforeSemanticUse: false;
  currentEvidenceQualifiesAsAuthority: false;
  currentEvidenceClosesGap: false;
  executionAuthorizedByThisGate: false;
}

const SEMANTIC_AND_PROVENANCE_GAPS = Object.freeze([
  'SPOUSE_SPECIFIC_SEMANTIC_BINDING_MISSING',
  'SPOUSE_NORMATIVE_PROVENANCE_REVIEW_MISSING',
]);
const APPLICABILITY_GAPS = Object.freeze(['SPOUSE_APPLICABILITY_BOUNDARY_MISSING']);
const COMPOSITION_SCOPE_GAPS = Object.freeze([
  'SPOUSE_MULTI_CLAIM_COMPOSITION_METHOD_MISSING',
  'SPOUSE_SCOPE_LIMITS_AND_EXCEPTIONS_MISSING',
]);

export const RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_METHOD_BOUNDARY_RESIDUAL_CLASSES = Object.freeze([
  Object.freeze({
    classId: 'WYG_DIRECT_PRIMARY_IMAGE_VERIFICATION_FRONTIER',
    status: 'ACTIVE_PRIMARY_WITNESS_VERIFICATION',
    targetGapIds: SEMANTIC_AND_PROVENANCE_GAPS,
    retainedCandidateIds: Object.freeze([
      'WYG_0810_SCAN_CONTAINER',
      'KANRIPO_WYG_V5_FOLIO_INDEX',
      'KANRIPO_WYG_V6_FOLIO_INDEX',
    ] as const),
    objective:
      'Continue the same-source verification path by binding the exact WYG volume-five and volume-six folios to concrete pages in the located 0810 facsimile container and inspecting those target images. The scan container and Kanripo indexed text remain navigation/context evidence only until direct image verification succeeds.',
    mayContinueWithoutHumanMethodologyChoice: true,
    humanMethodologyChoiceRequiredBeforeSemanticUse: false,
    currentEvidenceQualifiesAsAuthority: false,
    currentEvidenceClosesGap: false,
    executionAuthorizedByThisGate: false,
  }),
  Object.freeze({
    classId: 'YUANHAI_PRIMARY_PASSAGE_VERIFICATION_FRONTIER',
    status: 'ACTIVE_PRIMARY_WITNESS_VERIFICATION',
    targetGapIds: SEMANTIC_AND_PROVENANCE_GAPS,
    retainedCandidateIds: Object.freeze([
      'NCL_06593_YUANHAI_MING_1600_SCAN',
      'NLC_YUANHAI_MING_SCAN_SERIES',
      'SHIDIAN_YUANHAI_VOL3_OCR_CONTEXT',
    ] as const),
    objective:
      'Retain the two independent Ming-edition scan candidates and the bounded OCR context while locating the exact primary passage page and verifying it directly against the scan. Work-level independence from 三命通會 does not itself establish normative provenance.',
    mayContinueWithoutHumanMethodologyChoice: true,
    humanMethodologyChoiceRequiredBeforeSemanticUse: false,
    currentEvidenceQualifiesAsAuthority: false,
    currentEvidenceClosesGap: false,
    executionAuthorizedByThisGate: false,
  }),
  Object.freeze({
    classId: 'MODERN_APPLICABILITY_NORMATIVE_PROVENANCE_FRONTIER',
    status: 'ACTIVE_NORMATIVE_PROVENANCE_DISCOVERY',
    targetGapIds: APPLICABILITY_GAPS,
    retainedCandidateIds: Object.freeze([
      'CLARIFY_GENDER_NEUTRAL_SPOUSE_POLICY',
      'OPENFATE_GENDER_NEUTRAL_SPOUSE_POLICY',
    ] as const),
    objective:
      'Preserve the observed modern role-neutral policy pattern as discovery evidence while seeking a separately governed, provenance-adequate authority for modern spouse applicability. Web editorial convergence may not rewrite historical source meaning or become semantic authority by repetition.',
    mayContinueWithoutHumanMethodologyChoice: true,
    humanMethodologyChoiceRequiredBeforeSemanticUse: false,
    currentEvidenceQualifiesAsAuthority: false,
    currentEvidenceClosesGap: false,
    executionAuthorizedByThisGate: false,
  }),
  Object.freeze({
    classId: 'EXACT_CURRENT_CLAIM_CLASS_COMPOSITION_AUTHORITY_FRONTIER',
    status: 'ACTIVE_CURRENT_METHOD_AUTHORITY_DISCOVERY',
    targetGapIds: COMPOSITION_SCOPE_GAPS,
    retainedCandidateIds: Object.freeze([
      'AUSPDAY_RELATIONSHIP_COMPOSITION_GUIDE',
      'SUPERBAZI_RELATIONSHIP_COMPOSITION_GUIDE',
    ] as const),
    objective:
      'Retain the multi-layer and non-single-symbol composition pattern only as discovery evidence while seeking source-bound authority that names the exact currently governed upstream claim classes, conflict or ambiguity handling, positive spouse scope, and explicit exclusions. Generic multi-layer advice may not be adapted into an unstated current-method composition contract.',
    mayContinueWithoutHumanMethodologyChoice: true,
    humanMethodologyChoiceRequiredBeforeSemanticUse: false,
    currentEvidenceQualifiesAsAuthority: false,
    currentEvidenceClosesGap: false,
    executionAuthorizedByThisGate: false,
  }),
] as const satisfies readonly RelationshipSpouseT8ResidualMethodBoundaryClass[]);

export const RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_METHOD_BOUNDARY_REASSESSMENT_CONTROL_IDS = Object.freeze([
  'RESIDUAL_EXECUTION_PARTIAL_EVIDENCE_IS_ADEQUATE_FOR_BOUNDARY_CLASSIFICATION_NOT_AUTHORITY_ADMISSION',
  'WYG_SCAN_CONTAINER_AND_INDEXED_TEXT_REMAIN_PRIMARY_IMAGE_VERIFICATION_FRONTIER_INPUTS_ONLY',
  'WYG_TARGET_FOLIO_TO_0810_PAGE_BINDING_AND_DIRECT_IMAGE_INSPECTION_REMAIN_OPEN',
  'YUANHAI_MING_SCAN_CANDIDATES_REMAIN_PRIMARY_PASSAGE_VERIFICATION_TARGETS_NOT_ADMITTED_PROVENANCE',
  'YUANHAI_OCR_CONTEXT_MAY_NOT_SUBSTITUTE_FOR_DIRECT_PRIMARY_PASSAGE_VERIFICATION',
  'MODERN_ROLE_NEUTRAL_WEB_POLICIES_REMAIN_DISCOVERY_LEADS_NOT_NORMATIVE_AUTHORITY',
  'NO_HISTORICAL_GENDER_ROLE_UNIVERSALIZATION_OR_USER_PARTNER_SEX_INFERENCE',
  'MODERN_MULTI_LAYER_GUIDES_REMAIN_DISCOVERY_LEADS_NOT_EXACT_CURRENT_CLAIM_CLASS_COMPOSITION_AUTHORITY',
  'NO_GENERIC_MULTI_LAYER_ADVICE_MAY_BE_ADAPTED_INTO_UNSTATED_CURRENT_METHOD_RULES',
  'NO_COMPETING_FOUNDATIONAL_METHOD_CHOICE_IS_INFERRED_FROM_CURRENT_EVIDENCE',
  'HUMAN_METHODOLOGY_CHOICE_IS_NOT_A_SUBSTITUTE_FOR_MISSING_NORMATIVE_AUTHORITY',
  'NO_CROSS_SOURCE_OR_CROSS_FRONTIER_STITCHING_TO_CLOSE_A_SINGLE_GAP',
  'ALL_FIVE_SPOUSE_T8_AUTHORITY_GAPS_REMAIN_OPEN',
  'NO_SPOUSE_T8_RULE_CLAIM_PACK_NARRATIVE_COMPATIBILITY_PREVIEW_OR_PRODUCTION_ARTIFACT',
] as const);

export interface RelationshipSpouseT8CurrentT5T6SemanticBridgeResidualDiscoveryEvidenceAdequacyMethodBoundaryReassessmentReviewReport {
  reviewId: string;
  reviewVersion: typeof RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_DISCOVERY_EVIDENCE_ADEQUACY_METHOD_BOUNDARY_REASSESSMENT_REVIEW_VERSION;
  status:
    | 'RESOLVED_RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_DISCOVERY_EVIDENCE_ADEQUACY_METHOD_BOUNDARY_REASSESSMENT'
    | 'UPSTREAM_RESIDUAL_EXECUTION_EVIDENCE_BOUNDARY_INVALID';
  decision:
    | 'PARTIAL_EVIDENCE_VALID_FOUR_CURRENT_METHOD_AUTHORITY_FRONTIERS_REMAIN_OPEN_NO_COMPETING_METHOD_ADOPTION_NO_AUTHORITY_ACQUIRED'
    | 'RESIDUAL_DISCOVERY_METHOD_BOUNDARY_NOT_ESTABLISHED';
  upstreamExecutionEvidenceId: string;
  exactExecutionEvidenceBoundaryAccepted: boolean;
  domain: 'relationship';
  subcategory: 'spouse';
  temporalScope: 'natal';
  statusClass: 'research';
  executionEvidenceAdequateForResidualClassificationOnly: boolean;
  executionEvidenceAdequateForAuthorityAdmission: false;
  executionEvidenceAdequateForGapClosure: false;
  residualClasses: readonly RelationshipSpouseT8ResidualMethodBoundaryClass[];
  residualClassCount: 4 | 0;
  activePrimaryWitnessVerificationFrontierCount: 2 | 0;
  activeNormativeProvenanceFrontierCount: 1 | 0;
  activeCurrentMethodAuthorityDiscoveryFrontierCount: 1 | 0;
  wygDirectPrimaryImageVerificationMayContinue: boolean;
  yuanhaiPrimaryPassageVerificationMayContinue: boolean;
  modernApplicabilityNormativeProvenanceDiscoveryMayContinue: boolean;
  exactCurrentClaimClassCompositionAuthorityDiscoveryMayContinue: boolean;
  humanMethodologyChoiceRequiredBeforeContinuingEvidenceAcquisition: false;
  competingFoundationalMethodChoiceSurfaced: false;
  methodologyChoiceMadeByThisGate: false;
  rawHistoricalGenderRoleSemanticUseAuthorized: false;
  modernEditorialPolicySemanticUseAuthorized: false;
  modernPractitionerCompositionSemanticUseAuthorized: false;
  directPrimaryImageRequirementWaived: false;
  independentNormativeProvenanceRequirementWaived: false;
  currentClaimClassCompositionRequirementWaived: false;
  crossSourceStitchingAuthorized: false;
  crossFrontierStitchingAuthorized: false;
  currentRelationshipT6InputPathEstablished: false;
  allFiveGapsRemainOpen: true;
  unresolvedGapIds: readonly string[];
  authorityAcquiredByThisGate: false;
  authorityGapClosedByThisGate: false;
  remediationExecutionAuthorizedByThisGate: false;
  spouseT8RuleAuthoringAuthorized: false;
  spouseT8ClaimTypeCreationAuthorized: false;
  spouseInterpretationPackCreationAuthorized: false;
  consumerNarrativeAuthorized: false;
  compatibilityAuthorityAuthorized: false;
  previewDefaultSwitchAuthorized: false;
  productionPromotionAuthorized: false;
  controlIds: readonly (typeof RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_METHOD_BOUNDARY_REASSESSMENT_CONTROL_IDS)[number][];
  controlCount: 14 | 0;
  controlsFrozen: boolean;
  implementationEffects: {
    residualClassesSelected: 4 | 0;
    activeRemediationFrontiersSelected: 4 | 0;
    humanMethodologyChoicesMade: 0;
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
    | 'RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_READINESS_REVIEW'
    | 'RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_AUTHORITY_PATH_EXECUTION_EVIDENCE';
}

const ALL_GAP_IDS = Object.freeze(
  RELATIONSHIP_SPOUSE_T8_AUTHORITY_REQUIREMENTS.map((requirement) => requirement.gapId),
);

function contentAddressedEvidenceIdentityValid(
  evidence: RelationshipSpouseT8CurrentT5T6SemanticBridgeResidualAuthorityPathExecutionEvidenceReport,
): boolean {
  const { evidenceId, ...material } = evidence;
  return (
    evidenceId ===
    `relationship_spouse_t8_current_bridge_residual_execution_evidence_${deterministicContentHash(material).slice(0, 24)}`
  );
}

function exactExecutionEvidenceBoundaryAccepted(
  evidence: RelationshipSpouseT8CurrentT5T6SemanticBridgeResidualAuthorityPathExecutionEvidenceReport,
): boolean {
  return (
    contentAddressedEvidenceIdentityValid(evidence) &&
    evidence.evidenceVersion ===
      RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_AUTHORITY_PATH_EXECUTION_EVIDENCE_VERSION &&
    evidence.status ===
      'RESOLVED_RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_AUTHORITY_PATH_EXECUTION_EVIDENCE' &&
    evidence.decision ===
      'WYG_PAGE_BINDING_PENDING_YUANHAI_PRIMARY_SCAN_CANDIDATES_LOCATED_IMAGE_VERIFICATION_PENDING_MODERN_APPLICABILITY_AND_COMPOSITION_PARTIAL_LEADS_NO_AUTHORITY_ACQUIRED' &&
    evidence.exactReadinessBoundaryAccepted &&
    evidence.executionPerformed &&
    evidence.taskEvidenceRecordCount === 4 &&
    deterministicContentHash(evidence.taskEvidenceRecords) ===
      deterministicContentHash(RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_RESIDUAL_TASK_EXECUTION_EVIDENCE) &&
    evidence.totalCandidateAttemptCount === 10 &&
    deterministicContentHash(evidence.candidateEvidence) ===
      deterministicContentHash(RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_RESIDUAL_EXECUTION_CANDIDATES) &&
    evidence.qualifyingCandidateCount === 0 &&
    evidence.authorityAcceptedCandidateCount === 0 &&
    evidence.authorityGapClosedCount === 0 &&
    evidence.wyg0810ScanContainerLocated &&
    evidence.wyg0810SamyeongRangeKnown &&
    evidence.wyg0810FolioToScanPageBindingEstablished === false &&
    evidence.wyg0810DirectTargetPageImageInspected === false &&
    evidence.yuanhaiPrimaryHistoricalScanCandidateCount === 2 &&
    evidence.yuanhaiPrimaryWitnessCandidateLocated &&
    evidence.yuanhaiExactPrimaryPassagePageLocatorEstablished === false &&
    evidence.yuanhaiDirectPrimaryPassageImageInspected === false &&
    evidence.yuanhaiBoundedOcrSpouseRoleContextConfirmed &&
    evidence.independentNormativeProvenanceEstablished === false &&
    evidence.modernApplicabilityPolicyLeadCount === 2 &&
    evidence.modernGenderNeutralPolicyPatternObserved &&
    evidence.modernNoSexInferencePolicyPatternObserved &&
    evidence.modernApplicabilityNormativeAuthorityAdequateCount === 0 &&
    evidence.compositionScopeLeadCount === 2 &&
    evidence.multiLayerCompositionPatternObserved &&
    evidence.scopeExclusionPatternObserved &&
    evidence.exactCurrentClaimClassCompositionAuthorityEstablished === false &&
    evidence.currentGovernedMethodSemanticCorrespondenceEstablished === false &&
    evidence.crossSourceStitchingAuthorized === false &&
    evidence.crossTaskStitchingAuthorized === false &&
    evidence.currentRelationshipT6InputPathEstablished === false &&
    evidence.allFiveGapsRemainOpen &&
    deterministicContentHash(evidence.unresolvedGapIds) === deterministicContentHash(ALL_GAP_IDS) &&
    evidence.authorityAcquiredByThisGate === false &&
    evidence.authorityGapClosedByThisGate === false &&
    evidence.productionPromotionAuthorized === false &&
    evidence.controlsFrozen &&
    evidence.controlCount === 14 &&
    deterministicContentHash(evidence.controlIds) ===
      deterministicContentHash(RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_RESIDUAL_EXECUTION_EVIDENCE_CONTROL_IDS) &&
    evidence.recommendedNextGate ===
      'RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_DISCOVERY_EVIDENCE_ADEQUACY_METHOD_BOUNDARY_REASSESSMENT_REVIEW'
  );
}

function finalized(
  material: Omit<
    RelationshipSpouseT8CurrentT5T6SemanticBridgeResidualDiscoveryEvidenceAdequacyMethodBoundaryReassessmentReviewReport,
    'reviewId'
  >,
): RelationshipSpouseT8CurrentT5T6SemanticBridgeResidualDiscoveryEvidenceAdequacyMethodBoundaryReassessmentReviewReport {
  return {
    reviewId: `relationship_spouse_t8_current_bridge_method_boundary_reassessment_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildRelationshipSpouseT8CurrentT5T6SemanticBridgeResidualDiscoveryEvidenceAdequacyMethodBoundaryReassessmentReview(
  evidence: RelationshipSpouseT8CurrentT5T6SemanticBridgeResidualAuthorityPathExecutionEvidenceReport,
): RelationshipSpouseT8CurrentT5T6SemanticBridgeResidualDiscoveryEvidenceAdequacyMethodBoundaryReassessmentReviewReport {
  const accepted = exactExecutionEvidenceBoundaryAccepted(evidence);

  return finalized({
    reviewVersion:
      RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_DISCOVERY_EVIDENCE_ADEQUACY_METHOD_BOUNDARY_REASSESSMENT_REVIEW_VERSION,
    status: accepted
      ? 'RESOLVED_RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_DISCOVERY_EVIDENCE_ADEQUACY_METHOD_BOUNDARY_REASSESSMENT'
      : 'UPSTREAM_RESIDUAL_EXECUTION_EVIDENCE_BOUNDARY_INVALID',
    decision: accepted
      ? 'PARTIAL_EVIDENCE_VALID_FOUR_CURRENT_METHOD_AUTHORITY_FRONTIERS_REMAIN_OPEN_NO_COMPETING_METHOD_ADOPTION_NO_AUTHORITY_ACQUIRED'
      : 'RESIDUAL_DISCOVERY_METHOD_BOUNDARY_NOT_ESTABLISHED',
    upstreamExecutionEvidenceId: evidence.evidenceId,
    exactExecutionEvidenceBoundaryAccepted: accepted,
    domain: 'relationship',
    subcategory: 'spouse',
    temporalScope: 'natal',
    statusClass: 'research',
    executionEvidenceAdequateForResidualClassificationOnly: accepted,
    executionEvidenceAdequateForAuthorityAdmission: false,
    executionEvidenceAdequateForGapClosure: false,
    residualClasses: accepted
      ? RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_METHOD_BOUNDARY_RESIDUAL_CLASSES
      : Object.freeze([]),
    residualClassCount: accepted ? 4 : 0,
    activePrimaryWitnessVerificationFrontierCount: accepted ? 2 : 0,
    activeNormativeProvenanceFrontierCount: accepted ? 1 : 0,
    activeCurrentMethodAuthorityDiscoveryFrontierCount: accepted ? 1 : 0,
    wygDirectPrimaryImageVerificationMayContinue: accepted,
    yuanhaiPrimaryPassageVerificationMayContinue: accepted,
    modernApplicabilityNormativeProvenanceDiscoveryMayContinue: accepted,
    exactCurrentClaimClassCompositionAuthorityDiscoveryMayContinue: accepted,
    humanMethodologyChoiceRequiredBeforeContinuingEvidenceAcquisition: false,
    competingFoundationalMethodChoiceSurfaced: false,
    methodologyChoiceMadeByThisGate: false,
    rawHistoricalGenderRoleSemanticUseAuthorized: false,
    modernEditorialPolicySemanticUseAuthorized: false,
    modernPractitionerCompositionSemanticUseAuthorized: false,
    directPrimaryImageRequirementWaived: false,
    independentNormativeProvenanceRequirementWaived: false,
    currentClaimClassCompositionRequirementWaived: false,
    crossSourceStitchingAuthorized: false,
    crossFrontierStitchingAuthorized: false,
    currentRelationshipT6InputPathEstablished: false,
    allFiveGapsRemainOpen: true,
    unresolvedGapIds: accepted ? ALL_GAP_IDS : Object.freeze([]),
    authorityAcquiredByThisGate: false,
    authorityGapClosedByThisGate: false,
    remediationExecutionAuthorizedByThisGate: false,
    spouseT8RuleAuthoringAuthorized: false,
    spouseT8ClaimTypeCreationAuthorized: false,
    spouseInterpretationPackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    compatibilityAuthorityAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    controlIds: accepted
      ? RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_METHOD_BOUNDARY_REASSESSMENT_CONTROL_IDS
      : Object.freeze([]),
    controlCount: accepted ? 14 : 0,
    controlsFrozen: accepted,
    implementationEffects: {
      residualClassesSelected: accepted ? 4 : 0,
      activeRemediationFrontiersSelected: accepted ? 4 : 0,
      humanMethodologyChoicesMade: 0,
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
      ? 'RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_READINESS_REVIEW'
      : 'RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_AUTHORITY_PATH_EXECUTION_EVIDENCE',
  });
}
