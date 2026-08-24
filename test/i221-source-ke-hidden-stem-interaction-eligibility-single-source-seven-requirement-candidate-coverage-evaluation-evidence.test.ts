import { describe, expect, it } from 'vitest';
import type { I220SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementCandidateCoverageEvaluationReadinessReviewReport } from '../src/research/i220-source-ke-hidden-stem-interaction-eligibility-single-source-seven-requirement-candidate-coverage-evaluation-readiness-review.js';
import { buildI221SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementCandidateCoverageEvaluationEvidence } from '../src/research/i221-source-ke-hidden-stem-interaction-eligibility-single-source-seven-requirement-candidate-coverage-evaluation-evidence.js';

const validI220 = (): I220SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementCandidateCoverageEvaluationReadinessReviewReport =>
  ({
    reviewId: 'i220_fixture',
    status:
      'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_SEVEN_REQUIREMENT_CANDIDATE_COVERAGE_EVALUATION_READINESS_REVIEW',
    decision:
      'ONE_DIRECT_HTML_CANDIDATE_SEVEN_CELL_CANDIDATE_LOCAL_COVERAGE_MATRIX_FROZEN_SIXTEEN_CONTROLS_NO_COVERAGE_ADJUDICATED_NO_AUTHORITY_PROMOTED',
    exactI219BoundaryAccepted: true,
    evaluationCandidateId: 'LI_YANCHEN_GANZHI_NINE_RELATIONS_PART2_SOHU_2017_HTML',
    evaluationCandidateCount: 1,
    excludedLeadCandidateCount: 2,
    requirementCellCount: 7,
    requirementIds: [
      'HIDDEN_STEM_MEMBERSHIP_VS_EFFECTIVE_INTERACTION_SEPARATION',
      'VISIBLE_STEM_TO_HIDDEN_STEM_DIRECTIONAL_ELIGIBILITY_SCOPE',
      'HIDDEN_STEM_TO_VISIBLE_STEM_DIRECTIONAL_ELIGIBILITY_SCOPE',
      'HIDDEN_STEM_TO_HIDDEN_STEM_DIRECTIONAL_ELIGIBILITY_SCOPE',
      'POSITION_CONTEXT_ACTIVATION_AND_EXCEPTION_CONDITIONS',
      'RELATION_EXISTENCE_EFFECTIVE_INTERACTION_AND_DAMAGE_OUTCOME_SEPARATION',
      'EXACT_SOURCE_IDENTITY_ORIGINAL_CONTEXT_AND_REPRODUCIBLE_LOCATOR',
    ],
    candidateLocalEvaluationRequired: true,
    directEvidenceMustBeFromDirectlyOpenedContext: true,
    leadEvidenceMayEnterMatrix: false,
    searchSnippetMayCreateDirectCoverage: false,
    directionalScopesEvaluatedSeparately: true,
    staticRelationMayAutoEqualDynamicInteraction: false,
    activationExceptionExplicitLanguageRequired: true,
    semanticSeparationExplicitLanguageRequired: true,
    sourceIdentityContextLocatorEvaluatedSeparately: true,
    coverageEvaluationControlCount: 16,
    coverageEvaluationControlsFrozen: true,
    coverageEvaluationAuthorized: true,
    coverageEvaluationExecutedByThisGate: false,
    sevenOfSevenCoverageMayAutoPromoteAuthority: false,
    sevenOfSevenCoverageMayAutoCloseAuthorityGap: false,
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
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_SEVEN_REQUIREMENT_CANDIDATE_COVERAGE_EVALUATION_EVIDENCE',
  }) as unknown as I220SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementCandidateCoverageEvaluationReadinessReviewReport;

