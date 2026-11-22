import { describe, expect, it } from 'vitest';
import type { BirthInput } from '../src/contracts/calculation.js';
import { buildAnnualMonthlyBirthResearchReading } from '../src/preview/annual-monthly-birth-research-runtime.js';
import { buildThreeTemporalMenusBirthReading } from '../src/preview/three-temporal-menus-birth-reading.js';

// Synthetic, deterministic fixtures from the existing 500-case sample.
const annualFixture: BirthInput = {
  calendarType: 'solar',
  date: { year: 1970, month: 12, day: 31 },
  time: { known: true, hour: 6, minute: 32 },
  sexForTraditionalCalculation: 'female',
};
const monthlyFixture: BirthInput = {
  calendarType: 'solar',
  date: { year: 1982, month: 1, day: 26 },
  time: { known: true, hour: 21, minute: 58 },
  sexForTraditionalCalculation: 'female',
};
const heldFixture: BirthInput = {
  calendarType: 'solar',
  date: { year: 1984, month: 1, day: 24 },
  time: { known: true, hour: 4, minute: 41 },
  sexForTraditionalCalculation: 'male',
};
const unrelatedFixture: BirthInput = {
  calendarType: 'solar',
  date: { year: 1998, month: 3, day: 28 },
  time: { known: true, hour: 22, minute: 19 },
  sexForTraditionalCalculation: 'female',
};
const target = {
  requestId: 'classical-temporal-fixture',
  targetYear: 2026,
  targetMonth: 10,
  referenceDateTime: '2026-10-25T00:00:00.000Z',
};

describe('classical visible-stem interaction in the existing research readers', () => {
  it('uses the exact annual T9 theme and actual natal position, retaining all authority restrictions', () => {
    const reading = buildThreeTemporalMenusBirthReading(annualFixture, target);
    const report = reading.annualMonthly.report;
    expect(report.annual.annualStemTenGod).toBe('상관');
    expect(report.annual.stemInteractions).toHaveLength(1);
    const interaction = report.annual.stemInteractions[0]!;
    expect(interaction).toMatchObject({
      pair: 'hurting_officer_direct_officer',
      period: 'annual',
      state: 'conditional',
      natalSlots: ['year'],
      visibleMediators: [],
    });
    expect(interaction.text).toContain(
      '바꾸고 싶은 점을 표현할 때 그대로 지킬 기준과 새로 제안할 부분',
    );
    expect(interaction.factPaths).toEqual(
      expect.arrayContaining([
        'temporal.annualPillar',
        'temporal.annualStemTenGod',
        'derivedFacts.tenGods.year.stem',
      ]),
    );
    expect(interaction.claimId).not.toBe(interaction.periodClaimId);
    expect(interaction.sourceIds).toContain('SRC-JAPYEONG-JINJEON-TRANSIT-AND-REMEDY');
    expect(reading.html).toContain(interaction.text);
    expect(reading.annualMonthly.html).toContain(interaction.text);
    expect(report).toMatchObject({
      researchOnly: true,
      mayPublish: false,
      maySell: false,
      usefulComplete: false,
    });
    expect(buildThreeTemporalMenusBirthReading(annualFixture, target)).toEqual(reading);
  });

  it('applies the two natal positions once and only in the correct segment at the actual Jeol boundary', () => {
    const lookup = buildAnnualMonthlyBirthResearchReading(monthlyFixture, target);
    const boundary = lookup.report.monthly.jeolBoundary.at;
    const rightBefore = new Date(Date.parse(boundary) - 1).toISOString();
    const before = buildAnnualMonthlyBirthResearchReading(monthlyFixture, {
      ...target,
      referenceDateTime: rightBefore,
    });
    const at = buildAnnualMonthlyBirthResearchReading(monthlyFixture, {
      ...target,
      referenceDateTime: boundary,
    });
    const active = before.monthlyMenu.referenceFocus?.currentSection;
    const comparison = at.monthlyMenu.sections.find((section) => section.stemInteractions?.length);
    expect(before.monthlyMenu.referenceFocus?.segmentId).toBe('before_jeol');
    expect(at.monthlyMenu.referenceFocus?.segmentId).toBe('after_jeol');
    expect(active?.stemInteractions).toHaveLength(1);
    const interaction = active!.stemInteractions![0]!;
    expect(interaction).toMatchObject({
      pair: 'indirect_resource_eating_god',
      period: 'before_jeol',
      state: 'conditional',
      periodClaimId: active?.claimId,
      natalSlots: ['year', 'month'],
    });
    expect(interaction.factPaths).toContain('temporal.segmentsById.before_jeol.monthlyPillar');
    expect(interaction.factPaths).not.toContain('temporal.segmentsById.after_jeol.monthlyPillar');
    expect(interaction.text).toContain('새 자료나 방식을 검토하는 시간');
    expect(at.monthlyMenu.referenceFocus?.currentSection?.stemInteractions).toEqual([]);
    expect(comparison?.stemInteractions).toHaveLength(1);
    expect(before.report.calculationHash).toBe(at.report.calculationHash);
  });

  it('withholds a direction when a mediator is present or the hour is unresolved, and leaves unrelated periods alone', () => {
    const report = buildAnnualMonthlyBirthResearchReading(heldFixture, target).report;
    const held = report.monthly.stemInteractions.find((item) => item.period === 'after_jeol');
    expect(held).toMatchObject({
      pair: 'hurting_officer_direct_officer',
      state: 'held_visible_mediator',
    });
    expect(held?.visibleMediators.length).toBeGreaterThan(0);
    expect(held?.text).toContain('기간 주제를 좁히는 풀이는 보류합니다');
    expect(held?.text).not.toContain('바꾸고 싶은 점을 표현할 때');
    const unknown = buildAnnualMonthlyBirthResearchReading(
      { ...annualFixture, time: { known: false } },
      target,
    ).report;
    expect(unknown.annual.stemInteractions).toEqual([]);
    expect(unknown.monthly.stemInteractions).toEqual([]);
    expect(unknown.annual.sections.length).toBeGreaterThan(0);
    expect(unknown.monthly.sections.filter((item) => item.kind === 'theme')).toHaveLength(2);
    const unrelated = buildAnnualMonthlyBirthResearchReading(unrelatedFixture, target).report;
    expect(unrelated.annual.stemInteractions).toEqual([]);
    expect(unrelated.monthly.stemInteractions).toEqual([]);
  });
});
