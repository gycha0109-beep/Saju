import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  I242_ACQUISITION_PATH_IDS,
  type I242ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluFourGapCanonicalProvenanceAdmissibilityAcquisitionReadinessReviewReport,
} from './i242-challenge-combination-support-channel-competing-relation-settlement-yuding-suijinlu-four-gap-canonical-provenance-admissibility-acquisition-readiness-review.js';
import { I241_REMAINING_ADMISSIBILITY_GAP_IDS } from './i241-challenge-combination-support-channel-competing-relation-settlement-three-residual-targeted-discovery-evidence-adequacy-source-relationship-admissibility-reassessment-review.js';

export const I243_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_COMPETING_RELATION_SETTLEMENT_YUDING_SUIJINLU_FOUR_GAP_CANONICAL_PROVENANCE_ADMISSIBILITY_ACQUISITION_EVIDENCE_VERSION =
  'myeonghwa-challenge-combination-support-channel-competing-relation-settlement-yuding-suijinlu-four-gap-canonical-provenance-admissibility-acquisition-evidence-v1';

export const I243_EVIDENCE_RECORD_IDS = Object.freeze([
  'ZHEJIANG_LIBRARY_OPAC_YUDING_ZIPING_2011_RECORD',
  'DOUBAN_YUDING_ZIPING_2011_BIBLIOGRAPHIC_RECORD',
  'BOOKSCHINA_YUDING_ZIPING_2011_BIBLIOGRAPHIC_RECORD',
  'ZHOUYI_TIANDI_YUDING_ZIPING_VOLUME5_SUIJINLU_TOC_RECORD',
  'SINA_2012_REPOST_WITH_EXPLICIT_2011_ORIGINAL_LINK',
  'MINGLI_BLOGGER_2012_06_SAME_TEXT_WITNESS',
  'UDN_2012_YUDING_ZIPING_VOLUME5_TEXT_WITNESS',
  'SUANZHUN_2022_YUDING_ZIPING_DIGITIZATION_EDITORIAL_STATEMENT',
] as const);
export type I243EvidenceRecordId = (typeof I243_EVIDENCE_RECORD_IDS)[number];

export type I243GapDisposition = 'MATERIALLY_NARROWED_NOT_CLOSED' | 'UNRESOLVED';

export interface I243EvidenceRecord {
  recordId: I243EvidenceRecordId;
  locator: string;
  evidenceClass:
    | 'LIBRARY_OPAC'
    | 'BIBLIOGRAPHIC_BOOK_RECORD'
    | 'STRUCTURED_BOOK_TOC_TRANSCRIPTION'
    | 'DATE_VERIFIED_REPOST_WITH_EXPLICIT_ORIGINAL_LINK'
    | 'DATE_VERIFIED_PUBLIC_TEXT_WITNESS'
    | 'SEARCH_INDEX_VOLUME_BOUND_TEXT_LEAD'
    | 'EDITORIAL_DIGITIZATION_STATEMENT';
  directPublicContext: boolean;
  searchSnippetOnly: boolean;
  finding: string;
}

