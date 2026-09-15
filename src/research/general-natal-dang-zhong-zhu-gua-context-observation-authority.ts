import { createHash } from 'node:crypto';
import {
  GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_SEMANTIC_AXIS_DEFINITION_HASH,
  GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_SEMANTIC_AXIS_VERSION,
} from './general-natal-wang-shuai-qiang-ruo-semantic-axis-authority.js';
import {
  GENERAL_NATAL_WOOD_MONTH_COMMAND_DE_SHI_SHI_SHI_DEFINITION_HASH,
  GENERAL_NATAL_WOOD_MONTH_COMMAND_DE_SHI_SHI_SHI_VERSION,
} from './general-natal-wood-month-command-de-shi-shi-shi-authority.js';

export const GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_VERSION =
  '0.1.0-research' as const;
export const GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_SCOPE =
  'dang_zhong_zhu_gua_context_observation' as const;
export const GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_DECISION =
  'AUTHORIZED_OBSERVATION_ONLY' as const;

export const GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_SOURCE = Object.freeze({
  title: '子平真詮 / 子平真詮評註',
  section: '論十干得時不旺失時不弱',
  url: 'https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm',
  accessedAt: '2026-09-15',
  sourceType: 'classical_transcription_with_commentary',
});

export const GENERAL_NATAL_DANG_ZHONG_COMPONENT_SOURCE_TEXT =
  '比劫印綬通根扶助為黨眾' as const;
export const GENERAL_NATAL_METAL_PARTY_WOOD_SUPPORT_SPARSE_SOURCE_TEXT =
  '干庚辛而支酉丑，則金之黨眾，而木之助寡' as const;
export const GENERAL_NATAL_FIRE_PARTY_WOOD_DRAIN_SOURCE_TEXT =
  '干丙丁而支巳午，則火之黨眾，木洩氣太重，雖秉令而不強也' as const;
export const GENERAL_NATAL_OUT_OF_SEASON_WOOD_PARTY_SOURCE_TEXT =
  '若比印重疊，年日時支，又通根比印，即為黨眾，雖失時而不弱也' as const;

export const GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATIONS = Object.freeze([
  Object.freeze({
    id: 'dang_zhong_source_components',
    sourceText: GENERAL_NATAL_DANG_ZHONG_COMPONENT_SOURCE_TEXT,
    observation: '比劫 / 印綬 / 通根扶助 are source-associated with 黨眾' as const,
    normalizedPredicateAuthorized: false,
  }),
  Object.freeze({
    id: 'metal_party_wood_support_sparse_example',
    sourceText: GENERAL_NATAL_METAL_PARTY_WOOD_SUPPORT_SPARSE_SOURCE_TEXT,
    observation: 'source describes 金之黨眾 and 木之助寡 in the stated Wood context' as const,
    normalizedPredicateAuthorized: false,
  }),
  Object.freeze({
    id: 'fire_party_wood_drain_example',
    sourceText: GENERAL_NATAL_FIRE_PARTY_WOOD_DRAIN_SOURCE_TEXT,
    observation:
      'source describes 火之黨眾, 木洩氣太重, and 雖秉令而不強 in the stated Wood context' as const,
    normalizedPredicateAuthorized: false,
  }),
  Object.freeze({
    id: 'out_of_season_wood_party_example',
    sourceText: GENERAL_NATAL_OUT_OF_SEASON_WOOD_PARTY_SOURCE_TEXT,
    observation:
      'source describes 比印重疊 plus 年日時支通根比印 as 黨眾 and 雖失時而不弱' as const,
    normalizedPredicateAuthorized: false,
  }),
] as const);

export const GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CANONICAL_REPRESENTABILITY = Object.freeze({
  visibleStemFactsAvailable: true,
  visibleBranchFactsAvailable: true,
  dayMasterAvailable: true,
  tenGodFactsAvailable: true,
  hiddenStemFactsAvailable: true,
  dangZhongCardinalityRuleAvailable: false,
  zhuGuaCardinalityRuleAvailable: false,
  ganGengXinPositionalRuleAvailable: false,
  zhiYouChouPositionalRuleAvailable: false,
  ganBingDingPositionalRuleAvailable: false,
  zhiSiWuPositionalRuleAvailable: false,
  biYinChongDieThresholdAvailable: false,
  tongGenBiYinCompositionRuleAvailable: false,
  chartLevelDangZhongResolverAuthorized: false,
  chartLevelZhuGuaResolverAuthorized: false,
});

