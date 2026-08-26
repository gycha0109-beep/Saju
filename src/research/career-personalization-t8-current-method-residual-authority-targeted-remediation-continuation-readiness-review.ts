import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from './career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import type { CareerT8SynthesisAuthorityGapId } from './career-personalization-t8-synthesis-authority-gap-requirements-review.js';
import {
  CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_TARGETED_REMEDIATION_EVIDENCE_ADEQUACY_REVIEW_VERSION,
  CAREER_T8_B24_GAP_ASSESSMENTS,
  CAREER_T8_B24_TARGETED_EVIDENCE_ADEQUACY_CONTROL_IDS,
  type CareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationEvidenceAdequacyReviewReport,
} from './career-personalization-t8-current-method-residual-authority-targeted-remediation-evidence-adequacy-review.js';

export const CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_TARGETED_REMEDIATION_CONTINUATION_READINESS_REVIEW_VERSION =
  'myeonghwa-career-personalization-t8-current-method-residual-authority-targeted-remediation-continuation-readiness-review-v1' as const;

export type CareerT8B25ContinuationTaskId =
  | 'QIN_P464_BODY_ACCESS_CONTINUATION'
  | 'QIANLI_P49_FAMILY_RELATION_PRIMARY_CONTEXT_CONTINUATION'
  | 'BRANCH_CLASH_SINGLE_SOURCE_CURRENT_T5_BRIDGE_CONTINUATION'
  | 'POSITION_CURRENT_T5_BRIDGE_CONTINUATION';

export type CareerT8B25ContinuationStatus =
  | 'WAITING_NEW_BODY_ACCESS_SURFACE'
  | 'EXECUTABLE_NEXT_GATE_EXISTING_PRIMARY_CONTEXT'
  | 'WAITING_NEW_SINGLE_SOURCE_CANDIDATE'
  | 'WAITING_NEW_POSITION_T5_BRIDGE_VISIBILITY_PLURALITY_UNCONSUMED';

export interface CareerT8B25ContinuationTask {
  taskId: CareerT8B25ContinuationTaskId;
  targetGapId: CareerT8SynthesisAuthorityGapId;
  status: CareerT8B25ContinuationStatus;
  objective: string;
  executionTrigger: string;
  currentEvidenceSurfaceSufficientToExecute: boolean;
  immediatelyExecutable: boolean;
  broadSearchAuthorized: false;
  repeatPreviouslyNegativeSearchWithoutNewSurfaceAuthorized: false;
  crossSourceStitchingAuthorized: false;
  authorityAdmissionOnCompletion: false;
  gapClosureOnCompletion: false;
  t8AuthoringOnCompletion: false;
}

