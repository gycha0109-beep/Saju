import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from './career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import { CAREER_T8_B41_BRANCH_REMEDIATION_TRIGGER_CONTRACTS } from './career-personalization-t8-branch-clash-remediation-trigger-readiness-review.js';
import { CAREER_T8_B42_POST_B41_FRONTIER_RECORDS } from './career-personalization-t8-post-b41-research-frontier-hold-review.js';
import {
  CAREER_PERSONALIZATION_T8_FAMILY_REMEDIATION_TRIGGER_READINESS_REVIEW_VERSION,
  CAREER_T8_B43_FAMILY_REMEDIATION_TRIGGER_CONTRACTS,
  CAREER_T8_B43_FAMILY_REMEDIATION_TRIGGER_CONTROL_IDS,
  type CareerPersonalizationT8FamilyRemediationTriggerReadinessReviewReport,
} from './career-personalization-t8-family-remediation-trigger-readiness-review.js';

export const CAREER_PERSONALIZATION_T8_POST_B43_GLOBAL_RESEARCH_HOLD_REVIEW_VERSION =
  'myeonghwa-career-personalization-t8-post-b43-global-research-hold-review-v1' as const;

export const CAREER_T8_B44_GLOBAL_REOPEN_SIGNAL_CLASSES = Object.freeze([
  'QIN_P464_DIRECT_BODY_EVIDENCE_CHANGE',
  'QIANLI_1936_EXACT_TARGET_PAGE_EVIDENCE_CHANGE',
  'BRANCH_B41_TRIGGER_CONDITION_CHANGE',
  'FAMILY_B43_TRIGGER_CONDITION_CHANGE',
  'VISIBILITY_GOVERNED_METHOD_SCOPE_CHANGE',
  'PLURALITY_I254_GOVERNANCE_RELEASE',
  'SEASONAL_GOVERNED_METHOD_SCOPE_CHANGE',
  'UPSTREAM_AUTHORITY_SUFFICIENCY_FOR_PACK_LEVEL_CONFLICT_REVIEW',
] as const);

