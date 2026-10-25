import { describe, expect, it } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import { buildWealthNatalMultifactorReport } from '../src/preview/wealth-natal-multifactor-report.js';
import { createWealthNatalMultifactorRegistry } from '../src/research/wealth-natal-multifactor-candidate.js';

const now = new Date('2026-10-25T00:00:00.000Z');
function reading(year: number, month: number, day: number, hour: number, minute: number) {
  const snapshot = calculateCanonicalSajuSnapshot({
    calendarType: 'solar',
    date: { year, month, day },
    time: { known: true, hour, minute },
    sexForTraditionalCalculation: 'female',
  }, PRODUCTION_DEFAULT_CALCULATION_POLICY, { now });
  const registry = createWealthNatalMultifactorRegistry();
  const execution = runInterpretation(snapshot, registry, { now });
  return { snapshot, registry, execution,
    report: buildWealthNatalMultifactorReport(snapshot, execution, registry) };
}

describe('isolated source-owned Wealth T5 fact is not a T8 synthesis', () => {
  it('shows source-proven single Wealth T5 only when no two-family rule can apply', () => {
    const { snapshot, execution, report } = reading(1955, 10, 31, 19, 35);
    expect(report.sections).toHaveLength(0);
    expect(report.state).toBe('insufficient');
    const observation = report.singleWealthT5Observation;
    expect(observation).toBeDefined();
    expect(observation?.kind).toBe('isolated_wealth_t5_observation_not_synthesis');
    expect(observation?.claimType).toBe('TEN_GOD_WEALTH_BRANCHES_THEME');
    expect(observation?.channel).toBe('branches');
    expect(observation?.sourceIds.length).toBeGreaterThan(0);
    expect(observation?.ruleIds.length).toBeGreaterThan(0);
    expect(observation?.observedFactPaths.length).toBeGreaterThan(0);
    expect(observation?.claimFactPaths.length).toBeGreaterThan(0);
    expect(observation?.paragraph).toContain('종합해석은 보류');
    expect(execution.claims.some(c =>
      c.claimId === observation?.claimId && c.state === 'active' &&
      c.taxonomy.tier === 'T5' && c.snapshotId === snapshot.snapshotId)).toBe(true);
    expect(report.researchOnly).toBe(true);
    expect(report.usefulComplete).toBe(false);
    expect(report.maySell).toBe(false);
    expect(report.mayPublish).toBe(false);
  });

  it('does not manufacture Wealth T5 when no research projection observes it', () => {
    const { report } = reading(1967, 8, 22, 10, 28);
    expect(report.sections).toHaveLength(0);
    expect(report.singleWealthT5Observation).toBeUndefined();
    expect(report.state).toBe('insufficient');
    expect(report.missing.join(' ')).toContain('재성 계열의 활성 근거가 확인되지');
  });
});
