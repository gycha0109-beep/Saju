import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from './career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_TARGETED_SOURCE_ACCESS_REQUIREMENTS_REVIEW_VERSION,
  CAREER_T8_CURRENT_T5_T6_BRIDGE_REMEDIATION_TRACKS,
  CAREER_T8_CURRENT_T5_T6_BRIDGE_SOURCE_ACCESS_CONTROL_IDS,
  type CareerPersonalizationT8CurrentT5T6SemanticBridgeTargetedSourceAccessRequirementsReviewReport,
  type CareerT8BridgeRemediationTrackId,
} from './career-personalization-t8-current-t5-t6-semantic-bridge-targeted-source-access-requirements-review.js';

export const CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_ACTIVE_REMEDIATION_EXECUTION_READINESS_REVIEW_VERSION =
  'myeonghwa-career-personalization-t8-current-t5-t6-semantic-bridge-active-remediation-execution-readiness-review-v1' as const;

export type CareerT8BridgeExecutionTaskId =
  | 'CHEONBU_PRIMARY_SOURCE_ACCESS_EXECUTION'
  | 'T6_NATAL_CAREER_MODIFIER_CANDIDATE_DISCOVERY_EXECUTION';

export type CareerT8BridgeExecutionOperation =
  | 'CONFIRM_SOURCE_IDENTITY'
  | 'ACQUIRE_EXACT_SECTION_PAGE_LOCATOR'
  | 'INSPECT_BOUNDED_FULL_LOCAL_CONTEXT'
  | 'CLASSIFY_METHOD_INGREDIENTS'
  | 'EVALUATE_SOURCE_BOUND_CURRENT_CLAIM_CORRESPONDENCE'
  | 'DISCOVER_INDEPENDENT_NORMATIVE_CORROBORATION'
  | 'DISCOVER_NEW_NATAL_CAREER_MODIFIER_CANDIDATE'
  | 'VERIFY_NATAL_NOT_DYNAMIC_EVENT_SEMANTICS'
  | 'VERIFY_NON_NUMERIC_METHOD_COMPATIBILITY'
  | 'VERIFY_NO_SILENT_COMPETING_METHOD_IMPORT';

export type CareerT8BridgeExecutionResultDisposition =
  | 'QUALIFYING_EVIDENCE_ACQUIRED'
  | 'PARTIAL_EVIDENCE_ACQUIRED'
  | 'ACCESS_BLOCKED'
  | 'NO_QUALIFYING_CANDIDATE_FOUND'
  | 'CANDIDATE_METHOD_INCOMPATIBLE'
  | 'CANDIDATE_SEMANTIC_MISMATCH';

export interface CareerT8BridgeExecutionEvidenceContract {
  exactSourceIdentityRequired: true;
  reproducibleLocatorRequired: true;
  inspectedSurfaceRequired: true;
  boundedQuotedTextOrFaithfulEvidenceNoteRequired: true;
  surroundingContextAssessmentRequired: true;
  currentClaimSemanticCorrespondenceAssessmentRequired: true;
  methodologyCompatibilityAssessmentRequired: true;
  negativeOrBlockedResultMustBeRecorded: true;
  accessSuccessIsNotAuthorityAcceptance: true;
  candidateDiscoveryIsNotAuthorityAcceptance: true;
  crossTaskEvidenceStitchingForSameGapAllowed: false;
}

export interface CareerT8BridgeExecutionTask {
  taskId: CareerT8BridgeExecutionTaskId;
  sourceTrackId: CareerT8BridgeRemediationTrackId;
  executionAuthorized: true;
  operations: readonly CareerT8BridgeExecutionOperation[];
  evidenceContract: CareerT8BridgeExecutionEvidenceContract;
  allowedResultDispositions: readonly CareerT8BridgeExecutionResultDisposition[];
  authorityAcceptanceOnCompletion: false;
  authorityGapClosureOnCompletion: false;
  t8AuthoringOnCompletion: false;
}

