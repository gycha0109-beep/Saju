import { describe, expect, it } from 'vitest';
import type { BirthInput } from '../src/contracts/calculation.js';
import { calculateAuthorizedMyeonghwaProductionSnapshot } from
  '../src/production/production-calculation-runtime.js';
import { buildCompatibilityTwoBirthResearchReading } from
  '../src/preview/compatibility-two-birth-research-runtime.js';
import { auditT10MonthlyTransformationScopeV1 } from
  '../src/research/compatibility-t10-monthly-transformation-scope.js';

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
function snap(input: BirthInput) {
  return calculateAuthorizedMyeonghwaProductionSnapshot(
    input, { now: new Date(AT) },
  ).snapshot;
}
function run(a: BirthInput, b: BirthInput, opted = true) {
  return buildCompatibilityTwoBirthResearchReading(a, b, {
    requestId: 'individual-monthly-geju-transformation-source-review',
    subjectPersonRef: 'person-a',
    targetPersonRef: 'person-b',
    referenceDateTime: AT,
    ...(opted ? { candidateScope: 'traditional_marital_palace_comparison' as const } : {}),
  });
}

describe('T10 natal source transformation examples never become cross-chart geju claims', () => {
  it('binds source chapters, method gaps and separate actual natal hashes', () => {
    const result = run(A, B);
    const research = result.monthlyTransformationScopeResearch;
    expect(research?.source.chapter).toBe('卷一·十、論用神變化');
    expect(research?.source.priorMonthSelectionReviewHash)
      .toMatch(/^[a-f0-9]{64}$/u);
    expect(research?.source.priorBranchMeetingReviewHash)
      .toMatch(/^[a-f0-9]{64}$/u);
    expect(research?.subject.calculationHash).toBe(snap(A).calculationHash);
    expect(research?.target.calculationHash).toBe(snap(B).calculationHash);
    expect(research?.rawPatternIsNotSourceRuleExecution).toBe(true);
    expect(research?.crossPersonExampleFragmentCombinationAuthorized).toBe(false);
    expect(research?.derivedGejuAndUsefulGod).toBeNull();
    expect(research?.pairwiseT10Admitted).toBe(false);
    expect(research?.maySell).toBe(false);
    expect(result.mayClaimInterpersonalMeaning).toBe(false);
  });

  it('observes the exact yin-month visible-jia/bing source pattern without selecting month use', () => {
    // 14:30 (未 hour) cannot expose 丙 as the hour stem; use 辰 hour
    // to exercise the source's 丙透 candidate without altering the natal rule.
    const inputs = Array.from({ length: 19 }, (_, i): BirthInput => ({
      ...birth(1990, 2, i + 9),
      time: { known: true, hour: 8, minute: 30 },
    }));
    const candidate = inputs.find(input => {
      const chart = snap(input);
      const month = chart.pillars.month;
      const hidden = chart.derivedFacts.hiddenStems?.month;
      const stems = ['year', 'month', 'hour'] as const;
      const values = stems.map(slot => chart.pillars[slot]).map(p =>
        p.status === 'resolved' ? p.value.stem.value : null);
      return month.status === 'resolved' && month.value.branch.value === '인' &&
        hidden?.status === 'resolved' &&
        hidden.value.includes('갑') && hidden.value.includes('병') &&
        values.every(value => value !== null) &&
        !values.includes('갑') && values.includes('병');
    });
    expect(candidate).toBeDefined();
    if (!candidate) throw new TypeError('Expected source-compatible February witness');
    const review = run(candidate, B).monthlyTransformationScopeResearch;
    expect(review?.subject.yinExample.rawPattern).toBe('raw_positions_observed');
    expect(review?.subject.yinExample.stemJia).toEqual([]);
    expect(review?.subject.yinExample.stemBing.length).toBeGreaterThan(0);
    expect(review?.subject.yinExample.hiddenStemJiaAndBingMembershipVerified).toBe(true);
    expect(review?.subject.yinExample.monthUseSelected).toBe(false);
    expect(review?.sourceQualifiedTransformationResolverAvailable).toBe(false);
  });

  it('rechecks ding/hai/mao-wei only inside one original natal chart', () => {
    const inputs = Array.from({ length: 23 }, (_, i) => birth(1990, 11, i + 6));
    const candidate = inputs.find(input => {
      const chart = snap(input);
      return chart.pillars.day.status === 'resolved' &&
        chart.pillars.day.value.stem.value === '정' &&
        chart.pillars.month.status === 'resolved' &&
        chart.pillars.month.value.branch.value === '해';
    });
    expect(candidate).toBeDefined();
    if (!candidate) throw new TypeError('Expected Ding day in Hai month witness');
    const chart = snap(candidate);
    const review = run(candidate, B).monthlyTransformationScopeResearch;
    const relevant = ['year', 'day', 'hour'] as const;
    const expected = relevant.flatMap(slot => {
      const fact = chart.pillars[slot];
      if (fact.status !== 'resolved' ||
          (fact.value.branch.value !== '묘' && fact.value.branch.value !== '미')) {
        return [];
      }
      return [{ path: `pillars.${slot}.value.branch`, value: fact.value.branch.value }];
    });
    expect(review?.subject.dingHaiExample.dayStem).toBe('정');
    expect(review?.subject.dingHaiExample.monthBranch).toBe('해');
    expect(review?.subject.dingHaiExample.observedMaoAndWeiPositions).toEqual(expected);
    expect(review?.subject.dingHaiExample.actualBranchTransformationEstablished).toBe(false);
    expect(review?.subject.personalGejuTransformationAuthorized).toBe(false);
  });

  it('preserves ambiguous hour and keeps missing source fragments out of the other chart', () => {
    const unknownTime = birth(1990, 2, 15, false);
    const research = run(unknownTime, B).monthlyTransformationScopeResearch;
    expect(research?.subject.yinExample.unresolvedVisibleStemPaths)
      .toContain('pillars.hour.value.stem');
    expect(research?.subject.dingHaiExample.unresolvedOtherBranchPaths)
      .toContain('pillars.hour.value.branch');
    expect(research?.subject.yinExample.monthUseSelected).toBe(false);
    expect(research?.subject.dingHaiExample.actualBranchTransformationEstablished).toBe(false);
    expect(research?.crossPersonExampleFragmentCombinationAuthorized).toBe(false);
    const backward = run(B, unknownTime).monthlyTransformationScopeResearch;
    expect(research?.subject.calculationHash).toBe(backward?.target.calculationHash);
    expect(research?.target.calculationHash).toBe(backward?.subject.calculationHash);
  });

  it('rejects forged chart identity and does not change regular previews', () => {
    const internal = run(A, B);
    const publicResult = run(A, B, false);
    expect(publicResult.monthlyTransformationScopeResearch).toBeUndefined();
    expect(publicResult.html).toBe(internal.html);
    const prior = internal.yongshenMethodScopeResearch;
    if (!prior) throw new TypeError('Missing prior approved research observation');
    const target = snap(B);
    expect(() => auditT10MonthlyTransformationScopeV1(
      internal.sourceScopeHandoff, prior, snap(A),
      { ...target, calculationHash: 'forged' },
    )).toThrow();
    expect(internal.mayPublish).toBe(false);
    expect(internal.maySell).toBe(false);
  });
});
