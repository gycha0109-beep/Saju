import { describe, expect, it, vi } from 'vitest';
import type * as ProductionCalculationRuntime from '../src/production/production-calculation-runtime.js';
import { createGeneralNatalIntegratedPreviewProductHost } from '../src/host/general-natal-integrated-preview-host.js';

const authorityCalls = vi.hoisted(() => ({ timestamps: [] as string[] }));

vi.mock('../src/production/production-calculation-runtime.js', async (importOriginal) => {
  const original =
    await importOriginal<typeof ProductionCalculationRuntime>();
  return {
    ...original,
    calculateAuthorizedMyeonghwaProductionSnapshot: (
      ...args: Parameters<typeof original.calculateAuthorizedMyeonghwaProductionSnapshot>
    ) => {
      authorityCalls.timestamps.push(args[1]?.now?.toISOString() ?? 'missing');
      return original.calculateAuthorizedMyeonghwaProductionSnapshot(...args);
    },
  };
});

const FIXED_NOW = new Date('2026-10-12T02:00:00.000Z');
const birth = {
  calendarType: 'solar',
  date: '2024-03-10',
  sex: 'unspecified',
} as const;

describe('General Natal Preview authorized calculation boundary', () => {
  it('calculates known and unknown hours through the same governed production runtime', async () => {
    authorityCalls.timestamps.length = 0;
    const host = createGeneralNatalIntegratedPreviewProductHost({
      requestIdFactory: () => 'general-authority-boundary',
      requestNowFactory: () => FIXED_NOW,
    });

    const known = await host.requestReading({
      birth: { ...birth, time: '12:00' },
      reading: { text: '전체 사주' },
    });
    const unknown = await host.requestReading({
      birth: { ...birth, time: null },
      reading: { text: '전체 사주' },
    });

    expect(known.state).toBe('delivered');
    expect(['delivered', 'partial_evidence']).toContain(unknown.state);
    expect(known.reading?.calculationSummary.pillars.hour.status).toBe('resolved');
    if (unknown.reading !== undefined) {
      expect(unknown.reading.calculationSummary.pillars.hour.status).not.toBe('resolved');
    }
    expect(authorityCalls.timestamps).toEqual([
      FIXED_NOW.toISOString(),
      FIXED_NOW.toISOString(),
    ]);
  });
});
