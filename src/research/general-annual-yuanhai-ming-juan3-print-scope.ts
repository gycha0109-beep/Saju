import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  buildYuanHaiSixPillarDigitalCase,
  YUANHAI_DIGITAL_WITNESSES,
} from './general-annual-yuanhai-six-pillar-witness.js';

/**
 * Bibliographic location is NOT a leaf-level facsimile collation.
 * The referenced NLC physical book #2 contains printed juan 3. Two
 * further text witnesses are derived from print/normalized transcripts.
 * Re-inspection of user-supplied NLC PDF p.11 reads 未 (two
 * horizontal strokes), matching the NLC OCR. The previous p.11 木 reading
 * was an erroneous first-pass visual conclusion; it is explicitly superseded.
 * The hour pillar visually resembles 己巳 but is not independently
 * double-checked. NCL Taiwan PDF p.55 has now been visually compared
 * with NLC China p.11; a similar column setting is visible. Two PDF
 * facsimiles do NOT establish two independent woodblock editions,
 * nor a universal annual clash resolver. User-supplied Chongzhen (1634)
 * NLC book two PDF p.19 LEFT folio now directly reads 亥卯木合起羊刃.
 * It has a demonstrably different focal print layout from the Wanli
 * 未 reading (but archetype, genealogy and semantic precedence remain open).

 */
export const YUANHAI_MING_JUAN3_BIBLIOGRAPHIC_VERSION =
  'sa7d-yuanhai-parallel-xiji-juan-shidian-1582-target-ocr-v29' as const;

export const YUANHAI_NLC_PHYSICAL_BOOKS = Object.freeze([
  Object.freeze({
    id: 'NLC892-2642-210287',
    pdfFile: 'NLC892-2642-210287 刻京臺增補淵海子平大全 第1冊.pdf' as const,
    commonsUrl:
      'https://commons.wikimedia.org/wiki/File:NLC892-2642-210287_刻京臺增補淵海子平大全_第1冊.pdf' as const,
    physicalBook: 1 as const,
    printedJuanContained: Object.freeze([1, 2] as const),
    pdfPageCount: 48 as const,
    relevantTargetJuanThreePresent: false as const,
    suitableForTargetGlyphInspection: false as const,
  }),
  Object.freeze({
    id: 'NLC892-2642-210288',
    pdfFile: 'NLC892-2642-210288 刻京臺增補淵海子平大全 第2冊.pdf' as const,
    commonsUrl:
      'https://commons.wikimedia.org/wiki/File:NLC892-2642-210288_刻京臺增補淵海子平大全_第2冊.pdf' as const,
    originalPdfUrl:
      'https://upload.wikimedia.org/wikipedia/commons/e/e9/NLC892-2642-210288_刻京臺增補淵海子平大全_第2冊.pdf' as const,
    physicalBook: 2 as const,
    printedJuanContained: Object.freeze([3] as const),
    pdfPageCount: 30 as const,
    relevantTargetJuanThreePresent: true as const,
    suitableForTargetGlyphInspection: true as const,
    editionDateCatalogRange: '明萬曆 (1573–1620)' as const,
    targetLeafPageOneBasedConfirmed: 11 as const,
    targetPrintColumnConfirmed: 'right-hand folio, column containing 運行辛亥亥卯未合起羊刃' as const,
    targetPrintedUnOrMuGlyphConfirmed: '未' as const,
  }),
] as const);

export const YUANHAI_JUAN3_ADDITIONAL_DIGITAL_WITNESSES = Object.freeze([
  Object.freeze({
    id: 'YS-NLC8922642210287-BOOK2-JUAN3-OCR',
    parentPrintedBookId: 'NLC892-2642-210288' as const,
    url: 'https://www.shidianguji.com/zh/book/NGJ8922642210287/chapter/1lnh0qpidcm57' as const,
    printedJuan: 3 as const,
    sectionHeading: '論陽刃' as const,
    observedHourPillar: '巳巳' as const,
    observedCombinationPhrase: '亥卯未合起羊刃' as const,
    observedClashPhrase: '辛酉年辛金又旺於酉' as const,
    witnessTier: 'unverified_print_derived_OCR' as const,
    focalPrintImagePageAndColumnVerified: false as const,
    actualPrintedHourStemVerified: false as const,
    actualPrintedTripleLastGlyphVerified: false as const,
    physicallyIndependentFromOtherScansEstablished: false as const,
  }),
  Object.freeze({
    id: 'YS-SDZJ0626-EDITED-JUAN3-TRANSCRIPT',
    parentPrintedBookId: null,
    url: 'https://www.shidianguji.com/zh/book/SDZJ0626/chapter/1lctut1kn9cti' as const,
    printedJuan: 3 as const,
    sectionHeading: '論陽刃' as const,
    observedHourPillar: '己巳' as const,
    observedCombinationPhrase: '亥卯未合起羊刃' as const,
    observedClashPhrase: '辛酉年辛金又旺於酉' as const,
    witnessTier: 'edited_digital_transcription' as const,
    focalPrintImagePageAndColumnVerified: false as const,
    actualPrintedHourStemVerified: false as const,
    actualPrintedTripleLastGlyphVerified: false as const,
    physicallyIndependentFromOtherScansEstablished: false as const,
  }),
]);

/** A second directly inspected scan, not an independently established edition. */
export const YUANHAI_NCL_TAIWAN_PRINT_SCAN = Object.freeze({
  id: 'NCL-06593' as const,
  originalPdfUrl: 'https://commons.wikimedia.org/wiki/File:NCL-06593_刻京臺增補淵海子平大全.pdf' as const,
  pdfSha256: '9e95627dd6811e6f3daff83c8413dd32a748362f09591be1dadcea1d2be277a6' as const,
  pdfPageCount: 160 as const,
  printedJuan: 3 as const,
  pdfPageOneBased: 55 as const,
  referenceNlcPdfPageOneBased: 11 as const,
  pageRasterWidthPx: 3185 as const,
  pageRasterHeightPx: 3139 as const,
  location: 'right-hand folio immediately before 論刑合' as const,
  directVisualTripleGlyphReading: '未' as const,
  contextualPhrase: '運行辛亥亥卯未合起羊刃' as const,
  hourPillarVisualCandidate: '己巳' as const,
  hourStemIndependentlyAdjudicated: false as const,
  matchingColumnArrangementObserved: true as const,
  distinctWoodblockEditionEstablished: false as const,
  independentWitnessCredit: 0 as const,
  origin: 'user_provided_full_pdf_manual_visual_comparison' as const,
} as const);

/**
 * Origin of the contradictory 木 OCR is now bibliographically located:
 * a 1634 Chongzhen imprint, printed juan two in physical book two.
 * The full facsimile is now directly inspected: printed juan two in physical
 * book two, PDF p.19 left folio. The locus has 木 in 亥卯木合起羊刃.
 * Divergent column typography/layout against the Wanli p.11 print is observed.
 * This proves a local print variant, not an archetypal reading or a fate rule.
 */
export const YUANHAI_CHONGZHEN_WOOD_OCR_PRINT_LOCATOR = Object.freeze({
  ocrBookCollectionId: 'NGJ892411999032112149610' as const,
  originalOcrUrl: 'https://www.shidianguji.com/zh/book/NGJ892411999032112149610/chapter/1lqsbrh19ji9f' as const,
  observedOcrPhrase: '亥卯木合起羊刃' as const,
  title: '新刊合併官板音義評注淵海子平' as const,
  printing: '余氏善成堂 明崇禎七年 (1634)' as const,
  scannedPhysicalBookId: 'NLC892-411999032112-149611' as const,
  notTargetFirstBookId: 'NLC892-411999032112-149610' as const,
  pdfUrl: 'https://commons.wikimedia.org/wiki/File:NLC892-411999032112-149611_新刊合併官板音義評注淵海子平_第2冊.pdf' as const,
  physicalBookNumber: 2 as const,
  printedJuan: 2 as const,
  scanPdfPageCount: 36 as const,
  targetPdfPageOneBased: 19 as const,
  targetColumn: 'left-hand folio, vertical column containing 亥卯木合起羊刃' as const,
  scannedPageImageWidthPx: 4081 as const,
  scannedPageImageHeightPx: 3563 as const,
  originalPdfSha256: '43b9444f485422618353dbaf21815384cab815418cf0994cfa5e72f0f4f5b23f' as const,
  originalPrintGlyph: '木' as const,
  directlyInspectedPrintPhrase: '亥卯木合起羊刃' as const,
  hourPillarVisualCandidate: '己巳' as const,
  hourFirstGlyphFinallyAdjudicated: false as const,
  directOriginalPrintInspectionCompleted: true as const,
  distinctFocalTypesettingObserved: true as const,
  distinctFocalWoodblocksEstablished: true as const,
  textualGenealogyIndependenceEstablished: false as const,
  independentCollationCredit: 1 as const,
  evidenceTier: 'facsimile_directly_inspected_distinct_focal_setting' as const,
} as const);

/**
 * Textual criticism and calendrical consistency are separate from material
 * glyph readings and from historical prediction authority.
 *
 * The 1600 printed 未 is chosen only as a transparent provisional *locus*
 * working text: older among the inspected print settings and explicitly
 * naming the natal year branch in 亥卯未. No earliest-archetype claim.
 *
 * For a 甲日, traditional 五鼠遁 yields 甲子 → 乙丑 → 丙寅 → 丁卯
 * → 戊辰 → 己巳. An OCR `巳巳` cannot be a valid stem/branch pair.
 * Mechanical admissibility is NOT independent palaeographic confirmation
 * of the original hour glyph or historical authenticity of the horoscope.
 */
export const YUANHAI_PRINT_VARIANT_CRITICAL_ASSESSMENT = Object.freeze({
  version: 'saju-yuanhai-text-critical-assessment-v1' as const,
  observedPrintVariants: Object.freeze([
    Object.freeze({edition: 'wanli_1600' as const, pdfPage: 11 as const, glyph: '未' as const}),
    Object.freeze({edition: 'chongzhen_1634' as const, pdfPage: 19 as const, glyph: '木' as const}),
  ] as const),
  prefaceHistoricalClaim: '1634_preface_claims_merger_and_correction_of_earlier_books' as const,
  prefaceClaimIndependentVerification: false as const,
  laterEditionPracticesSilentEmendations: true as const,
  laterEditedTextAsIndependentPrintWitness: false as const,
  selectedResearchWorkingBase: 'wanli_1600_printed_亥卯未' as const,
  workingBasePurpose: 'explicit_locus_specific_annotated_reading_only' as const,
  workingBaseReason: 'earlier_of_inspected_printings_and_explicit_hai_mao_wei_branch_set' as const,
  workingBaseIsArchetype: false as const,
  reconstructedArchetypalGlyph: null,
  variantCausation: null,
  chongzhenWoodReadingToBeSilentlyNormalized: false as const,
  hourPillarFromTranscripts: Object.freeze(['己巳','巳巳'] as const),
  dayPillarForHourRule: '甲子' as const,
  assumedHourBranch: '巳' as const,
  fiveRatsStemBranchSequence: Object.freeze([
    '甲子','乙丑','丙寅','丁卯','戊辰','己巳',
  ] as const),
  mechanicallyValidHourPillar: '己巳' as const,
  anomalousOcrHourPillar: '巳巳' as const,
  anomalousOcrReason: 'first_character_is_an_earthly_branch_not_a_heavenly_stem' as const,
  originalHourFirstGlyphPalaeographicallyAdjudicated: false as const,
  historicalPersonBirthPillarsAuthenticated: false as const,
  permissionToPromoteModernAnnualSemantics: false as const,
  permissionToAutoCorrectPrintedWitness: false as const,
} as const);

/**
 * Pre-1600 witness search audit. These are bibliographic/research leads,
 * NOT print collations and not even verified carriers of the focal anecdote.
 * A 1253 preface date is not a date of any surviving Korean scan.
 */
export const YUANHAI_PREWANLI_SOURCE_ACCESS_AUDIT = Object.freeze({
  version: 'yuanhai-prewanli-source-access-audit-v1' as const,
  jiajingCompilation1548: Object.freeze({
    attributedCompilationYear: 1548 as const,
    attributedCompiler: '楊淙' as const,
    secondaryBibliographyUrl: 'https://www.donglishuzhai.net/books/111.html' as const,
    modernBibliographicDescriptionUrl: 'https://books.google.com/books?id=pWFeAAAAIAAJ' as const,
    survivingOriginalFacsimileIdentified: false as const,
    verifiedHoldingIdentifier: null,
    targetPassagePrinted: null,
    targetPassagePage: null,
    originalPrintGlyph: null,
    independentPrintWitnessCredit: 0 as const,
    sourceTier: 'secondary_bibliographic_attribution_no_original_facsimile' as const,
  }),
  koreanEarlierSourceTradition: Object.freeze({
    title: '子平三命通變淵源' as const,
    prefaceDateClaim: '寶祐元年(1253)' as const,
    prefaceDateNotSurvivingManuscriptDate: true as const,
    peerReviewedStudyUrl: 'https://www.kci.go.kr/kciportal/landing/article.kci?arti_id=ART001708343' as const,
    koreanBibliographicSurveyUrl: 'https://pungseok.com/wp-content/uploads/2018/08/%EC%A1%B0%EC%84%A0%EC%8B%9C%EB%8C%80-%EC%9D%8C%EC%96%91%EA%B3%BC%EC%97%90-%EA%B4%80%ED%95%9C-%EC%97%B0%EA%B5%AC.pdf' as const,
    reportedWoodblockHolding: 'National Library of Korea' as const,
    reportedManuscriptHolding: 'Kyujanggak, Seoul National University' as const,
    focalYuanhaiAnecdotePresent: null,
    matchesJiajingCompilation1548: false as const,
    targetPhraseRead: null,
    independentPrintWitnessCredit: 0 as const,
    sourceTier: 'related_earlier_work_holdings_not_focal_passage_verified' as const,
  }),
  searchConclusion: 'no_pre1600_focal_locus_directly_collated' as const,
  originalGlyphReconstructionAllowed: false as const,
  retainWanliLocusWorkingBaseOnly: true as const,
  pre1600IndependentPrintWitnessesAdded: 0 as const,
} as const);

/**
 * Korean source-bearing scholarship vs actual pre-1600 printed folio:
 * a 2019 dissertation quotes the 日刃/陽刃 section in 子平三命通變淵源,
 * but DOES NOT verify the specific 癸未乙卯甲子己巳 anecdote.
 * Separately, a catalogued 1518 三車一覽 derivative is not the 1548 imprint
 * or the same work as the two-juan original. Its target leaves are unread.
 */
export const YUANHAI_KOREAN_EARLIER_YANGREN_RESEARCH = Object.freeze({
  version: 'saju-earlier-yangren-scholarly-excerpt-v1' as const,
  koreanOriginalWoodblockScholarlyWitness: Object.freeze({
    originalWork: '子平三命通變淵源' as const,
    originalWorkAlternateTitle: '子平淵源' as const,
    repositoryReported: 'National Library of Korea' as const,
    originalPrintMetadata: 'two_juan_one_book_10_lines_17_characters' as const,
    scholarlyStudy: '김면수 (2019) 명리원전 子平三命通變淵源 연구' as const,
    studyCatalogUrl: 'https://dl.nanet.go.kr/detail/KDMT1201930296' as const,
    studyExtractUrl: 'https://www.scribd.com/document/1061771789/子平三命通變淵源연구' as const,
    studySection: '卷上 看命入式 日刃·陽刃' as const,
    quotedYangrenClause: '獨陽刃以時言之，四柱中不要入財鄕，怕衝陽刃' as const,
    quotedClauseEvidenceTier: 'academic_transcription_attributed_to_national_library_print' as const,
    examinedScholarlyQuotationContainsFullFocalAnecdote: false as const,
    originalPrintedLeafDirectlyOpened: false as const,
    originalPrintedPageAndColumn: null,
    focalAnecdotePresentInOriginal: null,
    focalCaseGlyph: null,
    doesScholarlyExampleJiSiProveFocalFourPillars: false as const,
    independentFocalPrintWitnessCredit: 0 as const,
  }),
  earlierSeparateCommentary1518: Object.freeze({
    catalogTitle: '新編三車一覽子平淵源註解' as const,
    institutionalHolding: 'Korea University Library' as const,
    catalogRecordUpper: 'https://dcollection.korea.ac.kr/srch/srchDetail/000000134095' as const,
    catalogRecordLower: 'https://dcollection.korea.ac.kr/srch/srchDetail/000000134097' as const,
    catalogControlNumber: '000000724230' as const,
    reportedHistoricalPrintingYear: 1518 as const,
    recordedType: '乙亥字' as const,
    volumes: 'three_juan_three_books' as const,
    reportedCompilers: '徐大昇 撰次 / 逸人 集解 / 熊上恩 訂刊' as const,
    sameAs1548YangCongEdition: false as const,
    sameAsTwoJuanKoreanOriginal: false as const,
    particularSurvivingCopyPrintDateVerified: false as const,
    focalYangrenAnecdotePresent: null,
    originalTargetLeafOpened: false as const,
    originalPrintGlyph: null,
    independentFocalPrintWitnessCredit: 0 as const,
    evidenceTier: 'catalogued_earlier_separate_commentary_target_folio_unchecked' as const,
  }),
  earlierYangrenTheoryTraceableInScholarlyQuotation: true as const,
  preciseCaseHasPre1600VerifiedProvenance: false as const,
  earlyPrintGlyphReconstructionAuthorized: false as const,
  originalFocalPrintWitnessesAdded: 0 as const,
} as const);

/**
 * Institutional access audit: historical archival record of stored plates
 * != collation of any surviving National Library of Korea imprint.
 * Korea University catalog lists selected volumes; an indexed TOC and
 * "full text" label are not access to a target folio.
 */
export const YUANHAI_KOREAN_PRIMARY_HOLDINGS_ACCESS_AUDIT = Object.freeze({
  version: 'saju-korean-primary-plate-and-locus-access-v1' as const,
  joseonArchivePrimaryRecord: Object.freeze({
    title: '書雲觀志' as const,
    location: '卷四 書器' as const,
    governmentTranscriptionUrl: 'https://db.history.go.kr/joseon/item/level.do?levelId=jlawb_650_0050_0010' as const,
    recordId: 'jlawb_650_0050_0010' as const,
    recordedWorkTitle: '徐子平三命通變淵源' as const,
    recordedVolumeCount: 2 as const,
    recordedAttributedAuthor: '宋徐大升' as const,
    archivedPlateHoldingStatement: '本監藏板' as const,
    originalBookPagesDigitallyInspected: false as const,
    provesPresentNationalLibraryCopyFromSamePlates: false as const,
    provesFocalAnecdotePrinted: false as const,
    originalTargetGlyph: null,
    printWitnessCredit: 0 as const,
    evidenceTier: 'historical_institutional_plate_inventory_not_focal_leaf' as const,
  }),
  koreaUniversityCatalogAccess: Object.freeze({
    title: '新編三車一覽子平淵源註解' as const,
    controlNumber: '000000724230' as const,
    cataloguedVolumeCount: 3 as const,
    indexedCatalogVolumeTian: Object.freeze({
      url: 'https://dcollection.korea.ac.kr/srch/srchDetail/000000134095' as const,
      volume: '天' as const,
      registrationNumber: '461225367' as const,
      shelfMark: '화산 貴135 1' as const,
      tocContainsZhengZhenLun: true as const,
      tocContainsXingHeGe: true as const,
      targetYangrenFolioDirectlyOpened: false as const,
    }),
    indexedCatalogVolumeRen: Object.freeze({
      url: 'https://dcollection.korea.ac.kr/srch/srchDetail/000000134097' as const,
      volume: '人' as const,
      registrationNumber: '461225369' as const,
      shelfMark: '화산 貴135 3' as const,
      tocOpening: '繼善篇' as const,
      targetYangrenFolioDirectlyOpened: false as const,
    }),
    catalogCalendarLabelVerbatim: '中宗15(1518)' as const,
    historicalImprintDateFromSecondarySource: '正德十三年(1518)' as const,
    compositeCatalogDatingInternallyInconsistent: true as const,
    physicalSurvivingCopyDatingAuthenticated: false as const,
    targetAncestralFocalCasePresence: null,
    originalTargetGlyph: null,
    printWitnessCredit: 0 as const,
  }),
  koreanNationalLibraryTargetFolioOpened: false as const,
  kyujanggakManuscriptTargetFolioOpened: false as const,
  koreaUniversityTargetFolioOpened: false as const,
  firstPersonOriginalFocalCaseNegativeClaimAuthorized: false as const,
  independentlyInspectedFocalPrintsAdded: 0 as const,
  preWanliGlyphAdjudicationAuthorized: false as const,
} as const);

/**
 * Public KORCIS provides bibliography/original-availability fields.
 * Its catalog search XML was not parsed in this inspection environment.
 * A search service and filename-only third-party scan are acquisition routes,
 * never automatically an identified holding, inspected page or print witness.
 */
export const YUANHAI_KOREAN_FACSIMILE_RETRIEVAL_ROUTE = Object.freeze({
  version: 'saju-korean-original-facsimile-retrieval-v1' as const,
  institutionalCatalog: Object.freeze({
    name: 'KORCIS' as const,
    publicSimpleSearchUrl: 'https://www.nl.go.kr/korcis/search/simple.do' as const,
    publicApiGuideUrl: 'https://www.nl.go.kr/korcis/openAPIGuide/contents.do' as const,
    officialFaqUrl: 'https://www.nl.go.kr/korcis/english/faq/contents.do' as const,
    publicSearchAndOriginalImageViewingNoLoginRequired: true as const,
    bibliographicApiResponse: 'application/xml' as const,
    apiRequiredSearchParams: Object.freeze(['search_field','search_value','page','display'] as const),
    apiRecordFields: Object.freeze(['REC_KEY','TITLE','LIB_NAME'] as const),
    apiHoldingFields: Object.freeze(['CALL_NO','ORIGINAL_YN','LIB_CODE'] as const),
    exactTargetCatalogRecordKey: null,
    exactTargetHoldingCallNumber: null,
    originalAvailabilityVerifiedForTarget: null,
    originalImageUrlVerifiedForTarget: null,
    originalTargetFolioDirectlyViewed: false as const,
    queriedXmlResponseSuccessfullyParsed: false as const,
  }),
  attestedNameFormsForBroadCatalogSearch: Object.freeze([
    '子平淵源',
    '子平三命通變淵源',
    '通變淵源',
    '徐子平三命通變淵源',
    '子平三命通辯淵源',
    '徐子平',
  ] as const),
  coverTitleDifferentFromInternalTitleAttestedByScholarlyStudy: true as const,
  ambiguousXuZipingShortTitleNeedsAuthorAndVolumeDisambiguation: true as const,
  relatedMaterialNotYetProvenOriginal: Object.freeze({
    sourceListingUrl: 'https://www.linglonghui.com/?dir=%2F%E5%85%AB%E5%AD%97%E7%94%B5%E5%AD%90%E4%B9%A6%E5%90%88%E9%9B%86&tag=34&ts=34' as const,
    listedScanFilename: '徐大升[宋] - 子平三命通变渊源（手抄扫描版）.pdf' as const,
    listedEditedFilename: '徐大升[宋] - 子平三命通变渊源（三命堂尤武伟校）.pdf' as const,
    listedScanApproximateBytes: '11.35MB' as const,
    actualFileBytesObtained: false as const,
    matchesNlkOrKyujanggakHoldingVerified: false as const,
    originalTargetFolioAndGlyphVerified: false as const,
    originalCasePresence: null,
    independentPrintWitnessCredit: 0 as const,
  }),
  externalInstitutionOriginalFolioRetrieved: false as const,
  historicalFocalCasePreWanliPresence: null,
  newlyAuthorizedIndependentWitnesses: 0 as const,
  archetypeDeterminationAuthorized: false as const,
  modernAnnualSemanticsAuthorized: false as const,
} as const);

/**
 * A newly found contemporary exegetical source QUOTES an alleged
 * early 子平三命通變淵源 '日刃/陽刃' segment with explicit 甲日...忌酉運
 * and 不喜會合. Unlike the 2019 academic excerpt, this is only a modern
 * secondary quotation, NOT a first-person collation of a printed page.
 * The overlap with 甲子-day/辛酉-year in a separate Ming example
 * cannot establish that the earlier exemplar contained that example
 * or which of 合/沖 "wins".
 */
