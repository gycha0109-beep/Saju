import { describe, expect, it } from 'vitest';
import type { I228SourceKeHiddenStemInteractionEligibilityTargetOriginDiscoveryEvidenceAdequacyResidualPathReassessmentReviewReport } from '../src/research/i228-source-ke-hidden-stem-interaction-eligibility-target-origin-discovery-evidence-adequacy-residual-path-reassessment-review.js';
import {
  I228_HIGHER_PROVENANCE_ACQUISITION_PATH_IDS,
  I228_RESIDUAL_ADMISSIBILITY_GAP_IDS,
} from '../src/research/i228-source-ke-hidden-stem-interaction-eligibility-target-origin-discovery-evidence-adequacy-residual-path-reassessment-review.js';
import {
  I229_HIGHER_PROVENANCE_ACQUISITION_CONTROL_IDS,
  buildI229SourceKeHiddenStemInteractionEligibilityTargetOriginHigherProvenanceArchivalOrCustodianAcquisitionReadinessReview,
} from '../src/research/i229-source-ke-hidden-stem-interaction-eligibility-target-origin-higher-provenance-archival-or-custodian-acquisition-readiness-review.js';

const validI228 = (): I228SourceKeHiddenStemInteractionEligibilityTargetOriginDiscoveryEvidenceAdequacyResidualPathReassessmentReviewReport =>
  ({
    reviewId: 'i228_fixture',
    status:
      'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_ORIGIN_DISCOVERY_EVIDENCE_ADEQUACY_RESIDUAL_PATH_REASSESSMENT_REVIEW',
    decision:
      'I227_EVIDENCE_ADEQUATE_FOR_CURRENT_PASS_FOUR_RESIDUAL_ADMISSIBILITY_GAPS_REMAIN_EQUIVALENT_AUTOMATED_WEB_REPEAT_NOT_JUSTIFIED_HIGHER_PROVENANCE_ARCHIVAL_AUTHOR_CONTROLLED_OR_CUSTODIAN_ACQUISITION_REQUIRED_NO_WEB_EXHAUSTION_NO_PROMOTION',
    exactI227BoundaryAccepted: true,
    targetCandidateId: 'LI_YANCHEN_GANZHI_NINE_RELATIONS_PART2_SOHU_2017_HTML',
    sevenRequirementCoverageAcceptedAsUpstreamFinding: true,
    coverageReevaluationAuthorizedByThisGate: false,
    I227EvidenceAdequateForCurrentPass: true,
    exactRarePhraseSearchExecutionAccepted: true,
    noPre2017ExactWitnessEstablishedInPassAccepted: true,
    noPre2017WitnessNonexistenceFindingAccepted: false,
    noCorpusExhaustionFindingAccepted: true,
    pre2017AlternateLineageContrastAccepted: true,
    alternateLineageMayBackfillTargetLineage: false,
    laterExactTextRedistributionAccepted: true,
    laterRedistributionMayEstablishPriorDependency: false,
    part1OrUpstreamAttributionStillUnresolved: true,
    residualAdmissibilityGapIds: I228_RESIDUAL_ADMISSIBILITY_GAP_IDS,
    residualAdmissibilityGapCount: 4,
    equivalentAutomatedWebSearchRepeatJustified: false,
    automatedWebCorpusExhaustionEstablished: false,
    automatedWebAccessFailureEstablished: false,
    materiallyNewEvidenceClassRequired: true,
    higherProvenanceAcquisitionPathIds: I228_HIGHER_PROVENANCE_ACQUISITION_PATH_IDS,
    higherProvenanceAcquisitionPathCount: 4,
    higherProvenanceAcquisitionReadinessReviewJustified: true,
    archivalSnapshotPathJustified: true,
    authorControlledFirstPartyPathJustified: true,
    originalBookCourseCanonicalWitnessPathJustified: true,
    custodianBoundWitnessPathJustified: true,
    restrictiveConflictAdjudicationDeferredUntilTargetLineageEstablished: true,
    sourceNormativeAdmissibilityAdjudicatedByThisGate: false,
    authorityPromotionReadinessEstablishedByThisGate: false,
    authorityGap: 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED',
    authorityGapClosed: false,
    authorityPromotedByThisGate: false,
    doctrinalConflictPreserved: true,
    doctrinalConflictResolvedByThisGate: false,
    negativeFindingCreatedFromSearchSilence: false,
    corpusExhaustionClaimed: false,
    quWei2001HoldPreserved: true,
    li1998SameTargetPathSuspendedNotRetired: true,
    I132IndependentNormativeProvenanceRequirementRemainsNormative: true,
    I132PolicyRelaxationAuthorizedByThisGate: false,
    provenanceIndependenceAdjudicatedByThisGate: false,
    derivativeRelationshipAdjudicatedByThisGate: false,
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
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_ORIGIN_HIGHER_PROVENANCE_ARCHIVAL_OR_CUSTODIAN_ACQUISITION_READINESS_REVIEW',
  }) as unknown as I228SourceKeHiddenStemInteractionEligibilityTargetOriginDiscoveryEvidenceAdequacyResidualPathReassessmentReviewReport;

