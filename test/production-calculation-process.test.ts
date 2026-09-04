import type { Server } from 'node:http';
import { describe, expect, it } from 'vitest';
import {
  createMyeonghwaProductionCalculationProcessV1,
  DEFAULT_PRODUCTION_CALCULATION_HOST,
  DEFAULT_PRODUCTION_CALCULATION_PORT,
  PRODUCTION_CALCULATION_PROCESS_ENV_V1,
  ProductionCalculationProcessConfigErrorV1,
  readMyeonghwaProductionCalculationProcessConfigV1,
} from '../src/production-calculation-process.js';

const ACTIVE_BEARER = 'active-service-token';
const PREVIOUS_BEARER = 'previous-service-token';

function environment(overrides: Record<string, string | undefined> = {}): Record<string, string | undefined> {
  return {
    [PRODUCTION_CALCULATION_PROCESS_ENV_V1.serviceBearer]: ACTIVE_BEARER,
    ...overrides,
  };
}

async function listenEphemeral(server: Server): Promise<number> {
  await new Promise<void>((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', () => {
      server.off('error', reject);
      resolve();
    });
  });
  const address = server.address();
  if (address === null || typeof address === 'string') throw new Error('Expected TCP address.');
  return address.port;
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

describe('production calculation process configuration', () => {
  it('uses deployment-safe host and port defaults without exposing the bearer', () => {
    expect(readMyeonghwaProductionCalculationProcessConfigV1(environment())).toEqual({
      serviceBearer: ACTIVE_BEARER,
      host: DEFAULT_PRODUCTION_CALCULATION_HOST,
      port: DEFAULT_PRODUCTION_CALCULATION_PORT,
    });
  });

  it('binds explicit host, port, and previous rotation credential', () => {
    expect(
      readMyeonghwaProductionCalculationProcessConfigV1(
        environment({
          [PRODUCTION_CALCULATION_PROCESS_ENV_V1.previousServiceBearer]: PREVIOUS_BEARER,
          [PRODUCTION_CALCULATION_PROCESS_ENV_V1.host]: '127.0.0.1',
          [PRODUCTION_CALCULATION_PROCESS_ENV_V1.port]: '4321',
        }),
      ),
    ).toEqual({
      serviceBearer: ACTIVE_BEARER,
      previousServiceBearer: PREVIOUS_BEARER,
      host: '127.0.0.1',
      port: 4321,
    });
  });

  it.each([undefined, '', 'token with whitespace', '\tsecret']) (
    'fails closed for a missing or invalid active bearer: %s',
    (serviceBearer) => {
      expect(() =>
        readMyeonghwaProductionCalculationProcessConfigV1(
          environment({ [PRODUCTION_CALCULATION_PROCESS_ENV_V1.serviceBearer]: serviceBearer }),
        ),
      ).toThrow(ProductionCalculationProcessConfigErrorV1);
    },
  );

  it('treats an empty previous bearer as unset but rejects whitespace credentials', () => {
    expect(
      readMyeonghwaProductionCalculationProcessConfigV1(
        environment({ [PRODUCTION_CALCULATION_PROCESS_ENV_V1.previousServiceBearer]: '' }),
      ),
    ).not.toHaveProperty('previousServiceBearer');

    expect(() =>
      readMyeonghwaProductionCalculationProcessConfigV1(
        environment({
          [PRODUCTION_CALCULATION_PROCESS_ENV_V1.previousServiceBearer]: 'previous token',
        }),
      ),
    ).toThrow(ProductionCalculationProcessConfigErrorV1);
  });

  it.each(['', '0', '65536', '1.5', '-1', '+3000', 'not-a-port'])(
    'rejects invalid PORT=%s',
    (port) => {
      expect(() =>
        readMyeonghwaProductionCalculationProcessConfigV1(
          environment({ [PRODUCTION_CALCULATION_PROCESS_ENV_V1.port]: port }),
        ),
      ).toThrow(ProductionCalculationProcessConfigErrorV1);
    },
  );

  it.each(['', ' localhost', 'localhost ', 'local host'])(
    'rejects invalid bind host=%s',
    (host) => {
      expect(() =>
        readMyeonghwaProductionCalculationProcessConfigV1(
          environment({ [PRODUCTION_CALCULATION_PROCESS_ENV_V1.host]: host }),
        ),
      ).toThrow(ProductionCalculationProcessConfigErrorV1);
    },
  );

  it('does not reflect credential values in configuration errors', () => {
    const secret = 'do not reflect this secret';
    let message = '';
    try {
      readMyeonghwaProductionCalculationProcessConfigV1(
        environment({ [PRODUCTION_CALCULATION_PROCESS_ENV_V1.serviceBearer]: secret }),
      );
    } catch (error) {
      message = error instanceof Error ? error.message : String(error);
    }
    expect(message).not.toContain(secret);
    expect(message).toContain(PRODUCTION_CALCULATION_PROCESS_ENV_V1.serviceBearer);
  });
});

describe('production calculation process composition', () => {
  it('wires active and previous bearer credentials into the existing calculation-only host', async () => {
    const runtime = createMyeonghwaProductionCalculationProcessV1(
      environment({
        [PRODUCTION_CALCULATION_PROCESS_ENV_V1.previousServiceBearer]: PREVIOUS_BEARER,
        [PRODUCTION_CALCULATION_PROCESS_ENV_V1.host]: '127.0.0.1',
        [PRODUCTION_CALCULATION_PROCESS_ENV_V1.port]: '4321',
      }),
    );

    expect(runtime.host).toBe('127.0.0.1');
    expect(runtime.port).toBe(4321);

    const port = await listenEphemeral(runtime.server);
    try {
      const health = await fetch(`http://127.0.0.1:${port}/health`);
      expect(health.status).toBe(200);

      const unauthenticated = await fetch(`http://127.0.0.1:${port}/api/calculations`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: '{',
      });
      expect(unauthenticated.status).toBe(401);

      for (const bearer of [ACTIVE_BEARER, PREVIOUS_BEARER]) {
        const authorized = await fetch(`http://127.0.0.1:${port}/api/calculations`, {
          method: 'POST',
          headers: {
            authorization: `Bearer ${bearer}`,
            'content-type': 'application/json',
          },
          body: '{',
        });
        expect(authorized.status).toBe(400);
      }

      const rejected = await fetch(`http://127.0.0.1:${port}/api/calculations`, {
        method: 'POST',
        headers: {
          authorization: 'Bearer wrong-service-token',
          'content-type': 'application/json',
        },
        body: '{',
      });
      expect(rejected.status).toBe(401);
    } finally {
      await close(runtime.server);
    }
  });
});
