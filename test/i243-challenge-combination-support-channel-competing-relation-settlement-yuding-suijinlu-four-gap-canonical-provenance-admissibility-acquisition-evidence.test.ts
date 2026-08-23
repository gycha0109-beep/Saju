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
import { buildI242ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluFourGapCanonicalProvenanceAdmissibilityAcquisitionReadinessReview } from '../src/research/i242-challenge-combination-support-channel-competing-relation-settlement-yuding-suijinlu-four-gap-canonical-provenance-admissibility-acquisition-readiness-review.js';
import {
  I243_EVIDENCE_RECORD_IDS,
  buildI243ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluFourGapCanonicalProvenanceAdmissibilityAcquisitionEvidence,
} from '../src/research/i243-challenge-combination-support-channel-competing-relation-settlement-yuding-suijinlu-four-gap-canonical-provenance-admissibility-acquisition-evidence.js';

const validI242 = () => {
  const i233 = buildI233ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityGapRequirementsReview();
  const i234 = buildI234ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityDiscoveryReadinessReview(i233);
  const i235 = buildI235ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityDiscoveryEvidence(i234);
  const i236 = buildI236ChallengeCombinationSupportChannelCompetingRelationSettlementCandidateEvidenceAdequacyCoverageEvaluationReadinessReview(i235);
  const i237 = buildI237ChallengeCombinationSupportChannelCompetingRelationSettlementCandidateEvidenceAdequacyCoverageEvaluationEvidence(i236, i235);
  const i238 = buildI238ChallengeCombinationSupportChannelCompetingRelationSettlementCoverageEvidenceAdequacyResidualRequirementsReassessmentReview(i237);
  const i239 = buildI239ChallengeCombinationSupportChannelCompetingRelationSettlementThreeResidualRequirementTargetedAuthorityDiscoveryReadinessReview(i238);
  const i240 = buildI240ChallengeCombinationSupportChannelCompetingRelationSettlementThreeResidualRequirementTargetedAuthorityDiscoveryEvidence(i239);
  const i241 = buildI241ChallengeCombinationSupportChannelCompetingRelationSettlementThreeResidualTargetedDiscoveryEvidenceAdequacySourceRelationshipAdmissibilityReassessmentReview(i240);
  return buildI242ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluFourGapCanonicalProvenanceAdmissibilityAcquisitionReadinessReview(i241);
};