export interface I243ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluFourGapCanonicalProvenanceAdmissibilityAcquisitionEvidenceReport {
  evidenceId: string;
  evidenceVersion: string;
  status:
    | 'RESOLVED_COMPETING_RELATION_SETTLEMENT_YUDING_SUIJINLU_FOUR_GAP_CANONICAL_PROVENANCE_ADMISSIBILITY_ACQUISITION_EVIDENCE'
    | 'I242_ACQUISITION_BOUNDARY_INVALID';
  decision:
    | 'FIVE_ACQUISITION_PATHS_EXECUTED_2011_MODERN_EDITION_BIBLIOGRAPHIC_IDENTITY_AND_VOLUME5_SUIJINLU_PLACEMENT_SUPPORTED_2012_REPOST_TO_2011_ORIGINAL_LINK_DIRECTLY_OBSERVED_PUBLIC_TEXT_FAMILY_STABLE_EXACT_PALACE_OR_2011_PRINT_PASSAGE_FACSIMILE_NOT_ACQUIRED_FULL_DERIVATIVE_CHAIN_AND_FINAL_NORMATIVE_ADMISSIBILITY_UNRESOLVED_NO_PROMOTION'
    | 'YUDING_SUIJINLU_CANONICAL_PROVENANCE_ADMISSIBILITY_ACQUISITION_NOT_EXECUTED';
  upstreamI242ReviewId: string;
  exactI242BoundaryAccepted: boolean;
  targetScope: 'MULTIPLE_TRACKED_RELATION_TOUCHES_COMPETING_RELATION_SETTLEMENT';
  acquisitionExecuted: boolean;
  executedAcquisitionPathIds: readonly string[];
  executedAcquisitionPathCount: 5 | 0;
  evidenceRecords: readonly I243EvidenceRecord[];
  evidenceRecordCount: 8 | 0;
  directPublicEvidenceRecordCount: 7 | 0;
  searchSnippetOnlyEvidenceCount: 1 | 0;
  modern2011EditionBibliographicIdentityEstablished: boolean;
  modern2011EditionTitle: '御定子平' | 'NOT_ESTABLISHED';
  modern2011EditionEditor: '郑同点校' | 'NOT_ESTABLISHED';
  modern2011EditionPublisher: '华龄出版社' | 'NOT_ESTABLISHED';
  modern2011EditionPublicationDate: '2011-05' | 'NOT_ESTABLISHED';
  modern2011EditionIsbn: '9787801788139' | 'NOT_ESTABLISHED';
  libraryOpacRecordObserved: boolean;
  publisherDescriptionPalaceManuscriptBasisObserved: boolean;
  publisherDescriptionFirstTypesetEditionClaimObserved: boolean;
  volume5SuijinluFrontAndBackChapterPlacementObserved: boolean;
  volume5PlacementBoundToPublisherOrLibraryCatalog: false;
  palaceManuscriptShelfmarkEstablished: false;
  palaceManuscriptCustodianRecordDirectlyAcquired: false;
  palaceManuscriptFacsimileDirectlyAcquired: false;
  modern2011PrintExactTargetPassagePageDirectlyAcquired: false;
  exactCanonicalTargetPassageBindingEstablished: false;
  sina2012RepostTimestampDirectlyObserved: boolean;
  sina2012ExplicitOriginalAddressLinkObserved: boolean;
  sina2012ExplicitOriginalAuthorAttributionObserved: boolean;
  sinaEmbeddedOriginalTimestamp: '2011-12-23 17:33:51' | 'NOT_ESTABLISHED';
  sinaEmbeddedOriginalAuthor: '尚慈居士' | 'NOT_ESTABLISHED';
  sinaEmbeddedOriginalUrl: 'https://blog.sina.com.cn/s/blog_6327065701018nju.html' | 'NOT_ESTABLISHED';
  original2011UrlDirectlyFetchableInThisGate: false;
  explicit2012To2011DerivativeLinkEstablished: boolean;
  heyix2019To2011Or2012DerivativeLinkEstablished: false;
  sameTextPublicWitnessFamilyStabilityObserved: boolean;
  sameTextPublicWitnessesMayCountAsIndependentAuthorities: false;
  provenanceIndependenceAdjudicatedByThisGate: false;
  fullPublicWitnessDerivativeRelationshipEstablished: false;
  ruleBearingContextSupportedByVolumeAndTextStructure: boolean;
  editorialStatusSupportedBy2011PointCollatedEditionMetadata: boolean;
  finalTargetPassageNormativeAdmissibilityEstablished: false;
  gapAssessments: readonly {
    gapId: string;
    disposition: I243GapDisposition;
    rationale: string;
  }[];
  materiallyNarrowedGapCount: 3 | 0;
  fullyClosedGapCount: 0;
  remainingAdmissibilityGapIds: readonly string[];
  remainingAdmissibilityGapCount: 4 | 0;
  authorityGap: 'COMPETING_RELATION_SETTLEMENT_AUTHORITY_NOT_ESTABLISHED' | 'UPSTREAM_INVALID';
  authorityGapClosed: false;
  authorityPromotedByThisGate: false;
  competingRelationSettlementResolved: false;
  crossRelationPrecedenceAuthorized: false;
  multiTouchAggregationAuthorized: false;
  hiddenStemI232HoldPreserved: boolean;
  hiddenStemTrackReopenedByThisGate: false;
  hiddenStemAuthorityGap: 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED';
  quWei2001HoldPreserved: boolean;
  li1998SameTargetPathSuspendedNotRetired: boolean;
  I132IndependentNormativeProvenanceRequirementRemainsNormative: boolean;
  I132PolicyRelaxationAuthorizedByThisGate: false;
  currentV2PackageAndCandidateSetRemainImmutable: boolean;
  currentV2ProvenanceDisposition: 'BLOCKED_UNDER_CURRENT_EVIDENCE' | 'NOT_ASSESSED';
  candidateRegisteredByThisGate: false;
  candidateSelectedByThisGate: false;
  candidateSetMutatedByThisGate: false;
  evidenceRebindingAuthorizedByThisGate: false;
  derivativeRelationshipAdjudicatedBeyondExplicit2012RepostLink: false;
  actualCompositionPerformedByThisGate: false;
  multiSourceCompositionAuthorized: false;
  thresholdRuleCreatedByThisGate: false;
  damageEvaluationAuthorized: false;
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  productionPolicyExecutionAuthorized: false;
  negativeFindingCreatedByThisGate: false;
  discoveryExhaustionClaimed: false;
  corpusExhaustionClaimed: false;
  recommendedNextGate:
    | 'COMPETING_RELATION_SETTLEMENT_YUDING_SUIJINLU_CANONICAL_PROVENANCE_ACQUISITION_EVIDENCE_ADEQUACY_RESIDUAL_GAP_REASSESSMENT_REVIEW'
    | 'COMPETING_RELATION_SETTLEMENT_YUDING_SUIJINLU_FOUR_GAP_CANONICAL_PROVENANCE_ADMISSIBILITY_ACQUISITION_EVIDENCE';
  notes: readonly string[];
}

