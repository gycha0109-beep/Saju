import { describe, expect, it } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import { createBusinessNatalMultifactorRegistry } from '../src/research/business-natal-multifactor-candidate.js';
import { buildBusinessNatalMultifactorReport } from '../src/preview/business-natal-multifactor-report.js';

const NOW = new Date('2026-10-19T00:00:00.000Z');
const registry = createBusinessNatalMultifactorRegistry();

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
  return buildBusinessNatalMultifactorReport(snapshot, execution, registry);
}

describe('Business natal source-bound Korean reading guide', () => {
  it('connects a real-birth T8 core to distinct supporting source-owned calculated positions', () => {
    const current = reading(3, 10);
    expect(current.sections.length).toBeGreaterThan(0);
    const guide = current.readingGuide;
    expect(guide).toBeDefined();
    if (guide === undefined) return;
    const core = current.sections[0]!;
    expect(guide.coreClaimType).toBe(core.claimType);
    expect(guide.paragraph).toContain(core.headline);
    for (const position of core.observedPositions) expect(guide.paragraph).toContain(position);
    expect(guide.supporting.length).toBe(current.sections.length - 1);
    const used = new Set(core.observedFactPaths);
    guide.supporting.forEach((support, index) => {
      const section = current.sections[index + 1]!;
      expect(support.claimType).toBe(section.claimType);
      expect(guide.paragraph).toContain(section.headline);
      expect(support.distinctObservedFactPaths.length).toBeGreaterThan(0);
      expect(support.distinctObservedPositions.length).toBe(support.distinctObservedFactPaths.length);
      for (const [i, path] of support.distinctObservedFactPaths.entries()) {
        expect(used.has(path)).toBe(false);
        expect(section.observedFactPaths).toContain(path);
        expect(section.observedPositions).toContain(support.distinctObservedPositions[i]!);
        expect(guide.paragraph).toContain(support.distinctObservedPositions[i]!);
        used.add(path);
      }
    });
    expect(current).toMatchObject({
      researchOnly: true, usefulComplete: false, mayPublish: false, maySell: false,
    });
  });

  it('changes the Korean guide when actual Business claim/positions change and replays identically', () => {
    const inputs = [[3,10],[4,11],[5,7],[6,3],[7,17],[8,23]] as const;
    const cases = inputs.map(([month, day]) => reading(month, day));
    const observed = cases.filter(result => result.readingGuide !== undefined);
    expect(observed.length).toBeGreaterThanOrEqual(2);
    expect(observed.some(result =>
      result.readingGuide?.paragraph !== observed[0]?.readingGuide?.paragraph)).toBe(true);
    for (const result of observed) {
      expect(result.readingGuide?.coreClaimType).toBe(result.sections[0]?.claimType);
      expect(result.readingGuide?.paragraph).toContain(result.sections[0]!.observedPositions[0]!);
      expect(result.researchOnly).toBe(true);
      expect(result.mayPublish).toBe(false);
    }
    expect(reading(3, 10)).toEqual(reading(3, 10));
  });

  it('does not create a Business synthesis for unknown birth time or coordination-only evidence', () => {
    const unknown = reading(3, 10, null);
    expect(unknown.readingGuide).toBeUndefined();
    expect(unknown.state).toBe('insufficient');
    expect(unknown.sections).toHaveLength(0);
    expect(unknown.missing.join(' ')).toContain('출생시각 미상');

    for (const [month, day] of [[2,3],[3,7],[4,11],[5,7],[7,17]] as const) {
      const current = reading(month, day);
      if (current.sections.length === 0 ||
        current.sections[0]?.axis === 'coordination') {
        expect(current.readingGuide).toBeUndefined();
        expect(current.state).not.toBe('complete');
      }
    }
  });

  it('marks missing independent support as incomplete rather than claiming business success', () => {
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
    expect(partial?.readingGuide?.paragraph).toContain('사업운 전체 종합 설명은 보류합니다');
    expect(partial?.missing.length).toBeGreaterThan(0);
    expect(partial?.usefulComplete).toBe(false);
    expect(partial?.maySell).toBe(false);
  }, 30000);
});
