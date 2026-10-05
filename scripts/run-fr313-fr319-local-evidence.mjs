#!/usr/bin/env node

import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { isAbsolute, relative, resolve } from 'node:path';
import process from 'node:process';

const INPUT_SCHEMA =
  'fr313-fr319-local-private-execution-input-v1';
const FR316_STAGE_SCHEMA =
  'fr313-fr319-local-fr316-stage-input-v1';
const FR318_STAGE_SCHEMA =
  'fr313-fr319-local-fr318-stage-input-v1';
const FR319_STAGE_SCHEMA =
  'fr318-fr319-local-fr319-stage-input-v1';
const OUTPUT_SCHEMA =
  'fr313-fr319-local-repo-safe-execution-receipt-v1';
const DEFAULT_OUTPUT =
  '.cache/face-reading/fr313-fr319-local/repo-safe-receipt.json';

const FORBIDDEN_OUTPUT_KEYS = new Set([
  'value',
  'runtimeOnlyObservation',
  'runtimeOnlyVerticalReference',
  'runtimeOnlyMetricVerticalReference',
  'runtimeOnlyBundle',
  'references',
  'boundaryPolyline',
  'transformedBoundaryPolyline',
  'sourceImageDigest',
  'sourceCaptureDigest',
  'rgbCaptureDigest',
  'metricSupportArtifactDigest',
  'metricSupportSourceImageDigest',
  'subjectId',
  'captureId',
  'rawProvenance',
  'rawRegistrationParameters',
  'rawCorrespondences',
  'cameraParameters',
  'registrationInput',
  'localMetricExecution',
  'exactCaptureProvenance',
  'evidence',
  'localObservation',
]);

function usage() {
  return `Usage:
  npm run face:run:fr313-fr319-local -- --input <private.json>
  npm run face:run:fr313-fr319-local -- --input <private.json> --fr312-receipt <safe-fr312-receipt.json>
  npm run face:run:fr313-fr319-local -- --input <private.json> --output <safe-receipt.json>
  npm run face:run:fr313-fr319-local -- --self-check

Private input may live outside the repository or under .cache/face-reading/.
Any other repository-local input path is rejected.
FR319 is optional. When omitted, successful execution stops after FR318.
Only repo-safe stage receipts and adjudications are written.
`;
}

function parseArgs(argv) {
  const parsed = {
    input: null,
    output: DEFAULT_OUTPUT,
    fr312Receipt: null,
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
    } else if (arg === '--fr312-receipt') {
      const value = argv[index + 1];
      if (!value) throw new Error('MISSING_FR312_RECEIPT_ARGUMENT');
      parsed.fr312Receipt = value;
      index += 1;
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
    anatomicalGroundTruthIssued: false,
    traditionalBindingIssued: false,
    threeDivisionsBoundaryIssued: false,
    threeDivisionsSpanExecutionReady: false,
    productMaterialized: false,
    productionActivated: false,
    commerceActivated: false,
  };
}

function stageState(overrides = {}) {
  return {
    fr313Attempted: false,
    fr313Status: 'not_attempted',
    fr314Attempted: false,
    fr314Status: 'not_attempted',
    fr316Attempted: false,
    fr316Status: 'not_attempted',
    fr318Attempted: false,
    fr318Status: 'not_attempted',
    fr319Attempted: false,
    fr319Status: 'not_attempted',
    ...overrides,
  };
}

function blockedAtFR313(fr313) {
  return {
    ...baseReceipt(),
    ...stageState({
      fr313Attempted: true,
      fr313Status: fr313.disposition,
    }),
    status: 'blocked_at_fr313',
    fr313Disposition: fr313.disposition,
    fr313FailureReasons: fr313.failureReasons,
    fr313RepresentativeCoverageValidated:
      fr313.representativeCoverageValidated,
    fr313ModelBehaviorValidated:
      fr313.modelBehaviorValidated,
    fr313AdmissionReceiptIssued:
      fr313.fr305AdmissionReceiptIssued,
  };
}

