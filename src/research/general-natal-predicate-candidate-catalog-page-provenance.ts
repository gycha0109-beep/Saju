import {
  R168_AUTHORITY,
  R168_CANDIDATE_BINDINGS,
  R168_GROUPED_SURFACE_AUDIT,
  R168_SOURCE_LAYER_WITNESS_BINDING_VERSION,
} from './general-natal-predicate-candidate-source-layer-witness-binding.js';

export const R169_CATALOG_PAGE_PROVENANCE_VERSION =
  '0.1.0-research' as const;

export const R169_NLC_SCAN_WITNESS = Object.freeze({
  witnessId: 'R169-W01-NLC-ZIPING-ZHENQUAN-SCAN',
  nlcFileId: 'NLC416-11jh010455-35296',
  workTitle: '子平真詮',
  attributedEditor: '沈孝瞻編輯',
  publisherLabel: '世界圖書館[發行者]',
  publicationDateLabel: '[19--?]',
  holdingInfo: 'MG/B992.3',
  catalogPhysicalExtent: '126頁',
  digitalPdfPageCount: 287,
  commonsFileUrl:
    'https://commons.wikimedia.org/wiki/File:NLC416-11jh010455-35296_%E5%AD%90%E5%B9%B3%E7%9C%9F%E8%A9%AE.pdf',
  directPdfUrl:
    'https://upload.wikimedia.org/wikipedia/commons/f/fe/NLC416-11jh010455-35296_%E5%AD%90%E5%B9%B3%E7%9C%9F%E8%A9%AE.pdf',
  sourceInstitution: 'National Library of China',
  catalogIdentityBound: true,
  witnessIdentityBound: true,
  publisherBound: true,
  holdingIdentifierBound: true,
  exactPublicationYearEstablished: false,
  historicalCriticalEditionEstablished: false,
  editorialIndependenceEstablished: false,
});

export const R169_PRINTED_PAGE_LOCATORS = Object.freeze([
  Object.freeze({
    locatorId: 'R169-L01-SECTION-START',
    sectionTitle: '論行運成格變格',
    printedPageLabel: '四十九',
    printedPageNumber: 49,
    pdfZeroBasedIndex: 57,
    pdfOneBasedOrdinal: 58,
    scanVisualVerification: true,
    candidateSurfaces: Object.freeze([] as const),
  }),
  Object.freeze({
    locatorId: 'R169-L02-CANDIDATE-PAGE',
    sectionTitle: '論行運成格變格',
    printedPageLabel: '五十',
    printedPageNumber: 50,
    pdfZeroBasedIndex: 58,
    pdfOneBasedOrdinal: 59,
    scanVisualVerification: true,
    candidateSurfaces: Object.freeze(['命有甲', '庚辛'] as const),
  }),
]);

export interface R169CandidateProvenanceProgress {
  progressId: string;
  sourceSurface: '命有甲' | '庚辛' | '申酉';
  upstreamBindingId: string;
  sourceLayer:
    | 'SHEN_TEXT_NLC_SCAN'
    | 'XU_COMMENTARY_PUBLIC_TRANSCRIPTION';
  sourceWitnessIdentityBound: boolean;
  printedPageLocatorBound: boolean;
  sectionLocatorBound: true;
  directTextLayerWitnessBound: true;
  exactPublicationYearEstablished: false;
  historicalCriticalEditionBound: false;
  independentHistoricalWitnessBound: false;
  minimalitySufficiencyEvidenceBound: false;
  predicateContractStudyAdmission: 'BLOCKED';
  semanticPredicateEstablished: false;
  matchingSufficiencyEstablished: false;
  outcomeSufficiencyEstablished: false;
  settlementEstablished: false;
  executableResolverAuthorized: false;
  interpretationClaimEmissionAuthorized: false;
  productionAuthorityPromoted: false;
}

const jia = R168_CANDIDATE_BINDINGS.find((item) => item.sourceSurface === '命有甲');
const gengXin = R168_CANDIDATE_BINDINGS.find(
  (item) => item.sourceSurface === '庚辛',
);
const shenYou = R168_CANDIDATE_BINDINGS.find(
  (item) => item.sourceSurface === '申酉',
);

