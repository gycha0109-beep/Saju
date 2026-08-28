import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from './career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_PERSONALIZATION_T8_BRANCH_2009_XU_BINGXIN_EXACT_EDITION_BODY_COMPATIBILITY_CLOSURE_EVIDENCE_VERSION,
  CAREER_T8_B52_2009_EXACT_BODY_CLOSURE_CONTROL_IDS,
  CAREER_T8_B52_XU_BINGXIN_2009_EXACT_BODY_EVIDENCE,
  type CareerPersonalizationT8Branch2009XuBingxinExactEditionBodyCompatibilityClosureEvidenceReport,
} from './career-personalization-t8-branch-2009-xu-bingxin-exact-edition-body-compatibility-closure-evidence.js';
import { CAREER_T8_B44_GLOBAL_RESEARCH_FRONTIER_RECORDS } from './career-personalization-t8-post-b43-global-research-hold-review.js';

export const CAREER_PERSONALIZATION_T8_POST_B52_GLOBAL_RESEARCH_HOLD_REVIEW_VERSION =
  'myeonghwa-career-personalization-t8-post-b52-global-research-hold-review-v1' as const;

export const CAREER_T8_B53_GLOBAL_REOPEN_SIGNAL_CLASSES = Object.freeze([
  'QIN_P464_DIRECT_BODY_EVIDENCE_CHANGE',
  'QIANLI_1936_EXACT_TARGET_PAGE_EVIDENCE_CHANGE',
  'BRANCH_2015_EXACT_PRINTED_TARGET_BODY_ACQUIRED',
  'BRANCH_DIFFERENT_QUALIFYING_SOURCE_COMPLETE_PATH_SIGNAL',
  'BRANCH_GOVERNED_METHOD_AUTHORITY_CHANGE',
  'FAMILY_B43_TRIGGER_CONDITION_CHANGE',
  'VISIBILITY_GOVERNED_METHOD_SCOPE_CHANGE',
  'PLURALITY_I254_GOVERNANCE_RELEASE',
  'SEASONAL_GOVERNED_METHOD_SCOPE_CHANGE',
  'UPSTREAM_AUTHORITY_SUFFICIENCY_FOR_PACK_LEVEL_CONFLICT_REVIEW',
] as const);

