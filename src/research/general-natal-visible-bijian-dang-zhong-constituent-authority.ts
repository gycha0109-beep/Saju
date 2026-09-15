import { createHash } from 'node:crypto';
import {
  GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_AUTHORITY,
  GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_DEFINITION_HASH,
  GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_VERSION,
  type BijianBoundedLeftOperandEvaluation,
  type BoundedBijianPeerCount,
} from './general-natal-bijian-bounded-left-operand-authority.js';
import {
  GENERAL_NATAL_DANG_ZHONG_COMPONENT_SOURCE_TEXT,
  GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_AUTHORITY,
  GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_DEFINITION_HASH,
  GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_VERSION,
} from './general-natal-dang-zhong-zhu-gua-context-observation-authority.js';

export const GENERAL_NATAL_VISIBLE_BIJIAN_DANG_ZHONG_CONSTITUENT_VERSION =
  '0.1.0-research' as const;
export const GENERAL_NATAL_VISIBLE_BIJIAN_DANG_ZHONG_CONSTITUENT_SCOPE =
  'governed_visible_bijian_to_dang_zhong_support_constituent_binding' as const;
export const GENERAL_NATAL_VISIBLE_BIJIAN_DANG_ZHONG_CONSTITUENT_DECISION =
  'AUTHORIZED_RESEARCH_ONLY' as const;

export const GENERAL_NATAL_VISIBLE_BIJIAN_DANG_ZHONG_CONSTITUENT_SOURCE = Object.freeze({
  title: '子平真詮 / 子平真詮評註',
  section: '論十干得時不旺失時不弱',
  url: 'https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm',
  accessedAt: '2026-09-16',
  sourceType: 'classical_transcription_with_commentary',
});

export const GENERAL_NATAL_BIJIE_FRIEND_SUPPORT_SOURCE_TEXT =
  '蓋比劫如朋友之相扶，通根如室家之可住；干多不如根重' as const;

export const GENERAL_NATAL_VISIBLE_BIJIAN_DANG_ZHONG_SOURCE_OBSERVATIONS = Object.freeze([
  Object.freeze({
    id: 'bijie_named_as_dang_zhong_component',
    sourceText: GENERAL_NATAL_DANG_ZHONG_COMPONENT_SOURCE_TEXT,
    observation: '比劫 is directly source-associated with 黨眾' as const,
  }),
  Object.freeze({
    id: 'bijie_friend_support_analogy',
    sourceText: GENERAL_NATAL_BIJIE_FRIEND_SUPPORT_SOURCE_TEXT,
    observation: '比劫 is directly described as friend-like mutual support' as const,
  }),
] as const);

export type VisibleBijianDangZhongConstituentState =
  | 'visible_bijian_support_constituent_observed'
  | 'no_visible_bijian_support_constituent'
  | 'upstream_bijian_evaluation_unresolved';

export interface VisibleBijianDangZhongConstituentEvaluation {
  readonly state: VisibleBijianDangZhongConstituentState;
  readonly upstreamState: BijianBoundedLeftOperandEvaluation['state'];
  readonly canonicalConstituent: '비견' | null;
  readonly sourceSupportCategory: '比劫' | null;
  readonly visibleBijianCount: 0 | BoundedBijianPeerCount | null;
  readonly supportConstituentObserved: boolean;
  readonly dangZhongEstablished: false;
  readonly zhuGuaEstablished: false;
  readonly qiangRuoEstablished: false;
  readonly authority: 'research_only';
}

function isBoundedPositiveCount(
  count: BijianBoundedLeftOperandEvaluation['peerStemCount'],
): count is BoundedBijianPeerCount {
  return count === 1 || count === 2 || count === 3;
}

export function bindGovernedVisibleBijianToDangZhongSupportConstituent(
  evaluation: BijianBoundedLeftOperandEvaluation,
): VisibleBijianDangZhongConstituentEvaluation {
  if (
    evaluation.state === 'bounded_peer_stem_count_established' &&
    isBoundedPositiveCount(evaluation.peerStemCount) &&
    evaluation.boundedOperand?.kind === 'peer_stem_count' &&
    evaluation.boundedOperand.count === evaluation.peerStemCount &&
    evaluation.propositionId !== null
  ) {
    return Object.freeze({
      state: 'visible_bijian_support_constituent_observed',
      upstreamState: evaluation.state,
      canonicalConstituent: '비견',
      sourceSupportCategory: '比劫',
      visibleBijianCount: evaluation.peerStemCount,
      supportConstituentObserved: true,
      dangZhongEstablished: false,
      zhuGuaEstablished: false,
      qiangRuoEstablished: false,
      authority: 'research_only',
    });
  }

  if (
    evaluation.state === 'no_bounded_peer_stem_operand' &&
    evaluation.peerStemCount === 0 &&
    evaluation.boundedOperand === null &&
    evaluation.propositionId === null
  ) {
    return Object.freeze({
      state: 'no_visible_bijian_support_constituent',
      upstreamState: evaluation.state,
      canonicalConstituent: null,
      sourceSupportCategory: null,
      visibleBijianCount: 0,
      supportConstituentObserved: false,
      dangZhongEstablished: false,
      zhuGuaEstablished: false,
      qiangRuoEstablished: false,
      authority: 'research_only',
    });
  }

  return Object.freeze({
    state: 'upstream_bijian_evaluation_unresolved',
    upstreamState: evaluation.state,
    canonicalConstituent: null,
    sourceSupportCategory: null,
    visibleBijianCount: null,
    supportConstituentObserved: false,
    dangZhongEstablished: false,
    zhuGuaEstablished: false,
    qiangRuoEstablished: false,
    authority: 'research_only',
  });
}

