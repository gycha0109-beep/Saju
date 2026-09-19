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
  deriveZygionSourceExactFR199,
  parseObjVerticesFR199,
} from '../.face-reading-dist/face-reading-public-synthetic-zygion-correspondence-fr199.js';

import {
  FR200_FACE_OVAL_VERTICES,
  FR200_LEFT_EYE_VERTICES,
  FR200_RIGHT_EYE_VERTICES,
  FR200_LIP_VERTICES,
} from '../.face-reading-dist/face-reading-mediapipe-midface-envelope-fr200.js';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
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
const FR203_DISCOVERY_HEAD = '7b55729bc056aaa4088cff40c5b710c2beb7e4cf';
const FR203_DISCOVERY_RUN = 35440232456;
const FR203_FROZEN_SCALE_FACTORS = Object.freeze({
  fixed234454: 0.8316119344124847,
  fullOval: 0.8185802384926992,
  bandEnvelope: 0.8330842257364008,
});

const HOLDOUT_ARCHIVES = Object.freeze([
  Object.freeze({
    id: 'male-23',
    url: 'https://raw.githubusercontent.com/research-digitized-rhinoplasty/3D-face-morph-dataset-male/c3417d0f71b3c37444f77085f0715bf0700333b6/morphed-3D/male-23.zip',
    digest: 'sha256:8a28bd0758dd6a2c18e028d8ad0b89ab2cf8333f3b69e71d0e976a41e09d4fb2',
  }),
  Object.freeze({
    id: 'male-27',
    url: 'https://raw.githubusercontent.com/research-digitized-rhinoplasty/3D-face-morph-dataset-male/c3417d0f71b3c37444f77085f0715bf0700333b6/morphed-3D/male-27.zip',
    digest: 'sha256:28f83afd5c524fcdc9a9ea7cbeacb8b059634f4d43e2959b9679da3d0d3bea74',
  }),
  Object.freeze({
    id: 'female-26',
    url: 'https://raw.githubusercontent.com/research-digitized-rhinoplasty/3D-face-morph-dataset-female/804bbf72a0e377c1175a6a38fd1f833242b775b3/morphed-3D/female-26.zip',
    digest: 'sha256:266514356128b25821f4bc7dcb0ee3f9afea7dce1bf17e8c83371960cf640d89',
  }),
  Object.freeze({
    id: 'female-28',
    url: 'https://raw.githubusercontent.com/research-digitized-rhinoplasty/3D-face-morph-dataset-female/804bbf72a0e377c1175a6a38fd1f833242b775b3/morphed-3D/female-28.zip',
    digest: 'sha256:71e4fc15291ddd412f15dc0d50a0dd56f22f91d5fe3826108fd62e721216c883',
  }),
]);

const HOLDOUT_VARIANTS = Object.freeze([
  'Narrow-10',
  'Narrow-15',
  'Narrow-75',
  'Narrow-125',
]);


function sha256(bytes) {
  return `sha256:${createHash('sha256').update(bytes).digest('hex')}`;
}

async function download(url, path) {
  const response = await globalThis.fetch(url, {
    redirect: 'follow',
    headers: { 'user-agent': 'myeongha-fr204-morphed-geometry-holdout' },
    signal: globalThis.AbortSignal.timeout(120000),
  });
  if (!response.ok) throw new Error(`FR204 download failed ${response.status} ${url}`);
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
    throw new Error(`FR204 OBJ/MTL binding drift for ${sampleId}: ${mtllib ?? 'missing'}`);
  }
  if (mapKd?.slice('map_Kd '.length).trim() !== expectedTexture) {
    throw new Error(`FR204 MTL/texture binding drift for ${sampleId}: ${mapKd ?? 'missing'}`);
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
  throw new Error('FR204 requires Chrome/Chromium.');
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
  throw new Error('FR204 could not discover Chrome DevTools target.');
}

