import { describe, expect, test } from 'vitest';
import { calculateCanonicalSajuSnapshot, type CalculationPolicySnapshot } from '../src/index.js';
import {
  KASI_LEAP_MONTH_FIXTURES,
  KASI_LEAP_MONTH_SOURCE,
} from './fixtures/institutional-lunar-leap-fixtures.js';

const policy: CalculationPolicySnapshot = {
  policyId: 'myeonghwa/i3-leap-month',
  policyVersion: '1.0.0',
  dayBoundary: 'midnight',
  trueSolarTime: {
    enabled: false,
    longitudeSource: 'not-applicable',
    applyEquationOfTime: false,
    applyHistoricalDst: false,
  },
  timeZonePolicy: { source: 'service-default', timeZone: 'Asia/Seoul' },
  unknownBirthTimePolicy: 'preserve-unknown-and-enumerate-boundaries',
};

describe('Tier B KASI leap-month fixtures', () => {
  test('source remains independent institutional Tier B rather than official Tier A', () => {
    expect(KASI_LEAP_MONTH_SOURCE.sourceTier).toBe('B');
    expect(KASI_LEAP_MONTH_SOURCE.independentFromManseryeok).toBe(true);
    expect(KASI_LEAP_MONTH_SOURCE.limitation).toContain('not the official announcement');
  });

  for (const fixture of KASI_LEAP_MONTH_FIXTURES) {
    test(fixture.fixtureId, () => {
      const snapshot = calculateCanonicalSajuSnapshot(fixture.input, policy);
      expect(snapshot.normalized.solarDate).toEqual({
        status: 'resolved',
        value: fixture.expectedSolarDate,
      });
      expect(snapshot.normalized.lunarDate).toEqual({
        status: 'resolved',
        value: { ...fixture.input.date, isLeapMonth: true },
      });
    });
  }
});
