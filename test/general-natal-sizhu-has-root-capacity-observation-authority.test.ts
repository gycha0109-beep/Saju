import { describe, expect, test } from 'vitest';
import * as authorityModule from '../src/research/general-natal-sizhu-has-root-capacity-observation-authority.js';
import {
  GENERAL_NATAL_SIZHU_HAS_ROOT_CAPACITY_AUTHORITY,
  GENERAL_NATAL_SIZHU_HAS_ROOT_CAPACITY_CANONICAL_REPRESENTABILITY,
  GENERAL_NATAL_SIZHU_HAS_ROOT_CAPACITY_DECISION,
  GENERAL_NATAL_SIZHU_HAS_ROOT_CAPACITY_OBSERVATIONS,
  GENERAL_NATAL_SIZHU_HAS_ROOT_CAPACITY_SOURCE_TEXT,
  GENERAL_NATAL_SIZHU_HAS_ROOT_CAPACITY_UNAUTHORIZED_DERIVATIONS,
} from '../src/research/general-natal-sizhu-has-root-capacity-observation-authority.js';
import {
  GENERAL_NATAL_GEJU_ROOT_WEIGHT_CLASSIFICATION_PRIMITIVE_AUTHORITY_REVIEW_DEFINITION_HASH,
  GENERAL_NATAL_GEJU_ROOT_WEIGHT_CLASSIFICATION_PRIMITIVE_AUTHORITY_REVIEW_VERSION,
} from '../src/research/general-natal-geju-root-weight-classification-primitive-authority-review.js';
import {
  GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_DEFINITION_HASH,
  GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_VERSION,
} from '../src/research/general-natal-muku-yuqi-bounded-tonggen-authority.js';
import {
  GENERAL_NATAL_BIJIE_WITHOUT_TONGGEN_WEAK_CONTEXT_DEFINITION_HASH,
  GENERAL_NATAL_BIJIE_WITHOUT_TONGGEN_WEAK_CONTEXT_VERSION,
} from '../src/research/general-natal-bijie-without-tonggen-weak-context-observation-authority.js';

