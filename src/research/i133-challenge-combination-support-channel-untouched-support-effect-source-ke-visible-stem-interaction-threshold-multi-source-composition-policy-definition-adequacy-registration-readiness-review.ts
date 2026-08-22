import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionPolicyDefinitionContractReport } from './i132-challenge-combination-support-channel-untouched-support-effect-source-ke-visible-stem-interaction-threshold-multi-source-composition-policy-definition-contract.js';

export const I133_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_POLICY_DEFINITION_ADEQUACY_REGISTRATION_READINESS_REVIEW_VERSION =
  'myeonghwa-challenge-combination-support-channel-untouched-support-effect-source-ke-visible-stem-interaction-threshold-multi-source-composition-policy-definition-adequacy-registration-readiness-review-v1';

export interface ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionPolicyDefinitionAdequacyRegistrationReadinessReviewReport {
  reviewId: string;
  reviewVersion: string;
  status:
    | 'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_POLICY_DEFINITION_ADEQUACY_REGISTRATION_READINESS_REVIEW'
    | 'I132_UNRESOLVED_OR_INVALID';
  decision:
    | 'I132_POLICY_DEFINITION_STRUCTURALLY_ADEQUATE_FOR_PROSPECTIVE_REGISTRATION_CONTRACT_NO_POLICY_REGISTERED_OR_ADOPTED'
    | 'MULTI_SOURCE_COMPOSITION_POLICY_REGISTRATION_READINESS_NOT_ESTABLISHED';
  upstreamI132ContractId: string;
  policyId: string | null;
  policyVersion: string | null;
  policyStateObserved: 'DEFINED_NOT_REGISTERED_NOT_ADOPTED' | null;
  i132DefinitionContractAccepted: boolean;
  allEightI131ArtifactsStructurallyDefined: boolean;
  sixI118RequirementsExplicitlyBoundInDefinition: boolean;
  evidenceBindingProcedureAdequate: boolean;
  semanticBridgeProcedureAdequate: boolean;
  contradictionProcedureAdequate: boolean;
  scopeCompatibilityProcedureAdequate: boolean;
  provenanceIndependenceProcedureAdequate: boolean;
  failClosedEvaluationAlgorithmAdequate: boolean;
  prospectiveRegistrationChangeControlAdequate: boolean;
  nineStepEvaluationOrderVerified: boolean;
  candidateSetAdmissibilitySeparatedFromThresholdAuthority: boolean;
  definitionAdequateForProspectiveRegistration: boolean;
  prospectiveRegistrationReadinessEstablished: boolean;
  prospectiveRegistrationContractMayProceed: boolean;
  policyDefinitionMutationRequiredBeforeRegistration: boolean;
  candidateEvidenceRequiredBeforePolicyRegistration: false;
  registrationReadinessDoesNotEqualPolicyAdoptionReadiness: true;
  registrationReadinessDoesNotAuthorizeCandidateEvaluation: true;
  registrationReadinessDoesNotAuthorizeComposition: true;
  policyRegistrationAuthorizedByThisGate: false;
  policyRegistrationPerformedByThisGate: false;
  policyAdoptionAuthorizedByThisGate: false;
  policyAdoptedByThisGate: false;
  policyExecutableByThisGate: false;
  candidateSetEvaluationAuthorizedByThisGate: false;
  candidateSetEvaluationPerformedByThisGate: false;
  actualCompositionPerformedByThisGate: false;
  crossCandidateCompositionAuthorized: false;
  multiSourceCompositionAuthorized: false;
  currentWuHuaiyunCoverageGrandfathered: false;
  priorCandidateCoverageGrandfathered: false;
  singleCandidateFullSixContractRemainsNormativeDefault: boolean;
  continuedSingleCandidateDiscoveryStillPermitted: boolean;
  authorityAcquiredByThisGate: false;
  visibleStemBinaryEffectiveInteractionEligibilityResolved: false;
  effectiveInteractionSetResolved: false;
  thresholdRuleCreatedByThisGate: false;
  damageEvaluationAuthorized: false;
  i98KeDamageVocabularyEvaluationResolved: false;
  i98ResearchMethodologyMaterializationAuthorized: false;
  hiddenStemInteractionEligibilityGapRemains: true;
  hiddenStemAuthorityGap: 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED';
  methodologyDefinitionCreatedByThisGate: false;
  ruleDefinitionCreatedByThisGate: false;
  registrySnapshotMutatedByThisGate: false;
  reviewAttestationCreatedByThisGate: false;
  noTrackedRelationTouchSemanticsRemainUnchanged: true;
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  recommendedNextGate:
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_POLICY_PROSPECTIVE_REGISTRATION_CONTRACT'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_POLICY_DEFINITION_CONTRACT';
  notes: readonly string[];
}

