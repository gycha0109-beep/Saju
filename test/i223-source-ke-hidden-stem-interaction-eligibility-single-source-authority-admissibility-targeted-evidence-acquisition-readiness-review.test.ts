import { describe, expect, it } from 'vitest';
import type { I222SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementCoverageAdequacyAuthorityAdmissibilityPromotionReadinessReviewReport } from '../src/research/i222-source-ke-hidden-stem-interaction-eligibility-single-source-seven-requirement-coverage-adequacy-authority-admissibility-promotion-readiness-review.js';
import {
  I223_TARGETED_ADMISSIBILITY_ACQUISITION_CONTROL_IDS,
  I223_TARGETED_ADMISSIBILITY_ACQUISITION_PATH_IDS,
  buildI223SourceKeHiddenStemInteractionEligibilitySingleSourceAuthorityAdmissibilityTargetedEvidenceAcquisitionReadinessReview,
} from '../src/research/i223-source-ke-hidden-stem-interaction-eligibility-single-source-authority-admissibility-targeted-evidence-acquisition-readiness-review.js';

const validI222 = (): I222SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementCoverageAdequacyAuthorityAdmissibilityPromotionReadinessReviewReport =>
  ({
    reviewId: 'i222_fixture',
    status:
      'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_SEVEN_REQUIREMENT_COVERAGE_ADEQUACY_AUTHORITY_ADMISSIBILITY_PROMOTION_READINESS_REVIEW',
    decision:
      'SEVEN_OF_SEVEN_COVERAGE_ACCEPTED_AUTHORITY_ADMISSIBILITY_PROMOTION_NOT_READY_FOUR_UNRESOLVED_ADMISSIBILITY_GAPS_TARGETED_EVIDENCE_ACQUISITION_JUSTIFIED_NO_PROMOTION_NO_GAP_CLOSURE',
    exactI221BoundaryAccepted: true,
    evaluatedCandidateId: 'LI_YANCHEN_GANZHI_NINE_RELATIONS_PART2_SOHU_2017_HTML',
    sevenRequirementCoverageAdequate: true,
    directCoverageCount: 7,
    publicationObjectIdentityAndDirectContextEstablished: true,
    publicationObjectIdentityAloneMayEstablishNormativeAuthority: false,
    exactDoctrinalAuthorshipOrLineageEstablished: false,
    normativeRuleBearingStatusAndOriginalityEstablished: false,
    derivativeRelationshipAndPriorSourceDependencyEstablished: false,
    restrictiveDoctrinalConflictHandlingEstablished: false,
    sourceNormativeAdmissibilityEstablished: false,
    authorityPromotionReadinessEstablished: false,
    unresolvedAdmissibilityGapIds: [
      'DOCTRINAL_AUTHORSHIP_OR_LINEAGE_ATTRIBUTION_GAP',
      'NORMATIVE_RULE_BEARING_STATUS_AND_ORIGINALITY_GAP',
      'DERIVATIVE_RELATIONSHIP_AND_PRIOR_SOURCE_DEPENDENCY_GAP',
      'RESTRICTIVE_DOCTRINAL_CONFLICT_HANDLING_GAP',
    ],
    unresolvedAdmissibilityGapCount: 4,
    targetedAdmissibilityEvidenceAcquisitionJustified: true,
    targetedAdmissibilityEvidenceAcquisitionExecutedByThisGate: false,
    authorityGap: 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED',
    authorityGapClosed: false,
    authorityPromotedByThisGate: false,
    doctrinalConflictPreserved: true,
    doctrinalConflictResolvedByThisGate: false,
    I132IndependentNormativeProvenanceRequirementRemainsNormative: true,
    I132PolicyRelaxationAuthorizedByThisGate: false,
    provenanceIndependenceAdjudicatedByThisGate: false,
    evidenceRebindingAuthorizedByThisGate: false,
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
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_AUTHORITY_ADMISSIBILITY_TARGETED_EVIDENCE_ACQUISITION_READINESS_REVIEW',
  }) as unknown as I222SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementCoverageAdequacyAuthorityAdmissibilityPromotionReadinessReviewReport;

