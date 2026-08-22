import { describe, expect, test } from 'vitest';
import {
  buildI133ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionPolicyDefinitionAdequacyRegistrationReadinessReview,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionPolicyDefinitionContractReport,
} from '../src/index.js';

function policyDefinition() {
  return {
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    policyState: 'DEFINED_NOT_REGISTERED_NOT_ADOPTED',
    targetScope: 'VISIBLE_HEAVENLY_STEM_BINARY_EFFECTIVE_INTERACTION_ELIGIBILITY',
    requiredI118RequirementCount: 6,
    requiredI118RequirementIds: [
      'EXPLICIT_BINARY_EFFECTIVE_INTERACTION_SEMANTICS',
      'VISIBLE_STEM_POSITION_SCOPE_AND_POSITION_CLASS_APPLICABILITY',
      'QUALITATIVE_FORCE_VS_BINARY_ELIGIBILITY_SEPARATION',
      'WU_LI_BOUNDARY_SEMANTICS_AND_EXCEPTIONS',
      'CONTEXT_AND_EXCEPTION_CONDITIONS',
      'INDEPENDENT_NORMATIVE_PROVENANCE',
    ],
    evidenceBindingProcedure: {
      exactSourceIdentityRequired: true,
      stableWitnessOrReproducibleLocatorRequired: true,
      explicitOwnedI118RequirementIdsRequired: true,
      sameWorkAlternateWitnessRequiresIdentityResolution: true,
      unstatedRequirementBorrowingAllowed: false,
      prePolicyCoverageGrandfatheringAllowed: false,
      priorEvidenceMustBeReboundUnderRegisteredPolicy: true,
    },
    semanticBridgeAdjudicationProcedure: {
      explicitBridgeAuthorityRequired: true,
      sourceTermRequired: true,
      targetTermRequired: true,
      authorityEvidenceBindingRequired: true,
      applicableScopeRequired: true,
      lexicalSimilaritySufficient: false,
      directionalConsistencySufficient: false,
      modelSynthesisSufficient: false,
      defaultWhenBridgeAbsent: 'REJECT_COMPOSED_SEMANTIC_EQUIVALENCE',
    },
    contradictionAdjudicationProcedure: {
      materialContradictionFailsClosed: true,
      explicitAdjudicationRuleRequired: true,
      adjudicationRuleVersionRequired: true,
      numericSourceWeightingAllowed: false,
      provenanceTierWeightingAllowed: false,
      sourceCountWeightingAllowed: false,
      majorityVoteAllowedByDefault: false,
      defaultWhenUnresolved: 'REJECT_CANDIDATE_SET_ADMISSIBILITY',
    },
    scopeCompatibilityDecisionProcedure: {
      requiredRelationKind: 'KE',
      requiredSurface: 'VISIBLE_HEAVENLY_STEM',
      positionAndContextCompatibilityMustBeExplicit: true,
      hiddenStemAuthorityBorrowingAllowed: false,
      genericStemForceSubstitutionAllowed: false,
      qualitativePositionForceSubstitutionForBinaryEligibilityAllowed: false,
      defaultWhenScopeMismatch: 'REJECT_REQUIREMENT_COVERAGE',
    },
    provenanceIndependenceDecisionProcedure: {
      independentNormativeProvenanceRequired: true,
      derivativeRetransmissionCountsAsIndependentAuthority: false,
      sourceClassAloneSufficient: false,
      provenanceTierMayBecomeNumericWeight: false,
      sourceCountMayBecomeNumericWeight: false,
      explicitDerivativeRelationshipCheckRequired: true,
      defaultWhenIndependenceUnresolved: 'REJECT_INDEPENDENCE_CLAIM',
    },
    failClosedAcceptanceEvaluationAlgorithm: [
      'POLICY_REGISTRATION_CHECK',
      'EVIDENCE_BINDING_INTEGRITY_CHECK',
      'REQUIREMENT_OWNERSHIP_CHECK',
      'SCOPE_COMPATIBILITY_CHECK',
      'PROVENANCE_INDEPENDENCE_CHECK',
      'SEMANTIC_BRIDGE_RESOLUTION_CHECK',
      'CONTRADICTION_RESOLUTION_CHECK',
      'FULL_SIX_REQUIREMENT_SATISFACTION_CHECK',
      'CANDIDATE_SET_ADMISSIBILITY_DECISION',
    ].map((stepId, index) => ({ stepId, order: index + 1, mandatory: true, failClosed: true })),
    prospectiveRegistrationAndChangeControl: {
      policyDefinitionMustBeRegisteredBeforeCandidateEvaluation: true,
      registrationMustBindPolicyIdAndVersion: true,
      policyChangeRequiresNewVersion: true,
      retroactiveCoverageReclassificationAllowed: false,
      retroactiveComplementarityPromotionAllowed: false,
      priorCandidateCoverageGrandfatheringAllowed: false,
      evidenceRebindingRequiredAfterPolicyVersionChange: true,
    },
    candidateSetAdmissibilityDoesNotEqualThresholdAuthority: true,
    candidateSetAdmissibilityRequiresSeparateGovernedEvaluation: true,
  };
}

