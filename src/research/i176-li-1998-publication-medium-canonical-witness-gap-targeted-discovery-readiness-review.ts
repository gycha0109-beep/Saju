import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { I175Li1998IdentityEvidenceAdequacyRebindingReadinessReviewReport } from './i175-li-1998-prior-witness-identity-evidence-adequacy-rebinding-readiness-review.js';

export const I176_LI_1998_GAP_TARGETED_DISCOVERY_READINESS_REVIEW_VERSION =
  'myeonghwa-li-1998-publication-medium-canonical-witness-gap-targeted-discovery-readiness-review-v1';

export const I176_DISCOVERY_CONTROL_IDS = Object.freeze([
  'EXACT_I175_TWO_GAP_BOUNDARY_REQUIRED',
  'DISCOVERY_MUST_REMAIN_LIMITED_TO_TWO_REGISTERED_GAPS',
  'PUBLICATION_MEDIUM_FINDING_REQUIRES_1998_SPECIFIC_BINDING',
  'LATER_EDITION_METADATA_MAY_SUPPORT_LINEAGE_BUT_NOT_BACKFILL_1998',
  'AMBIGUOUS_CATALOG_OR_UPLOADER_FIELDS_REQUIRE_FIELD_ROLE_DISAMBIGUATION',
  'PHYSICAL_OR_DIGITAL_IMPRINT_WITNESS_PREFERRED_WHEN_AVAILABLE',
  'CANONICAL_WITNESS_NORMALIZATION_REQUIRES_CONTENT_AND_REPRESENTATION_COMPARISON',
  'PAGE_COUNT_FILE_SIZE_OR_FILENAME_DIFFERENCE_ALONE_NOT_DISTINCT_EDITION_EVIDENCE',
  'DUPLICATE_DERIVATIVE_SCAN_RELATIONSHIP_MUST_BE_RECORDED_EXPLICITLY',
  'SEARCH_SILENCE_REMAINS_UNRESOLVED_WITHOUT_CORROBORATED_NEGATIVE_BASIS',
  'NO_REBINDING_INDEPENDENCE_SELECTION_MUTATION_OR_REEVALUATION_AT_DISCOVERY_STAGE',
  'I132_AND_CURRENT_V2_BLOCKED_STATE_MUST_REMAIN_UNCHANGED',
] as const);

export type I176DiscoveryControlId = (typeof I176_DISCOVERY_CONTROL_IDS)[number];

export const I176_PUBLICATION_MEDIUM_SEARCH_CHANNEL_IDS = Object.freeze([
  'AUTHOR_OR_ORGANIZATION_1998_CHRONOLOGY_AND_CATALOG_RECORDS',
  '1998_OR_NEAR_CONTEMPORARY_BOOK_COURSE_OR_MAIL_ORDER_CATALOGS',
  'PHYSICAL_SCAN_TITLE_COPYRIGHT_IMPRINT_OR_COLOPHON_PAGES',
  'BIBLIOGRAPHIC_LIBRARY_OR_BOOKSELLER_RECORDS_WITH_EDITION_DATE_BINDING',
  'COPYRIGHT_REGISTRATION_OR_PUBLICATION_RECORDS_WITH_EXACT_WORK_BINDING',
] as const);

export type I176PublicationMediumSearchChannelId =
  (typeof I176_PUBLICATION_MEDIUM_SEARCH_CHANNEL_IDS)[number];

export const I176_WITNESS_NORMALIZATION_SEARCH_CHANNEL_IDS = Object.freeze([
  'DIGITAL_COPY_TITLE_AND_IMPRINT_PAGE_COMPARISON',
  'TABLE_OF_CONTENTS_AND_CHAPTER_ANCHOR_COMPARISON',
  'TARGET_PASSAGE_SEQUENCE_AND_PAGINATION_COMPARISON',
  'FILE_OR_SCAN_TRANSFORMATION_METADATA_COMPARISON',
  'EDITION_SPECIFIC_ADDITION_DELETION_OR_REORDERING_CHECK',
] as const);