export const CAREER_T8_B44_GLOBAL_RESEARCH_FRONTIER_RECORDS = Object.freeze([
  Object.freeze({
    laneId: 'POSITION_CURRENT_T5_BRIDGE' as const,
    state: 'AUTHORITY_ADMITTED_BOUNDED_COMPONENT' as const,
    reopenSignalClass: null,
    existingSurfaceResearchExecutable: false as const,
    authorityAdmissionExecutable: false as const,
    boundedGovernanceGateExecutable: false as const,
    note: 'One bounded day-branch Zhengguan formal-responsibility qualitative modifier remains admitted; the composite visibility/position/plurality historical gap remains open.',
  }),
  Object.freeze({
    laneId: 'BRANCH_CLASH_CURRENT_T5_BRIDGE' as const,
    state: 'REMEDIATION_TRIGGER_HOLD_0_OF_2' as const,
    reopenSignalClass: 'BRANCH_B41_TRIGGER_CONDITION_CHANGE' as const,
    existingSurfaceResearchExecutable: false as const,
    authorityAdmissionExecutable: false as const,
    boundedGovernanceGateExecutable: false as const,
    note: 'B41 froze two Branch remediation trigger contracts; neither is currently satisfied.',
  }),
  Object.freeze({
    laneId: 'FAMILY_RELATION_CURRENT_T5_BRIDGE' as const,
    state: 'REMEDIATION_TRIGGER_HOLD_0_OF_3' as const,
    reopenSignalClass: 'FAMILY_B43_TRIGGER_CONDITION_CHANGE' as const,
    existingSurfaceResearchExecutable: false as const,
    authorityAdmissionExecutable: false as const,
    boundedGovernanceGateExecutable: false as const,
    note: 'B43 froze three Family remediation trigger contracts; none is currently satisfied.',
  }),
  Object.freeze({
    laneId: 'QIN_P464_DIRECT_BODY' as const,
    state: 'EXTERNAL_EVIDENCE_SURFACE_HOLD' as const,
    reopenSignalClass: 'QIN_P464_DIRECT_BODY_EVIDENCE_CHANGE' as const,
    existingSurfaceResearchExecutable: false as const,
    authorityAdmissionExecutable: false as const,
    boundedGovernanceGateExecutable: false as const,
    note: 'Printed p.464 normative body remains unavailable; unchanged metadata/TOC surfaces are not executable evidence.',
  }),
  Object.freeze({
    laneId: 'QIANLI_1936_EXACT_TARGET_PAGES' as const,
    state: 'EXTERNAL_EVIDENCE_SURFACE_HOLD' as const,
    reopenSignalClass: 'QIANLI_1936_EXACT_TARGET_PAGE_EVIDENCE_CHANGE' as const,
    existingSurfaceResearchExecutable: false as const,
    authorityAdmissionExecutable: false as const,
    boundedGovernanceGateExecutable: false as const,
    note: 'Exact 1936 NLC p.50-p.53 target-page binding remains unavailable.',
  }),
  Object.freeze({
    laneId: 'VISIBILITY' as const,
    state: 'UNCONSUMED' as const,
    reopenSignalClass: 'VISIBILITY_GOVERNED_METHOD_SCOPE_CHANGE' as const,
    existingSurfaceResearchExecutable: false as const,
    authorityAdmissionExecutable: false as const,
    boundedGovernanceGateExecutable: false as const,
    note: 'Current Career continuation does not consume visibility; evidence search does not reopen this lane without governed method scope change.',
  }),
  Object.freeze({
    laneId: 'PLURALITY' as const,
    state: 'UNCONSUMED_I254_HOLD' as const,
    reopenSignalClass: 'PLURALITY_I254_GOVERNANCE_RELEASE' as const,
    existingSurfaceResearchExecutable: false as const,
    authorityAdmissionExecutable: false as const,
    boundedGovernanceGateExecutable: false as const,
    note: 'Current continuation does not consume plurality and the I254 hold remains authoritative.',
  }),
  Object.freeze({
    laneId: 'SEASONAL_PHASE' as const,
    state: 'UNCONSUMED' as const,
    reopenSignalClass: 'SEASONAL_GOVERNED_METHOD_SCOPE_CHANGE' as const,
    existingSurfaceResearchExecutable: false as const,
    authorityAdmissionExecutable: false as const,
    boundedGovernanceGateExecutable: false as const,
    note: 'Current Career continuation does not consume seasonal phase.',
  }),
  Object.freeze({
    laneId: 'MULTI_PATTERN_CONFLICT_COMPOSITION' as const,
    state: 'PACK_LEVEL_DEFERRED' as const,
    reopenSignalClass: 'UPSTREAM_AUTHORITY_SUFFICIENCY_FOR_PACK_LEVEL_CONFLICT_REVIEW' as const,
    existingSurfaceResearchExecutable: false as const,
    authorityAdmissionExecutable: false as const,
    boundedGovernanceGateExecutable: false as const,
    note: 'Conflict composition remains deferred until sufficient upstream authority exists; it is not an independent source-search lane.',
  }),
] as const);

