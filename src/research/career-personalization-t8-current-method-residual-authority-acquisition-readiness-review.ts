import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from './career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_DISCOVERY_EVIDENCE_ADEQUACY_METHOD_BOUNDARY_REASSESSMENT_REVIEW_VERSION,
  CAREER_T8_CURRENT_T5_T6_BRIDGE_METHOD_BOUNDARY_REASSESSMENT_CONTROL_IDS,
  CAREER_T8_CURRENT_T5_T6_BRIDGE_METHOD_BOUNDARY_RESIDUAL_CLASSES,
  type CareerPersonalizationT8CurrentT5T6SemanticBridgeResidualDiscoveryEvidenceAdequacyMethodBoundaryReassessmentReviewReport,
  type CareerT8BridgeMethodBoundaryResidualClassId,
} from './career-personalization-t8-current-t5-t6-semantic-bridge-residual-discovery-evidence-adequacy-method-boundary-reassessment-review.js';

export const CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_READINESS_REVIEW_VERSION =
  'myeonghwa-career-personalization-t8-current-method-residual-authority-acquisition-readiness-review-v1' as const;

export type CareerT8CurrentMethodResidualAcquisitionTaskId =
  | 'T5_CURRENT_METHOD_DIRECT_BRIDGE_AUTHORITY_ACQUISITION'
  | 'T6_CURRENT_METHOD_DIRECT_CAREER_BRIDGE_AUTHORITY_ACQUISITION';

export type CareerT8CurrentMethodResidualAcquisitionOperation =
  | 'CONFIRM_EXACT_SOURCE_IDENTITY_AND_PROVENANCE'
  | 'ACQUIRE_STABLE_REPRODUCIBLE_PASSAGE_LOCATOR'
  | 'INSPECT_ORIGINAL_OR_VERIFIED_FULL_LOCAL_CONTEXT'
  | 'VERIFY_CURRENT_METHOD_COMPATIBILITY'
  | 'VERIFY_EXACT_T5_SUBTYPE_FAMILY_SEMANTIC_CORRESPONDENCE'
  | 'VERIFY_DIRECT_MULTI_CLAIM_CAREER_WORK_COMPOSITION'
  | 'VERIFY_CONFLICT_TENSION_POLICY_IF_CONSUMED'
  | 'DISCOVER_INDEPENDENT_CURRENT_METHOD_T5_BRIDGE_SOURCE'
  | 'VERIFY_NATAL_SCOPE_NOT_DYNAMIC_EVENT_PREDICTION'
  | 'VERIFY_DIRECT_T6_CAREER_WORK_MODIFIER_SEMANTICS'
  | 'VERIFY_BRANCH_CLASH_OR_QUALIFIER_CORRESPONDENCE'
  | 'DISCOVER_INDEPENDENT_CURRENT_METHOD_T6_BRIDGE_SOURCE'
  | 'VERIFY_NO_HISTORICAL_STATUS_TO_MODERN_CAREER_TRANSLATION'
  | 'VERIFY_NO_COMPETING_METHOD_IMPORT'
  | 'VERIFY_NO_NUMERIC_STRENGTH_WINNER_DAMAGE_OR_PRECEDENCE_IMPORT';

export interface CareerT8CurrentMethodResidualAcquisitionEvidenceContract {
  exactSourceIdentityRequired: true;
  independentNormativeProvenanceRequired: true;
  stableReproducibleLocatorRequired: true;
  originalOrVerifiedContextInspectionRequired: true;
  sourceBoundSemanticCorrespondenceRequired: true;
  explicitCareerOrWorkSemanticsRequired: true;
  explicitContextOrExceptionTreatmentRequired: true;
  currentGovernedMethodCompatibilityRequired: true;
  sourceMayUseDifferentVocabularyThanInternalClaimTypes: true;
  searchSnippetMayBeLeadOnly: true;
  searchSnippetMayCountAsAuthorityEvidence: false;
  separatePassagesMayBeModelStitchedIntoUnstatedBridge: false;
  competingFoundationalMethodMayBeSilentlyImported: false;
  historicalStatusLanguageMayBeModernizedAutomatically: false;
  numericWeightingMayBeIntroduced: false;
  crossSourceCompositionForSameGapAllowed: false;
  acquisitionSuccessIsNotAuthorityAdmission: true;
  acquisitionSuccessIsNotGapClosure: true;
  negativeOutcomeMustBePreserved: true;
}

