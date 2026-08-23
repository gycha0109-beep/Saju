import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  I228_HIGHER_PROVENANCE_ACQUISITION_PATH_IDS,
  I228_RESIDUAL_ADMISSIBILITY_GAP_IDS,
  type I228HigherProvenanceAcquisitionPathId,
  type I228SourceKeHiddenStemInteractionEligibilityTargetOriginDiscoveryEvidenceAdequacyResidualPathReassessmentReviewReport,
} from './i228-source-ke-hidden-stem-interaction-eligibility-target-origin-discovery-evidence-adequacy-residual-path-reassessment-review.js';

export const I229_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_ORIGIN_HIGHER_PROVENANCE_ARCHIVAL_OR_CUSTODIAN_ACQUISITION_READINESS_REVIEW_VERSION =
  'myeonghwa-source-ke-hidden-stem-interaction-eligibility-target-origin-higher-provenance-archival-or-custodian-acquisition-readiness-review-v1';

export const I229_HIGHER_PROVENANCE_ACQUISITION_CONTROL_IDS = Object.freeze([
  'EXACT_I228_RESIDUAL_BOUNDARY_REQUIRED',
  'I221_SEVEN_OF_SEVEN_COVERAGE_NOT_REEVALUATED',
  'MATERIALLY_NEW_EVIDENCE_CLASS_REQUIRED',
  'ARCHIVE_SNAPSHOT_REQUIRES_CAPTURE_DATE_SOURCE_IDENTITY_AND_CONTEXT',
  'PREDECESSOR_ARCHIVE_FINDING_REQUIRES_PRE_TARGET_CAPTURE_DATE',
  'AUTHOR_CONTROLLED_SOURCE_REQUIRES_IDENTITY_OR_CONTROL_BINDING',
  'AUTHOR_CONTROLLED_SOURCE_REQUIRES_EXACT_TARGET_PASSAGE_OR_EXPLICIT_ATTRIBUTION',
  'BOOK_OR_COURSE_WITNESS_REQUIRES_PUBLICATION_OR_EDITION_IDENTITY',
  'CANONICAL_WITNESS_REQUIRES_EXACT_TARGET_PASSAGE_AND_REPRODUCIBLE_LOCATOR',
  'CUSTODIAN_WITNESS_REQUIRES_CUSTODY_OR_SOURCE_CHAIN',
  'CUSTODIAN_FACSIMILE_REQUIRES_VISIBLE_TARGET_PASSAGE_OR_VERIFIABLE_TRANSCRIPTION_BINDING',
  'SEARCH_SNIPPET_OR_CATALOG_METADATA_WITHOUT_TARGET_PASSAGE_IS_LEAD_ONLY',
  'POST_TARGET_SOURCE_MAY_NOT_ESTABLISH_PRIOR_SOURCE_DEPENDENCY',
  'ALTERNATE_LINEAGE_MAY_NOT_BACKFILL_TARGET_LINEAGE',
  'RESTRICTIVE_CONFLICT_ADJUDICATION_DEFERRED_UNTIL_TARGET_LINEAGE_ESTABLISHED',
  'NO_NEGATIVE_OR_CORPUS_EXHAUSTION_FINDING_FROM_ACCESS_FAILURE_OR_SILENCE',
  'NO_CANDIDATE_REGISTRATION_SELECTION_REBINDING_OR_SET_MUTATION',
  'I132_QU_WEI_LI_V2_AND_NO_PRODUCTION_GUARDS_PRESERVED',
] as const);

