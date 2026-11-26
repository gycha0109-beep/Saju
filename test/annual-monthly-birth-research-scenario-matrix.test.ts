import { describe, expect, it } from 'vitest';
import type { BirthInput } from '../src/contracts/calculation.js';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import { buildAnnualMonthlyBirthResearchReading } from '../src/preview/annual-monthly-birth-research-runtime.js';
import { buildTemporalResearchMenuReadings } from '../src/preview/temporal-research-menu-reading.js';
import { GENERAL_ANNUAL_POLICY_SOURCE } from '../src/research/general-annual-reading-candidate.js';

const REFERENCE = '2026-09-03T13:00:00.000Z';
const NOW = new Date(REFERENCE);

function solarBirth(month: number, day: number, known = true): BirthInput {
  return {
    calendarType: 'solar',
    date: { year: 2024, month, day },
    time: known ? { known: true, hour: 12, minute: 0 } : { known: false },
    sexForTraditionalCalculation: 'unspecified',
  };
}

function lunarBirth(
  year: number,
  month: number,
  day: number,
  isLeapMonth: boolean,
  known = true,
): BirthInput {
  return {
    calendarType: 'lunar',
    isLeapMonth,
    date: { year, month, day },
    time: known ? { known: true, hour: 12, minute: 0 } : { known: false },
    sexForTraditionalCalculation: 'unspecified',
  };
}

const SCENARIOS: readonly { id: string; birth: BirthInput }[] = [
  { id: 'solar-known-before-lichun', birth: solarBirth(2, 3) },
  { id: 'solar-known-after-lichun', birth: solarBirth(2, 5) },
  { id: 'solar-unknown-hour', birth: solarBirth(2, 3, false) },
  { id: 'lunar-regular-month-known-hour', birth: lunarBirth(2023, 2, 5, false) },
  { id: 'lunar-leap-month-known-hour', birth: lunarBirth(2023, 2, 5, true) },
  { id: 'lunar-new-year-known-hour', birth: lunarBirth(2024, 1, 1, false) },
  { id: 'solar-equivalent-to-lunar-new-year', birth: solarBirth(2, 10) },
  { id: 'lunar-leap-month-unknown-hour', birth: lunarBirth(2023, 2, 5, true, false) },
];

function read(birth: BirthInput, scenarioId: string) {
  return buildAnnualMonthlyBirthResearchReading(birth, {
    requestId: 'temporal-scenario-matrix-' + scenarioId,
    targetYear: 2026,
    targetMonth: 9,
    referenceDateTime: REFERENCE,
  });
}

function canonical(birth: BirthInput) {
  return calculateCanonicalSajuSnapshot(
    birth,
    PRODUCTION_DEFAULT_CALCULATION_POLICY,
    { now: NOW },
  );
}

