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
import { buildI243ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluFourGapCanonicalProvenanceAdmissibilityAcquisitionEvidence } from '../src/research/i243-challenge-combination-support-channel-competing-relation-settlement-yuding-suijinlu-four-gap-canonical-provenance-admissibility-acquisition-evidence.js';
import {
  I244_AUTHORITY_BLOCKING_RESIDUAL_IDS,
  I244_NON_BLOCKING_UNRESOLVED_CONTEXT_IDS,
  buildI244ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluCanonicalProvenanceAcquisitionEvidenceAdequacyResidualGapReassessmentReview,
} from '../src/research/i244-challenge-combination-support-channel-competing-relation-settlement-yuding-suijinlu-canonical-provenance-acquisition-evidence-adequacy-residual-gap-reassessment-review.js';

const validI243 = () => {
  const i233 = buildI233ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityGapRequirementsReview();
  const i234 = buildI234ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityDiscoveryReadinessReview(i233);
  const i235 = buildI235ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityDiscoveryEvidence(i234);
  const i236 = buildI236ChallengeCombinationSupportChannelCompetingRelationSettlementCandidateEvidenceAdequacyCoverageEvaluationReadinessReview(i235);
  const i237 = buildI237ChallengeCombinationSupportChannelCompetingRelationSettlementCandidateEvidenceAdequacyCoverageEvaluationEvidence(i236, i235);
  const i238 = buildI238ChallengeCombinationSupportChannelCompetingRelationSettlementCoverageEvidenceAdequacyResidualRequirementsReassessmentReview(i237);
  const i239 = buildI239ChallengeCombinationSupportChannelCompetingRelationSettlementThreeResidualRequirementTargetedAuthorityDiscoveryReadinessReview(i238);
  const i240 = buildI240ChallengeCombinationSupportChannelCompetingRelationSettlementThreeResidualRequirementTargetedAuthorityDiscoveryEvidence(i239);
  const i241 = buildI241ChallengeCombinationSupportChannelCompetingRelationSettlementThreeResidualTargetedDiscoveryEvidenceAdequacySourceRelationshipAdmissibilityReassessmentReview(i240);
  const i242 = buildI242ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluFourGapCanonicalProvenanceAdmissibilityAcquisitionReadinessReview(i241);
  return buildI243ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluFourGapCanonicalProvenanceAdmissibilityAcquisitionEvidence(i242);
};

