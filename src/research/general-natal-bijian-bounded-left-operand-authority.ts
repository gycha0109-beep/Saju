import { createHash } from 'node:crypto';
import type { FactState } from '../contracts/common.js';
import type { TenGodChartFact } from '../contracts/calculation.js';
import {
  GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_AUTHORITY,
  GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_DEFINITION_HASH,
  GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_PROPOSITIONS,
} from './general-natal-bounded-root-comparison-observations.js';
import { GENERAL_NATAL_GEJU_SOURCE_EXAMPLE_CANONICAL_INPUT_BINDING_REVIEW } from './general-natal-geju-source-example-canonical-input-binding-review.js';

export const GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_VERSION = '0.1.0-research' as const;
export const GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_SCOPE =
  'resolved_visible_bijian_stem_count_to_bounded_comparison_left_operand_binding' as const;
export const GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_DECISION =
  'AUTHORIZED_RESEARCH_ONLY' as const;

export const GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_SOURCE = Object.freeze({
  title: '子平真詮 / 子平真詮評註',
  section: '論十干得時不旺失時不弱',
  url: 'https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm',
  accessedAt: '2026-09-15',
  sourceType: 'classical_transcription_with_commentary',
});

export const GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_SOURCE_OBSERVATIONS = Object.freeze([
  Object.freeze({
    id: 'one_bijian_bounded_comparison',
    observation: '得一比肩，不如得支中一墓庫',
    authority: 'direct_selected_source_bounded_comparison' as const,
  }),
  Object.freeze({
    id: 'two_bijian_bounded_comparison',
    observation: '得二比肩，不如得一餘氣',
    authority: 'direct_selected_source_bounded_comparison' as const,
  }),
  Object.freeze({
    id: 'three_bijian_bounded_comparison',
    observation: '得三比肩，不如得一長生祿刃',
    authority: 'direct_selected_source_bounded_comparison' as const,
  }),
  Object.freeze({
    id: 'visible_stem_context',
    observation: '干多不如根重',
    authority: 'direct_selected_source_context' as const,
  }),
] as const);

export const GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_BINDINGS = Object.freeze({
  one: Object.freeze({
    propositionId: 'one_peer_less_than_one_applicable_muku' as const,
    count: 1 as const,
    observedInUpstreamRegistry: GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_PROPOSITIONS.some(
      (proposition) =>
        proposition.id === 'one_peer_less_than_one_applicable_muku' &&
        proposition.left.kind === 'peer_stem_count' &&
        proposition.left.count === 1,
    ),
  }),
  two: Object.freeze({
    propositionId: 'two_peers_less_than_one_applicable_yuqi' as const,
    count: 2 as const,
    observedInUpstreamRegistry: GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_PROPOSITIONS.some(
      (proposition) =>
        proposition.id === 'two_peers_less_than_one_applicable_yuqi' &&
        proposition.left.kind === 'peer_stem_count' &&
        proposition.left.count === 2,
    ),
  }),
  three: Object.freeze({
    propositionId: 'three_peers_less_than_one_applicable_changsheng_lu_ren_root' as const,
    count: 3 as const,
    observedInUpstreamRegistry: GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_PROPOSITIONS.some(
      (proposition) =>
        proposition.id === 'three_peers_less_than_one_applicable_changsheng_lu_ren_root' &&
        proposition.left.kind === 'peer_stem_count' &&
        proposition.left.count === 3,
    ),
  }),
});

export type BoundedBijianPeerCount = 1 | 2 | 3;
export type BijianBoundedLeftOperandState =
  | 'bounded_peer_stem_count_established'
  | 'no_bounded_peer_stem_operand'
  | 'ten_god_chart_unresolved'
  | 'visible_stem_facts_not_fully_resolved'
  | 'day_stem_semantic_mismatch';

export interface BijianBoundedLeftOperand {
  readonly kind: 'peer_stem_count';
  readonly count: BoundedBijianPeerCount;
}