export type I176WitnessNormalizationSearchChannelId =
  (typeof I176_WITNESS_NORMALIZATION_SEARCH_CHANNEL_IDS)[number];

export interface I176Li1998GapTargetedDiscoveryReadinessReviewReport {
  reviewId: string;
  reviewVersion: string;
  status:
    | 'RESOLVED_LI_1998_PUBLICATION_MEDIUM_CANONICAL_WITNESS_GAP_TARGETED_DISCOVERY_READINESS_REVIEW'
    | 'I175_TWO_GAP_BOUNDARY_INVALID';
  decision:
    | 'TWO_LI_1998_IDENTITY_GAPS_READY_FOR_BOUNDED_TARGETED_DISCOVERY_1998_SPECIFIC_PUBLICATION_BINDING_AND_CANONICAL_WITNESS_NORMALIZATION_REQUIRED_NO_REBINDING_NO_INDEPENDENCE'
    | 'LI_1998_IDENTITY_GAP_TARGETED_DISCOVERY_NOT_READY';
  upstreamI175ReviewId: string;
  policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy';
  policyVersion: 'v1-definition';
  adoptionVersion: 'v1-adoption';
  currentCandidateSetVersion: 'v1-candidate-set';
  currentInputPackageVersion: 'v2-input-package';
  exactI175BoundaryAccepted: boolean;
  targetGapIds: readonly [
    'LI_1998_PUBLICATION_MEDIUM_OR_ENTITY_IDENTITY_GAP',
    'LI_1998_CANONICAL_DIGITAL_WITNESS_NORMALIZATION_GAP',
  ] | readonly [];
  targetGapCount: 2 | 0;
  discoveryControlIds: readonly I176DiscoveryControlId[];
  discoveryControlCount: 12;
  discoveryControlsFrozenProspectively: boolean;
  publicationMediumSearchChannelIds: readonly I176PublicationMediumSearchChannelId[];
  publicationMediumSearchChannelCount: 5;
  witnessNormalizationSearchChannelIds: readonly I176WitnessNormalizationSearchChannelId[];
  witnessNormalizationSearchChannelCount: 5;
  publicationMediumResolutionRequires1998SpecificBinding: boolean;
  laterEditionMetadataMayBackfill1998: false;
  ambiguousMetadataMayEstablishPublicationStatusWithoutFieldDisambiguation: false;
  imprintOrColophonWitnessPreferred: boolean;
  explicitNonformalStatusMayResolvePublicationMediumIf1998SpecificAndReproducible: boolean;
  formalPublisherOrIsbnRequiredUnconditionally: false;
  canonicalWitnessNormalizationRequiresContentComparison: boolean;
  pageCountDifferenceAloneCreatesDistinctEdition: false;
  fileSizeDifferenceAloneCreatesDistinctEdition: false;
  filenameDifferenceAloneCreatesDistinctEdition: false;
  duplicateDerivativeScanRelationshipMustBeRecorded: boolean;
  searchSilenceCreatesNegativeFinding: false;
  boundedTargetedDiscoveryMayProceed: boolean;
  authorizationIsDiscoveryEvidenceCollection: boolean;
  authorizationIsEvidenceRebinding: false;
  authorizationIsProvenanceIndependenceAdjudication: false;
  evidenceRebindingMethodologicallyReady: false;
  evidenceRebindingSelectedByThisGate: false;
  evidenceRebindingExecutedByThisGate: false;
  candidateSelectedByThisGate: false;
  remediationStrategySelectedByThisGate: false;
  remediationExecutionAuthorizedByThisGate: false;
  candidateSetMutatedByThisGate: false;
  newCandidateSetVersionCreatedByThisGate: false;
  newInputPackageVersionCreatedByThisGate: false;
  provenanceIndependenceAdjudicatedByThisGate: false;
  independentNormativeProvenanceEstablishedCount: 0;
  I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate: false;
  I132IndependentNormativeProvenanceRequirementRemainsNormative: boolean;
  I132PolicyRelaxationAuthorizedByThisGate: false;
  sourceCountVotingAllowed: false;
  provenanceTierWeightingAllowed: false;
  current2004WitnessPresumedOriginRetired: boolean;
  prior1998SameAuthorWitnessConfirmed: boolean;
  prior1998WitnessIndependentProvenanceEstablished: false;
  sameAuthor1998To2004DerivativeChainMustRemainBound: boolean;
  externalLineageUnresolvedQuestionCount: 3 | 0;
  externalLineageUnresolvedStatusPreserved: boolean;
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
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_1998_PUBLICATION_MEDIUM_CANONICAL_WITNESS_GAP_TARGETED_DISCOVERY_EVIDENCE'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_1998_PUBLICATION_MEDIUM_CANONICAL_WITNESS_GAP_TARGETED_DISCOVERY_READINESS_REVIEW';
  notes: readonly string[];
}

