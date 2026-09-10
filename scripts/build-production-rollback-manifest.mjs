import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { basename, dirname, join } from 'node:path';
import process from 'node:process';

function fail(message) {
  throw new Error(message);
}

function parseArgs(argv) {
  const args = {};
  for (let index = 0; index < argv.length; index += 2) {
    const key = argv[index];
    const value = argv[index + 1];
    if (!key?.startsWith('--') || value === undefined) {
      fail(`Invalid argument sequence near ${key ?? '<end>'}.`);
    }
    args[key.slice(2)] = value;
  }
  return args;
}

function requireArg(args, name) {
  const value = args[name];
  if (!value) {
    fail(`Missing required --${name} argument.`);
  }
  return value;
}

function requireMatch(value, pattern, label) {
  if (!pattern.test(value)) {
    fail(`${label} is invalid.`);
  }
  return value;
}

function requireNonEmptyString(value, label) {
  if (typeof value !== 'string' || value.length === 0) {
    fail(`${label} is required.`);
  }
  return value;
}

function activeTrafficFrom(serviceDoc) {
  const traffic = Array.isArray(serviceDoc?.status?.traffic) ? serviceDoc.status.traffic : [];
  const active = traffic
    .filter((entry) => Number(entry?.percent ?? 0) > 0)
    .map((entry) => ({
      revisionName: requireNonEmptyString(entry?.revisionName, 'Active traffic revisionName'),
      percent: Number(entry.percent),
      tag: typeof entry?.tag === 'string' ? entry.tag : '',
    }))
    .sort((left, right) =>
      left.revisionName.localeCompare(right.revisionName) || left.tag.localeCompare(right.tag),
    );

  if (active.length === 0) {
    fail('No positive-percent serving revision exists before deployment.');
  }

  for (const entry of active) {
    if (!Number.isInteger(entry.percent) || entry.percent < 1 || entry.percent > 100) {
      fail(`Traffic percent for ${entry.revisionName} must be an integer from 1 through 100.`);
    }
  }

  const revisions = active.map((entry) => entry.revisionName);
  if (new Set(revisions).size !== revisions.length) {
    fail('Positive-percent traffic contains duplicate revisionName entries.');
  }

  const total = active.reduce((sum, entry) => sum + entry.percent, 0);
  if (total !== 100) {
    fail(`Positive-percent traffic must total 100, received ${total}.`);
  }

  return active;
}

async function readJson(path, label) {
  let parsed;
  try {
    parsed = JSON.parse(await readFile(path, 'utf8'));
  } catch (error) {
    fail(`${label} is not readable JSON: ${error instanceof Error ? error.message : String(error)}`);
  }
  return parsed;
}

async function revisionEvidence(revisionsDir, revisionName) {
  requireMatch(revisionName, /^[a-z][a-z0-9-]{0,62}$/, `Revision name ${revisionName}`);
  const path = join(revisionsDir, `${revisionName}.json`);
  const doc = await readJson(path, `Revision document ${basename(path)}`);
  const observedName = requireNonEmptyString(doc?.metadata?.name, `Revision metadata.name for ${revisionName}`);
  if (observedName !== revisionName) {
    fail(`Revision document identity mismatch: expected ${revisionName}, received ${observedName}.`);
  }

  const ready = Array.isArray(doc?.status?.conditions)
    ? doc.status.conditions.find((condition) => condition?.type === 'Ready')?.status
    : undefined;
  if (ready !== 'True') {
    fail(`Serving revision ${revisionName} is not Ready=True.`);
  }

  const imageRef = requireNonEmptyString(
    doc?.spec?.containers?.[0]?.image,
    `Revision image reference for ${revisionName}`,
  );
  if (!/@sha256:[0-9a-f]{64}$/.test(imageRef)) {
    fail(`Serving revision ${revisionName} image is not digest-qualified.`);
  }

  return {
    revisionName,
    imageRef,
    ready: true,
  };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const serviceJson = requireArg(args, 'service-json');
  const revisionsDir = requireArg(args, 'revisions-dir');
  const output = requireArg(args, 'output');
  const projectId = requireArg(args, 'project');
  const region = requireArg(args, 'region');
  const service = requireMatch(
    requireArg(args, 'service'),
    /^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$/,
    'Service name',
  );
  const capturedAtUtc = requireArg(args, 'captured-at');
  const sourceRepository = requireArg(args, 'source-repository');
  const sourceBranch = requireArg(args, 'source-branch');
  const sourceSha = requireMatch(requireArg(args, 'source-sha'), /^[0-9a-f]{40}$/, 'Source SHA');
  const workflowSha = requireMatch(requireArg(args, 'workflow-sha'), /^[0-9a-f]{40}$/, 'Workflow SHA');
  const runId = requireMatch(requireArg(args, 'run-id'), /^[1-9][0-9]*$/, 'Run ID');
  const runAttempt = requireMatch(requireArg(args, 'run-attempt'), /^[1-9][0-9]*$/, 'Run attempt');

  if (Number.isNaN(Date.parse(capturedAtUtc)) || !capturedAtUtc.endsWith('Z')) {
    fail('captured-at must be an offset-aware UTC timestamp ending in Z.');
  }

  const serviceDoc = await readJson(serviceJson, 'Pre-deploy service document');
  const observedService = requireNonEmptyString(serviceDoc?.metadata?.name, 'Service metadata.name');
  if (observedService !== service) {
    fail(`Service identity mismatch: expected ${service}, received ${observedService}.`);
  }

  const activeTraffic = activeTrafficFrom(serviceDoc);
  const servingRevisions = [];
  for (const entry of activeTraffic) {
    servingRevisions.push(await revisionEvidence(revisionsDir, entry.revisionName));
  }

  const restoreTrafficArgument = activeTraffic
    .map((entry) => `${entry.revisionName}=${entry.percent}`)
    .join(',');
  const manifest = {
    schemaVersion: 1,
    evidenceClass: 'pre_deploy_rollback_manifest',
    capturedAtUtc,
    target: {
      projectId,
      region,
      service,
      serviceUrl: typeof serviceDoc?.status?.url === 'string' ? serviceDoc.status.url : '',
    },
    source: {
      repository: sourceRepository,
      sourceBranch,
      sourceSha,
      workflowSha,
      runId,
      runAttempt,
    },
    activeTraffic,
    activeTrafficPercentTotal: 100,
    servingRevisions,
    restore: {
      scope: 'serving_revision_percentages',
      trafficArgument: restoreTrafficArgument,
      argv: [
        'gcloud',
        'run',
        'services',
        'update-traffic',
        service,
        '--project',
        projectId,
        '--region',
        region,
        '--to-revisions',
        restoreTrafficArgument,
        '--quiet',
      ],
    },
    classification: {
      exactServingTrafficCaptured: true,
      everyServingRevisionReady: true,
      everyServingRevisionImageDigestQualified: true,
      predecessorInferenceFromRevisionOrderingAllowed: false,
      productionTrafficMutatedByThisCapture: false,
    },
    nonClaims: [
      'This manifest authorizes no rollback by itself; rollback execution still requires governed operator approval and a fresh preflight.',
      'The restore command restores serving revision percentages only; captured tags are evidence but are not rewritten by the restore command.',
      'No credential values or raw provider payloads are retained.',
    ],
  };

  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
