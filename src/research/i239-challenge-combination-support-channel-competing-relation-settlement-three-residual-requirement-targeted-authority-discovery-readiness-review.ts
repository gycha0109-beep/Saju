import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  I238_RESIDUAL_REQUIREMENT_IDS,
  type I238ChallengeCombinationSupportChannelCompetingRelationSettlementCoverageEvidenceAdequacyResidualRequirementsReassessmentReviewReport,
} from './i238-challenge-combination-support-channel-competing-relation-settlement-coverage-evidence-adequacy-residual-requirements-reassessment-review.js';

export const I239_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_COMPETING_RELATION_SETTLEMENT_THREE_RESIDUAL_REQUIREMENT_TARGETED_AUTHORITY_DISCOVERY_READINESS_REVIEW_VERSION =
  'myeonghwa-challenge-combination-support-channel-competing-relation-settlement-three-residual-requirement-targeted-authority-discovery-readiness-review-v1';

export const I239_TARGETED_DISCOVERY_PATH_IDS = Object.freeze([
  'SYSTEM_ROLE_MAPPING_CURRENT_VS_COMPETING_DIRECT_RULE_SEARCH',
  'PRECEDENCE_OPERATION_VS_RELATION_OUTCOME_SEPARATION_DIRECT_RULE_SEARCH',
  'TIE_CONFLICT_UNRESOLVED_FAIL_CLOSED_DIRECT_RULE_SEARCH',
  'SAME_WORK_CHAPTER_OR_COMMENTARY_TARGETED_CROSS_CHECK',
  'INDEPENDENT_RULE_LEVEL_SOURCE_TARGETED_RESIDUAL_SEARCH',
] as const);
export type I239TargetedDiscoveryPathId = (typeof I239_TARGETED_DISCOVERY_PATH_IDS)[number];

export const I239_TARGETED_DISCOVERY_CONTROL_IDS = Object.freeze([
  'EXACT_I238_THREE_RESIDUAL_BOUNDARY_REQUIRED',
  'ONLY_THREE_I238_RESIDUAL_REQUIREMENTS_MAY_BE_TARGETED',
  'FIVE_ALREADY_DIRECT_REQUIREMENT_CLASSES_MUST_NOT_BE_REOPENED',
  'SOURCE_BOUND_DIRECT_RULE_TEXT_REQUIRED_FOR_DIRECT_COVERAGE',
  'CURRENT_VS_COMPETING_ROLE_MAPPING_MUST_BE_EXPLICIT_NOT_EXAMPLE_INFERRED',
  'PRECEDENCE_OPERATION_MUST_BE_DISTINGUISHED_FROM_RELATION_OUTCOME_STATE',
  'TIE_CONFLICT_OR_UNRESOLVED_DISPOSITION_MUST_BE_EXPLICIT_NOT_INFERRED_FROM_SILENCE',
  'FAIL_CLOSED_EQUIVALENT_MUST_PRESERVE_NON_DECISION_OR_BOUNDED_DEFERRED_DISPOSITION',
  'GENERAL_COMBINATION_CLASH_EXPLANATION_MUST_NOT_COUNT_AS_RESIDUAL_PROGRESS',
  'SEARCH_SNIPPET_OR_INDEX_ONLY_MATERIAL_IS_LEAD_ONLY',
  'SAME_WORK_AND_COMMENTARY_RELATIONSHIP_MUST_REMAIN_PRESERVED',
  'DERIVATIVE_OR_PROVENANCE_INDEPENDENCE_ADJUDICATION_FORBIDDEN',
  'CANDIDATE_SET_UNION_OR_CROSS_SOURCE_COMPLETION_FORBIDDEN',
  'PARTIAL_CELL_AUTO_UPGRADE_TO_DIRECT_FORBIDDEN',
  'READINESS_GATE_MUST_NOT_CLOSE_AUTHORITY_GAP_OR_PROMOTE_SETTLEMENT',
  'I232_I132_QU_WEI_LI_V2_GUARDS_REMAIN_UNCHANGED',
  'NO_THRESHOLD_DAMAGE_CLASSIFICATION_SCORING_OR_PRODUCTION_AUTHORITY',
  'NO_NEGATIVE_OR_EXHAUSTION_FINDING_FROM_DISCOVERY_SILENCE_OR_ACCESS_FAILURE',
] as const);
export type I239TargetedDiscoveryControlId = (typeof I239_TARGETED_DISCOVERY_CONTROL_IDS)[number];