export const CAREER_T8_B25_CONTINUATION_TASKS = Object.freeze([
  Object.freeze({
    taskId: 'QIN_P464_BODY_ACCESS_CONTINUATION',
    targetGapId: 'EXACT_SUBTYPE_MULTI_CLAIM_TO_CAREER_PATTERN_BINDING_MISSING',
    status: 'WAITING_NEW_BODY_ACCESS_SURFACE',
    objective:
      'Inspect the exact printed p.464 按十神組合選職業 body and sufficient surrounding context, then evaluate subtype preservation, direct Career composition, exceptions, and 旺衰/格局/用神/喜忌 dependencies.',
    executionTrigger:
      'A genuinely new body-access surface must become available: direct scan/page image, full-text body, library preview, lawful digital edition, or another provenance-equivalent source that exposes the exact p.464 local context. Re-finding the same TOC heading is not a trigger.',
    currentEvidenceSurfaceSufficientToExecute: false,
    immediatelyExecutable: false,
    broadSearchAuthorized: false,
    repeatPreviouslyNegativeSearchWithoutNewSurfaceAuthorized: false,
    crossSourceStitchingAuthorized: false,
    authorityAdmissionOnCompletion: false,
    gapClosureOnCompletion: false,
    t8AuthoringOnCompletion: false,
  }),
  Object.freeze({
    taskId: 'QIANLI_P49_FAMILY_RELATION_PRIMARY_CONTEXT_CONTINUATION',
    targetGapId: 'FAMILY_RELATION_TO_CAREER_PATTERN_BINDING_MISSING',
    status: 'EXECUTABLE_NEXT_GATE_EXISTING_PRIMARY_CONTEXT',
    objective:
      'Reinspect the corrected 1936 韋千里命學講義 primary witness around printed p.49 / PDF p.336, including the local 事業 context and directly adjacent primary pages when accessible, only for the three remaining family-relation adequacy questions: explicit limits/exceptions, governed-current-method compatibility, and explicit structure-versus-semantic-effect distinction.',
    executionTrigger:
      'Use the already corrected I253 primary witness and exact p.49 locator. No broad source discovery is required; only source-local primary context inspection is authorized.',
    currentEvidenceSurfaceSufficientToExecute: true,
    immediatelyExecutable: true,
    broadSearchAuthorized: false,
    repeatPreviouslyNegativeSearchWithoutNewSurfaceAuthorized: false,
    crossSourceStitchingAuthorized: false,
    authorityAdmissionOnCompletion: false,
    gapClosureOnCompletion: false,
    t8AuthoringOnCompletion: false,
  }),
  Object.freeze({
    taskId: 'BRANCH_CLASH_SINGLE_SOURCE_CURRENT_T5_BRIDGE_CONTINUATION',
    targetGapId: 'BRANCH_CLASH_TO_T5_CAREER_SEMANTIC_MODIFIER_MISSING',
    status: 'WAITING_NEW_SINGLE_SOURCE_CANDIDATE',
    objective:
      'Acquire one independently adequate natal source passage that itself connects an identified branch clash and participants to a specific governed current-T5 Career semantic with an explicit qualitative modification mode and material exceptions.',
    executionTrigger:
      'A genuinely new single-source candidate or new exact passage locator must be identified. Xu plus Qianli may not be stitched, and derivative repetition of already rejected material is not a trigger.',
    currentEvidenceSurfaceSufficientToExecute: false,
    immediatelyExecutable: false,
    broadSearchAuthorized: false,
    repeatPreviouslyNegativeSearchWithoutNewSurfaceAuthorized: false,
    crossSourceStitchingAuthorized: false,
    authorityAdmissionOnCompletion: false,
    gapClosureOnCompletion: false,
    t8AuthoringOnCompletion: false,
  }),
  Object.freeze({
    taskId: 'POSITION_CURRENT_T5_BRIDGE_CONTINUATION',
    targetGapId: 'VISIBILITY_POSITION_PLURALITY_TO_CAREER_SEMANTIC_MODIFIER_MISSING',
    status: 'WAITING_NEW_POSITION_T5_BRIDGE_VISIBILITY_PLURALITY_UNCONSUMED',
    objective:
      'Acquire a source-bound position/separation to specific governed current-T5 Career semantic bridge. Visibility and plurality are not consumed by the current bounded continuation while their Career authority remains absent; plurality additionally remains under I254 primary-binding hold.',
    executionTrigger:
      'A genuinely new position-specific Career/current-T5 source candidate or exact passage locator must be identified. Generic 明暗/地位 structure text or repeated Xu position text without the missing T5 bridge is not a trigger.',
    currentEvidenceSurfaceSufficientToExecute: false,
    immediatelyExecutable: false,
    broadSearchAuthorized: false,
    repeatPreviouslyNegativeSearchWithoutNewSurfaceAuthorized: false,
    crossSourceStitchingAuthorized: false,
    authorityAdmissionOnCompletion: false,
    gapClosureOnCompletion: false,
    t8AuthoringOnCompletion: false,
  }),
] as const satisfies readonly CareerT8B25ContinuationTask[]);

