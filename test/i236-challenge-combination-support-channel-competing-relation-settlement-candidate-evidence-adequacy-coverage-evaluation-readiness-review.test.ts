import { describe, expect, it } from 'vitest';
import { buildI233ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityGapRequirementsReview } from '../src/research/i233-challenge-combination-support-channel-competing-relation-settlement-authority-gap-requirements-review.js';
import { buildI234ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityDiscoveryReadinessReview } from '../src/research/i234-challenge-combination-support-channel-competing-relation-settlement-authority-discovery-readiness-review.js';
import { buildI235ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityDiscoveryEvidence } from '../src/research/i235-challenge-combination-support-channel-competing-relation-settlement-authority-discovery-evidence.js';
import {
  I236_COVERAGE_EVALUATION_CONTROL_IDS,
  I236_COVERAGE_STATE_VOCABULARY,
  buildI236ChallengeCombinationSupportChannelCompetingRelationSettlementCandidateEvidenceAdequacyCoverageEvaluationReadinessReview,
} from '../src/research/i236-challenge-combination-support-channel-competing-relation-settlement-candidate-evidence-adequacy-coverage-evaluation-readiness-review.js';

const validI235 = () =>
  buildI235ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityDiscoveryEvidence(
    buildI234ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityDiscoveryReadinessReview(
      buildI233ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityGapRequirementsReview(),
    ),
  );

