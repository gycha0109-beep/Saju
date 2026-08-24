import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { I221SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementCandidateCoverageEvaluationEvidenceReport } from './i221-source-ke-hidden-stem-interaction-eligibility-single-source-seven-requirement-candidate-coverage-evaluation-evidence.js';

export const I222_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_SEVEN_REQUIREMENT_COVERAGE_ADEQUACY_AUTHORITY_ADMISSIBILITY_PROMOTION_READINESS_REVIEW_VERSION =
  'myeonghwa-source-ke-hidden-stem-interaction-eligibility-single-source-seven-requirement-coverage-adequacy-authority-admissibility-promotion-readiness-review-v1';

export const I222_UNRESOLVED_AUTHORITY_ADMISSIBILITY_GAP_IDS = Object.freeze([
  'DOCTRINAL_AUTHORSHIP_OR_LINEAGE_ATTRIBUTION_GAP',
  'NORMATIVE_RULE_BEARING_STATUS_AND_ORIGINALITY_GAP',
  'DERIVATIVE_RELATIONSHIP_AND_PRIOR_SOURCE_DEPENDENCY_GAP',
  'RESTRICTIVE_DOCTRINAL_CONFLICT_HANDLING_GAP',
] as const);

export type I222UnresolvedAuthorityAdmissibilityGapId =
  (typeof I222_UNRESOLVED_AUTHORITY_ADMISSIBILITY_GAP_IDS)[number];

export interface I222SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementCoverageAdequacyAuthorityAdmissibilityPromotionReadinessReviewReport {
  reviewId: string;
  reviewVersion: string;
  status:
    | 'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_SEVEN_REQUIREMENT_COVERAGE_ADEQUACY_AUTHORITY_ADMISSIBILITY_PROMOTION_READINESS_REVIEW'
    | 'I221_COVERAGE_EVALUATION_BOUNDARY_INVALID';
  decision:
    | 'SEVEN_OF_SEVEN_COVERAGE_ACCEPTED_AUTHORITY_ADMISSIBILITY_PROMOTION_NOT_READY_FOUR_UNRESOLVED_ADMISSIBILITY_GAPS_TARGETED_EVIDENCE_ACQUISITION_JUSTIFIED_NO_PROMOTION_NO_GAP_CLOSURE'
    | 'HIDDEN_STEM_AUTHORITY_ADMISSIBILITY_PROMOTION_READINESS_NOT_ESTABLISHED';
  upstreamI221EvaluationId: string;
  policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy';
  policyVersion: 'v1-definition';
  adoptionVersion: 'v1-adoption';
  currentCandidateSetVersion: 'v1-candidate-set';
  currentInputPackageVersion: 'v2-input-package';
  exactI221BoundaryAccepted: boolean;
  targetSourceTerm: '克';
  targetScope: 'HIDDEN_STEM_EFFECTIVE_INTERACTION_ELIGIBILITY';
  evaluatedCandidateId:
    | 'LI_YANCHEN_GANZHI_NINE_RELATIONS_PART2_SOHU_2017_HTML'
    | null;
  sevenRequirementCoverageAdequate: boolean;
  directCoverageCount: 7 | 0;
  publicationObjectIdentityAndDirectContextEstablished: boolean;
  publicationObjectIdentityAloneMayEstablishNormativeAuthority: false;
  exactDoctrinalAuthorshipOrLineageEstablished: false;
  normativeRuleBearingStatusAndOriginalityEstablished: false;
  derivativeRelationshipAndPriorSourceDependencyEstablished: false;
  restrictiveDoctrinalConflictHandlingEstablished: false;
  sourceNormativeAdmissibilityEstablished: false;
  authorityPromotionReadinessEstablished: false;
  unresolvedAdmissibilityGapIds: readonly I222UnresolvedAuthorityAdmissibilityGapId[];
  unresolvedAdmissibilityGapCount: 4 | 0;
  targetedAdmissibilityEvidenceAcquisitionJustified: boolean;
  targetedAdmissibilityEvidenceAcquisitionExecutedByThisGate: false;
  doctrinalAuthorshipOrLineageAdjudicatedByThisGate: false;
  normativeSourceStatusAdjudicatedByThisGate: false;
  derivativeLineageAdjudicatedByThisGate: false;
  restrictiveDoctrinalConflictAdjudicatedByThisGate: false;
  candidateMayEnterAuthorityPromotionLifecycle: false;
  coverageAdequacyMayAutoPromoteAuthority: false;
  coverageAdequacyMayAutoCloseAuthorityGap: false;
  authorityGap:
    | 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED'
    | 'UPSTREAM_INVALID';
  authorityGapClosed: false;
  authorityPromotedByThisGate: false;
  candidateRegisteredByThisGate: false;
  candidateSelectedByThisGate: false;
  doctrinalConflictPreserved: boolean;
  doctrinalConflictResolvedByThisGate: false;
  sourceClassOrPublicationPlatformAutoAcceptancePerformed: false;
  crossCandidateCompositionPerformed: false;
  currentCandidateEvidenceUsedToBackfillAdmissibility: false;
  searchSnippetUsedAsAuthority: false;
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
  visibleStemBinaryEffectiveInteractionEligibilityResolved: false;
  thresholdRuleCreatedByThisGate: false;
  damageEvaluationAuthorized: false;
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  productionPolicyExecutionAuthorized: false;
  recommendedNextGate:
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_AUTHORITY_ADMISSIBILITY_TARGETED_EVIDENCE_ACQUISITION_READINESS_REVIEW'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_SEVEN_REQUIREMENT_COVERAGE_ADEQUACY_AUTHORITY_ADMISSIBILITY_PROMOTION_READINESS_REVIEW';
  notes: readonly string[];
}

