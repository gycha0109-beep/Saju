import { createHash } from 'node:crypto';
import {
  GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_AUTHORITY,
  GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_DEFINITION_HASH,
  GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_PROPOSITIONS,
} from './general-natal-bounded-root-comparison-observations.js';
import {
  GENERAL_NATAL_CHANGSHENG_ROOT_WEIGHT_BINDING_AUTHORITY,
  GENERAL_NATAL_CHANGSHENG_ROOT_WEIGHT_BINDING_DEFINITION_HASH,
  type ChangshengHeavyRootClauseEvaluation,
} from './general-natal-changsheng-root-weight-binding-authority.js';

export const GENERAL_NATAL_CHANGSHENG_BOUNDED_OPERAND_VERSION = '0.1.0-research' as const;
export const GENERAL_NATAL_CHANGSHENG_BOUNDED_OPERAND_SCOPE =
  'yang_changsheng_to_bounded_changsheng_root_comparison_operand_binding' as const;
export const GENERAL_NATAL_CHANGSHENG_BOUNDED_OPERAND_DECISION =
  'AUTHORIZED_RESEARCH_ONLY' as const;

export const GENERAL_NATAL_CHANGSHENG_BOUNDED_OPERAND_SOURCE = Object.freeze({
  title: '子平真詮 / 子平真詮評註',
  section: '論十干得時不旺失時不弱',
  urls: Object.freeze([
    'https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm',
    'https://ctext.org/wiki.pl?chapter=974137&if=en',
  ]),
  accessedAt: '2026-09-15',
  sourceType: 'classical_transcription_with_commentary_and_parallel_transcription',
});

export const GENERAL_NATAL_CHANGSHENG_BOUNDED_OPERAND_SOURCE_OBSERVATIONS = Object.freeze([
  Object.freeze({
    id: 'changsheng_heavy_root_semantic',
    observation: '長生祿旺，根之重者也',
    authority: 'direct_selected_source_semantic' as const,
  }),
  Object.freeze({
    id: 'bounded_changsheng_lu_ren_comparison',
    observation: '得三比肩，不如得一長生祿刃',
    authority: 'direct_selected_source_bounded_comparison' as const,
  }),
  Object.freeze({
    id: 'yin_changsheng_exception',
    observation: '陰長生不作此論，如乙逢午、丁逢酉之類，然亦為明根，比得一餘氣',
    authority: 'direct_selected_source_exception' as const,
  }),
] as const);

export const GENERAL_NATAL_CHANGSHENG_BOUNDED_OPERAND_BINDING = Object.freeze({
  propositionId: 'three_peers_less_than_one_applicable_changsheng_lu_ren_root' as const,
  operandKind: 'applicable_changsheng_lu_ren_root' as const,
  constituent: 'changsheng' as const,
  observedInUpstreamRegistry: GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_PROPOSITIONS.some(
    (proposition) =>
      proposition.id === 'three_peers_less_than_one_applicable_changsheng_lu_ren_root' &&
      proposition.right.kind === 'applicable_changsheng_lu_ren_root',
  ),
});

export type ChangshengBoundedOperandState =
  | 'applicable_bounded_changsheng_root_operand'
  | 'not_applicable_bounded_changsheng_root_operand'
  | 'excluded_by_yin_changsheng_exception';

export interface ChangshengBoundedOperandEvaluation {
  readonly stem: ChangshengHeavyRootClauseEvaluation['stem'];
  readonly yinYang: ChangshengHeavyRootClauseEvaluation['yinYang'];
  readonly branch: ChangshengHeavyRootClauseEvaluation['branch'];
  readonly stage: ChangshengHeavyRootClauseEvaluation['stage'];
  readonly upstreamChangshengState:
    ChangshengHeavyRootClauseEvaluation['heavyRootByChangshengClause'];
  readonly state: ChangshengBoundedOperandState;
  readonly boundedOperandKind:
    | typeof GENERAL_NATAL_CHANGSHENG_BOUNDED_OPERAND_BINDING.operandKind
    | null;
  readonly authority: 'research_only';
}

