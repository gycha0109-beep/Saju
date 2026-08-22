import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type {
  ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetEvidenceRebindingAdjudicationInputMaterializationRecordReport,
  I143EvidenceRebindingRecord,
  I143ScopeCompatibilityInput,
} from './i143-challenge-combination-support-channel-untouched-support-effect-source-ke-visible-stem-interaction-threshold-multi-source-composition-candidate-set-evidence-rebinding-adjudication-input-materialization-record.js';
import {
  I147_SCOPE_COMPATIBILITY_PROCEDURE,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeCompatibilityAdjudicationReadinessReviewReport,
} from './i147-challenge-combination-support-channel-untouched-support-effect-source-ke-visible-stem-interaction-threshold-multi-source-composition-scope-compatibility-adjudication-readiness-review.js';

export const I148_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_SCOPE_COMPATIBILITY_ADJUDICATION_RECORD_VERSION =
  'myeonghwa-challenge-combination-support-channel-untouched-support-effect-source-ke-visible-stem-interaction-threshold-multi-source-composition-scope-compatibility-adjudication-record-v1';

export type I148ScopeCompatibilityAdjudicationState =
  | 'COMPATIBLE_SCOPE_ONLY_NO_REQUIREMENT_SATISFACTION_FINDING'
  | 'REJECTED_SCOPE_MISMATCH_GENERIC_FORCE_CONTEXT'
  | 'UNRESOLVED_SCOPE_OWNERSHIP_GAP';

export interface I148ScopeCompatibilityAdjudicationResult {
  evidenceId: string;
  candidateId: string;
  inputPositionClass: I143ScopeCompatibilityInput['positionClass'];
  adjudicationState: I148ScopeCompatibilityAdjudicationState;
  scopeEligibleForLaterRequirementCoverage: boolean;
  reason:
    | 'EXACT_VISIBLE_STEM_KE_TARGET_AND_EXPLICIT_POSITION_SCOPE_OWNERSHIP_PRESENT'
    | 'GENERIC_VISIBLE_STEM_FORCE_CONTEXT_CANNOT_SUBSTITUTE_FOR_VISIBLE_STEM_KE_BINARY_ELIGIBILITY'
    | 'EXPLICIT_VISIBLE_STEM_POSITION_SCOPE_OWNERSHIP_NOT_PRESENT';
  requirementSatisfactionFindingMade: false;
  binaryEligibilityFindingMade: false;
  semanticBridgeFindingMade: false;
  contradictionResolutionMade: false;
}

