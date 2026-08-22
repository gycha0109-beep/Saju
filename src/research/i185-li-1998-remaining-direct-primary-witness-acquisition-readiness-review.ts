import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { I184Li1998EscalatedEvidenceAdequacyRemainingPathReassessmentReviewReport } from './i184-li-1998-escalated-acquisition-evidence-adequacy-remaining-path-reassessment-review.js';

export const I185_LI_1998_REMAINING_DIRECT_PRIMARY_WITNESS_ACQUISITION_READINESS_REVIEW_VERSION =
  'myeonghwa-li-1998-remaining-direct-primary-witness-acquisition-readiness-review-v1';

export const I185_ACQUISITION_REQUIREMENT_IDS = Object.freeze([
  'EXACT_I184_TWO_GAP_UNRESOLVED_FIVE_REMAINING_PATH_BOUNDARY_REQUIRED',
  'DIRECT_TARGET_TITLE_REGISTRY_EVIDENCE_MUST_BIND_TITLE_AUTHOR_AND_REGISTRATION_IDENTITY',
  'PUBLICATION_IDENTITY_EVIDENCE_MUST_BIND_SPECIFICALLY_TO_1998_TARGET_WITNESS',
  'FORMAL_1998_PATH_REQUIRES_PUBLISHER_ISSUER_DISTRIBUTOR_OR_EQUIVALENT_PRIMARY_BINDING',
  'NONFORMAL_1998_PATH_REQUIRES_EXPLICIT_REPRODUCIBLE_NONFORMAL_DISTRIBUTION_STATUS',
  'LATER_2002_FORMAL_METADATA_MUST_NOT_BACKFILL_1998_IDENTITY',
  'DIRECT_FULL_COMPARABLE_WITNESS_ACCESS_REQUIRED_FOR_VARIANT_NORMALIZATION',
  'VARIANT_COMPARISON_MUST_INCLUDE_TITLE_IMPRINT_COPYRIGHT_TOC_PAGINATION_TARGET_PASSAGE_AND_STRUCTURE',
  'STABLE_FILE_HASH_OR_TRANSFORMATION_PROVENANCE_REQUIRED_FOR_DIGITAL_VARIANT_IDENTITY',
  'PAGE_COUNT_FORMAT_FILE_SIZE_FILENAME_OR_COVER_ALONE_CANNOT_RESOLVE_VARIANT_IDENTITY',
  'AGGREGATOR_SURFACES_MAY_ROUTE_DISCOVERY_BUT_CANNOT_CLOSE_EITHER_GAP_ALONE',
  'FAILED_ACCESS_AND_SEARCH_SILENCE_MUST_NOT_CREATE_NEGATIVE_OR_EXHAUSTION_FINDINGS',
  'BOTH_IDENTITY_FUNCTIONS_REQUIRED_BEFORE_REBINDING_READINESS',
  'NO_REBINDING_INDEPENDENCE_MUTATION_REEVALUATION_POLICY_RELAXATION_THRESHOLD_CLASSIFICATION_NUMERIC_OR_PRODUCTION_AUTHORITY',
] as const);

export type I185AcquisitionRequirementId = (typeof I185_ACQUISITION_REQUIREMENT_IDS)[number];

export const I185_DIRECT_PRIMARY_PATH_IDS = Object.freeze([
  'DIRECT_TARGET_TITLE_COPYRIGHT_REGISTRY_CERTIFICATE_OR_REGISTRATION_NUMBER',
  'DIRECT_1998_PRIMARY_COLOPHON_IMPRINT_OR_DISTRIBUTION_RECORD',
  'DIRECT_FULL_314_OR_413_WITNESS_ACQUISITION',
  'DIRECT_FULL_202_OR_422_REFERENCE_WITNESS_FOR_STRUCTURAL_COMPARISON',
  'STABLE_FILE_HASH_OR_TRANSFORMATION_PROVENANCE_FOR_COMPARABLE_VARIANTS',
] as const);

export type I185DirectPrimaryPathId = (typeof I185_DIRECT_PRIMARY_PATH_IDS)[number];
export type I185TargetGap =
  | 'LI_1998_PUBLICATION_MEDIUM_OR_ENTITY_IDENTITY_GAP'
  | 'LI_1998_CANONICAL_DIGITAL_WITNESS_NORMALIZATION_GAP';

