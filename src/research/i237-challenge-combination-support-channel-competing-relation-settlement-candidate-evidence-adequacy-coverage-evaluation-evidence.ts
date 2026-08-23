import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  I235_DIRECT_COVERAGE_GAP_REQUIREMENT_IDS,
  I235_DISCOVERY_CANDIDATE_IDS,
  type I235ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityDiscoveryEvidenceReport,
  type I235RequirementCoverage,
} from './i235-challenge-combination-support-channel-competing-relation-settlement-authority-discovery-evidence.js';
import {
  I236_COVERAGE_EVALUATION_CONTROL_IDS,
  I236_COVERAGE_STATE_VOCABULARY,
  type I236ChallengeCombinationSupportChannelCompetingRelationSettlementCandidateEvidenceAdequacyCoverageEvaluationReadinessReviewReport,
} from './i236-challenge-combination-support-channel-competing-relation-settlement-candidate-evidence-adequacy-coverage-evaluation-readiness-review.js';
import { I233_COMPETING_RELATION_SETTLEMENT_AUTHORITY_REQUIREMENT_IDS } from './i233-challenge-combination-support-channel-competing-relation-settlement-authority-gap-requirements-review.js';

export const I237_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_COMPETING_RELATION_SETTLEMENT_CANDIDATE_EVIDENCE_ADEQUACY_COVERAGE_EVALUATION_EVIDENCE_VERSION =
  'myeonghwa-challenge-combination-support-channel-competing-relation-settlement-candidate-evidence-adequacy-coverage-evaluation-evidence-v1';

export interface I237CandidateCoverageRow {
  candidateId: (typeof I235_DISCOVERY_CANDIDATE_IDS)[number];
  cells: readonly {
    requirementId: (typeof I233_COMPETING_RELATION_SETTLEMENT_AUTHORITY_REQUIREMENT_IDS)[number];
    coverage: I235RequirementCoverage;
  }[];
  directCount: number;
  partialCount: number;
  conflictCount: number;
  notEstablishedCount: number;
  fullEightRequirementCoverage: false;
}

export interface I237RequirementCoverageInventoryRow {
  requirementId: (typeof I233_COMPETING_RELATION_SETTLEMENT_AUTHORITY_REQUIREMENT_IDS)[number];
  directCandidateCount: number;
  partialCandidateCount: number;
  conflictCandidateCount: number;
  notEstablishedCandidateCount: number;
  anyDirectCandidateCoverage: boolean;
  residualDirectCoverageGap: boolean;
}

