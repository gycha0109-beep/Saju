import { createHash } from 'node:crypto';
import {
  GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_AUTHORITY,
  GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_DEFINITION_HASH,
  GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_VERSION,
  type MukuYuqiBoundedTonggenEvaluation,
} from './general-natal-muku-yuqi-bounded-tonggen-authority.js';
import {
  GENERAL_NATAL_DANG_ZHONG_COMPONENT_SOURCE_TEXT,
  GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_AUTHORITY,
  GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_DEFINITION_HASH,
  GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_SOURCE,
  GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_VERSION,
  GENERAL_NATAL_OUT_OF_SEASON_WOOD_PARTY_SOURCE_TEXT,
} from './general-natal-dang-zhong-zhu-gua-context-observation-authority.js';

export const GENERAL_NATAL_TONGGEN_DANG_ZHONG_SUPPORT_CONSTITUENT_VERSION =
  '0.1.0-research' as const;
export const GENERAL_NATAL_TONGGEN_DANG_ZHONG_SUPPORT_CONSTITUENT_SCOPE =
  'governed_bounded_tonggen_to_dang_zhong_support_constituent_evidence' as const;
export const GENERAL_NATAL_TONGGEN_DANG_ZHONG_SUPPORT_CONSTITUENT_DECISION =
  'AUTHORIZED_RESEARCH_ONLY' as const;

export const GENERAL_NATAL_TONGGEN_DANG_ZHONG_SUPPORT_CONSTITUENT_SOURCE = Object.freeze({
  ...GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_SOURCE,
  accessedAt: '2026-09-16' as const,
});

export const GENERAL_NATAL_TONGGEN_DANG_ZHONG_SUPPORT_CONSTITUENT_SOURCE_OBSERVATIONS =
  Object.freeze([
    Object.freeze({
      id: 'tonggen_named_as_dang_zhong_support_component',
      sourceText: GENERAL_NATAL_DANG_ZHONG_COMPONENT_SOURCE_TEXT,
      observation: '通根扶助 is directly source-associated with 黨眾 composition' as const,
    }),
    Object.freeze({
      id: 'out_of_season_tonggen_bi_yin_party_context',
      sourceText: GENERAL_NATAL_OUT_OF_SEASON_WOOD_PARTY_SOURCE_TEXT,
      observation:
        'the source gives an out-of-season context where 通根比印 appears inside 黨眾 and 不弱 language' as const,
    }),
  ] as const);

export type TonggenDangZhongSupportConstituentState =
  | 'tonggen_support_constituent_observed'
  | 'no_bounded_tonggen_support_constituent_evidence'
  | 'unresolved_outside_governed_tonggen_scope';

export interface TonggenDangZhongSupportConstituentEvaluation {
  readonly state: TonggenDangZhongSupportConstituentState;
  readonly upstreamState: MukuYuqiBoundedTonggenEvaluation['state'];
  readonly sourceRootKind: '墓庫' | '餘氣' | null;
  readonly sourceConstituent: '通根' | null;
  readonly sourceSupportPhrase: '通根扶助' | null;
  readonly supportConstituentObserved: boolean;
  readonly dangZhongEstablished: false;
  readonly zhuGuaEstablished: false;
  readonly qiangRuoEstablished: false;
  readonly authority: 'research_only';
}

function isGovernedPositiveBoundedTonggen(
  evaluation: MukuYuqiBoundedTonggenEvaluation,
): evaluation is MukuYuqiBoundedTonggenEvaluation & {
  readonly state: 'bounded_tonggen_observed';
  readonly sourceRootKind: '墓庫' | '餘氣';
  readonly tonggenObserved: true;
  readonly authority: 'research_only';
} {
  return (
    evaluation.state === 'bounded_tonggen_observed' &&
    evaluation.tonggenObserved === true &&
    (evaluation.sourceRootKind === '墓庫' || evaluation.sourceRootKind === '餘氣') &&
    evaluation.authority === 'research_only' &&
    evaluation.dangZhongEstablished === false &&
    evaluation.zhuGuaEstablished === false &&
    evaluation.qiangRuoEstablished === false
  );
}

