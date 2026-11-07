import http from 'node:http';
import process from 'node:process';
import { Buffer } from 'node:buffer';
import { readFile, writeFile, mkdir, stat, rename } from 'node:fs/promises';
import { resolve, dirname, extname } from 'node:path';
import { fileURLToPath, URL } from 'node:url';
import { randomUUID, randomBytes, createHash } from 'node:crypto';
import { METRIC_DEFINITIONS, METHOD_VERSION } from './frontal-metrics.mjs';
import {
  PARSING_VERSION,
  PARSING_LEGACY_VERSION,
  PARSING_CROP_VERSION,
  PARSING_EAR_VERSION,
  PARSING_INSTANCE_VERSION,
  PARSING_SCREENED_VERSION,
  PARSING_EYE_VERSION,
  PARSING_PIN,
  PARSING_GROUPS,
  validateParsingSummary,
} from './parsing-contract.mjs';
import { validateParsingBatch } from './parsing-storage.mjs';
import { INSTANCE_PIN } from './instance-frame.mjs';
import { readingCatalogue } from './reading-catalogue.mjs';
import { experienceAssets } from './experience-server.mjs';
import { projectPrivatePhotoReadiness } from './private-readiness-view.mjs';
import { traceFr294PhotoHardGaps } from './fr294-photo-gap-bridge.mjs';
import { traceFr294HumanEvidenceReadiness } from './fr294-human-evidence-readiness.mjs';
import {
  FR294_INDEPENDENT_PAIR_LEDGER_VERSION,
  auditFr294IndependentScreenReviewPairs,
  withheldFr294IndependentPairs,
} from './fr294-independent-review-pairs.mjs';
import {
  EYELID_CONTOUR_REVIEW_VERSION,
  createEyelidContourReviewRecord,
  validateEyelidContourReviewStore,
  projectEyelidContourReviewForUi,
} from './eyelid-contour-human-review.mjs';
import {
  LIP_BORDER_REVIEW_SCHEMA_VERSION,
  LIP_BORDER_LINES,
  LIP_BORDER_POINTS,
  createLipBorderHumanReviewRecord,
  validateLipBorderHumanReviewStore,
  projectLipBorderHumanReviewForUi,
} from './lip-border-human-review.mjs';
import {
  EAR_DETAIL_REVIEW_SCHEMA_VERSION,
  createEarDetailReviewRecord,
  validateEarDetailReviewStore,
  projectEarDetailReviewForUi,
} from './ear-detail-review.mjs';
import {
  NOSE_DETAIL_REVIEW_SCHEMA_VERSION,
  NOSE_CONTOUR_PARTS,
  createNoseDetailReviewRecord,
  validateNoseDetailReviewStore,
  projectNoseDetailReviewForUi,
} from './nose-detail-review.mjs';
import {
  BROW_CENTERLINE_REVIEW_SCHEMA_VERSION,
  createBrowCenterlineReviewRecord,
  validateBrowCenterlineReviewStore,
  projectBrowCenterlineReviewForUi,
} from './brow-centerline-review.mjs';
import {
  EYE_FOLD_REVIEW_SCHEMA_VERSION,
  createEyeFoldReviewRecord,
  validateEyeFoldReviewStore,
  projectEyeFoldReviewForUi,
} from './eye-fold-review.mjs';

