import { describe, expect, it } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import { createCareerMultifactorResearchRegistry } from '../src/research/career-natal-multifactor-candidate.js';
import { buildCareerMultifactorResearchReport } from '../src/preview/career-natal-multifactor-report.js';
import { createGeneralNatalMultifactorRegistry } from '../src/research/general-natal-multifactor-candidate.js';
import { buildGeneralNatalMultifactorReport } from '../src/preview/general-natal-multifactor-report.js';
import { createWealthNatalMultifactorRegistry } from '../src/research/wealth-natal-multifactor-candidate.js';
import { buildWealthNatalMultifactorReport } from '../src/preview/wealth-natal-multifactor-report.js';
import { createBusinessNatalMultifactorRegistry } from '../src/research/business-natal-multifactor-candidate.js';
import { buildBusinessNatalMultifactorReport } from '../src/preview/business-natal-multifactor-report.js';
import { createRelationshipNatalMultifactorRegistry } from '../src/research/relationship-natal-multifactor-candidate.js';
import { buildRelationshipNatalMultifactorReport } from '../src/preview/relationship-natal-multifactor-report.js';

const NOW = new Date('2026-10-19T00:00:00.000Z');
const careerRegistry = createCareerMultifactorResearchRegistry();
const generalRegistry = createGeneralNatalMultifactorRegistry();
const wealthRegistry = createWealthNatalMultifactorRegistry();
const businessRegistry = createBusinessNatalMultifactorRegistry();
const relationshipRegistry = createRelationshipNatalMultifactorRegistry();

function chart(month: number, day: number, birthTimeKnown = true) {
  return calculateCanonicalSajuSnapshot(
    {
      calendarType: 'solar',
      date: { year: 2024, month, day },
      time: birthTimeKnown
        ? ({ known: true, hour: 12, minute: 0 } as const)
        : ({ known: false } as const),
      sexForTraditionalCalculation: 'unspecified',
    },
    PRODUCTION_DEFAULT_CALCULATION_POLICY,
    { now: NOW },
  );
}
type Domain = 'general' | 'career' | 'wealth' | 'business' | 'relationship';
type InterpretationResult = ReturnType<typeof runInterpretation>;
function five(
  snapshot: ReturnType<typeof chart>,
  capture?: (domain: Domain, execution: InterpretationResult) => void,
) {
  const careerExecution = runInterpretation(snapshot, careerRegistry, { now: NOW });
  capture?.('career', careerExecution);
  const career = buildCareerMultifactorResearchReport(snapshot, careerExecution, careerRegistry);

  const generalExecution = runInterpretation(snapshot, generalRegistry, { now: NOW });
  capture?.('general', generalExecution);
  const general = buildGeneralNatalMultifactorReport(snapshot, generalExecution, generalRegistry);

  const wealthExecution = runInterpretation(snapshot, wealthRegistry, { now: NOW });
  capture?.('wealth', wealthExecution);
  const wealth = buildWealthNatalMultifactorReport(snapshot, wealthExecution, wealthRegistry);

  const businessExecution = runInterpretation(snapshot, businessRegistry, { now: NOW });
  capture?.('business', businessExecution);
  const business = buildBusinessNatalMultifactorReport(
    snapshot,
    businessExecution,
    businessRegistry,
  );

  const relationshipExecution = runInterpretation(snapshot, relationshipRegistry, { now: NOW });
  capture?.('relationship', relationshipExecution);
  const relationship = buildRelationshipNatalMultifactorReport(
    snapshot,
    relationshipExecution,
    relationshipRegistry,
  );
  return { career, general, wealth, business, relationship };
}
type Five = ReturnType<typeof five>;
const DOMAINS: readonly Domain[] = ['general', 'career', 'wealth', 'business', 'relationship'];
function signatures(reports: Five) {
  return Object.fromEntries(
    DOMAINS.map((domain) => [
      domain,
      reports[domain].sections
        .map((s) => `${s.pattern}:${s.axis}`)
        .sort()
        .join('|'),
    ]),
  ) as Record<Domain, string>;
}

