import { describe, expect, it } from 'vitest';
import {
  createGeneralNatalIntegratedPreviewProductHost,
  GENERAL_NATAL_INTEGRATED_PREVIEW_HOST_VERSION,
} from '../src/preview/index.js';
import { createGeneralNatalIntegratedReadingRegistry } from '../src/interpretation/general-natal-integrated-reading-registry.js';
import { inspectMyeonghwaProductionComposition } from '../src/production/production-composition.js';

const now = new Date('2026-10-11T00:00:00.000Z');

function host() {
  return createGeneralNatalIntegratedPreviewProductHost({
    requestIdFactory: () => 'general-integrated-product-host',
    requestNowFactory: () => now,
  });
}

const birth = {
  calendarType: 'solar',
  date: '2024-03-10',
  time: '12:00',
  sex: 'unspecified',
} as const;

describe('WS-D integrated General Natal actual ProductHost entry', () => {
  it('delivers an existing T8 theme and month-branch structural context in one Official Preview reading', async () => {
    const response = await host().requestReading({
      birth,
      reading: { text: '전체 사주', outputPreferences: { preferredDetail: 'standard' } },
    });

    expect(response.state).toBe('delivered');
    expect(response.reading).toBeDefined();
    expect(response.reading?.readingId).toMatch(/^official_reading_/u);
    expect(response.reading?.calculationSummary.pillars.day.value).toBeTruthy();
    expect(response.reading?.sections.length).toBeGreaterThan(0);
    expect(JSON.stringify(response.reading)).toContain('월지');
    expect(JSON.stringify(response.reading)).toContain('주요 해석');
    expect(GENERAL_NATAL_INTEGRATED_PREVIEW_HOST_VERSION).toContain('preview');
  });

  it('does not turn General Natal research producers into Career or Annual coverage', async () => {
    const client = host();
    for (const reading of ['직업 사주', '올해 운세']) {
      const response = await client.requestReading({ birth, reading: { text: reading } });
      expect(response.reading).toBeUndefined();
      expect(response.state).not.toBe('delivered');
    }
  });

  it('still blocks Production even when the opt-in ProductHost delivers Preview', () => {
    const registry = createGeneralNatalIntegratedReadingRegistry();
    expect(registry.pack.status).toBe('research');
    const result = inspectMyeonghwaProductionComposition({ registry });
    expect(result.status).toBe('blocked');
    if (result.status !== 'blocked') throw new Error('Research registry must remain blocked.');
    expect(result.blockers).toContainEqual(
      expect.objectContaining({ code: 'INTERPRETATION_PACK_NOT_PRODUCTION' }),
    );
  });
});
