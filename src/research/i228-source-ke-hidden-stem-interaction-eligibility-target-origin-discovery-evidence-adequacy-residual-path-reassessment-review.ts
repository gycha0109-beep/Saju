import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { I227SourceKeHiddenStemInteractionEligibilityTargetExactTextPre2017OriginalSourceAuthorshipDiscoveryEvidenceReport } from './i227-source-ke-hidden-stem-interaction-eligibility-target-exact-text-pre-2017-original-source-authorship-discovery-evidence.js';

export const I228_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_ORIGIN_DISCOVERY_EVIDENCE_ADEQUACY_RESIDUAL_PATH_REASSESSMENT_REVIEW_VERSION =
  'myeonghwa-source-ke-hidden-stem-interaction-eligibility-target-origin-discovery-evidence-adequacy-residual-path-reassessment-review-v1';

export const I228_RESIDUAL_ADMISSIBILITY_GAP_IDS = Object.freeze([
  'TARGET_ORIGINAL_AUTHORSHIP_UNRESOLVED',
  'TARGET_DOCTRINAL_LINEAGE_UNRESOLVED',
  'TARGET_PRIOR_SOURCE_DEPENDENCY_UNRESOLVED',
  'RESTRICTIVE_DOCTRINE_SCHOOL_BOUNDARY_UNRESOLVED',
] as const);
export type I228ResidualAdmissibilityGapId = (typeof I228_RESIDUAL_ADMISSIBILITY_GAP_IDS)[number];

export const I228_HIGHER_PROVENANCE_ACQUISITION_PATH_IDS = Object.freeze([
  'DATE_VERIFIED_ARCHIVE_SNAPSHOT_OR_WEB_CAPTURE',
  'AUTHOR_CONTROLLED_OR_FIRST_PARTY_TARGET_TEXT_SOURCE',
  'ORIGINAL_BOOK_COURSE_OR_CANONICAL_WITNESS_TARGET_PASSAGE',
  'CUSTODIAN_BOUND_FACSIMILE_OR_CATALOG_WITNESS',
] as const);
export type I228HigherProvenanceAcquisitionPathId = (typeof I228_HIGHER_PROVENANCE_ACQUISITION_PATH_IDS)[number];

