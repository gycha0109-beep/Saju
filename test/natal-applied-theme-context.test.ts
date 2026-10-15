import { describe, expect, it } from 'vitest';
import { calculateAuthorizedMyeonghwaProductionSnapshot } from '../src/production/production-calculation-runtime.js';
import { createGeneralNatalIntegratedReadingRegistry } from '../src/interpretation/general-natal-integrated-reading-registry.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { buildNatalStructuralEvidence } from '../src/preview/natal-structural-evidence.js';
import { buildNatalActivatedThemePreview } from '../src/preview/natal-activated-theme-preview.js';
import { buildNatalAppliedThemeContext } from '../src/preview/natal-applied-theme-context.js';

const NOW = new Date('2026-10-15T00:00:00.000Z');
const registry = createGeneralNatalIntegratedReadingRegistry(NOW.toISOString());

function actualApplied(date: string, time: string | null) {
  const [year, month, day] = date.split('-').map(Number);
  if (year === undefined || month === undefined || day === undefined) {
    throw new TypeError('Invalid fixture date');
  }
  const [hour, minute] = time === null ? [] : time.split(':').map(Number);
  if (time !== null && (hour === undefined || minute === undefined)) {
    throw new TypeError('Invalid fixture time');
  }
  const snapshot = calculateAuthorizedMyeonghwaProductionSnapshot({
    calendarType: 'solar',
    date: { year, month, day },
    time: hour === undefined || minute === undefined
      ? { known: false } : { known: true, hour, minute },
    sexForTraditionalCalculation: 'unspecified',
  }, { now: NOW }).snapshot;
  const evidence = buildNatalStructuralEvidence(snapshot);
  const research = buildNatalActivatedThemePreview(
    runInterpretation(snapshot, registry, { now: NOW, requestId: 'N4-chart-specific' }),
  );
  return { evidence, research, applied: buildNatalAppliedThemeContext(evidence, research) };
}

describe('N4 chart-conditional interpretation context based on actual canonical facts', () => {
  it('connects previously repeated officer research themes to actual different positions', () => {
    const first = actualApplied('1984-01-07', '00:30');
    const second = actualApplied('1984-01-07', '12:30');
    expect(first.applied.statements.length).toBeGreaterThan(0);
    expect(first.applied.chartSpecificThemeFingerprint)
      .not.toBe(second.applied.chartSpecificThemeFingerprint);
    const contexts = [first.applied, second.applied];
    for (const context of contexts) {
      expect(context.lifecycle).toBe('internal_research_exploration');
      expect(context.mayPublish).toBe(false);
      expect(context.maySell).toBe(false);
      expect(context.mayInferOutcome).toBe(false);
      expect(context.mayInferYongshin).toBe(false);
      expect(context.statements.every((statement) =>
        statement.positions.length > 0 &&
        statement.sourceRuleIds.length > 0 &&
        statement.sourceIds.length > 0 &&
        statement.positions.every((position) => position.evidencePath.startsWith('derivedFacts.tenGods.'))))
        .toBe(true);
      expect(context.statements.map((statement) => statement.contextualReading).join(' '))
        .toContain('관측 근거는');
    }
    const officerFirst = first.applied.statements.filter((x) => x.family === 'officer');
    const officerSecond = second.applied.statements.filter((x) => x.family === 'officer');
    expect(officerFirst.some((x) => x.channel === 'visible_stems')).toBe(true);
    expect(officerSecond.some((x) => x.channel === 'branches')).toBe(true);
  });

  it('does not fabricate an unknown birth hour and preserves same-chart determinism', () => {
    const known = actualApplied('1996-01-09', '19:30');
    const repeated = actualApplied('1996-01-09', '19:30');
    const unknown = actualApplied('1996-01-09', null);
    expect(known.applied.chartSpecificThemeFingerprint)
      .toBe(repeated.applied.chartSpecificThemeFingerprint);
    expect(known.applied.statements.map((x) => x.contextualReading))
      .toEqual(repeated.applied.statements.map((x) => x.contextualReading));
    expect(unknown.applied.structuralHourPillar).toBeUndefined();
    expect(unknown.applied.statements.flatMap((x) => x.positions)
      .every((position) => position.pillar !== 'hour')).toBe(true);
    expect(() => buildNatalAppliedThemeContext(unknown.evidence, known.research))
      .toThrow(/exact canonical snapshot/u);
  });

  it('rejects research themes whose matching calculated Ten God cannot be shown', () => {
    const original = actualApplied('1984-01-07', '00:30');
    const empty = {
      ...original.evidence,
      tenGods: [],
    };
    expect(() => buildNatalAppliedThemeContext(empty, original.research))
      .toThrow(/no calculated position/u);
  });
});
