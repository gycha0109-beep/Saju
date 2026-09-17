import { describe, expect, test } from 'vitest';
import * as reviewModule from '../src/research/general-natal-dang-zhong-support-constituent-completeness-authority-review.js';
import {
  GENERAL_NATAL_DANG_ZHONG_SUPPORT_CONSTITUENT_COMPLETENESS_BLOCKERS,
  GENERAL_NATAL_DANG_ZHONG_SUPPORT_CONSTITUENT_COMPLETENESS_EVIDENCE,
  GENERAL_NATAL_DANG_ZHONG_SUPPORT_CONSTITUENT_COMPLETENESS_REVIEW_AUTHORITY,
  GENERAL_NATAL_DANG_ZHONG_SUPPORT_CONSTITUENT_COMPLETENESS_REVIEW_DECISION,
  GENERAL_NATAL_DANG_ZHONG_SUPPORT_CONSTITUENT_COMPLETENESS_UNAUTHORIZED_DERIVATIONS,
  GENERAL_NATAL_DANG_ZHONG_SUPPORT_CONSTITUENT_CURRENT_SURFACE,
} from '../src/research/general-natal-dang-zhong-support-constituent-completeness-authority-review.js';
import {
  GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_DEFINITION_HASH,
  GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_VERSION,
} from '../src/research/general-natal-dang-zhong-zhu-gua-context-observation-authority.js';
import {
  GENERAL_NATAL_VISIBLE_BIJIAN_DANG_ZHONG_CONSTITUENT_DEFINITION_HASH,
  GENERAL_NATAL_VISIBLE_BIJIAN_DANG_ZHONG_CONSTITUENT_VERSION,
} from '../src/research/general-natal-visible-bijian-dang-zhong-constituent-authority.js';
import {
  GENERAL_NATAL_YINSHOU_DANG_ZHONG_SUPPORT_CONSTITUENT_DEFINITION_HASH,
  GENERAL_NATAL_YINSHOU_DANG_ZHONG_SUPPORT_CONSTITUENT_VERSION,
} from '../src/research/general-natal-yinshou-dang-zhong-support-constituent-authority.js';
import {
  GENERAL_NATAL_TONGGEN_DANG_ZHONG_SUPPORT_CONSTITUENT_DEFINITION_HASH,
  GENERAL_NATAL_TONGGEN_DANG_ZHONG_SUPPORT_CONSTITUENT_VERSION,
} from '../src/research/general-natal-tonggen-dang-zhong-support-constituent-authority.js';
import {
  GENERAL_NATAL_JIA_YI_JIECAI_BIJIE_SUPPORT_CONSTITUENT_DEFINITION_HASH,
  GENERAL_NATAL_JIA_YI_JIECAI_BIJIE_SUPPORT_CONSTITUENT_VERSION,
} from '../src/research/general-natal-jia-yi-jiecai-bijie-support-constituent-authority.js';
import {
  GENERAL_NATAL_WANG_CHANGSHENG_LU_TONGGEN_SUPPORT_CONSTITUENT_DEFINITION_HASH,
  GENERAL_NATAL_WANG_CHANGSHENG_LU_TONGGEN_SUPPORT_CONSTITUENT_VERSION,
} from '../src/research/general-natal-wang-changsheng-lu-tonggen-dang-zhong-support-constituent-authority.js';

