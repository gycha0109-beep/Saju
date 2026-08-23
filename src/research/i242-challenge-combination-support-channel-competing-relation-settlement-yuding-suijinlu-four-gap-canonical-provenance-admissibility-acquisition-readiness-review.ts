import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  I241_REMAINING_ADMISSIBILITY_GAP_IDS,
  type I241ChallengeCombinationSupportChannelCompetingRelationSettlementThreeResidualTargetedDiscoveryEvidenceAdequacySourceRelationshipAdmissibilityReassessmentReviewReport,
} from './i241-challenge-combination-support-channel-competing-relation-settlement-three-residual-targeted-discovery-evidence-adequacy-source-relationship-admissibility-reassessment-review.js';

export const I242_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_COMPETING_RELATION_SETTLEMENT_YUDING_SUIJINLU_FOUR_GAP_CANONICAL_PROVENANCE_ADMISSIBILITY_ACQUISITION_READINESS_REVIEW_VERSION =
  'myeonghwa-challenge-combination-support-channel-competing-relation-settlement-yuding-suijinlu-four-gap-canonical-provenance-admissibility-acquisition-readiness-review-v1';

export const I242_ACQUISITION_PATH_IDS = Object.freeze([
  'YUDING_SUIJINLU_CANONICAL_CATALOG_IDENTITY_TRACE',
  'YUDING_SUIJINLU_EARLIEST_DATE_VERIFIED_WITNESS_AND_ATTRIBUTION_TRACE',
  'YUDING_SUIJINLU_EXACT_TARGET_PASSAGE_CANONICAL_OR_FACSIMILE_BINDING',
  'YUDING_SUIJINLU_PUBLIC_WITNESS_DERIVATIVE_CHAIN_TRACE',
  'YUDING_SUIJINLU_NORMATIVE_RULE_BEARING_CONTEXT_AND_LINEAGE_TRACE',
] as const);

export const I242_ACQUISITION_CONTROL_IDS = Object.freeze([
  'EXACT_I241_FOUR_GAP_BOUNDARY_REQUIRED',
  'THREE_RESIDUAL_DIRECT_COVERAGE_DEFICITS_MUST_REMAIN_RETIRED',
  'GENERAL_COMBINATION_CLASH_RULE_REDISCOVERY_MUST_NOT_COUNT_AS_PROGRESS',
  'CANONICAL_IDENTITY_REQUIRES_SOURCE_IDENTITY_BIBLIOGRAPHIC_OR_CUSTODIAN_BINDING',
  'TITLE_SIMILARITY_OR_REPOST_LABEL_MUST_NOT_ESTABLISH_CANONICAL_IDENTITY',
  'EARLIEST_WITNESS_TRACE_REQUIRES_DATE_VERIFIED_SOURCE_BOUND_CONTEXT',
  'EMBEDDED_2011_TIMESTAMP_AND_SHANGCI_ATTRIBUTION_REMAIN_OBSERVATION_ONLY',
  'CANONICAL_PASSAGE_PROGRESS_REQUIRES_EXACT_TARGET_RULE_TEXT_AND_SOURCE_IDENTITY',
  'SEARCH_SNIPPET_OR_INDEX_ONLY_TEXT_MUST_NOT_ESTABLISH_EXACT_PASSAGE_BINDING',
  'DERIVATIVE_CHAIN_REQUIRES_EXPLICIT_SOURCE_RELATIONSHIP_OR_REPRODUCIBLE_TEXTUAL_DEPENDENCY_EVIDENCE',
  'CHRONOLOGY_ALONE_MUST_NOT_ESTABLISH_DERIVATION_OR_INDEPENDENCE',
  'SAME_TEXT_YUDING_WITNESSES_MUST_NOT_BE_COUNTED_AS_INDEPENDENT_AUTHORITIES',
  'NORMATIVE_ADMISSIBILITY_REQUIRES_RULE_BEARING_CONTEXT_AND_LINEAGE_OR_EDITORIAL_STATUS',
  'SOURCE_TITLE_OR_REPUTATION_ALONE_MUST_NOT_ESTABLISH_NORMATIVE_ADMISSIBILITY',
  'NO_AUTHORITY_PROMOTION_OR_SETTLEMENT_RESOLUTION_BY_READINESS',
  'NO_REBINDING_PROVENANCE_INDEPENDENCE_OR_DERIVATIVE_ADJUDICATION_BY_READINESS',
  'I132_I232_QU_WEI_LI1998_V2_GUARDS_MUST_REMAIN_UNCHANGED',
  'NO_COMPOSITION_THRESHOLD_DAMAGE_CLASSIFICATION_SCORING_OR_PRODUCTION_AUTHORITY',
] as const);

