import { describe, expect, test } from 'vitest';
import {
  calculateCanonicalSajuSnapshot,
  type BirthInput,
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

function pillarText(state: ReturnType<typeof calculateCanonicalSajuSnapshot>['pillars']['year']): string {
  if (state.status !== 'resolved') {
    throw new Error(`expected resolved pillar but got ${state.status}`);
  }
  return `${state.value.stem.value}${state.value.branch.value}`;
}

describe('manseryeok adapter — known time', () => {
  test('maps the upstream golden case into the canonical snapshot', () => {
    const input: BirthInput = {
      calendarType: 'solar',
      date: { year: 1992, month: 10, day: 24 },
      time: { known: true, hour: 5, minute: 30 },
      sexForTraditionalCalculation: 'male',
    };

    const snapshot = calculateCanonicalSajuSnapshot(input, policy(), {
      now: new Date('2026-08-19T00:00:00.000Z'),
    });

    expect(pillarText(snapshot.pillars.year)).toBe('임신');
    expect(pillarText(snapshot.pillars.month)).toBe('경술');
    expect(pillarText(snapshot.pillars.day)).toBe('계유');
    expect(pillarText(snapshot.pillars.hour)).toBe('을묘');
    expect(snapshot.derivedFacts.dayMaster.status).toBe('resolved');
    expect(snapshot.derivedFacts.tenGods.status).toBe('resolved');
    expect(snapshot.luckCycle.status).toBe('resolved');
    expect(snapshot.provenance.engine).toEqual({
      name: 'manseryeok',
      version: '2.0.0',
      sourceRepository: 'https://github.com/yhj1024/manseryeok',
    });
  });

  test('keeps snapshot identity stable when only createdAt changes', () => {
    const input: BirthInput = {
      calendarType: 'solar',
      date: { year: 1992, month: 10, day: 24 },
      time: { known: true, hour: 5, minute: 30 },
      sexForTraditionalCalculation: 'unspecified',
    };

    const first = calculateCanonicalSajuSnapshot(input, policy(), {
      now: new Date('2026-08-19T00:00:00.000Z'),
    });
    const second = calculateCanonicalSajuSnapshot(input, policy(), {
      now: new Date('2026-08-20T00:00:00.000Z'),
    });

    expect(first.snapshotId).toBe(second.snapshotId);
    expect(first.calculationHash).toBe(second.calculationHash);
    expect(first.createdAt).not.toBe(second.createdAt);
  });
});

describe('manseryeok adapter — unknown time', () => {
  test('does not fabricate an hour on a non-boundary date', () => {
    const input: BirthInput = {
      calendarType: 'solar',
      date: { year: 1992, month: 10, day: 24 },
      time: { known: false },
      sexForTraditionalCalculation: 'unspecified',
    };

    const snapshot = calculateCanonicalSajuSnapshot(input, policy());

    expect(snapshot.pillars.year.status).toBe('resolved');
    expect(snapshot.pillars.month.status).toBe('resolved');
    expect(snapshot.pillars.day.status).toBe('resolved');
    expect(snapshot.pillars.hour).toEqual({
      status: 'unavailable',
      reasonCode: 'birth-time-unknown',
    });
    expect(snapshot.normalized.clockTime.status).toBe('unavailable');
    expect(snapshot.scenarios).toHaveLength(0);
  });

  test('propagates a jasi day-boundary ambiguity instead of picking a day pillar', () => {
    const input: BirthInput = {
      calendarType: 'solar',
      date: { year: 1992, month: 10, day: 24 },
      time: { known: false },
      sexForTraditionalCalculation: 'unspecified',
    };

    const snapshot = calculateCanonicalSajuSnapshot(
      input,
      policy({ dayBoundary: 'jasi' }),
    );

    expect(snapshot.pillars.day.status).toBe('ambiguous');
    expect(snapshot.derivedFacts.dayMaster.status === 'resolved' || snapshot.derivedFacts.dayMaster.status === 'ambiguous').toBe(true);
    expect(snapshot.scenarios.length).toBeGreaterThan(1);
    expect(snapshot.completeness.ambiguousPaths).toContain('pillars.day');
  });

  test('preserves Lichun-day year/month ambiguity when birth time is unknown', () => {
    const input: BirthInput = {
      calendarType: 'solar',
      date: { year: 2024, month: 2, day: 4 },
      time: { known: false },
      sexForTraditionalCalculation: 'unspecified',
    };

    const snapshot = calculateCanonicalSajuSnapshot(input, policy());

    expect(snapshot.pillars.year.status).toBe('ambiguous');
    expect(snapshot.pillars.month.status).toBe('ambiguous');
    expect(snapshot.scenarios.length).toBeGreaterThan(1);
  });
});

describe('manseryeok adapter — policy boundary', () => {
  test('rejects unsupported non-Seoul timezone instead of silently reinterpreting input', () => {
    const input: BirthInput = {
      calendarType: 'solar',
      date: { year: 1992, month: 10, day: 24 },
      time: { known: true, hour: 5, minute: 30 },
      sexForTraditionalCalculation: 'male',
    };

    expect(() =>
      calculateCanonicalSajuSnapshot(
        input,
        policy({
          timeZonePolicy: {
            source: 'manual',
            timeZone: 'Asia/Tokyo',
          },
        }),
      ),
    ).toThrow(RangeError);
  });

  test('requires birthplace longitude when that true-solar-time source is selected', () => {
    const input: BirthInput = {
      calendarType: 'solar',
      date: { year: 1992, month: 10, day: 24 },
      time: { known: true, hour: 5, minute: 30 },
      sexForTraditionalCalculation: 'male',
      birthplace: { timeZone: 'Asia/Seoul' },
    };

    expect(() =>
      calculateCanonicalSajuSnapshot(
        input,
        policy({
          trueSolarTime: {
            enabled: true,
            longitudeSource: 'birthplace',
            applyEquationOfTime: true,
            applyHistoricalDst: true,
          },
        }),
      ),
    ).toThrow(RangeError);
  });
});
