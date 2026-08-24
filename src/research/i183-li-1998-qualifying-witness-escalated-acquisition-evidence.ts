import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { I182Li1998QualifyingWitnessAcquisitionPathReassessmentReadinessReviewReport } from './i182-li-1998-qualifying-witness-acquisition-path-reassessment-readiness-review.js';

export const I183_LI_1998_QUALIFYING_WITNESS_ESCALATED_ACQUISITION_EVIDENCE_VERSION =
  'myeonghwa-li-1998-qualifying-witness-escalated-acquisition-evidence-v1';

export type I183EscalatedFinding =
  | 'INSTITUTIONAL_REGISTRATION_CONTEXT_OBSERVED_NO_DIRECT_1998_PUBLICATION_BINDING'
  | 'LATER_FORMAL_EDITION_METADATA_OBSERVED_NO_1998_COLOPHON_OR_IMPRINT_BINDING'
  | 'PHYSICAL_AND_DIGITAL_REPRESENTATION_SET_EXPANDED_NO_DIRECT_COMPARABLE_WITNESS_NORMALIZATION'
  | 'STABLE_FILE_IDENTITY_NOT_ACQUIRED';

export interface I183EscalatedEvidenceRecord {
  escalationPathId:
    | 'INSTITUTIONAL_OR_PRIMARY_1998_BIBLIOGRAPHIC_BINDING_ESCALATION'
    | 'DIRECT_1998_COLOPHON_IMPRINT_OR_DISTRIBUTION_WITNESS_ESCALATION'
    | 'DIRECT_COMPARABLE_202_314_413_WITNESS_ACCESS_AND_STRUCTURE_COMPARISON_ESCALATION'
    | 'COMPARABLE_VARIANT_STABLE_FILE_IDENTITY_AND_HASH_PROVENANCE_ESCALATION';
  finding: I183EscalatedFinding;
  sourceLocators: readonly string[];
  evidenceSummary: readonly string[];
  qualifyingResolutionCount: 0;
}

