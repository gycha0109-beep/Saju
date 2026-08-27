import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from './career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import { CAREER_T8_B34_BRANCH_CLASH_CANDIDATE } from './career-personalization-t8-branch-clash-published-trigger-activation-evidence.js';
import {
  CAREER_PERSONALIZATION_POSITION_CURRENT_T5_BRIDGE_BOUNDED_AUTHORITY_ADMISSION_REVIEW_VERSION,
  CAREER_T8_B38_ADMITTED_POSITION_AUTHORITY,
  CAREER_T8_B38_POSITION_AUTHORITY_ADMISSION_CONTROL_IDS,
  type CareerPersonalizationPositionCurrentT5BridgeBoundedAuthorityAdmissionReviewReport,
} from './career-personalization-position-current-t5-bridge-bounded-authority-admission-review.js';

export const CAREER_PERSONALIZATION_T8_RESIDUAL_AUTHORITY_FRONTIER_RECONCILIATION_VERSION =
  'myeonghwa-career-personalization-t8-residual-authority-frontier-reconciliation-v1' as const;

export const CAREER_T8_B39_RESIDUAL_FRONTIER_RECORDS = Object.freeze([
  Object.freeze({
    laneId: 'POSITION_CURRENT_T5_BRIDGE',
    state: 'AUTHORITY_ADMITTED_BOUNDED_COMPONENT',
    admissionReady: false,
    authorityAdmitted: true,
    historicalGapClosureReady: false,
    blocker: 'COMPOSITE_VISIBILITY_AND_PLURALITY_COMPONENTS_REMAIN_UNCONSUMED',
  }),
  Object.freeze({
    laneId: 'BRANCH_CLASH_CURRENT_T5_BRIDGE',
    state: 'TRIGGER_REOPENED_MATERIAL_EVIDENCE_BLOCKED',
    admissionReady: false,
    authorityAdmitted: false,
    historicalGapClosureReady: false,
    blocker: 'EXACT_2015_PRINTED_PASSAGE_BINDING_AND_CURRENT_METHOD_COMPATIBILITY_UNRESOLVED',
  }),
  Object.freeze({
    laneId: 'FAMILY_RELATION_CURRENT_T5_BRIDGE',
    state: 'MATERIAL_PARTIAL_REQUIREMENT_COVERAGE',
    admissionReady: false,
    authorityAdmitted: false,
    historicalGapClosureReady: false,
    blocker: '2017_TARGET_BODY_MISSING_AND_2015_EXACT_EDITION_PLUS_MANDATORY_STRENGTH_TRANSFORMATION_DEPENDENCIES_UNRESOLVED',
  }),
  Object.freeze({
    laneId: 'QIN_P464_DIRECT_BODY',
    state: 'DIRECT_BODY_HOLD',
    admissionReady: false,
    authorityAdmitted: false,
    historicalGapClosureReady: false,
    blocker: 'PRINTED_P464_NORMATIVE_BODY_NOT_DIRECTLY_ACQUIRED',
  }),
  Object.freeze({
    laneId: 'QIANLI_1936_EXACT_TARGET_PAGES',
    state: 'EXACT_PRIMARY_PAGE_HOLD',
    admissionReady: false,
    authorityAdmitted: false,
    historicalGapClosureReady: false,
    blocker: 'PRINTED_P50_TO_P53_EXACT_1936_NLC_WITNESS_PAGES_NOT_DIRECTLY_BOUND',
  }),
  Object.freeze({
    laneId: 'VISIBILITY',
    state: 'UNCONSUMED',
    admissionReady: false,
    authorityAdmitted: false,
    historicalGapClosureReady: false,
    blocker: 'CURRENT_CONTINUATION_DOES_NOT_CONSUME_VISIBILITY',
  }),
  Object.freeze({
    laneId: 'PLURALITY',
    state: 'UNCONSUMED_I254_HOLD',
    admissionReady: false,
    authorityAdmitted: false,
    historicalGapClosureReady: false,
    blocker: 'CURRENT_CONTINUATION_DOES_NOT_CONSUME_PLURALITY_AND_I254_PRIMARY_PAGE_HOLD_REMAINS',
  }),
  Object.freeze({
    laneId: 'SEASONAL_PHASE',
    state: 'UNCONSUMED',
    admissionReady: false,
    authorityAdmitted: false,
    historicalGapClosureReady: false,
    blocker: 'CURRENT_CONTINUATION_DOES_NOT_CONSUME_SEASONAL_PHASE',
  }),
  Object.freeze({
    laneId: 'MULTI_PATTERN_CONFLICT_COMPOSITION',
    state: 'PACK_LEVEL_DEFERRED',
    admissionReady: false,
    authorityAdmitted: false,
    historicalGapClosureReady: false,
    blocker: 'DEFERRED_UNTIL_SUFFICIENT_UPSTREAM_AUTHORITIES_EXIST_FOR_GOVERNED_COMPOSITION',
  }),
] as const);

