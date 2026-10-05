#!/usr/bin/env node

import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { isAbsolute, relative, resolve } from 'node:path';
import process from 'node:process';

const INPUT_SCHEMA =
  'fr318-fr319-local-private-execution-input-v1';
const FR319_STAGE_SCHEMA =
  'fr318-fr319-local-fr319-stage-input-v1';
const OUTPUT_SCHEMA =
  'fr318-fr319-local-repo-safe-execution-receipt-v1';
const DEFAULT_OUTPUT =
  '.cache/face-reading/fr318-fr319-local/repo-safe-receipt.json';

const FORBIDDEN_OUTPUT_KEYS = new Set([
  'value',
  'runtimeOnlyMetricVerticalReference',
  'runtimeOnlyBundle',
  'references',
  'transformedBoundaryPolyline',
  'sourceCaptureDigest',
  'subjectId',
  'captureId',
  'rawProvenance',
  'rawRegistrationParameters',
  'rawCorrespondences',
  'registrationInput',
  'localMetricExecution',
  'exactCaptureProvenance',
]);

function usage() {
  return `Usage:
  npm run face:run:fr318-fr319-local -- --input <private.json>
  npm run face:run:fr318-fr319-local -- --input <private.json> --fr318-only
  npm run face:run:fr318-fr319-local -- --input <private.json> --output <safe-receipt.json>
  npm run face:run:fr318-fr319-local -- --self-check

Private input may live outside the repository or under .cache/face-reading/.
Any other repository-local input path is rejected.
Only repo-safe receipts are written or printed.
`;
}

function parseArgs(argv) {
  const parsed = {
    input: null,
    output: DEFAULT_OUTPUT,
    fr318Only: false,
    selfCheck: false,
    help: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === '--input') {
      const value = argv[index + 1];
      if (!value) throw new Error('MISSING_INPUT_ARGUMENT');
      parsed.input = value;
      index += 1;
    } else if (arg === '--output') {
      const value = argv[index + 1];
      if (!value) throw new Error('MISSING_OUTPUT_ARGUMENT');
      parsed.output = value;
      index += 1;
    } else if (arg === '--fr318-only') {
      parsed.fr318Only = true;
    } else if (arg === '--self-check') {
      parsed.selfCheck = true;
    } else if (arg === '--help' || arg === '-h') {
      parsed.help = true;
    } else {
      throw new Error(`UNKNOWN_ARGUMENT:${arg}`);
    }
  }

  return parsed;
}

function redactMessage(message) {
  return String(message)
    .replace(/sha256:[0-9a-f]{64}/giu, '[redacted-digest]')
    .replace(/[A-Fa-f0-9]{64}/gu, '[redacted-hex64]');
}

function assertPrivateInputPath(inputPath) {
  const absolute = resolve(inputPath);
  const cwd = resolve(process.cwd());
  const rel = relative(cwd, absolute);

  if (
    rel !== '' &&
    !rel.startsWith('..') &&
    !isAbsolute(rel) &&
    rel !== '.cache/face-reading' &&
    !rel.startsWith('.cache/face-reading/')
  ) {
    throw new Error('PRIVATE_INPUT_PATH_NOT_LOCAL_CACHE');
  }

  return absolute;
}

function assertOutputIsSafe(value, path = 'output') {
  if (value === null) return;

  if (Array.isArray(value)) {
    for (let index = 0; index < value.length; index += 1) {
      assertOutputIsSafe(value[index], `${path}[${index}]`);
    }
    return;
  }

  if (typeof value === 'object') {
    for (const [key, child] of Object.entries(value)) {
      if (FORBIDDEN_OUTPUT_KEYS.has(key)) {
        throw new Error(`UNSAFE_OUTPUT_KEY:${path}.${key}`);
      }
      assertOutputIsSafe(child, `${path}.${key}`);
    }
    return;
  }

  if (
    typeof value === 'string' &&
    /sha256:[0-9a-f]{64}/iu.test(value)
  ) {
    throw new Error(`UNSAFE_OUTPUT_DIGEST:${path}`);
  }

  if (
    typeof value === 'number' &&
    !Number.isFinite(value)
  ) {
    throw new Error(`UNSAFE_OUTPUT_NON_FINITE_NUMBER:${path}`);
  }
}