export const CAREER_T8_B44_GLOBAL_RESEARCH_HOLD_CONTROL_IDS = Object.freeze([
  'B44_CONSUMES_ONLY_THE_EXACT_CONTENT_ADDRESSED_B43_FAMILY_TRIGGER_READINESS_BOUNDARY',
  'THE_B38_BOUNDED_POSITION_AUTHORITY_COMPONENT_REMAINS_ADMITTED_WITHOUT_CLOSING_THE_COMPOSITE_VISIBILITY_POSITION_PLURALITY_GAP',
  'BRANCH_REMAINS_ON_B41_REMEDIATION_TRIGGER_HOLD_WITH_ZERO_OF_TWO_TRIGGERS_SATISFIED',
  'FAMILY_REMAINS_ON_B43_REMEDIATION_TRIGGER_HOLD_WITH_ZERO_OF_THREE_TRIGGERS_SATISFIED',
  'QIN_P464_AND_QIANLI_1936_TARGET_PAGES_REMAIN_EXTERNAL_EVIDENCE_SURFACE_HOLDS',
  'VISIBILITY_PLURALITY_AND_SEASONAL_REMAIN_UNCONSUMED_WITH_PLURALITY_I254_HOLD_PRESERVED',
  'MULTI_PATTERN_CONFLICT_COMPOSITION_REMAINS_PACK_LEVEL_DEFERRED_AND_IS_NOT_AN_INDEPENDENT_RESEARCH_LANE',
  'ZERO_AUTHORITY_ADMISSION_ZERO_EXISTING_SURFACE_RESEARCH_AND_ZERO_BOUNDED_GOVERNANCE_LANES_ARE_CURRENTLY_EXECUTABLE',
  'RESEARCH_MAY_RESUME_ONLY_AFTER_AN_EXPLICIT_FROZEN_REOPEN_SIGNAL_CLASS_MATERIALLY_CHANGES',
  'BROAD_SEARCH_RESTART_REPEATED_UNCHANGED_SURFACE_SEARCH_AND_CROSS_SOURCE_REQUIREMENT_STITCHING_REMAIN_PROHIBITED',
  'ALL_SIX_HISTORICAL_T8_SYNTHESIS_AUTHORITY_GAPS_REMAIN_FORMALLY_OPEN',
  'NO_T8_RULE_CLAIM_TYPE_PACK_NARRATIVE_PREVIEW_DEFAULT_SWITCH_OR_PRODUCTION_PROMOTION_IS_AUTHORIZED',
] as const);

export interface CareerPersonalizationT8PostB43GlobalResearchHoldReviewReport {
  reviewId: string;
  reviewVersion: typeof CAREER_PERSONALIZATION_T8_POST_B43_GLOBAL_RESEARCH_HOLD_REVIEW_VERSION;
  status:
    | 'RESOLVED_CAREER_PERSONALIZATION_T8_POST_B43_GLOBAL_RESEARCH_HOLD_REVIEW'
    | 'UPSTREAM_B43_BOUNDARY_INVALID';
  decision:
    | 'GLOBAL_TRIGGER_GATED_RESEARCH_HOLD_ZERO_EXECUTABLE_LANES_RESUME_ONLY_ON_EXPLICIT_EVIDENCE_OR_GOVERNED_METHOD_CHANGE'
    | 'POST_B43_GLOBAL_RESEARCH_HOLD_NOT_ESTABLISHED';
  upstreamB43ReviewId: string;
  exactB43BoundaryAccepted: boolean;
  domain: 'career';
  temporalScope: 'natal';
  statusClass: 'research';
  globalResearchHoldActive: boolean;
  frontierRecords: readonly (typeof CAREER_T8_B44_GLOBAL_RESEARCH_FRONTIER_RECORDS)[number][];
  frontierRecordCount: 9 | 0;
  globalReopenSignalClasses: readonly (typeof CAREER_T8_B44_GLOBAL_REOPEN_SIGNAL_CLASSES)[number][];
  globalReopenSignalClassCount: 8 | 0;
  admittedBoundedAuthorityComponentCountPreserved: 1 | 0;
  branchTriggerContractCountPreserved: 2 | 0;
  branchSatisfiedTriggerCount: 0;
  familyTriggerContractCountPreserved: 3 | 0;
  familySatisfiedTriggerCount: 0;
  externalEvidenceSurfaceHoldCount: 2 | 0;
  unconsumedDimensionCount: 3 | 0;
  packLevelDeferredLaneCount: 1 | 0;
  immediatelyExecutableAuthorityAdmissionLaneCount: 0;
  immediatelyExecutableExistingSurfaceResearchLaneCount: 0;
  boundedGovernanceGateExecutableCount: 0;
  qinP464DirectBodyAcquired: false;
  qianli1936P50ToP53ExactPagesBound: false;
  visibilityConsumedByCurrentContinuation: false;
  pluralityConsumedByCurrentContinuation: false;
  pluralityHeldUnderI254: true;
  seasonalConsumedByCurrentContinuation: false;
  conflictPolicyDisposition: 'PACK_LEVEL_DEFERRED';
  resumeRequiresExplicitSignalChange: boolean;
  broadSearchRestartAuthorized: false;
  repeatedUnchangedSurfaceSearchAuthorized: false;
  crossSourceRequirementStitchingAuthorized: false;
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
  controlIds: readonly (typeof CAREER_T8_B44_GLOBAL_RESEARCH_HOLD_CONTROL_IDS)[number][];
  controlCount: 12 | 0;
  controlsFrozen: boolean;
  selectedImmediateNextLane: null;
  recommendedNextGate:
    | 'CAREER_PERSONALIZATION_T8_RESEARCH_REOPEN_TRIGGER_ACTIVATION_EVIDENCE'
    | 'CAREER_PERSONALIZATION_T8_POST_B43_GLOBAL_RESEARCH_HOLD_REVIEW';
}

