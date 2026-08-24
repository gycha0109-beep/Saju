import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { I144_BINDING_EVALUATION_STEP_IDS } from './i144-challenge-combination-support-channel-untouched-support-effect-source-ke-visible-stem-interaction-threshold-multi-source-composition-registered-input-package-evaluation-authorization-readiness-review.js';
import type { ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredV2InputPackageEvaluationAuthorizationReadinessReviewReport } from './i152-challenge-combination-support-channel-untouched-support-effect-source-ke-visible-stem-interaction-threshold-multi-source-composition-registered-v2-input-package-evaluation-authorization-readiness-review.js';

export const I153_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_REGISTERED_V2_INPUT_PACKAGE_EVALUATION_AUTHORIZATION_CONTRACT_VERSION =
  'myeonghwa-challenge-combination-support-channel-untouched-support-effect-source-ke-visible-stem-interaction-threshold-multi-source-composition-registered-v2-input-package-evaluation-authorization-contract-v1';

export type I153EvaluationAuthorizationState = 'AUTHORIZED_NOT_EXECUTED' | 'NOT_AUTHORIZED';

export interface ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredV2InputPackageEvaluationAuthorizationContractReport {
  authorizationId: string;
  authorizationVersion: string;
  status:
    | 'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_REGISTERED_V2_INPUT_PACKAGE_EVALUATION_AUTHORIZATION_CONTRACT'
    | 'I152_V2_EVALUATION_AUTHORIZATION_READINESS_INVALID';
  decision:
    | 'EXACT_REGISTERED_V2_INPUT_PACKAGE_AUTHORIZED_FOR_ONE_NEW_SINGLE_USE_GOVERNED_FAIL_CLOSED_RESEARCH_EVALUATION_NOT_EXECUTED'
    | 'REGISTERED_V2_INPUT_PACKAGE_EVALUATION_NOT_AUTHORIZED';
  upstreamI152ReviewId: string;
  policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy';
  policyVersion: 'v1-definition';
  adoptionVersion: 'v1-adoption';
  adoptionId: string | null;
  candidateSetVersion: 'v1-candidate-set';
  candidateSetId: string | null;
  sourceInputPackageVersion: 'v1-input-package';
  sourceInputPackageId: string | null;
  inputPackageVersion: 'v2-input-package';
  inputPackageId: string | null;
  exactI152ReadinessAccepted: boolean;
  authorizationState: I153EvaluationAuthorizationState;
  authorizationScope: 'EXACT_REGISTERED_V2_PACKAGE_SINGLE_RESEARCH_EVALUATION';
  authorizedEvaluationCount: 1 | 0;
  authorizationBoundToExactPolicyVersion: boolean;
  authorizationBoundToExactAdoptionId: boolean;
  authorizationBoundToExactCandidateSetId: boolean;
  authorizationBoundToExactV2InputPackageId: boolean;
  authorizationBoundToExactNineStepFailClosedAlgorithm: boolean;
  priorI145AuthorizationReusable: false;
  thisAuthorizationIsNewAndDistinctFromI145: boolean;
  packageMutationBeforeEvaluationInvalidatesAuthorization: true;
  candidateSetMutationBeforeEvaluationInvalidatesAuthorization: true;
  policyVersionChangeBeforeEvaluationInvalidatesAuthorization: true;
  registeredScopeOutcomeMustBeConsumedAtScopeCompatibilityStep: true;
  scopeCompatibilityMayNotBeReadjudicatedByThisAuthorization: true;
  scopeCompatibilityDoesNotEqualRequirementSatisfaction: true;
  scopeCompatibilityDoesNotEqualBinaryEligibility: true;
  evaluationMustPreserveRemainingUnresolvedInputsAsUnresolved: true;
  evaluationMayNotInferProvenanceIndependence: true;
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
  requirementSatisfactionAdjudicatedByThisGate: false;
  productionPolicyExecutionAuthorized: false;
  productionPolicyExecutableByThisGate: false;
  candidateSetAdmissibilityEstablishedByThisGate: false;
  actualCompositionPerformedByThisGate: false;
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
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_AUTHORIZED_REGISTERED_V2_INPUT_PACKAGE_FAIL_CLOSED_CANDIDATE_SET_EVALUATION_RECORD'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_REGISTERED_V2_INPUT_PACKAGE_EVALUATION_AUTHORIZATION_READINESS_REVIEW';
  notes: readonly string[];
}

