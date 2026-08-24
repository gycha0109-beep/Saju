import { describe, expect, it } from 'vitest';
import { I228_RESIDUAL_ADMISSIBILITY_GAP_IDS } from '../src/research/i228-source-ke-hidden-stem-interaction-eligibility-target-origin-discovery-evidence-adequacy-residual-path-reassessment-review.js';
import type { I230SourceKeHiddenStemInteractionEligibilityTargetOriginHigherProvenanceArchivalOrCustodianAcquisitionEvidenceReport } from '../src/research/i230-source-ke-hidden-stem-interaction-eligibility-target-origin-higher-provenance-archival-or-custodian-acquisition-evidence.js';
import {
  I231_EXTERNAL_ACCESS_REQUIREMENT_IDS,
  I231_REASSESSMENT_CONTROL_IDS,
  buildI231SourceKeHiddenStemInteractionEligibilityTargetOriginHigherProvenanceAcquisitionEvidenceAdequacyExternalAccessReassessmentReview,
} from '../src/research/i231-source-ke-hidden-stem-interaction-eligibility-target-origin-higher-provenance-acquisition-evidence-adequacy-external-access-reassessment-review.js';

const validI230 = (): I230SourceKeHiddenStemInteractionEligibilityTargetOriginHigherProvenanceArchivalOrCustodianAcquisitionEvidenceReport =>
  ({
    evidenceId: 'i230_fixture',
    status: 'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_ORIGIN_HIGHER_PROVENANCE_ARCHIVAL_OR_CUSTODIAN_ACQUISITION_EVIDENCE',
    decision: 'FOUR_HIGHER_PROVENANCE_PATHS_EXECUTED_ONE_PRE_TARGET_SAME_TEXT_FAMILY_USER_GENERATED_WITNESS_LEAD_OBSERVED_NO_QUALIFYING_PRE_TARGET_ARCHIVE_AUTHOR_CONTROLLED_CANONICAL_OR_CUSTODIAN_EXACT_TARGET_WITNESS_ACQUIRED_FOUR_ADMISSIBILITY_GAPS_REMAIN_NO_NEGATIVE_EXHAUSTION_FINDING_NO_PROMOTION',
    exactI229BoundaryAccepted: true,
    targetCandidateId: 'LI_YANCHEN_GANZHI_NINE_RELATIONS_PART2_SOHU_2017_HTML',
    sevenRequirementCoverageAcceptedAsUpstreamFinding: true,
    coverageReevaluationPerformedByThisGate: false,
    acquisitionExecuted: true,
    executedAcquisitionPathCount: 4,
    acquisitionRecordCount: 4,
    I229ControlsAccepted: true,
    I229ControlCount: 18,
    qualifyingPreTargetArchiveSnapshotAcquired: false,
    qualifyingAuthorControlledExactTargetSourceAcquired: false,
    preTargetSameTextFamilyLeadObserved: true,
    preTargetSameTextFamilyLeadContainsHiddenStemNineRelationsAndExternalActivationLanguage: true,
    preTargetSameTextFamilyLeadContainsI226RareExactTargetPassage: false,
    preTargetSameTextFamilyLeadHasCanonicalEditionIdentity: false,
    preTargetSameTextFamilyLeadHasOriginalAuthorshipBinding: false,
    preTargetSameTextFamilyLeadMayEstablishTargetPredecessor: false,
    qualifyingCustodianBoundExactTargetWitnessAcquired: false,
    qualifyingHigherProvenanceWitnessCount: 0,
    unresolvedAdmissibilityGapCount: 4,
    unresolvedAdmissibilityGapIds: I228_RESIDUAL_ADMISSIBILITY_GAP_IDS,
    exactTargetOriginalAuthorshipEstablishedByThisGate: false,
    exactTargetDoctrinalLineageEstablishedByThisGate: false,
    exactTargetPriorSourceDependencyEstablishedByThisGate: false,
    derivativeRelationshipAdjudicatedByThisGate: false,
    restrictiveDoctrineConflictAdjudicatedByThisGate: false,
    restrictiveDoctrineSchoolBoundaryEstablishedByThisGate: false,
    sourceNormativeAdmissibilityAdjudicatedByThisGate: false,
    authorityPromotionReadinessEstablishedByThisGate: false,
    accessLimitationsRecorded: true,
    accessLimitationsEqualCorpusExhaustion: false,
    negativeFindingCreatedFromAccessFailureOrSilence: false,
    corpusExhaustionClaimed: false,
    authorityGap: 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED',
    authorityGapClosed: false,
    authorityPromotedByThisGate: false,
    doctrinalConflictPreserved: true,
    doctrinalConflictResolvedByThisGate: false,
    quWei2001HoldPreserved: true,
    li1998SameTargetPathSuspendedNotRetired: true,
    I132IndependentNormativeProvenanceRequirementRemainsNormative: true,
    I132PolicyRelaxationAuthorizedByThisGate: false,
    provenanceIndependenceAdjudicatedByThisGate: false,
    evidenceRebindingAuthorizedByThisGate: false,
    candidateSetMutatedByThisGate: false,
    candidateSetReevaluationAuthorizedByThisGate: false,
    currentV2PackageAndCandidateSetRemainImmutable: true,
    currentV2ProvenanceDisposition: 'BLOCKED_UNDER_CURRENT_EVIDENCE',
    actualCompositionPerformedByThisGate: false,
    multiSourceCompositionAuthorized: false,
    thresholdRuleCreatedByThisGate: false,
    damageEvaluationAuthorized: false,
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    productionPolicyExecutionAuthorized: false,
    recommendedNextGate: 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_ORIGIN_HIGHER_PROVENANCE_ACQUISITION_EVIDENCE_ADEQUACY_EXTERNAL_ACCESS_REASSESSMENT_REVIEW',
  }) as unknown as I230SourceKeHiddenStemInteractionEligibilityTargetOriginHigherProvenanceArchivalOrCustodianAcquisitionEvidenceReport;

