import type { CanonicalSajuSnapshot } from '../contracts/calculation.js';
import type { ReadingRequest } from '../contracts/reading.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  auditAnnualTripleClashSlotOverlap,
} from './general-annual-triple-clash-slot-overlap-audit.js';
import {
  CLASSICAL_RESOLUTION_CLAUSES,
  buildClassicalConditionalResolutionEvidence,
} from './general-annual-classical-conditional-clash-resolution.js';
import {
  auditAnnualThreeLayerClassicalSourceScope,
  buildAnnualThreeLayerClassicalSourceBridge,
} from './general-annual-three-layer-classical-source-bridge.js';

/**
 * The source chapter illustrates branch-level relationships in natal charts,
 * but its outcomes cannot be transferred onto combinations across natal,
 * Dayun and annual pillar slots without a separately admissible method.
 */
export const ANNUAL_PRINTED_TOPOLOGY_CASEBOOK_VERSION =
  'sa7d-annual-cross-temporal-printed-case-topology-reproduction-v1' as const;

export const ANNUAL_PRINTED_TOPOLOGY_PATTERNS = Object.freeze([
  Object.freeze({
    id: 'PRINTED_HAI_MAO_WEI_AND_MAO_YOU',
    clauseId: 'THREE_BRANCH_HAI_MAO_WEI_RESOLVES_MAO_YOU_CLASH',
    branchTriple: Object.freeze(['해', '묘', '미'] as const),
    branchClash: Object.freeze(['묘', '유'] as const),
    sharedBranch: '묘' as const,
    historicalContext: 'natal_four_pillar_example' as const,
    printQuoteProvesCrossTemporalMethod: false as const,
    printQuoteProvesGlobalWinner: false as const,
  }),
  Object.freeze({
    id: 'PRINTED_SA_YU_CHUK_AND_MAO_YOU',
    clauseId: 'THREE_BRANCH_SI_YOU_CHOU_RESOLVES_MAO_YOU_CLASH',
    branchTriple: Object.freeze(['사', '유', '축'] as const),
    branchClash: Object.freeze(['묘', '유'] as const),
    sharedBranch: '유' as const,
    historicalContext: 'natal_four_pillar_example' as const,
    printQuoteProvesCrossTemporalMethod: false as const,
    printQuoteProvesGlobalWinner: false as const,
  }),
]);

export const ANNUAL_PRINTED_TOPOLOGY_UNRESOLVED = Object.freeze([
  'SAME_BRANCH_VALUES_ARE_ONLY_TEXTUAL_TOPOLOGY_NOT_AN_ADMISSIBLE_CROSS_TEMPORAL_RULE',
  'SHARED_BRANCH_VALUE_ACROSS_DISTINCT_PILLAR_SLOTS_IS_NOT_SHARED_SLOT_IDENTITY',
  'PRINTED_NATAL_CASES_DO_NOT_DEFINE_DAYUN_ANNUAL_THREE_BRANCH_CLASH_PRECEDENCE',
  'PARTIAL_BRANCH_COMBINATIONS_AND_COMPETING_MULTIPLE_RELATIONS_NOT_RESOLVED',
  'UNOBSERVED_NATAL_ONLY_PAIRS_TRIPLES_AND_HIGHER_ARITY_EFFECTS_REMAIN_OUTSIDE_CENSUS',
  'NO_MODERN_SEVERITY_TIMING_GOOD_BAD_OR_PERSONAL_EVENT_CLAIM',
] as const);

function sameBranchMultiset(left: readonly string[], right: readonly string[]): boolean {
  return left.length === right.length &&
    [...left].sort().join('|') === [...right].sort().join('|');
}

