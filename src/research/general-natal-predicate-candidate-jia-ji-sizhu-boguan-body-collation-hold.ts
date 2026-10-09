import {
  R187_AUTHORITY,
  R187_READ01_SURFACE,
  R187_SECTION_STRUCTURE_MATCH,
  R187_SIZHU_BOGUAN_WORK_CANDIDATE,
} from './general-natal-predicate-candidate-jia-ji-read01-sizhu-boguan-provenance.js';

export const R188_SIZHU_BOGUAN_BODY_COLLATION_HOLD_VERSION =
  '0.1.0-research' as const;

export const R188_CURRENT_ACCESS_AUDIT = Object.freeze({
  bookCandidateId: R187_SIZHU_BOGUAN_WORK_CANDIDATE.candidateId,
  bookTitle: R187_SIZHU_BOGUAN_WORK_CANDIDATE.workTitle,
  metadataAndTocSurfaceAccessible: true,
  exactSectionHierarchyAccessible:
    R187_SECTION_STRUCTURE_MATCH.sectionHierarchyMatchEstablished,
  exactRead01CaseBodyAccessible:
    R187_READ01_SURFACE.directCaseBodyAvailableOnSurface,
  pdfCoffeeTargetBodyPhraseMatchObserved: false,
  independentExactPhrasePlusBookTitleWitnessObserved: false,
  alternateDownloadOrDistributionSurfacesObserved: true,
  targetBookBodyPageDirectlyInspectableOnCurrentSurface: false,
  targetBookBodyTextDirectlyCollated: false,
  targetPhysicalOrScanPageVisuallyVerified: false,
});

export const R188_TARGET_CASE = Object.freeze({
  dayStem: R187_READ01_SURFACE.dayStem,
  pair: R187_READ01_SURFACE.pair,
  bothPairParticipantsNonDayMaster:
    R187_READ01_SURFACE.bothPairParticipantsNonDayMaster,
  combinationLanguageObserved:
    R187_READ01_SURFACE.combinationLanguageObserved,
  controllerControlledLanguageObserved:
    R187_READ01_SURFACE.controllerControlledLanguageObserved,
  differentiatedFunctionalLossLanguageObserved:
    R187_READ01_SURFACE.differentiatedFunctionalLossLanguageObserved,
  targetPhrases: Object.freeze([
    '天干甲己相合',
    '甲属于克的地位，己属于被克的地位',
    '甲木偏财之性微损，己正印之性全失',
  ] as const),
});

export const R188_HOLD_DECISION = Object.freeze({
  status:
    'SIZHU_BOGUAN_EXACT_CASE_BODY_COLLATION_BLOCKED_BY_CURRENT_ACCESS_SURFACE' as const,
  sourceFamilyCandidatePreserved:
    R187_AUTHORITY.earlierNamedWorkSourceFamilyCandidateEstablished,
  sectionHierarchyMatchPreserved:
    R187_AUTHORITY.sectionHierarchyMatchEstablished,
  exactCaseBodyCollationComplete: false,
  exactCaseBookPageBound: false,
  exactCasePhysicalPageBound: false,
  negativeTextualEvidenceEstablished: false,
  absenceFromBookEstablished: false,
  read01IndependentCreationEstablished: false,
  directCopyChainEstablished: false,
  provenanceFullyResolved: false,
  repeatSameAccessSurfaceWithoutNewCapabilityAuthorized: false,
});

export const R188_EVIDENCE_BOUNDARY = Object.freeze({
  searchMissDoesNotEqualTextAbsence: true,
  inaccessibleBodyDoesNotEqualTextAbsence: true,
  fileExistenceDoesNotEqualTargetBodyAccess: true,
  tocMatchDoesNotEqualBodyIdentity: true,
  alternateDistributionListingDoesNotEqualPrimaryWitness: true,
  unverifiedLocatorDoesNotEqualPageBinding: true,
  accessFailureDoesNotDowngradeR187SourceFamilyCandidate: true,
  accessFailureDoesNotPromoteSemanticAuthority: true,
});

export const R188_REQUIRED_TRIGGER_FOR_REOPEN = Object.freeze([
  'NEW_DIRECT_PDF_OR_SCAN_ACCESS_SURFACE',
  'PAGE_LEVEL_PREVIEW_SHOWING_TARGET_SECTION_BODY',
  'SEARCHABLE_BOOK_BODY_WITH_EXACT_TARGET_PHRASES',
  'LIBRARY_OR_ARCHIVE_COPY_WITH_PAGE_INSPECTION',
  'INDEPENDENT_PAGE_CITATION_TO_THE_EXACT_CASE',
] as const);

export const R188_REJECTED_SHORTCUTS = Object.freeze([
  'NO_SEARCH_MATCH_EQUALS_NOT_IN_BOOK',
  'DOWNLOAD_LISTING_EQUALS_BODY_COLLATION',
  'TOC_MATCH_EQUALS_EXACT_CASE_BODY_MATCH',
  'SOURCE_FAMILY_CANDIDATE_EQUALS_RESOLVED_PROVENANCE',
  'ACCESS_HOLD_EQUALS_NEGATIVE_TEXTUAL_EVIDENCE',
  'REPEATED_IDENTICAL_SEARCH_EQUALS_RESEARCH_PROGRESS',
] as const);

export const R188_AUTHORITY = Object.freeze({
  status:
    'RESEARCH_SIZHU_BOGUAN_EXACT_CASE_BODY_COLLATION_ACCESS_HOLD' as const,
  researchOnly: true,
  sourceFamilyCandidatePreserved: true,
  exactSectionHierarchyPreserved: true,
  exactRead01CaseBodyPreserved: true,
  exactCaseBodyCollationComplete: false,
  exactCaseBookPageBound: false,
  exactCasePhysicalPageBound: false,
  negativeTextualEvidenceEstablished: false,
  absenceFromBookEstablished: false,
  read01IndependentCreationEstablished: false,
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
