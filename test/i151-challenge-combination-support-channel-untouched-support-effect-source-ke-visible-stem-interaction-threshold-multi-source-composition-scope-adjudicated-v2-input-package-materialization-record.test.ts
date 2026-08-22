import { describe, expect, test } from 'vitest';
import {
  I143_I118_REQUIREMENT_IDS,
  I149_REQUIRED_V2_PACKAGE_COMPONENTS,
  I149_TARGET_INPUT_PACKAGE_VERSION,
  buildI150ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeAdjudicatedV2InputPackageProspectiveMaterializationContract,
  buildI151ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeAdjudicatedV2InputPackageMaterializationRecord,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetEvidenceRebindingAdjudicationInputMaterializationRecordReport,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeAdjudicationOutcomeRegistrationNewInputPackageMaterializationReadinessReviewReport,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeAdjudicatedV2InputPackageProspectiveMaterializationContractReport,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeCompatibilityAdjudicationRecordReport,
} from '../src/index.js';

const candidateIds = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'] as const;
const evidenceIds = ['e1', 'e2', 'e3', 'e4', 'e5', 'e6'] as const;

function i143(
  overrides: Record<string, unknown> = {},
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetEvidenceRebindingAdjudicationInputMaterializationRecordReport {
  const evidenceRebindingRecords = evidenceIds.map((evidenceId, index) => ({
    evidenceId,
    candidateId: candidateIds[index] as string,
    sourceId: `s${index + 1}`,
    witnessId: `w${index + 1}`,
    locator: `locator-${index + 1}`,
    observation: `observation-${index + 1}`,
    i118RequirementIds: [I143_I118_REQUIREMENT_IDS[index] as (typeof I143_I118_REQUIREMENT_IDS)[number]],
    bindingState: 'REGISTERED_INPUT_NOT_ADJUDICATED' as const,
  }));
  const requirementOwnershipBindings = I143_I118_REQUIREMENT_IDS.map((requirementId, index) => ({
    i118RequirementId: requirementId,
    owningEvidenceIds: [evidenceIds[index] as string],
    ownershipBasis: `ownership-${index + 1}`,
    satisfactionFindingMade: false as const,
  }));
  const scopeCompatibilityInputs = evidenceIds.map((evidenceId, index) => ({
    evidenceId,
    targetScope: 'VISIBLE_HEAVENLY_STEM_KE_BINARY_EFFECTIVE_INTERACTION_ELIGIBILITY' as const,
    positionClass:
      index === 5 ? ('GENERAL_VISIBLE_STEM_FORCE_CONTEXT' as const) : ('VISIBLE_STEM_POSITION_CLASS' as const),
    compatibilityState: 'UNRESOLVED' as const,
    basis: `scope-${index + 1}`,
  }));
  const provenanceIndependenceInputs = evidenceIds.map((evidenceId, index) => ({
    evidenceId,
    provenanceIdentity: `p${index + 1}`,
    independenceState: 'UNRESOLVED' as const,
    dependencyLinks: [],
    basis: `provenance-${index + 1}`,
    numericWeight: null,
  }));
  const semanticBridgeInputs = ['b1', 'b2', 'b3'].map((bridgeId) => ({
    bridgeId,
    fromTerm: 'source',
    toTerm: 'target',
    scope: 'VISIBLE_HEAVENLY_STEM_KE_BINARY_EFFECTIVE_INTERACTION_ELIGIBILITY' as const,
    bridgeState: 'UNRESOLVED' as const,
    authorityEvidenceIds: ['e1'],
    lexicalSimilarityIsNotAuthority: true as const,
  }));
  const contradictionInputs = ['x1', 'x2'].map((contradictionId) => ({
    contradictionId,
    evidenceIds: ['e1', 'e2'],
    conflictDescription: `conflict-${contradictionId}`,
    resolutionState: 'UNRESOLVED' as const,
    precedenceBasis: null,
    numericVoteOrWeightUsed: false as const,
  }));

  const base = {
    recordId: 'i143_i151_fixture',
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
    inputPackageId: 'input_package_v1_fixture',
    inputPackageState: 'REGISTERED_NOT_EVALUATED',
    exactI142ReadinessAccepted: true,
    candidateManifest: {
      candidateSetId: 'candidate_set_fixture',
      candidateSetVersion: 'v1-candidate-set',
      adoptionId: 'adoption_fixture',
      candidateIds,
      candidateCount: 6,
      frozen: true,
    },
    witnessIdentityBindings: [],
    witnessIdentityBindingCount: 0,
    evidenceRebindingRecords,
    evidenceRebindingRecordCount: 6,
    requirementOwnershipBindings,
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

function i148(
  source: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetEvidenceRebindingAdjudicationInputMaterializationRecordReport,
  overrides: Record<string, unknown> = {},
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeCompatibilityAdjudicationRecordReport {
  const adjudicationResults = evidenceIds.map((evidenceId, index) =>
    index === 5
      ? {
          evidenceId,
          candidateId: candidateIds[index] as string,
          inputPositionClass: 'GENERAL_VISIBLE_STEM_FORCE_CONTEXT' as const,
          adjudicationState: 'REJECTED_SCOPE_MISMATCH_GENERIC_FORCE_CONTEXT' as const,
          scopeEligibleForLaterRequirementCoverage: false,
          reason:
            'GENERIC_VISIBLE_STEM_FORCE_CONTEXT_CANNOT_SUBSTITUTE_FOR_VISIBLE_STEM_KE_BINARY_ELIGIBILITY' as const,
          requirementSatisfactionFindingMade: false as const,
          binaryEligibilityFindingMade: false as const,
          semanticBridgeFindingMade: false as const,
          contradictionResolutionMade: false as const,
        }
      : {
          evidenceId,
          candidateId: candidateIds[index] as string,
          inputPositionClass: 'VISIBLE_STEM_POSITION_CLASS' as const,
          adjudicationState: 'COMPATIBLE_SCOPE_ONLY_NO_REQUIREMENT_SATISFACTION_FINDING' as const,
          scopeEligibleForLaterRequirementCoverage: true,
          reason: 'EXACT_VISIBLE_STEM_KE_TARGET_AND_EXPLICIT_POSITION_SCOPE_OWNERSHIP_PRESENT' as const,
          requirementSatisfactionFindingMade: false as const,
          binaryEligibilityFindingMade: false as const,
          semanticBridgeFindingMade: false as const,
          contradictionResolutionMade: false as const,
        },
  );

  const base = {
    adjudicationRecordId: 'i148_i151_fixture',
    adjudicationRecordVersion: 'v1',
    status:
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_SCOPE_COMPATIBILITY_ADJUDICATION_RECORD',
    decision:
      'FIVE_VISIBLE_STEM_SCOPE_INPUTS_COMPATIBLE_SCOPE_ONLY_ONE_GENERIC_FORCE_INPUT_REJECTED_NO_REQUIREMENT_SATISFACTION_NO_REEVALUATION',
    upstreamI147ReviewId: 'i147_fixture',
    upstreamI143RecordId: source.recordId,
    policyId: source.policyId,
    policyVersion: source.policyVersion,
    adoptionVersion: source.adoptionVersion,
    adoptionId: source.adoptionId,
    candidateSetVersion: source.candidateSetVersion,
    candidateSetId: source.candidateSetId,
    sourceInputPackageVersion: source.inputPackageVersion,
    sourceInputPackageId: source.inputPackageId,
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

function i149(
  source: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetEvidenceRebindingAdjudicationInputMaterializationRecordReport,
  adjudication: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeCompatibilityAdjudicationRecordReport,
  overrides: Record<string, unknown> = {},
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeAdjudicationOutcomeRegistrationNewInputPackageMaterializationReadinessReviewReport {
  const base = {
    reviewId: 'i149_i151_fixture',
    reviewVersion: 'v1',
    status:
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_SCOPE_ADJUDICATION_OUTCOME_REGISTRATION_NEW_INPUT_PACKAGE_MATERIALIZATION_READINESS_REVIEW',
    decision:
      'SCOPE_ADJUDICATION_OUTCOME_READY_FOR_SEPARATE_V2_INPUT_PACKAGE_PROSPECTIVE_MATERIALIZATION_CONTRACT_NO_PACKAGE_CREATED_NO_REEVALUATION',
    upstreamI148AdjudicationRecordId: adjudication.adjudicationRecordId,
    upstreamI143RecordId: source.recordId,
    policyId: source.policyId,
    policyVersion: source.policyVersion,
    adoptionVersion: source.adoptionVersion,
    adoptionId: source.adoptionId,
    candidateSetVersion: source.candidateSetVersion,
    candidateSetId: source.candidateSetId,
    sourceInputPackageVersion: source.inputPackageVersion,
    sourceInputPackageId: source.inputPackageId,
    targetInputPackageVersion: I149_TARGET_INPUT_PACKAGE_VERSION,
    targetInputPackageId: null,
    exactI148ScopeAdjudicationAccepted: true,
    exactI143SourcePackageAccepted: true,
    adjudicationAndSourcePackageIdentityMatch: true,
    requiredV2PackageComponents: I149_REQUIRED_V2_PACKAGE_COMPONENTS,
    requiredV2PackageComponentCount: 10,
    exactFiveScopeCompatibleOnlyResultsPresent: true,
    exactOneGenericForceScopeRejectionPresent: true,
    allSixScopeResultsRemainNonSatisfactionFindings: true,
    rejectedEvidenceRetainedForAuditInFuturePackage: true,
    rejectedEvidenceExcludedFromScopeDependentCoverageInFuturePackage: true,
    frozenCandidateSetMustRemainUnchangedInFuturePackage: true,
    originalEvidenceBindingsMustRemainAuditableInFuturePackage: true,
    originalRequirementOwnershipMustRemainNonSatisfactionBindingsInFuturePackage: true,
    provenanceInputCountToCarryForward: 6,
    provenanceInputsMustRemainUnresolved: true,
    semanticBridgeInputCountToCarryForward: 3,
    semanticBridgeInputsMustRemainUnresolved: true,
    contradictionInputCountToCarryForward: 2,
    contradictionInputsMustRemainUnresolved: true,
    sourceV1PackageImmutable: true,
    sourceV1PackageMutatedByThisGate: false,
    scopeAdjudicationArtifactRegisteredByThisGate: false,
    targetV2PackageCreatedByThisGate: false,
    targetV2PackageRegisteredByThisGate: false,
    requirementCoverageRecomputedByThisGate: false,
    requirementSatisfactionAdjudicatedByThisGate: false,
    provenanceIndependenceAdjudicatedByThisGate: false,
    semanticBridgeAdjudicatedByThisGate: false,
    contradictionAdjudicatedByThisGate: false,
    candidateSetReevaluationAuthorizedByThisGate: false,
    candidateSetReevaluationPerformedByThisGate: false,
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
    v2PackageMaterializationReadinessEstablished: true,
    separateV2ProspectiveMaterializationContractMayProceed: true,
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_SCOPE_ADJUDICATED_V2_INPUT_PACKAGE_PROSPECTIVE_MATERIALIZATION_CONTRACT',
    notes: [],
  };

  return { ...base, ...overrides } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeAdjudicationOutcomeRegistrationNewInputPackageMaterializationReadinessReviewReport;
}

function i150(
  source: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetEvidenceRebindingAdjudicationInputMaterializationRecordReport,
  adjudication: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeCompatibilityAdjudicationRecordReport,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeAdjudicatedV2InputPackageProspectiveMaterializationContractReport {
  return buildI150ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeAdjudicatedV2InputPackageProspectiveMaterializationContract(
    i149(source, adjudication),
  );
}

function validInputs() {
  const source = i143();
  const adjudication = i148(source);
  const contract = i150(source, adjudication);
  return { source, adjudication, contract };
}

describe('I151 scope-adjudicated v2 input package materialization record', () => {
  test('materializes and registers one deterministic v2 package in not-evaluated state', () => {
    const { source, adjudication, contract } = validInputs();
    const report = buildI151ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeAdjudicatedV2InputPackageMaterializationRecord(
      contract,
      adjudication,
      source,
    );

    expect(report.status).toBe(
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_SCOPE_ADJUDICATED_V2_INPUT_PACKAGE_MATERIALIZATION_RECORD',
    );
    expect(report.decision).toBe(
      'DETERMINISTIC_V2_INPUT_PACKAGE_MATERIALIZED_AND_REGISTERED_WITH_SCOPE_RESULTS_AND_REMAINING_INPUTS_UNRESOLVED_NO_EVALUATION',
    );
    expect(report.targetInputPackageVersion).toBe('v2-input-package');
    expect(report.targetInputPackageState).toBe('REGISTERED_NOT_EVALUATED');
    expect(report.targetInputPackageId).not.toBeNull();
    expect(report.targetInputPackageId).not.toBe(source.inputPackageId);
    expect(report.targetPackageCreatedByThisGate).toBe(true);
    expect(report.targetPackageRegisteredByThisGate).toBe(true);
  });

  test('materializes exactly the ten frozen I149 components and immutable source references', () => {
    const { source, adjudication, contract } = validInputs();
    const report = buildI151ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeAdjudicatedV2InputPackageMaterializationRecord(
      contract,
      adjudication,
      source,
    );

    expect(report.materializedComponentIds).toEqual(I149_REQUIRED_V2_PACKAGE_COMPONENTS);
    expect(report.materializedComponentCount).toBe(10);
    expect(report.allTenRequiredComponentsMaterialized).toBe(true);
    expect(report.sourceV1PackageReference).toEqual({
      recordId: source.recordId,
      inputPackageId: source.inputPackageId,
      inputPackageVersion: 'v1-input-package',
      immutable: true,
    });
    expect(report.frozenV1CandidateSetReference?.candidateIds).toEqual(candidateIds);
    expect(report.frozenV1CandidateSetPreservedExact).toBe(true);
    expect(report.sourceV1PackageMutatedByThisGate).toBe(false);
  });

  test('retains original evidence and requirement ownership without promoting satisfaction', () => {
    const { source, adjudication, contract } = validInputs();
    const report = buildI151ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeAdjudicatedV2InputPackageMaterializationRecord(
      contract,
      adjudication,
      source,
    );

    expect(report.originalEvidenceRebindingRecords).toEqual(source.evidenceRebindingRecords);
    expect(report.originalEvidenceRebindingRecords).not.toBe(source.evidenceRebindingRecords);
    expect(report.originalRequirementOwnershipBindings).toEqual(source.requirementOwnershipBindings);
    expect(report.originalRequirementOwnershipBindings.every((binding) => !binding.satisfactionFindingMade)).toBe(true);
    expect(report.originalEvidenceBindingsPreservedForAudit).toBe(true);
    expect(report.originalRequirementOwnershipPreservedAsNonSatisfactionBindings).toBe(true);
    expect(report.requirementCoverageRecomputedByThisGate).toBe(false);
    expect(report.requirementSatisfactionAdjudicatedByThisGate).toBe(false);
  });

  test('registers five scope-compatible-only results and one auditable rejected generic-force result', () => {
    const { source, adjudication, contract } = validInputs();
    const report = buildI151ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeAdjudicatedV2InputPackageMaterializationRecord(
      contract,
      adjudication,
      source,
    );

    expect(report.scopeAdjudicationResults).toEqual(adjudication.adjudicationResults);
    expect(report.scopeAdjudicationResultCount).toBe(6);
    expect(report.scopeCompatibleOnlyCount).toBe(5);
    expect(report.scopeRejectedCount).toBe(1);
    expect(report.scopeEligibilityFlagCount).toBe(6);
    expect(report.scopeCoverageEligibilityFlags.filter((flag) => flag.scopeEligibleForRequirementCoverage)).toHaveLength(5);
    expect(report.scopeCoverageEligibilityFlags.filter((flag) => !flag.scopeEligibleForRequirementCoverage)).toHaveLength(1);
    expect(report.scopeRejectedEvidenceRetainedForAudit).toBe(true);
    expect(report.scopeRejectedEvidenceExcludedFromScopeDependentCoverage).toBe(true);
  });

  test('carries six provenance, three bridge, and two contradiction inputs forward unresolved', () => {
    const { source, adjudication, contract } = validInputs();
    const report = buildI151ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeAdjudicatedV2InputPackageMaterializationRecord(
      contract,
      adjudication,
      source,
    );

    expect(report.provenanceInputCount).toBe(6);
    expect(report.provenanceUnresolvedCount).toBe(6);
    expect(report.semanticBridgeInputCount).toBe(3);
    expect(report.semanticBridgeUnresolvedCount).toBe(3);
    expect(report.contradictionInputCount).toBe(2);
    expect(report.contradictionUnresolvedCount).toBe(2);
    expect(report.remainingUnresolvedInputsPreservedWithoutInference).toBe(true);
  });

  test('derives stable deterministic target identity without mutating the v1 substrate', () => {
    const { source, adjudication, contract } = validInputs();
    const before = JSON.stringify(source);
    const first = buildI151ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeAdjudicatedV2InputPackageMaterializationRecord(
      contract,
      adjudication,
      source,
    );
    const second = buildI151ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeAdjudicatedV2InputPackageMaterializationRecord(
      contract,
      adjudication,
      source,
    );

    expect(first.targetInputPackageId).toBe(second.targetInputPackageId);
    expect(first.recordId).toBe(second.recordId);
    expect(first.targetPackageIdentityDeterministic).toBe(true);
    expect(first.targetPackageIdentityDistinctFromSourceV1).toBe(true);
    expect(JSON.stringify(source)).toBe(before);
  });

  test('keeps evaluation, composition, threshold, production, numeric, and hidden-stem authority closed', () => {
    const { source, adjudication, contract } = validInputs();
    const report = buildI151ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeAdjudicatedV2InputPackageMaterializationRecord(
      contract,
      adjudication,
      source,
    );

    expect(report.candidateSetEvaluationAuthorizedByThisGate).toBe(false);
    expect(report.candidateSetEvaluationPerformedByThisGate).toBe(false);
    expect(report.consumedI145EvaluationAuthorizationReusable).toBe(false);
    expect(report.newEvaluationAuthorizationRequiredAfterV2Registration).toBe(true);
    expect(report.candidateSetAdmissibilityEstablishedByThisGate).toBe(false);
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

  test('fails closed when the frozen I150 rule sequence is mutated while rule count remains thirteen', () => {
    const { source, adjudication, contract } = validInputs();
    const mutated = {
      ...contract,
      materializationRuleIds: [
        'MUTATED_FIRST_RULE',
        ...contract.materializationRuleIds.slice(1),
      ],
    } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeAdjudicatedV2InputPackageProspectiveMaterializationContractReport;

    const report = buildI151ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeAdjudicatedV2InputPackageMaterializationRecord(
      mutated,
      adjudication,
      source,
    );

    expect(mutated.materializationRuleIds).toHaveLength(13);
    expect(report.status).toBe('I150_CONTRACT_OR_REGISTERED_SOURCE_ARTIFACTS_INVALID');
    expect(report.decision).toBe('V2_INPUT_PACKAGE_MATERIALIZATION_NOT_PERFORMED');
    expect(report.exactI150ContractAccepted).toBe(false);
    expect(report.targetInputPackageId).toBeNull();
    expect(report.targetPackageCreatedByThisGate).toBe(false);
    expect(report.targetPackageRegisteredByThisGate).toBe(false);
  });
});