function contentAddressedB43IdentityValid(
  b43: CareerPersonalizationT8FamilyRemediationTriggerReadinessReviewReport,
): boolean {
  const { reviewId, ...material } = b43;
  return reviewId ===
    `career_personalization_t8_family_remediation_trigger_readiness_${deterministicContentHash(material).slice(0, 24)}`;
}

function exactB43Accepted(
  b43: CareerPersonalizationT8FamilyRemediationTriggerReadinessReviewReport,
): boolean {
  return (
    contentAddressedB43IdentityValid(b43) &&
    b43.reviewVersion === CAREER_PERSONALIZATION_T8_FAMILY_REMEDIATION_TRIGGER_READINESS_REVIEW_VERSION &&
    b43.status === 'RESOLVED_FAMILY_RELATION_CURRENT_METHOD_COMPATIBLE_PUBLISHED_SOURCE_REMEDIATION_READINESS_REVIEW' &&
    b43.decision ===
      'THREE_FAMILY_REMEDIATION_TRIGGER_CONTRACTS_FROZEN_ZERO_SATISFIED_RESUME_ONLY_ON_PATH_COMPLETE_EVIDENCE_OR_METHOD_CHANGE_NO_AUTHORITY_ADMISSION' &&
    b43.exactB42BoundaryAccepted &&
    b43.domain === 'career' &&
    b43.temporalScope === 'natal' &&
    b43.statusClass === 'research' &&
    b43.triggerContractCount === 3 &&
    deterministicContentHash(b43.triggerContracts) === deterministicContentHash(CAREER_T8_B43_FAMILY_REMEDIATION_TRIGGER_CONTRACTS) &&
    b43.currentlySatisfiedTriggerCount === 0 &&
    b43.currentlyExecutableFamilyResearchLaneCount === 0 &&
    b43.career2017TriggerSatisfied === false &&
    b43.semantic2015TriggerSatisfied === false &&
    b43.independentCompletePathTriggerSatisfied === false &&
    b43.career2017TargetRelationBodyAcquired === false &&
    b43.semantic2015ExactEditionBindingEstablished === false &&
    b43.semantic2015MandatoryStrengthTransformationDependencyPreserved &&
    b43.currentMethodConsumesRequired2015Dimensions === false &&
    b43.familyCurrentMethodCompatiblePathCount === 0 &&
    b43.familyAdmissionReadyCandidateCount === 0 &&
    b43.familyCoverageClass === 'MATERIAL_PARTIAL_REQUIREMENT_COVERAGE' &&
    b43.qianliHistoricalPathPreserved &&
    b43.broadSearchRestartAuthorized === false &&
    b43.repeatedUnchangedSurfaceSearchAuthorized === false &&
    b43.crossSourceRequirementStitchingAuthorized === false &&
    b43.activationAutomaticallyAdmitsAuthority === false &&
    b43.activationAutomaticallyClosesGap === false &&
    b43.activationAlwaysRequiresAdequacyReview &&
    b43.familyAuthorityAdmittedByThisGate === false &&
    b43.familyGapClosureReady === false &&
    b43.positionBoundedAuthorityComponentCountPreserved === 1 &&
    b43.allSixHistoricalGapsRemainOpen &&
    deterministicContentHash(b43.unresolvedGapIds) === deterministicContentHash(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS) &&
    b43.authorityGapClosedByThisGate === false &&
    b43.numericWeightingIntroduced === false &&
    b43.occupationModernizationUsed === false &&
    b43.controlCount === 12 &&
    b43.controlsFrozen &&
    deterministicContentHash(b43.controlIds) === deterministicContentHash(CAREER_T8_B43_FAMILY_REMEDIATION_TRIGGER_CONTROL_IDS) &&
    b43.t8RuleAuthoringAuthorized === false &&
    b43.t8ClaimTypeCreationAuthorized === false &&
    b43.personalizedT8PackCreationAuthorized === false &&
    b43.consumerNarrativeAuthorized === false &&
    b43.previewDefaultSwitchAuthorized === false &&
    b43.productionPromotionAuthorized === false &&
    b43.productionImpact === 'NONE' &&
    b43.recommendedNextGate === 'CAREER_PERSONALIZATION_T8_POST_B43_GLOBAL_RESEARCH_HOLD_REVIEW'
  );
}

