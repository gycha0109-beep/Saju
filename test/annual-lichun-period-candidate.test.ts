import { describe, expect, it } from 'vitest';
import type { ReadingRequest } from '../src/contracts/reading.js';
import {
  resolveAnnualLichunPeriodCandidate,
  type AnnualLichunBoundaryEvidence,
} from '../src/reading/annual-lichun-period-candidate.js';
import { buildTemporalReadingContext } from '../src/reading/temporal-reading-context.js';
import { resolveAnnualLichunRequestCandidate } from '../src/reading/annual-lichun-request-candidate.js';

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
      resolveAnnualLichunPeriodCandidate(2026, '2026-02-04T05:01:00+09:00', TEST_BOUNDARY),
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

  it('does not assign a pillar within one minute on either side of a minute-only boundary', () => {
    for (const instant of [
      '2026-02-04T05:01:01+09:00',
      '2026-02-04T05:01:59+09:00',
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

  it('keeps the before-side uncertainty interval consistent across UTC and Seoul time', () => {
    const result = resolveAnnualLichunPeriodCandidate(
      2026,
      '2026-02-03T20:01:59.000Z',
      TEST_BOUNDARY,
    );
    expect(result).toMatchObject({
      state: 'unavailable',
      reasonCode: 'BOUNDARY_MINUTE_AMBIGUOUS',
      productionAuthorized: false,
    });
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

  it('rejects a false LiChun claim outside the seasonal window even if flagged verified', () => {
    for (const instantUtc of [
      '2026-01-01T00:00:00.000Z',
      '2026-12-31T00:00:00.000Z',
      '2026-02-08T00:00:00.000Z',
    ]) {
      expect(
        resolveAnnualLichunPeriodCandidate(
          2026,
          '2026-02-04T12:00:00+09:00',
          { ...TEST_BOUNDARY, instantUtc },
        ),
      ).toMatchObject({
        state: 'unavailable',
        reasonCode: 'BOUNDARY_EVIDENCE_INVALID',
        productionAuthorized: false,
      });
    }
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

describe('D2-B isolated Annual request-instant binding (not a full annual reading)', () => {
  const annualRequest = (
    referenceDateTime: string,
    year = 2026,
  ): ReadingRequest => ({
    requestId: 'annual-request-candidate',
    intent: { domain: 'general', temporalScope: 'annual' },
    targetPeriod: {
      scope: 'annual',
      year,
      timeZone: 'Asia/Seoul',
      referenceDateTime,
      resolution: 'relative_current',
    },
  });

  it('binds the effective year to the request instant while retaining civil display year', () => {
    const request = annualRequest('2026-01-15T03:00:00.000Z');
    const output = resolveAnnualLichunRequestCandidate(request, TEST_BOUNDARY);
    expect(output).toMatchObject({
      state: 'candidate',
      requestId: request.requestId,
      context: {
        scope: 'annual_reference_instant',
        displayYear: 2026,
        effectiveYear: 2025,
        effectiveAnnualPillar: { stem: '을', branch: '사' },
        boundarySourceRef: TEST_BOUNDARY.sourceRef,
        boundarySourceVersion: TEST_BOUNDARY.sourceVersion,
        boundaryPrecision: 'minute',
      },
      productionAuthorized: false,
      constraints: {
        mayAuthorizeAnnualSemantics: false,
        mayUseAsWholeYearReading: false,
        mayChangeMonthlyContext: false,
        mayEnterProduction: false,
      },
    });
    expect(request.targetPeriod?.year).toBe(2026);
  });

  it('is isolated from Monthly and refuses accidental scope promotion', () => {
    const monthly: ReadingRequest = {
      requestId: 'monthly-not-annual',
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
    expect(resolveAnnualLichunRequestCandidate(monthly, TEST_BOUNDARY)).toMatchObject({
      state: 'unavailable',
      reasonCode: 'ANNUAL_INTENT_REQUIRED',
      productionAuthorized: false,
    });
    expect(buildTemporalReadingContext(monthly)).toMatchObject({
      scope: 'monthly',
      annualPillar: { stem: '병', branch: '오' },
    });
  });

  it('fails closed on a missing period or intent/target scope mismatch', () => {
    const request: ReadingRequest = annualRequest('2026-01-15T03:00:00.000Z');
    expect(resolveAnnualLichunRequestCandidate({
      requestId: 'missing-target',
      intent: { domain: 'general', temporalScope: 'annual' },
    }, TEST_BOUNDARY)).toMatchObject({
      state: 'unavailable',
      reasonCode: 'ANNUAL_TARGET_PERIOD_REQUIRED',
    });

    const mismatched: ReadingRequest = {
      ...request,
      targetPeriod: {
        scope: 'monthly',
        year: 2026,
        month: 1,
        timeZone: 'Asia/Seoul',
        referenceDateTime: '2026-01-15T03:00:00.000Z',
        resolution: 'relative_current',
      },
    };
    expect(resolveAnnualLichunRequestCandidate(mismatched, TEST_BOUNDARY)).toMatchObject({
      state: 'unavailable',
      reasonCode: 'ANNUAL_TARGET_SCOPE_MISMATCH',
    });
  });

  it('does not silently fall back to civil-year pillar when provenance is missing', () => {
    const request = annualRequest('2026-01-15T03:00:00.000Z');
    expect(resolveAnnualLichunRequestCandidate(request)).toMatchObject({
      state: 'unavailable',
      reasonCode: 'BOUNDARY_EVIDENCE_REQUIRED',
      productionAuthorized: false,
    });
    expect(resolveAnnualLichunRequestCandidate(request, {
      ...TEST_BOUNDARY,
      verification: 'unverified',
    })).toMatchObject({
      state: 'unavailable',
      reasonCode: 'BOUNDARY_EVIDENCE_UNVERIFIED',
      productionAuthorized: false,
    });
  });

  it('uses the same epoch for UTC/KST and rejects year-mismatched requests', () => {
    const kst = resolveAnnualLichunRequestCandidate(
      annualRequest('2026-02-04T05:03:00+09:00'),
      TEST_BOUNDARY,
    );
    const utc = resolveAnnualLichunRequestCandidate(
      annualRequest('2026-02-03T20:03:00.000Z'),
      TEST_BOUNDARY,
    );
    expect(kst).toMatchObject({
      state: 'candidate',
      context: { displayYear: 2026, effectiveYear: 2026 },
    });
    expect(utc).toMatchObject({
      state: 'candidate',
      context: { displayYear: 2026, effectiveYear: 2026 },
    });
    expect(resolveAnnualLichunRequestCandidate(
      annualRequest('2026-01-15T03:00:00.000Z', 2025),
      TEST_BOUNDARY,
    )).toMatchObject({
      state: 'unavailable',
      reasonCode: 'DISPLAY_YEAR_MISMATCH',
    });
  });
});
