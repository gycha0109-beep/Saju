import { describe, expect, it } from 'vitest';
import { getSolarTerm } from 'manseryeok';
import {
  buildAnnualReferenceBoundary, annualReferenceBoundaryText,
} from '../src/reading/annual-reference-boundary.js';
import { buildAnnualMonthlyBirthResearchReading } from '../src/preview/annual-monthly-birth-research-runtime.js';
import { buildAnnualPrimaryWitnessIdentityContext } from '../src/preview/annual-primary-witness-identity-context.js';
import { buildTemporalResearchMenuReadings } from '../src/preview/temporal-research-menu-reading.js';

const birth = {
  calendarType: 'solar', date: { year: 1990, month: 5, day: 9 },
  time: { known: true, hour: 12, minute: 0 }, sexForTraditionalCalculation: 'unspecified',
} as const;

describe('calendar-year and Ipchun reference boundaries', () => {
  it.each([1800, 2018, 2020, 2026, 2300])('uses half-open precision at %i Ipchun', year => {
    const at = getSolarTerm(year, 2).date.getTime();
    const previous = buildAnnualReferenceBoundary(new Date(at - 1).toISOString());
    const exact = buildAnnualReferenceBoundary(new Date(at).toISOString());
    const after = buildAnnualReferenceBoundary(new Date(at + 1).toISOString());
    expect(previous).toMatchObject({ status: 'resolved', civilYear: year,
      effectiveYear: year - 1, position: 'before_ipchun' });
    expect(exact).toMatchObject({ status: 'resolved', civilYear: year,
      effectiveYear: year, position: 'at_or_after_ipchun' });
    expect(after).toMatchObject({ status: 'resolved', effectiveYear: year });
  });

  it('uses the Seoul year at UTC December 31 and refuses approximate fallback', () => {
    expect(buildAnnualReferenceBoundary('2019-12-31T15:00:00.000Z'))
      .toMatchObject({ civilYear: 2020, effectiveYear: 2019, position: 'before_ipchun' });
    expect(buildAnnualReferenceBoundary('2300-12-31T15:00:00.000Z'))
      .toMatchObject({ status: 'unavailable', reason: 'reference_outside_precision_range' });
    expect(() => buildAnnualReferenceBoundary('2020-02-30T00:00:00.000Z')).toThrow('canonical');
  });

  it('admits the exact classical identity after February Ipchun, never before it', () => {
    const at = getSolarTerm(2020, 2).date.getTime();
    for (const delta of [-1, 0, 1]) {
      const output = buildAnnualMonthlyBirthResearchReading(birth, {
        requestId: 'ipchun-source-identity', targetYear: 2020, targetMonth: 2,
        referenceDateTime: new Date(at + delta).toISOString(),
      });
      const boundary = output.report.annualReference.ipchunBoundary;
      expect(boundary).toMatchObject({ status: 'resolved',
        effectiveYear: delta < 0 ? 2019 : 2020 });
      const identity = buildAnnualPrimaryWitnessIdentityContext(output.report);
      if (delta < 0) expect(identity).toBeUndefined();
      else {
        expect(identity?.historicalPassage).toBe('歲君傷日者如庚剋甲日為偏官');
        expect(identity?.calculatedFactPaths).toContain('annualReference.ipchunBoundary');
        expect(identity?.annualOutcomeAuthorized).toBe(false);
      }
      expect(output.html).toContain(annualReferenceBoundaryText(boundary));
      const menus = buildTemporalResearchMenuReadings({ annualMonthly: output.report });
      expect(menus[0]?.annualReference?.ipchunBoundary).toEqual(boundary);
      expect(menus[1]?.annualReference).toBeUndefined();
      expect(menus[0]?.authority.mayCallOfficial).toBe(false);
    }
  });

  it('does not accept a substituted boundary as evidence', () => {
    const output = buildAnnualMonthlyBirthResearchReading(birth, {
      requestId: 'boundary-forgery', targetYear: 2020, targetMonth: 2,
      referenceDateTime: '2020-02-01T00:00:00.000Z',
    });
    const boundary = output.report.annualReference.ipchunBoundary;
    if (boundary.status !== 'resolved') throw new Error('Expected resolved fixture');
    const forged = { ...output.report, annualReference: { ...output.report.annualReference,
      ipchunBoundary: { ...boundary, effectiveYear: 2020 },
    } };
    expect(() => buildAnnualPrimaryWitnessIdentityContext(forged)).toThrow('exact calculated Ipchun');
  });
});