export interface I185DirectPrimaryPathRequirement {
  pathId: I185DirectPrimaryPathId;
  priority: 1 | 2 | 3 | 4 | 5;
  targetGap: I185TargetGap;
  minimumQualifyingPayload: readonly string[];
  aggregatorMayRouteDiscovery: true;
  aggregatorAloneMayResolveGap: false;
  evidenceAcquiredByThisGate: false;
}

export interface I185Li1998RemainingDirectPrimaryWitnessAcquisitionReadinessReviewReport {
  reviewId: string;
  reviewVersion: string;
  status:
    | 'RESOLVED_LI_1998_REMAINING_DIRECT_PRIMARY_WITNESS_ACQUISITION_READINESS_REVIEW'
    | 'I184_REMAINING_PATH_BOUNDARY_INVALID';
  decision:
    | 'I184_FIVE_REMAINING_DIRECT_PRIMARY_PATHS_ACCEPTED_ACQUISITION_REQUIREMENTS_FROZEN_EXECUTION_READY_NO_EVIDENCE_ACQUIRED_TWO_GAPS_UNRESOLVED_NO_REBINDING_NO_INDEPENDENCE'
    | 'LI_1998_REMAINING_DIRECT_PRIMARY_WITNESS_ACQUISITION_NOT_READY';
  upstreamI184ReviewId: string;
  policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy';
  policyVersion: 'v1-definition';
  adoptionVersion: 'v1-adoption';
  currentCandidateSetVersion: 'v1-candidate-set';
  currentInputPackageVersion: 'v2-input-package';
  exactI184BoundaryAccepted: boolean;
  upstreamPathLevelProgressAccepted: boolean;
  publicationMediumOrEntityGapStillOpen: boolean;
  canonicalDigitalWitnessNormalizationGapStillOpen: boolean;
  directPrimaryPathIds: readonly I185DirectPrimaryPathId[];
  directPrimaryPathCount: 5 | 0;
  directPrimaryPathRequirements: readonly I185DirectPrimaryPathRequirement[];
  directPrimaryPathRequirementCount: 5 | 0;
  pathPrioritiesFrozenProspectively: boolean;
  acquisitionRequirementIds: readonly I185AcquisitionRequirementId[];
  acquisitionRequirementCount: 14;
  acquisitionRequirementsFrozen: boolean;
  directTargetRegistryCertificateOrRegistrationNumberRequired: boolean;
  directTargetRegistryMustBindExactTargetTitle: boolean;
  directTargetRegistryMustBindAuthorIdentity: boolean;
  directTargetRegistryContextWithoutRecordMayResolveGap: false;
  direct1998PublicationBindingRequired: boolean;
  formal1998BindingMayUsePublisherIssuerOrDistributor: boolean;
  explicitNonformal1998DistributionBindingAdmissible: boolean;
  chronologyCompanyCoLocationMayEstablishPublisherIdentity: false;
  later2002FormalMetadataMayBackfill1998Identity: false;
  laterEditionTocContinuityMayBackfill1998Identity: false;
  directFullComparableWitnessAccessRequired: boolean;
  comparisonTitleImprintCopyrightRequired: boolean;
  comparisonTocPaginationTargetPassageStructureRequired: boolean;
  comparisonAdditionDeletionReorderingRequired: boolean;
  stableFileHashOrTransformationProvenanceRequired: boolean;
  pageCountAloneMayResolveVariantIdentity: false;
  physicalFormatAloneMayResolveVariantIdentity: false;
  fileSizeAloneMayResolveVariantIdentity: false;
  filenameAloneMayResolveVariantIdentity: false;
  coverSurfaceAloneMayResolveVariantIdentity: false;
  aggregatorMayRouteDiscovery: boolean;
  aggregatorAloneMayResolvePublicationIdentity: false;
  aggregatorAloneMayResolveCanonicalWitnessNormalization: false;
  acquisitionReadinessEstablished: boolean;
  boundedAcquisitionExecutionAuthorizedByThisGate: boolean;
  evidenceAcquiredByThisGate: false;
  directRegistryEvidenceAcquiredByThisGate: false;
  direct1998PublicationBindingAcquiredByThisGate: false;
  directComparableWitnessAcquiredByThisGate: false;
  stableFileIdentityAcquiredByThisGate: false;
  publicationMediumOrEntityGapResolvedByThisGate: false;
  canonicalDigitalWitnessNormalizationGapResolvedByThisGate: false;
  targetedDiscoveryExhaustionEstablished: false;
  corpusExhaustionEstablished: false;
  explicitNegativeFindingCount: 0;
  failedRegistryAccessCreatesNegativeFinding: false;
  failedWitnessAccessCreatesNegativeFinding: false;
  searchSilenceCreatesNegativeFinding: false;
  repetitiveEquivalentSurfaceCountsAsProgress: false;
  bothIdentityFunctionsRequiredBeforeRebindingReadiness: boolean;
  oneIdentityFunctionResolutionSufficientForRebinding: false;
  evidenceRebindingMethodologicallyReady: false;
  evidenceRebindingAuthorizedByThisGate: false;
  evidenceRebindingSelectedByThisGate: false;
  evidenceRebindingExecutedByThisGate: false;
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
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_1998_REMAINING_DIRECT_PRIMARY_WITNESS_ACQUISITION_EVIDENCE'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_1998_REMAINING_DIRECT_PRIMARY_WITNESS_ACQUISITION_READINESS_REVIEW';
  notes: readonly string[];
}

