import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetSelectionMaterializationFreezeRecordReport } from './i141-challenge-combination-support-channel-untouched-support-effect-source-ke-visible-stem-interaction-threshold-multi-source-composition-candidate-set-selection-materialization-freeze-record.js';

export const I142_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_CANDIDATE_SET_EVIDENCE_REBINDING_ADJUDICATION_INPUT_MATERIALIZATION_READINESS_REVIEW_VERSION =
  'myeonghwa-challenge-combination-support-channel-untouched-support-effect-source-ke-visible-stem-interaction-threshold-multi-source-composition-candidate-set-evidence-rebinding-adjudication-input-materialization-readiness-review-v1';

export const I142_REQUIRED_INPUT_ARTIFACT_CLASSES = [
  'CANDIDATE_SET_MANIFEST',
  'EVIDENCE_REBINDING_RECORD',
  'REQUIREMENT_OWNERSHIP_BINDINGS',
  'WITNESS_IDENTITY_BINDINGS',
  'SCOPE_COMPATIBILITY_INPUTS',
  'PROVENANCE_INDEPENDENCE_INPUTS',
  'SEMANTIC_BRIDGE_INPUTS',
  'CONTRADICTION_ADJUDICATION_INPUTS',
] as const;

export type I142RequiredInputArtifactClass = (typeof I142_REQUIRED_INPUT_ARTIFACT_CLASSES)[number];

export interface ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetEvidenceRebindingAdjudicationInputMaterializationReadinessReviewReport {
  reviewId: string;
  reviewVersion: string;
  status:
    | 'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_CANDIDATE_SET_EVIDENCE_REBINDING_ADJUDICATION_INPUT_MATERIALIZATION_READINESS_REVIEW'
    | 'I141_CANDIDATE_SET_FREEZE_UNRESOLVED_OR_INVALID';
  decision:
    | 'FROZEN_CANDIDATE_SET_READY_FOR_I138_GOVERNED_EVIDENCE_REBINDING_AND_ADJUDICATION_INPUT_MATERIALIZATION_NO_EVALUATION_AUTHORIZATION'
    | 'EVIDENCE_REBINDING_AND_ADJUDICATION_INPUT_MATERIALIZATION_READINESS_NOT_ESTABLISHED';
  upstreamI141RecordId: string;
  policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy';
  policyVersion: 'v1-definition';
  adoptionVersion: 'v1-adoption';
  adoptionId: string | null;
  selectionContractVersion: 'v1-selection';
  candidateSetVersion: 'v1-candidate-set';
  candidateSetId: string | null;
  exactI141FreezeRecordAccepted: boolean;
  i138InputRegistrationContractLineagePreservedThroughI139I140I141: boolean;
  requiredInputArtifactClasses: readonly I142RequiredInputArtifactClass[];
  requiredInputArtifactClassCount: 8;
  allEightArtifactClassesRequired: true;
  frozenCandidateManifestAvailable: boolean;
  frozenWitnessIdentityBindingsAvailable: boolean;
  selectedCandidateCount: 6;
  selectedCandidateSetIdentityStable: boolean;
  candidateSetFrozenBeforeAdjudication: boolean;
  evidenceRebindingCanBindOnlyFrozenSelectedCandidates: true;
  evidenceRebindingMustBindExactCandidateWitnessAndLocator: true;
  requirementOwnershipMustBeExplicitPerI118Requirement: true;
  implicitRequirementBorrowingForbidden: true;
  scopeInputsMayRecordCompatibleIncompatibleOrUnresolvedWithoutAdjudicating: true;
  provenanceInputsMayRecordIndependentDerivativeOrUnresolvedWithoutWeighting: true;
  semanticBridgeInputsMayRecordPresentAbsentOrUnresolvedWithoutInferringEquivalence: true;
  contradictionInputsMayRecordPresentAbsentOrUnresolvedWithoutResolvingPrecedence: true;
  unresolvedInputsPermittedAtMaterialization: true;
  unresolvedInputsMustFailClosedAtLaterEvaluation: true;
  materializationReadinessEstablished: boolean;
  evidenceRebindingAndAdjudicationInputMaterializationMayProceed: boolean;
  materializationAuthorizationLimitedToInputRecordsOnly: true;
  inputPackageRegisteredByThisGate: false;
  evidenceRebindingPerformedByThisGate: false;
  requirementOwnershipBindingsMaterializedByThisGate: false;
  scopeCompatibilityInputsMaterializedByThisGate: false;
  provenanceIndependenceInputsMaterializedByThisGate: false;
  semanticBridgeInputsMaterializedByThisGate: false;
  contradictionInputsMaterializedByThisGate: false;
  requirementCoverageAdjudicatedByThisGate: false;
  scopeCompatibilityAdjudicatedByThisGate: false;
  provenanceIndependenceAdjudicatedByThisGate: false;
  semanticBridgeAdjudicatedByThisGate: false;
  contradictionAdjudicatedByThisGate: false;
  candidateSetEvaluationAuthorizedByThisGate: false;
  candidateSetEvaluationPerformedByThisGate: false;
  candidateSetAdmissibilityEstablishedByThisGate: false;
  actualCompositionPerformedByThisGate: false;
  multiSourceCompositionAuthorized: false;
  authorityAcquiredByThisGate: false;
  visibleStemBinaryEffectiveInteractionEligibilityResolved: false;
  thresholdRuleCreatedByThisGate: false;
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  hiddenStemInteractionEligibilityGapRemains: true;
  hiddenStemAuthorityGap: 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED';
  recommendedNextGate:
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_CANDIDATE_SET_EVIDENCE_REBINDING_AND_ADJUDICATION_INPUT_MATERIALIZATION_RECORD'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_CANDIDATE_SET_SELECTION_MATERIALIZATION_AND_FREEZE_RECORD';
  notes: readonly string[];
}

