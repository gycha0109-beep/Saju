import { describe, expect, test } from 'vitest';
import { GENERAL_NATAL_GEJU_CANDIDATE_OPEN_PREDICATE_GAPS } from '../src/research/general-natal-geju-candidate-source-frontier.js';
import {
  GENERAL_NATAL_GEJU_CANDIDATE_IDENTITY_ADMISSION_DECISION,
  GENERAL_NATAL_GEJU_CANDIDATE_IDENTITY_ADMISSION_REVIEW_DEFINITION_HASH,
  GENERAL_NATAL_GEJU_CANDIDATE_IDENTITY_ADMISSION_REVIEW_VERSION,
  GENERAL_NATAL_GEJU_CANDIDATE_IDENTITY_ADMISSION_SOURCE_REFERENCES,
  buildGeneralNatalGejuCandidateIdentityAdmissionReview,
} from '../src/research/general-natal-geju-candidate-identity-admission-review.js';
import {
  GENERAL_NATAL_GEJU_SOURCE_SEMANTIC_USE_IDENTITY_DEFINITION_HASH,
  GENERAL_NATAL_GEJU_SOURCE_SEMANTIC_USE_IDENTITY_VERSION,
} from '../src/research/general-natal-geju-source-semantic-use-identity.js';

describe('General Natal Gyeokguk candidate identity admission review', () => {
  test('records the source-backed use/pattern wording boundary without admitting a canonical candidate stage', () => {
    const review = buildGeneralNatalGejuCandidateIdentityAdmissionReview();

    expect(GENERAL_NATAL_GEJU_CANDIDATE_IDENTITY_ADMISSION_REVIEW_VERSION).toBe(
      '0.1.0-research',
    );
    expect(review.decision).toBe(GENERAL_NATAL_GEJU_CANDIDATE_IDENTITY_ADMISSION_DECISION);
    expect(review.decision).toBe(
      'SOURCE_USE_AND_PATTERN_WORDING_OBSERVED_PRE_ESTABLISHMENT_CANONICAL_CANDIDATE_STAGE_NOT_DEFINED',
    );
    expect(review.sourceUseSelectionIdentityObserved).toBe(true);
    expect(review.sourceNamedPatternWordingObserved).toBe(true);
    expect(review.sourceFormationOutcomeWordingObserved).toBe(true);
    expect(review.sourcePrimaryCoPatternWordingObserved).toBe(true);
    expect(review.selectionEstablishmentSeparationStillRequired).toBe(true);
  });

  test('chains exactly to the merged source-semantic-use authority rather than recreating signal identity', () => {
    const review = buildGeneralNatalGejuCandidateIdentityAdmissionReview();

    expect(review.upstreamSemanticUseVersion).toBe(
      GENERAL_NATAL_GEJU_SOURCE_SEMANTIC_USE_IDENTITY_VERSION,
    );
    expect(review.upstreamSemanticUseDefinitionHash).toBe(
      GENERAL_NATAL_GEJU_SOURCE_SEMANTIC_USE_IDENTITY_DEFINITION_HASH,
    );
    expect(review.upstreamSemanticUseDefinitionHash).toHaveLength(64);
  });

  test('separates source-use selection, named pattern wording, formation outcome, and primary/co-pattern wording', () => {
    const review = buildGeneralNatalGejuCandidateIdentityAdmissionReview();

    expect(review.evidence.map((item) => item.key)).toEqual([
      'source_use_selection_plurality',
      'source_named_pattern_wording',
      'source_formation_outcome_wording',
      'source_primary_co_pattern_wording',
    ]);
    expect(review.evidence.every((item) => item.sourceBoundaryObserved)).toBe(true);
    expect(
      review.evidence.every((item) => !item.preEstablishmentCanonicalCandidateStageAuthorized),
    ).toBe(true);
  });

  test('preserves exact direct-source locators for formation and co-pattern wording', () => {
    expect(
      GENERAL_NATAL_GEJU_CANDIDATE_IDENTITY_ADMISSION_SOURCE_REFERENCES.mixedQiFormationOutcome
        .locator,
    ).toEqual({
      section: '論雜氣如何取用',
      anchor: '印格不成',
    });
    expect(
      GENERAL_NATAL_GEJU_CANDIDATE_IDENTITY_ADMISSION_SOURCE_REFERENCES
        .useVariationPrimaryCoPattern.locator,
    ).toEqual({
      section: '論用神變化',
      anchor: '格成正財，正官乃其兼格也',
    });
  });

  test('does not promote source-use identity or source pattern words into GEJU_CANDIDATE', () => {
    const review = buildGeneralNatalGejuCandidateIdentityAdmissionReview();

    expect(review.sourceUseToCanonicalCandidateBridgeAuthorized).toBe(false);
    expect(review.sourcePatternWordingToPreEstablishmentCandidateBridgeAuthorized).toBe(false);
    expect(review.canonicalCandidateStageDefinitionAuthorized).toBe(false);
    expect(review.semanticUseDeduplicationIntoCandidateAuthorized).toBe(false);
    expect(review.candidateIdentityAuthorized).toBe(false);
    expect(review.multipleCandidateRepresentationAuthorized).toBe(false);
    expect(review.candidateDerivationAuthorized).toBe(false);
    expect(review.candidateFactsEmitted).toBe(false);
  });

  test('does not turn an exact source primary/co-pattern phrase into generalized precedence', () => {
    const review = buildGeneralNatalGejuCandidateIdentityAdmissionReview();

    expect(review.sourcePrimaryCoPatternWordingObserved).toBe(true);
    expect(review.primaryCoPatternGeneralizedPrecedenceAuthorized).toBe(false);
  });

  test('keeps establishment authority separately blocked', () => {
    const review = buildGeneralNatalGejuCandidateIdentityAdmissionReview();

    expect(review.selectionEstablishmentSeparationStillRequired).toBe(true);
    expect(review.establishmentPredicateAuthorized).toBe(false);
    expect(review.establishmentFactsEmitted).toBe(false);
  });

  test('keeps all five coarse General Natal Gyeokguk authority gaps open', () => {
    const review = buildGeneralNatalGejuCandidateIdentityAdmissionReview();

    expect(review.openPredicateGaps).toEqual(GENERAL_NATAL_GEJU_CANDIDATE_OPEN_PREDICATE_GAPS);
    expect(review.openPredicateGaps).toHaveLength(5);
  });

  test('is deterministic and content-addressed', () => {
    const first = buildGeneralNatalGejuCandidateIdentityAdmissionReview();
    const second = buildGeneralNatalGejuCandidateIdentityAdmissionReview();

    expect(first).toEqual(second);
    expect(first.reviewId).toBe(second.reviewId);
    expect(first.reviewId).toMatch(/^general_natal_geju_candidate_identity_admission_review_[0-9a-f]{24}$/);
    expect(GENERAL_NATAL_GEJU_CANDIDATE_IDENTITY_ADMISSION_REVIEW_DEFINITION_HASH).toHaveLength(64);
  });
});
