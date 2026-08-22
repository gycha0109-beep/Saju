import { describe, expect, test } from 'vitest';
import {
  I138_INPUT_ARTIFACT_SCHEMA_IDS,
  buildI138ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetEvidenceRebindingInputRegistrationContract,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionAdoptedPolicyCandidateSetEvaluationAuthorizationReadinessReviewReport,
} from '../src/index.js';

function i137(
  overrides: Record<string, unknown> = {},
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionAdoptedPolicyCandidateSetEvaluationAuthorizationReadinessReviewReport {
  const base = {
    reviewId: 'i137_i138_fixture',
    status:
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_ADOPTED_POLICY_CANDIDATE_SET_EVALUATION_AUTHORIZATION_READINESS_REVIEW',
    decision:
      'ADOPTED_POLICY_CANDIDATE_SET_EVALUATION_AUTHORIZATION_NOT_READY_INPUT_REBINDING_AND_ADJUDICATION_PACKAGE_REQUIRED',
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    registrationVersion: 'v1-registration',
    adoptionVersion: 'v1-adoption',
    adoptionId: 'visible_stem_ke_composition_policy_adoption_fixture',
    adoptionStateObserved: 'ADOPTED_NOT_EXECUTABLE_CANDIDATE_EVALUATION_NOT_AUTHORIZED',
    exactI136AdoptionAccepted: true,
    adoptedPolicyIdentityAccepted: true,
    adoptedPolicyDefinitionImmutable: true,
    candidateSetEvaluationRequiresExplicitInputPackage: true,
    priorEvidenceCannotBeEvaluatedWithoutRebinding: true,
    missingInputArtifactCount: 8,
    allMissingInputArtifactsMandatory: true,
    candidateSetEvaluationAuthorizationReady: false,
    candidateSetEvaluationAuthorizationContractMayProceed: false,
    inputRebindingAndRegistrationContractRequiredFirst: true,
    policyAdoptionRemainsValid: true,
    candidateSetEvaluationAuthorizedByThisGate: false,
    candidateSetEvaluationPerformedByThisGate: false,
    actualCompositionPerformedByThisGate: false,
    authorityAcquiredByThisGate: false,
    visibleStemBinaryEffectiveInteractionEligibilityResolved: false,
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_CANDIDATE_SET_EVIDENCE_REBINDING_AND_INPUT_REGISTRATION_CONTRACT',
  };
  return { ...base, ...overrides } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionAdoptedPolicyCandidateSetEvaluationAuthorizationReadinessReviewReport;
}

describe('I138 candidate-set evidence rebinding and input registration contract', () => {
  test('freezes the contract deterministically without registering an input package', () => {
    const first = buildI138ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetEvidenceRebindingInputRegistrationContract(i137());
    const second = buildI138ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetEvidenceRebindingInputRegistrationContract(i137());
    expect(first.status).toBe('RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_CANDIDATE_SET_EVIDENCE_REBINDING_INPUT_REGISTRATION_CONTRACT');
    expect(first.decision).toBe('CANDIDATE_SET_EVIDENCE_REBINDING_AND_INPUT_REGISTRATION_CONTRACT_FROZEN_NO_INPUT_PACKAGE_REGISTERED_NO_EVALUATION');
    expect(first.contractId).toBe(second.contractId);
    expect(first.contractFrozenByThisGate).toBe(true);
    expect(first.inputPackageRegisteredByThisGate).toBe(false);
  });

  test('defines exactly eight mandatory artifact schemas corresponding to I137 missing inputs', () => {
    const report = buildI138ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetEvidenceRebindingInputRegistrationContract(i137());
    expect(report.inputArtifactSchemas.map((item) => item.artifactId)).toEqual(I138_INPUT_ARTIFACT_SCHEMA_IDS);
    expect(report.inputArtifactSchemaCount).toBe(8);
    expect(report.allInputArtifactsMandatoryForPackageRegistration).toBe(true);
    expect(report.inputArtifactSchemas.every((item) => item.required)).toBe(true);
  });

  test('requires exact adoption binding, versioned candidate manifest, and explicit evidence rebinding', () => {
    const report = buildI138ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetEvidenceRebindingInputRegistrationContract(i137());
    expect(report.adoptionId).toBe('visible_stem_ke_composition_policy_adoption_fixture');
    expect(report.candidateManifestMustBindExactAdoption).toBe(true);
    expect(report.candidateManifestMustVersionCandidateSet).toBe(true);
    expect(report.everyEvidenceItemMustRebindExactCandidateSourceWitnessAndLocator).toBe(true);
    expect(report.witnessIdentityMustBeStableAndReproducible).toBe(true);
  });

  test('forbids implicit requirement borrowing and prior-gate grandfathering', () => {
    const report = buildI138ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetEvidenceRebindingInputRegistrationContract(i137());
    expect(report.everyI118RequirementMustHaveExplicitOwnershipBindings).toBe(true);
    expect(report.implicitRequirementBorrowingForbidden).toBe(true);
    expect(report.priorI126CoverageMayOnlyEnterThroughExplicitRebinding).toBe(true);
    expect(report.priorI128DiscoveryMayOnlyEnterThroughExplicitRebinding).toBe(true);
    expect(report.noGrandfatheringByReferenceToPriorGate).toBe(true);
  });

  test('allows explicit unresolved adjudication inputs at registration but requires later fail-closed evaluation', () => {
    const report = buildI138ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetEvidenceRebindingInputRegistrationContract(i137());
    expect(report.scopeCompatibilityMustBeExplicitlyAdjudicatedPerEvidenceUse).toBe(true);
    expect(report.provenanceIndependenceMustBeExplicitlyAdjudicatedWithoutNumericWeighting).toBe(true);
    expect(report.semanticBridgeInputsMayRemainExplicitlyUnresolvedAtRegistration).toBe(true);
    expect(report.contradictionInputsMayRemainExplicitlyUnresolvedAtRegistration).toBe(true);
    expect(report.unresolvedSemanticBridgeMustFailClosedDuringEvaluation).toBe(true);
    expect(report.unresolvedContradictionMustFailClosedDuringEvaluation).toBe(true);
  });

  test('keeps registration distinct from evaluation, composition, and threshold authority', () => {
    const report = buildI138ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetEvidenceRebindingInputRegistrationContract(i137());
    expect(report.inputPackageRegistrationRequiresAllEightArtifactClasses).toBe(true);
    expect(report.inputPackageRegistrationDoesNotEqualEvaluationAuthorization).toBe(true);
    expect(report.inputPackageRegistrationDoesNotEqualCompositionAuthorization).toBe(true);
    expect(report.inputPackageRegistrationDoesNotEqualThresholdAuthority).toBe(true);
    expect(report.candidateSetEvaluationAuthorizedByThisGate).toBe(false);
    expect(report.actualCompositionPerformedByThisGate).toBe(false);
    expect(report.authorityAcquiredByThisGate).toBe(false);
  });

  test('does not materialize inputs and routes only to materialization readiness', () => {
    const report = buildI138ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetEvidenceRebindingInputRegistrationContract(i137());
    expect(report.candidateSetManifestMaterializedByThisGate).toBe(false);
    expect(report.evidenceRebindingPerformedByThisGate).toBe(false);
    expect(report.adjudicationInputsMaterializedByThisGate).toBe(false);
    expect(report.adoptedPolicyNineStepAlgorithmRemainsBinding).toBe(true);
    expect(report.recommendedNextGate).toBe('UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_CANDIDATE_SET_INPUT_PACKAGE_MATERIALIZATION_READINESS_REVIEW');
  });

  test('fails closed if the exact I137 readiness result is mutated', () => {
    const report = buildI138ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetEvidenceRebindingInputRegistrationContract(
      i137({ candidateSetEvaluationAuthorizationReady: true }),
    );
    expect(report.status).toBe('I137_READINESS_UNRESOLVED_OR_INVALID');
    expect(report.decision).toBe('CANDIDATE_SET_EVIDENCE_REBINDING_INPUT_REGISTRATION_CONTRACT_NOT_ESTABLISHED');
    expect(report.adoptionId).toBeNull();
    expect(report.exactI137ReadinessAccepted).toBe(false);
    expect(report.contractFrozenByThisGate).toBe(false);
  });
});
