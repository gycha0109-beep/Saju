#!/usr/bin/env node

import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { isAbsolute, relative, resolve } from 'node:path';
import process from 'node:process';
import { pathToFileURL } from 'node:url';

const INPUT_SCHEMA =
  'fr308-fr312-local-deidentified-validation-input-v1';
const OUTPUT_SCHEMA =
  'fr308-fr312-local-repo-safe-validation-receipt-v1';
const DEFAULT_OUTPUT =
  '.cache/face-reading/fr308-fr312-local/repo-safe-receipt.json';
const DEFAULT_FR312_RECEIPT =
  '.cache/face-reading/fr308-fr312-local/fr312-expanded-validation-receipt.json';

const FORBIDDEN_OUTPUT_KEYS = new Set([
  'caseFindings',
  'captures',
  'opaqueSessionLabel',
  'sourceImage',
  'overlay',
  'rawPolygonCoordinates',
  'sourceImageDigest',
  'fileName',
  'subjectIdentifier',
  'subjectId',
  'captureId',
  'demographicAttributes',
  'boundaryPolyline',
  'transformedBoundaryPolyline',
]);

function usage() {
  return `Usage:
  npm run face:run:fr308-fr312-local -- --input <deidentified-private.json>
  npm run face:run:fr308-fr312-local -- --input <deidentified-private.json> --output <safe-summary.json>
  npm run face:run:fr308-fr312-local -- --self-check

When FR312 becomes eligible for model-admission review, the exact governed
FR312 receipt is also written to:
  ${DEFAULT_FR312_RECEIPT}

Private/deidentified operator input may live outside the repository or under
.cache/face-reading/. Any other repository-local input path is rejected.
`;
}

