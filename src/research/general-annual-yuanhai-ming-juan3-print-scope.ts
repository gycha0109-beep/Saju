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
    directSanmingJuanEightMingPrint: YUANHAI_SANMING_NLC_JUAN8_UPPER_DIRECT_PRINT,
    original1578SanmingTaiwanCopy: YUANHAI_SANMING_NCL_06589_1578_DIRECT_PRINT,
    duplicateAndNextWitnessAudit: YUANHAI_SANMING_JUAN8_DUPLICATE_AND_NEXT_WITNESS_AUDIT,
    japanQingLocalPrintedExampleComparison: YUANHAI_SANMING_JAPAN_QING_JUAN8_LOCAL_COLLATION,
    qingTwoCopyNamedCase: YUANHAI_SANMING_QING_YUEWUMU_TWO_COPY_PRINT_AUDIT,
    qingNamedColumnSafeCollation: YUANHAI_SANMING_QING_YUEWUMU_COLUMN_SAFE_COLLATION,
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
