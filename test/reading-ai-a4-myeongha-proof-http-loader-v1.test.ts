import { describe, expect, it, vi } from 'vitest';
import {
  createSajuA4MyeongHaProofHttpLoaderV1,
  SAJU_A4_PRIVATE_PROOF_ROUTE_V1,
} from '../src/production/reading-ai-a4-myeongha-proof-http-loader-v1.js';

const ATTEMPT = '123e4567-e89b-42d3-a456-426614174002';
const OTHER = '123e4567-e89b-42d3-a456-426614174003';
const TOKEN = 'server-to-server-test-bearer-credential-only';
const PROOF = {
  payload: {
    version: 'myeongha-a4-prepared-attempt-proof-v1',
    issuer: 'myeongha-production',
    audience: 'saju-production-a4',
    keyId: 'mh-a4-prepared-v1',
    issuedAtMs: 1794380000000,
    expiresAtMs: 1794380090000,
    executionAttemptId: ATTEMPT,
    readingId: '123e4567-e89b-42d3-a456-426614174001',
    subjectId: '123e4567-e89b-42d3-a456-426614174000',
  },
  signatureHex: 'a'.repeat(64),
};
const asJson = (value: unknown) =>
  new Response(JSON.stringify(value), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });

function fixture(fetchImpl: (url: string, init: RequestInit) => Promise<Response>) {
  const called = vi.fn(fetchImpl);
  return {
    loader: createSajuA4MyeongHaProofHttpLoaderV1({
      origin: 'https://myeongha-internal.example.test',
      bearerToken: TOKEN,
      fetchImpl: called,
    }),
    called,
  };
}

describe('A4 Saju private HTTPS retrieval of the MyeongHa signed DB-prepared proof', () => {
  it('uses exact HTTPS GET route with separate service bearer and no redirect/cache/cookies', async () => {
    const x = fixture(async () => asJson(PROOF));
    expect(await x.loader.loadSignedProof(ATTEMPT)).toEqual(PROOF);
    expect(x.called).toHaveBeenCalledOnce();
    const [url, init] = x.called.mock.calls[0]!;
    expect(url).toBe(
      'https://myeongha-internal.example.test' +
        SAJU_A4_PRIVATE_PROOF_ROUTE_V1 +
        '/' +
        ATTEMPT +
        '/proof',
    );
    expect(init).toMatchObject({
      method: 'GET',
      redirect: 'error',
      cache: 'no-store',
      credentials: 'omit',
      headers: { authorization: 'Bearer ' + TOKEN, accept: 'application/json' },
    });
  });

  it('preserves missing proof as unadmitted and other HTTP failures as hard failures', async () => {
    const x = fixture(async () => new Response(null, { status: 404 }));
    await expect(x.loader.loadSignedProof(ATTEMPT)).resolves.toBeNull();
    for (const code of [401, 403, 408, 429, 500, 503, 302]) {
      const fail = fixture(async () => new Response(null, { status: code }));
      await expect(fail.loader.loadSignedProof(ATTEMPT)).rejects.toThrow('service unavailable');
    }
  });

  it('rejects mismatched attempt ID, unexpected fields and forged envelope shapes', async () => {
    for (const raw of [
      { ...PROOF, payload: { ...PROOF.payload, executionAttemptId: OTHER } },
      { ...PROOF, clientRef: 'forbidden' },
      { ...PROOF, payload: { ...PROOF.payload, birth: 'private-birth' } },
      { ...PROOF, signatureHex: 'bad' },
      [],
      null,
    ]) {
      const x = fixture(async () => asJson(raw));
      await expect(x.loader.loadSignedProof(ATTEMPT)).rejects.toThrow(
        'identity or envelope invalid',
      );
    }
  });

  it('rejects wrong content-type, invalid JSON and responses exceeding 4096 bytes', async () => {
    const bad = [
      new Response(JSON.stringify(PROOF), {
        status: 200,
        headers: { 'Content-Type': 'text/html' },
      }),
      new Response('not-json', { status: 200, headers: { 'Content-Type': 'application/json' } }),
      new Response('x'.repeat(5000), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
      new Response(null, {
        status: 200,
        headers: { 'Content-Type': 'application/json', 'Content-Length': '99999999' },
      }),
    ];
    for (const r of bad) {
      const x = fixture(async () => r);
      await expect(x.loader.loadSignedProof(ATTEMPT)).rejects.toThrow();
    }
  });

  it('rejects all invalid identifiers before any network request', async () => {
    const x = fixture(async () => asJson(PROOF));
    for (const id of [
      '',
      'user-id',
      ATTEMPT + '/../../',
      ATTEMPT + '?url=bad',
      OTHER.toUpperCase(),
    ]) {
      await expect(x.loader.loadSignedProof(id)).resolves.toBeNull();
    }
    expect(x.called).not.toHaveBeenCalled();
  });

  it('does not allow HTTP endpoints, credentials in origin, path injection or weak auth', () => {
    for (const origin of [
      'http://myeongha-internal.example.test',
      'https://user:password@myeongha.example.test',
      'https://myeongha.example.test/redirect',
      'https://myeongha.example.test?target=other',
    ]) {
      expect(() =>
        createSajuA4MyeongHaProofHttpLoaderV1({
          origin,
          bearerToken: TOKEN,
        }),
      ).toThrow();
    }
    expect(() =>
      createSajuA4MyeongHaProofHttpLoaderV1({
        origin: 'https://myeongha.example.test',
        bearerToken: 'short',
      }),
    ).toThrow();
  });

  it('enforces a bounded fetch deadline without invoking a secondary endpoint', () => {
    const x = fixture(async () => asJson(PROOF));
    expect(() =>
      createSajuA4MyeongHaProofHttpLoaderV1({
        origin: 'https://myeongha.example.test',
        bearerToken: TOKEN,
        timeoutMs: 999999,
      }),
    ).toThrow();
    expect(x.called).not.toHaveBeenCalled();
  });
});
