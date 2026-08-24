import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { I233_COMPETING_RELATION_SETTLEMENT_AUTHORITY_REQUIREMENT_IDS } from './i233-challenge-combination-support-channel-competing-relation-settlement-authority-gap-requirements-review.js';
import {
  I235_DIRECT_COVERAGE_GAP_REQUIREMENT_IDS,
  I235_DISCOVERY_CANDIDATE_IDS,
  type I235ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityDiscoveryEvidenceReport,
} from './i235-challenge-combination-support-channel-competing-relation-settlement-authority-discovery-evidence.js';

export const I236_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_COMPETING_RELATION_SETTLEMENT_CANDIDATE_EVIDENCE_ADEQUACY_COVERAGE_EVALUATION_READINESS_REVIEW_VERSION =
  'myeonghwa-challenge-combination-support-channel-competing-relation-settlement-candidate-evidence-adequacy-coverage-evaluation-readiness-review-v1';

export const I236_COVERAGE_STATE_VOCABULARY = Object.freeze([
  'DIRECT',
  'PARTIAL',
  'CONFLICT',
  'NOT_ESTABLISHED',
] as const);

export const I236_COVERAGE_EVALUATION_CONTROL_IDS = Object.freeze([
  'EXACT_I235_DISCOVERY_EVIDENCE_BOUNDARY_REQUIRED',
  'EXACTLY_THREE_I235_DIRECT_SOURCE_BOUND_CANDIDATES_ENTER_MATRIX',
  'EXACTLY_EIGHT_I233_REQUIREMENT_CELLS_PER_CANDIDATE_REQUIRED',
  'EACH_MATRIX_CELL_MUST_REMAIN_CANDIDATE_LOCAL',
  'DIRECT_PARTIAL_CONFLICT_NOT_ESTABLISHED_STATES_MUST_REMAIN_DISTINCT',
  'NO_CANDIDATE_SET_UNION_OR_SYNTHETIC_EIGHT_OF_EIGHT_COVERAGE',
  'SAME_WORK_OR_COMMENTARY_RELATIONSHIP_MUST_REMAIN_VISIBLE',
  'DERIVATIVE_RELATIONSHIP_MUST_NOT_BE_ADJUDICATED_AS_INDEPENDENT_AUTHORITY',
  'REQUIREMENT_THREE_ENGINE_ROLE_MAPPING_MUST_NOT_BE_INFERRED_FROM_TEXTUAL_PARTICIPANTS',
  'REQUIREMENT_FIVE_ORDERING_OUTCOME_SEPARATION_MUST_REQUIRE_EXPLICIT_LANGUAGE',
  'REQUIREMENT_SEVEN_FAIL_CLOSED_DISPOSITION_MUST_REQUIRE_EXPLICIT_LANGUAGE',
  'SOURCE_IDENTITY_CONTEXT_AND_LOCATOR_REMAINS_OWN_REQUIREMENT',
  'WORKED_EXAMPLES_MUST_NOT_UPGRADE_PARTIAL_TO_DIRECT_WITHOUT_RULE_LANGUAGE',
  'FIVE_OF_EIGHT_DIRECT_INVENTORY_MUST_NOT_AUTO_CLOSE_THREE_DIRECT_GAPS',
  'EIGHT_OF_EIGHT_CANDIDATE_LOCAL_COVERAGE_MUST_NOT_AUTO_PROMOTE_AUTHORITY',
  'NO_CROSS_SOURCE_COMPOSITION_SEMANTIC_BRIDGE_OR_MAJORITY_VOTE',
  'I232_I132_QU_WEI_LI_V2_GUARDS_REMAIN_UNCHANGED',
  'NO_SETTLEMENT_PRECEDENCE_AGGREGATION_EFFECT_THRESHOLD_DAMAGE_CLASSIFICATION_SCORING_OR_PRODUCTION_AUTHORITY',
] as const);
export type I236CoverageEvaluationControlId = (typeof I236_COVERAGE_EVALUATION_CONTROL_IDS)[number];

