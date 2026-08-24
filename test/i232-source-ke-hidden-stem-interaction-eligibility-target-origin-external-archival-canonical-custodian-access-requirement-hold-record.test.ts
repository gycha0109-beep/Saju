import { describe, expect, it } from 'vitest';
import { I228_RESIDUAL_ADMISSIBILITY_GAP_IDS } from '../src/research/i228-source-ke-hidden-stem-interaction-eligibility-target-origin-discovery-evidence-adequacy-residual-path-reassessment-review.js';
import {
  I231_EXTERNAL_ACCESS_REQUIREMENT_IDS,
  I231_REASSESSMENT_CONTROL_IDS,
  type I231SourceKeHiddenStemInteractionEligibilityTargetOriginHigherProvenanceAcquisitionEvidenceAdequacyExternalAccessReassessmentReviewReport,
} from '../src/research/i231-source-ke-hidden-stem-interaction-eligibility-target-origin-higher-provenance-acquisition-evidence-adequacy-external-access-reassessment-review.js';
import {
  I232_HOLD_CONTROL_IDS,
  I232_RESUME_TRIGGER_IDS,
  buildI232SourceKeHiddenStemInteractionEligibilityTargetOriginExternalArchivalCanonicalCustodianAccessRequirementHoldRecord,
} from '../src/research/i232-source-ke-hidden-stem-interaction-eligibility-target-origin-external-archival-canonical-custodian-access-requirement-hold-record.js';