export interface I183Li1998QualifyingWitnessEscalatedAcquisitionEvidenceReport {
  evidenceRecordSetId: string;
  evidenceVersion: string;
  status:
    | 'RESOLVED_LI_1998_QUALIFYING_WITNESS_ESCALATED_ACQUISITION_EVIDENCE'
    | 'I182_ESCALATION_BOUNDARY_INVALID';
  decision:
    | 'ESCALATED_QUALIFYING_PATH_ACQUISITION_EXECUTED_THREE_NEW_PATH_RELEVANT_OBSERVATIONS_ZERO_1998_SPECIFIC_PUBLICATION_BINDINGS_ZERO_DIRECT_COMPARABLE_NORMALIZATIONS_ZERO_STABLE_FILE_IDENTITIES_TWO_GAPS_REMAIN_UNRESOLVED_NO_REBINDING_NO_INDEPENDENCE'
    | 'LI_1998_ESCALATED_ACQUISITION_EVIDENCE_NOT_EXECUTED';
  upstreamI182ReviewId: string;
  policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy';
  policyVersion: 'v1-definition';
  adoptionVersion: 'v1-adoption';
  currentCandidateSetVersion: 'v1-candidate-set';
  currentInputPackageVersion: 'v2-input-package';
  exactI182BoundaryAccepted: boolean;
  escalatedAcquisitionExecuted: boolean;
  executedEscalationPathCount: 4 | 0;
  escalatedEvidenceRecords: readonly I183EscalatedEvidenceRecord[];
  escalatedEvidenceRecordCount: 4 | 0;
  newPathRelevantObservationCount: 3 | 0;
  qualifying1998PublicationIdentityBindingCount: 0;
  direct1998InstitutionalBibliographicRecordAcquiredCount: 0;
  direct1998CopyrightRegistrationCertificateAcquiredCount: 0;
  direct1998ColophonOrImprintWitnessAcquiredCount: 0;
  direct1998PublisherIssuerDistributorBindingCount: 0;
  explicit1998NonformalDistributionBindingCount: 0;
  authorReported2018CopyrightProtectionCenterRegistrationObserved: boolean;
  authorReportedRegistrationCoversWorksSince1997: boolean;
  authorReportedRegistrationIncludesTargetWorkFamily: boolean;
  authorReportedRegistrationIsDirectRegistryRecord: false;
  authorReportedRegistrationEstablishes1998PublicationMedium: false;
  later2002FormalEditionObserved: boolean;
  later2002FormalEditionIsbn: '9789627943679' | null;
  later2002FormalEditionPageCount: 422 | 0;
  later2002FormalEditionFormat: '25开' | null;
  later2002FormalEditionBinding: '平裝' | null;
  later2002FormalEditionTextLayout: '繁体竖排' | null;
  later2002FormalEditionTocObserved: boolean;
  later2002FormalEditionContainsTargetChapterStructure: boolean;
  later2002FormalEditionMayBackfill1998PublicationIdentity: false;
  physical314PageListingObserved: boolean;
  physical314PageListingFormat: '32开' | null;
  physical314PageListingBoundSpecificallyTo1998: false;
  observedRepresentationPageCounts: readonly number[];
  observedRepresentationPageCountCount: 4 | 0;
  directComparableFullWitnessSetAcquired: false;
  crossVariantTitleImprintCopyrightComparisonCompleted: false;
  crossVariantTocPaginationTargetPassageStructureComparisonCompleted: false;
  crossVariantAdditionDeletionReorderingComparisonCompleted: false;
  canonicalDigitalWitnessEstablished: false;
  normalizedWitnessFamilyEstablished: false;
  completeVariantNormalizationCount: 0;
  stableFileIdentityOrHashAcquiredCount: 0;
  pageCountDifferenceAloneCreatesDistinctEdition: false;
  physicalFormatListingAloneCreates1998Binding: false;
  laterFormalEditionTocContinuityCreates1998Binding: false;
  publicationMediumOrEntityGapResolved: false;
  canonicalDigitalWitnessNormalizationGapResolved: false;
  bothIdentityFunctionsRequiredBeforeRebindingReadiness: boolean;
  onePathSuccessSufficientForRebinding: false;
  evidenceRebindingMethodologicallyReady: false;
  evidenceRebindingAuthorizedByThisGate: false;
  evidenceRebindingSelectedByThisGate: false;
  evidenceRebindingExecutedByThisGate: false;
  targetedDiscoveryExhaustionEstablished: false;
  corpusExhaustionEstablished: false;
  explicitNegativeFindingCount: 0;
  searchSilenceCreatesNegativeFinding: false;
  failedRegistrySearchCreatesNegativeFinding: false;
  failedDirectWitnessAccessCreatesNegativeFinding: false;
  repetitiveGenericSearchAloneCountsAsProgress: false;
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
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_1998_ESCALATED_ACQUISITION_EVIDENCE_ADEQUACY_AND_REMAINING_PATH_REASSESSMENT_REVIEW'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_1998_QUALIFYING_WITNESS_ESCALATED_ACQUISITION_EVIDENCE';
  notes: readonly string[];
}

