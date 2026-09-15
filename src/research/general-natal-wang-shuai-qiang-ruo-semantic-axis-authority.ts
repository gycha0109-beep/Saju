import { createHash } from 'node:crypto';
import {
  GENERAL_NATAL_GEJU_ROOT_WEIGHT_CLASSIFICATION_PRIMITIVE_AUTHORITY_REVIEW,
  GENERAL_NATAL_GEJU_ROOT_WEIGHT_CLASSIFICATION_PRIMITIVE_AUTHORITY_REVIEW_DEFINITION_HASH,
} from './general-natal-geju-root-weight-classification-primitive-authority-review.js';

export const GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_SEMANTIC_AXIS_VERSION =
  '0.1.0-research' as const;
export const GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_SEMANTIC_AXIS_SCOPE =
  'wang_shuai_vs_qiang_ruo_semantic_axis_observation' as const;
export const GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_SEMANTIC_AXIS_DECISION =
  'AUTHORIZED_OBSERVATION_ONLY' as const;

export const GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_SEMANTIC_AXIS_SOURCE = Object.freeze({
  title: '子平真詮 / 子平真詮評註',
  section: '論十干得時不旺失時不弱',
  url: 'https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm',
  accessedAt: '2026-09-15',
  sourceType: 'classical_transcription_with_commentary',
});

export const GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_AXIS_DISTINCTION = Object.freeze({
  id: 'wang_shuai_and_qiang_ruo_must_be_distinguished',
  sourceText: '旺衰強弱四字，昔人論命，每籠統互用，不知須分別看也',
  authority: 'direct_source_semantic' as const,
});

export const GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_SOURCE_OBSERVATIONS = Object.freeze([
  Object.freeze({
    id: 'de_shi_to_wang_general_relation',
    sourceText: '大致得時為旺',
    subject: '得時' as const,
    relation: 'source_stated_general_relation' as const,
    object: '旺' as const,
  }),
  Object.freeze({
    id: 'shi_shi_to_shuai_general_relation',
    sourceText: '失時為衰',
    subject: '失時' as const,
    relation: 'source_stated_general_relation' as const,
    object: '衰' as const,
  }),
  Object.freeze({
    id: 'dang_zhong_to_qiang_general_relation',
    sourceText: '黨眾為強',
    subject: '黨眾' as const,
    relation: 'source_stated_general_relation' as const,
    object: '強' as const,
  }),
  Object.freeze({
    id: 'zhu_gua_to_ruo_general_relation',
    sourceText: '助寡為弱',
    subject: '助寡' as const,
    relation: 'source_stated_general_relation' as const,
    object: '弱' as const,
  }),
  Object.freeze({
    id: 'wang_but_ruo_possible',
    sourceText: '故有雖旺而弱者',
    subject: '旺' as const,
    relation: 'may_coexist_with' as const,
    object: '弱' as const,
  }),
  Object.freeze({
    id: 'shuai_but_qiang_possible',
    sourceText: '亦有雖衰而強者',
    subject: '衰' as const,
    relation: 'may_coexist_with' as const,
    object: '強' as const,
  }),
] as const);

export const GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_CONTEXT_OBSERVATIONS = Object.freeze([
  Object.freeze({
    id: 'month_command_is_weighted_but_other_pillars_can_modify',
    sourceAnchor: '八字雖以月令為重，而旺相休囚，年月日時，亦有損益之權',
    authority: 'context_sensitivity_observation' as const,
  }),
  Object.freeze({
    id: 'same_timing_axis_can_coexist_with_opposite_strength_axis',
    sourceAnchor: '雖秉令而不強也；雖失時而不弱也',
    authority: 'context_sensitivity_observation' as const,
  }),
] as const);

export const GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_UNAUTHORIZED_DERIVATIONS = Object.freeze([
  'semantic_axis_observation_to_chart_level_wang_shuai_classifier',
  'semantic_axis_observation_to_chart_level_qiang_ruo_classifier',
  'month_branch_alone_to_final_wang_shuai_verdict',
  'dang_zhong_to_count_or_threshold',
  'zhu_gua_to_count_or_threshold',
  'root_class_to_qiang_ruo_equivalence',
  'bounded_root_comparison_to_ordinary_strength',
  'twelve_growth_stage_to_ordinary_strength',
  'hidden_stem_storage_order_to_strength',
  'source_terms_to_numeric_strength_score',
  'source_terms_to_nonnumeric_strength_scalar',
  'semantic_axis_to_geju_candidate',
  'semantic_axis_to_geju_establishment',
  'semantic_axis_to_production_fact',
] as const);

