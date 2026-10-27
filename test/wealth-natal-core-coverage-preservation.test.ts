import { describe, expect, it } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import { buildWealthNatalMultifactorReport } from '../src/preview/wealth-natal-multifactor-report.js';
import { createWealthNatalMultifactorRegistry } from '../src/research/wealth-natal-multifactor-candidate.js';

describe('wealth: preserve independently grounded core coverage', () => {
  it('does not treat irrelevant adjacent birth minutes as distinct wealth meanings', () => {
    const now = new Date('2026-10-25T00:00:00.000Z');
    const registry = createWealthNatalMultifactorRegistry();
    const interpret = (minute: number) => {
      const snapshot = calculateCanonicalSajuSnapshot({
        calendarType: 'solar',
        date: { year: 1995, month: 2, day: 28 },
        time: { known: true, hour: 22, minute },
        sexForTraditionalCalculation: 'male',
      }, PRODUCTION_DEFAULT_CALCULATION_POLICY, { now });
      const execution = runInterpretation(snapshot, registry, { now });
      const report = buildWealthNatalMultifactorReport(snapshot, execution, registry);
      return { report, snapshot };
    };
    const a = interpret(42), b = interpret(43);
    expect(a.snapshot.calculationHash).not.toBe(b.snapshot.calculationHash);
    expect(a.snapshot.pillars).toEqual(b.snapshot.pillars);
    expect(a.report.sections.map(x => [x.claimType, x.observedFactPaths, x.paragraph]))
      .toEqual(b.report.sections.map(x => [x.claimType, x.observedFactPaths, x.paragraph]));
    expect(a.report.state).toBe(b.report.state);
  });

  it('does not replace a complete existing reading with an overlapping three-family core', () => {
    const now = new Date('2026-10-25T00:00:00.000Z');
    const snapshot = calculateCanonicalSajuSnapshot({
      calendarType: 'solar',
      date: { year: 1995, month: 2, day: 28 },
      time: { known: true, hour: 22, minute: 42 },
      sexForTraditionalCalculation: 'male',
    }, PRODUCTION_DEFAULT_CALCULATION_POLICY, { now });
    const registry = createWealthNatalMultifactorRegistry();
    const execution = runInterpretation(snapshot, registry, { now });
    const report = buildWealthNatalMultifactorReport(snapshot, execution, registry);
    expect(report.state).toBe('complete');
    expect(report.sections).toHaveLength(3);
    expect(report.sections[0]?.pattern).not.toBe('WEALTH_OFFICER_RESOURCE');
    expect(new Set(report.sections.map(x => x.axis)).size).toBe(3);
    expect(report.eligibleAlternatives.length).toBeGreaterThan(0);
    const shown = new Set(report.sections.map(x => x.claimType));
    expect(report.eligibleAlternatives.every(x =>
      !shown.has(x.claimType) && x.sourceIds.length > 0 &&
      x.ruleId.length > 0 && x.observedFactPaths.length > 0,
    )).toBe(true);
    expect(report.mayPublish).toBe(false);
    expect(report.maySell).toBe(false);
  });
});
