import { describe, expect, it } from 'vitest';
import type {
  I216CandidateCoverageMatrix,
  I216SourceKeHiddenStemInteractionEligibilityCandidateEvidenceAdequacyCoverageEvaluationReport,
} from '../src/research/i216-source-ke-hidden-stem-interaction-eligibility-candidate-evidence-adequacy-coverage-evaluation.js';
import {
  I217_PRIMARY_RESIDUAL_REQUIREMENT_IDS,
  buildI217SourceKeHiddenStemInteractionEligibilityCandidateCoverageEvidenceAdequacyResidualRequirementsReassessmentReview,
} from '../src/research/i217-source-ke-hidden-stem-interaction-eligibility-candidate-coverage-evidence-adequacy-residual-requirements-reassessment-review.js';

const matrix = (): I216CandidateCoverageMatrix =>
  ({
    cellCount: 7,
    cells: Array.from({ length: 7 }, () => ({})),
  }) as unknown as I216CandidateCoverageMatrix;

const validI216 = (): I216SourceKeHiddenStemInteractionEligibilityCandidateEvidenceAdequacyCoverageEvaluationReport =>
  ({
    evaluationId: 'i216_fixture',
    status:
      'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_CANDIDATE_EVIDENCE_ADEQUACY_COVERAGE_EVALUATION',
    decision:
      'THREE_CANDIDATE_LOCAL_MATRICES_EVALUATED_ZERO_FULL_SEVEN_REQUIREMENT_CANDIDATES_HIDDEN_TO_VISIBLE_REMAINS_UNRESOLVED_DOCTRINAL_CONFLICT_REMAINS_NO_AUTHORITY_PROMOTED',
    exactI215BoundaryAccepted: true,
    evaluationExecuted: true,
    candidateMatrixCount: 3,
    totalCoverageCellCount: 21,
    matrices: [matrix(), matrix(), matrix()],
    candidatesWithFullSevenRequirementCoverage: 0,
    candidateLocalAuthorityAdequateCount: 0,
    chenYuanHiddenToHiddenContextBoundedPartialAccepted: true,
    shenfengVisibleToHiddenDirectCandidateLocalEvidenceAccepted: true,
    liHanchenRestrictiveConflictAcceptedAsConflictOnly: true,
    hiddenToVisiblePositiveDirectEvidenceEstablished: false,
    hiddenToVisibleRequirementRemainsUnresolved: true,
    hiddenToVisibleAbsenceCreatesNegativeFinding: false,
    contextualEvidenceGeneralizedBeyondContext: false,
    doctrinalConflictPresent: true,
    doctrinalConflictResolvedByThisGate: false,
    crossCandidateCompositionPerformed: false,
    partialEvidenceCountedAsDirectRequirementSatisfaction: false,
    restrictiveConflictCountedAsDirectRequirementSatisfaction: false,
    fullSevenRequirementAuthorityContractSatisfied: false,
    authorityGap: 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED',
    authorityGapClosed: false,
    authorityPromotedByThisGate: false,
    negativeFindingCreatedByThisGate: false,
    discoveryExhaustionClaimed: false,
    corpusExhaustionClaimed: false,
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
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_CANDIDATE_COVERAGE_EVIDENCE_ADEQUACY_RESIDUAL_REQUIREMENTS_REASSESSMENT_REVIEW',
  }) as unknown as I216SourceKeHiddenStemInteractionEligibilityCandidateEvidenceAdequacyCoverageEvaluationReport;

