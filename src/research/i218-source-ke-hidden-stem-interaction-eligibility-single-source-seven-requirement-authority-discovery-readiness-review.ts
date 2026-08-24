import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { I212_HIDDEN_STEM_AUTHORITY_REQUIREMENT_IDS } from './i212-source-ke-hidden-stem-interaction-eligibility-authority-gap-requirements-review.js';
import {
  I217_PRIMARY_RESIDUAL_REQUIREMENT_IDS,
  type I217SourceKeHiddenStemInteractionEligibilityCandidateCoverageEvidenceAdequacyResidualRequirementsReassessmentReviewReport,
} from './i217-source-ke-hidden-stem-interaction-eligibility-candidate-coverage-evidence-adequacy-residual-requirements-reassessment-review.js';

export const I218_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_SEVEN_REQUIREMENT_AUTHORITY_DISCOVERY_READINESS_REVIEW_VERSION =
  'myeonghwa-source-ke-hidden-stem-interaction-eligibility-single-source-seven-requirement-authority-discovery-readiness-review-v1';

export const I218_DISCOVERY_PATH_IDS = Object.freeze([
  'SINGLE_SOURCE_FULL_HIDDEN_STEM_METHOD_SECTION_DISCOVERY',
  'EXPLICIT_HIDDEN_TO_VISIBLE_DIRECTIONAL_PASSAGE_TARGETING',
  'GENERAL_HIDDEN_TO_HIDDEN_AND_ACTIVATION_EXCEPTION_PASSAGE_TARGETING',
  'RELATION_INTERACTION_DAMAGE_SEMANTIC_LAYER_PASSAGE_TARGETING',
  'PRIMARY_OR_VERIFIED_EDITION_CONTEXT_AND_REPRODUCIBLE_LOCATOR_CONFIRMATION',
] as const);
export type I218DiscoveryPathId = (typeof I218_DISCOVERY_PATH_IDS)[number];

export const I218_DISCOVERY_CONTROL_IDS = Object.freeze([
  'EXACT_I217_RESIDUAL_REASSESSMENT_BOUNDARY_REQUIRED',
  'NEW_CANDIDATE_MUST_INDEPENDENTLY_SATISFY_ALL_SEVEN_I212_REQUIREMENTS',
  'CURRENT_THREE_CANDIDATES_MUST_NOT_CROSS_COMPLETE_NEW_CANDIDATE',
  'HIDDEN_TO_VISIBLE_POSITIVE_DIRECT_AUTHORITY_IS_HIGHEST_PRIORITY_DIRECTIONAL_TARGET',
  'VISIBLE_TO_HIDDEN_MUST_BE_ESTABLISHED_INSIDE_THE_SAME_NEW_CANDIDATE',
  'HIDDEN_TO_HIDDEN_MUST_NOT_BE_GENERALIZED_FROM_BRANCH_CLASH_ONLY_CONTEXT',
  'HIDDEN_STEM_MEMBERSHIP_MUST_REMAIN_DISTINCT_FROM_EFFECTIVE_INTERACTION_ELIGIBILITY',
  'POSITION_CONTEXT_ACTIVATION_AND_EXCEPTION_CONDITIONS_REQUIRE_EXPLICIT_SOURCE_LANGUAGE',
  'RELATION_EXISTENCE_EFFECTIVE_INTERACTION_AND_DAMAGE_OUTCOME_MUST_REMAIN_DISTINCT',
  'EXACT_SOURCE_IDENTITY_ORIGINAL_OR_VERIFIED_CONTEXT_AND_REPRODUCIBLE_LOCATOR_REQUIRED',
  'SEARCH_SNIPPETS_MODEL_SYNTHESIS_GENERAL_KNOWLEDGE_AND_EMPIRICAL_CALIBRATION_ARE_NOT_AUTHORITY',
  'PARTIAL_EVIDENCE_MAY_BE_RECORDED_BUT_MUST_NOT_TRIGGER_PROMOTION',
  'RESTRICTIVE_DOCTRINAL_CONFLICT_MUST_BE_PRESERVED_NOT_SILENTLY_RESOLVED',
  'SOURCE_CLASS_OR_AGE_MUST_NOT_AUTO_ACCEPT_A_CANDIDATE',
  'I132_QU_WEI_HOLD_LI_SUSPENSION_CURRENT_V2_AND_PROVENANCE_GUARDS_REMAIN_UNCHANGED',
  'NO_REBINDING_COMPOSITION_THRESHOLD_DAMAGE_CLASSIFICATION_SCORING_OR_PRODUCTION_AUTHORITY',
] as const);
export type I218DiscoveryControlId = (typeof I218_DISCOVERY_CONTROL_IDS)[number];

