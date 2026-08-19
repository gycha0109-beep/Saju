import { describe, expect, test } from 'vitest';
import {
  MyeonghwaCalculationError,
  calculateCanonicalSajuSnapshot,
  type BirthInput,
  type CalculationPolicySnapshot,
  type FactState,
  type PillarFact,
} from '../src/index.js';
import {
  HISTORICAL_TIME_AUTHORITY_SOURCES,
  KOREA_1954_STANDARD_TIME_TRANSITION_FIXTURE,
  KOREA_1961_STANDARD_TIME_TRANSITION_FIXTURE,
  PRE_1908_HISTORICAL_TIME_UNSUPPORTED_FIXTURE,
} from './fixtures/historical-time-authorities.js';

function policy(applyHistoricalDst: boolean): CalculationPolicySnapshot {
  return {
    policyId: `myeonghwa/i3-historical-${applyHistoricalDst ? 'historical' : 'fixed-kst'}`,
    policyVersion: '1.0.0',
    dayBoundary: 'midnight',
    trueSolarTime: {
      enabled: true,
      longitudeSource: 'manual',
      longitude: 135,
      applyEquationOfTime: false,
      applyHistoricalDst,
    },
    timeZonePolicy: { source: 'service-default', timeZone: 'Asia/Seoul' },
    unknownBirthTimePolicy: 'preserve-unknown-and-enumerate-boundaries',
  };
}

function hourBranch(input: BirthInput, applyHistoricalDst: boolean): string {
  const snapshot = calculateCanonicalSajuSnapshot(input, policy(applyHistoricalDst));
  const hour = snapshot.pillars.hour as FactState<PillarFact>;
  if (hour.status !== 'resolved') throw new Error(`expected resolved hour pillar, got ${hour.status}`);
  return hour.value.branch.value;
}

describe('Korean historical standard-time primary-source fixtures', () => {
  test('pre-1908 historical correction fails closed rather than using upstream UTC+09 fallback', () => {
    const fixture = PRE_1908_HISTORICAL_TIME_UNSUPPORTED_FIXTURE;
    try {
      calculateCanonicalSajuSnapshot(fixture.input, policy(true));
      throw new Error('expected calculation to reject unsupported pre-1908 historical correction');
    } catch (error) {
      expect(error).toBeInstanceOf(MyeonghwaCalculationError);
      if (!(error instanceof MyeonghwaCalculationError)) throw error;
      expect(error.code).toBe(fixture.expectedErrorCode);
      expect(error.message).toContain('1908-04-01');
    }
  });

  test('1954 legal transition agrees with IANA and crosses the isolated hour boundary', () => {
    const fixture = KOREA_1954_STANDARD_TIME_TRANSITION_FIXTURE;
    expect(hourBranch(fixture.before, true)).toBe(fixture.expected.beforeHistoricalHourBranch);
    expect(hourBranch(fixture.after, true)).toBe(fixture.expected.afterHistoricalHourBranch);
    expect(hourBranch(fixture.after, false)).toBe(fixture.expected.afterFixedKstHourBranch);
  });

  test('1961 legal transition agrees with IANA and removes the +08:30 boundary shift', () => {
    const fixture = KOREA_1961_STANDARD_TIME_TRANSITION_FIXTURE;
    expect(hourBranch(fixture.before, true)).toBe(fixture.expected.beforeHistoricalHourBranch);
    expect(hourBranch(fixture.before, false)).toBe(fixture.expected.beforeFixedKstHourBranch);
    expect(hourBranch(fixture.after, true)).toBe(fixture.expected.afterHistoricalHourBranch);
    expect(hourBranch(fixture.after, false)).toBe(fixture.expected.afterFixedKstHourBranch);
  });

  test('historical authority fixtures cite Korean primary legal and IANA software references', () => {
    const sources = new Map(
      Object.values(HISTORICAL_TIME_AUTHORITY_SOURCES).map((source) => [source.sourceId, source]),
    );
    for (const fixture of [
      PRE_1908_HISTORICAL_TIME_UNSUPPORTED_FIXTURE,
      KOREA_1954_STANDARD_TIME_TRANSITION_FIXTURE,
      KOREA_1961_STANDARD_TIME_TRANSITION_FIXTURE,
    ]) {
      const authorities = fixture.provenance.sourceIds.map((sourceId) => sources.get(sourceId));
      expect(authorities.every((source) => source !== undefined)).toBe(true);
      expect(authorities.some((source) => source?.authorityKind === 'primary_legal_reference')).toBe(true);
      expect(authorities.some((source) => source?.authorityKind === 'primary_software_reference')).toBe(true);
    }
  });
});