export interface I236ChallengeCombinationSupportChannelCompetingRelationSettlementCandidateEvidenceAdequacyCoverageEvaluationReadinessReviewReport {
  reviewId: string;
  reviewVersion: string;
  status:
    | 'RESOLVED_COMPETING_RELATION_SETTLEMENT_CANDIDATE_EVIDENCE_ADEQUACY_COVERAGE_EVALUATION_READINESS_REVIEW'
    | 'I235_DISCOVERY_EVIDENCE_BOUNDARY_INVALID';
  decision:
    | 'THREE_CANDIDATE_BY_EIGHT_REQUIREMENT_CANDIDATE_LOCAL_COVERAGE_MATRIX_FROZEN_EIGHTEEN_CONTROLS_THREE_DIRECT_GAPS_PRESERVED_NO_UNION_COVERAGE_NO_AUTHORITY_PROMOTION'
    | 'COMPETING_RELATION_SETTLEMENT_CANDIDATE_COVERAGE_EVALUATION_NOT_READY';
  upstreamI235EvidenceId: string;
  exactI235BoundaryAccepted: boolean;
  targetScope: 'MULTIPLE_TRACKED_RELATION_TOUCHES_COMPETING_RELATION_SETTLEMENT';
  authorityGap: 'COMPETING_RELATION_SETTLEMENT_AUTHORITY_NOT_ESTABLISHED' | 'UPSTREAM_INVALID';
  authorityGapClosed: false;
  evaluationCandidateIds: readonly string[];
  evaluationCandidateCount: 3 | 0;
  requirementIds: readonly string[];
  requirementCount: 8 | 0;
  matrixCellCount: 24 | 0;
  coverageStateVocabulary: typeof I236_COVERAGE_STATE_VOCABULARY | readonly [];
  candidateLocalEvaluationRequired: boolean;
  candidateSetUnionCoverageAuthorized: false;
  candidateSetUnionMaySatisfyEightRequirements: false;
  candidateLocalEightOfEightRequiredForFullCoverageFinding: boolean;
  sameWorkOrCommentaryRelationshipPreserved: boolean;
  provenanceIndependenceAdjudicationAuthorizedByThisGate: false;
  derivativeRelationshipAdjudicationAuthorizedByThisGate: false;
  sourceNormativeAdmissibilityAdjudicationAuthorizedByThisGate: false;
  directCoverageGapRequirementIds: readonly string[];
  directCoverageGapRequirementCount: 3 | 0;
  requirementThreeDirectCoverageMissingAccepted: boolean;
  requirementFiveDirectCoverageMissingAccepted: boolean;
  requirementSevenDirectCoverageMissingAccepted: boolean;
  fiveOfEightDirectInventoryAcceptedAsDiscoveryFindingOnly: boolean;
  partialMayAutoUpgradeToDirect: false;
  workedExampleMayAutoUpgradeToDirect: false;
  sourceIdentityContextLocatorEvaluatedSeparately: boolean;
  coverageEvaluationControlIds: readonly I236CoverageEvaluationControlId[];
  coverageEvaluationControlCount: 18 | 0;
  coverageEvaluationControlsFrozen: boolean;
  coverageEvaluationAuthorized: boolean;
  coverageEvaluationExecutedByThisGate: false;
  fullCoverageMayAutoPromoteAuthority: false;
  fullCoverageMayAutoCloseAuthorityGap: false;
  candidateRegistrationAuthorizedByThisGate: false;
  candidateSelectedByThisGate: false;
  candidateSetMutatedByThisGate: false;
  crossSourceCompositionAuthorizedByThisGate: false;
  semanticBridgeInferenceAuthorizedByThisGate: false;
  majorityVoteAuthorizedByThisGate: false;
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
  evidenceRebindingAuthorizedByThisGate: false;
  actualCompositionPerformedByThisGate: false;
  multiSourceCompositionAuthorized: false;
  thresholdRuleCreatedByThisGate: false;
  damageEvaluationAuthorized: false;
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  productionPolicyExecutionAuthorized: false;
  recommendedNextGate:
    | 'COMPETING_RELATION_SETTLEMENT_CANDIDATE_EVIDENCE_ADEQUACY_COVERAGE_EVALUATION_EVIDENCE'
    | 'COMPETING_RELATION_SETTLEMENT_CANDIDATE_EVIDENCE_ADEQUACY_COVERAGE_EVALUATION_READINESS_REVIEW';
  notes: readonly string[];
}

