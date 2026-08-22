import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { I132PolicyEvaluationStepId } from './i132-challenge-combination-support-channel-untouched-support-effect-source-ke-visible-stem-interaction-threshold-multi-source-composition-policy-definition-contract.js';
import { I143_I118_REQUIREMENT_IDS } from './i143-challenge-combination-support-channel-untouched-support-effect-source-ke-visible-stem-interaction-threshold-multi-source-composition-candidate-set-evidence-rebinding-adjudication-input-materialization-record.js';
import { I144_BINDING_EVALUATION_STEP_IDS } from './i144-challenge-combination-support-channel-untouched-support-effect-source-ke-visible-stem-interaction-threshold-multi-source-composition-registered-input-package-evaluation-authorization-readiness-review.js';
import { I149_REQUIRED_V2_PACKAGE_COMPONENTS } from './i149-challenge-combination-support-channel-untouched-support-effect-source-ke-visible-stem-interaction-threshold-multi-source-composition-scope-adjudication-outcome-registration-new-input-package-materialization-readiness-review.js';
import type { ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeAdjudicatedV2InputPackageMaterializationRecordReport } from './i151-challenge-combination-support-channel-untouched-support-effect-source-ke-visible-stem-interaction-threshold-multi-source-composition-scope-adjudicated-v2-input-package-materialization-record.js';
import type { ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredV2InputPackageEvaluationAuthorizationContractReport } from './i153-challenge-combination-support-channel-untouched-support-effect-source-ke-visible-stem-interaction-threshold-multi-source-composition-registered-v2-input-package-evaluation-authorization-contract.js';

export const I154_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_AUTHORIZED_REGISTERED_V2_INPUT_PACKAGE_FAIL_CLOSED_CANDIDATE_SET_EVALUATION_RECORD_VERSION =
  'myeonghwa-challenge-combination-support-channel-untouched-support-effect-source-ke-visible-stem-interaction-threshold-multi-source-composition-authorized-registered-v2-input-package-fail-closed-candidate-set-evaluation-record-v1';

export type I154EvaluationStepState =
  | 'PASS'
  | 'FAIL_UNRESOLVED'
  | 'NOT_EVALUATED_AFTER_FAIL_CLOSED_STOP'
  | 'NOT_EVALUATED_UNAUTHORIZED';

export interface I154EvaluationStepRecord {
  stepId: I132PolicyEvaluationStepId;
  order: number;
  mandatory: true;
  failClosed: true;
  state: I154EvaluationStepState;
  reason: string;
}

