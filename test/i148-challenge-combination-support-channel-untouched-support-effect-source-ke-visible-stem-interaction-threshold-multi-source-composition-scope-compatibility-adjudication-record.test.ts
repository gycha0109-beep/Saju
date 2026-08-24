import { describe, expect, test } from 'vitest';
import {
  I147_SCOPE_COMPATIBILITY_PROCEDURE,
  buildI148ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeCompatibilityAdjudicationRecord,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetEvidenceRebindingAdjudicationInputMaterializationRecordReport,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeCompatibilityAdjudicationReadinessReviewReport,
} from '../src/index.js';

const evidenceIds = [
  'evidence_chen_yuan_position_distance_wuli',
  'evidence_wei_qianli_far_position_cannot_ke',
  'evidence_zhu_zuxia_remote_ke_conditions',
  'evidence_yimeng_wuli_yaoke_example',
  'evidence_wu_huaiyun_taxonomy_remote_and_operational_examples',
  'evidence_mingdeng_generic_youli_wuli_criteria',
] as const;

function i147(
  overrides: Record<string, unknown> = {},
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeCompatibilityAdjudicationReadinessReviewReport {
  const base = {
    reviewId: 'i147_i148_fixture',
    reviewVersion: 'v1',
    status:
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_SCOPE_COMPATIBILITY_ADJUDICATION_READINESS_REVIEW',
    decision:
      'SIX_REGISTERED_SCOPE_INPUTS_READY_FOR_SEPARATE_POLICY_GOVERNED_SCOPE_ADJUDICATION_NO_PACKAGE_MUTATION_NO_REEVALUATION',
    upstreamI146EvaluationRecordId: 'i146_fixture',
    upstreamI143RecordId: 'i143_i148_fixture',
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    adoptionId: 'adoption_fixture',
    candidateSetVersion: 'v1-candidate-set',
    candidateSetId: 'candidate_set_fixture',
    inputPackageVersion: 'v1-input-package',
    inputPackageId: 'input_package_fixture',
    exactI146FailClosedEvaluationAccepted: true,
    exactI143ScopeSubstrateAccepted: true,
    evaluationAndPackageIdentityMatch: true,
    triggeringEvaluationStepId: 'SCOPE_COMPATIBILITY_CHECK',
    triggeringEvaluationStepState: 'FAIL_UNRESOLVED',
    scopeCompatibilityInputCount: 6,
    visibleStemPositionClassInputCount: 5,
    generalVisibleStemForceContextInputCount: 1,
    allScopeInputsRemainUnresolved: true,
    allScopeInputsTargetExactVisibleStemKeBinaryEligibilityScope: true,
    everyScopeInputBindsExistingRegisteredEvidence: true,
    everyScopeEvidenceRetainsExplicitI118Ownership: true,
    scopeProcedure: I147_SCOPE_COMPATIBILITY_PROCEDURE,
    scopeProcedureBoundToFrozenPolicyDefinition: true,
    scopeAdjudicationReadinessEstablished: true,
    separateScopeCompatibilityAdjudicationMayProceed: true,
    scopeCompatibilityAdjudicatedByThisGate: false,
    scopeCompatibilityFindingCreatedByThisGate: false,
    registeredInputPackageMutatedByThisGate: false,
    consumedI145EvaluationAuthorizationReusable: false,
    candidateSetReevaluationAuthorizedByThisGate: false,
    candidateSetReevaluationPerformedByThisGate: false,
    anyReevaluationRequiresNewRegisteredPackageVersionAndNewAuthorization: true,
    provenanceIndependenceAdjudicatedByThisGate: false,
    semanticBridgeAdjudicatedByThisGate: false,
    contradictionAdjudicatedByThisGate: false,
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
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_SCOPE_COMPATIBILITY_ADJUDICATION_RECORD',
    notes: [],
  };
  return { ...base, ...overrides } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeCompatibilityAdjudicationReadinessReviewReport;
}

function i143(
  overrides: Record<string, unknown> = {},
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetEvidenceRebindingAdjudicationInputMaterializationRecordReport {
  const evidenceRebindingRecords = evidenceIds.map((evidenceId, index) => ({
    evidenceId,
    candidateId: `candidate_${index + 1}`,
    sourceId: `source_${index + 1}`,
    witnessId: `witness_${index + 1}`,
    locator: `locator_${index + 1}`,
    observation: 'fixture observation',
    i118RequirementIds:
      index === 5
        ? ['QUALITATIVE_FORCE_VS_BINARY_ELIGIBILITY_SEPARATION', 'CONTEXT_AND_EXCEPTION_CONDITIONS']
        : ['VISIBLE_STEM_POSITION_SCOPE_AND_POSITION_CLASS_APPLICABILITY', 'CONTEXT_AND_EXCEPTION_CONDITIONS'],
    bindingState: 'REGISTERED_INPUT_NOT_ADJUDICATED',
  }));
  const scopeCompatibilityInputs = evidenceIds.map((evidenceId, index) => ({
    evidenceId,
    targetScope: 'VISIBLE_HEAVENLY_STEM_KE_BINARY_EFFECTIVE_INTERACTION_ELIGIBILITY',
    positionClass: index === 5 ? 'GENERAL_VISIBLE_STEM_FORCE_CONTEXT' : 'VISIBLE_STEM_POSITION_CLASS',
    compatibilityState: 'UNRESOLVED',
    basis: 'fixture unresolved scope',
  }));
  const base = {
    recordId: 'i143_i148_fixture',
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
    candidateManifest: null,
    witnessIdentityBindings: [],
    witnessIdentityBindingCount: 0,
    evidenceRebindingRecords,
    evidenceRebindingRecordCount: 6,
    requirementOwnershipBindings: [],
    requirementOwnershipBindingCount: 6,
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

describe('I148 scope compatibility adjudication record', () => {
  test('records the exact five-compatible-scope-only and one-generic-rejected outcome', () => {
    const report = buildI148ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeCompatibilityAdjudicationRecord(i147(), i143());
    expect(report.status).toBe(
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_SCOPE_COMPATIBILITY_ADJUDICATION_RECORD',
    );
    expect(report.decision).toBe(
      'FIVE_VISIBLE_STEM_SCOPE_INPUTS_COMPATIBLE_SCOPE_ONLY_ONE_GENERIC_FORCE_INPUT_REJECTED_NO_REQUIREMENT_SATISFACTION_NO_REEVALUATION',
    );
    expect(report.adjudicationResultCount).toBe(6);
    expect(report.compatibleScopeOnlyCount).toBe(5);
    expect(report.rejectedScopeMismatchCount).toBe(1);
    expect(report.unresolvedScopeCount).toBe(0);
    expect(report.scopeCompatibilityFullyAdjudicated).toBe(true);
  });

  test('marks each visible-stem position input compatible for scope only, never as requirement satisfaction', () => {
    const report = buildI148ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeCompatibilityAdjudicationRecord(i147(), i143());
    const visibleResults = report.adjudicationResults.filter(
      (result) => result.inputPositionClass === 'VISIBLE_STEM_POSITION_CLASS',
    );
    expect(visibleResults).toHaveLength(5);
    expect(
      visibleResults.every(
        (result) =>
          result.adjudicationState === 'COMPATIBLE_SCOPE_ONLY_NO_REQUIREMENT_SATISFACTION_FINDING' &&
          result.scopeEligibleForLaterRequirementCoverage &&
          result.requirementSatisfactionFindingMade === false &&
          result.binaryEligibilityFindingMade === false,
      ),
    ).toBe(true);
  });

  test('rejects the generic visible-stem force input from target-scope requirement coverage', () => {
    const report = buildI148ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeCompatibilityAdjudicationRecord(i147(), i143());
    const generic = report.adjudicationResults.find(
      (result) => result.evidenceId === 'evidence_mingdeng_generic_youli_wuli_criteria',
    );
    expect(generic?.adjudicationState).toBe('REJECTED_SCOPE_MISMATCH_GENERIC_FORCE_CONTEXT');
    expect(generic?.scopeEligibleForLaterRequirementCoverage).toBe(false);
    expect(generic?.reason).toBe(
      'GENERIC_VISIBLE_STEM_FORCE_CONTEXT_CANNOT_SUBSTITUTE_FOR_VISIBLE_STEM_KE_BINARY_ELIGIBILITY',
    );
    expect(report.genericForceSubstitutionRejected).toBe(true);
    expect(report.qualitativeForceToBinaryEligibilitySubstitutionPerformed).toBe(false);
  });

  test('creates a separate artifact without mutating I143 or authorizing candidate-set reevaluation', () => {
    const report = buildI148ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeCompatibilityAdjudicationRecord(i147(), i143());
    expect(report.scopeAdjudicationArtifactCreatedByThisGate).toBe(true);
    expect(report.scopeAdjudicationArtifactRegisteredIntoNewPackageByThisGate).toBe(false);
    expect(report.sourceInputPackageMutatedByThisGate).toBe(false);
    expect(report.requirementCoverageRecomputedByThisGate).toBe(false);
    expect(report.candidateSetReevaluationAuthorizedByThisGate).toBe(false);
    expect(report.candidateSetReevaluationPerformedByThisGate).toBe(false);
    expect(report.consumedI145EvaluationAuthorizationReusable).toBe(false);
    expect(report.newRegisteredPackageRequiredForReevaluation).toBe(true);
    expect(report.newEvaluationAuthorizationRequiredForReevaluation).toBe(true);
  });

  test('preserves provenance, semantic-bridge, contradiction, composition, threshold, production and numeric guards', () => {
    const report = buildI148ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeCompatibilityAdjudicationRecord(i147(), i143());
    expect(report.provenanceIndependenceAdjudicatedByThisGate).toBe(false);
    expect(report.semanticBridgeAdjudicatedByThisGate).toBe(false);
    expect(report.contradictionAdjudicatedByThisGate).toBe(false);
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

  test('routes only to governed registration and new-package materialization readiness', () => {
    const report = buildI148ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeCompatibilityAdjudicationRecord(i147(), i143());
    expect(report.recommendedNextGate).toBe(
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_SCOPE_ADJUDICATION_OUTCOME_REGISTRATION_NEW_INPUT_PACKAGE_MATERIALIZATION_READINESS_REVIEW',
    );
  });

  test('fails closed before adjudication on I147/I143 identity drift', () => {
    const report = buildI148ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeCompatibilityAdjudicationRecord(
      i147({ upstreamI143RecordId: 'different_record' }),
      i143(),
    );
    expect(report.status).toBe('I147_SCOPE_ADJUDICATION_READINESS_OR_I143_PACKAGE_INVALID');
    expect(report.adjudicationResults).toHaveLength(0);
    expect(report.scopeAdjudicationArtifactCreatedByThisGate).toBe(false);
    expect(report.scopeCompatibilityFullyAdjudicated).toBe(false);
  });

  test('preserves the exact partial adjudication evidence and fails closed if a visible input lacks explicit position-scope ownership', () => {
    const source = i143();
    const mutatedEvidence = source.evidenceRebindingRecords.map((record, index) =>
      index === 0
        ? { ...record, i118RequirementIds: ['CONTEXT_AND_EXCEPTION_CONDITIONS'] }
        : record,
    );
    const report = buildI148ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeCompatibilityAdjudicationRecord(
      i147(),
      i143({ evidenceRebindingRecords: mutatedEvidence }),
    );
    expect(report.status).toBe('I147_SCOPE_ADJUDICATION_READINESS_OR_I143_PACKAGE_INVALID');
    expect(report.decision).toBe('SCOPE_COMPATIBILITY_ADJUDICATION_NOT_COMPLETED');
    expect(report.adjudicationResultCount).toBe(6);
    expect(report.compatibleScopeOnlyCount).toBe(4);
    expect(report.rejectedScopeMismatchCount).toBe(1);
    expect(report.unresolvedScopeCount).toBe(1);
    expect(report.scopeCompatibilityFullyAdjudicated).toBe(false);
    expect(
      report.adjudicationResults.some(
        (result) => result.adjudicationState === 'UNRESOLVED_SCOPE_OWNERSHIP_GAP',
      ),
    ).toBe(true);
  });
});
