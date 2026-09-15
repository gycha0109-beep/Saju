import { describe, expect, test } from 'vitest';
import * as authorityModule from '../src/research/general-natal-yinshou-zheng-pian-source-category-authority.js';
import {
  GENERAL_NATAL_YINSHOU_ZHENG_PIAN_CANONICAL_REPRESENTABILITY,
  GENERAL_NATAL_YINSHOU_ZHENG_PIAN_SOURCE_CATEGORY_AUTHORITY,
  GENERAL_NATAL_YINSHOU_ZHENG_PIAN_SOURCE_CATEGORY_DECISION,
  GENERAL_NATAL_YINSHOU_ZHENG_PIAN_SOURCE_CATEGORY_OBSERVATIONS,
  GENERAL_NATAL_YINSHOU_ZHENG_PIAN_SOURCE_CATEGORY_SOURCE,
  GENERAL_NATAL_YINSHOU_ZHENG_PIAN_SOURCE_TEXT,
  GENERAL_NATAL_YINSHOU_ZHENG_PIAN_UNAUTHORIZED_DERIVATIONS,
} from '../src/research/general-natal-yinshou-zheng-pian-source-category-authority.js';
import {
  GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_DEFINITION_HASH,
  GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_VERSION,
} from '../src/research/general-natal-dang-zhong-zhu-gua-context-observation-authority.js';

describe('Yin-Shou Zheng/Pian source-category authority', () => {
  test('preserves exactly one immutable direct-source observation', () => {
    expect(GENERAL_NATAL_YINSHOU_ZHENG_PIAN_SOURCE_CATEGORY_DECISION).toBe(
      'AUTHORIZED_OBSERVATION_ONLY',
    );
    expect(GENERAL_NATAL_YINSHOU_ZHENG_PIAN_SOURCE_CATEGORY_SOURCE.section).toBe(
      '三十五、論印綬',
    );
    expect(GENERAL_NATAL_YINSHOU_ZHENG_PIAN_SOURCE_CATEGORY_OBSERVATIONS).toHaveLength(1);
    expect(Object.isFrozen(GENERAL_NATAL_YINSHOU_ZHENG_PIAN_SOURCE_CATEGORY_OBSERVATIONS)).toBe(
      true,
    );
    expect(Object.isFrozen(GENERAL_NATAL_YINSHOU_ZHENG_PIAN_SOURCE_CATEGORY_OBSERVATIONS[0])).toBe(
      true,
    );
  });

  test('anchors the source wording that groups 正/偏 variants in 印綬', () => {
    const observation = GENERAL_NATAL_YINSHOU_ZHENG_PIAN_SOURCE_CATEGORY_OBSERVATIONS[0];
    expect(GENERAL_NATAL_YINSHOU_ZHENG_PIAN_SOURCE_TEXT).toContain('正偏同為美格');
    expect(GENERAL_NATAL_YINSHOU_ZHENG_PIAN_SOURCE_TEXT).toContain('印不分偏正，同為一格而論之');
    expect(observation.sourceCategory).toBe('印綬');
    expect(observation.sourceVariantAxis).toBe('正偏');
    expect(observation.zhengPianVariantsGroupedTogether).toBe(true);
    expect(observation.sameGejuTreatmentObserved).toBe(true);
    expect(observation.canonicalMappingAuthorized).toBe(false);
  });

  test('consumes no canonical facts and exports no executable matcher', () => {
    expect(GENERAL_NATAL_YINSHOU_ZHENG_PIAN_CANONICAL_REPRESENTABILITY).toEqual({
      canonicalInputRequired: false,
      chartFactsConsumed: false,
      tenGodFactsConsumed: false,
      stemFactsConsumed: false,
      branchFactsConsumed: false,
      hiddenStemFactsConsumed: false,
      canonicalJeonginToZhengyinMappingAuthorized: false,
      canonicalPyeoninToPianyinMappingAuthorized: false,
      canonicalYinshouResolverAuthorized: false,
      status: 'NOT_REQUIRED_FOR_OBSERVATION_ONLY',
    });
    expect(Object.values(authorityModule).some((value) => typeof value === 'function')).toBe(false);
  });

  test('pins upstream context authority and keeps all escalation fail-closed', () => {
    const authority = GENERAL_NATAL_YINSHOU_ZHENG_PIAN_SOURCE_CATEGORY_AUTHORITY;
    expect(authority.upstreamDangZhongContextVersion).toBe(
      GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_VERSION,
    );
    expect(authority.upstreamDangZhongContextDefinitionHash).toBe(
      GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_DEFINITION_HASH,
    );
    expect(authority.canonicalJeonginToZhengyinMappingAuthorized).toBe(false);
    expect(authority.canonicalPyeoninToPianyinMappingAuthorized).toBe(false);
    expect(authority.canonicalYinshouResolverAuthorized).toBe(false);
    expect(authority.yinshouToDangZhongSupportConstituentAuthorized).toBe(false);
    expect(authority.yinshouCounterAuthorized).toBe(false);
    expect(authority.dangZhongCounterAuthorized).toBe(false);
    expect(authority.dangZhongBooleanResolverAuthorized).toBe(false);
    expect(authority.chartLevelQiangRuoClassifierAuthorized).toBe(false);
    expect(authority.chartLevelWangShuaiClassifierAuthorized).toBe(false);
    expect(authority.numericStrengthAuthorized).toBe(false);
    expect(authority.nonNumericStrengthScalarAuthorized).toBe(false);
    expect(authority.candidateDerivationAuthorized).toBe(false);
    expect(authority.establishmentPredicateAuthorized).toBe(false);
    expect(authority.productionFactEmissionAuthorized).toBe(false);
    expect(GENERAL_NATAL_YINSHOU_ZHENG_PIAN_UNAUTHORIZED_DERIVATIONS).toContain(
      'canonical_jeongin_to_source_zhengyin',
    );
    expect(GENERAL_NATAL_YINSHOU_ZHENG_PIAN_UNAUTHORIZED_DERIVATIONS).toContain(
      'canonical_pyeonin_to_source_pianyin',
    );
  });
});
