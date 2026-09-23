/* global AbortController, Blob, URL, crypto, document, fetch, performance, window */

import { runPhotoToLipsContourNeutralSurfaceFR66 } from '/face/lips-contour-neutral-surface-fr66.js';
import { assessLipsPoseNormalizationRequirementsFR67 } from '/face/lips-pose-normalization-requirements-fr67.js';
import { admitMediaPipeFaceGeometryTransformSemanticsFR68 } from '/face/mediapipe-face-geometry-transform-semantics-fr68.js';
import { admitMediaPipeWebMetricGeometryGapFR69 } from '/face/mediapipe-web-metric-geometry-gap-fr69.js';
import { admitMediaPipeReleaseExactMetricGeometryFR75 } from '/face/mediapipe-release-exact-metric-geometry-admission-fr75.js';
import { admitMediaPipeScreenToMetricReimplementationParityFR76 } from '/face/mediapipe-screen-to-metric-reimplementation-parity-fr76.js';
import { openMesh6HBrowserCamera } from '/face/mesh6h-browser-camera-frame-source.js';
import { preregisterObservableMorphologyRepeatabilityStudyFR237 } from '/face/observable-morphology-repeatability-study-preregistration-fr237.js';
import { materializeResearchLiveCaptureRuntimeFR238 } from '/face/observable-morphology-research-live-capture-session-runtime-fr238.js';
import { issuePrecollectionRetentionPrivacyPolicyFR239 } from '/face/observable-morphology-repeatability-retention-privacy-policy-fr239.js';
import {
  issueOnePersonDryRunAdmissionFR240,
  issueParticipantConsentProtocolFR240,
  recordParticipantConsentFR240,
} from '/face/observable-morphology-participant-consent-dry-run-admission-fr240.js';
import { materializeOnePersonDryRunRuntimeFR241 } from '/face/observable-morphology-one-person-dry-run-runtime-fr241.js';
import { materializeEphemeralLiveCameraFrameIntakeRuntimeFR242 } from '/face/observable-morphology-ephemeral-live-camera-frame-intake-fr242.js';
import { materializeGovernedDryRunExecutionRuntimeFR243 } from '/face/observable-morphology-governed-dry-run-execution-recorder-fr243.js';
import { materializeChallengeFirstBrowserDryRunCoordinatorFR250 } from '/face/observable-morphology-challenge-first-browser-dry-run-fr250.js';

const RELEASE_COMMIT = 'f8ef212d5c962c0e853db7e59d217056b187084b';
const PARITY_INPUT = Object.freeze({
  route: '/runtime/fr76-parity-input.prototxt',
  blobSha: 'ea2e60eefaf6a5c13aee4bb468384edab7e7d5d7',
});
const RUNTIME_ASSET_TIMEOUT_MS = 15000;

const elements = Object.freeze({
  prepView: document.querySelector('#prep-view'),
  captureView: document.querySelector('#capture-view'),
  attestationStage: document.querySelector('#attestation-stage'),
  shutterStage: document.querySelector('#shutter-stage'),
  attestationCameraHost: document.querySelector('#attestation-camera-host'),
  shutterCameraHost: document.querySelector('#shutter-camera-host'),
  resultView: document.querySelector('#result-view'),
  abortView: document.querySelector('#abort-view'),
  consentChecks: [...document.querySelectorAll('[data-consent]')],
  start: document.querySelector('#start-dry-run'),
  prepStatus: document.querySelector('#prep-status'),
  video: document.querySelector('#camera'),
  slotLabel: document.querySelector('#slot-label'),
  captureStatus: document.querySelector('#capture-status'),
  challengeRef: document.querySelector('#challenge-ref'),
  challengeNonce: document.querySelector('#challenge-nonce'),
  challengePresented: document.querySelector('#challenge-presented'),
  consentReconfirmed: document.querySelector('#consent-reconfirmed'),
  qualityCompositeYes: document.querySelector('#quality-composite-yes'),
  qualityCompositeNo: document.querySelector('#quality-composite-no'),
  shutterSlotLabel: document.querySelector('#shutter-slot-label'),
  shutterMessage: document.querySelector('#shutter-message'),
  shutter: document.querySelector('#shutter'),
  backToObservation: document.querySelector('#back-to-observation'),
  cancel: document.querySelector('#cancel-dry-run'),
  cancelShutter: document.querySelector('#cancel-dry-run-shutter'),
  sessionBreak: document.querySelector('#session-break'),
  temporalSeparation: document.querySelector('#temporal-separation'),
  beginSession2: document.querySelector('#begin-session-2'),
  resultStatus: document.querySelector('#result-status'),
  resultJson: document.querySelector('#result-json'),
  download: document.querySelector('#download-result'),
  restart: document.querySelector('#restart'),
  abortMessage: document.querySelector('#abort-message'),
  reloadAfterAbort: document.querySelector('#reload-after-abort'),
});

