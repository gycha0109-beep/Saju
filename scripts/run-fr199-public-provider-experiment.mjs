import { createHash } from 'node:crypto';
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
  parseObjVerticesFR199,
} from '../.face-reading-dist/face-reading-public-synthetic-zygion-correspondence-fr199.js';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const MODEL_URL = 'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task';
const PACKAGE_VERSION = '0.10.35';
const EXPECTED_PACKAGE_BUNDLE_DIGEST = 'sha256:55d7ab624fbb70dcc5adc4ae6d7ea9cfcb569139d3dbfbf2b1deafcb966bc0fe';
const EXPECTED_MODEL_DIGEST = 'sha256:64184e229b263107bc2b804c6625db1341ff2bb731874b0bcc2fe6544e0bc9ff';
const CDP_PORT = 9223;

function sha256(bytes) {
  return `sha256:${createHash('sha256').update(bytes).digest('hex')}`;
}
async function download(url, path) {
  const response = await fetch(url, { redirect: 'follow', headers: { 'user-agent': 'myeongha-fr199-provider-experiment' } });
  if (!response.ok) throw new Error(`FR199 download failed ${response.status} ${url}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  await writeFile(path, bytes);
  return bytes;
}
function sourceFor(sampleId) {
  const male = sampleId.startsWith('male-');
  return {
    repository: male ? FR199_MALE_DATASET_REPOSITORY : FR199_FEMALE_DATASET_REPOSITORY,
    commit: male ? FR199_MALE_DATASET_COMMIT : FR199_FEMALE_DATASET_COMMIT,
  };
}

function objIndex(rawIndex, length) {
  const parsed = Number(rawIndex);
  if (!Number.isInteger(parsed) || parsed === 0) throw new Error(`FR199 invalid OBJ index: ${rawIndex}`);
  return parsed > 0 ? parsed - 1 : length + parsed;
}
function deriveObjMaterialUvBridge(objText, reference, sampleId, mtlText) {
  const expectedMtl = `${sampleId}.mtl`;
  const expectedTexture = `${sampleId}.jpg`;
  const vertices = [];
  const texcoords = [];
  const vertexToTexcoordIndices = new Map();
  let declaredMtl = null;
  for (const line of objText.split(/\r?\n/)) {
    if (line.startsWith('mtllib ')) declaredMtl = line.trim().slice('mtllib '.length);
    else if (line.startsWith('v ')) {
      const [, x, y, z] = line.trim().split(/\s+/);
      vertices.push({ x: Number(x), y: Number(y), z: Number(z) });
    } else if (line.startsWith('vt ')) {
      const [, u, v] = line.trim().split(/\s+/);
      texcoords.push({ u: Number(u), v: Number(v) });
    } else if (line.startsWith('f ')) {
      for (const token of line.trim().split(/\s+/).slice(1)) {
        const [rawVertexIndex, rawTexcoordIndex] = token.split('/');
        if (!rawTexcoordIndex) continue;
        const vertexIndex = objIndex(rawVertexIndex, vertices.length);
        const texcoordIndex = objIndex(rawTexcoordIndex, texcoords.length);
        const refs = vertexToTexcoordIndices.get(vertexIndex) ?? [];
        refs.push(texcoordIndex);
        vertexToTexcoordIndices.set(vertexIndex, refs);
      }
    }
  }
  if (declaredMtl !== expectedMtl) throw new Error(`FR199 OBJ/MTL binding drift for ${sampleId}: ${declaredMtl}`);
  const mapKd = mtlText.split(/\r?\n/).map((line) => line.trim()).find((line) => line.startsWith('map_Kd '));
  if (mapKd?.slice('map_Kd '.length).trim() !== expectedTexture) {
    throw new Error(`FR199 MTL texture binding drift for ${sampleId}: ${mapKd ?? 'missing map_Kd'}`);
  }
  const points = reference.bilateralReference.map((point) => {
    const vertexIndex = vertices.findIndex((vertex) =>
      vertex.x === point.x && vertex.y === point.y && vertex.z === point.z
    );
    if (vertexIndex < 0) throw new Error(`FR199 reference point is not an exact OBJ vertex for ${sampleId}`);
    const refs = vertexToTexcoordIndices.get(vertexIndex) ?? [];
    const unique = [];
    const seen = new Set();
    for (const texcoordIndex of refs) {
      const uv = texcoords[texcoordIndex];
      if (!uv || !Number.isFinite(uv.u) || !Number.isFinite(uv.v)) {
        throw new Error(`FR199 invalid OBJ texture coordinate for ${sampleId}`);
      }
      const key = `${uv.u}:${uv.v}`;
      if (!seen.has(key)) {
        seen.add(key);
        unique.push({ texcoordIndex1: texcoordIndex + 1, u: uv.u, v: uv.v });
      }
    }
    return {
      referencePoint: point,
      objVertexIndex1: vertexIndex + 1,
      incidentTextureReferenceCount: refs.length,
      uniqueTextureCoordinates: unique,
      exactSingleTextureCoordinate: unique.length === 1 ? unique[0] : null,
    };
  });
  return {
    schemaVersion: 'fr199-obj-material-uv-bridge-v1',
    sampleId,
    sourceFrame: 'source_exact_obj_vertex_xyz',
    intermediateFrame: 'obj_material_texture_uv',
    textureBinding: {
      objMtllib: declaredMtl,
      mtlMapKd: expectedTexture,
    },
    normalization: {
      u: 'OBJ vt u preserved',
      v: 'OBJ vt v preserved in receipt',
      topLeftImageCandidate: 'x=u; y=1-v',
    },
    projectionAssumptions: [
      'This is an OBJ material UV parameterization bridge, not a recovered camera projection.',
      'Top-left raster comparison uses x=u and y=1-v as an explicit image-origin convention assumption.',
    ],
    providerCandidateVisibleDuringBridgeDerivation: false,
    points,
    exactSingleUvPerReference: points.every((point) => point.exactSingleTextureCoordinate !== null),
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
    if (probe.status === 0) return { path: candidate, version: probe.stdout.trim() || probe.stderr.trim() };
  }
  throw new Error('FR199 requires Chrome/Chromium.');
}
function mime(path) {
  switch (extname(path)) {
    case '.html': return 'text/html; charset=utf-8';
    case '.js':
    case '.mjs': return 'text/javascript; charset=utf-8';
    case '.wasm': return 'application/wasm';
    case '.png': return 'image/png';
    case '.jpg':
    case '.jpeg': return 'image/jpeg';
    case '.task': return 'application/octet-stream';
    default: return 'application/octet-stream';
  }
}
const delay = (ms) => new Promise((resolvePromise) => setTimeout(resolvePromise, ms));
async function waitForPageTarget(pageUrl) {
  const deadline = Date.now() + 15000;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(`http://127.0.0.1:${CDP_PORT}/json/list`);
      if (response.ok) {
        const targets = await response.json();
        const target = targets.find((entry) => entry.type === 'page' && entry.url === pageUrl);
        if (target?.webSocketDebuggerUrl) return target.webSocketDebuggerUrl;
      }
    } catch {}
    await delay(100);
  }
  throw new Error('FR199 could not discover Chrome DevTools target.');
}
async function connectCdp(wsUrl) {
  const ws = new WebSocket(wsUrl);
  await new Promise((resolvePromise, rejectPromise) => {
    ws.addEventListener('open', resolvePromise, { once: true });
    ws.addEventListener('error', () => rejectPromise(new Error('FR199 CDP connection failed.')), { once: true });
  });
  let nextId = 1;
  const pending = new Map();
  ws.addEventListener('message', (event) => {
    const message = JSON.parse(String(event.data));
    if (message.id === undefined) return;
    const waiter = pending.get(message.id);
    if (!waiter) return;
    pending.delete(message.id);
    if (message.error) waiter.reject(new Error(`CDP ${waiter.method} failed: ${JSON.stringify(message.error)}`));
    else waiter.resolve(message.result);
  });
  function command(method, params = {}) {
    const id = nextId++;
    return new Promise((resolvePromise, rejectPromise) => {
      pending.set(id, { resolve: resolvePromise, reject: rejectPromise, method });
      ws.send(JSON.stringify({ id, method, params }));
    });
  }
  await command('Runtime.enable');
  return { ws, command };
}

