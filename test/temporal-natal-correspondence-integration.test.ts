import { describe, expect, it } from 'vitest';
import type { BirthInput } from '../src/contracts/calculation.js';
import { buildAnnualMonthlyBirthResearchReading } from '../src/preview/annual-monthly-birth-research-runtime.js';
import { buildTemporalResearchMenuReadings } from '../src/preview/temporal-research-menu-reading.js';

const birth = (year: number, month: number, day: number): BirthInput => ({
  calendarType: 'solar',
  date: { year, month, day },
  time: { known: true, hour: 12, minute: 30 },
  sexForTraditionalCalculation: 'unspecified',
});
function reading(input: BirthInput) {
  return buildAnnualMonthlyBirthResearchReading(input, {
    requestId: 'saju-temporal-natal-context-integration',
    targetYear: 2026,
    targetMonth: 10,
    referenceDateTime: '2026-10-25T00:00:00.000Z',
  });
}

describe('selected T9 plus independent same-chart natal T8 contextual grounding', () => {
  it('executes annual research T9 rules and carries selected sources to every displayed section', () => {
    for (const chart of [birth(1964, 11, 14), birth(1995, 2, 28)]) {
      const result = reading(chart);
      expect(result.report.annual.sections.length).toBeGreaterThan(0);
      for (const section of result.report.annual.sections) {
        expect(section.evidenceStatus).toBe('executed_research_claim_not_official');
        expect(section.claimId).toBeTruthy();
        expect(section.ruleIds?.length).toBeGreaterThan(0);
        expect(section.sourceIds).toContain(section.policySourceId);
        expect(section.calculationFactPaths.length).toBeGreaterThan(0);
      }
      expect(result.report.annual.permissions.mayPublish).toBe(false);
      expect(result.report.monthly.maySell).toBe(false);
    }
  });

  it('links only exact selected time themes to source-qualified natal context without making predictions', () => {
    const samples = [
      birth(1964, 11, 14), birth(1995, 2, 28),
      birth(1971, 2, 24), birth(1996, 1, 9),
      birth(1965, 8, 5), birth(1986, 11, 9),
    ];
    let witnessed = 0;
    for (const chart of samples) {
      const { report, html } = reading(chart);
      const yearThemeIds = new Set(report.annual.sections
        .filter(section => section.kind === 'core').map(section => section.claimId));
      const monthThemeIds = new Set(report.monthly.sections
        .filter(section => section.kind === 'theme').map(section => section.claimId));
      for (const [relations, ids] of [
        [report.annual.natalCorrespondences ?? [], yearThemeIds],
        [report.monthly.natalCorrespondences ?? [], monthThemeIds],
      ] as const) {
        for (const relation of relations) {
          witnessed++;
          expect(ids.has(relation.temporalClaimId)).toBe(true);
          expect(relation.authority).toBe('observed_natal_context_not_temporal_outcome');
          expect(relation.temporalSourceIds.length).toBeGreaterThan(0);
          expect(relation.temporalFactPaths.length).toBeGreaterThan(0);
          expect(relation.natalSourceIds.length).toBeGreaterThan(0);
          expect(relation.natalFactPaths.length).toBeGreaterThan(0);
          expect(relation.natalRuleId).toBeTruthy();
          expect(relation.limitation).toContain('새로운 운세 판정');
          expect(html).toContain(relation.natalHeadline);
        }
      }
      expect(report.mayPublish).toBe(false);
      expect(report.maySell).toBe(false);
    }
    expect(witnessed).toBeGreaterThan(0);
  });

  it('distinguishes actual natal structures while the annual theme is identical', () => {
    const first = reading({
      ...birth(1971, 2, 24), time: { known: true, hour: 21, minute: 59 },
    }).report.annual;
    const second = reading({
      ...birth(1992, 10, 21), time: { known: true, hour: 11, minute: 8 },
    }).report.annual;
    expect(first.annualStemTenGod).toBe(second.annualStemTenGod);
    expect(first.sections.filter(x => x.kind === 'core').map(x => x.title))
      .toEqual(second.sections.filter(x => x.kind === 'core').map(x => x.title));
    expect(first.natalCorrespondences?.length).toBeGreaterThan(0);
    expect(second.natalCorrespondences?.length).toBeGreaterThan(0);
    expect(first.natalCorrespondences?.[0]?.natalPattern)
      .not.toBe(second.natalCorrespondences?.[0]?.natalPattern);
  });

  it('delivers selected T9 and separately traced T8 context to the actual time-menu consumer', () => {
    const result = buildAnnualMonthlyBirthResearchReading({
      ...birth(1971, 2, 24), time: { known: true, hour: 21, minute: 59 },
    }, {
      requestId: 'exact-annual-monthly-menu-projection',
      targetYear: 2026, targetMonth: 10,
      referenceDateTime: '2026-10-25T00:00:00.000Z',
    });
    const annual = buildTemporalResearchMenuReadings({ annualMonthly: result.report })[0]!;
    const monthly = result.monthlyMenu;
    expect(annual.sections.every(section => section.claimId &&
      section.sourceIds.length > 0 && section.factPaths.length > 0)).toBe(true);
    for (const [menu, sourceRelations] of [
      [annual, result.report.annual.natalCorrespondences ?? []],
      [monthly, result.report.monthly.natalCorrespondences ?? []],
    ] as const) {
      expect(menu.natalContextSections?.length ?? 0).toBe(sourceRelations.length);
      for (const context of menu.natalContextSections ?? []) {
        const original = sourceRelations.find(item =>
          item.temporalClaimId === context.relatedTemporalClaimId &&
          item.natalClaimType === context.natalClaimType &&
          item.natalRuleId === context.natalRuleId);
        expect(original).toBeDefined();
        expect(context.evidenceKind).toBe('selected_natal_t8_context');
        expect(context.sourceIds).toEqual(original?.natalSourceIds);
        expect(context.temporalSourceIds).toEqual(original?.temporalSourceIds);
        expect(context.temporalFactPaths).toEqual(original?.temporalFactPaths);
        expect(context.limitation).toContain('새로운 운세 판정');
      }
      expect(menu.authority.mayCallOfficial).toBe(false);
      expect(menu.authority.maySell).toBe(false);
    }
    const focus = monthly.referenceFocus;
    expect(focus?.state).toBe('in_period');
    expect(focus?.natalContextSections?.every(section =>
      section.relatedTemporalClaimId === focus.currentSection?.claimId)).toBe(true);
  });

  it('rejects unrelated source references as time-menu natal evidence', () => {
    const result = reading(birth(1971, 2, 24)).report;
    const known = result.annual.natalCorrespondences?.[0];
    if (!known) return;
    const fake = { ...known, temporalClaimId: 'UNSELECTED-T9' };
    expect(() => buildTemporalResearchMenuReadings({
      annualMonthly: {
        ...result,
        annual: { ...result.annual, natalCorrespondences: [fake] },
      },
    })).toThrow('unselected or ungrounded');
  });

  it('does not upgrade unknown birth hour into an invented complete natal context', () => {
    const unknown: BirthInput = { ...birth(1996, 1, 9), time: { known: false } };
    const report = reading(unknown).report;
    expect(report.annual.natalCorrespondences).toEqual([]);
    expect(report.monthly.natalCorrespondences).toEqual([]);
    expect(report.annual.permissions.mayAutoPromoteResearch).toBe(false);
  });
});
