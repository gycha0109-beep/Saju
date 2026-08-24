import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredPolicyAdoptionReadinessReviewReport } from './i135-challenge-combination-support-channel-untouched-support-effect-source-ke-visible-stem-interaction-threshold-multi-source-composition-registered-policy-adoption-readiness-review.js';

export const I136_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_REGISTERED_POLICY_ADOPTION_CONTRACT_VERSION =
  'myeonghwa-challenge-combination-support-channel-untouched-support-effect-source-ke-visible-stem-interaction-threshold-multi-source-composition-registered-policy-adoption-contract-v1';

export interface I136RegisteredPolicyAdoptionRecord {
  adoptionId: string;
  adoptionVersion: 'v1-adoption';
  policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy';
  policyVersion: 'v1-definition';
  registrationVersion: 'v1-registration';
  registrationId: string;
  adoptionReadinessReviewId: string;
  adoptionState: 'ADOPTED_NOT_EXECUTABLE_CANDIDATE_EVALUATION_NOT_AUTHORIZED';
  targetScope: 'VISIBLE_HEAVENLY_STEM_BINARY_EFFECTIVE_INTERACTION_ELIGIBILITY';
  adoptionBindsExactRegistration: true;
  registeredPolicyDefinitionImmutable: true;
  priorEvidenceGrandfatheredAtAdoption: false;
  priorEvidenceRequiresRebindingBeforeCandidateEvaluation: true;
  policyExecutionRequiresSeparateAuthorization: true;
  candidateSetEvaluationRequiresSeparateAuthorization: true;
  adoptionDoesNotAuthorizeSemanticBridges: true;
  adoptionDoesNotResolveContradictions: true;
  adoptionDoesNotEstablishCandidateSetAdmissibility: true;
  adoptionDoesNotEqualThresholdAuthority: true;
}

export interface ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredPolicyAdoptionContractReport {
  contractId: string;
  contractVersion: string;
  status:
    | 'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_REGISTERED_POLICY_ADOPTION_CONTRACT'
    | 'I135_ADOPTION_READINESS_UNRESOLVED_OR_INVALID';
  decision:
    | 'REGISTERED_POLICY_V1_ADOPTED_NOT_EXECUTABLE_CANDIDATE_EVALUATION_NOT_AUTHORIZED_NO_THRESHOLD_AUTHORITY'
    | 'REGISTERED_POLICY_ADOPTION_NOT_ESTABLISHED';
  upstreamI135ReviewId: string;
  adoptionRecord: I136RegisteredPolicyAdoptionRecord | null;
  adoptionRecordCreated: boolean;
  adoptionIdentityBoundToExactRegistration: boolean;
  adoptionReadinessBoundToI135Review: boolean;
  registeredPolicyDefinitionPreservedWithoutMutation: boolean;
  priorEvidenceGrandfatheredAtAdoption: false;
  priorEvidenceRebindingRequiredBeforeCandidateEvaluation: boolean;
  policyAdoptionAuthorizedByThisGate: boolean;
  policyAdoptedByThisGate: boolean;
  policyAdoptionPerformedByThisGate: boolean;
  policyExecutableByThisGate: false;
  policyExecutionAuthorizedByThisGate: false;
  candidateSetEvaluationAuthorizedByThisGate: false;
  candidateSetEvaluationPerformedByThisGate: false;
  actualCompositionPerformedByThisGate: false;
  crossCandidateCompositionAuthorized: false;
  multiSourceCompositionAuthorized: false;
  semanticEquivalenceAuthorizedByAdoption: false;
  contradictionResolvedByAdoption: false;
  candidateSetAdmissibilityEstablishedByAdoption: false;
  currentWuHuaiyunCoverageGrandfathered: false;
  priorCandidateCoverageGrandfathered: false;
  adoptedPolicyCandidateSetEvaluationReadinessNotYetReviewed: boolean;
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
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_ADOPTED_POLICY_CANDIDATE_SET_EVALUATION_AUTHORIZATION_READINESS_REVIEW'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_REGISTERED_POLICY_ADOPTION_READINESS_REVIEW';
  notes: readonly string[];
}

