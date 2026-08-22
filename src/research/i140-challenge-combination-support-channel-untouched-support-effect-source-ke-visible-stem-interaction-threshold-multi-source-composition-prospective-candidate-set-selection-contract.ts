import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetInputPackageMaterializationReadinessReviewReport } from './i139-challenge-combination-support-channel-untouched-support-effect-source-ke-visible-stem-interaction-threshold-multi-source-composition-candidate-set-input-package-materialization-readiness-review.js';

export const I140_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROSPECTIVE_CANDIDATE_SET_SELECTION_CONTRACT_VERSION =
  'myeonghwa-challenge-combination-support-channel-untouched-support-effect-source-ke-visible-stem-interaction-threshold-multi-source-composition-prospective-candidate-set-selection-contract-v1';

export const I140_CANDIDATE_UNIVERSE_SOURCE_GATES = ['I120', 'I122', 'I125', 'I128'] as const;

export const I140_PROSPECTIVE_SELECTION_CONTROL_IDS = [
  'CANDIDATE_UNIVERSE_DEFINITION_AND_CUTOFF',
  'PROSPECTIVE_INCLUSION_CRITERIA',
  'PROSPECTIVE_EXCLUSION_CRITERIA',
  'SOURCE_IDENTITY_DEDUPLICATION_AND_EDITION_RULES',
  'WITNESS_ELIGIBILITY_AND_STABILITY_RULES',
  'SELECTION_FREEZE_BEFORE_EVIDENCE_ADJUDICATION',
] as const;

export type I140ProspectiveSelectionControlId = (typeof I140_PROSPECTIVE_SELECTION_CONTROL_IDS)[number];

export interface I140ProspectiveSelectionControl {
  controlId: I140ProspectiveSelectionControlId;
  mandatory: true;
  rule: string;
}

export interface ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProspectiveCandidateSetSelectionContractReport {
  contractId: string;
  contractVersion: string;
  status:
    | 'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROSPECTIVE_CANDIDATE_SET_SELECTION_CONTRACT'
    | 'I139_MATERIALIZATION_READINESS_UNRESOLVED_OR_INVALID';
  decision:
    | 'PROSPECTIVE_CANDIDATE_SET_SELECTION_CONTRACT_FROZEN_BEFORE_MATERIALIZATION_NO_CANDIDATE_SET_SELECTED_NO_EVALUATION'
    | 'PROSPECTIVE_CANDIDATE_SET_SELECTION_CONTRACT_NOT_ESTABLISHED';
  upstreamI139ReviewId: string;
  policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy';
  policyVersion: 'v1-definition';
  adoptionVersion: 'v1-adoption';
  adoptionId: string | null;
  exactI139ReadinessAccepted: boolean;
  selectionContractVersion: 'v1-selection';
  selectionTarget: 'ADOPTED_POLICY_BOUND_VISIBLE_STEM_KE_CANDIDATE_SET';
  selectionControls: readonly I140ProspectiveSelectionControl[];
  selectionControlCount: 6;
  allSelectionControlsMandatory: true;
  candidateUniverseSourceGates: readonly ['I120', 'I122', 'I125', 'I128'];
  candidateUniverseCutoffRule: 'ALL_REPOSITORY_DOCUMENTED_CANDIDATE_SOURCE_IDENTITIES_AND_WITNESSES_IN_I120_I122_I125_I128_BEFORE_I140_SELECTION_FREEZE';
  laterCandidateAdditionRequiresNewSelectionContractVersion: true;
  inclusionRequiresTargetScopeRelevance: true;
  inclusionRequiresExactNormalizedSourceIdentity: true;
  inclusionRequiresStableReproducibleWitness: true;
  inclusionRequiresAtLeastOneReboundI118RelevantEvidenceItem: true;
  inclusionIndependentOfSupportiveContradictoryOrUnresolvedOutcome: true;
  exclusionAllowedForOutOfScopeOnly: true;
  exclusionAllowedForNoStableReproducibleWitness: true;
  exclusionAllowedForNoI118RelevantEvidence: true;
  exclusionBasedOnCoverageSuccessForbidden: true;
  exclusionBasedOnContradictionPresenceForbidden: true;
  exclusionBasedOnPreferredSemanticConclusionForbidden: true;
  sameNormalizedWorkAcrossMirrorWitnessesDeduplicatesToOneCandidate: true;
  alternateWitnessesMayRemainAttachedToSameCandidate: true;
  substantiveEditionSplitRequiresExplicitIdentityAndContentDivergenceBasis: true;
  derivativeReprintOrTranscriptDoesNotCreateIndependentProvenanceByItself: true;
  witnessMustHaveStableLocator: true;
  witnessMustPermitReproducibleTextInspection: true;
  searchSnippetAloneIsNotEligibleWitness: true;
  inaccessibleWitnessRequiresAlternateStableWitnessOrExclusion: true;
  selectionMustFreezeBeforeRequirementCoverageAdjudication: true;
  selectionMustFreezeBeforeScopeProvenanceBridgeContradictionAdjudication: true;
  postFreezeOutcomeDrivenAdditionForbidden: true;
  postFreezeOutcomeDrivenRemovalForbidden: true;
  candidateSelectionContractFrozenByThisGate: boolean;
  candidateUniverseMaterializedByThisGate: false;
  candidateSetSelectedByThisGate: false;
  candidateSetFrozenByThisGate: false;
  inputPackageRegisteredByThisGate: false;
  evidenceRebindingPerformedByThisGate: false;
  candidateSetEvaluationAuthorizedByThisGate: false;
  candidateSetEvaluationPerformedByThisGate: false;
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
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_CANDIDATE_SET_SELECTION_MATERIALIZATION_AND_FREEZE_RECORD'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_CANDIDATE_SET_INPUT_PACKAGE_MATERIALIZATION_READINESS_REVIEW';
  notes: readonly string[];
}