export const CAREER_T8_B53_GLOBAL_RESEARCH_FRONTIER_RECORDS = Object.freeze([
  Object.freeze({
    laneId: 'POSITION_CURRENT_T5_BRIDGE' as const,
    state: 'AUTHORITY_ADMITTED_BOUNDED_COMPONENT' as const,
    reopenSignalClasses: Object.freeze([] as const),
    existingSurfaceResearchExecutable: false as const,
    authorityAdmissionExecutable: false as const,
    boundedGovernanceGateExecutable: false as const,
    note: 'The previously admitted bounded Position component is preserved; it does not close the composite historical visibility/position/plurality gap.',
  }),
  Object.freeze({
    laneId: 'BRANCH_CLASH_CURRENT_T5_BRIDGE' as const,
    state: 'POST_REOPEN_NEGATIVE_PATH_HOLD_ZERO_AUTHORITY_TRIGGERS' as const,
    reopenSignalClasses: Object.freeze([
      'BRANCH_2015_EXACT_PRINTED_TARGET_BODY_ACQUIRED',
      'BRANCH_DIFFERENT_QUALIFYING_SOURCE_COMPLETE_PATH_SIGNAL',
      'BRANCH_GOVERNED_METHOD_AUTHORITY_CHANGE',
    ] as const),
    existingSurfaceResearchExecutable: false as const,
    authorityAdmissionExecutable: false as const,
    boundedGovernanceGateExecutable: false as const,
    note: 'The Branch reopen cycle consumed three distinct published exact-body negative compatibility paths plus the bounded 2015 lineage recheck; zero source or method authority triggers activated.',
  }),
  Object.freeze({
    laneId: 'FAMILY_RELATION_CURRENT_T5_BRIDGE' as const,
    state: 'REMEDIATION_TRIGGER_HOLD_0_OF_3' as const,
    reopenSignalClasses: Object.freeze(['FAMILY_B43_TRIGGER_CONDITION_CHANGE'] as const),
    existingSurfaceResearchExecutable: false as const,
    authorityAdmissionExecutable: false as const,
    boundedGovernanceGateExecutable: false as const,
    note: 'No post-B44 Family trigger satisfaction was established by the Branch reopen cycle.',
  }),
  Object.freeze({
    laneId: 'QIN_P464_DIRECT_BODY' as const,
    state: 'EXTERNAL_EVIDENCE_SURFACE_HOLD' as const,
    reopenSignalClasses: Object.freeze(['QIN_P464_DIRECT_BODY_EVIDENCE_CHANGE'] as const),
    existingSurfaceResearchExecutable: false as const,
    authorityAdmissionExecutable: false as const,
    boundedGovernanceGateExecutable: false as const,
    note: 'The Branch reopen cycle does not establish a qualifying Qin p.464 direct-body change.',
  }),
  Object.freeze({
    laneId: 'QIANLI_1936_EXACT_TARGET_PAGES' as const,
    state: 'EXTERNAL_EVIDENCE_SURFACE_HOLD' as const,
    reopenSignalClasses: Object.freeze(['QIANLI_1936_EXACT_TARGET_PAGE_EVIDENCE_CHANGE'] as const),
    existingSurfaceResearchExecutable: false as const,
    authorityAdmissionExecutable: false as const,
    boundedGovernanceGateExecutable: false as const,
    note: 'The Branch reopen cycle does not establish a qualifying Qianli 1936 exact-target-page change.',
  }),
  Object.freeze({
    laneId: 'VISIBILITY' as const,
    state: 'UNCONSUMED' as const,
    reopenSignalClasses: Object.freeze(['VISIBILITY_GOVERNED_METHOD_SCOPE_CHANGE'] as const),
    existingSurfaceResearchExecutable: false as const,
    authorityAdmissionExecutable: false as const,
    boundedGovernanceGateExecutable: false as const,
    note: 'Visibility remains outside the current Career continuation absent governed method-scope change.',
  }),
  Object.freeze({
    laneId: 'PLURALITY' as const,
    state: 'UNCONSUMED_I254_HOLD' as const,
    reopenSignalClasses: Object.freeze(['PLURALITY_I254_GOVERNANCE_RELEASE'] as const),
    existingSurfaceResearchExecutable: false as const,
    authorityAdmissionExecutable: false as const,
    boundedGovernanceGateExecutable: false as const,
    note: 'Plurality remains unconsumed and the I254 governance hold remains preserved.',
  }),
  Object.freeze({
    laneId: 'SEASONAL_PHASE' as const,
    state: 'UNCONSUMED' as const,
    reopenSignalClasses: Object.freeze(['SEASONAL_GOVERNED_METHOD_SCOPE_CHANGE'] as const),
    existingSurfaceResearchExecutable: false as const,
    authorityAdmissionExecutable: false as const,
    boundedGovernanceGateExecutable: false as const,
    note: 'Seasonal phase remains outside the current Career continuation absent governed method-scope change.',
  }),
  Object.freeze({
    laneId: 'MULTI_PATTERN_CONFLICT_COMPOSITION' as const,
    state: 'PACK_LEVEL_DEFERRED' as const,
    reopenSignalClasses: Object.freeze(['UPSTREAM_AUTHORITY_SUFFICIENCY_FOR_PACK_LEVEL_CONFLICT_REVIEW'] as const),
    existingSurfaceResearchExecutable: false as const,
    authorityAdmissionExecutable: false as const,
    boundedGovernanceGateExecutable: false as const,
    note: 'Conflict composition remains pack-level deferred until sufficient upstream authority exists.',
  }),
] as const);

