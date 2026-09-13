import { describe, expect, test } from 'vitest';
import {
  GENERAL_NATAL_GEJU_CANDIDATE_OPEN_PREDICATE_GAPS,
  GENERAL_NATAL_GEJU_CANDIDATE_SOURCE_FRONTIER_DEFINITION_HASH,
  GENERAL_NATAL_GEJU_CANDIDATE_SOURCE_FRONTIER_VERSION,
} from '../src/research/general-natal-geju-candidate-source-frontier.js';
import {
  GENERAL_NATAL_GEJU_MONTH_ORDER_TRANSPARENCY_OBSERVATION_DEFINITION_HASH,
  GENERAL_NATAL_GEJU_MONTH_ORDER_TRANSPARENCY_OBSERVATION_VERSION,
} from '../src/research/general-natal-geju-month-order-transparency-observation.js';
import {
  GENERAL_NATAL_GEJU_MONTH_ORDER_HIDDEN_STEM_SELECTION_ADMISSION_DECISION,
  GENERAL_NATAL_GEJU_MONTH_ORDER_HIDDEN_STEM_SELECTION_ADMISSION_REVIEW_DEFINITION_HASH,
  GENERAL_NATAL_GEJU_MONTH_ORDER_HIDDEN_STEM_SELECTION_ADMISSION_REVIEW_VERSION,
  GENERAL_NATAL_GEJU_MONTH_ORDER_HIDDEN_STEM_SELECTION_ADMISSION_SOURCE_REFERENCES,
  buildGeneralNatalGejuMonthOrderHiddenStemSelectionAdmissionReview,
} from '../src/research/general-natal-geju-month-order-hidden-stem-selection-admission-review.js';

