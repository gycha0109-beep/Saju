import { describe, expect, it } from 'vitest';
import type { I229SourceKeHiddenStemInteractionEligibilityTargetOriginHigherProvenanceArchivalOrCustodianAcquisitionReadinessReviewReport } from '../src/research/i229-source-ke-hidden-stem-interaction-eligibility-target-origin-higher-provenance-archival-or-custodian-acquisition-readiness-review.js';
import {
  I229_HIGHER_PROVENANCE_ACQUISITION_CONTROL_IDS,
} from '../src/research/i229-source-ke-hidden-stem-interaction-eligibility-target-origin-higher-provenance-archival-or-custodian-acquisition-readiness-review.js';
import {
  I228_HIGHER_PROVENANCE_ACQUISITION_PATH_IDS,
  I228_RESIDUAL_ADMISSIBILITY_GAP_IDS,
} from '../src/research/i228-source-ke-hidden-stem-interaction-eligibility-target-origin-discovery-evidence-adequacy-residual-path-reassessment-review.js';
import { buildI230SourceKeHiddenStemInteractionEligibilityTargetOriginHigherProvenanceArchivalOrCustodianAcquisitionEvidence } from '../src/research/i230-source-ke-hidden-stem-interaction-eligibility-target-origin-higher-provenance-archival-or-custodian-acquisition-evidence.js';

const validI229 = (): I229SourceKeHiddenStemInteractionEligibilityTargetOriginHigherProvenanceArchivalOrCustodianAcquisitionReadinessReviewReport =>
  ({
    reviewId: 'i229_fixture',
    status:
      'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_ORIGIN_HIGHER_PROVENANCE_ARCHIVAL_OR_CUSTODIAN_ACQUISITION_READINESS_REVIEW',
    decision:
      'FOUR_HIGHER_PROVENANCE_PATHS_EIGHTEEN_CONTROLS_FROZEN_NO_ACQUISITION_EXECUTED_NO_ORIGIN_LINEAGE_DERIVATIVE_ADJUDICATION_NO_PROMOTION',
    exactI228BoundaryAccepted: true,
    targetCandidateId: 'LI_YANCHEN_GANZHI_NINE_RELATIONS_PART2_SOHU_2017_HTML',
    sevenRequirementCoverageAcceptedAsUpstreamFinding: true,
    coverageReevaluationAuthorizedByThisGate: false,
    residualAdmissibilityGapIds: I228_RESIDUAL_ADMISSIBILITY_GAP_IDS,
    residualAdmissibilityGapCount: 4,
    materiallyNewEvidenceClassRequired: true,
    acquisitionPathIds: I228_HIGHER_PROVENANCE_ACQUISITION_PATH_IDS,
    acquisitionPathCount: 4,
    acquisitionControlIds: I229_HIGHER_PROVENANCE_ACQUISITION_CONTROL_IDS,
    acquisitionControlCount: 18,
    acquisitionControlsFrozen: true,
    higherProvenanceAcquisitionAuthorized: true,
    higherProvenanceAcquisitionExecutedByThisGate: false,
    archiveSnapshotAcquisitionRequired: true,
    authorControlledFirstPartyAcquisitionRequired: true,
    originalBookCourseCanonicalWitnessAcquisitionRequired: true,
    custodianBoundWitnessAcquisitionRequired: true,
    archiveSnapshotRequiresPreTargetDateForPredecessorFinding: true,
    authorControlledSourceRequiresExactTargetBinding: true,
    canonicalWitnessRequiresExactTargetPassageAndLocator: true,
    custodianWitnessRequiresSourceChainAndPassageBinding: true,
    searchSnippetOrCatalogMetadataMayEstablishPositiveOriginFinding: false,
    postTargetSourceMayEstablishPriorDependency: false,
    alternateLineageMayBackfillTargetLineage: false,
    accessFailureCreatesNegativeFinding: false,
    corpusExhaustionClaimed: false,
    exactTargetOriginalAuthorshipEstablishedByThisGate: false,
    exactTargetDoctrinalLineageEstablishedByThisGate: false,
    exactTargetPriorSourceDependencyEstablishedByThisGate: false,
    derivativeRelationshipAdjudicatedByThisGate: false,
    restrictiveDoctrineConflictAdjudicatedByThisGate: false,
    restrictiveConflictAdjudicationDeferredUntilTargetLineageEstablished: true,
    sourceNormativeAdmissibilityAdjudicatedByThisGate: false,
    authorityPromotionReadinessEstablishedByThisGate: false,
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
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_ORIGIN_HIGHER_PROVENANCE_ARCHIVAL_OR_CUSTODIAN_ACQUISITION_EVIDENCE',
  }) as unknown as I229SourceKeHiddenStemInteractionEligibilityTargetOriginHigherProvenanceArchivalOrCustodianAcquisitionReadinessReviewReport;