export const CAREER_T8_B53_GLOBAL_RESEARCH_HOLD_CONTROL_IDS = Object.freeze([
  'B53_CONSUMES_ONLY_THE_EXACT_CONTENT_ADDRESSED_B52_XU_BINGXIN_NEGATIVE_CLOSURE_BOUNDARY',
  'THE_B49_2004_B50_2016_AND_B52_2009_NEGATIVE_CURRENT_METHOD_CLOSURES_ARE_PRESERVED_UNCHANGED',
  'THE_B51_2015_SHISHEN_CHANWEI_EXACT_PRINTED_TARGET_BODY_HOLD_IS_PRESERVED_UNCHANGED',
  'THE_COMPLETED_BRANCH_REOPEN_CYCLE_CONTAINS_THREE_DISTINCT_PUBLISHED_NEGATIVE_COMPATIBILITY_PATHS_AND_ZERO_AUTHORITY_TRIGGER_ACTIVATIONS',
  'NO_CURRENT_BRANCH_SOURCE_OR_METHOD_AUTHORITY_TRIGGER_IS_SATISFIED',
  'ZERO_IMMEDIATELY_EXECUTABLE_BRANCH_AUTHORITY_RESEARCH_ADMISSION_OR_SEMANTIC_RULE_LANES_REMAIN',
  'REPEATED_SEARCH_OF_B49_B50_B51_LINEAGE_ONLY_OR_B52_CLOSED_SURFACES_IS_NOT_AUTHORIZED',
  'BROAD_UNTARGETED_BRANCH_SOURCE_SEARCH_RESTART_IS_NOT_AUTHORIZED',
  'THE_2015_BRANCH_PATH_REOPENS_ONLY_ON_A_DIRECTLY_INSPECTED_PRINTED_TARGET_WITNESS',
  'A_DIFFERENT_BRANCH_SOURCE_PATH_REOPENS_ONLY_AFTER_AN_EXPLICIT_QUALIFYING_COMPLETE_PATH_SIGNAL_NOT_FROM_BLIND_SEARCH_VOLUME',
  'THE_BRANCH_METHOD_PATH_REOPENS_ONLY_AFTER_SEPARATELY_GOVERNED_METHOD_AUTHORITY_CHANGES',
  'NON_BRANCH_GLOBAL_FRONTIER_STATES_REMAIN_TRIGGER_GATED_AND_ARE_NOT_REOPENED_BY_BRANCH_ONLY_EVIDENCE',
  'ALL_SIX_HISTORICAL_CAREER_T8_AUTHORITY_GAPS_REMAIN_FORMALLY_OPEN',
  'NO_CROSS_SOURCE_STITCHING_SOURCE_DEPENDENCY_DROPPING_OR_EFFECT_CLASS_FLATTENING_IS_AUTHORIZED',
  'NO_T5_T6_T8_RULE_CLAIM_PACK_NARRATIVE_PREVIEW_DEFAULT_OR_PRODUCTION_PROMOTION_IS_AUTHORIZED',
] as const);

