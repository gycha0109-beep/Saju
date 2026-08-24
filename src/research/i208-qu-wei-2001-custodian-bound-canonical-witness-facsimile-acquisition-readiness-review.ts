import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  I207_REASSESSMENT_CONTROL_IDS,
  I207_RESIDUAL_PATH_IDS,
  type I207QuWei2001TwoGapAcquisitionEvidenceAdequacyResidualPathReassessmentReviewReport,
} from './i207-qu-wei-2001-two-gap-acquisition-evidence-adequacy-residual-path-reassessment-review.js';

export const I208_QU_WEI_2001_CUSTODIAN_BOUND_CANONICAL_WITNESS_FACSIMILE_ACQUISITION_READINESS_REVIEW_VERSION =
  'myeonghwa-qu-wei-2001-custodian-bound-canonical-witness-facsimile-acquisition-readiness-review-v1';

export const I208_ACQUISITION_PATH_IDS = I207_RESIDUAL_PATH_IDS;
export type I208AcquisitionPathId = (typeof I208_ACQUISITION_PATH_IDS)[number];

export const I208_EVIDENCE_OBLIGATION_IDS = Object.freeze([
  'DIRECT_CUSTODIAN_ARCHIVE_OWNER_OR_FIRST_GENERATION_SOURCE_IDENTITY_BINDING',
  'DIRECT_2001_AUTHOR_TITLE_WITNESS_PROVENANCE_BINDING',
  'REPRODUCIBLE_PHYSICAL_SCAN_OR_BYTE_STABLE_WITNESS_IDENTITY_CAPTURE',
  'TITLE_COPYRIGHT_TOC_PAGINATION_AND_TARGET_SECTION_STRUCTURE_ANCHOR_CAPTURE',
  'CANONICALLY_2001_BOUND_TARGET_SECTION_FACSIMILE_CAPTURE',
  'TARGET_SECTION_PAGE_CONTEXT_AND_NEIGHBORING_TEXT_ANCHOR_CAPTURE',
  'GOVERNED_2003_ROUTE_SEQUENCE_REFERENCE_PRESERVATION',
  'DIRECT_CANONICAL_2001_TO_2003_SEQUENCE_COMPARISON_AND_NON_BACKFILL_AUDIT',
] as const);

export type I208EvidenceObligationId = (typeof I208_EVIDENCE_OBLIGATION_IDS)[number];

export const I208_ACQUISITION_CONTROL_IDS = Object.freeze([
  'EXACT_I207_MATERIAL_BUT_UNBOUND_TWO_GAP_BOUNDARY_REQUIRED',
  'RESOLVED_PUBLICATION_MEDIUM_IDENTITY_MUST_REMAIN_FROZEN',
  'EQUIVALENT_PUBLIC_SURFACE_REPEAT_MUST_NOT_BE_AUTHORIZED_AS_PROGRESS',
  'CUSTODIAN_OR_FIRST_GENERATION_SOURCE_IDENTITY_MUST_BE_DIRECTLY_OBSERVABLE',
  'WITNESS_PROVENANCE_MUST_BIND_AUTHOR_TITLE_AND_2001_WITHOUT_SECONDARY_BACKFILL',
  'PHYSICAL_SCAN_OR_BYTE_STABLE_IDENTITY_MUST_BE_REPRODUCIBLE',
  'NORMALIZATION_REQUIRES_DIRECT_STRUCTURE_ANCHORS_NOT_PAGE_COUNT_OR_FILE_SIZE_HEURISTICS',
  'TARGET_FACSIMILE_MUST_BE_CANONICALLY_BOUND_TO_THE_2001_WITNESS',
  'TARGET_FACSIMILE_MUST_INCLUDE_PAGE_CONTEXT_OR_EQUIVALENT_NEIGHBORING_TEXT_ANCHORS',
  'GOVERNED_2003_ROUTE_SEQUENCE_MAY_BE_REUSED_AS_COMPARISON_TARGET_ONLY',
  'UNBOUND_PUBLIC_TEXT_SIMILARITY_MUST_NOT_RESOLVE_EXACT_PASSAGE_IDENTITY',
  'NORMALIZATION_AND_EXACT_PASSAGE_GAPS_MUST_BE_ADJUDICATED_SEPARATELY',
  'NON_ACQUISITION_ACCESS_FAILURE_CUSTODIAN_SILENCE_PAYWALL_AND_SEARCH_SILENCE_MUST_REMAIN_NON_NEGATIVE',
  'NO_EXHAUSTION_OR_UNIVERSAL_ABSENCE_INFERENCE',
  'NO_REBINDING_INDEPENDENCE_ADJUDICATION_OR_I132_RELAXATION_BY_READINESS',
  'NO_CANDIDATE_V2_COMPOSITION_THRESHOLD_CLASSIFICATION_SCORING_OR_PRODUCTION_AUTHORITY',
] as const);