export const CAREER_T8_B25_CONTINUATION_READINESS_CONTROL_IDS = Object.freeze([
  'B25_CONSUMES_ONLY_THE_EXACT_CONTENT_ADDRESSED_B24_ADEQUACY_BOUNDARY',
  'THE_FOUR_ACTIVE_PRIMARY_REMEDIATION_PATHS_REMAIN_TRACKED_BUT_READINESS_IS_EVALUATED_PER_EVIDENCE_SURFACE',
  'ONLY_QIANLI_P49_SOURCE_LOCAL_PRIMARY_CONTEXT_REINSPECTION_IS_IMMEDIATELY_EXECUTABLE',
  'QIN_P464_MAY_NOT_REPEAT_TOC_DISCOVERY_AND_REQUIRES_A_GENUINELY_NEW_BODY_ACCESS_SURFACE',
  'BRANCH_CLASH_MAY_NOT_REPEAT_NEGATIVE_DISCOVERY_AND_REQUIRES_A_NEW_SINGLE_SOURCE_CURRENT_T5_BRIDGE_CANDIDATE',
  'POSITION_REQUIRES_A_NEW_SPECIFIC_CURRENT_T5_BRIDGE_WHILE_VISIBILITY_IS_CURRENTLY_UNCONSUMED',
  'PLURALITY_REMAINS_UNCONSUMED_AND_I254_HELD_WITHOUT_PRIMARY_PAGE_BINDING',
  'SEASONAL_PHASE_REMAINS_UNCONSUMED_AND_ITS_CONDITIONAL_REMEDIATION_IS_NOT_ACTIVATED',
  'MULTI_PATTERN_CONFLICT_POLICY_REMAINS_PACK_LEVEL_DEFERRED',
  'BROAD_SEARCH_RESTART_REPEATED_NEGATIVE_SEARCH_AND_CROSS_SOURCE_REQUIREMENT_STITCHING_ARE_FORBIDDEN',
  'COMPLETING_A_CONTINUATION_TASK_DOES_NOT_AUTOMATICALLY_ADMIT_AUTHORITY_CLOSE_A_GAP_OR_AUTHOR_T8',
  'NO_RULE_CLAIM_PACK_NARRATIVE_PREVIEW_OR_PRODUCTION_ARTIFACT_IS_CREATED_BY_THIS_READINESS_GATE',
] as const);

export interface CareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationContinuationReadinessReviewReport {
  reviewId: string;
  reviewVersion: typeof CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_TARGETED_REMEDIATION_CONTINUATION_READINESS_REVIEW_VERSION;
  status:
    | 'RESOLVED_CAREER_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_TARGETED_REMEDIATION_CONTINUATION_READINESS'
    | 'UPSTREAM_B24_BOUNDARY_INVALID';
  decision:
    | 'FOUR_ACTIVE_PATHS_TRACKED_ONLY_QIANLI_P49_CONTEXT_EXECUTABLE_THREE_PATHS_WAIT_FOR_NEW_EVIDENCE_SURFACES_SEASON_VISIBILITY_PLURALITY_UNCONSUMED_CONFLICT_DEFERRED_NO_AUTHORITY_ADMISSION'
    | 'TARGETED_REMEDIATION_CONTINUATION_READINESS_NOT_ESTABLISHED';
  upstreamB24ReviewId: string;
  exactB24BoundaryAccepted: boolean;
  domain: 'career';
  temporalScope: 'natal';
  statusClass: 'research';
  tasks: readonly CareerT8B25ContinuationTask[];
  taskCount: 4 | 0;
  immediatelyExecutableTaskCount: 1 | 0;
  evidenceSurfaceBlockedTaskCount: 3 | 0;
  activePrimaryRemediationPathCountPreserved: 4 | 0;
  onlyFamilyPrimaryContextExecutableNow: boolean;
  qinWaitingForNewBodyAccessSurface: boolean;
  branchClashWaitingForNewSingleSourceCandidate: boolean;
  positionWaitingForNewSpecificT5Bridge: boolean;
  visibilityConsumedByCurrentContinuation: false;
  pluralityConsumedByCurrentContinuation: false;
  pluralityHeldUnderI254: boolean;
  seasonalConsumedByCurrentContinuation: false;
  seasonalConditionalRemediationActivated: false;
  conflictPolicyRemediationActivated: false;
  broadSearchRestartAuthorized: false;
  repeatedNegativeSearchAuthorized: false;
  crossSourceRequirementStitchingAuthorized: false;
  continuationExecutionAutomaticallyAdmitsAuthority: false;
  continuationExecutionAutomaticallyClosesGap: false;
  allSixHistoricalGapsRemainOpen: true;
  unresolvedGapIds: readonly CareerT8SynthesisAuthorityGapId[];
  methodologyScopeExpandedByThisGate: false;
  authorityAdmittedByThisGate: false;
  authorityGapClosedByThisGate: false;
  t8RuleAuthoringAuthorized: false;
  t8ClaimTypeCreationAuthorized: false;
  personalizedT8PackCreationAuthorized: false;
  consumerNarrativeAuthorized: false;
  previewDefaultSwitchAuthorized: false;
  productionPromotionAuthorized: false;
  productionImpact: 'NONE';
  controlIds: readonly (typeof CAREER_T8_B25_CONTINUATION_READINESS_CONTROL_IDS)[number][];
  controlCount: 12 | 0;
  controlsFrozen: boolean;
  implementationEffects: {
    continuationTasksMaterialized: 4 | 0;
    immediatelyExecutableTasks: 1 | 0;
    evidenceSurfaceBlockedTasks: 3 | 0;
    dimensionsExplicitlyUnconsumedForCurrentContinuation: 3 | 0;
    newSourceAcquisitionsPerformed: 0;
    authorityCandidatesAccepted: 0;
    authorityGapsClosed: 0;
    ruleDefinitionsCreated: 0;
    claimTypesCreated: 0;
    interpretationPacksCreated: 0;
    narrativePlansCreated: 0;
    previewRoutesChanged: 0;
  };
  recommendedNextGate:
    | 'QIANLI_P49_FAMILY_RELATION_PRIMARY_CONTEXT_ADEQUACY_EVIDENCE'
    | 'CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_TARGETED_REMEDIATION_CONTINUATION_READINESS_REVIEW';
}

