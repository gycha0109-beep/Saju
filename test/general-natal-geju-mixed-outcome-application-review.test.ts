import { describe, expect, test } from 'vitest';
import {
  GENERAL_NATAL_GEJU_ESTABLISHMENT_OUTCOME_REPRESENTATION_REVIEW_DEFINITION_HASH,
  GENERAL_NATAL_GEJU_ESTABLISHMENT_OUTCOME_REPRESENTATION_REVIEW_VERSION,
} from '../src/research/general-natal-geju-establishment-outcome-representation-review.js';
import { GENERAL_NATAL_GEJU_MIXED_OUTCOME_APPLICATION_REVIEW } from '../src/research/general-natal-geju-mixed-outcome-application-review.js';

describe('mixed-outcome application review', () => {
  test('preserves the research-only boundary', () => {
    const review = GENERAL_NATAL_GEJU_MIXED_OUTCOME_APPLICATION_REVIEW;
    expect(review.upstreamVersion).toBe(
      GENERAL_NATAL_GEJU_ESTABLISHMENT_OUTCOME_REPRESENTATION_REVIEW_VERSION,
    );
    expect(review.upstreamHash).toBe(
      GENERAL_NATAL_GEJU_ESTABLISHMENT_OUTCOME_REPRESENTATION_REVIEW_DEFINITION_HASH,
    );
    expect(review.directExamplesObserved).toBe(true);
    expect(review.examplesExhaustive).toBe(false);
    expect(review.canonicalSegmentationAuthorized).toBe(false);
    expect(review.generalizedRuleAuthorized).toBe(false);
    expect(review.matcherAuthorized).toBe(false);
    expect(review.stateEmissionAuthorized).toBe(false);
  });
});