export interface ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeCompatibilityAdjudicationRecordReport {
  adjudicationRecordId: string;
  adjudicationRecordVersion: string;
  status:
    | 'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_SCOPE_COMPATIBILITY_ADJUDICATION_RECORD'
    | 'I147_SCOPE_ADJUDICATION_READINESS_OR_I143_PACKAGE_INVALID';
  decision:
    | 'FIVE_VISIBLE_STEM_SCOPE_INPUTS_COMPATIBLE_SCOPE_ONLY_ONE_GENERIC_FORCE_INPUT_REJECTED_NO_REQUIREMENT_SATISFACTION_NO_REEVALUATION'
    | 'SCOPE_COMPATIBILITY_ADJUDICATION_NOT_COMPLETED';
  upstreamI147ReviewId: string;
  upstreamI143RecordId: string;
  policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy';
  policyVersion: 'v1-definition';
  adoptionVersion: 'v1-adoption';
  adoptionId: string | null;
  candidateSetVersion: 'v1-candidate-set';
  candidateSetId: string | null;
  sourceInputPackageVersion: 'v1-input-package';
  sourceInputPackageId: string | null;
  exactI147ReadinessAccepted: boolean;
  exactI143ScopePackageAccepted: boolean;
  readinessAndPackageIdentityMatch: boolean;
  adjudicationResults: readonly I148ScopeCompatibilityAdjudicationResult[];
  adjudicationResultCount: 6 | 0;
  compatibleScopeOnlyCount: 5 | 0;
  rejectedScopeMismatchCount: 1 | 0;
  unresolvedScopeCount: 0 | 6;
  scopeCompatibilityFullyAdjudicated: boolean;
  allAcceptedScopeResultsRemainNonSatisfactionFindings: boolean;
  genericForceSubstitutionRejected: boolean;
  qualitativeForceToBinaryEligibilitySubstitutionPerformed: false;
  hiddenStemAuthorityBorrowingPerformed: false;
  sourceInputPackageMutatedByThisGate: false;
  scopeAdjudicationArtifactCreatedByThisGate: boolean;
  scopeAdjudicationArtifactRegisteredIntoNewPackageByThisGate: false;
  requirementCoverageRecomputedByThisGate: false;
  provenanceIndependenceAdjudicatedByThisGate: false;
  semanticBridgeAdjudicatedByThisGate: false;
  contradictionAdjudicatedByThisGate: false;
  candidateSetReevaluationAuthorizedByThisGate: false;
  candidateSetReevaluationPerformedByThisGate: false;
  consumedI145EvaluationAuthorizationReusable: false;
  newRegisteredPackageRequiredForReevaluation: true;
  newEvaluationAuthorizationRequiredForReevaluation: true;
  candidateSetAdmissibilityEstablishedByThisGate: false;
  productionPolicyExecutionAuthorized: false;
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
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_SCOPE_ADJUDICATION_OUTCOME_REGISTRATION_NEW_INPUT_PACKAGE_MATERIALIZATION_READINESS_REVIEW'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_SCOPE_COMPATIBILITY_ADJUDICATION_READINESS_REVIEW';
  notes: readonly string[];
}

function exactI147Accepted(
  i147: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeCompatibilityAdjudicationReadinessReviewReport,
): boolean {
  return (
    i147.status ===
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_SCOPE_COMPATIBILITY_ADJUDICATION_READINESS_REVIEW' &&
    i147.decision ===
      'SIX_REGISTERED_SCOPE_INPUTS_READY_FOR_SEPARATE_POLICY_GOVERNED_SCOPE_ADJUDICATION_NO_PACKAGE_MUTATION_NO_REEVALUATION' &&
    i147.policyId === 'myeonghwa-visible-stem-ke-multi-source-composition-policy' &&
    i147.policyVersion === 'v1-definition' &&
    i147.adoptionVersion === 'v1-adoption' &&
    i147.adoptionId !== null &&
    i147.candidateSetId !== null &&
    i147.inputPackageId !== null &&
    i147.exactI146FailClosedEvaluationAccepted &&
    i147.exactI143ScopeSubstrateAccepted &&
    i147.evaluationAndPackageIdentityMatch &&
    i147.triggeringEvaluationStepId === 'SCOPE_COMPATIBILITY_CHECK' &&
    i147.triggeringEvaluationStepState === 'FAIL_UNRESOLVED' &&
    i147.scopeCompatibilityInputCount === 6 &&
    i147.visibleStemPositionClassInputCount === 5 &&
    i147.generalVisibleStemForceContextInputCount === 1 &&
    i147.allScopeInputsRemainUnresolved &&
    i147.allScopeInputsTargetExactVisibleStemKeBinaryEligibilityScope &&
    i147.everyScopeInputBindsExistingRegisteredEvidence &&
    i147.everyScopeEvidenceRetainsExplicitI118Ownership &&
    i147.scopeProcedureBoundToFrozenPolicyDefinition &&
    i147.scopeProcedure.requiredRelationKind === I147_SCOPE_COMPATIBILITY_PROCEDURE.requiredRelationKind &&
    i147.scopeProcedure.requiredSurface === I147_SCOPE_COMPATIBILITY_PROCEDURE.requiredSurface &&
    i147.scopeProcedure.positionAndContextCompatibilityMustBeExplicit === true &&
    i147.scopeProcedure.hiddenStemAuthorityBorrowingAllowed === false &&
    i147.scopeProcedure.genericStemForceSubstitutionAllowed === false &&
    i147.scopeProcedure.qualitativePositionForceSubstitutionForBinaryEligibilityAllowed === false &&
    i147.scopeProcedure.defaultWhenScopeMismatch === 'REJECT_REQUIREMENT_COVERAGE' &&
    i147.scopeAdjudicationReadinessEstablished &&
    i147.separateScopeCompatibilityAdjudicationMayProceed &&
    i147.scopeCompatibilityAdjudicatedByThisGate === false &&
    i147.scopeCompatibilityFindingCreatedByThisGate === false &&
    i147.registeredInputPackageMutatedByThisGate === false &&
    i147.consumedI145EvaluationAuthorizationReusable === false &&
    i147.candidateSetReevaluationAuthorizedByThisGate === false &&
    i147.candidateSetReevaluationPerformedByThisGate === false &&
    i147.anyReevaluationRequiresNewRegisteredPackageVersionAndNewAuthorization &&
    i147.actualCompositionPerformedByThisGate === false &&
    i147.multiSourceCompositionAuthorized === false &&
    i147.authorityAcquiredByThisGate === false &&
    i147.visibleStemBinaryEffectiveInteractionEligibilityResolved === false &&
    i147.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_SCOPE_COMPATIBILITY_ADJUDICATION_RECORD'
  );
}

