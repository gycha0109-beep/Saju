import { Buffer } from 'node:buffer';
import { createHash } from 'node:crypto';
import process from 'node:process';
import { createServer } from 'node:http';
import { inflateRawSync } from 'node:zlib';
import { mkdtemp, mkdir, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, extname, join, normalize, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn, spawnSync } from 'node:child_process';

import {
  FR200_FACE_OVAL_VERTICES,
  FR200_LEFT_EYE_VERTICES,
  FR200_RIGHT_EYE_VERTICES,
} from '../.face-reading-dist/face-reading-mediapipe-midface-envelope-fr200.js';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const ZIP_URL = 'https://osf.io/download/ym24q/';
const MODEL_URL =
  'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task';
const PACKAGE_VERSION = '0.10.35';
const EXPECTED_PACKAGE_BUNDLE_DIGEST =
  'sha256:55d7ab624fbb70dcc5adc4ae6d7ea9cfcb569139d3dbfbf2b1deafcb966bc0fe';
const EXPECTED_MODEL_DIGEST =
  'sha256:64184e229b263107bc2b804c6625db1341ff2bb731874b0bcc2fe6544e0bc9ff';
const FROZEN_FULL_OVAL_FACTOR = 0.8185802384926992;
const CDP_PORT = 9227;
const RENDER_SIZE = 768;
const HOLDOUT_SUBJECTS = Object.freeze(
  Array.from({ length: 98 }, (_, index) => `ast${String(index + 1).padStart(3, '0')}`),
);
const CLIP_FILLS = Object.freeze([1.2, 1.0, 0.85, 1.5]);
const ASTFACE_LANDMARK_ID_84 = Object.freeze([
  21,25,35,31,83,40,41,43,4,3,1,0,7,5,8,9,11,12,13,15,
  60,49,50,51,52,53,64,55,57,59,61,62,63,65,66,67,
]);
const ASTFACE_CROPPED_BFM_KEYPOINT_ZERO_INDICES = Object.freeze([
  25370,26744,27483,28862,8192,6515,8204,9883,2215,3886,4920,5828,
  4801,3640,10455,11353,12383,14066,12653,11492,5522,6025,7495,8215,
  8935,10395,10795,9555,8236,6915,7384,8223,9064,8829,8229,7629,
]);

const sha256 = (bytes) =>
  `sha256:${createHash('sha256').update(bytes).digest('hex')}`;

