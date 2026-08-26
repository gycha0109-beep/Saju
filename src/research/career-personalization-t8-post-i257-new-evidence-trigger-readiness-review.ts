import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from './career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import type { CareerT8SynthesisAuthorityGapId } from './career-personalization-t8-synthesis-authority-gap-requirements-review.js';
import {
  CAREER_PERSONALIZATION_T8_POST_I257_RESIDUAL_AUTHORITY_FRONTIER_RECONCILIATION_REVIEW_VERSION,
  CAREER_T8_B30_POST_I257_FRONTIER_CONTROL_IDS,
  CAREER_T8_B30_RESIDUAL_FRONTIER_LANES,
  type CareerPersonalizationT8PostI257ResidualAuthorityFrontierReconciliationReviewReport,
} from './career-personalization-t8-post-i257-residual-authority-frontier-reconciliation-review.js';

export const CAREER_PERSONALIZATION_T8_POST_I257_NEW_EVIDENCE_TRIGGER_READINESS_REVIEW_VERSION =
  'myeonghwa-career-personalization-t8-post-i257-new-evidence-trigger-readiness-review-v1' as const;

export type CareerT8B31TriggerId =
  | 'QIN_P464_DIRECT_BODY_TRIGGER'
  | 'QIANLI_EXACT_1936_TARGET_PAGE_ACCESS_TRIGGER'
  | 'BRANCH_CLASH_NORMATIVE_NATAL_BRIDGE_TRIGGER'
  | 'POSITION_CURRENT_T5_BRIDGE_TRIGGER';

export interface CareerT8B31EvidenceTriggerContract {
  triggerId: CareerT8B31TriggerId;
  targetGapId: CareerT8SynthesisAuthorityGapId;
  currentlySatisfied: false;
  laneReopensWhenAllConditionsSatisfied: true;
  requiredConditions: readonly string[];
  prohibitedSubstitutes: readonly string[];
  activationAutomaticallyAdmitsAuthority: false;
  activationAutomaticallyClosesGap: false;
  activationRequiresFollowupAdequacyReview: true;
}

