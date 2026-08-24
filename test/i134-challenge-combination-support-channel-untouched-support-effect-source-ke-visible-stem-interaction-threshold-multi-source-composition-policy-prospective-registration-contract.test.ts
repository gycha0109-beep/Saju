import { describe, expect, test } from 'vitest';
import {
  buildI134ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionPolicyProspectiveRegistrationContract,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionPolicyDefinitionAdequacyRegistrationReadinessReviewReport,
} from '../src/index.js';

function i133(
  overrides: Record<string, unknown> = {},
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionPolicyDefinitionAdequacyRegistrationReadinessReviewReport {
  const base = {
    reviewId: 'i133_i134_fixture',
    reviewVersion: 'fixture',
    status:
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_POLICY_DEFINITION_ADEQUACY_REGISTRATION_READINESS_REVIEW',
    decision:
      'I132_POLICY_DEFINITION_STRUCTURALLY_ADEQUATE_FOR_PROSPECTIVE_REGISTRATION_CONTRACT_NO_POLICY_REGISTERED_OR_ADOPTED',
    upstreamI132ContractId: 'i132_fixture',
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    policyStateObserved: 'DEFINED_NOT_REGISTERED_NOT_ADOPTED',
    i132DefinitionContractAccepted: true,
    allEightI131ArtifactsStructurallyDefined: true,
    sixI118RequirementsExplicitlyBoundInDefinition: true,
    evidenceBindingProcedureAdequate: true,
    semanticBridgeProcedureAdequate: true,
    contradictionProcedureAdequate: true,
    scopeCompatibilityProcedureAdequate: true,
    provenanceIndependenceProcedureAdequate: true,
    failClosedEvaluationAlgorithmAdequate: true,
    prospectiveRegistrationChangeControlAdequate: true,
    nineStepEvaluationOrderVerified: true,
    candidateSetAdmissibilitySeparatedFromThresholdAuthority: true,
    definitionAdequateForProspectiveRegistration: true,
    prospectiveRegistrationReadinessEstablished: true,
    prospectiveRegistrationContractMayProceed: true,
    policyDefinitionMutationRequiredBeforeRegistration: false,
    candidateEvidenceRequiredBeforePolicyRegistration: false,
    registrationReadinessDoesNotEqualPolicyAdoptionReadiness: true,
    registrationReadinessDoesNotAuthorizeCandidateEvaluation: true,
    registrationReadinessDoesNotAuthorizeComposition: true,
    policyRegistrationAuthorizedByThisGate: false,
    policyRegistrationPerformedByThisGate: false,
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
    singleCandidateFullSixContractRemainsNormativeDefault: true,
    continuedSingleCandidateDiscoveryStillPermitted: true,
    authorityAcquiredByThisGate: false,
    visibleStemBinaryEffectiveInteractionEligibilityResolved: false,
    effectiveInteractionSetResolved: false,
    thresholdRuleCreatedByThisGate: false,
    damageEvaluationAuthorized: false,
    i98KeDamageVocabularyEvaluationResolved: false,
    i98ResearchMethodologyMaterializationAuthorized: false,
    hiddenStemInteractionEligibilityGapRemains: true,
    hiddenStemAuthorityGap:
      'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED',
    methodologyDefinitionCreatedByThisGate: false,
    ruleDefinitionCreatedByThisGate: false,
    registrySnapshotMutatedByThisGate: false,
    reviewAttestationCreatedByThisGate: false,
    noTrackedRelationTouchSemanticsRemainUnchanged: true,
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_POLICY_PROSPECTIVE_REGISTRATION_CONTRACT',
    notes: [],
  };

  return { ...base, ...overrides } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionPolicyDefinitionAdequacyRegistrationReadinessReviewReport;
}

describe('I134 source 克 visible-stem composition policy prospective registration contract', () => {
  test('creates a deterministic prospective registration record for the exact v1 definition', () => {
    const first = buildI134ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionPolicyProspectiveRegistrationContract(i133());
    const second = buildI134ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionPolicyProspectiveRegistrationContract(i133());

    expect(first.status).toBe(
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_POLICY_PROSPECTIVE_REGISTRATION_CONTRACT',
    );
    expect(first.decision).toBe(
      'POLICY_V1_DEFINITION_PROSPECTIVELY_REGISTERED_NOT_ADOPTED_NOT_EXECUTABLE_NO_CANDIDATE_EVALUATION',
    );
    expect(first.contractId).toBe(second.contractId);
    expect(first.registrationRecord?.registrationId).toBe(second.registrationRecord?.registrationId);
    expect(first.registrationRecordCreated).toBe(true);
    expect(first.policyProspectivelyRegisteredByThisGate).toBe(true);
    expect(first.policyRegistrationPerformedByThisGate).toBe(true);
    expect(first.policyRegistrationContractResolved).toBe(true);
  });

  test('binds registration to the exact policy identity, I132 definition contract, and I133 readiness review', () => {
    const report = buildI134ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionPolicyProspectiveRegistrationContract(i133());
    const registration = report.registrationRecord!;

    expect(registration.policyId).toBe('myeonghwa-visible-stem-ke-multi-source-composition-policy');
    expect(registration.policyVersion).toBe('v1-definition');
    expect(registration.registrationVersion).toBe('v1-registration');
    expect(registration.policyDefinitionContractId).toBe('i132_fixture');
    expect(registration.registrationReadinessReviewId).toBe('i133_i134_fixture');
    expect(registration.registrationState).toBe('REGISTERED_NOT_ADOPTED_NOT_EXECUTABLE');
    expect(registration.targetScope).toBe('VISIBLE_HEAVENLY_STEM_BINARY_EFFECTIVE_INTERACTION_ELIGIBILITY');
    expect(registration.registeredI118RequirementCount).toBe(6);
    expect(report.registrationIdentityBoundToI132Definition).toBe(true);
    expect(report.registrationReadinessBoundToI133Review).toBe(true);
  });

  test('verifies policy registration precedes candidate evaluation and records no pre-registration evaluation', () => {
    const report = buildI134ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionPolicyProspectiveRegistrationContract(i133());
    const registration = report.registrationRecord!;

    expect(registration.prospectiveBeforeCandidateEvaluation).toBe(true);
    expect(registration.preRegistrationCandidateSetEvaluationUnderThisPolicyOccurred).toBe(false);
    expect(report.prospectiveOrderingVerified).toBe(true);
    expect(report.noPreRegistrationCandidateEvaluationUnderPolicy).toBe(true);
  });

  test('forbids grandfathering and requires evidence rebinding before any future policy evaluation', () => {
    const report = buildI134ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionPolicyProspectiveRegistrationContract(i133());
    const registration = report.registrationRecord!;

    expect(registration.priorEvidenceGrandfatheredAtRegistration).toBe(false);
    expect(registration.priorEvidenceRequiresRebindingBeforeFutureEvaluation).toBe(true);
    expect(registration.policyChangeRequiresNewVersionAndRegistration).toBe(true);
    expect(report.priorEvidenceGrandfatheredAtRegistration).toBe(false);
    expect(report.priorEvidenceRebindingRequiredBeforeFutureEvaluation).toBe(true);
    expect(report.currentWuHuaiyunCoverageGrandfathered).toBe(false);
    expect(report.priorCandidateCoverageGrandfathered).toBe(false);
  });

  test('registration does not authorize semantic bridges, resolve contradictions, or establish admissibility', () => {
    const report = buildI134ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionPolicyProspectiveRegistrationContract(i133());
    const registration = report.registrationRecord!;

    expect(registration.registrationDoesNotAuthorizeSemanticBridges).toBe(true);
    expect(registration.registrationDoesNotResolveContradictions).toBe(true);
    expect(registration.registrationDoesNotEqualThresholdAuthority).toBe(true);
    expect(report.semanticEquivalenceAuthorizedByRegistration).toBe(false);
    expect(report.contradictionResolvedByRegistration).toBe(false);
    expect(report.candidateSetAdmissibilityEstablishedByRegistration).toBe(false);
  });

  test('keeps adoption, execution, candidate evaluation, composition, and threshold authority closed', () => {
    const report = buildI134ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionPolicyProspectiveRegistrationContract(i133());

    expect(report.policyAdoptionAuthorizedByThisGate).toBe(false);
    expect(report.policyAdoptedByThisGate).toBe(false);
    expect(report.policyExecutableByThisGate).toBe(false);
    expect(report.candidateSetEvaluationAuthorizedByThisGate).toBe(false);
    expect(report.candidateSetEvaluationPerformedByThisGate).toBe(false);
    expect(report.actualCompositionPerformedByThisGate).toBe(false);
    expect(report.crossCandidateCompositionAuthorized).toBe(false);
    expect(report.multiSourceCompositionAuthorized).toBe(false);
    expect(report.registeredPolicyAdoptionReadinessNotYetReviewed).toBe(true);
    expect(report.authorityAcquiredByThisGate).toBe(false);
    expect(report.visibleStemBinaryEffectiveInteractionEligibilityResolved).toBe(false);
    expect(report.effectiveInteractionSetResolved).toBe(false);
    expect(report.thresholdRuleCreatedByThisGate).toBe(false);
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
  });

  test('preserves the single-candidate full-six path and routes only to registered-policy adoption readiness', () => {
    const report = buildI134ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionPolicyProspectiveRegistrationContract(i133());

    expect(report.singleCandidateFullSixContractRemainsNormativeDefault).toBe(true);
    expect(report.continuedSingleCandidateDiscoveryStillPermitted).toBe(true);
    expect(report.recommendedNextGate).toBe(
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_REGISTERED_POLICY_ADOPTION_READINESS_REVIEW',
    );
  });

  test('fails closed if I133 no longer establishes prospective registration readiness', () => {
    const report = buildI134ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionPolicyProspectiveRegistrationContract(
      i133({ prospectiveRegistrationReadinessEstablished: false }),
    );

    expect(report.status).toBe('I133_UNRESOLVED_OR_INVALID');
    expect(report.decision).toBe('MULTI_SOURCE_COMPOSITION_POLICY_PROSPECTIVE_REGISTRATION_NOT_ESTABLISHED');
    expect(report.registrationRecord).toBeNull();
    expect(report.registrationRecordCreated).toBe(false);
    expect(report.policyProspectivelyRegisteredByThisGate).toBe(false);
    expect(report.policyRegistrationPerformedByThisGate).toBe(false);
    expect(report.policyRegistrationContractResolved).toBe(false);
    expect(report.policyAdoptedByThisGate).toBe(false);
    expect(report.candidateSetEvaluationAuthorizedByThisGate).toBe(false);
    expect(report.recommendedNextGate).toBe(
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_POLICY_DEFINITION_ADEQUACY_AND_REGISTRATION_READINESS_REVIEW',
    );
  });
});
