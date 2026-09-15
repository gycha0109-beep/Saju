import { createHash } from 'node:crypto';
import type { HeavenlyStem } from '../contracts/calculation.js';
import { GENERAL_NATAL_GEJU_SOURCE_EXAMPLE_CANONICAL_INPUT_BINDING_REVIEW } from './general-natal-geju-source-example-canonical-input-binding-review.js';
import {
  GENERAL_NATAL_VISIBLE_BIJIAN_DANG_ZHONG_CONSTITUENT_DEFINITION_HASH,
  GENERAL_NATAL_VISIBLE_BIJIAN_DANG_ZHONG_CONSTITUENT_VERSION,
} from './general-natal-visible-bijian-dang-zhong-constituent-authority.js';

export const GENERAL_NATAL_JIA_YI_JIECAI_EXACT_RELATION_VERSION = '0.1.0-research' as const;
export const GENERAL_NATAL_JIA_YI_JIECAI_EXACT_RELATION_SCOPE =
  'jia_day_master_meets_yi_visible_stem_to_jiecai_exact_relation_observation' as const;
export const GENERAL_NATAL_JIA_YI_JIECAI_EXACT_RELATION_DECISION =
  'AUTHORIZED_RESEARCH_ONLY' as const;

export const GENERAL_NATAL_JIA_YI_JIECAI_EXACT_RELATION_SOURCE = Object.freeze({
  title: '子平真詮 / 子平真詮評註',
  section: '論十干配合性情',
  url: 'https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm',
  accessedAt: '2026-09-16',
  sourceType: 'classical_transcription_with_commentary',
});

export const GENERAL_NATAL_JIA_YI_JIECAI_SOURCE_TEXT = '甲逢乙為劫財' as const;

export interface JiaYiJiecaiExactPairInput {
  readonly dayMaster: HeavenlyStem;
  readonly visibleCounterpartStem: HeavenlyStem;
}

export type JiaYiJiecaiExactRelationState =
  | 'jia_yi_jiecai_relation_observed'
  | 'outside_selected_source_pair_scope';

export interface JiaYiJiecaiExactRelationEvaluation {
  readonly state: JiaYiJiecaiExactRelationState;
  readonly dayMaster: HeavenlyStem;
  readonly visibleCounterpartStem: HeavenlyStem;
  readonly sourceRelation: '劫財' | null;
  readonly sourceText: typeof GENERAL_NATAL_JIA_YI_JIECAI_SOURCE_TEXT | null;
  readonly exactRelationObserved: boolean;
  readonly authority: 'research_only';
}

export function observeJiaYiJiecaiExactRelation(
  input: JiaYiJiecaiExactPairInput,
): JiaYiJiecaiExactRelationEvaluation {
  if (input.dayMaster === '갑' && input.visibleCounterpartStem === '을') {
    return Object.freeze({
      state: 'jia_yi_jiecai_relation_observed',
      dayMaster: input.dayMaster,
      visibleCounterpartStem: input.visibleCounterpartStem,
      sourceRelation: '劫財',
      sourceText: GENERAL_NATAL_JIA_YI_JIECAI_SOURCE_TEXT,
      exactRelationObserved: true,
      authority: 'research_only',
    });
  }

  return Object.freeze({
    state: 'outside_selected_source_pair_scope',
    dayMaster: input.dayMaster,
    visibleCounterpartStem: input.visibleCounterpartStem,
    sourceRelation: null,
    sourceText: null,
    exactRelationObserved: false,
    authority: 'research_only',
  });
}

export const GENERAL_NATAL_JIA_YI_JIECAI_EXACT_RELATION_UNAUTHORIZED_DERIVATIONS = Object.freeze([
  'yi_day_master_plus_jia_to_jiecai',
  'same_element_opposite_polarity_to_generalized_jiecai',
  'canonical_gyeopjae_to_source_jiecai_global_alias',
  'canonical_ten_god_recomputation',
  'jiecai_to_bijie_support_category',
  'whole_chart_jiecai_scan',
  'hidden_stem_as_jiecai_counterpart',
  'branch_ten_god_as_jiecai_counterpart',
  'jiecai_count_to_dang_zhong',
  'absence_of_exact_pair_to_zhu_gua',
  'jiecai_to_final_qiang',
  'jiecai_to_numeric_strength',
  'jiecai_to_nonnumeric_strength_scalar',
  'jiecai_to_geju_candidate',
  'jiecai_to_geju_establishment',
  'jiecai_to_production_fact',
] as const);

