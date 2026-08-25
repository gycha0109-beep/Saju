import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from './career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_REMEDIATION_EVIDENCE_ADEQUACY_RESIDUAL_PATH_REASSESSMENT_REVIEW_VERSION,
  CAREER_T8_CURRENT_T5_T6_BRIDGE_RESIDUAL_PATHS,
  CAREER_T8_CURRENT_T5_T6_BRIDGE_RESIDUAL_REASSESSMENT_CONTROL_IDS,
  type CareerPersonalizationT8CurrentT5T6SemanticBridgeRemediationEvidenceAdequacyResidualPathReassessmentReviewReport,
  type CareerT8BridgeResidualPathId,
} from './career-personalization-t8-current-t5-t6-semantic-bridge-remediation-evidence-adequacy-residual-path-reassessment-review.js';

export const CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_AUTHORITY_PATH_EXECUTION_READINESS_REVIEW_VERSION =
  'myeonghwa-career-personalization-t8-current-t5-t6-semantic-bridge-residual-authority-path-execution-readiness-review-v1' as const;

export type CareerT8BridgeResidualExecutionTaskId =
  | 'T5_MULTI_ALTERNATE_NORMATIVE_SOURCE_DISCOVERY_EXECUTION'
  | 'T6_HIGHER_PROVENANCE_NATAL_CAREER_SOURCE_DISCOVERY_EXECUTION';

export type CareerT8BridgeResidualExecutionOperation =
  | 'DISCOVER_INDEPENDENT_NORMATIVE_SOURCE'
  | 'CONFIRM_EXACT_SOURCE_IDENTITY'
  | 'ACQUIRE_REPRODUCIBLE_PASSAGE_LOCATOR'
  | 'INSPECT_BOUNDED_LOCAL_CONTEXT'
  | 'VERIFY_EXACT_SUBTYPE_FAMILY_SEMANTICS'
  | 'VERIFY_MULTI_CLAIM_CAREER_WORK_COMPOSITION'
  | 'VERIFY_CONFLICT_TENSION_POLICY_IF_CLAIMED'
  | 'DISCOVER_HIGHER_PROVENANCE_NATAL_SOURCE'
  | 'VERIFY_NATAL_NOT_DYNAMIC_EVENT_SEMANTICS'
  | 'VERIFY_CAREER_WORK_MODIFIER_SEMANTICS'
  | 'VERIFY_T6_RELATION_OR_QUALIFIER_CORRESPONDENCE'
  | 'VERIFY_NON_NUMERIC_METHOD_COMPATIBILITY'
  | 'VERIFY_NO_SILENT_COMPETING_METHOD_IMPORT';

export type CareerT8BridgeResidualExecutionDisposition =
  | 'QUALIFYING_CANDIDATE_DISCOVERED'
  | 'PARTIAL_CANDIDATE_DISCOVERED'
  | 'NO_QUALIFYING_CANDIDATE_FOUND'
  | 'CANDIDATE_PROVENANCE_INSUFFICIENT'
  | 'CANDIDATE_METHOD_INCOMPATIBLE'
  | 'CANDIDATE_SEMANTIC_MISMATCH';

export interface CareerT8BridgeResidualExecutionEvidenceContract {
  exactSourceIdentityRequired: true;
  reproducibleLocatorRequired: true;
  boundedLocalContextInspectionRequired: true;
  sourceBoundSemanticCorrespondenceRequired: true;
  independentNormativeProvenanceRequired: true;
  nonNumericMethodCompatibilityRequired: true;
  negativeResultMustBeRecorded: true;
  discoverySuccessIsNotAuthorityAdmission: true;
  discoverySuccessIsNotGapClosure: true;
  fallbackSynthesisAllowed: false;
  crossSourceStitchingForSameGapAllowed: false;
}

export interface CareerT8BridgeResidualExecutionTask {
  taskId: CareerT8BridgeResidualExecutionTaskId;
  sourcePathId: CareerT8BridgeResidualPathId;
  executionAuthorized: true;
  operations: readonly CareerT8BridgeResidualExecutionOperation[];
  evidenceContract: CareerT8BridgeResidualExecutionEvidenceContract;
  allowedDispositions: readonly CareerT8BridgeResidualExecutionDisposition[];
  authorityAdmissionOnCompletion: false;
  gapClosureOnCompletion: false;
  t8AuthoringOnCompletion: false;
}