export const GENERAL_NATAL_VISIBLE_BIJIAN_DANG_ZHONG_UNAUTHORIZED_DERIVATIONS = Object.freeze([
  'visible_bijian_count_greater_than_zero_to_dang_zhong',
  'zero_visible_bijian_to_zhu_gua',
  'zero_visible_bijian_to_no_other_support',
  'bijian_plus_jiecai_count',
  'jiecai_to_bijie_support_constituent',
  'pianyin_or_zhengyin_to_yinshou',
  'ten_god_presence_to_dang_zhong',
  'branch_ten_god_to_support_constituent',
  'hidden_stem_to_support_constituent',
  'root_class_to_dang_zhong',
  'support_constituent_count_to_qiang_or_ruo',
  'support_constituent_to_numeric_strength',
  'support_constituent_to_nonnumeric_strength_scalar',
  'support_constituent_to_geju_candidate',
  'support_constituent_to_geju_establishment',
  'support_constituent_to_production_fact',
] as const);

export const GENERAL_NATAL_VISIBLE_BIJIAN_DANG_ZHONG_CONSTITUENT_DEFINITION_HASH = createHash(
  'sha256',
)
  .update(
    JSON.stringify({
      version: GENERAL_NATAL_VISIBLE_BIJIAN_DANG_ZHONG_CONSTITUENT_VERSION,
      scope: GENERAL_NATAL_VISIBLE_BIJIAN_DANG_ZHONG_CONSTITUENT_SCOPE,
      decision: GENERAL_NATAL_VISIBLE_BIJIAN_DANG_ZHONG_CONSTITUENT_DECISION,
      source: GENERAL_NATAL_VISIBLE_BIJIAN_DANG_ZHONG_CONSTITUENT_SOURCE,
      sourceObservations: GENERAL_NATAL_VISIBLE_BIJIAN_DANG_ZHONG_SOURCE_OBSERVATIONS,
      upstreamVisibleBijianVersion: GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_VERSION,
      upstreamVisibleBijianDefinitionHash:
        GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_DEFINITION_HASH,
      upstreamContextObservationVersion:
        GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_VERSION,
      upstreamContextObservationDefinitionHash:
        GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_DEFINITION_HASH,
      upstreamExactBijianOnly: GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_AUTHORITY.exactBijianOnly,
      upstreamContextRegistryDecision:
        GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_AUTHORITY.decision,
      chartFactsConsumed: false,
      rawTenGodRecomputation: false,
      jiecaiConsumed: false,
      yinshouConsumed: false,
      tonggenConsumed: false,
      dangZhongResolverAuthorized: false,
      unauthorizedDerivations: GENERAL_NATAL_VISIBLE_BIJIAN_DANG_ZHONG_UNAUTHORIZED_DERIVATIONS,
      productionFactEmissionAuthorized: false,
    }),
  )
  .digest('hex');

export const GENERAL_NATAL_VISIBLE_BIJIAN_DANG_ZHONG_CONSTITUENT_AUTHORITY = Object.freeze({
  version: GENERAL_NATAL_VISIBLE_BIJIAN_DANG_ZHONG_CONSTITUENT_VERSION,
  definitionHash: GENERAL_NATAL_VISIBLE_BIJIAN_DANG_ZHONG_CONSTITUENT_DEFINITION_HASH,
  decision: GENERAL_NATAL_VISIBLE_BIJIAN_DANG_ZHONG_CONSTITUENT_DECISION,
  upstreamVisibleBijianVersion: GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_VERSION,
  upstreamVisibleBijianDefinitionHash:
    GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_DEFINITION_HASH,
  upstreamContextObservationVersion:
    GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_VERSION,
  upstreamContextObservationDefinitionHash:
    GENERAL_NATAL_DANG_ZHONG_ZHU_GUA_CONTEXT_OBSERVATION_DEFINITION_HASH,
  directSourceBijieDangZhongComponentObserved: true,
  directSourceBijieFriendSupportAnalogyObserved: true,
  upstreamVisibleBijianBindingAvailableResearchOnly: true,
  upstreamExactBijianOnly: GENERAL_NATAL_BIJIAN_BOUNDED_LEFT_OPERAND_AUTHORITY.exactBijianOnly,
  visibleBijianToDangZhongSupportConstituentAuthorizedResearchOnly: true,
  chartFactsConsumed: false,
  rawTenGodRecomputationAuthorized: false,
  jiecaiComponentBindingAuthorizedByThisReview: false,
  yinshouComponentBindingAuthorizedByThisReview: false,
  tonggenComponentBindingAuthorizedByThisReview: false,
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
  unauthorizedDerivations: GENERAL_NATAL_VISIBLE_BIJIAN_DANG_ZHONG_UNAUTHORIZED_DERIVATIONS,
  authorityBoundary:
    'The selected source directly names 比劫 among 黨眾-associated support components and describes 比劫 as friend-like mutual support. The already-governed #613/#618 adapter independently establishes exact visible 比肩 counts from canonical Ten-God facts without conflating 劫財. This bridge consumes only that upstream evaluation and admits positive counts one through three as bounded visible-比肩 support-constituent evidence. It does not recompute Ten-Gods, bind 劫財/印綬/通根, establish 黨眾 or 助寡, classify final 強弱 or 旺衰, create a strength scalar, derive Gyeokguk, or emit production facts.',
});
