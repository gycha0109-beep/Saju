import type { CanonicalSajuSnapshot } from '../contracts/calculation.js';
import type { ReadingRequest } from '../contracts/reading.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  auditAnnualTripleClashPriorityAdmissibility,
  buildAnnualTripleClashPrioritySourceAdmissibility,
} from './general-annual-triple-clash-priority-admissibility.js';

/**
 * Research-only: distinguish digitized witness glyphs from a verified
 * printed variant. Multiple web mirrors are not assumed independent editions.
 */
export const ANNUAL_SOURCE_GLYPH_COLLATION_VERSION =
  'sa7d-annual-sanming-juan2-digital-witness-glyph-collation-v1' as const;

export const ANNUAL_SOURCE_GLYPH_WITNESSES = Object.freeze([
  Object.freeze({
    id: 'WS-2292392',
    url: 'https://zh.wikisource.org/w/index.php?title=三命通會/卷二&oldid=2292392',
    section: '論衝擊' as const,
    exampleStart: '如甲午人見己亥' as const,
    subsequentClause: '或見巳字' as const,
    closingPhrase: '可見衝破有吉有凶，不可概論' as const,
    textCarrier: 'Wikisource page revision' as const,
    firstPrintedEditionIdentified: false as const,
    printImageGlyphVerified: false as const,
    independentEditionEstablished: false as const,
  }),
  Object.freeze({
    id: 'SHIDIAN-SK1610',
    url: 'https://www.shidianguji.com/zh/book/SK1610/chapter/1kt0ayvn4fjf7',
    section: '論衝擊' as const,
    exampleStart: '如甲午人見巳亥' as const,
    subsequentClause: '或見已字' as const,
    closingPhrase: '觀諸詩，見衝破有吉有凶，不可槩論' as const,
    textCarrier: 'digitized SK1610 chapter transcription' as const,
    firstPrintedEditionIdentified: false as const,
    printImageGlyphVerified: false as const,
    independentEditionEstablished: false as const,
  }),
  Object.freeze({
    id: 'SHIDIAN-HY1521',
    url: 'https://www.shidianguji.com/zh/book/HY1521/chapter/1knwemh3lrtpj',
    section: '論衝擊' as const,
    exampleStart: '如甲午人見己亥' as const,
    subsequentClause: '或見巳字' as const,
    closingPhrase: '觀諸詩，見衝破有吉有凶，不可槩論' as const,
    textCarrier: 'digitized HY1521 volume transcription' as const,
    firstPrintedEditionIdentified: false as const,
    printImageGlyphVerified: false as const,
    independentEditionEstablished: false as const,
  }),
]);

export const ANNUAL_SOURCE_GLYPH_LOCI = Object.freeze([
  Object.freeze({
    id: 'BREAK_CASE_EXAMPLE_FIRST_PILLAR' as const,
    field: 'exampleStart' as const,
    ambiguity: '己亥 versus 巳亥 changes stem-branch identity' as const,
    mayNormalizeConfusables: false as const,
  }),
  Object.freeze({
    id: 'BREAK_CASE_FOLLOWUP_BRANCH_GLYPH' as const,
    field: 'subsequentClause' as const,
    ambiguity: '巳 versus 已 have distinct Unicode and only 巳 is a branch' as const,
    mayNormalizeConfusables: false as const,
  }),
  Object.freeze({
    id: 'CLASH_CHAPTER_CONCLUSION_FORM' as const,
    field: 'closingPhrase' as const,
    ambiguity: 'shortened ending versus extended ending, 概 versus 槩' as const,
    mayNormalizeConfusables: false as const,
  }),
]);

export const ANNUAL_SOURCE_GLYPH_COLLATION_UNRESOLVED = Object.freeze([
  'ORIGINAL_PRINT_JUAN2_IMAGE_GLYPHS_NOT_COLLATED',
  'TRANSCRIPTION_GENEALOGY_AND_EDITION_INDEPENDENCE_UNVERIFIED',
  'CHARACTER_CONFUSABLES_MUST_NOT_BE_SILENTLY_NORMALIZED',
  'UNRESOLVED_EXAMPLE_MUST_NOT_BECOME_EXACT_BRANCH_OR_PILLAR_RULE',
  'HISTORICAL_PROPOSITION_NOT_VALIDATED_FOR_MODERN_OUTCOME',
  'PRIOR_TRIPLE_VERSUS_CLASH_PRIORITY_HOLD_REMAINS_BINDING',
] as const);

