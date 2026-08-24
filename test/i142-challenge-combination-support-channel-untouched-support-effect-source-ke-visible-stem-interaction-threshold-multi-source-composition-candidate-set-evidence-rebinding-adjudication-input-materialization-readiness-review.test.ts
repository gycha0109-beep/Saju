import { describe, expect, test } from 'vitest';
import {
  I142_REQUIRED_INPUT_ARTIFACT_CLASSES,
  buildI142ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetEvidenceRebindingAdjudicationInputMaterializationReadinessReview,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetSelectionMaterializationFreezeRecordReport,
} from '../src/index.js';

function i141(
  overrides: Record<string, unknown> = {},
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetSelectionMaterializationFreezeRecordReport {
  const base = {
    recordId: 'i141_i142_fixture',
    status: 'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_CANDIDATE_SET_SELECTION_MATERIALIZATION_FREEZE_RECORD',
    decision: 'PROSPECTIVELY_SELECTED_CANDIDATE_SET_MATERIALIZED_AND_FROZEN_SIX_SELECTED_ONE_OBJECTIVE_SCOPE_EXCLUSION_NO_EVALUATION',
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    adoptionId: 'visible_stem_ke_composition_policy_adoption_fixture',
    selectionContractVersion: 'v1-selection',
    candidateSetVersion: 'v1-candidate-set',
    candidateSetId: 'visible_stem_ke_composition_candidate_set_fixture',
    exactI140SelectionContractAccepted: true,
    rawSourceGateCandidateObservationCount: 11,
    normalizedCandidateCount: 7,
    selectedCandidateCount: 6,
    excludedCandidateCount: 1,
    candidateUniverseMaterializedByThisGate: true,
    candidateSetSelectedByThisGate: true,
    candidateSetFrozenByThisGate: true,
    candidateManifestMaterializedByThisGate: true,
    witnessIdentityBindingsMaterializedByThisGate: true,
    candidateSetFrozenBeforeRequirementCoverageAdjudication: true,
    candidateSetFrozenBeforeScopeProvenanceBridgeContradictionAdjudication: true,
    outcomeDrivenCandidateAdditionPerformed: false,
    outcomeDrivenCandidateRemovalPerformed: false,
    inputPackageRegisteredByThisGate: false,
    evidenceRebindingPerformedByThisGate: false,
    requirementOwnershipAdjudicatedByThisGate: false,
    scopeCompatibilityAdjudicatedByThisGate: false,
    provenanceIndependenceAdjudicatedByThisGate: false,
    semanticBridgeAdjudicatedByThisGate: false,
    contradictionAdjudicatedByThisGate: false,
    candidateSetEvaluationAuthorizedByThisGate: false,
    candidateSetEvaluationPerformedByThisGate: false,
    candidateSetAdmissibilityEstablishedByThisGate: false,
    actualCompositionPerformedByThisGate: false,
    multiSourceCompositionAuthorized: false,
    authorityAcquiredByThisGate: false,
    visibleStemBinaryEffectiveInteractionEligibilityResolved: false,
    recommendedNextGate: 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_CANDIDATE_SET_EVIDENCE_REBINDING_AND_ADJUDICATION_INPUT_MATERIALIZATION_READINESS_REVIEW',
  };
  return { ...base, ...overrides } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetSelectionMaterializationFreezeRecordReport;
}

describe('I142 evidence rebinding and adjudication input materialization readiness', () => {
  test('accepts exact I141 and establishes input-record materialization readiness only', () => {
    const report = buildI142ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetEvidenceRebindingAdjudicationInputMaterializationReadinessReview(i141());
    expect(report.status).toBe('RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_CANDIDATE_SET_EVIDENCE_REBINDING_ADJUDICATION_INPUT_MATERIALIZATION_READINESS_REVIEW');
    expect(report.decision).toBe('FROZEN_CANDIDATE_SET_READY_FOR_I138_GOVERNED_EVIDENCE_REBINDING_AND_ADJUDICATION_INPUT_MATERIALIZATION_NO_EVALUATION_AUTHORIZATION');
    expect(report.exactI141FreezeRecordAccepted).toBe(true);
    expect(report.materializationReadinessEstablished).toBe(true);
    expect(report.evidenceRebindingAndAdjudicationInputMaterializationMayProceed).toBe(true);
    expect(report.materializationAuthorizationLimitedToInputRecordsOnly).toBe(true);
  });

  test('binds all eight I138-governed input artifact classes', () => {
    const report = buildI142ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetEvidenceRebindingAdjudicationInputMaterializationReadinessReview(i141());
    expect(report.requiredInputArtifactClasses).toEqual(I142_REQUIRED_INPUT_ARTIFACT_CLASSES);
    expect(report.requiredInputArtifactClassCount).toBe(8);
    expect(report.allEightArtifactClassesRequired).toBe(true);
    expect(report.i138InputRegistrationContractLineagePreservedThroughI139I140I141).toBe(true);
  });

  test('requires the exact frozen candidate manifest and witness identities', () => {
    const report = buildI142ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetEvidenceRebindingAdjudicationInputMaterializationReadinessReview(i141());
    expect(report.candidateSetId).toBe('visible_stem_ke_composition_candidate_set_fixture');
    expect(report.selectedCandidateCount).toBe(6);
    expect(report.frozenCandidateManifestAvailable).toBe(true);
    expect(report.frozenWitnessIdentityBindingsAvailable).toBe(true);
    expect(report.selectedCandidateSetIdentityStable).toBe(true);
    expect(report.candidateSetFrozenBeforeAdjudication).toBe(true);
    expect(report.evidenceRebindingCanBindOnlyFrozenSelectedCandidates).toBe(true);
    expect(report.evidenceRebindingMustBindExactCandidateWitnessAndLocator).toBe(true);
  });

  test('requires explicit ownership and forbids implicit requirement borrowing', () => {
    const report = buildI142ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetEvidenceRebindingAdjudicationInputMaterializationReadinessReview(i141());
    expect(report.requirementOwnershipMustBeExplicitPerI118Requirement).toBe(true);
    expect(report.implicitRequirementBorrowingForbidden).toBe(true);
  });

  test('allows unresolved adjudication inputs to be materialized without resolving them', () => {
    const report = buildI142ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetEvidenceRebindingAdjudicationInputMaterializationReadinessReview(i141());
    expect(report.scopeInputsMayRecordCompatibleIncompatibleOrUnresolvedWithoutAdjudicating).toBe(true);
    expect(report.provenanceInputsMayRecordIndependentDerivativeOrUnresolvedWithoutWeighting).toBe(true);
    expect(report.semanticBridgeInputsMayRecordPresentAbsentOrUnresolvedWithoutInferringEquivalence).toBe(true);
    expect(report.contradictionInputsMayRecordPresentAbsentOrUnresolvedWithoutResolvingPrecedence).toBe(true);
    expect(report.unresolvedInputsPermittedAtMaterialization).toBe(true);
    expect(report.unresolvedInputsMustFailClosedAtLaterEvaluation).toBe(true);
  });

  test('performs no rebinding, adjudication, evaluation, or composition in readiness review', () => {
    const report = buildI142ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetEvidenceRebindingAdjudicationInputMaterializationReadinessReview(i141());
    expect(report.inputPackageRegisteredByThisGate).toBe(false);
    expect(report.evidenceRebindingPerformedByThisGate).toBe(false);
    expect(report.requirementOwnershipBindingsMaterializedByThisGate).toBe(false);
    expect(report.scopeCompatibilityInputsMaterializedByThisGate).toBe(false);
    expect(report.provenanceIndependenceInputsMaterializedByThisGate).toBe(false);
    expect(report.semanticBridgeInputsMaterializedByThisGate).toBe(false);
    expect(report.contradictionInputsMaterializedByThisGate).toBe(false);
    expect(report.requirementCoverageAdjudicatedByThisGate).toBe(false);
    expect(report.candidateSetEvaluationAuthorizedByThisGate).toBe(false);
    expect(report.candidateSetEvaluationPerformedByThisGate).toBe(false);
    expect(report.actualCompositionPerformedByThisGate).toBe(false);
  });

  test('keeps all threshold and production authority closed and routes to I143 materialization', () => {
    const report = buildI142ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetEvidenceRebindingAdjudicationInputMaterializationReadinessReview(i141());
    expect(report.candidateSetAdmissibilityEstablishedByThisGate).toBe(false);
    expect(report.multiSourceCompositionAuthorized).toBe(false);
    expect(report.authorityAcquiredByThisGate).toBe(false);
    expect(report.visibleStemBinaryEffectiveInteractionEligibilityResolved).toBe(false);
    expect(report.thresholdRuleCreatedByThisGate).toBe(false);
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
    expect(report.hiddenStemInteractionEligibilityGapRemains).toBe(true);
    expect(report.recommendedNextGate).toBe('UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_CANDIDATE_SET_EVIDENCE_REBINDING_AND_ADJUDICATION_INPUT_MATERIALIZATION_RECORD');
  });

  test('fails closed when the exact I141 frozen candidate set is mutated', () => {
    const report = buildI142ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetEvidenceRebindingAdjudicationInputMaterializationReadinessReview(
      i141({ selectedCandidateCount: 5 }),
    );
    expect(report.status).toBe('I141_CANDIDATE_SET_FREEZE_UNRESOLVED_OR_INVALID');
    expect(report.decision).toBe('EVIDENCE_REBINDING_AND_ADJUDICATION_INPUT_MATERIALIZATION_READINESS_NOT_ESTABLISHED');
    expect(report.adoptionId).toBeNull();
    expect(report.candidateSetId).toBeNull();
    expect(report.exactI141FreezeRecordAccepted).toBe(false);
    expect(report.materializationReadinessEstablished).toBe(false);
    expect(report.evidenceRebindingAndAdjudicationInputMaterializationMayProceed).toBe(false);
  });
});
