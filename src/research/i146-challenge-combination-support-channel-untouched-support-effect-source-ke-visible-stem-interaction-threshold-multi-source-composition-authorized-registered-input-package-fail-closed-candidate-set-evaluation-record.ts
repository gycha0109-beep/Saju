import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { I132PolicyEvaluationStepId } from './i132-challenge-combination-support-channel-untouched-support-effect-source-ke-visible-stem-interaction-threshold-multi-source-composition-policy-definition-contract.js';
import {
  I143_I118_REQUIREMENT_IDS,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetEvidenceRebindingAdjudicationInputMaterializationRecordReport,
} from './i143-challenge-combination-support-channel-untouched-support-effect-source-ke-visible-stem-interaction-threshold-multi-source-composition-candidate-set-evidence-rebinding-adjudication-input-materialization-record.js';
import { I144_BINDING_EVALUATION_STEP_IDS } from './i144-challenge-combination-support-channel-untouched-support-effect-source-ke-visible-stem-interaction-threshold-multi-source-composition-registered-input-package-evaluation-authorization-readiness-review.js';
import type { ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredInputPackageEvaluationAuthorizationContractReport } from './i145-challenge-combination-support-channel-untouched-support-effect-source-ke-visible-stem-interaction-threshold-multi-source-composition-registered-input-package-evaluation-authorization-contract.js';

export const I146_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_AUTHORIZED_REGISTERED_INPUT_PACKAGE_FAIL_CLOSED_CANDIDATE_SET_EVALUATION_RECORD_VERSION =
  'myeonghwa-challenge-combination-support-channel-untouched-support-effect-source-ke-visible-stem-interaction-threshold-multi-source-composition-authorized-registered-input-package-fail-closed-candidate-set-evaluation-record-v1';

export type I146EvaluationStepState =
  | 'PASS'
  | 'FAIL_UNRESOLVED'
  | 'NOT_EVALUATED_AFTER_FAIL_CLOSED_STOP'
  | 'NOT_EVALUATED_UNAUTHORIZED';

export interface I146EvaluationStepRecord {
  stepId: I132PolicyEvaluationStepId;
  order: number;
  mandatory: true;
  failClosed: true;
  state: I146EvaluationStepState;
  reason: string;
}

export interface ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionAuthorizedRegisteredInputPackageFailClosedCandidateSetEvaluationRecordReport {
  evaluationRecordId: string;
  evaluationRecordVersion: string;
  status:
    | 'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_AUTHORIZED_REGISTERED_INPUT_PACKAGE_FAIL_CLOSED_CANDIDATE_SET_EVALUATION_RECORD'
    | 'I145_AUTHORIZATION_OR_I143_REGISTERED_PACKAGE_INVALID';
  decision:
    | 'CANDIDATE_SET_EVALUATION_EXECUTED_FAIL_CLOSED_AT_SCOPE_COMPATIBILITY_UNRESOLVED_ADMISSIBILITY_NOT_ESTABLISHED'
    | 'AUTHORIZED_CANDIDATE_SET_EVALUATION_NOT_PERFORMED';
  upstreamI145AuthorizationId: string;
  upstreamI143RecordId: string;
  policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy';
  policyVersion: 'v1-definition';
  adoptionVersion: 'v1-adoption';
  adoptionId: string | null;
  candidateSetVersion: 'v1-candidate-set';
  candidateSetId: string | null;
  inputPackageVersion: 'v1-input-package';
  inputPackageId: string | null;
  exactI145AuthorizationAccepted: boolean;
  exactI143RegisteredPackageAccepted: boolean;
  authorizationAndPackageIdentityMatch: boolean;
  evaluationState: 'COMPLETED_FAIL_CLOSED' | 'NOT_PERFORMED';
  authorizationConsumedByThisEvaluationRecord: boolean;
  authorizationReusableAfterThisRecord: false;
  evaluationStepRecords: readonly I146EvaluationStepRecord[];
  evaluationStepCount: 9;
  passedStepCount: 3 | 0;
  failedStepCount: 1 | 0;
  notEvaluatedStepCount: 5 | 9;
  firstUnsatisfiedStepId: 'SCOPE_COMPATIBILITY_CHECK' | null;
  firstUnsatisfiedStepReason: 'REGISTERED_SCOPE_COMPATIBILITY_INPUTS_UNRESOLVED' | null;
  scopeCompatibilityUnresolvedCountObserved: number;
  provenanceIndependenceUnresolvedCountObserved: number;
  semanticBridgeUnresolvedCountObserved: number;
  contradictionUnresolvedCountObserved: number;
  unresolvedInputsPreservedWithoutInference: boolean;
  noMissingSemanticBridgeInferencePerformed: boolean;
  noContradictionVoteOrWeightPerformed: boolean;
  laterStepsAfterFirstFailureNotPromotedToPass: boolean;
  candidateSetEvaluationAuthorizedUpstream: boolean;
  candidateSetEvaluationPerformedByThisGate: boolean;
  evaluationResultCreatedByThisGate: boolean;
  candidateSetAdmissibilityState: 'NOT_ESTABLISHED_FAIL_CLOSED' | 'NOT_EVALUATED';
  candidateSetAdmissibilityEstablishedByThisGate: false;
  scopeCompatibilityAdjudicatedByThisGate: false;
  provenanceIndependenceAdjudicatedByThisGate: false;
  semanticBridgeAdjudicatedByThisGate: false;
  contradictionAdjudicatedByThisGate: false;
  fullSixRequirementSatisfactionAdjudicatedByThisGate: false;
  inputPackageMutatedByThisGate: false;
  productionPolicyExecutionAuthorized: false;
  productionPolicyExecutableByThisGate: false;
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
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_SCOPE_COMPATIBILITY_ADJUDICATION_READINESS_REVIEW'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_REGISTERED_INPUT_PACKAGE_EVALUATION_AUTHORIZATION_CONTRACT';
  notes: readonly string[];
}

