import type { CanonicalSajuSnapshot } from '../contracts/calculation.js';
import type { ReadingRequest } from '../contracts/reading.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  auditAnnualSourceGlyphVariantScope,
  buildAnnualSourceGlyphWitnessCollation,
} from './general-annual-source-glyph-witness-collation.js';

/**
 * A manually inspected print-image witness does not resolve other editions,
 * chronology, or historical doctrine's authority in consumer annual reading.
 */
export const ANNUAL_JUAN2_PRINT_COLLATION_VERSION =
  'sa7d-annual-juan2-nlc-print-image-collation-v1' as const;

export const ANNUAL_JUAN2_NLC_PRINT_WITNESS = Object.freeze({
  id: 'NLC892-VOLUME4-JUAN2-LOWER',
  repository: 'National Library of China (Wikimedia Commons scan)' as const,
  sourceUrl:
    'https://commons.wikimedia.org/wiki/File:NLC892-411999029701-67187_三命通會_第4冊.pdf' as const,
  sourceFilename: 'NLC892-411999029701-67187_三命通會_第4冊.pdf' as const,
  uploadedScanPageCount: 55 as const,
  targetPdfPageOneBased: 53 as const,
  targetImageSide: 'right leaf: final discussion; left leaf: chapter ending' as const,
  printedVolumeTitle: '三命通會卷二下' as const,
  printedEndHeading: '三命通會卷之二終' as const,
  section: '論衝擊' as const,
  verification: 'visual_inspection_of_scanned_print_image' as const,
  exemplarStemBranch: '己亥' as const,
  followupBranchGlyph: '巳' as const,
  conclusionPrefix: '觀諸詩' as const,
  differenceFromShortTranscript: 'shortened closing phrase lacks 觀諸詩' as const,
  verifiesExactPrintedVariantForThisWitnessOnly: true as const,
  separateEditionCollated: false as const,
  specificPrintDateVerifiedFromColophon: false as const,
  everyCharacterOfClosingLineVerified: false as const,
  classicalPrecedenceInstructionVerified: false as const,
});

export const ANNUAL_JUAN2_NCL_UPLOADED_SCOPE = Object.freeze({
  id: 'NCL-06589-2',
  sourceUrl: 'https://commons.wikimedia.org/wiki/File:NCL-06589_2_三命通會.pdf' as const,
  sourceFilename: 'NCL-06589_2_三命通會.pdf' as const,
  observedPdfPageOneBased: 68 as const,
  observedEndColophon: '三命通會卷之六終' as const,
  containsConfirmedMatchingJuan2Clause: false as const,
  independentPrintReadingVerified: false as const,
  excludeFromJuan2VariantVote: true as const,
});

export const ANNUAL_JUAN2_PRINT_COMPARED_LOCI = Object.freeze([
  Object.freeze({
    locus: 'BREAK_CASE_EXAMPLE_FIRST_PILLAR' as const,
    printedObservation: '己亥' as const,
    agreesWithDigitalWitnesses: Object.freeze(['WS-2292392', 'SHIDIAN-HY1521']),
    conflictsWithDigitalWitnesses: Object.freeze(['SHIDIAN-SK1610']),
    printedObservationForThisCopyVerified: true as const,
    authorialReadingAcrossEditionsKnown: false as const,
  }),
  Object.freeze({
    locus: 'BREAK_CASE_FOLLOWUP_BRANCH_GLYPH' as const,
    printedObservation: '巳' as const,
    agreesWithDigitalWitnesses: Object.freeze(['WS-2292392', 'SHIDIAN-HY1521']),
    conflictsWithDigitalWitnesses: Object.freeze(['SHIDIAN-SK1610']),
    printedObservationForThisCopyVerified: true as const,
    authorialReadingAcrossEditionsKnown: false as const,
  }),
  Object.freeze({
    locus: 'CLASH_CHAPTER_CONCLUSION_FORM' as const,
    printedObservation: '觀諸詩' as const,
    agreesWithDigitalWitnesses: Object.freeze(['SHIDIAN-SK1610', 'SHIDIAN-HY1521']),
    conflictsWithDigitalWitnesses: Object.freeze(['WS-2292392']),
    printedObservationForThisCopyVerified: true as const,
    authorialReadingAcrossEditionsKnown: false as const,
  }),
]);

export const ANNUAL_JUAN2_PRINT_REMAINING_HOLDS = Object.freeze([
  'NCL_UPLOAD_HAS_NO_VERIFIED_MATCHING_JUAN2_FACSIMILE',
  'INDEPENDENT_SECOND_PRINT_EDITION_NOT_YET_COLLATED',
  'PRINT_DATE_AND_TEXTUAL_GENEALOGY_NOT_VERIFIED',
  'COMPLETE_CLOSING_CLAUSE_VARIANT_GLYPHS_NOT_FULLY_COLLATED',
  'PRINTED_HISTORICAL_EXAMPLE_DOES_NOT_SET_TRIPLE_CLASH_PRECEDENCE',
  'NO_MODERN_ANNUAL_READING_AUTHORITY_FROM_PRINT_IMAGE',
] as const);

