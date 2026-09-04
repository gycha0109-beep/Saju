import { Buffer } from 'node:buffer';
import process from 'node:process';
import { clearTimeout, setTimeout } from 'node:timers';
import { URL } from 'node:url';

const DEFAULT_TIMEOUT_MS = 15_000;
const MAX_RESPONSE_BYTES = 2 * 1024 * 1024;
const HEALTH_READINESS_ATTEMPTS = 30;
const HEALTH_READINESS_RETRY_MS = 2_000;
const HEALTH_READINESS_RETRYABLE_STATUSES = new Set([404, 429, 500, 502, 503, 504]);
const SYNTHETIC_REQUEST = Object.freeze({
  birth: Object.freeze({
    calendarType: 'solar',
    date: '1990-01-01',
    time: null,
    sex: 'unspecified',
  }),
});

function fail(message) {
  throw new Error(message);
}

function requiredEnv(name) {
  const value = process.env[name];
  if (typeof value !== 'string' || value.trim().length === 0) {
    fail(`Missing required smoke setting: ${name}.`);
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

function requireJsonContentType(response, label) {
  const value = response.headers.get('content-type');
  if (value === null || !/^application\/json(?:\s*;|$)/iu.test(value.trim())) {
    fail(`${label} returned a non-JSON content type.`);
  }
}

function requireNoStore(response, label) {
  const value = response.headers.get('cache-control');
  if (value === null || !value.toLowerCase().split(',').map((part) => part.trim()).includes('no-store')) {
    fail(`${label} did not return Cache-Control: no-store.`);
  }
}

async function readBoundedText(response, label) {
  const length = response.headers.get('content-length');
  if (length !== null) {
    const parsed = Number(length);
    if (Number.isFinite(parsed) && parsed > MAX_RESPONSE_BYTES) {
      fail(`${label} response exceeded the smoke response limit.`);
    }
  }
  const text = await response.text();
  if (Buffer.byteLength(text, 'utf8') > MAX_RESPONSE_BYTES) {
    fail(`${label} response exceeded the smoke response limit.`);
  }
  return text;
}

function requireJsonObject(text, label) {
  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch {
    fail(`${label} returned invalid JSON.`);
  }
  if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
    fail(`${label} returned a non-object JSON payload.`);
  }
  return parsed;
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function requestWithTimeout(url, init, timeoutMs) {
  const controller = new globalThis.AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await globalThis.fetch(url, { ...init, redirect: 'manual', signal: controller.signal });
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      fail('Smoke request timed out.');
    }
    fail('Smoke request failed before an HTTP response was accepted.');
  } finally {
    clearTimeout(timer);
  }
}

async function verifyResponse({ response, expectedStatus, label, bearer }) {
  if (response.status !== expectedStatus) {
    fail(`${label} returned HTTP ${String(response.status)}; expected ${String(expectedStatus)}.`);
  }
  requireJsonContentType(response, label);
  requireNoStore(response, label);
  const text = await readBoundedText(response, label);
  if (text.includes(bearer)) fail(`${label} reflected the service credential.`);
  return requireJsonObject(text, label);
}

async function verifyHealthReady({ baseUrl, bearer, timeoutMs }) {
  for (let attempt = 1; attempt <= HEALTH_READINESS_ATTEMPTS; attempt += 1) {
    const health = await requestWithTimeout(`${baseUrl}/health`, { method: 'GET' }, timeoutMs);
    if (health.status === 200) {
      const healthBody = await verifyResponse({
        response: health,
        expectedStatus: 200,
        label: 'health',
        bearer,
      });
      if (healthBody.status !== 'ok') fail('health did not report status=ok.');
      if (attempt > 1) {
        process.stdout.write(`health readiness converged on attempt ${String(attempt)}.\n`);
      }
      return;
    }

    const status = health.status;
    if (!HEALTH_READINESS_RETRYABLE_STATUSES.has(status)) {
      fail(`health returned HTTP ${String(status)}; expected 200.`);
    }

    if (health.body !== null) {
      await health.body.cancel().catch(() => undefined);
    }

    if (attempt === HEALTH_READINESS_ATTEMPTS) {
      fail(
        `health did not become routable after ${String(HEALTH_READINESS_ATTEMPTS)} attempts; last HTTP ${String(status)}.`,
      );
    }

    process.stdout.write(
      `health readiness attempt ${String(attempt)} returned HTTP ${String(status)}; retrying.\n`,
    );
    await delay(HEALTH_READINESS_RETRY_MS);
  }
}

async function main() {
  const baseUrl = parseBaseUrl(requiredEnv('SAJU_SMOKE_BASE_URL'));
  const bearer = requiredEnv('SAJU_SMOKE_BEARER');
  const timeoutMs = parseTimeoutMs(process.env.SAJU_SMOKE_TIMEOUT_MS);
  const calculationUrl = `${baseUrl}/api/calculations`;
  const payload = JSON.stringify(SYNTHETIC_REQUEST);
  const wrongBearer =
    bearer === 'saju-smoke-intentionally-wrong-token'
      ? 'saju-smoke-intentionally-wrong-token-2'
      : 'saju-smoke-intentionally-wrong-token';

  await verifyHealthReady({ baseUrl, bearer, timeoutMs });

  const unauthenticated = await requestWithTimeout(
    calculationUrl,
    {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: payload,
    },
    timeoutMs,
  );
  const unauthenticatedBody = await verifyResponse({
    response: unauthenticated,
    expectedStatus: 401,
    label: 'unauthenticated calculation',
    bearer,
  });
  if (unauthenticatedBody?.error?.code !== 'HOST_AUTH_REQUIRED') {
    fail('Unauthenticated calculation did not return HOST_AUTH_REQUIRED.');
  }

  const wrongAuth = await requestWithTimeout(
    calculationUrl,
    {
      method: 'POST',
      headers: {
        authorization: `Bearer ${wrongBearer}`,
        'content-type': 'application/json',
      },
      body: payload,
    },
    timeoutMs,
  );
  const wrongAuthBody = await verifyResponse({
    response: wrongAuth,
    expectedStatus: 401,
    label: 'wrong-bearer calculation',
    bearer,
  });
  if (wrongAuthBody?.error?.code !== 'HOST_AUTH_REQUIRED') {
    fail('Wrong-bearer calculation did not return HOST_AUTH_REQUIRED.');
  }

  const authenticated = await requestWithTimeout(
    calculationUrl,
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
  await verifyResponse({
    response: authenticated,
    expectedStatus: 200,
    label: 'authenticated calculation',
    bearer,
  });

  process.stdout.write('Production calculation service smoke: PASS\n');
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : 'Unknown smoke failure.';
  process.stderr.write(`Production calculation service smoke: FAIL — ${message}\n`);
  process.exitCode = 1;
});