function exactI235Accepted(
  i235: I235ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityDiscoveryEvidenceReport,
): boolean {
  return (
    i235.status === 'RESOLVED_COMPETING_RELATION_SETTLEMENT_AUTHORITY_DISCOVERY_EVIDENCE' &&
    i235.decision ===
      'FIVE_DISCOVERY_PATHS_EXECUTED_THREE_DIRECT_SOURCE_BOUND_CANDIDATES_OBSERVED_MULTI_RELATION_AND_COMPETING_COMBINATION_RULE_TEXT_FOUND_NO_SINGLE_CANDIDATE_SATISFIES_ALL_EIGHT_REQUIREMENTS_THREE_REQUIREMENTS_LACK_ANY_DIRECT_CANDIDATE_COVERAGE_NO_PRECEDENCE_SETTLEMENT_OR_NET_EFFECT_PROMOTION' &&
    i235.exactI234BoundaryAccepted &&
    i235.discoveryExecuted &&
    i235.executedDiscoveryPathCount === 5 &&
    i235.I234ControlCountAccepted === 17 &&
    i235.candidateRecordCount === 3 &&
    i235.candidateRecords.length === I235_DISCOVERY_CANDIDATE_IDS.length &&
    i235.candidateRecords.every(
      (candidate, index) =>
        candidate.candidateId === I235_DISCOVERY_CANDIDATE_IDS[index] &&
        candidate.sourceBoundDirectTextObserved &&
        candidate.ruleLevelLanguageObserved &&
        candidate.requirementCoverage.length === I233_COMPETING_RELATION_SETTLEMENT_AUTHORITY_REQUIREMENT_IDS.length &&
        candidate.requirementCoverage.every(
          (cell, cellIndex) =>
            cell.requirementId === I233_COMPETING_RELATION_SETTLEMENT_AUTHORITY_REQUIREMENT_IDS[cellIndex],
        ) &&
        candidate.fullEightRequirementCoverage === false &&
        candidate.authorityPromotionAuthorizedByThisGate === false,
    ) &&
    i235.qualifyingDirectSourceBoundCandidateCount === 3 &&
    i235.fullEightRequirementCandidateCount === 0 &&
    i235.anySingleCandidateFullEightRequirementCoverage === false &&
    i235.directCoverageGapRequirementCount === 3 &&
    i235.directCoverageGapRequirementIds.length === I235_DIRECT_COVERAGE_GAP_REQUIREMENT_IDS.length &&
    i235.directCoverageGapRequirementIds.every(
      (id, index) => id === I235_DIRECT_COVERAGE_GAP_REQUIREMENT_IDS[index],
    ) &&
    i235.directCoverageEstablishedForFiveOfEightRequirements &&
    i235.explicitSystemCurrentVsCompetingRoleMappingEstablished === false &&
    i235.precedenceVsRelationOutcomeSeparationEstablished === false &&
    i235.tieConflictOrUnresolvedFailClosedDispositionEstablished === false &&
    i235.candidateSetUnionMayBeTreatedAsSingleAuthority === false &&
    i235.crossSourceCompositionAuthorizedByThisGate === false &&
    i235.semanticBridgeInferenceAuthorizedByThisGate === false &&
    i235.derivativeRelationshipAdjudicatedByThisGate === false &&
    i235.provenanceIndependenceAdjudicatedByThisGate === false &&
    i235.sourceNormativeAdmissibilityAdjudicatedByThisGate === false &&
    i235.candidateRegistrationAuthorizedByThisGate === false &&
    i235.candidateSelectedByThisGate === false &&
    i235.competingRelationSettlementResolved === false &&
    i235.crossRelationPrecedenceAuthorized === false &&
    i235.multiTouchAggregationAuthorized === false &&
    i235.hiddenStemI232HoldPreserved &&
    i235.hiddenStemTrackReopenedByThisGate === false &&
    i235.quWei2001HoldPreserved &&
    i235.li1998SameTargetPathSuspendedNotRetired &&
    i235.I132IndependentNormativeProvenanceRequirementRemainsNormative &&
    i235.I132PolicyRelaxationAuthorizedByThisGate === false &&
    i235.currentV2PackageAndCandidateSetRemainImmutable &&
    i235.currentV2ProvenanceDisposition === 'BLOCKED_UNDER_CURRENT_EVIDENCE' &&
    i235.actualCompositionPerformedByThisGate === false &&
    i235.multiSourceCompositionAuthorized === false &&
    i235.thresholdRuleCreatedByThisGate === false &&
    i235.damageEvaluationAuthorized === false &&
    i235.classificationAuthorized === false &&
    i235.numericScoringAuthorized === false &&
    i235.productionPolicyExecutionAuthorized === false &&
    i235.recommendedNextGate ===
      'COMPETING_RELATION_SETTLEMENT_CANDIDATE_EVIDENCE_ADEQUACY_COVERAGE_EVALUATION_READINESS_REVIEW'
  );
}

