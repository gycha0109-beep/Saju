import http from 'node:http';
import process from 'node:process';
import { Buffer } from 'node:buffer';
import { readFile, writeFile, mkdir, stat } from 'node:fs/promises';
import { resolve, dirname, extname } from 'node:path';
import { fileURLToPath, URL } from 'node:url';
import { randomUUID, randomBytes, createHash } from 'node:crypto';
import { METRIC_DEFINITIONS, METHOD_VERSION } from './frontal-metrics.mjs';

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

export function validateBatch(input, ids) {
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

async function requestJson(req) {
  let size = 0;
  const chunks = [];
  for await (const chunk of req) {
    size += chunk.length;
    if (size > 200000) throw Error('REQUEST_TOO_LARGE');
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
  const inventory = JSON.parse(await readFile(resolve(intake, 'inventory.json'), 'utf8'));
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
  const ids = [
    ...manifest.recordIds,
    ...inventory.map((r) => r.recordId).filter((id) => !manifest.recordIds.includes(id)),
  ];
  if (ids.length !== inventory.length || new Set(ids).size !== inventory.length)
    throw Error('INVENTORY_INVALID');
  const records = ids.map((captureRef) => ({
    captureRef,
    viewRole: 'frontal',
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
  let savedRecords = [],
    saving = false;
  try {
    const active = JSON.parse(await readFile(resolve(runRoot, 'active.json'), 'utf8'));
    const saved = JSON.parse(
      await readFile(resolve(runRoot, active.runId, 'metrics.json'), 'utf8'),
    );
    savedRecords = validateBatch(saved, ids);
  } catch (error) {
    if (error.code !== 'ENOENT') throw Error('PREVIOUS_METRICS_INVALID', { cause: error });
  }
  const assets = new Map(
    ['review.mjs', 'jobs.mjs', 'frontal-metrics.mjs', 'landmarks-worker.mjs'].map((name) => [
      '/two-view/' + name,
      [resolve(sourceDir, name), 'text/javascript'],
    ]),
  );
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
        methodVersion: METHOD_VERSION,
        formalValidation: false,
        authorityPromoted: false,
      });
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
      const next = validateBatch(input, ids);
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
    return json(res, 404, { error: 'NOT_FOUND' });
  }
  return http.createServer((req, res) => {
    handle(req, res).catch(() => {
      if (!res.headersSent) json(res, 400, { error: 'LOCAL_REVIEW_FAILED' });
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
