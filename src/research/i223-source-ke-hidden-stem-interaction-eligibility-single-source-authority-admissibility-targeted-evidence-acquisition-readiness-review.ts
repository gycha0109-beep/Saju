import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  I222_UNRESOLVED_AUTHORITY_ADMISSIBILITY_GAP_IDS,
  type I222UnresolvedAuthorityAdmissibilityGapId,
  type I222SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementCoverageAdequacyAuthorityAdmissibilityPromotionReadinessReviewReport,
} from './i222-source-ke-hidden-stem-interaction-eligibility-single-source-seven-requirement-coverage-adequacy-authority-admissibility-promotion-readiness-review.js';

export const I223_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_AUTHORITY_ADMISSIBILITY_TARGETED_EVIDENCE_ACQUISITION_READINESS_REVIEW_VERSION =
  'myeonghwa-source-ke-hidden-stem-interaction-eligibility-single-source-authority-admissibility-targeted-evidence-acquisition-readiness-review-v1';

export const I223_TARGETED_ADMISSIBILITY_ACQUISITION_PATH_IDS = Object.freeze([
  'DIRECT_PUBLICATION_BYLINE_AND_ACCOUNT_IDENTITY_CONTEXT_CAPTURE',
  'EXACT_TEXT_PRIOR_PUBLICATION_AND_ORIGINALITY_TRACE',
  'AUTHOR_OR_DOCTRINAL_LINEAGE_IDENTITY_DISCOVERY',
  'DERIVATIVE_SOURCE_DEPENDENCY_COMPARISON',
  'RESTRICTIVE_DOCTRINE_SCHOOL_BOUNDARY_EVIDENCE_ACQUISITION',
] as const);
export type I223TargetedAdmissibilityAcquisitionPathId =
  (typeof I223_TARGETED_ADMISSIBILITY_ACQUISITION_PATH_IDS)[number];

export const I223_TARGETED_ADMISSIBILITY_ACQUISITION_CONTROL_IDS = Object.freeze([
  'EXACT_I222_FOUR_GAP_BOUNDARY_REQUIRED',
  'COVERAGE_SEVEN_OF_SEVEN_NOT_REEVALUATED',
  'DIRECT_PUBLICATION_CONTEXT_CAPTURE_NOT_AUTHORITY_PROMOTION',
  'SEARCH_SNIPPET_MAY_BE_LEAD_ONLY',
  'DIRECTLY_OPENED_CONTEXT_REQUIRED_FOR_POSITIVE_FINDING',
  'PRIOR_TEXT_SIMILARITY_NOT_AUTOMATIC_DERIVATIVE_ADJUDICATION',
  'AUTHOR_NAME_MATCH_NOT_AUTOMATIC_LINEAGE_ADJUDICATION',
  'PLATFORM_BYLINE_NOT_AUTOMATIC_ORIGINAL_AUTHORSHIP',
  'NORMATIVE_STATUS_REQUIRES_RULE_BEARING_SOURCE_CONTEXT',
  'RESTRICTIVE_CONFLICT_REQUIRES_SCHOOL_BOUNDARY_EVIDENCE',
  'NO_CROSS_CANDIDATE_COVERAGE_COMPOSITION',
  'NO_CANDIDATE_REGISTRATION_SELECTION_OR_REBINDING',
  'NO_PROVENANCE_INDEPENDENCE_OR_DERIVATIVE_LINEAGE_ADJUDICATION',
  'I132_QU_WEI_LI_AND_V2_GUARDS_PRESERVED',
  'NO_THRESHOLD_DAMAGE_CLASSIFICATION_OR_SCORING',
  'NO_PRODUCTION_POLICY_OR_INTERPRETATION',
] as const);