function blockedAtFR314(fr313, fr314) {
  return {
    ...baseReceipt(),
    ...stageState({
      fr313Attempted: true,
      fr313Status: fr313.disposition,
      fr314Attempted: true,
      fr314Status: fr314.status,
    }),
    status: 'blocked_at_fr314',
    fr313Disposition: fr313.disposition,
    fr313AdmissionReceiptIssued:
      fr313.fr305AdmissionReceiptIssued,
    fr314Reason: fr314.reason,
    fr314RepoSafeReceipt: fr314.repoSafeReceipt,
  };
}

function blockedAtFR316(fr313, fr314, fr316) {
  return {
    ...baseReceipt(),
    ...stageState({
      fr313Attempted: true,
      fr313Status: fr313.disposition,
      fr314Attempted: true,
      fr314Status: fr314.status,
      fr316Attempted: true,
      fr316Status: fr316.disposition,
    }),
    status: 'blocked_at_fr316',
    fr313Disposition: fr313.disposition,
    fr313AdmissionReceiptIssued:
      fr313.fr305AdmissionReceiptIssued,
    fr314RepoSafeReceipt: fr314.repoSafeReceipt,
    fr316Assessment: fr316,
  };
}

function blockedAtFR318(fr313, fr314, fr316, fr318) {
  return {
    ...baseReceipt(),
    ...stageState({
      fr313Attempted: true,
      fr313Status: fr313.disposition,
      fr314Attempted: true,
      fr314Status: fr314.status,
      fr316Attempted: true,
      fr316Status: fr316.disposition,
      fr318Attempted: true,
      fr318Status: fr318.status,
    }),
    status: 'blocked_at_fr318',
    fr313Disposition: fr313.disposition,
    fr313AdmissionReceiptIssued:
      fr313.fr305AdmissionReceiptIssued,
    fr314RepoSafeReceipt: fr314.repoSafeReceipt,
    fr316Assessment: fr316,
    fr318Reason: fr318.reason,
    fr318RepoSafeReceipt: fr318.repoSafeReceipt,
  };
}

function availableAtFR318(fr313, fr314, fr316, fr318) {
  return {
    ...baseReceipt(),
    ...stageState({
      fr313Attempted: true,
      fr313Status: fr313.disposition,
      fr314Attempted: true,
      fr314Status: fr314.status,
      fr316Attempted: true,
      fr316Status: fr316.disposition,
      fr318Attempted: true,
      fr318Status: fr318.status,
      fr319Status: 'not_requested',
    }),
    status: 'fr318_available_local_only',
    fr313Disposition: fr313.disposition,
    fr313AdmissionReceiptIssued:
      fr313.fr305AdmissionReceiptIssued,
    fr314RepoSafeReceipt: fr314.repoSafeReceipt,
    fr316Assessment: fr316,
    fr318RepoSafeReceipt: fr318.repoSafeReceipt,
  };
}

function blockedAtFR319(
  fr313,
  fr314,
  fr316,
  fr318,
  fr319,
) {
  return {
    ...baseReceipt(),
    ...stageState({
      fr313Attempted: true,
      fr313Status: fr313.disposition,
      fr314Attempted: true,
      fr314Status: fr314.status,
      fr316Attempted: true,
      fr316Status: fr316.disposition,
      fr318Attempted: true,
      fr318Status: fr318.status,
      fr319Attempted: true,
      fr319Status: fr319.status,
    }),
    status: 'blocked_at_fr319',
    fr313Disposition: fr313.disposition,
    fr313AdmissionReceiptIssued:
      fr313.fr305AdmissionReceiptIssued,
    fr314RepoSafeReceipt: fr314.repoSafeReceipt,
    fr316Assessment: fr316,
    fr318RepoSafeReceipt: fr318.repoSafeReceipt,
    fr319Reason: fr319.reason,
    fr319RepoSafeReceipt: fr319.repoSafeReceipt,
  };
}

