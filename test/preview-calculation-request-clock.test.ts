import { describe, expect, it } from 'vitest';
import {
  createMyeonghwaSourceReadingProofHost,
  parseProductHostCalculationRequest,
} from '../src/host/product-host.js';
import { createApprovedSourceProofPreviewDependenciesV1 } from '../src/preview/preview-product-host.js';

const FIXED_REQUEST_TIME = new Date('2026-10-13T02:10:00.000Z');
const birth = {
  calendarType: 'solar',
  date: '2024-03-10',
  time: '12:00',
  sex: 'unspecified',
} as const;

describe('Preview calculation request-time provenance', () => {
  it('pins generated snapshot metadata to the governed request time for known and unknown hours', async () => {
    const dependencies = createApprovedSourceProofPreviewDependenciesV1(FIXED_REQUEST_TIME);
    for (const time of ['12:00', null] as const) {
      const input = parseProductHostCalculationRequest({
        birth: { ...birth, time },
      });
      const first = await dependencies.calculate(input, {
        requestId: 'provenance-first',
        requestedAt: FIXED_REQUEST_TIME.toISOString(),
      });
      const later = await dependencies.calculate(input, {
        requestId: 'provenance-later',
        requestedAt: '2026-10-13T03:10:00.000Z',
      });
      expect(first.createdAt).toBe(FIXED_REQUEST_TIME.toISOString());
      expect(later.createdAt).toBe('2026-10-13T03:10:00.000Z');
      expect(later.snapshotId).toBe(first.snapshotId);
      expect(later.pillars).toEqual(first.pillars);
    }
  });

  it('applies the same request timestamp to real General, Career and Spouse Source Proof executions', async () => {
    const dependencies = createApprovedSourceProofPreviewDependenciesV1(FIXED_REQUEST_TIME);
    const observed: Array<{ requestAt: string; snapshotAt: string; snapshotId: string }> = [];
    const host = createMyeonghwaSourceReadingProofHost({
      ...dependencies,
      requestNowFactory: () => FIXED_REQUEST_TIME,
      async calculate(input, context) {
        const snapshot = await dependencies.calculate(input, context);
        observed.push({
          requestAt: context.requestedAt,
          snapshotAt: snapshot.createdAt,
          snapshotId: snapshot.snapshotId,
        });
        return snapshot;
      },
    });

    for (const text of ['전체 사주', '직업운', '배우자운']) {
      const result = await host.requestReadingWithProofReadiness({
        birth,
        reading: { text },
      });
      expect(result.response.state).toBe('delivered');
      expect(result.readiness.canSell).toBe(false);
      expect(result.readiness.canPublish).toBe(false);
    }
    expect(observed).toHaveLength(3);
    for (const item of observed) {
      expect(item.snapshotAt).toBe(FIXED_REQUEST_TIME.toISOString());
      expect(item.requestAt).toBe(FIXED_REQUEST_TIME.toISOString());
      expect(item.snapshotId).toBe(observed[0]?.snapshotId);
    }
  }, 60_000);
});