describe('I230 hidden-stem target-origin higher-provenance acquisition evidence', () => {
  it('accepts the exact I229 boundary and executes all four paths without reopening coverage', () => {
    const report = buildI230SourceKeHiddenStemInteractionEligibilityTargetOriginHigherProvenanceArchivalOrCustodianAcquisitionEvidence(validI229());
    expect(report.status).toBe(
      'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_ORIGIN_HIGHER_PROVENANCE_ARCHIVAL_OR_CUSTODIAN_ACQUISITION_EVIDENCE',
    );
    expect(report.exactI229BoundaryAccepted).toBe(true);
    expect(report.acquisitionExecuted).toBe(true);
    expect(report.executedAcquisitionPathCount).toBe(4);
    expect(report.acquisitionRecordCount).toBe(4);
    expect(report.acquisitionRecords.map((record) => record.pathId)).toEqual(I228_HIGHER_PROVENANCE_ACQUISITION_PATH_IDS);
    expect(report.sevenRequirementCoverageAcceptedAsUpstreamFinding).toBe(true);
    expect(report.coverageReevaluationPerformedByThisGate).toBe(false);
  });

  it('accepts all eighteen I229 acquisition controls', () => {
    const report = buildI230SourceKeHiddenStemInteractionEligibilityTargetOriginHigherProvenanceArchivalOrCustodianAcquisitionEvidence(validI229());
    expect(report.I229ControlsAccepted).toBe(true);
    expect(report.I229ControlCount).toBe(18);
  });

  it('records archive and first-party non-acquisition without negative inference', () => {
    const report = buildI230SourceKeHiddenStemInteractionEligibilityTargetOriginHigherProvenanceArchivalOrCustodianAcquisitionEvidence(validI229());
    expect(report.archiveSnapshotAccessAttempted).toBe(true);
    expect(report.qualifyingPreTargetArchiveSnapshotAcquired).toBe(false);
    expect(report.archiveAccessFailureCreatesNegativeFinding).toBe(false);
    expect(report.authorControlledFirstPartySearchExecuted).toBe(true);
    expect(report.qualifyingAuthorControlledExactTargetSourceAcquired).toBe(false);
    expect(report.sohuAccountNameUsedAsOriginalAuthorshipEvidence).toBe(false);
  });

  it('records the pre-target Baidu same-text-family lead but refuses predecessor or canonical promotion', () => {
    const report = buildI230SourceKeHiddenStemInteractionEligibilityTargetOriginHigherProvenanceArchivalOrCustodianAcquisitionEvidence(validI229());
    expect(report.originalBookCourseCanonicalWitnessSearchExecuted).toBe(true);
    expect(report.preTargetSameTextFamilyLeadObserved).toBe(true);
    expect(report.preTargetSameTextFamilyLeadLocator).toBe('https://zhidao.baidu.com/question/503716527.html');
    expect(report.preTargetSameTextFamilyLeadApproximatePublicationEra).toBe('2012_OR_EARLIER_INDEXED_ANSWER_CONTEXT');
    expect(report.preTargetSameTextFamilyLeadContainsHiddenStemNineRelationsAndExternalActivationLanguage).toBe(true);
    expect(report.preTargetSameTextFamilyLeadContainsI226RareExactTargetPassage).toBe(false);
    expect(report.preTargetSameTextFamilyLeadHasCanonicalEditionIdentity).toBe(false);
    expect(report.preTargetSameTextFamilyLeadHasOriginalAuthorshipBinding).toBe(false);
    expect(report.preTargetSameTextFamilyLeadMayEstablishTargetPredecessor).toBe(false);
  });

  it('records custodian non-acquisition and keeps qualifying witness count at zero', () => {
    const report = buildI230SourceKeHiddenStemInteractionEligibilityTargetOriginHigherProvenanceArchivalOrCustodianAcquisitionEvidence(validI229());
    expect(report.custodianBoundWitnessSearchExecuted).toBe(true);
    expect(report.qualifyingCustodianBoundExactTargetWitnessAcquired).toBe(false);
    expect(report.qualifyingHigherProvenanceWitnessCount).toBe(0);
    expect(report.accessLimitationsRecorded).toBe(true);
    expect(report.accessLimitationsEqualCorpusExhaustion).toBe(false);
    expect(report.negativeFindingCreatedFromAccessFailureOrSilence).toBe(false);
    expect(report.corpusExhaustionClaimed).toBe(false);
  });

  it('keeps all four admissibility gaps unresolved and performs no adjudication', () => {
    const report = buildI230SourceKeHiddenStemInteractionEligibilityTargetOriginHigherProvenanceArchivalOrCustodianAcquisitionEvidence(validI229());
    expect(report.unresolvedAdmissibilityGapIds).toEqual(I228_RESIDUAL_ADMISSIBILITY_GAP_IDS);
    expect(report.unresolvedAdmissibilityGapCount).toBe(4);
    expect(report.exactTargetOriginalAuthorshipEstablishedByThisGate).toBe(false);
    expect(report.exactTargetDoctrinalLineageEstablishedByThisGate).toBe(false);
    expect(report.exactTargetPriorSourceDependencyEstablishedByThisGate).toBe(false);
    expect(report.derivativeRelationshipAdjudicatedByThisGate).toBe(false);
    expect(report.restrictiveDoctrineConflictAdjudicatedByThisGate).toBe(false);
    expect(report.restrictiveDoctrineSchoolBoundaryEstablishedByThisGate).toBe(false);
    expect(report.sourceNormativeAdmissibilityAdjudicatedByThisGate).toBe(false);
    expect(report.authorityPromotionReadinessEstablishedByThisGate).toBe(false);
  });

  it('preserves authority, provenance, candidate-set and production guards', () => {
    const report = buildI230SourceKeHiddenStemInteractionEligibilityTargetOriginHigherProvenanceArchivalOrCustodianAcquisitionEvidence(validI229());
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

  it('fails closed when the I229 higher-provenance boundary changes', () => {
    const invalid: I229SourceKeHiddenStemInteractionEligibilityTargetOriginHigherProvenanceArchivalOrCustodianAcquisitionReadinessReviewReport = {
      ...validI229(),
      acquisitionControlCount: 0,
    };
    const report = buildI230SourceKeHiddenStemInteractionEligibilityTargetOriginHigherProvenanceArchivalOrCustodianAcquisitionEvidence(invalid);
    expect(report.status).toBe('I229_HIGHER_PROVENANCE_ACQUISITION_READINESS_BOUNDARY_INVALID');
    expect(report.acquisitionExecuted).toBe(false);
    expect(report.acquisitionRecordCount).toBe(0);
    expect(report.preTargetSameTextFamilyLeadObserved).toBe(false);
    expect(report.qualifyingHigherProvenanceWitnessCount).toBe(0);
    expect(report.unresolvedAdmissibilityGapCount).toBe(0);
    expect(report.authorityGap).toBe('UPSTREAM_INVALID');
  });
});