export const GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_SEMANTIC_AXIS_DEFINITION_HASH = createHash(
  'sha256',
)
  .update(
    JSON.stringify({
      version: GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_SEMANTIC_AXIS_VERSION,
      scope: GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_SEMANTIC_AXIS_SCOPE,
      decision: GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_SEMANTIC_AXIS_DECISION,
      source: GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_SEMANTIC_AXIS_SOURCE,
      axisDistinction: GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_AXIS_DISTINCTION,
      observations: GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_SOURCE_OBSERVATIONS,
      contextObservations: GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_CONTEXT_OBSERVATIONS,
      upstreamRootWeightReviewVersion:
        GENERAL_NATAL_GEJU_ROOT_WEIGHT_CLASSIFICATION_PRIMITIVE_AUTHORITY_REVIEW.reviewVersion,
      upstreamRootWeightReviewDefinitionHash:
        GENERAL_NATAL_GEJU_ROOT_WEIGHT_CLASSIFICATION_PRIMITIVE_AUTHORITY_REVIEW_DEFINITION_HASH,
      unauthorizedDerivations:
        GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_UNAUTHORIZED_DERIVATIONS,
      chartFactsConsumed: false,
      chartLevelWangShuaiClassifierAuthorized: false,
      chartLevelQiangRuoClassifierAuthorized: false,
      numericStrengthAuthorized: false,
    }),
  )
  .digest('hex');

export const GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_SEMANTIC_AXIS_AUTHORITY = Object.freeze({
  version: GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_SEMANTIC_AXIS_VERSION,
  definitionHash: GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_SEMANTIC_AXIS_DEFINITION_HASH,
  decision: GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_SEMANTIC_AXIS_DECISION,
  upstreamRootWeightReviewVersion:
    GENERAL_NATAL_GEJU_ROOT_WEIGHT_CLASSIFICATION_PRIMITIVE_AUTHORITY_REVIEW.reviewVersion,
  upstreamRootWeightReviewDefinitionHash:
    GENERAL_NATAL_GEJU_ROOT_WEIGHT_CLASSIFICATION_PRIMITIVE_AUTHORITY_REVIEW_DEFINITION_HASH,
  directSourceWangShuaiQiangRuoDistinctionObserved: true,
  directSourceDeShiToWangGeneralRelationObserved: true,
  directSourceShiShiToShuaiGeneralRelationObserved: true,
  directSourceDangZhongToQiangGeneralRelationObserved: true,
  directSourceZhuGuaToRuoGeneralRelationObserved: true,
  directSourceWangButRuoPossibleObserved: true,
  directSourceShuaiButQiangPossibleObserved: true,
  directSourceContextSensitivityObserved: true,
  semanticAxisRegistryAuthorizedObservationOnly: true,
  sourceObservationCount: GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_SOURCE_OBSERVATIONS.length,
  chartFactsConsumed: false,
  chartLevelWangShuaiClassifierAuthorized: false,
  chartLevelQiangRuoClassifierAuthorized: false,
  dangZhongCounterAuthorized: false,
  zhuGuaCounterAuthorized: false,
  rootClassToQiangRuoEquivalenceAuthorized: false,
  twelveGrowthStageToOrdinaryStrengthAuthorized: false,
  hiddenStemStorageOrderToStrengthAuthorized: false,
  boundedRootComparisonToOrdinaryStrengthAuthorized: false,
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
    GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_UNAUTHORIZED_DERIVATIONS,
  authorityBoundary:
    'The selected source directly distinguishes 旺衰 from 強弱, states general source relations for 得時/失時 and 黨眾/助寡, and explicitly allows 旺而弱 and 衰而強. These statements are governed only as immutable source observations. The surrounding passage is context-sensitive and does not supply a complete canonical resolver for 得時, 黨眾, 助寡, or final chart strength. Therefore no chart classifier, counter, root-to-strength bridge, Twelve-Growth-to-strength bridge, numeric or nonnumeric strength scalar, Gyeokguk derivation, or production emission is authorized.',
});
