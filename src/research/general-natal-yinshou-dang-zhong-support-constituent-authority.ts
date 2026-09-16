import { createHash } from 'node:crypto';
import {
  GENERAL_NATAL_CANONICAL_YIN_YINSHOU_CATEGORY_MEMBER_AUTHORITY,
  GENERAL_NATAL_CANONICAL_YIN_YINSHOU_CATEGORY_MEMBER_DEFINITION_HASH,
  GENERAL_NATAL_CANONICAL_YIN_YINSHOU_CATEGORY_MEMBER_VERSION,
  type CanonicalYinshouCategoryMemberEvaluation,
} from './general-natal-canonical-yin-yinshou-category-member-authority.js';
import {
  GENERAL_NATAL_DANG_ZHONG_COMPONENT_SOURCE_TEXT,
  GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_AUTHORITY,
  GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_DEFINITION_HASH,
  GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_SOURCE,
  GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_VERSION,
} from './general-natal-dang-zhong-zhu-gua-context-observation-authority.js';

export const GENERAL_NATAL_YINSHOU_DANG_ZHONG_SUPPORT_CONSTITUENT_VERSION =
  '0.1.0-research' as const;
export const GENERAL_NATAL_YINSHOU_DANG_ZHONG_SUPPORT_CONSTITUENT_SCOPE =
  'governed_yinshou_member_to_dang_zhong_support_constituent_evidence' as const;
export const GENERAL_NATAL_YINSHOU_DANG_ZHONG_SUPPORT_CONSTITUENT_DECISION =
  'AUTHORIZED_RESEARCH_ONLY' as const;

export const GENERAL_NATAL_YINSHOU_DANG_ZHONG_SUPPORT_CONSTITUENT_SOURCE = Object.freeze({
  ...GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_SOURCE,
  accessedAt: '2026-09-16' as const,
});

export const GENERAL_NATAL_YINSHOU_DANG_ZHONG_SUPPORT_CONSTITUENT_SOURCE_OBSERVATIONS =
  Object.freeze([
    Object.freeze({
      id: 'yinshou_named_as_dang_zhong_component',
      sourceText: GENERAL_NATAL_DANG_ZHONG_COMPONENT_SOURCE_TEXT,
      observation: '印綬 is directly source-associated with 黨眾 support composition' as const,
    }),
  ] as const);

export type YinshouDangZhongSupportConstituentState =
  | 'yinshou_support_constituent_observed'
  | 'no_yinshou_support_constituent_evidence';

export interface YinshouDangZhongSupportConstituentEvaluation {
  readonly state: YinshouDangZhongSupportConstituentState;
  readonly upstreamState: CanonicalYinshouCategoryMemberEvaluation['state'];
  readonly canonicalConstituent: '정인' | '편인' | null;
  readonly sourceMemberLabel: '正印' | '偏印' | null;
  readonly sourceSupportCategory: '印綬' | null;
  readonly supportConstituentObserved: boolean;
  readonly dangZhongEstablished: false;
  readonly zhuGuaEstablished: false;
  readonly qiangRuoEstablished: false;
  readonly authority: 'research_only';
}

function isGovernedPositiveYinshouMember(
  evaluation: CanonicalYinshouCategoryMemberEvaluation,
): evaluation is CanonicalYinshouCategoryMemberEvaluation &
  (
    | {
        readonly canonicalLabel: '정인';
        readonly sourceLabel: '正印';
        readonly sourceCategory: '印綬';
        readonly membershipObserved: true;
      }
    | {
        readonly canonicalLabel: '편인';
        readonly sourceLabel: '偏印';
        readonly sourceCategory: '印綬';
        readonly membershipObserved: true;
      }
  ) {
  if (
    evaluation.state !== 'yinshou_source_category_member_observed' ||
    evaluation.inputStatus !== 'resolved' ||
    evaluation.membershipObserved !== true ||
    evaluation.sourceCategory !== '印綬' ||
    evaluation.authority !== 'research_only'
  ) {
    return false;
  }

  return (
    (evaluation.canonicalLabel === '정인' && evaluation.sourceLabel === '正印') ||
    (evaluation.canonicalLabel === '편인' && evaluation.sourceLabel === '偏印')
  );
}

