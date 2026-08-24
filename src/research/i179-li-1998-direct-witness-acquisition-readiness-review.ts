import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { I178Li1998TwoGapReassessmentReviewReport } from './i178-li-1998-two-gap-reassessment-review.js';

export const I179_LI_1998_DIRECT_WITNESS_ACQUISITION_READINESS_REVIEW_VERSION =
  'myeonghwa-li-1998-direct-primary-witness-variant-normalization-evidence-acquisition-readiness-review-v1';

export const I179_ACQUISITION_REQUIREMENT_IDS = Object.freeze([
  'EXACT_I178_REASSESSMENT_BOUNDARY_REQUIRED',
  'TWO_ACQUISITION_LANES_MUST_REMAIN_SEPARATE_UNTIL_EACH_GAP_IS_RESOLVED',
  'PUBLICATION_IDENTITY_EVIDENCE_MUST_BIND_EXPLICITLY_TO_THE_1998_WORK_OR_1998_WITNESS',
  'FORMAL_PUBLICATION_PATH_MAY_USE_DIRECT_IMPRINT_COLOPHON_LIBRARY_OR_ARCHIVE_AUTHORITY_RECORD',
  'NONFORMAL_PUBLICATION_PATH_REQUIRES_EXPLICIT_DATED_SELF_ISSUED_COURSE_MANUSCRIPT_OR_DISTRIBUTION_STATUS_EVIDENCE',
  'LATER_EDITION_METADATA_COMPANY_CHRONOLOGY_AND_AMBIGUOUS_UPLOAD_FIELDS_MUST_NOT_BACKFILL_1998',
  'VARIANT_NORMALIZATION_REQUIRES_DIRECT_ACCESS_TO_COMPARABLE_314_AND_413_REPRESENTATIONS_OR_EQUIVALENT_PRIMARY_PAGE_SETS',
  'VARIANT_COMPARISON_MUST_INCLUDE_TITLE_IMPRINT_PAGINATION_TOC_TARGET_PASSAGE_AND_STRUCTURAL_CHANGE_CHECKS',
  'CRYPTOGRAPHIC_OR_STABLE_FILE_IDENTITY_SHOULD_BE_RECORDED_WHEN_ACTUAL_DIGITAL_FILES_ARE_ACQUIRED',
  'OCR_SEARCH_SNIPPETS_PAGE_COUNT_FILE_SIZE_AND_FILENAME_ALONE_MUST_NOT_RESOLVE_VARIANT_RELATIONSHIPS',
  'RESOLUTION_OF_ONLY_ONE_LANE_MUST_NOT_AUTHORIZE_REBINDING',
  'NO_SELECTION_MUTATION_INDEPENDENCE_REEVALUATION_OR_POLICY_RELAXATION_AT_READINESS_STAGE',
] as const);

export type I179AcquisitionRequirementId = (typeof I179_ACQUISITION_REQUIREMENT_IDS)[number];

export const I179_PUBLICATION_IDENTITY_EVIDENCE_CLASSES = Object.freeze([
  '1998_TITLE_PAGE_COPYRIGHT_PAGE_COLOPHON_OR_IMPRINT_IMAGE',
  '1998_LIBRARY_ARCHIVE_OR_BIBLIOGRAPHIC_AUTHORITY_RECORD_WITH_EXPLICIT_PUBLICATION_FIELDS',
  '1998_PUBLISHER_ISSUER_DISTRIBUTOR_OR_AUTHOR_PRIMARY_RECORD_EXPLICITLY_BINDING_THE_WORK',
  '1998_DATED_NONFORMAL_SELF_ISSUED_COURSE_MANUSCRIPT_OR_DISTRIBUTION_STATUS_RECORD',
] as const);

export type I179PublicationIdentityEvidenceClass =
  (typeof I179_PUBLICATION_IDENTITY_EVIDENCE_CLASSES)[number];

