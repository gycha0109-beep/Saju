import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredPolicyAdoptionContractReport } from './i136-challenge-combination-support-channel-untouched-support-effect-source-ke-visible-stem-interaction-threshold-multi-source-composition-registered-policy-adoption-contract.js';

export const I137_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_ADOPTED_POLICY_CANDIDATE_SET_EVALUATION_AUTHORIZATION_READINESS_REVIEW_VERSION =
  'myeonghwa-challenge-combination-support-channel-untouched-support-effect-source-ke-visible-stem-interaction-threshold-multi-source-composition-adopted-policy-candidate-set-evaluation-authorization-readiness-review-v1';

export const I137_MISSING_CANDIDATE_SET_EVALUATION_INPUT_ARTIFACTS = [
  'CANDIDATE_SET_INPUT_MANIFEST',
  'EVIDENCE_REBINDING_RECORDS',
  'REQUIREMENT_OWNERSHIP_BINDINGS',
  'WITNESS_IDENTITY_BINDINGS',
  'SCOPE_COMPATIBILITY_ADJUDICATION_INPUTS',
  'PROVENANCE_INDEPENDENCE_ADJUDICATION_INPUTS',
  'SEMANTIC_BRIDGE_ADJUDICATION_INPUTS',
  'CONTRADICTION_ADJUDICATION_INPUTS',
] as const;

export type I137MissingCandidateSetEvaluationInputArtifact =
  (typeof I137_MISSING_CANDIDATE_SET_EVALUATION_INPUT_ARTIFACTS)[number];

export interface ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionAdoptedPolicyCandidateSetEvaluationAuthorizationReadinessReviewReport {
  reviewId: string;
  reviewVersion: string;
  status:
    | 'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_ADOPTED_POLICY_CANDIDATE_SET_EVALUATION_AUTHORIZATION_READINESS_REVIEW'
    | 'I136_ADOPTION_UNRESOLVED_OR_INVALID';
  decision:
    | 'ADOPTED_POLICY_CANDIDATE_SET_EVALUATION_AUTHORIZATION_NOT_READY_INPUT_REBINDING_AND_ADJUDICATION_PACKAGE_REQUIRED'
    | 'ADOPTED_POLICY_CANDIDATE_SET_EVALUATION_AUTHORIZATION_READINESS_NOT_ESTABLISHED';
  upstreamI136ContractId: string;
  policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy';
  policyVersion: 'v1-definition';
  registrationVersion: 'v1-registration';
  adoptionVersion: 'v1-adoption';
  adoptionId: string | null;
  adoptionStateObserved:
    | 'ADOPTED_NOT_EXECUTABLE_CANDIDATE_EVALUATION_NOT_AUTHORIZED'
    | 'UNRESOLVED';
  exactI136AdoptionAccepted: boolean;
  adoptedPolicyIdentityAccepted: boolean;
  adoptedPolicyDefinitionImmutable: boolean;
  candidateSetEvaluationRequiresExplicitInputPackage: true;
  priorEvidenceCannotBeEvaluatedWithoutRebinding: true;
  i126CoverageMayNotBeGrandfathered: true;
  i128DiscoveryMayNotBeGrandfathered: true;
  missingInputArtifacts: readonly I137MissingCandidateSetEvaluationInputArtifact[];
  missingInputArtifactCount: 8;
  allMissingInputArtifactsMandatory: true;
  candidateSetInputManifestPresent: false;
  evidenceRebindingRecordsPresent: false;
  requirementOwnershipBindingsPresent: false;
  witnessIdentityBindingsPresent: false;
  scopeCompatibilityAdjudicationInputsPresent: false;
  provenanceIndependenceAdjudicationInputsPresent: false;
  semanticBridgeAdjudicationInputsPresent: false;
  contradictionAdjudicationInputsPresent: false;
  adoptedPolicyNineStepAlgorithmMustBeUsedWithoutReordering: true;
  candidateSetEvaluationAuthorizationReady: false;
  candidateSetEvaluationAuthorizationContractMayProceed: false;
  inputRebindingAndRegistrationContractRequiredFirst: true;
  policyAdoptionRemainsValid: boolean;
  policyExecutableByThisGate: false;
  policyExecutionAuthorizedByThisGate: false;
  candidateSetEvaluationAuthorizedByThisGate: false;
  candidateSetEvaluationPerformedByThisGate: false;
  actualCompositionPerformedByThisGate: false;
  crossCandidateCompositionAuthorized: false;
  multiSourceCompositionAuthorized: false;
  semanticEquivalenceAuthorizedByThisGate: false;
  contradictionResolutionAuthorizedByThisGate: false;
  candidateSetAdmissibilityEstablishedByThisGate: false;
  currentWuHuaiyunCoverageGrandfathered: false;
  priorCandidateCoverageGrandfathered: false;
  singleCandidateFullSixContractRemainsNormativeDefaultUntilCandidateSetEvaluationAuthorization: boolean;
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
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_CANDIDATE_SET_EVIDENCE_REBINDING_AND_INPUT_REGISTRATION_CONTRACT'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_REGISTERED_POLICY_ADOPTION_CONTRACT';
  notes: readonly string[];
}

