/* global Blob, File, Image, URL, document, fetch, window */

import { runPhotoToLipsContourNeutralSurfaceFR66 } from '/face/lips-contour-neutral-surface-fr66.js';
import { assessLipsPoseNormalizationRequirementsFR67 } from '/face/lips-pose-normalization-requirements-fr67.js';
import { admitMediaPipeFaceGeometryTransformSemanticsFR68 } from '/face/mediapipe-face-geometry-transform-semantics-fr68.js';
import { admitMediaPipeWebMetricGeometryGapFR69 } from '/face/mediapipe-web-metric-geometry-gap-fr69.js';
import { admitMediaPipeReleaseExactMetricGeometryFR75 } from '/face/mediapipe-release-exact-metric-geometry-admission-fr75.js';
import { admitMediaPipeScreenToMetricReimplementationParityFR76 } from '/face/mediapipe-screen-to-metric-reimplementation-parity-fr76.js';
import { createCaptureGeometryAttributionCollectorFR257 } from '/face/observable-morphology-capture-geometry-attribution-fr257.js';
import { createSameFrameEyeTiltDiagnosticCollectorFR269 } from '/face/observable-morphology-controlled-capture-geometry-sensitivity-fr269.js';
import {
  buildFixedStillScreenEyeChordReportFR279,
  createSameFrameScreenEyeChordCollectorFR279,
} from '/face/observable-morphology-fixed-still-screen-eye-chord-fr279.js';

const RELEASE_COMMIT = 'f8ef212d5c962c0e853db7e59d217056b187084b';
const PARITY_INPUT = Object.freeze({
  route: '/runtime/fr76-parity-input.prototxt',
  blobSha: 'ea2e60eefaf6a5c13aee4bb468384edab7e7d5d7',
});
const SLOTS = Object.freeze([
  Object.freeze({ id: 'front-1', label: 'front_1', condition: 'front' }),
  Object.freeze({ id: 'front-2', label: 'front_2', condition: 'front' }),
  Object.freeze({ id: 'high-1', label: 'high_1', condition: 'high_angle' }),
  Object.freeze({ id: 'high-2', label: 'high_2', condition: 'high_angle' }),
  Object.freeze({ id: 'low-1', label: 'low_1', condition: 'low_angle' }),
  Object.freeze({ id: 'low-2', label: 'low_2', condition: 'low_angle' }),
]);

const elements = Object.freeze({
  runtimeStatus: document.querySelector('#runtime-status'),
  analysisStatus: document.querySelector('#analysis-status'),
  analyze: document.querySelector('#analyze'),
  resultCard: document.querySelector('#result-card'),
  resultJson: document.querySelector('#result-json'),
  download: document.querySelector('#download'),
  reset: document.querySelector('#reset'),
});

let runtimeInputs = null;
let finishedReport = null;

function setStatus(element, message) {
  element.textContent = message;
}

async function fetchText(url, label) {
  const response = await fetch(url, { cache: 'no-store' });
  if (!response.ok) throw new Error(label + ' HTTP ' + response.status);
  return response.text();
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
  const config = JSON.parse(await fetchText('/runtime/config.json', 'runtime config'));
  if (
    config.schemaVersion !== 'mesh6j-localhost-runtime-config-v1'
    || config.releaseCommit !== RELEASE_COMMIT
    || config.fr76ParityInputBlobSha !== PARITY_INPUT.blobSha
    || config.rawCapturePersistenceEnabled !== false
    || config.calibrationAuthorized !== false
    || config.productionMorphologyAuthorized !== false
  ) {
    throw new Error('runtime config authority boundary drift.');
  }
  const [geometryMetadataPbtxt, inputFixture] = await Promise.all([
    fetchText('/runtime/geometry-metadata.pbtxt', 'geometry metadata'),
    fetchText(PARITY_INPUT.route, 'FR76 parity input'),
  ]);
  const providerLandmarks = parseProviderLandmarks(inputFixture);
  const fr66 = await runPhotoToLipsContourNeutralSurfaceFR66({
    schemaVersion: 'fr61-production-neutral-observation-provider-request-v1',
    providerRunRef: 'fr279:parity-bootstrap',
    canonicalAssetDigest: config.canonicalAssetDigest,
    image: Object.freeze({ releaseWitnessOnly: true }),
  }, parityFactory(providerLandmarks));
  const fr67 = assessLipsPoseNormalizationRequirementsFR67(fr66);
  const fr68 = admitMediaPipeFaceGeometryTransformSemanticsFR68(fr67);
  const fr69 = admitMediaPipeWebMetricGeometryGapFR69(fr68);
  const fr75 = admitMediaPipeReleaseExactMetricGeometryFR75(fr69);
  const parity = admitMediaPipeScreenToMetricReimplementationParityFR76(fr75);
  return Object.freeze({ geometryMetadataPbtxt, parity });
}

