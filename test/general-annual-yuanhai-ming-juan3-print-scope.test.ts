import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import {
  YUANHAI_MING_JUAN3_BIBLIOGRAPHIC_VERSION,
  YUANHAI_NLC_PHYSICAL_BOOKS,
  YUANHAI_NCL_TAIWAN_PRINT_SCAN,
  YUANHAI_CHONGZHEN_WOOD_OCR_PRINT_LOCATOR,
  YUANHAI_JUAN3_ADDITIONAL_DIGITAL_WITNESSES,
  YUANHAI_JUAN3_TEXTUAL_DISAGREEMENTS,
  YUANHAI_JUAN3_PRINT_SCOPE_UNRESOLVED,
  buildYuanHaiMingJuan3PrintScope,
} from '../src/research/general-annual-yuanhai-ming-juan3-print-scope.js';

describe('Yuanhai Ming printed-juan versus physically bound volume correction', () => {
  test('physical volume one covers printed juan 1/2, not the target chapter in juan 3', () => {
    expect(YUANHAI_MING_JUAN3_BIBLIOGRAPHIC_VERSION).toContain('v5');
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
      .toContain('NO_INDEPENDENT_SECOND_PHYSICAL_EDITION_WITH_FOCAL_GLYPHS_COLLATED');
    expect(YUANHAI_JUAN3_PRINT_SCOPE_UNRESOLVED)
      .toContain('PREVIOUS_NLC_PRINT_WOOD_READING_RETRACTED_AFTER_SECOND_PASS');
    expect(YUANHAI_JUAN3_PRINT_SCOPE_UNRESOLVED)
      .toContain('OTHER_MING_EDITION_OCR_WOOD_REQUIRES_INDEPENDENT_PRINT_COLLATION');
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

  test('Chongzhen 1634 wood OCR is traced to physical book two/printed juan two, without fake glyph verification', () => {
    expect(YUANHAI_CHONGZHEN_WOOD_OCR_PRINT_LOCATOR).toMatchObject({
      ocrBookCollectionId: 'NGJ892411999032112149610',
      scannedPhysicalBookId: 'NLC892-411999032112-149611',
      notTargetFirstBookId: 'NLC892-411999032112-149610',
      physicalBookNumber: 2,
      printedJuan: 2,
      scanPdfPageCount: 36,
      observedOcrPhrase: '亥卯木合起羊刃',
      targetPdfPageOneBased: null,
      targetColumn: null,
      originalPrintGlyph: null,
      directOriginalPrintInspectionCompleted: false,
      distinctFocalWoodblocksEstablished: false,
      independentCollationCredit: 0,
      evidenceTier: 'ocr_with_bibliographic_source_located_print_uninspected',
    });
    expect(YUANHAI_CHONGZHEN_WOOD_OCR_PRINT_LOCATOR.pdfUrl)
      .toContain('149611_');
    expect(YUANHAI_JUAN3_PRINT_SCOPE_UNRESOLVED).toContain(
      'CHONGZHEN_1634_PRINTED_JUAN_TWO_SECOND_PHYSICAL_BOOK_IDENTIFIED_UNINSPECTED',
    );
  });

  test('one confirmed local edition lineage and two inspected scans plus one uninspected locator never promote semantics', () => {
    const scope = buildYuanHaiMingJuan3PrintScope();
    expect(scope.status).toBe(
      'ming_juan3_page11_wei_verified_hour_stem_provisional',
    );
    expect(scope.digitalWitnessRecordsTotal).toBe(6);
    expect(scope.independentlyCollatedPrintedWitnessCount).toBe(1);
    expect(scope.directlyInspectedScanDocumentsCount).toBe(2);
    expect(scope.nclTaiwanFacsimile).toBe(YUANHAI_NCL_TAIWAN_PRINT_SCAN);
    expect(scope.woodOcrOriginPrintLocator).toBe(YUANHAI_CHONGZHEN_WOOD_OCR_PRINT_LOCATOR);
    expect(scope.additionalTextWitnesses)
      .toBe(YUANHAI_JUAN3_ADDITIONAL_DIGITAL_WITNESSES);
    expect(scope.authority).toMatchObject({
      correctPhysicalBookForPrintedJuanThreeIdentified: true,
      twoMoreDigitalTranscriptsCompared: true,
      sourcePdfPageColumnIdentified: true,
      secondPrintScanLocusDirectlyCompared: true,
      independentSecondPrintEditionEstablished: false,
      chongzhenOcrOriginIdentified: true,
      chongzhenFocalPrintGlyphVerified: false,
      distinctChongzhenFocalWoodblocksEstablished: false,
      actualPrintedUnGlyphConfirmed: true,
      actualPrintedWoodGlyphConfirmed: false,
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
    expect(scope.authority.actualPrintedWoodGlyphConfirmed).toBe(false);
    expect(scope.authority.actualPrintedHourStemConfirmed).toBe(false);
    expect(scope.adjudicatedPrintedGlyph).toBeNull();
    expect(scope.adjudicatedHistoricalWinner).toBeNull();
    expect(scope.modernInterpretationClaim).toBeNull();
    const { scopeHash, ...material } = scope;
    expect(scopeHash).toBe(deterministicContentHash(material));
    expect(buildYuanHaiMingJuan3PrintScope()).toEqual(scope);
  });
});
