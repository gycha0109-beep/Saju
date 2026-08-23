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
import { buildI247ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluCanonicalWitnessAcquisitionEvidenceAdequacyExternalAccessReassessmentReview } from '../src/research/i247-challenge-combination-support-channel-competing-relation-settlement-yuding-suijinlu-canonical-witness-acquisition-evidence-adequacy-external-access-reassessment-review.js';
import {
  I248_HOLD_CONTROL_IDS,
  I248_RESUME_TRIGGER_IDS,
  buildI248ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluExternalCanonicalWitnessAccessRequirementHoldRecord,
} from '../src/research/i248-challenge-combination-support-channel-competing-relation-settlement-yuding-suijinlu-external-canonical-witness-access-requirement-hold-record.js';

const validI247 = () => {
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
  const i246 = buildI246ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluThreeBlockingResidualCanonicalWitnessAcquisitionEvidence(i245);
  return buildI247ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluCanonicalWitnessAcquisitionEvidenceAdequacyExternalAccessReassessmentReview(i246);
};

describe('I248 Yuding Suijinlu external canonical-witness access HOLD', () => {
  it('establishes HOLD only from the exact I247 external-access boundary', () => {
    const report = buildI248ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluExternalCanonicalWitnessAccessRequirementHoldRecord(validI247());
    expect(report.status).toBe(
      'RESOLVED_COMPETING_RELATION_SETTLEMENT_YUDING_SUIJINLU_EXTERNAL_CANONICAL_WITNESS_ACCESS_REQUIREMENT_HOLD_RECORD',
    );
    expect(report.decision).toBe(
      'YUDING_SUIJINLU_CANONICAL_WITNESS_AUTOMATED_PUBLIC_ACQUISITION_ON_HOLD_THREE_RESUME_TRIGGERS_FROZEN_THREE_AUTHORITY_BLOCKING_RESIDUALS_REMAIN_THREE_SCAN_SURFACES_PRESERVED_AS_CONTEXT_NO_EXHAUSTION_NO_ADJUDICATION_NO_PROMOTION',
    );
    expect(report.exactI247BoundaryAccepted).toBe(true);
    expect(report.holdState).toBe('HOLD_AWAITING_MATERIALLY_NEW_EXTERNAL_OR_PUBLIC_PRIMARY_CANONICAL_WITNESS_ACCESS_EVIDENCE');
    expect(report.automatedPublicAcquisitionBoundaryAccepted).toBe(true);
    expect(report.automatedPublicAcquisitionHoldActive).toBe(true);
    expect(report.automatedPublicResearchRetired).toBe(false);
    expect(report.equivalentAutomatedPublicRepeatAuthorizedAsProgress).toBe(false);
  });

  it('keeps three blocking residuals, four formal gaps and two provenance contexts unchanged', () => {
    const report = buildI248ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluExternalCanonicalWitnessAccessRequirementHoldRecord(validI247());
    expect(report.authorityBlockingResidualIds).toEqual([
      'YUDING_SUIJINLU_PRIMARY_SOURCE_IDENTITY_AND_CUSTODIAN_BINDING_GAP',
      'YUDING_SUIJINLU_CANONICAL_EXACT_TARGET_PASSAGE_FACSIMILE_GAP',
      'YUDING_SUIJINLU_TARGET_PASSAGE_FINAL_NORMATIVE_ADMISSIBILITY_GAP',
    ]);
    expect(report.authorityBlockingResidualCount).toBe(3);
    expect(report.blockingResidualsResolvedByHoldCount).toBe(0);
    expect(report.legacyFormalAdmissibilityGapCount).toBe(4);
    expect(report.nonBlockingUnresolvedContextCount).toBe(2);
    expect(report.observedScanSurfaceCountPreservedAsContext).toBe(3);
    expect(report.scanSurfacesMayEstablishCanonicalAuthority).toBe(false);
  });

  it('freezes exactly the three I247 resume triggers and permits a newly public primary witness to satisfy one', () => {
    const report = buildI248ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluExternalCanonicalWitnessAccessRequirementHoldRecord(validI247());
    expect(I248_RESUME_TRIGGER_IDS).toEqual([
      'PALACE_MANUSCRIPT_CUSTODIAN_CATALOG_OR_SHELFMARK_RECORD',
      'PALACE_MANUSCRIPT_OR_AUTHORIZED_FACSIMILE_WITH_EXACT_TARGET_PASSAGE',
      'VERIFIED_2011_HUALING_PRINT_PAGE_WITH_EXACT_TARGET_PASSAGE_AND_EDITION_IDENTITY',
    ]);
    expect(report.resumeTriggerIds).toEqual(I248_RESUME_TRIGGER_IDS);
    expect(report.resumeTriggerCount).toBe(3);
    expect(report.resumeTriggersFrozen).toBe(true);
    expect(report.materiallyNewExternalOrPublicPrimaryEvidenceRequiredToResume).toBe(true);
    expect(report.custodianCatalogOrShelfmarkTriggerOpen).toBe(true);
    expect(report.palaceOrAuthorizedFacsimileExactPassageTriggerOpen).toBe(true);
    expect(report.verified2011EditionExactPageTriggerOpen).toBe(true);
    expect(report.newlyPublicPrimaryWitnessMaySatisfyResumeTrigger).toBe(true);
  });

  it('allows a trigger to start ingestion readiness but lets the HOLD itself close nothing', () => {
    const report = buildI248ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluExternalCanonicalWitnessAccessRequirementHoldRecord(validI247());
    expect(report.oneResumeTriggerMayStartEvidenceIngestionReadinessReview).toBe(true);
    expect(report.resumeTriggerSatisfiedByThisGate).toBe(false);
    expect(report.externalEvidenceIngestionExecutedByThisGate).toBe(false);
    expect(report.finalNormativeAdmissibilityRemainsDownstream).toBe(true);
    expect(report.authorityGapClosed).toBe(false);
    expect(report.authorityPromotedByThisGate).toBe(false);
    expect(report.competingRelationSettlementResolved).toBe(false);
  });

  it('does not turn HOLD into retirement, nonexistence, negative evidence or exhaustion', () => {
    const report = buildI248ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluExternalCanonicalWitnessAccessRequirementHoldRecord(validI247());
    expect(report.automatedPublicResearchRetired).toBe(false);
    expect(report.holdCreatesNegativeFinding).toBe(false);
    expect(report.holdEstablishesTargetedDiscoveryExhaustion).toBe(false);
    expect(report.holdEstablishesOnlineCorpusExhaustion).toBe(false);
    expect(report.holdEstablishesCorpusExhaustion).toBe(false);
    expect(report.holdEstablishesNonexistence).toBe(false);
    expect(report.universalNoFurtherEvidenceClaimEstablished).toBe(false);
  });

  it('requires separate explicit authority for any direct external contact or custodian action', () => {
    const report = buildI248ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluExternalCanonicalWitnessAccessRequirementHoldRecord(validI247());
    expect(report.externalContactOrCustodianActionAuthorizedByThisGate).toBe(false);
    expect(report.externalContactOrCustodianActionExecutedByThisGate).toBe(false);
    expect(report.separateExplicitAuthorityRequiredForExternalContactOrCustodianAction).toBe(true);
  });

  it('freezes thirteen controls and preserves I132, I232, Qu Wei, Li 1998, v2 and production guards', () => {
    const report = buildI248ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluExternalCanonicalWitnessAccessRequirementHoldRecord(validI247());
    expect(I248_HOLD_CONTROL_IDS).toHaveLength(13);
    expect(report.holdControlIds).toEqual(I248_HOLD_CONTROL_IDS);
    expect(report.holdControlCount).toBe(13);
    expect(report.holdControlsFrozen).toBe(true);
    expect(report.authorityGap).toBe('COMPETING_RELATION_SETTLEMENT_AUTHORITY_NOT_ESTABLISHED');
    expect(report.crossRelationPrecedenceAuthorized).toBe(false);
    expect(report.multiTouchAggregationAuthorized).toBe(false);
    expect(report.candidateRegisteredByThisGate).toBe(false);
    expect(report.candidateSelectedByThisGate).toBe(false);
    expect(report.candidateSetMutatedByThisGate).toBe(false);
    expect(report.evidenceRebindingMethodologicallyReady).toBe(false);
    expect(report.evidenceRebindingAuthorizedByThisGate).toBe(false);
    expect(report.evidenceRebindingExecutedByThisGate).toBe(false);
    expect(report.provenanceIndependenceAdjudicatedByThisGate).toBe(false);
    expect(report.derivativeRelationshipAdjudicatedByThisGate).toBe(false);
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
      'COMPETING_RELATION_SETTLEMENT_YUDING_SUIJINLU_EXTERNAL_CANONICAL_WITNESS_EVIDENCE_INGESTION_READINESS_REVIEW',
    );
    expect(report.nextGateActivationCondition).toBe(
      'MATERIALLY_NEW_EXTERNAL_OR_PUBLIC_PRIMARY_CANONICAL_WITNESS_TRIGGER_REQUIRED',
    );
  });

  it('fails closed when the I247 boundary is altered', () => {
    const i247 = validI247();
    const invalid = { ...i247, automatedPublicAcquisitionBoundaryReached: false } as unknown as typeof i247;
    const report = buildI248ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluExternalCanonicalWitnessAccessRequirementHoldRecord(invalid);
    expect(report.status).toBe('I247_EXTERNAL_ACCESS_REASSESSMENT_BOUNDARY_INVALID');
    expect(report.exactI247BoundaryAccepted).toBe(false);
    expect(report.holdState).toBe('NOT_ESTABLISHED');
    expect(report.automatedPublicAcquisitionHoldActive).toBe(false);
    expect(report.resumeTriggerCount).toBe(0);
    expect(report.resumeTriggersFrozen).toBe(false);
    expect(report.authorityBlockingResidualCount).toBe(0);
    expect(report.holdControlCount).toBe(0);
    expect(report.authorityGap).toBe('UPSTREAM_INVALID');
    expect(report.recommendedNextGate).toBe(
      'COMPETING_RELATION_SETTLEMENT_YUDING_SUIJINLU_EXTERNAL_CANONICAL_WITNESS_ACCESS_REQUIREMENT_HOLD_RECORD',
    );
    expect(report.nextGateActivationCondition).toBe('I247_BOUNDARY_NOT_ACCEPTED');
  });
});
