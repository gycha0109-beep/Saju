import { createServer, type Server } from 'node:http';
import type { AddressInfo } from 'node:net';
import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  createSourceReadingProofProcessV1,
  createSourceReadingProofStagingDependencies,
  startSourceReadingProofProcessV1,
} from '../src/source-reading-proof-process.js';
import { createMyeonghwaSourceReadingProofHost } from '../src/host/product-host.js';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import {
  readSourceProofProcessConfigV1,
  SOURCE_PROOF_PROCESS_ENV_V1 as fields,
  SourceProofConfigErrorV1,
} from '../src/source-reading-proof-runtime-config.js';
import { createApprovedSourceProofPreviewDependenciesV1 } from '../src/preview/preview-product-host.js';
import { SOURCE_READING_PROOF_HTTP_PATH_V1 } from '../src/host/source-reading-proof-issuer-http.js';

const bearer = 'isolated-source-proof-credential';
const secret = Buffer.alloc(48, 83).toString('base64');
const nonce = 'N'.repeat(24);
const birthRequest = {
  birth: { calendarType: 'solar', date: '2024-03-10', time: '12:00', sex: 'unspecified' },
  reading: { text: '사주' },
};
function env(override: Record<string, string | undefined> = {}) {
  return {
    [fields.port]: '54321',
    [fields.bearer]: bearer,
    [fields.key]: secret,
    [fields.issuer]: 'saju-preview-service',
    [fields.audience]: 'myeongha-api-service',
    [fields.keyId]: 'preview-key-v1',
    ...override,
  };
}
const open: Server[] = [];
afterEach(async () => {
  await Promise.all(open.splice(0).map(server => new Promise<void>(resolve => {
    if (!server.listening) { resolve(); return; }
    server.close(() => resolve());
    server.closeAllConnections();
  })));
});
function reject(override: Record<string, string | undefined>) {
  expect(() => readSourceProofProcessConfigV1(env(override))).toThrow(SourceProofConfigErrorV1);
}
async function availablePort(): Promise<number> {
  const server = createServer();
  await new Promise<void>(resolve => server.listen(0, '127.0.0.1', resolve));
  const addr = server.address() as AddressInfo;
  await new Promise<void>(resolve => server.close(() => resolve()));
  return addr.port;
}
function post(port: number, authorization?: string, body: unknown = { nonce, request: birthRequest }) {
  return fetch('http://127.0.0.1:' + port + SOURCE_READING_PROOF_HTTP_PATH_V1, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      ...(authorization === undefined ? {} : { authorization }),
    },
    body: JSON.stringify(body),
  });
}

describe('8C-2B-2B dedicated source proof configuration', () => {
  it('requires isolated values and binds only to loopback by default', () => {
    const actual = readSourceProofProcessConfigV1(env());
    expect(actual.host).toBe('127.0.0.1');
    expect(actual.port).toBe(54321);
    expect(actual.issuerOptions).toMatchObject({
      serviceBearer: bearer, issuer: 'saju-preview-service',
      audience: 'myeongha-api-service', keyId: 'preview-key-v1', ttlMs: 60_000,
    });
    expect(actual.issuerOptions.keyBytes).toHaveLength(48);
  });

  it('rejects Production Calculation-only configuration and credential reuse', () => {
    expect(() => readSourceProofProcessConfigV1({
      SAJU_PRODUCTION_SERVICE_BEARER: bearer, PORT: '3000',
      SAJU_PRODUCTION_HOST: '0.0.0.0',
    })).toThrow(SourceProofConfigErrorV1);
    reject({ SAJU_PRODUCTION_SERVICE_BEARER: bearer });
    reject({ SAJU_PRODUCTION_PREVIOUS_SERVICE_BEARER: bearer });
  });

  it.each([fields.port, fields.bearer, fields.key, fields.issuer, fields.audience, fields.keyId])(
    'fails without %s', key => reject({ [key]: undefined }),
  );

  it.each([
    { [fields.bearer]: 'spaced bearer' },
    { [fields.bearer]: 'bad\nbearer' },
    { [fields.bearer]: secret },
    { [fields.key]: 'invalid#base64' },
    { [fields.key]: Buffer.alloc(16, 0).toString('base64') },
    { [fields.key]: Buffer.from(bearer).toString('base64') },
    { [fields.issuer]: 'bad issuer' },
    { [fields.audience]: '' },
    { [fields.keyId]: '?' },
    { [fields.ttlMs]: '120001' },
    { [fields.ttlMs]: '0' },
    { [fields.ttlMs]: '1.1' },
    { [fields.host]: '0.0.0.0' },
    { [fields.host]: 'localhost' },
    { [fields.host]: 'example.com' },
    { [fields.port]: '0' },
    { [fields.port]: '65536' },
    { [fields.port]: 'bad' },
    { SAJU_SOURCE_PROOF_STAGING_PREVIOUS_SERVICE_BEARER: 'not-allowed' },
  ])('rejects unsafe configuration %#', values => reject(values));

  it('never exposes secret values in errors or constructs a host on invalid configuration', () => {
    const factory = vi.fn(createApprovedSourceProofPreviewDependenciesV1);
    expect(() => createSourceReadingProofProcessV1(
      env({ [fields.bearer]: 'private value with spaces' }), factory,
    )).toThrow('SOURCE_PROOF_PROCESS_CONFIG_INVALID');
    expect(factory).not.toHaveBeenCalled();
    try {
      readSourceProofProcessConfigV1(env({ [fields.key]: 'HIDDEN SECRET' }));
    } catch (error) {
      expect(String(error)).not.toContain('HIDDEN SECRET');
    }
  });
});