export interface I223SourceKeHiddenStemInteractionEligibilitySingleSourceAuthorityAdmissibilityTargetedEvidenceAcquisitionReadinessReviewReport {
  reviewId: string;
  reviewVersion: string;
  status:
    | 'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_AUTHORITY_ADMISSIBILITY_TARGETED_EVIDENCE_ACQUISITION_READINESS_REVIEW'
    | 'I222_AUTHORITY_ADMISSIBILITY_READINESS_BOUNDARY_INVALID';
  decision:
    | 'FOUR_ADMISSIBILITY_GAPS_FIVE_TARGETED_ACQUISITION_PATHS_SIXTEEN_CONTROLS_FROZEN_NO_ACQUISITION_EXECUTED_NO_ADMISSIBILITY_ADJUDICATED_NO_PROMOTION'
    | 'HIDDEN_STEM_AUTHORITY_ADMISSIBILITY_TARGETED_ACQUISITION_NOT_READY';
  upstreamI222ReviewId: string;
  policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy';
  policyVersion: 'v1-definition';
  adoptionVersion: 'v1-adoption';
  currentCandidateSetVersion: 'v1-candidate-set';
  currentInputPackageVersion: 'v2-input-package';
  exactI222BoundaryAccepted: boolean;
  targetSourceTerm: '克';
  targetScope: 'HIDDEN_STEM_EFFECTIVE_INTERACTION_ELIGIBILITY';
  targetCandidateId:
    | 'LI_YANCHEN_GANZHI_NINE_RELATIONS_PART2_SOHU_2017_HTML'
    | null;
  sevenRequirementCoverageAcceptedAsUpstreamFinding: boolean;
  coverageReevaluationAuthorizedByThisGate: false;
  unresolvedAdmissibilityGapIds: readonly I222UnresolvedAuthorityAdmissibilityGapId[];
  unresolvedAdmissibilityGapCount: 4 | 0;
  acquisitionPathIds: readonly I223TargetedAdmissibilityAcquisitionPathId[];
  acquisitionPathCount: 5 | 0;
  acquisitionControlIds: readonly string[];
  acquisitionControlCount: 16 | 0;
  acquisitionControlsFrozen: boolean;
  targetedAcquisitionAuthorized: boolean;
  targetedAcquisitionExecutedByThisGate: false;
  directPublicationContextCaptureRequired: boolean;
  exactTextPriorPublicationTraceRequired: boolean;
  authorOrDoctrinalLineageDiscoveryRequired: boolean;
  derivativeSourceDependencyComparisonRequired: boolean;
  restrictiveDoctrineSchoolBoundaryEvidenceRequired: boolean;
  searchSnippetMayCreatePositiveAdmissibilityFinding: false;
  platformBylineMayAutoEstablishOriginalAuthorship: false;
  authorNameMatchMayAutoEstablishDoctrinalLineage: false;
  textualSimilarityMayAutoEstablishDerivativeRelationship: false;
  schoolConflictMayBeSilentlyResolved: false;
  sourceNormativeAdmissibilityAdjudicatedByThisGate: false;
  authorityPromotionReadinessEstablishedByThisGate: false;
  authorityGap:
    | 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED'
    | 'UPSTREAM_INVALID';
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
  derivativeLineageAdjudicatedByThisGate: false;
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
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_AUTHORITY_ADMISSIBILITY_TARGETED_EVIDENCE_ACQUISITION_EVIDENCE'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_AUTHORITY_ADMISSIBILITY_TARGETED_EVIDENCE_ACQUISITION_READINESS_REVIEW';
  notes: readonly string[];
}