export interface ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionAuthorizedRegisteredV2InputPackageFailClosedCandidateSetEvaluationRecordReport {
  evaluationRecordId: string;
  evaluationRecordVersion: string;
  status:
    | 'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_AUTHORIZED_REGISTERED_V2_INPUT_PACKAGE_FAIL_CLOSED_CANDIDATE_SET_EVALUATION_RECORD'
    | 'I153_AUTHORIZATION_OR_I151_REGISTERED_V2_PACKAGE_INVALID';
  decision:
    | 'REGISTERED_V2_CANDIDATE_SET_EVALUATION_EXECUTED_FAIL_CLOSED_AT_PROVENANCE_INDEPENDENCE_UNRESOLVED_ADMISSIBILITY_NOT_ESTABLISHED'
    | 'AUTHORIZED_REGISTERED_V2_CANDIDATE_SET_EVALUATION_NOT_PERFORMED';
  upstreamI153AuthorizationId: string;
  upstreamI151RecordId: string;
  policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy';
  policyVersion: 'v1-definition';
  adoptionVersion: 'v1-adoption';
  adoptionId: string | null;
  candidateSetVersion: 'v1-candidate-set';
  candidateSetId: string | null;
  inputPackageVersion: 'v2-input-package';
  inputPackageId: string | null;
  sourceInputPackageVersion: 'v1-input-package';
  sourceInputPackageId: string | null;
  exactI153AuthorizationAccepted: boolean;
  exactI151RegisteredV2PackageAccepted: boolean;
  authorizationAndPackageIdentityMatch: boolean;
  evaluationState: 'COMPLETED_FAIL_CLOSED' | 'NOT_PERFORMED';
  authorizationConsumedByThisEvaluationRecord: boolean;
  authorizationReusableAfterThisRecord: boolean;
  evaluationStepRecords: readonly I154EvaluationStepRecord[];
  evaluationStepCount: 9;
  passedStepCount: 4 | 0;
  failedStepCount: 1 | 0;
  notEvaluatedStepCount: 4 | 9;
  firstUnsatisfiedStepId: 'PROVENANCE_INDEPENDENCE_CHECK' | null;
  firstUnsatisfiedStepReason: 'REGISTERED_PROVENANCE_INDEPENDENCE_INPUTS_UNRESOLVED' | null;
  registeredScopeOutcomeConsumedAtScopeCompatibilityStep: boolean;
  scopeCompatibilityReadjudicatedByThisGate: false;
  scopeAdjudicationResultCountObserved: number;
  scopeCompatibleOnlyCountObserved: number;
  scopeRejectedCountObserved: number;
  scopeRejectedEvidenceCoverageIneligibleObserved: boolean;
  provenanceIndependenceUnresolvedCountObserved: number;
  semanticBridgeUnresolvedCountObserved: number;
  contradictionUnresolvedCountObserved: number;
  unresolvedInputsPreservedWithoutInference: boolean;
  noProvenanceIndependenceInferencePerformed: boolean;
  noMissingSemanticBridgeInferencePerformed: boolean;
  noContradictionVoteOrWeightPerformed: boolean;
  laterStepsAfterFirstFailureNotPromotedToPass: boolean;
  candidateSetEvaluationAuthorizedUpstream: boolean;
  candidateSetEvaluationPerformedByThisGate: boolean;
  evaluationResultCreatedByThisGate: boolean;
  candidateSetAdmissibilityState: 'NOT_ESTABLISHED_FAIL_CLOSED' | 'NOT_EVALUATED';
  candidateSetAdmissibilityEstablishedByThisGate: false;
  requirementSatisfactionAdjudicatedByThisGate: false;
  provenanceIndependenceAdjudicatedByThisGate: false;
  semanticBridgeAdjudicatedByThisGate: false;
  contradictionAdjudicatedByThisGate: false;
  fullSixRequirementSatisfactionAdjudicatedByThisGate: false;
  inputPackageMutatedByThisGate: false;
  productionPolicyExecutionAuthorized: false;
  productionPolicyExecutableByThisGate: false;
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
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_ADJUDICATION_READINESS_REVIEW'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_REGISTERED_V2_INPUT_PACKAGE_EVALUATION_AUTHORIZATION_CONTRACT';
  notes: readonly string[];
}

function exactOrdered<T>(actual: readonly T[], expected: readonly T[]): boolean {
  return actual.length === expected.length && actual.every((value, index) => value === expected[index]);
}

