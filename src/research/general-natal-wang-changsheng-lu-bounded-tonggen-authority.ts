import { createHash } from 'node:crypto';
import type { EarthlyBranch } from '../contracts/calculation.js';
import {
  GENERAL_NATAL_EARTH_WANG_HEAVY_ROOT_COMPLETION_AUTHORITY,
  GENERAL_NATAL_EARTH_WANG_HEAVY_ROOT_COMPLETION_DEFINITION_HASH,
  GENERAL_NATAL_EARTH_WANG_HEAVY_ROOT_COMPLETION_VERSION,
  type CompleteWangHeavyRootEvaluation,
} from './general-natal-earth-wang-heavy-root-completion-authority.js';
import {
  GENERAL_NATAL_CHANGSHENG_ROOT_WEIGHT_BINDING_AUTHORITY,
  GENERAL_NATAL_CHANGSHENG_ROOT_WEIGHT_BINDING_DEFINITION_HASH,
  GENERAL_NATAL_CHANGSHENG_ROOT_WEIGHT_BINDING_VERSION,
  type ChangshengHeavyRootClauseEvaluation,
} from './general-natal-changsheng-root-weight-binding-authority.js';
import {
  GENERAL_NATAL_FOUR_YANG_LU_HEAVY_ROOT_AUTHORITY,
  GENERAL_NATAL_FOUR_YANG_LU_HEAVY_ROOT_DEFINITION_HASH,
  GENERAL_NATAL_FOUR_YANG_LU_HEAVY_ROOT_VERSION,
  type FourYangLuHeavyRootEvaluation,
} from './general-natal-four-yang-lu-heavy-root-authority.js';
import {
  GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_AUTHORITY,
  GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_DEFINITION_HASH,
  GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_VERSION,
} from './general-natal-muku-yuqi-bounded-tonggen-authority.js';

export const GENERAL_NATAL_WANG_CHANGSHENG_LU_BOUNDED_TONGGEN_VERSION =
  '0.1.0-research' as const;
export const GENERAL_NATAL_WANG_CHANGSHENG_LU_BOUNDED_TONGGEN_SCOPE =
  'governed_wang_yang_changsheng_four_yang_lu_root_to_bounded_tonggen_observation' as const;
export const GENERAL_NATAL_WANG_CHANGSHENG_LU_BOUNDED_TONGGEN_DECISION =
  'AUTHORIZED_RESEARCH_ONLY' as const;

export const GENERAL_NATAL_WANG_CHANGSHENG_LU_BOUNDED_TONGGEN_SOURCE = Object.freeze({
  title: '子平真詮 / 子平真詮評註',
  section: '論陰陽生死',
  url: 'https://www.ncc.com.tw/fate/paleo/bg/bg_03.htm',
  accessedAt: '2026-09-17',
  sourceType: 'classical_transcription_with_commentary',
});

export const GENERAL_NATAL_WANG_CHANGSHENG_LU_BOUNDED_TONGGEN_SOURCE_OBSERVATIONS =
  Object.freeze([
    Object.freeze({
      id: 'root_classes_in_tonggen_context',
      observation: '天干通根，不僅祿旺為美，長生、餘氣、墓庫皆其根也。',
      authority: 'direct_selected_source_tonggen_root_context' as const,
    }),
    Object.freeze({
      id: 'sheng_lu_wang_yuqi_mu_all_tonggen',
      observation: '月令休囚，而年日時支中，得生祿旺餘氣墓，皆為通根也。',
      authority: 'direct_selected_source_class_to_tonggen_statement' as const,
    }),
  ] as const);

export type GovernedTonggenRootKind = '旺' | '長生' | '祿';

export type GovernedWangChangshengLuRootEvaluationInput =
  | Readonly<{
      rootKind: '旺';
      evaluation: CompleteWangHeavyRootEvaluation;
    }>
  | Readonly<{
      rootKind: '長生';
      evaluation: ChangshengHeavyRootClauseEvaluation;
    }>
  | Readonly<{
      rootKind: '祿';
      evaluation: FourYangLuHeavyRootEvaluation;
    }>;

export type GovernedWangChangshengLuUpstreamState =
  | CompleteWangHeavyRootEvaluation['heavyRootState']
  | ChangshengHeavyRootClauseEvaluation['heavyRootByChangshengClause']
  | FourYangLuHeavyRootEvaluation['heavyRootState'];

export type GovernedWangChangshengLuBoundedTonggenState =
  | 'bounded_tonggen_observed'
  | 'no_bounded_tonggen_evidence'
  | 'unresolved_outside_governed_tonggen_scope';

