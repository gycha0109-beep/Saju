import { describe, expect, it } from 'vitest';
import type { BirthInput } from '../src/contracts/calculation.js';
import { buildAnnualMonthlyBirthResearchReading } from '../src/preview/annual-monthly-birth-research-runtime.js';

const sourceTime = '2026-10-25T00:00:00.000Z';
const birth = (year: number, month: number, day: number, hour: number, minute: number): BirthInput => ({
  calendarType: 'solar',
  date: { year, month, day },
  time: { known: true, hour, minute },
  sexForTraditionalCalculation: 'female',
});
function read(input: BirthInput) {
  return buildAnnualMonthlyBirthResearchReading(input, {
    requestId: 'source-bound-six-pair-research-test',
    targetYear: 2026, targetMonth: 10, referenceDateTime: sourceTime,
  });
}
const classicSources = [
  'SRC-T0-YISI-ZHAN-10',
  'SRC-T0-XUANZE-YAOLUE-UPPER',
];

describe('source-qualified period-to-natal six-pair observations', () => {
  it('emits the same-chart annual pair only with a selected T9 rule and cited classical pairing', () => {
    const result = read(birth(1964, 11, 14, 14, 59));
    const observed = result.report.annual.sections.filter(s => s.kind === 'structural_context');
    expect(observed.length).toBeGreaterThan(0);
    for (const section of observed) {
      expect(section.claimId).toBeTruthy();
      expect(section.ruleIds?.length).toBeGreaterThan(0);
      for (const sourceId of classicSources) expect(section.sourceIds).toContain(sourceId);
      expect(section.calculationFactPaths.some(path =>
        path.startsWith('temporal.annualBranchRelations.'))).toBe(true);
      expect(section.text).toContain('합화');
      expect(section.text).toContain('결과');
      expect(section.candidateClaimType).toBe('GENERAL_ANNUAL_BRANCH_SIX_COMBINATION_OBSERVATION');
    }
    expect(result.report.annual.permissions.mayPublish).toBe(false);
    expect(result.report.maySell).toBe(false);
    expect(result.html).toContain('고전 육합 짝');
  });

  it('limits monthly pairing to its exact solar-term segment and never borrows the yearly result', () => {
    const result = read(birth(1998, 3, 28, 22, 19));
    const observations = result.report.monthly.sections.filter(s => s.kind === 'structural_context');
    expect(observations.length).toBeGreaterThan(0);
    for (const s of observations) {
      expect(s.ruleIds[0]).toContain(s.segmentId.toUpperCase());
      expect(s.claimId).toBeTruthy();
      expect(s.methodologyId).toContain('MONTHLY');
      for (const sourceId of classicSources) expect(s.sourceIds).toContain(sourceId);
      expect(s.factPaths.some(path =>
        path.startsWith('temporal.segmentsById.' + s.segmentId + '.monthlyBranchRelations.'))).toBe(true);
      expect(s.calculatedInterval.startsAt < s.calculatedInterval.endsAt).toBe(true);
      expect(s.text).toContain('합화');
      expect(s.text).toContain('결과');
    }
    expect(result.report.monthly.referenceReading.state).toBe('in_period');
    expect(result.monthlyMenu.authority.mayCallOfficial).toBe(false);
    expect(result.monthlyMenu.authority.maySell).toBe(false);
  });

  it('never treats unknown birth hour as a resolved pair or a partial scenario as a certain event', () => {
    const known = birth(1964, 11, 14, 14, 59);
    const result = read({ ...known, time: { known: false } });
    expect(result.report.annual.sections.filter(s =>
      s.kind === 'structural_context' && s.relatedPillar === 'hour')).toHaveLength(0);
    expect(result.report.monthly.sections.filter(s =>
      s.kind === 'structural_context' && s.relatedPillar === 'hour')).toHaveLength(0);
    expect(result.report.usefulComplete).toBe(false);
    expect(result.report.annual.permissions.mayClaimOfficialAuthority).toBe(false);
    expect(result.report.maySell).toBe(false);
  });
});