function exactI145Accepted(
  i145: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredInputPackageEvaluationAuthorizationContractReport,
): boolean {
  return (
    i145.status ===
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_REGISTERED_INPUT_PACKAGE_EVALUATION_AUTHORIZATION_CONTRACT' &&
    i145.decision ===
      'EXACT_REGISTERED_INPUT_PACKAGE_AUTHORIZED_FOR_ONE_GOVERNED_FAIL_CLOSED_RESEARCH_EVALUATION_NOT_EXECUTED' &&
    i145.policyId === 'myeonghwa-visible-stem-ke-multi-source-composition-policy' &&
    i145.policyVersion === 'v1-definition' &&
    i145.adoptionVersion === 'v1-adoption' &&
    i145.adoptionId !== null &&
    i145.candidateSetVersion === 'v1-candidate-set' &&
    i145.candidateSetId !== null &&
    i145.inputPackageVersion === 'v1-input-package' &&
    i145.inputPackageId !== null &&
    i145.exactI144ReadinessAccepted &&
    i145.authorizationState === 'AUTHORIZED_NOT_EXECUTED' &&
    i145.authorizedEvaluationCount === 1 &&
    i145.authorizationBoundToExactPolicyVersion &&
    i145.authorizationBoundToExactAdoptionId &&
    i145.authorizationBoundToExactCandidateSetId &&
    i145.authorizationBoundToExactInputPackageId &&
    i145.authorizationBoundToNineStepFailClosedAlgorithm &&
    i145.packageMutationBeforeEvaluationInvalidatesAuthorization &&
    i145.candidateSetMutationBeforeEvaluationInvalidatesAuthorization &&
    i145.policyVersionChangeBeforeEvaluationInvalidatesAuthorization &&
    i145.evaluationMustPreserveUnresolvedInputsAsUnresolved &&
    i145.evaluationMayNotInferMissingSemanticBridges &&
    i145.evaluationMayNotResolveContradictionsByVoteOrWeight &&
    i145.evaluationMustFailClosedAtFirstUnsatisfiedMandatoryStep &&
    i145.laterStepsAfterFirstFailureMustNotBePromotedToPass &&
    i145.researchEvaluationExecutionAuthorized &&
    i145.candidateSetEvaluationAuthorizedByThisGate &&
    i145.candidateSetEvaluationPerformedByThisGate === false &&
    i145.evaluationResultCreatedByThisGate === false &&
    i145.inputPackageMutatedByThisGate === false &&
    i145.productionPolicyExecutionAuthorized === false &&
    i145.actualCompositionPerformedByThisGate === false &&
    i145.multiSourceCompositionAuthorized === false &&
    i145.authorityAcquiredByThisGate === false &&
    i145.visibleStemBinaryEffectiveInteractionEligibilityResolved === false &&
    i145.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_AUTHORIZED_REGISTERED_INPUT_PACKAGE_FAIL_CLOSED_CANDIDATE_SET_EVALUATION_RECORD'
  );
}