function exactI221Accepted(
  i221: I221SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementCandidateCoverageEvaluationEvidenceReport,
): boolean {
  return (
    i221.status ===
      'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_SEVEN_REQUIREMENT_CANDIDATE_COVERAGE_EVALUATION_EVIDENCE' &&
    i221.decision ===
      'SOHU_DIRECT_HTML_CANDIDATE_SEVEN_OF_SEVEN_DIRECT_CANDIDATE_LOCAL_REQUIREMENT_COVERAGE_ESTABLISHED_COVERAGE_ADEQUATE_AUTHORITY_ADMISSIBILITY_NOT_ADJUDICATED_NO_PROMOTION_NO_GAP_CLOSURE' &&
    i221.exactI220BoundaryAccepted &&
    i221.evaluatedCandidateId === 'LI_YANCHEN_GANZHI_NINE_RELATIONS_PART2_SOHU_2017_HTML' &&
    i221.evaluationExecuted &&
    i221.coverageCellCount === 7 &&
    i221.directCoverageCount === 7 &&
    i221.partialCoverageCount === 0 &&
    i221.conflictCoverageCount === 0 &&
    i221.notEstablishedCoverageCount === 0 &&
    i221.allSevenRequirementsDirectlyCoveredCandidateLocally &&
    i221.membershipVsEffectiveInteractionSeparationDirect &&
    i221.visibleToHiddenDirectionalScopeDirect &&
    i221.hiddenToVisibleDirectionalScopeDirect &&
    i221.hiddenToHiddenDirectionalScopeDirect &&
    i221.activationAndExceptionConditionsDirect &&
    i221.relationInteractionDamageSemanticSeparationDirect &&
    i221.sourceIdentityVerifiedContextAndLocatorDirect &&
    i221.onlinePublishedSourceIdentityIsEvaluationObject &&
    i221.exactDoctrinalAuthorshipOrLineageAdjudicatedByThisGate === false &&
    i221.sourceNormativeAdmissibilityAdjudicatedByThisGate === false &&
    i221.doctrinalConflictWithRestrictiveCandidatePreserved &&
    i221.doctrinalConflictResolvedByThisGate === false &&
    i221.sevenRequirementCoverageAdequate &&
    i221.sevenRequirementCoverageAdequacyEqualsAuthorityPromotion === false &&
    i221.sevenRequirementCoverageAdequacyEqualsAuthorityGapClosure === false &&
    i221.authorityGap === 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED' &&
    i221.authorityGapClosed === false &&
    i221.authorityPromotedByThisGate === false &&
    i221.currentCandidateEvidenceUsedToBackfill === false &&
    i221.searchSnippetUsedAsDirectCoverage === false &&
    i221.sourceClassOrAgeAutoAcceptancePerformed === false &&
    i221.crossCandidateCompositionPerformed === false &&
    i221.quWei2001HoldPreserved &&
    i221.li1998SameTargetPathSuspendedNotRetired &&
    i221.I132IndependentNormativeProvenanceRequirementRemainsNormative &&
    i221.I132PolicyRelaxationAuthorizedByThisGate === false &&
    i221.provenanceIndependenceAdjudicatedByThisGate === false &&
    i221.derivativeLineageAdjudicatedByThisGate === false &&
    i221.evidenceRebindingAuthorizedByThisGate === false &&
    i221.candidateSetMutatedByThisGate === false &&
    i221.candidateSetReevaluationAuthorizedByThisGate === false &&
    i221.currentV2PackageAndCandidateSetRemainImmutable &&
    i221.currentV2ProvenanceDisposition === 'BLOCKED_UNDER_CURRENT_EVIDENCE' &&
    i221.actualCompositionPerformedByThisGate === false &&
    i221.multiSourceCompositionAuthorized === false &&
    i221.thresholdRuleCreatedByThisGate === false &&
    i221.damageEvaluationAuthorized === false &&
    i221.classificationAuthorized === false &&
    i221.numericScoringAuthorized === false &&
    i221.productionPolicyExecutionAuthorized === false &&
    i221.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_SEVEN_REQUIREMENT_COVERAGE_ADEQUACY_AUTHORITY_ADMISSIBILITY_PROMOTION_READINESS_REVIEW'
  );
}

