import { createHash } from 'node:crypto';
import {
  GENERAL_NATAL_GEJU_ROOT_WEIGHT_CLASSIFICATION_PRIMITIVE_AUTHORITY_REVIEW,
  GENERAL_NATAL_GEJU_ROOT_WEIGHT_CLASSIFICATION_PRIMITIVE_AUTHORITY_REVIEW_DEFINITION_HASH,
} from './general-natal-geju-root-weight-classification-primitive-authority-review.js';

export const GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_VERSION = '0.1.0-research' as const;
export const GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_SCOPE =
  'bounded_relative_root_comparison_observations_without_numeric_or_transitive_closure' as const;
export const GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_DECISION =
  'AUTHORIZED_OBSERVATION_ONLY' as const;

export const GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_SOURCE = Object.freeze({
  title: '子平真詮 / 子平真詮評註',
  section: '論十干得時不旺失時不弱',
  url: 'https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm',
  accessedAt: '2026-09-15',
  sourceType: 'classical_transcription_with_commentary',
});

export const GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_PROPOSITIONS = Object.freeze([
  Object.freeze({
    id: 'one_peer_less_than_one_applicable_muku',
    sourceText: '得一比肩，不如得支中一墓庫',
    left: Object.freeze({ kind: 'peer_stem_count' as const, count: 1 as const }),
    relation: 'source_stated_less_than' as const,
    right: Object.freeze({ kind: 'applicable_muku_root' as const, count: 1 as const }),
    authority: 'bounded_source_observation' as const,
  }),
  Object.freeze({
    id: 'two_peers_less_than_one_applicable_yuqi',
    sourceText: '得二比肩，不如得一餘氣',
    left: Object.freeze({ kind: 'peer_stem_count' as const, count: 2 as const }),
    relation: 'source_stated_less_than' as const,
    right: Object.freeze({ kind: 'applicable_yuqi_root' as const, count: 1 as const }),
    authority: 'bounded_source_observation' as const,
  }),
  Object.freeze({
    id: 'three_peers_less_than_one_applicable_changsheng_lu_ren_root',
    sourceText: '得三比肩，不如得一長生祿刃',
    left: Object.freeze({ kind: 'peer_stem_count' as const, count: 3 as const }),
    relation: 'source_stated_less_than' as const,
    right: Object.freeze({
      kind: 'applicable_changsheng_lu_ren_root' as const,
      count: 1 as const,
    }),
    authority: 'bounded_source_observation' as const,
  }),
] as const);

export const GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_CONTEXT_OBSERVATIONS = Object.freeze([
  Object.freeze({
    observation: '餘氣的 가벼움은 계절상 司令 시점에 따라 달라질 수 있다는 評註가 이어진다.',
    sourceAnchor: '輕而不輕，在土旺之後，則為輕矣；然亦可抵一比劫也',
    authority: 'context_sensitivity_observation' as const,
  }),
  Object.freeze({
    observation: '통근의 상대적 중요도에서도 월령 지지를 특히 무겁게 본다는 評註가 이어진다.',
    sourceAnchor: '通根之中，尤以月令之支為最重也',
    authority: 'context_sensitivity_observation' as const,
  }),
] as const);

export const GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_UNAUTHORIZED_DERIVATIONS = Object.freeze([
  'bounded_statement_to_chart_level_comparison_evaluator',
  'bounded_statement_to_transitive_closure',
  'bounded_statement_to_global_root_ranking',
  'comparative_phrase_to_numeric_score',
  'bounded_count_to_linear_weight_scale',
  'bounded_examples_to_all_stems_extrapolation',
  'source_statement_to_context_free_universal_rule',
  'root_comparison_to_ordinary_strength',
  'root_comparison_to_geju_candidate',
  'root_comparison_to_geju_establishment',
  'root_comparison_to_production_fact',
] as const);

export const GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_DEFINITION_HASH = createHash('sha256')
  .update(
    JSON.stringify({
      version: GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_VERSION,
      scope: GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_SCOPE,
      decision: GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_DECISION,
      source: GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_SOURCE,
      propositions: GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_PROPOSITIONS,
      contextObservations: GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_CONTEXT_OBSERVATIONS,
      upstreamRootWeightReviewVersion:
        GENERAL_NATAL_GEJU_ROOT_WEIGHT_CLASSIFICATION_PRIMITIVE_AUTHORITY_REVIEW.reviewVersion,
      upstreamRootWeightReviewDefinitionHash:
        GENERAL_NATAL_GEJU_ROOT_WEIGHT_CLASSIFICATION_PRIMITIVE_AUTHORITY_REVIEW_DEFINITION_HASH,
      unauthorizedDerivations: GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_UNAUTHORIZED_DERIVATIONS,
      chartLevelComparisonEvaluatorAuthorized: false,
      transitiveClosureAuthorized: false,
      numericRootWeightAuthorized: false,
      nonNumericWeightingRuleResolved: false,
    }),
  )
  .digest('hex');

export const GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_AUTHORITY = Object.freeze({
  version: GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_VERSION,
  definitionHash: GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_DEFINITION_HASH,
  decision: GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_DECISION,
  upstreamRootWeightReviewVersion:
    GENERAL_NATAL_GEJU_ROOT_WEIGHT_CLASSIFICATION_PRIMITIVE_AUTHORITY_REVIEW.reviewVersion,
  upstreamRootWeightReviewDefinitionHash:
    GENERAL_NATAL_GEJU_ROOT_WEIGHT_CLASSIFICATION_PRIMITIVE_AUTHORITY_REVIEW_DEFINITION_HASH,
  directSourceBoundedRelativeComparisonsObserved: true,
  directSourceContextSensitivityObserved: true,
  boundedComparisonPropositionRegistryAuthorizedObservationOnly: true,
  propositionCount: GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_PROPOSITIONS.length,
  chartFactsConsumed: false,
  chartLevelComparisonEvaluatorAuthorized: false,
  boundedSourceExampleMatcherAuthorized: false,
  transitiveClosureAuthorized: false,
  generalizedGlobalRootRankingAuthorized: false,
  numericRootWeightAuthorized: false,
  linearWeightScaleAuthorized: false,
  nonNumericWeightingRuleResolved: false,
  generalizedRootWeightClassifierAuthorized: false,
  ordinaryStrengthClassificationAuthorized: false,
  candidateDerivationAuthorized: false,
  establishmentPredicateAuthorized: false,
  candidateFactsEmitted: false,
  establishmentFactsEmitted: false,
  productionFactEmissionAuthorized: false,
  unauthorizedDerivations: GENERAL_NATAL_BOUNDED_ROOT_COMPARISON_UNAUTHORIZED_DERIVATIONS,
  authorityBoundary:
    'The selected source directly states three bounded relative comparisons. They are governed here only as immutable source observations. The surrounding commentary makes rooting context-sensitive, including seasonal Yuqi qualification and special weight for the month branch, so no chart evaluator, transitive ordering, global ranking, numeric or linear weight scale, generalized root-weight classifier, ordinary-strength classification, Gyeokguk derivation, or production emission is authorized.',
});
