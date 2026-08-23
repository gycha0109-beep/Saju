import { describe, expect, it } from 'vitest';
import { buildI233ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityGapRequirementsReview } from '../src/research/i233-challenge-combination-support-channel-competing-relation-settlement-authority-gap-requirements-review.js';
import { buildI234ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityDiscoveryReadinessReview } from '../src/research/i234-challenge-combination-support-channel-competing-relation-settlement-authority-discovery-readiness-review.js';
import { buildI235ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityDiscoveryEvidence } from '../src/research/i235-challenge-combination-support-channel-competing-relation-settlement-authority-discovery-evidence.js';
import { buildI236ChallengeCombinationSupportChannelCompetingRelationSettlementCandidateEvidenceAdequacyCoverageEvaluationReadinessReview } from '../src/research/i236-challenge-combination-support-channel-competing-relation-settlement-candidate-evidence-adequacy-coverage-evaluation-readiness-review.js';
import { buildI237ChallengeCombinationSupportChannelCompetingRelationSettlementCandidateEvidenceAdequacyCoverageEvaluationEvidence } from '../src/research/i237-challenge-combination-support-channel-competing-relation-settlement-candidate-evidence-adequacy-coverage-evaluation-evidence.js';
import { buildI238ChallengeCombinationSupportChannelCompetingRelationSettlementCoverageEvidenceAdequacyResidualRequirementsReassessmentReview } from '../src/research/i238-challenge-combination-support-channel-competing-relation-settlement-coverage-evidence-adequacy-residual-requirements-reassessment-review.js';
import { buildI239ChallengeCombinationSupportChannelCompetingRelationSettlementThreeResidualRequirementTargetedAuthorityDiscoveryReadinessReview } from '../src/research/i239-challenge-combination-support-channel-competing-relation-settlement-three-residual-requirement-targeted-authority-discovery-readiness-review.js';
import {
  I240_DISCOVERY_CANDIDATE_IDS,
  buildI240ChallengeCombinationSupportChannelCompetingRelationSettlementThreeResidualRequirementTargetedAuthorityDiscoveryEvidence,
} from '../src/research/i240-challenge-combination-support-channel-competing-relation-settlement-three-residual-requirement-targeted-authority-discovery-evidence.js';

const validI239 = () => {
  const i233 = buildI233ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityGapRequirementsReview();
  const i234 = buildI234ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityDiscoveryReadinessReview(i233);
  const i235 = buildI235ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityDiscoveryEvidence(i234);
  const i236 = buildI236ChallengeCombinationSupportChannelCompetingRelationSettlementCandidateEvidenceAdequacyCoverageEvaluationReadinessReview(i235);
  const i237 = buildI237ChallengeCombinationSupportChannelCompetingRelationSettlementCandidateEvidenceAdequacyCoverageEvaluationEvidence(i236, i235);
  const i238 = buildI238ChallengeCombinationSupportChannelCompetingRelationSettlementCoverageEvidenceAdequacyResidualRequirementsReassessmentReview(i237);
  return buildI239ChallengeCombinationSupportChannelCompetingRelationSettlementThreeResidualRequirementTargetedAuthorityDiscoveryReadinessReview(i238);
};

