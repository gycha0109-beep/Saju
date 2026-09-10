import fs from 'node:fs';
import process from 'node:process';
import { performance } from 'node:perf_hooks';
import { URL } from 'node:url';

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
    fail(`Missing required latency evidence setting: ${name}.`);
  }
  return value.trim();
}

function parseInteger(name, fallback, minimum, maximum) {
  const raw = process.env[name] ?? String(fallback);
  if (!/^\d+$/u.test(raw)) fail(`${name} must be an integer.`);
  const value = Number(raw);
  if (!Number.isSafeInteger(value) || value < minimum || value > maximum) {
    fail(`${name} must be between ${String(minimum)} and ${String(maximum)}.`);
  }
  return value;
}

function parseBaseUrl(raw) {
  let url;
  try {
    url = new URL(raw);
  } catch {
    fail('SAJU_LATENCY_BASE_URL must be an absolute HTTPS origin.');
  }
  if (
    url.protocol !== 'https:' ||
    url.username !== '' ||
    url.password !== '' ||
    url.search !== '' ||
    url.hash !== '' ||
    (url.pathname !== '/' && url.pathname !== '')
  ) {
    fail('SAJU_LATENCY_BASE_URL must be an HTTPS origin without credentials, path, query, or fragment.');
  }
  return url.origin;
}

function round(value) {
  return Math.round(value * 1000) / 1000;
}

function percentileType7(sortedValues, probability) {
  if (sortedValues.length === 0) return null;
  if (sortedValues.length === 1) return sortedValues[0];
  const rank = (sortedValues.length - 1) * probability;
  const lower = Math.floor(rank);
  const upper = Math.ceil(rank);
  if (lower === upper) return sortedValues[lower];
  const weight = rank - lower;
  return sortedValues[lower] + (sortedValues[upper] - sortedValues[lower]) * weight;
}

function appendOutput(name, value) {
  const outputPath = process.env.GITHUB_OUTPUT;
  if (typeof outputPath === 'string' && outputPath.length > 0) {
    fs.appendFileSync(outputPath, `${name}=${String(value)}\n`, 'utf8');
  }
}