function exactI182Accepted(
  i182: I182Li1998QualifyingWitnessAcquisitionPathReassessmentReadinessReviewReport,
): boolean {
  return (
    i182.status === 'RESOLVED_LI_1998_QUALIFYING_WITNESS_ACQUISITION_PATH_REASSESSMENT_READINESS_REVIEW' &&
    i182.decision ===
      'QUALIFYING_WITNESS_ACQUISITION_ESCALATION_PATHS_FROZEN_PUBLICATION_BINDING_AND_DIRECT_VARIANT_COMPARISON_REMAIN_OPEN_NO_EVIDENCE_ACQUIRED_NO_REBINDING_NO_INDEPENDENCE' &&
    i182.policyId === 'myeonghwa-visible-stem-ke-multi-source-composition-policy' &&
    i182.policyVersion === 'v1-definition' &&
    i182.adoptionVersion === 'v1-adoption' &&
    i182.currentCandidateSetVersion === 'v1-candidate-set' &&
    i182.currentInputPackageVersion === 'v2-input-package' &&
    i182.exactI181BoundaryAccepted &&
    i182.priorNonresolvingProgressAccepted &&
    i182.publicationMediumOrEntityGapStillOpen &&
    i182.canonicalDigitalWitnessNormalizationGapStillOpen &&
    i182.escalationPathCount === 4 &&
    i182.escalationPathsFrozenProspectively &&
    i182.publicationIdentityEscalationReady &&
    i182.directColophonImprintEscalationReady &&
    i182.directComparableVariantEscalationReady &&
    i182.stableFileIdentityEscalationReady &&
    i182.explicit1998SpecificBindingRequired &&
    i182.formal1998PublicationBindingAdmissible &&
    i182.explicitNonformal1998DistributionBindingAdmissible &&
    i182.institutionalOrPrimarySurfacePriorityRequired &&
    i182.aggregatorListingMayRouteDiscovery &&
    i182.aggregatorListingAloneMayResolvePublicationIdentity === false &&
    i182.later2002MetadataMayBackfill1998Identity === false &&
    i182.chronologyCompanyCoLocationMayEstablishPublisherIdentity === false &&
    i182.directComparableWitnessAccessRequired &&
    i182.comparisonMustIncludeTitleImprintTocPaginationTargetPassageAndStructure &&
    i182.stableFileIdentityOrHashRequiredWhenFilesObtained &&
    i182.pageCountAloneMayResolveVariantRelationship === false &&
    i182.fileSizeAloneMayResolveVariantRelationship === false &&
    i182.filenameAloneMayResolveVariantRelationship === false &&
    i182.coverSurfaceAloneMayResolveCanonicalWitness === false &&
    i182.acquisitionPathReadinessEstablished &&
    i182.acquisitionExecutionAuthorized &&
    i182.evidenceAcquiredByThisGate === false &&
    i182.publicationIdentityBindingAcquiredByThisGate === false &&
    i182.variantNormalizationCompletedByThisGate === false &&
    i182.stableFileIdentityAcquiredByThisGate === false &&
    i182.onePathSuccessSufficientForRebinding === false &&
    i182.bothIdentityFunctionsRequiredBeforeRebindingReadiness &&
    i182.evidenceRebindingMethodologicallyReady === false &&
    i182.evidenceRebindingAuthorizedByThisGate === false &&
    i182.evidenceRebindingSelectedByThisGate === false &&
    i182.evidenceRebindingExecutedByThisGate === false &&
    i182.targetedDiscoveryExhaustionEstablished === false &&
    i182.corpusExhaustionEstablished === false &&
    i182.explicitNegativeFindingCount === 0 &&
    i182.searchSilenceCreatesNegativeFinding === false &&
    i182.failedAccessCreatesNegativeFinding === false &&
    i182.repetitiveGenericSearchAloneCountsAsProgress === false &&
    i182.acquisitionPathRequirementCount === 12 &&
    i182.acquisitionPathRequirementsFrozen &&
    i182.current2004WitnessPresumedOriginRetired &&
    i182.prior1998SameAuthorWitnessConfirmed &&
    i182.prior1998WitnessIndependentProvenanceEstablished === false &&
    i182.sameAuthor1998To2004DerivativeChainMustRemainBound &&
    i182.externalLineageUnresolvedQuestionCount === 3 &&
    i182.externalLineageUnresolvedStatusPreserved &&
    i182.provenanceIndependenceAdjudicatedByThisGate === false &&
    i182.independentNormativeProvenanceEstablishedCount === 0 &&
    i182.I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate === false &&
    i182.I132IndependentNormativeProvenanceRequirementRemainsNormative &&
    i182.I132PolicyRelaxationAuthorizedByThisGate === false &&
    i182.sourceCountVotingAllowed === false &&
    i182.provenanceTierWeightingAllowed === false &&
    i182.currentV2PackageAndCandidateSetRemainImmutable &&
    i182.currentV2ProvenanceDisposition === 'BLOCKED_UNDER_CURRENT_EVIDENCE' &&
    i182.candidateSetReevaluationAuthorizedByThisGate === false &&
    i182.candidateSetAdmissibilityEstablishedByThisGate === false &&
    i182.productionPolicyExecutionAuthorized === false &&
    i182.actualCompositionPerformedByThisGate === false &&
    i182.multiSourceCompositionAuthorized === false &&
    i182.authorityAcquiredByThisGate === false &&
    i182.visibleStemBinaryEffectiveInteractionEligibilityResolved === false &&
    i182.thresholdRuleCreatedByThisGate === false &&
    i182.damageEvaluationAuthorized === false &&
    i182.classificationAuthorized === false &&
    i182.numericScoringAuthorized === false &&
    i182.hiddenStemInteractionEligibilityGapRemains &&
    i182.hiddenStemAuthorityGap === 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED' &&
    i182.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_1998_QUALIFYING_WITNESS_ESCALATED_ACQUISITION_EVIDENCE'
  );
}

