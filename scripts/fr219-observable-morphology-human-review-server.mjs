import { Buffer } from 'node:buffer';
import { createHash } from 'node:crypto';
import {
  appendFileSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { createServer } from 'node:http';
import { tmpdir } from 'node:os';
import { dirname, join, resolve, sep } from 'node:path';
import process from 'node:process';
import { fileURLToPath, URL } from 'node:url';
import {
  admitHumanAnnotationFR219,
  buildAnnotationEvidenceReceiptFR219,
  materializeBlindedReviewSessionFR219,
} from '../.face-reading-dist/observable-morphology-human-review-fr219.js';

const LOCALHOST = '127.0.0.1';
const DEFAULT_PORT = 4319;
const SMOKE = process.env.FR219_SMOKE === '1';
const scriptDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(scriptDir, '..');
const htmlPath = resolve(repoRoot, 'tools/face-reading/fr219-review.html');
const clientPath = resolve(repoRoot, 'tools/face-reading/fr219-review.mjs');

function fail(message) {
  throw new Error('FR219 SERVER ' + message);
}

function sha256Bytes(bytes) {
  return 'sha256:' + createHash('sha256').update(bytes).digest('hex');
}

function json(response, status, value) {
  response.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
    'x-content-type-options': 'nosniff',
    'x-frame-options': 'DENY',
    'referrer-policy': 'no-referrer',
  });
  response.end(JSON.stringify(value));
}

function textFile(response, path, contentType) {
  if (!existsSync(path) || !statSync(path).isFile()) {
    response.writeHead(404);
    response.end('not found');
    return;
  }
  response.writeHead(200, {
    'content-type': contentType,
    'cache-control': 'no-store',
    'x-content-type-options': 'nosniff',
    'x-frame-options': 'DENY',
    'referrer-policy': 'no-referrer',
    'content-security-policy':
      "default-src 'self'; script-src 'self'; img-src 'self'; style-src 'self' 'unsafe-inline'; connect-src 'self'; base-uri 'none'; frame-ancestors 'none'; form-action 'self'",
  });
  response.end(readFileSync(path));
}

function parseConfig(path) {
  if (!existsSync(path) || !statSync(path).isFile()) fail('session config path does not exist or is not a file.');
  let parsed;
  try {
    parsed = JSON.parse(readFileSync(path, 'utf8'));
  } catch (error) {
    fail('session config must be valid JSON: ' + (error instanceof Error ? error.message : String(error)));
  }
  return parsed;
}

function requireOutsideRepo(path, label) {
  const absolute = resolve(path);
  if (absolute === repoRoot || absolute.startsWith(repoRoot + sep)) {
    fail(label + ' must be outside the repository to avoid committing reviewer/evidence data.');
  }
  return absolute;
}

function assertExactAssets(session) {
  const routeMap = new Map();
  for (const binding of session.internalAssetBindings) {
    const absolute = resolve(binding.assetPath);
    if (!existsSync(absolute) || !statSync(absolute).isFile()) {
      fail('review asset is missing for ' + binding.reviewItemRef + '.');
    }
    const bytes = readFileSync(absolute);
    const actual = sha256Bytes(bytes);
    if (actual !== binding.assetDigest) {
      fail('review asset digest mismatch for ' + binding.reviewItemRef + '.');
    }
    routeMap.set(binding.assetRoute, Object.freeze({
      bytes,
      mediaType: binding.mediaType,
    }));
  }
  return routeMap;
}

function readJsonBody(request, maxBytes = 8192) {
  return new Promise((resolveBody, rejectBody) => {
    const chunks = [];
    let size = 0;
    request.on('data', (chunk) => {
      size += chunk.length;
      if (size > maxBytes) {
        rejectBody(new Error('request body too large'));
        request.destroy();
        return;
      }
      chunks.push(Buffer.from(chunk));
    });
    request.on('end', () => {
      try {
        const body = Buffer.concat(chunks).toString('utf8');
        resolveBody(JSON.parse(body));
      } catch {
        rejectBody(new Error('invalid JSON body'));
      }
    });
    request.on('error', rejectBody);
  });
}

