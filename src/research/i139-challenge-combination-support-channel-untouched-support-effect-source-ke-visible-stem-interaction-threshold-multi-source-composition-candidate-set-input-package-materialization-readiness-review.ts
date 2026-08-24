import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetEvidenceRebindingInputRegistrationContractReport } from './i138-challenge-combination-support-channel-untouched-support-effect-source-ke-visible-stem-interaction-threshold-multi-source-composition-candidate-set-evidence-rebinding-input-registration-contract.js';

export const I139_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_CANDIDATE_SET_INPUT_PACKAGE_MATERIALIZATION_READINESS_REVIEW_VERSION =
  'myeonghwa-challenge-combination-support-channel-untouched-support-effect-source-ke-visible-stem-interaction-threshold-multi-source-composition-candidate-set-input-package-materialization-readiness-review-v1';

export const I139_MISSING_PROSPECTIVE_CANDIDATE_SELECTION_CONTROLS = [
  'CANDIDATE_UNIVERSE_DEFINITION_AND_CUTOFF',
  'PROSPECTIVE_INCLUSION_CRITERIA',
  'PROSPECTIVE_EXCLUSION_CRITERIA',
  'SOURCE_IDENTITY_DEDUPLICATION_AND_EDITION_RULES',
  'WITNESS_ELIGIBILITY_AND_STABILITY_RULES',
  'SELECTION_FREEZE_BEFORE_EVIDENCE_ADJUDICATION',
] as const;

export type I139MissingProspectiveCandidateSelectionControl =
  (typeof I139_MISSING_PROSPECTIVE_CANDIDATE_SELECTION_CONTROLS)[number];

export interface ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetInputPackageMaterializationReadinessReviewReport {
  reviewId: string;
  reviewVersion: string;
  status:
    | 'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_CANDIDATE_SET_INPUT_PACKAGE_MATERIALIZATION_READINESS_REVIEW'
    | 'I138_CONTRACT_UNRESOLVED_OR_INVALID';
  decision:
    | 'CANDIDATE_SET_INPUT_PACKAGE_MATERIALIZATION_NOT_READY_PROSPECTIVE_SELECTION_BOUNDARY_REQUIRED_TO_PREVENT_OUTCOME_DRIVEN_CHERRY_PICKING'
    | 'CANDIDATE_SET_INPUT_PACKAGE_MATERIALIZATION_READINESS_NOT_ESTABLISHED';
  upstreamI138ContractId: string;
  policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy';
  policyVersion: 'v1-definition';
  adoptionVersion: 'v1-adoption';
  adoptionId: string | null;
  exactI138ContractAccepted: boolean;
  inputRegistrationContractFrozen: boolean;
  allEightInputArtifactClassesDefined: boolean;
  prospectiveCandidateSelectionBoundaryPresent: false;
  missingSelectionControls: readonly I139MissingProspectiveCandidateSelectionControl[];
  missingSelectionControlCount: 6;
  allSelectionControlsMandatory: true;
  candidateUniverseDefinitionPresent: false;
  prospectiveInclusionCriteriaPresent: false;
  prospectiveExclusionCriteriaPresent: false;
  sourceIdentityDeduplicationAndEditionRulesPresent: false;
  witnessEligibilityAndStabilityRulesPresent: false;
  selectionFreezeBeforeEvidenceAdjudicationPresent: false;
  outcomeDrivenCandidateSelectionForbidden: true;
  postHocCandidateAdditionBasedOnCoverageOutcomeForbidden: true;
  postHocCandidateRemovalBasedOnContradictionOutcomeForbidden: true;
  searchResultRankingAloneCannotDefineCandidateUniverse: true;
  priorGatePresenceAloneCannotForceCandidateInclusion: true;
  priorGateAbsenceAloneCannotForceCandidateExclusion: true;
  materializationReadinessEstablished: false;
  inputPackageMaterializationMayProceed: false;
  prospectiveCandidateSelectionContractRequiredFirst: true;
  inputPackageRegisteredByThisGate: false;
  candidateSetManifestMaterializedByThisGate: false;
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
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROSPECTIVE_CANDIDATE_SET_SELECTION_CONTRACT'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_CANDIDATE_SET_EVIDENCE_REBINDING_AND_INPUT_REGISTRATION_CONTRACT';
  notes: readonly string[];
}

