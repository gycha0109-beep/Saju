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
import { buildI244ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluCanonicalProvenanceAcquisitionEvidenceAdequacyResidualGapReassessmentReview } from '../src/research/i244-challenge-combination-support-channel-competing-relation-settlement-yuding-suijinlu-canonical-provenance-acquisition-evidence-adequacy-residual-gap-reassessment-review.js';
import { buildI245ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluThreeBlockingResidualCanonicalWitnessAcquisitionReadinessReview } from '../src/research/i245-challenge-combination-support-channel-competing-relation-settlement-yuding-suijinlu-three-blocking-residual-canonical-witness-acquisition-readiness-review.js';
import { buildI246ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluThreeBlockingResidualCanonicalWitnessAcquisitionEvidence } from '../src/research/i246-challenge-combination-support-channel-competing-relation-settlement-yuding-suijinlu-three-blocking-residual-canonical-witness-acquisition-evidence.js';
import {
  I247_EXTERNAL_ACCESS_REQUIREMENT_IDS,
  I247_REASSESSMENT_CONTROL_IDS,
  buildI247ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluCanonicalWitnessAcquisitionEvidenceAdequacyExternalAccessReassessmentReview,
} from '../src/research/i247-challenge-combination-support-channel-competing-relation-settlement-yuding-suijinlu-canonical-witness-acquisition-evidence-adequacy-external-access-reassessment-review.js';

const validI246 = () => {
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
  const i243 = buildI243ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluFourGapCanonicalProvenanceAdmissibilityAcquisitionEvidence(i242);
  const i244 = buildI244ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluCanonicalProvenanceAcquisitionEvidenceAdequacyResidualGapReassessmentReview(i243);
  const i245 = buildI245ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluThreeBlockingResidualCanonicalWitnessAcquisitionReadinessReview(i244);
  return buildI246ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluThreeBlockingResidualCanonicalWitnessAcquisitionEvidence(i245);
};

