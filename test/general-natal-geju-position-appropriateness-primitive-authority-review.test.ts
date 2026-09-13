import { describe, expect, test } from 'vitest';
import { GENERAL_NATAL_GEJU_SOURCE_EXAMPLE_CANONICAL_INPUT_BINDING_REVIEW } from '../src/research/general-natal-geju-source-example-canonical-input-binding-review.js';
import {
  GENERAL_NATAL_GEJU_POSITION_APPROPRIATENESS_PRIMITIVE_AUTHORITY_REVIEW,
  GENERAL_NATAL_GEJU_POSITION_APPROPRIATENESS_PRIMITIVE_AUTHORITY_REVIEW_DEFINITION_HASH,
} from '../src/research/general-natal-geju-position-appropriateness-primitive-authority-review.js';

describe('General Natal Gyeokguk position-appropriateness primitive authority review', () => {
  test('chains to the merged canonical-input binding review and admits only partial semantic authority', () => {
    const review = GENERAL_NATAL_GEJU_POSITION_APPROPRIATENESS_PRIMITIVE_AUTHORITY_REVIEW;

    expect(review.upstreamVersion).toBe(
      GENERAL_NATAL_GEJU_SOURCE_EXAMPLE_CANONICAL_INPUT_BINDING_REVIEW.version,
    );
    expect(review.upstreamDefinitionHash).toMatch(/^[0-9a-f]{64}$/);
    expect(GENERAL_NATAL_GEJU_POSITION_APPROPRIATENESS_PRIMITIVE_AUTHORITY_REVIEW_DEFINITION_HASH).toMatch(
      /^[0-9a-f]{64}$/,
    );
    expect(review.decision).toBe('PARTIALLY_AUTHORIZED');
    expect(review.sourceNativePositionAppropriatenessSemanticObserved).toBe(true);
    expect(review.sourceNativeNonInterferenceSemanticObserved).toBe(true);
    expect(review.boundedCaiYinPositiveExamplesObserved).toBe(true);
  });

  test('confirms canonical position substrate without promoting it into a generalized predicate', () => {
    const review = GENERAL_NATAL_GEJU_POSITION_APPROPRIATENESS_PRIMITIVE_AUTHORITY_REVIEW;

    expect(review.canonicalStemPositionInputAvailable).toBe(true);
    expect(review.canonicalTenGodInputAvailable).toBe(true);
    expect(review.canonicalInputPaths).toEqual([
      'pillars.year.stem',
      'pillars.month.stem',
      'pillars.day.stem',
      'pillars.hour.stem',
      'derivedFacts.tenGods',
    ]);
    expect(review.generalizedPositionAppropriatenessConditionExhaustive).toBe(false);
    expect(review.boundedPositiveExampleMatcherAuthorized).toBe(false);
    expect(review.generalizedExecutablePredicateAuthorized).toBe(false);
  });

  test('preserves fail-closed product and establishment boundaries', () => {
    const review = GENERAL_NATAL_GEJU_POSITION_APPROPRIATENESS_PRIMITIVE_AUTHORITY_REVIEW;

    expect(review.unauthorizedGeneralizations).toContain('reverse_year_hour_symmetry');
    expect(review.unauthorizedGeneralizations).toContain('arbitrary_pillar_pair_equivalence');
    expect(review.unauthorizedGeneralizations).toContain('multiple_cai_yin_precedence');
    expect(review.candidateDerivationAuthorized).toBe(false);
    expect(review.establishmentPredicateAuthorized).toBe(false);
    expect(review.candidateFactsEmitted).toBe(false);
    expect(review.establishmentFactsEmitted).toBe(false);
  });
});