function exactI143Accepted(
  i143: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetEvidenceRebindingAdjudicationInputMaterializationRecordReport,
): boolean {
  const exactRequirementOwnership =
    i143.requirementOwnershipBindings.length === I143_I118_REQUIREMENT_IDS.length &&
    I143_I118_REQUIREMENT_IDS.every(
      (requirementId) =>
        i143.requirementOwnershipBindings.filter(
          (binding) => binding.i118RequirementId === requirementId,
        ).length === 1 &&
        i143.requirementOwnershipBindings.some(
          (binding) =>
            binding.i118RequirementId === requirementId &&
            binding.owningEvidenceIds.length > 0 &&
            binding.satisfactionFindingMade === false,
        ),
    );

  const exactEvidenceBindings = i143.evidenceRebindingRecords.every(
    (record) =>
      i143.candidateManifest?.candidateIds.includes(record.candidateId) === true &&
      i143.witnessIdentityBindings.some(
        (binding) =>
          binding.witnessId === record.witnessId &&
          binding.sourceId === record.sourceId &&
          binding.normalizedCandidateId === record.candidateId &&
          binding.reproducible &&
          binding.stableLocator.length > 0,
      ) &&
      record.locator.length > 0 &&
      record.bindingState === 'REGISTERED_INPUT_NOT_ADJUDICATED',
  );

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
    i143.candidateManifest.frozen &&
    i143.candidateManifest.candidateSetId === i143.candidateSetId &&
    i143.candidateManifest.adoptionId === i143.adoptionId &&
    i143.allEightArtifactClassesMaterialized &&
    i143.allSixI118RequirementsHaveExplicitOwnershipBindings &&
    i143.everyEvidenceRecordBindsFrozenCandidateSourceWitnessLocator &&
    i143.allWitnessBindingsStableAndReproducible &&
    exactRequirementOwnership &&
    exactEvidenceBindings &&
    i143.unresolvedStatesPreservedWithoutInference &&
    i143.scopeCompatibilityInputs.length > 0 &&
    i143.scopeCompatibilityInputs.every((input) => input.compatibilityState === 'UNRESOLVED') &&
    i143.provenanceIndependenceInputs.length > 0 &&
    i143.provenanceIndependenceInputs.every((input) => input.independenceState === 'UNRESOLVED') &&
    i143.semanticBridgeInputs.length > 0 &&
    i143.semanticBridgeInputs.every((input) => input.bridgeState === 'UNRESOLVED') &&
    i143.contradictionInputs.length > 0 &&
    i143.contradictionInputs.every((input) => input.resolutionState === 'UNRESOLVED') &&
    i143.scopeCompatibilityUnresolvedCount === i143.scopeCompatibilityInputs.length &&
    i143.provenanceIndependenceUnresolvedCount === i143.provenanceIndependenceInputs.length &&
    i143.semanticBridgeUnresolvedCount === i143.semanticBridgeInputs.length &&
    i143.contradictionUnresolvedCount === i143.contradictionInputs.length &&
    i143.inputPackageRegisteredByThisGate &&
    i143.evidenceRebindingPerformedByThisGate &&
    i143.requirementCoverageAdjudicatedByThisGate === false &&
    i143.scopeCompatibilityAdjudicatedByThisGate === false &&
    i143.provenanceIndependenceAdjudicatedByThisGate === false &&
    i143.semanticBridgeAdjudicatedByThisGate === false &&
    i143.contradictionAdjudicatedByThisGate === false &&
    i143.candidateSetEvaluationAuthorizedByThisGate === false &&
    i143.candidateSetEvaluationPerformedByThisGate === false &&
    i143.actualCompositionPerformedByThisGate === false &&
    i143.multiSourceCompositionAuthorized === false &&
    i143.authorityAcquiredByThisGate === false &&
    i143.visibleStemBinaryEffectiveInteractionEligibilityResolved === false
  );
}

function identitiesMatch(
  i145: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredInputPackageEvaluationAuthorizationContractReport,
  i143: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetEvidenceRebindingAdjudicationInputMaterializationRecordReport,
): boolean {
  return (
    i145.policyId === i143.policyId &&
    i145.policyVersion === i143.policyVersion &&
    i145.adoptionId === i143.adoptionId &&
    i145.candidateSetId === i143.candidateSetId &&
    i145.inputPackageId === i143.inputPackageId
  );
}

