import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import {
  YUANHAI_MING_JUAN3_BIBLIOGRAPHIC_VERSION,
  YUANHAI_NLC_PHYSICAL_BOOKS,
  YUANHAI_NCL_TAIWAN_PRINT_SCAN,
  YUANHAI_CHONGZHEN_WOOD_OCR_PRINT_LOCATOR,
  YUANHAI_PRINT_VARIANT_CRITICAL_ASSESSMENT,
  YUANHAI_PREWANLI_SOURCE_ACCESS_AUDIT,
  YUANHAI_JUAN3_ADDITIONAL_DIGITAL_WITNESSES,
  YUANHAI_JUAN3_TEXTUAL_DISAGREEMENTS,
  YUANHAI_JUAN3_PRINT_SCOPE_UNRESOLVED,
  buildYuanHaiMingJuan3PrintScope,
} from '../src/research/general-annual-yuanhai-ming-juan3-print-scope.js';

describe('Yuanhai Ming printed-juan versus physically bound volume correction', () => {
  test('physical volume one covers printed juan 1/2, not the target chapter in juan 3', () => {
    expect(YUANHAI_MING_JUAN3_BIBLIOGRAPHIC_VERSION).toContain('v8');
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