function baseReceipt() {
  return {
    schemaVersion: OUTPUT_SCHEMA,
    authorityState:
      'repo_safe_local_execution_receipt_only',
    realEvidenceInvented: false,
    repositoryGateMutationAuthorized: false,
    traditionalBindingIssued: false,
    threeDivisionsSpanExecutionReady: false,
    productionActivated: false,
    commerceActivated: false,
  };
}

function fr318Blocked(result) {
  return {
    ...baseReceipt(),
    status: 'blocked_at_fr318',
    fr318Attempted: true,
    fr318Status: result.status,
    fr318Reason: result.reason,
    fr318RepoSafeReceipt: result.repoSafeReceipt,
    fr319Attempted: false,
    fr319Status: 'not_attempted',
  };
}

function fr318OnlyAvailable(result) {
  return {
    ...baseReceipt(),
    status: 'fr318_available_local_only',
    fr318Attempted: true,
    fr318Status: 'available',
    fr318RepoSafeReceipt: result.repoSafeReceipt,
    fr319Attempted: false,
    fr319Status: 'not_requested',
  };
}

function fr319Blocked(fr318, fr319) {
  return {
    ...baseReceipt(),
    status: 'blocked_at_fr319',
    fr318Attempted: true,
    fr318Status: 'available',
    fr318RepoSafeReceipt: fr318.repoSafeReceipt,
    fr319Attempted: true,
    fr319Status: fr319.status,
    fr319Reason: fr319.reason,
    fr319RepoSafeReceipt: fr319.repoSafeReceipt,
  };
}

function fr319Available(fr318, fr319) {
  return {
    ...baseReceipt(),
    status: 'fr319_bundle_available_local_only',
    fr318Attempted: true,
    fr318Status: 'available',
    fr318RepoSafeReceipt: fr318.repoSafeReceipt,
    fr319Attempted: true,
    fr319Status: 'available',
    fr319RepoSafeReceipt: fr319.repoSafeReceipt,
  };
}

async function importContracts() {
  const [fr318Module, fr319Module] = await Promise.all([
    import('../.face-reading-dist/hairline-real-local-metric-receipt-fr318.js'),
    import('../.face-reading-dist/seven-reference-common-frame-bundle-fr319.js'),
  ]);

  const materialize =
    fr318Module.materializeRealLocalHairlineMetricReferenceFR318;
  const assemble =
    fr319Module.assembleExactCaptureSevenReferenceCommonFrameBundleFR319;

  if (typeof materialize !== 'function') {
    throw new Error('FR318_EXECUTOR_EXPORT_MISSING');
  }
  if (typeof assemble !== 'function') {
    throw new Error('FR319_EXECUTOR_EXPORT_MISSING');
  }

  return { materialize, assemble };
}

async function runSelfCheck() {
  const { materialize, assemble } = await importContracts();

  if (
    typeof materialize !== 'function' ||
    typeof assemble !== 'function'
  ) {
    throw new Error('LOCAL_EXECUTOR_IMPORT_SELF_CHECK_FAILED');
  }

  const receipt = {
    ...baseReceipt(),
    status: 'self_check_pass',
    fr318Attempted: false,
    fr318Status: 'not_attempted',
    fr319Attempted: false,
    fr319Status: 'not_attempted',
  };
  assertOutputIsSafe(receipt);
  process.stdout.write(`${JSON.stringify(receipt)}\n`);
}