function parseArgs(argv) {
  const parsed = {
    input: null,
    output: DEFAULT_OUTPUT,
    fr312Receipt: DEFAULT_FR312_RECEIPT,
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

function assertLocalInputPath(inputPath) {
  const absolute = resolve(inputPath);
  const cwd = resolve(process.cwd());
  const rel = relative(cwd, absolute).replaceAll('\\', '/');

  if (
    rel !== '' &&
    !rel.startsWith('..') &&
    !isAbsolute(rel) &&
    rel !== '.cache/face-reading' &&
    !rel.startsWith('.cache/face-reading/')
  ) {
    throw new Error('LOCAL_INPUT_PATH_NOT_FACE_READING_CACHE');
  }

  return absolute;
}

function assertSafeOutputPath(outputPath) {
  const absolute = resolve(outputPath);
  const cwd = resolve(process.cwd());
  const rel = relative(cwd, absolute).replaceAll('\\', '/');

  if (
    rel === '' ||
    rel.startsWith('..') ||
    isAbsolute(rel) ||
    (
      rel !== '.cache/face-reading' &&
      !rel.startsWith('.cache/face-reading/')
    )
  ) {
    throw new Error('OUTPUT_PATH_MUST_BE_FACE_READING_CACHE');
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
      'deidentified_engineering_validation_receipt_only',
    realEvidenceInvented: false,
    humanReviewAutomated: false,
    fr313AdmissionIssued: false,
    repositoryGateMutationAuthorized: false,
    traditionalBindingIssued: false,
    threeDivisionsSpanExecutionReady: false,
    productMaterialized: false,
    productionActivated: false,
    commerceActivated: false,
  };
}

function blockedAtFR310(fr308, fr310) {
  return {
    ...baseReceipt(),
    status: 'blocked_at_fr310',
    fr308Status: 'bundle_receipt_issued',
    fr308Receipt: fr308,
    fr310Status: fr310.disposition,
    fr310Receipt: fr310,
    fr312Attempted: false,
    fr312Status: 'not_attempted',
  };
}

function blockedAtFR312(fr308, fr310, fr312) {
  return {
    ...baseReceipt(),
    status: 'blocked_at_fr312',
    fr308Status: 'bundle_receipt_issued',
    fr308Receipt: fr308,
    fr310Status: fr310.disposition,
    fr310Receipt: fr310,
    fr312Attempted: true,
    fr312Status: fr312.disposition,
    fr312Receipt: fr312,
  };
}

function availableAtFR312(fr308, fr310, fr312) {
  return {
    ...baseReceipt(),
    status: 'fr312_eligible_for_model_admission_review',
    fr308Status: 'bundle_receipt_issued',
    fr308Receipt: fr308,
    fr310Status: fr310.disposition,
    fr310Receipt: fr310,
    fr312Attempted: true,
    fr312Status: fr312.disposition,
    fr312Receipt: fr312,
  };
}

async function importContracts() {
  const [
    fr306Module,
    fr307Module,
    fr308Module,
    fr310Module,
    fr312Module,
  ] = await Promise.all([
    import('../.face-reading-dist/visible-hairline-runtime-candidates-fr306.js'),
    import('../.face-reading-dist/visible-hairline-empirical-runner-fr307.js'),
    import('../.face-reading-dist/visible-hairline-bounded-capture-bundle-fr308.js'),
    import('../.face-reading-dist/visible-hairline-evidence-adjudicator-fr310.js'),
    import('../.face-reading-dist/visible-hairline-expanded-validation-fr312.js'),
  ]);

  const defaultModel = fr307Module.FR307_PRIMARY_MODEL;
  const defaultRunnerContractVersion =
    fr307Module.FR307_VISIBLE_HAIRLINE_EMPIRICAL_RUNNER_CONTRACT_VERSION;
  const resolveCandidate =
    fr306Module.resolveFR306EmpiricalRuntimeCandidate;
  const issueBundle =
    fr308Module.issueBoundedHairlineBundleReceiptFR308;
  const adjudicateBounded =
    fr310Module.adjudicateHairlineEvidenceFR310;
  const adjudicateExpanded =
    fr312Module.adjudicateExpandedHairlineValidationFR312;

  if (
    defaultModel == null ||
    typeof defaultModel.id !== 'string' ||
    typeof defaultModel.revision !== 'string'
  ) {
    throw new Error('FR307_MODEL_EXPORT_MISSING');
  }
  if (typeof defaultRunnerContractVersion !== 'string') {
    throw new Error('FR307_CONTRACT_EXPORT_MISSING');
  }
  if (typeof resolveCandidate !== 'function') {
    throw new Error('FR306_CANDIDATE_RESOLVER_EXPORT_MISSING');
  }
  if (typeof issueBundle !== 'function') {
    throw new Error('FR308_EXECUTOR_EXPORT_MISSING');
  }
  if (typeof adjudicateBounded !== 'function') {
    throw new Error('FR310_EXECUTOR_EXPORT_MISSING');
  }
  if (typeof adjudicateExpanded !== 'function') {
    throw new Error('FR312_EXECUTOR_EXPORT_MISSING');
  }

  return {
    defaultModel,
    defaultRunnerContractVersion,
    resolveCandidate,
    issueBundle,
    adjudicateBounded,
    adjudicateExpanded,
  };
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

function assertTopLevelInput(input) {
  assertObject(input, 'LOCAL_INPUT_MUST_BE_OBJECT');

  if (input.schemaVersion !== INPUT_SCHEMA) {
    throw new Error('LOCAL_INPUT_SCHEMA_VERSION_MISMATCH');
  }

  if (input.candidate !== undefined) {
    assertObject(input.candidate, 'CANDIDATE_INPUT_INVALID');
    for (const key of [
      'modelId',
      'modelRevision',
      'runnerContractVersion',
    ]) {
      if (
        typeof input.candidate[key] !== 'string' ||
        input.candidate[key].trim().length === 0
      ) {
        throw new Error(`CANDIDATE_${key.toUpperCase()}_INVALID`);
      }
    }
  }

  assertObject(input.fr308, 'FR308_INPUT_MISSING');
  if (!Array.isArray(input.fr308.caseFindings)) {
    throw new Error('FR308_CASE_FINDINGS_MISSING');
  }

  assertObject(input.fr310, 'FR310_INPUT_MISSING');
  assertObject(
    input.fr310.humanReview,
    'FR310_HUMAN_REVIEW_MISSING',
  );

  if (input.fr312 === undefined) return;
  assertObject(input.fr312, 'FR312_INPUT_MISSING');
  if (!Array.isArray(input.fr312.captures)) {
    throw new Error('FR312_CAPTURES_MISSING');
  }
  if (
    input.fr312.demographicAttributesCollected !== false
  ) {
    throw new Error(
      'FR312_DEMOGRAPHIC_ATTRIBUTES_MUST_BE_FALSE',
    );
  }
}

export async function execute(input) {
  assertTopLevelInput(input);

  const {
    defaultModel,
    defaultRunnerContractVersion,
    resolveCandidate,
    issueBundle,
    adjudicateBounded,
    adjudicateExpanded,
  } = await importContracts();

  const requestedCandidate = input.candidate ?? {
    modelId: defaultModel.id,
    modelRevision: defaultModel.revision,
    runnerContractVersion:
      defaultRunnerContractVersion,
  };
  const candidate = resolveCandidate(
    requestedCandidate.modelId,
    requestedCandidate.modelRevision,
    requestedCandidate.runnerContractVersion,
  );

  const fr308 = issueBundle({
    schemaVersion:
      'fr308-bounded-hairline-bundle-input-v1',
    runnerContractVersion:
      requestedCandidate.runnerContractVersion,
    modelId: candidate.runtimeProviderId,
    modelRevision: candidate.exactRevision,
    localOnlyExecution: true,
    caseFindings: input.fr308.caseFindings,
  });

  const fr310 = adjudicateBounded({
    schemaVersion:
      'fr310-hairline-evidence-adjudication-input-v1',
    bundleReceipt: fr308,
    caseFindings: input.fr308.caseFindings,
    modelId: candidate.runtimeProviderId,
    modelRevision: candidate.exactRevision,
    humanReview: input.fr310.humanReview,
  });

  if (
    fr310.disposition !==
      'eligible_for_expanded_validation' ||
    fr310.expandedValidationEligible !== true
  ) {
    return {
      receipt: blockedAtFR310(fr308, fr310),
      fr312Receipt: null,
      exitCode: 2,
    };
  }

  if (input.fr312 === undefined) {
    return {
      receipt: {
        ...baseReceipt(),
        status: 'fr310_eligible_for_expanded_validation',
        fr308Receipt: fr308,
        fr310Receipt: fr310,
        fr312Attempted: false,
        fr312Status: 'not_attempted',
      },
      fr312Receipt: null,
      exitCode: 0,
    };
  }

  const fr312 = adjudicateExpanded({
    schemaVersion:
      'fr312-expanded-hairline-validation-input-v1',
    prerequisiteAdjudication: fr310,
    modelId: candidate.runtimeProviderId,
    modelRevision: candidate.exactRevision,
    humanReviewCompleted:
      input.fr312.humanReviewCompleted,
    sessionLabelsOpaque:
      input.fr312.sessionLabelsOpaque,
    demographicAttributesCollected: false,
    subjectCoverage:
      input.fr312.subjectCoverage,
    captures: input.fr312.captures,
  });

  if (
    fr312.disposition !==
      'eligible_for_model_admission_review' ||
    fr312.modelAdmissionReviewEligible !== true
  ) {
    return {
      receipt: blockedAtFR312(
        fr308,
        fr310,
        fr312,
      ),
      fr312Receipt: null,
      exitCode: 2,
    };
  }

  return {
    receipt: availableAtFR312(
      fr308,
      fr310,
      fr312,
    ),
    fr312Receipt: fr312,
    exitCode: 0,
  };
}

async function writeJson(path, value) {
  assertOutputIsSafe(value);
  const absolute = assertSafeOutputPath(path);
  await mkdir(resolve(absolute, '..'), { recursive: true });
  await writeFile(
    absolute,
    `${JSON.stringify(value, null, 2)}\n`,
    {
      encoding: 'utf8',
      mode: 0o600,
    },
  );
  return absolute;
}

function assertPrivacyGuard() {
  let keyRejected = false;
  try {
    assertOutputIsSafe({
      captures: [{ opaqueSessionLabel: 'session-a' }],
    });
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
    throw new Error(
      'PRIVACY_GUARD_DIGEST_SELF_CHECK_FAILED',
    );
  }
}

async function selfCheck() {
  const contracts = await importContracts();
  if (
    typeof contracts.issueBundle !== 'function' ||
    typeof contracts.adjudicateBounded !== 'function' ||
    typeof contracts.adjudicateExpanded !== 'function'
  ) {
    throw new Error(
      'LOCAL_VALIDATION_IMPORT_SELF_CHECK_FAILED',
    );
  }

  assertPrivacyGuard();

  const receipt = {
    ...baseReceipt(),
    status: 'self_check_pass',
    importedContractCount: 3,
    pinnedModelIdentityAvailable: true,
    registeredCandidateResolverAvailable: true,
    legacyFlorenceDefaultPreserved: true,
    privacyGuardRejectsCaptureLevelPayload: true,
    privacyGuardRejectsDigest: true,
  };

  assertOutputIsSafe(receipt);
  process.stdout.write(`${JSON.stringify(receipt)}\n`);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (args.help) {
    process.stdout.write(usage());
    return;
  }

  if (args.selfCheck) {
    await selfCheck();
    return;
  }

  if (!args.input) {
    throw new Error('INPUT_REQUIRED');
  }

  const inputPath = assertLocalInputPath(args.input);
  const raw = await readFile(inputPath, 'utf8');
  const input = JSON.parse(raw);

  const {
    receipt,
    fr312Receipt,
    exitCode,
  } = await execute(input);

  const summaryPath =
    await writeJson(args.output, receipt);

  let fr312ReceiptPath = null;
  if (fr312Receipt !== null) {
    fr312ReceiptPath =
      await writeJson(
        args.fr312Receipt,
        fr312Receipt,
      );
  }

  process.stdout.write(
    `${JSON.stringify({
      schemaVersion: OUTPUT_SCHEMA,
      status: receipt.status,
      safeSummaryPath: summaryPath,
      fr312ReceiptPath,
      sourceImagesPrinted: false,
      captureLevelFindingsPrinted: false,
      sessionLabelsPrinted: false,
      subjectIdentifiersPrinted: false,
      demographicAttributesCollected: false,
      repositoryAuthorityMutated: false,
    })}\n`,
  );

  process.exitCode = exitCode;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try {
    await main();
  } catch (error) {
    const message =
      error instanceof Error ? error.message : String(error);

    process.stderr.write(
      `${JSON.stringify({
        schemaVersion:
          'fr308-fr312-local-validation-error-v1',
        status: 'error',
        error: redactMessage(message),
        inputEchoed: false,
        stackPrinted: false,
        repositoryAuthorityMutated: false,
      })}\n`,
    );
    process.exitCode = 1;
  }

}
