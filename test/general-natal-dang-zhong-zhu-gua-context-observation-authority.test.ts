import { describe, expect, test } from 'vitest';
import * as contextModule from '../src/research/general-natal-dang-zhong-zhu-gua-context-observation-authority.js';
import {
  GENERAL_NATAL_DANG_ZHONG_COMPONENT_SOURCE_TEXT,
  GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_AUTHORITY,
  GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_DEFINITION_HASH,
  GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATIONS,
  GENERAL_NATAL_FIRE_PARTY_WOOD_DRAIN_SOURCE_TEXT,
  GENERAL_NATAL_METAL_PARTY_WOOD_SUPPORT_SPARSE_SOURCE_TEXT,
  GENERAL_NATAL_OUT_OF_SEASON_WOOD_PARTY_SOURCE_TEXT,
} from '../src/research/general-natal-dang-zhong-zhu-gua-context-observation-authority.js';
import {
  GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_SEMANTIC_AXIS_DEFINITION_HASH,
  GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_SEMANTIC_AXIS_VERSION,
} from '../src/research/general-natal-wang-shuai-qiang-ruo-semantic-axis-authority.js';
import {
  GENERAL_NATAL_WOOD_MONTH_COMMAND_DE_SHI_SHI_SHI_DEFINITION_HASH,
  GENERAL_NATAL_WOOD_MONTH_COMMAND_DE_SHI_SHI_SHI_VERSION,
} from '../src/research/general-natal-wood-month-command-de-shi-shi-shi-authority.js';

describe('General Natal Dang-Zhong / Zhu-Gua context observation authority', () => {
  test('preserves exactly four direct selected-source observations', () => {
    expect(GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATIONS).toHaveLength(4);
    expect(GENERAL_NATAL_DANG_ZHONG_COMPONENT_SOURCE_TEXT).toBe(
      '比劫印綬通根扶助為黨眾',
    );
    expect(GENERAL_NATAL_METAL_PARTY_WOOD_SUPPORT_SPARSE_SOURCE_TEXT).toBe(
      '干庚辛而支酉丑，則金之黨眾，而木之助寡',
    );
    expect(GENERAL_NATAL_FIRE_PARTY_WOOD_DRAIN_SOURCE_TEXT).toBe(
      '干丙丁而支巳午，則火之黨眾，木洩氣太重，雖秉令而不強也',
    );
    expect(GENERAL_NATAL_OUT_OF_SEASON_WOOD_PARTY_SOURCE_TEXT).toBe(
      '若比印重疊，年日時支，又通根比印，即為黨眾，雖失時而不弱也',
    );
    expect(
      GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATIONS.every(
        (observation) => observation.normalizedPredicateAuthorized === false,
      ),
    ).toBe(true);
    expect(
      GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_AUTHORITY.sourceObservationCount,
    ).toBe(4);
  });

  test('pins the exact semantic-axis and Wood timing authority identities', () => {
    const authority = GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_AUTHORITY;
    expect(authority.upstreamSemanticAxisVersion).toBe(
      GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_SEMANTIC_AXIS_VERSION,
    );
    expect(authority.upstreamSemanticAxisDefinitionHash).toBe(
      GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_SEMANTIC_AXIS_DEFINITION_HASH,
    );
    expect(authority.upstreamWoodTimingVersion).toBe(
      GENERAL_NATAL_WOOD_MONTH_COMMAND_DE_SHI_SHI_SHI_VERSION,
    );
    expect(authority.upstreamWoodTimingDefinitionHash).toBe(
      GENERAL_NATAL_WOOD_MONTH_COMMAND_DE_SHI_SHI_SHI_DEFINITION_HASH,
    );
    expect(GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_DEFINITION_HASH).toMatch(
      /^[0-9a-f]{64}$/,
    );
  });

  test('keeps incomplete source semantics unresolved instead of inventing operational rules', () => {
    const authority = GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_AUTHORITY;
    expect(authority.dangZhongCounterAuthorized).toBe(false);
    expect(authority.zhuGuaCounterAuthorized).toBe(false);
    expect(authority.dangZhongThresholdAuthorized).toBe(false);
    expect(authority.zhuGuaThresholdAuthorized).toBe(false);
    expect(authority.dangZhongBooleanResolverAuthorized).toBe(false);
    expect(authority.zhuGuaBooleanResolverAuthorized).toBe(false);
    expect(authority.positionalPatternNormalizationAuthorized).toBe(false);
    expect(authority.biYinChongDieThresholdAuthorized).toBe(false);
    expect(authority.tongGenBiYinCompositionAuthorized).toBe(false);
    expect(authority.chartFactsConsumed).toBe(false);
  });

  test('exports no context matcher, counter, threshold, or chart evaluator', () => {
    expect('evaluateDangZhong' in contextModule).toBe(false);
    expect('evaluateZhuGua' in contextModule).toBe(false);
    expect('countDangZhong' in contextModule).toBe(false);
    expect('countZhuGua' in contextModule).toBe(false);
    expect('resolveDangZhong' in contextModule).toBe(false);
    expect('resolveZhuGua' in contextModule).toBe(false);
    expect('evaluateGeneralNatalQiangRuo' in contextModule).toBe(false);
  });

  test('keeps final 旺衰/強弱, strength scalars, Gyeokguk, and production fail-closed', () => {
    const authority = GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_AUTHORITY;
    expect(authority.localContextToFinalQiangRuoAuthorized).toBe(false);
    expect(authority.chartLevelQiangRuoClassifierAuthorized).toBe(false);
    expect(authority.chartLevelWangShuaiClassifierAuthorized).toBe(false);
    expect(authority.numericStrengthAuthorized).toBe(false);
    expect(authority.nonNumericStrengthScalarAuthorized).toBe(false);
    expect(authority.candidateDerivationAuthorized).toBe(false);
    expect(authority.establishmentPredicateAuthorized).toBe(false);
    expect(authority.candidateFactsEmitted).toBe(false);
    expect(authority.establishmentFactsEmitted).toBe(false);
    expect(authority.productionFactEmissionAuthorized).toBe(false);
  });
});
