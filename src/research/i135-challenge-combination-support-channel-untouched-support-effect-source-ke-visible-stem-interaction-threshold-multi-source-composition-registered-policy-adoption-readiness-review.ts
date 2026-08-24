import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionPolicyProspectiveRegistrationContractReport } from './i134-challenge-combination-support-channel-untouched-support-effect-source-ke-visible-stem-interaction-threshold-multi-source-composition-policy-prospective-registration-contract.js';

export const I135_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_REGISTERED_POLICY_ADOPTION_READINESS_REVIEW_VERSION =
  'myeonghwa-challenge-combination-support-channel-untouched-support-effect-source-ke-visible-stem-interaction-threshold-multi-source-composition-registered-policy-adoption-readiness-review-v1';

export const I135_REGISTERED_POLICY_ADOPTION_READINESS_REQUIREMENTS = [
  'REGISTERED_POLICY_IDENTITY_IMMUTABLE',
  'PROSPECTIVE_ORDERING_AND_NO_PRE_REGISTRATION_EVALUATION',
  'NO_PRIOR_EVIDENCE_GRANDFATHERING',
  'PRIOR_EVIDENCE_REBINDING_REQUIRED',
  'POLICY_CHANGE_REQUIRES_NEW_VERSION_AND_REGISTRATION',
  'ADOPTION_SEPARATE_FROM_POLICY_EXECUTION',
  'ADOPTION_SEPARATE_FROM_CANDIDATE_SET_EVALUATION_AUTHORIZATION',
  'ADOPTION_SEPARATE_FROM_THRESHOLD_AUTHORITY',
] as const;

export type I135RegisteredPolicyAdoptionReadinessRequirement =
  (typeof I135_REGISTERED_POLICY_ADOPTION_READINESS_REQUIREMENTS)[number];

export interface ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredPolicyAdoptionReadinessReviewReport {
  reviewId: string;
  reviewVersion: string;
  status:
    | 'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_REGISTERED_POLICY_ADOPTION_READINESS_REVIEW'
    | 'I134_REGISTRATION_UNRESOLVED_OR_INVALID';
  decision:
    | 'REGISTERED_POLICY_SATISFIES_ADOPTION_READINESS_PRECONDITIONS_SEPARATE_ADOPTION_CONTRACT_MAY_PROCEED_NO_ADOPTION_OR_EXECUTION'
    | 'REGISTERED_POLICY_ADOPTION_READINESS_NOT_ESTABLISHED';
  upstreamI134ContractId: string;
  policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy';
  policyVersion: 'v1-definition';
  registrationVersion: 'v1-registration';
  registrationId: string | null;
  registrationStateObserved: 'REGISTERED_NOT_ADOPTED_NOT_EXECUTABLE' | 'UNRESOLVED';
  readinessRequirements: readonly I135RegisteredPolicyAdoptionReadinessRequirement[];
  readinessRequirementCount: 8;
  allReadinessRequirementsMandatory: true;
  exactI134RegistrationAccepted: boolean;
  registrationIdentityImmutable: boolean;
  prospectiveOrderingVerified: boolean;
  noPreRegistrationCandidateEvaluationVerified: boolean;
  noPriorEvidenceGrandfatheringVerified: boolean;
  priorEvidenceRebindingRequirementVerified: boolean;
  policyVersionChangeControlVerified: boolean;
  adoptionSeparatedFromExecution: boolean;
  adoptionSeparatedFromCandidateEvaluationAuthorization: boolean;
  adoptionSeparatedFromThresholdAuthority: boolean;
  adoptionMustBindExactRegistration: boolean;
  adoptionMayNotMutateRegisteredDefinition: boolean;
  adoptionMayNotGrandfatherPriorEvidence: boolean;
  adoptionMayNotEvaluateCandidatesByItself: boolean;
  adoptionMayNotAuthorizeThresholdByItself: boolean;
  registeredPolicyAdoptionReadinessEstablished: boolean;
  separateAdoptionContractMayProceed: boolean;
  policyAdoptionAuthorizedByThisGate: false;
  policyAdoptedByThisGate: false;
  policyExecutableByThisGate: false;
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
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_REGISTERED_POLICY_ADOPTION_CONTRACT'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_POLICY_PROSPECTIVE_REGISTRATION_CONTRACT';
  notes: readonly string[];
}

