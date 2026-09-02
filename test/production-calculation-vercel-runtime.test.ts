import { access, readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';
import calculationsEndpoint from '../api/calculations.js';
import healthEndpoint from '../api/healthz.js';
import { PRODUCTION_CALCULATION_HTTP_RESPONSE_SCHEMA_VERSION } from '../src/production-calculation-host.js';

const VALID_BIRTH = {
  calendarType: 'solar',
  date: '2001-07-14',
  time: '15:20',
  sex: 'unspecified',
} as const;

function calculationRequest(body: unknown, contentType = 'application/json'): Request {
  return new Request('https://saju.example/api/calculations', {
    method: 'POST',
    headers: { 'content-type': contentType },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  });
}

describe('production calculation Vercel runtime', () => {
  it('exposes a GET-only health boundary for the calculation service', async () => {
    const response = healthEndpoint.fetch(new Request('https://saju.example/api/healthz'));
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      status: 'ok',
      hostVersion: PRODUCTION_CALCULATION_HTTP_RESPONSE_SCHEMA_VERSION,
    });

    const wrongMethod = healthEndpoint.fetch(
      new Request('https://saju.example/api/healthz', { method: 'POST' }),
    );
    expect(wrongMethod.status).toBe(405);
    expect(wrongMethod.headers.get('allow')).toBe('GET');
  });

  it('keeps the Vercel calculation endpoint POST-only and JSON-only', async () => {
    const wrongMethod = await calculationsEndpoint.fetch(
      new Request('https://saju.example/api/calculations'),
    );
    expect(wrongMethod.status).toBe(405);
    expect(wrongMethod.headers.get('allow')).toBe('POST');

    const wrongType = await calculationsEndpoint.fetch(calculationRequest('{}', 'text/plain'));
    expect(wrongType.status).toBe(415);
    expect(await wrongType.json()).toEqual({
      error: {
        code: 'HOST_UNSUPPORTED_MEDIA_TYPE',
        message: 'application/json is required.',
      },
    });

    const malformed = await calculationsEndpoint.fetch(calculationRequest('{broken'));
    expect(malformed.status).toBe(400);
    expect(await malformed.json()).toEqual({
      error: {
        code: 'HOST_INVALID_JSON',
        message: 'Request body must contain valid JSON.',
      },
    });
  });

  it('rejects policy and reading injection before calculation', async () => {
    const cases = [
      {
        birth: VALID_BIRTH,
        calculationPolicyId: 'caller-selected-policy',
      },
      {
        birth: {
          ...VALID_BIRTH,
          calculationPolicyId: 'caller-selected-policy',
        },
      },
      {
        birth: VALID_BIRTH,
        reading: { text: '직업운' },
      },
    ] as const;

    for (const body of cases) {
      const response = await calculationsEndpoint.fetch(calculationRequest(body));
      expect(response.status).toBe(400);
      const payload = (await response.json()) as { error: { code: string } };
      expect(payload.error.code).toMatch(/^HOST_INVALID_(REQUEST_BODY|BIRTH_INPUT)$/u);
    }
  });

  it('returns only the governed ADR-0006 production calculation DTO', async () => {
    const response = await calculationsEndpoint.fetch(
      calculationRequest({ birth: VALID_BIRTH }),
    );
    expect(response.status).toBe(200);

    const payload = (await response.json()) as {
      responseSchemaVersion: string;
      runtimeVersion: string;
      authority: {
        calculationPolicyId: string;
        authorizationId: string;
        authorityRecordRef: string;
        policyVersion: string;
      };
      snapshot: {
        policy: { policyId: string; policyVersion: string; dayBoundary: string };
      };
    };

    expect(payload.responseSchemaVersion).toBe(
      PRODUCTION_CALCULATION_HTTP_RESPONSE_SCHEMA_VERSION,
    );
    expect(payload.runtimeVersion).toBe('myeonghwa-production-calculation-runtime-v1');
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
  });

  it('keeps the deployed surface calculation-only', async () => {
    await expect(access(new URL('../api/readings.ts', import.meta.url))).rejects.toThrow();

    const vercelConfig = JSON.parse(
      await readFile(new URL('../vercel.json', import.meta.url), 'utf8'),
    ) as {
      rewrites: readonly { source: string; destination: string }[];
    };

    expect(vercelConfig.rewrites).toEqual([
      { source: '/healthz', destination: '/api/healthz' },
    ]);
  });
});
