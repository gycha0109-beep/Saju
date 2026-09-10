import { Buffer } from 'node:buffer';
import { writeFile } from 'node:fs/promises';
import { performance } from 'node:perf_hooks';
import process from 'node:process';
import { clearTimeout, setTimeout } from 'node:timers';
import { URL } from 'node:url';

const DEFAULT_SAMPLES = 100;
const DEFAULT_TIMEOUT_MS = 30_000;
const MAX_RESPONSE_BYTES = 256 * 1024;

function fail(message) {
  throw new Error(message);
}

function requiredEnv(name) {
  const value = process.env[name];
  if (typeof value !== 'string' || value.trim().length === 0) {
    fail(`Missing required latency setting: ${name}.`);
  }
  return value.trim();
}

function parseBaseUrl(value) {
  let url;
  try {
    url = new URL(value);
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

function parseInteger(name, value, fallback, minimum, maximum) {
  if (value === undefined || value === '') return fallback;
  if (!/^\d+$/u.test(value)) fail(`${name} must be an integer.`);
  const parsed = Number(value);
  if (!Number.isSafeInteger(parsed) || parsed < minimum || parsed > maximum) {
    fail(`${name} must be between ${String(minimum)} and ${String(maximum)}.`);
  }
  return parsed;
}

function percentileNearestRank(sorted, percentile) {
  return sorted[Math.max(1, Math.ceil(percentile * sorted.length)) - 1];
}

function round(value) {
  return Math.round(value * 100) / 100;
}

async function measureOne(url, timeoutMs, sequence) {
  const controller = new globalThis.AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  const startedAt = new Date().toISOString();
  const start = performance.now();
  let response;
  try {
    response = await globalThis.fetch(url, { method: 'GET', redirect: 'manual', signal: controller.signal });
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      fail(`Latency sample ${String(sequence)} timed out.`);
    }
    fail(`Latency sample ${String(sequence)} failed before an HTTP response was accepted.`);
  } finally {
    clearTimeout(timer);
  }

  const body = await response.text();
  const durationMs = round(performance.now() - start);
  const completedAt = new Date().toISOString();
  if (Buffer.byteLength(body, 'utf8') > MAX_RESPONSE_BYTES) fail('Health response exceeded the evidence limit.');
  if (response.status !== 200) fail(`Latency sample ${String(sequence)} returned HTTP ${String(response.status)}.`);
  const contentType = response.headers.get('content-type') ?? '';
  if (!/^application\/json(?:\s*;|$)/iu.test(contentType.trim())) fail('Health returned a non-JSON content type.');
  const parsed = JSON.parse(body);
  if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed) || parsed.status !== 'ok') {
    fail('Health did not return status=ok.');
  }

  return { sequence, startedAt, completedAt, httpStatus: response.status, durationMs };
}

function buildMarkdown(evidence) {
  const rows = evidence.samples.map(
    (sample) => `| ${String(sample.sequence)} | ${sample.startedAt} | ${sample.completedAt} | ${String(sample.httpStatus)} | ${String(sample.durationMs)} |`,
  );
  return [
    '## Saju Production health latency evidence',
    '',
    `- measurement start UTC: \`${evidence.measurement.startedAt}\``,
    `- measurement end UTC: \`${evidence.measurement.completedAt}\``,
    `- active revision: \`${evidence.target.revision}\``,
    `- image ref: \`${evidence.target.imageRef}\``,
    `- endpoint: \`${evidence.target.endpoint}\``,
    `- sample count: \`${String(evidence.measurement.sampleCount)}\``,
    `- P50: \`${String(evidence.latencyMs.p50)} ms\``,
    `- P95: \`${String(evidence.latencyMs.p95)} ms\``,
    `- P99: \`${String(evidence.latencyMs.p99)} ms\``,
    `- first observed request: \`${String(evidence.latencyMs.firstObserved)} ms\``,
    `- min/max: \`${String(evidence.latencyMs.min)} / ${String(evidence.latencyMs.max)} ms\``,
    '- percentile method: `nearest-rank`',
    '- cold-start status: `uncontrolled_not_claimed`',
    '- scope: `Cloud Run /health route; not calculation-route latency`',
    '- interpretation: `indicative production baseline only; not an SLO claim`',
    '',
    '| # | started UTC | completed UTC | HTTP | latency ms |',
    '|---:|---|---|---:|---:|',
    ...rows,
    '',
  ].join('\n');
}

async function main() {
  const baseUrl = parseBaseUrl(requiredEnv('SAJU_LATENCY_BASE_URL'));
  const revision = requiredEnv('SAJU_LATENCY_REVISION');
  const imageRef = requiredEnv('SAJU_LATENCY_IMAGE_REF');
  const outputJson = requiredEnv('SAJU_LATENCY_OUTPUT_JSON');
  const outputMarkdown = requiredEnv('SAJU_LATENCY_OUTPUT_MARKDOWN');
  const sampleCount = parseInteger('SAJU_LATENCY_SAMPLES', process.env.SAJU_LATENCY_SAMPLES, DEFAULT_SAMPLES, 100, 500);
  const timeoutMs = parseInteger('SAJU_LATENCY_TIMEOUT_MS', process.env.SAJU_LATENCY_TIMEOUT_MS, DEFAULT_TIMEOUT_MS, 1_000, 120_000);
  const startedAt = new Date().toISOString();
  const samples = [];

  for (let sequence = 1; sequence <= sampleCount; sequence += 1) {
    samples.push(await measureOne(`${baseUrl}/health`, timeoutMs, sequence));
  }

  const completedAt = new Date().toISOString();
  const sorted = samples.map((sample) => sample.durationMs).sort((left, right) => left - right);
  const evidence = {
    schemaVersion: 1,
    target: { revision, imageRef, endpoint: '/health' },
    measurement: {
      startedAt,
      completedAt,
      sampleCount,
      successCount: samples.length,
      timeoutMs,
      requestMode: 'sequential',
      coldStartStatus: 'uncontrolled_not_claimed',
    },
    latencyMs: {
      min: sorted[0],
      max: sorted.at(-1),
      firstObserved: samples[0].durationMs,
      p50: percentileNearestRank(sorted, 0.5),
      p95: percentileNearestRank(sorted, 0.95),
      p99: percentileNearestRank(sorted, 0.99),
      percentileMethod: 'nearest-rank',
    },
    scope: 'Cloud Run /health route; not calculation-route latency',
    interpretation: 'indicative production baseline only; not an SLO claim',
    samples,
  };

  await writeFile(outputJson, `${JSON.stringify(evidence, null, 2)}\n`, 'utf8');
  await writeFile(outputMarkdown, `${buildMarkdown(evidence)}\n`, 'utf8');
  process.stdout.write(`Production health latency evidence: PASS samples=${String(sampleCount)} p50=${String(evidence.latencyMs.p50)}ms p95=${String(evidence.latencyMs.p95)}ms p99=${String(evidence.latencyMs.p99)}ms\n`);
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : 'Unknown latency evidence failure.';
  process.stderr.write(`Production health latency evidence: FAIL — ${message}\n`);
  process.exitCode = 1;
});
