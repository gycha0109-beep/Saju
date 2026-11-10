import type { Server } from 'node:http';
import type { AddressInfo } from 'node:net';
import { afterEach, describe, expect, it } from 'vitest';
import {
  createMyeonghwaProductionProductHostServer,
  createMyeonghwaProductionReadingHostServer,
  createMyeonghwaProductionPreviewHostServer,
  SAJU_A4_PREPARED_ATTEMPT_HEADER_V1,
  SAJU_A4_SOURCE_REF_HEADER_V1,
  type SajuA4ServerOnlyCapturePortV1,
} from '../src/host/http-server.js';
import type { MyeonghwaProductHost } from '../src/host/product-host.js';

const BEARER = 'production-server-internal-test-bearer';
const ATTEMPT = '123e4567-e89b-42d3-a456-426614174002';
const REF = 'saju_source_123e4567-e89b-42d3-a456-426614174004';
const servers: Server[] = [];
const sampleResponse = Object.freeze({
  responseVersion: 'myeonghwa-product-reading-response-v2',
  responseId: 'reading_response_0123456789abcdef01234567',
  state: 'temporarily_unavailable',
  messageCode: 'READING_TEMPORARILY_UNAVAILABLE',
  requiredAction: 'try_again_later',
} as const);
const body = { birth: { calendarType: 'solar', date: '2000-01-01' }, reading: { text: '성향' } };

function fakeReadingHost() {
  let calls = 0;
  let suppliedBody: unknown;
  const host: MyeonghwaProductHost = {
    async requestReading(nextBody: unknown) {
      calls++;
      suppliedBody = nextBody;
      return sampleResponse;
    },
  };
  return { host, get calls() { return calls; }, get suppliedBody() { return suppliedBody; } };
}

function capture(options: { accept?: boolean; sourceRef?: string } = {}) {
  const invoked: string[] = [];
  const port: SajuA4ServerOnlyCapturePortV1 = {
    async withPreparedAttempt<T>(attempt: { executionAttemptId: string }, execute: (ref: string) => Promise<T>) {
      invoked.push(attempt.executionAttemptId);
      if (options.accept === false) throw new Error('source authority admission denied');
      return execute(options.sourceRef ?? REF);
    },
  };
  return { port, invoked };
}

async function serve(server: Server): Promise<string> {
  servers.push(server);
  await new Promise<void>((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', () => {
      server.off('error', reject);
      resolve();
    });
  });
  return 'http://127.0.0.1:' + (server.address() as AddressInfo).port;
}

afterEach(async () => {
  await Promise.all(servers.splice(0).map(async (server) => {
    if (server.listening) {
      await new Promise<void>((resolve, reject) =>
        server.close((error) => error ? reject(error) : resolve()));
    }
  }));
});

function reading(origin: string, attempt?: string, bearer: string | null = BEARER,
  route: '/api/readings' | '/api/preview/readings' = '/api/readings') {
  return fetch(origin + route, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      ...(bearer === null ? {} : { authorization: 'Bearer ' + bearer }),
      ...(attempt === undefined ? {} : { [SAJU_A4_PREPARED_ATTEMPT_HEADER_V1]: attempt }),
    },
    body: JSON.stringify(body),
  });
}