function availableAtFR319(
  fr313,
  fr314,
  fr316,
  fr318,
  fr319,
) {
  return {
    ...baseReceipt(),
    ...stageState({
      fr313Attempted: true,
      fr313Status: fr313.disposition,
      fr314Attempted: true,
      fr314Status: fr314.status,
      fr316Attempted: true,
      fr316Status: fr316.disposition,
      fr318Attempted: true,
      fr318Status: fr318.status,
      fr319Attempted: true,
      fr319Status: fr319.status,
    }),
    status: 'fr319_bundle_available_local_only',
    fr313Disposition: fr313.disposition,
    fr313AdmissionReceiptIssued:
      fr313.fr305AdmissionReceiptIssued,
    fr314RepoSafeReceipt: fr314.repoSafeReceipt,
    fr316Assessment: fr316,
    fr318RepoSafeReceipt: fr318.repoSafeReceipt,
    fr319RepoSafeReceipt: fr319.repoSafeReceipt,
  };
}

async function importContracts() {
  const [
    fr313Module,
    fr314Module,
    fr316Module,
    fr318Module,
    fr319Module,
  ] = await Promise.all([
    import('../.face-reading-dist/visible-hairline-model-admission-review-fr313.js'),
    import('../.face-reading-dist/visible-hairline-local-observation-materialization-fr314.js'),
    import('../.face-reading-dist/hairline-same-capture-registration-fr316.js'),
    import('../.face-reading-dist/hairline-real-local-metric-receipt-fr318.js'),
    import('../.face-reading-dist/seven-reference-common-frame-bundle-fr319.js'),
  ]);

  const review =
    fr313Module.reviewHairlineModelAdmissionFR313;
  const materializeObservation =
    fr314Module.materializeVisibleHairlineObservationFR314;
  const assessRegistration =
    fr316Module.assessSameCaptureHairlineRegistrationFR316;
  const materializeMetric =
    fr318Module.materializeRealLocalHairlineMetricReferenceFR318;
  const assemble =
    fr319Module.assembleExactCaptureSevenReferenceCommonFrameBundleFR319;

  if (typeof review !== 'function') {
    throw new Error('FR313_EXECUTOR_EXPORT_MISSING');
  }
  if (typeof materializeObservation !== 'function') {
    throw new Error('FR314_EXECUTOR_EXPORT_MISSING');
  }
  if (typeof assessRegistration !== 'function') {
    throw new Error('FR316_EXECUTOR_EXPORT_MISSING');
  }
  if (typeof materializeMetric !== 'function') {
    throw new Error('FR318_EXECUTOR_EXPORT_MISSING');
  }
  if (typeof assemble !== 'function') {
    throw new Error('FR319_EXECUTOR_EXPORT_MISSING');
  }

  return {
    review,
    materializeObservation,
    assessRegistration,
    materializeMetric,
    assemble,
  };
}

function assertGuardRejectsUnsafeOutput() {
  let keyRejected = false;
  try {
    assertOutputIsSafe({ value: 3.5 });
  } catch (error) {
    keyRejected =
      error instanceof Error &&
      error.message.startsWith('UNSAFE_OUTPUT_KEY:');
  }
  if (!keyRejected) {
    throw new Error('PRIVACY_GUARD_KEY_SELF_CHECK_FAILED');
  }

  let digestRejected = false;
  try {
    assertOutputIsSafe({
      safeLookingField: `sha256:${'a'.repeat(64)}`,
    });
  } catch (error) {
    digestRejected =
      error instanceof Error &&
      error.message.startsWith('UNSAFE_OUTPUT_DIGEST:');
  }
  if (!digestRejected) {
    throw new Error('PRIVACY_GUARD_DIGEST_SELF_CHECK_FAILED');
  }
}