function exactI242Accepted(
  i242: I242ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluFourGapCanonicalProvenanceAdmissibilityAcquisitionReadinessReviewReport,
): boolean {
  return (
    i242.status === 'RESOLVED_COMPETING_RELATION_SETTLEMENT_YUDING_SUIJINLU_FOUR_GAP_CANONICAL_PROVENANCE_ADMISSIBILITY_ACQUISITION_READINESS_REVIEW' &&
    i242.decision === 'FOUR_SOURCE_ADMISSIBILITY_GAPS_FIVE_TARGETED_ACQUISITION_PATHS_EIGHTEEN_CONTROLS_FROZEN_CANONICAL_IDENTITY_EXACT_PASSAGE_DERIVATIVE_RELATIONSHIP_AND_RULE_BEARING_STATUS_ONLY_NO_ACQUISITION_EXECUTED_NO_AUTHORITY_PROMOTION' &&
    i242.exactI241BoundaryAccepted &&
    i242.remainingAdmissibilityGapCount === 4 &&
    i242.remainingAdmissibilityGapIds.length === I241_REMAINING_ADMISSIBILITY_GAP_IDS.length &&
    i242.remainingAdmissibilityGapIds.every((id, index) => id === I241_REMAINING_ADMISSIBILITY_GAP_IDS[index]) &&
    i242.acquisitionPathCount === 5 &&
    i242.acquisitionPathIds.length === I242_ACQUISITION_PATH_IDS.length &&
    i242.acquisitionPathIds.every((id, index) => id === I242_ACQUISITION_PATH_IDS[index]) &&
    i242.acquisitionControlCount === 18 &&
    i242.acquisitionContractFrozen &&
    i242.targetedAcquisitionAuthorized &&
    i242.acquisitionExecutedByThisGate === false &&
    i242.generalRuleRediscoveryMayCountAsProgress === false &&
    i242.canonicalIdentityRequiresBibliographicOrCustodianBinding &&
    i242.titleSimilarityMayEstablishCanonicalIdentity === false &&
    i242.canonicalExactPassageRequiresExactRuleTextAndSourceIdentity &&
    i242.searchSnippetMayEstablishExactPassageBinding === false &&
    i242.derivativeRelationshipRequiresExplicitOrReproducibleDependencyEvidence &&
    i242.chronologyAloneMayEstablishDerivativeRelationship === false &&
    i242.chronologyAloneMayEstablishProvenanceIndependence === false &&
    i242.sameTextYudingWitnessesMayCountAsIndependentAuthorities === false &&
    i242.normativeAdmissibilityRequiresRuleBearingContextAndLineageOrEditorialStatus &&
    i242.sourceTitleOrReputationMayEstablishNormativeAdmissibility === false &&
    i242.authorityGap === 'COMPETING_RELATION_SETTLEMENT_AUTHORITY_NOT_ESTABLISHED' &&
    i242.hiddenStemI232HoldPreserved &&
    i242.quWei2001HoldPreserved &&
    i242.li1998SameTargetPathSuspendedNotRetired &&
    i242.currentV2PackageAndCandidateSetRemainImmutable &&
    i242.currentV2ProvenanceDisposition === 'BLOCKED_UNDER_CURRENT_EVIDENCE' &&
    i242.recommendedNextGate === 'COMPETING_RELATION_SETTLEMENT_YUDING_SUIJINLU_FOUR_GAP_CANONICAL_PROVENANCE_ADMISSIBILITY_ACQUISITION_EVIDENCE'
  );
}

