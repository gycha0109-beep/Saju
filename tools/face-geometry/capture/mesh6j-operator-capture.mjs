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
  video: document.querySelector('#camera'),
  openCamera: document.querySelector('#open-camera'),
  closeCamera: document.querySelector('#close-camera'),
  collectionRef: document.querySelector('#collection-ref'),
  seriesRef: document.querySelector('#series-ref'),
  conditionRef: document.querySelector('#condition-ref'),
  sweepPrefix: document.querySelector('#sweep-prefix'),
  captureCount: document.querySelector('#capture-count'),
  freshAttestation: document.querySelector('#fresh-attestation'),
  participantAttestation: document.querySelector('#participant-attestation'),
  captureAnalyze: document.querySelector('#capture-analyze'),
  captureProgress: document.querySelector('#capture-progress'),
  status: document.querySelector('#status'),
  result: document.querySelector('#result'),
  downloadResult: document.querySelector('#download-result'),
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

function setStatus(message) {
  elements.status.textContent = message;
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

function configuredCaptureCount() {
  const count = Number(elements.captureCount.value);
  return Number.isInteger(count) && count >= 1 ? count : null;
}

function updateCaptureLabel() {
  const configured = configuredCaptureCount() ?? 1;
  if (active === null) {
    elements.captureAnalyze.textContent = configured === 1
      ? '촬영 및 분석'
      : '촬영 시작 (1 / ' + configured + ')';
    elements.captureProgress.textContent = '0 / ' + configured;
    return;
  }

  const completed = active.currentCaptureIndex;
  elements.captureProgress.textContent = completed + ' / ' + active.captureCount;
  if (completed < active.captureCount) {
    elements.captureAnalyze.textContent =
      completed === 0
        ? '촬영 시작 (1 / ' + active.captureCount + ')'
        : '다음 촬영 (' + (completed + 1) + ' / ' + active.captureCount + ')';
  } else {
    elements.captureAnalyze.textContent = '분석 중…';
  }
}

function updateControls() {
  const cameraOpen = camera !== null;
  const sessionActive = active !== null;
  const attestationsReady =
    elements.freshAttestation.checked && elements.participantAttestation.checked;
  const countReady = configuredCaptureCount() !== null;

  elements.openCamera.disabled = cameraOpen || sessionActive;
  elements.closeCamera.disabled = !cameraOpen || sessionActive;
  elements.captureAnalyze.disabled =
    !cameraOpen || runtimeInputs === null || !attestationsReady || !countReady
    || (sessionActive && active.currentCaptureIndex >= active.captureCount);
  elements.downloadResult.disabled = lastResult === null;
  updateCaptureLabel();
}

function closeCamera() {
  if (camera === null) return;
  camera.close();
  camera = null;
  setStatus('카메라를 껐습니다.');
  updateControls();
}

function createCaptureSession() {
  if (camera === null) throw new Error('카메라가 열려 있지 않습니다.');
  if (runtimeInputs === null) throw new Error('분석 runtime이 아직 준비되지 않았습니다.');
  if (!elements.freshAttestation.checked) throw new Error('새 촬영 확인이 필요합니다.');
  if (!elements.participantAttestation.checked) throw new Error('동일인 반복 촬영 확인이 필요합니다.');

  const prospectiveCollectionRef = nonEmptyInput(elements.collectionRef, 'Collection ref');
  const captureSeriesRef = nonEmptyInput(elements.seriesRef, 'Capture series ref');
  const captureConditionRef = nonEmptyInput(elements.conditionRef, 'Condition ref');
  const sweepPrefix = nonEmptyInput(elements.sweepPrefix, 'Capture ref prefix');
  const captureCount = configuredCaptureCount();
  if (captureCount === null) throw new Error('촬영 횟수는 1 이상의 정수여야 합니다.');

  const queues = Array.from({ length: captureCount }, () => new ManualTriggerQueue());
  const lastTimestamps = Array.from({ length: captureCount }, () => null);
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
    currentCaptureIndex: 0,
    captureCount,
    sessionOrdinal,
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
    lastResult = result;
    elements.result.textContent = JSON.stringify(result, null, 2);
    setStatus('분석 완료. 결과를 확인하거나 JSON으로 저장할 수 있습니다.');
    if (active === session) active = null;
    updateControls();
    return result;
  }).catch((error) => {
    for (const queue of session.queues) queue.close();
    setStatus('분석 실패: ' + (error instanceof Error ? error.message : String(error)));
    if (active === session) active = null;
    updateControls();
    return null;
  });

  updateControls();
  return session;
}

elements.openCamera.addEventListener('click', async () => {
  try {
    setStatus('카메라 권한을 요청하고 있습니다…');
    camera = await openMesh6HBrowserCamera({ video: elements.video });
    setStatus('카메라 준비 완료. 얼굴을 맞춘 뒤 촬영 및 분석을 누르세요.');
  } catch (error) {
    camera = null;
    setStatus('카메라 열기 실패: ' + (error instanceof Error ? error.message : String(error)));
  }
  updateControls();
});

elements.closeCamera.addEventListener('click', closeCamera);

for (const element of [
  elements.freshAttestation,
  elements.participantAttestation,
  elements.captureCount,
]) {
  element.addEventListener('change', updateControls);
  element.addEventListener('input', updateControls);
}

elements.captureAnalyze.addEventListener('click', async () => {
  let session = active;
  try {
    if (session === null) session = createCaptureSession();
    if (active !== session) return;

    const index = session.currentCaptureIndex;
    if (index >= session.captureCount) return;

    const now = performance.timeOrigin + performance.now();
    const previous = session.lastTimestamps[index];
    if (previous !== null && !(now > previous)) {
      throw new Error('현재 capture timestamp가 이전 값보다 크지 않습니다.');
    }

    elements.captureAnalyze.disabled = true;
    setStatus(
      session.captureCount === 1
        ? '촬영 중…'
        : '촬영 중… (' + (index + 1) + ' / ' + session.captureCount + ')',
    );

    const providerRunRef =
      'mesh6j:session:' + session.sessionOrdinal
      + ':sweep:' + (index + 1)
      + ':frame:1';

    await session.queues[index].push(Object.freeze({
      timestampMs: now,
      providerRunRef,
    }));

    session.lastTimestamps[index] = now;

    // The explicit operator click above is the sole cause of this one-frame
    // sweep completing. No timer, frame callback, selection, or score closes it.
    session.queues[index].close();
    session.currentCaptureIndex += 1;

    if (session.currentCaptureIndex < session.captureCount) {
      setStatus(
        (index + 1) + ' / ' + session.captureCount
        + ' 촬영 완료. 얼굴 위치를 다시 맞춘 뒤 다음 촬영을 누르세요.',
      );
      updateControls();
      return;
    }

    setStatus('마지막 촬영 완료. 촬영한 프레임으로 분석 중입니다…');
    updateControls();
    await session.promise;
  } catch (error) {
    if (session !== null) {
      for (const queue of session.queues) queue.close();
      if (active === session) active = null;
    }
    setStatus('촬영 실패: ' + (error instanceof Error ? error.message : String(error)));
    updateControls();
  }
});

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

window.addEventListener('beforeunload', () => {
  if (active !== null) {
    for (const queue of active.queues) queue.close();
  }
  camera?.close();
});

updateControls();
try {
  setStatus('분석 runtime을 준비 중입니다…');
  runtimeInputs = await buildRuntimeInputs();
  setStatus('준비 완료. 카메라를 켜고 촬영하세요.');
} catch (error) {
  setStatus('runtime 준비 실패: ' + (error instanceof Error ? error.message : String(error)));
}
updateControls();