function finalized(
  material: Omit<
    I222SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementCoverageAdequacyAuthorityAdmissibilityPromotionReadinessReviewReport,
    'reviewId'
  >,
): I222SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementCoverageAdequacyAuthorityAdmissibilityPromotionReadinessReviewReport {
  return {
    reviewId: `i222_hidden_stem_authority_admissibility_readiness_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI222SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementCoverageAdequacyAuthorityAdmissibilityPromotionReadinessReview(
  i221: I221SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementCandidateCoverageEvaluationEvidenceReport,
): I222SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementCoverageAdequacyAuthorityAdmissibilityPromotionReadinessReviewReport {
  const accepted = exactI221Accepted(i221);

  return finalized({
    reviewVersion:
      I222_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_SEVEN_REQUIREMENT_COVERAGE_ADEQUACY_AUTHORITY_ADMISSIBILITY_PROMOTION_READINESS_REVIEW_VERSION,
    status: accepted
      ? 'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_SEVEN_REQUIREMENT_COVERAGE_ADEQUACY_AUTHORITY_ADMISSIBILITY_PROMOTION_READINESS_REVIEW'
      : 'I221_COVERAGE_EVALUATION_BOUNDARY_INVALID',
    decision: accepted
      ? 'SEVEN_OF_SEVEN_COVERAGE_ACCEPTED_AUTHORITY_ADMISSIBILITY_PROMOTION_NOT_READY_FOUR_UNRESOLVED_ADMISSIBILITY_GAPS_TARGETED_EVIDENCE_ACQUISITION_JUSTIFIED_NO_PROMOTION_NO_GAP_CLOSURE'
      : 'HIDDEN_STEM_AUTHORITY_ADMISSIBILITY_PROMOTION_READINESS_NOT_ESTABLISHED',
    upstreamI221EvaluationId: i221.evaluationId,
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI221BoundaryAccepted: accepted,
    targetSourceTerm: '克',
    targetScope: 'HIDDEN_STEM_EFFECTIVE_INTERACTION_ELIGIBILITY',
    evaluatedCandidateId: accepted ? 'LI_YANCHEN_GANZHI_NINE_RELATIONS_PART2_SOHU_2017_HTML' : null,
    sevenRequirementCoverageAdequate: accepted,
    directCoverageCount: accepted ? 7 : 0,
    publicationObjectIdentityAndDirectContextEstablished: accepted,
    publicationObjectIdentityAloneMayEstablishNormativeAuthority: false,
    exactDoctrinalAuthorshipOrLineageEstablished: false,
    normativeRuleBearingStatusAndOriginalityEstablished: false,
    derivativeRelationshipAndPriorSourceDependencyEstablished: false,
    restrictiveDoctrinalConflictHandlingEstablished: false,
    sourceNormativeAdmissibilityEstablished: false,
    authorityPromotionReadinessEstablished: false,
    unresolvedAdmissibilityGapIds: accepted ? I222_UNRESOLVED_AUTHORITY_ADMISSIBILITY_GAP_IDS : [],
    unresolvedAdmissibilityGapCount: accepted ? 4 : 0,
    targetedAdmissibilityEvidenceAcquisitionJustified: accepted,
    targetedAdmissibilityEvidenceAcquisitionExecutedByThisGate: false,
    doctrinalAuthorshipOrLineageAdjudicatedByThisGate: false,
    normativeSourceStatusAdjudicatedByThisGate: false,
    derivativeLineageAdjudicatedByThisGate: false,
    restrictiveDoctrinalConflictAdjudicatedByThisGate: false,
    candidateMayEnterAuthorityPromotionLifecycle: false,
    coverageAdequacyMayAutoPromoteAuthority: false,
    coverageAdequacyMayAutoCloseAuthorityGap: false,
    authorityGap: accepted
      ? 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED'
      : 'UPSTREAM_INVALID',
    authorityGapClosed: false,
    authorityPromotedByThisGate: false,
    candidateRegisteredByThisGate: false,
    candidateSelectedByThisGate: false,
    doctrinalConflictPreserved: accepted,
    doctrinalConflictResolvedByThisGate: false,
    sourceClassOrPublicationPlatformAutoAcceptancePerformed: false,
    crossCandidateCompositionPerformed: false,
    currentCandidateEvidenceUsedToBackfillAdmissibility: false,
    searchSnippetUsedAsAuthority: false,
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
    visibleStemBinaryEffectiveInteractionEligibilityResolved: false,
    thresholdRuleCreatedByThisGate: false,
    damageEvaluationAuthorized: false,
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    productionPolicyExecutionAuthorized: false,
    recommendedNextGate: accepted
      ? 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_AUTHORITY_ADMISSIBILITY_TARGETED_EVIDENCE_ACQUISITION_READINESS_REVIEW'
      : 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_SEVEN_REQUIREMENT_COVERAGE_ADEQUACY_AUTHORITY_ADMISSIBILITY_PROMOTION_READINESS_REVIEW',
    notes: accepted
      ? [
          'I221 establishes seven-of-seven candidate-local coverage, but coverage adequacy is not normative authority admissibility.',
          'The directly opened Sohu publication object is stable enough for the coverage finding, but the publication platform or URL does not establish doctrinal authorship, lineage, originality, or normative authority.',
          'Four admissibility gaps remain frozen for targeted evidence acquisition; this gate performs no lineage, conflict, provenance-independence, candidate-registration, rebinding, or production adjudication.',
        ]
      : [
          'I222 remains fail-closed unless the exact I221 seven-of-seven candidate-local coverage boundary and all upstream guards are preserved.',
        ],
  });
}