export interface BijianBoundedLeftOperandEvaluation {
  readonly state: BijianBoundedLeftOperandState;
  readonly peerStemCount: 0 | BoundedBijianPeerCount | null;
  readonly boundedOperand: BijianBoundedLeftOperand | null;
  readonly propositionId:
    | typeof GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_BINDINGS.one.propositionId
    | typeof GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_BINDINGS.two.propositionId
    | typeof GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_BINDINGS.three.propositionId
    | null;
  readonly authority: 'research_only';
}

const VISIBLE_STEM_SLOTS = ['year', 'month', 'day', 'hour'] as const;
const PEER_STEM_SLOTS = ['year', 'month', 'hour'] as const;

function bindingForCount(count: BoundedBijianPeerCount) {
  if (count === 1) return GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_BINDINGS.one;
  if (count === 2) return GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_BINDINGS.two;
  return GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_BINDINGS.three;
}

export function bindVisibleBijianCountToBoundedLeftOperand(
  tenGods: FactState<TenGodChartFact>,
): BijianBoundedLeftOperandEvaluation {
  if (tenGods.status !== 'resolved') {
    return Object.freeze({
      state: 'ten_god_chart_unresolved',
      peerStemCount: null,
      boundedOperand: null,
      propositionId: null,
      authority: 'research_only',
    });
  }

  const stemFacts = VISIBLE_STEM_SLOTS.map((slot) => tenGods.value[slot].stem);
  if (stemFacts.some((fact) => fact === undefined || fact.status !== 'resolved')) {
    return Object.freeze({
      state: 'visible_stem_facts_not_fully_resolved',
      peerStemCount: null,
      boundedOperand: null,
      propositionId: null,
      authority: 'research_only',
    });
  }

  const dayStem = tenGods.value.day.stem;
  if (dayStem === undefined || dayStem.status !== 'resolved' || dayStem.value !== '일간') {
    return Object.freeze({
      state: 'day_stem_semantic_mismatch',
      peerStemCount: null,
      boundedOperand: null,
      propositionId: null,
      authority: 'research_only',
    });
  }

  const peerStemCount = PEER_STEM_SLOTS.filter((slot) => {
    const stem = tenGods.value[slot].stem;
    return stem?.status === 'resolved' && stem.value === '비견';
  }).length as 0 | BoundedBijianPeerCount;

  if (peerStemCount === 0) {
    return Object.freeze({
      state: 'no_bounded_peer_stem_operand',
      peerStemCount,
      boundedOperand: null,
      propositionId: null,
      authority: 'research_only',
    });
  }

  const binding = bindingForCount(peerStemCount);
  return Object.freeze({
    state: 'bounded_peer_stem_count_established',
    peerStemCount,
    boundedOperand: Object.freeze({ kind: 'peer_stem_count', count: peerStemCount }),
    propositionId: binding.propositionId,
    authority: 'research_only',
  });
}

export const GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_UNAUTHORIZED_DERIVATIONS = Object.freeze([
  'peer_count_to_chart_level_comparison_result',
  'peer_count_to_transitive_root_ranking',
  'peer_count_to_global_root_ranking',
  'peer_count_to_numeric_root_weight',
  'peer_count_to_linear_weight_scale',
  'peer_count_to_generalized_non_numeric_weighting_rule',
  'peer_count_to_ordinary_strength',
  'peer_count_to_generalized_root_weight_classifier',
  'hidden_stem_membership_as_visible_peer',
  'hidden_stem_array_order_as_peer_weight',
  'branch_ten_god_as_visible_peer',
  'bijian_jiecai_conflation',
  'day_stem_self_as_peer',
  'unresolved_ten_god_candidate_selection',
  'peer_count_to_geju_candidate',
  'peer_count_to_geju_establishment',
  'peer_count_to_production_fact',
] as const);

