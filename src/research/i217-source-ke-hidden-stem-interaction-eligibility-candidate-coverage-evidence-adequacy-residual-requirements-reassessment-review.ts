import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  I212_HIDDEN_STEM_AUTHORITY_REQUIREMENT_IDS,
  type I212HiddenStemAuthorityRequirementId,
} from './i212-source-ke-hidden-stem-interaction-eligibility-authority-gap-requirements-review.js';
import type { I216SourceKeHiddenStemInteractionEligibilityCandidateEvidenceAdequacyCoverageEvaluationReport } from './i216-source-ke-hidden-stem-interaction-eligibility-candidate-evidence-adequacy-coverage-evaluation.js';

export const I217_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_CANDIDATE_COVERAGE_EVIDENCE_ADEQUACY_RESIDUAL_REQUIREMENTS_REASSESSMENT_REVIEW_VERSION =
  'myeonghwa-source-ke-hidden-stem-interaction-eligibility-candidate-coverage-evidence-adequacy-residual-requirements-reassessment-review-v1';

export const I217_PRIMARY_RESIDUAL_REQUIREMENT_IDS = Object.freeze([
  'HIDDEN_STEM_MEMBERSHIP_VS_EFFECTIVE_INTERACTION_SEPARATION',
  'HIDDEN_STEM_TO_VISIBLE_STEM_DIRECTIONAL_ELIGIBILITY_SCOPE',
  'HIDDEN_STEM_TO_HIDDEN_STEM_DIRECTIONAL_ELIGIBILITY_SCOPE',
  'POSITION_CONTEXT_ACTIVATION_AND_EXCEPTION_CONDITIONS',
  'RELATION_EXISTENCE_EFFECTIVE_INTERACTION_AND_DAMAGE_OUTCOME_SEPARATION',
] as const satisfies readonly I212HiddenStemAuthorityRequirementId[]);

export type I217PrimaryResidualRequirementId = (typeof I217_PRIMARY_RESIDUAL_REQUIREMENT_IDS)[number];

