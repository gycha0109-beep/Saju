import { describe, expect, it } from 'vitest';
import type { ReadingRequest } from '../src/contracts/reading.js';
import {
  resolveAnnualLichunPeriodCandidate,
  type AnnualLichunBoundaryEvidence,
} from '../src/reading/annual-lichun-period-candidate.js';
import { buildTemporalReadingContext } from '../src/reading/temporal-reading-context.js';

// A synthetic test boundary, NOT an asserted astronomical or official instant.
const TEST_BOUNDARY: AnnualLichunBoundaryEvidence = {
  year: 2026,
  instantUtc: '2026-02-03T20:02:00.000Z',
  precision: 'minute',
  sourceRef: 'test-fixture-not-a-government-source',
  sourceVersion: 'test-v1',
  verification: 'owner_verified_primary',
};

function assertCandidate(
  result: ReturnType<typeof resolveAnnualLichunPeriodCandidate>,
  effectiveYear: number,
  stem: string,
  branch: string,
): void {
  expect(result.state).toBe('candidate');
  if (result.state !== 'candidate') throw new Error('expected an isolated period candidate');
  expect(result.displayYear).toBe(2026);
  expect(result.effectiveYear).toBe(effectiveYear);
  expect(result.effectiveAnnualPillar).toMatchObject({ stem, branch });
  expect(result.productionAuthorized).toBe(false);
}

describe('D2-B source-gated LiChun annual-period candidate (not production)', () => {
  it('uses the prior pillar before a hypothetical LiChun and the new pillar afterward', () => {
    assertCandidate(
      resolveAnnualLichunPeriodCandidate(2026, '2026-01-15T12:00:00+09:00', TEST_BOUNDARY),
      2025,
      '을',
      '사',
    );
    assertCandidate(
      resolveAnnualLichunPeriodCandidate(2026, '2026-02-04T05:01:59+09:00', TEST_BOUNDARY),
      2025,
      '을',
      '사',
    );
    assertCandidate(
      resolveAnnualLichunPeriodCandidate(2026, '2026-02-04T05:03:00+09:00', TEST_BOUNDARY),
      2026,
      '병',
      '오',
    );
  });

  it('does not invent an exact second within a minute-precision boundary', () => {
    for (const instant of [
      '2026-02-04T05:02:00+09:00',
      '2026-02-04T05:02:01+09:00',
      '2026-02-04T05:02:59.999+09:00',
    ]) {
      expect(resolveAnnualLichunPeriodCandidate(2026, instant, TEST_BOUNDARY)).toEqual({
        state: 'unavailable',
        displayYear: 2026,
        reasonCode: 'BOUNDARY_MINUTE_AMBIGUOUS',
        productionAuthorized: false,
      });
    }
  });

  it('resolves at an exact second only with independently supplied second-level evidence', () => {
    const exact = {
      ...TEST_BOUNDARY,
      instantUtc: '2026-02-03T20:02:27.000Z',
      precision: 'second' as const,
    };
    assertCandidate(
      resolveAnnualLichunPeriodCandidate(2026, '2026-02-04T05:02:26+09:00', exact),
      2025,
      '을',
      '사',
    );
    assertCandidate(
      resolveAnnualLichunPeriodCandidate(2026, '2026-02-04T05:02:27+09:00', exact),
      2026,
      '병',
      '오',
    );
  });

  it('rejects absent, unverified, mismatched, or malformed evidence', () => {
    const instant = '2026-02-04T05:03:00+09:00';
    expect(resolveAnnualLichunPeriodCandidate(2026, instant)).toMatchObject({
      state: 'unavailable',
      reasonCode: 'BOUNDARY_EVIDENCE_REQUIRED',
    });
    expect(
      resolveAnnualLichunPeriodCandidate(2026, instant, {
        ...TEST_BOUNDARY,
        verification: 'unverified',
      }),
    ).toMatchObject({ state: 'unavailable', reasonCode: 'BOUNDARY_EVIDENCE_UNVERIFIED' });
    expect(
      resolveAnnualLichunPeriodCandidate(2026, instant, { ...TEST_BOUNDARY, year: 2025 }),
    ).toMatchObject({ state: 'unavailable', reasonCode: 'BOUNDARY_EVIDENCE_INVALID' });
    expect(
      resolveAnnualLichunPeriodCandidate(2026, instant, {
        ...TEST_BOUNDARY,
        instantUtc: '2026-02-03T20:02:12.000Z',
      }),
    ).toMatchObject({ state: 'unavailable', reasonCode: 'BOUNDARY_EVIDENCE_INVALID' });
    expect(
      resolveAnnualLichunPeriodCandidate(2026, instant, { ...TEST_BOUNDARY, sourceRef: '' }),
    ).toMatchObject({ state: 'unavailable', reasonCode: 'BOUNDARY_EVIDENCE_INVALID' });
  });

  it('normalizes equivalent UTC and Korean-offset instants without changing results', () => {
    const kst = resolveAnnualLichunPeriodCandidate(
      2026,
      '2026-02-04T05:03:00+09:00',
      TEST_BOUNDARY,
    );
    const utc = resolveAnnualLichunPeriodCandidate(
      2026,
      '2026-02-03T20:03:00.000Z',
      TEST_BOUNDARY,
    );
    expect(kst).toEqual(utc);
  });

  it('rejects implicit timezone, invalid date, and Seoul calendar year mismatch', () => {
    expect(
      resolveAnnualLichunPeriodCandidate(2026, '2026-01-15T12:00:00', TEST_BOUNDARY),
    ).toMatchObject({ state: 'unavailable', reasonCode: 'INVALID_REFERENCE_INSTANT' });
    expect(
      resolveAnnualLichunPeriodCandidate(2026, 'no-date', TEST_BOUNDARY),
    ).toMatchObject({ state: 'unavailable', reasonCode: 'INVALID_REFERENCE_INSTANT' });
    expect(
      resolveAnnualLichunPeriodCandidate(2026, '2026-02-30T12:00:00+09:00', TEST_BOUNDARY),
    ).toMatchObject({ state: 'unavailable', reasonCode: 'INVALID_REFERENCE_INSTANT' });
    expect(
      resolveAnnualLichunPeriodCandidate(2025, '2026-01-15T12:00:00+09:00', TEST_BOUNDARY),
    ).toMatchObject({ state: 'unavailable', reasonCode: 'DISPLAY_YEAR_MISMATCH' });
  });

  it('never mutates the legacy Monthly shared helper or research authority', () => {
    const request: ReadingRequest = {
      requestId: 'monthly-unchanged',
      intent: { domain: 'general', temporalScope: 'monthly' },
      targetPeriod: {
        scope: 'monthly',
        year: 2026,
        month: 1,
        timeZone: 'Asia/Seoul',
        referenceDateTime: '2026-01-15T03:00:00.000Z',
        resolution: 'relative_current',
      },
    };
    const monthly = buildTemporalReadingContext(request);
    expect(monthly).toMatchObject({
      scope: 'monthly',
      targetYear: 2026,
      annualPillar: { stem: '병', branch: '오' },
    });
    const conditionalAnnual = resolveAnnualLichunPeriodCandidate(
      2026,
      '2026-01-15T12:00:00+09:00',
      TEST_BOUNDARY,
    );
    expect(conditionalAnnual).toMatchObject({
      state: 'candidate',
      effectiveAnnualPillar: { stem: '을', branch: '사' },
      productionAuthorized: false,
    });
  });
});