export type I208AcquisitionControlId = (typeof I208_ACQUISITION_CONTROL_IDS)[number];

export interface I208QuWei2001CustodianBoundCanonicalWitnessFacsimileAcquisitionReadinessReviewReport {
  reviewId: string;
  reviewVersion: string;
  status:
    | 'RESOLVED_QU_WEI_2001_CUSTODIAN_BOUND_CANONICAL_WITNESS_FACSIMILE_ACQUISITION_READINESS_REVIEW'
    | 'I207_RESIDUAL_PATH_REASSESSMENT_BOUNDARY_INVALID';
  decision:
    | 'I207_BOUNDARY_SUPPORTS_CUSTODIAN_BOUND_CANONICAL_WITNESS_FACSIMILE_ACQUISITION_TWO_PATHS_EIGHT_OBLIGATIONS_SIXTEEN_CONTROLS_FROZEN_MATERIALLY_NEW_SUBSTRATE_ONLY_EVIDENCE_COLLECTION_NO_REBINDING_NO_INDEPENDENCE'
    | 'QU_WEI_2001_CUSTODIAN_BOUND_CANONICAL_WITNESS_FACSIMILE_ACQUISITION_NOT_READY';
  upstreamI207ReviewId: string;
  policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy';
  policyVersion: 'v1-definition';
  adoptionVersion: 'v1-adoption';
  currentCandidateSetVersion: 'v1-candidate-set';
  currentInputPackageVersion: 'v2-input-package';
  exactI207BoundaryAccepted: boolean;
  targetPriorWitnessId: 'QU_WEI_SIZHU_XIANGZHEN_2001' | null;
  targetAuthor: '曲炜' | null;
  targetTitle: '《四柱详真》' | null;
  targetAppearanceYear: 2001 | null;
  resolvedPublicationGapPreserved: boolean;
  publicationGapTargetedByThisGate: false;
  publicationGapMayBeReopenedWithoutContradictoryPrimaryEvidence: false;
  remainingGapCountAtEntry: 2 | 0;
  canonicalWitnessNormalizationGapOpenAtEntry: boolean;
  exactTargetPassageBindingGapOpenAtEntry: boolean;
  materialUnboundRouteSequenceCorrespondencePreserved: boolean;
  correspondingRouteElementCountPreserved: 3 | 0;
  equivalentPublicSurfaceRepeatAuthorizedByThisGate: false;
  acquisitionPathIds: readonly I208AcquisitionPathId[];
  acquisitionPathCount: 2;
  acquisitionPathsFrozenProspectively: boolean;
  evidenceObligationIds: readonly I208EvidenceObligationId[];
  evidenceObligationCount: 8;
  evidenceObligationsFrozenProspectively: boolean;
  acquisitionControlIds: readonly I208AcquisitionControlId[];
  acquisitionControlCount: 16;
  acquisitionControlsFrozenProspectively: boolean;
  directCustodianArchiveOwnerOrFirstGenerationIdentityRequired: boolean;
  directAuthorTitle2001WitnessProvenanceRequired: boolean;
  secondaryMetadataMayBackfillWitnessProvenance: false;
  reproduciblePhysicalScanOrByteStableIdentityRequired: boolean;
  titleCopyrightTocPaginationTargetStructureAnchorsRequired: boolean;
  pageCountFileSizeFilenameHostVarianceAloneMayResolveNormalization: false;
  canonically2001BoundTargetSectionFacsimileRequired: boolean;
  targetSectionPageContextOrNeighboringTextAnchorsRequired: boolean;
  governed2003RouteSequenceAvailableAsComparisonTarget: boolean;
  directCanonical2001To2003SequenceComparisonRequired: boolean;
  unboundPublicTextSimilarityMayResolveExactPassageGap: false;
  normalizationAndExactPassageMayCrossBackfill: false;
  custodianBoundCanonicalWitnessFacsimileAcquisitionMayProceed: boolean;
  authorizationIsEvidenceCollectionOnly: boolean;
  acquisitionExecutedByThisGate: false;
  evidenceAcquiredByThisGate: false;
  gapResolvedByThisGateCount: 0;
  explicitNegativeFindingCountCreatedByThisGate: 0;
  nonAcquisitionCreatesNegativeFinding: false;
  accessFailureCreatesNegativeFinding: false;
  custodianSilenceCreatesNegativeFinding: false;
  paywallCreatesNegativeFinding: false;
  searchSilenceCreatesNegativeFinding: false;
  inaccessibleSubstrateCreatesNegativeFinding: false;
  targetedDiscoveryExhaustionEstablished: false;
  onlineCorpusExhaustionEstablished: false;
  corpusExhaustionEstablished: false;
  allTwoRemainingGapsRequiredBeforeRebindingReadiness: boolean;
  evidenceRebindingMethodologicallyReady: false;
  evidenceRebindingAuthorizedByThisGate: false;
  evidenceRebindingExecutedByThisGate: false;
  sameAuthor2001To2003DoctrinalDependencyPreserved: boolean;
  externalTargetLineageUnresolvedQuestionCount: 3 | 0;
  provenanceIndependenceAdjudicatedByThisGate: false;
  independentNormativeProvenanceEstablishedCount: 0;
  explicitDerivativeRelationshipCheckRequired: boolean;
  derivativeRetransmissionCountsAsIndependentAuthority: false;
  unresolvedLineageDefaultDisposition: 'REJECT_INDEPENDENCE_CLAIM';
  I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate: false;
  I132IndependentNormativeProvenanceRequirementRemainsNormative: boolean;
  I132PolicyRelaxationAuthorizedByThisGate: false;
  sourceClassAloneSufficient: false;
  sourceCountMayBecomeNumericWeight: false;
  provenanceTierMayBecomeNumericWeight: false;
  candidateSelectedByThisGate: false;
  candidateRegistrationAuthorizedByThisGate: false;
  candidateSetMutatedByThisGate: false;
  candidateSetReevaluationAuthorizedByThisGate: false;
  candidateSetAdmissibilityEstablishedByThisGate: false;
  newCandidateSetVersionCreatedByThisGate: false;
  newInputPackageVersionCreatedByThisGate: false;
  currentV2PackageAndCandidateSetRemainImmutable: boolean;
  currentV2ProvenanceDisposition: 'BLOCKED_UNDER_CURRENT_EVIDENCE' | 'NOT_ASSESSED';
  liSameTargetPathSuspendedNotRetired: boolean;
  liSameTargetMayReopenOnMateriallyNewDirectLead: boolean;
  liPublicationMediumOrEntityGapStillOpen: boolean;
  liCanonicalDigitalWitnessNormalizationGapStillOpen: boolean;
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
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_QU_WEI_2001_CUSTODIAN_BOUND_CANONICAL_WITNESS_FACSIMILE_ACQUISITION_EVIDENCE'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_QU_WEI_2001_CUSTODIAN_BOUND_CANONICAL_WITNESS_FACSIMILE_ACQUISITION_READINESS_REVIEW';
  notes: readonly string[];
}

