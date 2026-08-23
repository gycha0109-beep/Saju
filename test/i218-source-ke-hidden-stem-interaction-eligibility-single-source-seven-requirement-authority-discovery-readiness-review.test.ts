import { describe, expect, it } from 'vitest';
import type { I217SourceKeHiddenStemInteractionEligibilityCandidateCoverageEvidenceAdequacyResidualRequirementsReassessmentReviewReport } from '../src/research/i217-source-ke-hidden-stem-interaction-eligibility-candidate-coverage-evidence-adequacy-residual-requirements-reassessment-review.js';
import {
  I218_DISCOVERY_CONTROL_IDS,
  I218_DISCOVERY_PATH_IDS,
  buildI218SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementAuthorityDiscoveryReadinessReview,
} from '../src/research/i218-source-ke-hidden-stem-interaction-eligibility-single-source-seven-requirement-authority-discovery-readiness-review.js';

const validI217 = (): I217SourceKeHiddenStemInteractionEligibilityCandidateCoverageEvidenceAdequacyResidualRequirementsReassessmentReviewReport =>
  ({
    reviewId: 'i217_fixture',
    status:
      'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_CANDIDATE_COVERAGE_EVIDENCE_ADEQUACY_RESIDUAL_REQUIREMENTS_REASSESSMENT_REVIEW',
    decision:
      'I216_EVIDENCE_ADEQUATE_FIVE_SUBSTANTIVE_RESIDUALS_IDENTIFIED_SINGLE_SOURCE_SEVEN_REQUIREMENT_DISCOVERY_METHODOLOGICALLY_JUSTIFIED_NO_COMPOSITION_NO_PROMOTION',
    exactI216BoundaryAccepted: true,
    evidenceAdequacyAccepted: true,
    candidateMatrixCountAccepted: 3,
    coverageCellCountAccepted: 21,
    fullSevenRequirementCandidateCountAccepted: 0,
    primaryResidualRequirementCount: 5,
    primaryResidualRequirementIds: [
      'HIDDEN_STEM_MEMBERSHIP_VS_EFFECTIVE_INTERACTION_SEPARATION',
      'HIDDEN_STEM_TO_VISIBLE_STEM_DIRECTIONAL_ELIGIBILITY_SCOPE',
      'HIDDEN_STEM_TO_HIDDEN_STEM_DIRECTIONAL_ELIGIBILITY_SCOPE',
      'POSITION_CONTEXT_ACTIVATION_AND_EXCEPTION_CONDITIONS',
      'RELATION_EXISTENCE_EFFECTIVE_INTERACTION_AND_DAMAGE_OUTCOME_SEPARATION',
    ],
    hiddenToVisibleIsHighestPriorityUnresolvedDirectionalGap: true,
    hiddenToVisiblePositiveDirectEvidenceRemainsUnestablished: true,
    generalHiddenToHiddenEligibilityRemainsUnestablished: true,
    membershipVsEffectiveInteractionGeneralSeparationRemainsUnestablished: true,
    activationExceptionGeneralContractRemainsUnestablished: true,
    relationInteractionDamageGeneralSeparationRemainsUnestablished: true,
    visibleToHiddenDirectSignalExistsButIsCandidateLocalOnly: true,
    exactSourceIdentityRequirementRemainsMandatoryForAnyNewCandidate: true,
    allSevenI212RequirementsRemainMandatoryForAnyNewCandidate: true,
    singleSourceSevenRequirementCandidateRequired: true,
    existingCandidatePartialCoverageMayCrossCompleteNewCandidate: false,
    existingVisibleToHiddenSignalMayBackfillNewCandidate: false,
    existingLocatorCoverageMayBackfillNewCandidate: false,
    materiallyTargetedSingleSourceDiscoveryMethodologicallyJustified: true,
    equivalentSameSurfaceRepetitionCountsAsProgress: false,
    materiallyNewSourceOrMateriallyNewDirectPassageRequired: true,
    discoveryReadinessReviewAuthorized: true,
    discoveryExecutedByThisGate: false,
    doctrinalConflictRetained: true,
    doctrinalConflictResolvedByThisGate: false,
    negativeFindingCreatedByThisGate: false,
    discoveryExhaustionClaimed: false,
    corpusExhaustionClaimed: false,
    authorityGap: 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED',
    authorityGapClosed: false,
    authorityPromotedByThisGate: false,
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
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_SEVEN_REQUIREMENT_AUTHORITY_DISCOVERY_READINESS_REVIEW',
  }) as unknown as I217SourceKeHiddenStemInteractionEligibilityCandidateCoverageEvidenceAdequacyResidualRequirementsReassessmentReviewReport;