export const I179_VARIANT_NORMALIZATION_EVIDENCE_CLASSES = Object.freeze([
  'DIRECT_314_PAGE_DIGITAL_OR_PAGE_IMAGE_WITNESS',
  'DIRECT_413_PAGE_DIGITAL_OR_PAGE_IMAGE_WITNESS',
  'COMPARATIVE_TITLE_IMPRINT_AND_COPYRIGHT_PAGE_RECORD',
  'COMPARATIVE_TOC_PAGINATION_AND_TARGET_PASSAGE_RECORD',
  'COMPARATIVE_ADDITION_DELETION_REORDERING_AND_SCAN_ARTIFACT_RECORD',
  'CRYPTOGRAPHIC_HASH_OR_STABLE_FILE_IDENTITY_RECORD',
] as const);

export type I179VariantNormalizationEvidenceClass =
  (typeof I179_VARIANT_NORMALIZATION_EVIDENCE_CLASSES)[number];

export interface I179Li1998DirectWitnessAcquisitionReadinessReviewReport {
  reviewId: string;
  reviewVersion: string;
  status:
    | 'RESOLVED_LI_1998_DIRECT_PRIMARY_WITNESS_VARIANT_NORMALIZATION_EVIDENCE_ACQUISITION_READINESS_REVIEW'
    | 'I178_REASSESSMENT_BOUNDARY_INVALID';
  decision:
    | 'DIRECT_PRIMARY_WITNESS_AND_VARIANT_NORMALIZATION_ACQUISITION_PROTOCOL_FROZEN_TWO_LANES_READY_NO_EVIDENCE_ACQUIRED_NO_REBINDING_NO_INDEPENDENCE'
    | 'LI_1998_DIRECT_WITNESS_ACQUISITION_READINESS_NOT_ESTABLISHED';
  upstreamI178ReviewId: string;
  policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy';
  policyVersion: 'v1-definition';
  adoptionVersion: 'v1-adoption';
  currentCandidateSetVersion: 'v1-candidate-set';
  currentInputPackageVersion: 'v2-input-package';
  exactI178BoundaryAccepted: boolean;
  acquisitionLaneCount: 2 | 0;
  publicationIdentityLaneReady: boolean;
  variantNormalizationLaneReady: boolean;
  publicationIdentityEvidenceClasses: readonly I179PublicationIdentityEvidenceClass[];
  publicationIdentityEvidenceClassCount: 4;
  variantNormalizationEvidenceClasses: readonly I179VariantNormalizationEvidenceClass[];
  variantNormalizationEvidenceClassCount: 6;
  acquisitionRequirementIds: readonly I179AcquisitionRequirementId[];
  acquisitionRequirementCount: 12;
  acquisitionRequirementsFrozenProspectively: boolean;
  formalAndNonformalPublicationPathsBothPermitted: boolean;
  explicit1998BindingRequired: boolean;
  later2002MetadataMayBackfill1998Identity: false;
  companyChronologyMayEstablish1998PublisherIdentity: false;
  ambiguousUploaderFieldMayResolve1998PublicationStatus: false;
  directComparableVariantAccessRequired: boolean;
  titleImprintPaginationTocTargetPassageAndStructuralComparisonRequired: boolean;
  stableFileIdentityRecordRequiredWhenAvailable: boolean;
  OCRSnippetAloneMayResolveVariantRelationship: false;
  pageCountAloneMayResolveVariantRelationship: false;
  fileSizeAloneMayResolveVariantRelationship: false;
  filenameAloneMayResolveVariantRelationship: false;
  oneLaneResolutionSufficientForRebinding: false;
  bothIdentityFunctionsRequiredBeforeRebindingReadiness: boolean;
  evidenceAcquisitionExecutedByThisGate: false;
  publicationIdentityEvidenceAcquiredCount: 0;
  variantNormalizationEvidenceAcquiredCount: 0;
  publicationMediumOrEntityGapResolvedByThisGate: false;
  canonicalDigitalWitnessNormalizationGapResolvedByThisGate: false;
  evidenceRebindingMethodologicallyReady: false;
  evidenceRebindingAuthorizedByThisGate: false;
  evidenceRebindingSelectedByThisGate: false;
  evidenceRebindingExecutedByThisGate: false;
  candidateSelectedByThisGate: false;
  remediationStrategySelectedByThisGate: false;
  remediationExecutionAuthorizedByThisGate: false;
  candidateSetMutatedByThisGate: false;
  candidateRemovedByThisGate: false;
  candidateReplacedByThisGate: false;
  newCandidateSetVersionCreatedByThisGate: false;
  newInputPackageVersionCreatedByThisGate: false;
  targetedDiscoveryExhaustionEstablished: false;
  corpusExhaustionEstablished: false;
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
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_1998_DIRECT_PRIMARY_WITNESS_AND_VARIANT_NORMALIZATION_EVIDENCE_ACQUISITION_RECORD'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_1998_DIRECT_PRIMARY_WITNESS_AND_VARIANT_NORMALIZATION_EVIDENCE_ACQUISITION_READINESS_REVIEW';
  notes: readonly string[];
}

