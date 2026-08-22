import { describe, expect, test } from 'vitest';
import {
  I135_REGISTERED_POLICY_ADOPTION_READINESS_REQUIREMENTS,
  buildI135ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredPolicyAdoptionReadinessReview,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionPolicyProspectiveRegistrationContractReport,
} from '../src/index.js';

function i134(
  overrides: Record<string, unknown> = {},
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionPolicyProspectiveRegistrationContractReport {
  const base = {
    contractId: 'i134_i135_fixture',
    status:
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_POLICY_PROSPECTIVE_REGISTRATION_CONTRACT',
    decision:
      'POLICY_V1_DEFINITION_PROSPECTIVELY_REGISTERED_NOT_ADOPTED_NOT_EXECUTABLE_NO_CANDIDATE_EVALUATION',
    registrationRecord: {
      registrationId: 'visible_stem_ke_composition_policy_registration_fixture',
      registrationVersion: 'v1-registration',
      policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
      policyVersion: 'v1-definition',
      policyDefinitionContractId: 'i132_fixture',
      registrationReadinessReviewId: 'i133_fixture',
      registrationState: 'REGISTERED_NOT_ADOPTED_NOT_EXECUTABLE',
      targetScope: 'VISIBLE_HEAVENLY_STEM_BINARY_EFFECTIVE_INTERACTION_ELIGIBILITY',
      registeredI118RequirementCount: 6,
      prospectiveBeforeCandidateEvaluation: true,
      preRegistrationCandidateSetEvaluationUnderThisPolicyOccurred: false,
      priorEvidenceGrandfatheredAtRegistration: false,
      priorEvidenceRequiresRebindingBeforeFutureEvaluation: true,
      candidateEvaluationRequiresSeparateAdoptionAndAuthorization: true,
      policyChangeRequiresNewVersionAndRegistration: true,
      registrationDoesNotAuthorizeSemanticBridges: true,
      registrationDoesNotResolveContradictions: true,
      registrationDoesNotEqualThresholdAuthority: true,
    },
    registrationRecordCreated: true,
    registrationIdentityBoundToI132Definition: true,
    registrationReadinessBoundToI133Review: true,
    prospectiveOrderingVerified: true,
    noPreRegistrationCandidateEvaluationUnderPolicy: true,
    priorEvidenceGrandfatheredAtRegistration: false,
    priorEvidenceRebindingRequiredBeforeFutureEvaluation: true,
    policyProspectivelyRegisteredByThisGate: true,
    policyRegistrationPerformedByThisGate: true,
    policyRegistrationContractResolved: true,
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
    registeredPolicyAdoptionReadinessNotYetReviewed: true,
    authorityAcquiredByThisGate: false,
    visibleStemBinaryEffectiveInteractionEligibilityResolved: false,
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_REGISTERED_POLICY_ADOPTION_READINESS_REVIEW',
  };

  return { ...base, ...overrides } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionPolicyProspectiveRegistrationContractReport;
}

describe('I135 registered multi-source composition policy adoption readiness review', () => {
  test('establishes deterministic readiness for a separate adoption contract from the exact I134 registration', () => {
    const first = buildI135ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredPolicyAdoptionReadinessReview(i134());
    const second = buildI135ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredPolicyAdoptionReadinessReview(i134());

    expect(first.status).toBe(
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_REGISTERED_POLICY_ADOPTION_READINESS_REVIEW',
    );
    expect(first.decision).toBe(
      'REGISTERED_POLICY_SATISFIES_ADOPTION_READINESS_PRECONDITIONS_SEPARATE_ADOPTION_CONTRACT_MAY_PROCEED_NO_ADOPTION_OR_EXECUTION',
    );
    expect(first.reviewId).toBe(second.reviewId);
    expect(first.registeredPolicyAdoptionReadinessEstablished).toBe(true);
    expect(first.separateAdoptionContractMayProceed).toBe(true);
  });

  test('freezes exactly eight mandatory registered-policy adoption-readiness requirements', () => {
    const report = buildI135ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredPolicyAdoptionReadinessReview(i134());

    expect(report.readinessRequirements).toEqual(I135_REGISTERED_POLICY_ADOPTION_READINESS_REQUIREMENTS);
    expect(report.readinessRequirements).toHaveLength(8);
    expect(report.readinessRequirementCount).toBe(8);
    expect(report.allReadinessRequirementsMandatory).toBe(true);
  });

  test('binds readiness to the immutable registered v1 policy identity', () => {
    const report = buildI135ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredPolicyAdoptionReadinessReview(i134());

    expect(report.policyId).toBe('myeonghwa-visible-stem-ke-multi-source-composition-policy');
    expect(report.policyVersion).toBe('v1-definition');
    expect(report.registrationVersion).toBe('v1-registration');
    expect(report.registrationId).toBe('visible_stem_ke_composition_policy_registration_fixture');
    expect(report.registrationStateObserved).toBe('REGISTERED_NOT_ADOPTED_NOT_EXECUTABLE');
    expect(report.exactI134RegistrationAccepted).toBe(true);
    expect(report.registrationIdentityImmutable).toBe(true);
    expect(report.adoptionMustBindExactRegistration).toBe(true);
    expect(report.adoptionMayNotMutateRegisteredDefinition).toBe(true);
  });

  test('verifies prospective ordering, no grandfathering, rebinding, and version change control', () => {
    const report = buildI135ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredPolicyAdoptionReadinessReview(i134());

    expect(report.prospectiveOrderingVerified).toBe(true);
    expect(report.noPreRegistrationCandidateEvaluationVerified).toBe(true);
    expect(report.noPriorEvidenceGrandfatheringVerified).toBe(true);
    expect(report.priorEvidenceRebindingRequirementVerified).toBe(true);
    expect(report.policyVersionChangeControlVerified).toBe(true);
    expect(report.adoptionMayNotGrandfatherPriorEvidence).toBe(true);
    expect(report.currentWuHuaiyunCoverageGrandfathered).toBe(false);
    expect(report.priorCandidateCoverageGrandfathered).toBe(false);
  });

  test('separates policy adoption from execution, candidate evaluation, and threshold authority', () => {
    const report = buildI135ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredPolicyAdoptionReadinessReview(i134());

    expect(report.adoptionSeparatedFromExecution).toBe(true);
    expect(report.adoptionSeparatedFromCandidateEvaluationAuthorization).toBe(true);
    expect(report.adoptionSeparatedFromThresholdAuthority).toBe(true);
    expect(report.adoptionMayNotEvaluateCandidatesByItself).toBe(true);
    expect(report.adoptionMayNotAuthorizeThresholdByItself).toBe(true);
    expect(report.policyAdoptionAuthorizedByThisGate).toBe(false);
    expect(report.policyAdoptedByThisGate).toBe(false);
    expect(report.policyExecutableByThisGate).toBe(false);
    expect(report.candidateSetEvaluationAuthorizedByThisGate).toBe(false);
  });

  test('keeps composition, admissibility, production authority, and hidden-stem authority closed', () => {
    const report = buildI135ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredPolicyAdoptionReadinessReview(i134());

    expect(report.candidateSetEvaluationPerformedByThisGate).toBe(false);
    expect(report.actualCompositionPerformedByThisGate).toBe(false);
    expect(report.crossCandidateCompositionAuthorized).toBe(false);
    expect(report.multiSourceCompositionAuthorized).toBe(false);
    expect(report.semanticEquivalenceAuthorizedByThisGate).toBe(false);
    expect(report.contradictionResolutionAuthorizedByThisGate).toBe(false);
    expect(report.candidateSetAdmissibilityEstablishedByThisGate).toBe(false);
    expect(report.authorityAcquiredByThisGate).toBe(false);
    expect(report.visibleStemBinaryEffectiveInteractionEligibilityResolved).toBe(false);
    expect(report.thresholdRuleCreatedByThisGate).toBe(false);
    expect(report.hiddenStemInteractionEligibilityGapRemains).toBe(true);
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
  });

  test('preserves the single-candidate full-six default and routes only to a separate adoption contract', () => {
    const report = buildI135ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredPolicyAdoptionReadinessReview(i134());

    expect(report.singleCandidateFullSixContractRemainsNormativeDefault).toBe(true);
    expect(report.continuedSingleCandidateDiscoveryStillPermitted).toBe(true);
    expect(report.recommendedNextGate).toBe(
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_REGISTERED_POLICY_ADOPTION_CONTRACT',
    );
  });

  test('fails closed when the I134 registration boundary is no longer exact', () => {
    const mutated = i134({
      policyAdoptedByThisGate: true,
      registeredPolicyAdoptionReadinessNotYetReviewed: false,
    });
    const report = buildI135ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredPolicyAdoptionReadinessReview(mutated);

    expect(report.status).toBe('I134_REGISTRATION_UNRESOLVED_OR_INVALID');
    expect(report.decision).toBe('REGISTERED_POLICY_ADOPTION_READINESS_NOT_ESTABLISHED');
    expect(report.registrationId).toBeNull();
    expect(report.registrationStateObserved).toBe('UNRESOLVED');
    expect(report.registeredPolicyAdoptionReadinessEstablished).toBe(false);
    expect(report.separateAdoptionContractMayProceed).toBe(false);
    expect(report.policyAdoptedByThisGate).toBe(false);
    expect(report.recommendedNextGate).toBe(
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_POLICY_PROSPECTIVE_REGISTRATION_CONTRACT',
    );
  });
});