export function bindChangshengHeavyRootToBoundedOperand(
  evaluation: ChangshengHeavyRootClauseEvaluation,
): ChangshengBoundedOperandEvaluation {
  if (evaluation.heavyRootByChangshengClause === 'established') {
    return Object.freeze({
      stem: evaluation.stem,
      yinYang: evaluation.yinYang,
      branch: evaluation.branch,
      stage: evaluation.stage,
      upstreamChangshengState: evaluation.heavyRootByChangshengClause,
      state: 'applicable_bounded_changsheng_root_operand',
      boundedOperandKind: GENERAL_NATAL_CHANGSHENG_BOUNDED_OPERAND_BINDING.operandKind,
      authority: 'research_only',
    });
  }

  if (evaluation.heavyRootByChangshengClause === 'excluded_by_yin_exception') {
    return Object.freeze({
      stem: evaluation.stem,
      yinYang: evaluation.yinYang,
      branch: evaluation.branch,
      stage: evaluation.stage,
      upstreamChangshengState: evaluation.heavyRootByChangshengClause,
      state: 'excluded_by_yin_changsheng_exception',
      boundedOperandKind: null,
      authority: 'research_only',
    });
  }

  return Object.freeze({
    stem: evaluation.stem,
    yinYang: evaluation.yinYang,
    branch: evaluation.branch,
    stage: evaluation.stage,
    upstreamChangshengState: evaluation.heavyRootByChangshengClause,
    state: 'not_applicable_bounded_changsheng_root_operand',
    boundedOperandKind: null,
    authority: 'research_only',
  });
}

export const GENERAL_NATAL_CHANGSHENG_BOUNDED_OPERAND_UNAUTHORIZED_DERIVATIONS = Object.freeze([
  'yin_changsheng_to_bounded_changsheng_operand',
  'yin_changsheng_to_light_root',
  'yin_changsheng_to_no_root',
  'yin_changsheng_to_yuqi',
  'local_twelve_growth_stage_rediscovery',
  'bounded_changsheng_operand_to_three_peer_chart_comparison_result',
  'bounded_changsheng_operand_to_peer_count_evaluator',
  'bounded_changsheng_operand_to_transitive_root_ranking',
  'bounded_changsheng_operand_to_global_root_ranking',
  'bounded_changsheng_operand_to_numeric_weight',
  'bounded_changsheng_operand_to_linear_weight_scale',
  'bounded_changsheng_operand_to_ordinary_strength',
  'bounded_changsheng_operand_to_generalized_root_weight_classifier',
  'bounded_changsheng_operand_to_geju_candidate',
  'bounded_changsheng_operand_to_geju_establishment',
  'bounded_changsheng_operand_to_production_fact',
] as const);

export const GENERAL_NATAL_CHANGSHENG_BOUNDED_OPERAND_DEFINITION_HASH = createHash('sha256')
  .update(
    JSON.stringify({
      version: GENERAL_NATAL_CHANGSHENG_BOUNDED_OPERAND_VERSION,
      scope: GENERAL_NATAL_CHANGSHENG_BOUNDED_OPERAND_SCOPE,
      decision: GENERAL_NATAL_CHANGSHENG_BOUNDED_OPERAND_DECISION,
      source: GENERAL_NATAL_CHANGSHENG_BOUNDED_OPERAND_SOURCE,
      sourceObservations: GENERAL_NATAL_CHANGSHENG_BOUNDED_OPERAND_SOURCE_OBSERVATIONS,
      operandBinding: GENERAL_NATAL_CHANGSHENG_BOUNDED_OPERAND_BINDING,
      upstreamBoundedComparisonVersion: GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_AUTHORITY.version,
      upstreamBoundedComparisonDefinitionHash:
        GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_DEFINITION_HASH,
      upstreamChangshengVersion: GENERAL_NATAL_CHANGSHENG_ROOT_WEIGHT_BINDING_AUTHORITY.version,
      upstreamChangshengDefinitionHash:
        GENERAL_NATAL_CHANGSHENG_ROOT_WEIGHT_BINDING_DEFINITION_HASH,
      upstreamChangshengEvaluationConsumed: true,
      rawChartFactsConsumed: false,
      localTwelveGrowthRediscoveryAuthorized: false,
      peerStemCountConsumed: false,
      chartLevelRootComparisonEvaluatorAuthorized: false,
      unauthorizedDerivations: GENERAL_NATAL_CHANGSHENG_BOUNDED_OPERAND_UNAUTHORIZED_DERIVATIONS,
    }),
  )
  .digest('hex');