const canonicalDayMasterPathGoverned =
  GENERAL_NATAL_GEJU_SOURCE_EXAMPLE_CANONICAL_INPUT_BINDING_REVIEW.governedRawFactPaths.includes(
    'derivedFacts.dayMaster',
  );
const canonicalVisibleStemPathGoverned =
  GENERAL_NATAL_GEJU_SOURCE_EXAMPLE_CANONICAL_INPUT_BINDING_REVIEW.governedRawFactPaths.includes(
    'pillars.*.stem',
  );

export const GENERAL_NATAL_JIA_YI_JIECAI_EXACT_RELATION_DEFINITION_HASH = createHash('sha256')
  .update(
    JSON.stringify({
      version: GENERAL_NATAL_JIA_YI_JIECAI_EXACT_RELATION_VERSION,
      scope: GENERAL_NATAL_JIA_YI_JIECAI_EXACT_RELATION_SCOPE,
      decision: GENERAL_NATAL_JIA_YI_JIECAI_EXACT_RELATION_DECISION,
      source: GENERAL_NATAL_JIA_YI_JIECAI_EXACT_RELATION_SOURCE,
      sourceText: GENERAL_NATAL_JIA_YI_JIECAI_SOURCE_TEXT,
      exactDayMaster: '갑',
      exactVisibleCounterpartStem: '을',
      sourceRelation: '劫財',
      canonicalDayMasterPathGoverned,
      canonicalVisibleStemPathGoverned,
      upstreamVisibleBijianDangZhongVersion:
        GENERAL_NATAL_VISIBLE_BIJIAN_DANG_ZHONG_CONSTITUENT_VERSION,
      upstreamVisibleBijianDangZhongDefinitionHash:
        GENERAL_NATAL_VISIBLE_BIJIAN_DANG_ZHONG_CONSTITUENT_DEFINITION_HASH,
      chartScanAuthorized: false,
      canonicalTenGodRecomputationAuthorized: false,
      hiddenStemConsumed: false,
      jiecaiToBijieSupportCategoryAuthorized: false,
      unauthorizedDerivations:
        GENERAL_NATAL_JIA_YI_JIECAI_EXACT_RELATION_UNAUTHORIZED_DERIVATIONS,
      productionFactEmissionAuthorized: false,
    }),
  )
  .digest('hex');

export const GENERAL_NATAL_JIA_YI_JIECAI_EXACT_RELATION_AUTHORITY = Object.freeze({
  version: GENERAL_NATAL_JIA_YI_JIECAI_EXACT_RELATION_VERSION,
  definitionHash: GENERAL_NATAL_JIA_YI_JIECAI_EXACT_RELATION_DEFINITION_HASH,
  decision: GENERAL_NATAL_JIA_YI_JIECAI_EXACT_RELATION_DECISION,
  upstreamVisibleBijianDangZhongVersion:
    GENERAL_NATAL_VISIBLE_BIJIAN_DANG_ZHONG_CONSTITUENT_VERSION,
  upstreamVisibleBijianDangZhongDefinitionHash:
    GENERAL_NATAL_VISIBLE_BIJIAN_DANG_ZHONG_CONSTITUENT_DEFINITION_HASH,
  directSourceJiaMeetsYiJiecaiObserved: true,
  canonicalDayMasterPathGoverned,
  canonicalVisibleStemPathGoverned,
  exactJiaYiPairRepresentable: canonicalDayMasterPathGoverned && canonicalVisibleStemPathGoverned,
  jiaYiJiecaiExactPairMatcherAuthorizedResearchOnly: true,
  boundedPairInputOnly: true,
  wholeChartJiecaiScanAuthorized: false,
  generalizedJiecaiResolverAuthorized: false,
  canonicalGyeopjaeToSourceJiecaiAliasAuthorized: false,
  canonicalTenGodRecomputationAuthorized: false,
  jiecaiToBijieSupportCategoryAuthorized: false,
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
  unauthorizedDerivations: GENERAL_NATAL_JIA_YI_JIECAI_EXACT_RELATION_UNAUTHORIZED_DERIVATIONS,
  authorityBoundary:
    'The selected source directly states only the exact clause 甲逢乙為劫財 in the ten-stem pairing discussion. Current canonical contracts expose governed day-master and visible-pillar stem identities, so the literal 甲/乙 pair is exactly representable as a bounded research-only relation observation. This authority does not generalize 劫財 to other day masters, equate the canonical 겁재 label with source 劫財 globally, scan a chart, consume hidden stems or branch Ten-Gods, map 劫財 into 比劫 support-category evidence, establish 黨眾/助寡 or final 強弱/旺衰, derive Gyeokguk, or emit production facts.',
});
