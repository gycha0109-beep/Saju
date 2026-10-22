import { describe, expect, it } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import { createGeneralNatalMultifactorRegistry } from '../src/research/general-natal-multifactor-candidate.js';
import { createCareerMultifactorResearchRegistry } from '../src/research/career-natal-multifactor-candidate.js';
import { createWealthNatalMultifactorRegistry } from '../src/research/wealth-natal-multifactor-candidate.js';
import { createBusinessNatalMultifactorRegistry } from '../src/research/business-natal-multifactor-candidate.js';
import { createRelationshipNatalMultifactorRegistry } from '../src/research/relationship-natal-multifactor-candidate.js';
import { buildGeneralNatalMultifactorReport } from '../src/preview/general-natal-multifactor-report.js';
import { buildCareerMultifactorResearchReport } from '../src/preview/career-natal-multifactor-report.js';
import { buildWealthNatalMultifactorReport } from '../src/preview/wealth-natal-multifactor-report.js';
import { buildBusinessNatalMultifactorReport } from '../src/preview/business-natal-multifactor-report.js';
import { buildRelationshipNatalMultifactorReport } from '../src/preview/relationship-natal-multifactor-report.js';
import {
  renderNatalFiveDomainMultifactorResearchHtml,
  type NatalFiveDomainMultifactorReports,
} from '../src/preview/natal-five-domain-multifactor-reader.js';

const NOW = new Date('2026-10-19T00:00:00.000Z');
const registry = {
  general: createGeneralNatalMultifactorRegistry(),
  career: createCareerMultifactorResearchRegistry(),
  wealth: createWealthNatalMultifactorRegistry(),
  business: createBusinessNatalMultifactorRegistry(),
  relationship: createRelationshipNatalMultifactorRegistry(),
};
const domains = ['general', 'career', 'wealth', 'business', 'relationship'] as const;
const labels = ['총운', '직업운', '재물운', '사업운', '관계운'] as const;

function sample(month: number, day: number, hour: number | null = 12) {
  return calculateCanonicalSajuSnapshot({
    calendarType: 'solar',
    date: { year: 2024, month, day },
    time: hour === null
      ? { known: false } as const
      : { known: true, hour, minute: 0 } as const,
    sexForTraditionalCalculation: 'unspecified',
  }, PRODUCTION_DEFAULT_CALCULATION_POLICY, { now: NOW });
}
function reports(snapshot: ReturnType<typeof sample>): NatalFiveDomainMultifactorReports {
  const a = runInterpretation(snapshot, registry.general, { now: NOW });
  const b = runInterpretation(snapshot, registry.career, { now: NOW });
  const c = runInterpretation(snapshot, registry.wealth, { now: NOW });
  const d = runInterpretation(snapshot, registry.business, { now: NOW });
  const e = runInterpretation(snapshot, registry.relationship, { now: NOW });
  return {
    general: buildGeneralNatalMultifactorReport(snapshot, a, registry.general),
    career: buildCareerMultifactorResearchReport(snapshot, b, registry.career),
    wealth: buildWealthNatalMultifactorReport(snapshot, c, registry.wealth),
    business: buildBusinessNatalMultifactorReport(snapshot, d, registry.business),
    relationship: buildRelationshipNatalMultifactorReport(snapshot, e, registry.relationship),
  };
}