describe('I240 competing-relation three-residual targeted discovery evidence', () => {
  it('executes the exact I239 five-path targeted discovery boundary', () => {
    const report = buildI240ChallengeCombinationSupportChannelCompetingRelationSettlementThreeResidualRequirementTargetedAuthorityDiscoveryEvidence(validI239());
    expect(report.status).toBe(
      'RESOLVED_COMPETING_RELATION_SETTLEMENT_THREE_RESIDUAL_REQUIREMENT_TARGETED_AUTHORITY_DISCOVERY_EVIDENCE',
    );
    expect(report.decision).toBe(
      'FIVE_TARGETED_PATHS_EXECUTED_TWO_SAME_TEXT_YUDING_SUIJINLU_WITNESSES_DIRECTLY_COVER_ALL_THREE_RESIDUALS_ONE_ZIPING_ZHENQUAN_DIRECT_ROLE_MAPPING_WITNESS_OBSERVED_THREE_RESIDUAL_DIRECT_COVERAGE_CLASSES_MATERIALLY_IMPROVED_SOURCE_RELATIONSHIP_AND_ADMISSIBILITY_NOT_ADJUDICATED_NO_UNION_NO_PROMOTION',
    );
    expect(report.exactI239BoundaryAccepted).toBe(true);
    expect(report.discoveryExecuted).toBe(true);
    expect(report.executedDiscoveryPathCount).toBe(5);
  });

  it('records exactly three directly opened non-lead HTML candidates', () => {
    const report = buildI240ChallengeCombinationSupportChannelCompetingRelationSettlementThreeResidualRequirementTargetedAuthorityDiscoveryEvidence(validI239());
    expect(report.candidateRecordCount).toBe(3);
    expect(report.directlyOpenedHtmlCandidateCount).toBe(3);
    expect(report.leadOnlyCandidateCount).toBe(0);
    expect(report.candidateRecords.map((record) => record.candidateId)).toEqual(I240_DISCOVERY_CANDIDATE_IDS);
    expect(report.candidateRecords.every((record) => record.directlyOpenedHtmlContext)).toBe(true);
    expect(report.candidateRecords.every((record) => record.sourceBoundRuleTextObserved)).toBe(true);
    expect(report.candidateRecords.every((record) => record.leadOnly === false)).toBe(true);
  });

  it('observes candidate-local direct coverage for all three residual classes without union coverage', () => {
    const report = buildI240ChallengeCombinationSupportChannelCompetingRelationSettlementThreeResidualRequirementTargetedAuthorityDiscoveryEvidence(validI239());
    expect(report.materiallyNewDirectResidualCoverageRequirementIds).toEqual([
      'CURRENT_VS_COMPETING_ROLE_SCOPE_EXPLICIT',
      'PRECEDENCE_VS_RELATION_OUTCOME_SEPARATION',
      'TIE_CONFLICT_OR_UNRESOLVED_FAIL_CLOSED_DISPOSITION',
    ]);
    expect(report.materiallyNewDirectResidualCoverageRequirementCount).toBe(3);
    expect(report.currentVsCompetingRoleScopeDirectCoverageObserved).toBe(true);
    expect(report.precedenceVsRelationOutcomeSeparationDirectCoverageObserved).toBe(true);
    expect(report.tieConflictOrUnresolvedFailClosedDispositionDirectCoverageObserved).toBe(true);
    expect(report.allThreeResidualDirectCandidateCount).toBe(2);
    expect(report.candidateSetUnionCoveragePerformed).toBe(false);
    expect(report.crossSourceCompletionPerformed).toBe(false);
  });

  it('preserves the same-text relationship of the two Yuding Suijinlu witnesses without independence claims', () => {
    const report = buildI240ChallengeCombinationSupportChannelCompetingRelationSettlementThreeResidualRequirementTargetedAuthorityDiscoveryEvidence(validI239());
    const [heyix, sina] = report.candidateRecords;
    expect(heyix?.sameTextFamilyRelationshipStatus).toBe(
      'SAME_YUDING_SUIJINLU_TEXT_FAMILY_RELATIONSHIP_NOT_ADJUDICATED',
    );
    expect(sina?.sameTextFamilyRelationshipStatus).toBe(
      'SAME_YUDING_SUIJINLU_TEXT_FAMILY_RELATIONSHIP_NOT_ADJUDICATED',
    );
    expect(report.sameTextYudingWitnessCount).toBe(2);
    expect(report.sameTextWitnessesMayCountAsIndependentAuthorities).toBe(false);
    expect(report.sourceRelationshipAdjudicatedByThisGate).toBe(false);
    expect(report.provenanceIndependenceAdjudicatedByThisGate).toBe(false);
    expect(report.derivativeRelationshipAdjudicatedByThisGate).toBe(false);
  });

  it('records the Sina repost metadata as observed but does not verify the embedded upstream attribution', () => {
    const report = buildI240ChallengeCombinationSupportChannelCompetingRelationSettlementThreeResidualRequirementTargetedAuthorityDiscoveryEvidence(validI239());
    const sina = report.candidateRecords[1];
    expect(report.sina2012RepostDateDirectlyObserved).toBe(true);
    expect(report.sinaEmbeddedOriginal2011TimestampObserved).toBe(true);
    expect(report.sinaEmbeddedOriginalAuthorAttributionObserved).toBe(true);
    expect(report.embeddedUpstreamAttributionVerifiedByThisGate).toBe(false);
    expect(sina?.embeddedUpstreamAttributionObserved).toBe(true);
    expect(sina?.embeddedUpstreamAttributionVerifiedByThisGate).toBe(false);
    expect(sina?.publishedContext).toContain('2012-09-24');
    expect(sina?.publishedContext).toContain('2011-12-23');
    expect(sina?.publishedContext).toContain('尚慈居士');
  });

  it('keeps the separate Ziping Zhenquan witness conservative outside its direct role-selection passage', () => {
    const report = buildI240ChallengeCombinationSupportChannelCompetingRelationSettlementThreeResidualRequirementTargetedAuthorityDiscoveryEvidence(validI239());
    const ziping = report.candidateRecords[2];
    expect(ziping?.sameTextFamilyRelationshipStatus).toBe('SEPARATE_ZIPING_ZHENQUAN_TEXT');
    expect(ziping?.residualCoverage.map((cell) => cell.coverage)).toEqual([
      'DIRECT',
      'PARTIAL',
      'NOT_ESTABLISHED',
    ]);
    expect(ziping?.directResidualCount).toBe(1);
    expect(ziping?.allThreeResidualsDirectCandidateLocal).toBe(false);
    expect(report.zipingZhenquanOriginalRoleSelectionRuleObserved).toBe(true);
  });

  it('does not promote authority or weaken any global guard despite improved direct coverage', () => {
    const report = buildI240ChallengeCombinationSupportChannelCompetingRelationSettlementThreeResidualRequirementTargetedAuthorityDiscoveryEvidence(validI239());
    expect(report.sourceNormativeAdmissibilityAdjudicatedByThisGate).toBe(false);
    expect(report.authorityGap).toBe('COMPETING_RELATION_SETTLEMENT_AUTHORITY_NOT_ESTABLISHED');
    expect(report.authorityGapClosed).toBe(false);
    expect(report.authorityPromotedByThisGate).toBe(false);
    expect(report.competingRelationSettlementResolved).toBe(false);
    expect(report.crossRelationPrecedenceAuthorized).toBe(false);
    expect(report.multiTouchAggregationAuthorized).toBe(false);
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
    expect(report.recommendedNextGate).toBe(
      'COMPETING_RELATION_SETTLEMENT_THREE_RESIDUAL_TARGETED_DISCOVERY_EVIDENCE_ADEQUACY_SOURCE_RELATIONSHIP_ADMISSIBILITY_REASSESSMENT_REVIEW',
    );
  });

  it('fails closed when the I239 discovery contract boundary is altered', () => {
    const i239 = validI239();
    const invalid = { ...i239, discoveryPathCount: 0 } as unknown as typeof i239;
    const report = buildI240ChallengeCombinationSupportChannelCompetingRelationSettlementThreeResidualRequirementTargetedAuthorityDiscoveryEvidence(invalid);
    expect(report.status).toBe('I239_TARGETED_DISCOVERY_BOUNDARY_INVALID');
    expect(report.discoveryExecuted).toBe(false);
    expect(report.candidateRecordCount).toBe(0);
    expect(report.materiallyNewDirectResidualCoverageRequirementCount).toBe(0);
    expect(report.authorityGap).toBe('UPSTREAM_INVALID');
    expect(report.recommendedNextGate).toBe(
      'COMPETING_RELATION_SETTLEMENT_THREE_RESIDUAL_REQUIREMENT_TARGETED_AUTHORITY_DISCOVERY_EVIDENCE',
    );
  });
});