export interface GovernedWangChangshengLuBoundedTonggenEvaluation {
  readonly state: GovernedWangChangshengLuBoundedTonggenState;
  readonly requestedRootKind: GovernedTonggenRootKind;
  readonly upstreamState: GovernedWangChangshengLuUpstreamState;
  readonly branch: EarthlyBranch;
  readonly sourceRootKind: GovernedTonggenRootKind | null;
  readonly tonggenObserved: boolean;
  readonly globalNotTonggenEstablished: false;
  readonly sizhuHasRootSettled: false;
  readonly dangZhongEstablished: false;
  readonly zhuGuaEstablished: false;
  readonly qiangRuoEstablished: false;
  readonly authority: 'research_only';
}

function observed(
  requestedRootKind: GovernedTonggenRootKind,
  upstreamState: GovernedWangChangshengLuUpstreamState,
  branch: EarthlyBranch,
): GovernedWangChangshengLuBoundedTonggenEvaluation {
  return Object.freeze({
    state: 'bounded_tonggen_observed',
    requestedRootKind,
    upstreamState,
    branch,
    sourceRootKind: requestedRootKind,
    tonggenObserved: true,
    globalNotTonggenEstablished: false,
    sizhuHasRootSettled: false,
    dangZhongEstablished: false,
    zhuGuaEstablished: false,
    qiangRuoEstablished: false,
    authority: 'research_only',
  });
}

function noEvidence(
  requestedRootKind: GovernedTonggenRootKind,
  upstreamState: GovernedWangChangshengLuUpstreamState,
  branch: EarthlyBranch,
): GovernedWangChangshengLuBoundedTonggenEvaluation {
  return Object.freeze({
    state: 'no_bounded_tonggen_evidence',
    requestedRootKind,
    upstreamState,
    branch,
    sourceRootKind: null,
    tonggenObserved: false,
    globalNotTonggenEstablished: false,
    sizhuHasRootSettled: false,
    dangZhongEstablished: false,
    zhuGuaEstablished: false,
    qiangRuoEstablished: false,
    authority: 'research_only',
  });
}

function unresolved(
  requestedRootKind: GovernedTonggenRootKind,
  upstreamState: GovernedWangChangshengLuUpstreamState,
  branch: EarthlyBranch,
): GovernedWangChangshengLuBoundedTonggenEvaluation {
  return Object.freeze({
    state: 'unresolved_outside_governed_tonggen_scope',
    requestedRootKind,
    upstreamState,
    branch,
    sourceRootKind: null,
    tonggenObserved: false,
    globalNotTonggenEstablished: false,
    sizhuHasRootSettled: false,
    dangZhongEstablished: false,
    zhuGuaEstablished: false,
    qiangRuoEstablished: false,
    authority: 'research_only',
  });
}

export function bindGovernedWangChangshengLuRootToBoundedTonggen(
  input: GovernedWangChangshengLuRootEvaluationInput,
): GovernedWangChangshengLuBoundedTonggenEvaluation {
  if (input.rootKind === '旺') {
    const evaluation = input.evaluation;
    if (
      evaluation.authority === 'research_only' &&
      evaluation.heavyRootState === 'wang_heavy_root_established'
    ) {
      return observed('旺', evaluation.heavyRootState, evaluation.branch);
    }
    return noEvidence('旺', evaluation.heavyRootState, evaluation.branch);
  }

  if (input.rootKind === '長生') {
    const evaluation = input.evaluation;
    if (
      evaluation.authority === 'research_only' &&
      evaluation.heavyRootByChangshengClause === 'established'
    ) {
      return observed('長生', evaluation.heavyRootByChangshengClause, evaluation.branch);
    }
    if (evaluation.heavyRootByChangshengClause === 'excluded_by_yin_exception') {
      return unresolved('長生', evaluation.heavyRootByChangshengClause, evaluation.branch);
    }
    return noEvidence('長生', evaluation.heavyRootByChangshengClause, evaluation.branch);
  }

  const evaluation = input.evaluation;
  if (
    evaluation.authority === 'research_only' &&
    evaluation.heavyRootState === 'lu_heavy_root_established'
  ) {
    return observed('祿', evaluation.heavyRootState, evaluation.branch);
  }
  if (evaluation.heavyRootState === 'outside_governed_yang_non_earth_scope') {
    return unresolved('祿', evaluation.heavyRootState, evaluation.branch);
  }
  return noEvidence('祿', evaluation.heavyRootState, evaluation.branch);
}

export const GENERAL_NATAL_WANG_CHANGSHENG_LU_BOUNDED_TONGGEN_CANONICAL_REPRESENTABILITY =
  Object.freeze({
    consumesOnlyGovernedUpstreamEvaluations: true,
    rawStemBranchRediscoveryRequired: false,
    hiddenStemConsumptionRequired: false,
    localTwelveGrowthReevaluationRequired: false,
    localLuRediscoveryRequired: false,
    mukuYuqiExistingBridgePreservedSeparately: true,
    classNeutralJiaYiWoodObservationConsumed: false,
    status: 'REPRESENTABLE_FROM_GOVERNED_ROOT_EVALUATIONS_ONLY' as const,
  });

