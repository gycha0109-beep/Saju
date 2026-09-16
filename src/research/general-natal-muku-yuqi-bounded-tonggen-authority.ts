import { createHash } from 'node:crypto';
import {
  GENERAL_NATAL_MUKU_YUQI_LIGHT_ROOT_AUTHORITY,
  GENERAL_NATAL_MUKU_YUQI_LIGHT_ROOT_DEFINITION_HASH,
  GENERAL_NATAL_MUKU_YUQI_LIGHT_ROOT_VERSION,
  type MukuYuqiLightRootEvaluation,
} from './general-natal-muku-yuqi-light-root-authority.js';

export const GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_VERSION = '0.1.0-research' as const;
export const GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_SCOPE =
  'governed_non_earth_muku_yuqi_root_to_bounded_tonggen_observation' as const;
export const GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_DECISION =
  'AUTHORIZED_RESEARCH_ONLY' as const;

export const GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_SOURCE = Object.freeze({
  title: '子平真詮 / 子平真詮評註',
  section: '論十干得時不旺失時不弱',
  url: 'https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm',
  accessedAt: '2026-09-16',
  sourceType: 'classical_transcription_with_commentary',
} as const);

export const GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_SOURCE_OBSERVATIONS = Object.freeze([
  Object.freeze({
    id: 'tonggen_named_as_dang_zhong_support',
    observation: '比劫印綬通根扶助為黨眾',
    authority: 'direct_source_semantic' as const,
  }),
  Object.freeze({
    id: 'muku_yuqi_root_semantic',
    observation: '墓庫餘氣，根之輕者也',
    authority: 'direct_source_root_semantic' as const,
  }),
  Object.freeze({
    id: 'own_muku_yuqi_tonggen_boundary',
    observation: '若乙逢戌、丁逢丑，非其本庫餘氣，自不作通根論',
    authority: 'direct_commentary_tonggen_boundary' as const,
  }),
  Object.freeze({
    id: 'muku_positive_tonggen_examples',
    observation: '壬逢辰、丙坐戌之類，不以為水火通根身庫',
    authority: 'direct_commentary_positive_muku_tonggen_examples' as const,
  }),
] as const);

export type MukuYuqiBoundedTonggenState =
  | 'bounded_tonggen_observed'
  | 'no_bounded_tonggen_evidence'
  | 'unresolved_outside_governed_tonggen_scope';

export interface MukuYuqiBoundedTonggenEvaluation {
  readonly state: MukuYuqiBoundedTonggenState;
  readonly upstreamState: MukuYuqiLightRootEvaluation['lightRootState'];
  readonly element: MukuYuqiLightRootEvaluation['element'];
  readonly branch: MukuYuqiLightRootEvaluation['branch'];
  readonly sourceRootKind: '墓庫' | '餘氣' | null;
  readonly tonggenObserved: boolean;
  readonly dangZhongEstablished: false;
  readonly zhuGuaEstablished: false;
  readonly qiangRuoEstablished: false;
  readonly authority: 'research_only';
}

export function bindGovernedMukuYuqiRootToBoundedTonggen(
  evaluation: MukuYuqiLightRootEvaluation,
): MukuYuqiBoundedTonggenEvaluation {
  if (evaluation.authority !== 'research_only') {
    return Object.freeze({
      state: 'no_bounded_tonggen_evidence',
      upstreamState: evaluation.lightRootState,
      element: evaluation.element,
      branch: evaluation.branch,
      sourceRootKind: null,
      tonggenObserved: false,
      dangZhongEstablished: false,
      zhuGuaEstablished: false,
      qiangRuoEstablished: false,
      authority: 'research_only',
    });
  }

  if (evaluation.lightRootState === 'muku_light_root_established') {
    return Object.freeze({
      state: 'bounded_tonggen_observed',
      upstreamState: evaluation.lightRootState,
      element: evaluation.element,
      branch: evaluation.branch,
      sourceRootKind: '墓庫',
      tonggenObserved: true,
      dangZhongEstablished: false,
      zhuGuaEstablished: false,
      qiangRuoEstablished: false,
      authority: 'research_only',
    });
  }

  if (evaluation.lightRootState === 'yuqi_light_root_established') {
    return Object.freeze({
      state: 'bounded_tonggen_observed',
      upstreamState: evaluation.lightRootState,
      element: evaluation.element,
      branch: evaluation.branch,
      sourceRootKind: '餘氣',
      tonggenObserved: true,
      dangZhongEstablished: false,
      zhuGuaEstablished: false,
      qiangRuoEstablished: false,
      authority: 'research_only',
    });
  }

  if (evaluation.lightRootState === 'earth_boundary_unresolved') {
    return Object.freeze({
      state: 'unresolved_outside_governed_tonggen_scope',
      upstreamState: evaluation.lightRootState,
      element: evaluation.element,
      branch: evaluation.branch,
      sourceRootKind: null,
      tonggenObserved: false,
      dangZhongEstablished: false,
      zhuGuaEstablished: false,
      qiangRuoEstablished: false,
      authority: 'research_only',
    });
  }

  return Object.freeze({
    state: 'no_bounded_tonggen_evidence',
    upstreamState: evaluation.lightRootState,
    element: evaluation.element,
    branch: evaluation.branch,
    sourceRootKind: null,
    tonggenObserved: false,
    dangZhongEstablished: false,
    zhuGuaEstablished: false,
    qiangRuoEstablished: false,
    authority: 'research_only',
  });
}