export interface CareerT8CurrentMethodResidualAcquisitionTask {
  taskId: CareerT8CurrentMethodResidualAcquisitionTaskId;
  sourceResidualClassId: CareerT8BridgeMethodBoundaryResidualClassId;
  targetGapIds: readonly (typeof CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS)[number][];
  retainedCandidateIds: readonly string[];
  executionReady: true;
  operations: readonly CareerT8CurrentMethodResidualAcquisitionOperation[];
  evidenceContract: CareerT8CurrentMethodResidualAcquisitionEvidenceContract;
  mayDiscoverAdditionalCurrentMethodCandidates: true;
  cheonbuHoldMayBeExecuted: false;
  wangQingHoldMayBeExecuted: false;
  authorityAdmissionOnCompletion: false;
  gapClosureOnCompletion: false;
  t8AuthoringOnCompletion: false;
}

const T5_GAPS = Object.freeze([
  'EXACT_SUBTYPE_MULTI_CLAIM_TO_CAREER_PATTERN_BINDING_MISSING',
  'FAMILY_RELATION_TO_CAREER_PATTERN_BINDING_MISSING',
  'MULTI_PATTERN_CONFLICT_TENSION_COMPOSITION_POLICY_MISSING',
] as const satisfies readonly (typeof CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS)[number][]);

const T6_GAPS = Object.freeze([
  'BRANCH_CLASH_TO_T5_CAREER_SEMANTIC_MODIFIER_MISSING',
  'VISIBILITY_POSITION_PLURALITY_TO_CAREER_SEMANTIC_MODIFIER_MISSING',
  'SEASONAL_PHASE_TO_CAREER_SEMANTIC_MODIFIER_MISSING',
] as const satisfies readonly (typeof CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS)[number][]);

function evidenceContract(): CareerT8CurrentMethodResidualAcquisitionEvidenceContract {
  return Object.freeze({
    exactSourceIdentityRequired: true,
    independentNormativeProvenanceRequired: true,
    stableReproducibleLocatorRequired: true,
    originalOrVerifiedContextInspectionRequired: true,
    sourceBoundSemanticCorrespondenceRequired: true,
    explicitCareerOrWorkSemanticsRequired: true,
    explicitContextOrExceptionTreatmentRequired: true,
    currentGovernedMethodCompatibilityRequired: true,
    sourceMayUseDifferentVocabularyThanInternalClaimTypes: true,
    searchSnippetMayBeLeadOnly: true,
    searchSnippetMayCountAsAuthorityEvidence: false,
    separatePassagesMayBeModelStitchedIntoUnstatedBridge: false,
    competingFoundationalMethodMayBeSilentlyImported: false,
    historicalStatusLanguageMayBeModernizedAutomatically: false,
    numericWeightingMayBeIntroduced: false,
    crossSourceCompositionForSameGapAllowed: false,
    acquisitionSuccessIsNotAuthorityAdmission: true,
    acquisitionSuccessIsNotGapClosure: true,
    negativeOutcomeMustBePreserved: true,
  });
}