describe('I217 hidden-stem residual requirements reassessment', () => {
  it('accepts the exact I216 boundary and resolves the reassessment gate', () => {
    const report =
      buildI217SourceKeHiddenStemInteractionEligibilityCandidateCoverageEvidenceAdequacyResidualRequirementsReassessmentReview(
        validI216(),
      );
    expect(report.status).toBe(
      'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_CANDIDATE_COVERAGE_EVIDENCE_ADEQUACY_RESIDUAL_REQUIREMENTS_REASSESSMENT_REVIEW',
    );
    expect(report.evidenceAdequacyAccepted).toBe(true);
    expect(report.candidateMatrixCountAccepted).toBe(3);
    expect(report.coverageCellCountAccepted).toBe(21);
  });

  it('freezes five substantive residual requirements', () => {
    const report =
      buildI217SourceKeHiddenStemInteractionEligibilityCandidateCoverageEvidenceAdequacyResidualRequirementsReassessmentReview(
        validI216(),
      );
    expect(report.primaryResidualRequirementCount).toBe(5);
    expect(report.primaryResidualRequirementIds).toEqual(I217_PRIMARY_RESIDUAL_REQUIREMENT_IDS);
  });

  it('keeps hidden-to-visible as the highest-priority unresolved directional gap', () => {
    const report =
      buildI217SourceKeHiddenStemInteractionEligibilityCandidateCoverageEvidenceAdequacyResidualRequirementsReassessmentReview(
        validI216(),
      );
    expect(report.hiddenToVisibleIsHighestPriorityUnresolvedDirectionalGap).toBe(true);
    expect(report.hiddenToVisiblePositiveDirectEvidenceRemainsUnestablished).toBe(true);
    expect(report.negativeFindingCreatedByThisGate).toBe(false);
  });

  it('requires a future single source to satisfy all seven I212 requirements independently', () => {
    const report =
      buildI217SourceKeHiddenStemInteractionEligibilityCandidateCoverageEvidenceAdequacyResidualRequirementsReassessmentReview(
        validI216(),
      );
    expect(report.allSevenI212RequirementsRemainMandatoryForAnyNewCandidate).toBe(true);
    expect(report.singleSourceSevenRequirementCandidateRequired).toBe(true);
    expect(report.existingCandidatePartialCoverageMayCrossCompleteNewCandidate).toBe(false);
    expect(report.existingVisibleToHiddenSignalMayBackfillNewCandidate).toBe(false);
    expect(report.existingLocatorCoverageMayBackfillNewCandidate).toBe(false);
  });

  it('authorizes only targeted discovery readiness, not discovery or promotion', () => {
    const report =
      buildI217SourceKeHiddenStemInteractionEligibilityCandidateCoverageEvidenceAdequacyResidualRequirementsReassessmentReview(
        validI216(),
      );
    expect(report.materiallyTargetedSingleSourceDiscoveryMethodologicallyJustified).toBe(true);
    expect(report.discoveryReadinessReviewAuthorized).toBe(true);
    expect(report.discoveryExecutedByThisGate).toBe(false);
    expect(report.authorityPromotedByThisGate).toBe(false);
    expect(report.candidateRegisteredByThisGate).toBe(false);
    expect(report.candidateSelectedByThisGate).toBe(false);
  });

  it('preserves conflict, provenance, package and production guards', () => {
    const report =
      buildI217SourceKeHiddenStemInteractionEligibilityCandidateCoverageEvidenceAdequacyResidualRequirementsReassessmentReview(
        validI216(),
      );
    expect(report.doctrinalConflictRetained).toBe(true);
    expect(report.doctrinalConflictResolvedByThisGate).toBe(false);
    expect(report.quWei2001HoldPreserved).toBe(true);
    expect(report.li1998SameTargetPathSuspendedNotRetired).toBe(true);
    expect(report.I132IndependentNormativeProvenanceRequirementRemainsNormative).toBe(true);
    expect(report.I132PolicyRelaxationAuthorizedByThisGate).toBe(false);
    expect(report.currentV2PackageAndCandidateSetRemainImmutable).toBe(true);
    expect(report.currentV2ProvenanceDisposition).toBe('BLOCKED_UNDER_CURRENT_EVIDENCE');
    expect(report.actualCompositionPerformedByThisGate).toBe(false);
    expect(report.thresholdRuleCreatedByThisGate).toBe(false);
    expect(report.damageEvaluationAuthorized).toBe(false);
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
    expect(report.productionPolicyExecutionAuthorized).toBe(false);
  });

  it('routes to single-source seven-requirement discovery readiness', () => {
    const report =
      buildI217SourceKeHiddenStemInteractionEligibilityCandidateCoverageEvidenceAdequacyResidualRequirementsReassessmentReview(
        validI216(),
      );
    expect(report.recommendedNextGate).toBe(
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_SEVEN_REQUIREMENT_AUTHORITY_DISCOVERY_READINESS_REVIEW',
    );
    expect(report.equivalentSameSurfaceRepetitionCountsAsProgress).toBe(false);
    expect(report.materiallyNewSourceOrMateriallyNewDirectPassageRequired).toBe(true);
  });

  it('fails closed when the I216 coverage boundary is altered', () => {
    const invalid: I216SourceKeHiddenStemInteractionEligibilityCandidateEvidenceAdequacyCoverageEvaluationReport = {
      ...validI216(),
      candidateMatrixCount: 0,
    };
    const report =
      buildI217SourceKeHiddenStemInteractionEligibilityCandidateCoverageEvidenceAdequacyResidualRequirementsReassessmentReview(
        invalid,
      );
    expect(report.status).toBe('I216_COVERAGE_EVALUATION_BOUNDARY_INVALID');
    expect(report.evidenceAdequacyAccepted).toBe(false);
    expect(report.primaryResidualRequirementCount).toBe(0);
    expect(report.discoveryReadinessReviewAuthorized).toBe(false);
    expect(report.authorityGap).toBe('UPSTREAM_INVALID');
  });
});