const validI231 = (): I231SourceKeHiddenStemInteractionEligibilityTargetOriginHigherProvenanceAcquisitionEvidenceAdequacyExternalAccessReassessmentReviewReport =>
  ({
    reviewId: 'i231_fixture',
    status: 'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_ORIGIN_HIGHER_PROVENANCE_ACQUISITION_EVIDENCE_ADEQUACY_EXTERNAL_ACCESS_REASSESSMENT_REVIEW',
    decision: 'I230_EVIDENCE_ADEQUATE_FOR_FOUR_UNRESOLVED_ADMISSIBILITY_GAPS_PRE_TARGET_SAME_TEXT_FAMILY_LEAD_ACCEPTED_AS_CONTEXT_ZERO_QUALIFYING_HIGHER_PROVENANCE_WITNESSES_AUTOMATED_PUBLIC_WEB_REMEDIATION_BOUNDARY_REACHED_EXTERNAL_ARCHIVAL_AUTHOR_CONTROLLED_CANONICAL_OR_CUSTODIAN_ACCESS_REQUIRED_NO_EXHAUSTION_NO_ADJUDICATION_NO_PROMOTION',
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI230BoundaryAccepted: true,
    targetCandidateId: 'LI_YANCHEN_GANZHI_NINE_RELATIONS_PART2_SOHU_2017_HTML',
    sevenRequirementCoverageAcceptedAsUpstreamFinding: true,
    coverageReevaluationAuthorizedByThisGate: false,
    I230EvidenceAdequateForRecordedUnresolvedFindings: true,
    assessedResidualGapCount: 4,
    resolvedResidualGapCount: 0,
    unresolvedResidualGapCount: 4,
    unresolvedResidualGapIds: I228_RESIDUAL_ADMISSIBILITY_GAP_IDS,
    qualifyingHigherProvenanceWitnessCountAccepted: 0,
    preTargetSameTextFamilyLeadAcceptedAsContext: true,
    preTargetSameTextFamilyLeadQualifiesAsExactTargetPredecessor: false,
    preTargetSameTextFamilyLeadQualifiesAsOriginalAuthorshipBinding: false,
    preTargetSameTextFamilyLeadQualifiesAsDoctrinalLineageBinding: false,
    preTargetSameTextFamilyLeadQualifiesAsCanonicalWitness: false,
    automatedPublicWebRemediationContinuationMethodologicallyJustified: false,
    automatedPublicWebRemediationBoundaryReached: true,
    externalAccessRequiredForFurtherGapResolution: true,
    manualOrExternalCustodianActionRequired: true,
    externalAccessRequirementIds: I231_EXTERNAL_ACCESS_REQUIREMENT_IDS,
    externalAccessRequirementCount: 3,
    externalAccessRequirementsFrozenProspectively: true,
    archiveExactPassageRequirementOpen: true,
    authorControlledOrCanonicalAuthorshipLineageRequirementOpen: true,
    custodianBoundExactPassageRequirementOpen: true,
    restrictiveConflictAdjudicationDeferredUntilTargetLineageEstablished: true,
    webBoundaryCreatesNegativeFinding: false,
    archiveAccessFailureCreatesNegativeFinding: false,
    searchSilenceCreatesNegativeFinding: false,
    custodianNonResponseCreatesNegativeFinding: false,
    paywallCreatesNegativeFinding: false,
    targetedDiscoveryExhaustionEstablished: false,
    onlineCorpusExhaustionEstablished: false,
    corpusExhaustionEstablished: false,
    universalNoFurtherEvidenceClaimEstablished: false,
    sourceNormativeAdmissibilityAdjudicatedByThisGate: false,
    authorityPromotionReadinessEstablishedByThisGate: false,
    authorityGap: 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED',
    authorityGapClosed: false,
    authorityPromotedByThisGate: false,
    candidateRegisteredByThisGate: false,
    candidateSelectedByThisGate: false,
    doctrinalConflictPreserved: true,
    doctrinalConflictResolvedByThisGate: false,
    provenanceIndependenceAdjudicatedByThisGate: false,
    derivativeRelationshipAdjudicatedByThisGate: false,
    evidenceRebindingMethodologicallyReady: false,
    evidenceRebindingAuthorizedByThisGate: false,
    evidenceRebindingExecutedByThisGate: false,
    I132IndependentNormativeProvenanceRequirementRemainsNormative: true,
    I132PolicyRelaxationAuthorizedByThisGate: false,
    quWei2001HoldPreserved: true,
    li1998SameTargetPathSuspendedNotRetired: true,
    candidateSetMutatedByThisGate: false,
    candidateSetReevaluationAuthorizedByThisGate: false,
    currentV2PackageAndCandidateSetRemainImmutable: true,
    currentV2ProvenanceDisposition: 'BLOCKED_UNDER_CURRENT_EVIDENCE',
    reassessmentControlIds: I231_REASSESSMENT_CONTROL_IDS,
    reassessmentControlCount: 14,
    reassessmentControlsFrozen: true,
    actualCompositionPerformedByThisGate: false,
    multiSourceCompositionAuthorized: false,
    thresholdRuleCreatedByThisGate: false,
    damageEvaluationAuthorized: false,
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    productionPolicyExecutionAuthorized: false,
    recommendedNextGate: 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_ORIGIN_EXTERNAL_ARCHIVAL_CANONICAL_CUSTODIAN_ACCESS_REQUIREMENT_HOLD_RECORD',
  }) as unknown as I231SourceKeHiddenStemInteractionEligibilityTargetOriginHigherProvenanceAcquisitionEvidenceAdequacyExternalAccessReassessmentReviewReport;