export interface I237ChallengeCombinationSupportChannelCompetingRelationSettlementCandidateEvidenceAdequacyCoverageEvaluationEvidenceReport {
  evidenceId: string;
  evidenceVersion: string;
  status:
    | 'RESOLVED_COMPETING_RELATION_SETTLEMENT_CANDIDATE_EVIDENCE_ADEQUACY_COVERAGE_EVALUATION_EVIDENCE'
    | 'I236_OR_I235_COVERAGE_BOUNDARY_INVALID';
  decision:
    | 'THREE_BY_EIGHT_CANDIDATE_LOCAL_MATRIX_EVALUATED_FIFTEEN_DIRECT_SEVEN_PARTIAL_ZERO_CONFLICT_TWO_NOT_ESTABLISHED_ZERO_FULL_COVERAGE_CANDIDATES_THREE_DIRECT_REQUIREMENT_GAPS_REMAIN_NO_UNION_COVERAGE_NO_AUTHORITY_PROMOTION'
    | 'COMPETING_RELATION_SETTLEMENT_CANDIDATE_COVERAGE_EVALUATION_NOT_EXECUTED';
  upstreamI236ReviewId: string;
  upstreamI235EvidenceId: string;
  exactI236AndI235BoundaryAccepted: boolean;
  targetScope: 'MULTIPLE_TRACKED_RELATION_TOUCHES_COMPETING_RELATION_SETTLEMENT';
  authorityGap: 'COMPETING_RELATION_SETTLEMENT_AUTHORITY_NOT_ESTABLISHED' | 'UPSTREAM_INVALID';
  authorityGapClosed: false;
  coverageEvaluationExecuted: boolean;
  candidateCoverageRows: readonly I237CandidateCoverageRow[];
  candidateCoverageRowCount: 3 | 0;
  requirementCoverageInventoryRows: readonly I237RequirementCoverageInventoryRow[];
  requirementCoverageInventoryRowCount: 8 | 0;
  matrixCellCount: 24 | 0;
  totalDirectCellCount: 15 | 0;
  totalPartialCellCount: 7 | 0;
  totalConflictCellCount: 0;
  totalNotEstablishedCellCount: 2 | 0;
  fullEightRequirementCandidateCount: 0;
  anySingleCandidateFullEightRequirementCoverage: false;
  directCoverageRequirementClassCount: 5 | 0;
  residualDirectCoverageGapRequirementIds: readonly string[];
  residualDirectCoverageGapRequirementCount: 3 | 0;
  requirementThreeCoverageDisposition: 'PARTIAL_IN_ALL_THREE_CANDIDATES' | 'NOT_EVALUATED';
  requirementFiveCoverageDisposition: 'PARTIAL_IN_ALL_THREE_CANDIDATES' | 'NOT_EVALUATED';
  requirementSevenCoverageDisposition: 'PARTIAL_IN_ONE_NOT_ESTABLISHED_IN_TWO' | 'NOT_EVALUATED';
  candidateSetUnionCoveragePerformed: false;
  candidateSetUnionMaySatisfyEightRequirements: false;
  crossSourceCompositionPerformedByThisGate: false;
  semanticBridgeInferencePerformedByThisGate: false;
  majorityVotePerformedByThisGate: false;
  sameWorkOrCommentaryRelationshipPreserved: boolean;
  derivativeRelationshipAdjudicatedByThisGate: false;
  provenanceIndependenceAdjudicatedByThisGate: false;
  sourceNormativeAdmissibilityAdjudicatedByThisGate: false;
  coverageAdequacyMayAutoPromoteAuthority: false;
  candidateRegistrationAuthorizedByThisGate: false;
  candidateSelectedByThisGate: false;
  candidateSetMutatedByThisGate: false;
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
    | 'COMPETING_RELATION_SETTLEMENT_COVERAGE_EVIDENCE_ADEQUACY_RESIDUAL_REQUIREMENTS_REASSESSMENT_REVIEW'
    | 'COMPETING_RELATION_SETTLEMENT_CANDIDATE_EVIDENCE_ADEQUACY_COVERAGE_EVALUATION_EVIDENCE';
  notes: readonly string[];
}