export interface I218SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementAuthorityDiscoveryReadinessReviewReport {
  reviewId: string;
  reviewVersion: string;
  status:
    | 'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_SEVEN_REQUIREMENT_AUTHORITY_DISCOVERY_READINESS_REVIEW'
    | 'I217_RESIDUAL_REASSESSMENT_BOUNDARY_INVALID';
  decision:
    | 'SINGLE_SOURCE_SEVEN_REQUIREMENT_DISCOVERY_CONTRACT_FROZEN_FIVE_PATHS_SIXTEEN_CONTROLS_NO_DISCOVERY_EXECUTED_NO_AUTHORITY_ACQUIRED'
    | 'SINGLE_SOURCE_HIDDEN_STEM_AUTHORITY_DISCOVERY_NOT_READY';
  upstreamI217ReviewId: string;
  policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy';
  policyVersion: 'v1-definition';
  adoptionVersion: 'v1-adoption';
  currentCandidateSetVersion: 'v1-candidate-set';
  currentInputPackageVersion: 'v2-input-package';
  exactI217BoundaryAccepted: boolean;
  targetSourceTerm: '克';
  targetScope: 'HIDDEN_STEM_EFFECTIVE_INTERACTION_ELIGIBILITY';
  authorityGap:
    | 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED'
    | 'UPSTREAM_INVALID';
  requirementIds: readonly string[];
  requirementCount: 7 | 0;
  primaryResidualRequirementIds: readonly string[];
  primaryResidualRequirementCount: 5 | 0;
  discoveryPathIds: readonly I218DiscoveryPathId[];
  discoveryPathCount: 5 | 0;
  discoveryPathsFrozen: boolean;
  discoveryControlIds: readonly I218DiscoveryControlId[];
  discoveryControlCount: 16 | 0;
  discoveryControlsFrozen: boolean;
  singleSourceSevenRequirementCandidateRequired: boolean;
  allSevenRequirementsMustBeSatisfiedWithinSameCandidate: boolean;
  currentCandidateEvidenceMayCrossCompleteCandidate: false;
  existingVisibleToHiddenSignalMayBackfillCandidate: false;
  hiddenToVisiblePriorityTargetRequired: boolean;
  sameCandidateVisibleToHiddenEvidenceRequired: boolean;
  generalHiddenToHiddenEvidenceRequired: boolean;
  branchClashOnlyHiddenToHiddenMayBeGeneralized: false;
  explicitMembershipVsEffectiveInteractionSeparationRequired: boolean;
  explicitPositionContextActivationAndExceptionsRequired: boolean;
  explicitRelationInteractionDamageSeparationRequired: boolean;
  exactSourceIdentityRequired: boolean;
  originalOrVerifiedSourceContextRequired: boolean;
  reproducibleLocatorRequired: boolean;
  primaryOrVerifiedEditionPreferredWhenAvailable: boolean;
  searchSnippetMayCountAsAuthority: false;
  modelSynthesisMayCountAsAuthority: false;
  generalKnowledgeMayCountAsAuthority: false;
  empiricalCalibrationMayCreateAuthority: false;
  sourceClassOrAgeAutoAcceptanceAllowed: false;
  partialEvidenceMayBeRecorded: boolean;
  partialEvidenceMayTriggerPromotion: false;
  restrictiveDoctrinalConflictMustBePreserved: boolean;
  doctrinalConflictResolutionAuthorizedByThisGate: false;
  discoveryAuthorized: boolean;
  discoveryExecutedByThisGate: false;
  candidateEvidenceRecordedByThisGate: false;
  requirementCoverageEvaluatedByThisGate: false;
  authorityPromotedByThisGate: false;
  candidateRegisteredByThisGate: false;
  candidateSelectedByThisGate: false;
  negativeFindingCreatedByThisGate: false;
  discoveryExhaustionClaimed: false;
  corpusExhaustionClaimed: false;
  quWei2001HoldPreserved: boolean;
  li1998SameTargetPathSuspendedNotRetired: boolean;
  I132IndependentNormativeProvenanceRequirementRemainsNormative: boolean;
  I132PolicyRelaxationAuthorizedByThisGate: false;
  provenanceIndependenceAdjudicatedByThisGate: false;
  derivativeLineageAdjudicatedByThisGate: false;
  evidenceRebindingAuthorizedByThisGate: false;
  candidateSetMutatedByThisGate: false;
  candidateSetReevaluationAuthorizedByThisGate: false;
  currentV2PackageAndCandidateSetRemainImmutable: boolean;
  currentV2ProvenanceDisposition: 'BLOCKED_UNDER_CURRENT_EVIDENCE' | 'NOT_ASSESSED';
  actualCompositionPerformedByThisGate: false;
  multiSourceCompositionAuthorized: false;
  visibleStemBinaryEffectiveInteractionEligibilityResolved: false;
  thresholdRuleCreatedByThisGate: false;
  damageEvaluationAuthorized: false;
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  productionPolicyExecutionAuthorized: false;
  recommendedNextGate:
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_SEVEN_REQUIREMENT_AUTHORITY_DISCOVERY_EVIDENCE'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_SEVEN_REQUIREMENT_AUTHORITY_DISCOVERY_READINESS_REVIEW';
  notes: readonly string[];
}

