import type { CanonicalSajuSnapshot } from '../contracts/calculation.js';
import type { ReadingRequest } from '../contracts/reading.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { buildGeneralAnnualThreeLayerFactCorpus } from './general-annual-three-layer-fact-corpus.js';
import { inspectAnnualCrossLayerTripleCandidates } from './general-annual-cross-layer-three-combination-candidates.js';
import { auditAnnualTripleClashSlotOverlap } from './general-annual-triple-clash-slot-overlap-audit.js';

/**
 * Compare very narrow textual propositions against an observed triple/clash.
 * The text is evidence of historical doctrine, not validation of a forecast.
 */
export const ANNUAL_TRIPLE_CLASH_PRIORITY_ADMISSIBILITY_VERSION =
  'sa7d-annual-triple-clash-priority-source-admissibility-v1' as const;

const DIGITAL_WITNESS = 'https://zh.wikisource.org/zh-hant/三命通會/卷二' as const;

export const ANNUAL_TRIPLE_CLASH_PRIORITY_SOURCE_ANCHORS = Object.freeze([
  Object.freeze({
    id: 'TRIPLE_COMPLETENESS',
    section: '論支元三合' as const,
    excerpt: '若三字缺一則化不成局',
    proposition: 'incomplete_branch_triple_not_complete_bureau' as const,
    supportsGlobalTripleClashPrecedence: false as const,
    source: DIGITAL_WITNESS,
    witness: 'digital_transcription_only' as const,
    originalPrintClauseFullyVerified: false as const,
  }),
  Object.freeze({
    id: 'TRIPLE_CONTEXT_MATTERS',
    section: '論支元三合' as const,
    excerpt: '大率合吉神則吉，合凶神則凶',
    proposition: 'classical_combination_assessment_is_contextual' as const,
    supportsGlobalTripleClashPrecedence: false as const,
    source: DIGITAL_WITNESS,
    witness: 'digital_transcription_only' as const,
    originalPrintClauseFullyVerified: false as const,
  }),
  Object.freeze({
    id: 'CLASH_NONUNIFORM',
    section: '論衝擊' as const,
    excerpt: '可見衝破有吉有凶，不可概論',
    proposition: 'historical_clash_assessment_not_uniform' as const,
    supportsGlobalTripleClashPrecedence: false as const,
    source: DIGITAL_WITNESS,
    witness: 'digital_transcription_only' as const,
    originalPrintClauseFullyVerified: false as const,
  }),
  Object.freeze({
    id: 'BREAK_COMBINATION_STEM_SCOPE',
    section: '論衝擊' as const,
    excerpt: '破合者，乃干合被支破',
    proposition: 'described_break_combination_involves_stem_combination' as const,
    supportsGlobalTripleClashPrecedence: false as const,
    source: DIGITAL_WITNESS,
    witness: 'digital_transcription_only' as const,
    originalPrintClauseFullyVerified: false as const,
  }),
]);

export const ANNUAL_TRIPLE_CLASH_PRIORITY_QUESTIONS = Object.freeze([
  Object.freeze({
    id: 'TRIPLE_ALWAYS_OVERRIDES_CLASH',
    sourceIds: ['TRIPLE_COMPLETENESS', 'CLASH_NONUNIFORM'] as const,
    gate: 'HOLD_NO_DIRECT_PRECEDENCE_CLAUSE' as const,
  }),
  Object.freeze({
    id: 'CLASH_ALWAYS_BREAKS_TRIPLE',
    sourceIds: ['BREAK_COMBINATION_STEM_SCOPE'] as const,
    gate: 'HOLD_STEM_BREAK_CLAUSE_NOT_BRANCH_TRIPLE_RULE' as const,
  }),
  Object.freeze({
    id: 'STEM_COMBINATION_BREAK_TRANSFERS_TO_THREE_BRANCHES',
    sourceIds: ['BREAK_COMBINATION_STEM_SCOPE', 'TRIPLE_COMPLETENESS'] as const,
    gate: 'HOLD_SCOPE_MISMATCH' as const,
  }),
  Object.freeze({
    id: 'ALL_CLASHES_ARE_UNFAVORABLE',
    sourceIds: ['CLASH_NONUNIFORM'] as const,
    gate: 'HOLD_BLANKET_CLAIM_CONFLICTS_WITH_TEXT' as const,
  }),
  Object.freeze({
    id: 'ALL_TRIPLES_ARE_FAVORABLE',
    sourceIds: ['TRIPLE_CONTEXT_MATTERS'] as const,
    gate: 'HOLD_BLANKET_CLAIM_CONFLICTS_WITH_TEXT' as const,
  }),
  Object.freeze({
    id: 'ANNUAL_AUTOMATICALLY_OUTRANKS_DAYUN_AND_NATAL',
    sourceIds: [] as const,
    gate: 'HOLD_NO_THREE_LAYER_RANKING_METHOD' as const,
  }),
]);

