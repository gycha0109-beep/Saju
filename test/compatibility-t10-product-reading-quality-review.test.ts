import { describe, expect, it } from 'vitest';
import type { BirthInput } from '../src/contracts/calculation.js';
import { buildCompatibilityTwoBirthResearchReading } from
  '../src/preview/compatibility-two-birth-research-runtime.js';
import { auditT10ProductReadingQualityV1 } from
  '../src/research/compatibility-t10-product-reading-quality-review.js';

const birth = (
  year: number, month: number, day: number,
  known = true,
): BirthInput => ({
  calendarType: 'solar',
  date: { year, month, day },
  time: known ? { known: true, hour: 14, minute: 30 } : { known: false },
  sexForTraditionalCalculation: 'unspecified',
});
const A = birth(1990, 5, 15);
const OPPOSITE_A = birth(1996, 6, 5);
const OPPOSITE_B = birth(1996, 8, 5);
const SINGLE = birth(1990, 5, 8);
const YEAR = birth(2017, 5, 15);
const run = (a: BirthInput, b: BirthInput, research = true) =>
  buildCompatibilityTwoBirthResearchReading(a, b, {
    requestId: 't10-product-reading-quality-review',
    subjectPersonRef: 'human-subject',
    targetPersonRef: 'human-target',
    referenceDateTime: '2026-11-11T00:00:00.000Z',
    ...(research ? { candidateScope: 'traditional_marital_palace_comparison' as const } : {}),
  });

describe('T10 product quality: factual material never becomes a complete relationship product', () => {
  it('audits fact provenance and the two opposing structural cases separately', () => {
    const a = run(A, OPPOSITE_A).productReadingQualityReview;
    const b = run(A, OPPOSITE_B).productReadingQualityReview;
    expect(a?.caseDistinction).toBe('day_six_combination_and_other_clash');
    expect(b?.caseDistinction).toBe('day_clash_and_other_six_combination');
    expect(a?.traceAudit.sectionToTextRoundTrip).toBe(true);
    expect(a?.traceAudit.validatedSentenceCount).toBeGreaterThan(4);
    expect(a?.traceAudit.verifiedStructuralFactSentenceCount).toBeGreaterThan(0);
    expect(a?.traceAudit.sectionIds).toContain('mixed_positions');
    expect(a?.actualCompatibilityReadingReady).toBe(false);
    expect(b?.actualCompatibilityReadingReady).toBe(false);
  });

  it('does not invent a multi-factor conflict if only one factor is present', () => {
    const result = run(A, SINGLE).productReadingQualityReview;
    expect(result?.caseDistinction).toBe('no_verified_mixed_day_structure');
    expect(result?.traceAudit.sectionIds).not.toContain('mixed_positions');
    expect(result?.researchReadingQuality).toBe('traceable_factual_draft_only');
  });

  it('audits all three configured product compositions independently', () => {
    const review = run(A, YEAR).productReadingQualityReview;
    expect(review?.productEligibility.map(x => x.product)).toEqual([
      'first_comparison', 'repeat_comparison', 'natal_and_first_comparison',
    ]);
    expect(review?.productEligibility.every(x =>
      x.t10IndependentInterpretationReady === false &&
      x.t10ReadingCompleteness === 'factual_observations_only' &&
      x.eligibleToHandoffForSalesOrIssuance === false)).toBe(true);
    expect(review?.productEligibility[1]?.missingInterpretationPrerequisites)
      .toContain('EACH_NEW_COUNTERPART_REQUIRES_ITS_OWN_INDEPENDENT_T10_INTERPRETATION');
    expect(review?.productEligibility[2]?.missingInterpretationPrerequisites)
      .toContain('T8_ONLY_PERSONAL_READING_CANNOT_SUBSTITUTE_MISSING_T10');
    expect(review?.productEligibility[2]?.t8StandaloneEligibility)
      .toBe('not_evaluated_here');
    expect(review?.maySell).toBe(false);
  });

  it('preserves real birth-time uncertainty and identities on reversal', () => {
    const unknown = birth(1996, 6, 5, false);
    const first = run(A, unknown).productReadingQualityReview;
    const reverse = run(unknown, A).productReadingQualityReview;
    expect(first?.traceAudit.unverifiedPrerequisitePaths)
      .toContain('target.pillars.hour');
    expect(reverse?.traceAudit.unverifiedPrerequisitePaths)
      .toContain('subject.pillars.hour');
    expect(first?.target.calculationHash).toBe(reverse?.subject.calculationHash);
    expect(reverse?.target.calculationHash).toBe(first?.subject.calculationHash);
    expect(first?.traceAudit.unknownTimeUnresolved).toBe(true);
    const sameBirth = run(A, A).productReadingQualityReview;
    expect(sameBirth?.subject.personRef).not.toBe(sameBirth?.target.personRef);
    expect(sameBirth?.subject.calculationHash)
      .toBe(sameBirth?.target.calculationHash);
  });

  it('rejects removed source URLs and changed per-person fact paths', () => {
    const draft = run(A, OPPOSITE_A).pairReadingBoundaryDraft;
    if (!draft) throw new TypeError('Missing source-bounded draft.');
    const broken = {
      ...draft,
      sections: draft.sections.map(section =>
        section.id !== 'direct_day_facts' ? section : {
          ...section,
          sentences: section.sentences.map((sentence, index) => index !== 0
            ? sentence : { ...sentence, sourceUrls: [] }),
        }),
    };
    expect(() => auditT10ProductReadingQualityV1(broken))
      .toThrow('per-sentence original evidence');
    const malformed = {
      ...draft,
      sections: draft.sections.map(section =>
        section.id !== 'direct_day_facts' ? section : {
          ...section,
          sentences: section.sentences.map((sentence, index) => index !== 0
            ? sentence : {
              ...sentence,
              observedFactPaths: ['unrelated.person.day.value'],
            }),
        }),
    };
    expect(() => auditT10ProductReadingQualityV1(malformed))
      .toThrow('per-sentence original evidence');
  });

  it('blocks an unauthorized interpretation flag and missing required method', () => {
    const draft = run(A, OPPOSITE_A).pairReadingBoundaryDraft;
    if (!draft) throw new TypeError('Missing source-bounded draft.');
    expect(() => auditT10ProductReadingQualityV1({
      ...draft, eligibleForFirstComparison: true as never,
    })).toThrow('protected full research draft');
    expect(() => auditT10ProductReadingQualityV1({
      ...draft, sections: draft.sections.filter(section =>
        section.id !== 'useful_god_method'),
    })).toThrow('protected full research draft');
  });

  it('does not attach a product assessment to ordinary preview or alter public HTML', () => {
    const ordinary = run(A, OPPOSITE_A, false);
    const scoped = run(A, OPPOSITE_A, true);
    expect(ordinary.productReadingQualityReview).toBeUndefined();
    expect(ordinary.html).toBe(scoped.html);
    expect(scoped.mayMarkMenuAvailable).toBe(false);
    expect(scoped.mayPersist).toBe(false);
    expect(scoped.maySell).toBe(false);
    expect(scoped.productReadingQualityReview?.mayGrantOfficialAuthority)
      .toBe(false);
  });
});
