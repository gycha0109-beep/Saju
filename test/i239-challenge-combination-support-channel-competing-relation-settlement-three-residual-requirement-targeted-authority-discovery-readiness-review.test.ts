import { describe, expect, it } from 'vitest';
import { buildI233ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityGapRequirementsReview } from '../src/research/i233-challenge-combination-support-channel-competing-relation-settlement-authority-gap-requirements-review.js';
import { buildI234ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityDiscoveryReadinessReview } from '../src/research/i234-challenge-combination-support-channel-competing-relation-settlement-authority-discovery-readiness-review.js';
import { buildI235ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityDiscoveryEvidence } from '../src/research/i235-challenge-combination-support-channel-competing-relation-settlement-authority-discovery-evidence.js';
import { buildI236ChallengeCombinationSupportChannelCompetingRelationSettlementCandidateEvidenceAdequacyCoverageEvaluationReadinessReview } from '../src/research/i236-challenge-combination-support-channel-competing-relation-settlement-candidate-evidence-adequacy-coverage-evaluation-readiness-review.js';
import { buildI237ChallengeCombinationSupportChannelCompetingRelationSettlementCandidateEvidenceAdequacyCoverageEvaluationEvidence } from '../src/research/i237-challenge-combination-support-channel-competing-relation-settlement-candidate-evidence-adequacy-coverage-evaluation-evidence.js';
import { buildI238ChallengeCombinationSupportChannelCompetingRelationSettlementCoverageEvidenceAdequacyResidualRequirementsReassessmentReview } from '../src/research/i238-challenge-combination-support-channel-competing-relation-settlement-coverage-evidence-adequacy-residual-requirements-reassessment-review.js';
import {
  I239_TARGETED_DISCOVERY_CONTROL_IDS,
  I239_TARGETED_DISCOVERY_PATH_IDS,
  buildI239ChallengeCombinationSupportChannelCompetingRelationSettlementThreeResidualRequirementTargetedAuthorityDiscoveryReadinessReview,
} from '../src/research/i239-challenge-combination-support-channel-competing-relation-settlement-three-residual-requirement-targeted-authority-discovery-readiness-review.js';

const validI238 = () => {
  const i233 = buildI233ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityGapRequirementsReview();
  const i234 = buildI234ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityDiscoveryReadinessReview(i233);
  const i235 = buildI235ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityDiscoveryEvidence(i234);
  const i236 = buildI236ChallengeCombinationSupportChannelCompetingRelationSettlementCandidateEvidenceAdequacyCoverageEvaluationReadinessReview(i235);
  const i237 = buildI237ChallengeCombinationSupportChannelCompetingRelationSettlementCandidateEvidenceAdequacyCoverageEvaluationEvidence(i236, i235);
  return buildI238ChallengeCombinationSupportChannelCompetingRelationSettlementCoverageEvidenceAdequacyResidualRequirementsReassessmentReview(i237);
};