export const ANNUAL_TRIPLE_CLASH_PRIORITY_UNRESOLVED = Object.freeze([
  'DIRECT_CLASSICAL_PRECEDENCE_RULE_FOR_BRANCH_TRIPLE_VERSUS_CLASH_UNPROVEN',
  'STEM_BREAK_COMBINATION_EXAMPLE_NOT_GENERALIZABLE_TO_BRANCH_TRIPLE',
  'THREE_LAYER_NATAL_DAYUN_ANNUAL_ADJUDICATION_UNPROVEN',
  'SOURCE_EDITION_VARIANTS_AND_PRINT_CONTEXT_UNVERIFIED',
  'PERSONAL_SEVERITY_TIMING_AND_OUTCOME_NOT_ESTABLISHED',
  'NATAL_ONLY_AND_OTHER_UNOBSERVED_RELATIONS_NOT_EXCLUDED',
] as const);

export function buildAnnualTripleClashPrioritySourceAdmissibility() {
  const ids = new Set(ANNUAL_TRIPLE_CLASH_PRIORITY_SOURCE_ANCHORS.map((x) => x.id));
  if (ids.size !== 4 ||
      ANNUAL_TRIPLE_CLASH_PRIORITY_QUESTIONS.length !== 6 ||
      ANNUAL_TRIPLE_CLASH_PRIORITY_QUESTIONS.some((q) =>
        q.sourceIds.some((id) => !ids.has(id))) ||
      ANNUAL_TRIPLE_CLASH_PRIORITY_SOURCE_ANCHORS.some((x) =>
        x.supportsGlobalTripleClashPrecedence ||
        x.originalPrintClauseFullyVerified ||
        x.witness !== 'digital_transcription_only')) {
    throw new Error('Historical priority evidence changed: review before admission');
  }
  const material = {
    version: ANNUAL_TRIPLE_CLASH_PRIORITY_ADMISSIBILITY_VERSION,
    witnessTier: 'digital_transcription_only' as const,
    anchors: ANNUAL_TRIPLE_CLASH_PRIORITY_SOURCE_ANCHORS,
    questions: ANNUAL_TRIPLE_CLASH_PRIORITY_QUESTIONS.map((q) =>
      Object.freeze({
        ...q,
        admittedAsExecutableMethod: false as const,
        admittedAsModernPersonalClaim: false as const,
      })),
    unresolved: ANNUAL_TRIPLE_CLASH_PRIORITY_UNRESOLVED,
    authority: Object.freeze({
      historicalSourceStatementIsNotAValidatedOutcome: true as const,
      sourceParagraphCompletenessVerified: false as const,
      conditionalContextResolutionAuthorized: false as const,
      numericOrTemporalPriorityAuthorized: false as const,
      consumerReadingAuthorized: false as const,
      productionAuthorized: false as const,
    }),
  };
  return Object.freeze({ ...material, sourceAuditHash: deterministicContentHash(material) });
}

/**
 * Preserve the observed 9-pair/16-triple universe. An overlapping slot is
 * merely a necessary structural observation, not an adjudicated competition.
 */
