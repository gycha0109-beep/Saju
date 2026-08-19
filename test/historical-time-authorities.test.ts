import { describe, expect, test } from 'vitest';
import {
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

  test('transition fixtures cite both a Korean primary legal source and IANA software reference', () => {
    const sources = new Map(
      Object.values(HISTORICAL_TIME_AUTHORITY_SOURCES).map((source) => [source.sourceId, source]),
    );
    for (const fixture of [
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