const EXPECTED_STEPS = [
  'POLICY_REGISTRATION_CHECK',
  'EVIDENCE_BINDING_INTEGRITY_CHECK',
  'REQUIREMENT_OWNERSHIP_CHECK',
  'SCOPE_COMPATIBILITY_CHECK',
  'PROVENANCE_INDEPENDENCE_CHECK',
  'SEMANTIC_BRIDGE_RESOLUTION_CHECK',
  'CONTRADICTION_RESOLUTION_CHECK',
  'FULL_SIX_REQUIREMENT_SATISFACTION_CHECK',
  'CANDIDATE_SET_ADMISSIBILITY_DECISION',
] as const;

function exactI132Accepted(
  i132: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionPolicyDefinitionContractReport,
): boolean {
  const policy = i132.policyDefinition;
  return (
    i132.status ===
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_POLICY_DEFINITION_CONTRACT' &&
    i132.decision ===
      'VERSIONED_MULTI_SOURCE_COMPOSITION_POLICY_DEFINITION_CONTRACT_FROZEN_NOT_REGISTERED_NOT_ADOPTED_NOT_EXECUTABLE' &&
    i132.i131MissingArtifactCountAccepted === 8 &&
    i132.versionedPolicyDefinitionObjectDefined &&
    i132.candidateSetEvidenceBindingProcedureDefined &&
    i132.semanticBridgeAdjudicationProcedureDefined &&
    i132.contradictionAdjudicationProcedureDefined &&
    i132.scopeCompatibilityDecisionProcedureDefined &&
    i132.provenanceIndependenceDecisionProcedureDefined &&
    i132.failClosedAcceptanceEvaluationAlgorithmDefined &&
    i132.prospectiveRegistrationAndChangeControlDefined &&
    i132.allEightI131MissingArtifactsStructurallyDefined &&
    i132.definitionContractComplete &&
    i132.policyDefinitionFrozenByThisGate &&
    i132.policyProspectivelyRegisteredByThisGate === false &&
    i132.policyAdoptedByThisGate === false &&
    i132.policyExecutableByThisGate === false &&
    i132.candidateSetEvaluationAuthorizedByThisGate === false &&
    i132.actualCompositionPerformedByThisGate === false &&
    i132.currentWuHuaiyunCoverageGrandfathered === false &&
    i132.priorCandidateCoverageGrandfathered === false &&
    i132.authorityAcquiredByThisGate === false &&
    i132.visibleStemBinaryEffectiveInteractionEligibilityResolved === false &&
    i132.classificationAuthorized === false &&
    i132.numericScoringAuthorized === false &&
    policy !== null &&
    policy.policyId === 'myeonghwa-visible-stem-ke-multi-source-composition-policy' &&
    policy.policyVersion === 'v1-definition' &&
    policy.policyState === 'DEFINED_NOT_REGISTERED_NOT_ADOPTED' &&
    policy.targetScope === 'VISIBLE_HEAVENLY_STEM_BINARY_EFFECTIVE_INTERACTION_ELIGIBILITY' &&
    policy.requiredI118RequirementCount === 6 &&
    policy.requiredI118RequirementIds.length === 6 &&
    policy.evidenceBindingProcedure.exactSourceIdentityRequired &&
    policy.evidenceBindingProcedure.stableWitnessOrReproducibleLocatorRequired &&
    policy.evidenceBindingProcedure.explicitOwnedI118RequirementIdsRequired &&
    policy.evidenceBindingProcedure.unstatedRequirementBorrowingAllowed === false &&
    policy.evidenceBindingProcedure.prePolicyCoverageGrandfatheringAllowed === false &&
    policy.semanticBridgeAdjudicationProcedure.explicitBridgeAuthorityRequired &&
    policy.semanticBridgeAdjudicationProcedure.lexicalSimilaritySufficient === false &&
    policy.semanticBridgeAdjudicationProcedure.modelSynthesisSufficient === false &&
    policy.contradictionAdjudicationProcedure.materialContradictionFailsClosed &&
    policy.contradictionAdjudicationProcedure.numericSourceWeightingAllowed === false &&
    policy.contradictionAdjudicationProcedure.majorityVoteAllowedByDefault === false &&
    policy.scopeCompatibilityDecisionProcedure.requiredRelationKind === 'KE' &&
    policy.scopeCompatibilityDecisionProcedure.requiredSurface === 'VISIBLE_HEAVENLY_STEM' &&
    policy.scopeCompatibilityDecisionProcedure.hiddenStemAuthorityBorrowingAllowed === false &&
    policy.provenanceIndependenceDecisionProcedure.independentNormativeProvenanceRequired &&
    policy.provenanceIndependenceDecisionProcedure.derivativeRetransmissionCountsAsIndependentAuthority === false &&
    policy.failClosedAcceptanceEvaluationAlgorithm.length === 9 &&
    policy.failClosedAcceptanceEvaluationAlgorithm.every(
      (step, index) =>
        step.stepId === EXPECTED_STEPS[index] &&
        step.order === index + 1 &&
        step.mandatory &&
        step.failClosed,
    ) &&
    policy.prospectiveRegistrationAndChangeControl.policyDefinitionMustBeRegisteredBeforeCandidateEvaluation &&
    policy.prospectiveRegistrationAndChangeControl.registrationMustBindPolicyIdAndVersion &&
    policy.prospectiveRegistrationAndChangeControl.policyChangeRequiresNewVersion &&
    policy.prospectiveRegistrationAndChangeControl.retroactiveCoverageReclassificationAllowed === false &&
    policy.prospectiveRegistrationAndChangeControl.retroactiveComplementarityPromotionAllowed === false &&
    policy.prospectiveRegistrationAndChangeControl.priorCandidateCoverageGrandfatheringAllowed === false &&
    policy.candidateSetAdmissibilityDoesNotEqualThresholdAuthority &&
    policy.candidateSetAdmissibilityRequiresSeparateGovernedEvaluation &&
    i132.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_POLICY_DEFINITION_ADEQUACY_AND_REGISTRATION_READINESS_REVIEW'
  );
}

