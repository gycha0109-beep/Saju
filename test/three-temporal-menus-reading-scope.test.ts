import { describe, expect, it } from 'vitest';
import type { BirthInput } from '../src/contracts/calculation.js';
import {
  buildThreeTemporalMenusBirthReading,
} from '../src/preview/three-temporal-menus-birth-reading.js';

const BIRTH: BirthInput = {
  calendarType: 'solar',
  date: { year: 2024, month: 3, day: 10 },
  time: { known: true, hour: 12, minute: 0 },
  sexForTraditionalCalculation: 'unspecified',
};
const REQUEST = {
  requestId: 'three-equal-temporal-menus-evidence-location',
  targetYear: 2026,
  targetMonth: 9,
  referenceDateTime: '2026-09-03T13:00:00.000Z',
};

describe('three equal time menus keep personal meaning attached to its real owner', () => {
  it('does not display a natal T8 paragraph as annual fortune or a Dayun prediction', () => {
    const reading = buildThreeTemporalMenusBirthReading(BIRTH, REQUEST);
    const annual = reading.html.split('<section id="annual">')[1]
      ?.split('</section>')[0] ?? '';
    const lifeStage = reading.html.split('<section id="life-stage">')[1]
      ?.split('</section>')[0] ?? '';
    expect(annual).toContain('조회 시각');
    expect(annual).not.toContain('같은 사람에게서 별도로 확인한 사주 해석 근거');
    expect(lifeStage).toContain('삶의 단계');
    expect(lifeStage).toContain('대운');
    expect(lifeStage).toContain('길흉이나 사건 시기를 해석하지 않습니다');
    expect(reading.lifeStage.interpretationStatus)
      .toBe('source_authority_not_established');
    expect(reading.mayPublish).toBe(false);
    expect(reading.maySell).toBe(false);
    if (reading.lifeStage.natalContext.sections.length > 0) {
      expect(lifeStage).toContain('같은 사람에게서 별도로 확인한 사주 해석 근거');
      expect(lifeStage).toContain('대운이 이 성향을 강화·약화');
      expect(annual).not.toContain('대운이 이 성향을 강화·약화');
    }
  });

  it('displays the actual current and next Dayun boundary only inside the life-stage section', () => {
    const reading = buildThreeTemporalMenusBirthReading({
      calendarType: 'solar',
      date: { year: 1990, month: 5, day: 15 },
      time: { known: true, hour: 14, minute: 30 },
      sexForTraditionalCalculation: 'male',
    }, {
      requestId: 'life-stage-joined-transition',
      targetYear: 2030, targetMonth: 6,
      referenceDateTime: '2030-06-01T03:00:00.000Z',
    });
    const summary = reading.lifeStage.report.transitionSummary;
    expect(summary).toBeDefined();
    expect(reading.lifeStage.report.periods.map(p => p.kind))
      .toEqual(['current', 'next']);
    const year = reading.html.split('<section id="annual">')[1]!
      .split('</section>')[0]!;
    const month = reading.html.split('<section id="monthly">')[1]!
      .split('</section>')[0]!;
    const life = reading.html.split('<section id="life-stage">')[1]!
      .split('</section>')[0]!;
    expect(life).toContain('지금과 다음 대운의 정확한 전환 경계');
    expect(life).toContain(summary!);
    expect(life).toContain('인생 전환·성과·관계를 예측하지 않습니다');
    expect(year).not.toContain(summary!);
    expect(month).not.toContain(summary!);
    expect(reading.lifeStage.interpretationStatus)
      .toBe('source_authority_not_established');
    expect(reading.mayGrantOfficialAuthority).toBe(false);
  });

  it('labels both Jeol phases as comparisons while keeping only actual reference interval current', () => {
    const reading = buildThreeTemporalMenusBirthReading(BIRTH, REQUEST);
    const month = reading.html.split('<section id="monthly">')[1]
      ?.split('</section>')[0] ?? '';
    expect(month).toContain('조회 시각에 해당하는 월운');
    expect(month).toContain('현재 적용되는 해석은 위의 조회 시각 구간 하나뿐입니다');
    expect(reading.annualMonthly.monthlyMenu.referenceFocus?.state).toBe('in_period');
    expect(reading.annualMonthly.monthlyMenu.sections[0]?.title)
      .toContain('조회 시각에 적용되는 풀이');
    expect(reading.annualMonthly.monthlyMenu.authority.mayCallOfficial).toBe(false);
  });
});
