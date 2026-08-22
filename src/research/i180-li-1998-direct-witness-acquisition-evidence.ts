import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { I179Li1998DirectWitnessAcquisitionReadinessReviewReport } from './i179-li-1998-direct-witness-acquisition-readiness-review.js';

export const I180_LI_1998_DIRECT_WITNESS_ACQUISITION_EVIDENCE_VERSION =
  'myeonghwa-li-1998-direct-primary-witness-variant-normalization-evidence-acquisition-record-v1';

export const I180_EVIDENCE_SOURCE_IDS = Object.freeze([
  'SCRIBD_744317976_DIRECT_COVER_SURFACE',
  'LI_SHUNXIANG_OFFICIAL_CHRONOLOGY_1998_APPEARANCE',
  'EMEI_WISDOM_PREDICTION_RESEARCH_SERIES_EDITORIAL_CONTEXT',
  'GUOXUEZIYUAN_314_PAGE_REPRESENTATION_LISTING',
  'FANGGUANG_413_PAGE_REPRESENTATION_LISTING',
  'SCRIBD_6865_INVENTORY_15_48_MB_REPRESENTATION',
] as const);

export type I180EvidenceSourceId = (typeof I180_EVIDENCE_SOURCE_IDS)[number];

export interface I180EvidenceObservation {
  sourceId: I180EvidenceSourceId;
  sourceClass:
    | 'DIRECT_COVER_PAGE_IMAGE_SURFACE'
    | 'AUTHOR_PRIMARY_CHRONOLOGY'
    | 'EXTERNAL_SERIES_CONTEXT'
    | 'DERIVATIVE_RESOURCE_LISTING'
    | 'DERIVATIVE_FILE_INVENTORY';
  locator: string;
  acquiredOrRevalidated: 'NEW_DIRECT_SURFACE_ACQUIRED' | 'REVALIDATED_CONTEXT' | 'REVALIDATED_DERIVATIVE_LISTING';
  publicationIdentityResolutionRole:
    | 'NONRESOLVING_DIRECT_WITNESS_CONTEXT'
    | 'NONRESOLVING_1998_APPEARANCE_CONTEXT'
    | 'NONRESOLVING_SERIES_CONTEXT'
    | 'NO_PUBLICATION_IDENTITY_AUTHORITY';
  variantNormalizationResolutionRole:
    | 'NONRESOLVING_NEW_REPRESENTATION_SURFACE'
    | 'NO_VARIANT_NORMALIZATION_AUTHORITY'
    | 'NONRESOLVING_REPRESENTATION_LISTING';
  independentNormativeProvenanceEstablished: false;
}

