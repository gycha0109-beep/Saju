import { describe, expect, it } from 'vitest';
import { buildI233ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityGapRequirementsReview } from '../src/research/i233-challenge-combination-support-channel-competing-relation-settlement-authority-gap-requirements-review.js';
import { buildI234ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityDiscoveryReadinessReview } from '../src/research/i234-challenge-combination-support-channel-competing-relation-settlement-authority-discovery-readiness-review.js';
import { buildI235ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityDiscoveryEvidence } from '../src/research/i235-challenge-combination-support-channel-competing-relation-settlement-authority-discovery-evidence.js';
import { buildI236ChallengeCombinationSupportChannelCompetingRelationSettlementCandidateEvidenceAdequacyCoverageEvaluationReadinessReview } from '../src/research/i236-challenge-combination-support-channel-competing-relation-settlement-candidate-evidence-adequacy-coverage-evaluation-readiness-review.js';
import { buildI237ChallengeCombinationSupportChannelCompetingRelationSettlementCandidateEvidenceAdequacyCoverageEvaluationEvidence } from '../src/research/i237-challenge-combination-support-channel-competing-relation-settlement-candidate-evidence-adequacy-coverage-evaluation-evidence.js';
import { buildI238ChallengeCombinationSupportChannelCompetingRelationSettlementCoverageEvidenceAdequacyResidualRequirementsReassessmentReview } from '../src/research/i238-challenge-combination-support-channel-competing-relation-settlement-coverage-evidence-adequacy-residual-requirements-reassessment-review.js';
import { buildI239ChallengeCombinationSupportChannelCompetingRelationSettlementThreeResidualRequirementTargetedAuthorityDiscoveryReadinessReview } from '../src/research/i239-challenge-combination-support-channel-competing-relation-settlement-three-residual-requirement-targeted-authority-discovery-readiness-review.js';
import { buildI240ChallengeCombinationSupportChannelCompetingRelationSettlementThreeResidualRequirementTargetedAuthorityDiscoveryEvidence } from '../src/research/i240-challenge-combination-support-channel-competing-relation-settlement-three-residual-requirement-targeted-authority-discovery-evidence.js';
import {
  I241_REMAINING_ADMISSIBILITY_GAP_IDS,
  buildI241ChallengeCombinationSupportChannelCompetingRelationSettlementThreeResidualTargetedDiscoveryEvidenceAdequacySourceRelationshipAdmissibilityReassessmentReview,
} from '../src/research/i241-challenge-combination-support-channel-competing-relation-settlement-three-residual-targeted-discovery-evidence-adequacy-source-relationship-admissibility-reassessment-review.js';

const validI240 = () => {
  const i233 = buildI233ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityGapRequirementsReview();
  const i234 = buildI234ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityDiscoveryReadinessReview(i233);
  const i235 = buildI235ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityDiscoveryEvidence(i234);
  const i236 = buildI236ChallengeCombinationSupportChannelCompetingRelationSettlementCandidateEvidenceAdequacyCoverageEvaluationReadinessReview(i235);
  const i237 = buildI237ChallengeCombinationSupportChannelCompetingRelationSettlementCandidateEvidenceAdequacyCoverageEvaluationEvidence(i236, i235);
  const i238 = buildI238ChallengeCombinationSupportChannelCompetingRelationSettlementCoverageEvidenceAdequacyResidualRequirementsReassessmentReview(i237);
  const i239 = buildI239ChallengeCombinationSupportChannelCompetingRelationSettlementThreeResidualRequirementTargetedAuthorityDiscoveryReadinessReview(i238);
  return buildI240ChallengeCombinationSupportChannelCompetingRelationSettlementThreeResidualRequirementTargetedAuthorityDiscoveryEvidence(i239);
};