export interface CareerPersonalizationT8PostB52GlobalResearchHoldReviewReport {
  reviewId: string;
  reviewVersion: typeof CAREER_PERSONALIZATION_T8_POST_B52_GLOBAL_RESEARCH_HOLD_REVIEW_VERSION;
  status:
    | 'RESOLVED_CAREER_PERSONALIZATION_T8_POST_B52_GLOBAL_RESEARCH_HOLD_REVIEW'
    | 'UPSTREAM_B52_BOUNDARY_INVALID';
  decision:
    | 'POST_REOPEN_GLOBAL_TRIGGER_GATED_RESEARCH_HOLD_BRANCH_CYCLE_EXHAUSTED_ZERO_EXECUTABLE_LANES_RESUME_ONLY_ON_EXPLICIT_FROZEN_SIGNAL_CHANGE'
    | 'POST_B52_GLOBAL_RESEARCH_HOLD_NOT_ESTABLISHED';
  upstreamB52EvidenceId: string;
  exactB52BoundaryAccepted: boolean;
  domain: 'career';
  temporalScope: 'natal';
  statusClass: 'research';
  globalResearchHoldActive: boolean;
  branchReopenCycleCompleted: boolean;
  branchMaterialStateChangesAfterB48Reviewed: 4 | 0;
  branchNegativePublishedCompatibilityPathCount: 3 | 0;
  branch2015LineageRecheckCompleted: boolean;
  branch2015ExactPrintedTargetBodyHoldPreserved: boolean;
  branchSourceSpecificDependencySeparabilityOrCompletePathTriggerSatisfied: false;
  branchMethodSpecificInputContractAndUpstreamAuthorityTriggerSatisfied: false;
  branchAuthorityTriggerActivationCount: 0;
  branchCurrentMethodCompatibleCompletePathCount: 0;
  frontierRecords: readonly (typeof CAREER_T8_B53_GLOBAL_RESEARCH_FRONTIER_RECORDS)[number][];
  frontierRecordCount: 9 | 0;
  globalReopenSignalClasses: readonly (typeof CAREER_T8_B53_GLOBAL_REOPEN_SIGNAL_CLASSES)[number][];
  globalReopenSignalClassCount: 10 | 0;
  nonBranchFrontierRemainsTriggerGated: boolean;
  immediatelyExecutableAuthorityResearchLaneCount: 0;
  immediatelyExecutableAuthorityAdmissionLaneCount: 0;
  immediatelyExecutableSemanticRuleLaneCount: 0;
  boundedGovernanceGateExecutableCount: 0;
  selectedImmediateNextLane: null;
  broadBranchSourceSearchRestartAuthorized: false;
  repeatedClosedBranchSurfaceSearchAuthorized: false;
  exact2015LineageOnlyResearchRestartAuthorized: false;
  crossSourceStitchingAuthorized: false;
  sourceMandatoryDependencyDroppingAuthorized: false;
  effectClassFlatteningAuthorized: false;
  allSixHistoricalGapsRemainOpen: true;
  unresolvedGapIds: typeof CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS;
  authorityAdmittedByThisGate: false;
  authorityGapClosedByThisGate: false;
  methodologyDefinitionCreatedByThisGate: false;
  t5RuleAuthoringAuthorized: false;
  t6RuleAuthoringAuthorized: false;
  t8RuleAuthoringAuthorized: false;
  claimTypeCreationAuthorized: false;
  personalizedT8PackCreationAuthorized: false;
  consumerNarrativeAuthorized: false;
  previewDefaultSwitchAuthorized: false;
  productionPromotionAuthorized: false;
  productionImpact: 'NONE';
  controlIds: readonly (typeof CAREER_T8_B53_GLOBAL_RESEARCH_HOLD_CONTROL_IDS)[number][];
  controlCount: 15 | 0;
  controlsFrozen: boolean;
  implementationEffects: {
    sourceBodiesAcquired: 0;
    sourcePathsNegativelyClosed: 0;
    authorityTriggersActivated: 0;
    authorityResearchLanesOpened: 0;
    authorityComponentsAdmitted: 0;
    authorityGapsClosed: 0;
    methodologyDefinitionsCreated: 0;
    ruleDefinitionsCreated: 0;
    claimTypesCreated: 0;
    interpretationPacksCreated: 0;
    narrativePlansCreated: 0;
    previewRoutesChanged: 0;
    productionBehaviorsChanged: 0;
    researchHoldReviewsCreated: 1 | 0;
  };
  recommendedNextGate:
    | 'CAREER_PERSONALIZATION_T8_POST_B52_RESEARCH_REOPEN_TRIGGER_ACTIVATION_EVIDENCE'
    | 'CAREER_PERSONALIZATION_T8_POST_B52_GLOBAL_RESEARCH_HOLD_REVIEW';
}