function contentAddressedB24IdentityValid(
  b24: CareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationEvidenceAdequacyReviewReport,
): boolean {
  const { reviewId, ...material } = b24;
  return (
    reviewId ===
    `career_t8_current_method_residual_authority_targeted_remediation_evidence_adequacy_${deterministicContentHash(material).slice(0, 24)}`
  );
}

function exactB24Accepted(
  b24: CareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationEvidenceAdequacyReviewReport,
): boolean {
  return (
    contentAddressedB24IdentityValid(b24) &&
    b24.reviewVersion ===
      CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_TARGETED_REMEDIATION_EVIDENCE_ADEQUACY_REVIEW_VERSION &&
    b24.status ===
      'RESOLVED_CAREER_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_TARGETED_REMEDIATION_EVIDENCE_ADEQUACY_REVIEW' &&
    b24.decision ===
      'B23_FAMILY_RELATION_MATERIALLY_ADVANCED_BUT_ZERO_REQUIREMENTS_FULLY_SATISFIED_FOUR_ACTIVE_ONE_CONDITIONAL_ONE_DEFERRED_REMEDIATION_PATHS_REMAIN_NO_AUTHORITY_ADMISSION' &&
    b24.exactB23BoundaryAccepted &&
    b24.domain === 'career' &&
    b24.temporalScope === 'natal' &&
    b24.statusClass === 'research' &&
    b24.gapAssessmentCount === 6 &&
    deterministicContentHash(b24.gapAssessments) === deterministicContentHash(CAREER_T8_B24_GAP_ASSESSMENTS) &&
    b24.gapsWithMaterialPartialCoverageCount === 3 &&
    b24.gapsWithAnyLeadOrPartialCoverageCount === 5 &&
    b24.fullySatisfiedGapCount === 0 &&
    b24.allSixGapsRemainOpen &&
    deterministicContentHash(b24.unresolvedGapIds) === deterministicContentHash(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS) &&
    b24.familyRelationCoverageMateriallyAdvanced &&
    b24.familyRelationRemediationNarrowed &&
    b24.qinP464BodyAcquisitionStillRequired &&
    b24.branchClashSingleSourceT5BridgeStillRequired &&
    b24.positionVisibilityDimensionSpecificBridgeStillRequired &&
    b24.pluralityRemainsExcludedUnderI254 &&
    b24.seasonalRemediationExecutableNow === false &&
    b24.conflictPolicyRemediationExecutableNow === false &&
    b24.activePrimaryRemediationPathCount === 4 &&
    b24.conditionalRemediationPathCount === 1 &&
    b24.packLevelDeferredRemediationPathCount === 1 &&
    b24.b23EvidenceAdequateForContinuationPlanning &&
    b24.b23EvidenceAdequateForAuthorityAdmission === false &&
    b24.b23EvidenceAdequateForGapClosure === false &&
    b24.crossSourceRequirementStitchingAuthorized === false &&
    b24.relativeForceOrAutomaticPrecedenceAuthorized === false &&
    b24.authorityAdmittedByThisGate === false &&
    b24.authorityGapClosedByThisGate === false &&
    b24.controlCount === 12 &&
    b24.controlsFrozen &&
    deterministicContentHash(b24.controlIds) === deterministicContentHash(CAREER_T8_B24_TARGETED_EVIDENCE_ADEQUACY_CONTROL_IDS) &&
    b24.t8RuleAuthoringAuthorized === false &&
    b24.personalizedT8PackCreationAuthorized === false &&
    b24.productionPromotionAuthorized === false &&
    b24.productionImpact === 'NONE' &&
    b24.recommendedNextGate ===
      'CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_TARGETED_REMEDIATION_CONTINUATION_READINESS_REVIEW'
  );
}