export interface I242ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluFourGapCanonicalProvenanceAdmissibilityAcquisitionReadinessReviewReport {
  reviewId: string;
  reviewVersion: string;
  status:
    | 'RESOLVED_COMPETING_RELATION_SETTLEMENT_YUDING_SUIJINLU_FOUR_GAP_CANONICAL_PROVENANCE_ADMISSIBILITY_ACQUISITION_READINESS_REVIEW'
    | 'I241_SOURCE_ADMISSIBILITY_BOUNDARY_INVALID';
  decision:
    | 'FOUR_SOURCE_ADMISSIBILITY_GAPS_FIVE_TARGETED_ACQUISITION_PATHS_EIGHTEEN_CONTROLS_FROZEN_CANONICAL_IDENTITY_EXACT_PASSAGE_DERIVATIVE_RELATIONSHIP_AND_RULE_BEARING_STATUS_ONLY_NO_ACQUISITION_EXECUTED_NO_AUTHORITY_PROMOTION'
    | 'YUDING_SUIJINLU_CANONICAL_PROVENANCE_ADMISSIBILITY_ACQUISITION_NOT_READY';
  upstreamI241ReviewId: string;
  exactI241BoundaryAccepted: boolean;
  targetScope: 'MULTIPLE_TRACKED_RELATION_TOUCHES_COMPETING_RELATION_SETTLEMENT';
  remainingAdmissibilityGapIds: readonly string[];
  remainingAdmissibilityGapCount: 4 | 0;
  acquisitionPathIds: readonly string[];
  acquisitionPathCount: 5 | 0;
  acquisitionControlIds: readonly string[];
  acquisitionControlCount: 18 | 0;
  acquisitionContractFrozen: boolean;
  targetedAcquisitionAuthorized: boolean;
  acquisitionExecutedByThisGate: false;
  generalRuleRediscoveryMayCountAsProgress: false;
  canonicalIdentityRequiresBibliographicOrCustodianBinding: boolean;
  titleSimilarityMayEstablishCanonicalIdentity: false;
  earliestWitnessRequiresDateVerifiedSourceBoundContext: boolean;
  embedded2011AttributionMayEstablishCanonicalIdentity: false;
  canonicalExactPassageRequiresExactRuleTextAndSourceIdentity: boolean;
  searchSnippetMayEstablishExactPassageBinding: false;
  derivativeRelationshipRequiresExplicitOrReproducibleDependencyEvidence: boolean;
  chronologyAloneMayEstablishDerivativeRelationship: false;
  chronologyAloneMayEstablishProvenanceIndependence: false;
  sameTextYudingWitnessesMayCountAsIndependentAuthorities: false;
  normativeAdmissibilityRequiresRuleBearingContextAndLineageOrEditorialStatus: boolean;
  sourceTitleOrReputationMayEstablishNormativeAdmissibility: false;
  authorityGap: 'COMPETING_RELATION_SETTLEMENT_AUTHORITY_NOT_ESTABLISHED' | 'UPSTREAM_INVALID';
  authorityGapClosed: false;
  authorityPromotedByThisGate: false;
  competingRelationSettlementResolved: false;
  crossRelationPrecedenceAuthorized: false;
  multiTouchAggregationAuthorized: false;
  hiddenStemI232HoldPreserved: boolean;
  hiddenStemTrackReopenedByThisGate: false;
  hiddenStemAuthorityGap: 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED';
  quWei2001HoldPreserved: boolean;
  li1998SameTargetPathSuspendedNotRetired: boolean;
  I132IndependentNormativeProvenanceRequirementRemainsNormative: boolean;
  I132PolicyRelaxationAuthorizedByThisGate: false;
  currentV2PackageAndCandidateSetRemainImmutable: boolean;
  currentV2ProvenanceDisposition: 'BLOCKED_UNDER_CURRENT_EVIDENCE' | 'NOT_ASSESSED';
  candidateRegisteredByThisGate: false;
  candidateSelectedByThisGate: false;
  candidateSetMutatedByThisGate: false;
  evidenceRebindingAuthorizedByThisGate: false;
  provenanceIndependenceAdjudicatedByThisGate: false;
  derivativeRelationshipAdjudicatedByThisGate: false;
  actualCompositionPerformedByThisGate: false;
  multiSourceCompositionAuthorized: false;
  thresholdRuleCreatedByThisGate: false;
  damageEvaluationAuthorized: false;
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  productionPolicyExecutionAuthorized: false;
  negativeFindingCreatedByThisGate: false;
  discoveryExhaustionClaimed: false;
  corpusExhaustionClaimed: false;
  recommendedNextGate:
    | 'COMPETING_RELATION_SETTLEMENT_YUDING_SUIJINLU_FOUR_GAP_CANONICAL_PROVENANCE_ADMISSIBILITY_ACQUISITION_EVIDENCE'
    | 'COMPETING_RELATION_SETTLEMENT_YUDING_SUIJINLU_FOUR_GAP_CANONICAL_PROVENANCE_ADMISSIBILITY_ACQUISITION_READINESS_REVIEW';
  notes: readonly string[];
}

