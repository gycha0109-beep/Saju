import { describe, expect, test } from 'vitest';
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
  YUANHAI_JUAN3_ADDITIONAL_DIGITAL_WITNESSES,
  YUANHAI_JUAN3_TEXTUAL_DISAGREEMENTS,
  YUANHAI_JUAN3_PRINT_SCOPE_UNRESOLVED,
  buildYuanHaiMingJuan3PrintScope,
} from '../src/research/general-annual-yuanhai-ming-juan3-print-scope.js';

describe('Yuanhai Ming printed-juan versus physically bound volume correction', () => {
  test('physical volume one covers printed juan 1/2, not the target chapter in juan 3', () => {
    expect(YUANHAI_MING_JUAN3_BIBLIOGRAPHIC_VERSION).toContain('v14');
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
