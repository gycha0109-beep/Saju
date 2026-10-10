import type { CanonicalSajuSnapshot, EarthlyBranch } from '../contracts/calculation.js';
import type { ReadingRequest } from '../contracts/reading.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  inspectAnnualCrossLayerTripleCandidates,
  type AnnualTripleSlot,
} from './general-annual-cross-layer-three-combination-candidates.js';
import {
  buildGeneralAnnualThreeLayerFactCorpus,
  type ThreeLayerPairKey,
} from './general-annual-three-layer-fact-corpus.js';

/** Only compare source-backed structural identities; never rank competing rules. */
export const ANNUAL_TRIPLE_CLASH_OVERLAP_VERSION =
  'sa7d-annual-triple-clash-slot-overlap-audit-v1' as const;

export const ANNUAL_TRIPLE_CLASH_WITNESSES = Object.freeze([
  Object.freeze({
    id: 'SMTH-V2-TRIPLE-COMPLETENESS',
    section: '論支元三合' as const,
    excerpt: '若三字缺一則化不成局，不可以三合化局論',
    url: 'https://zh.wikisource.org/zh-hant/三命通會/卷二' as const,
    witnessLevel: 'digital_transcription_only' as const,
    verifiedAgainstOriginalPrintFullContext: false as const,
    authorizesTransformationOrPersonalOutcome: false as const,
  }),
  Object.freeze({
    id: 'SMTH-V2-CLASH-NONUNIFORMITY',
    section: '論衝擊' as const,
    excerpt: '可見衝破有吉有凶，不可概論',
    url: 'https://zh.wikisource.org/zh-hant/三命通會/卷二' as const,
    witnessLevel: 'digital_transcription_only' as const,
    verifiedAgainstOriginalPrintFullContext: false as const,
    authorizesTransformationOrPersonalOutcome: false as const,
  }),
]);

const PAIR_SLOTS: Readonly<Record<ThreeLayerPairKey,
  readonly [AnnualTripleSlot, AnnualTripleSlot]>> = Object.freeze({
  'annual:dayun': ['annual', 'dayun'],
  'annual:natal:year': ['annual', 'natal:year'],
  'annual:natal:month': ['annual', 'natal:month'],
  'annual:natal:day': ['annual', 'natal:day'],
  'annual:natal:hour': ['annual', 'natal:hour'],
  'dayun:natal:year': ['dayun', 'natal:year'],
  'dayun:natal:month': ['dayun', 'natal:month'],
  'dayun:natal:day': ['dayun', 'natal:day'],
  'dayun:natal:hour': ['dayun', 'natal:hour'],
});

export const ANNUAL_TRIPLE_CLASH_UNRESOLVED = Object.freeze([
  'THREE_COMBINATION_TRANSFORMATION_NOT_ESTABLISHED',
  'CLASH_EFFECT_OR_DIRECTION_NOT_ESTABLISHED',
  'COMBINATION_VERSUS_CLASH_PRIORITY_NOT_ESTABLISHED',
  'SAME_BRANCH_VALUE_DOES_NOT_MERGE_DIFFERENT_PILLAR_SLOTS',
  'UNMODELED_NATAL_ONLY_PAIRS_AND_TRIPLES',
  'CLASSICAL_CONTEXT_PRINT_COLUMNS_AND_VARIANTS_UNVERIFIED',
  'PERSONAL_ANNUAL_SEVERITY_TIMING_AND_EVENTS_NOT_ADMITTED',
] as const);

/**
 * Compare all observed cross-temporal three-branch candidates against the
 * nine-pair corpus's observed branch clashes. Each output is a factual
 * cross-product tagged by *pillar slot identity*, not a calculated outcome.
 */
