import { Buffer } from 'node:buffer';
import { createHash } from 'node:crypto';
import process from 'node:process';
import { createServer } from 'node:http';
import { mkdtemp, mkdir, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises';
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
  parseObjVerticesFR199,
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
const CDP_PORT = 9225;

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
    headers: { 'user-agent': 'myeongha-fr201-metric-face-geometry' },
  });
  if (!response.ok) throw new Error(`FR201 download failed ${response.status} ${url}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  if (path) await writeFile(path, bytes);
  return bytes;
}

function parseMetadata(text) {
  const values = [...text.matchAll(/vertex_buffer:\s*([-+0-9.eE]+)/g)].map((match) =>
    Number(match[1]),
  );
  if (values.length !== 468 * 5) {
    throw new Error(`FR201 expected 2340 canonical vertex-buffer values, got ${values.length}`);
  }
  const canonical = [];
  for (let index = 0; index < 468; index += 1) {
    const offset = index * 5;
    canonical.push({
      x: values[offset],
      y: values[offset + 1],
      z: values[offset + 2],
    });
  }
  const weights = [...text.matchAll(
    /procrustes_landmark_basis\s*\{\s*landmark_id:\s*(\d+)\s*weight:\s*([-+0-9.eE]+)\s*\}/g,
  )].map((match) => ({
    landmarkId: Number(match[1]),
    weight: Number(match[2]),
  }));
  if (weights.length !== 33) {
    throw new Error(`FR201 expected 33 Procrustes weights, got ${weights.length}`);
  }
  return { canonical, weights };
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
  throw new Error('FR201 requires Chrome/Chromium.');
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
    case '.png':
      return 'image/png';
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
  throw new Error('FR201 could not discover Chrome DevTools target.');
}

async function connectCdp(wsUrl) {
  const ws = new globalThis.WebSocket(wsUrl);
  await new Promise((resolvePromise, rejectPromise) => {
    ws.addEventListener('open', resolvePromise, { once: true });
    ws.addEventListener(
      'error',
      () => rejectPromise(new Error('FR201 CDP connection failed.')),
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

function pearson(entries, key) {
  if (entries.length < 2) return null;
  const xs = entries.map((entry) => entry.referenceWidthByObjHeight);
  const ys = entries.map((entry) => entry[key]);
  const mx = xs.reduce((sum, value) => sum + value, 0) / xs.length;
  const my = ys.reduce((sum, value) => sum + value, 0) / ys.length;
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

function spearman(entries, key) {
  if (entries.length < 2) return null;
  const xr = rank(entries.map((entry) => entry.referenceWidthByObjHeight));
  const yr = rank(entries.map((entry) => entry[key]));
  const ranked = entries.map((_, index) => ({
    referenceWidthByObjHeight: xr[index],
    rankMetric: yr[index],
  }));
  return pearson(ranked, 'rankMetric');
}

function summarize(entries) {
  return {
    sampleCount: entries.length,
    metricFixed234454WidthByHeight: {
      pearson: pearson(entries, 'metricFixed234454WidthByHeight'),
      spearman: spearman(entries, 'metricFixed234454WidthByHeight'),
    },
    metricBandEnvelopeWidthByHeight: {
      pearson: pearson(entries, 'metricBandEnvelopeWidthByHeight'),
      spearman: spearman(entries, 'metricBandEnvelopeWidthByHeight'),
    },
    metricFullOvalWidthByHeight: {
      pearson: pearson(entries, 'metricFullOvalWidthByHeight'),
      spearman: spearman(entries, 'metricFullOvalWidthByHeight'),
    },
    metricFixed234454EuclideanByHeight: {
      pearson: pearson(entries, 'metricFixed234454EuclideanByHeight'),
      spearman: spearman(entries, 'metricFixed234454EuclideanByHeight'),
    },
  };
}

async function main() {
  const bundlePath = fileURLToPath(import.meta.resolve('@mediapipe/tasks-vision'));
  const packageRoot = dirname(bundlePath);
  const packageJson = JSON.parse(await readFile(join(packageRoot, 'package.json'), 'utf8'));
  if (packageJson.version !== PACKAGE_VERSION) {
    throw new Error(`FR201 package version drift: ${packageJson.version}`);
  }
  if (sha256(await readFile(bundlePath)) !== EXPECTED_PACKAGE_BUNDLE_DIGEST) {
    throw new Error('FR201 package bundle digest drift.');
  }

  const metadataBytes = await download(METADATA_URL);
  const metadataDigest = sha256(metadataBytes);
  const metadata = parseMetadata(metadataBytes.toString('utf8'));

  const wasmDir = join(packageRoot, 'wasm');
  for (const name of await readdir(wasmDir)) {
    const path = join(wasmDir, name);
    if (!(await stat(path)).isFile()) {
      throw new Error(`FR201 unexpected non-file WASM entry: ${name}`);
    }
  }

  const scratch = await mkdtemp(join(tmpdir(), 'myeongha-fr201-'));
  try {
    const modelPath = join(scratch, 'face_landmarker.task');
    const modelBytes = await download(MODEL_URL, modelPath);
    if (sha256(modelBytes) !== EXPECTED_MODEL_DIGEST) {
      throw new Error('FR201 model digest drift.');
    }

    const imageDir = join(scratch, 'images');
    await mkdir(imageDir);
    const inputs = [];
    const referenceFailures = [];

    for (const sampleId of FR199_PUBLIC_CORPUS) {
      const { repository, commit } = sourceFor(sampleId);
      try {
        const objResponse = await globalThis.fetch(
          `https://raw.githubusercontent.com/${repository}/${commit}/3D-models/${sampleId}.obj`,
          { headers: { 'user-agent': 'myeongha-fr201-metric-face-geometry' } },
        );
        if (!objResponse.ok) throw new Error(`OBJ HTTP ${objResponse.status}`);
        const objText = await objResponse.text();
        const reference = deriveAndFreezeIndependentZygionReferenceFR199({
          sampleId,
          objText,
          objDigest: sha256(Buffer.from(objText, 'utf8')),
        });
        const vertices = parseObjVerticesFR199(objText);
        const ys = vertices.map((entry) => entry.y);
        const objHeight = Math.max(...ys) - Math.min(...ys);
        if (!(objHeight > 0)) throw new Error('OBJ height must be positive.');
        const referenceWidth = Math.abs(
          reference.bilateralReference[0].x - reference.bilateralReference[1].x,
        );

        const imagePath = join(imageDir, `${sampleId}.png`);
        const imageBytes = await download(
          `https://raw.githubusercontent.com/${repository}/${commit}/2D-photos/${sampleId}.png`,
          imagePath,
        );
        inputs.push({
          sampleId,
          imagePath: `/assets/images/${sampleId}.png`,
          imageDigest: sha256(imageBytes),
          referenceWidthByObjHeight: referenceWidth / objHeight,
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
        if (url.pathname === '/fr201.html') path = null;
        else if (url.pathname === '/vendor/vision_bundle.mjs') path = bundlePath;
        else if (url.pathname.startsWith('/vendor/wasm/')) {
          path = join(wasmDir, url.pathname.slice('/vendor/wasm/'.length));
        } else if (url.pathname === '/assets/face_landmarker.task') path = modelPath;
        else if (url.pathname.startsWith('/assets/images/')) {
          path = join(imageDir, url.pathname.slice('/assets/images/'.length));
        } else if (url.pathname.startsWith('/dist/')) {
          path = join(ROOT, '.face-reading-dist', url.pathname.slice('/dist/'.length));
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
          res.end('<!doctype html><html><body>FR201</body></html>');
          return;
        }
        const safe = normalize(path);
        const allowed = [ROOT, packageRoot, scratch].some(
          (prefix) => safe === prefix || safe.startsWith(prefix + '/'),
        );
        if (!allowed) throw new Error(`FR201 refusing path outside allowed roots: ${safe}`);
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
      if (!address || typeof address === 'string') throw new Error('FR201 server has no port.');
      const pageUrl = `http://127.0.0.1:${address.port}/fr201.html`;
      const chrome = findChrome();
      child = spawn(
        chrome.path,
        [
          '--headless=new',
          '--no-sandbox',
          '--disable-gpu',
          '--disable-dev-shm-usage',
          '--disable-background-networking',
          '--disable-component-update',
          '--disable-default-apps',
          '--disable-extensions',
          '--no-first-run',
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
  const canonical = ${JSON.stringify(metadata.canonical)};
  const weights = ${JSON.stringify(metadata.weights)};
  const fileset = await vision.FilesetResolver.forVisionTasks(location.origin + '/vendor/wasm');
  const landmarker = await vision.FaceLandmarker.createFromOptions(fileset, {
    baseOptions: { modelAssetPath: location.origin + '/assets/face_landmarker.task' },
    runningMode: 'IMAGE',
    numFaces: 1,
    outputFaceBlendshapes: false,
    outputFacialTransformationMatrixes: true,
  });

  const mean = (landmarks, indices) => ({
    x: indices.reduce((sum, index) => sum + landmarks[index].x, 0) / indices.length,
    y: indices.reduce((sum, index) => sum + landmarks[index].y, 0) / indices.length,
    z: indices.reduce((sum, index) => sum + landmarks[index].z, 0) / indices.length,
  });
  const maxMatrixDelta = (a, b) => {
    if (!a || !b || a.length !== 16 || b.length !== 16) return null;
    return Math.max(...a.map((value, index) => Math.abs(value - b[index])));
  };

  const receipts = [];
  const failures = [];
  try {
    for (const input of inputs) {
      try {
        const image = new Image();
        image.src = input.imagePath;
        await image.decode();
        const raw = landmarker.detect(image);
        if (raw.faceLandmarks.length !== 1) throw new Error('FR201 requires exactly one face.');
        if (raw.facialTransformationMatrixes.length !== 1) {
          throw new Error('FR201 requires exactly one native face-geometry transform.');
        }
        const screen = raw.faceLandmarks[0].slice(0, 468);
        const converted = metric.convertScreenLandmarksToMetricFR201({
          screenLandmarks: screen,
          canonicalMetricLandmarks: canonical,
          landmarkWeights: weights,
          frameWidth: image.naturalWidth,
          frameHeight: image.naturalHeight,
        });
        const landmarks = converted.metricLandmarksCanonicalAligned;
        const oval = envelope.FR200_FACE_OVAL_VERTICES.map((index) => ({ index, ...landmarks[index] }));
        const ovalYs = oval.map((point) => point.y);
        const ovalXs = oval.map((point) => point.x);
        const faceHeight = Math.max(...ovalYs) - Math.min(...ovalYs);
        if (!(faceHeight > 0)) throw new Error('FR201 metric face height must be positive.');

        const leftEye = mean(landmarks, envelope.FR200_LEFT_EYE_VERTICES);
        const rightEye = mean(landmarks, envelope.FR200_RIGHT_EYE_VERTICES);
        const eyeLineY = (leftEye.y + rightEye.y) / 2;
        const lip = mean(landmarks, envelope.FR200_LIP_VERTICES);
        const halfwayY = eyeLineY + (lip.y - eyeLineY) / 2;
        const bandMinY = Math.min(eyeLineY, halfwayY);
        const bandMaxY = Math.max(eyeLineY, halfwayY);
        const band = oval.filter((point) => point.y >= bandMinY && point.y <= bandMaxY);
        if (band.length < 2) throw new Error('FR201 metric midface band is too sparse.');

        const bandXs = band.map((point) => point.x);
        const fixed234 = landmarks[234];
        const fixed454 = landmarks[454];
        const dx = fixed454.x - fixed234.x;
        const dy = fixed454.y - fixed234.y;
        const dz = fixed454.z - fixed234.z;

        receipts.push({
          sampleId: input.sampleId,
          imageDigest: input.imageDigest,
          imageDimensions: [image.naturalWidth, image.naturalHeight],
          referenceWidthByObjHeight: input.referenceWidthByObjHeight,
          metricFixed234454WidthByHeight: Math.abs(dx) / faceHeight,
          metricFixed234454EuclideanByHeight: Math.hypot(dx, dy, dz) / faceHeight,
          metricBandEnvelopeWidthByHeight: (Math.max(...bandXs) - Math.min(...bandXs)) / faceHeight,
          metricFullOvalWidthByHeight: (Math.max(...ovalXs) - Math.min(...ovalXs)) / faceHeight,
          bandPointCount: band.length,
          firstIterationScale: converted.firstIterationScale,
          secondIterationScale: converted.secondIterationScale,
          totalUnprojectionScale: converted.totalUnprojectionScale,
          nativePoseParityMaxAbsDelta: maxMatrixDelta(
            converted.poseTransform.matrixColumnMajor,
            Array.from(raw.facialTransformationMatrixes[0].data),
          ),
          authority: {
            providerIndexAdmissionAuthorized: converted.providerIndexAdmissionAuthorized,
            anatomicalZygionClaimAuthorized: converted.anatomicalZygionClaimAuthorized,
            productionAuthorized: converted.productionAuthorized,
            commerceAuthorized: converted.commerceAuthorized,
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
        timeout: 120000,
      });
      if (evaluation.exceptionDetails) {
        throw new Error(`FR201 browser exception: ${JSON.stringify(evaluation.exceptionDetails)}`);
      }
      const result = evaluation.result?.value;
      if (!result || !Array.isArray(result.receipts) || !Array.isArray(result.failures)) {
        throw new Error(`FR201 invalid browser result: ${JSON.stringify(result)}`);
      }
      if (
        result.receipts.some(
          (entry) =>
            entry.authority?.providerIndexAdmissionAuthorized !== false ||
            entry.authority?.anatomicalZygionClaimAuthorized !== false ||
            entry.authority?.productionAuthorized !== false ||
            entry.authority?.commerceAuthorized !== false,
        )
      ) {
        throw new Error('FR201 receipt violated authority boundary.');
      }

      const poseDeltas = result.receipts
        .map((entry) => entry.nativePoseParityMaxAbsDelta)
        .filter((value) => Number.isFinite(value));
      const artifact = {
        schemaVersion: 'fr201-public-mediapipe-metric-face-geometry-experiment-v1',
        authorityState: 'research_metric_geometry_only',
        status: result.receipts.length === inputs.length ? 'executed_complete' : 'executed_partial',
        mediapipeSourceCommit: MEDIAPIPE_COMMIT,
        metadataUrl: METADATA_URL,
        metadataDigest,
        packageVersion: PACKAGE_VERSION,
        chrome: chrome.version,
        corpusCount: FR199_PUBLIC_CORPUS.length,
        independentReferenceReadyCount: inputs.length,
        referenceFailures,
        providerSuccessCount: result.receipts.length,
        providerFailureCount: result.failures.length,
        providerFailures: result.failures,
        algorithm: {
          lineage: 'Apache-2.0 MediaPipe ScreenToMetricSpaceConverter port',
          verticalFovDegrees: 63,
          nearCm: 1,
          farCm: 10000,
          procrustesBasisCount: metadata.weights.length,
          canonicalLandmarkCount: metadata.canonical.length,
          outputSpace: 'pose-removed canonical-aligned metric 3D',
        },
        poseParity: {
          count: poseDeltas.length,
          meanMaxAbsDelta:
            poseDeltas.length === 0
              ? null
              : poseDeltas.reduce((sum, value) => sum + value, 0) / poseDeltas.length,
          maxMaxAbsDelta: poseDeltas.length === 0 ? null : Math.max(...poseDeltas),
        },
        correlations: summarize(result.receipts),
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
        join(artifactDir, 'fr201-public-mediapipe-metric-face-geometry-experiment.json'),
        `${JSON.stringify(artifact, null, 2)}\n`,
        'utf8',
      );
      process.stdout.write(
        `${JSON.stringify({
          status: artifact.status,
          metadataDigest: artifact.metadataDigest,
          independentReferenceReadyCount: artifact.independentReferenceReadyCount,
          referenceFailures: artifact.referenceFailures,
          providerSuccessCount: artifact.providerSuccessCount,
          providerFailures: artifact.providerFailures,
          poseParity: artifact.poseParity,
          correlations: artifact.correlations,
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
