import { describe, expect, test } from 'vitest';
import {
  I139_MISSING_PROSPECTIVE_CANDIDATE_SELECTION_CONTROLS,
  buildI139ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetInputPackageMaterializationReadinessReview,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetEvidenceRebindingInputRegistrationContractReport,
} from '../src/index.js';

function i138(
  overrides: Record<string, unknown> = {},
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetEvidenceRebindingInputRegistrationContractReport {
  const base = {
    contractId: 'i138_i139_fixture',
    status: 'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_CANDIDATE_SET_EVIDENCE_REBINDING_INPUT_REGISTRATION_CONTRACT',
    decision: 'CANDIDATE_SET_EVIDENCE_REBINDING_AND_INPUT_REGISTRATION_CONTRACT_FROZEN_NO_INPUT_PACKAGE_REGISTERED_NO_EVALUATION',
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    adoptionId: 'visible_stem_ke_composition_policy_adoption_fixture',
    inputArtifactSchemaCount: 8,
    allInputArtifactsMandatoryForPackageRegistration: true,
    candidateManifestMustBindExactAdoption: true,
    candidateManifestMustVersionCandidateSet: true,
    everyEvidenceItemMustRebindExactCandidateSourceWitnessAndLocator: true,
    everyI118RequirementMustHaveExplicitOwnershipBindings: true,
    implicitRequirementBorrowingForbidden: true,
    noGrandfatheringByReferenceToPriorGate: true,
    inputPackageRegistrationRequiresAllEightArtifactClasses: true,
    inputPackageRegistrationDoesNotEqualEvaluationAuthorization: true,
    contractFrozenByThisGate: true,
    inputPackageRegisteredByThisGate: false,
    candidateSetManifestMaterializedByThisGate: false,
    evidenceRebindingPerformedByThisGate: false,
    candidateSetEvaluationAuthorizedByThisGate: false,
    actualCompositionPerformedByThisGate: false,
    authorityAcquiredByThisGate: false,
    recommendedNextGate: 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_CANDIDATE_SET_INPUT_PACKAGE_MATERIALIZATION_READINESS_REVIEW',
  };
  return { ...base, ...overrides } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetEvidenceRebindingInputRegistrationContractReport;
}

describe('I139 candidate-set input package materialization readiness review', () => {
  test('accepts I138 but keeps materialization not ready until prospective selection is frozen', () => {
    const report = buildI139ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetInputPackageMaterializationReadinessReview(i138());
    expect(report.status).toBe('RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_CANDIDATE_SET_INPUT_PACKAGE_MATERIALIZATION_READINESS_REVIEW');
    expect(report.decision).toBe('CANDIDATE_SET_INPUT_PACKAGE_MATERIALIZATION_NOT_READY_PROSPECTIVE_SELECTION_BOUNDARY_REQUIRED_TO_PREVENT_OUTCOME_DRIVEN_CHERRY_PICKING');
    expect(report.exactI138ContractAccepted).toBe(true);
    expect(report.inputRegistrationContractFrozen).toBe(true);
    expect(report.allEightInputArtifactClassesDefined).toBe(true);
    expect(report.materializationReadinessEstablished).toBe(false);
    expect(report.inputPackageMaterializationMayProceed).toBe(false);
  });

  test('freezes exactly six mandatory missing candidate-selection controls', () => {
    const report = buildI139ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetInputPackageMaterializationReadinessReview(i138());
    expect(report.missingSelectionControls).toEqual(I139_MISSING_PROSPECTIVE_CANDIDATE_SELECTION_CONTROLS);
    expect(report.missingSelectionControls).toHaveLength(6);
    expect(report.missingSelectionControlCount).toBe(6);
    expect(report.allSelectionControlsMandatory).toBe(true);
  });

  test('requires candidate universe, prospective inclusion/exclusion, and source/witness rules', () => {
    const report = buildI139ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetInputPackageMaterializationReadinessReview(i138());
    expect(report.prospectiveCandidateSelectionBoundaryPresent).toBe(false);
    expect(report.candidateUniverseDefinitionPresent).toBe(false);
    expect(report.prospectiveInclusionCriteriaPresent).toBe(false);
    expect(report.prospectiveExclusionCriteriaPresent).toBe(false);
    expect(report.sourceIdentityDeduplicationAndEditionRulesPresent).toBe(false);
    expect(report.witnessEligibilityAndStabilityRulesPresent).toBe(false);
    expect(report.selectionFreezeBeforeEvidenceAdjudicationPresent).toBe(false);
  });

  test('forbids outcome-driven candidate addition and removal', () => {
    const report = buildI139ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetInputPackageMaterializationReadinessReview(i138());
    expect(report.outcomeDrivenCandidateSelectionForbidden).toBe(true);
    expect(report.postHocCandidateAdditionBasedOnCoverageOutcomeForbidden).toBe(true);
    expect(report.postHocCandidateRemovalBasedOnContradictionOutcomeForbidden).toBe(true);
    expect(report.searchResultRankingAloneCannotDefineCandidateUniverse).toBe(true);
  });

  test('prevents prior gate presence or absence from silently deciding candidate inclusion', () => {
    const report = buildI139ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetInputPackageMaterializationReadinessReview(i138());
    expect(report.priorGatePresenceAloneCannotForceCandidateInclusion).toBe(true);
    expect(report.priorGateAbsenceAloneCannotForceCandidateExclusion).toBe(true);
    expect(report.prospectiveCandidateSelectionContractRequiredFirst).toBe(true);
  });

  test('performs no materialization, evaluation, composition, or threshold authorization', () => {
    const report = buildI139ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetInputPackageMaterializationReadinessReview(i138());
    expect(report.inputPackageRegisteredByThisGate).toBe(false);
    expect(report.candidateSetManifestMaterializedByThisGate).toBe(false);
    expect(report.evidenceRebindingPerformedByThisGate).toBe(false);
    expect(report.candidateSetEvaluationAuthorizedByThisGate).toBe(false);
    expect(report.candidateSetEvaluationPerformedByThisGate).toBe(false);
    expect(report.actualCompositionPerformedByThisGate).toBe(false);
    expect(report.multiSourceCompositionAuthorized).toBe(false);
    expect(report.authorityAcquiredByThisGate).toBe(false);
  });

  test('keeps production and hidden-stem authority closed and routes to prospective selection contract', () => {
    const report = buildI139ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetInputPackageMaterializationReadinessReview(i138());
    expect(report.visibleStemBinaryEffectiveInteractionEligibilityResolved).toBe(false);
    expect(report.thresholdRuleCreatedByThisGate).toBe(false);
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
    expect(report.hiddenStemInteractionEligibilityGapRemains).toBe(true);
    expect(report.recommendedNextGate).toBe('UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROSPECTIVE_CANDIDATE_SET_SELECTION_CONTRACT');
  });

  test('fails closed when the I138 contract boundary is mutated', () => {
    const report = buildI139ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetInputPackageMaterializationReadinessReview(
      i138({ inputPackageRegisteredByThisGate: true }),
    );
    expect(report.status).toBe('I138_CONTRACT_UNRESOLVED_OR_INVALID');
    expect(report.decision).toBe('CANDIDATE_SET_INPUT_PACKAGE_MATERIALIZATION_READINESS_NOT_ESTABLISHED');
    expect(report.adoptionId).toBeNull();
    expect(report.exactI138ContractAccepted).toBe(false);
    expect(report.inputRegistrationContractFrozen).toBe(false);
  });
});
