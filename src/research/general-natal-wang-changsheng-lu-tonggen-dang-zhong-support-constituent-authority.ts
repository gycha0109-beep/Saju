import { createHash } from 'node:crypto';
import {
  GENERAL_NATAL_WANG_CHANGSHENG_LU_BOUNDED_TONGGEN_AUTHORITY,
  GENERAL_NATAL_WANG_CHANGSHENG_LU_BOUNDED_TONGGEN_DEFINITION_HASH,
  GENERAL_NATAL_WANG_CHANGSHENG_LU_BOUNDED_TONGGEN_VERSION,
  type GovernedWangChangshengLuBoundedTonggenEvaluation,
  type GovernedTonggenRootKind,
} from './general-natal-wang-changsheng-lu-bounded-tonggen-authority.js';
import {
  GENERAL_NATAL_TONGGEN_DANG_ZHONG_SUPPORT_CONSTITUENT_AUTHORITY,
  GENERAL_NATAL_TONGGEN_DANG_ZHONG_SUPPORT_CONSTITUENT_DEFINITION_HASH,
  GENERAL_NATAL_TONGGEN_DANG_ZHONG_SUPPORT_CONSTITUENT_VERSION,
} from './general-natal-tonggen-dang-zhong-support-constituent-authority.js';

export const GENERAL_NATAL_WANG_CHANGSHENG_LU_TONGGEN_SUPPORT_CONSTITUENT_VERSION =
  '0.1.0-research' as const;
export const GENERAL_NATAL_WANG_CHANGSHENG_LU_TONGGEN_SUPPORT_CONSTITUENT_SCOPE =
  'governed_wang_yang_changsheng_four_yang_lu_tonggen_to_dang_zhong_support_constituent_evidence' as const;
export const GENERAL_NATAL_WANG_CHANGSHENG_LU_TONGGEN_SUPPORT_CONSTITUENT_DECISION =
  'AUTHORIZED_RESEARCH_ONLY' as const;

export const GENERAL_NATAL_WANG_CHANGSHENG_LU_TONGGEN_SUPPORT_CONSTITUENT_SOURCE =
  Object.freeze({
    ...GENERAL_NATAL_TONGGEN_DANG_ZHONG_SUPPORT_CONSTITUENT_AUTHORITY.source,
    accessedAt: '2026-09-17' as const,
  });

export const GENERAL_NATAL_WANG_CHANGSHENG_LU_TONGGEN_SUPPORT_CONSTITUENT_SOURCE_OBSERVATIONS =
  Object.freeze([
    Object.freeze({
      id: 'tonggen_named_as_dang_zhong_support_component',
      sourceText:
        GENERAL_NATAL_TONGGEN_DANG_ZHONG_SUPPORT_CONSTITUENT_AUTHORITY.sourceComponentText,
      observation:
        '通根扶助 is directly source-associated with 黨眾 composition' as const,
    }),
    Object.freeze({
      id: 'out_of_season_tonggen_bi_yin_party_context',
      sourceText:
        GENERAL_NATAL_TONGGEN_DANG_ZHONG_SUPPORT_CONSTITUENT_AUTHORITY.sourceOutOfSeasonText,
      observation:
        'the selected source gives an out-of-season context where 通根比印 appears inside 黨眾 and 不弱 language' as const,
    }),
  ] as const);

export type WangChangshengLuTonggenSupportConstituentState =
  | 'tonggen_support_constituent_observed'
  | 'no_bounded_tonggen_support_constituent_evidence'
  | 'unresolved_outside_governed_tonggen_scope';

export interface WangChangshengLuTonggenSupportConstituentEvaluation {
  readonly state: WangChangshengLuTonggenSupportConstituentState;
  readonly upstreamState: GovernedWangChangshengLuBoundedTonggenEvaluation['state'];
  readonly sourceRootKind: GovernedTonggenRootKind | null;
  readonly sourceConstituent: '通根' | null;
  readonly sourceSupportPhrase: '通根扶助' | null;
  readonly supportConstituentObserved: boolean;
  readonly globalNotTonggenEstablished: false;
  readonly sizhuHasRootSettled: false;
  readonly dangZhongEstablished: false;
  readonly zhuGuaEstablished: false;
  readonly qiangRuoEstablished: false;
  readonly authority: 'research_only';
}

