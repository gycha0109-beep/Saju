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
  PARSING_PIN,
  PARSING_GROUPS,
  validateParsingSummary,
} from './parsing-contract.mjs';
import { validateParsingBatch } from './parsing-storage.mjs';

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
  const roles = new Map(additionalInventory.map((r) => [r.recordId, r.viewRole]));
  const records = ids.map((captureRef) => ({
    captureRef,
    viewRole: roles.get(captureRef) || 'frontal',
    image: '/image/' + captureRef,
    ...(manifest.recordIds.includes(captureRef)
      ? { oldOverlay: '/review-artifact/' + captureRef + '/full.png' }
      : {}),
  }));
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
  const token = randomBytes(24).toString('hex');
  const origin = 'http://127.0.0.1:' + port;
  const runRoot = resolve(intake, 'two-view-runs');
  const parsingRoot = resolve(intake, 'parsing-runs');
  let parsingModel = null,
    parsingSaved = [],
    parsingRunId,
    parsingSaving = false;
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
    const active = JSON.parse(await readFile(resolve(parsingRoot, 'active.json'), 'utf8'));
    if (!/^[a-f0-9-]{36}$/.test(active.runId)) throw Error('PARSING_RUN_INVALID');
    const saved = JSON.parse(
      await readFile(resolve(parsingRoot, active.runId, 'summary.json'), 'utf8'),
    );
    if (saved.methodVersion !== PARSING_VERSION || !Array.isArray(saved.records))
      throw Error('PARSING_RUN_INVALID');
    restoredIds(saved);
    parsingSaved = saved.records.map((r) => ({
      captureRef: r.captureRef,
      parsing: validateParsingSummary(r.parsing),
    }));
    parsingRunId = active.runId;
  } catch (error) {
    if (error.code !== 'ENOENT') parsingRestoreFailed = true;
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
    ].map((name) => ['/two-view/' + name, [resolve(sourceDir, name), 'text/javascript']]),
  );
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
  async function handle(req, res) {
    if (req.headers.host !== '127.0.0.1:' + port)
      return json(res, 403, { error: 'LOCAL_HOST_REQUIRED' });
    const url = new URL(req.url, origin);
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
    if (req.method === 'GET' && url.pathname === '/two-view/state')
      return json(res, 200, {
        token,
        records,
        savedRecords,
        parsingAvailable: Boolean(parsingModel),
        parsingRestoreFailed,
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
    if (req.method === 'GET' && url.pathname.startsWith('/parsing-artifact/')) {
      const match = /^\/parsing-artifact\/(capture-[0-9]{2,})\/([a-z]+)\.png$/.exec(url.pathname);
      const runId = url.searchParams.get('run');
      if (
        !match ||
        !ids.includes(match[1]) ||
        !PARSING_GROUPS.some((g) => g.id === match[2]) ||
        runId !== parsingRunId ||
        !parsingSaved.some((r) => r.captureRef === match[1] && r.parsing.status === 'completed')
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
      const next = validateParsingBatch(input, ids);
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