function exactI217Accepted(
  i217: I217SourceKeHiddenStemInteractionEligibilityCandidateCoverageEvidenceAdequacyResidualRequirementsReassessmentReviewReport,
): boolean {
  return (
    i217.status ===
      'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_CANDIDATE_COVERAGE_EVIDENCE_ADEQUACY_RESIDUAL_REQUIREMENTS_REASSESSMENT_REVIEW' &&
    i217.decision ===
      'I216_EVIDENCE_ADEQUATE_FIVE_SUBSTANTIVE_RESIDUALS_IDENTIFIED_SINGLE_SOURCE_SEVEN_REQUIREMENT_DISCOVERY_METHODOLOGICALLY_JUSTIFIED_NO_COMPOSITION_NO_PROMOTION' &&
    i217.exactI216BoundaryAccepted &&
    i217.evidenceAdequacyAccepted &&
    i217.candidateMatrixCountAccepted === 3 &&
    i217.coverageCellCountAccepted === 21 &&
    i217.fullSevenRequirementCandidateCountAccepted === 0 &&
    i217.primaryResidualRequirementCount === 5 &&
    i217.primaryResidualRequirementIds.length === I217_PRIMARY_RESIDUAL_REQUIREMENT_IDS.length &&
    i217.primaryResidualRequirementIds.every((id, index) => id === I217_PRIMARY_RESIDUAL_REQUIREMENT_IDS[index]) &&
    i217.hiddenToVisibleIsHighestPriorityUnresolvedDirectionalGap &&
    i217.hiddenToVisiblePositiveDirectEvidenceRemainsUnestablished &&
    i217.generalHiddenToHiddenEligibilityRemainsUnestablished &&
    i217.membershipVsEffectiveInteractionGeneralSeparationRemainsUnestablished &&
    i217.activationExceptionGeneralContractRemainsUnestablished &&
    i217.relationInteractionDamageGeneralSeparationRemainsUnestablished &&
    i217.visibleToHiddenDirectSignalExistsButIsCandidateLocalOnly &&
    i217.exactSourceIdentityRequirementRemainsMandatoryForAnyNewCandidate &&
    i217.allSevenI212RequirementsRemainMandatoryForAnyNewCandidate &&
    i217.singleSourceSevenRequirementCandidateRequired &&
    i217.existingCandidatePartialCoverageMayCrossCompleteNewCandidate === false &&
    i217.existingVisibleToHiddenSignalMayBackfillNewCandidate === false &&
    i217.existingLocatorCoverageMayBackfillNewCandidate === false &&
    i217.materiallyTargetedSingleSourceDiscoveryMethodologicallyJustified &&
    i217.equivalentSameSurfaceRepetitionCountsAsProgress === false &&
    i217.materiallyNewSourceOrMateriallyNewDirectPassageRequired &&
    i217.discoveryReadinessReviewAuthorized &&
    i217.discoveryExecutedByThisGate === false &&
    i217.doctrinalConflictRetained &&
    i217.doctrinalConflictResolvedByThisGate === false &&
    i217.negativeFindingCreatedByThisGate === false &&
    i217.discoveryExhaustionClaimed === false &&
    i217.corpusExhaustionClaimed === false &&
    i217.authorityGap === 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED' &&
    i217.authorityGapClosed === false &&
    i217.authorityPromotedByThisGate === false &&
    i217.quWei2001HoldPreserved &&
    i217.li1998SameTargetPathSuspendedNotRetired &&
    i217.I132IndependentNormativeProvenanceRequirementRemainsNormative &&
    i217.I132PolicyRelaxationAuthorizedByThisGate === false &&
    i217.provenanceIndependenceAdjudicatedByThisGate === false &&
    i217.evidenceRebindingAuthorizedByThisGate === false &&
    i217.candidateSetMutatedByThisGate === false &&
    i217.candidateSetReevaluationAuthorizedByThisGate === false &&
    i217.currentV2PackageAndCandidateSetRemainImmutable &&
    i217.currentV2ProvenanceDisposition === 'BLOCKED_UNDER_CURRENT_EVIDENCE' &&
    i217.actualCompositionPerformedByThisGate === false &&
    i217.multiSourceCompositionAuthorized === false &&
    i217.thresholdRuleCreatedByThisGate === false &&
    i217.damageEvaluationAuthorized === false &&
    i217.classificationAuthorized === false &&
    i217.numericScoringAuthorized === false &&
    i217.productionPolicyExecutionAuthorized === false &&
    i217.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_SEVEN_REQUIREMENT_AUTHORITY_DISCOVERY_READINESS_REVIEW'
  );
}

