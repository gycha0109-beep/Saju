import { Buffer } from 'node:buffer';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import {
  existsSync,
  mkdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { createServer } from 'node:http';
import {
  dirname,
  extname,
  relative,
  resolve,
  sep,
} from 'node:path';
import process from 'node:process';
import { fileURLToPath, URL } from 'node:url';

const RELEASE_COMMIT = 'f8ef212d5c962c0e853db7e59d217056b187084b';
const METADATA_PATH = 'mediapipe/tasks/cc/vision/face_geometry/data/geometry_pipeline_metadata_landmarks.pbtxt';
const METADATA_BLOB_SHA = '252a7b05b24c5c43c5b94179393639f7c9a2fe8f';
const METADATA_URL = 'https://raw.githubusercontent.com/google-ai-edge/mediapipe/' + RELEASE_COMMIT + '/' + METADATA_PATH;
const HOST = '127.0.0.1';
const DEFAULT_PORT = 4316;
const SMOKE = process.env.MYEONGHWA_MESH6J_SMOKE === '1';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(scriptDir, '..');
const faceDist = resolve(repoRoot, '.face-reading-dist');
const pagePath = resolve(repoRoot, 'tools/face-geometry/capture/mesh6j-operator-capture.html');
const clientPath = resolve(repoRoot, 'tools/face-geometry/capture/mesh6j-operator-capture.mjs');
const cacheDir = resolve(repoRoot, '.cache/face-geometry/mesh6j');
const canonicalObj = resolve(cacheDir, 'mediapipe-canonical-face.obj');
const gnmHead = resolve(cacheDir, 'gnm_head.npz');
const ontology = resolve(cacheDir, 'gnm-provider-region-ontology.json');
const weightedAdapter = resolve(cacheDir, 'mediapipe468-weighted-region-adapter.json');
const metadataFile = resolve(cacheDir, 'geometry_pipeline_metadata_landmarks.pbtxt');

function fail(message) {
  throw new Error('MESH6J ' + message);
}

function runPython(script, args) {
  const executable = process.env.PYTHON?.trim() || 'python';
  const result = spawnSync(executable, [script, ...args], {
    cwd: repoRoot,
    encoding: 'utf8',
    stdio: SMOKE ? 'pipe' : 'inherit',
  });
  if (result.error) {
    fail('failed to execute ' + executable + ': ' + result.error.message);
  }
  if (result.status !== 0) {
    const detail = SMOKE ? '\n' + (result.stderr || result.stdout || '') : '';
    fail('asset preparation command failed: ' + script + detail);
  }
}

function gitBlobSha(data) {
  const prefix = Buffer.from('blob ' + data.length + '\0', 'utf8');
  return createHash('sha1').update(prefix).update(data).digest('hex');
}

async function fetchExactMetadata() {
  const response = await globalThis.fetch(METADATA_URL, {
    headers: { 'user-agent': 'MyeongHa-MESH6J/1.0' },
  });
  if (!response.ok) {
    fail('geometry metadata fetch failed with HTTP ' + response.status + '.');
  }
  const bytes = Buffer.from(await response.arrayBuffer());
  const actual = gitBlobSha(bytes);
  if (actual !== METADATA_BLOB_SHA) {
    fail('geometry metadata Git blob SHA mismatch: expected=' + METADATA_BLOB_SHA + ' actual=' + actual + '.');
  }
  writeFileSync(metadataFile, bytes);
}

async function prepareRuntimeAssets() {
  if (!existsSync(faceDist)) {
    fail('compiled Face Reading modules are missing; run npm run face:build before starting MESH6J.');
  }
  mkdirSync(cacheDir, { recursive: true });

  runPython('tools/face-reading/blender/fetch_mediapipe_canonical_face.py', [
    '--output', canonicalObj,
  ]);
  runPython('tools/face-geometry/gnm/fetch_gnm_head.py', [
    '--output', gnmHead,
  ]);
  runPython('tools/face-geometry/gnm/export_gnm_region_ontology.py', [
    '--npz', gnmHead,
    '--output', ontology,
  ]);
  runPython('tools/face-geometry/gnm/project_gnm_regions_to_mediapipe468_weighted.py', [
    '--mediapipe-obj', canonicalObj,
    '--gnm-npz', gnmHead,
    '--source-regions', ontology,
    '--output', weightedAdapter,
  ]);
  await fetchExactMetadata();

  const adapter = JSON.parse(readFileSync(weightedAdapter, 'utf8'));
  if (
    adapter.schemaVersion !== 'face-geometry-mediapipe468-weighted-region-adapter-v2'
    || adapter.targetVertexCount !== 468
    || adapter.assignment?.hardPartition !== false
    || adapter.assignment?.overlapAllowed !== true
    || adapter.assignment?.semanticSideAssignmentEncoded !== false
    || adapter.policy?.productNeutral !== true
    || adapter.policy?.productionMetricAuthorized !== false
    || adapter.policy?.anatomicalDiagnosticClaim !== false
  ) {
    fail('generated MESH5.1 adapter authority boundary drift.');
  }

  const canonicalBytes = readFileSync(canonicalObj);
  const canonicalAssetDigest = 'sha256:' + createHash('sha256').update(canonicalBytes).digest('hex');

  return Object.freeze({
    canonicalAssetDigest,
    weightedAdapter,
    metadataFile,
  });
}

function findPackageRoot(entryPath) {
  let current = dirname(entryPath);
  for (;;) {
    const packageJson = resolve(current, 'package.json');
    if (existsSync(packageJson)) {
      try {
        const parsed = JSON.parse(readFileSync(packageJson, 'utf8'));
        if (parsed.name === '@mediapipe/tasks-vision') return current;
      } catch {
        // Ignore malformed unrelated package metadata while walking upward.
      }
    }
    const parent = dirname(current);
    if (parent === current) break;
    current = parent;
  }
  fail('could not locate @mediapipe/tasks-vision package root from ' + entryPath + '.');
}

function safeChild(root, requested) {
  const decoded = decodeURIComponent(requested);
  const full = resolve(root, decoded);
  if (full !== root && !full.startsWith(root + sep)) return null;
  return full;
}

function mime(path) {
  switch (extname(path)) {
    case '.html': return 'text/html; charset=utf-8';
    case '.mjs':
    case '.js': return 'text/javascript; charset=utf-8';
    case '.json': return 'application/json; charset=utf-8';
    case '.pbtxt':
    case '.txt': return 'text/plain; charset=utf-8';
    case '.wasm': return 'application/wasm';
    case '.map': return 'application/json; charset=utf-8';
    default: return 'application/octet-stream';
  }
}

function sendFile(response, path) {
  if (!existsSync(path) || !statSync(path).isFile()) {
    response.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
    response.end('not found');
    return;
  }
  response.writeHead(200, {
    'content-type': mime(path),
    'cache-control': 'no-store',
    'x-content-type-options': 'nosniff',
  });
  response.end(readFileSync(path));
}

async function main() {
  const prepared = await prepareRuntimeAssets();
  const visionEntry = fileURLToPath(import.meta.resolve('@mediapipe/tasks-vision'));
  const visionRoot = findPackageRoot(visionEntry);
  const visionEntryRelative = relative(visionRoot, visionEntry).split(sep).join('/');
  const importMapTarget = '/vendor/tasks-vision/' + visionEntryRelative;

  const pageTemplate = readFileSync(pagePath, 'utf8');
  if (!pageTemplate.includes('__MEDIAPIPE_ENTRY__')) {
    fail('operator page import-map placeholder is missing.');
  }
  const pageHtml = pageTemplate.replaceAll('__MEDIAPIPE_ENTRY__', importMapTarget);

  const server = createServer((request, response) => {
    const rawUrl = request.url || '/';
    const url = new URL(rawUrl, 'http://' + HOST);
    if (request.method !== 'GET') {
      response.writeHead(405, { 'content-type': 'text/plain; charset=utf-8', allow: 'GET' });
      response.end('method not allowed');
      return;
    }

    if (url.pathname === '/' || url.pathname === '/index.html') {
      response.writeHead(200, {
        'content-type': 'text/html; charset=utf-8',
        'cache-control': 'no-store',
        'content-security-policy':
          "default-src 'self' https://cdn.jsdelivr.net https://storage.googleapis.com https://raw.githubusercontent.com; " +
          "script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; connect-src 'self' https://cdn.jsdelivr.net https://storage.googleapis.com https://raw.githubusercontent.com; " +
          "img-src 'self' blob: data:; media-src 'self' blob:; style-src 'self' 'unsafe-inline'; worker-src 'self' blob:;",
        'permissions-policy': 'camera=(self)',
        'x-content-type-options': 'nosniff',
      });
      response.end(pageHtml);
      return;
    }

    if (url.pathname === '/capture.mjs') {
      sendFile(response, clientPath);
      return;
    }

    if (url.pathname === '/runtime/config.json') {
      response.writeHead(200, {
        'content-type': 'application/json; charset=utf-8',
        'cache-control': 'no-store',
        'x-content-type-options': 'nosniff',
      });
      response.end(JSON.stringify({
        schemaVersion: 'mesh6j-localhost-runtime-config-v1',
        releaseCommit: RELEASE_COMMIT,
        canonicalAssetDigest: prepared.canonicalAssetDigest,
        geometryMetadataBlobSha: METADATA_BLOB_SHA,
        authorityState: 'localhost_manual_research_capture_only',
        rawCapturePersistenceEnabled: false,
        calibrationAuthorized: false,
        productionMorphologyAuthorized: false,
      }));
      return;
    }

    if (url.pathname === '/runtime/geometry-metadata.pbtxt') {
      sendFile(response, prepared.metadataFile);
      return;
    }

    if (url.pathname === '/runtime/weighted-adapter.json') {
      sendFile(response, prepared.weightedAdapter);
      return;
    }

    if (url.pathname.startsWith('/face/')) {
      const path = safeChild(faceDist, url.pathname.slice('/face/'.length));
      if (path === null) {
        response.writeHead(400);
        response.end('invalid path');
        return;
      }
      sendFile(response, path);
      return;
    }

    if (url.pathname.startsWith('/vendor/tasks-vision/')) {
      const path = safeChild(visionRoot, url.pathname.slice('/vendor/tasks-vision/'.length));
      if (path === null) {
        response.writeHead(400);
        response.end('invalid path');
        return;
      }
      sendFile(response, path);
      return;
    }

    response.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
    response.end('not found');
  });

  const requestedPort = SMOKE ? 0 : Number(process.env.MESH6J_PORT || DEFAULT_PORT);
  if (!Number.isInteger(requestedPort) || requestedPort < 0 || requestedPort > 65535) {
    fail('MESH6J_PORT must be an integer between 0 and 65535.');
  }

  await new Promise((resolveListen, rejectListen) => {
    server.once('error', rejectListen);
    server.listen(requestedPort, HOST, resolveListen);
  });

  const address = server.address();
  if (address === null || typeof address === 'string') fail('unexpected localhost server address.');
  const base = 'http://' + HOST + ':' + address.port;

  if (SMOKE) {
    try {
      const required = [
        '/',
        '/capture.mjs',
        '/runtime/config.json',
        '/runtime/geometry-metadata.pbtxt',
        '/runtime/weighted-adapter.json',
        '/face/mesh6h-browser-camera-frame-source.js',
        '/face/mesh6i-manual-browser-capture-controller.js',
        importMapTarget,
      ];
      for (const route of required) {
        const response = await globalThis.fetch(base + route);
        if (!response.ok) fail('smoke route failed: ' + route + ' HTTP ' + response.status + '.');
        const bytes = Buffer.from(await response.arrayBuffer());
        if (bytes.length === 0) fail('smoke route returned an empty payload: ' + route + '.');
      }
      const config = await (await globalThis.fetch(base + '/runtime/config.json')).json();
      if (
        config.schemaVersion !== 'mesh6j-localhost-runtime-config-v1'
        || config.rawCapturePersistenceEnabled !== false
        || config.calibrationAuthorized !== false
        || config.productionMorphologyAuthorized !== false
      ) {
        fail('smoke runtime config authority boundary drift.');
      }
      process.stdout.write(JSON.stringify({
        status: 'MESH6J_LOCALHOST_CAPTURE_SURFACE_PASS',
        localhostOnly: true,
        requiredRoutesVerified: true,
        exactMetadataVerified: true,
        weightedAdapterRegenerated: true,
        rawCapturePersistenceEnabled: false,
        calibrationAuthorized: false,
        productionMorphologyAuthorized: false,
      }) + '\n');
    } finally {
      await new Promise((resolveClose, rejectClose) => {
        server.close((error) => error ? rejectClose(error) : resolveClose());
      });
    }
    return;
  }

  process.stdout.write('MESH6J manual research capture surface: ' + base + '/\n');
  process.stdout.write('Camera data remains in-memory; only the descriptive session JSON can be exported by the page.\n');
}

await main();
