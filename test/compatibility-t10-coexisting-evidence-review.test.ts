import { describe, expect, it } from 'vitest';
import type { BirthInput } from '../src/contracts/calculation.js';
import { buildCompatibilityTwoBirthResearchReading } from
  '../src/preview/compatibility-two-birth-research-runtime.js';
import { reviewCompatibilityT10CoexistingEvidenceV1 } from
  '../src/research/compatibility-t10-coexisting-evidence-review.js';

const SUBJECT: BirthInput = {
  calendarType: 'solar',
  date: { year: 1990, month: 5, day: 15 },
  time: { known: true, hour: 14, minute: 30 },
  sexForTraditionalCalculation: 'unspecified',
};
const SOURCE_ONLY_COMBINATION: BirthInput = {
  ...SUBJECT,
  date: { year: 1990, month: 5, day: 8 },
};
const DAY_SUPPORT_YEAR_CLASH: BirthInput = {
  ...SUBJECT,
  date: { year: 1996, month: 6, day: 5 },
};
const DAY_CLASH_MONTH_SUPPORT: BirthInput = {
  ...SUBJECT,
  date: { year: 1996, month: 8, day: 5 },
};
const REQUEST = {
  requestId: 'synthetic-pair-conflict-study',
  subjectPersonRef: 'first-chart',
  targetPersonRef: 'second-chart',
  referenceDateTime: '2026-11-11T00:00:00.000Z',
  candidateScope: 'traditional_marital_palace_comparison' as const,
};
const build = (
  first: BirthInput,
  second: BirthInput,
) => buildCompatibilityTwoBirthResearchReading(first, second, REQUEST);

function evidenceFor(first: BirthInput, second: BirthInput) {
  const output = build(first, second);
  const review = output.coexistingEvidenceReview;
  if (!review) throw new TypeError('Expected protected opt-in research evidence.');
  return { output, review };
}