describe('Dang-Zhong support-constituent completeness before aggregation review', () => {
  test('fails closed before aggregation', () => {
    expect(GENERAL_NATAL_DANG_ZHONG_SUPPORT_CONSTITUENT_COMPLETENESS_REVIEW_DECISION).toBe(
      'INCOMPLETE_AGGREGATION_BLOCKED',
    );
    expect(
      GENERAL_NATAL_DANG_ZHONG_SUPPORT_CONSTITUENT_COMPLETENESS_REVIEW_AUTHORITY
        .supportConstituentSurfaceCompleteForAggregation,
    ).toBe(false);
  });

  test('records every currently governed bounded support surface as available research-only', () => {
    expect(GENERAL_NATAL_DANG_ZHONG_SUPPORT_CONSTITUENT_CURRENT_SURFACE).toEqual({
      visibleBijianSupport: 'AVAILABLE_RESEARCH_ONLY',
      exactJiaYiJiecaiBijieSupport: 'AVAILABLE_RESEARCH_ONLY',
      yinshouSingleFactSupport: 'AVAILABLE_RESEARCH_ONLY',
      mukuYuqiTonggenSupport: 'AVAILABLE_RESEARCH_ONLY',
      wangYangChangshengFourYangLuTonggenSupport: 'AVAILABLE_RESEARCH_ONLY',
    });

    const authority =
      GENERAL_NATAL_DANG_ZHONG_SUPPORT_CONSTITUENT_COMPLETENESS_REVIEW_AUTHORITY;
    expect(authority.visibleBijianSupportAvailableResearchOnly).toBe(true);
    expect(authority.exactJiaYiJiecaiBijieSupportAvailableResearchOnly).toBe(true);
    expect(authority.yinshouSingleFactSupportAvailableResearchOnly).toBe(true);
    expect(authority.mukuYuqiTonggenSupportAvailableResearchOnly).toBe(true);
    expect(authority.wangYangChangshengFourYangLuTonggenSupportAvailableResearchOnly).toBe(true);
  });

  test('pins the exact context and five current support authority versions and definition hashes', () => {
    const authority =
      GENERAL_NATAL_DANG_ZHONG_SUPPORT_CONSTITUENT_COMPLETENESS_REVIEW_AUTHORITY;

    expect(authority.upstreamContextObservationVersion).toBe(
      GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_VERSION,
    );
    expect(authority.upstreamContextObservationDefinitionHash).toBe(
      GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_DEFINITION_HASH,
    );
    expect(authority.upstreamVisibleBijianSupportVersion).toBe(
      GENERAL_NATAL_VISIBLE_BIJIAN_DANG_ZHONG_CONSTITUENT_VERSION,
    );
    expect(authority.upstreamVisibleBijianSupportDefinitionHash).toBe(
      GENERAL_NATAL_VISIBLE_BIJIAN_DANG_ZHONG_CONSTITUENT_DEFINITION_HASH,
    );
    expect(authority.upstreamYinshouSupportVersion).toBe(
      GENERAL_NATAL_YINSHOU_DANG_ZHONG_SUPPORT_CONSTITUENT_VERSION,
    );
    expect(authority.upstreamYinshouSupportDefinitionHash).toBe(
      GENERAL_NATAL_YINSHOU_DANG_ZHONG_SUPPORT_CONSTITUENT_DEFINITION_HASH,
    );
    expect(authority.upstreamMukuYuqiTonggenSupportVersion).toBe(
      GENERAL_NATAL_TONGGEN_DANG_ZHONG_SUPPORT_CONSTITUENT_VERSION,
    );
    expect(authority.upstreamMukuYuqiTonggenSupportDefinitionHash).toBe(
      GENERAL_NATAL_TONGGEN_DANG_ZHONG_SUPPORT_CONSTITUENT_DEFINITION_HASH,
    );
    expect(authority.upstreamExactJiaYiJiecaiBijieSupportVersion).toBe(
      GENERAL_NATAL_JIA_YI_JIECAI_BIJIE_SUPPORT_CONSTITUENT_VERSION,
    );
    expect(authority.upstreamExactJiaYiJiecaiBijieSupportDefinitionHash).toBe(
      GENERAL_NATAL_JIA_YI_JIECAI_BIJIE_SUPPORT_CONSTITUENT_DEFINITION_HASH,
    );
    expect(authority.upstreamWangChangshengLuTonggenSupportVersion).toBe(
      GENERAL_NATAL_WANG_CHANGSHENG_LU_TONGGEN_SUPPORT_CONSTITUENT_VERSION,
    );
    expect(authority.upstreamWangChangshengLuTonggenSupportDefinitionHash).toBe(
      GENERAL_NATAL_WANG_CHANGSHENG_LU_TONGGEN_SUPPORT_CONSTITUENT_DEFINITION_HASH,
    );
  });

  test('proves current Bijie support coverage is incomplete', () => {
    const evidence = GENERAL_NATAL_DANG_ZHONG_SUPPORT_CONSTITUENT_COMPLETENESS_EVIDENCE;

    expect(evidence.visibleBijianExactOnly).toBe(true);
    expect(evidence.visibleBijianJiecaiBindingInSameAuthority).toBe(false);
    expect(evidence.exactJiaYiPairOnly).toBe(true);
    expect(evidence.globalJiecaiBijieAliasAuthorized).toBe(false);
    expect(evidence.canonicalGyeopjaeToBijieMappingAuthorized).toBe(false);
    expect(evidence.wholeChartJiecaiScanAuthorized).toBe(false);
    expect(GENERAL_NATAL_DANG_ZHONG_SUPPORT_CONSTITUENT_COMPLETENESS_BLOCKERS.generalBijieSupportCoverage).toBe(
      'INCOMPLETE',
    );
    expect(GENERAL_NATAL_DANG_ZHONG_SUPPORT_CONSTITUENT_COMPLETENESS_BLOCKERS.generalJiecaiToBijieSupport).toBe(
      'UNAUTHORIZED',
    );
  });

  test('proves current Yinshou support is single-fact and not complete whole-chart coverage', () => {
    const evidence = GENERAL_NATAL_DANG_ZHONG_SUPPORT_CONSTITUENT_COMPLETENESS_EVIDENCE;

    expect(evidence.yinshouSingleFactInputOnly).toBe(true);
    expect(evidence.wholeChartYinScanAuthorized).toBe(false);
    expect(evidence.yinshouCountAuthorized).toBe(false);
    expect(
      GENERAL_NATAL_DANG_ZHONG_SUPPORT_CONSTITUENT_COMPLETENESS_BLOCKERS
        .wholeChartYinshouSupportCoverage,
    ).toBe('INCOMPLETE');
  });

  test('proves current Tonggen support coverage remains incomplete', () => {
    const evidence = GENERAL_NATAL_DANG_ZHONG_SUPPORT_CONSTITUENT_COMPLETENESS_EVIDENCE;

    expect(evidence.mukuYuqiEarthTonggenCompletionAuthorized).toBe(false);
    expect(evidence.mukuYuqiTonggenCountAuthorized).toBe(false);
    expect(evidence.wangChangshengLuYinChangshengSupportAuthorized).toBe(false);
    expect(evidence.wangChangshengLuYinLuSupportAuthorized).toBe(false);
    expect(evidence.wangChangshengLuEarthLuSupportAuthorized).toBe(false);
    expect(evidence.wangChangshengLuEarthYuqiSupportResolved).toBe(false);
    expect(GENERAL_NATAL_DANG_ZHONG_SUPPORT_CONSTITUENT_COMPLETENESS_BLOCKERS.tonggenSupportCoverage).toBe(
      'INCOMPLETE',
    );
  });

  test('proves source-side cardinality, repeated-Bi/Yin threshold and Tonggen-Bi/Yin composition are still missing', () => {
    const evidence = GENERAL_NATAL_DANG_ZHONG_SUPPORT_CONSTITUENT_COMPLETENESS_EVIDENCE;

    expect(evidence.sourceDangZhongCardinalityRuleAvailable).toBe(false);
    expect(evidence.sourceBiYinChongDieThresholdAvailable).toBe(false);
    expect(evidence.sourceTonggenBiYinCompositionRuleAvailable).toBe(false);
    expect(GENERAL_NATAL_DANG_ZHONG_SUPPORT_CONSTITUENT_COMPLETENESS_BLOCKERS).toMatchObject({
      dangZhongCardinalityRule: 'MISSING',
      biYinChongDieThreshold: 'MISSING',
      tonggenBiYinCompositionRule: 'MISSING',
    });
  });

  test('exports no executable collection, counter, aggregator, or resolver', () => {
    const exportedFunctions = Object.entries(reviewModule)
      .filter(([, value]) => typeof value === 'function')
      .map(([name]) => name);

    expect(exportedFunctions).toEqual([]);
  });

  test('keeps collection, count, thresholds, booleans, aggregation, settlement and strength unauthorized', () => {
    const authority =
      GENERAL_NATAL_DANG_ZHONG_SUPPORT_CONSTITUENT_COMPLETENESS_REVIEW_AUTHORITY;

    expect(authority.supportConstituentCollectionAuthorized).toBe(false);
    expect(authority.supportConstituentCountAuthorized).toBe(false);
    expect(authority.dangZhongCounterAuthorized).toBe(false);
    expect(authority.dangZhongThresholdAuthorized).toBe(false);
    expect(authority.dangZhongBooleanResolverAuthorized).toBe(false);
    expect(authority.zhuGuaCounterAuthorized).toBe(false);
    expect(authority.zhuGuaBooleanResolverAuthorized).toBe(false);
    expect(authority.tonggenPlusBiYinAggregationAuthorized).toBe(false);
    expect(authority.supportToQiangOrBuRuoAuthorized).toBe(false);
    expect(authority.chartLevelQiangRuoClassifierAuthorized).toBe(false);
    expect(authority.chartLevelWangShuaiClassifierAuthorized).toBe(false);
    expect(authority.numericStrengthAuthorized).toBe(false);
    expect(authority.nonNumericStrengthScalarAuthorized).toBe(false);
    expect(authority.generalizedRootWeightClassifierAuthorized).toBe(false);
    expect(authority.ordinaryStrengthClassificationAuthorized).toBe(false);
    expect(authority.sizhuHasRootSettlementAuthorized).toBe(false);
    expect(authority.candidateDerivationAuthorized).toBe(false);
    expect(authority.establishmentPredicateAuthorized).toBe(false);
    expect(authority.candidateFactsEmitted).toBe(false);
    expect(authority.establishmentFactsEmitted).toBe(false);
    expect(authority.productionFactEmissionAuthorized).toBe(false);
  });

  test('explicitly forbids interpreting current partial evidence as a complete collection', () => {
    const forbidden =
      GENERAL_NATAL_DANG_ZHONG_SUPPORT_CONSTITUENT_COMPLETENESS_UNAUTHORIZED_DERIVATIONS;

    expect(forbidden).toContain('current_constituent_outputs_to_complete_chart_support_collection');
    expect(forbidden).toContain('current_constituent_array_length_to_support_count');
    expect(forbidden).toContain('visible_bijian_plus_exact_jia_yi_jiecai_to_complete_bijie_surface');
    expect(forbidden).toContain('single_fact_yinshou_to_complete_chart_yinshou_surface');
    expect(forbidden).toContain('current_bounded_tonggen_support_to_exhaustive_tonggen_surface');
    expect(forbidden).toContain('tonggen_plus_bijie_or_yinshou_aggregation');
    expect(forbidden).toContain('support_constituents_to_sizhu_has_root_settlement');
    expect(forbidden).toContain('support_constituents_to_production_fact');
  });

  test('preserves the production invariant exactly', () => {
    const authority =
      GENERAL_NATAL_DANG_ZHONG_SUPPORT_CONSTITUENT_COMPLETENESS_REVIEW_AUTHORITY;

    expect(authority.gejuCandidate).toBe('NOT_EMITTED');
    expect(authority.gejuEstablishmentState).toBe('NOT_EMITTED');
    expect(authority.generalNatalProductionAuthority).toBe('BLOCKED');
    expect(authority.p0Cm03).toBe('OPEN');
    expect(authority.nextProductionSku).toBe('NONE');
    expect(authority.commerce).toBe('HOLD');
  });
});
