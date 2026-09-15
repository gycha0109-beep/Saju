import { createHash } from 'node:crypto';
import {
  GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_AUTHORITY,
  GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_DEFINITION_HASH,
  GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_PROPOSITIONS,
} from './general-natal-bounded-root-comparison-observations.js';
import {
  GENERAL_NATAL_MUKU_YUQI_LIGHT_ROOT_AUTHORITY,
  GENERAL_NATAL_MUKU_YUQI_LIGHT_ROOT_DEFINITION_HASH,
  type MukuYuqiLightRootEvaluation,
} from './general-natal-muku-yuqi-light-root-authority.js';

export const GENERAL_NATAL_MUKU_YUQI_BOUNDED_OPERAND_VERSION = '0.1.0-research' as const;
export const GENERAL_NATAL_MUKU_YUQI_BOUNDED_OPERAND_SCOPE =
  'governed_muku_yuqi_light_root_to_bounded_comparison_operand_binding' as const;
export const GENERAL_NATAL_MUKU_YUQI_BOUNDED_OPERAND_DECISION =
  'AUTHORIZED_RESEARCH_ONLY' as const;

export const GENERAL_NATAL_MUKU_YUQI_BOUNDED_OPERAND_SOURCE = Object.freeze({
  title: '子平真詮 / 子平真詮評註',
  section: '論十干得時不旺失時不弱',
  url: 'https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm',
  accessedAt: '2026-09-15',
  sourceType: 'classical_transcription_with_commentary',
});

export const GENERAL_NATAL_MUKU_YUQI_BOUNDED_OPERAND_SOURCE_OBSERVATIONS = Object.freeze([
  Object.freeze({
    id: 'muku_yuqi_light_root_semantic',
    observation: '墓庫餘氣，根之輕者也',
    authority: 'direct_selected_source_semantic' as const,
  }),
  Object.freeze({
    id: 'bounded_muku_comparison',
    observation: '得一比肩，不如得支中一墓庫',
    authority: 'direct_selected_source_bounded_comparison' as const,
  }),
  Object.freeze({
    id: 'bounded_yuqi_comparison',
    observation: '得二比肩，不如得一餘氣',
    authority: 'direct_selected_source_bounded_comparison' as const,
  }),
] as const);

export const GENERAL_NATAL_MUKU_YUQI_BOUNDED_OPERAND_BINDINGS = Object.freeze({
  muku: Object.freeze({
    propositionId: 'one_peer_less_than_one_applicable_muku' as const,
    operandKind: 'applicable_muku_root' as const,
    constituent: 'muku' as const,
    observedInUpstreamRegistry: GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_PROPOSITIONS.some(
      (proposition) =>
        proposition.id === 'one_peer_less_than_one_applicable_muku' &&
        proposition.right.kind === 'applicable_muku_root',
    ),
  }),
  yuqi: Object.freeze({
    propositionId: 'two_peers_less_than_one_applicable_yuqi' as const,
    operandKind: 'applicable_yuqi_root' as const,
    constituent: 'yuqi' as const,
    observedInUpstreamRegistry: GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_PROPOSITIONS.some(
      (proposition) =>
        proposition.id === 'two_peers_less_than_one_applicable_yuqi' &&
        proposition.right.kind === 'applicable_yuqi_root',
    ),
  }),
});

export type MukuYuqiBoundedOperandState =
  | 'applicable_bounded_muku_root_operand'
  | 'applicable_bounded_yuqi_root_operand'
  | 'not_applicable_bounded_light_root_operand'
  | 'earth_boundary_unresolved';

export type MukuYuqiBoundedOperandKind =
  | typeof GENERAL_NATAL_MUKU_YUQI_BOUNDED_OPERAND_BINDINGS.muku.operandKind
  | typeof GENERAL_NATAL_MUKU_YUQI_BOUNDED_OPERAND_BINDINGS.yuqi.operandKind;

export interface MukuYuqiBoundedOperandEvaluation {
  readonly element: MukuYuqiLightRootEvaluation['element'];
  readonly branch: MukuYuqiLightRootEvaluation['branch'];
  readonly upstreamLightRootState: MukuYuqiLightRootEvaluation['lightRootState'];
  readonly state: MukuYuqiBoundedOperandState;
  readonly boundedOperandKind: MukuYuqiBoundedOperandKind | null;
  readonly authority: 'research_only';
}