describe('five-domain actual-chart semantic differentiation / S6 research matrix', () => {
  it('runs 30 different calculated natal snapshots and records at least 10 truly different semantic pairs per domain', () => {
    const samples: { hash: string; meanings: Record<Domain, string> }[] = [];
    const completeCounts = Object.fromEntries(DOMAINS.map((d) => [d, 0])) as Record<Domain, number>;
    for (const month of [2, 3, 4, 5, 6, 7])
      for (const day of [3, 7, 11, 17, 23]) {
        const snapshot = chart(month, day);
        const reports = five(snapshot);
        const meanings = signatures(reports);
        for (const domain of DOMAINS) {
          const report = reports[domain];
          expect(report.calculationHash).toBe(snapshot.calculationHash);
          expect(report.snapshotId).toBe(snapshot.snapshotId);
          expect(report.researchOnly).toBe(true);
          expect(report.mayPublish).toBe(false);
          expect(report.maySell).toBe(false);
          expect(report.usefulComplete).toBe(false);
          expect(['complete', 'partial', 'insufficient']).toContain(report.state);
          if (report.state === 'complete') {
            expect(report.sections.length).toBeGreaterThanOrEqual(domain === 'career' ? 1 : 3);
            expect(new Set(report.sections.map((s) => s.axis)).size).toBe(report.sections.length);
            // A complete research MUR must add a genuinely new calculated
            // observation with each supporting axis. This is stronger than
            // requiring old, potentially inflated complete-count growth.
            const paths = report.sections.map((section) =>
              'observedFactPaths' in section
                ? section.observedFactPaths
                : section.calculatedFactPaths,
            );
            const previouslyUsed = new Set(paths[0] ?? []);
            for (const supportPaths of paths.slice(1)) {
              const newlyObserved = supportPaths.filter((path) => !previouslyUsed.has(path));
              expect(
                newlyObserved.length,
                domain + ': repeated chart fact is not independent',
              ).toBeGreaterThan(0);
              supportPaths.forEach((path) => previouslyUsed.add(path));
            }
            completeCounts[domain]++;
          } else {
            expect(report.missing.length).toBeGreaterThan(0);
          }
          if ((domain === 'general' || domain === 'wealth') && report.sections.length < 3) {
            const missingSupportingAxes = 2 - Math.max(0, report.sections.length - 1);
            expect(report.missing).toContain(
              `중심 결론과 구별되는 추가 구조 축 ${missingSupportingAxes}개 부족`,
            );
          }
          for (const section of report.sections) {
            expect(section.paragraph.length).toBeGreaterThan(40);
            expect(section.headline.length).toBeGreaterThan(3);
            expect(section.upstreamClaimIds.length).toBeGreaterThanOrEqual(2);
            expect(section.sourceIds.length).toBeGreaterThan(0);
            expect(section.ruleId).toBeTruthy();
          }
        }
        samples.push({ hash: snapshot.calculationHash, meanings });
      }
    expect(samples).toHaveLength(30);
    expect(new Set(samples.map((x) => x.hash)).size).toBe(30);
    const differentiatedPairs = Object.fromEntries(DOMAINS.map((d) => [d, 0])) as Record<
      Domain,
      number
    >;
    for (let i = 0; i < samples.length; i++)
      for (let j = i + 1; j < samples.length; j++) {
        const a = samples[i]!,
          b = samples[j]!;
        for (const domain of DOMAINS) {
          const left = a.meanings[domain],
            right = b.meanings[domain];
          if (left.length && right.length && left !== right) differentiatedPairs[domain]++;
        }
      }
    for (const domain of DOMAINS) {
      expect(differentiatedPairs[domain]).toBeGreaterThanOrEqual(10);
    }
    // The historical 4/30 and 7/30 display-count baselines do NOT require
    // monotonic growth when an inflated "complete" is correctly downgraded.
    // Every remaining complete above is proven by incremental T0 evidence,
    // while the minimum actual-chart coverage must not disappear.
    expect(completeCounts.business).toBeGreaterThanOrEqual(4);
    expect(completeCounts.relationship).toBeGreaterThanOrEqual(7);
    // CI-readable evidence: counted T8 pattern+axis differences, not mere pillar labels or wording.
    console.info(
      'S6 semantic 30-chart matrix',
      JSON.stringify({
        cases: samples.length,
        differentiatedPairs,
        completeCounts,
        researchOnly: true,
        mayPublish: false,
        maySell: false,
        usefulComplete: false,
      }),
    );
  }, 180000);

  it('keeps same-input reading deterministic and five-domain source authority unchanged', () => {
    const snapshot = chart(3, 10);
    const once = five(snapshot);
    const again = five(snapshot);
    expect(once).toEqual(again);
    for (const domain of DOMAINS) {
      expect(once[domain].calculationHash).toBe(snapshot.calculationHash);
    }
    const heads = DOMAINS.flatMap((domain) => once[domain].sections.map((s) => s.headline));
    expect(heads.length).toBeGreaterThan(0);
    expect(new Set(heads).size).toBe(heads.length);
  }, 30000);

  it('keeps unknown-hour natal inputs below complete MUR while preserving sourced partial sections', () => {
    for (const [month, day] of [
      [2, 3],
      [3, 10],
    ] as const) {
      const snapshot = chart(month, day, false);
      const reports = five(snapshot);
      for (const domain of DOMAINS) {
        expect(reports[domain].state).not.toBe('complete');
        expect(reports[domain].sections.length).toBeLessThan(3);
        expect(reports[domain].missing.length).toBeGreaterThan(0);
        for (const section of reports[domain].sections) {
          expect(section.sourceIds.length).toBeGreaterThan(0);
          expect(section.upstreamClaimIds.length).toBeGreaterThanOrEqual(2);
        }
        expect(reports[domain].mayPublish).toBe(false);
        expect(reports[domain].maySell).toBe(false);
        expect(reports[domain].usefulComplete).toBe(false);
      }
    }
  }, 30000);

  it('preserves actual lunar, leap-month and solar-term inputs without inventing meaning or publication authority', () => {
    const lunar = (year: number, month: number, day: number, isLeapMonth: boolean, known = true) =>
      calculateCanonicalSajuSnapshot(
        {
          calendarType: 'lunar',
          isLeapMonth,
          date: { year, month, day },
          time: known
            ? ({ known: true, hour: 12, minute: 0 } as const)
            : ({ known: false } as const),
          sexForTraditionalCalculation: 'unspecified',
        },
        PRODUCTION_DEFAULT_CALCULATION_POLICY,
        { now: NOW },
      );
    // 2023 contains a real intercalary second lunar month; leap and regular dates
    // must not silently alias. 2024-01-01 lunar corresponds to 2024-02-10 solar.
    const regularSecondMonth = lunar(2023, 2, 5, false);
    const leapSecondMonth = lunar(2023, 2, 5, true);
    const lunarNewYear = lunar(2024, 1, 1, false);
    const solarNewYear = chart(2, 10);
    expect(regularSecondMonth.normalized.solarDate).not.toEqual(
      leapSecondMonth.normalized.solarDate,
    );
    expect(lunarNewYear.normalized.solarDate).toEqual(solarNewYear.normalized.solarDate);
    const cases = [
      regularSecondMonth,
      leapSecondMonth,
      lunarNewYear,
      solarNewYear,
      chart(2, 3),
      chart(2, 5),
    ]; // nearby dates across 2024 입춘
    for (const snapshot of cases) {
      const reports = five(snapshot);
      for (const domain of DOMAINS) {
        const report = reports[domain];
        expect(report.calculationHash).toBe(snapshot.calculationHash);
        expect(report.snapshotId).toBe(snapshot.snapshotId);
        expect(report.researchOnly).toBe(true);
        expect(report.mayPublish).toBe(false);
        expect(report.maySell).toBe(false);
        expect(report.usefulComplete).toBe(false);
        expect(['complete', 'partial', 'insufficient']).toContain(report.state);
        if (report.state !== 'complete') expect(report.missing.length).toBeGreaterThan(0);
        for (const section of report.sections) {
          expect(section.sourceIds.length).toBeGreaterThan(0);
          expect(section.upstreamClaimIds.length).toBeGreaterThanOrEqual(2);
        }
      }
    }
    const lunarUnknownHour = lunar(2023, 2, 5, true, false);
    for (const domain of DOMAINS) {
      const report = five(lunarUnknownHour)[domain];
      expect(report.state).not.toBe('complete');
      expect(report.sections.length).toBeLessThan(3);
      expect(report.missing.length).toBeGreaterThan(0);
    }
  }, 60000);

  it('audits existing research MUR and source links across real birth-input scenarios', () => {
    const lunar = (
      year: number,
      month: number,
      day: number,
      isLeapMonth: boolean,
      birthTimeKnown = true,
    ) =>
      calculateCanonicalSajuSnapshot(
        {
          calendarType: 'lunar',
          isLeapMonth,
          date: { year, month, day },
          time: birthTimeKnown
            ? ({ known: true, hour: 12, minute: 0 } as const)
            : ({ known: false } as const),
          sexForTraditionalCalculation: 'unspecified',
        },
        PRODUCTION_DEFAULT_CALCULATION_POLICY,
        { now: NOW },
      );

    const scenarios = [
      { id: 'solar-known-before-lichun', snapshot: chart(2, 3) },
      { id: 'solar-known-after-lichun', snapshot: chart(2, 5) },
      { id: 'solar-unknown-hour', snapshot: chart(2, 3, false) },
      { id: 'lunar-regular-month-known-hour', snapshot: lunar(2023, 2, 5, false) },
      { id: 'lunar-leap-month-known-hour', snapshot: lunar(2023, 2, 5, true) },
      { id: 'lunar-new-year-known-hour', snapshot: lunar(2024, 1, 1, false) },
      { id: 'solar-equivalent-to-lunar-new-year', snapshot: chart(2, 10) },
      { id: 'lunar-leap-month-unknown-hour', snapshot: lunar(2023, 2, 5, true, false) },
    ] as const;

    const audit: Record<string, Record<string, unknown>> = {};
    for (const scenario of scenarios) {
      const executions = {} as Record<Domain, InterpretationResult>;
      const reports = five(scenario.snapshot, (domain, execution) => {
        executions[domain] = execution;
      });
      const domainAudit: Record<string, unknown> = {};
      for (const domain of DOMAINS) {
        const report = reports[domain];
        expect(report.snapshotId).toBe(scenario.snapshot.snapshotId);
        expect(report.calculationHash).toBe(scenario.snapshot.calculationHash);
        expect(report.researchOnly).toBe(true);
        expect(report.mayPublish).toBe(false);
        expect(report.maySell).toBe(false);
        expect(report.usefulComplete).toBe(false);
        expect(['complete', 'partial', 'insufficient']).toContain(report.state);
        if (report.state !== 'complete') {
          expect(report.missing.length).toBeGreaterThan(0);
        }

        const graphSections = [
          ...report.sections,
          ...('additionalVerifiedSections' in report ? report.additionalVerifiedSections : []),
        ];
        for (const section of graphSections) {
          expect(
            section.sourceIds.length,
            scenario.id + '/' + domain + ': source link',
          ).toBeGreaterThan(0);
          expect(
            section.upstreamClaimIds.length,
            scenario.id + '/' + domain + ': upstream links',
          ).toBeGreaterThanOrEqual(2);
          expect(new Set(section.upstreamClaimIds).size).toBe(section.upstreamClaimIds.length);
          expect(section.ruleId, scenario.id + '/' + domain + ': rule link').toBeTruthy();
          const paths =
            'observedFactPaths' in section
              ? section.observedFactPaths
              : section.calculatedFactPaths;
          expect(
            paths.length,
            scenario.id + '/' + domain + ': calculated fact paths',
          ).toBeGreaterThan(0);

          const execution = executions[domain];
          const emittedClaim = execution.claims.find(
            (claim) =>
              claim.claimType === section.claimType &&
              claim.taxonomy.tier === 'T8' &&
              claim.state === 'active',
          );
          expect(emittedClaim, scenario.id + '/' + domain + ': active T8 claim').toBeDefined();
          expect(emittedClaim?.snapshotId).toBe(scenario.snapshot.snapshotId);
          expect(emittedClaim?.methodologyRef.id).toBeTruthy();
          expect(emittedClaim?.ruleRefs.map((ref) => ref.ruleId)).toContain(section.ruleId);
          expect(emittedClaim?.sourceRefs).toEqual(expect.arrayContaining([...section.sourceIds]));
          expect(emittedClaim?.upstreamClaimRefs).toEqual(section.upstreamClaimIds);

          for (const upstreamId of section.upstreamClaimIds) {
            const upstream = execution.claims.find((claim) => claim.claimId === upstreamId);
            expect(
              upstream,
              scenario.id + '/' + domain + ': upstream claim ' + upstreamId,
            ).toBeDefined();
            expect(upstream?.taxonomy.tier).toBe('T5');
            expect(upstream?.state).toBe('active');
            expect(upstream?.snapshotId).toBe(scenario.snapshot.snapshotId);
            expect(upstream?.factRefs.length).toBeGreaterThan(0);
            expect(upstream?.sourceRefs.length).toBeGreaterThan(0);
          }
        }

        const guide = report.readingGuide;
        const coreClaimType =
          guide && ('coreClaimType' in guide ? guide.coreClaimType : guide.sourceClaimType);
        if (report.state === 'complete') {
          expect(report.sections.length).toBeGreaterThanOrEqual(domain === 'career' ? 1 : 3);
          expect(coreClaimType).toBeTruthy();
          expect(guide?.supporting).toHaveLength(domain === 'career' ? report.sections.length - 1 : 2);
          const sectionPaths = report.sections.map((section) =>
            'observedFactPaths' in section
              ? section.observedFactPaths
              : section.calculatedFactPaths,
          );
          const previouslyUsed = new Set(sectionPaths[0] ?? []);
          for (const supportPaths of sectionPaths.slice(1)) {
            expect(
              supportPaths.some((path) => !previouslyUsed.has(path)),
              scenario.id + '/' + domain + ': independent supporting fact path',
            ).toBe(true);
            supportPaths.forEach((path) => previouslyUsed.add(path));
          }
        }
        if (scenario.id.includes('unknown-hour')) {
          expect(report.state).not.toBe('complete');
          expect(report.sections.length).toBeLessThan(3);
          expect(report.missing.length).toBeGreaterThan(0);
        }
        domainAudit[domain] = {
          state: report.state,
          selectedSections: report.sections.length,
          additionalVerifiedSections:
            'additionalVerifiedSections' in report ? report.additionalVerifiedSections.length : 0,
          coreClaimPresent: Boolean(coreClaimType),
          supportingClaims: guide?.supporting.length ?? 0,
          missingRequirements: report.missing.length,
          sourceLinkedSections: report.sections.filter((section) => section.sourceIds.length > 0)
            .length,
          ruleLinkedSections: report.sections.filter((section) => Boolean(section.ruleId)).length,
        };
      }
      audit[scenario.id] = domainAudit;
    }

    console.info('S5 scenario MUR matrix', JSON.stringify(audit));
    expect(Object.keys(audit)).toHaveLength(8);
  }, 120000);
});
