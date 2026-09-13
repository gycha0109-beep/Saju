import { describe, expect, test } from 'vitest';
import { HIDDEN_STEM_MEMBERSHIP_CONTENT_HASH, HIDDEN_STEM_MEMBERSHIP_VERSION } from '../src/calculation/hidden-stems.js';
import { GENERAL_NATAL_GEJU_SOURCE_EXAMPLE_CANONICAL_INPUT_BINDING_REVIEW } from '../src/research/general-natal-geju-source-example-canonical-input-binding-review.js';
import {
  GENERAL_NATAL_GEJU_ROOT_WEIGHT_CLASSIFICATION_PRIMITIVE_AUTHORITY_REVIEW,
  GENERAL_NATAL_GEJU_ROOT_WEIGHT_CLASSIFICATION_PRIMITIVE_AUTHORITY_REVIEW_DEFINITION_HASH,
} from '../src/research/general-natal-geju-root-weight-classification-primitive-authority-review.js';

describe('root-weight classification primitive authority review', () => {
  test('admits source semantics but keeps generalized execution closed', () => {
    const review = GENERAL_NATAL_GEJU_ROOT_WEIGHT_CLASSIFICATION_PRIMITIVE_AUTHORITY_REVIEW;
    expect(review.decision).toBe('PARTIALLY_AUTHORIZED');
    expect(review.upstreamVersion).toBe(GENERAL_NATAL_GEJU_SOURCE_EXAMPLE_CANONICAL_INPUT_BINDING_REVIEW.version);
    expect(review.hiddenStemMembershipVersion).toBe(HIDDEN_STEM_MEMBERSHIP_VERSION);
    expect(review.hiddenStemMembershipContentHash).toBe(HIDDEN_STEM_MEMBERSHIP_CONTENT_HASH);
    expect(review.sourceNativeHeavyRootClassObserved).toBe(true);
    expect(review.sourceNativeLightRootClassObserved).toBe(true);
    expect(review.sourceNativeRelativeRootExamplesObserved).toBe(true);
    expect(review.sourceNativeYinGrowthExceptionObserved).toBe(true);
    expect(review.hiddenStemMembershipAuthorityLimitedToMembership).toBe(true);
    expect(review.completeStemBranchRootClassMappingAvailable).toBe(false);
    expect(review.generalizedRootWeightClassifierAuthorized).toBe(false);
    expect(review.boundedSourceExampleMatcherAuthorized).toBe(false);
    expect(review.ordinaryStrengthClassificationAuthorizedByThisReview).toBe(false);
    expect(review.unauthorizedDerivations).toContain('hidden_stem_array_position_as_root_weight');
    expect(review.unauthorizedDerivations).toContain('ungoverned_twelve_growth_table_import');
    expect(review.unauthorizedDerivations).toContain('yin_yang_growth_symmetry_assumption');
    expect(review.unauthorizedDerivations).toContain('comparative_phrase_to_numeric_score');
    expect(review.candidateFactsEmitted).toBe(false);
    expect(review.establishmentFactsEmitted).toBe(false);
    expect(GENERAL_NATAL_GEJU_ROOT_WEIGHT_CLASSIFICATION_PRIMITIVE_AUTHORITY_REVIEW_DEFINITION_HASH).toMatch(/^[0-9a-f]{64}$/);
  });
});