function records(): readonly I183EscalatedEvidenceRecord[] {
  return Object.freeze([
    {
      escalationPathId: 'INSTITUTIONAL_OR_PRIMARY_1998_BIBLIOGRAPHIC_BINDING_ESCALATION',
      finding: 'INSTITUTIONAL_REGISTRATION_CONTEXT_OBSERVED_NO_DIRECT_1998_PUBLICATION_BINDING',
      sourceLocators: Object.freeze([
        'https://www.sxw.cc/sjw/zj/',
        'https://www.sxw.cc/e/action/ShowInfo.php?classid=1&id=612',
      ]),
      evidenceSummary: Object.freeze([
        'The author chronology states that in 2018 the author’s works written since 1997, including the Four Pillars series containing the target self-study work, passed China Copyright Protection Center review and received National Copyright Administration work-registration certificates.',
        'The surfaced material is an author-hosted report of the institutional registration event, not the direct registry record or certificate for the target work.',
        'No registration number, certificate image tied to the target title, 1998 publisher, 1998 issuing entity, ISBN, or explicit 1998 distribution medium was acquired.',
      ]),
      qualifyingResolutionCount: 0,
    },
    {
      escalationPathId: 'DIRECT_1998_COLOPHON_IMPRINT_OR_DISTRIBUTION_WITNESS_ESCALATION',
      finding: 'LATER_FORMAL_EDITION_METADATA_OBSERVED_NO_1998_COLOPHON_OR_IMPRINT_BINDING',
      sourceLocators: Object.freeze(['https://www.xinyi.hk/goods-1387.html?from=rss']),
      evidenceSummary: Object.freeze([
        'A bookseller record identifies a formal 2002 edition of 李顺祥《四柱命理学自修教程》 with ISBN 9789627943679, 422 pages, 25-kai format, paperback binding, and traditional vertical text.',
        'The listing also exposes a table of contents containing Chapter 9 日干 and Section 1 干支紧密度及其生克力量, supporting later-edition structural continuity.',
        'The 2002 formal edition cannot back-project a publisher, ISBN, colophon, or distribution status onto the distinct 1998 appearance.',
      ]),
      qualifyingResolutionCount: 0,
    },
    {
      escalationPathId: 'DIRECT_COMPARABLE_202_314_413_WITNESS_ACCESS_AND_STRUCTURE_COMPARISON_ESCALATION',
      finding: 'PHYSICAL_AND_DIGITAL_REPRESENTATION_SET_EXPANDED_NO_DIRECT_COMPARABLE_WITNESS_NORMALIZATION',
      sourceLocators: Object.freeze([
        'https://www.scribd.com/document/744317976/104-%E6%9D%8E%E9%A1%BA%E7%A5%A5-%E5%9B%9B%E6%9F%B1%E5%91%BD%E7%90%86%E5%AD%A6%E8%87%AA%E4%BF%AE%E6%95%99%E7%A8%8B-%E6%99%AE%E5%8F%8A%E7%8F%AD',
        'https://www.zhouyi529.com/372.html',
        'https://www.guoxueziyuan.com/3415.html',
        'https://r1689.com/m/view.php?aid=349',
        'https://www.xinyi.hk/goods-1387.html?from=rss',
      ]),
      evidenceSummary: Object.freeze([
        'Observed representation metadata now spans a 202-page Scribd document surface, a 314-page physical-style 32-kai bookseller listing, a 314-page PDF listing, a 413-page PDF listing, and a 422-page formal 2002 edition listing.',
        'The 314-page physical-style listing strengthens the observation that a 314-page book representation circulated, but the listing does not bind that representation specifically to 1998.',
        'No directly comparable full witness set was acquired, so title/imprint/copyright, TOC, pagination, target-passage, structural, and addition/deletion/reordering comparisons remain unperformed.',
      ]),
      qualifyingResolutionCount: 0,
    },
    {
      escalationPathId: 'COMPARABLE_VARIANT_STABLE_FILE_IDENTITY_AND_HASH_PROVENANCE_ESCALATION',
      finding: 'STABLE_FILE_IDENTITY_NOT_ACQUIRED',
      sourceLocators: Object.freeze([
        'https://www.linglonghui.com/?dir=%2F%E5%85%AB%E5%AD%97%E7%94%B5%E5%AD%90%E4%B9%A6%E5%90%88%E9%9B%86&tag=34&ts=34',
        'https://r1689.com/m/view.php?aid=349',
      ]),
      evidenceSummary: Object.freeze([
        'Public listings continue to expose variant file-size/page-count metadata, including 47.37 MB and 47.44 MB surfaces, but not stable downloadable file identities that can be verified in the governed corpus.',
        'No cryptographic hash, stable file identifier, or transformation provenance for directly comparable variants was acquired.',
      ]),
      qualifyingResolutionCount: 0,
    },
  ]);
}

