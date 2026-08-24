import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionPolicyRequirementsReviewReport } from './i130-challenge-combination-support-channel-untouched-support-effect-source-ke-visible-stem-interaction-threshold-multi-source-composition-policy-requirements-review.js';

export const I131_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_POLICY_ADOPTION_READINESS_REVIEW_VERSION =
  'myeonghwa-challenge-combination-support-channel-untouched-support-effect-source-ke-visible-stem-interaction-threshold-multi-source-composition-policy-adoption-readiness-review-v1';

export type I131MissingPolicyArtifactId =
  | 'VERSIONED_POLICY_DEFINITION_OBJECT'
  | 'CANDIDATE_SET_EVIDENCE_BINDING_PROCEDURE'
  | 'SEMANTIC_BRIDGE_ADJUDICATION_PROCEDURE'
  | 'CONTRADICTION_ADJUDICATION_PROCEDURE'
  | 'SCOPE_COMPATIBILITY_DECISION_PROCEDURE'
  | 'PROVENANCE_INDEPENDENCE_DECISION_PROCEDURE'
  | 'FAIL_CLOSED_ACCEPTANCE_EVALUATION_ALGORITHM'
  | 'PROSPECTIVE_REGISTRATION_AND_CHANGE_CONTROL';

export interface ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionPolicyAdoptionReadinessReviewReport {
  reviewId: string;
  reviewVersion: string;
  status:
    | 'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_POLICY_ADOPTION_READINESS_REVIEW'
    | 'I130_UNRESOLVED_OR_INVALID';
  decision:
    | 'I130_REQUIREMENTS_NECESSARY_NOT_SUFFICIENT_COMPOSITION_POLICY_ADOPTION_NOT_READY_VERSIONED_POLICY_DEFINITION_AND_ADJUDICATION_PROCEDURES_ABSENT'
    | 'MULTI_SOURCE_COMPOSITION_POLICY_ADOPTION_READINESS_NOT_ESTABLISHED';
  upstreamI130ReviewId: string;
  i130AcceptanceRequirementsAccepted: boolean;
  i130RequirementCount: number;
  i130RequirementsRemainFrozen: boolean;
  i130RequirementsNecessaryForAdoption: boolean;
  i130RequirementsSufficientByThemselvesForAdoption: false;
  missingPolicyArtifactIds: readonly I131MissingPolicyArtifactId[];
  missingPolicyArtifactCount: number;
  versionedPolicyDefinitionObjectPresent: false;
  candidateSetEvidenceBindingProcedureDefined: false;
  semanticBridgeAdjudicationProcedureDefined: false;
  contradictionAdjudicationProcedureDefined: false;
  scopeCompatibilityDecisionProcedureDefined: false;
  provenanceIndependenceDecisionProcedureDefined: false;
  failClosedAcceptanceEvaluationAlgorithmDefined: false;
  prospectiveRegistrationAndChangeControlDefined: false;
  compositionPolicyAdoptionReady: false;
  compositionPolicyAdoptionMayProceed: false;
  compositionPolicyDefinitionContractRequired: boolean;
  compositionPolicyMayBeInferredFromI130Requirements: false;
  compositionPolicyMayBeInferredFromI128ComplementaryEvidence: false;
  currentWuHuaiyunCoverageMayBeGrandfatheredAtAdoption: false;
  priorCandidateCoverageMayBeGrandfatheredAtAdoption: false;
  semanticBridgesMayBeCreatedByModelSynthesis: false;
  contradictionsMayBeResolvedByNumericWeighting: false;
  contradictionsMayBeResolvedByMajorityVote: false;
  policyDefinitionMayEvaluateCandidatesBeforeProspectiveRegistration: false;
  singleCandidateFullSixContractRemainsNormativeDefault: boolean;
  continuedSingleCandidateDiscoveryStillPermitted: boolean;
  compositionPolicyAdoptedByThisGate: false;
  compositionPolicyExecutableByThisGate: false;
  candidateRegistrationPerformedByThisGate: false;
  candidateSetEvaluationPerformedByThisGate: false;
  actualCompositionPerformedByThisGate: false;
  crossCandidateCompositionAuthorized: false;
  multiSourceCompositionAuthorized: false;
  authorityAcquiredByThisGate: false;
  visibleStemBinaryEffectiveInteractionEligibilityResolved: false;
  effectiveInteractionSetResolved: false;
  thresholdRuleCreatedByThisGate: false;
  damageEvaluationAuthorized: false;
  i98KeDamageVocabularyEvaluationResolved: false;
  i98ResearchMethodologyMaterializationAuthorized: false;
  hiddenStemInteractionEligibilityGapRemains: true;
  hiddenStemAuthorityGap: 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED';
  methodologyDefinitionCreatedByThisGate: false;
  ruleDefinitionCreatedByThisGate: false;
  registrySnapshotMutatedByThisGate: false;
  reviewAttestationCreatedByThisGate: false;
  noTrackedRelationTouchSemanticsRemainUnchanged: true;
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  recommendedNextGate:
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_POLICY_DEFINITION_CONTRACT'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_POLICY_REQUIREMENTS_REVIEW';
  notes: readonly string[];
}