function exactI141Accepted(
  i141: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetSelectionMaterializationFreezeRecordReport,
): boolean {
  return (
    i141.status ===
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_CANDIDATE_SET_SELECTION_MATERIALIZATION_FREEZE_RECORD' &&
    i141.decision ===
      'PROSPECTIVELY_SELECTED_CANDIDATE_SET_MATERIALIZED_AND_FROZEN_SIX_SELECTED_ONE_OBJECTIVE_SCOPE_EXCLUSION_NO_EVALUATION' &&
    i141.policyId === 'myeonghwa-visible-stem-ke-multi-source-composition-policy' &&
    i141.policyVersion === 'v1-definition' &&
    i141.adoptionVersion === 'v1-adoption' &&
    i141.adoptionId !== null &&
    i141.selectionContractVersion === 'v1-selection' &&
    i141.candidateSetVersion === 'v1-candidate-set' &&
    i141.candidateSetId !== null &&
    i141.exactI140SelectionContractAccepted &&
    i141.rawSourceGateCandidateObservationCount === 11 &&
    i141.normalizedCandidateCount === 7 &&
    i141.selectedCandidateCount === 6 &&
    i141.excludedCandidateCount === 1 &&
    i141.candidateUniverseMaterializedByThisGate &&
    i141.candidateSetSelectedByThisGate &&
    i141.candidateSetFrozenByThisGate &&
    i141.candidateManifestMaterializedByThisGate &&
    i141.witnessIdentityBindingsMaterializedByThisGate &&
    i141.candidateSetFrozenBeforeRequirementCoverageAdjudication &&
    i141.candidateSetFrozenBeforeScopeProvenanceBridgeContradictionAdjudication &&
    i141.outcomeDrivenCandidateAdditionPerformed === false &&
    i141.outcomeDrivenCandidateRemovalPerformed === false &&
    i141.inputPackageRegisteredByThisGate === false &&
    i141.evidenceRebindingPerformedByThisGate === false &&
    i141.requirementOwnershipAdjudicatedByThisGate === false &&
    i141.scopeCompatibilityAdjudicatedByThisGate === false &&
    i141.provenanceIndependenceAdjudicatedByThisGate === false &&
    i141.semanticBridgeAdjudicatedByThisGate === false &&
    i141.contradictionAdjudicatedByThisGate === false &&
    i141.candidateSetEvaluationAuthorizedByThisGate === false &&
    i141.candidateSetEvaluationPerformedByThisGate === false &&
    i141.candidateSetAdmissibilityEstablishedByThisGate === false &&
    i141.actualCompositionPerformedByThisGate === false &&
    i141.multiSourceCompositionAuthorized === false &&
    i141.authorityAcquiredByThisGate === false &&
    i141.visibleStemBinaryEffectiveInteractionEligibilityResolved === false &&
    i141.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_CANDIDATE_SET_EVIDENCE_REBINDING_AND_ADJUDICATION_INPUT_MATERIALIZATION_READINESS_REVIEW'
  );
}

