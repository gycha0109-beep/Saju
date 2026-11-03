import { describe, expect, it } from 'vitest';
import {
  buildAnnualMonthlyBirthResearchReading,
} from '../src/preview/annual-monthly-birth-research-runtime.js';
import {
  buildThreeTemporalMenusBirthReading,
} from '../src/preview/three-temporal-menus-birth-reading.js';

const TARGET = {
  requestId: 'source-bound-year-month-life-context',
  targetYear: 2026,
  targetMonth: 10,
  referenceDateTime: '2026-10-25T00:00:00.000Z',
};
const escaped = (value: string): string => value.replace(/[&<>"']/gu, char => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[char]!);

describe('three temporal menus preserve already source-bound natal interpretation separately', () => {
  it('shows a real same-person natal T8 only once before the yearly and monthly research readings', () => {
    const result = buildThreeTemporalMenusBirthReading({
      calendarType: 'solar', date: { year: 1998, month: 3, day: 28 },
      time: { known: true, hour: 22, minute: 19 },
      sexForTraditionalCalculation: 'unspecified',
    }, TARGET);
    const natal = result.lifeStage.natalContext;
    expect(natal.availability).toBe('bounded_natal_t8_research');
    expect(natal.sections.length).toBeGreaterThan(0);
    expect(natal.snapshotId).toBe(result.annualMonthly.report.snapshotId);
    expect(natal.calculationHash).toBe(result.calculationHash);
    expect(result.researchOnly).toBe(true);
    expect(result.mayPublish).toBe(false);
    expect(result.mayPersist).toBe(false);
    expect(result.maySell).toBe(false);
    expect(result.mayGrantOfficialAuthority).toBe(false);

    const html = result.html;
    expect(html).toContain('id="natal-reference"');
    expect(html).toContain('href="#natal-reference"');
    expect(html).toContain('<h1>올해 · 이번 달 · 삶의 단계</h1>');
    expect(html).toContain('<section id="annual"><h2>올해 — 2026년</h2>');
    expect(html).toContain('<section id="monthly"><h2>이번 달 — 10월</h2>');
    expect(html).toContain('연운·월운과 원국의 의미 연결은 별도 출처·방법론이 확인되기 전까지 보류');
    expect(html.indexOf('id="natal-reference"')).toBeLessThan(html.indexOf('id="annual"'));
    expect(html.indexOf('id="annual"')).toBeLessThan(html.indexOf('id="monthly"'));
    expect(html.indexOf('id="monthly"')).toBeLessThan(html.indexOf('id="life-stage"'));
    const year = html.split('<section id="annual">')[1]!.split('</section>')[0]!;
    const month = html.split('<section id="monthly">')[1]!.split('</section>')[0]!;
    const stage = html.split('<section id="life-stage">')[1]!.split('</section>')[0]!;
    for (const section of natal.sections) {
      expect(section.sourceIds.length).toBeGreaterThanOrEqual(2);
      expect(section.factPaths.length).toBeGreaterThanOrEqual(2);
      expect(html).toContain(escaped(section.paragraph));
      expect(html).toContain(escaped(section.sourceIds[0]!));
      expect(html).toContain(escaped(section.factPaths[0]!));
      expect(year).not.toContain(escaped(section.paragraph));
      expect(month).not.toContain(escaped(section.paragraph));
      expect(stage).not.toContain(escaped(section.paragraph));
    }
    expect(html.match(/<summary>원국 해석 출처<\/summary>/gu))
      .toHaveLength(natal.sections.length);
    expect(result.annualMonthly.report.annualExecutedEvidence)
      .toHaveLength(result.annualMonthly.report.annual.sections.length);
    for (const evidence of result.annualMonthly.report.annualExecutedEvidence) {
      expect(evidence.claimId).toMatch(/^claim_/u);
      expect(evidence.ruleIds.length).toBeGreaterThan(0);
      expect(year).toContain(evidence.claimId);
      expect(year).toContain(evidence.ruleIds[0]!);
    }
    expect(year).toContain(escaped(result.annualMonthly.report.annual.sections[0]!.text));
    expect(month).toContain('절입 전후 전체 풀이');
    const monthlyReport = result.annualMonthly.report.monthly;
    expect(monthlyReport.referenceReading.state).toBe('in_period');
    const focus = monthlyReport.referenceReading.theme!;
    const active = month.split('<h3>조회 시각에 해당하는 월운</h3>')[1]!
      .split('<h3>절입 전후 전체 풀이</h3>')[0]!;
    expect(active).toContain(escaped(focus.claimId));
    expect(active).toContain(escaped(focus.methodologyId));
    for (const path of focus.factPaths) expect(active).toContain(escaped(path));
    for (const section of monthlyReport.sections) {
      const kind = section.kind === 'theme' ? '절입 구간의 중심 주제' :
        '해당 구간의 조건부 원국 충 관계';
      expect(month).toContain(kind);
      expect(month).toContain(escaped(section.claimId));
      expect(month).toContain(escaped(section.methodologyId));
      for (const ruleId of section.ruleIds) expect(month).toContain(escaped(ruleId));
      for (const path of section.factPaths) expect(month).toContain(escaped(path));
      for (const sourceId of section.sourceIds) expect(month).toContain(escaped(sourceId));
    }
    expect(stage).toContain('대운의 간지·시각만 계산된 사실입니다');
  }, 30000);

  it('shows only the already selected natal clash in the active Jeol segment of the three-menu first screen', () => {
    const birth = {
      calendarType: 'solar' as const,
      date: { year: 1996, month: 1, day: 9 },
      time: { known: true as const, hour: 9, minute: 30 },
      sexForTraditionalCalculation: 'unspecified' as const,
    };
    let selected: ReturnType<typeof buildThreeTemporalMenusBirthReading> | undefined;
    for (let month = 1; month <= 12; month++) {
      const target = {
        ...TARGET, targetMonth: month,
        referenceDateTime: '2026-' + String(month).padStart(2, '0') + '-01T12:00:00.000Z',
      };
      const scan = buildAnnualMonthlyBirthResearchReading(birth, target);
      const tension = scan.report.monthly.sections.find(section => section.kind === 'tension');
      if (!tension) continue;
      const activeTarget = {
        ...target,
        referenceDateTime: new Date(
          Date.parse(tension.calculatedInterval.startsAt) + 60_000,
        ).toISOString(),
      };
      selected = buildThreeTemporalMenusBirthReading(birth, activeTarget);
      break;
    }
    expect(selected).toBeDefined();
    const reading = selected!;
    const focus = reading.annualMonthly.report.monthly.referenceReading;
    expect(focus.state).toBe('in_period');
    expect(focus.sourceBoundTensions?.length).toBeGreaterThan(0);
    const current = reading.html.split('<h3>조회 시각에 해당하는 월운</h3>')[1]!
      .split('<h3>절입 전후 전체 풀이</h3>')[0]!;
    expect(current).toContain('aria-label="조회 시각 절입 구간의 실제 원국 충 관계"');
    expect(current).toContain('실제 사건·길흉을 예측하지 않습니다');
    expect(current).toContain(escaped(focus.theme!.claimId));
    for (const section of focus.sourceBoundTensions ?? []) {
      expect(section.segmentId).toBe(focus.segmentId);
      expect(section.calculatedInterval).toEqual(focus.theme!.calculatedInterval);
      expect(section.observedClash?.relation).toBe('clash');
      expect(current).toContain(escaped(section.text));
      expect(current).toContain(escaped(section.claimId));
      expect(current).toContain(escaped(section.ruleIds[0]!));
      expect(current).toContain(escaped(section.methodologyId));
      expect(current).toContain(escaped(section.sourceIds[0]!));
      expect(current).toContain(escaped(section.factPaths[0]!));
    }
    const unrelated = reading.annualMonthly.report.monthly.sections.filter(section =>
      section.kind === 'tension' && section.segmentId !== focus.segmentId);
    for (const other of unrelated) {
      expect(current).not.toContain(escaped(other.claimId));
      expect(current).not.toContain(escaped(other.text));
    }
    expect(reading.mayPublish).toBe(false);
    expect(reading.maySell).toBe(false);
  }, 60_000);

  it('labels comparison year/month independently of the actual reference instant', () => {
    const result = buildThreeTemporalMenusBirthReading({
      calendarType: 'solar', date: { year: 1996, month: 1, day: 9 },
      time: { known: true, hour: 9, minute: 30 },
      sexForTraditionalCalculation: 'unspecified',
    }, {
      ...TARGET, targetYear: 2027, targetMonth: 12,
    });
    expect(result.annualMonthly.report.annualReference.state)
      .toBe('outside_target_civil_year');
    expect(result.annualMonthly.report.monthly.referenceReading.state)
      .toBe('outside_target_month');
    expect(result.html).toContain('<h1>선택한 연도 · 선택한 월 · 삶의 단계</h1>');
    expect(result.html).toContain('<section id="annual"><h2>선택한 연도 — 2027년</h2>');
    expect(result.html).toContain('<section id="monthly"><h2>선택한 월 — 12월</h2>');
    expect(result.html).toContain('현재 연운으로 적용하지 않고 비교만 합니다');
    expect(result.html).toContain('조회 시각이 선택한 월 밖입니다');
    expect(result.html).not.toContain('<section id="annual"><h2>올해 — 2027년</h2>');
    expect(result.mayPublish).toBe(false);
    expect(result.maySell).toBe(false);
  }, 30000);

  it('never displays a research month as current outside its requested Seoul month', () => {
    const reading = buildThreeTemporalMenusBirthReading({
      calendarType: 'solar', date: { year: 1996, month: 1, day: 9 },
      time: { known: true, hour: 9, minute: 30 },
      sexForTraditionalCalculation: 'unspecified',
    }, { ...TARGET, referenceDateTime: '2026-09-03T13:00:00.000Z' });
    expect(reading.annualMonthly.report.monthly.referenceReading.state)
      .toBe('outside_target_month');
    const current = reading.html.split('<h3>조회 시각에 해당하는 월운</h3>')[1]!
      .split('<h3>절입 전후 전체 풀이</h3>')[0]!;
    expect(current).toContain('조회 시각이 선택한 월 밖입니다');
    expect(current).not.toContain('현재 구간에 선택된 월운 T9 근거');
    expect(current).not.toContain('active-month-relations');
    expect(reading.maySell).toBe(false);
  }, 30_000);

  it('does not invent original-chart interpretations when birth time is unknown', () => {
    const result = buildThreeTemporalMenusBirthReading({
      calendarType: 'solar', date: { year: 1998, month: 3, day: 28 },
      time: { known: false }, sexForTraditionalCalculation: 'unspecified',
    }, TARGET);
    expect(result.lifeStage.natalContext.availability).toBe('insufficient_evidence');
    expect(result.lifeStage.natalContext.sections).toHaveLength(0);
    expect(result.html).toContain('원국 해석 근거 부족');
    expect(result.annualMonthly.report.natalContext.availableThemeContext).toBeUndefined();
    expect(result.html).toContain('출처가 있는 원국 종합 풀이 또는 십신 부분풀이를 확인하지 못했습니다');
    expect(result.html).not.toContain('aria-label="원국에서 확인된 기존 십신 부분풀이"');
    expect(result.html).not.toContain('<summary>원국 해석 출처</summary>');
    expect(result.maySell).toBe(false);
  }, 30000);
});