function exactI222Accepted(
  i222: I222SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementCoverageAdequacyAuthorityAdmissibilityPromotionReadinessReviewReport,
): boolean {
  return (
    i222.status ===
      'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_SEVEN_REQUIREMENT_COVERAGE_ADEQUACY_AUTHORITY_ADMISSIBILITY_PROMOTION_READINESS_REVIEW' &&
    i222.decision ===
      'SEVEN_OF_SEVEN_COVERAGE_ACCEPTED_AUTHORITY_ADMISSIBILITY_PROMOTION_NOT_READY_FOUR_UNRESOLVED_ADMISSIBILITY_GAPS_TARGETED_EVIDENCE_ACQUISITION_JUSTIFIED_NO_PROMOTION_NO_GAP_CLOSURE' &&
    i222.exactI221BoundaryAccepted &&
    i222.evaluatedCandidateId === 'LI_YANCHEN_GANZHI_NINE_RELATIONS_PART2_SOHU_2017_HTML' &&
    i222.sevenRequirementCoverageAdequate &&
    i222.directCoverageCount === 7 &&
    i222.publicationObjectIdentityAndDirectContextEstablished &&
    i222.publicationObjectIdentityAloneMayEstablishNormativeAuthority === false &&
    i222.exactDoctrinalAuthorshipOrLineageEstablished === false &&
    i222.normativeRuleBearingStatusAndOriginalityEstablished === false &&
    i222.derivativeRelationshipAndPriorSourceDependencyEstablished === false &&
    i222.restrictiveDoctrinalConflictHandlingEstablished === false &&
    i222.sourceNormativeAdmissibilityEstablished === false &&
    i222.authorityPromotionReadinessEstablished === false &&
    i222.unresolvedAdmissibilityGapCount === 4 &&
    i222.unresolvedAdmissibilityGapIds.length === 4 &&
    i222.unresolvedAdmissibilityGapIds.every(
      (gapId, index) => gapId === I222_UNRESOLVED_AUTHORITY_ADMISSIBILITY_GAP_IDS[index],
    ) &&
    i222.targetedAdmissibilityEvidenceAcquisitionJustified &&
    i222.targetedAdmissibilityEvidenceAcquisitionExecutedByThisGate === false &&
    i222.authorityGap === 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED' &&
    i222.authorityGapClosed === false &&
    i222.authorityPromotedByThisGate === false &&
    i222.doctrinalConflictPreserved &&
    i222.doctrinalConflictResolvedByThisGate === false &&
    i222.I132IndependentNormativeProvenanceRequirementRemainsNormative &&
    i222.I132PolicyRelaxationAuthorizedByThisGate === false &&
    i222.provenanceIndependenceAdjudicatedByThisGate === false &&
    i222.evidenceRebindingAuthorizedByThisGate === false &&
    i222.currentV2PackageAndCandidateSetRemainImmutable &&
    i222.currentV2ProvenanceDisposition === 'BLOCKED_UNDER_CURRENT_EVIDENCE' &&
    i222.actualCompositionPerformedByThisGate === false &&
    i222.multiSourceCompositionAuthorized === false &&
    i222.thresholdRuleCreatedByThisGate === false &&
    i222.damageEvaluationAuthorized === false &&
    i222.classificationAuthorized === false &&
    i222.numericScoringAuthorized === false &&
    i222.productionPolicyExecutionAuthorized === false &&
    i222.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_AUTHORITY_ADMISSIBILITY_TARGETED_EVIDENCE_ACQUISITION_READINESS_REVIEW'
  );
}