export const GENERAL_NATAL_WANG_CHANGSHENG_LU_BOUNDED_TONGGEN_UNAUTHORIZED_DERIVATIONS =
  Object.freeze([
    'generic_root_to_tonggen_equivalence',
    'class_neutral_jia_yi_wood_root_observation_to_tonggen',
    'yi_yin_to_lu_to_tonggen',
    'yi_hai_to_changsheng_to_tonggen',
    'yin_changsheng_to_tonggen',
    'yin_lu_to_tonggen',
    'earth_lu_to_tonggen',
    'earth_yuqi_completion',
    'upstream_nonmatch_to_global_not_tonggen',
    'bounded_no_evidence_to_global_not_tonggen',
    'bounded_tonggen_to_sizhu_has_root_settlement',
    'tonggen_count_to_dang_zhong',
    'tonggen_to_dang_zhong_establishment',
    'tonggen_absence_to_zhu_gua',
    'tonggen_to_qiang',
    'tonggen_to_bu_ruo',
    'tonggen_to_final_qiang_ruo',
    'tonggen_to_final_wang_shuai',
    'tonggen_to_numeric_strength',
    'tonggen_to_nonnumeric_strength_scalar',
    'tonggen_to_geju_candidate',
    'tonggen_to_geju_establishment',
    'tonggen_to_production_fact',
  ] as const);

const upstream = Object.freeze({
  wangVersion: GENERAL_NATAL_EARTH_WANG_HEAVY_ROOT_COMPLETION_VERSION,
  wangDefinitionHash: GENERAL_NATAL_EARTH_WANG_HEAVY_ROOT_COMPLETION_DEFINITION_HASH,
  changshengVersion: GENERAL_NATAL_CHANGSHENG_ROOT_WEIGHT_BINDING_VERSION,
  changshengDefinitionHash: GENERAL_NATAL_CHANGSHENG_ROOT_WEIGHT_BINDING_DEFINITION_HASH,
  fourYangLuVersion: GENERAL_NATAL_FOUR_YANG_LU_HEAVY_ROOT_VERSION,
  fourYangLuDefinitionHash: GENERAL_NATAL_FOUR_YANG_LU_HEAVY_ROOT_DEFINITION_HASH,
  mukuYuqiTonggenVersion: GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_VERSION,
  mukuYuqiTonggenDefinitionHash: GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_DEFINITION_HASH,
});

export const GENERAL_NATAL_WANG_CHANGSHENG_LU_BOUNDED_TONGGEN_DEFINITION_HASH =
  createHash('sha256')
    .update(
      JSON.stringify({
        version: GENERAL_NATAL_WANG_CHANGSHENG_LU_BOUNDED_TONGGEN_VERSION,
        scope: GENERAL_NATAL_WANG_CHANGSHENG_LU_BOUNDED_TONGGEN_SCOPE,
        decision: GENERAL_NATAL_WANG_CHANGSHENG_LU_BOUNDED_TONGGEN_DECISION,
        source: GENERAL_NATAL_WANG_CHANGSHENG_LU_BOUNDED_TONGGEN_SOURCE,
        sourceObservations:
          GENERAL_NATAL_WANG_CHANGSHENG_LU_BOUNDED_TONGGEN_SOURCE_OBSERVATIONS,
        representability:
          GENERAL_NATAL_WANG_CHANGSHENG_LU_BOUNDED_TONGGEN_CANONICAL_REPRESENTABILITY,
        upstream,
        upstreamWangAuthorized:
          GENERAL_NATAL_EARTH_WANG_HEAVY_ROOT_COMPLETION_AUTHORITY
            .completeFiveElementWangHeavyRootMatcherAuthorizedResearchOnly,
        upstreamYangChangshengAuthorized:
          GENERAL_NATAL_CHANGSHENG_ROOT_WEIGHT_BINDING_AUTHORITY
            .yangChangshengHeavyRootPredicateAuthorizedResearchOnly,
        upstreamFourYangLuAuthorized:
          GENERAL_NATAL_FOUR_YANG_LU_HEAVY_ROOT_AUTHORITY
            .fourNonEarthYangStemLuMatcherAuthorizedResearchOnly,
        upstreamExistingMukuYuqiTonggenAuthorized: Object.freeze({
          muku:
            GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_AUTHORITY
              .governedNonEarthMukuToBoundedTonggenAuthorizedResearchOnly,
          yuqi:
            GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_AUTHORITY
              .governedNonEarthYuqiToBoundedTonggenAuthorizedResearchOnly,
        }),
        yinChangshengToTonggenAuthorized: false,
        yinLuToTonggenAuthorized: false,
        earthLuToTonggenAuthorized: false,
        generalizedRootToTonggenEquivalenceAuthorized: false,
        noBoundedEvidenceToGlobalNotTonggenAuthorized: false,
        tonggenToSizhuHasRootSettlementAuthorized: false,
        unauthorizedDerivations:
          GENERAL_NATAL_WANG_CHANGSHENG_LU_BOUNDED_TONGGEN_UNAUTHORIZED_DERIVATIONS,
        productionFactEmissionAuthorized: false,
      }),
    )
    .digest('hex');