export interface I180Li1998DirectWitnessAcquisitionEvidenceReport {
  evidenceRecordSetId: string;
  evidenceVersion: string;
  status:
    | 'RESOLVED_LI_1998_DIRECT_PRIMARY_WITNESS_VARIANT_NORMALIZATION_EVIDENCE_ACQUISITION_RECORD'
    | 'I179_ACQUISITION_READINESS_BOUNDARY_INVALID';
  decision:
    | 'DIRECT_WITNESS_ACQUISITION_EXECUTED_ONE_STABLE_COVER_SURFACE_OBSERVED_ZERO_1998_SPECIFIC_PUBLICATION_BINDINGS_ZERO_COMPLETE_VARIANT_NORMALIZATIONS_TWO_GAPS_REMAIN_UNRESOLVED_NO_REBINDING_NO_INDEPENDENCE'
    | 'LI_1998_DIRECT_WITNESS_ACQUISITION_NOT_EXECUTED';
  upstreamI179ReviewId: string;
  policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy';
  policyVersion: 'v1-definition';
  adoptionVersion: 'v1-adoption';
  currentCandidateSetVersion: 'v1-candidate-set';
  currentInputPackageVersion: 'v2-input-package';
  exactI179BoundaryAccepted: boolean;
  evidenceAcquisitionExecuted: boolean;
  publicationIdentityLaneExecuted: boolean;
  variantNormalizationLaneExecuted: boolean;
  evidenceObservations: readonly I180EvidenceObservation[];
  evidenceObservationCount: 6 | 0;
  newDirectWitnessSurfaceAcquiredCount: 1 | 0;
  qualifying1998PublicationIdentityBindingCount: 0;
  completeVariantNormalizationCount: 0;
  directStableCoverSurfaceObserved: boolean;
  scribdDocumentId: '744317976' | null;
  scribdReportedDocumentPageCount: 202 | null;
  scribdStableDocumentLocator:
    | 'https://www.scribd.com/document/744317976/104-%E6%9D%8E%E9%A1%BA%E7%A5%A5-%E5%9B%9B%E6%9F%B1%E5%91%BD%E7%90%86%E5%AD%A6%E8%87%AA%E4%BF%AE%E6%95%99%E7%A8%8B-%E6%99%AE%E5%8F%8A%E7%8F%AD'
    | null;
  directCoverTitleObserved: boolean;
  directCoverAuthorObserved: boolean;
  directCoverSeriesMarkerObserved: boolean;
  directCoverSeriesMarker: '预测研究系列丛书' | null;
  directCover1998DateObserved: false;
  directCoverPublisherObserved: false;
  directCoverIssuingEntityObserved: false;
  directCoverIsbnObserved: false;
  directCoverEstablishes1998PublicationIdentity: false;
  authorPrimaryChronology1998AppearanceRevalidated: boolean;
  chronologyCompanyCoLocationRevalidated: boolean;
  chronologyCompanyMayBeInferredAsPublisher: false;
  externalSeriesEditorialContextObserved: boolean;
  externalSeriesEditorialContextBindsThisWorkTo1998Issuer: false;
  explicit1998LibraryArchiveBibliographicRecordLocated: false;
  explicit1998PublisherIssuerDistributorRecordLocated: false;
  explicit1998NonformalDistributionStatusRecordLocated: false;
  later2002MetadataMayBackfill1998: false;
  ambiguousUploaderMetadataMayResolve1998PublicationStatus: false;
  publicationMediumOrEntityGapResolved: false;
  observedRepresentationPageCounts: readonly [202, 314, 413] | readonly [];
  observedRepresentationSizesMb: readonly [15.48, 47.37, 47.44, 49.6] | readonly [];
  direct202FullWitnessAccessObtained: false;
  direct314FullWitnessAccessObtained: false;
  direct413FullWitnessAccessObtained: false;
  direct314And413ComparableWitnessSetObtained: false;
  crossVariantTitleImprintCopyrightComparisonCompleted: false;
  crossVariantPaginationTocTargetPassageComparisonCompleted: false;
  crossVariantAdditionDeletionReorderingComparisonCompleted: false;
  crossVariantScanArtifactComparisonCompleted: false;
  cryptographicHashOrStableFileIdentityAcquiredCount: 0;
  pageCountDifferenceAloneCreatesDistinctEdition: false;
  fileSizeDifferenceAloneCreatesDistinctEdition: false;
  filenameDifferenceAloneCreatesDistinctEdition: false;
  directCoverSurfaceAloneCreatesCanonicalWitness: false;
  canonicalDigitalWitnessEstablished: false;
  normalizedWitnessFamilyEstablished: false;
  canonicalDigitalWitnessNormalizationGapResolved: false;
  oneLaneResolutionSufficientForRebinding: false;
  bothIdentityFunctionsRequiredBeforeRebindingReadiness: boolean;
  evidenceRebindingMethodologicallyReady: false;
  evidenceRebindingAuthorizedByThisGate: false;
  evidenceRebindingSelectedByThisGate: false;
  evidenceRebindingExecutedByThisGate: false;
  explicitNegativeFindingCount: 0;
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
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_1998_DIRECT_WITNESS_ACQUISITION_EVIDENCE_ADEQUACY_REBINDING_READINESS_REVIEW'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_1998_DIRECT_PRIMARY_WITNESS_AND_VARIANT_NORMALIZATION_EVIDENCE_ACQUISITION_RECORD';
  notes: readonly string[];
}