function exactI178Accepted(i178: I178Li1998TwoGapReassessmentReviewReport): boolean {
  return (
    i178.status === 'RESOLVED_LI_1998_TWO_GAP_DISCOVERY_EVIDENCE_ADEQUACY_REBINDING_PATH_REASSESSMENT_REVIEW' &&
    i178.decision ===
      'TWO_GAP_DISCOVERY_EVIDENCE_ADEQUATE_FOR_TWO_UNRESOLVED_FINDINGS_REBINDING_NOT_READY_NO_EXHAUSTION_NO_POLICY_RELAXATION_DIRECT_PRIMARY_WITNESS_OR_VARIANT_NORMALIZATION_READINESS_REVIEW_MAY_PROCEED' &&
    i178.policyId === 'myeonghwa-visible-stem-ke-multi-source-composition-policy' &&
    i178.policyVersion === 'v1-definition' &&
    i178.adoptionVersion === 'v1-adoption' &&
    i178.currentCandidateSetVersion === 'v1-candidate-set' &&
    i178.currentInputPackageVersion === 'v2-input-package' &&
    i178.exactI177BoundaryAccepted &&
    i178.assessedGapCount === 2 &&
    i178.unresolvedFindingCount === 2 &&
    i178.explicitNegativeFindingCount === 0 &&
    i178.evidenceAdequateForRecordedUnresolvedFindings &&
    i178.publicationMediumOrEntityGapResolved === false &&
    i178.canonicalDigitalWitnessNormalizationGapResolved === false &&
    i178.completePriorWitnessIdentityAdequacyEstablished === false &&
    i178.evidenceRebindingMethodologicallyReady === false &&
    i178.evidenceRebindingAuthorizedByThisGate === false &&
    i178.evidenceRebindingSelectedByThisGate === false &&
    i178.evidenceRebindingExecutedByThisGate === false &&
    i178.targetedDiscoveryExhaustionEstablished === false &&
    i178.corpusExhaustionEstablished === false &&
    i178.universalNoFurtherEvidenceClaimEstablished === false &&
    i178.identicalGenericSearchRepetitionCountsAsRemediationProgress === false &&
    i178.genuinelyNewEvidenceClassRequiredForFurtherSameTargetDiscovery &&
    i178.direct1998PrimaryWitnessOrBibliographicBindingStillReviewable &&
    i178.directVariantStructureComparisonStillReviewable &&
    i178.reviewablePathCount === 4 &&
    i178.reviewablePathSelectedByThisGate === false &&
    i178.directPrimaryWitnessVariantNormalizationReadinessReviewMethodologicallyJustified &&
    i178.directPrimaryWitnessVariantNormalizationReadinessReviewAuthorized &&
    i178.reassessmentRequirementCount === 10 &&
    i178.reassessmentRequirementsFrozen &&
    i178.chronologyCoLocationEstablishes1998PublisherIdentity === false &&
    i178.later2002MetadataMayBackfill1998Identity === false &&
    i178.ambiguousUploaderMetadataMayResolve1998PublicationStatus === false &&
    i178.pageCountDifferenceAloneCreatesDistinctEdition === false &&
    i178.fileSizeDifferenceAloneCreatesDistinctEdition === false &&
    i178.filenameDifferenceAloneCreatesDistinctEdition === false &&
    i178.searchSilenceCreatesNegativeFinding === false &&
    i178.current2004WitnessPresumedOriginRetired &&
    i178.prior1998SameAuthorWitnessConfirmed &&
    i178.prior1998WitnessIndependentProvenanceEstablished === false &&
    i178.sameAuthor1998To2004DerivativeChainMustRemainBound &&
    i178.externalLineageUnresolvedQuestionCount === 3 &&
    i178.externalLineageUnresolvedStatusPreserved &&
    i178.provenanceIndependenceAdjudicatedByThisGate === false &&
    i178.independentNormativeProvenanceEstablishedCount === 0 &&
    i178.I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate === false &&
    i178.I132IndependentNormativeProvenanceRequirementRemainsNormative &&
    i178.I132PolicyRelaxationAuthorizedByThisGate === false &&
    i178.sourceCountVotingAllowed === false &&
    i178.provenanceTierWeightingAllowed === false &&
    i178.candidateSelectedByThisGate === false &&
    i178.remediationStrategySelectedByThisGate === false &&
    i178.remediationExecutionAuthorizedByThisGate === false &&
    i178.candidateSetMutatedByThisGate === false &&
    i178.newCandidateSetVersionCreatedByThisGate === false &&
    i178.newInputPackageVersionCreatedByThisGate === false &&
    i178.currentV2PackageAndCandidateSetRemainImmutable &&
    i178.currentV2ProvenanceDisposition === 'BLOCKED_UNDER_CURRENT_EVIDENCE' &&
    i178.candidateSetReevaluationAuthorizedByThisGate === false &&
    i178.candidateSetAdmissibilityEstablishedByThisGate === false &&
    i178.productionPolicyExecutionAuthorized === false &&
    i178.actualCompositionPerformedByThisGate === false &&
    i178.multiSourceCompositionAuthorized === false &&
    i178.authorityAcquiredByThisGate === false &&
    i178.visibleStemBinaryEffectiveInteractionEligibilityResolved === false &&
    i178.thresholdRuleCreatedByThisGate === false &&
    i178.damageEvaluationAuthorized === false &&
    i178.classificationAuthorized === false &&
    i178.numericScoringAuthorized === false &&
    i178.hiddenStemInteractionEligibilityGapRemains &&
    i178.hiddenStemAuthorityGap === 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED' &&
    i178.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_1998_DIRECT_PRIMARY_WITNESS_AND_VARIANT_NORMALIZATION_EVIDENCE_ACQUISITION_READINESS_REVIEW'
  );
}

