import { Buffer } from 'node:buffer';
import { spawn } from 'node:child_process';
import { createHash } from 'node:crypto';
import {
  existsSync,
  readFileSync,
  statSync,
  writeFileSync,
  mkdirSync,
} from 'node:fs';
import { createServer } from 'node:http';
import {
  dirname,
  extname,
  relative,
  resolve,
  sep,
} from 'node:path';
import { URL, fileURLToPath } from 'node:url';
import process from 'node:process';
import {
  NEUTRAL_EAR_PROSPECTIVE_INDEPENDENT_GEOMETRY_VALIDATION_FR104,
} from '../.face-reading-dist/neutral-ear-prospective-independent-geometry-validation-fr104.js';
import {
  NEUTRAL_EAR_PROSPECTIVE_INDEPENDENT_GEOMETRY_FIXTURE_EVIDENCE_FR104,
} from '../.face-reading-dist/neutral-ear-prospective-independent-geometry-fixture-evidence-fr104.js';

const SERVER_PORT = 4331;
const DRIVER_PORT = 9521;
const SERVER_ROOT = 'http://127.0.0.1:' + SERVER_PORT;
const DRIVER_ROOT = 'http://127.0.0.1:' + DRIVER_PORT;
const PAGE_URL = SERVER_ROOT + '/?autorun=1';
const RESULT_SCHEMA =
  'fr104-prospective-independent-geometry-provider-result-v1';
const ERROR_SCHEMA =
  'fr104-prospective-independent-geometry-provider-error-v1';
const POLL_TIMEOUT_MS = 180_000;

const protocol =
  NEUTRAL_EAR_PROSPECTIVE_INDEPENDENT_GEOMETRY_VALIDATION_FR104;
const fixtureEvidence =
  NEUTRAL_EAR_PROSPECTIVE_INDEPENDENT_GEOMETRY_FIXTURE_EVIDENCE_FR104;

function fail(message) {
  throw new Error('FR104 U4B-C prospective runner: ' + message);
}

function sleep(ms) {
  return new Promise((resolveSleep) => {
    globalThis.setTimeout(resolveSleep, ms);
  });
}

function capture(child) {
  let output = '';
  const append = (chunk) => {
    output += chunk.toString('utf8');
    if (output.length > 80_000) output = output.slice(-80_000);
  };
  child.stdout?.on('data', append);
  child.stderr?.on('data', append);
  return Object.freeze({
    get output() {
      return output;
    },
  });
}

function sha256(bytes) {
  return createHash('sha256').update(bytes).digest('hex');
}

function findPackageRoot(entryPath) {
  let current = dirname(entryPath);
  for (;;) {
    const packageJson = resolve(current, 'package.json');
    if (existsSync(packageJson)) {
      try {
        const parsed =
          JSON.parse(readFileSync(packageJson, 'utf8'));
        if (parsed.name === '@mediapipe/tasks-vision') {
          return current;
        }
      } catch {
        // Ignore unrelated malformed package metadata.
      }
    }
    const parent = dirname(current);
    if (parent === current) break;
    current = parent;
  }
  fail(
    'could not locate @mediapipe/tasks-vision root from '
      + entryPath,
  );
}

function safeChild(root, requested) {
  const decoded = decodeURIComponent(requested);
  const full = resolve(root, decoded);
  if (full !== root && !full.startsWith(root + sep)) {
    return null;
  }
  return full;
}

function mime(path) {
  switch (extname(path)) {
    case '.html':
      return 'text/html; charset=utf-8';
    case '.mjs':
    case '.js':
      return 'text/javascript; charset=utf-8';
    case '.json':
    case '.map':
      return 'application/json; charset=utf-8';
    case '.wasm':
      return 'application/wasm';
    case '.png':
      return 'image/png';
    default:
      return 'application/octet-stream';
  }
}

function sendFile(response, path) {
  if (!existsSync(path) || !statSync(path).isFile()) {
    response.writeHead(404, {
      'content-type':'text/plain; charset=utf-8',
    });
    response.end('not found');
    return;
  }
  response.writeHead(200, {
    'content-type':mime(path),
    'cache-control':'no-store',
    'x-content-type-options':'nosniff',
  });
  response.end(readFileSync(path));
}

