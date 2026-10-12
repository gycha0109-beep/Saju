import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import {
  YUANHAI_MING_JUAN3_BIBLIOGRAPHIC_VERSION,
  YUANHAI_NLC_PHYSICAL_BOOKS,
  YUANHAI_JUAN3_ADDITIONAL_DIGITAL_WITNESSES,
  YUANHAI_JUAN3_TEXTUAL_DISAGREEMENTS,
  YUANHAI_JUAN3_PRINT_SCOPE_UNRESOLVED,
  buildYuanHaiMingJuan3PrintScope,
} from '../src/research/general-annual-yuanhai-ming-juan3-print-scope.js';

describe('Yuanhai Ming printed-juan versus physically bound volume correction', () => {
  test('physical volume one covers printed juan 1/2, not the target chapter in juan 3', () => {
    expect(YUANHAI_MING_JUAN3_BIBLIOGRAPHIC_VERSION).toContain('v2');
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
      targetPrintColumnConfirmed: 'right-hand folio, column containing 運行辛亥亥卯木合起羊刃',
      targetPrintedUnOrMuGlyphConfirmed: '木',
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

  test('local print reads 木 but cross-edition 未/木 and 己/巳 disagreements remain non-normalized', () => {
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
      .toContain('NLC_OCR_WEI_DISAGREES_WITH_VISUALLY_INSPECTED_NLC_PRINT_WOOD');
  });

  test('one directly inspected NLC print is separate from six digital transcriptions and does not promote semantics', () => {
    const scope = buildYuanHaiMingJuan3PrintScope();
    expect(scope.status).toBe(
      'ming_juan3_page11_wood_glyph_verified_hour_stem_unresolved',
    );
    expect(scope.digitalWitnessRecordsTotal).toBe(6);
    expect(scope.independentlyCollatedPrintedWitnessCount).toBe(1);
    expect(scope.additionalTextWitnesses)
      .toBe(YUANHAI_JUAN3_ADDITIONAL_DIGITAL_WITNESSES);
    expect(scope.authority).toMatchObject({
      correctPhysicalBookForPrintedJuanThreeIdentified: true,
      twoMoreDigitalTranscriptsCompared: true,
      sourcePdfPageColumnIdentified: true,
      actualPrintedUnGlyphConfirmed: false,
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
      verifiedTripleFinalGlyph: '木',
      printedPhrase: '亥卯木合起羊刃',
      conflictingNlcOcrPhrase: '亥卯未合起羊刃',
      hourPillarFirstGlyph: null,
      printReadingScope: 'single_NLC_physical_print_only',
      inspection: 'manual_visual_scan_checked',
    });
    expect(scope.verifiedLocalNlcPrint.pdfSha256).toMatch(/^[0-9a-f]{64}$/);
    expect(scope.authority.actualPrintedUnGlyphConfirmed).toBe(false);
    expect(scope.authority.actualPrintedHourStemConfirmed).toBe(false);
    expect(scope.adjudicatedPrintedGlyph).toBeNull();
    expect(scope.adjudicatedHistoricalWinner).toBeNull();
    expect(scope.modernInterpretationClaim).toBeNull();
    const { scopeHash, ...material } = scope;
    expect(scopeHash).toBe(deterministicContentHash(material));
    expect(buildYuanHaiMingJuan3PrintScope()).toEqual(scope);
  });
});