function exactI143ScopePackageAccepted(
  i143: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetEvidenceRebindingAdjudicationInputMaterializationRecordReport,
): boolean {
  const scopeIds = i143.scopeCompatibilityInputs.map((input) => input.evidenceId);
  const uniqueScopeIds = new Set(scopeIds).size === 6;
  const visibleCount = i143.scopeCompatibilityInputs.filter(
    (input) => input.positionClass === 'VISIBLE_STEM_POSITION_CLASS',
  ).length;
  const genericCount = i143.scopeCompatibilityInputs.filter(
    (input) => input.positionClass === 'GENERAL_VISIBLE_STEM_FORCE_CONTEXT',
  ).length;

  return (
    i143.status ===
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_CANDIDATE_SET_EVIDENCE_REBINDING_ADJUDICATION_INPUT_MATERIALIZATION_RECORD' &&
    i143.decision ===
      'EIGHT_INPUT_ARTIFACT_CLASSES_MATERIALIZED_AND_PACKAGE_REGISTERED_WITH_UNRESOLVED_ADJUDICATION_STATES_NO_EVALUATION' &&
    i143.policyId === 'myeonghwa-visible-stem-ke-multi-source-composition-policy' &&
    i143.policyVersion === 'v1-definition' &&
    i143.adoptionVersion === 'v1-adoption' &&
    i143.adoptionId !== null &&
    i143.candidateSetId !== null &&
    i143.inputPackageId !== null &&
    i143.inputPackageState === 'REGISTERED_NOT_EVALUATED' &&
    i143.scopeCompatibilityInputs.length === 6 &&
    i143.scopeCompatibilityUnresolvedCount === 6 &&
    uniqueScopeIds &&
    visibleCount === 5 &&
    genericCount === 1 &&
    i143.scopeCompatibilityInputs.every(
      (input) =>
        input.targetScope === 'VISIBLE_HEAVENLY_STEM_KE_BINARY_EFFECTIVE_INTERACTION_ELIGIBILITY' &&
        input.compatibilityState === 'UNRESOLVED' &&
        i143.evidenceRebindingRecords.filter((record) => record.evidenceId === input.evidenceId).length === 1,
    ) &&
    i143.evidenceRebindingPerformedByThisGate &&
    i143.scopeCompatibilityInputsMaterializedByThisGate &&
    i143.scopeCompatibilityAdjudicatedByThisGate === false &&
    i143.unresolvedStatesPreservedWithoutInference &&
    i143.numericWeightingOrMajorityVotePerformed === false &&
    i143.actualCompositionPerformedByThisGate === false &&
    i143.multiSourceCompositionAuthorized === false
  );
}