describe('四柱有根 source-side capacity observation authority', () => {
  test('preserves exactly one immutable direct-source observation', () => {
    expect(GENERAL_NATAL_SIZHU_HAS_ROOT_CAPACITY_DECISION).toBe('AUTHORIZED_OBSERVATION_ONLY');
    expect(GENERAL_NATAL_SIZHU_HAS_ROOT_CAPACITY_OBSERVATIONS).toHaveLength(1);
    expect(Object.isFrozen(GENERAL_NATAL_SIZHU_HAS_ROOT_CAPACITY_OBSERVATIONS)).toBe(true);
    expect(Object.isFrozen(GENERAL_NATAL_SIZHU_HAS_ROOT_CAPACITY_OBSERVATIONS[0])).toBe(true);
    expect(GENERAL_NATAL_SIZHU_HAS_ROOT_CAPACITY_SOURCE_TEXT).toBe(
      '十幹不論月令休囚，只要四柱有根，便能受財官食神而當傷官七煞。',
    );
  });

  test('retains the literal source-side subject, condition, moon-command phrase, and capacity phrase', () => {
    const observation = GENERAL_NATAL_SIZHU_HAS_ROOT_CAPACITY_OBSERVATIONS[0];
    expect(observation.sourceSubject).toBe('十幹');
    expect(observation.sourceCondition).toBe('四柱有根');
    expect(observation.sourceMoonCommandPhrase).toBe('不論月令休囚');
    expect(observation.sourceCapacityPhrase).toBe('便能受財官食神而當傷官七煞');
    expect(observation.contextObserved).toBe(true);
    expect(observation.executablePredicateAuthorized).toBe(false);
  });

  test('requires no canonical input and exports no executable chart matcher', () => {
    expect(GENERAL_NATAL_SIZHU_HAS_ROOT_CAPACITY_CANONICAL_REPRESENTABILITY).toEqual({
      canonicalInputRequired: false,
      chartFactsConsumed: false,
      rootWeightEvaluationConsumed: false,
      boundedTonggenEvaluationConsumed: false,
      twelveGrowthFactsConsumed: false,
      hiddenStemFactsConsumed: false,
      status: 'NOT_REQUIRED_FOR_OBSERVATION_ONLY',
    });
    expect(Object.values(authorityModule).some((value) => typeof value === 'function')).toBe(false);
  });

  test('pins adjacent root and Tonggen authorities without consuming them', () => {
    const authority = GENERAL_NATAL_SIZHU_HAS_ROOT_CAPACITY_AUTHORITY;
    expect(authority.upstreamRootWeightReviewVersion).toBe(
      GENERAL_NATAL_GEJU_ROOT_WEIGHT_CLASSIFICATION_PRIMITIVE_AUTHORITY_REVIEW_VERSION,
    );
    expect(authority.upstreamRootWeightReviewDefinitionHash).toBe(
      GENERAL_NATAL_GEJU_ROOT_WEIGHT_CLASSIFICATION_PRIMITIVE_AUTHORITY_REVIEW_DEFINITION_HASH,
    );
    expect(authority.upstreamBoundedTonggenVersion).toBe(GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_VERSION);
    expect(authority.upstreamBoundedTonggenDefinitionHash).toBe(
      GENERAL_NATAL_MUKU_YUQI_BOUNDED_TONGGEN_DEFINITION_HASH,
    );
    expect(authority.upstreamNegativeTonggenContextVersion).toBe(
      GENERAL_NATAL_BIJIE_WITHOUT_TONGGEN_WEAK_CONTEXT_VERSION,
    );
    expect(authority.upstreamNegativeTonggenContextDefinitionHash).toBe(
      GENERAL_NATAL_BIJIE_WITHOUT_TONGGEN_WEAK_CONTEXT_DEFINITION_HASH,
    );
  });

  test('keeps every root-to-strength and production escalation fail-closed', () => {
    const authority = GENERAL_NATAL_SIZHU_HAS_ROOT_CAPACITY_AUTHORITY;
    expect(authority.canonicalSizhuHasRootResolverAuthorized).toBe(false);
    expect(authority.rootWeightToSizhuHasRootAuthorized).toBe(false);
    expect(authority.twelveGrowthStageToSizhuHasRootAuthorized).toBe(false);
    expect(authority.hiddenStemToSizhuHasRootAuthorized).toBe(false);
    expect(authority.boundedTonggenToSizhuHasRootAuthorized).toBe(false);
    expect(authority.sizhuHasRootToDangZhongAuthorized).toBe(false);
    expect(authority.sizhuHasRootToQiangAuthorized).toBe(false);
    expect(authority.sizhuHasRootToBuRuoAuthorized).toBe(false);
    expect(authority.chartLevelQiangRuoClassifierAuthorized).toBe(false);
    expect(authority.chartLevelWangShuaiClassifierAuthorized).toBe(false);
    expect(authority.numericStrengthAuthorized).toBe(false);
    expect(authority.nonNumericStrengthScalarAuthorized).toBe(false);
    expect(authority.generalizedRootWeightClassifierAuthorized).toBe(false);
    expect(authority.ordinaryStrengthClassificationAuthorized).toBe(false);
    expect(authority.candidateDerivationAuthorized).toBe(false);
    expect(authority.establishmentPredicateAuthorized).toBe(false);
    expect(authority.candidateFactsEmitted).toBe(false);
    expect(authority.establishmentFactsEmitted).toBe(false);
    expect(authority.productionFactEmissionAuthorized).toBe(false);
    expect(GENERAL_NATAL_SIZHU_HAS_ROOT_CAPACITY_UNAUTHORIZED_DERIVATIONS).toContain(
      'bounded_tonggen_to_sizhu_has_root',
    );
    expect(GENERAL_NATAL_SIZHU_HAS_ROOT_CAPACITY_UNAUTHORIZED_DERIVATIONS).toContain(
      'source_capacity_phrase_to_production_calculation_rule',
    );
  });
});