async function waitForHttp(url, label) {
  const deadline = Date.now() + POLL_TIMEOUT_MS;
  let lastError = null;
  while (Date.now() < deadline) {
    try {
      const response =
        await globalThis.fetch(url, {cache:'no-store'});
      if (response.ok) return;
      lastError = new Error('HTTP ' + response.status);
    } catch (error) {
      lastError = error;
    }
    await sleep(500);
  }
  fail(
    label
      + ' did not become ready: '
      + (
        lastError instanceof Error
          ? lastError.message
          : String(lastError)
      ),
  );
}

async function webdriver(path, method='GET', body=undefined) {
  const response = await globalThis.fetch(
    DRIVER_ROOT + path,
    {
      method,
      headers: body === undefined
        ? undefined
        : {'content-type':'application/json; charset=utf-8'},
      body: body === undefined
        ? undefined
        : JSON.stringify(body),
    },
  );
  const payload = await response.json();
  if (!response.ok) {
    fail(
      'ChromeDriver HTTP '
        + response.status
        + ': '
        + JSON.stringify(payload),
    );
  }
  if (payload?.value?.error) {
    fail(
      'ChromeDriver '
        + payload.value.error
        + ': '
        + (payload.value.message ?? ''),
    );
  }
  return payload.value;
}

function object(value, label) {
  if (
    typeof value !== 'object'
    || value === null
    || Array.isArray(value)
  ) {
    fail(label + ' must be an object.');
  }
  return value;
}

function exact(actual, expected, label) {
  if (!Object.is(actual, expected)) {
    fail(
      label
        + ' expected='
        + String(expected)
        + ' observed='
        + String(actual),
    );
  }
}