export interface I239ChallengeCombinationSupportChannelCompetingRelationSettlementThreeResidualRequirementTargetedAuthorityDiscoveryReadinessReviewReport {
  reviewId: string;
  reviewVersion: string;
  status:
    | 'RESOLVED_COMPETING_RELATION_SETTLEMENT_THREE_RESIDUAL_REQUIREMENT_TARGETED_AUTHORITY_DISCOVERY_READINESS_REVIEW'
    | 'I238_RESIDUAL_REASSESSMENT_BOUNDARY_INVALID';
  decision:
    | 'THREE_RESIDUAL_REQUIREMENTS_FIVE_TARGETED_DISCOVERY_PATHS_EIGHTEEN_CONTROLS_FROZEN_DIRECT_RULE_LEVEL_EVIDENCE_ONLY_NO_DISCOVERY_EXECUTED_NO_AUTHORITY_PROMOTION'
    | 'COMPETING_RELATION_SETTLEMENT_THREE_RESIDUAL_TARGETED_DISCOVERY_NOT_READY';
  upstreamI238ReviewId: string;
  exactI238BoundaryAccepted: boolean;
  targetScope: 'MULTIPLE_TRACKED_RELATION_TOUCHES_COMPETING_RELATION_SETTLEMENT';
  residualRequirementIds: readonly string[];
  residualRequirementCount: 3 | 0;
  discoveryPathIds: readonly I239TargetedDiscoveryPathId[];
  discoveryPathCount: 5 | 0;
  discoveryControlIds: readonly I239TargetedDiscoveryControlId[];
  discoveryControlCount: 18 | 0;
  discoveryContractFrozen: boolean;
  targetedDiscoveryAuthorized: boolean;
  discoveryExecutedByThisGate: false;
  currentVsCompetingRoleMappingDirectRuleRequired: boolean;
  currentVsCompetingRoleMappingMayBeInferredFromExample: false;
  precedenceOperationVsOutcomeSeparationDirectRuleRequired: boolean;
  precedenceAndOutcomeMayBeCollapsedByInference: false;
  tieConflictUnresolvedExplicitDispositionRequired: boolean;
  silenceMayEstablishFailClosedDisposition: false;
  boundedDeferredOrNonDecisionEquivalentMayQualifyIfExplicit: boolean;
  generalCombinationClashExplanationMayCountAsProgress: false;
  searchSnippetMayCreateDirectCoverage: false;
  sameWorkOrCommentaryTargetedCrossCheckAuthorized: boolean;
  independentRuleLevelSourceSearchAuthorized: boolean;
  fiveAlreadyDirectRequirementClassesReopened: false;
  existingPartialCoverageMayAutoUpgradeToDirect: false;
  candidateSetUnionCoverageAuthorized: false;
  crossSourceCompletionAuthorized: false;
  authorityGap: 'COMPETING_RELATION_SETTLEMENT_AUTHORITY_NOT_ESTABLISHED' | 'UPSTREAM_INVALID';
  authorityGapClosed: false;
  authorityPromotedByThisGate: false;
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
  quWei2001HoldPreserved: boolean;
  li1998SameTargetPathSuspendedNotRetired: boolean;
  I132IndependentNormativeProvenanceRequirementRemainsNormative: boolean;
  I132PolicyRelaxationAuthorizedByThisGate: false;
  currentV2PackageAndCandidateSetRemainImmutable: boolean;
  currentV2ProvenanceDisposition: 'BLOCKED_UNDER_CURRENT_EVIDENCE' | 'NOT_ASSESSED';
  candidateRegisteredByThisGate: false;
  candidateSelectedByThisGate: false;
  candidateSetMutatedByThisGate: false;
  evidenceRebindingAuthorizedByThisGate: false;
  provenanceIndependenceAdjudicatedByThisGate: false;
  derivativeRelationshipAdjudicatedByThisGate: false;
  actualCompositionPerformedByThisGate: false;
  multiSourceCompositionAuthorized: false;
  thresholdRuleCreatedByThisGate: false;
  damageEvaluationAuthorized: false;
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  productionPolicyExecutionAuthorized: false;
  negativeFindingCreatedByThisGate: false;
  discoveryExhaustionClaimed: false;
  corpusExhaustionClaimed: false;
  recommendedNextGate:
    | 'COMPETING_RELATION_SETTLEMENT_THREE_RESIDUAL_REQUIREMENT_TARGETED_AUTHORITY_DISCOVERY_EVIDENCE'
    | 'COMPETING_RELATION_SETTLEMENT_THREE_RESIDUAL_REQUIREMENT_TARGETED_AUTHORITY_DISCOVERY_READINESS_REVIEW';
  notes: readonly string[];
}