function exactI153Accepted(
  i153: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredV2InputPackageEvaluationAuthorizationContractReport,
): boolean {
  return (
    i153.status ===
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_REGISTERED_V2_INPUT_PACKAGE_EVALUATION_AUTHORIZATION_CONTRACT' &&
    i153.decision ===
      'EXACT_REGISTERED_V2_INPUT_PACKAGE_AUTHORIZED_FOR_ONE_NEW_SINGLE_USE_GOVERNED_FAIL_CLOSED_RESEARCH_EVALUATION_NOT_EXECUTED' &&
    i153.policyId === 'myeonghwa-visible-stem-ke-multi-source-composition-policy' &&
    i153.policyVersion === 'v1-definition' &&
    i153.adoptionVersion === 'v1-adoption' &&
    i153.adoptionId !== null &&
    i153.candidateSetVersion === 'v1-candidate-set' &&
    i153.candidateSetId !== null &&
    i153.inputPackageVersion === 'v2-input-package' &&
    i153.inputPackageId !== null &&
    i153.sourceInputPackageVersion === 'v1-input-package' &&
    i153.sourceInputPackageId !== null &&
    i153.inputPackageId !== i153.sourceInputPackageId &&
    i153.exactI152ReadinessAccepted &&
    i153.authorizationState === 'AUTHORIZED_NOT_EXECUTED' &&
    i153.authorizationScope === 'EXACT_REGISTERED_V2_PACKAGE_SINGLE_RESEARCH_EVALUATION' &&
    i153.authorizedEvaluationCount === 1 &&
    i153.authorizationBoundToExactPolicyVersion &&
    i153.authorizationBoundToExactAdoptionId &&
    i153.authorizationBoundToExactCandidateSetId &&
    i153.authorizationBoundToExactV2InputPackageId &&
    i153.authorizationBoundToExactNineStepFailClosedAlgorithm &&
    i153.priorI145AuthorizationReusable === false &&
    i153.thisAuthorizationIsNewAndDistinctFromI145 &&
    i153.packageMutationBeforeEvaluationInvalidatesAuthorization &&
    i153.candidateSetMutationBeforeEvaluationInvalidatesAuthorization &&
    i153.policyVersionChangeBeforeEvaluationInvalidatesAuthorization &&
    i153.registeredScopeOutcomeMustBeConsumedAtScopeCompatibilityStep &&
    i153.scopeCompatibilityMayNotBeReadjudicatedByThisAuthorization &&
    i153.scopeCompatibilityDoesNotEqualRequirementSatisfaction &&
    i153.scopeCompatibilityDoesNotEqualBinaryEligibility &&
    i153.evaluationMustPreserveRemainingUnresolvedInputsAsUnresolved &&
    i153.evaluationMayNotInferProvenanceIndependence &&
    i153.evaluationMayNotInferMissingSemanticBridges &&
    i153.evaluationMayNotResolveContradictionsByVoteOrWeight &&
    i153.evaluationMustFailClosedAtFirstUnsatisfiedMandatoryStep &&
    i153.laterStepsAfterFirstFailureMustNotBePromotedToPass &&
    i153.researchEvaluationExecutionAuthorized &&
    i153.candidateSetEvaluationAuthorizedByThisGate &&
    i153.candidateSetEvaluationPerformedByThisGate === false &&
    i153.evaluationResultCreatedByThisGate === false &&
    i153.unresolvedInputAdjudicationPerformedByThisGate === false &&
    i153.inputPackageMutatedByThisGate === false &&
    i153.requirementSatisfactionAdjudicatedByThisGate === false &&
    i153.productionPolicyExecutionAuthorized === false &&
    i153.actualCompositionPerformedByThisGate === false &&
    i153.multiSourceCompositionAuthorized === false &&
    i153.authorityAcquiredByThisGate === false &&
    i153.visibleStemBinaryEffectiveInteractionEligibilityResolved === false &&
    i153.thresholdRuleCreatedByThisGate === false &&
    i153.damageEvaluationAuthorized === false &&
    i153.classificationAuthorized === false &&
    i153.numericScoringAuthorized === false &&
    i153.hiddenStemInteractionEligibilityGapRemains &&
    i153.hiddenStemAuthorityGap ===
      'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED' &&
    i153.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_AUTHORIZED_REGISTERED_V2_INPUT_PACKAGE_FAIL_CLOSED_CANDIDATE_SET_EVALUATION_RECORD'
  );
}