describe('I229 hidden-stem target-origin higher-provenance acquisition readiness', () => {
  it('accepts the exact I228 residual boundary without reopening coverage', () => {
    const report = buildI229SourceKeHiddenStemInteractionEligibilityTargetOriginHigherProvenanceArchivalOrCustodianAcquisitionReadinessReview(validI228());
    expect(report.status).toBe(
      'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_ORIGIN_HIGHER_PROVENANCE_ARCHIVAL_OR_CUSTODIAN_ACQUISITION_READINESS_REVIEW',
    );
    expect(report.exactI228BoundaryAccepted).toBe(true);
    expect(report.targetCandidateId).toBe('LI_YANCHEN_GANZHI_NINE_RELATIONS_PART2_SOHU_2017_HTML');
    expect(report.sevenRequirementCoverageAcceptedAsUpstreamFinding).toBe(true);
    expect(report.coverageReevaluationAuthorizedByThisGate).toBe(false);
  });

  it('preserves exactly four residual gaps and requires materially new evidence', () => {
    const report = buildI229SourceKeHiddenStemInteractionEligibilityTargetOriginHigherProvenanceArchivalOrCustodianAcquisitionReadinessReview(validI228());
    expect(report.residualAdmissibilityGapIds).toEqual(I228_RESIDUAL_ADMISSIBILITY_GAP_IDS);
    expect(report.residualAdmissibilityGapCount).toBe(4);
    expect(report.materiallyNewEvidenceClassRequired).toBe(true);
  });

  it('freezes four higher-provenance paths and eighteen controls', () => {
    const report = buildI229SourceKeHiddenStemInteractionEligibilityTargetOriginHigherProvenanceArchivalOrCustodianAcquisitionReadinessReview(validI228());
    expect(report.acquisitionPathIds).toEqual(I228_HIGHER_PROVENANCE_ACQUISITION_PATH_IDS);
    expect(report.acquisitionPathCount).toBe(4);
    expect(report.acquisitionControlIds).toEqual(I229_HIGHER_PROVENANCE_ACQUISITION_CONTROL_IDS);
    expect(report.acquisitionControlCount).toBe(18);
    expect(report.acquisitionControlsFrozen).toBe(true);
  });

  it('authorizes all four higher-provenance acquisition classes but performs none', () => {
    const report = buildI229SourceKeHiddenStemInteractionEligibilityTargetOriginHigherProvenanceArchivalOrCustodianAcquisitionReadinessReview(validI228());
    expect(report.higherProvenanceAcquisitionAuthorized).toBe(true);
    expect(report.higherProvenanceAcquisitionExecutedByThisGate).toBe(false);
    expect(report.archiveSnapshotAcquisitionRequired).toBe(true);
    expect(report.authorControlledFirstPartyAcquisitionRequired).toBe(true);
    expect(report.originalBookCourseCanonicalWitnessAcquisitionRequired).toBe(true);
    expect(report.custodianBoundWitnessAcquisitionRequired).toBe(true);
  });

  it('requires exact source, passage, date and custody binding for positive origin findings', () => {
    const report = buildI229SourceKeHiddenStemInteractionEligibilityTargetOriginHigherProvenanceArchivalOrCustodianAcquisitionReadinessReview(validI228());
    expect(report.archiveSnapshotRequiresPreTargetDateForPredecessorFinding).toBe(true);
    expect(report.authorControlledSourceRequiresExactTargetBinding).toBe(true);
    expect(report.canonicalWitnessRequiresExactTargetPassageAndLocator).toBe(true);
    expect(report.custodianWitnessRequiresSourceChainAndPassageBinding).toBe(true);
    expect(report.searchSnippetOrCatalogMetadataMayEstablishPositiveOriginFinding).toBe(false);
    expect(report.postTargetSourceMayEstablishPriorDependency).toBe(false);
    expect(report.alternateLineageMayBackfillTargetLineage).toBe(false);
    expect(report.accessFailureCreatesNegativeFinding).toBe(false);
    expect(report.corpusExhaustionClaimed).toBe(false);
  });

  it('performs no authorship, lineage, derivative, conflict or admissibility adjudication', () => {
    const report = buildI229SourceKeHiddenStemInteractionEligibilityTargetOriginHigherProvenanceArchivalOrCustodianAcquisitionReadinessReview(validI228());
    expect(report.exactTargetOriginalAuthorshipEstablishedByThisGate).toBe(false);
    expect(report.exactTargetDoctrinalLineageEstablishedByThisGate).toBe(false);
    expect(report.exactTargetPriorSourceDependencyEstablishedByThisGate).toBe(false);
    expect(report.derivativeRelationshipAdjudicatedByThisGate).toBe(false);
    expect(report.restrictiveDoctrineConflictAdjudicatedByThisGate).toBe(false);
    expect(report.restrictiveConflictAdjudicationDeferredUntilTargetLineageEstablished).toBe(true);
    expect(report.sourceNormativeAdmissibilityAdjudicatedByThisGate).toBe(false);
    expect(report.authorityPromotionReadinessEstablishedByThisGate).toBe(false);
  });

  it('preserves authority, provenance, candidate-set and production guards', () => {
    const report = buildI229SourceKeHiddenStemInteractionEligibilityTargetOriginHigherProvenanceArchivalOrCustodianAcquisitionReadinessReview(validI228());
    expect(report.authorityGap).toBe('SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED');
    expect(report.authorityGapClosed).toBe(false);
    expect(report.authorityPromotedByThisGate).toBe(false);
    expect(report.candidateRegisteredByThisGate).toBe(false);
    expect(report.candidateSelectedByThisGate).toBe(false);
    expect(report.doctrinalConflictPreserved).toBe(true);
    expect(report.doctrinalConflictResolvedByThisGate).toBe(false);
    expect(report.quWei2001HoldPreserved).toBe(true);
    expect(report.li1998SameTargetPathSuspendedNotRetired).toBe(true);
    expect(report.I132IndependentNormativeProvenanceRequirementRemainsNormative).toBe(true);
    expect(report.I132PolicyRelaxationAuthorizedByThisGate).toBe(false);
    expect(report.provenanceIndependenceAdjudicatedByThisGate).toBe(false);
    expect(report.evidenceRebindingAuthorizedByThisGate).toBe(false);
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

  it('fails closed when the I228 residual boundary changes', () => {
    const invalid: I228SourceKeHiddenStemInteractionEligibilityTargetOriginDiscoveryEvidenceAdequacyResidualPathReassessmentReviewReport = {
      ...validI228(),
      materiallyNewEvidenceClassRequired: false,
    };
    const report = buildI229SourceKeHiddenStemInteractionEligibilityTargetOriginHigherProvenanceArchivalOrCustodianAcquisitionReadinessReview(invalid);
    expect(report.status).toBe('I228_RESIDUAL_PATH_REASSESSMENT_BOUNDARY_INVALID');
    expect(report.targetCandidateId).toBeNull();
    expect(report.residualAdmissibilityGapCount).toBe(0);
    expect(report.acquisitionPathCount).toBe(0);
    expect(report.acquisitionControlCount).toBe(0);
    expect(report.higherProvenanceAcquisitionAuthorized).toBe(false);
    expect(report.authorityGap).toBe('UPSTREAM_INVALID');
  });
});