export const CAREER_T8_CURRENT_T5_T6_BRIDGE_ACTIVE_REMEDIATION_EXECUTION_CONTROL_IDS = Object.freeze([
  'EXECUTION_READINESS_DOES_NOT_EXECUTE_SOURCE_ACCESS_OR_DISCOVERY',
  'ONLY_B12_ACTIVE_PRIMARY_TRACKS_ARE_EXECUTABLE',
  'CHEONBU_EXECUTION_REQUIRES_EXACT_IDENTITY_PAGE_AND_LOCAL_CONTEXT',
  'CHEONBU_METHOD_INGREDIENTS_MUST_BE_CLASSIFIED_BEFORE_SEMANTIC_CORRESPONDENCE',
  'CHEONBU_INDEPENDENT_CORROBORATION_IS_A_SEPARATE_REQUIRED_EVIDENCE_STEP',
  'T6_EXECUTION_MUST_DISCOVER_NATAL_CAREER_MODIFIER_SEMANTICS_NOT_EVENT_PREDICTION',
  'T6_EXECUTION_MUST_REMAIN_NON_NUMERIC',
  'COMPETING_METHOD_IMPORT_REMAINS_PROHIBITED_WITHOUT_SEPARATE_CHOICE',
  'NEGATIVE_ACCESS_BLOCKED_AND_NO_CANDIDATE_RESULTS_ARE_VALID_RESEARCH_RESULTS',
  'EXECUTION_SUCCESS_DOES_NOT_ACCEPT_AUTHORITY_OR_CLOSE_A_GAP',
  'NO_CROSS_TASK_STITCHING_TO_SIMULATE_SINGLE_GAP_AUTHORITY',
  'NO_T8_RULE_CLAIM_PACK_NARRATIVE_PREVIEW_OR_PRODUCTION_ARTIFACT',
] as const);

export interface CareerPersonalizationT8CurrentT5T6SemanticBridgeActiveRemediationExecutionReadinessReviewReport {
  reviewId: string;
  reviewVersion: typeof CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_ACTIVE_REMEDIATION_EXECUTION_READINESS_REVIEW_VERSION;
  status:
    | 'RESOLVED_CAREER_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_ACTIVE_REMEDIATION_EXECUTION_READINESS'
    | 'UPSTREAM_B12_BOUNDARY_INVALID';
  decision:
    | 'TWO_ACTIVE_PRIMARY_REMEDIATION_TASKS_EXECUTION_READY_EVIDENCE_ONLY_NO_AUTHORITY_ACQUIRED'
    | 'ACTIVE_REMEDIATION_EXECUTION_NOT_READY';
  upstreamB12ReviewId: string;
  exactB12BoundaryAccepted: boolean;
  domain: 'career';
  temporalScope: 'natal';
  statusClass: 'research';
  executionTasks: readonly CareerT8BridgeExecutionTask[];
  executionTaskCount: 2 | 0;
  executableTrackIds: readonly CareerT8BridgeRemediationTrackId[];
  executableTrackCount: 2 | 0;
  cheonbuSourceAccessExecutionReady: boolean;
  cheonbuIndependentCorroborationDiscoveryRequired: boolean;
  cheonbuAccessBlockedMayBeRecordedWithoutFallback: boolean;
  t6NewCandidateDiscoveryExecutionReady: boolean;
  t6NoQualifyingCandidateMayBeRecordedWithoutFallback: boolean;
  t6DynamicEventCandidateReuseAuthorized: false;
  numericMethodAdaptationAuthorized: false;
  competingMethodSilentImportAuthorized: false;
  negativeEvidencePreservedAsFirstClassResult: boolean;
  tasksMayRunIndependently: boolean;
  crossTaskStitchingAuthorized: false;
  allSixGapsRemainOpen: true;
  unresolvedGapIds: readonly string[];
  sourceAccessPerformedByThisGate: false;
  candidateDiscoveryPerformedByThisGate: false;
  authorityAcquiredByThisGate: false;
  authorityGapClosedByThisGate: false;
  t8RuleAuthoringAuthorized: false;
  t8ClaimTypeCreationAuthorized: false;
  personalizedT8PackCreationAuthorized: false;
  consumerNarrativeAuthorized: false;
  previewDefaultSwitchAuthorized: false;
  productionPromotionAuthorized: false;
  controlIds: readonly (typeof CAREER_T8_CURRENT_T5_T6_BRIDGE_ACTIVE_REMEDIATION_EXECUTION_CONTROL_IDS)[number][];
  controlCount: 12 | 0;
  controlsFrozen: boolean;
  implementationEffects: {
    sourceAccessesPerformed: 0;
    searchExecutionsPerformed: 0;
    evidenceRecordsCreated: 0;
    candidatesRegistered: 0;
    authorityCandidatesAccepted: 0;
    methodologyDefinitionsCreated: 0;
    ruleDefinitionsCreated: 0;
    claimTypesCreated: 0;
    interpretationPacksCreated: 0;
    narrativePlansCreated: 0;
    previewRoutesChanged: 0;
  };
  recommendedNextGate:
    | 'CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_ACTIVE_REMEDIATION_EXECUTION_EVIDENCE'
    | 'CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_TARGETED_SOURCE_ACCESS_REQUIREMENTS_REVIEW';
}

