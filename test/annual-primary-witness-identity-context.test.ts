import { describe, expect, it } from 'vitest';
import type { BirthInput } from '../src/contracts/calculation.js';
import { buildAnnualMonthlyBirthResearchReading } from
  '../src/preview/annual-monthly-birth-research-runtime.js';
import { buildThreeTemporalMenusBirthReading } from
  '../src/preview/three-temporal-menus-birth-reading.js';
import { buildAnnualPrimaryWitnessIdentityContext } from
  '../src/preview/annual-primary-witness-identity-context.js';
import { buildTemporalResearchMenuReadings } from
  '../src/preview/temporal-research-menu-reading.js';

const gapDay: BirthInput = {
  calendarType: 'solar',
  date: { year: 1990, month: 5, day: 9 },
  time: { known: true, hour: 12, minute: 0 },
  sexForTraditionalCalculation: 'unspecified',
};
const target = (year: number, month = 9) => ({
  requestId: 'exact-ming-annual-research-proof',
  targetYear: year,
  targetMonth: month,
  referenceDateTime: year + '-09-03T13:00:00.000Z',
});

describe('exact original Ming Tai Sui witness on an actual calculated natal chart', () => {
  for (const item of [
    { year: 2020, stem: '경', tenGod: '편관', passage: '歲君傷日者如庚剋甲日為偏官' },
    { year: 2018, stem: '무', tenGod: '편재', passage: '日犯歲君如甲日剋戊年為偏財' },
  ]) {
    it('shows exactly ' + item.year + ' source-backed relationship identity, never a future outcome', () => {
      const output = buildThreeTemporalMenusBirthReading(gapDay, target(item.year));
      const primary = buildAnnualPrimaryWitnessIdentityContext(output.annualMonthly.report);
      expect(output.annualMonthly.report.observedStructuralContext.natalDayStem).toBe('갑');
      expect(output.annualMonthly.report.observedStructuralContext.annualPillarLabel)
        .toMatch(new RegExp('^' + item.stem));
      expect(output.annualMonthly.report.observedStructuralContext.annualStemTenGod)
        .toBe(item.tenGod);
      expect(primary?.historicalPassage).toBe(item.passage);
      expect(primary?.sourcePdfPageOneBased).toBe(25);
      expect(primary?.calculatedFactPaths).toContain('temporal.annualStemTenGod');
      expect(primary?.identityOnly).toBe(true);
      expect(primary?.annualOutcomeAuthorized).toBe(false);
      expect(primary?.modernAnnualThemeAuthorized).toBe(false);
      expect(primary?.monthlyAuthorityInherited).toBe(false);
      expect(output.html).toContain(item.passage);
      expect(output.html).toContain(primary!.text);
      expect(output.annualMonthly.html).toContain(item.passage);
      expect(output.annualMonthly.html).toContain(primary!.text);
      const menus = buildTemporalResearchMenuReadings({ annualMonthly: output.annualMonthly.report });
      const witness = menus[0]!.sections.find(section =>
        section.evidenceKind === 'annual_primary_relation_witness');
      expect(witness?.text).toContain(item.passage);
      expect(witness?.sourceIds).toEqual([primary!.exactSourceCandidateId]);
      expect(witness?.factPaths).toEqual(primary!.calculatedFactPaths);
      expect(menus[0]!.authority.mayCallOfficial).toBe(false);
      expect(output.html).toContain('고전 원문과 정확히 일치하는 십신 관계 · 연구');
      expect(output.mayPublish).toBe(false);
      expect(output.maySell).toBe(false);
      expect(output.annualMonthly.monthlyMenu.authority.mayMarkMenuAvailable)
        .toBe(false);
    });
  }

  it('does not generalize a source example to other day masters or annual Ten Gods', () => {
    const other: BirthInput = {
      ...gapDay, date: { year: 1990, month: 5, day: 15 },
    };
    const output = buildThreeTemporalMenusBirthReading(other, target(2020));
    expect(buildAnnualPrimaryWitnessIdentityContext(output.annualMonthly.report))
      .toBeUndefined();
    expect(output.html).not.toContain('고전 원문과 정확히 일치하는 십신 관계 · 연구');
  });

  it('holds the unverified Gregorian-to-Ipchun year boundary and does not promote annual claims', () => {
    const output = buildAnnualMonthlyBirthResearchReading(gapDay, target(2020, 2));
    expect(output.report.observedStructuralContext.natalDayStem).toBe('갑');
    expect(buildAnnualPrimaryWitnessIdentityContext(output.report)).toBeUndefined();
    const forged = {
      ...output.report,
      mayPublish: true as const,
    } as unknown as typeof output.report;
    expect(() => buildAnnualPrimaryWitnessIdentityContext(forged))
      .toThrow('research-only');
    expect(output.monthlyMenu.authority.mayCallOfficial).toBe(false);
  });
});