async function main() {
  const bundlePath = fileURLToPath(import.meta.resolve('@mediapipe/tasks-vision'));
  const packageRoot = dirname(bundlePath);
  const packageJson = JSON.parse(await readFile(join(packageRoot, 'package.json'), 'utf8'));
  if (packageJson.version !== PACKAGE_VERSION) throw new Error(`FR199 package version drift: ${packageJson.version}`);
  if (sha256(await readFile(bundlePath)) !== EXPECTED_PACKAGE_BUNDLE_DIGEST) throw new Error('FR199 package bundle digest drift.');
  const wasmDir = join(packageRoot, 'wasm');
  for (const name of await readdir(wasmDir)) {
    const path = join(wasmDir, name);
    if (!(await stat(path)).isFile()) throw new Error(`FR199 unexpected non-file WASM entry: ${name}`);
  }

  const scratch = await mkdtemp(join(tmpdir(), 'myeongha-fr199-'));
  try {
    const modelPath = join(scratch, 'face_landmarker.task');
    const modelBytes = await download(MODEL_URL, modelPath);
    if (sha256(modelBytes) !== EXPECTED_MODEL_DIGEST) throw new Error('FR199 model digest drift.');

    const imageDir = join(scratch, 'images');
    await mkdir(imageDir);
    const references = [];
    const referenceFailures = [];

    for (const sampleId of FR199_PUBLIC_CORPUS) {
      const { repository, commit } = sourceFor(sampleId);
      try {
        const objResponse = await fetch(`https://raw.githubusercontent.com/${repository}/${commit}/3D-models/${sampleId}.obj`);
        if (!objResponse.ok) throw new Error(`OBJ HTTP ${objResponse.status}`);
        const objText = await objResponse.text();
        const reference = deriveAndFreezeIndependentZygionReferenceFR199({
          sampleId,
          objText,
          objDigest: sha256(Buffer.from(objText, 'utf8')),
        });
        const objVertices = parseObjVerticesFR199(objText);
        const xs = objVertices.map((point) => point.x);
        const objBoundingWidth = Math.max(...xs) - Math.min(...xs);
        const referenceWidth = Math.abs(reference.bilateralReference[0].x - reference.bilateralReference[1].x);
        const referenceNormalizedWidth = referenceWidth / objBoundingWidth;
        const mtlResponse = await fetch(`https://raw.githubusercontent.com/${repository}/${commit}/3D-models/${sampleId}.mtl`);
        if (!mtlResponse.ok) throw new Error(`MTL HTTP ${mtlResponse.status}`);
        const mtlText = await mtlResponse.text();
        const uvBridge = deriveObjMaterialUvBridge(objText, reference, sampleId, mtlText);
        const textureImagePath = join(imageDir, `${sampleId}.jpg`);
        const textureImageBytes = await download(
          `https://raw.githubusercontent.com/${repository}/${commit}/3D-models/${sampleId}.jpg`,
          textureImagePath,
        );
        const imagePath = join(imageDir, `${sampleId}.png`);
        const imageBytes = await download(
          `https://raw.githubusercontent.com/${repository}/${commit}/2D-photos/${sampleId}.png`,
          imagePath,
        );
        references.push({
          reference,
          imageDigest: sha256(imageBytes),
          imagePath: `/assets/images/${sampleId}.png`,
          textureImageDigest: sha256(textureImageBytes),
          textureImagePath: `/assets/images/${sampleId}.jpg`,
          uvBridge,
          referenceNormalizedWidth,
        });
      } catch (error) {
        referenceFailures.push({ sampleId, error: error instanceof Error ? error.message : String(error) });
      }
    }

    const server = createServer(async (req, res) => {
      try {
        const url = new URL(req.url ?? '/', 'http://127.0.0.1');
        let path;
        if (url.pathname === '/fr199.html') path = null;
        else if (url.pathname === '/vendor/vision_bundle.mjs') path = bundlePath;
        else if (url.pathname.startsWith('/vendor/wasm/')) path = join(wasmDir, url.pathname.slice('/vendor/wasm/'.length));
        else if (url.pathname === '/assets/face_landmarker.task') path = modelPath;
        else if (url.pathname.startsWith('/assets/images/')) path = join(imageDir, url.pathname.slice('/assets/images/'.length));
        else if (url.pathname.startsWith('/dist/')) path = join(ROOT, '.face-reading-dist', url.pathname.slice('/dist/'.length));
        else { res.writeHead(404); res.end('not found'); return; }

        if (path === null) {
          res.writeHead(200, { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' });
          res.end('<!doctype html><html><body>FR199</body></html>');
          return;
        }
        const safe = normalize(path);
        const allowed = [ROOT, packageRoot, scratch].some((prefix) => safe === prefix || safe.startsWith(prefix + '/'));
        if (!allowed) throw new Error(`FR199 refusing path outside allowed roots: ${safe}`);
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
      if (!address || typeof address === 'string') throw new Error('FR199 server has no port.');
      const pageUrl = `http://127.0.0.1:${address.port}/fr199.html`;
      const chrome = findChrome();
      child = spawn(chrome.path, [
        '--headless=new','--no-sandbox','--disable-gpu','--disable-dev-shm-usage',
        '--disable-background-networking','--disable-component-update','--disable-default-apps','--disable-extensions',
        '--no-first-run',`--remote-debugging-port=${CDP_PORT}`,'--remote-allow-origins=*',
        `--user-data-dir=${join(scratch, 'chrome-profile')}`,pageUrl,
      ], { stdio: ['ignore','ignore','pipe'] });

      const wsUrl = await waitForPageTarget(pageUrl);
      cdp = await connectCdp(wsUrl);
      const expression = `
(async () => {
  const [{ sanitizeMediaPipeProviderObservationFR61 }, { issueDescriptiveZygionCorrespondenceFR199 }, vision] = await Promise.all([
    import('/dist/production-neutral-observation-provider-fr61.js'),
    import('/dist/face-reading-public-synthetic-zygion-correspondence-fr199.js'),
    import('/vendor/vision_bundle.mjs'),
  ]);
  const deepFreeze = (value) => {
    if (value && typeof value === 'object' && !Object.isFrozen(value)) {
      Object.freeze(value);
      for (const child of Object.values(value)) deepFreeze(child);
    }
    return value;
  };
  const inputs = ${JSON.stringify(references)};
  const fileset = await vision.FilesetResolver.forVisionTasks(location.origin + '/vendor/wasm');
  const landmarker = await vision.FaceLandmarker.createFromOptions(fileset, {
    baseOptions: { modelAssetPath: location.origin + '/assets/face_landmarker.task' },
    runningMode: 'IMAGE',
    numFaces: 1,
    outputFaceBlendshapes: false,
    outputFacialTransformationMatrixes: false,
  });
  const receipts = [];
  const failures = [];
  const textureReceipts = [];
  const textureFailures = [];
  const unorderedPairDistance = (referencePoints, providerPoints) => {
    const distance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
    const direct = [
      distance(referencePoints[0], providerPoints[0]),
      distance(referencePoints[1], providerPoints[1]),
    ];
    const swapped = [
      distance(referencePoints[0], providerPoints[1]),
      distance(referencePoints[1], providerPoints[0]),
    ];
    const directSum = direct[0] + direct[1];
    const swappedSum = swapped[0] + swapped[1];
    return {
      direct: { distances: direct, sum: directSum },
      swapped: { distances: swapped, sum: swappedSum },
      descriptiveUnorderedMinimum: directSum <= swappedSum
        ? { assignment: 'reference_order_to_234_454', distances: direct, sum: directSum }
        : { assignment: 'reference_order_to_454_234', distances: swapped, sum: swappedSum },
    };
  };
  try {
    for (const input of inputs) {
      try {
        const image = new Image();
        image.src = input.imagePath;
        await image.decode();
        const raw = landmarker.detect(image);
        const frame = sanitizeMediaPipeProviderObservationFR61(raw, {
          providerRunRef: 'fr199:public:' + input.reference.sampleId,
          canonicalAssetDigest: input.imageDigest,
        });
        const receipt = issueDescriptiveZygionCorrespondenceFR199(deepFreeze(input.reference), frame);
        receipts.push({
          sampleId: receipt.sampleId,
          imageDigest: input.imageDigest,
          imageDimensions: [image.naturalWidth, image.naturalHeight],
          detectedFaceCount: raw.faceLandmarks.length,
          detectedLandmarkCount: raw.faceLandmarks[0]?.length ?? 0,
          provider: receipt.provider,
          referenceNormalizedWidth: input.referenceNormalizedWidth,
          providerNormalizedWidth: Math.abs(receipt.provider.unorderedCandidatePair[0].x - receipt.provider.unorderedCandidatePair[1].x),
          authority: {
            coordinateFrameCorrespondenceResolved: receipt.coordinateFrameCorrespondenceResolved,
            numericDistanceAuthorized: receipt.numericDistanceAuthorized,
            providerIndexAdmissionAuthorized: receipt.providerIndexAdmissionAuthorized,
            productionAuthorized: receipt.productionAuthorized,
            commerceAuthorized: receipt.commerceAuthorized,
          },
        });
      } catch (error) {
        failures.push({ sampleId: input.reference.sampleId, error: error instanceof Error ? error.message : String(error) });
      }
      try {
        if (!input.uvBridge.exactSingleUvPerReference) {
          throw new Error('FR199 texture bridge has ambiguous or missing UV coordinates.');
        }
        const image = new Image();
        image.src = input.textureImagePath;
        await image.decode();
        const raw = landmarker.detect(image);
        const frame = sanitizeMediaPipeProviderObservationFR61(raw, {
          providerRunRef: 'fr199:texture:' + input.reference.sampleId,
          canonicalAssetDigest: input.textureImageDigest,
        });
        const receipt = issueDescriptiveZygionCorrespondenceFR199(deepFreeze(input.reference), frame);
        const topLeftUvReference = input.uvBridge.points.map((point) => ({
          x: point.exactSingleTextureCoordinate.u,
          y: 1 - point.exactSingleTextureCoordinate.v,
        }));
        const providerPoints = receipt.provider.unorderedCandidatePair.map((point) => ({ x: point.x, y: point.y }));
        const pairDistance = unorderedPairDistance(topLeftUvReference, providerPoints);
        const assignedCandidateIndices = pairDistance.descriptiveUnorderedMinimum.assignment === 'reference_order_to_454_234'
          ? [454, 234]
          : [234, 454];
        const providerCandidateRanks = topLeftUvReference.map((referencePoint, referenceOrdinal) => {
          const ranked = frame.providerOrderedPoints
            .map((point, index) => ({
              index,
              distance: Math.hypot(referencePoint.x - point.x, referencePoint.y - point.y),
            }))
            .sort((a, b) => a.distance - b.distance || a.index - b.index);
          const assignedCandidateIndex = assignedCandidateIndices[referenceOrdinal];
          const assignedCandidateRankZeroBased = ranked.findIndex((entry) => entry.index === assignedCandidateIndex);
          if (assignedCandidateRankZeroBased < 0) throw new Error('FR199 assigned provider candidate missing from ranking.');
          return {
            referenceOrdinal,
            assignedCandidateIndex,
            assignedCandidateRankOneBased: assignedCandidateRankZeroBased + 1,
            assignedCandidateDistance: ranked[assignedCandidateRankZeroBased].distance,
            nearestProviderLandmarks: ranked.slice(0, 10),
          };
        });
        textureReceipts.push({
          sampleId: receipt.sampleId,
          textureImageDigest: input.textureImageDigest,
          textureImageDimensions: [image.naturalWidth, image.naturalHeight],
          detectedFaceCount: raw.faceLandmarks.length,
          detectedLandmarkCount: raw.faceLandmarks[0]?.length ?? 0,
          uvBridge: input.uvBridge,
          topLeftUvReference,
          provider: receipt.provider,
          descriptiveNormalizedImageDistances: pairDistance,
          providerCandidateRanks,
          authority: {
            bridgeKind: 'obj_material_uv_parameterization_not_camera_projection',
            imageOriginConventionAssumption: 'x=u; y=1-v',
            anatomicalSideAssignment: null,
            numericAcceptanceThresholdAuthorized: false,
            providerIndexAdmissionAuthorized: false,
            productionAuthorized: false,
            commerceAuthorized: false,
          },
        });
      } catch (error) {
        textureFailures.push({ sampleId: input.reference.sampleId, error: error instanceof Error ? error.message : String(error) });
      }
    }
  } finally {
    landmarker.close();
  }
  return { receipts, failures, textureReceipts, textureFailures };
})()`;
      const evaluation = await cdp.command('Runtime.evaluate', {
        expression, awaitPromise: true, returnByValue: true, timeout: 120000,
      });
      if (evaluation.exceptionDetails) throw new Error(`FR199 browser exception: ${JSON.stringify(evaluation.exceptionDetails)}`);
      const result = evaluation.result?.value;
      if (
        !result ||
        !Array.isArray(result.receipts) ||
        !Array.isArray(result.failures) ||
        !Array.isArray(result.textureReceipts) ||
        !Array.isArray(result.textureFailures)
      ) {
        throw new Error(`FR199 invalid browser result: ${JSON.stringify(result)}`);
      }
      if (result.receipts.some((entry) =>
        entry.detectedFaceCount !== 1 ||
        entry.detectedLandmarkCount < 455 ||
        entry.provider?.runtimePackageVersion !== PACKAGE_VERSION ||
        entry.authority?.providerIndexAdmissionAuthorized !== false ||
        entry.authority?.productionAuthorized !== false ||
        entry.authority?.commerceAuthorized !== false
      )) throw new Error('FR199 provider receipt violated runtime or authority boundary.');

      const pairedWidths = result.receipts.map((entry) => ({
        sampleId: entry.sampleId,
        referenceNormalizedWidth: entry.referenceNormalizedWidth,
        providerNormalizedWidth: entry.providerNormalizedWidth,
      }));
      const pearson = (pairs) => {
        if (pairs.length < 2) return null;
        const xs = pairs.map((pair) => pair.referenceNormalizedWidth);
        const ys = pairs.map((pair) => pair.providerNormalizedWidth);
        const mx = xs.reduce((sum, value) => sum + value, 0) / xs.length;
        const my = ys.reduce((sum, value) => sum + value, 0) / ys.length;
        let numerator = 0;
        let dx2 = 0;
        let dy2 = 0;
        for (let index = 0; index < pairs.length; index += 1) {
          const dx = xs[index] - mx;
          const dy = ys[index] - my;
          numerator += dx * dy;
          dx2 += dx * dx;
          dy2 += dy * dy;
        }
        const denominator = Math.sqrt(dx2 * dy2);
        return denominator === 0 ? null : numerator / denominator;
      };
      const artifact = {
        schemaVersion: 'fr199-public-provider-experiment-v1',
        status: result.receipts.length > 0 ? 'executed' : 'no_provider_receipts',
        packageVersion: PACKAGE_VERSION,
        chrome: chrome.version,
        corpusCount: FR199_PUBLIC_CORPUS.length,
        independentReferenceReadyCount: references.length,
        referenceFailures,
        providerSuccessCount: result.receipts.length,
        providerFailureCount: result.failures.length,
        providerFailures: result.failures,
        textureBridgeSuccessCount: result.textureReceipts.length,
        textureBridgeFailureCount: result.textureFailures.length,
        textureBridgeFailures: result.textureFailures,
        textureBridgeReceipts: result.textureReceipts,
        pairedWidths,
        descriptiveNormalizedWidthPearson: pearson(pairedWidths),
        receipts: result.receipts,
        providerIndexAdmissionAuthorized: false,
      };
      const artifactDir = join(ROOT, 'artifacts', 'face-reading');
      await mkdir(artifactDir, { recursive: true });
      await writeFile(join(artifactDir, 'fr199-public-provider-experiment.json'), `${JSON.stringify(artifact, null, 2)}\n`, 'utf8');
      process.stdout.write(`${JSON.stringify({
        status: artifact.status,
        corpusCount: artifact.corpusCount,
        independentReferenceReadyCount: artifact.independentReferenceReadyCount,
        referenceFailureCount: artifact.referenceFailures.length,
        providerSuccessCount: artifact.providerSuccessCount,
        providerFailureCount: artifact.providerFailureCount,
        providerFailures: artifact.providerFailures,
        textureBridgeSuccessCount: artifact.textureBridgeSuccessCount,
        textureBridgeFailureCount: artifact.textureBridgeFailureCount,
        textureBridgeFailures: artifact.textureBridgeFailures,
        textureBridgeReceipts: artifact.textureBridgeReceipts,
        pairedWidths: artifact.pairedWidths,
        descriptiveNormalizedWidthPearson: artifact.descriptiveNormalizedWidthPearson,
        providerIndexAdmissionAuthorized: false,
      })}\n`);
      if (result.receipts.length === 0) process.exitCode = 1;
    } finally {
      if (cdp) cdp.ws.close();
      if (child && child.exitCode === null) child.kill('SIGKILL');
      await new Promise((resolvePromise) => server.close(resolvePromise));
    }
  } finally {
    await rm(scratch, { recursive: true, force: true });
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.stack ?? error.message : String(error));
  process.exitCode = 1;
});
