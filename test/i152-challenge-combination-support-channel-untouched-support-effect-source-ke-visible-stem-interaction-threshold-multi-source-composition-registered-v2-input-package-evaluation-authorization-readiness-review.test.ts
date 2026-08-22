import { describe, expect, test } from 'vitest';
import {
  I144_BINDING_EVALUATION_STEP_IDS,
  I149_REQUIRED_V2_PACKAGE_COMPONENTS,
  buildI152ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredV2InputPackageEvaluationAuthorizationReadinessReview,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeAdjudicatedV2InputPackageMaterializationRecordReport,
} from '../src/index.js';

const candidateIds = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'] as const;
const evidenceIds = ['e1', 'e2', 'e3', 'e4', 'e5', 'e6'] as const;

function validI151(
  overrides: Record<string, unknown> = {},
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeAdjudicatedV2InputPackageMaterializationRecordReport {
  const originalEvidenceRebindingRecords = evidenceIds.map((evidenceId, index) => ({
    evidenceId,
    candidateId: candidateIds[index],
    sourceId: `s${index + 1}`,
    witnessId: `w${index + 1}`,
    locator: `locator-${index + 1}`,
    observation: `observation-${index + 1}`,
    i118RequirementIds: ['CONTEXT_AND_EXCEPTION_CONDITIONS'],
    bindingState: 'REGISTERED_INPUT_NOT_ADJUDICATED',
  }));
  const originalRequirementOwnershipBindings = evidenceIds.map((evidenceId, index) => ({
    i118RequirementId: [
      'EXPLICIT_BINARY_EFFECTIVE_INTERACTION_SEMANTICS',
      'VISIBLE_STEM_POSITION_SCOPE_AND_POSITION_CLASS_APPLICABILITY',
      'QUALITATIVE_FORCE_VS_BINARY_ELIGIBILITY_SEPARATION',
      'WU_LI_BOUNDARY_SEMANTICS_AND_EXCEPTIONS',
      'CONTEXT_AND_EXCEPTION_CONDITIONS',
      'INDEPENDENT_NORMATIVE_PROVENANCE',
    ][index],
    owningEvidenceIds: [evidenceId],
    ownershipBasis: `ownership-${index + 1}`,
    satisfactionFindingMade: false,
  }));
  const scopeAdjudicationResults = evidenceIds.map((evidenceId, index) =>
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
  const scopeCoverageEligibilityFlags = scopeAdjudicationResults.map((result) => ({
    evidenceId: result.evidenceId,
    candidateId: result.candidateId,
    adjudicationState: result.adjudicationState,
    scopeEligibleForRequirementCoverage: result.scopeEligibleForLaterRequirementCoverage,
  }));
  const originalProvenanceIndependenceInputs = evidenceIds.map((evidenceId, index) => ({
    evidenceId,
    provenanceIdentity: `p${index + 1}`,
    independenceState: 'UNRESOLVED',
    dependencyLinks: [],
    basis: `provenance-${index + 1}`,
    numericWeight: null,
  }));
  const originalSemanticBridgeInputs = ['b1', 'b2', 'b3'].map((bridgeId) => ({
    bridgeId,
    fromTerm: 'source',
    toTerm: 'target',
    scope: 'VISIBLE_HEAVENLY_STEM_KE_BINARY_EFFECTIVE_INTERACTION_ELIGIBILITY',
    bridgeState: 'UNRESOLVED',
    authorityEvidenceIds: ['e1'],
    lexicalSimilarityIsNotAuthority: true,
  }));
  const originalContradictionInputs = ['x1', 'x2'].map((contradictionId) => ({
    contradictionId,
    evidenceIds: ['e1', 'e2'],
    conflictDescription: `conflict-${contradictionId}`,
    resolutionState: 'UNRESOLVED',
    precedenceBasis: null,
    numericVoteOrWeightUsed: false,
  }));

  const base = {
    recordId: 'i151_i152_fixture',
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
    originalEvidenceRebindingRecords,
    originalRequirementOwnershipBindings,
    scopeAdjudicationArtifactReference: {
      adjudicationRecordId: 'i148_fixture',
      adjudicationRecordVersion: 'v1',
      sourceInputPackageId: 'input_package_v1_fixture',
    },
    scopeAdjudicationResults,
    scopeCoverageEligibilityFlags,
    originalProvenanceIndependenceInputs,
    originalSemanticBridgeInputs,
    originalContradictionInputs,
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

describe('I152 registered v2 input package evaluation authorization readiness review', () => {
  test('establishes readiness for a separate new single-use authorization without authorizing evaluation', () => {
    const report = buildI152ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredV2InputPackageEvaluationAuthorizationReadinessReview(validI151());

    expect(report.status).toBe(
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_REGISTERED_V2_INPUT_PACKAGE_EVALUATION_AUTHORIZATION_READINESS_REVIEW',
    );
    expect(report.decision).toBe(
      'REGISTERED_V2_INPUT_PACKAGE_STRUCTURALLY_READY_FOR_NEW_SINGLE_USE_FAIL_CLOSED_EVALUATION_AUTHORIZATION_CONTRACT_NO_EVALUATION_AUTHORIZED',
    );
    expect(report.registeredPackageStateObserved).toBe('REGISTERED_NOT_EVALUATED');
    expect(report.evaluationAuthorizationReadinessEstablished).toBe(true);
    expect(report.separateNewEvaluationAuthorizationContractMayProceed).toBe(true);
    expect(report.candidateSetEvaluationAuthorizedByThisGate).toBe(false);
  });

  test('binds readiness to the exact v2 package identity and frozen candidate set', () => {
    const report = buildI152ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredV2InputPackageEvaluationAuthorizationReadinessReview(validI151());

    expect(report.inputPackageVersion).toBe('v2-input-package');
    expect(report.inputPackageId).toBe('input_package_v2_fixture');
    expect(report.sourceInputPackageId).toBe('input_package_v1_fixture');
    expect(report.packageIdentityStableDeterministicAndDistinctFromV1).toBe(true);
    expect(report.exactTenMaterializedComponentsPresent).toBe(true);
    expect(report.frozenCandidateSetIntegrityVerifiedForReadiness).toBe(true);
    expect(report.evaluationMustConsumeExactRegisteredV2PackageId).toBe(true);
    expect(report.evaluationMustConsumeExactFrozenCandidateSetId).toBe(true);
  });

  test('preserves the exact nine mandatory fail-closed evaluation steps', () => {
    const report = buildI152ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredV2InputPackageEvaluationAuthorizationReadinessReview(validI151());

    expect(report.bindingEvaluationStepIds).toEqual(I144_BINDING_EVALUATION_STEP_IDS);
    expect(report.bindingEvaluationStepCount).toBe(9);
    expect(report.allEvaluationStepsMandatoryAndFailClosed).toBe(true);
    expect(report.registeredScopeOutcomeMustBeConsumedAtScopeCompatibilityStep).toBe(true);
    expect(report.scopeCompatibilityMustNotBeReadjudicatedByAuthorizationContract).toBe(true);
  });

  test('recognizes registered scope resolution while leaving requirement satisfaction untouched', () => {
    const report = buildI152ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredV2InputPackageEvaluationAuthorizationReadinessReview(validI151());

    expect(report.scopeAdjudicationArtifactRegisteredForReadiness).toBe(true);
    expect(report.scopeAdjudicationResultCount).toBe(6);
    expect(report.scopeCompatibleOnlyCount).toBe(5);
    expect(report.scopeRejectedCount).toBe(1);
    expect(report.scopeCompatibilityResolvedInRegisteredPackage).toBe(true);
    expect(report.scopeRejectedEvidenceRetainedButCoverageIneligible).toBe(true);
    expect(report.requirementCoverageRecomputedByThisGate).toBe(false);
    expect(report.requirementSatisfactionAdjudicatedByThisGate).toBe(false);
  });

  test('keeps provenance, semantic bridge, and contradiction inputs unresolved for later ordered evaluation', () => {
    const report = buildI152ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredV2InputPackageEvaluationAuthorizationReadinessReview(validI151());

    expect(report.unresolvedProvenanceInputCount).toBe(6);
    expect(report.unresolvedSemanticBridgeInputCount).toBe(3);
    expect(report.unresolvedContradictionInputCount).toBe(2);
    expect(report.remainingUnresolvedInputsAreMandatoryEvaluationInputs).toBe(true);
    expect(report.provenanceIndependenceMustRemainFailClosedUntilEvaluation).toBe(true);
    expect(report.semanticBridgeMustRemainFailClosedUntilEvaluation).toBe(true);
    expect(report.contradictionMustRemainFailClosedUntilEvaluation).toBe(true);
  });

  test('requires a new single-use authorization because I145 is consumed and non-reusable', () => {
    const report = buildI152ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredV2InputPackageEvaluationAuthorizationReadinessReview(validI151());

    expect(report.priorI145AuthorizationConsumedAndNonReusable).toBe(true);
    expect(report.newSingleUseEvaluationAuthorizationRequired).toBe(true);
    expect(report.readinessDoesNotEqualEvaluationAuthorization).toBe(true);
    expect(report.inputPackageMutatedByThisGate).toBe(false);
    expect(report.candidateSetEvaluationPerformedByThisGate).toBe(false);
  });

  test('keeps composition, threshold, production, classification, numeric, and hidden-stem authority closed', () => {
    const report = buildI152ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredV2InputPackageEvaluationAuthorizationReadinessReview(validI151());

    expect(report.readinessDoesNotEqualCompositionAuthorization).toBe(true);
    expect(report.readinessDoesNotEqualThresholdAuthority).toBe(true);
    expect(report.productionPolicyExecutionAuthorized).toBe(false);
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

  test('fails closed when the ten-component package sequence is mutated without changing its count', () => {
    const source = validI151({
      materializedComponentIds: [
        'MUTATED_COMPONENT',
        ...I149_REQUIRED_V2_PACKAGE_COMPONENTS.slice(1),
      ],
    });
    const report = buildI152ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredV2InputPackageEvaluationAuthorizationReadinessReview(source);

    expect(source.materializedComponentIds).toHaveLength(10);
    expect(report.status).toBe('I151_REGISTERED_V2_INPUT_PACKAGE_INVALID');
    expect(report.decision).toBe(
      'REGISTERED_V2_INPUT_PACKAGE_EVALUATION_AUTHORIZATION_READINESS_NOT_ESTABLISHED',
    );
    expect(report.exactI151RegisteredV2PackageAccepted).toBe(false);
    expect(report.inputPackageId).toBeNull();
    expect(report.evaluationAuthorizationReadinessEstablished).toBe(false);
    expect(report.separateNewEvaluationAuthorizationContractMayProceed).toBe(false);
  });
});