describe('I244 Yuding Suijinlu acquisition-evidence adequacy residual-gap reassessment', () => {
  it('accepts only the precision-corrected I243 boundary of seven direct records and one search-index lead', () => {
    const report = buildI244ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluCanonicalProvenanceAcquisitionEvidenceAdequacyResidualGapReassessmentReview(validI243());
    expect(report.status).toBe(
      'RESOLVED_COMPETING_RELATION_SETTLEMENT_YUDING_SUIJINLU_CANONICAL_PROVENANCE_ACQUISITION_EVIDENCE_ADEQUACY_RESIDUAL_GAP_REASSESSMENT_REVIEW',
    );
    expect(report.decision).toBe(
      'I243_EVIDENCE_ADEQUATE_FOR_MODERN_EDITION_IDENTITY_AND_EXPLICIT_2012_DERIVATIVE_LINK_FOUR_LEGACY_ADMISSIBILITY_GAPS_REMAIN_FORMALLY_OPEN_THREE_AUTHORITY_BLOCKING_RESIDUALS_IDENTIFIED_HEYIX_CHAIN_AND_PUBLIC_WITNESS_INDEPENDENCE_PRESERVED_AS_NON_BLOCKING_UNRESOLVED_CONTEXT_PRIMARY_OR_CUSTODIAN_EXACT_PASSAGE_ACQUISITION_REQUIRED_NO_PROMOTION',
    );
    expect(report.exactI243BoundaryAccepted).toBe(true);
    expect(report.i243EvidenceAdequateForResidualReassessment).toBe(true);
    expect(report.i243EvidenceRecordCountAccepted).toBe(8);
    expect(report.i243DirectPublicEvidenceRecordCountAccepted).toBe(7);
    expect(report.i243SearchIndexLeadRecordCountAccepted).toBe(1);
    expect(report.searchIndexLeadAcceptedAsDirectEvidence).toBe(false);
  });

  it('keeps all four legacy admissibility gaps formally open while identifying exactly three authority-blocking residuals', () => {
    const report = buildI244ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluCanonicalProvenanceAcquisitionEvidenceAdequacyResidualGapReassessmentReview(validI243());
    expect(report.legacyFormalAdmissibilityGapIds).toEqual([
      'YUDING_SUIJINLU_CANONICAL_TEXT_IDENTITY_BINDING_GAP',
      'YUDING_SUIJINLU_CANONICAL_EXACT_PASSAGE_BINDING_GAP',
      'YUDING_SUIJINLU_WITNESS_DERIVATIVE_RELATIONSHIP_GAP',
      'YUDING_SUIJINLU_NORMATIVE_RULE_BEARING_ADMISSIBILITY_GAP',
    ]);
    expect(report.legacyFormalAdmissibilityGapCount).toBe(4);
    expect(report.legacyFormalGapsClosedByI244Count).toBe(0);
    expect(I244_AUTHORITY_BLOCKING_RESIDUAL_IDS).toEqual([
      'YUDING_SUIJINLU_PRIMARY_SOURCE_IDENTITY_AND_CUSTODIAN_BINDING_GAP',
      'YUDING_SUIJINLU_CANONICAL_EXACT_TARGET_PASSAGE_FACSIMILE_GAP',
      'YUDING_SUIJINLU_TARGET_PASSAGE_FINAL_NORMATIVE_ADMISSIBILITY_GAP',
    ]);
    expect(report.authorityBlockingResidualIds).toEqual(I244_AUTHORITY_BLOCKING_RESIDUAL_IDS);
    expect(report.authorityBlockingResidualCount).toBe(3);
    expect(report.canonicalTextIdentityLegacyGapReframedAsPrimaryCustodianBindingResidual).toBe(true);
    expect(report.canonicalExactPassageLegacyGapRemainsAuthorityBlocking).toBe(true);
    expect(report.normativeAdmissibilityLegacyGapRemainsAuthorityBlocking).toBe(true);
  });

  it('preserves derivative-chain and provenance-independence questions as unresolved non-blocking context', () => {
    const report = buildI244ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluCanonicalProvenanceAcquisitionEvidenceAdequacyResidualGapReassessmentReview(validI243());
    expect(report.witnessDerivativeRelationshipLegacyGapRemainsFormallyUnresolved).toBe(true);
    expect(report.witnessDerivativeRelationshipLegacyGapAuthorityBlockingForNextCanonicalAcquisition).toBe(false);
    expect(I244_NON_BLOCKING_UNRESOLVED_CONTEXT_IDS).toEqual([
      'YUDING_SUIJINLU_HEYIX_2019_DERIVATIVE_CHAIN_CONTEXT_UNRESOLVED',
      'YUDING_SUIJINLU_PUBLIC_WITNESS_PROVENANCE_INDEPENDENCE_CONTEXT_UNRESOLVED',
    ]);
    expect(report.nonBlockingUnresolvedContextIds).toEqual(I244_NON_BLOCKING_UNRESOLVED_CONTEXT_IDS);
    expect(report.nonBlockingUnresolvedContextCount).toBe(2);
    expect(report.heyixDerivativeChainMustRemainUnresolvedContext).toBe(true);
    expect(report.publicWitnessProvenanceIndependenceMustRemainUnresolvedContext).toBe(true);
    expect(report.nonBlockingContextMayBeUsedAsIndependentNormativeAuthority).toBe(false);
    expect(report.broaderDerivativeChainAccepted).toBe(false);
    expect(report.sameTextWitnessesMayCountAsIndependentAuthorities).toBe(false);
  });

  it('accepts the real 2011 publication identity and explicit repost link without treating either as primary canonical passage proof', () => {
    const report = buildI244ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluCanonicalProvenanceAcquisitionEvidenceAdequacyResidualGapReassessmentReview(validI243());
    expect(report.modern2011EditionBibliographicIdentityAccepted).toBe(true);
    expect(report.modern2011EditionIdentityMayClosePrimaryCustodianBindingGap).toBe(false);
    expect(report.explicit2012To2011DerivativeLinkAccepted).toBe(true);
    expect(report.acceptedExplicit2012DerivativeLinkDoesNotAuthorizeBroaderDerivativeAdjudication).toBe(true);
    expect(report.provenanceIndependenceAdjudicatedByThisGate).toBe(false);
    expect(report.derivativeRelationshipAdjudicatedByThisGate).toBe(false);
  });

  it('routes the next work only to primary/custodian exact-passage acquisition before final admissibility', () => {
    const report = buildI244ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluCanonicalProvenanceAcquisitionEvidenceAdequacyResidualGapReassessmentReview(validI243());
    expect(report.canonicalProgressRequiresPrimaryOrCustodianSourceIdentityBinding).toBe(true);
    expect(report.canonicalProgressRequiresExactTargetPassageFacsimileOrPrimaryPage).toBe(true);
    expect(report.normativeAdmissibilityMayBeAdjudicatedBeforePrimaryAndPassageBinding).toBe(false);
    expect(report.generalRuleRediscoveryJustified).toBe(false);
    expect(report.equivalentMirrorChainSearchMayCountAsAuthorityProgress).toBe(false);
    expect(report.targetedThreeResidualAcquisitionReadinessJustified).toBe(true);
    expect(report.acquisitionExecutedByThisGate).toBe(false);
    expect(report.recommendedNextGate).toBe(
      'COMPETING_RELATION_SETTLEMENT_YUDING_SUIJINLU_THREE_BLOCKING_RESIDUAL_CANONICAL_WITNESS_ACQUISITION_READINESS_REVIEW',
    );
  });

  it('does not close settlement authority or authorize downstream verdicts', () => {
    const report = buildI244ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluCanonicalProvenanceAcquisitionEvidenceAdequacyResidualGapReassessmentReview(validI243());
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

  it('preserves I232, I132, Qu Wei, Li 1998, v2 and all production guards', () => {
    const report = buildI244ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluCanonicalProvenanceAcquisitionEvidenceAdequacyResidualGapReassessmentReview(validI243());
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

  it('fails closed if the precision-corrected I243 evidence split is changed', () => {
    const i243 = validI243();
    const invalid = { ...i243, directPublicEvidenceRecordCount: 8, searchSnippetOnlyEvidenceCount: 0 } as unknown as typeof i243;
    const report = buildI244ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluCanonicalProvenanceAcquisitionEvidenceAdequacyResidualGapReassessmentReview(invalid);
    expect(report.status).toBe('I243_ACQUISITION_EVIDENCE_BOUNDARY_INVALID');
    expect(report.i243EvidenceAdequateForResidualReassessment).toBe(false);
    expect(report.i243EvidenceRecordCountAccepted).toBe(0);
    expect(report.i243DirectPublicEvidenceRecordCountAccepted).toBe(0);
    expect(report.i243SearchIndexLeadRecordCountAccepted).toBe(0);
    expect(report.legacyFormalAdmissibilityGapCount).toBe(0);
    expect(report.authorityBlockingResidualCount).toBe(0);
    expect(report.nonBlockingUnresolvedContextCount).toBe(0);
    expect(report.targetedThreeResidualAcquisitionReadinessJustified).toBe(false);
    expect(report.authorityGap).toBe('UPSTREAM_INVALID');
    expect(report.recommendedNextGate).toBe(
      'COMPETING_RELATION_SETTLEMENT_YUDING_SUIJINLU_CANONICAL_PROVENANCE_ACQUISITION_EVIDENCE_ADEQUACY_RESIDUAL_GAP_REASSESSMENT_REVIEW',
    );
  });
});