function identitiesMatch(
  i147: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeCompatibilityAdjudicationReadinessReviewReport,
  i143: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetEvidenceRebindingAdjudicationInputMaterializationRecordReport,
): boolean {
  return (
    i147.policyId === i143.policyId &&
    i147.policyVersion === i143.policyVersion &&
    i147.adoptionId === i143.adoptionId &&
    i147.candidateSetId === i143.candidateSetId &&
    i147.inputPackageId === i143.inputPackageId &&
    i147.upstreamI143RecordId === i143.recordId
  );
}

function adjudicateOne(
  input: I143ScopeCompatibilityInput,
  evidence: I143EvidenceRebindingRecord,
): I148ScopeCompatibilityAdjudicationResult {
  if (input.positionClass === 'GENERAL_VISIBLE_STEM_FORCE_CONTEXT') {
    return {
      evidenceId: input.evidenceId,
      candidateId: evidence.candidateId,
      inputPositionClass: input.positionClass,
      adjudicationState: 'REJECTED_SCOPE_MISMATCH_GENERIC_FORCE_CONTEXT',
      scopeEligibleForLaterRequirementCoverage: false,
      reason: 'GENERIC_VISIBLE_STEM_FORCE_CONTEXT_CANNOT_SUBSTITUTE_FOR_VISIBLE_STEM_KE_BINARY_ELIGIBILITY',
      requirementSatisfactionFindingMade: false,
      binaryEligibilityFindingMade: false,
      semanticBridgeFindingMade: false,
      contradictionResolutionMade: false,
    };
  }

  if (
    evidence.i118RequirementIds.includes(
      'VISIBLE_STEM_POSITION_SCOPE_AND_POSITION_CLASS_APPLICABILITY',
    )
  ) {
    return {
      evidenceId: input.evidenceId,
      candidateId: evidence.candidateId,
      inputPositionClass: input.positionClass,
      adjudicationState: 'COMPATIBLE_SCOPE_ONLY_NO_REQUIREMENT_SATISFACTION_FINDING',
      scopeEligibleForLaterRequirementCoverage: true,
      reason: 'EXACT_VISIBLE_STEM_KE_TARGET_AND_EXPLICIT_POSITION_SCOPE_OWNERSHIP_PRESENT',
      requirementSatisfactionFindingMade: false,
      binaryEligibilityFindingMade: false,
      semanticBridgeFindingMade: false,
      contradictionResolutionMade: false,
    };
  }

  return {
    evidenceId: input.evidenceId,
    candidateId: evidence.candidateId,
    inputPositionClass: input.positionClass,
    adjudicationState: 'UNRESOLVED_SCOPE_OWNERSHIP_GAP',
    scopeEligibleForLaterRequirementCoverage: false,
    reason: 'EXPLICIT_VISIBLE_STEM_POSITION_SCOPE_OWNERSHIP_NOT_PRESENT',
    requirementSatisfactionFindingMade: false,
    binaryEligibilityFindingMade: false,
    semanticBridgeFindingMade: false,
    contradictionResolutionMade: false,
  };
}

