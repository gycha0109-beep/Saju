import { describe, expect, it } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import {
  CAREER_MULTIFACTOR_RULES, CAREER_MULTIFACTOR_PACK,
  createCareerMultifactorResearchRegistry,
} from '../src/research/career-natal-multifactor-candidate.js';
import {
  buildCareerMultifactorResearchReport,
  renderCareerMultifactorResearchHtml,
} from '../src/preview/career-natal-multifactor-report.js';

const registry = createCareerMultifactorResearchRegistry();
const NOW = new Date('2026-10-18T00:00:00.000Z');
function sample(month: number, day: number, hour: number | null = 12) {
  return calculateCanonicalSajuSnapshot({
    calendarType: 'solar',
    date: { year: 2024, month, day },
    time: hour === null ? { known: false } as const : { known: true, hour, minute: 0 } as const,
    sexForTraditionalCalculation: 'unspecified',
  }, PRODUCTION_DEFAULT_CALCULATION_POLICY, { now: NOW });
}
function run(month: number, day: number, hour = 12) {
  const chart = sample(month, day, hour);
  const execution = runInterpretation(chart, registry, { now: NOW });
  return { chart, execution, report: buildCareerMultifactorResearchReport(chart, execution, registry) };
}

describe('source-bounded Career two-T5 → T8 → consumer Korean research vertical', () => {
  it('keeps legacy single-Ten-God Career T8 out of the new pack and never enables commerce', () => {
    expect(CAREER_MULTIFACTOR_PACK.status).toBe('research');
    expect(CAREER_MULTIFACTOR_RULES).toHaveLength(6);
    expect(registry.rules.filter(x => x.taxonomy.tier === 'T8')).toHaveLength(6);
    expect(registry.rules.filter(x => x.taxonomy.tier === 'T5')).toHaveLength(10);
    expect(CAREER_MULTIFACTOR_RULES.every(r => r.inputs.length === 2 &&
      r.inputs.every(i => i.source === 'interpretation_claim' && i.cardinality === 'exactly_one') &&
      r.sourceRefs.length === 2 && r.status === 'research')).toBe(true);
    expect(CAREER_MULTIFACTOR_RULES.some(r =>
      r.output.claimType.startsWith('CAREER_NATAL_TEN_GOD_'))).toBe(false);
  });

  it('makes meaning-specific differences on REAL birth-calculated charts, not shuffled fixture labels', () => {
    const observed = [];
    for (const month of [2, 3, 4, 5, 6, 7]) {
      for (const day of [3, 7, 11, 17, 23]) {
        const x = run(month, day);
        const signature = x.report.sections.map(s => s.pattern).sort().join('|');
        if (x.report.sections.length > 0) observed.push({ ...x, signature });
      }
    }
    const a = observed[0];
    const b = observed.find(x => x.signature !== a?.signature && x.chart.calculationHash !== a?.chart.calculationHash);
    expect(a).toBeDefined();
    expect(b).toBeDefined();
    if (!a || !b) return;
    expect(a.report.sections.map(s => s.pattern)).not.toEqual(b.report.sections.map(s => s.pattern));
    expect(a.report.sections.map(s => s.headline)).not.toEqual(b.report.sections.map(s => s.headline));
    for (const x of [a, b]) {
      const claims = x.execution.claims.filter(c =>
        c.claimType.startsWith('CAREER_NATAL_MULTIFACTOR_'));
      expect(claims.length).toBeGreaterThan(0);
      expect(claims.every(c => c.upstreamClaimRefs.length === 2 &&
        c.sourceRefs.length === 2)).toBe(true);
      expect(x.report.mayPublish).toBe(false);
      expect(x.report.maySell).toBe(false);
      expect(x.report.usefulComplete).toBe(false);
      for (const section of x.report.sections) {
        expect(section.calculatedPositions.length).toBeGreaterThanOrEqual(2);
        expect(section.calculatedPositions).toHaveLength(section.calculatedFactPaths.length);
        expect(section.calculatedFactPaths.every(path =>
          /^derivedFacts\\.tenGods\\.value\\.(year|month|day|hour)\\.(stem|branch)\\.value$/u.test(path),
        )).toBe(true);
        expect(section.paragraph).toContain('실제 명식에서 확인한 근거는');
        expect(section.calculatedPositions.every(position =>
          section.paragraph.includes(position))).toBe(true);
      }
      const html = renderCareerMultifactorResearchHtml(x.report);
      expect(html).toContain('<html lang="ko">');
      expect(html).toContain('근거와 출처');
      expect(html).toContain(x.report.sections[0]!.headline);
    }
    const again = run(2, 3);
    const once = run(2, 3);
    expect(again.report).toEqual(once.report);
  }, 30000);

  it('never mistakes a single composite Claim for a full minimum useful reading', () => {
    for (const [month, day] of [[3, 10], [4, 11], [5, 7]] as const) {
      const x = run(month, day);
      const primary = x.report.sections[0];
      const supplement = x.report.sections.slice(1);
      if (x.report.state === 'complete') {
        expect(primary?.channel).toBe('visible_stems');
        expect(supplement).toHaveLength(2);
        expect(new Set(x.report.sections.map(c => c.pattern)).size).toBe(3);
      } else {
        expect(x.report.state).toMatch(/partial|insufficient/);
        expect(x.report.missing.length).toBeGreaterThan(0);
      }
    }
  }, 15000);

  it('fails closed when birth hour is unknown rather than inventing four-pillar synthesis', () => {
    const chart = sample(3, 10, null);
    const execution = runInterpretation(chart, registry, { now: NOW });
    const report = buildCareerMultifactorResearchReport(chart, execution, registry);
    expect(report.state).toBe('insufficient');
    expect(report.sections).toHaveLength(0);
    expect(report.missing).toContain('출생시각 미상');
  });

  it('refuses unrelated registry and cross-person outputs', () => {
    const first = run(3, 10);
    const next = sample(4, 15);
    expect(() => buildCareerMultifactorResearchReport(next, first.execution, registry)).toThrow();
  });
});
