import { describe, expect, it } from 'vitest';
import { buildI233ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityGapRequirementsReview } from '../src/research/i233-challenge-combination-support-channel-competing-relation-settlement-authority-gap-requirements-review.js';
import { buildI234ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityDiscoveryReadinessReview } from '../src/research/i234-challenge-combination-support-channel-competing-relation-settlement-authority-discovery-readiness-review.js';
import { buildI235ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityDiscoveryEvidence } from '../src/research/i235-challenge-combination-support-channel-competing-relation-settlement-authority-discovery-evidence.js';
import { buildI236ChallengeCombinationSupportChannelCompetingRelationSettlementCandidateEvidenceAdequacyCoverageEvaluationReadinessReview } from '../src/research/i236-challenge-combination-support-channel-competing-relation-settlement-candidate-evidence-adequacy-coverage-evaluation-readiness-review.js';
import { buildI237ChallengeCombinationSupportChannelCompetingRelationSettlementCandidateEvidenceAdequacyCoverageEvaluationEvidence } from '../src/research/i237-challenge-combination-support-channel-competing-relation-settlement-candidate-evidence-adequacy-coverage-evaluation-evidence.js';
import {
  I238_RESIDUAL_REQUIREMENT_IDS,
  buildI238ChallengeCombinationSupportChannelCompetingRelationSettlementCoverageEvidenceAdequacyResidualRequirementsReassessmentReview,
} from '../src/research/i238-challenge-combination-support-channel-competing-relation-settlement-coverage-evidence-adequacy-residual-requirements-reassessment-review.js';

const validI237 = () => {
  const i233 = buildI233ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityGapRequirementsReview();
  const i234 = buildI234ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityDiscoveryReadinessReview(i233);
  const i235 = buildI235ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityDiscoveryEvidence(i234);
  const i236 = buildI236ChallengeCombinationSupportChannelCompetingRelationSettlementCandidateEvidenceAdequacyCoverageEvaluationReadinessReview(i235);
  return buildI237ChallengeCombinationSupportChannelCompetingRelationSettlementCandidateEvidenceAdequacyCoverageEvaluationEvidence(i236, i235);
};