export function bindMukuYuqiLightRootToBoundedOperand(
  evaluation: MukuYuqiLightRootEvaluation,
): MukuYuqiBoundedOperandEvaluation {
  if (evaluation.lightRootState === 'muku_light_root_established') {
    return Object.freeze({
      element: evaluation.element,
      branch: evaluation.branch,
      upstreamLightRootState: evaluation.lightRootState,
      state: 'applicable_bounded_muku_root_operand',
      boundedOperandKind: GENERAL_NATAL_MUKU_YUQI_BOUNDED_OPERAND_BINDINGS.muku.operandKind,
      authority: 'research_only',
    });
  }

  if (evaluation.lightRootState === 'yuqi_light_root_established') {
    return Object.freeze({
      element: evaluation.element,
      branch: evaluation.branch,
      upstreamLightRootState: evaluation.lightRootState,
      state: 'applicable_bounded_yuqi_root_operand',
      boundedOperandKind: GENERAL_NATAL_MUKU_YUQI_BOUNDED_OPERAND_BINDINGS.yuqi.operandKind,
      authority: 'research_only',
    });
  }

  if (evaluation.lightRootState === 'earth_boundary_unresolved') {
    return Object.freeze({
      element: evaluation.element,
      branch: evaluation.branch,
      upstreamLightRootState: evaluation.lightRootState,
      state: 'earth_boundary_unresolved',
      boundedOperandKind: null,
      authority: 'research_only',
    });
  }

  return Object.freeze({
    element: evaluation.element,
    branch: evaluation.branch,
    upstreamLightRootState: evaluation.lightRootState,
    state: 'not_applicable_bounded_light_root_operand',
    boundedOperandKind: null,
    authority: 'research_only',
  });
}

export const GENERAL_NATAL_MUKU_YUQI_BOUNDED_OPERAND_UNAUTHORIZED_DERIVATIONS = Object.freeze([
  'raw_stem_branch_to_local_muku_yuqi_rediscovery',
  'hidden_stem_array_order_as_yuqi',
  'hidden_stem_membership_as_root_class',
  'twelve_growth_mu_as_muku',
  'earth_yuqi_mapping_invention',
  'earth_boundary_as_no_root',
  'bounded_muku_operand_to_one_peer_chart_comparison_result',
  'bounded_yuqi_operand_to_two_peer_chart_comparison_result',
  'bounded_light_root_operand_to_peer_count_evaluator',
  'bounded_light_root_operand_to_transitive_root_ranking',
  'bounded_light_root_operand_to_global_root_ranking',
  'bounded_light_root_operand_to_numeric_weight',
  'bounded_light_root_operand_to_linear_weight_scale',
  'bounded_light_root_operand_to_ordinary_strength',
  'bounded_light_root_operand_to_generalized_root_weight_classifier',
  'bounded_light_root_operand_to_geju_candidate',
  'bounded_light_root_operand_to_geju_establishment',
  'bounded_light_root_operand_to_production_fact',
] as const);

export const GENERAL_NATAL_MUKU_YUQI_BOUNDED_OPERAND_DEFINITION_HASH = createHash('sha256')
  .update(
    JSON.stringify({
      version: GENERAL_NATAL_MUKU_YUQI_BOUNDED_OPERAND_VERSION,
      scope: GENERAL_NATAL_MUKU_YUQI_BOUNDED_OPERAND_SCOPE,
      decision: GENERAL_NATAL_MUKU_YUQI_BOUNDED_OPERAND_DECISION,
      source: GENERAL_NATAL_MUKU_YUQI_BOUNDED_OPERAND_SOURCE,
      sourceObservations: GENERAL_NATAL_MUKU_YUQI_BOUNDED_OPERAND_SOURCE_OBSERVATIONS,
      operandBindings: GENERAL_NATAL_MUKU_YUQI_BOUNDED_OPERAND_BINDINGS,
      upstreamBoundedComparisonVersion: GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_AUTHORITY.version,
      upstreamBoundedComparisonDefinitionHash:
        GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_DEFINITION_HASH,
      upstreamMukuYuqiVersion: GENERAL_NATAL_MUKU_YUQI_LIGHT_ROOT_AUTHORITY.version,
      upstreamMukuYuqiDefinitionHash: GENERAL_NATAL_MUKU_YUQI_LIGHT_ROOT_DEFINITION_HASH,
      upstreamMukuYuqiEvaluationConsumed: true,
      rawChartFactsConsumed: false,
      hiddenStemConsumed: false,
      twelveGrowthMuConsumed: false,
      peerStemCountConsumed: false,
      chartLevelRootComparisonEvaluatorAuthorized: false,
      unauthorizedDerivations: GENERAL_NATAL_MUKU_YUQI_BOUNDED_OPERAND_UNAUTHORIZED_DERIVATIONS,
    }),
  )
  .digest('hex');