function exactI135Accepted(
  i135: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredPolicyAdoptionReadinessReviewReport,
): boolean {
  return (
    i135.status ===
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_REGISTERED_POLICY_ADOPTION_READINESS_REVIEW' &&
    i135.decision ===
      'REGISTERED_POLICY_SATISFIES_ADOPTION_READINESS_PRECONDITIONS_SEPARATE_ADOPTION_CONTRACT_MAY_PROCEED_NO_ADOPTION_OR_EXECUTION' &&
    i135.policyId === 'myeonghwa-visible-stem-ke-multi-source-composition-policy' &&
    i135.policyVersion === 'v1-definition' &&
    i135.registrationVersion === 'v1-registration' &&
    i135.registrationId !== null &&
    i135.registrationStateObserved === 'REGISTERED_NOT_ADOPTED_NOT_EXECUTABLE' &&
    i135.readinessRequirementCount === 8 &&
    i135.allReadinessRequirementsMandatory &&
    i135.exactI134RegistrationAccepted &&
    i135.registrationIdentityImmutable &&
    i135.prospectiveOrderingVerified &&
    i135.noPreRegistrationCandidateEvaluationVerified &&
    i135.noPriorEvidenceGrandfatheringVerified &&
    i135.priorEvidenceRebindingRequirementVerified &&
    i135.policyVersionChangeControlVerified &&
    i135.adoptionSeparatedFromExecution &&
    i135.adoptionSeparatedFromCandidateEvaluationAuthorization &&
    i135.adoptionSeparatedFromThresholdAuthority &&
    i135.adoptionMustBindExactRegistration &&
    i135.adoptionMayNotMutateRegisteredDefinition &&
    i135.adoptionMayNotGrandfatherPriorEvidence &&
    i135.adoptionMayNotEvaluateCandidatesByItself &&
    i135.adoptionMayNotAuthorizeThresholdByItself &&
    i135.registeredPolicyAdoptionReadinessEstablished &&
    i135.separateAdoptionContractMayProceed &&
    i135.policyAdoptionAuthorizedByThisGate === false &&
    i135.policyAdoptedByThisGate === false &&
    i135.policyExecutableByThisGate === false &&
    i135.candidateSetEvaluationAuthorizedByThisGate === false &&
    i135.candidateSetEvaluationPerformedByThisGate === false &&
    i135.actualCompositionPerformedByThisGate === false &&
    i135.crossCandidateCompositionAuthorized === false &&
    i135.multiSourceCompositionAuthorized === false &&
    i135.currentWuHuaiyunCoverageGrandfathered === false &&
    i135.priorCandidateCoverageGrandfathered === false &&
    i135.authorityAcquiredByThisGate === false &&
    i135.visibleStemBinaryEffectiveInteractionEligibilityResolved === false &&
    i135.classificationAuthorized === false &&
    i135.numericScoringAuthorized === false &&
    i135.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_REGISTERED_POLICY_ADOPTION_CONTRACT'
  );
}