function finalized(
  material: Omit<I223SourceKeHiddenStemInteractionEligibilitySingleSourceAuthorityAdmissibilityTargetedEvidenceAcquisitionReadinessReviewReport, 'reviewId'>,
): I223SourceKeHiddenStemInteractionEligibilitySingleSourceAuthorityAdmissibilityTargetedEvidenceAcquisitionReadinessReviewReport {
  return {
    reviewId: `i223_hidden_stem_admissibility_acquisition_readiness_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI223SourceKeHiddenStemInteractionEligibilitySingleSourceAuthorityAdmissibilityTargetedEvidenceAcquisitionReadinessReview(
  i222: I222SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementCoverageAdequacyAuthorityAdmissibilityPromotionReadinessReviewReport,
): I223SourceKeHiddenStemInteractionEligibilitySingleSourceAuthorityAdmissibilityTargetedEvidenceAcquisitionReadinessReviewReport {
  const accepted = exactI222Accepted(i222);

  return finalized({
    reviewVersion:
      I223_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_AUTHORITY_ADMISSIBILITY_TARGETED_EVIDENCE_ACQUISITION_READINESS_REVIEW_VERSION,
    status: accepted
      ? 'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_AUTHORITY_ADMISSIBILITY_TARGETED_EVIDENCE_ACQUISITION_READINESS_REVIEW'
      : 'I222_AUTHORITY_ADMISSIBILITY_READINESS_BOUNDARY_INVALID',
    decision: accepted
      ? 'FOUR_ADMISSIBILITY_GAPS_FIVE_TARGETED_ACQUISITION_PATHS_SIXTEEN_CONTROLS_FROZEN_NO_ACQUISITION_EXECUTED_NO_ADMISSIBILITY_ADJUDICATED_NO_PROMOTION'
      : 'HIDDEN_STEM_AUTHORITY_ADMISSIBILITY_TARGETED_ACQUISITION_NOT_READY',
    upstreamI222ReviewId: i222.reviewId,
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI222BoundaryAccepted: accepted,
    targetSourceTerm: '克',
    targetScope: 'HIDDEN_STEM_EFFECTIVE_INTERACTION_ELIGIBILITY',
    targetCandidateId: accepted ? 'LI_YANCHEN_GANZHI_NINE_RELATIONS_PART2_SOHU_2017_HTML' : null,
    sevenRequirementCoverageAcceptedAsUpstreamFinding: accepted,
    coverageReevaluationAuthorizedByThisGate: false,
    unresolvedAdmissibilityGapIds: accepted ? I222_UNRESOLVED_AUTHORITY_ADMISSIBILITY_GAP_IDS : [],
    unresolvedAdmissibilityGapCount: accepted ? 4 : 0,
    acquisitionPathIds: accepted ? I223_TARGETED_ADMISSIBILITY_ACQUISITION_PATH_IDS : [],
    acquisitionPathCount: accepted ? 5 : 0,
    acquisitionControlIds: accepted ? I223_TARGETED_ADMISSIBILITY_ACQUISITION_CONTROL_IDS : [],
    acquisitionControlCount: accepted ? 16 : 0,
    acquisitionControlsFrozen: accepted,
    targetedAcquisitionAuthorized: accepted,
    targetedAcquisitionExecutedByThisGate: false,
    directPublicationContextCaptureRequired: accepted,
    exactTextPriorPublicationTraceRequired: accepted,
    authorOrDoctrinalLineageDiscoveryRequired: accepted,
    derivativeSourceDependencyComparisonRequired: accepted,
    restrictiveDoctrineSchoolBoundaryEvidenceRequired: accepted,
    searchSnippetMayCreatePositiveAdmissibilityFinding: false,
    platformBylineMayAutoEstablishOriginalAuthorship: false,
    authorNameMatchMayAutoEstablishDoctrinalLineage: false,
    textualSimilarityMayAutoEstablishDerivativeRelationship: false,
    schoolConflictMayBeSilentlyResolved: false,
    sourceNormativeAdmissibilityAdjudicatedByThisGate: false,
    authorityPromotionReadinessEstablishedByThisGate: false,
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
    derivativeLineageAdjudicatedByThisGate: false,
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
      ? 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_AUTHORITY_ADMISSIBILITY_TARGETED_EVIDENCE_ACQUISITION_EVIDENCE'
      : 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_AUTHORITY_ADMISSIBILITY_TARGETED_EVIDENCE_ACQUISITION_READINESS_REVIEW',
    notes: accepted
      ? [
          'I223 freezes five targeted acquisition paths against the four unresolved I222 admissibility gaps without reopening the I221 seven-of-seven coverage finding.',
          'Search snippets and platform metadata may produce leads but cannot themselves establish authorship, lineage, originality, derivative status, conflict handling, or normative admissibility.',
          'The next gate may gather evidence only; it may not register/select the candidate, rebind evidence, resolve provenance independence, create thresholds, or authorize production interpretation.',
        ]
      : [
          'I223 remains fail-closed unless the exact I222 four-gap admissibility-readiness boundary is preserved.',
        ],
  });
}
