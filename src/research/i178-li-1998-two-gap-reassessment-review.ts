import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { I177Li1998GapTargetedDiscoveryEvidenceReport } from './i177-li-1998-publication-medium-canonical-witness-gap-targeted-discovery-evidence.js';

export const I178_LI_1998_TWO_GAP_REASSESSMENT_REVIEW_VERSION =
  'myeonghwa-li-1998-two-gap-discovery-evidence-adequacy-rebinding-path-reassessment-review-v1';

export const I178_REASSESSMENT_REQUIREMENT_IDS = Object.freeze([
  'EXACT_I177_TWO_UNRESOLVED_GAP_EVIDENCE_BOUNDARY_REQUIRED',
  'I177_EVIDENCE_MAY_BE_ADEQUATE_FOR_UNRESOLVED_FINDINGS_WITHOUT_RESOLVING_GAPS',
  'UNRESOLVED_GAPS_MUST_NOT_BE_PROMOTED_TO_RESOLVED_OR_NEGATIVE_FINDINGS',
  '1998_PUBLICATION_IDENTITY_REQUIRES_NEW_1998_SPECIFIC_PRIMARY_OR_BIBLIOGRAPHIC_BINDING',
  'LATER_EDITION_METADATA_AND_CHRONOLOGY_COLOCATION_MUST_NOT_BACKFILL_PUBLISHER_IDENTITY',
  'CANONICAL_WITNESS_NORMALIZATION_REQUIRES_DIRECT_IMPRINT_OR_CONTENT_STRUCTURE_COMPARISON',
  'PAGE_COUNT_FILE_SIZE_FILENAME_VARIANCE_MUST_NOT_CREATE_EDITION_AUTHORITY',
  'IDENTICAL_GENERIC_SEARCH_REPETITION_WITHOUT_NEW_EVIDENCE_CLASS_MUST_NOT_BE_TREATED_AS_REMEDIATION_PROGRESS',
  'SAME_AUTHOR_1998_TO_2004_DERIVATIVE_CHAIN_AND_EXTERNAL_LINEAGE_UNRESOLVED_STATUS_MUST_REMAIN_BOUND',
  'NO_REBINDING_SELECTION_MUTATION_INDEPENDENCE_REEVALUATION_OR_POLICY_RELAXATION_AT_REASSESSMENT_STAGE',
] as const);

export type I178ReassessmentRequirementId = (typeof I178_REASSESSMENT_REQUIREMENT_IDS)[number];

export const I178_REVIEWABLE_PATH_IDS = Object.freeze([
  'DIRECT_1998_TITLE_PAGE_COPYRIGHT_PAGE_COLOPHON_OR_IMPRINT_ACQUISITION',
  'EXPLICIT_1998_LIBRARY_ARCHIVE_OR_PRIMARY_BIBLIOGRAPHIC_RECORD_ACQUISITION',
  'DIRECT_314_413_VARIANT_IMPRINT_PAGINATION_TOC_AND_CONTENT_STRUCTURE_COMPARISON',
  'GENUINELY_NEW_EXTERNAL_LINEAGE_OR_SOURCE_ORIGIN_EVIDENCE_ACQUISITION',
] as const);

export type I178ReviewablePathId = (typeof I178_REVIEWABLE_PATH_IDS)[number];