export const CAREER_T8_B31_EVIDENCE_TRIGGER_CONTRACTS = Object.freeze([
  Object.freeze({
    triggerId: 'QIN_P464_DIRECT_BODY_TRIGGER' as const,
    targetGapId: 'EXACT_SUBTYPE_MULTI_CLAIM_TO_CAREER_PATTERN_BINDING_MISSING' as const,
    currentlySatisfied: false as const,
    laneReopensWhenAllConditionsSatisfied: true as const,
    requiredConditions: Object.freeze([
      'A changed evidence surface directly exposes Qin Lunshi printed p.464 Career body rather than TOC or bibliography only.',
      'The source identity and edition/locator are stable enough to bind the acquired body to the frozen Qin target.',
      'Local context around the target passage is inspectable so scope, limits and exceptions can be evaluated.',
    ]),
    prohibitedSubstitutes: Object.freeze([
      'Repeated PDFCoffee TOC/catalog metadata without p.464 body.',
      'Search snippets that mention the section without target-body context.',
      'An inaccessible download endpoint with no inspectable target passage.',
    ]),
    activationAutomaticallyAdmitsAuthority: false as const,
    activationAutomaticallyClosesGap: false as const,
    activationRequiresFollowupAdequacyReview: true as const,
  }),
  Object.freeze({
    triggerId: 'QIANLI_EXACT_1936_TARGET_PAGE_ACCESS_TRIGGER' as const,
    targetGapId: 'FAMILY_RELATION_TO_CAREER_PATTERN_BINDING_MISSING' as const,
    currentlySatisfied: false as const,
    laneReopensWhenAllConditionsSatisfied: true as const,
    requiredConditions: Object.freeze([
      'Direct page access is available for at least one target page within printed p.50-p.53 / PDF zero-based 336-339.',
      'The directly accessed page is demonstrably from exact witness nlc:data_416,01jh000368,10155.',
      'The Career disclaimer text, if present, is directly inspectable on the exact witness rather than inferred from a derivative transcription.',
    ]),
    prohibitedSubstitutes: Object.freeze([
      'Repeating the same cache-miss state without observable access change.',
      'Derivative transcription alone, including the locator lead labelled 千里命稿.',
      'The different 1934 NLC witness alone.',
      'Inference from neighboring p.49/p.54 or page position alone.',
    ]),
    activationAutomaticallyAdmitsAuthority: false as const,
    activationAutomaticallyClosesGap: false as const,
    activationRequiresFollowupAdequacyReview: true as const,
  }),
  Object.freeze({
    triggerId: 'BRANCH_CLASH_NORMATIVE_NATAL_BRIDGE_TRIGGER' as const,
    targetGapId: 'BRANCH_CLASH_TO_T5_CAREER_SEMANTIC_MODIFIER_MISSING' as const,
    currentlySatisfied: false as const,
    laneReopensWhenAllConditionsSatisfied: true as const,
    requiredConditions: Object.freeze([
      'A genuinely new independently adequate normative source is acquired.',
      'The passage is natal in scope rather than merely temporal 운/身數 scope.',
      'One source explicitly binds branch clash to a specific governed current-T5 Career semantic.',
      'The same source supplies a qualitative modification mode and enough limits/context to prevent unrestricted generalization.',
    ]),
    prohibitedSubstitutes: Object.freeze([
      'The already-exhausted recent web lead that links 印星冲 to work instability/job change.',
      'A temporal 운 example used as if it were natal authority.',
      'Cross-source stitching of clash from one source and Career effect from another.',
    ]),
    activationAutomaticallyAdmitsAuthority: false as const,
    activationAutomaticallyClosesGap: false as const,
    activationRequiresFollowupAdequacyReview: true as const,
  }),
  Object.freeze({
    triggerId: 'POSITION_CURRENT_T5_BRIDGE_TRIGGER' as const,
    targetGapId: 'VISIBILITY_POSITION_PLURALITY_TO_CAREER_SEMANTIC_MODIFIER_MISSING' as const,
    currentlySatisfied: false as const,
    laneReopensWhenAllConditionsSatisfied: true as const,
    requiredConditions: Object.freeze([
      'A genuinely new independently adequate position/separation-specific source is acquired.',
      'The source explicitly binds position/separation to a specific governed current-T5 Career semantic.',
      'The passage provides sufficient scope or limits to distinguish positional structure from an unrestricted broad Career statement.',
    ]),
    prohibitedSubstitutes: Object.freeze([
      'Recycling the existing Xu position partial as a new surface.',
      'Recycling Qianli 明暗/地位 observations without a current-T5 Career bridge.',
      'Using plurality, visibility or seasonal dimensions that remain unconsumed in the current continuation.',
    ]),
    activationAutomaticallyAdmitsAuthority: false as const,
    activationAutomaticallyClosesGap: false as const,
    activationRequiresFollowupAdequacyReview: true as const,
  }),
] as const satisfies readonly CareerT8B31EvidenceTriggerContract[]);

export const CAREER_T8_B31_TRIGGER_READINESS_CONTROL_IDS = Object.freeze([
  'B31_CONSUMES_ONLY_THE_EXACT_CONTENT_ADDRESSED_B30_FRONTIER_BOUNDARY',
  'EACH_OF_FOUR_ACTIVE_PATHS_HAS_ONE_EXPLICIT_TRIGGER_CONTRACT_AND_ZERO_TRIGGERS_ARE_CURRENTLY_SATISFIED',
  'TRIGGER_ACTIVATION_REQUIRES_ALL_LANE_SPECIFIC_CONDITIONS_NOT_MERE_DISCOVERY_OF_A_RELATED_URL_OR_SNIPPET',
  'QIN_TRIGGER_REQUIRES_DIRECT_P464_BODY_AND_LOCAL_CONTEXT',
  'FAMILY_TRIGGER_REQUIRES_DIRECT_ACCESS_TO_THE_EXACT_1936_NLC_WITNESS_TARGET_PAGES',
  'BRANCH_TRIGGER_REQUIRES_A_NEW_SINGLE_SOURCE_NORMATIVE_NATAL_CURRENT_T5_BRIDGE_WITH_LIMITS',
  'POSITION_TRIGGER_REQUIRES_A_NEW_INDEPENDENT_POSITION_TO_CURRENT_T5_BRIDGE_WITH_SCOPE_LIMITS',
  'TRIGGER_ACTIVATION_NEVER_AUTOMATICALLY_ADMITS_AUTHORITY_OR_CLOSES_A_GAP_AND_ALWAYS_REQUIRES_ADEQUACY_REVIEW',
  'BROAD_SEARCH_RESTART_REPEATED_EXHAUSTED_SURFACE_SEARCH_AND_CROSS_SOURCE_STITCHING_REMAIN_PROHIBITED',
  'VISIBILITY_PLURALITY_SEASONAL_REMAIN_UNCONSUMED_SEASONAL_CONDITIONAL_INACTIVE_CONFLICT_PACK_LEVEL_DEFERRED',
  'ALL_SIX_HISTORICAL_T8_SYNTHESIS_AUTHORITY_GAPS_REMAIN_OPEN_WITH_ZERO_CURRENTLY_EXECUTABLE_LANES',
  'NO_T8_RULE_CLAIM_PACK_NARRATIVE_PREVIEW_OR_PRODUCTION_PROMOTION',
] as const);

