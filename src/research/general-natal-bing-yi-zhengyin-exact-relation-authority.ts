import { createHash } from 'node:crypto';
import type { HeavenlyStem } from '../contracts/calculation.js';
import { GENERAL_NATAL_GEJU_SOURCE_EXAMPLE_CANONICAL_INPUT_BINDING_REVIEW } from './general-natal-geju-source-example-canonical-input-binding-review.js';
import {
  GENERAL_NATAL_JIA_GUI_ZHENGYIN_EXACT_RELATION_DEFINITION_HASH,
  GENERAL_NATAL_JIA_GUI_ZHENGYIN_EXACT_RELATION_VERSION,
} from './general-natal-jia-gui-zhengyin-exact-relation-authority.js';

export const GENERAL_NATAL_BING_YI_ZHENGYIN_EXACT_RELATION_VERSION =
  '0.1.0-research' as const;
export const GENERAL_NATAL_BING_YI_ZHENGYIN_EXACT_RELATION_SCOPE =
  'bing_day_master_yi_visible_stem_to_zhengyin_exact_relation_observation' as const;
export const GENERAL_NATAL_BING_YI_ZHENGYIN_EXACT_RELATION_DECISION =
  'AUTHORIZED_RESEARCH_ONLY' as const;

export const GENERAL_NATAL_BING_YI_ZHENGYIN_EXACT_RELATION_SOURCE = Object.freeze({
  title: '子平真詮 / 子平真詮評註',
  section: '二十三、論宮分用神配六親',
  url: 'https://www.ncc.com.tw/fate/paleo/bg/bg_034.htm',
  accessedAt: '2026-09-16',
  sourceType: 'classical_transcription_with_commentary',
});

export const GENERAL_NATAL_BING_YI_ZHENGYIN_SOURCE_CONTEXT_TEXT =
  '偏財為母之正夫者，譬如甲以癸為正印，戊為偏財，戊癸合也；丙以乙為正印，庚為偏財，乙庚合也。餘可類推。' as const;
export const GENERAL_NATAL_BING_YI_ZHENGYIN_SOURCE_CLAUSE = '丙以乙為正印' as const;

export interface BingYiZhengyinExactPairInput {
  readonly dayMaster: HeavenlyStem;
  readonly visibleCounterpartStem: HeavenlyStem;
}

export type BingYiZhengyinExactRelationState =
  | 'bing_yi_zhengyin_relation_observed'
  | 'outside_selected_source_pair_scope';

export interface BingYiZhengyinExactRelationEvaluation {
  readonly state: BingYiZhengyinExactRelationState;
  readonly dayMaster: HeavenlyStem;
  readonly visibleCounterpartStem: HeavenlyStem;
  readonly sourceRelation: '正印' | null;
  readonly sourceClause: typeof GENERAL_NATAL_BING_YI_ZHENGYIN_SOURCE_CLAUSE | null;
  readonly exactRelationObserved: boolean;
  readonly authority: 'research_only';
}

export function observeBingYiZhengyinExactRelation(
  input: BingYiZhengyinExactPairInput,
): BingYiZhengyinExactRelationEvaluation {
  if (input.dayMaster === '병' && input.visibleCounterpartStem === '을') {
    return Object.freeze({
      state: 'bing_yi_zhengyin_relation_observed',
      dayMaster: input.dayMaster,
      visibleCounterpartStem: input.visibleCounterpartStem,
      sourceRelation: '正印',
      sourceClause: GENERAL_NATAL_BING_YI_ZHENGYIN_SOURCE_CLAUSE,
      exactRelationObserved: true,
      authority: 'research_only',
    });
  }

  return Object.freeze({
    state: 'outside_selected_source_pair_scope',
    dayMaster: input.dayMaster,
    visibleCounterpartStem: input.visibleCounterpartStem,
    sourceRelation: null,
    sourceClause: null,
    exactRelationObserved: false,
    authority: 'research_only',
  });
}

export const GENERAL_NATAL_BING_YI_ZHENGYIN_EXACT_RELATION_UNAUTHORIZED_DERIVATIONS =
  Object.freeze([
    'canonical_jeongin_to_source_zhengyin_global_alias',
    'canonical_pyeonin_to_source_pianyin_global_alias',
    'opposite_polarity_resource_relation_to_generalized_zhengyin',
    'jia_gui_to_zhengyin_under_this_authority',
    'yu_ke_lei_tui_to_full_ten_stem_zhengyin_table',
    'canonical_ten_god_recomputation',
    'whole_chart_zhengyin_scan',
    'hidden_stem_as_zhengyin_counterpart',
    'branch_ten_god_as_zhengyin_counterpart',
    'zhengyin_to_yinshou_runtime_constituent',
    'zhengyin_count_to_dang_zhong',
    'absence_of_exact_pair_to_zhu_gua',
    'zhengyin_to_final_qiang',
    'zhengyin_to_numeric_strength',
    'zhengyin_to_nonnumeric_strength_scalar',
    'zhengyin_to_geju_candidate',
    'zhengyin_to_geju_establishment',
    'zhengyin_to_production_fact',
  ] as const);

const canonicalDayMasterPathGoverned =
  GENERAL_NATAL_GEJU_SOURCE_EXAMPLE_CANONICAL_INPUT_BINDING_REVIEW.governedRawFactPaths.includes(
    'derivedFacts.dayMaster',
  );
