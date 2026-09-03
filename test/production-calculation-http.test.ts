import { readFile } from 'node:fs/promises';
import type { AddressInfo } from 'node:net';
import { describe, expect, it } from 'vitest';
import {
  PRODUCTION_CALCULATION_HTTP_RESPONSE_SCHEMA_VERSION,
  createMyeonghwaProductionCalculationHostServer,
  serializeAuthorizedProductionCalculationHttpResponseV1,
} from '../src/production-calculation-host.js';
import { parseProductHostCalculationRequest } from '../src/host/product-host.js';
import { calculateAuthorizedMyeonghwaProductionSnapshot } from '../src/production/production-calculation-runtime.js';

const VALID_BIRTH = {
  calendarType: 'solar',
  date: '2001-07-14',
  time: '15:20',
  sex: 'unspecified',
} as const;

const TEST_SERVICE_BEARER = 'production-calculation-http-test-bearer-6f7c8d9e';
const AUTHORIZATION = `Bearer ${TEST_SERVICE_BEARER}`;

async function listen(): Promise<{ baseUrl: string; close: () => Promise<void> }> {
  const server = createMyeonghwaProductionCalculationHostServer({
    serviceBearer: TEST_SERVICE_BEARER,
  });
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

function sortedKeys(value: object): string[] {
  return Object.keys(value).sort();
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

  it('executes only the ADR-0006 authorized production calculation through a versioned public DTO', async () => {
    const server = await listen();
    try {
      const response = await fetch(`${server.baseUrl}/api/calculations`, {
        method: 'POST',
        headers: {
          authorization: AUTHORIZATION,
          'content-type': 'application/json',
        },
        body: JSON.stringify({ birth: VALID_BIRTH }),
      });
      const payload = (await response.json()) as {
        responseSchemaVersion: string;
        runtimeVersion: string;
        authority: Record<string, unknown>;
        snapshot: {
          policy: Record<string, unknown>;
          input: Record<string, unknown> & {
            date: Record<string, unknown>;
            time: Record<string, unknown>;
          };
          normalized: { appliedCorrections: readonly Record<string, unknown>[] };
          pillars: Record<string, unknown>;
          calculationHash: string;
          solarTermContext?: unknown;
        };
      };

      expect(response.status).toBe(200);
      expect(payload.responseSchemaVersion).toBe(
        PRODUCTION_CALCULATION_HTTP_RESPONSE_SCHEMA_VERSION,
      );
      expect(sortedKeys(payload)).toEqual([
        'authority',
        'responseSchemaVersion',
        'runtimeVersion',
        'snapshot',
      ]);
      expect(sortedKeys(payload.authority)).toEqual([
        'authorityRecordRef',
        'authorizationId',
        'calculationPolicyId',
        'contentHash',
        'policyVersion',
      ]);
      expect(payload.authority).toMatchObject({
        calculationPolicyId: 'myeonghwa-production-civil-midnight-v1',
        authorizationId: 'myeonghwa-production-calculation-default-authorization-v1',
        authorityRecordRef: 'docs/decisions/ADR-0006-production-calculation-default-v1.md',
        policyVersion: 'myeonghwa-production-calculation-policy-v1',
      });

      const expectedSnapshotKeys = [
        'calculationHash',
        'completeness',
        'createdAt',
        'derivedFacts',
        'input',
        'luckCycle',
        'normalized',
        'pillars',
        'policy',
        'provenance',
        'schemaVersion',
        'snapshotId',
      ];
      if (payload.snapshot.solarTermContext !== undefined) {
        expectedSnapshotKeys.push('solarTermContext');
      }
      expect(sortedKeys(payload.snapshot)).toEqual(expectedSnapshotKeys.sort());
      expect(sortedKeys(payload.snapshot.policy)).toEqual([
        'dayBoundary',
        'policyId',
        'policyVersion',
        'timeZonePolicy',
        'trueSolarTime',
        'unknownBirthTimePolicy',
      ]);
      expect(sortedKeys(payload.snapshot.input.date)).toEqual(['day', 'month', 'year']);
      expect(sortedKeys(payload.snapshot.input.time)).toEqual(['hour', 'known', 'minute']);
      expect(sortedKeys(payload.snapshot.pillars)).toEqual(['day', 'hour', 'month', 'year']);
      for (const correction of payload.snapshot.normalized.appliedCorrections) {
        expect(sortedKeys(correction)).toEqual(['applied', 'type']);
      }

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
      expect(keys).not.toContain('scenarios');
      expect(keys).not.toContain('details');
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

  it('strips future internal fields recursively instead of relying on a denylist', () => {
    const input = parseProductHostCalculationRequest({ birth: VALID_BIRTH });
    const result = calculateAuthorizedMyeonghwaProductionSnapshot(input);
    const poisoned = {
      ...result,
      diagnostics: { shouldNeverEscape: true },
      authority: {
        ...result.authority,
        methodologyRanking: 99,
      },
      snapshot: {
        ...result.snapshot,
        internalResearchPayload: { score: 1 },
        policy: {
          ...result.snapshot.policy,
          callerSelectable: true,
        },
        normalized: {
          ...result.snapshot.normalized,
          internalNormalizationScore: 0.91,
          appliedCorrections: result.snapshot.normalized.appliedCorrections.map((correction) => ({
            ...correction,
            details: { internalWitness: 'research-only' },
            internalCorrectionScore: 0.5,
          })),
        },
        scenarios: [
          ...result.snapshot.scenarios,
          {
            scenarioId: 'internal-only',
            snapshotId: 'internal-only',
            factOverrides: [
              { path: 'internal', candidateId: 'internal', value: { secret: true } },
            ],
            reasonRefs: ['internal'],
          },
        ],
      },
    };

    const serialized = serializeAuthorizedProductionCalculationHttpResponseV1(poisoned);
    const keys = collectKeys(serialized);

    expect(keys).not.toContain('diagnostics');
    expect(keys).not.toContain('methodologyRanking');
    expect(keys).not.toContain('internalResearchPayload');
    expect(keys).not.toContain('callerSelectable');
    expect(keys).not.toContain('internalNormalizationScore');
    expect(keys).not.toContain('internalCorrectionScore');
    expect(keys).not.toContain('details');
    expect(keys).not.toContain('scenarios');
    expect(keys).not.toContain('secret');
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
          headers: {
            authorization: AUTHORIZATION,
            'content-type': 'application/json',
          },
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
        headers: {
          authorization: AUTHORIZATION,
          'content-type': 'text/plain',
        },
        body: '{}',
      });
      expect(wrongType.status).toBe(415);

      const malformed = await fetch(`${server.baseUrl}/api/calculations`, {
        method: 'POST',
        headers: {
          authorization: AUTHORIZATION,
          'content-type': 'application/json',
        },
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
