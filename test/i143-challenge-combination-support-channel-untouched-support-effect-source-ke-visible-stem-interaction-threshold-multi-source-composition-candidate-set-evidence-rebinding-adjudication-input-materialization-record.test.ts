import { describe, expect, test } from 'vitest';
import {
  I143_I118_REQUIREMENT_IDS,
  buildI143ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetEvidenceRebindingAdjudicationInputMaterializationRecord,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetEvidenceRebindingAdjudicationInputMaterializationReadinessReviewReport,
} from '../src/index.js';

function i142(
  overrides: Record<string, unknown> = {},
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetEvidenceRebindingAdjudicationInputMaterializationReadinessReviewReport {
  const base = {
    reviewId: 'i142_i143_fixture',
    status: 'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_CANDIDATE_SET_EVIDENCE_REBINDING_ADJUDICATION_INPUT_MATERIALIZATION_READINESS_REVIEW',
    decision: 'FROZEN_CANDIDATE_SET_READY_FOR_I138_GOVERNED_EVIDENCE_REBINDING_AND_ADJUDICATION_INPUT_MATERIALIZATION_NO_EVALUATION_AUTHORIZATION',
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    adoptionId: 'visible_stem_ke_composition_policy_adoption_fixture',
    selectionContractVersion: 'v1-selection',
    candidateSetVersion: 'v1-candidate-set',
    candidateSetId: 'visible_stem_ke_composition_candidate_set_fixture',
    exactI141FreezeRecordAccepted: true,
    i138InputRegistrationContractLineagePreservedThroughI139I140I141: true,
    requiredInputArtifactClassCount: 8,
    allEightArtifactClassesRequired: true,
    frozenCandidateManifestAvailable: true,
    frozenWitnessIdentityBindingsAvailable: true,
    selectedCandidateCount: 6,
    selectedCandidateSetIdentityStable: true,
    candidateSetFrozenBeforeAdjudication: true,
    evidenceRebindingCanBindOnlyFrozenSelectedCandidates: true,
    evidenceRebindingMustBindExactCandidateWitnessAndLocator: true,
    requirementOwnershipMustBeExplicitPerI118Requirement: true,
    implicitRequirementBorrowingForbidden: true,
    unresolvedInputsPermittedAtMaterialization: true,
    unresolvedInputsMustFailClosedAtLaterEvaluation: true,
    materializationReadinessEstablished: true,
    evidenceRebindingAndAdjudicationInputMaterializationMayProceed: true,
    materializationAuthorizationLimitedToInputRecordsOnly: true,
    inputPackageRegisteredByThisGate: false,
    evidenceRebindingPerformedByThisGate: false,
    requirementCoverageAdjudicatedByThisGate: false,
    candidateSetEvaluationAuthorizedByThisGate: false,
    candidateSetEvaluationPerformedByThisGate: false,
    actualCompositionPerformedByThisGate: false,
    authorityAcquiredByThisGate: false,
    visibleStemBinaryEffectiveInteractionEligibilityResolved: false,
    recommendedNextGate: 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_CANDIDATE_SET_EVIDENCE_REBINDING_AND_ADJUDICATION_INPUT_MATERIALIZATION_RECORD',
  };
  return { ...base, ...overrides } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetEvidenceRebindingAdjudicationInputMaterializationReadinessReviewReport;
}

describe('I143 evidence rebinding and adjudication input materialization record', () => {
  test('accepts exact I142 and registers the materialized input package without evaluation', () => {
    const report = buildI143ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetEvidenceRebindingAdjudicationInputMaterializationRecord(i142());
    expect(report.status).toBe('RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_CANDIDATE_SET_EVIDENCE_REBINDING_ADJUDICATION_INPUT_MATERIALIZATION_RECORD');
    expect(report.decision).toBe('EIGHT_INPUT_ARTIFACT_CLASSES_MATERIALIZED_AND_PACKAGE_REGISTERED_WITH_UNRESOLVED_ADJUDICATION_STATES_NO_EVALUATION');
    expect(report.exactI142ReadinessAccepted).toBe(true);
    expect(report.inputPackageId).not.toBeNull();
    expect(report.inputPackageVersion).toBe('v1-input-package');
    expect(report.inputPackageState).toBe('REGISTERED_NOT_EVALUATED');
    expect(report.inputPackageRegisteredByThisGate).toBe(true);
  });

  test('binds the exact six-candidate frozen manifest and eight stable witness identities', () => {
    const report = buildI143ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetEvidenceRebindingAdjudicationInputMaterializationRecord(i142());
    expect(report.candidateManifest?.candidateSetId).toBe('visible_stem_ke_composition_candidate_set_fixture');
    expect(report.candidateManifest?.candidateCount).toBe(6);
    expect(report.candidateManifest?.frozen).toBe(true);
    expect(report.candidateManifest?.candidateIds).toEqual([
      'candidate_chen_yuan_sizhu_yuce_rumen',
      'candidate_wei_qianli_qianli_minggao',
      'candidate_zhu_zuxia_bazi_yu_yongshen',
      'candidate_yimeng_tiangan_ke_theory',
      'candidate_wu_huaiyun_yinyang_wuxing_bazi_yucexue_chuji',
      'candidate_mingdeng_tiangan_youli_wuli_criteria',
    ]);
    expect(report.witnessIdentityBindingCount).toBe(8);
    expect(report.witnessIdentityBindings).toHaveLength(8);
    expect(report.allWitnessBindingsStableAndReproducible).toBe(true);
  });

  test('explicitly rebinds six evidence records to candidate, source, witness, locator, and I118 claims', () => {
    const report = buildI143ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetEvidenceRebindingAdjudicationInputMaterializationRecord(i142());
    expect(report.evidenceRebindingRecordCount).toBe(6);
    expect(report.evidenceRebindingRecords).toHaveLength(6);
    expect(report.evidenceRebindingRecords.every((item) => item.bindingState === 'REGISTERED_INPUT_NOT_ADJUDICATED')).toBe(true);
    expect(report.evidenceRebindingRecords.every((item) => item.locator.length > 0)).toBe(true);
    expect(report.everyEvidenceRecordBindsFrozenCandidateSourceWitnessLocator).toBe(true);
    expect(report.evidenceRebindingPerformedByThisGate).toBe(true);
    expect(report.priorEvidenceEnteredOnlyThroughExplicitRebinding).toBe(true);
    expect(report.priorI126CoverageGrandfathered).toBe(false);
    expect(report.priorI128DiscoveryGrandfathered).toBe(false);
  });

  test('creates explicit non-adjudicative ownership for all six I118 requirements', () => {
    const report = buildI143ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetEvidenceRebindingAdjudicationInputMaterializationRecord(i142());
    expect(report.requirementOwnershipBindingCount).toBe(6);
    expect(report.requirementOwnershipBindings.map((item) => item.i118RequirementId)).toEqual(I143_I118_REQUIREMENT_IDS);
    expect(report.requirementOwnershipBindings.every((item) => item.owningEvidenceIds.length > 0)).toBe(true);
    expect(report.requirementOwnershipBindings.every((item) => item.satisfactionFindingMade === false)).toBe(true);
    expect(report.allSixI118RequirementsHaveExplicitOwnershipBindings).toBe(true);
    expect(report.implicitRequirementBorrowingPerformed).toBe(false);
    expect(report.exampleToGeneralRulePromotionPerformed).toBe(false);
  });

  test('materializes scope and provenance inputs entirely as unresolved without weighting', () => {
    const report = buildI143ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetEvidenceRebindingAdjudicationInputMaterializationRecord(i142());
    expect(report.scopeCompatibilityInputs).toHaveLength(6);
    expect(report.scopeCompatibilityUnresolvedCount).toBe(6);
    expect(report.scopeCompatibilityInputs.every((item) => item.compatibilityState === 'UNRESOLVED')).toBe(true);
    expect(report.provenanceIndependenceInputs).toHaveLength(6);
    expect(report.provenanceIndependenceUnresolvedCount).toBe(6);
    expect(report.provenanceIndependenceInputs.every((item) => item.independenceState === 'UNRESOLVED')).toBe(true);
    expect(report.provenanceIndependenceInputs.every((item) => item.numericWeight === null)).toBe(true);
    expect(report.numericWeightingOrMajorityVotePerformed).toBe(false);
  });

  test('preserves three semantic bridges and two contradiction sets as unresolved', () => {
    const report = buildI143ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetEvidenceRebindingAdjudicationInputMaterializationRecord(i142());
    expect(report.semanticBridgeInputs.map((item) => item.bridgeId)).toEqual([
      'bridge_wuli_to_buneng_xiangke',
      'bridge_wuli_to_no_effective_interaction',
      'bridge_reduced_ke_force_to_boolean_eligibility',
    ]);
    expect(report.semanticBridgeUnresolvedCount).toBe(3);
    expect(report.semanticBridgeInputs.every((item) => item.bridgeState === 'UNRESOLVED')).toBe(true);
    expect(report.semanticBridgeInputs.every((item) => item.lexicalSimilarityIsNotAuthority)).toBe(true);
    expect(report.contradictionInputs.map((item) => item.contradictionId)).toEqual([
      'contradiction_far_separation_cannot_ke_vs_operational_remote_ke',
      'contradiction_distance_wuli_vs_context_dependent_remote_ke',
    ]);
    expect(report.contradictionUnresolvedCount).toBe(2);
    expect(report.contradictionInputs.every((item) => item.resolutionState === 'UNRESOLVED')).toBe(true);
    expect(report.contradictionInputs.every((item) => item.precedenceBasis === null)).toBe(true);
    expect(report.unresolvedStatesPreservedWithoutInference).toBe(true);
  });

  test('materializes all eight classes but keeps adjudication, evaluation, composition, and authority closed', () => {
    const report = buildI143ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetEvidenceRebindingAdjudicationInputMaterializationRecord(i142());
    expect(report.allEightArtifactClassesMaterialized).toBe(true);
    expect(report.requirementOwnershipBindingsMaterializedByThisGate).toBe(true);
    expect(report.witnessIdentityBindingsMaterializedByThisGate).toBe(true);
    expect(report.scopeCompatibilityInputsMaterializedByThisGate).toBe(true);
    expect(report.provenanceIndependenceInputsMaterializedByThisGate).toBe(true);
    expect(report.semanticBridgeInputsMaterializedByThisGate).toBe(true);
    expect(report.contradictionInputsMaterializedByThisGate).toBe(true);
    expect(report.requirementCoverageAdjudicatedByThisGate).toBe(false);
    expect(report.scopeCompatibilityAdjudicatedByThisGate).toBe(false);
    expect(report.provenanceIndependenceAdjudicatedByThisGate).toBe(false);
    expect(report.semanticBridgeAdjudicatedByThisGate).toBe(false);
    expect(report.contradictionAdjudicatedByThisGate).toBe(false);
    expect(report.policyExecutableByThisGate).toBe(false);
    expect(report.candidateSetEvaluationAuthorizedByThisGate).toBe(false);
    expect(report.candidateSetEvaluationPerformedByThisGate).toBe(false);
    expect(report.candidateSetAdmissibilityEstablishedByThisGate).toBe(false);
    expect(report.actualCompositionPerformedByThisGate).toBe(false);
    expect(report.multiSourceCompositionAuthorized).toBe(false);
    expect(report.authorityAcquiredByThisGate).toBe(false);
    expect(report.visibleStemBinaryEffectiveInteractionEligibilityResolved).toBe(false);
    expect(report.thresholdRuleCreatedByThisGate).toBe(false);
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
    expect(report.recommendedNextGate).toBe('UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_REGISTERED_INPUT_PACKAGE_EVALUATION_AUTHORIZATION_READINESS_REVIEW');
  });

  test('fails closed when the exact I142 readiness boundary is mutated', () => {
    const report = buildI143ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetEvidenceRebindingAdjudicationInputMaterializationRecord(
      i142({ materializationReadinessEstablished: false }),
    );
    expect(report.status).toBe('I142_MATERIALIZATION_READINESS_UNRESOLVED_OR_INVALID');
    expect(report.decision).toBe('INPUT_ARTIFACT_MATERIALIZATION_NOT_PERFORMED');
    expect(report.adoptionId).toBeNull();
    expect(report.candidateSetId).toBeNull();
    expect(report.inputPackageId).toBeNull();
    expect(report.inputPackageState).toBe('NOT_REGISTERED');
    expect(report.exactI142ReadinessAccepted).toBe(false);
    expect(report.inputPackageRegisteredByThisGate).toBe(false);
    expect(report.evidenceRebindingPerformedByThisGate).toBe(false);
  });
});
