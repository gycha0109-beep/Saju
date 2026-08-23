import { describe, expect, it } from 'vitest';
import { buildI233ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityGapRequirementsReview } from '../src/research/i233-challenge-combination-support-channel-competing-relation-settlement-authority-gap-requirements-review.js';
import { buildI234ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityDiscoveryReadinessReview } from '../src/research/i234-challenge-combination-support-channel-competing-relation-settlement-authority-discovery-readiness-review.js';
import { buildI235ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityDiscoveryEvidence } from '../src/research/i235-challenge-combination-support-channel-competing-relation-settlement-authority-discovery-evidence.js';
import { buildI236ChallengeCombinationSupportChannelCompetingRelationSettlementCandidateEvidenceAdequacyCoverageEvaluationReadinessReview } from '../src/research/i236-challenge-combination-support-channel-competing-relation-settlement-candidate-evidence-adequacy-coverage-evaluation-readiness-review.js';
import { buildI237ChallengeCombinationSupportChannelCompetingRelationSettlementCandidateEvidenceAdequacyCoverageEvaluationEvidence } from '../src/research/i237-challenge-combination-support-channel-competing-relation-settlement-candidate-evidence-adequacy-coverage-evaluation-evidence.js';
import { buildI238ChallengeCombinationSupportChannelCompetingRelationSettlementCoverageEvidenceAdequacyResidualRequirementsReassessmentReview } from '../src/research/i238-challenge-combination-support-channel-competing-relation-settlement-coverage-evidence-adequacy-residual-requirements-reassessment-review.js';
import { buildI239ChallengeCombinationSupportChannelCompetingRelationSettlementThreeResidualRequirementTargetedAuthorityDiscoveryReadinessReview } from '../src/research/i239-challenge-combination-support-channel-competing-relation-settlement-three-residual-requirement-targeted-authority-discovery-readiness-review.js';
import { buildI240ChallengeCombinationSupportChannelCompetingRelationSettlementThreeResidualRequirementTargetedAuthorityDiscoveryEvidence } from '../src/research/i240-challenge-combination-support-channel-competing-relation-settlement-three-residual-requirement-targeted-authority-discovery-evidence.js';
import { buildI241ChallengeCombinationSupportChannelCompetingRelationSettlementThreeResidualTargetedDiscoveryEvidenceAdequacySourceRelationshipAdmissibilityReassessmentReview } from '../src/research/i241-challenge-combination-support-channel-competing-relation-settlement-three-residual-targeted-discovery-evidence-adequacy-source-relationship-admissibility-reassessment-review.js';
import {
  I242_ACQUISITION_CONTROL_IDS,
  I242_ACQUISITION_PATH_IDS,
  buildI242ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluFourGapCanonicalProvenanceAdmissibilityAcquisitionReadinessReview,
} from '../src/research/i242-challenge-combination-support-channel-competing-relation-settlement-yuding-suijinlu-four-gap-canonical-provenance-admissibility-acquisition-readiness-review.js';

const validI241 = () => {
  const i233 = buildI233ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityGapRequirementsReview();
  const i234 = buildI234ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityDiscoveryReadinessReview(i233);
  const i235 = buildI235ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityDiscoveryEvidence(i234);
  const i236 = buildI236ChallengeCombinationSupportChannelCompetingRelationSettlementCandidateEvidenceAdequacyCoverageEvaluationReadinessReview(i235);
  const i237 = buildI237ChallengeCombinationSupportChannelCompetingRelationSettlementCandidateEvidenceAdequacyCoverageEvaluationEvidence(i236, i235);
  const i238 = buildI238ChallengeCombinationSupportChannelCompetingRelationSettlementCoverageEvidenceAdequacyResidualRequirementsReassessmentReview(i237);
  const i239 = buildI239ChallengeCombinationSupportChannelCompetingRelationSettlementThreeResidualRequirementTargetedAuthorityDiscoveryReadinessReview(i238);
  const i240 = buildI240ChallengeCombinationSupportChannelCompetingRelationSettlementThreeResidualRequirementTargetedAuthorityDiscoveryEvidence(i239);
  return buildI241ChallengeCombinationSupportChannelCompetingRelationSettlementThreeResidualTargetedDiscoveryEvidenceAdequacySourceRelationshipAdmissibilityReassessmentReview(i240);
};