export const YUANHAI_EARLIER_YANGREN_DERIVED_CLAUSE_COMPARISON = Object.freeze({
  version: 'saju-yangren-attributed-clause-collation-v1' as const,
  academicallyCitedEarlySource: Object.freeze({
    sourceWork: '子平三命通變淵源' as const,
    citedSection: '卷上 看命入式 日刃·陽刃' as const,
    citationUrl: 'https://www.scribd.com/document/1061771789/子平三命通變淵源연구' as const,
    citedShortClause: '怕衝陽刃' as const,
    sourceTier: '2019_research_academic_transcription' as const,
    directlyInspectedOriginalBookFolio: false as const,
    containsSpecificMingFourPillarAnecdoteInCitedExtract: false as const,
    focalPrintedWitnessCredit: 0 as const,
  }),
  modernExegeticalAttributedQuotation: Object.freeze({
    commentaryTitle: '子平遗风系列之格局大义' as const,
    section: '第十二节论日刃、阳刃' as const,
    sourceUrl: 'https://www.scribd.com/document/978363995/凌雪衣-青衿名士-子平遗风系列之格局大义140页-0' as const,
    attributedSourceWork: '子平三命通變淵源' as const,
    exampleQuotedJoinDisapproval: '不喜会合' as const,
    exampleQuotedJiaDayYouLuckAversion: '忌酉运' as const,
    generalJiaDayAndYouLuckOverlapWithMingExample: true as const,
    specificNatalPillarsQuoteFoundInExaminedSegment: false as const,
    independentEarlyPrintedFolioVerified: false as const,
    verifiedOriginalGlyphWeiOrWood: null,
    modernCommentaryContainsIndependentPrintAuthority: false as const,
    focalPrintedWitnessCredit: 0 as const,
    sourceTier: 'modern_exegetical_attributed_quotation_no_print' as const,
  }),
  sameHistoricalAnecdoteAcrossSourcesEstablished: false as const,
  earlierPrintedPassageNegativelyCheckedForAnecdote: false as const,
  generalClashVersusCombinationPriorityEstablished: false as const,
  personalAnnualOutcomeAuthorized: false as const,
  extraEarlyPrintedLociVerified: 0 as const,
} as const);

/**
 * The first actionable candidate NLK call mark found in the reference
 * list of a separate Korean academic thesis. The printed citation is NOT
 * the institution's MARC/holding record and cannot confirm the scan URI.
 *
 * This is not a new copy/witness and has zero textual collation credit.
 */
export const YUANHAI_NLK_CANDIDATE_CALLMARK_FROM_ACADEMIC_BIBLIOGRAPHY = Object.freeze({
  version: 'nlk-callmark-secondary-reference-v1' as const,
  canonicalWorkTitle: '子平三命通變淵源' as const,
  bibliographyCallmarkVerbatim: '한古朝19-104' as const,
  owningInstitutionAttributedInCitation: '국립중앙도서관' as const,
  linkedAcademicWorkTitle: '『命理約言』의 知命體系 硏究' as const,
  citingBibliographyEntry: 24 as const,
  sourceUrl: 'https://www.riss.kr/search/detail/DetailView.do?control_no=d08ee38324aa6aeaffe0bdc3ef48d419&p_mat_type=be54d9b8bc7cdb09' as const,
  sourceTier: 'secondary_academic_reference_list_holding_callmark_candidate' as const,
  institutionMARCRecordConfirmed: false as const,
  institutionKorcisRecKey: null,
  originalImageStableUrl: null,
  callmarkMatchedAgainstCurrentInstitutionHoldings: false as const,
  originalTargetFolioOpened: false as const,
  actualCaseInPrintEstablished: null,
  printedEarlyGlyph: null,
  independentPrintedFocalWitnessCredit: 0 as const,
  nextAcquisitionAction: 'cross_check_callmark_with_nlk_catalog_and_request_juan_shang_kanmingrushi_riyangren_folio' as const,
} as const);

/**
 * Non-institutional no-contact source acquisition paths.
 * URLs and passwords are public leads, NOT accessed files, facsimile
 * provenance, proof of complete leaves, or a new textual witness.
 * The 2017 Japanese-copy appendix is an editorial reproduction claim;
 * without checking its target page, no literal printed glyph is known.
 */
export const YUANHAI_NO_CONTACT_EARLY_PRINT_ACCESS_AUDIT = Object.freeze({
  version: 'yuanhai-free-mirror-japan-appendix-access-v1' as const,
  koreaUniversityDerivativePhotoMirror: Object.freeze({
    targetWork: '新編三車一覽子平淵源註解' as const,
    institutionOriginalReference: 'Korea University Library, three books, 乙亥字' as const,
    forumUrl: 'https://www.shuge.org/meet/topic/142530/' as const,
    publicCloudShareUrl: 'https://pan.baidu.com/s/1wuAfsAvyF93-U9YVGib6Cw?pwd=YYDS' as const,
    publishedShareAccessCode: 'YYDS' as const,
    otherSharesDiscussedOnForum: true as const,
    somePagesReportedMissingByForumParticipants: true as const,
    provenanceOfSharedImagesAuthenticated: false as const,
    publicCloudShareFileBytesObtained: false as const,
    scannedSpecificYangrenSection: false as const,
    inspectedFocalPillars: null,
    directFocalPrintWitnessCredit: 0 as const,
    accessClass: 'public_community_cloud_share_requires_access_verification' as const,
  }),
  japaneseRepositoryReportedIn2017Edition: Object.freeze({
    reportedOriginalWork: '子平三命通變淵源' as const,
    namedHolding: '靜嘉堂文庫' as const,
    editorPublicationDate: '2017-07-08' as const,
    modernBookTitle: '三車一覽子平淵源註解 附子平三命通變淵源眉批本' as const,
    modernPublisher: '星易' as const,
    isbn13: '9789887736172' as const,
    publisherOrRetailBibliography: 'https://www.chinyuan.com.tw/all_book/more?id=8565' as const,
    editor2017Announcement: 'https://blog.sina.com.cn/s/blog_49536d2a0102wxto.html' as const,
    editorReportsJapaneseCopyCompleteFrontAndBack: true as const,
    editorReportsJapaneseCopyHasMarginalNotes: true as const,
    separateJapaneseSourceTextIncludedAsAppendix: true as const,
    exactFocalPageShownInPublicSample: false as const,
    publiclyVerifiedSourceFolioImage: false as const,
    republicationIsUntouchedFacsimileVerified: false as const,
    editedTextIsIndependentHistoricalPrintWitness: false as const,
    japaneseOriginalPrintedFocalGlyph: null,
    directlyCollatedOriginalFocalWitnessCredit: 0 as const,
    accessClass: 'verified_2017_bibliography_editor_claim_no_locus_inspection' as const,
  }),
  historicalPublicationDisambiguation: Object.freeze({
    reportedMingZhengde13Date: 1518 as const,
    historicalColophonQuotedIn2017EditorPreface: '皇明正德十三年歲在戊寅孟秋書林熬峰熊氏厚德堂新刊' as const,
    physicalKoreaUniversityMetalTypeImpressionDateEstablished: false as const,
    chineseHistoricalPrinterAndKoreanSurvivingMetalTypeSameSettingProved: false as const,
    sourceDocumentPrintingRelationshipResolved: false as const,
  }),
  targetEarlyTextPassageDirectlyInspected: false as const,
  focalAnecdoteInEarlyTexts: null,
  reconstructedVariantAncestor: null,
  newDirectFocalPrintWitnesses: 0 as const,
  modernAnnualPriorityAuthorized: false as const,
} as const);

/**
 * The same four natal pillars and 辛亥/辛酉 markers occur in TWO textual
 * locations in received editions of 淵海子平: 喜忌篇 劫財羊刃, and 論羊刃.
 * It is NOT an independent second Ming printing and is NOT historical
 * proof of the biographical attribution to 岳飛.
 *
 * Wanli's PRINTED contents places 喜忌篇 in Juan 2, although a received
 * website labels its chapter "卷一". Chongzhen physical-book location
 * of the parallel locus remains unverified. Both printed XiJi folios
 * are uninspected; collated Ming folios here belong to 論羊刃 only.
 */
export const YUANHAI_PARALLEL_YUEFEI_NATAL_LOCUS_AUDIT = Object.freeze({
  version: 'yuanhai-two-loci-yuefei-provenance-v1' as const,
  fourPillarsDigitalTranscription: Object.freeze(['癸未','乙卯','甲子','己巳'] as const),
  largeLuckRecorded: '辛亥' as const,
  annualMarkerRecorded: '辛酉' as const,
  sameCaseNarrativeAcrossTwoReceivedTextLocations: true as const,
  mingYangrenPrintLocus: Object.freeze({
    title: '論羊刃' as const,
    wanliNlcBookTwoPdfPage: 11 as const,
    wanliDirectlyRead: '亥卯未合起羊刃' as const,
    chongzhenNlcBookTwoPdfPage: 19 as const,
    chongzhenDirectlyRead: '亥卯木合起羊刃' as const,
    chongzhenNatalYearCharacterOnSamePage: '未' as const,
    chongzhenYearAndCompoundWoodBothVisibleInSamePrintedCase: true as const,
    printedParagraphExplicitlyNamesYueFei: false as const,
    observedLocalClosingExpression: '不可一合一沖也' as const,
    localClashOrCombinationWinnerAlgorithmEstablished: false as const,
    newPrintedWitnessCredit: 0 as const,
  }),
  receivedXiJiParallelLocus: Object.freeze({
    title: '喜忌篇' as const,
    receivedWebsiteChapterLabel: '卷一' as const,
    wanliPrintedContentsJuanNumber: 2 as const,
    wanliPrintedContentsVerifiedFromNclPdfPage: 1 as const,
    chongzhenPrintedJuanForThisParallelCase: null,
    chongzhenPhysicalBookForThisParallelCase: null,
    subsection: '劫財羊刃，切忌時逢；歲運並臨，災殃立至' as const,
    // Same physical NLC book one, OCR only: no actual leaf or full pillars examined.
    nlcPrintDerivedOcr: Object.freeze({
      linkedPrintedBookId: 'NLC892-2642-210287' as const,
      printedJuan: 2 as const,
      printedSection: '喜忌篇' as const,
      onlineOcrUrl: 'https://www.shidianguji.com/zh/book/NGJ8922642210287/chapter/1lnh0qlveoysa' as const,
      incompleteNatalFragmentVerbatim: '之年逢之因財争競不然疾病連妻子矣假如癸未乙' as const,
      eventFragmentVerbatim: '行運辛亥花年辛兩三十九爲秦檜阤死于囹圄之中' as const,
      completeFourPillarsResolvedFromOcr: false as const,
      yueFeiNameResolvedFromOcr: false as const,
      scannedTargetPdfPage: null,
      scannedTargetPrintColumn: null,
      originalFolioDirectlyRead: false as const,
      independentPrintedWitnessCredit: 0 as const,
      originalWeiWoodArchetypeSupported: false as const,
    }),
    // Separate 1634 卷一 喜忌篇 OCR: the aphorism is visible, but NOT the
    // full Yue Fei anecdote in the inspected digital transcription.
    // This is NOT a negative collation of the physical printed leaf.
    chongzhenXiJiOcrScope: Object.freeze({
      parentPhysicalBookId: 'NLC892-411999032112-149610' as const,
      printedJuanForChapter: 1 as const,
      sectionTitle: '喜忌篇' as const,
      printDerivedOcrUrl: 'https://www.shidianguji.com/zh/book/NGJ892411999032112149610/chapter/1lqsbrapj4372' as const,
      observedAphorism: '刼財陽刃切忌時逢歲運併臨災殃立至' as const,
      fullFourPillarsInInspectedOcr: false as const,
      yueFeiNameInInspectedOcr: false as const,
      xinHaiXinYouEventInInspectedOcr: false as const,
      originalPrintedAnectodeAbsenceEstablished: false as const,
      physicalXiJiFolioDirectlyInspected: false as const,
      focalPrintPageAndColumn: null,
      provesSameCaseInChongzhenXiJi: false as const,
      independentlyCollatedFocalWitnessesAdded: 0 as const,
    }),
    chongzhenJuanOneInteractionOcrScope: Object.freeze({
      printDerivedOcrUrl: 'https://www.shidianguji.com/zh/book/NGJ892411999032112149610/chapter/1lqsbrapj4372' as const,
      threeCombinationChapter: '論十二支三合' as const,
      receivedTriple: '亥卯未' as const,
      clashChapter: '論十二相冲' as const,
      receivedClash: '卯酉相冲' as const,
      directPrintedGlyphCheck: false as const,
      allowsConjecturalExplanationOfChongzhenWoodGlyph: false as const,
      allowsAutomaticNormalizationOfWoodToWei: false as const,
      globalCombinationClashPrecedenceAuthorized: false as const,
      independentPrintedWitnessCredit: 0 as const,
    }),
    modernTranscriptionUrl: 'https://www.btko.net/Show-33' as const,
    crossCheckTranscriptionUrl: 'https://www.getit01.com/p201805252314174/' as const,
    textAttributedPerson: '岳飛' as const,
    textDescribesDeathAge: '三十九歲' as const,
    textDescribesDeathSetting: '獄中' as const,
    firstEditionPhysicalBookOne: 'NLC892-2642-210287' as const,
    firstEditionBookOnePdfPagesTotal: 48 as const,
    firstEditionBookOneUrl: 'https://commons.wikimedia.org/wiki/File:NLC892-2642-210287_刻京臺增補淵海子平大全_第1冊.pdf' as const,
    secondEditionPhysicalBookOne: 'NLC892-411999032112-149610' as const,
    secondEditionBookOnePdfPagesTotal: 37 as const,
    secondEditionBookOneUrl: 'https://commons.wikimedia.org/wiki/File:NLC892-411999032112-149610_新刊合併官板音義評注淵海子平_第1冊.pdf' as const,
    targetPageInEitherPrintedBookOne: null,
    anyBookOneOriginalPdfBytesObtained: false as const,
    originalBookOneFocalFolioDirectlyInspected: false as const,
    attributionIsVerifiedIndependentHistoricalBirthRecord: false as const,
    newPrintedWitnessCredit: 0 as const,
    sourceTier: 'received_digital_transcription_unverified_book_one_print' as const,
  }),
  additionalReceivedText: Object.freeze({
    work: '神峰通考' as const,
    publicTranscriptionUrl: 'https://zh.wikisource.org/zh-hant/神峰通考' as const,
    textNamesYueFei: true as const,
    transmittedHourPillarString: '已巳' as const,
    glyphEqualsMechanicallyValidJiSi: false as const,
    independentMaterialWitnessCollated: false as const,
    editionDependenceDetermined: false as const,
    printedOriginalHourStemVerified: false as const,
    newPrintedWitnessCredit: 0 as const,
  }),
  historyOrHistoricalBirthHourAuthenticated: false as const,
  textualGenealogyIndependentWitnessesAdded: 0 as const,
  printedFocalCollationsAdded: 0 as const,
  archetypalVariantChoiceAuthorized: false as const,
  modernAnnualPrecedenceAuthorized: false as const,
} as const);

/**
 * Cross-genre source-criticism register:
 * Song biographical record != authenticated hour of birth;
 * later transcription of Sanming Tonghui != direct collation of its 1578 leaf;
 * OCR oddities != printed textual variants.
 */
export const YUANHAI_YUEFEI_CROSS_GENRE_EVIDENCE_AUDIT = Object.freeze({
  version: 'yuanhai-yuefei-cross-genre-print-path-audit-v1' as const,
  biographicalBirthRecord: Object.freeze({
    title: '宋少保岳鄂王行實編年' as const,
    traditionalCompiler: '岳珂' as const,
    transmittedTextUrl: 'https://www.shidianguji.com/zh/book/CADAL02020924/chapter/1l5i7mh2vbgo8' as const,
    recordedYear: '崇寧二年癸未' as const,
    recordedLunarBirthDay: '二月十五日' as const,
    yearAndLunarDateTextWitnessed: true as const,
    yearStemBranchSupportsNatalYearOnly: true as const,
    fourPillarsAllPresent: false as const,
    birthHourGiven: false as const,
    originalSongAutographExamined: false as const,
    sourceTier: 'later_reprint_ocr_of_southern_song_family_biography' as const,
  }),
  // Conditional astronomical-calendar cross-check of the natal DAY only.
  // It does NOT establish the authenticity of the reported birth date or hour.
  conditionalCalendarDayCorroboration: Object.freeze({
    datedBirthClaimSource: '宋少保岳鄂王行實編年' as const,
    dateAccordingToBiography: '崇寧二年癸未歲二月十五日' as const,
    dynasty: '北宋' as const,
    historicalChronicleTitle: '宋史·卷十九·徽宗一' as const,
    chronicleTextUrl: 'https://zh.wikisource.org/zh-hant/宋史/卷019' as const,
    songLiaoLunisolarComparisonTableUrl: 'https://ytliu0.github.io/ChineseCalendar/LiaoJinYuan_calendars_chinese.html' as const,
    historicalLunisolarMonth: '崇寧二年二月' as const,
    reconstructedFirstDayGanzhi: '庚戌' as const,
    reconstructedFirstDayGregorian: '1103-03-10' as const,
    recordedBirthLunarDay: 15 as const,
    sexagenaryDayOffsetFromFirst: 14 as const,
    computedBirthDayGanzhi: '甲子' as const,
    reconstructedGregorianDate: '1103-03-24' as const,
    chronicleInMonthCrossCheck: Object.freeze([
      Object.freeze({day:2,ganzhi:'辛亥'} as const),
      Object.freeze({day:3,ganzhi:'壬子'} as const),
      Object.freeze({day:5,ganzhi:'甲寅'} as const),
      Object.freeze({day:12,ganzhi:'辛酉'} as const),
      Object.freeze({day:14,ganzhi:'癸亥'} as const),
      Object.freeze({day:27,ganzhi:'丙子'} as const),
    ] as const),
    songChronicleExplicitlyStatesYueFeiBirthday: false as const,
    songChronicleExplicitlyNamesBirthDayJiazi: false as const,
    alignsReceivedYueFeiDayPillarIfBirthDateAccurate: true as const,
    reconstructedDateIsOriginalHistoricalAutograph: false as const,
    mathematicallyValidDayPillarMeansBiographicallyAuthenticatedFourPillars: false as const,
    validatesBirthHourJiSi: false as const,
    validatesSajuPredictionOrShenShaInterpretation: false as const,
    independentPrintedMingFocalWitnessCredit: 0 as const,
  }),
  conditionalSolarMonthCrossCheck: Object.freeze({
    recordBirthDate: '崇寧二年二月十五' as const,
    prolepticGregorianDate: '1103-03-24' as const,
    computationMethod: 'pyswisseph 2.10.03 FLG_MOSEPH' as const,
    apparentSolarLongitudeAtNoonDegreesApprox: 2.5335 as const,
    jingzheLongitudeDegrees: 345 as const,
    jingzheComputedDayUtc: '1103-03-06' as const,
    qingmingLongitudeDegrees: 15 as const,
    qingmingComputedDayUtc: '1103-04-06' as const,
    birthDayWithinTwoSolarTerms: true as const,
    guiYearTigerMonth: '甲寅' as const,
    secondMonthPillarConditional: '乙卯' as const,
    birthDateHistoricallyAuthenticatedByThis: false as const,
    officialSongAlmanacIndependentlyCollated: false as const,
    allegedJiSiBirthHourAuthenticatedByThis: false as const,
    fullyAuthenticatedFourPillars: false as const,
    newPrintedWitnessCredit: 0 as const,
    productionMeaningAuthorized: false as const,
    methodUrl: 'https://www.astro.com/swisseph/swisseph.htm' as const,
    solarTermUrl: 'https://javadoc.io/static/net.time4j/time4j-base/5.9.4/net/time4j/calendar/SolarTerm.html' as const,
  }),
  chronologicalDeathRecord: Object.freeze({
    title: '建炎以來繫年要錄' as const,
    traditionalCompiler: '李心傳' as const,
    textUrl: 'https://zh.wikisource.org/zh-hant/建炎以來繫年要錄/卷143' as const,
    corroboratingOcrUrl: 'https://www.shidianguji.com/zh/book/CADAL01058521/chapter/1ljw7zfk6ff2z' as const,
    regnalYear: '紹興十一年' as const,
    regnalLunarMonth: '十二月' as const,
    dayStemBranch: '癸巳' as const,
    deathInstitution: '大理寺' as const,
    recordedDeathAge: 39 as const,
    deathEpisodeAndTraditionalAgeCorroborated: true as const,
    xinYouSolarYearAmbiguityMustBeAvoided: true as const,
    birthHourOrFullNatalChartEstablished: false as const,
    originalSongAutographExamined: false as const,
  }),
  mingSanmingTonghuiLocus: Object.freeze({
    work: '三命通會' as const,
    chapter: '卷八·六甲日己巳時斷·甲子日己巳時' as const,
    originalEditionCatalogYear: 1578 as const,
    official1578EditionCatalogUrl: 'https://rbook.ncl.edu.tw/NCLSearch/Search/SearchDetail?HasImage=&SourceID=1&item=a8776bf009664f7a8de67d697186e322fDcyODE20.HwkhFZvyoK_b_gt8uDb5Xa7Nh9LYxzj5HEj4uWEtX6g_&page=2&sourceWhereString=&whereString=IChEYXRlX0NyZWF0ZWQgbGlrZSAnJTE1NzglJyBvciBEb2N1bWVudF9ZZWFyIGxpa2UgJyUxNTc4JScgKSA1.IuMldaBSQarjxhBn_BeTs0yAImbyvOSAYg5y7FFSAGw_' as const,
    officialCatalogCallmark: '06590' as const,
    // 06589 and 06590 are TWO catalogued exemplars of 1578 edition.
    // Wikimedia expressly identifies its scan as callmark 306.5 06589.
    // Matching catalog metadata does not constitute focal-leaf collation.
    commonsScanId: 'NCL-06589' as const,
    commons06589BookOnePages: 1000 as const,
    commons06589BookTwoPages: 187 as const,
    commonsScanCatalogCallmark: '306.5 06589' as const,
    official06589CatalogUrl: 'https://rbook.ncl.edu.tw/NCLSearch/Search/SearchDetail?HasImage=&SourceID=1&item=26447d6c7bce4f449022760431185858fDU3MDkwMg2.stq2HEhfWJC_eUYaQeBiD_PNb2MtZqMpJAZgsDYhhYk_&page=&sourceWhereString=&whereString=IChDcmVhdGVyX05hbWUgbGlrZSAnJeiQrOawkeiLsSUnIG9yIERvY3VtZW50X1dyaXRlciBsaWtlICcl6JCs5rCR6IuxJScgb3IgSm91cm5hbF9Xcml0ZXIgbGlrZSAnJeiQrOawkeiLsSUnICkg0.kCozK1ger_VDKjWLmYeI3_nb0xMenmNBgvJUAAV7WaE_' as const,
    official1578CatalogCallmarks: Object.freeze(['06589', '06590'] as const),
    twoSeparateCataloguedHoldingRecordsConfirmed: true as const,
    commonsMetadataMatches06589Catalog: true as const,
    booksOriginalFocalFoliosComparedBetween06589And06590: false as const,
    laterExcerptWork: '古今圖書集成·藝術典卷613' as const,
    laterExcerptOcrUrl: 'https://www.shidianguji.com/zh/book/GJTS17/chapter/1lpxdjgfa407e' as const,
    laterExcerptMentionsYueFeiAndFourPillars: true as const,
    laterExcerptBirthPillars: Object.freeze(['癸未','乙卯','甲子','己巳'] as const),
    receivedWikisourceUrl: 'https://zh.wikisource.org/zh-hant/三命通會/卷八' as const,
    receivedWikisourceSectionOmittedNamedExample: true as const,
    separateBookImageDerivedOcrUrl: 'https://www.shidianguji.com/zh/book/HY1521/chapter/1knweoxh848i3' as const,
    separatelyInspectedOcrSectionOmitsName: true as const,
    original1578FocalLeafDirectlyCollated: true as const,

    // The received Siku Quanshu text DOES preserve 岳武穆, not 岳飛:
    // flattening a multi-column natal-case table separates 岳武 / 穆.
    // Prior no-name search was a false negative, corrected at this exact locus.
    sikuReceivedCase: Object.freeze({
      editionFamily: '四庫全書本' as const,
      locatorUrl: 'https://zh.wikisource.org/zh-hant/三命通會_(四庫全書本)/卷08' as const,
      printedJuan: 8 as const,
      subsection: '六甲日己巳時斷·甲子日己巳時' as const,
      precedingSentence: '甲子日己巳時先貧後富祖業輕微妻勤子拗' as const,
      receivedFlattenedCaseLine: '〈癸未岳武 戊寅布政 甲子通判 癸酉指揮乙卯 穆 己未 癸酉 丁巳' as const,
      transmittedHonorific: '岳武穆' as const,
      literalYueFeiNameAbsentButHonorificPresent: true as const,
      yueWumuSamePersonAsYueFei: true as const,
      earlierClaimSikuOmittedYuefeiCaseRetracted: true as const,
      reconstructedFourPillarsByColumnImageCollation: false as const,
      imagePageAndColumnDirectlyRead: false as const,
      original1578PrintedLeafEstablished: false as const,
      independentPrintedWitnessCredit: 0 as const,
    }),
    qingIllustratedEncyclopediaTranscription: Object.freeze({
      work: '古今圖書集成' as const,
      compiledSection: '博物彙編·藝術典·第613卷' as const,
      wikiDjvuPageLocator: 'https://zh.wikisource.org/wiki/Page:Gujin_Tushu_Jicheng,_Volume_471_(1700-1725).djvu/86' as const,
      digitizedPageNumber: 86 as const,
      wikiTranscriptionIsMarkedUnproofread: true as const,
      namedExample: '岳飛' as const,
      receivedFourPillars: Object.freeze(['癸未','乙卯','甲子','己巳'] as const),
      originalDjvuFolioImageVisuallyInspected: false as const,
      proves1578OriginalLeafCarriedCase: false as const,
      directMaterialWitnessCredit: 0 as const,
    }),
    // A NEW same-locus OCR tied to the NLC's Ming Wanli printed book family.
    // Its 作飛 token is candidate OCR for 岳飛, not a verified woodblock glyph.
    // The two final 已 are unsafe OCR for a sexagenary hour pillar.
    nlcMingFocalCasePrintDerivedOcr: Object.freeze({
      parentPrintedBookCatalogFamily: 'NLC892-411999029701' as const,
      linkedDigitizedBookId: 'NGJ89241199902970167139' as const,
      // The portal's book ID points to the catalog's FIRST bound fascicle,
      // but the portal chapter is a composite logical-book view (Juan 8).
      linkedIdPhysicalFascicle: 1 as const,
      logicalJuanEightCannotBeLocatedInBoundFascicleOneByPortalId: true as const,
      completeNlcCommonsFascicleIndexUrl: 'https://commons.wikimedia.org/wiki/Commons:Library_back_up_project/file_list/NLC/%E6%95%B8%E5%AD%97%E5%8F%A4%E7%B1%8D/11' as const,
      completePhysicalFascicleInventoryCount: 24 as const,
      nlcFascicle15Candidate: 'NLC892-411999029701-66492' as const,
      nlcFascicle15CommonsUrl: 'https://commons.wikimedia.org/wiki/File:NLC892-411999029701-66492_%E4%B8%89%E5%91%BD%E9%80%9A%E6%9C%83_%E7%AC%AC15%E5%86%8A.pdf' as const,
      nlcFascicle16Confirmed: 'NLC892-411999029701-66488' as const,
      fascicle15PrintedJuanEightUpperDirectlyVerified: true as const,
      targetedSectionInPhysicalFascicle15DirectlyVerified: true as const,
      onlineOcrUrl: 'https://www.shidianguji.com/zh/book/NGJ89241199902970167139/chapter/1lvorfxfggvly' as const,
      publicationDateRangeInCatalog: '明萬曆[1573-1620]' as const,
      printedJuan: 8 as const,
      headingAsOcr: '六甲已巳時斷' as const,
      targetCaseOcrVerbatim: '申子辰戍火貴神白云化氣，主貴作飛。癸未乙卯、甲子已已萬衣布政' as const,
      nameTokenObservedInOcr: '作飛' as const,
      candidateNameBasedOnParallelTransmission: '岳飛' as const,
      exactPrintedNameGlyphVerified: true as const,
      observedPillarsInOcr: Object.freeze(['癸未','乙卯','甲子','已已'] as const),
      lastHourPillarOcrInvalidAsConfirmedJiSi: true as const,
      originalHourStemDirectlyRead: true as const,
      sameCaseLocationCrossCheckedWithLaterYuefeiTransmission: true as const,
      exactBoundFascicleForTargetIdentified: true as const,
      targetPdfPageAndColumn: 'PDF p.14 right folio, second vertical column from right',
      focalPrintImageDirectlyRead: true as const,
      independentPrintSettingEstablishedRelativeTo1578Ncl: false as const,
      original1578FocalPrintVerifiedByThisOcr: false as const, // NCL p654 is direct PRINT, unrelated to online NLC OCR verification
      additionalDirectlyCollatedMingFocalWitnessCredit: 1 as const,
      printedUnWoodArchetypeDecisionAuthorized: false as const,
    }),
    nlcOtherWanliMingScanLocator: Object.freeze({
      work: '三命通會' as const,
      catalogGrouping: 'NLC892-411999029701' as const,
      volume16FileId: 'NLC892-411999029701-66488' as const,
      volume16PrintedJuan: '卷之八下' as const,
      volume16PdfPages: 64 as const,
      volume16CommonsUrl: 'https://commons.wikimedia.org/wiki/File:NLC892-411999029701-66488_三命通會_第16冊.pdf' as const,
      publicationDateRangeFromCatalog: '明萬曆[1573-1620]' as const,
      original1578EditionIdentityEstablished: false as const,
      targetedJiSiSectionProvedInVolume16: false as const,
      originalFocalFolioDirectlyExamined: false as const,
      independentMingPrintedWitnessCredit: 0 as const,
    }),
    laterExcerptProves1578IdenticalNamedExample: false as const,
    textualRelationshipAndOmissionCauseEstablished: false as const,
    independentMingPrintedFocalWitnessCredit: 0 as const,
  }),
  shenfengSuspiciousPrintOcr: Object.freeze({
    work: '神峰通考' as const,
    scannedPdfUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d1/NLC511-027032013020556-10361_神峰通考_第2卷.pdf' as const,
    indexedOcrDayPillarCandidate: '甲申' as const,
    indexedOcrYearlyMarkerCandidate: '辛丑' as const,
    differingReceivedDigitalReadings: Object.freeze(['甲子','辛酉'] as const),
    originalExactFocalPageVisuallyExamined: false as const,
    printVariantVersusOcrMisreadAdjudicated: false as const,
    mustNotCountAsConfirmedAlternativeNatalChart: true as const,
    independentlyCollatedPrintedWitnessCredit: 0 as const,
  }),
  additionalMingHoldingCandidate: Object.freeze({
    title: '新刊合併官板音義評註淵海子平五卷' as const,
    institution: '天一閣博物院' as const,
    catalogIdentifier: 'Tianyige-330000-1705-0005007' as const,
    editionMetadata: '明崇禎刻本' as const,
    pdfPages: 153 as const,
    commonsFileUrl: 'https://commons.wikimedia.org/wiki/File:Tianyige-330000-1705-0005007_新刊合併官板音義評註淵海子平五卷_宋徐升編_明楊淙增校_明崇禎刻本.pdf' as const,
    originalFocalPageAndColumnInspected: false as const,
    physicallyIndependentTypesettingVerified: false as const,
    additionalIndependentFocalWitnessCredit: 0 as const,
  }),
  verifiedHistoricalYearDayOrEventMeansAuthenticatedBirthHour: false as const,
  allNewFocalPrintedWitnessesAdded: 2 as const, // 2 physically separate collated Ming copies; independent typesetting NOT established
  previouslyConfirmedPrintedUnWoodVariantRemainsUnresolved: true as const,
  globalAnnualMeaningAuthorization: false as const,
  productionAuthorization: false as const,
} as const);

