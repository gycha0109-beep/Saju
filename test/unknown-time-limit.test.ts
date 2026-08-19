import { describe, expect, test } from 'vitest';
import {
  calculateCanonicalSajuSnapshot,
  MyeonghwaCalculationError,
  type CalculationPolicySnapshot,
} from '../src/index.js';

const jasiPolicy: CalculationPolicySnapshot = {
  policyId: 'myeonghwa/unknown-time-limit-test',
  policyVersion: '1.0.0',
  dayBoundary: 'jasi',
  trueSolarTime: {
    enabled: false,
    longitudeSource: 'not-applicable',
    applyEquationOfTime: false,
    applyHistoricalDst: false,
  },
  timeZonePolicy: { source: 'service-default', timeZone: 'Asia/Seoul' },
  unknownBirthTimePolicy: 'preserve-unknown-and-enumerate-boundaries',
};

describe('unknown-time scenario limit', () => {
  test('fails closed when the deduplicated scenario graph exceeds the configured limit', () => {
    try {
      calculateCanonicalSajuSnapshot(
        {
          calendarType: 'solar',
          date: { year: 1992, month: 10, day: 24 },
          time: { known: false },
          sexForTraditionalCalculation: 'unspecified',
        },
        jasiPolicy,
        { maxScenarioCount: 1 },
      );
      throw new Error('expected scenario-limit rejection');
    } catch (error) {
      expect(error).toBeInstanceOf(MyeonghwaCalculationError);
      expect((error as MyeonghwaCalculationError).code).toBe('SCENARIO_LIMIT_EXCEEDED');
    }
  });

  test('rejects invalid limit configuration before returning a snapshot', () => {
    for (const value of [0, -1, 1.5]) {
      try {
        calculateCanonicalSajuSnapshot(
          {
            calendarType: 'solar',
            date: { year: 1992, month: 10, day: 24 },
            time: { known: false },
            sexForTraditionalCalculation: 'unspecified',
          },
          jasiPolicy,
          { maxScenarioCount: value },
        );
        throw new Error('expected invalid maxScenarioCount rejection');
      } catch (error) {
        expect(error).toBeInstanceOf(MyeonghwaCalculationError);
        expect((error as MyeonghwaCalculationError).code).toBe('INVALID_INPUT');
      }
    }
  });
});
