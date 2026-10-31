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
  it('actually displays existing source-qualified Ten-God context for an insufficient Wealth reading', () => {
    const chart = calculateCanonicalSajuSnapshot({
      calendarType: 'solar',
      date: { year: 1981, month: 2, day: 1 },
      time: { known: true, hour: 13, minute: 52 },
      sexForTraditionalCalculation: 'male',
    }, PRODUCTION_DEFAULT_CALCULATION_POLICY, { now: NOW });
    const reading = reports(chart);
    expect(reading.wealth.state).toBe('insufficient');
    expect(reading.wealth.sections).toHaveLength(0);
    const context = reading.wealth.availableThemeContext!;
    expect(context.wealthConclusionAuthorized).toBe(false);
    expect(context.themes.length).toBeGreaterThan(0);
    const html = renderNatalFiveDomainMultifactorResearchHtml(chart, reading);
    const wealthCard = html.split('<h2 id="domain-wealth">')[1]!.split('</article>')[0]!;
    expect(wealthCard).toContain('aria-label="재물운 근거 있는 부분 설명"');
    expect(wealthCard).toContain('재물운 종합 해석 아님');
    expect(wealthCard).toContain(context.paragraph);
    for (const membership of context.hiddenWealthMembership) {
      expect(wealthCard).toContain('지장간의 재성 계열 구성 관측');
      expect(wealthCard).toContain(membership.hiddenStem);
      expect(wealthCard).toContain(membership.derivedTenGod);
      expect(wealthCard).toContain(membership.membershipSourceUrl);
    }
    for (const theme of context.themes) {
      expect(wealthCard).toContain(theme.headline);
      expect(wealthCard).toContain(theme.claimType);
      expect(wealthCard).toContain(theme.sourceIds[0]!);
      expect(wealthCard).toContain(theme.observedPositions[0]!);
    }
    const forged = {
      ...reading,
      wealth: {
        ...reading.wealth,
        availableThemeContext: {
          ...context,
          themes: [{ ...context.themes[0]!, observedFactPaths: ['not-a-canonical-path'] }],
        },
      },
    };
    expect(() => renderNatalFiveDomainMultifactorResearchHtml(chart, forged))
      .toThrow('existing theme context has no actual sourced calculation evidence');
  }, 30000);

  it('displays already sourced T5 meanings alongside an indirect-only Wealth T8 paragraph', () => {
    for (const birth of [
      { year: 1964, month: 11, day: 14, hour: 14, minute: 59, pattern: 'OFFICER_RESOURCE_CONTEXT' },
      { year: 1962, month: 5, day: 5, hour: 0, minute: 3, pattern: 'OFFICER_PEER_CONTEXT' },
    ]) {
      const chart = calculateCanonicalSajuSnapshot({
        calendarType: 'solar', date: {
          year: birth.year, month: birth.month, day: birth.day,
        },
        time: { known: true, hour: birth.hour, minute: birth.minute },
        sexForTraditionalCalculation: 'unspecified',
      }, PRODUCTION_DEFAULT_CALCULATION_POLICY, { now: NOW });
      const reading = reports(chart);
      const wealth = reading.wealth;
      expect(wealth.state).toBe('partial');
      expect(wealth.sections).toHaveLength(1);
      expect(wealth.sections[0]?.pattern).toBe(birth.pattern);
      expect(wealth.sections[0]?.axis).toBe('context');
      expect(wealth.readingGuide).toBeUndefined();
      const context = wealth.availableThemeContext!;
      expect(context.wealthConclusionAuthorized).toBe(false);
      expect(context.themes.length).toBeGreaterThanOrEqual(2);
      const html = renderNatalFiveDomainMultifactorResearchHtml(chart, reading);
      const wealthCard = html.split('<h2 id="domain-wealth">')[1]!
        .split('</article>')[0]!;
      expect(wealthCard).toContain('aria-label="재물운 근거 있는 부분 설명"');
      expect(wealthCard).toContain('현재 종합 풀이가 보류된 이유');
      expect(wealthCard).toContain(wealth.missing[0]!);
      expect(wealthCard).toContain(context.paragraph);
      expect(context.themes.every(theme =>
        !wealth.sections[0]!.upstreamClaimIds.includes(theme.claimId))).toBe(true);
      // Rendered source paragraph is safely HTML-escaped (including quotes).
      const escapedParagraph = wealth.sections[0]!.paragraph
        .replace(/&/gu, '&amp;')
        .replace(/</gu, '&lt;').replace(/>/gu, '&gt;')
        .replace(/"/gu, '&quot;').replace(/'/gu, '&#39;');
      expect(wealthCard).toContain('<p>' + escapedParagraph + '</p>');
      expect(wealthCard).toContain('재물운 종합 해석 아님');
      const duplicate = {
        ...reading,
        wealth: {
          ...wealth,
          availableThemeContext: {
            ...context,
            themes: [
              { ...context.themes[0]!, claimId: wealth.sections[0]!.upstreamClaimIds[0]! },
              ...context.themes.slice(1),
            ],
          },
        },
      };
      expect(() => renderNatalFiveDomainMultifactorResearchHtml(chart, duplicate))
        .toThrow('existing theme context repeats an already interpreted T8 upstream claim');
      for (const theme of context.themes) {
        expect(wealthCard).toContain(theme.headline);
        expect(wealthCard).toContain(theme.sourceIds[0]!);
        expect(wealthCard).toContain(theme.observedPositions[0]!);
      }
      // Injecting fallback T5 material alongside a real Wealth T8 core is forbidden.
      const coreChart = sample(3, 10);
      const validWealth = reports(coreChart);
      expect(validWealth.wealth.readingGuide).toBeDefined();
      const forged = {
        ...validWealth,
        wealth: { ...validWealth.wealth, availableThemeContext: context },
      };
      expect(() => renderNatalFiveDomainMultifactorResearchHtml(coreChart, forged))
        .toThrow('existing theme context must not become a Wealth synthesis');
      expect(wealth.mayPublish).toBe(false);
      expect(wealth.maySell).toBe(false);
    }
  }, 30000);

  it('keeps the actual Wealth tension and unused T5 themes distinct in the reader', () => {
    let chart: ReturnType<typeof sample> | undefined;
    for (let year = 1950; year <= 2005 && chart === undefined; year++) {
      for (const month of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]) {
        const current = calculateCanonicalSajuSnapshot({
          calendarType: 'solar',
          date: { year, month, day: 14 },
          time: { known: true, hour: 12, minute: 0 },
          sexForTraditionalCalculation: 'unspecified',
        }, PRODUCTION_DEFAULT_CALCULATION_POLICY, { now: NOW });
        const run = runInterpretation(current, registry.wealth, { now: NOW });
        const wealth = buildWealthNatalMultifactorReport(current, run, registry.wealth);
        if (wealth.sections.length === 1 &&
            wealth.sections[0]?.axis === 'tension' &&
            (wealth.availableThemeContext?.themes.length ?? 0) > 0) {
          chart = current;
          break;
        }
      }
    }
    expect(chart).toBeDefined();
    const reading = reports(chart!);
    const wealth = reading.wealth;
    expect(wealth.sections[0]?.axis).toBe('tension');
    const context = wealth.availableThemeContext!;
    expect(context.wealthConclusionAuthorized).toBe(false);
    const html = renderNatalFiveDomainMultifactorResearchHtml(chart!, reading);
    const wealthCard = html.split('<h2 id="domain-wealth">')[1]!
      .split('</article>')[0]!;
    expect(wealthCard).toContain('aria-label="재물운 근거 있는 부분 설명"');
    expect(wealthCard).toContain(context.paragraph);
    expect(wealthCard).toContain(wealth.missing[0]!);
    expect(wealthCard).toContain('재물운 종합 해석 아님');
    expect(wealthCard).toContain(wealth.sections[0]!.headline);
    for (const theme of context.themes) {
      expect(wealth.sections[0]!.upstreamClaimIds).not.toContain(theme.claimId);
      expect(wealthCard).toContain(theme.sourceIds[0]!);
      expect(wealthCard).toContain(theme.observedPositions[0]!);
    }
    expect(wealth.mayPublish).toBe(false);
    expect(wealth.maySell).toBe(false);
  }, 30000);

  it('explains the actual cross-channel Wealth gap without claiming synthesis', () => {
    const chart = calculateCanonicalSajuSnapshot({
      calendarType: 'solar',
      date: { year: 1955, month: 10, day: 31 },
      time: { known: true, hour: 19, minute: 35 },
      sexForTraditionalCalculation: 'unspecified',
    }, PRODUCTION_DEFAULT_CALCULATION_POLICY, { now: NOW });
    const reading = reports(chart);
    const wealth = reading.wealth;
    expect(wealth.state).toBe('insufficient');
    expect(wealth.sections).toHaveLength(0);
    expect(wealth.availableThemeContext?.wealthConclusionAuthorized).toBe(false);
    expect(wealth.availableThemeContext?.themes.map(theme => theme.claimType))
      .toContain('TEN_GOD_WEALTH_BRANCHES_THEME');
    expect(wealth.missing.join(' ')).toContain('천간과 지지 대표 십신으로 나뉘어');
    expect(wealth.missing.join(' ')).toContain('서로 다른 채널을 임의로 결합');
    const html = renderNatalFiveDomainMultifactorResearchHtml(chart, reading);
    const wealthHtml = html.split('<h2 id="domain-wealth">')[1]!.split('</article>')[0]!;
    expect(wealthHtml).toContain('재물운 종합 해석 아님');
    expect(wealthHtml).toContain('재물운의 중심 복합 해석 근거는 아직 확인되지 않았습니다');
    expect(wealthHtml).toContain('아래에는 출처 있는 개별 십신 관점만 부분적으로 설명합니다');
    expect(wealthHtml).not.toContain('현재 이 명식에서 근거가 확인된 해석 문단은 없습니다');
    expect(wealthHtml).toContain('서로 다른 채널을 임의로 결합');
    expect(wealth.mayPublish).toBe(false);
    expect(wealth.maySell).toBe(false);
  }, 30000);

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
