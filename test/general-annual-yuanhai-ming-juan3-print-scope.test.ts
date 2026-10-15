import { describe, expect, test } from 'vitest';
import { readFileSync } from 'node:fs';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import {
  YUANHAI_MING_JUAN3_BIBLIOGRAPHIC_VERSION,
  YUANHAI_NLC_PHYSICAL_BOOKS,
  YUANHAI_NCL_TAIWAN_PRINT_SCAN,
  YUANHAI_CHONGZHEN_WOOD_OCR_PRINT_LOCATOR,
  YUANHAI_PRINT_VARIANT_CRITICAL_ASSESSMENT,
  YUANHAI_PREWANLI_SOURCE_ACCESS_AUDIT,
  YUANHAI_KOREAN_EARLIER_YANGREN_RESEARCH,
  YUANHAI_KOREAN_PRIMARY_HOLDINGS_ACCESS_AUDIT,
  YUANHAI_KOREAN_FACSIMILE_RETRIEVAL_ROUTE,
  YUANHAI_EARLIER_YANGREN_DERIVED_CLAUSE_COMPARISON,
  YUANHAI_NLK_CANDIDATE_CALLMARK_FROM_ACADEMIC_BIBLIOGRAPHY,
  YUANHAI_NO_CONTACT_EARLY_PRINT_ACCESS_AUDIT,
  YUANHAI_PARALLEL_YUEFEI_NATAL_LOCUS_AUDIT,
  YUANHAI_YUEFEI_CROSS_GENRE_EVIDENCE_AUDIT,
  YUANHAI_SANMING_PARALLEL_DIGITAL_PASSAGE_COMPARISON,
  YUANHAI_SANMING_NLC_JUAN8_UPPER_DIRECT_PRINT,
  YUANHAI_SANMING_1578_CRITICAL_EDITORIAL_ROUTE,
  YUANHAI_SANMING_NCL_06589_1578_DIRECT_PRINT,
  YUANHAI_SANMING_JUAN8_DUPLICATE_AND_NEXT_WITNESS_AUDIT,
  YUANHAI_SANMING_JAPAN_QING_JUAN8_LOCAL_COLLATION,
  YUANHAI_SANMING_QING_YUEWUMU_TWO_COPY_PRINT_AUDIT,
  YUANHAI_SANMING_QING_YUEWUMU_COLUMN_SAFE_COLLATION,
  YUANHAI_SANMING_MING_NLC_NCL_FOUR_OPENINGS_BLOCK_AUDIT,
  YUANHAI_YUEFEI_FAMILY_BIRTHDATE_SOURCE_AUDIT,
  YUANHAI_YUEFEI_SONGSHI_BIRTH_SHI_NOT_SI_AUDIT,
  YUANHAI_JINTUO_HISTORICAL_TRANSMISSION_PROVENANCE_AUDIT,
  YUANHAI_YANGREN_WEI_MU_LEXICAL_GUARD,
  YUANHAI_JINTUO_PREQING_ORIGINAL_PRINT_CANDIDATES,
  YUANHAI_JINTUO_20261015_ACCESS_AND_CATALOG_AUDIT,
  YUANHAI_JINTUO_WYG_FOLIO_AND_OCR_CONSISTENCY_AUDIT,
  YUANHAI_1582_TIANJI_OCR_TEXTUAL_PARALLEL_AUDIT,
  YUANHAI_TIANJI_1582_VS_WANLI_1600_TEXTUAL_ALIGNMENT,
  YUANHAI_JUAN3_ADDITIONAL_DIGITAL_WITNESSES,
  YUANHAI_JUAN3_TEXTUAL_DISAGREEMENTS,
  YUANHAI_JUAN3_PRINT_SCOPE_UNRESOLVED,
  buildYuanHaiMingJuan3PrintScope,
} from '../src/research/general-annual-yuanhai-ming-juan3-print-scope.js';

