import { describe, expect, test } from 'vitest';
import {
  I140_CANDIDATE_UNIVERSE_SOURCE_GATES,
  I140_PROSPECTIVE_SELECTION_CONTROL_IDS,
  buildI140ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProspectiveCandidateSetSelectionContract,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetInputPackageMaterializationReadinessReviewReport,
} from '../src/index.js';

function i139(
  overrides: Record<string, unknown> = {},
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetInputPackageMaterializationReadinessReviewReport {
  const base = {
    reviewId: 'i139_i140_fixture',
    status: 'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_CANDIDATE_SET_INPUT_PACKAGE_MATERIALIZATION_READINESS_REVIEW',
    decision: 'CANDIDATE_SET_INPUT_PACKAGE_MATERIALIZATION_NOT_READY_PROSPECTIVE_SELECTION_BOUNDARY_REQUIRED_TO_PREVENT_OUTCOME_DRIVEN_CHERRY_PICKING',
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    adoptionId: 'visible_stem_ke_composition_policy_adoption_fixture',
    exactI138ContractAccepted: true,
    inputRegistrationContractFrozen: true,
    allEightInputArtifactClassesDefined: true,
    prospectiveCandidateSelectionBoundaryPresent: false,
    missingSelectionControlCount: 6,
    allSelectionControlsMandatory: true,
    materializationReadinessEstablished: false,
    inputPackageMaterializationMayProceed: false,
    prospectiveCandidateSelectionContractRequiredFirst: true,
    inputPackageRegisteredByThisGate: false,
    candidateSetManifestMaterializedByThisGate: false,
    evidenceRebindingPerformedByThisGate: false,
    candidateSetEvaluationAuthorizedByThisGate: false,
    candidateSetEvaluationPerformedByThisGate: false,
    actualCompositionPerformedByThisGate: false,
    multiSourceCompositionAuthorized: false,
    authorityAcquiredByThisGate: false,
    visibleStemBinaryEffectiveInteractionEligibilityResolved: false,
    recommendedNextGate: 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROSPECTIVE_CANDIDATE_SET_SELECTION_CONTRACT',
  };
  return { ...base, ...overrides } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetInputPackageMaterializationReadinessReviewReport;
}

describe('I140 prospective candidate-set selection contract', () => {
  test('accepts exact I139 and freezes the prospective selection contract only', () => {
    const report = buildI140ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProspectiveCandidateSetSelectionContract(i139());
    expect(report.status).toBe('RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROSPECTIVE_CANDIDATE_SET_SELECTION_CONTRACT');
    expect(report.decision).toBe('PROSPECTIVE_CANDIDATE_SET_SELECTION_CONTRACT_FROZEN_BEFORE_MATERIALIZATION_NO_CANDIDATE_SET_SELECTED_NO_EVALUATION');
    expect(report.exactI139ReadinessAccepted).toBe(true);
    expect(report.candidateSelectionContractFrozenByThisGate).toBe(true);
    expect(report.selectionContractVersion).toBe('v1-selection');
  });

  test('freezes exactly six mandatory prospective selection controls', () => {
    const report = buildI140ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProspectiveCandidateSetSelectionContract(i139());
    expect(report.selectionControls.map((item) => item.controlId)).toEqual(I140_PROSPECTIVE_SELECTION_CONTROL_IDS);
    expect(report.selectionControls).toHaveLength(6);
    expect(report.selectionControlCount).toBe(6);
    expect(report.allSelectionControlsMandatory).toBe(true);
    expect(report.selectionControls.every((item) => item.mandatory)).toBe(true);
  });

  test('defines the candidate universe and freezes its prospective cutoff', () => {
    const report = buildI140ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProspectiveCandidateSetSelectionContract(i139());
    expect(report.candidateUniverseSourceGates).toEqual(I140_CANDIDATE_UNIVERSE_SOURCE_GATES);
    expect(report.candidateUniverseSourceGates).toEqual(['I120', 'I122', 'I125', 'I128']);
    expect(report.candidateUniverseCutoffRule).toBe('ALL_REPOSITORY_DOCUMENTED_CANDIDATE_SOURCE_IDENTITIES_AND_WITNESSES_IN_I120_I122_I125_I128_BEFORE_I140_SELECTION_FREEZE');
    expect(report.laterCandidateAdditionRequiresNewSelectionContractVersion).toBe(true);
  });

  test('uses conclusion-neutral inclusion and objective exclusion criteria', () => {
    const report = buildI140ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProspectiveCandidateSetSelectionContract(i139());
    expect(report.inclusionRequiresTargetScopeRelevance).toBe(true);
    expect(report.inclusionRequiresExactNormalizedSourceIdentity).toBe(true);
    expect(report.inclusionRequiresStableReproducibleWitness).toBe(true);
    expect(report.inclusionRequiresAtLeastOneReboundI118RelevantEvidenceItem).toBe(true);
    expect(report.inclusionIndependentOfSupportiveContradictoryOrUnresolvedOutcome).toBe(true);
    expect(report.exclusionBasedOnCoverageSuccessForbidden).toBe(true);
    expect(report.exclusionBasedOnContradictionPresenceForbidden).toBe(true);
    expect(report.exclusionBasedOnPreferredSemanticConclusionForbidden).toBe(true);
  });

  test('freezes source identity, edition, witness, and pre-adjudication rules', () => {
    const report = buildI140ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProspectiveCandidateSetSelectionContract(i139());
    expect(report.sameNormalizedWorkAcrossMirrorWitnessesDeduplicatesToOneCandidate).toBe(true);
    expect(report.alternateWitnessesMayRemainAttachedToSameCandidate).toBe(true);
    expect(report.substantiveEditionSplitRequiresExplicitIdentityAndContentDivergenceBasis).toBe(true);
    expect(report.derivativeReprintOrTranscriptDoesNotCreateIndependentProvenanceByItself).toBe(true);
    expect(report.witnessMustHaveStableLocator).toBe(true);
    expect(report.witnessMustPermitReproducibleTextInspection).toBe(true);
    expect(report.searchSnippetAloneIsNotEligibleWitness).toBe(true);
    expect(report.selectionMustFreezeBeforeRequirementCoverageAdjudication).toBe(true);
    expect(report.selectionMustFreezeBeforeScopeProvenanceBridgeContradictionAdjudication).toBe(true);
    expect(report.postFreezeOutcomeDrivenAdditionForbidden).toBe(true);
    expect(report.postFreezeOutcomeDrivenRemovalForbidden).toBe(true);
  });

  test('performs no candidate materialization, evaluation, composition, or authority acquisition', () => {
    const report = buildI140ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProspectiveCandidateSetSelectionContract(i139());
    expect(report.candidateUniverseMaterializedByThisGate).toBe(false);
    expect(report.candidateSetSelectedByThisGate).toBe(false);
    expect(report.candidateSetFrozenByThisGate).toBe(false);
    expect(report.inputPackageRegisteredByThisGate).toBe(false);
    expect(report.evidenceRebindingPerformedByThisGate).toBe(false);
    expect(report.candidateSetEvaluationAuthorizedByThisGate).toBe(false);
    expect(report.candidateSetEvaluationPerformedByThisGate).toBe(false);
    expect(report.actualCompositionPerformedByThisGate).toBe(false);
    expect(report.multiSourceCompositionAuthorized).toBe(false);
    expect(report.authorityAcquiredByThisGate).toBe(false);
  });

  test('keeps production and hidden-stem authority closed and routes to selection materialization', () => {
    const report = buildI140ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProspectiveCandidateSetSelectionContract(i139());
    expect(report.visibleStemBinaryEffectiveInteractionEligibilityResolved).toBe(false);
    expect(report.thresholdRuleCreatedByThisGate).toBe(false);
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
    expect(report.hiddenStemInteractionEligibilityGapRemains).toBe(true);
    expect(report.recommendedNextGate).toBe('UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_CANDIDATE_SET_SELECTION_MATERIALIZATION_AND_FREEZE_RECORD');
  });

  test('fails closed when the exact I139 boundary is mutated', () => {
    const report = buildI140ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProspectiveCandidateSetSelectionContract(
      i139({ prospectiveCandidateSelectionBoundaryPresent: true }),
    );
    expect(report.status).toBe('I139_MATERIALIZATION_READINESS_UNRESOLVED_OR_INVALID');
    expect(report.decision).toBe('PROSPECTIVE_CANDIDATE_SET_SELECTION_CONTRACT_NOT_ESTABLISHED');
    expect(report.adoptionId).toBeNull();
    expect(report.exactI139ReadinessAccepted).toBe(false);
    expect(report.candidateSelectionContractFrozenByThisGate).toBe(false);
  });
});
