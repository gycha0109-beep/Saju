import { describe, expect, test } from 'vitest';
import {
  I144_BINDING_EVALUATION_STEP_IDS,
  buildI144ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredInputPackageEvaluationAuthorizationReadinessReview,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetEvidenceRebindingAdjudicationInputMaterializationRecordReport,
} from '../src/index.js';

function i143(
  overrides: Record<string, unknown> = {},
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetEvidenceRebindingAdjudicationInputMaterializationRecordReport {
  const adoptionId = 'visible_stem_ke_composition_policy_adoption_fixture';
  const candidateSetId = 'visible_stem_ke_composition_candidate_set_fixture';
  const base = {
    recordId: 'i143_i144_fixture',
    status: 'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_CANDIDATE_SET_EVIDENCE_REBINDING_ADJUDICATION_INPUT_MATERIALIZATION_RECORD',
    decision: 'EIGHT_INPUT_ARTIFACT_CLASSES_MATERIALIZED_AND_PACKAGE_REGISTERED_WITH_UNRESOLVED_ADJUDICATION_STATES_NO_EVALUATION',
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    adoptionId,
    candidateSetVersion: 'v1-candidate-set',
    candidateSetId,
    inputPackageVersion: 'v1-input-package',
    inputPackageId: 'visible_stem_ke_composition_input_package_fixture',
    inputPackageState: 'REGISTERED_NOT_EVALUATED',
    exactI142ReadinessAccepted: true,
    candidateManifest: {
      candidateSetId,
      candidateSetVersion: 'v1-candidate-set',
      adoptionId,
      candidateIds: ['a', 'b', 'c', 'd', 'e', 'f'],
      candidateCount: 6,
      frozen: true,
    },
    allEightArtifactClassesMaterialized: true,
    allSixI118RequirementsHaveExplicitOwnershipBindings: true,
    everyEvidenceRecordBindsFrozenCandidateSourceWitnessLocator: true,
    allWitnessBindingsStableAndReproducible: true,
    unresolvedStatesPreservedWithoutInference: true,
    semanticBridgeUnresolvedCount: 3,
    contradictionUnresolvedCount: 2,
    scopeCompatibilityUnresolvedCount: 6,
    provenanceIndependenceUnresolvedCount: 6,
    inputPackageRegisteredByThisGate: true,
    evidenceRebindingPerformedByThisGate: true,
    requirementCoverageAdjudicatedByThisGate: false,
    scopeCompatibilityAdjudicatedByThisGate: false,
    provenanceIndependenceAdjudicatedByThisGate: false,
    semanticBridgeAdjudicatedByThisGate: false,
    contradictionAdjudicatedByThisGate: false,
    candidateSetEvaluationAuthorizedByThisGate: false,
    candidateSetEvaluationPerformedByThisGate: false,
    candidateSetAdmissibilityEstablishedByThisGate: false,
    actualCompositionPerformedByThisGate: false,
    multiSourceCompositionAuthorized: false,
    authorityAcquiredByThisGate: false,
    visibleStemBinaryEffectiveInteractionEligibilityResolved: false,
    recommendedNextGate: 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_REGISTERED_INPUT_PACKAGE_EVALUATION_AUTHORIZATION_READINESS_REVIEW',
  };
  return { ...base, ...overrides } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetEvidenceRebindingAdjudicationInputMaterializationRecordReport;
}

describe('I144 registered input package evaluation authorization readiness review', () => {
  test('accepts exact I143 and establishes readiness for a separate authorization contract only', () => {
    const report = buildI144ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredInputPackageEvaluationAuthorizationReadinessReview(i143());
    expect(report.status).toBe('RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_REGISTERED_INPUT_PACKAGE_EVALUATION_AUTHORIZATION_READINESS_REVIEW');
    expect(report.decision).toBe('REGISTERED_INPUT_PACKAGE_STRUCTURALLY_READY_FOR_SEPARATE_FAIL_CLOSED_EVALUATION_AUTHORIZATION_CONTRACT_NO_EVALUATION_AUTHORIZED');
    expect(report.exactI143RegisteredPackageAccepted).toBe(true);
    expect(report.registeredPackageStateObserved).toBe('REGISTERED_NOT_EVALUATED');
    expect(report.evaluationAuthorizationReadinessEstablished).toBe(true);
    expect(report.separateEvaluationAuthorizationContractMayProceed).toBe(true);
    expect(report.candidateSetEvaluationAuthorizedByThisGate).toBe(false);
  });

  test('verifies stable exact package, candidate-set, manifest, evidence, and ownership integrity', () => {
    const report = buildI144ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredInputPackageEvaluationAuthorizationReadinessReview(i143());
    expect(report.inputPackageId).toBe('visible_stem_ke_composition_input_package_fixture');
    expect(report.candidateSetId).toBe('visible_stem_ke_composition_candidate_set_fixture');
    expect(report.packageIdentityStableAndDeterministic).toBe(true);
    expect(report.candidateManifestIntegrityVerifiedForReadiness).toBe(true);
    expect(report.evidenceBindingIntegrityVerifiedForReadiness).toBe(true);
    expect(report.allSixRequirementOwnershipRowsPresentForReadiness).toBe(true);
    expect(report.allEightArtifactClassesPresentForReadiness).toBe(true);
  });

  test('preserves unresolved inputs as fail-closed evaluation inputs rather than readiness failures or positive findings', () => {
    const report = buildI144ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredInputPackageEvaluationAuthorizationReadinessReview(i143());
    expect(report.unresolvedScopeInputsPresent).toBe(true);
    expect(report.unresolvedProvenanceInputsPresent).toBe(true);
    expect(report.unresolvedSemanticBridgeInputsPresent).toBe(true);
    expect(report.unresolvedContradictionInputsPresent).toBe(true);
    expect(report.unresolvedInputsAreEvaluationInputsNotPreauthorizationFailures).toBe(true);
    expect(report.unresolvedInputsCannotBeConvertedToPositiveFindingsByReadinessReview).toBe(true);
    expect(report.scopeCompatibilityAdjudicatedByThisGate).toBe(false);
    expect(report.provenanceIndependenceAdjudicatedByThisGate).toBe(false);
    expect(report.semanticBridgeAdjudicatedByThisGate).toBe(false);
    expect(report.contradictionAdjudicatedByThisGate).toBe(false);
  });

  test('binds the exact nine-step mandatory fail-closed evaluation algorithm', () => {
    const report = buildI144ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredInputPackageEvaluationAuthorizationReadinessReview(i143());
    expect(report.bindingEvaluationStepIds).toEqual(I144_BINDING_EVALUATION_STEP_IDS);
    expect(report.bindingEvaluationStepCount).toBe(9);
    expect(report.allEvaluationStepsMandatoryAndFailClosed).toBe(true);
    expect(report.evaluationMustConsumeExactRegisteredPackageId).toBe(true);
    expect(report.evaluationMustConsumeExactFrozenCandidateSetId).toBe(true);
    expect(report.postRegistrationPackageMutationRequiresNewPackageVersion).toBe(true);
  });

  test('keeps readiness distinct from authorization, adjudication, admissibility, composition, and threshold authority', () => {
    const report = buildI144ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredInputPackageEvaluationAuthorizationReadinessReview(i143());
    expect(report.readinessDoesNotEqualEvaluationAuthorization).toBe(true);
    expect(report.readinessDoesNotEqualAdjudication).toBe(true);
    expect(report.readinessDoesNotEqualCandidateSetAdmissibility).toBe(true);
    expect(report.readinessDoesNotEqualCompositionAuthorization).toBe(true);
    expect(report.readinessDoesNotEqualThresholdAuthority).toBe(true);
    expect(report.inputPackageRegisteredByThisGate).toBe(false);
    expect(report.inputPackageMutatedByThisGate).toBe(false);
    expect(report.requirementCoverageAdjudicatedByThisGate).toBe(false);
    expect(report.candidateSetEvaluationPerformedByThisGate).toBe(false);
  });

  test('keeps all production and composition authority closed', () => {
    const report = buildI144ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredInputPackageEvaluationAuthorizationReadinessReview(i143());
    expect(report.candidateSetAdmissibilityEstablishedByThisGate).toBe(false);
    expect(report.actualCompositionPerformedByThisGate).toBe(false);
    expect(report.crossCandidateCompositionAuthorized).toBe(false);
    expect(report.multiSourceCompositionAuthorized).toBe(false);
    expect(report.policyExecutableByThisGate).toBe(false);
    expect(report.authorityAcquiredByThisGate).toBe(false);
    expect(report.visibleStemBinaryEffectiveInteractionEligibilityResolved).toBe(false);
    expect(report.thresholdRuleCreatedByThisGate).toBe(false);
    expect(report.damageEvaluationAuthorized).toBe(false);
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
    expect(report.hiddenStemInteractionEligibilityGapRemains).toBe(true);
  });

  test('routes only to a separate evaluation authorization contract', () => {
    const report = buildI144ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredInputPackageEvaluationAuthorizationReadinessReview(i143());
    expect(report.recommendedNextGate).toBe('UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_REGISTERED_INPUT_PACKAGE_EVALUATION_AUTHORIZATION_CONTRACT');
    expect(report.candidateSetEvaluationAuthorizedByThisGate).toBe(false);
    expect(report.candidateSetEvaluationPerformedByThisGate).toBe(false);
  });

  test('fails closed when the exact I143 package boundary is mutated', () => {
    const report = buildI144ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredInputPackageEvaluationAuthorizationReadinessReview(
      i143({ inputPackageState: 'NOT_REGISTERED' }),
    );
    expect(report.status).toBe('I143_REGISTERED_INPUT_PACKAGE_UNRESOLVED_OR_INVALID');
    expect(report.decision).toBe('REGISTERED_INPUT_PACKAGE_EVALUATION_AUTHORIZATION_READINESS_NOT_ESTABLISHED');
    expect(report.adoptionId).toBeNull();
    expect(report.candidateSetId).toBeNull();
    expect(report.inputPackageId).toBeNull();
    expect(report.exactI143RegisteredPackageAccepted).toBe(false);
    expect(report.evaluationAuthorizationReadinessEstablished).toBe(false);
    expect(report.separateEvaluationAuthorizationContractMayProceed).toBe(false);
  });
});
