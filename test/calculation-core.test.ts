import { describe, expect, test } from 'vitest';
import {
  calculateCanonicalSajuSnapshot,
  type BirthInput,
  type CalculationPolicySnapshot,
  type FactState,
  type PillarFact,
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

function trueSolarPolicy(
  applyHistoricalDst: boolean,
  longitude = 126.978,
): CalculationPolicySnapshot {
  return policy({
    trueSolarTime: {
      enabled: true,
      longitudeSource: 'manual',
      longitude,
      applyEquationOfTime: true,
      applyHistoricalDst,
    },
  });
}

function pillarText(state: FactState<PillarFact>): string {
  if (state.status !== 'resolved') {
    throw new Error(`expected resolved pillar but got ${state.status}`);
  }
  return `${state.value.stem.value}${state.value.branch.value}`;
}

function pillarBranch(state: FactState<PillarFact>): string {
  if (state.status !== 'resolved') {
    throw new Error(`expected resolved pillar but got ${state.status}`);
  }
  return state.value.branch.value;
}

describe('calculation core — known time', () => {
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

  test('preserves missing traditional sex as unavailable luck-cycle data', () => {
    const snapshot = calculateCanonicalSajuSnapshot(
      {
        calendarType: 'solar',
        date: { year: 1992, month: 10, day: 24 },
        time: { known: true, hour: 5, minute: 30 },
        sexForTraditionalCalculation: 'unspecified',
      },
      policy(),
    );

    expect(snapshot.luckCycle).toEqual({
      status: 'unavailable',
      reasonCode: 'traditional-sex-not-provided',
    });
  });
});

describe('calculation core — lunar calendar', () => {
  test('maps an upstream lunar golden fixture', () => {
    const snapshot = calculateCanonicalSajuSnapshot(
      {
        calendarType: 'lunar',
        date: { year: 2006, month: 8, day: 20 },
        isLeapMonth: false,
        time: { known: true, hour: 6, minute: 38 },
        sexForTraditionalCalculation: 'unspecified',
      },
      policy(),
    );

    expect(pillarText(snapshot.pillars.year)).toBe('병술');
    expect(pillarText(snapshot.pillars.month)).toBe('무술');
    expect(pillarText(snapshot.pillars.day)).toBe('계유');
    expect(pillarText(snapshot.pillars.hour)).toBe('을묘');
    expect(snapshot.normalized.solarDate).toMatchObject({ status: 'resolved' });
    expect(snapshot.normalized.lunarDate).toEqual({
      status: 'resolved',
      value: { year: 2006, month: 8, day: 20, isLeapMonth: false },
    });
  });

  test('leap-lunar input produces the same pillars as its equivalent solar date', () => {
    const lunar = calculateCanonicalSajuSnapshot(
      {
        calendarType: 'lunar',
        date: { year: 2020, month: 4, day: 1 },
        isLeapMonth: true,
        time: { known: true, hour: 12, minute: 0 },
        sexForTraditionalCalculation: 'unspecified',
      },
      policy(),
    );
    const solar = calculateCanonicalSajuSnapshot(
      {
        calendarType: 'solar',
        date: { year: 2020, month: 5, day: 23 },
        time: { known: true, hour: 12, minute: 0 },
        sexForTraditionalCalculation: 'unspecified',
      },
      policy(),
    );

    expect(lunar.normalized.solarDate).toEqual({
      status: 'resolved',
      value: { year: 2020, month: 5, day: 23 },
    });
    expect(lunar.pillars).toEqual(solar.pillars);
  });
});

describe('calculation core — day boundary policies', () => {
  const input: BirthInput = {
    calendarType: 'solar',
    date: { year: 2024, month: 3, day: 10 },
    time: { known: true, hour: 23, minute: 30 },
    sexForTraditionalCalculation: 'unspecified',
  };

  test('preserves all three upstream jasi methodologies without collapsing them', () => {
    const midnight = calculateCanonicalSajuSnapshot(input, policy({ dayBoundary: 'midnight' }));
    const jasi = calculateCanonicalSajuSnapshot(input, policy({ dayBoundary: 'jasi' }));
    const split = calculateCanonicalSajuSnapshot(input, policy({ dayBoundary: 'splitJasi' }));

    expect([pillarText(midnight.pillars.day), pillarText(midnight.pillars.hour)]).toEqual([
      '계유',
      '임자',
    ]);
    expect([pillarText(jasi.pillars.day), pillarText(jasi.pillars.hour)]).toEqual([
      '갑술',
      '갑자',
    ]);
    expect([pillarText(split.pillars.day), pillarText(split.pillars.hour)]).toEqual([
      '계유',
      '갑자',
    ]);
  });
});

describe('calculation core — true solar time and historical civil time', () => {
  test('true solar time can move a birth across a two-hour branch boundary', () => {
    const input: BirthInput = {
      calendarType: 'solar',
      date: { year: 1990, month: 5, day: 15 },
      time: { known: true, hour: 7, minute: 5 },
      sexForTraditionalCalculation: 'unspecified',
    };

    const off = calculateCanonicalSajuSnapshot(input, policy());
    const on = calculateCanonicalSajuSnapshot(input, trueSolarPolicy(true));

    expect(pillarBranch(off.pillars.hour)).toBe('진');
    expect(pillarBranch(on.pillars.hour)).toBe('묘');
    expect(on.normalized.correctedSolarTime).toEqual({
      status: 'unavailable',
      reasonCode: 'upstream-corrected-time-not-exposed',
    });
  });

  test('1988 DST treatment changes a boundary-sensitive hour pillar', () => {
    const input: BirthInput = {
      calendarType: 'solar',
      date: { year: 1988, month: 8, day: 15 },
      time: { known: true, hour: 9, minute: 50 },
      sexForTraditionalCalculation: 'unspecified',
    };

    const withHistorical = calculateCanonicalSajuSnapshot(input, trueSolarPolicy(true));
    const withoutHistorical = calculateCanonicalSajuSnapshot(input, trueSolarPolicy(false));

    expect(pillarBranch(withHistorical.pillars.hour)).toBe('진');
    expect(pillarBranch(withoutHistorical.pillars.hour)).toBe('사');
    expect(pillarText(withHistorical.pillars.hour)).not.toBe(
      pillarText(withoutHistorical.pillars.hour),
    );
  });

  test('1955 historical +08:30 standard time can change a boundary-sensitive hour pillar', () => {
    const input: BirthInput = {
      calendarType: 'solar',
      date: { year: 1955, month: 1, day: 15 },
      time: { known: true, hour: 9, minute: 15 },
      sexForTraditionalCalculation: 'unspecified',
    };

    const withHistorical = calculateCanonicalSajuSnapshot(input, trueSolarPolicy(true));
    const withoutHistorical = calculateCanonicalSajuSnapshot(input, trueSolarPolicy(false));

    expect(pillarBranch(withHistorical.pillars.hour)).toBe('사');
    expect(pillarBranch(withoutHistorical.pillars.hour)).toBe('진');
  });
});

describe('calculation core — unknown time', () => {
  test('does not fabricate an hour on a non-boundary date', () => {
    const snapshot = calculateCanonicalSajuSnapshot(
      {
        calendarType: 'solar',
        date: { year: 1992, month: 10, day: 24 },
        time: { known: false },
        sexForTraditionalCalculation: 'unspecified',
      },
      policy(),
    );

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
    const snapshot = calculateCanonicalSajuSnapshot(
      {
        calendarType: 'solar',
        date: { year: 1992, month: 10, day: 24 },
        time: { known: false },
        sexForTraditionalCalculation: 'unspecified',
      },
      policy({ dayBoundary: 'jasi' }),
    );

    expect(snapshot.pillars.day.status).toBe('ambiguous');
    expect(
      snapshot.derivedFacts.dayMaster.status === 'resolved' ||
        snapshot.derivedFacts.dayMaster.status === 'ambiguous',
    ).toBe(true);
    expect(snapshot.scenarios.length).toBeGreaterThan(1);
    expect(snapshot.completeness.ambiguousPaths).toContain('pillars.day');
  });

  test('preserves Lichun-day year/month ambiguity when birth time is unknown', () => {
    const snapshot = calculateCanonicalSajuSnapshot(
      {
        calendarType: 'solar',
        date: { year: 2024, month: 2, day: 4 },
        time: { known: false },
        sexForTraditionalCalculation: 'unspecified',
      },
      policy(),
    );

    expect(snapshot.pillars.year.status).toBe('ambiguous');
    expect(snapshot.pillars.month.status).toBe('ambiguous');
    expect(snapshot.scenarios.length).toBeGreaterThan(1);
  });
});