function failedClosedSteps(): readonly I146EvaluationStepRecord[] {
  return I144_BINDING_EVALUATION_STEP_IDS.map((stepId, index) => {
    const order = index + 1;
    if (order <= 3) {
      const reasons = [
        'EXACT_REGISTERED_POLICY_AND_EVALUATION_AUTHORIZATION_ACCEPTED',
        'REGISTERED_EVIDENCE_AND_WITNESS_BINDING_INTEGRITY_ACCEPTED',
        'ALL_SIX_I118_REQUIREMENTS_HAVE_EXPLICIT_NON_SATISFACTION_OWNERSHIP_BINDINGS',
      ] as const;
      return {
        stepId,
        order,
        mandatory: true,
        failClosed: true,
        state: 'PASS',
        reason: reasons[index],
      };
    }
    if (stepId === 'SCOPE_COMPATIBILITY_CHECK') {
      return {
        stepId,
        order,
        mandatory: true,
        failClosed: true,
        state: 'FAIL_UNRESOLVED',
        reason: 'REGISTERED_SCOPE_COMPATIBILITY_INPUTS_UNRESOLVED',
      };
    }
    return {
      stepId,
      order,
      mandatory: true,
      failClosed: true,
      state: 'NOT_EVALUATED_AFTER_FAIL_CLOSED_STOP',
      reason: 'EARLIER_MANDATORY_STEP_UNSATISFIED_FAIL_CLOSED_STOP',
    };
  });
}

function unauthorizedSteps(): readonly I146EvaluationStepRecord[] {
  return I144_BINDING_EVALUATION_STEP_IDS.map((stepId, index) => ({
    stepId,
    order: index + 1,
    mandatory: true,
    failClosed: true,
    state: 'NOT_EVALUATED_UNAUTHORIZED',
    reason: 'EXACT_AUTHORIZATION_AND_REGISTERED_PACKAGE_BOUNDARY_NOT_ACCEPTED',
  }));
}

