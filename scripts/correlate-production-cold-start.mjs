import fs from 'node:fs';
import process from 'node:process';

function fail(message) {
  throw new Error(message);
}

function requiredEnv(name) {
  const value = process.env[name];
  if (typeof value !== 'string' || value.trim().length === 0) {
    fail(`Missing required cold-start evidence setting: ${name}.`);
  }
  return value.trim();
}

function readJson(path, label) {
  try {
    return JSON.parse(fs.readFileSync(path, 'utf8'));
  } catch {
    fail(`Unable to parse ${label} JSON.`);
  }
}

function timestampMs(value, label) {
  const parsed = Date.parse(value);
  if (!Number.isFinite(parsed)) fail(`Invalid ${label} timestamp.`);
  return parsed;
}

function logText(entry) {
  if (typeof entry?.textPayload === 'string') return entry.textPayload;
  if (typeof entry?.jsonPayload?.message === 'string') return entry.jsonPayload.message;
  return '';
}

function instanceId(entry) {
  const value = entry?.labels?.instanceId;
  return typeof value === 'string' && value.length > 0 ? value : null;
}

function isRequestLog(entry) {
  return typeof entry?.logName === 'string' && entry.logName.includes('run.googleapis.com%2Frequests');
}

function isSystemLog(entry) {
  return (
    typeof entry?.logName === 'string' &&
    entry.logName.includes('run.googleapis.com%2Fvarlog%2Fsystem')
  );
}

function startupReason(entry) {
  const match = logText(entry).match(/Starting new instance\. Reason:\s*([A-Z_]+)/u);
  return match?.[1] ?? null;
}

function nearest(entries, targetMs) {
  return [...entries].sort(
    (left, right) =>
      Math.abs(timestampMs(left.timestamp, 'provider log') - targetMs) -
      Math.abs(timestampMs(right.timestamp, 'provider log') - targetMs),
  )[0] ?? null;
}

