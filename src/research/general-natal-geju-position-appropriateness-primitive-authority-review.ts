import { createHash } from 'node:crypto';
import { GENERAL_NATAL_GEJU_SOURCE_EXAMPLE_CANONICAL_INPUT_BINDING_REVIEW } from './general-natal-geju-source-example-canonical-input-binding-review.js';

export const GENERAL_NATAL_GEJU_POSITION_APPROPRIATENESS_PRIMITIVE_AUTHORITY_REVIEW_VERSION =
  '0.1.0-research' as const;
export const GENERAL_NATAL_GEJU_POSITION_APPROPRIATENESS_PRIMITIVE_AUTHORITY_REVIEW_SCOPE =
  'ziping_zhenquan_cai_yin_position_appropriateness_primitive_authority' as const;
export const GENERAL_NATAL_GEJU_POSITION_APPROPRIATENESS_PRIMITIVE_AUTHORITY_DECISION =
  'PARTIALLY_AUTHORIZED' as const;

const UPSTREAM_SOURCE_EXAMPLE_CANONICAL_INPUT_BINDING_REVIEW_DEFINITION_HASH = createHash('sha256')
  .update(JSON.stringify(GENERAL_NATAL_GEJU_SOURCE_EXAMPLE_CANONICAL_INPUT_BINDING_REVIEW))
  .digest('hex');

export const GENERAL_NATAL_GEJU_POSITION_APPROPRIATENESS_SOURCE_OBSERVATIONS = Object.freeze([
  Object.freeze({
    source: '子平真詮 / 論用神成敗救應',
    observation: '財格透印而位置妥貼，兩不相剋',
    authority: 'direct_source_semantic' as const,
  }),
  Object.freeze({
    source: '子平真詮評注 / 論用神成敗救應',
    observation: '或透印而位置妥貼者，財印不相礙也',
    authority: 'commentary_semantic_explanation' as const,
  }),
  Object.freeze({
    source: '子平真詮評注 / 論用神成敗救應',
    observation: '如年干透印，時干透財，中隔比劫，則不相礙',
    authority: 'bounded_positive_example' as const,
  }),
  Object.freeze({
    source: '子平真詮評注 / 論用神成敗救應',
    observation: '隔官星則為財旺生官，亦不相礙',
    authority: 'bounded_positive_example' as const,
  }),
] as const);

export const GENERAL_NATAL_GEJU_POSITION_APPROPRIATENESS_CANONICAL_INPUTS = Object.freeze([
  'pillars.year.stem',
  'pillars.month.stem',
  'pillars.day.stem',
  'pillars.hour.stem',
  'derivedFacts.tenGods',
] as const);

export const GENERAL_NATAL_GEJU_POSITION_APPROPRIATENESS_UNAUTHORIZED_GENERALIZATIONS = Object.freeze([
  'reverse_year_hour_symmetry',
  'arbitrary_pillar_pair_equivalence',
  'adjacent_position_equivalence',
  'intervening_slot_exhaustiveness',
  'unmentioned_intermediary_ten_god_equivalence',
  'multiple_cai_yin_precedence',
  'position_score_or_rank',
] as const);

export interface GeneralNatalGejuPositionAppropriatenessPrimitiveAuthorityReview {
  readonly reviewVersion: typeof GENERAL_NATAL_GEJU_POSITION_APPROPRIATENESS_PRIMITIVE_AUTHORITY_REVIEW_VERSION;
  readonly sourceScope: typeof GENERAL_NATAL_GEJU_POSITION_APPROPRIATENESS_PRIMITIVE_AUTHORITY_REVIEW_SCOPE;
  readonly decision: typeof GENERAL_NATAL_GEJU_POSITION_APPROPRIATENESS_PRIMITIVE_AUTHORITY_DECISION;
  readonly upstreamVersion: string;
  readonly upstreamDefinitionHash: string;
  readonly sourceObservations: typeof GENERAL_NATAL_GEJU_POSITION_APPROPRIATENESS_SOURCE_OBSERVATIONS;
  readonly canonicalInputPaths: typeof GENERAL_NATAL_GEJU_POSITION_APPROPRIATENESS_CANONICAL_INPUTS;
  readonly sourceNativePositionAppropriatenessSemanticObserved: true;
  readonly sourceNativeNonInterferenceSemanticObserved: true;
  readonly boundedCaiYinPositiveExamplesObserved: true;
  readonly canonicalStemPositionInputAvailable: true;
  readonly canonicalTenGodInputAvailable: true;
  readonly generalizedPositionAppropriatenessConditionExhaustive: false;
  readonly boundedPositiveExampleMatcherAuthorized: false;
  readonly generalizedExecutablePredicateAuthorized: false;
  readonly candidateDerivationAuthorized: false;
  readonly establishmentPredicateAuthorized: false;
  readonly candidateFactsEmitted: false;
  readonly establishmentFactsEmitted: false;
  readonly unauthorizedGeneralizations: typeof GENERAL_NATAL_GEJU_POSITION_APPROPRIATENESS_UNAUTHORIZED_GENERALIZATIONS;
  readonly authorityBoundary: string;
  readonly notes: readonly string[];
}

