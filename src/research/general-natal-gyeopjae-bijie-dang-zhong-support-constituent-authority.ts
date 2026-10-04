import { createHash } from 'node:crypto';
import {
  GENERAL_NATAL_CANONICAL_GYEOPJAE_BIJIE_CATEGORY_MEMBER_AUTHORITY,
  GENERAL_NATAL_CANONICAL_GYEOPJAE_BIJIE_CATEGORY_MEMBER_DEFINITION_HASH,
  GENERAL_NATAL_CANONICAL_GYEOPJAE_BIJIE_CATEGORY_MEMBER_VERSION,
  type CanonicalGyeopjaeBijieCategoryMemberEvaluation,
} from './general-natal-canonical-gyeopjae-bijie-category-member-authority.js';
import {
  GENERAL_NATAL_DANG_ZHONG_COMPONENT_SOURCE_TEXT,
  GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_AUTHORITY,
  GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_DEFINITION_HASH,
  GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_SOURCE,
  GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_VERSION,
} from './general-natal-dang-zhong-zhu-gua-context-observation-authority.js';

export const GENERAL_NATAL_GYEOPJAE_BIJIE_DANG_ZHONG_SUPPORT_CONSTITUENT_VERSION =
  '0.1.0-research' as const;
export const GENERAL_NATAL_GYEOPJAE_BIJIE_DANG_ZHONG_SUPPORT_CONSTITUENT_SCOPE =
  'governed_single_gyeopjae_bijie_member_to_dang_zhong_support_constituent' as const;
export const GENERAL_NATAL_GYEOPJAE_BIJIE_DANG_ZHONG_SUPPORT_CONSTITUENT_DECISION =
  'AUTHORIZED_RESEARCH_ONLY' as const;

export const GENERAL_NATAL_GYEOPJAE_BIJIE_DANG_ZHONG_SUPPORT_CONSTITUENT_SOURCE =
  Object.freeze({
    ...GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_SOURCE,
    accessedAt: '2026-10-04' as const,
  });

export const GENERAL_NATAL_GYEOPJAE_BIJIE_DANG_ZHONG_SUPPORT_CONSTITUENT_SOURCE_OBSERVATIONS =
  Object.freeze([
    Object.freeze({
      id: 'bijie_named_as_dang_zhong_component',
      sourceText: GENERAL_NATAL_DANG_ZHONG_COMPONENT_SOURCE_TEXT,
      observation:
        '比劫 is directly source-associated with 黨眾 support composition' as const,
    }),
  ] as const);

export type GyeopjaeBijieDangZhongSupportConstituentState =
  | 'gyeopjae_bijie_support_constituent_observed'
  | 'no_gyeopjae_bijie_support_constituent_evidence';

export interface GyeopjaeBijieDangZhongSupportConstituentEvaluation {
  readonly state: GyeopjaeBijieDangZhongSupportConstituentState;
  readonly upstreamState: CanonicalGyeopjaeBijieCategoryMemberEvaluation['state'];
  readonly canonicalConstituent: '겁재' | null;
  readonly sourceMemberLabel: '劫財' | null;
  readonly sourceSupportCategory: '比劫' | null;
  readonly supportConstituentObserved: boolean;
  readonly dangZhongEstablished: false;
  readonly zhuGuaEstablished: false;
  readonly qiangRuoEstablished: false;
  readonly authority: 'research_only';
}

function isGovernedPositiveGyeopjaeBijieMember(
  evaluation: CanonicalGyeopjaeBijieCategoryMemberEvaluation,
): evaluation is CanonicalGyeopjaeBijieCategoryMemberEvaluation & {
  readonly canonicalLabel: '겁재';
  readonly sourceLabel: '劫財';
  readonly sourceCategory: '比劫';
  readonly membershipObserved: true;
} {
  return (
    evaluation.state === 'bijie_source_category_member_observed' &&
    evaluation.inputStatus === 'resolved' &&
    evaluation.canonicalLabel === '겁재' &&
    evaluation.sourceLabel === '劫財' &&
    evaluation.sourceCategory === '比劫' &&
    evaluation.membershipObserved === true &&
    evaluation.authority === 'research_only'
  );
}

