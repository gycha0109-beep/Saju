import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetEvidenceRebindingAdjudicationInputMaterializationRecordReport } from './i143-challenge-combination-support-channel-untouched-support-effect-source-ke-visible-stem-interaction-threshold-multi-source-composition-candidate-set-evidence-rebinding-adjudication-input-materialization-record.js';

export const I144_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_REGISTERED_INPUT_PACKAGE_EVALUATION_AUTHORIZATION_READINESS_REVIEW_VERSION =
  'myeonghwa-challenge-combination-support-channel-untouched-support-effect-source-ke-visible-stem-interaction-threshold-multi-source-composition-registered-input-package-evaluation-authorization-readiness-review-v1';

export const I144_BINDING_EVALUATION_STEP_IDS = [
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

export interface ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredInputPackageEvaluationAuthorizationReadinessReviewReport {
  reviewId: string;
  reviewVersion: string;
  status:
    | 'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_REGISTERED_INPUT_PACKAGE_EVALUATION_AUTHORIZATION_READINESS_REVIEW'
    | 'I143_REGISTERED_INPUT_PACKAGE_UNRESOLVED_OR_INVALID';
  decision:
    | 'REGISTERED_INPUT_PACKAGE_STRUCTURALLY_READY_FOR_SEPARATE_FAIL_CLOSED_EVALUATION_AUTHORIZATION_CONTRACT_NO_EVALUATION_AUTHORIZED'
    | 'REGISTERED_INPUT_PACKAGE_EVALUATION_AUTHORIZATION_READINESS_NOT_ESTABLISHED';
  upstreamI143RecordId: string;
  policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy';
  policyVersion: 'v1-definition';
  adoptionVersion: 'v1-adoption';
  adoptionId: string | null;
  candidateSetVersion: 'v1-candidate-set';
  candidateSetId: string | null;
  inputPackageVersion: 'v1-input-package';
  inputPackageId: string | null;
  exactI143RegisteredPackageAccepted: boolean;
  registeredPackageStateObserved: 'REGISTERED_NOT_EVALUATED' | 'NOT_REGISTERED';
  packageIdentityStableAndDeterministic: boolean;
  candidateManifestIntegrityVerifiedForReadiness: boolean;
  evidenceBindingIntegrityVerifiedForReadiness: boolean;
  allSixRequirementOwnershipRowsPresentForReadiness: boolean;
  allEightArtifactClassesPresentForReadiness: boolean;
  unresolvedScopeInputsPresent: boolean;
  unresolvedProvenanceInputsPresent: boolean;
  unresolvedSemanticBridgeInputsPresent: boolean;
  unresolvedContradictionInputsPresent: boolean;
  unresolvedInputsAreEvaluationInputsNotPreauthorizationFailures: true;
  unresolvedInputsCannotBeConvertedToPositiveFindingsByReadinessReview: true;
  bindingEvaluationStepIds: typeof I144_BINDING_EVALUATION_STEP_IDS;
  bindingEvaluationStepCount: 9;
  allEvaluationStepsMandatoryAndFailClosed: true;
  evaluationMustConsumeExactRegisteredPackageId: true;
  evaluationMustConsumeExactFrozenCandidateSetId: true;
  postRegistrationPackageMutationRequiresNewPackageVersion: true;
  evaluationAuthorizationReadinessEstablished: boolean;
  separateEvaluationAuthorizationContractMayProceed: boolean;
  readinessDoesNotEqualEvaluationAuthorization: true;
  readinessDoesNotEqualAdjudication: true;
  readinessDoesNotEqualCandidateSetAdmissibility: true;
  readinessDoesNotEqualCompositionAuthorization: true;
  readinessDoesNotEqualThresholdAuthority: true;
  inputPackageRegisteredByThisGate: false;
  inputPackageMutatedByThisGate: false;
  requirementCoverageAdjudicatedByThisGate: false;
  scopeCompatibilityAdjudicatedByThisGate: false;
  provenanceIndependenceAdjudicatedByThisGate: false;
  semanticBridgeAdjudicatedByThisGate: false;
  contradictionAdjudicatedByThisGate: false;
  candidateSetEvaluationAuthorizedByThisGate: false;
  candidateSetEvaluationPerformedByThisGate: false;
  candidateSetAdmissibilityEstablishedByThisGate: false;
  actualCompositionPerformedByThisGate: false;
  crossCandidateCompositionAuthorized: false;
  multiSourceCompositionAuthorized: false;
  policyExecutableByThisGate: false;
  authorityAcquiredByThisGate: false;
  visibleStemBinaryEffectiveInteractionEligibilityResolved: false;
  thresholdRuleCreatedByThisGate: false;
  damageEvaluationAuthorized: false;
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  hiddenStemInteractionEligibilityGapRemains: true;
  hiddenStemAuthorityGap: 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED';
  recommendedNextGate:
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_REGISTERED_INPUT_PACKAGE_EVALUATION_AUTHORIZATION_CONTRACT'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_CANDIDATE_SET_EVIDENCE_REBINDING_AND_ADJUDICATION_INPUT_MATERIALIZATION_RECORD';
  notes: readonly string[];
}

function exactI143Accepted(
  i143: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetEvidenceRebindingAdjudicationInputMaterializationRecordReport,
): boolean {
  return (
    i143.status ===
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_CANDIDATE_SET_EVIDENCE_REBINDING_ADJUDICATION_INPUT_MATERIALIZATION_RECORD' &&
    i143.decision ===
      'EIGHT_INPUT_ARTIFACT_CLASSES_MATERIALIZED_AND_PACKAGE_REGISTERED_WITH_UNRESOLVED_ADJUDICATION_STATES_NO_EVALUATION' &&
    i143.policyId === 'myeonghwa-visible-stem-ke-multi-source-composition-policy' &&
    i143.policyVersion === 'v1-definition' &&
    i143.adoptionVersion === 'v1-adoption' &&
    i143.adoptionId !== null &&
    i143.candidateSetVersion === 'v1-candidate-set' &&
    i143.candidateSetId !== null &&
    i143.inputPackageVersion === 'v1-input-package' &&
    i143.inputPackageId !== null &&
    i143.inputPackageState === 'REGISTERED_NOT_EVALUATED' &&
    i143.exactI142ReadinessAccepted &&
    i143.candidateManifest !== null &&
    i143.candidateManifest.candidateCount === 6 &&
    i143.candidateManifest.candidateSetId === i143.candidateSetId &&
    i143.candidateManifest.adoptionId === i143.adoptionId &&
    i143.allEightArtifactClassesMaterialized &&
    i143.allSixI118RequirementsHaveExplicitOwnershipBindings &&
    i143.everyEvidenceRecordBindsFrozenCandidateSourceWitnessLocator &&
    i143.allWitnessBindingsStableAndReproducible &&
    i143.unresolvedStatesPreservedWithoutInference &&
    i143.semanticBridgeUnresolvedCount > 0 &&
    i143.contradictionUnresolvedCount > 0 &&
    i143.scopeCompatibilityUnresolvedCount > 0 &&
    i143.provenanceIndependenceUnresolvedCount > 0 &&
    i143.inputPackageRegisteredByThisGate &&
    i143.evidenceRebindingPerformedByThisGate &&
    i143.requirementCoverageAdjudicatedByThisGate === false &&
    i143.scopeCompatibilityAdjudicatedByThisGate === false &&
    i143.provenanceIndependenceAdjudicatedByThisGate === false &&
    i143.semanticBridgeAdjudicatedByThisGate === false &&
    i143.contradictionAdjudicatedByThisGate === false &&
    i143.candidateSetEvaluationAuthorizedByThisGate === false &&
    i143.candidateSetEvaluationPerformedByThisGate === false &&
    i143.candidateSetAdmissibilityEstablishedByThisGate === false &&
    i143.actualCompositionPerformedByThisGate === false &&
    i143.multiSourceCompositionAuthorized === false &&
    i143.authorityAcquiredByThisGate === false &&
    i143.visibleStemBinaryEffectiveInteractionEligibilityResolved === false &&
    i143.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_REGISTERED_INPUT_PACKAGE_EVALUATION_AUTHORIZATION_READINESS_REVIEW'
  );
}

function finalized(
  material: Omit<ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredInputPackageEvaluationAuthorizationReadinessReviewReport, 'reviewId'>,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredInputPackageEvaluationAuthorizationReadinessReviewReport {
  return {
    reviewId: `challenge_combination_support_channel_untouched_support_ke_visible_stem_threshold_registered_package_evaluation_readiness_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI144ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredInputPackageEvaluationAuthorizationReadinessReview(
  i143: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetEvidenceRebindingAdjudicationInputMaterializationRecordReport,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredInputPackageEvaluationAuthorizationReadinessReviewReport {
  const accepted = exactI143Accepted(i143);
  const common = {
    reviewVersion:
      I144_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_REGISTERED_INPUT_PACKAGE_EVALUATION_AUTHORIZATION_READINESS_REVIEW_VERSION,
    upstreamI143RecordId: i143.recordId,
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy' as const,
    policyVersion: 'v1-definition' as const,
    adoptionVersion: 'v1-adoption' as const,
    candidateSetVersion: 'v1-candidate-set' as const,
    inputPackageVersion: 'v1-input-package' as const,
    unresolvedInputsAreEvaluationInputsNotPreauthorizationFailures: true as const,
    unresolvedInputsCannotBeConvertedToPositiveFindingsByReadinessReview: true as const,
    bindingEvaluationStepIds: I144_BINDING_EVALUATION_STEP_IDS,
    bindingEvaluationStepCount: 9 as const,
    allEvaluationStepsMandatoryAndFailClosed: true as const,
    evaluationMustConsumeExactRegisteredPackageId: true as const,
    evaluationMustConsumeExactFrozenCandidateSetId: true as const,
    postRegistrationPackageMutationRequiresNewPackageVersion: true as const,
    readinessDoesNotEqualEvaluationAuthorization: true as const,
    readinessDoesNotEqualAdjudication: true as const,
    readinessDoesNotEqualCandidateSetAdmissibility: true as const,
    readinessDoesNotEqualCompositionAuthorization: true as const,
    readinessDoesNotEqualThresholdAuthority: true as const,
    inputPackageRegisteredByThisGate: false as const,
    inputPackageMutatedByThisGate: false as const,
    requirementCoverageAdjudicatedByThisGate: false as const,
    scopeCompatibilityAdjudicatedByThisGate: false as const,
    provenanceIndependenceAdjudicatedByThisGate: false as const,
    semanticBridgeAdjudicatedByThisGate: false as const,
    contradictionAdjudicatedByThisGate: false as const,
    candidateSetEvaluationAuthorizedByThisGate: false as const,
    candidateSetEvaluationPerformedByThisGate: false as const,
    candidateSetAdmissibilityEstablishedByThisGate: false as const,
    actualCompositionPerformedByThisGate: false as const,
    crossCandidateCompositionAuthorized: false as const,
    multiSourceCompositionAuthorized: false as const,
    policyExecutableByThisGate: false as const,
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
      status: 'I143_REGISTERED_INPUT_PACKAGE_UNRESOLVED_OR_INVALID',
      decision: 'REGISTERED_INPUT_PACKAGE_EVALUATION_AUTHORIZATION_READINESS_NOT_ESTABLISHED',
      adoptionId: null,
      candidateSetId: null,
      inputPackageId: null,
      exactI143RegisteredPackageAccepted: false,
      registeredPackageStateObserved: 'NOT_REGISTERED',
      packageIdentityStableAndDeterministic: false,
      candidateManifestIntegrityVerifiedForReadiness: false,
      evidenceBindingIntegrityVerifiedForReadiness: false,
      allSixRequirementOwnershipRowsPresentForReadiness: false,
      allEightArtifactClassesPresentForReadiness: false,
      unresolvedScopeInputsPresent: false,
      unresolvedProvenanceInputsPresent: false,
      unresolvedSemanticBridgeInputsPresent: false,
      unresolvedContradictionInputsPresent: false,
      evaluationAuthorizationReadinessEstablished: false,
      separateEvaluationAuthorizationContractMayProceed: false,
      recommendedNextGate:
        'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_CANDIDATE_SET_EVIDENCE_REBINDING_AND_ADJUDICATION_INPUT_MATERIALIZATION_RECORD',
      notes: ['I144 fails closed unless the exact I143 registered input package remains intact and unevaluated.'],
    });
  }

  return finalized({
    ...common,
    status:
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_REGISTERED_INPUT_PACKAGE_EVALUATION_AUTHORIZATION_READINESS_REVIEW',
    decision:
      'REGISTERED_INPUT_PACKAGE_STRUCTURALLY_READY_FOR_SEPARATE_FAIL_CLOSED_EVALUATION_AUTHORIZATION_CONTRACT_NO_EVALUATION_AUTHORIZED',
    adoptionId: i143.adoptionId,
    candidateSetId: i143.candidateSetId,
    inputPackageId: i143.inputPackageId,
    exactI143RegisteredPackageAccepted: true,
    registeredPackageStateObserved: 'REGISTERED_NOT_EVALUATED',
    packageIdentityStableAndDeterministic: true,
    candidateManifestIntegrityVerifiedForReadiness: true,
    evidenceBindingIntegrityVerifiedForReadiness: true,
    allSixRequirementOwnershipRowsPresentForReadiness: true,
    allEightArtifactClassesPresentForReadiness: true,
    unresolvedScopeInputsPresent: i143.scopeCompatibilityUnresolvedCount > 0,
    unresolvedProvenanceInputsPresent: i143.provenanceIndependenceUnresolvedCount > 0,
    unresolvedSemanticBridgeInputsPresent: i143.semanticBridgeUnresolvedCount > 0,
    unresolvedContradictionInputsPresent: i143.contradictionUnresolvedCount > 0,
    evaluationAuthorizationReadinessEstablished: true,
    separateEvaluationAuthorizationContractMayProceed: true,
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_REGISTERED_INPUT_PACKAGE_EVALUATION_AUTHORIZATION_CONTRACT',
    notes: [
      'I144 treats unresolved adjudication inputs as material to be consumed by the later mandatory fail-closed evaluation, not as permission to infer favorable resolution.',
      'The registered package identity, frozen candidate-set identity, evidence bindings, ownership rows, and all eight artifact classes are complete enough for a separate evaluation authorization contract.',
      'I144 does not authorize or perform evaluation and does not resolve any scope, provenance, semantic bridge, contradiction, admissibility, composition, or threshold question.',
    ],
  });
}