describe('I221 single-source seven-requirement hidden-stem candidate coverage evidence', () => {
  it('accepts the exact I220 boundary and executes one seven-cell candidate-local matrix', () => {
    const report =
      buildI221SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementCandidateCoverageEvaluationEvidence(
        validI220(),
      );
    expect(report.status).toBe(
      'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_SEVEN_REQUIREMENT_CANDIDATE_COVERAGE_EVALUATION_EVIDENCE',
    );
    expect(report.evaluationExecuted).toBe(true);
    expect(report.evaluatedCandidateId).toBe('LI_YANCHEN_GANZHI_NINE_RELATIONS_PART2_SOHU_2017_HTML');
    expect(report.coverageCellCount).toBe(7);
  });

  it('finds direct candidate-local coverage in all seven cells', () => {
    const report =
      buildI221SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementCandidateCoverageEvaluationEvidence(
        validI220(),
      );
    expect(report.coverageCells).toHaveLength(7);
    expect(report.coverageCells.every((cell) => cell.state === 'DIRECT')).toBe(true);
    expect(report.coverageCells.every((cell) => cell.candidateLocal)).toBe(true);
    expect(report.coverageCells.every((cell) => cell.directOpenedHtmlContextUsed)).toBe(true);
    expect(report.coverageCells.every((cell) => !cell.searchSnippetUsed && !cell.crossCandidateBackfillUsed)).toBe(true);
    expect(report.directCoverageCount).toBe(7);
    expect(report.partialCoverageCount).toBe(0);
    expect(report.conflictCoverageCount).toBe(0);
    expect(report.notEstablishedCoverageCount).toBe(0);
  });

  it('establishes all three directional scopes directly within the Sohu candidate', () => {
    const report =
      buildI221SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementCandidateCoverageEvaluationEvidence(
        validI220(),
      );
    expect(report.visibleToHiddenDirectionalScopeDirect).toBe(true);
    expect(report.hiddenToVisibleDirectionalScopeDirect).toBe(true);
    expect(report.hiddenToHiddenDirectionalScopeDirect).toBe(true);
  });

  it('establishes interaction separation, activation exceptions, semantic separation and source context coverage', () => {
    const report =
      buildI221SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementCandidateCoverageEvaluationEvidence(
        validI220(),
      );
    expect(report.membershipVsEffectiveInteractionSeparationDirect).toBe(true);
    expect(report.activationAndExceptionConditionsDirect).toBe(true);
    expect(report.relationInteractionDamageSemanticSeparationDirect).toBe(true);
    expect(report.sourceIdentityVerifiedContextAndLocatorDirect).toBe(true);
    expect(report.onlinePublishedSourceIdentityIsEvaluationObject).toBe(true);
    expect(report.canonicalPrintEditionRequiredForThisCoverageFinding).toBe(false);
  });

  it('records seven-of-seven coverage adequacy without authority promotion or gap closure', () => {
    const report =
      buildI221SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementCandidateCoverageEvaluationEvidence(
        validI220(),
      );
    expect(report.allSevenRequirementsDirectlyCoveredCandidateLocally).toBe(true);
    expect(report.sevenRequirementCoverageAdequate).toBe(true);
    expect(report.sevenRequirementCoverageAdequacyEqualsAuthorityPromotion).toBe(false);
    expect(report.sevenRequirementCoverageAdequacyEqualsAuthorityGapClosure).toBe(false);
    expect(report.authorityGap).toBe('SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED');
    expect(report.authorityGapClosed).toBe(false);
    expect(report.authorityPromotedByThisGate).toBe(false);
  });

  it('leaves normative admissibility, authorship lineage and doctrinal conflict unresolved', () => {
    const report =
      buildI221SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementCandidateCoverageEvaluationEvidence(
        validI220(),
      );
    expect(report.exactDoctrinalAuthorshipOrLineageAdjudicatedByThisGate).toBe(false);
    expect(report.sourceNormativeAdmissibilityAdjudicatedByThisGate).toBe(false);
    expect(report.doctrinalConflictWithRestrictiveCandidatePreserved).toBe(true);
    expect(report.doctrinalConflictResolvedByThisGate).toBe(false);
  });

  it('uses no leads, snippets, backfill or composition and preserves all global guards', () => {
    const report =
      buildI221SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementCandidateCoverageEvaluationEvidence(
        validI220(),
      );
    expect(report.leadOnlyEvidenceUsedInCoverageMatrix).toBe(false);
    expect(report.currentCandidateEvidenceUsedToBackfill).toBe(false);
    expect(report.searchSnippetUsedAsDirectCoverage).toBe(false);
    expect(report.sourceClassOrAgeAutoAcceptancePerformed).toBe(false);
    expect(report.crossCandidateCompositionPerformed).toBe(false);
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

  it('fails closed if the I220 readiness boundary changes', () => {
    const invalid: I220SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementCandidateCoverageEvaluationReadinessReviewReport = {
      ...validI220(),
      requirementCellCount: 0,
    };
    const report =
      buildI221SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementCandidateCoverageEvaluationEvidence(
        invalid,
      );
    expect(report.status).toBe('I220_COVERAGE_READINESS_BOUNDARY_INVALID');
    expect(report.evaluationExecuted).toBe(false);
    expect(report.coverageCellCount).toBe(0);
    expect(report.directCoverageCount).toBe(0);
    expect(report.sevenRequirementCoverageAdequate).toBe(false);
    expect(report.authorityGap).toBe('UPSTREAM_INVALID');
  });
});
