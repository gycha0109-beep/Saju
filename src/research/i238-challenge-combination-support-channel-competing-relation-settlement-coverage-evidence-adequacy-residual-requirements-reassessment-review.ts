import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  type I237ChallengeCombinationSupportChannelCompetingRelationSettlementCandidateEvidenceAdequacyCoverageEvaluationEvidenceReport,
} from './i237-challenge-combination-support-channel-competing-relation-settlement-candidate-evidence-adequacy-coverage-evaluation-evidence.js';

export const I238_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_COMPETING_RELATION_SETTLEMENT_COVERAGE_EVIDENCE_ADEQUACY_RESIDUAL_REQUIREMENTS_REASSESSMENT_REVIEW_VERSION =
  'myeonghwa-challenge-combination-support-channel-competing-relation-settlement-coverage-evidence-adequacy-residual-requirements-reassessment-review-v1';

export const I238_RESIDUAL_REQUIREMENT_IDS = Object.freeze([
  'CURRENT_VS_COMPETING_ROLE_SCOPE_EXPLICIT',
  'PRECEDENCE_VS_RELATION_OUTCOME_SEPARATION',
  'TIE_CONFLICT_OR_UNRESOLVED_FAIL_CLOSED_DISPOSITION',
] as const);

export type I238ResidualRequirementId = (typeof I238_RESIDUAL_REQUIREMENT_IDS)[number];

export interface I238ChallengeCombinationSupportChannelCompetingRelationSettlementCoverageEvidenceAdequacyResidualRequirementsReassessmentReviewReport {
  reviewId: string;
  reviewVersion: string;
  status:
    | 'RESOLVED_COMPETING_RELATION_SETTLEMENT_COVERAGE_EVIDENCE_ADEQUACY_RESIDUAL_REQUIREMENTS_REASSESSMENT_REVIEW'
    | 'I237_COVERAGE_EVALUATION_BOUNDARY_INVALID';
  decision:
    | 'I237_EVIDENCE_ADEQUATE_THREE_SUBSTANTIVE_DIRECT_COVERAGE_RESIDUALS_IDENTIFIED_TARGETED_RULE_LEVEL_DISCOVERY_METHODOLOGICALLY_JUSTIFIED_NO_UNION_COVERAGE_NO_AUTHORITY_PROMOTION'
    | 'COMPETING_RELATION_SETTLEMENT_RESIDUAL_REQUIREMENTS_REASSESSMENT_NOT_EXECUTED';
  upstreamI237EvidenceId: string;
  exactI237BoundaryAccepted: boolean;
  targetScope: 'MULTIPLE_TRACKED_RELATION_TOUCHES_COMPETING_RELATION_SETTLEMENT';
  evidenceAdequacyAccepted: boolean;
  acceptedCandidateCount: 3 | 0;
  acceptedRequirementCount: 8 | 0;
  acceptedMatrixCellCount: 24 | 0;
  acceptedDirectCellCount: 15 | 0;
  acceptedPartialCellCount: 7 | 0;
  acceptedConflictCellCount: 0;
  acceptedNotEstablishedCellCount: 2 | 0;
  acceptedDirectRequirementClassCount: 5 | 0;
  acceptedFullEightRequirementCandidateCount: 0;
  residualRequirementIds: readonly I238ResidualRequirementId[];
  residualRequirementCount: 3 | 0;
  currentVsCompetingRoleScopeRemainsDirectlyUnestablished: boolean;
  precedenceVsRelationOutcomeSeparationRemainsDirectlyUnestablished: boolean;
  tieConflictOrUnresolvedFailClosedDispositionRemainsDirectlyUnestablished: boolean;
  previouslyDirectRequirementClassesNeedReDiscovery: false;
  existingPartialCoverageMayAutoUpgradeToDirect: false;
  existingCandidatesMayCrossCompleteResiduals: false;
  candidateSetUnionCoverageMaySatisfyResiduals: false;
  sameWorkOrCommentaryRelationshipMustRemainPreserved: boolean;
  materiallyTargetedRuleLevelDiscoveryMethodologicallyJustified: boolean;
  materiallyNewDirectPassageOrMateriallyNewSourceRequired: boolean;
  equivalentGeneralRelationExplanationCountsAsProgress: false;
  searchSnippetMayCreateDirectCoverage: false;
  targetedDiscoveryReadinessReviewAuthorized: boolean;
  discoveryExecutedByThisGate: false;
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
  sourceNormativeAdmissibilityAdjudicatedByThisGate: false;
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
    | 'COMPETING_RELATION_SETTLEMENT_THREE_RESIDUAL_REQUIREMENT_TARGETED_AUTHORITY_DISCOVERY_READINESS_REVIEW'
    | 'COMPETING_RELATION_SETTLEMENT_COVERAGE_EVIDENCE_ADEQUACY_RESIDUAL_REQUIREMENTS_REASSESSMENT_REVIEW';
  notes: readonly string[];
}

