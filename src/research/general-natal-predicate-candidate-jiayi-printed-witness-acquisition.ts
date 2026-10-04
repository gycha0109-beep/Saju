import {
  R174_AUTHORITY,
  R174_JIA_ONLY_SCANNED_PAGE_BINDING_VERSION,
  R174_PARTIAL_MAPPING_AUDIT,
} from './general-natal-predicate-candidate-jia-only-scanned-page-binding.js';

export const R175_JIAYI_PRINTED_WITNESS_ACQUISITION_VERSION =
  '0.1.0-research' as const;

export type R175CandidateKind =
  | 'DIGITAL_PDF_INDEX_CANDIDATE'
  | 'BIBLIOGRAPHIC_EDITION_CANDIDATE'
  | 'FACSIMILE_PRODUCT_RECORD_CANDIDATE';

export interface R175JiaYiWitnessCandidate {
  candidateId: string;
  kind: R175CandidateKind;
  sourceLabel: string;
  sourceUrl: string;
  workTitle: string;
  attributedAuthorOrEditor: string;
  publisherLabel: string | null;
  publicationDateLabel: string | null;
  totalPageCount: number | null;
  chapterPageStart: number | null;
  chapterPageEnd: number | null;
  jiaYiSurfaceIndexed: boolean;
  targetPagePreviewAvailable: boolean;
  targetPageVisualVerificationComplete: false;
  physicalEditionIdentityBound: false;
  targetPrintedPageBound: false;
  canonicalReadingAuthorized: false;
  mayCloseR174PhysicalGap: false;
}

export const R175_JIAYI_WITNESS_CANDIDATES:
  readonly R175JiaYiWitnessCandidate[] = Object.freeze([
    Object.freeze({
      candidateId: 'R175-C01-YIJINGYIXUE-159P-PDF',
      kind: 'DIGITAL_PDF_INDEX_CANDIDATE' as const,
      sourceLabel: '易經易學 ZPZ006',
      sourceUrl: 'https://www.yijingyixue.com/ZPZ006/',
      workTitle: '子平真詮評註',
      attributedAuthorOrEditor: '沈孝瞻 原著 / 徐樂吾 評註',
      publisherLabel: null,
      publicationDateLabel: null,
      totalPageCount: 159,
      chapterPageStart: 91,
      chapterPageEnd: 92,
      jiaYiSurfaceIndexed: true,
      targetPagePreviewAvailable: false,
      targetPageVisualVerificationComplete: false as const,
      physicalEditionIdentityBound: false as const,
      targetPrintedPageBound: false as const,
      canonicalReadingAuthorized: false as const,
      mayCloseR174PhysicalGap: false as const,
    }),
    Object.freeze({
      candidateId: 'R175-C02-GOOGLE-BOOKS-SHANGHAI-1957-V2',
      kind: 'BIBLIOGRAPHIC_EDITION_CANDIDATE' as const,
      sourceLabel: 'Google Books bibliographic record',
      sourceUrl:
        'https://books.google.com/books/about/%E5%AD%90%E5%B9%B3%E7%9C%9F%E8%A9%AE%E8%A9%95%E8%A8%BB_%E5%91%BD%E5%AD%B8%E8%A6%81%E6%9B%B8.html?id=cHNAzgEACAAJ',
      workTitle: '子平真詮評註-命學要書, Volume 2',
      attributedAuthorOrEditor: '沈燡燔 / 徐樂吾',
      publisherLabel: '上海印書館',
      publicationDateLabel: '1957',
      totalPageCount: null,
      chapterPageStart: null,
      chapterPageEnd: null,
      jiaYiSurfaceIndexed: false,
      targetPagePreviewAvailable: false,
      targetPageVisualVerificationComplete: false as const,
      physicalEditionIdentityBound: false as const,
      targetPrintedPageBound: false as const,
      canonicalReadingAuthorized: false as const,
      mayCloseR174PhysicalGap: false as const,
    }),
    Object.freeze({
      candidateId: 'R175-C03-HK-SHANGHAI-FACSIMILE-344P',
      kind: 'FACSIMILE_PRODUCT_RECORD_CANDIDATE' as const,
      sourceLabel: '星易圖書 上海印書館版 product record',
      sourceUrl: 'https://www.xinyibooks.net/goods-8303.html',
      workTitle: '子平真詮評註',
      attributedAuthorOrEditor: '徐樂吾',
      publisherLabel: '香港上海印書館',
      publicationDateLabel: null,
      totalPageCount: 344,
      chapterPageStart: null,
      chapterPageEnd: null,
      jiaYiSurfaceIndexed: false,
      targetPagePreviewAvailable: false,
      targetPageVisualVerificationComplete: false as const,
      physicalEditionIdentityBound: false as const,
      targetPrintedPageBound: false as const,
      canonicalReadingAuthorized: false as const,
      mayCloseR174PhysicalGap: false as const,
    }),
  ]);