export function buildAnnualPrintedTopologyEvidence() {
  const historical = buildClassicalConditionalResolutionEvidence();
  const temporal = buildAnnualThreeLayerClassicalSourceBridge();
  const caseIds = new Set<string>(historical.clauses.map((x) => x.id));
  const patternIds = new Set<string>(ANNUAL_PRINTED_TOPOLOGY_PATTERNS.map((x) => x.id));
  if (
    historical.authority.ruleCompetitionResolverAuthorized ||
    temporal.authority.fullySpecifiedTripleClashResolutionAlgorithm ||
    temporal.authority.productionAuthorized ||
    historical.authority.productionAuthorized ||
    ANNUAL_PRINTED_TOPOLOGY_PATTERNS.length !== 2 ||
    patternIds.size !== 2 ||
    ANNUAL_PRINTED_TOPOLOGY_PATTERNS.some((x) =>
      !caseIds.has(x.clauseId) ||
      !new Set<string>(x.branchTriple).has(x.sharedBranch) ||
      !new Set<string>(x.branchClash).has(x.sharedBranch) ||
      x.printQuoteProvesCrossTemporalMethod ||
      x.printQuoteProvesGlobalWinner)
  ) throw new Error('Printed analogy evidence or method authority changed');

  const branchToHanja: Readonly<Record<'해' | '묘' | '미' | '유' | '사' | '축', string>> = {
    해: '亥', 묘: '卯', 미: '未', 유: '酉', 사: '巳', 축: '丑',
  };
  for (const pattern of ANNUAL_PRINTED_TOPOLOGY_PATTERNS) {
    const clause = CLASSICAL_RESOLUTION_CLAUSES.find((x) => x.id === pattern.clauseId);
    const classicalGlyphs = new Set<string>(clause?.referencedBranches ?? []);
    if (!clause?.historicalExampleAffirmsResolution ||
        !pattern.branchTriple.every((x) => classicalGlyphs.has(branchToHanja[x])) ||
        !pattern.branchClash.every((x) => classicalGlyphs.has(branchToHanja[x]))) {
      throw new Error('Historical quote does not contain the stated branch topology');
    }
  }

  const material = {
    status: 'printed_branch_patterns_attested_natal_only' as const,
    version: ANNUAL_PRINTED_TOPOLOGY_CASEBOOK_VERSION,
    classicalCaseHash: historical.classicalMethodHash,
    threeLayerPrintedEvidenceHash: temporal.evidenceHash,
    patterns: ANNUAL_PRINTED_TOPOLOGY_PATTERNS,
    unresolved: ANNUAL_PRINTED_TOPOLOGY_UNRESOLVED,
    authority: Object.freeze({
      printedBranchGroupsCanBeComparedStructurally: true as const,
      printedOriginalNatalExampleIsCrossTemporalRule: false as const,
      identicalBranchSetMeansSamePillarSlots: false as const,
      printedExampleOutcomePortableToAnnualReading: false as const,
      globalTripleClashWinnerAuthorized: false as const,
      officialReadingAuthorized: false as const,
      productionAuthorized: false as const,
    }),
  };
  return Object.freeze({ ...material, patternEvidenceHash: deterministicContentHash(material) });
}