function appendSummary(text) {
  const summaryPath = process.env.GITHUB_STEP_SUMMARY;
  if (typeof summaryPath === 'string' && summaryPath.length > 0) {
    fs.appendFileSync(summaryPath, text, 'utf8');
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function requestSample({ url, bearer, payload, timeoutMs, index }) {
  const timestampUtc = new Date().toISOString();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  const started = performance.now();

  try {
    const response = await fetch(url, {
      method: 'POST',
      redirect: 'manual',
      signal: controller.signal,
      headers: {
        authorization: `Bearer ${bearer}`,
        'content-type': 'application/json',
      },
      body: payload,
    });
    const body = await response.text();
    const latencyMs = round(performance.now() - started);
    const cacheControl = response.headers.get('cache-control') ?? '';
    const contentType = response.headers.get('content-type') ?? '';
    const accepted =
      response.status === 200 &&
      contentType.toLowerCase().startsWith('application/json') &&
      cacheControl
        .toLowerCase()
        .split(',')
        .map((part) => part.trim())
        .includes('no-store') &&
      !body.includes(bearer);

    return {
      index,
      timestampUtc,
      phase: index === 1 ? 'first_observed' : 'steady_sequence',
      status: response.status,
      latencyMs,
      accepted,
      errorClass: accepted ? null : 'response_contract_failure',
    };
  } catch (error) {
    return {
      index,
      timestampUtc,
      phase: index === 1 ? 'first_observed' : 'steady_sequence',
      status: null,
      latencyMs: round(performance.now() - started),
      accepted: false,
      errorClass: error instanceof Error && error.name === 'AbortError' ? 'timeout' : 'transport_failure',
    };
  } finally {
    clearTimeout(timer);
  }
}

async function main() {
  const baseUrl = parseBaseUrl(requiredEnv('SAJU_LATENCY_BASE_URL'));
  const bearer = requiredEnv('SAJU_LATENCY_BEARER');
  const revision = requiredEnv('SAJU_LATENCY_REVISION');
  const imageRef = requiredEnv('SAJU_LATENCY_IMAGE_REF');
  const evidencePath = requiredEnv('SAJU_LATENCY_EVIDENCE_PATH');
  const sampleCount = parseInteger('SAJU_LATENCY_SAMPLE_COUNT', 100, 20, 500);
  const timeoutMs = parseInteger('SAJU_LATENCY_TIMEOUT_MS', 10_000, 1000, 120_000);
  const intervalMs = parseInteger('SAJU_LATENCY_INTERVAL_MS', 100, 0, 5000);
  const payload = JSON.stringify(SYNTHETIC_REQUEST);
  const url = `${baseUrl}/api/calculations`;
  const startedAtUtc = new Date().toISOString();
  const samples = [];

  for (let index = 1; index <= sampleCount; index += 1) {
    samples.push(await requestSample({ url, bearer, payload, timeoutMs, index }));
    if (intervalMs > 0 && index < sampleCount) await sleep(intervalMs);
  }

  const endedAtUtc = new Date().toISOString();
  const acceptedSamples = samples.filter((sample) => sample.accepted);
  const sortedLatencies = acceptedSamples.map((sample) => sample.latencyMs).sort((a, b) => a - b);
  const stats = {
    p50Ms: round(percentileType7(sortedLatencies, 0.5) ?? 0),
    p95Ms: round(percentileType7(sortedLatencies, 0.95) ?? 0),
    p99Ms: round(percentileType7(sortedLatencies, 0.99) ?? 0),
    minMs: sortedLatencies.length === 0 ? null : round(sortedLatencies[0]),
    maxMs: sortedLatencies.length === 0 ? null : round(sortedLatencies.at(-1)),
  };

  const evidence = {
    schemaVersion: 'saju-production-latency-evidence/v1',
    evidenceClass: 'indicative_operational_baseline_not_slo',
    percentileMethod: 'R7_linear_interpolation',
    endpoint: '/api/calculations',
    revision,
    imageRef,
    startedAtUtc,
    endedAtUtc,
    sampleCount,
    acceptedCount: acceptedSamples.length,
    failedCount: sampleCount - acceptedSamples.length,
    timeoutMs,
    intervalMs,
    firstObservedClassification: 'first_observed_not_proven_cold_start',
    stats,
    samples,
  };

  fs.writeFileSync(evidencePath, `${JSON.stringify(evidence, null, 2)}\n`, 'utf8');

  appendOutput('started_at_utc', startedAtUtc);
  appendOutput('ended_at_utc', endedAtUtc);
  appendOutput('accepted_count', acceptedSamples.length);
  appendOutput('failed_count', sampleCount - acceptedSamples.length);
  appendOutput('p50_ms', stats.p50Ms);
  appendOutput('p95_ms', stats.p95Ms);
  appendOutput('p99_ms', stats.p99Ms);

  appendSummary(
    `## Saju Production Latency Evidence\n\n` +
      `- Evidence class: **indicative operational baseline; not an SLO**\n` +
      `- Revision: \`${revision}\`\n` +
      `- Image: \`${imageRef}\`\n` +
      `- UTC window: \`${startedAtUtc}\` → \`${endedAtUtc}\`\n` +
      `- Samples: ${String(sampleCount)} requested / ${String(acceptedSamples.length)} accepted / ${String(sampleCount - acceptedSamples.length)} failed\n` +
      `- Percentile method: R7 linear interpolation over accepted full-response wall-clock samples\n` +
      `- P50: **${String(stats.p50Ms)} ms**\n` +
      `- P95: **${String(stats.p95Ms)} ms**\n` +
      `- P99: **${String(stats.p99Ms)} ms**\n` +
      `- First sample: labelled \`first_observed\`; it is **not** evidence of a cold start\n\n`,
  );

  process.stdout.write(
    `Production latency evidence: samples=${String(sampleCount)} accepted=${String(acceptedSamples.length)} failed=${String(sampleCount - acceptedSamples.length)} p50_ms=${String(stats.p50Ms)} p95_ms=${String(stats.p95Ms)} p99_ms=${String(stats.p99Ms)}\n`,
  );

  if (acceptedSamples.length !== sampleCount) {
    fail('One or more production latency samples failed the HTTP/response contract.');
  }
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : 'Unknown latency evidence failure.';
  process.stderr.write(`Production latency evidence: FAIL — ${message}\n`);
  process.exitCode = 1;
});