function exactI138Accepted(
  i138: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetEvidenceRebindingInputRegistrationContractReport,
): boolean {
  return (
    i138.status ===
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_CANDIDATE_SET_EVIDENCE_REBINDING_INPUT_REGISTRATION_CONTRACT' &&
    i138.decision ===
      'CANDIDATE_SET_EVIDENCE_REBINDING_AND_INPUT_REGISTRATION_CONTRACT_FROZEN_NO_INPUT_PACKAGE_REGISTERED_NO_EVALUATION' &&
    i138.policyId === 'myeonghwa-visible-stem-ke-multi-source-composition-policy' &&
    i138.policyVersion === 'v1-definition' &&
    i138.adoptionVersion === 'v1-adoption' &&
    i138.adoptionId !== null &&
    i138.inputArtifactSchemaCount === 8 &&
    i138.allInputArtifactsMandatoryForPackageRegistration &&
    i138.candidateManifestMustBindExactAdoption &&
    i138.candidateManifestMustVersionCandidateSet &&
    i138.everyEvidenceItemMustRebindExactCandidateSourceWitnessAndLocator &&
    i138.everyI118RequirementMustHaveExplicitOwnershipBindings &&
    i138.implicitRequirementBorrowingForbidden &&
    i138.noGrandfatheringByReferenceToPriorGate &&
    i138.inputPackageRegistrationRequiresAllEightArtifactClasses &&
    i138.inputPackageRegistrationDoesNotEqualEvaluationAuthorization &&
    i138.contractFrozenByThisGate &&
    i138.inputPackageRegisteredByThisGate === false &&
    i138.candidateSetManifestMaterializedByThisGate === false &&
    i138.evidenceRebindingPerformedByThisGate === false &&
    i138.candidateSetEvaluationAuthorizedByThisGate === false &&
    i138.actualCompositionPerformedByThisGate === false &&
    i138.authorityAcquiredByThisGate === false &&
    i138.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_CANDIDATE_SET_INPUT_PACKAGE_MATERIALIZATION_READINESS_REVIEW'
  );
}

function finalized(
  material: Omit<ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetInputPackageMaterializationReadinessReviewReport, 'reviewId'>,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetInputPackageMaterializationReadinessReviewReport {
  return {
    reviewId: `challenge_combination_support_channel_untouched_support_ke_visible_stem_threshold_candidate_materialization_readiness_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI139ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetInputPackageMaterializationReadinessReview(
  i138: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetEvidenceRebindingInputRegistrationContractReport,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetInputPackageMaterializationReadinessReviewReport {
  const accepted = exactI138Accepted(i138);
  const common = {
    reviewVersion:
      I139_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_CANDIDATE_SET_INPUT_PACKAGE_MATERIALIZATION_READINESS_REVIEW_VERSION,
    upstreamI138ContractId: i138.contractId,
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy' as const,
    policyVersion: 'v1-definition' as const,
    adoptionVersion: 'v1-adoption' as const,
    prospectiveCandidateSelectionBoundaryPresent: false as const,
    missingSelectionControls: I139_MISSING_PROSPECTIVE_CANDIDATE_SELECTION_CONTROLS,
    missingSelectionControlCount: 6 as const,
    allSelectionControlsMandatory: true as const,
    candidateUniverseDefinitionPresent: false as const,
    prospectiveInclusionCriteriaPresent: false as const,
    prospectiveExclusionCriteriaPresent: false as const,
    sourceIdentityDeduplicationAndEditionRulesPresent: false as const,
    witnessEligibilityAndStabilityRulesPresent: false as const,
    selectionFreezeBeforeEvidenceAdjudicationPresent: false as const,
    outcomeDrivenCandidateSelectionForbidden: true as const,
    postHocCandidateAdditionBasedOnCoverageOutcomeForbidden: true as const,
    postHocCandidateRemovalBasedOnContradictionOutcomeForbidden: true as const,
    searchResultRankingAloneCannotDefineCandidateUniverse: true as const,
    priorGatePresenceAloneCannotForceCandidateInclusion: true as const,
    priorGateAbsenceAloneCannotForceCandidateExclusion: true as const,
    materializationReadinessEstablished: false as const,
    inputPackageMaterializationMayProceed: false as const,
    prospectiveCandidateSelectionContractRequiredFirst: true as const,
    inputPackageRegisteredByThisGate: false as const,
    candidateSetManifestMaterializedByThisGate: false as const,
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
      status: 'I138_CONTRACT_UNRESOLVED_OR_INVALID',
      decision: 'CANDIDATE_SET_INPUT_PACKAGE_MATERIALIZATION_READINESS_NOT_ESTABLISHED',
      adoptionId: null,
      exactI138ContractAccepted: false,
      inputRegistrationContractFrozen: false,
      allEightInputArtifactClassesDefined: false,
      recommendedNextGate:
        'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_CANDIDATE_SET_EVIDENCE_REBINDING_AND_INPUT_REGISTRATION_CONTRACT',
      notes: ['I139 fails closed unless the exact I138 input registration contract remains intact.'],
    });
  }

  return finalized({
    ...common,
    status:
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_CANDIDATE_SET_INPUT_PACKAGE_MATERIALIZATION_READINESS_REVIEW',
    decision:
      'CANDIDATE_SET_INPUT_PACKAGE_MATERIALIZATION_NOT_READY_PROSPECTIVE_SELECTION_BOUNDARY_REQUIRED_TO_PREVENT_OUTCOME_DRIVEN_CHERRY_PICKING',
    adoptionId: i138.adoptionId,
    exactI138ContractAccepted: true,
    inputRegistrationContractFrozen: true,
    allEightInputArtifactClassesDefined: true,
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROSPECTIVE_CANDIDATE_SET_SELECTION_CONTRACT',
    notes: [
      'The I138 input schema is sufficient, but candidate-set materialization cannot proceed until the candidate universe and inclusion/exclusion rules are frozen prospectively.',
      'Selection must be frozen before requirement coverage, bridge, contradiction, or admissibility outcomes are evaluated so candidates cannot be added or removed to improve the result.',
      'Search ranking and prior-gate presence are discovery context only and cannot substitute for a governed candidate-universe definition.',
    ],
  });
}
