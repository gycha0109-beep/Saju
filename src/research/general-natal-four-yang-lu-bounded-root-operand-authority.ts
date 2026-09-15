import { createHash } from 'node:crypto';
import {
  GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_AUTHORITY,
  GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_DEFINITION_HASH,
  GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_PROPOSITIONS,
} from './general-natal-bounded-root-comparison-observations.js';
import {
  GENERAL_NATAL_FOUR_YANG_LU_HEAVY_ROOT_AUTHORITY,
  GENERAL_NATAL_FOUR_YANG_LU_HEAVY_ROOT_DEFINITION_HASH,
  type FourYangLuHeavyRootEvaluation,
} from './general-natal-four-yang-lu-heavy-root-authority.js';

export const GENERAL_NATAL_FOUR_YANG_LU_BOUNDED_OPERAND_VERSION =
  '0.1.0-research' as const;
export const GENERAL_NATAL_FOUR_YANG_LU_BOUNDED_OPERAND_SCOPE =
  'four_non_earth_yang_lu_to_bounded_lu_root_comparison_operand_binding' as const;
export const GENERAL_NATAL_FOUR_YANG_LU_BOUNDED_OPERAND_DECISION =
  'AUTHORIZED_RESEARCH_ONLY' as const;

export const GENERAL_NATAL_FOUR_YANG_LU_BOUNDED_OPERAND_SOURCE = Object.freeze({
  title: '子平真詮 / 子平真詮評註',
  section: '論十干得時不旺失時不弱',
  urls: Object.freeze([
    'https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm',
    'https://ctext.org/wiki.pl?chapter=974137&if=en',
  ]),
  accessedAt: '2026-09-15',
  sourceType: 'classical_transcription_with_commentary_and_parallel_transcription',
});

export const GENERAL_NATAL_FOUR_YANG_LU_BOUNDED_OPERAND_SOURCE_OBSERVATIONS = Object.freeze([
  Object.freeze({
    id: 'lu_heavy_root_semantic',
    observation: '長生祿旺，根之重者也',
    authority: 'direct_selected_source_semantic' as const,
  }),
  Object.freeze({
    id: 'bounded_changsheng_lu_ren_comparison',
    observation: '得三比肩，不如得一長生祿刃',
    authority: 'direct_selected_source_bounded_comparison' as const,
  }),
] as const);

export const GENERAL_NATAL_FOUR_YANG_LU_BOUNDED_OPERAND_BINDING = Object.freeze({
  propositionId: 'three_peers_less_than_one_applicable_changsheng_lu_ren_root' as const,
  operandKind: 'applicable_changsheng_lu_ren_root' as const,
  constituent: 'lu' as const,
  observedInUpstreamRegistry: GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_PROPOSITIONS.some(
    (proposition) =>
      proposition.id === 'three_peers_less_than_one_applicable_changsheng_lu_ren_root' &&
      proposition.right.kind === 'applicable_changsheng_lu_ren_root',
  ),
});

export type FourYangLuBoundedOperandState =
  | 'applicable_bounded_lu_root_operand'
  | 'not_applicable_bounded_lu_root_operand'
  | 'outside_governed_lu_scope';

export interface FourYangLuBoundedOperandEvaluation {
  readonly stem: FourYangLuHeavyRootEvaluation['stem'];
  readonly branch: FourYangLuHeavyRootEvaluation['branch'];
  readonly upstreamLuHeavyRootState: FourYangLuHeavyRootEvaluation['heavyRootState'];
  readonly state: FourYangLuBoundedOperandState;
  readonly boundedOperandKind:
    | typeof GENERAL_NATAL_FOUR_YANG_LU_BOUNDED_OPERAND_BINDING.operandKind
    | null;
  readonly authority: 'research_only';
}

