import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredInputPackageEvaluationAuthorizationReadinessReviewReport } from './i144-challenge-combination-support-channel-untouched-support-effect-source-ke-visible-stem-interaction-threshold-multi-source-composition-registered-input-package-evaluation-authorization-readiness-review.js';

export const I145_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_REGISTERED_INPUT_PACKAGE_EVALUATION_AUTHORIZATION_CONTRACT_VERSION =
  'myeonghwa-challenge-combination-support-channel-untouched-support-effect-source-ke-visible-stem-interaction-threshold-multi-source-composition-registered-input-package-evaluation-authorization-contract-v1';

export type I145EvaluationAuthorizationState = 'AUTHORIZED_NOT_EXECUTED' | 'NOT_AUTHORIZED';

export interface ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredInputPackageEvaluationAuthorizationContractReport {
  authorizationId: string;
  authorizationVersion: string;
  status:
    | 'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_REGISTERED_INPUT_PACKAGE_EVALUATION_AUTHORIZATION_CONTRACT'
    | 'I144_EVALUATION_AUTHORIZATION_READINESS_UNRESOLVED_OR_INVALID';
  decision:
    | 'EXACT_REGISTERED_INPUT_PACKAGE_AUTHORIZED_FOR_ONE_GOVERNED_FAIL_CLOSED_RESEARCH_EVALUATION_NOT_EXECUTED'
    | 'REGISTERED_INPUT_PACKAGE_EVALUATION_NOT_AUTHORIZED';
  upstreamI144ReviewId: string;
  policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy';
  policyVersion: 'v1-definition';
  adoptionVersion: 'v1-adoption';
  adoptionId: string | null;
  candidateSetVersion: 'v1-candidate-set';
  candidateSetId: string | null;
  inputPackageVersion: 'v1-input-package';
  inputPackageId: string | null;
  exactI144ReadinessAccepted: boolean;
  authorizationState: I145EvaluationAuthorizationState;
  authorizationScope: 'EXACT_REGISTERED_PACKAGE_SINGLE_RESEARCH_EVALUATION';
  authorizedEvaluationCount: 1 | 0;
  authorizationBoundToExactPolicyVersion: boolean;
  authorizationBoundToExactAdoptionId: boolean;
  authorizationBoundToExactCandidateSetId: boolean;
  authorizationBoundToExactInputPackageId: boolean;
  authorizationBoundToNineStepFailClosedAlgorithm: boolean;
  packageMutationBeforeEvaluationInvalidatesAuthorization: true;
  candidateSetMutationBeforeEvaluationInvalidatesAuthorization: true;
  policyVersionChangeBeforeEvaluationInvalidatesAuthorization: true;
  evaluationMustPreserveUnresolvedInputsAsUnresolved: true;
  evaluationMayNotInferMissingSemanticBridges: true;
  evaluationMayNotResolveContradictionsByVoteOrWeight: true;
  evaluationMustFailClosedAtFirstUnsatisfiedMandatoryStep: true;
  laterStepsAfterFirstFailureMustNotBePromotedToPass: true;
  researchEvaluationExecutionAuthorized: boolean;
  candidateSetEvaluationAuthorizedByThisGate: boolean;
  candidateSetEvaluationPerformedByThisGate: false;
  evaluationResultCreatedByThisGate: false;
  unresolvedInputAdjudicationPerformedByThisGate: false;
  inputPackageMutatedByThisGate: false;
  productionPolicyExecutionAuthorized: false;
  productionPolicyExecutableByThisGate: false;
  candidateSetAdmissibilityEstablishedByThisGate: false;
  actualCompositionPerformedByThisGate: false;
  crossCandidateCompositionAuthorized: false;
  multiSourceCompositionAuthorized: false;
  authorityAcquiredByThisGate: false;
  visibleStemBinaryEffectiveInteractionEligibilityResolved: false;
  thresholdRuleCreatedByThisGate: false;
  damageEvaluationAuthorized: false;
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  hiddenStemInteractionEligibilityGapRemains: true;
  hiddenStemAuthorityGap: 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED';
  recommendedNextGate:
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_AUTHORIZED_REGISTERED_INPUT_PACKAGE_FAIL_CLOSED_CANDIDATE_SET_EVALUATION_RECORD'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_REGISTERED_INPUT_PACKAGE_EVALUATION_AUTHORIZATION_READINESS_REVIEW';
  notes: readonly string[];
}

