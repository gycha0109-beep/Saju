import { describe, expect, it } from 'vitest';
import type { BirthInput } from '../src/contracts/calculation.js';
import { buildCompatibilityTwoBirthResearchReading } from
  '../src/preview/compatibility-two-birth-research-runtime.js';
import { auditT10ReadingDifferentiationV1 } from
  '../src/research/compatibility-t10-reading-differentiation-audit.js';

const birth = (
  year: number, month: number, day: number, timeKnown = true,
): BirthInput => ({
  calendarType: 'solar',
  date: { year, month, day },
  time: timeKnown ? { known: true, hour: 14, minute: 30 } : { known: false },
  sexForTraditionalCalculation: 'unspecified',
});
const A = birth(1990, 5, 15);
const B = birth(1996, 6, 5);
const C = birth(1996, 8, 5);
const D = birth(1990, 5, 8);
const E = birth(1990, 5, 13);
const F = birth(1990, 5, 22);

function run(
  left: BirthInput, right: BirthInput,
  subjectPersonRef = 'one-person', targetPersonRef = 'two-person',
) {
  return buildCompatibilityTwoBirthResearchReading(left, right, {
    requestId: 't10-quality-differentiation-real-pair',
    subjectPersonRef, targetPersonRef,
    referenceDateTime: '2026-11-11T00:00:00.000Z',
    candidateScope: 'traditional_marital_palace_comparison',
  });
}
function inputs(o: ReturnType<typeof run>) {
  const { pairReadingBoundaryDraft, productReadingQualityReview,
    crossMethodContrastResearch } = o;
  if (!pairReadingBoundaryDraft || !productReadingQualityReview ||
      !crossMethodContrastResearch) {
    throw new TypeError('Missing protected original reading case.');
  }
  return {
    draft: pairReadingBoundaryDraft,
    quality: productReadingQualityReview,
    contrast: crossMethodContrastResearch,
  };
}

describe('T10 stage-4 comparison of independent original Korean readings', () => {
  it('does not invent personality differences from different person reference IDs', () => {
    const a = run(A, B, 'id-alpha', 'id-beta');
    const b = run(A, B, 'id-gamma', 'id-delta');
    const audit = auditT10ReadingDifferentiationV1(inputs(a), inputs(b));
    expect(a.pairReadingBoundaryDraft?.koreanReadingDraft)
      .toBe(b.pairReadingBoundaryDraft?.koreanReadingDraft);
    expect(a.sourceScopeHandoff.subject.personRef)
      .not.toBe(b.sourceScopeHandoff.subject.personRef);
    expect(audit.pairComparison).toBe('same_calculated_pair');
    expect(audit.sameInputsHaveIdenticalReading).toBe(true);
    expect(audit.differentDayValuesHaveDifferentEvidenceText).toBeNull();
    expect(audit.maySell).toBe(false);
  });

  it('shows different day-pillar evidence even if the two pairs have the same mixed structure', () => {
    const a = run(A, B);
    const b = run(E, F);
    const audit = auditT10ReadingDifferentiationV1(inputs(a), inputs(b));
    expect(a.crossMethodContrastResearch?.synthesisDecision.caseId)
      .toBe('day_six_combination_vs_other_clash');
    expect(b.crossMethodContrastResearch?.synthesisDecision.caseId)
      .toBe('day_six_combination_vs_other_clash');
    expect(audit.pairComparison).toBe('distinct_calculated_pair');
    expect(audit.sameTraditionalStructuralCase).toBe(true);
    expect(audit.sameDayPillarPair).toBe(false);
    expect(audit.differentDayValuesHaveDifferentEvidenceText).toBe(true);
    expect(a.pairReadingBoundaryDraft?.koreanReadingDraft)
      .not.toBe(b.pairReadingBoundaryDraft?.koreanReadingDraft);
  });

  it('traces the two opposite configurations without choosing either result', () => {
    const a = run(A, B);
    const b = run(A, C);
    const audit = auditT10ReadingDifferentiationV1(inputs(a), inputs(b));
    expect(audit.sameTraditionalStructuralCase).toBe(false);
    expect(audit.differentDayValuesHaveDifferentEvidenceText).toBe(true);
    expect(a.productReadingQualityReview?.actualCompatibilityReadingReady).toBe(false);
    expect(b.productReadingQualityReview?.actualCompatibilityReadingReady).toBe(false);
  });

  it('preserves exact roles when the two actual birth charts reverse', () => {
    const a = run(A, B);
    const b = run(B, A);
    const audit = auditT10ReadingDifferentiationV1(inputs(a), inputs(b));
    expect(audit.pairComparison).toBe('reversed_calculated_pair');
    expect(audit.sameDayPillarPair).toBe(false);
    expect(audit.differentDayValuesHaveDifferentEvidenceText).toBe(true);
    expect(b.crossMethodContrastResearch?.synthesisDecision.dayPillarFacts.subject)
      .toBe(a.crossMethodContrastResearch?.synthesisDecision.dayPillarFacts.target);
  });

  it('does not infer relationship quality from absent opposite structures or matching day charts', () => {
    const a = run(A, D);
    const b = run(A, A, 'first-twin', 'second-twin');
    const audit = auditT10ReadingDifferentiationV1(inputs(a), inputs(b));
    expect(audit.sameTraditionalStructuralCase).toBe(true);
    expect(audit.authorizedRelationshipInterpretation).toBe(false);
    expect(audit.methodConclusionAndRelationshipOutcomeUnresolved).toBe(true);
    expect(b.pairReadingBoundaryDraft?.subject.personRef)
      .not.toBe(b.pairReadingBoundaryDraft?.target.personRef);
    expect(a.maySell).toBe(false);
    expect(b.maySell).toBe(false);
  });

  it('does not fabricate birth-hour ten gods or require a reading difference without resolved day facts', () => {
    const a = run(A, birth(1996, 6, 5, false));
    const b = run(birth(1996, 6, 5, false), A);
    const audit = auditT10ReadingDifferentiationV1(inputs(a), inputs(b));
    expect(audit.pairComparison).toBe('reversed_calculated_pair');
    expect(audit.mayPublish).toBe(false);
    expect(a.productReadingQualityReview?.traceAudit.unknownTimeUnresolved)
      .toBe(true);
    expect(b.productReadingQualityReview?.traceAudit.unknownTimeUnresolved)
      .toBe(true);
  });

  it('rejects a forged Korean synthesis sentence or a false sales eligibility flag', () => {
    const a = inputs(run(A, B));
    const b = inputs(run(A, C));
    const altered = {
      ...a,
      draft: {
        ...a.draft,
        sections: a.draft.sections.map(section =>
          section.id !== 'synthesis_hold' ? section : {
            ...section,
            sentences: section.sentences.map(sentence => ({
              ...sentence,
              paragraph: '두 사람은 궁합이 매우 좋습니다.',
            })),
          }),
      },
    };
    expect(() => auditT10ReadingDifferentiationV1(altered, b))
      .toThrow('independently audited original readings');
    expect(() => auditT10ReadingDifferentiationV1({
      ...a,
      quality: {
        ...a.quality,
        productEligibility: a.quality.productEligibility.map((x, i) =>
          i === 0 ? { ...x, eligibleToHandoffForSalesOrIssuance: true as never } : x,
        ) as unknown as typeof a.quality.productEligibility,
      },
    }, b)).toThrow('independently audited original readings');
  });
});