async function connectCdp(wsUrl) {
  const ws = new globalThis.WebSocket(wsUrl);
  await new Promise((resolvePromise, rejectPromise) => {
    ws.addEventListener('open', resolvePromise, { once: true });
    ws.addEventListener(
      'error',
      () => rejectPromise(new Error('FR204 CDP connection failed.')),
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
    throw new Error(`FR204 package version drift: ${packageJson.version}`);
  }
  if (sha256(await readFile(bundlePath)) !== EXPECTED_PACKAGE_BUNDLE_DIGEST) {
    throw new Error('FR204 package bundle digest drift.');
  }

  const wasmDir = join(packageRoot, 'wasm');
  for (const name of await readdir(wasmDir)) {
    const path = join(wasmDir, name);
    if (!(await stat(path)).isFile()) {
      throw new Error(`FR204 unexpected non-file WASM entry: ${name}`);
    }
  }

  const scratch = await mkdtemp(join(tmpdir(), 'myeongha-fr204-'));
  try {
    const modelPath = join(scratch, 'face_landmarker.task');
    const modelBytes = await download(MODEL_URL, modelPath);
    if (sha256(modelBytes) !== EXPECTED_MODEL_DIGEST) {
      throw new Error('FR204 model digest drift.');
    }

    const assetDir = join(scratch, 'assets');
    await mkdir(assetDir);
    const inputs = [];
    const referenceFailures = [];
    const holdoutCandidateCount = HOLDOUT_ARCHIVES.length * HOLDOUT_VARIANTS.length;

    for (const archive of HOLDOUT_ARCHIVES) {
      const zipPath = join(scratch, `${archive.id}.zip`);
      const zipBytes = await download(archive.url, zipPath);
      if (sha256(zipBytes) !== archive.digest) {
        throw new Error(`FR204 archive digest drift for ${archive.id}.`);
      }
      const extractDir = join(assetDir, archive.id);
      await mkdir(extractDir, { recursive: true });
      const unzip = spawnSync('unzip', ['-q', zipPath, '-d', extractDir], {
        encoding: 'utf8',
      });
      if (unzip.status !== 0) {
        throw new Error(
          `FR204 unzip failed for ${archive.id}: ${unzip.stderr || unzip.stdout}`,
        );
      }

      for (const variant of HOLDOUT_VARIANTS) {
        const sampleId = `${archive.id}-${variant}`;
        try {
          const objPath = join(extractDir, `${sampleId}.obj`);
          const mtlPath = join(extractDir, `${sampleId}.mtl`);
          const texturePath = join(extractDir, `${sampleId}.jpg`);
          const [objBytes, mtlBytes, textureBytes] = await Promise.all([
            readFile(objPath),
            readFile(mtlPath),
            readFile(texturePath),
          ]);
          const objText = objBytes.toString('utf8');
          const mtlText = mtlBytes.toString('utf8');
          verifyBinding(objText, mtlText, sampleId);
          const derived = deriveZygionSourceExactFR199(parseObjVerticesFR199(objText));
          inputs.push({
            sampleId,
            sourceArchiveId: archive.id,
            sourceArchiveDigest: archive.digest,
            morphVariant: variant,
            objPath: `/assets/${archive.id}/${sampleId}.obj`,
            texturePath: `/assets/${archive.id}/${sampleId}.jpg`,
            objDigest: sha256(objBytes),
            textureDigest: sha256(textureBytes),
            bilateralReference: derived.bilateral,
          });
        } catch (error) {
          referenceFailures.push({
            sampleId,
            sourceArchiveId: archive.id,
            morphVariant: variant,
            error: error instanceof Error ? error.message : String(error),
          });
        }
      }
    }

    const server = createServer(async (req, res) => {
      try {
        const url = new globalThis.URL(req.url ?? '/', 'http://127.0.0.1');
        let path;
        if (url.pathname === '/fr204.html') path = null;
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
          res.writeHead(200, {
            'content-type': 'text/html; charset=utf-8',
            'cache-control': 'no-store',
          });
          res.end('<!doctype html><html><body>FR204</body></html>');
          return;
        }
        const safe = normalize(path);
        const allowed = [packageRoot, scratch].some(
          (prefix) => safe === prefix || safe.startsWith(prefix + '/'),
        );
        if (!allowed) throw new Error(`FR204 refusing path outside allowed roots: ${safe}`);
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
      if (!address || typeof address === 'string') throw new Error('FR204 server has no port.');
      const pageUrl = `http://127.0.0.1:${address.port}/fr204.html`;
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
  const vision = await import(location.origin + '/vendor/vision_bundle.mjs');
  const inputs = ${JSON.stringify(inputs)};
  const renderSize = ${RENDER_SIZE};
  const faceOvalVertices = ${JSON.stringify(FR200_FACE_OVAL_VERTICES)};
  const leftEyeVertices = ${JSON.stringify(FR200_LEFT_EYE_VERTICES)};
  const rightEyeVertices = ${JSON.stringify(FR200_RIGHT_EYE_VERTICES)};
  const lipVertices = ${JSON.stringify(FR200_LIP_VERTICES)};
  const calibrationFactors = ${JSON.stringify(FR203_FROZEN_SCALE_FACTORS)};

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
      throw new Error('FR204 OBJ lacks textured triangle geometry.');
    }
    const interleaved = new Float32Array(triangles.length * 5);
    for (let index = 0; index < triangles.length; index += 1) {
      const ref = triangles[index];
      const p = positions[ref.vi];
      const uv = texcoords[ref.ti];
      if (!p || !uv) throw new Error('FR204 face references missing position/UV.');
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
      throw new Error('FR204 shader compile failed: ' + gl.getShaderInfoLog(shader));
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
    if (!gl) throw new Error('FR204 WebGL2 unavailable.');
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
      throw new Error('FR204 program link failed: ' + gl.getProgramInfoLog(program));
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
    if (!(spanX > 0 && spanY > 0 && spanZ > 0)) throw new Error('FR204 invalid OBJ bounds.');
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
  });

  const deriveWidthScalars = (landmarks) => {
    const leftEye = meanPoint(landmarks, leftEyeVertices);
    const rightEye = meanPoint(landmarks, rightEyeVertices);
    const lip = meanPoint(landmarks, lipVertices);
    const eyeMid = {
      x: (leftEye.x + rightEye.x) / 2,
      y: (leftEye.y + rightEye.y) / 2,
    };
    const angle = Math.atan2(leftEye.y - rightEye.y, leftEye.x - rightEye.x);
    const cosine = Math.cos(-angle);
    const sine = Math.sin(-angle);
    const rotate = (index) => {
      const point = landmarks[index];
      const dx = point.x - eyeMid.x;
      const dy = point.y - eyeMid.y;
      return {
        index,
        x: eyeMid.x + cosine * dx - sine * dy,
        y: eyeMid.y + sine * dx + cosine * dy,
      };
    };
    const dxLip = lip.x - eyeMid.x;
    const dyLip = lip.y - eyeMid.y;
    const rotatedLip = {
      x: eyeMid.x + cosine * dxLip - sine * dyLip,
      y: eyeMid.y + sine * dxLip + cosine * dyLip,
    };
    const oval = faceOvalVertices.map(rotate);
    const ovalXs = oval.map((entry) => entry.x);
    const ovalYs = oval.map((entry) => entry.y);
    const eyeLineY = eyeMid.y;
    const halfLipY = eyeLineY + (rotatedLip.y - eyeLineY) / 2;
    const bandMinY = Math.min(eyeLineY, halfLipY);
    const bandMaxY = Math.max(eyeLineY, halfLipY);
    const band = oval.filter((entry) => entry.y >= bandMinY && entry.y <= bandMaxY);
    if (band.length < 2) throw new Error('FR204 midface band contains fewer than two oval vertices.');
    const bandXs = band.map((entry) => entry.x);
    const p234 = rotate(234);
    const p454 = rotate(454);
    return {
      fixed234454Width: Math.abs(p454.x - p234.x),
      fullOvalWidth: Math.max(...ovalXs) - Math.min(...ovalXs),
      bandEnvelopeWidth: Math.max(...bandXs) - Math.min(...bandXs),
      faceOvalHeight: Math.max(...ovalYs) - Math.min(...ovalYs),
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
        if (!objResponse.ok || !textureResponse.ok) throw new Error('FR204 asset fetch failed.');
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
            'FR204 rendered mesh produced no single-face detection for any deterministic render variant.',
          );
        }
        const landmarks = selected.raw.faceLandmarks[0];
        if (!landmarks || landmarks.length !== 478) {
          throw new Error('FR204 expected 478 provider landmarks, got ' + (landmarks?.length ?? 0));
        }

        const projectedReference = input.bilateralReference.map(
          selected.rendered.projection.screenPoint,
        );
        const ranks = allPointRanks(projectedReference, landmarks);
        const bestPair = bestDistinctPair(projectedReference, landmarks);
        const refWidth = Math.abs(projectedReference[0].x - projectedReference[1].x);
        if (!(refWidth > 0)) throw new Error('FR204 projected reference width must be positive.');
        const widthScalars = deriveWidthScalars(landmarks);
        const providerWidth234454 = widthScalars.fixed234454Width;

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
          exactProjectedZygionWidth: refWidth,
          provider234454Width: providerWidth234454,
          providerFullOvalWidth: widthScalars.fullOvalWidth,
          providerBandEnvelopeWidth: widthScalars.bandEnvelopeWidth,
          providerFaceOvalHeight: widthScalars.faceOvalHeight,
          bandPointCount: widthScalars.bandPointCount,
          widthRatios: {
            fixed234454ToReference: providerWidth234454 / refWidth,
            fullOvalToReference: widthScalars.fullOvalWidth / refWidth,
            bandEnvelopeToReference: widthScalars.bandEnvelopeWidth / refWidth,
          },
          relativeErrors: {
            fixed234454: providerWidth234454 / refWidth - 1,
            fullOval: widthScalars.fullOvalWidth / refWidth - 1,
            bandEnvelope: widthScalars.bandEnvelopeWidth / refWidth - 1,
          },
          frozenCalibration: {
            factors: calibrationFactors,
            calibratedWidths: {
              fixed234454: providerWidth234454 * calibrationFactors.fixed234454,
              fullOval: widthScalars.fullOvalWidth * calibrationFactors.fullOval,
              bandEnvelope: widthScalars.bandEnvelopeWidth * calibrationFactors.bandEnvelope,
            },
            calibratedRelativeErrors: {
              fixed234454:
                (providerWidth234454 * calibrationFactors.fixed234454) / refWidth - 1,
              fullOval:
                (widthScalars.fullOvalWidth * calibrationFactors.fullOval) / refWidth - 1,
              bandEnvelope:
                (widthScalars.bandEnvelopeWidth * calibrationFactors.bandEnvelope) / refWidth - 1,
            },
          },
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
        throw new Error(`FR204 browser exception: ${JSON.stringify(evaluation.exceptionDetails)}`);
      }
      const result = evaluation.result?.value;
      if (!result || !Array.isArray(result.receipts) || !Array.isArray(result.failures)) {
        throw new Error(`FR204 invalid browser result: ${JSON.stringify(result)}`);
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
      const summarize = (values) => {
        const finiteValues = values.filter((value) => Number.isFinite(value));
        if (finiteValues.length === 0) return null;
        const average = mean(finiteValues);
        const variance =
          finiteValues.reduce((sum, value) => sum + (value - average) ** 2, 0) /
          finiteValues.length;
        const standardDeviation = Math.sqrt(variance);
        return {
          count: finiteValues.length,
          mean: average,
          median: median(finiteValues),
          min: Math.min(...finiteValues),
          max: Math.max(...finiteValues),
          standardDeviation,
          coefficientOfVariation:
            average === 0 ? null : standardDeviation / Math.abs(average),
        };
      };
      const fixedRatios = result.receipts.map(
        (receipt) => receipt.widthRatios.fixed234454ToReference,
      );
      const ovalRatios = result.receipts.map(
        (receipt) => receipt.widthRatios.fullOvalToReference,
      );
      const bandRatios = result.receipts.map(
        (receipt) => receipt.widthRatios.bandEnvelopeToReference,
      );
      const fixedAbsErrors = result.receipts.map(
        (receipt) => Math.abs(receipt.relativeErrors.fixed234454),
      );
      const ovalAbsErrors = result.receipts.map(
        (receipt) => Math.abs(receipt.relativeErrors.fullOval),
      );
      const bandAbsErrors = result.receipts.map(
        (receipt) => Math.abs(receipt.relativeErrors.bandEnvelope),
      );
      const fixedCalibratedAbsErrors = result.receipts.map(
        (receipt) => Math.abs(receipt.frozenCalibration.calibratedRelativeErrors.fixed234454),
      );
      const ovalCalibratedAbsErrors = result.receipts.map(
        (receipt) => Math.abs(receipt.frozenCalibration.calibratedRelativeErrors.fullOval),
      );
      const bandCalibratedAbsErrors = result.receipts.map(
        (receipt) => Math.abs(receipt.frozenCalibration.calibratedRelativeErrors.bandEnvelope),
      );

      const artifact = {
        schemaVersion: 'fr204-morphed-geometry-holdout-v1',
        authorityState: 'research_morphed_geometry_holdout_only',
        status:
          result.receipts.length === inputs.length ? 'executed_complete' : 'executed_partial',
        premise:
          'FR204 validates frozen FR203 scale factors on 16 never-used morphed geometry variants. No factor is re-fit from holdout provider/reference error.',
        discoveryCalibration: {
          sourceHead: FR203_DISCOVERY_HEAD,
          sourceRun: FR203_DISCOVERY_RUN,
          frozenScaleFactors: FR203_FROZEN_SCALE_FACTORS,
          refitOnHoldout: false,
        },
        holdoutSelection: {
          archiveIds: HOLDOUT_ARCHIVES.map((entry) => entry.id),
          variants: HOLDOUT_VARIANTS,
          selectionUsesProviderError: false,
        },
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
        holdoutCandidateCount,
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
        widthProxySummary: {
          fixed234454: {
            frozenScaleFactor: FR203_FROZEN_SCALE_FACTORS.fixed234454,
            rawRatioToExactReference: summarize(fixedRatios),
            rawAbsoluteRelativeError: summarize(fixedAbsErrors),
            calibratedAbsoluteRelativeError: summarize(fixedCalibratedAbsErrors),
          },
          fullOval: {
            frozenScaleFactor: FR203_FROZEN_SCALE_FACTORS.fullOval,
            rawRatioToExactReference: summarize(ovalRatios),
            rawAbsoluteRelativeError: summarize(ovalAbsErrors),
            calibratedAbsoluteRelativeError: summarize(ovalCalibratedAbsErrors),
          },
          bandEnvelope: {
            frozenScaleFactor: FR203_FROZEN_SCALE_FACTORS.bandEnvelope,
            rawRatioToExactReference: summarize(bandRatios),
            rawAbsoluteRelativeError: summarize(bandAbsErrors),
            calibratedAbsoluteRelativeError: summarize(bandCalibratedAbsErrors),
          },
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
        join(artifactDir, 'fr204-morphed-geometry-holdout.json'),
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
          widthProxySummary: artifact.widthProxySummary,
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