export const YUANHAI_JUAN3_TEXTUAL_DISAGREEMENTS = Object.freeze([
  Object.freeze({
    locus: 'HAI_MAO_WEI_OR_WOOD' as const,
    values: Object.freeze(['亥卯未', '亥卯木'] as const),
    kind: 'earthly_branch_versus_five_element_glyph' as const,
    textSupportsOneUnambiguousMingPrinting: false as const,
    editorMayNormalizeToWei: false as const,
  }),
  Object.freeze({
    locus: 'BIRTH_HOUR_HEAVENLY_STEM' as const,
    values: Object.freeze(['己巳', '巳巳'] as const),
    kind: 'heavenly_stem_versus_branch_like_OCR_glyph' as const,
    textSupportsOneUnambiguousMingPrinting: false as const,
    editorMayNormalizeToWei: false as const,
  }),
]);

export const YUANHAI_JUAN3_PRINT_SCOPE_UNRESOLVED = Object.freeze([
  'TARGET_JUAN_THREE_IS_NLC_PHYSICAL_BOOK_TWO_NOT_BOOK_ONE',
  'CHONGZHEN_1634_PRINTED_WOOD_VARIANT_VERIFIED_ARCHETYPE_UNDECIDED',
  'WANLI_WEI_VERSUS_CHONGZHEN_WOOD_DISTINCT_SETTING_NO_TEXTUAL_GENEALOGY_DECISION',
  'WORKING_BASE_WANLI_ONLY_NO_ARCHETYPE_ESTABLISHED',
  'JIAJING_1548_COMPILATION_REFERENCED_ORIGINAL_FACSIMILE_NOT_LOCATED',
  'KOREAN_ZIPING_YUANYUAN_HOLDINGS_IDENTIFIED_TARGET_ANECDOTE_UNVERIFIED',
  'KOREAN_WOODBLOCK_SCHOLARLY_YANGREN_QUOTE_NOT_FOCAL_CASE',
  'KOREA_UNIVERSITY_1518_SAN_CHE_DERIVATIVE_NOT_1548_YANG_CONG',
  'KOREA_1518_DERIVATIVE_FOCAL_PRINT_UNINSPECTED',
  'SEOUNGWANJI_BON_GAM_JANG_PAN_ATTESTS_HISTORICAL_PLATE_HOLDING_NOT_SURVIVING_FOCAL_COPY',
  'KOREA_UNIVERSITY_CATALOG_TOC_NOT_ORIGINAL_FOLIO_ACCESS',
  'KORCIS_PUBLIC_SEARCH_FOUND_TARGET_REC_KEY_AND_ORIGINAL_IMAGE_STILL_UNVERIFIED',
  'ALTERNATE_COVER_TITLE_MUST_NOT_CREATE_DUPLICATE_EDITION_WITNESSES',
  'UNVERIFIED_THIRD_PARTY_MANUSCRIPT_SCAN_FILENAME_NOT_ORIGINAL_FOLIO',
  'EARLY_YANGREN_GENERAL_JIA_DAY_YOU_LUCK_QUOTED_BY_MODERN_COMMENTARY_NOT_PRINT',
  'EARLY_YANGREN_JOINING_DISAPPROVAL_DOES_NOT_RESOLVE_MING_COMBINATION_CLASH',
  'EARLY_ACADEMIC_AND_EXEGETICAL_QUOTATIONS_DO_NOT_PROVE_SPECIFIC_FOUR_PILLAR_CASE',
  'NLK_CALLMARK_CANDIDATE_SECONDARY_BIBLIOGRAPHY_NOT_MARC_VERIFIED',
  'NLK_CALLMARK_DOES_NOT_ESTABLISH_FOCAL_FOLIO_OR_EARLY_GLYPH',
  'FREE_1518_COMMUNITY_BAIDU_PHOTO_LINK_HAS_NOT_BEEN_DOWNLOADED_OR_COLLATED',
  'FREE_1518_COMMUNITY_COPY_MAY_HAVE_MISSING_PAGES',
  'JAPAN_SEIKADO_2017_APPENDIX_FULL_TEXT_CLAIM_NOT_DIRECT_PRINT_PAGE_INSPECTION',
  '1518_MING_COLOPHON_DOES_NOT_DATE_SPECIFIC_KOREAN_METAL_TYPE_IMPRESSION',
  'YUEFEI_FOUR_PILLARS_RECEIVED_IN_TWO_YUANHAI_SECTIONS_NOT_TWO_PRINT_WITNESSES',
  'XIJI_PARALLEL_NLC_BOOK_ONE_TARGET_FOLIO_UNINSPECTED',
  'WEB_CHAPTER_JUAN_ONE_LABEL_DIFFERS_FROM_WANLI_PRINTED_JUAN_TWO',
  'CHONGZHEN_PARALLEL_XIJI_PRINTED_JUAN_AND_BOOK_UNVERIFIED',
  'SHENFENG_HOUR_YI_SI_DIGITAL_READING_REQUIRES_PHYSICAL_GLYPH_COLLATION',
  'YUEFEI_HISTORICAL_BIRTH_RECORD_NOT_AUTHENTICATED',
  'KOREA_UNIVERSITY_JUNGJONG15_1518_CALENDAR_LABEL_CONFLICT',
  'PREFACE_1253_NOT_DATE_OF_SURVIVING_MANUSCRIPT',
  'HOUR_JI_SI_CONSISTENT_WITH_FIVE_RATS_BUT_ORIGINAL_GLYPH_NOT_ADJUDICATED',
  'LATER_EDITED_TEXT_MAY_SILENTLY_EMEND_AND_IS_NOT_PRINT_WITNESS',
  'NCL_TAIWAN_AND_NLC_SCANS_MATCH_SETTING_BUT_INDEPENDENT_EDITION_NOT_ESTABLISHED',
  'NLC_PRINTED_HOUR_FIRST_GLYPH_VISUALLY_FAVORS_JI_NEEDS_SECOND_INDEPENDENT_READING',
  'PREVIOUS_NLC_PRINT_WOOD_READING_RETRACTED_AFTER_SECOND_PASS',
  'NLC_PRINT_DERIVED_OCR_HOUR_PILLAR_SAYS_SI_SI_WHILE_OTHER_TRANSCRIPTS_SAY_JI_SI',
  'CONFIRMED_PRINT_VARIANT_DOES_NOT_LICENSE_GENERAL_TRIPLE_CLASH_PRECEDENCE',
  'WEB_TEXT_VOTES_DO_NOT_ESTABLISH_ORIGINAL_GLYPH_OR_EDITION_LINEAGE',
  'NO_CLASSICAL_GLOBAL_TRIPLE_CLASH_WINNER_METHOD_FROM_SOURCE_TEXT',
  'MODERN_YEAR_OUTCOME_OR_PERSONAL_FORECAST_NOT_AUTHORIZED',
] as const);

/** Compare online passage displays only; neither counts as a newly collated print leaf. */
export const YUANHAI_SANMING_PARALLEL_DIGITAL_PASSAGE_COMPARISON = Object.freeze({
  locus: '三命通會 卷八 六甲日己巳時斷 甲子日己巳時' as const,
  nlcWanliLinkedOcr: Object.freeze({
    url: 'https://www.shidianguji.com/zh/book/NGJ89241199902970167139/chapter/1lvorfxfggvly' as const,
    digitalSourceIdentifier: 'NGJ89241199902970167139' as const,
    observedExcerpt: '申子辰戍火貴神白云化氣，主貴作飛。癸未乙卯、甲子已已' as const,
    evidenceTier: 'B_print_linked_unverified_OCR' as const,
    originalPrintedNameAndPillarsVerified: false as const,
  }),
  alternativePortalText: Object.freeze({
    url: 'https://www.shidianguji.com/zh/book/HY1521/chapter/1knweoxh848i3' as const,
    digitalSourceIdentifier: 'HY1521' as const,
    observedExcerpt: '申子辰戌大貴，化氣主貴。甲寅日己巳時' as const,
    evidenceTier: 'C_unpinned_digital_text' as const,
    yuefeiNamedExampleVisibleInExaminedParagraph: false as const,
    editionOrPrintImageIdentityVerified: false as const,
    omissionFromHistoricalPrintedEditionProved: false as const,
  }),
  comparison: Object.freeze({
    nearbyBaseParagraphOverlaps: true as const,
    digitalExampleSequenceDiffers: true as const,
    physicalLeafOmissionEstablished: false as const,
    nlcFascicle15UpperJuanAndTargetLeafDirectlyInspected: true as const,
    nlcFascicle15PrioritizedFromAdjacentBookMetadata: true as const,
    original1578NclNamedCaseVerified: false as const,
    independentPrintedFocalWitnessesAdded: 0 as const,
    historicalBirthHourVerified: false as const,
    generalClashCombinationSemanticsAuthorized: false as const,
    productionAuthorized: false as const,
  }),
});


/** Grade A, user-supplied NLC Ming printed scan, manually collated at PDF pp.13-14. */
export const YUANHAI_SANMING_NLC_JUAN8_UPPER_DIRECT_PRINT = Object.freeze({
  work: '三命通會' as const,
  physicalBook: 15 as const,
  printedJuanOnCover: '卷八上' as const,
  volumeId: 'NLC892-411999029701-66492' as const,
  sourceUrl: 'https://commons.wikimedia.org/wiki/File:NLC892-411999029701-66492_%E4%B8%89%E5%91%BD%E9%80%9A%E6%9C%83_%E7%AC%AC15%E5%86%8A.pdf' as const,
  sourcePdfSha256: '009396f2dfd848194d7fa73c6e02ea51c010d3a9f0d5f3eb83be35d6b6a2e777' as const,
  sourcePdfPageCount: 57 as const,
  scannedCoverPageOneBased: 1 as const,
  sectionHeading: '六甲日己巳時斷' as const,
  sectionHeadingPageOneBased: 13 as const,
  exampleContext: '甲子日己巳時' as const,
  exampleContextStartsPageOneBased: 13 as const,
  directPrintedCasePdfPageOneBased: 14 as const,
  directPrintedCaseSide: 'right_folio' as const,
  directPrintedCaseColumnFromRight: 2 as const,
  printedRun: '岳飛癸未乙卯甲子己巳' as const,
  printedName: '岳飛' as const,
  printedPillars: Object.freeze(['癸未', '乙卯', '甲子', '己巳'] as const),
  evidenceTier: 'A_original_print_facsimile_direct_visual' as const,
  readFromSuppliedOriginalPdf: true as const,
  sourceByteChecksumCalculated: true as const,
  ocrNameMisreading: '作飛' as const,
  ocrHourMisreading: '已已' as const,
  directPrintedNameAndFourPillarsConfirmed: true as const,
  first1578EditionIdentityEstablished: false as const,
  printedSettingsIndependentOfNcl1578Established: false as const,
  original1578PrintedExampleConfirmed: false as const,
  historicallyVerifiedBirthHour: false as const,
  originalYuanhaiUnWoodVariantResolved: false as const,
  modernAnnualReadingAuthorized: false as const,
  productionAuthorized: false as const,
});


/**
 * Critical-editorial COLLATION ROUTE, not a direct first-edition leaf witness.
 * A modern editor's source families and emendation principles are research
 * leads only; they do not authenticate NLC fascicle 15 as first-cut 1578.
 */
export const YUANHAI_SANMING_1578_CRITICAL_EDITORIAL_ROUTE = Object.freeze({
  sourceTier: 'C_modern_critical_editorial_account' as const,
  criticalEditionTitle: '增訂萬曆初刻三命通會' as const,
  criticalEditionEditor: '李鏘濤' as const,
  criticalEditionForewordAndMethodUrl: 'https://ftp.xinyi.hk/goods-9310.html' as const,
  editorialClaimOriginalPrintYear: 1578 as const,
  editorialClaimCollatedHoldings: Object.freeze(['中國國家圖書館', '浙江省圖書館', '臺灣國家圖書館'] as const),
  editorialClaimThreeCollatedCopiesLargelyAgree: true as const,
  editorialClaimTaiwanCopyHasCorrectionsAndMarginalNotes: true as const,
  editorialClaimLater1726CompilationAddsSomeMingExampleCharts: true as const,
  editorialClaim1735RevisedEditionAddsPostWanliExamples: true as const,
  companionHistoricalResearchPrefaceUrl: 'https://www.xingmao.co/products/%E3%80%8A%E5%A2%9E%E8%A8%82%E8%90%AC%E6%9B%86%E5%88%9D%E5%88%BB%E4%B8%89%E5%91%BD%E9%80%9A%E6%9C%83%E3%80%8B%E5%BE%B5%E5%BC%95%E4%BA%BA%E7%89%A9%E5%B1%A5%E6%AD%B7%E9%95%B7%E7%B7%A8%E7%AC%AC%E4%B8%80%E8%BC%AF%EF%BC%88%E6%9D%8E%E9%8F%98%E6%BF%A4%E7%B7%A8%E6%92%B0%EF%BC%89' as const,
  companionPrefaceAttestsEditorialCorrectionsToSimilarGlyphsJiSi: true as const,
  original1578TaiwanCatalog06589Url: 'https://rbook.ncl.edu.tw/NCLSearch/Search/SearchDetail?HasImage=&SourceID=1&item=69577a07b3444caf9b20e35e84a103e0fDcyODE10.578_oDtdzxby6wX5_W8cCvt1j5rqk4Hzy3GeKFoIIHA_&page=2&sourceWhereString=&whereString=IChEYXRlX0NyZWF0ZWQgbGlrZSAnJTE1NzglJyBvciBEb2N1bWVudF9ZZWFyIGxpa2UgJyUxNTc4JScgKSA1.IuMldaBSQarjxhBn_BeTs0yAImbyvOSAYg5y7FFSAGw_' as const,
  original1578TaiwanCommonsPartOneUrl: 'https://commons.wikimedia.org/wiki/File:NCL-06589_1_%E4%B8%89%E5%91%BD%E9%80%9A%E6%9C%83.pdf' as const,
  original1578TaiwanCommonsPartOnePages: 1000 as const,
  original1578TaiwanCommonsPartTwoPages: 187 as const,
  nlcMingPrintedFascicle15Is1578FirstCutIndependentlyAuthenticated: false as const,
  ncl1578FocalJuanEightPageDirectlyObtained: true as const,
  specificYuefeiLocusComparedInCriticalEditionOriginalFacsimile: false as const,
  printedFocalCasesDirectlyAddedByThisEditorialSource: 0 as const,
  actualHistoricalYuefeiBirthHourAuthenticated: false as const,
  productionAuthorized: false as const,
});


/**
 * DIRECT printed-leaf reading of the NCL Taiwan 06589 copy catalogued as
 * Wanli year six (1578): not merely a digital transcript or OCR.
 * The 1578 YEAR is catalog attribution, not a date printed on focal leaf.
 * Same column layout with NLC fascicle 15 does NOT prove separate plates.
 */
export const YUANHAI_SANMING_NCL_06589_1578_DIRECT_PRINT = Object.freeze({
  work: '三命通會' as const,
  taiwanHoldingCallmark: '06589' as const,
  sourceCommonsFile: 'NCL-06589_1_三命通會.pdf' as const,
  sourceUrl: 'https://commons.wikimedia.org/wiki/File:NCL-06589_1_%E4%B8%89%E5%91%BD%E9%80%9A%E6%9C%83.pdf' as const,
  pdfSha256: '3de5c45efb1919965afae00a3c97121054aaabd0f38f9fd5ab8f0a28bb8e36dd' as const,
  pdfByteCount: 101956385 as const,
  fullPdfPageCount: 1000 as const,
  catalogImprintYear: 1578 as const,
  catalogYearDirectlyEngravedOnFocalLeaf: false as const,
  scannedBoundBookNumberWithinMergedFile: 8 as const,
  boundBookScanStartPageOneBased: 639 as const,
  printedJuanFirstPageOneBased: 642 as const,
  printedJuanHeading: '三命通會卷之八' as const,
  sectionFirstPageOneBased: 653 as const,
  sectionHeading: '六甲日己巳時斷' as const,
  focalCasePdfPageOneBased: 654 as const,
  focalCaseLocation: 'right_folio_second_vertical_column_from_right' as const,
  locus: '甲子日己巳時' as const,
  printedCaseRun: '岳飛癸未乙卯甲子己巳' as const,
  printedName: '岳飛' as const,
  printedFourPillars: Object.freeze(['癸未','乙卯','甲子','己巳'] as const),
  originalLeafVisuallyCollated: true as const,
  evidenceTierForPrintedCase: 'A_direct_original_print_image' as const,
  evidenceTierForEditionYear: 'catalog_attributed_1578' as const,
  sameCaseAndNeighboringColumnOrderAsNlcFascicle15: true as const,
  nlcComparisonFascicleId: 'NLC892-411999029701-66492' as const,
  nlcComparisonPageOneBased: 14 as const,
  physicallySeparateCopyExamined: true as const,
  independentTypesettingOrWoodblockEstablished: false as const,
  printedRunAddedOnlyInLaterQingEditions: false as const,
  transmissionBefore1578Verified: false as const,
  recordedBirthHourHistoricallyAuthenticated: false as const,
  originalYuanhaiUnWoodArchetypeResolved: false as const,
  generalClashCombinationSemanticsAuthorized: false as const,
  modernPersonalAnnualMeaningAuthorized: false as const,
  productionAuthorized: false as const,
});


