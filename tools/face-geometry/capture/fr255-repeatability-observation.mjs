/* global Blob, URL, crypto, document */

import {
  appendLongitudinalRepeatabilityObservationFR255,
  assertLongitudinalRepeatabilityBundleFR255,
  createLongitudinalRepeatabilityBundleFR255,
} from '/face/observable-morphology-longitudinal-repeatability-observation-fr255.js';

const elements = Object.freeze({
  priorBundle: document.querySelector('#prior-bundle'),
  sourceFR251: document.querySelector('#source-fr251'),
  studyRef: document.querySelector('#study-ref'),
  baselineParticipant: document.querySelector('#baseline-participant'),
  separateExecution: document.querySelector('#separate-execution'),
  sameParticipantRow: document.querySelector('#same-participant-row'),
  sameParticipant: document.querySelector('#same-participant'),
  deviceClass: document.querySelector('#device-class'),
  cameraFacing: document.querySelector('#camera-facing'),
  orientation: document.querySelector('#orientation'),
  lightingCondition: document.querySelector('#lighting-condition'),
  glassesPresent: document.querySelector('#glasses-present'),
  hairOccluding: document.querySelector('#hair-occluding'),
  neutralExpression: document.querySelector('#neutral-expression'),
  frontalPose: document.querySelector('#frontal-pose'),
  build: document.querySelector('#build-bundle'),
  status: document.querySelector('#status'),
  resultCard: document.querySelector('#result-card'),
  summary: document.querySelector('#summary'),
  resultJson: document.querySelector('#result-json'),
  download: document.querySelector('#download-result'),
  reset: document.querySelector('#reset'),
});

let priorBundle = null;
let currentStudyRef = makeStudyRef();
let finishedBundle = null;
let priorLoadPending = false;

function randomHex(byteLength) {
  const bytes = new Uint8Array(byteLength);
  crypto.getRandomValues(bytes);
  return Array.from(
    bytes,
    (value) => value.toString(16).padStart(2, '0'),
  ).join('');
}

function makeStudyRef() {
  return 'study.fr255:' + randomHex(12);
}

function setStatus(message) {
  elements.status.textContent = message;
}

function renderStudyRef() {
  elements.studyRef.textContent = priorBundle === null
    ? currentStudyRef
    : priorBundle.studyRef;
}

function requiresContinuityAttestation() {
  return priorBundle !== null;
}

function updateReady() {
  const continuityReady =
    !requiresContinuityAttestation() || elements.sameParticipant.checked;
  elements.build.disabled =
    priorLoadPending
    || elements.sourceFR251.files.length !== 1
    || !elements.baselineParticipant.checked
    || !elements.separateExecution.checked
    || !continuityReady;
}

async function readJsonFile(file, label) {
  let value;
  try {
    value = JSON.parse(await file.text());
  } catch (error) {
    throw new Error(
      label + ' JSON 파싱 실패: '
      + (error instanceof Error ? error.message : String(error)),
    );
  }
  return value;
}

function captureConditions() {
  return Object.freeze({
    schemaVersion: 'fr255-capture-condition-observation-v1',
    deviceClass: elements.deviceClass.value,
    cameraFacing: elements.cameraFacing.value,
    orientation: elements.orientation.value,
    lightingCondition: elements.lightingCondition.value,
    glassesPresent: elements.glassesPresent.value,
    hairOccludingEyeRegion: elements.hairOccluding.value,
    neutralExpressionOperatorAttested: elements.neutralExpression.checked,
    frontalPoseOperatorAttested: elements.frontalPose.checked,
    operatorObservationOnly: true,
    independentlyVerified: false,
    qualityThresholdApplied: false,
  });
}

async function loadPriorBundle() {
  finishedBundle = null;
  elements.resultCard.hidden = true;
  elements.sameParticipant.checked = false;

  if (elements.priorBundle.files.length === 0) {
    priorBundle = null;
    currentStudyRef = makeStudyRef();
    elements.sameParticipantRow.hidden = true;
    renderStudyRef();
    setStatus('새 FR255 번들을 시작합니다. 새 FR251 sanitized JSON을 선택하십시오.');
    updateReady();
    return;
  }

  priorLoadPending = true;
  updateReady();
  setStatus('기존 FR255 번들의 append-only digest chain을 검증하고 있습니다…');
  try {
    const parsed = await readJsonFile(
      elements.priorBundle.files[0],
      '기존 FR255 번들',
    );
    priorBundle = assertLongitudinalRepeatabilityBundleFR255(parsed);
    currentStudyRef = priorBundle.studyRef;
    elements.sameParticipantRow.hidden = false;
    renderStudyRef();
    setStatus(
      '기존 번들 검증 완료 · 관찰 블록 '
      + priorBundle.descriptiveSummary.observationBlockCount
      + '개 · 새 FR251 실행을 추가할 수 있습니다.',
    );
  } catch (error) {
    priorBundle = null;
    currentStudyRef = makeStudyRef();
    elements.sameParticipantRow.hidden = true;
    renderStudyRef();
    setStatus(
      '기존 FR255 번들 검증 실패: '
      + (error instanceof Error ? error.message : String(error)),
    );
  } finally {
    priorLoadPending = false;
    updateReady();
  }
}