async function runSelfCheck() {
  const contracts = await importContracts();
  for (const [name, contract] of Object.entries(contracts)) {
    if (typeof contract !== 'function') {
      throw new Error(
        `LOCAL_PIPELINE_IMPORT_SELF_CHECK_FAILED:${name}`,
      );
    }
  }

  assertGuardRejectsUnsafeOutput();

  const receipt = {
    ...baseReceipt(),
    ...stageState(),
    status: 'self_check_pass',
    importedContractCount: Object.keys(contracts).length,
    privacyGuardRejectsSubjectScalar: true,
    privacyGuardRejectsDigest: true,
  };

  assertOutputIsSafe(receipt);
  process.stdout.write(`${JSON.stringify(receipt)}\n`);
}

function assertObject(value, code) {
  if (
    value === null ||
    typeof value !== 'object' ||
    Array.isArray(value)
  ) {
    throw new Error(code);
  }
}

function assertOptionalStage(value, schema, code) {
  if (value === null || value === undefined) return;
  assertObject(value, code);
  if (value.schemaVersion !== schema) {
    throw new Error(code);
  }
}

function injectFR312Receipt(input, receipt) {
  assertObject(
    receipt,
    'FR312_RECEIPT_MUST_BE_OBJECT',
  );

  if (
    receipt.schemaVersion !==
      'fr312-expanded-hairline-validation-receipt-v1' ||
    receipt.disposition !==
      'eligible_for_model_admission_review' ||
    receipt.modelAdmissionReviewEligible !== true
  ) {
    throw new Error(
      'FR312_RECEIPT_NOT_ELIGIBLE_FOR_MODEL_ADMISSION',
    );
  }

  assertObject(input.fr313, 'FR313_PRIVATE_INPUT_MISSING');

  if (
    input.fr313.expandedValidation !== null &&
    input.fr313.expandedValidation !== undefined
  ) {
    throw new Error('FR312_RECEIPT_SOURCE_AMBIGUOUS');
  }

  input.fr313 = {
    ...input.fr313,
    expandedValidation: receipt,
  };
}

function assertTopLevelInput(input) {
  assertObject(input, 'PRIVATE_INPUT_MUST_BE_OBJECT');

  if (input.schemaVersion !== INPUT_SCHEMA) {
    throw new Error('PRIVATE_INPUT_SCHEMA_VERSION_MISMATCH');
  }

  assertObject(input.fr313, 'FR313_PRIVATE_INPUT_MISSING');

  if (
    input.fr314 !== null &&
    input.fr314 !== undefined
  ) {
    assertObject(
      input.fr314,
      'FR314_PRIVATE_OBSERVATION_INVALID',
    );
    if (
      input.fr314.schemaVersion !==
      'fr314-local-visible-hairline-observation-input-v1'
    ) {
      throw new Error(
        'FR314_PRIVATE_OBSERVATION_INVALID',
      );
    }
  }

  assertOptionalStage(
    input.fr316,
    FR316_STAGE_SCHEMA,
    'FR316_PRIVATE_INPUT_STAGE_INVALID',
  );
  assertOptionalStage(
    input.fr318,
    FR318_STAGE_SCHEMA,
    'FR318_PRIVATE_INPUT_STAGE_INVALID',
  );
  assertOptionalStage(
    input.fr319,
    FR319_STAGE_SCHEMA,
    'FR319_PRIVATE_INPUT_STAGE_INVALID',
  );
}

function buildFR316Input(stage, hairlineMaterialization) {
  if (stage == null) {
    throw new Error('FR316_PRIVATE_INPUT_MISSING');
  }

  return {
    schemaVersion:
      'fr316-same-capture-hairline-registration-input-v1',
    artifactClass: stage.artifactClass,
    method: stage.method,
    hairlineMaterialization,
    evidence: stage.evidence,
  };
}

