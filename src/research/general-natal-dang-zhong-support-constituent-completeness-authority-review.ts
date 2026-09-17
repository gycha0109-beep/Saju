import { createHash } from 'node:crypto';
import {
  GENERAL_NATAL_DANG_ZHONG_COMPONENT_SOURCE_TEXT,
  GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CANONICAL_REPRESENTABILITY,
  GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_AUTHORITY,
  GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_DEFINITION_HASH,
  GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_SOURCE,
  GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_VERSION,
} from './general-natal-dang-zhong-zhu-gua-context-observation-authority.js';
import {
  GENERAL_NATAL_VISIBLE_BIJIAN_DANG_ZHONG_CONSTITUENT_AUTHORITY,
  GENERAL_NATAL_VISIBLE_BIJIAN_DANG_ZHONG_CONSTITUENT_DEFINITION_HASH,
  GENERAL_NATAL_VISIBLE_BIJIAN_DANG_ZHONG_CONSTITUENT_VERSION,
} from './general-natal-visible-bijian-dang-zhong-constituent-authority.js';
import {
  GENERAL_NATAL_YINSHOU_DANG_ZHONG_SUPPORT_CONSTITUENT_AUTHORITY,
  GENERAL_NATAL_YINSHOU_DANG_ZHONG_SUPPORT_CONSTITUENT_DEFINITION_HASH,
  GENERAL_NATAL_YINSHOU_DANG_ZHONG_SUPPORT_CONSTITUENT_VERSION,
} from './general-natal-yinshou-dang-zhong-support-constituent-authority.js';
import {
  GENERAL_NATAL_TONGGEN_DANG_ZHONG_SUPPORT_CONSTITUENT_AUTHORITY,
  GENERAL_NATAL_TONGGEN_DANG_ZHONG_SUPPORT_CONSTITUENT_DEFINITION_HASH,
  GENERAL_NATAL_TONGGEN_DANG_ZHONG_SUPPORT_CONSTITUENT_VERSION,
} from './general-natal-tonggen-dang-zhong-support-constituent-authority.js';
import {
  GENERAL_NATAL_JIA_YI_JIECAI_BIJIE_SUPPORT_CONSTITUENT_AUTHORITY,
  GENERAL_NATAL_JIA_YI_JIECAI_BIJIE_SUPPORT_CONSTITUENT_DEFINITION_HASH,
  GENERAL_NATAL_JIA_YI_JIECAI_BIJIE_SUPPORT_CONSTITUENT_VERSION,
} from './general-natal-jia-yi-jiecai-bijie-support-constituent-authority.js';
import {
  GENERAL_NATAL_WANG_CHANGSHENG_LU_TONGGEN_SUPPORT_CONSTITUENT_AUTHORITY,
  GENERAL_NATAL_WANG_CHANGSHENG_LU_TONGGEN_SUPPORT_CONSTITUENT_DEFINITION_HASH,
  GENERAL_NATAL_WANG_CHANGSHENG_LU_TONGGEN_SUPPORT_CONSTITUENT_VERSION,
} from './general-natal-wang-changsheng-lu-tonggen-dang-zhong-support-constituent-authority.js';

export const GENERAL_NATAL_DANG_ZHONG_SUPPORT_CONSTITUENT_COMPLETENESS_REVIEW_VERSION =
  '0.1.0-research' as const;
export const GENERAL_NATAL_DANG_ZHONG_SUPPORT_CONSTITUENT_COMPLETENESS_REVIEW_SCOPE =
  'dang_zhong_support_constituent_completeness_before_aggregation_review' as const;
export const GENERAL_NATAL_DANG_ZHONG_SUPPORT_CONSTITUENT_COMPLETENESS_REVIEW_DECISION =
  'INCOMPLETE_AGGREGATION_BLOCKED' as const;

export const GENERAL_NATAL_DANG_ZHONG_SUPPORT_CONSTITUENT_COMPLETENESS_REVIEW_SOURCE =
  Object.freeze({
    ...GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_SOURCE,
    accessedAt: '2026-09-17' as const,
  });