function exactI151Accepted(
  i151: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeAdjudicatedV2InputPackageMaterializationRecordReport,
): boolean {
  const candidateIds = i151.frozenV1CandidateSetReference?.candidateIds ?? [];
  const evidenceIds = new Set(i151.originalEvidenceRebindingRecords.map((record) => record.evidenceId));
  const scopeEvidenceIds = new Set(i151.scopeAdjudicationResults.map((result) => result.evidenceId));
  const scopeFlagEvidenceIds = new Set(i151.scopeCoverageEligibilityFlags.map((flag) => flag.evidenceId));
  const compatibleResults = i151.scopeAdjudicationResults.filter(
    (result) =>
      result.adjudicationState === 'COMPATIBLE_SCOPE_ONLY_NO_REQUIREMENT_SATISFACTION_FINDING' &&
      result.inputPositionClass === 'VISIBLE_STEM_POSITION_CLASS' &&
      result.scopeEligibleForLaterRequirementCoverage &&
      result.requirementSatisfactionFindingMade === false &&
      result.binaryEligibilityFindingMade === false &&
      result.semanticBridgeFindingMade === false &&
      result.contradictionResolutionMade === false,
  );
  const rejectedResults = i151.scopeAdjudicationResults.filter(
    (result) =>
      result.adjudicationState === 'REJECTED_SCOPE_MISMATCH_GENERIC_FORCE_CONTEXT' &&
      result.inputPositionClass === 'GENERAL_VISIBLE_STEM_FORCE_CONTEXT' &&
      result.scopeEligibleForLaterRequirementCoverage === false &&
      result.reason ===
        'GENERIC_VISIBLE_STEM_FORCE_CONTEXT_CANNOT_SUBSTITUTE_FOR_VISIBLE_STEM_KE_BINARY_ELIGIBILITY' &&
      result.requirementSatisfactionFindingMade === false &&
      result.binaryEligibilityFindingMade === false &&
      result.semanticBridgeFindingMade === false &&
      result.contradictionResolutionMade === false,
  );
  const exactRequirementOwnership =
    i151.originalRequirementOwnershipBindings.length === I143_I118_REQUIREMENT_IDS.length &&
    I143_I118_REQUIREMENT_IDS.every(
      (requirementId) =>
        i151.originalRequirementOwnershipBindings.filter(
          (binding) => binding.i118RequirementId === requirementId,
        ).length === 1 &&
        i151.originalRequirementOwnershipBindings.some(
          (binding) =>
            binding.i118RequirementId === requirementId &&
            binding.satisfactionFindingMade === false &&
            binding.owningEvidenceIds.length > 0 &&
            binding.owningEvidenceIds.every((evidenceId) => evidenceIds.has(evidenceId)),
        ),
    );

  return (
    i151.status ===
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_SCOPE_ADJUDICATED_V2_INPUT_PACKAGE_MATERIALIZATION_RECORD' &&
    i151.decision ===
      'DETERMINISTIC_V2_INPUT_PACKAGE_MATERIALIZED_AND_REGISTERED_WITH_SCOPE_RESULTS_AND_REMAINING_INPUTS_UNRESOLVED_NO_EVALUATION' &&
    i151.policyId === 'myeonghwa-visible-stem-ke-multi-source-composition-policy' &&
    i151.policyVersion === 'v1-definition' &&
    i151.adoptionVersion === 'v1-adoption' &&
    i151.adoptionId !== null &&
    i151.candidateSetVersion === 'v1-candidate-set' &&
    i151.candidateSetId !== null &&
    i151.sourceInputPackageVersion === 'v1-input-package' &&
    i151.sourceInputPackageId !== null &&
    i151.targetInputPackageVersion === 'v2-input-package' &&
    i151.targetInputPackageId !== null &&
    i151.targetInputPackageId !== i151.sourceInputPackageId &&
    i151.targetInputPackageState === 'REGISTERED_NOT_EVALUATED' &&
    i151.exactI150ContractAccepted &&
    i151.exactI148ScopeAdjudicationAccepted &&
    i151.exactI143SourcePackageAccepted &&
    i151.allUpstreamIdentitiesMatch &&
    exactOrdered(i151.materializedComponentIds, I149_REQUIRED_V2_PACKAGE_COMPONENTS) &&
    i151.materializedComponentCount === 10 &&
    i151.allTenRequiredComponentsMaterialized &&
    i151.sourceV1PackageReference !== null &&
    i151.sourceV1PackageReference.inputPackageId === i151.sourceInputPackageId &&
    i151.sourceV1PackageReference.immutable &&
    i151.sourceV1PackagePreservedImmutable &&
    i151.sourceV1PackageMutatedByThisGate === false &&
    i151.frozenV1CandidateSetReference !== null &&
    i151.frozenV1CandidateSetReference.candidateSetId === i151.candidateSetId &&
    i151.frozenV1CandidateSetReference.candidateCount === 6 &&
    candidateIds.length === 6 &&
    new Set(candidateIds).size === 6 &&
    i151.frozenV1CandidateSetReference.frozen &&
    i151.frozenV1CandidateSetPreservedExact &&
    i151.originalEvidenceRebindingRecords.length === 6 &&
    evidenceIds.size === 6 &&
    i151.originalEvidenceRebindingRecords.every(
      (record) =>
        candidateIds.includes(record.candidateId) &&
        record.sourceId.length > 0 &&
        record.witnessId.length > 0 &&
        record.locator.length > 0 &&
        record.bindingState === 'REGISTERED_INPUT_NOT_ADJUDICATED',
    ) &&
    i151.originalEvidenceBindingsPreservedForAudit &&
    exactRequirementOwnership &&
    i151.originalRequirementOwnershipPreservedAsNonSatisfactionBindings &&
    i151.scopeAdjudicationArtifactReference !== null &&
    i151.scopeAdjudicationArtifactReference.sourceInputPackageId === i151.sourceInputPackageId &&
    i151.scopeAdjudicationResults.length === 6 &&
    i151.scopeAdjudicationResultCount === 6 &&
    scopeEvidenceIds.size === 6 &&
    compatibleResults.length === 5 &&
    rejectedResults.length === 1 &&
    i151.scopeCompatibleOnlyCount === 5 &&
    i151.scopeRejectedCount === 1 &&
    i151.scopeCoverageEligibilityFlags.length === 6 &&
    i151.scopeEligibilityFlagCount === 6 &&
    scopeFlagEvidenceIds.size === 6 &&
    [...scopeEvidenceIds].every((evidenceId) => scopeFlagEvidenceIds.has(evidenceId)) &&
    i151.scopeCoverageEligibilityFlags.every((flag) => {
      const result = i151.scopeAdjudicationResults.find((entry) => entry.evidenceId === flag.evidenceId);
      return (
        result !== undefined &&
        result.candidateId === flag.candidateId &&
        result.adjudicationState === flag.adjudicationState &&
        result.scopeEligibleForLaterRequirementCoverage === flag.scopeEligibleForRequirementCoverage
      );
    }) &&
    i151.scopeRejectedEvidenceRetainedForAudit &&
    i151.scopeRejectedEvidenceExcludedFromScopeDependentCoverage &&
    i151.requirementCoverageRecomputedByThisGate === false &&
    i151.requirementSatisfactionAdjudicatedByThisGate === false &&
    i151.originalProvenanceIndependenceInputs.length === 6 &&
    i151.provenanceInputCount === 6 &&
    i151.provenanceUnresolvedCount === 6 &&
    i151.originalProvenanceIndependenceInputs.every((input) => input.independenceState === 'UNRESOLVED') &&
    i151.originalSemanticBridgeInputs.length === 3 &&
    i151.semanticBridgeInputCount === 3 &&
    i151.semanticBridgeUnresolvedCount === 3 &&
    i151.originalSemanticBridgeInputs.every((input) => input.bridgeState === 'UNRESOLVED') &&
    i151.originalContradictionInputs.length === 2 &&
    i151.contradictionInputCount === 2 &&
    i151.contradictionUnresolvedCount === 2 &&
    i151.originalContradictionInputs.every((input) => input.resolutionState === 'UNRESOLVED') &&
    i151.remainingUnresolvedInputsPreservedWithoutInference &&
    i151.targetPackageIdentityDeterministic &&
    i151.targetPackageIdentityDistinctFromSourceV1 &&
    i151.targetPackageCreatedByThisGate &&
    i151.targetPackageRegisteredByThisGate &&
    i151.candidateSetEvaluationAuthorizedByThisGate === false &&
    i151.candidateSetEvaluationPerformedByThisGate === false &&
    i151.consumedI145EvaluationAuthorizationReusable === false &&
    i151.newEvaluationAuthorizationRequiredAfterV2Registration &&
    i151.candidateSetAdmissibilityEstablishedByThisGate === false &&
    i151.productionPolicyExecutionAuthorized === false &&
    i151.actualCompositionPerformedByThisGate === false &&
    i151.multiSourceCompositionAuthorized === false &&
    i151.authorityAcquiredByThisGate === false &&
    i151.visibleStemBinaryEffectiveInteractionEligibilityResolved === false &&
    i151.thresholdRuleCreatedByThisGate === false &&
    i151.damageEvaluationAuthorized === false &&
    i151.classificationAuthorized === false &&
    i151.numericScoringAuthorized === false &&
    i151.hiddenStemInteractionEligibilityGapRemains &&
    i151.hiddenStemAuthorityGap ===
      'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED'
  );
}

