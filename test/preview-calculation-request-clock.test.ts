import { describe, expect, it } from 'vitest';
import { parseProductHostCalculationRequest } from '../src/host/product-host.js';
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
});
