import { describe, expect, it } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import { buildWealthNatalMultifactorReport } from '../src/preview/wealth-natal-multifactor-report.js';
import { createWealthNatalMultifactorRegistry } from '../src/research/wealth-natal-multifactor-candidate.js';

describe('wealth: preserve independently grounded core coverage', () => {
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
    expect(report.mayPublish).toBe(false);
    expect(report.maySell).toBe(false);
  });
});
