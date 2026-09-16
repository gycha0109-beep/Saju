import { createHash } from 'node:crypto';
import {
  GENERAL_NATAL_JIA_YI_JIECAI_EXACT_RELATION_AUTHORITY,
  GENERAL_NATAL_JIA_YI_JIECAI_EXACT_RELATION_DEFINITION_HASH,
  GENERAL_NATAL_JIA_YI_JIECAI_EXACT_RELATION_VERSION,
  GENERAL_NATAL_JIA_YI_JIECAI_SOURCE_TEXT,
  type JiaYiJiecaiExactRelationEvaluation,
} from './general-natal-jia-yi-jiecai-exact-relation-authority.js';
import {
  GENERAL_NATAL_DANG_ZHONG_COMPONENT_SOURCE_TEXT,
  GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_AUTHORITY,
  GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_DEFINITION_HASH,
  GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_VERSION,
} from './general-natal-dang-zhong-zhu-gua-context-observation-authority.js';

export const GENERAL_NATAL_JIA_YI_JIECAI_BIJIE_SUPPORT_CONSTITUENT_VERSION =
  '0.1.0-research' as const;
export const GENERAL_NATAL_JIA_YI_JIECAI_BIJIE_SUPPORT_CONSTITUENT_SCOPE =
  'exact_jia_yi_jiecai_relation_to_bijie_dang_zhong_support_constituent' as const;
export const GENERAL_NATAL_JIA_YI_JIECAI_BIJIE_SUPPORT_CONSTITUENT_DECISION =
  'AUTHORIZED_RESEARCH_ONLY' as const;

export const GENERAL_NATAL_JIA_YI_BIJIE_CATEGORY_SOURCE_TEXT =
  '甲以甲乙為比劫，庚辛為官煞，比劫有分奪財星之嫌' as const;

export const GENERAL_NATAL_JIA_YI_JIECAI_BIJIE_SUPPORT_CONSTITUENT_SOURCE = Object.freeze({
  title: '子平真詮 / 子平真詮評註',
  url: 'https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm',
  accessedAt: '2026-09-16' as const,
  sourceType: 'classical_transcription_with_commentary' as const,
});

export const GENERAL_NATAL_JIA_YI_JIECAI_BIJIE_SUPPORT_CONSTITUENT_SOURCE_OBSERVATIONS =
  Object.freeze([
    Object.freeze({
      id: 'jia_meets_yi_jiecai_exact_relation',
      sourceText: GENERAL_NATAL_JIA_YI_JIECAI_SOURCE_TEXT,
      observation: 'the selected source directly names 甲 meeting 乙 as 劫財' as const,
    }),
    Object.freeze({
      id: 'jia_jia_yi_bijie_exact_category',
      sourceText: GENERAL_NATAL_JIA_YI_BIJIE_CATEGORY_SOURCE_TEXT,
      observation: 'the selected source directly places 甲 and 乙 under 比劫 for 甲' as const,
    }),
    Object.freeze({
      id: 'bijie_named_as_dang_zhong_component',
      sourceText: GENERAL_NATAL_DANG_ZHONG_COMPONENT_SOURCE_TEXT,
      observation: '比劫 is directly source-associated with 黨眾 composition' as const,
    }),
  ] as const);

export type JiaYiJiecaiBijieSupportConstituentState =
  | 'jia_yi_jiecai_bijie_support_constituent_observed'
  | 'outside_selected_source_pair_scope_no_constituent';

export interface JiaYiJiecaiBijieSupportConstituentEvaluation {
  readonly state: JiaYiJiecaiBijieSupportConstituentState;
  readonly upstreamState: JiaYiJiecaiExactRelationEvaluation['state'];
  readonly sourceRelation: '劫財' | null;
  readonly sourceSupportCategory: '比劫' | null;
  readonly supportConstituentObserved: boolean;
  readonly dangZhongEstablished: false;
  readonly zhuGuaEstablished: false;
  readonly qiangRuoEstablished: false;
  readonly authority: 'research_only';
}

function isExactGovernedJiaYiJiecai(
  evaluation: JiaYiJiecaiExactRelationEvaluation,
): boolean {
  return (
    evaluation.state === 'jia_yi_jiecai_relation_observed' &&
    evaluation.dayMaster === '갑' &&
    evaluation.visibleCounterpartStem === '을' &&
    evaluation.sourceRelation === '劫財' &&
    evaluation.sourceText === GENERAL_NATAL_JIA_YI_JIECAI_SOURCE_TEXT &&
    evaluation.exactRelationObserved === true &&
    evaluation.authority === 'research_only'
  );
}