function finalized(
  material: Omit<ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetEvidenceRebindingAdjudicationInputMaterializationReadinessReviewReport, 'reviewId'>,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetEvidenceRebindingAdjudicationInputMaterializationReadinessReviewReport {
  return {
    reviewId: `challenge_combination_support_channel_untouched_support_ke_visible_stem_threshold_rebinding_input_readiness_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI142ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetEvidenceRebindingAdjudicationInputMaterializationReadinessReview(
  i141: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetSelectionMaterializationFreezeRecordReport,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetEvidenceRebindingAdjudicationInputMaterializationReadinessReviewReport {
  const accepted = exactI141Accepted(i141);
  const common = {
    reviewVersion:
      I142_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_CANDIDATE_SET_EVIDENCE_REBINDING_ADJUDICATION_INPUT_MATERIALIZATION_READINESS_REVIEW_VERSION,
    upstreamI141RecordId: i141.recordId,
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy' as const,
    policyVersion: 'v1-definition' as const,
    adoptionVersion: 'v1-adoption' as const,
    selectionContractVersion: 'v1-selection' as const,
    candidateSetVersion: 'v1-candidate-set' as const,
    requiredInputArtifactClasses: I142_REQUIRED_INPUT_ARTIFACT_CLASSES,
    requiredInputArtifactClassCount: 8 as const,
    allEightArtifactClassesRequired: true as const,
    selectedCandidateCount: 6 as const,
    evidenceRebindingCanBindOnlyFrozenSelectedCandidates: true as const,
    evidenceRebindingMustBindExactCandidateWitnessAndLocator: true as const,
    requirementOwnershipMustBeExplicitPerI118Requirement: true as const,
    implicitRequirementBorrowingForbidden: true as const,
    scopeInputsMayRecordCompatibleIncompatibleOrUnresolvedWithoutAdjudicating: true as const,
    provenanceInputsMayRecordIndependentDerivativeOrUnresolvedWithoutWeighting: true as const,
    semanticBridgeInputsMayRecordPresentAbsentOrUnresolvedWithoutInferringEquivalence: true as const,
    contradictionInputsMayRecordPresentAbsentOrUnresolvedWithoutResolvingPrecedence: true as const,
    unresolvedInputsPermittedAtMaterialization: true as const,
    unresolvedInputsMustFailClosedAtLaterEvaluation: true as const,
    materializationAuthorizationLimitedToInputRecordsOnly: true as const,
    inputPackageRegisteredByThisGate: false as const,
    evidenceRebindingPerformedByThisGate: false as const,
    requirementOwnershipBindingsMaterializedByThisGate: false as const,
    scopeCompatibilityInputsMaterializedByThisGate: false as const,
    provenanceIndependenceInputsMaterializedByThisGate: false as const,
    semanticBridgeInputsMaterializedByThisGate: false as const,
    contradictionInputsMaterializedByThisGate: false as const,
    requirementCoverageAdjudicatedByThisGate: false as const,
    scopeCompatibilityAdjudicatedByThisGate: false as const,
    provenanceIndependenceAdjudicatedByThisGate: false as const,
    semanticBridgeAdjudicatedByThisGate: false as const,
    contradictionAdjudicatedByThisGate: false as const,
    candidateSetEvaluationAuthorizedByThisGate: false as const,
    candidateSetEvaluationPerformedByThisGate: false as const,
    candidateSetAdmissibilityEstablishedByThisGate: false as const,
    actualCompositionPerformedByThisGate: false as const,
    multiSourceCompositionAuthorized: false as const,
    authorityAcquiredByThisGate: false as const,
    visibleStemBinaryEffectiveInteractionEligibilityResolved: false as const,
    thresholdRuleCreatedByThisGate: false as const,
    classificationAuthorized: false as const,
    numericScoringAuthorized: false as const,
    hiddenStemInteractionEligibilityGapRemains: true as const,
    hiddenStemAuthorityGap:
      'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED' as const,
  };

  if (!accepted) {
    return finalized({
      ...common,
      status: 'I141_CANDIDATE_SET_FREEZE_UNRESOLVED_OR_INVALID',
      decision: 'EVIDENCE_REBINDING_AND_ADJUDICATION_INPUT_MATERIALIZATION_READINESS_NOT_ESTABLISHED',
      adoptionId: null,
      candidateSetId: null,
      exactI141FreezeRecordAccepted: false,
      i138InputRegistrationContractLineagePreservedThroughI139I140I141: false,
      frozenCandidateManifestAvailable: false,
      frozenWitnessIdentityBindingsAvailable: false,
      selectedCandidateSetIdentityStable: false,
      candidateSetFrozenBeforeAdjudication: false,
      materializationReadinessEstablished: false,
      evidenceRebindingAndAdjudicationInputMaterializationMayProceed: false,
      recommendedNextGate:
        'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_CANDIDATE_SET_SELECTION_MATERIALIZATION_AND_FREEZE_RECORD',
      notes: ['I142 fails closed unless the exact I141 frozen candidate-set record remains intact.'],
    });
  }

  return finalized({
    ...common,
    status:
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_CANDIDATE_SET_EVIDENCE_REBINDING_ADJUDICATION_INPUT_MATERIALIZATION_READINESS_REVIEW',
    decision:
      'FROZEN_CANDIDATE_SET_READY_FOR_I138_GOVERNED_EVIDENCE_REBINDING_AND_ADJUDICATION_INPUT_MATERIALIZATION_NO_EVALUATION_AUTHORIZATION',
    adoptionId: i141.adoptionId,
    candidateSetId: i141.candidateSetId,
    exactI141FreezeRecordAccepted: true,
    i138InputRegistrationContractLineagePreservedThroughI139I140I141: true,
    frozenCandidateManifestAvailable: true,
    frozenWitnessIdentityBindingsAvailable: true,
    selectedCandidateSetIdentityStable: true,
    candidateSetFrozenBeforeAdjudication: true,
    materializationReadinessEstablished: true,
    evidenceRebindingAndAdjudicationInputMaterializationMayProceed: true,
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_CANDIDATE_SET_EVIDENCE_REBINDING_AND_ADJUDICATION_INPUT_MATERIALIZATION_RECORD',
    notes: [
      'I142 establishes readiness to materialize the eight I138-governed input artifact classes against the exact frozen I141 candidate set.',
      'Materialization may preserve unresolved scope, provenance, semantic-bridge, and contradiction states; it must not convert them into favorable adjudications.',
      'I142 does not itself rebind evidence, register the input package, adjudicate any I118 requirement, authorize candidate-set evaluation, compose sources, or establish threshold authority.',
    ],
  });
}