describe('Yuanhai Ming printed-juan versus physically bound volume correction', () => {
  test('physical volume one covers printed juan 1/2, not the target chapter in juan 3', () => {
    expect(YUANHAI_MING_JUAN3_BIBLIOGRAPHIC_VERSION).toContain('v16');
    expect(YUANHAI_NLC_PHYSICAL_BOOKS).toHaveLength(2);
    expect(YUANHAI_NLC_PHYSICAL_BOOKS[0]).toMatchObject({
      id: 'NLC892-2642-210287',
      physicalBook: 1,
      printedJuanContained: [1, 2],
      pdfPageCount: 48,
      relevantTargetJuanThreePresent: false,
      suitableForTargetGlyphInspection: false,
    });
    expect(YUANHAI_NLC_PHYSICAL_BOOKS[1]).toMatchObject({
      id: 'NLC892-2642-210288',
      physicalBook: 2,
      printedJuanContained: [3],
      pdfPageCount: 30,
      relevantTargetJuanThreePresent: true,
      suitableForTargetGlyphInspection: true,
      targetLeafPageOneBasedConfirmed: 11,
      targetPrintColumnConfirmed: 'right-hand folio, column containing 運行辛亥亥卯未合起羊刃',
      targetPrintedUnOrMuGlyphConfirmed: '未',
    });
    expect(YUANHAI_NLC_PHYSICAL_BOOKS[1].originalPdfUrl).toContain(
      'upload.wikimedia.org/wikipedia/commons/e/e9/NLC892-2642-210288_',
    );
  });

  test('new NLC scan-derived OCR is a reading of 未 and an hour-pillar anomaly, not a leaf inspection', () => {
    expect(YUANHAI_JUAN3_ADDITIONAL_DIGITAL_WITNESSES).toHaveLength(2);
    expect(YUANHAI_JUAN3_ADDITIONAL_DIGITAL_WITNESSES[0]).toMatchObject({
      parentPrintedBookId: 'NLC892-2642-210288',
      printedJuan: 3,
      sectionHeading: '論陽刃',
      observedHourPillar: '巳巳',
      observedCombinationPhrase: '亥卯未合起羊刃',
      witnessTier: 'unverified_print_derived_OCR',
      actualPrintedHourStemVerified: false,
      actualPrintedTripleLastGlyphVerified: false,
      physicallyIndependentFromOtherScansEstablished: false,
    });
    expect(YUANHAI_JUAN3_ADDITIONAL_DIGITAL_WITNESSES[1]).toMatchObject({
      parentPrintedBookId: null,
      printedJuan: 3,
      observedHourPillar: '己巳',
      observedCombinationPhrase: '亥卯未合起羊刃',
      witnessTier: 'edited_digital_transcription',
      physicallyIndependentFromOtherScansEstablished: false,
    });
    expect(YUANHAI_JUAN3_ADDITIONAL_DIGITAL_WITNESSES.every(
      (item) => !item.focalPrintImagePageAndColumnVerified,
    )).toBe(true);
  });

  test('second-pass NLC print reads 未, retracts prior 木 misreading and preserves other-edition uncertainty', () => {
    expect(YUANHAI_JUAN3_TEXTUAL_DISAGREEMENTS).toHaveLength(2);
    expect(YUANHAI_JUAN3_TEXTUAL_DISAGREEMENTS[0]).toMatchObject({
      locus: 'HAI_MAO_WEI_OR_WOOD',
      values: ['亥卯未', '亥卯木'],
      textSupportsOneUnambiguousMingPrinting: false,
      editorMayNormalizeToWei: false,
    });
    expect(YUANHAI_JUAN3_TEXTUAL_DISAGREEMENTS[1]).toMatchObject({
      locus: 'BIRTH_HOUR_HEAVENLY_STEM',
      values: ['己巳', '巳巳'],
      textSupportsOneUnambiguousMingPrinting: false,
      editorMayNormalizeToWei: false,
    });
    expect(YUANHAI_JUAN3_PRINT_SCOPE_UNRESOLVED)
      .toContain('TARGET_JUAN_THREE_IS_NLC_PHYSICAL_BOOK_TWO_NOT_BOOK_ONE');
    expect(YUANHAI_JUAN3_PRINT_SCOPE_UNRESOLVED)
      .toContain('CHONGZHEN_1634_PRINTED_WOOD_VARIANT_VERIFIED_ARCHETYPE_UNDECIDED');
    expect(YUANHAI_JUAN3_PRINT_SCOPE_UNRESOLVED)
      .toContain('CONFIRMED_PRINT_VARIANT_DOES_NOT_LICENSE_GENERAL_TRIPLE_CLASH_PRECEDENCE');
    expect(YUANHAI_JUAN3_PRINT_SCOPE_UNRESOLVED)
      .toContain('PREVIOUS_NLC_PRINT_WOOD_READING_RETRACTED_AFTER_SECOND_PASS');
    expect(YUANHAI_JUAN3_PRINT_SCOPE_UNRESOLVED)
      .toContain('WANLI_WEI_VERSUS_CHONGZHEN_WOOD_DISTINCT_SETTING_NO_TEXTUAL_GENEALOGY_DECISION');
  });

  test('second 160-page Taiwan scan aligns to NLC without inventing independent edition or semantic authorization', () => {
    expect(YUANHAI_NCL_TAIWAN_PRINT_SCAN).toMatchObject({
      id: 'NCL-06593',
      pdfPageCount: 160,
      printedJuan: 3,
      pdfPageOneBased: 55,
      referenceNlcPdfPageOneBased: 11,
      directVisualTripleGlyphReading: '未',
      hourPillarVisualCandidate: '己巳',
      hourStemIndependentlyAdjudicated: false,
      matchingColumnArrangementObserved: true,
      distinctWoodblockEditionEstablished: false,
      independentWitnessCredit: 0,
    });
    expect(YUANHAI_NCL_TAIWAN_PRINT_SCAN.pdfSha256).toMatch(/^[0-9a-f]{64}$/);
    expect(YUANHAI_JUAN3_PRINT_SCOPE_UNRESOLVED).toContain(
      'NCL_TAIWAN_AND_NLC_SCANS_MATCH_SETTING_BUT_INDEPENDENT_EDITION_NOT_ESTABLISHED',
    );
  });

  test('Chongzhen 1634 printed juan two p19 directly reads 木 in a distinct focal print setting', () => {
    expect(YUANHAI_CHONGZHEN_WOOD_OCR_PRINT_LOCATOR).toMatchObject({
      ocrBookCollectionId: 'NGJ892411999032112149610',
      scannedPhysicalBookId: 'NLC892-411999032112-149611',
      notTargetFirstBookId: 'NLC892-411999032112-149610',
      physicalBookNumber: 2,
      printedJuan: 2,
      scanPdfPageCount: 36,
      observedOcrPhrase: '亥卯木合起羊刃',
      targetPdfPageOneBased: 19,
      targetColumn: 'left-hand folio, vertical column containing 亥卯木合起羊刃',
      scannedPageImageWidthPx: 4081,
      scannedPageImageHeightPx: 3563,
      originalPrintGlyph: '木',
      directlyInspectedPrintPhrase: '亥卯木合起羊刃',
      hourPillarVisualCandidate: '己巳',
      hourFirstGlyphFinallyAdjudicated: false,
      directOriginalPrintInspectionCompleted: true,
      distinctFocalTypesettingObserved: true,
      distinctFocalWoodblocksEstablished: true,
      textualGenealogyIndependenceEstablished: false,
      independentCollationCredit: 1,
      evidenceTier: 'facsimile_directly_inspected_distinct_focal_setting',
    });
    expect(YUANHAI_CHONGZHEN_WOOD_OCR_PRINT_LOCATOR.pdfUrl)
      .toContain('149611_');
    expect(YUANHAI_CHONGZHEN_WOOD_OCR_PRINT_LOCATOR.originalPdfSha256)
      .toMatch(/^[0-9a-f]{64}$/);
    expect(YUANHAI_JUAN3_PRINT_SCOPE_UNRESOLVED).toContain(
      'CHONGZHEN_1634_PRINTED_WOOD_VARIANT_VERIFIED_ARCHETYPE_UNDECIDED',
    );
  });

  test('working base is editorial and cannot overwrite either verified printing or the unknown archetype', () => {
    const a = YUANHAI_PRINT_VARIANT_CRITICAL_ASSESSMENT;
    expect(a.observedPrintVariants).toEqual([
      { edition: 'wanli_1600', pdfPage: 11, glyph: '未' },
      { edition: 'chongzhen_1634', pdfPage: 19, glyph: '木' },
    ]);
    expect(a.selectedResearchWorkingBase).toBe('wanli_1600_printed_亥卯未');
    expect(a.workingBaseIsArchetype).toBe(false);
    expect(a.reconstructedArchetypalGlyph).toBeNull();
    expect(a.variantCausation).toBeNull();
    expect(a.chongzhenWoodReadingToBeSilentlyNormalized).toBe(false);
    expect(a.laterEditedTextAsIndependentPrintWitness).toBe(false);
    expect(a.prefaceClaimIndependentVerification).toBe(false);
    expect(a.permissionToAutoCorrectPrintedWitness).toBe(false);
  });

  test('甲子 day at 巳 hour mechanically gives 己巳; OCR 巳巳 remains a print-glyph HOLD', () => {
    const a = YUANHAI_PRINT_VARIANT_CRITICAL_ASSESSMENT;
    const heavenly = Array.from('甲乙丙丁戊己庚辛壬癸');
    const earthly = Array.from('子丑寅卯辰巳午未申酉戌亥');
    const sequence = earthly.slice(0, 6).map((branch,i) => heavenly[i] + branch);
    expect(sequence).toEqual(a.fiveRatsStemBranchSequence);
    expect(sequence[5]).toBe('己巳');
    expect(a.mechanicallyValidHourPillar).toBe('己巳');
    expect(heavenly.includes(a.anomalousOcrHourPillar.charAt(0))).toBe(false);
    expect(a.anomalousOcrHourPillar).toBe('巳巳');
    expect(a.originalHourFirstGlyphPalaeographicallyAdjudicated).toBe(false);
    expect(a.historicalPersonBirthPillarsAuthenticated).toBe(false);
    expect(a.permissionToPromoteModernAnnualSemantics).toBe(false);
  });

  test('1548 attributed compilation without a verified facsimile cannot be a printed focal glyph witness', () => {
    const q = YUANHAI_PREWANLI_SOURCE_ACCESS_AUDIT;
    expect(q.jiajingCompilation1548).toMatchObject({
      attributedCompilationYear: 1548,
      attributedCompiler: '楊淙',
      survivingOriginalFacsimileIdentified: false,
      verifiedHoldingIdentifier: null,
      targetPassagePrinted: null,
      targetPassagePage: null,
      originalPrintGlyph: null,
      independentPrintWitnessCredit: 0,
    });
    expect(q.searchConclusion).toBe('no_pre1600_focal_locus_directly_collated');
    expect(q.originalGlyphReconstructionAllowed).toBe(false);
    expect(q.pre1600IndependentPrintWitnessesAdded).toBe(0);
  });

  test('Korean original-source tradition is a separate text, not a presumed 1548 copy or proof of anecdote', () => {
    const q = YUANHAI_PREWANLI_SOURCE_ACCESS_AUDIT.koreanEarlierSourceTradition;
    expect(q).toMatchObject({
      title: '子平三命通變淵源',
      prefaceDateClaim: '寶祐元年(1253)',
      prefaceDateNotSurvivingManuscriptDate: true,
      reportedWoodblockHolding: 'National Library of Korea',
      reportedManuscriptHolding: 'Kyujanggak, Seoul National University',
      focalYuanhaiAnecdotePresent: null,
      matchesJiajingCompilation1548: false,
      targetPhraseRead: null,
      independentPrintWitnessCredit: 0,
    });
    expect(q.peerReviewedStudyUrl).toContain('ART001708343');
  });

  test('an earlier Korean woodblock-backed scholarly Yangren quotation is theory evidence, not the target case print', () => {
    const x = YUANHAI_KOREAN_EARLIER_YANGREN_RESEARCH;
    expect(x.earlierYangrenTheoryTraceableInScholarlyQuotation).toBe(true);
    expect(x.koreanOriginalWoodblockScholarlyWitness).toMatchObject({
      originalWork: '子平三命通變淵源',
      studySection: '卷上 看命入式 日刃·陽刃',
      quotedYangrenClause: '獨陽刃以時言之，四柱中不要入財鄕，怕衝陽刃',
      examinedScholarlyQuotationContainsFullFocalAnecdote: false,
      originalPrintedLeafDirectlyOpened: false,
      originalPrintedPageAndColumn: null,
      focalAnecdotePresentInOriginal: null,
      focalCaseGlyph: null,
      doesScholarlyExampleJiSiProveFocalFourPillars: false,
      independentFocalPrintWitnessCredit: 0,
    });
    expect(x.preciseCaseHasPre1600VerifiedProvenance).toBe(false);
    expect(x.earlyPrintGlyphReconstructionAuthorized).toBe(false);
    expect(x.originalFocalPrintWitnessesAdded).toBe(0);
  });

  test('1518 Korea University San-che commentary is distinct from the 1548 imprint and never a verified target print', () => {
    const c = YUANHAI_KOREAN_EARLIER_YANGREN_RESEARCH.earlierSeparateCommentary1518;
    expect(c).toMatchObject({
      catalogTitle: '新編三車一覽子平淵源註解',
      reportedHistoricalPrintingYear: 1518,
      catalogControlNumber: '000000724230',
      recordedType: '乙亥字',
      volumes: 'three_juan_three_books',
      sameAs1548YangCongEdition: false,
      sameAsTwoJuanKoreanOriginal: false,
      particularSurvivingCopyPrintDateVerified: false,
      focalYangrenAnecdotePresent: null,
      originalTargetLeafOpened: false,
      originalPrintGlyph: null,
      independentFocalPrintWitnessCredit: 0,
    });
    expect(c.catalogRecordUpper).toContain('000000134095');
    expect(c.catalogRecordLower).toContain('000000134097');
    expect(YUANHAI_JUAN3_PRINT_SCOPE_UNRESOLVED)
      .toContain('KOREA_UNIVERSITY_1518_SAN_CHE_DERIVATIVE_NOT_1548_YANG_CONG');
  });

  test('historical Seoungwanji plate inventory is primary evidence of historical holdings, not an examined target folio', () => {
    const a = YUANHAI_KOREAN_PRIMARY_HOLDINGS_ACCESS_AUDIT;
    expect(a.joseonArchivePrimaryRecord).toMatchObject({
      recordId: 'jlawb_650_0050_0010',
      location: '卷四 書器',
      recordedWorkTitle: '徐子平三命通變淵源',
      recordedVolumeCount: 2,
      archivedPlateHoldingStatement: '本監藏板',
      originalBookPagesDigitallyInspected: false,
      provesPresentNationalLibraryCopyFromSamePlates: false,
      provesFocalAnecdotePrinted: false,
      originalTargetGlyph: null,
      printWitnessCredit: 0,
    });
    expect(a.firstPersonOriginalFocalCaseNegativeClaimAuthorized).toBe(false);
    expect(a.independentlyInspectedFocalPrintsAdded).toBe(0);
    expect(a.preWanliGlyphAdjudicationAuthorized).toBe(false);
  });

  test('Korea University TOC and chronologically inconsistent catalog year do not prove 1518 target words', () => {
    const a = YUANHAI_KOREAN_PRIMARY_HOLDINGS_ACCESS_AUDIT.koreaUniversityCatalogAccess;
    expect(a).toMatchObject({
      controlNumber: '000000724230',
      cataloguedVolumeCount: 3,
      catalogCalendarLabelVerbatim: '中宗15(1518)',
      historicalImprintDateFromSecondarySource: '正德十三年(1518)',
      compositeCatalogDatingInternallyInconsistent: true,
      physicalSurvivingCopyDatingAuthenticated: false,
      targetAncestralFocalCasePresence: null,
      originalTargetGlyph: null,
      printWitnessCredit: 0,
    });
    expect(a.indexedCatalogVolumeTian).toMatchObject({
      volume: '天',
      registrationNumber: '461225367',
      tocContainsZhengZhenLun: true,
      tocContainsXingHeGe: true,
      targetYangrenFolioDirectlyOpened: false,
    });
    expect(a.indexedCatalogVolumeRen).toMatchObject({
      volume: '人',
      registrationNumber: '461225369',
      tocOpening: '繼善篇',
      targetYangrenFolioDirectlyOpened: false,
    });
  });

  test('KORCIS discovery route and alternate titles cannot be mistaken for holding record or original scan', () => {
    const k = YUANHAI_KOREAN_FACSIMILE_RETRIEVAL_ROUTE;
    expect(k.institutionalCatalog.publicSimpleSearchUrl).toBe('https://www.nl.go.kr/korcis/search/simple.do');
    expect(k.institutionalCatalog.publicSearchAndOriginalImageViewingNoLoginRequired).toBe(true);
    expect(k.institutionalCatalog.apiRecordFields).toContain('REC_KEY');
    expect(k.institutionalCatalog.apiHoldingFields).toContain('CALL_NO');
    expect(k.institutionalCatalog.apiHoldingFields).toContain('ORIGINAL_YN');
    expect(k.institutionalCatalog.exactTargetCatalogRecordKey).toBeNull();
    expect(k.institutionalCatalog.exactTargetHoldingCallNumber).toBeNull();
    expect(k.institutionalCatalog.originalAvailabilityVerifiedForTarget).toBeNull();
    expect(k.institutionalCatalog.originalImageUrlVerifiedForTarget).toBeNull();
    expect(k.institutionalCatalog.originalTargetFolioDirectlyViewed).toBe(false);
    expect(k.institutionalCatalog.queriedXmlResponseSuccessfullyParsed).toBe(false);
    expect(k.attestedNameFormsForBroadCatalogSearch).toContain('子平淵源');
    expect(k.attestedNameFormsForBroadCatalogSearch).toContain('子平三命通變淵源');
    expect(k.ambiguousXuZipingShortTitleNeedsAuthorAndVolumeDisambiguation).toBe(true);
  });

  test('catalogued third-party manuscript-like PDF filename is not a verified focal print', () => {
    const k = YUANHAI_KOREAN_FACSIMILE_RETRIEVAL_ROUTE;
    expect(k.relatedMaterialNotYetProvenOriginal).toMatchObject({
      actualFileBytesObtained: false,
      matchesNlkOrKyujanggakHoldingVerified: false,
      originalTargetFolioAndGlyphVerified: false,
      originalCasePresence: null,
      independentPrintWitnessCredit: 0,
    });
    expect(k.externalInstitutionOriginalFolioRetrieved).toBe(false);
    expect(k.historicalFocalCasePreWanliPresence).toBeNull();
    expect(k.newlyAuthorizedIndependentWitnesses).toBe(0);
    expect(k.archetypeDeterminationAuthorized).toBe(false);
    expect(k.modernAnnualSemanticsAuthorized).toBe(false);
  });

  test('scholarly versus modern quoted Yangren clauses never create an original early print witness', () => {
    const x = YUANHAI_EARLIER_YANGREN_DERIVED_CLAUSE_COMPARISON;
    expect(x.academicallyCitedEarlySource).toMatchObject({
      citedSection: '卷上 看命入式 日刃·陽刃',
      citedShortClause: '怕衝陽刃',
      sourceTier: '2019_research_academic_transcription',
      directlyInspectedOriginalBookFolio: false,
      containsSpecificMingFourPillarAnecdoteInCitedExtract: false,
      focalPrintedWitnessCredit: 0,
    });
    expect(x.modernExegeticalAttributedQuotation).toMatchObject({
      exampleQuotedJoinDisapproval: '不喜会合',
      exampleQuotedJiaDayYouLuckAversion: '忌酉运',
      generalJiaDayAndYouLuckOverlapWithMingExample: true,
      specificNatalPillarsQuoteFoundInExaminedSegment: false,
      independentEarlyPrintedFolioVerified: false,
      verifiedOriginalGlyphWeiOrWood: null,
      modernCommentaryContainsIndependentPrintAuthority: false,
      focalPrintedWitnessCredit: 0,
    });
    expect(x.sameHistoricalAnecdoteAcrossSourcesEstablished).toBe(false);
    expect(x.earlierPrintedPassageNegativelyCheckedForAnecdote).toBe(false);
    expect(x.generalClashVersusCombinationPriorityEstablished).toBe(false);
    expect(x.personalAnnualOutcomeAuthorized).toBe(false);
    expect(x.extraEarlyPrintedLociVerified).toBe(0);
  });

  test('secondary thesis citation identifies candidate NLK callmark without spoofing a library MARC record or inspected print', () => {
    const x = YUANHAI_NLK_CANDIDATE_CALLMARK_FROM_ACADEMIC_BIBLIOGRAPHY;
    expect(x).toMatchObject({
      canonicalWorkTitle: '子平三命通變淵源',
      bibliographyCallmarkVerbatim: '한古朝19-104',
      owningInstitutionAttributedInCitation: '국립중앙도서관',
      citingBibliographyEntry: 24,
      sourceTier: 'secondary_academic_reference_list_holding_callmark_candidate',
      institutionMARCRecordConfirmed: false,
      institutionKorcisRecKey: null,
      originalImageStableUrl: null,
      callmarkMatchedAgainstCurrentInstitutionHoldings: false,
      originalTargetFolioOpened: false,
      actualCaseInPrintEstablished: null,
      printedEarlyGlyph: null,
      independentPrintedFocalWitnessCredit: 0,
    });
    expect(x.sourceUrl).toContain('d08ee38324aa6aeaffe0bdc3ef48d419');
    expect(YUANHAI_JUAN3_PRINT_SCOPE_UNRESOLVED)
      .toContain('NLK_CALLMARK_CANDIDATE_SECONDARY_BIBLIOGRAPHY_NOT_MARC_VERIFIED');
  });

  test('1518 public community photo cloud-share identifier is a source lead, never counted as original', () => {
    const x = YUANHAI_NO_CONTACT_EARLY_PRINT_ACCESS_AUDIT;
    expect(x.koreaUniversityDerivativePhotoMirror).toMatchObject({
      publicCloudShareUrl: 'https://pan.baidu.com/s/1wuAfsAvyF93-U9YVGib6Cw?pwd=YYDS',
      publishedShareAccessCode: 'YYDS',
      somePagesReportedMissingByForumParticipants: true,
      provenanceOfSharedImagesAuthenticated: false,
      publicCloudShareFileBytesObtained: false,
      scannedSpecificYangrenSection: false,
      inspectedFocalPillars: null,
      directFocalPrintWitnessCredit: 0,
    });
    expect(x.targetEarlyTextPassageDirectlyInspected).toBe(false);
    expect(x.focalAnecdoteInEarlyTexts).toBeNull();
    expect(x.newDirectFocalPrintWitnesses).toBe(0);
    expect(x.modernAnnualPriorityAuthorized).toBe(false);
  });

  test('2017 Japanese-copy appendix reference and Ming colophon cannot authenticate an early original focal leaf', () => {
    const x = YUANHAI_NO_CONTACT_EARLY_PRINT_ACCESS_AUDIT;
    expect(x.japaneseRepositoryReportedIn2017Edition).toMatchObject({
      namedHolding: '靜嘉堂文庫',
      isbn13: '9789887736172',
      editorReportsJapaneseCopyCompleteFrontAndBack: true,
      separateJapaneseSourceTextIncludedAsAppendix: true,
      exactFocalPageShownInPublicSample: false,
      publiclyVerifiedSourceFolioImage: false,
      republicationIsUntouchedFacsimileVerified: false,
      editedTextIsIndependentHistoricalPrintWitness: false,
      japaneseOriginalPrintedFocalGlyph: null,
      directlyCollatedOriginalFocalWitnessCredit: 0,
    });
    expect(x.historicalPublicationDisambiguation).toMatchObject({
      reportedMingZhengde13Date: 1518,
      physicalKoreaUniversityMetalTypeImpressionDateEstablished: false,
      chineseHistoricalPrinterAndKoreanSurvivingMetalTypeSameSettingProved: false,
      sourceDocumentPrintingRelationshipResolved: false,
    });
    expect(x.reconstructedVariantAncestor).toBeNull();
    expect(YUANHAI_JUAN3_PRINT_SCOPE_UNRESOLVED)
      .toContain('JAPAN_SEIKADO_2017_APPENDIX_FULL_TEXT_CLAIM_NOT_DIRECT_PRINT_PAGE_INSPECTION');
  });

  test('parallel four-pillar anecdote in Xiji and Yangren is a received textual cross-locus, not two inspected print settings', () => {
    const q = YUANHAI_PARALLEL_YUEFEI_NATAL_LOCUS_AUDIT;
    expect(q.fourPillarsDigitalTranscription).toEqual(['癸未', '乙卯', '甲子', '己巳']);
    expect(q.largeLuckRecorded).toBe('辛亥');
    expect(q.annualMarkerRecorded).toBe('辛酉');
    expect(q.sameCaseNarrativeAcrossTwoReceivedTextLocations).toBe(true);
    expect(q.mingYangrenPrintLocus).toMatchObject({
      wanliNlcBookTwoPdfPage: 11,
      wanliDirectlyRead: '亥卯未合起羊刃',
      chongzhenNlcBookTwoPdfPage: 19,
      chongzhenDirectlyRead: '亥卯木合起羊刃',
      chongzhenNatalYearCharacterOnSamePage: '未',
      chongzhenYearAndCompoundWoodBothVisibleInSamePrintedCase: true,
      printedParagraphExplicitlyNamesYueFei: false,
      localClashOrCombinationWinnerAlgorithmEstablished: false,
      newPrintedWitnessCredit: 0,
    });
    expect(q.receivedXiJiParallelLocus).toMatchObject({
      textAttributedPerson: '岳飛',
      receivedWebsiteChapterLabel: '卷一',
      wanliPrintedContentsJuanNumber: 2,
      wanliPrintedContentsVerifiedFromNclPdfPage: 1,
      chongzhenPrintedJuanForThisParallelCase: null,
      chongzhenPhysicalBookForThisParallelCase: null,
      textDescribesDeathAge: '三十九歲',
      textDescribesDeathSetting: '獄中',
      firstEditionPhysicalBookOne: 'NLC892-2642-210287',
      firstEditionBookOnePdfPagesTotal: 48,
      secondEditionPhysicalBookOne: 'NLC892-411999032112-149610',
      secondEditionBookOnePdfPagesTotal: 37,
      targetPageInEitherPrintedBookOne: null,
      anyBookOneOriginalPdfBytesObtained: false,
      originalBookOneFocalFolioDirectlyInspected: false,
      attributionIsVerifiedIndependentHistoricalBirthRecord: false,
      newPrintedWitnessCredit: 0,
    });
    expect(q.receivedXiJiParallelLocus.nlcPrintDerivedOcr).toMatchObject({
      linkedPrintedBookId: 'NLC892-2642-210287',
      printedJuan: 2,
      printedSection: '喜忌篇',
      incompleteNatalFragmentVerbatim: expect.stringContaining('假如癸未乙'),
      eventFragmentVerbatim: expect.stringContaining('行運辛亥'),
      completeFourPillarsResolvedFromOcr: false,
      yueFeiNameResolvedFromOcr: false,
      scannedTargetPdfPage: null,
      scannedTargetPrintColumn: null,
      originalFolioDirectlyRead: false,
      independentPrintedWitnessCredit: 0,
      originalWeiWoodArchetypeSupported: false,
    });
    expect(q.receivedXiJiParallelLocus.chongzhenXiJiOcrScope).toMatchObject({
      parentPhysicalBookId: 'NLC892-411999032112-149610',
      printedJuanForChapter: 1,
      observedAphorism: '刼財陽刃切忌時逢歲運併臨災殃立至',
      fullFourPillarsInInspectedOcr: false,
      yueFeiNameInInspectedOcr: false,
      xinHaiXinYouEventInInspectedOcr: false,
      originalPrintedAnectodeAbsenceEstablished: false,
      physicalXiJiFolioDirectlyInspected: false,
      focalPrintPageAndColumn: null,
      provesSameCaseInChongzhenXiJi: false,
      independentlyCollatedFocalWitnessesAdded: 0,
    });
    expect(q.receivedXiJiParallelLocus.chongzhenJuanOneInteractionOcrScope).toMatchObject({
      receivedTriple: '亥卯未',
      receivedClash: '卯酉相冲',
      directPrintedGlyphCheck: false,
      allowsConjecturalExplanationOfChongzhenWoodGlyph: false,
      allowsAutomaticNormalizationOfWoodToWei: false,
      globalCombinationClashPrecedenceAuthorized: false,
      independentPrintedWitnessCredit: 0,
    });
    expect(q.receivedXiJiParallelLocus.chongzhenPrintedJuanForThisParallelCase).toBeNull();
    expect(q.receivedXiJiParallelLocus.chongzhenPhysicalBookForThisParallelCase).toBeNull();
    expect(q.historyOrHistoricalBirthHourAuthenticated).toBe(false);
    expect(q.textualGenealogyIndependentWitnessesAdded).toBe(0);
    expect(q.printedFocalCollationsAdded).toBe(0);
    expect(q.modernAnnualPrecedenceAuthorized).toBe(false);
  });

  test('Song death and family birth records confirm dated events, not the alleged hour', () => {
    const q = YUANHAI_YUEFEI_CROSS_GENRE_EVIDENCE_AUDIT;
    expect(q.biographicalBirthRecord).toMatchObject({
      recordedYear: '崇寧二年癸未',
      recordedLunarBirthDay: '二月十五日',
      birthHourGiven: false,
      fourPillarsAllPresent: false,
      originalSongAutographExamined: false,
    });
    expect(q.chronologicalDeathRecord).toMatchObject({
      regnalYear: '紹興十一年',
      regnalLunarMonth: '十二月',
      dayStemBranch: '癸巳',
      deathInstitution: '大理寺',
      recordedDeathAge: 39,
      deathEpisodeAndTraditionalAgeCorroborated: true,
      birthHourOrFullNatalChartEstablished: false,
    });
    expect(q.verifiedHistoricalYearDayOrEventMeansAuthenticatedBirthHour).toBe(false);
  });

  test('Song 1103 month 2 day 15 falls on Jiazi by calendar, not by asserted birth hour', () => {
    const q = YUANHAI_YUEFEI_CROSS_GENRE_EVIDENCE_AUDIT.conditionalCalendarDayCorroboration;
    const stems = [...'甲乙丙丁戊己庚辛壬癸'];
    const branches = [...'子丑寅卯辰巳午未申酉戌亥'];
    const sexagenary = Array.from({ length: 60 }, (_, i) => {
      const stem = stems[i % stems.length];
      const branch = branches[i % branches.length];
      if (stem === undefined || branch === undefined) {
        throw new Error('Sexagenary cycle indexing must resolve');
      }
      return stem + branch;
    });
    const first = sexagenary.indexOf(q.reconstructedFirstDayGanzhi);
    expect(first).toBeGreaterThanOrEqual(0);
    const atDay = (lunarDay: number) => sexagenary[(first + lunarDay - 1) % 60];
    expect(q).toMatchObject({
      historicalLunisolarMonth: '崇寧二年二月',
      reconstructedFirstDayGregorian: '1103-03-10',
      reconstructedFirstDayGanzhi: '庚戌',
      recordedBirthLunarDay: 15,
      sexagenaryDayOffsetFromFirst: 14,
      computedBirthDayGanzhi: '甲子',
      reconstructedGregorianDate: '1103-03-24',
      alignsReceivedYueFeiDayPillarIfBirthDateAccurate: true,
      songChronicleExplicitlyStatesYueFeiBirthday: false,
      validatesBirthHourJiSi: false,
      mathematicallyValidDayPillarMeansBiographicallyAuthenticatedFourPillars: false,
      independentPrintedMingFocalWitnessCredit: 0,
    });
    expect(atDay(q.recordedBirthLunarDay)).toBe(q.computedBirthDayGanzhi);
    for (const entry of q.chronicleInMonthCrossCheck) {
      expect(atDay(entry.day)).toBe(entry.ganzhi);
    }
    expect(q.validatesSajuPredictionOrShenShaInterpretation).toBe(false);
  });

  test('1103 solar term reconstruction conditionally supports Yi-Mao month but not a historical hour', () => {
    const q = YUANHAI_YUEFEI_CROSS_GENRE_EVIDENCE_AUDIT.conditionalSolarMonthCrossCheck;
    expect(q).toMatchObject({
      recordBirthDate: '崇寧二年二月十五',
      prolepticGregorianDate: '1103-03-24',
      computationMethod: 'pyswisseph 2.10.03 FLG_MOSEPH',
      jingzheLongitudeDegrees: 345,
      jingzheComputedDayUtc: '1103-03-06',
      qingmingLongitudeDegrees: 15,
      qingmingComputedDayUtc: '1103-04-06',
      guiYearTigerMonth: '甲寅',
      secondMonthPillarConditional: '乙卯',
      birthDateHistoricallyAuthenticatedByThis: false,
      officialSongAlmanacIndependentlyCollated: false,
      allegedJiSiBirthHourAuthenticatedByThis: false,
      fullyAuthenticatedFourPillars: false,
      newPrintedWitnessCredit: 0,
      productionMeaningAuthorized: false,
    });
    expect(q.jingzheComputedDayUtc < q.prolepticGregorianDate).toBe(true);
    expect(q.prolepticGregorianDate < q.qingmingComputedDayUtc).toBe(true);
    const stems = ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
    expect(stems[(stems.indexOf('甲') + 1) % 10] + '卯').toBe(q.secondMonthPillarConditional);
    expect(q.apparentSolarLongitudeAtNoonDegreesApprox).toBeGreaterThan(0);
    expect(q.apparentSolarLongitudeAtNoonDegreesApprox).toBeLessThan(15);
  });

  test('parallel portal passages do not prove the named example was absent from a printed leaf', () => {
    const a = YUANHAI_SANMING_PARALLEL_DIGITAL_PASSAGE_COMPARISON;
    expect(a.nlcWanliLinkedOcr).toMatchObject({
      evidenceTier: 'B_print_linked_unverified_OCR',
      observedExcerpt: expect.stringContaining('主貴作飛。癸未乙卯'),
      originalPrintedNameAndPillarsVerified: false,
    });
    expect(a.alternativePortalText).toMatchObject({
      digitalSourceIdentifier: 'HY1521',
      evidenceTier: 'C_unpinned_digital_text',
      observedExcerpt: expect.stringContaining('化氣主貴。甲寅日己巳時'),
      yuefeiNamedExampleVisibleInExaminedParagraph: false,
      editionOrPrintImageIdentityVerified: false,
      omissionFromHistoricalPrintedEditionProved: false,
    });
    expect(a.comparison).toMatchObject({
      physicalLeafOmissionEstablished: false,
      nlcFascicle15UpperJuanAndTargetLeafDirectlyInspected: true,
      original1578NclNamedCaseVerified: false,
      independentPrintedFocalWitnessesAdded: 0,
      historicalBirthHourVerified: false,
      generalClashCombinationSemanticsAuthorized: false,
      productionAuthorized: false,
    });
  });


  test('NLC fascicle 15 proves the printed Yue Fei four pillars without authenticating actual birth hour', () => {
    const p = YUANHAI_SANMING_NLC_JUAN8_UPPER_DIRECT_PRINT;
    expect(p).toMatchObject({
      volumeId: 'NLC892-411999029701-66492',
      printedJuanOnCover: '卷八上',
      sourcePdfSha256: '009396f2dfd848194d7fa73c6e02ea51c010d3a9f0d5f3eb83be35d6b6a2e777',
      sourcePdfPageCount: 57,
      sectionHeadingPageOneBased: 13,
      directPrintedCasePdfPageOneBased: 14,
      directPrintedCaseColumnFromRight: 2,
      printedRun: '岳飛癸未乙卯甲子己巳',
      printedPillars: ['癸未', '乙卯', '甲子', '己巳'],
      evidenceTier: 'A_original_print_facsimile_direct_visual',
      directPrintedNameAndFourPillarsConfirmed: true,
      ocrNameMisreading: '作飛',
      ocrHourMisreading: '已已',
      printedSettingsIndependentOfNcl1578Established: false,
      original1578PrintedExampleConfirmed: false,
      historicallyVerifiedBirthHour: false,
      modernAnnualReadingAuthorized: false,
      productionAuthorized: false,
    });
    expect(buildYuanHaiMingJuan3PrintScope().directSanmingJuanEightMingPrint).toEqual(p);
    expect(YUANHAI_YUEFEI_CROSS_GENRE_EVIDENCE_AUDIT.mingSanmingTonghuiLocus.nlcMingFocalCasePrintDerivedOcr).toMatchObject({
      targetedSectionInPhysicalFascicle15DirectlyVerified: true,
      exactPrintedNameGlyphVerified: true,
      originalHourStemDirectlyRead: true,
      additionalDirectlyCollatedMingFocalWitnessCredit: 1,
      original1578FocalPrintVerifiedByThisOcr: false,
    });
  });

  test('modern 1578 critical-edition collation account remains C rather than first-edition original', () => {
    const q = YUANHAI_SANMING_1578_CRITICAL_EDITORIAL_ROUTE;
    expect(q).toMatchObject({
      sourceTier: 'C_modern_critical_editorial_account',
      editorialClaimOriginalPrintYear: 1578,
      editorialClaimCollatedHoldings: ['中國國家圖書館', '浙江省圖書館', '臺灣國家圖書館'],
      editorialClaimThreeCollatedCopiesLargelyAgree: true,
      editorialClaimTaiwanCopyHasCorrectionsAndMarginalNotes: true,
      editorialClaim1735RevisedEditionAddsPostWanliExamples: true,
      companionPrefaceAttestsEditorialCorrectionsToSimilarGlyphsJiSi: true,
      original1578TaiwanCommonsPartOnePages: 1000,
      nlcMingPrintedFascicle15Is1578FirstCutIndependentlyAuthenticated: false,
      ncl1578FocalJuanEightPageDirectlyObtained: true,
      printedFocalCasesDirectlyAddedByThisEditorialSource: 0,
      actualHistoricalYuefeiBirthHourAuthenticated: false,
      productionAuthorized: false,
    });
    expect(buildYuanHaiMingJuan3PrintScope().original1578CriticalEditorialRoute).toEqual(q);
    expect(YUANHAI_YUEFEI_CROSS_GENRE_EVIDENCE_AUDIT.allNewFocalPrintedWitnessesAdded).toBe(2);
    expect(YUANHAI_YUEFEI_CROSS_GENRE_EVIDENCE_AUDIT.mingSanmingTonghuiLocus.independentMingPrintedFocalWitnessCredit).toBe(0);
  });







  test('Yue Wumu Qing columns do not steal Jiazi from adjacent Tongpan example', () => {
    const c = YUANHAI_SANMING_QING_YUEWUMU_COLUMN_SAFE_COLLATION;
    expect(c).toMatchObject({
      locus: '甲子日己巳時',
      targetFigure: '岳武穆',
      printedTableTarget: {
        rowOneYearAndName: { printedYear: '癸未', firstNameFragment: '岳武' },
        rowTwoMonthAndName: { printedMonth: '乙卯', lastNameFragment: '穆' },
        tableDirectPrintImageEvidenceTier: 'A_scope_bounded_printed_leaf',
        rowToSingleFigurePairingFromVisualAlignment: true,
        allOriginalTableCellsColumnByColumnVerified: false,
      },
      sectionContext: {
        sectionDay: '甲子',
        sectionHour: '己巳',
        dayAndHourNotSeparateTableGlyphsForYueWumu: true,
      },
      contextualFourPillars: ['癸未','乙卯','甲子','己巳'],
      MingOriginalCorroboration: {
        printedContinuousNameAndFourPillars: '岳飛癸未乙卯甲子己巳',
      },
      receivedSikuTableText: {
        adjacentSecondColumn: { year: '戊寅', month: '己未', figure: '布政' },
        adjacentThirdColumn: { year: '甲子', month: '癸酉', figure: '通判' },
        adjacentFourthColumn: { year: '癸酉', month: '丁巳', figure: '指揮' },
        evidenceTier: 'C_received_transcription',
        adjoiningCaseJiaziIsNotYueFeiDayOrYear: true,
      },
      editedNoNamedChartsWebpage: {
        exampleChartsOmittedInDisplayedEdition: true,
        lackOfPrintedOriginalExampleEstablished: false,
        deliberateQingDeletionEstablished: false,
      },
      fullySourceAutonomousQingFourPillarCaseWithoutSectionContext: false,
      historicBirthHourAuthenticated: false,
      qingWoodblockIndependenceProved: false,
      newMingPrintedWitnessCredit: 0,
      modernAnnualReadingAuthorized: false,
      productionAuthorized: false,
    });
    expect(buildYuanHaiMingJuan3PrintScope().qingNamedColumnSafeCollation).toEqual(c);
    expect(YUANHAI_SANMING_QING_YUEWUMU_TWO_COPY_PRINT_AUDIT.QingPhysicalCopiesWithNamedCase).toBe(2);
    expect(YUANHAI_YUEFEI_CROSS_GENRE_EVIDENCE_AUDIT.allNewFocalPrintedWitnessesAdded).toBe(2);
  });







  test('New 1363 and 1542 Jintuo PDF catalogs are actionable but NOT directly collated birth leaves', () => {
    const q = YUANHAI_JINTUO_PREQING_ORIGINAL_PRINT_CANDIDATES;
    expect(q).toMatchObject({
      actualTargetLeafImageRead: false,
      originalPdfByteHashesRecorded: false,
      confirmedMaterialPrintedBirthDateWitnessesAdded: 0,
      candidates: [
        {
          holdingInstitution: 'National Central Library, Taiwan',
          catalogCallmark: '205.24 02714',
          pdfPagesOnFileRecord: 972,
          exactPdfPageOfBirthRecorded: null,
          physicalLeafDateCharactersRead: false,
          catalogIsMetadataNotPhysicalGlyph: true,
        },
        {
          holdingInstitution: 'National Central Library, Taiwan',
          catalogCallmark: '205.24 02720',
          pdfPagesOnFileRecord: 612,
          exactPdfPageOfBirthRecorded: null,
          physicalLeafBirthHourCharactersRead: false,
          catalogIsMetadataNotPhysicalGlyph: true,
        },
        {
          holdingInstitution: 'Zhejiang Library, China',
          catalogCallmark: 'ZJLib-631aa105504e722bfaf23b1c-2',
          printedJuanNumbersListed: [3,4],
          exactPdfPageOfBirthRecorded: null,
          samePhysicalScanAsTaiwanNCL02720Established: false,
          identicalWoodblocksAsTaiwanNCL02720Established: false,
        },
      ],
      datingScope: {
        SongCompilationReportedYear: 1218,
        YuanCatalogPrintedYear: 1363,
        MingCatalogInitialEditionYear: 1542,
        MingCatalogRepairYear: 1558,
        printedWitnessFromSongCompilationYearActuallyRead: false,
        catalogPublicationDateNotAProofOfLiteralBirthDateText: true,
        versionAgreementCannotBeAssertedUntilFocalLeavesCompared: true,
        YuanToMingCopyLineageIndependent: false,
      },
      directlyReadReceivedSikuChapterFourStillTier: 'C_transmitted_online_text',
      distinctMingSanmingPrintsAlreadyRead: 2,
      historicalSiBirthHourAuthenticated: false,
      earlierYuanWitnessPresenceProvesAuthenticityOfBirthClock: false,
      yuanhaiWeiMuArchetypeSolved: false,
      modernAnnualSemanticsAuthorized: false,
      productionAuthorized: false,
    });
    expect(buildYuanHaiMingJuan3PrintScope().preQingJintuoPrintedOriginalCandidates).toEqual(q);
    expect(YUANHAI_YUEFEI_FAMILY_BIRTHDATE_SOURCE_AUDIT.manuscriptOrPrintedWitnessDirectlyInspected).toBe(false);
  });

  test('new Jintuo catalog/OCR identifiers never count as directly collated Yuan or Ming birth leaves', () => {
    const a = YUANHAI_JINTUO_20261015_ACCESS_AND_CATALOG_AUDIT;
    expect(a).toMatchObject({
      ncl02714: { registeredYuanEditionYear: 1363, catalogedPdfPages: 972, pdfBytesObtainedThisPass: false, birthFolioVisuallyReadThisPass: false, sha256: null },
      ncl02720: { registeredMingEditionYear: 1542, registeredMingRepairYear: 1558, catalogedPdfPages: 612, pdfBytesObtainedThisPass: false, birthFolioVisuallyReadThisPass: false, sha256: null },
      additionalHoldingRecords: {
        ncl02719: { catalogCallmark: '205.24 02719', differentCatalogRecordFromNcl02720: true, independentlyPrintedBirthFolioProved: false },
        nlc0405: { commonsListingBookTwoId: 'NLC892-0405-207140', volumeFourInThisPhysicalBookProved: false, separatePrintSettingEstablished: false },
      },
      additionalOcrDisplay: {
        shidianBookId: 'NGJ892412004000566116120',
        displayedPortalChapterTitle: '卷六',
        displayedBodyJuanHeading: '鄂國金佗稡編卷第四',
        physicallyLinkedSourceFascicleIdentified: false,
        originalGlyphVisuallyVerified: false,
        digitalTextIsIndependentWoodblockProof: false,
      },
      directNewFamilyBirthFolioEvidenceTierACount: 0,
      accessFailureDoesNotProvePassageAbsent: true,
      printedEditionDateDoesNotAuthenticateBirthHour: true,
      historicalSiBirthHourAuthenticated: false,
      yuanhaiWeiMuArchetypeAdjudicated: false,
      annualSemanticRulePromotionAuthorized: false,
      productionAuthorized: false,
    });
    const scope = buildYuanHaiMingJuan3PrintScope();
    expect(scope.jintuo20261015AccessAndCatalogAudit).toEqual(a);
    expect(scope.preQingJintuoPrintedOriginalCandidates.confirmedMaterialPrintedBirthDateWitnessesAdded).toBe(0);
    expect(scope.authority.historicalYuefeiBirthHourVerified).toBe(false);
    expect(scope.modernInterpretationClaim).toBeNull();
  });

  test('1582/1600 aligned C-tier phrases never count as independent A-grade leaves or authority votes', () => {
    const a = YUANHAI_TIANJI_1582_VS_WANLI_1600_TEXTUAL_ALIGNMENT;
    expect(a.comparisonTier).toBe('C_digital_text_to_C_digital_text');
    expect(a.texts).toMatchObject({
      tianjiShidianId: 'NA09025', yuanhaiEditedTextShidianId: 'SDZJ0626',
      previouslyInspectedYuanhaiNlcOriginalPdfId: 'NLC892-2642-210288',
      sourcePairIsTwoIndependentOriginalLeafReadings: false, currentYear1582PhysicalTargetLeafRead: false,
    });
    expect(a.pairedAnchors).toHaveLength(6);
    expect(a.pairedAnchors.map(x => x.stage)).toEqual([
      'prior_case', 'following_quote', 'focal_case', 'focal_wei_un', 'sinyu_interpretation', 'chongqi_and_penalty',
    ]);
    expect(a.pairedAnchors.every(x => x.printedVariationProved === false)).toBe(true);
    expect(a.pairedAnchors[3]).toMatchObject({
      tianjiText: '亥卯未合起陽刅', yuanhaiText: '亥卯未合起羊刃', printedVariationProved: false,
    });
    expect(a).toMatchObject({
      sharedLongPassageImpliesPossibleRelatedTransmission: true, directCopyDirectionEstablished: false,
      commonPre1582PrintedArchetypeEstablished: false, printWoodblockIdentityEstablished: false,
      identicalTitleToSecondaryNamedXingxueGangmuProved: false,
      japanCatalogBookNumberIsJuanNumber: false, japanTargetLeafPubliclyDownloaded: false,
      newlyRead1582PrintedTargetLeaves: 0, modernRuleAuthorityIncrease: 0,
      adjudicatedWeiMuArchetype: null, authenticatedHistoricalYuefeiJiSiHour: false,
      productPromotionAuthorized: false,
    });
    expect(buildYuanHaiMingJuan3PrintScope().tianji1582VsWanli1600TextualAlignment).toEqual(a);
  });

  test('1582 Tianji C-tier wording and 巳巳 OCR cannot supersede verified 1600/1634 original glyphs', () => {
    const a = YUANHAI_1582_TIANJI_OCR_TEXTUAL_PARALLEL_AUDIT;
    expect(a.tianjiTextualCandidate).toMatchObject({
      shidianBookId: 'NA09025', textChapter: '卷之三',
      displayedFourPillarTokenWithOcrRisk: '癸未乙卯、甲子、已巳',
      displayedTargetVariant: '亥卯未合起陽刅',
      ancestralEditionYearIndicatedByCatalog: 1582,
      inspected1582TargetPrintedLeaf: false,
      sourceIndependenceFromYuanhaiUnderlyingTextProved: false,
      earliestAuthenticatedA_printRedatedTo1582: false,
      countsAsNewOriginalGlyphWitness: false,
    });
    expect(a.bibliographicRoutes).toMatchObject({
      shanghaiQingKangxiImpressionAlsoCataloged: true,
      catalogedCarvingYearEqualsPhysicalImpressionYearProved: false,
      japanNationalArchivesCallNumber: '子059-0011',
      japanVolumeThreeItemId: 4413954,
      publicImageViewerOnSiteOnly: true,
      japaneseJuanThreeTargetLeafDirectlyViewed: false,
    });
    expect(a.mingWanliNlcOcrFalseFriends).toMatchObject({
      misreadPillarSubstring: '癸未乙卯甲子巳巳',
      misreadHourSubstring: '時上巳巳破印',
      correctlyPreservedUnTargetInOcr: '亥卯未合起羊刃',
      separateFollowingContext: '亥卯未木局',
      samePhysicalScanAsAlreadyAccountedNlc: true,
      addedIndependentPrintSettingFromOcr: false,
      actualPrintedSiSiVariantConfirmed: false,
    });
    expect(a.sourceDatingPriority).toMatchObject({
      earliestVerifiedAOriginalYuanhaiPrintYear: 1600,
      distinctVerifiedChongzhenAOriginalPrintYear: 1634,
      pre1600IndependentAOriginalGlyphAdded: 0,
      glyphArchetypeOfWeiMuAdjudicated: false,
      yuefeiHistoricalBirthHourAuthenticated: false,
      modernRulesApproved: 0,
      productionAuthorized: false,
    });
    expect(buildYuanHaiMingJuan3PrintScope().tianji1582OcrTextualParallelAudit).toEqual(a);
  });

  test('WYG folio tags and internally consistent nominal ages never upgrade an uninspected Yuan birth leaf', () => {
    const a = YUANHAI_JINTUO_WYG_FOLIO_AND_OCR_CONSISTENCY_AUDIT;
    expect(a.yuanNcl02714).toMatchObject({ catalogEditionYear: 1363, commonsSplitFileSuffixesListed: [1,2,3], numberedCommonsFilesAreIndependentHoldings: false, birthFolioPrintDirectlyRead: false });
    expect(a.mingNcl02720).toMatchObject({ lineCountPerHalfFolio: 9, charactersPerLine: 17, sameWoodblocksAs1363ProvedByLayout: false });
    expect(a.transmittedWygText).toMatchObject({ birthDatePageTag: 'KR2g0010_WYG_004-1a', birdAnecdotePageTag: 'KR2g0010_WYG_004-2a', directYuanOrMingPrintGlyphEvidence: false, pageTagIsYuanNclPdfPage: false });
    expect(a.internalNominalAgeCrossCheck.entries).toHaveLength(3);
    for (const entry of a.internalNominalAgeCrossCheck.entries) {
      expect(entry.ceYear - a.internalNominalAgeCrossCheck.reportedBirthYear + 1).toBe(entry.recordedAge);
      expect(entry.recordedAge).toBe(entry.mechanicallyExpectedNominalAge);
    }
    expect(a.internalNominalAgeCrossCheck).toMatchObject({ evidenceTier: 'D_internal_arithmetic_of_one_C_transmission', independentHistoricalBirthWitnessAdded: 0, historicalBirthMonthDayProvedByAge: false });
    expect(a.otherNlcLinkedOcr).toMatchObject({ displayedJuanHeading: '鄂国金佗稡编卷第四', samePortalPageCorrectReignHeader: '崇宁二年', samePortalPageWrongReignInBody: '七宁二年癸未岁', sevenNingIsPrintedVariantProved: false, independentPrintWitnessEstablished: false, glyphOriginalDirectlyInspected: false });
    expect(a).toMatchObject({ addedYuanOrMingPrintedBirthFolios: 0, actualYuefeiJiSiHourHistoricallyAuthenticated: false, yangrenWeiMuArchetypeAuthorized: false, modernAnnualRulePromotionAuthorized: false, productionAuthorized: false });
    expect(buildYuanHaiMingJuan3PrintScope().jintuoWygFolioAndOcrConsistencyAudit).toEqual(a);
  });

  test('Original Wanli Wei and Chongzhen Mu do not become a modern majority vote', () => {
    const x = YUANHAI_YANGREN_WEI_MU_LEXICAL_GUARD;
    expect(x.printVariants).toMatchObject([
      {printedJuan:3,pdfPage:11,pivotGlyph:'未',glyphClass:'地支',originalPrintedText:'亥卯未合起羊刃',grade:'A_direct_focal_print'},
      {printedJuan:2,pdfPage:19,pivotGlyph:'木',glyphClass:'五行',samePrintedParagraphHasClearWei:'癸未',originalPrintedText:'亥卯木合起羊刃',grade:'A_direct_focal_print_distinct_setting'},
    ]);
    expect(x.onlineTranscriptionsNotOriginals.map(q=>q.newPhysicalPrintCredit)).toEqual([0,0,0]);
    expect(x).toMatchObject({
      literalMuIsNotAnEarthlyBranch:true,
      possibleMuAsWoodCombinationShorthand:'hypothesis_unproven',
      possibleMuFromMiscarvedOrEditedWei:'hypothesis_unproven',
      directProofOfEditingIntention:false,
      earliestArchetypeReadingEstablished:false,
      derivativeTextMajorityVoteAuthorized:false,
      qingOrModernSemanticsOverridePrintedGlyph:false,
      threeBranchClashPriorityAuthorized:false,
      distinctDirectPrintSettings:2,
      independentCopyOfWanliBlocksEstablished:false,
      historicallyAuthenticatedYueFeiHour:false,
      modernAnnualMeaningAuthorized:false,
      productionAuthorized:false,
    });
    expect(buildYuanHaiMingJuan3PrintScope().yuanhaiWeiMuLexicalGuard).toEqual(x);
  });

  test('Four Treasuries bibliographic chronology does not prove extant Song birth folio', () => {
    const p = YUANHAI_JINTUO_HISTORICAL_TRANSMISSION_PROVENANCE_AUDIT;
    expect(p).toMatchObject({
      work: '金佗稡編',
      originalCompiler: '岳珂',
      receivedBibliographicalWitness: {
        prefaceExamYear: 1781,
        evidenceTier: 'C_critical_bibliographical_transcription',
        originalPrefacePrintedLeafInspected: false,
      },
      editionLossReport: {
        sourceExcerpt: '舊本佚缺，徧求四方，得其殘編斷簡，參互考訂',
        continuingEditorialConcern: '書中脱簡闕文，時時而有',
        reportsOlderCopyIncomplete: true,
        particularYueFeiBirthPhraseChangedByGapEstablished: false,
        earliestBirthChapterAutographSurvivedAndRead: false,
        sonlySong1218CompositionProvesAllCurrentWordsAutograph: false,
      },
      sourceCriticalConclusions: {
        QianlongReceivedTextHasFamilyBirthDate: true,
        medievalToLateTransmittedChainRecordedButUncollated: true,
        birthLunarDateHistoricalOriginalAProved: false,
        originalBirthHourJisiAuthenticated: false,
        independentOriginalPrintedFocalWitnessesAdded: 0,
        userInstitutionalRequestRequiredToContinueOtherResearch: false,
      },
      printedMingSanmingWitnessCountRemains: 2,
      WanliWeiOrChongzhenWoodArchetypeChosen: false,
      annualRuleSemanticsApproved: false,
      productionAuthorized: false,
    });
    expect(p.reportedSequence.map(x => x.year)).toEqual([1218, 1363, null, 1781]);
    expect(p.reportedSequence.every(x => !x.actualEarlyPrintedBirthFolioCollated)).toBe(true);
    expect(buildYuanHaiMingJuan3PrintScope().JinTuoBirthDateTransmissionAudit).toEqual(p);
  });

  test('Songshi birth 時 is grammatical when, not sexagenary Si-hour 巳', () => {
    const a = YUANHAI_YUEFEI_SONGSHI_BIRTH_SHI_NOT_SI_AUDIT;
    expect(a).toMatchObject({
      sourceWork: '宋史',
      sourceChapter: '卷三百六十五 列傳第一百二十四 岳飛',
      originalPrintedBirthFolioInspected: false,
      excerpt: {
        birthBirdPhrase: '飛生時，有大禽若鵠，飛鳴室上，因以為名',
        writtenGenericTimeCharacter: '時',
        earthBranchCharacterNotPresent: '巳',
        meaningOfShengShi: 'when Yue Fei was born',
        matchesAstronomicalShichenSi: false,
        explicitJisiHourInBirthPassage: false,
        explicitLunarBirthdayInOpeningPassage: false,
        evidenceTier: 'C_received_digital_source_transcription',
      },
      familyChronicleParallel: {
        workAndLocus: '金佗稡編 卷四 行實編年一',
        birdAtEveningProvesBirthTimeAtNight: false,
        preciselySameManuscriptLineageDemonstrated: false,
      },
      sourceCriticalOutcome: {
        overlappingBirdMotif: true,
        directTextualDependenceProved: false,
        independentHistoricalBirthHourWitnessesCounted: 0,
        notASecondIndependentAttestationOfJiSiBirthHour: true,
        familyLunarDateStillKnownOnlyFromTransmittedText: true,
        actualHistoricalShichenAuthenticated: false,
      },
      newlyInspectedPrintedHistoricalBirthFolios: 0,
      preexistingMingDivinationJiSiExampleIntact: true,
      yuanhaiWeiVsWoodArchetypeChosen: false,
      annualReadingRulesAuthorized: false,
      productionAuthorized: false,
    });
    expect(buildYuanHaiMingJuan3PrintScope().yueFeiSongshiShiNotSiAudit).toEqual(a);
    expect(YUANHAI_YUEFEI_FAMILY_BIRTHDATE_SOURCE_AUDIT.distinctClaims.familyChronicleProvesYueFeiHistoricalJiSiHour).toBe(false);
  });

  test('Southern Song Yue family chronicle dates birth but does not authenticate Jisi hour', () => {
    const a = YUANHAI_YUEFEI_FAMILY_BIRTHDATE_SOURCE_AUDIT;
    expect(a).toMatchObject({
      historicalPerson: '岳飛',
      familyChronicler: '岳珂',
      sourceTitle: '金佗稡編',
      sourceSection: '卷四 行實編年一 崇寧二年',
      manuscriptOrPrintedWitnessDirectlyInspected: false,
      receivedSikuFamilyText: {
        firstChronicleYearHeading: '崇寜二年癸未歲',
        birthDateExactPhrase: '二月十五日先臣生名飛字鵬舉',
        birthYearSexagenary: '癸未',
        birthLunarMonthOrdinal: 2,
        birthLunarDayOrdinal: 15,
        explicitBirthDayRecorded: true,
        explicitBirthHourHeavenlyStemOrEarthlyBranchInThisLocus: false,
        twoDerivativeWebTextCopiesCountAsIndependentPrintedWitnesses: 0,
        evidenceTier: 'C_transmitted_late_source_text_not_verified_original_leaf',
      },
      descriptiveNightMotif: {
        literalNightOfBirthNarrativePresent: true,
        birdNarrativeIsBirthClockRecord: false,
        birthAtNightEstablishedFromClause: false,
        birthDuringMorningSiHourContradictedAsProvenFact: false,
      },
      newlyLocatedOriginalPrintLeads: [
        {
          catalogFileId: 'ZJLib-631aa105504e722bfaf23b1c-2',
          originalBookOrder: 2,
          printedJuanIncluded: [3, 4],
          actualBirthFolioOriginalImageRead: false,
          additionalDirectWitnessCredit: 0,
        },
        {
          catalogFileId: 'NLC892-0405-207140',
          originalBookOrder: 2,
          originalBookTwoContainsBirthLocusIndependentlyConfirmed: false,
          actualBirthFolioOriginalImageRead: false,
          additionalDirectWitnessCredit: 0,
        },
      ],
      distinctClaims: {
        familySourceYearAndLunarDayReported: true,
        horoscopicWitnessDirectlyHistoricalBirthTime: false,
        birthHourSiShiInFamilySource: false,
        familyChronicleProvesYueFeiHistoricalJiSiHour: false,
        historicalBirthHourKnownFromCollatedOriginals: false,
      },
      newDirectOriginalLeafWitnesses: 0,
      newIndependentWoodblockSets: 0,
      printedMingSanmingPhysicalCopyCountUnchanged: 2,
      mingWanliWeiVsChongzhenWoodArchetypeSelected: false,
      annualReadingGlobalSemanticsAuthorized: false,
      productionAuthorized: false,
    });
    expect(buildYuanHaiMingJuan3PrintScope().yueFeiFamilyChronicleBirthDateAudit).toEqual(a);
  });


  test('Ming original PDF repro script fails closed on incorrect source hashes', () => {
    const text = readFileSync(new URL('../tools/research/compare_ming_sanming_juan8.py', import.meta.url), 'utf8');
    expect(text).toContain('009396f2dfd848194d7fa73c6e02ea51c010d3a9f0d5f3eb83be35d6b6a2e777');
    expect(text).toContain('3de5c45efb1919965afae00a3c97121054aaabd0f38f9fd5ab8f0a28bb8e36dd');
    expect(text).toContain('if verified[source] != EXPECTED_SHA256[source]:');
    expect(text).toContain('p.error(');
    expect(text).toContain('if len(nlc) != 57 or len(ncl) != 1000:');
    expect(text).not.toContain('hashlib.sha256(args.nlc.read_bytes())');
    expect(YUANHAI_SANMING_MING_NLC_NCL_FOUR_OPENINGS_BLOCK_AUDIT.reproducibleDeterministicBfAudit).toMatchObject({
      matchCandidates: 1071,
      geometricInliers: 888,
      wrongPageMaxInliers: 15,
      deterministicRerunConfirmed: true,
    });
  });

  test('four matched NLC/NCL Ming print openings preserve two material copies but prove no block lineage', () => {
    const q = YUANHAI_SANMING_MING_NLC_NCL_FOUR_OPENINGS_BLOCK_AUDIT;
    expect(q).toMatchObject({
      originalCopiesCompared: 2,
      sourceCopies: {
        nlc: {
          sourceId: 'NLC892-411999029701-66492',
          pdfSha256: '009396f2dfd848194d7fa73c6e02ea51c010d3a9f0d5f3eb83be35d6b6a2e777',
          targetPage: 14,
          embeddedPrintImageDimensionsPx: [4192, 3523],
        },
        ncl: {
          sourceId: 'NCL-06589',
          pdfSha256: '3de5c45efb1919965afae00a3c97121054aaabd0f38f9fd5ab8f0a28bb8e36dd',
          targetPage: 654,
          embeddedPrintImageDimensionsPx: [842, 586],
        },
      },
      reproducibleDeterministicBfAudit: {
        matchingHalfPages: 8,
        matchCandidates: 1071,
        geometricInliers: 888,
        wrongPageOffsetHalfPageControls: 16,
        wrongPageMaxInliers: 15,
        wrongPageMedianInliers: 6,
        deterministicRerunConfirmed: true,
      },
      higherFeatureCountCrossCheck: {
        matchingHalfPages: 8,
        matchCandidates: 4522,
        geometricInliers: 3805,
        maximumWrongPageInliers: 25,
      },
      imageInkOverlayCrossCheck: {
        comparedHalves: 8,
        minimumScore: 0.9275,
        maximumScore: 0.9725,
        notIdenticalDigitalScanProof: true,
      },
      printedNameExampleBoth: '岳飛癸未乙卯甲子己巳',
      fourAdjacentPrintOpeningsShareDetailedTypesetting: true,
      twoIndependentMaterialScanCaptures: true,
      strongSameSettingOrFaithfulSamePlateTradition: true,
      independentlyReengravedPageSettingDemonstrated: false,
      microscopicSharedCuttingDefectsEstablished: false,
      sameHistoricalWoodblockSetProved: false,
      distinctHistoricalWoodblockSetsProved: false,
      additionalDirectMingCopiesAdded: 0,
      additionalIndependentMingWoodblockSetsEstablished: 0,
      mingNlcNclPhysicalCopyCountRemains: 2,
      actualYueFeiBirthHourAuthenticated: false,
      yuanhaiWeiWoodArchetypeResolved: false,
      modernAnnualRulePriorityAuthorized: false,
      productionAuthorized: false,
    });
    expect(q.layoutPairs.map(p => [p.nlcPage, p.nclPage])).toEqual([
      [13, 653], [14, 654], [15, 655], [16, 656],
    ]);
    expect(q.layoutPairs.reduce((n, p) => n + p.left.inliers + p.right.inliers, 0)).toBe(888);
    expect(q.layoutPairs.reduce((n, p) => n + p.left.candidates + p.right.candidates, 0)).toBe(1071);
    expect(buildYuanHaiMingJuan3PrintScope().mingNlcNclFourOpeningsBlockAudit).toEqual(q);
    expect(YUANHAI_SANMING_JUAN8_DUPLICATE_AND_NEXT_WITNESS_AUDIT.twoPhysicalCopiesPrintAlignment.sameActualWoodblockProven).toBe(false);
    expect(YUANHAI_SANMING_JUAN8_DUPLICATE_AND_NEXT_WITNESS_AUDIT.twoPhysicalCopiesPrintAlignment.independentWoodblockTypesettingVerified).toBe(false);
  });

  test('Qing Japan and Harvard print split 岳武穆, retract prior absence assertion', () => {
    const q = YUANHAI_SANMING_QING_YUEWUMU_TWO_COPY_PRINT_AUDIT;
    expect(q).toMatchObject({
      person: '岳飛',
      printedName: '岳武穆',
      target: '甲子日己巳時',
      twoLinePrintedName: ['岳武', '穆'],
      yearMonthInTable: ['癸未', '乙卯'],
      dayHourFromSection: ['甲子', '己巳'],
      Harvard: {
        drsId: '53262215',
        page14Sha256: '7f08253073244977cb43e54000c772b4581e5de31b910b7629601759245c1aa8',
        page15Sha256: '458e4d15c001086a8800bbfd65b4e138556072ce704a7a7e5f2d16a7a9ba1074',
        targetCasePrintedNameDirectlyRead: true,
        fullOriginalPdfBytesObtained: false,
      },
      Japan: {
        callmark: '305-0295',
        physicalBook: 8,
        targetCasePrintedNameDirectlyRead: true,
      },
      SikuReceivedText: { evidenceTier: 'C_received_transcription' },
      comparedHarvardJapanPage14FeatureMatches: 345,
      comparedHarvardJapanPage14HomographyInliers: 196,
      distinctPhotoCaptureObserved: true,
      identicalWoodblockProved: false,
      independentWoodblockProved: false,
      fourPillarTableColumnsFullyAdjudicated: false,
      priorOmissionClaimRetracted: true,
      QingPhysicalCopiesWithNamedCase: 2,
      newMingPrintedWitnessCredit: 0,
      historicalBirthHourAuthenticated: false,
      yuanhaiWeiWoodVariantArchetypeEstablished: false,
      modernAnnualSemanticsAuthorized: false,
      productionAuthorized: false,
    });
    expect(buildYuanHaiMingJuan3PrintScope().qingTwoCopyNamedCase).toEqual(q);
    expect(YUANHAI_SANMING_JAPAN_QING_JUAN8_LOCAL_COLLATION.nameYueWuMuVisibleInExaminedJapaneseLocalPassage).toBe(true);
    expect(YUANHAI_SANMING_JAPAN_QING_JUAN8_LOCAL_COLLATION.uninspectedHarvardCatalog.targetOriginalImageVisuallyInspected).toBe(true);
    expect(YUANHAI_YUEFEI_CROSS_GENRE_EVIDENCE_AUDIT.allNewFocalPrintedWitnessesAdded).toBe(2);
  });

  test('Japan was source of first screenshots; Harvard print now separately examined', () => {
    const q = YUANHAI_SANMING_JAPAN_QING_JUAN8_LOCAL_COLLATION;
    expect(q).toMatchObject({
      sourceInstitution: 'National Archives of Japan, Cabinet Library',
      catalogReferenceCode: '305-0295',
      catalogBookOrder: '0008',
      catalogSubjectNumber: '0008',
      catalogBookCount: 12,
      catalogImprintDescription: '刊本（序刊）清雍正13年',
      japaneseViewerPageCount: 126,
      localScreenshots: [
        { viewerPageOneBased: 14, sha256: 'bcddbf9825f5e1b0e4eebeced59dacdd7fd5f4316d7c9ad9cc9612931c8334cb' },
        { viewerPageOneBased: 15, sha256: '1dc33d3090326226c0a80f45d35b830e233f541a9483496b951e8c441a122a3c' },
      ],
      laterSameJapanPage15Recapture: {
        sha256: '083fdd0e765abe3c93ee149cda1d36d511e3685ae481dafec7a2c5bed45eca72',
        siftCandidateMatches: 1918,
        ransacInliers: 1917,
        newIndependentPrintedWitnessAdded: 0,
      },
      localLocus: '甲子日己巳時',
      nameYueFeiVisibleInExaminedJapaneseLocalPassage: false,
      nameYueWuMuVisibleInExaminedJapaneseLocalPassage: true,
      matchingNamedFourPillarsVisibleInJapaneseLocalPassage: false,
      japanEntireBookOmissionProved: false,
      editorialDeletionIntentProved: false,
      independentQingPrintSettingsEstablished: false,
      uninspectedHarvardCatalog: {
        repositoryRecordId: '53262215',
        catalogPageCount: 126,
        targetOriginalImageVisuallyInspected: true,
        samePhysicalPrintAsJapanEstablished: false,
        nameAbsentFromFocalPassageProved: false,
        splitNameYueWumuPrintedInTable: true,
        HarvardPage14Sha256: '7f08253073244977cb43e54000c772b4581e5de31b910b7629601759245c1aa8',
        HarvardPage15Sha256: '458e4d15c001086a8800bbfd65b4e138556072ce704a7a7e5f2d16a7a9ba1074',
        newPrintedWitnessCredit: 1,
      },
      additionalDirectMingPrintWitnesses: 0,
      historicalYueFeiBirthHourVerified: false,
      mingYuanhaiWeiVsWoodArchetypeResolved: false,
      productionAuthorized: false,
    });
    expect(buildYuanHaiMingJuan3PrintScope().japanQingLocalPrintedExampleComparison).toEqual(q);
    expect(YUANHAI_YUEFEI_CROSS_GENRE_EVIDENCE_AUDIT.allNewFocalPrintedWitnessesAdded).toBe(2);
    expect(buildYuanHaiMingJuan3PrintScope().sourceCriticalAudit.directPrintedCopiesCompared).toBe(2);
  });

  test('Baidu rehost does not produce a third Ming direct-print witness', () => {
    const a = YUANHAI_SANMING_JUAN8_DUPLICATE_AND_NEXT_WITNESS_AUDIT;
    expect(a.baiduRehostOfNlcScan).toMatchObject({
      originalNlcPrintedBook: 'NLC892-411999029701-66492',
      originalPdfPageOneBased: 14,
      descriptorMatches: 1368,
      ransacInliers: 1340,
      inlierFractionApprox: 0.97953,
      duplicateDigitalScanConfirmed: true,
      newPhysicalPrintWitnessAdded: 0,
      independentWoodblockCredit: 0,
    });
    expect(a.twoPhysicalCopiesPrintAlignment).toMatchObject({
      siftCandidateMatches: 351,
      homographyInliers: 290,
      directlyInspectedCopies: 2,
      independentWoodblockTypesettingVerified: false,
      sameActualWoodblockProven: false,
    });
    expect(a.taiwanNcl06590Candidate).toMatchObject({
      callmark: '306.5 06590',
      catalogEditionYear: 1578,
      originalJuanEightFocalLeafInspected: false,
      separatePrintedSettingEstablished: false,
      newWitnessCredit: 0,
    });
    expect(a.laterTransmissionCandidate).toMatchObject({
      japanCatalogCallmark: '305-0295',
      japanCatalogEdition: '清雍正',
      japanListedCorrector: '蔣國祥',
      japanBookEightListed: true,
      japanOriginal1578Print: false,
      japanFocalImageRead: true,
      zhejiangSikuDigitalID: 'CADAL06066044',
      zhejiangSikuScanPages: 304,
      zhejiangSikuOriginal1578Print: false,
      zhejiangSikuFocalImageRead: false,
      newMingPrintedWitnessCredit: 0,
    });
    expect(a.directOriginalMingCopyCountUnchanged).toBe(2);
    expect(a.additionalIndependentMingWoodblocksEstablished).toBe(0);
    expect(a.yueFeiHistoricalHourVerified).toBe(false);
    expect(a.yuanhaiWeiOrWoodArchetypeEstablished).toBe(false);
    expect(a.modernAnnualReadingAuthorized).toBe(false);
    expect(a.productionAuthorized).toBe(false);
    const built = buildYuanHaiMingJuan3PrintScope();
    expect(built.duplicateAndNextWitnessAudit).toEqual(a);
    expect(built.sourceCriticalAudit.thirdRehostDuplicateNotCounted).toBe(true);
  });

  test('NCL 06589 first-cut-catalogued print has Yue Fei on actual p654, not just in OCR', () => {
    const n = YUANHAI_SANMING_NCL_06589_1578_DIRECT_PRINT;
    expect(n).toMatchObject({
      taiwanHoldingCallmark: '06589',
      pdfSha256: '3de5c45efb1919965afae00a3c97121054aaabd0f38f9fd5ab8f0a28bb8e36dd',
      pdfByteCount: 101956385,
      fullPdfPageCount: 1000,
      catalogImprintYear: 1578,
      catalogYearDirectlyEngravedOnFocalLeaf: false,
      scannedBoundBookNumberWithinMergedFile: 8,
      printedJuanFirstPageOneBased: 642,
      printedJuanHeading: '三命通會卷之八',
      sectionFirstPageOneBased: 653,
      sectionHeading: '六甲日己巳時斷',
      focalCasePdfPageOneBased: 654,
      focalCaseLocation: 'right_folio_second_vertical_column_from_right',
      printedCaseRun: '岳飛癸未乙卯甲子己巳',
      printedFourPillars: ['癸未','乙卯','甲子','己巳'],
      originalLeafVisuallyCollated: true,
      evidenceTierForPrintedCase: 'A_direct_original_print_image',
      evidenceTierForEditionYear: 'catalog_attributed_1578',
      sameCaseAndNeighboringColumnOrderAsNlcFascicle15: true,
      physicallySeparateCopyExamined: true,
      independentTypesettingOrWoodblockEstablished: false,
      recordedBirthHourHistoricallyAuthenticated: false,
      modernPersonalAnnualMeaningAuthorized: false,
      productionAuthorized: false,
    });
    const scope = buildYuanHaiMingJuan3PrintScope();
    expect(scope.original1578SanmingTaiwanCopy).toEqual(n);
    expect(scope.sourceCriticalAudit).toMatchObject({
      original1578TargetLeafPhysicallyInspected: true,
      directPrintedCopiesCompared: 2,
      independentSettingCountVerified: 0,
      thirdRehostDuplicateNotCounted: true,
      biographicalHourAuthenticated: false,
      productionAuthorized: false,
    });
    expect(YUANHAI_YUEFEI_CROSS_GENRE_EVIDENCE_AUDIT.mingSanmingTonghuiLocus.original1578FocalLeafDirectlyCollated).toBe(true);
    expect(YUANHAI_YUEFEI_CROSS_GENRE_EVIDENCE_AUDIT.allNewFocalPrintedWitnessesAdded).toBe(2);
    expect(YUANHAI_YUEFEI_CROSS_GENRE_EVIDENCE_AUDIT.mingSanmingTonghuiLocus.independentMingPrintedFocalWitnessCredit).toBe(0);
  });

  test('1578 catalog year alone is insufficient, but the original NCL 06589 focal leaf is now directly inspected', () => {
    const q = YUANHAI_YUEFEI_CROSS_GENRE_EVIDENCE_AUDIT;
    expect(q.mingSanmingTonghuiLocus).toMatchObject({
      originalEditionCatalogYear: 1578,
      officialCatalogCallmark: '06590',
      commonsScanId: 'NCL-06589',
      commons06589BookOnePages: 1000,
      commons06589BookTwoPages: 187,
      commonsScanCatalogCallmark: '306.5 06589',
      official1578CatalogCallmarks: ['06589', '06590'],
      twoSeparateCataloguedHoldingRecordsConfirmed: true,
      commonsMetadataMatches06589Catalog: true,
      booksOriginalFocalFoliosComparedBetween06589And06590: false,
      laterExcerptMentionsYueFeiAndFourPillars: true,
      laterExcerptBirthPillars: ['癸未', '乙卯', '甲子', '己巳'],
      receivedWikisourceSectionOmittedNamedExample: true,
      separatelyInspectedOcrSectionOmitsName: true,
      sikuReceivedCase: {
        editionFamily: '四庫全書本',
        printedJuan: 8,
        transmittedHonorific: '岳武穆',
        literalYueFeiNameAbsentButHonorificPresent: true,
        yueWumuSamePersonAsYueFei: true,
        earlierClaimSikuOmittedYuefeiCaseRetracted: true,
        reconstructedFourPillarsByColumnImageCollation: false,
        imagePageAndColumnDirectlyRead: false,
        original1578PrintedLeafEstablished: false,
        independentPrintedWitnessCredit: 0,
      },
      qingIllustratedEncyclopediaTranscription: {
        digitizedPageNumber: 86,
        wikiTranscriptionIsMarkedUnproofread: true,
        namedExample: '岳飛',
        receivedFourPillars: ['癸未','乙卯','甲子','己巳'],
        originalDjvuFolioImageVisuallyInspected: false,
        proves1578OriginalLeafCarriedCase: false,
        directMaterialWitnessCredit: 0,
      },
      nlcMingFocalCasePrintDerivedOcr: {
        parentPrintedBookCatalogFamily: 'NLC892-411999029701',
        linkedDigitizedBookId: 'NGJ89241199902970167139',
        linkedIdPhysicalFascicle: 1,
        logicalJuanEightCannotBeLocatedInBoundFascicleOneByPortalId: true,
        completePhysicalFascicleInventoryCount: 24,
        nlcFascicle15Candidate: 'NLC892-411999029701-66492',
        nlcFascicle16Confirmed: 'NLC892-411999029701-66488',
        fascicle15PrintedJuanEightUpperDirectlyVerified: true,
        targetedSectionInPhysicalFascicle15DirectlyVerified: true,
        printedJuan: 8,
        headingAsOcr: '六甲已巳時斷',
        targetCaseOcrVerbatim: expect.stringContaining('主貴作飛。癸未乙卯、甲子已已'),
        nameTokenObservedInOcr: '作飛',
        candidateNameBasedOnParallelTransmission: '岳飛',
        exactPrintedNameGlyphVerified: true,
        observedPillarsInOcr: ['癸未','乙卯','甲子','已已'],
        lastHourPillarOcrInvalidAsConfirmedJiSi: true,
        originalHourStemDirectlyRead: true,
        sameCaseLocationCrossCheckedWithLaterYuefeiTransmission: true,
        exactBoundFascicleForTargetIdentified: true,
        targetPdfPageAndColumn: 'PDF p.14 right folio, second vertical column from right',
        focalPrintImageDirectlyRead: true,
        independentPrintSettingEstablishedRelativeTo1578Ncl: false,
        original1578FocalPrintVerifiedByThisOcr: false,
        additionalDirectlyCollatedMingFocalWitnessCredit: 1,
        printedUnWoodArchetypeDecisionAuthorized: false,
      },
      nlcOtherWanliMingScanLocator: {
        volume16FileId: 'NLC892-411999029701-66488',
        volume16PrintedJuan: '卷之八下',
        volume16PdfPages: 64,
        publicationDateRangeFromCatalog: '明萬曆[1573-1620]',
        original1578EditionIdentityEstablished: false,
        targetedJiSiSectionProvedInVolume16: false,
        originalFocalFolioDirectlyExamined: false,
        independentMingPrintedWitnessCredit: 0,
      },
      original1578FocalLeafDirectlyCollated: true,
      laterExcerptProves1578IdenticalNamedExample: false,
      textualRelationshipAndOmissionCauseEstablished: false,
      independentMingPrintedFocalWitnessCredit: 0,
    });
    expect(q.shenfengSuspiciousPrintOcr).toMatchObject({
      indexedOcrDayPillarCandidate: '甲申',
      indexedOcrYearlyMarkerCandidate: '辛丑',
      differingReceivedDigitalReadings: ['甲子','辛酉'],
      originalExactFocalPageVisuallyExamined: false,
      printVariantVersusOcrMisreadAdjudicated: false,
      mustNotCountAsConfirmedAlternativeNatalChart: true,
    });
    expect(q.additionalMingHoldingCandidate).toMatchObject({
      catalogIdentifier: 'Tianyige-330000-1705-0005007',
      editionMetadata: '明崇禎刻本',
      originalFocalPageAndColumnInspected: false,
      physicallyIndependentTypesettingVerified: false,
      additionalIndependentFocalWitnessCredit: 0,
    });
    expect(q.allNewFocalPrintedWitnessesAdded).toBe(2);
    expect(q.globalAnnualMeaningAuthorization).toBe(false);
    expect(q.productionAuthorization).toBe(false);
  });

  test('Shenfeng Tongkao 已巳 in received web text is neither JiSi print evidence nor independent stemma', () => {
    const q = YUANHAI_PARALLEL_YUEFEI_NATAL_LOCUS_AUDIT.additionalReceivedText;
    expect(q).toMatchObject({
      work: '神峰通考',
      transmittedHourPillarString: '已巳',
      glyphEqualsMechanicallyValidJiSi: false,
      independentMaterialWitnessCollated: false,
      editionDependenceDetermined: false,
      printedOriginalHourStemVerified: false,
      newPrintedWitnessCredit: 0,
    });
  });

  test('two distinct printed settings from three scans prove variant, never authorize semantics', () => {
    const scope = buildYuanHaiMingJuan3PrintScope();
    expect(scope.status).toBe(
      'wanli_wei_and_chongzhen_wood_print_variant_confirmed_meaning_held',
    );
    expect(scope.digitalWitnessRecordsTotal).toBe(6);
    expect(scope.independentlyCollatedPrintedWitnessCount).toBe(2);
    expect(scope.directlyInspectedScanDocumentsCount).toBe(3);
    expect(scope.criticalAssessment).toBe(YUANHAI_PRINT_VARIANT_CRITICAL_ASSESSMENT);
    expect(scope.preWanliSourceAccessAudit).toBe(YUANHAI_PREWANLI_SOURCE_ACCESS_AUDIT);
    expect(scope.koreanEarlierYangrenResearch).toBe(YUANHAI_KOREAN_EARLIER_YANGREN_RESEARCH);
    expect(scope.koreanPrimaryHoldingsAccessAudit).toBe(YUANHAI_KOREAN_PRIMARY_HOLDINGS_ACCESS_AUDIT);
    expect(scope.koreanFacsimileRetrievalRoute).toBe(YUANHAI_KOREAN_FACSIMILE_RETRIEVAL_ROUTE);
    expect(scope.earlierYangrenDerivedClauseComparison).toBe(YUANHAI_EARLIER_YANGREN_DERIVED_CLAUSE_COMPARISON);
    expect(scope.nlkCandidateCallmarkFromAcademicBibliography).toBe(YUANHAI_NLK_CANDIDATE_CALLMARK_FROM_ACADEMIC_BIBLIOGRAPHY);
    expect(scope.noContactEarlyPrintAccessAudit).toBe(YUANHAI_NO_CONTACT_EARLY_PRINT_ACCESS_AUDIT);
    expect(scope.parallelYuefeiNatalLocusAudit).toBe(YUANHAI_PARALLEL_YUEFEI_NATAL_LOCUS_AUDIT);
    expect(scope.textualGenealogyIndependenceEstablished).toBe(false);
    expect(scope.nclTaiwanFacsimile).toBe(YUANHAI_NCL_TAIWAN_PRINT_SCAN);
    expect(scope.woodOcrOriginPrintLocator).toBe(YUANHAI_CHONGZHEN_WOOD_OCR_PRINT_LOCATOR);
    expect(scope.additionalTextWitnesses)
      .toBe(YUANHAI_JUAN3_ADDITIONAL_DIGITAL_WITNESSES);
    expect(scope.authority).toMatchObject({
      correctPhysicalBookForPrintedJuanThreeIdentified: true,
      twoMoreDigitalTranscriptsCompared: true,
      sourcePdfPageColumnIdentified: true,
      secondPrintScanLocusDirectlyCompared: true,
      independentSecondPrintEditionEstablished: true,
      textualGenealogyIndependenceEstablished: false,
      annotatedWorkingBaseSelected: true,
      canonicalArchetypeEstablished: false,
      preWanliOriginalGlyphVerified: false,
      relatedKoreanSourceFocalPassageVerified: false,
      earlierYangrenTheoryScholarlyQuoted: true,
      koreaUniversity1518FocalGlyphDirectlyInspected: false,
      koreanInstitutionalPlateInventoryAttested: true,
      survivingNlkPrintFromRecordedPlatesVerified: false,
      koreaUniversityCatalogTocLocated: true,
      koreanOriginalFocalCaseAbsentProved: false,
      officialKorcisSearchRouteVerified: true,
      originalKoreanFocalFolioRetrieved: false,
      earlyGeneralJiaDayYouLuckQuotationCompared: true,
      earlySpecificMingFourPillarAnecdoteAuthenticated: false,
      nlkSecondaryCitationCallmarkCandidateIdentified: true,
      nlkHoldingRecordIndependentlyConfirmed: false,
      publicEarlyPhotoShareIdentified: true,
      publicEarlyPhotoShareAccessAndProvenanceVerified: false,
      japanese2017AppendixBibliographyVerified: true,
      japanesePrintedYangrenFolioAdjudicated: false,
      sameReceivedFourPillarsInParallelXiJiAndYangrenLoci: true,
      bookOneParallelXiJiFocalOriginalVerified: false,
      wanliXiJiPrintContentsJuanTwoVerified: true,
      chongzhenXiJiPhysicalBookUnresolved: true,
      historicalYuefeiBirthHourVerified: false,
      hourPillarMechanicallyValidated: true,
      hourPillarOriginalGlyphAdjudicated: false,
      chongzhenOcrOriginIdentified: true,
      chongzhenFocalPrintGlyphVerified: true,
      distinctChongzhenFocalWoodblocksEstablished: true,
      actualPrintedUnGlyphConfirmed: true,
      actualPrintedWoodGlyphConfirmed: true,
      actualPrintedHourStemConfirmed: false,
      digitalMajorityVoteAuthorized: false,
      fullyValidatedSixPillarHistoricalCase: false,
      clashCancellationOrThreeBranchPrecedenceAuthorized: false,
      historicalLifeEventVerified: false,
      personalAnnualReadingAuthorized: false,
      productionAuthorized: false,
    });
    expect(scope.verifiedLocalNlcPrint).toMatchObject({
      sourceBookId: 'NLC892-2642-210288',
      pdfPageOneBased: 11,
      verifiedTripleFinalGlyph: '未',
      printedPhrase: '亥卯未合起羊刃',
      matchingNlcOcrPhrase: '亥卯未合起羊刃',
      differentEditionOcrPhrase: '亥卯木合起羊刃',
      hourPillarVisualCandidate: '己巳',
      hourPillarFirstGlyph: null,
      hourPillarReviewState: 'single_scan_visual_candidate_not_double_checked',
      firstPassWoodReadingRetracted: true,
      printReadingScope: 'single_NLC_physical_print_only',
      inspection: 'manual_visual_scan_checked',
    });
    expect(scope.verifiedLocalNlcPrint.pdfSha256).toMatch(/^[0-9a-f]{64}$/);
    expect(scope.authority.actualPrintedUnGlyphConfirmed).toBe(true);
    expect(scope.authority.actualPrintedWoodGlyphConfirmed).toBe(true);
    expect(scope.authority.actualPrintedHourStemConfirmed).toBe(false);
    expect(scope.adjudicatedPrintedGlyph).toBeNull();
    expect(scope.adjudicatedHistoricalWinner).toBeNull();
    expect(scope.modernInterpretationClaim).toBeNull();
    const { scopeHash, ...material } = scope;
    expect(scopeHash).toBe(deterministicContentHash(material));
    expect(buildYuanHaiMingJuan3PrintScope()).toEqual(scope);
  });
});