function exactI179Accepted(i179: I179Li1998DirectWitnessAcquisitionReadinessReviewReport): boolean {
  return (
    i179.status === 'RESOLVED_LI_1998_DIRECT_PRIMARY_WITNESS_VARIANT_NORMALIZATION_EVIDENCE_ACQUISITION_READINESS_REVIEW' &&
    i179.decision ===
      'DIRECT_PRIMARY_WITNESS_AND_VARIANT_NORMALIZATION_ACQUISITION_PROTOCOL_FROZEN_TWO_LANES_READY_NO_EVIDENCE_ACQUIRED_NO_REBINDING_NO_INDEPENDENCE' &&
    i179.policyId === 'myeonghwa-visible-stem-ke-multi-source-composition-policy' &&
    i179.policyVersion === 'v1-definition' &&
    i179.adoptionVersion === 'v1-adoption' &&
    i179.currentCandidateSetVersion === 'v1-candidate-set' &&
    i179.currentInputPackageVersion === 'v2-input-package' &&
    i179.exactI178BoundaryAccepted &&
    i179.acquisitionLaneCount === 2 &&
    i179.publicationIdentityLaneReady &&
    i179.variantNormalizationLaneReady &&
    i179.publicationIdentityEvidenceClassCount === 4 &&
    i179.variantNormalizationEvidenceClassCount === 6 &&
    i179.acquisitionRequirementCount === 12 &&
    i179.acquisitionRequirementsFrozenProspectively &&
    i179.formalAndNonformalPublicationPathsBothPermitted &&
    i179.explicit1998BindingRequired &&
    i179.later2002MetadataMayBackfill1998Identity === false &&
    i179.companyChronologyMayEstablish1998PublisherIdentity === false &&
    i179.ambiguousUploaderFieldMayResolve1998PublicationStatus === false &&
    i179.directComparableVariantAccessRequired &&
    i179.titleImprintPaginationTocTargetPassageAndStructuralComparisonRequired &&
    i179.stableFileIdentityRecordRequiredWhenAvailable &&
    i179.OCRSnippetAloneMayResolveVariantRelationship === false &&
    i179.pageCountAloneMayResolveVariantRelationship === false &&
    i179.fileSizeAloneMayResolveVariantRelationship === false &&
    i179.filenameAloneMayResolveVariantRelationship === false &&
    i179.oneLaneResolutionSufficientForRebinding === false &&
    i179.bothIdentityFunctionsRequiredBeforeRebindingReadiness &&
    i179.evidenceAcquisitionExecutedByThisGate === false &&
    i179.publicationIdentityEvidenceAcquiredCount === 0 &&
    i179.variantNormalizationEvidenceAcquiredCount === 0 &&
    i179.publicationMediumOrEntityGapResolvedByThisGate === false &&
    i179.canonicalDigitalWitnessNormalizationGapResolvedByThisGate === false &&
    i179.evidenceRebindingMethodologicallyReady === false &&
    i179.evidenceRebindingAuthorizedByThisGate === false &&
    i179.evidenceRebindingSelectedByThisGate === false &&
    i179.evidenceRebindingExecutedByThisGate === false &&
    i179.targetedDiscoveryExhaustionEstablished === false &&
    i179.corpusExhaustionEstablished === false &&
    i179.searchSilenceCreatesNegativeFinding === false &&
    i179.current2004WitnessPresumedOriginRetired &&
    i179.prior1998SameAuthorWitnessConfirmed &&
    i179.prior1998WitnessIndependentProvenanceEstablished === false &&
    i179.sameAuthor1998To2004DerivativeChainMustRemainBound &&
    i179.externalLineageUnresolvedQuestionCount === 3 &&
    i179.externalLineageUnresolvedStatusPreserved &&
    i179.provenanceIndependenceAdjudicatedByThisGate === false &&
    i179.independentNormativeProvenanceEstablishedCount === 0 &&
    i179.I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate === false &&
    i179.I132IndependentNormativeProvenanceRequirementRemainsNormative &&
    i179.I132PolicyRelaxationAuthorizedByThisGate === false &&
    i179.sourceCountVotingAllowed === false &&
    i179.provenanceTierWeightingAllowed === false &&
    i179.candidateSelectedByThisGate === false &&
    i179.remediationStrategySelectedByThisGate === false &&
    i179.remediationExecutionAuthorizedByThisGate === false &&
    i179.candidateSetMutatedByThisGate === false &&
    i179.newCandidateSetVersionCreatedByThisGate === false &&
    i179.newInputPackageVersionCreatedByThisGate === false &&
    i179.currentV2PackageAndCandidateSetRemainImmutable &&
    i179.currentV2ProvenanceDisposition === 'BLOCKED_UNDER_CURRENT_EVIDENCE' &&
    i179.candidateSetReevaluationAuthorizedByThisGate === false &&
    i179.candidateSetAdmissibilityEstablishedByThisGate === false &&
    i179.productionPolicyExecutionAuthorized === false &&
    i179.actualCompositionPerformedByThisGate === false &&
    i179.multiSourceCompositionAuthorized === false &&
    i179.authorityAcquiredByThisGate === false &&
    i179.visibleStemBinaryEffectiveInteractionEligibilityResolved === false &&
    i179.thresholdRuleCreatedByThisGate === false &&
    i179.damageEvaluationAuthorized === false &&
    i179.classificationAuthorized === false &&
    i179.numericScoringAuthorized === false &&
    i179.hiddenStemInteractionEligibilityGapRemains &&
    i179.hiddenStemAuthorityGap === 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED' &&
    i179.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_1998_DIRECT_PRIMARY_WITNESS_AND_VARIANT_NORMALIZATION_EVIDENCE_ACQUISITION_RECORD'
  );
}

