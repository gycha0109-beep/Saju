import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from './career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import type { CareerT8SynthesisAuthorityGapId } from './career-personalization-t8-synthesis-authority-gap-requirements-review.js';
import {
  I256_QIANLI_P49_FAMILY_RELATION_PRIMARY_CONTEXT_ADEQUACY_REVIEW_CONTROL_IDS,
  I256_QIANLI_P49_FAMILY_RELATION_PRIMARY_CONTEXT_ADEQUACY_REVIEW_VERSION,
  type I256QianliP49FamilyRelationPrimaryContextAdequacyReviewReport,
} from './i256-qianli-p49-family-relation-primary-context-adequacy-review.js';

export const CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_POST_I255_FRONTIER_RECONCILIATION_REVIEW_VERSION =
  'myeonghwa-career-personalization-t8-current-method-residual-authority-post-i255-frontier-reconciliation-review-v1' as const;

export type CareerT8B26FrontierTaskId =
  | 'QIN_P464_BODY_SURFACE'
  | 'FAMILY_RELATION_LIMITS_AND_COMPATIBILITY_SURFACE'
  | 'BRANCH_CLASH_SINGLE_SOURCE_CURRENT_T5_BRIDGE_SURFACE'
  | 'POSITION_SPECIFIC_CURRENT_T5_BRIDGE_SURFACE';

export type CareerT8B26FrontierTaskStatus = 'WAITING_FOR_GENUINELY_NEW_EVIDENCE_SURFACE';

export interface CareerT8B26FrontierTask {
  taskId: CareerT8B26FrontierTaskId;
  targetGapId: CareerT8SynthesisAuthorityGapId;
  status: CareerT8B26FrontierTaskStatus;
  immediatelyExecutable: false;
  repeatedPriorSurfaceSearchAuthorized: false;
  requiredNewEvidenceSurface: string;
  preservedPartialEvidence: string;
  admissionOnSurfaceAcquisition: false;
  gapClosureOnSurfaceAcquisition: false;
  t8AuthoringOnSurfaceAcquisition: false;
}

