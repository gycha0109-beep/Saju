import { describe, expect, test } from 'vitest';
import {
  GENERAL_NATAL_GEJU_CANDIDATE_OPEN_PREDICATE_GAPS,
  GENERAL_NATAL_GEJU_CANDIDATE_SOURCE_FRONTIER_DEFINITION_HASH,
  GENERAL_NATAL_GEJU_CANDIDATE_SOURCE_FRONTIER_VERSION,
} from '../src/research/general-natal-geju-candidate-source-frontier.js';
import {
  GENERAL_NATAL_GEJU_CANDIDATE_IDENTITY_ADMISSION_REVIEW_DEFINITION_HASH,
  GENERAL_NATAL_GEJU_CANDIDATE_IDENTITY_ADMISSION_REVIEW_VERSION,
} from '../src/research/general-natal-geju-candidate-identity-admission-review.js';
import {
  GENERAL_NATAL_GEJU_ESTABLISHMENT_PATTERN_FAMILIES,
  GENERAL_NATAL_GEJU_ESTABLISHMENT_SOURCE_CLAUSE_ADMISSION_DECISION,
  GENERAL_NATAL_GEJU_ESTABLISHMENT_SOURCE_CLAUSE_ADMISSION_REVIEW_DEFINITION_HASH,
  GENERAL_NATAL_GEJU_ESTABLISHMENT_SOURCE_CLAUSE_ADMISSION_REVIEW_VERSION,
  GENERAL_NATAL_GEJU_ESTABLISHMENT_UNRESOLVED_PRIMITIVES,
  buildGeneralNatalGejuEstablishmentSourceClauseAdmissionReview,
} from '../src/research/general-natal-geju-establishment-source-clause-admission-review.js';

describe('General Natal Gyeokguk establishment source-clause admission review', () => {
  test('chains to the merged candidate and candidate-identity authority boundaries', () => {
    const review = buildGeneralNatalGejuEstablishmentSourceClauseAdmissionReview();

    expect(review.reviewVersion).toBe(
      GENERAL_NATAL_GEJU_ESTABLISHMENT_SOURCE_CLAUSE_ADMISSION_REVIEW_VERSION,
    );
    expect(review.upstreamCandidateFrontierVersion).toBe(
      GENERAL_NATAL_GEJU_CANDIDATE_SOURCE_FRONTIER_VERSION,
    );
    expect(review.upstreamCandidateFrontierDefinitionHash).toBe(
      GENERAL_NATAL_GEJU_CANDIDATE_SOURCE_FRONTIER_DEFINITION_HASH,
    );
    expect(review.upstreamCandidateIdentityReviewVersion).toBe(
      GENERAL_NATAL_GEJU_CANDIDATE_IDENTITY_ADMISSION_REVIEW_VERSION,
    );
    expect(review.upstreamCandidateIdentityReviewDefinitionHash).toBe(
      GENERAL_NATAL_GEJU_CANDIDATE_IDENTITY_ADMISSION_REVIEW_DEFINITION_HASH,
    );
  });

  test('admits direct source clause inventory only at research authority', () => {
    const review = buildGeneralNatalGejuEstablishmentSourceClauseAdmissionReview();

    expect(review.directSourceFormationSuccessClausesObserved).toBe(true);
    expect(review.directSourceFormationFailureClausesObserved).toBe(true);
    expect(review.directSourceMixedOutcomeAndRescueLayerObserved).toBe(true);
    expect(review.sourceSemanticEstablishmentClauseInventoryAuthorized).toBe(true);
    expect(review.sourcePatternFamilyScopeObserved).toBe(true);
  });

  test('preserves the eight directly observed pattern-family scopes', () => {
    const review = buildGeneralNatalGejuEstablishmentSourceClauseAdmissionReview();

    expect(review.patternFamilies).toEqual(GENERAL_NATAL_GEJU_ESTABLISHMENT_PATTERN_FAMILIES);
    expect(review.patternFamilies).toHaveLength(8);
    expect(review.patternFamilies).toEqual([
      'zheng_guan',
      'cai',
      'yin',
      'shi_shen',
      'qi_sha',
      'shang_guan',
      'yang_ren',
      'jian_lu_yue_jie',
    ]);
  });

  test('keeps mixed outcome and rescue semantics out of an unqualified binary promotion', () => {
    const review = buildGeneralNatalGejuEstablishmentSourceClauseAdmissionReview();

    expect(review.decision).toBe(GENERAL_NATAL_GEJU_ESTABLISHMENT_SOURCE_CLAUSE_ADMISSION_DECISION);
    expect(review.binaryEstablishmentStateSufficient).toBe(false);
    expect(review.canonicalClauseInputResolutionAuthorized).toBe(false);
    expect(review.canonicalExecutableEstablishmentPredicateAuthorized).toBe(false);
  });

  test('records the unresolved canonical primitives that still block execution', () => {
    const review = buildGeneralNatalGejuEstablishmentSourceClauseAdmissionReview();

    expect(review.unresolvedPrimitives).toEqual(
      GENERAL_NATAL_GEJU_ESTABLISHMENT_UNRESOLVED_PRIMITIVES,
    );
    expect(review.unresolvedPrimitives).toContain('canonical_candidate_identity');
    expect(review.unresolvedPrimitives).toContain('ordinary_strength_classification');
    expect(review.unresolvedPrimitives).toContain('position_appropriateness');
    expect(review.unresolvedPrimitives).toContain('mixed_outcome_representation');
    expect(review.unresolvedPrimitives).toContain('rescue_precedence_and_weighting');
  });

  test('narrows but does not close the establishment coarse gap', () => {
    const review = buildGeneralNatalGejuEstablishmentSourceClauseAdmissionReview();

    expect(review.establishmentGapNarrowedToCanonicalExecution).toBe(true);
    expect(review.establishmentCoarseGapClosed).toBe(false);
    expect(review.openPredicateGaps).toEqual(GENERAL_NATAL_GEJU_CANDIDATE_OPEN_PREDICATE_GAPS);
    expect(review.openPredicateGaps).toContain(
      'GEJU_ESTABLISHMENT_SUCCESS_FAILURE_PREDICATE_AUTHORITY_MISSING',
    );
  });

  test('does not emit candidate or establishment facts', () => {
    const review = buildGeneralNatalGejuEstablishmentSourceClauseAdmissionReview();

    expect(review.canonicalCandidateIdentityAvailable).toBe(false);
    expect(review.candidateDerivationAuthorized).toBe(false);
    expect(review.establishmentPredicateAuthorized).toBe(false);
    expect(review.candidateFactsEmitted).toBe(false);
    expect(review.establishmentFactsEmitted).toBe(false);
  });

  test('is deterministic and content-addressed', () => {
    const first = buildGeneralNatalGejuEstablishmentSourceClauseAdmissionReview();
    const second = buildGeneralNatalGejuEstablishmentSourceClauseAdmissionReview();

    expect(first).toEqual(second);
    expect(first.reviewId).toBe(second.reviewId);
    expect(first.reviewId).toMatch(
      /^general_natal_geju_establishment_source_clause_admission_review_[0-9a-f]{24}$/,
    );
    expect(
      GENERAL_NATAL_GEJU_ESTABLISHMENT_SOURCE_CLAUSE_ADMISSION_REVIEW_DEFINITION_HASH,
    ).toHaveLength(64);
  });
});
