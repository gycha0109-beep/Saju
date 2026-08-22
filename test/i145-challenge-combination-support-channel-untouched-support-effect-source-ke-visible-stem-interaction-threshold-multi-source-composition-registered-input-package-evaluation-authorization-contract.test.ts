import { describe, expect, test } from 'vitest';
import {
  I144_BINDING_EVALUATION_STEP_IDS,
  buildI145ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredInputPackageEvaluationAuthorizationContract,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredInputPackageEvaluationAuthorizationReadinessReviewReport,
} from '../src/index.js';

function i144(
  overrides: Record<string, unknown> = {},
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredInputPackageEvaluationAuthorizationReadinessReviewReport {
  const base = {
    reviewId: 'i144_i145_fixture',
    reviewVersion:
      'myeonghwa-challenge-combination-support-channel-untouched-support-effect-source-ke-visible-stem-interaction-threshold-multi-source-composition-registered-input-package-evaluation-authorization-readiness-review-v1',
    status:
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_REGISTERED_INPUT_PACKAGE_EVALUATION_AUTHORIZATION_READINESS_REVIEW',
    decision:
      'REGISTERED_INPUT_PACKAGE_STRUCTURALLY_READY_FOR_SEPARATE_FAIL_CLOSED_EVALUATION_AUTHORIZATION_CONTRACT_NO_EVALUATION_AUTHORIZED',
    upstreamI143RecordId: 'i143_fixture',
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    adoptionId: 'visible_stem_ke_composition_policy_adoption_fixture',
    candidateSetVersion: 'v1-candidate-set',
    candidateSetId: 'visible_stem_ke_composition_candidate_set_fixture',
    inputPackageVersion: 'v1-input-package',
    inputPackageId: 'visible_stem_ke_composition_input_package_fixture',
    exactI143RegisteredPackageAccepted: true,
    registeredPackageStateObserved: 'REGISTERED_NOT_EVALUATED',
    packageIdentityStableAndDeterministic: true,
    candidateManifestIntegrityVerifiedForReadiness: true,
    evidenceBindingIntegrityVerifiedForReadiness: true,
    allSixRequirementOwnershipRowsPresentForReadiness: true,
    allEightArtifactClassesPresentForReadiness: true,
    unresolvedScopeInputsPresent: true,
    unresolvedProvenanceInputsPresent: true,
    unresolvedSemanticBridgeInputsPresent: true,
    unresolvedContradictionInputsPresent: true,
    unresolvedInputsAreEvaluationInputsNotPreauthorizationFailures: true,
    unresolvedInputsCannotBeConvertedToPositiveFindingsByReadinessReview: true,
    bindingEvaluationStepIds: I144_BINDING_EVALUATION_STEP_IDS,
    bindingEvaluationStepCount: 9,
    allEvaluationStepsMandatoryAndFailClosed: true,
    evaluationMustConsumeExactRegisteredPackageId: true,
    evaluationMustConsumeExactFrozenCandidateSetId: true,
    postRegistrationPackageMutationRequiresNewPackageVersion: true,
    evaluationAuthorizationReadinessEstablished: true,
    separateEvaluationAuthorizationContractMayProceed: true,
    readinessDoesNotEqualEvaluationAuthorization: true,
    readinessDoesNotEqualAdjudication: true,
    readinessDoesNotEqualCandidateSetAdmissibility: true,
    readinessDoesNotEqualCompositionAuthorization: true,
    readinessDoesNotEqualThresholdAuthority: true,
    inputPackageRegisteredByThisGate: false,
    inputPackageMutatedByThisGate: false,
    requirementCoverageAdjudicatedByThisGate: false,
    scopeCompatibilityAdjudicatedByThisGate: false,
    provenanceIndependenceAdjudicatedByThisGate: false,
    semanticBridgeAdjudicatedByThisGate: false,
    contradictionAdjudicatedByThisGate: false,
    candidateSetEvaluationAuthorizedByThisGate: false,
    candidateSetEvaluationPerformedByThisGate: false,
    candidateSetAdmissibilityEstablishedByThisGate: false,
    actualCompositionPerformedByThisGate: false,
    crossCandidateCompositionAuthorized: false,
    multiSourceCompositionAuthorized: false,
    policyExecutableByThisGate: false,
    authorityAcquiredByThisGate: false,
    visibleStemBinaryEffectiveInteractionEligibilityResolved: false,
    thresholdRuleCreatedByThisGate: false,
    damageEvaluationAuthorized: false,
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    hiddenStemInteractionEligibilityGapRemains: true,
    hiddenStemAuthorityGap:
      'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED',
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_REGISTERED_INPUT_PACKAGE_EVALUATION_AUTHORIZATION_CONTRACT',
    notes: [],
  };
  return { ...base, ...overrides } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredInputPackageEvaluationAuthorizationReadinessReviewReport;
}

describe('I145 registered input package evaluation authorization contract', () => {
  test('authorizes exactly one governed fail-closed research evaluation without executing it', () => {
    const report = buildI145ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredInputPackageEvaluationAuthorizationContract(i144());
    expect(report.status).toBe(
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_REGISTERED_INPUT_PACKAGE_EVALUATION_AUTHORIZATION_CONTRACT',
    );
    expect(report.decision).toBe(
      'EXACT_REGISTERED_INPUT_PACKAGE_AUTHORIZED_FOR_ONE_GOVERNED_FAIL_CLOSED_RESEARCH_EVALUATION_NOT_EXECUTED',
    );
    expect(report.authorizationState).toBe('AUTHORIZED_NOT_EXECUTED');
    expect(report.authorizedEvaluationCount).toBe(1);
    expect(report.researchEvaluationExecutionAuthorized).toBe(true);
    expect(report.candidateSetEvaluationAuthorizedByThisGate).toBe(true);
    expect(report.candidateSetEvaluationPerformedByThisGate).toBe(false);
    expect(report.evaluationResultCreatedByThisGate).toBe(false);
  });

  test('binds authorization to the exact policy, adoption, candidate set, package, and nine-step algorithm', () => {
    const report = buildI145ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredInputPackageEvaluationAuthorizationContract(i144());
    expect(report.policyVersion).toBe('v1-definition');
    expect(report.adoptionId).toBe('visible_stem_ke_composition_policy_adoption_fixture');
    expect(report.candidateSetId).toBe('visible_stem_ke_composition_candidate_set_fixture');
    expect(report.inputPackageId).toBe('visible_stem_ke_composition_input_package_fixture');
    expect(report.authorizationBoundToExactPolicyVersion).toBe(true);
    expect(report.authorizationBoundToExactAdoptionId).toBe(true);
    expect(report.authorizationBoundToExactCandidateSetId).toBe(true);
    expect(report.authorizationBoundToExactInputPackageId).toBe(true);
    expect(report.authorizationBoundToNineStepFailClosedAlgorithm).toBe(true);
  });

  test('freezes mutation and unresolved-input handling rules for the later evaluator', () => {
    const report = buildI145ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredInputPackageEvaluationAuthorizationContract(i144());
    expect(report.packageMutationBeforeEvaluationInvalidatesAuthorization).toBe(true);
    expect(report.candidateSetMutationBeforeEvaluationInvalidatesAuthorization).toBe(true);
    expect(report.policyVersionChangeBeforeEvaluationInvalidatesAuthorization).toBe(true);
    expect(report.evaluationMustPreserveUnresolvedInputsAsUnresolved).toBe(true);
    expect(report.evaluationMayNotInferMissingSemanticBridges).toBe(true);
    expect(report.evaluationMayNotResolveContradictionsByVoteOrWeight).toBe(true);
    expect(report.evaluationMustFailClosedAtFirstUnsatisfiedMandatoryStep).toBe(true);
    expect(report.laterStepsAfterFirstFailureMustNotBePromotedToPass).toBe(true);
  });

  test('does not adjudicate inputs or establish admissibility, composition, or threshold authority', () => {
    const report = buildI145ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredInputPackageEvaluationAuthorizationContract(i144());
    expect(report.unresolvedInputAdjudicationPerformedByThisGate).toBe(false);
    expect(report.inputPackageMutatedByThisGate).toBe(false);
    expect(report.candidateSetAdmissibilityEstablishedByThisGate).toBe(false);
    expect(report.actualCompositionPerformedByThisGate).toBe(false);
    expect(report.crossCandidateCompositionAuthorized).toBe(false);
    expect(report.multiSourceCompositionAuthorized).toBe(false);
    expect(report.authorityAcquiredByThisGate).toBe(false);
    expect(report.visibleStemBinaryEffectiveInteractionEligibilityResolved).toBe(false);
    expect(report.thresholdRuleCreatedByThisGate).toBe(false);
  });

  test('keeps all production, damage, classification, numeric, and hidden-stem authority closed', () => {
    const report = buildI145ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredInputPackageEvaluationAuthorizationContract(i144());
    expect(report.productionPolicyExecutionAuthorized).toBe(false);
    expect(report.productionPolicyExecutableByThisGate).toBe(false);
    expect(report.damageEvaluationAuthorized).toBe(false);
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
    expect(report.hiddenStemInteractionEligibilityGapRemains).toBe(true);
    expect(report.hiddenStemAuthorityGap).toBe(
      'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED',
    );
  });

  test('is deterministic for identical readiness input and routes only to the fail-closed evaluation record', () => {
    const first = buildI145ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredInputPackageEvaluationAuthorizationContract(i144());
    const second = buildI145ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredInputPackageEvaluationAuthorizationContract(i144());
    expect(first.authorizationId).toBe(second.authorizationId);
    expect(first.recommendedNextGate).toBe(
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_AUTHORIZED_REGISTERED_INPUT_PACKAGE_FAIL_CLOSED_CANDIDATE_SET_EVALUATION_RECORD',
    );
  });

  test('fails closed when exact I144 readiness identity or readiness state is invalid', () => {
    const report = buildI145ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredInputPackageEvaluationAuthorizationContract(
      i144({ inputPackageId: null }),
    );
    expect(report.status).toBe('I144_EVALUATION_AUTHORIZATION_READINESS_UNRESOLVED_OR_INVALID');
    expect(report.decision).toBe('REGISTERED_INPUT_PACKAGE_EVALUATION_NOT_AUTHORIZED');
    expect(report.authorizationState).toBe('NOT_AUTHORIZED');
    expect(report.authorizedEvaluationCount).toBe(0);
    expect(report.adoptionId).toBeNull();
    expect(report.candidateSetId).toBeNull();
    expect(report.inputPackageId).toBeNull();
    expect(report.researchEvaluationExecutionAuthorized).toBe(false);
    expect(report.candidateSetEvaluationAuthorizedByThisGate).toBe(false);
  });

  test('fails closed when the exact nine-step evaluation IDs or order are mutated even if step count remains nine', () => {
    const mutatedStepIds = [
      'BROKEN_POLICY_REGISTRATION_CHECK',
      ...I144_BINDING_EVALUATION_STEP_IDS.slice(1),
    ];
    const report = buildI145ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredInputPackageEvaluationAuthorizationContract(
      i144({ bindingEvaluationStepIds: mutatedStepIds, bindingEvaluationStepCount: 9 }),
    );
    expect(report.status).toBe('I144_EVALUATION_AUTHORIZATION_READINESS_UNRESOLVED_OR_INVALID');
    expect(report.authorizationState).toBe('NOT_AUTHORIZED');
    expect(report.authorizationBoundToNineStepFailClosedAlgorithm).toBe(false);
    expect(report.researchEvaluationExecutionAuthorized).toBe(false);
    expect(report.candidateSetEvaluationAuthorizedByThisGate).toBe(false);
    expect(report.recommendedNextGate).toBe(
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_REGISTERED_INPUT_PACKAGE_EVALUATION_AUTHORIZATION_READINESS_REVIEW',
    );
  });
});