function finalized(
  material: Omit<
    I236ChallengeCombinationSupportChannelCompetingRelationSettlementCandidateEvidenceAdequacyCoverageEvaluationReadinessReviewReport,
    'reviewId'
  >,
): I236ChallengeCombinationSupportChannelCompetingRelationSettlementCandidateEvidenceAdequacyCoverageEvaluationReadinessReviewReport {
  return {
    reviewId: `i236_competing_relation_candidate_coverage_readiness_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI236ChallengeCombinationSupportChannelCompetingRelationSettlementCandidateEvidenceAdequacyCoverageEvaluationReadinessReview(
  i235: I235ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityDiscoveryEvidenceReport,
): I236ChallengeCombinationSupportChannelCompetingRelationSettlementCandidateEvidenceAdequacyCoverageEvaluationReadinessReviewReport {
  const accepted = exactI235Accepted(i235);
  return finalized({
    reviewVersion:
      I236_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_COMPETING_RELATION_SETTLEMENT_CANDIDATE_EVIDENCE_ADEQUACY_COVERAGE_EVALUATION_READINESS_REVIEW_VERSION,
    status: accepted
      ? 'RESOLVED_COMPETING_RELATION_SETTLEMENT_CANDIDATE_EVIDENCE_ADEQUACY_COVERAGE_EVALUATION_READINESS_REVIEW'
      : 'I235_DISCOVERY_EVIDENCE_BOUNDARY_INVALID',
    decision: accepted
      ? 'THREE_CANDIDATE_BY_EIGHT_REQUIREMENT_CANDIDATE_LOCAL_COVERAGE_MATRIX_FROZEN_EIGHTEEN_CONTROLS_THREE_DIRECT_GAPS_PRESERVED_NO_UNION_COVERAGE_NO_AUTHORITY_PROMOTION'
      : 'COMPETING_RELATION_SETTLEMENT_CANDIDATE_COVERAGE_EVALUATION_NOT_READY',
    upstreamI235EvidenceId: i235.evidenceId,
    exactI235BoundaryAccepted: accepted,
    targetScope: 'MULTIPLE_TRACKED_RELATION_TOUCHES_COMPETING_RELATION_SETTLEMENT',
    authorityGap: accepted ? 'COMPETING_RELATION_SETTLEMENT_AUTHORITY_NOT_ESTABLISHED' : 'UPSTREAM_INVALID',
    authorityGapClosed: false,
    evaluationCandidateIds: accepted ? I235_DISCOVERY_CANDIDATE_IDS : [],
    evaluationCandidateCount: accepted ? 3 : 0,
    requirementIds: accepted ? I233_COMPETING_RELATION_SETTLEMENT_AUTHORITY_REQUIREMENT_IDS : [],
    requirementCount: accepted ? 8 : 0,
    matrixCellCount: accepted ? 24 : 0,
    coverageStateVocabulary: accepted ? I236_COVERAGE_STATE_VOCABULARY : [],
    candidateLocalEvaluationRequired: accepted,
    candidateSetUnionCoverageAuthorized: false,
    candidateSetUnionMaySatisfyEightRequirements: false,
    candidateLocalEightOfEightRequiredForFullCoverageFinding: accepted,
    sameWorkOrCommentaryRelationshipPreserved: accepted,
    provenanceIndependenceAdjudicationAuthorizedByThisGate: false,
    derivativeRelationshipAdjudicationAuthorizedByThisGate: false,
    sourceNormativeAdmissibilityAdjudicationAuthorizedByThisGate: false,
    directCoverageGapRequirementIds: accepted ? I235_DIRECT_COVERAGE_GAP_REQUIREMENT_IDS : [],
    directCoverageGapRequirementCount: accepted ? 3 : 0,
    requirementThreeDirectCoverageMissingAccepted: accepted,
    requirementFiveDirectCoverageMissingAccepted: accepted,
    requirementSevenDirectCoverageMissingAccepted: accepted,
    fiveOfEightDirectInventoryAcceptedAsDiscoveryFindingOnly: accepted,
    partialMayAutoUpgradeToDirect: false,
    workedExampleMayAutoUpgradeToDirect: false,
    sourceIdentityContextLocatorEvaluatedSeparately: accepted,
    coverageEvaluationControlIds: accepted ? I236_COVERAGE_EVALUATION_CONTROL_IDS : [],
    coverageEvaluationControlCount: accepted ? 18 : 0,
    coverageEvaluationControlsFrozen: accepted,
    coverageEvaluationAuthorized: accepted,
    coverageEvaluationExecutedByThisGate: false,
    fullCoverageMayAutoPromoteAuthority: false,
    fullCoverageMayAutoCloseAuthorityGap: false,
    candidateRegistrationAuthorizedByThisGate: false,
    candidateSelectedByThisGate: false,
    candidateSetMutatedByThisGate: false,
    crossSourceCompositionAuthorizedByThisGate: false,
    semanticBridgeInferenceAuthorizedByThisGate: false,
    majorityVoteAuthorizedByThisGate: false,
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
    evidenceRebindingAuthorizedByThisGate: false,
    actualCompositionPerformedByThisGate: false,
    multiSourceCompositionAuthorized: false,
    thresholdRuleCreatedByThisGate: false,
    damageEvaluationAuthorized: false,
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    productionPolicyExecutionAuthorized: false,
    recommendedNextGate: accepted
      ? 'COMPETING_RELATION_SETTLEMENT_CANDIDATE_EVIDENCE_ADEQUACY_COVERAGE_EVALUATION_EVIDENCE'
      : 'COMPETING_RELATION_SETTLEMENT_CANDIDATE_EVIDENCE_ADEQUACY_COVERAGE_EVALUATION_READINESS_REVIEW',
    notes: accepted
      ? Object.freeze([
          'I236 freezes a 3 x 8 candidate-local matrix over the three direct source-bound I235 candidates and the eight I233 authority requirements.',
          'Candidate-local evaluation is mandatory: coverage from multiple candidates may not be unioned, synthesized, voted, or composed into a synthetic eight-of-eight authority finding.',
          'Requirements 3, 5, and 7 remain direct-coverage gaps from I235 and must stay distinct from partial evidence during I237 evaluation.',
          'Same-work and commentary relationships remain visible but are not adjudicated for derivative status, provenance independence, or normative admissibility by this gate.',
          'Even candidate-local eight-of-eight coverage would not by itself promote authority or close the competing-relation settlement gap.',
        ])
      : Object.freeze(['I235 discovery evidence boundary was not accepted; candidate coverage evaluation remains unauthorized.']),
  });
}
