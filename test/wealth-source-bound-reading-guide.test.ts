import { describe, expect, it } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import { createWealthNatalMultifactorRegistry } from '../src/research/wealth-natal-multifactor-candidate.js';
import { buildWealthNatalMultifactorReport } from '../src/preview/wealth-natal-multifactor-report.js';

const NOW = new Date('2026-10-19T00:00:00.000Z');
const registry = createWealthNatalMultifactorRegistry();

function reading(month: number, day: number, hour: number | null = 12) {
  const snapshot = calculateCanonicalSajuSnapshot({
    calendarType: 'solar',
    date: { year: 2024, month, day },
    time: hour === null
      ? { known: false } as const
      : { known: true, hour, minute: 0 } as const,
    sexForTraditionalCalculation: 'unspecified',
  }, PRODUCTION_DEFAULT_CALCULATION_POLICY, { now: NOW });
  const execution = runInterpretation(snapshot, registry, { now: NOW });
  return buildWealthNatalMultifactorReport(snapshot, execution, registry);
}

describe('Wealth natal source-owned Korean reading guide', () => {
  it('uses the actual selected T8 core with distinct observed T0 paths for each support', () => {
    const report = reading(3, 10);
    expect(report.sections.length).toBeGreaterThan(0);
    const guide = report.readingGuide;
    expect(guide).toBeDefined();
    if (guide === undefined) return;
    const core = report.sections[0]!;
    expect(guide.coreClaimType).toBe(core.claimType);
    expect(guide.paragraph).toContain(core.headline);
    expect(core.observedPositions.every(position => guide.paragraph.includes(position))).toBe(true);
    expect(guide.supporting.length).toBe(report.sections.length - 1);
    const used = new Set(core.observedFactPaths);
    guide.supporting.forEach((support, index) => {
      const section = report.sections[index + 1]!;
      expect(support.claimType).toBe(section.claimType);
      expect(guide.paragraph).toContain(section.headline);
      expect(support.distinctObservedPositions.length).toBeGreaterThan(0);
      expect(support.distinctObservedFactPaths.length).toBe(support.distinctObservedPositions.length);
      support.distinctObservedFactPaths.forEach((path, positionIndex) => {
        expect(used.has(path)).toBe(false);
        expect(section.observedFactPaths).toContain(path);
        expect(section.observedPositions).toContain(support.distinctObservedPositions[positionIndex]!);
        expect(guide.paragraph).toContain(support.distinctObservedPositions[positionIndex]!);
        used.add(path);
      });
    });
    expect(report).toMatchObject({
      researchOnly: true, usefulComplete: false, mayPublish: false, maySell: false,
    });
  });

  it('changes what the person reads when the actual chart observation changes and stays deterministic', () => {
    const observations = [[3,10],[4,11],[5,7],[6,3],[7,17],[8,23]] as const;
    const results = observations.map(([month, day]) => reading(month, day));
    const available = results.filter(result => result.readingGuide !== undefined);
    expect(available.length).toBeGreaterThanOrEqual(2);
    expect(available.some(result =>
      result.readingGuide?.paragraph !== available[0]?.readingGuide?.paragraph)).toBe(true);
    for (const result of available) {
      expect(result.readingGuide?.coreClaimType).toBe(result.sections[0]?.claimType);
      expect(result.readingGuide?.paragraph).toContain(result.sections[0]!.observedPositions[0]!);
      expect(result.maySell).toBe(false);
    }
    expect(reading(3, 10)).toEqual(reading(3, 10));
  });

  it('does not invent a Wealth synthesis for missing time, tension-only or no core', () => {
    const unknown = reading(3, 10, null);
    expect(unknown.state).toBe('insufficient');
    expect(unknown.readingGuide).toBeUndefined();
    expect(unknown.sections).toHaveLength(0);
    expect(unknown.missing.join(' ')).toContain('출생시각 미상');

    for (const [month, day] of [[2,3],[2,11],[3,7],[4,11],[5,7]] as const) {
      const report = reading(month, day);
      if (report.sections.length === 0 || report.sections[0]?.axis === 'tension') {
        expect(report.readingGuide).toBeUndefined();
        expect(report.state).not.toBe('complete');
      }
    }
  });

  it('keeps incomplete independently sourced support visibly partial', () => {
    let partial: ReturnType<typeof reading> | undefined;
    outer: for (const month of [2,3,4,5,6,7,8,9]) {
      for (const day of [3,7,11,17,23]) {
        const current = reading(month, day);
        if (current.state === 'partial' && current.readingGuide !== undefined) {
          partial = current;
          break outer;
        }
      }
    }
    expect(partial).toBeDefined();
    expect(partial?.readingGuide?.supporting.length).toBeLessThan(2);
    expect(partial?.readingGuide?.paragraph).toContain('재물운 전체 종합 판단은 보류합니다');
    expect(partial?.missing.length).toBeGreaterThan(0);
    expect(partial?.usefulComplete).toBe(false);
    expect(partial?.mayPublish).toBe(false);
  }, 30000);
});
