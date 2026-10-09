import {
  R181_AUTHORITY,
  R181_QIANLI_PHYSICAL_EDITION_CANDIDATE,
  R181_QIANLI_TARGET_SURFACES,
} from './general-natal-predicate-candidate-qianli-jia-ji-witness-acquisition.js';

export const R182_QIANLI_TARGET_PAGE_BINDING_HOLD_VERSION =
  '0.1.0-research' as const;

export const R182_PHYSICAL_ACCESS_ATTEMPTS = Object.freeze([
  Object.freeze({
    attemptId: 'R182-A01-NLC-COMMONS-PDF',
    sourceLabel: 'Wikimedia Commons NLC 1935 scan',
    sourceUrl:
      'https://commons.wikimedia.org/wiki/File:NLC416-01jh000372-10197_%E5%8D%83%E9%87%8C%E5%91%BD%E7%A8%BF.pdf',
    physicalEditionIdentityMatchesR181: true,
    pdfPageCountReported: 123,
    carrierPageCountReported: 116,
    pdfMetadataAccessible: true,
    targetSurfaceTextIndexedInPdf: false,
    pageScreenshotAttempted: true,
    pageScreenshotSucceeded: false,
    acquisitionFailureClass: 'PAGE_RENDER_CACHE_MISS' as const,
    targetPageVisualVerificationComplete: false,
    targetPrintedPageBound: false,
  }),
  Object.freeze({
    attemptId: 'R182-A02-VRD-ALTERNATE-PDF',
    sourceLabel: 'vr-d.com Qianli Minggao PDF',
    sourceUrl:
      'https://www.vr-d.com/pdf-file/%E5%91%BD%E7%90%86%2F%E5%8D%83%E9%87%8C%E5%91%BD%E7%A8%BF-%E9%9F%A6%E5%8D%83%E9%87%8C.pdf',
    physicalEditionIdentityMatchesR181: false,
    pdfPageCountReported: 421,
    carrierPageCountReported: null,
    pdfMetadataAccessible: true,
    targetSurfaceTextIndexedInPdf: true,
    pageScreenshotAttempted: true,
    pageScreenshotSucceeded: false,
    acquisitionFailureClass: 'PAGE_RENDER_CACHE_MISS' as const,
    targetPageVisualVerificationComplete: false,
    targetPrintedPageBound: false,
  }),
]);

export const R182_PAGE_LOCATOR_CANDIDATES = Object.freeze([
  Object.freeze({
    locatorId: 'R182-L01-SCRIBD-OCR-P125',
    sourceLabel: 'Scribd OCR/index surface',
    reportedLocatorKind: 'PAGE_MARKER_ADJACENT_TO_SECTION' as const,
    reportedLocatorValue: 125,
    targetSectionObserved: '干合而化',
    targetNonDayMasterNatalPairSurfaceObserved: true,
    targetNonDayMasterLuckSurfaceObserved: true,
    mappedToR181NlcPdfPage: false,
    mappedToR181PrintedPage: false,
    visuallyVerified: false,
  }),
  Object.freeze({
    locatorId: 'R182-L02-VRD-OCR-P183',
    sourceLabel: 'vr-d.com PDF search-index surface',
    reportedLocatorKind: 'SECTION_PAGE_LABEL' as const,
    reportedLocatorValue: 183,
    targetSectionObserved: '干合而化',
    targetNonDayMasterNatalPairSurfaceObserved: true,
    targetNonDayMasterLuckSurfaceObserved: true,
    mappedToR181NlcPdfPage: false,
    mappedToR181PrintedPage: false,
    visuallyVerified: false,
  }),
]);

export const R182_LOCATOR_RECONCILIATION = Object.freeze({
  r181NlcPdfPageCount:
    R181_QIANLI_PHYSICAL_EDITION_CANDIDATE.publicScanPageCount,
  r181CarrierPageCount:
    R181_QIANLI_PHYSICAL_EDITION_CANDIDATE.catalogCarrierPageCount,
  externalLocatorCandidateValues: Object.freeze(
    R182_PAGE_LOCATOR_CANDIDATES.map((item) => item.reportedLocatorValue),
  ),
  locatorCandidatesShareOneNumberingSystem: false,
  anyLocatorMappedToNlcPdfPage: R182_PAGE_LOCATOR_CANDIDATES.some(
    (item) => item.mappedToR181NlcPdfPage,
  ),
  anyLocatorMappedToNlcPrintedPage: R182_PAGE_LOCATOR_CANDIDATES.some(
    (item) => item.mappedToR181PrintedPage,
  ),
  locatorCandidateMayBeUsedAsPhysicalBinding: false,
});