export const GENERAL_NATAL_WANG_CHANGSHENG_LU_BOUNDED_TONGGEN_AUTHORITY = Object.freeze({
  version: GENERAL_NATAL_WANG_CHANGSHENG_LU_BOUNDED_TONGGEN_VERSION,
  definitionHash: GENERAL_NATAL_WANG_CHANGSHENG_LU_BOUNDED_TONGGEN_DEFINITION_HASH,
  decision: GENERAL_NATAL_WANG_CHANGSHENG_LU_BOUNDED_TONGGEN_DECISION,
  upstreamWangVersion: upstream.wangVersion,
  upstreamWangDefinitionHash: upstream.wangDefinitionHash,
  upstreamChangshengVersion: upstream.changshengVersion,
  upstreamChangshengDefinitionHash: upstream.changshengDefinitionHash,
  upstreamFourYangLuVersion: upstream.fourYangLuVersion,
  upstreamFourYangLuDefinitionHash: upstream.fourYangLuDefinitionHash,
  upstreamMukuYuqiTonggenVersion: upstream.mukuYuqiTonggenVersion,
  upstreamMukuYuqiTonggenDefinitionHash: upstream.mukuYuqiTonggenDefinitionHash,
  directSourceRootClassesInTonggenContextObserved: true,
  directSourceShengLuWangYuqiMuAllTonggenObserved: true,
  governedWangToBoundedTonggenAuthorizedResearchOnly: true,
  governedYangChangshengToBoundedTonggenAuthorizedResearchOnly: true,
  governedFourYangLuToBoundedTonggenAuthorizedResearchOnly: true,
  existingMukuYuqiTonggenBridgePreservedSeparately: true,
  rawStemBranchRediscoveryRequired: false,
  hiddenStemConsumptionRequired: false,
  classNeutralJiaYiWoodObservationConsumed: false,
  generalizedRootToTonggenEquivalenceAuthorized: false,
  yinChangshengToTonggenAuthorized: false,
  yinLuToTonggenAuthorized: false,
  earthLuToTonggenAuthorized: false,
  earthYuqiMappingResolved: false,
  noBoundedEvidenceToGlobalNotTonggenAuthorized: false,
  tonggenToSizhuHasRootSettlementAuthorized: false,
  tonggenCountAuthorized: false,
  dangZhongCounterAuthorized: false,
  dangZhongBooleanResolverAuthorized: false,
  zhuGuaCounterAuthorized: false,
  chartLevelQiangRuoClassifierAuthorized: false,
  chartLevelWangShuaiClassifierAuthorized: false,
  numericStrengthAuthorized: false,
  nonNumericStrengthScalarAuthorized: false,
  generalizedRootWeightClassifierAuthorized: false,
  ordinaryStrengthClassificationAuthorized: false,
  candidateDerivationAuthorized: false,
  establishmentPredicateAuthorized: false,
  candidateFactsEmitted: false,
  establishmentFactsEmitted: false,
  productionFactEmissionAuthorized: false,
  nextProductionSku: 'NONE' as const,
  commerce: 'HOLD' as const,
  unauthorizedDerivations:
    GENERAL_NATAL_WANG_CHANGSHENG_LU_BOUNDED_TONGGEN_UNAUTHORIZED_DERIVATIONS,
  authorityBoundary:
    'Research-only semantic bridge from already-governed 旺, Yang 長生, and four non-Earth Yang 祿 positive root evaluations to bounded 通根 observation. The selected commentary directly states that 生祿旺餘氣墓 are 通根 in the stated 年日時支 context; the immediately preceding sentence names 長生 explicitly, so this bridge admits only the already-governed Yang 長生 clause and does not resolve Yin 長生. Existing 墓庫/餘氣 Tonggen remains governed separately by #692. Yin 祿, Earth 祿, Earth 餘氣, class-neutral 甲乙 Wood observations, global negative Tonggen, 四柱 settlement, counts, strength, Gyeokguk, Production, SKU, and Commerce remain fail-closed.',
});