function isGovernedPositiveWangChangshengLuTonggen(
  evaluation: GovernedWangChangshengLuBoundedTonggenEvaluation,
): evaluation is GovernedWangChangshengLuBoundedTonggenEvaluation & {
  readonly state: 'bounded_tonggen_observed';
  readonly sourceRootKind: GovernedTonggenRootKind;
  readonly tonggenObserved: true;
  readonly authority: 'research_only';
} {
  return (
    evaluation.state === 'bounded_tonggen_observed' &&
    evaluation.tonggenObserved === true &&
    (evaluation.sourceRootKind === '旺' ||
      evaluation.sourceRootKind === '長生' ||
      evaluation.sourceRootKind === '祿') &&
    evaluation.authority === 'research_only' &&
    evaluation.globalNotTonggenEstablished === false &&
    evaluation.sizhuHasRootSettled === false &&
    evaluation.dangZhongEstablished === false &&
    evaluation.zhuGuaEstablished === false &&
    evaluation.qiangRuoEstablished === false
  );
}

export function bindGovernedWangChangshengLuTonggenToDangZhongSupportConstituent(
  evaluation: GovernedWangChangshengLuBoundedTonggenEvaluation,
): WangChangshengLuTonggenSupportConstituentEvaluation {
  if (isGovernedPositiveWangChangshengLuTonggen(evaluation)) {
    return Object.freeze({
      state: 'tonggen_support_constituent_observed',
      upstreamState: evaluation.state,
      sourceRootKind: evaluation.sourceRootKind,
      sourceConstituent: '通根',
      sourceSupportPhrase: '通根扶助',
      supportConstituentObserved: true,
      globalNotTonggenEstablished: false,
      sizhuHasRootSettled: false,
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
      globalNotTonggenEstablished: false,
      sizhuHasRootSettled: false,
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
    globalNotTonggenEstablished: false,
    sizhuHasRootSettled: false,
    dangZhongEstablished: false,
    zhuGuaEstablished: false,
    qiangRuoEstablished: false,
    authority: 'research_only',
  });
}

export const GENERAL_NATAL_WANG_CHANGSHENG_LU_TONGGEN_SUPPORT_CONSTITUENT_UNAUTHORIZED_DERIVATIONS =
  Object.freeze([
    'direct_wang_root_to_support_constituent',
    'direct_changsheng_root_to_support_constituent',
    'direct_lu_root_to_support_constituent',
    'generic_root_to_support_constituent',
    'class_neutral_jia_yi_wood_root_to_support_constituent',
    'yi_yin_to_lu_to_tonggen_support',
    'yi_hai_to_changsheng_to_tonggen_support',
    'yin_changsheng_to_tonggen_support',
    'yin_lu_to_tonggen_support',
    'earth_lu_to_tonggen_support',
    'earth_yuqi_to_tonggen_support',
    'no_evidence_to_global_not_tonggen',
    'no_evidence_to_zhu_gua',
    'no_evidence_to_weak',
    'single_tonggen_support_constituent_to_dang_zhong',
    'multiple_tonggen_support_constituents_to_dang_zhong',
    'tonggen_count',
    'tonggen_threshold_to_dang_zhong',
    'tonggen_plus_bijian_or_yinshou_aggregation',
    'tonggen_support_constituent_to_qiang',
    'tonggen_support_constituent_to_bu_ruo',
    'tonggen_support_constituent_to_final_qiang_ruo',
    'tonggen_support_constituent_to_final_wang_shuai',
    'tonggen_support_constituent_to_sizhu_has_root_settlement',
    'support_constituent_to_numeric_strength',
    'support_constituent_to_nonnumeric_strength_scalar',
    'support_constituent_to_geju_candidate',
    'support_constituent_to_geju_establishment',
    'support_constituent_to_production_fact',
  ] as const);

const upstream = Object.freeze({
  wangChangshengLuTonggenVersion:
    GENERAL_NATAL_WANG_CHANGSHENG_LU_BOUNDED_TONGGEN_VERSION,
  wangChangshengLuTonggenDefinitionHash:
    GENERAL_NATAL_WANG_CHANGSHENG_LU_BOUNDED_TONGGEN_DEFINITION_HASH,
  existingTonggenSupportVersion:
    GENERAL_NATAL_TONGGEN_DANG_ZHONG_SUPPORT_CONSTITUENT_VERSION,
  existingTonggenSupportDefinitionHash:
    GENERAL_NATAL_TONGGEN_DANG_ZHONG_SUPPORT_CONSTITUENT_DEFINITION_HASH,
});

export const GENERAL_NATAL_WANG_CHANGSHENG_LU_TONGGEN_SUPPORT_CONSTITUENT_DEFINITION_HASH =
  createHash('sha256')
    .update(
      JSON.stringify({
        version: GENERAL_NATAL_WANG_CHANGSHENG_LU_TONGGEN_SUPPORT_CONSTITUENT_VERSION,
        scope: GENERAL_NATAL_WANG_CHANGSHENG_LU_TONGGEN_SUPPORT_CONSTITUENT_SCOPE,
        decision: GENERAL_NATAL_WANG_CHANGSHENG_LU_TONGGEN_SUPPORT_CONSTITUENT_DECISION,
        source: GENERAL_NATAL_WANG_CHANGSHENG_LU_TONGGEN_SUPPORT_CONSTITUENT_SOURCE,
        sourceObservations:
          GENERAL_NATAL_WANG_CHANGSHENG_LU_TONGGEN_SUPPORT_CONSTITUENT_SOURCE_OBSERVATIONS,
        upstream,
        upstreamTonggenDecision:
          GENERAL_NATAL_WANG_CHANGSHENG_LU_BOUNDED_TONGGEN_AUTHORITY.decision,
        upstreamExistingSupportDecision:
          GENERAL_NATAL_TONGGEN_DANG_ZHONG_SUPPORT_CONSTITUENT_AUTHORITY.decision,
        directRootClassToSupportConstituentAuthorized: false,
        genericRootToSupportConstituentAuthorized: false,
        classNeutralJiaYiWoodObservationConsumed: false,
        tonggenCountAuthorized: false,
        dangZhongCounterAuthorized: false,
        dangZhongThresholdAuthorized: false,
        dangZhongBooleanResolverAuthorized: false,
        tonggenBijianYinshouAggregationAuthorized: false,
        tonggenSupportToQiangAuthorized: false,
        tonggenSupportToBuRuoAuthorized: false,
        tonggenSupportToSizhuHasRootSettlementAuthorized: false,
        productionFactEmissionAuthorized: false,
        productionInvariant: Object.freeze({
          gejuCandidate: 'NOT_EMITTED' as const,
          gejuEstablishmentState: 'NOT_EMITTED' as const,
          generalNatalProductionAuthority: 'BLOCKED' as const,
          p0Cm03: 'OPEN' as const,
          nextProductionSku: 'NONE' as const,
          commerce: 'HOLD' as const,
        }),
        unauthorizedDerivations:
          GENERAL_NATAL_WANG_CHANGSHENG_LU_TONGGEN_SUPPORT_CONSTITUENT_UNAUTHORIZED_DERIVATIONS,
      }),
    )
    .digest('hex');

export const GENERAL_NATAL_WANG_CHANGSHENG_LU_TONGGEN_SUPPORT_CONSTITUENT_AUTHORITY =
  Object.freeze({
    version: GENERAL_NATAL_WANG_CHANGSHENG_LU_TONGGEN_SUPPORT_CONSTITUENT_VERSION,
    definitionHash:
      GENERAL_NATAL_WANG_CHANGSHENG_LU_TONGGEN_SUPPORT_CONSTITUENT_DEFINITION_HASH,
    decision: GENERAL_NATAL_WANG_CHANGSHENG_LU_TONGGEN_SUPPORT_CONSTITUENT_DECISION,
    source: GENERAL_NATAL_WANG_CHANGSHENG_LU_TONGGEN_SUPPORT_CONSTITUENT_SOURCE,
    upstreamWangChangshengLuTonggenVersion: upstream.wangChangshengLuTonggenVersion,
    upstreamWangChangshengLuTonggenDefinitionHash:
      upstream.wangChangshengLuTonggenDefinitionHash,
    upstreamExistingTonggenSupportVersion: upstream.existingTonggenSupportVersion,
    upstreamExistingTonggenSupportDefinitionHash:
      upstream.existingTonggenSupportDefinitionHash,
    directSourceTonggenDangZhongAssociationObserved:
      GENERAL_NATAL_TONGGEN_DANG_ZHONG_SUPPORT_CONSTITUENT_AUTHORITY
        .directSourceTonggenDangZhongAssociationObserved,
    directSourceOutOfSeasonTonggenBiYinPartyContextObserved:
      GENERAL_NATAL_TONGGEN_DANG_ZHONG_SUPPORT_CONSTITUENT_AUTHORITY
        .directSourceOutOfSeasonTonggenBiYinPartyContextObserved,
    upstreamWangChangshengLuBoundedTonggenAvailableResearchOnly: true,
    existingMukuYuqiTonggenSupportPrecedentAvailableResearchOnly: true,
    wangChangshengLuTonggenToSupportConstituentAuthorizedResearchOnly: true,
    consumesOnlyGovernedTonggenEvaluation: true,
    rawChartFactsConsumed: false,
    directRootClassToSupportConstituentAuthorized: false,
    genericRootToSupportConstituentAuthorized: false,
    classNeutralJiaYiWoodObservationConsumed: false,
    yinChangshengToTonggenSupportAuthorized: false,
    yinLuToTonggenSupportAuthorized: false,
    earthLuToTonggenSupportAuthorized: false,
    earthYuqiToTonggenSupportResolved: false,
    noEvidenceToGlobalNotTonggenAuthorized: false,
    noEvidenceToZhuGuaAuthorized: false,
    noEvidenceToWeakAuthorized: false,
    tonggenCountAuthorized: false,
    dangZhongCounterAuthorized: false,
    dangZhongThresholdAuthorized: false,
    dangZhongBooleanResolverAuthorized: false,
    zhuGuaCounterAuthorized: false,
    zhuGuaBooleanResolverAuthorized: false,
    tonggenBijianYinshouAggregationAuthorized: false,
    tonggenSupportToQiangAuthorized: false,
    tonggenSupportToBuRuoAuthorized: false,
    chartLevelQiangRuoClassifierAuthorized: false,
    chartLevelWangShuaiClassifierAuthorized: false,
    tonggenSupportToSizhuHasRootSettlementAuthorized: false,
    numericStrengthAuthorized: false,
    nonNumericStrengthScalarAuthorized: false,
    candidateDerivationAuthorized: false,
    establishmentPredicateAuthorized: false,
    candidateFactsEmitted: false,
    establishmentFactsEmitted: false,
    productionFactEmissionAuthorized: false,
    gejuCandidate: 'NOT_EMITTED' as const,
    gejuEstablishmentState: 'NOT_EMITTED' as const,
    generalNatalProductionAuthority: 'BLOCKED' as const,
    p0Cm03: 'OPEN' as const,
    nextProductionSku: 'NONE' as const,
    commerce: 'HOLD' as const,
    unauthorizedDerivations:
      GENERAL_NATAL_WANG_CHANGSHENG_LU_TONGGEN_SUPPORT_CONSTITUENT_UNAUTHORIZED_DERIVATIONS,
    authorityBoundary:
      'This research-only adapter consumes only the governed #754/#755 Wang, Yang Changsheng, or four-Yang Lu bounded Tonggen evaluation. A complete positive bounded Tonggen state may become one 通根扶助 support-constituent evidence item under the already-governed #693/#697 source semantic. Root classes are never admitted directly: the #754 Tonggen intermediary is mandatory. No class-neutral Jia/Yi root observation is consumed; Yin Changsheng/Lu and Earth Lu/Yuqi boundaries remain unresolved or unauthorized; absence is non-negative; and Tonggen count, support aggregation, 黨眾/助寡 establishment, 四柱有根 settlement, 強/不弱/final 強弱/旺衰, strength scalars, Gyeokguk, Production, SKU, and Commerce remain unauthorized.',
  });