if (jia === undefined || gengXin === undefined || shenYou === undefined) {
  throw new Error('R169 missing R168 candidate binding');
}

const progress = (
  value: Pick<
    R169CandidateProvenanceProgress,
    | 'progressId'
    | 'sourceSurface'
    | 'upstreamBindingId'
    | 'sourceLayer'
    | 'sourceWitnessIdentityBound'
    | 'printedPageLocatorBound'
  >,
): R169CandidateProvenanceProgress =>
  Object.freeze({
    ...value,
    sectionLocatorBound: true,
    directTextLayerWitnessBound: true,
    exactPublicationYearEstablished: false,
    historicalCriticalEditionBound: false,
    independentHistoricalWitnessBound: false,
    minimalitySufficiencyEvidenceBound: false,
    predicateContractStudyAdmission: 'BLOCKED',
    semanticPredicateEstablished: false,
    matchingSufficiencyEstablished: false,
    outcomeSufficiencyEstablished: false,
    settlementEstablished: false,
    executableResolverAuthorized: false,
    interpretationClaimEmissionAuthorized: false,
    productionAuthorityPromoted: false,
  });

export const R169_CANDIDATE_PROVENANCE_PROGRESS: readonly R169CandidateProvenanceProgress[] =
  Object.freeze([
    progress({
      progressId: 'R169-P01-JIA-NLC-P50',
      sourceSurface: '命有甲',
      upstreamBindingId: jia.bindingId,
      sourceLayer: 'SHEN_TEXT_NLC_SCAN',
      sourceWitnessIdentityBound: true,
      printedPageLocatorBound: true,
    }),
    progress({
      progressId: 'R169-P02-GENGXIN-NLC-P50',
      sourceSurface: '庚辛',
      upstreamBindingId: gengXin.bindingId,
      sourceLayer: 'SHEN_TEXT_NLC_SCAN',
      sourceWitnessIdentityBound: true,
      printedPageLocatorBound: true,
    }),
    progress({
      progressId: 'R169-P03-SHENYOU-XU-COMMENTARY',
      sourceSurface: '申酉',
      upstreamBindingId: shenYou.bindingId,
      sourceLayer: 'XU_COMMENTARY_PUBLIC_TRANSCRIPTION',
      sourceWitnessIdentityBound: false,
      printedPageLocatorBound: false,
    }),
  ]);

export const R169_NLC_SCAN_SURFACE_AUDIT = Object.freeze({
  sectionStartPrintedPage: 49,
  candidatePrintedPage: 50,
  jiaSurfaceObservedOnCandidatePage: true,
  gengXinSurfaceObservedOnCandidatePage: true,
  shenYouSurfaceObservedOnCandidatePage: false,
  shenYouStillCommentaryLayerOnly: true,
  breakCaseJiaOmissionStillNotAbsence: true,
  scanLocatorDistinctFromSemanticSufficiency: true,
});

export const R169_INDEPENDENT_EDITION_CANDIDATE = Object.freeze({
  candidateId: 'R169-EDITION-CANDIDATE-1926-WENMING',
  nlcFileId: 'NLC416-13jh002326-46443',
  workTitle: '淵海子平 子平真詮',
  volumeLabel: '第2卷',
  editorLabel: '秦慎安校勘',
  publisherLabel: '文明書局[發行者]',
  publicationDateLabel: '民國十五年[1926]',
  holdingInfo: 'MG/B992.3/33',
  chapterListedInCatalogDescription: true,
  targetCandidateSurfaceVisuallyVerified: false,
  targetPrintedPageLocated: false,
  independentHistoricalWitnessBound: false,
  mayBeUsedAsCorroborationBeforeSurfaceVerification: false,
});

export const R169_REMAINING_GAPS = Object.freeze([
  'CRITICAL_EDITION_STATUS',
  'EXACT_PUBLICATION_YEAR_FOR_R169_W01',
  'INDEPENDENT_HISTORICAL_WITNESS_SURFACE_VERIFICATION',
  'R169_EDITION_CANDIDATE_1926_TARGET_PAGE_LOCATION',
  'MINIMALITY_SUFFICIENCY_EVIDENCE',
  'SHENYOU_SHEN_TEXT_LAYER_WITNESS_IF_ANY',
] as const);