export const GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_UNAUTHORIZED_DERIVATIONS = Object.freeze([
  'generic_root_to_tonggen_equivalence',
  'generic_light_root_to_tonggen_shortcut',
  'heavy_root_to_tonggen_equivalence',
  'changsheng_to_tonggen',
  'lu_to_tonggen',
  'wang_to_tonggen',
  'twelve_growth_stage_to_tonggen',
  'hidden_stem_membership_to_tonggen',
  'hidden_stem_array_order_to_tonggen',
  'same_element_branch_to_tonggen',
  'earth_tonggen_completion',
  'tonggen_to_dang_zhong_support_constituent',
  'tonggen_count_to_dang_zhong',
  'tonggen_absence_to_zhu_gua',
  'tonggen_to_qiang',
  'tonggen_to_bu_ruo',
  'tonggen_bi_yin_to_final_qiang_ruo',
  'tonggen_to_numeric_strength',
  'tonggen_to_nonnumeric_strength_scalar',
  'tonggen_to_geju_candidate',
  'tonggen_to_geju_establishment',
  'tonggen_to_production_fact',
] as const);

export const GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_DEFINITION_HASH = createHash('sha256')
  .update(
    JSON.stringify({
      version: GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_VERSION,
      scope: GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_SCOPE,
      decision: GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_DECISION,
      source: GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_SOURCE,
      sourceObservations: GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_SOURCE_OBSERVATIONS,
      upstreamVersion: GENERAL_NATAL_MUKU_YUQI_LIGHT_ROOT_VERSION,
      upstreamDefinitionHash: GENERAL_NATAL_MUKU_YUQI_LIGHT_ROOT_DEFINITION_HASH,
      upstreamDecision: GENERAL_NATAL_MUKU_YUQI_LIGHT_ROOT_AUTHORITY.decision,
      upstreamNonEarthMatcherAuthorized:
        GENERAL_NATAL_MUKU_YUQI_LIGHT_ROOT_AUTHORITY.nonEarthMukuYuqiMatcherAuthorizedResearchOnly,
      earthTonggenResolved: false,
      generalizedRootToTonggenEquivalenceAuthorized: false,
      rootWeightToTonggenEquivalenceAuthorized: false,
      twelveGrowthStageToTonggenAuthorized: false,
      hiddenStemMembershipToTonggenAuthorized: false,
      tonggenToDangZhongSupportConstituentAuthorized: false,
      dangZhongCounterAuthorized: false,
      ordinaryStrengthClassificationAuthorized: false,
      productionFactEmissionAuthorized: false,
      unauthorizedDerivations:
        GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_UNAUTHORIZED_DERIVATIONS,
    }),
  )
  .digest('hex');

export const GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_AUTHORITY = Object.freeze({
  version: GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_VERSION,
  definitionHash: GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_DEFINITION_HASH,
  decision: GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_DECISION,
  source: GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_SOURCE,
  upstreamVersion: GENERAL_NATAL_MUKU_YUQI_LIGHT_ROOT_VERSION,
  upstreamDefinitionHash: GENERAL_NATAL_MUKU_YUQI_LIGHT_ROOT_DEFINITION_HASH,
  upstreamMukuYuqiEvaluationAvailableResearchOnly: true,
  rawStemBranchRediscoveryRequired: false,
  hiddenStemConsumptionRequired: false,
  twelveGrowthConsumptionRequired: false,
  directSourceTonggenSupportAssociationObserved: true,
  directSourceOwnMukuYuqiTonggenBoundaryObserved: true,
  directSourceMukuPositiveTonggenExamplesObserved: true,
  governedNonEarthMukuToBoundedTonggenAuthorizedResearchOnly: true,
  governedNonEarthYuqiToBoundedTonggenAuthorizedResearchOnly: true,
  earthTonggenResolved: false,
  generalizedRootToTonggenEquivalenceAuthorized: false,
  genericLightRootToTonggenShortcutAuthorized: false,
  heavyRootToTonggenEquivalenceAuthorized: false,
  changshengToTonggenAuthorized: false,
  luToTonggenAuthorized: false,
  wangToTonggenAuthorized: false,
  twelveGrowthStageToTonggenAuthorized: false,
  hiddenStemMembershipToTonggenAuthorized: false,
  hiddenStemArrayOrderToTonggenAuthorized: false,
  sameElementBranchToTonggenAuthorized: false,
  tonggenToDangZhongSupportConstituentAuthorized: false,
  tonggenCountAuthorized: false,
  dangZhongCounterAuthorized: false,
  dangZhongThresholdAuthorized: false,
  dangZhongBooleanResolverAuthorized: false,
  zhuGuaCounterAuthorized: false,
  zhuGuaBooleanResolverAuthorized: false,
  tonggenToQiangAuthorized: false,
  tonggenToBuRuoAuthorized: false,
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
  unauthorizedDerivations:
    GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_UNAUTHORIZED_DERIVATIONS,
  authorityBoundary:
    'The selected 子平真詮 / 子平真詮評註 passage directly distinguishes own 墓庫/餘氣 from non-own cases when discussing whether 通根 applies, and gives positive 墓庫 通根身庫 examples. The already-governed #557/#558 evaluator supplies exactly those non-Earth 墓庫/餘氣 matches as research-only upstream states, so this bridge consumes only that evaluation and admits the two positive states as bounded 通根 observations. It does not equate root weight, 長生/祿/旺, Twelve-Growth stages, hidden-stem membership/order, same-element branch relations, or Earth roots with 通根; and it does not establish 黨眾, 助寡, 強/不弱, final 強弱/旺衰, a strength scalar, Gyeokguk, or production facts.',
});