function exactI134Accepted(
  i134: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionPolicyProspectiveRegistrationContractReport,
): boolean {
  const registration = i134.registrationRecord;
  return (
    i134.status ===
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_POLICY_PROSPECTIVE_REGISTRATION_CONTRACT' &&
    i134.decision ===
      'POLICY_V1_DEFINITION_PROSPECTIVELY_REGISTERED_NOT_ADOPTED_NOT_EXECUTABLE_NO_CANDIDATE_EVALUATION' &&
    registration !== null &&
    registration.policyId === 'myeonghwa-visible-stem-ke-multi-source-composition-policy' &&
    registration.policyVersion === 'v1-definition' &&
    registration.registrationVersion === 'v1-registration' &&
    registration.registrationState === 'REGISTERED_NOT_ADOPTED_NOT_EXECUTABLE' &&
    registration.targetScope === 'VISIBLE_HEAVENLY_STEM_BINARY_EFFECTIVE_INTERACTION_ELIGIBILITY' &&
    registration.registeredI118RequirementCount === 6 &&
    registration.prospectiveBeforeCandidateEvaluation &&
    registration.preRegistrationCandidateSetEvaluationUnderThisPolicyOccurred === false &&
    registration.priorEvidenceGrandfatheredAtRegistration === false &&
    registration.priorEvidenceRequiresRebindingBeforeFutureEvaluation &&
    registration.candidateEvaluationRequiresSeparateAdoptionAndAuthorization &&
    registration.policyChangeRequiresNewVersionAndRegistration &&
    registration.registrationDoesNotAuthorizeSemanticBridges &&
    registration.registrationDoesNotResolveContradictions &&
    registration.registrationDoesNotEqualThresholdAuthority &&
    i134.registrationRecordCreated &&
    i134.registrationIdentityBoundToI132Definition &&
    i134.registrationReadinessBoundToI133Review &&
    i134.prospectiveOrderingVerified &&
    i134.noPreRegistrationCandidateEvaluationUnderPolicy &&
    i134.priorEvidenceGrandfatheredAtRegistration === false &&
    i134.priorEvidenceRebindingRequiredBeforeFutureEvaluation &&
    i134.policyProspectivelyRegisteredByThisGate &&
    i134.policyRegistrationPerformedByThisGate &&
    i134.policyRegistrationContractResolved &&
    i134.policyAdoptionAuthorizedByThisGate === false &&
    i134.policyAdoptedByThisGate === false &&
    i134.policyExecutableByThisGate === false &&
    i134.candidateSetEvaluationAuthorizedByThisGate === false &&
    i134.candidateSetEvaluationPerformedByThisGate === false &&
    i134.actualCompositionPerformedByThisGate === false &&
    i134.crossCandidateCompositionAuthorized === false &&
    i134.multiSourceCompositionAuthorized === false &&
    i134.currentWuHuaiyunCoverageGrandfathered === false &&
    i134.priorCandidateCoverageGrandfathered === false &&
    i134.registeredPolicyAdoptionReadinessNotYetReviewed &&
    i134.authorityAcquiredByThisGate === false &&
    i134.visibleStemBinaryEffectiveInteractionEligibilityResolved === false &&
    i134.classificationAuthorized === false &&
    i134.numericScoringAuthorized === false &&
    i134.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_REGISTERED_POLICY_ADOPTION_READINESS_REVIEW'
  );
}