export const CAREER_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_TASKS = Object.freeze([
  Object.freeze({
    taskId: 'T5_CURRENT_METHOD_DIRECT_BRIDGE_AUTHORITY_ACQUISITION',
    sourceResidualClassId: 'CURRENT_METHOD_T5_DIRECT_BRIDGE_ACQUISITION',
    targetGapIds: T5_GAPS,
    retainedCandidateIds: Object.freeze(['YANG_YIYUN_SHISHEN_CHANWEI'] as const),
    executionReady: true,
    operations: Object.freeze([
      'CONFIRM_EXACT_SOURCE_IDENTITY_AND_PROVENANCE',
      'ACQUIRE_STABLE_REPRODUCIBLE_PASSAGE_LOCATOR',
      'INSPECT_ORIGINAL_OR_VERIFIED_FULL_LOCAL_CONTEXT',
      'VERIFY_CURRENT_METHOD_COMPATIBILITY',
      'VERIFY_EXACT_T5_SUBTYPE_FAMILY_SEMANTIC_CORRESPONDENCE',
      'VERIFY_DIRECT_MULTI_CLAIM_CAREER_WORK_COMPOSITION',
      'VERIFY_CONFLICT_TENSION_POLICY_IF_CONSUMED',
      'DISCOVER_INDEPENDENT_CURRENT_METHOD_T5_BRIDGE_SOURCE',
      'VERIFY_NO_COMPETING_METHOD_IMPORT',
      'VERIFY_NO_NUMERIC_STRENGTH_WINNER_DAMAGE_OR_PRECEDENCE_IMPORT',
    ] as const satisfies readonly CareerT8CurrentMethodResidualAcquisitionOperation[]),
    evidenceContract: evidenceContract(),
    mayDiscoverAdditionalCurrentMethodCandidates: true,
    cheonbuHoldMayBeExecuted: false,
    wangQingHoldMayBeExecuted: false,
    authorityAdmissionOnCompletion: false,
    gapClosureOnCompletion: false,
    t8AuthoringOnCompletion: false,
  }),
  Object.freeze({
    taskId: 'T6_CURRENT_METHOD_DIRECT_CAREER_BRIDGE_AUTHORITY_ACQUISITION',
    sourceResidualClassId: 'CURRENT_METHOD_T6_DIRECT_CAREER_BRIDGE_DISCOVERY',
    targetGapIds: T6_GAPS,
    retainedCandidateIds: Object.freeze([
      'SANMING_TONGHUI_VOL2_LUN_CHONGJI',
      'ZIPING_ZHENQUAN_OFFICIAL_PATTERN_CLASH_CONTEXT',
    ] as const),
    executionReady: true,
    operations: Object.freeze([
      'CONFIRM_EXACT_SOURCE_IDENTITY_AND_PROVENANCE',
      'ACQUIRE_STABLE_REPRODUCIBLE_PASSAGE_LOCATOR',
      'INSPECT_ORIGINAL_OR_VERIFIED_FULL_LOCAL_CONTEXT',
      'VERIFY_CURRENT_METHOD_COMPATIBILITY',
      'VERIFY_NATAL_SCOPE_NOT_DYNAMIC_EVENT_PREDICTION',
      'VERIFY_DIRECT_T6_CAREER_WORK_MODIFIER_SEMANTICS',
      'VERIFY_BRANCH_CLASH_OR_QUALIFIER_CORRESPONDENCE',
      'DISCOVER_INDEPENDENT_CURRENT_METHOD_T6_BRIDGE_SOURCE',
      'VERIFY_NO_HISTORICAL_STATUS_TO_MODERN_CAREER_TRANSLATION',
      'VERIFY_NO_COMPETING_METHOD_IMPORT',
      'VERIFY_NO_NUMERIC_STRENGTH_WINNER_DAMAGE_OR_PRECEDENCE_IMPORT',
    ] as const satisfies readonly CareerT8CurrentMethodResidualAcquisitionOperation[]),
    evidenceContract: evidenceContract(),
    mayDiscoverAdditionalCurrentMethodCandidates: true,
    cheonbuHoldMayBeExecuted: false,
    wangQingHoldMayBeExecuted: false,
    authorityAdmissionOnCompletion: false,
    gapClosureOnCompletion: false,
    t8AuthoringOnCompletion: false,
  }),
] as const satisfies readonly CareerT8CurrentMethodResidualAcquisitionTask[]);

