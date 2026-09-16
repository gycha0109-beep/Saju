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
  GENERAL_NATAL_SIZHU_HAS_ROOT_CAPACITY_DEFINITION_HASH,
  GENERAL_NATAL_SIZHU_HAS_ROOT_CAPACITY_VERSION,
} from './general-natal-sizhu-has-root-capacity-observation-authority.js';

export const GENERAL_NATAL_MONTH_BRANCH_TONGGEN_PRIORITY_VERSION = '0.1.0-research' as const;
export const GENERAL_NATAL_MONTH_BRANCH_TONGGEN_PRIORITY_SCOPE =
  'month_branch_tonggen_priority_source_observation' as const;
export const GENERAL_NATAL_MONTH_BRANCH_TONGGEN_PRIORITY_DECISION =
  'AUTHORIZED_OBSERVATION_ONLY' as const;

export const GENERAL_NATAL_MONTH_BRANCH_TONGGEN_PRIORITY_SOURCE = Object.freeze({
  title: '子平真詮 / 子平真詮評註',
  section: '論十幹得時不旺失時不弱',
  url: 'https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm',
  accessedAt: '2026-09-16',
  sourceType: 'classical_transcription_with_commentary',
});

export const GENERAL_NATAL_MONTH_BRANCH_TONGGEN_PRIORITY_SOURCE_TEXT =
  '總之干多不如支重，而通根之中，尤以月令之支為最重也。' as const;

export const GENERAL_NATAL_MONTH_BRANCH_TONGGEN_PRIORITY_OBSERVATIONS = Object.freeze([
  Object.freeze({
    id: 'month_branch_tonggen_priority_context',
    sourceText: GENERAL_NATAL_MONTH_BRANCH_TONGGEN_PRIORITY_SOURCE_TEXT,
    sourceContext: '通根之中' as const,
    sourcePriorityTarget: '月令之支' as const,
    sourcePriorityPhrase: '尤以月令之支為最重' as const,
    priorityObserved: true as const,
    executablePriorityEvaluatorAuthorized: false as const,
  }),
] as const);

export const GENERAL_NATAL_MONTH_BRANCH_TONGGEN_PRIORITY_CANONICAL_REPRESENTABILITY = Object.freeze({
  canonicalInputRequired: false,
  chartFactsConsumed: false,
  monthBranchFactConsumed: false,
  rootWeightEvaluationConsumed: false,
  boundedTonggenEvaluationConsumed: false,
  sizhuHasRootObservationConsumed: false,
  status: 'NOT_REQUIRED_FOR_OBSERVATION_ONLY' as const,
});

export const GENERAL_NATAL_MONTH_BRANCH_TONGGEN_PRIORITY_UNAUTHORIZED_DERIVATIONS = Object.freeze([
  'month_branch_same_element_to_root',
  'month_branch_root_to_tonggen',
  'month_branch_tonggen_to_global_strongest_root',
  'month_branch_position_to_numeric_multiplier',
  'month_branch_position_to_nonnumeric_generalized_weight',
  'month_branch_root_to_dang_zhong',
  'month_branch_root_to_qiang',
  'month_branch_root_to_bu_ruo',
  'month_branch_root_to_final_qiang_ruo',
  'month_branch_root_to_final_wang_shuai',
  'bounded_tonggen_to_sizhu_has_root',
  'sizhu_has_root_to_strength',
  'source_priority_phrase_to_root_weight_evaluator',
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
  sizhuHasRootCapacityVersion: GENERAL_NATAL_SIZHU_HAS_ROOT_CAPACITY_VERSION,
  sizhuHasRootCapacityDefinitionHash: GENERAL_NATAL_SIZHU_HAS_ROOT_CAPACITY_DEFINITION_HASH,
});

export const GENERAL_NATAL_MONTH_BRANCH_TONGGEN_PRIORITY_DEFINITION_HASH = createHash('sha256')
  .update(
    JSON.stringify({
      version: GENERAL_NATAL_MONTH_BRANCH_TONGGEN_PRIORITY_VERSION,
      scope: GENERAL_NATAL_MONTH_BRANCH_TONGGEN_PRIORITY_SCOPE,
      decision: GENERAL_NATAL_MONTH_BRANCH_TONGGEN_PRIORITY_DECISION,
      source: GENERAL_NATAL_MONTH_BRANCH_TONGGEN_PRIORITY_SOURCE,
      observations: GENERAL_NATAL_MONTH_BRANCH_TONGGEN_PRIORITY_OBSERVATIONS,
      representability: GENERAL_NATAL_MONTH_BRANCH_TONGGEN_PRIORITY_CANONICAL_REPRESENTABILITY,
      upstream,
      unauthorizedDerivations: GENERAL_NATAL_MONTH_BRANCH_TONGGEN_PRIORITY_UNAUTHORIZED_DERIVATIONS,
      productionFactEmissionAuthorized: false,
    }),
  )
  .digest('hex');

export const GENERAL_NATAL_MONTH_BRANCH_TONGGEN_PRIORITY_AUTHORITY = Object.freeze({
  version: GENERAL_NATAL_MONTH_BRANCH_TONGGEN_PRIORITY_VERSION,
  definitionHash: GENERAL_NATAL_MONTH_BRANCH_TONGGEN_PRIORITY_DEFINITION_HASH,
  decision: GENERAL_NATAL_MONTH_BRANCH_TONGGEN_PRIORITY_DECISION,
  upstreamRootWeightReviewVersion: upstream.rootWeightReviewVersion,
  upstreamRootWeightReviewDefinitionHash: upstream.rootWeightReviewDefinitionHash,
  upstreamBoundedTonggenVersion: upstream.boundedTonggenVersion,
  upstreamBoundedTonggenDefinitionHash: upstream.boundedTonggenDefinitionHash,
  upstreamSizhuHasRootCapacityVersion: upstream.sizhuHasRootCapacityVersion,
  upstreamSizhuHasRootCapacityDefinitionHash: upstream.sizhuHasRootCapacityDefinitionHash,
  directSourceMonthBranchTonggenPriorityObserved: true,
  canonicalInputRequired: false,
  chartFactsConsumed: false,
  canonicalMonthBranchRootPriorityEvaluatorAuthorized: false,
  canonicalTonggenResolverAuthorized: false,
  canonicalSizhuHasRootResolverAuthorized: false,
  monthBranchAutomaticRootAuthorized: false,
  monthBranchAutomaticTonggenAuthorized: false,
  monthBranchTonggenGlobalStrongestAuthorized: false,
  monthBranchPositionNumericMultiplierAuthorized: false,
  monthBranchPositionNonNumericWeightAuthorized: false,
  monthBranchRootToDangZhongAuthorized: false,
  monthBranchRootToQiangAuthorized: false,
  monthBranchRootToBuRuoAuthorized: false,
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
  unauthorizedDerivations: GENERAL_NATAL_MONTH_BRANCH_TONGGEN_PRIORITY_UNAUTHORIZED_DERIVATIONS,
  authorityBoundary:
    'Observation-only source registry. The selected commentary states that, within 通根 context, the month branch is especially weighty. This does not define whether a month branch is a root or Tonggen, does not provide a positional multiplier or generalized weight scalar, and does not authorize a canonical 四柱有根 resolver, 黨眾/強/不弱 settlement, final 強弱/旺衰, Gyeokguk, Production, SKU, or Commerce.',
});
