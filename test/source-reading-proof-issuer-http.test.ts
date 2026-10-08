import { type Server } from 'node:http';
import type { AddressInfo } from 'node:net';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import type { CalculationPolicySnapshot } from '../src/contracts/calculation.js';
import { parseProductHostReadingRequest } from '../src/host/product-host.js';
import {
  createMyeonghwaSourceReadingProofIssuerHttpServerV1,
  SOURCE_READING_PROOF_HTTP_PATH_V1,
} from '../src/host/source-reading-proof-issuer-http.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { SUPPORTED_NARRATIVE_OUTPUT_SCHEMA } from '../src/llm/prompt-compiler.js';
import { createGeneralNatalUsefulReadingCandidateRegistry } from '../src/research/general-natal-useful-reading-candidate.js';
import { createI7SeasonalSupportRegistry } from '../src/research/i7-seasonal-support-pack.js';
import { verifyHeldSourceReadingTransportProofV1 } from '../src/reading/source-reading-transport-proof.js';
import type { ProductReadingResponse } from '../src/reading/product-reading-response.js';
import type { SourceReadingSignedTransportProofV1 } from '../src/reading/source-reading-transport-proof.js';

const keyBytes = Buffer.alloc(32, 83);
const issuedAtMs = 1_800_000_000_000;
const bearer = 'proof-http-test-bearer-0123456789';
const nonce = 'Q'.repeat(24);
const body = {
  birth: { calendarType: 'solar', date: '2024-03-10', time: '12:00', sex: 'unspecified' },
  reading: { text: '사주' },
};
const policy: CalculationPolicySnapshot = {
  policyId: 'myeonghwa/source-proof-http-test', policyVersion: '1.0.0',
  dayBoundary: 'midnight',
  trueSolarTime: {
    enabled: false, longitudeSource: 'not-applicable',
    applyEquationOfTime: false, applyHistoricalDst: false,
  },
  timeZonePolicy: { source: 'service-default', timeZone: 'Asia/Seoul' },
  unknownBirthTimePolicy: 'preserve-unknown-and-enumerate-boundaries',
};
const config = {
  serviceBearer: bearer, issuer: 'saju-preview-service',
  audience: 'myeongha-api-service', keyId: 'preview-key-v1',
  keyBytes, ttlMs: 60_000, nowMsFactory: () => issuedAtMs,
};
function fixture(withEvidence = true) {
  const calculate = vi.fn((input: Parameters<typeof calculateCanonicalSajuSnapshot>[0]) =>
    calculateCanonicalSajuSnapshot(input, policy, {
      now: new Date('2026-08-24T00:00:00.000Z'),
    }));
  const interpret = vi.fn((snapshot: ReturnType<typeof calculateCanonicalSajuSnapshot>) => {
    const registry = withEvidence
      ? createGeneralNatalUsefulReadingCandidateRegistry('2026-08-24T00:04:00.000Z')
      : createI7SeasonalSupportRegistry();
    return {
      registry,
      interpretation: runInterpretation(snapshot, registry, {
        requestId: 'proof-http-test', now: new Date('2026-08-24T00:05:00.000Z'),
      }),
    };
  });
  return {
    calculate, interpret,
    readingOptions: {
      outputSchemaVersion: SUPPORTED_NARRATIVE_OUTPUT_SCHEMA,
      readingVersion: 'source-proof-http-test-v1',
      narrativeNow: new Date('2026-08-24T00:06:00.000Z'),
      artifactGeneratedAt: new Date('2026-08-24T00:07:00.000Z'),
    },
    requestIdFactory: () => 'proof-http-test',
    requestNowFactory: () => new Date('2026-08-24T00:06:00.000Z'),
  };
}
type Fixture = ReturnType<typeof fixture>;
const servers: Server[] = [];
afterEach(async () => {
  await Promise.all(servers.splice(0).map((server) => new Promise<void>((resolve) =>
    server.close(() => resolve()))));
});
async function listen(d: Fixture = fixture(), options = config) {
  const server = createMyeonghwaSourceReadingProofIssuerHttpServerV1(d, options);
  servers.push(server);
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
  return { base: `http://127.0.0.1:${(server.address() as AddressInfo).port}`, d };
}
function post(base: string, request: unknown = { nonce, request: body },
  authorization = `Bearer ${bearer}`) {
  return fetch(base + SOURCE_READING_PROOF_HTTP_PATH_V1, {
    method: 'POST',
    headers: { authorization, 'content-type': 'application/json' },
    body: JSON.stringify(request),
  });
}
describe('2B-3C-2 Preview source proof HTTP', () => {
  it('binds single Saju execution, normalized request, response and nonce while keeping HOLD', async () => {
    const d = fixture();
    const { base } = await listen(d);
    const result = await post(base);
    expect(result.status).toBe(200);
    expect(result.headers.get('cache-control')).toBe('no-store');
    const output = await result.json() as {
      schemaVersion: string; state: string; lifecycle: string;
      response: ProductReadingResponse; proof: SourceReadingSignedTransportProofV1;
      productionInterpretationAuthority: string; releaseAuthorization: string;
      canExecute: boolean; canPublish: boolean; canSell: boolean;
    };
    expect(d.calculate).toHaveBeenCalledTimes(1);
    expect(d.interpret).toHaveBeenCalledTimes(1);
    expect(output).toMatchObject({
      schemaVersion: 'myeonghwa-source-reading-proof-http-v1',
      state: 'held', lifecycle: 'preview',
      productionInterpretationAuthority: 'NOT_EVALUATED',
      releaseAuthorization: 'NOT_EVALUATED',
      canExecute: false, canPublish: false, canSell: false,
    });
    expect(output.response).not.toHaveProperty('material');
    const seen = new Set<string>();
    const options = {
      trustedIssuer: config.issuer, expectedAudience: config.audience,
      trustedKeyId: config.keyId, keyBytes, expectedNonce: nonce,
      expectedRequestBody: parseProductHostReadingRequest(body),
      response: output.response, nowMs: issuedAtMs + 1000,
      claimNonceOnce: async (key: string) => {
        if (seen.has(key)) return false;
        seen.add(key); return true;
      },
    };
    expect(await verifyHeldSourceReadingTransportProofV1(output.proof, options))
      .toMatchObject({ state: 'held', transportIntegrity: 'VERIFIED', canSell: false });
    expect(await verifyHeldSourceReadingTransportProofV1(output.proof, options))
      .toMatchObject({ state: 'blocked', canSell: false });
    expect(await verifyHeldSourceReadingTransportProofV1(output.proof, {
      ...options, expectedRequestBody: { ...body, reading: { text: '연애운' } },
    })).toMatchObject({ state: 'blocked' });
  });

  it('rejects unauthenticated, malformed or injected requests before calculation', async () => {
    const d = fixture();
    const { base } = await listen(d);
    expect((await post(base, undefined, 'Bearer wrong')).status).toBe(401);
    for (const input of [
      { nonce: 'weak', request: body },
      { nonce, request: body, canSell: true },
      { nonce, request: { ...body, sourceEvidenceRef: 'fake' } },
      { nonce, request: { ...body, birth: { ...body.birth, policyId: 'fake' } } },
      { nonce, request: { ...body, reading: { text: '사주', canSell: true } } },
    ]) expect((await post(base, input)).status).toBe(400);
    expect(d.calculate).not.toHaveBeenCalled();
    expect(d.interpret).not.toHaveBeenCalled();
  });

  it('returns 409 without a signature for missing source evidence', async () => {
    const d = fixture(false);
    const { base } = await listen(d);
    const result = await post(base);
    expect(result.status).toBe(409);
    expect(await result.json()).toMatchObject({ error: { code: 'SOURCE_PROOF_NOT_READY' } });
    expect(d.calculate).toHaveBeenCalledTimes(1);
  });

  it('does not mount general Reading, calculation, or HTML endpoints', async () => {
    const d = fixture();
    const { base } = await listen(d);
    for (const path of ['/api/readings', '/api/preview/readings', '/api/calculations', '/']) {
      expect((await fetch(base + path)).status).toBe(404);
    }
    expect((await fetch(base + SOURCE_READING_PROOF_HTTP_PATH_V1)).status).toBe(405);
    expect(d.calculate).not.toHaveBeenCalled();
  });

  it('checks media type, bounded body and fail-closed configuration', async () => {
    const d = fixture();
    const { base } = await listen(d);
    const headers = { authorization: `Bearer ${bearer}` };
    expect((await fetch(base + SOURCE_READING_PROOF_HTTP_PATH_V1, {
      method: 'POST', headers: { ...headers, 'content-type': 'text/plain' }, body: 'x',
    })).status).toBe(415);
    expect((await fetch(base + SOURCE_READING_PROOF_HTTP_PATH_V1, {
      method: 'POST', headers: { ...headers, 'content-type': 'application/json' },
      body: '{bad',
    })).status).toBe(400);
    expect((await post(base, { nonce, request: body, padding: 'A'.repeat(20_000) }))
      .status).toBe(413);
    expect(d.calculate).not.toHaveBeenCalled();
    for (const bad of [
      { ...config, keyBytes: Buffer.alloc(8) },
      { ...config, ttlMs: 200_000 }, { ...config, serviceBearer: '' },
      { ...config, issuer: 'bad issuer' }, { ...config, maxRequestBytes: 50_000 },
    ]) expect(() => createMyeonghwaSourceReadingProofIssuerHttpServerV1(d, bad))
      .toThrow();
  });
});