function evidenceContract(): CareerT8BridgeResidualExecutionEvidenceContract {
  return Object.freeze({
    exactSourceIdentityRequired: true,
    reproducibleLocatorRequired: true,
    boundedLocalContextInspectionRequired: true,
    sourceBoundSemanticCorrespondenceRequired: true,
    independentNormativeProvenanceRequired: true,
    nonNumericMethodCompatibilityRequired: true,
    negativeResultMustBeRecorded: true,
    discoverySuccessIsNotAuthorityAdmission: true,
    discoverySuccessIsNotGapClosure: true,
    fallbackSynthesisAllowed: false,
    crossSourceStitchingForSameGapAllowed: false,
  });
}

export const CAREER_T8_CURRENT_T5_T6_BRIDGE_RESIDUAL_EXECUTION_TASKS = Object.freeze([
  Object.freeze({
    taskId: 'T5_MULTI_ALTERNATE_NORMATIVE_SOURCE_DISCOVERY_EXECUTION',
    sourcePathId: 'T5_MULTI_ALTERNATE_NORMATIVE_SOURCE_DISCOVERY',
    executionAuthorized: true,
    operations: Object.freeze([
      'DISCOVER_INDEPENDENT_NORMATIVE_SOURCE',
      'CONFIRM_EXACT_SOURCE_IDENTITY',
      'ACQUIRE_REPRODUCIBLE_PASSAGE_LOCATOR',
      'INSPECT_BOUNDED_LOCAL_CONTEXT',
      'VERIFY_EXACT_SUBTYPE_FAMILY_SEMANTICS',
      'VERIFY_MULTI_CLAIM_CAREER_WORK_COMPOSITION',
      'VERIFY_CONFLICT_TENSION_POLICY_IF_CLAIMED',
      'VERIFY_NON_NUMERIC_METHOD_COMPATIBILITY',
      'VERIFY_NO_SILENT_COMPETING_METHOD_IMPORT',
    ] as const satisfies readonly CareerT8BridgeResidualExecutionOperation[]),
    evidenceContract: evidenceContract(),
    allowedDispositions: Object.freeze([
      'QUALIFYING_CANDIDATE_DISCOVERED',
      'PARTIAL_CANDIDATE_DISCOVERED',
      'NO_QUALIFYING_CANDIDATE_FOUND',
      'CANDIDATE_PROVENANCE_INSUFFICIENT',
      'CANDIDATE_METHOD_INCOMPATIBLE',
      'CANDIDATE_SEMANTIC_MISMATCH',
    ] as const satisfies readonly CareerT8BridgeResidualExecutionDisposition[]),
    authorityAdmissionOnCompletion: false,
    gapClosureOnCompletion: false,
    t8AuthoringOnCompletion: false,
  }),
  Object.freeze({
    taskId: 'T6_HIGHER_PROVENANCE_NATAL_CAREER_SOURCE_DISCOVERY_EXECUTION',
    sourcePathId: 'T6_HIGHER_PROVENANCE_NATAL_CAREER_SOURCE_DISCOVERY',
    executionAuthorized: true,
    operations: Object.freeze([
      'DISCOVER_HIGHER_PROVENANCE_NATAL_SOURCE',
      'CONFIRM_EXACT_SOURCE_IDENTITY',
      'ACQUIRE_REPRODUCIBLE_PASSAGE_LOCATOR',
      'INSPECT_BOUNDED_LOCAL_CONTEXT',
      'VERIFY_NATAL_NOT_DYNAMIC_EVENT_SEMANTICS',
      'VERIFY_CAREER_WORK_MODIFIER_SEMANTICS',
      'VERIFY_T6_RELATION_OR_QUALIFIER_CORRESPONDENCE',
      'VERIFY_NON_NUMERIC_METHOD_COMPATIBILITY',
      'VERIFY_NO_SILENT_COMPETING_METHOD_IMPORT',
    ] as const satisfies readonly CareerT8BridgeResidualExecutionOperation[]),
    evidenceContract: evidenceContract(),
    allowedDispositions: Object.freeze([
      'QUALIFYING_CANDIDATE_DISCOVERED',
      'PARTIAL_CANDIDATE_DISCOVERED',
      'NO_QUALIFYING_CANDIDATE_FOUND',
      'CANDIDATE_PROVENANCE_INSUFFICIENT',
      'CANDIDATE_METHOD_INCOMPATIBLE',
      'CANDIDATE_SEMANTIC_MISMATCH',
    ] as const satisfies readonly CareerT8BridgeResidualExecutionDisposition[]),
    authorityAdmissionOnCompletion: false,
    gapClosureOnCompletion: false,
    t8AuthoringOnCompletion: false,
  }),
] as const satisfies readonly CareerT8BridgeResidualExecutionTask[]);

