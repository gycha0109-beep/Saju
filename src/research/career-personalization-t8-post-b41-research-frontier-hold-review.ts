import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from './career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_PERSONALIZATION_T8_BRANCH_CLASH_REMEDIATION_TRIGGER_READINESS_REVIEW_VERSION,
  CAREER_T8_B41_BRANCH_REMEDIATION_TRIGGER_CONTRACTS,
  CAREER_T8_B41_BRANCH_REMEDIATION_TRIGGER_CONTROL_IDS,
  type CareerPersonalizationT8BranchClashRemediationTriggerReadinessReviewReport,
} from './career-personalization-t8-branch-clash-remediation-trigger-readiness-review.js';
import { CAREER_T8_B39_RESIDUAL_FRONTIER_RECORDS } from './career-personalization-t8-residual-authority-frontier-reconciliation.js';

export const CAREER_PERSONALIZATION_T8_POST_B41_RESEARCH_FRONTIER_HOLD_REVIEW_VERSION =
  'myeonghwa-career-personalization-t8-post-b41-research-frontier-hold-review-v1' as const;

export const CAREER_T8_B42_POST_B41_FRONTIER_RECORDS = Object.freeze([
  Object.freeze({
    laneId: 'POSITION_CURRENT_T5_BRIDGE',
    state: 'AUTHORITY_ADMITTED_BOUNDED_COMPONENT',
    immediatelyExecutableAuthorityResearch: false,
    boundedGovernanceGateExecutable: false,
    note: 'One bounded day-branch Zhengguan formal-responsibility modifier is admitted; composite visibility/position/plurality gap remains open.',
  }),
  Object.freeze({
    laneId: 'BRANCH_CLASH_CURRENT_T5_BRIDGE',
    state: 'TRIGGER_HOLD_ZERO_SATISFIED',
    immediatelyExecutableAuthorityResearch: false,
    boundedGovernanceGateExecutable: false,
    note: 'B41 froze two remediation trigger contracts; neither is satisfied.',
  }),
  Object.freeze({
    laneId: 'FAMILY_RELATION_CURRENT_T5_BRIDGE',
    state: 'MATERIAL_PARTIAL_REMEDIATION_READINESS_NOT_YET_FROZEN',
    immediatelyExecutableAuthorityResearch: false,
    boundedGovernanceGateExecutable: true,
    note: 'B37 leaves zero current-method-compatible or admission-ready alternate paths; a remediation-readiness gate can be frozen without new source search.',
  }),
  Object.freeze({
    laneId: 'QIN_P464_DIRECT_BODY',
    state: 'EXTERNAL_EVIDENCE_SURFACE_HOLD',
    immediatelyExecutableAuthorityResearch: false,
    boundedGovernanceGateExecutable: false,
    note: 'Printed p.464 normative body remains unavailable.',
  }),
  Object.freeze({
    laneId: 'QIANLI_1936_EXACT_TARGET_PAGES',
    state: 'EXTERNAL_EVIDENCE_SURFACE_HOLD',
    immediatelyExecutableAuthorityResearch: false,
    boundedGovernanceGateExecutable: false,
    note: 'Exact 1936 NLC p.50-p.53 witness binding remains unavailable.',
  }),
  Object.freeze({
    laneId: 'VISIBILITY',
    state: 'UNCONSUMED',
    immediatelyExecutableAuthorityResearch: false,
    boundedGovernanceGateExecutable: false,
    note: 'Current continuation does not consume visibility.',
  }),
  Object.freeze({
    laneId: 'PLURALITY',
    state: 'UNCONSUMED_I254_HOLD',
    immediatelyExecutableAuthorityResearch: false,
    boundedGovernanceGateExecutable: false,
    note: 'Current continuation does not consume plurality and I254 hold remains.',
  }),
  Object.freeze({
    laneId: 'SEASONAL_PHASE',
    state: 'UNCONSUMED',
    immediatelyExecutableAuthorityResearch: false,
    boundedGovernanceGateExecutable: false,
    note: 'Current continuation does not consume seasonal phase.',
  }),
  Object.freeze({
    laneId: 'MULTI_PATTERN_CONFLICT_COMPOSITION',
    state: 'PACK_LEVEL_DEFERRED',
    immediatelyExecutableAuthorityResearch: false,
    boundedGovernanceGateExecutable: false,
    note: 'Conflict composition remains deferred until sufficient upstream authority exists.',
  }),
] as const);