export interface CareerPersonalizationT8PostI257NewEvidenceTriggerReadinessReviewReport {
  reviewId: string;
  reviewVersion: typeof CAREER_PERSONALIZATION_T8_POST_I257_NEW_EVIDENCE_TRIGGER_READINESS_REVIEW_VERSION;
  status:
    | 'RESOLVED_CAREER_T8_POST_I257_NEW_EVIDENCE_TRIGGER_READINESS_REVIEW'
    | 'UPSTREAM_B30_BOUNDARY_INVALID';
  decision:
    | 'FOUR_TRIGGER_CONTRACTS_FROZEN_ZERO_CURRENTLY_SATISFIED_RESUME_ONLY_ON_LANE_SPECIFIC_EVIDENCE_CHANGE_AND_LATER_ADEQUACY_REVIEW_NO_AUTHORITY_ADMISSION'
    | 'POST_I257_NEW_EVIDENCE_TRIGGER_READINESS_NOT_ESTABLISHED';
  upstreamB30ReviewId: string;
  exactB30BoundaryAccepted: boolean;
  domain: 'career';
  temporalScope: 'natal';
  statusClass: 'research';
  triggerContracts: readonly CareerT8B31EvidenceTriggerContract[];
  triggerContractCount: 4 | 0;
  currentlySatisfiedTriggerCount: 0;
  currentlyExecutableLaneCount: 0;
  activationRequiresAllConditions: true;
  activationAutomaticallyAdmitsAuthority: false;
  activationAutomaticallyClosesGap: false;
  activationAlwaysRequiresAdequacyReview: true;
  broadSearchRestartAuthorized: false;
  repeatedExhaustedSurfaceSearchAuthorized: false;
  crossSourceRequirementStitchingAuthorized: false;
  visibilityConsumedByCurrentContinuation: false;
  pluralityConsumedByCurrentContinuation: false;
  pluralityHeldUnderI254: true;
  seasonalConsumedByCurrentContinuation: false;
  seasonalConditionalRemediationActivated: false;
  conflictPolicyDisposition: 'PACK_LEVEL_DEFERRED';
  familyLimitsRequirementSatisfied: false;
  familyCurrentMethodCompatibilitySatisfied: false;
  authorityAdmissionReadyGapCount: 0;
  gapClosureReadyCount: 0;
  allSixHistoricalGapsRemainOpen: true;
  unresolvedGapIds: typeof CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS;
  authorityAdmittedByThisGate: false;
  authorityGapClosedByThisGate: false;
  t8RuleAuthoringAuthorized: false;
  t8ClaimTypeCreationAuthorized: false;
  personalizedT8PackCreationAuthorized: false;
  consumerNarrativeAuthorized: false;
  previewDefaultSwitchAuthorized: false;
  productionPromotionAuthorized: false;
  productionImpact: 'NONE';
  controlIds: readonly (typeof CAREER_T8_B31_TRIGGER_READINESS_CONTROL_IDS)[number][];
  controlCount: 12 | 0;
  controlsFrozen: boolean;
  implementationEffects: {
    triggerContractsFrozen: 4 | 0;
    currentlySatisfiedTriggers: 0;
    currentlyExecutableLanes: 0;
    sourceAcquisitionsPerformed: 0;
    authorityCandidatesAccepted: 0;
    authorityGapsClosed: 0;
    ruleDefinitionsCreated: 0;
    claimTypesCreated: 0;
    interpretationPacksCreated: 0;
    narrativePlansCreated: 0;
    previewRoutesChanged: 0;
  };
  recommendedNextGate:
    | 'CAREER_PERSONALIZATION_T8_POST_I257_EXTERNAL_EVIDENCE_TRIGGER_ACTIVATION_EVIDENCE'
    | 'CAREER_PERSONALIZATION_T8_POST_I257_RESIDUAL_AUTHORITY_FRONTIER_RECONCILIATION_REVIEW';
}

function contentAddressedB30IdentityValid(
  b30: CareerPersonalizationT8PostI257ResidualAuthorityFrontierReconciliationReviewReport,
): boolean {
  const { reviewId, ...material } = b30;
  return (
    reviewId ===
    `career_t8_post_i257_residual_authority_frontier_reconciliation_${deterministicContentHash(material).slice(0, 24)}`
  );
}