function evidenceRecords(): readonly I243EvidenceRecord[] {
  return Object.freeze([
    {
      recordId: 'ZHEJIANG_LIBRARY_OPAC_YUDING_ZIPING_2011_RECORD',
      locator: 'https://opac.zjlib.cn/opac/search?q=%E9%83%91%E5%90%8C&searchWay=author',
      evidenceClass: 'LIBRARY_OPAC',
      directPublicContext: true,
      searchSnippetOnly: false,
      finding: 'Library OPAC identifies 御定子平, 郑同, 华龄出版社, 2011, with call number B992.3/870.2/2011.',
    },
    {
      recordId: 'DOUBAN_YUDING_ZIPING_2011_BIBLIOGRAPHIC_RECORD',
      locator: 'https://book.douban.com/subject/6520607/',
      evidenceClass: 'BIBLIOGRAPHIC_BOOK_RECORD',
      directPublicContext: true,
      searchSnippetOnly: false,
      finding: 'Bibliographic record identifies 郑同, 华龄出版社, 2011-05, 291 pages, ISBN 9787801788139 and describes a point-collated edition based on a palace manuscript.',
    },
    {
      recordId: 'BOOKSCHINA_YUDING_ZIPING_2011_BIBLIOGRAPHIC_RECORD',
      locator: 'https://m.bookschina.com/5175914.htm',
      evidenceClass: 'BIBLIOGRAPHIC_BOOK_RECORD',
      directPublicContext: true,
      searchSnippetOnly: false,
      finding: 'Book record independently matches 郑同点校, 华龄出版社, 2011-05-01, 291 pages and ISBN 9787801788139.',
    },
    {
      recordId: 'ZHOUYI_TIANDI_YUDING_ZIPING_VOLUME5_SUIJINLU_TOC_RECORD',
      locator: 'https://www.64gua.com/index.php?c=show&id=25&s=book',
      evidenceClass: 'STRUCTURED_BOOK_TOC_TRANSCRIPTION',
      directPublicContext: true,
      searchSnippetOnly: false,
      finding: 'Structured 御定子平 book page places 口授碎金炉前卷 and 口授碎金炉后卷 under 卷五; this is not a publisher/library catalog or facsimile.',
    },
    {
      recordId: 'SINA_2012_REPOST_WITH_EXPLICIT_2011_ORIGINAL_LINK',
      locator: 'https://blog.sina.com.cn/s/blog_9b6237b80101b70z.html',
      evidenceClass: 'DATE_VERIFIED_REPOST_WITH_EXPLICIT_ORIGINAL_LINK',
      directPublicContext: true,
      searchSnippetOnly: false,
      finding: '2012-09-24 repost explicitly labels 原文地址, links blog_6327065701018nju.html, attributes 尚慈居士, embeds 2011-12-23 17:33:51, and preserves the target Suijinlu text family.',
    },
    {
      recordId: 'MINGLI_BLOGGER_2012_06_SAME_TEXT_WITNESS',
      locator: 'https://mingliblog.blogspot.com/2012_06_24_archive.html?m=0',
      evidenceClass: 'DATE_VERIFIED_PUBLIC_TEXT_WITNESS',
      directPublicContext: true,
      searchSnippetOnly: false,
      finding: '2012-06-24 public witness preserves the same 御定子平秘本三篇 / 口授碎金炉 text family; no explicit source chain was observed.',
    },
    {
      recordId: 'UDN_2012_YUDING_ZIPING_VOLUME5_TEXT_WITNESS',
      locator: 'https://blog.udn.com/article/article_print.jsp?f_ART_ID=6954363&f_CODE=1787006780127&uid=DejaVu',
      evidenceClass: 'SEARCH_INDEX_VOLUME_BOUND_TEXT_LEAD',
      directPublicContext: false,
      searchSnippetOnly: true,
      finding: 'Search-index result for a page titled 《御定子平》卷五 exposed the target 三合 / 得局失垣 text family, but direct page fetch was unavailable in this gate; retained as a lead only and never used for canonical exact-passage binding.',
    },
    {
      recordId: 'SUANZHUN_2022_YUDING_ZIPING_DIGITIZATION_EDITORIAL_STATEMENT',
      locator: 'https://www.suanzhun.net/book/1215.html',
      evidenceClass: 'EDITORIAL_DIGITIZATION_STATEMENT',
      directPublicContext: true,
      searchSnippetOnly: false,
      finding: 'Editorial introduction states 郑同点校刊行 in 2011 and that the site author intended to convert the book to an electronic version; useful contextual evidence, not primary-edition proof.',
    },
  ]);
}