export interface I178Li1998TwoGapReassessmentReviewReport {
  reviewId: string;
  reviewVersion: string;
  status:
    | 'RESOLVED_LI_1998_TWO_GAP_DISCOVERY_EVIDENCE_ADEQUACY_REBINDING_PATH_REASSESSMENT_REVIEW'
    | 'I177_TWO_GAP_EVIDENCE_BOUNDARY_INVALID';
  decision:
    | 'TWO_GAP_DISCOVERY_EVIDENCE_ADEQUATE_FOR_TWO_UNRESOLVED_FINDINGS_REBINDING_NOT_READY_NO_EXHAUSTION_NO_POLICY_RELAXATION_DIRECT_PRIMARY_WITNESS_OR_VARIANT_NORMALIZATION_READINESS_REVIEW_MAY_PROCEED'
    | 'LI_1998_TWO_GAP_REASSESSMENT_NOT_READY';
  upstreamI177EvidenceRecordSetId: string;
  policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy';
  policyVersion: 'v1-definition';
  adoptionVersion: 'v1-adoption';
  currentCandidateSetVersion: 'v1-candidate-set';
  currentInputPackageVersion: 'v2-input-package';
  exactI177BoundaryAccepted: boolean;
  assessedGapCount: 2 | 0;
  unresolvedFindingCount: 2 | 0;
  explicitNegativeFindingCount: 0;
  evidenceAdequateForRecordedUnresolvedFindings: boolean;
  publicationMediumOrEntityGapResolved: false;
  canonicalDigitalWitnessNormalizationGapResolved: false;
  completePriorWitnessIdentityAdequacyEstablished: false;
  evidenceRebindingMethodologicallyReady: false;
  evidenceRebindingAuthorizedByThisGate: false;
  evidenceRebindingSelectedByThisGate: false;
  evidenceRebindingExecutedByThisGate: false;
  targetedDiscoveryExhaustionEstablished: false;
  corpusExhaustionEstablished: false;
  universalNoFurtherEvidenceClaimEstablished: false;
  identicalGenericSearchRepetitionCountsAsRemediationProgress: false;
  genuinelyNewEvidenceClassRequiredForFurtherSameTargetDiscovery: boolean;
  direct1998PrimaryWitnessOrBibliographicBindingStillReviewable: boolean;
  directVariantStructureComparisonStillReviewable: boolean;
  reviewablePathIds: readonly I178ReviewablePathId[];
  reviewablePathCount: 4 | 0;
  reviewablePathSelectedByThisGate: false;
  directPrimaryWitnessVariantNormalizationReadinessReviewMethodologicallyJustified: boolean;
  directPrimaryWitnessVariantNormalizationReadinessReviewAuthorized: boolean;
  reassessmentRequirementIds: readonly I178ReassessmentRequirementId[];
  reassessmentRequirementCount: 10;
  reassessmentRequirementsFrozen: boolean;
  chronologyCoLocationEstablishes1998PublisherIdentity: false;
  later2002MetadataMayBackfill1998Identity: false;
  ambiguousUploaderMetadataMayResolve1998PublicationStatus: false;
  pageCountDifferenceAloneCreatesDistinctEdition: false;
  fileSizeDifferenceAloneCreatesDistinctEdition: false;
  filenameDifferenceAloneCreatesDistinctEdition: false;
  searchSilenceCreatesNegativeFinding: false;
  current2004WitnessPresumedOriginRetired: boolean;
  prior1998SameAuthorWitnessConfirmed: boolean;
  prior1998WitnessIndependentProvenanceEstablished: false;
  sameAuthor1998To2004DerivativeChainMustRemainBound: boolean;
  externalLineageUnresolvedQuestionCount: 3 | 0;
  externalLineageUnresolvedStatusPreserved: boolean;
  provenanceIndependenceAdjudicatedByThisGate: false;
  independentNormativeProvenanceEstablishedCount: 0;
  I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate: false;
  I132IndependentNormativeProvenanceRequirementRemainsNormative: boolean;
  I132PolicyRelaxationAuthorizedByThisGate: false;
  sourceCountVotingAllowed: false;
  provenanceTierWeightingAllowed: false;
  candidateSelectedByThisGate: false;
  remediationStrategySelectedByThisGate: false;
  remediationExecutionAuthorizedByThisGate: false;
  candidateSetMutatedByThisGate: false;
  candidateRemovedByThisGate: false;
  candidateReplacedByThisGate: false;
  newCandidateSetVersionCreatedByThisGate: false;
  newInputPackageVersionCreatedByThisGate: false;
  currentV2PackageAndCandidateSetRemainImmutable: boolean;
  currentV2ProvenanceDisposition: 'BLOCKED_UNDER_CURRENT_EVIDENCE' | 'NOT_ASSESSED';
  candidateSetReevaluationAuthorizedByThisGate: false;
  candidateSetAdmissibilityEstablishedByThisGate: false;
  productionPolicyExecutionAuthorized: false;
  actualCompositionPerformedByThisGate: false;
  multiSourceCompositionAuthorized: false;
  authorityAcquiredByThisGate: false;
  visibleStemBinaryEffectiveInteractionEligibilityResolved: false;
  thresholdRuleCreatedByThisGate: false;
  damageEvaluationAuthorized: false;
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  hiddenStemInteractionEligibilityGapRemains: true;
  hiddenStemAuthorityGap: 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED';
  recommendedNextGate:
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_1998_DIRECT_PRIMARY_WITNESS_AND_VARIANT_NORMALIZATION_EVIDENCE_ACQUISITION_READINESS_REVIEW'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_1998_TWO_GAP_DISCOVERY_EXHAUSTION_AND_REBINDING_PATH_REASSESSMENT_REVIEW';
  notes: readonly string[];
}