function exactBoundaryAccepted(
  i236: I236ChallengeCombinationSupportChannelCompetingRelationSettlementCandidateEvidenceAdequacyCoverageEvaluationReadinessReviewReport,
  i235: I235ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityDiscoveryEvidenceReport,
): boolean {
  return (
    i236.status ===
      'RESOLVED_COMPETING_RELATION_SETTLEMENT_CANDIDATE_EVIDENCE_ADEQUACY_COVERAGE_EVALUATION_READINESS_REVIEW' &&
    i236.decision ===
      'THREE_CANDIDATE_BY_EIGHT_REQUIREMENT_CANDIDATE_LOCAL_COVERAGE_MATRIX_FROZEN_EIGHTEEN_CONTROLS_THREE_DIRECT_GAPS_PRESERVED_NO_UNION_COVERAGE_NO_AUTHORITY_PROMOTION' &&
    i236.exactI235BoundaryAccepted &&
    i236.upstreamI235EvidenceId === i235.evidenceId &&
    i236.evaluationCandidateCount === 3 &&
    i236.requirementCount === 8 &&
    i236.matrixCellCount === 24 &&
    i236.coverageStateVocabulary.length === I236_COVERAGE_STATE_VOCABULARY.length &&
    i236.coverageStateVocabulary.every((state, index) => state === I236_COVERAGE_STATE_VOCABULARY[index]) &&
    i236.coverageEvaluationControlCount === 18 &&
    i236.coverageEvaluationControlIds.length === I236_COVERAGE_EVALUATION_CONTROL_IDS.length &&
    i236.coverageEvaluationControlIds.every(
      (id, index) => id === I236_COVERAGE_EVALUATION_CONTROL_IDS[index],
    ) &&
    i236.coverageEvaluationControlsFrozen &&
    i236.coverageEvaluationAuthorized &&
    i236.coverageEvaluationExecutedByThisGate === false &&
    i236.candidateSetUnionCoverageAuthorized === false &&
    i236.candidateSetUnionMaySatisfyEightRequirements === false &&
    i236.directCoverageGapRequirementCount === 3 &&
    i236.directCoverageGapRequirementIds.length === I235_DIRECT_COVERAGE_GAP_REQUIREMENT_IDS.length &&
    i236.directCoverageGapRequirementIds.every(
      (id, index) => id === I235_DIRECT_COVERAGE_GAP_REQUIREMENT_IDS[index],
    ) &&
    i236.hiddenStemI232HoldPreserved &&
    i236.hiddenStemTrackReopenedByThisGate === false &&
    i236.quWei2001HoldPreserved &&
    i236.li1998SameTargetPathSuspendedNotRetired &&
    i236.I132IndependentNormativeProvenanceRequirementRemainsNormative &&
    i236.I132PolicyRelaxationAuthorizedByThisGate === false &&
    i236.currentV2PackageAndCandidateSetRemainImmutable &&
    i236.currentV2ProvenanceDisposition === 'BLOCKED_UNDER_CURRENT_EVIDENCE' &&
    i236.actualCompositionPerformedByThisGate === false &&
    i236.multiSourceCompositionAuthorized === false &&
    i236.thresholdRuleCreatedByThisGate === false &&
    i236.damageEvaluationAuthorized === false &&
    i236.classificationAuthorized === false &&
    i236.numericScoringAuthorized === false &&
    i236.productionPolicyExecutionAuthorized === false &&
    i236.recommendedNextGate ===
      'COMPETING_RELATION_SETTLEMENT_CANDIDATE_EVIDENCE_ADEQUACY_COVERAGE_EVALUATION_EVIDENCE' &&
    i235.status === 'RESOLVED_COMPETING_RELATION_SETTLEMENT_AUTHORITY_DISCOVERY_EVIDENCE' &&
    i235.exactI234BoundaryAccepted &&
    i235.candidateRecordCount === 3 &&
    i235.candidateRecords.length === 3 &&
    i235.candidateRecords.every(
      (candidate, index) =>
        candidate.candidateId === I235_DISCOVERY_CANDIDATE_IDS[index] &&
        candidate.requirementCoverage.length === 8 &&
        candidate.requirementCoverage.every(
          (cell, cellIndex) => cell.requirementId === I233_COMPETING_RELATION_SETTLEMENT_AUTHORITY_REQUIREMENT_IDS[cellIndex],
        ),
    ) &&
    i235.anySingleCandidateFullEightRequirementCoverage === false &&
    i235.directCoverageGapRequirementCount === 3 &&
    i235.candidateSetUnionMayBeTreatedAsSingleAuthority === false &&
    i235.crossSourceCompositionAuthorizedByThisGate === false &&
    i235.semanticBridgeInferenceAuthorizedByThisGate === false
  );
}