export const GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_UNAUTHORIZED_DERIVATIONS = Object.freeze([
  'count_greater_than_or_equal_to_n_to_dang_zhong',
  'count_less_than_n_to_zhu_gua',
  'single_geng_or_xin_plus_single_you_or_chou_to_metal_dang_zhong',
  'all_geng_xin_you_chou_required_for_metal_dang_zhong',
  'single_bing_or_ding_plus_single_si_or_wu_to_fire_dang_zhong',
  'all_bing_ding_si_wu_required_for_fire_dang_zhong',
  'chong_die_to_numeric_threshold',
  'tong_gen_bi_yin_to_generalized_support_score',
  'root_weight_to_dang_zhong_or_zhu_gua',
  'local_de_shi_or_shi_shi_to_final_wang_or_shuai',
  'source_context_example_to_final_qiang_or_ruo',
  'source_context_example_to_numeric_strength_score',
  'source_context_example_to_nonnumeric_strength_scalar',
  'source_context_example_to_geju_candidate',
  'source_context_example_to_geju_establishment',
  'source_context_example_to_production_fact',
] as const);

export const GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_DEFINITION_HASH =
  createHash('sha256')
    .update(
      JSON.stringify({
        version: GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_VERSION,
        scope: GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_SCOPE,
        decision: GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_DECISION,
        source: GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_SOURCE,
        observations: GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATIONS,
        representability: GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CANONICAL_REPRESENTABILITY,
        upstreamSemanticAxisVersion:
          GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_SEMANTIC_AXIS_VERSION,
        upstreamSemanticAxisDefinitionHash:
          GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_SEMANTIC_AXIS_DEFINITION_HASH,
        upstreamWoodTimingVersion:
          GENERAL_NATAL_WOOD_MONTH_COMMAND_DE_SHI_SHI_SHI_VERSION,
        upstreamWoodTimingDefinitionHash:
          GENERAL_NATAL_WOOD_MONTH_COMMAND_DE_SHI_SHI_SHI_DEFINITION_HASH,
        chartFactsConsumed: false,
        unauthorizedDerivations:
          GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_UNAUTHORIZED_DERIVATIONS,
        productionFactEmissionAuthorized: false,
      }),
    )
    .digest('hex');

export const GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_AUTHORITY =
  Object.freeze({
    version: GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_VERSION,
    definitionHash:
      GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_DEFINITION_HASH,
    decision: GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_DECISION,
    upstreamSemanticAxisVersion: GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_SEMANTIC_AXIS_VERSION,
    upstreamSemanticAxisDefinitionHash:
      GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_SEMANTIC_AXIS_DEFINITION_HASH,
    upstreamWoodTimingVersion:
      GENERAL_NATAL_WOOD_MONTH_COMMAND_DE_SHI_SHI_SHI_VERSION,
    upstreamWoodTimingDefinitionHash:
      GENERAL_NATAL_WOOD_MONTH_COMMAND_DE_SHI_SHI_SHI_DEFINITION_HASH,
    directSourceDangZhongComponentsObserved: true,
    directSourceMetalPartyWoodSupportSparseExampleObserved: true,
    directSourceFirePartyWoodDrainExampleObserved: true,
    directSourceOutOfSeasonWoodPartyExampleObserved: true,
    sourceObservationCount:
      GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATIONS.length,
    dangZhongCounterAuthorized: false,
    zhuGuaCounterAuthorized: false,
    dangZhongThresholdAuthorized: false,
    zhuGuaThresholdAuthorized: false,
    dangZhongBooleanResolverAuthorized: false,
    zhuGuaBooleanResolverAuthorized: false,
    positionalPatternNormalizationAuthorized: false,
    biYinChongDieThresholdAuthorized: false,
    tongGenBiYinCompositionAuthorized: false,
    localContextToFinalQiangRuoAuthorized: false,
    chartLevelQiangRuoClassifierAuthorized: false,
    chartLevelWangShuaiClassifierAuthorized: false,
    numericStrengthAuthorized: false,
    nonNumericStrengthScalarAuthorized: false,
    candidateDerivationAuthorized: false,
    establishmentPredicateAuthorized: false,
    chartFactsConsumed: false,
    candidateFactsEmitted: false,
    establishmentFactsEmitted: false,
    productionFactEmissionAuthorized: false,
    unauthorizedDerivations:
      GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_UNAUTHORIZED_DERIVATIONS,
    authorityBoundary:
      'The selected source directly associates 比劫, 印綬, and 通根扶助 with 黨眾 and gives three concrete Wood-context examples for 金之黨眾/木之助寡, 火之黨眾/木洩氣太重, and out-of-season Wood remaining not weak through repeated 比印 and root support. The source does not specify complete cardinality, positional, 重疊-threshold, or 通根比印 composition rules. Therefore these statements are governed as immutable observations only and authorize no counter, threshold, boolean resolver, final 旺衰/強弱 classifier, strength scalar, Gyeokguk derivation, or production emission.',
  });
