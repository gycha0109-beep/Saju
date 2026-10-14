import type { Server } from 'node:http';
import { describe, expect, it } from 'vitest';
import {
  createMyeonghwaProductionPreviewOnlyCalculationProcessV1,
  PRODUCTION_CALCULATION_PROCESS_ENV_V1,
} from '../src/production-calculation-process.js';
import { PRODUCT_PREVIEW_READING_HTTP_PATH } from '../src/production-calculation-host.js';
import type { ProductReadingResponse } from '../src/reading/product-reading-response.js';
import {
  buildNatalPersonalizationBaselineReport,
  type NatalPersonalizationBaselineInput,
} from '../src/preview/natal-personalization-baseline.js';

const bearer = 'natal-baseline-test-bearer';

async function listenEphemeral(server: Server): Promise<string> {
  await new Promise<void>((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', () => {
      server.off('error', reject);
      resolve();
    });
  });
  const address = server.address();
  if (address === null || typeof address === 'string') {
    throw new TypeError('No preview loopback address');
  }
  return `http://127.0.0.1:${address.port}`;
}

async function close(server: Server): Promise<void> {
  if (!server.listening) return;
  await new Promise<void>((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
}

describe('N0 natal personalization baseline on actual Preview HTTP consumer path', () => {
  it('compares real displayed chart facts against interpretive body, not just response success', async () => {
    const runtime = createMyeonghwaProductionPreviewOnlyCalculationProcessV1({
      [PRODUCTION_CALCULATION_PROCESS_ENV_V1.serviceBearer]: bearer,
      [PRODUCTION_CALCULATION_PROCESS_ENV_V1.host]: '127.0.0.1',
      [PRODUCTION_CALCULATION_PROCESS_ENV_V1.port]: '3000',
    });
    const origin = await listenEphemeral(runtime.server);
    const fixtures = [
      { caseId: 'a', date: '2024-03-10', time: '12:00' },
      { caseId: 'a-repeat', date: '2024-03-10', time: '12:00' },
      { caseId: 'b', date: '1989-09-08', time: '01:30' },
      { caseId: 'unknown-hour', date: '2024-03-10', time: null },
    ];
    const inputs: NatalPersonalizationBaselineInput[] = [];
    try {
      for (const fixture of fixtures) {
        const response = await fetch(`${origin}${PRODUCT_PREVIEW_READING_HTTP_PATH}`, {
          method: 'POST',
          headers: {
            authorization: `Bearer ${bearer}`,
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            birth: {
              calendarType: 'solar',
              date: fixture.date,
              time: fixture.time,
              sex: 'unspecified',
            },
            reading: { text: '사주' },
          }),
        });
        expect(response.status).toBe(200);
        const payload = (await response.json()) as ProductReadingResponse;
        inputs.push({
          caseId: fixture.caseId,
          birthLabel: `${fixture.date} ${fixture.time ?? 'unknown'}`,
          response: payload,
        });
      }
    } finally {
      await close(runtime.server);
    }

    const report = buildNatalPersonalizationBaselineReport(inputs);
    expect(report).toMatchObject({
      lifecycle: 'internal_quality_audit',
      productionAuthorityGranted: false,
      mayPublish: false,
      maySell: false,
      numberOfCases: 4,
    });
    expect(report.uniqueFactFingerprints).toBeGreaterThanOrEqual(2);
    const [first, duplicate, different, unknown] = report.cases;
    expect(first?.pillarValues).toHaveLength(4);
    expect(first?.pillarValues).toEqual(duplicate?.pillarValues);
    expect(first?.factFingerprint).toBe(duplicate?.factFingerprint);
    expect(different?.factFingerprint).not.toBe(first?.factFingerprint);
    expect(unknown?.pillarValues.at(3)).toMatch(/^hour:(ambiguous|unavailable):/u);
    expect(report.responseStates).toHaveProperty('delivered');
    expect(report.cases).toHaveLength(4);
    // Do not assert interpreted prose is different merely because pillars differ.
    // The contrast matrix makes sameness visible for manual N0/N4 assessment.
    expect(report.contrasts.every((entry) => entry.left !== entry.right)).toBe(true);
    expect(() =>
      buildNatalPersonalizationBaselineReport([inputs[0]!, inputs[0]!]),
    ).toThrow(/Duplicate audit caseId/u);
  });
});
