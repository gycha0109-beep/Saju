import { describe, expect, test } from 'vitest';
import {
  GENERAL_NATAL_JIA_YI_JIECAI_EXACT_RELATION_AUTHORITY,
  GENERAL_NATAL_JIA_YI_JIECAI_EXACT_RELATION_DECISION,
  GENERAL_NATAL_JIA_YI_JIECAI_EXACT_RELATION_SOURCE,
  GENERAL_NATAL_JIA_YI_JIECAI_SOURCE_TEXT,
  GENERAL_NATAL_JIA_YI_JIECAI_EXACT_RELATION_UNAUTHORIZED_DERIVATIONS,
  observeJiaYiJiecaiExactRelation,
} from '../src/research/general-natal-jia-yi-jiecai-exact-relation-authority.js';
import {
  GENERAL_NATAL_VISIBLE_BIJIAN_DANG_ZHONG_CONSTITUENT_DEFINITION_HASH,
  GENERAL_NATAL_VISIBLE_BIJIAN_DANG_ZHONG_CONSTITUENT_VERSION,
} from '../src/research/general-natal-visible-bijian-dang-zhong-constituent-authority.js';

describe('Jia/Yi Jie-Cai exact relation authority', () => {
  test('preserves the exact selected-source clause and authority scope', () => {
    expect(GENERAL_NATAL_JIA_YI_JIECAI_EXACT_RELATION_DECISION).toBe(
      'AUTHORIZED_RESEARCH_ONLY',
    );
    expect(GENERAL_NATAL_JIA_YI_JIECAI_EXACT_RELATION_SOURCE.section).toBe(
      '論十干配合性情',
    );
    expect(GENERAL_NATAL_JIA_YI_JIECAI_SOURCE_TEXT).toBe('甲逢乙為劫財');
  });

  test('observes only exact 갑 day-master plus 을 visible counterpart as source 劫財', () => {
    expect(
      observeJiaYiJiecaiExactRelation({ dayMaster: '갑', visibleCounterpartStem: '을' }),
    ).toEqual({
      state: 'jia_yi_jiecai_relation_observed',
      dayMaster: '갑',
      visibleCounterpartStem: '을',
      sourceRelation: '劫財',
      sourceText: '甲逢乙為劫財',
      exactRelationObserved: true,
      authority: 'research_only',
    });
  });

  test('keeps reversed and nearby pairs outside selected-source scope', () => {
    for (const input of [
      { dayMaster: '을', visibleCounterpartStem: '갑' },
      { dayMaster: '갑', visibleCounterpartStem: '갑' },
      { dayMaster: '병', visibleCounterpartStem: '정' },
      { dayMaster: '갑', visibleCounterpartStem: '계' },
    ] as const) {
      const result = observeJiaYiJiecaiExactRelation(input);
      expect(result.state).toBe('outside_selected_source_pair_scope');
      expect(result.sourceRelation).toBeNull();
      expect(result.sourceText).toBeNull();
      expect(result.exactRelationObserved).toBe(false);
    }
  });

  test('pins the fresh upstream boundary and keeps every escalation fail-closed', () => {
    const authority = GENERAL_NATAL_JIA_YI_JIECAI_EXACT_RELATION_AUTHORITY;
    expect(authority.upstreamVisibleBijianDangZhongVersion).toBe(
      GENERAL_NATAL_VISIBLE_BIJIAN_DANG_ZHONG_CONSTITUENT_VERSION,
    );
    expect(authority.upstreamVisibleBijianDangZhongDefinitionHash).toBe(
      GENERAL_NATAL_VISIBLE_BIJIAN_DANG_ZHONG_CONSTITUENT_DEFINITION_HASH,
    );
    expect(authority.directSourceJiaMeetsYiJiecaiObserved).toBe(true);
    expect(authority.canonicalDayMasterPathGoverned).toBe(true);
    expect(authority.canonicalVisibleStemPathGoverned).toBe(true);
    expect(authority.exactJiaYiPairRepresentable).toBe(true);
    expect(authority.jiaYiJiecaiExactPairMatcherAuthorizedResearchOnly).toBe(true);
    expect(authority.boundedPairInputOnly).toBe(true);
    expect(authority.wholeChartJiecaiScanAuthorized).toBe(false);
    expect(authority.generalizedJiecaiResolverAuthorized).toBe(false);
    expect(authority.canonicalGyeopjaeToSourceJiecaiAliasAuthorized).toBe(false);
    expect(authority.canonicalTenGodRecomputationAuthorized).toBe(false);
    expect(authority.jiecaiToBijieSupportCategoryAuthorized).toBe(false);
    expect(authority.branchTenGodConsumed).toBe(false);
    expect(authority.hiddenStemConsumed).toBe(false);
    expect(authority.dangZhongCounterAuthorized).toBe(false);
    expect(authority.dangZhongBooleanResolverAuthorized).toBe(false);
    expect(authority.zhuGuaCounterAuthorized).toBe(false);
    expect(authority.chartLevelQiangRuoClassifierAuthorized).toBe(false);
    expect(authority.chartLevelWangShuaiClassifierAuthorized).toBe(false);
    expect(authority.numericStrengthAuthorized).toBe(false);
    expect(authority.nonNumericStrengthScalarAuthorized).toBe(false);
    expect(authority.candidateDerivationAuthorized).toBe(false);
    expect(authority.establishmentPredicateAuthorized).toBe(false);
    expect(authority.productionFactEmissionAuthorized).toBe(false);
    expect(GENERAL_NATAL_JIA_YI_JIECAI_EXACT_RELATION_UNAUTHORIZED_DERIVATIONS).toContain(
      'canonical_gyeopjae_to_source_jiecai_global_alias',
    );
    expect(GENERAL_NATAL_JIA_YI_JIECAI_EXACT_RELATION_UNAUTHORIZED_DERIVATIONS).toContain(
      'jiecai_to_bijie_support_category',
    );
  });
});