function validateResult(result) {
  exact(result.schemaVersion, RESULT_SCHEMA, 'schemaVersion');
  exact(
    result.authorityState,
    'prospective_candidate_result_not_admitted',
    'authorityState',
  );
  exact(result.studyKind, protocol.studyKind, 'studyKind');

  const preregistration =
    object(result.preregistration, 'preregistration');
  exact(
    preregistration.preregistrationMergeSha,
    fixtureEvidence.preregistrationMergeSha,
    'preregistration.preregistrationMergeSha',
  );
  exact(
    preregistration.fixturePinMergeRequiredBeforeExecution,
    true,
    'preregistration.fixturePinMergeRequiredBeforeExecution',
  );
  exact(
    JSON.stringify(preregistration.frozenRule),
    JSON.stringify(protocol.frozenRule),
    'preregistration.frozenRule',
  );

  const fixture = object(result.fixture, 'fixture');
  exact(
    fixture.fixtureRef,
    protocol.prospectiveFixture.fixtureRef,
    'fixture.fixtureRef',
  );
  exact(
    fixture.expectedPngSha256,
    fixtureEvidence.renderedFixture.pngSha256,
    'fixture.expectedPngSha256',
  );
  exact(
    fixture.observedPngSha256,
    fixtureEvidence.renderedFixture.pngSha256,
    'fixture.observedPngSha256',
  );
  exact(fixture.digestVerified, true, 'fixture.digestVerified');
  exact(
    fixture.width,
    fixtureEvidence.renderedFixture.width,
    'fixture.width',
  );
  exact(
    fixture.height,
    fixtureEvidence.renderedFixture.height,
    'fixture.height',
  );
  exact(
    fixture.sourceImagePersisted,
    false,
    'fixture.sourceImagePersisted',
  );
  exact(
    fixture.transformedRasterPersisted,
    false,
    'fixture.transformedRasterPersisted',
  );

  const runtime = object(result.runtime, 'runtime');
  exact(
    runtime.packageName,
    protocol.providerRuntime.packageName,
    'runtime.packageName',
  );
  exact(
    runtime.packageVersion,
    protocol.providerRuntime.packageVersion,
    'runtime.packageVersion',
  );
  exact(
    runtime.runningMode,
    protocol.providerRuntime.runningMode,
    'runtime.runningMode',
  );
  exact(
    runtime.numFaces,
    protocol.providerRuntime.numFaces,
    'runtime.numFaces',
  );
  exact(
    runtime.expectedLandmarkCount,
    protocol.providerRuntime.expectedLandmarkCount,
    'runtime.expectedLandmarkCount',
  );
  exact(
    runtime.imageProcessingOptionsRotationDegreesUsed,
    true,
    'runtime.imageProcessingOptionsRotationDegreesUsed',
  );

  if (!Array.isArray(result.cases) || result.cases.length !== 8) {
    fail('cases must contain exactly eight entries.');
  }

  for (const [index, expected] of protocol.cases.entries()) {
    const item = object(
      result.cases[index],
      'cases[' + index + ']',
    );
    exact(item.id, expected.id, expected.id + '.id');
    exact(item.family, expected.family, expected.id + '.family');
    exact(
      item.horizontalMirror,
      expected.horizontalMirror,
      expected.id + '.horizontalMirror',
    );
    exact(
      item.reflectionParity,
      expected.reflectionParity,
      expected.id + '.reflectionParity',
    );
    exact(
      item.physicalClockwiseRotationDegrees,
      expected.physicalClockwiseRotationDegrees,
      expected.id + '.physicalClockwiseRotationDegrees',
    );
    exact(
      item.compensationDegrees,
      expected.compensationDegrees,
      expected.id + '.compensationDegrees',
    );
    if (
      typeof item.transformedRgbaSha256 !== 'string'
      || !/^[a-f0-9]{64}$/u.test(item.transformedRgbaSha256)
    ) {
      fail(expected.id + '.transformedRgbaSha256 malformed.');
    }

    const provider = object(
      item.provider,
      expected.id + '.provider',
    );
    if (
      provider.eligibilityState
        === 'exact_one_face_478_landmarks_observed'
    ) {
      exact(provider.faceCount, 1, expected.id + '.faceCount');
      exact(
        provider.landmarkCount,
        478,
        expected.id + '.landmarkCount',
      );
      object(
        provider.providerEyeCentroids,
        expected.id + '.providerEyeCentroids',
      );
      object(
        provider.canonicalProviderEyeCentroids,
        expected.id + '.canonicalProviderEyeCentroids',
      );
      if (
        !Number.isFinite(item.directCost)
        || !Number.isFinite(item.swappedCost)
      ) {
        fail(expected.id + ' available case costs missing.');
      }
    } else {
      exact(
        provider.canonicalProviderEyeCentroids,
        null,
        expected.id + '.canonicalProviderEyeCentroids',
      );
      exact(item.directCost, null, expected.id + '.directCost');
      exact(item.swappedCost, null, expected.id + '.swappedCost');
    }
  }

  const assessment = object(result.assessment, 'assessment');
  const allowedStates = [
    'prospective_independent_geometry_mapping_supported',
    'prospective_independent_geometry_mapping_refuted',
    'prospective_independent_geometry_mapping_unresolved',
  ];
  if (!allowedStates.includes(assessment.state)) {
    fail('assessment.state is not preregistered.');
  }
  exact(
    assessment.numericAcceptanceThresholdApplied,
    false,
    'assessment.numericAcceptanceThresholdApplied',
  );
  exact(
    assessment.providerPublishedSideNamesUsedAsAnatomicalAuthority,
    false,
    'assessment.providerPublishedSideNamesUsedAsAnatomicalAuthority',
  );
  exact(
    assessment.imageSpaceXSignUsedAsAnatomicalAuthority,
    false,
    'assessment.imageSpaceXSignUsedAsAnatomicalAuthority',
  );

  const boundary = object(
    result.interpretationBoundary,
    'interpretationBoundary',
  );
  exact(
    boundary.sourceFamilyIndependentFromU4a,
    false,
    'boundary.sourceFamilyIndependentFromU4a',
  );
  exact(
    boundary.globalProviderAnatomicalSemanticsMayBeEstablished,
    false,
    'boundary.globalProviderAnatomicalSemanticsMayBeEstablished',
  );
  exact(
    boundary.runtimeSubjectPhotoLateralityMayBeAuthorized,
    false,
    'boundary.runtimeSubjectPhotoLateralityMayBeAuthorized',
  );
  exact(
    boundary.crossSourceFamilyValidationStillRequired,
    true,
    'boundary.crossSourceFamilyValidationStillRequired',
  );

  const execution = object(result.execution, 'execution');
  exact(
    execution.allEightCasesAttempted,
    true,
    'execution.allEightCasesAttempted',
  );
  exact(
    execution.providerExecuted,
    true,
    'execution.providerExecuted',
  );
  exact(
    execution.empiricalResultAdmitted,
    false,
    'execution.empiricalResultAdmitted',
  );
  exact(
    execution.resultDigestPinned,
    false,
    'execution.resultDigestPinned',
  );
  exact(
    execution.ruleRetunedAfterObservation,
    false,
    'execution.ruleRetunedAfterObservation',
  );

  const privacy = object(result.privacy, 'privacy');
  for (const key of [
    'userImageConsumed',
    'cameraAccessed',
    'rawProviderLandmarksReturned',
    'rawProviderLandmarksPersisted',
    'transformedRasterPersisted',
    'biometricEmbeddingProduced',
    'identityTemplateProduced',
  ]) {
    exact(privacy[key], false, 'privacy.' + key);
  }

  const authority = object(result.authority, 'authority');
  exact(
    authority.u4bFixtureDigestPinned,
    true,
    'authority.u4bFixtureDigestPinned',
  );
  for (const key of [
    'prospectiveIndependentGeometryValidationExecuted',
    'prospectiveIndependentGeometryMappingValidated',
    'providerLabelMappedToAnatomicalSide',
    'globalProviderAnatomicalSemanticsEstablished',
    'anatomicalReferenceAdmitted',
    'anatomicalLateralityAuthorized',
    'validatedExternalEarObservationAuthorized',
    'traditionalBindingAuthorized',
    'productionAuthorization',
  ]) {
    exact(authority[key], false, 'authority.' + key);
  }
}

