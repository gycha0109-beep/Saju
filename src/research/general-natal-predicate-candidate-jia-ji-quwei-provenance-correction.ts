import {
  R185_AUTHORITY,
  R185_EARLIEST_ATTRIBUTABLE_PUBLIC_SURFACE,
  R185_PROVENANCE_PROGRESS,
  R185_R184_CASE_PROVENANCE_GAP,
} from './general-natal-predicate-candidate-jia-ji-secondary-provenance-trace.js';

export const R186_JIA_JI_QUWEI_PROVENANCE_CORRECTION_VERSION =
  '0.1.0-research' as const;

export const R186_QUWEI_WORK_CANDIDATE = Object.freeze({
  candidateId: 'R186-P01-QUWEI-SIZHU-XIANGZHEN',
  workTitle: '四柱详真' as const,
  attributedAuthor: '曲炜' as const,
  workAuthorshipAttributionBound: true,
  authorOfficialBiographySurface:
    'https://www.zhouyiqw.com/qwjj.php' as const,
  authorOfficialBiographyPublicationYearStatementObserved: true,
  publicationYearCandidate: 2001,
  exactPublicationDateEstablished: false,
  publisherOrFormalImprintEstablished: false,
  formalEditionStatementEstablished: false,
  classicalOrCanonicalWork: false,
});

export const R186_QUWEI_INDEXED_TEXT_WITNESS = Object.freeze({
  witnessId: 'R186-W01-SIZHU-XIANGZHEN-INDEXED-PDF',
  sourceLabel: '曲炜《四柱详真》 public indexed PDF/OCR surface' as const,
  sourceUrl:
    'https://www.scribd.com/document/398602563/%E6%9B%B2%E7%82%9C-%E5%9B%9B%E6%9F%B1%E8%AF%A6%E7%9C%9F' as const,
  exactJiaJiDirectRuleFamilyObserved: true,
  exactRuleSurfaces: Object.freeze([
    '若合而不化，就以正常的生克论',
    '例甲与己合而不化，以甲木合克己土来论',
    '甲还是原来的甲，己还是原来的己',
    '甲己也因合双方均减力，合为绊住',
    '自身生克权受到制约',
  ] as const),
  indexedPageLabelCandidateObserved: true,
  indexedPageLabelCandidate: 50,
  indexedCarrierPageCountCandidate: 118,
  pdfOrOcrTextSurfaceAccessible: true,
  physicalPageVisualVerificationAttempted: true,
  physicalPageVisualVerificationSucceeded: false,
  physicalPrintedPageBound: false,
  primaryPrintedWitnessBound: false,
  ruleOriginalAuthorshipEstablished: false,
  normativeAuthorityAcquired: false,
});

export const R186_CHRONOLOGY_CORRECTION = Object.freeze({
  r185EarliestAttributableSurfaceCandidate:
    R185_EARLIEST_ATTRIBUTABLE_PUBLIC_SURFACE.candidateId,
  r185EarliestObservedDisplayedDate:
    R185_PROVENANCE_PROGRESS.earliestObservedDisplayedDate,
  r185CandidateYear: 2011,
  earlierAttributableWorkCandidateFound: true,
  earlierWorkTitle: R186_QUWEI_WORK_CANDIDATE.workTitle,
  earlierWorkAttributedAuthor: R186_QUWEI_WORK_CANDIDATE.attributedAuthor,
  earlierWorkPublicationYearCandidate:
    R186_QUWEI_WORK_CANDIDATE.publicationYearCandidate,
  chronologyOrderEstablishedAtYearGranularity: true,
  r185SurfaceRemainsEarliestCandidate: false,
  r185SurfaceReclassifiedAsLaterTransmissionCandidate: true,
  directDerivationFromQuWeiToSongKunEstablished: false,
  firstCreationOfRuleFamilyEstablished: false,
});

export const R186_R185_RECLASSIFICATION = Object.freeze({
  r185PreviousStatus:
    'EARLIEST_ATTRIBUTABLE_PUBLIC_SURFACE_CANDIDATE' as const,
  r186CurrentStatus:
    'LATER_ATTRIBUTABLE_TRANSMISSION_SURFACE_CANDIDATE' as const,
  displayedNamePreserved: '宋坤' as const,
  displayedDatePreserved: '2011-10-06' as const,
  sameOrNearRuleFamilyObserved: true,
  textualDerivationChainEstablished: false,
  independentLineageEstablished: false,
  normativeWitnessCountIncreaseAuthorized: false,
});

