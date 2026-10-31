import { describe, expect, it } from 'vitest';
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
    expect(year).toContain(escaped(result.annualMonthly.report.annual.sections[0]!.text));
    expect(month).toContain('절입 전후 전체 풀이');
    expect(stage).toContain('대운의 간지·시각만 계산된 사실입니다');
  }, 30000);

  it('does not invent original-chart interpretations when birth time is unknown', () => {
    const result = buildThreeTemporalMenusBirthReading({
      calendarType: 'solar', date: { year: 1998, month: 3, day: 28 },
      time: { known: false }, sexForTraditionalCalculation: 'unspecified',
    }, TARGET);
    expect(result.lifeStage.natalContext.availability).toBe('insufficient_evidence');
    expect(result.lifeStage.natalContext.sections).toHaveLength(0);
    expect(result.html).toContain('원국 해석 근거 부족');
    expect(result.html).toContain('출처가 있는 원국 종합 풀이를 확인하지 못했습니다');
    expect(result.html).not.toContain('<summary>원국 해석 출처</summary>');
    expect(result.maySell).toBe(false);
  }, 30000);
});
