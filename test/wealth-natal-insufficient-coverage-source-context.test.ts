import { describe, expect, it } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import { buildWealthNatalMultifactorReport } from '../src/preview/wealth-natal-multifactor-report.js';
import { createWealthNatalMultifactorRegistry } from '../src/research/wealth-natal-multifactor-candidate.js';

const NOW = new Date('2026-10-25T00:00:00.000Z');
const registry = createWealthNatalMultifactorRegistry();

function wealthReading(year: number, month: number, day: number, hour: number, minute: number) {
  const snapshot = calculateCanonicalSajuSnapshot({
    calendarType: 'solar',
    date: { year, month, day },
    time: { known: true, hour, minute },
    sexForTraditionalCalculation: 'unspecified',
  }, PRODUCTION_DEFAULT_CALCULATION_POLICY, { now: NOW });
  const execution = runInterpretation(snapshot, registry, { now: NOW });
  const report = buildWealthNatalMultifactorReport(snapshot, execution, registry);
  return { snapshot, execution, report };
}

describe('evidence-exact explanation for unsupported Wealth synthesis', () => {
  it('explains actual absent wealth T5 without inventing a negative fortune', () => {
    const { execution, report } = wealthReading(1964, 11, 14, 14, 59);
    expect(execution.claims.some(c => c.state === 'active' &&
      c.claimType.startsWith('TEN_GOD_WEALTH_'))).toBe(false);
    expect(report.sections).toHaveLength(1);
    expect(report.sections[0]?.axis).toBe('context');
    expect(report.sections[0]?.claimType).toContain('OFFICER_RESOURCE_CONTEXT');
    expect(report.sections[0]?.upstreamClaimIds.length).toBe(2);
    expect(report.sections[0]?.sourceIds.length).toBeGreaterThan(0);
    expect(report.state).toBe('partial');
    const reason = report.missing.join(' ');
    expect(reason).toContain('재성 중심 재물운 종합 해석이 아니며');
    expect(reason).toContain('현재 실제로 확인된 출처 연결 십신 관점');
    expect(reason).toContain('재성 계열의 활성 근거가 확인되지 않아');
    expect(reason).toContain('돈이 없다는 판정이 아니며');
    expect(report.usefulComplete).toBe(false);
    expect(report.mayPublish).toBe(false);
    expect(report.maySell).toBe(false);
    expect(wealthReading(1964,11,14,14,59).report).toEqual(report);
  });

  it('uses the officer-peer context when officer-resource does not match the same channel', () => {
    const { execution, report } = wealthReading(1997, 1, 19, 17, 5);
    expect(execution.claims.some(c => c.state === 'active' &&
      c.claimType.startsWith('TEN_GOD_WEALTH_'))).toBe(false);
    expect(report.sections).toHaveLength(1);
    expect(report.sections[0]?.axis).toBe('context');
    expect(report.sections[0]?.pattern).toBe('OFFICER_PEER_CONTEXT');
    expect(report.sections[0]?.observedPositions.length).toBeGreaterThanOrEqual(2);
    expect(report.state).toBe('partial');
    expect(report.missing.join(' ')).toContain('재성 중심 재물운 종합 해석이 아니며');
    expect(report.usefulComplete).toBe(false);
    expect(report.mayPublish).toBe(false);
    expect(report.maySell).toBe(false);
  });

  it('keeps confirmed peer-wealth tension as partial when no core combination qualifies', () => {
    const { execution, report } = wealthReading(1960, 11, 15, 12, 41);
    expect(execution.claims.some(c => c.state === 'active' &&
      c.claimType.startsWith('TEN_GOD_WEALTH_'))).toBe(true);
    expect(report.sections).toHaveLength(1);
    expect(report.sections[0]?.pattern).toBe('PEER_WEALTH');
    expect(report.sections[0]?.axis).toBe('tension');
    expect(report.state).toBe('partial');
    expect(report.readingGuide).toBeUndefined();
    expect(report.missing.join(' ')).toContain('중심 종합 근거 없이 실제 확인된 긴장 관점');
    expect(report.usefulComplete).toBe(false);
  });
});
