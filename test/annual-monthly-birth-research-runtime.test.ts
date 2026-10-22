import { describe, expect, it } from 'vitest';
import type { BirthInput } from '../src/contracts/calculation.js';
import {
  buildAnnualMonthlyBirthResearchReading,
} from '../src/preview/annual-monthly-birth-research-runtime.js';

const REFERENCE = '2026-09-03T13:00:00.000Z';
const BIRTH: BirthInput = {
  calendarType: 'solar',
  date: { year: 1996, month: 1, day: 9 },
  time: { known: true, hour: 9, minute: 30 },
  sexForTraditionalCalculation: 'unspecified',
};
function read(
  birth: BirthInput = BIRTH,
  year = 2026,
  month = 9,
) {
  return buildAnnualMonthlyBirthResearchReading(birth, {
    requestId: 'actual-birth-year-month-' + year + '-' + month,
    targetYear: year, targetMonth: month,
    referenceDateTime: REFERENCE,
  });
}

describe('actual birth → internal annual + both monthly Jeol research reading', () => {
  it('exposes real source-owned Korean annual and monthly sections from a single canonical input', () => {
    const result = read();
    expect(result.lifecycle).toBe('internal_research_only');
    expect(result.mayGrantOfficialAuthority).toBe(false);
    expect(result.mayPublish).toBe(false);
    expect(result.maySell).toBe(false);
    expect(result.report.targetYear).toBe(2026);
    expect(result.report.targetMonth).toBe(9);
    expect(result.report.annual.targetYear).toBe(2026);
    expect(result.report.monthly.targetMonth).toBe(9);
    expect(result.report.monthly.coverage).toBe('complete');
    expect(result.report.monthly.snapshotId).toBe(result.report.snapshotId);
    expect(result.report.monthly.calculationHash).toBe(result.report.calculationHash);
    expect(result.report.monthly.sections
      .filter(x => x.kind === 'theme').map(x => x.segmentId))
      .toEqual(['before_jeol', 'after_jeol']);
    expect(result.report.researchOnly).toBe(true);
    expect(result.report.usefulComplete).toBe(false);
    expect(result.html).toContain('id="year-reading"');
    expect(result.html).toContain('id="monthly-reading"');
    expect(result.html).toContain('올해의 흐름');
    for (const section of result.report.monthly.sections) {
      expect(result.html).toContain(section.text);
      expect(result.html).toContain(section.claimId);
      for (const path of section.factPaths) expect(result.html).toContain(path);
    }
    expect(result.html).toContain('Official Reading, 공개 또는 판매 권한을 부여하지 않습니다');
  });

  it('changes the real time-scoped interpretation by requested month but replays deterministically', () => {
    const september = read();
    const replay = read();
    const october = read(BIRTH, 2026, 10);
    expect(replay).toEqual(september);
    expect(september.report.annual).toEqual(october.report.annual);
    expect(september.report.monthly.jeolBoundary.at)
      .not.toEqual(october.report.monthly.jeolBoundary.at);
    expect(september.report.monthly.sections.filter(x => x.kind === 'theme')
      .map(x => x.title))
      .not.toEqual(october.report.monthly.sections.filter(x => x.kind === 'theme')
        .map(x => x.title));
  });

  it('changes the annual Ten-God theme and source-bound monthly text for a different birth chart', () => {
    const first = read();
    const another = read({
      ...BIRTH, date: { year: 1996, month: 2, day: 12 },
    });
    expect(another.report.snapshotId).not.toBe(first.report.snapshotId);
    expect(another.report.calculationHash).not.toBe(first.report.calculationHash);
    expect(
      another.report.annual.annualStemTenGod === first.report.annual.annualStemTenGod &&
      another.report.monthly.sections.map(x => x.title).join('|') ===
        first.report.monthly.sections.map(x => x.title).join('|'),
    ).toBe(false);
    expect(another.report.monthly.snapshotId).toBe(another.report.snapshotId);
  });

  it('preserves all known date context but does not invent birth-hour-related monthly tension', () => {
    const unknown: BirthInput = { ...BIRTH, time: { known: false } };
    const result = read(unknown);
    expect(result.report.annual.unavailablePillars).toContain('hour');
    expect(result.report.monthly.sections.some(section => section.relatedPillar === 'hour'))
      .toBe(false);
    expect(result.report.monthly.missing.join(' ')).toContain('시주');
    expect(result.report.annual.permissions.mayPublish).toBe(false);
    expect(result.report.monthly.maySell).toBe(false);
  });

  it('rejects bad month/year, missing request identity and invalid or unzoned timestamps', () => {
    const target = {
      requestId: 'time-bound-year-month',
      targetYear: 2026,
      targetMonth: 9,
      referenceDateTime: REFERENCE,
    };
    for (const bad of [
      { targetYear: 1799 }, { targetYear: 2301 },
      { targetYear: 2026.1 }, { targetMonth: 0 }, { targetMonth: 13 },
    ]) {
      expect(() => buildAnnualMonthlyBirthResearchReading(
        BIRTH, { ...target, ...bad },
      )).toThrow();
    }
    expect(() => buildAnnualMonthlyBirthResearchReading(
      BIRTH, { ...target, requestId: '' },
    )).toThrow();
    for (const invalid of [
      '2026-09-03T13:00:00', '2026-09-03', '2026-02-30T13:00:00.000Z',
      '2026-09-03T13:00:00+09:00', 'not-a-date',
    ]) {
      expect(() => buildAnnualMonthlyBirthResearchReading(
        BIRTH, { ...target, referenceDateTime: invalid },
      )).toThrow();
    }
  });
});
