import type { Server } from 'node:http';
import type { AddressInfo } from 'node:net';
import { afterEach, describe, expect, it } from 'vitest';
import {
  createMyeonghwaProductionCalculationHostServer,
  type MyeonghwaProductionCalculationHostServerOptions,
} from '../src/production-calculation-host.js';
import {
  PRODUCT_READING_RESPONSE_ADMISSION_HEADER,
  createMyeonghwaProductionProductHostServer,
  type MyeonghwaProductionProductHostServerOptions,
} from '../src/host/http-server.js';
import type { MyeonghwaProductHost } from '../src/host/product-host.js';

const ACTIVE_BEARER = 'active-test-bearer-3a82f7149b';
const PREVIOUS_BEARER = 'previous-test-bearer-e14bb681df';

const servers: Server[] = [];

async function startServer(
  options: MyeonghwaProductionCalculationHostServerOptions = {
    serviceBearer: ACTIVE_BEARER,
  },
): Promise<string> {
  const server = createMyeonghwaProductionCalculationHostServer(options);
  servers.push(server);

  await new Promise<void>((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', () => {
      server.off('error', reject);
      resolve();
    });
  });

  const address = server.address() as AddressInfo;
  return `http://127.0.0.1:${address.port}`;
}

async function startProductServer(
  host: MyeonghwaProductHost,
  options: MyeonghwaProductionProductHostServerOptions = {
    serviceBearer: ACTIVE_BEARER,
  },
): Promise<string> {
  const server = createMyeonghwaProductionProductHostServer(host, options);
  servers.push(server);

  await new Promise<void>((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', () => {
      server.off('error', reject);
      resolve();
    });
  });

  const address = server.address() as AddressInfo;
  return `http://127.0.0.1:${address.port}`;
}

async function closeServer(server: Server): Promise<void> {
  if (!server.listening) return;
  await new Promise<void>((resolve, reject) => {
    server.close((error) => {
      if (error !== undefined) reject(error);
      else resolve();
    });
  });
}

afterEach(async () => {
  await Promise.all(servers.splice(0).map(closeServer));
});

async function malformedCalculation(
  origin: string,
  authorization?: string,
): Promise<Response> {
  return fetch(`${origin}/api/calculations`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      ...(authorization === undefined ? {} : { authorization }),
    },
    body: '{not-json',
  });
}

