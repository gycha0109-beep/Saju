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
import {
  I245_ACQUISITION_CONTROL_IDS,
  I245_ACQUISITION_PATH_IDS,
  buildI245ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluThreeBlockingResidualCanonicalWitnessAcquisitionReadinessReview,
} from '../src/research/i245-challenge-combination-support-channel-competing-relation-settlement-yuding-suijinlu-three-blocking-residual-canonical-witness-acquisition-readiness-review.js';

const validI244 = () => {
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
  return buildI244ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluCanonicalProvenanceAcquisitionEvidenceAdequacyResidualGapReassessmentReview(i243);
};

describe('I245 Yuding Suijinlu three-blocking-residual canonical-witness acquisition readiness', () => {
  it('accepts the exact I244 three-blocking-residual boundary', () => {
    const report = buildI245ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluThreeBlockingResidualCanonicalWitnessAcquisitionReadinessReview(validI244());
    expect(report.status).toBe(
      'RESOLVED_COMPETING_RELATION_SETTLEMENT_YUDING_SUIJINLU_THREE_BLOCKING_RESIDUAL_CANONICAL_WITNESS_ACQUISITION_READINESS_REVIEW',
    );
    expect(report.decision).toBe(
      'THREE_AUTHORITY_BLOCKING_RESIDUALS_FOUR_CANONICAL_WITNESS_ACQUISITION_PATHS_EIGHTEEN_CONTROLS_FROZEN_PUBLICLY_ACCESSIBLE_CATALOG_FACSIMILE_OR_VERIFIED_2011_PRINT_PAGE_ONLY_NO_EXTERNAL_CONTACT_NO_ACQUISITION_EXECUTED_NO_PROMOTION',
    );
    expect(report.exactI244BoundaryAccepted).toBe(true);
    expect(report.authorityBlockingResidualCount).toBe(3);
    expect(report.legacyFormalAdmissibilityGapCount).toBe(4);
    expect(report.nonBlockingUnresolvedContextCount).toBe(2);
    expect(report.precisionCorrectedI243DirectPublicEvidenceRecordCount).toBe(7);
    expect(report.precisionCorrectedI243SearchIndexLeadRecordCount).toBe(1);
  });

  it('freezes exactly four canonical-witness acquisition paths', () => {
    const report = buildI245ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluThreeBlockingResidualCanonicalWitnessAcquisitionReadinessReview(validI244());
    expect(I245_ACQUISITION_PATH_IDS).toEqual([
      'PALACE_MANUSCRIPT_CUSTODIAN_CATALOG_SHELFMARK_BINDING_TRACE',
      'PALACE_MANUSCRIPT_OR_AUTHORIZED_FACSIMILE_EXACT_TARGET_PASSAGE_BINDING_TRACE',
      'VERIFIED_2011_HUALING_PRINT_EXACT_TARGET_PASSAGE_PAGE_TRACE',
      'PRIMARY_CANONICAL_WITNESS_RULE_BEARING_CONTEXT_NORMATIVE_ADMISSIBILITY_TRACE',
    ]);
    expect(report.acquisitionPathIds).toEqual(I245_ACQUISITION_PATH_IDS);
    expect(report.acquisitionPathCount).toBe(4);
    expect(report.targetedPublicAcquisitionAuthorized).toBe(true);
    expect(report.acquisitionExecutedByThisGate).toBe(false);
  });

  it('freezes eighteen controls and does not authorize external custodian contact', () => {
    const report = buildI245ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluThreeBlockingResidualCanonicalWitnessAcquisitionReadinessReview(validI244());
    expect(I245_ACQUISITION_CONTROL_IDS).toHaveLength(18);
    expect(report.acquisitionControlIds).toEqual(I245_ACQUISITION_CONTROL_IDS);
    expect(report.acquisitionControlCount).toBe(18);
    expect(report.acquisitionContractFrozen).toBe(true);
    expect(report.externalCustodianContactAuthorizedByThisGate).toBe(false);
  });

  it('requires source-bound primary identity and exact target passage rather than publication marketing or search snippets', () => {
    const report = buildI245ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluThreeBlockingResidualCanonicalWitnessAcquisitionReadinessReview(validI244());
    expect(report.primaryIdentityRequiresCustodianCatalogShelfmarkOrEquivalentSourceChain).toBe(true);
    expect(report.publisherDescriptionAloneMayEstablishPalaceCustodianBinding).toBe(false);
    expect(report.exactPassageRequiresPrimaryOrVerified2011EditionPage).toBe(true);
    expect(report.searchIndexSnippetMayEstablishExactPassage).toBe(false);
    expect(report.verified2011PrintPageMayInventPalaceShelfmark).toBe(false);
    expect(report.palaceFacsimileRequiresDocumentIdentityAndTargetPassageBinding).toBe(true);
    expect(report.normativeAdmissibilityRequiresPrimaryIdentityAndExactPassageBinding).toBe(true);
  });

  it('rejects general rediscovery, mirror-chain completion and same-text repetition as canonical authority progress', () => {
    const report = buildI245ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluThreeBlockingResidualCanonicalWitnessAcquisitionReadinessReview(validI244());
    expect(report.generalRuleRediscoveryMayCountAsProgress).toBe(false);
    expect(report.publicMirrorDerivativeChainCompletionMayCountAsCanonicalAuthorityProgress).toBe(false);
    expect(report.sameTextPublicWitnessesMayCountAsIndependentAuthorities).toBe(false);
    expect(report.provenanceIndependenceAdjudicatedByThisGate).toBe(false);
    expect(report.derivativeRelationshipAdjudicatedByThisGate).toBe(false);
  });

  it('does not close settlement authority or authorize interpretation decisions', () => {
    const report = buildI245ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluThreeBlockingResidualCanonicalWitnessAcquisitionReadinessReview(validI244());
    expect(report.authorityGap).toBe('COMPETING_RELATION_SETTLEMENT_AUTHORITY_NOT_ESTABLISHED');
    expect(report.authorityGapClosed).toBe(false);
    expect(report.authorityPromotedByThisGate).toBe(false);
    expect(report.competingRelationSettlementResolved).toBe(false);
    expect(report.crossRelationPrecedenceAuthorized).toBe(false);
    expect(report.multiTouchAggregationAuthorized).toBe(false);
    expect(report.recommendedNextGate).toBe(
      'COMPETING_RELATION_SETTLEMENT_YUDING_SUIJINLU_THREE_BLOCKING_RESIDUAL_CANONICAL_WITNESS_ACQUISITION_EVIDENCE',
    );
  });

  it('preserves I232, I132, Qu Wei, Li 1998, v2 and all production guards', () => {
    const report = buildI245ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluThreeBlockingResidualCanonicalWitnessAcquisitionReadinessReview(validI244());
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

  it('fails closed when the I244 blocking frontier is altered', () => {
    const i244 = validI244();
    const invalid = { ...i244, authorityBlockingResidualCount: 0 } as unknown as typeof i244;
    const report = buildI245ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluThreeBlockingResidualCanonicalWitnessAcquisitionReadinessReview(invalid);
    expect(report.status).toBe('I244_RESIDUAL_GAP_REASSESSMENT_BOUNDARY_INVALID');
    expect(report.exactI244BoundaryAccepted).toBe(false);
    expect(report.authorityBlockingResidualCount).toBe(0);
    expect(report.acquisitionPathCount).toBe(0);
    expect(report.acquisitionControlCount).toBe(0);
    expect(report.acquisitionContractFrozen).toBe(false);
    expect(report.targetedPublicAcquisitionAuthorized).toBe(false);
    expect(report.authorityGap).toBe('UPSTREAM_INVALID');
    expect(report.recommendedNextGate).toBe(
      'COMPETING_RELATION_SETTLEMENT_YUDING_SUIJINLU_THREE_BLOCKING_RESIDUAL_CANONICAL_WITNESS_ACQUISITION_READINESS_REVIEW',
    );
  });
});
