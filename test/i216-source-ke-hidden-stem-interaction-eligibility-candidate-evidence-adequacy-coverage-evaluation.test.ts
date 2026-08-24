import { describe, expect, it } from 'vitest';
import type { I215SourceKeHiddenStemInteractionEligibilityCandidateEvidenceAdequacyCoverageEvaluationReadinessReviewReport } from '../src/research/i215-source-ke-hidden-stem-interaction-eligibility-candidate-evidence-adequacy-coverage-evaluation-readiness-review.js';
import {
  buildI216SourceKeHiddenStemInteractionEligibilityCandidateEvidenceAdequacyCoverageEvaluation,
} from '../src/research/i216-source-ke-hidden-stem-interaction-eligibility-candidate-evidence-adequacy-coverage-evaluation.js';

function validI215(): I215SourceKeHiddenStemInteractionEligibilityCandidateEvidenceAdequacyCoverageEvaluationReadinessReviewReport {
  return {
    reviewId: 'i215_fixture',
    status:
      'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_CANDIDATE_EVIDENCE_ADEQUACY_COVERAGE_EVALUATION_READINESS_REVIEW',
    decision:
      'THREE_CANDIDATES_SEVEN_REQUIREMENTS_FOURTEEN_CONTROLS_CANDIDATE_LOCAL_COVERAGE_EVALUATION_CONTRACT_FROZEN_NO_EVALUATION_EXECUTED',
    exactI214BoundaryAccepted: true,
    candidateEvidenceCount: 3,
    candidateEvidenceIds: [
      'CHEN_YUAN_SIZHU_YUCE_XUE_RUMEN_1995_TRANSCRIPTION',
      'ZHANG_NAN_SHENFENG_TONGKAO_TIANYUANFU_TRANSCRIPTION',
      'LI_HANCHEN_BAZI_YUCE_ZHENZONG_2003_REPRESENTATION',
    ],
    authorityRequirementCount: 7,
    authorityRequirementIds: [
      'HIDDEN_STEM_MEMBERSHIP_VS_EFFECTIVE_INTERACTION_SEPARATION',
      'VISIBLE_STEM_TO_HIDDEN_STEM_DIRECTIONAL_ELIGIBILITY_SCOPE',
      'HIDDEN_STEM_TO_VISIBLE_STEM_DIRECTIONAL_ELIGIBILITY_SCOPE',
      'HIDDEN_STEM_TO_HIDDEN_STEM_DIRECTIONAL_ELIGIBILITY_SCOPE',
      'POSITION_CONTEXT_ACTIVATION_AND_EXCEPTION_CONDITIONS',
      'RELATION_EXISTENCE_EFFECTIVE_INTERACTION_AND_DAMAGE_OUTCOME_SEPARATION',
      'EXACT_SOURCE_IDENTITY_ORIGINAL_CONTEXT_AND_REPRODUCIBLE_LOCATOR',
    ],
    coverageEvaluationControlCount: 14,
    controlsFrozen: true,
    candidateLocalMatrixRequired: true,
    crossCandidateCompositionAuthorized: false,
    everyCandidateEvaluatedAgainstAllSevenRequirements: true,
    directTextAdequacyEvaluatedSeparately: true,
    sourceIdentityAdequacyEvaluatedSeparately: true,
    contextScopeAdequacyEvaluatedSeparately: true,
    canonicalPrintBindingAdequacyEvaluatedSeparately: true,
    bibliographicIdentityMayBackfillCanonicalTextBinding: false,
    contextualEvidenceMayBeGeneralizedBeyondContext: false,
    missingHiddenToVisibleSignalRemainsUnresolved: true,
    missingHiddenToVisibleSignalCreatesNegativeFinding: false,
    restrictiveDoctrineRecordedAsConflictOnly: true,
    restrictiveDoctrineCreatesUniversalNegativeFinding: false,
    doctrinalConflictResolutionAuthorizedByThisGate: false,
    coverageEvaluationAuthorized: true,
    coverageEvaluationExecutedByThisGate: false,
    authorityGapClosed: false,
    authorityPromotedByThisGate: false,
    quWei2001HoldPreserved: true,
    li1998SameTargetPathSuspendedNotRetired: true,
    I132IndependentNormativeProvenanceRequirementRemainsNormative: true,
    I132PolicyRelaxationAuthorizedByThisGate: false,
    provenanceIndependenceAdjudicatedByThisGate: false,
    derivativeLineageAdjudicatedByThisGate: false,
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
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_CANDIDATE_EVIDENCE_ADEQUACY_COVERAGE_EVALUATION',
  } as unknown as I215SourceKeHiddenStemInteractionEligibilityCandidateEvidenceAdequacyCoverageEvaluationReadinessReviewReport;
}