describe('production calculation service bearer authorization', () => {
  it('keeps healthz public', async () => {
    const origin = await startServer();
    const response = await fetch(`${origin}/health`);

    expect(response.status).toBe(200);
    expect(await response.json()).toMatchObject({ status: 'ok' });
  });

  it('rejects a missing bearer before request body parsing', async () => {
    const origin = await startServer();
    const response = await malformedCalculation(origin);

    expect(response.status).toBe(401);
    expect(await response.json()).toEqual({
      error: {
        code: 'HOST_AUTH_REQUIRED',
        message: 'Authentication required.',
      },
    });
  });

  it.each(['Basic abc', 'Bearer', 'Bearer token extra']) (
    'rejects malformed authorization %s before request body parsing',
    async (authorization) => {
      const origin = await startServer();
      const response = await malformedCalculation(origin, authorization);

      expect(response.status).toBe(401);
      expect((await response.json()) as unknown).toEqual({
        error: {
          code: 'HOST_AUTH_REQUIRED',
          message: 'Authentication required.',
        },
      });
    },
  );

  it('rejects an invalid bearer without reflecting it', async () => {
    const origin = await startServer();
    const invalidBearer = 'sensitive-invalid-bearer-720487';
    const response = await malformedCalculation(origin, `Bearer ${invalidBearer}`);
    const body = await response.text();

    expect(response.status).toBe(401);
    expect(body).not.toContain(invalidBearer);
    expect(body).not.toContain(ACTIVE_BEARER);
  });

  it('accepts the active bearer and only then validates the request body', async () => {
    const origin = await startServer();
    const response = await malformedCalculation(origin, `Bearer ${ACTIVE_BEARER}`);

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({
      error: {
        code: 'HOST_INVALID_JSON',
        message: 'Request body must contain valid JSON.',
      },
    });
  });

  it('accepts the previous bearer while rotation is configured', async () => {
    const origin = await startServer({
      serviceBearer: ACTIVE_BEARER,
      previousServiceBearer: PREVIOUS_BEARER,
    });
    const response = await malformedCalculation(origin, `Bearer ${PREVIOUS_BEARER}`);

    expect(response.status).toBe(400);
    expect((await response.json()) as { error: { code: string } }).toMatchObject({
      error: { code: 'HOST_INVALID_JSON' },
    });
  });

  it('does not authenticate an unconfigured previous bearer', async () => {
    const origin = await startServer({
      serviceBearer: ACTIVE_BEARER,
      previousServiceBearer: '',
    });
    const response = await malformedCalculation(origin, `Bearer ${PREVIOUS_BEARER}`);

    expect(response.status).toBe(401);
  });

  it('does not expose readings from the calculation-only production host', async () => {
    const origin = await startServer();
    const response = await fetch(`${origin}/api/readings`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{}',
    });

    expect(response.status).toBe(404);
    expect(await response.json()).toEqual({
      error: {
        code: 'HOST_ROUTE_NOT_FOUND',
        message: 'Route not found.',
      },
    });
  });

  it('fails closed when the active bearer is missing or invalid', () => {
    expect(() => createMyeonghwaProductionCalculationHostServer()).toThrow(/activeBearer/u);
    expect(() =>
      createMyeonghwaProductionCalculationHostServer({ serviceBearer: '' }),
    ).toThrow(/activeBearer/u);
    expect(() =>
      createMyeonghwaProductionCalculationHostServer({ serviceBearer: 'contains whitespace' }),
    ).toThrow(/activeBearer/u);
  });

  it('rejects an invalid non-empty previous bearer configuration', () => {
    expect(() =>
      createMyeonghwaProductionCalculationHostServer({
        serviceBearer: ACTIVE_BEARER,
        previousServiceBearer: 'contains whitespace',
      }),
    ).toThrow(/previousBearer/u);
  });

  it('protects Product Reading before parsing request JSON', async () => {
    let readingCalls = 0;
    const host = {
      async requestReading() {
        readingCalls += 1;
        return {} as never;
      },
    };
    const origin = await startProductServer(host);

    const response = await fetch(`${origin}/api/readings`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{not-json',
    });

    expect(response.status).toBe(401);
    expect(readingCalls).toBe(0);
  });

  it('attests a canonical Product Reading response after source-owned admission', async () => {
    const host = {
      async requestReading() {
        return {
          responseVersion: 'myeonghwa-product-reading-response-v2',
          responseId: 'reading_response_0123456789abcdef01234567',
          state: 'temporarily_unavailable',
          messageCode: 'READING_TEMPORARILY_UNAVAILABLE',
          requiredAction: 'try_again_later',
        } as const;
      },
    };
    const origin = await startProductServer(host);

    const response = await fetch(`${origin}/api/readings`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${ACTIVE_BEARER}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        birth: { calendarType: 'solar', date: '2000-01-02', time: null },
        reading: { text: '전체 사주' },
      }),
    });

    expect(response.status).toBe(200);
    expect(response.headers.get(PRODUCT_READING_RESPONSE_ADMISSION_HEADER)).toBe(
      'myeonghwa-product-reading-response-v2',
    );
  });

  it('source-admits Product Reading output before returning it over production transport', async () => {
    const host = {
      async requestReading() {
        return { responseVersion: 'not-canonical' } as never;
      },
    };
    const origin = await startProductServer(host);

    const response = await fetch(`${origin}/api/readings`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${ACTIVE_BEARER}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        birth: { calendarType: 'solar', date: '2000-01-02', time: null },
        reading: { text: '전체 사주' },
      }),
    });

    expect(response.status).toBe(500);
    expect(await response.json()).toEqual({
      error: {
        code: 'HOST_READING_EXECUTION_FAILED',
        message: 'The reading service could not complete this request.',
      },
    });
  });
});