export interface I217SourceKeHiddenStemInteractionEligibilityCandidateCoverageEvidenceAdequacyResidualRequirementsReassessmentReviewReport {
  reviewId: string;
  reviewVersion: string;
  status:
    | 'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_CANDIDATE_COVERAGE_EVIDENCE_ADEQUACY_RESIDUAL_REQUIREMENTS_REASSESSMENT_REVIEW'
    | 'I216_COVERAGE_EVALUATION_BOUNDARY_INVALID';
  decision:
    | 'I216_EVIDENCE_ADEQUATE_FIVE_SUBSTANTIVE_RESIDUALS_IDENTIFIED_SINGLE_SOURCE_SEVEN_REQUIREMENT_DISCOVERY_METHODOLOGICALLY_JUSTIFIED_NO_COMPOSITION_NO_PROMOTION'
    | 'HIDDEN_STEM_RESIDUAL_REQUIREMENTS_REASSESSMENT_NOT_EXECUTED';
  upstreamI216EvaluationId: string;
  policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy';
  policyVersion: 'v1-definition';
  adoptionVersion: 'v1-adoption';
  currentCandidateSetVersion: 'v1-candidate-set';
  currentInputPackageVersion: 'v2-input-package';
  exactI216BoundaryAccepted: boolean;
  targetSourceTerm: '克';
  targetScope: 'HIDDEN_STEM_EFFECTIVE_INTERACTION_ELIGIBILITY';
  evidenceAdequacyAccepted: boolean;
  candidateMatrixCountAccepted: 3 | 0;
  coverageCellCountAccepted: 21 | 0;
  fullSevenRequirementCandidateCountAccepted: 0;
  primaryResidualRequirementIds: readonly I217PrimaryResidualRequirementId[];
  primaryResidualRequirementCount: 5 | 0;
  hiddenToVisibleIsHighestPriorityUnresolvedDirectionalGap: boolean;
  hiddenToVisiblePositiveDirectEvidenceRemainsUnestablished: boolean;
  generalHiddenToHiddenEligibilityRemainsUnestablished: boolean;
  membershipVsEffectiveInteractionGeneralSeparationRemainsUnestablished: boolean;
  activationExceptionGeneralContractRemainsUnestablished: boolean;
  relationInteractionDamageGeneralSeparationRemainsUnestablished: boolean;
  visibleToHiddenDirectSignalExistsButIsCandidateLocalOnly: boolean;
  exactSourceIdentityRequirementRemainsMandatoryForAnyNewCandidate: boolean;
  allSevenI212RequirementsRemainMandatoryForAnyNewCandidate: boolean;
  singleSourceSevenRequirementCandidateRequired: boolean;
  existingCandidatePartialCoverageMayCrossCompleteNewCandidate: false;
  existingVisibleToHiddenSignalMayBackfillNewCandidate: false;
  existingLocatorCoverageMayBackfillNewCandidate: false;
  currentThreeCandidatesPromotableByThisGate: false;
  materiallyTargetedSingleSourceDiscoveryMethodologicallyJustified: boolean;
  equivalentSameSurfaceRepetitionCountsAsProgress: false;
  materiallyNewSourceOrMateriallyNewDirectPassageRequired: boolean;
  discoveryReadinessReviewAuthorized: boolean;
  discoveryExecutedByThisGate: false;
  doctrinalConflictRetained: boolean;
  doctrinalConflictResolvedByThisGate: false;
  negativeFindingCreatedByThisGate: false;
  discoveryExhaustionClaimed: false;
  corpusExhaustionClaimed: false;
  authorityGap:
    | 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED'
    | 'UPSTREAM_INVALID';
  authorityGapClosed: false;
  authorityPromotedByThisGate: false;
  candidateRegisteredByThisGate: false;
  candidateSelectedByThisGate: false;
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
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_SEVEN_REQUIREMENT_AUTHORITY_DISCOVERY_READINESS_REVIEW'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_CANDIDATE_COVERAGE_EVIDENCE_ADEQUACY_RESIDUAL_REQUIREMENTS_REASSESSMENT_REVIEW';
  notes: readonly string[];
}