describe('I236 competing-relation candidate evidence adequacy coverage-evaluation readiness', () => {
  it('accepts the exact I235 boundary and authorizes coverage evaluation only', () => {
    const report = buildI236ChallengeCombinationSupportChannelCompetingRelationSettlementCandidateEvidenceAdequacyCoverageEvaluationReadinessReview(validI235());
    expect(report.status).toBe(
      'RESOLVED_COMPETING_RELATION_SETTLEMENT_CANDIDATE_EVIDENCE_ADEQUACY_COVERAGE_EVALUATION_READINESS_REVIEW',
    );
    expect(report.decision).toBe(
      'THREE_CANDIDATE_BY_EIGHT_REQUIREMENT_CANDIDATE_LOCAL_COVERAGE_MATRIX_FROZEN_EIGHTEEN_CONTROLS_THREE_DIRECT_GAPS_PRESERVED_NO_UNION_COVERAGE_NO_AUTHORITY_PROMOTION',
    );
    expect(report.exactI235BoundaryAccepted).toBe(true);
    expect(report.coverageEvaluationAuthorized).toBe(true);
    expect(report.coverageEvaluationExecutedByThisGate).toBe(false);
    expect(report.authorityGap).toBe('COMPETING_RELATION_SETTLEMENT_AUTHORITY_NOT_ESTABLISHED');
    expect(report.authorityGapClosed).toBe(false);
  });

  it('freezes a three-candidate by eight-requirement matrix with twenty-four cells', () => {
    const report = buildI236ChallengeCombinationSupportChannelCompetingRelationSettlementCandidateEvidenceAdequacyCoverageEvaluationReadinessReview(validI235());
    expect(report.evaluationCandidateCount).toBe(3);
    expect(report.requirementCount).toBe(8);
    expect(report.matrixCellCount).toBe(24);
    expect(report.evaluationCandidateIds).toHaveLength(3);
    expect(report.requirementIds).toHaveLength(8);
    expect(report.coverageStateVocabulary).toEqual(I236_COVERAGE_STATE_VOCABULARY);
    expect(report.candidateLocalEvaluationRequired).toBe(true);
    expect(report.candidateLocalEightOfEightRequiredForFullCoverageFinding).toBe(true);
  });

  it('preserves the three direct-coverage gaps from I235', () => {
    const report = buildI236ChallengeCombinationSupportChannelCompetingRelationSettlementCandidateEvidenceAdequacyCoverageEvaluationReadinessReview(validI235());
    expect(report.directCoverageGapRequirementIds).toEqual([
      'CURRENT_VS_COMPETING_ROLE_SCOPE_EXPLICIT',
      'PRECEDENCE_VS_RELATION_OUTCOME_SEPARATION',
      'TIE_CONFLICT_OR_UNRESOLVED_FAIL_CLOSED_DISPOSITION',
    ]);
    expect(report.directCoverageGapRequirementCount).toBe(3);
    expect(report.requirementThreeDirectCoverageMissingAccepted).toBe(true);
    expect(report.requirementFiveDirectCoverageMissingAccepted).toBe(true);
    expect(report.requirementSevenDirectCoverageMissingAccepted).toBe(true);
    expect(report.fiveOfEightDirectInventoryAcceptedAsDiscoveryFindingOnly).toBe(true);
    expect(report.partialMayAutoUpgradeToDirect).toBe(false);
    expect(report.workedExampleMayAutoUpgradeToDirect).toBe(false);
  });

  it('forbids candidate-union coverage, synthesis, voting, and derivative independence shortcuts', () => {
    const report = buildI236ChallengeCombinationSupportChannelCompetingRelationSettlementCandidateEvidenceAdequacyCoverageEvaluationReadinessReview(validI235());
    expect(report.candidateSetUnionCoverageAuthorized).toBe(false);
    expect(report.candidateSetUnionMaySatisfyEightRequirements).toBe(false);
    expect(report.crossSourceCompositionAuthorizedByThisGate).toBe(false);
    expect(report.semanticBridgeInferenceAuthorizedByThisGate).toBe(false);
    expect(report.majorityVoteAuthorizedByThisGate).toBe(false);
    expect(report.sameWorkOrCommentaryRelationshipPreserved).toBe(true);
    expect(report.provenanceIndependenceAdjudicationAuthorizedByThisGate).toBe(false);
    expect(report.derivativeRelationshipAdjudicationAuthorizedByThisGate).toBe(false);
    expect(report.sourceNormativeAdmissibilityAdjudicationAuthorizedByThisGate).toBe(false);
  });

  it('freezes all eighteen coverage-evaluation controls', () => {
    const report = buildI236ChallengeCombinationSupportChannelCompetingRelationSettlementCandidateEvidenceAdequacyCoverageEvaluationReadinessReview(validI235());
    expect(report.coverageEvaluationControlIds).toEqual(I236_COVERAGE_EVALUATION_CONTROL_IDS);
    expect(report.coverageEvaluationControlCount).toBe(18);
    expect(report.coverageEvaluationControlsFrozen).toBe(true);
    expect(report.sourceIdentityContextLocatorEvaluatedSeparately).toBe(true);
    expect(report.fullCoverageMayAutoPromoteAuthority).toBe(false);
    expect(report.fullCoverageMayAutoCloseAuthorityGap).toBe(false);
  });

  it('preserves all settlement and downstream effect guards', () => {
    const report = buildI236ChallengeCombinationSupportChannelCompetingRelationSettlementCandidateEvidenceAdequacyCoverageEvaluationReadinessReview(validI235());
    expect(report.candidateRegistrationAuthorizedByThisGate).toBe(false);
    expect(report.candidateSelectedByThisGate).toBe(false);
    expect(report.candidateSetMutatedByThisGate).toBe(false);
    expect(report.competingRelationSettlementResolved).toBe(false);
    expect(report.crossRelationPrecedenceAuthorized).toBe(false);
    expect(report.multiTouchAggregationAuthorized).toBe(false);
    expect(report.supportChannelActivationVerdictAuthorized).toBe(false);
    expect(report.supportChannelPersistenceVerdictAuthorized).toBe(false);
    expect(report.supportChannelDestructionVerdictAuthorized).toBe(false);
    expect(report.supportChannelNetEffectVerdictAuthorized).toBe(false);
    expect(report.targetPostRelationRootState).toBe('not_determined');
    expect(report.effectiveMechanismForceVerdict).toBe('not_determined');
  });

  it('keeps I232, I132, Qu Wei, Li 1998, v2, and production guards unchanged', () => {
    const report = buildI236ChallengeCombinationSupportChannelCompetingRelationSettlementCandidateEvidenceAdequacyCoverageEvaluationReadinessReview(validI235());
    expect(report.hiddenStemI232HoldPreserved).toBe(true);
    expect(report.hiddenStemTrackReopenedByThisGate).toBe(false);
    expect(report.hiddenStemAuthorityGap).toBe('SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED');
    expect(report.visibleStemBinaryEffectiveInteractionEligibilityResolved).toBe(false);
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

  it('fails closed when the I235 discovery-evidence boundary is mutated', () => {
    const invalid = { ...validI235(), directCoverageGapRequirementCount: 0 } as unknown as ReturnType<typeof validI235>;
    const report = buildI236ChallengeCombinationSupportChannelCompetingRelationSettlementCandidateEvidenceAdequacyCoverageEvaluationReadinessReview(invalid);
    expect(report.status).toBe('I235_DISCOVERY_EVIDENCE_BOUNDARY_INVALID');
    expect(report.decision).toBe('COMPETING_RELATION_SETTLEMENT_CANDIDATE_COVERAGE_EVALUATION_NOT_READY');
    expect(report.exactI235BoundaryAccepted).toBe(false);
    expect(report.coverageEvaluationAuthorized).toBe(false);
    expect(report.evaluationCandidateCount).toBe(0);
    expect(report.requirementCount).toBe(0);
    expect(report.matrixCellCount).toBe(0);
    expect(report.coverageEvaluationControlCount).toBe(0);
    expect(report.authorityGap).toBe('UPSTREAM_INVALID');
    expect(report.recommendedNextGate).toBe(
      'COMPETING_RELATION_SETTLEMENT_CANDIDATE_EVIDENCE_ADEQUACY_COVERAGE_EVALUATION_READINESS_REVIEW',
    );
  });
});
