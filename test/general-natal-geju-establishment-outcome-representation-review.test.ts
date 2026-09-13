import { describe, expect, test } from 'vitest';
import { GENERAL_NATAL_GEJU_CANDIDATE_OPEN_PREDICATE_GAPS } from '../src/research/general-natal-geju-candidate-source-frontier.js';
import {
  GENERAL_NATAL_GEJU_ESTABLISHMENT_SOURCE_CLAUSE_ADMISSION_REVIEW_DEFINITION_HASH,
  GENERAL_NATAL_GEJU_ESTABLISHMENT_SOURCE_CLAUSE_ADMISSION_REVIEW_VERSION,
} from '../src/research/general-natal-geju-establishment-source-clause-admission-review.js';
import {
  GENERAL_NATAL_GEJU_ESTABLISHMENT_OUTCOME_REPRESENTATION_DECISION,
  GENERAL_NATAL_GEJU_ESTABLISHMENT_OUTCOME_REPRESENTATION_REVIEW_DEFINITION_HASH,
  GENERAL_NATAL_GEJU_ESTABLISHMENT_OUTCOME_REPRESENTATION_REVIEW_VERSION,
  GENERAL_NATAL_GEJU_OUTCOME_REPRESENTATION_UNRESOLVED_CANONICAL_PRIMITIVES,
  GENERAL_NATAL_GEJU_SOURCE_BASE_OUTCOME_VALUES,
  GENERAL_NATAL_GEJU_SOURCE_CAUSAL_TRANSITION_VALUES,
  GENERAL_NATAL_GEJU_SOURCE_DIRECT_RELATION_BINDINGS,
  GENERAL_NATAL_GEJU_SOURCE_INTERVENTION_VALUES,
  GENERAL_NATAL_GEJU_SOURCE_MIXED_OUTCOME_VALUES,
  GENERAL_NATAL_GEJU_SOURCE_OUTCOME_AXES,
  buildGeneralNatalGejuEstablishmentOutcomeRepresentationReview,
} from '../src/research/general-natal-geju-establishment-outcome-representation-review.js';