function createRuntime(configPath, ledgerPath) {
  const config = parseConfig(configPath);
  const session = materializeBlindedReviewSessionFR219(config);
  const assets = assertExactAssets(session);

  if (existsSync(ledgerPath)) fail('ledger path already exists; use a fresh path for each reviewer session.');
  const receiptPath = ledgerPath + '.receipt.json';
  if (existsSync(receiptPath)) fail('receipt path already exists; use a fresh path for each reviewer session.');
  mkdirSync(dirname(ledgerPath), { recursive: true });

  const annotations = [];
  const completedItems = new Set();

  function persist(record) {
    appendFileSync(ledgerPath, JSON.stringify(record) + '\n', { encoding: 'utf8', flag: 'a' });
    annotations.push(record);
    completedItems.add(record.reviewItemRef);
    const receipt = buildAnnotationEvidenceReceiptFR219([session], annotations);
    writeFileSync(receiptPath, JSON.stringify(receipt, null, 2) + '\n', 'utf8');
    return receipt;
  }

  return Object.freeze({
    session,
    assets,
    ledgerPath,
    receiptPath,
    annotations,
    completedItems,
    persist,
  });
}

function createRequestHandler(runtime) {
  return async (request, response) => {
    const rawUrl = request.url || '/';
    const url = new URL(rawUrl, 'http://' + (request.headers.host || LOCALHOST));

    if (request.method === 'GET' && (url.pathname === '/' || url.pathname === '/index.html')) {
      textFile(response, htmlPath, 'text/html; charset=utf-8');
      return;
    }
    if (request.method === 'GET' && url.pathname === '/review.mjs') {
      textFile(response, clientPath, 'text/javascript; charset=utf-8');
      return;
    }
    if (request.method === 'GET' && url.pathname === '/api/manifest') {
      json(response, 200, runtime.session.publicManifest);
      return;
    }
    if (request.method === 'GET' && runtime.assets.has(url.pathname)) {
      const asset = runtime.assets.get(url.pathname);
      response.writeHead(200, {
        'content-type': asset.mediaType,
        'cache-control': 'no-store',
        'x-content-type-options': 'nosniff',
        'content-disposition': 'inline',
        'referrer-policy': 'no-referrer',
      });
      response.end(asset.bytes);
      return;
    }
    if (request.method === 'POST' && url.pathname === '/api/annotations') {
      try {
        if (request.headers['content-type']?.split(';')[0].trim() !== 'application/json') {
          json(response, 415, { error: 'application/json required' });
          return;
        }
        const body = await readJsonBody(request);
        if (
          body === null
          || typeof body !== 'object'
          || Array.isArray(body)
          || Object.keys(body).some((key) => key !== 'reviewItemRef' && key !== 'label')
        ) {
          json(response, 400, { error: 'invalid annotation payload' });
          return;
        }
        const reviewItemRef = body.reviewItemRef;
        if (typeof reviewItemRef !== 'string') {
          json(response, 400, { error: 'invalid reviewItemRef' });
          return;
        }
        if (runtime.completedItems.has(reviewItemRef)) {
          json(response, 409, { error: 'review item already annotated' });
          return;
        }
        const record = admitHumanAnnotationFR219(runtime.session, {
          reviewItemRef,
          label: body.label,
          recordedAt: new Date().toISOString(),
        });
        const receipt = runtime.persist(record);
        json(response, 201, {
          accepted: true,
          completedCount: runtime.completedItems.size,
          totalCount: runtime.session.reviewItems.length,
          sessionComplete: runtime.completedItems.size === runtime.session.reviewItems.length,
          evidenceRef: runtime.completedItems.size === runtime.session.reviewItems.length
            ? receipt.evidenceRef
            : null,
        });
      } catch (error) {
        json(response, 400, {
          error: error instanceof Error ? error.message.replace(/^FR-219\s*/u, '') : 'annotation rejected',
        });
      }
      return;
    }

    response.writeHead(404, {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'no-store',
      'x-content-type-options': 'nosniff',
    });
    response.end('not found');
  };
}

async function listen(runtime, port) {
  const server = createServer(createRequestHandler(runtime));
  await new Promise((resolveListen, rejectListen) => {
    server.once('error', rejectListen);
    server.listen(port, LOCALHOST, resolveListen);
  });
  return server;
}