function exactI237Accepted(
  i237: I237ChallengeCombinationSupportChannelCompetingRelationSettlementCandidateEvidenceAdequacyCoverageEvaluationEvidenceReport,
): boolean {
  return (
    i237.status ===
      'RESOLVED_COMPETING_RELATION_SETTLEMENT_CANDIDATE_EVIDENCE_ADEQUACY_COVERAGE_EVALUATION_EVIDENCE' &&
    i237.decision ===
      'THREE_BY_EIGHT_CANDIDATE_LOCAL_MATRIX_EVALUATED_FIFTEEN_DIRECT_SEVEN_PARTIAL_ZERO_CONFLICT_TWO_NOT_ESTABLISHED_ZERO_FULL_COVERAGE_CANDIDATES_THREE_DIRECT_REQUIREMENT_GAPS_REMAIN_NO_UNION_COVERAGE_NO_AUTHORITY_PROMOTION' &&
    i237.exactI236AndI235BoundaryAccepted &&
    i237.coverageEvaluationExecuted &&
    i237.candidateCoverageRowCount === 3 &&
    i237.requirementCoverageInventoryRowCount === 8 &&
    i237.matrixCellCount === 24 &&
    i237.totalDirectCellCount === 15 &&
    i237.totalPartialCellCount === 7 &&
    i237.totalConflictCellCount === 0 &&
    i237.totalNotEstablishedCellCount === 2 &&
    i237.fullEightRequirementCandidateCount === 0 &&
    i237.anySingleCandidateFullEightRequirementCoverage === false &&
    i237.directCoverageRequirementClassCount === 5 &&
    i237.residualDirectCoverageGapRequirementCount === 3 &&
    i237.residualDirectCoverageGapRequirementIds.length === I238_RESIDUAL_REQUIREMENT_IDS.length &&
    i237.residualDirectCoverageGapRequirementIds.every(
      (id, index) => id === I238_RESIDUAL_REQUIREMENT_IDS[index],
    ) &&
    i237.requirementThreeCoverageDisposition === 'PARTIAL_IN_ALL_THREE_CANDIDATES' &&
    i237.requirementFiveCoverageDisposition === 'PARTIAL_IN_ALL_THREE_CANDIDATES' &&
    i237.requirementSevenCoverageDisposition === 'PARTIAL_IN_ONE_NOT_ESTABLISHED_IN_TWO' &&
    i237.candidateSetUnionCoveragePerformed === false &&
    i237.candidateSetUnionMaySatisfyEightRequirements === false &&
    i237.crossSourceCompositionPerformedByThisGate === false &&
    i237.semanticBridgeInferencePerformedByThisGate === false &&
    i237.majorityVotePerformedByThisGate === false &&
    i237.sameWorkOrCommentaryRelationshipPreserved &&
    i237.coverageAdequacyMayAutoPromoteAuthority === false &&
    i237.authorityGap === 'COMPETING_RELATION_SETTLEMENT_AUTHORITY_NOT_ESTABLISHED' &&
    i237.authorityGapClosed === false &&
    i237.competingRelationSettlementResolved === false &&
    i237.crossRelationPrecedenceAuthorized === false &&
    i237.multiTouchAggregationAuthorized === false &&
    i237.hiddenStemI232HoldPreserved &&
    i237.hiddenStemTrackReopenedByThisGate === false &&
    i237.quWei2001HoldPreserved &&
    i237.li1998SameTargetPathSuspendedNotRetired &&
    i237.I132IndependentNormativeProvenanceRequirementRemainsNormative &&
    i237.I132PolicyRelaxationAuthorizedByThisGate === false &&
    i237.currentV2PackageAndCandidateSetRemainImmutable &&
    i237.currentV2ProvenanceDisposition === 'BLOCKED_UNDER_CURRENT_EVIDENCE' &&
    i237.evidenceRebindingAuthorizedByThisGate === false &&
    i237.actualCompositionPerformedByThisGate === false &&
    i237.multiSourceCompositionAuthorized === false &&
    i237.thresholdRuleCreatedByThisGate === false &&
    i237.damageEvaluationAuthorized === false &&
    i237.classificationAuthorized === false &&
    i237.numericScoringAuthorized === false &&
    i237.productionPolicyExecutionAuthorized === false &&
    i237.recommendedNextGate ===
      'COMPETING_RELATION_SETTLEMENT_COVERAGE_EVIDENCE_ADEQUACY_RESIDUAL_REQUIREMENTS_REASSESSMENT_REVIEW'
  );
}