/** Target-leaf image provenance, not proof of independent Ming print blocks. */
export const YUANHAI_SANMING_JUAN8_DUPLICATE_AND_NEXT_WITNESS_AUDIT = Object.freeze({
  visualMethod: 'OpenCV SIFT 7000 features, Lowe ratio 0.7, RANSAC 4px' as const,
  baiduRehostOfNlcScan: Object.freeze({
    submittedScreenshot: 'image(20261014-041136).png' as const,
    originalNlcPrintedBook: 'NLC892-411999029701-66492' as const,
    originalPdfPageOneBased: 14 as const,
    originalSide: 'right_folio' as const,
    descriptorMatches: 1368 as const,
    ransacInliers: 1340 as const,
    inlierFractionApprox: 0.97953 as const,
    perspectiveCorrectedPixelCorrelationApprox: 0.92076 as const,
    nearlyUniformImageScaleApprox: 1.975 as const,
    duplicateDigitalScanConfirmed: true as const,
    newPhysicalPrintWitnessAdded: 0 as const,
    independentWoodblockCredit: 0 as const,
  }),
  twoPhysicalCopiesPrintAlignment: Object.freeze({
    physicalScanOne: 'NLC892-411999029701-66492 p14' as const,
    physicalScanTwo: 'NCL-06589_1 p654' as const,
    siftCandidateMatches: 351 as const,
    homographyInliers: 290 as const,
    fractionApprox: 0.82621 as const,
    separateColorVsGrayscaleCaptureAndAnnotations: true as const,
    directlyInspectedCopies: 2 as const,
    independentWoodblockTypesettingVerified: false as const,
    sameActualWoodblockProven: false as const,
  }),
  taiwanNcl06590Candidate: Object.freeze({
    officialCatalogUrl: 'https://rbook.ncl.edu.tw/NCLSearch/Search/SearchDetail?HasImage=&SourceID=1&item=a8776bf009664f7a8de67d697186e322fDcyODE20.HwkhFZvyoK_b_gt8uDb5Xa7Nh9LYxzj5HEj4uWEtX6g_&page=2&sourceWhereString=&whereString=IChEYXRlX0NyZWF0ZWQgbGlrZSAnJTE1NzglJyBvciBEb2N1bWVudF9ZZWFyIGxpa2UgJyUxNTc4JScgKSA1.IuMldaBSQarjxhBn_BeTs0yAImbyvOSAYg5y7FFSAGw_' as const,
    callmark: '306.5 06590' as const,
    catalogEditionYear: 1578 as const,
    numberOfBooks: 12 as const,
    originalJuanEightFocalLeafInspected: false as const,
    separatePrintedSettingEstablished: false as const,
    newWitnessCredit: 0 as const,
  }),
  laterTransmissionCandidate: Object.freeze({
    japanNationalArchivesUrl: 'https://www.digital.archives.go.jp/file/en/1076363.html' as const,
    japanCatalogCallmark: '305-0295' as const,
    japanCatalogEdition: '清雍正' as const,
    japanListedCorrector: '蔣國祥' as const,
    japanBookEightListed: true as const,
    japanOriginal1578Print: false as const,
    japanFocalImageRead: true as const,
    zhejiangSikuJuanEightCommonsUrl: 'https://commons.wikimedia.org/wiki/File:CADAL06066044_%E4%B8%89%E5%91%BD%E9%80%9A%E6%9C%83%C2%B7%E5%8D%B7%E5%85%AB.djvu' as const,
    zhejiangSikuDigitalID: 'CADAL06066044' as const,
    zhejiangSikuScanPages: 304 as const,
    zhejiangSikuOriginal1578Print: false as const,
    zhejiangSikuFocalImageRead: false as const,
    newMingPrintedWitnessCredit: 0 as const,
  }),
  directOriginalMingCopyCountUnchanged: 2 as const,
  additionalIndependentMingWoodblocksEstablished: 0 as const,
  yueFeiHistoricalHourVerified: false as const,
  yuanhaiWeiOrWoodArchetypeEstablished: false as const,
  modernAnnualReadingAuthorized: false as const,
  productionAuthorized: false as const,
});


/**
 * Printed Qing comparison bounded by supplied Harvard facsimile screenshots:
 * section starts on PDF p14 and passes to Jia-Yin on p15. No 岳飛 is visible
 * in the inspected 甲子日己巳時 example group, unlike both inspected Ming scans.
 * Screenshots are NOT a complete independent archive of the original PDF.
 */
/**
 * PROVENANCE CORRECTION: screenshot pp14-15 came from Japan's National
 * Archives 305-0295, subject/book 0008, NOT Harvard DRS 53262215.
 * See research document §18.24. Harvard is a separate uninspected lead.
 */
export const YUANHAI_SANMING_JAPAN_QING_JUAN8_LOCAL_COLLATION = Object.freeze({
  work: '三命通會' as const,
  sourceInstitution: 'National Archives of Japan, Cabinet Library' as const,
  officialCatalogUrl: 'https://www.digital.archives.go.jp/file/en/1076363.html' as const,
  catalogReferenceCode: '305-0295' as const,
  catalogBookOrder: '0008' as const,
  catalogSubjectNumber: '0008' as const,
  catalogBookCount: 12 as const,
  catalogImprintDescription: '刊本（序刊）清雍正13年' as const,
  catalogCorrector: '蔣國祥' as const,
  japaneseViewerPageCount: 126 as const,
  localScreenshots: Object.freeze([
    Object.freeze({
      filename: 'image(20261014-052848).png' as const,
      viewerPageOneBased: 14 as const,
      byteCount: 626435 as const,
      sha256: 'bcddbf9825f5e1b0e4eebeced59dacdd7fd5f4316d7c9ad9cc9612931c8334cb' as const,
      observedLocus: '六甲日己巳時斷 / 甲子日己巳時' as const,
    }),
    Object.freeze({
      filename: 'image(20261014-053300).png' as const,
      viewerPageOneBased: 15 as const,
      byteCount: 611750 as const,
      sha256: '1dc33d3090326226c0a80f45d35b830e233f541a9483496b951e8c441a122a3c' as const,
      observedLocus: '甲子日己巳時 examples end; 甲寅日己巳時 begins' as const,
    }),
  ] as const),
  laterSameJapanPage15Recapture: Object.freeze({
    filename: 'image(20261014-060303).png' as const,
    sha256: '083fdd0e765abe3c93ee149cda1d36d511e3685ae481dafec7a2c5bed45eca72' as const,
    siftCandidateMatches: 1918 as const,
    ransacInliers: 1917 as const,
    newIndependentPrintedWitnessAdded: 0 as const,
  }),
  localLocus: '甲子日己巳時' as const,
  namedMingCase: '岳飛癸未乙卯甲子己巳' as const,
  nameYueFeiVisibleInExaminedJapaneseLocalPassage: false as const,
  nameYueWuMuVisibleInExaminedJapaneseLocalPassage: true as const,
  matchingNamedFourPillarsVisibleInJapaneseLocalPassage: false as const, // no continuous Ming-style line
  splitNameYueWumuPrintedInTable: true as const,
  yearMonthPairWithName: Object.freeze(['癸未', '乙卯'] as const),
  priorJapaneseOmissionClaimRetracted: true as const,
  visualGrade: 'A_printed_leaf_screenshot_locus_limited' as const,
  screenshotsCoverWholeBook: false as const,
  japanEntireBookOmissionProved: false as const,
  editorialDeletionIntentProved: false as const,
  japaneseSourceOriginalPdfBytesObtained: false as const,
  independentQingPrintSettingsEstablished: false as const,
  uninspectedHarvardCatalog: Object.freeze({
    institution: 'Harvard-Yenching Library' as const,
    repositoryRecordId: '53262215' as const,
    commonsUrl: 'https://commons.wikimedia.org/wiki/File:Harvard_drs_53262215_%E4%B8%89%E5%91%BD%E9%80%9A%E6%9C%83_v.8%E5%8D%B7%E4%B9%8B%E5%85%AB.pdf' as const,
    catalogPageCount: 126 as const,
    catalogEdition: '清雍正十三年(1735?)補刻本' as const,
    catalogPageLayout: '10_lines_20_characters' as const,
    targetOriginalImageVisuallyInspected: true as const,
    samePhysicalPrintAsJapanEstablished: false as const,
    nameAbsentFromFocalPassageProved: false as const,
    splitNameYueWumuPrintedInTable: true as const,
    HarvardPage14Sha256: '7f08253073244977cb43e54000c772b4581e5de31b910b7629601759245c1aa8' as const,
    HarvardPage15Sha256: '458e4d15c001086a8800bbfd65b4e138556072ce704a7a7e5f2d16a7a9ba1074' as const,
    newPrintedWitnessCredit: 1 as const, // separate Qing material copy, independent blocks unresolved
  }),
  HY1521SameSpecificJapanCopyProved: false as const,
  modernAnnualPriorityAuthorized: false as const,
  historicalYueFeiBirthHourVerified: false as const,
  mingYuanhaiWeiVsWoodArchetypeResolved: false as const,
  additionalDirectMingPrintWitnesses: 0 as const,
  productionAuthorized: false as const,
});


/** Qing images: 岳武穆 split as 岳武 / 穆 in the table, not absent. */
export const YUANHAI_SANMING_QING_YUEWUMU_TWO_COPY_PRINT_AUDIT = Object.freeze({
  person: '岳飛' as const,
  printedName: '岳武穆' as const,
  target: '甲子日己巳時' as const,
  twoLinePrintedName: Object.freeze(['岳武', '穆'] as const),
  yearMonthInTable: Object.freeze(['癸未', '乙卯'] as const),
  dayHourFromSection: Object.freeze(['甲子', '己巳'] as const),
  Harvard: Object.freeze({
    drsId: '53262215' as const,
    page14: 'image(20261014-063703).png' as const,
    page14Bytes: 582065 as const,
    page14Sha256: '7f08253073244977cb43e54000c772b4581e5de31b910b7629601759245c1aa8' as const,
    page15: 'image(20261014-063345).png' as const,
    page15Bytes: 547034 as const,
    page15Sha256: '458e4d15c001086a8800bbfd65b4e138556072ce704a7a7e5f2d16a7a9ba1074' as const,
    targetCasePrintedNameDirectlyRead: true as const,
    fullOriginalPdfBytesObtained: false as const,
  }),
  Japan: Object.freeze({
    officialUrl: 'https://www.digital.archives.go.jp/file/en/1076363.html' as const,
    callmark: '305-0295' as const,
    physicalBook: 8 as const,
    page14Sha256: 'bcddbf9825f5e1b0e4eebeced59dacdd7fd5f4316d7c9ad9cc9612931c8334cb' as const,
    page15Sha256: '1dc33d3090326226c0a80f45d35b830e233f541a9483496b951e8c441a122a3c' as const,
    targetCasePrintedNameDirectlyRead: true as const,
  }),
  SikuReceivedText: Object.freeze({
    url: 'https://zh.wikisource.org/zh-hant/%E4%B8%89%E5%91%BD%E9%80%9A%E6%9C%83_(%E5%9B%9B%E5%BA%AB%E5%85%A8%E6%9B%B8%E6%9C%AC)/%E5%8D%B708' as const,
    observedFlattening: '癸未岳武 戊寅布政 甲子通判 癸酉指揮乙卯 穆 己未 癸酉 丁巳' as const,
    evidenceTier: 'C_received_transcription' as const,
  }),
  samePrintLayoutObserved: true as const,
  comparedHarvardJapanPage14FeatureMatches: 345 as const,
  comparedHarvardJapanPage14HomographyInliers: 196 as const,
  distinctPhotoCaptureObserved: true as const,
  identicalWoodblockProved: false as const,
  independentWoodblockProved: false as const,
  fourPillarTableColumnsFullyAdjudicated: false as const,
  priorOmissionClaimRetracted: true as const,
  QingPhysicalCopiesWithNamedCase: 2 as const,
  newMingPrintedWitnessCredit: 0 as const,
  historicalBirthHourAuthenticated: false as const,
  yuanhaiWeiWoodVariantArchetypeEstablished: false as const,
  modernAnnualSemanticsAuthorized: false as const,
  productionAuthorized: false as const,
});


/**
 * Column-safe collation of the Yue Wumu small-font chart. The named year and
 * month come from two aligned TABLE rows, whereas Jiazi/Jisi are the SECTION
 * day/hour. An adjacent "甲子通判" belongs to another exemplar and MUST NOT
 * be silently counted as a second Yue Fei day/column source.
 *
 * This is the evidence ROUTE, not proof of a historically accurate natal hour.
 */
export const YUANHAI_SANMING_QING_YUEWUMU_COLUMN_SAFE_COLLATION = Object.freeze({
  locus: '甲子日己巳時' as const,
  targetFigure: '岳武穆' as const,
  historicalFigure: '岳飛' as const,
  printedTableTarget: Object.freeze({
    observedOriginalImages: Object.freeze([
      'Harvard DRS 53262215 PDF p.14: image(20261014-063703).png',
      'Japan N.A. 305-0295 book 8 viewer p.14: image(20261014-052848).png',
    ] as const),
    rowOneYearAndName: Object.freeze({ printedYear: '癸未' as const, firstNameFragment: '岳武' as const }),
    rowTwoMonthAndName: Object.freeze({ printedMonth: '乙卯' as const, lastNameFragment: '穆' as const }),
    joinedNameIsNotLiterallyOneUnbrokenVerticalString: true as const,
    tableDirectPrintImageEvidenceTier: 'A_scope_bounded_printed_leaf' as const,
    rowToSingleFigurePairingFromVisualAlignment: true as const,
    allOriginalTableCellsColumnByColumnVerified: false as const,
  }),
  sectionContext: Object.freeze({
    sectionDay: '甲子' as const,
    sectionHour: '己巳' as const,
    sectionLiteral: '甲子日己巳時' as const,
    dayAndHourNotSeparateTableGlyphsForYueWumu: true as const,
    evidenceTier: 'A_scope_bounded_printed_leaf' as const,
  }),
  contextualFourPillars: Object.freeze(['癸未','乙卯','甲子','己巳'] as const),
  contextualCombinationMethod: 'printed_named_year_month_pair_plus_heading_day_hour' as const,
  MingOriginalCorroboration: Object.freeze({
    NLC: 'NLC892-411999029701-66492 PDF p.14' as const,
    NCL: 'NCL-06589_1 PDF p.654' as const,
    printedContinuousNameAndFourPillars: '岳飛癸未乙卯甲子己巳' as const,
    printedDirectEvidenceTier: 'A_original_printed_page' as const,
  }),
  receivedSikuTableText: Object.freeze({
    url: 'https://zh.wikisource.org/zh-hant/%E4%B8%89%E5%91%BD%E9%80%9A%E6%9C%83_(%E5%9B%9B%E5%BA%AB%E5%85%A8%E6%9B%B8%E6%9C%AC)/%E5%8D%B708' as const,
    namedFirstColumnFlattened: '癸未岳武 / 乙卯穆' as const,
    adjacentSecondColumn: Object.freeze({ year: '戊寅' as const, month: '己未' as const, figure: '布政' as const }),
    adjacentThirdColumn: Object.freeze({ year: '甲子' as const, month: '癸酉' as const, figure: '通判' as const }),
    adjacentFourthColumn: Object.freeze({ year: '癸酉' as const, month: '丁巳' as const, figure: '指揮' as const }),
    CtextOnlyNeighborColumnsWereNotIndependentlyTranscribedFromHighResPrint: true as const,
    evidenceTier: 'C_received_transcription' as const,
    adjoiningCaseJiaziIsNotYueFeiDayOrYear: true as const,
  }),
  editedNoNamedChartsWebpage: Object.freeze({
    url: 'https://zh.wikisource.org/zh-hant/%E4%B8%89%E5%91%BD%E9%80%9A%E6%9C%83/%E5%8D%B7%E5%85%AB' as const,
    sameTargetHeadingAndGenericExpositionDisplayed: true as const,
    exampleChartsOmittedInDisplayedEdition: true as const,
    noLiteralYueFeiOrYueWumuInDisplayedTargetText: true as const,
    lackOfPrintedOriginalExampleEstablished: false as const,
    deliberateQingDeletionEstablished: false as const,
    rank: 'C_edited_text_presentation_not_original_print' as const,
  }),
  fullySourceAutonomousQingFourPillarCaseWithoutSectionContext: false as const,
  historicBirthHourAuthenticated: false as const,
  qingWoodblockIndependenceProved: false as const,
  newMingPrintedWitnessCredit: 0 as const,
  yuanhaiVariantArchetypeChosen: false as const,
  modernAnnualReadingAuthorized: false as const,
  productionAuthorized: false as const,
});


/**
 * Direct ORIGINAL-PDF collation of four consecutive 卷八 openings, NLC pp13-16
 * to Taiwan NCL 06589 pp653-656. The BF result is reproducible using the
 * research script and original PDF SHA256 keys below. HIGH geometric
 * correspondence is NOT proof that the two physical books were printed from
 * the very same woodblocks; low-resolution NCL pages obscure microscopic
 * cutting flaws needed to test unique-block identity.
 */
export const YUANHAI_SANMING_MING_NLC_NCL_FOUR_OPENINGS_BLOCK_AUDIT = Object.freeze({
  originalCopiesCompared: 2 as const,
  printedJuan: 8 as const,
  sourceCopies: Object.freeze({
    nlc: Object.freeze({
      sourceId: 'NLC892-411999029701-66492' as const,
      boundBook: 15 as const,
      pdfPages: 57 as const,
      pdfSha256: '009396f2dfd848194d7fa73c6e02ea51c010d3a9f0d5f3eb83be35d6b6a2e777' as const,
      targetPage: 14 as const,
      embeddedPrintImageDimensionsPx: Object.freeze([4192, 3523] as const),
      capture: 'separate_NLC_grayscale_scan' as const,
    }),
    ncl: Object.freeze({
      sourceId: 'NCL-06589' as const,
      pdfPages: 1000 as const,
      pdfSha256: '3de5c45efb1919965afae00a3c97121054aaabd0f38f9fd5ab8f0a28bb8e36dd' as const,
      targetPage: 654 as const,
      embeddedPrintImageDimensionsPx: Object.freeze([842, 586] as const),
      capture: 'separate_NCL_color_scan_with_ruler_and_annotations' as const,
    }),
  }),
  layoutPairs: Object.freeze([
    Object.freeze({ nlcPage: 13 as const, nclPage: 653 as const, left: Object.freeze({ candidates: 215 as const, inliers: 200 as const }), right: Object.freeze({ candidates: 57 as const, inliers: 34 as const }) }),
    Object.freeze({ nlcPage: 14 as const, nclPage: 654 as const, left: Object.freeze({ candidates: 174 as const, inliers: 142 as const }), right: Object.freeze({ candidates: 86 as const, inliers: 73 as const }) }),
    Object.freeze({ nlcPage: 15 as const, nclPage: 655 as const, left: Object.freeze({ candidates: 201 as const, inliers: 177 as const }), right: Object.freeze({ candidates: 81 as const, inliers: 63 as const }) }),
    Object.freeze({ nlcPage: 16 as const, nclPage: 656 as const, left: Object.freeze({ candidates: 160 as const, inliers: 129 as const }), right: Object.freeze({ candidates: 97 as const, inliers: 70 as const }) }),
  ] as const),
  reproducibleDeterministicBfAudit: Object.freeze({
    methodology: 'PyMuPDF 1.75x + CLAHE(clip2.0/tile10) + SIFT(nfeatures1200/contrast0.018/edge15) + BF-L2 Lowe0.70 + RANSAC(3px/max10000/conf0.995)' as const,
    matchingHalfPages: 8 as const,
    matchCandidates: 1071 as const,
    geometricInliers: 888 as const,
    inlierFractionApprox: 0.82913 as const,
    wrongPageOffsetHalfPageControls: 16 as const,
    wrongPageMaxInliers: 15 as const,
    wrongPageMedianInliers: 6 as const,
    deterministicRerunConfirmed: true as const,
    cropAndAlgorithmGivenInResearchScript: true as const,
  }),
  higherFeatureCountCrossCheck: Object.freeze({
    method: 'SIFT nfeatures8500 / FLANN Lowe0.70 / RANSAC3px' as const,
    matchingHalfPages: 8 as const,
    matchCandidates: 4522 as const,
    geometricInliers: 3805 as const,
    maximumWrongPageInliers: 25 as const,
  }),
  imageInkOverlayCrossCheck: Object.freeze({
    comparedHalves: 8 as const,
    method: 'registered_gray_adaptive_ink_F1_with_2px_dilation_tolerance' as const,
    minimumScore: 0.9275 as const,
    maximumScore: 0.9725 as const,
    notIdenticalDigitalScanProof: true as const,
    sensitiveToRenderingThresholdAndInkDensity: true as const,
  }),
  printedNameExampleBoth: '岳飛癸未乙卯甲子己巳' as const,
  fourAdjacentPrintOpeningsShareDetailedTypesetting: true as const,
  twoIndependentMaterialScanCaptures: true as const,
  strongSameSettingOrFaithfulSamePlateTradition: true as const,
  independentlyReengravedPageSettingDemonstrated: false as const,
  microscopicSharedCuttingDefectsEstablished: false as const,
  sameHistoricalWoodblockSetProved: false as const,
  distinctHistoricalWoodblockSetsProved: false as const,
  additionalDirectMingCopiesAdded: 0 as const,
  additionalIndependentMingWoodblockSetsEstablished: 0 as const,
  mingNlcNclPhysicalCopyCountRemains: 2 as const,
  actualYueFeiBirthHourAuthenticated: false as const,
  yuanhaiWeiWoodArchetypeResolved: false as const,
  modernAnnualRulePriorityAuthorized: false as const,
  productionAuthorized: false as const,
});


/**
 * Yue Fei's grandson 岳珂 (Southern Song) supplies a named birth date in
 * 金佗稡編 卷四, a different genre from Ming/Qing horoscopic examples.
 *
 * The actually read content comes from derivative transcription of 四庫全書
 * (C). Original printed leaf candidates exist but the focal folios have NOT
 * been downloaded/inspected, and are never counted as A evidence.
 */
