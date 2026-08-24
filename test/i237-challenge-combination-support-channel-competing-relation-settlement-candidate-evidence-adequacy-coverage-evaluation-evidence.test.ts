import { describe, expect, it } from 'vitest';
import { buildI233ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityGapRequirementsReview } from '../src/research/i233-challenge-combination-support-channel-competing-relation-settlement-authority-gap-requirements-review.js';
import { buildI234ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityDiscoveryReadinessReview } from '../src/research/i234-challenge-combination-support-channel-competing-relation-settlement-authority-discovery-readiness-review.js';
import { buildI235ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityDiscoveryEvidence } from '../src/research/i235-challenge-combination-support-channel-competing-relation-settlement-authority-discovery-evidence.js';
import { buildI236ChallengeCombinationSupportChannelCompetingRelationSettlementCandidateEvidenceAdequacyCoverageEvaluationReadinessReview } from '../src/research/i236-challenge-combination-support-channel-competing-relation-settlement-candidate-evidence-adequacy-coverage-evaluation-readiness-review.js';
import { buildI237ChallengeCombinationSupportChannelCompetingRelationSettlementCandidateEvidenceAdequacyCoverageEvaluationEvidence } from '../src/research/i237-challenge-combination-support-channel-competing-relation-settlement-candidate-evidence-adequacy-coverage-evaluation-evidence.js';

const validI235 = () =>
  buildI235ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityDiscoveryEvidence(
    buildI234ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityDiscoveryReadinessReview(
      buildI233ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityGapRequirementsReview(),
    ),
  );

const validBoundary = () => {
  const i235 = validI235();
  const i236 = buildI236ChallengeCombinationSupportChannelCompetingRelationSettlementCandidateEvidenceAdequacyCoverageEvaluationReadinessReview(i235);
  return { i235, i236 };
};

