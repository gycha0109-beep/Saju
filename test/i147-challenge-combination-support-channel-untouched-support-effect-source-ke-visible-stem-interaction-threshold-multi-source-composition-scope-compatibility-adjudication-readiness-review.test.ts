import { describe, expect, test } from 'vitest';
import {
  I144_BINDING_EVALUATION_STEP_IDS,
  I147_SCOPE_COMPATIBILITY_PROCEDURE,
  buildI147ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeCompatibilityAdjudicationReadinessReview,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionAuthorizedRegisteredInputPackageFailClosedCandidateSetEvaluationRecordReport,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetEvidenceRebindingAdjudicationInputMaterializationRecordReport,
} from '../src/index.js';

const evidenceIds = ['e1', 'e2', 'e3', 'e4', 'e5', 'e6'] as const;

function i146(
  overrides: Record<string, unknown> = {},
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionAuthorizedRegisteredInputPackageFailClosedCandidateSetEvaluationRecordReport {
  const states = [
    'PASS',
    'PASS',
    'PASS',
    'FAIL_UNRESOLVED',
    'NOT_EVALUATED_AFTER_FAIL_CLOSED_STOP',
    'NOT_EVALUATED_AFTER_FAIL_CLOSED_STOP',
    'NOT_EVALUATED_AFTER_FAIL_CLOSED_STOP',
    'NOT_EVALUATED_AFTER_FAIL_CLOSED_STOP',
    'NOT_EVALUATED_AFTER_FAIL_CLOSED_STOP',
  ] as const;
  const base = {
    evaluationRecordId: 'i146_i147_fixture',
    evaluationRecordVersion: 'v1',
    status:
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_AUTHORIZED_REGISTERED_INPUT_PACKAGE_FAIL_CLOSED_CANDIDATE_SET_EVALUATION_RECORD',
    decision:
      'CANDIDATE_SET_EVALUATION_EXECUTED_FAIL_CLOSED_AT_SCOPE_COMPATIBILITY_UNRESOLVED_ADMISSIBILITY_NOT_ESTABLISHED',
    upstreamI145AuthorizationId: 'i145_fixture',
    upstreamI143RecordId: 'i143_i147_fixture',
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    adoptionId: 'adoption_fixture',
    candidateSetVersion: 'v1-candidate-set',
    candidateSetId: 'candidate_set_fixture',
    inputPackageVersion: 'v1-input-package',
    inputPackageId: 'input_package_fixture',
    exactI145AuthorizationAccepted: true,
    exactI143RegisteredPackageAccepted: true,
    authorizationAndPackageIdentityMatch: true,
    evaluationState: 'COMPLETED_FAIL_CLOSED',
    authorizationConsumedByThisEvaluationRecord: true,
    authorizationReusableAfterThisRecord: false,
    evaluationStepRecords: I144_BINDING_EVALUATION_STEP_IDS.map((stepId, index) => ({
      stepId,
      order: index + 1,
      mandatory: true,
      failClosed: true,
      state: states[index],
      reason: 'fixture',
    })),
    evaluationStepCount: 9,
    passedStepCount: 3,
    failedStepCount: 1,
    notEvaluatedStepCount: 5,
    firstUnsatisfiedStepId: 'SCOPE_COMPATIBILITY_CHECK',
    firstUnsatisfiedStepReason: 'REGISTERED_SCOPE_COMPATIBILITY_INPUTS_UNRESOLVED',
    scopeCompatibilityUnresolvedCountObserved: 6,
    provenanceIndependenceUnresolvedCountObserved: 6,
    semanticBridgeUnresolvedCountObserved: 3,
    contradictionUnresolvedCountObserved: 2,
    unresolvedInputsPreservedWithoutInference: true,
    noMissingSemanticBridgeInferencePerformed: true,
    noContradictionVoteOrWeightPerformed: true,
    laterStepsAfterFirstFailureNotPromotedToPass: true,
    candidateSetEvaluationAuthorizedUpstream: true,
    candidateSetEvaluationPerformedByThisGate: true,
    evaluationResultCreatedByThisGate: true,
    candidateSetAdmissibilityState: 'NOT_ESTABLISHED_FAIL_CLOSED',
    candidateSetAdmissibilityEstablishedByThisGate: false,
    scopeCompatibilityAdjudicatedByThisGate: false,
    provenanceIndependenceAdjudicatedByThisGate: false,
    semanticBridgeAdjudicatedByThisGate: false,
    contradictionAdjudicatedByThisGate: false,
    fullSixRequirementSatisfactionAdjudicatedByThisGate: false,
    inputPackageMutatedByThisGate: false,
    productionPolicyExecutionAuthorized: false,
    productionPolicyExecutableByThisGate: false,
    actualCompositionPerformedByThisGate: false,
    crossCandidateCompositionAuthorized: false,
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
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_SCOPE_COMPATIBILITY_ADJUDICATION_READINESS_REVIEW',
    notes: [],
  };
  return { ...base, ...overrides } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionAuthorizedRegisteredInputPackageFailClosedCandidateSetEvaluationRecordReport;
}

function i143(
  overrides: Record<string, unknown> = {},
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetEvidenceRebindingAdjudicationInputMaterializationRecordReport {
  const evidenceRebindingRecords = evidenceIds.map((evidenceId, index) => ({
    evidenceId,
    candidateId: `c${index + 1}`,
    sourceId: `s${index + 1}`,
    witnessId: `w${index + 1}`,
    locator: `locator-${index + 1}`,
    observation: 'fixture',
    i118RequirementIds: ['CONTEXT_AND_EXCEPTION_CONDITIONS'],
    bindingState: 'REGISTERED_INPUT_NOT_ADJUDICATED',
  }));
  const scopeCompatibilityInputs = evidenceIds.map((evidenceId, index) => ({
    evidenceId,
    targetScope: 'VISIBLE_HEAVENLY_STEM_KE_BINARY_EFFECTIVE_INTERACTION_ELIGIBILITY',
    positionClass: index === 5 ? 'GENERAL_VISIBLE_STEM_FORCE_CONTEXT' : 'VISIBLE_STEM_POSITION_CLASS',
    compatibilityState: 'UNRESOLVED',
    basis: 'fixture unresolved scope',
  }));
  const requirementOwnershipBindings = [{
    i118RequirementId: 'CONTEXT_AND_EXCEPTION_CONDITIONS',
    owningEvidenceIds: evidenceIds,
    ownershipBasis: 'fixture',
    satisfactionFindingMade: false,
  }];
  const base = {
    recordId: 'i143_i147_fixture',
    recordVersion: 'v1',
    status:
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_CANDIDATE_SET_EVIDENCE_REBINDING_ADJUDICATION_INPUT_MATERIALIZATION_RECORD',
    decision:
      'EIGHT_INPUT_ARTIFACT_CLASSES_MATERIALIZED_AND_PACKAGE_REGISTERED_WITH_UNRESOLVED_ADJUDICATION_STATES_NO_EVALUATION',
    upstreamI142ReviewId: 'i142_fixture',
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    adoptionId: 'adoption_fixture',
    selectionContractVersion: 'v1-selection',
    candidateSetVersion: 'v1-candidate-set',
    candidateSetId: 'candidate_set_fixture',
    inputPackageVersion: 'v1-input-package',
    inputPackageId: 'input_package_fixture',
    inputPackageState: 'REGISTERED_NOT_EVALUATED',
    exactI142ReadinessAccepted: true,
    candidateManifest: {
      candidateSetId: 'candidate_set_fixture',
      candidateSetVersion: 'v1-candidate-set',
      adoptionId: 'adoption_fixture',
      candidateIds: ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'],
      candidateCount: 6,
      frozen: true,
    },
    witnessIdentityBindings: [],
    witnessIdentityBindingCount: 0,
    evidenceRebindingRecords,
    evidenceRebindingRecordCount: 6,
    requirementOwnershipBindings,
    requirementOwnershipBindingCount: 1,
    scopeCompatibilityInputs,
    provenanceIndependenceInputs: [],
    semanticBridgeInputs: [],
    contradictionInputs: [],
    allEightArtifactClassesMaterialized: true,
    allSixI118RequirementsHaveExplicitOwnershipBindings: true,
    everyEvidenceRecordBindsFrozenCandidateSourceWitnessLocator: true,
    allWitnessBindingsStableAndReproducible: true,
    semanticBridgeUnresolvedCount: 3,
    contradictionUnresolvedCount: 2,
    scopeCompatibilityUnresolvedCount: 6,
    provenanceIndependenceUnresolvedCount: 6,
    unresolvedStatesPreservedWithoutInference: true,
    priorI126CoverageGrandfathered: false,
    priorI128DiscoveryGrandfathered: false,
    priorEvidenceEnteredOnlyThroughExplicitRebinding: true,
    implicitRequirementBorrowingPerformed: false,
    exampleToGeneralRulePromotionPerformed: false,
    numericWeightingOrMajorityVotePerformed: false,
    inputPackageRegisteredByThisGate: true,
    evidenceRebindingPerformedByThisGate: true,
    requirementOwnershipBindingsMaterializedByThisGate: true,
    witnessIdentityBindingsMaterializedByThisGate: true,
    scopeCompatibilityInputsMaterializedByThisGate: true,
    provenanceIndependenceInputsMaterializedByThisGate: true,
    semanticBridgeInputsMaterializedByThisGate: true,
    contradictionInputsMaterializedByThisGate: true,
    requirementCoverageAdjudicatedByThisGate: false,
    scopeCompatibilityAdjudicatedByThisGate: false,
    provenanceIndependenceAdjudicatedByThisGate: false,
    semanticBridgeAdjudicatedByThisGate: false,
    contradictionAdjudicatedByThisGate: false,
    policyExecutableByThisGate: false,
    candidateSetEvaluationAuthorizedByThisGate: false,
    candidateSetEvaluationPerformedByThisGate: false,
    candidateSetAdmissibilityEstablishedByThisGate: false,
    actualCompositionPerformedByThisGate: false,
    crossCandidateCompositionAuthorized: false,
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
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_REGISTERED_INPUT_PACKAGE_EVALUATION_AUTHORIZATION_READINESS_REVIEW',
    notes: [],
  };
  return { ...base, ...overrides } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetEvidenceRebindingAdjudicationInputMaterializationRecordReport;
}

describe('I147 scope compatibility adjudication readiness review', () => {
  test('establishes readiness for a separate scope adjudication artifact only', () => {
    const report = buildI147ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeCompatibilityAdjudicationReadinessReview(i146(), i143());
    expect(report.status).toBe(
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_SCOPE_COMPATIBILITY_ADJUDICATION_READINESS_REVIEW',
    );
    expect(report.decision).toBe(
      'SIX_REGISTERED_SCOPE_INPUTS_READY_FOR_SEPARATE_POLICY_GOVERNED_SCOPE_ADJUDICATION_NO_PACKAGE_MUTATION_NO_REEVALUATION',
    );
    expect(report.scopeAdjudicationReadinessEstablished).toBe(true);
    expect(report.separateScopeCompatibilityAdjudicationMayProceed).toBe(true);
    expect(report.scopeCompatibilityAdjudicatedByThisGate).toBe(false);
  });

  test('binds readiness to the exact I132 scope procedure', () => {
    const report = buildI147ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeCompatibilityAdjudicationReadinessReview(i146(), i143());
    expect(report.scopeProcedure).toEqual(I147_SCOPE_COMPATIBILITY_PROCEDURE);
    expect(report.scopeProcedure.requiredRelationKind).toBe('KE');
    expect(report.scopeProcedure.requiredSurface).toBe('VISIBLE_HEAVENLY_STEM');
    expect(report.scopeProcedure.genericStemForceSubstitutionAllowed).toBe(false);
    expect(report.scopeProcedure.qualitativePositionForceSubstitutionForBinaryEligibilityAllowed).toBe(false);
    expect(report.scopeProcedureBoundToFrozenPolicyDefinition).toBe(true);
  });

  test('recognizes the exact six-input scope substrate and position classes', () => {
    const report = buildI147ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeCompatibilityAdjudicationReadinessReview(i146(), i143());
    expect(report.scopeCompatibilityInputCount).toBe(6);
    expect(report.visibleStemPositionClassInputCount).toBe(5);
    expect(report.generalVisibleStemForceContextInputCount).toBe(1);
    expect(report.allScopeInputsRemainUnresolved).toBe(true);
    expect(report.allScopeInputsTargetExactVisibleStemKeBinaryEligibilityScope).toBe(true);
    expect(report.everyScopeInputBindsExistingRegisteredEvidence).toBe(true);
    expect(report.everyScopeEvidenceRetainsExplicitI118Ownership).toBe(true);
  });

  test('keeps the registered package immutable and the consumed authorization non-reusable', () => {
    const report = buildI147ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeCompatibilityAdjudicationReadinessReview(i146(), i143());
    expect(report.registeredInputPackageMutatedByThisGate).toBe(false);
    expect(report.consumedI145EvaluationAuthorizationReusable).toBe(false);
    expect(report.candidateSetReevaluationAuthorizedByThisGate).toBe(false);
    expect(report.candidateSetReevaluationPerformedByThisGate).toBe(false);
    expect(report.anyReevaluationRequiresNewRegisteredPackageVersionAndNewAuthorization).toBe(true);
  });

  test('preserves all composition, threshold, production, classification, and numeric guards', () => {
    const report = buildI147ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeCompatibilityAdjudicationReadinessReview(i146(), i143());
    expect(report.candidateSetAdmissibilityEstablishedByThisGate).toBe(false);
    expect(report.actualCompositionPerformedByThisGate).toBe(false);
    expect(report.multiSourceCompositionAuthorized).toBe(false);
    expect(report.authorityAcquiredByThisGate).toBe(false);
    expect(report.visibleStemBinaryEffectiveInteractionEligibilityResolved).toBe(false);
    expect(report.thresholdRuleCreatedByThisGate).toBe(false);
    expect(report.productionPolicyExecutionAuthorized).toBe(false);
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
  });

  test('fails closed if I146 did not fail specifically at scope compatibility', () => {
    const report = buildI147ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeCompatibilityAdjudicationReadinessReview(
      i146({ firstUnsatisfiedStepId: 'PROVENANCE_INDEPENDENCE_CHECK' }),
      i143(),
    );
    expect(report.status).toBe('I146_FAIL_CLOSED_EVALUATION_OR_I143_SCOPE_SUBSTRATE_INVALID');
    expect(report.scopeAdjudicationReadinessEstablished).toBe(false);
    expect(report.separateScopeCompatibilityAdjudicationMayProceed).toBe(false);
  });

  test('fails closed if a scope input does not target the exact registered visible-stem KE binary-eligibility scope', () => {
    const source = i143();
    const mutated = source.scopeCompatibilityInputs.map((input, index) =>
      index === 0 ? { ...input, targetScope: 'BROKEN_SCOPE' } : input,
    );
    const report = buildI147ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeCompatibilityAdjudicationReadinessReview(
      i146(),
      i143({ scopeCompatibilityInputs: mutated }),
    );
    expect(report.exactI143ScopeSubstrateAccepted).toBe(false);
    expect(report.scopeCompatibilityInputCount).toBe(0);
  });

  test('fails closed on I146/I143 identity drift and routes back to the evaluation boundary', () => {
    const report = buildI147ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeCompatibilityAdjudicationReadinessReview(
      i146({ upstreamI143RecordId: 'different_i143_record' }),
      i143(),
    );
    expect(report.evaluationAndPackageIdentityMatch).toBe(false);
    expect(report.recommendedNextGate).toBe(
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_AUTHORIZED_REGISTERED_INPUT_PACKAGE_FAIL_CLOSED_CANDIDATE_SET_EVALUATION_RECORD',
    );
  });
});