const SELECTION_CONTROLS: readonly I140ProspectiveSelectionControl[] = [
  {
    controlId: 'CANDIDATE_UNIVERSE_DEFINITION_AND_CUTOFF',
    mandatory: true,
    rule: 'Universe is every repository-documented candidate source identity and witness recorded in I120, I122, I125, or I128 before the I140 selection freeze. Later additions require a new prospective selection-contract version before evaluation.',
  },
  {
    controlId: 'PROSPECTIVE_INCLUSION_CRITERIA',
    mandatory: true,
    rule: 'Include a deduplicated candidate only when it is relevant to visible-heavenly-stem 克 eligibility, has an exact normalized source identity, has at least one stable reproducible witness, and exposes at least one evidence item eligible for explicit rebinding to an I118 requirement. Supportive, contradictory, and unresolved outcomes are treated identically for selection.',
  },
  {
    controlId: 'PROSPECTIVE_EXCLUSION_CRITERIA',
    mandatory: true,
    rule: 'Exclude only for objective scope or evidence-integrity reasons: no visible-stem 克 target relevance, no stable reproducible witness, or no I118-relevant evidence item. Coverage success, contradiction presence, or preferred semantic conclusion may never drive exclusion.',
  },
  {
    controlId: 'SOURCE_IDENTITY_DEDUPLICATION_AND_EDITION_RULES',
    mandatory: true,
    rule: 'Mirror witnesses of one normalized work identity form one candidate with multiple witness bindings. A substantive edition may split only with explicit identity resolution and material content-divergence basis. Reprints or derivative transcripts do not become independent provenance merely by being separate URLs or publications.',
  },
  {
    controlId: 'WITNESS_ELIGIBILITY_AND_STABILITY_RULES',
    mandatory: true,
    rule: 'Every selected candidate must retain at least one witness with a stable locator and reproducible text inspection. Search snippets alone are ineligible. An inaccessible witness requires an alternate stable witness or objective exclusion.',
  },
  {
    controlId: 'SELECTION_FREEZE_BEFORE_EVIDENCE_ADJUDICATION',
    mandatory: true,
    rule: 'The selected candidate set must be frozen before requirement coverage, scope, provenance independence, semantic bridge, contradiction, or admissibility adjudication. Outcome-driven addition or removal after freeze is forbidden.',
  },
] as const;