async function buildBundle() {
  if (elements.build.disabled || elements.sourceFR251.files.length !== 1) return;

  elements.build.disabled = true;
  setStatus('FR251 mechanics/privacy 경계를 검증하고 descriptive observation을 구성하고 있습니다…');
  try {
    const source = await readJsonFile(
      elements.sourceFR251.files[0],
      '새 FR251 sanitized export',
    );
    const importedAt = new Date().toISOString();
    const conditions = captureConditions();

    const next = priorBundle === null
      ? createLongitudinalRepeatabilityBundleFR255({
        studyRef: currentStudyRef,
        importedAt,
        sourceFR251: source,
        baselineParticipantOperatorAttested: true,
        separateFR251ExecutionOperatorAttested: true,
        captureConditions: conditions,
      })
      : appendLongitudinalRepeatabilityObservationFR255({
        bundle: priorBundle,
        importedAt,
        sourceFR251: source,
        baselineParticipantOperatorAttested: true,
        sameParticipantAsPreviousOperatorAttested: true,
        separateFR251ExecutionOperatorAttested: true,
        captureConditions: conditions,
      });

    finishedBundle = next;
    elements.resultJson.textContent = JSON.stringify(next, null, 2);
    const latest = next.observations[next.observations.length - 1];
    const elapsed = latest.elapsedSincePreviousObservationMs === null
      ? '첫 관찰'
      : '이전 관찰 이후 ' + latest.elapsedSincePreviousObservationMs + ' ms';
    elements.summary.textContent =
      '관찰 블록 ' + next.descriptiveSummary.observationBlockCount
      + '개 · accepted metric '
      + next.descriptiveSummary.acceptedCaptureMetricCount
      + '개 · ' + elapsed
      + ' · PASS/FAIL 없음';
    elements.resultCard.hidden = false;
    setStatus('FR255 descriptive bundle 생성 완료. 서버로 업로드되지 않았습니다.');
  } catch (error) {
    finishedBundle = null;
    elements.resultCard.hidden = true;
    setStatus(
      'FR255 번들 생성 실패: '
      + (error instanceof Error ? error.message : String(error)),
    );
  } finally {
    updateReady();
  }
}

function downloadResult() {
  if (finishedBundle === null) return;
  const payload = JSON.stringify(finishedBundle, null, 2) + '\n';
  const blob = new Blob([payload], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download =
    'myeongha-fr255-repeatability-'
    + new Date().toISOString().replaceAll(':', '-')
    + '.json';
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

function prepareNextObservation() {
  if (finishedBundle === null) return;
  priorBundle = finishedBundle;
  currentStudyRef = priorBundle.studyRef;
  finishedBundle = null;
  elements.priorBundle.value = '';
  elements.sourceFR251.value = '';
  elements.baselineParticipant.checked = false;
  elements.separateExecution.checked = false;
  elements.sameParticipant.checked = false;
  elements.sameParticipantRow.hidden = false;
  elements.resultCard.hidden = true;
  renderStudyRef();
  setStatus(
    '현재 결과를 다음 관찰의 기준 번들로 유지했습니다. '
    + '별도로 완료한 다음 FR251 sanitized JSON을 선택하십시오.',
  );
  updateReady();
}

elements.priorBundle.addEventListener('change', () => {
  void loadPriorBundle();
});
elements.sourceFR251.addEventListener('change', updateReady);
for (const control of [
  elements.baselineParticipant,
  elements.separateExecution,
  elements.sameParticipant,
]) {
  control.addEventListener('change', updateReady);
}
elements.build.addEventListener('click', () => {
  void buildBundle();
});
elements.download.addEventListener('click', downloadResult);
elements.reset.addEventListener('click', prepareNextObservation);

renderStudyRef();
updateReady();