const MISSING_POLICY_ARTIFACT_IDS = Object.freeze([
  'VERSIONED_POLICY_DEFINITION_OBJECT',
  'CANDIDATE_SET_EVIDENCE_BINDING_PROCEDURE',
  'SEMANTIC_BRIDGE_ADJUDICATION_PROCEDURE',
  'CONTRADICTION_ADJUDICATION_PROCEDURE',
  'SCOPE_COMPATIBILITY_DECISION_PROCEDURE',
  'PROVENANCE_INDEPENDENCE_DECISION_PROCEDURE',
  'FAIL_CLOSED_ACCEPTANCE_EVALUATION_ALGORITHM',
  'PROSPECTIVE_REGISTRATION_AND_CHANGE_CONTROL',
] as const satisfies readonly I131MissingPolicyArtifactId[]);

function exactI130Accepted(
  i130: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionPolicyRequirementsReviewReport,
): boolean {
  return (
    i130.status ===
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_POLICY_REQUIREMENTS_REVIEW' &&
    i130.decision ===
      'MULTI_SOURCE_COMPOSITION_POLICY_ACCEPTANCE_REQUIREMENTS_FROZEN_NO_COMPOSITION_POLICY_ADOPTED_NO_THRESHOLD_AUTHORITY' &&
    i130.targetScope === 'VISIBLE_HEAVENLY_STEM_BINARY_EFFECTIVE_INTERACTION_ELIGIBILITY' &&
    i130.requirementCount === 9 &&
    i130.requirements.length === 9 &&
    i130.requirementsFrozen &&
    i130.allRequirementsMandatory &&
    i130.compositionPolicyRequirementsVersioned &&
    i130.requirements.every(
      (requirement) =>
        requirement.mandatory &&
        requirement.candidateSetMustSatisfyBeforePolicyUse &&
        requirement.absenceMayNotBeInferredAsSatisfaction &&
        requirement.searchSnippetMayNotSubstitute &&
        requirement.modelSynthesisMayNotSubstitute &&
        requirement.numericCalibrationMayNotSubstitute,
    ) &&
    i130.compositionPolicyAdoptedByThisGate === false &&
    i130.compositionPolicyResolvedByThisGate === false &&
    i130.compositionPolicyExecutableByThisGate === false &&
    i130.crossCandidateCompositionAuthorized === false &&
    i130.multiSourceCompositionAuthorized === false &&
    i130.currentWuHuaiyunFourSupportedRequirementsGrandfathered === false &&
    i130.priorCandidateCoverageGrandfathered === false &&
    i130.futureCandidateSetMustRebindAllEvidenceUnderAdoptedPolicy &&
    i130.compositionCandidateSetMustCoverAllSixI118Requirements &&
    i130.allSemanticBridgesMustBeResolvedBeforeAcceptance &&
    i130.allMaterialContradictionsMustBeResolvedBeforeAcceptance &&
    i130.policyMustBeProspectivelyRegisteredBeforeCandidateSetEvaluation &&
    i130.policyMustCarryExplicitVersion &&
    i130.policyChangesRequireNewVersion &&
    i130.policyMayRetroactivelyChangeI126Coverage === false &&
    i130.policyMayRetroactivelyConvertI128ComplementarityToAuthority === false &&
    i130.candidateSetEvaluationPerformedByThisGate === false &&
    i130.actualCompositionPerformedByThisGate === false &&
    i130.authorityAcquiredByThisGate === false &&
    i130.visibleStemBinaryEffectiveInteractionEligibilityResolved === false &&
    i130.classificationAuthorized === false &&
    i130.numericScoringAuthorized === false &&
    i130.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_POLICY_ADOPTION_READINESS_REVIEW'
  );
}

