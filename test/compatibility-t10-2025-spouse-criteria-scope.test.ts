import { describe, expect, it } from 'vitest';
import type { BirthInput } from '../src/contracts/calculation.js';
import { calculateAuthorizedMyeonghwaProductionSnapshot } from
  '../src/production/production-calculation-runtime.js';
import { buildCompatibilityTwoBirthResearchReading } from
  '../src/preview/compatibility-two-birth-research-runtime.js';
import { reviewT102025SpouseCriteriaScopeV1 } from
  '../src/research/compatibility-t10-2025-spouse-criteria-scope.js';

const AT = '2026-11-11T00:00:00.000Z';
function birth(year: number, month: number, day: number, known = true): BirthInput {
  return {
    calendarType: 'solar',
    date: { year, month, day },
    time: known ? { known: true, hour: 14, minute: 30 } : { known: false },
    sexForTraditionalCalculation: 'unspecified',
  };
}
const A = birth(1990, 5, 15);
const B = birth(1996, 6, 5);

function run(subject: BirthInput, target: BirthInput, optIn = true) {
  return buildCompatibilityTwoBirthResearchReading(subject, target, {
    requestId: 'synthetic-2025-single-chart-source-scope',
    subjectPersonRef: 'source-person',
    targetPersonRef: 'target-person',
    referenceDateTime: AT,
    ...(optIn ? { candidateScope: 'traditional_marital_palace_comparison' as const } : {}),
  });
}

describe('2025 spouse study: single-natal method boundary cannot become two-person T10', () => {
  it('preserves all nine author-listed criteria and distinguishes available observations', () => {
    const result = run(A, B);
    const review = result.spouseCriteria2025Scope;
    expect(review).toBeDefined();
    expect(review?.source.criteria.map(item => item.number))
      .toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    expect(review?.source.pdfFullTextVerified).toBe(false);
    expect(review?.source.verifiedTextLayer)
      .toBe('AUTHOR_POSTED_INDEXED_ARTICLE_EXCERPT');
    expect(review?.subject.unassessedCriteria).toEqual([3, 4, 5, 6, 7, 8, 9]);
    expect(review?.target.unassessedCriteria).toEqual([3, 4, 5, 6, 7, 8, 9]);
    expect(review?.subject.singleChartPalace.state)
      .toBe(result.maritalPalaceIntraChartResearch?.subject.state);
    expect(review?.target.singleChartPalace.state)
      .toBe(result.maritalPalaceIntraChartResearch?.target.state);
    expect(review?.comparison.bothBirthChartsCompared).toBe(false);
    expect(review?.comparison.palaceOutranksSpouseStarAsUniversalT10Rule).toBe(false);
    expect(review?.pairwiseT10Admitted).toBe(false);
    expect(result.maySell).toBe(false);
  });

  it('uses only existing internal day-branch clash matches from each natal snapshot', () => {
    const result = run(A, B);
    const review = result.spouseCriteria2025Scope;
    if (!review) throw new TypeError('Expected internal source opt-in.');
    const input = [A, B] as const;
    const observed = [review.subject, review.target] as const;
    for (let i = 0; i < 2; i += 1) {
      const item = observed[i];
      const birthInput = input[i];
      if (!item || !birthInput) throw new TypeError('Missing synthetic input');
      const snapshot = calculateAuthorizedMyeonghwaProductionSnapshot(
        birthInput, { now: new Date(AT) },
      ).snapshot;
      expect(item.calculationHash).toBe(snapshot.calculationHash);
      const structure = snapshot.derivedFacts.structuralRelations;
      const expected = structure?.status === 'resolved'
        ? structure.value.filter(relation =>
          relation.kind === 'branch_clash' &&
          relation.participants.length === 2 &&
          relation.participants.some(p => p.pillar === 'day' && p.component === 'branch') &&
          relation.participants.some(p => p.pillar !== 'day' && p.component === 'branch'))
        : [];
      expect(item.dayBranchOtherPillarRelations.observed.map(x => x.relationId))
        .toEqual(expected.map(x => x.relationId).sort((a, b) => a.localeCompare(b)));
      expect(item.dayBranchOtherPillarRelations.allOtherClauseTypesCovered).toBe(false);
      for (const clash of item.dayBranchOtherPillarRelations.observed) {
        expect(clash.sourceIds.length).toBeGreaterThan(0);
        expect(clash.participants.some(p => p.factPath === 'pillars.day.value.branch'))
          .toBe(true);
      }
    }
    expect(review.comparison.directTwoChartSynthesisAvailable).toBe(false);
  });

  it('does not fabricate an hour-related result for unknown birth time', () => {
    const result = run(A, birth(1996, 6, 5, false));
    const scope = result.spouseCriteria2025Scope;
    expect(scope).toBeDefined();
    expect(scope?.target.dayBranchOtherPillarRelations.observed.every(clash =>
      clash.participants.every(p => !p.factPath.includes('pillars.hour')))).toBe(true);
    expect(scope?.target.personalSpouseOutcomeAuthorized).toBe(false);
  });

  it('rejects mismatched snapshot identity and never publishes to consumer Preview', () => {
    const result = run(A, B);
    const palace = result.maritalPalaceIntraChartResearch;
    if (!palace) throw new TypeError('Expected per-chart palace observations');
    const subject = calculateAuthorizedMyeonghwaProductionSnapshot(A, { now: new Date(AT) }).snapshot;
    const target = calculateAuthorizedMyeonghwaProductionSnapshot(B, { now: new Date(AT) }).snapshot;
    expect(() => reviewT102025SpouseCriteriaScopeV1(
      result.sourceScopeHandoff, palace, subject,
      { ...target, calculationHash: 'forged' },
    )).toThrow();
    const noOptIn = run(A, B, false);
    expect(noOptIn.spouseCriteria2025Scope).toBeUndefined();
    expect(noOptIn.html).toBe(result.html);
    expect(noOptIn.mayClaimInterpersonalMeaning).toBe(false);
    expect(noOptIn.maySell).toBe(false);
  });
});
