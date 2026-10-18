import { describe, expect, it } from 'vitest';
import { calculateAuthorizedMyeonghwaProductionSnapshot } from
  '../src/production/production-calculation-runtime.js';
import { createBusinessNatalReadingCandidateRegistry } from
  '../src/research/business-natal-reading-candidate.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { buildNatalN32ExpandedDomainResearchReading } from
  '../src/preview/natal-n32-expanded-domain-research-reading.js';
import {
  auditNatalN34FourDomainCopyContrasts,
} from '../src/preview/natal-n34-four-domain-copy-contrast.js';
import {
  renderNatalN34ResearchCopyComparisonHtml,
} from '../src/preview/natal-n34-contrast-reader.js';

const NOW = new Date('2026-10-18T00:00:00.000Z');
const registry = createBusinessNatalReadingCandidateRegistry(NOW.toISOString());

function caseFor(caseId: string, year: number, month: number, day: number,
  hour: number) {
  const snapshot = calculateAuthorizedMyeonghwaProductionSnapshot({
    calendarType: 'solar', date: { year, month, day },
    time: { known: true, hour, minute: 30 },
    sexForTraditionalCalculation: 'unspecified',
  }, { now: NOW }).snapshot;
  const execution = runInterpretation(snapshot, registry, { requestId: 'n34-reader', now: NOW });
  return { caseId, reading: buildNatalN32ExpandedDomainResearchReading(
    snapshot, execution, registry) };
}

describe('N34 research-only source-copy side-by-side reader', () => {
  it('renders actual original Korean T8 excerpts, their positions, and same-chart control without inventing meaning', () => {
    const left = caseFor('solar-2024-03-10-12:30', 2024, 3, 10, 12);
    const right = caseFor('solar-1996-01-09-19:30', 1996, 1, 9, 19);
    const control = caseFor('control-2024-03-10-12:30', 2024, 3, 10, 12);
    const cases = [left, right, control];
    const audit = auditNatalN34FourDomainCopyContrasts(cases, [
      { left: left.caseId, right: right.caseId },
      { left: left.caseId, right: control.caseId },
    ]);
    const html = renderNatalN34ResearchCopyComparisonHtml(cases, audit);
    expect(html).toContain('<!doctype html>');
    expect(html).toContain('명식별 기존 한국어 풀이 원문을 나란히 비교');
    expect(html).toContain('동일 명식 대조군');
    expect(html).toContain('계산에서 확인된 위치');
    expect(html).toContain('원문·근거·계산 위치 모두 같음');
    expect(html).toContain('Official/Production');
    expect(html).toContain('직업·일');
    expect(html).toContain('재물·자원');
    expect(html).toContain('사업·실행');
    expect(html).toContain('관계');
    const actual = left.reading.firstScreen.sections.flatMap(s => s.visibleClaims)[0];
    expect(actual).toBeDefined();
    if (actual !== undefined) {
      expect(html).toContain(actual.summary);
      expect(html).toContain(actual.claimRuleId);
    }
    expect(html).not.toContain('연애 성공 확정');
    expect(html).toBe(renderNatalN34ResearchCopyComparisonHtml(cases, audit));
  });

  it('escapes synthetic case labels and rejects forged audit classifications', () => {
    const left = caseFor('case-<script>alert(1)</script>', 2024, 3, 10, 12);
    const control = caseFor('same-chart-control', 2024, 3, 10, 12);
    const cases = [left, control];
    const audit = auditNatalN34FourDomainCopyContrasts(cases, [
      { left: left.caseId, right: control.caseId },
    ]);
    const html = renderNatalN34ResearchCopyComparisonHtml(cases, audit);
    expect(html).toContain('case-&lt;script&gt;alert(1)&lt;/script&gt;');
    expect(html).not.toContain('case-<script>');
    expect(() => renderNatalN34ResearchCopyComparisonHtml(cases, {
      ...audit,
      counts: { ...audit.counts, unchanged: 999 },
    })).toThrow(/integrity invalid/u);
  });
});