export const CAREER_T8_B42_POST_B41_FRONTIER_CONTROL_IDS = Object.freeze([
  'B42_CONSUMES_ONLY_THE_EXACT_CONTENT_ADDRESSED_B41_TRIGGER_READINESS_BOUNDARY',
  'ONE_BOUNDED_POSITION_COMPONENT_REMAINS_AUTHORITY_ADMITTED_WITH_NO_COMPOSITE_GAP_CLOSURE',
  'BRANCH_REMAINS_ON_TRIGGER_HOLD_WITH_ZERO_SATISFIED_TRIGGER_CONTRACTS_AND_ZERO_EXECUTABLE_BRANCH_RESEARCH_LANES',
  'FAMILY_REMAINS_MATERIAL_PARTIAL_WITH_ZERO_CURRENT_METHOD_COMPATIBLE_AND_ZERO_ADMISSION_READY_ALTERNATE_PATHS',
  'FAMILY_REMEDIATION_READINESS_IS_THE_ONLY_BOUNDED_GOVERNANCE_GATE_EXECUTABLE_WITHOUT_NEW_EVIDENCE_ACQUISITION',
  'QIN_P464_AND_QIANLI_1936_TARGET_PAGES_REMAIN_EXTERNAL_EVIDENCE_SURFACE_HOLDS',
  'VISIBILITY_PLURALITY_AND_SEASONAL_REMAIN_UNCONSUMED_WITH_PLURALITY_I254_HOLD_PRESERVED',
  'MULTI_PATTERN_CONFLICT_COMPOSITION_REMAINS_PACK_LEVEL_DEFERRED',
  'ZERO_AUTHORITY_ADMISSION_LANES_ARE_CURRENTLY_EXECUTABLE_FROM_EXISTING_EVIDENCE_SURFACES',
  'BROAD_SEARCH_RESTART_IS_NOT_AUTHORIZED_BY_THIS_FRONTIER_REVIEW',
  'ALL_SIX_HISTORICAL_T8_SYNTHESIS_AUTHORITY_GAPS_REMAIN_FORMALLY_OPEN',
  'NO_T8_RULE_CLAIM_TYPE_PACK_NARRATIVE_PREVIEW_OR_PRODUCTION_PROMOTION_IS_AUTHORIZED',
] as const);

export interface CareerPersonalizationT8PostB41ResearchFrontierHoldReviewReport {
  reviewId: string;
  reviewVersion: typeof CAREER_PERSONALIZATION_T8_POST_B41_RESEARCH_FRONTIER_HOLD_REVIEW_VERSION;
  status:
    | 'RESOLVED_CAREER_PERSONALIZATION_T8_POST_B41_RESEARCH_FRONTIER_HOLD_REVIEW'
    | 'UPSTREAM_B41_BOUNDARY_INVALID';
  decision:
    | 'ZERO_EXECUTABLE_AUTHORITY_ADMISSION_LANES_ONE_FAMILY_REMEDIATION_GOVERNANCE_GATE_EXECUTABLE_NO_BROAD_RESEARCH_RESTART'
    | 'POST_B41_RESEARCH_FRONTIER_HOLD_NOT_ESTABLISHED';
  upstreamB41ReviewId: string;
  exactB41BoundaryAccepted: boolean;
  domain: 'career';
  temporalScope: 'natal';
  statusClass: 'research';
  frontierRecords: readonly (typeof CAREER_T8_B42_POST_B41_FRONTIER_RECORDS)[number][];
  frontierRecordCount: 9 | 0;
  admittedBoundedAuthorityComponentCount: 1 | 0;
  immediatelyExecutableAuthorityAdmissionLaneCount: 0;
  immediatelyExecutableExistingSurfaceResearchLaneCount: 0;
  boundedGovernanceGateExecutableCount: 1 | 0;
  selectedBoundedGovernanceLane: 'FAMILY_RELATION_CURRENT_METHOD_COMPATIBLE_REMEDIATION_READINESS' | null;
  branchSatisfiedTriggerCount: 0;
  branchExecutableLaneCount: 0;
  familyCoverageClass: 'MATERIAL_PARTIAL_REQUIREMENT_COVERAGE';
  familyCurrentMethodCompatibleAlternatePathCount: 0;
  familyAdmissionReadyCandidateCount: 0;
  qinP464DirectBodyAcquired: false;
  qianli1936P50ToP53ExactPagesBound: false;
  visibilityConsumedByCurrentContinuation: false;
  pluralityConsumedByCurrentContinuation: false;
  pluralityHeldUnderI254: true;
  seasonalConsumedByCurrentContinuation: false;
  conflictPolicyDisposition: 'PACK_LEVEL_DEFERRED';
  broadSearchRestartAuthorized: false;
  allSixHistoricalGapsRemainOpen: true;
  unresolvedGapIds: typeof CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS;
  authorityGapClosedByThisGate: false;
  t8RuleAuthoringAuthorized: false;
  t8ClaimTypeCreationAuthorized: false;
  personalizedT8PackCreationAuthorized: false;
  consumerNarrativeAuthorized: false;
  previewDefaultSwitchAuthorized: false;
  productionPromotionAuthorized: false;
  productionImpact: 'NONE';
  controlIds: readonly (typeof CAREER_T8_B42_POST_B41_FRONTIER_CONTROL_IDS)[number][];
  controlCount: 12 | 0;
  controlsFrozen: boolean;
  recommendedNextGate:
    | 'FAMILY_RELATION_CURRENT_METHOD_COMPATIBLE_PUBLISHED_SOURCE_REMEDIATION_READINESS_REVIEW'
    | 'CAREER_PERSONALIZATION_T8_POST_B41_RESEARCH_FRONTIER_HOLD_REVIEW';
}

