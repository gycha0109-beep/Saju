import { createHash } from 'node:crypto';
import { readFile, stat, writeFile } from 'node:fs/promises';
import { basename, dirname, isAbsolute, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import process from 'node:process';
import { parseEvidenceCsv } from './real-photo-evidence-audit.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const REPOSITORY = resolve(HERE, '../../..');
const DATASETS = Object.freeze({
  first_500: { images: 'photos', manifest: 'source_manifest.csv' },
  additional_1000: {
    images: 'additional_1000/photos',
    manifest: 'additional_1000/source_manifest.csv',
  },
  east_asia_source_500: {
    images: 'east_asia_500/photos',
    manifest: 'east_asia_500/source_manifest.csv',
  },
});
const CASES = Object.freeze([
  'face_not_single',
  'hairline_candidate_needs_review',
  'hairline_not_visible',
  'hairline_partial_or_occluded',
  'hairline_unavailable',
]);
const DECISIONS = new Set(['correct', 'wrong', 'partial', 'unknown']);
const MATCH_SHA = /^[a-f0-9]{64}$/i;
const PHOTO = /^face_[0-9]{4}\.jpg$/;
const VERSION = 'engineering.real-photo-review-intake-bridge@0.1.0';

const fail = (reason) => {
  throw Error('REAL_PHOTO_BRIDGE_' + reason);
};
const readJson = async (path) => JSON.parse(await readFile(path, 'utf8'));
const readCsv = async (path) => parseEvidenceCsv(await readFile(path, 'utf8'));
const digest = (bytes) => createHash('sha256').update(bytes).digest('hex');
const keyOf = (row) => row.dataset + ':' + row.photo_id;
const isInside = (parent, child) => {
  const path = relative(parent, child);
  return !path.startsWith('..' + sep) && path !== '..' && !isAbsolute(path);
};
const safePrivateFile = (path) => {
  if (isInside(REPOSITORY, resolve(path))) fail('PUBLIC_OUTPUT_FORBIDDEN');
};
const requireHeaders = (table, keys) => {
  if (!keys.every((key) => table.header.includes(key))) fail('CSV_COLUMNS_MISSING');
};
function mapByKey(table) {
  const map = new Map();
  for (const row of table.rows) {
    const key = keyOf(row);
    if (map.has(key)) fail('DUPLICATE_EVIDENCE_KEY');
    map.set(key, row);
  }
  return map;
}

// Pick existing, non-empty *manual disposition codes* across failure/candidate
// classes. A disposition is not anatomical ground truth, pose evidence, or
// independent measurement accuracy. Never select or publish by person identity.
export function chooseReviewCases(reviewRows, { perCase = 2 } = {}) {
  if (!Number.isInteger(perCase) || perCase < 1 || perCase > 10) fail('CASE_LIMIT_INVALID');
  const seen = new Set();
  const byCase = new Map(CASES.map((name) => [name, []]));
  for (const row of reviewRows) {
    if (
      !Object.hasOwn(DATASETS, row.dataset) ||
      !CASES.includes(row.review_case) ||
      !PHOTO.test(row.photo_id + '.jpg') ||
      !DECISIONS.has(row.human_review_decision) ||
      !/^\d{4}-\d{2}-\d{2}T/.test(row.reviewed_at || '')
    )
      continue;
    const key = keyOf(row);
    if (seen.has(key)) fail('DUPLICATE_REVIEW_KEY');
    seen.add(key);
    byCase.get(row.review_case).push(row);
  }
  return CASES.flatMap((name) =>
    byCase
      .get(name)
      .sort((a, b) => keyOf(a).localeCompare(keyOf(b), 'en'))
      .slice(0, perCase),
  );
}

export async function prepareRealPhotoReviewPlan(dataRoot, { perCase = 2 } = {}) {
  const root = resolve(dataRoot);
  const assessment = resolve(root, 'evaluation_2000');
  const results = await readCsv(join(assessment, 'results.csv'));
  const queue = await readCsv(join(assessment, 'manual_review_queue.csv'));
  requireHeaders(results, ['dataset', 'photo_id', 'landmark_face_status', 'hairline_state']);
  requireHeaders(queue, [
    'dataset',
    'photo_id',
    'file_relative_to_MyeongHa_Facial_500',
    'review_case',
    'landmark_face_status',
    'hairline_state',
    'human_review_decision',
    'reviewed_at',
  ]);
  const model = mapByKey(results);
  const manifests = new Map();
  for (const [dataset, dirs] of Object.entries(DATASETS)) {
    const csv = await readCsv(join(root, dirs.manifest));
    requireHeaders(csv, ['file', 'sha256', 'license']);
    const map = new Map();
    for (const row of csv.rows) {
      if (!PHOTO.test(row.file) || map.has(row.file)) fail('SOURCE_MANIFEST_INVALID');
      map.set(row.file, row);
    }
    manifests.set(dataset, map);
  }
  const originals = new Set();
  const selected = chooseReviewCases(queue.rows, { perCase });
  if (!selected.length) fail('NO_REVIEWED_SAMPLES');
  const entries = [];
  for (const [index, row] of selected.entries()) {
    const dirs = DATASETS[row.dataset];
    const expectedRelative = dirs.images.replaceAll('\\', '/') + '/' + row.photo_id + '.jpg';
    if (row.file_relative_to_MyeongHa_Facial_500.replaceAll('\\', '/') !== expectedRelative)
      fail('REVIEW_SOURCE_PATH_MISMATCH');
    const source = manifests.get(row.dataset).get(basename(expectedRelative));
    const old = model.get(keyOf(row));
    if (
      !source ||
      !old ||
      row.landmark_face_status !== old.landmark_face_status ||
      row.hairline_state !== old.hairline_state ||
      !MATCH_SHA.test(source.sha256)
    )
      fail('REVIEW_PROVENANCE_MISMATCH');
    const imagePath = resolve(root, expectedRelative);
    if (!isInside(root, imagePath)) fail('IMAGE_PATH_INVALID');
    const info = await stat(imagePath);
    if (!info.isFile() || info.size === 0) fail('IMAGE_MISSING');
    const actualSha = digest(await readFile(imagePath));
    if (actualSha !== source.sha256.toLowerCase()) fail('IMAGE_MANIFEST_HASH_MISMATCH');
    if (originals.has(actualSha)) fail('DUPLICATE_SAMPLE_IMAGE');
    originals.add(actualSha);
    entries.push({
      selectionRef: 'sample-' + String(index + 1).padStart(2, '0'),
      dataset: row.dataset,
      photoId: row.photo_id,
      sourceRelativePath: expectedRelative,
      originalSha256: actualSha,
      licenseDeclared: Boolean(source.license),
      legacyFaceState: old.landmark_face_status,
      legacyHairlineState: old.hairline_state,
      manualDisposition: row.human_review_decision,
      manualReviewScope: 'legacy_hairline_only',
      poseReviewed: false,
      viewRole: null,
      independentAnatomicalBoundaryGroundTruth: false,
      independentlyRepeatedCapture: false,
      current2dExtractorsExecuted: false,
      current2dState: 'not_evaluated',
    });
  }
  return {
    schemaVersion: VERSION,
    researchOnly: true,
    dataRoot: root,
    selectedPhotoCount: entries.length,
    selectionRule: 'existing_reviewed_decisions_up_to_' + perCase + '_per_case',
    sources: {
      legacyScope: '2026-11-04-hairline-results',
      currentWholeFace2dExtractorsRun: false,
      poseIndependentlyVerified: false,
      independentAnatomicalAccuracyValidated: false,
      commercialUseAuthorized: false,
    },
    entries,
  };
}

export async function writePrivateRealPhotoPlan(plan, destination) {
  safePrivateFile(destination);
  await writeFile(destination, JSON.stringify(plan, null, 2) + '\n', { flag: 'wx' });
  return {
    selectedPhotoCount: plan.selectedPhotoCount,
    status: 'private_plan_created',
    current2dExecuted: false,
    poseReviewRequired: true,
  };
}

// Promote only after a person explicitly checks each photo's pose. Existing
// /two-view server remains the sole reader/analyzer; this function only writes
// its already-supported private additional-inventory input.
export async function admitReviewedPhotos(planFile, rolesFile, intakePath) {
  safePrivateFile(planFile);
  safePrivateFile(rolesFile);
  const intake = resolve(intakePath);
  safePrivateFile(intake);
  const [plan, roles, base] = await Promise.all([
    readJson(planFile),
    readJson(rolesFile),
    readJson(join(intake, 'inventory.json')),
  ]);
  await stat(join(intake, 'combined-active.json'));
  const modelDigest = digest(await readFile(join(intake, 'assets/face_landmarker.task')));
  if (modelDigest !== '64184e229b263107bc2b804c6625db1341ff2bb731874b0bcc2fe6544e0bc9ff')
    fail('PINNED_MODEL_MISSING_OR_CHANGED');
  if (
    plan.schemaVersion !== VERSION ||
    plan.researchOnly !== true ||
    !Array.isArray(plan.entries) ||
    plan.entries.length !== plan.selectedPhotoCount ||
    !Array.isArray(base) ||
    !Array.isArray(roles) ||
    roles.length !== plan.entries.length ||
    new Set(roles.map((x) => x.selectionRef)).size !== roles.length
  )
    fail('FINALIZE_INPUT_INVALID');
  const reviews = new Map(roles.map((x) => [x.selectionRef, x]));
  const originals = new Set();
  const inventory = [];
  const preexisting = new Set(base.map((row) => row.recordId));
  const used = new Set(preexisting);
  let nextId = 9000;
  for (const sample of plan.entries) {
    const review = reviews.get(sample.selectionRef);
    if (
      !review ||
      review.poseReviewed !== true ||
      !['frontal', 'profile', 'skip'].includes(review.viewRole) ||
      !/^\d{4}-\d{2}-\d{2}T/.test(review.reviewedAt || '') ||
      typeof review.reviewNote !== 'string' ||
      !review.reviewNote.trim() ||
      sample.poseReviewed !== false ||
      sample.current2dExtractorsExecuted !== false ||
      !Object.hasOwn(DATASETS, sample.dataset) ||
      !PHOTO.test(sample.photoId + '.jpg')
    )
      fail('POSE_REVIEW_REQUIRED');
    const dirs = DATASETS[sample.dataset];
    const relativePath = dirs.images + '/' + sample.photoId + '.jpg';
    if (sample.sourceRelativePath !== relativePath || !MATCH_SHA.test(sample.originalSha256))
      fail('SOURCE_PATH_INVALID');
    const sourcePath = resolve(plan.dataRoot, relativePath);
    if (
      !isInside(plan.dataRoot, sourcePath) ||
      digest(await readFile(sourcePath)) !== sample.originalSha256
    )
      fail('SOURCE_CHANGED');
    if (originals.has(sample.originalSha256)) fail('DUPLICATE_SAMPLE_IMAGE');
    originals.add(sample.originalSha256);
    if (review.viewRole === 'skip') continue;
    while (used.has('capture-' + nextId)) nextId++;
    const recordId = 'capture-' + nextId++;
    used.add(recordId);
    inventory.push({ recordId, sourcePath, viewRole: review.viewRole });
  }
  if (!inventory.length) fail('NO_ADMITTED_PHOTOS');
  await writeFile(
    join(intake, 'additional-inventory.json'),
    JSON.stringify(inventory, null, 2) + '\n',
    { flag: 'wx' },
  );
  return {
    admittedPhotoCount: inventory.length,
    status: 'private_two_view_intake_prepared',
    current2dExecuted: false,
    independentAccuracyValidated: false,
  };
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try {
    const args = process.argv.slice(2);
    let result;
    if (args[0] === '--admit' && args.length === 4) {
      result = await admitReviewedPhotos(args[1], args[2], args[3]);
    } else if (args.length === 2 && args[0] !== '--admit') {
      result = await writePrivateRealPhotoPlan(await prepareRealPhotoReviewPlan(args[0]), args[1]);
    } else {
      fail('USAGE');
    }
    process.stdout.write(JSON.stringify(result) + '\n');
  } catch (error) {
    // Never print private filenames, hashes, person identifiers, or source bytes.
    const code = /^REAL_PHOTO_BRIDGE_[A-Z_]+$/.test(error.message)
      ? error.message
      : 'REAL_PHOTO_BRIDGE_LOCAL_INPUT_FAILED';
    process.stderr.write(code + '\n');
    process.exitCode = 1;
  }
}