const EXECUTABLE_TRACK_IDS = Object.freeze([
  'CHEONBU_EXACT_PASSAGE_ACCESS',
  'T6_NATAL_CAREER_MODIFIER_NEW_CANDIDATE_DISCOVERY',
] as const satisfies readonly CareerT8BridgeRemediationTrackId[]);

function evidenceContract(): CareerT8BridgeExecutionEvidenceContract {
  return Object.freeze({
    exactSourceIdentityRequired: true,
    reproducibleLocatorRequired: true,
    inspectedSurfaceRequired: true,
    boundedQuotedTextOrFaithfulEvidenceNoteRequired: true,
    surroundingContextAssessmentRequired: true,
    currentClaimSemanticCorrespondenceAssessmentRequired: true,
    methodologyCompatibilityAssessmentRequired: true,
    negativeOrBlockedResultMustBeRecorded: true,
    accessSuccessIsNotAuthorityAcceptance: true,
    candidateDiscoveryIsNotAuthorityAcceptance: true,
    crossTaskEvidenceStitchingForSameGapAllowed: false,
  });
}

export const CAREER_T8_CURRENT_T5_T6_BRIDGE_ACTIVE_REMEDIATION_EXECUTION_TASKS = Object.freeze([
  Object.freeze({
    taskId: 'CHEONBU_PRIMARY_SOURCE_ACCESS_EXECUTION',
    sourceTrackId: 'CHEONBU_EXACT_PASSAGE_ACCESS',
    executionAuthorized: true,
    operations: Object.freeze([
      'CONFIRM_SOURCE_IDENTITY',
      'ACQUIRE_EXACT_SECTION_PAGE_LOCATOR',
      'INSPECT_BOUNDED_FULL_LOCAL_CONTEXT',
      'CLASSIFY_METHOD_INGREDIENTS',
      'EVALUATE_SOURCE_BOUND_CURRENT_CLAIM_CORRESPONDENCE',
      'DISCOVER_INDEPENDENT_NORMATIVE_CORROBORATION',
    ] as const satisfies readonly CareerT8BridgeExecutionOperation[]),
    evidenceContract: evidenceContract(),
    allowedResultDispositions: Object.freeze([
      'QUALIFYING_EVIDENCE_ACQUIRED',
      'PARTIAL_EVIDENCE_ACQUIRED',
      'ACCESS_BLOCKED',
      'CANDIDATE_METHOD_INCOMPATIBLE',
      'CANDIDATE_SEMANTIC_MISMATCH',
    ] as const satisfies readonly CareerT8BridgeExecutionResultDisposition[]),
    authorityAcceptanceOnCompletion: false,
    authorityGapClosureOnCompletion: false,
    t8AuthoringOnCompletion: false,
  }),
  Object.freeze({
    taskId: 'T6_NATAL_CAREER_MODIFIER_CANDIDATE_DISCOVERY_EXECUTION',
    sourceTrackId: 'T6_NATAL_CAREER_MODIFIER_NEW_CANDIDATE_DISCOVERY',
    executionAuthorized: true,
    operations: Object.freeze([
      'DISCOVER_NEW_NATAL_CAREER_MODIFIER_CANDIDATE',
      'VERIFY_NATAL_NOT_DYNAMIC_EVENT_SEMANTICS',
      'VERIFY_NON_NUMERIC_METHOD_COMPATIBILITY',
      'VERIFY_NO_SILENT_COMPETING_METHOD_IMPORT',
      'EVALUATE_SOURCE_BOUND_CURRENT_CLAIM_CORRESPONDENCE',
    ] as const satisfies readonly CareerT8BridgeExecutionOperation[]),
    evidenceContract: evidenceContract(),
    allowedResultDispositions: Object.freeze([
      'QUALIFYING_EVIDENCE_ACQUIRED',
      'PARTIAL_EVIDENCE_ACQUIRED',
      'NO_QUALIFYING_CANDIDATE_FOUND',
      'CANDIDATE_METHOD_INCOMPATIBLE',
      'CANDIDATE_SEMANTIC_MISMATCH',
    ] as const satisfies readonly CareerT8BridgeExecutionResultDisposition[]),
    authorityAcceptanceOnCompletion: false,
    authorityGapClosureOnCompletion: false,
    t8AuthoringOnCompletion: false,
  }),
] as const satisfies readonly CareerT8BridgeExecutionTask[]);