export function bindExactJiaYiJiecaiToBijieDangZhongSupportConstituent(
  evaluation: JiaYiJiecaiExactRelationEvaluation,
): JiaYiJiecaiBijieSupportConstituentEvaluation {
  if (isExactGovernedJiaYiJiecai(evaluation)) {
    return Object.freeze({
      state: 'jia_yi_jiecai_bijie_support_constituent_observed',
      upstreamState: evaluation.state,
      sourceRelation: '劫財',
      sourceSupportCategory: '比劫',
      supportConstituentObserved: true,
      dangZhongEstablished: false,
      zhuGuaEstablished: false,
      qiangRuoEstablished: false,
      authority: 'research_only',
    });
  }

  return Object.freeze({
    state: 'outside_selected_source_pair_scope_no_constituent',
    upstreamState: evaluation.state,
    sourceRelation: null,
    sourceSupportCategory: null,
    supportConstituentObserved: false,
    dangZhongEstablished: false,
    zhuGuaEstablished: false,
    qiangRuoEstablished: false,
    authority: 'research_only',
  });
}

export const GENERAL_NATAL_JIA_YI_JIECAI_BIJIE_SUPPORT_CONSTITUENT_UNAUTHORIZED_DERIVATIONS =
  Object.freeze([
    'global_jiecai_bijie_alias',
    'jiecai_subset_of_bijie_ontology',
    'canonical_gyeopjae_to_source_jiecai_alias',
    'canonical_gyeopjae_to_bijie_mapping',
    'generalized_jiecai_resolver',
    'same_element_opposite_polarity_to_jiecai_or_bijie',
    'yi_day_master_plus_jia_to_same_result',
    'whole_chart_jiecai_scan',
    'hidden_stem_to_this_constituent',
    'branch_ten_god_to_this_constituent',
    'jiecai_count',
    'bijian_plus_jiecai_count',
    'single_support_constituent_to_dang_zhong',
    'multiple_support_constituents_to_dang_zhong',
    'absence_of_exact_pair_to_zhu_gua',
    'tonggen_biyin_composition',
    'support_constituent_to_qiang',
    'support_constituent_to_bu_ruo',
    'support_constituent_to_final_qiang_ruo',
    'support_constituent_to_final_wang_shuai',
    'support_constituent_to_numeric_strength',
    'support_constituent_to_nonnumeric_strength_scalar',
    'support_constituent_to_geju_candidate',
    'support_constituent_to_geju_establishment',
    'support_constituent_to_production_fact',
  ] as const);

export const GENERAL_NATAL_JIA_YI_JIECAI_BIJIE_SUPPORT_CONSTITUENT_DEFINITION_HASH =
  createHash('sha256')
    .update(
      JSON.stringify({
        version: GENERAL_NATAL_JIA_YI_JIECAI_BIJIE_SUPPORT_CONSTITUENT_VERSION,
        scope: GENERAL_NATAL_JIA_YI_JIECAI_BIJIE_SUPPORT_CONSTITUENT_SCOPE,
        decision: GENERAL_NATAL_JIA_YI_JIECAI_BIJIE_SUPPORT_CONSTITUENT_DECISION,
        source: GENERAL_NATAL_JIA_YI_JIECAI_BIJIE_SUPPORT_CONSTITUENT_SOURCE,
        sourceObservations:
          GENERAL_NATAL_JIA_YI_JIECAI_BIJIE_SUPPORT_CONSTITUENT_SOURCE_OBSERVATIONS,
        upstreamJiaYiJiecaiVersion: GENERAL_NATAL_JIA_YI_JIECAI_EXACT_RELATION_VERSION,
        upstreamJiaYiJiecaiDefinitionHash:
          GENERAL_NATAL_JIA_YI_JIECAI_EXACT_RELATION_DEFINITION_HASH,
        upstreamContextObservationVersion:
          GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_VERSION,
        upstreamContextObservationDefinitionHash:
          GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_DEFINITION_HASH,
        upstreamExactMatcherAuthorized:
          GENERAL_NATAL_JIA_YI_JIECAI_EXACT_RELATION_AUTHORITY
            .jiaYiJiecaiExactPairMatcherAuthorizedResearchOnly,
        upstreamContextRegistryDecision:
          GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_AUTHORITY.decision,
        rawChartFactsConsumed: false,
        canonicalTenGodRecomputationAuthorized: false,
        globalJiecaiBijieAliasAuthorized: false,
        canonicalGyeopjaeToBijieMappingAuthorized: false,
        jiecaiCountAuthorized: false,
        bijianPlusJiecaiCountAuthorized: false,
        dangZhongCounterAuthorized: false,
        dangZhongThresholdAuthorized: false,
        dangZhongBooleanResolverAuthorized: false,
        productionFactEmissionAuthorized: false,
        unauthorizedDerivations:
          GENERAL_NATAL_JIA_YI_JIECAI_BIJIE_SUPPORT_CONSTITUENT_UNAUTHORIZED_DERIVATIONS,
      }),
    )
    .digest('hex');

