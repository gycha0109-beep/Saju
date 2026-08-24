import { describe, expect, it } from 'vitest';
import type { I221SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementCandidateCoverageEvaluationEvidenceReport } from '../src/research/i221-source-ke-hidden-stem-interaction-eligibility-single-source-seven-requirement-candidate-coverage-evaluation-evidence.js';
import {
  I222_UNRESOLVED_AUTHORITY_ADMISSIBILITY_GAP_IDS,
  buildI222SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementCoverageAdequacyAuthorityAdmissibilityPromotionReadinessReview,
} from '../src/research/i222-source-ke-hidden-stem-interaction-eligibility-single-source-seven-requirement-coverage-adequacy-authority-admissibility-promotion-readiness-review.js';

const validI221 = (): I221SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementCandidateCoverageEvaluationEvidenceReport =>
  ({
    evaluationId: 'i221_fixture',
    status:
      'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_SEVEN_REQUIREMENT_CANDIDATE_COVERAGE_EVALUATION_EVIDENCE',
    decision:
      'SOHU_DIRECT_HTML_CANDIDATE_SEVEN_OF_SEVEN_DIRECT_CANDIDATE_LOCAL_REQUIREMENT_COVERAGE_ESTABLISHED_COVERAGE_ADEQUATE_AUTHORITY_ADMISSIBILITY_NOT_ADJUDICATED_NO_PROMOTION_NO_GAP_CLOSURE',
    exactI220BoundaryAccepted: true,
    evaluatedCandidateId: 'LI_YANCHEN_GANZHI_NINE_RELATIONS_PART2_SOHU_2017_HTML',
    evaluationExecuted: true,
    coverageCellCount: 7,
    directCoverageCount: 7,
    partialCoverageCount: 0,
    conflictCoverageCount: 0,
    notEstablishedCoverageCount: 0,
    allSevenRequirementsDirectlyCoveredCandidateLocally: true,
    membershipVsEffectiveInteractionSeparationDirect: true,
    visibleToHiddenDirectionalScopeDirect: true,
    hiddenToVisibleDirectionalScopeDirect: true,
    hiddenToHiddenDirectionalScopeDirect: true,
    activationAndExceptionConditionsDirect: true,
    relationInteractionDamageSemanticSeparationDirect: true,
    sourceIdentityVerifiedContextAndLocatorDirect: true,
    onlinePublishedSourceIdentityIsEvaluationObject: true,
    exactDoctrinalAuthorshipOrLineageAdjudicatedByThisGate: false,
    sourceNormativeAdmissibilityAdjudicatedByThisGate: false,
    doctrinalConflictWithRestrictiveCandidatePreserved: true,
    doctrinalConflictResolvedByThisGate: false,
    sevenRequirementCoverageAdequate: true,
    sevenRequirementCoverageAdequacyEqualsAuthorityPromotion: false,
    sevenRequirementCoverageAdequacyEqualsAuthorityGapClosure: false,
    authorityGap: 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED',
    authorityGapClosed: false,
    authorityPromotedByThisGate: false,
    currentCandidateEvidenceUsedToBackfill: false,
    searchSnippetUsedAsDirectCoverage: false,
    sourceClassOrAgeAutoAcceptancePerformed: false,
    crossCandidateCompositionPerformed: false,
    quWei2001HoldPreserved: true,
    li1998SameTargetPathSuspendedNotRetired: true,
    I132IndependentNormativeProvenanceRequirementRemainsNormative: true,
    I132PolicyRelaxationAuthorizedByThisGate: false,
    provenanceIndependenceAdjudicatedByThisGate: false,
    derivativeLineageAdjudicatedByThisGate: false,
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
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_SEVEN_REQUIREMENT_COVERAGE_ADEQUACY_AUTHORITY_ADMISSIBILITY_PROMOTION_READINESS_REVIEW',
  }) as unknown as I221SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementCandidateCoverageEvaluationEvidenceReport;

