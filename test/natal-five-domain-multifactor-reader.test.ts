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
  it('shows source-owned T5 observations rather than inventing a wealth T8 paragraph', () => {
    const chart = calculateCanonicalSajuSnapshot({
      calendarType: 'solar', date: { year: 1955, month: 10, day: 31 },
      time: { known: true, hour: 19, minute: 35 },
      sexForTraditionalCalculation: 'unspecified',
    }, PRODUCTION_DEFAULT_CALCULATION_POLICY, { now: NOW });
    const result = reports(chart);
    expect(result.wealth.state).toBe('insufficient');
    expect(result.wealth.sections).toHaveLength(0);
    const trace = result.wealth.insufficientEvidence!;
    const html = renderNatalFiveDomainMultifactorResearchHtml(chart, result);
    const wealthCard = html.split('<h2 id="domain-wealth">')[1]!
      .split('</article>')[0]!;
    expect(wealthCard).toContain('재물 T8 근거 부족의 실제 T5 관측');
    expect(wealthCard).toContain(trace.koreanExplanation);
    expect(wealthCard).toContain('등록된 T8 재물 종합해석으로 승격하지 않습니다');
    for (const theme of trace.observedT5) {
      expect(wealthCard).toContain(theme.claimId);
      expect(wealthCard).toContain(theme.sourceIds[0]!);
      expect(wealthCard).toContain(theme.positions[0]!);
    }
    expect(html).toContain('내부 연구용 미리보기');
  });
  it('renders five source-owned Korean meanings and evidence scopes on one real canonical chart', () => {
    const chart = sample(3, 10);
    const sections = reports(chart);
    const html = renderNatalFiveDomainMultifactorResearchHtml(chart, sections);
    expect(html).toBe(renderNatalFiveDomainMultifactorResearchHtml(chart, sections));
    expect(sections.career.readingGuide).toBeDefined();
    expect(html).toContain('aria-label="직업운 읽기 요약"');
    expect(html).toContain(sections.career.readingGuide!.paragraph);
    expect(sections.wealth.readingGuide).toBeDefined();
    expect(html).toContain('aria-label="재물운 읽기 요약"');
    expect(html).toContain(sections.wealth.readingGuide!.paragraph);
    expect(sections.business.readingGuide).toBeDefined();
    expect(html).toContain('aria-label="사업운 읽기 요약"');
    expect(html).toContain(sections.business.readingGuide!.paragraph);
    const businessCard = html.split('<h2 id="domain-business">')[1]!;
    expect(businessCard.indexOf(sections.business.readingGuide!.title))
      .toBeLessThan(businessCard.indexOf('명식 근거와 출처 확인'));
    const wealthCard = html.split('<h2 id="domain-wealth">')[1]!;
    expect(wealthCard.indexOf(sections.wealth.readingGuide!.title))
      .toBeLessThan(wealthCard.indexOf('명식 근거와 출처 확인'));
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

  it('puts exact source-bound General Korean interpretation first without granting new meaning', () => {
    const chart = sample(3, 10);
    const original = reports(chart);
    const general = original.general;
    expect(general.sections.length).toBeGreaterThan(0);
    expect(general.readingGuide).toBeDefined();
    const html = renderNatalFiveDomainMultifactorResearchHtml(chart, original);
    const ownCard = html.split('<h2 id="domain-general">')[1]!.split('</article>')[0]!;
    const first = ownCard.indexOf('이 명식에서 먼저 읽을 실제 총운 풀이');
    const details = ownCard.indexOf('<details class="full-claim-evidence">');
    expect(first).toBeGreaterThanOrEqual(0);
    expect(details).toBeGreaterThan(first);
    expect(ownCard).toContain('aria-label="총운 명식별 풀이 본문"');
    // The introduction may already repeat a sourced paragraph. Verify the
    // dedicated first-screen segment, not its first occurrence in the card.
    const firstScreen = ownCard.slice(first, details);
    for (const section of general.sections) {
      // Rendered HTML escapes the source-owned Korean paragraph unchanged in meaning.
      const displayed = section.paragraph.replace(/&/gu, '&amp;')
        .replace(/</gu, '&lt;').replace(/>/gu, '&gt;')
        .replace(/"/gu, '&quot;').replace(/'/gu, '&#39;');
      expect(firstScreen).toContain('<p>' + displayed + '</p>');
      expect(ownCard).toContain(section.ruleId);
      expect(ownCard).toContain(section.sourceIds[0]!);
    }
    expect(ownCard).toContain(general.state === 'complete'
      ? '성격·미래 사건을 단정하지 않습니다.'
      : '종합 결론으로 채우지 않습니다.');
    expect(general.researchOnly).toBe(true);
    expect(general.usefulComplete).toBe(false);
    expect(general.mayPublish).toBe(false);
    expect(general.maySell).toBe(false);
    const unknown = sample(3, 10, null);
    const unknownHtml = renderNatalFiveDomainMultifactorResearchHtml(unknown, reports(unknown));
    expect(unknownHtml).not.toContain('aria-label="총운 명식별 풀이 본문"');
    const forged = {
      ...original,
      general: {
        ...general,
        readingGuide: { ...general.readingGuide!, sourceClaimType: 'FAKE_GENERAL_T8' },
      },
    };
    expect(() => renderNatalFiveDomainMultifactorResearchHtml(chart, forged))
      .toThrow(/General first-screen reading/);
  });

  it('puts exact Business and Relationship T8 Korean meaning before collapsed attribution', () => {
    const chart = sample(3, 10);
    const original = reports(chart);
    const html = renderNatalFiveDomainMultifactorResearchHtml(chart, original);
    for (const domain of ['business', 'relationship'] as const) {
      const report = original[domain];
      expect(report.readingGuide).toBeDefined();
      expect(report.sections.length).toBeGreaterThan(0);
      const ownCard = html.split('<h2 id="domain-' + domain + '">')[1]!
        .split('</article>')[0]!;
      const firstMeaning = ownCard.indexOf('이 명식에서 먼저 읽을 실제 풀이');
      const fullEvidence = ownCard.indexOf('<details class="full-claim-evidence">');
      expect(firstMeaning).toBeGreaterThanOrEqual(0);
      expect(fullEvidence).toBeGreaterThan(firstMeaning);
      for (const section of report.sections) {
        const originalParagraph = section.paragraph.replace(/&/gu, '&amp;')
          .replace(/</gu, '&lt;').replace(/>/gu, '&gt;')
          .replace(/"/gu, '&quot;').replace(/'/gu, '&#39;');
        const first = ownCard.indexOf(originalParagraph);
        expect(first).toBeGreaterThan(firstMeaning);
        expect(first).toBeLessThan(fullEvidence);
        expect(ownCard).toContain(section.ruleId);
        expect(ownCard).toContain(section.sourceIds[0]!);
      }
      expect(ownCard).toContain(report.state === 'complete'
        ? '실제 사업·관계 결과를 예측하지 않습니다.'
        : '보조 근거가 부족한 종합 결론은 보류합니다.');
    }
    const unknown = sample(3, 10, null);
    const unknownHtml = renderNatalFiveDomainMultifactorResearchHtml(unknown, reports(unknown));
    expect(unknownHtml).not.toContain('class="first-meaning"');
    expect(unknownHtml).toContain('출판 및 판매 불가');
  });

  it('makes partial evidence and its unresolved gap visible together in the five-domain overview', () => {
    const chart = sample(3, 10);
    const original = reports(chart);
    expect(original.career.sections.length).toBeGreaterThan(0);
    const first = original.career.sections[0]!;
    const gap = '다른 직업 해석 축을 뒷받침할 근거가 아직 부족합니다.';
    const careerWithoutGuide = { ...original.career };
    delete careerWithoutGuide.readingGuide;
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
    expect(ra.business.readingGuide).toBeDefined();
    expect(() => renderNatalFiveDomainMultifactorResearchHtml(a, {
      ...ra,
      business: {
        ...ra.business,
        readingGuide: {
          ...ra.business.readingGuide!,
          coreClaimType: 'FAKE_BUSINESS_T8',
        },
      },
    })).toThrow(/Business guide must describe the selected/u);
    expect(() => renderNatalFiveDomainMultifactorResearchHtml(a, {
      ...ra,
      business: {
        ...ra.business,
        readingGuide: {
          ...ra.business.readingGuide!,
          supporting: [{
            claimType: 'FAKE_SUPPORT',
            distinctObservedFactPaths: ['derivedFacts.tenGods.value.hour.stem.value'],
            distinctObservedPositions: ['허위 명식'],
          }],
        },
      },
    })).toThrow();
    expect(ra.wealth.readingGuide).toBeDefined();
    expect(() => renderNatalFiveDomainMultifactorResearchHtml(a, {
      ...ra,
      wealth: {
        ...ra.wealth,
        readingGuide: {
          ...ra.wealth.readingGuide!,
          coreClaimType: 'FORGED_WEALTH_T8',
        },
      },
    })).toThrow(/Wealth reading guide must follow/u);
    expect(() => renderNatalFiveDomainMultifactorResearchHtml(a, {
      ...ra,
      wealth: {
        ...ra.wealth,
        readingGuide: {
          ...ra.wealth.readingGuide!,
          supporting: [{
            claimType: 'FORGED_SUPPORT',
            distinctObservedFactPaths: ['derivedFacts.tenGods.value.hour.stem.value'],
            distinctObservedPositions: ['시간 조작'],
          }],
        },
      },
    })).toThrow();
    const unknown = sample(3, 10, null);
    expect(() => renderNatalFiveDomainMultifactorResearchHtml(unknown, ra)).toThrow();
  });

  it('shows sourced relationship core before evidence and rejects forged supporting paths', () => {
    const cases = [[3, 10], [4, 12], [5, 17], [6, 23]] as const;
    const selected = cases.map(([month, day]) => {
      const chart = sample(month, day);
      return { chart, readings: reports(chart) };
    }).find(item => item.readings.relationship.readingGuide !== undefined);
    expect(selected).toBeDefined();
    if (!selected) return;
    const guide = selected.readings.relationship.readingGuide!;
    const html = renderNatalFiveDomainMultifactorResearchHtml(
      selected.chart, selected.readings);
    expect(html).toContain('aria-label="관계운 읽기 요약"');
    expect(html).toContain(guide.paragraph);
    const relationCard = html.split('<h2 id="domain-relationship">')[1]!;
    expect(relationCard.indexOf(guide.title))
      .toBeLessThan(relationCard.indexOf('명식 근거와 출처 확인'));
    expect(() => renderNatalFiveDomainMultifactorResearchHtml(selected.chart, {
      ...selected.readings,
      relationship: {
        ...selected.readings.relationship,
        readingGuide: { ...guide, coreClaimType: 'FORGED_RELATIONSHIP_T8' },
      },
    })).toThrow(/Relationship guide must follow/u);
    if (guide.supporting.length > 0) {
      expect(() => renderNatalFiveDomainMultifactorResearchHtml(selected.chart, {
        ...selected.readings,
        relationship: {
          ...selected.readings.relationship,
          readingGuide: {
            ...guide,
            supporting: [{ ...guide.supporting[0]!,
              distinctObservedFactPaths: ['derivedFacts.tenGods.value.year.stem.value'],
              distinctObservedPositions: ['허위 관계 증거'],
            }, ...guide.supporting.slice(1)],
          },
        },
      })).toThrow();
    }
    const unknown = sample(3, 10, null);
    expect(reports(unknown).relationship.readingGuide).toBeUndefined();
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