function i132(
  overrides: Record<string, unknown> = {},
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionPolicyDefinitionContractReport {
  const base = {
    contractId: 'i132_i133_fixture',
    contractVersion: 'fixture',
    status: 'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_POLICY_DEFINITION_CONTRACT',
    decision: 'VERSIONED_MULTI_SOURCE_COMPOSITION_POLICY_DEFINITION_CONTRACT_FROZEN_NOT_REGISTERED_NOT_ADOPTED_NOT_EXECUTABLE',
    upstreamI131ReviewId: 'i131_fixture',
    policyDefinition: policyDefinition(),
    i131MissingArtifactCountAccepted: 8,
    versionedPolicyDefinitionObjectDefined: true,
    candidateSetEvidenceBindingProcedureDefined: true,
    semanticBridgeAdjudicationProcedureDefined: true,
    contradictionAdjudicationProcedureDefined: true,
    scopeCompatibilityDecisionProcedureDefined: true,
    provenanceIndependenceDecisionProcedureDefined: true,
    failClosedAcceptanceEvaluationAlgorithmDefined: true,
    prospectiveRegistrationAndChangeControlDefined: true,
    allEightI131MissingArtifactsStructurallyDefined: true,
    definitionContractComplete: true,
    policyDefinitionFrozenByThisGate: true,
    policyProspectivelyRegisteredByThisGate: false,
    policyAdoptedByThisGate: false,
    policyExecutableByThisGate: false,
    policyRegistrationAuthorizedByThisGate: false,
    policyAdoptionAuthorizedByThisGate: false,
    candidateRegistrationPerformedByThisGate: false,
    candidateSetEvaluationPerformedByThisGate: false,
    candidateSetEvaluationAuthorizedByThisGate: false,
    actualCompositionPerformedByThisGate: false,
    crossCandidateCompositionAuthorized: false,
    multiSourceCompositionAuthorized: false,
    semanticEquivalenceAuthorizedByDefault: false,
    currentWuHuaiyunCoverageGrandfathered: false,
    priorCandidateCoverageGrandfathered: false,
    preRegistrationCandidateEvaluationAllowed: false,
    candidateSetAdmissibilityWouldAuthorizeThresholdAutomatically: false,
    singleCandidateFullSixContractRemainsNormativeDefault: true,
    continuedSingleCandidateDiscoveryStillPermitted: true,
    authorityAcquiredByThisGate: false,
    visibleStemBinaryEffectiveInteractionEligibilityResolved: false,
    effectiveInteractionSetResolved: false,
    thresholdRuleCreatedByThisGate: false,
    damageEvaluationAuthorized: false,
    i98KeDamageVocabularyEvaluationResolved: false,
    i98ResearchMethodologyMaterializationAuthorized: false,
    hiddenStemInteractionEligibilityGapRemains: true,
    hiddenStemAuthorityGap: 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED',
    methodologyDefinitionCreatedByThisGate: false,
    ruleDefinitionCreatedByThisGate: false,
    registrySnapshotMutatedByThisGate: false,
    reviewAttestationCreatedByThisGate: false,
    noTrackedRelationTouchSemanticsRemainUnchanged: true,
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    recommendedNextGate: 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_POLICY_DEFINITION_ADEQUACY_AND_REGISTRATION_READINESS_REVIEW',
    notes: [],
  };
  return { ...base, ...overrides } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionPolicyDefinitionContractReport;
}

describe('I133 source 克 visible-stem threshold composition policy registration readiness', () => {
  test('finds I132 definition structurally adequate for a separate registration contract', () => {
    const report = buildI133ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionPolicyDefinitionAdequacyRegistrationReadinessReview(i132());
    expect(report.status).toBe('RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_POLICY_DEFINITION_ADEQUACY_REGISTRATION_READINESS_REVIEW');
    expect(report.decision).toBe('I132_POLICY_DEFINITION_STRUCTURALLY_ADEQUATE_FOR_PROSPECTIVE_REGISTRATION_CONTRACT_NO_POLICY_REGISTERED_OR_ADOPTED');
    expect(report.definitionAdequateForProspectiveRegistration).toBe(true);
    expect(report.prospectiveRegistrationReadinessEstablished).toBe(true);
    expect(report.prospectiveRegistrationContractMayProceed).toBe(true);
    expect(report.policyDefinitionMutationRequiredBeforeRegistration).toBe(false);
  });

  test('preserves the exact policy identity and defined-not-registered state', () => {
    const report = buildI133ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionPolicyDefinitionAdequacyRegistrationReadinessReview(i132());
    expect(report.policyId).toBe('myeonghwa-visible-stem-ke-multi-source-composition-policy');
    expect(report.policyVersion).toBe('v1-definition');
    expect(report.policyStateObserved).toBe('DEFINED_NOT_REGISTERED_NOT_ADOPTED');
    expect(report.i132DefinitionContractAccepted).toBe(true);
    expect(report.allEightI131ArtifactsStructurallyDefined).toBe(true);
    expect(report.sixI118RequirementsExplicitlyBoundInDefinition).toBe(true);
  });

  test('accepts evidence binding and semantic bridge safeguards as registration-adequate', () => {
    const report = buildI133ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionPolicyDefinitionAdequacyRegistrationReadinessReview(i132());
    expect(report.evidenceBindingProcedureAdequate).toBe(true);
    expect(report.semanticBridgeProcedureAdequate).toBe(true);
  });

  test('accepts contradiction, scope, and provenance procedures only in fail-closed non-numeric form', () => {
    const report = buildI133ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionPolicyDefinitionAdequacyRegistrationReadinessReview(i132());
    expect(report.contradictionProcedureAdequate).toBe(true);
    expect(report.scopeCompatibilityProcedureAdequate).toBe(true);
    expect(report.provenanceIndependenceProcedureAdequate).toBe(true);
  });

  test('verifies the nine-step mandatory fail-closed algorithm and separates admissibility from threshold authority', () => {
    const report = buildI133ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionPolicyDefinitionAdequacyRegistrationReadinessReview(i132());
    expect(report.failClosedEvaluationAlgorithmAdequate).toBe(true);
    expect(report.nineStepEvaluationOrderVerified).toBe(true);
    expect(report.candidateSetAdmissibilitySeparatedFromThresholdAuthority).toBe(true);
  });

  test('requires prospective registration and change control before any candidate evidence evaluation', () => {
    const report = buildI133ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionPolicyDefinitionAdequacyRegistrationReadinessReview(i132());
    expect(report.prospectiveRegistrationChangeControlAdequate).toBe(true);
    expect(report.candidateEvidenceRequiredBeforePolicyRegistration).toBe(false);
    expect(report.registrationReadinessDoesNotEqualPolicyAdoptionReadiness).toBe(true);
    expect(report.registrationReadinessDoesNotAuthorizeCandidateEvaluation).toBe(true);
    expect(report.registrationReadinessDoesNotAuthorizeComposition).toBe(true);
  });

  test('keeps registration, adoption, execution, composition, authority, classification, and scoring closed', () => {
    const first = buildI133ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionPolicyDefinitionAdequacyRegistrationReadinessReview(i132());
    const second = buildI133ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionPolicyDefinitionAdequacyRegistrationReadinessReview(i132());
    expect(first.reviewId).toBe(second.reviewId);
    expect(first.policyRegistrationAuthorizedByThisGate).toBe(false);
    expect(first.policyRegistrationPerformedByThisGate).toBe(false);
    expect(first.policyAdoptionAuthorizedByThisGate).toBe(false);
    expect(first.policyAdoptedByThisGate).toBe(false);
    expect(first.policyExecutableByThisGate).toBe(false);
    expect(first.candidateSetEvaluationAuthorizedByThisGate).toBe(false);
    expect(first.actualCompositionPerformedByThisGate).toBe(false);
    expect(first.currentWuHuaiyunCoverageGrandfathered).toBe(false);
    expect(first.singleCandidateFullSixContractRemainsNormativeDefault).toBe(true);
    expect(first.authorityAcquiredByThisGate).toBe(false);
    expect(first.visibleStemBinaryEffectiveInteractionEligibilityResolved).toBe(false);
    expect(first.classificationAuthorized).toBe(false);
    expect(first.numericScoringAuthorized).toBe(false);
    expect(first.recommendedNextGate).toBe('UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_POLICY_PROSPECTIVE_REGISTRATION_CONTRACT');
  });

  test('fails closed if I132 is changed to claim pre-registration policy state', () => {
    const changed = i132({ policyDefinition: { ...policyDefinition(), policyState: 'REGISTERED' } });
    const report = buildI133ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionPolicyDefinitionAdequacyRegistrationReadinessReview(changed);
    expect(report.status).toBe('I132_UNRESOLVED_OR_INVALID');
    expect(report.decision).toBe('MULTI_SOURCE_COMPOSITION_POLICY_REGISTRATION_READINESS_NOT_ESTABLISHED');
    expect(report.policyId).toBeNull();
    expect(report.definitionAdequateForProspectiveRegistration).toBe(false);
    expect(report.prospectiveRegistrationReadinessEstablished).toBe(false);
    expect(report.prospectiveRegistrationContractMayProceed).toBe(false);
    expect(report.recommendedNextGate).toBe('UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_POLICY_DEFINITION_CONTRACT');
  });
});