describe('I222 hidden-stem seven-requirement coverage adequacy authority admissibility promotion readiness', () => {
  it('accepts the exact I221 seven-of-seven coverage boundary', () => {
    const report =
      buildI222SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementCoverageAdequacyAuthorityAdmissibilityPromotionReadinessReview(
        validI221(),
      );
    expect(report.status).toBe(
      'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_SEVEN_REQUIREMENT_COVERAGE_ADEQUACY_AUTHORITY_ADMISSIBILITY_PROMOTION_READINESS_REVIEW',
    );
    expect(report.evaluatedCandidateId).toBe('LI_YANCHEN_GANZHI_NINE_RELATIONS_PART2_SOHU_2017_HTML');
    expect(report.sevenRequirementCoverageAdequate).toBe(true);
    expect(report.directCoverageCount).toBe(7);
  });

  it('recognizes publication-object identity without treating it as normative authority', () => {
    const report =
      buildI222SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementCoverageAdequacyAuthorityAdmissibilityPromotionReadinessReview(
        validI221(),
      );
    expect(report.publicationObjectIdentityAndDirectContextEstablished).toBe(true);
    expect(report.publicationObjectIdentityAloneMayEstablishNormativeAuthority).toBe(false);
    expect(report.sourceClassOrPublicationPlatformAutoAcceptancePerformed).toBe(false);
  });

  it('freezes exactly four unresolved authority-admissibility gaps', () => {
    const report =
      buildI222SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementCoverageAdequacyAuthorityAdmissibilityPromotionReadinessReview(
        validI221(),
      );
    expect(report.unresolvedAdmissibilityGapIds).toEqual(I222_UNRESOLVED_AUTHORITY_ADMISSIBILITY_GAP_IDS);
    expect(report.unresolvedAdmissibilityGapCount).toBe(4);
    expect(report.exactDoctrinalAuthorshipOrLineageEstablished).toBe(false);
    expect(report.normativeRuleBearingStatusAndOriginalityEstablished).toBe(false);
    expect(report.derivativeRelationshipAndPriorSourceDependencyEstablished).toBe(false);
    expect(report.restrictiveDoctrinalConflictHandlingEstablished).toBe(false);
  });

  it('does not establish normative admissibility or promotion readiness', () => {
    const report =
      buildI222SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementCoverageAdequacyAuthorityAdmissibilityPromotionReadinessReview(
        validI221(),
      );
    expect(report.sourceNormativeAdmissibilityEstablished).toBe(false);
    expect(report.authorityPromotionReadinessEstablished).toBe(false);
    expect(report.candidateMayEnterAuthorityPromotionLifecycle).toBe(false);
    expect(report.coverageAdequacyMayAutoPromoteAuthority).toBe(false);
    expect(report.coverageAdequacyMayAutoCloseAuthorityGap).toBe(false);
    expect(report.authorityPromotedByThisGate).toBe(false);
  });

  it('authorizes only targeted admissibility-evidence acquisition as the next governed step', () => {
    const report =
      buildI222SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementCoverageAdequacyAuthorityAdmissibilityPromotionReadinessReview(
        validI221(),
      );
    expect(report.targetedAdmissibilityEvidenceAcquisitionJustified).toBe(true);
    expect(report.targetedAdmissibilityEvidenceAcquisitionExecutedByThisGate).toBe(false);
    expect(report.doctrinalAuthorshipOrLineageAdjudicatedByThisGate).toBe(false);
    expect(report.normativeSourceStatusAdjudicatedByThisGate).toBe(false);
    expect(report.derivativeLineageAdjudicatedByThisGate).toBe(false);
    expect(report.restrictiveDoctrinalConflictAdjudicatedByThisGate).toBe(false);
    expect(report.recommendedNextGate).toBe(
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_AUTHORITY_ADMISSIBILITY_TARGETED_EVIDENCE_ACQUISITION_READINESS_REVIEW',
    );
  });

  it('preserves the hidden-stem authority gap and doctrinal conflict', () => {
    const report =
      buildI222SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementCoverageAdequacyAuthorityAdmissibilityPromotionReadinessReview(
        validI221(),
      );
    expect(report.authorityGap).toBe('SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED');
    expect(report.authorityGapClosed).toBe(false);
    expect(report.doctrinalConflictPreserved).toBe(true);
    expect(report.doctrinalConflictResolvedByThisGate).toBe(false);
  });

  it('preserves provenance, candidate-set, composition and production guards', () => {
    const report =
      buildI222SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementCoverageAdequacyAuthorityAdmissibilityPromotionReadinessReview(
        validI221(),
      );
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
    expect(report.thresholdRuleCreatedByThisGate).toBe(false);
    expect(report.damageEvaluationAuthorized).toBe(false);
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
    expect(report.productionPolicyExecutionAuthorized).toBe(false);
  });

  it('fails closed if the I221 coverage boundary changes', () => {
    const invalid: I221SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementCandidateCoverageEvaluationEvidenceReport = {
      ...validI221(),
      directCoverageCount: 0,
    };
    const report =
      buildI222SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementCoverageAdequacyAuthorityAdmissibilityPromotionReadinessReview(
        invalid,
      );
    expect(report.status).toBe('I221_COVERAGE_EVALUATION_BOUNDARY_INVALID');
    expect(report.evaluatedCandidateId).toBeNull();
    expect(report.sevenRequirementCoverageAdequate).toBe(false);
    expect(report.directCoverageCount).toBe(0);
    expect(report.unresolvedAdmissibilityGapCount).toBe(0);
    expect(report.targetedAdmissibilityEvidenceAcquisitionJustified).toBe(false);
    expect(report.authorityGap).toBe('UPSTREAM_INVALID');
  });
});