export const R186_PROVENANCE_PROGRESS = Object.freeze({
  r185EarliestAttributablePublicSurfaceCandidateEstablished:
    R185_AUTHORITY.earliestAttributablePublicSurfaceCandidateEstablished,
  attributableNamedWorkCandidateNowEstablished: true,
  attributableWorkYearCandidateNowEstablished: true,
  chronologyImprovedFrom2011To2001WorkCandidate: true,
  workAuthorshipAttributionBound: true,
  ruleOriginalAuthorshipEstablished: false,
  exactPublicationDateEstablished: false,
  primaryPrintedWitnessEstablished: false,
  physicalTargetPageVisualVerificationComplete: false,
  directNonDayMasterCaseProvenanceStillOpen:
    R185_R184_CASE_PROVENANCE_GAP.directCaseProvenanceStillOpen,
  canonicalTraditionalLineageEstablished: false,
});

export const R186_AUTHORITY_BOUNDARY = Object.freeze({
  workPublicationYearDoesNotEqualRuleCreationYear: true,
  workAuthorshipDoesNotEqualRuleOriginalAuthorship: true,
  indexedPdfTextDoesNotEqualPhysicalPageVerification: true,
  indexedPageLabelDoesNotEqualPrintedPageBinding: true,
  modernNamedBookDoesNotEqualClassicalCanonicalAuthority: true,
  earlierChronologyDoesNotEqualNormativeAdmission: true,
  laterSimilarTextDoesNotProveDirectCopying: true,
  ruleFamilyProvenanceDoesNotResolveDirectCaseProvenance: true,
});

export const R186_REQUIRED_FOLLOW_UP = Object.freeze([
  'BIND_SIZHU_XIANGZHEN_RULE_TO_PHYSICAL_PAGE_IF_ACCESSIBLE',
  'ESTABLISH_FORMAL_BIBLIOGRAPHIC_EDITION_OR_IMPRINT_FOR_SIZHU_XIANGZHEN',
  'TRACE_RULE_FAMILY_BEFORE_2001_IF_ANY',
  'TEST_TEXTUAL_DERIVATION_BETWEEN_QUWEI_AND_SONGKUN_SURFACES',
  'TRACE_READ01_DIRECT_NON_DAY_MASTER_CASE_SEPARATELY',
] as const);

export const R186_REJECTED_SHORTCUTS = Object.freeze([
  'BOOK_YEAR_EQUALS_RULE_CREATION_YEAR',
  'BOOK_AUTHOR_EQUALS_RULE_ORIGINATOR',
  'INDEXED_PDF_TEXT_EQUALS_PHYSICAL_PAGE_WITNESS',
  'INDEXED_PAGE_50_EQUALS_PRINTED_PAGE_50',
  'QUWEI_2001_EQUALS_CLASSICAL_CANON',
  'EARLIER_WORK_EQUALS_NORMATIVE_AUTHORITY',
  'SIMILAR_LATER_TEXT_EQUALS_PROVEN_COPY_CHAIN',
  'DIRECT_RULE_PROVENANCE_EQUALS_DIRECT_CASE_PROVENANCE',
] as const);

export const R186_AUTHORITY = Object.freeze({
  status:
    'RESEARCH_JIA_JI_DIRECT_RULE_PROVENANCE_CORRECTED_TO_EARLIER_QUWEI_WORK_CANDIDATE' as const,
  researchOnly: true,
  earlierAttributableNamedWorkCandidateEstablished: true,
  attributedAuthorBound: true,
  publicationYearCandidateBound: true,
  exactJiaJiDirectRuleFamilyIndexedInWork: true,
  chronologyCorrectionEstablished: true,
  r185SurfaceStillEarliestCandidate: false,
  directQuWeiToSongKunDerivationEstablished: false,
  ruleOriginalAuthorshipEstablished: false,
  firstPublicationEstablished: false,
  physicalPageVisualVerificationComplete: false,
  physicalPrintedPageBound: false,
  primaryPrintedWitnessEstablished: false,
  directNonDayMasterCaseProvenanceResolved: false,
  primaryOrCanonicalDirectMatchAuthorityObserved: false,
  pairLocalNormativeAuthorityAcquired: false,
  pairLocalInteractionOutcomeEstablished: false,
  coexistenceSettlementEstablished: false,
  exactContextSettlementEstablished: false,
  crossRelationPrecedenceAuthorized: false,
  settlementEstablished: false,
  executableResolverAuthorized: false,
  automaticEngineAdmissionAuthorized: false,
  interpretationClaimEmissionAuthorized: false,
  previewPromotionAuthorized: false,
  productionAuthorityPromoted: false,
});