function globalFrontierStateValid(): boolean {
  const branchContractsFrozen =
    CAREER_T8_B41_BRANCH_REMEDIATION_TRIGGER_CONTRACTS.length === 2 &&
    CAREER_T8_B41_BRANCH_REMEDIATION_TRIGGER_CONTRACTS.every((contract) => contract.currentlySatisfied === false);
  const familyContractsFrozen =
    CAREER_T8_B43_FAMILY_REMEDIATION_TRIGGER_CONTRACTS.length === 3 &&
    CAREER_T8_B43_FAMILY_REMEDIATION_TRIGGER_CONTRACTS.every((contract) => contract.currentlySatisfied === false);
  const qin = CAREER_T8_B42_POST_B41_FRONTIER_RECORDS.find((record) => record.laneId === 'QIN_P464_DIRECT_BODY');
  const qianli = CAREER_T8_B42_POST_B41_FRONTIER_RECORDS.find(
    (record) => record.laneId === 'QIANLI_1936_EXACT_TARGET_PAGES',
  );

  return Boolean(
    branchContractsFrozen &&
      familyContractsFrozen &&
      qin?.state === 'EXTERNAL_EVIDENCE_SURFACE_HOLD' &&
      qianli?.state === 'EXTERNAL_EVIDENCE_SURFACE_HOLD' &&
      CAREER_T8_B44_GLOBAL_RESEARCH_FRONTIER_RECORDS.length === 9 &&
      CAREER_T8_B44_GLOBAL_REOPEN_SIGNAL_CLASSES.length === 8 &&
      CAREER_T8_B44_GLOBAL_RESEARCH_FRONTIER_RECORDS.filter((record) => record.existingSurfaceResearchExecutable)
        .length === 0 &&
      CAREER_T8_B44_GLOBAL_RESEARCH_FRONTIER_RECORDS.filter((record) => record.authorityAdmissionExecutable).length ===
        0 &&
      CAREER_T8_B44_GLOBAL_RESEARCH_FRONTIER_RECORDS.filter((record) => record.boundedGovernanceGateExecutable)
        .length === 0,
  );
}