function observations(): readonly I180EvidenceObservation[] {
  return Object.freeze([
    {
      sourceId: 'SCRIBD_744317976_DIRECT_COVER_SURFACE',
      sourceClass: 'DIRECT_COVER_PAGE_IMAGE_SURFACE',
      locator:
        'https://www.scribd.com/document/744317976/104-%E6%9D%8E%E9%A1%BA%E7%A5%A5-%E5%9B%9B%E6%9F%B1%E5%91%BD%E7%90%86%E5%AD%A6%E8%87%AA%E4%BF%AE%E6%95%99%E7%A8%8B-%E6%99%AE%E5%8F%8A%E7%8F%AD',
      acquiredOrRevalidated: 'NEW_DIRECT_SURFACE_ACQUIRED',
      publicationIdentityResolutionRole: 'NONRESOLVING_DIRECT_WITNESS_CONTEXT',
      variantNormalizationResolutionRole: 'NONRESOLVING_NEW_REPRESENTATION_SURFACE',
      independentNormativeProvenanceEstablished: false,
    },
    {
      sourceId: 'LI_SHUNXIANG_OFFICIAL_CHRONOLOGY_1998_APPEARANCE',
      sourceClass: 'AUTHOR_PRIMARY_CHRONOLOGY',
      locator: 'https://www.sxw.cc/sjw/zj/',
      acquiredOrRevalidated: 'REVALIDATED_CONTEXT',
      publicationIdentityResolutionRole: 'NONRESOLVING_1998_APPEARANCE_CONTEXT',
      variantNormalizationResolutionRole: 'NO_VARIANT_NORMALIZATION_AUTHORITY',
      independentNormativeProvenanceEstablished: false,
    },
    {
      sourceId: 'EMEI_WISDOM_PREDICTION_RESEARCH_SERIES_EDITORIAL_CONTEXT',
      sourceClass: 'EXTERNAL_SERIES_CONTEXT',
      locator: 'https://www.emeiwisdom.com/zh/2016-04-09-13-58-44.html?iccaldate=2019-12-1',
      acquiredOrRevalidated: 'REVALIDATED_CONTEXT',
      publicationIdentityResolutionRole: 'NONRESOLVING_SERIES_CONTEXT',
      variantNormalizationResolutionRole: 'NO_VARIANT_NORMALIZATION_AUTHORITY',
      independentNormativeProvenanceEstablished: false,
    },
    {
      sourceId: 'GUOXUEZIYUAN_314_PAGE_REPRESENTATION_LISTING',
      sourceClass: 'DERIVATIVE_RESOURCE_LISTING',
      locator: 'https://www.guoxueziyuan.com/3415.html',
      acquiredOrRevalidated: 'REVALIDATED_DERIVATIVE_LISTING',
      publicationIdentityResolutionRole: 'NO_PUBLICATION_IDENTITY_AUTHORITY',
      variantNormalizationResolutionRole: 'NONRESOLVING_REPRESENTATION_LISTING',
      independentNormativeProvenanceEstablished: false,
    },
    {
      sourceId: 'FANGGUANG_413_PAGE_REPRESENTATION_LISTING',
      sourceClass: 'DERIVATIVE_RESOURCE_LISTING',
      locator: 'https://r1689.com/m/view.php?aid=349',
      acquiredOrRevalidated: 'REVALIDATED_DERIVATIVE_LISTING',
      publicationIdentityResolutionRole: 'NO_PUBLICATION_IDENTITY_AUTHORITY',
      variantNormalizationResolutionRole: 'NONRESOLVING_REPRESENTATION_LISTING',
      independentNormativeProvenanceEstablished: false,
    },
    {
      sourceId: 'SCRIBD_6865_INVENTORY_15_48_MB_REPRESENTATION',
      sourceClass: 'DERIVATIVE_FILE_INVENTORY',
      locator:
        'https://www.scribd.com/document/799078960/6865%E5%86%8C%E6%98%93%E5%AD%A6%E4%B9%A6%E7%B1%8D',
      acquiredOrRevalidated: 'REVALIDATED_DERIVATIVE_LISTING',
      publicationIdentityResolutionRole: 'NO_PUBLICATION_IDENTITY_AUTHORITY',
      variantNormalizationResolutionRole: 'NONRESOLVING_REPRESENTATION_LISTING',
      independentNormativeProvenanceEstablished: false,
    },
  ]);
}

