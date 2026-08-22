import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type {
  I185DirectPrimaryPathId,
  I185Li1998RemainingDirectPrimaryWitnessAcquisitionReadinessReviewReport,
  I185TargetGap,
} from './i185-li-1998-remaining-direct-primary-witness-acquisition-readiness-review.js';

export const I186_LI_1998_REMAINING_DIRECT_PRIMARY_WITNESS_ACQUISITION_EVIDENCE_VERSION =
  'myeonghwa-li-1998-remaining-direct-primary-witness-acquisition-evidence-v1';

export type I186AcquisitionFinding =
  | 'DIRECT_TARGET_REGISTRY_RECORD_NOT_ACQUIRED_IN_BOUNDED_ATTEMPT_QUERY_INFRASTRUCTURE_IDENTIFIED'
  | 'DIRECT_1998_PUBLICATION_BINDING_NOT_ACQUIRED_IN_BOUNDED_ATTEMPT_AUTHOR_CHRONOLOGY_ONLY'
  | 'DIRECT_FULL_314_413_WITNESS_NOT_ACQUIRED_LISTING_SURFACES_ONLY'
  | 'DIRECT_FULL_202_422_COMPARABLE_SET_NOT_ACQUIRED_LATER_422_METADATA_ONLY'
  | 'STABLE_FILE_HASH_OR_TRANSFORMATION_PROVENANCE_NOT_ACQUIRED';

export interface I186AcquisitionEvidenceRecord {
  pathId: I185DirectPrimaryPathId;
  priority: 1 | 2 | 3 | 4 | 5;
  targetGap: I185TargetGap;
  finding: I186AcquisitionFinding;
  sourceLocators: readonly string[];
  observationSummary: readonly string[];
  qualifyingAcquisitionCount: 0;
  resolvesTargetGap: false;
  negativeFindingEstablished: false;
}