export const GENERAL_NATAL_DANG_ZHONG_SUPPORT_CONSTITUENT_COMPLETENESS_REVIEW_SOURCE_OBSERVATIONS =
  Object.freeze([
    Object.freeze({
      id: 'bijie_yinshou_tonggen_support_context',
      sourceText: GENERAL_NATAL_DANG_ZHONG_COMPONENT_SOURCE_TEXT,
      observation:
        '比劫, 印綬, and 通根扶助 are directly source-associated with 黨眾 composition' as const,
    }),
    Object.freeze({
      id: 'dang_zhong_cardinality_rule_missing',
      observation:
        'the governed source context does not provide a complete chart-level 黨眾 cardinality rule' as const,
    }),
    Object.freeze({
      id: 'bi_yin_chong_die_threshold_missing',
      observation:
        'the governed source context does not normalize 比印重疊 into a numeric threshold' as const,
    }),
    Object.freeze({
      id: 'tonggen_bi_yin_composition_rule_missing',
      observation:
        'the governed source context does not provide a generalized 通根比印 composition rule' as const,
    }),
  ] as const);

const upstream = Object.freeze({
  contextObservationVersion: GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_VERSION,
  contextObservationDefinitionHash:
    GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_DEFINITION_HASH,
  visibleBijianSupportVersion: GENERAL_NATAL_VISIBLE_BIJIAN_DANG_ZHONG_CONSTITUENT_VERSION,
  visibleBijianSupportDefinitionHash:
    GENERAL_NATAL_VISIBLE_BIJIAN_DANG_ZHONG_CONSTITUENT_DEFINITION_HASH,
  yinshouSupportVersion: GENERAL_NATAL_YINSHOU_DANG_ZHONG_SUPPORT_CONSTITUENT_VERSION,
  yinshouSupportDefinitionHash:
    GENERAL_NATAL_YINSHOU_DANG_ZHONG_SUPPORT_CONSTITUENT_DEFINITION_HASH,
  mukuYuqiTonggenSupportVersion: GENERAL_NATAL_TONGGEN_DANG_ZHONG_SUPPORT_CONSTITUENT_VERSION,
  mukuYuqiTonggenSupportDefinitionHash:
    GENERAL_NATAL_TONGGEN_DANG_ZHONG_SUPPORT_CONSTITUENT_DEFINITION_HASH,
  exactJiaYiJiecaiBijieSupportVersion:
    GENERAL_NATAL_JIA_YI_JIECAI_BIJIE_SUPPORT_CONSTITUENT_VERSION,
  exactJiaYiJiecaiBijieSupportDefinitionHash:
    GENERAL_NATAL_JIA_YI_JIECAI_BIJIE_SUPPORT_CONSTITUENT_DEFINITION_HASH,
  wangChangshengLuTonggenSupportVersion:
    GENERAL_NATAL_WANG_CHANGSHENG_LU_TONGGEN_SUPPORT_CONSTITUENT_VERSION,
  wangChangshengLuTonggenSupportDefinitionHash:
    GENERAL_NATAL_WANG_CHANGSHENG_LU_TONGGEN_SUPPORT_CONSTITUENT_DEFINITION_HASH,
});

export const GENERAL_NATAL_DANG_ZHONG_SUPPORT_CONSTITUENT_CURRENT_SURFACE = Object.freeze({
  visibleBijianSupport: 'AVAILABLE_RESEARCH_ONLY' as const,
  exactJiaYiJiecaiBijieSupport: 'AVAILABLE_RESEARCH_ONLY' as const,
  yinshouSingleFactSupport: 'AVAILABLE_RESEARCH_ONLY' as const,
  mukuYuqiTonggenSupport: 'AVAILABLE_RESEARCH_ONLY' as const,
  wangYangChangshengFourYangLuTonggenSupport: 'AVAILABLE_RESEARCH_ONLY' as const,
});

