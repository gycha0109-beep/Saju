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
const STEM_POS_BRANCH_POS = birth(1990, 5, 16);
const STEM_POS_BRANCH_NEG = birth(1990, 5, 13);
const STEM_NEG_BRANCH_POS = birth(1990, 5, 19);
const STEM_NEG_BRANCH_NEG_SUBJECT = birth(1990, 5, 9);
const STEM_NEG_BRANCH_NEG_TARGET = birth(1990, 5, 13);
const BRANCH_MIXED_SUBJECT = birth(1990, 5, 14);
const BRANCH_MIXED_TARGET = birth(1990, 5, 9);
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
    expect(review?.source.publicContentsTextLayer).toBe('DBPIA_PUBLIC_TABLE_OF_CONTENTS');
    expect(review?.source.publicContentsResearchPages.fourCaseResults)
      .toEqual([35, 40, 50, 57]);
    expect(review?.source.publicContentsResearchPages.authorLimitations).toBe(68);
    expect(review?.source.publicContentsOmitsAbstractElementalControlFactor).toBe(true);
    expect(review?.source.abstractNegativeDayBranchFactors).toContain('elemental_control');
    expect(review?.source.contentsCaseTwoAndFourNegativeDayBranchFactors)
      .not.toContain('elemental_control');
    expect(review?.dayStem.group).toBe('mixed_source_factors');
    expect(review?.dayStem.conflictingFactors).toBe(true);
    expect(review?.dayStem.elementalComparison?.relation)
      .toMatch(/controls/);
    expect(review?.dayStem.elementalComparison?.source.verifiedTextLayer)
      .toBe('PUBLIC_CLASSICAL_TEXT');
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
    expect(review?.observedAbstractCell).toBe('unclassified');
    expect(review?.sourceFactorAudit.dayStem.observed)
      .toEqual(['stem_five_combination', 'elemental_control']);
    expect(review?.sourceFactorAudit.dayBranch.observed)
      .toEqual(['branch_six_combination', 'elemental_generation']);
    expect(review?.sourceFactorAudit.sourceQualifiedFourCaseCell).toBeNull();
    expect(review?.sourceFactorAudit.mayInferIndividualOutcome).toBe(false);
    expect(review?.mayClaimInterpersonalMeaning).toBe(false);
    expect(review?.pairwiseT10Admitted).toBe(false);
    expect(result.mayPublish).toBe(false);
    expect(result.maySell).toBe(false);
  });

  it('preserves a day-branch clash alongside same-element evidence without inventing a verdict', () => {
    const review = run(FIRST, DAY_BRANCH_CLASH).directDayComparisonResearch;
    expect(review?.dayBranch.verifiedStructuralMatch?.kind).toBe('branch_clash');
    expect(review?.dayBranch.elementalComparison?.relation).toBe('same_element');
    expect(review?.dayBranch.group).toBe('mixed_source_factors');
    expect(review?.dayBranch.conflictingFactors).toBe(true);
    expect(review?.observedAbstractCell).toBe('unclassified');
    expect(review?.missingPrerequisites).toContain('DAY_STEM_AND_BRANCH_RELATION_COVERAGE_INCOMPLETE');
    expect(review?.mayClaimInterpersonalMeaning).toBe(false);
    expect(review?.maySell).toBe(false);
  });

  it('does not automatically equate a branch six-combination with a complete four-cell theory', () => {
    const review = run(FIRST, DAY_BRANCH_COMBINE).directDayComparisonResearch;
    expect(review?.dayBranch.group).toBe('covered_positive_subset');
    expect(review?.source.abstractFourGroups).toHaveLength(4);
    expect(review?.dayStem.elementalComparison).not.toBeNull();
    expect(review?.dayStem.unimplementedSourceFactors).toContain('stem_clash');
    expect(review?.dayBranch.unimplementedSourceFactors).toContain('punishment');
    expect(review?.mayClaimInterpersonalMeaning).toBe(false);
  });

  it.each([
    [FIRST, STEM_POS_BRANCH_POS, 'STEM_POSITIVE_BRANCH_POSITIVE'],
    [FIRST, STEM_POS_BRANCH_NEG, 'STEM_POSITIVE_BRANCH_NEGATIVE'],
    [FIRST, STEM_NEG_BRANCH_POS, 'STEM_NEGATIVE_BRANCH_POSITIVE'],
    [STEM_NEG_BRANCH_NEG_SUBJECT, STEM_NEG_BRANCH_NEG_TARGET,
      'STEM_NEGATIVE_BRANCH_NEGATIVE'],
  ] as const)('distinguishes the four source-defined factor cells without outcome claims', (
    first, second, expectedCell,
  ) => {
    const research = run(first, second).directDayComparisonResearch;
    expect(research?.observedAbstractCell).toBe(expectedCell);
    expect(research?.dayStem.conflictingFactors).toBe(false);
    expect(research?.dayBranch.conflictingFactors).toBe(false);
    expect(research?.dayStem.elementalComparison?.pairwiseMeaningAuthorized).toBe(false);
    expect(research?.dayBranch.elementalComparison?.pairwiseMeaningAuthorized).toBe(false);
    expect(research?.sourceFactorAudit.classificationBasis)
      .toBe('computed_factor_subset_only');
    expect(research?.sourceFactorAudit.sourceQualifiedFourCaseCell).toBeNull();
    expect(research?.sourceFactorAudit.sourcePopulationMatchEstablished).toBe(false);
    expect(research?.sourceFactorAudit.dayStem.notEvaluated).toContain('stem_clash');
    expect(research?.sourceFactorAudit.dayBranch.notEvaluated).toContain('harm');
    expect(research?.sourceFactorAudit.otherAbstractFactorsNotEvaluated)
      .toEqual(['void', 'yuanchen']);
    expect(research?.mayClaimInterpersonalMeaning).toBe(false);
    expect(research?.maySell).toBe(false);
  });

  it('preserves competing six-combination and elemental-control as unresolved', () => {
    const research = run(BRANCH_MIXED_SUBJECT, BRANCH_MIXED_TARGET)
      .directDayComparisonResearch;
    expect(research?.dayBranch.verifiedStructuralMatch?.kind)
      .toBe('branch_six_combination');
    expect(research?.dayBranch.elementalComparison?.relation).toMatch(/controls/);
    expect(research?.dayBranch.group).toBe('mixed_source_factors');
    expect(research?.dayBranch.conflictingFactors).toBe(true);
    expect(research?.observedAbstractCell).toBe('unclassified');
    expect(research?.mayClaimInterpersonalMeaning).toBe(false);
  });

  it('rejects a mismatched person or chart when reusing canonical element observations', () => {
    const review = run(FIRST, STEM_POS_BRANCH_POS);
    expect(review.directDayComparisonResearch?.subject.snapshotId)
      .toBe(review.maritalPalaceIntraChartResearch?.subject.snapshotId);
    expect(review.directDayComparisonResearch?.target.calculationHash)
      .toBe(review.maritalPalaceIntraChartResearch?.target.calculationHash);
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

  it('does not treat one observed negative subset as complete source factor coverage', () => {
    const result = run(STEM_NEG_BRANCH_NEG_SUBJECT, STEM_NEG_BRANCH_NEG_TARGET);
    const research = result.directDayComparisonResearch;
    expect(research?.observedAbstractCell).toBe('STEM_NEGATIVE_BRANCH_NEGATIVE');
    expect(research?.sourceFactorAudit.dayStem.observed)
      .toContain('elemental_control');
    expect(research?.sourceFactorAudit.dayBranch.observed)
      .toContain('elemental_control');
    expect(research?.sourceFactorAudit.dayStem.notEvaluated).toEqual(['stem_clash']);
    expect(research?.sourceFactorAudit.dayBranch.notEvaluated)
      .toEqual(['punishment', 'break', 'harm']);
    expect(research?.sourceFactorAudit.sourceQualifiedFourCaseCell).toBeNull();
    expect(research?.sourceFactorAudit.fullMethodAndExceptionsVerified).toBe(false);
    expect(result.maySell).toBe(false);
  });

  it('keeps public preview independent of the partial four-cell evidence audit', () => {
    const protectedPreview = run(FIRST, STEM_POS_BRANCH_POS, false);
    const researchPreview = run(FIRST, STEM_POS_BRANCH_POS, true);
    expect(protectedPreview.directDayComparisonResearch).toBeUndefined();
    expect(researchPreview.directDayComparisonResearch?.sourceFactorAudit)
      .toBeDefined();
    expect(researchPreview.directDayComparisonResearch?.sourceFactorAudit
      .sourceQualifiedFourCaseCell).toBeNull();
    expect(protectedPreview.html).toBe(researchPreview.html);
    expect(researchPreview.maySell).toBe(false);
  });
});