function exactI238Accepted(
  i238: I238ChallengeCombinationSupportChannelCompetingRelationSettlementCoverageEvidenceAdequacyResidualRequirementsReassessmentReviewReport,
): boolean {
  return (
    i238.status ===
      'RESOLVED_COMPETING_RELATION_SETTLEMENT_COVERAGE_EVIDENCE_ADEQUACY_RESIDUAL_REQUIREMENTS_REASSESSMENT_REVIEW' &&
    i238.decision ===
      'I237_EVIDENCE_ADEQUATE_THREE_SUBSTANTIVE_DIRECT_COVERAGE_RESIDUALS_IDENTIFIED_TARGETED_RULE_LEVEL_DISCOVERY_METHODOLOGICALLY_JUSTIFIED_NO_UNION_COVERAGE_NO_AUTHORITY_PROMOTION' &&
    i238.exactI237BoundaryAccepted &&
    i238.evidenceAdequacyAccepted &&
    i238.acceptedCandidateCount === 3 &&
    i238.acceptedRequirementCount === 8 &&
    i238.acceptedMatrixCellCount === 24 &&
    i238.acceptedDirectCellCount === 15 &&
    i238.acceptedPartialCellCount === 7 &&
    i238.acceptedConflictCellCount === 0 &&
    i238.acceptedNotEstablishedCellCount === 2 &&
    i238.acceptedDirectRequirementClassCount === 5 &&
    i238.acceptedFullEightRequirementCandidateCount === 0 &&
    i238.residualRequirementCount === 3 &&
    i238.residualRequirementIds.length === I238_RESIDUAL_REQUIREMENT_IDS.length &&
    i238.residualRequirementIds.every((id, index) => id === I238_RESIDUAL_REQUIREMENT_IDS[index]) &&
    i238.currentVsCompetingRoleScopeRemainsDirectlyUnestablished &&
    i238.precedenceVsRelationOutcomeSeparationRemainsDirectlyUnestablished &&
    i238.tieConflictOrUnresolvedFailClosedDispositionRemainsDirectlyUnestablished &&
    i238.previouslyDirectRequirementClassesNeedReDiscovery === false &&
    i238.existingPartialCoverageMayAutoUpgradeToDirect === false &&
    i238.existingCandidatesMayCrossCompleteResiduals === false &&
    i238.candidateSetUnionCoverageMaySatisfyResiduals === false &&
    i238.materiallyTargetedRuleLevelDiscoveryMethodologicallyJustified &&
    i238.materiallyNewDirectPassageOrMateriallyNewSourceRequired &&
    i238.equivalentGeneralRelationExplanationCountsAsProgress === false &&
    i238.searchSnippetMayCreateDirectCoverage === false &&
    i238.targetedDiscoveryReadinessReviewAuthorized &&
    i238.discoveryExecutedByThisGate === false &&
    i238.authorityGap === 'COMPETING_RELATION_SETTLEMENT_AUTHORITY_NOT_ESTABLISHED' &&
    i238.authorityGapClosed === false &&
    i238.authorityPromotedByThisGate === false &&
    i238.competingRelationSettlementResolved === false &&
    i238.hiddenStemI232HoldPreserved &&
    i238.hiddenStemTrackReopenedByThisGate === false &&
    i238.quWei2001HoldPreserved &&
    i238.li1998SameTargetPathSuspendedNotRetired &&
    i238.I132IndependentNormativeProvenanceRequirementRemainsNormative &&
    i238.I132PolicyRelaxationAuthorizedByThisGate === false &&
    i238.currentV2PackageAndCandidateSetRemainImmutable &&
    i238.currentV2ProvenanceDisposition === 'BLOCKED_UNDER_CURRENT_EVIDENCE' &&
    i238.evidenceRebindingAuthorizedByThisGate === false &&
    i238.actualCompositionPerformedByThisGate === false &&
    i238.multiSourceCompositionAuthorized === false &&
    i238.thresholdRuleCreatedByThisGate === false &&
    i238.damageEvaluationAuthorized === false &&
    i238.classificationAuthorized === false &&
    i238.numericScoringAuthorized === false &&
    i238.productionPolicyExecutionAuthorized === false &&
    i238.negativeFindingCreatedByThisGate === false &&
    i238.discoveryExhaustionClaimed === false &&
    i238.corpusExhaustionClaimed === false &&
    i238.recommendedNextGate ===
      'COMPETING_RELATION_SETTLEMENT_THREE_RESIDUAL_REQUIREMENT_TARGETED_AUTHORITY_DISCOVERY_READINESS_REVIEW'
  );
}