export const YUANHAI_YUEFEI_FAMILY_BIRTHDATE_SOURCE_AUDIT = Object.freeze({
  historicalPerson: '岳飛' as const,
  familyChronicler: '岳珂' as const,
  sourceTitle: '金佗稡編' as const,
  sourceSection: '卷四 行實編年一 崇寧二年' as const,
  manuscriptOrPrintedWitnessDirectlyInspected: false as const,
  sourceTimeOfComposition: 'Southern Song, later than 岳飛; exact historical autograph uninspected' as const,
  receivedSikuFamilyText: Object.freeze({
    Wikisource: 'https://zh.wikisource.org/zh/%E9%87%91%E4%BD%97%E7%A8%A1%E7%B7%A8_%28%E5%9B%9B%E5%BA%AB%E5%85%A8%E6%9B%B8%E6%9C%AC%29/%E5%8D%B704' as const,
    Wenlinshe: 'https://www.wenlinshe.com/chapter/skqs_shibu/jin-tuo-zui-bian/juan-04.html' as const,
    firstChronicleYearHeading: '崇寜二年癸未歲' as const,
    birthDateExactPhrase: '二月十五日先臣生名飛字鵬舉' as const,
    birthYearSexagenary: '癸未' as const,
    birthLunarMonthOrdinal: 2 as const,
    birthLunarDayOrdinal: 15 as const,
    explicitBirthDayRecorded: true as const,
    explicitBirthHourHeavenlyStemOrEarthlyBranchInThisLocus: false as const,
    twoDerivativeWebTextCopiesCountAsIndependentPrintedWitnesses: 0 as const,
    evidenceTier: 'C_transmitted_late_source_text_not_verified_original_leaf' as const,
  }),
  descriptiveNightMotif: Object.freeze({
    observedExactClause: '及生先臣之夕有大禽若鵠自東南來飛鳴于寢室之上' as const,
    literalNightOfBirthNarrativePresent: true as const,
    birdNarrativeIsBirthClockRecord: false as const,
    birthAtNightEstablishedFromClause: false as const,
    birthDuringMorningSiHourContradictedAsProvenFact: false as const,
    provenanceCaveat: 'Auspicious-bird narrative; event timing cannot be mechanically equated with delivery shichen' as const,
  }),
  newlyLocatedOriginalPrintLeads: Object.freeze([
    Object.freeze({
      repository: 'Zhejiang Library, ZJLib' as const,
      catalogFileId: 'ZJLib-631aa105504e722bfaf23b1c-2' as const,
      originalBookOrder: 2 as const,
      printedJuanIncluded: Object.freeze([3,4] as const),
      commonsIndex: 'https://commons.wikimedia.org/wiki/Commons:Library_back_up_project/file_list/ZJLib/03' as const,
      actualBirthFolioOriginalImageRead: false as const,
      physicalPrintingYearIndependentlyAuthenticated: false as const,
      additionalDirectWitnessCredit: 0 as const,
    }),
    Object.freeze({
      repository: 'National Library of China' as const,
      catalogFileId: 'NLC892-0405-207140' as const,
      originalBookOrder: 2 as const,
      commonsIndex: 'https://commons.wikimedia.org/wiki/Commons:Library_back_up_project/file_list/NLC/%E6%95%B8%E5%AD%97%E5%8F%A4%E7%B1%8D/01' as const,
      originalBookTwoContainsBirthLocusIndependentlyConfirmed: false as const,
      actualBirthFolioOriginalImageRead: false as const,
      additionalDirectWitnessCredit: 0 as const,
    }),
  ] as const),
  distinctClaims: Object.freeze({
    familySourceYearAndLunarDayReported: true as const,
    divinationMingPrintNamedFourPillarsRecorded: true as const,
    horoscopicWitnessDirectlyHistoricalBirthTime: false as const,
    birthHourSiShiInFamilySource: false as const,
    familyChronicleProvesYueFeiHistoricalJiSiHour: false as const,
    historicalBirthHourKnownFromCollatedOriginals: false as const,
  }),
  newDirectOriginalLeafWitnesses: 0 as const,
  newIndependentWoodblockSets: 0 as const,
  printedMingSanmingPhysicalCopyCountUnchanged: 2 as const,
  mingWanliWeiVsChongzhenWoodArchetypeSelected: false as const,
  annualReadingGlobalSemanticsAuthorized: false as const,
  productionAuthorized: false as const,
});


/**
 * In 元修 宋史 卷365, 飛生時 means "when Fei was born", NOT 巳時,
 * and a shared miraculous bird narrative is not an independent natal clock.
 * Read texts are 四庫-transmitted electronic transcriptions (C); no printed
 * birth folio was opened in this step.
 */
export const YUANHAI_YUEFEI_SONGSHI_BIRTH_SHI_NOT_SI_AUDIT = Object.freeze({
  sourceWork: '宋史' as const,
  sourceChapter: '卷三百六十五 列傳第一百二十四 岳飛' as const,
  transmittedTextReference: 'https://wk.100ke.info/wiki/%E5%AE%8B%E5%8F%B2/%E5%8D%B7365' as const,
  compiledEra: 'Yuan dynasty historical compilation' as const,
  originalPrintedBirthFolioInspected: false as const,
  excerpt: Object.freeze({
    firstPhrase: '岳飛字鵬舉，相州湯陰人' as const,
    birthBirdPhrase: '飛生時，有大禽若鵠，飛鳴室上，因以為名' as const,
    writtenGenericTimeCharacter: '時' as const,
    earthBranchCharacterNotPresent: '巳' as const,
    meaningOfShengShi: 'when Yue Fei was born' as const,
    matchesAstronomicalShichenSi: false as const,
    explicitJisiHourInBirthPassage: false as const,
    explicitLunarBirthdayInOpeningPassage: false as const,
    evidenceTier: 'C_received_digital_source_transcription' as const,
  }),
  familyChronicleParallel: Object.freeze({
    workAndLocus: '金佗稡編 卷四 行實編年一' as const,
    datedBirth: '崇寜二年癸未歲; 二月十五日先臣生' as const,
    birdMotif: '及生先臣之夕有大禽若鵠自東南來飛鳴于寢室之上' as const,
    birdAtEveningProvesBirthTimeAtNight: false as const,
    preciselySameManuscriptLineageDemonstrated: false as const,
  }),
  sourceCriticalOutcome: Object.freeze({
    overlappingBirdMotif: true as const,
    directTextualDependenceProved: false as const,
    independentHistoricalBirthHourWitnessesCounted: 0 as const,
    notASecondIndependentAttestationOfJiSiBirthHour: true as const,
    familyLunarDateStillKnownOnlyFromTransmittedText: true as const,
    actualHistoricalShichenAuthenticated: false as const,
  }),
  newlyInspectedPrintedHistoricalBirthFolios: 0 as const,
  preexistingMingDivinationJiSiExampleIntact: true as const,
  yuanhaiWeiVsWoodArchetypeChosen: false as const,
  annualReadingRulesAuthorized: false as const,
  productionAuthorized: false as const,
});


/**
 * 四庫館臣提要 is a bibliographic transmitted testimony of gaps and
 * reimpressions, NOT access to Song 1218 or Yuan 1363 original woodblocks.
 * No automatic assumption that a current 四庫 transcription preserves every
 * birth-locus detail from an earlier lost autograph.
 */
export const YUANHAI_JINTUO_HISTORICAL_TRANSMISSION_PROVENANCE_AUDIT = Object.freeze({
  work: '金佗稡編' as const,
  originalCompiler: '岳珂' as const,
  receivedBibliographicalWitness: Object.freeze({
    title: '欽定四庫全書 史部七 傳記類二 金佗稡編提要' as const,
    onlineText: 'https://zh.wikisource.org/zh/%E9%87%91%E4%BD%97%E7%A8%A1%E7%B7%A8_%28%E5%9B%9B%E5%BA%AB%E5%85%A8%E6%9B%B8%E6%9C%AC%29' as const,
    alternativeText: 'https://www.shidianguji.com/zh/book/SK0885/chapter/1lllkts9w2yor' as const,
    prefaceExamYear: 1781 as const,
    witnessType: 'Qianlong editorial bibliographic report in a received late text' as const,
    evidenceTier: 'C_critical_bibliographical_transcription' as const,
    originalPrefacePrintedLeafInspected: false as const,
  }),
  reportedSequence: Object.freeze([
    Object.freeze({ era: 'Southern Song' as const, year: 1218 as const, report: '稡編成於嘉定戊寅' as const, actualEarlyPrintedBirthFolioCollated: false as const }),
    Object.freeze({ era: 'Yuan' as const, year: 1363 as const, report: '元至正二十三年重刻於浙江行省' as const, actualEarlyPrintedBirthFolioCollated: false as const }),
    Object.freeze({ era: 'Ming Jiajing' as const, year: null, report: '明嘉靖中刻本並仍其舊' as const, actualEarlyPrintedBirthFolioCollated: false as const }),
    Object.freeze({ era: 'Qing Qianlong' as const, year: 1781 as const, report: '乾隆四十六年九月恭校上' as const, actualEarlyPrintedBirthFolioCollated: false as const }),
  ] as const),
  editionLossReport: Object.freeze({
    sourceExcerpt: '舊本佚缺，徧求四方，得其殘編斷簡，參互考訂' as const,
    continuingEditorialConcern: '書中脱簡闕文，時時而有' as const,
    reportsOlderCopyIncomplete: true as const,
    particularYueFeiBirthPhraseChangedByGapEstablished: false as const,
    earliestBirthChapterAutographSurvivedAndRead: false as const,
    sonlySong1218CompositionProvesAllCurrentWordsAutograph: false as const,
  }),
  sourceCriticalConclusions: Object.freeze({
    QianlongReceivedTextHasFamilyBirthDate: true as const,
    medievalToLateTransmittedChainRecordedButUncollated: true as const,
    birthLunarDateHistoricalOriginalAProved: false as const,
    originalBirthHourJisiAuthenticated: false as const,
    independentOriginalPrintedFocalWitnessesAdded: 0 as const,
    userInstitutionalRequestRequiredToContinueOtherResearch: false as const,
  }),
  printedMingSanmingWitnessCountRemains: 2 as const,
  WanliWeiOrChongzhenWoodArchetypeChosen: false as const,
  annualRuleSemanticsApproved: false as const,
  productionAuthorized: false as const,
});


/** Ming 1600 未 and 1634 木: distinguish printed characters from interpretive hypotheses. */
export const YUANHAI_YANGREN_WEI_MU_LEXICAL_GUARD = Object.freeze({
  locus: '淵海子平 論羊刃 又如癸未乙卯甲子己巳 運行辛亥' as const,
  printVariants: Object.freeze([
    Object.freeze({
      edition: '1600 Wanli 刻京臺增補淵海子平大全' as const,
      printedJuan: 3 as const,
      nlcFileId: 'NLC892-2642-210288' as const,
      pdfPage: 11 as const,
      originalPrintedText: '亥卯未合起羊刃' as const,
      pivotGlyph: '未' as const,
      glyphClass: '地支' as const,
      grade: 'A_direct_focal_print' as const,
    }),
    Object.freeze({
      edition: '1634 Chongzhen 新刊合併官板音義評注淵海子平' as const,
      printedJuan: 2 as const,
      nlcFileId: 'NLC892-411999032112-149611' as const,
      pdfPage: 19 as const,
      originalPrintedText: '亥卯木合起羊刃' as const,
      pivotGlyph: '木' as const,
      glyphClass: '五行' as const,
      samePrintedParagraphHasClearWei: '癸未' as const,
      grade: 'A_direct_focal_print_distinct_setting' as const,
    }),
  ] as const),
  onlineTranscriptionsNotOriginals: Object.freeze([
    Object.freeze({url:'https://www.shidianguji.com/zh/mid-page/7603864294308413466' as const,variant:'木' as const,newPhysicalPrintCredit:0 as const}),
    Object.freeze({url:'https://www.btko.net/Show-59' as const,variant:'未' as const,newPhysicalPrintCredit:0 as const}),
    Object.freeze({url:'https://sajumania.com/ebook/to01-06/to01-06-02-14.htm' as const,variant:'未' as const,newPhysicalPrintCredit:0 as const}),
  ] as const),
  literalMuIsNotAnEarthlyBranch: true as const,
  possibleMuAsWoodCombinationShorthand: 'hypothesis_unproven' as const,
  possibleMuFromMiscarvedOrEditedWei: 'hypothesis_unproven' as const,
  directProofOfEditingIntention: false as const,
  earliestArchetypeReadingEstablished: false as const,
  derivativeTextMajorityVoteAuthorized: false as const,
  qingOrModernSemanticsOverridePrintedGlyph: false as const,
  threeBranchClashPriorityAuthorized: false as const,
  distinctDirectPrintSettings: 2 as const,
  independentCopyOfWanliBlocksEstablished: false as const,
  historicallyAuthenticatedYueFeiHour: false as const,
  modernAnnualMeaningAuthorized: false as const,
  productionAuthorized: false as const,
});


/**
 * The Ming (1542/1558) and Yuan (1363) Jintuo printed collections are now
 * located in downloadable Wikimedia Commons catalog/file listings.
 * The target 卷四 leaf has NOT been visually collated; no source upgrade to A.
 * File presence != access verification != original folio read.
 */
export const YUANHAI_JINTUO_PREQING_ORIGINAL_PRINT_CANDIDATES = Object.freeze({
  objective: 'Find earliest material leaf for 岳珂 金佗稡編 卷四 崇寧二年 二月十五日 岳飛 birth date' as const,
  actualTargetLeafImageRead: false as const,
  originalPdfByteHashesRecorded: false as const,
  confirmedMaterialPrintedBirthDateWitnessesAdded: 0 as const,
  candidates: Object.freeze([
    Object.freeze({
      holdingInstitution: 'National Central Library, Taiwan' as const,
      catalogCallmark: '205.24 02714' as const,
      commonsFilename: 'NCL-02714 1 鄂國金陀稡編.pdf' as const,
      filePage: 'https://commons.wikimedia.org/wiki/File:NCL-02714_1_%E9%84%82%E5%9C%8B%E9%87%91%E9%99%80%E7%A8%A1%E7%B7%A8.pdf' as const,
      catalogImprint: '元至正二十三年(1363)西湖書院刊本' as const,
      pdfPagesOnFileRecord: 972 as const,
      pdfSizeMbApprox: 125.59 as const,
      person: '岳珂' as const,
      exactBirthJuanFourLeafWithinThisSpecificPdfEstablished: false as const,
      exactPdfPageOfBirthRecorded: null,
      physicalLeafDateCharactersRead: false as const,
      physicalLeafBirthHourCharactersRead: false as const,
      catalogIsMetadataNotPhysicalGlyph: true as const,
    }),
    Object.freeze({
      holdingInstitution: 'National Central Library, Taiwan' as const,
      catalogCallmark: '205.24 02720' as const,
      commonsFilename: 'NCL-02720 鄂國金佗稡編.pdf' as const,
      filePage: 'https://commons.wikimedia.org/wiki/File:NCL-02720_%E9%84%82%E5%9C%8B%E9%87%91%E4%BD%97%E7%A8%A1%E7%B7%A8.pdf' as const,
      catalogImprint: '明嘉靖21年(1542)洪富刊, 嘉靖37年(1558)黃日敬修補本' as const,
      pdfPagesOnFileRecord: 612 as const,
      pdfSizeMbApprox: 210.74 as const,
      person: '岳珂' as const,
      exactBirthJuanFourLeafWithinThisSpecificPdfEstablished: false as const,
      exactPdfPageOfBirthRecorded: null,
      physicalLeafDateCharactersRead: false as const,
      physicalLeafBirthHourCharactersRead: false as const,
      catalogIsMetadataNotPhysicalGlyph: true as const,
    }),
    Object.freeze({
      holdingInstitution: 'Zhejiang Library, China' as const,
      catalogCallmark: 'ZJLib-631aa105504e722bfaf23b1c-2' as const,
      commonsFilename: 'ZJLib-631aa105504e722bfaf23b1c-2 鄂國金佗稡編二十八卷續編三十卷 第2冊.pdf' as const,
      catalogListingUrl: 'https://commons.wikimedia.org/wiki/Commons:Library_back_up_project/file_list/ZJLib/03' as const,
      catalogImprint: '明嘉靖21年(1542)刊, 嘉靖37年(1558)重修本' as const,
      bookNumber: 2 as const,
      printedJuanNumbersListed: Object.freeze([3, 4] as const),
      exactBirthJuanFourLeafWithinThisSpecificPdfEstablished: false as const,
      exactPdfPageOfBirthRecorded: null,
      physicalLeafDateCharactersRead: false as const,
      physicalLeafBirthHourCharactersRead: false as const,
      samePhysicalScanAsTaiwanNCL02720Established: false as const,
      identicalWoodblocksAsTaiwanNCL02720Established: false as const,
      catalogIsMetadataNotPhysicalGlyph: true as const,
    }),
  ] as const),
  datingScope: Object.freeze({
    SongCompilationReportedYear: 1218 as const,
    YuanCatalogPrintedYear: 1363 as const,
    MingCatalogInitialEditionYear: 1542 as const,
    MingCatalogRepairYear: 1558 as const,
    printedWitnessFromSongCompilationYearActuallyRead: false as const,
    catalogPublicationDateNotAProofOfLiteralBirthDateText: true as const,
    versionAgreementCannotBeAssertedUntilFocalLeavesCompared: true as const,
    YuanToMingCopyLineageIndependent: false as const,
  }),
  directlyReadReceivedSikuChapterFourStillTier: 'C_transmitted_online_text' as const,
  distinctMingSanmingPrintsAlreadyRead: 2 as const,
  historicalSiBirthHourAuthenticated: false as const,
  earlierYuanWitnessPresenceProvesAuthenticityOfBirthClock: false as const,
  yuanhaiWeiMuArchetypeSolved: false as const,
  modernAnnualSemanticsAuthorized: false as const,
  productionAuthorized: false as const,
});

/**
 * 2026-10-15: source-limited access and bibliographic/OCR cross-check.
 * These are catalog and digital-display records, not newly inspected leaves.
 * Distinct catalog numbers, scan files, print settings, and historical
 * woodblock identities have different denominators.
 */
export const YUANHAI_JINTUO_20261015_ACCESS_AND_CATALOG_AUDIT = Object.freeze({
  ncl02714: Object.freeze({
    catalogCallmark: '205.24 02714' as const,
    registeredYuanEditionYear: 1363 as const,
    catalogedPdfPages: 972 as const,
    pdfBytesObtainedThisPass: false as const,
    birthFolioVisuallyReadThisPass: false as const,
    sha256: null,
  }),
  ncl02720: Object.freeze({
    catalogCallmark: '205.24 02720' as const,
    registeredMingEditionYear: 1542 as const,
    registeredMingRepairYear: 1558 as const,
    catalogedPdfPages: 612 as const,
    pdfBytesObtainedThisPass: false as const,
    birthFolioVisuallyReadThisPass: false as const,
    sha256: null,
  }),
  additionalHoldingRecords: Object.freeze({
    ncl02719: Object.freeze({
      catalogCallmark: '205.24 02719' as const,
      officialCatalogEdition: '明嘉靖壬寅(1542)兩浙鹽運使洪富刊鈔補本' as const,
      differentCatalogRecordFromNcl02720: true as const,
      actualBirthFolioRead: false as const,
      independentlyPrintedBirthFolioProved: false as const,
    }),
    nlc0405: Object.freeze({
      commonsListingBookTwoId: 'NLC892-0405-207140' as const,
      physicalBookNumberOnListing: 2 as const,
      volumeFourInThisPhysicalBookProved: false as const,
      actualBirthFolioRead: false as const,
      separatePrintSettingEstablished: false as const,
    }),
  }),
  additionalOcrDisplay: Object.freeze({
    shidianBookId: 'NGJ892412004000566116120' as const,
    displayedPortalChapterTitle: '卷六' as const,
    displayedBodyJuanHeading: '鄂國金佗稡編卷第四' as const,
    displayedYear: '崇寧二年癸未歲' as const,
    displayedBirthDateText: '二月十五日，先臣生，名飛，字鵬舉' as const,
    physicallyLinkedSourceFascicleIdentified: false as const,
    originalGlyphVisuallyVerified: false as const,
    digitalTextIsIndependentWoodblockProof: false as const,
  }),
  directNewFamilyBirthFolioEvidenceTierACount: 0 as const,
  accessFailureDoesNotProvePassageAbsent: true as const,
  printedEditionDateDoesNotAuthenticateBirthHour: true as const,
  historicalSiBirthHourAuthenticated: false as const,
  yuanhaiWeiMuArchetypeAdjudicated: false as const,
  annualSemanticRulePromotionAuthorized: false as const,
  productionAuthorized: false as const,
});

/**
 * WYG page-break tags, transmitted nominal ages and portal OCR are research
 * controls, never direct evidence of Yuan/Ming printed birth folios.
 */
export const YUANHAI_JINTUO_WYG_FOLIO_AND_OCR_CONSISTENCY_AUDIT = Object.freeze({
  yuanNcl02714: Object.freeze({
    catalogEditionYear: 1363 as const,
    lineCountPerHalfFolio: 9 as const,
    charactersPerLine: 17 as const,
    commonsSplitFileSuffixesListed: Object.freeze([1, 2, 3] as const),
    numberedCommonsFilesAreIndependentHoldings: false as const,
    birthFolioPrintDirectlyRead: false as const,
  }),
  mingNcl02720: Object.freeze({
    catalogEditionYear: 1542 as const,
    catalogRepairYear: 1558 as const,
    lineCountPerHalfFolio: 9 as const,
    charactersPerLine: 17 as const,
    sameWoodblocksAs1363ProvedByLayout: false as const,
    birthFolioPrintDirectlyRead: false as const,
  }),
  transmittedWygText: Object.freeze({
    editionProperty: 'WYG' as const,
    sourceJuanFourFile: 'KR2g0010_004.txt' as const,
    birthDatePageTag: 'KR2g0010_WYG_004-1a' as const,
    birthDatePhrase: '二月十五日先臣生名飛字鵬舉' as const,
    birdAnecdotePageTag: 'KR2g0010_WYG_004-2a' as const,
    birdAnecdotePhrase: '及生先臣之夕有大禽若鵠' as const,
    pageTagIsYuanNclPdfPage: false as const,
    directYuanOrMingPrintGlyphEvidence: false as const,
  }),
  internalNominalAgeCrossCheck: Object.freeze({
    reportedBirthYear: 1103 as const,
    method: 'reported_seui_nominal_age_minus_birth_year_plus_one' as const,
    entries: Object.freeze([
      Object.freeze({ sourceJuan: 4 as const, reignYear: '宣和四年壬寅' as const, ceYear: 1122 as const, recordedAge: 20 as const, mechanicallyExpectedNominalAge: 20 as const }),
      Object.freeze({ sourceJuan: 4 as const, reignYear: '建炎二年戊申' as const, ceYear: 1128 as const, recordedAge: 26 as const, mechanicallyExpectedNominalAge: 26 as const }),
      Object.freeze({ sourceJuan: 8 as const, reignYear: '紹興十年庚申' as const, ceYear: 1140 as const, recordedAge: 38 as const, mechanicallyExpectedNominalAge: 38 as const }),
    ] as const),
    evidenceTier: 'D_internal_arithmetic_of_one_C_transmission' as const,
    independentHistoricalBirthWitnessAdded: 0 as const,
    historicalBirthMonthDayProvedByAge: false as const,
  }),
  otherNlcLinkedOcr: Object.freeze({
    shidianBookId: 'NGJ892411999028945160849' as const,
    displayedJuanHeading: '鄂国金佗稡编卷第四' as const,
    samePortalPageCorrectReignHeader: '崇宁二年' as const,
    samePortalPageWrongReignInBody: '七宁二年癸未岁' as const,
    displayedBirthDatePhrase: '二月十五日，先臣生，名飞，字鹏举' as const,
    sevenNingIsPrintedVariantProved: false as const,
    independentPrintWitnessEstablished: false as const,
    glyphOriginalDirectlyInspected: false as const,
  }),
  addedYuanOrMingPrintedBirthFolios: 0 as const,
  actualYuefeiJiSiHourHistoricallyAuthenticated: false as const,
  yangrenWeiMuArchetypeAuthorized: false as const,
  modernAnnualRulePromotionAuthorized: false as const,
  productionAuthorized: false as const,
});

/**
 * A pre-1600 bibliographic/textual lead in a different work, not direct
 * collation of its 1582 print leaf and not another YH source-vote.
 */