function finalized(
  material: Omit<CareerPersonalizationT8PostB43GlobalResearchHoldReviewReport, 'reviewId'>,
): CareerPersonalizationT8PostB43GlobalResearchHoldReviewReport {
  return {
    reviewId: `career_personalization_t8_post_b43_global_research_hold_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildCareerPersonalizationT8PostB43GlobalResearchHoldReview(
  b43: CareerPersonalizationT8FamilyRemediationTriggerReadinessReviewReport,
): CareerPersonalizationT8PostB43GlobalResearchHoldReviewReport {
  const accepted = exactB43Accepted(b43) && globalFrontierStateValid();

  return finalized({
    reviewVersion: CAREER_PERSONALIZATION_T8_POST_B43_GLOBAL_RESEARCH_HOLD_REVIEW_VERSION,
    status: accepted
      ? 'RESOLVED_CAREER_PERSONALIZATION_T8_POST_B43_GLOBAL_RESEARCH_HOLD_REVIEW'
      : 'UPSTREAM_B43_BOUNDARY_INVALID',
    decision: accepted
      ? 'GLOBAL_TRIGGER_GATED_RESEARCH_HOLD_ZERO_EXECUTABLE_LANES_RESUME_ONLY_ON_EXPLICIT_EVIDENCE_OR_GOVERNED_METHOD_CHANGE'
      : 'POST_B43_GLOBAL_RESEARCH_HOLD_NOT_ESTABLISHED',
    upstreamB43ReviewId: b43.reviewId,
    exactB43BoundaryAccepted: accepted,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    globalResearchHoldActive: accepted,
    frontierRecords: accepted ? CAREER_T8_B44_GLOBAL_RESEARCH_FRONTIER_RECORDS : Object.freeze([]),
    frontierRecordCount: accepted ? 9 : 0,
    globalReopenSignalClasses: accepted ? CAREER_T8_B44_GLOBAL_REOPEN_SIGNAL_CLASSES : Object.freeze([]),
    globalReopenSignalClassCount: accepted ? 8 : 0,
    admittedBoundedAuthorityComponentCountPreserved: accepted ? 1 : 0,
    branchTriggerContractCountPreserved: accepted ? 2 : 0,
    branchSatisfiedTriggerCount: 0,
    familyTriggerContractCountPreserved: accepted ? 3 : 0,
    familySatisfiedTriggerCount: 0,
    externalEvidenceSurfaceHoldCount: accepted ? 2 : 0,
    unconsumedDimensionCount: accepted ? 3 : 0,
    packLevelDeferredLaneCount: accepted ? 1 : 0,
    immediatelyExecutableAuthorityAdmissionLaneCount: 0,
    immediatelyExecutableExistingSurfaceResearchLaneCount: 0,
    boundedGovernanceGateExecutableCount: 0,
    qinP464DirectBodyAcquired: false,
    qianli1936P50ToP53ExactPagesBound: false,
    visibilityConsumedByCurrentContinuation: false,
    pluralityConsumedByCurrentContinuation: false,
    pluralityHeldUnderI254: true,
    seasonalConsumedByCurrentContinuation: false,
    conflictPolicyDisposition: 'PACK_LEVEL_DEFERRED',
    resumeRequiresExplicitSignalChange: accepted,
    broadSearchRestartAuthorized: false,
    repeatedUnchangedSurfaceSearchAuthorized: false,
    crossSourceRequirementStitchingAuthorized: false,
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
    controlIds: accepted ? CAREER_T8_B44_GLOBAL_RESEARCH_HOLD_CONTROL_IDS : Object.freeze([]),
    controlCount: accepted ? 12 : 0,
    controlsFrozen: accepted,
    selectedImmediateNextLane: null,
    recommendedNextGate: accepted
      ? 'CAREER_PERSONALIZATION_T8_RESEARCH_REOPEN_TRIGGER_ACTIVATION_EVIDENCE'
      : 'CAREER_PERSONALIZATION_T8_POST_B43_GLOBAL_RESEARCH_HOLD_REVIEW',
  });
}
