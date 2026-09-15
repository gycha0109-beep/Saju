import { describe, expect, test } from 'vitest';
import {
  GENERAL_NATAL_BING_YI_ZHENGYIN_EXACT_RELATION_AUTHORITY,
  GENERAL_NATAL_BING_YI_ZHENGYIN_SOURCE_CLAUSE,
  GENERAL_NATAL_BING_YI_ZHENGYIN_SOURCE_CONTEXT_TEXT,
  observeBingYiZhengyinExactRelation,
} from '../src/research/general-natal-bing-yi-zhengyin-exact-relation-authority.js';
import {
  GENERAL_NATAL_JIA_GUI_ZHENGYIN_EXACT_RELATION_DEFINITION_HASH,
  GENERAL_NATAL_JIA_GUI_ZHENGYIN_EXACT_RELATION_VERSION,
} from '../src/research/general-natal-jia-gui-zhengyin-exact-relation-authority.js';

describe('Bing/Yi Zheng-Yin exact relation authority', () => {
  test('anchors the direct source clause', () => {
    expect(GENERAL_NATAL_BING_YI_ZHENGYIN_SOURCE_CLAUSE).toBe('丙以乙為正印');
    expect(GENERAL_NATAL_BING_YI_ZHENGYIN_SOURCE_CONTEXT_TEXT).toContain('丙以乙為正印');
    expect(GENERAL_NATAL_BING_YI_ZHENGYIN_SOURCE_CONTEXT_TEXT).toContain('餘可類推');
  });

  test('matches only 병 + 을', () => {
    expect(observeBingYiZhengyinExactRelation({ dayMaster: '병', visibleCounterpartStem: '을' })).toEqual({
      state: 'bing_yi_zhengyin_relation_observed',
      dayMaster: '병',
      visibleCounterpartStem: '을',
      sourceRelation: '正印',
      sourceClause: '丙以乙為正印',
      exactRelationObserved: true,
      authority: 'research_only',
    });
    for (const input of [
      { dayMaster: '을', visibleCounterpartStem: '병' },
      { dayMaster: '병', visibleCounterpartStem: '갑' },
      { dayMaster: '갑', visibleCounterpartStem: '계' },
    ] as const) {
      expect(observeBingYiZhengyinExactRelation(input).state).toBe(
        'outside_selected_source_pair_scope',
      );
    }
  });

  test('pins upstream Jia/Gui authority', () => {
    const authority = GENERAL_NATAL_BING_YI_ZHENGYIN_EXACT_RELATION_AUTHORITY;
    expect(authority.upstreamJiaGuiZhengyinVersion).toBe(
      GENERAL_NATAL_JIA_GUI_ZHENGYIN_EXACT_RELATION_VERSION,
    );
    expect(authority.upstreamJiaGuiZhengyinDefinitionHash).toBe(
      GENERAL_NATAL_JIA_GUI_ZHENGYIN_EXACT_RELATION_DEFINITION_HASH,
    );
  });

  test('keeps wider runtime authority fail-closed', () => {
    const authority = GENERAL_NATAL_BING_YI_ZHENGYIN_EXACT_RELATION_AUTHORITY;
    expect(authority.canonicalTenGodFactsConsumed).toBe(false);
    expect(authority.canonicalJeonginToSourceZhengyinAliasAuthorized).toBe(false);
    expect(authority.generalizedZhengyinResolverAuthorized).toBe(false);
    expect(authority.wholeChartZhengyinScanAuthorized).toBe(false);
    expect(authority.hiddenStemConsumed).toBe(false);
    expect(authority.zhengyinToYinshouRuntimeConstituentAuthorized).toBe(false);
    expect(authority.dangZhongBooleanResolverAuthorized).toBe(false);
    expect(authority.chartLevelQiangRuoClassifierAuthorized).toBe(false);
    expect(authority.productionFactEmissionAuthorized).toBe(false);
  });
});