export const CAREER_T8_B39_FRONTIER_RECONCILIATION_CONTROL_IDS = Object.freeze([
  'B39_CONSUMES_ONLY_THE_EXACT_CONTENT_ADDRESSED_B38_POSITION_AUTHORITY_ADMISSION_BOUNDARY',
  'ONE_AND_ONLY_ONE_BOUNDED_POSITION_COMPONENT_IS_CURRENTLY_AUTHORITY_ADMITTED',
  'POSITION_ADMISSION_DOES_NOT_CLOSE_THE_COMPOSITE_VISIBILITY_POSITION_PLURALITY_GAP',
  'BRANCH_TRIGGER_REMAINS_REOPENED_WITH_EXACT_2015_BINDING_AND_CURRENT_METHOD_COMPATIBILITY_UNRESOLVED',
  'FAMILY_REMAINS_MATERIAL_PARTIAL_WITH_ZERO_CURRENT_METHOD_COMPATIBLE_OR_ADMISSION_READY_ALTERNATE_PATHS',
  'QIN_P464_REMAINS_ON_DIRECT_BODY_HOLD_AND_QIANLI_P50_TO_P53_REMAIN_ON_EXACT_PRIMARY_PAGE_HOLD',
  'VISIBILITY_REMAINS_UNCONSUMED',
  'PLURALITY_REMAINS_UNCONSUMED_UNDER_I254_HOLD',
  'SEASONAL_PHASE_REMAINS_UNCONSUMED',
  'MULTI_PATTERN_CONFLICT_COMPOSITION_REMAINS_PACK_LEVEL_DEFERRED',
  'ALL_SIX_HISTORICAL_T8_SYNTHESIS_AUTHORITY_GAPS_REMAIN_FORMALLY_OPEN',
  'NO_NEW_T8_RULE_CLAIM_TYPE_PACK_NARRATIVE_PREVIEW_OR_PRODUCTION_PROMOTION_IS_AUTHORIZED',
  'BRANCH_CLASH_ADEQUACY_AND_COMPATIBILITY_REVIEW_IS_THE_NEXT_BOUNDED_EXECUTABLE_GATE_NOT_BROAD_SOURCE_RESEARCH',
] as const);