function identitiesMatch(
  i153: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredV2InputPackageEvaluationAuthorizationContractReport,
  i151: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeAdjudicatedV2InputPackageMaterializationRecordReport,
): boolean {
  return (
    i153.policyId === i151.policyId &&
    i153.policyVersion === i151.policyVersion &&
    i153.adoptionId === i151.adoptionId &&
    i153.candidateSetId === i151.candidateSetId &&
    i153.inputPackageId === i151.targetInputPackageId &&
    i153.sourceInputPackageId === i151.sourceInputPackageId
  );
}

function evaluationSteps(): readonly I154EvaluationStepRecord[] {
  return I144_BINDING_EVALUATION_STEP_IDS.map((stepId, index) => {
    const order = index + 1;
    switch (stepId) {
      case 'POLICY_REGISTRATION_CHECK':
        return {
          stepId,
          order,
          mandatory: true,
          failClosed: true,
          state: 'PASS',
          reason: 'EXACT_REGISTERED_POLICY_AND_NEW_V2_EVALUATION_AUTHORIZATION_ACCEPTED',
        };
      case 'EVIDENCE_BINDING_INTEGRITY_CHECK':
        return {
          stepId,
          order,
          mandatory: true,
          failClosed: true,
          state: 'PASS',
          reason: 'REGISTERED_V2_ORIGINAL_EVIDENCE_BINDING_AUDIT_INTEGRITY_ACCEPTED',
        };
      case 'REQUIREMENT_OWNERSHIP_CHECK':
        return {
          stepId,
          order,
          mandatory: true,
          failClosed: true,
          state: 'PASS',
          reason: 'ALL_SIX_I118_REQUIREMENTS_HAVE_EXPLICIT_NON_SATISFACTION_OWNERSHIP_BINDINGS',
        };
      case 'SCOPE_COMPATIBILITY_CHECK':
        return {
          stepId,
          order,
          mandatory: true,
          failClosed: true,
          state: 'PASS',
          reason:
            'REGISTERED_I148_SCOPE_ADJUDICATION_RESULTS_EXACT_FIVE_COMPATIBLE_ONE_REJECTED_AND_COVERAGE_FLAGS_INTACT',
        };
      case 'PROVENANCE_INDEPENDENCE_CHECK':
        return {
          stepId,
          order,
          mandatory: true,
          failClosed: true,
          state: 'FAIL_UNRESOLVED',
          reason: 'REGISTERED_PROVENANCE_INDEPENDENCE_INPUTS_UNRESOLVED',
        };
      default:
        return {
          stepId,
          order,
          mandatory: true,
          failClosed: true,
          state: 'NOT_EVALUATED_AFTER_FAIL_CLOSED_STOP',
          reason: 'NOT_EVALUATED_AFTER_PROVENANCE_INDEPENDENCE_FAIL_CLOSED_STOP',
        };
    }
  });
}