function exactI177Accepted(i177: I177Li1998GapTargetedDiscoveryEvidenceReport): boolean {
  return (
    i177.status === 'RESOLVED_LI_1998_PUBLICATION_MEDIUM_CANONICAL_WITNESS_GAP_TARGETED_DISCOVERY_EVIDENCE' &&
    i177.decision ===
      'BOUNDED_TWO_GAP_DISCOVERY_EXECUTED_PUBLICATION_MEDIUM_AND_CANONICAL_WITNESS_NORMALIZATION_BOTH_REMAIN_UNRESOLVED_NO_EXPLICIT_NEGATIVE_NO_REBINDING_NO_INDEPENDENCE' &&
    i177.policyId === 'myeonghwa-visible-stem-ke-multi-source-composition-policy' &&
    i177.policyVersion === 'v1-definition' &&
    i177.adoptionVersion === 'v1-adoption' &&
    i177.currentCandidateSetVersion === 'v1-candidate-set' &&
    i177.currentInputPackageVersion === 'v2-input-package' &&
    i177.exactI176BoundaryAccepted &&
    i177.targetedGapCount === 2 &&
    i177.resolvedGapCount === 0 &&
    i177.unresolvedGapCount === 2 &&
    i177.explicitNegativeFindingCount === 0 &&
    i177.gapEvidenceRecords.length === 2 &&
    i177.gapEvidenceRecords[0]?.targetGapId === 'LI_1998_PUBLICATION_MEDIUM_OR_ENTITY_IDENTITY_GAP' &&
    i177.gapEvidenceRecords[0]?.finding === 'UNRESOLVED_AFTER_BOUNDED_TARGETED_DISCOVERY' &&
    i177.gapEvidenceRecords[1]?.targetGapId === 'LI_1998_CANONICAL_DIGITAL_WITNESS_NORMALIZATION_GAP' &&
    i177.gapEvidenceRecords[1]?.finding === 'UNRESOLVED_AFTER_BOUNDED_TARGETED_DISCOVERY' &&
    i177.official1998AppearanceRecordObserved &&
    i177.official1998CompanyCreationRecordObserved &&
    i177.companyCreationAndBookAppearanceCoLocatedInChronology &&
    i177.official1998PublisherOrIssuingEntityBound === false &&
    i177.companyMayBeInferredAs1998PublisherFromChronologyCoLocation === false &&
    i177.formal1998PublisherOrIsbnEstablished === false &&
    i177.explicit1998NonformalPublicationStatusEstablished === false &&
    i177.later2002FormalEditionObserved &&
    i177.later2002FormalEditionMayBackfill1998 === false &&
    i177.ambiguousUploaderFieldObserved &&
    i177.ambiguousUploaderFieldRoleDisambiguatedAsPublicationStatus === false &&
    i177.ambiguousUploaderFieldResolves1998PublicationMedium === false &&
    i177.digital314PageRepresentationObserved &&
    i177.digital413PageRepresentationObserved &&
    i177.multipleFileSizeRepresentationsObserved &&
    i177.observedRepresentationPageCounts.length === 2 &&
    i177.observedRepresentationPageCounts[0] === 314 &&
    i177.observedRepresentationPageCounts[1] === 413 &&
    i177.titleAuthorAndTargetContentContinuityObservedAcrossPublicWitnesses &&
    i177.titleOrImprintPageComparisonCompletedAcrossVariants === false &&
    i177.editionSpecificAdditionDeletionReorderingComparisonCompleted === false &&
    i177.canonicalDigitalWitnessEstablished === false &&
    i177.normalizedWitnessFamilyEstablished === false &&
    i177.allObservedDigitalVariantRelationshipsExplicitlyResolved === false &&
    i177.pageCountDifferenceAloneCreatesDistinctEdition === false &&
    i177.fileSizeDifferenceAloneCreatesDistinctEdition === false &&
    i177.filenameDifferenceAloneCreatesDistinctEdition === false &&
    i177.searchSilenceCreatesNegativeFinding === false &&
    i177.targetedDiscoveryExhaustionEstablished === false &&
    i177.evidenceRebindingMethodologicallyReadyByThisGate === false &&
    i177.evidenceRebindingAuthorizedByThisGate === false &&
    i177.evidenceRebindingSelectedByThisGate === false &&
    i177.evidenceRebindingExecutedByThisGate === false &&
    i177.candidateSelectedByThisGate === false &&
    i177.remediationStrategySelectedByThisGate === false &&
    i177.remediationExecutionAuthorizedByThisGate === false &&
    i177.candidateSetMutatedByThisGate === false &&
    i177.newCandidateSetVersionCreatedByThisGate === false &&
    i177.newInputPackageVersionCreatedByThisGate === false &&
    i177.provenanceIndependenceAdjudicatedByThisGate === false &&
    i177.independentNormativeProvenanceEstablishedCount === 0 &&
    i177.I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate === false &&
    i177.I132IndependentNormativeProvenanceRequirementRemainsNormative &&
    i177.I132PolicyRelaxationAuthorizedByThisGate === false &&
    i177.sourceCountVotingAllowed === false &&
    i177.provenanceTierWeightingAllowed === false &&
    i177.current2004WitnessPresumedOriginRetired &&
    i177.prior1998SameAuthorWitnessConfirmed &&
    i177.prior1998WitnessIndependentProvenanceEstablished === false &&
    i177.sameAuthor1998To2004DerivativeChainMustRemainBound &&
    i177.externalLineageUnresolvedQuestionCount === 3 &&
    i177.externalLineageUnresolvedStatusPreserved &&
    i177.currentV2PackageAndCandidateSetRemainImmutable &&
    i177.currentV2ProvenanceDisposition === 'BLOCKED_UNDER_CURRENT_EVIDENCE' &&
    i177.candidateSetReevaluationAuthorizedByThisGate === false &&
    i177.candidateSetAdmissibilityEstablishedByThisGate === false &&
    i177.productionPolicyExecutionAuthorized === false &&
    i177.actualCompositionPerformedByThisGate === false &&
    i177.multiSourceCompositionAuthorized === false &&
    i177.authorityAcquiredByThisGate === false &&
    i177.visibleStemBinaryEffectiveInteractionEligibilityResolved === false &&
    i177.thresholdRuleCreatedByThisGate === false &&
    i177.damageEvaluationAuthorized === false &&
    i177.classificationAuthorized === false &&
    i177.numericScoringAuthorized === false &&
    i177.hiddenStemInteractionEligibilityGapRemains &&
    i177.hiddenStemAuthorityGap === 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED' &&
    i177.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_1998_TWO_GAP_DISCOVERY_EXHAUSTION_AND_REBINDING_PATH_REASSESSMENT_REVIEW'
  );
}

