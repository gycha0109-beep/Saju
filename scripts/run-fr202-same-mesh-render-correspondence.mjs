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
const MODEL_URL =
  'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task';
const PACKAGE_VERSION = '0.10.35';
const EXPECTED_PACKAGE_BUNDLE_DIGEST =
  'sha256:55d7ab624fbb70dcc5adc4ae6d7ea9cfcb569139d3dbfbf2b1deafcb966bc0fe';
const EXPECTED_MODEL_DIGEST =
  'sha256:64184e229b263107bc2b804c6625db1341ff2bb731874b0bcc2fe6544e0bc9ff';
const CDP_PORT = 9226;
const RENDER_SIZE = 1024;
const CLIP_FILL = 1.8;

function sha256(bytes) {
  return `sha256:${createHash('sha256').update(bytes).digest('hex')}`;
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
    headers: { 'user-agent': 'myeongha-fr202-same-mesh-render' },
  });
  if (!response.ok) throw new Error(`FR202 download failed ${response.status} ${url}`);
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
    throw new Error(`FR202 OBJ/MTL binding drift for ${sampleId}: ${mtllib ?? 'missing'}`);
  }
  if (mapKd?.slice('map_Kd '.length).trim() !== expectedTexture) {
    throw new Error(`FR202 MTL/texture binding drift for ${sampleId}: ${mapKd ?? 'missing'}`);
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
  throw new Error('FR202 requires Chrome/Chromium.');
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
  throw new Error('FR202 could not discover Chrome DevTools target.');
}