function finalized(
  material: Omit<I180Li1998DirectWitnessAcquisitionEvidenceReport, 'evidenceRecordSetId'>,
): I180Li1998DirectWitnessAcquisitionEvidenceReport {
  return {
    evidenceRecordSetId: `i180_li_1998_direct_witness_evidence_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI180Li1998DirectWitnessAcquisitionEvidence(
  i179: I179Li1998DirectWitnessAcquisitionReadinessReviewReport,
): I180Li1998DirectWitnessAcquisitionEvidenceReport {
  const accepted = exactI179Accepted(i179);

  return finalized({
    evidenceVersion: I180_LI_1998_DIRECT_WITNESS_ACQUISITION_EVIDENCE_VERSION,
    status: accepted
      ? 'RESOLVED_LI_1998_DIRECT_PRIMARY_WITNESS_VARIANT_NORMALIZATION_EVIDENCE_ACQUISITION_RECORD'
      : 'I179_ACQUISITION_READINESS_BOUNDARY_INVALID',
    decision: accepted
      ? 'DIRECT_WITNESS_ACQUISITION_EXECUTED_ONE_STABLE_COVER_SURFACE_OBSERVED_ZERO_1998_SPECIFIC_PUBLICATION_BINDINGS_ZERO_COMPLETE_VARIANT_NORMALIZATIONS_TWO_GAPS_REMAIN_UNRESOLVED_NO_REBINDING_NO_INDEPENDENCE'
      : 'LI_1998_DIRECT_WITNESS_ACQUISITION_NOT_EXECUTED',
    upstreamI179ReviewId: i179.reviewId,
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI179BoundaryAccepted: accepted,
    evidenceAcquisitionExecuted: accepted,
    publicationIdentityLaneExecuted: accepted,
    variantNormalizationLaneExecuted: accepted,
    evidenceObservations: accepted ? observations() : Object.freeze([]),
    evidenceObservationCount: accepted ? 6 : 0,
    newDirectWitnessSurfaceAcquiredCount: accepted ? 1 : 0,
    qualifying1998PublicationIdentityBindingCount: 0,
    completeVariantNormalizationCount: 0,
    directStableCoverSurfaceObserved: accepted,
    scribdDocumentId: accepted ? '744317976' : null,
    scribdReportedDocumentPageCount: accepted ? 202 : null,
    scribdStableDocumentLocator: accepted
      ? 'https://www.scribd.com/document/744317976/104-%E6%9D%8E%E9%A1%BA%E7%A5%A5-%E5%9B%9B%E6%9F%B1%E5%91%BD%E7%90%86%E5%AD%A6%E8%87%AA%E4%BF%AE%E6%95%99%E7%A8%8B-%E6%99%AE%E5%8F%8A%E7%8F%AD'
      : null,
    directCoverTitleObserved: accepted,
    directCoverAuthorObserved: accepted,
    directCoverSeriesMarkerObserved: accepted,
    directCoverSeriesMarker: accepted ? '预测研究系列丛书' : null,
    directCover1998DateObserved: false,
    directCoverPublisherObserved: false,
    directCoverIssuingEntityObserved: false,
    directCoverIsbnObserved: false,
    directCoverEstablishes1998PublicationIdentity: false,
    authorPrimaryChronology1998AppearanceRevalidated: accepted,
    chronologyCompanyCoLocationRevalidated: accepted,
    chronologyCompanyMayBeInferredAsPublisher: false,
    externalSeriesEditorialContextObserved: accepted,
    externalSeriesEditorialContextBindsThisWorkTo1998Issuer: false,
    explicit1998LibraryArchiveBibliographicRecordLocated: false,
    explicit1998PublisherIssuerDistributorRecordLocated: false,
    explicit1998NonformalDistributionStatusRecordLocated: false,
    later2002MetadataMayBackfill1998: false,
    ambiguousUploaderMetadataMayResolve1998PublicationStatus: false,
    publicationMediumOrEntityGapResolved: false,
    observedRepresentationPageCounts: accepted ? ([202, 314, 413] as const) : Object.freeze([]),
    observedRepresentationSizesMb: accepted ? ([15.48, 47.37, 47.44, 49.6] as const) : Object.freeze([]),
    direct202FullWitnessAccessObtained: false,
    direct314FullWitnessAccessObtained: false,
    direct413FullWitnessAccessObtained: false,
    direct314And413ComparableWitnessSetObtained: false,
    crossVariantTitleImprintCopyrightComparisonCompleted: false,
    crossVariantPaginationTocTargetPassageComparisonCompleted: false,
    crossVariantAdditionDeletionReorderingComparisonCompleted: false,
    crossVariantScanArtifactComparisonCompleted: false,
    cryptographicHashOrStableFileIdentityAcquiredCount: 0,
    pageCountDifferenceAloneCreatesDistinctEdition: false,
    fileSizeDifferenceAloneCreatesDistinctEdition: false,
    filenameDifferenceAloneCreatesDistinctEdition: false,
    directCoverSurfaceAloneCreatesCanonicalWitness: false,
    canonicalDigitalWitnessEstablished: false,
    normalizedWitnessFamilyEstablished: false,
    canonicalDigitalWitnessNormalizationGapResolved: false,
    oneLaneResolutionSufficientForRebinding: false,
    bothIdentityFunctionsRequiredBeforeRebindingReadiness: accepted,
    evidenceRebindingMethodologicallyReady: false,
    evidenceRebindingAuthorizedByThisGate: false,
    evidenceRebindingSelectedByThisGate: false,
    evidenceRebindingExecutedByThisGate: false,
    explicitNegativeFindingCount: 0,
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
      ? 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_1998_DIRECT_WITNESS_ACQUISITION_EVIDENCE_ADEQUACY_REBINDING_READINESS_REVIEW'
      : 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_1998_DIRECT_PRIMARY_WITNESS_AND_VARIANT_NORMALIZATION_EVIDENCE_ACQUISITION_RECORD',
    notes: accepted
      ? Object.freeze([
          'A stable direct cover-page image surface was newly acquired through Scribd document 744317976; it visibly binds title, author, and the 预测研究系列丛书 marker but does not display a 1998 date, publisher, issuing entity, or ISBN.',
          'The Scribd surface reports 202 document pages, creating a third observed representation count alongside derivative 314-page and 413-page listings; this increases normalization complexity and does not by itself create a distinct edition.',
          'No direct full 202/314/413 witness file set, title/imprint comparison, TOC/pagination comparison, structural-difference comparison, or cryptographic file identity was acquired.',
          'Official 1998 chronology and external series-editorial context were revalidated but neither explicitly binds this work to a 1998 publisher or issuer.',
          'Both identity gaps remain unresolved. No rebinding, independence adjudication, exhaustion finding, candidate mutation, threshold creation, or production authorization occurs in I180.',
        ])
      : Object.freeze(['I179 boundary mismatch prevents executing the direct-witness acquisition record.']),
  });
}