export const CAREER_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_READINESS_CONTROL_IDS = Object.freeze([
  'ONLY_B18_ACTIVE_CURRENT_METHOD_FRONTIERS_ARE_ACQUISITION_READY',
  'T5_YANG_REINSPECTION_MAY_PROCEED_BUT_SEPARATE_PASSAGES_MAY_NOT_BE_STITCHED',
  'T5_ADDITIONAL_INDEPENDENT_CURRENT_METHOD_SOURCES_MAY_BE_DISCOVERED',
  'T5_DIRECT_MULTI_CLAIM_CAREER_COMPOSITION_AND_CONFLICT_POLICY_MUST_BE_SOURCE_EXPLICIT_IF_CONSUMED',
  'T6_CLASSICS_REMAIN_STRUCTURAL_CONTEXT_UNLESS_DIRECT_CAREER_BRIDGE_IS_SOURCE_EXPLICIT',
  'T6_ADDITIONAL_INDEPENDENT_CURRENT_METHOD_SOURCES_MAY_BE_DISCOVERED',
  'CLASSICAL_STATUS_LANGUAGE_MAY_NOT_BE_AUTOMATICALLY_MODERNIZED',
  'CHEONBU_EXTERNAL_FULL_TEXT_HOLD_IS_EXCLUDED_FROM_B19_EXECUTION_SCOPE',
  'WANG_QING_COMPETING_METHOD_HOLD_IS_EXCLUDED_FROM_B19_EXECUTION_SCOPE',
  'NO_YONGSHIN_GEJU_STRENGTH_WINNER_DAMAGE_OR_PRECEDENCE_IMPORT',
  'ACQUISITION_SUCCESS_DOES_NOT_ADMIT_AUTHORITY_OR_CLOSE_A_GAP',
  'ALL_SIX_GAPS_REMAIN_OPEN_NO_T8_RULE_CLAIM_PACK_NARRATIVE_PREVIEW_OR_PRODUCTION_ARTIFACT',
] as const);

export interface CareerPersonalizationT8CurrentMethodResidualAuthorityAcquisitionReadinessReviewReport {
  reviewId: string;
  reviewVersion: typeof CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_READINESS_REVIEW_VERSION;
  status:
    | 'RESOLVED_CAREER_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_READINESS'
    | 'UPSTREAM_B18_BOUNDARY_INVALID';
  decision:
    | 'TWO_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_TASKS_READY_HOLDS_EXCLUDED_NO_AUTHORITY_ACQUIRED'
    | 'CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_NOT_READY';
  upstreamB18ReviewId: string;
  exactB18BoundaryAccepted: boolean;
  domain: 'career';
  temporalScope: 'natal';
  statusClass: 'research';
  acquisitionTasks: readonly CareerT8CurrentMethodResidualAcquisitionTask[];
  acquisitionTaskCount: 2 | 0;
  executableResidualClassIds: readonly CareerT8BridgeMethodBoundaryResidualClassId[];
  executableResidualClassCount: 2 | 0;
  t5CurrentMethodAcquisitionReady: boolean;
  t6CurrentMethodAcquisitionReady: boolean;
  currentMethodDiscoveryMayContinueWithoutHumanMethodologyChoice: boolean;
  cheonbuHoldExcludedFromExecution: boolean;
  wangQingHoldExcludedFromExecution: boolean;
  wangQingHumanAdjudicationStillRequiredBeforeSemanticUse: boolean;
  acquisitionExecutionAuthorizedForNextGate: boolean;
  acquisitionPerformedByThisGate: false;
  authorityAcquiredByThisGate: false;
  authorityGapClosedByThisGate: false;
  crossSourceStitchingAuthorized: false;
  allSixGapsRemainOpen: true;
  unresolvedGapIds: readonly (typeof CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS)[number][];
  methodologyChoiceMadeByThisGate: false;
  t8RuleAuthoringAuthorized: false;
  t8ClaimTypeCreationAuthorized: false;
  personalizedT8PackCreationAuthorized: false;
  consumerNarrativeAuthorized: false;
  previewDefaultSwitchAuthorized: false;
  productionPromotionAuthorized: false;
  controlIds: readonly (typeof CAREER_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_READINESS_CONTROL_IDS)[number][];
  controlCount: 12 | 0;
  controlsFrozen: boolean;
  implementationEffects: {
    acquisitionExecutionsPerformed: 0;
    sourcesDiscovered: 0;
    candidatesRegistered: 0;
    authorityCandidatesAccepted: 0;
    authorityGapsClosed: 0;
    methodologyChoicesMade: 0;
    ruleDefinitionsCreated: 0;
    claimTypesCreated: 0;
    interpretationPacksCreated: 0;
    narrativePlansCreated: 0;
    previewRoutesChanged: 0;
  };
  recommendedNextGate:
    | 'CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_EVIDENCE'
    | 'CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_DISCOVERY_EVIDENCE_ADEQUACY_METHOD_BOUNDARY_REASSESSMENT_REVIEW';
}

