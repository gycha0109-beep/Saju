import { Buffer } from 'node:buffer';
import { createHash } from 'node:crypto';
import process from 'node:process';
import { createServer } from 'node:http';
import { mkdtemp, mkdir, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, extname, join, normalize, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn, spawnSync } from 'node:child_process';

import {
  FR199_FEMALE_DATASET_COMMIT,
  FR199_FEMALE_DATASET_REPOSITORY,
  FR199_MALE_DATASET_COMMIT,
  FR199_MALE_DATASET_REPOSITORY,
  FR199_PUBLIC_CORPUS,
  deriveAndFreezeIndependentZygionReferenceFR199,
} from '../.face-reading-dist/face-reading-public-synthetic-zygion-correspondence-fr199.js';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const MEDIAPIPE_COMMIT = '30590fe8d3fdc57e63a0e9c5b2c0ececffb37301';
const METADATA_URL =
  `https://raw.githubusercontent.com/google-ai-edge/mediapipe/${MEDIAPIPE_COMMIT}/mediapipe/modules/face_geometry/data/geometry_pipeline_metadata_landmarks.pbtxt`;
const MODEL_URL =
  'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task';
const PACKAGE_VERSION = '0.10.35';
const EXPECTED_PACKAGE_BUNDLE_DIGEST =
  'sha256:55d7ab624fbb70dcc5adc4ae6d7ea9cfcb569139d3dbfbf2b1deafcb966bc0fe';
const EXPECTED_MODEL_DIGEST =
  'sha256:64184e229b263107bc2b804c6625db1341ff2bb731874b0bcc2fe6544e0bc9ff';
const CDP_PORT = 9226;
const RENDER_SIZE = 1024;
const CLIP_FILLS = [1.2, 1.0, 0.85, 1.5, 0.7, 1.8];

function sha256(bytes) {
  return `sha256:${createHash('sha256').update(bytes).digest('hex')}`;
}

function parseMetadata(text) {
  const values = [...text.matchAll(/vertex_buffer:\s*([-+0-9.eE]+)/g)].map((match) =>
    Number(match[1]),
  );
  if (values.length !== 468 * 5) {
    throw new Error(`FR203 expected 2340 canonical vertex-buffer values, got ${values.length}`);
  }
  const canonical = [];
  for (let index = 0; index < 468; index += 1) {
    const offset = index * 5;
    canonical.push({ x: values[offset], y: values[offset + 1], z: values[offset + 2] });
  }
  const weights = [...text.matchAll(
    /procrustes_landmark_basis\s*\{\s*landmark_id:\s*(\d+)\s*weight:\s*([-+0-9.eE]+)\s*\}/g,
  )].map((match) => ({ landmarkId: Number(match[1]), weight: Number(match[2]) }));
  if (weights.length !== 33) {
    throw new Error(`FR203 expected 33 Procrustes weights, got ${weights.length}`);
  }
  return { canonical, weights };
}

function sourceFor(sampleId) {
  const male = sampleId.startsWith('male-');
  return {
    repository: male ? FR199_MALE_DATASET_REPOSITORY : FR199_FEMALE_DATASET_REPOSITORY,
    commit: male ? FR199_MALE_DATASET_COMMIT : FR199_FEMALE_DATASET_COMMIT,
  };
}