function contentAddressedB12IdentityValid(
  b12: CareerPersonalizationT8CurrentT5T6SemanticBridgeTargetedSourceAccessRequirementsReviewReport,
): boolean {
  const { reviewId, ...material } = b12;
  return (
    reviewId ===
    `career_t8_current_t5_t6_bridge_source_access_requirements_${deterministicContentHash(material).slice(0, 24)}`
  );
}

function exactB12Accepted(
  b12: CareerPersonalizationT8CurrentT5T6SemanticBridgeTargetedSourceAccessRequirementsReviewReport,
): boolean {
  return (
    contentAddressedB12IdentityValid(b12) &&
    b12.reviewVersion ===
      CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_TARGETED_SOURCE_ACCESS_REQUIREMENTS_REVIEW_VERSION &&
    b12.status ===
      'RESOLVED_CAREER_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_TARGETED_SOURCE_ACCESS_REQUIREMENTS_REVIEW' &&
    b12.decision ===
      'ACCESS_REMEDIATION_CLASSIFIED_TWO_ACTIVE_PRIMARY_TRACKS_NO_AUTHORITY_ACQUIRED_ALL_SIX_GAPS_OPEN' &&
    b12.exactB11BoundaryAccepted &&
    b12.remediationTrackCount === 5 &&
    deterministicContentHash(b12.remediationTracks) ===
      deterministicContentHash(CAREER_T8_CURRENT_T5_T6_BRIDGE_REMEDIATION_TRACKS) &&
    b12.activePrimaryTrackCount === 2 &&
    deterministicContentHash(b12.activePrimaryTrackIds) === deterministicContentHash(EXECUTABLE_TRACK_IDS) &&
    b12.cheonbuExactPassageAccessRequired &&
    b12.cheonbuFullLocalContextRequired &&
    b12.cheonbuMethodologyCompatibilityMustBeReevaluatedAfterAccess &&
    b12.cheonbuIndependentNormativeCorroborationStillRequired &&
    b12.cheonbuAccessSuccessWouldAutoAdmitAuthority === false &&
    b12.t6ExistingChenCandidateRemediationByAccessRejected &&
    b12.t6NewNatalSpecificCandidateDiscoveryRequired &&
    b12.t6CandidateMustExpressCareerModifierNotEventPrediction &&
    b12.t6CandidateMustRemainNonNumeric &&
    b12.choiNumericCandidateClosedUnderCurrentPolicy &&
    b12.choiMoreAccessWouldResolvePolicyConflict === false &&
    b12.qianliOrOtherYongshinXijiTrackMayEnterActiveAcquisition === false &&
    b12.allSixGapsRemainOpen &&
    deterministicContentHash(b12.unresolvedGapIds) ===
      deterministicContentHash(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS) &&
    b12.authorityAcquiredByThisGate === false &&
    b12.authorityGapClosedByThisGate === false &&
    b12.t8RuleAuthoringAuthorized === false &&
    b12.productionPromotionAuthorized === false &&
    b12.controlsFrozen &&
    b12.controlCount === 12 &&
    deterministicContentHash(b12.controlIds) ===
      deterministicContentHash(CAREER_T8_CURRENT_T5_T6_BRIDGE_SOURCE_ACCESS_CONTROL_IDS) &&
    b12.recommendedNextGate ===
      'CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_ACTIVE_REMEDIATION_EXECUTION_READINESS_REVIEW'
  );
}

