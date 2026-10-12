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
  'sa7d-yuanhai-korean-earlier-yangren-text-and-1518-candidate-v9' as const;

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