async function connectCdp(wsUrl) {
  const ws = new globalThis.WebSocket(wsUrl);
  await new Promise((resolvePromise, rejectPromise) => {
    ws.addEventListener('open', resolvePromise, { once: true });
    ws.addEventListener(
      'error',
      () => rejectPromise(new Error('FR202 CDP connection failed.')),
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
    throw new Error(`FR202 package version drift: ${packageJson.version}`);
  }
  if (sha256(await readFile(bundlePath)) !== EXPECTED_PACKAGE_BUNDLE_DIGEST) {
    throw new Error('FR202 package bundle digest drift.');
  }

  const wasmDir = join(packageRoot, 'wasm');
  for (const name of await readdir(wasmDir)) {
    const path = join(wasmDir, name);
    if (!(await stat(path)).isFile()) {
      throw new Error(`FR202 unexpected non-file WASM entry: ${name}`);
    }
  }

  const scratch = await mkdtemp(join(tmpdir(), 'myeongha-fr202-'));
  try {
    const modelPath = join(scratch, 'face_landmarker.task');
    const modelBytes = await download(MODEL_URL, modelPath);
    if (sha256(modelBytes) !== EXPECTED_MODEL_DIGEST) {
      throw new Error('FR202 model digest drift.');
    }

    const assetDir = join(scratch, 'assets');
    await mkdir(assetDir);
    const inputs = [];
    const referenceFailures = [];

    for (const sampleId of FR199_PUBLIC_CORPUS) {
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
        inputs.push({
          sampleId,
          objPath: `/assets/${sampleId}.obj`,
          texturePath: `/assets/${sampleId}.jpg`,
          objDigest: sha256(objBytes),
          textureDigest: sha256(textureBytes),
          bilateralReference: reference.bilateralReference,
        });
      } catch (error) {
        referenceFailures.push({
          sampleId,
          error: error instanceof Error ? error.message : String(error),
        });
      }
    }

    const server = createServer(async (req, res) => {
      try {
        const url = new globalThis.URL(req.url ?? '/', 'http://127.0.0.1');
        let path;
        if (url.pathname === '/fr202.html') path = null;
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
          res.end('<!doctype html><html><body>FR202</body></html>');
          return;
        }
        const safe = normalize(path);
        const allowed = [packageRoot, scratch].some(
          (prefix) => safe === prefix || safe.startsWith(prefix + '/'),
        );
        if (!allowed) throw new Error(`FR202 refusing path outside allowed roots: ${safe}`);
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
      if (!address || typeof address === 'string') throw new Error('FR202 server has no port.');
      const pageUrl = `http://127.0.0.1:${address.port}/fr202.html`;
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
  const clipFill = ${CLIP_FILL};

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
      throw new Error('FR202 OBJ lacks textured triangle geometry.');
    }
    const interleaved = new Float32Array(triangles.length * 5);
    for (let index = 0; index < triangles.length; index += 1) {
      const ref = triangles[index];
      const p = positions[ref.vi];
      const uv = texcoords[ref.ti];
      if (!p || !uv) throw new Error('FR202 face references missing position/UV.');
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
      throw new Error('FR202 shader compile failed: ' + gl.getShaderInfoLog(shader));
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
    if (!gl) throw new Error('FR202 WebGL2 unavailable.');
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
      'out vec2 vUv;',
      'void main() {',
      '  float zNorm = (aPosition.z - uZMid) / uZHalf;',
      '  gl_Position = vec4(',
      '    (aPosition.x - uCenter.x) * uScale,',
      '    (aPosition.y - uCenter.y) * uScale,',
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
      throw new Error('FR202 program link failed: ' + gl.getProgramInfoLog(program));
    }
    return { canvas, gl, program };
  };

  const render = async (parsed, image, cameraSign) => {
    const { canvas, gl, program } = createRenderer();
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.72, 0.72, 0.72, 1);
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
    if (!(spanX > 0 && spanY > 0 && spanZ > 0)) throw new Error('FR202 invalid OBJ bounds.');
    const centerX = (b.minX + b.maxX) / 2;
    const centerY = (b.minY + b.maxY) / 2;
    const scale = clipFill / Math.max(spanX, spanY);
    gl.uniform2f(gl.getUniformLocation(program, 'uCenter'), centerX, centerY);
    gl.uniform1f(gl.getUniformLocation(program, 'uScale'), scale);
    gl.uniform1f(gl.getUniformLocation(program, 'uZMid'), (b.minZ + b.maxZ) / 2);
    gl.uniform1f(gl.getUniformLocation(program, 'uZHalf'), spanZ / 2);
    gl.uniform1f(gl.getUniformLocation(program, 'uCameraSign'), cameraSign);

    const texture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
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
          x: ((point.x - centerX) * scale + 1) / 2,
          y: 1 - (((point.y - centerY) * scale + 1) / 2),
        }),
      },
    };
  };

  const distance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);

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
        if (!objResponse.ok || !textureResponse.ok) throw new Error('FR202 asset fetch failed.');
        const objText = await objResponse.text();
        const textureBlob = await textureResponse.blob();
        const image = await createImageBitmap(textureBlob);
        const parsed = parseObj(objText);

        const attempts = [];
        for (const cameraSign of [1, -1]) {
          const rendered = await render(parsed, image, cameraSign);
          const raw = landmarker.detect(rendered.canvas);
          attempts.push({
            cameraSign,
            raw,
            rendered,
            detectedFaceCount: raw.faceLandmarks.length,
          });
        }
        image.close();

        const successful = attempts.filter((attempt) => attempt.detectedFaceCount === 1);
        if (successful.length === 0) {
          throw new Error(
            'FR202 rendered mesh produced no single-face detection for either deterministic camera side.',
          );
        }
        const selected =
          successful.find((attempt) => attempt.cameraSign === 1) ?? successful[0];
        const landmarks = selected.raw.faceLandmarks[0];
        if (!landmarks || landmarks.length !== 478) {
          throw new Error(`FR202 expected 478 provider landmarks, got ${landmarks?.length ?? 0}`);
        }

        const projectedReference = input.bilateralReference.map(
          selected.rendered.projection.screenPoint,
        );
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
            clipFill,
            attemptedCameraSigns: attempts.map((attempt) => ({
              cameraSign: attempt.cameraSign,
              detectedFaceCount: attempt.detectedFaceCount,
            })),
            selectedCameraSign: selected.cameraSign,
          },
          projectedReference,
          projectedReferenceWidth: refWidth,
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
        throw new Error(`FR202 browser exception: ${JSON.stringify(evaluation.exceptionDetails)}`);
      }
      const result = evaluation.result?.value;
      if (!result || !Array.isArray(result.receipts) || !Array.isArray(result.failures)) {
        throw new Error(`FR202 invalid browser result: ${JSON.stringify(result)}`);
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

      const artifact = {
        schemaVersion: 'fr202-same-mesh-render-correspondence-v1',
        authorityState: 'research_same_mesh_render_only',
        status:
          result.receipts.length === inputs.length ? 'executed_complete' : 'executed_partial',
        premise:
          'The MediaPipe input raster is rendered directly from the exact OBJ whose source-exact zygion vertices define the reference.',
        packageVersion: PACKAGE_VERSION,
        chrome: chrome.version,
        render: {
          size: RENDER_SIZE,
          projection: 'orthographic_source_xy',
          clipFill: CLIP_FILL,
          textureSource: 'exact OBJ-bound map_Kd JPEG',
          lighting: 'unlit_texture',
          cameraSelection:
            'deterministic +Z first when exactly one face is detected; otherwise -Z if it is the only successful side',
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
        join(artifactDir, 'fr202-same-mesh-render-correspondence.json'),
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