function exactB30Accepted(
  b30: CareerPersonalizationT8PostI257ResidualAuthorityFrontierReconciliationReviewReport,
): boolean {
  return (
    contentAddressedB30IdentityValid(b30) &&
    b30.reviewVersion === CAREER_PERSONALIZATION_T8_POST_I257_RESIDUAL_AUTHORITY_FRONTIER_RECONCILIATION_REVIEW_VERSION &&
    b30.status === 'RESOLVED_CAREER_T8_POST_I257_RESIDUAL_AUTHORITY_FRONTIER_RECONCILIATION_REVIEW' &&
    b30.decision ===
      'FOUR_ACTIVE_PATHS_ALL_EVIDENCE_SURFACE_BLOCKED_ZERO_EXISTING_SURFACE_EXECUTIONS_REOPEN_ONLY_ON_EXPLICIT_NEW_EVIDENCE_TRIGGERS_NO_AUTHORITY_ADMISSION' &&
    b30.exactI258BoundaryAccepted &&
    b30.domain === 'career' &&
    b30.temporalScope === 'natal' &&
    b30.statusClass === 'research' &&
    b30.laneCount === 4 &&
    deterministicContentHash(b30.lanes) === deterministicContentHash(CAREER_T8_B30_RESIDUAL_FRONTIER_LANES) &&
    b30.activeRemediationPathCount === 4 &&
    b30.immediatelyExecutableExistingSurfaceLaneCount === 0 &&
    b30.evidenceSurfaceBlockedLaneCount === 4 &&
    b30.reopenTriggerCount === 4 &&
    b30.qinExistingSurfaceExecutable === false &&
    b30.familyExistingSurfaceExecutable === false &&
    b30.branchExistingSurfaceExecutable === false &&
    b30.positionExistingSurfaceExecutable === false &&
    b30.familyI258HoldPreserved &&
    b30.familyLimitsRequirementSatisfied === false &&
    b30.familyCurrentMethodCompatibilitySatisfied === false &&
    b30.visibilityConsumedByCurrentContinuation === false &&
    b30.pluralityConsumedByCurrentContinuation === false &&
    b30.pluralityHeldUnderI254 &&
    b30.seasonalConsumedByCurrentContinuation === false &&
    b30.seasonalConditionalRemediationActivated === false &&
    b30.conflictPolicyRemediationActivated === false &&
    b30.conflictPolicyDisposition === 'PACK_LEVEL_DEFERRED' &&
    b30.broadSearchRestartAuthorized === false &&
    b30.repeatedExhaustedSurfaceSearchAuthorized === false &&
    b30.crossSourceRequirementStitchingAuthorized === false &&
    b30.authorityAdmissionReadyGapCount === 0 &&
    b30.gapClosureReadyCount === 0 &&
    b30.allSixHistoricalGapsRemainOpen &&
    deterministicContentHash(b30.unresolvedGapIds) === deterministicContentHash(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS) &&
    b30.authorityAdmittedByThisGate === false &&
    b30.authorityGapClosedByThisGate === false &&
    b30.controlCount === 12 &&
    b30.controlsFrozen &&
    deterministicContentHash(b30.controlIds) === deterministicContentHash(CAREER_T8_B30_POST_I257_FRONTIER_CONTROL_IDS) &&
    b30.t8RuleAuthoringAuthorized === false &&
    b30.personalizedT8PackCreationAuthorized === false &&
    b30.productionPromotionAuthorized === false &&
    b30.productionImpact === 'NONE' &&
    b30.recommendedNextGate === 'CAREER_PERSONALIZATION_T8_POST_I257_NEW_EVIDENCE_TRIGGER_READINESS_REVIEW'
  );
}

function triggerContractsValid(): boolean {
  const ids = CAREER_T8_B31_EVIDENCE_TRIGGER_CONTRACTS.map((contract) => contract.triggerId);
  const gaps = CAREER_T8_B31_EVIDENCE_TRIGGER_CONTRACTS.map((contract) => contract.targetGapId);
  return (
    ids.length === 4 &&
    new Set(ids).size === 4 &&
    new Set(gaps).size === 4 &&
    CAREER_T8_B31_EVIDENCE_TRIGGER_CONTRACTS.every(
      (contract) =>
        contract.currentlySatisfied === false &&
        contract.laneReopensWhenAllConditionsSatisfied &&
        contract.requiredConditions.length >= 3 &&
        contract.prohibitedSubstitutes.length >= 3 &&
        contract.activationAutomaticallyAdmitsAuthority === false &&
        contract.activationAutomaticallyClosesGap === false &&
        contract.activationRequiresFollowupAdequacyReview,
    )
  );
}