describe('I242 Yuding Suijinlu canonical/provenance/admissibility acquisition readiness', () => {
  it('accepts exact I241 and freezes the four remaining source-admissibility gaps', () => {
    const report = buildI242ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluFourGapCanonicalProvenanceAdmissibilityAcquisitionReadinessReview(validI241());
    expect(report.status).toBe('RESOLVED_COMPETING_RELATION_SETTLEMENT_YUDING_SUIJINLU_FOUR_GAP_CANONICAL_PROVENANCE_ADMISSIBILITY_ACQUISITION_READINESS_REVIEW');
    expect(report.remainingAdmissibilityGapCount).toBe(4);
    expect(report.exactI241BoundaryAccepted).toBe(true);
    expect(report.acquisitionContractFrozen).toBe(true);
    expect(report.targetedAcquisitionAuthorized).toBe(true);
  });

  it('freezes five targeted acquisition paths and eighteen controls', () => {
    const report = buildI242ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluFourGapCanonicalProvenanceAdmissibilityAcquisitionReadinessReview(validI241());
    expect(I242_ACQUISITION_PATH_IDS).toHaveLength(5);
    expect(I242_ACQUISITION_CONTROL_IDS).toHaveLength(18);
    expect(report.acquisitionPathIds).toEqual(I242_ACQUISITION_PATH_IDS);
    expect(report.acquisitionPathCount).toBe(5);
    expect(report.acquisitionControlIds).toEqual(I242_ACQUISITION_CONTROL_IDS);
    expect(report.acquisitionControlCount).toBe(18);
    expect(report.acquisitionExecutedByThisGate).toBe(false);
  });

  it('forbids reopening already-satisfied general rule discovery', () => {
    const report = buildI242ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluFourGapCanonicalProvenanceAdmissibilityAcquisitionReadinessReview(validI241());
    expect(report.generalRuleRediscoveryMayCountAsProgress).toBe(false);
    expect(report.canonicalIdentityRequiresBibliographicOrCustodianBinding).toBe(true);
    expect(report.titleSimilarityMayEstablishCanonicalIdentity).toBe(false);
    expect(report.embedded2011AttributionMayEstablishCanonicalIdentity).toBe(false);
  });

  it('requires exact passage binding and source-bound derivative evidence', () => {
    const report = buildI242ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluFourGapCanonicalProvenanceAdmissibilityAcquisitionReadinessReview(validI241());
    expect(report.canonicalExactPassageRequiresExactRuleTextAndSourceIdentity).toBe(true);
    expect(report.searchSnippetMayEstablishExactPassageBinding).toBe(false);
    expect(report.derivativeRelationshipRequiresExplicitOrReproducibleDependencyEvidence).toBe(true);
    expect(report.chronologyAloneMayEstablishDerivativeRelationship).toBe(false);
    expect(report.chronologyAloneMayEstablishProvenanceIndependence).toBe(false);
    expect(report.sameTextYudingWitnessesMayCountAsIndependentAuthorities).toBe(false);
  });

  it('requires rule-bearing context for normative admissibility', () => {
    const report = buildI242ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluFourGapCanonicalProvenanceAdmissibilityAcquisitionReadinessReview(validI241());
    expect(report.normativeAdmissibilityRequiresRuleBearingContextAndLineageOrEditorialStatus).toBe(true);
    expect(report.sourceTitleOrReputationMayEstablishNormativeAdmissibility).toBe(false);
    expect(report.earliestWitnessRequiresDateVerifiedSourceBoundContext).toBe(true);
  });

  it('keeps the settlement authority gap open and downstream decisions unauthorized', () => {
    const report = buildI242ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluFourGapCanonicalProvenanceAdmissibilityAcquisitionReadinessReview(validI241());
    expect(report.authorityGap).toBe('COMPETING_RELATION_SETTLEMENT_AUTHORITY_NOT_ESTABLISHED');
    expect(report.authorityGapClosed).toBe(false);
    expect(report.authorityPromotedByThisGate).toBe(false);
    expect(report.competingRelationSettlementResolved).toBe(false);
    expect(report.crossRelationPrecedenceAuthorized).toBe(false);
    expect(report.multiTouchAggregationAuthorized).toBe(false);
  });

  it('preserves all existing hold, provenance, v2 and production guards', () => {
    const report = buildI242ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluFourGapCanonicalProvenanceAdmissibilityAcquisitionReadinessReview(validI241());
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

  it('fails closed when the I241 four-gap boundary changes', () => {
    const i241 = validI241();
    const invalid = { ...i241, remainingAdmissibilityGapCount: 0 } as unknown as typeof i241;
    const report = buildI242ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluFourGapCanonicalProvenanceAdmissibilityAcquisitionReadinessReview(invalid);
    expect(report.status).toBe('I241_SOURCE_ADMISSIBILITY_BOUNDARY_INVALID');
    expect(report.remainingAdmissibilityGapCount).toBe(0);
    expect(report.acquisitionPathCount).toBe(0);
    expect(report.acquisitionControlCount).toBe(0);
    expect(report.targetedAcquisitionAuthorized).toBe(false);
    expect(report.authorityGap).toBe('UPSTREAM_INVALID');
    expect(report.recommendedNextGate).toBe('COMPETING_RELATION_SETTLEMENT_YUDING_SUIJINLU_FOUR_GAP_CANONICAL_PROVENANCE_ADMISSIBILITY_ACQUISITION_READINESS_REVIEW');
  });
});
