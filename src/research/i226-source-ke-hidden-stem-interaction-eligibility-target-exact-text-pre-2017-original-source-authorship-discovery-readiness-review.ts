import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { I225SourceKeHiddenStemInteractionEligibilitySingleSourceAuthorityAdmissibilityAcquisitionEvidenceAdequacyResidualGapReassessmentReviewReport } from './i225-source-ke-hidden-stem-interaction-eligibility-single-source-authority-admissibility-acquisition-evidence-adequacy-residual-gap-reassessment-review.js';

export const I226_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_EXACT_TEXT_PRE_2017_ORIGINAL_SOURCE_AUTHORSHIP_DISCOVERY_READINESS_REVIEW_VERSION =
  'myeonghwa-source-ke-hidden-stem-interaction-eligibility-target-exact-text-pre-2017-original-source-authorship-discovery-readiness-review-v1';

export const I226_TARGET_EXACT_TEXT_DISCOVERY_PATH_IDS = Object.freeze([
  'EXACT_RARE_TARGET_PHRASE_PRE_2017_SEARCH',
  'SOHU_TARGET_PART1_ARCHIVE_AND_OUTBOUND_ATTRIBUTION_TRACE',
  'PRE_2017_BOOK_OR_COURSE_MATERIAL_EXACT_PASSAGE_MATCH',
  'NAMED_LINEAGE_CANDIDATE_EXACT_PASSAGE_BINDING',
  'DATE_VERIFIED_EARLY_REPUBLICATION_OR_ARCHIVE_TRACE',
] as const);
export type I226TargetExactTextDiscoveryPathId = (typeof I226_TARGET_EXACT_TEXT_DISCOVERY_PATH_IDS)[number];

export const I226_TARGET_EXACT_TEXT_DISCOVERY_CONTROL_IDS = Object.freeze([
  'EXACT_I225_RESIDUAL_BOUNDARY_REQUIRED',
  'I221_SEVEN_OF_SEVEN_COVERAGE_NOT_REEVALUATED',
  'TARGET_SPECIFIC_DISCOVERY_ONLY_NO_EQUIVALENT_BROAD_SEARCH',
  'SEARCH_SNIPPET_MAY_BE_LEAD_ONLY',
  'DIRECTLY_OPENED_OR_SOURCE_BOUND_CONTEXT_REQUIRED_FOR_POSITIVE_PREDECESSOR_FINDING',
  'ADJACENT_THEORY_IS_NOT_TARGET_PREDECESSOR',
  'AUTHOR_OR_LINEAGE_NAME_MATCH_IS_NOT_TARGET_BINDING',
  'LATER_MIRROR_IS_NOT_PRIOR_DEPENDENCY',
  'EXACT_TEXT_MATCH_REQUIRES_DATE_AND_SOURCE_IDENTITY_BINDING',
  'SOHU_ACCOUNT_NAME_IS_NOT_ORIGINAL_AUTHORSHIP',
  'ALTERNATE_2016_HIDDEN_STEM_LINEAGE_MAY_NOT_BACKFILL_TARGET_LINEAGE',
  'NAMED_LINEAGE_CANDIDATES_REQUIRE_EXACT_TARGET_PASSAGE_OR_EXPLICIT_ATTRIBUTION',
  'NO_NEGATIVE_OR_EXHAUSTION_FINDING_FROM_DISCOVERY_SILENCE',
  'NO_CANDIDATE_REGISTRATION_SELECTION_REBINDING_OR_SET_MUTATION',
  'NO_PROVENANCE_INDEPENDENCE_OR_DERIVATIVE_LINEAGE_ADJUDICATION',
  'I132_QU_WEI_LI_AND_V2_GUARDS_PRESERVED',
  'NO_THRESHOLD_DAMAGE_CLASSIFICATION_SCORING_OR_PRODUCTION_EXECUTION',
] as const);

export const I226_RARE_TARGET_PHRASES = Object.freeze([
  '也可论子中癸克巳中丙',
  '丑中己克亥中壬',
  '只有在巳动或酉动才能形成半合克动态',
  '如果克方被外力引动，并有力而动',
] as const);