function exactI241Accepted(
  i241: I241ChallengeCombinationSupportChannelCompetingRelationSettlementThreeResidualTargetedDiscoveryEvidenceAdequacySourceRelationshipAdmissibilityReassessmentReviewReport,
): boolean {
  return (
    i241.status === 'RESOLVED_COMPETING_RELATION_SETTLEMENT_THREE_RESIDUAL_TARGETED_DISCOVERY_EVIDENCE_ADEQUACY_SOURCE_RELATIONSHIP_ADMISSIBILITY_REASSESSMENT_REVIEW' &&
    i241.decision === 'I240_EVIDENCE_ADEQUATE_FOR_THREE_RESIDUAL_DIRECT_COVERAGE_FOUR_SOURCE_ADMISSIBILITY_GAPS_REMAIN_CANONICAL_IDENTITY_EXACT_PASSAGE_DERIVATIVE_RELATIONSHIP_AND_RULE_BEARING_STATUS_TARGETED_ACQUISITION_JUSTIFIED_NO_AUTHORITY_PROMOTION' &&
    i241.exactI240BoundaryAccepted &&
    i241.i240EvidenceAdequateForResidualDirectCoverage &&
    i241.residualDirectCoverageRequirementCount === 3 &&
    i241.residualDirectCoverageGapCountAfterI240 === 0 &&
    i241.remainingAdmissibilityGapCount === 4 &&
    i241.remainingAdmissibilityGapIds.length === I241_REMAINING_ADMISSIBILITY_GAP_IDS.length &&
    i241.remainingAdmissibilityGapIds.every((id, index) => id === I241_REMAINING_ADMISSIBILITY_GAP_IDS[index]) &&
    i241.targetedCanonicalAndProvenanceAcquisitionMethodologicallyJustified &&
    i241.equivalentGeneralRuleDiscoveryRepeatJustified === false &&
    i241.alreadyDirectResidualRuleRediscoveryRequired === false &&
    i241.sourceRelationshipAndAdmissibilityAcquisitionAuthorized &&
    i241.acquisitionExecutedByThisGate === false &&
    i241.authorityGap === 'COMPETING_RELATION_SETTLEMENT_AUTHORITY_NOT_ESTABLISHED' &&
    i241.authorityGapClosed === false &&
    i241.authorityPromotedByThisGate === false &&
    i241.competingRelationSettlementResolved === false &&
    i241.hiddenStemI232HoldPreserved &&
    i241.hiddenStemTrackReopenedByThisGate === false &&
    i241.quWei2001HoldPreserved &&
    i241.li1998SameTargetPathSuspendedNotRetired &&
    i241.I132IndependentNormativeProvenanceRequirementRemainsNormative &&
    i241.I132PolicyRelaxationAuthorizedByThisGate === false &&
    i241.currentV2PackageAndCandidateSetRemainImmutable &&
    i241.currentV2ProvenanceDisposition === 'BLOCKED_UNDER_CURRENT_EVIDENCE' &&
    i241.evidenceRebindingAuthorizedByThisGate === false &&
    i241.provenanceIndependenceAdjudicatedByThisGate === false &&
    i241.derivativeRelationshipAdjudicatedByThisGate === false &&
    i241.actualCompositionPerformedByThisGate === false &&
    i241.multiSourceCompositionAuthorized === false &&
    i241.thresholdRuleCreatedByThisGate === false &&
    i241.damageEvaluationAuthorized === false &&
    i241.classificationAuthorized === false &&
    i241.numericScoringAuthorized === false &&
    i241.productionPolicyExecutionAuthorized === false &&
    i241.negativeFindingCreatedByThisGate === false &&
    i241.discoveryExhaustionClaimed === false &&
    i241.corpusExhaustionClaimed === false &&
    i241.recommendedNextGate === 'COMPETING_RELATION_SETTLEMENT_YUDING_SUIJINLU_FOUR_GAP_CANONICAL_PROVENANCE_ADMISSIBILITY_ACQUISITION_READINESS_REVIEW'
  );
}