let runtimeInputs = null;
let camera = null;
let coordinator = null;
let participantRef = null;
let operatorRef = null;
let currentPreparedSlot = null;
let qualityCompositeDecision = null;
let busy = false;
let finishedExport = null;

function showView(name) {
  elements.prepView.hidden = name !== 'prep';
  elements.captureView.hidden = name !== 'capture';
  elements.resultView.hidden = name !== 'result';
  elements.abortView.hidden = name !== 'abort';
}

function setStatus(element, message) {
  element.textContent = message;
}

function showCaptureStage(name) {
  const shutterMode = name === 'shutter';
  elements.attestationStage.hidden = name !== 'attestation';
  elements.shutterStage.hidden = !shutterMode;
  elements.sessionBreak.hidden = name !== 'break';

  if (shutterMode) {
    if (elements.video.parentElement !== elements.shutterCameraHost) {
      elements.shutterCameraHost.append(elements.video);
    }
    window.scrollTo(0, 0);
  } else if (elements.video.parentElement !== elements.attestationCameraHost) {
    elements.attestationCameraHost.append(elements.video);
  }
}

function readCompositeQualityDecision() {
  if (elements.qualityCompositeYes.checked) return true;
  if (elements.qualityCompositeNo.checked) return false;
  return null;
}

function maybeEnterShutterStage() {
  qualityCompositeDecision = readCompositeQualityDecision();
  if (
    busy
    || currentPreparedSlot === null
    || !elements.challengePresented.checked
    || !elements.consentReconfirmed.checked
    || qualityCompositeDecision === null
  ) {
    return;
  }

  elements.shutterSlotLabel.textContent = elements.slotLabel.textContent;
  if (qualityCompositeDecision === true) {
    elements.shutterMessage.textContent =
      '품질 관찰 완료 · 셔터를 눌러 현재 프레임을 캡처하십시오.';
  } else {
    elements.shutterMessage.textContent =
      '품질 조건 미충족 · 세부 항목을 임의로 기록하지 않으며 촬영은 차단됩니다.';
  }
  showCaptureStage('shutter');
  updateShutterButton();
}

function returnToObservationStage() {
  qualityCompositeDecision = null;
  elements.qualityCompositeYes.checked = false;
  elements.qualityCompositeNo.checked = false;
  showCaptureStage('attestation');
  updateShutterButton();
}

function randomHex(byteLength) {
  const bytes = new Uint8Array(byteLength);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (value) => value.toString(16).padStart(2, '0')).join('');
}

function signalBootstrap(stage, detail = '') {
  const signal = window.__fr251BootstrapSignal__;
  if (typeof signal === 'function') signal(stage, detail);
}