function finalized(
  material: Omit<I218SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementAuthorityDiscoveryReadinessReviewReport, 'reviewId'>,
): I218SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementAuthorityDiscoveryReadinessReviewReport {
  return {
    reviewId: `i218_hidden_stem_single_source_discovery_readiness_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI218SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementAuthorityDiscoveryReadinessReview(
  i217: I217SourceKeHiddenStemInteractionEligibilityCandidateCoverageEvidenceAdequacyResidualRequirementsReassessmentReviewReport,
): I218SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementAuthorityDiscoveryReadinessReviewReport {
  const accepted = exactI217Accepted(i217);
  return finalized({
    reviewVersion: I218_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_SEVEN_REQUIREMENT_AUTHORITY_DISCOVERY_READINESS_REVIEW_VERSION,
    status: accepted
      ? 'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_SEVEN_REQUIREMENT_AUTHORITY_DISCOVERY_READINESS_REVIEW'
      : 'I217_RESIDUAL_REASSESSMENT_BOUNDARY_INVALID',
    decision: accepted
      ? 'SINGLE_SOURCE_SEVEN_REQUIREMENT_DISCOVERY_CONTRACT_FROZEN_FIVE_PATHS_SIXTEEN_CONTROLS_NO_DISCOVERY_EXECUTED_NO_AUTHORITY_ACQUIRED'
      : 'SINGLE_SOURCE_HIDDEN_STEM_AUTHORITY_DISCOVERY_NOT_READY',
    upstreamI217ReviewId: i217.reviewId,
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI217BoundaryAccepted: accepted,
    targetSourceTerm: '克',
    targetScope: 'HIDDEN_STEM_EFFECTIVE_INTERACTION_ELIGIBILITY',
    authorityGap: accepted ? 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED' : 'UPSTREAM_INVALID',
    requirementIds: accepted ? I212_HIDDEN_STEM_AUTHORITY_REQUIREMENT_IDS : Object.freeze([]),
    requirementCount: accepted ? 7 : 0,
    primaryResidualRequirementIds: accepted ? I217_PRIMARY_RESIDUAL_REQUIREMENT_IDS : Object.freeze([]),
    primaryResidualRequirementCount: accepted ? 5 : 0,
    discoveryPathIds: accepted ? I218_DISCOVERY_PATH_IDS : Object.freeze([]),
    discoveryPathCount: accepted ? 5 : 0,
    discoveryPathsFrozen: accepted,
    discoveryControlIds: accepted ? I218_DISCOVERY_CONTROL_IDS : Object.freeze([]),
    discoveryControlCount: accepted ? 16 : 0,
    discoveryControlsFrozen: accepted,
    singleSourceSevenRequirementCandidateRequired: accepted,
    allSevenRequirementsMustBeSatisfiedWithinSameCandidate: accepted,
    currentCandidateEvidenceMayCrossCompleteCandidate: false,
    existingVisibleToHiddenSignalMayBackfillCandidate: false,
    hiddenToVisiblePriorityTargetRequired: accepted,
    sameCandidateVisibleToHiddenEvidenceRequired: accepted,
    generalHiddenToHiddenEvidenceRequired: accepted,
    branchClashOnlyHiddenToHiddenMayBeGeneralized: false,
    explicitMembershipVsEffectiveInteractionSeparationRequired: accepted,
    explicitPositionContextActivationAndExceptionsRequired: accepted,
    explicitRelationInteractionDamageSeparationRequired: accepted,
    exactSourceIdentityRequired: accepted,
    originalOrVerifiedSourceContextRequired: accepted,
    reproducibleLocatorRequired: accepted,
    primaryOrVerifiedEditionPreferredWhenAvailable: accepted,
    searchSnippetMayCountAsAuthority: false,
    modelSynthesisMayCountAsAuthority: false,
    generalKnowledgeMayCountAsAuthority: false,
    empiricalCalibrationMayCreateAuthority: false,
    sourceClassOrAgeAutoAcceptanceAllowed: false,
    partialEvidenceMayBeRecorded: accepted,
    partialEvidenceMayTriggerPromotion: false,
    restrictiveDoctrinalConflictMustBePreserved: accepted,
    doctrinalConflictResolutionAuthorizedByThisGate: false,
    discoveryAuthorized: accepted,
    discoveryExecutedByThisGate: false,
    candidateEvidenceRecordedByThisGate: false,
    requirementCoverageEvaluatedByThisGate: false,
    authorityPromotedByThisGate: false,
    candidateRegisteredByThisGate: false,
    candidateSelectedByThisGate: false,
    negativeFindingCreatedByThisGate: false,
    discoveryExhaustionClaimed: false,
    corpusExhaustionClaimed: false,
    quWei2001HoldPreserved: accepted,
    li1998SameTargetPathSuspendedNotRetired: accepted,
    I132IndependentNormativeProvenanceRequirementRemainsNormative: accepted,
    I132PolicyRelaxationAuthorizedByThisGate: false,
    provenanceIndependenceAdjudicatedByThisGate: false,
    derivativeLineageAdjudicatedByThisGate: false,
    evidenceRebindingAuthorizedByThisGate: false,
    candidateSetMutatedByThisGate: false,
    candidateSetReevaluationAuthorizedByThisGate: false,
    currentV2PackageAndCandidateSetRemainImmutable: accepted,
    currentV2ProvenanceDisposition: accepted ? 'BLOCKED_UNDER_CURRENT_EVIDENCE' : 'NOT_ASSESSED',
    actualCompositionPerformedByThisGate: false,
    multiSourceCompositionAuthorized: false,
    visibleStemBinaryEffectiveInteractionEligibilityResolved: false,
    thresholdRuleCreatedByThisGate: false,
    damageEvaluationAuthorized: false,
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    productionPolicyExecutionAuthorized: false,
    recommendedNextGate: accepted
      ? 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_SEVEN_REQUIREMENT_AUTHORITY_DISCOVERY_EVIDENCE'
      : 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_SEVEN_REQUIREMENT_AUTHORITY_DISCOVERY_READINESS_REVIEW',
    notes: accepted
      ? Object.freeze([
          'I218 freezes a materially targeted discovery contract for a new candidate that must independently satisfy all seven I212 requirements.',
          'Hidden-to-visible positive direct authority is the highest-priority directional target, while visible-to-hidden must still be demonstrated inside the same candidate rather than borrowed from Shenfeng Tongkao.',
          'Context-bounded hidden-to-hidden evidence cannot be generalized, and the future candidate must explicitly preserve membership/effective-interaction and relation/interaction/damage semantic boundaries.',
          'Discovery may record partial evidence but cannot promote, register, select, rebind, compose, score, classify, or authorize production behavior.',
        ])
      : Object.freeze(['I218 fails closed unless the exact I217 residual-reassessment boundary is preserved.']),
  });
}
