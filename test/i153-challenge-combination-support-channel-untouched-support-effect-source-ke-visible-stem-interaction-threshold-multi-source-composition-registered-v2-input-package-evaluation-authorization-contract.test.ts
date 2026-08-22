import { describe, expect, test } from 'vitest';
import {
  I144_BINDING_EVALUATION_STEP_IDS,
  buildI153ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredV2InputPackageEvaluationAuthorizationContract,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredV2InputPackageEvaluationAuthorizationReadinessReviewReport,
} from '../src/index.js';

function validI152(
  overrides: Record<string, unknown> = {},
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredV2InputPackageEvaluationAuthorizationReadinessReviewReport {
  const base = {
    reviewId: 'i152_i153_fixture',
    reviewVersion: 'v1',
    status:
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_REGISTERED_V2_INPUT_PACKAGE_EVALUATION_AUTHORIZATION_READINESS_REVIEW',
    decision:
      'REGISTERED_V2_INPUT_PACKAGE_STRUCTURALLY_READY_FOR_NEW_SINGLE_USE_FAIL_CLOSED_EVALUATION_AUTHORIZATION_CONTRACT_NO_EVALUATION_AUTHORIZED',
    upstreamI151RecordId: 'i151_fixture',
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    adoptionId: 'adoption_fixture',
    candidateSetVersion: 'v1-candidate-set',
    candidateSetId: 'candidate_set_fixture',
    sourceInputPackageVersion: 'v1-input-package',
    sourceInputPackageId: 'input_package_v1_fixture',
    inputPackageVersion: 'v2-input-package',
    inputPackageId: 'input_package_v2_fixture',
    registeredPackageStateObserved: 'REGISTERED_NOT_EVALUATED',
    exactI151RegisteredV2PackageAccepted: true,
    packageIdentityStableDeterministicAndDistinctFromV1: true,
    exactTenMaterializedComponentsPresent: true,
    frozenCandidateSetIntegrityVerifiedForReadiness: true,
    originalEvidenceAuditBindingsPresentForReadiness: true,
    originalRequirementOwnershipRowsRemainNonSatisfactionBindings: true,
    scopeAdjudicationArtifactRegisteredForReadiness: true,
    scopeAdjudicationResultCount: 6,
    scopeCompatibleOnlyCount: 5,
    scopeRejectedCount: 1,
    scopeCompatibilityResolvedInRegisteredPackage: true,
    scopeRejectedEvidenceRetainedButCoverageIneligible: true,
    unresolvedProvenanceInputCount: 6,
    unresolvedSemanticBridgeInputCount: 3,
    unresolvedContradictionInputCount: 2,
    remainingUnresolvedInputsAreMandatoryEvaluationInputs: true,
    unresolvedInputsCannotBeConvertedToPositiveFindingsByReadinessReview: true,
    bindingEvaluationStepIds: I144_BINDING_EVALUATION_STEP_IDS,
    bindingEvaluationStepCount: 9,
    registeredScopeOutcomeMustBeConsumedAtScopeCompatibilityStep: true,
    scopeCompatibilityMustNotBeReadjudicatedByAuthorizationContract: true,
    provenanceIndependenceMustRemainFailClosedUntilEvaluation: true,
    semanticBridgeMustRemainFailClosedUntilEvaluation: true,
    contradictionMustRemainFailClosedUntilEvaluation: true,
    allEvaluationStepsMandatoryAndFailClosed: true,
    evaluationMustConsumeExactRegisteredV2PackageId: true,
    evaluationMustConsumeExactFrozenCandidateSetId: true,
    priorI145AuthorizationConsumedAndNonReusable: true,
    newSingleUseEvaluationAuthorizationRequired: true,
    postRegistrationPackageMutationRequiresNewPackageVersion: true,
    evaluationAuthorizationReadinessEstablished: true,
    separateNewEvaluationAuthorizationContractMayProceed: true,
    readinessDoesNotEqualEvaluationAuthorization: true,
    readinessDoesNotEqualAdjudication: true,
    readinessDoesNotEqualCandidateSetAdmissibility: true,
    readinessDoesNotEqualCompositionAuthorization: true,
    readinessDoesNotEqualThresholdAuthority: true,
    inputPackageRegisteredByThisGate: false,
    inputPackageMutatedByThisGate: false,
    requirementCoverageRecomputedByThisGate: false,
    requirementSatisfactionAdjudicatedByThisGate: false,
    scopeCompatibilityAdjudicatedByThisGate: false,
    provenanceIndependenceAdjudicatedByThisGate: false,
    semanticBridgeAdjudicatedByThisGate: false,
    contradictionAdjudicatedByThisGate: false,
    candidateSetEvaluationAuthorizedByThisGate: false,
    candidateSetEvaluationPerformedByThisGate: false,
    candidateSetAdmissibilityEstablishedByThisGate: false,
    productionPolicyExecutionAuthorized: false,
    actualCompositionPerformedByThisGate: false,
    multiSourceCompositionAuthorized: false,
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
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_REGISTERED_V2_INPUT_PACKAGE_EVALUATION_AUTHORIZATION_CONTRACT',
    notes: [],
  };

  return { ...base, ...overrides } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredV2InputPackageEvaluationAuthorizationReadinessReviewReport;
}

describe('I153 registered v2 input package evaluation authorization contract', () => {
  test('authorizes exactly one new single-use governed research evaluation of the exact v2 package', () => {
    const report = buildI153ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredV2InputPackageEvaluationAuthorizationContract(validI152());

    expect(report.status).toBe(
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_REGISTERED_V2_INPUT_PACKAGE_EVALUATION_AUTHORIZATION_CONTRACT',
    );
    expect(report.decision).toBe(
      'EXACT_REGISTERED_V2_INPUT_PACKAGE_AUTHORIZED_FOR_ONE_NEW_SINGLE_USE_GOVERNED_FAIL_CLOSED_RESEARCH_EVALUATION_NOT_EXECUTED',
    );
    expect(report.authorizationState).toBe('AUTHORIZED_NOT_EXECUTED');
    expect(report.authorizedEvaluationCount).toBe(1);
    expect(report.researchEvaluationExecutionAuthorized).toBe(true);
    expect(report.candidateSetEvaluationAuthorizedByThisGate).toBe(true);
    expect(report.candidateSetEvaluationPerformedByThisGate).toBe(false);
  });

  test('binds authorization to exact policy adoption candidate set and v2 package identity', () => {
    const report = buildI153ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredV2InputPackageEvaluationAuthorizationContract(validI152());

    expect(report.inputPackageVersion).toBe('v2-input-package');
    expect(report.inputPackageId).toBe('input_package_v2_fixture');
    expect(report.sourceInputPackageId).toBe('input_package_v1_fixture');
    expect(report.authorizationBoundToExactPolicyVersion).toBe(true);
    expect(report.authorizationBoundToExactAdoptionId).toBe(true);
    expect(report.authorizationBoundToExactCandidateSetId).toBe(true);
    expect(report.authorizationBoundToExactV2InputPackageId).toBe(true);
    expect(report.authorizationBoundToExactNineStepFailClosedAlgorithm).toBe(true);
  });

  test('does not reuse the consumed I145 authorization', () => {
    const report = buildI153ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredV2InputPackageEvaluationAuthorizationContract(validI152());

    expect(report.priorI145AuthorizationReusable).toBe(false);
    expect(report.thisAuthorizationIsNewAndDistinctFromI145).toBe(true);
    expect(report.authorizationScope).toBe('EXACT_REGISTERED_V2_PACKAGE_SINGLE_RESEARCH_EVALUATION');
  });

  test('freezes consumption of registered scope outcome without scope readjudication or semantic promotion', () => {
    const report = buildI153ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredV2InputPackageEvaluationAuthorizationContract(validI152());

    expect(report.registeredScopeOutcomeMustBeConsumedAtScopeCompatibilityStep).toBe(true);
    expect(report.scopeCompatibilityMayNotBeReadjudicatedByThisAuthorization).toBe(true);
    expect(report.scopeCompatibilityDoesNotEqualRequirementSatisfaction).toBe(true);
    expect(report.scopeCompatibilityDoesNotEqualBinaryEligibility).toBe(true);
    expect(report.requirementSatisfactionAdjudicatedByThisGate).toBe(false);
  });

  test('preserves unresolved provenance bridges and contradictions and freezes first-failure semantics', () => {
    const report = buildI153ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredV2InputPackageEvaluationAuthorizationContract(validI152());

    expect(report.evaluationMustPreserveRemainingUnresolvedInputsAsUnresolved).toBe(true);
    expect(report.evaluationMayNotInferProvenanceIndependence).toBe(true);
    expect(report.evaluationMayNotInferMissingSemanticBridges).toBe(true);
    expect(report.evaluationMayNotResolveContradictionsByVoteOrWeight).toBe(true);
    expect(report.evaluationMustFailClosedAtFirstUnsatisfiedMandatoryStep).toBe(true);
    expect(report.laterStepsAfterFirstFailureMustNotBePromotedToPass).toBe(true);
    expect(report.unresolvedInputAdjudicationPerformedByThisGate).toBe(false);
  });

  test('invalidates authorization on package candidate-set or policy mutation before evaluation', () => {
    const report = buildI153ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredV2InputPackageEvaluationAuthorizationContract(validI152());

    expect(report.packageMutationBeforeEvaluationInvalidatesAuthorization).toBe(true);
    expect(report.candidateSetMutationBeforeEvaluationInvalidatesAuthorization).toBe(true);
    expect(report.policyVersionChangeBeforeEvaluationInvalidatesAuthorization).toBe(true);
    expect(report.inputPackageMutatedByThisGate).toBe(false);
  });

  test('keeps production composition threshold classification numeric and hidden-stem authority closed', () => {
    const report = buildI153ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredV2InputPackageEvaluationAuthorizationContract(validI152());

    expect(report.productionPolicyExecutionAuthorized).toBe(false);
    expect(report.productionPolicyExecutableByThisGate).toBe(false);
    expect(report.candidateSetAdmissibilityEstablishedByThisGate).toBe(false);
    expect(report.actualCompositionPerformedByThisGate).toBe(false);
    expect(report.multiSourceCompositionAuthorized).toBe(false);
    expect(report.authorityAcquiredByThisGate).toBe(false);
    expect(report.visibleStemBinaryEffectiveInteractionEligibilityResolved).toBe(false);
    expect(report.thresholdRuleCreatedByThisGate).toBe(false);
    expect(report.damageEvaluationAuthorized).toBe(false);
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
    expect(report.hiddenStemAuthorityGap).toBe(
      'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED',
    );
  });

  test('fails closed when the nine-step readiness sequence is mutated while count remains nine', () => {
    const readiness = validI152({
      bindingEvaluationStepIds: ['MUTATED_STEP', ...I144_BINDING_EVALUATION_STEP_IDS.slice(1)],
    });
    const report = buildI153ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredV2InputPackageEvaluationAuthorizationContract(readiness);

    expect(readiness.bindingEvaluationStepIds).toHaveLength(9);
    expect(report.status).toBe('I152_V2_EVALUATION_AUTHORIZATION_READINESS_INVALID');
    expect(report.decision).toBe('REGISTERED_V2_INPUT_PACKAGE_EVALUATION_NOT_AUTHORIZED');
    expect(report.exactI152ReadinessAccepted).toBe(false);
    expect(report.authorizationState).toBe('NOT_AUTHORIZED');
    expect(report.authorizedEvaluationCount).toBe(0);
    expect(report.researchEvaluationExecutionAuthorized).toBe(false);
    expect(report.candidateSetEvaluationAuthorizedByThisGate).toBe(false);
  });
});