function finalized(
  material: Omit<I243ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluFourGapCanonicalProvenanceAdmissibilityAcquisitionEvidenceReport, 'evidenceId'>,
): I243ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluFourGapCanonicalProvenanceAdmissibilityAcquisitionEvidenceReport {
  return {
    evidenceId: `i243_yuding_suijinlu_acquisition_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI243ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluFourGapCanonicalProvenanceAdmissibilityAcquisitionEvidence(
  i242: I242ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluFourGapCanonicalProvenanceAdmissibilityAcquisitionReadinessReviewReport,
): I243ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluFourGapCanonicalProvenanceAdmissibilityAcquisitionEvidenceReport {
  const accepted = exactI242Accepted(i242);
  const records = accepted ? evidenceRecords() : Object.freeze([]);
  return finalized({
    evidenceVersion: I243_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_COMPETING_RELATION_SETTLEMENT_YUDING_SUIJINLU_FOUR_GAP_CANONICAL_PROVENANCE_ADMISSIBILITY_ACQUISITION_EVIDENCE_VERSION,
    status: accepted ? 'RESOLVED_COMPETING_RELATION_SETTLEMENT_YUDING_SUIJINLU_FOUR_GAP_CANONICAL_PROVENANCE_ADMISSIBILITY_ACQUISITION_EVIDENCE' : 'I242_ACQUISITION_BOUNDARY_INVALID',
    decision: accepted ? 'FIVE_ACQUISITION_PATHS_EXECUTED_2011_MODERN_EDITION_BIBLIOGRAPHIC_IDENTITY_AND_VOLUME5_SUIJINLU_PLACEMENT_SUPPORTED_2012_REPOST_TO_2011_ORIGINAL_LINK_DIRECTLY_OBSERVED_PUBLIC_TEXT_FAMILY_STABLE_EXACT_PALACE_OR_2011_PRINT_PASSAGE_FACSIMILE_NOT_ACQUIRED_FULL_DERIVATIVE_CHAIN_AND_FINAL_NORMATIVE_ADMISSIBILITY_UNRESOLVED_NO_PROMOTION' : 'YUDING_SUIJINLU_CANONICAL_PROVENANCE_ADMISSIBILITY_ACQUISITION_NOT_EXECUTED',
    upstreamI242ReviewId: i242.reviewId,
    exactI242BoundaryAccepted: accepted,
    targetScope: 'MULTIPLE_TRACKED_RELATION_TOUCHES_COMPETING_RELATION_SETTLEMENT',
    acquisitionExecuted: accepted,
    executedAcquisitionPathIds: accepted ? I242_ACQUISITION_PATH_IDS : Object.freeze([]),
    executedAcquisitionPathCount: accepted ? 5 : 0,
    evidenceRecords: records,
    evidenceRecordCount: accepted ? 8 : 0,
    directPublicEvidenceRecordCount: accepted ? 7 : 0,
    searchSnippetOnlyEvidenceCount: accepted ? 1 : 0,
    modern2011EditionBibliographicIdentityEstablished: accepted,
    modern2011EditionTitle: accepted ? '御定子平' : 'NOT_ESTABLISHED',
    modern2011EditionEditor: accepted ? '郑同点校' : 'NOT_ESTABLISHED',
    modern2011EditionPublisher: accepted ? '华龄出版社' : 'NOT_ESTABLISHED',
    modern2011EditionPublicationDate: accepted ? '2011-05' : 'NOT_ESTABLISHED',
    modern2011EditionIsbn: accepted ? '9787801788139' : 'NOT_ESTABLISHED',
    libraryOpacRecordObserved: accepted,
    publisherDescriptionPalaceManuscriptBasisObserved: accepted,
    publisherDescriptionFirstTypesetEditionClaimObserved: accepted,
    volume5SuijinluFrontAndBackChapterPlacementObserved: accepted,
    volume5PlacementBoundToPublisherOrLibraryCatalog: false,
    palaceManuscriptShelfmarkEstablished: false,
    palaceManuscriptCustodianRecordDirectlyAcquired: false,
    palaceManuscriptFacsimileDirectlyAcquired: false,
    modern2011PrintExactTargetPassagePageDirectlyAcquired: false,
    exactCanonicalTargetPassageBindingEstablished: false,
    sina2012RepostTimestampDirectlyObserved: accepted,
    sina2012ExplicitOriginalAddressLinkObserved: accepted,
    sina2012ExplicitOriginalAuthorAttributionObserved: accepted,
    sinaEmbeddedOriginalTimestamp: accepted ? '2011-12-23 17:33:51' : 'NOT_ESTABLISHED',
    sinaEmbeddedOriginalAuthor: accepted ? '尚慈居士' : 'NOT_ESTABLISHED',
    sinaEmbeddedOriginalUrl: accepted ? 'https://blog.sina.com.cn/s/blog_6327065701018nju.html' : 'NOT_ESTABLISHED',
    original2011UrlDirectlyFetchableInThisGate: false,
    explicit2012To2011DerivativeLinkEstablished: accepted,
    heyix2019To2011Or2012DerivativeLinkEstablished: false,
    sameTextPublicWitnessFamilyStabilityObserved: accepted,
    sameTextPublicWitnessesMayCountAsIndependentAuthorities: false,
    provenanceIndependenceAdjudicatedByThisGate: false,
    fullPublicWitnessDerivativeRelationshipEstablished: false,
    ruleBearingContextSupportedByVolumeAndTextStructure: accepted,
    editorialStatusSupportedBy2011PointCollatedEditionMetadata: accepted,
    finalTargetPassageNormativeAdmissibilityEstablished: false,
    gapAssessments: accepted
      ? Object.freeze([
          {
            gapId: I241_REMAINING_ADMISSIBILITY_GAP_IDS[0],
            disposition: 'MATERIALLY_NARROWED_NOT_CLOSED' as const,
            rationale: '2011 modern-edition bibliographic identity is established and a structured book transcription places Suijinlu in volume 5, but no palace-manuscript shelfmark/custodian record binds that chapter identity directly.',
          },
          {
            gapId: I241_REMAINING_ADMISSIBILITY_GAP_IDS[1],
            disposition: 'UNRESOLVED' as const,
            rationale: 'No directly acquired palace-manuscript facsimile or 2011 printed-edition page binds the exact I240 target passage to the canonical source identity.',
          },
          {
            gapId: I241_REMAINING_ADMISSIBILITY_GAP_IDS[2],
            disposition: 'MATERIALLY_NARROWED_NOT_CLOSED' as const,
            rationale: 'The 2012 Sina page explicitly identifies a 2011 original URL and author, but the 2019 witness chain and full text-family derivation remain unbound; no provenance independence is inferred.',
          },
          {
            gapId: I241_REMAINING_ADMISSIBILITY_GAP_IDS[3],
            disposition: 'MATERIALLY_NARROWED_NOT_CLOSED' as const,
            rationale: 'Rule-bearing volume/text context and 2011 editorial status are supported, but final target-passage admissibility remains blocked by the missing exact canonical passage binding.',
          },
        ])
      : Object.freeze([]),
    materiallyNarrowedGapCount: accepted ? 3 : 0,
    fullyClosedGapCount: 0,
    remainingAdmissibilityGapIds: accepted ? I241_REMAINING_ADMISSIBILITY_GAP_IDS : Object.freeze([]),
    remainingAdmissibilityGapCount: accepted ? 4 : 0,
    authorityGap: accepted ? 'COMPETING_RELATION_SETTLEMENT_AUTHORITY_NOT_ESTABLISHED' : 'UPSTREAM_INVALID',
    authorityGapClosed: false,
    authorityPromotedByThisGate: false,
    competingRelationSettlementResolved: false,
    crossRelationPrecedenceAuthorized: false,
    multiTouchAggregationAuthorized: false,
    hiddenStemI232HoldPreserved: accepted,
    hiddenStemTrackReopenedByThisGate: false,
    hiddenStemAuthorityGap: 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED',
    quWei2001HoldPreserved: accepted,
    li1998SameTargetPathSuspendedNotRetired: accepted,
    I132IndependentNormativeProvenanceRequirementRemainsNormative: accepted,
    I132PolicyRelaxationAuthorizedByThisGate: false,
    currentV2PackageAndCandidateSetRemainImmutable: accepted,
    currentV2ProvenanceDisposition: accepted ? 'BLOCKED_UNDER_CURRENT_EVIDENCE' : 'NOT_ASSESSED',
    candidateRegisteredByThisGate: false,
    candidateSelectedByThisGate: false,
    candidateSetMutatedByThisGate: false,
    evidenceRebindingAuthorizedByThisGate: false,
    derivativeRelationshipAdjudicatedBeyondExplicit2012RepostLink: false,
    actualCompositionPerformedByThisGate: false,
    multiSourceCompositionAuthorized: false,
    thresholdRuleCreatedByThisGate: false,
    damageEvaluationAuthorized: false,
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    productionPolicyExecutionAuthorized: false,
    negativeFindingCreatedByThisGate: false,
    discoveryExhaustionClaimed: false,
    corpusExhaustionClaimed: false,
    recommendedNextGate: accepted ? 'COMPETING_RELATION_SETTLEMENT_YUDING_SUIJINLU_CANONICAL_PROVENANCE_ACQUISITION_EVIDENCE_ADEQUACY_RESIDUAL_GAP_REASSESSMENT_REVIEW' : 'COMPETING_RELATION_SETTLEMENT_YUDING_SUIJINLU_FOUR_GAP_CANONICAL_PROVENANCE_ADMISSIBILITY_ACQUISITION_EVIDENCE',
    notes: accepted
      ? Object.freeze([
          'I243 establishes the modern 2011 published edition identity but deliberately does not equate that bibliographic identity with a directly verified palace-manuscript shelfmark or facsimile.',
          'The explicit Sina 原文地址 relation is treated as direct derivative evidence for the 2012 repost only; chronology is not used to infer the 2019 witness chain or provenance independence.',
          'The UDN result is retained as search-index lead context only because direct page retrieval failed; it is not counted as direct evidence or used for exact canonical passage binding.',
          'Public full-text witnesses strongly stabilize the Suijinlu text family, but same-text repetition is not counted as independent normative authority.',
          'No negative or exhaustion finding is created from failure to acquire the palace manuscript or exact 2011 print page in this pass.',
        ])
      : Object.freeze(['I243 fails closed unless the exact I242 five-path acquisition boundary is preserved.']),
  });
}
