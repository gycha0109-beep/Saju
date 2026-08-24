import { describe, expect, test } from 'vitest';
import {
  I149_REQUIRED_V2_PACKAGE_COMPONENTS,
  I149_TARGET_INPUT_PACKAGE_VERSION,
  I150_V2_MATERIALIZATION_RULE_IDS,
  buildI150ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeAdjudicatedV2InputPackageProspectiveMaterializationContract,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeAdjudicationOutcomeRegistrationNewInputPackageMaterializationReadinessReviewReport,
} from '../src/index.js';

function i149(
  overrides: Record<string, unknown> = {},
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeAdjudicationOutcomeRegistrationNewInputPackageMaterializationReadinessReviewReport {
  const base = {
    reviewId: 'i149_i150_fixture',
    reviewVersion: 'v1',
    status:
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_SCOPE_ADJUDICATION_OUTCOME_REGISTRATION_NEW_INPUT_PACKAGE_MATERIALIZATION_READINESS_REVIEW',
    decision:
      'SCOPE_ADJUDICATION_OUTCOME_READY_FOR_SEPARATE_V2_INPUT_PACKAGE_PROSPECTIVE_MATERIALIZATION_CONTRACT_NO_PACKAGE_CREATED_NO_REEVALUATION',
    upstreamI148AdjudicationRecordId: 'i148_i150_fixture',
    upstreamI143RecordId: 'i143_i150_fixture',
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    adoptionId: 'adoption_fixture',
    candidateSetVersion: 'v1-candidate-set',
    candidateSetId: 'candidate_set_fixture',
    sourceInputPackageVersion: 'v1-input-package',
    sourceInputPackageId: 'input_package_fixture',
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

describe('I150 scope-adjudicated v2 input package prospective materialization contract', () => {
  test('freezes exact prospective v2 materialization authorization without creating the package', () => {
    const report = buildI150ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeAdjudicatedV2InputPackageProspectiveMaterializationContract(i149());

    expect(report.status).toBe(
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_SCOPE_ADJUDICATED_V2_INPUT_PACKAGE_PROSPECTIVE_MATERIALIZATION_CONTRACT',
    );
    expect(report.decision).toBe(
      'EXACT_V2_INPUT_PACKAGE_PROSPECTIVE_MATERIALIZATION_RULES_FROZEN_NO_PACKAGE_CREATED_NO_EVALUATION_AUTHORIZED',
    );
    expect(report.exactI149ReadinessAccepted).toBe(true);
    expect(report.packageMaterializationAuthorizedByThisGate).toBe(true);
    expect(report.packageRegistrationAuthorizedByThisGate).toBe(true);
    expect(report.packageCreatedByThisGate).toBe(false);
    expect(report.packageRegisteredByThisGate).toBe(false);
  });

  test('preserves the exact ten I149 package components and target package state', () => {
    const report = buildI150ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeAdjudicatedV2InputPackageProspectiveMaterializationContract(i149());

    expect(report.requiredV2PackageComponents).toEqual(I149_REQUIRED_V2_PACKAGE_COMPONENTS);
    expect(report.requiredV2PackageComponentCount).toBe(10);
    expect(report.targetInputPackageVersion).toBe('v2-input-package');
    expect(report.targetInputPackageStateWhenMaterialized).toBe('REGISTERED_NOT_EVALUATED');
  });

  test('freezes the exact thirteen materialization rules in order', () => {
    const report = buildI150ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeAdjudicatedV2InputPackageProspectiveMaterializationContract(i149());

    expect(report.materializationRuleIds).toEqual(I150_V2_MATERIALIZATION_RULE_IDS);
    expect(report.materializationRuleCount).toBe(13);
    expect(report.materializationRuleIds).toEqual([
      'BIND_EXACT_I143_V1_SOURCE_PACKAGE',
      'BIND_EXACT_I148_SCOPE_ADJUDICATION_ARTIFACT',
      'PRESERVE_EXACT_FROZEN_V1_CANDIDATE_SET',
      'GENERATE_DETERMINISTIC_NEW_V2_PACKAGE_IDENTITY',
      'PRESERVE_V1_PACKAGE_IMMUTABILITY',
      'PRESERVE_ORIGINAL_EVIDENCE_BINDINGS_FOR_AUDIT',
      'PRESERVE_ORIGINAL_REQUIREMENT_OWNERSHIP_AS_NON_SATISFACTION_BINDINGS',
      'REGISTER_ALL_SIX_I148_SCOPE_RESULTS',
      'RETAIN_SCOPE_REJECTED_EVIDENCE_FOR_AUDIT_BUT_EXCLUDE_SCOPE_DEPENDENT_COVERAGE',
      'CARRY_SIX_PROVENANCE_INPUTS_UNRESOLVED',
      'CARRY_THREE_SEMANTIC_BRIDGE_INPUTS_UNRESOLVED',
      'CARRY_TWO_CONTRADICTION_INPUTS_UNRESOLVED',
      'REGISTER_V2_AS_NOT_EVALUATED_WITHOUT_EVALUATION_AUTHORIZATION',
    ]);
  });

  test('preserves scope adjudication semantics without converting scope compatibility into satisfaction', () => {
    const report = buildI150ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeAdjudicatedV2InputPackageProspectiveMaterializationContract(i149());

    expect(report.expectedScopeCompatibleOnlyCount).toBe(5);
    expect(report.expectedScopeRejectedCount).toBe(1);
    expect(report.scopeRejectedEvidenceMustRemainAuditable).toBe(true);
    expect(report.scopeRejectedEvidenceMustBeIneligibleForScopeDependentCoverage).toBe(true);
    expect(report.scopeCompatibleEvidenceDoesNotEqualRequirementSatisfaction).toBe(true);
    expect(report.scopeCompatibleEvidenceDoesNotEqualBinaryEligibility).toBe(true);
    expect(report.requirementSatisfactionAdjudicatedByThisGate).toBe(false);
  });

  test('carries unresolved provenance, semantic bridges, and contradictions forward unchanged', () => {
    const report = buildI150ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeAdjudicatedV2InputPackageProspectiveMaterializationContract(i149());

    expect(report.provenanceInputsRequiredUnresolvedCount).toBe(6);
    expect(report.semanticBridgeInputsRequiredUnresolvedCount).toBe(3);
    expect(report.contradictionInputsRequiredUnresolvedCount).toBe(2);
    expect(report.provenanceIndependenceAdjudicatedByThisGate).toBe(false);
    expect(report.semanticBridgeAdjudicatedByThisGate).toBe(false);
    expect(report.contradictionAdjudicatedByThisGate).toBe(false);
  });

  test('requires a new evaluation authorization after v2 registration and performs no evaluation', () => {
    const report = buildI150ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeAdjudicatedV2InputPackageProspectiveMaterializationContract(i149());

    expect(report.consumedI145EvaluationAuthorizationReusable).toBe(false);
    expect(report.newEvaluationAuthorizationRequiredAfterV2Registration).toBe(true);
    expect(report.candidateSetEvaluationAuthorizedByThisGate).toBe(false);
    expect(report.candidateSetEvaluationPerformedByThisGate).toBe(false);
    expect(report.candidateSetAdmissibilityEstablishedByThisGate).toBe(false);
  });

  test('preserves all production, composition, threshold, classification, numeric, and hidden-stem guards', () => {
    const report = buildI150ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeAdjudicatedV2InputPackageProspectiveMaterializationContract(i149());

    expect(report.productionPolicyExecutionAuthorized).toBe(false);
    expect(report.actualCompositionPerformedByThisGate).toBe(false);
    expect(report.multiSourceCompositionAuthorized).toBe(false);
    expect(report.authorityAcquiredByThisGate).toBe(false);
    expect(report.visibleStemBinaryEffectiveInteractionEligibilityResolved).toBe(false);
    expect(report.thresholdRuleCreatedByThisGate).toBe(false);
    expect(report.damageEvaluationAuthorized).toBe(false);
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
    expect(report.hiddenStemInteractionEligibilityGapRemains).toBe(true);
    expect(report.hiddenStemAuthorityGap).toBe(
      'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED',
    );
  });

  test('fails closed when any exact I149 readiness invariant is mutated', () => {
    const report = buildI150ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeAdjudicatedV2InputPackageProspectiveMaterializationContract(
      i149({ semanticBridgeInputsMustRemainUnresolved: false }),
    );

    expect(report.status).toBe('I149_V2_PACKAGE_MATERIALIZATION_READINESS_INVALID');
    expect(report.decision).toBe('V2_INPUT_PACKAGE_PROSPECTIVE_MATERIALIZATION_NOT_AUTHORIZED');
    expect(report.exactI149ReadinessAccepted).toBe(false);
    expect(report.packageMaterializationAuthorizedByThisGate).toBe(false);
    expect(report.packageRegistrationAuthorizedByThisGate).toBe(false);
    expect(report.upstreamI148AdjudicationRecordId).toBeNull();
    expect(report.upstreamI143RecordId).toBeNull();
  });
});
