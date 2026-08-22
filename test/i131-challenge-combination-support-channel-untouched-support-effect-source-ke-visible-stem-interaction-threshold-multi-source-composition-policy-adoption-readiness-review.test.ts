import { describe, expect, test } from 'vitest';
import {
  buildI131ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionPolicyAdoptionReadinessReview,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionPolicyRequirementsReviewReport,
} from '../src/index.js';

const REQUIREMENT_IDS = [
  'SOURCE_IDENTITY_AND_WITNESS_STABILITY',
  'REQUIREMENT_OWNERSHIP_AND_NO_IMPLICIT_BORROWING',
  'SEMANTIC_TERM_EQUIVALENCE_OR_EXPLICIT_BRIDGE_AUTHORITY',
  'SCOPE_AND_POSITION_CLASS_COMPATIBILITY',
  'CONTRADICTION_AND_PRECEDENCE_HANDLING',
  'PROVENANCE_INDEPENDENCE_WITHOUT_NUMERIC_WEIGHTING',
  'EXAMPLE_TO_RULE_GENERALIZATION_PROHIBITION',
  'COMPOSITION_SET_COMPLETENESS_AND_REQUIREMENT_COVERAGE',
  'PROSPECTIVE_VERSIONING_AND_NO_RETROACTIVE_GRANDFATHERING',
] as const;

function requirements() {
  return REQUIREMENT_IDS.map((requirementId) => ({
    requirementId,
    mandatory: true as const,
    description: requirementId,
    candidateSetMustSatisfyBeforePolicyUse: true as const,
    absenceMayNotBeInferredAsSatisfaction: true as const,
    searchSnippetMayNotSubstitute: true as const,
    modelSynthesisMayNotSubstitute: true as const,
    numericCalibrationMayNotSubstitute: true as const,
  }));
}