function contentAddressedB41IdentityValid(
  b41: CareerPersonalizationT8BranchClashRemediationTriggerReadinessReviewReport,
): boolean {
  const { reviewId, ...material } = b41;
  return reviewId ===
    `career_personalization_t8_branch_clash_remediation_trigger_readiness_${deterministicContentHash(material).slice(0, 24)}`;
}

function exactB41Accepted(
  b41: CareerPersonalizationT8BranchClashRemediationTriggerReadinessReviewReport,
): boolean {
  return (
    contentAddressedB41IdentityValid(b41) &&
    b41.reviewVersion === CAREER_PERSONALIZATION_T8_BRANCH_CLASH_REMEDIATION_TRIGGER_READINESS_REVIEW_VERSION &&
    b41.status === 'RESOLVED_BRANCH_CLASH_EXACT_EDITION_AND_METHOD_DEPENDENCY_REMEDIATION_TRIGGER_READINESS_REVIEW' &&
    b41.decision ===
      'TWO_BRANCH_REMEDIATION_TRIGGER_CONTRACTS_FROZEN_ZERO_SATISFIED_RESUME_ONLY_ON_PATH_COMPLETE_EVIDENCE_CHANGE_NO_AUTHORITY_ADMISSION' &&
    b41.exactB40BoundaryAccepted &&
    b41.domain === 'career' &&
    b41.temporalScope === 'natal' &&
    b41.statusClass === 'research' &&
    b41.triggerContractCount === 2 &&
    deterministicContentHash(b41.triggerContracts) === deterministicContentHash(CAREER_T8_B41_BRANCH_REMEDIATION_TRIGGER_CONTRACTS) &&
    b41.currentlySatisfiedTriggerCount === 0 &&
    b41.currentlyExecutableBranchLaneCount === 0 &&
    b41.exact2015PathTriggerSatisfied === false &&
    b41.independentCompletePathTriggerSatisfied === false &&
    b41.exact2015PrintedPassageBindingEstablished === false &&
    b41.currentMethodCompatibilityEstablished === false &&
    b41.currentMethodIncompatibleIfMandatoryDependencyConfirmed &&
    b41.broadSearchRestartAuthorized === false &&
    b41.repeatedUnchangedSurfaceSearchAuthorized === false &&
    b41.crossSourceRequirementStitchingAuthorized === false &&
    b41.activationAutomaticallyAdmitsAuthority === false &&
    b41.activationAutomaticallyClosesGap === false &&
    b41.activationAlwaysRequiresAdequacyReview &&
    b41.branchAuthorityAdmissionReady === false &&
    b41.branchAuthorityAdmittedByThisGate === false &&
    b41.branchGapClosureReady === false &&
    b41.positionBoundedAuthorityComponentCountPreserved === 1 &&
    b41.allSixHistoricalGapsRemainOpen &&
    deterministicContentHash(b41.unresolvedGapIds) === deterministicContentHash(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS) &&
    b41.authorityGapClosedByThisGate === false &&
    b41.controlCount === 12 &&
    b41.controlsFrozen &&
    deterministicContentHash(b41.controlIds) === deterministicContentHash(CAREER_T8_B41_BRANCH_REMEDIATION_TRIGGER_CONTROL_IDS) &&
    b41.productionImpact === 'NONE' &&
    b41.recommendedNextGate === 'CAREER_PERSONALIZATION_T8_POST_B41_RESEARCH_FRONTIER_HOLD_REVIEW'
  );
}