function validateJpeg(bytes, file) {
  if (
    file.type !== 'image/jpeg'
    || bytes.byteLength < 4
    || bytes[0] !== 0xff
    || bytes[1] !== 0xd8
    || bytes[bytes.byteLength - 2] !== 0xff
    || bytes[bytes.byteLength - 1] !== 0xd9
  ) {
    throw new Error(file.name + ' must be a real image/jpeg file.');
  }
}

async function decodeImage(file) {
  const bytes = new Uint8Array(await file.arrayBuffer());
  validateJpeg(bytes, file);
  const url = URL.createObjectURL(new Blob([bytes], { type: 'image/jpeg' }));
  const image = new Image();
  image.decoding = 'sync';
  image.src = url;
  try {
    await image.decode();
    if (!Number.isInteger(image.naturalWidth) || !Number.isInteger(image.naturalHeight)
        || image.naturalWidth <= 0 || image.naturalHeight <= 0) {
      throw new Error(file.name + ' decoded with invalid dimensions.');
    }
    return Object.freeze({
      image,
      bytes,
      width: image.naturalWidth,
      height: image.naturalHeight,
      dispose() {
        URL.revokeObjectURL(url);
        image.removeAttribute('src');
        bytes.fill(0);
      },
    });
  } catch (error) {
    URL.revokeObjectURL(url);
    bytes.fill(0);
    throw error;
  }
}

function selectedFile(slot) {
  const input = document.querySelector('#' + slot.id);
  const file = input?.files?.[0];
  if (!(file instanceof File)) {
    throw new Error(slot.label + ' file is required.');
  }
  return file;
}

function updateAnalyzeState() {
  elements.analyze.disabled = runtimeInputs === null
    || !SLOTS.every((slot) => document.querySelector('#' + slot.id)?.files?.length === 1);
}