describe('I223 hidden-stem authority admissibility targeted evidence acquisition readiness', () => {
  it('accepts the exact I222 four-gap readiness boundary without reopening coverage', () => {
    const report =
      buildI223SourceKeHiddenStemInteractionEligibilitySingleSourceAuthorityAdmissibilityTargetedEvidenceAcquisitionReadinessReview(
        validI222(),
      );
    expect(report.status).toBe(
      'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_AUTHORITY_ADMISSIBILITY_TARGETED_EVIDENCE_ACQUISITION_READINESS_REVIEW',
    );
    expect(report.targetCandidateId).toBe('LI_YANCHEN_GANZHI_NINE_RELATIONS_PART2_SOHU_2017_HTML');
    expect(report.sevenRequirementCoverageAcceptedAsUpstreamFinding).toBe(true);
    expect(report.coverageReevaluationAuthorizedByThisGate).toBe(false);
  });

  it('preserves exactly four unresolved admissibility gaps', () => {
    const report =
      buildI223SourceKeHiddenStemInteractionEligibilitySingleSourceAuthorityAdmissibilityTargetedEvidenceAcquisitionReadinessReview(
        validI222(),
      );
    expect(report.unresolvedAdmissibilityGapCount).toBe(4);
    expect(report.unresolvedAdmissibilityGapIds).toEqual(validI222().unresolvedAdmissibilityGapIds);
  });

  it('freezes five targeted acquisition paths and sixteen controls', () => {
    const report =
      buildI223SourceKeHiddenStemInteractionEligibilitySingleSourceAuthorityAdmissibilityTargetedEvidenceAcquisitionReadinessReview(
        validI222(),
      );
    expect(report.acquisitionPathIds).toEqual(I223_TARGETED_ADMISSIBILITY_ACQUISITION_PATH_IDS);
    expect(report.acquisitionPathCount).toBe(5);
    expect(report.acquisitionControlIds).toEqual(I223_TARGETED_ADMISSIBILITY_ACQUISITION_CONTROL_IDS);
    expect(report.acquisitionControlCount).toBe(16);
    expect(report.acquisitionControlsFrozen).toBe(true);
  });

  it('requires all five evidence-acquisition dimensions without executing them', () => {
    const report =
      buildI223SourceKeHiddenStemInteractionEligibilitySingleSourceAuthorityAdmissibilityTargetedEvidenceAcquisitionReadinessReview(
        validI222(),
      );
    expect(report.targetedAcquisitionAuthorized).toBe(true);
    expect(report.targetedAcquisitionExecutedByThisGate).toBe(false);
    expect(report.directPublicationContextCaptureRequired).toBe(true);
    expect(report.exactTextPriorPublicationTraceRequired).toBe(true);
    expect(report.authorOrDoctrinalLineageDiscoveryRequired).toBe(true);
    expect(report.derivativeSourceDependencyComparisonRequired).toBe(true);
    expect(report.restrictiveDoctrineSchoolBoundaryEvidenceRequired).toBe(true);
  });

  it('forbids automatic authorship, lineage, derivative and conflict conclusions', () => {
    const report =
      buildI223SourceKeHiddenStemInteractionEligibilitySingleSourceAuthorityAdmissibilityTargetedEvidenceAcquisitionReadinessReview(
        validI222(),
      );
    expect(report.searchSnippetMayCreatePositiveAdmissibilityFinding).toBe(false);
    expect(report.platformBylineMayAutoEstablishOriginalAuthorship).toBe(false);
    expect(report.authorNameMatchMayAutoEstablishDoctrinalLineage).toBe(false);
    expect(report.textualSimilarityMayAutoEstablishDerivativeRelationship).toBe(false);
    expect(report.schoolConflictMayBeSilentlyResolved).toBe(false);
    expect(report.sourceNormativeAdmissibilityAdjudicatedByThisGate).toBe(false);
  });

  it('keeps promotion and gap closure blocked', () => {
    const report =
      buildI223SourceKeHiddenStemInteractionEligibilitySingleSourceAuthorityAdmissibilityTargetedEvidenceAcquisitionReadinessReview(
        validI222(),
      );
    expect(report.authorityPromotionReadinessEstablishedByThisGate).toBe(false);
    expect(report.authorityGap).toBe('SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED');
    expect(report.authorityGapClosed).toBe(false);
    expect(report.authorityPromotedByThisGate).toBe(false);
    expect(report.doctrinalConflictPreserved).toBe(true);
    expect(report.doctrinalConflictResolvedByThisGate).toBe(false);
  });

  it('preserves repository provenance, candidate-set and production guards', () => {
    const report =
      buildI223SourceKeHiddenStemInteractionEligibilitySingleSourceAuthorityAdmissibilityTargetedEvidenceAcquisitionReadinessReview(
        validI222(),
      );
    expect(report.quWei2001HoldPreserved).toBe(true);
    expect(report.li1998SameTargetPathSuspendedNotRetired).toBe(true);
    expect(report.I132IndependentNormativeProvenanceRequirementRemainsNormative).toBe(true);
    expect(report.I132PolicyRelaxationAuthorizedByThisGate).toBe(false);
    expect(report.provenanceIndependenceAdjudicatedByThisGate).toBe(false);
    expect(report.derivativeLineageAdjudicatedByThisGate).toBe(false);
    expect(report.evidenceRebindingAuthorizedByThisGate).toBe(false);
    expect(report.candidateSetMutatedByThisGate).toBe(false);
    expect(report.candidateSetReevaluationAuthorizedByThisGate).toBe(false);
    expect(report.currentV2PackageAndCandidateSetRemainImmutable).toBe(true);
    expect(report.currentV2ProvenanceDisposition).toBe('BLOCKED_UNDER_CURRENT_EVIDENCE');
    expect(report.actualCompositionPerformedByThisGate).toBe(false);
    expect(report.thresholdRuleCreatedByThisGate).toBe(false);
    expect(report.damageEvaluationAuthorized).toBe(false);
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
    expect(report.productionPolicyExecutionAuthorized).toBe(false);
  });

  it('fails closed if the I222 unresolved-gap boundary changes', () => {
    const invalid: I222SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementCoverageAdequacyAuthorityAdmissibilityPromotionReadinessReviewReport = {
      ...validI222(),
      unresolvedAdmissibilityGapCount: 0,
    };
    const report =
      buildI223SourceKeHiddenStemInteractionEligibilitySingleSourceAuthorityAdmissibilityTargetedEvidenceAcquisitionReadinessReview(
        invalid,
      );
    expect(report.status).toBe('I222_AUTHORITY_ADMISSIBILITY_READINESS_BOUNDARY_INVALID');
    expect(report.targetCandidateId).toBeNull();
    expect(report.acquisitionPathCount).toBe(0);
    expect(report.acquisitionControlCount).toBe(0);
    expect(report.targetedAcquisitionAuthorized).toBe(false);
    expect(report.authorityGap).toBe('UPSTREAM_INVALID');
  });
});
