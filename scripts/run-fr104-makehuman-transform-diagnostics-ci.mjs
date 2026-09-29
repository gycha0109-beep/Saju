import { spawn } from 'node:child_process';
import process from 'node:process';
import {
  NEUTRAL_EAR_MAKEHUMAN_PROVIDER_PREFLIGHT_EMPIRICAL_EVIDENCE_FR104,
} from '../.face-reading-dist/neutral-ear-makehuman-provider-preflight-empirical-evidence-fr104.js';
import {
  expectedNeutralEarMakeHumanRelationFR104,
  NEUTRAL_EAR_MAKEHUMAN_TRANSFORM_DIAGNOSTICS_FR104,
  transformNeutralEarMakeHumanPointFR104,
} from '../.face-reading-dist/neutral-ear-makehuman-transform-diagnostics-fr104.js';

const SERVER_PORT = 4318;
const DRIVER_PORT = 9516;
const SERVER_ROOT = 'http://127.0.0.1:' + SERVER_PORT;
const DRIVER_ROOT = 'http://127.0.0.1:' + DRIVER_PORT;
const DIAGNOSTIC_URL =
  SERVER_ROOT
  + '/fr104-makehuman-transform-diagnostics/?autorun=1';
const RESULT_SCHEMA =
  'fr104-makehuman-transform-diagnostic-result-v1';
const ERROR_SCHEMA =
  'fr104-makehuman-transform-diagnostic-error-v1';
const POLL_TIMEOUT_MS = 180_000;
const SHA256_PATTERN = /^[0-9a-f]{64}$/u;

const protocol =
  NEUTRAL_EAR_MAKEHUMAN_TRANSFORM_DIAGNOSTICS_FR104;
const u2 =
  NEUTRAL_EAR_MAKEHUMAN_PROVIDER_PREFLIGHT_EMPIRICAL_EVIDENCE_FR104;

function fail(message) {
  throw new Error('FR104 U3 CI: ' + message);
}

function sleep(milliseconds) {
  return new Promise((resolve) => {
    globalThis.setTimeout(resolve, milliseconds);
  });
}

function capture(child) {
  let output = '';
  const append = (chunk) => {
    output += chunk.toString('utf8');
    if (output.length > 80_000) {
      output = output.slice(-80_000);
    }
  };
  child.stdout?.on('data', append);
  child.stderr?.on('data', append);
  return Object.freeze({
    get output() {
      return output;
    },
  });
}

async function waitForHttp(
  url,
  label,
  timeoutMs = POLL_TIMEOUT_MS,
) {
  const deadline = Date.now() + timeoutMs;
  let lastError = null;
  while (Date.now() < deadline) {
    try {
      const response = await globalThis.fetch(
        url,
        { cache: 'no-store' },
      );
      if (response.ok) return;
      lastError = new Error('HTTP ' + response.status);
    } catch (error) {
      lastError = error;
    }
    await sleep(500);
  }
  fail(
    label + ' did not become ready: '
      + (
        lastError instanceof Error
          ? lastError.message
          : String(lastError)
      ),
  );
}