export function bindGovernedGyeopjaeBijieMemberToDangZhongSupportConstituent(
  evaluation: CanonicalGyeopjaeBijieCategoryMemberEvaluation,
): GyeopjaeBijieDangZhongSupportConstituentEvaluation {
  if (isGovernedPositiveGyeopjaeBijieMember(evaluation)) {
    return Object.freeze({
      state: 'gyeopjae_bijie_support_constituent_observed',
      upstreamState: evaluation.state,
      canonicalConstituent: '겁재',
      sourceMemberLabel: '劫財',
      sourceSupportCategory: '比劫',
      supportConstituentObserved: true,
      dangZhongEstablished: false,
      zhuGuaEstablished: false,
      qiangRuoEstablished: false,
      authority: 'research_only',
    });
  }

  return Object.freeze({
    state: 'no_gyeopjae_bijie_support_constituent_evidence',
    upstreamState: evaluation.state,
    canonicalConstituent: null,
    sourceMemberLabel: null,
    sourceSupportCategory: null,
    supportConstituentObserved: false,
    dangZhongEstablished: false,
    zhuGuaEstablished: false,
    qiangRuoEstablished: false,
    authority: 'research_only',
  });
}

export const GENERAL_NATAL_GYEOPJAE_BIJIE_DANG_ZHONG_SUPPORT_CONSTITUENT_UNAUTHORIZED_DERIVATIONS =
  Object.freeze([
    'single_gyeopjae_support_constituent_to_dang_zhong',
    'multiple_bijie_support_constituents_to_dang_zhong',
    'gyeopjae_absence_to_zhu_gua',
    'gyeopjae_absence_to_no_other_support',
    'whole_chart_jiecai_scan',
    'whole_chart_jiecai_count',
    'branch_ten_god_scan',
    'hidden_stem_ten_god_scan',
    'bijian_plus_jiecai_aggregation',
    'complete_bijie_collection',
    'bijie_plus_yinshou_aggregation',
    'tonggen_support_composition',
    'support_constituent_to_qiang_or_ruo',
    'support_constituent_to_final_qiang_ruo',
    'support_constituent_to_final_wang_shuai',
    'support_constituent_to_numeric_strength',
    'support_constituent_to_geju_candidate',
    'support_constituent_to_geju_establishment',
    'support_constituent_to_production_fact',
  ] as const);

export const GENERAL_NATAL_GYEOPJAE_BIJIE_DANG_ZHONG_SUPPORT_CONSTITUENT_DEFINITION_HASH =
  createHash('sha256')
    .update(
      JSON.stringify({
        version:
          GENERAL_NATAL_GYEOPJAE_BIJIE_DANG_ZHONG_SUPPORT_CONSTITUENT_VERSION,
        scope:
          GENERAL_NATAL_GYEOPJAE_BIJIE_DANG_ZHONG_SUPPORT_CONSTITUENT_SCOPE,
        decision:
          GENERAL_NATAL_GYEOPJAE_BIJIE_DANG_ZHONG_SUPPORT_CONSTITUENT_DECISION,
        source:
          GENERAL_NATAL_GYEOPJAE_BIJIE_DANG_ZHONG_SUPPORT_CONSTITUENT_SOURCE,
        sourceObservations:
          GENERAL_NATAL_GYEOPJAE_BIJIE_DANG_ZHONG_SUPPORT_CONSTITUENT_SOURCE_OBSERVATIONS,
        sourceComponentText: GENERAL_NATAL_DANG_ZHONG_COMPONENT_SOURCE_TEXT,
        upstreamGyeopjaeBijieMemberVersion:
          GENERAL_NATAL_CANONICAL_GYEOPJAE_BIJIE_CATEGORY_MEMBER_VERSION,
        upstreamGyeopjaeBijieMemberDefinitionHash:
          GENERAL_NATAL_CANONICAL_GYEOPJAE_BIJIE_CATEGORY_MEMBER_DEFINITION_HASH,
        upstreamContextObservationVersion:
          GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_VERSION,
        upstreamContextObservationDefinitionHash:
          GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_DEFINITION_HASH,
        upstreamSingleFactInputOnly:
          GENERAL_NATAL_CANONICAL_GYEOPJAE_BIJIE_CATEGORY_MEMBER_AUTHORITY
            .singleFactInputOnly,
        upstreamContextDecision:
          GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_AUTHORITY.decision,
        rawFactStateConsumed: false,
        chartFactsConsumed: false,
        wholeChartJiecaiScanAuthorized: false,
        jiecaiCountAuthorized: false,
        bijianJiecaiAggregationAuthorized: false,
        completeBijieCollectionAuthorized: false,
        dangZhongCounterAuthorized: false,
        dangZhongThresholdAuthorized: false,
        dangZhongBooleanResolverAuthorized: false,
        unauthorizedDerivations:
          GENERAL_NATAL_GYEOPJAE_BIJIE_DANG_ZHONG_SUPPORT_CONSTITUENT_UNAUTHORIZED_DERIVATIONS,
        productionFactEmissionAuthorized: false,
      }),
    )
    .digest('hex');

