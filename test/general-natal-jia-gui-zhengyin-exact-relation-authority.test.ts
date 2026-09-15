import { describe, expect, test } from 'vitest';
import {
  GENERAL_NATAL_JIA_GUI_ZHENGYIN_EXACT_RELATION_AUTHORITY,
  GENERAL_NATAL_JIA_GUI_ZHENGYIN_EXACT_RELATION_DECISION,
  GENERAL_NATAL_JIA_GUI_ZHENGYIN_EXACT_RELATION_SOURCE,
  GENERAL_NATAL_JIA_GUI_ZHENGYIN_EXACT_RELATION_UNAUTHORIZED_DERIVATIONS,
  GENERAL_NATAL_JIA_GUI_ZHENGYIN_SOURCE_CLAUSE,
  GENERAL_NATAL_JIA_GUI_ZHENGYIN_SOURCE_CONTEXT_TEXT,
  observeJiaGuiZhengyinExactRelation,
} from '../src/research/general-natal-jia-gui-zhengyin-exact-relation-authority.js';
import {
  GENERAL_NATAL_YINSHOU_ZHENG_PIAN_SOURCE_CATEGORY_DEFINITION_HASH,
  GENERAL_NATAL_YINSHOU_ZHENG_PIAN_SOURCE_CATEGORY_VERSION,
} from '../src/research/general-natal-yinshou-zheng-pian-source-category-authority.js';

describe('Jia/Gui Zheng-Yin exact relation authority', () => {
  test('preserves the exact selected-source clause and bounded research scope', () => {
    expect(GENERAL_NATAL_JIA_GUI_ZHENGYIN_EXACT_RELATION_DECISION).toBe(
      'AUTHORIZED_RESEARCH_ONLY',
    );
    expect(GENERAL_NATAL_JIA_GUI_ZHENGYIN_EXACT_RELATION_SOURCE.section).toBe(
      '二十三、論宮分用神配六親',
    );
    expect(GENERAL_NATAL_JIA_GUI_ZHENGYIN_SOURCE_CLAUSE).toBe('甲以癸為正印');
    expect(GENERAL_NATAL_JIA_GUI_ZHENGYIN_SOURCE_CONTEXT_TEXT).toContain('甲以癸為正印');
    expect(GENERAL_NATAL_JIA_GUI_ZHENGYIN_SOURCE_CONTEXT_TEXT).toContain('丙以乙為正印');
    expect(GENERAL_NATAL_JIA_GUI_ZHENGYIN_SOURCE_CONTEXT_TEXT).toContain('餘可類推');
  });

  test('observes only exact 갑 day-master plus 계 visible counterpart as source 正印', () => {
    expect(
      observeJiaGuiZhengyinExactRelation({ dayMaster: '갑', visibleCounterpartStem: '계' }),
    ).toEqual({
      state: 'jia_gui_zhengyin_relation_observed',
      dayMaster: '갑',
      visibleCounterpartStem: '계',
      sourceRelation: '正印',
      sourceClause: '甲以癸為正印',
      exactRelationObserved: true,
      authority: 'research_only',
    });
  });

  test('keeps reversed, nearby, and separately mentioned pairs outside this issue scope', () => {
    for (const input of [
      { dayMaster: '계', visibleCounterpartStem: '갑' },
      { dayMaster: '갑', visibleCounterpartStem: '임' },
      { dayMaster: '갑', visibleCounterpartStem: '갑' },
      { dayMaster: '병', visibleCounterpartStem: '을' },
      { dayMaster: '을', visibleCounterpartStem: '계' },
    ] as const) {
      const result = observeJiaGuiZhengyinExactRelation(input);
      expect(result.state).toBe('outside_selected_source_pair_scope');
      expect(result.sourceRelation).toBeNull();
      expect(result.sourceClause).toBeNull();
      expect(result.exactRelationObserved).toBe(false);
    }
  });

  test('pins upstream authority and keeps canonical/strength escalation fail-closed', () => {
    const authority = GENERAL_NATAL_JIA_GUI_ZHENGYIN_EXACT_RELATION_AUTHORITY;
    expect(authority.upstreamYinshouSourceCategoryVersion).toBe(
      GENERAL_NATAL_YINSHOU_ZHENG_PIAN_SOURCE_CATEGORY_VERSION,
    );
    expect(authority.upstreamYinshouSourceCategoryDefinitionHash).toBe(
      GENERAL_NATAL_YINSHOU_ZHENG_PIAN_SOURCE_CATEGORY_DEFINITION_HASH,
    );
    expect(authority.directSourceJiaGuiZhengyinObserved).toBe(true);
    expect(authority.canonicalDayMasterPathGoverned).toBe(true);
    expect(authority.canonicalVisibleStemPathGoverned).toBe(true);
    expect(authority.exactJiaGuiPairRepresentable).toBe(true);
    expect(authority.jiaGuiZhengyinExactPairMatcherAuthorizedResearchOnly).toBe(true);
    expect(authority.boundedPairInputOnly).toBe(true);
    expect(authority.canonicalTenGodFactsConsumed).toBe(false);
    expect(authority.canonicalJeonginToSourceZhengyinAliasAuthorized).toBe(false);
    expect(authority.canonicalPyeoninToSourcePianyinAliasAuthorized).toBe(false);
    expect(authority.generalizedZhengyinResolverAuthorized).toBe(false);
    expect(authority.wholeChartZhengyinScanAuthorized).toBe(false);
    expect(authority.canonicalTenGodRecomputationAuthorized).toBe(false);
    expect(authority.yinshouRuntimeResolverAuthorized).toBe(false);
    expect(authority.zhengyinToYinshouRuntimeConstituentAuthorized).toBe(false);
    expect(authority.branchTenGodConsumed).toBe(false);
    expect(authority.hiddenStemConsumed).toBe(false);
    expect(authority.dangZhongCounterAuthorized).toBe(false);
    expect(authority.dangZhongBooleanResolverAuthorized).toBe(false);
    expect(authority.chartLevelQiangRuoClassifierAuthorized).toBe(false);
    expect(authority.chartLevelWangShuaiClassifierAuthorized).toBe(false);
    expect(authority.numericStrengthAuthorized).toBe(false);
    expect(authority.nonNumericStrengthScalarAuthorized).toBe(false);
    expect(authority.candidateDerivationAuthorized).toBe(false);
    expect(authority.establishmentPredicateAuthorized).toBe(false);
    expect(authority.productionFactEmissionAuthorized).toBe(false);
    expect(GENERAL_NATAL_JIA_GUI_ZHENGYIN_EXACT_RELATION_UNAUTHORIZED_DERIVATIONS).toContain(
      'canonical_jeongin_to_source_zhengyin_global_alias',
    );
    expect(GENERAL_NATAL_JIA_GUI_ZHENGYIN_EXACT_RELATION_UNAUTHORIZED_DERIVATIONS).toContain(
      'bing_yi_to_zhengyin_under_this_authority',
    );
    expect(GENERAL_NATAL_JIA_GUI_ZHENGYIN_EXACT_RELATION_UNAUTHORIZED_DERIVATIONS).toContain(
      'yu_ke_lei_tui_to_full_ten_stem_zhengyin_table',
    );
  });
});