describe('I232 hidden-stem target-origin external-access hold record', () => {
  it('accepts the exact I231 boundary and establishes the hold', () => {
    const report = buildI232SourceKeHiddenStemInteractionEligibilityTargetOriginExternalArchivalCanonicalCustodianAccessRequirementHoldRecord(validI231());
    expect(report.status).toBe('RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_ORIGIN_EXTERNAL_ARCHIVAL_CANONICAL_CUSTODIAN_ACCESS_REQUIREMENT_HOLD_RECORD');
    expect(report.exactI231BoundaryAccepted).toBe(true);
    expect(report.holdState).toBe('HOLD_AWAITING_MATERIALLY_NEW_EXTERNAL_ACCESS_EVIDENCE');
    expect(report.automatedPublicWebRemediationHoldActive).toBe(true);
    expect(report.automatedPublicWebResearchRetired).toBe(false);
    expect(report.webAccessibleRemediationBoundaryAccepted).toBe(true);
  });

  it('preserves all four admissibility gaps and the pre-target lead as context only', () => {
    const report = buildI232SourceKeHiddenStemInteractionEligibilityTargetOriginExternalArchivalCanonicalCustodianAccessRequirementHoldRecord(validI231());
    expect(report.remainingGapIds).toEqual(I228_RESIDUAL_ADMISSIBILITY_GAP_IDS);
    expect(report.remainingGapCount).toBe(4);
    expect(report.gapsResolvedByHoldCount).toBe(0);
    expect(report.preTargetSameTextFamilyLeadPreservedAsContext).toBe(true);
    expect(report.preTargetSameTextFamilyLeadMayEstablishExactPredecessor).toBe(false);
    expect(report.preTargetSameTextFamilyLeadMayEstablishOriginalAuthorshipOrLineage).toBe(false);
  });

  it('freezes all three materially new external evidence resume triggers', () => {
    const report = buildI232SourceKeHiddenStemInteractionEligibilityTargetOriginExternalArchivalCanonicalCustodianAccessRequirementHoldRecord(validI231());
    expect(report.resumeTriggerIds).toEqual(I232_RESUME_TRIGGER_IDS);
    expect(report.resumeTriggerCount).toBe(3);
    expect(report.resumeTriggersFrozen).toBe(true);
    expect(report.materiallyNewExternalEvidenceRequiredToResume).toBe(true);
    expect(report.preTargetArchiveExactPassageTriggerRequired).toBe(true);
    expect(report.authorControlledOrCanonicalAuthorshipLineageTriggerRequired).toBe(true);
    expect(report.custodianBoundBookCourseExactPassageTriggerRequired).toBe(true);
    expect(report.oneResumeTriggerMayStartEvidenceIngestionReadinessReview).toBe(true);
    expect(report.resumeTriggerSatisfiedByThisGate).toBe(false);
    expect(report.externalEvidenceIngestionExecutedByThisGate).toBe(false);
  });

  it('does not convert the hold into retirement, exhaustion, or negative evidence', () => {
    const report = buildI232SourceKeHiddenStemInteractionEligibilityTargetOriginExternalArchivalCanonicalCustodianAccessRequirementHoldRecord(validI231());
    expect(report.equivalentAutomatedPublicWebRepeatAuthorizedAsProgress).toBe(false);
    expect(report.holdCreatesNegativeFinding).toBe(false);
    expect(report.holdEstablishesTargetedDiscoveryExhaustion).toBe(false);
    expect(report.holdEstablishesOnlineCorpusExhaustion).toBe(false);
    expect(report.holdEstablishesCorpusExhaustion).toBe(false);
    expect(report.universalNoFurtherEvidenceClaimEstablished).toBe(false);
  });

  it('requires separate authority for external contact and leaves doctrinal conflict unresolved', () => {
    const report = buildI232SourceKeHiddenStemInteractionEligibilityTargetOriginExternalArchivalCanonicalCustodianAccessRequirementHoldRecord(validI231());
    expect(report.externalContactOrCustodianActionAuthorizedByThisGate).toBe(false);
    expect(report.externalContactOrCustodianActionExecutedByThisGate).toBe(false);
    expect(report.separateExplicitAuthorityRequiredForExternalContactOrCustodianAction).toBe(true);
    expect(report.restrictiveConflictAdjudicationDeferredUntilTargetLineageEstablished).toBe(true);
    expect(report.doctrinalConflictPreserved).toBe(true);
    expect(report.doctrinalConflictResolvedByThisGate).toBe(false);
  });

  it('freezes thirteen hold controls and a conditional evidence-ingestion route', () => {
    const report = buildI232SourceKeHiddenStemInteractionEligibilityTargetOriginExternalArchivalCanonicalCustodianAccessRequirementHoldRecord(validI231());
    expect(report.holdControlIds).toEqual(I232_HOLD_CONTROL_IDS);
    expect(report.holdControlCount).toBe(13);
    expect(report.holdControlsFrozen).toBe(true);
    expect(report.recommendedNextGate).toBe('UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_ORIGIN_EXTERNAL_ACCESS_EVIDENCE_INGESTION_READINESS_REVIEW');
    expect(report.nextGateActivationCondition).toBe('MATERIALLY_NEW_EXTERNAL_ACCESS_EVIDENCE_TRIGGER_REQUIRED');
  });

  it('preserves authority, provenance, candidate-set, I132, Qu Wei, Li and production guards', () => {
    const report = buildI232SourceKeHiddenStemInteractionEligibilityTargetOriginExternalArchivalCanonicalCustodianAccessRequirementHoldRecord(validI231());
    expect(report.sourceNormativeAdmissibilityAdjudicatedByThisGate).toBe(false);
    expect(report.authorityPromotionReadinessEstablishedByThisGate).toBe(false);
    expect(report.authorityGap).toBe('SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED');
    expect(report.authorityGapClosed).toBe(false);
    expect(report.authorityPromotedByThisGate).toBe(false);
    expect(report.candidateRegisteredByThisGate).toBe(false);
    expect(report.candidateSelectedByThisGate).toBe(false);
    expect(report.provenanceIndependenceAdjudicatedByThisGate).toBe(false);
    expect(report.derivativeRelationshipAdjudicatedByThisGate).toBe(false);
    expect(report.evidenceRebindingMethodologicallyReady).toBe(false);
    expect(report.evidenceRebindingAuthorizedByThisGate).toBe(false);
    expect(report.evidenceRebindingExecutedByThisGate).toBe(false);
    expect(report.I132IndependentNormativeProvenanceRequirementRemainsNormative).toBe(true);
    expect(report.I132PolicyRelaxationAuthorizedByThisGate).toBe(false);
    expect(report.quWei2001HoldPreserved).toBe(true);
    expect(report.li1998SameTargetPathSuspendedNotRetired).toBe(true);
    expect(report.candidateSetMutatedByThisGate).toBe(false);
    expect(report.candidateSetReevaluationAuthorizedByThisGate).toBe(false);
    expect(report.currentV2PackageAndCandidateSetRemainImmutable).toBe(true);
    expect(report.currentV2ProvenanceDisposition).toBe('BLOCKED_UNDER_CURRENT_EVIDENCE');
    expect(report.actualCompositionPerformedByThisGate).toBe(false);
    expect(report.multiSourceCompositionAuthorized).toBe(false);
    expect(report.thresholdRuleCreatedByThisGate).toBe(false);
    expect(report.damageEvaluationAuthorized).toBe(false);
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
    expect(report.productionPolicyExecutionAuthorized).toBe(false);
  });

  it('fails closed when the I231 boundary changes', () => {
    const invalid = { ...validI231(), externalAccessRequirementCount: 0 } as unknown as I231SourceKeHiddenStemInteractionEligibilityTargetOriginHigherProvenanceAcquisitionEvidenceAdequacyExternalAccessReassessmentReviewReport;
    const report = buildI232SourceKeHiddenStemInteractionEligibilityTargetOriginExternalArchivalCanonicalCustodianAccessRequirementHoldRecord(invalid);
    expect(report.status).toBe('I231_EXTERNAL_ACCESS_REASSESSMENT_BOUNDARY_INVALID');
    expect(report.exactI231BoundaryAccepted).toBe(false);
    expect(report.holdState).toBe('NOT_ESTABLISHED');
    expect(report.remainingGapCount).toBe(0);
    expect(report.resumeTriggerCount).toBe(0);
    expect(report.automatedPublicWebRemediationHoldActive).toBe(false);
    expect(report.authorityGap).toBe('UPSTREAM_INVALID');
  });
});