function exactI216Accepted(
  i216: I216SourceKeHiddenStemInteractionEligibilityCandidateEvidenceAdequacyCoverageEvaluationReport,
): boolean {
  return (
    i216.status ===
      'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_CANDIDATE_EVIDENCE_ADEQUACY_COVERAGE_EVALUATION' &&
    i216.decision ===
      'THREE_CANDIDATE_LOCAL_MATRICES_EVALUATED_ZERO_FULL_SEVEN_REQUIREMENT_CANDIDATES_HIDDEN_TO_VISIBLE_REMAINS_UNRESOLVED_DOCTRINAL_CONFLICT_REMAINS_NO_AUTHORITY_PROMOTED' &&
    i216.exactI215BoundaryAccepted &&
    i216.evaluationExecuted &&
    i216.candidateMatrixCount === 3 &&
    i216.totalCoverageCellCount === 21 &&
    i216.matrices.length === 3 &&
    i216.matrices.every((matrix) => matrix.cellCount === 7 && matrix.cells.length === 7) &&
    i216.candidatesWithFullSevenRequirementCoverage === 0 &&
    i216.candidateLocalAuthorityAdequateCount === 0 &&
    i216.chenYuanHiddenToHiddenContextBoundedPartialAccepted &&
    i216.shenfengVisibleToHiddenDirectCandidateLocalEvidenceAccepted &&
    i216.liHanchenRestrictiveConflictAcceptedAsConflictOnly &&
    i216.hiddenToVisiblePositiveDirectEvidenceEstablished === false &&
    i216.hiddenToVisibleRequirementRemainsUnresolved &&
    i216.hiddenToVisibleAbsenceCreatesNegativeFinding === false &&
    i216.contextualEvidenceGeneralizedBeyondContext === false &&
    i216.doctrinalConflictPresent &&
    i216.doctrinalConflictResolvedByThisGate === false &&
    i216.crossCandidateCompositionPerformed === false &&
    i216.partialEvidenceCountedAsDirectRequirementSatisfaction === false &&
    i216.restrictiveConflictCountedAsDirectRequirementSatisfaction === false &&
    i216.fullSevenRequirementAuthorityContractSatisfied === false &&
    i216.authorityGap === 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED' &&
    i216.authorityGapClosed === false &&
    i216.authorityPromotedByThisGate === false &&
    i216.negativeFindingCreatedByThisGate === false &&
    i216.discoveryExhaustionClaimed === false &&
    i216.corpusExhaustionClaimed === false &&
    i216.quWei2001HoldPreserved &&
    i216.li1998SameTargetPathSuspendedNotRetired &&
    i216.I132IndependentNormativeProvenanceRequirementRemainsNormative &&
    i216.I132PolicyRelaxationAuthorizedByThisGate === false &&
    i216.provenanceIndependenceAdjudicatedByThisGate === false &&
    i216.evidenceRebindingAuthorizedByThisGate === false &&
    i216.candidateSetMutatedByThisGate === false &&
    i216.candidateSetReevaluationAuthorizedByThisGate === false &&
    i216.currentV2PackageAndCandidateSetRemainImmutable &&
    i216.currentV2ProvenanceDisposition === 'BLOCKED_UNDER_CURRENT_EVIDENCE' &&
    i216.actualCompositionPerformedByThisGate === false &&
    i216.multiSourceCompositionAuthorized === false &&
    i216.thresholdRuleCreatedByThisGate === false &&
    i216.damageEvaluationAuthorized === false &&
    i216.classificationAuthorized === false &&
    i216.numericScoringAuthorized === false &&
    i216.productionPolicyExecutionAuthorized === false &&
    i216.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_CANDIDATE_COVERAGE_EVIDENCE_ADEQUACY_RESIDUAL_REQUIREMENTS_REASSESSMENT_REVIEW'
  );
}

