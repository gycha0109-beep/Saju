import { createHash } from 'node:crypto';
import {
  GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_AUTHORITY,
  GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_DEFINITION_HASH,
  GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_PROPOSITIONS,
} from './general-natal-bounded-root-comparison-observations.js';
import {
  GENERAL_NATAL_YANGREN_MONTH_COMMAND_AUTHORITY,
  GENERAL_NATAL_YANGREN_MONTH_COMMAND_DEFINITION_HASH,
  type YangrenMonthCommandEvaluation,
} from './general-natal-yangren-month-command-authority.js';

export const GENERAL_NATAL_YANGREN_BOUNDED_REN_OPERAND_VERSION = '0.1.0-research' as const;
export const GENERAL_NATAL_YANGREN_BOUNDED_REN_OPERAND_SCOPE =
  'month_command_yangren_to_bounded_ren_root_comparison_operand_binding' as const;
export const GENERAL_NATAL_YANGREN_BOUNDED_REN_OPERAND_DECISION =
  'AUTHORIZED_RESEARCH_ONLY' as const;

export const GENERAL_NATAL_YANGREN_BOUNDED_REN_OPERAND_SOURCE = Object.freeze({
  title: '子平真詮 / 子平真詮評註',
  sections: Object.freeze(['論十干得時不旺失時不弱', '論陽刃 / 論建祿月劫']),
  urls: Object.freeze([
    'https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm',
    'https://www.ncc.com.tw/fate/paleo/bg/bg_035.htm',
  ]),
  accessedAt: '2026-09-15',
  sourceType: 'classical_transcription_with_commentary',
});

export const GENERAL_NATAL_YANGREN_BOUNDED_REN_OPERAND_SOURCE_OBSERVATIONS = Object.freeze([
  Object.freeze({
    id: 'bounded_ren_comparison_operand',
    observation: '得三比肩，不如得一長生祿刃',
    authority: 'direct_selected_source_bounded_comparison' as const,
  }),
  Object.freeze({
    id: 'month_command_yangren_named_ren',
    observation: '甲木生卯月為刃',
    authority: 'direct_selected_source_term_instance' as const,
  }),
  Object.freeze({
    id: 'non_month_same_branch_not_ren',
    observation: '若非卯月而乾透乙，或年日時支為卯，則應名之為劫而不名為刃',
    authority: 'direct_selected_source_scope_boundary' as const,
  }),
] as const);

export const GENERAL_NATAL_YANGREN_BOUNDED_REN_OPERAND_BINDING = Object.freeze({
  propositionId: 'three_peers_less_than_one_applicable_changsheng_lu_ren_root' as const,
  operandKind: 'applicable_changsheng_lu_ren_root' as const,
  observedInUpstreamRegistry: GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_PROPOSITIONS.some(
    (proposition) =>
      proposition.id === 'three_peers_less_than_one_applicable_changsheng_lu_ren_root' &&
      proposition.right.kind === 'applicable_changsheng_lu_ren_root',
  ),
});

export type YangrenBoundedRenOperandState =
  | 'applicable_bounded_ren_root_operand'
  | 'not_applicable_bounded_ren_root_operand'
  | 'outside_selected_source_yangren_scope';

export interface YangrenBoundedRenOperandEvaluation {
  readonly dayMaster: YangrenMonthCommandEvaluation['dayMaster'];
  readonly monthBranch: YangrenMonthCommandEvaluation['monthBranch'];
  readonly upstreamYangrenState: YangrenMonthCommandEvaluation['state'];
  readonly state: YangrenBoundedRenOperandState;
  readonly boundedOperandKind:
    | typeof GENERAL_NATAL_YANGREN_BOUNDED_REN_OPERAND_BINDING.operandKind
    | null;
  readonly authority: 'research_only';
}

export function bindYangrenMonthCommandToBoundedRenOperand(
  evaluation: YangrenMonthCommandEvaluation,
): YangrenBoundedRenOperandEvaluation {
  if (evaluation.state === 'yangren_month_command_established') {
    return Object.freeze({
      dayMaster: evaluation.dayMaster,
      monthBranch: evaluation.monthBranch,
      upstreamYangrenState: evaluation.state,
      state: 'applicable_bounded_ren_root_operand',
      boundedOperandKind: GENERAL_NATAL_YANGREN_BOUNDED_REN_OPERAND_BINDING.operandKind,
      authority: 'research_only',
    });
  }

  if (evaluation.state === 'excluded_by_selected_source_scope') {
    return Object.freeze({
      dayMaster: evaluation.dayMaster,
      monthBranch: evaluation.monthBranch,
      upstreamYangrenState: evaluation.state,
      state: 'outside_selected_source_yangren_scope',
      boundedOperandKind: null,
      authority: 'research_only',
    });
  }

  return Object.freeze({
    dayMaster: evaluation.dayMaster,
    monthBranch: evaluation.monthBranch,
    upstreamYangrenState: evaluation.state,
    state: 'not_applicable_bounded_ren_root_operand',
    boundedOperandKind: null,
    authority: 'research_only',
  });
}