const canonicalVisibleStemPathGoverned =
  GENERAL_NATAL_GEJU_SOURCE_EXAMPLE_CANONICAL_INPUT_BINDING_REVIEW.governedRawFactPaths.includes(
    'pillars.*.stem',
  );

export const GENERAL_NATAL_BING_YI_ZHENGYIN_EXACT_RELATION_DEFINITION_HASH = createHash('sha256')
  .update(
    JSON.stringify({
      version: GENERAL_NATAL_BING_YI_ZHENGYIN_EXACT_RELATION_VERSION,
      scope: GENERAL_NATAL_BING_YI_ZHENGYIN_EXACT_RELATION_SCOPE,
      decision: GENERAL_NATAL_BING_YI_ZHENGYIN_EXACT_RELATION_DECISION,
      source: GENERAL_NATAL_BING_YI_ZHENGYIN_EXACT_RELATION_SOURCE,
      sourceContextText: GENERAL_NATAL_BING_YI_ZHENGYIN_SOURCE_CONTEXT_TEXT,
      sourceClause: GENERAL_NATAL_BING_YI_ZHENGYIN_SOURCE_CLAUSE,
      exactDayMaster: '병',
      exactVisibleCounterpartStem: '을',
      sourceRelation: '正印',
      canonicalDayMasterPathGoverned,
      canonicalVisibleStemPathGoverned,
      upstreamJiaGuiZhengyinVersion:
        GENERAL_NATAL_JIA_GUI_ZHENGYIN_EXACT_RELATION_VERSION,
      upstreamJiaGuiZhengyinDefinitionHash:
        GENERAL_NATAL_JIA_GUI_ZHENGYIN_EXACT_RELATION_DEFINITION_HASH,
      canonicalTenGodFactsConsumed: false,
      canonicalJeonginToSourceZhengyinAliasAuthorized: false,
      chartScanAuthorized: false,
      hiddenStemConsumed: false,
      unauthorizedDerivations:
        GENERAL_NATAL_BING_YI_ZHENGYIN_EXACT_RELATION_UNAUTHORIZED_DERIVATIONS,
      productionFactEmissionAuthorized: false,
    }),
  )
  .digest('hex');

export const GENERAL_NATAL_BING_YI_ZHENGYIN_EXACT_RELATION_AUTHORITY = Object.freeze({
  version: GENERAL_NATAL_BING_YI_ZHENGYIN_EXACT_RELATION_VERSION,
  definitionHash: GENERAL_NATAL_BING_YI_ZHENGYIN_EXACT_RELATION_DEFINITION_HASH,
  decision: GENERAL_NATAL_BING_YI_ZHENGYIN_EXACT_RELATION_DECISION,
  upstreamJiaGuiZhengyinVersion:
    GENERAL_NATAL_JIA_GUI_ZHENGYIN_EXACT_RELATION_VERSION,
  upstreamJiaGuiZhengyinDefinitionHash:
    GENERAL_NATAL_JIA_GUI_ZHENGYIN_EXACT_RELATION_DEFINITION_HASH,
  directSourceBingYiZhengyinObserved: true,
  canonicalDayMasterPathGoverned,
  canonicalVisibleStemPathGoverned,
  exactBingYiPairRepresentable: canonicalDayMasterPathGoverned && canonicalVisibleStemPathGoverned,
  bingYiZhengyinExactPairMatcherAuthorizedResearchOnly: true,
  boundedPairInputOnly: true,
  canonicalTenGodFactsConsumed: false,
  canonicalJeonginToSourceZhengyinAliasAuthorized: false,
  canonicalPyeoninToSourcePianyinAliasAuthorized: false,
  generalizedZhengyinResolverAuthorized: false,
  wholeChartZhengyinScanAuthorized: false,
  canonicalTenGodRecomputationAuthorized: false,
  yinshouRuntimeResolverAuthorized: false,
  zhengyinToYinshouRuntimeConstituentAuthorized: false,
  branchTenGodConsumed: false,
  hiddenStemConsumed: false,
  dangZhongCounterAuthorized: false,
  dangZhongThresholdAuthorized: false,
  dangZhongBooleanResolverAuthorized: false,
  zhuGuaCounterAuthorized: false,
  zhuGuaBooleanResolverAuthorized: false,
  chartLevelQiangRuoClassifierAuthorized: false,
  chartLevelWangShuaiClassifierAuthorized: false,
  numericStrengthAuthorized: false,
  nonNumericStrengthScalarAuthorized: false,
  candidateDerivationAuthorized: false,
  establishmentPredicateAuthorized: false,
  candidateFactsEmitted: false,
  establishmentFactsEmitted: false,
  productionFactEmissionAuthorized: false,
  unauthorizedDerivations:
    GENERAL_NATAL_BING_YI_ZHENGYIN_EXACT_RELATION_UNAUTHORIZED_DERIVATIONS,
  authorityBoundary:
    'The selected source directly states the exact relation 丙以乙為正印. Current canonical contracts expose governed day-master and visible-pillar stem identities, so the literal 丙/乙 pair is exactly representable as a bounded research-only relation observation. This authority does not equate canonical 정인 with source 正印, re-govern the separately authorized 甲/癸 pair, generalize 正印 to other stem pairs, operationalize 餘可類推, recompute or consume canonical Ten-God facts, scan a chart, consume hidden stems or branch Ten-Gods, resolve 正印 into an 印綬 runtime constituent, establish 黨眾/助寡 or final 強弱/旺衰, derive Gyeokguk, or emit production facts.',
});
