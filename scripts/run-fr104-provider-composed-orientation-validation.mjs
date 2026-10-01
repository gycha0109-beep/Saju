import { spawn } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import process from 'node:process';
import {
  NEUTRAL_EAR_PROSPECTIVE_COMPOSED_ORIENTATION_VALIDATION_FR104,
} from '../.face-reading-dist/neutral-ear-prospective-composed-orientation-validation-fr104.js';

const SERVER_PORT = 4321;
const DRIVER_PORT = 9519;
const SERVER_ROOT = 'http://127.0.0.1:' + SERVER_PORT;
const DRIVER_ROOT = 'http://127.0.0.1:' + DRIVER_PORT;
const PAGE_URL =
  SERVER_ROOT
  + '/fr104-provider-composed-orientation-validation/?autorun=1';
const RESULT_SCHEMA =
  'fr104-prospective-composed-orientation-normalization-result-v1';
const ERROR_SCHEMA =
  'fr104-prospective-composed-orientation-normalization-error-v1';
const POLL_TIMEOUT_MS = 180_000;

const protocol =
  NEUTRAL_EAR_PROSPECTIVE_COMPOSED_ORIENTATION_VALIDATION_FR104;

function fail(message) {
  throw new Error('FR104 U3.3 prospective runner: ' + message);
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

async function waitForHttp(url, label) {
  const deadline = Date.now() + POLL_TIMEOUT_MS;
  let lastError = null;
  while (Date.now() < deadline) {
    try {
      const response =
        await globalThis.fetch(url, { cache:'no-store' });
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

  const predecessor = object(result.predecessor, 'predecessor');
  exact(
    predecessor.derivedResultSha256,
    protocol.predecessor.derivedResultSha256,
    'predecessor.derivedResultSha256',
  );
  exact(
    predecessor.selectedHypothesis,
    'original_input_image_frame',
    'predecessor.selectedHypothesis',
  );

  const fixture = object(result.fixture, 'fixture');
  exact(
    fixture.fixtureRef,
    protocol.fixture.fixtureRef,
    'fixture.fixtureRef',
  );
  exact(
    fixture.expectedSha256,
    protocol.fixture.sha256,
    'fixture.expectedSha256',
  );
  exact(
    fixture.observedSha256,
    protocol.fixture.sha256,
    'fixture.observedSha256',
  );
  exact(fixture.digestVerified, true, 'fixture.digestVerified');
  exact(
    fixture.width,
    protocol.fixture.expectedWidth,
    'fixture.width',
  );
  exact(
    fixture.height,
    protocol.fixture.expectedHeight,
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
    protocol.runtime.packageName,
    'runtime.packageName',
  );
  exact(
    runtime.packageVersion,
    protocol.runtime.packageVersion,
    'runtime.packageVersion',
  );
  exact(
    runtime.imageProcessingOptionsRotationDegreesUsed,
    true,
    'runtime.imageProcessingOptionsRotationDegreesUsed',
  );

  const rule = object(result.frozenComposedRule, 'frozenComposedRule');
  exact(
    rule.providerInferenceCompensation,
    'rotationDegrees_equals_inverse_physical_rotation',
    'rule.providerInferenceCompensation',
  );
  exact(
    rule.providerOutputCoordinateFrame,
    'original_input_image_frame',
    'rule.providerOutputCoordinateFrame',
  );
  exact(
    rule.outputCoordinateNormalization,
    'explicit_inverse_physical_rotation_of_returned_provider_coordinates',
    'rule.outputCoordinateNormalization',
  );
  exact(
    rule.ruleMayBeRetunedAfterProspectiveObservation,
    false,
    'rule.ruleMayBeRetunedAfterProspectiveObservation',
  );

  if (!Array.isArray(result.cases) || result.cases.length !== 8) {
    fail('cases must contain exactly eight entries.');
  }
  for (const [index, expected] of protocol.cases.entries()) {
    const item = object(result.cases[index], 'cases[' + index + ']');
    exact(item.id, expected.id, expected.id + '.id');
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
  }

  const zero = object(result.zeroDegreeControls, 'zeroDegreeControls');
  for (const id of ['R0','M0']) {
    const control = object(zero[id], 'zeroDegreeControls.' + id);
    if (control.available) {
      exact(
        control.composedUnorderedPairCost,
        0,
        'zeroDegreeControls.' + id + '.composedUnorderedPairCost',
      );
    }
  }

  const assessment = object(result.assessment, 'assessment');
  if (!protocol.scientificStates.includes(assessment.state)) {
    fail('assessment.state is not preregistered.');
  }
  exact(
    assessment.numericAcceptanceThresholdApplied,
    false,
    'assessment.numericAcceptanceThresholdApplied',
  );
  exact(
    assessment.providerLabelsUsedForDecision,
    false,
    'assessment.providerLabelsUsedForDecision',
  );
  exact(
    assessment.anatomicalInterpretationUsed,
    false,
    'assessment.anatomicalInterpretationUsed',
  );

  const boundary = object(
    result.interpretationBoundary,
    'interpretationBoundary',
  );
  exact(
    boundary.providerLabelsUsedForDecision,
    false,
    'boundary.providerLabelsUsedForDecision',
  );
  exact(
    boundary.anatomicalGroundTruthUsed,
    false,
    'boundary.anatomicalGroundTruthUsed',
  );
  exact(
    boundary.anatomicalSideSemanticsUsed,
    false,
    'boundary.anatomicalSideSemanticsUsed',
  );
  exact(
    boundary.priorMirrorResultUsedToRetuneRule,
    false,
    'boundary.priorMirrorResultUsedToRetuneRule',
  );
  exact(
    boundary.hypothesisFailureIsHarnessFailure,
    false,
    'boundary.hypothesisFailureIsHarnessFailure',
  );

  const execution = object(result.execution, 'execution');
  exact(
    execution.allEightCasesAttempted,
    true,
    'execution.allEightCasesAttempted',
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
  for (const key of [
    'prospectiveComposedNormalizationValidated',
    'providerCompensatedOutputFrameProspectivelyValidated',
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
        env:{
          ...process.env,
          MESH6J_PORT:String(SERVER_PORT),
        },
        stdio:['ignore','pipe','pipe'],
      },
    );
    serverCapture = capture(server);
    await waitForHttp(
      SERVER_ROOT
        + '/fr104-provider-composed-orientation-validation/',
      'MESH6J server',
    );

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
    const resultSha256 = createHash('sha256')
      .update(serialized)
      .digest('hex');

    const expectedResultSha256 =
      process.env.FR104_U3_3_EXPECTED_RESULT_SHA256?.trim();
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

    const resultOut =
      process.env.FR104_U3_3_RESULT_OUT?.trim();
    if (resultOut) {
      const outputPath = resolve(process.cwd(), resultOut);
      mkdirSync(dirname(outputPath), { recursive:true });
      writeFileSync(
        outputPath,
        serialized + '\n',
        'utf8',
      );
    }

    process.stdout.write(
      'FR104_U3_3_RESULT_SHA256 '
        + resultSha256
        + '\n',
    );
    process.stdout.write(
      'FR104_U3_3_PROSPECTIVE_RESULT '
        + serialized
        + '\n',
    );
  } catch (error) {
    process.stderr.write(
      (
        error instanceof Error
          ? error.stack ?? error.message
          : String(error)
      )
      + (
        serverCapture?.output
          ? '\n---SERVER---\n' + serverCapture.output
          : ''
      )
      + (
        driverCapture?.output
          ? '\n---DRIVER---\n' + driverCapture.output
          : ''
      )
      + '\n',
    );
    process.exitCode = 1;
  } finally {
    if (sessionId !== null) {
      try {
        await webdriver(
          '/session/' + sessionId,
          'DELETE',
        );
      } catch {
        // Cleanup must not replace the scientific result.
      }
    }
    await terminate(driver);
    await terminate(server);
  }
}

await main();