export interface I186Li1998RemainingDirectPrimaryWitnessAcquisitionEvidenceReport {
  evidenceRecordSetId: string;
  evidenceVersion: string;
  status:
    | 'RESOLVED_LI_1998_REMAINING_DIRECT_PRIMARY_WITNESS_ACQUISITION_EVIDENCE'
    | 'I185_DIRECT_PRIMARY_ACQUISITION_BOUNDARY_INVALID';
  decision:
    | 'REMAINING_DIRECT_PRIMARY_WITNESS_ACQUISITION_EXECUTED_FIVE_PATHS_ZERO_QUALIFYING_1998_PUBLICATION_BINDINGS_ZERO_DIRECT_COMPARABLE_WITNESSES_ZERO_STABLE_FILE_IDENTITIES_TWO_GAPS_REMAIN_UNRESOLVED_NO_REBINDING_NO_INDEPENDENCE'
    | 'LI_1998_REMAINING_DIRECT_PRIMARY_WITNESS_ACQUISITION_NOT_EXECUTED';
  upstreamI185ReviewId: string;
  policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy';
  policyVersion: 'v1-definition';
  adoptionVersion: 'v1-adoption';
  currentCandidateSetVersion: 'v1-candidate-set';
  currentInputPackageVersion: 'v2-input-package';
  exactI185BoundaryAccepted: boolean;
  acquisitionExecuted: boolean;
  executedPathCount: 5 | 0;
  evidenceRecords: readonly I186AcquisitionEvidenceRecord[];
  evidenceRecordCount: 5 | 0;
  observationalEvidenceRecordedByThisGate: boolean;
  qualifyingIdentityEvidenceAcquiredByThisGate: false;
  qualifyingAcquisitionCount: 0;
  directTargetRegistryInfrastructureIdentified: boolean;
  directTargetRegistryRecordAcquiredCount: 0;
  directTargetRegistryCertificateAcquiredCount: 0;
  directTargetRegistrationNumberAcquiredCount: 0;
  authorReported2018RegistrationContextReconfirmed: boolean;
  authorReportedRegistrationCountsAsDirectRegistryEvidence: false;
  authorReportedRegistrationEstablishes1998PublicationMedium: false;
  authorChronology1998AppearanceReconfirmed: boolean;
  authorChronologyCompanyCoLocationEstablishesPublisherIdentity: false;
  direct1998ColophonOrImprintWitnessAcquiredCount: 0;
  direct1998PublisherIssuerDistributorBindingCount: 0;
  explicit1998NonformalDistributionBindingCount: 0;
  later2002FormalEditionReconfirmed: boolean;
  later2002FormalEditionIsbn: '9789627943679' | null;
  later2002FormalEditionPageCount: 422 | 0;
  later2002FormalEditionMayBackfill1998PublicationIdentity: false;
  listing314PageRepresentationReconfirmed: boolean;
  listing413PageRepresentationReconfirmed: boolean;
  listing413PageFileSizeMb: 47.44 | 0;
  alternate413RepresentationFileSizeMb: 47.37 | 0;
  alternateTargetFileSizeMb: 15.48 | 0;
  uploaderNonformalFieldObserved: boolean;
  uploaderNonformalFieldEstablishes1998PublicationStatus: false;
  directFull314WitnessAcquiredCount: 0;
  directFull413WitnessAcquiredCount: 0;
  directFull202ReferenceWitnessAcquiredCount: 0;
  directFull422ReferenceWitnessAcquiredCount: 0;
  later422MetadataAndTocObservedWithoutFullComparableWitness: boolean;
  directComparableFullWitnessSetAcquired: false;
  crossVariantTitleImprintCopyrightComparisonCompleted: false;
  crossVariantTocPaginationTargetPassageStructureComparisonCompleted: false;
  crossVariantAdditionDeletionReorderingComparisonCompleted: false;
  stableFileIdentityOrHashAcquiredCount: 0;
  transformationProvenanceAcquiredCount: 0;
  completeVariantNormalizationCount: 0;
  pageCountDifferenceAloneCreatesDistinctEdition: false;
  fileSizeDifferenceAloneCreatesDistinctEdition: false;
  filenameDifferenceAloneCreatesDistinctEdition: false;
  listingSurfaceAloneCreatesCanonicalWitness: false;
  publicationMediumOrEntityGapResolved: false;
  canonicalDigitalWitnessNormalizationGapResolved: false;
  bothIdentityFunctionsRequiredBeforeRebindingReadiness: boolean;
  oneIdentityFunctionResolutionSufficientForRebinding: false;
  evidenceRebindingMethodologicallyReady: false;
  evidenceRebindingAuthorizedByThisGate: false;
  evidenceRebindingSelectedByThisGate: false;
  evidenceRebindingExecutedByThisGate: false;
  targetedDiscoveryExhaustionEstablished: false;
  corpusExhaustionEstablished: false;
  explicitNegativeFindingCount: 0;
  searchSilenceCreatesNegativeFinding: false;
  failedRegistryAccessCreatesNegativeFinding: false;
  failedWitnessAccessCreatesNegativeFinding: false;
  nonAcquisitionCreatesNegativeFinding: false;
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
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_1998_REMAINING_DIRECT_PRIMARY_WITNESS_ACQUISITION_EVIDENCE_ADEQUACY_AND_REMEDIATION_PATH_REASSESSMENT_REVIEW'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_1998_REMAINING_DIRECT_PRIMARY_WITNESS_ACQUISITION_EVIDENCE';
  notes: readonly string[];
}