export const R175_DIGITAL_PAGE_RANGE_EVIDENCE = Object.freeze({
  candidateId: 'R175-C01-YIJINGYIXUE-159P-PDF',
  formatReported: 'PDF' as const,
  totalPagesReported: 159,
  targetSection: '二十六 論行運成格變格' as const,
  reportedPageRange: Object.freeze([91, 92] as const),
  targetSummaryReportsJiaYiSurface: true,
  publicPreviewPageCount: 13,
  targetPageInsidePublicPreview: false,
  targetPageVisualVerificationComplete: false,
  pageRangeEvidenceDistinctFromPrintedPageBinding: true,
});

export const R175_BIBLIOGRAPHIC_CANDIDATE_AUDIT = Object.freeze({
  candidateCount: R175_JIAYI_WITNESS_CANDIDATES.length,
  digitalPdfIndexCandidateCount:
    R175_JIAYI_WITNESS_CANDIDATES.filter(
      (item) => item.kind === 'DIGITAL_PDF_INDEX_CANDIDATE',
    ).length,
  bibliographicEditionCandidateCount:
    R175_JIAYI_WITNESS_CANDIDATES.filter(
      (item) => item.kind === 'BIBLIOGRAPHIC_EDITION_CANDIDATE',
    ).length,
  facsimileProductRecordCandidateCount:
    R175_JIAYI_WITNESS_CANDIDATES.filter(
      (item) => item.kind === 'FACSIMILE_PRODUCT_RECORD_CANDIDATE',
    ).length,
  visuallyVerifiedCandidateCount:
    R175_JIAYI_WITNESS_CANDIDATES.filter(
      (item) => item.targetPageVisualVerificationComplete,
    ).length,
  physicalEditionIdentityBoundCount:
    R175_JIAYI_WITNESS_CANDIDATES.filter(
      (item) => item.physicalEditionIdentityBound,
    ).length,
  targetPrintedPageBoundCount:
    R175_JIAYI_WITNESS_CANDIDATES.filter(
      (item) => item.targetPrintedPageBound,
    ).length,
});

export const R175_R174_GAP_REASSESSMENT = Object.freeze({
  upstreamJiaOnlyPhysicalScanPageBound:
    R174_AUTHORITY.jiaOnlyPhysicalScanPageBound,
  upstreamJiaYiPhysicalScanPageBound:
    R174_AUTHORITY.jiaYiPhysicalScanPageBound,
  upstreamAsymmetricMapping:
    R174_PARTIAL_MAPPING_AUDIT.asymmetricPhysicalMappingObserved,
  jiaYiAcquisitionCandidatesNowBound: true,
  jiaYiTargetPageRangeCandidateBound: true,
  jiaYiPhysicalScanPageBound: false,
  completePhysicalVariantMappingEstablished: false,
  canonicalVariantEstablished: false,
  variantLineageEstablished: false,
});

export const R175_ADMISSION_GUARDS = Object.freeze({
  digitalPageIndexDoesNotEqualPageVisualVerification: true,
  chapterSummaryDoesNotEqualPrintedSurfaceWitness: true,
  bibliographicRecordDoesNotEqualTargetSurfaceBinding: true,
  productFacsimileLabelDoesNotEstablishTargetSurface: true,
  samePublisherFamilyDoesNotEstablishSameEdition: true,
  titleMatchDoesNotEstablishTextualIdentity: true,
  inaccessibleTargetPreviewMustRemainUnverified: true,
  candidateMultiplicityDoesNotCreateCanonicalReading: true,
});