export const GENERAL_NATAL_JIA_YI_JIECAI_BIJIE_SUPPORT_CONSTITUENT_AUTHORITY = Object.freeze({
  version: GENERAL_NATAL_JIA_YI_JIECAI_BIJIE_SUPPORT_CONSTITUENT_VERSION,
  definitionHash: GENERAL_NATAL_JIA_YI_JIECAI_BIJIE_SUPPORT_CONSTITUENT_DEFINITION_HASH,
  decision: GENERAL_NATAL_JIA_YI_JIECAI_BIJIE_SUPPORT_CONSTITUENT_DECISION,
  upstreamJiaYiJiecaiVersion: GENERAL_NATAL_JIA_YI_JIECAI_EXACT_RELATION_VERSION,
  upstreamJiaYiJiecaiDefinitionHash:
    GENERAL_NATAL_JIA_YI_JIECAI_EXACT_RELATION_DEFINITION_HASH,
  upstreamContextObservationVersion:
    GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_VERSION,
  upstreamContextObservationDefinitionHash:
    GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_DEFINITION_HASH,
  directSourceJiaMeetsYiJiecaiObserved: true,
  directSourceJiaYiBijieCategoryObserved: true,
  directSourceBijieDangZhongComponentObserved: true,
  upstreamJiaYiJiecaiExactRelationAvailableResearchOnly: true,
  upstreamExactPairOnly: true,
  exactJiaYiJiecaiToBijieSupportConstituentAuthorizedResearchOnly: true,
  rawChartFactsConsumed: false,
  canonicalTenGodRecomputationAuthorized: false,
  globalJiecaiBijieAliasAuthorized: false,
  jiecaiSubsetOfBijieOntologyAuthorized: false,
  canonicalGyeopjaeToSourceJiecaiAliasAuthorized: false,
  canonicalGyeopjaeToBijieMappingAuthorized: false,
  generalizedJiecaiResolverAuthorized: false,
  wholeChartJiecaiScanAuthorized: false,
  hiddenStemConsumed: false,
  branchTenGodConsumed: false,
  jiecaiCountAuthorized: false,
  bijianPlusJiecaiCountAuthorized: false,
  dangZhongCounterAuthorized: false,
  dangZhongThresholdAuthorized: false,
  dangZhongBooleanResolverAuthorized: false,
  zhuGuaCounterAuthorized: false,
  zhuGuaBooleanResolverAuthorized: false,
  tonggenBiyinCompositionAuthorized: false,
  constituentToQiangAuthorized: false,
  constituentToBuRuoAuthorized: false,
  chartLevelQiangRuoClassifierAuthorized: false,
  chartLevelWangShuaiClassifierAuthorized: false,
  numericStrengthAuthorized: false,
  nonNumericStrengthScalarAuthorized: false,
  candidateDerivationAuthorized: false,
  establishmentPredicateAuthorized: false,
  candidateFactsEmitted: false,
  establishmentFactsEmitted: false,
  productionFactEmissionAuthorized: false,
  unauthorizedDerivations:
    GENERAL_NATAL_JIA_YI_JIECAI_BIJIE_SUPPORT_CONSTITUENT_UNAUTHORIZED_DERIVATIONS,
  authorityBoundary:
    'The selected source directly states 甲逢乙為劫財 and separately states 甲以甲乙為比劫. The already-governed #647/#649 evaluator represents only that exact 甲-day-master / 乙-visible-stem pair. The separately governed #642/#644 source observation names 比劫 among 黨眾-associated support components. This bridge therefore consumes only the positive #649 exact-pair evaluation and preserves it as one research-only 比劫 support-constituent evidence item. It does not create a global 劫財↔比劫 alias or ontology, map canonical 겁재, scan or count a chart, aggregate 比肩+劫財, establish 黨眾/助寡, classify 強/不弱/final 強弱/旺衰, create a strength scalar, derive Gyeokguk, or emit production facts.',
});
