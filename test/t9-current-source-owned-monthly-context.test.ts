import { describe, expect, it } from 'vitest';
import type { BirthInput } from '../src/contracts/calculation.js';
import { buildAnnualMonthlyBirthResearchReading } from
  '../src/preview/annual-monthly-birth-research-runtime.js';
import { buildThreeTemporalMenusBirthReading } from
  '../src/preview/three-temporal-menus-birth-reading.js';
import {
  buildT9CurrentSourceOwnedMonthlyContext,
  renderT9CurrentSourceOwnedMonthlyContext,
} from '../src/preview/t9-current-source-owned-monthly-context.js';

const TIME = '2026-09-03T13:00:00.000Z';
const birth = (year: number, month: number, day: number, hour: number): BirthInput => ({
  calendarType: 'solar',
  date: { year, month, day },
  time: { known: true, hour, minute: 30 },
  sexForTraditionalCalculation: 'male',
});
const PERSON_WITH_CLASH = birth(1986, 12, 8, 19);
const PERSON_NO_CLASH = birth(1996, 1, 9, 9);
const target = (referenceDateTime: string = TIME, targetMonth = 9) => ({
  requestId: 't9-current-original-claim-comparison',
  targetYear: 2026, targetMonth, referenceDateTime,
});
const read = (b: BirthInput, at = TIME, month = 9) =>
  buildAnnualMonthlyBirthResearchReading(b, target(at, month));

