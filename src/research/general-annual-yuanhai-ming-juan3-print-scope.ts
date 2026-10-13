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
  'sa7d-yuanhai-parallel-xiji-juan-number-corrected-v16' as const;

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
    YUANHAI_NCL_TAIWAN_PRINT_SCAN.independentWitnessCredit !== 0 ||
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