function exactStepIds(actual: readonly string[]): boolean {
  return (
    actual.length === I144_BINDING_EVALUATION_STEP_IDS.length &&
    actual.every((stepId, index) => stepId === I144_BINDING_EVALUATION_STEP_IDS[index])
  );
}

function exactI152Accepted(
  i152: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredV2InputPackageEvaluationAuthorizationReadinessReviewReport,
): boolean {
  return (
    i152.status ===
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_REGISTERED_V2_INPUT_PACKAGE_EVALUATION_AUTHORIZATION_READINESS_REVIEW' &&
    i152.decision ===
      'REGISTERED_V2_INPUT_PACKAGE_STRUCTURALLY_READY_FOR_NEW_SINGLE_USE_FAIL_CLOSED_EVALUATION_AUTHORIZATION_CONTRACT_NO_EVALUATION_AUTHORIZED' &&
    i152.policyId === 'myeonghwa-visible-stem-ke-multi-source-composition-policy' &&
    i152.policyVersion === 'v1-definition' &&
    i152.adoptionVersion === 'v1-adoption' &&
    i152.adoptionId !== null &&
    i152.candidateSetVersion === 'v1-candidate-set' &&
    i152.candidateSetId !== null &&
    i152.sourceInputPackageVersion === 'v1-input-package' &&
    i152.sourceInputPackageId !== null &&
    i152.inputPackageVersion === 'v2-input-package' &&
    i152.inputPackageId !== null &&
    i152.inputPackageId !== i152.sourceInputPackageId &&
    i152.registeredPackageStateObserved === 'REGISTERED_NOT_EVALUATED' &&
    i152.exactI151RegisteredV2PackageAccepted &&
    i152.packageIdentityStableDeterministicAndDistinctFromV1 &&
    i152.exactTenMaterializedComponentsPresent &&
    i152.frozenCandidateSetIntegrityVerifiedForReadiness &&
    i152.originalEvidenceAuditBindingsPresentForReadiness &&
    i152.originalRequirementOwnershipRowsRemainNonSatisfactionBindings &&
    i152.scopeAdjudicationArtifactRegisteredForReadiness &&
    i152.scopeAdjudicationResultCount === 6 &&
    i152.scopeCompatibleOnlyCount === 5 &&
    i152.scopeRejectedCount === 1 &&
    i152.scopeCompatibilityResolvedInRegisteredPackage &&
    i152.scopeRejectedEvidenceRetainedButCoverageIneligible &&
    i152.unresolvedProvenanceInputCount === 6 &&
    i152.unresolvedSemanticBridgeInputCount === 3 &&
    i152.unresolvedContradictionInputCount === 2 &&
    i152.remainingUnresolvedInputsAreMandatoryEvaluationInputs &&
    i152.unresolvedInputsCannotBeConvertedToPositiveFindingsByReadinessReview &&
    exactStepIds(i152.bindingEvaluationStepIds) &&
    i152.bindingEvaluationStepCount === 9 &&
    i152.registeredScopeOutcomeMustBeConsumedAtScopeCompatibilityStep &&
    i152.scopeCompatibilityMustNotBeReadjudicatedByAuthorizationContract &&
    i152.provenanceIndependenceMustRemainFailClosedUntilEvaluation &&
    i152.semanticBridgeMustRemainFailClosedUntilEvaluation &&
    i152.contradictionMustRemainFailClosedUntilEvaluation &&
    i152.allEvaluationStepsMandatoryAndFailClosed &&
    i152.evaluationMustConsumeExactRegisteredV2PackageId &&
    i152.evaluationMustConsumeExactFrozenCandidateSetId &&
    i152.priorI145AuthorizationConsumedAndNonReusable &&
    i152.newSingleUseEvaluationAuthorizationRequired &&
    i152.postRegistrationPackageMutationRequiresNewPackageVersion &&
    i152.evaluationAuthorizationReadinessEstablished &&
    i152.separateNewEvaluationAuthorizationContractMayProceed &&
    i152.inputPackageMutatedByThisGate === false &&
    i152.requirementSatisfactionAdjudicatedByThisGate === false &&
    i152.scopeCompatibilityAdjudicatedByThisGate === false &&
    i152.provenanceIndependenceAdjudicatedByThisGate === false &&
    i152.semanticBridgeAdjudicatedByThisGate === false &&
    i152.contradictionAdjudicatedByThisGate === false &&
    i152.candidateSetEvaluationAuthorizedByThisGate === false &&
    i152.candidateSetEvaluationPerformedByThisGate === false &&
    i152.candidateSetAdmissibilityEstablishedByThisGate === false &&
    i152.productionPolicyExecutionAuthorized === false &&
    i152.actualCompositionPerformedByThisGate === false &&
    i152.multiSourceCompositionAuthorized === false &&
    i152.authorityAcquiredByThisGate === false &&
    i152.visibleStemBinaryEffectiveInteractionEligibilityResolved === false &&
    i152.thresholdRuleCreatedByThisGate === false &&
    i152.damageEvaluationAuthorized === false &&
    i152.classificationAuthorized === false &&
    i152.numericScoringAuthorized === false &&
    i152.hiddenStemInteractionEligibilityGapRemains &&
    i152.hiddenStemAuthorityGap ===
      'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED' &&
    i152.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_REGISTERED_V2_INPUT_PACKAGE_EVALUATION_AUTHORIZATION_CONTRACT'
  );
}