describe('annual/monthly temporal scenario and evidence-link matrix', () => {
  it('preserves one canonical chart and complete evidence links across eight actual birth-input scenarios', () => {
    const results = new Map<string, ReturnType<typeof read>>();

    for (const scenario of SCENARIOS) {
      const result = read(scenario.birth, scenario.id);
      const snapshot = canonical(scenario.birth);
      results.set(scenario.id, result);

      expect(result.lifecycle, scenario.id).toBe('internal_research_only');
      expect(result.mayGrantOfficialAuthority, scenario.id).toBe(false);
      expect(result.mayPublish, scenario.id).toBe(false);
      expect(result.maySell, scenario.id).toBe(false);
      expect(result.report.researchOnly, scenario.id).toBe(true);
      expect(result.report.usefulComplete, scenario.id).toBe(false);
      expect(result.report.mayPublish, scenario.id).toBe(false);
      expect(result.report.maySell, scenario.id).toBe(false);

      expect(result.report.snapshotId, scenario.id).toBe(snapshot.snapshotId);
      expect(result.report.calculationHash, scenario.id).toBe(snapshot.calculationHash);
      expect(result.report.monthly.snapshotId, scenario.id).toBe(snapshot.snapshotId);
      expect(result.report.monthly.calculationHash, scenario.id).toBe(snapshot.calculationHash);
      expect(result.report.monthly.targetYear, scenario.id).toBe(2026);
      expect(result.report.monthly.targetMonth, scenario.id).toBe(9);
      expect(result.report.annual.targetYear, scenario.id).toBe(2026);
      expect(result.report.annual.calendarPolicy, scenario.id).toBe('civil_year_only');
      expect(result.report.annualReference.state, scenario.id).toBe('in_target_civil_year');

      expect(result.report.wholeChartGrounding.claimId, scenario.id).toBeTruthy();
      expect(result.report.wholeChartGrounding.evidenceBundleHash, scenario.id).toBeTruthy();
      expect(result.report.natalContext.snapshotId, scenario.id).toBe(snapshot.snapshotId);
      expect(result.report.natalContext.calculationHash, scenario.id).toBe(snapshot.calculationHash);
      expect(result.report.natalContext.availability, scenario.id).toBe(
        result.report.natalContext.sections.length === 0
          ? 'insufficient_evidence'
          : 'bounded_natal_t8_research',
      );
      if (result.report.natalContext.sections.length === 0) {
        expect(
          result.report.temporalNatalComparison.every((comparison) =>
            comparison.natalMatches.length === 0,
          ),
          scenario.id + '/no unsupported natal comparison',
        ).toBe(true);
      }

      for (const section of result.report.natalContext.sections) {
        expect(section.claimId, scenario.id + '/natal claim').toBeTruthy();
        expect(section.ruleId, scenario.id + '/natal rule').toBeTruthy();
        expect(section.methodologyId, scenario.id + '/natal method').toBeTruthy();
        expect(section.sourceIds.length, scenario.id + '/natal source').toBeGreaterThan(0);
        expect(section.factPaths.length, scenario.id + '/natal fact path').toBeGreaterThan(0);
        expect(section.factPaths.length).toBe(section.observedPositions.length);
      }

      expect(result.report.temporalNatalComparison.length, scenario.id).toBe(3);
      for (const comparison of result.report.temporalNatalComparison) {
        expect(comparison.interpretation, scenario.id).toBe('co_observed_only_no_interaction_claim');
        for (const match of comparison.natalMatches) {
          expect(match.claimId, scenario.id + '/comparison claim').toBeTruthy();
          expect(match.ruleId, scenario.id + '/comparison rule').toBeTruthy();
          expect(match.methodologyId, scenario.id + '/comparison method').toBeTruthy();
          expect(match.sourceIds.length, scenario.id + '/comparison source').toBeGreaterThan(0);
          expect(match.matchedFamilyObservations.length, scenario.id + '/matched observations')
            .toBeGreaterThan(0);
          for (const observation of match.matchedFamilyObservations) {
            expect(observation.factPath, scenario.id + '/matched fact path').toBeTruthy();
          }
        }
      }

      // Annual and monthly both consume selected research T9 Claims; neither grants Official authority.
      expect(result.report.annual.sections.length, scenario.id).toBeGreaterThan(0);
      for (const section of result.report.annual.sections) {
        expect(section.evidenceStatus, scenario.id + '/annual evidence').toBe(
          'executed_research_t9_claim_not_official',
        );
        expect(section.claimId, scenario.id + '/annual claim').toBeTruthy();
        expect(section.candidateRuleId, scenario.id + '/annual candidate rule').toBeTruthy();
        expect(section.ruleIds?.length, scenario.id + '/annual rules').toBeGreaterThan(0);
        expect(section.methodologyId, scenario.id + '/annual methodology').toBeTruthy();
        expect(section.sourceIds, scenario.id + '/annual sources').toContain(
          GENERAL_ANNUAL_POLICY_SOURCE.sourceId,
        );
        expect(section.factPaths?.length, scenario.id + '/annual fact paths').toBeGreaterThan(0);
        expect(section.factPaths).toContain('temporal.targetYear');
        if (section.kind === 'core') {
          expect(section.factPaths).toContain('temporal.annualStemTenGod');
        } else {
          expect(section.relatedPillar).toBeDefined();
          expect(section.factPaths).toContain(
            'temporal.annualBranchRelations.' + section.relatedPillar,
          );
        }
      }

      // Monthly T9 sections are executed research Claims with source/rule/method/fact provenance.
      const themeSections = result.report.monthly.sections.filter(section => section.kind === 'theme');
      expect(themeSections.map(section => section.segmentId), scenario.id).toEqual([
        'before_jeol',
        'after_jeol',
      ]);
      expect(result.report.monthly.coverage, scenario.id).toBe('complete');
      for (const section of result.report.monthly.sections) {
        expect(section.claimId, scenario.id + '/monthly claim').toBeTruthy();
        expect(section.ruleIds.length, scenario.id + '/monthly rule').toBeGreaterThan(0);
        expect(section.methodologyId, scenario.id + '/monthly method').toBeTruthy();
        expect(section.sourceIds.length, scenario.id + '/monthly source').toBeGreaterThan(0);
        expect(section.factPaths.length, scenario.id + '/monthly fact path').toBeGreaterThan(0);
        expect(section.calculatedInterval.startsAt, scenario.id + '/monthly interval start').toBeTruthy();
        expect(section.calculatedInterval.endsAt, scenario.id + '/monthly interval end').toBeTruthy();
      }

      const menus = buildTemporalResearchMenuReadings({ annualMonthly: result.report });
      const annualMenu = menus.find(menu => menu.menuId === 'annual');
      const monthlyMenu = menus.find(menu => menu.menuId === 'monthly');
      expect(annualMenu, scenario.id + '/annual menu').toBeDefined();
      expect(monthlyMenu, scenario.id + '/monthly menu').toBeDefined();
      expect(monthlyMenu).toEqual(result.monthlyMenu);
      expect(annualMenu?.provenance.snapshotId).toBe(snapshot.snapshotId);
      expect(annualMenu?.provenance.calculationHash).toBe(snapshot.calculationHash);
      expect(monthlyMenu?.provenance.snapshotId).toBe(snapshot.snapshotId);
      expect(monthlyMenu?.provenance.calculationHash).toBe(snapshot.calculationHash);
      expect(annualMenu?.authority.mayPublish).toBe(false);
      expect(annualMenu?.authority.maySell).toBe(false);
      expect(monthlyMenu?.authority.mayPublish).toBe(false);
      expect(monthlyMenu?.authority.maySell).toBe(false);
      expect(monthlyMenu?.referenceFocus?.state).toBe('in_period');

      const annualSectionsByClaimId = new Map(
        result.report.annual.sections.map(section => [section.claimId, section]),
      );
      for (const section of annualMenu?.sections ?? []) {
        expect(section.evidenceKind).toBe('annual_t9_research_claim');
        expect(section.claimId).toBeTruthy();
        expect(section.candidateRuleId).toBeTruthy();
        expect(section.ruleIds?.length).toBeGreaterThan(0);
        expect(section.methodologyId).toBeTruthy();
        expect(section.sourceIds.length).toBeGreaterThan(0);
        expect(section.factPaths.length).toBeGreaterThan(0);
        const source = annualSectionsByClaimId.get(section.claimId);
        expect(source).toBeDefined();
        expect(section.ruleIds).toEqual(source?.ruleIds);
        expect(section.sourceIds).toEqual(source?.sourceIds);
        expect(section.factPaths).toEqual(source?.factPaths);
      }

      const monthlySectionsByClaimId = new Map(
        (monthlyMenu?.sections ?? []).map(section => [section.claimId, section]),
      );
      for (const section of result.report.monthly.sections) {
        const projected = monthlySectionsByClaimId.get(section.claimId);
        expect(projected, scenario.id + '/monthly menu Claim projection').toBeDefined();
        expect(projected?.evidenceKind).toBe('monthly_t9_research_claim');
        expect(projected?.ruleIds).toEqual(section.ruleIds);
        expect(projected?.methodologyId).toBe(section.methodologyId);
        expect(projected?.sourceIds).toEqual(section.sourceIds);
        expect(projected?.factPaths).toEqual(section.factPaths);
      }

      expect(result.report.monthly.referenceReading.state, scenario.id).toBe('in_period');
      expect(result.monthlyMenu.referenceFocus?.currentSection?.claimId, scenario.id)
        .toBe(result.report.monthly.referenceReading.theme?.claimId);

      if (scenario.id.includes('unknown-hour')) {
        expect(result.report.annual.unavailablePillars, scenario.id).toContain('hour');
        expect(result.report.monthly.sections.some(section => section.relatedPillar === 'hour'))
          .toBe(false);
        expect(result.report.monthly.missing.join(' ')).toContain('시주');
      }
    }
  }, 120000);

  it('does not alias a regular lunar month with its leap month and preserves the lunar new-year solar equivalent', () => {
    const regular = read(lunarBirth(2023, 2, 5, false), 'lunar-regular');
    const leap = read(lunarBirth(2023, 2, 5, true), 'lunar-leap');
    expect(regular.report.snapshotId).not.toBe(leap.report.snapshotId);
    expect(regular.report.calculationHash).not.toBe(leap.report.calculationHash);

    const lunarNewYear = canonical(lunarBirth(2024, 1, 1, false));
    const solarEquivalent = canonical(solarBirth(2, 10));
    expect(lunarNewYear.normalized.solarDate).toEqual(solarEquivalent.normalized.solarDate);
  }, 30000);
});