function finalized(
  material: Omit<ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionPolicyDefinitionAdequacyRegistrationReadinessReviewReport, 'reviewId'>,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionPolicyDefinitionAdequacyRegistrationReadinessReviewReport {
  return {
    reviewId: `challenge_combination_support_channel_untouched_support_ke_visible_stem_threshold_composition_policy_registration_readiness_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

function common(
  i132: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionPolicyDefinitionContractReport,
) {
  return {
    reviewVersion:
      I133_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_POLICY_DEFINITION_ADEQUACY_REGISTRATION_READINESS_REVIEW_VERSION,
    upstreamI132ContractId: i132.contractId,
    candidateEvidenceRequiredBeforePolicyRegistration: false as const,
    registrationReadinessDoesNotEqualPolicyAdoptionReadiness: true as const,
    registrationReadinessDoesNotAuthorizeCandidateEvaluation: true as const,
    registrationReadinessDoesNotAuthorizeComposition: true as const,
    policyRegistrationAuthorizedByThisGate: false as const,
    policyRegistrationPerformedByThisGate: false as const,
    policyAdoptionAuthorizedByThisGate: false as const,
    policyAdoptedByThisGate: false as const,
    policyExecutableByThisGate: false as const,
    candidateSetEvaluationAuthorizedByThisGate: false as const,
    candidateSetEvaluationPerformedByThisGate: false as const,
    actualCompositionPerformedByThisGate: false as const,
    crossCandidateCompositionAuthorized: false as const,
    multiSourceCompositionAuthorized: false as const,
    currentWuHuaiyunCoverageGrandfathered: false as const,
    priorCandidateCoverageGrandfathered: false as const,
    authorityAcquiredByThisGate: false as const,
    visibleStemBinaryEffectiveInteractionEligibilityResolved: false as const,
    effectiveInteractionSetResolved: false as const,
    thresholdRuleCreatedByThisGate: false as const,
    damageEvaluationAuthorized: false as const,
    i98KeDamageVocabularyEvaluationResolved: false as const,
    i98ResearchMethodologyMaterializationAuthorized: false as const,
    hiddenStemInteractionEligibilityGapRemains: true as const,
    hiddenStemAuthorityGap:
      'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED' as const,
    methodologyDefinitionCreatedByThisGate: false as const,
    ruleDefinitionCreatedByThisGate: false as const,
    registrySnapshotMutatedByThisGate: false as const,
    reviewAttestationCreatedByThisGate: false as const,
    noTrackedRelationTouchSemanticsRemainUnchanged: true as const,
    classificationAuthorized: false as const,
    numericScoringAuthorized: false as const,
  };
}

export function buildI133ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionPolicyDefinitionAdequacyRegistrationReadinessReview(
  i132: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionPolicyDefinitionContractReport,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionPolicyDefinitionAdequacyRegistrationReadinessReviewReport {
  const base = common(i132);
  const policy = i132.policyDefinition;

  if (!exactI132Accepted(i132) || policy === null) {
    return finalized({
      ...base,
      status: 'I132_UNRESOLVED_OR_INVALID',
      decision: 'MULTI_SOURCE_COMPOSITION_POLICY_REGISTRATION_READINESS_NOT_ESTABLISHED',
      policyId: null,
      policyVersion: null,
      policyStateObserved: null,
      i132DefinitionContractAccepted: false,
      allEightI131ArtifactsStructurallyDefined: false,
      sixI118RequirementsExplicitlyBoundInDefinition: false,
      evidenceBindingProcedureAdequate: false,
      semanticBridgeProcedureAdequate: false,
      contradictionProcedureAdequate: false,
      scopeCompatibilityProcedureAdequate: false,
      provenanceIndependenceProcedureAdequate: false,
      failClosedEvaluationAlgorithmAdequate: false,
      prospectiveRegistrationChangeControlAdequate: false,
      nineStepEvaluationOrderVerified: false,
      candidateSetAdmissibilitySeparatedFromThresholdAuthority: false,
      definitionAdequateForProspectiveRegistration: false,
      prospectiveRegistrationReadinessEstablished: false,
      prospectiveRegistrationContractMayProceed: false,
      policyDefinitionMutationRequiredBeforeRegistration: true,
      singleCandidateFullSixContractRemainsNormativeDefault: true,
      continuedSingleCandidateDiscoveryStillPermitted: true,
      recommendedNextGate:
        'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_POLICY_DEFINITION_CONTRACT',
      notes: [
        'I133 requires the exact resolved I132 policy definition contract before registration readiness may be established.',
      ],
    });
  }

  return finalized({
    ...base,
    status:
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_POLICY_DEFINITION_ADEQUACY_REGISTRATION_READINESS_REVIEW',
    decision:
      'I132_POLICY_DEFINITION_STRUCTURALLY_ADEQUATE_FOR_PROSPECTIVE_REGISTRATION_CONTRACT_NO_POLICY_REGISTERED_OR_ADOPTED',
    policyId: policy.policyId,
    policyVersion: policy.policyVersion,
    policyStateObserved: policy.policyState,
    i132DefinitionContractAccepted: true,
    allEightI131ArtifactsStructurallyDefined: true,
    sixI118RequirementsExplicitlyBoundInDefinition: true,
    evidenceBindingProcedureAdequate: true,
    semanticBridgeProcedureAdequate: true,
    contradictionProcedureAdequate: true,
    scopeCompatibilityProcedureAdequate: true,
    provenanceIndependenceProcedureAdequate: true,
    failClosedEvaluationAlgorithmAdequate: true,
    prospectiveRegistrationChangeControlAdequate: true,
    nineStepEvaluationOrderVerified: true,
    candidateSetAdmissibilitySeparatedFromThresholdAuthority: true,
    definitionAdequateForProspectiveRegistration: true,
    prospectiveRegistrationReadinessEstablished: true,
    prospectiveRegistrationContractMayProceed: true,
    policyDefinitionMutationRequiredBeforeRegistration: false,
    singleCandidateFullSixContractRemainsNormativeDefault: true,
    continuedSingleCandidateDiscoveryStillPermitted: true,
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_POLICY_PROSPECTIVE_REGISTRATION_CONTRACT',
    notes: [
      'I133 finds the I132 definition structurally adequate for a separate prospective registration contract because all eight missing artifacts are defined, all six I118 requirements remain explicit, and the evaluation sequence is deterministic and fail-closed.',
      'Registration readiness is not registration, adoption, execution, candidate evaluation, composition, or threshold authority.',
      'No candidate evidence is required before registering the policy definition because the policy must exist prospectively before candidate-set evaluation; evidence will require rebinding under the registered policy version.',
      'The single-candidate/full-six path remains the governing default until a future policy is separately registered, adopted, and authorized for candidate evaluation.',
    ],
  });
}
