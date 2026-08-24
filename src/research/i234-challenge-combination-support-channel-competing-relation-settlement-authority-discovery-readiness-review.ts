import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  I233_COMPETING_RELATION_SETTLEMENT_AUTHORITY_REQUIREMENT_IDS,
  I233_REQUIREMENTS_REVIEW_CONTROL_IDS,
  buildI233ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityGapRequirementsReview,
  type I233ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityGapRequirementsReviewReport,
} from './i233-challenge-combination-support-channel-competing-relation-settlement-authority-gap-requirements-review.js';

export const I234_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_COMPETING_RELATION_SETTLEMENT_AUTHORITY_DISCOVERY_READINESS_REVIEW_VERSION =
  'myeonghwa-challenge-combination-support-channel-competing-relation-settlement-authority-discovery-readiness-review-v1';

export const I234_COMPETING_RELATION_SETTLEMENT_DISCOVERY_PATH_IDS = Object.freeze([
  'MULTI_RELATION_SIMULTANEOUS_TOUCH_GENERAL_RULE_DISCOVERY',
  'CLASH_VS_COMBINATION_PRECEDENCE_OR_COEXISTENCE_DISCOVERY',
  'COMBINATION_VS_COMBINATION_COMPETING_SETTLEMENT_DISCOVERY',
  'ROLE_POSITION_CONTEXT_AND_EXCEPTION_DISCOVERY',
  'TIE_CONFLICT_OR_UNRESOLVED_DISPOSITION_DISCOVERY',
] as const);
export type I234CompetingRelationSettlementDiscoveryPathId =
  (typeof I234_COMPETING_RELATION_SETTLEMENT_DISCOVERY_PATH_IDS)[number];

export const I234_DISCOVERY_CONTROL_IDS = Object.freeze([
  'EXACT_I233_EIGHT_REQUIREMENT_BOUNDARY_REQUIRED',
  'EXACT_I233_FIFTEEN_CONTROL_BOUNDARY_REQUIRED',
  'I232_HIDDEN_STEM_HOLD_MUST_REMAIN_SEPARATE_AND_CLOSED_TO_AUTOMATED_CONTINUATION',
  'DISCOVERY_MUST_TARGET_EXPLICIT_MULTI_RELATION_SETTLEMENT_NOT_GENERIC_RELATION_DESCRIPTIONS',
  'DIRECT_SOURCE_TEXT_MUST_BIND_AT_LEAST_ONE_I233_REQUIREMENT',
  'EXACT_SOURCE_IDENTITY_ORIGINAL_CONTEXT_AND_REPRODUCIBLE_LOCATOR_REQUIRED',
  'SEARCH_SNIPPET_OR_INDEX_RESULT_IS_LEAD_ONLY_UNTIL_SOURCE_BOUND',
  'WORKED_EXAMPLE_MUST_NOT_BE_GENERALIZED_WITHOUT_RULE_LEVEL_LANGUAGE',
  'CLASH_LOCAL_RELATIVE_FORCE_MUST_NOT_BE_PROMOTED_TO_CROSS_RELATION_PRECEDENCE',
  'COMBINATION_LOCAL_BUREAU_STATE_MUST_NOT_BE_PROMOTED_TO_CROSS_RELATION_PRECEDENCE',
  'RELATION_TOUCH_COUNT_PAIR_ORDER_AND_POSITION_COUNT_MUST_NOT_CREATE_PRECEDENCE',
  'NO_NUMERIC_WEIGHTING_MAJORITY_VOTE_OR_SOURCE_COUNT_PRECEDENCE',
  'NO_CROSS_SOURCE_COMPOSITION_OR_SEMANTIC_BRIDGE_INFERENCE_AT_DISCOVERY_GATE',
  'NO_VISIBLE_OR_HIDDEN_STEM_KE_AUTHORITY_BACKFILL',
  'NO_ACTIVATION_PERSISTENCE_DESTRUCTION_NET_EFFECT_OR_ROOT_STATE_PROMOTION',
  'I132_QU_WEI_LI_V2_GUARDS_REMAIN_UNCHANGED',
  'NO_THRESHOLD_DAMAGE_CLASSIFICATION_SCORING_OR_PRODUCTION_AUTHORITY',
] as const);