export function bindGovernedBoundedTonggenToDangZhongSupportConstituent(
  evaluation: MukuYuqiBoundedTonggenEvaluation,
): TonggenDangZhongSupportConstituentEvaluation {
  if (isGovernedPositiveBoundedTonggen(evaluation)) {
    return Object.freeze({
      state: 'tonggen_support_constituent_observed',
      upstreamState: evaluation.state,
      sourceRootKind: evaluation.sourceRootKind,
      sourceConstituent: '通根',
      sourceSupportPhrase: '通根扶助',
      supportConstituentObserved: true,
      dangZhongEstablished: false,
      zhuGuaEstablished: false,
      qiangRuoEstablished: false,
      authority: 'research_only',
    });
  }

  if (evaluation.state === 'unresolved_outside_governed_tonggen_scope') {
    return Object.freeze({
      state: 'unresolved_outside_governed_tonggen_scope',
      upstreamState: evaluation.state,
      sourceRootKind: null,
      sourceConstituent: null,
      sourceSupportPhrase: null,
      supportConstituentObserved: false,
      dangZhongEstablished: false,
      zhuGuaEstablished: false,
      qiangRuoEstablished: false,
      authority: 'research_only',
    });
  }

  return Object.freeze({
    state: 'no_bounded_tonggen_support_constituent_evidence',
    upstreamState: evaluation.state,
    sourceRootKind: null,
    sourceConstituent: null,
    sourceSupportPhrase: null,
    supportConstituentObserved: false,
    dangZhongEstablished: false,
    zhuGuaEstablished: false,
    qiangRuoEstablished: false,
    authority: 'research_only',
  });
}

export const GENERAL_NATAL_TONGGEN_DANG_ZHONG_SUPPORT_CONSTITUENT_UNAUTHORIZED_DERIVATIONS =
  Object.freeze([
    'single_bounded_tonggen_support_constituent_to_dang_zhong',
    'multiple_bounded_tonggen_support_constituents_to_dang_zhong',
    'tonggen_count',
    'tonggen_count_to_dang_zhong',
    'tonggen_threshold_to_dang_zhong',
    'tonggen_absence_to_zhu_gua',
    'tonggen_absence_to_no_other_support',
    'tonggen_plus_bijian_or_yinshou_aggregation',
    'raw_root_rediscovery',
    'hidden_stem_consumption',
    'twelve_growth_consumption',
    'earth_tonggen_completion',
    'generic_root_to_support_constituent',
    'changsheng_lu_wang_to_support_constituent',
    'tonggen_support_constituent_to_qiang',
    'tonggen_support_constituent_to_bu_ruo',
    'tonggen_bi_yin_to_final_qiang_ruo',
    'support_constituent_to_numeric_strength',
    'support_constituent_to_nonnumeric_strength_scalar',
    'support_constituent_to_geju_candidate',
    'support_constituent_to_geju_establishment',
    'support_constituent_to_production_fact',
  ] as const);

export const GENERAL_NATAL_TONGGEN_DANG_ZHONG_SUPPORT_CONSTITUENT_DEFINITION_HASH =
  createHash('sha256')
    .update(
      JSON.stringify({
        version: GENERAL_NATAL_TONGGEN_DANG_ZHONG_SUPPORT_CONSTITUENT_VERSION,
        scope: GENERAL_NATAL_TONGGEN_DANG_ZHONG_SUPPORT_CONSTITUENT_SCOPE,
        decision: GENERAL_NATAL_TONGGEN_DANG_ZHONG_SUPPORT_CONSTITUENT_DECISION,
        source: GENERAL_NATAL_TONGGEN_DANG_ZHONG_SUPPORT_CONSTITUENT_SOURCE,
        sourceObservations:
          GENERAL_NATAL_TONGGEN_DANG_ZHONG_SUPPORT_CONSTITUENT_SOURCE_OBSERVATIONS,
        sourceComponentText: GENERAL_NATAL_DANG_ZHONG_COMPONENT_SOURCE_TEXT,
        sourceOutOfSeasonText: GENERAL_NATAL_OUT_OF_SEASON_WOOD_PARTY_SOURCE_TEXT,
        upstreamBoundedTonggenVersion: GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_VERSION,
        upstreamBoundedTonggenDefinitionHash:
          GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_DEFINITION_HASH,
        upstreamContextObservationVersion:
          GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_VERSION,
        upstreamContextObservationDefinitionHash:
          GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_DEFINITION_HASH,
        upstreamBoundedTonggenDecision:
          GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_AUTHORITY.decision,
        upstreamContextObservationDecision:
          GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_AUTHORITY.decision,
        rawRootRediscoveryAuthorized: false,
        hiddenStemConsumptionAuthorized: false,
        twelveGrowthConsumptionAuthorized: false,
        earthTonggenCompletionAuthorized: false,
        tonggenCountAuthorized: false,
        dangZhongCounterAuthorized: false,
        dangZhongThresholdAuthorized: false,
        dangZhongBooleanResolverAuthorized: false,
        productionFactEmissionAuthorized: false,
        unauthorizedDerivations:
          GENERAL_NATAL_TONGGEN_DANG_ZHONG_SUPPORT_CONSTITUENT_UNAUTHORIZED_DERIVATIONS,
      }),
    )
    .digest('hex');