describe('I237 competing-relation candidate-local coverage evaluation evidence', () => {
  it('accepts the exact I236/I235 boundary and evaluates the full 3 x 8 matrix', () => {
    const { i235, i236 } = validBoundary();
    const report = buildI237ChallengeCombinationSupportChannelCompetingRelationSettlementCandidateEvidenceAdequacyCoverageEvaluationEvidence(i236, i235);
    expect(report.status).toBe(
      'RESOLVED_COMPETING_RELATION_SETTLEMENT_CANDIDATE_EVIDENCE_ADEQUACY_COVERAGE_EVALUATION_EVIDENCE',
    );
    expect(report.decision).toBe(
      'THREE_BY_EIGHT_CANDIDATE_LOCAL_MATRIX_EVALUATED_FIFTEEN_DIRECT_SEVEN_PARTIAL_ZERO_CONFLICT_TWO_NOT_ESTABLISHED_ZERO_FULL_COVERAGE_CANDIDATES_THREE_DIRECT_REQUIREMENT_GAPS_REMAIN_NO_UNION_COVERAGE_NO_AUTHORITY_PROMOTION',
    );
    expect(report.exactI236AndI235BoundaryAccepted).toBe(true);
    expect(report.coverageEvaluationExecuted).toBe(true);
    expect(report.candidateCoverageRowCount).toBe(3);
    expect(report.requirementCoverageInventoryRowCount).toBe(8);
    expect(report.matrixCellCount).toBe(24);
  });

  it('materializes the exact aggregate cell counts without changing any I235 cell', () => {
    const { i235, i236 } = validBoundary();
    const report = buildI237ChallengeCombinationSupportChannelCompetingRelationSettlementCandidateEvidenceAdequacyCoverageEvaluationEvidence(i236, i235);
    expect(report.totalDirectCellCount).toBe(15);
    expect(report.totalPartialCellCount).toBe(7);
    expect(report.totalConflictCellCount).toBe(0);
    expect(report.totalNotEstablishedCellCount).toBe(2);
    expect(report.candidateCoverageRows.map((row) => row.cells)).toEqual(
      i235.candidateRecords.map((candidate) => candidate.requirementCoverage),
    );
  });

  it('keeps every candidate at five direct cells and zero full-eight candidates', () => {
    const { i235, i236 } = validBoundary();
    const report = buildI237ChallengeCombinationSupportChannelCompetingRelationSettlementCandidateEvidenceAdequacyCoverageEvaluationEvidence(i236, i235);
    expect(report.candidateCoverageRows.map((row) => row.directCount)).toEqual([5, 5, 5]);
    expect(report.candidateCoverageRows.map((row) => row.partialCount)).toEqual([2, 2, 3]);
    expect(report.candidateCoverageRows.map((row) => row.notEstablishedCount)).toEqual([1, 1, 0]);
    expect(report.candidateCoverageRows.every((row) => row.conflictCount === 0)).toBe(true);
    expect(report.candidateCoverageRows.every((row) => row.fullEightRequirementCoverage === false)).toBe(true);
    expect(report.fullEightRequirementCandidateCount).toBe(0);
    expect(report.anySingleCandidateFullEightRequirementCoverage).toBe(false);
  });

  it('establishes direct inventory for exactly five requirement classes and preserves three direct gaps', () => {
    const { i235, i236 } = validBoundary();
    const report = buildI237ChallengeCombinationSupportChannelCompetingRelationSettlementCandidateEvidenceAdequacyCoverageEvaluationEvidence(i236, i235);
    expect(report.directCoverageRequirementClassCount).toBe(5);
    expect(report.residualDirectCoverageGapRequirementIds).toEqual([
      'CURRENT_VS_COMPETING_ROLE_SCOPE_EXPLICIT',
      'PRECEDENCE_VS_RELATION_OUTCOME_SEPARATION',
      'TIE_CONFLICT_OR_UNRESOLVED_FAIL_CLOSED_DISPOSITION',
    ]);
    expect(report.residualDirectCoverageGapRequirementCount).toBe(3);
    expect(report.requirementCoverageInventoryRows.map((row) => row.anyDirectCandidateCoverage)).toEqual([
      true,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
    ]);
  });

  it('records the exact residual dispositions for requirements three, five, and seven', () => {
    const { i235, i236 } = validBoundary();
    const report = buildI237ChallengeCombinationSupportChannelCompetingRelationSettlementCandidateEvidenceAdequacyCoverageEvaluationEvidence(i236, i235);
    expect(report.requirementThreeCoverageDisposition).toBe('PARTIAL_IN_ALL_THREE_CANDIDATES');
    expect(report.requirementFiveCoverageDisposition).toBe('PARTIAL_IN_ALL_THREE_CANDIDATES');
    expect(report.requirementSevenCoverageDisposition).toBe('PARTIAL_IN_ONE_NOT_ESTABLISHED_IN_TWO');
    expect(report.requirementCoverageInventoryRows[2]).toMatchObject({
      directCandidateCount: 0,
      partialCandidateCount: 3,
      conflictCandidateCount: 0,
      notEstablishedCandidateCount: 0,
      residualDirectCoverageGap: true,
    });
    expect(report.requirementCoverageInventoryRows[4]).toMatchObject({
      directCandidateCount: 0,
      partialCandidateCount: 3,
      conflictCandidateCount: 0,
      notEstablishedCandidateCount: 0,
      residualDirectCoverageGap: true,
    });
    expect(report.requirementCoverageInventoryRows[6]).toMatchObject({
      directCandidateCount: 0,
      partialCandidateCount: 1,
      conflictCandidateCount: 0,
      notEstablishedCandidateCount: 2,
      residualDirectCoverageGap: true,
    });
  });

  it('does not union candidates, adjudicate provenance, or promote coverage into authority', () => {
    const { i235, i236 } = validBoundary();
    const report = buildI237ChallengeCombinationSupportChannelCompetingRelationSettlementCandidateEvidenceAdequacyCoverageEvaluationEvidence(i236, i235);
    expect(report.candidateSetUnionCoveragePerformed).toBe(false);
    expect(report.candidateSetUnionMaySatisfyEightRequirements).toBe(false);
    expect(report.crossSourceCompositionPerformedByThisGate).toBe(false);
    expect(report.semanticBridgeInferencePerformedByThisGate).toBe(false);
    expect(report.majorityVotePerformedByThisGate).toBe(false);
    expect(report.sameWorkOrCommentaryRelationshipPreserved).toBe(true);
    expect(report.derivativeRelationshipAdjudicatedByThisGate).toBe(false);
    expect(report.provenanceIndependenceAdjudicatedByThisGate).toBe(false);
    expect(report.sourceNormativeAdmissibilityAdjudicatedByThisGate).toBe(false);
    expect(report.coverageAdequacyMayAutoPromoteAuthority).toBe(false);
    expect(report.candidateRegistrationAuthorizedByThisGate).toBe(false);
    expect(report.candidateSelectedByThisGate).toBe(false);
  });

  it('preserves I232, I132, Qu Wei, Li 1998, v2, settlement, and downstream effect guards', () => {
    const { i235, i236 } = validBoundary();
    const report = buildI237ChallengeCombinationSupportChannelCompetingRelationSettlementCandidateEvidenceAdequacyCoverageEvaluationEvidence(i236, i235);
    expect(report.authorityGap).toBe('COMPETING_RELATION_SETTLEMENT_AUTHORITY_NOT_ESTABLISHED');
    expect(report.authorityGapClosed).toBe(false);
    expect(report.competingRelationSettlementResolved).toBe(false);
    expect(report.crossRelationPrecedenceAuthorized).toBe(false);
    expect(report.multiTouchAggregationAuthorized).toBe(false);
    expect(report.supportChannelActivationVerdictAuthorized).toBe(false);
    expect(report.supportChannelPersistenceVerdictAuthorized).toBe(false);
    expect(report.supportChannelDestructionVerdictAuthorized).toBe(false);
    expect(report.supportChannelNetEffectVerdictAuthorized).toBe(false);
    expect(report.targetPostRelationRootState).toBe('not_determined');
    expect(report.effectiveMechanismForceVerdict).toBe('not_determined');
    expect(report.hiddenStemI232HoldPreserved).toBe(true);
    expect(report.hiddenStemTrackReopenedByThisGate).toBe(false);
    expect(report.quWei2001HoldPreserved).toBe(true);
    expect(report.li1998SameTargetPathSuspendedNotRetired).toBe(true);
    expect(report.I132IndependentNormativeProvenanceRequirementRemainsNormative).toBe(true);
    expect(report.I132PolicyRelaxationAuthorizedByThisGate).toBe(false);
    expect(report.currentV2PackageAndCandidateSetRemainImmutable).toBe(true);
    expect(report.currentV2ProvenanceDisposition).toBe('BLOCKED_UNDER_CURRENT_EVIDENCE');
    expect(report.evidenceRebindingAuthorizedByThisGate).toBe(false);
    expect(report.actualCompositionPerformedByThisGate).toBe(false);
    expect(report.multiSourceCompositionAuthorized).toBe(false);
    expect(report.thresholdRuleCreatedByThisGate).toBe(false);
    expect(report.damageEvaluationAuthorized).toBe(false);
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
    expect(report.productionPolicyExecutionAuthorized).toBe(false);
  });

  it('fails closed if either the readiness review or discovery evidence is no longer exact', () => {
    const { i235, i236 } = validBoundary();
    const invalidI236 = { ...i236, matrixCellCount: 0 } as unknown as typeof i236;
    const failedReadiness = buildI237ChallengeCombinationSupportChannelCompetingRelationSettlementCandidateEvidenceAdequacyCoverageEvaluationEvidence(invalidI236, i235);
    expect(failedReadiness.status).toBe('I236_OR_I235_COVERAGE_BOUNDARY_INVALID');
    expect(failedReadiness.coverageEvaluationExecuted).toBe(false);
    expect(failedReadiness.matrixCellCount).toBe(0);
    expect(failedReadiness.authorityGap).toBe('UPSTREAM_INVALID');

    const invalidI235 = { ...i235, candidateRecordCount: 0 } as unknown as typeof i235;
    const failedEvidence = buildI237ChallengeCombinationSupportChannelCompetingRelationSettlementCandidateEvidenceAdequacyCoverageEvaluationEvidence(i236, invalidI235);
    expect(failedEvidence.status).toBe('I236_OR_I235_COVERAGE_BOUNDARY_INVALID');
    expect(failedEvidence.coverageEvaluationExecuted).toBe(false);
    expect(failedEvidence.candidateCoverageRowCount).toBe(0);
    expect(failedEvidence.recommendedNextGate).toBe(
      'COMPETING_RELATION_SETTLEMENT_CANDIDATE_EVIDENCE_ADEQUACY_COVERAGE_EVALUATION_EVIDENCE',
    );
  });
});