export const GENERAL_NATAL_CHANGSHENG_BOUNDED_OPERAND_AUTHORITY = Object.freeze({
  version: GENERAL_NATAL_CHANGSHENG_BOUNDED_OPERAND_VERSION,
  definitionHash: GENERAL_NATAL_CHANGSHENG_BOUNDED_OPERAND_DEFINITION_HASH,
  decision: GENERAL_NATAL_CHANGSHENG_BOUNDED_OPERAND_DECISION,
  upstreamBoundedComparisonVersion: GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_AUTHORITY.version,
  upstreamBoundedComparisonDefinitionHash: GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_DEFINITION_HASH,
  upstreamChangshengVersion: GENERAL_NATAL_CHANGSHENG_ROOT_WEIGHT_BINDING_AUTHORITY.version,
  upstreamChangshengDefinitionHash: GENERAL_NATAL_CHANGSHENG_ROOT_WEIGHT_BINDING_DEFINITION_HASH,
  directSourceThreePeersLessThanChangshengLuRenObserved:
    GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_AUTHORITY.directSourceBoundedRelativeComparisonsObserved,
  directSourceChangshengHeavyRootSemanticObserved:
    GENERAL_NATAL_CHANGSHENG_ROOT_WEIGHT_BINDING_AUTHORITY
      .directSourceChangshengHeavyRootSemanticObserved,
  directSourceYinChangshengExceptionObserved:
    GENERAL_NATAL_CHANGSHENG_ROOT_WEIGHT_BINDING_AUTHORITY.directSourceYinChangshengExceptionObserved,
  upstreamBoundedComparisonOperandAvailableObservationOnly:
    GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_AUTHORITY
      .boundedComparisonPropositionRegistryAuthorizedObservationOnly,
  upstreamChangshengEvaluatorAvailableResearchOnly:
    GENERAL_NATAL_CHANGSHENG_ROOT_WEIGHT_BINDING_AUTHORITY
      .yangChangshengHeavyRootPredicateAuthorizedResearchOnly,
  upstreamOperandBindingObserved: GENERAL_NATAL_CHANGSHENG_BOUNDED_OPERAND_BINDING.observedInUpstreamRegistry,
  yangChangshengToBoundedOperandAuthorizedResearchOnly: true,
  yinChangshengToBoundedOperandAuthorized: false,
  upstreamChangshengEvaluationConsumed: true,
  rawChartFactsConsumed: false,
  localTwelveGrowthRediscoveryAuthorized: false,
  twelveGrowthStageMappingConsumedDirectly: false,
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
  unauthorizedDerivations: GENERAL_NATAL_CHANGSHENG_BOUNDED_OPERAND_UNAUTHORIZED_DERIVATIONS,
  authorityBoundary:
    'The selected source directly places 長生 inside the bounded comparison operand 長生祿刃, while #551 already governs the same source\'s 長生 heavy-root clause and the explicit 陰長生不作此論 exclusion. This artifact therefore admits only an already-established #551 Yang-Changsheng evaluation as the 長生 constituent of #566\'s observation-only bounded operand. It does not rediscover Twelve-Growth stages, admit Yin Changsheng, consume peer counts, execute the three-peer comparison, rank roots, assign weight, derive ordinary strength or Gyeokguk, or emit production facts.',
});