function close(server) {
  return new Promise((resolveClose, rejectClose) => {
    server.close((error) => error ? rejectClose(error) : resolveClose());
  });
}

function smokeReviewItem() {
  return {
    reviewItemRef: 'review-item:fr219-smoke',
    reviewArtifactRef: 'review-artifact:fr219-smoke',
    constructRef: 'observable.eye_pair.outer_corner_orientation@0.1.0',
    reviewerPrompt: '이 사람의 눈꼬리는 전체적으로 어떻게 보이나요?',
    labelOptions: [
      { key: 'clearly_downturned', reviewerMeaning: '눈꼬리가 확실히 내려가 보임' },
      { key: 'slightly_downturned', reviewerMeaning: '눈꼬리가 약간 내려가 보임' },
      { key: 'approximately_horizontal', reviewerMeaning: '눈꼬리가 거의 수평으로 보임' },
      { key: 'slightly_upturned', reviewerMeaning: '눈꼬리가 약간 올라가 보임' },
      { key: 'clearly_upturned', reviewerMeaning: '눈꼬리가 확실히 올라가 보임' },
      { key: 'not_assessable', reviewerMeaning: '이 이미지에서는 판단하기 어려움' },
    ],
    metricValuesExposed: false,
    candidateMetricIdentityExposed: false,
    providerIdentityExposed: false,
    extractorIdentityExposed: false,
    coverageBinExposed: false,
    candidateThresholdExposed: false,
    traditionalMeaningExposed: false,
    fortuneOutputExposed: false,
    peerLabelsExposed: false,
  };
}