export const GENERAL_NATAL_DANG_ZHONG_SUPPORT_CONSTITUENT_COMPLETENESS_BLOCKERS =
  Object.freeze({
    generalBijieSupportCoverage: 'INCOMPLETE' as const,
    generalJiecaiToBijieSupport: 'UNAUTHORIZED' as const,
    wholeChartYinshouSupportCoverage: 'INCOMPLETE' as const,
    tonggenSupportCoverage: 'INCOMPLETE' as const,
    dangZhongCardinalityRule: 'MISSING' as const,
    biYinChongDieThreshold: 'MISSING' as const,
    tonggenBiYinCompositionRule: 'MISSING' as const,
  });

export const GENERAL_NATAL_DANG_ZHONG_SUPPORT_CONSTITUENT_COMPLETENESS_EVIDENCE =
  Object.freeze({
    visibleBijianExactOnly:
      GENERAL_NATAL_VISIBLE_BIJIAN_DANG_ZHONG_CONSTITUENT_AUTHORITY.upstreamExactBijianOnly,
    visibleBijianJiecaiBindingInSameAuthority:
      GENERAL_NATAL_VISIBLE_BIJIAN_DANG_ZHONG_CONSTITUENT_AUTHORITY
        .jiecaiComponentBindingAuthorizedByThisReview,
    exactJiaYiPairOnly:
      GENERAL_NATAL_JIA_YI_JIECAI_BIJIE_SUPPORT_CONSTITUENT_AUTHORITY.upstreamExactPairOnly,
    globalJiecaiBijieAliasAuthorized:
      GENERAL_NATAL_JIA_YI_JIECAI_BIJIE_SUPPORT_CONSTITUENT_AUTHORITY
        .globalJiecaiBijieAliasAuthorized,
    canonicalGyeopjaeToBijieMappingAuthorized:
      GENERAL_NATAL_JIA_YI_JIECAI_BIJIE_SUPPORT_CONSTITUENT_AUTHORITY
        .canonicalGyeopjaeToBijieMappingAuthorized,
    wholeChartJiecaiScanAuthorized:
      GENERAL_NATAL_JIA_YI_JIECAI_BIJIE_SUPPORT_CONSTITUENT_AUTHORITY
        .wholeChartJiecaiScanAuthorized,
    yinshouSingleFactInputOnly:
      GENERAL_NATAL_YINSHOU_DANG_ZHONG_SUPPORT_CONSTITUENT_AUTHORITY.upstreamSingleFactInputOnly,
    wholeChartYinScanAuthorized:
      GENERAL_NATAL_YINSHOU_DANG_ZHONG_SUPPORT_CONSTITUENT_AUTHORITY
        .wholeChartYinScanAuthorized,
    yinshouCountAuthorized:
      GENERAL_NATAL_YINSHOU_DANG_ZHONG_SUPPORT_CONSTITUENT_AUTHORITY.yinshouCountAuthorized,
    mukuYuqiEarthTonggenCompletionAuthorized:
      GENERAL_NATAL_TONGGEN_DANG_ZHONG_SUPPORT_CONSTITUENT_AUTHORITY
        .earthTonggenCompletionAuthorized,
    mukuYuqiTonggenCountAuthorized:
      GENERAL_NATAL_TONGGEN_DANG_ZHONG_SUPPORT_CONSTITUENT_AUTHORITY.tonggenCountAuthorized,
    wangChangshengLuYinChangshengSupportAuthorized:
      GENERAL_NATAL_WANG_CHANGSHENG_LU_TONGGEN_SUPPORT_CONSTITUENT_AUTHORITY
        .yinChangshengToTonggenSupportAuthorized,
    wangChangshengLuYinLuSupportAuthorized:
      GENERAL_NATAL_WANG_CHANGSHENG_LU_TONGGEN_SUPPORT_CONSTITUENT_AUTHORITY
        .yinLuToTonggenSupportAuthorized,
    wangChangshengLuEarthLuSupportAuthorized:
      GENERAL_NATAL_WANG_CHANGSHENG_LU_TONGGEN_SUPPORT_CONSTITUENT_AUTHORITY
        .earthLuToTonggenSupportAuthorized,
    wangChangshengLuEarthYuqiSupportResolved:
      GENERAL_NATAL_WANG_CHANGSHENG_LU_TONGGEN_SUPPORT_CONSTITUENT_AUTHORITY
        .earthYuqiToTonggenSupportResolved,
    sourceDangZhongCardinalityRuleAvailable:
      GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CANONICAL_REPRESENTABILITY
        .dangZhongCardinalityRuleAvailable,
    sourceBiYinChongDieThresholdAvailable:
      GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CANONICAL_REPRESENTABILITY
        .biYinChongDieThresholdAvailable,
    sourceTonggenBiYinCompositionRuleAvailable:
      GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CANONICAL_REPRESENTABILITY
        .tongGenBiYinCompositionRuleAvailable,
  });