async function webdriver(
  path,
  method = 'GET',
  body = undefined,
) {
  const response = await globalThis.fetch(DRIVER_ROOT + path, {
    method,
    headers: body === undefined
      ? undefined
      : { 'content-type': 'application/json; charset=utf-8' },
    body: body === undefined
      ? undefined
      : JSON.stringify(body),
  });
  const payload = await response.json();
  if (!response.ok) {
    fail(
      'ChromeDriver HTTP '
        + response.status
        + ': '
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

function finitePoint(value, label) {
  const point = object(value, label);
  if (
    !Number.isFinite(point.x)
    || !Number.isFinite(point.y)
    || point.x < 0
    || point.x > 1
    || point.y < 0
    || point.y > 1
  ) {
    fail(label + ' must be finite in [0,1].');
  }
  return point;
}

function exact(actual, expected, label) {
  if (!Object.is(actual, expected)) {
    fail(
      label
        + ' expected='
        + expected
        + ' observed='
        + actual,
    );
  }
}

function distance(left, right) {
  return Math.hypot(
    left.x - right.x,
    left.y - right.y,
  );
}

function relation(providerLeft, providerRight, groundTruth) {
  const directCost =
    distance(
      providerLeft,
      groundTruth.anatomicalLeftEye,
    )
    + distance(
      providerRight,
      groundTruth.anatomicalRightEye,
    );
  const swappedCost =
    distance(
      providerLeft,
      groundTruth.anatomicalRightEye,
    )
    + distance(
      providerRight,
      groundTruth.anatomicalLeftEye,
    );

  return Object.freeze({
    directCost,
    swappedCost,
    relation:
      directCost < swappedCost
        ? 'direct_assignment_closer'
        : swappedCost < directCost
          ? 'swapped_assignment_closer'
          : 'equal_or_unresolved',
  });
}

function validateAuthorityClosed(authority) {
  const value = object(authority, 'authority');
  for (const key of [
    'exactMakeHumanFixtureTransformDiagnosticsExecuted',
    'parityConditionedAssignmentPatternObserved',
    'providerLabelMappedToAnatomicalSide',
    'globalProviderAnatomicalSemanticsEstablished',
    'anatomicalReferenceAdmitted',
    'anatomicalLateralityAuthorized',
    'validatedExternalEarObservationAuthorized',
    'traditionalBindingAuthorized',
    'productionAuthorization',
  ]) {
    exact(value[key], false, 'authority.' + key);
  }
}

function validatePrivacy(privacy) {
  const value = object(privacy, 'privacy');
  for (const key of [
    'userImageConsumed',
    'cameraAccessed',
    'rawProviderLandmarksReturned',
    'rawProviderLandmarksPersisted',
    'transformedRasterPersisted',
    'biometricEmbeddingProduced',
    'identityTemplateProduced',
  ]) {
    exact(value[key], false, 'privacy.' + key);
  }
}

function validateR0(caseResult) {
  exact(caseResult.id, 'R0', 'R0.id');
  exact(
    caseResult.providerEligibility?.state,
    'exact_one_face_478_landmarks_observed',
    'R0.providerEligibility.state',
  );

  const providerLeft = finitePoint(
    caseResult.providerEyeCentroids?.providerLeft,
    'R0.providerLeft',
  );
  const providerRight = finitePoint(
    caseResult.providerEyeCentroids?.providerRight,
    'R0.providerRight',
  );

  exact(
    providerLeft.x,
    u2.providerEyeCentroids.providerLeft.x,
    'R0.providerLeft.x',
  );
  exact(
    providerLeft.y,
    u2.providerEyeCentroids.providerLeft.y,
    'R0.providerLeft.y',
  );
  exact(
    providerRight.x,
    u2.providerEyeCentroids.providerRight.x,
    'R0.providerRight.x',
  );
  exact(
    providerRight.y,
    u2.providerEyeCentroids.providerRight.y,
    'R0.providerRight.y',
  );
  exact(
    caseResult.comparison?.directCost,
    u2.comparison.directCost,
    'R0.directCost',
  );
  exact(
    caseResult.comparison?.swappedCost,
    u2.comparison.swappedCost,
    'R0.swappedCost',
  );
  exact(
    caseResult.comparison?.relation,
    u2.comparison.relation,
    'R0.relation',
  );
}

function validateCase(caseResult, caseProtocol) {
  exact(caseResult.id, caseProtocol.id, caseProtocol.id + '.id');
  exact(
    caseResult.horizontalMirror,
    caseProtocol.horizontalMirror,
    caseProtocol.id + '.horizontalMirror',
  );
  exact(
    caseResult.clockwiseRotationDegrees,
    caseProtocol.clockwiseRotationDegrees,
    caseProtocol.id + '.clockwiseRotationDegrees',
  );
  exact(
    caseResult.transformOrder,
    protocol.transformOrder,
    caseProtocol.id + '.transformOrder',
  );
  exact(
    caseResult.reflectionParity,
    caseProtocol.reflectionParity,
    caseProtocol.id + '.reflectionParity',
  );
  exact(
    caseResult.expectedRelationHypothesis,
    expectedNeutralEarMakeHumanRelationFR104(
      caseProtocol.reflectionParity,
    ),
    caseProtocol.id + '.expectedRelationHypothesis',
  );

  if (
    typeof caseResult.transformedRgbaSha256 !== 'string'
    || !SHA256_PATTERN.test(caseResult.transformedRgbaSha256)
  ) {
    fail(caseProtocol.id + '.transformedRgbaSha256 invalid.');
  }

  const expectedLeft =
    transformNeutralEarMakeHumanPointFR104(
      protocol.independentAnatomicalGroundTruth
        .anatomicalLeftEye,
      caseProtocol,
    );
  const expectedRight =
    transformNeutralEarMakeHumanPointFR104(
      protocol.independentAnatomicalGroundTruth
        .anatomicalRightEye,
      caseProtocol,
    );
  const actualGroundTruth = object(
    caseResult.transformedAnatomicalGroundTruth,
    caseProtocol.id + '.transformedAnatomicalGroundTruth',
  );
  const actualLeft = finitePoint(
    actualGroundTruth.anatomicalLeftEye,
    caseProtocol.id + '.anatomicalLeftEye',
  );
  const actualRight = finitePoint(
    actualGroundTruth.anatomicalRightEye,
    caseProtocol.id + '.anatomicalRightEye',
  );
  exact(
    actualLeft.x,
    expectedLeft.x,
    caseProtocol.id + '.anatomicalLeftEye.x',
  );
  exact(
    actualLeft.y,
    expectedLeft.y,
    caseProtocol.id + '.anatomicalLeftEye.y',
  );
  exact(
    actualRight.x,
    expectedRight.x,
    caseProtocol.id + '.anatomicalRightEye.x',
  );
  exact(
    actualRight.y,
    expectedRight.y,
    caseProtocol.id + '.anatomicalRightEye.y',
  );
  exact(
    actualGroundTruth.anatomicalIdentityPreserved,
    true,
    caseProtocol.id + '.anatomicalIdentityPreserved',
  );

  const eligibility = object(
    caseResult.providerEligibility,
    caseProtocol.id + '.providerEligibility',
  );
  const state = eligibility.state;
  if (state === 'provider_cannot_detect_face') {
    if (
      eligibility.faceCount === 1
      || eligibility.landmarkCount !== null
      || eligibility.exactlyOneFaceVerified !== false
      || caseResult.providerEyeCentroids !== null
      || caseResult.comparison !== null
      || caseResult.matchesExpectedRelationHypothesis !== null
    ) {
      fail(caseProtocol.id + ' no-face state inconsistent.');
    }
    return;
  }

  if (state === 'unavailable') {
    if (
      eligibility.faceCount !== 1
      || eligibility.landmarkCount === 478
      || eligibility.exactlyOneFaceVerified !== true
      || caseResult.providerEyeCentroids !== null
      || caseResult.comparison !== null
      || caseResult.matchesExpectedRelationHypothesis !== null
    ) {
      fail(
        caseProtocol.id
          + ' unexpected-landmark state inconsistent.',
      );
    }
    return;
  }

  exact(
    state,
    'exact_one_face_478_landmarks_observed',
    caseProtocol.id + '.providerEligibility.state',
  );
  exact(
    eligibility.faceCount,
    1,
    caseProtocol.id + '.faceCount',
  );
  exact(
    eligibility.landmarkCount,
    478,
    caseProtocol.id + '.landmarkCount',
  );
  exact(
    eligibility.exactlyOneFaceVerified,
    true,
    caseProtocol.id + '.exactlyOneFaceVerified',
  );

  const provider = object(
    caseResult.providerEyeCentroids,
    caseProtocol.id + '.providerEyeCentroids',
  );
  const providerLeft = finitePoint(
    provider.providerLeft,
    caseProtocol.id + '.providerLeft',
  );
  const providerRight = finitePoint(
    provider.providerRight,
    caseProtocol.id + '.providerRight',
  );
  exact(
    provider.topologyLabelAuthority,
    'provider_label_only_no_anatomical_meaning',
    caseProtocol.id + '.topologyLabelAuthority',
  );

  const comparison = object(
    caseResult.comparison,
    caseProtocol.id + '.comparison',
  );
  const recomputed = relation(
    providerLeft,
    providerRight,
    Object.freeze({
      anatomicalLeftEye: actualLeft,
      anatomicalRightEye: actualRight,
    }),
  );
  exact(
    comparison.directCost,
    recomputed.directCost,
    caseProtocol.id + '.directCost',
  );
  exact(
    comparison.swappedCost,
    recomputed.swappedCost,
    caseProtocol.id + '.swappedCost',
  );
  exact(
    comparison.relation,
    recomputed.relation,
    caseProtocol.id + '.relation',
  );
  exact(
    comparison.numericAcceptanceThresholdApplied,
    false,
    caseProtocol.id + '.numericAcceptanceThresholdApplied',
  );
  exact(
    caseResult.matchesExpectedRelationHypothesis,
    comparison.relation
      === caseProtocol.expectedRelationHypothesis,
    caseProtocol.id + '.matchesExpectedRelationHypothesis',
  );
}

function recomputeDiagnosticSummary(cases) {
  const unavailableCaseIds = cases
    .filter(
      (item) =>
        item.providerEligibility.state
          !== 'exact_one_face_478_landmarks_observed',
    )
    .map((item) => item.id);
  const unresolvedCaseIds = cases
    .filter(
      (item) =>
        item.comparison?.relation === 'equal_or_unresolved',
    )
    .map((item) => item.id);
  const hypothesisMismatchCaseIds = cases
    .filter(
      (item) =>
        item.matchesExpectedRelationHypothesis === false,
    )
    .map((item) => item.id);

  let state =
    'transform_consistent_with_parity_conditioned_hypothesis';
  if (unavailableCaseIds.length > 0) {
    state = 'incomplete_provider_coverage';
  } else if (unresolvedCaseIds.length > 0) {
    state = 'equal_or_unresolved';
  } else if (hypothesisMismatchCaseIds.length > 0) {
    state = 'transform_inconsistent';
  }

  return Object.freeze({
    state,
    unavailableCaseIds,
    unresolvedCaseIds,
    hypothesisMismatchCaseIds,
  });
}

function validateResult(result) {
  if (
    typeof result !== 'object'
    || result === null
    || result.schemaVersion !== RESULT_SCHEMA
  ) {
    fail('unexpected result schema.');
  }
  exact(
    result.authorityState,
    'bounded_transform_scalar_evidence_candidate_no_anatomical_mapping',
    'authorityState',
  );

  const fixture = object(
    result.canonicalFixture,
    'canonicalFixture',
  );
  exact(
    fixture.pngSha256,
    protocol.canonicalFixture.pngSha256,
    'canonicalFixture.pngSha256',
  );
  if (
    typeof fixture.canonicalRgbaSha256 !== 'string'
    || !SHA256_PATTERN.test(fixture.canonicalRgbaSha256)
  ) {
    fail('canonicalFixture.canonicalRgbaSha256 invalid.');
  }
  exact(
    fixture.width,
    protocol.canonicalFixture.width,
    'canonicalFixture.width',
  );
  exact(
    fixture.height,
    protocol.canonicalFixture.height,
    'canonicalFixture.height',
  );
  exact(
    fixture.repositoryPersistence,
    false,
    'canonicalFixture.repositoryPersistence',
  );

  const runtime = object(result.runtime, 'runtime');
  for (const key of [
    'packageName',
    'packageVersion',
    'wasmRoot',
    'modelAssetRef',
    'runningMode',
    'numFaces',
  ]) {
    exact(runtime[key], protocol.runtime[key], 'runtime.' + key);
  }

  const transformContract = object(
    result.transformContract,
    'transformContract',
  );
  exact(
    transformContract.order,
    protocol.transformOrder,
    'transformContract.order',
  );
  for (const key of [
    'interpolationApplied',
    'resizeApplied',
    'cropApplied',
    'exifTransformApplied',
    'cssTransformApplied',
  ]) {
    exact(
      transformContract[key],
      false,
      'transformContract.' + key,
    );
  }
  exact(
    transformContract.taskImageProcessingRotationDegrees,
    0,
    'transformContract.taskImageProcessingRotationDegrees',
  );

  const execution = object(result.execution, 'execution');
  exact(
    execution.allEightCasesExecuted,
    true,
    'execution.allEightCasesExecuted',
  );
  exact(
    execution.empiricalResultAdmitted,
    false,
    'execution.empiricalResultAdmitted',
  );
  validatePrivacy(result.privacy);
  validateAuthorityClosed(result.authority);

  if (!Array.isArray(result.cases) || result.cases.length !== 8) {
    fail('cases must contain exactly eight entries.');
  }
  for (let index = 0; index < protocol.cases.length; index += 1) {
    validateCase(result.cases[index], protocol.cases[index]);
  }

  exact(
    result.cases[0].transformedRgbaSha256,
    fixture.canonicalRgbaSha256,
    'R0 RGBA SHA must equal canonical RGBA SHA',
  );
  validateR0(result.cases[0]);

  const summary = recomputeDiagnosticSummary(result.cases);
  const actualSummary = object(
    result.diagnosticSummary,
    'diagnosticSummary',
  );
  exact(
    actualSummary.state,
    summary.state,
    'diagnosticSummary.state',
  );
  for (const key of [
    'unavailableCaseIds',
    'unresolvedCaseIds',
    'hypothesisMismatchCaseIds',
  ]) {
    if (
      JSON.stringify(actualSummary[key])
      !== JSON.stringify(summary[key])
    ) {
      fail('diagnosticSummary.' + key + ' mismatch.');
    }
  }
  exact(
    actualSummary
      .scientificOutcomeMayFailHypothesisWithoutHarnessFailure,
    true,
    'diagnosticSummary.scientificOutcomeMayFailHypothesisWithoutHarnessFailure',
  );
}

async function waitForDiagnosticResult(sessionId) {
  const deadline = Date.now() + POLL_TIMEOUT_MS;
  while (Date.now() < deadline) {
    const value = await webdriver(
      '/session/' + sessionId + '/execute/sync',
      'POST',
      {
        script: `
          const status =
            document.querySelector('#status')?.textContent ?? '';
          const result =
            document.querySelector('#result')?.textContent ?? '';
          return { status, result };
        `,
        args: [],
      },
    );

    const text =
      typeof value?.result === 'string'
        ? value.result.trim()
        : '';
    if (text && text !== '{}') {
      let result;
      try {
        result = JSON.parse(text);
      } catch {
        fail(
          'browser result is not valid JSON: '
            + text.slice(0, 600),
        );
      }
      if (result.schemaVersion === ERROR_SCHEMA) {
        fail('browser diagnostics failed closed: ' + result.error);
      }
      validateResult(result);
      return result;
    }
    await sleep(750);
  }
  fail('browser diagnostic result timed out.');
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
    serverCapture = capture(server);
    await waitForHttp(
      SERVER_ROOT + '/fr104-makehuman-transform-diagnostics/',
      'MESH6J server',
    );
    if (server.exitCode !== null) {
      fail(
        'MESH6J server exited early.\n'
          + serverCapture.output,
      );
    }

    driver = spawn(
      process.env.CHROMEDRIVER?.trim() || 'chromedriver',
      ['--port=' + DRIVER_PORT],
      { stdio: ['ignore', 'pipe', 'pipe'] },
    );
    driverCapture = capture(driver);
    await waitForHttp(DRIVER_ROOT + '/status', 'ChromeDriver');
    if (driver.exitCode !== null) {
      fail(
        'ChromeDriver exited early.\n'
          + driverCapture.output,
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
      { url: DIAGNOSTIC_URL },
    );

    const result = await waitForDiagnosticResult(sessionId);
    process.stdout.write(
      'FR104_U3_EMPIRICAL_RESULT '
        + JSON.stringify(result)
        + '\n',
    );
  } catch (error) {
    const detail = [
      error instanceof Error
        ? error.stack ?? error.message
        : String(error),
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