export interface I228SourceKeHiddenStemInteractionEligibilityTargetOriginDiscoveryEvidenceAdequacyResidualPathReassessmentReviewReport {
  reviewId: string;
  reviewVersion: string;
  status:
    | 'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_ORIGIN_DISCOVERY_EVIDENCE_ADEQUACY_RESIDUAL_PATH_REASSESSMENT_REVIEW'
    | 'I227_TARGET_ORIGIN_DISCOVERY_EVIDENCE_BOUNDARY_INVALID';
  decision:
    | 'I227_EVIDENCE_ADEQUATE_FOR_CURRENT_PASS_FOUR_RESIDUAL_ADMISSIBILITY_GAPS_REMAIN_EQUIVALENT_AUTOMATED_WEB_REPEAT_NOT_JUSTIFIED_HIGHER_PROVENANCE_ARCHIVAL_AUTHOR_CONTROLLED_OR_CUSTODIAN_ACQUISITION_REQUIRED_NO_WEB_EXHAUSTION_NO_PROMOTION'
    | 'TARGET_ORIGIN_DISCOVERY_EVIDENCE_REASSESSMENT_NOT_READY';
  upstreamI227EvidenceId: string;
  policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy';
  policyVersion: 'v1-definition';
  adoptionVersion: 'v1-adoption';
  currentCandidateSetVersion: 'v1-candidate-set';
  currentInputPackageVersion: 'v2-input-package';
  exactI227BoundaryAccepted: boolean;
  targetSourceTerm: '克';
  targetScope: 'HIDDEN_STEM_EFFECTIVE_INTERACTION_ELIGIBILITY';
  targetCandidateId: 'LI_YANCHEN_GANZHI_NINE_RELATIONS_PART2_SOHU_2017_HTML' | null;
  sevenRequirementCoverageAcceptedAsUpstreamFinding: boolean;
  coverageReevaluationAuthorizedByThisGate: false;
  I227EvidenceAdequateForCurrentPass: boolean;
  exactRarePhraseSearchExecutionAccepted: boolean;
  noPre2017ExactWitnessEstablishedInPassAccepted: boolean;
  noPre2017WitnessNonexistenceFindingAccepted: false;
  noCorpusExhaustionFindingAccepted: boolean;
  pre2017AlternateLineageContrastAccepted: boolean;
  alternateLineageMayBackfillTargetLineage: false;
  laterExactTextRedistributionAccepted: boolean;
  laterRedistributionMayEstablishPriorDependency: false;
  part1OrUpstreamAttributionStillUnresolved: boolean;
  residualAdmissibilityGapIds: readonly I228ResidualAdmissibilityGapId[];
  residualAdmissibilityGapCount: 4 | 0;
  equivalentAutomatedWebSearchRepeatJustified: false;
  automatedWebCorpusExhaustionEstablished: false;
  automatedWebAccessFailureEstablished: false;
  materiallyNewEvidenceClassRequired: boolean;
  higherProvenanceAcquisitionPathIds: readonly I228HigherProvenanceAcquisitionPathId[];
  higherProvenanceAcquisitionPathCount: 4 | 0;
  higherProvenanceAcquisitionReadinessReviewJustified: boolean;
  archivalSnapshotPathJustified: boolean;
  authorControlledFirstPartyPathJustified: boolean;
  originalBookCourseCanonicalWitnessPathJustified: boolean;
  custodianBoundWitnessPathJustified: boolean;
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
  negativeFindingCreatedFromSearchSilence: false;
  corpusExhaustionClaimed: false;
  quWei2001HoldPreserved: boolean;
  li1998SameTargetPathSuspendedNotRetired: boolean;
  I132IndependentNormativeProvenanceRequirementRemainsNormative: boolean;
  I132PolicyRelaxationAuthorizedByThisGate: false;
  provenanceIndependenceAdjudicatedByThisGate: false;
  derivativeRelationshipAdjudicatedByThisGate: false;
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
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_ORIGIN_HIGHER_PROVENANCE_ARCHIVAL_OR_CUSTODIAN_ACQUISITION_READINESS_REVIEW'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_ORIGIN_DISCOVERY_EVIDENCE_ADEQUACY_RESIDUAL_PATH_REASSESSMENT_REVIEW';
  notes: readonly string[];
}