async function fetchTextWithTimeout(url, label) {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), RUNTIME_ASSET_TIMEOUT_MS);
  try {
    signalBootstrap(label + '_fetch');
    const response = await fetch(url, {
      cache: 'no-store',
      signal: controller.signal,
    });
    if (!response.ok) {
      throw new Error(label + ' HTTP ' + response.status);
    }
    const value = await response.text();
    signalBootstrap(label + '_loaded');
    return value;
  } catch (error) {
    if (typeof error === 'object' && error !== null && error.name === 'AbortError') {
      throw new Error(label + ' timed out after ' + RUNTIME_ASSET_TIMEOUT_MS + 'ms.', { cause: error });
    }
    throw error;
  } finally {
    window.clearTimeout(timeout);
  }
}

async function fetchJsonWithTimeout(url, label) {
  const text = await fetchTextWithTimeout(url, label);
  try {
    return JSON.parse(text);
  } catch {
    throw new Error(label + ' returned invalid JSON.');
  }
}

function parseProviderLandmarks(text) {
  const landmarks = [];
  for (const match of text.matchAll(/landmark\s*\{([\s\S]*?)\}/g)) {
    const block = match[1];
    const x = Number(/\bx:\s*([-+0-9.eE]+)/.exec(block)?.[1]);
    const y = Number(/\by:\s*([-+0-9.eE]+)/.exec(block)?.[1]);
    const z = Number(/\bz:\s*([-+0-9.eE]+)/.exec(block)?.[1]);
    if (![x, y, z].every(Number.isFinite)) {
      throw new Error('release witness contains non-finite XYZ.');
    }
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
  const config = await fetchJsonWithTimeout('/runtime/config.json', 'runtime_config');
  if (
    config.schemaVersion !== 'mesh6j-localhost-runtime-config-v1'
    || config.releaseCommit !== RELEASE_COMMIT
    || config.fr76ParityInputBlobSha !== PARITY_INPUT.blobSha
    || config.rawCapturePersistenceEnabled !== false
    || config.calibrationAuthorized !== false
    || config.productionMorphologyAuthorized !== false
  ) {
    throw new Error('localhost runtime config authority boundary drift.');
  }

  const geometryMetadataPbtxt = await fetchTextWithTimeout(
    '/runtime/geometry-metadata.pbtxt',
    'geometry_metadata',
  );
  const inputFixture = await fetchTextWithTimeout(PARITY_INPUT.route, 'fr76_parity_input');

  signalBootstrap('fr76_parity_input_parse');
  const providerLandmarks = parseProviderLandmarks(inputFixture);

  signalBootstrap('authority_bootstrap');
  const fr66 = await runPhotoToLipsContourNeutralSurfaceFR66({
    schemaVersion: 'fr61-production-neutral-observation-provider-request-v1',
    providerRunRef: 'fr251:parity-bootstrap',
    canonicalAssetDigest: config.canonicalAssetDigest,
    image: Object.freeze({ releaseWitnessOnly: true }),
  }, parityFactory(providerLandmarks));
  const fr67 = assessLipsPoseNormalizationRequirementsFR67(fr66);
  const fr68 = admitMediaPipeFaceGeometryTransformSemanticsFR68(fr67);
  const fr69 = admitMediaPipeWebMetricGeometryGapFR69(fr68);
  const fr75 = admitMediaPipeReleaseExactMetricGeometryFR75(fr69);
  const parity = admitMediaPipeScreenToMetricReimplementationParityFR76(fr75);

  signalBootstrap('runtime_inputs_materialized');
  return Object.freeze({ geometryMetadataPbtxt, parity });
}

function consentReady() {
  return elements.consentChecks.every((input) => input.checked);
}

function updateStartButton() {
  elements.start.disabled = runtimeInputs === null || !consentReady() || busy;
}

function updateShutterButton() {
  elements.shutter.disabled =
    busy
    || currentPreparedSlot === null
    || !elements.challengePresented.checked
    || !elements.consentReconfirmed.checked
    || qualityCompositeDecision !== true;
}

function resetCaptureConfirmations() {
  elements.challengePresented.checked = false;
  elements.consentReconfirmed.checked = false;
  elements.qualityCompositeYes.checked = false;
  elements.qualityCompositeNo.checked = false;
  qualityCompositeDecision = null;
  showCaptureStage('attestation');
  updateShutterButton();
}

function closeCamera() {
  if (camera === null) return;
  camera.close();
  camera = null;
}

function abortDryRun(message) {
  busy = false;
  currentPreparedSlot = null;
  closeCamera();
  elements.abortMessage.textContent = message;
  showView('abort');
}

function consentInput() {
  const values = Object.fromEntries(
    elements.consentChecks.map((input) => [input.dataset.consent, input.checked]),
  );
  return values;
}

function materializeAuthorityChain() {
  if (runtimeInputs === null || camera === null) {
    throw new Error('runtime/camera is not ready.');
  }
  participantRef = 'participant:fr240:' + randomHex(12);
  operatorRef = 'operator:fr240:' + randomHex(12);

  const fr237 = preregisterObservableMorphologyRepeatabilityStudyFR237();
  const fr238 = materializeResearchLiveCaptureRuntimeFR238(fr237);
  const fr239 = issuePrecollectionRetentionPrivacyPolicyFR239(fr238);
  const protocol = issueParticipantConsentProtocolFR240({
    runtime: fr238,
    policy: fr239,
  });
  const consent = consentInput();
  const receipt = recordParticipantConsentFR240(protocol, {
    participantRef,
    operatorRef,
    consentRecordedAt: new Date().toISOString(),
    studyNoticeRead: consent.studyNoticeRead,
    voluntaryParticipationConfirmed: consent.voluntaryParticipationConfirmed,
    liveCameraCaptureConsent: consent.liveCameraCaptureConsent,
    transientRawCaptureProcessingConsent: consent.transientRawCaptureProcessingConsent,
    sanitizedReviewImageRetentionConsent: consent.sanitizedReviewImageRetentionConsent,
    pseudonymousMetricStorageConsent: consent.pseudonymousMetricStorageConsent,
    noTrainingReuseAcknowledged: consent.noTrainingReuseAcknowledged,
    noProductionReuseAcknowledged: consent.noProductionReuseAcknowledged,
    noBiometricIdentityMatchingAcknowledged: consent.noBiometricIdentityMatchingAcknowledged,
    withdrawalProcedureAcknowledged: consent.withdrawalProcedureAcknowledged,
  });
  const admission = issueOnePersonDryRunAdmissionFR240({
    protocol,
    consentReceipt: receipt,
  });
  const fr241 = materializeOnePersonDryRunRuntimeFR241({
    runtime: fr238,
    protocol,
    admission,
  });
  const fr242 = materializeEphemeralLiveCameraFrameIntakeRuntimeFR242({
    runtime: fr241,
    policy: fr239,
  });
  const fr243 = materializeGovernedDryRunExecutionRuntimeFR243({
    runtime: fr241,
    frameIntakeRuntime: fr242,
  });

  coordinator = materializeChallengeFirstBrowserDryRunCoordinatorFR250({
    camera,
    runtime: fr241,
    frameIntakeRuntime: fr242,
    executionRuntime: fr243,
    admission,
    geometryMetadataPbtxt: runtimeInputs.geometryMetadataPbtxt,
    parity: runtimeInputs.parity,
  });
}

function beginSession(sessionOrdinal) {
  if (coordinator === null) throw new Error('coordinator is not ready.');
  coordinator.beginSession({
    sessionOrdinal,
    issuedAt: new Date().toISOString(),
  });
  elements.sessionBreak.hidden = true;
  prepareNextCapture();
}

function prepareNextCapture() {
  if (coordinator === null) throw new Error('coordinator is not ready.');
  currentPreparedSlot = coordinator.prepareCapture({
    challengeIssuedAt: new Date().toISOString(),
  });
  const challenge = currentPreparedSlot.challenge;
  elements.slotLabel.textContent =
    'Session ' + challenge.sessionOrdinal + ' · Capture ' + challenge.captureOrdinal;
  elements.shutterSlotLabel.textContent = elements.slotLabel.textContent;
  elements.challengeRef.textContent = challenge.captureChallengeRef;
  elements.challengeNonce.textContent = challenge.captureNonce;
  resetCaptureConfirmations();
  setStatus(
    elements.captureStatus,
    'Challenge와 동의를 확인한 뒤 품질 관찰을 한 번 선택하십시오. 완료되면 촬영 화면으로 전환됩니다.',
  );
}

async function startDryRun() {
  if (runtimeInputs === null || !consentReady() || busy) return;
  busy = true;
  updateStartButton();
  try {
    setStatus(elements.prepStatus, '카메라 권한을 요청하고 있습니다…');
    camera = await openMesh6HBrowserCamera({ video: elements.video });
    materializeAuthorityChain();
    showView('capture');
    beginSession(1);
    busy = false;
    updateShutterButton();
  } catch (error) {
    closeCamera();
    busy = false;
    coordinator = null;
    participantRef = null;
    operatorRef = null;
    setStatus(
      elements.prepStatus,
      '시작 실패: ' + (error instanceof Error ? error.message : String(error)),
    );
    showView('prep');
    updateStartButton();
  }
}

async function captureCurrentSlot() {
  if (
    coordinator === null
    || currentPreparedSlot === null
    || operatorRef === null
    || busy
  ) {
    return;
  }
  if (
    !elements.challengePresented.checked
    || !elements.consentReconfirmed.checked
    || qualityCompositeDecision !== true
  ) {
    return;
  }

  busy = true;
  updateShutterButton();
  const prepared = currentPreparedSlot;
  const challenge = prepared.challenge;
  currentPreparedSlot = null;

  try {
    const observationRecordedAt = new Date().toISOString();
    const providerRunRef =
      'provider:fr251:s' + challenge.sessionOrdinal
      + ':c' + challenge.captureOrdinal
      + ':' + randomHex(8);
    const timestampMs = performance.now();
    const trigger = Object.freeze({ timestampMs, providerRunRef });

    const result = await coordinator.capturePrepared({
      preparedSlot: prepared,
      trigger,
      operatorExecutionAttestation: Object.freeze({
        schemaVersion: 'fr243-operator-execution-attestation-v1',
        operatorRef,
        recordedAt: new Date().toISOString(),
        participantPresentObserved: true,
        liveCameraCaptureObserved: true,
        consentReconfirmedImmediatelyBeforeCapture: true,
        challengePresentedBeforeCapture: true,
      }),
      operatorQualityObservation: Object.freeze({
        schemaVersion: 'fr247-operator-quality-observation-v1',
        operatorRef,
        providerRunRef,
        captureTriggerTimestampMs: timestampMs,
        recordedAt: observationRecordedAt,
        frontalNeutralPoseObserved: true,
        bilateralEyeContoursVisuallyResolvable: true,
        bilateralEyeRegionsFullyVisible: true,
        majorEyeRegionOcclusionAbsent: true,
        observationMadeBeforeExplicitCaptureTrigger: true,
        observationIsIndependentQualityVerification: false,
      }),
    });

    setStatus(
      elements.captureStatus,
      result.fr243Record.resultStatus === 'accepted_for_dry_run_mechanics_only'
        ? '슬롯 기록 완료: mechanics-only accepted'
        : '슬롯 기록 완료: rejected (' + result.fr243Record.rejectionReasons.join(', ') + ')',
    );

    if (challenge.captureOrdinal === 1) {
      prepareNextCapture();
      busy = false;
      updateShutterButton();
      return;
    }

    if (challenge.sessionOrdinal === 1) {
      busy = false;
      resetCaptureConfirmations();
      showCaptureStage('break');
      elements.temporalSeparation.checked = false;
      elements.beginSession2.disabled = true;
      setStatus(
        elements.captureStatus,
        'Session 1의 두 슬롯이 기록되었습니다. 실제로 분리된 Session 2를 시작할 때 아래 확인을 진행하십시오.',
      );
      return;
    }

    finishDryRun();
  } catch (error) {
    abortDryRun(
      '현재 challenge/slot은 fail-closed 처리되었습니다. 처음부터 다시 실행해야 합니다. 원인: '
      + (error instanceof Error ? error.message : String(error)),
    );
  }
}

function finishDryRun() {
  if (coordinator === null || participantRef === null || operatorRef === null) {
    throw new Error('coordinator state is unavailable.');
  }
  const review = coordinator.review();
  const records = coordinator.getSanitizedRecords();
  finishedExport = Object.freeze({
    schemaVersion: 'fr251-localhost-dry-run-sanitized-export-v1',
    generatedAt: new Date().toISOString(),
    participantRef,
    operatorRef,
    records,
    review,
    authorityBoundary: Object.freeze({
      rawMediaPersisted: false,
      rawImageDigestPersisted: false,
      faceEmbeddingPersisted: false,
      identityTemplatePersisted: false,
      temporalSeparationIndependentlyVerified: false,
      participantIdentityIndependentlyVerified: false,
      captureQualityConstructValidated: false,
      empiricalRepeatabilityEstablished: false,
      interpretationValidityEstablished: false,
      traditionalBindingIssued: false,
      productionActivated: false,
      commerceActivated: false,
    }),
  });
  closeCamera();
  busy = false;
  elements.resultJson.textContent = JSON.stringify(finishedExport, null, 2);
  setStatus(
    elements.resultStatus,
    '4개 슬롯 기록 완료 · accepted '
      + review.acceptedCaptureCount
      + ' / rejected '
      + review.rejectedCaptureCount,
  );
  showView('result');
}

function downloadResult() {
  if (finishedExport === null) return;
  const blob = new Blob(
    [JSON.stringify(finishedExport, null, 2) + '\n'],
    { type: 'application/json' },
  );
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'myeongha-fr251-dry-run-sanitized.json';
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

for (const input of elements.consentChecks) {
  input.addEventListener('change', updateStartButton);
}
for (const control of [
  elements.challengePresented,
  elements.consentReconfirmed,
  elements.qualityCompositeYes,
  elements.qualityCompositeNo,
]) {
  control.addEventListener('change', maybeEnterShutterStage);
}

elements.start.addEventListener('click', () => { void startDryRun(); });
elements.shutter.addEventListener('click', () => { void captureCurrentSlot(); });
elements.backToObservation.addEventListener('click', returnToObservationStage);
for (const control of [elements.cancel, elements.cancelShutter]) {
  control.addEventListener('click', () => {
    abortDryRun('운영자가 드라이런을 중단했습니다. 발급된 challenge는 재사용하지 않습니다.');
  });
}
elements.temporalSeparation.addEventListener('change', () => {
  elements.beginSession2.disabled = !elements.temporalSeparation.checked || busy;
});
elements.beginSession2.addEventListener('click', () => {
  if (!elements.temporalSeparation.checked || busy) return;
  try {
    beginSession(2);
  } catch (error) {
    abortDryRun(
      'Session 2 시작 실패: ' + (error instanceof Error ? error.message : String(error)),
    );
  }
});
elements.download.addEventListener('click', downloadResult);
elements.restart.addEventListener('click', () => window.location.reload());
elements.reloadAfterAbort.addEventListener('click', () => window.location.reload());
window.addEventListener('beforeunload', closeCamera);

showView('prep');
signalBootstrap('module_started');
buildRuntimeInputs()
  .then((value) => {
    runtimeInputs = value;
    signalBootstrap('ready');
    setStatus(elements.prepStatus, 'runtime 준비 완료 · 모든 동의 항목 확인 후 시작할 수 있습니다.');
    updateStartButton();
  })
  .catch((error) => {
    const detail = error instanceof Error ? error.message : String(error);
    signalBootstrap('failed', detail);
    setStatus(
      elements.prepStatus,
      'runtime 준비 실패: ' + detail,
    );
    updateStartButton();
  });