export function auditAnnualTripleClashPriorityAdmissibility(
  snapshot: CanonicalSajuSnapshot,
  request: ReadingRequest,
) {
  const prior = auditAnnualTripleClashSlotOverlap(snapshot, request);
  if (prior.status === 'input_unavailable') return Object.freeze({
    status: 'input_unavailable' as const,
    reasonCode: prior.reasonCode,
    productionAuthorized: false as const,
  });
  const pairs = buildGeneralAnnualThreeLayerFactCorpus(snapshot, request);
  const triples = inspectAnnualCrossLayerTripleCandidates(snapshot, request);
  if (pairs.state !== 'research_three_layer_facts_only' ||
      triples.status !== 'research_triple_candidates_only_hold' ||
      prior.upstreamTripleAuditHash !== triples.auditHash ||
      prior.upstreamPairCorpusHash !== pairs.corpusHash ||
      prior.pairChecksConsidered !== 9 ||
      prior.tripleChecksConsidered !== 16 ||
      prior.authority.globalRulePrecedenceAuthorized ||
      prior.authority.sourceClaimToModernEventAuthorized ||
      prior.authority.productionAuthorized ||
      triples.authority.pairAndTriplePrecedenceAdmitted ||
      pairs.limits.precedenceOrStrengthRankingAuthorized) {
    throw new Error('Structural or source authority drift requires review');
  }
  const source = buildAnnualTripleClashPrioritySourceAdmissibility();
  // Preserve discriminated-union narrowing inside the mapping closure.
  const pairMatches = pairs.pairMatches;
  const pairChecks = pairs.pairChecks;
  const tripleChecks = triples.checks;
  const overlapCases = prior.comparisons.map((x) => {
    const triple = tripleChecks.find((t) =>
      t.slots.join('|') === x.tripleSlots.join('|') &&
      t.candidateKind === 'branch_three_combination');
    const pair = pairChecks.find((p) => p.pairKey === x.clashPairKey);
    const pairClash = pairMatches.find((p) =>
      p.pairKey === x.clashPairKey && p.kind === 'branch_clash');
    const stemFiveCombinationOnClashPair = pairMatches.some((p) =>
      p.pairKey === x.clashPairKey && p.kind === 'stem_five_combination');
    if (!triple || !pair?.observedKinds.includes('branch_clash') ||
        !pairClash || !pairClash.structuralMatchOnly ||
        pairClash.strengthOrOutcomeDetermined || pairClash.transformationEstablished ||
        triple.matchingSourceIds.length === 0 ||
        pairClash.sourceIds.length === 0) {
      throw new Error('An overlapping triple/clash lacks structural evidence');
    }
    return Object.freeze({
      tripleSlots: Object.freeze([...x.tripleSlots]),
      clashPairKey: x.clashPairKey,
      slotIntersection: x.slotIntersection,
      sharedSlots: Object.freeze([...x.sharedSlots]),
      tripleSourceIds: Object.freeze([...triple.matchingSourceIds]),
      clashSourceIds: Object.freeze([...pairClash.sourceIds]),
      stemFiveCombinationOnClashPair,
      // The printed 破合 examples involve stem combinations; they do not
      // establish that the 3-branch combination loses to a branch clash.
      breakCombinationClauseAppliesToThreeBranchPriority: false as const,
      admissiblePriorityDecision: null,
      combinationTransformationOrCancellation: null,
      individualOutcome: null,
    });
  });
  if (overlapCases.length !== prior.comparisons.length ||
      prior.comparisonsWithSharedSlot + prior.comparisonsWithDisjointSlots !== overlapCases.length) {
    throw new Error('Incomplete structural overlap census');
  }

  const material = {
    status: 'research_precedence_source_admissibility_hold' as const,
    version: ANNUAL_TRIPLE_CLASH_PRIORITY_ADMISSIBILITY_VERSION,
    sourceAuditHash: source.sourceAuditHash,
    tripleClashOverlapAuditHash: prior.auditHash,
    pairCorpusHash: pairs.corpusHash,
    tripleCandidateHash: triples.auditHash,
    observedPairClashes: prior.observedPairClashes,
    observedTripleCandidates: prior.observedTripleCandidates,
    observedCoexistencePairs: overlapCases.length,
    cases: Object.freeze(overlapCases),
    questionGates: source.questions,
    unresolved: ANNUAL_TRIPLE_CLASH_PRIORITY_UNRESOLVED,
    authority: Object.freeze({
      observationsAndLiteraryEvidenceOnly: true as const,
      unobservedMeansNoConclusion: true as const,
      stemBreakClauseNotGeneralizedToBranchTriple: true as const,
      tripleClashPrecedenceAuthorized: false as const,
      historicalIndividualJudgmentAuthorized: false as const,
      modernEventClaimAuthorized: false as const,
      officialReadingAuthorized: false as const,
      productionAuthorized: false as const,
    }),
    competingRuleWinner: null,
    appliedStemBreakToThreeBranchTransformation: null,
    interpretationClaim: null,
    severity: null,
  };
  return Object.freeze({ ...material, auditHash: deterministicContentHash(material) });
}