function frontierStateValid(): boolean {
  const b39Family = CAREER_T8_B39_RESIDUAL_FRONTIER_RECORDS.find(
    (record) => record.laneId === 'FAMILY_RELATION_CURRENT_T5_BRIDGE',
  );
  const b39Qin = CAREER_T8_B39_RESIDUAL_FRONTIER_RECORDS.find(
    (record) => record.laneId === 'QIN_P464_DIRECT_BODY',
  );
  const b39Qianli = CAREER_T8_B39_RESIDUAL_FRONTIER_RECORDS.find(
    (record) => record.laneId === 'QIANLI_1936_EXACT_TARGET_PAGES',
  );

  return Boolean(
    CAREER_T8_B42_POST_B41_FRONTIER_RECORDS.length === 9 &&
      b39Family?.state === 'MATERIAL_PARTIAL_REQUIREMENT_COVERAGE' &&
      b39Family.admissionReady === false &&
      b39Family.authorityAdmitted === false &&
      b39Qin?.state === 'DIRECT_BODY_HOLD' &&
      b39Qianli?.state === 'EXACT_PRIMARY_PAGE_HOLD' &&
      CAREER_T8_B42_POST_B41_FRONTIER_RECORDS.filter((record) => record.immediatelyExecutableAuthorityResearch).length === 0 &&
      CAREER_T8_B42_POST_B41_FRONTIER_RECORDS.filter((record) => record.boundedGovernanceGateExecutable).length === 1,
  );
}

function finalized(
  material: Omit<CareerPersonalizationT8PostB41ResearchFrontierHoldReviewReport, 'reviewId'>,
): CareerPersonalizationT8PostB41ResearchFrontierHoldReviewReport {
  return {
    reviewId: `career_personalization_t8_post_b41_research_frontier_hold_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildCareerPersonalizationT8PostB41ResearchFrontierHoldReview(
  b41: CareerPersonalizationT8BranchClashRemediationTriggerReadinessReviewReport,
): CareerPersonalizationT8PostB41ResearchFrontierHoldReviewReport {
  const accepted = exactB41Accepted(b41) && frontierStateValid();

  return finalized({
    reviewVersion: CAREER_PERSONALIZATION_T8_POST_B41_RESEARCH_FRONTIER_HOLD_REVIEW_VERSION,
    status: accepted
      ? 'RESOLVED_CAREER_PERSONALIZATION_T8_POST_B41_RESEARCH_FRONTIER_HOLD_REVIEW'
      : 'UPSTREAM_B41_BOUNDARY_INVALID',
    decision: accepted
      ? 'ZERO_EXECUTABLE_AUTHORITY_ADMISSION_LANES_ONE_FAMILY_REMEDIATION_GOVERNANCE_GATE_EXECUTABLE_NO_BROAD_RESEARCH_RESTART'
      : 'POST_B41_RESEARCH_FRONTIER_HOLD_NOT_ESTABLISHED',
    upstreamB41ReviewId: b41.reviewId,
    exactB41BoundaryAccepted: accepted,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    frontierRecords: accepted ? CAREER_T8_B42_POST_B41_FRONTIER_RECORDS : Object.freeze([]),
    frontierRecordCount: accepted ? 9 : 0,
    admittedBoundedAuthorityComponentCount: accepted ? 1 : 0,
    immediatelyExecutableAuthorityAdmissionLaneCount: 0,
    immediatelyExecutableExistingSurfaceResearchLaneCount: 0,
    boundedGovernanceGateExecutableCount: accepted ? 1 : 0,
    selectedBoundedGovernanceLane: accepted ? 'FAMILY_RELATION_CURRENT_METHOD_COMPATIBLE_REMEDIATION_READINESS' : null,
    branchSatisfiedTriggerCount: 0,
    branchExecutableLaneCount: 0,
    familyCoverageClass: 'MATERIAL_PARTIAL_REQUIREMENT_COVERAGE',
    familyCurrentMethodCompatibleAlternatePathCount: 0,
    familyAdmissionReadyCandidateCount: 0,
    qinP464DirectBodyAcquired: false,
    qianli1936P50ToP53ExactPagesBound: false,
    visibilityConsumedByCurrentContinuation: false,
    pluralityConsumedByCurrentContinuation: false,
    pluralityHeldUnderI254: true,
    seasonalConsumedByCurrentContinuation: false,
    conflictPolicyDisposition: 'PACK_LEVEL_DEFERRED',
    broadSearchRestartAuthorized: false,
    allSixHistoricalGapsRemainOpen: true,
    unresolvedGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    authorityGapClosedByThisGate: false,
    t8RuleAuthoringAuthorized: false,
    t8ClaimTypeCreationAuthorized: false,
    personalizedT8PackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    productionImpact: 'NONE',
    controlIds: accepted ? CAREER_T8_B42_POST_B41_FRONTIER_CONTROL_IDS : Object.freeze([]),
    controlCount: accepted ? 12 : 0,
    controlsFrozen: accepted,
    recommendedNextGate: accepted
      ? 'FAMILY_RELATION_CURRENT_METHOD_COMPATIBLE_PUBLISHED_SOURCE_REMEDIATION_READINESS_REVIEW'
      : 'CAREER_PERSONALIZATION_T8_POST_B41_RESEARCH_FRONTIER_HOLD_REVIEW',
  });
}