function finalized(
  material: Omit<ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionAuthorizedRegisteredInputPackageFailClosedCandidateSetEvaluationRecordReport, 'evaluationRecordId'>,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionAuthorizedRegisteredInputPackageFailClosedCandidateSetEvaluationRecordReport {
  return {
    evaluationRecordId: `challenge_combination_support_channel_untouched_support_ke_visible_stem_threshold_fail_closed_evaluation_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI146ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionAuthorizedRegisteredInputPackageFailClosedCandidateSetEvaluationRecord(
  i145: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredInputPackageEvaluationAuthorizationContractReport,
  i143: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetEvidenceRebindingAdjudicationInputMaterializationRecordReport,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionAuthorizedRegisteredInputPackageFailClosedCandidateSetEvaluationRecordReport {
  const authorizationAccepted = exactI145Accepted(i145);
  const packageAccepted = exactI143Accepted(i143);
  const identityMatch = authorizationAccepted && packageAccepted && identitiesMatch(i145, i143);
  const accepted = authorizationAccepted && packageAccepted && identityMatch;

  const common = {
    evaluationRecordVersion:
      I146_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_AUTHORIZED_REGISTERED_INPUT_PACKAGE_FAIL_CLOSED_CANDIDATE_SET_EVALUATION_RECORD_VERSION,
    upstreamI145AuthorizationId: i145.authorizationId,
    upstreamI143RecordId: i143.recordId,
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy' as const,
    policyVersion: 'v1-definition' as const,
    adoptionVersion: 'v1-adoption' as const,
    candidateSetVersion: 'v1-candidate-set' as const,
    inputPackageVersion: 'v1-input-package' as const,
    authorizationReusableAfterThisRecord: false as const,
    candidateSetAdmissibilityEstablishedByThisGate: false as const,
    scopeCompatibilityAdjudicatedByThisGate: false as const,
    provenanceIndependenceAdjudicatedByThisGate: false as const,
    semanticBridgeAdjudicatedByThisGate: false as const,
    contradictionAdjudicatedByThisGate: false as const,
    fullSixRequirementSatisfactionAdjudicatedByThisGate: false as const,
    inputPackageMutatedByThisGate: false as const,
    productionPolicyExecutionAuthorized: false as const,
    productionPolicyExecutableByThisGate: false as const,
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
      status: 'I145_AUTHORIZATION_OR_I143_REGISTERED_PACKAGE_INVALID',
      decision: 'AUTHORIZED_CANDIDATE_SET_EVALUATION_NOT_PERFORMED',
      adoptionId: null,
      candidateSetId: null,
      inputPackageId: null,
      exactI145AuthorizationAccepted: authorizationAccepted,
      exactI143RegisteredPackageAccepted: packageAccepted,
      authorizationAndPackageIdentityMatch: false,
      evaluationState: 'NOT_PERFORMED',
      authorizationConsumedByThisEvaluationRecord: false,
      evaluationStepRecords: unauthorizedSteps(),
      evaluationStepCount: 9,
      passedStepCount: 0,
      failedStepCount: 0,
      notEvaluatedStepCount: 9,
      firstUnsatisfiedStepId: null,
      firstUnsatisfiedStepReason: null,
      scopeCompatibilityUnresolvedCountObserved: 0,
      provenanceIndependenceUnresolvedCountObserved: 0,
      semanticBridgeUnresolvedCountObserved: 0,
      contradictionUnresolvedCountObserved: 0,
      unresolvedInputsPreservedWithoutInference: false,
      noMissingSemanticBridgeInferencePerformed: true,
      noContradictionVoteOrWeightPerformed: true,
      laterStepsAfterFirstFailureNotPromotedToPass: true,
      candidateSetEvaluationAuthorizedUpstream: authorizationAccepted,
      candidateSetEvaluationPerformedByThisGate: false,
      evaluationResultCreatedByThisGate: false,
      candidateSetAdmissibilityState: 'NOT_EVALUATED',
      recommendedNextGate:
        'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_REGISTERED_INPUT_PACKAGE_EVALUATION_AUTHORIZATION_CONTRACT',
      notes: [
        'I146 performs no evaluation unless the exact I145 authorization and exact I143 registered package both remain valid and identity-matched.',
      ],
    });
  }

  const steps = failedClosedSteps();
  return finalized({
    ...common,
    status:
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_AUTHORIZED_REGISTERED_INPUT_PACKAGE_FAIL_CLOSED_CANDIDATE_SET_EVALUATION_RECORD',
    decision:
      'CANDIDATE_SET_EVALUATION_EXECUTED_FAIL_CLOSED_AT_SCOPE_COMPATIBILITY_UNRESOLVED_ADMISSIBILITY_NOT_ESTABLISHED',
    adoptionId: i143.adoptionId,
    candidateSetId: i143.candidateSetId,
    inputPackageId: i143.inputPackageId,
    exactI145AuthorizationAccepted: true,
    exactI143RegisteredPackageAccepted: true,
    authorizationAndPackageIdentityMatch: true,
    evaluationState: 'COMPLETED_FAIL_CLOSED',
    authorizationConsumedByThisEvaluationRecord: true,
    evaluationStepRecords: steps,
    evaluationStepCount: 9,
    passedStepCount: 3,
    failedStepCount: 1,
    notEvaluatedStepCount: 5,
    firstUnsatisfiedStepId: 'SCOPE_COMPATIBILITY_CHECK',
    firstUnsatisfiedStepReason: 'REGISTERED_SCOPE_COMPATIBILITY_INPUTS_UNRESOLVED',
    scopeCompatibilityUnresolvedCountObserved: i143.scopeCompatibilityUnresolvedCount,
    provenanceIndependenceUnresolvedCountObserved: i143.provenanceIndependenceUnresolvedCount,
    semanticBridgeUnresolvedCountObserved: i143.semanticBridgeUnresolvedCount,
    contradictionUnresolvedCountObserved: i143.contradictionUnresolvedCount,
    unresolvedInputsPreservedWithoutInference: true,
    noMissingSemanticBridgeInferencePerformed: true,
    noContradictionVoteOrWeightPerformed: true,
    laterStepsAfterFirstFailureNotPromotedToPass: steps.slice(4).every(
      (step) => step.state === 'NOT_EVALUATED_AFTER_FAIL_CLOSED_STOP',
    ),
    candidateSetEvaluationAuthorizedUpstream: true,
    candidateSetEvaluationPerformedByThisGate: true,
    evaluationResultCreatedByThisGate: true,
    candidateSetAdmissibilityState: 'NOT_ESTABLISHED_FAIL_CLOSED',
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_SCOPE_COMPATIBILITY_ADJUDICATION_READINESS_REVIEW',
    notes: [
      'I146 consumes the single I145 research-evaluation authorization for the exact registered package and executes the frozen nine-step algorithm in order.',
      'Steps 1-3 pass on registered policy, binding integrity, and explicit requirement ownership. Step 4 fails closed because all registered scope-compatibility inputs remain UNRESOLVED.',
      'Steps 5-9 are not evaluated after the mandatory fail-closed stop. Candidate-set admissibility is not established and no composition or threshold authority is acquired.',
    ],
  });
}