export interface I229SourceKeHiddenStemInteractionEligibilityTargetOriginHigherProvenanceArchivalOrCustodianAcquisitionReadinessReviewReport {
  reviewId: string;
  reviewVersion: string;
  status:
    | 'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_ORIGIN_HIGHER_PROVENANCE_ARCHIVAL_OR_CUSTODIAN_ACQUISITION_READINESS_REVIEW'
    | 'I228_RESIDUAL_PATH_REASSESSMENT_BOUNDARY_INVALID';
  decision:
    | 'FOUR_HIGHER_PROVENANCE_PATHS_EIGHTEEN_CONTROLS_FROZEN_NO_ACQUISITION_EXECUTED_NO_ORIGIN_LINEAGE_DERIVATIVE_ADJUDICATION_NO_PROMOTION'
    | 'TARGET_ORIGIN_HIGHER_PROVENANCE_ACQUISITION_NOT_READY';
  upstreamI228ReviewId: string;
  policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy';
  policyVersion: 'v1-definition';
  adoptionVersion: 'v1-adoption';
  currentCandidateSetVersion: 'v1-candidate-set';
  currentInputPackageVersion: 'v2-input-package';
  exactI228BoundaryAccepted: boolean;
  targetSourceTerm: '克';
  targetScope: 'HIDDEN_STEM_EFFECTIVE_INTERACTION_ELIGIBILITY';
  targetCandidateId: 'LI_YANCHEN_GANZHI_NINE_RELATIONS_PART2_SOHU_2017_HTML' | null;
  sevenRequirementCoverageAcceptedAsUpstreamFinding: boolean;
  coverageReevaluationAuthorizedByThisGate: false;
  residualAdmissibilityGapIds: readonly string[];
  residualAdmissibilityGapCount: 4 | 0;
  materiallyNewEvidenceClassRequired: boolean;
  acquisitionPathIds: readonly I228HigherProvenanceAcquisitionPathId[];
  acquisitionPathCount: 4 | 0;
  acquisitionControlIds: readonly string[];
  acquisitionControlCount: 18 | 0;
  acquisitionControlsFrozen: boolean;
  higherProvenanceAcquisitionAuthorized: boolean;
  higherProvenanceAcquisitionExecutedByThisGate: false;
  archiveSnapshotAcquisitionRequired: boolean;
  authorControlledFirstPartyAcquisitionRequired: boolean;
  originalBookCourseCanonicalWitnessAcquisitionRequired: boolean;
  custodianBoundWitnessAcquisitionRequired: boolean;
  archiveSnapshotRequiresPreTargetDateForPredecessorFinding: boolean;
  authorControlledSourceRequiresExactTargetBinding: boolean;
  canonicalWitnessRequiresExactTargetPassageAndLocator: boolean;
  custodianWitnessRequiresSourceChainAndPassageBinding: boolean;
  searchSnippetOrCatalogMetadataMayEstablishPositiveOriginFinding: false;
  postTargetSourceMayEstablishPriorDependency: false;
  alternateLineageMayBackfillTargetLineage: false;
  accessFailureCreatesNegativeFinding: false;
  corpusExhaustionClaimed: false;
  exactTargetOriginalAuthorshipEstablishedByThisGate: false;
  exactTargetDoctrinalLineageEstablishedByThisGate: false;
  exactTargetPriorSourceDependencyEstablishedByThisGate: false;
  derivativeRelationshipAdjudicatedByThisGate: false;
  restrictiveDoctrineConflictAdjudicatedByThisGate: false;
  restrictiveConflictAdjudicationDeferredUntilTargetLineageEstablished: boolean;
  sourceNormativeAdmissibilityAdjudicatedByThisGate: false;
  authorityPromotionReadinessEstablishedByThisGate: false;
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
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_ORIGIN_HIGHER_PROVENANCE_ARCHIVAL_OR_CUSTODIAN_ACQUISITION_EVIDENCE'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_ORIGIN_HIGHER_PROVENANCE_ARCHIVAL_OR_CUSTODIAN_ACQUISITION_READINESS_REVIEW';
  notes: readonly string[];
}