function exactI185Accepted(
  i185: I185Li1998RemainingDirectPrimaryWitnessAcquisitionReadinessReviewReport,
): boolean {
  return (
    i185.status === 'RESOLVED_LI_1998_REMAINING_DIRECT_PRIMARY_WITNESS_ACQUISITION_READINESS_REVIEW' &&
    i185.decision ===
      'I184_FIVE_REMAINING_DIRECT_PRIMARY_PATHS_ACCEPTED_ACQUISITION_REQUIREMENTS_FROZEN_EXECUTION_READY_NO_EVIDENCE_ACQUIRED_TWO_GAPS_UNRESOLVED_NO_REBINDING_NO_INDEPENDENCE' &&
    i185.policyId === 'myeonghwa-visible-stem-ke-multi-source-composition-policy' &&
    i185.policyVersion === 'v1-definition' &&
    i185.adoptionVersion === 'v1-adoption' &&
    i185.currentCandidateSetVersion === 'v1-candidate-set' &&
    i185.currentInputPackageVersion === 'v2-input-package' &&
    i185.exactI184BoundaryAccepted &&
    i185.upstreamPathLevelProgressAccepted &&
    i185.publicationMediumOrEntityGapStillOpen &&
    i185.canonicalDigitalWitnessNormalizationGapStillOpen &&
    i185.directPrimaryPathCount === 5 &&
    i185.directPrimaryPathRequirementCount === 5 &&
    i185.pathPrioritiesFrozenProspectively &&
    i185.acquisitionRequirementCount === 14 &&
    i185.acquisitionRequirementsFrozen &&
    i185.directTargetRegistryCertificateOrRegistrationNumberRequired &&
    i185.directTargetRegistryMustBindExactTargetTitle &&
    i185.directTargetRegistryMustBindAuthorIdentity &&
    i185.directTargetRegistryContextWithoutRecordMayResolveGap === false &&
    i185.direct1998PublicationBindingRequired &&
    i185.formal1998BindingMayUsePublisherIssuerOrDistributor &&
    i185.explicitNonformal1998DistributionBindingAdmissible &&
    i185.chronologyCompanyCoLocationMayEstablishPublisherIdentity === false &&
    i185.later2002FormalMetadataMayBackfill1998Identity === false &&
    i185.laterEditionTocContinuityMayBackfill1998Identity === false &&
    i185.directFullComparableWitnessAccessRequired &&
    i185.comparisonTitleImprintCopyrightRequired &&
    i185.comparisonTocPaginationTargetPassageStructureRequired &&
    i185.comparisonAdditionDeletionReorderingRequired &&
    i185.stableFileHashOrTransformationProvenanceRequired &&
    i185.pageCountAloneMayResolveVariantIdentity === false &&
    i185.physicalFormatAloneMayResolveVariantIdentity === false &&
    i185.fileSizeAloneMayResolveVariantIdentity === false &&
    i185.filenameAloneMayResolveVariantIdentity === false &&
    i185.coverSurfaceAloneMayResolveVariantIdentity === false &&
    i185.aggregatorMayRouteDiscovery &&
    i185.aggregatorAloneMayResolvePublicationIdentity === false &&
    i185.aggregatorAloneMayResolveCanonicalWitnessNormalization === false &&
    i185.acquisitionReadinessEstablished &&
    i185.boundedAcquisitionExecutionAuthorizedByThisGate &&
    i185.evidenceAcquiredByThisGate === false &&
    i185.directRegistryEvidenceAcquiredByThisGate === false &&
    i185.direct1998PublicationBindingAcquiredByThisGate === false &&
    i185.directComparableWitnessAcquiredByThisGate === false &&
    i185.stableFileIdentityAcquiredByThisGate === false &&
    i185.publicationMediumOrEntityGapResolvedByThisGate === false &&
    i185.canonicalDigitalWitnessNormalizationGapResolvedByThisGate === false &&
    i185.targetedDiscoveryExhaustionEstablished === false &&
    i185.corpusExhaustionEstablished === false &&
    i185.explicitNegativeFindingCount === 0 &&
    i185.failedRegistryAccessCreatesNegativeFinding === false &&
    i185.failedWitnessAccessCreatesNegativeFinding === false &&
    i185.searchSilenceCreatesNegativeFinding === false &&
    i185.repetitiveEquivalentSurfaceCountsAsProgress === false &&
    i185.bothIdentityFunctionsRequiredBeforeRebindingReadiness &&
    i185.oneIdentityFunctionResolutionSufficientForRebinding === false &&
    i185.evidenceRebindingMethodologicallyReady === false &&
    i185.evidenceRebindingAuthorizedByThisGate === false &&
    i185.evidenceRebindingSelectedByThisGate === false &&
    i185.evidenceRebindingExecutedByThisGate === false &&
    i185.current2004WitnessPresumedOriginRetired &&
    i185.prior1998SameAuthorWitnessConfirmed &&
    i185.prior1998WitnessIndependentProvenanceEstablished === false &&
    i185.sameAuthor1998To2004DerivativeChainMustRemainBound &&
    i185.externalLineageUnresolvedQuestionCount === 3 &&
    i185.externalLineageUnresolvedStatusPreserved &&
    i185.provenanceIndependenceAdjudicatedByThisGate === false &&
    i185.independentNormativeProvenanceEstablishedCount === 0 &&
    i185.I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate === false &&
    i185.I132IndependentNormativeProvenanceRequirementRemainsNormative &&
    i185.I132PolicyRelaxationAuthorizedByThisGate === false &&
    i185.sourceCountVotingAllowed === false &&
    i185.provenanceTierWeightingAllowed === false &&
    i185.currentV2PackageAndCandidateSetRemainImmutable &&
    i185.currentV2ProvenanceDisposition === 'BLOCKED_UNDER_CURRENT_EVIDENCE' &&
    i185.candidateSetReevaluationAuthorizedByThisGate === false &&
    i185.candidateSetAdmissibilityEstablishedByThisGate === false &&
    i185.productionPolicyExecutionAuthorized === false &&
    i185.actualCompositionPerformedByThisGate === false &&
    i185.multiSourceCompositionAuthorized === false &&
    i185.authorityAcquiredByThisGate === false &&
    i185.visibleStemBinaryEffectiveInteractionEligibilityResolved === false &&
    i185.thresholdRuleCreatedByThisGate === false &&
    i185.damageEvaluationAuthorized === false &&
    i185.classificationAuthorized === false &&
    i185.numericScoringAuthorized === false &&
    i185.hiddenStemInteractionEligibilityGapRemains &&
    i185.hiddenStemAuthorityGap === 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED' &&
    i185.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_1998_REMAINING_DIRECT_PRIMARY_WITNESS_ACQUISITION_EVIDENCE'
  );
}