export interface I226SourceKeHiddenStemInteractionEligibilityTargetExactTextPre2017OriginalSourceAuthorshipDiscoveryReadinessReviewReport {
  reviewId: string;
  reviewVersion: string;
  status:
    | 'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_EXACT_TEXT_PRE_2017_ORIGINAL_SOURCE_AUTHORSHIP_DISCOVERY_READINESS_REVIEW'
    | 'I225_RESIDUAL_GAP_BOUNDARY_INVALID';
  decision:
    | 'TARGET_SPECIFIC_PRE_2017_ORIGIN_DISCOVERY_CONTRACT_FROZEN_FIVE_PATHS_SEVENTEEN_CONTROLS_FOUR_RARE_PHRASES_NO_DISCOVERY_EXECUTED_NO_AUTHORSHIP_LINEAGE_OR_DERIVATIVE_ADJUDICATION_NO_PROMOTION'
    | 'TARGET_SPECIFIC_PRE_2017_ORIGIN_DISCOVERY_NOT_READY';
  upstreamI225ReviewId: string;
  policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy';
  policyVersion: 'v1-definition';
  adoptionVersion: 'v1-adoption';
  currentCandidateSetVersion: 'v1-candidate-set';
  currentInputPackageVersion: 'v2-input-package';
  exactI225BoundaryAccepted: boolean;
  targetSourceTerm: '克';
  targetScope: 'HIDDEN_STEM_EFFECTIVE_INTERACTION_ELIGIBILITY';
  targetCandidateId: 'LI_YANCHEN_GANZHI_NINE_RELATIONS_PART2_SOHU_2017_HTML' | null;
  targetPublicationDate: '2017-02-02' | null;
  sevenRequirementCoverageAcceptedAsUpstreamFinding: boolean;
  coverageReevaluationAuthorizedByThisGate: false;
  discoveryPathIds: readonly I226TargetExactTextDiscoveryPathId[];
  discoveryPathCount: 5 | 0;
  discoveryControlIds: readonly string[];
  discoveryControlCount: 17 | 0;
  discoveryControlsFrozen: boolean;
  rareTargetPhrases: readonly string[];
  rareTargetPhraseCount: 4 | 0;
  targetSpecificDiscoveryAuthorized: boolean;
  targetSpecificDiscoveryExecutedByThisGate: false;
  exactRarePhrasePre2017SearchRequired: boolean;
  sohuPart1ArchiveAttributionTraceRequired: boolean;
  pre2017BookOrCourseExactPassageMatchRequired: boolean;
  namedLineageExactPassageBindingRequired: boolean;
  dateVerifiedEarlyRepublicationTraceRequired: boolean;
  directlyOpenedOrSourceBoundContextRequiredForPositivePredecessorFinding: boolean;
  adjacentTheoryMayEstablishTargetPredecessor: false;
  authorNameMatchMayEstablishTargetLineage: false;
  laterMirrorMayEstablishPriorDependency: false;
  sohuAccountMayEstablishOriginalAuthorship: false;
  alternatePositiveLineageMayBackfillTargetLineage: false;
  searchSnippetMayEstablishPositivePredecessorFinding: false;
  discoverySilenceCreatesNegativeFinding: false;
  corpusExhaustionClaimed: false;
  exactTargetOriginalAuthorshipEstablishedByThisGate: false;
  exactTargetDoctrinalLineageEstablishedByThisGate: false;
  exactTargetPriorSourceDependencyEstablishedByThisGate: false;
  derivativeRelationshipAdjudicatedByThisGate: false;
  restrictiveDoctrineConflictAdjudicatedByThisGate: false;
  authorityGap: 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED' | 'UPSTREAM_INVALID';
  authorityGapClosed: false;
  authorityPromotedByThisGate: false;
  candidateRegisteredByThisGate: false;
  candidateSelectedByThisGate: false;
  doctrinalConflictPreserved: boolean;
  doctrinalConflictResolvedByThisGate: false;
  quWei2001HoldPreserved: boolean;
  li1998SameTargetPathSuspendedNotRetired: boolean;
  I132IndependentNormativeProvenanceRequirementRemainsNormative: boolean;
  I132PolicyRelaxationAuthorizedByThisGate: false;
  provenanceIndependenceAdjudicatedByThisGate: false;
  evidenceRebindingAuthorizedByThisGate: false;
  candidateSetMutatedByThisGate: false;
  candidateSetReevaluationAuthorizedByThisGate: false;
  currentV2PackageAndCandidateSetRemainImmutable: boolean;
  currentV2ProvenanceDisposition: 'BLOCKED_UNDER_CURRENT_EVIDENCE' | 'NOT_ASSESSED';
  actualCompositionPerformedByThisGate: false;
  multiSourceCompositionAuthorized: false;
  thresholdRuleCreatedByThisGate: false;
  damageEvaluationAuthorized: false;
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  productionPolicyExecutionAuthorized: false;
  recommendedNextGate:
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_EXACT_TEXT_PRE_2017_ORIGINAL_SOURCE_AUTHORSHIP_DISCOVERY_EVIDENCE'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_EXACT_TEXT_PRE_2017_ORIGINAL_SOURCE_AUTHORSHIP_DISCOVERY_READINESS_REVIEW';
  notes: readonly string[];
}