function adoptionRecord(
  i135: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredPolicyAdoptionReadinessReviewReport,
): I136RegisteredPolicyAdoptionRecord {
  if (i135.registrationId === null) {
    throw new Error('I136 requires a non-null I135 registrationId');
  }
  const material = {
    adoptionVersion: 'v1-adoption' as const,
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy' as const,
    policyVersion: 'v1-definition' as const,
    registrationVersion: 'v1-registration' as const,
    registrationId: i135.registrationId,
    adoptionReadinessReviewId: i135.reviewId,
    adoptionState: 'ADOPTED_NOT_EXECUTABLE_CANDIDATE_EVALUATION_NOT_AUTHORIZED' as const,
    targetScope: 'VISIBLE_HEAVENLY_STEM_BINARY_EFFECTIVE_INTERACTION_ELIGIBILITY' as const,
    adoptionBindsExactRegistration: true as const,
    registeredPolicyDefinitionImmutable: true as const,
    priorEvidenceGrandfatheredAtAdoption: false as const,
    priorEvidenceRequiresRebindingBeforeCandidateEvaluation: true as const,
    policyExecutionRequiresSeparateAuthorization: true as const,
    candidateSetEvaluationRequiresSeparateAuthorization: true as const,
    adoptionDoesNotAuthorizeSemanticBridges: true as const,
    adoptionDoesNotResolveContradictions: true as const,
    adoptionDoesNotEstablishCandidateSetAdmissibility: true as const,
    adoptionDoesNotEqualThresholdAuthority: true as const,
  };
  return {
    adoptionId: `visible_stem_ke_composition_policy_adoption_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

function common(
  i135: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredPolicyAdoptionReadinessReviewReport,
) {
  return {
    contractVersion:
      I136_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_REGISTERED_POLICY_ADOPTION_CONTRACT_VERSION,
    upstreamI135ReviewId: i135.reviewId,
    priorEvidenceGrandfatheredAtAdoption: false as const,
    policyExecutableByThisGate: false as const,
    policyExecutionAuthorizedByThisGate: false as const,
    candidateSetEvaluationAuthorizedByThisGate: false as const,
    candidateSetEvaluationPerformedByThisGate: false as const,
    actualCompositionPerformedByThisGate: false as const,
    crossCandidateCompositionAuthorized: false as const,
    multiSourceCompositionAuthorized: false as const,
    semanticEquivalenceAuthorizedByAdoption: false as const,
    contradictionResolvedByAdoption: false as const,
    candidateSetAdmissibilityEstablishedByAdoption: false as const,
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
  material: Omit<ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredPolicyAdoptionContractReport, 'contractId'>,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredPolicyAdoptionContractReport {
  return {
    contractId: `challenge_combination_support_channel_untouched_support_ke_visible_stem_threshold_registered_policy_adoption_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI136ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredPolicyAdoptionContract(
  i135: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredPolicyAdoptionReadinessReviewReport,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredPolicyAdoptionContractReport {
  const base = common(i135);

  if (!exactI135Accepted(i135)) {
    return finalized({
      ...base,
      status: 'I135_ADOPTION_READINESS_UNRESOLVED_OR_INVALID',
      decision: 'REGISTERED_POLICY_ADOPTION_NOT_ESTABLISHED',
      adoptionRecord: null,
      adoptionRecordCreated: false,
      adoptionIdentityBoundToExactRegistration: false,
      adoptionReadinessBoundToI135Review: false,
      registeredPolicyDefinitionPreservedWithoutMutation: false,
      priorEvidenceRebindingRequiredBeforeCandidateEvaluation: false,
      policyAdoptionAuthorizedByThisGate: false,
      policyAdoptedByThisGate: false,
      policyAdoptionPerformedByThisGate: false,
      adoptedPolicyCandidateSetEvaluationReadinessNotYetReviewed: true,
      singleCandidateFullSixContractRemainsNormativeDefaultUntilCandidateSetEvaluationAuthorization: true,
      continuedSingleCandidateDiscoveryStillPermitted: true,
      recommendedNextGate:
        'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_REGISTERED_POLICY_ADOPTION_READINESS_REVIEW',
      notes: ['I136 fails closed unless the exact I135 adoption-readiness result remains intact.'],
    });
  }

  return finalized({
    ...base,
    status:
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_REGISTERED_POLICY_ADOPTION_CONTRACT',
    decision:
      'REGISTERED_POLICY_V1_ADOPTED_NOT_EXECUTABLE_CANDIDATE_EVALUATION_NOT_AUTHORIZED_NO_THRESHOLD_AUTHORITY',
    adoptionRecord: adoptionRecord(i135),
    adoptionRecordCreated: true,
    adoptionIdentityBoundToExactRegistration: true,
    adoptionReadinessBoundToI135Review: true,
    registeredPolicyDefinitionPreservedWithoutMutation: true,
    priorEvidenceRebindingRequiredBeforeCandidateEvaluation: true,
    policyAdoptionAuthorizedByThisGate: true,
    policyAdoptedByThisGate: true,
    policyAdoptionPerformedByThisGate: true,
    adoptedPolicyCandidateSetEvaluationReadinessNotYetReviewed: true,
    singleCandidateFullSixContractRemainsNormativeDefaultUntilCandidateSetEvaluationAuthorization: true,
    continuedSingleCandidateDiscoveryStillPermitted: true,
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_ADOPTED_POLICY_CANDIDATE_SET_EVALUATION_AUTHORIZATION_READINESS_REVIEW',
    notes: [
      'I136 adopts only the exact prospectively registered v1 policy and does not mutate its definition.',
      'Adoption is not execution. Candidate-set evaluation remains unauthorized and all prior evidence requires rebinding under the adopted policy.',
      'No semantic bridge, contradiction resolution, candidate admissibility, visible-stem threshold, classifier, or numeric scoring authority is created by adoption.',
    ],
  });
}
