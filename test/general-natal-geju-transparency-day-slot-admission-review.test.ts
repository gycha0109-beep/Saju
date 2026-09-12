import { describe, expect, test } from 'vitest';
import { GENERAL_NATAL_GEJU_CANDIDATE_OPEN_PREDICATE_GAPS } from '../src/research/general-natal-geju-candidate-source-frontier.js';
import {
  GENERAL_NATAL_GEJU_SOURCE_OBSERVED_TRANSPARENCY_SLOTS,
  GENERAL_NATAL_GEJU_TRANSPARENCY_SLOT_SOURCE_EVIDENCE_DEFINITION_HASH,
  GENERAL_NATAL_GEJU_TRANSPARENCY_SLOT_SOURCE_EVIDENCE_VERSION,
} from '../src/research/general-natal-geju-transparency-slot-source-evidence.js';
import {
  GENERAL_NATAL_GEJU_TRANSPARENCY_DAY_SLOT_ADMISSION_DECISION,
  GENERAL_NATAL_GEJU_TRANSPARENCY_DAY_SLOT_ADMISSION_REVIEW_DEFINITION_HASH,
  GENERAL_NATAL_GEJU_TRANSPARENCY_DAY_SLOT_ADMISSION_REVIEW_VERSION,
  GENERAL_NATAL_GEJU_TRANSPARENCY_DAY_SLOT_ADMISSION_SOURCE_REFERENCES,
  buildGeneralNatalGejuTransparencyDaySlotAdmissionReview,
} from '../src/research/general-natal-geju-transparency-day-slot-admission-review.js';

describe('General Natal Gyeokguk transparency day-slot admission review', () => {
  test('chains to the merged partial transparency evidence without redefining it', () => {
    const review = buildGeneralNatalGejuTransparencyDaySlotAdmissionReview();

    expect(review.reviewVersion).toBe(
      GENERAL_NATAL_GEJU_TRANSPARENCY_DAY_SLOT_ADMISSION_REVIEW_VERSION,
    );
    expect(review.upstreamTransparencyEvidenceVersion).toBe(
      GENERAL_NATAL_GEJU_TRANSPARENCY_SLOT_SOURCE_EVIDENCE_VERSION,
    );
    expect(review.upstreamTransparencyEvidenceDefinitionHash).toBe(
      GENERAL_NATAL_GEJU_TRANSPARENCY_SLOT_SOURCE_EVIDENCE_DEFINITION_HASH,
    );
    expect(review.inheritedPositiveSourceObservedSlots).toEqual(
      GENERAL_NATAL_GEJU_SOURCE_OBSERVED_TRANSPARENCY_SLOTS,
    );
    expect(review.inheritedPositiveSourceObservedSlots).toEqual(['year', 'month', 'hour']);
  });

  test('freezes the direct-source non-admission decision for day slot and exhaustiveness', () => {
    const review = buildGeneralNatalGejuTransparencyDaySlotAdmissionReview();

    expect(review.decision).toBe(GENERAL_NATAL_GEJU_TRANSPARENCY_DAY_SLOT_ADMISSION_DECISION);
    expect(review.decision).toBe(
      'DIRECT_SOURCE_DAY_SLOT_AND_EXHAUSTIVENESS_NOT_ESTABLISHED_SECONDARY_EXPLANATION_NOT_PROMOTED',
    );
    expect(review.directGenericTransparencyDefinitionObserved).toBe(true);
    expect(review.directSourceDaySlotInclusionObserved).toBe(false);
    expect(review.directSourceDaySlotExclusionObserved).toBe(false);
    expect(review.directSourceSlotSetExhaustivenessObserved).toBe(false);
    expect(review.daySlotAdmissibility).toBe('unresolved');
    expect(review.transparencySlotSetExhaustiveness).toBe('unresolved');
  });

  test('records secondary year/month/hour guidance without promoting it into predicate authority', () => {
    const review = buildGeneralNatalGejuTransparencyDaySlotAdmissionReview();

    expect(review.secondaryYearMonthHourOnlyExplanationObserved).toBe(true);
    expect(review.secondaryEvidencePromotedToPredicate).toBe(false);
    expect(
      GENERAL_NATAL_GEJU_TRANSPARENCY_DAY_SLOT_ADMISSION_SOURCE_REFERENCES
        .secondaryYearMonthHourExplanation.provenanceTier,
    ).toBe('practitioner_secondary');
    expect(
      GENERAL_NATAL_GEJU_TRANSPARENCY_DAY_SLOT_ADMISSION_SOURCE_REFERENCES
        .secondaryYearMonthHourExplanation.locator,
    ).toEqual({
      section: '查透干，先做哪三个动作？',
      anchor: '年、月或时干',
    });
  });

  test('does not over-read generic 透於干 wording into day inclusion or exclusion', () => {
    const review = buildGeneralNatalGejuTransparencyDaySlotAdmissionReview();
    const directEvidence = review.evidence.find(
      (item) => item.key === 'direct_generic_transparency_definition',
    );

    expect(directEvidence).toBeDefined();
    expect(directEvidence?.daySlotInclusionAuthorized).toBe(false);
    expect(directEvidence?.daySlotExclusionAuthorized).toBe(false);
    expect(directEvidence?.exhaustiveSlotSetAuthorized).toBe(false);
    expect(directEvidence?.fullTransparencyPredicateAuthorized).toBe(false);
  });

  test('keeps all candidate and establishment authority fail closed', () => {
    const review = buildGeneralNatalGejuTransparencyDaySlotAdmissionReview();

    expect(review.fullTransparencyPredicateAuthorized).toBe(false);
    expect(review.transparencySelectionPredicateAuthorized).toBe(false);
    expect(review.candidateDerivationAuthorized).toBe(false);
    expect(review.establishmentPredicateAuthorized).toBe(false);
    expect(review.candidateFactsEmitted).toBe(false);
    expect(review.establishmentFactsEmitted).toBe(false);
  });

  test('keeps all five coarse Gyeokguk predicate gaps open', () => {
    const review = buildGeneralNatalGejuTransparencyDaySlotAdmissionReview();

    expect(review.openPredicateGaps).toEqual(GENERAL_NATAL_GEJU_CANDIDATE_OPEN_PREDICATE_GAPS);
    expect(review.openPredicateGaps).toHaveLength(5);
    expect(review.openPredicateGaps).toContain(
      'VISIBLE_STEM_TRANSPARENCY_SELECTION_PREDICATE_AUTHORITY_MISSING',
    );
  });

  test('is deterministic and content-addressed', () => {
    const first = buildGeneralNatalGejuTransparencyDaySlotAdmissionReview();
    const second = buildGeneralNatalGejuTransparencyDaySlotAdmissionReview();

    expect(first).toEqual(second);
    expect(first.reviewId).toBe(second.reviewId);
    expect(first.reviewId).toMatch(
      /^general_natal_geju_transparency_day_slot_admission_review_[0-9a-f]{24}$/,
    );
    expect(GENERAL_NATAL_GEJU_TRANSPARENCY_DAY_SLOT_ADMISSION_REVIEW_DEFINITION_HASH).toHaveLength(
      64,
    );
  });
});