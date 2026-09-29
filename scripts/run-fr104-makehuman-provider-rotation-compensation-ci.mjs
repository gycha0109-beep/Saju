import { spawn } from 'node:child_process';
import { createHash } from 'node:crypto';
import process from 'node:process';
import {
  NEUTRAL_EAR_MAKEHUMAN_PROVIDER_ROTATION_COMPENSATION_FR104,
} from '../.face-reading-dist/neutral-ear-makehuman-provider-rotation-compensation-fr104.js';

const SERVER_PORT = 4320;
const DRIVER_PORT = 9518;
const SERVER_ROOT = 'http://127.0.0.1:' + SERVER_PORT;
const DRIVER_ROOT = 'http://127.0.0.1:' + DRIVER_PORT;
const PAGE_URL =
  SERVER_ROOT
  + '/fr104-makehuman-provider-rotation-compensation/?autorun=1';
const RESULT_SCHEMA =
  'fr104-provider-rotation-compensation-result-v1';
const EXPECTED_RESULT_SHA256 =
  '9b278cf355ec497f5978ce3ae22f5cf94a84bc0ce94908990157e04322a14a0c';
const ERROR_SCHEMA =
  'fr104-provider-rotation-compensation-error-v1';
const POLL_TIMEOUT_MS = 180_000;

const protocol =
  NEUTRAL_EAR_MAKEHUMAN_PROVIDER_ROTATION_COMPENSATION_FR104;