export const CAREER_T8_CURRENT_T5_T6_BRIDGE_RESIDUAL_EXECUTION_READINESS_CONTROL_IDS = Object.freeze([
  'ONLY_B15_ACTIVE_ALTERNATE_DISCOVERY_PATHS_ARE_EXECUTION_READY',
  'CHEONBU_EXTERNAL_FULL_TEXT_ACCESS_HOLD_REMAINS_BLOCKED_AND_IS_NOT_PUBLIC_WEB_RETRY_WORK',
  'T5_DISCOVERY_REQUIRES_INDEPENDENT_NORMATIVE_SOURCE_AND_EXACT_LOCATOR',
  'T5_MULTI_CLAIM_CAREER_COMPOSITION_MUST_BE_EXPLICIT_NOT_MODEL_SYNTHESIZED',
  'T5_CONFLICT_TENSION_POLICY_MUST_BE_EXPLICIT_IF_CONSUMED',
  'T6_DISCOVERY_REQUIRES_HIGHER_PROVENANCE_NATAL_CAREER_MODIFIER_SEMANTICS',
  'T6_DYNAMIC_EVENT_SEMANTICS_CANNOT_SUBSTITUTE_FOR_NATAL_MODIFIER_AUTHORITY',
  'NUMERIC_STRENGTH_WINNER_DAMAGE_OR_PRECEDENCE_CANNOT_BE_IMPORTED',
  'YONGSHIN_XIJI_OR_OTHER_COMPETING_METHOD_IMPORT_REMAINS_PROHIBITED_WITHOUT_SEPARATE_CHOICE',
  'NEGATIVE_DISCOVERY_OUTCOMES_ARE_VALID_AND_MUST_NOT_TRIGGER_FALLBACK_SYNTHESIS',
  'DISCOVERY_SUCCESS_DOES_NOT_ACCEPT_AUTHORITY_OR_CLOSE_A_GAP',
  'NO_CROSS_SOURCE_STITCHING_OR_T8_RULE_CLAIM_PACK_NARRATIVE_PREVIEW_PRODUCTION_ARTIFACT',
] as const);