function contentAddressedB52IdentityValid(
  b52: CareerPersonalizationT8Branch2009XuBingxinExactEditionBodyCompatibilityClosureEvidenceReport,
): boolean {
  const { evidenceId, ...material } = b52;
  return (
    evidenceId ===
    `career_personalization_t8_branch_2009_xu_bingxin_exact_edition_body_compatibility_closure_${deterministicContentHash(material).slice(0, 24)}`
  );
}

function exactB52Accepted(
  b52: CareerPersonalizationT8Branch2009XuBingxinExactEditionBodyCompatibilityClosureEvidenceReport,
): boolean {
  return (
    contentAddressedB52IdentityValid(b52) &&
    b52.evidenceVersion ===
      CAREER_PERSONALIZATION_T8_BRANCH_2009_XU_BINGXIN_EXACT_EDITION_BODY_COMPATIBILITY_CLOSURE_EVIDENCE_VERSION &&
    b52.status === 'RESOLVED_BRANCH_2009_XU_BINGXIN_EXACT_EDITION_BODY_COMPATIBILITY_CLOSURE_EVIDENCE' &&
    b52.decision ===
      'EXACT_2009_XU_BINGXIN_BODY_ACQUIRED_SOURCE_DEPENDENCIES_CONFIRMED_CURRENT_METHOD_INCOMPATIBLE_ZERO_AUTHORITY_TRIGGER_ACTIVATIONS' &&
    b52.exactB51BoundaryAccepted &&
    b52.domain === 'career' &&
    b52.temporalScope === 'natal' &&
    b52.statusClass === 'research' &&
    b52.prior2004And2016NegativeClosuresPreserved &&
    b52.prior2015ExactBodyHoldPreserved &&
    deterministicContentHash(b52.sourceEvidence) ===
      deterministicContentHash(CAREER_T8_B52_XU_BINGXIN_2009_EXACT_BODY_EVIDENCE) &&
    b52.sourceEvidenceStateChangedSinceB51 &&
    b52.sourceAcquisitionPerformed &&
    b52.exact2009EditionBindingEstablished &&
    b52.exact2009TargetBodyDirectlyInspected &&
    b52.currentMethodIncompatibilityForFlatModifierEstablished &&
    b52.sourceSpecificDependencySeparabilityEstablished === false &&
    b52.governedFlatAttenuationModeDirectlyEstablished === false &&
    b52.currentMethodCompatibilityEstablished === false &&
    b52.independentSingleSourceCompletePathEstablished === false &&
    b52.normativeProvenanceIndependenceClaimedByThisGate === false &&
    b52.sourceSpecificDependencySeparabilityOrCompletePathTriggerActivated === false &&
    b52.methodSpecificInputContractAndUpstreamAuthorityTriggerActivated === false &&
    b52.satisfiedOpenAuthorityTriggerCount === 0 &&
    b52.authorityResearchLaneReopenedCount === 0 &&
    b52.immediatelyExecutableAuthorityAdmissionLaneCount === 0 &&
    b52.immediatelyExecutableSemanticRuleLaneCount === 0 &&
    b52.selectedImmediateNextLane === null &&
    b52.branchAuthorityHoldActive &&
    b52.exact2015PrintedTargetPassageBindingEstablished === false &&
    b52.exact2015PrintedTargetBodyDirectlyInspected === false &&
    b52.broadUnchangedSurfaceSearchRestartAuthorized === false &&
    b52.repeat2004PathSearchAuthorized === false &&
    b52.repeat2016PathSearchAuthorized === false &&
    b52.repeat2009XuBingxinPathSearchAuthorized === false &&
    b52.repeat2015LineageOnlySearchAuthorized === false &&
    b52.crossSourceStitchingAuthorized === false &&
    b52.sourceMandatoryDependencyDroppingAuthorized === false &&
    b52.careerEligibilityFailureToFlatAttenuationConversionAuthorized === false &&
    b52.publicationMetadataIndependenceInferenceAuthorized === false &&
    b52.allSixHistoricalGapsRemainOpen &&
    deterministicContentHash(b52.unresolvedGapIds) === deterministicContentHash(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS) &&
    b52.authorityAdmittedByThisGate === false &&
    b52.authorityGapClosedByThisGate === false &&
    b52.methodologyDefinitionCreatedByThisGate === false &&
    b52.t5RuleAuthoringAuthorized === false &&
    b52.t6RuleAuthoringAuthorized === false &&
    b52.t8RuleAuthoringAuthorized === false &&
    b52.claimTypeCreationAuthorized === false &&
    b52.personalizedT8PackCreationAuthorized === false &&
    b52.consumerNarrativeAuthorized === false &&
    b52.previewDefaultSwitchAuthorized === false &&
    b52.productionPromotionAuthorized === false &&
    b52.productionImpact === 'NONE' &&
    b52.controlCount === 16 &&
    b52.controlsFrozen &&
    deterministicContentHash(b52.controlIds) ===
      deterministicContentHash(CAREER_T8_B52_2009_EXACT_BODY_CLOSURE_CONTROL_IDS) &&
    b52.implementationEffects.cumulativeNegativelyClosedIndependentPublishedBranchPaths === 3 &&
    b52.implementationEffects.authorityTriggersActivated === 0 &&
    b52.recommendedNextGate === 'BRANCH_SOURCE_OR_METHOD_AUTHORITY_TRIGGER_ACTIVATION_EVIDENCE'
  );
}

