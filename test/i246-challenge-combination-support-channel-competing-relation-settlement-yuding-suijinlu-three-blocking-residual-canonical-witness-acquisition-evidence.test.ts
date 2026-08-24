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
import {
  I246_PUBLIC_EVIDENCE_RECORD_IDS,
  I246_TARGET_PASSAGE_FINGERPRINT_IDS,
  buildI246ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluThreeBlockingResidualCanonicalWitnessAcquisitionEvidence,
} from '../src/research/i246-challenge-combination-support-channel-competing-relation-settlement-yuding-suijinlu-three-blocking-residual-canonical-witness-acquisition-evidence.js';

const validI245 = () => {
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
  return buildI245ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluThreeBlockingResidualCanonicalWitnessAcquisitionReadinessReview(i244);
};

describe('I246 Yuding Suijinlu canonical-witness acquisition evidence', () => {
  it('executes all four I245 paths only after accepting the exact readiness boundary', () => {
    const report = buildI246ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluThreeBlockingResidualCanonicalWitnessAcquisitionEvidence(validI245());
    expect(report.status).toBe(
      'RESOLVED_COMPETING_RELATION_SETTLEMENT_YUDING_SUIJINLU_THREE_BLOCKING_RESIDUAL_CANONICAL_WITNESS_ACQUISITION_EVIDENCE',
    );
    expect(report.decision).toBe(
      'FOUR_CANONICAL_WITNESS_PATHS_EXECUTED_THREE_USER_UPLOADED_OR_SHARED_SCAN_SURFACES_AND_2011_PRINT_METADATA_RECONFIRMATION_OBSERVED_ZERO_QUALIFYING_PRIMARY_CUSTODIAN_CATALOG_ZERO_PALACE_FACSIMILE_ZERO_VERIFIED_2011_EXACT_TARGET_PAGE_THREE_AUTHORITY_BLOCKING_RESIDUALS_REMAIN_NO_NEGATIVE_EXHAUSTION_NO_PROMOTION',
    );
    expect(report.exactI245BoundaryAccepted).toBe(true);
    expect(report.acquisitionExecuted).toBe(true);
    expect(report.acquisitionAttemptCount).toBe(4);
    expect(report.acquisitionAttemptRecords).toHaveLength(4);
    expect(report.acquisitionAttemptRecords.every((attempt) => attempt.executed)).toBe(true);
    expect(report.acquisitionAttemptRecords.every((attempt) => attempt.qualifyingWitnessCount === 0)).toBe(true);
  });

  it('records one bibliographic reconfirmation and exactly three user-uploaded or shared scan surfaces without promoting them', () => {
    const report = buildI246ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluThreeBlockingResidualCanonicalWitnessAcquisitionEvidence(validI245());
    expect(I246_PUBLIC_EVIDENCE_RECORD_IDS).toEqual([
      'BOOKSCHINA_2011_FIRST_EDITION_METADATA_RECONFIRMATION',
      'SCRIBD_USER_UPLOADED_2011_EDITION_SCAN_SURFACE_306P',
      'SHENJIGE_USER_SHARED_2011_EDITION_SCAN_SURFACE_SS13293187',
      'GUOXUESHUGE_USER_SHARED_2011_EDITION_SCAN_SURFACE_303P',
    ]);
    expect(report.publicEvidenceRecords.map((record) => record.id)).toEqual(I246_PUBLIC_EVIDENCE_RECORD_IDS);
    expect(report.publicEvidenceRecordCount).toBe(4);
    expect(report.newlyObservedUserUploadedOrSharedScanSurfaceCount).toBe(3);
    expect(report.reconfirmed2011EditionMetadataRecordCount).toBe(1);
    expect(report.publicEvidenceRecords.filter((record) => record.userUploadedOrShared)).toHaveLength(3);
    expect(report.publicEvidenceRecords.every((record) => record.qualifyingCanonicalWitness === false)).toBe(true);
  });

  it('freezes six target-passage fingerprints and executes exact-text plus institutional-domain search', () => {
    const report = buildI246ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluThreeBlockingResidualCanonicalWitnessAcquisitionEvidence(validI245());
    expect(I246_TARGET_PASSAGE_FINGERPRINT_IDS).toEqual([
      'GAN_HE_XIAN_YONG_BU_XIAN_ZHU',
      'LIANG_HE_YOU_FENG_SAN_HE',
      'JIN_SAN_BU_JIN_ER',
      'DE_JU_SHI_YUAN',
      'SHI_JU_DE_YUAN',
      'YI_BU_HE_LIANG_LIANG_BU_CHONG_YI',
    ]);
    expect(report.targetPassageFingerprintIds).toEqual(I246_TARGET_PASSAGE_FINGERPRINT_IDS);
    expect(report.targetPassageFingerprintCount).toBe(6);
    expect(report.targetPassageFingerprintSearchExecuted).toBe(true);
    expect(report.officialOrInstitutionalDomainSearchExecuted).toBe(true);
    expect(report.direct2011EditionScanSurfaceObserved).toBe(true);
  });

  it('keeps all three authority-blocking residuals because no qualifying primary, facsimile or exact 2011 page was acquired', () => {
    const report = buildI246ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluThreeBlockingResidualCanonicalWitnessAcquisitionEvidence(validI245());
    expect(report.qualifyingPrimaryCustodianCatalogWitnessCount).toBe(0);
    expect(report.qualifyingPalaceFacsimileWitnessCount).toBe(0);
    expect(report.qualifyingVerified2011PrintExactTargetPageCount).toBe(0);
    expect(report.qualifyingCanonicalWitnessCount).toBe(0);
    expect(report.authorityBlockingResidualIds).toEqual([
      'YUDING_SUIJINLU_PRIMARY_SOURCE_IDENTITY_AND_CUSTODIAN_BINDING_GAP',
      'YUDING_SUIJINLU_CANONICAL_EXACT_TARGET_PASSAGE_FACSIMILE_GAP',
      'YUDING_SUIJINLU_TARGET_PASSAGE_FINAL_NORMATIVE_ADMISSIBILITY_GAP',
    ]);
    expect(report.authorityBlockingResidualCount).toBe(3);
    expect(report.blockingResidualsResolvedByThisGateCount).toBe(0);
    expect(report.primaryCustodianSourceIdentityEstablished).toBe(false);
    expect(report.palaceManuscriptShelfmarkEstablished).toBe(false);
    expect(report.palaceManuscriptFacsimileAcquired).toBe(false);
    expect(report.verified2011PrintExactTargetPassagePageAcquired).toBe(false);
    expect(report.exactCanonicalTargetPassageBindingEstablished).toBe(false);
    expect(report.finalTargetPassageNormativeAdmissibilityEstablished).toBe(false);
  });

  it('does not treat scan surfaces, SS numbers or bookseller descriptions as custodian or exact-passage authority', () => {
    const report = buildI246ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluThreeBlockingResidualCanonicalWitnessAcquisitionEvidence(validI245());
    expect(report.scanSurfaceMayEstablishCustodianAuthority).toBe(false);
    expect(report.scanSurfaceMayEstablishPalaceShelfmark).toBe(false);
    expect(report.ssNumberMayEstablishPalaceShelfmark).toBe(false);
    expect(report.booksellerPalaceBasisDescriptionMayEstablishCustodianBinding).toBe(false);
    for (const record of report.publicEvidenceRecords) {
      expect(record.primaryCustodianCatalogBindingEstablished).toBe(false);
      expect(record.palaceManuscriptShelfmarkEstablished).toBe(false);
      expect(record.palaceFacsimileExactTargetPassageEstablished).toBe(false);
      expect(record.verified2011PrintExactTargetPassagePageEstablished).toBe(false);
    }
  });

  it('preserves the four formal gaps and two non-blocking provenance contexts without adjudicating them', () => {
    const report = buildI246ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluThreeBlockingResidualCanonicalWitnessAcquisitionEvidence(validI245());
    expect(report.legacyFormalAdmissibilityGapIds).toEqual([
      'YUDING_SUIJINLU_CANONICAL_TEXT_IDENTITY_BINDING_GAP',
      'YUDING_SUIJINLU_CANONICAL_EXACT_PASSAGE_BINDING_GAP',
      'YUDING_SUIJINLU_WITNESS_DERIVATIVE_RELATIONSHIP_GAP',
      'YUDING_SUIJINLU_NORMATIVE_RULE_BEARING_ADMISSIBILITY_GAP',
    ]);
    expect(report.legacyFormalAdmissibilityGapCount).toBe(4);
    expect(report.legacyFormalGapsClosedByThisGateCount).toBe(0);
    expect(report.nonBlockingUnresolvedContextIds).toEqual([
      'YUDING_SUIJINLU_HEYIX_2019_DERIVATIVE_CHAIN_CONTEXT_UNRESOLVED',
      'YUDING_SUIJINLU_PUBLIC_WITNESS_PROVENANCE_INDEPENDENCE_CONTEXT_UNRESOLVED',
    ]);
    expect(report.nonBlockingUnresolvedContextCount).toBe(2);
    expect(report.publicMirrorDerivativeChainCompletionCountedAsAuthorityProgress).toBe(false);
    expect(report.publicWitnessProvenanceIndependenceEstablished).toBe(false);
    expect(report.sameTextPublicWitnessesCountedAsIndependentAuthorities).toBe(false);
    expect(report.provenanceIndependenceAdjudicatedByThisGate).toBe(false);
    expect(report.derivativeRelationshipAdjudicatedByThisGate).toBe(false);
  });

  it('preserves all holds, I132, v2 and production guards and creates no negative or exhaustion finding', () => {
    const report = buildI246ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluThreeBlockingResidualCanonicalWitnessAcquisitionEvidence(validI245());
    expect(report.externalCustodianContactExecutedByThisGate).toBe(false);
    expect(report.automatedPublicAcquisitionBoundaryAdjudicatedByThisGate).toBe(false);
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
      'COMPETING_RELATION_SETTLEMENT_YUDING_SUIJINLU_CANONICAL_WITNESS_ACQUISITION_EVIDENCE_ADEQUACY_EXTERNAL_ACCESS_REASSESSMENT_REVIEW',
    );
  });

  it('fails closed when the I245 readiness boundary is altered', () => {
    const i245 = validI245();
    const invalid = { ...i245, acquisitionPathCount: 0 } as unknown as typeof i245;
    const report = buildI246ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluThreeBlockingResidualCanonicalWitnessAcquisitionEvidence(invalid);
    expect(report.status).toBe('I245_ACQUISITION_READINESS_BOUNDARY_INVALID');
    expect(report.exactI245BoundaryAccepted).toBe(false);
    expect(report.acquisitionExecuted).toBe(false);
    expect(report.acquisitionAttemptCount).toBe(0);
    expect(report.publicEvidenceRecordCount).toBe(0);
    expect(report.newlyObservedUserUploadedOrSharedScanSurfaceCount).toBe(0);
    expect(report.reconfirmed2011EditionMetadataRecordCount).toBe(0);
    expect(report.targetPassageFingerprintCount).toBe(0);
    expect(report.targetPassageFingerprintSearchExecuted).toBe(false);
    expect(report.officialOrInstitutionalDomainSearchExecuted).toBe(false);
    expect(report.authorityBlockingResidualCount).toBe(0);
    expect(report.authorityGap).toBe('UPSTREAM_INVALID');
    expect(report.recommendedNextGate).toBe(
      'COMPETING_RELATION_SETTLEMENT_YUDING_SUIJINLU_THREE_BLOCKING_RESIDUAL_CANONICAL_WITNESS_ACQUISITION_EVIDENCE',
    );
  });
});