function exactI227Accepted(
  i227: I227SourceKeHiddenStemInteractionEligibilityTargetExactTextPre2017OriginalSourceAuthorshipDiscoveryEvidenceReport,
): boolean {
  return (
    i227.status ===
      'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_EXACT_TEXT_PRE_2017_ORIGINAL_SOURCE_AUTHORSHIP_DISCOVERY_EVIDENCE' &&
    i227.decision ===
      'FIVE_TARGET_SPECIFIC_ORIGIN_PATHS_EXECUTED_NO_DIRECT_PRE_2017_EXACT_TARGET_WITNESS_ESTABLISHED_ONE_PRE_2017_ALTERNATE_LINEAGE_CONTRAST_DIRECTLY_VERIFIED_LATER_EXACT_TEXT_REDISTRIBUTION_CONFIRMED_PART1_AND_TARGET_ORIGIN_ATTRIBUTION_UNRESOLVED_NO_NEGATIVE_EXHAUSTION_FINDING_NO_AUTHORSHIP_LINEAGE_DERIVATIVE_ADJUDICATION_NO_PROMOTION' &&
    i227.exactI226BoundaryAccepted &&
    i227.targetCandidateId === 'LI_YANCHEN_GANZHI_NINE_RELATIONS_PART2_SOHU_2017_HTML' &&
    i227.targetPublicationDate === '2017-02-02' &&
    i227.sevenRequirementCoverageAcceptedAsUpstreamFinding &&
    i227.coverageReevaluationPerformedByThisGate === false &&
    i227.discoveryExecuted &&
    i227.executedDiscoveryPathCount === 5 &&
    i227.evidenceRecordCount === 5 &&
    i227.rareTargetPhraseCount === 4 &&
    i227.exactRarePhraseSearchExecuted &&
    i227.targetBaselineExactPhrasesDirectlyBoundTo2017Publication &&
    i227.pre2017ExactTargetWitnessEstablished === false &&
    i227.pre2017ExactTargetWitnessNonexistenceEstablished === false &&
    i227.discoverySilenceCreatesNegativeFinding === false &&
    i227.corpusExhaustionClaimed === false &&
    i227.sohuTargetPart1OrUpstreamAttributionDirectlyBound === false &&
    i227.sohuTargetPart1NonexistenceEstablished === false &&
    i227.pre2017AlternateLineageContrastDirectlyVerified &&
    i227.alternateLineageExactTargetPhraseBindingEstablished === false &&
    i227.alternateLineageMayBackfillTargetLineage === false &&
    i227.laterExactTextRedistributionDirectlyConfirmed &&
    i227.laterMirrorMayEstablishPriorDependency === false &&
    i227.namedLineageExactTargetBindingEstablished === false &&
    i227.exactTargetOriginalAuthorshipEstablishedByThisGate === false &&
    i227.exactTargetDoctrinalLineageEstablishedByThisGate === false &&
    i227.exactTargetPriorSourceDependencyEstablishedByThisGate === false &&
    i227.derivativeRelationshipAdjudicatedByThisGate === false &&
    i227.restrictiveDoctrineConflictAdjudicatedByThisGate === false &&
    i227.restrictiveDoctrineSchoolBoundaryEstablishedByThisGate === false &&
    i227.unresolvedAdmissibilityGapCount === 4 &&
    i227.authorityGap === 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED' &&
    i227.authorityGapClosed === false &&
    i227.authorityPromotedByThisGate === false &&
    i227.doctrinalConflictPreserved &&
    i227.doctrinalConflictResolvedByThisGate === false &&
    i227.quWei2001HoldPreserved &&
    i227.li1998SameTargetPathSuspendedNotRetired &&
    i227.I132IndependentNormativeProvenanceRequirementRemainsNormative &&
    i227.I132PolicyRelaxationAuthorizedByThisGate === false &&
    i227.provenanceIndependenceAdjudicatedByThisGate === false &&
    i227.evidenceRebindingAuthorizedByThisGate === false &&
    i227.candidateSetMutatedByThisGate === false &&
    i227.candidateSetReevaluationAuthorizedByThisGate === false &&
    i227.currentV2PackageAndCandidateSetRemainImmutable &&
    i227.currentV2ProvenanceDisposition === 'BLOCKED_UNDER_CURRENT_EVIDENCE' &&
    i227.actualCompositionPerformedByThisGate === false &&
    i227.multiSourceCompositionAuthorized === false &&
    i227.thresholdRuleCreatedByThisGate === false &&
    i227.damageEvaluationAuthorized === false &&
    i227.classificationAuthorized === false &&
    i227.numericScoringAuthorized === false &&
    i227.productionPolicyExecutionAuthorized === false &&
    i227.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_EXACT_TEXT_PRE_2017_ORIGINAL_SOURCE_AUTHORSHIP_DISCOVERY_EVIDENCE_ADEQUACY_RESIDUAL_PATH_REASSESSMENT_REVIEW'
  );
}

