import { describe, expect, test } from 'vitest';
import {
  buildI141ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetSelectionMaterializationFreezeRecord,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProspectiveCandidateSetSelectionContractReport,
} from '../src/index.js';

function i140(
  overrides: Record<string, unknown> = {},
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProspectiveCandidateSetSelectionContractReport {
  const base = {
    contractId: 'i140_i141_fixture',
    status: 'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROSPECTIVE_CANDIDATE_SET_SELECTION_CONTRACT',
    decision: 'PROSPECTIVE_CANDIDATE_SET_SELECTION_CONTRACT_FROZEN_BEFORE_MATERIALIZATION_NO_CANDIDATE_SET_SELECTED_NO_EVALUATION',
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    adoptionId: 'visible_stem_ke_composition_policy_adoption_fixture',
    exactI139ReadinessAccepted: true,
    selectionContractVersion: 'v1-selection',
    selectionControlCount: 6,
    allSelectionControlsMandatory: true,
    candidateUniverseSourceGates: ['I120', 'I122', 'I125', 'I128'],
    laterCandidateAdditionRequiresNewSelectionContractVersion: true,
    inclusionIndependentOfSupportiveContradictoryOrUnresolvedOutcome: true,
    exclusionBasedOnCoverageSuccessForbidden: true,
    exclusionBasedOnContradictionPresenceForbidden: true,
    exclusionBasedOnPreferredSemanticConclusionForbidden: true,
    sameNormalizedWorkAcrossMirrorWitnessesDeduplicatesToOneCandidate: true,
    selectionMustFreezeBeforeRequirementCoverageAdjudication: true,
    selectionMustFreezeBeforeScopeProvenanceBridgeContradictionAdjudication: true,
    postFreezeOutcomeDrivenAdditionForbidden: true,
    postFreezeOutcomeDrivenRemovalForbidden: true,
    candidateSelectionContractFrozenByThisGate: true,
    candidateUniverseMaterializedByThisGate: false,
    candidateSetSelectedByThisGate: false,
    candidateSetFrozenByThisGate: false,
    candidateSetEvaluationAuthorizedByThisGate: false,
    candidateSetEvaluationPerformedByThisGate: false,
    actualCompositionPerformedByThisGate: false,
    multiSourceCompositionAuthorized: false,
    authorityAcquiredByThisGate: false,
    visibleStemBinaryEffectiveInteractionEligibilityResolved: false,
    recommendedNextGate: 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_CANDIDATE_SET_SELECTION_MATERIALIZATION_AND_FREEZE_RECORD',
  };
  return { ...base, ...overrides } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProspectiveCandidateSetSelectionContractReport;
}

describe('I141 candidate-set selection materialization and freeze record', () => {
  test('accepts exact I140 and materializes a deterministic frozen candidate set', () => {
    const report = buildI141ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetSelectionMaterializationFreezeRecord(i140());
    expect(report.status).toBe('RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_CANDIDATE_SET_SELECTION_MATERIALIZATION_FREEZE_RECORD');
    expect(report.decision).toBe('PROSPECTIVELY_SELECTED_CANDIDATE_SET_MATERIALIZED_AND_FROZEN_SIX_SELECTED_ONE_OBJECTIVE_SCOPE_EXCLUSION_NO_EVALUATION');
    expect(report.exactI140SelectionContractAccepted).toBe(true);
    expect(report.candidateSetId).not.toBeNull();
    expect(report.candidateUniverseMaterializedByThisGate).toBe(true);
    expect(report.candidateSetSelectedByThisGate).toBe(true);
    expect(report.candidateSetFrozenByThisGate).toBe(true);
  });

  test('materializes eleven source-gate observations into seven normalized works with six selected', () => {
    const report = buildI141ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetSelectionMaterializationFreezeRecord(i140());
    expect(report.rawSourceGateCandidateObservationCount).toBe(11);
    expect(report.normalizedCandidateCount).toBe(7);
    expect(report.deduplicatedObservationCount).toBe(4);
    expect(report.selectedCandidateCount).toBe(6);
    expect(report.excludedCandidateCount).toBe(1);
    expect(report.normalizedCandidates).toHaveLength(7);
    expect(report.selectedCandidates).toHaveLength(6);
    expect(report.excludedCandidates).toHaveLength(1);
  });

  test('selects the six exact target-scope candidates and excludes only Ditiansui for objective scope mismatch', () => {
    const report = buildI141ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetSelectionMaterializationFreezeRecord(i140());
    expect(report.selectedCandidates.map((item) => item.candidateId)).toEqual([
      'candidate_chen_yuan_sizhu_yuce_rumen',
      'candidate_wei_qianli_qianli_minggao',
      'candidate_zhu_zuxia_bazi_yu_yongshen',
      'candidate_yimeng_tiangan_ke_theory',
      'candidate_wu_huaiyun_yinyang_wuxing_bazi_yucexue_chuji',
      'candidate_mingdeng_tiangan_youli_wuli_criteria',
    ]);
    expect(report.excludedCandidates[0]?.candidateId).toBe('candidate_ditiansui_chanwei_wuli_ke_case');
    expect(report.excludedCandidates[0]?.selectionDisposition).toBe('EXCLUDED_OBJECTIVE_SCOPE_MISMATCH');
    expect(report.excludedCandidates[0]?.objectiveExclusionReason).toBe('OUT_OF_SCOPE_NOT_VISIBLE_HEAVENLY_STEM_KE_TARGET');
    expect(report.excludedDitiansuiOnlyForVisibleStemScopeMismatch).toBe(true);
  });

  test('deduplicates repeated works while preserving witness bindings', () => {
    const report = buildI141ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetSelectionMaterializationFreezeRecord(i140());
    const wei = report.selectedCandidates.find((item) => item.candidateId === 'candidate_wei_qianli_qianli_minggao');
    expect(wei?.witnessCount).toBe(3);
    expect(wei?.witnessBindings).toHaveLength(3);
    expect(wei?.sourceGateOrigins).toEqual(['I120', 'I122', 'I128']);
    expect(report.weiQianliMirrorWitnessesDeduplicatedToOneCandidate).toBe(true);
    expect(report.wuHuaiyunRepeatedGateObservationsDeduplicatedToOneCandidate).toBe(true);
    expect(report.chenYuanRepeatedGateObservationsDeduplicatedToOneCandidate).toBe(true);
    expect(report.witnessIdentityBindingsMaterializedByThisGate).toBe(true);
  });

  test('keeps selection conclusion-neutral and freezes before adjudication', () => {
    const report = buildI141ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetSelectionMaterializationFreezeRecord(i140());
    expect(report.coverageSuccessUsedForSelection).toBe(false);
    expect(report.contradictionPresenceUsedForSelection).toBe(false);
    expect(report.preferredSemanticConclusionUsedForSelection).toBe(false);
    expect(report.outcomeDrivenCandidateAdditionPerformed).toBe(false);
    expect(report.outcomeDrivenCandidateRemovalPerformed).toBe(false);
    expect(report.candidateSetFrozenBeforeRequirementCoverageAdjudication).toBe(true);
    expect(report.candidateSetFrozenBeforeScopeProvenanceBridgeContradictionAdjudication).toBe(true);
    expect(report.normalizedCandidates.every((item) => item.selectionOutcomeIndependentOfCoverageSuccess)).toBe(true);
    expect(report.normalizedCandidates.every((item) => item.selectionOutcomeIndependentOfContradictionPresence)).toBe(true);
    expect(report.normalizedCandidates.every((item) => item.selectionOutcomeIndependentOfPreferredSemanticConclusion)).toBe(true);
  });

  test('materializes only selection records and performs no rebinding, adjudication, evaluation, or composition', () => {
    const report = buildI141ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetSelectionMaterializationFreezeRecord(i140());
    expect(report.candidateManifestMaterializedByThisGate).toBe(true);
    expect(report.inputPackageRegisteredByThisGate).toBe(false);
    expect(report.evidenceRebindingPerformedByThisGate).toBe(false);
    expect(report.requirementOwnershipAdjudicatedByThisGate).toBe(false);
    expect(report.scopeCompatibilityAdjudicatedByThisGate).toBe(false);
    expect(report.provenanceIndependenceAdjudicatedByThisGate).toBe(false);
    expect(report.semanticBridgeAdjudicatedByThisGate).toBe(false);
    expect(report.contradictionAdjudicatedByThisGate).toBe(false);
    expect(report.candidateSetEvaluationAuthorizedByThisGate).toBe(false);
    expect(report.candidateSetEvaluationPerformedByThisGate).toBe(false);
    expect(report.candidateSetAdmissibilityEstablishedByThisGate).toBe(false);
    expect(report.actualCompositionPerformedByThisGate).toBe(false);
    expect(report.multiSourceCompositionAuthorized).toBe(false);
  });

  test('keeps threshold, production, and hidden-stem authority closed and routes to rebinding readiness', () => {
    const report = buildI141ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetSelectionMaterializationFreezeRecord(i140());
    expect(report.authorityAcquiredByThisGate).toBe(false);
    expect(report.visibleStemBinaryEffectiveInteractionEligibilityResolved).toBe(false);
    expect(report.thresholdRuleCreatedByThisGate).toBe(false);
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
    expect(report.hiddenStemInteractionEligibilityGapRemains).toBe(true);
    expect(report.recommendedNextGate).toBe('UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_CANDIDATE_SET_EVIDENCE_REBINDING_AND_ADJUDICATION_INPUT_MATERIALIZATION_READINESS_REVIEW');
  });

  test('fails closed when the exact I140 selection contract is mutated', () => {
    const report = buildI141ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetSelectionMaterializationFreezeRecord(
      i140({ candidateSetSelectedByThisGate: true }),
    );
    expect(report.status).toBe('I140_SELECTION_CONTRACT_UNRESOLVED_OR_INVALID');
    expect(report.decision).toBe('CANDIDATE_SET_SELECTION_MATERIALIZATION_NOT_PERFORMED');
    expect(report.adoptionId).toBeNull();
    expect(report.candidateSetId).toBeNull();
    expect(report.exactI140SelectionContractAccepted).toBe(false);
    expect(report.candidateUniverseMaterializedByThisGate).toBe(false);
    expect(report.candidateSetSelectedByThisGate).toBe(false);
    expect(report.candidateSetFrozenByThisGate).toBe(false);
  });
});