async function download(url, path) {
  const response = await globalThis.fetch(url, {
    redirect: 'follow',
    headers: { 'user-agent': 'myeongha-fr203-same-mesh-render' },
    signal: globalThis.AbortSignal.timeout(120000),
  });
  if (!response.ok) throw new Error(`FR203 download failed ${response.status} ${url}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  if (path) await writeFile(path, bytes);
  return bytes;
}

function verifyBinding(objText, mtlText, sampleId) {
  const mtllib = objText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .find((line) => line.startsWith('mtllib '));
  const mapKd = mtlText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .find((line) => line.startsWith('map_Kd '));
  const expectedMtl = `${sampleId}.mtl`;
  const expectedTexture = `${sampleId}.jpg`;
  if (mtllib?.slice('mtllib '.length).trim() !== expectedMtl) {
    throw new Error(`FR203 OBJ/MTL binding drift for ${sampleId}: ${mtllib ?? 'missing'}`);
  }
  if (mapKd?.slice('map_Kd '.length).trim() !== expectedTexture) {
    throw new Error(`FR203 MTL/texture binding drift for ${sampleId}: ${mapKd ?? 'missing'}`);
  }
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
  throw new Error('FR203 requires Chrome/Chromium.');
}

function mime(path) {
  switch (extname(path)) {
    case '.html':
      return 'text/html; charset=utf-8';
    case '.js':
    case '.mjs':
      return 'text/javascript; charset=utf-8';
    case '.wasm':
      return 'application/wasm';
    case '.obj':
      return 'text/plain; charset=utf-8';
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.task':
      return 'application/octet-stream';
    default:
      return 'application/octet-stream';
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
      // Chrome DevTools endpoint is not ready yet.
    }
    await delay(100);
  }
  throw new Error('FR203 could not discover Chrome DevTools target.');
}

async function connectCdp(wsUrl) {
  const ws = new globalThis.WebSocket(wsUrl);
  await new Promise((resolvePromise, rejectPromise) => {
    ws.addEventListener('open', resolvePromise, { once: true });
    ws.addEventListener(
      'error',
      () => rejectPromise(new Error('FR203 CDP connection failed.')),
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
    if (message.error) {
      waiter.reject(
        new Error(`CDP ${waiter.method} failed: ${JSON.stringify(message.error)}`),
      );
    } else {
      waiter.resolve(message.result);
    }
  });
  function command(method, params = {}) {
    const id = nextId++;
    return new Promise((resolvePromise, rejectPromise) => {
      pending.set(id, {
        resolve: resolvePromise,
        reject: rejectPromise,
        method,
      });
      ws.send(JSON.stringify({ id, method, params }));
    });
  }
  await command('Runtime.enable');
  return { ws, command };
}

function frequency(values) {
  const counts = new Map();
  for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1);
  return [...counts.entries()]
    .map(([value, count]) => ({ value, count }))
    .sort((a, b) => b.count - a.count || String(a.value).localeCompare(String(b.value)));
}

function mean(values) {
  return values.length === 0
    ? null
    : values.reduce((sum, value) => sum + value, 0) / values.length;
}

function rank(values) {
  const sorted = values
    .map((value, index) => ({ value, index }))
    .sort((a, b) => a.value - b.value || a.index - b.index);
  const ranks = Array(values.length);
  let cursor = 0;
  while (cursor < sorted.length) {
    let end = cursor + 1;
    while (end < sorted.length && sorted[end].value === sorted[cursor].value) end += 1;
    const averageRank = (cursor + 1 + end) / 2;
    for (let index = cursor; index < end; index += 1) ranks[sorted[index].index] = averageRank;
    cursor = end;
  }
  return ranks;
}

function pearsonPair(entries, xKey, yKey) {
  if (entries.length < 2) return null;
  const xs = entries.map((entry) => entry[xKey]);
  const ys = entries.map((entry) => entry[yKey]);
  const mx = mean(xs);
  const my = mean(ys);
  let numerator = 0;
  let dx2 = 0;
  let dy2 = 0;
  for (let index = 0; index < entries.length; index += 1) {
    const dx = xs[index] - mx;
    const dy = ys[index] - my;
    numerator += dx * dy;
    dx2 += dx * dx;
    dy2 += dy * dy;
  }
  const denominator = Math.sqrt(dx2 * dy2);
  return denominator === 0 ? null : numerator / denominator;
}

function spearmanPair(entries, xKey, yKey) {
  if (entries.length < 2) return null;
  const xr = rank(entries.map((entry) => entry[xKey]));
  const yr = rank(entries.map((entry) => entry[yKey]));
  const ranked = entries.map((_, index) => ({ x: xr[index], y: yr[index] }));
  return pearsonPair(ranked, 'x', 'y');
}

function relativeErrorSummary(entries, key) {
  const values = entries.map((entry) => entry[key]).filter(Number.isFinite);
  const absolute = values.map(Math.abs);
  return {
    count: values.length,
    signedMean: mean(values),
    signedMedian: median(values),
    meanAbsolute: mean(absolute),
    medianAbsolute: median(absolute),
    min: values.length ? Math.min(...values) : null,
    max: values.length ? Math.max(...values) : null,
  };
}

function median(values) {
  if (values.length === 0) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 1
    ? sorted[middle]
    : (sorted[middle - 1] + sorted[middle]) / 2;
}

async function main() {
  const bundlePath = fileURLToPath(import.meta.resolve('@mediapipe/tasks-vision'));
  const packageRoot = dirname(bundlePath);
  const packageJson = JSON.parse(await readFile(join(packageRoot, 'package.json'), 'utf8'));
  if (packageJson.version !== PACKAGE_VERSION) {
    throw new Error(`FR203 package version drift: ${packageJson.version}`);
  }
  if (sha256(await readFile(bundlePath)) !== EXPECTED_PACKAGE_BUNDLE_DIGEST) {
    throw new Error('FR203 package bundle digest drift.');
  }

  const wasmDir = join(packageRoot, 'wasm');
  for (const name of await readdir(wasmDir)) {
    const path = join(wasmDir, name);
    if (!(await stat(path)).isFile()) {
      throw new Error(`FR203 unexpected non-file WASM entry: ${name}`);
    }
  }

  const metadataBytes = await download(METADATA_URL);
  const metadata = parseMetadata(metadataBytes.toString('utf8'));

  const scratch = await mkdtemp(join(tmpdir(), 'myeongha-fr203-'));
  try {
    const modelPath = join(scratch, 'face_landmarker.task');
    const modelBytes = await download(MODEL_URL, modelPath);
    if (sha256(modelBytes) !== EXPECTED_MODEL_DIGEST) {
      throw new Error('FR203 model digest drift.');
    }

    const assetDir = join(scratch, 'assets');
    await mkdir(assetDir);
    const inputs = [];
    const referenceFailures = [];

    const prepareSample = async (sampleId) => {
      const { repository, commit } = sourceFor(sampleId);
      try {
        const objPath = join(assetDir, `${sampleId}.obj`);
        const texturePath = join(assetDir, `${sampleId}.jpg`);
        const [objBytes, mtlBytes, textureBytes] = await Promise.all([
          download(
            `https://raw.githubusercontent.com/${repository}/${commit}/3D-models/${sampleId}.obj`,
            objPath,
          ),
          download(
            `https://raw.githubusercontent.com/${repository}/${commit}/3D-models/${sampleId}.mtl`,
          ),
          download(
            `https://raw.githubusercontent.com/${repository}/${commit}/3D-models/${sampleId}.jpg`,
            texturePath,
          ),
        ]);
        const objText = objBytes.toString('utf8');
        const mtlText = mtlBytes.toString('utf8');
        verifyBinding(objText, mtlText, sampleId);
        const reference = deriveAndFreezeIndependentZygionReferenceFR199({
          sampleId,
          objText,
          objDigest: sha256(objBytes),
        });
        return {
          input: {
            sampleId,
            objPath: `/assets/${sampleId}.obj`,
            texturePath: `/assets/${sampleId}.jpg`,
            objDigest: sha256(objBytes),
            textureDigest: sha256(textureBytes),
            bilateralReference: reference.bilateralReference,
          },
          failure: null,
        };
      } catch (error) {
        return {
          input: null,
          failure: {
            sampleId,
            error: error instanceof Error ? error.message : String(error),
          },
        };
      }
    };

    for (let offset = 0; offset < FR199_PUBLIC_CORPUS.length; offset += 4) {
      const batch = FR199_PUBLIC_CORPUS.slice(offset, offset + 4);
      const prepared = await Promise.all(batch.map(prepareSample));
      for (const entry of prepared) {
        if (entry.input) inputs.push(entry.input);
        if (entry.failure) referenceFailures.push(entry.failure);
      }
    }

    const server = createServer(async (req, res) => {
      try {
        const url = new globalThis.URL(req.url ?? '/', 'http://127.0.0.1');
        let path;
        if (url.pathname === '/fr203.html') path = null;
        else if (url.pathname === '/vendor/vision_bundle.mjs') path = bundlePath;
        else if (url.pathname.startsWith('/dist/')) {
          path = join(ROOT, '.face-reading-dist', url.pathname.slice('/dist/'.length));
        } else if (url.pathname.startsWith('/vendor/wasm/')) {
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
          res.writeHead(200, {
            'content-type': 'text/html; charset=utf-8',
            'cache-control': 'no-store',
          });
          res.end('<!doctype html><html><body>FR203</body></html>');
          return;
        }
        const safe = normalize(path);
        const allowed = [packageRoot, scratch, join(ROOT, '.face-reading-dist')].some(
          (prefix) => safe === prefix || safe.startsWith(prefix + '/'),
        );
        if (!allowed) throw new Error(`FR203 refusing path outside allowed roots: ${safe}`);
        res.writeHead(200, {
          'content-type': mime(safe),
          'cache-control': 'no-store',
        });
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
      if (!address || typeof address === 'string') throw new Error('FR203 server has no port.');
      const pageUrl = `http://127.0.0.1:${address.port}/fr203.html`;
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
  const [metric, envelope, vision] = await Promise.all([
    import(location.origin + '/dist/face-reading-mediapipe-metric-geometry-fr201.js'),
    import(location.origin + '/dist/face-reading-mediapipe-midface-envelope-fr200.js'),
    import(location.origin + '/vendor/vision_bundle.mjs'),
  ]);
  const inputs = ${JSON.stringify(inputs)};
  const renderSize = ${RENDER_SIZE};
  const canonical = ${JSON.stringify(metadata.canonical)};
  const weights = ${JSON.stringify(metadata.weights)};

  const objIndex = (raw, length) => {
    const value = Number(raw);
    if (!Number.isInteger(value) || value === 0) throw new Error('invalid OBJ index ' + raw);
    return value > 0 ? value - 1 : length + value;
  };

  const parseObj = (text) => {
    const positions = [];
    const texcoords = [];
    const triangles = [];
    for (const rawLine of text.split(/\\r?\\n/)) {
      const line = rawLine.trim();
      if (line.startsWith('v ')) {
        const parts = line.split(/\\s+/);
        positions.push([Number(parts[1]), Number(parts[2]), Number(parts[3])]);
      } else if (line.startsWith('vt ')) {
        const parts = line.split(/\\s+/);
        texcoords.push([Number(parts[1]), Number(parts[2])]);
      } else if (line.startsWith('f ')) {
        const refs = line.split(/\\s+/).slice(1).map((token) => {
          const parts = token.split('/');
          return {
            vi: objIndex(parts[0], positions.length),
            ti: parts[1] ? objIndex(parts[1], texcoords.length) : -1,
          };
        });
        for (let ordinal = 1; ordinal + 1 < refs.length; ordinal += 1) {
          triangles.push(refs[0], refs[ordinal], refs[ordinal + 1]);
        }
      }
    }
    if (positions.length === 0 || texcoords.length === 0 || triangles.length === 0) {
      throw new Error('FR203 OBJ lacks textured triangle geometry.');
    }
    const interleaved = new Float32Array(triangles.length * 5);
    for (let index = 0; index < triangles.length; index += 1) {
      const ref = triangles[index];
      const p = positions[ref.vi];
      const uv = texcoords[ref.ti];
      if (!p || !uv) throw new Error('FR203 face references missing position/UV.');
      const offset = index * 5;
      interleaved[offset] = p[0];
      interleaved[offset + 1] = p[1];
      interleaved[offset + 2] = p[2];
      interleaved[offset + 3] = uv[0];
      interleaved[offset + 4] = uv[1];
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
      throw new Error('FR203 shader compile failed: ' + gl.getShaderInfoLog(shader));
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
    if (!gl) throw new Error('FR203 WebGL2 unavailable.');
    const vertexSource = [
      '#version 300 es',
      'precision highp float;',
      'in vec3 aPosition;',
      'in vec2 aUv;',
      'uniform vec2 uCenter;',
      'uniform float uScale;',
      'uniform float uZMid;',
      'uniform float uZHalf;',
      'uniform float uCameraSign;',
      'uniform float uYSign;',
      'uniform float uXSign;',
      'out vec2 vUv;',
      'void main() {',
      '  float zNorm = (aPosition.z - uZMid) / uZHalf;',
      '  gl_Position = vec4(',
      '    (aPosition.x - uCenter.x) * uScale * uXSign,',
      '    (aPosition.y - uCenter.y) * uScale * uYSign,',
      '    -uCameraSign * zNorm,',
      '    1.0',
      '  );',
      '  vUv = aUv;',
      '}',
    ].join('\\n');
    const fragmentSource = [
      '#version 300 es',
      'precision highp float;',
      'in vec2 vUv;',
      'uniform sampler2D uTexture;',
      'out vec4 outColor;',
      'void main() {',
      '  outColor = texture(uTexture, vUv);',
      '}',
    ].join('\\n');
    const program = gl.createProgram();
    gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, vertexSource));
    gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, fragmentSource));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error('FR203 program link failed: ' + gl.getProgramInfoLog(program));
    }
    return { canvas, gl, program };
  };

  const render = async (parsed, image, { cameraSign, xSign, ySign, clipFill, flipTextureY, background }) => {
    const { canvas, gl, program } = createRenderer();
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(background, background, background, 1);
    gl.clearDepth(1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LESS);
    gl.disable(gl.CULL_FACE);
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, parsed.interleaved, gl.STATIC_DRAW);
    const stride = 5 * 4;
    const positionLocation = gl.getAttribLocation(program, 'aPosition');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, stride, 0);
    const uvLocation = gl.getAttribLocation(program, 'aUv');
    gl.enableVertexAttribArray(uvLocation);
    gl.vertexAttribPointer(uvLocation, 2, gl.FLOAT, false, stride, 3 * 4);

    const b = parsed.bounds;
    const spanX = b.maxX - b.minX;
    const spanY = b.maxY - b.minY;
    const spanZ = b.maxZ - b.minZ;
    if (!(spanX > 0 && spanY > 0 && spanZ > 0)) throw new Error('FR203 invalid OBJ bounds.');
    const centerX = (b.minX + b.maxX) / 2;
    const centerY = (b.minY + b.maxY) / 2;
    const scale = clipFill / Math.max(spanX, spanY);
    gl.uniform2f(gl.getUniformLocation(program, 'uCenter'), centerX, centerY);
    gl.uniform1f(gl.getUniformLocation(program, 'uScale'), scale);
    gl.uniform1f(gl.getUniformLocation(program, 'uZMid'), (b.minZ + b.maxZ) / 2);
    gl.uniform1f(gl.getUniformLocation(program, 'uZHalf'), spanZ / 2);
    gl.uniform1f(gl.getUniformLocation(program, 'uCameraSign'), cameraSign);
    gl.uniform1f(gl.getUniformLocation(program, 'uYSign'), ySign);
    gl.uniform1f(gl.getUniformLocation(program, 'uXSign'), xSign);

    const texture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, flipTextureY);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    gl.uniform1i(gl.getUniformLocation(program, 'uTexture'), 0);

    gl.drawArrays(gl.TRIANGLES, 0, parsed.vertexCount);
    gl.finish();

    return {
      canvas,
      projection: {
        centerX,
        centerY,
        scale,
        screenPoint: (point) => ({
          x: (((point.x - centerX) * scale * xSign) + 1) / 2,
          y: 1 - ((((point.y - centerY) * scale * ySign) + 1) / 2),
        }),
      },
      dispose: () => gl.getExtension('WEBGL_lose_context')?.loseContext(),
    };
  };

  const distance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);

  const meanPoint = (landmarks, indices) => ({
    x: indices.reduce((sum, index) => sum + landmarks[index].x, 0) / indices.length,
    y: indices.reduce((sum, index) => sum + landmarks[index].y, 0) / indices.length,
    z: indices.reduce((sum, index) => sum + landmarks[index].z, 0) / indices.length,
  });

  const metricBandEnvelope = (landmarks) => {
    const oval = envelope.FR200_FACE_OVAL_VERTICES.map((index) => ({ index, ...landmarks[index] }));
    const leftEye = meanPoint(landmarks, envelope.FR200_LEFT_EYE_VERTICES);
    const rightEye = meanPoint(landmarks, envelope.FR200_RIGHT_EYE_VERTICES);
    const lip = meanPoint(landmarks, envelope.FR200_LIP_VERTICES);
    const eyeLineY = (leftEye.y + rightEye.y) / 2;
    const halfwayY = eyeLineY + (lip.y - eyeLineY) / 2;
    const bandMinY = Math.min(eyeLineY, halfwayY);
    const bandMaxY = Math.max(eyeLineY, halfwayY);
    const band = oval.filter((point) => point.y >= bandMinY && point.y <= bandMaxY);
    if (band.length < 2) throw new Error('FR203 metric midface band is too sparse.');
    const sorted = [...band].sort((a, b) => a.x - b.x || a.index - b.index);
    const left = sorted[0];
    const right = sorted[sorted.length - 1];
    const ovalXs = oval.map((point) => point.x);
    const ovalYs = oval.map((point) => point.y);
    const ovalHeight = Math.max(...ovalYs) - Math.min(...ovalYs);
    const bandWidth = right.x - left.x;
    const fullOvalWidth = Math.max(...ovalXs) - Math.min(...ovalXs);
    const fixedWidth = Math.abs(landmarks[454].x - landmarks[234].x);
    if (!(ovalHeight > 0 && bandWidth > 0 && fullOvalWidth > 0 && fixedWidth > 0)) {
      throw new Error('FR203 metric width/height must be positive.');
    }
    return {
      bandEnvelopeProviderIndices: [left.index, right.index],
      bandWidthByOvalHeight: bandWidth / ovalHeight,
      fixed234454WidthByOvalHeight: fixedWidth / ovalHeight,
      fullOvalWidthByOvalHeight: fullOvalWidth / ovalHeight,
      bandPointCount: band.length,
    };
  };

  const allPointRanks = (references, landmarks) =>
    references.map((referencePoint) => {
      const ranked = landmarks
        .map((landmark, index) => ({
          index,
          distance: distance(referencePoint, landmark),
        }))
        .sort((a, b) => a.distance - b.distance || a.index - b.index);
      const rankOf = (candidate) => ranked.findIndex((entry) => entry.index === candidate) + 1;
      return {
        top10: ranked.slice(0, 10),
        rank234: rankOf(234),
        rank454: rankOf(454),
      };
    });

  const bestDistinctPair = (references, landmarks) => {
    let best = null;
    for (let first = 0; first < landmarks.length; first += 1) {
      const d00 = distance(references[0], landmarks[first]);
      const d10 = distance(references[1], landmarks[first]);
      for (let second = 0; second < landmarks.length; second += 1) {
        if (second === first) continue;
        const direct = d00 + distance(references[1], landmarks[second]);
        const swapped = d10 + distance(references[0], landmarks[second]);
        const score = Math.min(direct, swapped);
        if (
          best === null ||
          score < best.score ||
          (score === best.score && first < best.indices[0]) ||
          (score === best.score && first === best.indices[0] && second < best.indices[1])
        ) {
          best = {
            indices: [first, second],
            assignment: direct <= swapped ? 'direct' : 'swapped',
            score,
          };
        }
      }
    }
    const ordered = [...best.indices].sort((a, b) => a - b);
    return { ...best, unorderedPair: ordered };
  };

  const fileset = await vision.FilesetResolver.forVisionTasks(location.origin + '/vendor/wasm');
  const landmarker = await vision.FaceLandmarker.createFromOptions(fileset, {
    baseOptions: { modelAssetPath: location.origin + '/assets/face_landmarker.task' },
    runningMode: 'IMAGE',
    numFaces: 1,
    outputFaceBlendshapes: false,
    outputFacialTransformationMatrixes: true,
  });

  const receipts = [];
  const failures = [];
  try {
    for (const input of inputs) {
      try {
        const [objResponse, textureResponse] = await Promise.all([
          fetch(input.objPath),
          fetch(input.texturePath),
        ]);
        if (!objResponse.ok || !textureResponse.ok) throw new Error('FR203 asset fetch failed.');
        const objText = await objResponse.text();
        const textureBlob = await textureResponse.blob();
        const image = await createImageBitmap(textureBlob);
        const parsed = parseObj(objText);

        const attempts = [];
        const variants = [];
        const pushVariants = (xSign, background) => {
          for (const clipFill of [1.2,1,0.85,1.5,0.7,1.8]) {
            for (const ySign of [1, -1]) {
              for (const flipTextureY of [true, false]) {
                for (const cameraSign of [1, -1]) {
                  variants.push({ cameraSign, xSign, ySign, clipFill, flipTextureY, background });
                }
              }
            }
          }
        };
        // Prefer the original orientation/background first. Detector-only fallbacks
        // are fixed in advance and never inspect zygion distance or landmark rank.
        pushVariants(1, 0.72);
        pushVariants(-1, 0.72);
        pushVariants(1, 1.0);
        pushVariants(-1, 1.0);
        pushVariants(1, 0.15);
        pushVariants(-1, 0.15);

        let selected = null;
        for (const variant of variants) {
          const rendered = await render(parsed, image, variant);
          const raw = landmarker.detect(rendered.canvas);
          const attempt = {
            ...variant,
            raw,
            rendered,
            detectedFaceCount: raw.faceLandmarks.length,
          };
          attempts.push(attempt);
          if (raw.faceLandmarks.length === 1) {
            selected = attempt;
            break;
          }
          rendered.dispose();
        }
        image.close();

        if (selected === null) {
          throw new Error(
            'FR203 rendered mesh produced no single-face detection for any deterministic render variant.',
          );
        }
        const landmarks = selected.raw.faceLandmarks[0];
        if (!landmarks || landmarks.length !== 478) {
          throw new Error('FR203 expected 478 provider landmarks, got ' + (landmarks?.length ?? 0));
        }

        if (selected.raw.facialTransformationMatrixes.length !== 1) {
          throw new Error('FR203 requires exactly one native facial transformation matrix.');
        }
        const projectedReference = input.bilateralReference.map(
          selected.rendered.projection.screenPoint,
        );
        const screenEnvelope = envelope.deriveMediaPipeMidfaceEnvelopeFR200({
          landmarks,
          facialTransformationMatrix: selected.raw.facialTransformationMatrixes[0],
        });
        const metricResult = metric.convertScreenLandmarksToMetricFR201({
          screenLandmarks: landmarks.slice(0, 468),
          canonicalMetricLandmarks: canonical,
          landmarkWeights: weights,
          frameWidth: renderSize,
          frameHeight: renderSize,
        });
        const metricEnvelope = metricBandEnvelope(metricResult.metricLandmarksCanonicalAligned);

        const roll = screenEnvelope.geometry.eyeLineRollRadians;
        const dxReference = projectedReference[1].x - projectedReference[0].x;
        const dyReference = projectedReference[1].y - projectedReference[0].y;
        const screenReferenceWidth = Math.abs(
          Math.cos(-roll) * dxReference - Math.sin(-roll) * dyReference,
        );
        if (!(screenReferenceWidth > 0)) {
          throw new Error('FR203 projected independent reference width must be positive.');
        }
        const sourceObjYSpan = parsed.bounds.maxY - parsed.bounds.minY;
        const sourceReferenceWidthByObjHeight =
          Math.abs(input.bilateralReference[1].x - input.bilateralReference[0].x) /
          sourceObjYSpan;

        const screenFixed234454RelativeError =
          (screenEnvelope.geometry.fixed234454Width - screenReferenceWidth) /
          screenReferenceWidth;
        const screenBandEnvelopeRelativeError =
          (screenEnvelope.geometry.bandEnvelopeWidth - screenReferenceWidth) /
          screenReferenceWidth;
        const screenFullOvalRelativeError =
          (screenEnvelope.geometry.fullOvalWidth - screenReferenceWidth) /
          screenReferenceWidth;

        const ranks = allPointRanks(projectedReference, landmarks);
        const bestPair = bestDistinctPair(projectedReference, landmarks);
        const refWidth = Math.abs(projectedReference[0].x - projectedReference[1].x);
        const providerWidth234454 = Math.abs(landmarks[234].x - landmarks[454].x);

        const candidateRanks = [234, 454].map((candidate) => {
          const perReference = projectedReference.map((referencePoint) => {
            const ranked = landmarks
              .map((landmark, index) => ({
                index,
                distance: distance(referencePoint, landmark),
              }))
              .sort((a, b) => a.distance - b.distance || a.index - b.index);
            return ranked.findIndex((entry) => entry.index === candidate) + 1;
          });
          return { candidate, perReference };
        });

        receipts.push({
          sampleId: input.sampleId,
          objDigest: input.objDigest,
          textureDigest: input.textureDigest,
          render: {
            size: [renderSize, renderSize],
            projection: 'orthographic_source_xy',
            clipFill: selected.clipFill,
            xSign: selected.xSign,
            ySign: selected.ySign,
            flipTextureY: selected.flipTextureY,
            background: selected.background,
            attemptedVariants: attempts.map((attempt) => ({
              cameraSign: attempt.cameraSign,
              xSign: attempt.xSign,
              ySign: attempt.ySign,
              clipFill: attempt.clipFill,
              flipTextureY: attempt.flipTextureY,
              background: attempt.background,
              detectedFaceCount: attempt.detectedFaceCount,
            })),
            selectedCameraSign: selected.cameraSign,
          },
          projectedReference,
          projectedReferenceWidth: refWidth,
          screenReferenceWidthRollNormalized: screenReferenceWidth,
          sourceReferenceWidthByObjHeight,
          screenFixed234454RelativeError,
          screenBandEnvelopeRelativeError,
          screenFullOvalRelativeError,
          screenBandEnvelopeWidth: screenEnvelope.geometry.bandEnvelopeWidth,
          screenBandEnvelopeProviderIndices: screenEnvelope.geometry.bandEnvelopeProviderIndices,
          screenBandEnvelopeWidthByOvalHeight: screenEnvelope.geometry.bandEnvelopeWidthByOvalHeight,
          screenFixed234454WidthByOvalHeight: screenEnvelope.geometry.fixed234454WidthByOvalHeight,
          screenFullOvalWidthByOvalHeight: screenEnvelope.geometry.fullOvalWidthByOvalHeight,
          metricBandEnvelopeProviderIndices: metricEnvelope.bandEnvelopeProviderIndices,
          metricBandEnvelopeWidthByOvalHeight: metricEnvelope.bandWidthByOvalHeight,
          metricFixed234454WidthByOvalHeight: metricEnvelope.fixed234454WidthByOvalHeight,
          metricFullOvalWidthByOvalHeight: metricEnvelope.fullOvalWidthByOvalHeight,
          provider234454Width: providerWidth234454,
          provider234454WidthError: providerWidth234454 - refWidth,
          provider234454RelativeWidthError:
            refWidth === 0 ? null : (providerWidth234454 - refWidth) / refWidth,
          candidateRanks,
          ranks,
          bestDistinctPair: bestPair,
          nativeTransformObserved:
            selected.raw.facialTransformationMatrixes.length === 1,
          authority: {
            providerIndexAdmissionAuthorized: false,
            anatomicalZygionClaimAuthorized: false,
            numericAcceptanceThresholdAuthorized: false,
            productionAuthorized: false,
            commerceAuthorized: false,
          },
        });
        selected.rendered.dispose();
      } catch (error) {
        failures.push({
          sampleId: input.sampleId,
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
        timeout: 180000,
      });
      if (evaluation.exceptionDetails) {
        throw new Error(`FR203 browser exception: ${JSON.stringify(evaluation.exceptionDetails)}`);
      }
      const result = evaluation.result?.value;
      if (!result || !Array.isArray(result.receipts) || !Array.isArray(result.failures)) {
        throw new Error(`FR203 invalid browser result: ${JSON.stringify(result)}`);
      }

      const rankValues = [];
      let rank1 = 0;
      let top5 = 0;
      let top10 = 0;
      for (const receipt of result.receipts) {
        for (const rankReceipt of receipt.ranks) {
          for (const candidateRank of [rankReceipt.rank234, rankReceipt.rank454]) {
            rankValues.push(candidateRank);
            if (candidateRank === 1) rank1 += 1;
            if (candidateRank <= 5) top5 += 1;
            if (candidateRank <= 10) top10 += 1;
          }
        }
      }

      const pairFrequency = frequency(
        result.receipts.map((receipt) => receipt.bestDistinctPair.unorderedPair.join('/')),
      );
      const selectedCameraFrequency = frequency(
        result.receipts.map((receipt) => String(receipt.render.selectedCameraSign)),
      );
      const relativeErrors = result.receipts
        .map((receipt) => receipt.provider234454RelativeWidthError)
        .filter((value) => Number.isFinite(value));

      const screenDirectError = {
        fixed234454: relativeErrorSummary(result.receipts, 'screenFixed234454RelativeError'),
        frozenBandEnvelope: relativeErrorSummary(result.receipts, 'screenBandEnvelopeRelativeError'),
        fullOval: relativeErrorSummary(result.receipts, 'screenFullOvalRelativeError'),
      };
      const metricScaleFreeCorrelation = {
        fixed234454: {
          pearson: pearsonPair(result.receipts, 'sourceReferenceWidthByObjHeight', 'metricFixed234454WidthByOvalHeight'),
          spearman: spearmanPair(result.receipts, 'sourceReferenceWidthByObjHeight', 'metricFixed234454WidthByOvalHeight'),
        },
        frozenBandEnvelope: {
          pearson: pearsonPair(result.receipts, 'sourceReferenceWidthByObjHeight', 'metricBandEnvelopeWidthByOvalHeight'),
          spearman: spearmanPair(result.receipts, 'sourceReferenceWidthByObjHeight', 'metricBandEnvelopeWidthByOvalHeight'),
        },
        fullOval: {
          pearson: pearsonPair(result.receipts, 'sourceReferenceWidthByObjHeight', 'metricFullOvalWidthByOvalHeight'),
          spearman: spearmanPair(result.receipts, 'sourceReferenceWidthByObjHeight', 'metricFullOvalWidthByOvalHeight'),
        },
      };
      const screenBandEnvelopePairFrequency = frequency(
        result.receipts.map((receipt) => receipt.screenBandEnvelopeProviderIndices.join('/')),
      );
      const metricBandEnvelopePairFrequency = frequency(
        result.receipts.map((receipt) => receipt.metricBandEnvelopeProviderIndices.join('/')),
      );

      const artifact = {
        schemaVersion: 'fr203-same-mesh-band-envelope-v1',
        authorityState: 'research_same_mesh_frozen_band_envelope_only',
        status:
          result.receipts.length === inputs.length ? 'executed_complete' : 'executed_partial',
        premise:
          'The frozen FR200/FR201 band-envelope proxy is evaluated on the exact FR202 textured OBJ render whose source-exact zygion vertices define the independent reference.',
        packageVersion: PACKAGE_VERSION,
        chrome: chrome.version,
        render: {
          size: RENDER_SIZE,
          projection: 'orthographic_source_xy',
          clipFills: CLIP_FILLS,
          textureSource: 'exact OBJ-bound map_Kd JPEG',
          lighting: 'unlit_texture',
          detectorVariantSelection:
            'first exactly-one-face detection in a fixed predeclared sequence over clip fill, horizontal/vertical orientation, texture-Y orientation, camera side, and neutral background; no zygion distance or landmark rank is consulted',
        },
        corpusCount: FR199_PUBLIC_CORPUS.length,
        independentReferenceReadyCount: inputs.length,
        referenceFailures,
        providerSuccessCount: result.receipts.length,
        providerFailureCount: result.failures.length,
        providerFailures: result.failures,
        selectedCameraFrequency,
        fixedCandidateRankSummary: {
          observationCount: rankValues.length,
          meanRank: mean(rankValues),
          medianRank: median(rankValues),
          minRank: rankValues.length ? Math.min(...rankValues) : null,
          maxRank: rankValues.length ? Math.max(...rankValues) : null,
          rank1,
          top5,
          top10,
        },
        bestDistinctPairFrequency: pairFrequency,
        frozenBandEnvelopeResult: {
          definition: 'FR200 roll-normalized eye line through halfway-to-lip face-oval envelope, unchanged',
          screenDirectRelativeError: screenDirectError,
          metricScaleFreeCorrelation,
          screenBandEnvelopePairFrequency,
          metricBandEnvelopePairFrequency,
        },
        fixed234454RelativeWidthError: {
          mean: mean(relativeErrors),
          median: median(relativeErrors),
          min: relativeErrors.length ? Math.min(...relativeErrors) : null,
          max: relativeErrors.length ? Math.max(...relativeErrors) : null,
        },
        receipts: result.receipts,
        providerIndexAdmissionAuthorized: false,
        anatomicalZygionClaimAuthorized: false,
        numericAcceptanceThresholdAuthorized: false,
        calibrationAuthorized: false,
        classifierAuthorized: false,
        traditionalProjectionAuthorized: false,
        productionAuthorized: false,
        commerceAuthorized: false,
      };

      const artifactDir = join(ROOT, 'artifacts', 'face-reading');
      await mkdir(artifactDir, { recursive: true });
      await writeFile(
        join(artifactDir, 'fr203-same-mesh-band-envelope.json'),
        `${JSON.stringify(artifact, null, 2)}\n`,
        'utf8',
      );
      process.stdout.write(
        `${JSON.stringify({
          status: artifact.status,
          independentReferenceReadyCount: artifact.independentReferenceReadyCount,
          providerSuccessCount: artifact.providerSuccessCount,
          providerFailures: artifact.providerFailures,
          selectedCameraFrequency: artifact.selectedCameraFrequency,
          fixedCandidateRankSummary: artifact.fixedCandidateRankSummary,
          bestDistinctPairFrequency: artifact.bestDistinctPairFrequency,
          frozenBandEnvelopeResult: artifact.frozenBandEnvelopeResult,
          fixed234454RelativeWidthError: artifact.fixed234454RelativeWidthError,
          providerIndexAdmissionAuthorized: false,
          productionAuthorized: false,
          commerceAuthorized: false,
        })}\n`,
      );

      if (artifact.status !== 'executed_complete' || result.receipts.length === 0) {
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