export const GENERAL_NATAL_MUKU_YUQI_BOUNDED_OPERAND_AUTHORITY = Object.freeze({
  version: GENERAL_NATAL_MUKU_YUQI_BOUNDED_OPERAND_VERSION,
  definitionHash: GENERAL_NATAL_MUKU_YUQI_BOUNDED_OPERAND_DEFINITION_HASH,
  decision: GENERAL_NATAL_MUKU_YUQI_BOUNDED_OPERAND_DECISION,
  upstreamBoundedComparisonVersion: GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_AUTHORITY.version,
  upstreamBoundedComparisonDefinitionHash: GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_DEFINITION_HASH,
  upstreamMukuYuqiVersion: GENERAL_NATAL_MUKU_YUQI_LIGHT_ROOT_AUTHORITY.version,
  upstreamMukuYuqiDefinitionHash: GENERAL_NATAL_MUKU_YUQI_LIGHT_ROOT_DEFINITION_HASH,
  directSourceOnePeerLessThanMukuObserved:
    GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_AUTHORITY.directSourceBoundedRelativeComparisonsObserved,
  directSourceTwoPeersLessThanYuqiObserved:
    GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_AUTHORITY.directSourceBoundedRelativeComparisonsObserved,
  directSourceMukuYuqiLightRootSemanticObserved:
    GENERAL_NATAL_MUKU_YUQI_LIGHT_ROOT_AUTHORITY.directSourceMukuYuqiLightRootSemanticObserved,
  upstreamBoundedOperandsAvailableObservationOnly:
    GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_AUTHORITY
      .boundedComparisonPropositionRegistryAuthorizedObservationOnly,
  upstreamMukuYuqiEvaluatorAvailableResearchOnly:
    GENERAL_NATAL_MUKU_YUQI_LIGHT_ROOT_AUTHORITY.nonEarthMukuYuqiMatcherAuthorizedResearchOnly,
  upstreamMukuBindingObserved:
    GENERAL_NATAL_MUKU_YUQI_BOUNDED_OPERAND_BINDINGS.muku.observedInUpstreamRegistry,
  upstreamYuqiBindingObserved:
    GENERAL_NATAL_MUKU_YUQI_BOUNDED_OPERAND_BINDINGS.yuqi.observedInUpstreamRegistry,
  governedMukuToBoundedOperandAuthorizedResearchOnly: true,
  governedYuqiToBoundedOperandAuthorizedResearchOnly: true,
  earthYuqiMappingResolved: GENERAL_NATAL_MUKU_YUQI_LIGHT_ROOT_AUTHORITY.earthYuqiMappingResolved,
  upstreamMukuYuqiEvaluationConsumed: true,
  rawChartFactsConsumed: false,
  hiddenStemMembershipConsumed: false,
  hiddenStemArrayOrderConsumed: false,
  twelveGrowthMuConsumed: false,
  peerStemCountConsumed: false,
  chartLevelRootComparisonEvaluatorAuthorized: false,
  transitiveClosureAuthorized: false,
  generalizedGlobalRootRankingAuthorized: false,
  numericRootWeightAuthorized: false,
  linearWeightScaleAuthorized: false,
  generalizedRootWeightClassifierAuthorized: false,
  ordinaryStrengthClassificationAuthorized: false,
  candidateDerivationAuthorized: false,
  establishmentPredicateAuthorized: false,
  candidateFactsEmitted: false,
  establishmentFactsEmitted: false,
  productionFactEmissionAuthorized: false,
  unauthorizedDerivations: GENERAL_NATAL_MUKU_YUQI_BOUNDED_OPERAND_UNAUTHORIZED_DERIVATIONS,
  authorityBoundary:
    'The selected source directly states the bounded 墓庫 and 餘氣 comparisons, while #558 already governs the four non-Earth 墓庫/餘氣 matcher and preserves the unresolved Earth boundary. This artifact therefore binds only an already-governed #558 evaluation to the corresponding #568 observation-only right operand. It does not rediscover raw stem/branch mappings, consume hidden-stem data or 十二長生 墓, resolve 土 餘氣, consume peer counts, execute either comparison, rank roots, assign weight, derive ordinary strength or Gyeokguk, or emit production facts.',
});
