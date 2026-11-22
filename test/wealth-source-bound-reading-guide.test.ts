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

  it('reads only resolved natal evidence when the hour or core combination is unavailable', () => {
    const unknown = reading(3, 10, null);
    expect(unknown.state).toBe('partial');
    expect(unknown.readingGuide).toBeUndefined();
    expect(unknown.sections.map((section) => section.axis)).toEqual(['context']);
    expect(unknown.missing.join(' ')).toContain('시주 미확정');

    const unknownWithTwoSupports = reading(4, 11, null);
    expect(unknownWithTwoSupports.state).toBe('partial');
    expect(unknownWithTwoSupports.readingGuide?.supporting).toHaveLength(2);
    expect(unknownWithTwoSupports.readingGuide?.paragraph).toContain('출생시각을 알 수 없어');
    expect(unknownWithTwoSupports.readingGuide?.paragraph).not.toContain('독립 근거가 2개 확인되어');
    expect(unknownWithTwoSupports.sections.flatMap((section) => section.observedFactPaths)
      .some((path) => path.includes('.hour.'))).toBe(false);

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
    expect(partial?.readingGuide?.paragraph).toContain('근거가 있는 관점까지만 설명합니다');
    expect(partial?.missing.length).toBeGreaterThan(0);
    expect(partial?.usefulComplete).toBe(false);
    expect(partial?.mayPublish).toBe(false);
  }, 30000);
});
