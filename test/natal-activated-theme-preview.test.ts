import { describe, expect, it } from 'vitest';
import { calculateAuthorizedMyeonghwaProductionSnapshot } from '../src/production/production-calculation-runtime.js';
import { createGeneralNatalIntegratedReadingRegistry } from '../src/interpretation/general-natal-integrated-reading-registry.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { buildNatalActivatedThemePreview } from '../src/preview/natal-activated-theme-preview.js';

const NOW = new Date('2026-10-15T00:00:00.000Z');
const registry = createGeneralNatalIntegratedReadingRegistry(NOW.toISOString());

function researchThemes(date: string) {
  const [year, month, day] = date.split('-').map(Number);
  if (year === undefined || month === undefined || day === undefined) throw new TypeError('bad date');
  const snapshot = calculateAuthorizedMyeonghwaProductionSnapshot({
    calendarType: 'solar',
    date: { year, month, day },
    time: { known: true, hour: 12, minute: 30 },
    sexForTraditionalCalculation: 'unspecified',
  }, { now: NOW }).snapshot;
  return buildNatalActivatedThemePreview(runInterpretation(snapshot, registry, {
    requestId: date, now: NOW,
  }));
}

describe('N3 actual activated source-scoped natal research themes', () => {
  it('renders actually emitted theme source text for multiple real canonical charts', () => {
    const first = researchThemes('1984-01-07');
    const second = researchThemes('1992-01-12');
    for (const result of [first, second]) {
      expect(result.lifecycle).toBe('internal_research_exploration');
      expect(result.mayPublish).toBe(false);
      expect(result.mayUseAsOfficialMeaning).toBe(false);
      expect(result.maySell).toBe(false);
      expect(result.mayRankDominance).toBe(false);
      expect(result.themes.length).toBeGreaterThan(0);
      expect(new Set(result.themes.map((t) => t.family + ':' + t.channel)).size)
        .toBe(result.themes.length);
      for (const theme of result.themes) {
        expect(theme.ruleIds.length).toBeGreaterThan(0);
        expect(theme.sourceIds.length).toBeGreaterThan(0);
        expect(theme.headline.length).toBeGreaterThan(0);
        expect(theme.summary.length).toBeGreaterThan(0);
        expect(theme.claimType).toMatch(/^TEN_GOD_/u);
      }
    }
    // Different charts need not have different themes; no forced personalization.
    expect(first.snapshotId).not.toBe(second.snapshotId);
  });

  it('keeps unknown-hour source scope and no invented themes', () => {
    const snapshot = calculateAuthorizedMyeonghwaProductionSnapshot({
      calendarType: 'solar',
      date: { year: 2024, month: 3, day: 10 },
      time: { known: false },
      sexForTraditionalCalculation: 'unspecified',
    }, { now: NOW }).snapshot;
    const result = buildNatalActivatedThemePreview(runInterpretation(snapshot, registry, { now: NOW }));
    expect(result.snapshotId).toBe(snapshot.snapshotId);
    expect(result.mayPublish).toBe(false);
    expect(result.disclosure).toContain('연구 단계');
    for (const theme of result.themes) {
      expect(theme.summary).not.toMatch(/(확정|반드시 일어난다)/u);
    }
  });
});
