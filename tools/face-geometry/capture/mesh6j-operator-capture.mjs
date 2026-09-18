/* global Blob, TextEncoder, URL, crypto, document, fetch, performance, window */

import { runPhotoToLipsContourNeutralSurfaceFR66 } from '/face/lips-contour-neutral-surface-fr66.js';
import { assessLipsPoseNormalizationRequirementsFR67 } from '/face/lips-pose-normalization-requirements-fr67.js';
import { admitMediaPipeFaceGeometryTransformSemanticsFR68 } from '/face/mediapipe-face-geometry-transform-semantics-fr68.js';
import { admitMediaPipeWebMetricGeometryGapFR69 } from '/face/mediapipe-web-metric-geometry-gap-fr69.js';
import { admitMediaPipeReleaseExactMetricGeometryFR75 } from '/face/mediapipe-release-exact-metric-geometry-admission-fr75.js';
import { admitMediaPipeScreenToMetricReimplementationParityFR76 } from '/face/mediapipe-screen-to-metric-reimplementation-parity-fr76.js';
import { openMesh6HBrowserCamera } from '/face/mesh6h-browser-camera-frame-source.js';
import { runMesh6IManualBrowserCaptureController } from '/face/mesh6i-manual-browser-capture-controller.js';

const RELEASE_COMMIT = 'f8ef212d5c962c0e853db7e59d217056b187084b';
const RAW_ROOT = 'https://raw.githubusercontent.com/google-ai-edge/mediapipe/' + RELEASE_COMMIT;
const PARITY_INPUT = Object.freeze({
  path: 'mediapipe/tasks/testdata/vision/face_blendshapes_in_landmarks.prototxt',
  blobSha: 'ea2e60eefaf6a5c13aee4bb468384edab7e7d5d7',
});

const elements = Object.freeze({
  prepView: document.querySelector('#prep-view'),
  captureView: document.querySelector('#capture-view'),
  resultView: document.querySelector('#result-view'),
  freshAttestation: document.querySelector('#fresh-attestation'),
  participantAttestation: document.querySelector('#participant-attestation'),
  sweepCount: document.querySelector('#sweep-count'),
  framesPerSweep: document.querySelector('#frames-per-sweep'),
  collectionRef: document.querySelector('#collection-ref'),
  seriesRef: document.querySelector('#series-ref'),
  conditionRef: document.querySelector('#condition-ref'),
  sweepPrefix: document.querySelector('#sweep-prefix'),
  prepStatus: document.querySelector('#prep-status'),
  startCapture: document.querySelector('#start-capture'),
  video: document.querySelector('#camera'),
  cancelCapture: document.querySelector('#cancel-capture'),
  sweepProgress: document.querySelector('#sweep-progress'),
  frameProgress: document.querySelector('#frame-progress'),
  captureStatus: document.querySelector('#capture-status'),
  shutter: document.querySelector('#shutter'),
  resultStatus: document.querySelector('#result-status'),
  result: document.querySelector('#result'),
  downloadResult: document.querySelector('#download-result'),
  retryCapture: document.querySelector('#retry-capture'),
});

for (const [name, value] of Object.entries(elements)) {
  if (value === null) throw new Error('MESH6J missing required DOM element: ' + name);
}

class ManualTriggerQueue {
  #items = [];
  #waiters = [];
  #closed = false;

  [Symbol.asyncIterator]() {
    return this;
  }