function finalized(
  material: Omit<
    I238ChallengeCombinationSupportChannelCompetingRelationSettlementCoverageEvidenceAdequacyResidualRequirementsReassessmentReviewReport,
    'reviewId'
  >,
): I238ChallengeCombinationSupportChannelCompetingRelationSettlementCoverageEvidenceAdequacyResidualRequirementsReassessmentReviewReport {
  return {
    reviewId: `i238_competing_relation_residual_reassessment_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI238ChallengeCombinationSupportChannelCompetingRelationSettlementCoverageEvidenceAdequacyResidualRequirementsReassessmentReview(
  i237: I237ChallengeCombinationSupportChannelCompetingRelationSettlementCandidateEvidenceAdequacyCoverageEvaluationEvidenceReport,
): I238ChallengeCombinationSupportChannelCompetingRelationSettlementCoverageEvidenceAdequacyResidualRequirementsReassessmentReviewReport {
  const accepted = exactI237Accepted(i237);
  return finalized({
    reviewVersion:
      I238_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_COMPETING_RELATION_SETTLEMENT_COVERAGE_EVIDENCE_ADEQUACY_RESIDUAL_REQUIREMENTS_REASSESSMENT_REVIEW_VERSION,
    status: accepted
      ? 'RESOLVED_COMPETING_RELATION_SETTLEMENT_COVERAGE_EVIDENCE_ADEQUACY_RESIDUAL_REQUIREMENTS_REASSESSMENT_REVIEW'
      : 'I237_COVERAGE_EVALUATION_BOUNDARY_INVALID',
    decision: accepted
      ? 'I237_EVIDENCE_ADEQUATE_THREE_SUBSTANTIVE_DIRECT_COVERAGE_RESIDUALS_IDENTIFIED_TARGETED_RULE_LEVEL_DISCOVERY_METHODOLOGICALLY_JUSTIFIED_NO_UNION_COVERAGE_NO_AUTHORITY_PROMOTION'
      : 'COMPETING_RELATION_SETTLEMENT_RESIDUAL_REQUIREMENTS_REASSESSMENT_NOT_EXECUTED',
    upstreamI237EvidenceId: i237.evidenceId,
    exactI237BoundaryAccepted: accepted,
    targetScope: 'MULTIPLE_TRACKED_RELATION_TOUCHES_COMPETING_RELATION_SETTLEMENT',
    evidenceAdequacyAccepted: accepted,
    acceptedCandidateCount: accepted ? 3 : 0,
    acceptedRequirementCount: accepted ? 8 : 0,
    acceptedMatrixCellCount: accepted ? 24 : 0,
    acceptedDirectCellCount: accepted ? 15 : 0,
    acceptedPartialCellCount: accepted ? 7 : 0,
    acceptedConflictCellCount: 0,
    acceptedNotEstablishedCellCount: accepted ? 2 : 0,
    acceptedDirectRequirementClassCount: accepted ? 5 : 0,
    acceptedFullEightRequirementCandidateCount: 0,
    residualRequirementIds: accepted ? I238_RESIDUAL_REQUIREMENT_IDS : Object.freeze([]),
    residualRequirementCount: accepted ? 3 : 0,
    currentVsCompetingRoleScopeRemainsDirectlyUnestablished: accepted,
    precedenceVsRelationOutcomeSeparationRemainsDirectlyUnestablished: accepted,
    tieConflictOrUnresolvedFailClosedDispositionRemainsDirectlyUnestablished: accepted,
    previouslyDirectRequirementClassesNeedReDiscovery: false,
    existingPartialCoverageMayAutoUpgradeToDirect: false,
    existingCandidatesMayCrossCompleteResiduals: false,
    candidateSetUnionCoverageMaySatisfyResiduals: false,
    sameWorkOrCommentaryRelationshipMustRemainPreserved: accepted,
    materiallyTargetedRuleLevelDiscoveryMethodologicallyJustified: accepted,
    materiallyNewDirectPassageOrMateriallyNewSourceRequired: accepted,
    equivalentGeneralRelationExplanationCountsAsProgress: false,
    searchSnippetMayCreateDirectCoverage: false,
    targetedDiscoveryReadinessReviewAuthorized: accepted,
    discoveryExecutedByThisGate: false,
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
    sourceNormativeAdmissibilityAdjudicatedByThisGate: false,
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
      ? 'COMPETING_RELATION_SETTLEMENT_THREE_RESIDUAL_REQUIREMENT_TARGETED_AUTHORITY_DISCOVERY_READINESS_REVIEW'
      : 'COMPETING_RELATION_SETTLEMENT_COVERAGE_EVIDENCE_ADEQUACY_RESIDUAL_REQUIREMENTS_REASSESSMENT_REVIEW',
    notes: accepted
      ? Object.freeze([
          'I237 is adequate to establish that five of eight requirement classes have direct candidate-local support while three direct requirement gaps remain.',
          'The three residuals are current-versus-competing role scope, precedence-versus-relation-outcome separation, and explicit fail-closed handling for tie, conflict, or unresolved cases.',
          'Previously direct requirement classes are not reopened. Existing PARTIAL cells cannot auto-upgrade, cross-complete, or be unioned into authority.',
          'A materially targeted rule-level discovery pass is justified only for the three residuals and must preserve all I232, I132, Qu Wei, Li 1998, and v2 guards.',
        ])
      : Object.freeze(['I238 fails closed unless the exact I237 candidate-local coverage evaluation boundary is preserved.']),
  });
}