function records(): readonly I186AcquisitionEvidenceRecord[] {
  return Object.freeze([
    {
      pathId: 'DIRECT_TARGET_TITLE_COPYRIGHT_REGISTRY_CERTIFICATE_OR_REGISTRATION_NUMBER',
      priority: 1,
      targetGap: 'LI_1998_PUBLICATION_MEDIUM_OR_ENTITY_IDENTITY_GAP',
      finding: 'DIRECT_TARGET_REGISTRY_RECORD_NOT_ACQUIRED_IN_BOUNDED_ATTEMPT_QUERY_INFRASTRUCTURE_IDENTIFIED',
      sourceLocators: Object.freeze([
        'https://www.ncac.gov.cn/xxfb/bqshfw/bqdj/djjg/202410/t20241018_870052.html',
        'https://www.gov.cn/gzdt/2012-02/03/content_2057695.htm',
        'https://www.sxw.cc/sjw/zj/',
      ]),
      observationSummary: Object.freeze([
        'National Copyright Administration material identifies China Copyright Protection Center as a works-registration handling institution and documents a national registration-information query infrastructure.',
        'The author chronology reports that works written since 1997, including the target Four Pillars work family, received work-registration certificates in 2018.',
        'No direct target-title registry record, registration number, or certificate identity satisfying the frozen I185 payload was acquired in this bounded attempt.',
        'Non-acquisition is recorded only as acquisition status and is not a negative registration finding.',
      ]),
      qualifyingAcquisitionCount: 0,
      resolvesTargetGap: false,
      negativeFindingEstablished: false,
    },
    {
      pathId: 'DIRECT_1998_PRIMARY_COLOPHON_IMPRINT_OR_DISTRIBUTION_RECORD',
      priority: 2,
      targetGap: 'LI_1998_PUBLICATION_MEDIUM_OR_ENTITY_IDENTITY_GAP',
      finding: 'DIRECT_1998_PUBLICATION_BINDING_NOT_ACQUIRED_IN_BOUNDED_ATTEMPT_AUTHOR_CHRONOLOGY_ONLY',
      sourceLocators: Object.freeze([
        'https://www.sxw.cc/sjw/zj/',
        'https://www.xinyi.hk/goods-1387.html?from=rss',
      ]),
      observationSummary: Object.freeze([
        'The author chronology reconfirms that the target 普及班 work formally appeared in 1998 and separately reports creation of the author’s consulting company in the same chronology entry.',
        'No source acquired in this attempt binds that company or another publisher, issuer, distributor, ISBN, colophon, or explicit reproducible nonformal distribution status specifically to the 1998 witness.',
        'A formal 2002 edition with ISBN 9789627943679 and 422 pages is later-edition evidence only and cannot backfill the 1998 publication identity.',
      ]),
      qualifyingAcquisitionCount: 0,
      resolvesTargetGap: false,
      negativeFindingEstablished: false,
    },
    {
      pathId: 'DIRECT_FULL_314_OR_413_WITNESS_ACQUISITION',
      priority: 3,
      targetGap: 'LI_1998_CANONICAL_DIGITAL_WITNESS_NORMALIZATION_GAP',
      finding: 'DIRECT_FULL_314_413_WITNESS_NOT_ACQUIRED_LISTING_SURFACES_ONLY',
      sourceLocators: Object.freeze([
        'https://www.guoxueziyuan.com/3415.html',
        'https://r1689.com/m/view.php?aid=349',
        'https://www.linglonghui.com/?dir=%2F%E5%85%AB%E5%AD%97%E7%94%B5%E5%AD%90%E4%B9%A6%E5%90%88%E9%9B%86&tag=34&ts=34',
      ]),
      observationSummary: Object.freeze([
        'Aggregator surfaces list a 314-page target PDF and a 413-page target PDF; one 413-page listing reports 47.44 MB and another target listing reports 47.37 MB.',
        'The r1689 uploader field 上传者: 非正式出版 remains ambiguous uploader or catalog metadata and does not establish 1998 publication status.',
        'No direct full 314-page or 413-page witness was acquired for title/imprint/copyright/TOC/pagination/target-passage structural comparison.',
      ]),
      qualifyingAcquisitionCount: 0,
      resolvesTargetGap: false,
      negativeFindingEstablished: false,
    },
    {
      pathId: 'DIRECT_FULL_202_OR_422_REFERENCE_WITNESS_FOR_STRUCTURAL_COMPARISON',
      priority: 4,
      targetGap: 'LI_1998_CANONICAL_DIGITAL_WITNESS_NORMALIZATION_GAP',
      finding: 'DIRECT_FULL_202_422_COMPARABLE_SET_NOT_ACQUIRED_LATER_422_METADATA_ONLY',
      sourceLocators: Object.freeze(['https://www.xinyi.hk/goods-1387.html?from=rss']),
      observationSummary: Object.freeze([
        'The 2002 formal-edition listing reconfirms a 422-page edition with ISBN 9789627943679 and exposes later-edition table-of-contents structure including the target chapter family.',
        'The listing is metadata and excerpt context, not a direct full 422-page comparison witness.',
        'No direct full 202-page reference witness was acquired in this bounded attempt.',
        'No direct 202/314/413/422 comparable full-witness set was acquired.',
      ]),
      qualifyingAcquisitionCount: 0,
      resolvesTargetGap: false,
      negativeFindingEstablished: false,
    },
    {
      pathId: 'STABLE_FILE_HASH_OR_TRANSFORMATION_PROVENANCE_FOR_COMPARABLE_VARIANTS',
      priority: 5,
      targetGap: 'LI_1998_CANONICAL_DIGITAL_WITNESS_NORMALIZATION_GAP',
      finding: 'STABLE_FILE_HASH_OR_TRANSFORMATION_PROVENANCE_NOT_ACQUIRED',
      sourceLocators: Object.freeze([
        'https://r1689.com/m/view.php?aid=349',
        'https://www.linglonghui.com/?dir=%2F%E5%85%AB%E5%AD%97%E7%94%B5%E5%AD%90%E4%B9%A6%E5%90%88%E9%9B%86&tag=34&ts=34',
        'https://www.scribd.com/document/799078960/6865%E5%86%8C%E6%98%93%E5%AD%A6%E4%B9%A6%E7%B1%8D',
      ]),
      observationSummary: Object.freeze([
        'Target-file listings expose materially different reported sizes including 47.44 MB, 47.37 MB, and 15.48 MB.',
        'No cryptographic file hash, stable content identity, scan lineage, or documented transformation provenance was acquired.',
        'File-size and filename variance cannot establish edition identity, derivative relation, or canonical witness status.',
      ]),
      qualifyingAcquisitionCount: 0,
      resolvesTargetGap: false,
      negativeFindingEstablished: false,
    },
  ]);
}

