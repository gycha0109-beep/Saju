import { describe, expect, it } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import {
  createCareerMultifactorResearchRegistry,
} from '../src/research/career-natal-multifactor-candidate.js';
import {
  buildCareerMultifactorResearchReport,
  renderCareerMultifactorResearchHtml,
} from '../src/preview/career-natal-multifactor-report.js';

const NOW = new Date('2026-10-18T00:00:00.000Z');
const registry = createCareerMultifactorResearchRegistry();

function report(month: number, day: number, hour: number | null = 12) {
  const snapshot = calculateCanonicalSajuSnapshot({
    calendarType: 'solar',
    date: { year: 2024, month, day },
    time: hour === null
      ? { known: false } as const
      : { known: true, hour, minute: 0 } as const,
    sexForTraditionalCalculation: 'unspecified',
  }, PRODUCTION_DEFAULT_CALCULATION_POLICY, { now: NOW });
  const execution = runInterpretation(snapshot, registry, { now: NOW });
  return buildCareerMultifactorResearchReport(snapshot, execution, registry);
}

describe('Career evidence-linked Korean reader guide', () => {
  it('shows a real-birth core and two new supporting observations before research details', () => {
    const current = report(3, 10);
    expect(current.state).toBe('complete');
    const guide = current.readingGuide;
    expect(guide).toBeDefined();
    if (guide === undefined) return;
    const core = current.sections[0]!;
    expect(guide.coreClaimType).toBe(core.claimType);
    expect(guide.paragraph).toContain(core.headline);
    expect(guide.paragraph).toContain(core.calculatedPositions[0]!);
    expect(guide.supporting).toHaveLength(2);
    const used = new Set(core.calculatedFactPaths);
    guide.supporting.forEach((support, i) => {
      const section = current.sections[i + 1]!;
      expect(support.claimType).toBe(section.claimType);
      expect(guide.paragraph).toContain(section.headline);
      expect(support.distinctCalculatedFactPaths.length).toBeGreaterThan(0);
      expect(support.distinctCalculatedFactPaths).toHaveLength(support.distinctCalculatedPositions.length);
      support.distinctCalculatedFactPaths.forEach((path, index) => {
        expect(used.has(path)).toBe(false);
        expect(section.calculatedFactPaths).toContain(path);
        expect(section.calculatedPositions).toContain(support.distinctCalculatedPositions[index]!);
        expect(guide.paragraph).toContain(support.distinctCalculatedPositions[index]!);
        used.add(path);
      });
    });
    const html = renderCareerMultifactorResearchHtml(current);
    expect(html).toContain('aria-label="직업운 읽기 요약"');
    expect(html.indexOf(guide.title)).toBeLessThan(html.indexOf('<summary>근거와 출처</summary>'));
    expect(html).toContain('연구용 내부 미리보기 · 출판 및 판매 불가');
    expect(current).toMatchObject({
      researchOnly: true, usefulComplete: false, mayPublish: false, maySell: false,
    });
  });

  it('shows chart-grounded differences instead of writing identical generic summaries', () => {
    const samples = [[3, 10], [4, 11], [5, 7], [6, 3], [7, 17]] as const;
    const results = samples.map(([month, day]) => report(month, day));
    const readable = results.filter(item => item.readingGuide !== undefined);
    expect(readable.length).toBeGreaterThanOrEqual(2);
    const differing = readable.find(item =>
      item.readingGuide?.paragraph !== readable[0]?.readingGuide?.paragraph);
    expect(differing).toBeDefined();
    for (const candidate of readable) {
      expect(candidate.readingGuide?.coreClaimType).toBe(candidate.sections[0]?.claimType);
      expect(candidate.readingGuide?.paragraph).toContain(candidate.sections[0]!.calculatedPositions[0]!);
      expect(candidate.researchOnly).toBe(true);
      expect(candidate.usefulComplete).toBe(false);
    }
    expect(report(3, 10)).toEqual(report(3, 10));
  });

  it('does not manufacture a core reading guide for unknown-hour or supporting-only evidence', () => {
    const unknown = report(3, 10, null);
    expect(unknown.readingGuide).toBeUndefined();
    expect(unknown.state).toBe('insufficient');
    expect(renderCareerMultifactorResearchHtml(unknown)).not.toContain('aria-label="직업운 읽기 요약"');
    expect(renderCareerMultifactorResearchHtml(unknown)).toContain('출생시각');

    const supportingOnly = [
      [2, 3], [2, 11], [3, 7], [4, 11], [5, 7],
    ] as const;
    for (const [month, day] of supportingOnly) {
      const current = report(month, day);
      if (!current.sections.some(section => section.channel === 'visible_stems' && section.axis !== 'tension')) {
        expect(current.readingGuide).toBeUndefined();
        expect(current.state).not.toBe('complete');
      }
    }
  });

  it('keeps an incomplete career report visibly incomplete when only one supporting axis exists', () => {
    let partial: ReturnType<typeof report> | undefined;
    for (const month of [2, 3, 4, 5, 6, 7, 8, 9]) {
      for (const day of [3, 7, 11, 17, 23]) {
        const candidate = report(month, day);
        if (candidate.state === 'partial' && candidate.readingGuide !== undefined) {
          partial = candidate;
          break;
        }
      }
      if (partial !== undefined) break;
    }
    expect(partial).toBeDefined();
    expect(partial?.readingGuide?.supporting.length).toBeLessThan(2);
    expect(partial?.readingGuide?.paragraph).toContain('직업운 종합 결론은 보류합니다');
    expect(partial?.missing.length).toBeGreaterThan(0);
    expect(partial?.usefulComplete).toBe(false);
    expect(partial?.maySell).toBe(false);
  }, 30000);
});