export const GENERAL_NATAL_YANGREN_BOUNDED_REN_OPERAND_UNAUTHORIZED_DERIVATIONS = Object.freeze([
  'yangren_to_generic_heavy_root_class',
  'ren_as_wang_equivalence',
  'diwang_as_yangren',
  'mingli_tanyuan_twelve_growth_cell_as_yangren',
  'same_branch_in_year_pillar_as_bounded_ren_operand',
  'same_branch_in_day_pillar_as_bounded_ren_operand',
  'same_branch_in_hour_pillar_as_bounded_ren_operand',
  'bounded_ren_operand_to_three_peer_chart_comparison_result',
  'bounded_ren_operand_to_peer_count_evaluator',
  'bounded_ren_operand_to_transitive_root_ranking',
  'bounded_ren_operand_to_numeric_weight',
  'bounded_ren_operand_to_linear_weight_scale',
  'bounded_ren_operand_to_ordinary_strength',
  'bounded_ren_operand_to_generalized_root_weight_classifier',
  'bounded_ren_operand_to_geju_candidate',
  'bounded_ren_operand_to_geju_establishment',
  'bounded_ren_operand_to_production_fact',
] as const);

export const GENERAL_NATAL_YANGREN_BOUNDED_REN_OPERAND_DEFINITION_HASH = createHash('sha256')
  .update(
    JSON.stringify({
      version: GENERAL_NATAL_YANGREN_BOUNDED_REN_OPERAND_VERSION,
      scope: GENERAL_NATAL_YANGREN_BOUNDED_REN_OPERAND_SCOPE,
      decision: GENERAL_NATAL_YANGREN_BOUNDED_REN_OPERAND_DECISION,
      source: GENERAL_NATAL_YANGREN_BOUNDED_REN_OPERAND_SOURCE,
      sourceObservations: GENERAL_NATAL_YANGREN_BOUNDED_REN_OPERAND_SOURCE_OBSERVATIONS,
      operandBinding: GENERAL_NATAL_YANGREN_BOUNDED_REN_OPERAND_BINDING,
      upstreamBoundedComparisonVersion: GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_AUTHORITY.version,
      upstreamBoundedComparisonDefinitionHash:
        GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_DEFINITION_HASH,
      upstreamYangrenMonthCommandVersion: GENERAL_NATAL_YANGREN_MONTH_COMMAND_AUTHORITY.version,
      upstreamYangrenMonthCommandDefinitionHash:
        GENERAL_NATAL_YANGREN_MONTH_COMMAND_DEFINITION_HASH,
      upstreamYangrenEvaluationConsumed: true,
      localYangrenRediscoveryAuthorized: false,
      arbitraryPillarRenOperandAdmissionAuthorized: false,
      yangrenToHeavyRootEquivalenceAuthorized: false,
      chartLevelRootComparisonEvaluatorAuthorized: false,
      unauthorizedDerivations: GENERAL_NATAL_YANGREN_BOUNDED_REN_OPERAND_UNAUTHORIZED_DERIVATIONS,
    }),
  )
  .digest('hex');

export const GENERAL_NATAL_YANGREN_BOUNDED_REN_OPERAND_AUTHORITY = Object.freeze({
  version: GENERAL_NATAL_YANGREN_BOUNDED_REN_OPERAND_VERSION,
  definitionHash: GENERAL_NATAL_YANGREN_BOUNDED_REN_OPERAND_DEFINITION_HASH,
  decision: GENERAL_NATAL_YANGREN_BOUNDED_REN_OPERAND_DECISION,
  upstreamBoundedComparisonVersion: GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_AUTHORITY.version,
  upstreamBoundedComparisonDefinitionHash: GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_DEFINITION_HASH,
  upstreamYangrenMonthCommandVersion: GENERAL_NATAL_YANGREN_MONTH_COMMAND_AUTHORITY.version,
  upstreamYangrenMonthCommandDefinitionHash: GENERAL_NATAL_YANGREN_MONTH_COMMAND_DEFINITION_HASH,
  directSourceThreePeersLessThanChangshengLuRenObserved:
    GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_AUTHORITY.directSourceBoundedRelativeComparisonsObserved,
  directSourceMonthCommandYangrenAsRenTermObserved: true,
  directSourceNonMonthSameBranchNotRenObserved: true,
  upstreamBoundedRenOperandAvailableObservationOnly:
    GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_AUTHORITY
      .boundedComparisonPropositionRegistryAuthorizedObservationOnly,
  upstreamMonthCommandYangrenMatcherAvailableResearchOnly:
    GENERAL_NATAL_YANGREN_MONTH_COMMAND_AUTHORITY.fiveYangMonthCommandYangrenMatcherAuthorizedResearchOnly,
  upstreamOperandBindingObserved: GENERAL_NATAL_YANGREN_BOUNDED_REN_OPERAND_BINDING.observedInUpstreamRegistry,
  monthCommandYangrenToBoundedRenOperandAuthorizedResearchOnly: true,
  upstreamYangrenEvaluationConsumed: true,
  rawChartFactsConsumed: false,
  localYangrenRediscoveryAuthorized: false,
  arbitraryPillarRenOperandAdmissionAuthorized: false,
  yangrenToHeavyRootEquivalenceAuthorized: false,
  renAsWangEquivalenceAuthorized: false,
  diwangToYangrenEquivalenceAuthorized: false,
  twelveGrowthStageMappingConsumed: false,
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
  unauthorizedDerivations: GENERAL_NATAL_YANGREN_BOUNDED_REN_OPERAND_UNAUTHORIZED_DERIVATIONS,
  authorityBoundary:
    'The selected source directly names the governed month-command Yangren instance as 刃 and separately places 刃 inside the bounded comparison operand 長生祿刃. This artifact therefore admits only an already-established #571 month-command Yangren evaluation as the 刃 constituent of #566\'s observation-only bounded operand. It does not rediscover Yangren, admit the same branch from year/day/hour pillars, equate 刃 with 旺 or heavy-root class, execute the three-peer comparison, assign weight, rank roots, derive ordinary strength or Gyeokguk, or emit production facts.',
});
