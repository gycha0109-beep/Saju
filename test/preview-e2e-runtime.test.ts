import type { Server } from 'node:http';
import { describe, expect, it } from 'vitest';
import {
  createMyeonghwaProductionCalculationProcessV1,
  PRODUCTION_CALCULATION_PROCESS_ENV_V1,
} from '../src/production-calculation-process.js';
import {
  PRODUCT_PREVIEW_READING_HTTP_PATH,
  PRODUCT_READING_LIFECYCLE_HEADER,
  PRODUCT_READING_PREVIEW_LIFECYCLE,
  PRODUCT_READING_RESPONSE_ADMISSION_HEADER,
} from '../src/production-calculation-host.js';
import {
  PREVIEW_E2E_APPROVAL,
  PREVIEW_E2E_AUTHORITY_VERSION,
} from '../src/preview/preview-authority.js';

const ACTIVE_BEARER = 'preview-e2e-test-bearer';

function environment(): Record<string, string> {
  return {
    [PRODUCTION_CALCULATION_PROCESS_ENV_V1.serviceBearer]: ACTIVE_BEARER,
    [PRODUCTION_CALCULATION_PROCESS_ENV_V1.host]: '127.0.0.1',
    [PRODUCTION_CALCULATION_PROCESS_ENV_V1.port]: '3000',
  };
}

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
    throw new Error('Expected preview E2E TCP address.');
  }
  return `http://127.0.0.1:${address.port}`;
}

async function close(server: Server): Promise<void> {
  if (!server.listening) return;
  await new Promise<void>((resolve, reject) => {
    server.close((error) => {
      if (error !== undefined) reject(error);
      else resolve();
    });
  });
}

function readingRequest(text: string): string {
  return JSON.stringify({
    birth: {
      calendarType: 'solar',
      date: '2024-03-10',
      time: '12:00',
      sex: 'unspecified',
    },
    reading: { text },
  });
}

describe('provisionally approved preview E2E runtime', () => {
  it('records Preview approval without promoting research evidence to Production authority', () => {
    expect(PREVIEW_E2E_AUTHORITY_VERSION).toBe('myeonghwa-preview-e2e-authority-v1');
    expect(PREVIEW_E2E_APPROVAL).toMatchObject({
      lifecycle: 'preview',
      approved: true,
      researchContinues: true,
      productionInterpretationAuthorityGranted: false,
      commerceAuthorityGranted: false,
      persistenceAuthorityGranted: false,
      publicGeneralAvailabilityAuthorityGranted: false,
      purpose: 'consumer-screen-e2e-observation',
    });
  });

  it('requires the service Bearer before parsing Preview Reading JSON', async () => {
    const runtime = createMyeonghwaProductionCalculationProcessV1(environment());
    const origin = await listenEphemeral(runtime.server);
    try {
      const response = await fetch(`${origin}${PRODUCT_PREVIEW_READING_HTTP_PATH}`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: '{not-json',
      });

      expect(response.status).toBe(401);
      expect(await response.json()).toMatchObject({
        error: { code: 'HOST_AUTH_REQUIRED' },
      });
    } finally {
      await close(runtime.server);
    }
  });

  it('delivers an admitted General Natal Preview and attests the lifecycle', async () => {
    const runtime = createMyeonghwaProductionCalculationProcessV1(environment());
    const origin = await listenEphemeral(runtime.server);
    try {
      const response = await fetch(`${origin}${PRODUCT_PREVIEW_READING_HTTP_PATH}`, {
        method: 'POST',
        headers: {
          authorization: `Bearer ${ACTIVE_BEARER}`,
          'content-type': 'application/json',
        },
        body: readingRequest('사주'),
      });

      expect(response.status).toBe(200);
      expect(response.headers.get(PRODUCT_READING_RESPONSE_ADMISSION_HEADER)).toBe(
        'myeonghwa-product-reading-response-v2',
      );
      expect(response.headers.get(PRODUCT_READING_LIFECYCLE_HEADER)).toBe(
        PRODUCT_READING_PREVIEW_LIFECYCLE,
      );

      const payload = (await response.json()) as { state?: unknown };
      expect(['delivered', 'delivered_with_fallback']).toContain(payload.state);
      const serialized = JSON.stringify(payload);
      expect(serialized).toContain('이 사주의 핵심');
      expect(serialized).toContain('프리뷰 안내');
    } finally {
      await close(runtime.server);
    }
  });

  it.each([
    ['직업운', '직업운 핵심'],
    ['재물운', '재물운 핵심'],
    ['연애운', '관계운 핵심'],
    ['사업운', '사업운 핵심'],
  ] as const)('delivers supported natal Preview %s', async (text, expectedTitle) => {
    const runtime = createMyeonghwaProductionCalculationProcessV1(environment());
    const origin = await listenEphemeral(runtime.server);
    try {
      const response = await fetch(`${origin}${PRODUCT_PREVIEW_READING_HTTP_PATH}`, {
        method: 'POST',
        headers: {
          authorization: `Bearer ${ACTIVE_BEARER}`,
          'content-type': 'application/json',
        },
        body: readingRequest(text),
      });
      expect(response.status).toBe(200);
      const payload = (await response.json()) as { state?: unknown };
      expect(['delivered', 'delivered_with_fallback']).toContain(payload.state);
      expect(JSON.stringify(payload)).toContain(expectedTitle);
    } finally {
      await close(runtime.server);
    }
  });

  it('does not expose the Production Product Reading route from the Preview-enabled process', async () => {
    const runtime = createMyeonghwaProductionCalculationProcessV1(environment());
    const origin = await listenEphemeral(runtime.server);
    try {
      const response = await fetch(`${origin}/api/readings`, {
        method: 'POST',
        headers: {
          authorization: `Bearer ${ACTIVE_BEARER}`,
          'content-type': 'application/json',
        },
        body: readingRequest('사주'),
      });

      expect(response.status).toBe(404);
      expect(await response.json()).toMatchObject({
        error: { code: 'HOST_ROUTE_NOT_FOUND' },
      });
    } finally {
      await close(runtime.server);
    }
  });

  it('keeps unsupported Preview intents fail-closed instead of substituting General Natal', async () => {
    const runtime = createMyeonghwaProductionCalculationProcessV1(environment());
    const origin = await listenEphemeral(runtime.server);
    try {
      const response = await fetch(`${origin}${PRODUCT_PREVIEW_READING_HTTP_PATH}`, {
        method: 'POST',
        headers: {
          authorization: `Bearer ${ACTIVE_BEARER}`,
          'content-type': 'application/json',
        },
        body: readingRequest('올해 운세'),
      });

      expect(response.status).toBe(200);
      const payload = (await response.json()) as { state?: unknown };
      expect(['delivered', 'delivered_with_fallback']).not.toContain(payload.state);
      expect(JSON.stringify(payload)).not.toContain('이 사주의 핵심');
    } finally {
      await close(runtime.server);
    }
  });
});
