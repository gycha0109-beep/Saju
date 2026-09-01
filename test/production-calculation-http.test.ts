import { readFile } from 'node:fs/promises';
import type { AddressInfo } from 'node:net';
import { describe, expect, it } from 'vitest';
import { createMyeonghwaProductionCalculationHostServer } from '../src/production-calculation-host.js';
import { parseProductHostCalculationRequest } from '../src/host/product-host.js';

const VALID_BIRTH = {
  calendarType: 'solar',
  date: '2001-07-14',
  time: '15:20',
  sex: 'unspecified',
} as const;

async function listen(): Promise<{ baseUrl: string; close: () => Promise<void> }> {
  const server = createMyeonghwaProductionCalculationHostServer();
  await new Promise<void>((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', () => resolve());
  });
  const address = server.address() as AddressInfo;
  return {
    baseUrl: `http://127.0.0.1:${address.port}`,
    close: () =>
      new Promise<void>((resolve, reject) => {
        server.close((error) => (error === undefined ? resolve() : reject(error)));
      }),
  };
}

function collectKeys(value: unknown, keys = new Set<string>()): Set<string> {
  if (Array.isArray(value)) {
    for (const item of value) collectKeys(item, keys);
    return keys;
  }
  if (typeof value !== 'object' || value === null) return keys;
  for (const [key, child] of Object.entries(value)) {
    keys.add(key);
    collectKeys(child, keys);
  }
  return keys;
}

describe('production calculation HTTP boundary', () => {
  it('normalizes only the existing consumer birth shape', () => {
    expect(parseProductHostCalculationRequest({ birth: VALID_BIRTH })).toEqual({
      calendarType: 'solar',
      date: { year: 2001, month: 7, day: 14 },
      time: { known: true, hour: 15, minute: 20 },
      sexForTraditionalCalculation: 'unspecified',
    });
  });

  it('starts without interpretation, narrative, reading-pack, or registry dependencies', async () => {
    const server = await listen();
    try {
      const reading = await fetch(`${server.baseUrl}/api/readings`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ birth: VALID_BIRTH, reading: { text: '직업운' } }),
      });
      expect(reading.status).toBe(404);
      expect(await reading.json()).toEqual({
        error: { code: 'HOST_ROUTE_NOT_FOUND', message: 'Route not found.' },
      });
    } finally {
      await server.close();
    }
  });

  it('executes only the ADR-0006 authorized production calculation through POST /api/calculations', async () => {
    const server = await listen();
    try {
      const response = await fetch(`${server.baseUrl}/api/calculations`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ birth: VALID_BIRTH }),
      });
      const payload = (await response.json()) as {
        runtimeVersion: string;
        authority: Record<string, unknown>;
        snapshot: {
          policy: Record<string, unknown>;
          input: Record<string, unknown>;
          calculationHash: string;
        };
      };

      expect(response.status).toBe(200);
      expect(Object.keys(payload).sort()).toEqual(['authority', 'runtimeVersion', 'snapshot']);
      expect(payload.authority).toMatchObject({
        calculationPolicyId: 'myeonghwa-production-civil-midnight-v1',
        authorizationId: 'myeonghwa-production-calculation-default-authorization-v1',
        authorityRecordRef: 'docs/decisions/ADR-0006-production-calculation-default-v1.md',
        policyVersion: 'myeonghwa-production-calculation-policy-v1',
      });
      expect(payload.snapshot.policy).toMatchObject({
        policyId: 'myeonghwa/production/civil-midnight-v1',
        policyVersion: 'myeonghwa-production-calculation-policy-v1',
        dayBoundary: 'midnight',
      });
      expect(payload.snapshot.input).toMatchObject({
        calendarType: 'solar',
        date: { year: 2001, month: 7, day: 14 },
        time: { known: true, hour: 15, minute: 20 },
      });
      expect(payload.snapshot.calculationHash).toBeTruthy();

      const keys = collectKeys(payload);
      expect(keys).not.toContain('diagnostics');
      expect(keys).not.toContain('sensitivityProfile');
      expect(keys).not.toContain('methodologyRanking');
      expect(keys).not.toContain('accuracyScore');
      expect(keys).not.toContain('alternateSnapshots');
      expect(keys).not.toContain('interpretation');
      expect(keys).not.toContain('reading');
    } finally {
      await server.close();
    }
  });

  it('fails closed on calculation-policy injection, reading injection, and invalid birth input', async () => {
    const server = await listen();
    try {
      const cases: readonly {
        body: unknown;
        expectedCode: string;
      }[] = [
        {
          body: {
            birth: VALID_BIRTH,
            calculationPolicyId: 'caller-selected-policy',
          },
          expectedCode: 'HOST_INVALID_REQUEST_BODY',
        },
        {
          body: {
            birth: {
              ...VALID_BIRTH,
              calculationPolicyId: 'caller-selected-policy',
            },
          },
          expectedCode: 'HOST_INVALID_BIRTH_INPUT',
        },
        {
          body: {
            birth: VALID_BIRTH,
            reading: { text: '직업운' },
          },
          expectedCode: 'HOST_INVALID_REQUEST_BODY',
        },
        {
          body: {
            birth: {
              ...VALID_BIRTH,
              date: '2001-02-31',
            },
          },
          expectedCode: 'HOST_INVALID_BIRTH_INPUT',
        },
      ];

      for (const testCase of cases) {
        const response = await fetch(`${server.baseUrl}/api/calculations`, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(testCase.body),
        });
        expect(response.status).toBe(400);
        expect(await response.json()).toEqual({
          error: {
            code: testCase.expectedCode,
            message: 'The request payload is invalid.',
          },
        });
      }
    } finally {
      await server.close();
    }
  });

  it('keeps the calculation endpoint behind the existing JSON and method boundaries', async () => {
    const server = await listen();
    try {
      const wrongMethod = await fetch(`${server.baseUrl}/api/calculations`);
      expect(wrongMethod.status).toBe(405);
      expect(wrongMethod.headers.get('allow')).toBe('POST');

      const wrongType = await fetch(`${server.baseUrl}/api/calculations`, {
        method: 'POST',
        headers: { 'content-type': 'text/plain' },
        body: '{}',
      });
      expect(wrongType.status).toBe(415);

      const malformed = await fetch(`${server.baseUrl}/api/calculations`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: '{broken',
      });
      expect(malformed.status).toBe(400);
      expect(await malformed.json()).toEqual({
        error: { code: 'HOST_INVALID_JSON', message: 'Request body must contain valid JSON.' },
      });
    } finally {
      await server.close();
    }
  });

  it('registers a dedicated calculation-only package subpath without changing product-host', async () => {
    const packageJson = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8')) as {
      exports: Record<string, { types: string; default: string }>;
    };

    expect(packageJson.exports['./production-calculation-host']).toEqual({
      types: './dist/production-calculation-host.d.ts',
      default: './dist/production-calculation-host.js',
    });
    expect(packageJson.exports['./product-host']).toEqual({
      types: './dist/product-host.d.ts',
      default: './dist/product-host.js',
    });
  });
});