function finalized(
  material: Omit<I183Li1998QualifyingWitnessEscalatedAcquisitionEvidenceReport, 'evidenceRecordSetId'>,
): I183Li1998QualifyingWitnessEscalatedAcquisitionEvidenceReport {
  return {
    evidenceRecordSetId: `i183_li_1998_escalated_evidence_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI183Li1998QualifyingWitnessEscalatedAcquisitionEvidence(
  i182: I182Li1998QualifyingWitnessAcquisitionPathReassessmentReadinessReviewReport,
): I183Li1998QualifyingWitnessEscalatedAcquisitionEvidenceReport {
  const accepted = exactI182Accepted(i182);
  const escalatedEvidenceRecords = accepted ? records() : Object.freeze([] as I183EscalatedEvidenceRecord[]);

  return finalized({
    evidenceVersion: I183_LI_1998_QUALIFYING_WITNESS_ESCALATED_ACQUISITION_EVIDENCE_VERSION,
    status: accepted
      ? 'RESOLVED_LI_1998_QUALIFYING_WITNESS_ESCALATED_ACQUISITION_EVIDENCE'
      : 'I182_ESCALATION_BOUNDARY_INVALID',
    decision: accepted
      ? 'ESCALATED_QUALIFYING_PATH_ACQUISITION_EXECUTED_THREE_NEW_PATH_RELEVANT_OBSERVATIONS_ZERO_1998_SPECIFIC_PUBLICATION_BINDINGS_ZERO_DIRECT_COMPARABLE_NORMALIZATIONS_ZERO_STABLE_FILE_IDENTITIES_TWO_GAPS_REMAIN_UNRESOLVED_NO_REBINDING_NO_INDEPENDENCE'
      : 'LI_1998_ESCALATED_ACQUISITION_EVIDENCE_NOT_EXECUTED',
    upstreamI182ReviewId: i182.reviewId,
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI182BoundaryAccepted: accepted,
    escalatedAcquisitionExecuted: accepted,
    executedEscalationPathCount: accepted ? 4 : 0,
    escalatedEvidenceRecords,
    escalatedEvidenceRecordCount: accepted ? 4 : 0,
    newPathRelevantObservationCount: accepted ? 3 : 0,
    qualifying1998PublicationIdentityBindingCount: 0,
    direct1998InstitutionalBibliographicRecordAcquiredCount: 0,
    direct1998CopyrightRegistrationCertificateAcquiredCount: 0,
    direct1998ColophonOrImprintWitnessAcquiredCount: 0,
    direct1998PublisherIssuerDistributorBindingCount: 0,
    explicit1998NonformalDistributionBindingCount: 0,
    authorReported2018CopyrightProtectionCenterRegistrationObserved: accepted,
    authorReportedRegistrationCoversWorksSince1997: accepted,
    authorReportedRegistrationIncludesTargetWorkFamily: accepted,
    authorReportedRegistrationIsDirectRegistryRecord: false,
    authorReportedRegistrationEstablishes1998PublicationMedium: false,
    later2002FormalEditionObserved: accepted,
    later2002FormalEditionIsbn: accepted ? '9789627943679' : null,
    later2002FormalEditionPageCount: accepted ? 422 : 0,
    later2002FormalEditionFormat: accepted ? '25开' : null,
    later2002FormalEditionBinding: accepted ? '平裝' : null,
    later2002FormalEditionTextLayout: accepted ? '繁体竖排' : null,
    later2002FormalEditionTocObserved: accepted,
    later2002FormalEditionContainsTargetChapterStructure: accepted,
    later2002FormalEditionMayBackfill1998PublicationIdentity: false,
    physical314PageListingObserved: accepted,
    physical314PageListingFormat: accepted ? '32开' : null,
    physical314PageListingBoundSpecificallyTo1998: false,
    observedRepresentationPageCounts: accepted ? Object.freeze([202, 314, 413, 422]) : Object.freeze([]),
    observedRepresentationPageCountCount: accepted ? 4 : 0,
    directComparableFullWitnessSetAcquired: false,
    crossVariantTitleImprintCopyrightComparisonCompleted: false,
    crossVariantTocPaginationTargetPassageStructureComparisonCompleted: false,
    crossVariantAdditionDeletionReorderingComparisonCompleted: false,
    canonicalDigitalWitnessEstablished: false,
    normalizedWitnessFamilyEstablished: false,
    completeVariantNormalizationCount: 0,
    stableFileIdentityOrHashAcquiredCount: 0,
    pageCountDifferenceAloneCreatesDistinctEdition: false,
    physicalFormatListingAloneCreates1998Binding: false,
    laterFormalEditionTocContinuityCreates1998Binding: false,
    publicationMediumOrEntityGapResolved: false,
    canonicalDigitalWitnessNormalizationGapResolved: false,
    bothIdentityFunctionsRequiredBeforeRebindingReadiness: accepted,
    onePathSuccessSufficientForRebinding: false,
    evidenceRebindingMethodologicallyReady: false,
    evidenceRebindingAuthorizedByThisGate: false,
    evidenceRebindingSelectedByThisGate: false,
    evidenceRebindingExecutedByThisGate: false,
    targetedDiscoveryExhaustionEstablished: false,
    corpusExhaustionEstablished: false,
    explicitNegativeFindingCount: 0,
    searchSilenceCreatesNegativeFinding: false,
    failedRegistrySearchCreatesNegativeFinding: false,
    failedDirectWitnessAccessCreatesNegativeFinding: false,
    repetitiveGenericSearchAloneCountsAsProgress: false,
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
      ? 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_1998_ESCALATED_ACQUISITION_EVIDENCE_ADEQUACY_AND_REMAINING_PATH_REASSESSMENT_REVIEW'
      : 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_1998_QUALIFYING_WITNESS_ESCALATED_ACQUISITION_EVIDENCE',
    notes: accepted
      ? Object.freeze([
          'The escalated acquisition produced path-relevant evidence on copyright-registration context, later formal-edition metadata, and a 314-page physical-style representation, but none is an explicit 1998 publication-medium binding.',
          'The author-hosted statement about China Copyright Protection Center registration is not a substitute for a direct registry record or target-title certificate.',
          'The 2002 ISBN/422-page formal edition and its target chapter structure are later-edition evidence only and cannot backfill the 1998 identity gap.',
          'The representation family now visibly spans 202/314/413/422 pages, but no directly comparable full witness set or stable file identity was acquired, so canonical normalization remains unresolved.',
          'No failed registry search or witness-access attempt creates a negative finding or exhaustion claim, and no rebinding or provenance-independence adjudication occurs in I183.',
        ])
      : Object.freeze([
          'I182 escalation boundary mismatch prevents execution of I183 escalated acquisition evidence.',
        ]),
  });
}
