import { createHash } from 'node:crypto';
import {
  GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_DEFINITION_HASH,
  GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_VERSION,
} from './general-natal-dang-zhong-zhu-gua-context-observation-authority.js';

export const GENERAL_NATAL_YINSHOU_ZHENG_PIAN_SOURCE_CATEGORY_VERSION =
  '0.1.0-research' as const;
export const GENERAL_NATAL_YINSHOU_ZHENG_PIAN_SOURCE_CATEGORY_SCOPE =
  'yinshou_zheng_pian_source_category_observation' as const;
export const GENERAL_NATAL_YINSHOU_ZHENG_PIAN_SOURCE_CATEGORY_DECISION =
  'AUTHORIZED_OBSERVATION_ONLY' as const;

export const GENERAL_NATAL_YINSHOU_ZHENG_PIAN_SOURCE_CATEGORY_SOURCE = Object.freeze({
  title: '子平真詮 / 子平真詮評註',
  section: '三十五、論印綬',
  url: 'https://www.ncc.com.tw/fate/paleo/bg/bg_034.htm',
  accessedAt: '2026-09-16',
  sourceType: 'classical_transcription_with_commentary',
});

export const GENERAL_NATAL_YINSHOU_ZHENG_PIAN_SOURCE_TEXT =
  '印綬喜其生身，正偏同為美格，故財與印不分偏正，同為一格而論之。' as const;

export const GENERAL_NATAL_YINSHOU_ZHENG_PIAN_SOURCE_CATEGORY_OBSERVATIONS = Object.freeze([
  Object.freeze({
    id: 'yinshou_zheng_pian_same_geju_treatment',
    sourceText: GENERAL_NATAL_YINSHOU_ZHENG_PIAN_SOURCE_TEXT,
    sourceCategory: '印綬' as const,
    sourceVariantAxis: '正偏' as const,
    zhengPianVariantsGroupedTogether: true as const,
    sameGejuTreatmentObserved: true as const,
    canonicalMappingAuthorized: false as const,
  }),
] as const);

export const GENERAL_NATAL_YINSHOU_ZHENG_PIAN_CANONICAL_REPRESENTABILITY = Object.freeze({
  canonicalInputRequired: false,
  chartFactsConsumed: false,
  tenGodFactsConsumed: false,
  stemFactsConsumed: false,
  branchFactsConsumed: false,
  hiddenStemFactsConsumed: false,
  canonicalJeonginToZhengyinMappingAuthorized: false,
  canonicalPyeoninToPianyinMappingAuthorized: false,
  canonicalYinshouResolverAuthorized: false,
  status: 'NOT_REQUIRED_FOR_OBSERVATION_ONLY' as const,
});

export const GENERAL_NATAL_YINSHOU_ZHENG_PIAN_UNAUTHORIZED_DERIVATIONS = Object.freeze([
  'canonical_jeongin_to_source_zhengyin',
  'canonical_pyeonin_to_source_pianyin',
  'canonical_jeongin_or_pyeonin_to_yinshou_runtime_constituent',
  'any_ten_god_presence_to_yinshou',
  'jeongin_plus_pyeonin_count',
  'single_yin_to_dang_zhong',
  'yin_absence_to_zhu_gua',
  'yinshou_to_qiang',
  'source_category_observation_to_ordinary_strength',
  'source_category_observation_to_numeric_strength',
  'source_category_observation_to_nonnumeric_strength_scalar',
  'source_category_observation_to_geju_candidate',
  'source_category_observation_to_geju_establishment',
  'source_category_observation_to_production_fact',
] as const);

export const GENERAL_NATAL_YINSHOU_ZHENG_PIAN_SOURCE_CATEGORY_DEFINITION_HASH = createHash(
  'sha256',
)
  .update(
    JSON.stringify({
      version: GENERAL_NATAL_YINSHOU_ZHENG_PIAN_SOURCE_CATEGORY_VERSION,
      scope: GENERAL_NATAL_YINSHOU_ZHENG_PIAN_SOURCE_CATEGORY_SCOPE,
      decision: GENERAL_NATAL_YINSHOU_ZHENG_PIAN_SOURCE_CATEGORY_DECISION,
      source: GENERAL_NATAL_YINSHOU_ZHENG_PIAN_SOURCE_CATEGORY_SOURCE,
      observations: GENERAL_NATAL_YINSHOU_ZHENG_PIAN_SOURCE_CATEGORY_OBSERVATIONS,
      representability: GENERAL_NATAL_YINSHOU_ZHENG_PIAN_CANONICAL_REPRESENTABILITY,
      upstreamDangZhongContextVersion:
        GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_VERSION,
      upstreamDangZhongContextDefinitionHash:
        GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_DEFINITION_HASH,
      unauthorizedDerivations: GENERAL_NATAL_YINSHOU_ZHENG_PIAN_UNAUTHORIZED_DERIVATIONS,
      productionFactEmissionAuthorized: false,
    }),
  )
  .digest('hex');

export const GENERAL_NATAL_YINSHOU_ZHENG_PIAN_SOURCE_CATEGORY_AUTHORITY = Object.freeze({
  version: GENERAL_NATAL_YINSHOU_ZHENG_PIAN_SOURCE_CATEGORY_VERSION,
  definitionHash: GENERAL_NATAL_YINSHOU_ZHENG_PIAN_SOURCE_CATEGORY_DEFINITION_HASH,
  decision: GENERAL_NATAL_YINSHOU_ZHENG_PIAN_SOURCE_CATEGORY_DECISION,
  upstreamDangZhongContextVersion:
    GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_VERSION,
  upstreamDangZhongContextDefinitionHash:
    GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_DEFINITION_HASH,
  sourceObservationCount: GENERAL_NATAL_YINSHOU_ZHENG_PIAN_SOURCE_CATEGORY_OBSERVATIONS.length,
  directSourceYinshouCategoryObserved: true,
  directSourceZhengPianSameGejuTreatmentObserved: true,
  yinshouZhengPianSourceCategoryAuthorizedObservationOnly: true,
  canonicalInputRequired: false,
  chartFactsConsumed: false,
  tenGodFactsConsumed: false,
  stemFactsConsumed: false,
  branchFactsConsumed: false,
  hiddenStemFactsConsumed: false,
  canonicalJeonginToZhengyinMappingAuthorized: false,
  canonicalPyeoninToPianyinMappingAuthorized: false,
  canonicalYinshouResolverAuthorized: false,
  yinshouToDangZhongSupportConstituentAuthorized: false,
  yinshouCounterAuthorized: false,
  dangZhongCounterAuthorized: false,
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
  unauthorizedDerivations: GENERAL_NATAL_YINSHOU_ZHENG_PIAN_UNAUTHORIZED_DERIVATIONS,
  authorityBoundary:
    'The selected source section 論印綬 directly states that the 正/偏 variants of 印 are treated together in the 印綬 discussion and as the same 格-level category. This artifact preserves only that source-side category observation. It does not bind canonical 정인/편인 Ten-God values to 正印/偏印, consume chart facts, create an 印綬 runtime resolver or support constituent, count 印, establish 黨眾/助寡, classify final 旺衰/強弱, derive a strength scalar or Gyeokguk, or emit production facts.',
});
