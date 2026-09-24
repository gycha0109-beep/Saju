import { describe, expect, it } from 'vitest';

import {
  SUPPORTED_NARRATIVE_OUTPUT_SCHEMA,
  calculateCanonicalSajuSnapshot,
  runInterpretation,
} from '../src/index.js';
import { createMyeonghwaProductHost } from '../src/host/product-host.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import { createGeneralNatalUsefulReadingCandidateRegistry } from '../src/research/general-natal-useful-reading-candidate.js';

describe('General Natal product vertical slice', () => {
  it('runs birth input through the General Natal Official Reading path without Narrative runtime', async () => {
    const host = createMyeonghwaProductHost({
      calculate(input) {
        return calculateCanonicalSajuSnapshot(input, PRODUCTION_DEFAULT_CALCULATION_POLICY, {
          now: new Date('2026-09-19T02:00:00.000Z'),
        });
      },
      interpret(snapshot, context) {
        const registry = createGeneralNatalUsefulReadingCandidateRegistry(
          '2026-09-19T02:01:00.000Z',
        );
        return {
          registry,
          interpretation: runInterpretation(snapshot, registry, {
            requestId: context.requestId,
            now: new Date('2026-09-19T02:01:00.000Z'),
          }),
        };
      },
      readingOptions: {
        outputSchemaVersion: SUPPORTED_NARRATIVE_OUTPUT_SCHEMA,
        readingVersion: 'myeonghwa-general-natal-vertical-slice-test-v1',
        narrativeNow: new Date('2026-09-19T02:02:00.000Z'),
        artifactGeneratedAt: new Date('2026-09-19T02:03:00.000Z'),
      },
      requestIdFactory: () => 'general-natal-vertical-slice',
      requestNowFactory: () => new Date('2026-09-19T02:00:00.000Z'),
    });

    const response = await host.requestReading({
      birth: {
        calendarType: 'solar',
        date: '2024-03-10',
        time: '12:00',
        sex: 'unspecified',
      },
      reading: { text: '일반 사주' },
    });

    expect(response.state).toBe('delivered');
    expect(response.reading).toBeDefined();
    expect(response.reading?.calculationSummary.pillars.day.value).toBeTruthy();
    expect(response.reading?.sections.length).toBeGreaterThan(0);
    expect(response.reading?.readingId).toMatch(/^official_reading_/u);
    expect(JSON.stringify(response)).toContain('주요 해석');
    expect(JSON.stringify(response)).toContain('해석 범위');
  });

  it('keeps the candidate registry outside production authority while exercising the shared runtime', () => {
    const registry = createGeneralNatalUsefulReadingCandidateRegistry();
    expect(registry.pack.status).toBe('research');
    expect(registry.pack.packId).toBe('PACK-GENERAL-NATAL-USEFUL-READING-CANDIDATE');
  });
});