function exactI136Accepted(
  i136: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredPolicyAdoptionContractReport,
): boolean {
  const adoption = i136.adoptionRecord;
  return (
    i136.status ===
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_REGISTERED_POLICY_ADOPTION_CONTRACT' &&
    i136.decision ===
      'REGISTERED_POLICY_V1_ADOPTED_NOT_EXECUTABLE_CANDIDATE_EVALUATION_NOT_AUTHORIZED_NO_THRESHOLD_AUTHORITY' &&
    adoption !== null &&
    adoption.policyId === 'myeonghwa-visible-stem-ke-multi-source-composition-policy' &&
    adoption.policyVersion === 'v1-definition' &&
    adoption.registrationVersion === 'v1-registration' &&
    adoption.adoptionVersion === 'v1-adoption' &&
    adoption.adoptionState === 'ADOPTED_NOT_EXECUTABLE_CANDIDATE_EVALUATION_NOT_AUTHORIZED' &&
    adoption.targetScope === 'VISIBLE_HEAVENLY_STEM_BINARY_EFFECTIVE_INTERACTION_ELIGIBILITY' &&
    adoption.adoptionBindsExactRegistration &&
    adoption.registeredPolicyDefinitionImmutable &&
    adoption.priorEvidenceGrandfatheredAtAdoption === false &&
    adoption.priorEvidenceRequiresRebindingBeforeCandidateEvaluation &&
    adoption.policyExecutionRequiresSeparateAuthorization &&
    adoption.candidateSetEvaluationRequiresSeparateAuthorization &&
    adoption.adoptionDoesNotAuthorizeSemanticBridges &&
    adoption.adoptionDoesNotResolveContradictions &&
    adoption.adoptionDoesNotEstablishCandidateSetAdmissibility &&
    adoption.adoptionDoesNotEqualThresholdAuthority &&
    i136.adoptionRecordCreated &&
    i136.adoptionIdentityBoundToExactRegistration &&
    i136.adoptionReadinessBoundToI135Review &&
    i136.registeredPolicyDefinitionPreservedWithoutMutation &&
    i136.priorEvidenceGrandfatheredAtAdoption === false &&
    i136.priorEvidenceRebindingRequiredBeforeCandidateEvaluation &&
    i136.policyAdoptionAuthorizedByThisGate &&
    i136.policyAdoptedByThisGate &&
    i136.policyAdoptionPerformedByThisGate &&
    i136.policyExecutableByThisGate === false &&
    i136.policyExecutionAuthorizedByThisGate === false &&
    i136.candidateSetEvaluationAuthorizedByThisGate === false &&
    i136.candidateSetEvaluationPerformedByThisGate === false &&
    i136.actualCompositionPerformedByThisGate === false &&
    i136.crossCandidateCompositionAuthorized === false &&
    i136.multiSourceCompositionAuthorized === false &&
    i136.currentWuHuaiyunCoverageGrandfathered === false &&
    i136.priorCandidateCoverageGrandfathered === false &&
    i136.adoptedPolicyCandidateSetEvaluationReadinessNotYetReviewed &&
    i136.authorityAcquiredByThisGate === false &&
    i136.visibleStemBinaryEffectiveInteractionEligibilityResolved === false &&
    i136.classificationAuthorized === false &&
    i136.numericScoringAuthorized === false &&
    i136.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_ADOPTED_POLICY_CANDIDATE_SET_EVALUATION_AUTHORIZATION_READINESS_REVIEW'
  );
}