function finalized(
  material: Omit<
    I217SourceKeHiddenStemInteractionEligibilityCandidateCoverageEvidenceAdequacyResidualRequirementsReassessmentReviewReport,
    'reviewId'
  >,
): I217SourceKeHiddenStemInteractionEligibilityCandidateCoverageEvidenceAdequacyResidualRequirementsReassessmentReviewReport {
  return {
    reviewId: `i217_hidden_stem_residual_reassessment_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI217SourceKeHiddenStemInteractionEligibilityCandidateCoverageEvidenceAdequacyResidualRequirementsReassessmentReview(
  i216: I216SourceKeHiddenStemInteractionEligibilityCandidateEvidenceAdequacyCoverageEvaluationReport,
): I217SourceKeHiddenStemInteractionEligibilityCandidateCoverageEvidenceAdequacyResidualRequirementsReassessmentReviewReport {
  const accepted = exactI216Accepted(i216);
  return finalized({
    reviewVersion:
      I217_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_CANDIDATE_COVERAGE_EVIDENCE_ADEQUACY_RESIDUAL_REQUIREMENTS_REASSESSMENT_REVIEW_VERSION,
    status: accepted
      ? 'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_CANDIDATE_COVERAGE_EVIDENCE_ADEQUACY_RESIDUAL_REQUIREMENTS_REASSESSMENT_REVIEW'
      : 'I216_COVERAGE_EVALUATION_BOUNDARY_INVALID',
    decision: accepted
      ? 'I216_EVIDENCE_ADEQUATE_FIVE_SUBSTANTIVE_RESIDUALS_IDENTIFIED_SINGLE_SOURCE_SEVEN_REQUIREMENT_DISCOVERY_METHODOLOGICALLY_JUSTIFIED_NO_COMPOSITION_NO_PROMOTION'
      : 'HIDDEN_STEM_RESIDUAL_REQUIREMENTS_REASSESSMENT_NOT_EXECUTED',
    upstreamI216EvaluationId: i216.evaluationId,
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI216BoundaryAccepted: accepted,
    targetSourceTerm: '克',
    targetScope: 'HIDDEN_STEM_EFFECTIVE_INTERACTION_ELIGIBILITY',
    evidenceAdequacyAccepted: accepted,
    candidateMatrixCountAccepted: accepted ? 3 : 0,
    coverageCellCountAccepted: accepted ? 21 : 0,
    fullSevenRequirementCandidateCountAccepted: 0,
    primaryResidualRequirementIds: accepted ? I217_PRIMARY_RESIDUAL_REQUIREMENT_IDS : Object.freeze([]),
    primaryResidualRequirementCount: accepted ? 5 : 0,
    hiddenToVisibleIsHighestPriorityUnresolvedDirectionalGap: accepted,
    hiddenToVisiblePositiveDirectEvidenceRemainsUnestablished: accepted,
    generalHiddenToHiddenEligibilityRemainsUnestablished: accepted,
    membershipVsEffectiveInteractionGeneralSeparationRemainsUnestablished: accepted,
    activationExceptionGeneralContractRemainsUnestablished: accepted,
    relationInteractionDamageGeneralSeparationRemainsUnestablished: accepted,
    visibleToHiddenDirectSignalExistsButIsCandidateLocalOnly: accepted,
    exactSourceIdentityRequirementRemainsMandatoryForAnyNewCandidate: accepted,
    allSevenI212RequirementsRemainMandatoryForAnyNewCandidate:
      accepted && I212_HIDDEN_STEM_AUTHORITY_REQUIREMENT_IDS.length === 7,
    singleSourceSevenRequirementCandidateRequired: accepted,
    existingCandidatePartialCoverageMayCrossCompleteNewCandidate: false,
    existingVisibleToHiddenSignalMayBackfillNewCandidate: false,
    existingLocatorCoverageMayBackfillNewCandidate: false,
    currentThreeCandidatesPromotableByThisGate: false,
    materiallyTargetedSingleSourceDiscoveryMethodologicallyJustified: accepted,
    equivalentSameSurfaceRepetitionCountsAsProgress: false,
    materiallyNewSourceOrMateriallyNewDirectPassageRequired: accepted,
    discoveryReadinessReviewAuthorized: accepted,
    discoveryExecutedByThisGate: false,
    doctrinalConflictRetained: accepted,
    doctrinalConflictResolvedByThisGate: false,
    negativeFindingCreatedByThisGate: false,
    discoveryExhaustionClaimed: false,
    corpusExhaustionClaimed: false,
    authorityGap: accepted
      ? 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED'
      : 'UPSTREAM_INVALID',
    authorityGapClosed: false,
    authorityPromotedByThisGate: false,
    candidateRegisteredByThisGate: false,
    candidateSelectedByThisGate: false,
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
      ? 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_SEVEN_REQUIREMENT_AUTHORITY_DISCOVERY_READINESS_REVIEW'
      : 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_CANDIDATE_COVERAGE_EVIDENCE_ADEQUACY_RESIDUAL_REQUIREMENTS_REASSESSMENT_REVIEW',
    notes: accepted
      ? Object.freeze([
          'I216 is adequate to establish that the current three candidates do not independently satisfy the seven-requirement hidden-stem authority contract.',
          'Five substantive residuals remain priority discovery targets; hidden-to-visible positive direct authority has the strongest directional information deficit.',
          'A future candidate must independently satisfy all seven I212 requirements. Existing Chen Yuan, Shenfeng Tongkao, and Li Hanchen cells may not cross-complete or backfill a new candidate.',
          'Targeted discovery remains methodologically justified because useful direct and context-bounded signals exist and no negative or corpus-exhaustion finding has been established.',
        ])
      : Object.freeze(['I217 fails closed unless the exact I216 candidate-local coverage evaluation boundary is preserved.']),
  });
}