export function bindGovernedYinshouMemberToDangZhongSupportConstituent(
  evaluation: CanonicalYinshouCategoryMemberEvaluation,
): YinshouDangZhongSupportConstituentEvaluation {
  if (isGovernedPositiveYinshouMember(evaluation)) {
    return Object.freeze({
      state: 'yinshou_support_constituent_observed',
      upstreamState: evaluation.state,
      canonicalConstituent: evaluation.canonicalLabel,
      sourceMemberLabel: evaluation.sourceLabel,
      sourceSupportCategory: '印綬',
      supportConstituentObserved: true,
      dangZhongEstablished: false,
      zhuGuaEstablished: false,
      qiangRuoEstablished: false,
      authority: 'research_only',
    });
  }

  return Object.freeze({
    state: 'no_yinshou_support_constituent_evidence',
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

export const GENERAL_NATAL_YINSHOU_DANG_ZHONG_SUPPORT_CONSTITUENT_UNAUTHORIZED_DERIVATIONS =
  Object.freeze([
    'single_yinshou_support_constituent_to_dang_zhong',
    'multiple_yinshou_support_constituents_to_dang_zhong',
    'yinshou_absence_to_zhu_gua',
    'yinshou_absence_to_no_other_support',
    'whole_chart_yin_scan',
    'yinshou_count',
    'bijie_plus_yinshou_aggregation',
    'tonggen_support_composition',
    'support_constituent_count_to_qiang_or_ruo',
    'support_constituent_to_ordinary_strength',
    'support_constituent_to_numeric_strength',
    'support_constituent_to_nonnumeric_strength_scalar',
    'support_constituent_to_geju_candidate',
    'support_constituent_to_geju_establishment',
    'support_constituent_to_production_fact',
  ] as const);

export const GENERAL_NATAL_YINSHOU_DANG_ZHONG_SUPPORT_CONSTITUENT_DEFINITION_HASH =
  createHash('sha256')
    .update(
      JSON.stringify({
        version: GENERAL_NATAL_YINSHOU_DANG_ZHONG_SUPPORT_CONSTITUENT_VERSION,
        scope: GENERAL_NATAL_YINSHOU_DANG_ZHONG_SUPPORT_CONSTITUENT_SCOPE,
        decision: GENERAL_NATAL_YINSHOU_DANG_ZHONG_SUPPORT_CONSTITUENT_DECISION,
        source: GENERAL_NATAL_YINSHOU_DANG_ZHONG_SUPPORT_CONSTITUENT_SOURCE,
        sourceObservations:
          GENERAL_NATAL_YINSHOU_DANG_ZHONG_SUPPORT_CONSTITUENT_SOURCE_OBSERVATIONS,
        sourceComponentText: GENERAL_NATAL_DANG_ZHONG_COMPONENT_SOURCE_TEXT,
        upstreamYinshouMemberVersion:
          GENERAL_NATAL_CANONICAL_YIN_YINSHOU_CATEGORY_MEMBER_VERSION,
        upstreamYinshouMemberDefinitionHash:
          GENERAL_NATAL_CANONICAL_YIN_YINSHOU_CATEGORY_MEMBER_DEFINITION_HASH,
        upstreamContextObservationVersion:
          GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_VERSION,
        upstreamContextObservationDefinitionHash:
          GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_DEFINITION_HASH,
        upstreamSingleFactInputOnly:
          GENERAL_NATAL_CANONICAL_YIN_YINSHOU_CATEGORY_MEMBER_AUTHORITY.singleFactInputOnly,
        upstreamContextDecision:
          GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_AUTHORITY.decision,
        rawFactStateConsumed: false,
        chartFactsConsumed: false,
        wholeChartYinScanAuthorized: false,
        yinshouCountAuthorized: false,
        dangZhongCounterAuthorized: false,
        dangZhongThresholdAuthorized: false,
        dangZhongBooleanResolverAuthorized: false,
        unauthorizedDerivations:
          GENERAL_NATAL_YINSHOU_DANG_ZHONG_SUPPORT_CONSTITUENT_UNAUTHORIZED_DERIVATIONS,
        productionFactEmissionAuthorized: false,
      }),
    )
    .digest('hex');

export const GENERAL_NATAL_YINSHOU_DANG_ZHONG_SUPPORT_CONSTITUENT_AUTHORITY = Object.freeze({
  version: GENERAL_NATAL_YINSHOU_DANG_ZHONG_SUPPORT_CONSTITUENT_VERSION,
  definitionHash: GENERAL_NATAL_YINSHOU_DANG_ZHONG_SUPPORT_CONSTITUENT_DEFINITION_HASH,
  decision: GENERAL_NATAL_YINSHOU_DANG_ZHONG_SUPPORT_CONSTITUENT_DECISION,
  source: GENERAL_NATAL_YINSHOU_DANG_ZHONG_SUPPORT_CONSTITUENT_SOURCE,
  sourceComponentText: GENERAL_NATAL_DANG_ZHONG_COMPONENT_SOURCE_TEXT,
  upstreamYinshouMemberVersion:
    GENERAL_NATAL_CANONICAL_YIN_YINSHOU_CATEGORY_MEMBER_VERSION,
  upstreamYinshouMemberDefinitionHash:
    GENERAL_NATAL_CANONICAL_YIN_YINSHOU_CATEGORY_MEMBER_DEFINITION_HASH,
  upstreamContextObservationVersion:
    GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_VERSION,
  upstreamContextObservationDefinitionHash:
    GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_DEFINITION_HASH,
  directSourceYinshouDangZhongAssociationObserved: true,
  upstreamSingleFactYinshouMemberAvailableResearchOnly: true,
  upstreamSingleFactInputOnly:
    GENERAL_NATAL_CANONICAL_YIN_YINSHOU_CATEGORY_MEMBER_AUTHORITY.singleFactInputOnly,
  yinshouMemberToDangZhongSupportConstituentAuthorizedResearchOnly: true,
  rawFactStateConsumed: false,
  chartFactsConsumed: false,
  wholeChartYinScanAuthorized: false,
  yinshouCountAuthorized: false,
  bijieYinshouAggregationAuthorized: false,
  tonggenSupportCompositionAuthorized: false,
  dangZhongCounterAuthorized: false,
  dangZhongThresholdAuthorized: false,
  dangZhongBooleanResolverAuthorized: false,
  zhuGuaCounterAuthorized: false,
  zhuGuaBooleanResolverAuthorized: false,
  localConstituentToFinalQiangAuthorized: false,
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
    GENERAL_NATAL_YINSHOU_DANG_ZHONG_SUPPORT_CONSTITUENT_UNAUTHORIZED_DERIVATIONS,
  authorityBoundary:
    'The selected source directly names 印綬 inside the statement 比劫印綬通根扶助為黨眾. The already-governed #678/#680 authority independently admits exactly one resolved canonical 정인 or 편인 fact as a research-only 印綬 source-category member. This bridge consumes only that upstream evaluation and preserves a positive 印綬 member as bounded 黨眾-associated support-constituent evidence. It does not read raw FactState or chart facts, scan or count 印綬, aggregate 比劫 with 印綬, compose 通根 support, establish 黨眾 or 助寡, classify final 強弱 or 旺衰, create a strength scalar, derive Gyeokguk, or emit production facts.',
});