function common(
  i136: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredPolicyAdoptionContractReport,
) {
  return {
    reviewVersion:
      I137_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_ADOPTED_POLICY_CANDIDATE_SET_EVALUATION_AUTHORIZATION_READINESS_REVIEW_VERSION,
    upstreamI136ContractId: i136.contractId,
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy' as const,
    policyVersion: 'v1-definition' as const,
    registrationVersion: 'v1-registration' as const,
    adoptionVersion: 'v1-adoption' as const,
    candidateSetEvaluationRequiresExplicitInputPackage: true as const,
    priorEvidenceCannotBeEvaluatedWithoutRebinding: true as const,
    i126CoverageMayNotBeGrandfathered: true as const,
    i128DiscoveryMayNotBeGrandfathered: true as const,
    missingInputArtifacts: I137_MISSING_CANDIDATE_SET_EVALUATION_INPUT_ARTIFACTS,
    missingInputArtifactCount: 8 as const,
    allMissingInputArtifactsMandatory: true as const,
    candidateSetInputManifestPresent: false as const,
    evidenceRebindingRecordsPresent: false as const,
    requirementOwnershipBindingsPresent: false as const,
    witnessIdentityBindingsPresent: false as const,
    scopeCompatibilityAdjudicationInputsPresent: false as const,
    provenanceIndependenceAdjudicationInputsPresent: false as const,
    semanticBridgeAdjudicationInputsPresent: false as const,
    contradictionAdjudicationInputsPresent: false as const,
    adoptedPolicyNineStepAlgorithmMustBeUsedWithoutReordering: true as const,
    candidateSetEvaluationAuthorizationReady: false as const,
    candidateSetEvaluationAuthorizationContractMayProceed: false as const,
    inputRebindingAndRegistrationContractRequiredFirst: true as const,
    policyExecutableByThisGate: false as const,
    policyExecutionAuthorizedByThisGate: false as const,
    candidateSetEvaluationAuthorizedByThisGate: false as const,
    candidateSetEvaluationPerformedByThisGate: false as const,
    actualCompositionPerformedByThisGate: false as const,
    crossCandidateCompositionAuthorized: false as const,
    multiSourceCompositionAuthorized: false as const,
    semanticEquivalenceAuthorizedByThisGate: false as const,
    contradictionResolutionAuthorizedByThisGate: false as const,
    candidateSetAdmissibilityEstablishedByThisGate: false as const,
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

function finalized(
  material: Omit<ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionAdoptedPolicyCandidateSetEvaluationAuthorizationReadinessReviewReport, 'reviewId'>,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionAdoptedPolicyCandidateSetEvaluationAuthorizationReadinessReviewReport {
  return {
    reviewId: `challenge_combination_support_channel_untouched_support_ke_visible_stem_threshold_adopted_policy_candidate_eval_auth_readiness_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI137ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionAdoptedPolicyCandidateSetEvaluationAuthorizationReadinessReview(
  i136: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredPolicyAdoptionContractReport,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionAdoptedPolicyCandidateSetEvaluationAuthorizationReadinessReviewReport {
  const base = common(i136);

  if (!exactI136Accepted(i136) || i136.adoptionRecord === null) {
    return finalized({
      ...base,
      status: 'I136_ADOPTION_UNRESOLVED_OR_INVALID',
      decision: 'ADOPTED_POLICY_CANDIDATE_SET_EVALUATION_AUTHORIZATION_READINESS_NOT_ESTABLISHED',
      adoptionId: null,
      adoptionStateObserved: 'UNRESOLVED',
      exactI136AdoptionAccepted: false,
      adoptedPolicyIdentityAccepted: false,
      adoptedPolicyDefinitionImmutable: false,
      policyAdoptionRemainsValid: false,
      singleCandidateFullSixContractRemainsNormativeDefaultUntilCandidateSetEvaluationAuthorization: true,
      continuedSingleCandidateDiscoveryStillPermitted: true,
      recommendedNextGate:
        'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_REGISTERED_POLICY_ADOPTION_CONTRACT',
      notes: [
        'I137 fails closed unless the exact I136 adopted-policy record remains intact.',
      ],
    });
  }

  return finalized({
    ...base,
    status:
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_ADOPTED_POLICY_CANDIDATE_SET_EVALUATION_AUTHORIZATION_READINESS_REVIEW',
    decision:
      'ADOPTED_POLICY_CANDIDATE_SET_EVALUATION_AUTHORIZATION_NOT_READY_INPUT_REBINDING_AND_ADJUDICATION_PACKAGE_REQUIRED',
    adoptionId: i136.adoptionRecord.adoptionId,
    adoptionStateObserved: 'ADOPTED_NOT_EXECUTABLE_CANDIDATE_EVALUATION_NOT_AUTHORIZED',
    exactI136AdoptionAccepted: true,
    adoptedPolicyIdentityAccepted: true,
    adoptedPolicyDefinitionImmutable: true,
    policyAdoptionRemainsValid: true,
    singleCandidateFullSixContractRemainsNormativeDefaultUntilCandidateSetEvaluationAuthorization: true,
    continuedSingleCandidateDiscoveryStillPermitted: true,
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_CANDIDATE_SET_EVIDENCE_REBINDING_AND_INPUT_REGISTRATION_CONTRACT',
    notes: [
      'The adopted policy is valid, but candidate-set evaluation authorization is not ready because no adopted-policy-bound input package has been registered.',
      'Prior I126/I128 evidence is context only until every evidence item is rebound to exact source/witness identity and explicit I118 requirement ownership under the adopted policy.',
      'Scope, provenance independence, semantic bridges, and contradictions require explicit adjudication inputs before evaluation authorization can be reviewed again.',
      'I137 performs no candidate evaluation or composition and creates no threshold authority.',
    ],
  });
}