describe('I239 competing-relation three-residual targeted discovery readiness', () => {
  it('accepts the exact I238 boundary and freezes a discovery-only readiness gate', () => {
    const report = buildI239ChallengeCombinationSupportChannelCompetingRelationSettlementThreeResidualRequirementTargetedAuthorityDiscoveryReadinessReview(validI238());
    expect(report.status).toBe(
      'RESOLVED_COMPETING_RELATION_SETTLEMENT_THREE_RESIDUAL_REQUIREMENT_TARGETED_AUTHORITY_DISCOVERY_READINESS_REVIEW',
    );
    expect(report.decision).toBe(
      'THREE_RESIDUAL_REQUIREMENTS_FIVE_TARGETED_DISCOVERY_PATHS_EIGHTEEN_CONTROLS_FROZEN_DIRECT_RULE_LEVEL_EVIDENCE_ONLY_NO_DISCOVERY_EXECUTED_NO_AUTHORITY_PROMOTION',
    );
    expect(report.exactI238BoundaryAccepted).toBe(true);
    expect(report.discoveryContractFrozen).toBe(true);
    expect(report.targetedDiscoveryAuthorized).toBe(true);
    expect(report.discoveryExecutedByThisGate).toBe(false);
  });

  it('targets exactly the three residual requirements and five discovery paths', () => {
    const report = buildI239ChallengeCombinationSupportChannelCompetingRelationSettlementThreeResidualRequirementTargetedAuthorityDiscoveryReadinessReview(validI238());
    expect(report.residualRequirementIds).toEqual([
      'CURRENT_VS_COMPETING_ROLE_SCOPE_EXPLICIT',
      'PRECEDENCE_VS_RELATION_OUTCOME_SEPARATION',
      'TIE_CONFLICT_OR_UNRESOLVED_FAIL_CLOSED_DISPOSITION',
    ]);
    expect(report.residualRequirementCount).toBe(3);
    expect(report.discoveryPathIds).toEqual(I239_TARGETED_DISCOVERY_PATH_IDS);
    expect(report.discoveryPathCount).toBe(5);
  });

  it('freezes all eighteen direct-evidence discovery controls', () => {
    const report = buildI239ChallengeCombinationSupportChannelCompetingRelationSettlementThreeResidualRequirementTargetedAuthorityDiscoveryReadinessReview(validI238());
    expect(report.discoveryControlIds).toEqual(I239_TARGETED_DISCOVERY_CONTROL_IDS);
    expect(report.discoveryControlCount).toBe(18);
    expect(report.discoveryControlIds).toContain('SOURCE_BOUND_DIRECT_RULE_TEXT_REQUIRED_FOR_DIRECT_COVERAGE');
    expect(report.discoveryControlIds).toContain('CANDIDATE_SET_UNION_OR_CROSS_SOURCE_COMPLETION_FORBIDDEN');
    expect(report.discoveryControlIds).toContain('NO_NEGATIVE_OR_EXHAUSTION_FINDING_FROM_DISCOVERY_SILENCE_OR_ACCESS_FAILURE');
  });

  it('requires explicit system role mapping and forbids example-derived role inference', () => {
    const report = buildI239ChallengeCombinationSupportChannelCompetingRelationSettlementThreeResidualRequirementTargetedAuthorityDiscoveryReadinessReview(validI238());
    expect(report.currentVsCompetingRoleMappingDirectRuleRequired).toBe(true);
    expect(report.currentVsCompetingRoleMappingMayBeInferredFromExample).toBe(false);
  });

  it('separates precedence operation from relation outcome and requires explicit unresolved disposition', () => {
    const report = buildI239ChallengeCombinationSupportChannelCompetingRelationSettlementThreeResidualRequirementTargetedAuthorityDiscoveryReadinessReview(validI238());
    expect(report.precedenceOperationVsOutcomeSeparationDirectRuleRequired).toBe(true);
    expect(report.precedenceAndOutcomeMayBeCollapsedByInference).toBe(false);
    expect(report.tieConflictUnresolvedExplicitDispositionRequired).toBe(true);
    expect(report.silenceMayEstablishFailClosedDisposition).toBe(false);
    expect(report.boundedDeferredOrNonDecisionEquivalentMayQualifyIfExplicit).toBe(true);
  });

  it('rejects generic explanations, snippets, partial upgrades, union coverage, and reopened direct classes', () => {
    const report = buildI239ChallengeCombinationSupportChannelCompetingRelationSettlementThreeResidualRequirementTargetedAuthorityDiscoveryReadinessReview(validI238());
    expect(report.generalCombinationClashExplanationMayCountAsProgress).toBe(false);
    expect(report.searchSnippetMayCreateDirectCoverage).toBe(false);
    expect(report.fiveAlreadyDirectRequirementClassesReopened).toBe(false);
    expect(report.existingPartialCoverageMayAutoUpgradeToDirect).toBe(false);
    expect(report.candidateSetUnionCoverageAuthorized).toBe(false);
    expect(report.crossSourceCompletionAuthorized).toBe(false);
    expect(report.sameWorkOrCommentaryTargetedCrossCheckAuthorized).toBe(true);
    expect(report.independentRuleLevelSourceSearchAuthorized).toBe(true);
  });

  it('preserves the unresolved settlement and every global guard', () => {
    const report = buildI239ChallengeCombinationSupportChannelCompetingRelationSettlementThreeResidualRequirementTargetedAuthorityDiscoveryReadinessReview(validI238());
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
    expect(report.hiddenStemI232HoldPreserved).toBe(true);
    expect(report.hiddenStemTrackReopenedByThisGate).toBe(false);
    expect(report.quWei2001HoldPreserved).toBe(true);
    expect(report.li1998SameTargetPathSuspendedNotRetired).toBe(true);
    expect(report.I132IndependentNormativeProvenanceRequirementRemainsNormative).toBe(true);
    expect(report.I132PolicyRelaxationAuthorizedByThisGate).toBe(false);
    expect(report.currentV2PackageAndCandidateSetRemainImmutable).toBe(true);
    expect(report.currentV2ProvenanceDisposition).toBe('BLOCKED_UNDER_CURRENT_EVIDENCE');
    expect(report.evidenceRebindingAuthorizedByThisGate).toBe(false);
    expect(report.provenanceIndependenceAdjudicatedByThisGate).toBe(false);
    expect(report.derivativeRelationshipAdjudicatedByThisGate).toBe(false);
    expect(report.actualCompositionPerformedByThisGate).toBe(false);
    expect(report.multiSourceCompositionAuthorized).toBe(false);
    expect(report.thresholdRuleCreatedByThisGate).toBe(false);
    expect(report.damageEvaluationAuthorized).toBe(false);
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
    expect(report.productionPolicyExecutionAuthorized).toBe(false);
    expect(report.negativeFindingCreatedByThisGate).toBe(false);
    expect(report.discoveryExhaustionClaimed).toBe(false);
    expect(report.corpusExhaustionClaimed).toBe(false);
  });

  it('fails closed when the I238 three-residual boundary changes', () => {
    const i238 = validI238();
    const invalid = { ...i238, residualRequirementCount: 0 } as unknown as typeof i238;
    const report = buildI239ChallengeCombinationSupportChannelCompetingRelationSettlementThreeResidualRequirementTargetedAuthorityDiscoveryReadinessReview(invalid);
    expect(report.status).toBe('I238_RESIDUAL_REASSESSMENT_BOUNDARY_INVALID');
    expect(report.targetedDiscoveryAuthorized).toBe(false);
    expect(report.discoveryPathCount).toBe(0);
    expect(report.discoveryControlCount).toBe(0);
    expect(report.authorityGap).toBe('UPSTREAM_INVALID');
    expect(report.recommendedNextGate).toBe(
      'COMPETING_RELATION_SETTLEMENT_THREE_RESIDUAL_REQUIREMENT_TARGETED_AUTHORITY_DISCOVERY_READINESS_REVIEW',
    );
  });
});