function frontierStateValid(): boolean {
  if (
    CAREER_T8_B53_GLOBAL_RESEARCH_FRONTIER_RECORDS.length !== 9 ||
    CAREER_T8_B53_GLOBAL_REOPEN_SIGNAL_CLASSES.length !== 10
  ) {
    return false;
  }

  const branch = CAREER_T8_B53_GLOBAL_RESEARCH_FRONTIER_RECORDS.find(
    (record) => record.laneId === 'BRANCH_CLASH_CURRENT_T5_BRIDGE',
  );
  if (
    branch?.state !== 'POST_REOPEN_NEGATIVE_PATH_HOLD_ZERO_AUTHORITY_TRIGGERS' ||
    branch.existingSurfaceResearchExecutable ||
    branch.authorityAdmissionExecutable ||
    branch.boundedGovernanceGateExecutable
  ) {
    return false;
  }

  const priorNonBranchStates = new Map(
    CAREER_T8_B44_GLOBAL_RESEARCH_FRONTIER_RECORDS.filter(
      (record) => record.laneId !== 'BRANCH_CLASH_CURRENT_T5_BRIDGE',
    ).map((record) => [record.laneId, record.state] as const),
  );

  return CAREER_T8_B53_GLOBAL_RESEARCH_FRONTIER_RECORDS.filter(
    (record) => record.laneId !== 'BRANCH_CLASH_CURRENT_T5_BRIDGE',
  ).every((record) => priorNonBranchStates.get(record.laneId) === record.state);
}

