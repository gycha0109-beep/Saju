import { describe, expect, it } from 'vitest';
import type { BirthInput } from '../src/contracts/calculation.js';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import { createGeneralNatalMultifactorRegistry } from '../src/research/general-natal-multifactor-candidate.js';
import { createCareerMultifactorResearchRegistry } from '../src/research/career-natal-multifactor-candidate.js';
import { createWealthNatalMultifactorRegistry } from '../src/research/wealth-natal-multifactor-candidate.js';
import { createBusinessNatalMultifactorRegistry } from '../src/research/business-natal-multifactor-candidate.js';
import { createRelationshipNatalMultifactorRegistry } from '../src/research/relationship-natal-multifactor-candidate.js';
import { buildGeneralNatalMultifactorReport } from '../src/preview/general-natal-multifactor-report.js';
import {
  buildCareerMultifactorResearchReport, renderCareerMultifactorResearchHtml,
} from '../src/preview/career-natal-multifactor-report.js';
import { buildWealthNatalMultifactorReport } from '../src/preview/wealth-natal-multifactor-report.js';
import { buildBusinessNatalMultifactorReport } from '../src/preview/business-natal-multifactor-report.js';
import { buildRelationshipNatalMultifactorReport } from '../src/preview/relationship-natal-multifactor-report.js';
import { buildInsufficientNatalT5Evidence } from '../src/preview/natal-t5-insufficient-evidence.js';
import { renderNatalFiveDomainMultifactorResearchHtml } from '../src/preview/natal-five-domain-multifactor-reader.js';

const now = new Date('2026-10-25T00:00:00.000Z');
function birth(year: number, month: number, day: number, hour: number, minute: number): BirthInput {
  return {
    calendarType: 'solar',
    date: { year, month, day },
    time: { known: true, hour, minute },
    sexForTraditionalCalculation: 'unspecified',
  };
}
const cases = [
  { domain: 'general' as const, input: birth(1955, 10, 31, 19, 35) },
  { domain: 'career' as const, input: birth(1955, 10, 31, 19, 35) },
  { domain: 'business' as const, input: birth(2004, 8, 10, 7, 55) },
  { domain: 'relationship' as const, input: birth(1975, 3, 26, 1, 34) },
];
function run(input: BirthInput) {
  const snapshot = calculateCanonicalSajuSnapshot(input, PRODUCTION_DEFAULT_CALCULATION_POLICY, { now });
  const reg = {
    general: createGeneralNatalMultifactorRegistry(),
    career: createCareerMultifactorResearchRegistry(),
    wealth: createWealthNatalMultifactorRegistry(),
    business: createBusinessNatalMultifactorRegistry(),
    relationship: createRelationshipNatalMultifactorRegistry(),
  };
  const a = runInterpretation(snapshot, reg.general, { now });
  const b = runInterpretation(snapshot, reg.career, { now });
  const c = runInterpretation(snapshot, reg.wealth, { now });
  const d = runInterpretation(snapshot, reg.business, { now });
  const e = runInterpretation(snapshot, reg.relationship, { now });
  return {
    snapshot, reg,
    executions: { general: a, career: b, wealth: c, business: d, relationship: e },
    reports: {
      general: buildGeneralNatalMultifactorReport(snapshot, a, reg.general),
      career: buildCareerMultifactorResearchReport(snapshot, b, reg.career),
      wealth: buildWealthNatalMultifactorReport(snapshot, c, reg.wealth),
      business: buildBusinessNatalMultifactorReport(snapshot, d, reg.business),
      relationship: buildRelationshipNatalMultifactorReport(snapshot, e, reg.relationship),
    },
  };
}

describe('fixed-seed 500-case empty natal T8 uses only actually emitted T5 facts', () => {
  for (const fixture of cases) {
    it(fixture.domain + ' shows original T5 with provenance but no invented T8 interpretation', () => {
      const actual = run(fixture.input);
      const report = actual.reports[fixture.domain];
      expect(report.state).toBe('insufficient');
      expect(report.sections).toHaveLength(0);
      const evidence = report.insufficientT5Evidence;
      expect(evidence?.domain).toBe(fixture.domain);
      expect(evidence?.sourceQualifiedDomainT8Count).toBe(0);
      expect(evidence?.researchOnly).toBe(true);
      expect(evidence?.mayPublish).toBe(false);
      expect(evidence?.maySell).toBe(false);
      expect(evidence?.observations.length).toBeGreaterThan(0);
      const html = renderNatalFiveDomainMultifactorResearchHtml(actual.snapshot, actual.reports);
      const domainHtml = html.split('<h2 id="domain-' + fixture.domain + '">')[1]!
        .split('</article>')[0]!;
      expect(domainHtml).toContain('확인된 명식 사실과 해석 보류 사유');
      for (const t5 of evidence!.observations) {
        expect(t5.factPaths).toHaveLength(t5.positions.length);
        expect(t5.sourceIds.length).toBeGreaterThan(0);
        expect(t5.ruleId).toMatch(/^RULE-GENERAL-NATAL-T5-/u);
        expect(t5.claimType).toMatch(/^TEN_GOD_/u);
        expect(actual.executions[fixture.domain].claims.some(claim =>
          claim.claimId === t5.claimId && claim.state === 'active' &&
          claim.ruleRefs.some(ref => ref.ruleId === t5.ruleId))).toBe(true);
        for (const path of t5.factPaths) expect(domainHtml).toContain(path);
      }
      expect(report.mayPublish).toBe(false);
      expect(report.maySell).toBe(false);
      expect(report.usefulComplete).toBe(false);
      if (fixture.domain === 'career') {
        const standalone = renderCareerMultifactorResearchHtml(actual.reports.career);
        expect(standalone).toContain('관측된 T5와 미발행 직업 T8');
        expect(standalone).toContain(evidence!.observations[0]!.ruleId);
      }
    });
  }

  it('cannot claim no T8 while the original registry actually emits a domain T8', () => {
    const fixture = run(birth(1985, 12, 24, 7, 0));
    expect(fixture.reports.general.sections.length).toBeGreaterThan(0);
    expect(() => buildInsufficientNatalT5Evidence(
      'general', fixture.snapshot, fixture.executions.general, fixture.reg.general,
    )).toThrow('no source-issued domain T8 required');
  });

  it('does not build a source-qualified T5 explanation from unknown birth hour', () => {
    const unknown = birth(1955, 10, 31, 19, 35);
    const fixture = run({ ...unknown, time: { known: false } });
    expect(fixture.reports.general.insufficientT5Evidence).toBeUndefined();
    expect(() => buildInsufficientNatalT5Evidence(
      'general', fixture.snapshot, fixture.executions.general, fixture.reg.general,
    )).toThrow('resolved exact chart');
  });
});