function exactI144Accepted(
  i144: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredInputPackageEvaluationAuthorizationReadinessReviewReport,
): boolean {
  return (
    i144.status ===
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_REGISTERED_INPUT_PACKAGE_EVALUATION_AUTHORIZATION_READINESS_REVIEW' &&
    i144.decision ===
      'REGISTERED_INPUT_PACKAGE_STRUCTURALLY_READY_FOR_SEPARATE_FAIL_CLOSED_EVALUATION_AUTHORIZATION_CONTRACT_NO_EVALUATION_AUTHORIZED' &&
    i144.policyId === 'myeonghwa-visible-stem-ke-multi-source-composition-policy' &&
    i144.policyVersion === 'v1-definition' &&
    i144.adoptionVersion === 'v1-adoption' &&
    i144.adoptionId !== null &&
    i144.candidateSetVersion === 'v1-candidate-set' &&
    i144.candidateSetId !== null &&
    i144.inputPackageVersion === 'v1-input-package' &&
    i144.inputPackageId !== null &&
    i144.exactI143RegisteredPackageAccepted &&
    i144.registeredPackageStateObserved === 'REGISTERED_NOT_EVALUATED' &&
    i144.packageIdentityStableAndDeterministic &&
    i144.candidateManifestIntegrityVerifiedForReadiness &&
    i144.evidenceBindingIntegrityVerifiedForReadiness &&
    i144.allSixRequirementOwnershipRowsPresentForReadiness &&
    i144.allEightArtifactClassesPresentForReadiness &&
    i144.unresolvedScopeInputsPresent &&
    i144.unresolvedProvenanceInputsPresent &&
    i144.unresolvedSemanticBridgeInputsPresent &&
    i144.unresolvedContradictionInputsPresent &&
    i144.bindingEvaluationStepCount === 9 &&
    i144.allEvaluationStepsMandatoryAndFailClosed &&
    i144.evaluationMustConsumeExactRegisteredPackageId &&
    i144.evaluationMustConsumeExactFrozenCandidateSetId &&
    i144.postRegistrationPackageMutationRequiresNewPackageVersion &&
    i144.evaluationAuthorizationReadinessEstablished &&
    i144.separateEvaluationAuthorizationContractMayProceed &&
    i144.candidateSetEvaluationAuthorizedByThisGate === false &&
    i144.candidateSetEvaluationPerformedByThisGate === false &&
    i144.actualCompositionPerformedByThisGate === false &&
    i144.multiSourceCompositionAuthorized === false &&
    i144.authorityAcquiredByThisGate === false &&
    i144.visibleStemBinaryEffectiveInteractionEligibilityResolved === false &&
    i144.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_REGISTERED_INPUT_PACKAGE_EVALUATION_AUTHORIZATION_CONTRACT'
  );
}