function exactI175Accepted(i175: I175Li1998IdentityEvidenceAdequacyRebindingReadinessReviewReport): boolean {
  return (
    i175.status === 'RESOLVED_LI_1998_IDENTITY_EVIDENCE_ADEQUACY_REBINDING_READINESS_REVIEW' &&
    i175.decision ===
      'LI_1998_IDENTITY_EVIDENCE_PARTIALLY_ADEQUATE_FOUR_OF_SIX_FUNCTIONS_SATISFIED_PUBLICATION_MEDIUM_AND_CANONICAL_WITNESS_NORMALIZATION_UNRESOLVED_REBINDING_NOT_READY_TARGETED_GAP_DISCOVERY_MAY_PROCEED_NO_INDEPENDENCE' &&
    i175.policyId === 'myeonghwa-visible-stem-ke-multi-source-composition-policy' &&
    i175.policyVersion === 'v1-definition' &&
    i175.adoptionVersion === 'v1-adoption' &&
    i175.currentCandidateSetVersion === 'v1-candidate-set' &&
    i175.currentInputPackageVersion === 'v2-input-package' &&
    i175.exactI174BoundaryAccepted &&
    i175.evaluatedIdentityFunctionCount === 6 &&
    i175.satisfiedIdentityFunctionCount === 4 &&
    i175.unresolvedIdentityFunctionCount === 2 &&
    i175.partialIdentityEvidenceAdequacyEstablished &&
    i175.completeIdentityEvidenceAdequacyEstablished === false &&
    i175.publicationMediumOrEntityIdentityResolved === false &&
    i175.canonicalDigitalWitnessNormalizationResolved === false &&
    i175.evidenceRebindingMethodologicallyReady === false &&
    i175.evidenceRebindingAuthorizedByThisGate === false &&
    i175.evidenceRebindingSelectedByThisGate === false &&
    i175.evidenceRebindingExecutedByThisGate === false &&
    i175.targetedGapCount === 2 &&
    i175.targetedGapIds.length === 2 &&
    i175.targetedGapIds[0] === 'LI_1998_PUBLICATION_MEDIUM_OR_ENTITY_IDENTITY_GAP' &&
    i175.targetedGapIds[1] === 'LI_1998_CANONICAL_DIGITAL_WITNESS_NORMALIZATION_GAP' &&
    i175.targetedGapDiscoveryReadinessReviewMethodologicallyJustified &&
    i175.targetedGapDiscoveryReadinessReviewAuthorized &&
    i175.adequacyRequirementCount === 10 &&
    i175.adequacyRequirementsFrozen &&
    i175.current2004WitnessPresumedOriginRetired &&
    i175.prior1998SameAuthorWitnessConfirmed &&
    i175.prior1998WitnessIndependentProvenanceEstablished === false &&
    i175.sameAuthor1998To2004DerivativeChainMustRemainBound &&
    i175.externalLineageUnresolvedQuestionCount === 3 &&
    i175.externalLineageUnresolvedStatusPreserved &&
    i175.candidateSelectedByThisGate === false &&
    i175.remediationStrategySelectedByThisGate === false &&
    i175.remediationExecutionAuthorizedByThisGate === false &&
    i175.candidateSetMutatedByThisGate === false &&
    i175.candidateRemovedByThisGate === false &&
    i175.candidateReplacedByThisGate === false &&
    i175.newCandidateSetVersionCreatedByThisGate === false &&
    i175.newInputPackageVersionCreatedByThisGate === false &&
    i175.provenanceIndependenceAdjudicatedByThisGate === false &&
    i175.independentNormativeProvenanceEstablishedCount === 0 &&
    i175.I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate === false &&
    i175.I132IndependentNormativeProvenanceRequirementRemainsNormative &&
    i175.I132PolicyRelaxationAuthorizedByThisGate === false &&
    i175.searchSilenceCreatesNegativeFinding === false &&
    i175.sourceCountVotingAllowed === false &&
    i175.provenanceTierWeightingAllowed === false &&
    i175.currentV2PackageAndCandidateSetRemainImmutable &&
    i175.currentV2ProvenanceDisposition === 'BLOCKED_UNDER_CURRENT_EVIDENCE' &&
    i175.candidateSetReevaluationAuthorizedByThisGate === false &&
    i175.candidateSetAdmissibilityEstablishedByThisGate === false &&
    i175.productionPolicyExecutionAuthorized === false &&
    i175.actualCompositionPerformedByThisGate === false &&
    i175.multiSourceCompositionAuthorized === false &&
    i175.authorityAcquiredByThisGate === false &&
    i175.visibleStemBinaryEffectiveInteractionEligibilityResolved === false &&
    i175.thresholdRuleCreatedByThisGate === false &&
    i175.damageEvaluationAuthorized === false &&
    i175.classificationAuthorized === false &&
    i175.numericScoringAuthorized === false &&
    i175.hiddenStemInteractionEligibilityGapRemains &&
    i175.hiddenStemAuthorityGap === 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED' &&
    i175.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_1998_PUBLICATION_MEDIUM_CANONICAL_WITNESS_GAP_TARGETED_DISCOVERY_READINESS_REVIEW'
  );
}