function fail(message) {
  throw new Error('FR104 U3.2 CI: ' + message);
}
function sleep(ms) {
  return new Promise((resolve) => {
    globalThis.setTimeout(resolve, ms);
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
  return Object.freeze({ get output() { return output; } });
}
async function waitForHttp(url, label) {
  const deadline = Date.now() + POLL_TIMEOUT_MS;
  let lastError = null;
  while (Date.now() < deadline) {
    try {
      const response = await globalThis.fetch(url, { cache:'no-store' });
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
async function webdriver(path, method='GET', body=undefined) {
  const response = await globalThis.fetch(DRIVER_ROOT + path, {
    method,
    headers: body === undefined
      ? undefined
      : {'content-type':'application/json; charset=utf-8'},
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const payload = await response.json();
  if (!response.ok) {
    fail('ChromeDriver HTTP ' + response.status + ': ' + JSON.stringify(payload));
  }
  if (payload?.value?.error) {
    fail('ChromeDriver ' + payload.value.error + ': ' + (payload.value.message ?? ''));
  }
  return payload.value;
}
function object(value,label) {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    fail(label + ' must be an object.');
  }
  return value;
}
function exact(actual,expected,label) {
  if (!Object.is(actual,expected)) {
    fail(label + ' expected=' + expected + ' observed=' + actual);
  }
}
function validateResult(result) {
  exact(result.schemaVersion, RESULT_SCHEMA, 'schemaVersion');
  exact(
    result.authorityState,
    'bounded_provider_rotation_compensation_candidate_no_anatomical_mapping',
    'authorityState',
  );
  const fixture = object(result.fixture,'fixture');
  exact(fixture.pngSha256,protocol.fixture.pngSha256,'fixture.pngSha256');
  exact(
    fixture.canonicalRgbaSha256,
    protocol.fixture.canonicalRgbaSha256,
    'fixture.canonicalRgbaSha256',
  );
  const runtime = object(result.runtime,'runtime');
  exact(runtime.packageName,protocol.runtime.packageName,'runtime.packageName');
  exact(runtime.packageVersion,protocol.runtime.packageVersion,'runtime.packageVersion');
  exact(
    runtime.imageProcessingOptionsRotationDegreesUsed,
    true,
    'runtime.imageProcessingOptionsRotationDegreesUsed',
  );
  const probes = object(result.apiBehavioralProbes,'apiBehavioralProbes');
  exact(
    probes.zeroDegreesVsUndefined.R0.exactProviderResultEqual,
    true,
    'zero.R0',
  );
  exact(
    probes.zeroDegreesVsUndefined.M0.exactProviderResultEqual,
    true,
    'zero.M0',
  );
  const signed = object(
    probes.signedEquivalent,
    'signedEquivalent',
  );
  exact(
    signed.canonicalRepresentation,
    'positive_0_90_180_270_only',
    'signedEquivalent.canonicalRepresentation',
  );
  if (
    typeof signed.signedDegreesThrows !== 'boolean'
    || typeof signed.exactProviderResultEqual !== 'boolean'
  ) {
    fail('signedEquivalent behavioral state malformed.');
  }
  exact(probes.invalidRotation.throws,true,'invalidRotation.throws');
  exact(probes.invalidRotation.resultProduced,false,'invalidRotation.resultProduced');

  if (!Array.isArray(result.cases) || result.cases.length !== 8) {
    fail('cases must contain exactly eight entries.');
  }
  for (const [index, expected] of protocol.cases.entries()) {
    const item = object(result.cases[index],'cases['+index+']');
    exact(item.id,expected.id,expected.id+'.id');
    exact(item.family,expected.family,expected.id+'.family');
    exact(
      item.physicalClockwiseRotationDegrees,
      expected.physicalClockwiseRotationDegrees,
      expected.id+'.physicalClockwiseRotationDegrees',
    );
    exact(
      item.compensationDegrees,
      expected.compensationDegrees,
      expected.id+'.compensationDegrees',
    );
    exact(
      item.nativeRgbaSha256,
      expected.nativeRgbaSha256,
      expected.id+'.nativeRgbaSha256',
    );
  }
  const boundary = object(result.interpretationBoundary,'interpretationBoundary');
  exact(boundary.anatomicalGroundTruthUsed,false,'boundary.anatomicalGroundTruthUsed');
  exact(boundary.anatomicalSideSemanticsUsed,false,'boundary.anatomicalSideSemanticsUsed');
  exact(boundary.detectorStageFailureMayBeClaimed,false,'boundary.detectorStageFailureMayBeClaimed');

  const privacy = object(result.privacy,'privacy');
  for (const key of [
    'userImageConsumed','cameraAccessed','rawProviderLandmarksReturned',
    'rawProviderLandmarksPersisted','transformedRasterPersisted',
    'biometricEmbeddingProduced','identityTemplateProduced',
  ]) {
    exact(privacy[key],false,'privacy.'+key);
  }
  const authority = object(result.authority,'authority');
  for (const key of [
    'providerRotationCompensationSemanticsAudited',
    'providerRotationCompensationEffectiveForExactFixture',
    'canonicalProviderOrientationNormalizationAvailable',
    'providerLabelMappedToAnatomicalSide',
    'globalProviderAnatomicalSemanticsEstablished',
    'anatomicalReferenceAdmitted',
    'anatomicalLateralityAuthorized',
    'validatedExternalEarObservationAuthorized',
    'traditionalBindingAuthorized',
    'productionAuthorization',
  ]) {
    exact(authority[key],false,'authority.'+key);
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
    const text = typeof value?.result === 'string' ? value.result.trim() : '';
    if (text && text !== '{}') {
      const result = JSON.parse(text);
      if (result.schemaVersion === ERROR_SCHEMA) {
        fail('browser compensation failed closed: ' + result.error);
      }
      validateResult(result);
      return result;
    }
    await sleep(750);
  }
  fail('browser compensation result timed out.');
}
async function terminate(child) {
  if (child === null || child.exitCode !== null) return;
  child.kill('SIGTERM');
  await Promise.race([
    new Promise((resolve) => child.once('exit',resolve)),
    sleep(2000),
  ]);
  if (child.exitCode === null) child.kill('SIGKILL');
}
async function main() {
  let server=null;
  let driver=null;
  let sessionId=null;
  let serverCapture=null;
  let driverCapture=null;
  try {
    server=spawn(
      process.execPath,
      ['scripts/mesh6j-manual-browser-capture-preview.mjs'],
      {
        env:{...process.env,MESH6J_PORT:String(SERVER_PORT)},
        stdio:['ignore','pipe','pipe'],
      },
    );
    serverCapture=capture(server);
    await waitForHttp(
      SERVER_ROOT + '/fr104-makehuman-provider-rotation-compensation/',
      'MESH6J server',
    );
    driver=spawn(
      process.env.CHROMEDRIVER?.trim() || 'chromedriver',
      ['--port='+DRIVER_PORT],
      {stdio:['ignore','pipe','pipe']},
    );
    driverCapture=capture(driver);
    await waitForHttp(DRIVER_ROOT + '/status','ChromeDriver');
    const session=await webdriver('/session','POST',{
      capabilities:{alwaysMatch:{
        browserName:'chrome',
        'goog:chromeOptions':{args:[
          '--headless=new','--no-sandbox','--disable-dev-shm-usage',
          '--window-size=1280,1024',
        ]},
      }},
    });
    sessionId=session?.sessionId;
    if (typeof sessionId !== 'string' || !sessionId) {
      fail('ChromeDriver did not return session id.');
    }
    await webdriver(
      '/session/'+sessionId+'/url',
      'POST',
      {url:PAGE_URL},
    );
    const result=await waitForResult(sessionId);
    const serialized = JSON.stringify(result);
    const resultSha256 = createHash('sha256')
      .update(serialized)
      .digest('hex');
    if (resultSha256 !== EXPECTED_RESULT_SHA256) {
      fail(
        'U3_2_RESULT_REPLAY_DRIFT expected='
          + EXPECTED_RESULT_SHA256
          + ' observed='
          + resultSha256,
      );
    }
    process.stdout.write(
      'FR104_U3_2_RESULT_SHA256 '
      + resultSha256
      + '\n',
    );
    process.stdout.write(
      'FR104_U3_2_EMPIRICAL_RESULT '
      + serialized
      + '\n',
    );
  } catch (error) {
    process.stderr.write(
      (error instanceof Error ? error.stack ?? error.message : String(error))
      + (serverCapture?.output ? '\n---SERVER---\n'+serverCapture.output : '')
      + (driverCapture?.output ? '\n---DRIVER---\n'+driverCapture.output : '')
      + '\n',
    );
    process.exitCode=1;
  } finally {
    if (sessionId !== null) {
      try { await webdriver('/session/'+sessionId,'DELETE'); } catch {}
    }
    await terminate(driver);
    await terminate(server);
  }
}
await main();