function finalized(
  material: Omit<I242ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluFourGapCanonicalProvenanceAdmissibilityAcquisitionReadinessReviewReport, 'reviewId'>,
): I242ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluFourGapCanonicalProvenanceAdmissibilityAcquisitionReadinessReviewReport {
  return {
    reviewId: `i242_yuding_suijinlu_acquisition_readiness_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI242ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluFourGapCanonicalProvenanceAdmissibilityAcquisitionReadinessReview(
  i241: I241ChallengeCombinationSupportChannelCompetingRelationSettlementThreeResidualTargetedDiscoveryEvidenceAdequacySourceRelationshipAdmissibilityReassessmentReviewReport,
): I242ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluFourGapCanonicalProvenanceAdmissibilityAcquisitionReadinessReviewReport {
  const accepted = exactI241Accepted(i241);
  return finalized({
    reviewVersion: I242_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_COMPETING_RELATION_SETTLEMENT_YUDING_SUIJINLU_FOUR_GAP_CANONICAL_PROVENANCE_ADMISSIBILITY_ACQUISITION_READINESS_REVIEW_VERSION,
    status: accepted ? 'RESOLVED_COMPETING_RELATION_SETTLEMENT_YUDING_SUIJINLU_FOUR_GAP_CANONICAL_PROVENANCE_ADMISSIBILITY_ACQUISITION_READINESS_REVIEW' : 'I241_SOURCE_ADMISSIBILITY_BOUNDARY_INVALID',
    decision: accepted ? 'FOUR_SOURCE_ADMISSIBILITY_GAPS_FIVE_TARGETED_ACQUISITION_PATHS_EIGHTEEN_CONTROLS_FROZEN_CANONICAL_IDENTITY_EXACT_PASSAGE_DERIVATIVE_RELATIONSHIP_AND_RULE_BEARING_STATUS_ONLY_NO_ACQUISITION_EXECUTED_NO_AUTHORITY_PROMOTION' : 'YUDING_SUIJINLU_CANONICAL_PROVENANCE_ADMISSIBILITY_ACQUISITION_NOT_READY',
    upstreamI241ReviewId: i241.reviewId,
    exactI241BoundaryAccepted: accepted,
    targetScope: 'MULTIPLE_TRACKED_RELATION_TOUCHES_COMPETING_RELATION_SETTLEMENT',
    remainingAdmissibilityGapIds: accepted ? I241_REMAINING_ADMISSIBILITY_GAP_IDS : Object.freeze([]),
    remainingAdmissibilityGapCount: accepted ? 4 : 0,
    acquisitionPathIds: accepted ? I242_ACQUISITION_PATH_IDS : Object.freeze([]),
    acquisitionPathCount: accepted ? 5 : 0,
    acquisitionControlIds: accepted ? I242_ACQUISITION_CONTROL_IDS : Object.freeze([]),
    acquisitionControlCount: accepted ? 18 : 0,
    acquisitionContractFrozen: accepted,
    targetedAcquisitionAuthorized: accepted,
    acquisitionExecutedByThisGate: false,
    generalRuleRediscoveryMayCountAsProgress: false,
    canonicalIdentityRequiresBibliographicOrCustodianBinding: accepted,
    titleSimilarityMayEstablishCanonicalIdentity: false,
    earliestWitnessRequiresDateVerifiedSourceBoundContext: accepted,
    embedded2011AttributionMayEstablishCanonicalIdentity: false,
    canonicalExactPassageRequiresExactRuleTextAndSourceIdentity: accepted,
    searchSnippetMayEstablishExactPassageBinding: false,
    derivativeRelationshipRequiresExplicitOrReproducibleDependencyEvidence: accepted,
    chronologyAloneMayEstablishDerivativeRelationship: false,
    chronologyAloneMayEstablishProvenanceIndependence: false,
    sameTextYudingWitnessesMayCountAsIndependentAuthorities: false,
    normativeAdmissibilityRequiresRuleBearingContextAndLineageOrEditorialStatus: accepted,
    sourceTitleOrReputationMayEstablishNormativeAdmissibility: false,
    authorityGap: accepted ? 'COMPETING_RELATION_SETTLEMENT_AUTHORITY_NOT_ESTABLISHED' : 'UPSTREAM_INVALID',
    authorityGapClosed: false,
    authorityPromotedByThisGate: false,
    competingRelationSettlementResolved: false,
    crossRelationPrecedenceAuthorized: false,
    multiTouchAggregationAuthorized: false,
    hiddenStemI232HoldPreserved: accepted,
    hiddenStemTrackReopenedByThisGate: false,
    hiddenStemAuthorityGap: 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED',
    quWei2001HoldPreserved: accepted,
    li1998SameTargetPathSuspendedNotRetired: accepted,
    I132IndependentNormativeProvenanceRequirementRemainsNormative: accepted,
    I132PolicyRelaxationAuthorizedByThisGate: false,
    currentV2PackageAndCandidateSetRemainImmutable: accepted,
    currentV2ProvenanceDisposition: accepted ? 'BLOCKED_UNDER_CURRENT_EVIDENCE' : 'NOT_ASSESSED',
    candidateRegisteredByThisGate: false,
    candidateSelectedByThisGate: false,
    candidateSetMutatedByThisGate: false,
    evidenceRebindingAuthorizedByThisGate: false,
    provenanceIndependenceAdjudicatedByThisGate: false,
    derivativeRelationshipAdjudicatedByThisGate: false,
    actualCompositionPerformedByThisGate: false,
    multiSourceCompositionAuthorized: false,
    thresholdRuleCreatedByThisGate: false,
    damageEvaluationAuthorized: false,
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    productionPolicyExecutionAuthorized: false,
    negativeFindingCreatedByThisGate: false,
    discoveryExhaustionClaimed: false,
    corpusExhaustionClaimed: false,
    recommendedNextGate: accepted ? 'COMPETING_RELATION_SETTLEMENT_YUDING_SUIJINLU_FOUR_GAP_CANONICAL_PROVENANCE_ADMISSIBILITY_ACQUISITION_EVIDENCE' : 'COMPETING_RELATION_SETTLEMENT_YUDING_SUIJINLU_FOUR_GAP_CANONICAL_PROVENANCE_ADMISSIBILITY_ACQUISITION_READINESS_REVIEW',
    notes: accepted
      ? Object.freeze([
          'I242 freezes acquisition work to the four I241 source-admissibility gaps and forbids reopening already-satisfied residual direct-coverage discovery.',
          'Canonical identity requires bibliographic, archival, author-controlled, or custodian-bound identity evidence; title similarity and repost labels are insufficient.',
          'Exact passage binding requires the exact target rule text plus source identity in one reproducible witness context.',
          'Derivative relationship and provenance independence cannot be inferred from chronology alone, and same-text public witnesses remain non-independent pending evidence.',
          'Normative admissibility requires rule-bearing context plus lineage/editorial status; source title or reputation alone is insufficient.',
        ])
      : Object.freeze(['I242 fails closed unless the exact I241 source-admissibility boundary is preserved.']),
  });
}
