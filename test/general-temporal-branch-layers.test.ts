import { describe, expect, it } from 'vitest';
import type { BirthInput } from '../src/contracts/calculation.js';
import { buildThreeTemporalMenusBirthReading } from '../src/preview/three-temporal-menus-birth-reading.js';
import { effectiveAnnualPillar } from '../src/reading/research-temporal-branch-layers.js';

const target = {
  requestId: 'branch-layer-fixture',
  targetYear: 2026,
  targetMonth: 10,
  referenceDateTime: '2026-10-25T00:00:00.000Z',
};
const annualBirth: BirthInput = {
  calendarType: 'solar',
  date: { year: 1973, month: 7, day: 10 },
  time: { known: true, hour: 17, minute: 42 },
  sexForTraditionalCalculation: 'male',
};
const monthlyBirth: BirthInput = {
  calendarType: 'solar',
  date: { year: 1957, month: 5, day: 8 },
  time: { known: true, hour: 13, minute: 47 },
  sexForTraditionalCalculation: 'male',
};

describe('request-scoped branch interactions in the current Korean temporal readers', () => {
  it('reads exact coexisting contacts from the annual and Dayun layers without assigning precedence', () => {
    const reading = buildThreeTemporalMenusBirthReading(annualBirth, target);
    const { annual } = reading.annualMonthly.report;
    expect(annual.branchLayers.map((item) => [item.slot, item.state])).toEqual([
      ['month', 'mixed'],
      ['day', 'mixed'],
    ]);
    for (const item of annual.branchLayers) {
      expect(item.effectiveYear).toBe(2026);
      expect(item.startsAt).toBe(target.referenceDateTime);
      expect(item.claimId).not.toBe(item.periodClaimId);
      expect(item.factPaths).toContain('temporal.branchLayers.annual');
      expect(item.sourceIds).toContain('SRC-JAPYEONG-JINJEON-BRANCH-LAYERS');
      expect(item.text).toContain('어느 쪽이 우세한지 판정은 보류합니다.');
      expect(reading.html).toContain(item.text);
    }
    expect(reading.mayGrantOfficialAuthority).toBe(false);
    expect(buildThreeTemporalMenusBirthReading(annualBirth, target)).toEqual(reading);
  });

  it('uses different monthly contacts on the actual Jeol boundary', () => {
    const read = (referenceDateTime: string) =>
      buildThreeTemporalMenusBirthReading(monthlyBirth, { ...target, referenceDateTime })
        .annualMonthly;
    const current = read(target.referenceDateTime);
    const boundary = current.report.monthly.jeolBoundary.at;
    const previous = read(new Date(Date.parse(boundary) - 1).toISOString());
    const exact = read(boundary);
    const before = previous.monthlyMenu.referenceFocus?.currentSection?.branchLayers;
    const after = exact.monthlyMenu.referenceFocus?.currentSection?.branchLayers;
    expect(before).toEqual([
      expect.objectContaining({ period: 'before_jeol', state: 'mixed', endsAt: boundary }),
    ]);
    expect(after).toEqual([
      expect.objectContaining({ period: 'after_jeol', state: 'aligned_clash', startsAt: boundary }),
    ]);
    expect(after?.[0]?.text).toContain('대운은');
    expect(after?.[0]?.text).toContain('월운은');
    expect(after?.[0]?.text).not.toBe(before?.[0]?.text);
  });

  it('keeps the Seoul civil target and the active sexagenary year distinct at Li Chun', () => {
    const lichun = effectiveAnnualPillar(2026, '2026-01-01T00:00:00.000Z').lichun;
    const read = (referenceDateTime: string) =>
      buildThreeTemporalMenusBirthReading(annualBirth, {
        ...target,
        targetMonth: 2,
        referenceDateTime,
      }).annualMonthly.report;
    const before = read(new Date(Date.parse(lichun) - 1).toISOString());
    const after = read(lichun);
    expect(before.annual.targetYear).toBe(2026);
    expect(before.annualEffectivePillar).toMatchObject({
      effectiveYear: 2025,
      stem: '을',
      branch: '사',
    });
    expect(after.annualEffectivePillar).toMatchObject({
      effectiveYear: 2026,
      stem: '병',
      branch: '오',
    });
    expect(after.monthly.jeolBoundary.at).toBe(lichun);
    expect(after.monthly.referenceReading.segmentId).toBe('after_jeol');
    const unknown = buildThreeTemporalMenusBirthReading(
      { ...annualBirth, time: { known: false } },
      target,
    );
    expect(unknown.annualMonthly.report.annual.branchLayers).toEqual([]);
    expect(unknown.annualMonthly.report.monthly.branchLayers).toEqual([]);
    expect(unknown.annualMonthly.report.monthly.sections.length).toBeGreaterThan(0);
  });
});