export const YUANHAI_1582_TIANJI_OCR_TEXTUAL_PARALLEL_AUDIT = Object.freeze({
  tianjiTextualCandidate: Object.freeze({
    shidianBookId: 'NA09025' as const,
    textChapter: '卷之三' as const,
    authorAttributed: '楊淙' as const,
    title: '新刊京本釐正總括天機星學正傳' as const,
    displayedFourPillarTokenWithOcrRisk: '癸未乙卯、甲子、已巳' as const,
    displayedTargetVariant: '亥卯未合起陽刅' as const,
    observedOcrPotentialConfusion: '時上出已破印' as const,
    transcriptionTier: 'C_digital_text_not_print_leaf' as const,
    ancestralEditionYearIndicatedByCatalog: 1582 as const,
    inspected1582TargetPrintedLeaf: false as const,
    sourceIndependenceFromYuanhaiUnderlyingTextProved: false as const,
    earliestAuthenticatedA_printRedatedTo1582: false as const,
    countsAsNewOriginalGlyphWitness: false as const,
  }),
  bibliographicRoutes: Object.freeze({
    sichuanWanliTenYearRaoJinxiCatalog: true as const,
    shanghaiWanliTenYearCatalog: true as const,
    shanghaiQingKangxiImpressionAlsoCataloged: true as const,
    matchedTheseHoldingsToShidianTargetLeaf: false as const,
    catalogedCarvingYearEqualsPhysicalImpressionYearProved: false as const,
    japanNationalArchivesCallNumber: '子059-0011' as const,
    japanVolumeThreeItemId: 4413954 as const,
    publicImageViewerOnSiteOnly: true as const,
    japaneseJuanThreeTargetLeafDirectlyViewed: false as const,
    japaneseBookThreeContainsJuanThreeProved: false as const,
  }),
  mingWanliNlcOcrFalseFriends: Object.freeze({
    shidianNlcBookId: 'NGJ8922642210287' as const,
    linkedCatalogPrintBookId: 'NLC892-2642-210288' as const,
    misreadPillarSubstring: '癸未乙卯甲子巳巳' as const,
    misreadHourSubstring: '時上巳巳破印' as const,
    correctlyPreservedUnTargetInOcr: '亥卯未合起羊刃' as const,
    separateFollowingContext: '亥卯未木局' as const,
    samePhysicalScanAsAlreadyAccountedNlc: true as const,
    addedIndependentPrintSettingFromOcr: false as const,
    actualPrintedSiSiVariantConfirmed: false as const,
    automaticRepairWithoutOriginalPrintAuthorized: false as const,
  }),
  sourceDatingPriority: Object.freeze({
    earliestVerifiedAOriginalYuanhaiPrintYear: 1600 as const,
    distinctVerifiedChongzhenAOriginalPrintYear: 1634 as const,
    pre1600IndependentAOriginalGlyphAdded: 0 as const,
    glyphArchetypeOfWeiMuAdjudicated: false as const,
    yuefeiHistoricalBirthHourAuthenticated: false as const,
    modernRulesApproved: 0 as const,
    productionAuthorized: false as const,
  }),
});

/**
 * This is only an inter-book C-to-C clause-order comparison.
 * Neither a second printed A leaf nor proof of independent transmission.
 */
export const YUANHAI_TIANJI_1582_VS_WANLI_1600_TEXTUAL_ALIGNMENT = Object.freeze({
  comparisonTier: 'C_digital_text_to_C_digital_text' as const,
  texts: Object.freeze({
    tianjiShidianId: 'NA09025' as const,
    yuanhaiEditedTextShidianId: 'SDZJ0626' as const,
    previouslyInspectedYuanhaiNlcOriginalPdfId: 'NLC892-2642-210288' as const,
    sourcePairIsTwoIndependentOriginalLeafReadings: false as const,
    currentYear1582PhysicalTargetLeafRead: false as const,
  }),
  pairedAnchors: Object.freeze([
    Object.freeze({ stage: 'prior_case' as const, tianjiText: '庚申、已卯、甲寅' as const, yuanhaiText: '庚申、己卯、甲寅、庚午' as const, printedVariationProved: false as const }),
    Object.freeze({ stage: 'following_quote' as const, tianjiText: '戊日午月勿作刅' as const, yuanhaiText: '戊日午月勿作刃' as const, printedVariationProved: false as const }),
    Object.freeze({ stage: 'focal_case' as const, tianjiText: '癸未乙卯、甲子、已巳' as const, yuanhaiText: '癸未乙卯、甲子、己巳' as const, printedVariationProved: false as const }),
    Object.freeze({ stage: 'focal_wei_un' as const, tianjiText: '亥卯未合起陽刅' as const, yuanhaiText: '亥卯未合起羊刃' as const, printedVariationProved: false as const }),
    Object.freeze({ stage: 'sinyu_interpretation' as const, tianjiText: '辛酉年辛金又旺於西' as const, yuanhaiText: '辛酉年辛金又旺於酉' as const, printedVariationProved: false as const }),
    Object.freeze({ stage: 'chongqi_and_penalty' as const, tianjiText: '冲起卯永' as const, yuanhaiText: '冲起卯刃' as const, printedVariationProved: false as const }),
  ] as const),
  sharedSequence: Object.freeze(['庚申例', '戊午系例', '辛酉例', '癸未乙卯甲子例', '辛亥運', '辛酉年'] as const),
  sharedLongPassageImpliesPossibleRelatedTransmission: true as const,
  directCopyDirectionEstablished: false as const,
  commonPre1582PrintedArchetypeEstablished: false as const,
  printWoodblockIdentityEstablished: false as const,
  identicalTitleToSecondaryNamedXingxueGangmuProved: false as const,
  japanCallmark: '子059-0011' as const,
  japanCatalogBookNumberIsJuanNumber: false as const,
  japanTargetLeafPubliclyDownloaded: false as const,
  shuge2021OldPdfLinkUsableTodayProved: false as const,
  newlyRead1582PrintedTargetLeaves: 0 as const,
  modernRuleAuthorityIncrease: 0 as const,
  adjudicatedWeiMuArchetype: null,
  authenticatedHistoricalYuefeiJiSiHour: false as const,
  productPromotionAuthorized: false as const,
});


/**
 * Catalog attribution != OCR inscription != verified historical person.
 * Authority collisions must not promote printed glyphs or source age.
 */
export const YUANHAI_LIQIN_LIQINFU_1600_AUTHORITY_COLLISION_AUDIT = Object.freeze({
  work: '刻京臺增補淵海子平大全' as const,
  nlcCatalog: Object.freeze({
    bookId: 'NLC892-2642-210287' as const,
    displayedAuthor: '〔元〕李欽夫撰' as const,
    evidenceTier: 'C_catalog_attribution' as const,
    printedTitleGlyphsDirectlyCheckedThisPass: false as const,
  }),
  linkedOcr: Object.freeze({
    bookId: 'NGJ8922642210287' as const,
    metadataAuthor: '[元] 李欽夫 撰' as const,
    internalInscriptionOne: '欽天監曰承德郎李欽' as const,
    internalInscriptionTwo: '欽天監丨承德郎李欽' as const,
    printerOne: '閩𦊱林喬山堂劉大易繡梓' as const,
    printerTwo: '閩書林喬山堂劉大易繡梓' as const,
    authorityNameObservedInTranscription: '李欽' as const,
    claimedPrintedOfficePrefixAuthenticated: false as const,
    duplicateOcrLinesIndependentPhysicalWitnesses: false as const,
    originalInscriptionVisuallyReadThisPass: false as const,
    evidenceTier: 'B_candidate_print_linked_OCR' as const,
  }),
  taiwanMuseumCatalog: Object.freeze({
    archiveRange: '平圖020000–020003' as const,
    authorAttribution: '明 李欽 撰' as const,
    edition: '明萬曆庚子(1600)閩書林劉龍田喬山堂刊本' as const,
    books: 4 as const,
    evidenceTier: 'C_catalog_attribution' as const,
    nlcAndNpmSameSettingProved: false as const,
  }),
  resolution: Object.freeze({
    liQinfuAndLiQinSameHistoricalPersonProved: false as const,
    liQinfuAndLiQinDifferentHistoricalPersonsProved: false as const,
    catalogedAuthorAndInscribedEditorSameRoleProved: false as const,
    directlyCollatedNlcBookOneOrNpmTitleLeaf: false as const,
    addedIndependentPrintedFocalGlyphs: 0 as const,
    pre1600PrintedFocalGlyphsAuthenticated: 0 as const,
    earlyTextArchetypeAdjudicated: false as const,
    yuefeiHistoricalBirthHourAuthenticated: false as const,
    modernAnnualRulesApproved: 0 as const,
    productionAuthorized: false as const,
  }),
});

/**
 * Edited transcription role wording is C, print-linked OCR is B-candidate
 * and catalog author attributions are C. No A-grade title leaf was inspected.
 */
export const YUANHAI_1600_LIQIN_EDITOR_ROLE_AND_JISI_OCR_CONTROL = Object.freeze({
  normalizedDigitalEdition: Object.freeze({
    shidianBookId: 'SDZJ0626' as const,
    portalAttribution: '[元] 李欽 增補' as const,
    bookOneHeader: '欽天監承德郎李欽增補' as const,
    printerHeader: '閩書𣇰喬山堂劉大易繡梓' as const,
    bookOneYearRule: '甲己起丙寅' as const,
    bookOneHourRule: '甲己起甲子' as const,
    sameEditionSourceAsNlcPrintEstablished: false as const,
    printedEditorVerbPhysicallyAuthenticated: false as const,
    evidenceTier: 'C_edited_digital_text' as const,
  }),
  nlcLinkedPrintOcr: Object.freeze({
    shidianBookId: 'NGJ8922642210287' as const,
    headingReadingOne: '欽天監曰承德郎李欽' as const,
    headingReadingTwo: '欽天監丨承德郎李欽' as const,
    bookOneYearRule: '甲巳起丙寅' as const,
    bookOneHourRule: '甲巳起甲子' as const,
    alternateYearToken: '如甲年或已年' as const,
    printedEditorVerbAbsentFromOcrMeansAbsentFromPrint: false as const,
    yearStemVariantsPhysicallyVerified: false as const,
    evidenceTier: 'B_candidate_print_linked_OCR' as const,
  }),
  taiwanNclHolding: Object.freeze({
    commonsFile: 'NCL-06593' as const,
    catalogAuthor: '（明）李欽撰' as const,
    catalogEditionYear: 1600 as const,
    physicalBookCount: 4 as const,
    catalogPdfPages: 160 as const,
    inspectedTitleFolio: false as const,
    independentWoodblockSettingEstablished: false as const,
    evidenceTier: 'C_catalog' as const,
  }),
  crossWitnessSafeguards: Object.freeze({
    catalogNlcAuthor: '〔元〕李欽夫撰' as const,
    normalizedEditionYuanAttribution: '[元] 李欽 增補' as const,
    taiwanNpmAuthor: '明 李欽 撰' as const,
    sameHistoricalPersonProved: false as const,
    distinctHistoricalPeopleProved: false as const,
    bookOneEditorRoleDirectlyInspected: false as const,
    updatedYuanhaiFocalPrintAReadings: 0 as const,
    addedOriginalPre1600TargetPrints: 0 as const,
    adjudicatedWeiMuArchetype: null,
    authenticatedYuefeiBirthJiSiHour: false as const,
    modernAnnualRulesApproved: 0 as const,
    productionAuthorized: false as const,
  }),
});


/** Exact NLC original p.4 office/name directly collated; obscured role verb held. */
export const YUANHAI_NLC1600_BOOK1_EDITORIAL_NAME_PRINT_AUDIT = Object.freeze({
  sourceOriginalBookId: 'NLC892-2642-210287' as const,
  bibliographicEditionYear: 1600 as const,
  imprintYearOnThisPageIndependentlyVerified: false as const,
  targetPdfPageOneBased: 4 as const,
  locus: 'right_folio_vertical_editorial_column_beneath_title' as const,
  sourceByteCount: 14387365 as const,
  sourceSha1Verified: '4092ec5b420ebd84eee3959d2ac00a73580e6b4e' as const,
  sourceSha256Verified: '17eb28b3a65d0b28908c4646017ebd409ef875366f48945071bb68675f737c82' as const,
  highResolutionRasterDpi: 400 as const,
  originalPrintedOfficeAndNameRead: '欽天監承德郎李欽' as const,
  originalPrintedOfficeAndNameTier: 'A_direct_original_print_image' as const,
  originalPrintedRoleVerbZengBuRead: false as const,
  inscriptionBelowNamePartiallyObscuredByDarkMark: true as const,
  noReadIsNotProofOfAbsence: true as const,
  originalPrintedLiQinFuRead: false as const,
  provesSameLiQinAsCatalogLiQinFu: false as const,
  additionalIndependentWoodblockSettingCredit: 0 as const,
  newlyRead1582FocalPrints: 0 as const,
  newlyReadYuanHaiWeiMuFocalPrints: 0 as const,
  yuefeiHistoricalJiSiHourAuthenticated: false as const,
  modernAnnualRulesApproved: 0 as const,
  productionAuthorized: false as const,
});

/** A published PDF checksum never substitutes for local byte verification or printed glyphs. */
export const YUANHAI_PRINT_20261015_SOURCE_BYTES_AND_ACCESS_GATES = Object.freeze({
  nlcWanliBookOne: Object.freeze({
    fileId: 'NLC892-2642-210287' as const,
    catalogPdfPages: 48 as const,
    commonsPublishedSizeBytes: 14387365 as const,
    commonsPublishedSha1: '4092ec5b420ebd84eee3959d2ac00a73580e6b4e' as const,
    publishedChecksumIsOnlyCatalogMetadata: true as const,
    locallyDownloaded: false as const,
    locallyValidatedSizeAndSha1: false as const,
    locallyComputedSha256: null,
    targetBookOneTitleFolioPage: null,
    liQinZengbuOriginalGlyphsRead: false as const,
    remoteWebReaderTooLarge: true as const,
    localNetworkDnsAvailable: false as const,
  }),
  nationalPalaceMuseumRoute: Object.freeze({
    catalogCallmarkRange: '平圖020000–020003' as const,
    visitorAccountNeededForOnlineImagesPerOfficialNotice: false as const,
    targetOriginalTitleFolioReached: false as const,
    originalPrintedTitleGlyphsInspected: false as const,
    sameHistoricalWoodblockAsNlcProved: false as const,
  }),
  tianjiWanliTenYearRoute: Object.freeze({
    japaneseReferenceCode: '子059-0011' as const,
    bookOrder: 3 as const,
    bookOrderThreeEstablishedAsPrintedJuanThree: false as const,
    japaneseImageViewerOnSiteOnly: true as const,
    sichuanCatalogOffersTargetFacsimile: false as const,
    printedTargetFolioRead: false as const,
    newAuthenticated1582WeiGlyph: false as const,
  }),
  authority: Object.freeze({
    catalogChecksumIsOriginalScanVisualEvidence: false as const,
    addedDirectPrintedTargetFolios: 0 as const,
    yuefeiActualJiSiBirthHourAuthenticated: false as const,
    weiMuArchetypeDecided: false as const,
    annualRulesApproved: 0 as const,
    productionAuthorized: false as const,
  }),
});


/** 2017 printed title-leaf reproduction, not authenticated Ming original or target Juan3. */
export const YUANHAI_YANGCONG_TITLE_LEAF_REPRODUCTION_AUDIT = Object.freeze({
  sourceArticle: Object.freeze({
    url: 'https://kknews.cc/culture/k8z36op.html' as const,
    publicationDate: '2017-02-24' as const,
    sourceCaptionDescribes: '楊淙星學綱目正傳萬曆十一年卷七五行元理消息賦' as const,
    originalPhotoUrl: 'https://i1.kknews.cc/BbxVdn5I97qj9KJCg8V2AC7G1eJiQJrRoc_vgYE/0.jpg' as const,
    imageHttpVerified: 200 as const,
    downloadedJpegBytes: 68118 as const,
    downloadedJpegSha256: '1efbf61429ff8f661fef4e24f3c99a4d1ebf791fabed9287749066e9f8ab0f70' as const,
    dimensions: Object.freeze([640, 854] as const),
  }),
  directlyVisibleTitleLeaf: Object.freeze({
    printedBookTitle: '星學綱目正傳' as const,
    printedCommissionOrCompiler: '清江楊竹亭先生纂訂' as const,
    printedWorkshopInscription: '聚奎齋梓' as const,
    sourceType: 'reproduced_printed_title_leaf_in_2017_secondary_article' as const,
    titleLeafImageIsOriginalJuanSevenBodyPage: false as const,
    titleLeafImageIsTargetJuanThreeLeaf: false as const,
    originalPhysicalHoldingVerified: false as const,
    originalPrintedImpressionYearRead: false as const,
    printingWoodblockIdentificationVerified: false as const,
    matchesShanghaiCatalogWorkshopTextCandidateOnly: true as const,
    evidenceTier: 'B_photo_of_print_provenance_unverified' as const,
  }),
  datingCollision: Object.freeze({
    historicalCatalogWanliYear: 10 as const,
    historicalCatalogGregorianYear: 1582 as const,
    modernArticleWanliYear: 11 as const,
    modernArticleWanliElevenGregorianYear: 1583 as const,
    anotherModernEditorialPhrase: '萬曆十一年西元一五八二年' as const,
    contradictoryDatesAreTwoEstablishedPrintedEditions: false as const,
    catalog1600AndLaterImpressionsDateComparedFromThisPhoto: false as const,
  }),
  safeguards: Object.freeze({
    independent1582OriginalFocalLeafAdded: 0 as const,
    newlyCollatedUnOrMuOriginalGlyphs: 0 as const,
    printedWeiMuArchetypeIdentified: false as const,
    historicalYuefeiJiSiHourAuthenticated: false as const,
    modernAnnualRulesApproved: 0 as const,
    productionAuthorized: false as const,
  }),
});

/** Shidian NA09025 printed-juan-3 OCR is a new C-level target locus, not a 1582 printed folio. */
export const YUANHAI_SHIDIAN_1582_JUAN_THREE_TEXTUAL_WITNESS_AUDIT = Object.freeze({
  platform: '識典古籍' as const,
  bookId: 'NA09025' as const,
  chapterId: '1m83vbm6ivwh6' as const,
  traditionalUrl: 'https://www.shidianguji.com/zh/book/NA09025/chapter/1m83vbm6ivwh6' as const,
  simplifiedUrl: 'https://www.shidianguji.com/book/NA09025/chapter/1m83vbm6ivwh6' as const,
  traditionalAndSimplifiedAreOneDigitalWitness: true as const,
  catalogAttribution: Object.freeze({
    compiler: '楊淙' as const,
    claimedEdition: '萬曆10年刊本' as const,
    attributionGrade: 'C_catalog_metadata' as const,
    actual1582ImpressionProvenByPrintedColophon: false as const,
  }),
  digitalPrintedJuanThreeTitle: '新刊總括天機諸家秘要星學正傳卷之三' as const,
  targetChapterHeading: '陽刅' as const,
  observedDigitalTargetGlyph: '未' as const,
  observedTraditionalDigitalClause: '運行辛亥，亥卯未合起陽刅' as const,
  corroboratingTextualLoci: Object.freeze({
    nlcWanli1600BookId: 'SDZJ0626' as const,
    nlcWanli1600DigitalGlyph: '未' as const,
    chongzhen1634DigitalGlyph: '木' as const,
    chongzhen1634TargetUrl: 'https://www.shidianguji.com/zh/mid-page/7603864294308413466' as const,
    independentPrintSettingAddedFromOcr: 0 as const,
  }),
  originalImageAndAuthorityBoundary: Object.freeze({
    inspectedOriginal1582JuanThreePrintedLeaf: false as const,
    originalPrintImageUrlVerified: false as const,
    originalPhysicalBookNumberVerified: false as const,
    physicalHoldingInstitutionVerified: false as const,
    ocrEditorialInterventionRuledOut: false as const,
    glyphFrom1582ActualPrintedWoodblockVerified: false as const,
    newlyAdjudicatedPrintedGlyphs: 0 as const,
    newIndependentWoodblockSettings: 0 as const,
    archetypeGlyphAdjudicated: null,
    modernAnnualMeaningRulesApproved: 0 as const,
    globalTripleClashPriorityAuthorized: false as const,
    productionAuthorized: false as const,
  }),
});

/** Official 2026 Japanese institution-specific access rules: catalog access is not original folio access. */
export const YUANHAI_JAPAN_TWO_INSTITUTION_REPRODUCTION_ACCESS_AUDIT = Object.freeze({
  kunaicho: Object.freeze({
    institution: '宮内庁書陵部 図書寮文庫' as const,
    shelfNumber: '217・35' as const,
    officialUseGuide: 'https://www.kunaicho.go.jp/kunaicho/shinsei/toshoryo.html' as const,
    catalogImageField: '-' as const,
    catalogReproductionField: '-' as const,
    advanceReadingApplicationDays: 10 as const,
    originalPersonalPhotographyAuthorized: false as const,
    officialPhotoOrDigitalCopyApplicationDocumented: true as const,
    copyRequiresLocusAndShelfNumber: true as const,
    copyPreparationApproxOneMonthOrLonger: true as const,
    phoneRepresentative: '03-3213-1111' as const,
    extension: '3440' as const,
    emailApplicationRequiresPriorTelephoneInquiry: true as const,
    targetJuanThreePhysicalBookLocated: false as const,
    approvedCopyOfFocalLeafObtained: false as const,
  }),
  nationalArchives: Object.freeze({
    institution: '日本国立公文書館' as const,
    parentCallNumber: '子059-0011' as const,
    subItemThreeUrl: 'https://www.digital.archives.go.jp/item/en/4413954' as const,
    subItemThreeBookOrder: '0003' as const,
    subItemThreeIsPrintedJuanThreeProved: false as const,
    catalogItemUseRestriction: 'Open' as const,
    focalViewerUrl: 'https://www.digital.archives.go.jp/img/en/1079276' as const,
    focalViewerAvailability: 'On-site Access Only' as const,
    officialRemoteCopyGuide: 'https://www.archives.go.jp/guide/copy.html' as const,
    remotePaidCopyOrSpecialReproductionRouteDocumented: true as const,
    publishedOpenClassTypicalFulfillment: 'approximately_one_month' as const,
    reproductionRequiresSpecificPhysicalLocus: true as const,
    previousInventoryNumbers: Object.freeze(['305-0266', '305-0267'] as const),
    inventoryNumberConcordanceVerified: false as const,
    approvedCopyOfFocalLeafObtained: false as const,
  }),
  authorityBoundary: Object.freeze({
    evidenceTier: 'C_official_access_rules_and_item_catalog_only' as const,
    userIdentifyingApplicationSubmitted: false as const,
    purchaseOrReproductionFeeAuthorized: false as const,
    ming1582JuanThreeOriginalLeavesInspected: 0 as const,
    newWeiWoodGlyphsAdjudicated: 0 as const,
    independentPrintSettingAdded: 0 as const,
    archetypeGlyph: null,
    modernAnnualMeaningRulesApproved: 0 as const,
    globalTripleClashPriorityAuthorized: false as const,
    productionAuthorized: false as const,
  }),
});

/** Official Kunaicho holding record: metadata only, no 1582 focal print inspected. */
export const YUANHAI_KUNAICHO_SHORYOBU_1582_CATALOG_HOLDING_AUDIT = Object.freeze({
  source: Object.freeze({
    institution: '宮内庁書陵部 図書寮文庫' as const,
    recordUrl: 'https://shoryobu.kunaicho.go.jp/Toshoryo/Detail/1000150900000?archive=Toshoryo&hasdetail=True&index=45845&searchtype=Category&sort=Title' as const,
    shelfNumber: '217・35' as const,
    branchNumber: '0000' as const,
    catalogTitle: '星学綱目正伝（２１巻・首２巻・総括図３巻）' as const,
    attributedCompiler: '明 楊宗' as const,
    editionNote: '明版, 明 万暦１０年, 金陵饒氏' as const,
    provenance: '徳山毛利本' as const,
    mainJuan: 21 as const,
    frontJuan: 2 as const,
    generalDiagramJuan: 3 as const,
    countValue: 12 as const,
    countUnit: '点数' as const,
    publicImageField: '-' as const,
    reproductionField: '-' as const,
    readingApplicationPresent: true as const,
    catalogRecordDirectlyRead: true as const,
    sourceTier: 'C_official_holding_catalog_not_ming_print' as const,
  }),
  unresolved: Object.freeze({
    shanghaiSecondaryFrontJuanCount: 1 as const,
    shanghaiSecondaryCountTier: 'C_derivative_catalog' as const,
    wangWenyuan22Juan12BooksCompared: true as const,
    shoryobu12ItemsEqualsWang12BooksProved: false as const,
    yangZongEqualsYangCongProved: false as const,
    jinlingRaoEqualsRaoJinxiSettingProved: false as const,
    exactOriginalJuanThreePhysicalBookIdentified: false as const,
    volumeCountDiscrepancyExplained: false as const,
    original1582JuanThreePrintInspected: false as const,
    publiclyAvailableFocalOriginalScanVerified: false as const,
    newWeiWoodGlyphsRead: 0 as const,
    newIndependentPrintSettingCount: 0 as const,
    modernAnnualMeaningRulesApproved: 0 as const,
    productionAuthorized: false as const,
  }),
});