function main() {
  const latencyPath = requiredEnv('LATENCY_EVIDENCE_PATH');
  const providerLogsPath = requiredEnv('PROVIDER_LOGS_PATH');
  const outputPath = requiredEnv('COLD_START_EVIDENCE_PATH');
  const sourceLatencyRunId = requiredEnv('SOURCE_LATENCY_RUN_ID');
  const expectedService = requiredEnv('EXPECTED_CLOUD_RUN_SERVICE');

  if (!/^[1-9][0-9]*$/u.test(sourceLatencyRunId)) {
    fail('SOURCE_LATENCY_RUN_ID must be a positive integer.');
  }

  const latency = readJson(latencyPath, 'latency evidence');
  const logs = readJson(providerLogsPath, 'provider logs');
  if (!Array.isArray(logs)) fail('Provider logs payload must be an array.');

  const first = latency?.samples?.[0];
  if (
    latency?.schemaVersion !== 'saju-production-latency-evidence/v1' ||
    latency?.evidenceClass !== 'indicative_operational_baseline_not_slo' ||
    latency?.endpoint !== '/api/calculations' ||
    latency?.acceptedCount !== latency?.sampleCount ||
    latency?.failedCount !== 0 ||
    latency?.firstObservedClassification !== 'first_observed_not_proven_cold_start' ||
    typeof latency?.revision !== 'string' ||
    !/@sha256:[0-9a-f]{64}$/u.test(latency?.imageRef ?? '') ||
    first?.index !== 1 ||
    first?.phase !== 'first_observed' ||
    first?.status !== 200 ||
    first?.accepted !== true ||
    typeof first?.timestampUtc !== 'string' ||
    typeof first?.latencyMs !== 'number' ||
    first.latencyMs <= 0
  ) {
    fail('Latency evidence does not satisfy the immutable first-observed authority contract.');
  }

  const firstStartedMs = timestampMs(first.timestampUtc, 'first observed');
  const firstEndedMs = firstStartedMs + first.latencyMs;
  const revision = latency.revision;

  const requestCandidates = logs.filter((entry) => {
    const at = timestampMs(entry?.timestamp ?? '', 'request log');
    const url = entry?.httpRequest?.requestUrl;
    return (
      isRequestLog(entry) &&
      entry?.resource?.type === 'cloud_run_revision' &&
      entry?.resource?.labels?.service_name === expectedService &&
      entry?.resource?.labels?.revision_name === revision &&
      instanceId(entry) !== null &&
      entry?.httpRequest?.requestMethod === 'POST' &&
      entry?.httpRequest?.status === 200 &&
      typeof url === 'string' &&
      url.includes('/api/calculations') &&
      at >= firstStartedMs - 5_000 &&
      at <= firstEndedMs + 5_000
    );
  });

  const request = nearest(requestCandidates, firstStartedMs);
  const requestInstance = request ? instanceId(request) : null;
  const requestAtMs = request ? timestampMs(request.timestamp, 'matched request') : null;

  const startupCandidates =
    request && requestInstance
      ? logs.filter((entry) => {
          const at = timestampMs(entry?.timestamp ?? '', 'startup log');
          return (
            isSystemLog(entry) &&
            entry?.resource?.type === 'cloud_run_revision' &&
            entry?.resource?.labels?.service_name === expectedService &&
            entry?.resource?.labels?.revision_name === revision &&
            instanceId(entry) === requestInstance &&
            startupReason(entry) !== null &&
            at >= firstStartedMs - 10_000 &&
            at <= firstEndedMs + 10_000
          );
        })
      : [];

  const startup = requestAtMs === null ? null : nearest(startupCandidates, requestAtMs);
  const reason = startup ? startupReason(startup) : null;
  const sameInstanceStartupMatched = Boolean(request && startup && requestInstance);
  const coldStartProven = sameInstanceStartupMatched && reason === 'AUTOSCALING';

  let classification = 'provider_logs_readable_but_first_request_not_correlated';
  if (request && !startup) {
    classification = 'request_correlated_but_same_instance_startup_not_found';
  } else if (sameInstanceStartupMatched && reason !== 'AUTOSCALING') {
    classification = `same_instance_startup_correlated_reason_${String(reason).toLowerCase()}`;
  } else if (coldStartProven) {
    classification = 'provider_autoscaling_cold_start_same_instance_correlated';
  }

  const evidence = {
    schemaVersion: 'saju-production-cold-start-evidence/v2',
    evidenceClass: 'provider_log_same_instance_correlation',
    sourceLatencyRunId: Number(sourceLatencyRunId),
    revision,
    imageRef: latency.imageRef,
    firstObserved: {
      timestampUtc: first.timestampUtc,
      clientWallClockLatencyMs: first.latencyMs,
    },
    providerLogsReadable: true,
    providerCorrelation: {
      requestLogMatched: Boolean(request),
      sameInstanceStartupMatched,
      startupReason: reason,
      requestTimestampUtc: request?.timestamp ?? null,
      requestProviderLatency: request?.httpRequest?.latency ?? null,
      startupTimestampUtc: startup?.timestamp ?? null,
    },
    coldStartProven,
    classification,
    instanceIdentifierRetained: false,
    rawProviderPayloadsRetained: false,
    credentialsRetained: false,
    productionTrafficMutated: false,
  };

  fs.mkdirSync(new URL('.', `file://${outputPath}`).pathname, { recursive: true });
  fs.writeFileSync(outputPath, `${JSON.stringify(evidence, null, 2)}\n`, 'utf8');
  process.stdout.write(`${JSON.stringify(evidence, null, 2)}\n`);

  if (!coldStartProven) {
    fail(`Cold start is not proven: ${classification}.`);
  }
}

try {
  main();
} catch (error) {
  const message = error instanceof Error ? error.message : 'Unknown cold-start evidence failure.';
  process.stderr.write(`Production cold-start evidence: FAIL — ${message}\n`);
  process.exitCode = 1;
}