function i130(
  overrides: Record<string, unknown> = {},
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionPolicyRequirementsReviewReport {
  const base = {
    reviewId: 'i130_i131_fixture',
    reviewVersion: 'fixture',
    status:
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_POLICY_REQUIREMENTS_REVIEW',
    decision:
      'MULTI_SOURCE_COMPOSITION_POLICY_ACCEPTANCE_REQUIREMENTS_FROZEN_NO_COMPOSITION_POLICY_ADOPTED_NO_THRESHOLD_AUTHORITY',
    upstreamI129ReviewId: 'i129_fixture',
    targetScope: 'VISIBLE_HEAVENLY_STEM_BINARY_EFFECTIVE_INTERACTION_ELIGIBILITY',
    requirements: requirements(),
    requirementCount: 9,
    requirementsFrozen: true,
    allRequirementsMandatory: true,
    compositionPolicyRequirementsVersioned: true,
    compositionPolicyAdoptedByThisGate: false,
    compositionPolicyResolvedByThisGate: false,
    compositionPolicyExecutableByThisGate: false,
    crossCandidateCompositionAuthorized: false,
    multiSourceCompositionAuthorized: false,
    semanticEquivalenceAuthorizedByDefault: false,
    currentCandidateAcceptedUnderCompositionPolicy: false,
    existingCandidateSetAcceptedUnderCompositionPolicy: false,
    currentWuHuaiyunFourSupportedRequirementsGrandfathered: false,
    priorCandidateCoverageGrandfathered: false,
    futureCandidateSetMustRebindAllEvidenceUnderAdoptedPolicy: true,
    compositionCandidateSetMustCoverAllSixI118Requirements: true,
    allSemanticBridgesMustBeResolvedBeforeAcceptance: true,
    allMaterialContradictionsMustBeResolvedBeforeAcceptance: true,
    policyMustBeProspectivelyRegisteredBeforeCandidateSetEvaluation: true,
    policyMustCarryExplicitVersion: true,
    policyChangesRequireNewVersion: true,
    policyMayRetroactivelyChangeI126Coverage: false,
    policyMayRetroactivelyConvertI128ComplementarityToAuthority: false,
    candidateSetEvaluationPerformedByThisGate: false,
    actualCompositionPerformedByThisGate: false,
    authorityAcquiredByThisGate: false,
    visibleStemBinaryEffectiveInteractionEligibilityResolved: false,
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_POLICY_ADOPTION_READINESS_REVIEW',
  };

  return { ...base, ...overrides } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionPolicyRequirementsReviewReport;
}

describe('I131 source 克 visible-stem threshold multi-source composition policy adoption readiness', () => {
  test('accepts I130 requirements but concludes policy adoption is not ready', () => {
    const report = buildI131ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionPolicyAdoptionReadinessReview(i130());

    expect(report.status).toBe(
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_POLICY_ADOPTION_READINESS_REVIEW',
    );
    expect(report.decision).toBe(
      'I130_REQUIREMENTS_NECESSARY_NOT_SUFFICIENT_COMPOSITION_POLICY_ADOPTION_NOT_READY_VERSIONED_POLICY_DEFINITION_AND_ADJUDICATION_PROCEDURES_ABSENT',
    );
    expect(report.i130AcceptanceRequirementsAccepted).toBe(true);
    expect(report.i130RequirementCount).toBe(9);
    expect(report.i130RequirementsRemainFrozen).toBe(true);
    expect(report.i130RequirementsNecessaryForAdoption).toBe(true);
    expect(report.i130RequirementsSufficientByThemselvesForAdoption).toBe(false);
    expect(report.compositionPolicyAdoptionReady).toBe(false);
    expect(report.compositionPolicyAdoptionMayProceed).toBe(false);
  });

  test('identifies all eight missing policy-definition and adjudication artifacts', () => {
    const report = buildI131ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionPolicyAdoptionReadinessReview(i130());

    expect(report.missingPolicyArtifactIds).toEqual([
      'VERSIONED_POLICY_DEFINITION_OBJECT',
      'CANDIDATE_SET_EVIDENCE_BINDING_PROCEDURE',
      'SEMANTIC_BRIDGE_ADJUDICATION_PROCEDURE',
      'CONTRADICTION_ADJUDICATION_PROCEDURE',
      'SCOPE_COMPATIBILITY_DECISION_PROCEDURE',
      'PROVENANCE_INDEPENDENCE_DECISION_PROCEDURE',
      'FAIL_CLOSED_ACCEPTANCE_EVALUATION_ALGORITHM',
      'PROSPECTIVE_REGISTRATION_AND_CHANGE_CONTROL',
    ]);
    expect(report.missingPolicyArtifactCount).toBe(8);
    expect(report.compositionPolicyDefinitionContractRequired).toBe(true);
  });

  test('does not pretend any missing policy artifact already exists', () => {
    const report = buildI131ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionPolicyAdoptionReadinessReview(i130());

    expect(report.versionedPolicyDefinitionObjectPresent).toBe(false);
    expect(report.candidateSetEvidenceBindingProcedureDefined).toBe(false);
    expect(report.semanticBridgeAdjudicationProcedureDefined).toBe(false);
    expect(report.contradictionAdjudicationProcedureDefined).toBe(false);
    expect(report.scopeCompatibilityDecisionProcedureDefined).toBe(false);
    expect(report.provenanceIndependenceDecisionProcedureDefined).toBe(false);
    expect(report.failClosedAcceptanceEvaluationAlgorithmDefined).toBe(false);
    expect(report.prospectiveRegistrationAndChangeControlDefined).toBe(false);
  });

  test('forbids inference, grandfathering, synthesis, numeric weighting, and majority shortcuts', () => {
    const report = buildI131ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionPolicyAdoptionReadinessReview(i130());

    expect(report.compositionPolicyMayBeInferredFromI130Requirements).toBe(false);
    expect(report.compositionPolicyMayBeInferredFromI128ComplementaryEvidence).toBe(false);
    expect(report.currentWuHuaiyunCoverageMayBeGrandfatheredAtAdoption).toBe(false);
    expect(report.priorCandidateCoverageMayBeGrandfatheredAtAdoption).toBe(false);
    expect(report.semanticBridgesMayBeCreatedByModelSynthesis).toBe(false);
    expect(report.contradictionsMayBeResolvedByNumericWeighting).toBe(false);
    expect(report.contradictionsMayBeResolvedByMajorityVote).toBe(false);
    expect(report.policyDefinitionMayEvaluateCandidatesBeforeProspectiveRegistration).toBe(false);
  });

  test('keeps the current single-candidate full-six contract as the normative default', () => {
    const report = buildI131ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionPolicyAdoptionReadinessReview(i130());

    expect(report.singleCandidateFullSixContractRemainsNormativeDefault).toBe(true);
    expect(report.continuedSingleCandidateDiscoveryStillPermitted).toBe(true);
  });

  test('keeps all composition, authority, threshold, classification, and scoring actions closed', () => {
    const report = buildI131ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionPolicyAdoptionReadinessReview(i130());

    expect(report.compositionPolicyAdoptedByThisGate).toBe(false);
    expect(report.compositionPolicyExecutableByThisGate).toBe(false);
    expect(report.candidateRegistrationPerformedByThisGate).toBe(false);
    expect(report.candidateSetEvaluationPerformedByThisGate).toBe(false);
    expect(report.actualCompositionPerformedByThisGate).toBe(false);
    expect(report.crossCandidateCompositionAuthorized).toBe(false);
    expect(report.multiSourceCompositionAuthorized).toBe(false);
    expect(report.authorityAcquiredByThisGate).toBe(false);
    expect(report.visibleStemBinaryEffectiveInteractionEligibilityResolved).toBe(false);
    expect(report.effectiveInteractionSetResolved).toBe(false);
    expect(report.thresholdRuleCreatedByThisGate).toBe(false);
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
  });

  test('is deterministic and routes only to a separate policy definition contract', () => {
    const first = buildI131ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionPolicyAdoptionReadinessReview(i130());
    const second = buildI131ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionPolicyAdoptionReadinessReview(i130());

    expect(first.reviewId).toBe(second.reviewId);
    expect(first.recommendedNextGate).toBe(
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_POLICY_DEFINITION_CONTRACT',
    );
  });

  test('fails closed if I130 is changed to claim policy adoption', () => {
    const report = buildI131ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionPolicyAdoptionReadinessReview(
      i130({ compositionPolicyAdoptedByThisGate: true }),
    );

    expect(report.status).toBe('I130_UNRESOLVED_OR_INVALID');
    expect(report.decision).toBe('MULTI_SOURCE_COMPOSITION_POLICY_ADOPTION_READINESS_NOT_ESTABLISHED');
    expect(report.i130AcceptanceRequirementsAccepted).toBe(false);
    expect(report.missingPolicyArtifactCount).toBe(0);
    expect(report.compositionPolicyDefinitionContractRequired).toBe(false);
    expect(report.compositionPolicyAdoptionReady).toBe(false);
    expect(report.compositionPolicyAdoptionMayProceed).toBe(false);
    expect(report.recommendedNextGate).toBe(
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_POLICY_REQUIREMENTS_REVIEW',
    );
  });
});