export function auditAnnualTripleClashSlotOverlap(
  snapshot: CanonicalSajuSnapshot,
  request: ReadingRequest,
) {
  const triples = inspectAnnualCrossLayerTripleCandidates(snapshot, request);
  if (triples.status === 'input_unavailable') return Object.freeze({
    status: 'input_unavailable' as const,
    reasonCode: triples.reasonCode,
    productionAuthorized: false as const,
  });
  const pairs = buildGeneralAnnualThreeLayerFactCorpus(snapshot, request);
  if (
    pairs.state !== 'research_three_layer_facts_only' ||
    pairs.corpusHash !== triples.originalPairCorpusHash ||
    pairs.pairChecks.length !== 9 ||
    triples.checks.length !== 16 ||
    triples.pairCheckCountUnchanged !== 9 ||
    triples.authority.pairAndTriplePrecedenceAdmitted ||
    triples.authority.classicalSeverityAdmitted ||
    triples.authority.productionAuthorized ||
    pairs.limits.precedenceOrStrengthRankingAuthorized ||
    pairs.limits.productionAuthorized
  ) throw new Error('Source-bound triple or pair authority drifted; new review required');

  const branches: Readonly<Record<AnnualTripleSlot, EarthlyBranch>> = {
    annual: pairs.annualPillar.branch,
    dayun: pairs.dayun.branch,
    'natal:year': requireNatal('year'),
    'natal:month': requireNatal('month'),
    'natal:day': requireNatal('day'),
    'natal:hour': requireNatal('hour'),
  };
  function requireNatal(slot: 'year' | 'month' | 'day' | 'hour'): EarthlyBranch {
    const entry = pairs.natal.find((item) => item.slot === slot);
    if (!entry) throw new Error('Missing natal pillar ' + slot);
    return entry.branch;
  }

  const clashes = pairs.pairMatches.filter((pair) => pair.kind === 'branch_clash')
    .map((pair) => {
      const slots = PAIR_SLOTS[pair.pairKey];
      const check = pairs.pairChecks.find((c) => c.pairKey === pair.pairKey);
      if (
        !check?.observedKinds.includes('branch_clash') ||
        pair.observedLeftBranch !== branches[slots[0]] ||
        pair.observedRightBranch !== branches[slots[1]] ||
        !pair.structuralMatchOnly ||
        pair.transformationEstablished ||
        pair.strengthOrOutcomeDetermined ||
        pair.sourceIds.length === 0
      ) throw new Error('Branch-clash source identity or provenance disagrees');
      return Object.freeze({
        pairKey: pair.pairKey,
        slots: Object.freeze([...slots] as [AnnualTripleSlot, AnnualTripleSlot]),
        observedBranches: Object.freeze([
          pair.observedLeftBranch, pair.observedRightBranch,
        ] as [EarthlyBranch, EarthlyBranch]),
        sourceIds: Object.freeze([...pair.sourceIds]),
        observedOnly: true as const,
      });
    });

  const tripleCandidates = triples.checks.filter((item) => {
    if (
      item.structuralMatchOnly !== true ||
      item.transformationEstablished ||
      item.severityOrOutcomeEstablished
    ) throw new Error('Unreviewed triple semantics');
    return item.candidateKind === 'branch_three_combination';
  });

  const overlaps = tripleCandidates.flatMap((triple) => clashes.map((clash) => {
    if (triple.slots.some((slot, i) => triple.observedBranches[i] !== branches[slot])) {
      throw new Error('Triple candidate and pair census disagree');
    }
    const sharedSlots = triple.slots.filter((slot) => clash.slots.includes(slot));
    // No two branches within an established three-combination candidate are
    // themselves opposites. Flag any apparent within-triple clash as drift.
    if (sharedSlots.length > 1) {
      throw new Error('Unexpected clash within a single complete triple candidate');
    }
    return Object.freeze({
      tripleSlots: Object.freeze([...triple.slots]),
      tripleScope: triple.scope,
      tripleBranches: Object.freeze([...triple.observedBranches]),
      clashPairKey: clash.pairKey,
      clashSlots: clash.slots,
      sharedSlots: Object.freeze([...sharedSlots]),
      slotIntersection: sharedSlots.length === 0
        ? 'disjoint_pillar_slots' as const
        : 'one_shared_pillar_slot' as const,
      sameBranchValueDoesNotProveSamePillar: true as const,
      strengthOrWinner: null,
      transformationOrClashCancellation: null,
      modernPersonalOutcome: null,
    });
  }));

  if (
    tripleCandidates.length !== triples.observedCandidateCount ||
    overlaps.length !== tripleCandidates.length * clashes.length ||
    new Set(overlaps.map((x) =>
      x.tripleSlots.join('|') + '::' + x.clashPairKey,
    )).size !== overlaps.length
  ) throw new Error('Incomplete or duplicated triple–clash comparison');

  const material = {
    status: 'research_triple_clash_coexistence_hold' as const,
    version: ANNUAL_TRIPLE_CLASH_OVERLAP_VERSION,
    upstreamTripleAuditHash: triples.auditHash,
    upstreamPairCorpusHash: pairs.corpusHash,
    textWitnesses: ANNUAL_TRIPLE_CLASH_WITNESSES,
    pairChecksConsidered: 9 as const,
    tripleChecksConsidered: 16 as const,
    observedTripleCandidates: tripleCandidates.length,
    observedPairClashes: clashes.length,
    clashes: Object.freeze(clashes),
    comparisons: Object.freeze(overlaps),
    comparisonsWithSharedSlot: overlaps.filter((x) =>
      x.slotIntersection === 'one_shared_pillar_slot',
    ).length,
    comparisonsWithDisjointSlots: overlaps.filter((x) =>
      x.slotIntersection === 'disjoint_pillar_slots',
    ).length,
    unresolved: ANNUAL_TRIPLE_CLASH_UNRESOLVED,
    authority: Object.freeze({
      structuralObservationOnly: true as const,
      absenceOfOverlapIsNotProofOfGoodFortune: true as const,
      sharedSlotDoesNotEstablishCancellation: true as const,
      disjointSlotsDoNotEstablishIndependenceOfEffects: true as const,
      transformationEstablished: false as const,
      globalRulePrecedenceAuthorized: false as const,
      sourceClaimToModernEventAuthorized: false as const,
      officialReadingAuthorized: false as const,
      productionAuthorized: false as const,
    }),
    selectedWinner: null,
    calculatedSeverity: null,
    interpretedLifeEvent: null,
    consumerText: null,
  };
  return Object.freeze({
    ...material,
    auditHash: deterministicContentHash(material),
  });
}
