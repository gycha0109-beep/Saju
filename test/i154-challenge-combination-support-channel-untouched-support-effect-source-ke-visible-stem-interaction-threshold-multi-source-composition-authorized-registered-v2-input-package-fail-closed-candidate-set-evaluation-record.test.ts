import { describe, expect, test } from 'vitest';
import {
  I143_I118_REQUIREMENT_IDS,
  I144_BINDING_EVALUATION_STEP_IDS,
  I149_REQUIRED_V2_PACKAGE_COMPONENTS,
  buildI154ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionAuthorizedRegisteredV2InputPackageFailClosedCandidateSetEvaluationRecord,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredV2InputPackageEvaluationAuthorizationContractReport,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeAdjudicatedV2InputPackageMaterializationRecordReport,
} from '../src/index.js';

const candidateIds = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'] as const;
const evidenceIds = ['e1', 'e2', 'e3', 'e4', 'e5', 'e6'] as const;

function validI151(
  overrides: Record<string, unknown> = {},
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeAdjudicatedV2InputPackageMaterializationRecordReport {
  const evidence = evidenceIds.map((evidenceId, index) => ({
    evidenceId,
    candidateId: candidateIds[index],
    sourceId: `source-${index + 1}`,
    witnessId: `witness-${index + 1}`,
    locator: `locator-${index + 1}`,
    observation: `observation-${index + 1}`,
    i118RequirementIds: [I143_I118_REQUIREMENT_IDS[index]],
    bindingState: 'REGISTERED_INPUT_NOT_ADJUDICATED',
  }));
  const ownership = I143_I118_REQUIREMENT_IDS.map((requirementId, index) => ({
    i118RequirementId: requirementId,
    owningEvidenceIds: [evidenceIds[index]],
    ownershipBasis: `ownership-${index + 1}`,
    satisfactionFindingMade: false,
  }));
  const scopeResults = evidenceIds.map((evidenceId, index) =>
    index === 5
      ? {
          evidenceId,
          candidateId: candidateIds[index],
          inputPositionClass: 'GENERAL_VISIBLE_STEM_FORCE_CONTEXT',
          adjudicationState: 'REJECTED_SCOPE_MISMATCH_GENERIC_FORCE_CONTEXT',
          scopeEligibleForLaterRequirementCoverage: false,
          reason:
            'GENERIC_VISIBLE_STEM_FORCE_CONTEXT_CANNOT_SUBSTITUTE_FOR_VISIBLE_STEM_KE_BINARY_ELIGIBILITY',
          requirementSatisfactionFindingMade: false,
          binaryEligibilityFindingMade: false,
          semanticBridgeFindingMade: false,
          contradictionResolutionMade: false,
        }
      : {
          evidenceId,
          candidateId: candidateIds[index],
          inputPositionClass: 'VISIBLE_STEM_POSITION_CLASS',
          adjudicationState: 'COMPATIBLE_SCOPE_ONLY_NO_REQUIREMENT_SATISFACTION_FINDING',
          scopeEligibleForLaterRequirementCoverage: true,
          reason: 'EXACT_VISIBLE_STEM_KE_TARGET_AND_EXPLICIT_POSITION_SCOPE_OWNERSHIP_PRESENT',
          requirementSatisfactionFindingMade: false,
          binaryEligibilityFindingMade: false,
          semanticBridgeFindingMade: false,
          contradictionResolutionMade: false,
        },
  );
  const scopeFlags = scopeResults.map((result) => ({
    evidenceId: result.evidenceId,
    candidateId: result.candidateId,
    adjudicationState: result.adjudicationState,
    scopeEligibleForRequirementCoverage: result.scopeEligibleForLaterRequirementCoverage,
  }));

  const base = {
    recordId: 'i151_i154_fixture',
    recordVersion: 'v1',
    status:
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_SCOPE_ADJUDICATED_V2_INPUT_PACKAGE_MATERIALIZATION_RECORD',
    decision:
      'DETERMINISTIC_V2_INPUT_PACKAGE_MATERIALIZED_AND_REGISTERED_WITH_SCOPE_RESULTS_AND_REMAINING_INPUTS_UNRESOLVED_NO_EVALUATION',
    upstreamI150ContractId: 'i150_fixture',
    upstreamI148AdjudicationRecordId: 'i148_fixture',
    upstreamI143RecordId: 'i143_fixture',
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    adoptionId: 'adoption_fixture',
    candidateSetVersion: 'v1-candidate-set',
    candidateSetId: 'candidate_set_fixture',
    sourceInputPackageVersion: 'v1-input-package',
    sourceInputPackageId: 'input_package_v1_fixture',
    targetInputPackageVersion: 'v2-input-package',
    targetInputPackageId: 'input_package_v2_fixture',
    targetInputPackageState: 'REGISTERED_NOT_EVALUATED',
    exactI150ContractAccepted: true,
    exactI148ScopeAdjudicationAccepted: true,
    exactI143SourcePackageAccepted: true,
    allUpstreamIdentitiesMatch: true,
    materializedComponentIds: I149_REQUIRED_V2_PACKAGE_COMPONENTS,
    materializedComponentCount: 10,
    sourceV1PackageReference: {
      recordId: 'i143_fixture',
      inputPackageId: 'input_package_v1_fixture',
      inputPackageVersion: 'v1-input-package',
      immutable: true,
    },
    frozenV1CandidateSetReference: {
      candidateSetId: 'candidate_set_fixture',
      candidateSetVersion: 'v1-candidate-set',
      adoptionId: 'adoption_fixture',
      candidateIds,
      candidateCount: 6,
      frozen: true,
    },
    originalEvidenceRebindingRecords: evidence,
    originalRequirementOwnershipBindings: ownership,
    scopeAdjudicationArtifactReference: {
      adjudicationRecordId: 'i148_fixture',
      adjudicationRecordVersion: 'v1',
      sourceInputPackageId: 'input_package_v1_fixture',
    },
    scopeAdjudicationResults: scopeResults,
    scopeCoverageEligibilityFlags: scopeFlags,
    originalProvenanceIndependenceInputs: evidenceIds.map((evidenceId, index) => ({
      evidenceId,
      provenanceIdentity: `provenance-${index + 1}`,
      independenceState: 'UNRESOLVED',
      dependencyLinks: [],
      basis: `basis-${index + 1}`,
      numericWeight: null,
    })),
    originalSemanticBridgeInputs: ['b1', 'b2', 'b3'].map((bridgeId) => ({
      bridgeId,
      fromTerm: 'source',
      toTerm: 'target',
      scope: 'VISIBLE_HEAVENLY_STEM_KE_BINARY_EFFECTIVE_INTERACTION_ELIGIBILITY',
      bridgeState: 'UNRESOLVED',
      authorityEvidenceIds: ['e1'],
      lexicalSimilarityIsNotAuthority: true,
    })),
    originalContradictionInputs: ['x1', 'x2'].map((contradictionId) => ({
      contradictionId,
      evidenceIds: ['e1', 'e2'],
      conflictDescription: `conflict-${contradictionId}`,
      resolutionState: 'UNRESOLVED',
      precedenceBasis: null,
      numericVoteOrWeightUsed: false,
    })),
    allTenRequiredComponentsMaterialized: true,
    sourceV1PackagePreservedImmutable: true,
    sourceV1PackageMutatedByThisGate: false,
    frozenV1CandidateSetPreservedExact: true,
    originalEvidenceBindingsPreservedForAudit: true,
    originalRequirementOwnershipPreservedAsNonSatisfactionBindings: true,
    scopeAdjudicationResultCount: 6,
    scopeCompatibleOnlyCount: 5,
    scopeRejectedCount: 1,
    scopeEligibilityFlagCount: 6,
    scopeRejectedEvidenceRetainedForAudit: true,
    scopeRejectedEvidenceExcludedFromScopeDependentCoverage: true,
    requirementCoverageRecomputedByThisGate: false,
    requirementSatisfactionAdjudicatedByThisGate: false,
    provenanceInputCount: 6,
    provenanceUnresolvedCount: 6,
    semanticBridgeInputCount: 3,
    semanticBridgeUnresolvedCount: 3,
    contradictionInputCount: 2,
    contradictionUnresolvedCount: 2,
    remainingUnresolvedInputsPreservedWithoutInference: true,
    targetPackageIdentityDeterministic: true,
    targetPackageIdentityDistinctFromSourceV1: true,
    targetPackageCreatedByThisGate: true,
    targetPackageRegisteredByThisGate: true,
    candidateSetEvaluationAuthorizedByThisGate: false,
    candidateSetEvaluationPerformedByThisGate: false,
    consumedI145EvaluationAuthorizationReusable: false,
    newEvaluationAuthorizationRequiredAfterV2Registration: true,
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
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_REGISTERED_V2_INPUT_PACKAGE_EVALUATION_AUTHORIZATION_READINESS_REVIEW',
    notes: [],
  };

  return { ...base, ...overrides } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeAdjudicatedV2InputPackageMaterializationRecordReport;
}

function validI153(
  overrides: Record<string, unknown> = {},
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredV2InputPackageEvaluationAuthorizationContractReport {
  const base = {
    authorizationId: 'i153_i154_fixture',
    authorizationVersion: 'v1',
    status:
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_REGISTERED_V2_INPUT_PACKAGE_EVALUATION_AUTHORIZATION_CONTRACT',
    decision:
      'EXACT_REGISTERED_V2_INPUT_PACKAGE_AUTHORIZED_FOR_ONE_NEW_SINGLE_USE_GOVERNED_FAIL_CLOSED_RESEARCH_EVALUATION_NOT_EXECUTED',
    upstreamI152ReviewId: 'i152_fixture',
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
    exactI152ReadinessAccepted: true,
    authorizationState: 'AUTHORIZED_NOT_EXECUTED',
    authorizationScope: 'EXACT_REGISTERED_V2_PACKAGE_SINGLE_RESEARCH_EVALUATION',
    authorizedEvaluationCount: 1,
    authorizationBoundToExactPolicyVersion: true,
    authorizationBoundToExactAdoptionId: true,
    authorizationBoundToExactCandidateSetId: true,
    authorizationBoundToExactV2InputPackageId: true,
    authorizationBoundToExactNineStepFailClosedAlgorithm: true,
    priorI145AuthorizationReusable: false,
    thisAuthorizationIsNewAndDistinctFromI145: true,
    packageMutationBeforeEvaluationInvalidatesAuthorization: true,
    candidateSetMutationBeforeEvaluationInvalidatesAuthorization: true,
    policyVersionChangeBeforeEvaluationInvalidatesAuthorization: true,
    registeredScopeOutcomeMustBeConsumedAtScopeCompatibilityStep: true,
    scopeCompatibilityMayNotBeReadjudicatedByThisAuthorization: true,
    scopeCompatibilityDoesNotEqualRequirementSatisfaction: true,
    scopeCompatibilityDoesNotEqualBinaryEligibility: true,
    evaluationMustPreserveRemainingUnresolvedInputsAsUnresolved: true,
    evaluationMayNotInferProvenanceIndependence: true,
    evaluationMayNotInferMissingSemanticBridges: true,
    evaluationMayNotResolveContradictionsByVoteOrWeight: true,
    evaluationMustFailClosedAtFirstUnsatisfiedMandatoryStep: true,
    laterStepsAfterFirstFailureMustNotBePromotedToPass: true,
    researchEvaluationExecutionAuthorized: true,
    candidateSetEvaluationAuthorizedByThisGate: true,
    candidateSetEvaluationPerformedByThisGate: false,
    evaluationResultCreatedByThisGate: false,
    unresolvedInputAdjudicationPerformedByThisGate: false,
    inputPackageMutatedByThisGate: false,
    requirementSatisfactionAdjudicatedByThisGate: false,
    productionPolicyExecutionAuthorized: false,
    productionPolicyExecutableByThisGate: false,
    candidateSetAdmissibilityEstablishedByThisGate: false,
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
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_AUTHORIZED_REGISTERED_V2_INPUT_PACKAGE_FAIL_CLOSED_CANDIDATE_SET_EVALUATION_RECORD',
    notes: [],
  };

  return { ...base, ...overrides } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredV2InputPackageEvaluationAuthorizationContractReport;
}

describe('I154 authorized registered v2 fail-closed candidate-set evaluation record', () => {
  test('executes exact authorized v2 evaluation and fails closed at provenance independence', () => {
    const report = buildI154ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionAuthorizedRegisteredV2InputPackageFailClosedCandidateSetEvaluationRecord(
      validI153(),
      validI151(),
    );

    expect(report.status).toBe(
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_AUTHORIZED_REGISTERED_V2_INPUT_PACKAGE_FAIL_CLOSED_CANDIDATE_SET_EVALUATION_RECORD',
    );
    expect(report.decision).toBe(
      'REGISTERED_V2_CANDIDATE_SET_EVALUATION_EXECUTED_FAIL_CLOSED_AT_PROVENANCE_INDEPENDENCE_UNRESOLVED_ADMISSIBILITY_NOT_ESTABLISHED',
    );
    expect(report.evaluationState).toBe('COMPLETED_FAIL_CLOSED');
    expect(report.firstUnsatisfiedStepId).toBe('PROVENANCE_INDEPENDENCE_CHECK');
    expect(report.firstUnsatisfiedStepReason).toBe('REGISTERED_PROVENANCE_INDEPENDENCE_INPUTS_UNRESOLVED');
  });

  test('records four PASS then provenance failure and four non-evaluated later steps', () => {
    const report = buildI154ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionAuthorizedRegisteredV2InputPackageFailClosedCandidateSetEvaluationRecord(
      validI153(),
      validI151(),
    );

    expect(report.evaluationStepRecords.map((step) => step.stepId)).toEqual(I144_BINDING_EVALUATION_STEP_IDS);
    expect(report.evaluationStepRecords.map((step) => step.state)).toEqual([
      'PASS',
      'PASS',
      'PASS',
      'PASS',
      'FAIL_UNRESOLVED',
      'NOT_EVALUATED_AFTER_FAIL_CLOSED_STOP',
      'NOT_EVALUATED_AFTER_FAIL_CLOSED_STOP',
      'NOT_EVALUATED_AFTER_FAIL_CLOSED_STOP',
      'NOT_EVALUATED_AFTER_FAIL_CLOSED_STOP',
    ]);
    expect(report.passedStepCount).toBe(4);
    expect(report.failedStepCount).toBe(1);
    expect(report.notEvaluatedStepCount).toBe(4);
    expect(report.laterStepsAfterFirstFailureNotPromotedToPass).toBe(true);
  });

  test('consumes registered scope adjudication instead of re-adjudicating or requiring six compatible inputs', () => {
    const report = buildI154ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionAuthorizedRegisteredV2InputPackageFailClosedCandidateSetEvaluationRecord(
      validI153(),
      validI151(),
    );

    expect(report.registeredScopeOutcomeConsumedAtScopeCompatibilityStep).toBe(true);
    expect(report.scopeCompatibilityReadjudicatedByThisGate).toBe(false);
    expect(report.scopeAdjudicationResultCountObserved).toBe(6);
    expect(report.scopeCompatibleOnlyCountObserved).toBe(5);
    expect(report.scopeRejectedCountObserved).toBe(1);
    expect(report.scopeRejectedEvidenceCoverageIneligibleObserved).toBe(true);
    expect(report.evaluationStepRecords[3]?.state).toBe('PASS');
  });

  test('consumes I153 authorization once and makes it non-reusable', () => {
    const report = buildI154ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionAuthorizedRegisteredV2InputPackageFailClosedCandidateSetEvaluationRecord(
      validI153(),
      validI151(),
    );

    expect(report.authorizationConsumedByThisEvaluationRecord).toBe(true);
    expect(report.authorizationReusableAfterThisRecord).toBe(false);
    expect(report.candidateSetEvaluationAuthorizedUpstream).toBe(true);
    expect(report.candidateSetEvaluationPerformedByThisGate).toBe(true);
    expect(report.evaluationResultCreatedByThisGate).toBe(true);
  });

  test('preserves unresolved provenance bridge and contradiction inputs without inference', () => {
    const report = buildI154ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionAuthorizedRegisteredV2InputPackageFailClosedCandidateSetEvaluationRecord(
      validI153(),
      validI151(),
    );

    expect(report.provenanceIndependenceUnresolvedCountObserved).toBe(6);
    expect(report.semanticBridgeUnresolvedCountObserved).toBe(3);
    expect(report.contradictionUnresolvedCountObserved).toBe(2);
    expect(report.unresolvedInputsPreservedWithoutInference).toBe(true);
    expect(report.noProvenanceIndependenceInferencePerformed).toBe(true);
    expect(report.noMissingSemanticBridgeInferencePerformed).toBe(true);
    expect(report.noContradictionVoteOrWeightPerformed).toBe(true);
    expect(report.provenanceIndependenceAdjudicatedByThisGate).toBe(false);
  });

  test('does not establish candidate admissibility or later requirement satisfaction', () => {
    const report = buildI154ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionAuthorizedRegisteredV2InputPackageFailClosedCandidateSetEvaluationRecord(
      validI153(),
      validI151(),
    );

    expect(report.candidateSetAdmissibilityState).toBe('NOT_ESTABLISHED_FAIL_CLOSED');
    expect(report.candidateSetAdmissibilityEstablishedByThisGate).toBe(false);
    expect(report.requirementSatisfactionAdjudicatedByThisGate).toBe(false);
    expect(report.fullSixRequirementSatisfactionAdjudicatedByThisGate).toBe(false);
    expect(report.inputPackageMutatedByThisGate).toBe(false);
  });

  test('keeps production composition threshold classification numeric and hidden-stem authority closed', () => {
    const report = buildI154ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionAuthorizedRegisteredV2InputPackageFailClosedCandidateSetEvaluationRecord(
      validI153(),
      validI151(),
    );

    expect(report.productionPolicyExecutionAuthorized).toBe(false);
    expect(report.productionPolicyExecutableByThisGate).toBe(false);
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

  test('fails closed without consuming authorization when exact v2 package identity does not match authorization', () => {
    const report = buildI154ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionAuthorizedRegisteredV2InputPackageFailClosedCandidateSetEvaluationRecord(
      validI153({ inputPackageId: 'different_v2_package' }),
      validI151(),
    );

    expect(report.status).toBe('I153_AUTHORIZATION_OR_I151_REGISTERED_V2_PACKAGE_INVALID');
    expect(report.decision).toBe('AUTHORIZED_REGISTERED_V2_CANDIDATE_SET_EVALUATION_NOT_PERFORMED');
    expect(report.authorizationAndPackageIdentityMatch).toBe(false);
    expect(report.evaluationState).toBe('NOT_PERFORMED');
    expect(report.authorizationConsumedByThisEvaluationRecord).toBe(false);
    expect(report.evaluationStepRecords.every((step) => step.state === 'NOT_EVALUATED_UNAUTHORIZED')).toBe(true);
    expect(report.candidateSetAdmissibilityState).toBe('NOT_EVALUATED');
  });
});