function finalized(
  material: Omit<I178Li1998TwoGapReassessmentReviewReport, 'reviewId'>,
): I178Li1998TwoGapReassessmentReviewReport {
  return {
    reviewId: `i178_li_1998_two_gap_reassessment_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI178Li1998TwoGapReassessmentReview(
  i177: I177Li1998GapTargetedDiscoveryEvidenceReport,
): I178Li1998TwoGapReassessmentReviewReport {
  const accepted = exactI177Accepted(i177);

  return finalized({
    reviewVersion: I178_LI_1998_TWO_GAP_REASSESSMENT_REVIEW_VERSION,
    status: accepted
      ? 'RESOLVED_LI_1998_TWO_GAP_DISCOVERY_EVIDENCE_ADEQUACY_REBINDING_PATH_REASSESSMENT_REVIEW'
      : 'I177_TWO_GAP_EVIDENCE_BOUNDARY_INVALID',
    decision: accepted
      ? 'TWO_GAP_DISCOVERY_EVIDENCE_ADEQUATE_FOR_TWO_UNRESOLVED_FINDINGS_REBINDING_NOT_READY_NO_EXHAUSTION_NO_POLICY_RELAXATION_DIRECT_PRIMARY_WITNESS_OR_VARIANT_NORMALIZATION_READINESS_REVIEW_MAY_PROCEED'
      : 'LI_1998_TWO_GAP_REASSESSMENT_NOT_READY',
    upstreamI177EvidenceRecordSetId: i177.evidenceRecordSetId,
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI177BoundaryAccepted: accepted,
    assessedGapCount: accepted ? 2 : 0,
    unresolvedFindingCount: accepted ? 2 : 0,
    explicitNegativeFindingCount: 0,
    evidenceAdequateForRecordedUnresolvedFindings: accepted,
    publicationMediumOrEntityGapResolved: false,
    canonicalDigitalWitnessNormalizationGapResolved: false,
    completePriorWitnessIdentityAdequacyEstablished: false,
    evidenceRebindingMethodologicallyReady: false,
    evidenceRebindingAuthorizedByThisGate: false,
    evidenceRebindingSelectedByThisGate: false,
    evidenceRebindingExecutedByThisGate: false,
    targetedDiscoveryExhaustionEstablished: false,
    corpusExhaustionEstablished: false,
    universalNoFurtherEvidenceClaimEstablished: false,
    identicalGenericSearchRepetitionCountsAsRemediationProgress: false,
    genuinelyNewEvidenceClassRequiredForFurtherSameTargetDiscovery: accepted,
    direct1998PrimaryWitnessOrBibliographicBindingStillReviewable: accepted,
    directVariantStructureComparisonStillReviewable: accepted,
    reviewablePathIds: accepted ? I178_REVIEWABLE_PATH_IDS : Object.freeze([]),
    reviewablePathCount: accepted ? 4 : 0,
    reviewablePathSelectedByThisGate: false,
    directPrimaryWitnessVariantNormalizationReadinessReviewMethodologicallyJustified: accepted,
    directPrimaryWitnessVariantNormalizationReadinessReviewAuthorized: accepted,
    reassessmentRequirementIds: I178_REASSESSMENT_REQUIREMENT_IDS,
    reassessmentRequirementCount: 10,
    reassessmentRequirementsFrozen: accepted,
    chronologyCoLocationEstablishes1998PublisherIdentity: false,
    later2002MetadataMayBackfill1998Identity: false,
    ambiguousUploaderMetadataMayResolve1998PublicationStatus: false,
    pageCountDifferenceAloneCreatesDistinctEdition: false,
    fileSizeDifferenceAloneCreatesDistinctEdition: false,
    filenameDifferenceAloneCreatesDistinctEdition: false,
    searchSilenceCreatesNegativeFinding: false,
    current2004WitnessPresumedOriginRetired: accepted,
    prior1998SameAuthorWitnessConfirmed: accepted,
    prior1998WitnessIndependentProvenanceEstablished: false,
    sameAuthor1998To2004DerivativeChainMustRemainBound: accepted,
    externalLineageUnresolvedQuestionCount: accepted ? 3 : 0,
    externalLineageUnresolvedStatusPreserved: accepted,
    provenanceIndependenceAdjudicatedByThisGate: false,
    independentNormativeProvenanceEstablishedCount: 0,
    I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate: false,
    I132IndependentNormativeProvenanceRequirementRemainsNormative: accepted,
    I132PolicyRelaxationAuthorizedByThisGate: false,
    sourceCountVotingAllowed: false,
    provenanceTierWeightingAllowed: false,
    candidateSelectedByThisGate: false,
    remediationStrategySelectedByThisGate: false,
    remediationExecutionAuthorizedByThisGate: false,
    candidateSetMutatedByThisGate: false,
    candidateRemovedByThisGate: false,
    candidateReplacedByThisGate: false,
    newCandidateSetVersionCreatedByThisGate: false,
    newInputPackageVersionCreatedByThisGate: false,
    currentV2PackageAndCandidateSetRemainImmutable: accepted,
    currentV2ProvenanceDisposition: accepted ? 'BLOCKED_UNDER_CURRENT_EVIDENCE' : 'NOT_ASSESSED',
    candidateSetReevaluationAuthorizedByThisGate: false,
    candidateSetAdmissibilityEstablishedByThisGate: false,
    productionPolicyExecutionAuthorized: false,
    actualCompositionPerformedByThisGate: false,
    multiSourceCompositionAuthorized: false,
    authorityAcquiredByThisGate: false,
    visibleStemBinaryEffectiveInteractionEligibilityResolved: false,
    thresholdRuleCreatedByThisGate: false,
    damageEvaluationAuthorized: false,
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    hiddenStemInteractionEligibilityGapRemains: true,
    hiddenStemAuthorityGap: 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED',
    recommendedNextGate: accepted
      ? 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_1998_DIRECT_PRIMARY_WITNESS_AND_VARIANT_NORMALIZATION_EVIDENCE_ACQUISITION_READINESS_REVIEW'
      : 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_1998_TWO_GAP_DISCOVERY_EXHAUSTION_AND_REBINDING_PATH_REASSESSMENT_REVIEW',
    notes: accepted
      ? Object.freeze([
          'I177 is adequate to support two unresolved findings; adequacy for an unresolved finding does not resolve the underlying identity function.',
          'Evidence rebinding remains methodologically not ready because neither the 1998 publication-medium/issuing-entity identity nor canonical digital-witness normalization is resolved.',
          'Repeating the same generic web-search pattern without a genuinely new evidence class must not be counted as remediation progress; the next justified review is limited to direct primary witness/bibliographic capture or actual cross-variant structural normalization evidence.',
          'No corpus exhaustion, independence, candidate mutation, threshold creation, or production authorization is established by I178.',
        ])
      : Object.freeze(['I177 boundary mismatch prevents the two-gap reassessment review.']),
  });
}