export function bindFourYangLuHeavyRootToBoundedOperand(
  evaluation: FourYangLuHeavyRootEvaluation,
): FourYangLuBoundedOperandEvaluation {
  if (evaluation.heavyRootState === 'lu_heavy_root_established') {
    return Object.freeze({
      stem: evaluation.stem,
      branch: evaluation.branch,
      upstreamLuHeavyRootState: evaluation.heavyRootState,
      state: 'applicable_bounded_lu_root_operand',
      boundedOperandKind: GENERAL_NATAL_FOUR_YANG_LU_BOUNDED_OPERAND_BINDING.operandKind,
      authority: 'research_only',
    });
  }

  if (evaluation.heavyRootState === 'outside_governed_yang_non_earth_scope') {
    return Object.freeze({
      stem: evaluation.stem,
      branch: evaluation.branch,
      upstreamLuHeavyRootState: evaluation.heavyRootState,
      state: 'outside_governed_lu_scope',
      boundedOperandKind: null,
      authority: 'research_only',
    });
  }

  return Object.freeze({
    stem: evaluation.stem,
    branch: evaluation.branch,
    upstreamLuHeavyRootState: evaluation.heavyRootState,
    state: 'not_applicable_bounded_lu_root_operand',
    boundedOperandKind: null,
    authority: 'research_only',
  });
}

export const GENERAL_NATAL_FOUR_YANG_LU_BOUNDED_OPERAND_UNAUTHORIZED_DERIVATIONS = Object.freeze([
  'yin_stem_lu_to_bounded_lu_operand',
  'earth_stem_lu_to_bounded_lu_operand',
  'earth_lu_attachment_selection',
  'local_lu_stem_branch_rediscovery',
  'mingli_tanyuan_linguan_stage_to_selected_source_lu',
  'foreign_twelve_growth_mapping_to_lu',
  'hidden_stem_order_to_lu_or_root_class',
  'bounded_lu_operand_to_three_peer_chart_comparison_result',
  'bounded_lu_operand_to_peer_count_evaluator',
  'bounded_lu_operand_to_transitive_root_ranking',
  'bounded_lu_operand_to_global_root_ranking',
  'bounded_lu_operand_to_numeric_weight',
  'bounded_lu_operand_to_linear_weight_scale',
  'bounded_lu_operand_to_ordinary_strength',
  'bounded_lu_operand_to_generalized_root_weight_classifier',
  'bounded_lu_operand_to_geju_candidate',
  'bounded_lu_operand_to_geju_establishment',
  'bounded_lu_operand_to_production_fact',
] as const);

export const GENERAL_NATAL_FOUR_YANG_LU_BOUNDED_OPERAND_DEFINITION_HASH = createHash('sha256')
  .update(
    JSON.stringify({
      version: GENERAL_NATAL_FOUR_YANG_LU_BOUNDED_OPERAND_VERSION,
      scope: GENERAL_NATAL_FOUR_YANG_LU_BOUNDED_OPERAND_SCOPE,
      decision: GENERAL_NATAL_FOUR_YANG_LU_BOUNDED_OPERAND_DECISION,
      source: GENERAL_NATAL_FOUR_YANG_LU_BOUNDED_OPERAND_SOURCE,
      sourceObservations: GENERAL_NATAL_FOUR_YANG_LU_BOUNDED_OPERAND_SOURCE_OBSERVATIONS,
      operandBinding: GENERAL_NATAL_FOUR_YANG_LU_BOUNDED_OPERAND_BINDING,
      upstreamBoundedComparisonVersion: GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_AUTHORITY.version,
      upstreamBoundedComparisonDefinitionHash:
        GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_DEFINITION_HASH,
      upstreamFourYangLuVersion: GENERAL_NATAL_FOUR_YANG_LU_HEAVY_ROOT_AUTHORITY.version,
      upstreamFourYangLuDefinitionHash:
        GENERAL_NATAL_FOUR_YANG_LU_HEAVY_ROOT_DEFINITION_HASH,
      upstreamLuEvaluationConsumed: true,
      rawChartFactsConsumed: false,
      localLuRediscoveryAuthorized: false,
      foreignTwelveGrowthMappingConsumed: false,
      hiddenStemDataConsumed: false,
      peerStemCountConsumed: false,
      chartLevelRootComparisonEvaluatorAuthorized: false,
      unauthorizedDerivations: GENERAL_NATAL_FOUR_YANG_LU_BOUNDED_OPERAND_UNAUTHORIZED_DERIVATIONS,
    }),
  )
  .digest('hex');