describe('A4 provider capture on authenticated Saju Production reading HTTP boundary', () => {
  it('never enters Source admission before checking server bearer credentials', async () => {
    const h = fakeReadingHost();
    const c = capture();
    const origin = await serve(createMyeonghwaProductionProductHostServer(h.host, {
      serviceBearer: BEARER, a4SourceCapture: c.port,
    }));
    const response = await reading(origin, ATTEMPT, null);
    expect(response.status).toBe(401);
    expect(h.calls).toBe(0);
    expect(c.invoked).toEqual([]);
  });

  it('rejects a prepared attempt when no source admission handler is installed', async () => {
    const h = fakeReadingHost();
    const origin = await serve(createMyeonghwaProductionProductHostServer(h.host, {
      serviceBearer: BEARER,
    }));
    const response = await reading(origin, ATTEMPT);
    expect(response.status).toBe(409);
    expect((await response.json()) as unknown).toMatchObject({
      error: { code: 'HOST_A4_SOURCE_ADMISSION_REQUIRED' },
    });
    expect(h.calls).toBe(0);
  });

  it('requires exact prepared attempt UUID once capture is installed', async () => {
    const h = fakeReadingHost();
    const c = capture();
    const origin = await serve(createMyeonghwaProductionProductHostServer(h.host, {
      serviceBearer: BEARER, a4SourceCapture: c.port,
    }));
    for (const id of [undefined, 'browser-provided', '123e4567-e89b-42d3-a456-426614174002_invalid']) {
      const response = await reading(origin, id);
      expect(response.status).toBe(409);
    }
    expect(h.calls).toBe(0);
    expect(c.invoked).toEqual([]);
  });

  it('executes in the exact authorized scope and returns only a server-issued source reference', async () => {
    const h = fakeReadingHost();
    const c = capture();
    const origin = await serve(createMyeonghwaProductionProductHostServer(h.host, {
      serviceBearer: BEARER, a4SourceCapture: c.port,
    }));
    const response = await reading(origin, ATTEMPT);
    expect(response.status).toBe(200);
    expect(response.headers.get(SAJU_A4_SOURCE_REF_HEADER_V1)).toBe(REF);
    expect(response.headers.get('x-myeonghwa-product-reading-response-admitted'))
      .toBe('myeonghwa-product-reading-response-v2');
    expect(await response.json()).toEqual(sampleResponse);
    expect(h.calls).toBe(1);
    expect(h.suppliedBody).toEqual(body);
    expect(c.invoked).toEqual([ATTEMPT]);
  });

  it('rejects failed admission and malformed Saju-issued refs without executing reading', async () => {
    for (const state of [{ accept: false }, { sourceRef: 'attacker-ref' }]) {
      const h = fakeReadingHost();
      const c = capture(state);
      const origin = await serve(createMyeonghwaProductionProductHostServer(h.host, {
        serviceBearer: BEARER, a4SourceCapture: c.port,
      }));
      const response = await reading(origin, ATTEMPT);
      expect(response.status).toBe(state.accept === false ? 500 : 409);
      expect(response.headers.has(SAJU_A4_SOURCE_REF_HEADER_V1)).toBe(false);
      expect(h.calls).toBe(0);
    }
  });

  it('never accepts A4 attempt metadata on a separate Preview route', async () => {
    const production = fakeReadingHost();
    const preview = fakeReadingHost();
    const c = capture();
    const origin = await serve(createMyeonghwaProductionReadingHostServer(
      production.host, preview.host, {
        serviceBearer: BEARER, a4SourceCapture: c.port,
      }));
    const response = await reading(origin, ATTEMPT, BEARER, '/api/preview/readings');
    expect(response.status).toBe(409);
    expect(preview.calls).toBe(0);
    expect(production.calls).toBe(0);
    expect(c.invoked).toEqual([]);
  });

  it('does not let a Preview-only host mount the A4 provider capture authority', () => {
    const h = fakeReadingHost();
    const c = capture();
    expect(() => createMyeonghwaProductionPreviewHostServer(h.host, {
      serviceBearer: BEARER, a4SourceCapture: c.port,
    })).toThrow('A4 source capture cannot be installed on Preview');
  });

  it('keeps old authenticated Production readings without A4 metadata unaltered', async () => {
    const h = fakeReadingHost();
    const origin = await serve(createMyeonghwaProductionProductHostServer(h.host, {
      serviceBearer: BEARER,
    }));
    const response = await reading(origin);
    expect(response.status).toBe(200);
    expect(response.headers.has(SAJU_A4_SOURCE_REF_HEADER_V1)).toBe(false);
    expect(h.calls).toBe(1);
  });
});