const EXECUTABLE_CLASS_IDS = Object.freeze([
  'CURRENT_METHOD_T5_DIRECT_BRIDGE_ACQUISITION',
  'CURRENT_METHOD_T6_DIRECT_CAREER_BRIDGE_DISCOVERY',
] as const satisfies readonly CareerT8BridgeMethodBoundaryResidualClassId[]);

function contentAddressedB18IdentityValid(
  b18: CareerPersonalizationT8CurrentT5T6SemanticBridgeResidualDiscoveryEvidenceAdequacyMethodBoundaryReassessmentReviewReport,
): boolean {
  const { reviewId, ...material } = b18;
  return (
    reviewId ===
    `career_t8_current_t5_t6_bridge_method_boundary_reassessment_${deterministicContentHash(material).slice(0, 24)}`
  );
}

function exactB18Accepted(
  b18: CareerPersonalizationT8CurrentT5T6SemanticBridgeResidualDiscoveryEvidenceAdequacyMethodBoundaryReassessmentReviewReport,
): boolean {
  return (
    contentAddressedB18IdentityValid(b18) &&
    b18.reviewVersion ===
      CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_DISCOVERY_EVIDENCE_ADEQUACY_METHOD_BOUNDARY_REASSESSMENT_REVIEW_VERSION &&
    b18.status ===
      'RESOLVED_CAREER_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_DISCOVERY_EVIDENCE_ADEQUACY_METHOD_BOUNDARY_REASSESSMENT' &&
    b18.decision ===
      'B17_PARTIAL_EVIDENCE_VALID_TWO_CURRENT_METHOD_FRONTIERS_REMAIN_OPEN_TWO_HOLDS_ISOLATED_COMPETING_METHOD_REQUIRES_HUMAN_ADJUDICATION_BEFORE_USE_NO_AUTHORITY_ACQUIRED' &&
    b18.exactB17BoundaryAccepted &&
    b18.b17EvidenceAdequateForResidualClassificationOnly &&
    b18.b17EvidenceAdequateForAuthorityAdmission === false &&
    b18.b17EvidenceAdequateForGapClosure === false &&
    b18.residualClassCount === 4 &&
    deterministicContentHash(b18.residualClasses) ===
      deterministicContentHash(CAREER_T8_CURRENT_T5_T6_BRIDGE_METHOD_BOUNDARY_RESIDUAL_CLASSES) &&
    b18.activeCurrentMethodFrontierCount === 2 &&
    b18.holdCount === 2 &&
    b18.currentMethodT5DirectBridgeAcquisitionMayContinue &&
    b18.currentMethodT6DirectCareerBridgeDiscoveryMayContinue &&
    b18.humanMethodologyChoiceRequiredBeforeContinuingCurrentMethodDiscovery === false &&
    b18.wangQingCompetingMethodHoldActive &&
    b18.humanMethodologyChoiceRequiredBeforeWangSemanticUse &&
    b18.wangSemanticUseAuthorized === false &&
    b18.yangSemanticUseAuthorized === false &&
    b18.shimDirectBridgeUseAuthorized === false &&
    b18.classicStatusToModernCareerTranslationAuthorized === false &&
    b18.cheonbuExternalFullTextHoldPreserved &&
    b18.crossSourceStitchingAuthorized === false &&
    b18.allSixGapsRemainOpen &&
    deterministicContentHash(b18.unresolvedGapIds) === deterministicContentHash(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS) &&
    b18.authorityAcquiredByThisGate === false &&
    b18.authorityGapClosedByThisGate === false &&
    b18.remediationExecutionAuthorizedByThisGate === false &&
    b18.methodologyChoiceMadeByThisGate === false &&
    b18.productionPromotionAuthorized === false &&
    b18.controlsFrozen &&
    b18.controlCount === 12 &&
    deterministicContentHash(b18.controlIds) ===
      deterministicContentHash(CAREER_T8_CURRENT_T5_T6_BRIDGE_METHOD_BOUNDARY_REASSESSMENT_CONTROL_IDS) &&
    b18.recommendedNextGate === 'CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_READINESS_REVIEW'
  );
}

