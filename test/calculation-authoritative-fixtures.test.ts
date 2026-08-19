import { describe, expect, test } from 'vitest';
import {
  calculateCanonicalSajuSnapshot,
  type CalculationPolicySnapshot,
  type FactState,
  type PillarFact,
} from '../src/index.js';
import {
  DEFAULT_CALCULATION_POLICY,
  IANA_1955_STANDARD_TIME_FIXTURE,
  IANA_1988_DST_FIXTURE,
  KASI_2024_LICHUN_FIXTURE,
  KASI_2024_LUNAR_NEW_YEAR_FIXTURE,
  UPSTREAM_1992_GOLDEN_FIXTURE,
} from './fixtures/calculation-fixtures.js';

function trueSolarPolicy(applyHistoricalDst: boolean): CalculationPolicySnapshot {
  return {
    ...DEFAULT_CALCULATION_POLICY,
    trueSolarTime: {
      enabled: true,
      longitudeSource: 'manual',
      longitude: 126.978,
      applyEquationOfTime: true,
      applyHistoricalDst,
    },
  };
}

function pillarText(state: FactState<PillarFact>): string {
  if (state.status !== 'resolved') {
    throw new Error(`expected resolved pillar but got ${state.status}`);
  }
  return `${state.value.stem.value}${state.value.branch.value}`;
}

function hourBranch(state: FactState<PillarFact>): string {
  if (state.status !== 'resolved') {
    throw new Error(`expected resolved hour pillar but got ${state.status}`);
  }
  return state.value.branch.value;
}

describe('provenance-aware calculation fixtures', () => {
  test(KASI_2024_LUNAR_NEW_YEAR_FIXTURE.fixtureId, () => {
    const snapshot = calculateCanonicalSajuSnapshot(
      KASI_2024_LUNAR_NEW_YEAR_FIXTURE.input,
      DEFAULT_CALCULATION_POLICY,
    );

    expect(snapshot.normalized.solarDate).toEqual({
      status: 'resolved',
      value: KASI_2024_LUNAR_NEW_YEAR_FIXTURE.expectedSolarDate,
    });
  });

  test(KASI_2024_LICHUN_FIXTURE.fixtureId, () => {
    const snapshot = calculateCanonicalSajuSnapshot(
      KASI_2024_LICHUN_FIXTURE.input,
      DEFAULT_CALCULATION_POLICY,
    );

    expect(snapshot.solarTermContext?.lichun?.name).toBe(KASI_2024_LICHUN_FIXTURE.expected.name);
    expect(snapshot.solarTermContext?.lichun?.localDateTime).toBe(
      KASI_2024_LICHUN_FIXTURE.expected.localDateTime,
    );
    expect(snapshot.solarTermContext?.next?.name).toBe('입춘');
  });

  test(IANA_1955_STANDARD_TIME_FIXTURE.fixtureId, () => {
    const withHistorical = calculateCanonicalSajuSnapshot(
      IANA_1955_STANDARD_TIME_FIXTURE.input,
      trueSolarPolicy(true),
    );
    const fixedKst = calculateCanonicalSajuSnapshot(
      IANA_1955_STANDARD_TIME_FIXTURE.input,
      trueSolarPolicy(false),
    );

    expect(hourBranch(withHistorical.pillars.hour)).toBe(
      IANA_1955_STANDARD_TIME_FIXTURE.expected.historicalHourBranch,
    );
    expect(hourBranch(fixedKst.pillars.hour)).toBe(
      IANA_1955_STANDARD_TIME_FIXTURE.expected.fixedKstHourBranch,
    );
  });

  test(IANA_1988_DST_FIXTURE.fixtureId, () => {
    const withHistorical = calculateCanonicalSajuSnapshot(
      IANA_1988_DST_FIXTURE.input,
      trueSolarPolicy(true),
    );
    const withoutHistorical = calculateCanonicalSajuSnapshot(
      IANA_1988_DST_FIXTURE.input,
      trueSolarPolicy(false),
    );

    expect(hourBranch(withHistorical.pillars.hour)).toBe(
      IANA_1988_DST_FIXTURE.expected.historicalHourBranch,
    );
    expect(hourBranch(withoutHistorical.pillars.hour)).toBe(
      IANA_1988_DST_FIXTURE.expected.noHistoricalHourBranch,
    );
  });

  test(UPSTREAM_1992_GOLDEN_FIXTURE.fixtureId, () => {
    const snapshot = calculateCanonicalSajuSnapshot(
      UPSTREAM_1992_GOLDEN_FIXTURE.input,
      DEFAULT_CALCULATION_POLICY,
    );

    expect([
      pillarText(snapshot.pillars.year),
      pillarText(snapshot.pillars.month),
      pillarText(snapshot.pillars.day),
      pillarText(snapshot.pillars.hour),
    ]).toEqual([...UPSTREAM_1992_GOLDEN_FIXTURE.expectedPillars]);
  });
});