/** The directly inspected printed Wang Wenyuan / Ye Dehui catalog page proves only its 22-juan description. */
export const YUANHAI_XIAOCITANG_22_JUAN_PRINTED_CATALOG_AUDIT = Object.freeze({
  source: Object.freeze({
    catalogTitle: '孝慈堂書目' as const,
    compiler: '王聞遠' as const,
    seriesEditor: '葉德輝' as const,
    printedSeries: '觀古堂書目叢刻 第15冊' as const,
    catalogPublicationYearFromCiNii: 1921 as const,
    publiclyInspectedFacsimileUrl: 'https://commons.wikimedia.org/wiki/File:NLC892-001929162-317370_□古堂書目叢刻_十五種_第15冊.pdf' as const,
    originalPdfPages: 69 as const,
    originalPdfBytes: 42834275 as const,
    originalPdfSha256: '1519be1f7ad434e0dd51958443a6b7d7a4395f12b4c427adeeec740cd20e8ed6' as const,
    pdfPageOneBased: 4 as const,
    printedSectionDirectlyInspected: '星命' as const,
    printedTitleDirectlyInspected: '星學正傳' as const,
    printedAttributionDirectlyInspected: '楊淙' as const,
    printedJuanCountDirectlyInspected: 22 as const,
    printedPhysicalBookCountDirectlyInspected: 12 as const,
    physicalPrintedCatalogPageInspected: true as const,
    sourceTier: 'A_later_1921_bibliography_print_only' as const,
  }),
  unresolvedEditionRelation: Object.freeze({
    printedCatalogDiffersFromMoYouzhi21Juan: true as const,
    printedCatalogDiffersFrom1994Booklist21Juan: true as const,
    boundVolumeCountingRuleEstablished: false as const,
    distinctMingWoodblockImpressionsProved: false as const,
    original1582JuanCountProved: false as const,
    mingOriginalFocalJuanThreeInspected: false as const,
    newlyInspectedWeiWoodOriginalGlyphs: 0 as const,
    independentPrintedWitnessCredit: 0 as const,
    modernAnnualRulesApproved: 0 as const,
    productionAuthorized: false as const,
  }),
});

/** A-grade is limited to the physical 1994 printed catalog ENTRY, not the 1582 woodblock. */
export const YUANHAI_1994_CHINESE_RARE_BOOK_CATALOG_PRINT_AUDIT = Object.freeze({
  source: Object.freeze({
    title: '中國古籍善本書目 子部 第3冊' as const,
    catalogPublicationYear: 1994 as const,
    publicScanUrl: 'https://commons.wikimedia.org/wiki/File:SSID-13990657_中國古籍善本書目_子部_3.pdf' as const,
    scanPdfPageCount: 160 as const,
    originalDownloadedBytes: 18807757 as const,
    verifiedOriginalPdfSha256: 'e562a7af9c9aac5daf641172110133f8f203cebeb1ebcd1bad4fd515979cf2ab' as const,
    pdfPageOneBased: 42 as const,
    printedLocus: 'rightmost vertical entry' as const,
    printedTitleDirectlyInspected: '新刊京本釐正總括天機星學正傳二十一卷' as const,
    printedCompilerDirectlyInspected: '明楊淙輯' as const,
    printedEditionNoteDirectlyInspected: '明萬曆十年饒錦溪刻本' as const,
    catalogPhysicalPrintDirectlyInspected: true as const,
    sourceTier: 'A_later_1994_bibliography_words_only' as const,
    PDFTextLayerSearchable: false as const,
  }),
  authorityBoundary: Object.freeze({
    catalogAttributesOriginalEditionTo1582: true as const,
    mingImprintOriginalLeafAuthenticated: false as const,
    holdingLibraryNamedInThisPrintedEntry: false as const,
    sichuanHoldingConnectedToThisPrintedEntryByPhysicalCallmark: false as const,
    sichuan1582FacsimilePubliclyAccessibleConfirmed: false as const,
    ming1582JuanThreeOriginalLeavesInspected: 0 as const,
    newlyInspectedMingFocalGlyphs: 0 as const,
    independentMingPrintedWitnessCredit: 0 as const,
    historicalYuefeiBirthHourAuthenticated: false as const,
    modernAnnualMeaningRulesApproved: 0 as const,
    productionAuthorized: false as const,
  }),
});

/** Actual scan of a later printed bibliography: A for its own words, C for Ming-edition attribution. */
export const YUANHAI_MOYOUZHI_RENWU_BIBLIOGRAPHIC_FOLIO = Object.freeze({
  source: Object.freeze({
    catalogTitle: '郘亭知見傳本書目' as const,
    attributedBibliographer: '莫友芝' as const,
    reproductionSeries: 'NLC892-001931309-315546' as const,
    originalCatalogPdf: 'https://commons.wikimedia.org/wiki/File:NLC892-001931309-315546_郘亭知見傳本書目_十六卷_第5冊.pdf' as const,
    bookNumberOneBased: 5 as const,
    printedCatalogJuan: 9 as const,
    pdfPageOneBased: 8 as const,
    catalogPdfPages: 52 as const,
    actualDownloadedFileBytes: 23599742 as const,
    verifiedSha256: '6e604b1f708271467ba47915d888c4fab1bb07b761b1e09ec578ede83e1e1eab' as const,
    printedCatalogHeadingDirectlySeen: '星學正傳二十一卷首總括圖三卷又玉井奧訣一卷玉照神經一卷末圖說二卷' as const,
    printedAttributionDirectlySeen: '明楊淙纂' as const,
    printedDatingNoteDirectlySeen: '萬曆壬午自序刊' as const,
    originalCatalogPrintDirectlyInspected: true as const,
    directCatalogGlyphTier: 'A_later_printed_bibliography_only' as const,
  }),
  editionAttributionSafeguards: Object.freeze({
    wanliRenwuGregorianYear: 1582 as const,
    dateIsReportedByLaterBibliography: true as const,
    assertedDateAuthenticatedIn1582PhysicalPrint: false as const,
    sourceSelfPrefaceOriginalLeafInspected: false as const,
    catalogEntryProves1582ActualImpressionDate: false as const,
    catalogEntryProvesSameSettingAs1600Or1634: false as const,
    evidenceTierFor1582Edition: 'C_historical_bibliographic_attribution' as const,
    modern1583EleventhWanliYearIs1582: false as const,
    newlyInspected1582JuanThreeOriginalLeaves: 0 as const,
    newUnMuOriginalGlyphReadings: 0 as const,
    historicalYuefeiBirthHourAuthenticated: false as const,
    modernAnnualRulesApproved: 0 as const,
    productionAuthorized: false as const,
  }),
});

/** 1934 Sonkeikaku catalog is a bibliographic holding lead, never a focal original print. */
export const YUANHAI_1582_SONKEIKAKU_CATALOG_ROUTE = Object.freeze({
  catalogPrint: Object.freeze({
    catalogTitle: '尊經閣文庫漢籍分類目錄' as const,
    catalogPublicationYear: 1934 as const,
    catalogPart: 3 as const,
    sourcePdfUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/15/NDL1147938_尊經閣文庫漢籍分類目録_part3.pdf' as const,
    verifiedPdfBytes: 53742939 as const,
    verifiedPdfSha256: '513d83d54bed4c178b1cf15a4f596f9c3087f2523d02a3209335906408855732' as const,
    sourcePdfPageCount: 100 as const,
    imageOnlyWithoutSearchableText: true as const,
    catalogTitleIndexCandidate: '新刊京本薈正總括天機諸家秘要星學正傳' as const,
    catalogDescribesTwentyOneJuan: true as const,
    catalogDescribesMingWanliEdition: true as const,
    titleIndexOcrCharacterAccuracyVerifiedFromPrintedEntry: false as const,
    preciseCatalogPageAndColumnLocated: false as const,
    indexedMentionIsDirectOriginalWoodblockImage: false as const,
    sourceTier: 'C_historical_catalog_candidate' as const,
  }),
  originalMingWitness: Object.freeze({
    separateLibraryHoldingCandidate: '尊經閣文庫' as const,
    samePhysicalHoldingAsHousaOrJapanArchivesProved: false as const,
    exact1582ImpressionYearConfirmed: false as const,
    focalJuanThreePhysicalBookNumber: null,
    focalLeafAndOriginalGlyphDirectlyInspected: false as const,
    independentWoodblockWitnessAdded: 0 as const,
    newlyAuthenticatedPre1600WeiOrMuGlyphs: 0 as const,
    unMuArchetypeEstablished: false as const,
    historicalYuefeiHourAuthenticated: false as const,
    modernAnnualRulesApproved: 0 as const,
    productionAuthorized: false as const,
  }),
});

/** Modern editorial scholarship documents a Shanghai Ming-print source, not the focal folio. */
export const YUANHAI_1582_SHANGHAI_MING_COPY_EDITORIAL_ROUTE = Object.freeze({
  editorialWitness: Object.freeze({
    sourceUrl: 'https://xinyi.hk/goods-7493.html' as const,
    editorPrefaceYear: 2016 as const,
    editedPublicationTitle: '兩家註解玉井奧訣' as const,
    editorSignature: '莊圓' as const,
    sourceHoldingClaim: '上海圖書館收藏之明本《星學綱目正傳》' as const,
    yangCongSourceAttribution: '萬曆十年楊淙撰《星學綱目正傳》' as const,
    editedExcerptLocation: '卷首《唐李虛中註解玉井奧訣》' as const,
    furtherAcademicExcerptSourceUrl: 'https://hr.xinyi.hk/goods-8567.html' as const,
    furtherExcerptName: '子平格解內外格' as const,
    furtherExcerptPrintedJuan: Object.freeze([9, 10] as const),
    modernEditorExplicitlyClaimsMingSourceInspection: true as const,
    editorPrefaceNotOriginalWoodblockFacsimile: true as const,
    actualShanghaiSourceCopyDownloaded: false as const,
    actualShanghaiCopyFocalJuanThreeInspected: false as const,
    samePhysicalCopyAsHousaOrJapanArchivesProved: false as const,
    luWeiTwentyJuanSameHistoricalWorkAsYangCongTwentyOneJuanProved: false as const,
    newlyAuthenticatedTargetWeiMuGlyphs: 0 as const,
    evidenceTier: 'C_modern_editorial_source_description' as const,
  }),
  safeguards: Object.freeze({
    modernDescriptionDoesNotElevateAnOriginalPrintLocusToA: true as const,
    unMuArchetypeEstablished: false as const,
    historicalYuefeiHourAuthenticated: false as const,
    modernAnnualRulesApproved: 0 as const,
    productionAuthorized: false as const,
  }),
});

/** Catalog-name and photo-facsimile leads never become a directly read 1582 print leaf. */
export const YUANHAI_1582_HOUSA_ALTERNATE_TITLE_AND_TOYO_COPY_AUDIT = Object.freeze({
  nagoyaHousaCatalog: Object.freeze({
    sourcePdf: 'https://housa.city.nagoya.jp/archive/deta/zosyo02.pdf' as const,
    searchedTitle: '新刊京本釐正總括天機星學正傳' as const,
    catalogClaimsAlternateTitle: '即星學綱目正傳' as const,
    reportedPhysicalBooks: 6 as const,
    displayedEditorialRole: '舒守清校閱' as const,
    displayedPreface: '萬曆十年清江楊氏序' as const,
    catalogTextFromSearchIndexOnly: true as const,
    entireCatalogPdfVisuallyChecked: false as const,
    authorYangVariantOriginalGlyphChecked: false as const,
    sameEditionAndWoodblocksAsJapanEightBookSetProved: false as const,
    actualJuanThreeFocalPrintRead: false as const,
    evidenceTier: 'C_bibliographic_index_text' as const,
  }),
  historicalSameTitleCollision: Object.freeze({
    mingHistoryUrl: 'https://www.xn--5rtnx620bw5s.tw/a/a24/098.html' as const,
    qianQingTangUrl: 'https://www.shidianguji.com/zh/book/NGJ89241199901898971493/chapter/1lvfdhakt6ryn' as const,
    historicalCatalogName: '星學綱目正傳' as const,
    historicalCatalogAttributedCompiler: '陸位' as const,
    historicalCatalogJuan: 20 as const,
    separateMingHistoryYuanHaiListing: '李欽淵海子平大全六卷' as const,
    target1582CatalogCompiler: '楊淙' as const,
    target1582CatalogJuan: 21 as const,
    sameTitleDoesNotEstablishSameWork: true as const,
    historicalCatalogCopyPrintedPageInspected: false as const,
    housaAliasLinkedToLuWeiWorkEstablished: false as const,
    housaAliasLinkedToYangCongPhysicalEditionEstablished: false as const,
    titleCollisionResolved: false as const,
    liQinVersusLiQinFuIdentityAdjudicated: false as const,
    evidenceTier: 'C_historical_bibliographic_transcriptions' as const,
    newAuthenticated1582FocalPrintedFolios: 0 as const,
    productionAuthorized: false as const,
  }),
  japanNationalArchivesExistingRoute: Object.freeze({
    callNumber: '子059-0011' as const,
    catalogedBooks: 8 as const,
    nagoyaSixBookBindingEqualToThisEightBookBindingProved: false as const,
  }),
  toyoBunkoPhotographicReprint: Object.freeze({
    callNumber: 'III-7-A-21' as const,
    describedCreatorRole: '元李欽夫增補' as const,
    copyNote: '用北平圖書館舊藏萬暦二十八年閩建喬山堂劉龍田刊本景照' as const,
    catalogLegacyNumber: 'LCNo.2206' as const,
    nlcCatalogNumber: 'CBM2206' as const,
    legacyNumbersFullyVerifiedEquivalent: false as const,
    recordDescribesPhotographicFacsimileNotIndependentCarvedSetting: true as const,
    independentlyCarvedWanliWoodblocksAdded: 0 as const,
    printedEditorAttributionDirectlyRechecked: false as const,
    evidenceTier: 'C_bibliographic_record' as const,
  }),
  npmPreview: Object.freeze({
    catalogUrl: 'https://catalog.digitalarchives.tw/item/00/12/8c/7a.html' as const,
    hasDifferentPagePhysicalPhoto: true as const,
    photoShowsTargetLiQinZengbuColophon: false as const,
    photoShows1582WeiUnSentence: false as const,
    focalGlyphPrintVisuallyChecked: false as const,
  }),
  safeguards: Object.freeze({
    catalogAssertsAlternateTitleNotHistoricalSameSetting: true as const,
    historicalSameTitleIsUniqueWorkIdentifier: false as const,
    automaticHousaAliasEditionMergeAuthorized: false as const,
    newlyAuthenticated1582OriginalPrintedTargetFolios: 0 as const,
    newlyAuthenticated1600LiQinZengbuPrintedFolios: 0 as const,
    independentCarvedPrintSettingsAdded: 0 as const,
    verifiedWanli1600WeiGlyphStillUn: true as const,
    verifiedChongzhen1634GlyphStillMu: true as const,
    unMuArchetypeAdjudicated: false as const,
    yuefeiJiSiHistoricalHourAuthenticated: false as const,
    approvedAnnualRules: 0 as const,
    productionAuthorized: false as const,
  }),
});


/** Fail-closed source fingerprinting can verify file identity, never original glyphs. */
export const YUANHAI_NLC1600_PDF_VERIFIER_WORKFLOW = Object.freeze({
  scriptPath: 'tools/research/verify_nlc1600_book1_pdf.py' as const,
  isolatedTestPath: 'tools/research/test_verify_nlc1600_book1_pdf.py' as const,
  trackedSourceId: 'NLC892-2642-210287' as const,
  expectedBytes: 14387365 as const,
  expectedSha1: '4092ec5b420ebd84eee3959d2ac00a73580e6b4e' as const,
  hashAlgorithm: 'SHA-1' as const,
  noEvidenceOrPreviewFromMismatchedFile: true as const,
  sha256LocallyComputedOnlyAfterInputRead: true as const,
  optionalPreviewPyMuPdfRequired: true as const,
  expectedPdfPageCountForPreview: 48 as const,
  explicitOneBasedPreviewPagesRequired: true as const,
  scriptEverGuessesTargetOriginalLeafPage: false as const,
  verifiedIdentityAutomaticallyPromotesToA: false as const,
  unitTestsLocallyPassedWithSyntheticData: 3 as const,
  actualNlcOriginalPdfDownloadedInThisPass: false as const,
  actualNlcTitleGlyphsReadInThisPass: false as const,
  housaSixPhysicalVolumesCataloged: true as const,
  housaVolumeContainingJuanThreeVerified: false as const,
  housaIndividualVolumeFolioAccessVerified: false as const,
  extraPrintedGlyphWitnesses: 0 as const,
  modernAnnualRulesApproved: 0 as const,
  productionAuthorized: false as const,
});

/** Verified Commons original PDF access; original author line is NOT certified. */
export const YUANHAI_NLC1600_BOOK1_DIRECT_FACSIMILE_ACCESS = Object.freeze({
  fileId: 'NLC892-2642-210287' as const,
  verifiedBytes: 14387365 as const,
  verifiedSha1: '4092ec5b420ebd84eee3959d2ac00a73580e6b4e' as const,
  computedRunnerSha256: '17eb28b3a65d0b28908c4646017ebd409ef875366f48945071bb68675f737c82' as const,
  originalSourceDownloadedByGithubRunner: true as const,
  originalBytesAndSha1Verified: true as const,
  totalPdfPages: 48 as const,
  rasterizedOriginalPages: 48 as const,
  originalPdfBytesInArtifact: false as const,
  githubActionRunId: 38705480087 as const,
  verifiedRasterArtifactId: 11958810428 as const,
  directlyInspectedPdfPage: 21 as const,
  directlyInspectedPrintedJuan: 2 as const,
  directlyReadPrintedTitle: '刻京臺增補淵海子平大全卷之二' as const,
  titleEvidenceTier: 'A_direct_original_print_image' as const,
  titleZengbuDoesNotProveLiQinEditorRole: true as const,
  originalPrintedLiQinZengbuLineVerified: false as const,
  totalAbsenceOfNameLineProved: false as const,
  exact1600PrintYearOnTitleLeafAuthenticated: false as const,
  newWeiMuTargetFoliosAuthenticated: 0 as const,
  earlier1582OriginalTargetFolioRead: false as const,
  historicalYuefeiHourAuthenticated: false as const,
  modernAnnualRulesApproved: 0 as const,
  productionAuthorized: false as const,
});


/** Official NAJ 2021 scheduled reproduction items, not Ming-folio witnesses. */
export const YUANHAI_NAJ_2021_DUPLICATE_LISTING_AUDIT = Object.freeze({
  sourceUrl: 'https://www.archives.go.jp/news/pdf/20210719.pdf' as const,
  sourceTitle: '2021-07 複製物の作成作業時期について / 内閣文庫（漢籍）' as const,
  pdfPageOneBased: 61 as const,
  title: '新刊京本釐正総括天機星学正伝' as const,
  officialInventoryNumbers: Object.freeze(['305-0266', '305-0267'] as const),
  existingDigitalCatalogNumber: '子059-0011' as const,
  twoScheduledInventoryRowsVerified: true as const,
  manuscriptOrPrintRelationEstablished: false as const,
  oldAndNewIdentifierConcordanceVerified: false as const,
  reproductionCompletedVerified: false as const,
  digitalFolioPublicAccessVerified: false as const,
  target1582PrintedJuanThreeInspected: false as const,
  addedIndependentPrintWitnessCount: 0 as const,
  modernAnnualMeaningApproved: false as const,
  productionAuthorized: false as const,
});