function exactI225Accepted(
  i225: I225SourceKeHiddenStemInteractionEligibilitySingleSourceAuthorityAdmissibilityAcquisitionEvidenceAdequacyResidualGapReassessmentReviewReport,
): boolean {
  return (
    i225.status ===
      'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_AUTHORITY_ADMISSIBILITY_ACQUISITION_EVIDENCE_ADEQUACY_RESIDUAL_GAP_REASSESSMENT_REVIEW' &&
    i225.decision ===
      'I224_EVIDENCE_ADEQUATE_FOR_LIMITED_FINDINGS_FOUR_ADMISSIBILITY_GAPS_REMAIN_TARGET_SPECIFIC_PRE_2017_ORIGINAL_SOURCE_AUTHORSHIP_LINEAGE_AND_DERIVATIVE_DISCOVERY_PRIORITIZED_RESTRICTIVE_CONFLICT_ADJUDICATION_DEFERRED_NO_PROMOTION' &&
    i225.exactI224BoundaryAccepted &&
    i225.targetCandidateId === 'LI_YANCHEN_GANZHI_NINE_RELATIONS_PART2_SOHU_2017_HTML' &&
    i225.sevenRequirementCoverageAcceptedAsUpstreamFinding &&
    i225.coverageReevaluationAuthorizedByThisGate === false &&
    i225.I224LimitedEvidenceFindingsAdequate &&
    i225.targetPublicationObjectIdentityFindingAccepted &&
    i225.sameAccountRepublicationCautionFindingAccepted &&
    i225.laterMirrorRedistributionLeadFindingAccepted &&
    i225.restrictiveDoctrineConflictFindingAccepted &&
    i225.targetRuleBearingContentObserved &&
    i225.targetRuleBearingContentObservationMayEstablishNormativeAuthority === false &&
    i225.exactTargetOriginalAuthorshipStillUnresolved &&
    i225.exactTargetDoctrinalLineageStillUnresolved &&
    i225.exactTargetPriorSourceDependencyStillUnresolved &&
    i225.restrictiveDoctrineSchoolBoundaryStillUnresolved &&
    i225.unresolvedAdmissibilityGapCount === 4 &&
    i225.residualDiscoveryPriorityCount === 4 &&
    i225.broadEquivalentSearchRepetitionJustified === false &&
    i225.targetSpecificPre2017OriginalSourceDiscoveryJustified &&
    i225.restrictiveConflictAdjudicationDeferredUntilTargetLineageEstablished &&
    i225.absenceOfPre2017WitnessCreatesNegativeFinding === false &&
    i225.corpusExhaustionClaimed === false &&
    i225.authorshipMayBeInferredFromSohuAccount === false &&
    i225.derivativeRelationshipMayBeInferredFromLaterMirrors === false &&
    i225.sourceNormativeAdmissibilityAdjudicatedByThisGate === false &&
    i225.authorityPromotionReadinessEstablishedByThisGate === false &&
    i225.authorityGap === 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED' &&
    i225.authorityGapClosed === false &&
    i225.authorityPromotedByThisGate === false &&
    i225.doctrinalConflictPreserved &&
    i225.doctrinalConflictResolvedByThisGate === false &&
    i225.I132IndependentNormativeProvenanceRequirementRemainsNormative &&
    i225.I132PolicyRelaxationAuthorizedByThisGate === false &&
    i225.provenanceIndependenceAdjudicatedByThisGate === false &&
    i225.derivativeLineageAdjudicatedByThisGate === false &&
    i225.evidenceRebindingAuthorizedByThisGate === false &&
    i225.candidateSetMutatedByThisGate === false &&
    i225.candidateSetReevaluationAuthorizedByThisGate === false &&
    i225.currentV2PackageAndCandidateSetRemainImmutable &&
    i225.currentV2ProvenanceDisposition === 'BLOCKED_UNDER_CURRENT_EVIDENCE' &&
    i225.actualCompositionPerformedByThisGate === false &&
    i225.multiSourceCompositionAuthorized === false &&
    i225.thresholdRuleCreatedByThisGate === false &&
    i225.damageEvaluationAuthorized === false &&
    i225.classificationAuthorized === false &&
    i225.numericScoringAuthorized === false &&
    i225.productionPolicyExecutionAuthorized === false &&
    i225.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_EXACT_TEXT_PRE_2017_ORIGINAL_SOURCE_AUTHORSHIP_DISCOVERY_READINESS_REVIEW'
  );
}

