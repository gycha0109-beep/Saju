import { spawn } from 'node:child_process';
import process from 'node:process';
import {
  NEUTRAL_EAR_MAKEHUMAN_PROVIDER_PREFLIGHT_EMPIRICAL_SOURCE_FR104,
} from '../.face-reading-dist/neutral-ear-makehuman-provider-preflight-empirical-evidence-fr104.js';

const SERVER_PORT = 4317;
const DRIVER_PORT = 9515;
const SERVER_ROOT = 'http://127.0.0.1:' + SERVER_PORT;
const DRIVER_ROOT = 'http://127.0.0.1:' + DRIVER_PORT;
const PREFLIGHT_URL =
  SERVER_ROOT + '/fr104-makehuman-preflight/?autorun=1';
const EXPECTED_FIXTURE_SHA256 =
  'f72a976d90d61223b8ad273d8d8da98ecd6ed0d1a63dff08ded358eef54e92bb';
const RESULT_SCHEMA =
  'fr104-makehuman-provider-preflight-result-v1';
const ERROR_SCHEMA =
  'fr104-makehuman-provider-preflight-error-v1';
const POLL_TIMEOUT_MS = 120_000;

function fail(message) {
  throw new Error('FR104 U2 CI: ' + message);
}

function sleep(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

function capture(child, label) {
  let output = '';
  const append = (chunk) => {
    output += chunk.toString('utf8');
    if (output.length > 50_000) {
      output = output.slice(-50_000);
    }
  };
  child.stdout?.on('data', append);
  child.stderr?.on('data', append);
  return Object.freeze({
    label,
    get output() {
      return output;
    },
  });
}

async function waitForHttp(url, label, timeoutMs = POLL_TIMEOUT_MS) {
  const deadline = Date.now() + timeoutMs;
  let lastError = null;
  while (Date.now() < deadline) {
    try {
      const response = await globalThis.fetch(url, { cache: 'no-store' });
      if (response.ok) return;
      lastError = new Error('HTTP ' + response.status);
    } catch (error) {
      lastError = error;
    }
    await sleep(500);
  }
  fail(
    label + ' did not become ready: '
      + (lastError instanceof Error ? lastError.message : String(lastError)),
  );
}

async function webdriver(path, method = 'GET', body = undefined) {
  const response = await globalThis.fetch(DRIVER_ROOT + path, {
    method,
    headers: body === undefined
      ? undefined
      : { 'content-type': 'application/json; charset=utf-8' },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const payload = await response.json();
  if (!response.ok) {
    fail(
      'ChromeDriver HTTP ' + response.status + ': '
        + JSON.stringify(payload),
    );
  }
  if (
    payload
    && typeof payload === 'object'
    && payload.value
    && typeof payload.value === 'object'
    && payload.value.error
  ) {
    fail(
      'ChromeDriver '
        + payload.value.error
        + ': '
        + (payload.value.message ?? ''),
    );
  }
  return payload.value;
}

function finitePoint(point, label) {
  if (
    typeof point !== 'object'
    || point === null
    || !Number.isFinite(point.x)
    || !Number.isFinite(point.y)
    || point.x < 0
    || point.x > 1
    || point.y < 0
    || point.y > 1
  ) {
    fail(label + ' must be a normalized finite point.');
  }
}

function validateAuthorityClosed(authority) {
  if (typeof authority !== 'object' || authority === null) {
    fail('authority block unavailable.');
  }
  for (const key of [
    'providerFaceDetectabilityVerified',
    'providerLabelMappedToAnatomicalSide',
    'anatomicalReferenceAdmitted',
    'anatomicalLateralityAuthorized',
    'validatedExternalEarObservationAuthorized',
    'traditionalBindingAuthorized',
    'productionAuthorization',
  ]) {
    if (authority[key] !== false) {
      fail('authority.' + key + ' must remain false.');
    }
  }
}

function validateEmpiricalResult(result) {
  if (
    typeof result !== 'object'
    || result === null
    || result.schemaVersion !== RESULT_SCHEMA
  ) {
    fail('unexpected empirical result schema.');
  }

  if (
    result.fixture?.expectedSha256 !== EXPECTED_FIXTURE_SHA256
    || result.fixture?.observedSha256 !== EXPECTED_FIXTURE_SHA256
    || result.fixture?.digestVerified !== true
    || result.fixture?.width !== 1024
    || result.fixture?.height !== 1024
    || result.fixture?.repositoryPersistence !== false
  ) {
    fail('fixture identity or digest verification drift.');
  }

  if (
    result.runtime?.packageName !== '@mediapipe/tasks-vision'
    || result.runtime?.packageVersion !== '0.10.35'
    || result.runtime?.runningMode !== 'IMAGE'
    || result.runtime?.numFaces !== 1
  ) {
    fail('provider runtime contract drift.');
  }

  if (
    result.execution?.providerPreflightExecuted !== true
    || result.execution?.empiricalResultAdmitted !== false
  ) {
    fail('execution/admission boundary drift.');
  }

  if (
    result.privacy?.userImageConsumed !== false
    || result.privacy?.cameraAccessed !== false
    || result.privacy?.rawProviderLandmarksReturned !== false
    || result.privacy?.rawProviderLandmarksPersisted !== false
    || result.privacy?.biometricEmbeddingProduced !== false
    || result.privacy?.identityTemplateProduced !== false
  ) {
    fail('privacy boundary drift.');
  }
  validateAuthorityClosed(result.authority);

  const state = result.providerEligibility?.state;
  if (state === 'provider_cannot_detect_face') {
    if (
      result.providerEligibility.faceCount === 1
      || result.providerEligibility.exactlyOneFaceVerified !== false
      || result.providerEyeCentroids !== null
      || result.comparison !== null
    ) {
      fail('no-face bounded result is internally inconsistent.');
    }
    return;
  }

  if (state === 'unavailable') {
    if (
      result.providerEligibility.faceCount !== 1
      || result.providerEligibility.exactlyOneFaceVerified !== true
      || result.providerEligibility.landmarkCount === 478
      || result.providerEyeCentroids !== null
      || result.comparison !== null
    ) {
      fail('unexpected-landmark bounded result is internally inconsistent.');
    }
    return;
  }

  if (state !== 'exact_one_face_478_landmarks_observed') {
    fail('unknown provider eligibility state: ' + state);
  }
  if (
    result.providerEligibility.faceCount !== 1
    || result.providerEligibility.landmarkCount !== 478
    || result.providerEligibility.exactlyOneFaceVerified !== true
    || result.execution.providerFaceDetectabilityObserved !== true
  ) {
    fail('successful provider eligibility evidence is incomplete.');
  }

  finitePoint(
    result.providerEyeCentroids?.providerLeft,
    'provider left eye centroid',
  );
  finitePoint(
    result.providerEyeCentroids?.providerRight,
    'provider right eye centroid',
  );
  finitePoint(
    result.independentAnatomicalGroundTruth?.anatomicalLeftEye,
    'anatomical left eye',
  );
  finitePoint(
    result.independentAnatomicalGroundTruth?.anatomicalRightEye,
    'anatomical right eye',
  );

  if (
    !Number.isFinite(result.comparison?.directCost)
    || !Number.isFinite(result.comparison?.swappedCost)
    || result.comparison?.numericAcceptanceThresholdApplied !== false
    || ![
      'direct_assignment_closer',
      'swapped_assignment_closer',
      'equal_or_unresolved',
    ].includes(result.comparison?.relation)
  ) {
    fail('bounded provider/anatomical comparison is invalid.');
  }
}

function validatePinnedEmpiricalMatch(result) {
  const expected =
    NEUTRAL_EAR_MAKEHUMAN_PROVIDER_PREFLIGHT_EMPIRICAL_SOURCE_FR104;

  const actualProvider = result.providerEyeCentroids;
  const expectedProvider = expected.providerEyeCentroids;
  for (const side of ['providerLeft', 'providerRight']) {
    for (const axis of ['x', 'y']) {
      if (
        !Object.is(
          actualProvider?.[side]?.[axis],
          expectedProvider[side][axis],
        )
      ) {
        fail(
          'pinned empirical provider centroid drift: '
            + side
            + '.'
            + axis
            + ' expected='
            + expectedProvider[side][axis]
            + ' observed='
            + actualProvider?.[side]?.[axis],
        );
      }
    }
  }

  for (const key of ['directCost', 'swappedCost']) {
    if (
      !Object.is(
        result.comparison?.[key],
        expected.comparison[key],
      )
    ) {
      fail(
        'pinned empirical comparison drift: '
          + key
          + ' expected='
          + expected.comparison[key]
          + ' observed='
          + result.comparison?.[key],
      );
    }
  }
  if (result.comparison?.relation !== expected.comparison.relation) {
    fail(
      'pinned empirical relation drift: expected='
        + expected.comparison.relation
        + ' observed='
        + result.comparison?.relation,
    );
  }
}

async function waitForEmpiricalResult(sessionId) {
  const deadline = Date.now() + POLL_TIMEOUT_MS;
  while (Date.now() < deadline) {
    const value = await webdriver(
      '/session/' + sessionId + '/execute/sync',
      'POST',
      {
        script: `
          const status = document.querySelector('#status')?.textContent ?? '';
          const result = document.querySelector('#result')?.textContent ?? '';
          return { status, result };
        `,
        args: [],
      },
    );

    const resultText =
      typeof value?.result === 'string'
        ? value.result.trim()
        : '';
    if (resultText && resultText !== '{}') {
      let result;
      try {
        result = JSON.parse(resultText);
      } catch {
        fail('browser result is not valid JSON: ' + resultText.slice(0, 500));
      }
      if (result.schemaVersion === ERROR_SCHEMA) {
        fail('browser preflight failed closed: ' + result.error);
      }
      validateEmpiricalResult(result);
      validatePinnedEmpiricalMatch(result);
      return result;
    }
    await sleep(750);
  }
  fail('browser preflight result timed out.');
}

async function terminate(child) {
  if (child === null || child.exitCode !== null) return;
  child.kill('SIGTERM');
  await Promise.race([
    new Promise((resolve) => child.once('exit', resolve)),
    sleep(2_000),
  ]);
  if (child.exitCode === null) child.kill('SIGKILL');
}

async function main() {
  let server = null;
  let driver = null;
  let sessionId = null;
  let serverCapture = null;
  let driverCapture = null;

  try {
    server = spawn(
      process.execPath,
      ['scripts/mesh6j-manual-browser-capture-preview.mjs'],
      {
        env: {
          ...process.env,
          MESH6J_PORT: String(SERVER_PORT),
        },
        stdio: ['ignore', 'pipe', 'pipe'],
      },
    );
    serverCapture = capture(server, 'MESH6J server');
    await waitForHttp(
      SERVER_ROOT + '/fr104-makehuman-preflight/',
      'MESH6J server',
    );
    if (server.exitCode !== null) {
      fail(
        'MESH6J server exited early.\n' + serverCapture.output,
      );
    }

    driver = spawn(
      process.env.CHROMEDRIVER?.trim() || 'chromedriver',
      ['--port=' + DRIVER_PORT],
      { stdio: ['ignore', 'pipe', 'pipe'] },
    );
    driverCapture = capture(driver, 'ChromeDriver');
    await waitForHttp(DRIVER_ROOT + '/status', 'ChromeDriver');
    if (driver.exitCode !== null) {
      fail(
        'ChromeDriver exited early.\n' + driverCapture.output,
      );
    }

    const session = await webdriver('/session', 'POST', {
      capabilities: {
        alwaysMatch: {
          browserName: 'chrome',
          'goog:chromeOptions': {
            args: [
              '--headless=new',
              '--no-sandbox',
              '--disable-dev-shm-usage',
              '--window-size=1280,1024',
            ],
          },
        },
      },
    });
    sessionId = session?.sessionId;
    if (typeof sessionId !== 'string' || sessionId.length === 0) {
      fail('ChromeDriver did not return a session id.');
    }

    await webdriver(
      '/session/' + sessionId + '/url',
      'POST',
      { url: PREFLIGHT_URL },
    );

    const result = await waitForEmpiricalResult(sessionId);
    process.stdout.write(
      'FR104_U2_EMPIRICAL_RESULT ' + JSON.stringify(result) + '\n',
    );
  } catch (error) {
    const detail = [
      error instanceof Error ? error.stack ?? error.message : String(error),
      serverCapture?.output
        ? '\n--- MESH6J SERVER ---\n' + serverCapture.output
        : '',
      driverCapture?.output
        ? '\n--- CHROMEDRIVER ---\n' + driverCapture.output
        : '',
    ].join('');
    process.stderr.write(detail + '\n');
    process.exitCode = 1;
  } finally {
    if (sessionId !== null) {
      try {
        await webdriver('/session/' + sessionId, 'DELETE');
      } catch {
        // Cleanup failure must not replace the empirical result.
      }
    }
    await terminate(driver);
    await terminate(server);
  }
}

await main();