function exactI139Accepted(
  i139: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetInputPackageMaterializationReadinessReviewReport,
): boolean {
  return (
    i139.status ===
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_CANDIDATE_SET_INPUT_PACKAGE_MATERIALIZATION_READINESS_REVIEW' &&
    i139.decision ===
      'CANDIDATE_SET_INPUT_PACKAGE_MATERIALIZATION_NOT_READY_PROSPECTIVE_SELECTION_BOUNDARY_REQUIRED_TO_PREVENT_OUTCOME_DRIVEN_CHERRY_PICKING' &&
    i139.policyId === 'myeonghwa-visible-stem-ke-multi-source-composition-policy' &&
    i139.policyVersion === 'v1-definition' &&
    i139.adoptionVersion === 'v1-adoption' &&
    i139.adoptionId !== null &&
    i139.exactI138ContractAccepted &&
    i139.inputRegistrationContractFrozen &&
    i139.allEightInputArtifactClassesDefined &&
    i139.prospectiveCandidateSelectionBoundaryPresent === false &&
    i139.missingSelectionControlCount === 6 &&
    i139.allSelectionControlsMandatory &&
    i139.materializationReadinessEstablished === false &&
    i139.inputPackageMaterializationMayProceed === false &&
    i139.prospectiveCandidateSelectionContractRequiredFirst &&
    i139.inputPackageRegisteredByThisGate === false &&
    i139.candidateSetManifestMaterializedByThisGate === false &&
    i139.evidenceRebindingPerformedByThisGate === false &&
    i139.candidateSetEvaluationAuthorizedByThisGate === false &&
    i139.candidateSetEvaluationPerformedByThisGate === false &&
    i139.actualCompositionPerformedByThisGate === false &&
    i139.multiSourceCompositionAuthorized === false &&
    i139.authorityAcquiredByThisGate === false &&
    i139.visibleStemBinaryEffectiveInteractionEligibilityResolved === false &&
    i139.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROSPECTIVE_CANDIDATE_SET_SELECTION_CONTRACT'
  );
}