export const R169_REJECTED_SHORTCUTS = Object.freeze([
  'NLC_FILE_ID_EQUALS_CRITICAL_EDITION',
  'KNOWN_PUBLISHER_WITH_UNKNOWN_YEAR_EQUALS_EXACT_EDITION_DATE',
  'PRINTED_PAGE_LOCATOR_EQUALS_SEMANTIC_PREDICATE',
  'PRINTED_PAGE_LOCATOR_EQUALS_SUFFICIENCY',
  'PDF_PAGE_ORDINAL_EQUALS_PRINTED_PAGE_NUMBER',
  'CATALOG_LISTED_CHAPTER_EQUALS_TARGET_SURFACE_VERIFIED',
  '1926_EDITION_METADATA_EQUALS_INDEPENDENT_WITNESS',
  'XU_COMMENTARY_SHENYOU_EQUALS_SHEN_TEXT_SHENYOU',
  'JIA_PAGE_WITNESS_EQUALS_RESCUE_MINIMALITY',
  'GENGXIN_PAGE_WITNESS_EQUALS_COUNTERFORCE_SUFFICIENCY',
  'PROVENANCE_PROGRESS_EQUALS_EXECUTABLE_RULE',
  'PROVENANCE_PROGRESS_EQUALS_INTERPRETATION_CLAIM_AUTHORITY',
] as const);

export const R169_SUMMARY = Object.freeze({
  candidateCount: R169_CANDIDATE_PROVENANCE_PROGRESS.length,
  nlcScanIdentityBoundCandidateCount: R169_CANDIDATE_PROVENANCE_PROGRESS.filter(
    (item) => item.sourceWitnessIdentityBound,
  ).length,
  printedPageLocatorBoundCandidateCount: R169_CANDIDATE_PROVENANCE_PROGRESS.filter(
    (item) => item.printedPageLocatorBound,
  ).length,
  independentHistoricalWitnessBoundCount:
    R169_CANDIDATE_PROVENANCE_PROGRESS.filter(
      (item) => item.independentHistoricalWitnessBound,
    ).length,
  admittedCandidateCount: R169_CANDIDATE_PROVENANCE_PROGRESS.filter(
    (item) => item.predicateContractStudyAdmission !== 'BLOCKED',
  ).length,
  remainingGapCount: R169_REMAINING_GAPS.length,
});

export const R169_UPSTREAM_BINDINGS = Object.freeze({
  r168: {
    version: R168_SOURCE_LAYER_WITNESS_BINDING_VERSION,
    candidateCount: R168_CANDIDATE_BINDINGS.length,
    sourceLayerDistinctionEstablished:
      R168_AUTHORITY.sourceLayerDistinctionEstablished,
    shenYouOriginalTextSurfaceObserved:
      R168_GROUPED_SURFACE_AUDIT.shenYouOriginalTextSurfaceObserved,
    predicateContractStudyReady: R168_AUTHORITY.predicateContractStudyReady,
  },
});

export const R169_AUTHORITY = Object.freeze({
  status: 'RESEARCH_CATALOG_PRINTED_PAGE_PROVENANCE_PARTIAL_COMPLETE' as const,
  researchOnly: true,
  nlcCatalogWitnessIdentityBound: true,
  nlcHoldingIdentifierBound: true,
  publisherLabelBound: true,
  exactPublicationYearEstablished: false,
  sectionStartPrintedPageBound: true,
  candidatePrintedPageBound: true,
  jiaPrintedPageWitnessBound: true,
  gengXinPrintedPageWitnessBound: true,
  shenYouPrintedPageWitnessBound: false,
  historicalCriticalEditionBound: false,
  independentHistoricalWitnessBound: false,
  independentEditionCandidateRecorded: true,
  independentEditionCandidateSurfaceVerified: false,
  predicateContractStudyReady: false,
  semanticPredicateEstablished: false,
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