function finalized(
  material: Omit<I176Li1998GapTargetedDiscoveryReadinessReviewReport, 'reviewId'>,
): I176Li1998GapTargetedDiscoveryReadinessReviewReport {
  return {
    reviewId: `i176_li_1998_gap_discovery_readiness_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI176Li1998GapTargetedDiscoveryReadinessReview(
  i175: I175Li1998IdentityEvidenceAdequacyRebindingReadinessReviewReport,
): I176Li1998GapTargetedDiscoveryReadinessReviewReport {
  const accepted = exactI175Accepted(i175);

  return finalized({
    reviewVersion: I176_LI_1998_GAP_TARGETED_DISCOVERY_READINESS_REVIEW_VERSION,
    status: accepted
      ? 'RESOLVED_LI_1998_PUBLICATION_MEDIUM_CANONICAL_WITNESS_GAP_TARGETED_DISCOVERY_READINESS_REVIEW'
      : 'I175_TWO_GAP_BOUNDARY_INVALID',
    decision: accepted
      ? 'TWO_LI_1998_IDENTITY_GAPS_READY_FOR_BOUNDED_TARGETED_DISCOVERY_1998_SPECIFIC_PUBLICATION_BINDING_AND_CANONICAL_WITNESS_NORMALIZATION_REQUIRED_NO_REBINDING_NO_INDEPENDENCE'
      : 'LI_1998_IDENTITY_GAP_TARGETED_DISCOVERY_NOT_READY',
    upstreamI175ReviewId: i175.reviewId,
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI175BoundaryAccepted: accepted,
    targetGapIds: accepted
      ? Object.freeze([
          'LI_1998_PUBLICATION_MEDIUM_OR_ENTITY_IDENTITY_GAP',
          'LI_1998_CANONICAL_DIGITAL_WITNESS_NORMALIZATION_GAP',
        ] as const)
      : Object.freeze([] as const),
    targetGapCount: accepted ? 2 : 0,
    discoveryControlIds: I176_DISCOVERY_CONTROL_IDS,
    discoveryControlCount: 12,
    discoveryControlsFrozenProspectively: accepted,
    publicationMediumSearchChannelIds: I176_PUBLICATION_MEDIUM_SEARCH_CHANNEL_IDS,
    publicationMediumSearchChannelCount: 5,
    witnessNormalizationSearchChannelIds: I176_WITNESS_NORMALIZATION_SEARCH_CHANNEL_IDS,
    witnessNormalizationSearchChannelCount: 5,
    publicationMediumResolutionRequires1998SpecificBinding: accepted,
    laterEditionMetadataMayBackfill1998: false,
    ambiguousMetadataMayEstablishPublicationStatusWithoutFieldDisambiguation: false,
    imprintOrColophonWitnessPreferred: accepted,
    explicitNonformalStatusMayResolvePublicationMediumIf1998SpecificAndReproducible: accepted,
    formalPublisherOrIsbnRequiredUnconditionally: false,
    canonicalWitnessNormalizationRequiresContentComparison: accepted,
    pageCountDifferenceAloneCreatesDistinctEdition: false,
    fileSizeDifferenceAloneCreatesDistinctEdition: false,
    filenameDifferenceAloneCreatesDistinctEdition: false,
    duplicateDerivativeScanRelationshipMustBeRecorded: accepted,
    searchSilenceCreatesNegativeFinding: false,
    boundedTargetedDiscoveryMayProceed: accepted,
    authorizationIsDiscoveryEvidenceCollection: accepted,
    authorizationIsEvidenceRebinding: false,
    authorizationIsProvenanceIndependenceAdjudication: false,
    evidenceRebindingMethodologicallyReady: false,
    evidenceRebindingSelectedByThisGate: false,
    evidenceRebindingExecutedByThisGate: false,
    candidateSelectedByThisGate: false,
    remediationStrategySelectedByThisGate: false,
    remediationExecutionAuthorizedByThisGate: false,
    candidateSetMutatedByThisGate: false,
    newCandidateSetVersionCreatedByThisGate: false,
    newInputPackageVersionCreatedByThisGate: false,
    provenanceIndependenceAdjudicatedByThisGate: false,
    independentNormativeProvenanceEstablishedCount: 0,
    I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate: false,
    I132IndependentNormativeProvenanceRequirementRemainsNormative: accepted,
    I132PolicyRelaxationAuthorizedByThisGate: false,
    sourceCountVotingAllowed: false,
    provenanceTierWeightingAllowed: false,
    current2004WitnessPresumedOriginRetired: accepted,
    prior1998SameAuthorWitnessConfirmed: accepted,
    prior1998WitnessIndependentProvenanceEstablished: false,
    sameAuthor1998To2004DerivativeChainMustRemainBound: accepted,
    externalLineageUnresolvedQuestionCount: accepted ? 3 : 0,
    externalLineageUnresolvedStatusPreserved: accepted,
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
      ? 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_1998_PUBLICATION_MEDIUM_CANONICAL_WITNESS_GAP_TARGETED_DISCOVERY_EVIDENCE'
      : 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_1998_PUBLICATION_MEDIUM_CANONICAL_WITNESS_GAP_TARGETED_DISCOVERY_READINESS_REVIEW',
    notes: accepted
      ? Object.freeze([
          'Only the two I175 identity blockers are in scope for the next discovery stage.',
          'A publication-medium resolution must bind specifically to the 1998 witness; later-edition bibliographic metadata may support lineage only.',
          'Canonical-witness normalization must compare content and representation evidence rather than treating page count, file size, or filename variance as edition proof.',
          'Search silence remains unresolved unless a separately governed explicit negative finding basis is established.',
          'No rebinding, provenance-independence adjudication, candidate mutation, threshold creation, or production authorization occurs in I176.',
        ])
      : Object.freeze([
          'I175 boundary mismatch prevents targeted gap-discovery readiness.',
        ]),
  });
}