export const GENERAL_NATAL_DANG_ZHONG_SUPPORT_CONSTITUENT_COMPLETENESS_UNAUTHORIZED_DERIVATIONS =
  Object.freeze([
    'current_constituent_outputs_to_complete_chart_support_collection',
    'current_constituent_array_length_to_support_count',
    'visible_bijian_plus_exact_jia_yi_jiecai_to_complete_bijie_surface',
    'single_fact_yinshou_to_complete_chart_yinshou_surface',
    'current_bounded_tonggen_support_to_exhaustive_tonggen_surface',
    'support_constituent_collection',
    'support_constituent_count',
    'support_constituent_threshold',
    'single_support_constituent_to_dang_zhong',
    'multiple_support_constituents_to_dang_zhong',
    'absence_of_current_constituents_to_zhu_gua',
    'absence_of_current_constituents_to_no_support',
    'bi_yin_chong_die_to_guessed_numeric_threshold',
    'tonggen_plus_bijie_or_yinshou_aggregation',
    'tonggen_bi_yin_to_generalized_formula',
    'support_constituents_to_qiang',
    'support_constituents_to_bu_ruo',
    'support_constituents_to_final_qiang_ruo',
    'support_constituents_to_final_wang_shuai',
    'support_constituents_to_numeric_strength',
    'support_constituents_to_nonnumeric_strength_scalar',
    'support_constituents_to_sizhu_has_root_settlement',
    'support_constituents_to_geju_candidate',
    'support_constituents_to_geju_establishment',
    'support_constituents_to_production_fact',
  ] as const);

export const GENERAL_NATAL_DANG_ZHONG_SUPPORT_CONSTITUENT_COMPLETENESS_REVIEW_DEFINITION_HASH =
  createHash('sha256')
    .update(
      JSON.stringify({
        version: GENERAL_NATAL_DANG_ZHONG_SUPPORT_CONSTITUENT_COMPLETENESS_REVIEW_VERSION,
        scope: GENERAL_NATAL_DANG_ZHONG_SUPPORT_CONSTITUENT_COMPLETENESS_REVIEW_SCOPE,
        decision: GENERAL_NATAL_DANG_ZHONG_SUPPORT_CONSTITUENT_COMPLETENESS_REVIEW_DECISION,
        source: GENERAL_NATAL_DANG_ZHONG_SUPPORT_CONSTITUENT_COMPLETENESS_REVIEW_SOURCE,
        sourceObservations:
          GENERAL_NATAL_DANG_ZHONG_SUPPORT_CONSTITUENT_COMPLETENESS_REVIEW_SOURCE_OBSERVATIONS,
        upstream,
        currentSurface: GENERAL_NATAL_DANG_ZHONG_SUPPORT_CONSTITUENT_CURRENT_SURFACE,
        blockers: GENERAL_NATAL_DANG_ZHONG_SUPPORT_CONSTITUENT_COMPLETENESS_BLOCKERS,
        completenessEvidence:
          GENERAL_NATAL_DANG_ZHONG_SUPPORT_CONSTITUENT_COMPLETENESS_EVIDENCE,
        supportConstituentSurfaceCompleteForAggregation: false,
        supportConstituentCollectionAuthorized: false,
        supportConstituentCountAuthorized: false,
        dangZhongThresholdAuthorized: false,
        dangZhongBooleanResolverAuthorized: false,
        zhuGuaBooleanResolverAuthorized: false,
        tonggenPlusBiYinAggregationAuthorized: false,
        supportToQiangOrBuRuoAuthorized: false,
        finalQiangRuoAuthorized: false,
        finalWangShuaiAuthorized: false,
        productionFactEmissionAuthorized: false,
        productionInvariant: Object.freeze({
          gejuCandidate: 'NOT_EMITTED' as const,
          gejuEstablishmentState: 'NOT_EMITTED' as const,
          generalNatalProductionAuthority: 'BLOCKED' as const,
          p0Cm03: 'OPEN' as const,
          nextProductionSku: 'NONE' as const,
          commerce: 'HOLD' as const,
        }),
        unauthorizedDerivations:
          GENERAL_NATAL_DANG_ZHONG_SUPPORT_CONSTITUENT_COMPLETENESS_UNAUTHORIZED_DERIVATIONS,
      }),
    )
    .digest('hex');