function finalized(
  material: Omit<ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProspectiveCandidateSetSelectionContractReport, 'contractId'>,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProspectiveCandidateSetSelectionContractReport {
  return {
    contractId: `challenge_combination_support_channel_untouched_support_ke_visible_stem_threshold_candidate_selection_contract_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI140ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProspectiveCandidateSetSelectionContract(
  i139: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetInputPackageMaterializationReadinessReviewReport,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProspectiveCandidateSetSelectionContractReport {
  const accepted = exactI139Accepted(i139);
  const common = {
    contractVersion:
      I140_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROSPECTIVE_CANDIDATE_SET_SELECTION_CONTRACT_VERSION,
    upstreamI139ReviewId: i139.reviewId,
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy' as const,
    policyVersion: 'v1-definition' as const,
    adoptionVersion: 'v1-adoption' as const,
    selectionContractVersion: 'v1-selection' as const,
    selectionTarget: 'ADOPTED_POLICY_BOUND_VISIBLE_STEM_KE_CANDIDATE_SET' as const,
    selectionControls: SELECTION_CONTROLS,
    selectionControlCount: 6 as const,
    allSelectionControlsMandatory: true as const,
    candidateUniverseSourceGates: I140_CANDIDATE_UNIVERSE_SOURCE_GATES,
    candidateUniverseCutoffRule:
      'ALL_REPOSITORY_DOCUMENTED_CANDIDATE_SOURCE_IDENTITIES_AND_WITNESSES_IN_I120_I122_I125_I128_BEFORE_I140_SELECTION_FREEZE' as const,
    laterCandidateAdditionRequiresNewSelectionContractVersion: true as const,
    inclusionRequiresTargetScopeRelevance: true as const,
    inclusionRequiresExactNormalizedSourceIdentity: true as const,
    inclusionRequiresStableReproducibleWitness: true as const,
    inclusionRequiresAtLeastOneReboundI118RelevantEvidenceItem: true as const,
    inclusionIndependentOfSupportiveContradictoryOrUnresolvedOutcome: true as const,
    exclusionAllowedForOutOfScopeOnly: true as const,
    exclusionAllowedForNoStableReproducibleWitness: true as const,
    exclusionAllowedForNoI118RelevantEvidence: true as const,
    exclusionBasedOnCoverageSuccessForbidden: true as const,
    exclusionBasedOnContradictionPresenceForbidden: true as const,
    exclusionBasedOnPreferredSemanticConclusionForbidden: true as const,
    sameNormalizedWorkAcrossMirrorWitnessesDeduplicatesToOneCandidate: true as const,
    alternateWitnessesMayRemainAttachedToSameCandidate: true as const,
    substantiveEditionSplitRequiresExplicitIdentityAndContentDivergenceBasis: true as const,
    derivativeReprintOrTranscriptDoesNotCreateIndependentProvenanceByItself: true as const,
    witnessMustHaveStableLocator: true as const,
    witnessMustPermitReproducibleTextInspection: true as const,
    searchSnippetAloneIsNotEligibleWitness: true as const,
    inaccessibleWitnessRequiresAlternateStableWitnessOrExclusion: true as const,
    selectionMustFreezeBeforeRequirementCoverageAdjudication: true as const,
    selectionMustFreezeBeforeScopeProvenanceBridgeContradictionAdjudication: true as const,
    postFreezeOutcomeDrivenAdditionForbidden: true as const,
    postFreezeOutcomeDrivenRemovalForbidden: true as const,
    candidateUniverseMaterializedByThisGate: false as const,
    candidateSetSelectedByThisGate: false as const,
    candidateSetFrozenByThisGate: false as const,
    inputPackageRegisteredByThisGate: false as const,
    evidenceRebindingPerformedByThisGate: false as const,
    candidateSetEvaluationAuthorizedByThisGate: false as const,
    candidateSetEvaluationPerformedByThisGate: false as const,
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
      status: 'I139_MATERIALIZATION_READINESS_UNRESOLVED_OR_INVALID',
      decision: 'PROSPECTIVE_CANDIDATE_SET_SELECTION_CONTRACT_NOT_ESTABLISHED',
      adoptionId: null,
      exactI139ReadinessAccepted: false,
      candidateSelectionContractFrozenByThisGate: false,
      recommendedNextGate:
        'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_CANDIDATE_SET_INPUT_PACKAGE_MATERIALIZATION_READINESS_REVIEW',
      notes: ['I140 fails closed unless the exact I139 not-ready materialization review remains intact.'],
    });
  }

  return finalized({
    ...common,
    status:
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROSPECTIVE_CANDIDATE_SET_SELECTION_CONTRACT',
    decision:
      'PROSPECTIVE_CANDIDATE_SET_SELECTION_CONTRACT_FROZEN_BEFORE_MATERIALIZATION_NO_CANDIDATE_SET_SELECTED_NO_EVALUATION',
    adoptionId: i139.adoptionId,
    exactI139ReadinessAccepted: true,
    candidateSelectionContractFrozenByThisGate: true,
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_CANDIDATE_SET_SELECTION_MATERIALIZATION_AND_FREEZE_RECORD',
    notes: [
      'I140 freezes candidate selection rules before any adopted-policy candidate-set materialization or adjudication.',
      'Selection is conclusion-neutral: supportive, contradictory, and unresolved evidence outcomes cannot determine candidate inclusion or exclusion.',
      'The candidate universe is bounded to repository-documented candidate identities and witnesses from I120/I122/I125/I128 before this freeze; later additions require a new prospective selection-contract version.',
    ],
  });
}
