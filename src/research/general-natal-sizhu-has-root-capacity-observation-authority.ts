import { createHash } from 'node:crypto';
import {
  GENERAL_NATAL_GEJU_ROOT_WEIGHT_CLASSIFICATION_PRIMITIVE_AUTHORITY_REVIEW_DEFINITION_HASH,
  GENERAL_NATAL_GEJU_ROOT_WEIGHT_CLASSIFICATION_PRIMITIVE_AUTHORITY_REVIEW_VERSION,
} from './general-natal-geju-root-weight-classification-primitive-authority-review.js';
import {
  GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_DEFINITION_HASH,
  GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_VERSION,
} from './general-natal-muku-yuqi-bounded-tonggen-authority.js';
import {
  GENERAL_NATAL_BIJIE_WITHOUT_TONGGEN_WEAK_CONTEXT_DEFINITION_HASH,
  GENERAL_NATAL_BIJIE_WITHOUT_TONGGEN_WEAK_CONTEXT_VERSION,
} from './general-natal-bijie-without-tonggen-weak-context-observation-authority.js';

export const GENERAL_NATAL_SIZHU_HAS_ROOT_CAPACITY_VERSION = '0.1.0-research' as const;
export const GENERAL_NATAL_SIZHU_HAS_ROOT_CAPACITY_SCOPE =
  'sizhu_has_root_source_capacity_observation' as const;
export const GENERAL_NATAL_SIZHU_HAS_ROOT_CAPACITY_DECISION =
  'AUTHORIZED_OBSERVATION_ONLY' as const;

export const GENERAL_NATAL_SIZHU_HAS_ROOT_CAPACITY_SOURCE = Object.freeze({
  title: '子平真詮 / 子平真詮評註',
  section: '論十幹得時不旺失時不弱',
  url: 'https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm',
  accessedAt: '2026-09-16',
  sourceType: 'classical_transcription_with_commentary',
});

export const GENERAL_NATAL_SIZHU_HAS_ROOT_CAPACITY_SOURCE_TEXT =
  '十幹不論月令休囚，只要四柱有根，便能受財官食神而當傷官七煞。' as const;

export const GENERAL_NATAL_SIZHU_HAS_ROOT_CAPACITY_OBSERVATIONS = Object.freeze([
  Object.freeze({
    id: 'sizhu_has_root_capacity_context',
    sourceText: GENERAL_NATAL_SIZHU_HAS_ROOT_CAPACITY_SOURCE_TEXT,
    sourceSubject: '十幹' as const,
    sourceCondition: '四柱有根' as const,
    sourceMoonCommandPhrase: '不論月令休囚' as const,
    sourceCapacityPhrase: '便能受財官食神而當傷官七煞' as const,
    contextObserved: true as const,
    executablePredicateAuthorized: false as const,
  }),
] as const);

export const GENERAL_NATAL_SIZHU_HAS_ROOT_CAPACITY_CANONICAL_REPRESENTABILITY = Object.freeze({
  canonicalInputRequired: false,
  chartFactsConsumed: false,
  rootWeightEvaluationConsumed: false,
  boundedTonggenEvaluationConsumed: false,
  twelveGrowthFactsConsumed: false,
  hiddenStemFactsConsumed: false,
  status: 'NOT_REQUIRED_FOR_OBSERVATION_ONLY' as const,
});

export const GENERAL_NATAL_SIZHU_HAS_ROOT_CAPACITY_UNAUTHORIZED_DERIVATIONS = Object.freeze([
  'existing_root_fact_to_sizhu_has_root',
  'heavy_root_to_sizhu_has_root',
  'light_root_to_sizhu_has_root',
  'changsheng_to_sizhu_has_root',
  'lu_to_sizhu_has_root',
  'wang_to_sizhu_has_root',
  'muku_to_sizhu_has_root',
  'yuqi_to_sizhu_has_root',
  'twelve_growth_stage_to_sizhu_has_root',
  'hidden_stem_membership_to_sizhu_has_root',
  'bounded_tonggen_to_sizhu_has_root',
  'sizhu_has_root_to_dang_zhong',
  'sizhu_has_root_to_qiang',
  'sizhu_has_root_to_bu_ruo',
  'sizhu_has_root_to_final_qiang_ruo',
  'sizhu_has_root_to_final_wang_shuai',
  'sizhu_has_root_to_numeric_strength',
  'sizhu_has_root_to_nonnumeric_strength_scalar',
  'source_capacity_phrase_to_production_calculation_rule',
  'source_context_to_geju_candidate',
  'source_context_to_geju_establishment',
  'source_context_to_production_fact',
] as const);