function exactI228Accepted(
  i228: I228SourceKeHiddenStemInteractionEligibilityTargetOriginDiscoveryEvidenceAdequacyResidualPathReassessmentReviewReport,
): boolean {
  return (
    i228.status ===
      'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_ORIGIN_DISCOVERY_EVIDENCE_ADEQUACY_RESIDUAL_PATH_REASSESSMENT_REVIEW' &&
    i228.decision ===
      'I227_EVIDENCE_ADEQUATE_FOR_CURRENT_PASS_FOUR_RESIDUAL_ADMISSIBILITY_GAPS_REMAIN_EQUIVALENT_AUTOMATED_WEB_REPEAT_NOT_JUSTIFIED_HIGHER_PROVENANCE_ARCHIVAL_AUTHOR_CONTROLLED_OR_CUSTODIAN_ACQUISITION_REQUIRED_NO_WEB_EXHAUSTION_NO_PROMOTION' &&
    i228.exactI227BoundaryAccepted &&
    i228.targetCandidateId === 'LI_YANCHEN_GANZHI_NINE_RELATIONS_PART2_SOHU_2017_HTML' &&
    i228.sevenRequirementCoverageAcceptedAsUpstreamFinding &&
    i228.coverageReevaluationAuthorizedByThisGate === false &&
    i228.I227EvidenceAdequateForCurrentPass &&
    i228.exactRarePhraseSearchExecutionAccepted &&
    i228.noPre2017ExactWitnessEstablishedInPassAccepted &&
    i228.noPre2017WitnessNonexistenceFindingAccepted === false &&
    i228.noCorpusExhaustionFindingAccepted &&
    i228.pre2017AlternateLineageContrastAccepted &&
    i228.alternateLineageMayBackfillTargetLineage === false &&
    i228.laterExactTextRedistributionAccepted &&
    i228.laterRedistributionMayEstablishPriorDependency === false &&
    i228.part1OrUpstreamAttributionStillUnresolved &&
    i228.residualAdmissibilityGapCount === 4 &&
    i228.residualAdmissibilityGapIds.length === 4 &&
    i228.residualAdmissibilityGapIds.every((gapId, index) => gapId === I228_RESIDUAL_ADMISSIBILITY_GAP_IDS[index]) &&
    i228.equivalentAutomatedWebSearchRepeatJustified === false &&
    i228.automatedWebCorpusExhaustionEstablished === false &&
    i228.automatedWebAccessFailureEstablished === false &&
    i228.materiallyNewEvidenceClassRequired &&
    i228.higherProvenanceAcquisitionPathCount === 4 &&
    i228.higherProvenanceAcquisitionPathIds.length === 4 &&
    i228.higherProvenanceAcquisitionPathIds.every(
      (pathId, index) => pathId === I228_HIGHER_PROVENANCE_ACQUISITION_PATH_IDS[index],
    ) &&
    i228.higherProvenanceAcquisitionReadinessReviewJustified &&
    i228.archivalSnapshotPathJustified &&
    i228.authorControlledFirstPartyPathJustified &&
    i228.originalBookCourseCanonicalWitnessPathJustified &&
    i228.custodianBoundWitnessPathJustified &&
    i228.restrictiveConflictAdjudicationDeferredUntilTargetLineageEstablished &&
    i228.sourceNormativeAdmissibilityAdjudicatedByThisGate === false &&
    i228.authorityPromotionReadinessEstablishedByThisGate === false &&
    i228.authorityGap === 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED' &&
    i228.authorityGapClosed === false &&
    i228.authorityPromotedByThisGate === false &&
    i228.doctrinalConflictPreserved &&
    i228.doctrinalConflictResolvedByThisGate === false &&
    i228.negativeFindingCreatedFromSearchSilence === false &&
    i228.corpusExhaustionClaimed === false &&
    i228.quWei2001HoldPreserved &&
    i228.li1998SameTargetPathSuspendedNotRetired &&
    i228.I132IndependentNormativeProvenanceRequirementRemainsNormative &&
    i228.I132PolicyRelaxationAuthorizedByThisGate === false &&
    i228.provenanceIndependenceAdjudicatedByThisGate === false &&
    i228.derivativeRelationshipAdjudicatedByThisGate === false &&
    i228.evidenceRebindingAuthorizedByThisGate === false &&
    i228.candidateSetMutatedByThisGate === false &&
    i228.candidateSetReevaluationAuthorizedByThisGate === false &&
    i228.currentV2PackageAndCandidateSetRemainImmutable &&
    i228.currentV2ProvenanceDisposition === 'BLOCKED_UNDER_CURRENT_EVIDENCE' &&
    i228.actualCompositionPerformedByThisGate === false &&
    i228.multiSourceCompositionAuthorized === false &&
    i228.thresholdRuleCreatedByThisGate === false &&
    i228.damageEvaluationAuthorized === false &&
    i228.classificationAuthorized === false &&
    i228.numericScoringAuthorized === false &&
    i228.productionPolicyExecutionAuthorized === false &&
    i228.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_ORIGIN_HIGHER_PROVENANCE_ARCHIVAL_OR_CUSTODIAN_ACQUISITION_READINESS_REVIEW'
  );
}