function finalized(
  material: Omit<CareerPersonalizationT8PostI257NewEvidenceTriggerReadinessReviewReport, 'reviewId'>,
): CareerPersonalizationT8PostI257NewEvidenceTriggerReadinessReviewReport {
  return {
    reviewId: `career_t8_post_i257_new_evidence_trigger_readiness_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildCareerPersonalizationT8PostI257NewEvidenceTriggerReadinessReview(
  b30: CareerPersonalizationT8PostI257ResidualAuthorityFrontierReconciliationReviewReport,
): CareerPersonalizationT8PostI257NewEvidenceTriggerReadinessReviewReport {
  const upstreamAccepted = exactB30Accepted(b30);
  const accepted = upstreamAccepted && triggerContractsValid();

  return finalized({
    reviewVersion: CAREER_PERSONALIZATION_T8_POST_I257_NEW_EVIDENCE_TRIGGER_READINESS_REVIEW_VERSION,
    status: accepted
      ? 'RESOLVED_CAREER_T8_POST_I257_NEW_EVIDENCE_TRIGGER_READINESS_REVIEW'
      : 'UPSTREAM_B30_BOUNDARY_INVALID',
    decision: accepted
      ? 'FOUR_TRIGGER_CONTRACTS_FROZEN_ZERO_CURRENTLY_SATISFIED_RESUME_ONLY_ON_LANE_SPECIFIC_EVIDENCE_CHANGE_AND_LATER_ADEQUACY_REVIEW_NO_AUTHORITY_ADMISSION'
      : 'POST_I257_NEW_EVIDENCE_TRIGGER_READINESS_NOT_ESTABLISHED',
    upstreamB30ReviewId: b30.reviewId,
    exactB30BoundaryAccepted: upstreamAccepted,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    triggerContracts: accepted ? CAREER_T8_B31_EVIDENCE_TRIGGER_CONTRACTS : Object.freeze([]),
    triggerContractCount: accepted ? 4 : 0,
    currentlySatisfiedTriggerCount: 0,
    currentlyExecutableLaneCount: 0,
    activationRequiresAllConditions: true,
    activationAutomaticallyAdmitsAuthority: false,
    activationAutomaticallyClosesGap: false,
    activationAlwaysRequiresAdequacyReview: true,
    broadSearchRestartAuthorized: false,
    repeatedExhaustedSurfaceSearchAuthorized: false,
    crossSourceRequirementStitchingAuthorized: false,
    visibilityConsumedByCurrentContinuation: false,
    pluralityConsumedByCurrentContinuation: false,
    pluralityHeldUnderI254: true,
    seasonalConsumedByCurrentContinuation: false,
    seasonalConditionalRemediationActivated: false,
    conflictPolicyDisposition: 'PACK_LEVEL_DEFERRED',
    familyLimitsRequirementSatisfied: false,
    familyCurrentMethodCompatibilitySatisfied: false,
    authorityAdmissionReadyGapCount: 0,
    gapClosureReadyCount: 0,
    allSixHistoricalGapsRemainOpen: true,
    unresolvedGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    authorityAdmittedByThisGate: false,
    authorityGapClosedByThisGate: false,
    t8RuleAuthoringAuthorized: false,
    t8ClaimTypeCreationAuthorized: false,
    personalizedT8PackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    productionImpact: 'NONE',
    controlIds: accepted ? CAREER_T8_B31_TRIGGER_READINESS_CONTROL_IDS : Object.freeze([]),
    controlCount: accepted ? 12 : 0,
    controlsFrozen: accepted,
    implementationEffects: {
      triggerContractsFrozen: accepted ? 4 : 0,
      currentlySatisfiedTriggers: 0,
      currentlyExecutableLanes: 0,
      sourceAcquisitionsPerformed: 0,
      authorityCandidatesAccepted: 0,
      authorityGapsClosed: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
    },
    recommendedNextGate: accepted
      ? 'CAREER_PERSONALIZATION_T8_POST_I257_EXTERNAL_EVIDENCE_TRIGGER_ACTIVATION_EVIDENCE'
      : 'CAREER_PERSONALIZATION_T8_POST_I257_RESIDUAL_AUTHORITY_FRONTIER_RECONCILIATION_REVIEW',
  });
}
