import { spawn } from 'node:child_process';
import process from 'node:process';
import {
  classifyNeutralEarProviderLabelRelationFR104,
  inverseNeutralEarProviderRotationDegreesFR104,
  NEUTRAL_EAR_MAKEHUMAN_PROVIDER_ROTATION_DEPENDENCE_FR104,
  rotateNeutralEarProviderPointFR104,
} from '../.face-reading-dist/neutral-ear-makehuman-provider-rotation-dependence-fr104.js';

const SERVER_PORT = 4319;
const DRIVER_PORT = 9517;
const SERVER_ROOT = 'http://127.0.0.1:' + SERVER_PORT;
const DRIVER_ROOT = 'http://127.0.0.1:' + DRIVER_PORT;
const PAGE_URL =
  SERVER_ROOT
  + '/fr104-makehuman-provider-rotation-dependence/?autorun=1';
const RESULT_SCHEMA =
  'fr104-provider-rotation-dependence-result-v1';
const ERROR_SCHEMA =
  'fr104-provider-rotation-dependence-error-v1';
const POLL_TIMEOUT_MS = 180_000;
const SHA256_PATTERN = /^[0-9a-f]{64}$/u;

const protocol =
  NEUTRAL_EAR_MAKEHUMAN_PROVIDER_ROTATION_DEPENDENCE_FR104;