function buildFR318Input(stage, registrationInput) {
  return {
    schemaVersion:
      'fr318-real-local-hairline-metric-materialization-input-v1',
    registrationInput,
    localMetricExecution:
      stage?.localMetricExecution ?? null,
  };
}

function buildFR319Input(stage, hairline) {
  const rest = { ...stage };
  delete rest.schemaVersion;

  return {
    schemaVersion:
      'fr319-seven-reference-common-frame-bundle-input-v1',
    ...rest,
    hairline,
  };
}

async function executePrivateInput(input) {
  assertTopLevelInput(input);
  const {
    review,
    materializeObservation,
    assessRegistration,
    materializeMetric,
    assemble,
  } = await importContracts();

  const fr313 = review(input.fr313);
  if (
    fr313.disposition !==
    'admitted_for_neutral_visible_hair_skin_boundary_runtime'
  ) {
    return {
      receipt: blockedAtFR313(fr313),
      exitCode: 2,
    };
  }

  const fr314 = materializeObservation({
    schemaVersion:
      'fr314-local-hairline-materialization-input-v1',
    admissionReview: fr313,
    localObservation: input.fr314 ?? null,
  });

  if (fr314.status !== 'available') {
    return {
      receipt: blockedAtFR314(fr313, fr314),
      exitCode: 2,
    };
  }

  const registrationInput =
    buildFR316Input(input.fr316, fr314);
  const fr316 =
    assessRegistration(registrationInput);

  if (
    !fr316.eligibleForLocalHairlineMetricMappingExecution
  ) {
    return {
      receipt: blockedAtFR316(
        fr313,
        fr314,
        fr316,
      ),
      exitCode: 2,
    };
  }

  const fr318Input =
    buildFR318Input(input.fr318, registrationInput);
  const fr318 = materializeMetric(fr318Input);

  if (fr318.status !== 'available') {
    return {
      receipt: blockedAtFR318(
        fr313,
        fr314,
        fr316,
        fr318,
      ),
      exitCode: 2,
    };
  }

  if (input.fr319 == null) {
    return {
      receipt: availableAtFR318(
        fr313,
        fr314,
        fr316,
        fr318,
      ),
      exitCode: 0,
    };
  }

  const fr319 =
    assemble(buildFR319Input(input.fr319, fr318));

  if (fr319.status !== 'available') {
    return {
      receipt: blockedAtFR319(
        fr313,
        fr314,
        fr316,
        fr318,
        fr319,
      ),
      exitCode: 2,
    };
  }

  return {
    receipt: availableAtFR319(
      fr313,
      fr314,
      fr316,
      fr318,
      fr319,
    ),
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
    throw new Error(
      'OUTPUT_MUST_NOT_OVERWRITE_PRIVATE_INPUT',
    );
  }

  const raw = await readFile(inputPath, 'utf8');
  const input = JSON.parse(raw);

  if (args.fr312Receipt !== null) {
    const fr312ReceiptPath =
      assertPrivateInputPath(args.fr312Receipt);
    const fr312Raw =
      await readFile(fr312ReceiptPath, 'utf8');
    const fr312Receipt = JSON.parse(fr312Raw);
    injectFR312Receipt(input, fr312Receipt);
  }

  const { receipt, exitCode } =
    await executePrivateInput(input);

  const written =
    await writeSafeReceipt(outputPath, receipt);

  process.stdout.write(
    `${JSON.stringify({
      schemaVersion: OUTPUT_SCHEMA,
      status: receipt.status,
      safeReceiptPath: written,
      privateInputEchoed: false,
      subjectLevelValuesPrinted: false,
      fr312ReceiptInjected:
        args.fr312Receipt !== null,
      repositoryAuthorityMutated: false,
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
        'fr313-fr319-local-executor-error-v1',
      status: 'error',
      error: redactMessage(message),
      privateInputEchoed: false,
      stackPrinted: false,
      repositoryAuthorityMutated: false,
    })}\n`,
  );
  process.exitCode = 1;
}
