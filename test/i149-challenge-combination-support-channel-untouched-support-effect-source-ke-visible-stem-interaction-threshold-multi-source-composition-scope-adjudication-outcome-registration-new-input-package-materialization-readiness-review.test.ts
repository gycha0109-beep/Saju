import { describe, expect, test } from 'vitest';
import {
  I149_REQUIRED_V2_PACKAGE_COMPONENTS,
  I149_TARGET_INPUT_PACKAGE_VERSION,
  buildI149ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeAdjudicationOutcomeRegistrationNewInputPackageMaterializationReadinessReview,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetEvidenceRebindingAdjudicationInputMaterializationRecordReport,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeCompatibilityAdjudicationRecordReport,
} from '../src/index.js';

const evidenceIds = ['e1', 'e2', 'e3', 'e4', 'e5', 'e6'] as const;

function i148(
  overrides: Record<string, unknown> = {},
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeCompatibilityAdjudicationRecordReport {
  const adjudicationResults = evidenceIds.map((evidenceId, index) =>
    index === 5
      ? {
          evidenceId,
          candidateId: `c${index + 1}`,
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
          candidateId: `c${index + 1}`,
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
  const base = {
    adjudicationRecordId: 'i148_i149_fixture',
    adjudicationRecordVersion: 'v1',
    status:
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_SCOPE_COMPATIBILITY_ADJUDICATION_RECORD',
    decision:
      'FIVE_VISIBLE_STEM_SCOPE_INPUTS_COMPATIBLE_SCOPE_ONLY_ONE_GENERIC_FORCE_INPUT_REJECTED_NO_REQUIREMENT_SATISFACTION_NO_REEVALUATION',
    upstreamI147ReviewId: 'i147_fixture',
    upstreamI143RecordId: 'i143_i149_fixture',
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    adoptionId: 'adoption_fixture',
    candidateSetVersion: 'v1-candidate-set',
    candidateSetId: 'candidate_set_fixture',
    sourceInputPackageVersion: 'v1-input-package',
    sourceInputPackageId: 'input_package_fixture',
    exactI147ReadinessAccepted: true,
    exactI143ScopePackageAccepted: true,
    readinessAndPackageIdentityMatch: true,
    adjudicationResults,
    adjudicationResultCount: 6,
    compatibleScopeOnlyCount: 5,
    rejectedScopeMismatchCount: 1,
    unresolvedScopeCount: 0,
    scopeCompatibilityFullyAdjudicated: true,
    allAcceptedScopeResultsRemainNonSatisfactionFindings: true,
    genericForceSubstitutionRejected: true,
    qualitativeForceToBinaryEligibilitySubstitutionPerformed: false,
    hiddenStemAuthorityBorrowingPerformed: false,
    sourceInputPackageMutatedByThisGate: false,
    scopeAdjudicationArtifactCreatedByThisGate: true,
    scopeAdjudicationArtifactRegisteredIntoNewPackageByThisGate: false,
    requirementCoverageRecomputedByThisGate: false,
    provenanceIndependenceAdjudicatedByThisGate: false,
    semanticBridgeAdjudicatedByThisGate: false,
    contradictionAdjudicatedByThisGate: false,
    candidateSetReevaluationAuthorizedByThisGate: false,
    candidateSetReevaluationPerformedByThisGate: false,
    consumedI145EvaluationAuthorizationReusable: false,
    newRegisteredPackageRequiredForReevaluation: true,
    newEvaluationAuthorizationRequiredForReevaluation: true,
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
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_SCOPE_ADJUDICATION_OUTCOME_REGISTRATION_NEW_INPUT_PACKAGE_MATERIALIZATION_READINESS_REVIEW',
    notes: [],
  };
  return { ...base, ...overrides } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeCompatibilityAdjudicationRecordReport;
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
    basis: 'fixture',
  }));
  const provenanceIndependenceInputs = evidenceIds.map((evidenceId, index) => ({
    evidenceId,
    provenanceIdentity: `p${index + 1}`,
    independenceState: 'UNRESOLVED',
    dependencyLinks: [],
    basis: 'fixture',
    numericWeight: null,
  }));
  const semanticBridgeInputs = ['b1', 'b2', 'b3'].map((bridgeId) => ({
    bridgeId,
    fromTerm: 'source',
    toTerm: 'target',
    scope: 'VISIBLE_HEAVENLY_STEM_KE_BINARY_EFFECTIVE_INTERACTION_ELIGIBILITY',
    bridgeState: 'UNRESOLVED',
    authorityEvidenceIds: ['e1'],
    lexicalSimilarityIsNotAuthority: true,
  }));
  const contradictionInputs = ['x1', 'x2'].map((contradictionId) => ({
    contradictionId,
    evidenceIds: ['e1', 'e2'],
    conflictDescription: 'fixture',
    resolutionState: 'UNRESOLVED',
    precedenceBasis: null,
    numericVoteOrWeightUsed: false,
  }));
  const base = {
    recordId: 'i143_i149_fixture',
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
    requirementOwnershipBindings: [],
    requirementOwnershipBindingCount: 6,
    scopeCompatibilityInputs,
    provenanceIndependenceInputs,
    semanticBridgeInputs,
    contradictionInputs,
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

describe('I149 scope adjudication outcome registration and new input package materialization readiness review', () => {
  test('establishes readiness for a separate prospective v2 package materialization contract only', () => {
    const report = buildI149ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeAdjudicationOutcomeRegistrationNewInputPackageMaterializationReadinessReview(i148(), i143());
    expect(report.status).toBe(
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_SCOPE_ADJUDICATION_OUTCOME_REGISTRATION_NEW_INPUT_PACKAGE_MATERIALIZATION_READINESS_REVIEW',
    );
    expect(report.decision).toBe(
      'SCOPE_ADJUDICATION_OUTCOME_READY_FOR_SEPARATE_V2_INPUT_PACKAGE_PROSPECTIVE_MATERIALIZATION_CONTRACT_NO_PACKAGE_CREATED_NO_REEVALUATION',
    );
    expect(report.v2PackageMaterializationReadinessEstablished).toBe(true);
    expect(report.separateV2ProspectiveMaterializationContractMayProceed).toBe(true);
    expect(report.targetInputPackageVersion).toBe(I149_TARGET_INPUT_PACKAGE_VERSION);
    expect(report.targetInputPackageId).toBeNull();
  });

  test('freezes the exact ten required components for a future v2 package', () => {
    const report = buildI149ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeAdjudicationOutcomeRegistrationNewInputPackageMaterializationReadinessReview(i148(), i143());
    expect(report.requiredV2PackageComponents).toEqual(I149_REQUIRED_V2_PACKAGE_COMPONENTS);
    expect(report.requiredV2PackageComponentCount).toBe(10);
    expect(report.exactFiveScopeCompatibleOnlyResultsPresent).toBe(true);
    expect(report.exactOneGenericForceScopeRejectionPresent).toBe(true);
    expect(report.allSixScopeResultsRemainNonSatisfactionFindings).toBe(true);
  });

  test('requires audit retention while excluding the generic-force evidence from scope-dependent coverage', () => {
    const report = buildI149ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeAdjudicationOutcomeRegistrationNewInputPackageMaterializationReadinessReview(i148(), i143());
    expect(report.rejectedEvidenceRetainedForAuditInFuturePackage).toBe(true);
    expect(report.rejectedEvidenceExcludedFromScopeDependentCoverageInFuturePackage).toBe(true);
    expect(report.frozenCandidateSetMustRemainUnchangedInFuturePackage).toBe(true);
    expect(report.originalEvidenceBindingsMustRemainAuditableInFuturePackage).toBe(true);
    expect(report.originalRequirementOwnershipMustRemainNonSatisfactionBindingsInFuturePackage).toBe(true);
  });

  test('carries provenance, semantic bridge, and contradiction inputs forward unresolved', () => {
    const report = buildI149ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeAdjudicationOutcomeRegistrationNewInputPackageMaterializationReadinessReview(i148(), i143());
    expect(report.provenanceInputCountToCarryForward).toBe(6);
    expect(report.provenanceInputsMustRemainUnresolved).toBe(true);
    expect(report.semanticBridgeInputCountToCarryForward).toBe(3);
    expect(report.semanticBridgeInputsMustRemainUnresolved).toBe(true);
    expect(report.contradictionInputCountToCarryForward).toBe(2);
    expect(report.contradictionInputsMustRemainUnresolved).toBe(true);
  });

  test('does not create/register v2, mutate v1, recompute coverage, reuse authorization, or reevaluate', () => {
    const report = buildI149ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeAdjudicationOutcomeRegistrationNewInputPackageMaterializationReadinessReview(i148(), i143());
    expect(report.sourceV1PackageImmutable).toBe(true);
    expect(report.sourceV1PackageMutatedByThisGate).toBe(false);
    expect(report.scopeAdjudicationArtifactRegisteredByThisGate).toBe(false);
    expect(report.targetV2PackageCreatedByThisGate).toBe(false);
    expect(report.targetV2PackageRegisteredByThisGate).toBe(false);
    expect(report.requirementCoverageRecomputedByThisGate).toBe(false);
    expect(report.requirementSatisfactionAdjudicatedByThisGate).toBe(false);
    expect(report.candidateSetReevaluationAuthorizedByThisGate).toBe(false);
    expect(report.candidateSetReevaluationPerformedByThisGate).toBe(false);
    expect(report.consumedI145EvaluationAuthorizationReusable).toBe(false);
    expect(report.newEvaluationAuthorizationRequiredAfterV2Registration).toBe(true);
  });

  test('preserves all production, composition, threshold, classification, numeric, and hidden-stem guards', () => {
    const report = buildI149ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeAdjudicationOutcomeRegistrationNewInputPackageMaterializationReadinessReview(i148(), i143());
    expect(report.candidateSetAdmissibilityEstablishedByThisGate).toBe(false);
    expect(report.productionPolicyExecutionAuthorized).toBe(false);
    expect(report.actualCompositionPerformedByThisGate).toBe(false);
    expect(report.multiSourceCompositionAuthorized).toBe(false);
    expect(report.authorityAcquiredByThisGate).toBe(false);
    expect(report.visibleStemBinaryEffectiveInteractionEligibilityResolved).toBe(false);
    expect(report.thresholdRuleCreatedByThisGate).toBe(false);
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
    expect(report.hiddenStemInteractionEligibilityGapRemains).toBe(true);
  });

  test('fails closed on adjudication/source-package identity drift or altered I148 semantics', () => {
    const drifted = buildI149ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeAdjudicationOutcomeRegistrationNewInputPackageMaterializationReadinessReview(
      i148({ upstreamI143RecordId: 'different_record' }),
      i143(),
    );
    expect(drifted.status).toBe('I148_SCOPE_ADJUDICATION_OR_I143_SOURCE_PACKAGE_INVALID');
    expect(drifted.v2PackageMaterializationReadinessEstablished).toBe(false);

    const source = i148();
    const mutatedResults = source.adjudicationResults.map((result, index) =>
      index === 5 ? { ...result, scopeEligibleForLaterRequirementCoverage: true } : result,
    );
    const mutated = buildI149ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeAdjudicationOutcomeRegistrationNewInputPackageMaterializationReadinessReview(
      i148({ adjudicationResults: mutatedResults }),
      i143(),
    );
    expect(mutated.exactI148ScopeAdjudicationAccepted).toBe(false);
    expect(mutated.separateV2ProspectiveMaterializationContractMayProceed).toBe(false);
  });

  test('fails closed if any carried-forward unresolved domain is prematurely resolved', () => {
    const source = i143();
    const resolvedBridge = source.semanticBridgeInputs.map((input, index) =>
      index === 0 ? { ...input, bridgeState: 'SUPPORTED' } : input,
    );
    const report = buildI149ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeAdjudicationOutcomeRegistrationNewInputPackageMaterializationReadinessReview(
      i148(),
      i143({ semanticBridgeInputs: resolvedBridge }),
    );
    expect(report.exactI143SourcePackageAccepted).toBe(false);
    expect(report.status).toBe('I148_SCOPE_ADJUDICATION_OR_I143_SOURCE_PACKAGE_INVALID');
    expect(report.targetV2PackageCreatedByThisGate).toBe(false);
    expect(report.recommendedNextGate).toBe(
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_SCOPE_COMPATIBILITY_ADJUDICATION_RECORD',
    );
  });
});