const sourceDir = dirname(fileURLToPath(import.meta.url));
const repository = resolve(sourceDir, '../../..');
const staticHeaders = {
  'Cache-Control': 'no-store',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'no-referrer',
};
const json = (res, status, value) => {
  res.writeHead(status, { ...staticHeaders, 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(value));
};
const definitionMap = new Map(METRIC_DEFINITIONS.map((d) => ['engineering.frontal.' + d.id, d]));

export function validateBatch(input, ids, roles = new Map()) {
  if (
    input.methodVersion !== METHOD_VERSION ||
    !Array.isArray(input.records) ||
    input.records.length !== ids.length
  )
    throw Error('BATCH_INVALID');
  if (
    new Set(input.records.map((r) => r.captureRef)).size !== ids.length ||
    input.records.some((r) => !ids.includes(r.captureRef))
  )
    throw Error('BATCH_INVALID');
  return input.records.map((record) => {
    if (record.error) {
      if (!['TASK_FAILED', 'TASK_TIMEOUT'].includes(record.error) || record.metrics?.length)
        throw Error('BATCH_INVALID');
      return { captureRef: record.captureRef, error: record.error, metrics: [] };
    }
    if (roles.get(record.captureRef) === 'profile') {
      if (!Array.isArray(record.metrics) || record.metrics.length) throw Error('METRIC_INVALID');
      return { captureRef: record.captureRef, metrics: [] };
    }
    if (
      !Array.isArray(record.metrics) ||
      record.metrics.length !== definitionMap.size ||
      new Set(record.metrics.map((m) => m.metricKey)).size !== definitionMap.size
    )
      throw Error('BATCH_INVALID');
    const metrics = record.metrics.map((metric) => {
      const d = definitionMap.get(metric.metricKey);
      if (
        !d ||
        metric.captureRef !== record.captureRef ||
        metric.viewRole !== 'frontal' ||
        metric.candidateOnly !== true ||
        metric.methodVersion !== METHOD_VERSION
      )
        throw Error('METRIC_INVALID');
      const base = {
        metricKey: metric.metricKey,
        label: d.label,
        region: d.region,
        captureRef: record.captureRef,
        viewRole: 'frontal',
        methodVersion: METHOD_VERSION,
        candidateOnly: true,
        accuracyValidated: false,
        canonicalReceiptIssued: false,
        coordinateFrame: 'eye_pair_relative_image_plane_2d',
      };
      if (
        metric.status === 'available' &&
        Number.isFinite(metric.value) &&
        metric.value >= 0 &&
        metric.unit === 'ratio'
      )
        return { ...base, status: 'available', value: metric.value, unit: 'ratio' };
      if (
        metric.status === 'unavailable' &&
        typeof metric.reason === 'string' &&
        /^[a-z_]{1,80}$/.test(metric.reason)
      )
        return { ...base, status: 'unavailable', reason: metric.reason };
      throw Error('METRIC_INVALID');
    });
    return { captureRef: record.captureRef, metrics };
  });
}

async function requestJson(req, limit = 200000) {
  let size = 0;
  const chunks = [];
  for await (const chunk of req) {
    size += chunk.length;
    if (size > limit) throw Error('REQUEST_TOO_LARGE');
    chunks.push(chunk);
  }
  return JSON.parse(Buffer.concat(chunks).toString('utf8'));
}

export async function createLocalReviewServer({
  intake = resolve(repository, '.cache/face-reading/fr2337-intake'),
  port = 8768,
} = {}) {
  if (!Number.isInteger(port) || port < 1024 || port > 65535) throw Error('PORT_INVALID');
  const packageInfo = JSON.parse(
    await readFile(
      resolve(repository, 'node_modules/@mediapipe/tasks-vision/package.json'),
      'utf8',
    ),
  );
  if (packageInfo.version !== '0.10.35') throw Error('PROVIDER_PIN_INVALID');
  const modelPath = resolve(intake, 'assets/face_landmarker.task');
  if (
    createHash('sha256')
      .update(await readFile(modelPath))
      .digest('hex') !== '64184e229b263107bc2b804c6625db1341ff2bb731874b0bcc2fe6544e0bc9ff'
  )
    throw Error('MODEL_PIN_INVALID');
  const baseInventory = JSON.parse(await readFile(resolve(intake, 'inventory.json'), 'utf8'));
  let additionalInventory = [];
  try {
    additionalInventory = JSON.parse(
      await readFile(resolve(intake, 'additional-inventory.json'), 'utf8'),
    );
  } catch (error) {
    if (error.code !== 'ENOENT') throw Error('ADDITIONAL_INVENTORY_INVALID', { cause: error });
  }
  if (
    !Array.isArray(baseInventory) ||
    !Array.isArray(additionalInventory) ||
    additionalInventory.some((r) => !['frontal', 'profile'].includes(r.viewRole))
  )
    throw Error('INVENTORY_INVALID');
  const inventory = [...baseInventory, ...additionalInventory];
  if (
    !Array.isArray(inventory) ||
    new Set(inventory.map((r) => r.recordId)).size !== inventory.length ||
    inventory.some(
      (r) =>
        !/^capture-[0-9]{2,}$/.test(r.recordId) ||
        !['.jpg', '.jpeg', '.png', '.webp'].includes(extname(r.sourcePath).toLowerCase()),
    )
  )
    throw Error('INVENTORY_INVALID');
  const render = JSON.parse(await readFile(resolve(intake, 'combined-active.json'), 'utf8'));
  const manifest = JSON.parse(await readFile(resolve(render.path, 'manifest.json'), 'utf8'));
  if (manifest.recordIds.some((id) => !baseInventory.some((r) => r.recordId === id)))
    throw Error('INVENTORY_INVALID');
  const baseIds = [
    ...manifest.recordIds,
    ...baseInventory.map((r) => r.recordId).filter((id) => !manifest.recordIds.includes(id)),
  ];
  const ids = [...baseIds, ...additionalInventory.map((r) => r.recordId)];
  if (ids.length !== inventory.length || new Set(ids).size !== inventory.length)
    throw Error('INVENTORY_INVALID');
  const roles = new Map([
    ...baseIds.map((id) => [id, 'frontal']),
    ...additionalInventory.map((r) => [r.recordId, r.viewRole]),
  ]);
  const records = ids.map((captureRef) => ({
    captureRef,
    viewRole: roles.get(captureRef),
    image: '/image/' + captureRef,
    ...(manifest.recordIds.includes(captureRef)
      ? { oldOverlay: '/review-artifact/' + captureRef + '/full.png' }
      : {}),
  }));
  const catalogue = readingCatalogue();
  const sourceFileStates = await Promise.all(
    inventory.map(async (record) => {
      const s = await stat(record.sourcePath);
      return {
        recordId: record.recordId,
        sourcePath: record.sourcePath,
        size: s.size,
        mtimeMs: s.mtimeMs,
        ino: s.ino,
      };
    }),
  );
  const sourceDigestByRecord = new Map(
    await Promise.all(
      inventory.map(async (record) => [
        record.recordId,
        createHash('sha256')
          .update(await readFile(record.sourcePath))
          .digest('hex'),
      ]),
    ),
  );
  const eyeFoldReviewPath = resolve(intake, 'eye-fold-human-reviews.json');
  let eyeFoldReviews = new Map();
  let eyeFoldReviewRestoreFailed = false;
  let eyeFoldReviewSaving = false;
  try {
    const stored = JSON.parse(await readFile(eyeFoldReviewPath, 'utf8'));
    const validated = validateEyeFoldReviewStore(stored, ids);
    eyeFoldReviews = new Map(Object.entries(validated.records));
  } catch (error) {
    if (error.code !== 'ENOENT') eyeFoldReviewRestoreFailed = true;
  }
  const browReviewPath = resolve(intake, 'brow-centerline-human-reviews.json');
  let browReviews = new Map();
  let browReviewRestoreFailed = false;
  let browReviewSaving = false;
  try {
    const stored = JSON.parse(await readFile(browReviewPath, 'utf8'));
    browReviews = new Map(Object.entries(validateBrowCenterlineReviewStore(stored, ids).records));
  } catch (error) {
    if (error.code !== 'ENOENT') browReviewRestoreFailed = true;
  }
  const noseReviewPath = resolve(intake, 'nose-detail-human-reviews.json');
  let noseReviews = new Map();
  let noseReviewRestoreFailed = false;
  let noseReviewSaving = false;
  try {
    const stored = JSON.parse(await readFile(noseReviewPath, 'utf8'));
    noseReviews = new Map(Object.entries(validateNoseDetailReviewStore(stored, ids).records));
  } catch (error) {
    if (error.code !== 'ENOENT') noseReviewRestoreFailed = true;
  }
  const earReviewPath = resolve(intake, 'ear-detail-human-reviews.json');
  let earReviews = new Map();
  let earReviewRestoreFailed = false;
  let earReviewSaving = false;
  try {
    const stored = JSON.parse(await readFile(earReviewPath, 'utf8'));
    earReviews = new Map(Object.entries(validateEarDetailReviewStore(stored, records).records));
  } catch (error) {
    if (error.code !== 'ENOENT') earReviewRestoreFailed = true;
  }
  const lipReviewPath = resolve(intake, 'lip-border-human-reviews.json');
  let lipReviews = new Map();
  let lipReviewRestoreFailed = false;
  let lipReviewSaving = false;
  try {
    const stored = JSON.parse(await readFile(lipReviewPath, 'utf8'));
    lipReviews = new Map(Object.entries(validateLipBorderHumanReviewStore(stored, ids).records));
  } catch (error) {
    if (error.code !== 'ENOENT') lipReviewRestoreFailed = true;
  }
  const eyelidContourPath = resolve(intake, 'eyelid-contour-human-reviews.json');
  let eyelidContourReviews = new Map();
  let eyelidContourRestoreFailed = false;
  let eyelidContourSaving = false;
  try {
    const stored = JSON.parse(await readFile(eyelidContourPath, 'utf8'));
    eyelidContourReviews = new Map(
      Object.entries(validateEyelidContourReviewStore(stored, ids).records),
    );
  } catch (error) {
    if (error.code !== 'ENOENT') eyelidContourRestoreFailed = true;
  }
  // Optional locally supplied independent categorical annotations; never expose
  // raw reviewer codes, review statuses, consent attestations or source digests.
  const independentPairPath = resolve(intake, 'fr294-independent-pairs-private.json');
  let independentPairLedger = { schemaVersion: FR294_INDEPENDENT_PAIR_LEDGER_VERSION, pairs: [] };
  let independentPairRestoreFailed = false;
  try {
    independentPairLedger = JSON.parse(await readFile(independentPairPath, 'utf8'));
  } catch (error) {
    if (error.code !== 'ENOENT') independentPairRestoreFailed = true;
  }
  const token = randomBytes(24).toString('hex');
  const origin = 'http://127.0.0.1:' + port;
  const runRoot = resolve(intake, 'two-view-runs');
  const parsingRoot = resolve(intake, 'parsing-runs');
  let parsingModel = null,
    instanceModel = null,
    parsingSaved = [],
    parsingRunId,
    parsingSaving = false,
    parsingPrevious = [],
    previousRunId;
  let parsingRestoreFailed = false;
  // A previous complete base batch can be shown while new captures are pending.
  // Arbitrary partial, duplicate or unknown stored batches remain invalid.
  function restoredIds(saved) {
    const stored = saved?.records?.map((r) => r.captureRef);
    if (!Array.isArray(stored) || new Set(stored).size !== stored.length)
      throw Error('PREVIOUS_BATCH_INVALID');
    const expected = stored.length === ids.length ? ids : baseIds;
    if (stored.length !== expected.length || stored.some((id) => !expected.includes(id)))
      throw Error('PREVIOUS_BATCH_INVALID');
    return expected;
  }
  try {
    const ortPackage = JSON.parse(
      await readFile(resolve(repository, 'node_modules/onnxruntime-web/package.json'), 'utf8'),
    );
    const bytes = await readFile(resolve(intake, 'assets/parsing-resnet18-v0.0.2.onnx'));
    if (
      ortPackage.version === PARSING_PIN.runtime &&
      createHash('sha256').update(bytes).digest('hex') === PARSING_PIN.sha256
    )
      parsingModel = bytes;
  } catch {
    /* Missing optional parser cannot break the existing review path. */
  }
  try {
    const bytes = await readFile(resolve(intake, 'assets/yunet-2023mar.onnx'));
    if (createHash('sha256').update(bytes).digest('hex') === INSTANCE_PIN.sha256)
      instanceModel = bytes;
  } catch {
    /* Optional instance detection never disables the baseline parser. */
  }
  try {
    const active = JSON.parse(await readFile(resolve(parsingRoot, 'active.json'), 'utf8'));
    if (!/^[a-f0-9-]{36}$/.test(active.runId)) throw Error('PARSING_RUN_INVALID');
    const saved = JSON.parse(
      await readFile(resolve(parsingRoot, active.runId, 'summary.json'), 'utf8'),
    );
    if (
      ![
        PARSING_VERSION,
        PARSING_LEGACY_VERSION,
        PARSING_CROP_VERSION,
        PARSING_EAR_VERSION,
        PARSING_INSTANCE_VERSION,
        PARSING_SCREENED_VERSION,
        PARSING_EYE_VERSION,
      ].includes(saved.methodVersion) ||
      !Array.isArray(saved.records)
    )
      throw Error('PARSING_RUN_INVALID');
    restoredIds(saved);
    if (saved.records.some((r) => r.parsing?.methodVersion !== saved.methodVersion))
      throw Error('PARSING_RUN_INVALID');
    parsingSaved = saved.records.map((r) => ({
      captureRef: r.captureRef,
      parsing: validateParsingSummary(r.parsing, {
        allowLegacy: true,
        viewRole: roles.get(r.captureRef),
      }),
    }));
    parsingRunId = active.runId;
    if (saved.methodVersion === PARSING_LEGACY_VERSION) {
      parsingPrevious = parsingSaved;
      previousRunId = active.runId;
    }
  } catch (error) {
    if (error.code !== 'ENOENT') parsingRestoreFailed = true;
  }
  let comparisonRestoreFailed = false;
  if (!previousRunId)
    try {
      const previous = JSON.parse(await readFile(resolve(parsingRoot, 'previous.json'), 'utf8'));
      if (!/^[a-f0-9-]{36}$/.test(previous.runId)) throw Error('PARSING_RUN_INVALID');
      const saved = JSON.parse(
        await readFile(resolve(parsingRoot, previous.runId, 'summary.json'), 'utf8'),
      );
      if (saved.methodVersion !== PARSING_LEGACY_VERSION) throw Error('PARSING_RUN_INVALID');
      restoredIds(saved);
      if (saved.records.some((r) => r.parsing?.methodVersion !== PARSING_LEGACY_VERSION))
        throw Error('PARSING_RUN_INVALID');
      parsingPrevious = saved.records.map((r) => ({
        captureRef: r.captureRef,
        parsing: validateParsingSummary(r.parsing, { allowLegacy: true }),
      }));
      previousRunId = previous.runId;
    } catch (error) {
      if (error.code !== 'ENOENT') comparisonRestoreFailed = true;
    }
  let savedRecords = [],
    saving = false;
  try {
    const active = JSON.parse(await readFile(resolve(runRoot, 'active.json'), 'utf8'));
    const saved = JSON.parse(
      await readFile(resolve(runRoot, active.runId, 'metrics.json'), 'utf8'),
    );
    savedRecords = validateBatch(saved, restoredIds(saved), roles);
  } catch (error) {
    if (error.code !== 'ENOENT') throw Error('PREVIOUS_METRICS_INVALID', { cause: error });
  }
  const assets = new Map(
    [
      'review.mjs',
      'jobs.mjs',
      'frontal-metrics.mjs',
      'landmarks-worker.mjs',
      'parsing-contract.mjs',
      'parsing-worker.mjs',
      'parsing-frame.mjs',
      'instance-frame.mjs',
      'instance-parsing.mjs',
      'region-quality.mjs',
      'profile-metrics.mjs',
      'eye-direction.mjs',
      'morphology-geometry.mjs',
      'morphology-assessment.mjs',
      'visible-brow-mask-envelope.mjs',
      'visible-nose-mask-profile.mjs',
      'visible-lip-class-profile.mjs',
      'visible-eye-class-profile.mjs',
      'eye-fold-review.mjs',
      'brow-centerline-review.mjs',
      'brow-centerline-review-ui.mjs',
      'brow-centerline-comparison.mjs',
      'nose-detail-review.mjs',
      'nose-detail-review-ui.mjs',
      'ear-detail-review.mjs',
      'ear-detail-review-ui.mjs',
      'visible-ear-mask-silhouette.mjs',
      'visible-hair-skin-interface.mjs',
      'lip-border-human-review.mjs',
      'lip-border-human-review-ui.mjs',
      'eyelid-contour-human-review.mjs',
      'eyelid-contour-human-review-ui.mjs',
    ].map((name) => ['/two-view/' + name, [resolve(sourceDir, name), 'text/javascript']]),
  );
  for (const [route, asset] of experienceAssets()) assets.set(route, asset);
  for (const name of [
    'ort.wasm.bundle.min.mjs',
    'ort-wasm-simd-threaded.mjs',
    'ort-wasm-simd-threaded.wasm',
  ])
    assets.set('/local-assets/ort/' + name, [
      resolve(repository, 'node_modules/onnxruntime-web/dist', name),
      name.endsWith('.wasm') ? 'application/wasm' : 'text/javascript',
    ]);
  assets.set('/local-assets/vision_bundle.mjs', [
    resolve(repository, 'node_modules/@mediapipe/tasks-vision/vision_bundle.mjs'),
    'text/javascript',
  ]);
  assets.set('/local-assets/face_landmarker.task', [modelPath, 'application/octet-stream']);
  assets.set('/local-assets/static-review.js', [
    resolve(intake, 'static-review.js'),
    'text/javascript',
  ]);
  for (const name of [
    'vision_wasm_internal',
    'vision_wasm_nosimd_internal',
    'vision_wasm_module_internal',
  ])
    for (const extension of ['js', 'wasm'])
      assets.set('/local-assets/wasm/' + name + '.' + extension, [
        resolve(repository, 'node_modules/@mediapipe/tasks-vision/wasm', name + '.' + extension),
        extension === 'wasm' ? 'application/wasm' : 'text/javascript',
      ]);
  async function file(res, path, type) {
    res.writeHead(200, { ...staticHeaders, 'Content-Type': type });
    res.end(await readFile(path));
  }
  async function rootPage(res, url) {
    const indexValue = Number(url.searchParams.get('photo') || 1),
      index =
        Number.isInteger(indexValue) && indexValue >= 1 && indexValue <= ids.length
          ? indexValue - 1
          : 0;
    const legacyRecords = await Promise.all(
      records.map(async (r) => ({
        recordId: r.captureRef,
        image: r.image,
        computed: Boolean(r.oldOverlay),
        summary: r.oldOverlay
          ? JSON.parse(await readFile(resolve(render.path, r.captureRef, 'summary.json'), 'utf8'))
          : { providerState: 'not_executed', parts: [], hairlineExposed: false },
      })),
    );
    const selected = legacyRecords[index];
    const layers = [
      { id: 'hairline', label: '헤어라인', color: '#ff5050' },
      { id: 'eyes', label: '눈', color: '#26b8ff' },
      { id: 'brows', label: '눈썹', color: '#64ee88' },
      { id: 'nose', label: '코', color: '#ffdc43' },
      { id: 'mouth', label: '입', color: '#ff76bc' },
      { id: 'oval', label: '윤곽', color: '#c394ff' },
    ];
    let html = await readFile(resolve(intake, 'static.html'), 'utf8');
    const values = {
      __INITIAL_IMAGE__: selected.computed
        ? '/review-artifact/' + selected.recordId + '/full.png'
        : selected.image,
      __INITIAL_STATUS__: '기존 전체 부위 표시',
      __COUNTS__: '전체 ' + ids.length + '장 · 결과 ' + manifest.recordIds.length + '장',
      __INITIAL_PARTS__: selected.summary.parts
        .map((text) => '<span class="part">' + text.replace(/[<>&]/g, '') + '</span>')
        .join(''),
      __PREV_CLASS__: index === 0 ? 'disabled' : '',
      __NEXT_CLASS__: index === ids.length - 1 ? 'disabled' : '',
      __PREV_URL__: '/?photo=' + Math.max(1, index),
      __NEXT_URL__: '/?photo=' + Math.min(ids.length, index + 2),
      __POSITION__: index + 1 + ' / ' + ids.length,
      __THUMBNAILS__: legacyRecords
        .map(
          (r, i) =>
            '<a class="thumb" href="/?photo=' +
            (i + 1) +
            '"><img src="' +
            r.image +
            '" alt=""><span>' +
            (i + 1) +
            '</span></a>',
        )
        .join(''),
      __REVIEW_DATA__: JSON.stringify({ index, records: legacyRecords, layers }).replaceAll(
        '<',
        '\\u003c',
      ),
    };
    for (const [key, value] of Object.entries(values)) html = html.replaceAll(key, value);
    html = html.replace('<main>', '<main><p><a href="/two-view">정면·측면 수치 확인 →</a></p>');
    res.writeHead(200, { ...staticHeaders, 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
  }
  async function currentEyeFoldReviewState() {
    const records = {};
    let staleCount = 0;
    for (const [captureRef, review] of eyeFoldReviews) {
      try {
        const source = inventory.find((item) => item.recordId === captureRef);
        if (!source) {
          staleCount++;
          continue;
        }
        const digest = createHash('sha256')
          .update(await readFile(source.sourcePath))
          .digest('hex');
        if (digest !== review.sourceSha256) {
          staleCount++;
          continue;
        }
        records[captureRef] = projectEyeFoldReviewForUi(review);
      } catch {
        staleCount++;
      }
    }
    return { records, staleCount };
  }
  async function currentBrowReviewState() {
    const records = {};
    let staleCount = 0;
    for (const [captureRef, review] of browReviews) {
      try {
        const source = inventory.find((r) => r.recordId === captureRef);
        if (!source) {
          staleCount++;
          continue;
        }
        const digest = createHash('sha256')
          .update(await readFile(source.sourcePath))
          .digest('hex');
        if (digest !== review.sourceSha256) {
          staleCount++;
          continue;
        }
        records[captureRef] = projectBrowCenterlineReviewForUi(review);
      } catch {
        staleCount++;
      }
    }
    return { records, staleCount };
  }
  async function currentNoseReviewState() {
    const records = {};
    let staleCount = 0;
    for (const [captureRef, review] of noseReviews) {
      try {
        const source = inventory.find((item) => item.recordId === captureRef);
        if (!source) {
          staleCount++;
          continue;
        }
        const digest = createHash('sha256')
          .update(await readFile(source.sourcePath))
          .digest('hex');
        if (digest !== review.sourceSha256) {
          staleCount++;
          continue;
        }
        records[captureRef] = projectNoseDetailReviewForUi(review);
      } catch {
        staleCount++;
      }
    }
    return { records, staleCount };
  }
  async function currentEarReviewState() {
    const valid = {};
    let staleCount = 0;
    for (const [captureRef, review] of earReviews) {
      try {
        const source = inventory.find((item) => item.recordId === captureRef);
        if (!source) {
          staleCount++;
          continue;
        }
        const sha = createHash('sha256')
          .update(await readFile(source.sourcePath))
          .digest('hex');
        if (sha !== review.sourceSha256) {
          staleCount++;
          continue;
        }
        valid[captureRef] = projectEarDetailReviewForUi(review);
      } catch {
        staleCount++;
      }
    }
    return { records: valid, staleCount };
  }
  async function currentLipReviewState() {
    const records = {};
    let staleCount = 0;
    for (const [captureRef, review] of lipReviews) {
      try {
        const source = inventory.find((item) => item.recordId === captureRef);
        if (!source) {
          staleCount++;
          continue;
        }
        const digest = createHash('sha256')
          .update(await readFile(source.sourcePath))
          .digest('hex');
        if (digest !== review.sourceSha256) {
          staleCount++;
          continue;
        }
        records[captureRef] = projectLipBorderHumanReviewForUi(review);
      } catch {
        staleCount++;
      }
    }
    return { records, staleCount };
  }
  async function currentEyelidContourState() {
    const records = {};
    let staleCount = 0;
    for (const [captureRef, review] of eyelidContourReviews) {
      try {
        const source = inventory.find((item) => item.recordId === captureRef);
        if (!source) {
          staleCount++;
          continue;
        }
        const digest = createHash('sha256')
          .update(await readFile(source.sourcePath))
          .digest('hex');
        if (digest !== review.sourceSha256) {
          staleCount++;
          continue;
        }
        records[captureRef] = projectEyelidContourReviewForUi(review);
      } catch {
        staleCount++;
      }
    }
    return { records, staleCount };
  }
  async function privatePhotoReadinessState() {
    const withheld = { status: 'unavailable', reason: 'PRIVATE_READINESS_NOT_CURRENT' };
    if (savedRecords.length !== ids.length || parsingSaved.length !== ids.length) return withheld;
    try {
      const metricActive = JSON.parse(await readFile(resolve(runRoot, 'active.json'), 'utf8'));
      const parsingActive = JSON.parse(await readFile(resolve(parsingRoot, 'active.json'), 'utf8'));
      if (
        !/^[a-f0-9-]{36}$/.test(metricActive.runId || '') ||
        !/^[a-f0-9-]{36}$/.test(parsingActive.runId || '') ||
        parsingActive.runId !== parsingRunId
      )
        return withheld;
      const reportFile =
        'whole-face-per-photo-readiness-v1-' +
        metricActive.runId.slice(0, 8) +
        '-' +
        parsingActive.runId.slice(0, 8) +
        '.json';
      const stored = JSON.parse(await readFile(resolve(intake, reportFile), 'utf8'));
      const previous = JSON.parse(
        await readFile(resolve(intake, 'coverage-summary-20261107.json'), 'utf8'),
      );
      const expectedKeys = previous.features?.map((f) => f.featureKey);
      if (
        !Array.isArray(expectedKeys) ||
        expectedKeys.length !== 29 ||
        previous.canonicalCalculatorMaterializedCount !== 18 ||
        previous.unresolvedCanonicalCount !== 11
      )
        return withheld;
      for (const original of inventory) {
        const digest = createHash('sha256')
          .update(await readFile(original.sourcePath))
          .digest('hex');
        if (digest !== sourceDigestByRecord.get(original.recordId)) return withheld;
      }
      const readiness = projectPrivatePhotoReadiness(stored, records, expectedKeys, {
        metric: METHOD_VERSION,
        parsing: parsingSaved[0]?.parsing?.methodVersion,
      });
      const fr294Source = await readFile(
        resolve(
          sourceDir,
          '../../../packages/face-reading/src/rgb-selfie-hard-gap-frontier-fr294.ts',
        ),
        'utf8',
      );
      return {
        ...readiness,
        fr294HardGaps: traceFr294PhotoHardGaps(fr294Source, readiness, expectedKeys),
      };
    } catch {
      return withheld;
    }
  }
  async function handle(req, res) {
    if (req.headers.host !== '127.0.0.1:' + port)
      return json(res, 403, { error: 'LOCAL_HOST_REQUIRED' });
    const url = new URL(req.url, origin);
    if (req.method === 'GET' && url.pathname === '/local-assets/instance-yunet.onnx') {
      if (!instanceModel) return json(res, 503, { error: 'INSTANCE_MODEL_UNAVAILABLE' });
      res.writeHead(200, { ...staticHeaders, 'Content-Type': 'application/octet-stream' });
      return res.end(instanceModel);
    }
    if (req.method === 'GET' && url.pathname === '/local-assets/parsing-resnet18.onnx') {
      if (!parsingModel) return json(res, 503, { error: 'PARSING_MODEL_UNAVAILABLE' });
      res.writeHead(200, { ...staticHeaders, 'Content-Type': 'application/octet-stream' });
      return res.end(parsingModel);
    }
    if (req.method === 'GET' && assets.has(url.pathname)) {
      const [path, type] = assets.get(url.pathname);
      return file(res, path, type);
    }
    if (req.method === 'GET' && url.pathname === '/') return rootPage(res, url);
    if (req.method === 'GET' && url.pathname === '/two-view')
      return file(res, resolve(sourceDir, 'review.html'), 'text/html; charset=utf-8');
    if (req.method === 'GET' && url.pathname === '/two-view/state') {
      const eyeFoldReviewState = await currentEyeFoldReviewState();
      const browReviewState = await currentBrowReviewState();
      const noseReviewState = await currentNoseReviewState();
      const earReviewState = await currentEarReviewState();
      const lipReviewState = await currentLipReviewState();
      const eyelidContourState = await currentEyelidContourState();
      let perCaptureReadiness = await privatePhotoReadinessState();
      if (perCaptureReadiness.status === 'available') {
        try {
          perCaptureReadiness = {
            ...perCaptureReadiness,
            fr294HumanEvidence: traceFr294HumanEvidenceReadiness(
              perCaptureReadiness.fr294HardGaps,
              records,
              eyeFoldReviewState.records,
              eyelidContourState.records,
              earReviewState.records,
              {
                eyeFold: {
                  staleCount: eyeFoldReviewState.staleCount,
                  restoreFailed: eyeFoldReviewRestoreFailed,
                },
                eyelidContour: {
                  staleCount: eyelidContourState.staleCount,
                  restoreFailed: eyelidContourRestoreFailed,
                },
                ear: {
                  staleCount: earReviewState.staleCount,
                  restoreFailed: earReviewRestoreFailed,
                },
              },
            ),
          };
        } catch {
          perCaptureReadiness = {
            ...perCaptureReadiness,
            fr294HumanEvidence: {
              status: 'withheld',
              reason: 'HUMAN_REVIEW_EVIDENCE_INVALID',
            },
          };
        }
      }
      if (perCaptureReadiness.status === 'available') {
        let pairAudit;
        if (independentPairRestoreFailed) {
          pairAudit = withheldFr294IndependentPairs('LEDGER_RESTORE_FAILED');
        } else if (perCaptureReadiness.fr294HumanEvidence?.status !== 'available') {
          pairAudit = withheldFr294IndependentPairs('HUMAN_READINESS_UNAVAILABLE');
        } else {
          try {
            // Check current bytes rather than relying on startup digests; old
            // source images can never be promoted after being replaced.
            const currentHashes = new Map(
              await Promise.all(
                inventory.map(async (item) => [
                  item.recordId,
                  {
                    sourceSha256: createHash('sha256')
                      .update(await readFile(item.sourcePath))
                      .digest('hex'),
                    viewRole: roles.get(item.recordId),
                  },
                ]),
              ),
            );
            pairAudit = auditFr294IndependentScreenReviewPairs(
              independentPairLedger,
              currentHashes,
              perCaptureReadiness.fr294HumanEvidence,
            );
          } catch {
            pairAudit = withheldFr294IndependentPairs('STALE_SOURCE_OR_INVALID_LEDGER');
          }
        }
        perCaptureReadiness = { ...perCaptureReadiness, fr294IndependentPairAudit: pairAudit };
      }
      return json(res, 200, {
        token,
        records,
        savedRecords,
        perCaptureReadiness,
        eyeFoldReviews: eyeFoldReviewState.records,
        eyeFoldReviewStaleCount: eyeFoldReviewState.staleCount,
        eyeFoldReviewRestoreFailed,
        browReviews: browReviewState.records,
        browReviewStaleCount: browReviewState.staleCount,
        browReviewRestoreFailed,
        noseReviews: noseReviewState.records,
        noseReviewStaleCount: noseReviewState.staleCount,
        noseReviewRestoreFailed,
        earReviews: earReviewState.records,
        earReviewStaleCount: earReviewState.staleCount,
        earReviewRestoreFailed,
        lipReviews: lipReviewState.records,
        lipReviewStaleCount: lipReviewState.staleCount,
        lipReviewRestoreFailed,
        eyelidContourReviews: eyelidContourState.records,
        eyelidContourStaleCount: eyelidContourState.staleCount,
        eyelidContourRestoreFailed,
        readingCatalogue: catalogue,
        parsingAvailable: Boolean(parsingModel),
        parsingRestoreFailed,
        comparisonRestoreFailed,
        parsingPrevious: parsingPrevious.map((r) => ({
          ...r,
          layers:
            r.parsing.status === 'completed'
              ? Object.fromEntries(
                  PARSING_GROUPS.map((g) => [
                    g.id,
                    `/parsing-artifact/${r.captureRef}/${g.id}.png?run=${previousRunId}`,
                  ]),
                )
              : {},
        })),
        parsingSaved: parsingSaved.map((r) => ({
          ...r,
          layers:
            r.parsing.status === 'completed'
              ? Object.fromEntries(
                  PARSING_GROUPS.map((g) => [
                    g.id,
                    `/parsing-artifact/${r.captureRef}/${g.id}.png?run=${parsingRunId}`,
                  ]),
                )
              : {},
        })),
        methodVersion: METHOD_VERSION,
        formalValidation: false,
        authorityPromoted: false,
      });
    }
    if (req.method === 'GET' && url.pathname.startsWith('/parsing-artifact/')) {
      const match = /^\/parsing-artifact\/(capture-[0-9]{2,})\/([a-z]+)\.png$/.exec(url.pathname);
      const runId = url.searchParams.get('run');
      if (
        !match ||
        !ids.includes(match[1]) ||
        !PARSING_GROUPS.some((g) => g.id === match[2]) ||
        !(
          (runId === parsingRunId &&
            parsingSaved.some(
              (r) => r.captureRef === match[1] && r.parsing.status === 'completed',
            )) ||
          (runId === previousRunId &&
            parsingPrevious.some(
              (r) => r.captureRef === match[1] && r.parsing.status === 'completed',
            ))
        )
      )
        return json(res, 404, { error: 'NOT_FOUND' });
      return file(res, resolve(parsingRoot, runId, match[1], match[2] + '.png'), 'image/png');
    }
    if (req.method === 'GET' && url.pathname.startsWith('/image/')) {
      const record = inventory.find((r) => r.recordId === url.pathname.slice(7));
      if (!record) return json(res, 404, { error: 'NOT_FOUND' });
      return file(
        res,
        record.sourcePath,
        extname(record.sourcePath).toLowerCase() === '.png'
          ? 'image/png'
          : extname(record.sourcePath).toLowerCase() === '.webp'
            ? 'image/webp'
            : 'image/jpeg',
      );
    }
    if (req.method === 'GET' && url.pathname.startsWith('/review-artifact/')) {
      const match =
        /^\/review-artifact\/(capture-[0-9]{2,})\/(full|hairline|eyes|brows|nose|mouth|oval)\.png$/.exec(
          url.pathname,
        );
      if (!match || !manifest.recordIds.includes(match[1]))
        return json(res, 404, { error: 'NOT_FOUND' });
      return file(res, resolve(render.path, match[1], match[2] + '.png'), 'image/png');
    }
    if (req.method === 'POST' && url.pathname === '/two-view/results') {
      if (req.headers.origin !== origin) return json(res, 403, { error: 'LOCAL_ORIGIN_REQUIRED' });
      const input = await requestJson(req);
      if (input.token !== token) return json(res, 403, { error: 'LOCAL_TOKEN_REQUIRED' });
      if (saving) return json(res, 409, { error: 'SAVE_IN_PROGRESS' });
      const next = validateBatch(input, ids, roles);
      saving = true;
      try {
        for (const previous of sourceFileStates) {
          const current = await stat(previous.sourcePath);
          if (
            current.size !== previous.size ||
            current.mtimeMs !== previous.mtimeMs ||
            current.ino !== previous.ino
          )
            throw Error('SOURCE_CHANGED');
        }
        const runId = randomUUID();
        await mkdir(resolve(runRoot, runId), { recursive: true });
        await writeFile(
          resolve(runRoot, runId, 'snapshot.json'),
          JSON.stringify({
            methodVersion: METHOD_VERSION,
            recordIds: ids,
            sourceFileStates,
            purpose: 'engineering_frontal_image_plane_preview',
            formalValidation: false,
            authorityPromoted: false,
          }),
          { flag: 'wx' },
        );
        await writeFile(
          resolve(runRoot, runId, 'metrics.json'),
          JSON.stringify({
            methodVersion: METHOD_VERSION,
            records: next,
            formalValidation: false,
            canonicalReceiptIssued: false,
          }),
          { flag: 'wx' },
        );
        await writeFile(resolve(runRoot, 'active.json'), JSON.stringify({ runId }));
        savedRecords = next;
        return json(res, 200, { saved: true, count: next.length, formalValidation: false });
      } finally {
        saving = false;
      }
    }
    if (req.method === 'POST' && url.pathname === '/two-view/parsing-results') {
      if (req.headers.origin !== origin) return json(res, 403, { error: 'LOCAL_ORIGIN_REQUIRED' });
      const input = await requestJson(req, 12000000);
      if (input.token !== token) return json(res, 403, { error: 'LOCAL_TOKEN_REQUIRED' });
      if (parsingSaving) return json(res, 409, { error: 'SAVE_IN_PROGRESS' });
      const next = validateParsingBatch(input, ids, roles);
      parsingSaving = true;
      try {
        for (const previous of sourceFileStates) {
          const current = await stat(previous.sourcePath);
          if (
            current.size !== previous.size ||
            current.mtimeMs !== previous.mtimeMs ||
            current.ino !== previous.ino
          )
            throw Error('SOURCE_CHANGED');
        }
        const runId = randomUUID();
        await mkdir(resolve(parsingRoot, runId), { recursive: true });
        for (const r of next) {
          await mkdir(resolve(parsingRoot, runId, r.captureRef));
          for (const [name, png] of Object.entries(r.layers))
            await writeFile(resolve(parsingRoot, runId, r.captureRef, name + '.png'), png, {
              flag: 'wx',
            });
        }
        const summary = next.map(({ captureRef, parsing }) => ({ captureRef, parsing }));
        await writeFile(
          resolve(parsingRoot, runId, 'summary.json'),
          JSON.stringify({
            methodVersion: PARSING_VERSION,
            records: summary,
            formalValidation: false,
            canonicalReceiptIssued: false,
          }),
          { flag: 'wx' },
        );
        const pendingPointer = resolve(parsingRoot, 'active-' + runId + '.tmp');
        if (previousRunId) {
          const previousPointer = resolve(parsingRoot, 'previous-' + runId + '.tmp');
          await writeFile(previousPointer, JSON.stringify({ runId: previousRunId }), {
            flag: 'wx',
          });
          await rename(previousPointer, resolve(parsingRoot, 'previous.json'));
        }
        await writeFile(pendingPointer, JSON.stringify({ runId }), { flag: 'wx' });
        await rename(pendingPointer, resolve(parsingRoot, 'active.json'));
        parsingSaved = summary;
        parsingRunId = runId;
        parsingRestoreFailed = false;
        return json(res, 200, { saved: true, count: next.length, formalValidation: false });
      } finally {
        parsingSaving = false;
      }
    }
    if (req.method === 'POST' && url.pathname === '/two-view/eyelid-contour-reviews') {
      if (req.headers.origin !== origin) return json(res, 403, { error: 'LOCAL_ORIGIN_REQUIRED' });
      const input = await requestJson(req, 160000);
      const allowed = new Set(['token', 'captureRef', 'imageLeft', 'imageRight']);
      if (
        !input ||
        typeof input !== 'object' ||
        Array.isArray(input) ||
        Object.keys(input).length !== allowed.size ||
        Object.keys(input).some((key) => !allowed.has(key))
      )
        throw Error('EYELID_CONTOUR_REVIEW_INVALID');
      if (input.token !== token) return json(res, 403, { error: 'LOCAL_TOKEN_REQUIRED' });
      if (eyelidContourSaving) return json(res, 409, { error: 'SAVE_IN_PROGRESS' });
      const captureRef = input.captureRef;
      const source = inventory.find((r) => r.recordId === captureRef);
      if (!source || roles.get(captureRef) !== 'frontal' || eyelidContourRestoreFailed)
        throw Error('EYELID_CONTOUR_REVIEW_INVALID');
      eyelidContourSaving = true;
      try {
        const initial = sourceFileStates.find((r) => r.recordId === captureRef);
        const current = await stat(source.sourcePath);
        if (
          !initial ||
          current.size !== initial.size ||
          current.mtimeMs !== initial.mtimeMs ||
          current.ino !== initial.ino
        )
          throw Error('SOURCE_CHANGED');
        const sourceSha256 = createHash('sha256')
          .update(await readFile(source.sourcePath))
          .digest('hex');
        if (sourceSha256 !== sourceDigestByRecord.get(captureRef)) throw Error('SOURCE_CHANGED');
        const previous = eyelidContourReviews.get(captureRef);
        const review = createEyelidContourReviewRecord(
          {
            imageLeft: input.imageLeft,
            imageRight: input.imageRight,
          },
          {
            captureRef,
            sourceSha256,
            revision: (previous?.revision || 0) + 1,
            reviewedAt: new Date().toISOString(),
          },
        );
        const records = Object.fromEntries(eyelidContourReviews);
        records[captureRef] = review;
        const tmp = resolve(intake, 'eyelid-contour-human-reviews-' + randomUUID() + '.tmp');
        await writeFile(
          tmp,
          JSON.stringify(
            {
              schemaVersion: EYELID_CONTOUR_REVIEW_VERSION,
              records,
            },
            null,
            2,
          ) + '\n',
          { flag: 'wx' },
        );
        await rename(tmp, eyelidContourPath);
        eyelidContourReviews.set(captureRef, review);
        return json(res, 200, { saved: true, review: projectEyelidContourReviewForUi(review) });
      } finally {
        eyelidContourSaving = false;
      }
    }
    if (req.method === 'POST' && url.pathname === '/two-view/lip-border-reviews') {
      if (req.headers.origin !== origin) return json(res, 403, { error: 'LOCAL_ORIGIN_REQUIRED' });
      const input = await requestJson(req, 160000);
      const allowed = new Set(['token', 'captureRef', ...LIP_BORDER_LINES, ...LIP_BORDER_POINTS]);
      if (
        !input ||
        typeof input !== 'object' ||
        Array.isArray(input) ||
        Object.keys(input).length !== allowed.size ||
        Object.keys(input).some((key) => !allowed.has(key))
      )
        throw Error('LIP_BORDER_REVIEW_INVALID');
      if (input.token !== token) return json(res, 403, { error: 'LOCAL_TOKEN_REQUIRED' });
      if (lipReviewSaving) return json(res, 409, { error: 'SAVE_IN_PROGRESS' });
      const captureRef = input.captureRef;
      const source = inventory.find((item) => item.recordId === captureRef);
      if (!source || roles.get(captureRef) !== 'frontal' || lipReviewRestoreFailed)
        throw Error('LIP_BORDER_REVIEW_INVALID');
      lipReviewSaving = true;
      try {
        const original = sourceFileStates.find((item) => item.recordId === captureRef);
        const current = await stat(source.sourcePath);
        if (
          !original ||
          current.size !== original.size ||
          current.mtimeMs !== original.mtimeMs ||
          current.ino !== original.ino
        )
          throw Error('SOURCE_CHANGED');
        const sourceSha256 = createHash('sha256')
          .update(await readFile(source.sourcePath))
          .digest('hex');
        if (sourceSha256 !== sourceDigestByRecord.get(captureRef)) throw Error('SOURCE_CHANGED');
        const previous = lipReviews.get(captureRef);
        const review = createLipBorderHumanReviewRecord(
          Object.fromEntries(
            [...LIP_BORDER_LINES, ...LIP_BORDER_POINTS].map((key) => [key, input[key]]),
          ),
          {
            captureRef,
            sourceSha256,
            revision: (previous?.revision || 0) + 1,
            reviewedAt: new Date().toISOString(),
          },
        );
        const records = Object.fromEntries(lipReviews);
        records[captureRef] = review;
        const temporary = resolve(intake, 'lip-border-human-reviews-' + randomUUID() + '.tmp');
        await writeFile(
          temporary,
          JSON.stringify(
            {
              schemaVersion: LIP_BORDER_REVIEW_SCHEMA_VERSION,
              records,
            },
            null,
            2,
          ) + '\n',
          { flag: 'wx' },
        );
        await rename(temporary, lipReviewPath);
        lipReviews.set(captureRef, review);
        return json(res, 200, { saved: true, review: projectLipBorderHumanReviewForUi(review) });
      } finally {
        lipReviewSaving = false;
      }
    }
    if (req.method === 'POST' && url.pathname === '/two-view/ear-detail-reviews') {
      if (req.headers.origin !== origin) return json(res, 403, { error: 'LOCAL_ORIGIN_REQUIRED' });
      const input = await requestJson(req, 160000);
      const keys = new Set(['token', 'captureRef', 'imageLeft', 'imageRight']);
      if (
        !input ||
        typeof input !== 'object' ||
        Array.isArray(input) ||
        Object.keys(input).length !== keys.size ||
        Object.keys(input).some((key) => !keys.has(key))
      )
        throw Error('EAR_DETAIL_REVIEW_INVALID');
      if (input.token !== token) return json(res, 403, { error: 'LOCAL_TOKEN_REQUIRED' });
      if (earReviewSaving) return json(res, 409, { error: 'SAVE_IN_PROGRESS' });
      const source = inventory.find((r) => r.recordId === input.captureRef);
      const viewRole = roles.get(input.captureRef);
      if (!source || !['frontal', 'profile'].includes(viewRole) || earReviewRestoreFailed)
        throw Error('EAR_DETAIL_REVIEW_INVALID');
      earReviewSaving = true;
      try {
        const start = sourceFileStates.find((r) => r.recordId === input.captureRef);
        const current = await stat(source.sourcePath);
        if (
          !start ||
          current.size !== start.size ||
          current.mtimeMs !== start.mtimeMs ||
          current.ino !== start.ino
        )
          throw Error('SOURCE_CHANGED');
        const sourceSha256 = createHash('sha256')
          .update(await readFile(source.sourcePath))
          .digest('hex');
        if (sourceSha256 !== sourceDigestByRecord.get(input.captureRef))
          throw Error('SOURCE_CHANGED');
        const previous = earReviews.get(input.captureRef);
        const review = createEarDetailReviewRecord(
          { imageLeft: input.imageLeft, imageRight: input.imageRight },
          {
            captureRef: input.captureRef,
            sourceSha256,
            viewRole,
            revision: (previous?.revision || 0) + 1,
            reviewedAt: new Date().toISOString(),
          },
        );
        const nextRecords = Object.fromEntries(earReviews);
        nextRecords[input.captureRef] = review;
        const pending = resolve(intake, 'ear-detail-human-reviews-' + randomUUID() + '.tmp');
        await writeFile(
          pending,
          JSON.stringify(
            {
              schemaVersion: EAR_DETAIL_REVIEW_SCHEMA_VERSION,
              records: nextRecords,
            },
            null,
            2,
          ) + '\n',
          { flag: 'wx' },
        );
        await rename(pending, earReviewPath);
        earReviews.set(input.captureRef, review);
        return json(res, 200, { saved: true, review: projectEarDetailReviewForUi(review) });
      } finally {
        earReviewSaving = false;
      }
    }
    if (req.method === 'POST' && url.pathname === '/two-view/nose-detail-reviews') {
      if (req.headers.origin !== origin) return json(res, 403, { error: 'LOCAL_ORIGIN_REQUIRED' });
      const input = await requestJson(req, 150000);
      const allowed = new Set(['token', 'captureRef', 'tip', ...NOSE_CONTOUR_PARTS]);
      if (
        !input ||
        typeof input !== 'object' ||
        Array.isArray(input) ||
        Object.keys(input).length !== allowed.size ||
        Object.keys(input).some((key) => !allowed.has(key))
      )
        throw Error('NOSE_DETAIL_REVIEW_INVALID');
      if (input.token !== token) return json(res, 403, { error: 'LOCAL_TOKEN_REQUIRED' });
      if (noseReviewSaving) return json(res, 409, { error: 'SAVE_IN_PROGRESS' });
      const source = inventory.find((record) => record.recordId === input.captureRef);
      if (!source || roles.get(input.captureRef) !== 'frontal' || noseReviewRestoreFailed)
        throw Error('NOSE_DETAIL_REVIEW_INVALID');
      noseReviewSaving = true;
      try {
        const initial = sourceFileStates.find((item) => item.recordId === input.captureRef);
        const current = await stat(source.sourcePath);
        if (
          !initial ||
          current.size !== initial.size ||
          current.mtimeMs !== initial.mtimeMs ||
          current.ino !== initial.ino
        )
          throw Error('SOURCE_CHANGED');
        const sourceSha256 = createHash('sha256')
          .update(await readFile(source.sourcePath))
          .digest('hex');
        if (sourceSha256 !== sourceDigestByRecord.get(input.captureRef))
          throw Error('SOURCE_CHANGED');
        const previous = noseReviews.get(input.captureRef);
        const review = createNoseDetailReviewRecord(
          {
            tip: input.tip,
            ...Object.fromEntries(NOSE_CONTOUR_PARTS.map((key) => [key, input[key]])),
          },
          {
            captureRef: input.captureRef,
            sourceSha256,
            revision: (previous?.revision || 0) + 1,
            reviewedAt: new Date().toISOString(),
          },
        );
        const records = Object.fromEntries(noseReviews);
        records[input.captureRef] = review;
        const temporary = resolve(intake, 'nose-detail-human-reviews-' + randomUUID() + '.tmp');
        await writeFile(
          temporary,
          JSON.stringify(
            {
              schemaVersion: NOSE_DETAIL_REVIEW_SCHEMA_VERSION,
              records,
            },
            null,
            2,
          ) + '\n',
          { flag: 'wx' },
        );
        await rename(temporary, noseReviewPath);
        noseReviews.set(input.captureRef, review);
        return json(res, 200, { saved: true, review: projectNoseDetailReviewForUi(review) });
      } finally {
        noseReviewSaving = false;
      }
    }
    if (req.method === 'POST' && url.pathname === '/two-view/brow-centerline-reviews') {
      if (req.headers.origin !== origin) return json(res, 403, { error: 'LOCAL_ORIGIN_REQUIRED' });
      const input = await requestJson(req, 500000);
      const allowedKeys = new Set(['token', 'captureRef', 'imageLeft', 'imageRight']);
      if (
        !input ||
        typeof input !== 'object' ||
        Array.isArray(input) ||
        Object.keys(input).some((key) => !allowedKeys.has(key))
      )
        throw Error('BROW_CENTERLINE_REVIEW_INVALID');
      if (input.token !== token) return json(res, 403, { error: 'LOCAL_TOKEN_REQUIRED' });
      if (browReviewSaving) return json(res, 409, { error: 'SAVE_IN_PROGRESS' });
      const captureRef = input.captureRef;
      const source = inventory.find((item) => item.recordId === captureRef);
      if (!source || roles.get(captureRef) !== 'frontal' || browReviewRestoreFailed)
        throw Error('BROW_CENTERLINE_REVIEW_INVALID');
      browReviewSaving = true;
      try {
        const original = sourceFileStates.find((item) => item.recordId === captureRef);
        const current = await stat(source.sourcePath);
        if (
          !original ||
          current.size !== original.size ||
          current.mtimeMs !== original.mtimeMs ||
          current.ino !== original.ino
        )
          throw Error('SOURCE_CHANGED');
        const sourceSha256 = createHash('sha256')
          .update(await readFile(source.sourcePath))
          .digest('hex');
        if (sourceSha256 !== sourceDigestByRecord.get(captureRef)) throw Error('SOURCE_CHANGED');
        const previous = browReviews.get(captureRef);
        const review = createBrowCenterlineReviewRecord(
          { imageLeft: input.imageLeft, imageRight: input.imageRight },
          {
            captureRef,
            sourceSha256,
            revision: (previous?.revision || 0) + 1,
            reviewedAt: new Date().toISOString(),
          },
        );
        const nextRecords = Object.fromEntries(browReviews);
        nextRecords[captureRef] = review;
        const tempPath = resolve(intake, 'brow-centerline-human-reviews-' + randomUUID() + '.tmp');
        await writeFile(
          tempPath,
          JSON.stringify(
            {
              schemaVersion: BROW_CENTERLINE_REVIEW_SCHEMA_VERSION,
              records: nextRecords,
            },
            null,
            2,
          ) + '\n',
          { flag: 'wx' },
        );
        await rename(tempPath, browReviewPath);
        browReviews.set(captureRef, review);
        return json(res, 200, { saved: true, review: projectBrowCenterlineReviewForUi(review) });
      } finally {
        browReviewSaving = false;
      }
    }
    if (req.method === 'POST' && url.pathname === '/two-view/eye-fold-reviews') {
      if (req.headers.origin !== origin) return json(res, 403, { error: 'LOCAL_ORIGIN_REQUIRED' });
      const input = await requestJson(req, 12000);
      const allowedKeys = new Set(['token', 'captureRef', 'imageLeft', 'imageRight']);
      if (
        !input ||
        typeof input !== 'object' ||
        Array.isArray(input) ||
        Object.keys(input).some((key) => !allowedKeys.has(key))
      )
        throw Error('EYE_FOLD_REVIEW_INVALID');
      if (input.token !== token) return json(res, 403, { error: 'LOCAL_TOKEN_REQUIRED' });
      if (eyeFoldReviewSaving) return json(res, 409, { error: 'SAVE_IN_PROGRESS' });
      const captureRef = input.captureRef;
      const source = inventory.find((item) => item.recordId === captureRef);
      if (!source || roles.get(captureRef) !== 'frontal') throw Error('EYE_FOLD_REVIEW_INVALID');
      eyeFoldReviewSaving = true;
      try {
        const original = sourceFileStates.find((item) => item.recordId === captureRef);
        const current = await stat(source.sourcePath);
        if (
          !original ||
          current.size !== original.size ||
          current.mtimeMs !== original.mtimeMs ||
          current.ino !== original.ino
        )
          throw Error('SOURCE_CHANGED');
        const sourceSha256 = createHash('sha256')
          .update(await readFile(source.sourcePath))
          .digest('hex');
        if (sourceSha256 !== sourceDigestByRecord.get(captureRef)) throw Error('SOURCE_CHANGED');
        const previous = eyeFoldReviews.get(captureRef);
        const review = createEyeFoldReviewRecord(
          { imageLeft: input.imageLeft, imageRight: input.imageRight },
          {
            captureRef,
            sourceSha256,
            revision: (previous?.revision || 0) + 1,
            reviewedAt: new Date().toISOString(),
          },
        );
        const nextRecords = Object.fromEntries(eyeFoldReviews);
        nextRecords[captureRef] = review;
        const temporaryPath = resolve(intake, 'eye-fold-human-reviews-' + randomUUID() + '.tmp');
        await writeFile(
          temporaryPath,
          JSON.stringify(
            { schemaVersion: EYE_FOLD_REVIEW_SCHEMA_VERSION, records: nextRecords },
            null,
            2,
          ) + '\n',
          { flag: 'wx' },
        );
        await rename(temporaryPath, eyeFoldReviewPath);
        eyeFoldReviews.set(captureRef, review);
        eyeFoldReviewRestoreFailed = false;
        return json(res, 200, { saved: true, review: projectEyeFoldReviewForUi(review) });
      } finally {
        eyeFoldReviewSaving = false;
      }
    }
    return json(res, 404, { error: 'NOT_FOUND' });
  }
  return http.createServer((req, res) => {
    handle(req, res).catch((error) => {
      const code = [
        'PARSING_BATCH_INVALID',
        'PARSING_SUMMARY_INVALID',
        'PARSING_LAYERS_INVALID',
        'BATCH_INVALID',
        'METRIC_INVALID',
        'EYE_FOLD_REVIEW_INVALID',
        'BROW_CENTERLINE_REVIEW_INVALID',
        'NOSE_DETAIL_REVIEW_INVALID',
        'EAR_DETAIL_REVIEW_INVALID',
        'LIP_BORDER_REVIEW_INVALID',
        'EYELID_CONTOUR_REVIEW_INVALID',
        'REQUEST_TOO_LARGE',
        'SOURCE_CHANGED',
      ].includes(error.message)
        ? error.message
        : 'LOCAL_REVIEW_FAILED';
      if (!res.headersSent) json(res, 400, { error: code });
      else res.end();
    });
  });
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.FACE_REVIEW_PORT || 8768);
  try {
    const server = await createLocalReviewServer({ port });
    server.listen(port, '127.0.0.1', () => process.stdout.write('LOCAL_TWO_VIEW_READY\n'));
    server.on('error', () => {
      process.stderr.write('LOCAL_TWO_VIEW_START_FAILED\n');
      process.exitCode = 1;
    });
  } catch {
    process.stderr.write('LOCAL_TWO_VIEW_START_FAILED\n');
    process.exitCode = 1;
  }
}