function finalized(
  material: Omit<
    I228SourceKeHiddenStemInteractionEligibilityTargetOriginDiscoveryEvidenceAdequacyResidualPathReassessmentReviewReport,
    'reviewId'
  >,
): I228SourceKeHiddenStemInteractionEligibilityTargetOriginDiscoveryEvidenceAdequacyResidualPathReassessmentReviewReport {
  return {
    reviewId: `i228_hidden_stem_target_origin_residual_reassessment_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI228SourceKeHiddenStemInteractionEligibilityTargetOriginDiscoveryEvidenceAdequacyResidualPathReassessmentReview(
  i227: I227SourceKeHiddenStemInteractionEligibilityTargetExactTextPre2017OriginalSourceAuthorshipDiscoveryEvidenceReport,
): I228SourceKeHiddenStemInteractionEligibilityTargetOriginDiscoveryEvidenceAdequacyResidualPathReassessmentReviewReport {
  const accepted = exactI227Accepted(i227);
  return finalized({
    reviewVersion:
      I228_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_ORIGIN_DISCOVERY_EVIDENCE_ADEQUACY_RESIDUAL_PATH_REASSESSMENT_REVIEW_VERSION,
    status: accepted
      ? 'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_ORIGIN_DISCOVERY_EVIDENCE_ADEQUACY_RESIDUAL_PATH_REASSESSMENT_REVIEW'
      : 'I227_TARGET_ORIGIN_DISCOVERY_EVIDENCE_BOUNDARY_INVALID',
    decision: accepted
      ? 'I227_EVIDENCE_ADEQUATE_FOR_CURRENT_PASS_FOUR_RESIDUAL_ADMISSIBILITY_GAPS_REMAIN_EQUIVALENT_AUTOMATED_WEB_REPEAT_NOT_JUSTIFIED_HIGHER_PROVENANCE_ARCHIVAL_AUTHOR_CONTROLLED_OR_CUSTODIAN_ACQUISITION_REQUIRED_NO_WEB_EXHAUSTION_NO_PROMOTION'
      : 'TARGET_ORIGIN_DISCOVERY_EVIDENCE_REASSESSMENT_NOT_READY',
    upstreamI227EvidenceId: i227.evidenceId,
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI227BoundaryAccepted: accepted,
    targetSourceTerm: '克',
    targetScope: 'HIDDEN_STEM_EFFECTIVE_INTERACTION_ELIGIBILITY',
    targetCandidateId: accepted ? 'LI_YANCHEN_GANZHI_NINE_RELATIONS_PART2_SOHU_2017_HTML' : null,
    sevenRequirementCoverageAcceptedAsUpstreamFinding: accepted,
    coverageReevaluationAuthorizedByThisGate: false,
    I227EvidenceAdequateForCurrentPass: accepted,
    exactRarePhraseSearchExecutionAccepted: accepted,
    noPre2017ExactWitnessEstablishedInPassAccepted: accepted,
    noPre2017WitnessNonexistenceFindingAccepted: false,
    noCorpusExhaustionFindingAccepted: accepted,
    pre2017AlternateLineageContrastAccepted: accepted,
    alternateLineageMayBackfillTargetLineage: false,
    laterExactTextRedistributionAccepted: accepted,
    laterRedistributionMayEstablishPriorDependency: false,
    part1OrUpstreamAttributionStillUnresolved: accepted,
    residualAdmissibilityGapIds: accepted ? I228_RESIDUAL_ADMISSIBILITY_GAP_IDS : [],
    residualAdmissibilityGapCount: accepted ? 4 : 0,
    equivalentAutomatedWebSearchRepeatJustified: false,
    automatedWebCorpusExhaustionEstablished: false,
    automatedWebAccessFailureEstablished: false,
    materiallyNewEvidenceClassRequired: accepted,
    higherProvenanceAcquisitionPathIds: accepted ? I228_HIGHER_PROVENANCE_ACQUISITION_PATH_IDS : [],
    higherProvenanceAcquisitionPathCount: accepted ? 4 : 0,
    higherProvenanceAcquisitionReadinessReviewJustified: accepted,
    archivalSnapshotPathJustified: accepted,
    authorControlledFirstPartyPathJustified: accepted,
    originalBookCourseCanonicalWitnessPathJustified: accepted,
    custodianBoundWitnessPathJustified: accepted,
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
    negativeFindingCreatedFromSearchSilence: false,
    corpusExhaustionClaimed: false,
    quWei2001HoldPreserved: accepted,
    li1998SameTargetPathSuspendedNotRetired: accepted,
    I132IndependentNormativeProvenanceRequirementRemainsNormative: accepted,
    I132PolicyRelaxationAuthorizedByThisGate: false,
    provenanceIndependenceAdjudicatedByThisGate: false,
    derivativeRelationshipAdjudicatedByThisGate: false,
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
      ? 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_ORIGIN_HIGHER_PROVENANCE_ARCHIVAL_OR_CUSTODIAN_ACQUISITION_READINESS_REVIEW'
      : 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_ORIGIN_DISCOVERY_EVIDENCE_ADEQUACY_RESIDUAL_PATH_REASSESSMENT_REVIEW',
    notes: accepted
      ? Object.freeze([
          'I227 is adequate for its current target-specific web discovery pass, but it does not resolve any of the four admissibility gaps.',
          'Repeating equivalent automated web searches is not methodologically justified because it does not raise provenance quality.',
          'No automated-web corpus exhaustion or access-failure finding is created; materially new archival, first-party, canonical-witness or custodian evidence remains eligible.',
          'Restrictive-doctrine conflict adjudication remains deferred until the target lineage is established.',
        ])
      : Object.freeze(['I227 target-origin discovery evidence boundary was not accepted; no residual-path reassessment was performed.']),
  });
}