export const GENERAL_NATAL_GYEOPJAE_BIJIE_DANG_ZHONG_SUPPORT_CONSTITUENT_AUTHORITY =
  Object.freeze({
    version:
      GENERAL_NATAL_GYEOPJAE_BIJIE_DANG_ZHONG_SUPPORT_CONSTITUENT_VERSION,
    definitionHash:
      GENERAL_NATAL_GYEOPJAE_BIJIE_DANG_ZHONG_SUPPORT_CONSTITUENT_DEFINITION_HASH,
    decision:
      GENERAL_NATAL_GYEOPJAE_BIJIE_DANG_ZHONG_SUPPORT_CONSTITUENT_DECISION,
    source:
      GENERAL_NATAL_GYEOPJAE_BIJIE_DANG_ZHONG_SUPPORT_CONSTITUENT_SOURCE,
    sourceComponentText: GENERAL_NATAL_DANG_ZHONG_COMPONENT_SOURCE_TEXT,
    upstreamGyeopjaeBijieMemberVersion:
      GENERAL_NATAL_CANONICAL_GYEOPJAE_BIJIE_CATEGORY_MEMBER_VERSION,
    upstreamGyeopjaeBijieMemberDefinitionHash:
      GENERAL_NATAL_CANONICAL_GYEOPJAE_BIJIE_CATEGORY_MEMBER_DEFINITION_HASH,
    upstreamContextObservationVersion:
      GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_VERSION,
    upstreamContextObservationDefinitionHash:
      GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_DEFINITION_HASH,
    directSourceBijieDangZhongAssociationObserved: true,
    upstreamSingleFactGyeopjaeBijieMemberAvailableResearchOnly: true,
    upstreamSingleFactInputOnly:
      GENERAL_NATAL_CANONICAL_GYEOPJAE_BIJIE_CATEGORY_MEMBER_AUTHORITY
        .singleFactInputOnly,
    canonicalGyeopjaeToBijieSupportConstituentAuthorizedResearchOnly: true,
    rawFactStateConsumed: false,
    chartFactsConsumed: false,
    wholeChartJiecaiScanAuthorized: false,
    wholeChartJiecaiCountAuthorized: false,
    branchTenGodScanAuthorized: false,
    hiddenStemTenGodScanAuthorized: false,
    bijianJiecaiAggregationAuthorized: false,
    completeBijieCollectionAuthorized: false,
    bijieYinshouAggregationAuthorized: false,
    tonggenSupportCompositionAuthorized: false,
    dangZhongCounterAuthorized: false,
    dangZhongThresholdAuthorized: false,
    dangZhongBooleanResolverAuthorized: false,
    zhuGuaCounterAuthorized: false,
    zhuGuaBooleanResolverAuthorized: false,
    chartLevelQiangRuoClassifierAuthorized: false,
    chartLevelWangShuaiClassifierAuthorized: false,
    numericStrengthAuthorized: false,
    candidateDerivationAuthorized: false,
    establishmentPredicateAuthorized: false,
    productionFactEmissionAuthorized: false,
    unauthorizedDerivations:
      GENERAL_NATAL_GYEOPJAE_BIJIE_DANG_ZHONG_SUPPORT_CONSTITUENT_UNAUTHORIZED_DERIVATIONS,
    authorityBoundary:
      'This bridge consumes only the newly governed single canonical 겁재 -> 劫財 -> 比劫 category-member evaluation and the independently governed source statement that 比劫 is a 黨眾-associated support family. It therefore authorizes one research-only 겁재/劫財 比劫 support constituent independent of a specific day-master pair. It does not scan or count a chart, aggregate 比肩+劫財, claim complete 比劫 coverage, establish 黨眾/助寡, classify 強弱/旺衰, derive Gyeokguk, or emit Production facts.',
  });
