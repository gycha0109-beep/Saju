import { describe, expect, test } from 'vitest';
import { GENERAL_NATAL_GEJU_ESTABLISHMENT_UNRESOLVED_PRIMITIVES } from '../src/research/general-natal-geju-establishment-source-clause-admission-review.js';
import { GENERAL_NATAL_GEJU_MIXED_OUTCOME_APPLICATION_REVIEW } from '../src/research/general-natal-geju-mixed-outcome-application-review.js';
import { GENERAL_NATAL_GEJU_SOURCE_EXAMPLE_CANONICAL_INPUT_BINDING_REVIEW } from '../src/research/general-natal-geju-source-example-canonical-input-binding-review.js';

describe('source-example canonical-input binding review', () => {
  test('admits raw canonical substrate without authorizing semantic execution', () => {
    const review = GENERAL_NATAL_GEJU_SOURCE_EXAMPLE_CANONICAL_INPUT_BINDING_REVIEW;
    expect(review.upstreamMixedOutcomeApplicationVersion).toBe(
      GENERAL_NATAL_GEJU_MIXED_OUTCOME_APPLICATION_REVIEW.version,
    );
    expect(review.researchOnlyRawFactBindingAuthorized).toBe(true);
    expect(review.governedRawFactPaths).toContain('derivedFacts.tenGods');
    expect(review.governedRawFactPaths).toContain('derivedFacts.hiddenStems.*');
    expect(review.governedRawFactPaths).toContain('derivedFacts.structuralRelations');
    expect(review.unresolvedSemanticPrimitives).toBe(
      GENERAL_NATAL_GEJU_ESTABLISHMENT_UNRESOLVED_PRIMITIVES,
    );
    expect(review.sourceExampleBindingComplete).toBe(false);
    expect(review.generalizedSourceExampleMatcherAuthorized).toBe(false);
    expect(review.candidateFactsEmitted).toBe(false);
    expect(review.establishmentFactsEmitted).toBe(false);
  });
});