async function waitForResult(sessionId) {
  const deadline = Date.now() + POLL_TIMEOUT_MS;
  while (Date.now() < deadline) {
    const value = await webdriver(
      '/session/' + sessionId + '/execute/sync',
      'POST',
      {
        script:`
          return {
            result: document.querySelector('#result')?.textContent ?? '',
            status: document.querySelector('#status')?.textContent ?? ''
          };
        `,
        args:[],
      },
    );
    const textValue =
      typeof value?.result === 'string'
        ? value.result.trim()
        : '';
    if (textValue && textValue !== '{}') {
      const result = JSON.parse(textValue);
      if (result.schemaVersion === ERROR_SCHEMA) {
        fail(
          'browser validation failed closed: '
            + result.error,
        );
      }
      validateResult(result);
      return result;
    }
    await sleep(750);
  }
  fail('browser prospective result timed out.');
}

async function terminate(child) {
  if (child === null || child.exitCode !== null) return;
  child.kill('SIGTERM');
  await Promise.race([
    new Promise((resolveExit) => child.once('exit', resolveExit)),
    sleep(2000),
  ]);
  if (child.exitCode === null) child.kill('SIGKILL');
}

async function main() {
  const fixtureInput =
    process.env.FR104_U4B_FIXTURE_IN?.trim();
  if (!fixtureInput) {
    fail('FR104_U4B_FIXTURE_IN is required.');
  }
  const fixturePath = resolve(process.cwd(), fixtureInput);
  if (!existsSync(fixturePath) || !statSync(fixturePath).isFile()) {
    fail('fixture input does not exist.');
  }
  const fixtureBytes = readFileSync(fixturePath);
  const fixtureSha = sha256(fixtureBytes);
  if (fixtureSha !== fixtureEvidence.renderedFixture.pngSha256) {
    fail(
      'fixture digest drift expected='
        + fixtureEvidence.renderedFixture.pngSha256
        + ' observed='
        + fixtureSha,
    );
  }

  const faceDist = resolve(process.cwd(), '.face-reading-dist');
  const pagePath = resolve(
    process.cwd(),
    'tools/face-geometry/capture/fr104-u4b-provider-validation.html',
  );
  const operatorPath = resolve(
    process.cwd(),
    'tools/face-geometry/capture/fr104-u4b-provider-validation.mjs',
  );
  const visionEntry =
    fileURLToPath(import.meta.resolve('@mediapipe/tasks-vision'));
  const visionRoot = findPackageRoot(visionEntry);
  const visionEntryRelative =
    relative(visionRoot, visionEntry).split(sep).join('/');
  const importMapTarget =
    '/vendor/tasks-vision/' + visionEntryRelative;
  const pageTemplate = readFileSync(pagePath, 'utf8');
  if (!pageTemplate.includes('__MEDIAPIPE_ENTRY__')) {
    fail('page import-map placeholder missing.');
  }
  const pageHtml =
    pageTemplate.replaceAll(
      '__MEDIAPIPE_ENTRY__',
      importMapTarget,
    );

  let driver = null;
  let sessionId = null;
  let driverCapture = null;

  const server = createServer((request, response) => {
    const url = new URL(
      request.url ?? '/',
      SERVER_ROOT,
    );
    if (url.pathname === '/' || url.pathname === '/index.html') {
      response.writeHead(200, {
        'content-type':'text/html; charset=utf-8',
        'cache-control':'no-store',
        'content-security-policy':
          "default-src 'self' https://cdn.jsdelivr.net https://storage.googleapis.com; "
          + "script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval' https://cdn.jsdelivr.net; "
          + "connect-src 'self' https://cdn.jsdelivr.net https://storage.googleapis.com; "
          + "img-src 'self' blob: data:; style-src 'self' 'unsafe-inline'; worker-src 'self' blob:;",
        'permissions-policy':'camera=()',
        'x-content-type-options':'nosniff',
      });
      response.end(pageHtml);
      return;
    }
    if (url.pathname === '/operator.mjs') {
      sendFile(response, operatorPath);
      return;
    }
    if (url.pathname === '/fixture.png') {
      response.writeHead(200, {
        'content-type':'image/png',
        'cache-control':'no-store',
        'x-content-type-options':'nosniff',
      });
      response.end(fixtureBytes);
      return;
    }
    if (url.pathname.startsWith('/face/')) {
      const path = safeChild(
        faceDist,
        url.pathname.slice('/face/'.length),
      );
      if (path === null) {
        response.writeHead(400);
        response.end('invalid path');
        return;
      }
      sendFile(response, path);
      return;
    }
    if (url.pathname.startsWith('/vendor/tasks-vision/')) {
      const path = safeChild(
        visionRoot,
        url.pathname.slice('/vendor/tasks-vision/'.length),
      );
      if (path === null) {
        response.writeHead(400);
        response.end('invalid path');
        return;
      }
      sendFile(response, path);
      return;
    }
    response.writeHead(404, {
      'content-type':'text/plain; charset=utf-8',
    });
    response.end('not found');
  });

  try {
    await new Promise((resolveListen, rejectListen) => {
      server.once('error', rejectListen);
      server.listen(SERVER_PORT, '127.0.0.1', resolveListen);
    });
    await waitForHttp(SERVER_ROOT + '/', 'U4B-C server');

    driver = spawn(
      process.env.CHROMEDRIVER?.trim() || 'chromedriver',
      ['--port=' + DRIVER_PORT],
      {stdio:['ignore','pipe','pipe']},
    );
    driverCapture = capture(driver);
    await waitForHttp(DRIVER_ROOT + '/status', 'ChromeDriver');

    const session = await webdriver('/session', 'POST', {
      capabilities:{alwaysMatch:{
        browserName:'chrome',
        'goog:chromeOptions':{args:[
          '--headless=new',
          '--no-sandbox',
          '--disable-dev-shm-usage',
          '--window-size=1280,1024',
        ]},
      }},
    });
    sessionId = session?.sessionId;
    if (typeof sessionId !== 'string' || !sessionId) {
      fail('ChromeDriver did not return session id.');
    }

    await webdriver(
      '/session/' + sessionId + '/url',
      'POST',
      {url:PAGE_URL},
    );
    const result = await waitForResult(sessionId);
    const serialized = JSON.stringify(result);
    const resultSha256 = sha256(
      Buffer.from(serialized, 'utf8'),
    );

    const expectedResultSha256 =
      process.env.FR104_U4B_C_EXPECTED_RESULT_SHA256?.trim();
    if (
      expectedResultSha256
      && resultSha256 !== expectedResultSha256
    ) {
      fail(
        'result digest drift expected='
          + expectedResultSha256
          + ' observed='
          + resultSha256,
      );
    }

    const out =
      process.env.FR104_U4B_C_RESULT_OUT?.trim();
    if (out) {
      const outPath = resolve(process.cwd(), out);
      mkdirSync(dirname(outPath), {recursive:true});
      writeFileSync(outPath, serialized + '\n', 'utf8');
    }

    process.stdout.write(
      'FR104_U4B_C_RESULT_SHA256 '
        + resultSha256
        + '\n',
    );
    process.stdout.write(
      'FR104_U4B_C_STATE '
        + result.assessment.state
        + '\n',
    );
    process.stdout.write(
      'FR104_U4B_C_PROSPECTIVE_RESULT '
        + serialized
        + '\n',
    );
  } catch (error) {
    process.stderr.write(
      (error instanceof Error ? error.stack : String(error))
        + '\n',
    );
    if (driverCapture !== null) {
      process.stderr.write(
        '--- CHROMEDRIVER ---\n'
          + driverCapture.output
          + '\n',
      );
    }
    throw error;
  } finally {
    if (sessionId !== null) {
      try {
        await webdriver(
          '/session/' + sessionId,
          'DELETE',
        );
      } catch {
        // Best-effort cleanup.
      }
    }
    await terminate(driver);
    await new Promise((resolveClose) => {
      server.close(() => resolveClose());
    });
  }
}

await main();