function finalized(
  material: Omit<ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredV2InputPackageEvaluationAuthorizationContractReport, 'authorizationId'>,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredV2InputPackageEvaluationAuthorizationContractReport {
  return {
    authorizationId: `challenge_combination_support_channel_untouched_support_ke_visible_stem_threshold_v2_evaluation_authorization_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI153ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredV2InputPackageEvaluationAuthorizationContract(
  i152: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredV2InputPackageEvaluationAuthorizationReadinessReviewReport,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredV2InputPackageEvaluationAuthorizationContractReport {
  const accepted = exactI152Accepted(i152);
  const common = {
    authorizationVersion:
      I153_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_REGISTERED_V2_INPUT_PACKAGE_EVALUATION_AUTHORIZATION_CONTRACT_VERSION,
    upstreamI152ReviewId: i152.reviewId,
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy' as const,
    policyVersion: 'v1-definition' as const,
    adoptionVersion: 'v1-adoption' as const,
    candidateSetVersion: 'v1-candidate-set' as const,
    sourceInputPackageVersion: 'v1-input-package' as const,
    inputPackageVersion: 'v2-input-package' as const,
    authorizationScope: 'EXACT_REGISTERED_V2_PACKAGE_SINGLE_RESEARCH_EVALUATION' as const,
    priorI145AuthorizationReusable: false as const,
    packageMutationBeforeEvaluationInvalidatesAuthorization: true as const,
    candidateSetMutationBeforeEvaluationInvalidatesAuthorization: true as const,
    policyVersionChangeBeforeEvaluationInvalidatesAuthorization: true as const,
    registeredScopeOutcomeMustBeConsumedAtScopeCompatibilityStep: true as const,
    scopeCompatibilityMayNotBeReadjudicatedByThisAuthorization: true as const,
    scopeCompatibilityDoesNotEqualRequirementSatisfaction: true as const,
    scopeCompatibilityDoesNotEqualBinaryEligibility: true as const,
    evaluationMustPreserveRemainingUnresolvedInputsAsUnresolved: true as const,
    evaluationMayNotInferProvenanceIndependence: true as const,
    evaluationMayNotInferMissingSemanticBridges: true as const,
    evaluationMayNotResolveContradictionsByVoteOrWeight: true as const,
    evaluationMustFailClosedAtFirstUnsatisfiedMandatoryStep: true as const,
    laterStepsAfterFirstFailureMustNotBePromotedToPass: true as const,
    candidateSetEvaluationPerformedByThisGate: false as const,
    evaluationResultCreatedByThisGate: false as const,
    unresolvedInputAdjudicationPerformedByThisGate: false as const,
    inputPackageMutatedByThisGate: false as const,
    requirementSatisfactionAdjudicatedByThisGate: false as const,
    productionPolicyExecutionAuthorized: false as const,
    productionPolicyExecutableByThisGate: false as const,
    candidateSetAdmissibilityEstablishedByThisGate: false as const,
    actualCompositionPerformedByThisGate: false as const,
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
      status: 'I152_V2_EVALUATION_AUTHORIZATION_READINESS_INVALID',
      decision: 'REGISTERED_V2_INPUT_PACKAGE_EVALUATION_NOT_AUTHORIZED',
      adoptionId: null,
      candidateSetId: null,
      sourceInputPackageId: null,
      inputPackageId: null,
      exactI152ReadinessAccepted: false,
      authorizationState: 'NOT_AUTHORIZED',
      authorizedEvaluationCount: 0,
      authorizationBoundToExactPolicyVersion: false,
      authorizationBoundToExactAdoptionId: false,
      authorizationBoundToExactCandidateSetId: false,
      authorizationBoundToExactV2InputPackageId: false,
      authorizationBoundToExactNineStepFailClosedAlgorithm: false,
      thisAuthorizationIsNewAndDistinctFromI145: false,
      researchEvaluationExecutionAuthorized: false,
      candidateSetEvaluationAuthorizedByThisGate: false,
      recommendedNextGate:
        'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_REGISTERED_V2_INPUT_PACKAGE_EVALUATION_AUTHORIZATION_READINESS_REVIEW',
      notes: ['I153 fails closed unless the exact I152 readiness review remains intact.'],
    });
  }

  return finalized({
    ...common,
    status:
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_REGISTERED_V2_INPUT_PACKAGE_EVALUATION_AUTHORIZATION_CONTRACT',
    decision:
      'EXACT_REGISTERED_V2_INPUT_PACKAGE_AUTHORIZED_FOR_ONE_NEW_SINGLE_USE_GOVERNED_FAIL_CLOSED_RESEARCH_EVALUATION_NOT_EXECUTED',
    adoptionId: i152.adoptionId,
    candidateSetId: i152.candidateSetId,
    sourceInputPackageId: i152.sourceInputPackageId,
    inputPackageId: i152.inputPackageId,
    exactI152ReadinessAccepted: true,
    authorizationState: 'AUTHORIZED_NOT_EXECUTED',
    authorizedEvaluationCount: 1,
    authorizationBoundToExactPolicyVersion: true,
    authorizationBoundToExactAdoptionId: true,
    authorizationBoundToExactCandidateSetId: true,
    authorizationBoundToExactV2InputPackageId: true,
    authorizationBoundToExactNineStepFailClosedAlgorithm: true,
    thisAuthorizationIsNewAndDistinctFromI145: true,
    researchEvaluationExecutionAuthorized: true,
    candidateSetEvaluationAuthorizedByThisGate: true,
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_AUTHORIZED_REGISTERED_V2_INPUT_PACKAGE_FAIL_CLOSED_CANDIDATE_SET_EVALUATION_RECORD',
    notes: [
      'I153 authorizes exactly one new governed research evaluation bound to the exact registered v2 package and frozen v1 candidate set.',
      'The registered I148 scope outcome must be consumed at the scope-compatibility step without re-adjudication or promotion to requirement satisfaction.',
      'Provenance, semantic bridges, and contradictions remain unresolved. The evaluator may not infer their resolution and must stop at the first unsatisfied mandatory step.',
      'Production execution, source composition, threshold semantics, damage evaluation, classification, and numeric scoring remain unauthorized.',
    ],
  });
}