const upstream = Object.freeze({
  rootWeightReviewVersion:
    GENERAL_NATAL_GEJU_ROOT_WEIGHT_CLASSIFICATION_PRIMITIVE_AUTHORITY_REVIEW_VERSION,
  rootWeightReviewDefinitionHash:
    GENERAL_NATAL_GEJU_ROOT_WEIGHT_CLASSIFICATION_PRIMITIVE_AUTHORITY_REVIEW_DEFINITION_HASH,
  boundedTonggenVersion: GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_VERSION,
  boundedTonggenDefinitionHash: GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_DEFINITION_HASH,
  negativeTonggenContextVersion: GENERAL_NATAL_BIJIE_WITHOUT_TONGGEN_WEAK_CONTEXT_VERSION,
  negativeTonggenContextDefinitionHash:
    GENERAL_NATAL_BIJIE_WITHOUT_TONGGEN_WEAK_CONTEXT_DEFINITION_HASH,
});

export const GENERAL_NATAL_SIZHU_HAS_ROOT_CAPACITY_DEFINITION_HASH = createHash('sha256')
  .update(
    JSON.stringify({
      version: GENERAL_NATAL_SIZHU_HAS_ROOT_CAPACITY_VERSION,
      scope: GENERAL_NATAL_SIZHU_HAS_ROOT_CAPACITY_SCOPE,
      decision: GENERAL_NATAL_SIZHU_HAS_ROOT_CAPACITY_DECISION,
      source: GENERAL_NATAL_SIZHU_HAS_ROOT_CAPACITY_SOURCE,
      observations: GENERAL_NATAL_SIZHU_HAS_ROOT_CAPACITY_OBSERVATIONS,
      representability: GENERAL_NATAL_SIZHU_HAS_ROOT_CAPACITY_CANONICAL_REPRESENTABILITY,
      upstream,
      unauthorizedDerivations: GENERAL_NATAL_SIZHU_HAS_ROOT_CAPACITY_UNAUTHORIZED_DERIVATIONS,
      productionFactEmissionAuthorized: false,
    }),
  )
  .digest('hex');

export const GENERAL_NATAL_SIZHU_HAS_ROOT_CAPACITY_AUTHORITY = Object.freeze({
  version: GENERAL_NATAL_SIZHU_HAS_ROOT_CAPACITY_VERSION,
  definitionHash: GENERAL_NATAL_SIZHU_HAS_ROOT_CAPACITY_DEFINITION_HASH,
  decision: GENERAL_NATAL_SIZHU_HAS_ROOT_CAPACITY_DECISION,
  upstreamRootWeightReviewVersion: upstream.rootWeightReviewVersion,
  upstreamRootWeightReviewDefinitionHash: upstream.rootWeightReviewDefinitionHash,
  upstreamBoundedTonggenVersion: upstream.boundedTonggenVersion,
  upstreamBoundedTonggenDefinitionHash: upstream.boundedTonggenDefinitionHash,
  upstreamNegativeTonggenContextVersion: upstream.negativeTonggenContextVersion,
  upstreamNegativeTonggenContextDefinitionHash: upstream.negativeTonggenContextDefinitionHash,
  directSourceSizhuHasRootCapacityContextObserved: true,
  canonicalInputRequired: false,
  chartFactsConsumed: false,
  canonicalSizhuHasRootResolverAuthorized: false,
  rootWeightToSizhuHasRootAuthorized: false,
  twelveGrowthStageToSizhuHasRootAuthorized: false,
  hiddenStemToSizhuHasRootAuthorized: false,
  boundedTonggenToSizhuHasRootAuthorized: false,
  sizhuHasRootToDangZhongAuthorized: false,
  sizhuHasRootToQiangAuthorized: false,
  sizhuHasRootToBuRuoAuthorized: false,
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
  unauthorizedDerivations: GENERAL_NATAL_SIZHU_HAS_ROOT_CAPACITY_UNAUTHORIZED_DERIVATIONS,
  authorityBoundary:
    'Observation-only source registry. The selected passage records a 四柱有根 capacity context for 十幹, but the repository does not yet govern an exhaustive canonical 四柱有根 predicate. Existing heavy/light root, Twelve-Growth, hidden-stem, and bounded Tonggen authorities are not consumed as a shortcut. No 強/不弱, final 強弱/旺衰, strength scalar, Gyeokguk, production fact, SKU, or Commerce authority is created.',
});