function exactI207Accepted(i207: I207QuWei2001TwoGapAcquisitionEvidenceAdequacyResidualPathReassessmentReviewReport): boolean {
  return (
    i207.status === 'RESOLVED_QU_WEI_2001_TWO_GAP_ACQUISITION_EVIDENCE_ADEQUACY_RESIDUAL_PATH_REASSESSMENT_REVIEW' &&
    i207.decision ===
      'I206_EVIDENCE_ADEQUATE_FOR_TWO_UNRESOLVED_FINDINGS_ROUTE_SEQUENCE_CORRESPONDENCE_MATERIAL_BUT_UNBOUND_REBINDING_NOT_READY_EQUIVALENT_PUBLIC_REPEAT_NOT_JUSTIFIED_CUSTODIAN_BOUND_CANONICAL_WITNESS_FACSIMILE_READINESS_MAY_PROCEED_NO_INDEPENDENCE' &&
    i207.policyId === 'myeonghwa-visible-stem-ke-multi-source-composition-policy' &&
    i207.policyVersion === 'v1-definition' &&
    i207.adoptionVersion === 'v1-adoption' &&
    i207.currentCandidateSetVersion === 'v1-candidate-set' &&
    i207.currentInputPackageVersion === 'v2-input-package' &&
    i207.exactI206BoundaryAccepted &&
    i207.i206EvidenceAdequateForRecordedUnresolvedFindings &&
    i207.resolvedPublicationGapPreserved &&
    i207.publicationGapReopenedByThisGate === false &&
    i207.assessedRemainingGapCount === 2 &&
    i207.resolvedRemainingGapCount === 0 &&
    i207.unresolvedRemainingGapCount === 2 &&
    i207.explicitNegativeFindingCountAccepted === 0 &&
    i207.contextualEvidencePathCountAccepted === 2 &&
    i207.qualifyingGapResolutionEvidenceCountAccepted === 0 &&
    i207.publicRepresentationOverlapAcceptedAsContext &&
    i207.publicRepresentationOverlapQualifiesAsCanonicalIdentity === false &&
    i207.byteStableRepresentationPairStillMissing &&
    i207.scanLineageOrTransformationProvenanceStillMissing &&
    i207.directFullStructureNormalizationStillMissing &&
    i207.canonicalWitnessNormalizationGapResolved === false &&
    i207.unboundRouteSequenceComparisonAcceptedAsContext &&
    i207.substantialRouteSequenceCorrespondenceAccepted &&
    i207.correspondingRouteElementCountAccepted === 3 &&
    i207.unboundSequenceComparisonHasMaterialDoctrinalValue &&
    i207.unboundSequenceComparisonQualifiesAsExactOrNearVerbatimBinding === false &&
    i207.sequenceCorrespondenceStrengthensSameAuthorDependencyContext &&
    i207.governed2003SequenceAvailableForFutureCanonicalComparison &&
    i207.canonically2001BoundTargetSectionStillMissing &&
    i207.exactTargetPassageBindingGapResolved === false &&
    i207.doctrineLevelAntecedentPreserved &&
    i207.doctrineLevelAntecedentEqualsExactPassageIdentity === false &&
    i207.equivalentPublicSurfaceRepeatCountsAsRemediationProgress === false &&
    i207.immediateEquivalentPublicSurfaceRepeatJustified === false &&
    i207.materiallyNewCustodianOrCanonicallyBoundSubstrateRequired &&
    i207.publicRepresentationOverlapSupportsTargetingButNotNormalization &&
    i207.unboundSequenceCorrespondenceSupportsFacsimileTargetingButNotBinding &&
    i207.governed2003SequenceMayBeReusedOnlyAfterCanonical2001Binding &&
    i207.residualPathCount === 2 &&
    i207.residualPathIds.length === 2 &&
    i207.residualPathIds.every((id, index) => id === I208_ACQUISITION_PATH_IDS[index]) &&
    i207.residualPathsFrozenProspectively &&
    i207.custodianOrFirstGenerationWitnessPathStillReviewable &&
    i207.canonicallyBoundTargetFacsimilePathStillReviewable &&
    i207.residualPathSelectedByThisGate === false &&
    i207.residualAcquisitionReadinessReviewMethodologicallyJustified &&
    i207.residualAcquisitionReadinessReviewAuthorized &&
    i207.acquisitionExecutedByThisGate === false &&
    i207.evidenceAcquiredByThisGate === false &&
    i207.allTwoRemainingGapsRequiredBeforeRebindingReadiness &&
    i207.evidenceRebindingMethodologicallyReady === false &&
    i207.evidenceRebindingAuthorizedByThisGate === false &&
    i207.evidenceRebindingExecutedByThisGate === false &&
    i207.nonAcquisitionCreatesNegativeFinding === false &&
    i207.accessFailureCreatesNegativeFinding === false &&
    i207.searchSilenceCreatesNegativeFinding === false &&
    i207.paywallCreatesNegativeFinding === false &&
    i207.inaccessibleSubstrateCreatesNegativeFinding === false &&
    i207.targetedDiscoveryExhaustionEstablished === false &&
    i207.onlineCorpusExhaustionEstablished === false &&
    i207.corpusExhaustionEstablished === false &&
    i207.universalNoFurtherEvidenceClaimEstablished === false &&
    i207.sameAuthor2001To2003DoctrinalDependencyPreserved &&
    i207.externalTargetLineageUnresolvedQuestionCount === 3 &&
    i207.provenanceIndependenceAdjudicatedByThisGate === false &&
    i207.independentNormativeProvenanceEstablishedCount === 0 &&
    i207.explicitDerivativeRelationshipCheckRequired &&
    i207.derivativeRetransmissionCountsAsIndependentAuthority === false &&
    i207.unresolvedLineageDefaultDisposition === 'REJECT_INDEPENDENCE_CLAIM' &&
    i207.I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate === false &&
    i207.I132IndependentNormativeProvenanceRequirementRemainsNormative &&
    i207.I132PolicyRelaxationAuthorizedByThisGate === false &&
    i207.reassessmentControlIds.length === I207_REASSESSMENT_CONTROL_IDS.length &&
    i207.reassessmentControlCount === 12 &&
    i207.reassessmentControlsFrozen &&
    i207.currentV2PackageAndCandidateSetRemainImmutable &&
    i207.currentV2ProvenanceDisposition === 'BLOCKED_UNDER_CURRENT_EVIDENCE' &&
    i207.candidateSetMutatedByThisGate === false &&
    i207.candidateSetReevaluationAuthorizedByThisGate === false &&
    i207.productionPolicyExecutionAuthorized === false &&
    i207.actualCompositionPerformedByThisGate === false &&
    i207.multiSourceCompositionAuthorized === false &&
    i207.thresholdRuleCreatedByThisGate === false &&
    i207.classificationAuthorized === false &&
    i207.numericScoringAuthorized === false &&
    i207.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_QU_WEI_2001_CUSTODIAN_BOUND_CANONICAL_WITNESS_FACSIMILE_ACQUISITION_READINESS_REVIEW'
  );
}