export const CAREER_T8_B26_POST_I255_FRONTIER_TASKS = Object.freeze([
  Object.freeze({
    taskId: 'QIN_P464_BODY_SURFACE' as const,
    targetGapId: 'EXACT_SUBTYPE_MULTI_CLAIM_TO_CAREER_PATTERN_BINDING_MISSING' as const,
    status: 'WAITING_FOR_GENUINELY_NEW_EVIDENCE_SURFACE' as const,
    immediatelyExecutable: false as const,
    repeatedPriorSurfaceSearchAuthorized: false as const,
    requiredNewEvidenceSurface:
      'Directly accessible Qin Lunshi 2010 printed p.464 section body and sufficient local context, not the already-seen TOC heading or repeated bibliographic metadata.',
    preservedPartialEvidence:
      'Corrected ISBN 9787204098774 and printed p.464 按十神組合選職業 locator remain a formal-provenance partial lead only.',
    admissionOnSurfaceAcquisition: false as const,
    gapClosureOnSurfaceAcquisition: false as const,
    t8AuthoringOnSurfaceAcquisition: false as const,
  }),
  Object.freeze({
    taskId: 'FAMILY_RELATION_LIMITS_AND_COMPATIBILITY_SURFACE' as const,
    targetGapId: 'FAMILY_RELATION_TO_CAREER_PATTERN_BINDING_MISSING' as const,
    status: 'WAITING_FOR_GENUINELY_NEW_EVIDENCE_SURFACE' as const,
    immediatelyExecutable: false as const,
    repeatedPriorSurfaceSearchAuthorized: false as const,
    requiredNewEvidenceSurface:
      'Relation-specific limits/exceptions plus current-method compatibility context, either from genuinely broader source context or an independently adequate compatible source.',
    preservedPartialEvidence:
      'Qianli 1936 p.49 directly supplies named relation-to-Career semantics and explicit structure-versus-effect syntax; coverage remains material partial with two mandatory checks unresolved.',
    admissionOnSurfaceAcquisition: false as const,
    gapClosureOnSurfaceAcquisition: false as const,
    t8AuthoringOnSurfaceAcquisition: false as const,
  }),
  Object.freeze({
    taskId: 'BRANCH_CLASH_SINGLE_SOURCE_CURRENT_T5_BRIDGE_SURFACE' as const,
    targetGapId: 'BRANCH_CLASH_TO_T5_CAREER_SEMANTIC_MODIFIER_MISSING' as const,
    status: 'WAITING_FOR_GENUINELY_NEW_EVIDENCE_SURFACE' as const,
    immediatelyExecutable: false as const,
    repeatedPriorSurfaceSearchAuthorized: false as const,
    requiredNewEvidenceSurface:
      'One independently adequate source passage that binds an identified natal branch clash and participants to a specific governed current-T5 Career semantic with explicit qualitative modification mode and limits.',
    preservedPartialEvidence:
      'Xu clash-to-Career and Qianli relation-local 支冲 evidence remain separate non-stitchable anchors; neither alone supplies the required bridge.',
    admissionOnSurfaceAcquisition: false as const,
    gapClosureOnSurfaceAcquisition: false as const,
    t8AuthoringOnSurfaceAcquisition: false as const,
  }),
  Object.freeze({
    taskId: 'POSITION_SPECIFIC_CURRENT_T5_BRIDGE_SURFACE' as const,
    targetGapId: 'VISIBILITY_POSITION_PLURALITY_TO_CAREER_SEMANTIC_MODIFIER_MISSING' as const,
    status: 'WAITING_FOR_GENUINELY_NEW_EVIDENCE_SURFACE' as const,
    immediatelyExecutable: false as const,
    repeatedPriorSurfaceSearchAuthorized: false as const,
    requiredNewEvidenceSurface:
      'A position/separation-specific source-bound bridge to a specific governed current-T5 Career semantic. Visibility remains unconsumed by this bounded continuation and plurality remains excluded under I254.',
    preservedPartialEvidence:
      'Xu qualitative position/separation Career evidence remains material partial; Qianli 明暗/地位 may not be stitched into a new Career modifier.',
    admissionOnSurfaceAcquisition: false as const,
    gapClosureOnSurfaceAcquisition: false as const,
    t8AuthoringOnSurfaceAcquisition: false as const,
  }),
] as const satisfies readonly CareerT8B26FrontierTask[]);

export const CAREER_T8_B26_POST_I255_FRONTIER_RECONCILIATION_CONTROL_IDS = Object.freeze([
  'B26_CONSUMES_ONLY_THE_EXACT_CONTENT_ADDRESSED_I256_REVIEW_BOUNDARY',
  'THE_HISTORICALLY_ACTIVE_FOUR_REMEDIATION_PATHS_REMAIN_TRACKED_EXACTLY_ONCE',
  'AFTER_I256_ZERO_ACTIVE_PATHS_HAVE_AN_IMMEDIATELY_EXECUTABLE_EXISTING_EVIDENCE_SURFACE',
  'ALL_FOUR_ACTIVE_PATHS_REQUIRE_GENUINELY_NEW_EVIDENCE_SURFACES_BEFORE_REEXECUTION',
  'REPEATED_SEARCH_OF_ALREADY_EXHAUSTED_TOC_P49_XU_OR_POSITION_SURFACES_IS_NOT_AUTHORIZED_AS_PROGRESS',
  'QIN_FAMILY_BRANCH_AND_POSITION_PARTIAL_EVIDENCE_IS_PRESERVED_WITHOUT_CROSS_SOURCE_STITCHING',
  'VISIBILITY_PLURALITY_AND_SEASONAL_DIMENSIONS_REMAIN_UNCONSUMED_IN_THE_CURRENT_BOUNDED_CONTINUATION',
  'I254_PLURALITY_HOLD_REMAINS_CONTROLLING_AND_SEASONAL_REMEDIATION_REMAINS_CONDITIONAL_INACTIVE',
  'MULTI_PATTERN_CONFLICT_POLICY_REMAINS_PACK_LEVEL_DEFERRED',
  'NEW_SURFACE_ACQUISITION_WILL_REQUIRE_LATER_ADEQUACY_AND_AUTHORITY_ADMISSION_REVIEW',
  'ALL_SIX_HISTORICAL_T8_SYNTHESIS_AUTHORITY_GAPS_REMAIN_OPEN',
  'NO_T8_RULE_CLAIM_PACK_NARRATIVE_PREVIEW_OR_PRODUCTION_PROMOTION',
] as const);