describe('8C-2B-2B process lifecycle and HTTP transport', () => {
  it.each([
    ['올해', '2026-02-03T20:02:00.000Z', '입춘', 'after_ipchun'],
    ['이번 달', '2026-11-07T09:52:00.000Z', '입동', 'after_jeol'],
  ])('binds calculated %s evidence to the same stored response', async (text, reference, term, segment) => {
    const source = createMyeonghwaSourceReadingProofHost(createSourceReadingProofStagingDependencies());
    const result = await source.requestReadingWithProofReadiness({
      birth: { calendarType: 'solar', date: '1992-07-07', time: '15:20', sex: 'male' },
      reading: { text, periodReferenceDateTime: reference },
    });
    expect(result.readiness).toMatchObject({ state: 'held', canSell: false });
    const evidence = result.temporalReaderEvidence!;
    expect(evidence).toMatchObject({
      responseBodyHash: deterministicContentHash(result.response),
      boundary: { name: term, at: reference }, referenceSegmentId: segment,
      interpretationStatus: 'insufficient_authorized_semantics',
      dayunOverlap: { status: 'resolved', segments: expect.arrayContaining([expect.objectContaining({
        startsAt: evidence.segments[0]?.startsAt,
      })]) },
    });
    expect(evidence.segments[0]?.endsAt).toBe(evidence.segments[1]?.startsAt);
    expect(evidence.segments[0]?.pillar).not.toEqual(evidence.segments[1]?.pillar);
    const { evidenceHash, ...material } = evidence;
    expect(evidenceHash).toBe(deterministicContentHash(material));
  });

  it.each([
    [2028, '편재', 'natal_day_stem_controls_annual_stem'],
    [2030, '편관', 'annual_stem_controls_natal_day_stem'],
  ])('attaches the exact original witness in %i without inferring a theme or an event', async (year, relation, direction) => {
    const source = createMyeonghwaSourceReadingProofHost(createSourceReadingProofStagingDependencies());
    const { temporalReaderEvidence: evidence } = await source.requestReadingWithProofReadiness({
      birth: { calendarType: 'solar', date: '1992-07-07', time: null, sex: 'male' },
      reading: { text: '올해', periodReferenceDateTime: `${year}-11-10T03:00:00.000Z` },
    });
    expect(evidence?.scope).toBe('annual');
    if (evidence?.scope !== 'annual') throw new Error('Expected annual evidence');
    expect(evidence.segments[0]?.directlyWitnessedIdentity).toBeNull();
    expect(evidence.segments[1]?.directlyWitnessedIdentity).toMatchObject({
      scope: 'relation_identity_only', relation, direction,
      source: { page: 25, fileSha256: expect.stringMatching(/^[0-9a-f]{64}$/u) },
    });
    expect(evidence.segments[1]?.natalBranchRelations.hour.status).toBe('unavailable');
    expect(evidence.dayunOverlap).toMatchObject({ status: 'unavailable' });
  });

  it.each(['올해', '이번 달'])('returns held, source-bound Korean research for %s', async (text) => {
    const runtime = createSourceReadingProofProcessV1(env());
    open.push(runtime.server);
    await new Promise<void>(resolve => runtime.server.listen(0, '127.0.0.1', resolve));
    const port = (runtime.server.address() as AddressInfo).port;
    const response = await post(port, 'Bearer ' + bearer, {
      nonce,
      request: {
        ...birthRequest,
        reading: { text, periodReferenceDateTime: '2026-11-09T03:00:00.000Z' },
      },
    });
    expect(response.status).toBe(200);
    const payload = await response.json();
    expect(payload).toMatchObject({
      lifecycle: 'preview', state: 'held', canPublish: false, canSell: false,
      proof: { payload: { lifecycle: 'preview', canSell: false } },
      response: {
        state: 'delivered_with_fallback',
        reading: {
          sections: expect.arrayContaining([expect.objectContaining({
            blocks: expect.arrayContaining([expect.objectContaining({
              text: expect.stringMatching(/[가-힣]{2}.*[.!?]/u),
            })]),
          })]),
        },
      },
    });
    expect(JSON.stringify(payload)).not.toMatch(/semanticKey|activationKind|forbiddenInferences/u);
    expect(payload).not.toHaveProperty('temporalReaderEvidence');
  });

  it('uses the approved real Preview E2E dependency assembly, not a runtime fixture', async () => {
    const approved = createApprovedSourceProofPreviewDependenciesV1();
    expect(typeof approved.calculate).toBe('function');
    expect(typeof approved.interpret).toBe('function');
    expect(approved.legacyNarrativeRuntime).toBeDefined();

    const runtime = createSourceReadingProofProcessV1(env(), () => approved);
    expect(runtime.server.listening).toBe(false);
    open.push(runtime.server);
    await new Promise<void>(resolve => runtime.server.listen(0, '127.0.0.1', resolve));
    const port = (runtime.server.address() as AddressInfo).port;
    for (const path of ['/', '/api/readings', '/api/calculations']) {
      expect((await fetch('http://127.0.0.1:' + port + path)).status).toBe(404);
    }
    expect((await fetch('http://127.0.0.1:' + port + SOURCE_READING_PROOF_HTTP_PATH_V1))
      .status).toBe(405);
    expect((await post(port)).status).toBe(401);
    expect((await post(port, 'Bearer wrong')).status).toBe(401);
    expect((await post(port, 'Bearer ' + bearer, { nonce: 'invalid', request: birthRequest }))
      .status).toBe(400);
    const response = await post(port, 'Bearer ' + bearer);
    expect([200, 409]).toContain(response.status);
    if (response.status === 200) {
      expect(await response.json()).toMatchObject({
        lifecycle: 'preview', state: 'held',
        productionInterpretationAuthority: 'NOT_EVALUATED',
        releaseAuthorization: 'NOT_EVALUATED',
        canExecute: false, canPublish: false, canSell: false,
      });
    }
  });

  it('opens a separate listener and handles idempotent close', async () => {
    const port = await availablePort();
    const running = await startSourceReadingProofProcessV1(
      env({ [fields.port]: String(port) }),
    );
    expect(running.server.listening).toBe(true);
    expect((await fetch('http://127.0.0.1:' + port + '/health')).status).toBe(404);
    const closing = running.close();
    expect(running.close()).toBe(closing);
    await closing;
    expect(running.server.listening).toBe(false);
    await running.close();
  });

  it('contains port collisions without leaking the underlying error', async () => {
    const port = await availablePort();
    const occupied = createServer();
    open.push(occupied);
    await new Promise<void>(resolve => occupied.listen(port, '127.0.0.1', resolve));
    await expect(startSourceReadingProofProcessV1(
      env({ [fields.port]: String(port) }),
    )).rejects.toThrow('SOURCE_READING_PROOF_STARTUP_FAILED');
    expect(occupied.listening).toBe(true);
  });
});