export const R182_TARGET_SURFACE_AUDIT = Object.freeze({
  sectionTitle: R181_QIANLI_TARGET_SURFACES.sectionTitle,
  exactNonDayMasterNatalPairSurface:
    R181_QIANLI_TARGET_SURFACES.exactNonDayMasterNatalPairSurface,
  exactNonDayMasterLuckSurface:
    R181_QIANLI_TARGET_SURFACES.exactNonDayMasterLuckSurface,
  r181PhysicalEditionCandidateBound:
    R181_AUTHORITY.qianli1935PhysicalEditionCandidateBound,
  r181TargetPageVisualVerificationComplete:
    R181_AUTHORITY.targetPageVisualVerificationComplete,
  r182TargetPageVisualVerificationComplete: false,
  r182TargetPrintedPageBound: false,
  r182PrimaryPublicationTargetSurfaceBound: false,
});

export const R182_HOLD = Object.freeze({
  holdId: 'R182-H01-QIANLI-TARGET-PAGE-ACCESS-SURFACE',
  decision:
    'QIANLI_TARGET_PAGE_BINDING_BLOCKED_BY_CURRENT_ACCESS_SURFACE' as const,
  exactTargetSurfaceCandidateStillSupportedByTranscription: true,
  physicalEditionIdentityStillSupported: true,
  physicalTargetPageBindingEstablished: false,
  absenceOfBindingIsNegativeTextualEvidence: false,
  repeatedSameSurfaceSearchAuthorizedAsProgress: false,
  alternateAcquisitionSurfaceRequiredForPageBinding: true,
  nextResearchMayProceedOnIndependentRequirement: true,
});

export const R182_ADMISSION_GUARDS = Object.freeze({
  pageMarkerDoesNotEqualPrintedPageBinding: true,
  searchIndexDoesNotEqualVisualVerification: true,
  pdfPageCountDoesNotEqualCarrierPageCount: true,
  alternateEditionLocatorDoesNotMapToNlcScanByNumber: true,
  screenshotFailureDoesNotEqualTextAbsence: true,
  accessFailureDoesNotInvalidateR181TranscriptionCandidate: true,
  targetSurfaceCandidateDoesNotEqualNormativeAdmission: true,
});

export const R182_REQUIRED_FOLLOW_UP = Object.freeze([
  'ALTERNATE_ACCESS_TO_NLC_SCAN_PAGE_IMAGES',
  'DIRECT_VISUAL_BINDING_OF_QIANLI_GAN_HE_ER_HUA_PAGE',
  'PRINTED_PAGE_OR_FOLIO_MAPPING_FOR_1935_NLC_SCAN',
  'TRANSCRIPTION_TO_NLC_SCAN_COLLATION',
] as const);

export const R182_REJECTED_SHORTCUTS = Object.freeze([
  'OCR_PAGE_MARKER_EQUALS_NLC_PRINTED_PAGE',
  'ALTERNATE_PDF_PAGE_LABEL_EQUALS_NLC_PAGE',
  'SEARCH_INDEX_TEXT_EQUALS_VISUAL_WITNESS',
  'CACHE_MISS_EQUALS_TEXT_NOT_PRESENT',
  'FAILED_SCREENSHOT_EQUALS_FAILED_SOURCE',
  'REPEATED_IDENTICAL_ACCESS_ATTEMPT_EQUALS_RESEARCH_PROGRESS',
  'UNBOUND_TARGET_PAGE_EQUALS_NEGATIVE_EVIDENCE',
] as const);

export const R182_AUTHORITY = Object.freeze({
  status: 'RESEARCH_QIANLI_TARGET_PAGE_BINDING_ACCESS_HOLD' as const,
  researchOnly: true,
  physicalEditionIdentityBound: true,
  targetSurfaceCandidatePreserved: true,
  pageLocatorCandidatesBound: true,
  targetPageVisualVerificationComplete: false,
  targetPrintedPageBound: false,
  primaryPublicationTargetSurfaceBound: false,
  pairLocalNormativeAuthorityAcquired: false,
  pairLocalInteractionOutcomeEstablished: false,
  jiaJiBindingEstablished: false,
  jiaJiTransformationEstablished: false,
  jiaJiNoEffectEstablished: false,
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