function assertTopLevelInput(input) {
  if (
    input === null ||
    typeof input !== 'object' ||
    Array.isArray(input)
  ) {
    throw new Error('PRIVATE_INPUT_MUST_BE_OBJECT');
  }

  if (input.schemaVersion !== INPUT_SCHEMA) {
    throw new Error('PRIVATE_INPUT_SCHEMA_VERSION_MISMATCH');
  }

  if (
    input.fr318 === null ||
    typeof input.fr318 !== 'object' ||
    Array.isArray(input.fr318)
  ) {
    throw new Error('FR318_PRIVATE_INPUT_MISSING');
  }

  if (
    input.fr319 !== null &&
    input.fr319 !== undefined &&
    (
      typeof input.fr319 !== 'object' ||
      Array.isArray(input.fr319) ||
      input.fr319.schemaVersion !== FR319_STAGE_SCHEMA
    )
  ) {
    throw new Error('FR319_PRIVATE_INPUT_STAGE_INVALID');
  }
}

function buildFR319Input(stage, hairline) {
  const {
    schemaVersion: _stageSchema,
    ...rest
  } = stage;

  return {
    schemaVersion:
      'fr319-seven-reference-common-frame-bundle-input-v1',
    ...rest,
    hairline,
  };
}

async function executePrivateInput(input, fr318Only) {
  assertTopLevelInput(input);
  const { materialize, assemble } = await importContracts();

  const fr318 = materialize(input.fr318);

  if (fr318.status !== 'available') {
    return {
      receipt: fr318Blocked(fr318),
      exitCode: 2,
    };
  }

  if (fr318Only || input.fr319 == null) {
    return {
      receipt: fr318OnlyAvailable(fr318),
      exitCode: 0,
    };
  }

  const fr319Input = buildFR319Input(input.fr319, fr318);
  const fr319 = assemble(fr319Input);

  if (fr319.status !== 'available') {
    return {
      receipt: fr319Blocked(fr318, fr319),
      exitCode: 2,
    };
  }

  return {
    receipt: fr319Available(fr318, fr319),
    exitCode: 0,
  };
}

async function writeSafeReceipt(outputPath, receipt) {
  assertOutputIsSafe(receipt);
  const absolute = resolve(outputPath);

  await mkdir(resolve(absolute, '..'), { recursive: true });
  await writeFile(
    absolute,
    `${JSON.stringify(receipt, null, 2)}\n`,
    {
      encoding: 'utf8',
      mode: 0o600,
    },
  );

  return absolute;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (args.help) {
    process.stdout.write(usage());
    return;
  }

  if (args.selfCheck) {
    await runSelfCheck();
    return;
  }

  if (!args.input) {
    throw new Error('INPUT_REQUIRED');
  }

  const inputPath = assertPrivateInputPath(args.input);
  const outputPath = resolve(args.output);
  if (inputPath === outputPath) {
    throw new Error('OUTPUT_MUST_NOT_OVERWRITE_PRIVATE_INPUT');
  }

  const raw = await readFile(inputPath, 'utf8');
  const input = JSON.parse(raw);
  const { receipt, exitCode } =
    await executePrivateInput(input, args.fr318Only);

  const written = await writeSafeReceipt(outputPath, receipt);
  process.stdout.write(
    `${JSON.stringify({
      schemaVersion: OUTPUT_SCHEMA,
      status: receipt.status,
      safeReceiptPath: written,
      privateInputEchoed: false,
      subjectLevelValuesPrinted: false,
    })}\n`,
  );
  process.exitCode = exitCode;
}

try {
  await main();
} catch (error) {
  const message =
    error instanceof Error ? error.message : String(error);
  process.stderr.write(
    `${JSON.stringify({
      schemaVersion:
        'fr318-fr319-local-executor-error-v1',
      status: 'error',
      error: redactMessage(message),
      privateInputEchoed: false,
      stackPrinted: false,
    })}\n`,
  );
  process.exitCode = 1;
}
