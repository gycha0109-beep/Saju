import { describe, expect, it } from 'vitest';
import type { BirthInput } from '../src/contracts/calculation.js';
import { buildCompatibilityTwoBirthResearchReading } from
  '../src/preview/compatibility-two-birth-research-runtime.js';

function birth(year: number, month: number, day: number): BirthInput {
  return {
    calendarType: 'solar',
    date: { year, month, day },
    time: { known: true, hour: 14, minute: 30 },
    sexForTraditionalCalculation: 'unspecified',
  };
}
const FIRST = birth(1990, 5, 15);
const DAY_BOTH_COMBINE = birth(1990, 5, 20);
const DAY_BRANCH_COMBINE = birth(1996, 6, 5);
const DAY_BRANCH_CLASH = birth(1996, 8, 5);
function run(first: BirthInput, second: BirthInput, optIn = true) {
  return buildCompatibilityTwoBirthResearchReading(first, second, {
    requestId: 't10-direct-day-abstract-scope',
    subjectPersonRef: 'distinct-subject',
    targetPersonRef: 'distinct-target',
    referenceDateTime: '2026-11-11T00:00:00.000Z',
    ...(optIn ? { candidateScope: 'traditional_marital_palace_comparison' as const } : {}),
  });
}

describe('T10 direct day-stem/day-branch source scope from the 2016 public abstract', () => {
  it('binds simultaneous stem and branch combinations to factual traces, not a relationship verdict', () => {
    const result = run(FIRST, DAY_BOTH_COMBINE);
    const review = result.directDayComparisonResearch;
    expect(review).toBeDefined();
    expect(review?.source.verifiedTextLayer).toBe('DBPIA_PUBLIC_ABSTRACT');
    expect(review?.source.fullTextMethodVerified).toBe(false);
    expect(review?.dayStem.group).toBe('covered_positive_subset');
    expect(review?.dayStem.verifiedStructuralMatch).toMatchObject({
      kind: 'stem_five_combination',
      subject: { factPath: 'subject.pillars.day.value.stem' },
      target: { factPath: 'target.pillars.day.value.stem' },
      pairwiseMeaningAuthorized: false,
    });
    expect(review?.dayBranch.group).toBe('covered_positive_subset');
    expect(review?.dayBranch.verifiedStructuralMatch).toMatchObject({
      kind: 'branch_six_combination',
      subject: { factPath: 'subject.pillars.day.value.branch' },
      target: { factPath: 'target.pillars.day.value.branch' },
      pairwiseMeaningAuthorized: false,
    });
    expect(review?.observedAbstractCell).toBe('STEM_POSITIVE_BRANCH_POSITIVE');
    expect(review?.mayClaimInterpersonalMeaning).toBe(false);
    expect(review?.pairwiseT10Admitted).toBe(false);
    expect(result.mayPublish).toBe(false);
    expect(result.maySell).toBe(false);
  });

  it('preserves day-branch clash as only a structural factor without inferring a missing stem group', () => {
    const review = run(FIRST, DAY_BRANCH_CLASH).directDayComparisonResearch;
    expect(review?.dayBranch.group).toBe('covered_negative_subset');
    expect(review?.dayBranch.verifiedStructuralMatch?.kind).toBe('branch_clash');
    expect(review?.observedAbstractCell).toBe('unclassified');
    expect(review?.missingPrerequisites).toContain('DAY_STEM_AND_BRANCH_RELATION_COVERAGE_INCOMPLETE');
    expect(review?.maySell).toBe(false);
  });

  it('does not automatically equate a branch six-combination with a complete four-cell theory', () => {
    const review = run(FIRST, DAY_BRANCH_COMBINE).directDayComparisonResearch;
    expect(review?.dayBranch.group).toBe('covered_positive_subset');
    expect(review?.source.abstractFourGroups).toHaveLength(4);
    expect(review?.dayStem.unimplementedSourceFactors).toContain('generation');
    expect(review?.dayBranch.unimplementedSourceFactors).toContain('punishment');
    expect(review?.mayClaimInterpersonalMeaning).toBe(false);
  });

  it('leaves ordinary protected preview exactly unchanged without research opt-in', () => {
    const protectedPreview = run(FIRST, DAY_BOTH_COMBINE, false);
    const researchPreview = run(FIRST, DAY_BOTH_COMBINE, true);
    expect(protectedPreview.directDayComparisonResearch).toBeUndefined();
    expect(protectedPreview.methodCoverage).toBeUndefined();
    expect(protectedPreview.html).toBe(researchPreview.html);
    expect(protectedPreview.mayClaimInterpersonalMeaning).toBe(false);
    expect(protectedPreview.maySell).toBe(false);
  });

  it('keeps identities attached to their own independently calculated person and chart', () => {
    const forward = run(FIRST, DAY_BOTH_COMBINE);
    const reverse = run(DAY_BOTH_COMBINE, FIRST);
    expect(forward.directDayComparisonResearch?.subject.personRef).toBe('distinct-subject');
    expect(reverse.directDayComparisonResearch?.target.personRef).toBe('distinct-target');
    expect(forward.directDayComparisonResearch?.subject.calculationHash)
      .toBe(reverse.directDayComparisonResearch?.target.calculationHash);
    expect(forward.directDayComparisonResearch?.target.calculationHash)
      .toBe(reverse.directDayComparisonResearch?.subject.calculationHash);
    expect(forward.directDayComparisonResearch?.observedAbstractCell)
      .toBe(reverse.directDayComparisonResearch?.observedAbstractCell);
  });
});