function finalized(
  material: Omit<I226SourceKeHiddenStemInteractionEligibilityTargetExactTextPre2017OriginalSourceAuthorshipDiscoveryReadinessReviewReport, 'reviewId'>,
): I226SourceKeHiddenStemInteractionEligibilityTargetExactTextPre2017OriginalSourceAuthorshipDiscoveryReadinessReviewReport {
  return {
    reviewId: `i226_hidden_stem_target_origin_discovery_readiness_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI226SourceKeHiddenStemInteractionEligibilityTargetExactTextPre2017OriginalSourceAuthorshipDiscoveryReadinessReview(
  i225: I225SourceKeHiddenStemInteractionEligibilitySingleSourceAuthorityAdmissibilityAcquisitionEvidenceAdequacyResidualGapReassessmentReviewReport,
): I226SourceKeHiddenStemInteractionEligibilityTargetExactTextPre2017OriginalSourceAuthorshipDiscoveryReadinessReviewReport {
  const accepted = exactI225Accepted(i225);
  return finalized({
    reviewVersion: I226_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_EXACT_TEXT_PRE_2017_ORIGINAL_SOURCE_AUTHORSHIP_DISCOVERY_READINESS_REVIEW_VERSION,
    status: accepted
      ? 'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_EXACT_TEXT_PRE_2017_ORIGINAL_SOURCE_AUTHORSHIP_DISCOVERY_READINESS_REVIEW'
      : 'I225_RESIDUAL_GAP_BOUNDARY_INVALID',
    decision: accepted
      ? 'TARGET_SPECIFIC_PRE_2017_ORIGIN_DISCOVERY_CONTRACT_FROZEN_FIVE_PATHS_SEVENTEEN_CONTROLS_FOUR_RARE_PHRASES_NO_DISCOVERY_EXECUTED_NO_AUTHORSHIP_LINEAGE_OR_DERIVATIVE_ADJUDICATION_NO_PROMOTION'
      : 'TARGET_SPECIFIC_PRE_2017_ORIGIN_DISCOVERY_NOT_READY',
    upstreamI225ReviewId: i225.reviewId,
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI225BoundaryAccepted: accepted,
    targetSourceTerm: '克',
    targetScope: 'HIDDEN_STEM_EFFECTIVE_INTERACTION_ELIGIBILITY',
    targetCandidateId: accepted ? 'LI_YANCHEN_GANZHI_NINE_RELATIONS_PART2_SOHU_2017_HTML' : null,
    targetPublicationDate: accepted ? '2017-02-02' : null,
    sevenRequirementCoverageAcceptedAsUpstreamFinding: accepted,
    coverageReevaluationAuthorizedByThisGate: false,
    discoveryPathIds: accepted ? I226_TARGET_EXACT_TEXT_DISCOVERY_PATH_IDS : [],
    discoveryPathCount: accepted ? 5 : 0,
    discoveryControlIds: accepted ? I226_TARGET_EXACT_TEXT_DISCOVERY_CONTROL_IDS : [],
    discoveryControlCount: accepted ? 17 : 0,
    discoveryControlsFrozen: accepted,
    rareTargetPhrases: accepted ? I226_RARE_TARGET_PHRASES : [],
    rareTargetPhraseCount: accepted ? 4 : 0,
    targetSpecificDiscoveryAuthorized: accepted,
    targetSpecificDiscoveryExecutedByThisGate: false,
    exactRarePhrasePre2017SearchRequired: accepted,
    sohuPart1ArchiveAttributionTraceRequired: accepted,
    pre2017BookOrCourseExactPassageMatchRequired: accepted,
    namedLineageExactPassageBindingRequired: accepted,
    dateVerifiedEarlyRepublicationTraceRequired: accepted,
    directlyOpenedOrSourceBoundContextRequiredForPositivePredecessorFinding: accepted,
    adjacentTheoryMayEstablishTargetPredecessor: false,
    authorNameMatchMayEstablishTargetLineage: false,
    laterMirrorMayEstablishPriorDependency: false,
    sohuAccountMayEstablishOriginalAuthorship: false,
    alternatePositiveLineageMayBackfillTargetLineage: false,
    searchSnippetMayEstablishPositivePredecessorFinding: false,
    discoverySilenceCreatesNegativeFinding: false,
    corpusExhaustionClaimed: false,
    exactTargetOriginalAuthorshipEstablishedByThisGate: false,
    exactTargetDoctrinalLineageEstablishedByThisGate: false,
    exactTargetPriorSourceDependencyEstablishedByThisGate: false,
    derivativeRelationshipAdjudicatedByThisGate: false,
    restrictiveDoctrineConflictAdjudicatedByThisGate: false,
    authorityGap: accepted
      ? 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED'
      : 'UPSTREAM_INVALID',
    authorityGapClosed: false,
    authorityPromotedByThisGate: false,
    candidateRegisteredByThisGate: false,
    candidateSelectedByThisGate: false,
    doctrinalConflictPreserved: accepted,
    doctrinalConflictResolvedByThisGate: false,
    quWei2001HoldPreserved: accepted,
    li1998SameTargetPathSuspendedNotRetired: accepted,
    I132IndependentNormativeProvenanceRequirementRemainsNormative: accepted,
    I132PolicyRelaxationAuthorizedByThisGate: false,
    provenanceIndependenceAdjudicatedByThisGate: false,
    evidenceRebindingAuthorizedByThisGate: false,
    candidateSetMutatedByThisGate: false,
    candidateSetReevaluationAuthorizedByThisGate: false,
    currentV2PackageAndCandidateSetRemainImmutable: accepted,
    currentV2ProvenanceDisposition: accepted ? 'BLOCKED_UNDER_CURRENT_EVIDENCE' : 'NOT_ASSESSED',
    actualCompositionPerformedByThisGate: false,
    multiSourceCompositionAuthorized: false,
    thresholdRuleCreatedByThisGate: false,
    damageEvaluationAuthorized: false,
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    productionPolicyExecutionAuthorized: false,
    recommendedNextGate: accepted
      ? 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_EXACT_TEXT_PRE_2017_ORIGINAL_SOURCE_AUTHORSHIP_DISCOVERY_EVIDENCE'
      : 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_EXACT_TEXT_PRE_2017_ORIGINAL_SOURCE_AUTHORSHIP_DISCOVERY_READINESS_REVIEW',
    notes: accepted
      ? [
          'I226 narrows the next research pass to target-specific source-origin evidence before the 2017-02-02 Sohu publication; broad hidden-stem theory search is not authorized.',
          'Four rare target phrases are frozen as high-specificity search anchors. Exact text similarity counts only when date, source identity, and directly opened or otherwise source-bound context are established.',
          'The 2016 法能/邱平策 hidden-stem methodology remains an alternate lineage lead only and may not backfill the Sohu target lineage or the I221 coverage matrix.',
          'No failure to locate a predecessor may become a negative, exhaustion, authorship, lineage, derivative, conflict-resolution, or promotion conclusion in this gate.',
        ]
      : ['I226 remains fail-closed unless the exact I225 residual-gap boundary and all repository guards are preserved.'],
  });
}