function finalized(
  material: Omit<CareerPersonalizationT8CurrentMethodResidualAuthorityAcquisitionReadinessReviewReport, 'reviewId'>,
): CareerPersonalizationT8CurrentMethodResidualAuthorityAcquisitionReadinessReviewReport {
  return {
    reviewId: `career_t8_current_method_residual_authority_acquisition_readiness_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildCareerPersonalizationT8CurrentMethodResidualAuthorityAcquisitionReadinessReview(
  b18: CareerPersonalizationT8CurrentT5T6SemanticBridgeResidualDiscoveryEvidenceAdequacyMethodBoundaryReassessmentReviewReport,
): CareerPersonalizationT8CurrentMethodResidualAuthorityAcquisitionReadinessReviewReport {
  const accepted = exactB18Accepted(b18);

  return finalized({
    reviewVersion: CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_READINESS_REVIEW_VERSION,
    status: accepted
      ? 'RESOLVED_CAREER_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_READINESS'
      : 'UPSTREAM_B18_BOUNDARY_INVALID',
    decision: accepted
      ? 'TWO_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_TASKS_READY_HOLDS_EXCLUDED_NO_AUTHORITY_ACQUIRED'
      : 'CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_NOT_READY',
    upstreamB18ReviewId: b18.reviewId,
    exactB18BoundaryAccepted: accepted,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    acquisitionTasks: accepted ? CAREER_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_TASKS : Object.freeze([]),
    acquisitionTaskCount: accepted ? 2 : 0,
    executableResidualClassIds: accepted ? EXECUTABLE_CLASS_IDS : Object.freeze([]),
    executableResidualClassCount: accepted ? 2 : 0,
    t5CurrentMethodAcquisitionReady: accepted,
    t6CurrentMethodAcquisitionReady: accepted,
    currentMethodDiscoveryMayContinueWithoutHumanMethodologyChoice: accepted,
    cheonbuHoldExcludedFromExecution: accepted,
    wangQingHoldExcludedFromExecution: accepted,
    wangQingHumanAdjudicationStillRequiredBeforeSemanticUse: accepted,
    acquisitionExecutionAuthorizedForNextGate: accepted,
    acquisitionPerformedByThisGate: false,
    authorityAcquiredByThisGate: false,
    authorityGapClosedByThisGate: false,
    crossSourceStitchingAuthorized: false,
    allSixGapsRemainOpen: true,
    unresolvedGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    methodologyChoiceMadeByThisGate: false,
    t8RuleAuthoringAuthorized: false,
    t8ClaimTypeCreationAuthorized: false,
    personalizedT8PackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    controlIds: accepted ? CAREER_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_READINESS_CONTROL_IDS : Object.freeze([]),
    controlCount: accepted ? 12 : 0,
    controlsFrozen: accepted,
    implementationEffects: Object.freeze({
      acquisitionExecutionsPerformed: 0,
      sourcesDiscovered: 0,
      candidatesRegistered: 0,
      authorityCandidatesAccepted: 0,
      authorityGapsClosed: 0,
      methodologyChoicesMade: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
    }),
    recommendedNextGate: accepted
      ? 'CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_EVIDENCE'
      : 'CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_DISCOVERY_EVIDENCE_ADEQUACY_METHOD_BOUNDARY_REASSESSMENT_REVIEW',
  });
}