function downloadJson(value) {
  const blob = new Blob([JSON.stringify(value, null, 2) + '\n'], {
    type: 'application/json;charset=utf-8',
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'myeongha-fr279-screen-eye-chord-'
    + value.generatedAt.replaceAll(':', '-') + '.json';
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

async function analyze() {
  if (runtimeInputs === null) throw new Error('runtime is not ready.');
  elements.analyze.disabled = true;
  elements.resultCard.hidden = true;
  finishedReport = null;
  setStatus(elements.analysisStatus, '6장 component 분석 중…');

  const diagnosticCollector = createSameFrameEyeTiltDiagnosticCollectorFR269();
  const componentCollector = createSameFrameScreenEyeChordCollectorFR279();
  const geometryCollector = createCaptureGeometryAttributionCollectorFR257({
    onEphemeralGeometry(observation) {
      diagnosticCollector.observe(observation);
      componentCollector.observe(observation);
    },
  });
  const observations = [];

  try {
    for (let index = 0; index < SLOTS.length; index += 1) {
      const slot = SLOTS[index];
      setStatus(elements.analysisStatus, slot.label + ' 분석 중…');
      const file = selectedFile(slot);
      const decoded = await decodeImage(file);
      const providerRunRef = 'fr279:still:' + String(index + 1);
      let prepared;
      try {
        prepared = await geometryCollector.primaryMetricBindingPreparer.prepare({
          image: decoded.image,
          width: decoded.width,
          height: decoded.height,
          providerRunRef,
          jpegBytes: decoded.bytes,
          providerContext: {
            geometryMetadataPbtxt: runtimeInputs.geometryMetadataPbtxt,
            parity: runtimeInputs.parity,
          },
        });
        prepared.primaryMetricExtractor(decoded.bytes);

        const geometryEvidence = geometryCollector.takeEvidence(providerRunRef);
        const diagnosticEvidence = diagnosticCollector.takeEvidence(providerRunRef);
        const componentEvidence = componentCollector.takeEvidence(providerRunRef);
        if (
          geometryEvidence === null
          || diagnosticEvidence === null
          || componentEvidence === null
        ) {
          throw new Error(slot.label + ' did not produce complete FR257/FR269/FR279 evidence.');
        }
        if (
          diagnosticEvidence.screenSpaceEyeOuterCornerTiltMeanDegrees
          !== componentEvidence.reconstructedScreenSpaceEyeOuterCornerTiltMeanDegrees
        ) {
          const actual = diagnosticEvidence.screenSpaceEyeOuterCornerTiltMeanDegrees;
          const expected = componentEvidence.reconstructedScreenSpaceEyeOuterCornerTiltMeanDegrees;
          const scale = Math.max(1, Math.abs(actual), Math.abs(expected));
          if (Math.abs(actual - expected) > 1e-12 * scale) {
            throw new Error(slot.label + ' FR279 reconstruction drifted from FR269 screen-space angle.');
          }
        }

        observations.push(Object.freeze({
          imageLabel: slot.label,
          condition: slot.condition,
          frameWidth: decoded.width,
          frameHeight: decoded.height,
          screenSpaceEyeOuterCornerTiltMeanDegrees:
            diagnosticEvidence.screenSpaceEyeOuterCornerTiltMeanDegrees,
          reconstructedScreenSpaceEyeOuterCornerTiltMeanDegrees:
            componentEvidence.reconstructedScreenSpaceEyeOuterCornerTiltMeanDegrees,
          screenLeftEyeChord: componentEvidence.screenLeftEyeChord,
          screenRightEyeChord: componentEvidence.screenRightEyeChord,
          meanHorizontalSpanPixels: componentEvidence.meanHorizontalSpanPixels,
          meanHorizontalSpanFrameWidthFraction:
            componentEvidence.meanHorizontalSpanFrameWidthFraction,
          meanSignedVerticalRisePixels: componentEvidence.meanSignedVerticalRisePixels,
          meanSignedVerticalRiseFrameHeightFraction:
            componentEvidence.meanSignedVerticalRiseFrameHeightFraction,
          lateralOrientationRadians: geometryEvidence.geometry.lateralOrientationRadians,
          verticalOrientationRadians: geometryEvidence.geometry.verticalOrientationRadians,
          inPlaneLateralAxisOrientationRadians:
            geometryEvidence.geometry.inPlaneLateralAxisOrientationRadians,
          screenFaceBoxAreaFraction: geometryEvidence.geometry.screenFaceBoxAreaFraction,
        }));
      } finally {
        prepared?.dispose();
        decoded.dispose();
      }
      if (
        geometryCollector.pendingEvidenceCount() !== 0
        || diagnosticCollector.pendingEvidenceCount() !== 0
        || componentCollector.pendingEvidenceCount() !== 0
      ) {
        throw new Error(slot.label + ' retained unexpected transient evidence.');
      }
    }

    finishedReport = buildFixedStillScreenEyeChordReportFR279({
      generatedAt: new Date().toISOString(),
      observations,
    });
    elements.resultJson.textContent = JSON.stringify(finishedReport, null, 2);
    elements.resultCard.hidden = false;
    setStatus(elements.analysisStatus, '완료 · scalar-only component report 6/6');
  } finally {
    updateAnalyzeState();
  }
}

for (const slot of SLOTS) {
  document.querySelector('#' + slot.id)?.addEventListener('change', updateAnalyzeState);
}
elements.analyze.addEventListener('click', () => {
  analyze().catch((error) => {
    setStatus(elements.analysisStatus, '실패: ' + (error instanceof Error ? error.message : String(error)));
    updateAnalyzeState();
  });
});
elements.download.addEventListener('click', () => {
  if (finishedReport !== null) downloadJson(finishedReport);
});
elements.reset.addEventListener('click', () => window.location.reload());

buildRuntimeInputs()
  .then((inputs) => {
    runtimeInputs = inputs;
    setStatus(elements.runtimeStatus, 'runtime 준비 완료 · @mediapipe/tasks-vision 0.10.35 IMAGE');
    updateAnalyzeState();
  })
  .catch((error) => {
    setStatus(elements.runtimeStatus, 'runtime 준비 실패: ' + (error instanceof Error ? error.message : String(error)));
  });