async function download(url, path) {
  const response = await globalThis.fetch(url, {
    redirect: 'follow',
    headers: { 'user-agent': 'myeongha-fr205a-render-pilot' },
    signal: globalThis.AbortSignal.timeout(120000),
  });
  if (!response.ok) throw new Error(`FR205A download failed ${response.status}: ${url}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  if (path) await writeFile(path, bytes);
  return bytes;
}

async function fetchRange(start, end) {
  const response = await globalThis.fetch(ZIP_URL, {
    redirect: 'follow',
    headers: {
      Range: `bytes=${start}-${end}`,
      'user-agent': 'myeongha-fr205a-render-pilot',
    },
    signal: globalThis.AbortSignal.timeout(120000),
  });
  if (!(response.status === 206 || response.status === 200)) {
    throw new Error(`FR205A range fetch failed ${response.status}`);
  }
  return {
    bytes: Buffer.from(await response.arrayBuffer()),
    contentRange: response.headers.get('content-range'),
    contentLength: response.headers.get('content-length'),
  };
}

async function discoverZipSize() {
  const probe = await fetchRange(0, 0);
  const match = probe.contentRange?.match(/bytes\s+\d+-\d+\/(\d+)/u);
  if (match) return Number(match[1]);
  const length = Number(probe.contentLength);
  if (Number.isFinite(length) && length > 1) return length;
  throw new Error('FR205A could not determine public archive size.');
}

function findLastSignature(buffer, signature) {
  for (let offset = buffer.length - 4; offset >= 0; offset -= 1) {
    if (buffer.readUInt32LE(offset) === signature) return offset;
  }
  return -1;
}

async function readCentralDirectory() {
  const size = await discoverZipSize();
  const tailStart = Math.max(0, size - 128 * 1024);
  const tail = await fetchRange(tailStart, size - 1);
  const eocd = findLastSignature(tail.bytes, 0x06054b50);
  if (eocd < 0) throw new Error('FR205A EOCD missing.');
  const entryCount = tail.bytes.readUInt16LE(eocd + 10);
  const centralSize = tail.bytes.readUInt32LE(eocd + 12);
  const centralOffset = tail.bytes.readUInt32LE(eocd + 16);
  const central = await fetchRange(centralOffset, centralOffset + centralSize - 1);
  const entries = [];
  let cursor = 0;
  while (cursor < central.bytes.length) {
    if (central.bytes.readUInt32LE(cursor) !== 0x02014b50) {
      throw new Error(`FR205A bad central signature at ${cursor}`);
    }
    const flags = central.bytes.readUInt16LE(cursor + 8);
    const compressionMethod = central.bytes.readUInt16LE(cursor + 10);
    const compressedSize = central.bytes.readUInt32LE(cursor + 20);
    const uncompressedSize = central.bytes.readUInt32LE(cursor + 24);
    const nameLength = central.bytes.readUInt16LE(cursor + 28);
    const extraLength = central.bytes.readUInt16LE(cursor + 30);
    const commentLength = central.bytes.readUInt16LE(cursor + 32);
    const localHeaderOffset = central.bytes.readUInt32LE(cursor + 42);
    const nameStart = cursor + 46;
    const name = central.bytes.subarray(nameStart, nameStart + nameLength).toString('utf8');
    entries.push({
      name,
      flags,
      compressionMethod,
      compressedSize,
      uncompressedSize,
      localHeaderOffset,
    });
    cursor = nameStart + nameLength + extraLength + commentLength;
  }
  if (entries.length !== entryCount) {
    throw new Error(`FR205A central count mismatch ${entries.length}/${entryCount}`);
  }
  return entries;
}

async function extractEntry(entry) {
  const header = await fetchRange(entry.localHeaderOffset, entry.localHeaderOffset + 29);
  if (header.bytes.readUInt32LE(0) !== 0x04034b50) {
    throw new Error(`FR205A local header missing for ${entry.name}`);
  }
  const nameLength = header.bytes.readUInt16LE(26);
  const extraLength = header.bytes.readUInt16LE(28);
  const start = entry.localHeaderOffset + 30 + nameLength + extraLength;
  const compressed = await fetchRange(start, start + entry.compressedSize - 1);
  const bytes =
    entry.compressionMethod === 0
      ? compressed.bytes
      : entry.compressionMethod === 8
        ? inflateRawSync(compressed.bytes)
        : null;
  if (!bytes) {
    throw new Error(
      `FR205A unsupported compression ${entry.compressionMethod} for ${entry.name}`,
    );
  }
  if (bytes.length !== entry.uncompressedSize) {
    throw new Error(
      `FR205A extracted size mismatch ${bytes.length}/${entry.uncompressedSize}`,
    );
  }
  return bytes;
}

function parseMeshVertices(objText) {
  return objText
    .split(/\r?\n/u)
    .filter((line) => line.startsWith('v '))
    .map((line) => {
      const parts = line.trim().split(/\s+/u);
      return [Number(parts[1]), Number(parts[2]), Number(parts[3])];
    });
}

function solveLinear4(matrix, vector) {
  const a = matrix.map((row, index) => [...row, vector[index]]);
  for (let col = 0; col < 4; col += 1) {
    let pivot = col;
    for (let row = col + 1; row < 4; row += 1) {
      if (Math.abs(a[row][col]) > Math.abs(a[pivot][col])) pivot = row;
    }
    if (Math.abs(a[pivot][col]) < 1e-12) throw new Error('FR205A singular frame fit.');
    [a[col], a[pivot]] = [a[pivot], a[col]];
    const divisor = a[col][col];
    for (let k = col; k <= 4; k += 1) a[col][k] /= divisor;
    for (let row = 0; row < 4; row += 1) {
      if (row === col) continue;
      const factor = a[row][col];
      for (let k = col; k <= 4; k += 1) a[row][k] -= factor * a[col][k];
    }
  }
  return a.map((row) => row[4]);
}

function fitAffineFrame(source, target) {
  if (source.length !== target.length || source.length < 4) {
    throw new Error('FR205A frame fit requires corresponding point sets.');
  }
  const ata = Array.from({ length: 4 }, () => Array(4).fill(0));
  const atb = Array.from({ length: 3 }, () => Array(4).fill(0));
  for (let index = 0; index < source.length; index += 1) {
    const row = [source[index][0], source[index][1], source[index][2], 1];
    for (let r = 0; r < 4; r += 1) {
      for (let col = 0; col < 4; col += 1) ata[r][col] += row[r] * row[col];
      for (let axis = 0; axis < 3; axis += 1) {
        atb[axis][r] += row[r] * target[index][axis];
      }
    }
  }
  const coeff = atb.map((vector) =>
    solveLinear4(ata.map((row) => [...row]), vector),
  );
  const transform = (point) =>
    coeff.map(
      (axis) =>
        axis[0] * point[0] +
        axis[1] * point[1] +
        axis[2] * point[2] +
        axis[3],
    );
  const residuals = source.map((point, index) => {
    const out = transform(point);
    const expected = target[index];
    return Math.hypot(
      out[0] - expected[0],
      out[1] - expected[1],
      out[2] - expected[2],
    );
  });
  return {
    coeff,
    transform,
    rmse: Math.sqrt(
      residuals.reduce((sum, value) => sum + value * value, 0) / residuals.length,
    ),
    maxResidual: Math.max(...residuals),
  };
}

function findChrome() {
  for (const candidate of [
    process.env.CHROME_BIN,
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
  ].filter(Boolean)) {
    const probe = spawnSync(candidate, ['--version'], { encoding: 'utf8' });
    if (probe.status === 0) {
      return { path: candidate, version: probe.stdout.trim() || probe.stderr.trim() };
    }
  }
  throw new Error('FR205A requires Chrome/Chromium.');
}

function mime(path) {
  switch (extname(path)) {
    case '.html': return 'text/html; charset=utf-8';
    case '.js':
    case '.mjs': return 'text/javascript; charset=utf-8';
    case '.wasm': return 'application/wasm';
    case '.obj': return 'text/plain; charset=utf-8';
    case '.task': return 'application/octet-stream';
    default: return 'application/octet-stream';
  }
}

const delay = (ms) =>
  new Promise((resolvePromise) => globalThis.setTimeout(resolvePromise, ms));

async function waitForPageTarget(pageUrl) {
  const deadline = Date.now() + 15000;
  while (Date.now() < deadline) {
    try {
      const response = await globalThis.fetch(`http://127.0.0.1:${CDP_PORT}/json/list`);
      if (response.ok) {
        const targets = await response.json();
        const target = targets.find(
          (entry) => entry.type === 'page' && entry.url === pageUrl,
        );
        if (target?.webSocketDebuggerUrl) return target.webSocketDebuggerUrl;
      }
    } catch {
      // Chrome not ready.
    }
    await delay(100);
  }
  throw new Error('FR205A could not discover Chrome DevTools target.');
}