export const GENERAL_NATAL_TONGGEN_DANG_ZHONG_SUPPORT_CONSTITUENT_AUTHORITY = Object.freeze({
  version: GENERAL_NATAL_TONGGEN_DANG_ZHONG_SUPPORT_CONSTITUENT_VERSION,
  definitionHash: GENERAL_NATAL_TONGGEN_DANG_ZHONG_SUPPORT_CONSTITUENT_DEFINITION_HASH,
  decision: GENERAL_NATAL_TONGGEN_DANG_ZHONG_SUPPORT_CONSTITUENT_DECISION,
  source: GENERAL_NATAL_TONGGEN_DANG_ZHONG_SUPPORT_CONSTITUENT_SOURCE,
  sourceComponentText: GENERAL_NATAL_DANG_ZHONG_COMPONENT_SOURCE_TEXT,
  sourceOutOfSeasonText: GENERAL_NATAL_OUT_OF_SEASON_WOOD_PARTY_SOURCE_TEXT,
  upstreamBoundedTonggenVersion: GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_VERSION,
  upstreamBoundedTonggenDefinitionHash:
    GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_DEFINITION_HASH,
  upstreamContextObservationVersion:
    GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_VERSION,
  upstreamContextObservationDefinitionHash:
    GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_DEFINITION_HASH,
  directSourceTonggenDangZhongAssociationObserved: true,
  directSourceOutOfSeasonTonggenBiYinPartyContextObserved: true,
  upstreamBoundedTonggenAvailableResearchOnly: true,
  boundedTonggenToDangZhongSupportConstituentAuthorizedResearchOnly: true,
  rawRootRediscoveryAuthorized: false,
  hiddenStemConsumptionAuthorized: false,
  twelveGrowthConsumptionAuthorized: false,
  earthTonggenCompletionAuthorized: false,
  genericRootToSupportConstituentAuthorized: false,
  changshengLuWangToSupportConstituentAuthorized: false,
  tonggenCountAuthorized: false,
  dangZhongCounterAuthorized: false,
  dangZhongThresholdAuthorized: false,
  dangZhongBooleanResolverAuthorized: false,
  zhuGuaCounterAuthorized: false,
  zhuGuaBooleanResolverAuthorized: false,
  tonggenBijianYinshouAggregationAuthorized: false,
  tonggenToQiangAuthorized: false,
  tonggenToBuRuoAuthorized: false,
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
    GENERAL_NATAL_TONGGEN_DANG_ZHONG_SUPPORT_CONSTITUENT_UNAUTHORIZED_DERIVATIONS,
  authorityBoundary:
    'The selected source directly names 通根扶助 inside 比劫印綬通根扶助為黨眾 and also gives an out-of-season context where 通根比印 appears inside 黨眾 and 不弱 language. The already-governed #691/#692 authority supplies only bounded research-only non-Earth 墓庫/餘氣 通根 observations. This bridge consumes only that upstream evaluation and preserves a positive bounded 通根 observation as one 黨眾-associated support-constituent evidence item. It does not rediscover roots, consume hidden stems or Twelve-Growth stages, complete Earth 通根, count or aggregate support, establish 黨眾 or 助寡, classify 強/不弱/final 強弱/旺衰, create a strength scalar, derive Gyeokguk, or emit production facts.',
});