function finalized(
  material: Omit<ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredInputPackageEvaluationAuthorizationContractReport, 'authorizationId'>,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredInputPackageEvaluationAuthorizationContractReport {
  return {
    authorizationId: `challenge_combination_support_channel_untouched_support_ke_visible_stem_threshold_evaluation_authorization_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI145ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredInputPackageEvaluationAuthorizationContract(
  i144: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredInputPackageEvaluationAuthorizationReadinessReviewReport,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredInputPackageEvaluationAuthorizationContractReport {
  const accepted = exactI144Accepted(i144);
  const common = {
    authorizationVersion:
      I145_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_REGISTERED_INPUT_PACKAGE_EVALUATION_AUTHORIZATION_CONTRACT_VERSION,
    upstreamI144ReviewId: i144.reviewId,
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy' as const,
    policyVersion: 'v1-definition' as const,
    adoptionVersion: 'v1-adoption' as const,
    candidateSetVersion: 'v1-candidate-set' as const,
    inputPackageVersion: 'v1-input-package' as const,
    authorizationScope: 'EXACT_REGISTERED_PACKAGE_SINGLE_RESEARCH_EVALUATION' as const,
    packageMutationBeforeEvaluationInvalidatesAuthorization: true as const,
    candidateSetMutationBeforeEvaluationInvalidatesAuthorization: true as const,
    policyVersionChangeBeforeEvaluationInvalidatesAuthorization: true as const,
    evaluationMustPreserveUnresolvedInputsAsUnresolved: true as const,
    evaluationMayNotInferMissingSemanticBridges: true as const,
    evaluationMayNotResolveContradictionsByVoteOrWeight: true as const,
    evaluationMustFailClosedAtFirstUnsatisfiedMandatoryStep: true as const,
    laterStepsAfterFirstFailureMustNotBePromotedToPass: true as const,
    candidateSetEvaluationPerformedByThisGate: false as const,
    evaluationResultCreatedByThisGate: false as const,
    unresolvedInputAdjudicationPerformedByThisGate: false as const,
    inputPackageMutatedByThisGate: false as const,
    productionPolicyExecutionAuthorized: false as const,
    productionPolicyExecutableByThisGate: false as const,
    candidateSetAdmissibilityEstablishedByThisGate: false as const,
    actualCompositionPerformedByThisGate: false as const,
    crossCandidateCompositionAuthorized: false as const,
    multiSourceCompositionAuthorized: false as const,
    authorityAcquiredByThisGate: false as const,
    visibleStemBinaryEffectiveInteractionEligibilityResolved: false as const,
    thresholdRuleCreatedByThisGate: false as const,
    damageEvaluationAuthorized: false as const,
    classificationAuthorized: false as const,
    numericScoringAuthorized: false as const,
    hiddenStemInteractionEligibilityGapRemains: true as const,
    hiddenStemAuthorityGap:
      'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED' as const,
  };

  if (!accepted) {
    return finalized({
      ...common,
      status: 'I144_EVALUATION_AUTHORIZATION_READINESS_UNRESOLVED_OR_INVALID',
      decision: 'REGISTERED_INPUT_PACKAGE_EVALUATION_NOT_AUTHORIZED',
      adoptionId: null,
      candidateSetId: null,
      inputPackageId: null,
      exactI144ReadinessAccepted: false,
      authorizationState: 'NOT_AUTHORIZED',
      authorizedEvaluationCount: 0,
      authorizationBoundToExactPolicyVersion: false,
      authorizationBoundToExactAdoptionId: false,
      authorizationBoundToExactCandidateSetId: false,
      authorizationBoundToExactInputPackageId: false,
      authorizationBoundToNineStepFailClosedAlgorithm: false,
      researchEvaluationExecutionAuthorized: false,
      candidateSetEvaluationAuthorizedByThisGate: false,
      recommendedNextGate:
        'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_REGISTERED_INPUT_PACKAGE_EVALUATION_AUTHORIZATION_READINESS_REVIEW',
      notes: ['I145 fails closed unless the exact I144 readiness review remains intact.'],
    });
  }

  return finalized({
    ...common,
    status:
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_REGISTERED_INPUT_PACKAGE_EVALUATION_AUTHORIZATION_CONTRACT',
    decision:
      'EXACT_REGISTERED_INPUT_PACKAGE_AUTHORIZED_FOR_ONE_GOVERNED_FAIL_CLOSED_RESEARCH_EVALUATION_NOT_EXECUTED',
    adoptionId: i144.adoptionId,
    candidateSetId: i144.candidateSetId,
    inputPackageId: i144.inputPackageId,
    exactI144ReadinessAccepted: true,
    authorizationState: 'AUTHORIZED_NOT_EXECUTED',
    authorizedEvaluationCount: 1,
    authorizationBoundToExactPolicyVersion: true,
    authorizationBoundToExactAdoptionId: true,
    authorizationBoundToExactCandidateSetId: true,
    authorizationBoundToExactInputPackageId: true,
    authorizationBoundToNineStepFailClosedAlgorithm: true,
    researchEvaluationExecutionAuthorized: true,
    candidateSetEvaluationAuthorizedByThisGate: true,
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_AUTHORIZED_REGISTERED_INPUT_PACKAGE_FAIL_CLOSED_CANDIDATE_SET_EVALUATION_RECORD',
    notes: [
      'I145 authorizes exactly one governed research evaluation of the exact registered v1 input package and frozen v1 candidate set.',
      'Authorization does not resolve unresolved inputs. The evaluator must fail closed at the first unsatisfied mandatory step and may not infer semantic bridges or vote through contradictions.',
      'This is research evaluation authorization only. Production policy execution, source composition, threshold semantics, damage evaluation, classification, and numeric scoring remain unauthorized.',
    ],
  });
}