describe('I218 single-source seven-requirement hidden-stem authority discovery readiness', () => {
  it('accepts the exact I217 residual boundary', () => {
    const report =
      buildI218SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementAuthorityDiscoveryReadinessReview(
        validI217(),
      );
    expect(report.status).toBe(
      'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_SEVEN_REQUIREMENT_AUTHORITY_DISCOVERY_READINESS_REVIEW',
    );
    expect(report.exactI217BoundaryAccepted).toBe(true);
    expect(report.requirementCount).toBe(7);
    expect(report.primaryResidualRequirementCount).toBe(5);
  });

  it('freezes five discovery paths and sixteen controls', () => {
    const report =
      buildI218SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementAuthorityDiscoveryReadinessReview(
        validI217(),
      );
    expect(report.discoveryPathCount).toBe(5);
    expect(report.discoveryPathIds).toEqual(I218_DISCOVERY_PATH_IDS);
    expect(report.discoveryControlCount).toBe(16);
    expect(report.discoveryControlIds).toEqual(I218_DISCOVERY_CONTROL_IDS);
    expect(report.discoveryPathsFrozen).toBe(true);
    expect(report.discoveryControlsFrozen).toBe(true);
  });

  it('requires all seven requirements inside the same candidate', () => {
    const report =
      buildI218SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementAuthorityDiscoveryReadinessReview(
        validI217(),
      );
    expect(report.singleSourceSevenRequirementCandidateRequired).toBe(true);
    expect(report.allSevenRequirementsMustBeSatisfiedWithinSameCandidate).toBe(true);
    expect(report.currentCandidateEvidenceMayCrossCompleteCandidate).toBe(false);
    expect(report.existingVisibleToHiddenSignalMayBackfillCandidate).toBe(false);
  });

  it('prioritizes hidden-to-visible but retains same-candidate visible-to-hidden and general hidden-to-hidden requirements', () => {
    const report =
      buildI218SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementAuthorityDiscoveryReadinessReview(
        validI217(),
      );
    expect(report.hiddenToVisiblePriorityTargetRequired).toBe(true);
    expect(report.sameCandidateVisibleToHiddenEvidenceRequired).toBe(true);
    expect(report.generalHiddenToHiddenEvidenceRequired).toBe(true);
    expect(report.branchClashOnlyHiddenToHiddenMayBeGeneralized).toBe(false);
  });

  it('requires semantic and source-context boundaries explicitly', () => {
    const report =
      buildI218SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementAuthorityDiscoveryReadinessReview(
        validI217(),
      );
    expect(report.explicitMembershipVsEffectiveInteractionSeparationRequired).toBe(true);
    expect(report.explicitPositionContextActivationAndExceptionsRequired).toBe(true);
    expect(report.explicitRelationInteractionDamageSeparationRequired).toBe(true);
    expect(report.exactSourceIdentityRequired).toBe(true);
    expect(report.originalOrVerifiedSourceContextRequired).toBe(true);
    expect(report.reproducibleLocatorRequired).toBe(true);
  });

  it('authorizes discovery only and preserves partial/conflict handling', () => {
    const report =
      buildI218SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementAuthorityDiscoveryReadinessReview(
        validI217(),
      );
    expect(report.discoveryAuthorized).toBe(true);
    expect(report.discoveryExecutedByThisGate).toBe(false);
    expect(report.candidateEvidenceRecordedByThisGate).toBe(false);
    expect(report.partialEvidenceMayBeRecorded).toBe(true);
    expect(report.partialEvidenceMayTriggerPromotion).toBe(false);
    expect(report.restrictiveDoctrinalConflictMustBePreserved).toBe(true);
    expect(report.doctrinalConflictResolutionAuthorizedByThisGate).toBe(false);
  });

  it('preserves provenance, package and production guards', () => {
    const report =
      buildI218SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementAuthorityDiscoveryReadinessReview(
        validI217(),
      );
    expect(report.quWei2001HoldPreserved).toBe(true);
    expect(report.li1998SameTargetPathSuspendedNotRetired).toBe(true);
    expect(report.I132IndependentNormativeProvenanceRequirementRemainsNormative).toBe(true);
    expect(report.I132PolicyRelaxationAuthorizedByThisGate).toBe(false);
    expect(report.evidenceRebindingAuthorizedByThisGate).toBe(false);
    expect(report.currentV2PackageAndCandidateSetRemainImmutable).toBe(true);
    expect(report.currentV2ProvenanceDisposition).toBe('BLOCKED_UNDER_CURRENT_EVIDENCE');
    expect(report.actualCompositionPerformedByThisGate).toBe(false);
    expect(report.thresholdRuleCreatedByThisGate).toBe(false);
    expect(report.damageEvaluationAuthorized).toBe(false);
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
    expect(report.productionPolicyExecutionAuthorized).toBe(false);
  });

  it('fails closed when the I217 residual boundary is changed', () => {
    const invalid: I217SourceKeHiddenStemInteractionEligibilityCandidateCoverageEvidenceAdequacyResidualRequirementsReassessmentReviewReport = {
      ...validI217(),
      primaryResidualRequirementCount: 0,
    };
    const report =
      buildI218SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementAuthorityDiscoveryReadinessReview(
        invalid,
      );
    expect(report.status).toBe('I217_RESIDUAL_REASSESSMENT_BOUNDARY_INVALID');
    expect(report.discoveryAuthorized).toBe(false);
    expect(report.discoveryPathCount).toBe(0);
    expect(report.discoveryControlCount).toBe(0);
    expect(report.authorityGap).toBe('UPSTREAM_INVALID');
  });
});