function exactI184Accepted(
  i184: I184Li1998EscalatedEvidenceAdequacyRemainingPathReassessmentReviewReport,
): boolean {
  return (
    i184.status === 'RESOLVED_LI_1998_ESCALATED_EVIDENCE_ADEQUACY_REMAINING_PATH_REASSESSMENT_REVIEW' &&
    i184.decision ===
      'I183_ESCALATED_ACQUISITION_EVIDENCE_ADEQUATE_TO_RECORD_PATH_LEVEL_PROGRESS_ZERO_1998_BINDING_ZERO_VARIANT_NORMALIZATION_TWO_GAPS_REMAIN_UNRESOLVED_REBINDING_NOT_READY_REMAINING_PRIMARY_AND_DIRECT_WITNESS_PATHS_MAY_CONTINUE_NO_INDEPENDENCE' &&
    i184.policyId === 'myeonghwa-visible-stem-ke-multi-source-composition-policy' &&
    i184.policyVersion === 'v1-definition' &&
    i184.adoptionVersion === 'v1-adoption' &&
    i184.currentCandidateSetVersion === 'v1-candidate-set' &&
    i184.currentInputPackageVersion === 'v2-input-package' &&
    i184.exactI183BoundaryAccepted &&
    i184.pathLevelProgressAdequate &&
    i184.publicationIdentityResolutionEvidenceAdequate === false &&
    i184.canonicalWitnessNormalizationEvidenceAdequate === false &&
    i184.qualifying1998PublicationIdentityBindingCount === 0 &&
    i184.completeVariantNormalizationCount === 0 &&
    i184.stableFileIdentityOrHashAcquiredCount === 0 &&
    i184.publicationMediumOrEntityGapResolved === false &&
    i184.canonicalDigitalWitnessNormalizationGapResolved === false &&
    i184.directTargetRegistryRecordStillRequired &&
    i184.later2002FormalEditionMayBackfill1998PublicationIdentity === false &&
    i184.physical314PageListingMayResolve1998PublicationIdentity === false &&
    i184.representationVarianceCreatesDistinctNormativeEdition === false &&
    i184.representationVarianceCreatesCanonicalWitness === false &&
    i184.directFullComparableWitnessesStillRequired &&
    i184.stableFileIdentityOrTransformationProvenanceStillRequired &&
    i184.remainingPathCount === 5 &&
    i184.remainingPathIds.length === 5 &&
    I185_DIRECT_PRIMARY_PATH_IDS.every((pathId, index) => i184.remainingPathIds[index] === pathId) &&
    i184.remainingPathsMethodologicallyOpen &&
    i184.furtherAcquisitionExecutionAuthorizedByThisGate &&
    i184.evidenceAcquiredByThisGate === false &&
    i184.directRegistryEvidenceAcquiredByThisGate === false &&
    i184.direct1998PublicationBindingAcquiredByThisGate === false &&
    i184.directComparableWitnessAcquiredByThisGate === false &&
    i184.stableFileIdentityAcquiredByThisGate === false &&
    i184.targetedDiscoveryExhaustionEstablished === false &&
    i184.corpusExhaustionEstablished === false &&
    i184.explicitNegativeFindingCount === 0 &&
    i184.failedRegistryAccessCreatesNegativeFinding === false &&
    i184.failedWitnessAccessCreatesNegativeFinding === false &&
    i184.searchSilenceCreatesNegativeFinding === false &&
    i184.equivalentAggregatorSurfaceCountsAsNewProgress === false &&
    i184.bothIdentityFunctionsRequiredBeforeRebindingReadiness &&
    i184.oneIdentityFunctionResolutionSufficientForRebinding === false &&
    i184.evidenceRebindingMethodologicallyReady === false &&
    i184.evidenceRebindingAuthorizedByThisGate === false &&
    i184.evidenceRebindingSelectedByThisGate === false &&
    i184.evidenceRebindingExecutedByThisGate === false &&
    i184.reassessmentRequirementCount === 12 &&
    i184.reassessmentRequirementsFrozen &&
    i184.current2004WitnessPresumedOriginRetired &&
    i184.prior1998SameAuthorWitnessConfirmed &&
    i184.prior1998WitnessIndependentProvenanceEstablished === false &&
    i184.sameAuthor1998To2004DerivativeChainMustRemainBound &&
    i184.externalLineageUnresolvedQuestionCount === 3 &&
    i184.externalLineageUnresolvedStatusPreserved &&
    i184.provenanceIndependenceAdjudicatedByThisGate === false &&
    i184.independentNormativeProvenanceEstablishedCount === 0 &&
    i184.I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate === false &&
    i184.I132IndependentNormativeProvenanceRequirementRemainsNormative &&
    i184.I132PolicyRelaxationAuthorizedByThisGate === false &&
    i184.sourceCountVotingAllowed === false &&
    i184.provenanceTierWeightingAllowed === false &&
    i184.currentV2PackageAndCandidateSetRemainImmutable &&
    i184.currentV2ProvenanceDisposition === 'BLOCKED_UNDER_CURRENT_EVIDENCE' &&
    i184.candidateSetReevaluationAuthorizedByThisGate === false &&
    i184.candidateSetAdmissibilityEstablishedByThisGate === false &&
    i184.productionPolicyExecutionAuthorized === false &&
    i184.actualCompositionPerformedByThisGate === false &&
    i184.multiSourceCompositionAuthorized === false &&
    i184.authorityAcquiredByThisGate === false &&
    i184.visibleStemBinaryEffectiveInteractionEligibilityResolved === false &&
    i184.thresholdRuleCreatedByThisGate === false &&
    i184.damageEvaluationAuthorized === false &&
    i184.classificationAuthorized === false &&
    i184.numericScoringAuthorized === false &&
    i184.hiddenStemInteractionEligibilityGapRemains &&
    i184.hiddenStemAuthorityGap === 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED' &&
    i184.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_1998_REMAINING_DIRECT_PRIMARY_WITNESS_ACQUISITION_READINESS_REVIEW'
  );
}