export const GENERAL_NATAL_GEJU_POSITION_APPROPRIATENESS_PRIMITIVE_AUTHORITY_REVIEW_DEFINITION_HASH =
  createHash('sha256')
    .update(
      JSON.stringify({
        version: GENERAL_NATAL_GEJU_POSITION_APPROPRIATENESS_PRIMITIVE_AUTHORITY_REVIEW_VERSION,
        sourceScope: GENERAL_NATAL_GEJU_POSITION_APPROPRIATENESS_PRIMITIVE_AUTHORITY_REVIEW_SCOPE,
        decision: GENERAL_NATAL_GEJU_POSITION_APPROPRIATENESS_PRIMITIVE_AUTHORITY_DECISION,
        upstreamVersion: GENERAL_NATAL_GEJU_SOURCE_EXAMPLE_CANONICAL_INPUT_BINDING_REVIEW.version,
        upstreamDefinitionHash:
          UPSTREAM_SOURCE_EXAMPLE_CANONICAL_INPUT_BINDING_REVIEW_DEFINITION_HASH,
        sourceObservations: GENERAL_NATAL_GEJU_POSITION_APPROPRIATENESS_SOURCE_OBSERVATIONS,
        canonicalInputPaths: GENERAL_NATAL_GEJU_POSITION_APPROPRIATENESS_CANONICAL_INPUTS,
        unauthorizedGeneralizations:
          GENERAL_NATAL_GEJU_POSITION_APPROPRIATENESS_UNAUTHORIZED_GENERALIZATIONS,
        generalizedPositionAppropriatenessConditionExhaustive: false,
        boundedPositiveExampleMatcherAuthorized: false,
        generalizedExecutablePredicateAuthorized: false,
      }),
    )
    .digest('hex');

export const GENERAL_NATAL_GEJU_POSITION_APPROPRIATENESS_PRIMITIVE_AUTHORITY_REVIEW: GeneralNatalGejuPositionAppropriatenessPrimitiveAuthorityReview =
  Object.freeze({
    reviewVersion: GENERAL_NATAL_GEJU_POSITION_APPROPRIATENESS_PRIMITIVE_AUTHORITY_REVIEW_VERSION,
    sourceScope: GENERAL_NATAL_GEJU_POSITION_APPROPRIATENESS_PRIMITIVE_AUTHORITY_REVIEW_SCOPE,
    decision: GENERAL_NATAL_GEJU_POSITION_APPROPRIATENESS_PRIMITIVE_AUTHORITY_DECISION,
    upstreamVersion: GENERAL_NATAL_GEJU_SOURCE_EXAMPLE_CANONICAL_INPUT_BINDING_REVIEW.version,
    upstreamDefinitionHash:
      UPSTREAM_SOURCE_EXAMPLE_CANONICAL_INPUT_BINDING_REVIEW_DEFINITION_HASH,
    sourceObservations: GENERAL_NATAL_GEJU_POSITION_APPROPRIATENESS_SOURCE_OBSERVATIONS,
    canonicalInputPaths: GENERAL_NATAL_GEJU_POSITION_APPROPRIATENESS_CANONICAL_INPUTS,
    sourceNativePositionAppropriatenessSemanticObserved: true,
    sourceNativeNonInterferenceSemanticObserved: true,
    boundedCaiYinPositiveExamplesObserved: true,
    canonicalStemPositionInputAvailable: true,
    canonicalTenGodInputAvailable: true,
    generalizedPositionAppropriatenessConditionExhaustive: false,
    boundedPositiveExampleMatcherAuthorized: false,
    generalizedExecutablePredicateAuthorized: false,
    candidateDerivationAuthorized: false,
    establishmentPredicateAuthorized: false,
    candidateFactsEmitted: false,
    establishmentFactsEmitted: false,
    unauthorizedGeneralizations:
      GENERAL_NATAL_GEJU_POSITION_APPROPRIATENESS_UNAUTHORIZED_GENERALIZATIONS,
    authorityBoundary:
      'The selected source directly makes position appropriateness / non-interference material to the Cai-pattern-with-Yin clause and the reviewed commentary supplies bounded positive arrangements. Current canonical stem positions and Ten-God identities can represent the factual substrate, but the reviewed body does not define an exhaustive, symmetric, arbitrary-position algorithm. Therefore the semantic primitive is only partially authorized and no generalized executable predicate or source-example matcher is admitted.',
    notes: Object.freeze([
      'Raw pillar position is available, but raw position alone is not a source-authorized appropriateness verdict.',
      'The year-Yin/hour-Cai examples remain bounded positive evidence; reversal, adjacency, and other intermediary combinations are not inferred.',
      'No score, ordering, or precedence is derived from pillar distance.',
      'GEJU_CANDIDATE and GEJU_ESTABLISHMENT_STATE remain un-emitted; General Natal production authority, P0-CM-03, NEXT_PRODUCTION_SKU, and Commerce remain blocked.',
    ]),
  });