describe('selected real monthly T9 source Claims by actual instant and Jeol segment', () => {
  it('presents one selected original T9 theme and the separate natal year clash without manufacturing synthesis', () => {
    const output = read(PERSON_WITH_CLASH);
    const context = output.monthlyMenu.currentT9SourceContext!;
    const source = output.report.monthly.referenceReading.theme!;
    expect(context).toBeDefined();
    expect(context.snapshotId).toBe(output.report.snapshotId);
    expect(context.calculationHash).toBe(output.report.calculationHash);
    expect(context.sourceTheme.claimId).toBe(source.claimId);
    expect(context.sourceTheme.methodologyId).toBe(source.methodologyId);
    expect(context.sourceTheme.sourceIds).toEqual(source.sourceIds);
    expect(context.sourceTheme.factPaths).toEqual(source.factPaths);
    expect(context.sourceTensions).toHaveLength(1);
    const tension = context.sourceTensions[0]!;
    const original = output.report.monthly.sections.find(section =>
      section.kind === 'tension' && section.claimId === tension.claimId)!;
    expect(original).toBeDefined();
    expect(tension.natalPillar).toBe('year');
    expect(tension.sourceIds).toEqual(original.sourceIds);
    expect(tension.ruleIds).toEqual(original.ruleIds);
    expect(tension.factPaths).toEqual(original.factPaths);
    expect(tension.text).toBe(original.text);
    expect(context.referenceDateTime).toBe(TIME);
    expect(Date.parse(context.startsAt)).toBeLessThanOrEqual(Date.parse(TIME));
    expect(Date.parse(context.endsAtExclusive)).toBeGreaterThan(Date.parse(TIME));
    expect(context.compositeOutcomeInferred).toBe(false);
    expect(context.newT9ClaimsEmitted).toBe(0);
    expect(context.mayPublish).toBe(false);
    expect(context.maySell).toBe(false);
    const rendered = renderT9CurrentSourceOwnedMonthlyContext(context);
    expect(rendered).toContain(source.text);
    expect(rendered).toContain(original.text);
    expect(rendered).toContain(original.claimId);
    expect(rendered).toContain('동시');
    expect(output.html).toContain(rendered);
    const allMenus = buildThreeTemporalMenusBirthReading(PERSON_WITH_CLASH, target());
    expect(allMenus.html).toContain(rendered);
    expect(allMenus.annualMonthly.monthlyMenu.currentT9SourceContext).toEqual(context);
    expect(allMenus.mayGrantOfficialAuthority).toBe(false);
  });

  it('does not turn absence of selected T9 clash into good luck or a missing period', () => {
    const result = read(PERSON_NO_CLASH);
    const current = result.monthlyMenu.currentT9SourceContext!;
    expect(current).toBeDefined();
    expect(current.sourceTensions).toHaveLength(0);
    const html = renderT9CurrentSourceOwnedMonthlyContext(current);
    expect(html).toContain('별도의 T9 지지 충 Claim은 없습니다');
    expect(html).toContain('좋은 운이라는 뜻이 아닙니다');
    expect(result.monthlyMenu.availability).toBe('partial');
    expect(result.monthlyMenu.authority.mayMarkMenuAvailable).toBe(false);
  });

  it('selects changed source-owned theme and clash evidence across exact Jeol instant with no cross-period borrowing', () => {
    const first = read(PERSON_WITH_CLASH);
    const jeol = Date.parse(first.report.monthly.jeolBoundary.at);
    const before = read(PERSON_WITH_CLASH, new Date(jeol - 1000).toISOString());
    const after = read(PERSON_WITH_CLASH, new Date(jeol).toISOString());
    const lhs = before.monthlyMenu.currentT9SourceContext!;
    const rhs = after.monthlyMenu.currentT9SourceContext!;
    expect(lhs.segmentId).toBe('before_jeol');
    expect(rhs.segmentId).toBe('after_jeol');
    expect(lhs.sourceTheme.claimId).not.toBe(rhs.sourceTheme.claimId);
    expect(lhs.endsAtExclusive).toBe(rhs.startsAt);
    for (const [result, current] of [[before, lhs], [after, rhs]] as const) {
      expect(result.monthlyMenu.referenceFocus?.currentSection?.claimId)
        .toBe(current.sourceTheme.claimId);
      expect(result.html).toContain(renderT9CurrentSourceOwnedMonthlyContext(current));
      expect(current.sourceTensions.every(item =>
        result.report.monthly.sections.some(section =>
          section.kind === 'tension' && section.claimId === item.claimId &&
          section.segmentId === current.segmentId))).toBe(true);
      expect(current.crossPeriodInheritance).toBe(false);
      expect(current.newT9ClaimsEmitted).toBe(0);
    }
    expect(lhs.referenceDateTime).not.toBe(rhs.referenceDateTime);
  });

  it('does not provide a current T9 bundle for a month outside the reference instant', () => {
    const comparison = read(PERSON_WITH_CLASH, TIME, 10);
    expect(comparison.report.monthly.referenceReading.state).toBe('outside_target_month');
    expect(comparison.monthlyMenu.currentT9SourceContext).toBeUndefined();
    expect(buildT9CurrentSourceOwnedMonthlyContext(comparison.report)).toBeUndefined();
    expect(comparison.html).not.toContain('id="t9-current-source-context"');
    const three = buildThreeTemporalMenusBirthReading(PERSON_WITH_CLASH, target(TIME, 10));
    expect(three.html).not.toContain('id="t9-current-source-context"');
  });

  it('rejects other period sources, forged clash paths and promoted publication rights', () => {
    const original = read(PERSON_WITH_CLASH);
    const report = original.report;
    const link = report.t9EvidenceLinks.referenceEvidenceFocus.activeLink!;
    expect(() => buildT9CurrentSourceOwnedMonthlyContext({
      ...report, t9EvidenceLinks: {
        ...report.t9EvidenceLinks, referenceEvidenceFocus: {
          ...report.t9EvidenceLinks.referenceEvidenceFocus,
          activeLink: { ...link, existingT9ClaimId: 'FORGED-UNRELATED' },
        },
      },
    })).toThrow('same issued Claim');
    const originalTension = report.monthly.sections.find(s => s.kind === 'tension')!;
    expect(originalTension).toBeDefined();
    expect(() => buildT9CurrentSourceOwnedMonthlyContext({
      ...report, monthly: {
        ...report.monthly,
        sections: report.monthly.sections.map(s => s.claimId === originalTension.claimId
          ? { ...s, factPaths: ['unrelated.person.birth'] } : s),
      },
    })).toThrow('independently issued Claim');
    expect(() => renderT9CurrentSourceOwnedMonthlyContext({
      ...original.monthlyMenu.currentT9SourceContext!, mayPublish: true,
    } as unknown as NonNullable<typeof original.monthlyMenu.currentT9SourceContext>))
      .toThrow('cannot promote T9 observation');
  });
});