describe('I241 competing-relation source relationship/admissibility reassessment', () => {
  it('accepts the exact I240 evidence boundary and marks residual direct coverage adequate', () => {
    const report = buildI241ChallengeCombinationSupportChannelCompetingRelationSettlementThreeResidualTargetedDiscoveryEvidenceAdequacySourceRelationshipAdmissibilityReassessmentReview(validI240());
    expect(report.status).toBe(
      'RESOLVED_COMPETING_RELATION_SETTLEMENT_THREE_RESIDUAL_TARGETED_DISCOVERY_EVIDENCE_ADEQUACY_SOURCE_RELATIONSHIP_ADMISSIBILITY_REASSESSMENT_REVIEW',
    );
    expect(report.decision).toBe(
      'I240_EVIDENCE_ADEQUATE_FOR_THREE_RESIDUAL_DIRECT_COVERAGE_FOUR_SOURCE_ADMISSIBILITY_GAPS_REMAIN_CANONICAL_IDENTITY_EXACT_PASSAGE_DERIVATIVE_RELATIONSHIP_AND_RULE_BEARING_STATUS_TARGETED_ACQUISITION_JUSTIFIED_NO_AUTHORITY_PROMOTION',
    );
    expect(report.exactI240BoundaryAccepted).toBe(true);
    expect(report.i240EvidenceAdequateForResidualDirectCoverage).toBe(true);
    expect(report.residualDirectCoverageRequirementCount).toBe(3);
    expect(report.residualDirectCoverageGapCountAfterI240).toBe(0);
    expect(report.allThreeResidualClassesHaveDirectCandidateLocalWitness).toBe(true);
  });

  it('preserves the observed witnesses without converting same-text replication into independence', () => {
    const report = buildI241ChallengeCombinationSupportChannelCompetingRelationSettlementThreeResidualTargetedDiscoveryEvidenceAdequacySourceRelationshipAdmissibilityReassessmentReview(validI240());
    expect(report.yudingAllThreeResidualDirectCandidateCount).toBe(2);
    expect(report.separateZipingZhenquanRoleDirectWitnessPreserved).toBe(true);
    expect(report.sameTextYudingWitnessesPreservedAsNonIndependentPendingAdjudication).toBe(true);
    expect(report.sinaRepostMetadataAcceptedAsObservedOnly).toBe(true);
    expect(report.embedded2011AttributionAcceptedAsCanonicalProof).toBe(false);
  });

  it('freezes exactly four source-admissibility gaps after direct coverage is satisfied', () => {
    const report = buildI241ChallengeCombinationSupportChannelCompetingRelationSettlementThreeResidualTargetedDiscoveryEvidenceAdequacySourceRelationshipAdmissibilityReassessmentReview(validI240());
    expect(I241_REMAINING_ADMISSIBILITY_GAP_IDS).toEqual([
      'YUDING_SUIJINLU_CANONICAL_TEXT_IDENTITY_BINDING_GAP',
      'YUDING_SUIJINLU_CANONICAL_EXACT_PASSAGE_BINDING_GAP',
      'YUDING_SUIJINLU_WITNESS_DERIVATIVE_RELATIONSHIP_GAP',
      'YUDING_SUIJINLU_NORMATIVE_RULE_BEARING_ADMISSIBILITY_GAP',
    ]);
    expect(report.remainingAdmissibilityGapIds).toEqual(I241_REMAINING_ADMISSIBILITY_GAP_IDS);
    expect(report.remainingAdmissibilityGapCount).toBe(4);
    expect(report.canonicalIdentityEstablishedByI240).toBe(false);
    expect(report.canonicalExactPassageBindingEstablishedByI240).toBe(false);
    expect(report.derivativeRelationshipEstablishedByI240).toBe(false);
    expect(report.normativeRuleBearingAdmissibilityEstablishedByI240).toBe(false);
  });

  it('redirects work from general rule discovery to canonical/provenance acquisition', () => {
    const report = buildI241ChallengeCombinationSupportChannelCompetingRelationSettlementThreeResidualTargetedDiscoveryEvidenceAdequacySourceRelationshipAdmissibilityReassessmentReview(validI240());
    expect(report.targetedCanonicalAndProvenanceAcquisitionMethodologicallyJustified).toBe(true);
    expect(report.equivalentGeneralRuleDiscoveryRepeatJustified).toBe(false);
    expect(report.alreadyDirectResidualRuleRediscoveryRequired).toBe(false);
    expect(report.sourceRelationshipAndAdmissibilityAcquisitionAuthorized).toBe(true);
    expect(report.acquisitionExecutedByThisGate).toBe(false);
    expect(report.recommendedNextGate).toBe(
      'COMPETING_RELATION_SETTLEMENT_YUDING_SUIJINLU_FOUR_GAP_CANONICAL_PROVENANCE_ADMISSIBILITY_ACQUISITION_READINESS_REVIEW',
    );
  });

  it('does not close the settlement authority gap or authorize downstream verdicts', () => {
    const report = buildI241ChallengeCombinationSupportChannelCompetingRelationSettlementThreeResidualTargetedDiscoveryEvidenceAdequacySourceRelationshipAdmissibilityReassessmentReview(validI240());
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

  it('preserves I232, I132, Qu Wei, Li 1998, v2, provenance and production guards', () => {
    const report = buildI241ChallengeCombinationSupportChannelCompetingRelationSettlementThreeResidualTargetedDiscoveryEvidenceAdequacySourceRelationshipAdmissibilityReassessmentReview(validI240());
    expect(report.hiddenStemI232HoldPreserved).toBe(true);
    expect(report.hiddenStemTrackReopenedByThisGate).toBe(false);
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

  it('keeps the three residual requirement ids visible even though their direct coverage gaps are retired', () => {
    const report = buildI241ChallengeCombinationSupportChannelCompetingRelationSettlementThreeResidualTargetedDiscoveryEvidenceAdequacySourceRelationshipAdmissibilityReassessmentReview(validI240());
    expect(report.residualRequirementIds).toEqual([
      'CURRENT_VS_COMPETING_ROLE_SCOPE_EXPLICIT',
      'PRECEDENCE_VS_RELATION_OUTCOME_SEPARATION',
      'TIE_CONFLICT_OR_UNRESOLVED_FAIL_CLOSED_DISPOSITION',
    ]);
  });

  it('fails closed when the I240 discovery-evidence boundary changes', () => {
    const i240 = validI240();
    const invalid = { ...i240, allThreeResidualDirectCandidateCount: 0 } as unknown as typeof i240;
    const report = buildI241ChallengeCombinationSupportChannelCompetingRelationSettlementThreeResidualTargetedDiscoveryEvidenceAdequacySourceRelationshipAdmissibilityReassessmentReview(invalid);
    expect(report.status).toBe('I240_TARGETED_DISCOVERY_EVIDENCE_BOUNDARY_INVALID');
    expect(report.i240EvidenceAdequateForResidualDirectCoverage).toBe(false);
    expect(report.remainingAdmissibilityGapCount).toBe(0);
    expect(report.sourceRelationshipAndAdmissibilityAcquisitionAuthorized).toBe(false);
    expect(report.authorityGap).toBe('UPSTREAM_INVALID');
    expect(report.recommendedNextGate).toBe(
      'COMPETING_RELATION_SETTLEMENT_THREE_RESIDUAL_TARGETED_DISCOVERY_EVIDENCE_ADEQUACY_SOURCE_RELATIONSHIP_ADMISSIBILITY_REASSESSMENT_REVIEW',
    );
  });
});