export const R175_REQUIRED_FOLLOW_UP = Object.freeze([
  'DIRECT_VISUAL_ACCESS_TO_JIAYI_TARGET_PAGE',
  'PHYSICAL_EDITION_IDENTITY_FOR_VISUALLY_VERIFIED_JIAYI_PAGE',
  'PRINTED_PAGE_OR_FOLIO_BINDING_FOR_JIAYI_VARIANT',
  'JIA_ONLY_AND_JIA_YI_LINEAGE_COLLATION',
  'CANONICAL_READING_RESOLUTION_IF_SUPPORTED',
] as const);

export const R175_REJECTED_SHORTCUTS = Object.freeze([
  'PDF_INDEX_EQUALS_PHYSICAL_WITNESS',
  'PAGE_RANGE_EQUALS_VISUAL_VERIFICATION',
  'CHAPTER_SUMMARY_EQUALS_PRINTED_PAGE',
  'GOOGLE_BOOKS_RECORD_EQUALS_TARGET_SURFACE_WITNESS',
  'FACSIMILE_PRODUCT_RECORD_EQUALS_TARGET_SURFACE_WITNESS',
  'SHANGHAI_PUBLISHER_LABEL_EQUALS_SAME_EDITION',
  'JIA_YI_CANDIDATE_COUNT_EQUALS_CANONICAL_READING',
  'UNAVAILABLE_PREVIEW_EQUALS_NEGATIVE_EVIDENCE',
  'ACQUISITION_CANDIDATE_EQUALS_SEMANTIC_PREDICATE',
  'ACQUISITION_CANDIDATE_AS_EXECUTABLE_RULE',
] as const);

export const R175_SUMMARY = Object.freeze({
  candidateCount: R175_JIAYI_WITNESS_CANDIDATES.length,
  targetPageRangeCandidateCount:
    R175_JIAYI_WITNESS_CANDIDATES.filter(
      (item) =>
        item.chapterPageStart !== null && item.chapterPageEnd !== null,
    ).length,
  visuallyVerifiedCandidateCount:
    R175_BIBLIOGRAPHIC_CANDIDATE_AUDIT.visuallyVerifiedCandidateCount,
  physicalEditionIdentityBoundCount:
    R175_BIBLIOGRAPHIC_CANDIDATE_AUDIT.physicalEditionIdentityBoundCount,
  targetPrintedPageBoundCount:
    R175_BIBLIOGRAPHIC_CANDIDATE_AUDIT.targetPrintedPageBoundCount,
  requiredFollowUpCount: R175_REQUIRED_FOLLOW_UP.length,
});

export const R175_UPSTREAM_BINDINGS = Object.freeze({
  r174: {
    version: R174_JIA_ONLY_SCANNED_PAGE_BINDING_VERSION,
    jiaOnlyPhysicalScanPageBound:
      R174_AUTHORITY.jiaOnlyPhysicalScanPageBound,
    jiaYiPhysicalScanPageBound:
      R174_AUTHORITY.jiaYiPhysicalScanPageBound,
    completePhysicalVariantMappingEstablished:
      R174_AUTHORITY.completePhysicalVariantMappingEstablished,
  },
});

export const R175_AUTHORITY = Object.freeze({
  status: 'RESEARCH_JIAYI_PRINTED_WITNESS_ACQUISITION_CANDIDATES_BOUND' as const,
  researchOnly: true,
  jiaYiAcquisitionCandidatesBound: true,
  jiaYiDigitalPageRangeCandidateBound: true,
  jiaYiTargetPageVisualVerificationComplete: false,
  jiaYiPhysicalEditionIdentityBound: false,
  jiaYiPhysicalScanPageBound: false,
  completePhysicalVariantMappingEstablished: false,
  canonicalVariantEstablished: false,
  variantLineageEstablished: false,
  historicalCriticalEditionEstablished: false,
  standaloneJiaPredicateAuthorized: false,
  standaloneYiPredicateAuthorized: false,
  groupedJiaYiPredicateAuthorized: false,
  exactConfigurationTuplePredicateEstablished: false,
  exactMinimalPredicateSetEstablished: false,
  matchingSufficiencyEstablished: false,
  outcomeSufficiencyEstablished: false,
  settlementEstablished: false,
  mechanismRankingAuthorized: false,
  numericWeightAuthorized: false,
  executableResolverAuthorized: false,
  automaticEngineAdmissionAuthorized: false,
  interpretationClaimEmissionAuthorized: false,
  previewPromotionAuthorized: false,
  productionAuthorityPromoted: false,
});
