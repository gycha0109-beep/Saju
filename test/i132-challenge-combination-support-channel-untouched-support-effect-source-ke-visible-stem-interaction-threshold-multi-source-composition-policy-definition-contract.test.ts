import { describe, expect, test } from 'vitest';
import {
  buildI132ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionPolicyDefinitionContract,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionPolicyAdoptionReadinessReviewReport,
} from '../src/index.js';

const MISSING_ARTIFACT_IDS = [
  'VERSIONED_POLICY_DEFINITION_OBJECT',
  'CANDIDATE_SET_EVIDENCE_BINDING_PROCEDURE',
  'SEMANTIC_BRIDGE_ADJUDICATION_PROCEDURE',
  'CONTRADICTION_ADJUDICATION_PROCEDURE',
  'SCOPE_COMPATIBILITY_DECISION_PROCEDURE',
  'PROVENANCE_INDEPENDENCE_DECISION_PROCEDURE',
  'FAIL_CLOSED_ACCEPTANCE_EVALUATION_ALGORITHM',
  'PROSPECTIVE_REGISTRATION_AND_CHANGE_CONTROL',
] as const;

function i131(
  overrides: Record<string, unknown> = {},
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionPolicyAdoptionReadinessReviewReport {
  const base = {
    reviewId: 'i131_i132_fixture',
    reviewVersion: 'fixture',
    status:
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_POLICY_ADOPTION_READINESS_REVIEW',
    decision:
      'I130_REQUIREMENTS_NECESSARY_NOT_SUFFICIENT_COMPOSITION_POLICY_ADOPTION_NOT_READY_VERSIONED_POLICY_DEFINITION_AND_ADJUDICATION_PROCEDURES_ABSENT',
    upstreamI130ReviewId: 'i130_fixture',
    i130AcceptanceRequirementsAccepted: true,
    i130RequirementCount: 9,
    i130RequirementsRemainFrozen: true,
    i130RequirementsNecessaryForAdoption: true,
    i130RequirementsSufficientByThemselvesForAdoption: false,
    missingPolicyArtifactIds: [...MISSING_ARTIFACT_IDS],
    missingPolicyArtifactCount: 8,
    versionedPolicyDefinitionObjectPresent: false,
    candidateSetEvidenceBindingProcedureDefined: false,
    semanticBridgeAdjudicationProcedureDefined: false,
    contradictionAdjudicationProcedureDefined: false,
    scopeCompatibilityDecisionProcedureDefined: false,
    provenanceIndependenceDecisionProcedureDefined: false,
    failClosedAcceptanceEvaluationAlgorithmDefined: false,
    prospectiveRegistrationAndChangeControlDefined: false,
    compositionPolicyAdoptionReady: false,
    compositionPolicyAdoptionMayProceed: false,
    compositionPolicyDefinitionContractRequired: true,
    compositionPolicyMayBeInferredFromI130Requirements: false,
    compositionPolicyMayBeInferredFromI128ComplementaryEvidence: false,
    currentWuHuaiyunCoverageMayBeGrandfatheredAtAdoption: false,
    priorCandidateCoverageMayBeGrandfatheredAtAdoption: false,
    semanticBridgesMayBeCreatedByModelSynthesis: false,
    contradictionsMayBeResolvedByNumericWeighting: false,
    contradictionsMayBeResolvedByMajorityVote: false,
    policyDefinitionMayEvaluateCandidatesBeforeProspectiveRegistration: false,
    singleCandidateFullSixContractRemainsNormativeDefault: true,
    continuedSingleCandidateDiscoveryStillPermitted: true,
    compositionPolicyAdoptedByThisGate: false,
    compositionPolicyExecutableByThisGate: false,
    candidateRegistrationPerformedByThisGate: false,
    candidateSetEvaluationPerformedByThisGate: false,
    actualCompositionPerformedByThisGate: false,
    crossCandidateCompositionAuthorized: false,
    multiSourceCompositionAuthorized: false,
    authorityAcquiredByThisGate: false,
    visibleStemBinaryEffectiveInteractionEligibilityResolved: false,
    effectiveInteractionSetResolved: false,
    thresholdRuleCreatedByThisGate: false,
    damageEvaluationAuthorized: false,
    i98KeDamageVocabularyEvaluationResolved: false,
    i98ResearchMethodologyMaterializationAuthorized: false,
    hiddenStemInteractionEligibilityGapRemains: true,
    hiddenStemAuthorityGap:
      'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED',
    methodologyDefinitionCreatedByThisGate: false,
    ruleDefinitionCreatedByThisGate: false,
    registrySnapshotMutatedByThisGate: false,
    reviewAttestationCreatedByThisGate: false,
    noTrackedRelationTouchSemanticsRemainUnchanged: true,
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_POLICY_DEFINITION_CONTRACT',
    notes: [],
  };

  return { ...base, ...overrides } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionPolicyAdoptionReadinessReviewReport;
}

describe('I132 source 克 visible-stem threshold multi-source composition policy definition contract', () => {
  test('defines all eight I131-missing policy artifacts without registering or adopting the policy', () => {
    const report = buildI132ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionPolicyDefinitionContract(i131());

    expect(report.status).toBe(
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_POLICY_DEFINITION_CONTRACT',
    );
    expect(report.decision).toBe(
      'VERSIONED_MULTI_SOURCE_COMPOSITION_POLICY_DEFINITION_CONTRACT_FROZEN_NOT_REGISTERED_NOT_ADOPTED_NOT_EXECUTABLE',
    );
    expect(report.i131MissingArtifactCountAccepted).toBe(8);
    expect(report.versionedPolicyDefinitionObjectDefined).toBe(true);
    expect(report.candidateSetEvidenceBindingProcedureDefined).toBe(true);
    expect(report.semanticBridgeAdjudicationProcedureDefined).toBe(true);
    expect(report.contradictionAdjudicationProcedureDefined).toBe(true);
    expect(report.scopeCompatibilityDecisionProcedureDefined).toBe(true);
    expect(report.provenanceIndependenceDecisionProcedureDefined).toBe(true);
    expect(report.failClosedAcceptanceEvaluationAlgorithmDefined).toBe(true);
    expect(report.prospectiveRegistrationAndChangeControlDefined).toBe(true);
    expect(report.allEightI131MissingArtifactsStructurallyDefined).toBe(true);
    expect(report.definitionContractComplete).toBe(true);
    expect(report.policyDefinitionFrozenByThisGate).toBe(true);
  });

  test('creates a versioned visible-stem KE policy definition in defined-not-registered state', () => {
    const report = buildI132ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionPolicyDefinitionContract(i131());
    const policy = report.policyDefinition!;

    expect(policy.policyId).toBe('myeonghwa-visible-stem-ke-multi-source-composition-policy');
    expect(policy.policyVersion).toBe('v1-definition');
    expect(policy.policyState).toBe('DEFINED_NOT_REGISTERED_NOT_ADOPTED');
    expect(policy.targetScope).toBe('VISIBLE_HEAVENLY_STEM_BINARY_EFFECTIVE_INTERACTION_ELIGIBILITY');
    expect(policy.requiredI118RequirementCount).toBe(6);
    expect(policy.requiredI118RequirementIds).toEqual([
      'EXPLICIT_BINARY_EFFECTIVE_INTERACTION_SEMANTICS',
      'VISIBLE_STEM_POSITION_SCOPE_AND_POSITION_CLASS_APPLICABILITY',
      'QUALITATIVE_FORCE_VS_BINARY_ELIGIBILITY_SEPARATION',
      'WU_LI_BOUNDARY_SEMANTICS_AND_EXCEPTIONS',
      'CONTEXT_AND_EXCEPTION_CONDITIONS',
      'INDEPENDENT_NORMATIVE_PROVENANCE',
    ]);
  });

  test('defines evidence binding with exact identity, explicit ownership, rebinding, and no grandfathering', () => {
    const policy = buildI132ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionPolicyDefinitionContract(i131()).policyDefinition!;
    const binding = policy.evidenceBindingProcedure;

    expect(binding.exactSourceIdentityRequired).toBe(true);
    expect(binding.stableWitnessOrReproducibleLocatorRequired).toBe(true);
    expect(binding.explicitOwnedI118RequirementIdsRequired).toBe(true);
    expect(binding.sameWorkAlternateWitnessRequiresIdentityResolution).toBe(true);
    expect(binding.unstatedRequirementBorrowingAllowed).toBe(false);
    expect(binding.prePolicyCoverageGrandfatheringAllowed).toBe(false);
    expect(binding.priorEvidenceMustBeReboundUnderRegisteredPolicy).toBe(true);
  });

  test('defines fail-closed semantic bridge and scope compatibility procedures', () => {
    const policy = buildI132ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionPolicyDefinitionContract(i131()).policyDefinition!;
    const bridge = policy.semanticBridgeAdjudicationProcedure;
    const scope = policy.scopeCompatibilityDecisionProcedure;

    expect(bridge.explicitBridgeAuthorityRequired).toBe(true);
    expect(bridge.authorityEvidenceBindingRequired).toBe(true);
    expect(bridge.applicableScopeRequired).toBe(true);
    expect(bridge.lexicalSimilaritySufficient).toBe(false);
    expect(bridge.directionalConsistencySufficient).toBe(false);
    expect(bridge.modelSynthesisSufficient).toBe(false);
    expect(bridge.defaultWhenBridgeAbsent).toBe('REJECT_COMPOSED_SEMANTIC_EQUIVALENCE');
    expect(scope.requiredRelationKind).toBe('KE');
    expect(scope.requiredSurface).toBe('VISIBLE_HEAVENLY_STEM');
    expect(scope.hiddenStemAuthorityBorrowingAllowed).toBe(false);
    expect(scope.genericStemForceSubstitutionAllowed).toBe(false);
    expect(scope.qualitativePositionForceSubstitutionForBinaryEligibilityAllowed).toBe(false);
    expect(scope.defaultWhenScopeMismatch).toBe('REJECT_REQUIREMENT_COVERAGE');
  });

  test('defines non-numeric contradiction and provenance adjudication with unresolved cases rejected', () => {
    const policy = buildI132ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionPolicyDefinitionContract(i131()).policyDefinition!;
    const contradiction = policy.contradictionAdjudicationProcedure;
    const provenance = policy.provenanceIndependenceDecisionProcedure;

    expect(contradiction.materialContradictionFailsClosed).toBe(true);
    expect(contradiction.explicitAdjudicationRuleRequired).toBe(true);
    expect(contradiction.numericSourceWeightingAllowed).toBe(false);
    expect(contradiction.provenanceTierWeightingAllowed).toBe(false);
    expect(contradiction.sourceCountWeightingAllowed).toBe(false);
    expect(contradiction.majorityVoteAllowedByDefault).toBe(false);
    expect(contradiction.defaultWhenUnresolved).toBe('REJECT_CANDIDATE_SET_ADMISSIBILITY');
    expect(provenance.independentNormativeProvenanceRequired).toBe(true);
    expect(provenance.derivativeRetransmissionCountsAsIndependentAuthority).toBe(false);
    expect(provenance.provenanceTierMayBecomeNumericWeight).toBe(false);
    expect(provenance.sourceCountMayBecomeNumericWeight).toBe(false);
    expect(provenance.defaultWhenIndependenceUnresolved).toBe('REJECT_INDEPENDENCE_CLAIM');
  });

  test('defines a deterministic nine-step fail-closed evaluation algorithm before admissibility', () => {
    const policy = buildI132ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionPolicyDefinitionContract(i131()).policyDefinition!;

    expect(policy.failClosedAcceptanceEvaluationAlgorithm.map((step) => step.stepId)).toEqual([
      'POLICY_REGISTRATION_CHECK',
      'EVIDENCE_BINDING_INTEGRITY_CHECK',
      'REQUIREMENT_OWNERSHIP_CHECK',
      'SCOPE_COMPATIBILITY_CHECK',
      'PROVENANCE_INDEPENDENCE_CHECK',
      'SEMANTIC_BRIDGE_RESOLUTION_CHECK',
      'CONTRADICTION_RESOLUTION_CHECK',
      'FULL_SIX_REQUIREMENT_SATISFACTION_CHECK',
      'CANDIDATE_SET_ADMISSIBILITY_DECISION',
    ]);
    expect(policy.failClosedAcceptanceEvaluationAlgorithm.map((step) => step.order)).toEqual([1,2,3,4,5,6,7,8,9]);
    expect(policy.failClosedAcceptanceEvaluationAlgorithm.every((step) => step.mandatory && step.failClosed)).toBe(true);
    expect(policy.candidateSetAdmissibilityDoesNotEqualThresholdAuthority).toBe(true);
    expect(policy.candidateSetAdmissibilityRequiresSeparateGovernedEvaluation).toBe(true);
  });

  test('defines prospective change control while keeping registration, adoption, evaluation, composition, and authority closed', () => {
    const first = buildI132ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionPolicyDefinitionContract(i131());
    const second = buildI132ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionPolicyDefinitionContract(i131());
    const change = first.policyDefinition!.prospectiveRegistrationAndChangeControl;

    expect(first.contractId).toBe(second.contractId);
    expect(change.policyDefinitionMustBeRegisteredBeforeCandidateEvaluation).toBe(true);
    expect(change.registrationMustBindPolicyIdAndVersion).toBe(true);
    expect(change.policyChangeRequiresNewVersion).toBe(true);
    expect(change.retroactiveCoverageReclassificationAllowed).toBe(false);
    expect(change.retroactiveComplementarityPromotionAllowed).toBe(false);
    expect(change.priorCandidateCoverageGrandfatheringAllowed).toBe(false);
    expect(change.evidenceRebindingRequiredAfterPolicyVersionChange).toBe(true);
    expect(first.policyProspectivelyRegisteredByThisGate).toBe(false);
    expect(first.policyAdoptedByThisGate).toBe(false);
    expect(first.policyExecutableByThisGate).toBe(false);
    expect(first.policyRegistrationAuthorizedByThisGate).toBe(false);
    expect(first.policyAdoptionAuthorizedByThisGate).toBe(false);
    expect(first.candidateSetEvaluationAuthorizedByThisGate).toBe(false);
    expect(first.actualCompositionPerformedByThisGate).toBe(false);
    expect(first.currentWuHuaiyunCoverageGrandfathered).toBe(false);
    expect(first.priorCandidateCoverageGrandfathered).toBe(false);
    expect(first.authorityAcquiredByThisGate).toBe(false);
    expect(first.thresholdRuleCreatedByThisGate).toBe(false);
    expect(first.classificationAuthorized).toBe(false);
    expect(first.numericScoringAuthorized).toBe(false);
    expect(first.recommendedNextGate).toBe(
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_POLICY_DEFINITION_ADEQUACY_AND_REGISTRATION_READINESS_REVIEW',
    );
  });

  test('fails closed if I131 is changed to claim policy adoption readiness', () => {
    const report = buildI132ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionPolicyDefinitionContract(
      i131({ compositionPolicyAdoptionReady: true }),
    );

    expect(report.status).toBe('I131_UNRESOLVED_OR_INVALID');
    expect(report.decision).toBe('MULTI_SOURCE_COMPOSITION_POLICY_DEFINITION_CONTRACT_NOT_ESTABLISHED');
    expect(report.policyDefinition).toBeNull();
    expect(report.i131MissingArtifactCountAccepted).toBe(0);
    expect(report.definitionContractComplete).toBe(false);
    expect(report.policyDefinitionFrozenByThisGate).toBe(false);
    expect(report.policyProspectivelyRegisteredByThisGate).toBe(false);
    expect(report.policyAdoptedByThisGate).toBe(false);
    expect(report.recommendedNextGate).toBe(
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_POLICY_ADOPTION_READINESS_REVIEW',
    );
  });
});
