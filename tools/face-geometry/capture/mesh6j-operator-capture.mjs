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
  sweepCount: document.querySelector('#sweep-count'),
  freshAttestation: document.querySelector('#fresh-attestation'),
  participantAttestation: document.querySelector('#participant-attestation'),
  startSession: document.querySelector('#start-session'),
  captureFrame: document.querySelector('#capture-frame'),
  finishSweep: document.querySelector('#finish-sweep'),
  currentSweep: document.querySelector('#current-sweep'),
  frameCount: document.querySelector('#frame-count'),
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

function updateControls() {
  const cameraOpen = camera !== null;
  const sessionActive = active !== null;
  elements.openCamera.disabled = cameraOpen || sessionActive;
  elements.closeCamera.disabled = !cameraOpen || sessionActive;
  elements.startSession.disabled = !cameraOpen || sessionActive || runtimeInputs === null;
  elements.captureFrame.disabled = !sessionActive;
  elements.finishSweep.disabled = !sessionActive;
  elements.downloadResult.disabled = lastResult === null;
}

function closeCamera() {
  if (camera === null) return;
  camera.close();
  camera = null;
  setStatus('카메라를 닫았습니다.');
  updateControls();
}

elements.openCamera.addEventListener('click', async () => {
  try {
    setStatus('카메라 권한을 요청하고 있습니다…');
    camera = await openMesh6HBrowserCamera({ video: elements.video });
    setStatus('카메라가 열렸습니다. manifest 확인 후 세션을 시작하세요.');
  } catch (error) {
    camera = null;
    setStatus('카메라 열기 실패: ' + (error instanceof Error ? error.message : String(error)));
  }
  updateControls();
});

elements.closeCamera.addEventListener('click', closeCamera);

elements.startSession.addEventListener('click', async () => {
  try {
    if (camera === null) throw new Error('camera is not open.');
    if (runtimeInputs === null) throw new Error('runtime inputs are not ready.');
    if (!elements.freshAttestation.checked) throw new Error('post-preregistration fresh-capture attestation is required.');
    if (!elements.participantAttestation.checked) throw new Error('same-participant-series attestation is required.');

    const prospectiveCollectionRef = nonEmptyInput(elements.collectionRef, 'Collection ref');
    const captureSeriesRef = nonEmptyInput(elements.seriesRef, 'Capture series ref');
    const captureConditionRef = nonEmptyInput(elements.conditionRef, 'Condition ref');
    const sweepPrefix = nonEmptyInput(elements.sweepPrefix, 'Sweep ref prefix');
    const sweepCount = Number(elements.sweepCount.value);
    if (!Number.isInteger(sweepCount) || sweepCount < 1) {
      throw new Error('Planned sweep count must be a positive integer.');
    }

    const queues = Array.from({ length: sweepCount }, () => new ManualTriggerQueue());
    const frameCounts = Array.from({ length: sweepCount }, () => 0);
    const lastTimestamps = Array.from({ length: sweepCount }, () => null);
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
    active = {
      queues,
      frameCounts,
      lastTimestamps,
      currentSweepIndex: 0,
      sessionOrdinal,
      promise: null,
    };
    lastResult = null;
    elements.result.textContent = '{}';
    elements.currentSweep.textContent = '1 / ' + sweepCount;
    elements.frameCount.textContent = '0';
    setStatus('Sweep 1을 수동으로 촬영하세요.');

    active.promise = runMesh6IManualBrowserCaptureController({
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
      setStatus('세션 완료. descriptive JSON을 검토하거나 저장할 수 있습니다.');
      active = null;
      elements.currentSweep.textContent = '-';
      elements.frameCount.textContent = '0';
      updateControls();
      return result;
    }).catch((error) => {
      const failedSession = active;
      if (failedSession !== null) {
        for (const queue of failedSession.queues) queue.close();
      }
      setStatus('세션 실패: ' + (error instanceof Error ? error.message : String(error)));
      active = null;
      elements.currentSweep.textContent = '-';
      elements.frameCount.textContent = '0';
      updateControls();
      return null;
    });

    updateControls();
  } catch (error) {
    setStatus('세션 시작 실패: ' + (error instanceof Error ? error.message : String(error)));
    updateControls();
  }
});

elements.captureFrame.addEventListener('click', async () => {
  if (active === null) return;
  const index = active.currentSweepIndex;
  const now = performance.timeOrigin + performance.now();
  const previous = active.lastTimestamps[index];
  if (previous !== null && !(now > previous)) {
    setStatus('현재 capture timestamp가 이전 값보다 크지 않아 이 클릭을 거부했습니다.');
    return;
  }

  elements.captureFrame.disabled = true;
  try {
    const nextFrameNumber = active.frameCounts[index] + 1;
    const providerRunRef =
      'mesh6j:session:' + active.sessionOrdinal +
      ':sweep:' + (index + 1) +
      ':frame:' + nextFrameNumber;
    await active.queues[index].push(Object.freeze({
      timestampMs: now,
      providerRunRef,
    }));
    active.lastTimestamps[index] = now;
    active.frameCounts[index] = nextFrameNumber;
    elements.frameCount.textContent = String(nextFrameNumber);
    setStatus('Sweep ' + (index + 1) + ' · frame ' + nextFrameNumber + ' trigger가 소비되었습니다.');
  } catch (error) {
    setStatus('프레임 trigger 실패: ' + (error instanceof Error ? error.message : String(error)));
  } finally {
    if (active !== null) elements.captureFrame.disabled = false;
  }
});

elements.finishSweep.addEventListener('click', () => {
  if (active === null) return;
  const index = active.currentSweepIndex;
  if (active.frameCounts[index] < 1) {
    setStatus('현재 sweep에는 아직 명시적으로 촬영한 프레임이 없습니다.');
    return;
  }

  active.queues[index].close();
  if (index + 1 < active.queues.length) {
    active.currentSweepIndex += 1;
    elements.currentSweep.textContent =
      (active.currentSweepIndex + 1) + ' / ' + active.queues.length;
    elements.frameCount.textContent = '0';
    setStatus('다음 sweep을 수동으로 촬영하세요.');
    return;
  }

  elements.captureFrame.disabled = true;
  elements.finishSweep.disabled = true;
  setStatus('마지막 sweep을 종료했습니다. descriptive dataset을 계산 중입니다…');
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
  setStatus('release-exact runtime 입력을 준비 중입니다…');
  runtimeInputs = await buildRuntimeInputs();
  setStatus('runtime 준비 완료. 카메라를 열어 수동 촬영을 시작할 수 있습니다.');
} catch (error) {
  setStatus('runtime 준비 실패: ' + (error instanceof Error ? error.message : String(error)));
}
updateControls();