function finalized(
  material: Omit<I186Li1998RemainingDirectPrimaryWitnessAcquisitionEvidenceReport, 'evidenceRecordSetId'>,
): I186Li1998RemainingDirectPrimaryWitnessAcquisitionEvidenceReport {
  return {
    evidenceRecordSetId: `i186_li_1998_direct_primary_evidence_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI186Li1998RemainingDirectPrimaryWitnessAcquisitionEvidence(
  i185: I185Li1998RemainingDirectPrimaryWitnessAcquisitionReadinessReviewReport,
): I186Li1998RemainingDirectPrimaryWitnessAcquisitionEvidenceReport {
  const accepted = exactI185Accepted(i185);

  return finalized({
    evidenceVersion: I186_LI_1998_REMAINING_DIRECT_PRIMARY_WITNESS_ACQUISITION_EVIDENCE_VERSION,
    status: accepted
      ? 'RESOLVED_LI_1998_REMAINING_DIRECT_PRIMARY_WITNESS_ACQUISITION_EVIDENCE'
      : 'I185_DIRECT_PRIMARY_ACQUISITION_BOUNDARY_INVALID',
    decision: accepted
      ? 'REMAINING_DIRECT_PRIMARY_WITNESS_ACQUISITION_EXECUTED_FIVE_PATHS_ZERO_QUALIFYING_1998_PUBLICATION_BINDINGS_ZERO_DIRECT_COMPARABLE_WITNESSES_ZERO_STABLE_FILE_IDENTITIES_TWO_GAPS_REMAIN_UNRESOLVED_NO_REBINDING_NO_INDEPENDENCE'
      : 'LI_1998_REMAINING_DIRECT_PRIMARY_WITNESS_ACQUISITION_NOT_EXECUTED',
    upstreamI185ReviewId: i185.reviewId,
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI185BoundaryAccepted: accepted,
    acquisitionExecuted: accepted,
    executedPathCount: accepted ? 5 : 0,
    evidenceRecords: accepted ? records() : Object.freeze([]),
    evidenceRecordCount: accepted ? 5 : 0,
    observationalEvidenceRecordedByThisGate: accepted,
    qualifyingIdentityEvidenceAcquiredByThisGate: false,
    qualifyingAcquisitionCount: 0,
    directTargetRegistryInfrastructureIdentified: accepted,
    directTargetRegistryRecordAcquiredCount: 0,
    directTargetRegistryCertificateAcquiredCount: 0,
    directTargetRegistrationNumberAcquiredCount: 0,
    authorReported2018RegistrationContextReconfirmed: accepted,
    authorReportedRegistrationCountsAsDirectRegistryEvidence: false,
    authorReportedRegistrationEstablishes1998PublicationMedium: false,
    authorChronology1998AppearanceReconfirmed: accepted,
    authorChronologyCompanyCoLocationEstablishesPublisherIdentity: false,
    direct1998ColophonOrImprintWitnessAcquiredCount: 0,
    direct1998PublisherIssuerDistributorBindingCount: 0,
    explicit1998NonformalDistributionBindingCount: 0,
    later2002FormalEditionReconfirmed: accepted,
    later2002FormalEditionIsbn: accepted ? '9789627943679' : null,
    later2002FormalEditionPageCount: accepted ? 422 : 0,
    later2002FormalEditionMayBackfill1998PublicationIdentity: false,
    listing314PageRepresentationReconfirmed: accepted,
    listing413PageRepresentationReconfirmed: accepted,
    listing413PageFileSizeMb: accepted ? 47.44 : 0,
    alternate413RepresentationFileSizeMb: accepted ? 47.37 : 0,
    alternateTargetFileSizeMb: accepted ? 15.48 : 0,
    uploaderNonformalFieldObserved: accepted,
    uploaderNonformalFieldEstablishes1998PublicationStatus: false,
    directFull314WitnessAcquiredCount: 0,
    directFull413WitnessAcquiredCount: 0,
    directFull202ReferenceWitnessAcquiredCount: 0,
    directFull422ReferenceWitnessAcquiredCount: 0,
    later422MetadataAndTocObservedWithoutFullComparableWitness: accepted,
    directComparableFullWitnessSetAcquired: false,
    crossVariantTitleImprintCopyrightComparisonCompleted: false,
    crossVariantTocPaginationTargetPassageStructureComparisonCompleted: false,
    crossVariantAdditionDeletionReorderingComparisonCompleted: false,
    stableFileIdentityOrHashAcquiredCount: 0,
    transformationProvenanceAcquiredCount: 0,
    completeVariantNormalizationCount: 0,
    pageCountDifferenceAloneCreatesDistinctEdition: false,
    fileSizeDifferenceAloneCreatesDistinctEdition: false,
    filenameDifferenceAloneCreatesDistinctEdition: false,
    listingSurfaceAloneCreatesCanonicalWitness: false,
    publicationMediumOrEntityGapResolved: false,
    canonicalDigitalWitnessNormalizationGapResolved: false,
    bothIdentityFunctionsRequiredBeforeRebindingReadiness: accepted,
    oneIdentityFunctionResolutionSufficientForRebinding: false,
    evidenceRebindingMethodologicallyReady: false,
    evidenceRebindingAuthorizedByThisGate: false,
    evidenceRebindingSelectedByThisGate: false,
    evidenceRebindingExecutedByThisGate: false,
    targetedDiscoveryExhaustionEstablished: false,
    corpusExhaustionEstablished: false,
    explicitNegativeFindingCount: 0,
    searchSilenceCreatesNegativeFinding: false,
    failedRegistryAccessCreatesNegativeFinding: false,
    failedWitnessAccessCreatesNegativeFinding: false,
    nonAcquisitionCreatesNegativeFinding: false,
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
      ? 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_1998_REMAINING_DIRECT_PRIMARY_WITNESS_ACQUISITION_EVIDENCE_ADEQUACY_AND_REMEDIATION_PATH_REASSESSMENT_REVIEW'
      : 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_1998_REMAINING_DIRECT_PRIMARY_WITNESS_ACQUISITION_EVIDENCE',
    notes: accepted
      ? Object.freeze([
          'I186 executed each of the five prospectively frozen I185 acquisition paths and records only what was actually acquired or observed.',
          'Official registration infrastructure and author-reported 2018 registration context were identified, but no direct target-title registry record, certificate identity, or registration number was acquired.',
          'The 1998 appearance chronology remains confirmed without a 1998-specific publisher, issuer, distributor, colophon, ISBN, or explicit reproducible nonformal distribution binding.',
          'The 314/413 listings and later 422 metadata expand representation context but do not substitute for direct full comparable witnesses or stable file provenance.',
          'Non-acquisition, failed access, and search silence do not establish negative evidence, targeted exhaustion, corpus exhaustion, rebinding readiness, or provenance independence.',
        ])
      : Object.freeze(['I185 boundary mismatch prevents bounded I186 acquisition execution.']),
  });
}
