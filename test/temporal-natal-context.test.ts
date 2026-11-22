import { describe, expect, it } from 'vitest';
import type { BirthInput } from '../src/contracts/calculation.js';
import { buildAnnualMonthlyBirthResearchReading } from '../src/preview/annual-monthly-birth-research-runtime.js';

const BIRTH: BirthInput = {
  calendarType: 'solar',
  date: { year: 1996, month: 1, day: 9 },
  time: { known: true, hour: 9, minute: 30 },
  sexForTraditionalCalculation: 'male',
};
const TARGET = {
  requestId: 'temporal-natal-context-test',
  targetYear: 2026,
  targetMonth: 9,
  referenceDateTime: '2026-09-03T13:00:00.000Z',
};

describe('same-chart natal context in annual/monthly research reading', () => {
  it('compares existing T8 family observations with annual and both monthly T9 themes only', () => {
    const result = buildAnnualMonthlyBirthResearchReading(BIRTH, TARGET);
    const report = result.report;
    expect(report.natalContext.snapshotId).toBe(report.snapshotId);
    expect(report.natalContext.calculationHash).toBe(report.calculationHash);
    expect(report.temporalNatalComparison).toHaveLength(3);
    expect(report.temporalNatalComparison.map((x) => x.period)).toEqual([
      'annual',
      'monthly_before_jeol',
      'monthly_after_jeol',
    ]);
    for (const item of report.temporalNatalComparison) {
      expect(item.interpretation).toBe('co_observed_only_no_interaction_claim');
      expect(['peer', 'resource', 'output', 'wealth', 'officer']).toContain(item.periodFamily);
      expect(item.periodTenGod).toMatch(/^(비견|겁재|정인|편인|식신|상관|정재|편재|정관|편관)$/u);
      for (const match of item.natalMatches) {
        const source = report.natalContext.sections.find(
          (section) => section.pattern === match.pattern && section.families.includes(match.family),
        );
        expect(source).toBeDefined();
        expect(match.observedPositions).toEqual(source?.observedPositions);
        expect(match.matchedFamilyPositions.length).toBeGreaterThan(0);
        expect(match.matchedFamilyPositions.every((p) => match.observedPositions.includes(p))).toBe(
          true,
        );
        const expected = {
          peer: ['비견', '겁재'],
          resource: ['정인', '편인'],
          output: ['식신', '상관'],
          wealth: ['정재', '편재'],
          officer: ['정관', '편관'],
        }[item.periodFamily];
        expect(
          match.matchedFamilyPositions.every((p) => expected.some((god) => p.endsWith(' ' + god))),
        ).toBe(true);
        const otherFamily = match.observedPositions.filter(
          (p) => !match.matchedFamilyPositions.includes(p),
        );
        expect(otherFamily.length).toBeGreaterThan(0);
      }
    }
    expect(report.mayPublish).toBe(false);
    expect(report.maySell).toBe(false);
    expect(result.html).toContain('id="natal-context"');
    expect(result.html).toContain('id="natal-temporal-comparison"');
    expect(result.html).toContain('상호작용이나 길흉을 뜻하지 않습니다');
  });

  it('keeps unknown-hour and insufficient natal evidence local without inventing a match', () => {
    const result = buildAnnualMonthlyBirthResearchReading(
      { ...BIRTH, time: { known: false } },
      TARGET,
    );
    expect(result.report.natalContext.snapshotId).toBe(result.report.snapshotId);
    expect(result.report.temporalNatalComparison).toHaveLength(3);
    for (const item of result.report.temporalNatalComparison) {
      expect(item.interpretation).toBe('co_observed_only_no_interaction_claim');
      expect(item.natalMatches.every((match) => match.observedPositions.length >= 2)).toBe(true);
    }
    expect(result.mayPublish).toBe(false);
    expect(result.maySell).toBe(false);
  });
});
