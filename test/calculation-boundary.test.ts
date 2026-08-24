import { describe, expect, test } from 'vitest';
import {
  calculateCanonicalSajuSnapshot,
  MyeonghwaCalculationError,
  type BirthInput,
  type CalculationErrorCode,
  type CalculationPolicySnapshot,
} from '../src/index.js';

function policy(
  overrides: Partial<CalculationPolicySnapshot> = {},
): CalculationPolicySnapshot {
  return {
    policyId: 'myeonghwa/test-default',
    policyVersion: '1.0.0',
    dayBoundary: 'midnight',
    trueSolarTime: {
      enabled: false,
      longitudeSource: 'not-applicable',
      applyEquationOfTime: false,
      applyHistoricalDst: false,
    },
    timeZonePolicy: {
      source: 'service-default',
      timeZone: 'Asia/Seoul',
    },
    unknownBirthTimePolicy: 'preserve-unknown-and-enumerate-boundaries',
    ...overrides,
  };
}

function expectCalculationError(action: () => unknown, code: CalculationErrorCode): void {
  try {
    action();
    throw new Error(`expected MyeonghwaCalculationError(${code})`);
  } catch (error) {
    expect(error).toBeInstanceOf(MyeonghwaCalculationError);
    expect((error as MyeonghwaCalculationError).code).toBe(code);
  }
}

describe('calculation boundary — solar-term context', () => {
  test('anchors the 2024 Lichun boundary at 17:27 fixed KST', () => {
    const before = calculateCanonicalSajuSnapshot(
      {
        calendarType: 'solar',
        date: { year: 2024, month: 2, day: 4 },
        time: { known: true, hour: 17, minute: 26 },
        sexForTraditionalCalculation: 'unspecified',
      },
      policy(),
    );
    const after = calculateCanonicalSajuSnapshot(
      {
        calendarType: 'solar',
        date: { year: 2024, month: 2, day: 4 },
        time: { known: true, hour: 17, minute: 28 },
        sexForTraditionalCalculation: 'unspecified',
      },
      policy(),
    );

    expect(before.solarTermContext?.lichun?.localDateTime).toBe('2024-02-04T17:27');
    expect(before.solarTermContext?.next?.name).toBe('입춘');
    expect(after.solarTermContext?.previous?.name).toBe('입춘');
    expect(
      before.solarTermContext?.boundariesOnBirthDate?.some((term) => term.name === '입춘'),
    ).toBe(true);
  });

  test('unknown time exposes same-day boundaries without inventing previous/next', () => {
    const snapshot = calculateCanonicalSajuSnapshot(
      {
        calendarType: 'solar',
        date: { year: 2024, month: 2, day: 4 },
        time: { known: false },
        sexForTraditionalCalculation: 'unspecified',
      },
      policy(),
    );

    expect(snapshot.solarTermContext?.previous).toBeUndefined();
    expect(snapshot.solarTermContext?.next).toBeUndefined();
    expect(snapshot.solarTermContext?.lichun?.localDateTime).toBe('2024-02-04T17:27');
    expect(snapshot.solarTermContext?.boundariesOnBirthDate).toHaveLength(1);
  });
});

describe('calculation boundary — domain error translation', () => {
  const knownInput: BirthInput = {
    calendarType: 'solar',
    date: { year: 1992, month: 10, day: 24 },
    time: { known: true, hour: 5, minute: 30 },
    sexForTraditionalCalculation: 'male',
  };

  test('maps an unsupported timezone to UNSUPPORTED_POLICY', () => {
    expectCalculationError(
      () =>
        calculateCanonicalSajuSnapshot(
          knownInput,
          policy({
            timeZonePolicy: { source: 'manual', timeZone: 'Asia/Tokyo' },
          }),
        ),
      'UNSUPPORTED_POLICY',
    );
  });

  test('maps a missing true-solar birthplace longitude to UNSUPPORTED_POLICY', () => {
    expectCalculationError(
      () =>
        calculateCanonicalSajuSnapshot(
          { ...knownInput, birthplace: { timeZone: 'Asia/Seoul' } },
          policy({
            trueSolarTime: {
              enabled: true,
              longitudeSource: 'birthplace',
              applyEquationOfTime: true,
              applyHistoricalDst: true,
            },
          }),
        ),
      'UNSUPPORTED_POLICY',
    );
  });

  test('maps an upstream year-domain rejection to OUTSIDE_SUPPORTED_RANGE', () => {
    expectCalculationError(
      () =>
        calculateCanonicalSajuSnapshot(
          {
            ...knownInput,
            date: { year: 1799, month: 6, day: 15 },
          },
          policy(),
        ),
      'OUTSIDE_SUPPORTED_RANGE',
    );
  });

  test('maps an invalid Gregorian date to INVALID_INPUT', () => {
    expectCalculationError(
      () =>
        calculateCanonicalSajuSnapshot(
          {
            ...knownInput,
            date: { year: 2023, month: 2, day: 29 },
          },
          policy(),
        ),
      'INVALID_INPUT',
    );
  });
});

describe('calculation boundary — supported date edge', () => {
  test('keeps supported solar range edges executable', () => {
    for (const year of [1800, 2300]) {
      expect(() =>
        calculateCanonicalSajuSnapshot(
          {
            calendarType: 'solar',
            date: { year, month: 6, day: 15 },
            time: { known: true, hour: 12, minute: 0 },
            sexForTraditionalCalculation: 'unspecified',
          },
          policy(),
        ),
      ).not.toThrow();
    }
  });
});