function pathRequirements(): readonly I185DirectPrimaryPathRequirement[] {
  return Object.freeze([
    {
      pathId: 'DIRECT_TARGET_TITLE_COPYRIGHT_REGISTRY_CERTIFICATE_OR_REGISTRATION_NUMBER',
      priority: 1,
      targetGap: 'LI_1998_PUBLICATION_MEDIUM_OR_ENTITY_IDENTITY_GAP',
      minimumQualifyingPayload: Object.freeze([
        'direct authoritative registry or certificate surface',
        'exact target title or unambiguous target-work identity',
        'author identity',
        'registration number or certificate identity sufficient for reproducible verification',
        'no inference that registration alone establishes 1998 publication medium',
      ]),
      aggregatorMayRouteDiscovery: true,
      aggregatorAloneMayResolveGap: false,
      evidenceAcquiredByThisGate: false,
    },
    {
      pathId: 'DIRECT_1998_PRIMARY_COLOPHON_IMPRINT_OR_DISTRIBUTION_RECORD',
      priority: 2,
      targetGap: 'LI_1998_PUBLICATION_MEDIUM_OR_ENTITY_IDENTITY_GAP',
      minimumQualifyingPayload: Object.freeze([
        'exact target title and 1998-specific binding',
        'publisher issuer distributor or equivalent primary entity identity for a formal path',
        'or explicit reproducible nonformal distribution status for a nonformal path',
        'no later-edition backfill',
      ]),
      aggregatorMayRouteDiscovery: true,
      aggregatorAloneMayResolveGap: false,
      evidenceAcquiredByThisGate: false,
    },
    {
      pathId: 'DIRECT_FULL_314_OR_413_WITNESS_ACQUISITION',
      priority: 3,
      targetGap: 'LI_1998_CANONICAL_DIGITAL_WITNESS_NORMALIZATION_GAP',
      minimumQualifyingPayload: Object.freeze([
        'direct full witness access',
        'title imprint or copyright surface',
        'table of contents and target chapter passage sequence',
        'pagination and structure sufficient for cross-variant comparison',
      ]),
      aggregatorMayRouteDiscovery: true,
      aggregatorAloneMayResolveGap: false,
      evidenceAcquiredByThisGate: false,
    },
    {
      pathId: 'DIRECT_FULL_202_OR_422_REFERENCE_WITNESS_FOR_STRUCTURAL_COMPARISON',
      priority: 4,
      targetGap: 'LI_1998_CANONICAL_DIGITAL_WITNESS_NORMALIZATION_GAP',
      minimumQualifyingPayload: Object.freeze([
        'direct full reference witness access',
        'edition identity and title or imprint surface',
        'table of contents and target passage continuity',
        'addition deletion reordering evidence sufficient for structural comparison',
      ]),
      aggregatorMayRouteDiscovery: true,
      aggregatorAloneMayResolveGap: false,
      evidenceAcquiredByThisGate: false,
    },
    {
      pathId: 'STABLE_FILE_HASH_OR_TRANSFORMATION_PROVENANCE_FOR_COMPARABLE_VARIANTS',
      priority: 5,
      targetGap: 'LI_1998_CANONICAL_DIGITAL_WITNESS_NORMALIZATION_GAP',
      minimumQualifyingPayload: Object.freeze([
        'stable file identity such as cryptographic hash when a file is lawfully obtained',
        'or reproducible transformation provenance linking scan or derivative variants',
        'identity must be paired with content comparison rather than substituting for it',
      ]),
      aggregatorMayRouteDiscovery: true,
      aggregatorAloneMayResolveGap: false,
      evidenceAcquiredByThisGate: false,
    },
  ]);
}

