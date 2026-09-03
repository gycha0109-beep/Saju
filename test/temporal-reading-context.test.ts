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

  it('preserves the adapter-resolved Seoul year across the UTC year boundary', () => {
    const context = buildTemporalReadingContext(annualRequest(2027, '2026-12-31T15:30:00.000Z'));
    expect(context).toMatchObject({
      scope: 'annual',
      targetYear: 2027,
      annualPillar: { stem: '정', branch: '미' },
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