describe('General Natal Gyeokguk establishment outcome representation review', () => {
  test('chains exactly to the merged establishment source-clause review', () => {
    const review = buildGeneralNatalGejuEstablishmentOutcomeRepresentationReview();

    expect(review.reviewVersion).toBe(
      GENERAL_NATAL_GEJU_ESTABLISHMENT_OUTCOME_REPRESENTATION_REVIEW_VERSION,
    );
    expect(review.upstreamEstablishmentReviewVersion).toBe(
      GENERAL_NATAL_GEJU_ESTABLISHMENT_SOURCE_CLAUSE_ADMISSION_REVIEW_VERSION,
    );
    expect(review.upstreamEstablishmentReviewDefinitionHash).toBe(
      GENERAL_NATAL_GEJU_ESTABLISHMENT_SOURCE_CLAUSE_ADMISSION_REVIEW_DEFINITION_HASH,
    );
  });

  test('preserves four distinct source-semantic axes', () => {
    const review = buildGeneralNatalGejuEstablishmentOutcomeRepresentationReview();

    expect(review.outcomeAxes).toEqual(GENERAL_NATAL_GEJU_SOURCE_OUTCOME_AXES);
    expect(GENERAL_NATAL_GEJU_SOURCE_BASE_OUTCOME_VALUES).toEqual(['cheng', 'bai']);
    expect(GENERAL_NATAL_GEJU_SOURCE_MIXED_OUTCOME_VALUES).toEqual([
      'cheng_zhong_you_bai',
      'bai_zhong_you_cheng',
    ]);
    expect(GENERAL_NATAL_GEJU_SOURCE_INTERVENTION_VALUES).toEqual(['dai_ji', 'jiu_ying']);
    expect(GENERAL_NATAL_GEJU_SOURCE_CAUSAL_TRANSITION_VALUES).toEqual([
      'yin_cheng_de_bai',
      'yin_bai_de_cheng',
    ]);
    expect(review.outcomeAxes).toHaveLength(4);
  });

  test('binds only the direct mixed-outcome intervention relations', () => {
    const review = buildGeneralNatalGejuEstablishmentOutcomeRepresentationReview();

    expect(review.directRelationBindings).toEqual(GENERAL_NATAL_GEJU_SOURCE_DIRECT_RELATION_BINDINGS);
    expect(review.directRelationBindings).toEqual([
      expect.objectContaining({
        mixedOutcome: 'cheng_zhong_you_bai',
        intervention: 'dai_ji',
      }),
      expect.objectContaining({
        mixedOutcome: 'bai_zhong_you_cheng',
        intervention: 'jiu_ying',
      }),
    ]);
    expect(review.sourceMixedOutcomeInterventionBindingsAuthorized).toBe(true);
  });

  test('does not equate mixed-outcome phrases with later causal-transition vocabulary', () => {
    const review = buildGeneralNatalGejuEstablishmentOutcomeRepresentationReview();

    expect(review.sourceCausalTransitionVocabularyObserved).toBe(true);
    expect(review.mixedOutcomeToTransitionEquivalenceAuthorized).toBe(false);
    expect(review.decision).toBe(
      GENERAL_NATAL_GEJU_ESTABLISHMENT_OUTCOME_REPRESENTATION_DECISION,
    );
  });

  test('authorizes research representation but not canonical outcome execution', () => {
    const review = buildGeneralNatalGejuEstablishmentOutcomeRepresentationReview();

    expect(review.sourceSemanticLayeredRepresentationAuthorized).toBe(true);
    expect(review.canonicalOutcomeRepresentationAuthorized).toBe(false);
    expect(review.canonicalTerminalStateAuthorized).toBe(false);
    expect(review.binaryCollapseAuthorized).toBe(false);
    expect(review.rescuePrecedenceAuthorized).toBe(false);
    expect(review.candidateFactsEmitted).toBe(false);
    expect(review.establishmentFactsEmitted).toBe(false);
  });

  test('records unresolved canonical primitives after the representation advance', () => {
    const review = buildGeneralNatalGejuEstablishmentOutcomeRepresentationReview();

    expect(review.unresolvedCanonicalPrimitives).toEqual(
      GENERAL_NATAL_GEJU_OUTCOME_REPRESENTATION_UNRESOLVED_CANONICAL_PRIMITIVES,
    );
    expect(review.unresolvedCanonicalPrimitives).toContain('canonical_candidate_identity');
    expect(review.unresolvedCanonicalPrimitives).toContain('mixed_outcome_application_predicate');
    expect(review.unresolvedCanonicalPrimitives).toContain('transition_trigger_predicate');
    expect(review.unresolvedCanonicalPrimitives).toContain('terminal_state_precedence');
  });

  test('keeps all five coarse Gyeokguk gaps open', () => {
    const review = buildGeneralNatalGejuEstablishmentOutcomeRepresentationReview();

    expect(review.openPredicateGaps).toEqual(GENERAL_NATAL_GEJU_CANDIDATE_OPEN_PREDICATE_GAPS);
    expect(review.openPredicateGaps).toHaveLength(5);
    expect(review.openPredicateGaps).toContain(
      'GEJU_ESTABLISHMENT_SUCCESS_FAILURE_PREDICATE_AUTHORITY_MISSING',
    );
  });

  test('is deterministic and content-addressed', () => {
    const first = buildGeneralNatalGejuEstablishmentOutcomeRepresentationReview();
    const second = buildGeneralNatalGejuEstablishmentOutcomeRepresentationReview();

    expect(first).toEqual(second);
    expect(first.reviewId).toBe(second.reviewId);
    expect(first.reviewId).toMatch(
      /^general_natal_geju_establishment_outcome_representation_review_[0-9a-f]{24}$/,
    );
    expect(
      GENERAL_NATAL_GEJU_ESTABLISHMENT_OUTCOME_REPRESENTATION_REVIEW_DEFINITION_HASH,
    ).toHaveLength(64);
  });
});
