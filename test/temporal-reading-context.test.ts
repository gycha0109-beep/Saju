import { describe, expect, it } from 'vitest';
import type { ReadingRequest } from '../src/contracts/reading.js';
import {
  TemporalReadingContextError,
  annualSexagenaryPillar,
  buildTemporalReadingContext,
} from '../src/reading/temporal-reading-context.js';

function annualRequest(year: number, referenceDateTime = '2026-09-03T13:00:00.000Z'): ReadingRequest {
  return {
    requestId: 'reading-annual',
    intent: { domain: 'general', temporalScope: 'annual' },
    targetPeriod: {
      scope: 'annual',
      year,
      timeZone: 'Asia/Seoul',
      referenceDateTime,
      resolution: 'relative_current',
    },
  };
}

describe('request-scoped temporal reading context', () => {
  it('resolves the target Gregorian year to a deterministic sexagenary pillar', () => {
    expect(annualSexagenaryPillar(1984)).toEqual({ stem: '갑', branch: '자', cycleIndex: 0 });
    expect(annualSexagenaryPillar(2026)).toEqual({ stem: '병', branch: '오', cycleIndex: 42 });
    expect(annualSexagenaryPillar(2027)).toEqual({ stem: '정', branch: '미', cycleIndex: 43 });
  });

  it('builds annual context without mutating or requiring a natal snapshot', () => {
    expect(buildTemporalReadingContext(annualRequest(2026))).toEqual({
      scope: 'annual',
      targetYear: 2026,
      timeZone: 'Asia/Seoul',
      referenceDateTime: '2026-09-03T13:00:00.000Z',
      annualPillar: { stem: '병', branch: '오', cycleIndex: 42 },
    });
  });

  it('preserves the Seoul civil display year while distinguishing pre-LiChun effective year', () => {
    const context = buildTemporalReadingContext(annualRequest(2027, '2026-12-31T15:30:00.000Z'));
    expect(context).toMatchObject({
      scope: 'annual',
      targetYear: 2027,
      annualPillar: { stem: '병', branch: '오' },
    });
  });

  it('switches both 2026 and 2027 at exactly midnight KST on the LiChun date', () => {
    for (const [year, previous, current] of [
      [2026, { stem: '을', branch: '사' }, { stem: '병', branch: '오' }],
      [2027, { stem: '병', branch: '오' }, { stem: '정', branch: '미' }],
    ] as const) {
      expect(buildTemporalReadingContext(annualRequest(year, `${year}-02-03T14:59:59.000Z`))).toMatchObject({
        targetYear: year, annualPillar: previous,
      });
      expect(buildTemporalReadingContext(annualRequest(year, `${year}-02-03T15:00:00.000Z`))).toMatchObject({
        targetYear: year, annualPillar: current,
      });
      expect(buildTemporalReadingContext(annualRequest(year, `${year}-02-03T20:02:30.000Z`))).toMatchObject({
        targetYear: year, annualPillar: current,
      });
    }
  });

  it('fails closed near unregistered year boundaries and keeps later legacy years operational', () => {
    expect(() => buildTemporalReadingContext(annualRequest(2028, '2028-01-15T03:00:00.000Z'))).toThrow(
      /source is unavailable/,
    );
    expect(() => buildTemporalReadingContext(annualRequest(2028, '2028-02-04T05:00:00.000Z'))).toThrow(
      /source is unavailable/,
    );
    expect(buildTemporalReadingContext(annualRequest(2042, '2042-06-15T12:00:00.000Z'))).toMatchObject({
      scope: 'annual', targetYear: 2042,
      annualPillar: annualSexagenaryPillar(2042),
    });
  });

  it('does not change Monthly computation at the 2026 annual boundary', () => {
    const request: ReadingRequest = {
      ...annualRequest(2026, '2026-02-03T14:59:59.000Z'),
      intent: { domain: 'general', temporalScope: 'monthly' },
      targetPeriod: {
        scope: 'monthly', year: 2026, month: 2, timeZone: 'Asia/Seoul',
        referenceDateTime: '2026-02-03T14:59:59.000Z', resolution: 'relative_current',
      },
    };
    expect(buildTemporalReadingContext(request)).toMatchObject({
      scope: 'monthly', targetYear: 2026, annualPillar: { stem: '병', branch: '오' },
    });
  });

  it('fails closed when an annual intent has no target period', () => {
    const request: ReadingRequest = {
      requestId: 'reading-annual-missing-period',
      intent: { domain: 'general', temporalScope: 'annual' },
    };
    expect(() => buildTemporalReadingContext(request)).toThrow(TemporalReadingContextError);
  });

  it('fails closed when target period scope disagrees with the reading intent', () => {
    const request: ReadingRequest = {
      requestId: 'reading-mismatch',
      intent: { domain: 'general', temporalScope: 'monthly' },
      targetPeriod: {
        scope: 'annual',
        year: 2026,
        timeZone: 'Asia/Seoul',
        referenceDateTime: '2026-09-03T13:00:00.000Z',
        resolution: 'relative_current',
      },
    };
    expect(() => buildTemporalReadingContext(request)).toThrow(/does not match reading intent/);
  });
});