export interface I234CompetingRelationSettlementDiscoveryPath {
  pathId: I234CompetingRelationSettlementDiscoveryPathId;
  authorizedForDiscovery: true;
  directNormativeTextPreferred: true;
  sourceBoundLocatorRequiredForPositiveFinding: true;
  discoveryExecutedByThisGate: false;
}

export interface I234ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityDiscoveryReadinessReviewReport {
  reviewId: string;
  reviewVersion: string;
  status:
    | 'RESOLVED_COMPETING_RELATION_SETTLEMENT_AUTHORITY_DISCOVERY_READINESS_REVIEW'
    | 'I233_REQUIREMENTS_BOUNDARY_INVALID';
  decision:
    | 'FIVE_COMPETING_RELATION_AUTHORITY_DISCOVERY_PATHS_SEVENTEEN_CONTROLS_FROZEN_NO_DISCOVERY_EXECUTED_NO_PRECEDENCE_AGGREGATION_OR_NET_EFFECT_AUTHORITY_ACQUIRED'
    | 'COMPETING_RELATION_SETTLEMENT_AUTHORITY_DISCOVERY_NOT_READY';
  upstreamI233ReviewId: string;
  exactI233BoundaryAccepted: boolean;
  targetScope: 'MULTIPLE_TRACKED_RELATION_TOUCHES_COMPETING_RELATION_SETTLEMENT';
  authorityGap:
    | 'COMPETING_RELATION_SETTLEMENT_AUTHORITY_NOT_ESTABLISHED'
    | 'UPSTREAM_INVALID';
  authorityGapClosed: false;
  I233RequirementIds: readonly string[];
  I233RequirementCount: 8 | 0;
  I233RequirementsFrozenAccepted: boolean;
  I233ControlIds: readonly string[];
  I233ControlCount: 15 | 0;
  I233ControlsFrozenAccepted: boolean;
  discoveryPaths: readonly I234CompetingRelationSettlementDiscoveryPath[];
  discoveryPathCount: 5 | 0;
  allDiscoveryPathsAuthorized: boolean;
  discoveryPathSetFrozen: boolean;
  discoveryControlIds: readonly string[];
  discoveryControlCount: 17 | 0;
  discoveryControlsFrozen: boolean;
  discoveryAuthorized: boolean;
  discoveryExecutedByThisGate: false;
  directSourceTextRequiredForPositiveAuthorityFinding: boolean;
  exactSourceIdentityRequired: boolean;
  originalOrVerifiedSourceContextRequired: boolean;
  reproducibleLocatorRequired: boolean;
  searchSnippetMayEstablishPositiveAuthorityFinding: false;
  indexResultMayEstablishPositiveAuthorityFinding: false;
  workedExampleMayBecomeGeneralRuleWithoutRuleLanguage: false;
  genericRelationDescriptionMaySatisfyMultiRelationSettlementScope: false;
  clashLocalRelativeForceMayCreateCrossRelationPrecedence: false;
  combinationLocalBureauStateMayCreateCrossRelationPrecedence: false;
  relationTouchCountMayCreatePrecedence: false;
  pairOrderMayCreatePrecedence: false;
  numericWeightingAuthorized: false;
  majorityVoteAuthorized: false;
  sourceCountMayCreatePrecedence: false;
  crossSourceCompositionAuthorizedByThisGate: false;
  semanticBridgeInferenceAuthorizedByThisGate: false;
  competingRelationSettlementResolved: false;
  crossRelationPrecedenceAuthorized: false;
  multiTouchAggregationAuthorized: false;
  supportChannelActivationVerdictAuthorized: false;
  supportChannelPersistenceVerdictAuthorized: false;
  supportChannelDestructionVerdictAuthorized: false;
  supportChannelNetEffectVerdictAuthorized: false;
  targetPostRelationRootState: 'not_determined';
  effectiveMechanismForceVerdict: 'not_determined';
  hiddenStemI232HoldPreserved: boolean;
  hiddenStemTrackReopenedByThisGate: false;
  hiddenStemAuthorityGap: 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED';
  visibleStemBinaryEffectiveInteractionEligibilityResolved: false;
  quWei2001HoldPreserved: boolean;
  li1998SameTargetPathSuspendedNotRetired: boolean;
  I132IndependentNormativeProvenanceRequirementRemainsNormative: boolean;
  I132PolicyRelaxationAuthorizedByThisGate: false;
  currentV2PackageAndCandidateSetRemainImmutable: boolean;
  currentV2ProvenanceDisposition: 'BLOCKED_UNDER_CURRENT_EVIDENCE' | 'NOT_ASSESSED';
  candidateSetMutatedByThisGate: false;
  evidenceRebindingAuthorizedByThisGate: false;
  provenanceIndependenceAdjudicatedByThisGate: false;
  actualCompositionPerformedByThisGate: false;
  multiSourceCompositionAuthorized: false;
  thresholdRuleCreatedByThisGate: false;
  damageEvaluationAuthorized: false;
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  productionPolicyExecutionAuthorized: false;
  recommendedNextGate:
    | 'COMPETING_RELATION_SETTLEMENT_AUTHORITY_DISCOVERY_EVIDENCE'
    | 'COMPETING_RELATION_SETTLEMENT_AUTHORITY_DISCOVERY_READINESS_REVIEW';
  notes: readonly string[];
}

