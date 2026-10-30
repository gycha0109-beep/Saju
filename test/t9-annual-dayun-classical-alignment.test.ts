import { describe, expect, it } from 'vitest';
import type { BirthInput } from '../src/contracts/calculation.js';
import { buildAnnualMonthlyBirthResearchReading } from
  '../src/preview/annual-monthly-birth-research-runtime.js';
import { buildThreeTemporalMenusBirthReading } from
  '../src/preview/three-temporal-menus-birth-reading.js';
import {
  buildT9ClassicalAnnualDayunAlignment,
  renderT9ClassicalAnnualDayunAlignment,
  T9_CLASSICAL_ANNUAL_DAYUN_ALIGNMENT_SOURCE,
} from '../src/preview/t9-annual-dayun-classical-alignment.js';

const birth: BirthInput = {
  calendarType: 'solar',
  date: { year: 1998, month: 3, day: 28 },
  time: { known: true, hour: 22, minute: 19 },
  sexForTraditionalCalculation: 'male',
};
const read = (referenceDateTime: string, year = 2026, month = 10,
  b: BirthInput = birth) =>
  buildAnnualMonthlyBirthResearchReading(b, {
    requestId: 'classical-annual-dayun-actual-calendar',
    targetYear: year, targetMonth: month, referenceDateTime,
  });
const REFERENCE = '2026-10-25T00:00:00.000Z';

describe('actual classical Suiyun Binglin witness, not annual prognostic authority', () => {
  it('reads both actual full pillars and the original Chinese example at the correct instant', () => {
    const result = read(REFERENCE);
    const witness = result.monthlyMenu.historicalAnnualDayunAlignment!;
    const selected = result.report.t9EvidenceLinks.referenceEvidenceFocus.activeLink!;
    const active = result.report.conditionalComposition.slices.find(slice =>
      slice.startsAt === selected.startsAt &&
      slice.endsAtExclusive === selected.endsAtExclusive)!;
    expect(witness.sourceId).toBe(T9_CLASSICAL_ANNUAL_DAYUN_ALIGNMENT_SOURCE.sourceId);
    expect(witness.originalPassage).toBe(T9_CLASSICAL_ANNUAL_DAYUN_ALIGNMENT_SOURCE.passage);
    expect(witness.snapshotId).toBe(result.report.snapshotId);
    expect(witness.calculationHash).toBe(result.report.calculationHash);
    expect(witness.selectedInterval).toEqual({
      startsAt: selected.startsAt, endsAtExclusive: selected.endsAtExclusive,
    });
    expect(witness.annualEffectivePillar).toBe(
      result.report.annualReference.ipchunBoundary.status === 'resolved'
        ? result.report.annualReference.ipchunBoundary.effectivePillar.stem +
          result.report.annualReference.ipchunBoundary.effectivePillar.branch
        : null);
    expect(witness.dayunPillar).toBe(active.dayunStem === null ? null :
      active.dayunStem + active.dayunBranch);
    expect(witness.anyFullPillarMatch).toBe(
      witness.annualEffectivePillar !== null &&
      witness.annualEffectivePillar === witness.dayunPillar);
    expect(witness.compositionalOutcomeAuthorized).toBe(false);
    expect(witness.newlyEmittedT9Claims).toBe(0);
    expect(witness.maySell).toBe(false);
    const html = renderT9ClassicalAnnualDayunAlignment(witness);
    expect(result.html).toContain(html);
    expect(html).toContain('《삼명통회》 권2 논태세');
    const three = buildThreeTemporalMenusBirthReading(birth, {
      requestId: 'classical-annual-dayun-three-menus',
      targetYear: 2026, targetMonth: 10, referenceDateTime: REFERENCE,
    });
    expect(three.html).toContain(witness.paragraph);
    expect(three.annualMonthly.monthlyMenu.historicalAnnualDayunAlignment).toEqual(witness);
  });

  it('never calls an out-of-month or unknown Dayun a historical meeting', () => {
    const outside = read(REFERENCE, 2026, 11);
    expect(outside.monthlyMenu.historicalAnnualDayunAlignment?.status)
      .toBe('outside_selected_month');
    expect(outside.monthlyMenu.historicalAnnualDayunAlignment?.anyFullPillarMatch)
      .toBe(false);
    const noHour: BirthInput = { ...birth, time: { known: false } };
    const unknown = read(REFERENCE, 2026, 10, noHour);
    expect(unknown.monthlyMenu.historicalAnnualDayunAlignment?.status)
      .toBe('dayun_not_calculated');
    expect(unknown.monthlyMenu.historicalAnnualDayunAlignment?.dayunPillar).toBeNull();
    expect(unknown.monthlyMenu.historicalAnnualDayunAlignment?.newlyEmittedT9Claims).toBe(0);
  });

  it('does not confuse civil year with the effective annual pillar before Ipchun', () => {
    const early = read('2026-02-01T03:00:00.000Z', 2026, 2);
    const witness = early.monthlyMenu.historicalAnnualDayunAlignment!;
    expect(early.report.annualReference.ipchunBoundary.status).toBe('resolved');
    expect(early.report.annualReference.ipchunBoundary.status === 'resolved' &&
      early.report.annualReference.ipchunBoundary.effectiveYear).toBe(2025);
    expect(witness.status).toBe('ipchun_effective_year_mismatch');
    expect(witness.anyFullPillarMatch).toBe(false);
    expect(witness.compositionalOutcomeAuthorized).toBe(false);
  });

  it('rejects altered original historical labels and a promoted reading', () => {
    const original = read(REFERENCE).monthlyMenu.historicalAnnualDayunAlignment!;
    expect(() => renderT9ClassicalAnnualDayunAlignment({
      ...original, newlyEmittedT9Claims: 1,
    } as unknown as typeof original)).toThrow('historical source name cannot establish');
    expect(() => renderT9ClassicalAnnualDayunAlignment({
      ...original, originalPassage: 'forged' as typeof original.originalPassage,
    })).toThrow('historical source name cannot establish');
  });
});