function finalized(
  material: Omit<
    I229SourceKeHiddenStemInteractionEligibilityTargetOriginHigherProvenanceArchivalOrCustodianAcquisitionReadinessReviewReport,
    'reviewId'
  >,
): I229SourceKeHiddenStemInteractionEligibilityTargetOriginHigherProvenanceArchivalOrCustodianAcquisitionReadinessReviewReport {
  return {
    reviewId: `i229_hidden_stem_target_origin_higher_provenance_readiness_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI229SourceKeHiddenStemInteractionEligibilityTargetOriginHigherProvenanceArchivalOrCustodianAcquisitionReadinessReview(
  i228: I228SourceKeHiddenStemInteractionEligibilityTargetOriginDiscoveryEvidenceAdequacyResidualPathReassessmentReviewReport,
): I229SourceKeHiddenStemInteractionEligibilityTargetOriginHigherProvenanceArchivalOrCustodianAcquisitionReadinessReviewReport {
  const accepted = exactI228Accepted(i228);
  return finalized({
    reviewVersion:
      I229_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_ORIGIN_HIGHER_PROVENANCE_ARCHIVAL_OR_CUSTODIAN_ACQUISITION_READINESS_REVIEW_VERSION,
    status: accepted
      ? 'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_ORIGIN_HIGHER_PROVENANCE_ARCHIVAL_OR_CUSTODIAN_ACQUISITION_READINESS_REVIEW'
      : 'I228_RESIDUAL_PATH_REASSESSMENT_BOUNDARY_INVALID',
    decision: accepted
      ? 'FOUR_HIGHER_PROVENANCE_PATHS_EIGHTEEN_CONTROLS_FROZEN_NO_ACQUISITION_EXECUTED_NO_ORIGIN_LINEAGE_DERIVATIVE_ADJUDICATION_NO_PROMOTION'
      : 'TARGET_ORIGIN_HIGHER_PROVENANCE_ACQUISITION_NOT_READY',
    upstreamI228ReviewId: i228.reviewId,
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI228BoundaryAccepted: accepted,
    targetSourceTerm: '克',
    targetScope: 'HIDDEN_STEM_EFFECTIVE_INTERACTION_ELIGIBILITY',
    targetCandidateId: accepted ? 'LI_YANCHEN_GANZHI_NINE_RELATIONS_PART2_SOHU_2017_HTML' : null,
    sevenRequirementCoverageAcceptedAsUpstreamFinding: accepted,
    coverageReevaluationAuthorizedByThisGate: false,
    residualAdmissibilityGapIds: accepted ? I228_RESIDUAL_ADMISSIBILITY_GAP_IDS : [],
    residualAdmissibilityGapCount: accepted ? 4 : 0,
    materiallyNewEvidenceClassRequired: accepted,
    acquisitionPathIds: accepted ? I228_HIGHER_PROVENANCE_ACQUISITION_PATH_IDS : [],
    acquisitionPathCount: accepted ? 4 : 0,
    acquisitionControlIds: accepted ? I229_HIGHER_PROVENANCE_ACQUISITION_CONTROL_IDS : [],
    acquisitionControlCount: accepted ? 18 : 0,
    acquisitionControlsFrozen: accepted,
    higherProvenanceAcquisitionAuthorized: accepted,
    higherProvenanceAcquisitionExecutedByThisGate: false,
    archiveSnapshotAcquisitionRequired: accepted,
    authorControlledFirstPartyAcquisitionRequired: accepted,
    originalBookCourseCanonicalWitnessAcquisitionRequired: accepted,
    custodianBoundWitnessAcquisitionRequired: accepted,
    archiveSnapshotRequiresPreTargetDateForPredecessorFinding: accepted,
    authorControlledSourceRequiresExactTargetBinding: accepted,
    canonicalWitnessRequiresExactTargetPassageAndLocator: accepted,
    custodianWitnessRequiresSourceChainAndPassageBinding: accepted,
    searchSnippetOrCatalogMetadataMayEstablishPositiveOriginFinding: false,
    postTargetSourceMayEstablishPriorDependency: false,
    alternateLineageMayBackfillTargetLineage: false,
    accessFailureCreatesNegativeFinding: false,
    corpusExhaustionClaimed: false,
    exactTargetOriginalAuthorshipEstablishedByThisGate: false,
    exactTargetDoctrinalLineageEstablishedByThisGate: false,
    exactTargetPriorSourceDependencyEstablishedByThisGate: false,
    derivativeRelationshipAdjudicatedByThisGate: false,
    restrictiveDoctrineConflictAdjudicatedByThisGate: false,
    restrictiveConflictAdjudicationDeferredUntilTargetLineageEstablished: accepted,
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
      ? 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_ORIGIN_HIGHER_PROVENANCE_ARCHIVAL_OR_CUSTODIAN_ACQUISITION_EVIDENCE'
      : 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_ORIGIN_HIGHER_PROVENANCE_ARCHIVAL_OR_CUSTODIAN_ACQUISITION_READINESS_REVIEW',
    notes: accepted
      ? Object.freeze([
          'I229 authorizes only four materially-new higher-provenance acquisition classes and performs no acquisition itself.',
          'A predecessor finding requires a pre-target dated archive or an equivalent exact passage bound to a higher-provenance source; post-target mirrors remain insufficient.',
          'Author-controlled, canonical and custodian paths must bind source identity and the exact target passage rather than rely on metadata or name overlap.',
          'All authority, provenance, candidate-set, I132, Qu Wei, Li 1998 and production guards remain unchanged.',
        ])
      : Object.freeze(['I228 residual-path reassessment boundary was not accepted; no higher-provenance acquisition was authorized.']),
  });
}