function finalized(
  material: Omit<
    I239ChallengeCombinationSupportChannelCompetingRelationSettlementThreeResidualRequirementTargetedAuthorityDiscoveryReadinessReviewReport,
    'reviewId'
  >,
): I239ChallengeCombinationSupportChannelCompetingRelationSettlementThreeResidualRequirementTargetedAuthorityDiscoveryReadinessReviewReport {
  return {
    reviewId: `i239_competing_relation_three_residual_discovery_readiness_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI239ChallengeCombinationSupportChannelCompetingRelationSettlementThreeResidualRequirementTargetedAuthorityDiscoveryReadinessReview(
  i238: I238ChallengeCombinationSupportChannelCompetingRelationSettlementCoverageEvidenceAdequacyResidualRequirementsReassessmentReviewReport,
): I239ChallengeCombinationSupportChannelCompetingRelationSettlementThreeResidualRequirementTargetedAuthorityDiscoveryReadinessReviewReport {
  const accepted = exactI238Accepted(i238);
  return finalized({
    reviewVersion:
      I239_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_COMPETING_RELATION_SETTLEMENT_THREE_RESIDUAL_REQUIREMENT_TARGETED_AUTHORITY_DISCOVERY_READINESS_REVIEW_VERSION,
    status: accepted
      ? 'RESOLVED_COMPETING_RELATION_SETTLEMENT_THREE_RESIDUAL_REQUIREMENT_TARGETED_AUTHORITY_DISCOVERY_READINESS_REVIEW'
      : 'I238_RESIDUAL_REASSESSMENT_BOUNDARY_INVALID',
    decision: accepted
      ? 'THREE_RESIDUAL_REQUIREMENTS_FIVE_TARGETED_DISCOVERY_PATHS_EIGHTEEN_CONTROLS_FROZEN_DIRECT_RULE_LEVEL_EVIDENCE_ONLY_NO_DISCOVERY_EXECUTED_NO_AUTHORITY_PROMOTION'
      : 'COMPETING_RELATION_SETTLEMENT_THREE_RESIDUAL_TARGETED_DISCOVERY_NOT_READY',
    upstreamI238ReviewId: i238.reviewId,
    exactI238BoundaryAccepted: accepted,
    targetScope: 'MULTIPLE_TRACKED_RELATION_TOUCHES_COMPETING_RELATION_SETTLEMENT',
    residualRequirementIds: accepted ? I238_RESIDUAL_REQUIREMENT_IDS : Object.freeze([]),
    residualRequirementCount: accepted ? 3 : 0,
    discoveryPathIds: accepted ? I239_TARGETED_DISCOVERY_PATH_IDS : Object.freeze([]),
    discoveryPathCount: accepted ? 5 : 0,
    discoveryControlIds: accepted ? I239_TARGETED_DISCOVERY_CONTROL_IDS : Object.freeze([]),
    discoveryControlCount: accepted ? 18 : 0,
    discoveryContractFrozen: accepted,
    targetedDiscoveryAuthorized: accepted,
    discoveryExecutedByThisGate: false,
    currentVsCompetingRoleMappingDirectRuleRequired: accepted,
    currentVsCompetingRoleMappingMayBeInferredFromExample: false,
    precedenceOperationVsOutcomeSeparationDirectRuleRequired: accepted,
    precedenceAndOutcomeMayBeCollapsedByInference: false,
    tieConflictUnresolvedExplicitDispositionRequired: accepted,
    silenceMayEstablishFailClosedDisposition: false,
    boundedDeferredOrNonDecisionEquivalentMayQualifyIfExplicit: accepted,
    generalCombinationClashExplanationMayCountAsProgress: false,
    searchSnippetMayCreateDirectCoverage: false,
    sameWorkOrCommentaryTargetedCrossCheckAuthorized: accepted,
    independentRuleLevelSourceSearchAuthorized: accepted,
    fiveAlreadyDirectRequirementClassesReopened: false,
    existingPartialCoverageMayAutoUpgradeToDirect: false,
    candidateSetUnionCoverageAuthorized: false,
    crossSourceCompletionAuthorized: false,
    authorityGap: accepted ? 'COMPETING_RELATION_SETTLEMENT_AUTHORITY_NOT_ESTABLISHED' : 'UPSTREAM_INVALID',
    authorityGapClosed: false,
    authorityPromotedByThisGate: false,
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
    quWei2001HoldPreserved: accepted,
    li1998SameTargetPathSuspendedNotRetired: accepted,
    I132IndependentNormativeProvenanceRequirementRemainsNormative: accepted,
    I132PolicyRelaxationAuthorizedByThisGate: false,
    currentV2PackageAndCandidateSetRemainImmutable: accepted,
    currentV2ProvenanceDisposition: accepted ? 'BLOCKED_UNDER_CURRENT_EVIDENCE' : 'NOT_ASSESSED',
    candidateRegisteredByThisGate: false,
    candidateSelectedByThisGate: false,
    candidateSetMutatedByThisGate: false,
    evidenceRebindingAuthorizedByThisGate: false,
    provenanceIndependenceAdjudicatedByThisGate: false,
    derivativeRelationshipAdjudicatedByThisGate: false,
    actualCompositionPerformedByThisGate: false,
    multiSourceCompositionAuthorized: false,
    thresholdRuleCreatedByThisGate: false,
    damageEvaluationAuthorized: false,
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    productionPolicyExecutionAuthorized: false,
    negativeFindingCreatedByThisGate: false,
    discoveryExhaustionClaimed: false,
    corpusExhaustionClaimed: false,
    recommendedNextGate: accepted
      ? 'COMPETING_RELATION_SETTLEMENT_THREE_RESIDUAL_REQUIREMENT_TARGETED_AUTHORITY_DISCOVERY_EVIDENCE'
      : 'COMPETING_RELATION_SETTLEMENT_THREE_RESIDUAL_REQUIREMENT_TARGETED_AUTHORITY_DISCOVERY_READINESS_REVIEW',
    notes: accepted
      ? Object.freeze([
          'I239 narrows discovery to the three I238 residual direct-coverage gaps and does not reopen the five already-direct requirement classes.',
          'Role mapping must be explicit, precedence operation must be separated from relation outcome, and tie/conflict/unresolved handling must carry an explicit bounded disposition.',
          'Generic combination/clash explanations and search snippets are insufficient for direct residual coverage.',
          'The same-work/commentary relationship may be inspected for targeted passages but remains non-independent unless a later exact provenance gate adjudicates otherwise.',
        ])
      : Object.freeze(['I239 fails closed unless the exact I238 three-residual reassessment boundary is preserved.']),
  });
}