describe('I216 hidden-stem candidate-local evidence adequacy coverage evaluation', () => {
  it('executes the exact I215 candidate-local coverage boundary', () => {
    const r = buildI216SourceKeHiddenStemInteractionEligibilityCandidateEvidenceAdequacyCoverageEvaluation(validI215());
    expect(r.status).toBe(
      'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_CANDIDATE_EVIDENCE_ADEQUACY_COVERAGE_EVALUATION',
    );
    expect(r.exactI215BoundaryAccepted).toBe(true);
    expect(r.evaluationExecuted).toBe(true);
    expect(r.candidateMatrixCount).toBe(3);
    expect(r.totalCoverageCellCount).toBe(21);
  });

  it('evaluates every candidate against exactly seven requirements without cross-candidate evidence', () => {
    const r = buildI216SourceKeHiddenStemInteractionEligibilityCandidateEvidenceAdequacyCoverageEvaluation(validI215());
    expect(r.matrices).toHaveLength(3);
    expect(r.matrices.every((m) => m.cellCount === 7 && m.cells.length === 7)).toBe(true);
    expect(r.matrices.every((m) => m.crossCandidateEvidenceUsed === false)).toBe(true);
    expect(r.crossCandidateCompositionPerformed).toBe(false);
    expect(r.partialEvidenceCountedAsDirectRequirementSatisfaction).toBe(false);
    expect(r.restrictiveConflictCountedAsDirectRequirementSatisfaction).toBe(false);
  });

  it('keeps Chen Yuan hidden-to-hidden evidence context bounded and incomplete', () => {
    const r = buildI216SourceKeHiddenStemInteractionEligibilityCandidateEvidenceAdequacyCoverageEvaluation(validI215());
    const m = r.matrices[0];
    expect(m?.candidateEvidenceId).toBe('CHEN_YUAN_SIZHU_YUCE_XUE_RUMEN_1995_TRANSCRIPTION');
    expect(m?.directSatisfiedCount).toBe(1);
    expect(m?.contextBoundedPartialCount).toBe(4);
    expect(m?.restrictiveConflictCount).toBe(0);
    expect(m?.notEstablishedCount).toBe(2);
    expect(m?.cells[3]?.requirementId).toBe('HIDDEN_STEM_TO_HIDDEN_STEM_DIRECTIONAL_ELIGIBILITY_SCOPE');
    expect(m?.cells[3]?.disposition).toBe('CONTEXT_BOUNDED_PARTIAL_EVIDENCE');
    expect(m?.allSevenRequirementsDirectlySatisfied).toBe(false);
  });

  it('accepts Shenfeng visible-to-hidden as direct candidate-local evidence only', () => {
    const r = buildI216SourceKeHiddenStemInteractionEligibilityCandidateEvidenceAdequacyCoverageEvaluation(validI215());
    const m = r.matrices[1];
    expect(m?.candidateEvidenceId).toBe('ZHANG_NAN_SHENFENG_TONGKAO_TIANYUANFU_TRANSCRIPTION');
    expect(m?.directSatisfiedCount).toBe(2);
    expect(m?.contextBoundedPartialCount).toBe(3);
    expect(m?.notEstablishedCount).toBe(2);
    expect(m?.cells[1]?.requirementId).toBe('VISIBLE_STEM_TO_HIDDEN_STEM_DIRECTIONAL_ELIGIBILITY_SCOPE');
    expect(m?.cells[1]?.disposition).toBe('DIRECT_CANDIDATE_LOCAL_EVIDENCE');
    expect(r.shenfengVisibleToHiddenDirectCandidateLocalEvidenceAccepted).toBe(true);
    expect(r.contextualEvidenceGeneralizedBeyondContext).toBe(false);
  });

  it('keeps Li Hanchen as restrictive conflict rather than positive completion', () => {
    const r = buildI216SourceKeHiddenStemInteractionEligibilityCandidateEvidenceAdequacyCoverageEvaluation(validI215());
    const m = r.matrices[2];
    expect(m?.candidateEvidenceId).toBe('LI_HANCHEN_BAZI_YUCE_ZHENZONG_2003_REPRESENTATION');
    expect(m?.directSatisfiedCount).toBe(1);
    expect(m?.restrictiveConflictCount).toBe(6);
    expect(m?.allSevenRequirementsDirectlySatisfied).toBe(false);
    expect(r.liHanchenRestrictiveConflictAcceptedAsConflictOnly).toBe(true);
    expect(r.doctrinalConflictPresent).toBe(true);
    expect(r.doctrinalConflictResolvedByThisGate).toBe(false);
  });

  it('finds zero full candidates and leaves hidden-to-visible unresolved without negative or exhaustion inference', () => {
    const r = buildI216SourceKeHiddenStemInteractionEligibilityCandidateEvidenceAdequacyCoverageEvaluation(validI215());
    expect(r.candidatesWithFullSevenRequirementCoverage).toBe(0);
    expect(r.candidateLocalAuthorityAdequateCount).toBe(0);
    expect(r.fullSevenRequirementAuthorityContractSatisfied).toBe(false);
    expect(r.hiddenToVisiblePositiveDirectEvidenceEstablished).toBe(false);
    expect(r.hiddenToVisibleRequirementRemainsUnresolved).toBe(true);
    expect(r.hiddenToVisibleAbsenceCreatesNegativeFinding).toBe(false);
    expect(r.negativeFindingCreatedByThisGate).toBe(false);
    expect(r.discoveryExhaustionClaimed).toBe(false);
    expect(r.corpusExhaustionClaimed).toBe(false);
    expect(r.authorityGapClosed).toBe(false);
  });

  it('preserves canonical-binding and all governance guards', () => {
    const r = buildI216SourceKeHiddenStemInteractionEligibilityCandidateEvidenceAdequacyCoverageEvaluation(validI215());
    expect(r.canonicalPrintBindingEstablishedForAnyCandidate).toBe(false);
    expect(r.bibliographicIdentityUsedToBackfillCanonicalTextBinding).toBe(false);
    expect(r.relationExistenceEffectiveInteractionDamageSeparationPreserved).toBe(true);
    expect(r.authorityPromotedByThisGate).toBe(false);
    expect(r.candidateRegisteredByThisGate).toBe(false);
    expect(r.candidateSelectedByThisGate).toBe(false);
    expect(r.quWei2001HoldPreserved).toBe(true);
    expect(r.li1998SameTargetPathSuspendedNotRetired).toBe(true);
    expect(r.I132IndependentNormativeProvenanceRequirementRemainsNormative).toBe(true);
    expect(r.I132PolicyRelaxationAuthorizedByThisGate).toBe(false);
    expect(r.provenanceIndependenceAdjudicatedByThisGate).toBe(false);
    expect(r.derivativeLineageAdjudicatedByThisGate).toBe(false);
    expect(r.evidenceRebindingAuthorizedByThisGate).toBe(false);
    expect(r.candidateSetMutatedByThisGate).toBe(false);
    expect(r.candidateSetReevaluationAuthorizedByThisGate).toBe(false);
    expect(r.currentV2PackageAndCandidateSetRemainImmutable).toBe(true);
    expect(r.currentV2ProvenanceDisposition).toBe('BLOCKED_UNDER_CURRENT_EVIDENCE');
    expect(r.actualCompositionPerformedByThisGate).toBe(false);
    expect(r.multiSourceCompositionAuthorized).toBe(false);
    expect(r.thresholdRuleCreatedByThisGate).toBe(false);
    expect(r.damageEvaluationAuthorized).toBe(false);
    expect(r.classificationAuthorized).toBe(false);
    expect(r.numericScoringAuthorized).toBe(false);
    expect(r.productionPolicyExecutionAuthorized).toBe(false);
    expect(r.recommendedNextGate).toBe(
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_CANDIDATE_COVERAGE_EVIDENCE_ADEQUACY_RESIDUAL_REQUIREMENTS_REASSESSMENT_REVIEW',
    );
  });

  it('fails closed if I215 is mutated to allow cross-candidate composition', () => {
    const mutated = {
      ...validI215(),
      crossCandidateCompositionAuthorized: true,
    } as unknown as I215SourceKeHiddenStemInteractionEligibilityCandidateEvidenceAdequacyCoverageEvaluationReadinessReviewReport;
    const r = buildI216SourceKeHiddenStemInteractionEligibilityCandidateEvidenceAdequacyCoverageEvaluation(mutated);
    expect(r.status).toBe('I215_COVERAGE_READINESS_BOUNDARY_INVALID');
    expect(r.decision).toBe('HIDDEN_STEM_CANDIDATE_COVERAGE_EVALUATION_NOT_EXECUTED');
    expect(r.evaluationExecuted).toBe(false);
    expect(r.candidateMatrixCount).toBe(0);
    expect(r.totalCoverageCellCount).toBe(0);
    expect(r.authorityGap).toBe('UPSTREAM_INVALID');
    expect(r.currentV2ProvenanceDisposition).toBe('NOT_ASSESSED');
  });
});
