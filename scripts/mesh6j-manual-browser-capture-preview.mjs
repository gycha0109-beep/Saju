import { Buffer } from 'node:buffer';
import { spawn, spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import {
  existsSync,
  mkdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { createServer } from 'node:http';
import { createServer as createSecureServer, request as httpsRequest } from 'node:https';
import { networkInterfaces } from 'node:os';
import {
  dirname,
  extname,
  relative,
  resolve,
  sep,
} from 'node:path';
import process from 'node:process';
import { fileURLToPath, URL } from 'node:url';
import { assertLanRequestAllowed } from './mesh6j-private-lan-transport.mjs';

const RELEASE_COMMIT = 'f8ef212d5c962c0e853db7e59d217056b187084b';
const METADATA_PATH = 'mediapipe/tasks/cc/vision/face_geometry/data/geometry_pipeline_metadata_landmarks.pbtxt';
const METADATA_BLOB_SHA = '252a7b05b24c5c43c5b94179393639f7c9a2fe8f';
const METADATA_URL = 'https://raw.githubusercontent.com/google-ai-edge/mediapipe/' + RELEASE_COMMIT + '/' + METADATA_PATH;
const PARITY_INPUT_PATH = 'mediapipe/tasks/testdata/vision/face_blendshapes_in_landmarks.prototxt';
const PARITY_INPUT_BLOB_SHA = 'ea2e60eefaf6a5c13aee4bb468384edab7e7d5d7';
const PARITY_INPUT_URL = 'https://raw.githubusercontent.com/google-ai-edge/mediapipe/' + RELEASE_COMMIT + '/' + PARITY_INPUT_PATH;
const LOCALHOST_HOST = '127.0.0.1';
const LAN_HOST = '0.0.0.0';
const DEFAULT_PORT = 4316;
const SMOKE = process.env.MYEONGHWA_MESH6J_SMOKE === '1';
const LAN_SMOKE = process.env.MYEONGHWA_MESH6J_LAN_SMOKE === '1';
const LAN_MODE = process.env.MESH6J_LAN === '1' || LAN_SMOKE;

const scriptDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(scriptDir, '..');
const faceDist = resolve(repoRoot, '.face-reading-dist');
const pagePath = resolve(repoRoot, 'tools/face-geometry/capture/mesh6j-operator-capture.html');
const clientPath = resolve(repoRoot, 'tools/face-geometry/capture/mesh6j-operator-capture.mjs');
const fr251PagePath = resolve(repoRoot, 'tools/face-geometry/capture/fr251-dry-run-operator.html');
const fr251ClientPath = resolve(repoRoot, 'tools/face-geometry/capture/fr251-dry-run-operator.mjs');
const fr255PagePath = resolve(repoRoot, 'tools/face-geometry/capture/fr255-repeatability-observation.html');
const fr255ClientPath = resolve(repoRoot, 'tools/face-geometry/capture/fr255-repeatability-observation.mjs');
const fr274PagePath = resolve(repoRoot, 'tools/face-geometry/capture/fr274-still-image-diagnostic.html');
const fr274ClientPath = resolve(repoRoot, 'tools/face-geometry/capture/fr274-still-image-diagnostic.mjs');
const fr279PagePath = resolve(repoRoot, 'tools/face-geometry/capture/fr279-still-image-eye-chord-decomposition.html');
const fr279ClientPath = resolve(repoRoot, 'tools/face-geometry/capture/fr279-still-image-eye-chord-decomposition.mjs');
const fr281PagePath = resolve(repoRoot, 'tools/face-geometry/capture/fr281-still-image-metric-eye-chord.html');
const fr281ClientPath = resolve(repoRoot, 'tools/face-geometry/capture/fr281-still-image-metric-eye-chord.mjs');
const fr283PagePath = resolve(repoRoot, 'tools/face-geometry/capture/fr283-still-image-fr76-eye-chord-propagation.html');
const fr283ClientPath = resolve(repoRoot, 'tools/face-geometry/capture/fr283-still-image-fr76-eye-chord-propagation.mjs');
const fr104MirrorPagePath = resolve(repoRoot, 'tools/face-geometry/capture/fr104-ear-mirror-pair.html');
const fr104MirrorClientPath = resolve(repoRoot, 'tools/face-geometry/capture/fr104-ear-mirror-pair.mjs');
const fr104MirrorMultiPagePath = resolve(repoRoot, 'tools/face-geometry/capture/fr104-ear-mirror-multifixture.html');
const fr104MirrorMultiClientPath = resolve(repoRoot, 'tools/face-geometry/capture/fr104-ear-mirror-multifixture.mjs');
const fr104MakeHumanPreflightPagePath = resolve(repoRoot, 'tools/face-geometry/capture/fr104-makehuman-provider-preflight.html');
const fr104MakeHumanPreflightClientPath = resolve(repoRoot, 'tools/face-geometry/capture/fr104-makehuman-provider-preflight.mjs');
const fr104MakeHumanTransformPagePath = resolve(repoRoot, 'tools/face-geometry/capture/fr104-makehuman-transform-diagnostics.html');
const fr104MakeHumanTransformClientPath = resolve(repoRoot, 'tools/face-geometry/capture/fr104-makehuman-transform-diagnostics.mjs');
const fr104MakeHumanRotationDependencePagePath = resolve(repoRoot, 'tools/face-geometry/capture/fr104-makehuman-provider-rotation-dependence.html');
const fr104MakeHumanRotationDependenceClientPath = resolve(repoRoot, 'tools/face-geometry/capture/fr104-makehuman-provider-rotation-dependence.mjs');
const fr104MakeHumanRotationCompensationPagePath = resolve(repoRoot, 'tools/face-geometry/capture/fr104-makehuman-provider-rotation-compensation.html');
const fr104MakeHumanRotationCompensationClientPath = resolve(repoRoot, 'tools/face-geometry/capture/fr104-makehuman-provider-rotation-compensation.mjs');
const fr104ProspectiveComposedOrientationPagePath = resolve(repoRoot, 'tools/face-geometry/capture/fr104-provider-composed-orientation-validation.html');
const fr104ProspectiveComposedOrientationClientPath = resolve(repoRoot, 'tools/face-geometry/capture/fr104-provider-composed-orientation-validation.mjs');
const fr104FlorenceRunnerPath = resolve(repoRoot, 'tools/face-reading/ear/run_florence2_ear_empirical.py');
const cacheDir = resolve(repoRoot, '.cache/face-geometry/mesh6j');
const canonicalObj = resolve(cacheDir, 'mediapipe-canonical-face.obj');
const gnmHead = resolve(cacheDir, 'gnm_head.npz');
const ontology = resolve(cacheDir, 'gnm-provider-region-ontology.json');
const weightedAdapter = resolve(cacheDir, 'mediapipe468-weighted-region-adapter.json');
const metadataFile = resolve(cacheDir, 'geometry_pipeline_metadata_landmarks.pbtxt');
const parityInputFile = resolve(cacheDir, 'fr76-parity-input.prototxt');
const fr104MakeHumanFixture = resolve(cacheDir, 'fr104-makehuman-u1-2.png');
const FR104_MAKEHUMAN_FIXTURE_SHA256 =
  'f72a976d90d61223b8ad273d8d8da98ecd6ed0d1a63dff08ded358eef54e92bb';

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

async function fetchExactRemoteAsset(url, expectedBlobSha, outputPath, label) {
  const response = await globalThis.fetch(url, {
    headers: { 'user-agent': 'MyeongHa-MESH6J/1.0' },
  });
  if (!response.ok) {
    fail(label + ' fetch failed with HTTP ' + response.status + '.');
  }
  const bytes = Buffer.from(await response.arrayBuffer());
  const actual = gitBlobSha(bytes);
  if (actual !== expectedBlobSha) {
    fail(label + ' Git blob SHA mismatch: expected=' + expectedBlobSha + ' actual=' + actual + '.');
  }
  writeFileSync(outputPath, bytes);
}

async function fetchExactMetadata() {
  await fetchExactRemoteAsset(METADATA_URL, METADATA_BLOB_SHA, metadataFile, 'geometry metadata');
}

async function fetchExactParityInput() {
  await fetchExactRemoteAsset(PARITY_INPUT_URL, PARITY_INPUT_BLOB_SHA, parityInputFile, 'FR76 parity input');
}

function fileSha256(path) {
  return createHash('sha256').update(readFileSync(path)).digest('hex');
}

function ensureFr104MakeHumanFixture() {
  mkdirSync(cacheDir, { recursive: true });
  if (
    existsSync(fr104MakeHumanFixture)
    && statSync(fr104MakeHumanFixture).isFile()
    && fileSha256(fr104MakeHumanFixture)
      === FR104_MAKEHUMAN_FIXTURE_SHA256
  ) {
    return;
  }

  const renderResult = spawnSync(
    process.execPath,
    [
      'scripts/verify-fr104-makehuman-deterministic-render.mjs',
      '--write-render=' + fr104MakeHumanFixture,
    ],
    {
      cwd: repoRoot,
      encoding: 'utf8',
      stdio: 'pipe',
    },
  );
  if (renderResult.error) {
    fail(
      'FR104 MakeHuman fixture materialization failed: '
        + renderResult.error.message,
    );
  }
  if (renderResult.status !== 0) {
    fail(
      'FR104 MakeHuman fixture materialization failed.\n'
        + (renderResult.stderr || renderResult.stdout || ''),
    );
  }
  if (
    !existsSync(fr104MakeHumanFixture)
    || !statSync(fr104MakeHumanFixture).isFile()
  ) {
    fail('FR104 MakeHuman fixture was not materialized.');
  }
  const observed = fileSha256(fr104MakeHumanFixture);
  if (observed !== FR104_MAKEHUMAN_FIXTURE_SHA256) {
    fail(
      'FR104 MakeHuman fixture SHA-256 mismatch: expected='
        + FR104_MAKEHUMAN_FIXTURE_SHA256
        + ' observed='
        + observed,
    );
  }
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
  await Promise.all([
    fetchExactMetadata(),
    fetchExactParityInput(),
  ]);

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
    parityInputFile,
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
    case '.png': return 'image/png';
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

function requireLanTlsConfig() {
  if (!LAN_MODE) return null;
  const keyPath = process.env.MESH6J_TLS_KEY?.trim();
  const certPath = process.env.MESH6J_TLS_CERT?.trim();
  if (!keyPath || !certPath) {
    fail('LAN mode requires MESH6J_TLS_KEY and MESH6J_TLS_CERT.');
  }
  if (!existsSync(keyPath) || !statSync(keyPath).isFile()) {
    fail('LAN TLS key path does not exist or is not a file.');
  }
  if (!existsSync(certPath) || !statSync(certPath).isFile()) {
    fail('LAN TLS certificate path does not exist or is not a file.');
  }
  return Object.freeze({
    key: readFileSync(keyPath),
    cert: readFileSync(certPath),
  });
}

function privateLanUrls(port) {
  const urls = [];
  for (const entries of Object.values(networkInterfaces())) {
    for (const entry of entries || []) {
      if (entry.family !== 'IPv4' || entry.internal) continue;
      const octets = entry.address.split('.').map(Number);
      const [a, b] = octets;
      const isPrivate =
        a === 10 ||
        (a === 172 && b >= 16 && b <= 31) ||
        (a === 192 && b === 168) ||
        (a === 169 && b === 254);
      if (isPrivate) urls.push('https://' + entry.address + ':' + port + '/');
    }
  }
  return Object.freeze(urls);
}

function smokeHttpsGet(url) {
  return new Promise((resolveRequest, rejectRequest) => {
    const request = httpsRequest(url, { rejectUnauthorized: false }, (response) => {
      const chunks = [];
      response.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
      response.on('end', () => {
        resolveRequest(Object.freeze({
          ok: response.statusCode !== undefined && response.statusCode >= 200 && response.statusCode < 300,
          status: response.statusCode ?? 0,
          body: Buffer.concat(chunks),
        }));
      });
    });
    request.once('error', rejectRequest);
    request.end();
  });
}


const FR104_FLORENCE_HOST_SCHEMA =
  'fr104-florence-rgba-host-request-v1';
const FR104_FLORENCE_MAX_RGBA_BYTES = 64 * 1024 * 1024;

function fr104Header(request, name) {
  const value = request.headers[name];
  if (Array.isArray(value)) return value[0] ?? '';
  return typeof value === 'string' ? value : '';
}

function fr104PositiveIntegerHeader(request, name) {
  const raw = fr104Header(request, name);
  if (!/^[1-9][0-9]*$/u.test(raw)) {
    throw new Error(name + ' must be a positive integer header.');
  }
  const value = Number(raw);
  if (!Number.isSafeInteger(value) || value <= 0) {
    throw new Error(name + ' exceeds the safe integer range.');
  }
  return value;
}

function fr104ProviderRunRef(request) {
  const value = fr104Header(request, 'x-fr104-provider-run-ref');
  if (!/^[A-Za-z0-9][A-Za-z0-9._:/-]{0,255}$/u.test(value)) {
    throw new Error(
      'x-fr104-provider-run-ref must be a bounded opaque reference.',
    );
  }
  return value;
}

function readFr104ExactBody(request, expectedLength) {
  return new Promise((resolveBody, rejectBody) => {
    const chunks = [];
    let observed = 0;
    const reject = (error) => {
      request.removeAllListeners('data');
      request.removeAllListeners('end');
      rejectBody(error);
    };
    request.on('data', (chunk) => {
      const bytes = Buffer.from(chunk);
      observed += bytes.length;
      if (observed > expectedLength) {
        reject(
          new Error(
            'FR104 Florence request body exceeds declared byte length.',
          ),
        );
        request.destroy();
        return;
      }
      chunks.push(bytes);
    });
    request.on('end', () => {
      if (observed !== expectedLength) {
        rejectBody(
          new Error(
            'FR104 Florence request body length does not match the exact RGBA declaration.',
          ),
        );
        return;
      }
      resolveBody(Buffer.concat(chunks, observed));
    });
    request.on('error', rejectBody);
  });
}

function invokeFr104FlorenceHostOnce(input) {
  return new Promise((resolveInvocation, rejectInvocation) => {
    const executable = process.env.PYTHON?.trim() || 'python';
    const child = spawn(
      executable,
      [
        fr104FlorenceRunnerPath,
        '--stdio-rgba-host-once',
        '--device',
        process.env.FR104_FLORENCE_DEVICE?.trim() || 'auto',
      ],
      {
        cwd: repoRoot,
        stdio: ['pipe', 'pipe', 'pipe'],
        windowsHide: true,
      },
    );

    const stdoutChunks = [];
    const stderrChunks = [];
    let stdoutLength = 0;
    let stderrLength = 0;
    let settled = false;

    const settleError = (error) => {
      if (settled) return;
      settled = true;
      rejectInvocation(error);
    };

    child.on('error', (error) => {
      settleError(
        new Error(
          'failed to start local Florence host: ' + error.message,
        ),
      );
    });
    child.stdout.on('data', (chunk) => {
      if (stdoutLength <= 1024 * 1024) {
        const bytes = Buffer.from(chunk);
        stdoutLength += bytes.length;
        stdoutChunks.push(bytes);
      }
    });
    child.stderr.on('data', (chunk) => {
      if (stderrLength <= 64 * 1024) {
        const bytes = Buffer.from(chunk);
        stderrLength += bytes.length;
        stderrChunks.push(bytes);
      }
    });
    child.on('close', (code) => {
      if (settled) return;
      if (code !== 0) {
        settled = true;
        const detail = Buffer.concat(stderrChunks)
          .toString('utf8')
          .trim()
          .slice(0, 4096);
        rejectInvocation(
          new Error(
            'local Florence host exited with code '
              + code
              + (detail ? ': ' + detail : ''),
          ),
        );
        return;
      }

      try {
        const output = Buffer.concat(stdoutChunks).toString('utf8').trim();
        const parsed = JSON.parse(output);
        settled = true;
        resolveInvocation(parsed);
      } catch (error) {
        settleError(
          new Error(
            'local Florence host returned invalid JSON: '
              + (error instanceof Error ? error.message : String(error)),
          ),
        );
      }
    });

    const header = JSON.stringify({
      schemaVersion: FR104_FLORENCE_HOST_SCHEMA,
      providerRunRef: input.providerRunRef,
      width: input.width,
      height: input.height,
      byteLength: input.bytes.length,
      pixelFormat: 'rgba8',
    }) + '\n';

    child.stdin.on('error', settleError);
    child.stdin.write(header, 'utf8');
    child.stdin.end(input.bytes);
  });
}

async function handleFr104FlorenceRequest(request, response) {
  try {
    if (
      fr104Header(request, 'content-type').split(';', 1)[0].trim()
        !== 'application/octet-stream'
    ) {
      throw new Error(
        'FR104 Florence endpoint requires application/octet-stream.',
      );
    }
    if (
      fr104Header(request, 'x-fr104-schema-version')
        !== FR104_FLORENCE_HOST_SCHEMA
      || fr104Header(request, 'x-fr104-pixel-format') !== 'rgba8'
    ) {
      throw new Error('FR104 Florence request protocol headers are invalid.');
    }

    const width = fr104PositiveIntegerHeader(request, 'x-fr104-width');
    const height = fr104PositiveIntegerHeader(request, 'x-fr104-height');
    const declaredLength =
      fr104PositiveIntegerHeader(request, 'x-fr104-byte-length');
    const expectedLength = width * height * 4;
    if (
      !Number.isSafeInteger(expectedLength)
      || declaredLength !== expectedLength
    ) {
      throw new Error(
        'x-fr104-byte-length must equal width * height * 4.',
      );
    }
    if (declaredLength > FR104_FLORENCE_MAX_RGBA_BYTES) {
      throw new Error(
        'FR104 Florence request exceeds the local transport safety limit.',
      );
    }

    const contentLength = fr104Header(request, 'content-length');
    if (
      contentLength
      && (
        !/^[0-9]+$/u.test(contentLength)
        || Number(contentLength) !== declaredLength
      )
    ) {
      throw new Error(
        'Content-Length must match x-fr104-byte-length when supplied.',
      );
    }

    const providerRunRef = fr104ProviderRunRef(request);
    const bytes = await readFr104ExactBody(request, declaredLength);
    let result;
    try {
      result = await invokeFr104FlorenceHostOnce({
        bytes,
        width,
        height,
        providerRunRef,
      });
    } finally {
      bytes.fill(0);
    }

    response.writeHead(200, {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
      'x-content-type-options': 'nosniff',
    });
    response.end(JSON.stringify(result));
  } catch (error) {
    if (response.headersSent) {
      response.destroy(error instanceof Error ? error : undefined);
      return;
    }
    const message =
      error instanceof Error ? error.message : 'unknown Florence host error';
    response.writeHead(
      /model|torch|transformers|Pillow|start local Florence|exited/u.test(message)
        ? 503
        : 400,
      {
        'content-type': 'text/plain; charset=utf-8',
        'cache-control': 'no-store',
        'x-content-type-options': 'nosniff',
      },
    );
    response.end(message.slice(0, 4096));
  }
}

async function main() {
  const tls = requireLanTlsConfig();
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
  const fr251PageTemplate = readFileSync(fr251PagePath, 'utf8');
  if (!fr251PageTemplate.includes('__MEDIAPIPE_ENTRY__')) {
    fail('FR251 operator page import-map placeholder is missing.');
  }
  const fr251PageHtml = fr251PageTemplate.replaceAll('__MEDIAPIPE_ENTRY__', importMapTarget);
  const fr255PageHtml = readFileSync(fr255PagePath, 'utf8');
  const fr274PageTemplate = readFileSync(fr274PagePath, 'utf8');
  if (!fr274PageTemplate.includes('__MEDIAPIPE_ENTRY__')) {
    fail('FR274 operator page import-map placeholder is missing.');
  }
  const fr274PageHtml = fr274PageTemplate.replaceAll('__MEDIAPIPE_ENTRY__', importMapTarget);
  const fr279PageTemplate = readFileSync(fr279PagePath, 'utf8');
  if (!fr279PageTemplate.includes('__MEDIAPIPE_ENTRY__')) {
    fail('FR279 operator page import-map placeholder is missing.');
  }
  const fr279PageHtml = fr279PageTemplate.replaceAll('__MEDIAPIPE_ENTRY__', importMapTarget);
  const fr281PageTemplate = readFileSync(fr281PagePath, 'utf8');
  if (!fr281PageTemplate.includes('__MEDIAPIPE_ENTRY__')) fail('FR281 operator page import-map placeholder is missing.');
  const fr281PageHtml = fr281PageTemplate.replaceAll('__MEDIAPIPE_ENTRY__', importMapTarget);
  const fr283PageTemplate = readFileSync(fr283PagePath, 'utf8');
  if (!fr283PageTemplate.includes('__MEDIAPIPE_ENTRY__')) fail('FR283 operator page import-map placeholder is missing.');
  const fr283PageHtml = fr283PageTemplate.replaceAll('__MEDIAPIPE_ENTRY__', importMapTarget);
  const fr104MirrorPageTemplate = readFileSync(fr104MirrorPagePath, 'utf8');
  if (!fr104MirrorPageTemplate.includes('__MEDIAPIPE_ENTRY__')) fail('FR104 mirror-pair page import-map placeholder is missing.');
  const fr104MirrorPageHtml = fr104MirrorPageTemplate.replaceAll('__MEDIAPIPE_ENTRY__', importMapTarget);
  const fr104MirrorMultiPageTemplate = readFileSync(fr104MirrorMultiPagePath, 'utf8');
  if (!fr104MirrorMultiPageTemplate.includes('__MEDIAPIPE_ENTRY__')) fail('FR104 multi-fixture mirror page import-map placeholder is missing.');
  const fr104MirrorMultiPageHtml = fr104MirrorMultiPageTemplate.replaceAll('__MEDIAPIPE_ENTRY__', importMapTarget);
  const fr104MakeHumanPreflightPageTemplate = readFileSync(fr104MakeHumanPreflightPagePath, 'utf8');
  if (!fr104MakeHumanPreflightPageTemplate.includes('__MEDIAPIPE_ENTRY__')) fail('FR104 MakeHuman preflight page import-map placeholder is missing.');
  const fr104MakeHumanPreflightPageHtml = fr104MakeHumanPreflightPageTemplate.replaceAll('__MEDIAPIPE_ENTRY__', importMapTarget);
  const fr104MakeHumanTransformPageTemplate = readFileSync(fr104MakeHumanTransformPagePath, 'utf8');
  if (!fr104MakeHumanTransformPageTemplate.includes('__MEDIAPIPE_ENTRY__')) fail('FR104 MakeHuman transform diagnostics page import-map placeholder is missing.');
  const fr104MakeHumanTransformPageHtml = fr104MakeHumanTransformPageTemplate.replaceAll('__MEDIAPIPE_ENTRY__', importMapTarget);
  const fr104MakeHumanRotationDependencePageTemplate = readFileSync(fr104MakeHumanRotationDependencePagePath, 'utf8');
  if (!fr104MakeHumanRotationDependencePageTemplate.includes('__MEDIAPIPE_ENTRY__')) fail('FR104 MakeHuman provider rotation-dependence page import-map placeholder is missing.');
  const fr104MakeHumanRotationDependencePageHtml = fr104MakeHumanRotationDependencePageTemplate.replaceAll('__MEDIAPIPE_ENTRY__', importMapTarget);
  const fr104MakeHumanRotationCompensationPageTemplate = readFileSync(fr104MakeHumanRotationCompensationPagePath, 'utf8');
  if (!fr104MakeHumanRotationCompensationPageTemplate.includes('__MEDIAPIPE_ENTRY__')) fail('FR104 MakeHuman provider rotation-compensation page import-map placeholder is missing.');
  const fr104MakeHumanRotationCompensationPageHtml = fr104MakeHumanRotationCompensationPageTemplate.replaceAll('__MEDIAPIPE_ENTRY__', importMapTarget);
  const fr104ProspectiveComposedOrientationPageTemplate = readFileSync(fr104ProspectiveComposedOrientationPagePath, 'utf8');
  if (!fr104ProspectiveComposedOrientationPageTemplate.includes('__MEDIAPIPE_ENTRY__')) fail('FR104 U3.3 prospective composed-orientation page import-map placeholder is missing.');
  const fr104ProspectiveComposedOrientationPageHtml = fr104ProspectiveComposedOrientationPageTemplate.replaceAll('__MEDIAPIPE_ENTRY__', importMapTarget);

  const requestHandler = (request, response) => {
    if (LAN_MODE) {
      try {
        assertLanRequestAllowed(request.socket.remoteAddress);
      } catch {
        response.writeHead(403, { 'content-type': 'text/plain; charset=utf-8' });
        response.end('private LAN clients only');
        return;
      }
    }
    const rawUrl = request.url || '/';
    const url = new URL(rawUrl, (LAN_MODE ? 'https://' : 'http://') + (request.headers.host || LOCALHOST_HOST));
    if (
      request.method === 'POST'
      && url.pathname === '/runtime/fr104/florence'
    ) {
      void handleFr104FlorenceRequest(request, response);
      return;
    }

    if (request.method !== 'GET') {
      response.writeHead(405, {
        'content-type': 'text/plain; charset=utf-8',
        allow: 'GET, POST',
      });
      response.end('method not allowed');
      return;
    }

    if (url.pathname === '/' || url.pathname === '/index.html') {
      response.writeHead(200, {
        'content-type': 'text/html; charset=utf-8',
        'cache-control': 'no-store',
        'content-security-policy':
          "default-src 'self' https://cdn.jsdelivr.net https://storage.googleapis.com https://raw.githubusercontent.com; " +
          "script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval' https://cdn.jsdelivr.net; connect-src 'self' https://cdn.jsdelivr.net https://storage.googleapis.com https://raw.githubusercontent.com; " +
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

    if (url.pathname === '/fr251' || url.pathname === '/fr251/' || url.pathname === '/fr251/index.html') {
      response.writeHead(200, {
        'content-type': 'text/html; charset=utf-8',
        'cache-control': 'no-store',
        'content-security-policy':
          "default-src 'self' https://cdn.jsdelivr.net https://storage.googleapis.com https://raw.githubusercontent.com; " +
          "script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval' https://cdn.jsdelivr.net; connect-src 'self' https://cdn.jsdelivr.net https://storage.googleapis.com https://raw.githubusercontent.com; " +
          "img-src 'self' blob: data:; media-src 'self' blob:; style-src 'self' 'unsafe-inline'; worker-src 'self' blob:;",
        'permissions-policy': 'camera=(self)',
        'x-content-type-options': 'nosniff',
      });
      response.end(fr251PageHtml);
      return;
    }

    if (url.pathname === '/fr251/operator.mjs') {
      sendFile(response, fr251ClientPath);
      return;
    }

    if (url.pathname === '/fr255' || url.pathname === '/fr255/' || url.pathname === '/fr255/index.html') {
      response.writeHead(200, {
        'content-type': 'text/html; charset=utf-8',
        'cache-control': 'no-store',
        'content-security-policy':
          "default-src 'self'; script-src 'self'; connect-src 'self'; " +
          "img-src 'self' blob: data:; style-src 'self' 'unsafe-inline';",
        'permissions-policy': 'camera=()',
        'x-content-type-options': 'nosniff',
      });
      response.end(fr255PageHtml);
      return;
    }

    if (url.pathname === '/fr255/operator.mjs') {
      sendFile(response, fr255ClientPath);
      return;
    }

    if (url.pathname === '/fr274' || url.pathname === '/fr274/' || url.pathname === '/fr274/index.html') {
      response.writeHead(200, {
        'content-type': 'text/html; charset=utf-8',
        'cache-control': 'no-store',
        'content-security-policy':
          "default-src 'self' https://cdn.jsdelivr.net https://storage.googleapis.com https://raw.githubusercontent.com; " +
          "script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval' https://cdn.jsdelivr.net; connect-src 'self' https://cdn.jsdelivr.net https://storage.googleapis.com https://raw.githubusercontent.com; " +
          "img-src 'self' blob: data:; style-src 'self' 'unsafe-inline'; worker-src 'self' blob:;",
        'permissions-policy': 'camera=()',
        'x-content-type-options': 'nosniff',
      });
      response.end(fr274PageHtml);
      return;
    }

    if (url.pathname === '/fr274/operator.mjs') {
      sendFile(response, fr274ClientPath);
      return;
    }

    if (url.pathname === '/fr279' || url.pathname === '/fr279/' || url.pathname === '/fr279/index.html') {
      response.writeHead(200, {
        'content-type': 'text/html; charset=utf-8',
        'cache-control': 'no-store',
        'content-security-policy':
          "default-src 'self' https://cdn.jsdelivr.net https://storage.googleapis.com https://raw.githubusercontent.com; " +
          "script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval' https://cdn.jsdelivr.net; connect-src 'self' https://cdn.jsdelivr.net https://storage.googleapis.com https://raw.githubusercontent.com; " +
          "img-src 'self' blob: data:; style-src 'self' 'unsafe-inline'; worker-src 'self' blob:;",
        'permissions-policy': 'camera=()',
        'x-content-type-options': 'nosniff',
      });
      response.end(fr279PageHtml);
      return;
    }

    if (url.pathname === '/fr279/operator.mjs') {
      sendFile(response, fr279ClientPath);
      return;
    }

    if (url.pathname === '/fr281' || url.pathname === '/fr281/' || url.pathname === '/fr281/index.html') {
      response.writeHead(200, {
        'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store',
        'content-security-policy': "default-src 'self' https://cdn.jsdelivr.net https://storage.googleapis.com https://raw.githubusercontent.com; script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval' https://cdn.jsdelivr.net; connect-src 'self' https://cdn.jsdelivr.net https://storage.googleapis.com https://raw.githubusercontent.com; img-src 'self' blob: data:; style-src 'self' 'unsafe-inline'; worker-src 'self' blob:;",
        'permissions-policy': 'camera=()', 'x-content-type-options': 'nosniff',
      });
      response.end(fr281PageHtml); return;
    }
    if (url.pathname === '/fr281/operator.mjs') { sendFile(response, fr281ClientPath); return; }

    if (url.pathname === '/fr283' || url.pathname === '/fr283/' || url.pathname === '/fr283/index.html') {
      response.writeHead(200, {
        'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store',
        'content-security-policy': "default-src 'self' https://cdn.jsdelivr.net https://storage.googleapis.com https://raw.githubusercontent.com; script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval' https://cdn.jsdelivr.net; connect-src 'self' https://cdn.jsdelivr.net https://storage.googleapis.com https://raw.githubusercontent.com; img-src 'self' blob: data:; style-src 'self' 'unsafe-inline'; worker-src 'self' blob:;",
        'permissions-policy': 'camera=()', 'x-content-type-options': 'nosniff',
      });
      response.end(fr283PageHtml); return;
    }
    if (url.pathname === '/fr283/operator.mjs') { sendFile(response, fr283ClientPath); return; }

    if (url.pathname === '/fr104-mirror' || url.pathname === '/fr104-mirror/' || url.pathname === '/fr104-mirror/index.html') {
      response.writeHead(200, {
        'content-type': 'text/html; charset=utf-8',
        'cache-control': 'no-store',
        'content-security-policy': "default-src 'self' https://cdn.jsdelivr.net https://storage.googleapis.com; script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval' https://cdn.jsdelivr.net; connect-src 'self' https://cdn.jsdelivr.net https://storage.googleapis.com; img-src 'self' blob: data:; style-src 'self' 'unsafe-inline'; worker-src 'self' blob:;",
        'permissions-policy': 'camera=()',
        'x-content-type-options': 'nosniff',
      });
      response.end(fr104MirrorPageHtml);
      return;
    }
    if (url.pathname === '/fr104-mirror/operator.mjs') { sendFile(response, fr104MirrorClientPath); return; }

    if (url.pathname === '/fr104-mirror-multi' || url.pathname === '/fr104-mirror-multi/' || url.pathname === '/fr104-mirror-multi/index.html') {
      response.writeHead(200, {
        'content-type': 'text/html; charset=utf-8',
        'cache-control': 'no-store',
        'content-security-policy': "default-src 'self' https://cdn.jsdelivr.net https://storage.googleapis.com; script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval' https://cdn.jsdelivr.net; connect-src 'self' https://cdn.jsdelivr.net https://storage.googleapis.com; img-src 'self' blob: data:; style-src 'self' 'unsafe-inline'; worker-src 'self' blob:;",
        'permissions-policy': 'camera=()',
        'x-content-type-options': 'nosniff',
      });
      response.end(fr104MirrorMultiPageHtml);
      return;
    }
    if (url.pathname === '/fr104-mirror-multi/operator.mjs') { sendFile(response, fr104MirrorMultiClientPath); return; }

    if (url.pathname === '/fr104-makehuman-preflight' || url.pathname === '/fr104-makehuman-preflight/' || url.pathname === '/fr104-makehuman-preflight/index.html') {
      response.writeHead(200, {
        'content-type': 'text/html; charset=utf-8',
        'cache-control': 'no-store',
        'content-security-policy': "default-src 'self' https://cdn.jsdelivr.net https://storage.googleapis.com; script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval' https://cdn.jsdelivr.net; connect-src 'self' https://cdn.jsdelivr.net https://storage.googleapis.com; img-src 'self' blob: data:; style-src 'self' 'unsafe-inline'; worker-src 'self' blob:;",
        'permissions-policy': 'camera=()',
        'x-content-type-options': 'nosniff',
      });
      response.end(fr104MakeHumanPreflightPageHtml);
      return;
    }
    if (url.pathname === '/fr104-makehuman-preflight/operator.mjs') { sendFile(response, fr104MakeHumanPreflightClientPath); return; }
    if (url.pathname === '/fr104-makehuman-preflight/fixture.png') {
      try {
        ensureFr104MakeHumanFixture();
      } catch (error) {
        response.writeHead(500, {
          'content-type': 'text/plain; charset=utf-8',
          'cache-control': 'no-store',
          'x-content-type-options': 'nosniff',
        });
        response.end(
          error instanceof Error ? error.message : String(error),
        );
        return;
      }
      sendFile(response, fr104MakeHumanFixture);
      return;
    }

    if (
      url.pathname === '/fr104-makehuman-transform-diagnostics'
      || url.pathname === '/fr104-makehuman-transform-diagnostics/'
      || url.pathname === '/fr104-makehuman-transform-diagnostics/index.html'
    ) {
      response.writeHead(200, {
        'content-type': 'text/html; charset=utf-8',
        'cache-control': 'no-store',
        'content-security-policy': "default-src 'self' https://cdn.jsdelivr.net https://storage.googleapis.com; script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval' https://cdn.jsdelivr.net; connect-src 'self' https://cdn.jsdelivr.net https://storage.googleapis.com; img-src 'self' blob: data:; style-src 'self' 'unsafe-inline'; worker-src 'self' blob:;",
        'permissions-policy': 'camera=()',
        'x-content-type-options': 'nosniff',
      });
      response.end(fr104MakeHumanTransformPageHtml);
      return;
    }
    if (url.pathname === '/fr104-makehuman-transform-diagnostics/operator.mjs') {
      sendFile(response, fr104MakeHumanTransformClientPath);
      return;
    }
    if (url.pathname === '/fr104-makehuman-transform-diagnostics/fixture.png') {
      try {
        ensureFr104MakeHumanFixture();
      } catch (error) {
        response.writeHead(500, {
          'content-type': 'text/plain; charset=utf-8',
          'cache-control': 'no-store',
          'x-content-type-options': 'nosniff',
        });
        response.end(
          error instanceof Error ? error.message : String(error),
        );
        return;
      }
      sendFile(response, fr104MakeHumanFixture);
      return;
    }

    if (
      url.pathname === '/fr104-makehuman-provider-rotation-dependence'
      || url.pathname === '/fr104-makehuman-provider-rotation-dependence/'
      || url.pathname === '/fr104-makehuman-provider-rotation-dependence/index.html'
    ) {
      response.writeHead(200, {
        'content-type': 'text/html; charset=utf-8',
        'cache-control': 'no-store',
        'content-security-policy': "default-src 'self' https://cdn.jsdelivr.net https://storage.googleapis.com; script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval' https://cdn.jsdelivr.net; connect-src 'self' https://cdn.jsdelivr.net https://storage.googleapis.com; img-src 'self' blob: data:; style-src 'self' 'unsafe-inline'; worker-src 'self' blob:;",
        'permissions-policy': 'camera=()',
        'x-content-type-options': 'nosniff',
      });
      response.end(fr104MakeHumanRotationDependencePageHtml);
      return;
    }
    if (url.pathname === '/fr104-makehuman-provider-rotation-dependence/operator.mjs') {
      sendFile(response, fr104MakeHumanRotationDependenceClientPath);
      return;
    }
    if (url.pathname === '/fr104-makehuman-provider-rotation-dependence/fixture.png') {
      try {
        ensureFr104MakeHumanFixture();
      } catch (error) {
        response.writeHead(500, {
          'content-type': 'text/plain; charset=utf-8',
          'cache-control': 'no-store',
          'x-content-type-options': 'nosniff',
        });
        response.end(
          error instanceof Error ? error.message : String(error),
        );
        return;
      }
      sendFile(response, fr104MakeHumanFixture);
      return;
    }

    if (
      url.pathname === '/fr104-makehuman-provider-rotation-compensation'
      || url.pathname === '/fr104-makehuman-provider-rotation-compensation/'
      || url.pathname === '/fr104-makehuman-provider-rotation-compensation/index.html'
    ) {
      response.writeHead(200, {
        'content-type': 'text/html; charset=utf-8',
        'cache-control': 'no-store',
        'content-security-policy': "default-src 'self' https://cdn.jsdelivr.net https://storage.googleapis.com; script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval' https://cdn.jsdelivr.net; connect-src 'self' https://cdn.jsdelivr.net https://storage.googleapis.com; img-src 'self' blob: data:; style-src 'self' 'unsafe-inline'; worker-src 'self' blob:;",
        'permissions-policy': 'camera=()',
        'x-content-type-options': 'nosniff',
      });
      response.end(fr104MakeHumanRotationCompensationPageHtml);
      return;
    }
    if (url.pathname === '/fr104-makehuman-provider-rotation-compensation/operator.mjs') {
      sendFile(response, fr104MakeHumanRotationCompensationClientPath);
      return;
    }
    if (url.pathname === '/fr104-makehuman-provider-rotation-compensation/fixture.png') {
      try {
        ensureFr104MakeHumanFixture();
      } catch (error) {
        response.writeHead(500, {
          'content-type': 'text/plain; charset=utf-8',
          'cache-control': 'no-store',
          'x-content-type-options': 'nosniff',
        });
        response.end(
          error instanceof Error ? error.message : String(error),
        );
        return;
      }
      sendFile(response, fr104MakeHumanFixture);
      return;
    }

    if (
      url.pathname === '/fr104-provider-composed-orientation-validation'
      || url.pathname === '/fr104-provider-composed-orientation-validation/'
      || url.pathname === '/fr104-provider-composed-orientation-validation/index.html'
    ) {
      response.writeHead(200, {
        'content-type': 'text/html; charset=utf-8',
        'cache-control': 'no-store',
        'content-security-policy': "default-src 'self' https://cdn.jsdelivr.net https://storage.googleapis.com; script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval' https://cdn.jsdelivr.net; connect-src 'self' https://cdn.jsdelivr.net https://storage.googleapis.com; img-src 'self' blob: data:; style-src 'self' 'unsafe-inline'; worker-src 'self' blob:;",
        'permissions-policy': 'camera=()',
        'x-content-type-options': 'nosniff',
      });
      response.end(fr104ProspectiveComposedOrientationPageHtml);
      return;
    }
    if (url.pathname === '/fr104-provider-composed-orientation-validation/operator.mjs') {
      sendFile(response, fr104ProspectiveComposedOrientationClientPath);
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
        transportMode: LAN_MODE ? 'private_lan_https' : 'localhost_http',
        releaseCommit: RELEASE_COMMIT,
        canonicalAssetDigest: prepared.canonicalAssetDigest,
        geometryMetadataBlobSha: METADATA_BLOB_SHA,
        fr76ParityInputBlobSha: PARITY_INPUT_BLOB_SHA,
        authorityState: 'manual_research_capture_only',
        fr104FlorenceLocalTransport: {
          endpoint: '/runtime/fr104/florence',
          requestPixelFormat: 'rgba8',
          filePersistenceUsed: false,
          responseIncludesRawProviderOutput: false,
          responseIncludesRawCandidatePolygons: false,
          anatomicalLateralityAuthorized: false,
          productionAuthorization: false,
        },
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

    if (url.pathname === '/runtime/fr76-parity-input.prototxt') {
      sendFile(response, prepared.parityInputFile);
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
  };
  const server = LAN_MODE
    ? createSecureServer(tls, requestHandler)
    : createServer(requestHandler);

  const requestedPort = (SMOKE || LAN_SMOKE) ? 0 : Number(process.env.MESH6J_PORT || DEFAULT_PORT);
  if (!Number.isInteger(requestedPort) || requestedPort < 0 || requestedPort > 65535) {
    fail('MESH6J_PORT must be an integer between 0 and 65535.');
  }

  await new Promise((resolveListen, rejectListen) => {
    server.once('error', rejectListen);
    server.listen(requestedPort, LAN_MODE ? LAN_HOST : LOCALHOST_HOST, resolveListen);
  });

  const address = server.address();
  if (address === null || typeof address === 'string') fail('unexpected localhost server address.');
  const base = (LAN_MODE ? 'https://' : 'http://') + LOCALHOST_HOST + ':' + address.port;

  if (SMOKE || LAN_SMOKE) {
    try {
      const required = [
        '/',
        '/capture.mjs',
        '/fr251/',
        '/fr251/operator.mjs',
        '/fr255/',
        '/fr255/operator.mjs',
        '/fr274/',
        '/fr274/operator.mjs',
        '/fr279/',
        '/fr279/operator.mjs',
        '/fr281/',
        '/fr281/operator.mjs',
        '/fr283/',
        '/fr283/operator.mjs',
        '/fr104-mirror/',
        '/fr104-mirror/operator.mjs',
        '/fr104-mirror-multi/',
        '/fr104-mirror-multi/operator.mjs',
        '/fr104-makehuman-preflight/',
        '/fr104-makehuman-preflight/operator.mjs',
        '/fr104-makehuman-preflight/fixture.png',
        '/fr104-makehuman-transform-diagnostics/',
        '/fr104-makehuman-transform-diagnostics/operator.mjs',
        '/fr104-makehuman-transform-diagnostics/fixture.png',
        '/fr104-makehuman-provider-rotation-dependence/',
        '/fr104-makehuman-provider-rotation-dependence/operator.mjs',
        '/fr104-makehuman-provider-rotation-dependence/fixture.png',
        '/fr104-makehuman-provider-rotation-compensation/',
        '/fr104-makehuman-provider-rotation-compensation/operator.mjs',
        '/fr104-makehuman-provider-rotation-compensation/fixture.png',
        '/fr104-provider-composed-orientation-validation/',
        '/fr104-provider-composed-orientation-validation/operator.mjs',
        '/runtime/config.json',
        '/runtime/geometry-metadata.pbtxt',
        '/runtime/fr76-parity-input.prototxt',
        '/runtime/weighted-adapter.json',
        '/face/face-eye-pair-research-bridge-fr24.js',
        '/face/mediapipe-face-landmarker-runtime-fr26.js',
        '/face/neutral-ear-mirror-pair-protocol-fr104.js',
        '/face/neutral-ear-mirror-multifixture-protocol-fr104.js',
        '/face/neutral-ear-makehuman-provider-preflight-fr104.js',
        '/face/neutral-ear-makehuman-transform-diagnostics-fr104.js',
        '/face/neutral-ear-makehuman-provider-rotation-dependence-fr104.js',
        '/face/neutral-ear-mediapipe-rotation-api-audit-fr104.js',
        '/face/neutral-ear-makehuman-provider-rotation-compensation-fr104.js',
        '/face/neutral-ear-makehuman-provider-rotation-empirical-evidence-fr104.js',
        '/face/neutral-ear-prospective-composed-orientation-validation-fr104.js',
        '/face/neutral-ear-florence-local-http-transport-fr104.js',
        '/face/mesh6h-browser-camera-frame-source.js',
        '/face/mesh6i-manual-browser-capture-controller.js',
        '/face/observable-morphology-longitudinal-repeatability-observation-fr255.js',
        '/face/observable-morphology-deterministic-still-image-diagnostic-fr274.js',
        '/face/observable-morphology-fixed-still-screen-eye-chord-fr279.js',
        '/face/observable-morphology-fixed-still-metric-eye-chord-fr281.js',
        '/face/observable-morphology-fr76-eye-chord-propagation-fr283.js',
        importMapTarget,
      ];
      for (const route of required) {
        const response = LAN_MODE
          ? await smokeHttpsGet(base + route)
          : await globalThis.fetch(base + route);
        if (!response.ok) fail('smoke route failed: ' + route + ' HTTP ' + response.status + '.');
        const bytes = LAN_MODE ? response.body : Buffer.from(await response.arrayBuffer());
        if (bytes.length === 0) fail('smoke route returned an empty payload: ' + route + '.');
      }
      const config = LAN_MODE
        ? JSON.parse((await smokeHttpsGet(base + '/runtime/config.json')).body.toString('utf8'))
        : await (await globalThis.fetch(base + '/runtime/config.json')).json();
      if (
        config.schemaVersion !== 'mesh6j-localhost-runtime-config-v1'
        || config.transportMode !== (LAN_MODE ? 'private_lan_https' : 'localhost_http')
        || config.fr76ParityInputBlobSha !== PARITY_INPUT_BLOB_SHA
        || config.fr104FlorenceLocalTransport?.endpoint !== '/runtime/fr104/florence'
        || config.fr104FlorenceLocalTransport?.requestPixelFormat !== 'rgba8'
        || config.fr104FlorenceLocalTransport?.filePersistenceUsed !== false
        || config.fr104FlorenceLocalTransport?.anatomicalLateralityAuthorized !== false
        || config.fr104FlorenceLocalTransport?.productionAuthorization !== false
        || config.rawCapturePersistenceEnabled !== false
        || config.calibrationAuthorized !== false
        || config.productionMorphologyAuthorized !== false
      ) {
        fail('smoke runtime config authority boundary drift.');
      }
      process.stdout.write(JSON.stringify({
        status: LAN_MODE ? 'MESH6J_PRIVATE_LAN_HTTPS_CAPTURE_SURFACE_PASS' : 'MESH6J_LOCALHOST_CAPTURE_SURFACE_PASS',
        localhostOnly: !LAN_MODE,
        privateLanHttps: LAN_MODE,
        requiredRoutesVerified: true,
        exactMetadataVerified: true,
        exactParityInputVerified: true,
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

  if (LAN_MODE) {
    const urls = privateLanUrls(address.port);
    process.stdout.write('MESH6J.1 private-LAN HTTPS mobile capture mode enabled.\n');
    if (urls.length === 0) {
      process.stdout.write('No private IPv4 interface was discovered; check the PC network connection.\n');
    } else {
      for (const url of urls) {
        process.stdout.write('Phone URL: ' + url + '\n');
        process.stdout.write('FR251 phone dry run: ' + url + 'fr251/\n');
        process.stdout.write('FR255 repeatability bundle: ' + url + 'fr255/\n');
        process.stdout.write('FR274 still-image diagnostic: ' + url + 'fr274/\n');
        process.stdout.write('FR279 eye-chord decomposition: ' + url + 'fr279/\n');
        process.stdout.write('FR281 metric eye-chord decomposition: ' + url + 'fr281/\n');
        process.stdout.write('FR283 FR76 eye-chord propagation: ' + url + 'fr283/\n');
      }
    }
    process.stdout.write('The phone must trust the certificate/issuing local CA before browser camera access will work.\n');
  } else {
    process.stdout.write('MESH6J manual research capture surface: ' + base + '/\n');
    process.stdout.write('FR251 one-person dry-run operator surface: ' + base + '/fr251/\n');
    process.stdout.write('FR255 longitudinal repeatability surface: ' + base + '/fr255/\n');
    process.stdout.write('FR274 deterministic still-image diagnostic: ' + base + '/fr274/\n');
    process.stdout.write('FR279 fixed-still eye-chord decomposition: ' + base + '/fr279/\n');
    process.stdout.write('FR281 fixed-still metric eye-chord decomposition: ' + base + '/fr281/\n');
    process.stdout.write('FR283 fixed-still FR76 eye-chord propagation: ' + base + '/fr283/\n');
    process.stdout.write('FR104 controlled mirror pair: ' + base + '/fr104-mirror/\n');
    process.stdout.write('FR104 controlled multi-fixture mirror: ' + base + '/fr104-mirror-multi/\n');
    process.stdout.write('FR104 MakeHuman provider preflight: ' + base + '/fr104-makehuman-preflight/\n');
    process.stdout.write('FR104 MakeHuman transform diagnostics: ' + base + '/fr104-makehuman-transform-diagnostics/\n');
    process.stdout.write('FR104 MakeHuman provider rotation dependence: ' + base + '/fr104-makehuman-provider-rotation-dependence/\n');
    process.stdout.write('FR104 U3.3 prospective composed orientation validation: ' + base + '/fr104-provider-composed-orientation-validation/\n');
  }
  process.stdout.write('Camera data remains in-memory; only sanitized/descriptive JSON can be exported by the browser surfaces.\n');
}

await main();