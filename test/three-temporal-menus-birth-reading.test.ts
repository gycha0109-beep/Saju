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
    // Current-period T9 is already present in the focus and must not be
    // duplicated in the before/after list.
    const monthlyPanel = reading.html.split('<section id="monthly"')[1]!
      .split('<section id="life-stage"')[0]!;
    expect(monthlyPanel).toContain('다른 절입 구간의 풀이');
    for (const section of report.monthly.sections) {
      expect(monthlyPanel.split(section.text)).toHaveLength(2);
    }
    for (const period of life.periods) {
      expect(reading.html).toContain(period.text);
    }
    expect(reading.html).toContain(life.policyHash);
    expect(reading.html).toContain('공식 공개·저장·판매·결제 권한은 없습니다');
    expect(buildThreeTemporalMenusBirthReading(BIRTH, target())).toEqual(reading);
  });

  it('shows the selected 500-chart October month once, including exact active six-combination evidence', () => {
    const birth: BirthInput = {
      calendarType: 'solar',
      date: { year: 1998, month: 3, day: 28 },
      time: { known: true, hour: 22, minute: 19 },
      sexForTraditionalCalculation: 'male',
    };
    const reading = buildThreeTemporalMenusBirthReading(
      birth, target(2026, 10, '2026-10-25T00:00:00.000Z'),
    );
    const focus = reading.annualMonthly.report.monthly.referenceReading;
    expect(focus.state).toBe('in_period');
    expect(focus.segmentId).toBe('after_jeol');
    expect(focus.sourceBoundSupports?.length).toBeGreaterThan(0);
    const monthlyPanel = reading.html.split('<section id="monthly"')[1]!
      .split('<section id="life-stage"')[0]!;
    expect(monthlyPanel).toContain('다른 절입 구간의 풀이');
    for (const section of reading.annualMonthly.report.monthly.sections) {
      expect(monthlyPanel.split(section.text)).toHaveLength(2);
      expect(monthlyPanel).toContain(section.claimId);
      expect(monthlyPanel).toContain(section.ruleIds[0]!);
      expect(monthlyPanel).toContain(section.sourceIds[0]!);
    }
    expect(reading.mayPublish).toBe(false);
    expect(reading.maySell).toBe(false);
  });

  it('shows source-owned natal T5 in the three-menu reader when General T8 has no core', () => {
    const birth: BirthInput = {
      calendarType: 'solar', date: { year: 1981, month: 2, day: 1 },
      time: { known: true, hour: 13, minute: 52 },
      sexForTraditionalCalculation: 'male',
    };
    const reading = buildThreeTemporalMenusBirthReading(birth, target());
    const natal = reading.annualMonthly.report.natalContext;
    const context = natal.availableThemeContext!;
    expect(natal.sections).toHaveLength(0);
    expect(natal.state).toBe('insufficient');
    expect(context).toBeDefined();
    expect(context.themes.length).toBeGreaterThan(0);
    expect(reading.lifeStage.natalContext.sections).toHaveLength(0);
    const panel = reading.html.split('<section id="natal-reference"')[1]!
      .split('<section id="annual"')[0]!;
    expect(panel).toContain('aria-label="원국에서 확인된 기존 십신 부분풀이"');
    expect(panel).toContain('종합풀이가 없거나 불완전한 경우에도');
    expect(panel).not.toContain('원국 해석 근거 부족');
    for (const theme of context.themes) {
      expect(panel).toContain(theme.summary);
      expect(panel).toContain(theme.claimId);
      expect(panel).toContain(theme.ruleIds[0]!);
      expect(panel).toContain(theme.methodologyId);
      expect(panel).toContain(theme.sourceIds[0]!);
      expect(panel).toContain(theme.observedPositions[0]!);
      expect(panel).toContain(theme.observedFactPaths[0]!);
    }
    const annual = reading.html.split('<section id="annual"')[1]!
      .split('<section id="monthly"')[0]!;
    const monthly = reading.html.split('<section id="monthly"')[1]!
      .split('<section id="life-stage"')[0]!;
    expect(annual).not.toContain(context.paragraph);
    expect(monthly).not.toContain(context.paragraph);
    expect(reading.researchOnly).toBe(true);
    expect(reading.mayPublish).toBe(false);
    expect(reading.maySell).toBe(false);
    expect(buildThreeTemporalMenusBirthReading(birth, target())).toEqual(reading);
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

  it('shows pre-Ipchun annual research only as selected-year material in the three-menu reader', () => {
    const early = buildThreeTemporalMenusBirthReading(
      BIRTH, target(2026, 2, '2026-02-03T00:00:00.000Z'),
    );
    const atIpchun = early.annualMonthly.report.annualEffectiveContext.ipchunAt;
    const before = buildThreeTemporalMenusBirthReading(BIRTH, target(
      2026, 2, new Date(Date.parse(atIpchun) - 1).toISOString(),
    ));
    const after = buildThreeTemporalMenusBirthReading(BIRTH, target(
      2026, 2, atIpchun,
    ));
    expect(before.annualMonthly.report.annualCurrentReading.state).toBe('before_ipchun');
    expect(before.html).toContain('<section id="annual"><h2>선택한 연도 — 2026년</h2>');
    expect(before.html).toContain('아래 연운은 비교 자료로만 제공합니다');
    expect(before.html).not.toContain('<section id="annual"><h2>올해 — 2026년</h2>');
    expect(after.annualMonthly.report.annualCurrentReading.state).toBe('in_target_civil_year');
    expect(after.html).toContain('<section id="annual"><h2>올해 — 2026년</h2>');
    expect(after.html).toContain('입춘 이후 효력 연주는 병오');
    expect(before.annualMonthly.report.annual.sections)
      .toEqual(after.annualMonthly.report.annual.sections);
    expect(before.maySell).toBe(false);
    expect(after.maySell).toBe(false);
  });

  it('preserves birth-time HOLD and rejects invalid temporal scopes', () => {
    const missingTime = buildThreeTemporalMenusBirthReading(
      { ...BIRTH, time: { known: false } }, target(),
    );
    expect(missingTime.lifeStage.report.periods).toHaveLength(0);
    expect(missingTime.lifeStage.report.coverage).toBe('unavailable');
    expect(missingTime.html).toContain('대운 계산');
    expect(missingTime.annualMonthly.report.annual.unavailablePillars).toContain('hour');
    expect(missingTime.annualMonthly.report.monthly.referenceReading.state).toBe('in_period');
    expect(missingTime.annualMonthly.report.monthly.referenceReading.unavailableNatalPillars)
      .toContain('hour');
    const annualPanel = missingTime.html.split('<section id="annual"')[1]!
      .split('<section id="monthly"')[0]!;
    const monthlyPanel = missingTime.html.split('<section id="monthly"')[1]!
      .split('<section id="life-stage"')[0]!;
    expect(annualPanel).toContain('aria-label="올해 미확정 원국 충·육합 관계"');
    expect(annualPanel).toContain('시주 지지와 올해 연운 사이의 충·육합 관계는');
    expect(monthlyPanel).toContain('aria-label="조회 절입 구간의 미확정 원국 충·육합 관계"');
    expect(monthlyPanel).toContain('시주 지지와 조회 절입 구간의 월운 충·육합 관계는');
    expect(annualPanel).toContain('충이나 육합이 없다는 결론이 아닙니다');
    expect(monthlyPanel).toContain('충이나 육합이 없다는 결론이 아닙니다');
    expect(missingTime.annualMonthly.report.monthly.sections
      .some(section => section.relatedPillar === 'hour')).toBe(false);
    // An inapplicable comparison year/month must not carry current-period
    // uncertainty warnings as if those selected-period T9 claims were active.
    const outsideUnknown = buildThreeTemporalMenusBirthReading(
      { ...BIRTH, time: { known: false } }, target(2030, 6),
    );
    expect(outsideUnknown.html).not.toContain('aria-label="올해 미확정 원국 충·육합 관계"');
    expect(outsideUnknown.html).not.toContain('aria-label="조회 절입 구간의 미확정 원국 충·육합 관계"');
    expect(buildThreeTemporalMenusBirthReading(BIRTH, target()).html)
      .not.toContain('aria-label="조회 절입 구간의 미확정 원국 충·육합 관계"');
    expect(missingTime.maySell).toBe(false);
    expect(() => buildThreeTemporalMenusBirthReading(BIRTH, target(2026, 13))).toThrow();
    expect(() => buildThreeTemporalMenusBirthReading(BIRTH,
      target(2026, 9, '2026-09-03T22:00:00+09:00'))).toThrow();
  });
});