export interface CareerPersonalizationT8ResidualAuthorityFrontierReconciliationReport {
  reconciliationId: string;
  reconciliationVersion: typeof CAREER_PERSONALIZATION_T8_RESIDUAL_AUTHORITY_FRONTIER_RECONCILIATION_VERSION;
  status:
    | 'RESOLVED_CAREER_PERSONALIZATION_T8_RESIDUAL_AUTHORITY_FRONTIER_RECONCILIATION'
    | 'UPSTREAM_B38_BOUNDARY_INVALID';
  decision:
    | 'ONE_BOUNDED_POSITION_AUTHORITY_ADMITTED_ALL_HISTORICAL_GAPS_REMAIN_OPEN_BRANCH_IS_NEXT_BOUNDED_EXECUTABLE_REVIEW_LANE'
    | 'RESIDUAL_AUTHORITY_FRONTIER_NOT_ESTABLISHED';
  upstreamB38ReviewId: string;
  exactB38BoundaryAccepted: boolean;
  domain: 'career';
  temporalScope: 'natal';
  statusClass: 'research';
  frontierRecords: typeof CAREER_T8_B39_RESIDUAL_FRONTIER_RECORDS;
  frontierRecordCount: 9 | 0;
  admittedBoundedAuthorityComponentCount: 1 | 0;
  remainingAdmissionReadyComponentCount: 0;
  historicalGapClosureReadyCount: 0;
  positionAuthorityAdmitted: boolean;
  branchTriggerReopened: boolean;
  branchExactPublishedEditionPassageBindingEstablished: false;
  branchCurrentMethodCompatibilityEstablished: false;
  branchAuthorityAdmissionReady: false;
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
  controlIds: readonly (typeof CAREER_T8_B39_FRONTIER_RECONCILIATION_CONTROL_IDS)[number][];
  controlCount: 13 | 0;
  controlsFrozen: boolean;
  recommendedNextGate:
    | 'BRANCH_CLASH_CURRENT_T5_PUBLISHED_EVIDENCE_ADEQUACY_AND_COMPATIBILITY_REVIEW'
    | 'CAREER_PERSONALIZATION_T8_RESIDUAL_AUTHORITY_FRONTIER_RECONCILIATION';
}

function contentAddressedB38IdentityValid(
  b38: CareerPersonalizationPositionCurrentT5BridgeBoundedAuthorityAdmissionReviewReport,
): boolean {
  const { reviewId, ...material } = b38;
  return reviewId ===
    `career_personalization_position_current_t5_bridge_bounded_authority_admission_${deterministicContentHash(material).slice(0, 24)}`;
}

function exactB38Accepted(
  b38: CareerPersonalizationPositionCurrentT5BridgeBoundedAuthorityAdmissionReviewReport,
): boolean {
  return (
    contentAddressedB38IdentityValid(b38) &&
    b38.reviewVersion === CAREER_PERSONALIZATION_POSITION_CURRENT_T5_BRIDGE_BOUNDED_AUTHORITY_ADMISSION_REVIEW_VERSION &&
    b38.status === 'RESOLVED_POSITION_CURRENT_T5_BRIDGE_BOUNDED_AUTHORITY_ADMISSION_REVIEW' &&
    b38.decision ===
      'BOUNDED_DAY_BRANCH_ZHENGGUAN_FORMAL_RESPONSIBILITY_DEEPENS_OR_EMPHASIZES_COMPONENT_AUTHORITY_ADMITTED_COMPOSITE_GAP_REMAINS_OPEN' &&
    b38.exactB33BoundaryAccepted &&
    b38.domain === 'career' &&
    b38.temporalScope === 'natal' &&
    b38.statusClass === 'research' &&
    b38.boundedPositionAuthorityAdmitted &&
    b38.admittedBoundedAuthorityComponentCount === 1 &&
    b38.authorityAdmissionState === 'AUTHORITY_ADMITTED_POSITION_ONLY_COMPONENT' &&
    b38.admittedAuthority !== null &&
    deterministicContentHash(b38.admittedAuthority) === deterministicContentHash(CAREER_T8_B38_ADMITTED_POSITION_AUTHORITY) &&
    b38.generalizedToOtherPillars === false &&
    b38.generalizedToOtherTenGodSemantics === false &&
    b38.strengthWangshuaiImported === false &&
    b38.yongshenImported === false &&
    b38.xijiImported === false &&
    b38.numericWeightingIntroduced === false &&
    b38.leadershipPromotionStatusOccupationOutcomeImported === false &&
    b38.t5BaseSemanticMutated === false &&
    b38.compositePositionVisibilityPluralityGapClosureReady === false &&
    b38.visibilityConsumedByCurrentContinuation === false &&
    b38.pluralityConsumedByCurrentContinuation === false &&
    b38.pluralityHeldUnderI254 &&
    b38.allSixHistoricalGapsRemainOpen &&
    deterministicContentHash(b38.unresolvedGapIds) === deterministicContentHash(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS) &&
    b38.authorityGapClosedByThisGate === false &&
    b38.controlCount === 13 &&
    b38.controlsFrozen &&
    deterministicContentHash(b38.controlIds) === deterministicContentHash(CAREER_T8_B38_POSITION_AUTHORITY_ADMISSION_CONTROL_IDS) &&
    b38.productionImpact === 'NONE' &&
    b38.recommendedNextGate === 'CAREER_PERSONALIZATION_T8_RESIDUAL_AUTHORITY_FRONTIER_RECONCILIATION'
  );
}

