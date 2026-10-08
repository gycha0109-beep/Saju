#!/usr/bin/env node

import { mkdir, readFile, realpath, stat, writeFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { dirname, isAbsolute, relative, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import process from 'node:process';
import {
  FR308_CASES,
  FR312_CASES,
  assertRegisteredCandidate,
  compileWorksheet,
  prepareWorksheet,
} from './run-multisignal-hairline-review-packet.mjs';
import { execute } from './run-fr308-fr312-local-validation.mjs';

const SCHEMA = 'fr2337-private-preregistration-v1';
const CANDIDATE = Object.freeze({
  modelId: 'candidate.hairline.multisignal_visible_interface.fr306',
  modelRevision: '0.4.0',
  runnerContractVersion: 'MULTISIGNAL-VISIBLE-HAIRLINE-LOCAL-CANDIDATE-v1',
});
const readJson = async (path) => JSON.parse(await readFile(path, 'utf8'));
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const check = (condition, code) => {
  if (!condition) throw new Error(code);
};

export function privatePath(path, output = false) {
  const absolute = resolve(path);
  const rel = relative(process.cwd(), absolute).replaceAll('\\', '/');
  const outside = rel.startsWith('../') || rel === '..' || isAbsolute(rel);
  const cache = rel.startsWith('.cache/face-reading/');
  check(cache || (!output && outside), 'PRIVATE_PATH_REQUIRED');
  return absolute;
}

async function writeExclusive(path, value) {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, `${JSON.stringify(value, null, 2)}\n`, {
    encoding: 'utf8',
    mode: 0o600,
    flag: 'wx',
  });
}

export function validatePlan(plan) {
  check(plan?.schemaVersion === SCHEMA, 'PREREGISTRATION_SCHEMA_INVALID');
  check(same(plan.candidate, CANDIDATE), 'PREREGISTRATION_CANDIDATE_DRIFT');
  check(plan.frozenBeforeCandidateExecution === true, 'PREREGISTRATION_NOT_FRESH');
  check(
    Object.keys(plan).every((key) =>
      [
        'schemaVersion',
        'candidate',
        'frozenBeforeCandidateExecution',
        'records',
        'runnerCodeDigest',
      ].includes(key),
    ),
    'UNSUPPORTED_PRIVATE_PLAN_FIELD',
  );
  check(
    Array.isArray(plan.records) && plan.records.length >= 16,
    'SIXTEEN_FRESH_CAPTURES_REQUIRED',
  );
  const ids = new Set();
  const paths = new Set();
  const sessions = new Set();
  const counts = new Map();
  for (const record of plan.records) {
    check(/^capture-[0-9]{2,}$/u.test(record.recordId), 'OPAQUE_RECORD_ID_REQUIRED');
    check(!ids.has(record.recordId), 'DUPLICATE_SOURCE_RECORD');
    ids.add(record.recordId);
    check(typeof record.sourcePath === 'string', 'SOURCE_PATH_REQUIRED');
    const source = privatePath(record.sourcePath);
    check(!paths.has(source), 'DUPLICATE_SOURCE_PATH');
    paths.add(source);
    check(
      record.freshIndependentCaptureAttested === true &&
        record.usedForDevelopment === false &&
        record.derivedFromAnotherCapture === false,
      'FRESH_INDEPENDENT_CAPTURE_REQUIRED',
    );
    check(/^session-[0-9]{2,}$/u.test(record.opaqueSessionLabel), 'OPAQUE_SESSION_REQUIRED');
    const cases =
      record.stage === 'fr308' ? FR308_CASES : record.stage === 'fr312' ? FR312_CASES : [];
    check(cases.includes(record.case), 'PREREGISTRATION_CASE_INVALID');
    const key = `${record.stage}:${record.case}`;
    counts.set(key, (counts.get(key) ?? 0) + 1);
    if (record.stage === 'fr312') sessions.add(record.opaqueSessionLabel);
    check(
      Object.keys(record).every((key) =>
        [
          'recordId',
          'sourcePath',
          'stage',
          'case',
          'opaqueSessionLabel',
          'freshIndependentCaptureAttested',
          'usedForDevelopment',
          'derivedFromAnotherCapture',
          'faceRoi',
          'frameTopTruncated',
          'sourceFileState',
        ].includes(key),
      ),
      'UNSUPPORTED_PRIVATE_RECORD_FIELD',
    );
  }
  for (const name of FR308_CASES)
    check(counts.get(`fr308:${name}`) === 1, 'FR308_FOUR_CASES_REQUIRED');
  for (const name of FR312_CASES)
    check(counts.get(`fr312:${name}`) >= 2, 'FR312_TWO_PER_CASE_REQUIRED');
  check(sessions.size >= 3, 'THREE_OPAQUE_SESSIONS_REQUIRED');
}

async function fileState(path) {
  const canonical = await realpath(privatePath(path));
  privatePath(canonical);
  const value = await stat(canonical);
  check(value.isFile(), 'SOURCE_FILE_REQUIRED');
  // File metadata detects accidental source replacement without hashing image bytes.
  return { canonical, dev: value.dev, ino: value.ino, size: value.size, mtimeMs: value.mtimeMs };
}

export async function preregister(plan, campaign) {
  validatePlan(plan);
  await assertRegisteredCandidate();
  const frozen = globalThis.structuredClone(plan);
  frozen.runnerCodeDigest = await runnerCodeDigest();
  const files = new Set();
  for (const record of frozen.records) {
    const state = await fileState(record.sourcePath);
    const key = `${state.dev}:${state.ino}`;
    check(!files.has(key), 'DUPLICATE_SOURCE_FILE');
    files.add(key);
    record.sourcePath = state.canonical;
    record.sourceFileState = state;
  }
  // Reserve a new campaign; never overwrite a previous run or preregistration.
  const root = privatePath(campaign, true);
  await mkdir(dirname(root), { recursive: true });
  await mkdir(root);
  await writeExclusive(resolve(root, 'preregistration.json'), frozen);
  return frozen;
}

async function runnerCodeDigest() {
  // This hashes program code only. Source image bytes are never hashed.
  return createHash('sha256')
    .update(
      await readFile('tools/face-reading/hairline/run_multisignal_visible_hairline_candidate.py'),
    )
    .digest('hex');
}

async function assertFrozenSources(plan) {
  check(plan.runnerCodeDigest === (await runnerCodeDigest()), 'FROZEN_RUNNER_CODE_CHANGED');
  await assertRegisteredCandidate();
  for (const record of plan.records) {
    check(
      same(await fileState(record.sourcePath), record.sourceFileState),
      'FROZEN_SOURCE_FILE_CHANGED',
    );
  }
}

function routing(record) {
  return {
    selectedForFR308: record.stage === 'fr308',
    fr308Case: record.stage === 'fr308' ? record.case : null,
    includeInFR312: record.stage === 'fr312',
    fr312Case: record.stage === 'fr312' ? record.case : null,
    opaqueSessionLabel: record.opaqueSessionLabel,
    independentCaptureAttested: true,
    derivedFromAnotherCapture: false,
  };
}

export function validateWorksheet(plan, stage, worksheet, { reviewed = true } = {}) {
  check(same(worksheet.candidate, CANDIDATE), 'WORKSHEET_CANDIDATE_DRIFT');
  const expected = plan.records.filter((record) => record.stage === stage);
  check(worksheet.records.length === expected.length, 'WORKSHEET_COHORT_DRIFT');
  const seen = new Set();
  for (const record of worksheet.records) {
    const frozen = expected.find((item) => item.recordId === record.recordId);
    check(
      frozen && !seen.has(record.recordId) && same(record.routing, routing(frozen)),
      'WORKSHEET_ROUTING_DRIFT',
    );
    seen.add(record.recordId);
    if (reviewed)
      check(
        record.review.sourceAndOverlayInspected === true,
        'SOURCE_OVERLAY_HUMAN_REVIEW_REQUIRED',
      );
  }
}

async function boundedResult(root, plan) {
  const worksheet = await readJson(resolve(root, 'fr308-worksheet.json'));
  validateWorksheet(plan, 'fr308', worksheet);
  return { worksheet, result: await execute(compileWorksheet(worksheet, { boundedOnly: true })) };
}

export async function runStage(root, plan, stage, runCandidate = runPython) {
  check(stage === 'fr308' || stage === 'fr312', 'STAGE_INVALID');
  validatePlan(plan);
  if (stage === 'fr312') {
    // Re-adjudicate the frozen bounded cohort. A hand-written receipt cannot unlock FR312.
    const { result } = await boundedResult(root, plan);
    check(result.receipt.status === 'fr310_eligible_for_expanded_validation', 'FR310_NOT_ELIGIBLE');
    const saved = await readJson(resolve(root, 'fr310-receipt.json'));
    check(same(saved, result.receipt), 'FR310_RECEIPT_DRIFT');
  }
  await assertFrozenSources(plan);
  const output = resolve(root, stage);
  await mkdir(output); // no rerun/overwrite after output exposure
  const records = plan.records
    .filter((record) => record.stage === stage)
    .map((record) => ({
      recordId: record.recordId,
      sourcePath: record.sourcePath,
      experimentTag: record.case,
      qaOverlay: true,
      ...(record.faceRoi ? { faceRoi: record.faceRoi } : {}),
      frameTopTruncated: record.frameTopTruncated === true,
    }));
  const manifest = resolve(root, `${stage}-manifest.json`);
  await writeExclusive(manifest, {
    schemaVersion: 'multisignal-visible-hairline-manifest-v1',
    records,
  });
  await runCandidate(manifest, output);
  const worksheet = await prepareWorksheet(resolve(output, 'private-summary.json'));
  for (const record of worksheet.records) {
    const frozen = plan.records.find((item) => item.recordId === record.recordId);
    check(
      frozen?.stage === stage && record.privateEvidence.overlayPath,
      'SOURCE_OVERLAY_EVIDENCE_REQUIRED',
    );
    record.routing = routing(frozen);
    record.review.sourceAndOverlayInspected = false;
  }
  validateWorksheet(plan, stage, worksheet, { reviewed: false });
  await writeExclusive(resolve(root, `${stage}-worksheet.json`), worksheet);
}

function runPython(manifest, output) {
  const python =
    process.env.FACE_READING_PYTHON ?? (process.platform === 'win32' ? 'python' : 'python3');
  const preflight = spawnSync(
    python,
    [
      '-c',
      'import cv2, numpy, PIL; assert hasattr(cv2, "CascadeClassifier") and hasattr(cv2, "data")',
    ],
    { stdio: 'ignore' },
  );
  check(
    !preflight.error && preflight.status === 0,
    'LOCAL_IMAGE_RUNTIME_REQUIRES_OPENCV4_PILLOW_NUMPY',
  );
  const result = spawnSync(
    python,
    [
      'tools/face-reading/hairline/run_multisignal_visible_hairline_candidate.py',
      '--manifest',
      manifest,
      '--output',
      output,
    ],
    { stdio: 'ignore' },
  );
  check(
    !result.error && result.status === 0,
    'LOCAL_CANDIDATE_EXECUTION_FAILED_PRIVATE_OUTPUT_RETAINED',
  );
}

export async function adjudicate(root, plan, stage) {
  check(stage === 'fr308' || stage === 'fr312', 'STAGE_INVALID');
  validatePlan(plan);
  await assertFrozenSources(plan);
  const bounded = await boundedResult(root, plan);
  if (stage === 'fr308') {
    await writeExclusive(resolve(root, 'fr310-receipt.json'), bounded.result.receipt);
    return bounded.result;
  }
  check(
    bounded.result.receipt.status === 'fr310_eligible_for_expanded_validation',
    'FR310_NOT_ELIGIBLE',
  );
  const saved = await readJson(resolve(root, 'fr310-receipt.json'));
  check(same(saved, bounded.result.receipt), 'FR310_RECEIPT_DRIFT');
  const expanded = await readJson(resolve(root, 'fr312-worksheet.json'));
  validateWorksheet(plan, 'fr312', expanded);
  const combined = {
    ...bounded.worksheet,
    fr312Review: expanded.fr312Review,
    records: [...bounded.worksheet.records, ...expanded.records],
  };
  const result = await execute(compileWorksheet(combined));
  await writeExclusive(resolve(root, 'fr312-receipt.json'), result.receipt);
  if (result.fr312Receipt)
    await writeExclusive(
      resolve(root, 'fr312-expanded-validation-receipt.json'),
      result.fr312Receipt,
    );
  return result;
}

async function main() {
  const [command, ...args] = process.argv.slice(2);
  check(args.length % 2 === 0, 'ARGUMENT_VALUE_REQUIRED');
  const options = Object.fromEntries(
    Array.from({ length: args.length / 2 }, (_, i) => args.slice(i * 2, i * 2 + 2)),
  );
  check(
    Object.keys(options).every((key) => ['--campaign', '--manifest'].includes(key)),
    'UNKNOWN_ARGUMENT',
  );
  check(options['--campaign'], 'CAMPAIGN_REQUIRED');
  const root = privatePath(options['--campaign'], true);
  if (command === '--preregister') {
    check(options['--manifest'], 'MANIFEST_REQUIRED');
    await preregister(await readJson(privatePath(options['--manifest'])), root);
    process.stdout.write(
      `${JSON.stringify({ status: 'preregistered_no_image_execution', authorityPromoted: false })}\n`,
    );
    return;
  }
  const plan = await readJson(resolve(root, 'preregistration.json'));
  if (command === '--run-bounded' || command === '--run-expanded') {
    await runStage(root, plan, command === '--run-bounded' ? 'fr308' : 'fr312');
    process.stdout.write(
      `${JSON.stringify({ status: 'source_overlay_human_review_required', authorityPromoted: false })}\n`,
    );
    return;
  }
  check(command === '--adjudicate-bounded' || command === '--adjudicate-expanded', 'MODE_REQUIRED');
  const result = await adjudicate(
    root,
    plan,
    command === '--adjudicate-bounded' ? 'fr308' : 'fr312',
  );
  process.stdout.write(
    `${JSON.stringify({ status: result.receipt.status, authorityPromoted: false })}\n`,
  );
  process.exitCode = result.exitCode;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try {
    await main();
  } catch (error) {
    // Private source paths, labels, image digests and subprocess output never enter logs.
    const code =
      error instanceof Error && /^[A-Z][A-Z0-9_]+$/u.test(error.message)
        ? error.message
        : 'FR2337_LOCAL_VALIDATION_FAILED';
    process.stderr.write(`${code}: inspect private campaign and protocol; no authority issued\n`);
    process.exitCode = 1;
  }
}