describe('I247 Yuding Suijinlu canonical-witness external-access reassessment', () => {
  it('accepts the exact I246 zero-qualifying-witness boundary and reaches the automated public acquisition boundary', () => {
    const report = buildI247ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluCanonicalWitnessAcquisitionEvidenceAdequacyExternalAccessReassessmentReview(validI246());
    expect(report.status).toBe(
      'RESOLVED_COMPETING_RELATION_SETTLEMENT_YUDING_SUIJINLU_CANONICAL_WITNESS_ACQUISITION_EVIDENCE_ADEQUACY_EXTERNAL_ACCESS_REASSESSMENT_REVIEW',
    );
    expect(report.decision).toBe(
      'I246_EVIDENCE_ADEQUATE_FOR_THREE_UNRESOLVED_AUTHORITY_BLOCKING_RESIDUALS_THREE_SCAN_SURFACES_ACCEPTED_AS_CONTEXT_ZERO_QUALIFYING_CANONICAL_WITNESSES_AUTOMATED_PUBLIC_ACQUISITION_BOUNDARY_REACHED_MATERIALLY_NEW_PRIMARY_CUSTODIAN_OR_VERIFIED_2011_PAGE_ACCESS_REQUIRED_NO_EXHAUSTION_NO_NEGATIVE_FINDING_NO_PROMOTION',
    );
    expect(report.exactI246BoundaryAccepted).toBe(true);
    expect(report.i246EvidenceAdequateForRecordedUnresolvedFindings).toBe(true);
    expect(report.qualifyingCanonicalWitnessCountAccepted).toBe(0);
    expect(report.userUploadedOrSharedScanSurfaceCountAccepted).toBe(3);
    expect(report.automatedPublicAcquisitionContinuationMethodologicallyJustified).toBe(false);
    expect(report.automatedPublicAcquisitionBoundaryReached).toBe(true);
  });

  it('keeps scan surfaces as context only and preserves all three blocking residuals', () => {
    const report = buildI247ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluCanonicalWitnessAcquisitionEvidenceAdequacyExternalAccessReassessmentReview(validI246());
    expect(report.scanSurfacesAcceptedAsContextOnly).toBe(true);
    expect(report.scanSurfacesMayEstablishPrimaryCustodianAuthority).toBe(false);
    expect(report.authorityBlockingResidualIds).toEqual([
      'YUDING_SUIJINLU_PRIMARY_SOURCE_IDENTITY_AND_CUSTODIAN_BINDING_GAP',
      'YUDING_SUIJINLU_CANONICAL_EXACT_TARGET_PASSAGE_FACSIMILE_GAP',
      'YUDING_SUIJINLU_TARGET_PASSAGE_FINAL_NORMATIVE_ADMISSIBILITY_GAP',
    ]);
    expect(report.authorityBlockingResidualCount).toBe(3);
    expect(report.residualsResolvedByReassessmentCount).toBe(0);
  });

  it('preserves four formal gaps and two non-blocking provenance contexts', () => {
    const report = buildI247ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluCanonicalWitnessAcquisitionEvidenceAdequacyExternalAccessReassessmentReview(validI246());
    expect(report.legacyFormalAdmissibilityGapIds).toEqual([
      'YUDING_SUIJINLU_CANONICAL_TEXT_IDENTITY_BINDING_GAP',
      'YUDING_SUIJINLU_CANONICAL_EXACT_PASSAGE_BINDING_GAP',
      'YUDING_SUIJINLU_WITNESS_DERIVATIVE_RELATIONSHIP_GAP',
      'YUDING_SUIJINLU_NORMATIVE_RULE_BEARING_ADMISSIBILITY_GAP',
    ]);
    expect(report.legacyFormalAdmissibilityGapCount).toBe(4);
    expect(report.nonBlockingUnresolvedContextIds).toEqual([
      'YUDING_SUIJINLU_HEYIX_2019_DERIVATIVE_CHAIN_CONTEXT_UNRESOLVED',
      'YUDING_SUIJINLU_PUBLIC_WITNESS_PROVENANCE_INDEPENDENCE_CONTEXT_UNRESOLVED',
    ]);
    expect(report.nonBlockingUnresolvedContextCount).toBe(2);
    expect(report.provenanceIndependenceAdjudicatedByThisGate).toBe(false);
    expect(report.derivativeRelationshipAdjudicatedByThisGate).toBe(false);
  });

  it('freezes exactly three materially-new access requirements', () => {
    const report = buildI247ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluCanonicalWitnessAcquisitionEvidenceAdequacyExternalAccessReassessmentReview(validI246());
    expect(I247_EXTERNAL_ACCESS_REQUIREMENT_IDS).toEqual([
      'PALACE_MANUSCRIPT_CUSTODIAN_CATALOG_OR_SHELFMARK_RECORD',
      'PALACE_MANUSCRIPT_OR_AUTHORIZED_FACSIMILE_WITH_EXACT_TARGET_PASSAGE',
      'VERIFIED_2011_HUALING_PRINT_PAGE_WITH_EXACT_TARGET_PASSAGE_AND_EDITION_IDENTITY',
    ]);
    expect(report.externalAccessRequirementIds).toEqual(I247_EXTERNAL_ACCESS_REQUIREMENT_IDS);
    expect(report.externalAccessRequirementCount).toBe(3);
    expect(report.externalAccessRequirementsFrozenProspectively).toBe(true);
    expect(report.materiallyNewPrimaryCustodianOrVerifiedEditionAccessRequired).toBe(true);
    expect(report.externalOrManualAccessRequiredForFurtherGapResolution).toBe(true);
    expect(report.newlyAvailablePublicPrimaryWitnessMaySatisfyTrigger).toBe(true);
    expect(report.custodianCatalogOrShelfmarkRequirementOpen).toBe(true);
    expect(report.palaceOrAuthorizedFacsimileExactPassageRequirementOpen).toBe(true);
    expect(report.verified2011EditionExactPageRequirementOpen).toBe(true);
    expect(report.finalNormativeAdmissibilityRemainsDownstream).toBe(true);
  });

  it('freezes fourteen controls and does not authorize external custodian contact', () => {
    const report = buildI247ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluCanonicalWitnessAcquisitionEvidenceAdequacyExternalAccessReassessmentReview(validI246());
    expect(I247_REASSESSMENT_CONTROL_IDS).toHaveLength(14);
    expect(report.reassessmentControlIds).toEqual(I247_REASSESSMENT_CONTROL_IDS);
    expect(report.reassessmentControlCount).toBe(14);
    expect(report.reassessmentControlsFrozen).toBe(true);
    expect(report.externalCustodianContactAuthorizedByThisGate).toBe(false);
    expect(report.externalCustodianContactExecutedByThisGate).toBe(false);
  });

  it('does not turn public-search silence or access limits into nonexistence, negative evidence or exhaustion', () => {
    const report = buildI247ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluCanonicalWitnessAcquisitionEvidenceAdequacyExternalAccessReassessmentReview(validI246());
    expect(report.publicBoundaryCreatesNegativeFinding).toBe(false);
    expect(report.officialSearchSilenceCreatesNegativeFinding).toBe(false);
    expect(report.scanSurfaceAccessLimitationsCreateNegativeFinding).toBe(false);
    expect(report.targetedDiscoveryExhaustionEstablished).toBe(false);
    expect(report.onlineCorpusExhaustionEstablished).toBe(false);
    expect(report.corpusExhaustionEstablished).toBe(false);
    expect(report.universalNoFurtherEvidenceClaimEstablished).toBe(false);
  });

  it('preserves authority, I132, I232, Qu Wei, Li 1998, v2 and all production guards', () => {
    const report = buildI247ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluCanonicalWitnessAcquisitionEvidenceAdequacyExternalAccessReassessmentReview(validI246());
    expect(report.authorityGap).toBe('COMPETING_RELATION_SETTLEMENT_AUTHORITY_NOT_ESTABLISHED');
    expect(report.authorityGapClosed).toBe(false);
    expect(report.authorityPromotedByThisGate).toBe(false);
    expect(report.competingRelationSettlementResolved).toBe(false);
    expect(report.crossRelationPrecedenceAuthorized).toBe(false);
    expect(report.multiTouchAggregationAuthorized).toBe(false);
    expect(report.candidateRegisteredByThisGate).toBe(false);
    expect(report.candidateSelectedByThisGate).toBe(false);
    expect(report.candidateSetMutatedByThisGate).toBe(false);
    expect(report.evidenceRebindingAuthorizedByThisGate).toBe(false);
    expect(report.hiddenStemI232HoldPreserved).toBe(true);
    expect(report.hiddenStemTrackReopenedByThisGate).toBe(false);
    expect(report.quWei2001HoldPreserved).toBe(true);
    expect(report.li1998SameTargetPathSuspendedNotRetired).toBe(true);
    expect(report.I132IndependentNormativeProvenanceRequirementRemainsNormative).toBe(true);
    expect(report.I132PolicyRelaxationAuthorizedByThisGate).toBe(false);
    expect(report.currentV2PackageAndCandidateSetRemainImmutable).toBe(true);
    expect(report.currentV2ProvenanceDisposition).toBe('BLOCKED_UNDER_CURRENT_EVIDENCE');
    expect(report.actualCompositionPerformedByThisGate).toBe(false);
    expect(report.multiSourceCompositionAuthorized).toBe(false);
    expect(report.thresholdRuleCreatedByThisGate).toBe(false);
    expect(report.damageEvaluationAuthorized).toBe(false);
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
    expect(report.productionPolicyExecutionAuthorized).toBe(false);
    expect(report.recommendedNextGate).toBe(
      'COMPETING_RELATION_SETTLEMENT_YUDING_SUIJINLU_EXTERNAL_CANONICAL_WITNESS_ACCESS_REQUIREMENT_HOLD_RECORD',
    );
  });

  it('fails closed when the I246 zero-qualifying boundary is altered', () => {
    const i246 = validI246();
    const invalid = { ...i246, qualifyingCanonicalWitnessCount: 1 } as unknown as typeof i246;
    const report = buildI247ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluCanonicalWitnessAcquisitionEvidenceAdequacyExternalAccessReassessmentReview(invalid);
    expect(report.status).toBe('I246_CANONICAL_WITNESS_ACQUISITION_EVIDENCE_BOUNDARY_INVALID');
    expect(report.exactI246BoundaryAccepted).toBe(false);
    expect(report.i246EvidenceAdequateForRecordedUnresolvedFindings).toBe(false);
    expect(report.userUploadedOrSharedScanSurfaceCountAccepted).toBe(0);
    expect(report.automatedPublicAcquisitionBoundaryReached).toBe(false);
    expect(report.materiallyNewPrimaryCustodianOrVerifiedEditionAccessRequired).toBe(false);
    expect(report.externalAccessRequirementCount).toBe(0);
    expect(report.reassessmentControlCount).toBe(0);
    expect(report.authorityBlockingResidualCount).toBe(0);
    expect(report.authorityGap).toBe('UPSTREAM_INVALID');
    expect(report.recommendedNextGate).toBe(
      'COMPETING_RELATION_SETTLEMENT_YUDING_SUIJINLU_CANONICAL_WITNESS_ACQUISITION_EVIDENCE_ADEQUACY_EXTERNAL_ACCESS_REASSESSMENT_REVIEW',
    );
  });
});
