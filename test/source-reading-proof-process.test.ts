import { createServer, type Server } from 'node:http';
import type { AddressInfo } from 'node:net';
import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  createSourceReadingProofProcessV1,
  startSourceReadingProofProcessV1,
} from '../src/source-reading-proof-process.js';
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