export const GENERAL_NATAL_DANG_ZHONG_SUPPORT_CONSTITUENT_COMPLETENESS_REVIEW_AUTHORITY =
  Object.freeze({
    version: GENERAL_NATAL_DANG_ZHONG_SUPPORT_CONSTITUENT_COMPLETENESS_REVIEW_VERSION,
    definitionHash:
      GENERAL_NATAL_DANG_ZHONG_SUPPORT_CONSTITUENT_COMPLETENESS_REVIEW_DEFINITION_HASH,
    decision: GENERAL_NATAL_DANG_ZHONG_SUPPORT_CONSTITUENT_COMPLETENESS_REVIEW_DECISION,
    source: GENERAL_NATAL_DANG_ZHONG_SUPPORT_CONSTITUENT_COMPLETENESS_REVIEW_SOURCE,
    upstreamContextObservationVersion: upstream.contextObservationVersion,
    upstreamContextObservationDefinitionHash: upstream.contextObservationDefinitionHash,
    upstreamVisibleBijianSupportVersion: upstream.visibleBijianSupportVersion,
    upstreamVisibleBijianSupportDefinitionHash: upstream.visibleBijianSupportDefinitionHash,
    upstreamYinshouSupportVersion: upstream.yinshouSupportVersion,
    upstreamYinshouSupportDefinitionHash: upstream.yinshouSupportDefinitionHash,
    upstreamMukuYuqiTonggenSupportVersion: upstream.mukuYuqiTonggenSupportVersion,
    upstreamMukuYuqiTonggenSupportDefinitionHash: upstream.mukuYuqiTonggenSupportDefinitionHash,
    upstreamExactJiaYiJiecaiBijieSupportVersion: upstream.exactJiaYiJiecaiBijieSupportVersion,
    upstreamExactJiaYiJiecaiBijieSupportDefinitionHash:
      upstream.exactJiaYiJiecaiBijieSupportDefinitionHash,
    upstreamWangChangshengLuTonggenSupportVersion:
      upstream.wangChangshengLuTonggenSupportVersion,
    upstreamWangChangshengLuTonggenSupportDefinitionHash:
      upstream.wangChangshengLuTonggenSupportDefinitionHash,
    directSourceBijieYinshouTonggenSupportContextObserved:
      GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_AUTHORITY
        .directSourceDangZhongComponentsObserved,
    visibleBijianSupportAvailableResearchOnly:
      GENERAL_NATAL_VISIBLE_BIJIAN_DANG_ZHONG_CONSTITUENT_AUTHORITY
        .visibleBijianToDangZhongSupportConstituentAuthorizedResearchOnly,
    exactJiaYiJiecaiBijieSupportAvailableResearchOnly:
      GENERAL_NATAL_JIA_YI_JIECAI_BIJIE_SUPPORT_CONSTITUENT_AUTHORITY
        .exactJiaYiJiecaiToBijieSupportConstituentAuthorizedResearchOnly,
    yinshouSingleFactSupportAvailableResearchOnly:
      GENERAL_NATAL_YINSHOU_DANG_ZHONG_SUPPORT_CONSTITUENT_AUTHORITY
        .yinshouMemberToDangZhongSupportConstituentAuthorizedResearchOnly,
    mukuYuqiTonggenSupportAvailableResearchOnly:
      GENERAL_NATAL_TONGGEN_DANG_ZHONG_SUPPORT_CONSTITUENT_AUTHORITY
        .boundedTonggenToDangZhongSupportConstituentAuthorizedResearchOnly,
    wangYangChangshengFourYangLuTonggenSupportAvailableResearchOnly:
      GENERAL_NATAL_WANG_CHANGSHENG_LU_TONGGEN_SUPPORT_CONSTITUENT_AUTHORITY
        .wangChangshengLuTonggenToSupportConstituentAuthorizedResearchOnly,
    generalBijieSupportCoverage: 'INCOMPLETE' as const,
    generalJiecaiToBijieSupport: 'UNAUTHORIZED' as const,
    wholeChartYinshouSupportCoverage: 'INCOMPLETE' as const,
    tonggenSupportCoverage: 'INCOMPLETE' as const,
    dangZhongCardinalityRule: 'MISSING' as const,
    biYinChongDieThreshold: 'MISSING' as const,
    tonggenBiYinCompositionRule: 'MISSING' as const,
    supportConstituentSurfaceCompleteForAggregation: false,
    supportConstituentCollectionAuthorized: false,
    supportConstituentCountAuthorized: false,
    dangZhongCounterAuthorized: false,
    dangZhongThresholdAuthorized: false,
    dangZhongBooleanResolverAuthorized: false,
    zhuGuaCounterAuthorized: false,
    zhuGuaBooleanResolverAuthorized: false,
    tonggenPlusBiYinAggregationAuthorized: false,
    supportToQiangOrBuRuoAuthorized: false,
    chartLevelQiangRuoClassifierAuthorized: false,
    chartLevelWangShuaiClassifierAuthorized: false,
    numericStrengthAuthorized: false,
    nonNumericStrengthScalarAuthorized: false,
    generalizedRootWeightClassifierAuthorized: false,
    ordinaryStrengthClassificationAuthorized: false,
    sizhuHasRootSettlementAuthorized: false,
    candidateDerivationAuthorized: false,
    establishmentPredicateAuthorized: false,
    candidateFactsEmitted: false,
    establishmentFactsEmitted: false,
    productionFactEmissionAuthorized: false,
    gejuCandidate: 'NOT_EMITTED' as const,
    gejuEstablishmentState: 'NOT_EMITTED' as const,
    generalNatalProductionAuthority: 'BLOCKED' as const,
    p0Cm03: 'OPEN' as const,
    nextProductionSku: 'NONE' as const,
    commerce: 'HOLD' as const,
    unauthorizedDerivations:
      GENERAL_NATAL_DANG_ZHONG_SUPPORT_CONSTITUENT_COMPLETENESS_UNAUTHORIZED_DERIVATIONS,
    authorityBoundary:
      'The selected source names 比劫, 印綬, and 通根扶助 as 黨眾-associated support families, but the currently governed runtime surface remains partial: visible 比肩 is not complete 比劫 coverage; 劫財→比劫 is governed only for one exact 甲/乙 pair; 印綬 support is single-fact only; and Tonggen support remains incomplete across Yin and Earth boundaries. Independently, the governed source context still lacks a complete 黨眾 cardinality rule, 比印重疊 threshold, and generalized 通根比印 composition rule. Therefore no shared constituent collection, count, aggregation, 黨眾/助寡 resolver, strength classification, 四柱有根 settlement, Gyeokguk derivation, or Production emission is authorized.',
  });
