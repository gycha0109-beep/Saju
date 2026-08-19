import { describe, expect, test } from 'vitest';
import {
  buildCalculationPolicyProfiles,
  runCalculationPolicySensitivity,
  type BirthInput,
} from '../src/index.js';

function baseInput(overrides: Partial<BirthInput> = {}): BirthInput {
  return {
    calendarType: 'solar',
    date: { year: 2024, month: 3, day: 10 },
    time: { known: true, hour: 12, minute: 0 },
    sexForTraditionalCalculation: 'unspecified',
    ...overrides,
  };
}

describe('calculation policy profiles', () => {
  test('engineering reference is not authorized as a production default', () => {
    const profiles = buildCalculationPolicyProfiles(baseInput());
    expect(profiles).toHaveLength(6);
    expect(profiles.every((profile) => profile.productionDefaultAuthorized === false)).toBe(true);

    const reference = profiles.find((profile) => profile.role === 'engineering_reference');
    expect(reference?.profileId).toBe('civil-midnight-reference-v1');
    expect(reference?.clockBasis).toBe('civil_time');
    expect(reference?.dayBoundary).toBe('midnight');
  });

  test('solar-time profiles fail availability rather than silently assuming a longitude', () => {
    const profiles = buildCalculationPolicyProfiles(baseInput());
    const solarProfiles = profiles.filter((profile) => profile.clockBasis === 'apparent_solar_time');
    expect(solarProfiles).toHaveLength(3);
    for (const profile of solarProfiles) {
      expect(profile.availability).toEqual({
        status: 'unavailable',
        reasonCode: 'BIRTHPLACE_LONGITUDE_REQUIRED',
      });
    }

    const report = runCalculationPolicySensitivity(baseInput());
    expect(report.calculatedProfileCount).toBe(3);
    expect(report.distinctSemanticChartCount).toBe(1);
    expect(report.materiallySensitive).toBe(false);
  });

  test('23:30 civil-time birth exposes day-boundary material sensitivity', () => {
    const report = runCalculationPolicySensitivity(
      baseInput({ time: { known: true, hour: 23, minute: 30 } }),
    );

    expect(report.materiallySensitive).toBe(true);
    expect(report.distinctSemanticChartCount).toBeGreaterThan(1);
    expect(report.materialAffectedPaths).toContain('pillars.day');
    expect(report.materialAffectedPaths).toContain('pillars.hour');

    const jasi = report.results.find(
      (result) => result.profile.profileId === 'civil-jasi-sensitivity-v1',
    );
    const split = report.results.find(
      (result) => result.profile.profileId === 'civil-split-jasi-sensitivity-v1',
    );
    expect(jasi?.status).toBe('calculated');
    expect(split?.status).toBe('calculated');
  });

  test('birthplace longitude enables apparent-solar profiles and can expose an hour-pillar change', () => {
    const report = runCalculationPolicySensitivity({
      calendarType: 'solar',
      date: { year: 1990, month: 5, day: 15 },
      time: { known: true, hour: 7, minute: 5 },
      sexForTraditionalCalculation: 'unspecified',
      birthplace: {
        label: 'Seoul',
        longitude: 126.978,
        latitude: 37.5665,
        timeZone: 'Asia/Seoul',
      },
    });

    expect(report.calculatedProfileCount).toBe(6);
    expect(report.materiallySensitive).toBe(true);
    expect(report.materialAffectedPaths).toContain('pillars.hour');

    const solar = report.results.find(
      (result) => result.profile.profileId === 'solar-midnight-sensitivity-v1',
    );
    expect(solar?.status).toBe('calculated');
    if (solar?.status === 'calculated') {
      expect(solar.affectedPathsFromReference).toContain('pillars.hour');
    }
  });

  test('pre-1908 apparent-solar historical profiles are rejected without invalidating civil profiles', () => {
    const report = runCalculationPolicySensitivity({
      calendarType: 'solar',
      date: { year: 1907, month: 12, day: 1 },
      time: { known: true, hour: 12, minute: 0 },
      sexForTraditionalCalculation: 'unspecified',
      birthplace: { longitude: 126.978, timeZone: 'Asia/Seoul' },
    });

    const civil = report.results.filter((result) => result.profile.clockBasis === 'civil_time');
    const solar = report.results.filter(
      (result) => result.profile.clockBasis === 'apparent_solar_time',
    );

    expect(civil.every((result) => result.status === 'calculated')).toBe(true);
    expect(
      solar.every(
        (result) => result.status === 'rejected' && result.errorCode === 'UNSUPPORTED_POLICY',
      ),
    ).toBe(true);
  });
});
