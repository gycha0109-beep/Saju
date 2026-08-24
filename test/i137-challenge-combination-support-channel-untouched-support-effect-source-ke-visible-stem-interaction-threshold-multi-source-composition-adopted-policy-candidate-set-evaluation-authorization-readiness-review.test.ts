import { describe, expect, test } from 'vitest';
import {
  I137_MISSING_CANDIDATE_SET_EVALUATION_INPUT_ARTIFACTS,
  buildI137ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionAdoptedPolicyCandidateSetEvaluationAuthorizationReadinessReview,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredPolicyAdoptionContractReport,
} from '../src/index.js';

function i136(
  overrides: Record<string, unknown> = {},
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredPolicyAdoptionContractReport {
  const base = {
    contractId: 'i136_i137_fixture',
    status:
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_REGISTERED_POLICY_ADOPTION_CONTRACT',
    decision:
      'REGISTERED_POLICY_V1_ADOPTED_NOT_EXECUTABLE_CANDIDATE_EVALUATION_NOT_AUTHORIZED_NO_THRESHOLD_AUTHORITY',
    adoptionRecord: {
      adoptionId: 'visible_stem_ke_composition_policy_adoption_fixture',
      adoptionVersion: 'v1-adoption',
      policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
      policyVersion: 'v1-definition',
      registrationVersion: 'v1-registration',
      registrationId: 'visible_stem_ke_composition_policy_registration_fixture',
      adoptionReadinessReviewId: 'i135_fixture',
      adoptionState: 'ADOPTED_NOT_EXECUTABLE_CANDIDATE_EVALUATION_NOT_AUTHORIZED',
      targetScope: 'VISIBLE_HEAVENLY_STEM_BINARY_EFFECTIVE_INTERACTION_ELIGIBILITY',
      adoptionBindsExactRegistration: true,
      registeredPolicyDefinitionImmutable: true,
      priorEvidenceGrandfatheredAtAdoption: false,
      priorEvidenceRequiresRebindingBeforeCandidateEvaluation: true,
      policyExecutionRequiresSeparateAuthorization: true,
      candidateSetEvaluationRequiresSeparateAuthorization: true,
      adoptionDoesNotAuthorizeSemanticBridges: true,
      adoptionDoesNotResolveContradictions: true,
      adoptionDoesNotEstablishCandidateSetAdmissibility: true,
      adoptionDoesNotEqualThresholdAuthority: true,
    },
    adoptionRecordCreated: true,
    adoptionIdentityBoundToExactRegistration: true,
    adoptionReadinessBoundToI135Review: true,
    registeredPolicyDefinitionPreservedWithoutMutation: true,
    priorEvidenceGrandfatheredAtAdoption: false,
    priorEvidenceRebindingRequiredBeforeCandidateEvaluation: true,
    policyAdoptionAuthorizedByThisGate: true,
    policyAdoptedByThisGate: true,
    policyAdoptionPerformedByThisGate: true,
    policyExecutableByThisGate: false,
    policyExecutionAuthorizedByThisGate: false,
    candidateSetEvaluationAuthorizedByThisGate: false,
    candidateSetEvaluationPerformedByThisGate: false,
    actualCompositionPerformedByThisGate: false,
    crossCandidateCompositionAuthorized: false,
    multiSourceCompositionAuthorized: false,
    currentWuHuaiyunCoverageGrandfathered: false,
    priorCandidateCoverageGrandfathered: false,
    adoptedPolicyCandidateSetEvaluationReadinessNotYetReviewed: true,
    authorityAcquiredByThisGate: false,
    visibleStemBinaryEffectiveInteractionEligibilityResolved: false,
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_ADOPTED_POLICY_CANDIDATE_SET_EVALUATION_AUTHORIZATION_READINESS_REVIEW',
  };

  return { ...base, ...overrides } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredPolicyAdoptionContractReport;
}

describe('I137 adopted-policy candidate-set evaluation authorization readiness review', () => {
  test('accepts the exact I136 adoption but finds candidate-set evaluation authorization not ready', () => {
    const report = buildI137ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionAdoptedPolicyCandidateSetEvaluationAuthorizationReadinessReview(i136());

    expect(report.status).toBe(
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_ADOPTED_POLICY_CANDIDATE_SET_EVALUATION_AUTHORIZATION_READINESS_REVIEW',
    );
    expect(report.decision).toBe(
      'ADOPTED_POLICY_CANDIDATE_SET_EVALUATION_AUTHORIZATION_NOT_READY_INPUT_REBINDING_AND_ADJUDICATION_PACKAGE_REQUIRED',
    );
    expect(report.exactI136AdoptionAccepted).toBe(true);
    expect(report.policyAdoptionRemainsValid).toBe(true);
    expect(report.candidateSetEvaluationAuthorizationReady).toBe(false);
    expect(report.candidateSetEvaluationAuthorizationContractMayProceed).toBe(false);
    expect(report.inputRebindingAndRegistrationContractRequiredFirst).toBe(true);
  });

  test('freezes exactly eight mandatory missing input artifacts', () => {
    const report = buildI137ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionAdoptedPolicyCandidateSetEvaluationAuthorizationReadinessReview(i136());

    expect(report.missingInputArtifacts).toEqual(I137_MISSING_CANDIDATE_SET_EVALUATION_INPUT_ARTIFACTS);
    expect(report.missingInputArtifacts).toHaveLength(8);
    expect(report.missingInputArtifactCount).toBe(8);
    expect(report.allMissingInputArtifactsMandatory).toBe(true);
  });

  test('requires explicit manifest, evidence rebinding, ownership, and witness bindings', () => {
    const report = buildI137ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionAdoptedPolicyCandidateSetEvaluationAuthorizationReadinessReview(i136());

    expect(report.candidateSetEvaluationRequiresExplicitInputPackage).toBe(true);
    expect(report.priorEvidenceCannotBeEvaluatedWithoutRebinding).toBe(true);
    expect(report.i126CoverageMayNotBeGrandfathered).toBe(true);
    expect(report.i128DiscoveryMayNotBeGrandfathered).toBe(true);
    expect(report.candidateSetInputManifestPresent).toBe(false);
    expect(report.evidenceRebindingRecordsPresent).toBe(false);
    expect(report.requirementOwnershipBindingsPresent).toBe(false);
    expect(report.witnessIdentityBindingsPresent).toBe(false);
  });

  test('requires explicit scope, provenance, semantic bridge, and contradiction adjudication inputs', () => {
    const report = buildI137ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionAdoptedPolicyCandidateSetEvaluationAuthorizationReadinessReview(i136());

    expect(report.scopeCompatibilityAdjudicationInputsPresent).toBe(false);
    expect(report.provenanceIndependenceAdjudicationInputsPresent).toBe(false);
    expect(report.semanticBridgeAdjudicationInputsPresent).toBe(false);
    expect(report.contradictionAdjudicationInputsPresent).toBe(false);
    expect(report.adoptedPolicyNineStepAlgorithmMustBeUsedWithoutReordering).toBe(true);
  });

  test('does not authorize evaluation, composition, semantic equivalence, contradiction resolution, or admissibility', () => {
    const report = buildI137ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionAdoptedPolicyCandidateSetEvaluationAuthorizationReadinessReview(i136());

    expect(report.policyExecutableByThisGate).toBe(false);
    expect(report.policyExecutionAuthorizedByThisGate).toBe(false);
    expect(report.candidateSetEvaluationAuthorizedByThisGate).toBe(false);
    expect(report.candidateSetEvaluationPerformedByThisGate).toBe(false);
    expect(report.actualCompositionPerformedByThisGate).toBe(false);
    expect(report.crossCandidateCompositionAuthorized).toBe(false);
    expect(report.multiSourceCompositionAuthorized).toBe(false);
    expect(report.semanticEquivalenceAuthorizedByThisGate).toBe(false);
    expect(report.contradictionResolutionAuthorizedByThisGate).toBe(false);
    expect(report.candidateSetAdmissibilityEstablishedByThisGate).toBe(false);
  });

  test('keeps threshold, damage, production, and hidden-stem authority closed', () => {
    const report = buildI137ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionAdoptedPolicyCandidateSetEvaluationAuthorizationReadinessReview(i136());

    expect(report.authorityAcquiredByThisGate).toBe(false);
    expect(report.visibleStemBinaryEffectiveInteractionEligibilityResolved).toBe(false);
    expect(report.effectiveInteractionSetResolved).toBe(false);
    expect(report.thresholdRuleCreatedByThisGate).toBe(false);
    expect(report.damageEvaluationAuthorized).toBe(false);
    expect(report.hiddenStemInteractionEligibilityGapRemains).toBe(true);
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
  });

  test('preserves the single-candidate default and routes to evidence rebinding/input registration', () => {
    const report = buildI137ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionAdoptedPolicyCandidateSetEvaluationAuthorizationReadinessReview(i136());

    expect(report.singleCandidateFullSixContractRemainsNormativeDefaultUntilCandidateSetEvaluationAuthorization).toBe(true);
    expect(report.continuedSingleCandidateDiscoveryStillPermitted).toBe(true);
    expect(report.recommendedNextGate).toBe(
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_CANDIDATE_SET_EVIDENCE_REBINDING_AND_INPUT_REGISTRATION_CONTRACT',
    );
  });

  test('fails closed if the I136 adoption boundary is mutated', () => {
    const report = buildI137ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionAdoptedPolicyCandidateSetEvaluationAuthorizationReadinessReview(
      i136({ candidateSetEvaluationAuthorizedByThisGate: true }),
    );

    expect(report.status).toBe('I136_ADOPTION_UNRESOLVED_OR_INVALID');
    expect(report.decision).toBe(
      'ADOPTED_POLICY_CANDIDATE_SET_EVALUATION_AUTHORIZATION_READINESS_NOT_ESTABLISHED',
    );
    expect(report.adoptionId).toBeNull();
    expect(report.adoptionStateObserved).toBe('UNRESOLVED');
    expect(report.exactI136AdoptionAccepted).toBe(false);
    expect(report.policyAdoptionRemainsValid).toBe(false);
    expect(report.recommendedNextGate).toBe(
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_REGISTERED_POLICY_ADOPTION_CONTRACT',
    );
  });
});
