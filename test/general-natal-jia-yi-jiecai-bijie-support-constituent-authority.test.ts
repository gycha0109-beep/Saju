import { describe, expect, test } from 'vitest';
import {
  observeJiaYiJiecaiExactRelation,
} from '../src/research/general-natal-jia-yi-jiecai-exact-relation-authority.js';
import * as authorityModule from '../src/research/general-natal-jia-yi-jiecai-bijie-support-constituent-authority.js';
import {
  bindExactJiaYiJiecaiToBijieDangZhongSupportConstituent,
  GENERAL_NATAL_JIA_YI_BIJIE_CATEGORY_SOURCE_TEXT,
  GENERAL_NATAL_JIA_YI_JIECAI_BIJIE_SUPPORT_CONSTITUENT_AUTHORITY,
  GENERAL_NATAL_JIA_YI_JIECAI_BIJIE_SUPPORT_CONSTITUENT_DECISION,
  GENERAL_NATAL_JIA_YI_JIECAI_BIJIE_SUPPORT_CONSTITUENT_DEFINITION_HASH,
} from '../src/research/general-natal-jia-yi-jiecai-bijie-support-constituent-authority.js';

describe('General Natal exact Jia-Yi Jie-Cai -> Bi-Jie support constituent authority', () => {
  test('admits only the governed exact Jia/Yi Jie-Cai relation as Bi-Jie support evidence', () => {
    const upstream = observeJiaYiJiecaiExactRelation({
      dayMaster: '갑',
      visibleCounterpartStem: '을',
    });
    const result = bindExactJiaYiJiecaiToBijieDangZhongSupportConstituent(upstream);

    expect(upstream.state).toBe('jia_yi_jiecai_relation_observed');
    expect(result).toEqual({
      state: 'jia_yi_jiecai_bijie_support_constituent_observed',
      upstreamState: 'jia_yi_jiecai_relation_observed',
      sourceRelation: '劫財',
      sourceSupportCategory: '比劫',
      supportConstituentObserved: true,
      dangZhongEstablished: false,
      zhuGuaEstablished: false,
      qiangRuoEstablished: false,
      authority: 'research_only',
    });
  });

  test.each([
    ['갑', '갑'],
    ['을', '갑'],
    ['을', '을'],
    ['갑', '병'],
  ] as const)(
    'keeps out-of-scope pair %s/%s non-negative and emits no support evidence',
    (dayMaster, visibleCounterpartStem) => {
      const upstream = observeJiaYiJiecaiExactRelation({
        dayMaster,
        visibleCounterpartStem,
      });
      const result = bindExactJiaYiJiecaiToBijieDangZhongSupportConstituent(upstream);

      expect(upstream.state).toBe('outside_selected_source_pair_scope');
      expect(result).toEqual({
        state: 'outside_selected_source_pair_scope_no_constituent',
        upstreamState: 'outside_selected_source_pair_scope',
        sourceRelation: null,
        sourceSupportCategory: null,
        supportConstituentObserved: false,
        dangZhongEstablished: false,
        zhuGuaEstablished: false,
        qiangRuoEstablished: false,
        authority: 'research_only',
      });
    },
  );

  test('pins the exact direct source category statement and upstream authorities', () => {
    const authority = GENERAL_NATAL_JIA_YI_JIECAI_BIJIE_SUPPORT_CONSTITUENT_AUTHORITY;

    expect(GENERAL_NATAL_JIA_YI_JIECAI_BIJIE_SUPPORT_CONSTITUENT_DECISION).toBe(
      'AUTHORIZED_RESEARCH_ONLY',
    );
    expect(GENERAL_NATAL_JIA_YI_JIECAI_BIJIE_SUPPORT_CONSTITUENT_DEFINITION_HASH).toMatch(
      /^[0-9a-f]{64}$/,
    );
    expect(GENERAL_NATAL_JIA_YI_BIJIE_CATEGORY_SOURCE_TEXT).toBe(
      '甲以甲乙為比劫，庚辛為官煞，比劫有分奪財星之嫌',
    );
    expect(authority.upstreamJiaYiJiecaiVersion).toBe('0.1.0-research');
    expect(authority.upstreamJiaYiJiecaiDefinitionHash).toMatch(/^[0-9a-f]{64}$/);
    expect(authority.upstreamContextObservationVersion).toBe('0.1.0-research');
    expect(authority.upstreamContextObservationDefinitionHash).toMatch(/^[0-9a-f]{64}$/);
    expect(authority.directSourceJiaMeetsYiJiecaiObserved).toBe(true);
    expect(authority.directSourceJiaYiBijieCategoryObserved).toBe(true);
    expect(authority.directSourceBijieDangZhongComponentObserved).toBe(true);
    expect(authority.upstreamJiaYiJiecaiExactRelationAvailableResearchOnly).toBe(true);
    expect(authority.upstreamExactPairOnly).toBe(true);
    expect(authority.exactJiaYiJiecaiToBijieSupportConstituentAuthorizedResearchOnly).toBe(true);
  });

  test('keeps generalized Jie-Cai/Bi-Jie ontology, counting, resolvers, strength, and Production closed', () => {
    const authority = GENERAL_NATAL_JIA_YI_JIECAI_BIJIE_SUPPORT_CONSTITUENT_AUTHORITY;

    expect(authority.rawChartFactsConsumed).toBe(false);
    expect(authority.canonicalTenGodRecomputationAuthorized).toBe(false);
    expect(authority.globalJiecaiBijieAliasAuthorized).toBe(false);
    expect(authority.jiecaiSubsetOfBijieOntologyAuthorized).toBe(false);
    expect(authority.canonicalGyeopjaeToSourceJiecaiAliasAuthorized).toBe(false);
    expect(authority.canonicalGyeopjaeToBijieMappingAuthorized).toBe(false);
    expect(authority.generalizedJiecaiResolverAuthorized).toBe(false);
    expect(authority.wholeChartJiecaiScanAuthorized).toBe(false);
    expect(authority.hiddenStemConsumed).toBe(false);
    expect(authority.branchTenGodConsumed).toBe(false);
    expect(authority.jiecaiCountAuthorized).toBe(false);
    expect(authority.bijianPlusJiecaiCountAuthorized).toBe(false);
    expect(authority.dangZhongCounterAuthorized).toBe(false);
    expect(authority.dangZhongThresholdAuthorized).toBe(false);
    expect(authority.dangZhongBooleanResolverAuthorized).toBe(false);
    expect(authority.zhuGuaCounterAuthorized).toBe(false);
    expect(authority.zhuGuaBooleanResolverAuthorized).toBe(false);
    expect(authority.tonggenBiyinCompositionAuthorized).toBe(false);
    expect(authority.constituentToQiangAuthorized).toBe(false);
    expect(authority.constituentToBuRuoAuthorized).toBe(false);
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

  test('exports only the bounded bridge function and no scanner/counter', () => {
    const functionExports = Object.entries(authorityModule).filter(
      ([, value]) => typeof value === 'function',
    );

    expect(functionExports).toHaveLength(1);
    expect(functionExports[0]?.[0]).toBe(
      'bindExactJiaYiJiecaiToBijieDangZhongSupportConstituent',
    );
  });
});