describe('same-chart five-domain multifactor Korean research reading', () => {
  it('renders five source-owned Korean meanings and evidence scopes on one real canonical chart', () => {
    const chart = sample(3, 10);
    const sections = reports(chart);
    const html = renderNatalFiveDomainMultifactorResearchHtml(chart, sections);
    expect(html).toBe(renderNatalFiveDomainMultifactorResearchHtml(chart, sections));
    expect(sections.career.readingGuide).toBeDefined();
    expect(html).toContain('aria-label="직업운 읽기 요약"');
    expect(html).toContain(sections.career.readingGuide!.paragraph);
    const careerCard = html.split('<h2 id="domain-career">')[1]!;
    expect(careerCard.indexOf(sections.career.readingGuide!.title))
      .toBeLessThan(careerCard.indexOf('명식 근거와 출처 확인'));
    expect(html).toContain('<html lang="ko">');
    expect(html).toContain('내부 연구용 미리보기 · 검토되지 않은 해석 · 출판 및 판매 불가');
    let prior = -1;
    for (const [index, domain] of domains.entries()) {
      const section = sections[domain];
      expect(section.snapshotId).toBe(chart.snapshotId);
      expect(section.calculationHash).toBe(chart.calculationHash);
      expect(section.researchOnly).toBe(true);
      expect(section.usefulComplete).toBe(false);
      expect(section.mayPublish).toBe(false);
      expect(section.maySell).toBe(false);
      const anchor = '<h2 id="domain-' + domain + '">' + labels[index] + '</h2>';
      expect(html.indexOf(anchor)).toBeGreaterThan(prior);
      prior = html.indexOf(anchor);
      for (const item of section.sections) {
        expect(html).toContain(item.headline);
        const displayedPositions = 'calculatedPositions' in item
          ? item.calculatedPositions : item.observedPositions;
        expect(displayedPositions.length).toBeGreaterThanOrEqual(2);
        for (const position of displayedPositions) expect(item.paragraph).toContain(position);
        expect(item.sourceIds.length).toBeGreaterThan(0);
        expect(item.upstreamClaimIds.length).toBeGreaterThanOrEqual(2);
        expect(html).toContain(item.sourceIds[0]!);
        expect(html).toContain(item.ruleId);
      }
      if (section.state === 'partial') {
        expect(section.missing.length).toBeGreaterThan(0);
        for (const missing of section.missing) expect(html).toContain(missing);
      }
    }
    const overview = html.split('</nav>')[0]!;
    expect(overview).toContain('이 명식에서 먼저 확인할 다섯 관점');
    expect(overview.match(/<a href="#domain-/gu)).toHaveLength(5);
    let previousLink = -1;
    for (const [index, domain] of domains.entries()) {
      const link = '<a href="#domain-' + domain + '">' + labels[index] + '</a>';
      expect(overview.indexOf(link)).toBeGreaterThan(previousLink);
      previousLink = overview.indexOf(link);
      const report = sections[domain];
      expect(overview).toContain(report.sections[0]?.headline ??
        report.missing[0] ?? '현재 확인된 해석 문단이 없습니다.');
    }
    expect(html).toContain('다섯 분야의 근거 기반 요약');
    expect(html.match(/<article aria-labelledby=/gu)).toHaveLength(5);
    expect(html).not.toContain('최소 유효 풀이: partial');
    expect(html).not.toContain('<script>');
  });

  it('makes partial evidence and its unresolved gap visible together in the five-domain overview', () => {
    const chart = sample(3, 10);
    const original = reports(chart);
    expect(original.career.sections.length).toBeGreaterThan(0);
    const first = original.career.sections[0]!;
    const gap = '다른 직업 해석 축을 뒷받침할 근거가 아직 부족합니다.';
    const { readingGuide: _originalGuide, ...careerWithoutGuide } = original.career;
    const partial: NatalFiveDomainMultifactorReports = {
      ...original,
      career: {
        ...careerWithoutGuide,
        state: 'partial',
        sections: [first],
        missing: [gap],
      },
    };
    const html = renderNatalFiveDomainMultifactorResearchHtml(chart, partial);
    const overview = html.split('</nav>')[0]!;
    expect(overview).toContain('부분 풀이 · 추가 근거 필요');
    expect(overview).toContain('확인된 부분 해석: ' + first.headline);
    expect(overview).toContain('아직 설명하지 못하는 부분:</strong> ' + gap);
    expect(html).toContain(first.paragraph);
    expect(html).toContain(first.ruleId);
    expect(html).toContain('출판 및 판매 불가');
  });

  it('does not fabricate five-domain interpretation when birth hour is unknown', () => {
    const chart = sample(3, 10, null);
    const sections = reports(chart);
    const html = renderNatalFiveDomainMultifactorResearchHtml(chart, sections);
    for (const domain of domains) {
      expect(sections[domain].state).toBe('insufficient');
      expect(sections[domain].sections).toHaveLength(0);
      expect(sections[domain].missing.join(' ')).toContain('출생시각 미상');
    }
    const overview = html.split('</nav>')[0]!;
    expect(overview.match(/출생시각 미상/gu)).toHaveLength(5);
    expect(overview).not.toContain('class="meaning"');
    // The new overview also labels five held domains; count body cards only.
    expect(html.split('</nav>')[1]?.match(/풀이 보류 · 근거 부족/gu)).toHaveLength(5);
    expect(html.match(/현재 이 명식에서 근거가 확인된 해석 문단은 없습니다/gu)).toHaveLength(5);
    expect(html).not.toContain('class="meaning"');
  });

  it('rejects another chart, altered evidence status and forged full completeness', () => {
    const a = sample(3, 10);
    const b = sample(4, 12);
    const ra = reports(a);
    const rb = reports(b);
    expect(renderNatalFiveDomainMultifactorResearchHtml(a, ra)).not.toBe(
      renderNatalFiveDomainMultifactorResearchHtml(b, rb));
    expect(() => renderNatalFiveDomainMultifactorResearchHtml(a, {
      ...ra, wealth: rb.wealth,
    })).toThrow(/mismatched canonical chart/);
    expect(() => renderNatalFiveDomainMultifactorResearchHtml(a, {
      ...ra, career: { ...ra.career, maySell: true },
    } as unknown as NatalFiveDomainMultifactorReports)).toThrow(/bounded source-qualified/);
    expect(() => renderNatalFiveDomainMultifactorResearchHtml(a, {
      ...ra, general: { ...ra.general, state: 'complete', sections: [] },
    })).toThrow(/bounded source-qualified/);
    expect(ra.career.sections.length).toBeGreaterThan(0);
    expect(() => renderNatalFiveDomainMultifactorResearchHtml(a, {
      ...ra, wealth: {
        ...ra.wealth,
        sections: ra.career.sections,
      },
    } as unknown as NatalFiveDomainMultifactorReports)).toThrow(/bounded source-qualified/);
    expect(ra.career.readingGuide).toBeDefined();
    expect(() => renderNatalFiveDomainMultifactorResearchHtml(a, {
      ...ra,
      career: {
        ...ra.career,
        readingGuide: {
          ...ra.career.readingGuide!,
          coreClaimType: 'FORGED_T8_CLAIM',
        },
      },
    })).toThrow(/reading guide must be derived/u);
    const unknown = sample(3, 10, null);
    expect(() => renderNatalFiveDomainMultifactorResearchHtml(unknown, ra)).toThrow();
  });

  it('escapes untrusted source text, evidence paths and labels in the reader HTML', () => {
    const chart = sample(3, 10);
    const base = reports(chart);
    const malicious = '<img src=x onerror=alert(1)>';
    const html = renderNatalFiveDomainMultifactorResearchHtml(chart, {
      ...base,
      general: {
        ...base.general,
        introduction: malicious,
        limitations: [...base.general.limitations, malicious],
        missing: [...base.general.missing, malicious],
      },
    });
    expect(html).toContain('&lt;img src=x onerror=alert(1)&gt;');
    expect(html).not.toContain(malicious);
    expect(html).not.toContain('<script>');
  });
});