describe('I243 Yuding Suijinlu canonical/provenance/admissibility acquisition evidence', () => {
  it('executes the exact I242 five-path acquisition boundary and records eight direct public evidence records', () => {
    const report = buildI243ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluFourGapCanonicalProvenanceAdmissibilityAcquisitionEvidence(validI242());
    expect(report.status).toBe('RESOLVED_COMPETING_RELATION_SETTLEMENT_YUDING_SUIJINLU_FOUR_GAP_CANONICAL_PROVENANCE_ADMISSIBILITY_ACQUISITION_EVIDENCE');
    expect(report.exactI242BoundaryAccepted).toBe(true);
    expect(report.acquisitionExecuted).toBe(true);
    expect(report.executedAcquisitionPathCount).toBe(5);
    expect(I243_EVIDENCE_RECORD_IDS).toHaveLength(8);
    expect(report.evidenceRecordCount).toBe(8);
    expect(report.directPublicEvidenceRecordCount).toBe(8);
    expect(report.searchSnippetOnlyEvidenceCount).toBe(0);
  });

  it('establishes the modern 2011 published-edition bibliographic identity', () => {
    const report = buildI243ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluFourGapCanonicalProvenanceAdmissibilityAcquisitionEvidence(validI242());
    expect(report.modern2011EditionBibliographicIdentityEstablished).toBe(true);
    expect(report.modern2011EditionTitle).toBe('御定子平');
    expect(report.modern2011EditionEditor).toBe('郑同点校');
    expect(report.modern2011EditionPublisher).toBe('华龄出版社');
    expect(report.modern2011EditionPublicationDate).toBe('2011-05');
    expect(report.modern2011EditionIsbn).toBe('9787801788139');
    expect(report.libraryOpacRecordObserved).toBe(true);
    expect(report.publisherDescriptionPalaceManuscriptBasisObserved).toBe(true);
    expect(report.publisherDescriptionFirstTypesetEditionClaimObserved).toBe(true);
  });

  it('supports volume-five Suijinlu placement without inventing a primary-edition passage binding', () => {
    const report = buildI243ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluFourGapCanonicalProvenanceAdmissibilityAcquisitionEvidence(validI242());
    expect(report.volume5SuijinluFrontAndBackChapterPlacementObserved).toBe(true);
    expect(report.volume5PlacementBoundToPublisherOrLibraryCatalog).toBe(false);
    expect(report.palaceManuscriptShelfmarkEstablished).toBe(false);
    expect(report.palaceManuscriptCustodianRecordDirectlyAcquired).toBe(false);
    expect(report.palaceManuscriptFacsimileDirectlyAcquired).toBe(false);
    expect(report.modern2011PrintExactTargetPassagePageDirectlyAcquired).toBe(false);
    expect(report.exactCanonicalTargetPassageBindingEstablished).toBe(false);
  });

  it('records the explicit 2012 Sina repost-to-2011 original relation but does not overclaim the original source', () => {
    const report = buildI243ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluFourGapCanonicalProvenanceAdmissibilityAcquisitionEvidence(validI242());
    expect(report.sina2012RepostTimestampDirectlyObserved).toBe(true);
    expect(report.sina2012ExplicitOriginalAddressLinkObserved).toBe(true);
    expect(report.sina2012ExplicitOriginalAuthorAttributionObserved).toBe(true);
    expect(report.sinaEmbeddedOriginalTimestamp).toBe('2011-12-23 17:33:51');
    expect(report.sinaEmbeddedOriginalAuthor).toBe('尚慈居士');
    expect(report.sinaEmbeddedOriginalUrl).toBe('https://blog.sina.com.cn/s/blog_6327065701018nju.html');
    expect(report.original2011UrlDirectlyFetchableInThisGate).toBe(false);
    expect(report.explicit2012To2011DerivativeLinkEstablished).toBe(true);
  });

  it('keeps the broader derivative chain and provenance independence unresolved', () => {
    const report = buildI243ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluFourGapCanonicalProvenanceAdmissibilityAcquisitionEvidence(validI242());
    expect(report.heyix2019To2011Or2012DerivativeLinkEstablished).toBe(false);
    expect(report.sameTextPublicWitnessFamilyStabilityObserved).toBe(true);
    expect(report.sameTextPublicWitnessesMayCountAsIndependentAuthorities).toBe(false);
    expect(report.provenanceIndependenceAdjudicatedByThisGate).toBe(false);
    expect(report.fullPublicWitnessDerivativeRelationshipEstablished).toBe(false);
    expect(report.derivativeRelationshipAdjudicatedBeyondExplicit2012RepostLink).toBe(false);
  });

  it('materially narrows three gaps while keeping final passage admissibility and all four formal gaps open', () => {
    const report = buildI243ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluFourGapCanonicalProvenanceAdmissibilityAcquisitionEvidence(validI242());
    expect(report.ruleBearingContextSupportedByVolumeAndTextStructure).toBe(true);
    expect(report.editorialStatusSupportedBy2011PointCollatedEditionMetadata).toBe(true);
    expect(report.finalTargetPassageNormativeAdmissibilityEstablished).toBe(false);
    expect(report.materiallyNarrowedGapCount).toBe(3);
    expect(report.fullyClosedGapCount).toBe(0);
    expect(report.remainingAdmissibilityGapCount).toBe(4);
    expect(report.gapAssessments.map((gap) => gap.disposition)).toEqual([
      'MATERIALLY_NARROWED_NOT_CLOSED',
      'UNRESOLVED',
      'MATERIALLY_NARROWED_NOT_CLOSED',
      'MATERIALLY_NARROWED_NOT_CLOSED',
    ]);
  });

  it('preserves settlement, hold, v2 and production guards', () => {
    const report = buildI243ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluFourGapCanonicalProvenanceAdmissibilityAcquisitionEvidence(validI242());
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
  });

  it('fails closed when the I242 acquisition boundary changes', () => {
    const i242 = validI242();
    const invalid = { ...i242, acquisitionPathCount: 0 } as unknown as typeof i242;
    const report = buildI243ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluFourGapCanonicalProvenanceAdmissibilityAcquisitionEvidence(invalid);
    expect(report.status).toBe('I242_ACQUISITION_BOUNDARY_INVALID');
    expect(report.acquisitionExecuted).toBe(false);
    expect(report.executedAcquisitionPathCount).toBe(0);
    expect(report.evidenceRecordCount).toBe(0);
    expect(report.modern2011EditionBibliographicIdentityEstablished).toBe(false);
    expect(report.remainingAdmissibilityGapCount).toBe(0);
    expect(report.authorityGap).toBe('UPSTREAM_INVALID');
    expect(report.recommendedNextGate).toBe('COMPETING_RELATION_SETTLEMENT_YUDING_SUIJINLU_FOUR_GAP_CANONICAL_PROVENANCE_ADMISSIBILITY_ACQUISITION_EVIDENCE');
  });
});