const DISCOVERY_PATHS = Object.freeze(
  I234_COMPETING_RELATION_SETTLEMENT_DISCOVERY_PATH_IDS.map(
    (pathId): I234CompetingRelationSettlementDiscoveryPath => ({
      pathId,
      authorizedForDiscovery: true,
      directNormativeTextPreferred: true,
      sourceBoundLocatorRequiredForPositiveFinding: true,
      discoveryExecutedByThisGate: false,
    }),
  ),
);

function exactI233Accepted(
  i233: I233ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityGapRequirementsReviewReport,
): boolean {
  const canonical =
    buildI233ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityGapRequirementsReview();
  return (
    i233.reviewId === canonical.reviewId &&
    i233.status === 'RESOLVED_COMPETING_RELATION_SETTLEMENT_AUTHORITY_GAP_REQUIREMENTS_REVIEW' &&
    i233.decision ===
      'COMPETING_RELATION_SETTLEMENT_AUTHORITY_ACCEPTANCE_CONTRACT_FROZEN_EIGHT_REQUIREMENTS_NO_PRECEDENCE_AGGREGATION_OR_NET_EFFECT_AUTHORITY_ACQUIRED' &&
    i233.targetScope === 'MULTIPLE_TRACKED_RELATION_TOUCHES_COMPETING_RELATION_SETTLEMENT' &&
    i233.authorityGap === 'COMPETING_RELATION_SETTLEMENT_AUTHORITY_NOT_ESTABLISHED' &&
    i233.authorityGapConfirmed &&
    i233.authorityGapClosed === false &&
    i233.requirementCount === 8 &&
    i233.requirements.length === I233_COMPETING_RELATION_SETTLEMENT_AUTHORITY_REQUIREMENT_IDS.length &&
    i233.requirements.every(
      (item, index) =>
        item.requirementId === I233_COMPETING_RELATION_SETTLEMENT_AUTHORITY_REQUIREMENT_IDS[index] &&
        item.mandatory &&
        item.currentlySatisfiedByNormativeAuthority === false,
    ) &&
    i233.allRequirementsMandatory &&
    i233.allRequirementsCurrentlyUnsatisfiedByNormativeAuthority &&
    i233.requirementsFrozenProspectively &&
    i233.requirementsReviewControlCount === 15 &&
    i233.requirementsReviewControlIds.length === I233_REQUIREMENTS_REVIEW_CONTROL_IDS.length &&
    i233.requirementsReviewControlIds.every(
      (id, index) => id === I233_REQUIREMENTS_REVIEW_CONTROL_IDS[index],
    ) &&
    i233.requirementsReviewControlsFrozen &&
    i233.candidateDiscoveryReadinessReviewAuthorized &&
    i233.candidateDiscoveryExecutedByThisGate === false &&
    i233.competingRelationSettlementResolved === false &&
    i233.crossRelationPrecedenceAuthorized === false &&
    i233.multiTouchAggregationAuthorized === false &&
    i233.hiddenStemI232HoldPreserved &&
    i233.hiddenStemTrackReopenedByThisGate === false &&
    i233.quWei2001HoldPreserved &&
    i233.li1998SameTargetPathSuspendedNotRetired &&
    i233.I132IndependentNormativeProvenanceRequirementRemainsNormative &&
    i233.I132PolicyRelaxationAuthorizedByThisGate === false &&
    i233.currentV2PackageAndCandidateSetRemainImmutable &&
    i233.currentV2ProvenanceDisposition === 'BLOCKED_UNDER_CURRENT_EVIDENCE' &&
    i233.actualCompositionPerformedByThisGate === false &&
    i233.multiSourceCompositionAuthorized === false &&
    i233.thresholdRuleCreatedByThisGate === false &&
    i233.damageEvaluationAuthorized === false &&
    i233.classificationAuthorized === false &&
    i233.numericScoringAuthorized === false &&
    i233.productionPolicyExecutionAuthorized === false &&
    i233.recommendedNextGate === 'COMPETING_RELATION_SETTLEMENT_AUTHORITY_DISCOVERY_READINESS_REVIEW'
  );
}

