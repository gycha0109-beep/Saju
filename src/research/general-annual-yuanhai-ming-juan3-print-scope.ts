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
 * double-checked, nor does this print establish other editions or precedence.
 */
export const YUANHAI_MING_JUAN3_BIBLIOGRAPHIC_VERSION =
  'sa7d-yuanhai-ming-juan3-corrected-print-collation-v3' as const;

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
  'OTHER_MING_EDITION_OCR_WOOD_REQUIRES_INDEPENDENT_PRINT_COLLATION',
  'NLC_PRINTED_HOUR_FIRST_GLYPH_VISUALLY_FAVORS_JI_NEEDS_SECOND_INDEPENDENT_READING',
  'PREVIOUS_NLC_PRINT_WOOD_READING_RETRACTED_AFTER_SECOND_PASS',
  'NLC_PRINT_DERIVED_OCR_HOUR_PILLAR_SAYS_SI_SI_WHILE_OTHER_TRANSCRIPTS_SAY_JI_SI',
  'NO_INDEPENDENT_SECOND_PHYSICAL_EDITION_WITH_FOCAL_GLYPHS_COLLATED',
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
    status: 'ming_juan3_page11_wei_verified_hour_stem_provisional' as const,
    version: YUANHAI_MING_JUAN3_BIBLIOGRAPHIC_VERSION,
    upstreamDigitalSixPillarHash: prior.witnessHash,
    sources: books,
    additionalTextWitnesses: additions,
    digitalWitnessRecordsTotal: 6 as const,
    independentlyCollatedPrintedWitnessCount: 1 as const,
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
      actualPrintedUnGlyphConfirmed: true as const,
      actualPrintedWoodGlyphConfirmed: false as const,
      actualPrintedHourStemConfirmed: false as const,
      digitalMajorityVoteAuthorized: false as const,
      fullyValidatedSixPillarHistoricalCase: false as const,
      clashCancellationOrThreeBranchPrecedenceAuthorized: false as const,
      historicalLifeEventVerified: false as const,
      personalAnnualReadingAuthorized: false as const,
      productionAuthorized: false as const,
    }),
    adjudicatedPrintedGlyph: null, // NLC local print 未 != cross-edition archetype adjudication
    adjudicatedHistoricalWinner: null,
    modernInterpretationClaim: null,
  };
  return Object.freeze({ ...material, scopeHash: deterministicContentHash(material) });
}
