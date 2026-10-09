import {
  R185_R184_CASE_PROVENANCE_GAP,
} from './general-natal-predicate-candidate-jia-ji-secondary-provenance-trace.js';
import {
  R186_AUTHORITY,
} from './general-natal-predicate-candidate-jia-ji-quwei-provenance-correction.js';

export const R187_READ01_SIZHU_BOGUAN_PROVENANCE_VERSION =
  '0.1.0-research' as const;

export const R187_READ01_SURFACE = Object.freeze({
  candidateId: 'R187-S01-READ01-2015-XINGZUO123',
  sourceUrl: 'https://read01.com/zh-sg/Rmo3Ea.html' as const,
  articleTitle: '命理基础——合、刑、冲、克的相互制约' as const,
  displayedPublicationDate: '2015-08-26' as const,
  displayedSourceLabel: '星座123' as const,
  exactNonDayMasterJiaJiCaseObserved: true,
  dayStem: '庚' as const,
  pair: Object.freeze(['甲', '己'] as const),
  bothPairParticipantsNonDayMaster: true,
  combinationLanguageObserved: true,
  controllerControlledLanguageObserved: true,
  differentiatedFunctionalLossLanguageObserved: true,
  directCaseBodyAvailableOnSurface: true,
  originalAuthorEstablished: false,
  firstPublicationEstablished: false,
  bookOrPrintedSourceEstablishedByThisSurface: false,
});

export const R187_SIZHU_BOGUAN_WORK_CANDIDATE = Object.freeze({
  candidateId: 'R187-W01-SIZHU-BOGUAN-2004-FIRST-EDITION',
  workTitle: '四柱博观' as const,
  displayedResponsibility: '张志春主编　凌志轩编' as const,
  displayedPageCount: 530,
  displayedSsNumber: '11570065' as const,
  displayedEditionDate: '2004-06' as const,
  displayedEditionLabel: '第1版' as const,
  metadataSurfaceUrl:
    'https://pdfcoffee.com/tu-tru-bac-quan-lang-chi-hien-chiennguyen--pdf-free.html' as const,
  formalLibraryCatalogRecordBound: false,
  physicalCopyrightPageBound: false,
  publisherImprintBound: false,
  classicalOrCanonicalWork: false,
});

export const R187_SECTION_STRUCTURE_MATCH = Object.freeze({
  bookChapter: '第五章　重点操作原理' as const,
  bookSection: '第一节　关于合、冲、刑、生、克、破、害' as const,
  bookSubsection: '五、合、刑、冲、生、克的相互制约' as const,
  bookNestedSections: Object.freeze([
    '（一）合力与分力',
    '（二）合、刑、冲、生、克的相互作用',
  ] as const),
  read01TitleMatchesBookSubsectionTopic: true,
  read01BodyUsesHeLiFenLiSubdivision: true,
  read01BodyUsesInteractionSubdivision: true,
  sectionHierarchyMatchEstablished: true,
  exactCaseTextCollatedAgainstBookBody: false,
  fullBodyTextualIdentityEstablished: false,
  directCopyChainEstablished: false,
});

export const R187_SOURCE_FAMILY_REASSESSMENT = Object.freeze({
  upstreamDirectCaseProvenancePreviouslyOpen:
    R185_R184_CASE_PROVENANCE_GAP.directCaseProvenanceStillOpen,
  upstreamR186DirectCaseProvenanceStillOpen:
    !R186_AUTHORITY.directNonDayMasterCaseProvenanceResolved,
  namedWorkSourceFamilyCandidateNowAvailable: true,
  namedWorkYearCandidate: 2004,
  read01DisplayedYear: 2015,
  chronologyOrderEstablishedAtYearGranularity: true,
  sourceFamilyCandidateEarlierThanRead01: true,
  exactCaseBodyPhysicalCollationComplete: false,
  exactCaseBookPageBound: false,
  exactCaseAuthorialOriginEstablished: false,
  directCaseProvenanceFullyResolved: false,
});

export const R187_PROVENANCE_CLASSIFICATION = Object.freeze({
  read01SurfaceClassification:
    'LATER_WEB_TRANSMISSION_WITH_DISPLAYED_SOURCE_LABEL' as const,
  sizhuBoguanClassification:
    'EARLIER_NAMED_WORK_SOURCE_FAMILY_CANDIDATE' as const,
  relationshipClassification:
    'STRUCTURAL_SECTION_MATCH_WITHOUT_BODY_COLLATION' as const,
  provenanceConfidenceAdvance: true,
  normativeAuthorityAdvance: false,
});

export const R187_AUTHORITY_BOUNDARY = Object.freeze({
  sectionTitleMatchDoesNotEqualExactCaseIdentity: true,
  sectionHierarchyMatchDoesNotEqualDirectCopyChain: true,
  bookMetadataSurfaceDoesNotEqualPhysicalCopyrightPage: true,
  namedWorkCandidateDoesNotEqualPrimaryCaseWitness: true,
  displayedSourceLabelDoesNotEstablishOriginalAuthor: true,
  chronologyDoesNotEstablishDerivation: true,
  modernNamedWorkDoesNotEqualClassicalCanonicalAuthority: true,
  provenanceCandidateDoesNotEqualSemanticOutcomeAuthority: true,
});

export const R187_REQUIRED_FOLLOW_UP = Object.freeze([
  'COLLATE_READ01_EXACT_JIA_JI_CASE_AGAINST_SIZHU_BOGUAN_BODY',
  'BIND_SIZHU_BOGUAN_EXACT_CASE_TO_PHYSICAL_OR_SCAN_PAGE_IF_AVAILABLE',
  'ESTABLISH_FORMAL_BIBLIOGRAPHIC_IMPRINT_FOR_SIZHU_BOGUAN',
  'TRACE_XINGZUO123_2015_SURFACE_OR_ARCHIVE',
  'TEST_DIRECT_TEXTUAL_DERIVATION_FROM_SIZHU_BOGUAN_TO_2015_SURFACE',
] as const);

export const R187_REJECTED_SHORTCUTS = Object.freeze([
  'MATCHING_SECTION_TITLE_EQUALS_EXACT_CASE_SOURCE',
  'MATCHING_SUBSECTION_STRUCTURE_EQUALS_FULL_TEXT_IDENTITY',
  'EARLIER_BOOK_EQUALS_PROVEN_DIRECT_COPY_SOURCE',
  'PDFCOFFEE_METADATA_EQUALS_FORMAL_LIBRARY_CATALOG',
  'READ01_SOURCE_LABEL_EQUALS_ORIGINAL_AUTHOR',
  'SIZHU_BOGUAN_2004_EQUALS_CLASSICAL_CANON',
  'PROVENANCE_FAMILY_CANDIDATE_EQUALS_PAIR_LOCAL_SETTLEMENT_AUTHORITY',
] as const);

export const R187_AUTHORITY = Object.freeze({
  status:
    'RESEARCH_READ01_DIRECT_CASE_SIZHU_BOGUAN_SOURCE_FAMILY_CANDIDATE_BOUND' as const,
  researchOnly: true,
  read01ExactNonDayMasterDirectCasePreserved: true,
  read01DisplayedSourceLabelPreserved: true,
  earlierNamedWorkSourceFamilyCandidateEstablished: true,
  sectionHierarchyMatchEstablished: true,
  exactCaseBodyCollationComplete: false,
  exactCasePhysicalPageBound: false,
  exactCaseBookPageBound: false,
  directCopyChainEstablished: false,
  exactCaseAuthorialOriginEstablished: false,
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
