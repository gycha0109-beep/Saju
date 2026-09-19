import { Buffer } from 'node:buffer';
import process from 'node:process';
import { clearTimeout, setTimeout } from 'node:timers';
import { URL } from 'node:url';

const DEFAULT_TIMEOUT_MS = 30_000;
const MAX_RESPONSE_BYTES = 2 * 1024 * 1024;
const PREVIEW_PATH = '/api/preview/readings';
const PRODUCTION_READING_PATH = '/api/readings';
const ADMISSION_HEADER = 'x-myeonghwa-product-reading-response-admitted';
const LIFECYCLE_HEADER = 'x-myeonghwa-reading-lifecycle';
const RESPONSE_VERSION = 'myeonghwa-product-reading-response-v2';

const SYNTHETIC_PREVIEW_REQUEST = Object.freeze({
  birth: Object.freeze({
    calendarType: 'solar',
    date: '2024-03-10',
    time: '12:00',
    sex: 'unspecified',
  }),
  reading: Object.freeze({ text: '사주' }),
});

function fail(message) {
  throw new Error(message);
}

function requiredEnv(name) {
  const value = process.env[name];
  if (typeof value !== 'string' || value.trim().length === 0) {
    fail(`Missing required Preview smoke setting: ${name}.`);
  }
  return value.trim();
}

function parseBaseUrl(value) {
  let url;
  try {
    url = new URL(value);
  } catch {
    fail('SAJU_SMOKE_BASE_URL must be an absolute HTTP(S) origin.');
  }
  if (
    (url.protocol !== 'https:' && url.protocol !== 'http:') ||
    url.username !== '' ||
    url.password !== '' ||
    url.search !== '' ||
    url.hash !== '' ||
    (url.pathname !== '/' && url.pathname !== '')
  ) {
    fail('SAJU_SMOKE_BASE_URL must be an HTTP(S) origin without credentials, path, query, or fragment.');
  }
  return url.origin;
}

function parseTimeoutMs(value) {
  if (value === undefined || value === '') return DEFAULT_TIMEOUT_MS;
  if (!/^\d+$/u.test(value)) fail('SAJU_SMOKE_TIMEOUT_MS must be a positive integer.');
  const parsed = Number(value);
  if (!Number.isSafeInteger(parsed) || parsed < 1 || parsed > 120_000) {
    fail('SAJU_SMOKE_TIMEOUT_MS must be between 1 and 120000.');
  }
  return parsed;
}

async function requestWithTimeout(url, init, timeoutMs) {
  const controller = new globalThis.AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await globalThis.fetch(url, {
      ...init,
      redirect: 'manual',
      signal: controller.signal,
    });
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      fail('Preview smoke request timed out.');
    }
    fail('Preview smoke request failed before an HTTP response was accepted.');
  } finally {
    clearTimeout(timer);
  }
}

function requireNoStore(response, label) {
  const value = response.headers.get('cache-control');
  if (
    value === null ||
    !value.toLowerCase().split(',').map((part) => part.trim()).includes('no-store')
  ) {
    fail(`${label} did not return Cache-Control: no-store.`);
  }
}

function requireJsonContentType(response, label) {
  const value = response.headers.get('content-type');
  if (value === null || !/^application\/json(?:\s*;|$)/iu.test(value.trim())) {
    fail(`${label} returned a non-JSON content type.`);
  }
}

async function boundedJson(response, label, bearer) {
  requireJsonContentType(response, label);
  requireNoStore(response, label);
  const text = await response.text();
  if (Buffer.byteLength(text, 'utf8') > MAX_RESPONSE_BYTES) {
    fail(`${label} response exceeded the smoke response limit.`);
  }
  if (text.includes(bearer)) fail(`${label} reflected the service credential.`);
  try {
    const parsed = JSON.parse(text);
    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
      fail(`${label} returned a non-object JSON payload.`);
    }
    return parsed;
  } catch {
    fail(`${label} returned invalid JSON.`);
  }
}

async function main() {
  const baseUrl = parseBaseUrl(requiredEnv('SAJU_SMOKE_BASE_URL'));
  const bearer = requiredEnv('SAJU_SMOKE_BEARER');
  const timeoutMs = parseTimeoutMs(process.env.SAJU_SMOKE_TIMEOUT_MS);
  const previewUrl = `${baseUrl}${PREVIEW_PATH}`;
  const payload = JSON.stringify(SYNTHETIC_PREVIEW_REQUEST);

  const unauthenticated = await requestWithTimeout(
    previewUrl,
    {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{not-json',
    },
    timeoutMs,
  );
  if (unauthenticated.status !== 401) {
    fail(`Unauthenticated Preview returned HTTP ${String(unauthenticated.status)}; expected 401.`);
  }
  const unauthenticatedBody = await boundedJson(
    unauthenticated,
    'unauthenticated Preview',
    bearer,
  );
  if (unauthenticatedBody?.error?.code !== 'HOST_AUTH_REQUIRED') {
    fail('Unauthenticated Preview did not return HOST_AUTH_REQUIRED.');
  }

  const authenticated = await requestWithTimeout(
    previewUrl,
    {
      method: 'POST',
      headers: {
        authorization: `Bearer ${bearer}`,
        'content-type': 'application/json',
      },
      body: payload,
    },
    timeoutMs,
  );
  if (authenticated.status !== 200) {
    fail(`Authenticated Preview returned HTTP ${String(authenticated.status)}; expected 200.`);
  }
  if (authenticated.headers.get(ADMISSION_HEADER) !== RESPONSE_VERSION) {
    fail('Authenticated Preview is missing the source admission attestation.');
  }
  if (authenticated.headers.get(LIFECYCLE_HEADER) !== 'preview') {
    fail('Authenticated Preview is missing the preview lifecycle attestation.');
  }
  const authenticatedBody = await boundedJson(
    authenticated,
    'authenticated Preview',
    bearer,
  );
  if (authenticatedBody.responseVersion !== RESPONSE_VERSION) {
    fail('Authenticated Preview response version does not match source admission.');
  }
  if (!['delivered', 'delivered_with_fallback'].includes(authenticatedBody.state)) {
    fail(`Authenticated Preview did not deliver: ${String(authenticatedBody.state)}.`);
  }
  const serialized = JSON.stringify(authenticatedBody);
  if (!serialized.includes('이 사주의 핵심') || !serialized.includes('프리뷰 안내')) {
    fail('Authenticated Preview did not contain the required consumer Preview sections.');
  }

  const productionRoute = await requestWithTimeout(
    `${baseUrl}${PRODUCTION_READING_PATH}`,
    {
      method: 'POST',
      headers: {
        authorization: `Bearer ${bearer}`,
        'content-type': 'application/json',
      },
      body: payload,
    },
    timeoutMs,
  );
  if (productionRoute.status !== 404) {
    fail(
      `Production Product Reading route returned HTTP ${String(productionRoute.status)}; expected 404 while authority is blocked.`,
    );
  }
  const productionBody = await boundedJson(
    productionRoute,
    'Production Product Reading route',
    bearer,
  );
  if (productionBody?.error?.code !== 'HOST_ROUTE_NOT_FOUND') {
    fail('Production Product Reading route did not remain fail-closed.');
  }

  process.stdout.write('Preview Product Reading service smoke: PASS\n');
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : 'Unknown Preview smoke failure.';
  process.stderr.write(`Preview Product Reading service smoke: FAIL — ${message}\n`);
  process.exitCode = 1;
});