export const GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_DEFINITION_HASH = createHash('sha256')
  .update(
    JSON.stringify({
      version: GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_VERSION,
      scope: GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_SCOPE,
      decision: GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_DECISION,
      source: GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_SOURCE,
      sourceObservations: GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_SOURCE_OBSERVATIONS,
      bindings: GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_BINDINGS,
      upstreamBoundedComparisonVersion: GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_AUTHORITY.version,
      upstreamBoundedComparisonDefinitionHash:
        GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_DEFINITION_HASH,
      canonicalTenGodPathGoverned:
        GENERAL_NATAL_GEJU_SOURCE_EXAMPLE_CANONICAL_INPUT_BINDING_REVIEW.governedRawFactPaths.includes(
          'derivedFacts.tenGods',
        ),
      visibleStemSlots: VISIBLE_STEM_SLOTS,
      peerStemSlots: PEER_STEM_SLOTS,
      exactBijianOnly: true,
      branchTenGodConsumed: false,
      hiddenStemConsumed: false,
      chartLevelRootComparisonEvaluatorAuthorized: false,
      unauthorizedDerivations: GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_UNAUTHORIZED_DERIVATIONS,
    }),
  )
  .digest('hex');

export const GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_AUTHORITY = Object.freeze({
  version: GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_VERSION,
  definitionHash: GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_DEFINITION_HASH,
  decision: GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_DECISION,
  upstreamBoundedComparisonVersion: GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_AUTHORITY.version,
  upstreamBoundedComparisonDefinitionHash: GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_DEFINITION_HASH,
  canonicalTenGodPathGoverned:
    GENERAL_NATAL_GEJU_SOURCE_EXAMPLE_CANONICAL_INPUT_BINDING_REVIEW.governedRawFactPaths.includes(
      'derivedFacts.tenGods',
    ),
  directSourceOneBijianObserved: true,
  directSourceTwoBijianObserved: true,
  directSourceThreeBijianObserved: true,
  directSourceVisibleStemContextObserved: true,
  upstreamOnePeerBindingObserved:
    GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_BINDINGS.one.observedInUpstreamRegistry,
  upstreamTwoPeerBindingObserved:
    GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_BINDINGS.two.observedInUpstreamRegistry,
  upstreamThreePeerBindingObserved:
    GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_BINDINGS.three.observedInUpstreamRegistry,
  visibleBijianCountToBoundedLeftOperandAuthorizedResearchOnly: true,
  outerTenGodFactMustResolve: true,
  visibleStemFactsMustResolve: true,
  dayStemSelfExcluded: true,
  exactBijianOnly: true,
  jiecaiCountedAsBijian: false,
  branchTenGodConsumed: false,
  hiddenStemMembershipConsumed: false,
  hiddenStemArrayOrderConsumed: false,
  unresolvedCandidateSelectionAuthorized: false,
  chartLevelRootComparisonEvaluatorAuthorized: false,
  transitiveClosureAuthorized: false,
  generalizedGlobalRootRankingAuthorized: false,
  numericRootWeightAuthorized: false,
  linearWeightScaleAuthorized: false,
  nonNumericWeightingRuleResolved: false,
  generalizedRootWeightClassifierAuthorized: false,
  ordinaryStrengthClassificationAuthorized: false,
  candidateDerivationAuthorized: false,
  establishmentPredicateAuthorized: false,
  candidateFactsEmitted: false,
  establishmentFactsEmitted: false,
  productionFactEmissionAuthorized: false,
  unauthorizedDerivations: GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_UNAUTHORIZED_DERIVATIONS,
  authorityBoundary:
    'The selected source directly states bounded comparisons for one, two, and three 比肩 and frames the comparison in visible-stem terms (干多). The canonical calculation contract already exposes governed derivedFacts.tenGods. This adapter therefore accepts only that canonical FactState, requires the chart and every visible stem Ten-God fact to be resolved, excludes the day stem self marker, counts exact 비견 only among year/month/hour stems, and binds counts one through three to the existing #568 observation-only left operands. It does not inspect branch Ten-Gods or hidden stems, conflate 比肩 with 劫財, select unresolved candidates, execute any comparison, rank or weight roots, derive ordinary strength or Gyeokguk, or emit production facts.',
});
