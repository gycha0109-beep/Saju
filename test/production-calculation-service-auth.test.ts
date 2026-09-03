import type { Server } from 'node:http';
import type { AddressInfo } from 'node:net';
import { afterEach, describe, expect, it } from 'vitest';
import {
  createMyeonghwaProductionCalculationHostServer,
  type MyeonghwaProductionCalculationHostServerOptions,
} from '../src/production-calculation-host.js';

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
    const response = await fetch(`${origin}/healthz`);

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
});