async function connectCdp(wsUrl) {
  const ws = new globalThis.WebSocket(wsUrl);
  await new Promise((resolvePromise, rejectPromise) => {
    ws.addEventListener('open', resolvePromise, { once: true });
    ws.addEventListener(
      'error',
      () => rejectPromise(new Error('FR205A CDP connection failed.')),
      { once: true },
    );
  });
  let nextId = 1;
  const pending = new Map();
  ws.addEventListener('message', (event) => {
    const message = JSON.parse(String(event.data));
    if (message.id === undefined) return;
    const waiter = pending.get(message.id);
    if (!waiter) return;
    pending.delete(message.id);
    if (message.error) waiter.reject(new Error(JSON.stringify(message.error)));
    else waiter.resolve(message.result);
  });
  const command = (method, params = {}) => {
    const id = nextId++;
    return new Promise((resolvePromise, rejectPromise) => {
      pending.set(id, { resolve: resolvePromise, reject: rejectPromise });
      ws.send(JSON.stringify({ id, method, params }));
    });
  };
  await command('Runtime.enable');
  return { ws, command };
}

function summarize(values) {
  const finite = values.filter(Number.isFinite);
  if (!finite.length) return null;
  const sorted = [...finite].sort((a, b) => a - b);
  const mean = finite.reduce((sum, value) => sum + value, 0) / finite.length;
  const median =
    sorted.length % 2 === 1
      ? sorted[Math.floor(sorted.length / 2)]
      : (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2;
  return {
    count: finite.length,
    mean,
    median,
    min: Math.min(...finite),
    max: Math.max(...finite),
  };
}

function pearson(xs, ys) {
  if (xs.length !== ys.length || xs.length < 2) return null;
  const mx = xs.reduce((sum, value) => sum + value, 0) / xs.length;
  const my = ys.reduce((sum, value) => sum + value, 0) / ys.length;
  let numerator = 0;
  let dx = 0;
  let dy = 0;
  for (let index = 0; index < xs.length; index += 1) {
    const x = xs[index] - mx;
    const y = ys[index] - my;
    numerator += x * y;
    dx += x * x;
    dy += y * y;
  }
  return dx === 0 || dy === 0 ? null : numerator / Math.sqrt(dx * dy);
}

function ranks(values) {
  const ordered = values
    .map((value, index) => ({ value, index }))
    .sort((a, b) => a.value - b.value || a.index - b.index);
  const result = new Array(values.length);
  let cursor = 0;
  while (cursor < ordered.length) {
    let end = cursor + 1;
    while (end < ordered.length && ordered[end].value === ordered[cursor].value) end += 1;
    const average = (cursor + 1 + end) / 2;
    for (let index = cursor; index < end; index += 1) {
      result[ordered[index].index] = average;
    }
    cursor = end;
  }
  return result;
}

function spearman(xs, ys) {
  return pearson(ranks(xs), ranks(ys));
}

async function main() {
  const bundlePath = fileURLToPath(import.meta.resolve('@mediapipe/tasks-vision'));
  const packageRoot = dirname(bundlePath);
  const packageJson = JSON.parse(await readFile(join(packageRoot, 'package.json'), 'utf8'));
  if (packageJson.version !== PACKAGE_VERSION) {
    throw new Error(`FR205A package drift: ${packageJson.version}`);
  }
  if (sha256(await readFile(bundlePath)) !== EXPECTED_PACKAGE_BUNDLE_DIGEST) {
    throw new Error('FR205A package bundle digest drift.');
  }
  const wasmDir = join(packageRoot, 'wasm');
  for (const name of await readdir(wasmDir)) {
    if (!(await stat(join(wasmDir, name))).isFile()) {
      throw new Error(`FR205A unexpected WASM entry: ${name}`);
    }
  }

  const scratch = await mkdtemp(join(tmpdir(), 'myeongha-fr205a-full-'));
  try {
    const modelPath = join(scratch, 'face_landmarker.task');
    const modelBytes = await download(MODEL_URL, modelPath);
    if (sha256(modelBytes) !== EXPECTED_MODEL_DIGEST) {
      throw new Error('FR205A model digest drift.');
    }

    const entries = await readCentralDirectory();
    const byName = new Map(entries.map((entry) => [entry.name, entry]));
    const assetDir = join(scratch, 'assets');
    await mkdir(assetDir);

    const inputs = [];
    const referenceFailures = [];
    for (const subject of HOLDOUT_SUBJECTS) {
      const meshName =
        `ASTFace_Public/${subject}/Standardized Meshes/${subject}_au0.obj`;
      const landmarkName =
        `ASTFace_Public/${subject}/landmarks/${subject}_au0.txt`;
      const meshEntry = byName.get(meshName);
      const landmarkEntry = byName.get(landmarkName);
      if (!meshEntry || !landmarkEntry) {
        referenceFailures.push({ subject, error: 'missing AU0 public pair' });
        continue;
      }
      try {
        const [meshBytes, landmarkBytes] = await Promise.all([
          extractEntry(meshEntry),
          extractEntry(landmarkEntry),
        ]);
        const objText = meshBytes.toString('utf8');
        const meshVertices = parseMeshVertices(objText);
        const landmarkPoints = landmarkBytes
          .toString('utf8')
          .split(/\r?\n/u)
          .map((line) => line.trim())
          .filter(Boolean)
          .map((line) => line.split(/\s+/u).map(Number));
        if (
          landmarkPoints.length !== 84 ||
          !landmarkPoints.every(
            (point) => point.length === 3 && point.every(Number.isFinite),
          )
        ) {
          throw new Error(`expected 84 finite AST-Face XYZ landmarks, got ${landmarkPoints.length}`);
        }
        const source36 = ASTFACE_LANDMARK_ID_84.map((index) => landmarkPoints[index]);
        const target36 = ASTFACE_CROPPED_BFM_KEYPOINT_ZERO_INDICES.map((index) => {
          const point = meshVertices[index];
          if (!point) throw new Error(`missing cropped BFM keypoint vertex ${index}`);
          return point;
        });
        const frameFit = fitAffineFrame(source36, target36);
        const transformed84 = landmarkPoints.map(frameFit.transform);
        const orderedByX = transformed84
          .map(([x, y, z], index) => ({ x, y, z, index }))
          .sort((a, b) => a.x - b.x || a.index - b.index);
        const left = orderedByX[0];
        const right = orderedByX.at(-1);
        if (!left || !right || !(right.x > left.x)) {
          throw new Error('AST-Face frame-aligned 84-point X-span reference is invalid.');
        }
        const meshXs = meshVertices.map((point) => point[0]);
        const meshYs = meshVertices.map((point) => point[1]);
        const meshZs = meshVertices.map((point) => point[2]);
        const meshSpan = Math.max(
          Math.max(...meshXs) - Math.min(...meshXs),
          Math.max(...meshYs) - Math.min(...meshYs),
          Math.max(...meshZs) - Math.min(...meshZs),
        );
        const objPath = join(assetDir, `${subject}.obj`);
        await writeFile(objPath, meshBytes);
        inputs.push({
          subject,
          objPath: `/assets/${subject}.obj`,
          objDigest: sha256(meshBytes),
          landmarkDigest: sha256(landmarkBytes),
          breadthReference: {
            method: 'astface_84_landmark_full_x_span_after_frozen_bfm_frame_alignment',
            frameAlignment: {
              mappingConvention: 'bfm_landmark_index_plus1_then_cut_bfm',
              correspondenceCount: 36,
              affineRmse: frameFit.rmse,
              normalizedAffineRmse: frameFit.rmse / meshSpan,
              maxResidual: frameFit.maxResidual,
              coeff: frameFit.coeff,
            },
            left,
            right,
            sourcePointCount: landmarkPoints.length,
          },
        });
      } catch (error) {
        referenceFailures.push({
          subject,
          error: error instanceof Error ? error.message : String(error),
        });
      }
    }

    const server = createServer(async (req, res) => {
      try {
        const url = new globalThis.URL(req.url ?? '/', 'http://127.0.0.1');
        let path;
        if (url.pathname === '/fr205a.html') path = null;
        else if (url.pathname === '/vendor/vision_bundle.mjs') path = bundlePath;
        else if (url.pathname.startsWith('/vendor/wasm/')) {
          path = join(wasmDir, url.pathname.slice('/vendor/wasm/'.length));
        } else if (url.pathname === '/assets/face_landmarker.task') path = modelPath;
        else if (url.pathname.startsWith('/assets/')) {
          path = join(assetDir, url.pathname.slice('/assets/'.length));
        } else {
          res.writeHead(404);
          res.end('not found');
          return;
        }
        if (path === null) {
          res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
          res.end('<!doctype html><html><body>FR205A</body></html>');
          return;
        }
        const safe = normalize(path);
        const allowed = [packageRoot, scratch].some(
          (prefix) => safe === prefix || safe.startsWith(prefix + '/'),
        );
        if (!allowed) throw new Error(`FR205A refusing path: ${safe}`);
        res.writeHead(200, { 'content-type': mime(safe), 'cache-control': 'no-store' });
        res.end(await readFile(safe));
      } catch (error) {
        res.writeHead(500, { 'content-type': 'text/plain; charset=utf-8' });
        res.end(error instanceof Error ? error.stack ?? error.message : String(error));
      }
    });
    await new Promise((resolvePromise, rejectPromise) => {
      server.once('error', rejectPromise);
      server.listen(0, '127.0.0.1', resolvePromise);
    });

    let child;
    let cdp;
    try {
      const address = server.address();
      if (!address || typeof address === 'string') {
        throw new Error('FR205A server has no port.');
      }
      const pageUrl = `http://127.0.0.1:${address.port}/fr205a.html`;
      const browserOrigin = `http://127.0.0.1:${address.port}`;
      const chrome = findChrome();
      child = spawn(
        chrome.path,
        [
          '--headless=new',
          '--no-sandbox',
          '--disable-dev-shm-usage',
          '--disable-background-networking',
          '--disable-component-update',
          '--disable-default-apps',
          '--disable-extensions',
          '--no-first-run',
          '--use-gl=angle',
          '--use-angle=swiftshader',
          '--enable-unsafe-swiftshader',
          `--remote-debugging-port=${CDP_PORT}`,
          '--remote-allow-origins=*',
          `--user-data-dir=${join(scratch, 'chrome-profile')}`,
          pageUrl,
        ],
        { stdio: ['ignore', 'ignore', 'pipe'] },
      );

      const wsUrl = await waitForPageTarget(pageUrl);
      cdp = await connectCdp(wsUrl);
      const expression = `
(async () => {
  const browserOrigin = ${JSON.stringify(browserOrigin)};
  const vision = await import(browserOrigin + '/vendor/vision_bundle.mjs');
  const inputs = ${JSON.stringify(inputs)};
  const renderSize = ${RENDER_SIZE};
  const faceOvalVertices = ${JSON.stringify(FR200_FACE_OVAL_VERTICES)};
  const leftEyeVertices = ${JSON.stringify(FR200_LEFT_EYE_VERTICES)};
  const rightEyeVertices = ${JSON.stringify(FR200_RIGHT_EYE_VERTICES)};

  const objIndex = (raw, length) => {
    const value = Number(raw);
    if (!Number.isInteger(value) || value === 0) throw new Error('invalid OBJ index');
    return value > 0 ? value - 1 : length + value;
  };

  const parseObj = (text) => {
    const positions = [];
    const triangles = [];
    for (const rawLine of text.split(/\\r?\\n/)) {
      const line = rawLine.trim();
      if (line.startsWith('v ')) {
        const parts = line.split(/\\s+/);
        positions.push([Number(parts[1]), Number(parts[2]), Number(parts[3])]);
      } else if (line.startsWith('f ')) {
        const refs = line.split(/\\s+/).slice(1).map((token) =>
          objIndex(token.split('/')[0], positions.length)
        );
        for (let ordinal = 1; ordinal + 1 < refs.length; ordinal += 1) {
          triangles.push(refs[0], refs[ordinal], refs[ordinal + 1]);
        }
      }
    }
    if (!positions.length || !triangles.length) {
      throw new Error('FR205A OBJ lacks triangle geometry.');
    }
    const normals = Array.from({ length: positions.length }, () => [0, 0, 0]);
    for (let index = 0; index < triangles.length; index += 3) {
      const ia = triangles[index];
      const ib = triangles[index + 1];
      const ic = triangles[index + 2];
      const a = positions[ia];
      const b = positions[ib];
      const c = positions[ic];
      const ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
      const vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
      const nx = uy * vz - uz * vy;
      const ny = uz * vx - ux * vz;
      const nz = ux * vy - uy * vx;
      for (const vi of [ia, ib, ic]) {
        normals[vi][0] += nx;
        normals[vi][1] += ny;
        normals[vi][2] += nz;
      }
    }
    for (const normal of normals) {
      const length = Math.hypot(normal[0], normal[1], normal[2]) || 1;
      normal[0] /= length;
      normal[1] /= length;
      normal[2] /= length;
    }
    const interleaved = new Float32Array(triangles.length * 6);
    for (let index = 0; index < triangles.length; index += 1) {
      const vi = triangles[index];
      const p = positions[vi];
      const n = normals[vi];
      const offset = index * 6;
      interleaved[offset] = p[0];
      interleaved[offset + 1] = p[1];
      interleaved[offset + 2] = p[2];
      interleaved[offset + 3] = n[0];
      interleaved[offset + 4] = n[1];
      interleaved[offset + 5] = n[2];
    }
    const xs = positions.map((p) => p[0]);
    const ys = positions.map((p) => p[1]);
    const zs = positions.map((p) => p[2]);
    return {
      interleaved,
      vertexCount: triangles.length,
      bounds: {
        minX: Math.min(...xs), maxX: Math.max(...xs),
        minY: Math.min(...ys), maxY: Math.max(...ys),
        minZ: Math.min(...zs), maxZ: Math.max(...zs),
      },
    };
  };

  const compile = (gl, type, source) => {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      throw new Error(gl.getShaderInfoLog(shader));
    }
    return shader;
  };

  const createRenderer = () => {
    const canvas = document.createElement('canvas');
    canvas.width = renderSize;
    canvas.height = renderSize;
    const gl = canvas.getContext('webgl2', {
      alpha: false,
      antialias: true,
      depth: true,
      preserveDrawingBuffer: true,
    });
    if (!gl) throw new Error('FR205A WebGL2 unavailable.');
    const vertexSource = [
      '#version 300 es',
      'precision highp float;',
      'in vec3 aPosition;',
      'in vec3 aNormal;',
      'uniform vec2 uCenter;',
      'uniform float uScale;',
      'uniform float uZMid;',
      'uniform float uZHalf;',
      'uniform float uCameraSign;',
      'uniform float uYSign;',
      'uniform float uXSign;',
      'out vec3 vNormal;',
      'void main() {',
      '  float zNorm = (aPosition.z - uZMid) / uZHalf;',
      '  gl_Position = vec4(',
      '    (aPosition.x - uCenter.x) * uScale * uXSign,',
      '    (aPosition.y - uCenter.y) * uScale * uYSign,',
      '    -uCameraSign * zNorm,',
      '    1.0',
      '  );',
      '  vNormal = normalize(vec3(aNormal.x * uXSign, aNormal.y * uYSign, aNormal.z * uCameraSign));',
      '}',
    ].join('\\n');
    const fragmentSource = [
      '#version 300 es',
      'precision highp float;',
      'in vec3 vNormal;',
      'uniform vec3 uBaseColor;',
      'uniform vec3 uLightDir;',
      'out vec4 outColor;',
      'void main() {',
      '  vec3 n = normalize(vNormal);',
      '  float diffuse = abs(dot(n, normalize(uLightDir)));',
      '  float side = 0.5 + 0.5 * n.x;',
      '  float intensity = 0.28 + 0.58 * diffuse + 0.14 * side;',
      '  outColor = vec4(clamp(uBaseColor * intensity, 0.0, 1.0), 1.0);',
      '}',
    ].join('\\n');
    const program = gl.createProgram();
    gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, vertexSource));
    gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, fragmentSource));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(program));
    }
    return { canvas, gl, program };
  };

  const render = (parsed, variant) => {
    const { canvas, gl, program } = createRenderer();
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(variant.background, variant.background, variant.background, 1);
    gl.clearDepth(1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LESS);
    gl.disable(gl.CULL_FACE);
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, parsed.interleaved, gl.STATIC_DRAW);
    const stride = 6 * 4;
    const positionLocation = gl.getAttribLocation(program, 'aPosition');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, stride, 0);
    const normalLocation = gl.getAttribLocation(program, 'aNormal');
    gl.enableVertexAttribArray(normalLocation);
    gl.vertexAttribPointer(normalLocation, 3, gl.FLOAT, false, stride, 3 * 4);

    const b = parsed.bounds;
    const spanX = b.maxX - b.minX;
    const spanY = b.maxY - b.minY;
    const spanZ = b.maxZ - b.minZ;
    const centerX = (b.minX + b.maxX) / 2;
    const centerY = (b.minY + b.maxY) / 2;
    const scale = variant.clipFill / Math.max(spanX, spanY);
    gl.uniform2f(gl.getUniformLocation(program, 'uCenter'), centerX, centerY);
    gl.uniform1f(gl.getUniformLocation(program, 'uScale'), scale);
    gl.uniform1f(gl.getUniformLocation(program, 'uZMid'), (b.minZ + b.maxZ) / 2);
    gl.uniform1f(gl.getUniformLocation(program, 'uZHalf'), spanZ / 2);
    gl.uniform1f(gl.getUniformLocation(program, 'uCameraSign'), variant.cameraSign);
    gl.uniform1f(gl.getUniformLocation(program, 'uYSign'), variant.ySign);
    gl.uniform1f(gl.getUniformLocation(program, 'uXSign'), variant.xSign);
    gl.uniform3f(
      gl.getUniformLocation(program, 'uBaseColor'),
      variant.baseColor[0],
      variant.baseColor[1],
      variant.baseColor[2],
    );
    gl.uniform3f(
      gl.getUniformLocation(program, 'uLightDir'),
      variant.lightDir[0],
      variant.lightDir[1],
      variant.lightDir[2],
    );

    gl.drawArrays(gl.TRIANGLES, 0, parsed.vertexCount);
    gl.finish();
    return {
      canvas,
      projection: {
        screenPoint: (point) => ({
          x: (((point.x - centerX) * scale * variant.xSign) + 1) / 2,
          y: 1 - ((((point.y - centerY) * scale * variant.ySign) + 1) / 2),
        }),
      },
      dispose: () => gl.getExtension('WEBGL_lose_context')?.loseContext(),
    };
  };

  const meanPoint = (landmarks, indices) => ({
    x: indices.reduce((sum, index) => sum + landmarks[index].x, 0) / indices.length,
    y: indices.reduce((sum, index) => sum + landmarks[index].y, 0) / indices.length,
  });

  const fullOvalWidth = (landmarks) => {
    const leftEye = meanPoint(landmarks, leftEyeVertices);
    const rightEye = meanPoint(landmarks, rightEyeVertices);
    const eyeMid = {
      x: (leftEye.x + rightEye.x) / 2,
      y: (leftEye.y + rightEye.y) / 2,
    };
    const angle = Math.atan2(leftEye.y - rightEye.y, leftEye.x - rightEye.x);
    const cosine = Math.cos(-angle);
    const sine = Math.sin(-angle);
    const xs = faceOvalVertices.map((index) => {
      const point = landmarks[index];
      const dx = point.x - eyeMid.x;
      const dy = point.y - eyeMid.y;
      return eyeMid.x + cosine * dx - sine * dy;
    });
    return Math.max(...xs) - Math.min(...xs);
  };

  const fileset = await vision.FilesetResolver.forVisionTasks(browserOrigin + '/vendor/wasm');
  const landmarker = await vision.FaceLandmarker.createFromOptions(fileset, {
    baseOptions: { modelAssetPath: browserOrigin + '/assets/face_landmarker.task' },
    runningMode: 'IMAGE',
    numFaces: 1,
    outputFaceBlendshapes: false,
    outputFacialTransformationMatrixes: false,
  });

  const receipts = [];
  const failures = [];
  try {
    for (const input of inputs) {
      try {
        const response = await fetch(input.objPath);
        if (!response.ok) throw new Error('FR205A OBJ fetch failed.');
        const parsed = parseObj(await response.text());
        const variants = [];
        const add = (background, baseColor, lightDir) => {
          for (const clipFill of ${JSON.stringify(CLIP_FILLS)}) {
            for (const ySign of [1, -1]) {
              for (const xSign of [1, -1]) {
                for (const cameraSign of [1, -1]) {
                  variants.push({
                    background,
                    baseColor,
                    lightDir,
                    clipFill,
                    ySign,
                    xSign,
                    cameraSign,
                  });
                }
              }
            }
          }
        };
        add(0.92, [0.82, 0.64, 0.52], [0.2, 0.1, 1.0]);
        add(0.92, [0.72, 0.58, 0.50], [-0.25, 0.1, 1.0]);
        add(0.18, [0.78, 0.62, 0.52], [0.15, -0.2, 1.0]);

        const attempts = [];
        let selected = null;
        for (const variant of variants) {
          const rendered = render(parsed, variant);
          const raw = landmarker.detect(rendered.canvas);
          attempts.push({
            variant,
            detectedFaceCount: raw.faceLandmarks.length,
          });
          if (raw.faceLandmarks.length === 1) {
            selected = { variant, rendered, raw };
            break;
          }
          rendered.dispose();
        }
        if (!selected) {
          throw new Error('FR205A no deterministic shaded render produced one face.');
        }
        const landmarks = selected.raw.faceLandmarks[0];
        if (!landmarks || landmarks.length !== 478) {
          throw new Error('FR205A provider landmark count drift.');
        }
        const projectedReference = [
          selected.rendered.projection.screenPoint(input.breadthReference.left),
          selected.rendered.projection.screenPoint(input.breadthReference.right),
        ];
        const referenceWidth = Math.abs(
          projectedReference[0].x - projectedReference[1].x,
        );
        const providerWidth = fullOvalWidth(landmarks);
        const calibratedWidth = providerWidth * ${FROZEN_FULL_OVAL_FACTOR};
        receipts.push({
          subject: input.subject,
          objDigest: input.objDigest,
          landmarkDigest: input.landmarkDigest,
          breadthReference: input.breadthReference,
          selectedVariant: selected.variant,
          attempts,
          referenceWidth,
          providerWidth,
          frozenFactor: ${FROZEN_FULL_OVAL_FACTOR},
          calibratedWidth,
          calibratedRatio: calibratedWidth / referenceWidth,
          calibratedAbsoluteRelativeError:
            Math.abs(calibratedWidth / referenceWidth - 1),
        });
        selected.rendered.dispose();
      } catch (error) {
        failures.push({
          subject: input.subject,
          error: error instanceof Error ? error.message : String(error),
        });
      }
    }
  } finally {
    landmarker.close();
  }
  return { receipts, failures };
})()`;

      const evaluation = await cdp.command('Runtime.evaluate', {
        expression,
        awaitPromise: true,
        returnByValue: true,
        timeout: 900000,
      });
      if (evaluation.exceptionDetails) {
        throw new Error(
          `FR205A browser exception: ${JSON.stringify(evaluation.exceptionDetails)}`,
        );
      }
      const result = evaluation.result?.value;
      if (!result || !Array.isArray(result.receipts) || !Array.isArray(result.failures)) {
        throw new Error('FR205A invalid browser result.');
      }

      const referenceWidths = result.receipts.map(
        (receipt) => receipt.referenceWidth,
      );
      const rawWidths = result.receipts.map(
        (receipt) => receipt.providerWidth,
      );
      const calibratedWidths = result.receipts.map(
        (receipt) => receipt.calibratedWidth,
      );
      const rawRatios = rawWidths.map(
        (value, index) => value / referenceWidths[index],
      );
      const calibratedRatios = calibratedWidths.map(
        (value, index) => value / referenceWidths[index],
      );
      const rawErrors = rawRatios.map((ratio) => Math.abs(ratio - 1));
      const calibratedErrors = calibratedRatios.map((ratio) => Math.abs(ratio - 1));
      const rawSummary = {
        ratioToReference: summarize(rawRatios),
        absoluteRelativeError: summarize(rawErrors),
        pearsonReferenceVsProvider: pearson(referenceWidths, rawWidths),
        spearmanReferenceVsProvider: spearman(referenceWidths, rawWidths),
      };
      const calibratedSummary = {
        ratioToReference: summarize(calibratedRatios),
        absoluteRelativeError: summarize(calibratedErrors),
        pearsonReferenceVsCalibrated: pearson(referenceWidths, calibratedWidths),
        spearmanReferenceVsCalibrated: spearman(referenceWidths, calibratedWidths),
      };
      const frameAlignmentSummary = summarize(
        inputs.map(
          (input) => input.breadthReference.frameAlignment.normalizedAffineRmse,
        ),
      );
      const artifact = {
        schemaVersion: 'fr205a-astface-face-breadth-full-holdout-v1',
        authorityState: 'independent_identity_synthetic_face_breadth_holdout_only',
        subjects: HOLDOUT_SUBJECTS,
        selectedCount: HOLDOUT_SUBJECTS.length,
        independentReferenceReadyCount: inputs.length,
        referenceFailures,
        providerSuccessCount: result.receipts.length,
        providerFailureCount: result.failures.length,
        providerFailures: result.failures,
        referenceDefinition:
          'AST-Face public 84-point anatomical landmark full X-span after frozen 36-correspondence BFM/cropped-mesh frame alignment; explicitly not zygion',
        frozenMeasurement:
          'roll_normalized_mediapipe_full_official_face_oval_x_envelope',
        frozenCalibrationFactor: FROZEN_FULL_OVAL_FACTOR,
        render: {
          size: RENDER_SIZE,
          geometry: 'AST-Face public AU0 standardized mesh',
          appearance: 'deterministic geometry-normal shading',
          variantSelection:
            'first exactly-one-face detection in fixed predeclared sequence; no reference width or error consulted',
        },
        frameAlignmentNormalizedRmse: frameAlignmentSummary,
        rawFullOvalSummary: rawSummary,
        calibratedFullOvalSummary: calibratedSummary,
        receipts: result.receipts,
        independentIdentitySyntheticFaceBreadthHoldoutComplete:
          inputs.length + referenceFailures.length === HOLDOUT_SUBJECTS.length &&
          result.receipts.length + result.failures.length === inputs.length,
        independentRealPhotoValidationComplete: false,
        calibrationAuthorized: false,
        productionAuthorized: false,
        commerceAuthorized: false,
      };
      const outDir = join(ROOT, 'artifacts', 'face-reading');
      await mkdir(outDir, { recursive: true });
      await writeFile(
        join(outDir, 'fr205a-astface-face-breadth-full-holdout.json'),
        `${JSON.stringify(artifact, null, 2)}\n`,
        'utf8',
      );
      globalThis.console.log(
        JSON.stringify({
          status: artifact.independentIdentitySyntheticFaceBreadthHoldoutComplete
            ? 'holdout_complete'
            : 'holdout_partial',
          selectedCount: artifact.selectedCount,
          independentReferenceReadyCount: artifact.independentReferenceReadyCount,
          referenceFailureCount: artifact.referenceFailures.length,
          providerSuccessCount: artifact.providerSuccessCount,
          providerFailureCount: artifact.providerFailureCount,
          frameAlignmentNormalizedRmse: artifact.frameAlignmentNormalizedRmse,
          rawFullOvalSummary: artifact.rawFullOvalSummary,
          calibratedFullOvalSummary: artifact.calibratedFullOvalSummary,
          failures: artifact.providerFailures,
        }),
      );
      if (!artifact.independentIdentitySyntheticFaceBreadthHoldoutComplete) {
        process.exitCode = 1;
      }
    } finally {
      if (cdp) cdp.ws.close();
      if (child && child.exitCode === null) {
        await new Promise((resolvePromise) => {
          let settled = false;
          const finish = () => {
            if (settled) return;
            settled = true;
            resolvePromise();
          };
          child.once('exit', finish);
          child.once('error', finish);
          child.kill('SIGKILL');
          globalThis.setTimeout(finish, 5000);
        });
      }
      await new Promise((resolvePromise) => server.close(resolvePromise));
    }
  } finally {
    await rm(scratch, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
}

main().catch((error) => {
  globalThis.console.error(error instanceof Error ? error.stack ?? error.message : String(error));
  process.exitCode = 1;
});