function finalized(
  material: Omit<
    CareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationContinuationReadinessReviewReport,
    'reviewId'
  >,
): CareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationContinuationReadinessReviewReport {
  return {
    reviewId: `career_t8_current_method_residual_authority_targeted_remediation_continuation_readiness_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildCareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationContinuationReadinessReview(
  b24: CareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationEvidenceAdequacyReviewReport,
): CareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationContinuationReadinessReviewReport {
  const accepted = exactB24Accepted(b24);

  return finalized({
    reviewVersion:
      CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_TARGETED_REMEDIATION_CONTINUATION_READINESS_REVIEW_VERSION,
    status: accepted
      ? 'RESOLVED_CAREER_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_TARGETED_REMEDIATION_CONTINUATION_READINESS'
      : 'UPSTREAM_B24_BOUNDARY_INVALID',
    decision: accepted
      ? 'FOUR_ACTIVE_PATHS_TRACKED_ONLY_QIANLI_P49_CONTEXT_EXECUTABLE_THREE_PATHS_WAIT_FOR_NEW_EVIDENCE_SURFACES_SEASON_VISIBILITY_PLURALITY_UNCONSUMED_CONFLICT_DEFERRED_NO_AUTHORITY_ADMISSION'
      : 'TARGETED_REMEDIATION_CONTINUATION_READINESS_NOT_ESTABLISHED',
    upstreamB24ReviewId: b24.reviewId,
    exactB24BoundaryAccepted: accepted,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    tasks: accepted ? CAREER_T8_B25_CONTINUATION_TASKS : Object.freeze([]),
    taskCount: accepted ? 4 : 0,
    immediatelyExecutableTaskCount: accepted ? 1 : 0,
    evidenceSurfaceBlockedTaskCount: accepted ? 3 : 0,
    activePrimaryRemediationPathCountPreserved: accepted ? 4 : 0,
    onlyFamilyPrimaryContextExecutableNow: accepted,
    qinWaitingForNewBodyAccessSurface: accepted,
    branchClashWaitingForNewSingleSourceCandidate: accepted,
    positionWaitingForNewSpecificT5Bridge: accepted,
    visibilityConsumedByCurrentContinuation: false,
    pluralityConsumedByCurrentContinuation: false,
    pluralityHeldUnderI254: accepted,
    seasonalConsumedByCurrentContinuation: false,
    seasonalConditionalRemediationActivated: false,
    conflictPolicyRemediationActivated: false,
    broadSearchRestartAuthorized: false,
    repeatedNegativeSearchAuthorized: false,
    crossSourceRequirementStitchingAuthorized: false,
    continuationExecutionAutomaticallyAdmitsAuthority: false,
    continuationExecutionAutomaticallyClosesGap: false,
    allSixHistoricalGapsRemainOpen: true,
    unresolvedGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    methodologyScopeExpandedByThisGate: false,
    authorityAdmittedByThisGate: false,
    authorityGapClosedByThisGate: false,
    t8RuleAuthoringAuthorized: false,
    t8ClaimTypeCreationAuthorized: false,
    personalizedT8PackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    productionImpact: 'NONE',
    controlIds: accepted ? CAREER_T8_B25_CONTINUATION_READINESS_CONTROL_IDS : Object.freeze([]),
    controlCount: accepted ? 12 : 0,
    controlsFrozen: accepted,
    implementationEffects: {
      continuationTasksMaterialized: accepted ? 4 : 0,
      immediatelyExecutableTasks: accepted ? 1 : 0,
      evidenceSurfaceBlockedTasks: accepted ? 3 : 0,
      dimensionsExplicitlyUnconsumedForCurrentContinuation: accepted ? 3 : 0,
      newSourceAcquisitionsPerformed: 0,
      authorityCandidatesAccepted: 0,
      authorityGapsClosed: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
    },
    recommendedNextGate: accepted
      ? 'QIANLI_P49_FAMILY_RELATION_PRIMARY_CONTEXT_ADEQUACY_EVIDENCE'
      : 'CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_TARGETED_REMEDIATION_CONTINUATION_READINESS_REVIEW',
  });
}