describe('General Natal Gyeokguk month-order hidden-stem selection admission review', () => {
  test('chains to merged candidate-frontier and month-order observation authority', () => {
    const review = buildGeneralNatalGejuMonthOrderHiddenStemSelectionAdmissionReview();

    expect(review.reviewVersion).toBe(
      GENERAL_NATAL_GEJU_MONTH_ORDER_HIDDEN_STEM_SELECTION_ADMISSION_REVIEW_VERSION,
    );
    expect(review.upstreamCandidateFrontierVersion).toBe(
      GENERAL_NATAL_GEJU_CANDIDATE_SOURCE_FRONTIER_VERSION,
    );
    expect(review.upstreamCandidateFrontierDefinitionHash).toBe(
      GENERAL_NATAL_GEJU_CANDIDATE_SOURCE_FRONTIER_DEFINITION_HASH,
    );
    expect(review.upstreamMonthOrderObservationVersion).toBe(
      GENERAL_NATAL_GEJU_MONTH_ORDER_TRANSPARENCY_OBSERVATION_VERSION,
    );
    expect(review.upstreamMonthOrderObservationDefinitionHash).toBe(
      GENERAL_NATAL_GEJU_MONTH_ORDER_TRANSPARENCY_OBSERVATION_DEFINITION_HASH,
    );
    expect(review.monthOrderHiddenStemMembershipEnumerationAuthorized).toBe(true);
  });

  test('preserves exact direct-source 寅 primary-role and transparency-substitution evidence', () => {
    const review = buildGeneralNatalGejuMonthOrderHiddenStemSelectionAdmissionReview();

    expect(review.directSourceMonthOrderPluralityObserved).toBe(true);
    expect(review.directSourceYinExactPrimaryRoleObserved).toBe(true);
    expect(review.directSourceYinExactTransparencySubstitutionObserved).toBe(true);
    expect(
      GENERAL_NATAL_GEJU_MONTH_ORDER_HIDDEN_STEM_SELECTION_ADMISSION_SOURCE_REFERENCES
        .yinPrimaryRole.locator,
    ).toEqual({
      section: '論用神變化',
      anchor: '即以寅論，甲為本主，如郡之有府，丙其長生，如郡之有同知，戊亦長生，如郡之有通判',
    });
    expect(
      GENERAL_NATAL_GEJU_MONTH_ORDER_HIDDEN_STEM_SELECTION_ADMISSION_SOURCE_REFERENCES
        .yinTransparencySubstitution.locator,
    ).toEqual({
      section: '論用神變化',
      anchor: '假使寅月為提，不透甲而透丙，則如知府不臨郡，而同知得以作主',
    });
  });

  test('does not generalize the exact 寅 evidence into storage-order or all-branch ranking authority', () => {
    const review = buildGeneralNatalGejuMonthOrderHiddenStemSelectionAdmissionReview();
    const primaryEvidence = review.evidence.find((item) => item.key === 'direct_yin_primary_role');
    const substitutionEvidence = review.evidence.find(
      (item) => item.key === 'direct_yin_transparency_substitution',
    );

    expect(review.directSourceYinRoleGeneralizedBeyondYin).toBe(false);
    expect(review.hiddenStemStorageOrderRankingAuthorized).toBe(false);
    expect(review.mainSecondaryResidualMappingAuthorized).toBe(false);
    expect(review.monthCommandDurationAuthorized).toBe(false);
    expect(review.allBranchPrimaryHiddenStemMapping).toBe('unresolved');
    expect(primaryEvidence?.exactYinScoped).toBe(true);
    expect(primaryEvidence?.allBranchPrimaryHiddenStemMappingAuthorized).toBe(false);
    expect(substitutionEvidence?.exactYinScoped).toBe(true);
    expect(substitutionEvidence?.generalizedSelectionPredicateAuthorized).toBe(false);
  });

  test('freezes the generalized selector non-admission decision', () => {
    const review = buildGeneralNatalGejuMonthOrderHiddenStemSelectionAdmissionReview();

    expect(review.decision).toBe(
      GENERAL_NATAL_GEJU_MONTH_ORDER_HIDDEN_STEM_SELECTION_ADMISSION_DECISION,
    );
    expect(review.decision).toBe(
      'DIRECT_SOURCE_EXACT_YIN_PRIMARY_AND_TRANSPARENCY_SUBSTITUTION_OBSERVED_GENERALIZED_ALL_BRANCH_SELECTOR_NOT_ESTABLISHED',
    );
    expect(review.generalizedMonthOrderHiddenStemSelectionPredicateAuthorized).toBe(false);
    expect(review.transparencySelectionPredicateAuthorized).toBe(false);
    expect(review.branchMeetingSelectionEffectAuthorized).toBe(false);
    expect(review.multipleCandidateRepresentationAuthorized).toBe(false);
  });

  test('keeps candidate, establishment, production-facing authority fail closed', () => {
    const review = buildGeneralNatalGejuMonthOrderHiddenStemSelectionAdmissionReview();

    expect(review.candidateDerivationAuthorized).toBe(false);
    expect(review.establishmentPredicateAuthorized).toBe(false);
    expect(review.candidateFactsEmitted).toBe(false);
    expect(review.establishmentFactsEmitted).toBe(false);
  });

  test('keeps all five coarse Gyeokguk gaps open', () => {
    const review = buildGeneralNatalGejuMonthOrderHiddenStemSelectionAdmissionReview();

    expect(review.openPredicateGaps).toEqual(GENERAL_NATAL_GEJU_CANDIDATE_OPEN_PREDICATE_GAPS);
    expect(review.openPredicateGaps).toHaveLength(5);
    expect(review.openPredicateGaps).toContain(
      'MONTH_ORDER_HIDDEN_STEM_SELECTION_PREDICATE_AUTHORITY_MISSING',
    );
  });

  test('is deterministic and content-addressed', () => {
    const first = buildGeneralNatalGejuMonthOrderHiddenStemSelectionAdmissionReview();
    const second = buildGeneralNatalGejuMonthOrderHiddenStemSelectionAdmissionReview();

    expect(first).toEqual(second);
    expect(first.reviewId).toBe(second.reviewId);
    expect(first.reviewId).toMatch(
      /^general_natal_geju_month_order_hidden_stem_selection_admission_review_[0-9a-f]{24}$/,
    );
    expect(
      GENERAL_NATAL_GEJU_MONTH_ORDER_HIDDEN_STEM_SELECTION_ADMISSION_REVIEW_DEFINITION_HASH,
    ).toHaveLength(64);
  });
});