function finalized(
  material: Omit<I208QuWei2001CustodianBoundCanonicalWitnessFacsimileAcquisitionReadinessReviewReport, 'reviewId'>,
): I208QuWei2001CustodianBoundCanonicalWitnessFacsimileAcquisitionReadinessReviewReport {
  return {
    reviewId: `i208_qu_wei_2001_custodian_bound_readiness_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI208QuWei2001CustodianBoundCanonicalWitnessFacsimileAcquisitionReadinessReview(
  i207: I207QuWei2001TwoGapAcquisitionEvidenceAdequacyResidualPathReassessmentReviewReport,
): I208QuWei2001CustodianBoundCanonicalWitnessFacsimileAcquisitionReadinessReviewReport {
  const accepted = exactI207Accepted(i207);

  return finalized({
    reviewVersion: I208_QU_WEI_2001_CUSTODIAN_BOUND_CANONICAL_WITNESS_FACSIMILE_ACQUISITION_READINESS_REVIEW_VERSION,
    status: accepted
      ? 'RESOLVED_QU_WEI_2001_CUSTODIAN_BOUND_CANONICAL_WITNESS_FACSIMILE_ACQUISITION_READINESS_REVIEW'
      : 'I207_RESIDUAL_PATH_REASSESSMENT_BOUNDARY_INVALID',
    decision: accepted
      ? 'I207_BOUNDARY_SUPPORTS_CUSTODIAN_BOUND_CANONICAL_WITNESS_FACSIMILE_ACQUISITION_TWO_PATHS_EIGHT_OBLIGATIONS_SIXTEEN_CONTROLS_FROZEN_MATERIALLY_NEW_SUBSTRATE_ONLY_EVIDENCE_COLLECTION_NO_REBINDING_NO_INDEPENDENCE'
      : 'QU_WEI_2001_CUSTODIAN_BOUND_CANONICAL_WITNESS_FACSIMILE_ACQUISITION_NOT_READY',
    upstreamI207ReviewId: i207.reviewId,
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI207BoundaryAccepted: accepted,
    targetPriorWitnessId: accepted ? 'QU_WEI_SIZHU_XIANGZHEN_2001' : null,
    targetAuthor: accepted ? '曲炜' : null,
    targetTitle: accepted ? '《四柱详真》' : null,
    targetAppearanceYear: accepted ? 2001 : null,
    resolvedPublicationGapPreserved: accepted,
    publicationGapTargetedByThisGate: false,
    publicationGapMayBeReopenedWithoutContradictoryPrimaryEvidence: false,
    remainingGapCountAtEntry: accepted ? 2 : 0,
    canonicalWitnessNormalizationGapOpenAtEntry: accepted,
    exactTargetPassageBindingGapOpenAtEntry: accepted,
    materialUnboundRouteSequenceCorrespondencePreserved: accepted,
    correspondingRouteElementCountPreserved: accepted ? 3 : 0,
    equivalentPublicSurfaceRepeatAuthorizedByThisGate: false,
    acquisitionPathIds: I208_ACQUISITION_PATH_IDS,
    acquisitionPathCount: 2,
    acquisitionPathsFrozenProspectively: accepted,
    evidenceObligationIds: I208_EVIDENCE_OBLIGATION_IDS,
    evidenceObligationCount: 8,
    evidenceObligationsFrozenProspectively: accepted,
    acquisitionControlIds: I208_ACQUISITION_CONTROL_IDS,
    acquisitionControlCount: 16,
    acquisitionControlsFrozenProspectively: accepted,
    directCustodianArchiveOwnerOrFirstGenerationIdentityRequired: accepted,
    directAuthorTitle2001WitnessProvenanceRequired: accepted,
    secondaryMetadataMayBackfillWitnessProvenance: false,
    reproduciblePhysicalScanOrByteStableIdentityRequired: accepted,
    titleCopyrightTocPaginationTargetStructureAnchorsRequired: accepted,
    pageCountFileSizeFilenameHostVarianceAloneMayResolveNormalization: false,
    canonically2001BoundTargetSectionFacsimileRequired: accepted,
    targetSectionPageContextOrNeighboringTextAnchorsRequired: accepted,
    governed2003RouteSequenceAvailableAsComparisonTarget: accepted,
    directCanonical2001To2003SequenceComparisonRequired: accepted,
    unboundPublicTextSimilarityMayResolveExactPassageGap: false,
    normalizationAndExactPassageMayCrossBackfill: false,
    custodianBoundCanonicalWitnessFacsimileAcquisitionMayProceed: accepted,
    authorizationIsEvidenceCollectionOnly: accepted,
    acquisitionExecutedByThisGate: false,
    evidenceAcquiredByThisGate: false,
    gapResolvedByThisGateCount: 0,
    explicitNegativeFindingCountCreatedByThisGate: 0,
    nonAcquisitionCreatesNegativeFinding: false,
    accessFailureCreatesNegativeFinding: false,
    custodianSilenceCreatesNegativeFinding: false,
    paywallCreatesNegativeFinding: false,
    searchSilenceCreatesNegativeFinding: false,
    inaccessibleSubstrateCreatesNegativeFinding: false,
    targetedDiscoveryExhaustionEstablished: false,
    onlineCorpusExhaustionEstablished: false,
    corpusExhaustionEstablished: false,
    allTwoRemainingGapsRequiredBeforeRebindingReadiness: accepted,
    evidenceRebindingMethodologicallyReady: false,
    evidenceRebindingAuthorizedByThisGate: false,
    evidenceRebindingExecutedByThisGate: false,
    sameAuthor2001To2003DoctrinalDependencyPreserved: accepted,
    externalTargetLineageUnresolvedQuestionCount: accepted ? 3 : 0,
    provenanceIndependenceAdjudicatedByThisGate: false,
    independentNormativeProvenanceEstablishedCount: 0,
    explicitDerivativeRelationshipCheckRequired: accepted,
    derivativeRetransmissionCountsAsIndependentAuthority: false,
    unresolvedLineageDefaultDisposition: 'REJECT_INDEPENDENCE_CLAIM',
    I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate: false,
    I132IndependentNormativeProvenanceRequirementRemainsNormative: accepted,
    I132PolicyRelaxationAuthorizedByThisGate: false,
    sourceClassAloneSufficient: false,
    sourceCountMayBecomeNumericWeight: false,
    provenanceTierMayBecomeNumericWeight: false,
    candidateSelectedByThisGate: false,
    candidateRegistrationAuthorizedByThisGate: false,
    candidateSetMutatedByThisGate: false,
    candidateSetReevaluationAuthorizedByThisGate: false,
    candidateSetAdmissibilityEstablishedByThisGate: false,
    newCandidateSetVersionCreatedByThisGate: false,
    newInputPackageVersionCreatedByThisGate: false,
    currentV2PackageAndCandidateSetRemainImmutable: accepted,
    currentV2ProvenanceDisposition: accepted ? 'BLOCKED_UNDER_CURRENT_EVIDENCE' : 'NOT_ASSESSED',
    liSameTargetPathSuspendedNotRetired: accepted,
    liSameTargetMayReopenOnMateriallyNewDirectLead: accepted,
    liPublicationMediumOrEntityGapStillOpen: accepted,
    liCanonicalDigitalWitnessNormalizationGapStillOpen: accepted,
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
      ? 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_QU_WEI_2001_CUSTODIAN_BOUND_CANONICAL_WITNESS_FACSIMILE_ACQUISITION_EVIDENCE'
      : 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_QU_WEI_2001_CUSTODIAN_BOUND_CANONICAL_WITNESS_FACSIMILE_ACQUISITION_READINESS_REVIEW',
    notes: accepted
      ? Object.freeze([
          'I208 freezes exactly two materially new substrate paths from I207 and does not authorize repetition of the already observed public representation surfaces as progress.',
          'A qualifying witness path requires direct custodian/archive/owner or first-generation source identity, author-title-2001 provenance, reproducible scan or byte identity, and direct structure anchors.',
          'A qualifying target-passage path requires a facsimile canonically bound to that 2001 witness plus page/context anchors before the already acquired governed 2003 route sequence may be used for direct comparison.',
          'Normalization and exact-passage adjudication remain separate; neither may cross-backfill the other.',
          'Custodian silence, inaccessible substrate, paywalls, access failures, search silence, and non-acquisition remain non-negative and cannot establish exhaustion.',
          'No rebinding, independence adjudication, I132 relaxation, candidate/v2 change, composition, threshold creation, classification, scoring, or production authority is granted.',
        ])
      : Object.freeze(['I207 boundary mismatch prevents custodian-bound canonical witness/facsimile acquisition readiness.']),
  });
}