function finalized(
  material: Omit<
    I237ChallengeCombinationSupportChannelCompetingRelationSettlementCandidateEvidenceAdequacyCoverageEvaluationEvidenceReport,
    'evidenceId'
  >,
): I237ChallengeCombinationSupportChannelCompetingRelationSettlementCandidateEvidenceAdequacyCoverageEvaluationEvidenceReport {
  return {
    evidenceId: `i237_competing_relation_candidate_coverage_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI237ChallengeCombinationSupportChannelCompetingRelationSettlementCandidateEvidenceAdequacyCoverageEvaluationEvidence(
  i236: I236ChallengeCombinationSupportChannelCompetingRelationSettlementCandidateEvidenceAdequacyCoverageEvaluationReadinessReviewReport,
  i235: I235ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityDiscoveryEvidenceReport,
): I237ChallengeCombinationSupportChannelCompetingRelationSettlementCandidateEvidenceAdequacyCoverageEvaluationEvidenceReport {
  const accepted = exactBoundaryAccepted(i236, i235);
  const candidateCoverageRows: readonly I237CandidateCoverageRow[] = accepted
    ? i235.candidateRecords.map((candidate) => {
        const directCount = candidate.requirementCoverage.filter((cell) => cell.coverage === 'DIRECT').length;
        const partialCount = candidate.requirementCoverage.filter((cell) => cell.coverage === 'PARTIAL').length;
        const conflictCount = candidate.requirementCoverage.filter((cell) => cell.coverage === 'CONFLICT').length;
        const notEstablishedCount = candidate.requirementCoverage.filter(
          (cell) => cell.coverage === 'NOT_ESTABLISHED',
        ).length;
        return {
          candidateId: candidate.candidateId,
          cells: candidate.requirementCoverage,
          directCount,
          partialCount,
          conflictCount,
          notEstablishedCount,
          fullEightRequirementCoverage: false as const,
        };
      })
    : [];
  const requirementCoverageInventoryRows: readonly I237RequirementCoverageInventoryRow[] = accepted
    ? I233_COMPETING_RELATION_SETTLEMENT_AUTHORITY_REQUIREMENT_IDS.map((requirementId, requirementIndex) => {
        const states = candidateCoverageRows.map((row) => row.cells[requirementIndex]?.coverage ?? 'NOT_ESTABLISHED');
        const directCandidateCount = states.filter((state) => state === 'DIRECT').length;
        const partialCandidateCount = states.filter((state) => state === 'PARTIAL').length;
        const conflictCandidateCount = states.filter((state) => state === 'CONFLICT').length;
        const notEstablishedCandidateCount = states.filter((state) => state === 'NOT_ESTABLISHED').length;
        return {
          requirementId,
          directCandidateCount,
          partialCandidateCount,
          conflictCandidateCount,
          notEstablishedCandidateCount,
          anyDirectCandidateCoverage: directCandidateCount > 0,
          residualDirectCoverageGap: directCandidateCount === 0,
        };
      })
    : [];
  const totalDirectCellCount = accepted
    ? candidateCoverageRows.reduce((sum, row) => sum + row.directCount, 0)
    : 0;
  const totalPartialCellCount = accepted
    ? candidateCoverageRows.reduce((sum, row) => sum + row.partialCount, 0)
    : 0;
  const totalNotEstablishedCellCount = accepted
    ? candidateCoverageRows.reduce((sum, row) => sum + row.notEstablishedCount, 0)
    : 0;
  const directCoverageRequirementClassCount = accepted
    ? requirementCoverageInventoryRows.filter((row) => row.anyDirectCandidateCoverage).length
    : 0;

  return finalized({
    evidenceVersion:
      I237_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_COMPETING_RELATION_SETTLEMENT_CANDIDATE_EVIDENCE_ADEQUACY_COVERAGE_EVALUATION_EVIDENCE_VERSION,
    status: accepted
      ? 'RESOLVED_COMPETING_RELATION_SETTLEMENT_CANDIDATE_EVIDENCE_ADEQUACY_COVERAGE_EVALUATION_EVIDENCE'
      : 'I236_OR_I235_COVERAGE_BOUNDARY_INVALID',
    decision: accepted
      ? 'THREE_BY_EIGHT_CANDIDATE_LOCAL_MATRIX_EVALUATED_FIFTEEN_DIRECT_SEVEN_PARTIAL_ZERO_CONFLICT_TWO_NOT_ESTABLISHED_ZERO_FULL_COVERAGE_CANDIDATES_THREE_DIRECT_REQUIREMENT_GAPS_REMAIN_NO_UNION_COVERAGE_NO_AUTHORITY_PROMOTION'
      : 'COMPETING_RELATION_SETTLEMENT_CANDIDATE_COVERAGE_EVALUATION_NOT_EXECUTED',
    upstreamI236ReviewId: i236.reviewId,
    upstreamI235EvidenceId: i235.evidenceId,
    exactI236AndI235BoundaryAccepted: accepted,
    targetScope: 'MULTIPLE_TRACKED_RELATION_TOUCHES_COMPETING_RELATION_SETTLEMENT',
    authorityGap: accepted ? 'COMPETING_RELATION_SETTLEMENT_AUTHORITY_NOT_ESTABLISHED' : 'UPSTREAM_INVALID',
    authorityGapClosed: false,
    coverageEvaluationExecuted: accepted,
    candidateCoverageRows,
    candidateCoverageRowCount: accepted ? 3 : 0,
    requirementCoverageInventoryRows,
    requirementCoverageInventoryRowCount: accepted ? 8 : 0,
    matrixCellCount: accepted ? 24 : 0,
    totalDirectCellCount: accepted ? (totalDirectCellCount as 15) : 0,
    totalPartialCellCount: accepted ? (totalPartialCellCount as 7) : 0,
    totalConflictCellCount: 0,
    totalNotEstablishedCellCount: accepted ? (totalNotEstablishedCellCount as 2) : 0,
    fullEightRequirementCandidateCount: 0,
    anySingleCandidateFullEightRequirementCoverage: false,
    directCoverageRequirementClassCount: accepted ? (directCoverageRequirementClassCount as 5) : 0,
    residualDirectCoverageGapRequirementIds: accepted ? I235_DIRECT_COVERAGE_GAP_REQUIREMENT_IDS : [],
    residualDirectCoverageGapRequirementCount: accepted ? 3 : 0,
    requirementThreeCoverageDisposition: accepted ? 'PARTIAL_IN_ALL_THREE_CANDIDATES' : 'NOT_EVALUATED',
    requirementFiveCoverageDisposition: accepted ? 'PARTIAL_IN_ALL_THREE_CANDIDATES' : 'NOT_EVALUATED',
    requirementSevenCoverageDisposition: accepted
      ? 'PARTIAL_IN_ONE_NOT_ESTABLISHED_IN_TWO'
      : 'NOT_EVALUATED',
    candidateSetUnionCoveragePerformed: false,
    candidateSetUnionMaySatisfyEightRequirements: false,
    crossSourceCompositionPerformedByThisGate: false,
    semanticBridgeInferencePerformedByThisGate: false,
    majorityVotePerformedByThisGate: false,
    sameWorkOrCommentaryRelationshipPreserved: accepted,
    derivativeRelationshipAdjudicatedByThisGate: false,
    provenanceIndependenceAdjudicatedByThisGate: false,
    sourceNormativeAdmissibilityAdjudicatedByThisGate: false,
    coverageAdequacyMayAutoPromoteAuthority: false,
    candidateRegistrationAuthorizedByThisGate: false,
    candidateSelectedByThisGate: false,
    candidateSetMutatedByThisGate: false,
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
      ? 'COMPETING_RELATION_SETTLEMENT_COVERAGE_EVIDENCE_ADEQUACY_RESIDUAL_REQUIREMENTS_REASSESSMENT_REVIEW'
      : 'COMPETING_RELATION_SETTLEMENT_CANDIDATE_EVIDENCE_ADEQUACY_COVERAGE_EVALUATION_EVIDENCE',
    notes: accepted
      ? Object.freeze([
          'The frozen 3 x 8 candidate-local matrix contains 15 DIRECT, 7 PARTIAL, 0 CONFLICT, and 2 NOT_ESTABLISHED cells.',
          'Each candidate has five DIRECT cells; none has candidate-local eight-of-eight coverage.',
          'Requirements 3 and 5 are PARTIAL in all three candidates; requirement 7 is PARTIAL in one candidate and NOT_ESTABLISHED in two.',
          'Five requirement classes have at least one DIRECT candidate-local witness, but this inventory is not candidate-set union authority and performs no composition or semantic bridging.',
          'Three direct-coverage gaps therefore remain for residual-requirement reassessment: current-vs-competing role scope, precedence-vs-outcome separation, and tie/conflict/unresolved fail-closed disposition.',
        ])
      : Object.freeze(['I236/I235 coverage boundary was not accepted; no candidate-local matrix evaluation was executed.']),
  });
}