export interface CareerPersonalizationT8CurrentT5T6SemanticBridgeResidualAuthorityPathExecutionReadinessReviewReport {
  reviewId: string;
  reviewVersion: typeof CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_AUTHORITY_PATH_EXECUTION_READINESS_REVIEW_VERSION;
  status:
    | 'RESOLVED_CAREER_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_AUTHORITY_PATH_EXECUTION_READINESS'
    | 'UPSTREAM_B15_BOUNDARY_INVALID';
  decision:
    | 'TWO_ACTIVE_RESIDUAL_DISCOVERY_TASKS_EXECUTION_READY_CHEONBU_EXTERNAL_HOLD_PRESERVED_NO_AUTHORITY_ACQUIRED'
    | 'RESIDUAL_AUTHORITY_PATH_EXECUTION_NOT_READY';
  upstreamB15ReviewId: string;
  exactB15BoundaryAccepted: boolean;
  domain: 'career';
  temporalScope: 'natal';
  statusClass: 'research';
  executionTasks: readonly CareerT8BridgeResidualExecutionTask[];
  executionTaskCount: 2 | 0;
  executablePathIds: readonly CareerT8BridgeResidualPathId[];
  executablePathCount: 2 | 0;
  cheonbuExternalFullTextHoldPreserved: boolean;
  cheonbuPublicWebRetryAuthorized: false;
  cheonbuPathExecutionAuthorized: false;
  t5AlternateNormativeDiscoveryExecutionReady: boolean;
  t6HigherProvenanceNatalDiscoveryExecutionReady: boolean;
  negativeDiscoveryPreservedAsFirstClassResult: boolean;
  fallbackAuthoritySynthesisAuthorized: false;
  crossSourceStitchingAuthorized: false;
  allSixGapsRemainOpen: true;
  unresolvedGapIds: readonly (typeof CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS)[number][];
  authorityAcquiredByThisGate: false;
  authorityGapClosedByThisGate: false;
  discoveryPerformedByThisGate: false;
  t8RuleAuthoringAuthorized: false;
  t8ClaimTypeCreationAuthorized: false;
  personalizedT8PackCreationAuthorized: false;
  consumerNarrativeAuthorized: false;
  previewDefaultSwitchAuthorized: false;
  productionPromotionAuthorized: false;
  controlIds: readonly (typeof CAREER_T8_CURRENT_T5_T6_BRIDGE_RESIDUAL_EXECUTION_READINESS_CONTROL_IDS)[number][];
  controlCount: 12 | 0;
  controlsFrozen: boolean;
  implementationEffects: {
    externalAccessesPerformed: 0;
    discoveryExecutionsPerformed: 0;
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
    | 'CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_AUTHORITY_PATH_DISCOVERY_EVIDENCE'
    | 'CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_REMEDIATION_EVIDENCE_ADEQUACY_RESIDUAL_PATH_REASSESSMENT_REVIEW';
}

const EXECUTABLE_PATH_IDS = Object.freeze([
  'T5_MULTI_ALTERNATE_NORMATIVE_SOURCE_DISCOVERY',
  'T6_HIGHER_PROVENANCE_NATAL_CAREER_SOURCE_DISCOVERY',
] as const satisfies readonly CareerT8BridgeResidualPathId[]);

function contentAddressedB15IdentityValid(
  b15: CareerPersonalizationT8CurrentT5T6SemanticBridgeRemediationEvidenceAdequacyResidualPathReassessmentReviewReport,
): boolean {
  const { reviewId, ...material } = b15;
  return (
    reviewId ===
    `career_t8_current_t5_t6_bridge_residual_path_reassessment_${deterministicContentHash(material).slice(0, 24)}`
  );
}

function exactB15Accepted(
  b15: CareerPersonalizationT8CurrentT5T6SemanticBridgeRemediationEvidenceAdequacyResidualPathReassessmentReviewReport,
): boolean {
  return (
    contentAddressedB15IdentityValid(b15) &&
    b15.reviewVersion ===
      CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_REMEDIATION_EVIDENCE_ADEQUACY_RESIDUAL_PATH_REASSESSMENT_REVIEW_VERSION &&
    b15.status ===
      'RESOLVED_CAREER_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_REMEDIATION_EVIDENCE_ADEQUACY_RESIDUAL_PATH_REASSESSMENT' &&
    b15.decision ===
      'B14_EXECUTION_OUTCOMES_VALID_ZERO_AUTHORITY_THREE_RESIDUAL_PATHS_SELECTED_ALL_SIX_GAPS_OPEN' &&
    b15.exactB14BoundaryAccepted &&
    b15.b14EvidenceAdequateForExecutionOutcomeOnly &&
    b15.b14EvidenceAdequateForAuthorityAdmission === false &&
    b15.b14EvidenceAdequateForGapClosure === false &&
    b15.cheonbuPublicWebPathBlocked &&
    b15.cheonbuPassageNonexistenceInferred === false &&
    b15.cheonbuExternalFullTextAccessRequired &&
    b15.t6B14CandidateSetHadZeroQualifyingCandidates &&
    b15.t6GlobalSourceAbsenceInferred === false &&
    b15.residualPathCount === 3 &&
    deterministicContentHash(b15.residualPaths) === deterministicContentHash(CAREER_T8_CURRENT_T5_T6_BRIDGE_RESIDUAL_PATHS) &&
    b15.blockedExternalPathCount === 1 &&
    b15.activeAlternateDiscoveryPathCount === 2 &&
    deterministicContentHash(b15.activeAlternateDiscoveryPathIds) === deterministicContentHash(EXECUTABLE_PATH_IDS) &&
    b15.t5MultiAlternateDiscoveryMayProceedWhileCheonbuBlocked &&
    b15.t6HigherProvenanceDiscoveryRequired &&
    b15.modernWebLeadPromotionAuthorized === false &&
    b15.dynamicEventAdaptationAuthorized === false &&
    b15.competingMethodAdaptationAuthorized === false &&
    b15.crossSourceStitchingAuthorized === false &&
    b15.allSixGapsRemainOpen &&
    deterministicContentHash(b15.unresolvedGapIds) === deterministicContentHash(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS) &&
    b15.authorityAcquiredByThisGate === false &&
    b15.authorityGapClosedByThisGate === false &&
    b15.residualPathExecutionAuthorizedByThisGate === false &&
    b15.productionPromotionAuthorized === false &&
    b15.controlsFrozen &&
    b15.controlCount === 12 &&
    deterministicContentHash(b15.controlIds) === deterministicContentHash(CAREER_T8_CURRENT_T5_T6_BRIDGE_RESIDUAL_REASSESSMENT_CONTROL_IDS) &&
    b15.recommendedNextGate ===
      'CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_AUTHORITY_PATH_EXECUTION_READINESS_REVIEW'
  );
}

function finalized(
  material: Omit<CareerPersonalizationT8CurrentT5T6SemanticBridgeResidualAuthorityPathExecutionReadinessReviewReport, 'reviewId'>,
): CareerPersonalizationT8CurrentT5T6SemanticBridgeResidualAuthorityPathExecutionReadinessReviewReport {
  return {
    reviewId: `career_t8_current_t5_t6_bridge_residual_authority_path_execution_readiness_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildCareerPersonalizationT8CurrentT5T6SemanticBridgeResidualAuthorityPathExecutionReadinessReview(
  b15: CareerPersonalizationT8CurrentT5T6SemanticBridgeRemediationEvidenceAdequacyResidualPathReassessmentReviewReport,
): CareerPersonalizationT8CurrentT5T6SemanticBridgeResidualAuthorityPathExecutionReadinessReviewReport {
  const accepted = exactB15Accepted(b15);

  return finalized({
    reviewVersion:
      CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_AUTHORITY_PATH_EXECUTION_READINESS_REVIEW_VERSION,
    status: accepted
      ? 'RESOLVED_CAREER_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_AUTHORITY_PATH_EXECUTION_READINESS'
      : 'UPSTREAM_B15_BOUNDARY_INVALID',
    decision: accepted
      ? 'TWO_ACTIVE_RESIDUAL_DISCOVERY_TASKS_EXECUTION_READY_CHEONBU_EXTERNAL_HOLD_PRESERVED_NO_AUTHORITY_ACQUIRED'
      : 'RESIDUAL_AUTHORITY_PATH_EXECUTION_NOT_READY',
    upstreamB15ReviewId: b15.reviewId,
    exactB15BoundaryAccepted: accepted,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    executionTasks: accepted ? CAREER_T8_CURRENT_T5_T6_BRIDGE_RESIDUAL_EXECUTION_TASKS : Object.freeze([]),
    executionTaskCount: accepted ? 2 : 0,
    executablePathIds: accepted ? EXECUTABLE_PATH_IDS : Object.freeze([]),
    executablePathCount: accepted ? 2 : 0,
    cheonbuExternalFullTextHoldPreserved: accepted,
    cheonbuPublicWebRetryAuthorized: false,
    cheonbuPathExecutionAuthorized: false,
    t5AlternateNormativeDiscoveryExecutionReady: accepted,
    t6HigherProvenanceNatalDiscoveryExecutionReady: accepted,
    negativeDiscoveryPreservedAsFirstClassResult: accepted,
    fallbackAuthoritySynthesisAuthorized: false,
    crossSourceStitchingAuthorized: false,
    allSixGapsRemainOpen: true,
    unresolvedGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    authorityAcquiredByThisGate: false,
    authorityGapClosedByThisGate: false,
    discoveryPerformedByThisGate: false,
    t8RuleAuthoringAuthorized: false,
    t8ClaimTypeCreationAuthorized: false,
    personalizedT8PackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    controlIds: accepted ? CAREER_T8_CURRENT_T5_T6_BRIDGE_RESIDUAL_EXECUTION_READINESS_CONTROL_IDS : Object.freeze([]),
    controlCount: accepted ? 12 : 0,
    controlsFrozen: accepted,
    implementationEffects: Object.freeze({
      externalAccessesPerformed: 0,
      discoveryExecutionsPerformed: 0,
      candidatesRegistered: 0,
      authorityCandidatesAccepted: 0,
      authorityGapsClosed: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
    }),
    recommendedNextGate: accepted
      ? 'CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_AUTHORITY_PATH_DISCOVERY_EVIDENCE'
      : 'CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_REMEDIATION_EVIDENCE_ADEQUACY_RESIDUAL_PATH_REASSESSMENT_REVIEW',
  });
}
