import { describe, expect, it } from 'vitest';
import {
  resolveAnnualLichunCycleCandidate,
  type AnnualLichunCycleBoundaries,
} from '../src/reading/annual-lichun-cycle-candidate.js';

// Synthetic fixture, not a claim of official 2026/2027 LiChun publication.
const FIXTURES: AnnualLichunCycleBoundaries = {
  start: {
    year: 2026,
    instantUtc: '2026-02-03T20:02:00.000Z',
    precision: 'minute',
    sourceRef: 'test-start-not-authoritative',
    sourceVersion: 'synthetic-v1',
    verification: 'owner_verified_primary',
  },
  end: {
    year: 2027,
    instantUtc: '2027-02-04T01:46:00.000Z',
    precision: 'minute',
    sourceRef: 'test-end-not-authoritative',
    sourceVersion: 'synthetic-v1',
    verification: 'owner_verified_primary',
  },
};

describe('D2-B whole traditional LiChun year-cycle candidate (research only)', () => {
  it('requires two qualified boundaries and retains precise uncertainty windows', () => {
    expect(resolveAnnualLichunCycleCandidate(2026, FIXTURES)).toEqual({
      state: 'candidate',
      scope: 'traditional_lichun_year_cycle',
      displayYear: 2026,
      effectiveYear: 2026,
      annualPillar: { stem: '병', branch: '오', cycleIndex: 42 },
      startBoundary: {
        precision: 'minute',
        displayedMinuteUtc: '2026-02-03T20:02:00.000Z',
        earliestPossibleUtc: '2026-02-03T20:01:00.000Z',
        latestPossibleExclusiveUtc: '2026-02-03T20:03:00.000Z',
        sourceRef: 'test-start-not-authoritative',
        sourceVersion: 'synthetic-v1',
        exactInstantEstablished: false,
      },
      endBoundary: {
        precision: 'minute',
        displayedMinuteUtc: '2027-02-04T01:46:00.000Z',
        earliestPossibleUtc: '2027-02-04T01:45:00.000Z',
        latestPossibleExclusiveUtc: '2027-02-04T01:47:00.000Z',
        sourceRef: 'test-end-not-authoritative',
        sourceVersion: 'synthetic-v1',
        exactInstantEstablished: false,
      },
      exactEffectiveIntervalEstablished: false,
      mayGenerateAnnualInterpretation: false,
      productionAuthorized: false,
    });
  });

  it('does not replace a missing second year boundary with an assumed +365 days', () => {
    expect(resolveAnnualLichunCycleCandidate(2026)).toMatchObject({
      state: 'unavailable',
      reasonCode: 'BOTH_BOUNDARIES_REQUIRED',
      productionAuthorized: false,
    });
    expect(resolveAnnualLichunCycleCandidate(2026, {
      start: FIXTURES.start,
      end: { ...FIXTURES.end, verification: 'unverified' },
    })).toMatchObject({
      state: 'unavailable',
      reasonCode: 'END_BOUNDARY_UNAVAILABLE',
      boundaryReasonCode: 'BOUNDARY_EVIDENCE_UNVERIFIED',
      productionAuthorized: false,
    });
  });

  it('rejects mismatched and non-LiChun boundary dates', () => {
    expect(resolveAnnualLichunCycleCandidate(2026, {
      start: { ...FIXTURES.start, year: 2025 },
      end: FIXTURES.end,
    })).toMatchObject({
      state: 'unavailable',
      reasonCode: 'START_BOUNDARY_UNAVAILABLE',
      boundaryReasonCode: 'BOUNDARY_EVIDENCE_INVALID',
    });
    expect(resolveAnnualLichunCycleCandidate(2026, {
      start: FIXTURES.start,
      end: { ...FIXTURES.end, instantUtc: '2027-08-01T01:46:00.000Z' },
    })).toMatchObject({
      state: 'unavailable',
      reasonCode: 'END_BOUNDARY_UNAVAILABLE',
      boundaryReasonCode: 'BOUNDARY_EVIDENCE_INVALID',
    });
  });

  it('does not claim a precise interval until BOTH sources provide verified second precision', () => {
    const onlyStartExact = resolveAnnualLichunCycleCandidate(2026, {
      start: { ...FIXTURES.start, precision: 'second', instantUtc: '2026-02-03T20:02:27.000Z' },
      end: FIXTURES.end,
    });
    expect(onlyStartExact).toMatchObject({
      state: 'candidate',
      startBoundary: { precision: 'second', exactInstantEstablished: true },
      endBoundary: { precision: 'minute', exactInstantEstablished: false },
      exactEffectiveIntervalEstablished: false,
    });

    const bothExact = resolveAnnualLichunCycleCandidate(2026, {
      start: { ...FIXTURES.start, precision: 'second', instantUtc: '2026-02-03T20:02:27.000Z' },
      end: { ...FIXTURES.end, precision: 'second', instantUtc: '2027-02-04T01:46:40.000Z' },
    });
    expect(bothExact).toMatchObject({
      state: 'candidate',
      scope: 'traditional_lichun_year_cycle',
      startBoundary: { exactInstantUtc: '2026-02-03T20:02:27.000Z' },
      endBoundary: { exactInstantUtc: '2027-02-04T01:46:40.000Z' },
      exactEffectiveIntervalEstablished: true,
      mayGenerateAnnualInterpretation: false,
      productionAuthorized: false,
    });
  });

  it('never accepts invalid years or a missing following year', () => {
    for (const year of [1, 2026.5, Number.NaN, 9999, 10000]) {
      expect(resolveAnnualLichunCycleCandidate(year, FIXTURES)).toMatchObject({
        state: 'unavailable',
        reasonCode: 'INVALID_TARGET_YEAR',
      });
    }
  });
});