function common(
  i134: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionPolicyProspectiveRegistrationContractReport,
) {
  return {
    reviewVersion:
      I135_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_REGISTERED_POLICY_ADOPTION_READINESS_REVIEW_VERSION,
    upstreamI134ContractId: i134.contractId,
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy' as const,
    policyVersion: 'v1-definition' as const,
    registrationVersion: 'v1-registration' as const,
    readinessRequirements: I135_REGISTERED_POLICY_ADOPTION_READINESS_REQUIREMENTS,
    readinessRequirementCount: 8 as const,
    allReadinessRequirementsMandatory: true as const,
    adoptionMustBindExactRegistration: true,
    adoptionMayNotMutateRegisteredDefinition: true,
    adoptionMayNotGrandfatherPriorEvidence: true,
    adoptionMayNotEvaluateCandidatesByItself: true,
    adoptionMayNotAuthorizeThresholdByItself: true,
    policyAdoptionAuthorizedByThisGate: false as const,
    policyAdoptedByThisGate: false as const,
    policyExecutableByThisGate: false as const,
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
  material: Omit<ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredPolicyAdoptionReadinessReviewReport, 'reviewId'>,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredPolicyAdoptionReadinessReviewReport {
  return {
    reviewId: `challenge_combination_support_channel_untouched_support_ke_visible_stem_threshold_registered_policy_adoption_readiness_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI135ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredPolicyAdoptionReadinessReview(
  i134: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionPolicyProspectiveRegistrationContractReport,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredPolicyAdoptionReadinessReviewReport {
  const base = common(i134);
  const exactAccepted = exactI134Accepted(i134);

  if (!exactAccepted || i134.registrationRecord === null) {
    return finalized({
      ...base,
      status: 'I134_REGISTRATION_UNRESOLVED_OR_INVALID',
      decision: 'REGISTERED_POLICY_ADOPTION_READINESS_NOT_ESTABLISHED',
      registrationId: null,
      registrationStateObserved: 'UNRESOLVED',
      exactI134RegistrationAccepted: false,
      registrationIdentityImmutable: false,
      prospectiveOrderingVerified: false,
      noPreRegistrationCandidateEvaluationVerified: false,
      noPriorEvidenceGrandfatheringVerified: false,
      priorEvidenceRebindingRequirementVerified: false,
      policyVersionChangeControlVerified: false,
      adoptionSeparatedFromExecution: false,
      adoptionSeparatedFromCandidateEvaluationAuthorization: false,
      adoptionSeparatedFromThresholdAuthority: false,
      registeredPolicyAdoptionReadinessEstablished: false,
      separateAdoptionContractMayProceed: false,
      singleCandidateFullSixContractRemainsNormativeDefault: true,
      continuedSingleCandidateDiscoveryStillPermitted: true,
      recommendedNextGate:
        'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_POLICY_PROSPECTIVE_REGISTRATION_CONTRACT',
      notes: [
        'I135 fails closed unless the exact I134 prospective registration record is intact and no candidate evaluation or adoption has occurred.',
      ],
    });
  }

  return finalized({
    ...base,
    status:
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_REGISTERED_POLICY_ADOPTION_READINESS_REVIEW',
    decision:
      'REGISTERED_POLICY_SATISFIES_ADOPTION_READINESS_PRECONDITIONS_SEPARATE_ADOPTION_CONTRACT_MAY_PROCEED_NO_ADOPTION_OR_EXECUTION',
    registrationId: i134.registrationRecord.registrationId,
    registrationStateObserved: 'REGISTERED_NOT_ADOPTED_NOT_EXECUTABLE',
    exactI134RegistrationAccepted: true,
    registrationIdentityImmutable: true,
    prospectiveOrderingVerified: true,
    noPreRegistrationCandidateEvaluationVerified: true,
    noPriorEvidenceGrandfatheringVerified: true,
    priorEvidenceRebindingRequirementVerified: true,
    policyVersionChangeControlVerified: true,
    adoptionSeparatedFromExecution: true,
    adoptionSeparatedFromCandidateEvaluationAuthorization: true,
    adoptionSeparatedFromThresholdAuthority: true,
    registeredPolicyAdoptionReadinessEstablished: true,
    separateAdoptionContractMayProceed: true,
    singleCandidateFullSixContractRemainsNormativeDefault: true,
    continuedSingleCandidateDiscoveryStillPermitted: true,
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_REGISTERED_POLICY_ADOPTION_CONTRACT',
    notes: [
      'I135 establishes readiness only for a separate governed adoption contract bound to the exact I134 registration.',
      'Adoption must not mutate the registered v1 definition, grandfather prior evidence, execute the policy, evaluate candidates, or create threshold authority.',
      'The single-candidate full-six path remains the normative default until a later adopted policy and separately authorized candidate-set evaluation establish otherwise.',
    ],
  });
}
