import { describe, expect, it } from 'vitest';
import type { BirthInput } from '../src/contracts/calculation.js';
import { buildThreeTemporalMenusBirthReading } from
  '../src/preview/three-temporal-menus-birth-reading.js';

const BIRTH: BirthInput = {
  calendarType: 'solar',
  date: { year: 1996, month: 1, day: 9 },
  time: { known: true, hour: 9, minute: 30 },
  sexForTraditionalCalculation: 'male',
};
const REFERENCE = '2026-09-03T13:00:00.000Z';
const target = (year = 2026, month = 9, referenceDateTime = REFERENCE) => ({
  requestId: 'real-three-time-menu-reading',
  targetYear: year,
  targetMonth: month,
  referenceDateTime,
});

describe('same birth → actual three Korean temporal menu outputs', () => {
  it('shows annual Korean source text, exact monthly T9 theme and current/next Dayun facts together', () => {
    const reading = buildThreeTemporalMenusBirthReading(BIRTH, target());
    const report = reading.annualMonthly.report;
    const life = reading.lifeStage.report;
    expect(reading.researchOnly).toBe(true);
    expect(reading.mayPublish).toBe(false);
    expect(reading.mayPersist).toBe(false);
    expect(reading.maySell).toBe(false);
    expect(reading.mayGrantOfficialAuthority).toBe(false);
    expect(reading.snapshotId).toBe(report.snapshotId);
    expect(reading.calculationHash).toBe(life.calculationHash);
    expect(life.snapshotId).toBe(report.snapshotId);
    expect(report.annual.sections.length).toBeGreaterThan(0);
    expect(report.monthly.referenceReading.state).toBe('in_period');
    expect(reading.html).toContain('id="annual"');
    expect(reading.html).toContain('id="monthly"');
    expect(reading.html).toContain('id="life-stage"');
    expect(reading.html).toContain('원국 일간 ' + report.observedStructuralContext.natalDayStem);
    expect(reading.html).toContain('계산된 관계 식별이며 운세 해석이나 사건 예측이 아닙니다');
    expect(reading.html).toContain('출처 권한이 확립되지 않은 내부 연구 가설');
    for(const slice of report.conditionalComposition.slices) {
      expect(reading.html).toContain(slice.koreanExplanation);
    }
    for (const phase of report.observedStructuralContext.monthlyPhases) {
      expect(reading.html).toContain('월주는 ' + phase.pillarLabel);
      expect(reading.html).toContain('원국 일간과의 월간 십신 관계는 ' + phase.monthlyStemTenGod);
    }
    for (const section of report.annual.sections) {
      expect(reading.html).toContain(section.title);
      expect(reading.html).toContain(section.text);
      expect(reading.html).toContain(section.researchProfileId);
    }
    for (const section of report.monthly.sections) {
      expect(reading.html).toContain(section.text);
      expect(reading.html).toContain(section.claimId);
      expect(reading.html).toContain(section.sourceIds[0]!);
    }
    expect(reading.html).toContain(report.monthly.referenceReading.theme!.text);
    for (const period of life.periods) {
      expect(reading.html).toContain(period.text);
    }
    expect(reading.html).toContain(life.policyHash);
    expect(reading.html).toContain('공식 공개·저장·판매·결제 권한은 없습니다');
    expect(buildThreeTemporalMenusBirthReading(BIRTH, target())).toEqual(reading);
  });

  it('uses a different year/month only as selected-period research, never claims current month or future outcomes', () => {
    const inPeriod = buildThreeTemporalMenusBirthReading(BIRTH, target());
    const outside = buildThreeTemporalMenusBirthReading(BIRTH, target(2030, 6));
    expect(outside.annualMonthly.report.annualReference.state).toBe(
      'outside_target_civil_year');
    expect(outside.annualMonthly.report.monthly.referenceReading.state).toBe(
      'outside_target_month');
    expect(outside.html).toContain('현재 연운으로 적용하지 않고 비교만 합니다');
    expect(outside.html).toContain('현재 월운으로 표시하지 않습니다');
    expect(outside.html).not.toContain('조회 시각에 해당하는 월운</h3><article class="current">');
    expect(outside.lifeStage.report).toEqual(inPeriod.lifeStage.report);
    expect(outside.annualMonthly.report.monthly.sections.map(s => s.claimId))
      .not.toEqual(inPeriod.annualMonthly.report.monthly.sections.map(s => s.claimId));
    expect(outside.researchOnly).toBe(true);
  });

  it('preserves birth-time HOLD and rejects invalid temporal scopes', () => {
    const missingTime = buildThreeTemporalMenusBirthReading(
      { ...BIRTH, time: { known: false } }, target(),
    );
    expect(missingTime.lifeStage.report.periods).toHaveLength(0);
    expect(missingTime.lifeStage.report.coverage).toBe('unavailable');
    expect(missingTime.html).toContain('대운 계산');
    expect(missingTime.annualMonthly.report.annual.unavailablePillars).toContain('hour');
    expect(missingTime.annualMonthly.report.monthly.sections
      .some(section => section.relatedPillar === 'hour')).toBe(false);
    expect(missingTime.maySell).toBe(false);
    expect(() => buildThreeTemporalMenusBirthReading(BIRTH, target(2026, 13))).toThrow();
    expect(() => buildThreeTemporalMenusBirthReading(BIRTH,
      target(2026, 9, '2026-09-03T22:00:00+09:00'))).toThrow();
  });
});