function finalized(
  material: Omit<ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionPolicyAdoptionReadinessReviewReport, 'reviewId'>,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionPolicyAdoptionReadinessReviewReport {
  return {
    reviewId: `challenge_combination_support_channel_untouched_support_ke_visible_stem_threshold_composition_policy_adoption_readiness_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

function common(
  i130: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionPolicyRequirementsReviewReport,
) {
  return {
    reviewVersion:
      I131_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_POLICY_ADOPTION_READINESS_REVIEW_VERSION,
    upstreamI130ReviewId: i130.reviewId,
    i130RequirementsSufficientByThemselvesForAdoption: false as const,
    versionedPolicyDefinitionObjectPresent: false as const,
    candidateSetEvidenceBindingProcedureDefined: false as const,
    semanticBridgeAdjudicationProcedureDefined: false as const,
    contradictionAdjudicationProcedureDefined: false as const,
    scopeCompatibilityDecisionProcedureDefined: false as const,
    provenanceIndependenceDecisionProcedureDefined: false as const,
    failClosedAcceptanceEvaluationAlgorithmDefined: false as const,
    prospectiveRegistrationAndChangeControlDefined: false as const,
    compositionPolicyAdoptionReady: false as const,
    compositionPolicyAdoptionMayProceed: false as const,
    compositionPolicyMayBeInferredFromI130Requirements: false as const,
    compositionPolicyMayBeInferredFromI128ComplementaryEvidence: false as const,
    currentWuHuaiyunCoverageMayBeGrandfatheredAtAdoption: false as const,
    priorCandidateCoverageMayBeGrandfatheredAtAdoption: false as const,
    semanticBridgesMayBeCreatedByModelSynthesis: false as const,
    contradictionsMayBeResolvedByNumericWeighting: false as const,
    contradictionsMayBeResolvedByMajorityVote: false as const,
    policyDefinitionMayEvaluateCandidatesBeforeProspectiveRegistration: false as const,
    compositionPolicyAdoptedByThisGate: false as const,
    compositionPolicyExecutableByThisGate: false as const,
    candidateRegistrationPerformedByThisGate: false as const,
    candidateSetEvaluationPerformedByThisGate: false as const,
    actualCompositionPerformedByThisGate: false as const,
    crossCandidateCompositionAuthorized: false as const,
    multiSourceCompositionAuthorized: false as const,
    authorityAcquiredByThisGate: false as const,
    visibleStemBinaryEffectiveInteractionEligibilityResolved: false as const,
    effectiveInteractionSetResolved: false as const,
    thresholdRuleCreatedByThisGate: false as const,
    damageEvaluationAuthorized: false as const,
    i98KeDamageVocabularyEvaluationResolved: false as const,
    i98ResearchMethodologyMaterializationAuthorized: false as const,
    hiddenStemInteractionEligibilityGapRemains: true as const,
    hiddenStemAuthorityGap:
      'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED' as const,
    methodologyDefinitionCreatedByThisGate: false as const,
    ruleDefinitionCreatedByThisGate: false as const,
    registrySnapshotMutatedByThisGate: false as const,
    reviewAttestationCreatedByThisGate: false as const,
    noTrackedRelationTouchSemanticsRemainUnchanged: true as const,
    classificationAuthorized: false as const,
    numericScoringAuthorized: false as const,
  };
}

export function buildI131ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionPolicyAdoptionReadinessReview(
  i130: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionPolicyRequirementsReviewReport,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionPolicyAdoptionReadinessReviewReport {
  const base = common(i130);

  if (!exactI130Accepted(i130)) {
    return finalized({
      ...base,
      status: 'I130_UNRESOLVED_OR_INVALID',
      decision: 'MULTI_SOURCE_COMPOSITION_POLICY_ADOPTION_READINESS_NOT_ESTABLISHED',
      i130AcceptanceRequirementsAccepted: false,
      i130RequirementCount: 0,
      i130RequirementsRemainFrozen: false,
      i130RequirementsNecessaryForAdoption: false,
      missingPolicyArtifactIds: [],
      missingPolicyArtifactCount: 0,
      compositionPolicyDefinitionContractRequired: false,
      singleCandidateFullSixContractRemainsNormativeDefault: true,
      continuedSingleCandidateDiscoveryStillPermitted: true,
      recommendedNextGate:
        'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_POLICY_REQUIREMENTS_REVIEW',
      notes: [
        'I131 requires the exact resolved I130 requirements freeze before adoption readiness may be assessed.',
      ],
    });
  }

  return finalized({
    ...base,
    status:
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_POLICY_ADOPTION_READINESS_REVIEW',
    decision:
      'I130_REQUIREMENTS_NECESSARY_NOT_SUFFICIENT_COMPOSITION_POLICY_ADOPTION_NOT_READY_VERSIONED_POLICY_DEFINITION_AND_ADJUDICATION_PROCEDURES_ABSENT',
    i130AcceptanceRequirementsAccepted: true,
    i130RequirementCount: i130.requirementCount,
    i130RequirementsRemainFrozen: true,
    i130RequirementsNecessaryForAdoption: true,
    missingPolicyArtifactIds: MISSING_POLICY_ARTIFACT_IDS,
    missingPolicyArtifactCount: MISSING_POLICY_ARTIFACT_IDS.length,
    compositionPolicyDefinitionContractRequired: true,
    singleCandidateFullSixContractRemainsNormativeDefault: true,
    continuedSingleCandidateDiscoveryStillPermitted: true,
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_POLICY_DEFINITION_CONTRACT',
    notes: [
      'I130 freezes acceptance requirements but intentionally does not define or adopt an executable multi-source composition policy.',
      'Requirements are necessary but not sufficient for adoption: a separately versioned policy definition must specify evidence binding, semantic-bridge adjudication, contradiction handling, scope compatibility, provenance-independence decisions, a fail-closed acceptance algorithm, and prospective change control.',
      'No existing I126 or I128 coverage is grandfathered into a future policy. Any adopted policy must prospectively rebind and reevaluate evidence.',
      'The current single-candidate/full-six contract remains the normative default while composition-policy definition governance is incomplete.',
    ],
  });
}