function residualFrontierValid(): boolean {
  const branch = CAREER_T8_B34_BRANCH_CLASH_CANDIDATE;
  return (
    CAREER_T8_B39_RESIDUAL_FRONTIER_RECORDS.length === 9 &&
    branch.exactTenGod === '정관' &&
    branch.currentT5SemanticKey === 'TEN_GOD_JEONG_GWAN_FORMAL_RESPONSIBILITY' &&
    branch.qualitativeModificationMode === 'ATTENUATES_OR_REDUCES_EXPRESSION' &&
    branch.exactPublishedEditionPassageBindingEstablished === false &&
    branch.distanceStrengthWangshuaiDependencyPresentInMethodSection &&
    branch.boundedCurrentMethodCompatibilityEstablished === false &&
    branch.authorityAdmissionReady === false
  );
}

function finalized(
  material: Omit<CareerPersonalizationT8ResidualAuthorityFrontierReconciliationReport, 'reconciliationId'>,
): CareerPersonalizationT8ResidualAuthorityFrontierReconciliationReport {
  return {
    reconciliationId: `career_personalization_t8_residual_authority_frontier_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildCareerPersonalizationT8ResidualAuthorityFrontierReconciliation(
  b38: CareerPersonalizationPositionCurrentT5BridgeBoundedAuthorityAdmissionReviewReport,
): CareerPersonalizationT8ResidualAuthorityFrontierReconciliationReport {
  const accepted = exactB38Accepted(b38) && residualFrontierValid();

  return finalized({
    reconciliationVersion: CAREER_PERSONALIZATION_T8_RESIDUAL_AUTHORITY_FRONTIER_RECONCILIATION_VERSION,
    status: accepted
      ? 'RESOLVED_CAREER_PERSONALIZATION_T8_RESIDUAL_AUTHORITY_FRONTIER_RECONCILIATION'
      : 'UPSTREAM_B38_BOUNDARY_INVALID',
    decision: accepted
      ? 'ONE_BOUNDED_POSITION_AUTHORITY_ADMITTED_ALL_HISTORICAL_GAPS_REMAIN_OPEN_BRANCH_IS_NEXT_BOUNDED_EXECUTABLE_REVIEW_LANE'
      : 'RESIDUAL_AUTHORITY_FRONTIER_NOT_ESTABLISHED',
    upstreamB38ReviewId: b38.reviewId,
    exactB38BoundaryAccepted: accepted,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    frontierRecords: accepted ? CAREER_T8_B39_RESIDUAL_FRONTIER_RECORDS : Object.freeze([]) as never,
    frontierRecordCount: accepted ? 9 : 0,
    admittedBoundedAuthorityComponentCount: accepted ? 1 : 0,
    remainingAdmissionReadyComponentCount: 0,
    historicalGapClosureReadyCount: 0,
    positionAuthorityAdmitted: accepted,
    branchTriggerReopened: accepted,
    branchExactPublishedEditionPassageBindingEstablished: false,
    branchCurrentMethodCompatibilityEstablished: false,
    branchAuthorityAdmissionReady: false,
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
    controlIds: accepted ? CAREER_T8_B39_FRONTIER_RECONCILIATION_CONTROL_IDS : Object.freeze([]),
    controlCount: accepted ? 13 : 0,
    controlsFrozen: accepted,
    recommendedNextGate: accepted
      ? 'BRANCH_CLASH_CURRENT_T5_PUBLISHED_EVIDENCE_ADEQUACY_AND_COMPATIBILITY_REVIEW'
      : 'CAREER_PERSONALIZATION_T8_RESIDUAL_AUTHORITY_FRONTIER_RECONCILIATION',
  });
}