describe('T10 phase 2: coexisting structural observations never become a pairwise verdict', () => {
  it('records a supportive day/day six-combination beside an independent year/year clash', () => {
    const { output, review } = evidenceFor(SUBJECT, DAY_SUPPORT_YEAR_CLASH);
    expect(review.structural.dayBranchFactor).toMatchObject({
      state: 'candidate_factor',
      sourceInterpretation: 'supportive_factor',
      evidence: {
        kind: 'branch_six_combination',
        subject: { factPath: 'subject.pillars.day.value.branch', value: '진' },
        target: { factPath: 'target.pillars.day.value.branch', value: '유' },
      },
    });
    expect(review.structural.otherSlotClashes).toContainEqual(expect.objectContaining({
      kind: 'branch_clash',
      subject: { factPath: 'subject.pillars.year.value.branch', value: '오' },
      target: { factPath: 'target.pillars.year.value.branch', value: '자' },
      pairwiseMeaningAuthorized: false,
      sourceIds: expect.arrayContaining(['SRC-T0-YISI-ZHAN-10']),
      definitionContentHash: expect.stringMatching(/^[a-f0-9]{64}$/u),
    }));
    expect(review.structural.coOccurrence).toBe('six_combination_and_clash');
    expect(review.structural.oppositeToDayFactor.length).toBeGreaterThan(0);
    expect(review.structural.scopeOfOtherMatches).toBe('structural_facts_only');
    expect(review.synthesis.state).toBe('unresolved_no_source_qualified_pairwise_precedence');
    expect(review.synthesis.compatibilityScore).toBeNull();
    expect(review.synthesis.inferredOutcome).toBeNull();
    expect(review.pairwiseT10Admitted).toBe(false);
    expect(review.maySell).toBe(false);
    expect(output.mayClaimInterpersonalMeaning).toBe(false);
  });

  it('records a challenging day/day clash beside another-position six-combination', () => {
    const { review } = evidenceFor(SUBJECT, DAY_CLASH_MONTH_SUPPORT);
    expect(review.structural.dayBranchFactor).toMatchObject({
      state: 'candidate_factor',
      sourceInterpretation: 'challenging_factor',
      evidence: {
        kind: 'branch_clash',
        subject: { factPath: 'subject.pillars.day.value.branch', value: '진' },
        target: { factPath: 'target.pillars.day.value.branch', value: '술' },
      },
    });
    expect(review.structural.otherSlotSixCombinations).toContainEqual(expect.objectContaining({
      kind: 'branch_six_combination',
      subject: { factPath: 'subject.pillars.year.value.branch', value: '오' },
      target: { factPath: 'target.pillars.month.value.branch', value: '미' },
      pairwiseMeaningAuthorized: false,
    }));
    expect(review.structural.coOccurrence).toBe('six_combination_and_clash');
    expect(review.structural.oppositeToDayFactor.length).toBeGreaterThan(0);
    expect(review.synthesis.state).toBe('unresolved_no_source_qualified_pairwise_precedence');
  });

  it('does not manufacture conflict when only one structural kind is present', () => {
    const { review } = evidenceFor(SUBJECT, SOURCE_ONLY_COMBINATION);
    expect(review.structural.dayBranchFactor).toMatchObject({
      state: 'candidate_factor',
      sourceInterpretation: 'supportive_factor',
    });
    expect(review.structural.coOccurrence).toBe('no_mixed_branch_relation');
    expect(review.structural.oppositeToDayFactor).toEqual([]);
    expect(review.synthesis.state).toBe('unresolved_no_source_qualified_pairwise_precedence');
    expect(review.synthesis.inferredOutcome).toBeNull();
  });

  it('preserves per-person observations when the two person roles reverse', () => {
    const forward = evidenceFor(SUBJECT, DAY_SUPPORT_YEAR_CLASH).review;
    const reverse = evidenceFor(DAY_SUPPORT_YEAR_CLASH, SUBJECT).review;
    expect(reverse.subject.calculationHash).toBe(forward.target.calculationHash);
    expect(reverse.target.calculationHash).toBe(forward.subject.calculationHash);
    expect(reverse.structural.coOccurrence).toBe(forward.structural.coOccurrence);
    expect(reverse.structural.otherSlotClashes).toContainEqual(expect.objectContaining({
      subject: { factPath: 'subject.pillars.year.value.branch', value: '자' },
      target: { factPath: 'target.pillars.year.value.branch', value: '오' },
    }));
    expect(reverse.synthesis.compatibilityScore).toBeNull();
  });

  it('does not infer the unknown hour, while retaining resolved day evidence', () => {
    const other = { ...DAY_SUPPORT_YEAR_CLASH, time: { known: false } } as BirthInput;
    const { output, review } = evidenceFor(SUBJECT, other);
    expect(review.target.birthTimeKnown).toBe(false);
    expect(review.structural.dayBranchFactor.state).toBe('candidate_factor');
    expect(output.sourceScopeHandoff.crossChartStructuralMatches.every(match =>
      !match.target.factPath.includes('pillars.hour.'),
    )).toBe(true);
    expect(review.synthesis.inferredOutcome).toBeNull();
  });

  it('rejects altered source hashes and mixed identities before considering precedence', () => {
    const output = build(SUBJECT, DAY_SUPPORT_YEAR_CLASH);
    const coverage = output.methodCoverage;
    if (!coverage) throw new TypeError('Expected source coverage.');
    const forged = {
      ...output.sourceScopeHandoff,
      crossChartStructuralMatches: output.sourceScopeHandoff.crossChartStructuralMatches.map(
        (match, i) => i === 0 ? { ...match, definitionContentHash: 'forged' } : match,
      ),
    };
    expect(() => reviewCompatibilityT10CoexistingEvidenceV1(forged, coverage))
      .toThrow('exact unpromoted structural sources');
    const foreign = {
      ...coverage,
      palace: {
        ...coverage.palace,
        personalDayPalace: {
          ...coverage.palace.personalDayPalace,
          subject: {
            ...coverage.palace.personalDayPalace.subject,
            calculationHash: 'other-person-record',
          },
        },
      },
    };
    expect(() => reviewCompatibilityT10CoexistingEvidenceV1(
      output.sourceScopeHandoff, foreign,
    )).toThrow('same-source guarded');
  });

  it('keeps the original protected preview surface and cross-person authority shut', () => {
    const base = {
      requestId: REQUEST.requestId,
      subjectPersonRef: REQUEST.subjectPersonRef,
      targetPersonRef: REQUEST.targetPersonRef,
      referenceDateTime: REQUEST.referenceDateTime,
    };
    const ordinary = buildCompatibilityTwoBirthResearchReading(
      SUBJECT, DAY_SUPPORT_YEAR_CLASH, base,
    );
    const scoped = build(SUBJECT, DAY_SUPPORT_YEAR_CLASH);
    expect(ordinary.coexistingEvidenceReview).toBeUndefined();
    expect(ordinary.methodCoverage).toBeUndefined();
    expect(scoped.coexistingEvidenceReview).toBeDefined();
    expect(scoped.html).toBe(ordinary.html);
    expect(scoped.sourceScopeHandoff.pairwiseT10Admitted).toBe(false);
    expect(scoped.mayMarkMenuAvailable).toBe(false);
    expect(scoped.mayPublish).toBe(false);
    expect(scoped.mayPersist).toBe(false);
    expect(scoped.maySell).toBe(false);
  });

  it('records why different sources cannot supply a universal ranking', () => {
    const { review } = evidenceFor(SUBJECT, DAY_SUPPORT_YEAR_CLASH);
    expect(review.sourceReview.map(source => source.crossChartPriority)).toEqual([
      'not_specified',
      'not_generalizable',
      'not_a_two_person_rule',
    ]);
    expect(review.synthesis.missingPrerequisites).toContain(
      'EXACT_TWO_PERSON_PRIORITIZATION_RULE',
    );
    expect(review.historicalSpouseMethod).toBe('historical_single_chart_only');
    expect(review.usefulGodMethod).toBe('pairwise_rule_not_established_in_reviewed_sources');
    expect(review.mayClaimInterpersonalMeaning).toBe(false);
    expect(review.mayGrantOfficialAuthority).toBe(false);
  });
});