function finalized(
  material: Omit<
    CareerPersonalizationT8CurrentT5T6SemanticBridgeActiveRemediationExecutionReadinessReviewReport,
    'reviewId'
  >,
): CareerPersonalizationT8CurrentT5T6SemanticBridgeActiveRemediationExecutionReadinessReviewReport {
  return {
    reviewId: `career_t8_current_t5_t6_bridge_active_remediation_readiness_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildCareerPersonalizationT8CurrentT5T6SemanticBridgeActiveRemediationExecutionReadinessReview(
  b12: CareerPersonalizationT8CurrentT5T6SemanticBridgeTargetedSourceAccessRequirementsReviewReport,
): CareerPersonalizationT8CurrentT5T6SemanticBridgeActiveRemediationExecutionReadinessReviewReport {
  const accepted = exactB12Accepted(b12);

  return finalized({
    reviewVersion:
      CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_ACTIVE_REMEDIATION_EXECUTION_READINESS_REVIEW_VERSION,
    status: accepted
      ? 'RESOLVED_CAREER_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_ACTIVE_REMEDIATION_EXECUTION_READINESS'
      : 'UPSTREAM_B12_BOUNDARY_INVALID',
    decision: accepted
      ? 'TWO_ACTIVE_PRIMARY_REMEDIATION_TASKS_EXECUTION_READY_EVIDENCE_ONLY_NO_AUTHORITY_ACQUIRED'
      : 'ACTIVE_REMEDIATION_EXECUTION_NOT_READY',
    upstreamB12ReviewId: b12.reviewId,
    exactB12BoundaryAccepted: accepted,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    executionTasks: accepted
      ? CAREER_T8_CURRENT_T5_T6_BRIDGE_ACTIVE_REMEDIATION_EXECUTION_TASKS
      : Object.freeze([]),
    executionTaskCount: accepted ? 2 : 0,
    executableTrackIds: accepted ? EXECUTABLE_TRACK_IDS : Object.freeze([]),
    executableTrackCount: accepted ? 2 : 0,
    cheonbuSourceAccessExecutionReady: accepted,
    cheonbuIndependentCorroborationDiscoveryRequired: accepted,
    cheonbuAccessBlockedMayBeRecordedWithoutFallback: accepted,
    t6NewCandidateDiscoveryExecutionReady: accepted,
    t6NoQualifyingCandidateMayBeRecordedWithoutFallback: accepted,
    t6DynamicEventCandidateReuseAuthorized: false,
    numericMethodAdaptationAuthorized: false,
    competingMethodSilentImportAuthorized: false,
    negativeEvidencePreservedAsFirstClassResult: accepted,
    tasksMayRunIndependently: accepted,
    crossTaskStitchingAuthorized: false,
    allSixGapsRemainOpen: true,
    unresolvedGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    sourceAccessPerformedByThisGate: false,
    candidateDiscoveryPerformedByThisGate: false,
    authorityAcquiredByThisGate: false,
    authorityGapClosedByThisGate: false,
    t8RuleAuthoringAuthorized: false,
    t8ClaimTypeCreationAuthorized: false,
    personalizedT8PackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    controlIds: accepted
      ? CAREER_T8_CURRENT_T5_T6_BRIDGE_ACTIVE_REMEDIATION_EXECUTION_CONTROL_IDS
      : Object.freeze([]),
    controlCount: accepted ? 12 : 0,
    controlsFrozen: accepted,
    implementationEffects: Object.freeze({
      sourceAccessesPerformed: 0,
      searchExecutionsPerformed: 0,
      evidenceRecordsCreated: 0,
      candidatesRegistered: 0,
      authorityCandidatesAccepted: 0,
      methodologyDefinitionsCreated: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
    }),
    recommendedNextGate: accepted
      ? 'CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_ACTIVE_REMEDIATION_EXECUTION_EVIDENCE'
      : 'CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_TARGETED_SOURCE_ACCESS_REQUIREMENTS_REVIEW',
  });
}