function finalized(
  material: Omit<I185Li1998RemainingDirectPrimaryWitnessAcquisitionReadinessReviewReport, 'reviewId'>,
): I185Li1998RemainingDirectPrimaryWitnessAcquisitionReadinessReviewReport {
  return {
    reviewId: `i185_li_1998_direct_primary_readiness_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI185Li1998RemainingDirectPrimaryWitnessAcquisitionReadinessReview(
  i184: I184Li1998EscalatedEvidenceAdequacyRemainingPathReassessmentReviewReport,
): I185Li1998RemainingDirectPrimaryWitnessAcquisitionReadinessReviewReport {
  const accepted = exactI184Accepted(i184);

  return finalized({
    reviewVersion: I185_LI_1998_REMAINING_DIRECT_PRIMARY_WITNESS_ACQUISITION_READINESS_REVIEW_VERSION,
    status: accepted
      ? 'RESOLVED_LI_1998_REMAINING_DIRECT_PRIMARY_WITNESS_ACQUISITION_READINESS_REVIEW'
      : 'I184_REMAINING_PATH_BOUNDARY_INVALID',
    decision: accepted
      ? 'I184_FIVE_REMAINING_DIRECT_PRIMARY_PATHS_ACCEPTED_ACQUISITION_REQUIREMENTS_FROZEN_EXECUTION_READY_NO_EVIDENCE_ACQUIRED_TWO_GAPS_UNRESOLVED_NO_REBINDING_NO_INDEPENDENCE'
      : 'LI_1998_REMAINING_DIRECT_PRIMARY_WITNESS_ACQUISITION_NOT_READY',
    upstreamI184ReviewId: i184.reviewId,
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI184BoundaryAccepted: accepted,
    upstreamPathLevelProgressAccepted: accepted,
    publicationMediumOrEntityGapStillOpen: accepted,
    canonicalDigitalWitnessNormalizationGapStillOpen: accepted,
    directPrimaryPathIds: accepted ? I185_DIRECT_PRIMARY_PATH_IDS : Object.freeze([]),
    directPrimaryPathCount: accepted ? 5 : 0,
    directPrimaryPathRequirements: accepted ? pathRequirements() : Object.freeze([]),
    directPrimaryPathRequirementCount: accepted ? 5 : 0,
    pathPrioritiesFrozenProspectively: true,
    acquisitionRequirementIds: I185_ACQUISITION_REQUIREMENT_IDS,
    acquisitionRequirementCount: 14,
    acquisitionRequirementsFrozen: true,
    directTargetRegistryCertificateOrRegistrationNumberRequired: accepted,
    directTargetRegistryMustBindExactTargetTitle: accepted,
    directTargetRegistryMustBindAuthorIdentity: accepted,
    directTargetRegistryContextWithoutRecordMayResolveGap: false,
    direct1998PublicationBindingRequired: accepted,
    formal1998BindingMayUsePublisherIssuerOrDistributor: accepted,
    explicitNonformal1998DistributionBindingAdmissible: accepted,
    chronologyCompanyCoLocationMayEstablishPublisherIdentity: false,
    later2002FormalMetadataMayBackfill1998Identity: false,
    laterEditionTocContinuityMayBackfill1998Identity: false,
    directFullComparableWitnessAccessRequired: accepted,
    comparisonTitleImprintCopyrightRequired: accepted,
    comparisonTocPaginationTargetPassageStructureRequired: accepted,
    comparisonAdditionDeletionReorderingRequired: accepted,
    stableFileHashOrTransformationProvenanceRequired: accepted,
    pageCountAloneMayResolveVariantIdentity: false,
    physicalFormatAloneMayResolveVariantIdentity: false,
    fileSizeAloneMayResolveVariantIdentity: false,
    filenameAloneMayResolveVariantIdentity: false,
    coverSurfaceAloneMayResolveVariantIdentity: false,
    aggregatorMayRouteDiscovery: accepted,
    aggregatorAloneMayResolvePublicationIdentity: false,
    aggregatorAloneMayResolveCanonicalWitnessNormalization: false,
    acquisitionReadinessEstablished: accepted,
    boundedAcquisitionExecutionAuthorizedByThisGate: accepted,
    evidenceAcquiredByThisGate: false,
    directRegistryEvidenceAcquiredByThisGate: false,
    direct1998PublicationBindingAcquiredByThisGate: false,
    directComparableWitnessAcquiredByThisGate: false,
    stableFileIdentityAcquiredByThisGate: false,
    publicationMediumOrEntityGapResolvedByThisGate: false,
    canonicalDigitalWitnessNormalizationGapResolvedByThisGate: false,
    targetedDiscoveryExhaustionEstablished: false,
    corpusExhaustionEstablished: false,
    explicitNegativeFindingCount: 0,
    failedRegistryAccessCreatesNegativeFinding: false,
    failedWitnessAccessCreatesNegativeFinding: false,
    searchSilenceCreatesNegativeFinding: false,
    repetitiveEquivalentSurfaceCountsAsProgress: false,
    bothIdentityFunctionsRequiredBeforeRebindingReadiness: accepted,
    oneIdentityFunctionResolutionSufficientForRebinding: false,
    evidenceRebindingMethodologicallyReady: false,
    evidenceRebindingAuthorizedByThisGate: false,
    evidenceRebindingSelectedByThisGate: false,
    evidenceRebindingExecutedByThisGate: false,
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
      ? 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_1998_REMAINING_DIRECT_PRIMARY_WITNESS_ACQUISITION_EVIDENCE'
      : 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_1998_REMAINING_DIRECT_PRIMARY_WITNESS_ACQUISITION_READINESS_REVIEW',
    notes: accepted
      ? Object.freeze([
          'I185 freezes the remaining same-target acquisition boundary before further evidence collection and does not itself acquire evidence.',
          'Publication identity may close only with 1998-specific primary binding or explicit reproducible nonformal distribution evidence; later editions and chronology co-location cannot backfill it.',
          'Canonical witness normalization requires direct comparable witnesses plus stable file identity or transformation provenance and structural comparison across the frozen dimensions.',
          'Failed access and search silence remain non-negative, non-exhaustive observations.',
          'Rebinding and provenance independence remain blocked until both identity functions are resolved and a later gate explicitly authorizes reassessment.',
        ])
      : Object.freeze(['I184 boundary mismatch prevents direct-primary acquisition readiness.']),
  });
}