export function buildYuanHaiMingJuan3PrintScope() {
  const prior = buildYuanHaiSixPillarDigitalCase();
  const books = YUANHAI_NLC_PHYSICAL_BOOKS;
  const additions = YUANHAI_JUAN3_ADDITIONAL_DIGITAL_WITNESSES;
  if (
    prior.authority.actualMingPrintTripleGlyphVerified ||
    prior.authority.globalTripleClashPriorityAuthorized ||
    prior.authority.productionAuthorized ||
    books.length !== 2 ||
    additions.length !== 2 ||
    YUANHAI_YANGCONG_TITLE_LEAF_REPRODUCTION_AUDIT.safeguards.newlyCollatedUnOrMuOriginalGlyphs !== 0 ||
    YUANHAI_YANGCONG_TITLE_LEAF_REPRODUCTION_AUDIT.safeguards.independent1582OriginalFocalLeafAdded !== 0 ||
    YUANHAI_YANGCONG_TITLE_LEAF_REPRODUCTION_AUDIT.safeguards.productionAuthorized ||
    YUANHAI_MOYOUZHI_RENWU_BIBLIOGRAPHIC_FOLIO.editionAttributionSafeguards.assertedDateAuthenticatedIn1582PhysicalPrint ||
    YUANHAI_MOYOUZHI_RENWU_BIBLIOGRAPHIC_FOLIO.editionAttributionSafeguards.newlyInspected1582JuanThreeOriginalLeaves !== 0 ||
    YUANHAI_MOYOUZHI_RENWU_BIBLIOGRAPHIC_FOLIO.editionAttributionSafeguards.newUnMuOriginalGlyphReadings !== 0 ||
    YUANHAI_MOYOUZHI_RENWU_BIBLIOGRAPHIC_FOLIO.editionAttributionSafeguards.productionAuthorized ||
    YUANHAI_1582_SONKEIKAKU_CATALOG_ROUTE.originalMingWitness.newlyAuthenticatedPre1600WeiOrMuGlyphs !== 0 ||
    YUANHAI_1582_SONKEIKAKU_CATALOG_ROUTE.originalMingWitness.focalLeafAndOriginalGlyphDirectlyInspected ||
    YUANHAI_1582_SONKEIKAKU_CATALOG_ROUTE.originalMingWitness.productionAuthorized ||
    YUANHAI_1582_SHANGHAI_MING_COPY_EDITORIAL_ROUTE.editorialWitness.newlyAuthenticatedTargetWeiMuGlyphs !== 0 ||
    YUANHAI_1582_SHANGHAI_MING_COPY_EDITORIAL_ROUTE.editorialWitness.actualShanghaiCopyFocalJuanThreeInspected ||
    YUANHAI_1582_SHANGHAI_MING_COPY_EDITORIAL_ROUTE.safeguards.productionAuthorized ||
    YUANHAI_NLC1600_BOOK1_EDITORIAL_NAME_PRINT_AUDIT.originalPrintedRoleVerbZengBuRead ||
    YUANHAI_NLC1600_BOOK1_EDITORIAL_NAME_PRINT_AUDIT.provesSameLiQinAsCatalogLiQinFu ||
    YUANHAI_NLC1600_BOOK1_EDITORIAL_NAME_PRINT_AUDIT.newlyRead1582FocalPrints !== 0 ||
    YUANHAI_NLC1600_BOOK1_EDITORIAL_NAME_PRINT_AUDIT.newlyReadYuanHaiWeiMuFocalPrints !== 0 ||
    YUANHAI_NLC1600_BOOK1_EDITORIAL_NAME_PRINT_AUDIT.productionAuthorized ||
    YUANHAI_NCL_TAIWAN_PRINT_SCAN.independentWitnessCredit !== 0 ||
    YUANHAI_NLC1600_BOOK1_DIRECT_FACSIMILE_ACCESS.originalPrintedLiQinZengbuLineVerified ||
    YUANHAI_NLC1600_BOOK1_DIRECT_FACSIMILE_ACCESS.totalAbsenceOfNameLineProved ||
    YUANHAI_NLC1600_BOOK1_DIRECT_FACSIMILE_ACCESS.newWeiMuTargetFoliosAuthenticated !== 0 ||
    YUANHAI_NLC1600_BOOK1_DIRECT_FACSIMILE_ACCESS.productionAuthorized ||
    YUANHAI_1582_HOUSA_ALTERNATE_TITLE_AND_TOYO_COPY_AUDIT.historicalSameTitleCollision.titleCollisionResolved ||
    YUANHAI_1582_HOUSA_ALTERNATE_TITLE_AND_TOYO_COPY_AUDIT.historicalSameTitleCollision.newAuthenticated1582FocalPrintedFolios !== 0 ||
    YUANHAI_1582_HOUSA_ALTERNATE_TITLE_AND_TOYO_COPY_AUDIT.historicalSameTitleCollision.productionAuthorized ||
    YUANHAI_1582_HOUSA_ALTERNATE_TITLE_AND_TOYO_COPY_AUDIT.safeguards.automaticHousaAliasEditionMergeAuthorized ||
    YUANHAI_PARALLEL_YUEFEI_NATAL_LOCUS_AUDIT.receivedXiJiParallelLocus.wanliPrintedContentsJuanNumber !== 2 ||
    YUANHAI_PARALLEL_YUEFEI_NATAL_LOCUS_AUDIT.receivedXiJiParallelLocus.chongzhenPrintedJuanForThisParallelCase !== null ||
    YUANHAI_PARALLEL_YUEFEI_NATAL_LOCUS_AUDIT.receivedXiJiParallelLocus.chongzhenPhysicalBookForThisParallelCase !== null ||
    YUANHAI_PARALLEL_YUEFEI_NATAL_LOCUS_AUDIT.receivedXiJiParallelLocus.anyBookOneOriginalPdfBytesObtained ||
    YUANHAI_PARALLEL_YUEFEI_NATAL_LOCUS_AUDIT.receivedXiJiParallelLocus.newPrintedWitnessCredit !== 0 ||
    YUANHAI_PARALLEL_YUEFEI_NATAL_LOCUS_AUDIT.additionalReceivedText.independentMaterialWitnessCollated ||
    YUANHAI_PARALLEL_YUEFEI_NATAL_LOCUS_AUDIT.textualGenealogyIndependentWitnessesAdded !== 0 ||
    YUANHAI_PARALLEL_YUEFEI_NATAL_LOCUS_AUDIT.printedFocalCollationsAdded !== 0 ||
    YUANHAI_PARALLEL_YUEFEI_NATAL_LOCUS_AUDIT.historyOrHistoricalBirthHourAuthenticated ||
    YUANHAI_PARALLEL_YUEFEI_NATAL_LOCUS_AUDIT.archetypalVariantChoiceAuthorized ||
    YUANHAI_PARALLEL_YUEFEI_NATAL_LOCUS_AUDIT.modernAnnualPrecedenceAuthorized ||
    YUANHAI_NO_CONTACT_EARLY_PRINT_ACCESS_AUDIT.targetEarlyTextPassageDirectlyInspected ||
    YUANHAI_NO_CONTACT_EARLY_PRINT_ACCESS_AUDIT.focalAnecdoteInEarlyTexts !== null ||
    YUANHAI_NO_CONTACT_EARLY_PRINT_ACCESS_AUDIT.newDirectFocalPrintWitnesses !== 0 ||
    YUANHAI_NO_CONTACT_EARLY_PRINT_ACCESS_AUDIT.modernAnnualPriorityAuthorized ||
    YUANHAI_NO_CONTACT_EARLY_PRINT_ACCESS_AUDIT.koreaUniversityDerivativePhotoMirror.directFocalPrintWitnessCredit !== 0 ||
    YUANHAI_NO_CONTACT_EARLY_PRINT_ACCESS_AUDIT.japaneseRepositoryReportedIn2017Edition.directlyCollatedOriginalFocalWitnessCredit !== 0 ||
    YUANHAI_NLK_CANDIDATE_CALLMARK_FROM_ACADEMIC_BIBLIOGRAPHY.institutionMARCRecordConfirmed ||
    YUANHAI_NLK_CANDIDATE_CALLMARK_FROM_ACADEMIC_BIBLIOGRAPHY.institutionKorcisRecKey !== null ||
    YUANHAI_NLK_CANDIDATE_CALLMARK_FROM_ACADEMIC_BIBLIOGRAPHY.originalImageStableUrl !== null ||
    YUANHAI_NLK_CANDIDATE_CALLMARK_FROM_ACADEMIC_BIBLIOGRAPHY.independentPrintedFocalWitnessCredit !== 0 ||
    YUANHAI_NLK_CANDIDATE_CALLMARK_FROM_ACADEMIC_BIBLIOGRAPHY.actualCaseInPrintEstablished !== null ||
    YUANHAI_EARLIER_YANGREN_DERIVED_CLAUSE_COMPARISON.extraEarlyPrintedLociVerified !== 0 ||
    YUANHAI_EARLIER_YANGREN_DERIVED_CLAUSE_COMPARISON.sameHistoricalAnecdoteAcrossSourcesEstablished ||
    YUANHAI_EARLIER_YANGREN_DERIVED_CLAUSE_COMPARISON.generalClashVersusCombinationPriorityEstablished ||
    YUANHAI_EARLIER_YANGREN_DERIVED_CLAUSE_COMPARISON.modernExegeticalAttributedQuotation.focalPrintedWitnessCredit !== 0 ||
    YUANHAI_EARLIER_YANGREN_DERIVED_CLAUSE_COMPARISON.modernExegeticalAttributedQuotation.verifiedOriginalGlyphWeiOrWood !== null ||
    YUANHAI_KOREAN_FACSIMILE_RETRIEVAL_ROUTE.institutionalCatalog.exactTargetCatalogRecordKey !== null ||
    YUANHAI_KOREAN_FACSIMILE_RETRIEVAL_ROUTE.institutionalCatalog.originalTargetFolioDirectlyViewed ||
    YUANHAI_KOREAN_FACSIMILE_RETRIEVAL_ROUTE.relatedMaterialNotYetProvenOriginal.independentPrintWitnessCredit !== 0 ||
    YUANHAI_KOREAN_FACSIMILE_RETRIEVAL_ROUTE.externalInstitutionOriginalFolioRetrieved ||
    YUANHAI_KOREAN_FACSIMILE_RETRIEVAL_ROUTE.newlyAuthorizedIndependentWitnesses !== 0 ||
    YUANHAI_KOREAN_FACSIMILE_RETRIEVAL_ROUTE.archetypeDeterminationAuthorized ||
    YUANHAI_KOREAN_FACSIMILE_RETRIEVAL_ROUTE.modernAnnualSemanticsAuthorized ||
    YUANHAI_KOREAN_PRIMARY_HOLDINGS_ACCESS_AUDIT.joseonArchivePrimaryRecord.provesPresentNationalLibraryCopyFromSamePlates ||
    YUANHAI_KOREAN_PRIMARY_HOLDINGS_ACCESS_AUDIT.joseonArchivePrimaryRecord.provesFocalAnecdotePrinted ||
    !YUANHAI_KOREAN_PRIMARY_HOLDINGS_ACCESS_AUDIT.koreaUniversityCatalogAccess.compositeCatalogDatingInternallyInconsistent ||
    YUANHAI_KOREAN_PRIMARY_HOLDINGS_ACCESS_AUDIT.koreaUniversityCatalogAccess.targetAncestralFocalCasePresence !== null ||
    YUANHAI_KOREAN_PRIMARY_HOLDINGS_ACCESS_AUDIT.independentlyInspectedFocalPrintsAdded !== 0 ||
    YUANHAI_KOREAN_PRIMARY_HOLDINGS_ACCESS_AUDIT.firstPersonOriginalFocalCaseNegativeClaimAuthorized ||
    !YUANHAI_KOREAN_EARLIER_YANGREN_RESEARCH.earlierYangrenTheoryTraceableInScholarlyQuotation ||
    YUANHAI_KOREAN_EARLIER_YANGREN_RESEARCH.preciseCaseHasPre1600VerifiedProvenance ||
    YUANHAI_KOREAN_EARLIER_YANGREN_RESEARCH.originalFocalPrintWitnessesAdded !== 0 ||
    YUANHAI_KOREAN_EARLIER_YANGREN_RESEARCH.koreanOriginalWoodblockScholarlyWitness.originalPrintedLeafDirectlyOpened ||
    YUANHAI_KOREAN_EARLIER_YANGREN_RESEARCH.koreanOriginalWoodblockScholarlyWitness.focalAnecdotePresentInOriginal !== null ||
    YUANHAI_KOREAN_EARLIER_YANGREN_RESEARCH.earlierSeparateCommentary1518.sameAs1548YangCongEdition ||
    YUANHAI_KOREAN_EARLIER_YANGREN_RESEARCH.earlierSeparateCommentary1518.independentFocalPrintWitnessCredit !== 0 ||
    YUANHAI_PREWANLI_SOURCE_ACCESS_AUDIT.jiajingCompilation1548.survivingOriginalFacsimileIdentified ||
    YUANHAI_PREWANLI_SOURCE_ACCESS_AUDIT.jiajingCompilation1548.originalPrintGlyph !== null ||
    YUANHAI_PREWANLI_SOURCE_ACCESS_AUDIT.koreanEarlierSourceTradition.focalYuanhaiAnecdotePresent !== null ||
    YUANHAI_PREWANLI_SOURCE_ACCESS_AUDIT.koreanEarlierSourceTradition.independentPrintWitnessCredit !== 0 ||
    YUANHAI_PREWANLI_SOURCE_ACCESS_AUDIT.pre1600IndependentPrintWitnessesAdded !== 0 ||
    YUANHAI_PREWANLI_SOURCE_ACCESS_AUDIT.originalGlyphReconstructionAllowed ||
    YUANHAI_PRINT_VARIANT_CRITICAL_ASSESSMENT.mechanicallyValidHourPillar !== '己巳' ||
    YUANHAI_PRINT_VARIANT_CRITICAL_ASSESSMENT.reconstructedArchetypalGlyph !== null ||
    YUANHAI_PRINT_VARIANT_CRITICAL_ASSESSMENT.originalHourFirstGlyphPalaeographicallyAdjudicated ||
    YUANHAI_PRINT_VARIANT_CRITICAL_ASSESSMENT.permissionToPromoteModernAnnualSemantics ||
    YUANHAI_CHONGZHEN_WOOD_OCR_PRINT_LOCATOR.physicalBookNumber !== 2 ||
    YUANHAI_CHONGZHEN_WOOD_OCR_PRINT_LOCATOR.printedJuan !== 2 ||
    !YUANHAI_CHONGZHEN_WOOD_OCR_PRINT_LOCATOR.directOriginalPrintInspectionCompleted ||
    YUANHAI_CHONGZHEN_WOOD_OCR_PRINT_LOCATOR.originalPrintGlyph !== '木' ||
    YUANHAI_CHONGZHEN_WOOD_OCR_PRINT_LOCATOR.targetPdfPageOneBased !== 19 ||
    !YUANHAI_CHONGZHEN_WOOD_OCR_PRINT_LOCATOR.distinctFocalWoodblocksEstablished ||
    YUANHAI_CHONGZHEN_WOOD_OCR_PRINT_LOCATOR.independentCollationCredit !== 1 ||
    YUANHAI_CHONGZHEN_WOOD_OCR_PRINT_LOCATOR.textualGenealogyIndependenceEstablished ||
    YUANHAI_NCL_TAIWAN_PRINT_SCAN.distinctWoodblockEditionEstablished ||
    books[0]?.relevantTargetJuanThreePresent !== false ||
    books[1]?.relevantTargetJuanThreePresent !== true ||
    books[1]?.targetLeafPageOneBasedConfirmed !== 11 ||
    books[1]?.targetPrintedUnOrMuGlyphConfirmed !== '未' ||
    additions.some((x) =>
      x.focalPrintImagePageAndColumnVerified ||
      x.physicallyIndependentFromOtherScansEstablished) ||
    !additions.some((x) =>
      x.witnessTier === 'unverified_print_derived_OCR' &&
      x.observedHourPillar === '巳巳') ||
    !additions.some((x) =>
      x.witnessTier === 'edited_digital_transcription' &&
      x.observedHourPillar === '己巳') ||
    !prior.witnesses.some((x) => x.triplePhrase.includes('亥卯木'))
  ) throw new Error('Unreviewed Ming bibliographic source or glyph promotion');

  const identifiers = [
    ...YUANHAI_DIGITAL_WITNESSES.map((x) => x.id),
    ...additions.map((x) => x.id),
  ];
  if (new Set(identifiers).size !== identifiers.length) {
    throw new Error('Repeated Yuanhai digital witness identity');
  }

  const material = {
    status: 'wanli_wei_and_chongzhen_wood_print_variant_confirmed_meaning_held' as const,
    version: YUANHAI_MING_JUAN3_BIBLIOGRAPHIC_VERSION,
    upstreamDigitalSixPillarHash: prior.witnessHash,
    sources: books,
    additionalTextWitnesses: additions,
    digitalWitnessRecordsTotal: 6 as const,
    independentlyCollatedPrintedWitnessCount: 2 as const, // 2 distinct target-page print settings, not 2 stemmata
    directlyInspectedScanDocumentsCount: 3 as const, // Wanli NLC + Taiwan NCL + Chongzhen NLC
    textualGenealogyIndependenceEstablished: false as const,
    nclTaiwanFacsimile: YUANHAI_NCL_TAIWAN_PRINT_SCAN,
    woodOcrOriginPrintLocator: YUANHAI_CHONGZHEN_WOOD_OCR_PRINT_LOCATOR,
    criticalAssessment: YUANHAI_PRINT_VARIANT_CRITICAL_ASSESSMENT,
    preWanliSourceAccessAudit: YUANHAI_PREWANLI_SOURCE_ACCESS_AUDIT,
    koreanEarlierYangrenResearch: YUANHAI_KOREAN_EARLIER_YANGREN_RESEARCH,
    koreanPrimaryHoldingsAccessAudit: YUANHAI_KOREAN_PRIMARY_HOLDINGS_ACCESS_AUDIT,
    koreanFacsimileRetrievalRoute: YUANHAI_KOREAN_FACSIMILE_RETRIEVAL_ROUTE,
    earlierYangrenDerivedClauseComparison: YUANHAI_EARLIER_YANGREN_DERIVED_CLAUSE_COMPARISON,
    nlkCandidateCallmarkFromAcademicBibliography: YUANHAI_NLK_CANDIDATE_CALLMARK_FROM_ACADEMIC_BIBLIOGRAPHY,
    noContactEarlyPrintAccessAudit: YUANHAI_NO_CONTACT_EARLY_PRINT_ACCESS_AUDIT,
    parallelYuefeiNatalLocusAudit: YUANHAI_PARALLEL_YUEFEI_NATAL_LOCUS_AUDIT,
    directSanmingJuanEightMingPrint: YUANHAI_SANMING_NLC_JUAN8_UPPER_DIRECT_PRINT,
    original1578SanmingTaiwanCopy: YUANHAI_SANMING_NCL_06589_1578_DIRECT_PRINT,
    duplicateAndNextWitnessAudit: YUANHAI_SANMING_JUAN8_DUPLICATE_AND_NEXT_WITNESS_AUDIT,
    japanQingLocalPrintedExampleComparison: YUANHAI_SANMING_JAPAN_QING_JUAN8_LOCAL_COLLATION,
    qingTwoCopyNamedCase: YUANHAI_SANMING_QING_YUEWUMU_TWO_COPY_PRINT_AUDIT,
    qingNamedColumnSafeCollation: YUANHAI_SANMING_QING_YUEWUMU_COLUMN_SAFE_COLLATION,
    mingNlcNclFourOpeningsBlockAudit: YUANHAI_SANMING_MING_NLC_NCL_FOUR_OPENINGS_BLOCK_AUDIT,
    yueFeiFamilyChronicleBirthDateAudit: YUANHAI_YUEFEI_FAMILY_BIRTHDATE_SOURCE_AUDIT,
    yueFeiSongshiShiNotSiAudit: YUANHAI_YUEFEI_SONGSHI_BIRTH_SHI_NOT_SI_AUDIT,
    JinTuoBirthDateTransmissionAudit: YUANHAI_JINTUO_HISTORICAL_TRANSMISSION_PROVENANCE_AUDIT,
    yuanhaiWeiMuLexicalGuard: YUANHAI_YANGREN_WEI_MU_LEXICAL_GUARD,
    preQingJintuoPrintedOriginalCandidates: YUANHAI_JINTUO_PREQING_ORIGINAL_PRINT_CANDIDATES,
    jintuo20261015AccessAndCatalogAudit: YUANHAI_JINTUO_20261015_ACCESS_AND_CATALOG_AUDIT,
    jintuoWygFolioAndOcrConsistencyAudit: YUANHAI_JINTUO_WYG_FOLIO_AND_OCR_CONSISTENCY_AUDIT,
    tianji1582OcrTextualParallelAudit: YUANHAI_1582_TIANJI_OCR_TEXTUAL_PARALLEL_AUDIT,
    tianji1582VsWanli1600TextualAlignment: YUANHAI_TIANJI_1582_VS_WANLI_1600_TEXTUAL_ALIGNMENT,
    liqinLiqinfu1600AuthorityCollisionAudit: YUANHAI_LIQIN_LIQINFU_1600_AUTHORITY_COLLISION_AUDIT,
    liqinEditorRoleAndJisiOcrControl: YUANHAI_1600_LIQIN_EDITOR_ROLE_AND_JISI_OCR_CONTROL,
    nlc1600BookOneEditorialNamePrintAudit: YUANHAI_NLC1600_BOOK1_EDITORIAL_NAME_PRINT_AUDIT,
    sourcePdfChecksumAndAccessGates: YUANHAI_PRINT_20261015_SOURCE_BYTES_AND_ACCESS_GATES,
    housa1582AndToyoCopyAudit: YUANHAI_1582_HOUSA_ALTERNATE_TITLE_AND_TOYO_COPY_AUDIT,
    shanghai1582ModernEditorialRoute: YUANHAI_1582_SHANGHAI_MING_COPY_EDITORIAL_ROUTE,
    sonkeikaku1582CatalogRoute: YUANHAI_1582_SONKEIKAKU_CATALOG_ROUTE,
    moyouzhiRenwuPrintedBibliography: YUANHAI_MOYOUZHI_RENWU_BIBLIOGRAPHIC_FOLIO,
    chineseRareBook1994PrintedCatalogAudit: YUANHAI_1994_CHINESE_RARE_BOOK_CATALOG_PRINT_AUDIT,
    wangWenyuanXiaocitang22JuanPrintedCatalogAudit: YUANHAI_XIAOCITANG_22_JUAN_PRINTED_CATALOG_AUDIT,
    kunaichoShoryobu1582CatalogHoldingAudit: YUANHAI_KUNAICHO_SHORYOBU_1582_CATALOG_HOLDING_AUDIT,
    japanTwoInstitutionReproductionAccessAudit: YUANHAI_JAPAN_TWO_INSTITUTION_REPRODUCTION_ACCESS_AUDIT,
    shidian1582JuanThreeTextualWitnessAudit: YUANHAI_SHIDIAN_1582_JUAN_THREE_TEXTUAL_WITNESS_AUDIT,
    naj2021ScheduledReproductionInventory: YUANHAI_NAJ_2021_DUPLICATE_LISTING_AUDIT,
    yangcongTitleLeafReproductionAudit: YUANHAI_YANGCONG_TITLE_LEAF_REPRODUCTION_AUDIT,
    nlc1600SourceFingerprintWorkflow: YUANHAI_NLC1600_PDF_VERIFIER_WORKFLOW,
    nlc1600DirectFacsimileAccess: YUANHAI_NLC1600_BOOK1_DIRECT_FACSIMILE_ACCESS,
    original1578CriticalEditorialRoute: YUANHAI_SANMING_1578_CRITICAL_EDITORIAL_ROUTE,
    sourceCriticalAudit: Object.freeze({ original1578TargetLeafPhysicallyInspected: true as const, directPrintedCopiesCompared: 2 as const, independentSettingCountVerified: 0 as const, thirdRehostDuplicateNotCounted: true as const, biographicalHourAuthenticated: false as const, productionAuthorized: false as const }),
    verifiedLocalNlcPrint: Object.freeze({
      sourceBookId: 'NLC892-2642-210288' as const,
      pdfSha256: 'de9973d1edf51f0e244863302a4c90b7eb13daea0aa53486f590e2039483f552' as const,
      pdfPageOneBased: 11 as const,
      scannedPageImageWidthPx: 1483 as const,
      scannedPageImageHeightPx: 1404 as const,
      locus: 'right-hand folio, column 運行辛亥亥卯未合起羊刃' as const,
      printedPhrase: '亥卯未合起羊刃' as const,
      verifiedTripleFinalGlyph: '未' as const,
      matchingNlcOcrPhrase: '亥卯未合起羊刃' as const,
      differentEditionOcrPhrase: '亥卯木合起羊刃' as const,
      hourPillarVisualCandidate: '己巳' as const,
      hourPillarFirstGlyph: null,
      hourPillarReviewState: 'single_scan_visual_candidate_not_double_checked' as const,
      firstPassWoodReadingRetracted: true as const,
      printReadingScope: 'single_NLC_physical_print_only' as const,
      inspection: 'manual_visual_scan_checked' as const,
    }),
    unresolvedTextualDisagreements: YUANHAI_JUAN3_TEXTUAL_DISAGREEMENTS,
    unresolved: YUANHAI_JUAN3_PRINT_SCOPE_UNRESOLVED,
    authority: Object.freeze({
      correctPhysicalBookForPrintedJuanThreeIdentified: true as const,
      twoMoreDigitalTranscriptsCompared: true as const,
      sourcePdfPageColumnIdentified: true as const,
      secondPrintScanLocusDirectlyCompared: true as const,
      independentSecondPrintEditionEstablished: true as const, // different target-page woodblock setting
      textualGenealogyIndependenceEstablished: false as const,
      annotatedWorkingBaseSelected: true as const,
      canonicalArchetypeEstablished: false as const,
      preWanliOriginalGlyphVerified: false as const,
      relatedKoreanSourceFocalPassageVerified: false as const,
      earlierYangrenTheoryScholarlyQuoted: true as const,
      koreaUniversity1518FocalGlyphDirectlyInspected: false as const,
      koreanInstitutionalPlateInventoryAttested: true as const,
      survivingNlkPrintFromRecordedPlatesVerified: false as const,
      koreaUniversityCatalogTocLocated: true as const,
      koreanOriginalFocalCaseAbsentProved: false as const,
      officialKorcisSearchRouteVerified: true as const,
      originalKoreanFocalFolioRetrieved: false as const,
      earlyGeneralJiaDayYouLuckQuotationCompared: true as const,
      earlySpecificMingFourPillarAnecdoteAuthenticated: false as const,
      nlkSecondaryCitationCallmarkCandidateIdentified: true as const,
      nlkHoldingRecordIndependentlyConfirmed: false as const,
      publicEarlyPhotoShareIdentified: true as const,
      publicEarlyPhotoShareAccessAndProvenanceVerified: false as const,
      japanese2017AppendixBibliographyVerified: true as const,
      japanesePrintedYangrenFolioAdjudicated: false as const,
      sameReceivedFourPillarsInParallelXiJiAndYangrenLoci: true as const,
      bookOneParallelXiJiFocalOriginalVerified: false as const,
      wanliXiJiPrintContentsJuanTwoVerified: true as const,
      chongzhenXiJiPhysicalBookUnresolved: true as const,
      historicalYuefeiBirthHourVerified: false as const,
      hourPillarMechanicallyValidated: true as const,
      hourPillarOriginalGlyphAdjudicated: false as const,
      chongzhenOcrOriginIdentified: true as const,
      chongzhenFocalPrintGlyphVerified: true as const,
      distinctChongzhenFocalWoodblocksEstablished: true as const,
      actualPrintedUnGlyphConfirmed: true as const,
      actualPrintedWoodGlyphConfirmed: true as const,
      actualPrintedHourStemConfirmed: false as const,
      digitalMajorityVoteAuthorized: false as const,
      fullyValidatedSixPillarHistoricalCase: false as const,
      clashCancellationOrThreeBranchPrecedenceAuthorized: false as const,
      historicalLifeEventVerified: false as const,
      personalAnnualReadingAuthorized: false as const,
      productionAuthorized: false as const,
    }),
    adjudicatedPrintedGlyph: null, // verified separate 未/木 print variants; archetype undecided
    adjudicatedHistoricalWinner: null,
    modernInterpretationClaim: null,
  };
  return Object.freeze({ ...material, scopeHash: deterministicContentHash(material) });
}
