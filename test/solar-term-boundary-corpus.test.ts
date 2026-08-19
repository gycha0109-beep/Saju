import { describe, expect, test } from 'vitest';
import {
  calculateCanonicalSajuSnapshot,
  type BirthInput,
  type CalculationPolicySnapshot,
  type FactState,
  type PillarFact,
} from '../src/index.js';
import {
  KASI_2024_MONTHLY_JIE_FIXTURES,
  KASI_CALENDAR_DATA_SOURCE,
  KASI_LICHUN_2021_2026_FIXTURES,
  type InstitutionalSolarTermFixture,
} from './fixtures/institutional-solar-term-fixtures.js';

const policy: CalculationPolicySnapshot = {
  policyId: 'myeonghwa/i3-solar-term-boundary',
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

function shiftedInput(fixture: InstitutionalSolarTermFixture, deltaMinutes: number): BirthInput {
  const shifted = new Date(
    Date.UTC(
      fixture.year,
      fixture.month - 1,
      fixture.day,
      fixture.hour,
      fixture.minute + deltaMinutes,
    ),
  );
  return {
    calendarType: 'solar',
    date: {
      year: shifted.getUTCFullYear(),
      month: shifted.getUTCMonth() + 1,
      day: shifted.getUTCDate(),
    },
    time: { known: true, hour: shifted.getUTCHours(), minute: shifted.getUTCMinutes() },
    sexForTraditionalCalculation: 'unspecified',
  };
}

function pillarText(state: FactState<PillarFact>): string {
  if (state.status !== 'resolved') throw new Error(`expected resolved pillar, got ${state.status}`);
  return `${state.value.stem.value}${state.value.branch.value}`;
}

function expectedLocalDateTime(fixture: InstitutionalSolarTermFixture): string {
  const pad = (value: number) => String(value).padStart(2, '0');
  return `${fixture.year}-${pad(fixture.month)}-${pad(fixture.day)}T${pad(fixture.hour)}:${pad(fixture.minute)}`;
}

describe('Tier B KASI Lichun boundary corpus', () => {
  test('source remains explicitly non-official Tier B', () => {
    expect(KASI_CALENDAR_DATA_SOURCE.sourceTier).toBe('B');
    expect(KASI_CALENDAR_DATA_SOURCE.authorityClass).toBe('primary_institution_reference');
    expect(KASI_CALENDAR_DATA_SOURCE.limitation).toContain('not the official announcement');
  });

  for (const fixture of KASI_LICHUN_2021_2026_FIXTURES) {
    test(fixture.fixtureId, () => {
      const before = calculateCanonicalSajuSnapshot(shiftedInput(fixture, -1), policy);
      const after = calculateCanonicalSajuSnapshot(shiftedInput(fixture, 1), policy);

      expect(before.solarTermContext?.lichun?.localDateTime).toBe(expectedLocalDateTime(fixture));
      expect(after.solarTermContext?.lichun?.localDateTime).toBe(expectedLocalDateTime(fixture));
      expect(before.solarTermContext?.next?.name).toBe('입춘');
      expect(after.solarTermContext?.previous?.name).toBe('입춘');
      expect(pillarText(before.pillars.year)).not.toBe(pillarText(after.pillars.year));
      expect(pillarText(before.pillars.month)).not.toBe(pillarText(after.pillars.month));
    });
  }
});

describe('Tier B KASI 2024 monthly jie boundary corpus', () => {
  for (const fixture of KASI_2024_MONTHLY_JIE_FIXTURES) {
    test(fixture.fixtureId, () => {
      const before = calculateCanonicalSajuSnapshot(shiftedInput(fixture, -1), policy);
      const after = calculateCanonicalSajuSnapshot(shiftedInput(fixture, 1), policy);

      expect(before.solarTermContext?.next?.name).toBe(fixture.name);
      expect(after.solarTermContext?.previous?.name).toBe(fixture.name);
      expect(pillarText(before.pillars.month)).not.toBe(pillarText(after.pillars.month));
    });
  }
});