async function runSmoke() {
  const temp = mkdtempSync(join(tmpdir(), 'fr219-smoke-'));
  try {
    const imagePath = join(temp, 'sanitized-review.png');
    const imageBytes = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=',
      'base64',
    );
    writeFileSync(imagePath, imageBytes);

    const configPath = join(temp, 'session.json');
    const ledgerPath = join(temp, 'annotation-ledger.jsonl');
    const config = {
      sessionRef: 'session:fr219-smoke',
      reviewerKey: 'reviewer:fr219-smoke',
      reviewerHumanAttested: true,
      reviewerIndependenceAttested: true,
      items: [{
        reviewItem: smokeReviewItem(),
        assetPath: imagePath,
        assetDigest: sha256Bytes(imageBytes),
        mediaType: 'image/png',
        embeddedMetadataSanitizedAttested: true,
      }],
    };
    writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf8');

    const runtime = createRuntime(configPath, ledgerPath);
    const server = await listen(runtime, 0);
    try {
      const address = server.address();
      if (address === null || typeof address === 'string') fail('smoke server address unavailable.');
      const base = 'http://' + LOCALHOST + ':' + address.port;

      for (const route of ['/', '/review.mjs', '/api/manifest']) {
        const result = await globalThis.fetch(base + route);
        if (!result.ok) fail('smoke route failed: ' + route + ' HTTP ' + result.status + '.');
      }

      const manifest = await (await globalThis.fetch(base + '/api/manifest')).json();
      const serializedManifest = JSON.stringify(manifest);
      if (
        manifest.schemaVersion !== 'fr219-provider-blind-review-manifest-v1'
        || manifest.items?.length !== 1
        || serializedManifest.includes('reviewer:fr219-smoke')
        || serializedManifest.includes(imagePath)
        || serializedManifest.includes('sha256:')
        || serializedManifest.includes('metricValue')
        || serializedManifest.includes('providerRun')
      ) {
        fail('smoke reviewer manifest leaked hidden metadata.');
      }

      const assetRoute = manifest.items[0].assetRoute;
      if (!/^\/asset\/[0-9a-f]{64}$/u.test(assetRoute)) fail('smoke asset route is not opaque.');
      const asset = await globalThis.fetch(base + assetRoute);
      if (!asset.ok) fail('smoke opaque asset route failed.');
      if (sha256Bytes(Buffer.from(await asset.arrayBuffer())) !== sha256Bytes(imageBytes)) {
        fail('smoke opaque asset bytes drifted.');
      }

      const annotation = await globalThis.fetch(base + '/api/annotations', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          reviewItemRef: 'review-item:fr219-smoke',
          label: 'approximately_horizontal',
        }),
      });
      if (annotation.status !== 201) fail('smoke annotation submission failed: HTTP ' + annotation.status + '.');
      const accepted = await annotation.json();
      if (accepted.accepted !== true || accepted.sessionComplete !== true || typeof accepted.evidenceRef !== 'string') {
        fail('smoke annotation acceptance payload drift.');
      }

      const duplicate = await globalThis.fetch(base + '/api/annotations', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          reviewItemRef: 'review-item:fr219-smoke',
          label: 'slightly_upturned',
        }),
      });
      if (duplicate.status !== 409) fail('smoke duplicate annotation was not rejected.');

      const ledgerLines = readFileSync(ledgerPath, 'utf8').trim().split('\n').filter(Boolean);
      if (ledgerLines.length !== 1) fail('smoke ledger did not persist exactly one annotation.');
      const record = JSON.parse(ledgerLines[0]);
      if (
        record.reviewerKey !== 'reviewer:fr219-smoke'
        || record.label !== 'approximately_horizontal'
        || record.metricValueObservedByReviewer !== false
        || record.providerIdentityObservedByReviewer !== false
      ) fail('smoke annotation ledger authority boundary drift.');

      const receipt = JSON.parse(readFileSync(ledgerPath + '.receipt.json', 'utf8'));
      if (
        receipt.annotationRecordsPresent !== true
        || receipt.declaredHumanAnnotationEvidencePresent !== true
        || receipt.reviewerHumanStatusIndependentlyVerified !== false
        || receipt.reviewerIndependenceIndependentlyVerified !== false
        || receipt.empiricalSufficiencyEstablished !== false
        || receipt.repeatCaptureStabilityEstablished !== false
        || receipt.thresholdIssued !== false
        || receipt.classifierIssued !== false
        || receipt.traditionalBindingIssued !== false
      ) fail('smoke evidence receipt widened authority.');

      process.stdout.write(JSON.stringify({
        status: 'FR219_LOCALHOST_BLINDED_HUMAN_REVIEW_SMOKE_PASS',
        localhostOnly: true,
        opaqueAssetServingVerified: true,
        reviewerManifestLeakCheck: true,
        annotationPostVerified: true,
        duplicateAnnotationRejected: true,
        localLedgerPersisted: true,
        receiptPersisted: true,
        declaredHumanAnnotationEvidencePresent: true,
        reviewerHumanStatusIndependentlyVerified: false,
        reviewerIndependenceIndependentlyVerified: false,
        empiricalSufficiencyEstablished: false,
        repeatCaptureStabilityEstablished: false,
        thresholdIssued: false,
        classifierIssued: false,
        traditionalBindingIssued: false,
      }) + '\n');
    } finally {
      await close(server);
    }
  } finally {
    rmSync(temp, { recursive: true, force: true });
  }
}

async function main() {
  if (SMOKE) {
    await runSmoke();
    return;
  }

  const configEnv = process.env.FR219_SESSION_CONFIG?.trim();
  const ledgerEnv = process.env.FR219_LEDGER_PATH?.trim();
  if (!configEnv || !ledgerEnv) {
    fail('set FR219_SESSION_CONFIG and FR219_LEDGER_PATH.');
  }

  const configPath = requireOutsideRepo(configEnv, 'FR219_SESSION_CONFIG');
  const ledgerPath = requireOutsideRepo(ledgerEnv, 'FR219_LEDGER_PATH');
  const runtime = createRuntime(configPath, ledgerPath);

  const requestedPort = Number(process.env.FR219_PORT || DEFAULT_PORT);
  if (!Number.isInteger(requestedPort) || requestedPort < 1 || requestedPort > 65535) {
    fail('FR219_PORT must be an integer between 1 and 65535.');
  }

  const server = await listen(runtime, requestedPort);
  const address = server.address();
  if (address === null || typeof address === 'string') fail('server address unavailable.');

  process.stdout.write('FR219 blinded human review: http://' + LOCALHOST + ':' + address.port + '/\n');
  process.stdout.write('Annotation ledger: ' + runtime.ledgerPath + '\n');
  process.stdout.write('Evidence receipt: ' + runtime.receiptPath + '\n');
  process.stdout.write('Localhost only. No metric/provider/traditional interpretation data is exposed to the reviewer.\n');
}

await main();
