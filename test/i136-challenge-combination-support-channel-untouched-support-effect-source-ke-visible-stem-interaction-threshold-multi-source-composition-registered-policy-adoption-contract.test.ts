import { describe, expect, test } from 'vitest';
import {
  buildI136ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredPolicyAdoptionContract,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredPolicyAdoptionReadinessReviewReport,
} from '../src/index.js';

function i135(
  overrides: Record<string, unknown> = {},
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredPolicyAdoptionReadinessReviewReport {
  const base = {
    reviewId: 'i135_i136_fixture',
    status:
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_REGISTERED_POLICY_ADOPTION_READINESS_REVIEW',
    decision:
      'REGISTERED_POLICY_SATISFIES_ADOPTION_READINESS_PRECONDITIONS_SEPARATE_ADOPTION_CONTRACT_MAY_PROCEED_NO_ADOPTION_OR_EXECUTION',
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    registrationVersion: 'v1-registration',
    registrationId: 'visible_stem_ke_composition_policy_registration_fixture',
    registrationStateObserved: 'REGISTERED_NOT_ADOPTED_NOT_EXECUTABLE',
    readinessRequirementCount: 8,
    allReadinessRequirementsMandatory: true,
    exactI134RegistrationAccepted: true,
    registrationIdentityImmutable: true,
    prospectiveOrderingVerified: true,
    noPreRegistrationCandidateEvaluationVerified: true,
    noPriorEvidenceGrandfatheringVerified: true,
    priorEvidenceRebindingRequirementVerified: true,
    policyVersionChangeControlVerified: true,
    adoptionSeparatedFromExecution: true,
    adoptionSeparatedFromCandidateEvaluationAuthorization: true,
    adoptionSeparatedFromThresholdAuthority: true,
    adoptionMustBindExactRegistration: true,
    adoptionMayNotMutateRegisteredDefinition: true,
    adoptionMayNotGrandfatherPriorEvidence: true,
    adoptionMayNotEvaluateCandidatesByItself: true,
    adoptionMayNotAuthorizeThresholdByItself: true,
    registeredPolicyAdoptionReadinessEstablished: true,
    separateAdoptionContractMayProceed: true,
    policyAdoptionAuthorizedByThisGate: false,
    policyAdoptedByThisGate: false,
    policyExecutableByThisGate: false,
    candidateSetEvaluationAuthorizedByThisGate: false,
    candidateSetEvaluationPerformedByThisGate: false,
    actualCompositionPerformedByThisGate: false,
    crossCandidateCompositionAuthorized: false,
    multiSourceCompositionAuthorized: false,
    currentWuHuaiyunCoverageGrandfathered: false,
    priorCandidateCoverageGrandfathered: false,
    authorityAcquiredByThisGate: false,
    visibleStemBinaryEffectiveInteractionEligibilityResolved: false,
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_REGISTERED_POLICY_ADOPTION_CONTRACT',
  };

  return { ...base, ...overrides } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredPolicyAdoptionReadinessReviewReport;
}

describe('I136 registered multi-source composition policy adoption contract', () => {
  test('deterministically adopts the exact registered v1 policy without making it executable', () => {
    const first = buildI136ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredPolicyAdoptionContract(i135());
    const second = buildI136ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredPolicyAdoptionContract(i135());

    expect(first.status).toBe(
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_REGISTERED_POLICY_ADOPTION_CONTRACT',
    );
    expect(first.decision).toBe(
      'REGISTERED_POLICY_V1_ADOPTED_NOT_EXECUTABLE_CANDIDATE_EVALUATION_NOT_AUTHORIZED_NO_THRESHOLD_AUTHORITY',
    );
    expect(first.contractId).toBe(second.contractId);
    expect(first.adoptionRecord?.adoptionId).toBe(second.adoptionRecord?.adoptionId);
    expect(first.adoptionRecordCreated).toBe(true);
    expect(first.policyAdoptionAuthorizedByThisGate).toBe(true);
    expect(first.policyAdoptedByThisGate).toBe(true);
    expect(first.policyAdoptionPerformedByThisGate).toBe(true);
    expect(first.policyExecutableByThisGate).toBe(false);
  });

  test('binds adoption to the exact registration and preserves the registered definition immutably', () => {
    const report = buildI136ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredPolicyAdoptionContract(i135());
    const adoption = report.adoptionRecord!;

    expect(adoption.policyId).toBe('myeonghwa-visible-stem-ke-multi-source-composition-policy');
    expect(adoption.policyVersion).toBe('v1-definition');
    expect(adoption.registrationVersion).toBe('v1-registration');
    expect(adoption.registrationId).toBe('visible_stem_ke_composition_policy_registration_fixture');
    expect(adoption.adoptionVersion).toBe('v1-adoption');
    expect(adoption.adoptionState).toBe('ADOPTED_NOT_EXECUTABLE_CANDIDATE_EVALUATION_NOT_AUTHORIZED');
    expect(adoption.adoptionBindsExactRegistration).toBe(true);
    expect(adoption.registeredPolicyDefinitionImmutable).toBe(true);
    expect(report.adoptionIdentityBoundToExactRegistration).toBe(true);
    expect(report.registeredPolicyDefinitionPreservedWithoutMutation).toBe(true);
  });

  test('forbids evidence grandfathering and requires rebinding before candidate evaluation', () => {
    const report = buildI136ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredPolicyAdoptionContract(i135());
    const adoption = report.adoptionRecord!;

    expect(adoption.priorEvidenceGrandfatheredAtAdoption).toBe(false);
    expect(adoption.priorEvidenceRequiresRebindingBeforeCandidateEvaluation).toBe(true);
    expect(report.priorEvidenceGrandfatheredAtAdoption).toBe(false);
    expect(report.priorEvidenceRebindingRequiredBeforeCandidateEvaluation).toBe(true);
    expect(report.currentWuHuaiyunCoverageGrandfathered).toBe(false);
    expect(report.priorCandidateCoverageGrandfathered).toBe(false);
  });

  test('keeps execution and candidate-set evaluation behind separate authorization boundaries', () => {
    const report = buildI136ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredPolicyAdoptionContract(i135());
    const adoption = report.adoptionRecord!;

    expect(adoption.policyExecutionRequiresSeparateAuthorization).toBe(true);
    expect(adoption.candidateSetEvaluationRequiresSeparateAuthorization).toBe(true);
    expect(report.policyExecutionAuthorizedByThisGate).toBe(false);
    expect(report.policyExecutableByThisGate).toBe(false);
    expect(report.candidateSetEvaluationAuthorizedByThisGate).toBe(false);
    expect(report.candidateSetEvaluationPerformedByThisGate).toBe(false);
  });

  test('does not authorize composition, semantic bridges, contradiction resolution, admissibility, or threshold authority', () => {
    const report = buildI136ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredPolicyAdoptionContract(i135());
    const adoption = report.adoptionRecord!;

    expect(adoption.adoptionDoesNotAuthorizeSemanticBridges).toBe(true);
    expect(adoption.adoptionDoesNotResolveContradictions).toBe(true);
    expect(adoption.adoptionDoesNotEstablishCandidateSetAdmissibility).toBe(true);
    expect(adoption.adoptionDoesNotEqualThresholdAuthority).toBe(true);
    expect(report.actualCompositionPerformedByThisGate).toBe(false);
    expect(report.crossCandidateCompositionAuthorized).toBe(false);
    expect(report.multiSourceCompositionAuthorized).toBe(false);
    expect(report.semanticEquivalenceAuthorizedByAdoption).toBe(false);
    expect(report.contradictionResolvedByAdoption).toBe(false);
    expect(report.candidateSetAdmissibilityEstablishedByAdoption).toBe(false);
    expect(report.authorityAcquiredByThisGate).toBe(false);
    expect(report.visibleStemBinaryEffectiveInteractionEligibilityResolved).toBe(false);
    expect(report.thresholdRuleCreatedByThisGate).toBe(false);
  });

  test('keeps production and hidden-stem authority fail-closed after policy adoption', () => {
    const report = buildI136ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredPolicyAdoptionContract(i135());

    expect(report.damageEvaluationAuthorized).toBe(false);
    expect(report.i98KeDamageVocabularyEvaluationResolved).toBe(false);
    expect(report.i98ResearchMethodologyMaterializationAuthorized).toBe(false);
    expect(report.hiddenStemInteractionEligibilityGapRemains).toBe(true);
    expect(report.hiddenStemAuthorityGap).toBe(
      'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED',
    );
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
  });

  test('preserves the single-candidate default until candidate-set evaluation authorization and routes to I137 readiness', () => {
    const report = buildI136ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredPolicyAdoptionContract(i135());

    expect(report.adoptedPolicyCandidateSetEvaluationReadinessNotYetReviewed).toBe(true);
    expect(report.singleCandidateFullSixContractRemainsNormativeDefaultUntilCandidateSetEvaluationAuthorization).toBe(true);
    expect(report.continuedSingleCandidateDiscoveryStillPermitted).toBe(true);
    expect(report.recommendedNextGate).toBe(
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_ADOPTED_POLICY_CANDIDATE_SET_EVALUATION_AUTHORIZATION_READINESS_REVIEW',
    );
  });

  test('fails closed when I135 adoption readiness is not exact', () => {
    const report = buildI136ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredPolicyAdoptionContract(
      i135({ registeredPolicyAdoptionReadinessEstablished: false }),
    );

    expect(report.status).toBe('I135_ADOPTION_READINESS_UNRESOLVED_OR_INVALID');
    expect(report.decision).toBe('REGISTERED_POLICY_ADOPTION_NOT_ESTABLISHED');
    expect(report.adoptionRecord).toBeNull();
    expect(report.adoptionRecordCreated).toBe(false);
    expect(report.policyAdoptionAuthorizedByThisGate).toBe(false);
    expect(report.policyAdoptedByThisGate).toBe(false);
    expect(report.policyAdoptionPerformedByThisGate).toBe(false);
    expect(report.recommendedNextGate).toBe(
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_REGISTERED_POLICY_ADOPTION_READINESS_REVIEW',
    );
  });
});