export interface CareerPersonalizationT8CurrentMethodResidualAuthorityPostI255FrontierReconciliationReviewReport {
  reviewId: string;
  reviewVersion: typeof CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_POST_I255_FRONTIER_RECONCILIATION_REVIEW_VERSION;
  status:
    | 'RESOLVED_CAREER_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_POST_I255_FRONTIER_RECONCILIATION'
    | 'UPSTREAM_I256_BOUNDARY_INVALID';
  decision:
    | 'FOUR_ACTIVE_PATHS_RECONCILED_ZERO_IMMEDIATE_FOUR_WAIT_FOR_NEW_EVIDENCE_SURFACES_UNCONSUMED_DIMENSIONS_PRESERVED_NO_AUTHORITY_ADMISSION'
    | 'POST_I255_RESIDUAL_AUTHORITY_FRONTIER_NOT_RECONCILED';
  upstreamI256ReviewId: string;
  exactI256BoundaryAccepted: boolean;
  domain: 'career';
  temporalScope: 'natal';
  statusClass: 'research';
  tasks: readonly CareerT8B26FrontierTask[];
  taskCount: 4 | 0;
  immediatelyExecutableTaskCount: 0;
  waitingForNewEvidenceSurfaceTaskCount: 4 | 0;
  allHistoricallyActivePathsRepresentedExactlyOnce: boolean;
  qinWaitingForNewBodySurface: boolean;
  familyWaitingForNewLimitsOrCompatibilitySurface: boolean;
  branchClashWaitingForNewSingleSourceT5Bridge: boolean;
  positionWaitingForNewSpecificT5Bridge: boolean;
  visibilityConsumedByCurrentContinuation: false;
  pluralityConsumedByCurrentContinuation: false;
  pluralityHeldUnderI254: true;
  seasonalConsumedByCurrentContinuation: false;
  seasonalConditionalRemediationActivated: false;
  conflictPolicyRemediationActivated: false;
  broadDiscoveryRestartAuthorizedByThisGate: false;
  repeatedPriorSurfaceSearchAuthorized: false;
  crossSourceRequirementStitchingAuthorized: false;
  newEvidenceSurfaceAcquisitionPerformedByThisGate: false;
  newEvidenceSurfaceAcquisitionNeedsReadinessReview: boolean;
  successfulNewSurfaceAcquisitionAutomaticallyAdmitsAuthority: false;
  successfulNewSurfaceAcquisitionAutomaticallyClosesGap: false;
  allSixHistoricalGapsRemainOpen: true;
  unresolvedGapIds: typeof CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS;
  authorityAdmittedByThisGate: false;
  authorityGapClosedByThisGate: false;
  methodologyScopeExpandedByThisGate: false;
  t8RuleAuthoringAuthorized: false;
  t8ClaimTypeCreationAuthorized: false;
  personalizedT8PackCreationAuthorized: false;
  consumerNarrativeAuthorized: false;
  previewDefaultSwitchAuthorized: false;
  productionPromotionAuthorized: false;
  productionImpact: 'NONE';
  controlIds: readonly (typeof CAREER_T8_B26_POST_I255_FRONTIER_RECONCILIATION_CONTROL_IDS)[number][];
  controlCount: 12 | 0;
  controlsFrozen: boolean;
  implementationEffects: {
    frontierTasksReconciled: 4 | 0;
    immediatelyExecutableTasks: 0;
    tasksWaitingForNewEvidenceSurface: 4 | 0;
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
    | 'CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_NEW_EVIDENCE_SURFACE_ACQUISITION_READINESS_REVIEW'
    | 'CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_POST_I255_FRONTIER_RECONCILIATION_REVIEW';
}

function contentAddressedI256IdentityValid(
  i256: I256QianliP49FamilyRelationPrimaryContextAdequacyReviewReport,
): boolean {
  const { reviewId, ...material } = i256;
  return (
    reviewId ===
    `i256_qianli_p49_family_relation_primary_context_adequacy_review_${deterministicContentHash(material).slice(0, 24)}`
  );
}

function exactI256Accepted(i256: I256QianliP49FamilyRelationPrimaryContextAdequacyReviewReport): boolean {
  return (
    contentAddressedI256IdentityValid(i256) &&
    i256.reviewVersion === I256_QIANLI_P49_FAMILY_RELATION_PRIMARY_CONTEXT_ADEQUACY_REVIEW_VERSION &&
    i256.status === 'RESOLVED_QIANLI_P49_FAMILY_RELATION_PRIMARY_CONTEXT_ADEQUACY_REVIEW' &&
    i256.decision ===
      'I255_SATISFIES_STRUCTURE_EFFECT_DISTINCTION_ONLY_TWO_FAMILY_REQUIREMENTS_REMAIN_NEW_EVIDENCE_SURFACE_REQUIRED_NO_AUTHORITY_ADMISSION' &&
    i256.exactI255BoundaryAccepted &&
    i256.domain === 'career' &&
    i256.temporalScope === 'natal' &&
    i256.statusClass === 'research' &&
    i256.familyRelationCoverageClass === 'MATERIAL_PARTIAL_REQUIREMENT_COVERAGE' &&
    i256.familyRequirementCheckCount === 3 &&
    i256.satisfiedFamilyRequirementCheckCount === 1 &&
    i256.remainingFamilyRequirementCheckCount === 2 &&
    i256.structureVersusSemanticEffectDistinctionSatisfied &&
    i256.explicitRelationSpecificLimitsOrExceptionsSatisfied === false &&
    i256.currentMethodCompatibilitySatisfied === false &&
    i256.sameP49ReinspectionWithoutNewContextAuthorized === false &&
    i256.familyPathImmediatelyExecutableNow === false &&
    i256.familyPathWaitingForNewEvidenceSurface &&
    i256.authorityAdmissionReady === false &&
    i256.gapClosureReady === false &&
    i256.allSixHistoricalGapsRemainOpen &&
    deterministicContentHash(i256.unresolvedGapIds) === deterministicContentHash(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS) &&
    i256.controlCount === 12 &&
    i256.controlsFrozen &&
    deterministicContentHash(i256.controlIds) ===
      deterministicContentHash(I256_QIANLI_P49_FAMILY_RELATION_PRIMARY_CONTEXT_ADEQUACY_REVIEW_CONTROL_IDS) &&
    i256.t8RuleAuthoringAuthorized === false &&
    i256.personalizedT8PackCreationAuthorized === false &&
    i256.productionPromotionAuthorized === false &&
    i256.productionImpact === 'NONE' &&
    i256.recommendedNextGate ===
      'CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_POST_I255_FRONTIER_RECONCILIATION_REVIEW'
  );
}

function frontierCoverageValid(): boolean {
  const taskIds = CAREER_T8_B26_POST_I255_FRONTIER_TASKS.map((task) => task.taskId);
  const targetGapIds = CAREER_T8_B26_POST_I255_FRONTIER_TASKS.map((task) => task.targetGapId);
  return (
    taskIds.length === 4 &&
    new Set(taskIds).size === 4 &&
    new Set(targetGapIds).size === 4 &&
    CAREER_T8_B26_POST_I255_FRONTIER_TASKS.every(
      (task) => !task.immediatelyExecutable && !task.repeatedPriorSurfaceSearchAuthorized,
    )
  );
}

function finalized(
  material: Omit<
    CareerPersonalizationT8CurrentMethodResidualAuthorityPostI255FrontierReconciliationReviewReport,
    'reviewId'
  >,
): CareerPersonalizationT8CurrentMethodResidualAuthorityPostI255FrontierReconciliationReviewReport {
  return {
    reviewId: `career_t8_current_method_residual_authority_post_i255_frontier_reconciliation_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildCareerPersonalizationT8CurrentMethodResidualAuthorityPostI255FrontierReconciliationReview(
  i256: I256QianliP49FamilyRelationPrimaryContextAdequacyReviewReport,
): CareerPersonalizationT8CurrentMethodResidualAuthorityPostI255FrontierReconciliationReviewReport {
  const upstreamAccepted = exactI256Accepted(i256);
  const coverageAccepted = frontierCoverageValid();
  const accepted = upstreamAccepted && coverageAccepted;

  return finalized({
    reviewVersion:
      CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_POST_I255_FRONTIER_RECONCILIATION_REVIEW_VERSION,
    status: accepted
      ? 'RESOLVED_CAREER_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_POST_I255_FRONTIER_RECONCILIATION'
      : 'UPSTREAM_I256_BOUNDARY_INVALID',
    decision: accepted
      ? 'FOUR_ACTIVE_PATHS_RECONCILED_ZERO_IMMEDIATE_FOUR_WAIT_FOR_NEW_EVIDENCE_SURFACES_UNCONSUMED_DIMENSIONS_PRESERVED_NO_AUTHORITY_ADMISSION'
      : 'POST_I255_RESIDUAL_AUTHORITY_FRONTIER_NOT_RECONCILED',
    upstreamI256ReviewId: i256.reviewId,
    exactI256BoundaryAccepted: upstreamAccepted,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    tasks: accepted ? CAREER_T8_B26_POST_I255_FRONTIER_TASKS : Object.freeze([]),
    taskCount: accepted ? 4 : 0,
    immediatelyExecutableTaskCount: 0,
    waitingForNewEvidenceSurfaceTaskCount: accepted ? 4 : 0,
    allHistoricallyActivePathsRepresentedExactlyOnce: accepted,
    qinWaitingForNewBodySurface: accepted,
    familyWaitingForNewLimitsOrCompatibilitySurface: accepted,
    branchClashWaitingForNewSingleSourceT5Bridge: accepted,
    positionWaitingForNewSpecificT5Bridge: accepted,
    visibilityConsumedByCurrentContinuation: false,
    pluralityConsumedByCurrentContinuation: false,
    pluralityHeldUnderI254: true,
    seasonalConsumedByCurrentContinuation: false,
    seasonalConditionalRemediationActivated: false,
    conflictPolicyRemediationActivated: false,
    broadDiscoveryRestartAuthorizedByThisGate: false,
    repeatedPriorSurfaceSearchAuthorized: false,
    crossSourceRequirementStitchingAuthorized: false,
    newEvidenceSurfaceAcquisitionPerformedByThisGate: false,
    newEvidenceSurfaceAcquisitionNeedsReadinessReview: accepted,
    successfulNewSurfaceAcquisitionAutomaticallyAdmitsAuthority: false,
    successfulNewSurfaceAcquisitionAutomaticallyClosesGap: false,
    allSixHistoricalGapsRemainOpen: true,
    unresolvedGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    authorityAdmittedByThisGate: false,
    authorityGapClosedByThisGate: false,
    methodologyScopeExpandedByThisGate: false,
    t8RuleAuthoringAuthorized: false,
    t8ClaimTypeCreationAuthorized: false,
    personalizedT8PackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    productionImpact: 'NONE',
    controlIds: accepted ? CAREER_T8_B26_POST_I255_FRONTIER_RECONCILIATION_CONTROL_IDS : Object.freeze([]),
    controlCount: accepted ? 12 : 0,
    controlsFrozen: accepted,
    implementationEffects: {
      frontierTasksReconciled: accepted ? 4 : 0,
      immediatelyExecutableTasks: 0,
      tasksWaitingForNewEvidenceSurface: accepted ? 4 : 0,
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
      ? 'CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_NEW_EVIDENCE_SURFACE_ACQUISITION_READINESS_REVIEW'
      : 'CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_POST_I255_FRONTIER_RECONCILIATION_REVIEW',
  });
}