describe('I238 competing-relation residual-requirements reassessment review', () => {
  it('accepts the exact I237 evidence boundary and marks the evidence adequate for reassessment', () => {
    const report = buildI238ChallengeCombinationSupportChannelCompetingRelationSettlementCoverageEvidenceAdequacyResidualRequirementsReassessmentReview(validI237());
    expect(report.status).toBe(
      'RESOLVED_COMPETING_RELATION_SETTLEMENT_COVERAGE_EVIDENCE_ADEQUACY_RESIDUAL_REQUIREMENTS_REASSESSMENT_REVIEW',
    );
    expect(report.decision).toBe(
      'I237_EVIDENCE_ADEQUATE_THREE_SUBSTANTIVE_DIRECT_COVERAGE_RESIDUALS_IDENTIFIED_TARGETED_RULE_LEVEL_DISCOVERY_METHODOLOGICALLY_JUSTIFIED_NO_UNION_COVERAGE_NO_AUTHORITY_PROMOTION',
    );
    expect(report.exactI237BoundaryAccepted).toBe(true);
    expect(report.evidenceAdequacyAccepted).toBe(true);
  });

  it('accepts the exact 3 x 8 matrix counts without reopening the evaluated matrix', () => {
    const report = buildI238ChallengeCombinationSupportChannelCompetingRelationSettlementCoverageEvidenceAdequacyResidualRequirementsReassessmentReview(validI237());
    expect(report.acceptedCandidateCount).toBe(3);
    expect(report.acceptedRequirementCount).toBe(8);
    expect(report.acceptedMatrixCellCount).toBe(24);
    expect(report.acceptedDirectCellCount).toBe(15);
    expect(report.acceptedPartialCellCount).toBe(7);
    expect(report.acceptedConflictCellCount).toBe(0);
    expect(report.acceptedNotEstablishedCellCount).toBe(2);
    expect(report.acceptedDirectRequirementClassCount).toBe(5);
    expect(report.acceptedFullEightRequirementCandidateCount).toBe(0);
  });

  it('freezes exactly the three residual direct-coverage requirements', () => {
    const report = buildI238ChallengeCombinationSupportChannelCompetingRelationSettlementCoverageEvidenceAdequacyResidualRequirementsReassessmentReview(validI237());
    expect(I238_RESIDUAL_REQUIREMENT_IDS).toEqual([
      'CURRENT_VS_COMPETING_ROLE_SCOPE_EXPLICIT',
      'PRECEDENCE_VS_RELATION_OUTCOME_SEPARATION',
      'TIE_CONFLICT_OR_UNRESOLVED_FAIL_CLOSED_DISPOSITION',
    ]);
    expect(report.residualRequirementIds).toEqual(I238_RESIDUAL_REQUIREMENT_IDS);
    expect(report.residualRequirementCount).toBe(3);
    expect(report.currentVsCompetingRoleScopeRemainsDirectlyUnestablished).toBe(true);
    expect(report.precedenceVsRelationOutcomeSeparationRemainsDirectlyUnestablished).toBe(true);
    expect(report.tieConflictOrUnresolvedFailClosedDispositionRemainsDirectlyUnestablished).toBe(true);
  });

  it('authorizes only materially targeted rule-level discovery for the three residuals', () => {
    const report = buildI238ChallengeCombinationSupportChannelCompetingRelationSettlementCoverageEvidenceAdequacyResidualRequirementsReassessmentReview(validI237());
    expect(report.previouslyDirectRequirementClassesNeedReDiscovery).toBe(false);
    expect(report.materiallyTargetedRuleLevelDiscoveryMethodologicallyJustified).toBe(true);
    expect(report.materiallyNewDirectPassageOrMateriallyNewSourceRequired).toBe(true);
    expect(report.equivalentGeneralRelationExplanationCountsAsProgress).toBe(false);
    expect(report.searchSnippetMayCreateDirectCoverage).toBe(false);
    expect(report.targetedDiscoveryReadinessReviewAuthorized).toBe(true);
    expect(report.discoveryExecutedByThisGate).toBe(false);
    expect(report.recommendedNextGate).toBe(
      'COMPETING_RELATION_SETTLEMENT_THREE_RESIDUAL_REQUIREMENT_TARGETED_AUTHORITY_DISCOVERY_READINESS_REVIEW',
    );
  });

  it('forbids partial upgrade, cross-completion, and candidate-set union authority', () => {
    const report = buildI238ChallengeCombinationSupportChannelCompetingRelationSettlementCoverageEvidenceAdequacyResidualRequirementsReassessmentReview(validI237());
    expect(report.existingPartialCoverageMayAutoUpgradeToDirect).toBe(false);
    expect(report.existingCandidatesMayCrossCompleteResiduals).toBe(false);
    expect(report.candidateSetUnionCoverageMaySatisfyResiduals).toBe(false);
    expect(report.sameWorkOrCommentaryRelationshipMustRemainPreserved).toBe(true);
    expect(report.actualCompositionPerformedByThisGate).toBe(false);
    expect(report.multiSourceCompositionAuthorized).toBe(false);
  });

  it('does not resolve settlement or authorize downstream verdicts', () => {
    const report = buildI238ChallengeCombinationSupportChannelCompetingRelationSettlementCoverageEvidenceAdequacyResidualRequirementsReassessmentReview(validI237());
    expect(report.authorityGap).toBe('COMPETING_RELATION_SETTLEMENT_AUTHORITY_NOT_ESTABLISHED');
    expect(report.authorityGapClosed).toBe(false);
    expect(report.authorityPromotedByThisGate).toBe(false);
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

  it('preserves I232, I132, Qu Wei, Li 1998, v2, and production guards', () => {
    const report = buildI238ChallengeCombinationSupportChannelCompetingRelationSettlementCoverageEvidenceAdequacyResidualRequirementsReassessmentReview(validI237());
    expect(report.hiddenStemI232HoldPreserved).toBe(true);
    expect(report.hiddenStemTrackReopenedByThisGate).toBe(false);
    expect(report.hiddenStemAuthorityGap).toBe('SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED');
    expect(report.quWei2001HoldPreserved).toBe(true);
    expect(report.li1998SameTargetPathSuspendedNotRetired).toBe(true);
    expect(report.I132IndependentNormativeProvenanceRequirementRemainsNormative).toBe(true);
    expect(report.I132PolicyRelaxationAuthorizedByThisGate).toBe(false);
    expect(report.currentV2PackageAndCandidateSetRemainImmutable).toBe(true);
    expect(report.currentV2ProvenanceDisposition).toBe('BLOCKED_UNDER_CURRENT_EVIDENCE');
    expect(report.candidateRegisteredByThisGate).toBe(false);
    expect(report.candidateSelectedByThisGate).toBe(false);
    expect(report.candidateSetMutatedByThisGate).toBe(false);
    expect(report.evidenceRebindingAuthorizedByThisGate).toBe(false);
    expect(report.provenanceIndependenceAdjudicatedByThisGate).toBe(false);
    expect(report.derivativeRelationshipAdjudicatedByThisGate).toBe(false);
    expect(report.sourceNormativeAdmissibilityAdjudicatedByThisGate).toBe(false);
    expect(report.thresholdRuleCreatedByThisGate).toBe(false);
    expect(report.damageEvaluationAuthorized).toBe(false);
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
    expect(report.productionPolicyExecutionAuthorized).toBe(false);
    expect(report.negativeFindingCreatedByThisGate).toBe(false);
    expect(report.discoveryExhaustionClaimed).toBe(false);
    expect(report.corpusExhaustionClaimed).toBe(false);
  });

  it('fails closed when the I237 residual boundary is altered', () => {
    const i237 = validI237();
    const invalid = { ...i237, residualDirectCoverageGapRequirementCount: 0 } as unknown as typeof i237;
    const report = buildI238ChallengeCombinationSupportChannelCompetingRelationSettlementCoverageEvidenceAdequacyResidualRequirementsReassessmentReview(invalid);
    expect(report.status).toBe('I237_COVERAGE_EVALUATION_BOUNDARY_INVALID');
    expect(report.evidenceAdequacyAccepted).toBe(false);
    expect(report.residualRequirementCount).toBe(0);
    expect(report.authorityGap).toBe('UPSTREAM_INVALID');
    expect(report.targetedDiscoveryReadinessReviewAuthorized).toBe(false);
    expect(report.recommendedNextGate).toBe(
      'COMPETING_RELATION_SETTLEMENT_COVERAGE_EVIDENCE_ADEQUACY_RESIDUAL_REQUIREMENTS_REASSESSMENT_REVIEW',
    );
  });
});
