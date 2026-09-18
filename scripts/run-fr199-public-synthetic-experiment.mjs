import { Buffer } from 'node:buffer';
import { createHash } from 'node:crypto';
import { createReadStream, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, resolve } from 'node:path';
import { spawn, spawnSync } from 'node:child_process';
import process from 'node:process';
import { URL } from 'node:url';

const args = process.argv.slice(2);
const sampleIndex = args.indexOf('--sample');
const sampleId = sampleIndex >= 0 ? args[sampleIndex + 1] : 'male-23';
if (!/^(male|female)-\d+$/.test(sampleId)) throw new Error('invalid_sample_id');
const sex = sampleId.startsWith('male-') ? 'male' : 'female';
const datasetRepo = 'research-digitized-rhinoplasty/3D-face-morph-dataset-' + sex;
const root = process.cwd();
const work = join(root, '.tmp', 'fr199', sampleId);
mkdirSync(work, { recursive: true });

const urls = {
  obj: 'https://raw.githubusercontent.com/' + datasetRepo + '/main/3D-models/' + sampleId + '.obj',
  metadata: 'https://raw.githubusercontent.com/' + datasetRepo + '/main/landmark-files/' + sampleId + '.JSON',
  image: 'https://raw.githubusercontent.com/' + datasetRepo + '/main/2D-photos/' + sampleId + '.png',
  model: 'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task',
};

async function download(url, dest) {
  const response = await globalThis.fetch(url, { redirect: 'follow' });
  if (!response.ok) throw new Error('download_failed:' + response.status + ':' + url);
  const buf = Buffer.from(await response.arrayBuffer());
  writeFileSync(dest, buf);
  return buf;
}
function sha256File(path) {
  return 'sha256:' + createHash('sha256').update(readFileSync(path)).digest('hex');
}
function run(cmd, argv, options = {}) {
  const result = spawnSync(cmd, argv, { encoding: 'utf8', ...options });
  if (result.status !== 0) {
    throw new Error('command_failed:' + cmd + '\n' + (result.stdout || '') + '\n' + (result.stderr || ''));
  }
  return result;
}
function findChrome() {
  if (process.env.CHROME_BIN && existsSync(process.env.CHROME_BIN)) return process.env.CHROME_BIN;
  for (const name of ['google-chrome', 'google-chrome-stable', 'chromium', 'chromium-browser']) {
    const found = spawnSync('which', [name], { encoding: 'utf8' });
    if (found.status === 0 && found.stdout.trim()) return found.stdout.trim();
  }
  throw new Error('chrome_not_found');
}
function contentType(path) {
  const ext = extname(path).toLowerCase();
  return {
    '.html': 'text/html; charset=utf-8',
    '.mjs': 'text/javascript; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.wasm': 'application/wasm',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.task': 'application/octet-stream',
  }[ext] || 'application/octet-stream';
}

const objPath = join(work, sampleId + '.obj');
const metadataPath = join(work, sampleId + '.JSON');
const imagePath = join(work, sampleId + '.png');
const modelPath = join(work, 'face_landmarker.task');
const referencePath = join(work, 'reference.json');
const receiptPath = join(work, 'fr199-receipt.json');

// Stage 1: acquire only independent-reference inputs.
await download(urls.obj, objPath);
await download(urls.metadata, metadataPath);

// Stage 2: derive and freeze the independent reference before any provider run.
run('python3', [
  join(root, 'scripts', 'fr199-independent-zygion-reference.py'),
  '--obj', objPath,
  '--metadata', metadataPath,
  '--sample-id', sampleId,
  '--output', referencePath,
]);
const referenceDigest = sha256File(referencePath);
const reference = JSON.parse(readFileSync(referencePath, 'utf8'));
if (reference?.method?.providerCandidateVisible !== false) throw new Error('reference_provider_visibility_violation');
if (reference?.authorityBoundary?.providerIndexAdmissionAuthorized !== false) throw new Error('reference_authority_violation');

// Stage 3 begins only after reference freeze.
await download(urls.image, imagePath);
await download(urls.model, modelPath);

const server = createServer((req, res) => {
  try {
    const url = new URL(req.url || '/', 'http://127.0.0.1');
    const decoded = decodeURIComponent(url.pathname);
    const target = resolve(root, '.' + decoded);
    if (!target.startsWith(resolve(root) + '/')) {
      res.writeHead(403); res.end('forbidden'); return;
    }
    if (!existsSync(target)) {
      res.writeHead(404); res.end('not found'); return;
    }
    res.writeHead(200, {
      'content-type': contentType(target),
      'cache-control': 'no-store',
      'cross-origin-resource-policy': 'cross-origin',
    });
    createReadStream(target).pipe(res);
  } catch (error) {
    res.writeHead(500); res.end(String(error));
  }
});
await new Promise((resolveListen, rejectListen) => {
  server.once('error', rejectListen);
  server.listen(0, '127.0.0.1', resolveListen);
});
const address = server.address();
if (!address || typeof address === 'string') throw new Error('server_address_unavailable');
const port = address.port;