/** Deliberately no majority vote; mirror counts cannot establish a text. */
export function buildAnnualSourceGlyphWitnessCollation() {
  const parent = buildAnnualTripleClashPrioritySourceAdmissibility();
  if (
    parent.authority.productionAuthorized ||
    parent.authority.numericOrTemporalPriorityAuthorized ||
    parent.questions.some((q) => q.admittedAsExecutableMethod) ||
    ANNUAL_SOURCE_GLYPH_WITNESSES.length !== 3 ||
    new Set(ANNUAL_SOURCE_GLYPH_WITNESSES.map((w) => w.url)).size !== 3 ||
    ANNUAL_SOURCE_GLYPH_WITNESSES.some((w) =>
      w.printImageGlyphVerified || w.independentEditionEstablished) ||
    ANNUAL_SOURCE_GLYPH_LOCI.length !== 3
  ) throw new Error('Historical witness evidence tier requires review');

  const differences = ANNUAL_SOURCE_GLYPH_LOCI.map((locus) => {
    const observed = ANNUAL_SOURCE_GLYPH_WITNESSES.map((w) =>
      Object.freeze({
        witnessId: w.id,
        exactText: w[locus.field],
      }));
    const uniqueTexts = [...new Set(observed.map((o) => o.exactText))];
    if (uniqueTexts.length !== 2) throw new Error('Observed transcription variants drifted');
    return Object.freeze({
      locus: locus.id,
      ambiguity: locus.ambiguity,
      observations: Object.freeze(observed),
      distinctDigitalTextCount: uniqueTexts.length,
      unresolvedEditorialVariant: true as const,
      printedPreferredReading: null,
      majorityReading: null,
      automaticallyNormalizedReading: null,
      executableRuleAdmitted: false as const,
    });
  });
  const material = {
    status: 'digital_transcription_variants_unresolved' as const,
    version: ANNUAL_SOURCE_GLYPH_COLLATION_VERSION,
    upstreamPrioritySourceHash: parent.sourceAuditHash,
    witnesses: ANNUAL_SOURCE_GLYPH_WITNESSES,
    loci: ANNUAL_SOURCE_GLYPH_LOCI,
    differences: Object.freeze(differences),
    comparisonCount: 3 as const,
    unresolved: ANNUAL_SOURCE_GLYPH_COLLATION_UNRESOLVED,
    authority: Object.freeze({
      multipleWebsitesDoNotProveIndependentManuscripts: true as const,
      uncertainStemOrBranchCharacterMustNotBeInferred: true as const,
      printVariantValidated: false as const,
      stemBreakCaseAdmittedAsPillarRule: false as const,
      tripleClashGlobalPriorityAdmitted: false as const,
      historicalSeverityAdmitted: false as const,
      modernPersonalReadingAdmitted: false as const,
      productionAuthorized: false as const,
    }),
  };
  return Object.freeze({
    ...material,
    witnessCollationHash: deterministicContentHash(material),
  });
}

export function auditAnnualSourceGlyphVariantScope(
  snapshot: CanonicalSajuSnapshot,
  request: ReadingRequest,
) {
  const previous = auditAnnualTripleClashPriorityAdmissibility(snapshot, request);
  if (previous.status === 'input_unavailable') return Object.freeze({
    status: 'input_unavailable' as const,
    reasonCode: previous.reasonCode,
    productionAuthorized: false as const,
  });
  if (
    previous.status !== 'research_precedence_source_admissibility_hold' ||
    previous.authority.tripleClashPrecedenceAuthorized ||
    previous.authority.productionAuthorized ||
    previous.authority.modernEventClaimAuthorized ||
    previous.questionGates.length !== 6
  ) throw new Error('Previous historical rule authority changed');
  const collation = buildAnnualSourceGlyphWitnessCollation();
  const material = {
    status: 'research_witness_variant_gate_hold' as const,
    version: ANNUAL_SOURCE_GLYPH_COLLATION_VERSION,
    parentPriorityAuditHash: previous.auditHash,
    witnessCollationHash: collation.witnessCollationHash,
    observedTripleCandidates: previous.observedTripleCandidates,
    observedPairClashes: previous.observedPairClashes,
    observedCoexistencePairs: previous.observedCoexistencePairs,
    unresolvedWitnessLoci: collation.differences.map((item) => item.locus),
    effectivePriorityDecision: null,
    verifiedPrintedExample: null,
    claimedPersonalOutcome: null,
    gates: Object.freeze({
      sourceExampleGlyphDisputeOpen: true as const,
      webWitnessMajorityVotingAuthorized: false as const,
      uncertainExampleToExecutableRuleAuthorized: false as const,
      tripleClashPrecedenceAuthorized: false as const,
      consumerReadingAuthorized: false as const,
      productionAuthorized: false as const,
    }),
  };
  return Object.freeze({
    ...material,
    auditHash: deterministicContentHash(material),
  });
}