function finalized(
  material: Omit<I234ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityDiscoveryReadinessReviewReport, 'reviewId'>,
): I234ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityDiscoveryReadinessReviewReport {
  return {
    reviewId: `i234_competing_relation_settlement_discovery_readiness_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI234ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityDiscoveryReadinessReview(
  i233: I233ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityGapRequirementsReviewReport,
): I234ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityDiscoveryReadinessReviewReport {
  const accepted = exactI233Accepted(i233);
  return finalized({
    reviewVersion: I234_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_COMPETING_RELATION_SETTLEMENT_AUTHORITY_DISCOVERY_READINESS_REVIEW_VERSION,
    status: accepted
      ? 'RESOLVED_COMPETING_RELATION_SETTLEMENT_AUTHORITY_DISCOVERY_READINESS_REVIEW'
      : 'I233_REQUIREMENTS_BOUNDARY_INVALID',
    decision: accepted
      ? 'FIVE_COMPETING_RELATION_AUTHORITY_DISCOVERY_PATHS_SEVENTEEN_CONTROLS_FROZEN_NO_DISCOVERY_EXECUTED_NO_PRECEDENCE_AGGREGATION_OR_NET_EFFECT_AUTHORITY_ACQUIRED'
      : 'COMPETING_RELATION_SETTLEMENT_AUTHORITY_DISCOVERY_NOT_READY',
    upstreamI233ReviewId: i233.reviewId,
    exactI233BoundaryAccepted: accepted,
    targetScope: 'MULTIPLE_TRACKED_RELATION_TOUCHES_COMPETING_RELATION_SETTLEMENT',
    authorityGap: accepted ? 'COMPETING_RELATION_SETTLEMENT_AUTHORITY_NOT_ESTABLISHED' : 'UPSTREAM_INVALID',
    authorityGapClosed: false,
    I233RequirementIds: accepted ? I233_COMPETING_RELATION_SETTLEMENT_AUTHORITY_REQUIREMENT_IDS : [],
    I233RequirementCount: accepted ? 8 : 0,
    I233RequirementsFrozenAccepted: accepted,
    I233ControlIds: accepted ? I233_REQUIREMENTS_REVIEW_CONTROL_IDS : [],
    I233ControlCount: accepted ? 15 : 0,
    I233ControlsFrozenAccepted: accepted,
    discoveryPaths: accepted ? DISCOVERY_PATHS : [],
    discoveryPathCount: accepted ? 5 : 0,
    allDiscoveryPathsAuthorized: accepted,
    discoveryPathSetFrozen: accepted,
    discoveryControlIds: accepted ? I234_DISCOVERY_CONTROL_IDS : [],
    discoveryControlCount: accepted ? 17 : 0,
    discoveryControlsFrozen: accepted,
    discoveryAuthorized: accepted,
    discoveryExecutedByThisGate: false,
    directSourceTextRequiredForPositiveAuthorityFinding: accepted,
    exactSourceIdentityRequired: accepted,
    originalOrVerifiedSourceContextRequired: accepted,
    reproducibleLocatorRequired: accepted,
    searchSnippetMayEstablishPositiveAuthorityFinding: false,
    indexResultMayEstablishPositiveAuthorityFinding: false,
    workedExampleMayBecomeGeneralRuleWithoutRuleLanguage: false,
    genericRelationDescriptionMaySatisfyMultiRelationSettlementScope: false,
    clashLocalRelativeForceMayCreateCrossRelationPrecedence: false,
    combinationLocalBureauStateMayCreateCrossRelationPrecedence: false,
    relationTouchCountMayCreatePrecedence: false,
    pairOrderMayCreatePrecedence: false,
    numericWeightingAuthorized: false,
    majorityVoteAuthorized: false,
    sourceCountMayCreatePrecedence: false,
    crossSourceCompositionAuthorizedByThisGate: false,
    semanticBridgeInferenceAuthorizedByThisGate: false,
    competingRelationSettlementResolved: false,
    crossRelationPrecedenceAuthorized: false,
    multiTouchAggregationAuthorized: false,
    supportChannelActivationVerdictAuthorized: false,
    supportChannelPersistenceVerdictAuthorized: false,
    supportChannelDestructionVerdictAuthorized: false,
    supportChannelNetEffectVerdictAuthorized: false,
    targetPostRelationRootState: 'not_determined',
    effectiveMechanismForceVerdict: 'not_determined',
    hiddenStemI232HoldPreserved: accepted,
    hiddenStemTrackReopenedByThisGate: false,
    hiddenStemAuthorityGap: 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED',
    visibleStemBinaryEffectiveInteractionEligibilityResolved: false,
    quWei2001HoldPreserved: accepted,
    li1998SameTargetPathSuspendedNotRetired: accepted,
    I132IndependentNormativeProvenanceRequirementRemainsNormative: accepted,
    I132PolicyRelaxationAuthorizedByThisGate: false,
    currentV2PackageAndCandidateSetRemainImmutable: accepted,
    currentV2ProvenanceDisposition: accepted ? 'BLOCKED_UNDER_CURRENT_EVIDENCE' : 'NOT_ASSESSED',
    candidateSetMutatedByThisGate: false,
    evidenceRebindingAuthorizedByThisGate: false,
    provenanceIndependenceAdjudicatedByThisGate: false,
    actualCompositionPerformedByThisGate: false,
    multiSourceCompositionAuthorized: false,
    thresholdRuleCreatedByThisGate: false,
    damageEvaluationAuthorized: false,
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    productionPolicyExecutionAuthorized: false,
    recommendedNextGate: accepted
      ? 'COMPETING_RELATION_SETTLEMENT_AUTHORITY_DISCOVERY_EVIDENCE'
      : 'COMPETING_RELATION_SETTLEMENT_AUTHORITY_DISCOVERY_READINESS_REVIEW',
    notes: accepted
      ? Object.freeze([
          'I234 authorizes source discovery against the exact eight I233 competing-relation settlement requirements only; it does not authorize settlement, precedence, aggregation, or effect promotion.',
          'Five discovery paths separate general simultaneous-touch doctrine, clash-vs-combination interaction, combination-vs-combination competition, contextual exceptions, and tie/conflict/unresolved disposition.',
          'A positive finding requires direct source-bound text with exact identity, original or verified context, and reproducible locator; snippets and index results remain leads only.',
          'I232 hidden-stem HOLD remains closed to automated continuation and is not reopened by this independent I26-v24 substrate track.',
        ])
      : Object.freeze(['I233 competing-relation settlement requirements boundary was not accepted; discovery remains unauthorized.']),
  });
}