  next() {
    const item = this.#items.shift();
    if (item !== undefined) {
      item.consumed();
      return Promise.resolve({ value: item.value, done: false });
    }
    if (this.#closed) return Promise.resolve({ value: undefined, done: true });
    return new Promise((resolve) => {
      this.#waiters.push(resolve);
    });
  }

  push(value) {
    if (this.#closed) return Promise.reject(new Error('MESH6J sweep trigger stream is already closed.'));
    let markConsumed;
    const consumed = new Promise((resolve) => {
      markConsumed = resolve;
    });
    const waiter = this.#waiters.shift();
    if (waiter !== undefined) {
      waiter({ value, done: false });
      markConsumed();
    } else {
      this.#items.push({ value, consumed: markConsumed });
    }
    return consumed;
  }

  close() {
    if (this.#closed) return;
    this.#closed = true;
    for (const waiter of this.#waiters.splice(0)) {
      waiter({ value: undefined, done: true });
    }
  }
}

let camera = null;
let runtimeInputs = null;
let active = null;
let lastResult = null;
let sessionOrdinal = 0;

function setPrepStatus(message) {
  elements.prepStatus.textContent = message;
}

function setCaptureStatus(message) {
  elements.captureStatus.textContent = message;
}

function setResultStatus(message) {
  elements.resultStatus.textContent = message;
}

function showView(name) {
  elements.prepView.hidden = name !== 'prep';
  elements.captureView.hidden = name !== 'capture';
  elements.resultView.hidden = name !== 'result';
}

function nonEmptyInput(element, label) {
  const value = element.value.trim();
  if (value.length === 0) throw new Error(label + ' must be non-empty.');
  return value;
}

function hex(buffer) {
  return Array.from(new Uint8Array(buffer), (value) => value.toString(16).padStart(2, '0')).join('');
}

async function gitBlobSha(text) {
  const encoder = new TextEncoder();
  const body = encoder.encode(text);
  const prefix = encoder.encode('blob ' + body.byteLength + '\0');
  const payload = new Uint8Array(prefix.byteLength + body.byteLength);
  payload.set(prefix, 0);
  payload.set(body, prefix.byteLength);
  return hex(await crypto.subtle.digest('SHA-1', payload));
}

async function fetchExactText(path, expectedBlobSha) {
  const response = await fetch(RAW_ROOT + '/' + path, { cache: 'no-store' });
  if (!response.ok) throw new Error('release witness fetch failed: ' + path + ' HTTP ' + response.status);
  const text = await response.text();
  const actual = await gitBlobSha(text);
  if (actual !== expectedBlobSha) {
    throw new Error('release witness Git blob SHA mismatch for ' + path + '.');
  }
  return text;
}

function parseProviderLandmarks(text) {
  const landmarks = [];
  for (const match of text.matchAll(/landmark\s*\{([\s\S]*?)\}/g)) {
    const block = match[1];
    const x = Number(/\bx:\s*([-+0-9.eE]+)/.exec(block)?.[1]);
    const y = Number(/\by:\s*([-+0-9.eE]+)/.exec(block)?.[1]);
    const z = Number(/\bz:\s*([-+0-9.eE]+)/.exec(block)?.[1]);
    if (![x, y, z].every(Number.isFinite)) throw new Error('release witness contains non-finite XYZ.');
    landmarks.push(Object.freeze({ x, y, z }));
  }
  if (landmarks.length !== 478) {
    throw new Error('expected 478 release-witness landmarks; got ' + landmarks.length + '.');
  }
  return Object.freeze(landmarks);
}

function parityFactory(providerLandmarks) {
  return Object.freeze({
    async create() {
      return Object.freeze({
        detect() {
          return Object.freeze({
            faceLandmarks: [providerLandmarks],
            faceBlendshapes: [],
            facialTransformationMatrixes: [],
          });
        },
        close() {},
      });
    },
  });
}

async function buildRuntimeInputs() {
  const [configResponse, metadataResponse, adapterResponse, inputFixture] = await Promise.all([
    fetch('/runtime/config.json', { cache: 'no-store' }),
    fetch('/runtime/geometry-metadata.pbtxt', { cache: 'no-store' }),
    fetch('/runtime/weighted-adapter.json', { cache: 'no-store' }),
    fetchExactText(PARITY_INPUT.path, PARITY_INPUT.blobSha),
  ]);
  if (!configResponse.ok || !metadataResponse.ok || !adapterResponse.ok) {
    throw new Error('MESH6J localhost runtime assets are unavailable.');
  }

  const config = await configResponse.json();
  const geometryMetadataPbtxt = await metadataResponse.text();
  const weightedRegionAdapter = await adapterResponse.json();

  if (
    config.schemaVersion !== 'mesh6j-localhost-runtime-config-v1'
    || config.releaseCommit !== RELEASE_COMMIT
    || config.rawCapturePersistenceEnabled !== false
    || config.calibrationAuthorized !== false
    || config.productionMorphologyAuthorized !== false
  ) {
    throw new Error('MESH6J localhost runtime config authority boundary drift.');
  }

  const providerLandmarks = parseProviderLandmarks(inputFixture);
  const fr66 = await runPhotoToLipsContourNeutralSurfaceFR66({
    schemaVersion: 'fr61-production-neutral-observation-provider-request-v1',
    providerRunRef: 'mesh6j:parity-bootstrap',
    canonicalAssetDigest: config.canonicalAssetDigest,
    image: Object.freeze({ releaseWitnessOnly: true }),
  }, parityFactory(providerLandmarks));
  const fr67 = assessLipsPoseNormalizationRequirementsFR67(fr66);
  const fr68 = admitMediaPipeFaceGeometryTransformSemanticsFR68(fr67);
  const fr69 = admitMediaPipeWebMetricGeometryGapFR69(fr68);
  const fr75 = admitMediaPipeReleaseExactMetricGeometryFR75(fr69);
  const parity = admitMediaPipeScreenToMetricReimplementationParityFR76(fr75);

  return Object.freeze({
    canonicalAssetDigest: config.canonicalAssetDigest,
    geometryMetadataPbtxt,
    weightedRegionAdapter,
    parity,
  });
}

function configuredSweepCount() {
  const count = Number(elements.sweepCount.value);
  return Number.isInteger(count) && count >= 1 && count <= 12 ? count : null;
}

function configuredFramesPerSweep() {
  const count = Number(elements.framesPerSweep.value);
  return Number.isInteger(count) && count >= 2 && count <= 30 ? count : null;
}

function updatePrepControls() {
  const ready =
    runtimeInputs !== null
    && elements.freshAttestation.checked
    && elements.participantAttestation.checked
    && configuredSweepCount() !== null
    && configuredFramesPerSweep() !== null
    && active === null;
  elements.startCapture.disabled = !ready;
  elements.downloadResult.disabled = lastResult === null;
}

function updateCaptureProgress() {
  if (active === null) return;
  const sweepNumber = Math.min(active.currentSweepIndex + 1, active.sweepCount);
  const frameNumber = active.frameCounts[active.currentSweepIndex] ?? active.framesPerSweep;
  elements.sweepProgress.textContent = '측정 ' + sweepNumber + ' / ' + active.sweepCount;
  elements.frameProgress.textContent = '촬영 ' + frameNumber + ' / ' + active.framesPerSweep;
}

function closeCamera() {
  if (camera === null) return;
  camera.close();
  camera = null;
}

function createCaptureSession() {
  if (camera === null) throw new Error('카메라가 열려 있지 않습니다.');
  if (runtimeInputs === null) throw new Error('분석 runtime이 아직 준비되지 않았습니다.');
  if (!elements.freshAttestation.checked) throw new Error('새 촬영 확인이 필요합니다.');
  if (!elements.participantAttestation.checked) throw new Error('동일인 반복 촬영 확인이 필요합니다.');

  const prospectiveCollectionRef = nonEmptyInput(elements.collectionRef, 'Collection ref');
  const captureSeriesRef = nonEmptyInput(elements.seriesRef, 'Capture series ref');
  const captureConditionRef = nonEmptyInput(elements.conditionRef, 'Condition ref');
  const sweepPrefix = nonEmptyInput(elements.sweepPrefix, 'Sweep ref prefix');
  const sweepCount = configuredSweepCount();
  const framesPerSweep = configuredFramesPerSweep();
  if (sweepCount === null) throw new Error('측정 횟수는 1~12 정수여야 합니다.');
  if (framesPerSweep === null) throw new Error('측정당 촬영 수는 2~30 정수여야 합니다.');

  const queues = Array.from({ length: sweepCount }, () => new ManualTriggerQueue());
  const lastTimestamps = Array.from({ length: sweepCount }, () => null);
  const frameCounts = Array.from({ length: sweepCount }, () => 0);
  const manifests = queues.map((queue, index) => Object.freeze({
    manifest: Object.freeze({
      prospectiveCollectionRef,
      captureSeriesRef,
      sweepRef: sweepPrefix + ':' + String(index + 1).padStart(2, '0'),
      captureConditionRef,
      sweepSequenceIndex: index + 1,
      postPreregistrationFreshCaptureAttested: true,
      sameParticipantSeriesAttested: true,
      usedForCandidateSelection: false,
      developmentCaptureReuse: false,
      identityMatchingPerformed: false,
    }),
    triggers: queue,
  }));

  sessionOrdinal += 1;
  const session = {
    queues,
    lastTimestamps,
    frameCounts,
    currentSweepIndex: 0,
    sweepCount,
    framesPerSweep,
    sessionOrdinal,
    cancelled: false,
    promise: null,
  };

  lastResult = null;
  elements.result.textContent = '{}';
  active = session;

  session.promise = runMesh6IManualBrowserCaptureController({
    camera,
    canonicalAssetDigest: runtimeInputs.canonicalAssetDigest,
    geometryMetadataPbtxt: runtimeInputs.geometryMetadataPbtxt,
    parity: runtimeInputs.parity,
    weightedRegionAdapter: runtimeInputs.weightedRegionAdapter,
    sweeps: manifests,
    cameraOwnership: 'caller_retains_camera',
  }).then((result) => {
    if (session.cancelled) return null;
    lastResult = result;
    elements.result.textContent = JSON.stringify(result, null, 2);
    setResultStatus(
      session.sweepCount + '회 측정 × ' + session.framesPerSweep
      + '회 촬영 분석 완료',
    );
    closeCamera();
    if (active === session) active = null;
    elements.downloadResult.disabled = false;
    showView('result');
    updatePrepControls();
    return result;
  }).catch((error) => {
    for (const queue of session.queues) queue.close();
    if (active === session) active = null;
    closeCamera();
    if (session.cancelled) {
      showView('prep');
      setPrepStatus('촬영을 취소했습니다.');
    } else {
      showView('prep');
      setPrepStatus('분석 실패: ' + (error instanceof Error ? error.message : String(error)));
    }
    updatePrepControls();
    return null;
  });

  updateCaptureProgress();
  return session;
}

async function startCaptureFlow() {
  try {
    elements.startCapture.disabled = true;
    setPrepStatus('카메라 권한을 요청하고 있습니다…');
    camera = await openMesh6HBrowserCamera({ video: elements.video });
    const session = createCaptureSession();
    showView('capture');
    setCaptureStatus('얼굴을 프레임 안에 맞춘 뒤 셔터를 누르세요.');
    elements.shutter.disabled = false;
    updateCaptureProgress();
    return session;
  } catch (error) {
    closeCamera();
    active = null;
    setPrepStatus('촬영 시작 실패: ' + (error instanceof Error ? error.message : String(error)));
    showView('prep');
    updatePrepControls();
    return null;
  }
}

async function captureOneExplicitFrame() {
  const session = active;
  if (session === null) return;
  const sweepIndex = session.currentSweepIndex;
  if (sweepIndex >= session.sweepCount) return;

  const frameIndex = session.frameCounts[sweepIndex];
  if (frameIndex >= session.framesPerSweep) return;

  const now = performance.timeOrigin + performance.now();
  const previous = session.lastTimestamps[sweepIndex];
  if (previous !== null && !(now > previous)) {
    throw new Error('현재 capture timestamp가 이전 값보다 크지 않습니다.');
  }

  elements.shutter.disabled = true;
  setCaptureStatus(
    '측정 ' + (sweepIndex + 1) + ' / ' + session.sweepCount
    + ' · 촬영 ' + (frameIndex + 1) + ' / ' + session.framesPerSweep,
  );

  const providerRunRef =
    'mesh6j:session:' + session.sessionOrdinal
    + ':sweep:' + (sweepIndex + 1)
    + ':frame:' + (frameIndex + 1);

  await session.queues[sweepIndex].push(Object.freeze({
    timestampMs: now,
    providerRunRef,
  }));

  session.lastTimestamps[sweepIndex] = now;
  session.frameCounts[sweepIndex] += 1;
  updateCaptureProgress();

  const sweepComplete = session.frameCounts[sweepIndex] === session.framesPerSweep;
  if (sweepComplete) {
    session.queues[sweepIndex].close();
    session.currentSweepIndex += 1;
  }

  const sessionComplete = session.currentSweepIndex === session.sweepCount;
  if (sessionComplete) {
    elements.shutter.disabled = true;
    elements.sweepProgress.textContent = '촬영 완료';
    elements.frameProgress.textContent =
      (session.sweepCount * session.framesPerSweep) + '개 프레임';
    setCaptureStatus('마지막 촬영 완료. 촬영한 프레임으로 분석 중입니다…');
    await session.promise;
    return;
  }

  if (sweepComplete) {
    setCaptureStatus(
      '측정 ' + (sweepIndex + 1) + ' 완료. 다음 측정을 위해 얼굴 위치를 다시 맞추고 셔터를 누르세요.',
    );
  } else {
    setCaptureStatus('좋습니다. 같은 측정을 이어서 다음 셔터를 눌러주세요.');
  }
  updateCaptureProgress();
  elements.shutter.disabled = false;
}

function cancelActiveCapture() {
  const session = active;
  if (session !== null) {
    session.cancelled = true;
    for (const queue of session.queues) queue.close();
    active = null;
  }
  elements.shutter.disabled = true;
  closeCamera();
  showView('prep');
  setPrepStatus('촬영을 취소했습니다.');
  updatePrepControls();
}

elements.startCapture.addEventListener('click', async () => {
  await startCaptureFlow();
});

elements.cancelCapture.addEventListener('click', () => {
  cancelActiveCapture();
});

elements.shutter.addEventListener('click', async () => {
  try {
    await captureOneExplicitFrame();
  } catch (error) {
    const session = active;
    if (session !== null) {
      for (const queue of session.queues) queue.close();
      active = null;
    }
    closeCamera();
    showView('prep');
    setPrepStatus('촬영 실패: ' + (error instanceof Error ? error.message : String(error)));
    updatePrepControls();
  }
});

for (const element of [
  elements.freshAttestation,
  elements.participantAttestation,
  elements.sweepCount,
  elements.framesPerSweep,
]) {
  element.addEventListener('change', updatePrepControls);
  element.addEventListener('input', updatePrepControls);
}

elements.downloadResult.addEventListener('click', () => {
  if (lastResult === null) return;
  const payload = JSON.stringify(lastResult, null, 2) + '\n';
  const blob = new Blob([payload], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'mesh6j-descriptive-capture-' + new Date().toISOString().replaceAll(':', '-') + '.json';
  anchor.click();
  URL.revokeObjectURL(url);
});

elements.retryCapture.addEventListener('click', () => {
  lastResult = null;
  elements.result.textContent = '{}';
  elements.downloadResult.disabled = true;
  showView('prep');
  setPrepStatus('다시 촬영할 준비가 됐습니다.');
  updatePrepControls();
});

window.addEventListener('beforeunload', () => {
  if (active !== null) {
    for (const queue of active.queues) queue.close();
  }
  camera?.close();
});

showView('prep');
updatePrepControls();
try {
  setPrepStatus('분석 runtime을 준비 중입니다…');
  runtimeInputs = await buildRuntimeInputs();
  setPrepStatus('준비 완료. 조건을 확인하고 촬영 시작을 누르세요.');
} catch (error) {
  setPrepStatus('runtime 준비 실패: ' + (error instanceof Error ? error.message : String(error)));
}
updatePrepControls();