export const GENERAL_NATAL_FOUR_YANG_LU_BOUNDED_OPERAND_AUTHORITY = Object.freeze({
  version: GENERAL_NATAL_FOUR_YANG_LU_BOUNDED_OPERAND_VERSION,
  definitionHash: GENERAL_NATAL_FOUR_YANG_LU_BOUNDED_OPERAND_DEFINITION_HASH,
  decision: GENERAL_NATAL_FOUR_YANG_LU_BOUNDED_OPERAND_DECISION,
  upstreamBoundedComparisonVersion: GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_AUTHORITY.version,
  upstreamBoundedComparisonDefinitionHash: GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_DEFINITION_HASH,
  upstreamFourYangLuVersion: GENERAL_NATAL_FOUR_YANG_LU_HEAVY_ROOT_AUTHORITY.version,
  upstreamFourYangLuDefinitionHash: GENERAL_NATAL_FOUR_YANG_LU_HEAVY_ROOT_DEFINITION_HASH,
  directSourceThreePeersLessThanChangshengLuRenObserved:
    GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_AUTHORITY.directSourceBoundedRelativeComparisonsObserved,
  directSourceLuHeavyRootSemanticObserved:
    GENERAL_NATAL_FOUR_YANG_LU_HEAVY_ROOT_AUTHORITY.directSourceLuHeavyRootSemanticObserved,
  upstreamBoundedComparisonOperandAvailableObservationOnly:
    GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_AUTHORITY
      .boundedComparisonPropositionRegistryAuthorizedObservationOnly,
  upstreamFourYangLuEvaluatorAvailableResearchOnly:
    GENERAL_NATAL_FOUR_YANG_LU_HEAVY_ROOT_AUTHORITY
      .fourNonEarthYangStemLuMatcherAuthorizedResearchOnly,
  upstreamOperandBindingObserved:
    GENERAL_NATAL_FOUR_YANG_LU_BOUNDED_OPERAND_BINDING.observedInUpstreamRegistry,
  fourGovernedYangLuToBoundedOperandAuthorizedResearchOnly: true,
  yinStemLuToBoundedOperandAuthorized: false,
  earthStemLuToBoundedOperandAuthorized: false,
  sourceInternalYinLuInterpretation:
    GENERAL_NATAL_FOUR_YANG_LU_HEAVY_ROOT_AUTHORITY.sourceInternalYinLuInterpretation,
  sourceInternalYinLuAmbiguityPreserved: true,
  upstreamLuEvaluationConsumed: true,
  rawChartFactsConsumed: false,
  localLuRediscoveryAuthorized: false,
  foreignTwelveGrowthMappingConsumed: false,
  hiddenStemDataConsumed: false,
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
  unauthorizedDerivations: GENERAL_NATAL_FOUR_YANG_LU_BOUNDED_OPERAND_UNAUTHORIZED_DERIVATIONS,
  authorityBoundary:
    'The selected source directly places 祿 inside both the heavy-root sentence 長生祿旺，根之重者也 and the bounded comparison operand 長生祿刃. This artifact therefore admits only an already-established #590 four-non-Earth-Yang Lu evaluation as the 祿 constituent of #566\'s observation-only bounded operand. It does not rediscover Lu from raw stem/branch facts, resolve Yin-Lu ambiguity, select an Earth Lu attachment route, consume #548 Twelve-Growth cells or hidden stems, consume peer counts, execute the three-peer comparison, rank or weight roots, derive ordinary strength or Gyeokguk, or emit production facts.',
});