function finalized(
  material: Omit<I179Li1998DirectWitnessAcquisitionReadinessReviewReport, 'reviewId'>,
): I179Li1998DirectWitnessAcquisitionReadinessReviewReport {
  return {
    reviewId: `i179_li_1998_direct_witness_readiness_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI179Li1998DirectWitnessAcquisitionReadinessReview(
  i178: I178Li1998TwoGapReassessmentReviewReport,
): I179Li1998DirectWitnessAcquisitionReadinessReviewReport {
  const accepted = exactI178Accepted(i178);

  return finalized({
    reviewVersion: I179_LI_1998_DIRECT_WITNESS_ACQUISITION_READINESS_REVIEW_VERSION,
    status: accepted
      ? 'RESOLVED_LI_1998_DIRECT_PRIMARY_WITNESS_VARIANT_NORMALIZATION_EVIDENCE_ACQUISITION_READINESS_REVIEW'
      : 'I178_REASSESSMENT_BOUNDARY_INVALID',
    decision: accepted
      ? 'DIRECT_PRIMARY_WITNESS_AND_VARIANT_NORMALIZATION_ACQUISITION_PROTOCOL_FROZEN_TWO_LANES_READY_NO_EVIDENCE_ACQUIRED_NO_REBINDING_NO_INDEPENDENCE'
      : 'LI_1998_DIRECT_WITNESS_ACQUISITION_READINESS_NOT_ESTABLISHED',
    upstreamI178ReviewId: i178.reviewId,
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI178BoundaryAccepted: accepted,
    acquisitionLaneCount: accepted ? 2 : 0,
    publicationIdentityLaneReady: accepted,
    variantNormalizationLaneReady: accepted,
    publicationIdentityEvidenceClasses: I179_PUBLICATION_IDENTITY_EVIDENCE_CLASSES,
    publicationIdentityEvidenceClassCount: 4,
    variantNormalizationEvidenceClasses: I179_VARIANT_NORMALIZATION_EVIDENCE_CLASSES,
    variantNormalizationEvidenceClassCount: 6,
    acquisitionRequirementIds: I179_ACQUISITION_REQUIREMENT_IDS,
    acquisitionRequirementCount: 12,
    acquisitionRequirementsFrozenProspectively: accepted,
    formalAndNonformalPublicationPathsBothPermitted: accepted,
    explicit1998BindingRequired: accepted,
    later2002MetadataMayBackfill1998Identity: false,
    companyChronologyMayEstablish1998PublisherIdentity: false,
    ambiguousUploaderFieldMayResolve1998PublicationStatus: false,
    directComparableVariantAccessRequired: accepted,
    titleImprintPaginationTocTargetPassageAndStructuralComparisonRequired: accepted,
    stableFileIdentityRecordRequiredWhenAvailable: accepted,
    OCRSnippetAloneMayResolveVariantRelationship: false,
    pageCountAloneMayResolveVariantRelationship: false,
    fileSizeAloneMayResolveVariantRelationship: false,
    filenameAloneMayResolveVariantRelationship: false,
    oneLaneResolutionSufficientForRebinding: false,
    bothIdentityFunctionsRequiredBeforeRebindingReadiness: accepted,
    evidenceAcquisitionExecutedByThisGate: false,
    publicationIdentityEvidenceAcquiredCount: 0,
    variantNormalizationEvidenceAcquiredCount: 0,
    publicationMediumOrEntityGapResolvedByThisGate: false,
    canonicalDigitalWitnessNormalizationGapResolvedByThisGate: false,
    evidenceRebindingMethodologicallyReady: false,
    evidenceRebindingAuthorizedByThisGate: false,
    evidenceRebindingSelectedByThisGate: false,
    evidenceRebindingExecutedByThisGate: false,
    candidateSelectedByThisGate: false,
    remediationStrategySelectedByThisGate: false,
    remediationExecutionAuthorizedByThisGate: false,
    candidateSetMutatedByThisGate: false,
    candidateRemovedByThisGate: false,
    candidateReplacedByThisGate: false,
    newCandidateSetVersionCreatedByThisGate: false,
    newInputPackageVersionCreatedByThisGate: false,
    targetedDiscoveryExhaustionEstablished: false,
    corpusExhaustionEstablished: false,
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
      ? 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_1998_DIRECT_PRIMARY_WITNESS_AND_VARIANT_NORMALIZATION_EVIDENCE_ACQUISITION_RECORD'
      : 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_1998_DIRECT_PRIMARY_WITNESS_AND_VARIANT_NORMALIZATION_EVIDENCE_ACQUISITION_READINESS_REVIEW',
    notes: accepted
      ? Object.freeze([
          'I179 freezes two independent acquisition lanes: 1998 publication identity and direct digital-variant normalization; neither lane is deemed resolved at readiness time.',
          'Formal and explicitly documented nonformal 1998 publication paths are both admissible, but both require an explicit 1998-specific binding rather than later-edition or chronology inference.',
          'Variant normalization requires direct comparable witness material and structural comparison; snippets, page counts, file sizes, and filenames alone cannot resolve edition or scan relationships.',
          'No evidence acquisition, rebinding, independence adjudication, candidate mutation, threshold creation, or production authorization occurs in I179.',
        ])
      : Object.freeze(['I178 boundary mismatch prevents freezing the direct-witness acquisition protocol.']),
  });
}