const browserUrl = new URL('http://127.0.0.1:' + port + '/scripts/fr199-provider-browser.html');
browserUrl.searchParams.set('sample', sampleId);
browserUrl.searchParams.set('image', '/.tmp/fr199/' + sampleId + '/' + sampleId + '.png');
browserUrl.searchParams.set('model', '/.tmp/fr199/' + sampleId + '/face_landmarker.task');
browserUrl.searchParams.set('wasm', '/node_modules/@mediapipe/tasks-vision/wasm');

const chrome = findChrome();
const chromeArgs = [
  '--headless=new',
  '--no-sandbox',
  '--disable-gpu',
  '--disable-dev-shm-usage',
  '--virtual-time-budget=45000',
  '--dump-dom',
  browserUrl.toString(),
];
const chromeRun = await new Promise((resolveChrome, rejectChrome) => {
  const child = spawn(chrome, chromeArgs, { stdio: ['ignore', 'pipe', 'pipe'] });
  let stdout = '';
  let stderr = '';
  const timer = setTimeout(() => {
    child.kill('SIGKILL');
    rejectChrome(new Error('chrome_provider_stage_timeout'));
  }, 70000);
  child.stdout.setEncoding('utf8');
  child.stderr.setEncoding('utf8');
  child.stdout.on('data', (chunk) => {
    stdout += chunk;
    if (stdout.length > 20 * 1024 * 1024) {
      child.kill('SIGKILL');
      rejectChrome(new Error('chrome_stdout_limit_exceeded'));
    }
  });
  child.stderr.on('data', (chunk) => {
    stderr += chunk;
    if (stderr.length > 20 * 1024 * 1024) stderr = stderr.slice(-20 * 1024 * 1024);
  });
  child.once('error', (error) => {
    clearTimeout(timer);
    rejectChrome(error);
  });
  child.once('close', (code) => {
    clearTimeout(timer);
    if (code !== 0) {
      rejectChrome(new Error('chrome_provider_stage_failed:' + code + '\n' + stderr));
      return;
    }
    resolveChrome({ stdout, stderr });
  });
});
await new Promise((resolveClose) => server.close(resolveClose));
const dom = chromeRun.stdout || '';
const errorMatch = dom.match(/FR199_ERROR_BASE64:([A-Za-z0-9+/=]+)/);
if (errorMatch) {
  const decoded = JSON.parse(Buffer.from(errorMatch[1], 'base64').toString('utf8'));
  throw new Error('provider_browser_error:' + decoded.message);
}
const match = dom.match(/FR199_RESULT_BASE64:([A-Za-z0-9+/=]+)/);
if (!match) throw new Error('provider_result_not_found_in_dom');
const provider = JSON.parse(Buffer.from(match[1], 'base64').toString('utf8'));
if (provider.runtimePackageVersion !== '0.10.35') throw new Error('provider_version_drift');
if (JSON.stringify(provider.providerCandidateIndices) !== JSON.stringify([234, 454])) throw new Error('provider_candidate_drift');
if (provider.providerIndexAdmissionAuthorized !== false) throw new Error('provider_authority_violation');

const receipt = {
  schemaVersion: 'fr199-public-synthetic-same-sample-correspondence-v1',
  sampleId,
  authorityState: 'descriptive_same_sample_execution_only',
  executionOrder: [
    'download_public_obj_and_metadata',
    'derive_independent_zygion_reference',
    'freeze_reference_digest',
    'download_same_id_image_and_mediapipe_model',
    'run_mediapipe_0_10_35',
    'record_unordered_provider_pair',
  ],
  sourceAssets: {
    obj: { url: urls.obj, digest: sha256File(objPath) },
    metadata: { url: urls.metadata, digest: sha256File(metadataPath) },
    image: { url: urls.image, digest: sha256File(imagePath) },
    model: { url: urls.model, digest: sha256File(modelPath) },
  },
  independentReference: {
    frozenBeforeProviderExecution: true,
    digest: referenceDigest,
    value: reference,
  },
  providerObservation: provider,
  correspondence: {
    sameSampleIdEstablished: true,
    coordinateFramesDirectlyComparable: false,
    distanceComputed: false,
    reason: '3d_obj_reference_and_2d_normalized_provider_points_require_a_separate_governed_projection_or_registration_step',
  },
  authorityBoundary: {
    provider234IsZygion: false,
    provider454IsZygion: false,
    providerSideAssignmentAuthorized: false,
    providerIndexAdmissionAuthorized: false,
    thresholdAuthorized: false,
    calibrationAuthorized: false,
    classifierAuthorized: false,
    productionActivationAuthorized: false,
    commerceActivationAuthorized: false,
  },
};
writeFileSync(receiptPath, JSON.stringify(receipt, null, 2) + '\n', 'utf8');
globalThis.console.log(JSON.stringify({
  ok: true,
  sampleId,
  referenceDigest,
  leftReference: reference.reference.left,
  rightReference: reference.reference.right,
  bizygomaticWidth3dMm: reference.reference.bizygomaticWidth3dMm,
  selectedBandMm: reference.reference.selectedBandMm,
  providerCandidatePoints: provider.providerCandidatePoints,
  receiptPath,
}, null, 2));