export function buildAnnualJuan2PrintImageCollation() {
  const digital = buildAnnualSourceGlyphWitnessCollation();
  const digitalIds = new Set<string>(digital.witnesses.map((item) => item.id));
  if (
    digital.authority.productionAuthorized ||
    digital.authority.tripleClashGlobalPriorityAdmitted ||
    !ANNUAL_JUAN2_NLC_PRINT_WITNESS.verifiesExactPrintedVariantForThisWitnessOnly ||
    ANNUAL_JUAN2_NLC_PRINT_WITNESS.separateEditionCollated ||
    !ANNUAL_JUAN2_NCL_UPLOADED_SCOPE.excludeFromJuan2VariantVote ||
    ANNUAL_JUAN2_PRINT_COMPARED_LOCI.length !== digital.differences.length
  ) throw new Error('Original print source authority changed');

  for (const locus of ANNUAL_JUAN2_PRINT_COMPARED_LOCI) {
    const corresponding = digital.differences.find((item) => item.locus === locus.locus);
    if (!corresponding) throw new Error('Print locus not present in digital census');
    const agreeing = corresponding.observations.filter((item) =>
      item.exactText.includes(locus.printedObservation)).map((item) => item.witnessId);
    const disagreeing = corresponding.observations.filter((item) =>
      !item.exactText.includes(locus.printedObservation)).map((item) => item.witnessId);
    if (
      !locus.agreesWithDigitalWitnesses.every((id) => digitalIds.has(id)) ||
      agreeing.join(',') !== locus.agreesWithDigitalWitnesses.join(',') ||
      disagreeing.join(',') !== locus.conflictsWithDigitalWitnesses.join(',')
    ) throw new Error('Original print/digital comparison does not match recorded variants');
  }

  const material = {
    status: 'one_print_witness_collated_no_precedence_approval' as const,
    version: ANNUAL_JUAN2_PRINT_COLLATION_VERSION,
    parentDigitalWitnessHash: digital.witnessCollationHash,
    primaryPrint: ANNUAL_JUAN2_NLC_PRINT_WITNESS,
    uploadedNonmatchingScope: ANNUAL_JUAN2_NCL_UPLOADED_SCOPE,
    comparedLoci: ANNUAL_JUAN2_PRINT_COMPARED_LOCI,
    printedWitnessCountForJuan2: 1 as const,
    independentSecondEditionCount: 0 as const,
    unresolved: ANNUAL_JUAN2_PRINT_REMAINING_HOLDS,
    authority: Object.freeze({
      narrowPrintedGlyphsVerifiedForOneCopy: true as const,
      independentSecondWitnessVerified: false as const,
      printExemplarProvesModernForecast: false as const,
      branchTripleClashPriorityAuthorized: false as const,
      branchTripleBreakFromStemBreakAuthorized: false as const,
      individualOutcomeAuthorized: false as const,
      officialReadingAuthorized: false as const,
      productionAuthorized: false as const,
    }),
  };
  return Object.freeze({ ...material, printCollationHash: deterministicContentHash(material) });
}

export function auditAnnualJuan2PrintImageScope(
  snapshot: CanonicalSajuSnapshot,
  request: ReadingRequest,
) {
  const previous = auditAnnualSourceGlyphVariantScope(snapshot, request);
  if (previous.status === 'input_unavailable') {
    return Object.freeze({
      status: 'input_unavailable' as const,
      reasonCode: previous.reasonCode,
      productionAuthorized: false as const,
    });
  }
  if (
    previous.status !== 'research_witness_variant_gate_hold' ||
    previous.gates.productionAuthorized ||
    previous.gates.tripleClashPrecedenceAuthorized
  ) throw new Error('Upstream annual interpretation authority changed');

  const print = buildAnnualJuan2PrintImageCollation();
  const material = {
    status: 'research_one_print_witness_priority_hold' as const,
    version: ANNUAL_JUAN2_PRINT_COLLATION_VERSION,
    upstreamDigitalAuditHash: previous.auditHash,
    printCollationHash: print.printCollationHash,
    observedTripleCandidates: previous.observedTripleCandidates,
    observedPairClashes: previous.observedPairClashes,
    observedCoexistencePairs: previous.observedCoexistencePairs,
    originalPrintSourceConfirmed: print.primaryPrint.id,
    originalPrintPageOneBased: print.primaryPrint.targetPdfPageOneBased,
    independentSecondPrintVerified: false as const,
    tripleClashPriorityDecision: null,
    interpretationClaim: null,
    authority: print.authority,
  };
  return Object.freeze({ ...material, auditHash: deterministicContentHash(material) });
}