function unauthorizedSteps(): readonly I154EvaluationStepRecord[] {
  return I144_BINDING_EVALUATION_STEP_IDS.map((stepId, index) => ({
    stepId,
    order: index + 1,
    mandatory: true,
    failClosed: true,
    state: 'NOT_EVALUATED_UNAUTHORIZED',
    reason: 'EVALUATION_NOT_AUTHORIZED_OR_REGISTERED_V2_PACKAGE_INVALID',
  }));
}

function finalized(
  material: Omit<ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionAuthorizedRegisteredV2InputPackageFailClosedCandidateSetEvaluationRecordReport, 'evaluationRecordId'>,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionAuthorizedRegisteredV2InputPackageFailClosedCandidateSetEvaluationRecordReport {
  return {
    evaluationRecordId: `challenge_combination_support_channel_untouched_support_ke_visible_stem_threshold_v2_fail_closed_evaluation_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI154ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionAuthorizedRegisteredV2InputPackageFailClosedCandidateSetEvaluationRecord(
  i153: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionRegisteredV2InputPackageEvaluationAuthorizationContractReport,
  i151: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeAdjudicatedV2InputPackageMaterializationRecordReport,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionAuthorizedRegisteredV2InputPackageFailClosedCandidateSetEvaluationRecordReport {
  const authorizationAccepted = exactI153Accepted(i153);
  const packageAccepted = exactI151Accepted(i151);
  const matched = authorizationAccepted && packageAccepted && identitiesMatch(i153, i151);

  const common = {
    evaluationRecordVersion:
      I154_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_AUTHORIZED_REGISTERED_V2_INPUT_PACKAGE_FAIL_CLOSED_CANDIDATE_SET_EVALUATION_RECORD_VERSION,
    upstreamI153AuthorizationId: i153.authorizationId,
    upstreamI151RecordId: i151.recordId,
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy' as const,
    policyVersion: 'v1-definition' as const,
    adoptionVersion: 'v1-adoption' as const,
    candidateSetVersion: 'v1-candidate-set' as const,
    inputPackageVersion: 'v2-input-package' as const,
    sourceInputPackageVersion: 'v1-input-package' as const,
    scopeCompatibilityReadjudicatedByThisGate: false as const,
    requirementSatisfactionAdjudicatedByThisGate: false as const,
    provenanceIndependenceAdjudicatedByThisGate: false as const,
    semanticBridgeAdjudicatedByThisGate: false as const,
    contradictionAdjudicatedByThisGate: false as const,
    fullSixRequirementSatisfactionAdjudicatedByThisGate: false as const,
    inputPackageMutatedByThisGate: false as const,
    candidateSetAdmissibilityEstablishedByThisGate: false as const,
    productionPolicyExecutionAuthorized: false as const,
    productionPolicyExecutableByThisGate: false as const,
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

  if (!matched) {
    return finalized({
      ...common,
      status: 'I153_AUTHORIZATION_OR_I151_REGISTERED_V2_PACKAGE_INVALID',
      decision: 'AUTHORIZED_REGISTERED_V2_CANDIDATE_SET_EVALUATION_NOT_PERFORMED',
      adoptionId: null,
      candidateSetId: null,
      inputPackageId: null,
      sourceInputPackageId: null,
      exactI153AuthorizationAccepted: authorizationAccepted,
      exactI151RegisteredV2PackageAccepted: packageAccepted,
      authorizationAndPackageIdentityMatch: false,
      evaluationState: 'NOT_PERFORMED',
      authorizationConsumedByThisEvaluationRecord: false,
      authorizationReusableAfterThisRecord: false,
      evaluationStepRecords: unauthorizedSteps(),
      evaluationStepCount: 9,
      passedStepCount: 0,
      failedStepCount: 0,
      notEvaluatedStepCount: 9,
      firstUnsatisfiedStepId: null,
      firstUnsatisfiedStepReason: null,
      registeredScopeOutcomeConsumedAtScopeCompatibilityStep: false,
      scopeAdjudicationResultCountObserved: 0,
      scopeCompatibleOnlyCountObserved: 0,
      scopeRejectedCountObserved: 0,
      scopeRejectedEvidenceCoverageIneligibleObserved: false,
      provenanceIndependenceUnresolvedCountObserved: 0,
      semanticBridgeUnresolvedCountObserved: 0,
      contradictionUnresolvedCountObserved: 0,
      unresolvedInputsPreservedWithoutInference: false,
      noProvenanceIndependenceInferencePerformed: true,
      noMissingSemanticBridgeInferencePerformed: true,
      noContradictionVoteOrWeightPerformed: true,
      laterStepsAfterFirstFailureNotPromotedToPass: true,
      candidateSetEvaluationAuthorizedUpstream: false,
      candidateSetEvaluationPerformedByThisGate: false,
      evaluationResultCreatedByThisGate: false,
      candidateSetAdmissibilityState: 'NOT_EVALUATED',
      recommendedNextGate:
        'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_REGISTERED_V2_INPUT_PACKAGE_EVALUATION_AUTHORIZATION_CONTRACT',
      notes: [
        'I154 performs no evaluation unless the exact I153 authorization and exact registered I151 v2 package both validate and their identities match.',
      ],
    });
  }

  const steps = evaluationSteps();
  const laterStepsNotPass = steps
    .filter((step) => step.order > 5)
    .every((step) => step.state === 'NOT_EVALUATED_AFTER_FAIL_CLOSED_STOP');

  return finalized({
    ...common,
    status:
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_AUTHORIZED_REGISTERED_V2_INPUT_PACKAGE_FAIL_CLOSED_CANDIDATE_SET_EVALUATION_RECORD',
    decision:
      'REGISTERED_V2_CANDIDATE_SET_EVALUATION_EXECUTED_FAIL_CLOSED_AT_PROVENANCE_INDEPENDENCE_UNRESOLVED_ADMISSIBILITY_NOT_ESTABLISHED',
    adoptionId: i151.adoptionId,
    candidateSetId: i151.candidateSetId,
    inputPackageId: i151.targetInputPackageId,
    sourceInputPackageId: i151.sourceInputPackageId,
    exactI153AuthorizationAccepted: true,
    exactI151RegisteredV2PackageAccepted: true,
    authorizationAndPackageIdentityMatch: true,
    evaluationState: 'COMPLETED_FAIL_CLOSED',
    authorizationConsumedByThisEvaluationRecord: true,
    authorizationReusableAfterThisRecord: false,
    evaluationStepRecords: steps,
    evaluationStepCount: 9,
    passedStepCount: 4,
    failedStepCount: 1,
    notEvaluatedStepCount: 4,
    firstUnsatisfiedStepId: 'PROVENANCE_INDEPENDENCE_CHECK',
    firstUnsatisfiedStepReason: 'REGISTERED_PROVENANCE_INDEPENDENCE_INPUTS_UNRESOLVED',
    registeredScopeOutcomeConsumedAtScopeCompatibilityStep: true,
    scopeAdjudicationResultCountObserved: i151.scopeAdjudicationResultCount,
    scopeCompatibleOnlyCountObserved: i151.scopeCompatibleOnlyCount,
    scopeRejectedCountObserved: i151.scopeRejectedCount,
    scopeRejectedEvidenceCoverageIneligibleObserved:
      i151.scopeRejectedEvidenceExcludedFromScopeDependentCoverage,
    provenanceIndependenceUnresolvedCountObserved: i151.provenanceUnresolvedCount,
    semanticBridgeUnresolvedCountObserved: i151.semanticBridgeUnresolvedCount,
    contradictionUnresolvedCountObserved: i151.contradictionUnresolvedCount,
    unresolvedInputsPreservedWithoutInference: i151.remainingUnresolvedInputsPreservedWithoutInference,
    noProvenanceIndependenceInferencePerformed: true,
    noMissingSemanticBridgeInferencePerformed: true,
    noContradictionVoteOrWeightPerformed: true,
    laterStepsAfterFirstFailureNotPromotedToPass: laterStepsNotPass,
    candidateSetEvaluationAuthorizedUpstream: true,
    candidateSetEvaluationPerformedByThisGate: true,
    evaluationResultCreatedByThisGate: true,
    candidateSetAdmissibilityState: 'NOT_ESTABLISHED_FAIL_CLOSED',
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_ADJUDICATION_READINESS_REVIEW',
    notes: [
      'I154 consumes the new I153 single-use authorization exactly once.',
      'The registered I148 scope adjudication is consumed as a complete governed scope outcome; the one rejected generic-force evidence remains ineligible for scope-dependent coverage and is not treated as a scope-step failure.',
      'Evaluation stops at PROVENANCE_INDEPENDENCE_CHECK because all six registered provenance inputs remain unresolved. No provenance inference is permitted.',
      'Semantic-bridge, contradiction, full-six-satisfaction, and admissibility steps are not evaluated after the fail-closed stop.',
    ],
  });
}