function finalized(
  material: Omit<ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeCompatibilityAdjudicationRecordReport, 'adjudicationRecordId'>,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeCompatibilityAdjudicationRecordReport {
  return {
    adjudicationRecordId: `challenge_combination_support_channel_untouched_support_ke_visible_stem_threshold_scope_adjudication_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI148ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeCompatibilityAdjudicationRecord(
  i147: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeCompatibilityAdjudicationReadinessReviewReport,
  i143: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetEvidenceRebindingAdjudicationInputMaterializationRecordReport,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionScopeCompatibilityAdjudicationRecordReport {
  const readinessAccepted = exactI147Accepted(i147);
  const packageAccepted = exactI143ScopePackageAccepted(i143);
  const identityMatch = readinessAccepted && packageAccepted && identitiesMatch(i147, i143);
  const accepted = readinessAccepted && packageAccepted && identityMatch;

  const common = {
    adjudicationRecordVersion:
      I148_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_SCOPE_COMPATIBILITY_ADJUDICATION_RECORD_VERSION,
    upstreamI147ReviewId: i147.reviewId,
    upstreamI143RecordId: i143.recordId,
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy' as const,
    policyVersion: 'v1-definition' as const,
    adoptionVersion: 'v1-adoption' as const,
    candidateSetVersion: 'v1-candidate-set' as const,
    sourceInputPackageVersion: 'v1-input-package' as const,
    qualitativeForceToBinaryEligibilitySubstitutionPerformed: false as const,
    hiddenStemAuthorityBorrowingPerformed: false as const,
    sourceInputPackageMutatedByThisGate: false as const,
    scopeAdjudicationArtifactRegisteredIntoNewPackageByThisGate: false as const,
    requirementCoverageRecomputedByThisGate: false as const,
    provenanceIndependenceAdjudicatedByThisGate: false as const,
    semanticBridgeAdjudicatedByThisGate: false as const,
    contradictionAdjudicatedByThisGate: false as const,
    candidateSetReevaluationAuthorizedByThisGate: false as const,
    candidateSetReevaluationPerformedByThisGate: false as const,
    consumedI145EvaluationAuthorizationReusable: false as const,
    newRegisteredPackageRequiredForReevaluation: true as const,
    newEvaluationAuthorizationRequiredForReevaluation: true as const,
    candidateSetAdmissibilityEstablishedByThisGate: false as const,
    productionPolicyExecutionAuthorized: false as const,
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
      status: 'I147_SCOPE_ADJUDICATION_READINESS_OR_I143_PACKAGE_INVALID',
      decision: 'SCOPE_COMPATIBILITY_ADJUDICATION_NOT_COMPLETED',
      adoptionId: null,
      candidateSetId: null,
      sourceInputPackageId: null,
      exactI147ReadinessAccepted: readinessAccepted,
      exactI143ScopePackageAccepted: packageAccepted,
      readinessAndPackageIdentityMatch: false,
      adjudicationResults: [],
      adjudicationResultCount: 0,
      compatibleScopeOnlyCount: 0,
      rejectedScopeMismatchCount: 0,
      unresolvedScopeCount: 6,
      scopeCompatibilityFullyAdjudicated: false,
      allAcceptedScopeResultsRemainNonSatisfactionFindings: true,
      genericForceSubstitutionRejected: false,
      scopeAdjudicationArtifactCreatedByThisGate: false,
      recommendedNextGate:
        'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_SCOPE_COMPATIBILITY_ADJUDICATION_READINESS_REVIEW',
      notes: ['I148 performs no scope adjudication unless the exact I147 readiness review and exact immutable I143 scope package remain valid and identity-matched.'],
    });
  }

  const results = i143.scopeCompatibilityInputs.map((input) => {
    const evidence = i143.evidenceRebindingRecords.find(
      (record) => record.evidenceId === input.evidenceId,
    );
    if (evidence === undefined) {
      throw new Error(`I148 invariant breach: missing registered evidence ${input.evidenceId}`);
    }
    return adjudicateOne(input, evidence);
  });
  const compatibleCount = results.filter(
    (result) => result.adjudicationState === 'COMPATIBLE_SCOPE_ONLY_NO_REQUIREMENT_SATISFACTION_FINDING',
  ).length;
  const rejectedCount = results.filter(
    (result) => result.adjudicationState === 'REJECTED_SCOPE_MISMATCH_GENERIC_FORCE_CONTEXT',
  ).length;
  const unresolvedCount = results.filter(
    (result) => result.adjudicationState === 'UNRESOLVED_SCOPE_OWNERSHIP_GAP',
  ).length;
  const exactExpectedOutcome = compatibleCount === 5 && rejectedCount === 1 && unresolvedCount === 0;

  if (!exactExpectedOutcome) {
    return finalized({
      ...common,
      status: 'I147_SCOPE_ADJUDICATION_READINESS_OR_I143_PACKAGE_INVALID',
      decision: 'SCOPE_COMPATIBILITY_ADJUDICATION_NOT_COMPLETED',
      adoptionId: i143.adoptionId,
      candidateSetId: i143.candidateSetId,
      sourceInputPackageId: i143.inputPackageId,
      exactI147ReadinessAccepted: true,
      exactI143ScopePackageAccepted: true,
      readinessAndPackageIdentityMatch: true,
      adjudicationResults: results,
      adjudicationResultCount: 0,
      compatibleScopeOnlyCount: 0,
      rejectedScopeMismatchCount: 0,
      unresolvedScopeCount: 6,
      scopeCompatibilityFullyAdjudicated: false,
      allAcceptedScopeResultsRemainNonSatisfactionFindings: results.every(
        (result) => result.requirementSatisfactionFindingMade === false,
      ),
      genericForceSubstitutionRejected: rejectedCount === 1,
      scopeAdjudicationArtifactCreatedByThisGate: true,
      recommendedNextGate:
        'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_SCOPE_COMPATIBILITY_ADJUDICATION_READINESS_REVIEW',
      notes: ['I148 preserves fail-closed state if any exact visible-stem scope input lacks explicit position-scope ownership or if the expected 5-compatible/1-rejected split is not reproduced.'],
    });
  }

  return finalized({
    ...common,
    status:
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_SCOPE_COMPATIBILITY_ADJUDICATION_RECORD',
    decision:
      'FIVE_VISIBLE_STEM_SCOPE_INPUTS_COMPATIBLE_SCOPE_ONLY_ONE_GENERIC_FORCE_INPUT_REJECTED_NO_REQUIREMENT_SATISFACTION_NO_REEVALUATION',
    adoptionId: i143.adoptionId,
    candidateSetId: i143.candidateSetId,
    sourceInputPackageId: i143.inputPackageId,
    exactI147ReadinessAccepted: true,
    exactI143ScopePackageAccepted: true,
    readinessAndPackageIdentityMatch: true,
    adjudicationResults: results,
    adjudicationResultCount: 6,
    compatibleScopeOnlyCount: 5,
    rejectedScopeMismatchCount: 1,
    unresolvedScopeCount: 0,
    scopeCompatibilityFullyAdjudicated: true,
    allAcceptedScopeResultsRemainNonSatisfactionFindings: true,
    genericForceSubstitutionRejected: true,
    scopeAdjudicationArtifactCreatedByThisGate: true,
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_SCOPE_ADJUDICATION_OUTCOME_REGISTRATION_NEW_INPUT_PACKAGE_MATERIALIZATION_READINESS_REVIEW',
    notes: [
      'Five exact I143 inputs are scope-compatible only because they are registered visible-stem position-class inputs with explicit ownership of the visible-stem position-scope requirement under the exact KE target scope.',
      'Scope compatibility is not requirement satisfaction and does not resolve binary eligibility, qualitative-force semantics, semantic bridges, contradictions, provenance, or candidate-set admissibility.',
      'The one GENERAL_VISIBLE_STEM_FORCE_CONTEXT input is rejected for later requirement coverage because the frozen I132 procedure forbids generic stem-force substitution for visible-stem KE binary eligibility.',
      'I143 remains immutable. The I148 artifact must be separately governed and incorporated into a new registered package before any new evaluation authorization can be considered.',
    ],
  });
}