describe('I231 hidden-stem target-origin external-access reassessment', () => {
  it('accepts the exact I230 boundary and preserves all four unresolved admissibility gaps', () => {
    const report = buildI231SourceKeHiddenStemInteractionEligibilityTargetOriginHigherProvenanceAcquisitionEvidenceAdequacyExternalAccessReassessmentReview(validI230());
    expect(report.status).toBe('RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_ORIGIN_HIGHER_PROVENANCE_ACQUISITION_EVIDENCE_ADEQUACY_EXTERNAL_ACCESS_REASSESSMENT_REVIEW');
    expect(report.exactI230BoundaryAccepted).toBe(true);
    expect(report.I230EvidenceAdequateForRecordedUnresolvedFindings).toBe(true);
    expect(report.assessedResidualGapCount).toBe(4);
    expect(report.resolvedResidualGapCount).toBe(0);
    expect(report.unresolvedResidualGapCount).toBe(4);
    expect(report.unresolvedResidualGapIds).toEqual(I228_RESIDUAL_ADMISSIBILITY_GAP_IDS);
  });

  it('accepts the pre-target same-text-family lead only as context', () => {
    const report = buildI231SourceKeHiddenStemInteractionEligibilityTargetOriginHigherProvenanceAcquisitionEvidenceAdequacyExternalAccessReassessmentReview(validI230());
    expect(report.preTargetSameTextFamilyLeadAcceptedAsContext).toBe(true);
    expect(report.preTargetSameTextFamilyLeadQualifiesAsExactTargetPredecessor).toBe(false);
    expect(report.preTargetSameTextFamilyLeadQualifiesAsOriginalAuthorshipBinding).toBe(false);
    expect(report.preTargetSameTextFamilyLeadQualifiesAsDoctrinalLineageBinding).toBe(false);
    expect(report.preTargetSameTextFamilyLeadQualifiesAsCanonicalWitness).toBe(false);
    expect(report.qualifyingHigherProvenanceWitnessCountAccepted).toBe(0);
  });

  it('freezes three materially new external-access requirements', () => {
    const report = buildI231SourceKeHiddenStemInteractionEligibilityTargetOriginHigherProvenanceAcquisitionEvidenceAdequacyExternalAccessReassessmentReview(validI230());
    expect(report.externalAccessRequiredForFurtherGapResolution).toBe(true);
    expect(report.manualOrExternalCustodianActionRequired).toBe(true);
    expect(report.externalAccessRequirementIds).toEqual(I231_EXTERNAL_ACCESS_REQUIREMENT_IDS);
    expect(report.externalAccessRequirementCount).toBe(3);
    expect(report.externalAccessRequirementsFrozenProspectively).toBe(true);
    expect(report.archiveExactPassageRequirementOpen).toBe(true);
    expect(report.authorControlledOrCanonicalAuthorshipLineageRequirementOpen).toBe(true);
    expect(report.custodianBoundExactPassageRequirementOpen).toBe(true);
  });

  it('marks equivalent automated public-web remediation as methodologically bounded without exhaustion', () => {
    const report = buildI231SourceKeHiddenStemInteractionEligibilityTargetOriginHigherProvenanceAcquisitionEvidenceAdequacyExternalAccessReassessmentReview(validI230());
    expect(report.automatedPublicWebRemediationContinuationMethodologicallyJustified).toBe(false);
    expect(report.automatedPublicWebRemediationBoundaryReached).toBe(true);
    expect(report.webBoundaryCreatesNegativeFinding).toBe(false);
    expect(report.archiveAccessFailureCreatesNegativeFinding).toBe(false);
    expect(report.searchSilenceCreatesNegativeFinding).toBe(false);
    expect(report.custodianNonResponseCreatesNegativeFinding).toBe(false);
    expect(report.paywallCreatesNegativeFinding).toBe(false);
    expect(report.targetedDiscoveryExhaustionEstablished).toBe(false);
    expect(report.onlineCorpusExhaustionEstablished).toBe(false);
    expect(report.corpusExhaustionEstablished).toBe(false);
    expect(report.universalNoFurtherEvidenceClaimEstablished).toBe(false);
  });

  it('keeps restrictive conflict adjudication deferred until target lineage is established', () => {
    const report = buildI231SourceKeHiddenStemInteractionEligibilityTargetOriginHigherProvenanceAcquisitionEvidenceAdequacyExternalAccessReassessmentReview(validI230());
    expect(report.restrictiveConflictAdjudicationDeferredUntilTargetLineageEstablished).toBe(true);
    expect(report.doctrinalConflictPreserved).toBe(true);
    expect(report.doctrinalConflictResolvedByThisGate).toBe(false);
    expect(report.sourceNormativeAdmissibilityAdjudicatedByThisGate).toBe(false);
    expect(report.authorityPromotionReadinessEstablishedByThisGate).toBe(false);
  });

  it('freezes fourteen reassessment controls and routes to a hold record', () => {
    const report = buildI231SourceKeHiddenStemInteractionEligibilityTargetOriginHigherProvenanceAcquisitionEvidenceAdequacyExternalAccessReassessmentReview(validI230());
    expect(report.reassessmentControlIds).toEqual(I231_REASSESSMENT_CONTROL_IDS);
    expect(report.reassessmentControlCount).toBe(14);
    expect(report.reassessmentControlsFrozen).toBe(true);
    expect(report.recommendedNextGate).toBe('UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_ORIGIN_EXTERNAL_ARCHIVAL_CANONICAL_CUSTODIAN_ACCESS_REQUIREMENT_HOLD_RECORD');
  });

  it('preserves authority, provenance, candidate-set and production guards', () => {
    const report = buildI231SourceKeHiddenStemInteractionEligibilityTargetOriginHigherProvenanceAcquisitionEvidenceAdequacyExternalAccessReassessmentReview(validI230());
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

  it('fails closed when the exact I230 evidence boundary changes', () => {
    const invalid = { ...validI230(), qualifyingHigherProvenanceWitnessCount: 1 } as unknown as I230SourceKeHiddenStemInteractionEligibilityTargetOriginHigherProvenanceArchivalOrCustodianAcquisitionEvidenceReport;
    const report = buildI231SourceKeHiddenStemInteractionEligibilityTargetOriginHigherProvenanceAcquisitionEvidenceAdequacyExternalAccessReassessmentReview(invalid);
    expect(report.status).toBe('I230_HIGHER_PROVENANCE_ACQUISITION_EVIDENCE_BOUNDARY_INVALID');
    expect(report.exactI230BoundaryAccepted).toBe(false);
    expect(report.assessedResidualGapCount).toBe(0);
    expect(report.externalAccessRequirementCount).toBe(0);
    expect(report.automatedPublicWebRemediationBoundaryReached).toBe(false);
    expect(report.authorityGap).toBe('UPSTREAM_INVALID');
  });
});