/** Research-only: classify observable relation topology, never its effect. */
export function auditAnnualPrintedTopologyReproduction(
  snapshot: CanonicalSajuSnapshot,
  request: ReadingRequest,
) {
  const previous = auditAnnualThreeLayerClassicalSourceScope(snapshot, request);
  if (previous.status === 'input_unavailable') return Object.freeze({
    status: 'input_unavailable' as const,
    reasonCode: previous.reasonCode,
    productionAuthorized: false as const,
  });

  const structural = auditAnnualTripleClashSlotOverlap(snapshot, request);
  if (
    previous.status !== 'research_three_layer_scope_attested_priority_hold' ||
    structural.status !== 'research_triple_clash_coexistence_hold' ||
    previous.authority.productionAuthorized ||
    previous.authority.fullySpecifiedTripleClashResolutionAlgorithm ||
    previous.temporalLayerPrecedence !== null ||
    previous.branchTripleClashResolution !== null ||
    structural.authority.globalRulePrecedenceAuthorized ||
    structural.authority.productionAuthorized ||
    previous.observedTripleCandidates !== structural.observedTripleCandidates ||
    previous.observedPairClashes !== structural.observedPairClashes ||
    previous.observedCoexistencePairs !== structural.comparisons.length ||
    structural.pairChecksConsidered !== 9 ||
    structural.tripleChecksConsidered !== 16
  ) throw new Error('Three-layer observation and classical interpretation gates disagree');

  const evidence = buildAnnualPrintedTopologyEvidence();
  const clashes = structural.clashes;
  const observations = structural.comparisons.map((comparison) => {
    const clash = clashes.find((x) => x.pairKey === comparison.clashPairKey);
    if (!clash || !clash.observedOnly ||
        comparison.sharedSlots.length > 1 ||
        comparison.tripleSlots.length !== 3 ||
        clash.slots.length !== 2 ||
        comparison.tripleBranches.length !== 3) {
      throw new Error('Missing or malformed structural clash observation');
    }

    const branchValueAnalogies = evidence.patterns.filter((pattern) =>
      sameBranchMultiset(comparison.tripleBranches, pattern.branchTriple) &&
      sameBranchMultiset(clash.observedBranches, pattern.branchClash));

    const sharedSlotAnalogies = branchValueAnalogies.filter((pattern) => {
      if (comparison.sharedSlots.length !== 1) return false;
      const shared = comparison.sharedSlots[0];
      const tripleIndex = comparison.tripleSlots.indexOf(shared);
      const clashIndex = clash.slots.indexOf(shared);
      return tripleIndex !== -1 && clashIndex !== -1 &&
        comparison.tripleBranches[tripleIndex] === pattern.sharedBranch &&
        clash.observedBranches[clashIndex] === pattern.sharedBranch;
    });

    if (sharedSlotAnalogies.length > 1) {
      throw new Error('Classical witness topology unexpectedly ambiguous');
    }
    const matched = sharedSlotAnalogies[0] ?? null;
    const classification = matched
      ? 'same_branch_values_and_shared_slot_analogy_only' as const
      : branchValueAnalogies.length > 0
        ? 'same_branch_values_but_different_pillar_slots' as const
        : 'no_printed_case_with_identical_branch_values' as const;

    return Object.freeze({
      tripleSlots: Object.freeze([...comparison.tripleSlots]),
      tripleScope: comparison.tripleScope,
      tripleBranches: Object.freeze([...comparison.tripleBranches]),
      clashPairKey: comparison.clashPairKey,
      clashSlots: Object.freeze([...clash.slots]),
      clashBranches: Object.freeze([...clash.observedBranches]),
      sharedSlots: Object.freeze([...comparison.sharedSlots]),
      slotIntersection: comparison.slotIntersection,
      classification,
      printedClauseIdForSameSlotAnalogy: matched?.clauseId ?? null,
      relatedPrintedClauseIdsForBranchValues: Object.freeze(
        branchValueAnalogies.map((x) => x.clauseId)),
      classicalRuleTransportedToTemporalLayers: false as const,
      actualClashCancelled: null,
      appliedBranchTripleTransformation: null,
      competingRuleWinner: null,
      lifeEventOrSeverity: null,
    });
  });

  const counts = {
    sameSlotPrintedAnalogies: observations.filter((x) =>
      x.classification === 'same_branch_values_and_shared_slot_analogy_only').length,
    disjointSlotValueLookalikes: observations.filter((x) =>
      x.classification === 'same_branch_values_but_different_pillar_slots').length,
    withoutIdenticalPrintedBranchValues: observations.filter((x) =>
      x.classification === 'no_printed_case_with_identical_branch_values').length,
  };
  if (
    Object.values(counts).reduce((sum, value) => sum + value, 0) !== observations.length ||
    observations.some((x) =>
      x.actualClashCancelled !== null ||
      x.competingRuleWinner !== null ||
      x.classicalRuleTransportedToTemporalLayers)
  ) throw new Error('Classical analogy count or fail-closed status changed');

  const material = {
    status: 'research_printed_topology_analogies_only_hold' as const,
    version: ANNUAL_PRINTED_TOPOLOGY_CASEBOOK_VERSION,
    parentThreeLayerAuditHash: previous.auditHash,
    originalStructuralOverlapHash: structural.auditHash,
    printedPatternEvidenceHash: evidence.patternEvidenceHash,
    pairChecksConsidered: 9 as const,
    tripleChecksConsidered: 16 as const,
    observedTripleCandidates: structural.observedTripleCandidates,
    observedPairClashes: structural.observedPairClashes,
    observations: Object.freeze(observations),
    counts: Object.freeze(counts),
    classicalRuleAppliedCount: 0 as const,
    selectedRulePriority: null,
    calculatedModernOutcome: null,
    authority: evidence.authority,
  };
  return Object.freeze({ ...material, auditHash: deterministicContentHash(material) });
}