function finalized(
  material: Omit<CareerPersonalizationT8PostB52GlobalResearchHoldReviewReport, 'reviewId'>,
): CareerPersonalizationT8PostB52GlobalResearchHoldReviewReport {
  return {
    reviewId: `career_personalization_t8_post_b52_global_research_hold_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildCareerPersonalizationT8PostB52GlobalResearchHoldReview(
  b52: CareerPersonalizationT8Branch2009XuBingxinExactEditionBodyCompatibilityClosureEvidenceReport,
): CareerPersonalizationT8PostB52GlobalResearchHoldReviewReport {
  const accepted = exactB52Accepted(b52) && frontierStateValid();

  return finalized({
    reviewVersion: CAREER_PERSONALIZATION_T8_POST_B52_GLOBAL_RESEARCH_HOLD_REVIEW_VERSION,
    status: accepted
      ? 'RESOLVED_CAREER_PERSONALIZATION_T8_POST_B52_GLOBAL_RESEARCH_HOLD_REVIEW'
      : 'UPSTREAM_B52_BOUNDARY_INVALID',
    decision: accepted
      ? 'POST_REOPEN_GLOBAL_TRIGGER_GATED_RESEARCH_HOLD_BRANCH_CYCLE_EXHAUSTED_ZERO_EXECUTABLE_LANES_RESUME_ONLY_ON_EXPLICIT_FROZEN_SIGNAL_CHANGE'
      : 'POST_B52_GLOBAL_RESEARCH_HOLD_NOT_ESTABLISHED',
    upstreamB52EvidenceId: b52.evidenceId,
    exactB52BoundaryAccepted: accepted,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    globalResearchHoldActive: accepted,
    branchReopenCycleCompleted: accepted,
    branchMaterialStateChangesAfterB48Reviewed: accepted ? 4 : 0,
    branchNegativePublishedCompatibilityPathCount: accepted ? 3 : 0,
    branch2015LineageRecheckCompleted: accepted,
    branch2015ExactPrintedTargetBodyHoldPreserved: accepted,
    branchSourceSpecificDependencySeparabilityOrCompletePathTriggerSatisfied: false,
    branchMethodSpecificInputContractAndUpstreamAuthorityTriggerSatisfied: false,
    branchAuthorityTriggerActivationCount: 0,
    branchCurrentMethodCompatibleCompletePathCount: 0,
    frontierRecords: accepted ? CAREER_T8_B53_GLOBAL_RESEARCH_FRONTIER_RECORDS : Object.freeze([]),
    frontierRecordCount: accepted ? 9 : 0,
    globalReopenSignalClasses: accepted ? CAREER_T8_B53_GLOBAL_REOPEN_SIGNAL_CLASSES : Object.freeze([]),
    globalReopenSignalClassCount: accepted ? 10 : 0,
    nonBranchFrontierRemainsTriggerGated: accepted,
    immediatelyExecutableAuthorityResearchLaneCount: 0,
    immediatelyExecutableAuthorityAdmissionLaneCount: 0,
    immediatelyExecutableSemanticRuleLaneCount: 0,
    boundedGovernanceGateExecutableCount: 0,
    selectedImmediateNextLane: null,
    broadBranchSourceSearchRestartAuthorized: false,
    repeatedClosedBranchSurfaceSearchAuthorized: false,
    exact2015LineageOnlyResearchRestartAuthorized: false,
    crossSourceStitchingAuthorized: false,
    sourceMandatoryDependencyDroppingAuthorized: false,
    effectClassFlatteningAuthorized: false,
    allSixHistoricalGapsRemainOpen: true,
    unresolvedGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    authorityAdmittedByThisGate: false,
    authorityGapClosedByThisGate: false,
    methodologyDefinitionCreatedByThisGate: false,
    t5RuleAuthoringAuthorized: false,
    t6RuleAuthoringAuthorized: false,
    t8RuleAuthoringAuthorized: false,
    claimTypeCreationAuthorized: false,
    personalizedT8PackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    productionImpact: 'NONE',
    controlIds: accepted ? CAREER_T8_B53_GLOBAL_RESEARCH_HOLD_CONTROL_IDS : Object.freeze([]),
    controlCount: accepted ? 15 : 0,
    controlsFrozen: accepted,
    implementationEffects: {
      sourceBodiesAcquired: 0,
      sourcePathsNegativelyClosed: 0,
      authorityTriggersActivated: 0,
      authorityResearchLanesOpened: 0,
      authorityComponentsAdmitted: 0,
      authorityGapsClosed: 0,
      methodologyDefinitionsCreated: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
      productionBehaviorsChanged: 0,
      researchHoldReviewsCreated: accepted ? 1 : 0,
    },
    recommendedNextGate: accepted
      ? 'CAREER_PERSONALIZATION_T8_POST_B52_RESEARCH_REOPEN_TRIGGER_ACTIVATION_EVIDENCE'
      : 'CAREER_PERSONALIZATION_T8_POST_B52_GLOBAL_RESEARCH_HOLD_REVIEW',
  });
}