function fail(message) {
  throw new Error('FR104 U3.1 CI: ' + message);
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

function distance(left, right) {
  return Math.hypot(
    left.x - right.x,
    left.y - right.y,
  );
}

function midpoint(left, right) {
  return Object.freeze({
    x: (left.x + right.x) / 2,
    y: (left.y + right.y) / 2,
  });
}

function validateProviderEyeCentroids(value, label) {
  const provider = object(value, label);
  const providerLeft = finitePoint(
    provider.providerLeft,
    label + '.providerLeft',
  );
  const providerRight = finitePoint(
    provider.providerRight,
    label + '.providerRight',
  );
  exact(
    provider.topologyLabelAuthority,
    'provider_label_only_no_anatomical_meaning',
    label + '.topologyLabelAuthority',
  );
  return Object.freeze({
    providerLeft,
    providerRight,
  });
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

function validateAuthorityClosed(authority) {
  const value = object(authority, 'authority');
  for (const key of [
    'providerRotationDependenceInvestigated',
    'providerRotationEquivarianceRefutedForExactFixture',
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

function validateEligibility(
  state,
  faceCount,
  landmarkCount,
  providerEyeCentroids,
  label,
) {
  if (state === 'provider_cannot_detect_face') {
    if (
      faceCount === 1
      || landmarkCount !== null
      || providerEyeCentroids !== null
    ) {
      fail(label + ' no-face state inconsistent.');
    }
    return null;
  }
  if (state === 'unavailable') {
    if (
      faceCount !== 1
      || landmarkCount === 478
      || providerEyeCentroids !== null
    ) {
      fail(label + ' unavailable state inconsistent.');
    }
    return null;
  }
  exact(
    state,
    'exact_one_face_478_landmarks_observed',
    label + '.state',
  );
  exact(faceCount, 1, label + '.faceCount');
  exact(landmarkCount, 478, label + '.landmarkCount');
  return validateProviderEyeCentroids(
    providerEyeCentroids,
    label + '.providerEyeCentroids',
  );
}

function recomputeComparison(
  provider,
  baseline,
  rotationDegrees,
) {
  const inverse =
    inverseNeutralEarProviderRotationDegreesFR104(
      rotationDegrees,
    );
  const mappedLeft =
    rotateNeutralEarProviderPointFR104(
      provider.providerLeft,
      inverse,
    );
  const mappedRight =
    rotateNeutralEarProviderPointFR104(
      provider.providerRight,
      inverse,
    );

  const sameLabelCost =
    distance(mappedLeft, baseline.providerLeft)
    + distance(mappedRight, baseline.providerRight);
  const crossLabelCost =
    distance(mappedLeft, baseline.providerRight)
    + distance(mappedRight, baseline.providerLeft);
  const mappedMid = midpoint(mappedLeft, mappedRight);
  const baselineMid = midpoint(
    baseline.providerLeft,
    baseline.providerRight,
  );
  const mappedInterEye =
    distance(mappedLeft, mappedRight);
  const baselineInterEye =
    distance(
      baseline.providerLeft,
      baseline.providerRight,
    );

  return Object.freeze({
    inverseRotationDegrees: inverse,
    mappedLeft,
    mappedRight,
    sameLabelCost,
    crossLabelCost,
    relation:
      classifyNeutralEarProviderLabelRelationFR104(
        sameLabelCost,
        crossLabelCost,
      ),
    unorderedPairCost:
      Math.min(sameLabelCost, crossLabelCost),
    pairMidpointError:
      distance(mappedMid, baselineMid),
    interEyeDistanceAbsoluteDifference:
      Math.abs(mappedInterEye - baselineInterEye),
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
    'bounded_provider_rotation_dependence_candidate_no_anatomical_mapping',
    'authorityState',
  );

  const fixture = object(result.fixture, 'fixture');
  exact(
    fixture.pngSha256,
    protocol.fixture.pngSha256,
    'fixture.pngSha256',
  );
  exact(
    fixture.canonicalRgbaSha256,
    protocol.fixture.canonicalRgbaSha256,
    'fixture.canonicalRgbaSha256',
  );
  exact(
    fixture.width,
    protocol.fixture.width,
    'fixture.width',
  );
  exact(
    fixture.height,
    protocol.fixture.height,
    'fixture.height',
  );
  exact(
    fixture.repositoryPersistence,
    false,
    'fixture.repositoryPersistence',
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
  exact(
    runtime.providerSideRotationHintUsed,
    false,
    'runtime.providerSideRotationHintUsed',
  );

  const boundary = object(
    result.interpretationBoundary,
    'interpretationBoundary',
  );
  exact(
    boundary.anatomicalGroundTruthUsed,
    false,
    'interpretationBoundary.anatomicalGroundTruthUsed',
  );
  exact(
    boundary.anatomicalSideSemanticsUsed,
    false,
    'interpretationBoundary.anatomicalSideSemanticsUsed',
  );
  exact(
    boundary.detectorStageFailureMayBeClaimed,
    false,
    'interpretationBoundary.detectorStageFailureMayBeClaimed',
  );

  const execution = object(result.execution, 'execution');
  exact(
    execution.allEightNativeCasesExecuted,
    true,
    'execution.allEightNativeCasesExecuted',
  );
  exact(
    execution.allEightRotationCanonicalizedControlsExecuted,
    true,
    'execution.allEightRotationCanonicalizedControlsExecuted',
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

  const validated = [];
  for (const [index, expected] of protocol.cases.entries()) {
    const item = object(result.cases[index], 'cases[' + index + ']');
    exact(item.id, expected.id, expected.id + '.id');
    exact(
      item.family,
      expected.family,
      expected.id + '.family',
    );
    exact(
      item.clockwiseRotationDegrees,
      expected.clockwiseRotationDegrees,
      expected.id + '.clockwiseRotationDegrees',
    );

    const native = object(item.native, expected.id + '.native');
    exact(
      native.rgbaSha256,
      expected.predecessorNativeRgbaSha256,
      expected.id + '.native.rgbaSha256',
    );
    if (
      typeof native.rgbaSha256 !== 'string'
      || !SHA256_PATTERN.test(native.rgbaSha256)
    ) {
      fail(expected.id + '.native.rgbaSha256 invalid.');
    }

    const nativeProvider = validateEligibility(
      native.providerEligibilityState,
      native.faceCount,
      native.landmarkCount,
      native.providerEyeCentroids,
      expected.id + '.native',
    );

    const baseline =
      protocol.familyBaselines[expected.family];
    const comparison = item.inverseRotationComparison;
    if (nativeProvider === null) {
      exact(
        comparison,
        null,
        expected.id + '.inverseRotationComparison',
      );
    } else {
      const actual = object(
        comparison,
        expected.id + '.inverseRotationComparison',
      );
      const recomputed = recomputeComparison(
        nativeProvider,
        baseline,
        expected.clockwiseRotationDegrees,
      );
      exact(
        actual.inverseRotationDegrees,
        recomputed.inverseRotationDegrees,
        expected.id + '.inverseRotationDegrees',
      );
      const mapped = object(
        actual.inverseMappedProviderEyeCentroids,
        expected.id + '.inverseMappedProviderEyeCentroids',
      );
      const mappedLeft = finitePoint(
        mapped.providerLeft,
        expected.id + '.mappedLeft',
      );
      const mappedRight = finitePoint(
        mapped.providerRight,
        expected.id + '.mappedRight',
      );
      exact(
        mappedLeft.x,
        recomputed.mappedLeft.x,
        expected.id + '.mappedLeft.x',
      );
      exact(
        mappedLeft.y,
        recomputed.mappedLeft.y,
        expected.id + '.mappedLeft.y',
      );
      exact(
        mappedRight.x,
        recomputed.mappedRight.x,
        expected.id + '.mappedRight.x',
      );
      exact(
        mappedRight.y,
        recomputed.mappedRight.y,
        expected.id + '.mappedRight.y',
      );
      for (const key of [
        'sameLabelCost',
        'crossLabelCost',
        'unorderedPairCost',
        'pairMidpointError',
        'interEyeDistanceAbsoluteDifference',
      ]) {
        exact(
          actual[key],
          recomputed[key],
          expected.id + '.' + key,
        );
      }
      exact(
        actual.relation,
        recomputed.relation,
        expected.id + '.relation',
      );
      exact(
        actual.numericAcceptanceThresholdApplied,
        false,
        expected.id + '.numericAcceptanceThresholdApplied',
      );
    }

    const control = object(
      item.rotationCanonicalizedControl,
      expected.id + '.rotationCanonicalizedControl',
    );
    exact(
      control.inverseRotationDegrees,
      inverseNeutralEarProviderRotationDegreesFR104(
        expected.clockwiseRotationDegrees,
      ),
      expected.id + '.control.inverseRotationDegrees',
    );
    exact(
      control.rgbaSha256,
      baseline.rgbaSha256,
      expected.id + '.control.rgbaSha256',
    );
    exact(
      control.exactFamilyBaselineBytesRecovered,
      true,
      expected.id + '.control.exactFamilyBaselineBytesRecovered',
    );
    const controlProvider = validateEligibility(
      control.providerEligibilityState,
      1,
      478,
      control.providerEyeCentroids,
      expected.id + '.control',
    );
    if (controlProvider === null) {
      fail(expected.id + ' family control must be available.');
    }
    exact(
      controlProvider.providerLeft.x,
      baseline.providerLeft.x,
      expected.id + '.control.providerLeft.x',
    );
    exact(
      controlProvider.providerLeft.y,
      baseline.providerLeft.y,
      expected.id + '.control.providerLeft.y',
    );
    exact(
      controlProvider.providerRight.x,
      baseline.providerRight.x,
      expected.id + '.control.providerRight.x',
    );
    exact(
      controlProvider.providerRight.y,
      baseline.providerRight.y,
      expected.id + '.control.providerRight.y',
    );
    exact(
      control.exactFamilyBaselineProviderScalarsRecovered,
      true,
      expected.id + '.control.exactFamilyBaselineProviderScalarsRecovered',
    );

    validated.push(Object.freeze({
      id: expected.id,
      nativeState: native.providerEligibilityState,
      relation:
        nativeProvider === null
          ? null
          : item.inverseRotationComparison.relation,
      controlRecovered:
        control.exactFamilyBaselineProviderScalarsRecovered,
    }));
  }

  const summary = object(result.summary, 'summary');
  const crossLabelCaseIds = validated
    .filter(
      (item) =>
        item.relation === 'provider_cross_label_closer',
    )
    .map((item) => item.id);
  const recoveredUnavailable = validated
    .filter(
      (item) =>
        item.nativeState
          !== 'exact_one_face_478_landmarks_observed'
        && item.controlRecovered === true,
    )
    .map((item) => item.id);
  const unresolved = validated.some(
    (item) => item.relation === 'equal_or_unresolved',
  );
  const expectedState =
    crossLabelCaseIds.length > 0
      || recoveredUnavailable.length > 0
      ? 'exact_fixture_rotation_dependence_observed'
      : unresolved
        ? 'unresolved'
        : 'no_rotation_dependence_observed';

  exact(summary.state, expectedState, 'summary.state');
  exact(
    summary.providerRotationEquivarianceRefutedForExactFixture,
    expectedState === 'exact_fixture_rotation_dependence_observed',
    'summary.providerRotationEquivarianceRefutedForExactFixture',
  );
  if (
    JSON.stringify(summary.crossLabelCaseIds)
      !== JSON.stringify(crossLabelCaseIds)
  ) {
    fail('summary.crossLabelCaseIds mismatch.');
  }
  if (
    JSON.stringify(
      summary.nativeUnavailableControlRecoveredCaseIds,
    )
      !== JSON.stringify(recoveredUnavailable)
  ) {
    fail(
      'summary.nativeUnavailableControlRecoveredCaseIds mismatch.',
    );
  }
  exact(
    summary.anatomicalInterpretationUsed,
    false,
    'summary.anatomicalInterpretationUsed',
  );
  exact(
    summary.detectorStageFailureClaimed,
    false,
    'summary.detectorStageFailureClaimed',
  );
  exact(
    summary.anatomicalMappingReviewOutcome,
    'hold',
    'summary.anatomicalMappingReviewOutcome',
  );
}

async function waitForResult(sessionId) {
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

    const resultText =
      typeof value?.result === 'string'
        ? value.result.trim()
        : '';
    if (resultText && resultText !== '{}') {
      let result;
      try {
        result = JSON.parse(resultText);
      } catch {
        fail(
          'browser result is not valid JSON: '
            + resultText.slice(0, 600),
        );
      }
      if (result.schemaVersion === ERROR_SCHEMA) {
        fail(
          'browser investigation failed closed: '
            + result.error,
        );
      }
      validateResult(result);
      return result;
    }
    await sleep(750);
  }
  fail('browser investigation result timed out.');
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
      SERVER_ROOT
        + '/fr104-makehuman-provider-rotation-dependence/',
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
      { url: PAGE_URL },
    );

    const result = await waitForResult(sessionId);
    process.stdout.write(
      'FR104_U3_1_EMPIRICAL_RESULT '
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
        // Cleanup must not replace the empirical result.
      }
    }
    await terminate(driver);
    await terminate(server);
  }
}

await main();
