/* global Blob, File, Image, URL, document, fetch */

import { runPhotoToLipsContourNeutralSurfaceFR66 } from '/face/lips-contour-neutral-surface-fr66.js';
import { assessLipsPoseNormalizationRequirementsFR67 } from '/face/lips-pose-normalization-requirements-fr67.js';
import { admitMediaPipeFaceGeometryTransformSemanticsFR68 } from '/face/mediapipe-face-geometry-transform-semantics-fr68.js';
import { admitMediaPipeWebMetricGeometryGapFR69 } from '/face/mediapipe-web-metric-geometry-gap-fr69.js';
import { admitMediaPipeReleaseExactMetricGeometryFR75 } from '/face/mediapipe-release-exact-metric-geometry-admission-fr75.js';
import { admitMediaPipeScreenToMetricReimplementationParityFR76 } from '/face/mediapipe-screen-to-metric-reimplementation-parity-fr76.js';
import { createCaptureGeometryAttributionCollectorFR257 } from '/face/observable-morphology-capture-geometry-attribution-fr257.js';
import { createSameFrameEyeTiltDiagnosticCollectorFR269 } from '/face/observable-morphology-controlled-capture-geometry-sensitivity-fr269.js';
import { createSameFrameScreenEyeChordCollectorFR279 } from '/face/observable-morphology-fixed-still-screen-eye-chord-fr279.js';
import {
  buildFixedStillMetricEyeChordReportFR281,
  createSameFrameMetricEyeChordCollectorFR281,
} from '/face/observable-morphology-fixed-still-metric-eye-chord-fr281.js';

const RELEASE_COMMIT = 'f8ef212d5c962c0e853db7e59d217056b187084b';
const PARITY_INPUT = Object.freeze({ route: '/runtime/fr76-parity-input.prototxt', blobSha: 'ea2e60eefaf6a5c13aee4bb468384edab7e7d5d7' });
const SLOTS = Object.freeze([
  Object.freeze({ id: 'front-1', label: 'front_1', condition: 'front' }),
  Object.freeze({ id: 'front-2', label: 'front_2', condition: 'front' }),
  Object.freeze({ id: 'high-1', label: 'high_1', condition: 'high_angle' }),
  Object.freeze({ id: 'high-2', label: 'high_2', condition: 'high_angle' }),
  Object.freeze({ id: 'low-1', label: 'low_1', condition: 'low_angle' }),
  Object.freeze({ id: 'low-2', label: 'low_2', condition: 'low_angle' }),
]);
const el = Object.freeze({
  runtime: document.querySelector('#runtime-status'), status: document.querySelector('#analysis-status'),
  analyze: document.querySelector('#analyze'), card: document.querySelector('#result-card'),
  json: document.querySelector('#result-json'), download: document.querySelector('#download'),
});
let runtime = null;
let report = null;

async function text(url, label) {
  const response = await fetch(url, { cache: 'no-store' });
  if (!response.ok) throw new Error(label + ' HTTP ' + response.status);
  return response.text();
}

function providerLandmarks(source) {
  const landmarks = [];
  for (const match of source.matchAll(/landmark\s*\{([\s\S]*?)\}/g)) {
    const block = match[1];
    const x = Number(/\bx:\s*([-+0-9.eE]+)/.exec(block)?.[1]);
    const y = Number(/\by:\s*([-+0-9.eE]+)/.exec(block)?.[1]);
    const z = Number(/\bz:\s*([-+0-9.eE]+)/.exec(block)?.[1]);
    if (![x, y, z].every(Number.isFinite)) throw new Error('non-finite parity witness.');
    landmarks.push(Object.freeze({ x, y, z }));
  }
  if (landmarks.length !== 478) throw new Error('expected 478 parity-witness landmarks.');
  return Object.freeze(landmarks);
}

function parityFactory(landmarks) {
  return Object.freeze({ async create() {
    return Object.freeze({
      detect() { return Object.freeze({ faceLandmarks: [landmarks], faceBlendshapes: [], facialTransformationMatrixes: [] }); },
      close() {},
    });
  }});
}

async function bootstrap() {
  const config = JSON.parse(await text('/runtime/config.json', 'runtime config'));
  if (
    config.schemaVersion !== 'mesh6j-localhost-runtime-config-v1'
    || config.releaseCommit !== RELEASE_COMMIT
    || config.fr76ParityInputBlobSha !== PARITY_INPUT.blobSha
    || config.rawCapturePersistenceEnabled !== false
    || config.calibrationAuthorized !== false
    || config.productionMorphologyAuthorized !== false
  ) throw new Error('runtime authority boundary drift.');
  const [geometryMetadataPbtxt, fixture] = await Promise.all([
    text('/runtime/geometry-metadata.pbtxt', 'geometry metadata'),
    text(PARITY_INPUT.route, 'FR76 parity input'),
  ]);
  const fr66 = await runPhotoToLipsContourNeutralSurfaceFR66({
    schemaVersion: 'fr61-production-neutral-observation-provider-request-v1',
    providerRunRef: 'fr281:parity-bootstrap',
    canonicalAssetDigest: config.canonicalAssetDigest,
    image: Object.freeze({ releaseWitnessOnly: true }),
  }, parityFactory(providerLandmarks(fixture)));
  const parity = admitMediaPipeScreenToMetricReimplementationParityFR76(
    admitMediaPipeReleaseExactMetricGeometryFR75(
      admitMediaPipeWebMetricGeometryGapFR69(
        admitMediaPipeFaceGeometryTransformSemanticsFR68(
          assessLipsPoseNormalizationRequirementsFR67(fr66),
        ),
      ),
    ),
  );
  return Object.freeze({ geometryMetadataPbtxt, parity });
}

async function decode(file) {
  const bytes = new Uint8Array(await file.arrayBuffer());
  if (file.type !== 'image/jpeg' || bytes[0] !== 0xff || bytes[1] !== 0xd8
      || bytes[bytes.length - 2] !== 0xff || bytes[bytes.length - 1] !== 0xd9) {
    throw new Error(file.name + ' must be a real JPEG.');
  }
  const url = URL.createObjectURL(new Blob([bytes], { type: 'image/jpeg' }));
  const image = new Image(); image.src = url; await image.decode();
  return Object.freeze({
    image, bytes, width: image.naturalWidth, height: image.naturalHeight,
    dispose() { URL.revokeObjectURL(url); image.removeAttribute('src'); bytes.fill(0); },
  });
}

function ready() {
  el.analyze.disabled = runtime === null
    || !SLOTS.every((slot) => document.querySelector('#' + slot.id)?.files?.length === 1);
}

async function analyze() {
  if (runtime === null) throw new Error('runtime not ready.');
  el.analyze.disabled = true; el.card.hidden = true; report = null;
  const screenTilt = createSameFrameEyeTiltDiagnosticCollectorFR269();
  const screenChord = createSameFrameScreenEyeChordCollectorFR279();
  const metricChord = createSameFrameMetricEyeChordCollectorFR281();
  const geometry = createCaptureGeometryAttributionCollectorFR257({
    onEphemeralGeometry(observation) {
      screenTilt.observe(observation);
      screenChord.observe(observation);
      metricChord.observe(observation);
    },
  });
  const observations = [];
  try {
    for (let index = 0; index < SLOTS.length; index += 1) {
      const slot = SLOTS[index];
      el.status.textContent = slot.label + ' 분석 중…';
      const file = document.querySelector('#' + slot.id)?.files?.[0];
      if (!(file instanceof File)) throw new Error(slot.label + ' file required.');
      const decoded = await decode(file);
      const providerRunRef = 'fr281:still:' + String(index + 1);
      let prepared;
      try {
        prepared = await geometry.primaryMetricBindingPreparer.prepare({
          image: decoded.image, width: decoded.width, height: decoded.height,
          providerRunRef, jpegBytes: decoded.bytes,
          providerContext: { geometryMetadataPbtxt: runtime.geometryMetadataPbtxt, parity: runtime.parity },
        });
        prepared.primaryMetricExtractor(decoded.bytes);
        const g = geometry.takeEvidence(providerRunRef);
        const s = screenTilt.takeEvidence(providerRunRef);
        const sc = screenChord.takeEvidence(providerRunRef);
        const mc = metricChord.takeEvidence(providerRunRef);
        if (g === null || s === null || sc === null || mc === null) throw new Error(slot.label + ' incomplete evidence.');
        const scale = Math.max(1, Math.abs(s.screenSpaceEyeOuterCornerTiltMeanDegrees), Math.abs(sc.reconstructedScreenSpaceEyeOuterCornerTiltMeanDegrees));
        if (Math.abs(s.screenSpaceEyeOuterCornerTiltMeanDegrees - sc.reconstructedScreenSpaceEyeOuterCornerTiltMeanDegrees) > 1e-12 * scale) {
          throw new Error(slot.label + ' screen reconstruction drift.');
        }
        observations.push(Object.freeze({
          imageLabel: slot.label,
          condition: slot.condition,
          fr76CanonicalMetricEyeOuterCornerTiltMeanDegrees: mc.reconstructedFR76EyeOuterCornerTiltMeanDegrees,
          reconstructedFR76EyeOuterCornerTiltMeanDegrees: mc.reconstructedFR76EyeOuterCornerTiltMeanDegrees,
          negativeXEyeChord: mc.negativeXEyeChord,
          positiveXEyeChord: mc.positiveXEyeChord,
          meanHorizontalSpanCentimeters: mc.meanHorizontalSpanCentimeters,
          meanSignedVerticalRiseCentimeters: mc.meanSignedVerticalRiseCentimeters,
          screenSpaceEyeOuterCornerTiltMeanDegrees: s.screenSpaceEyeOuterCornerTiltMeanDegrees,
          screenMeanHorizontalSpanPixels: sc.meanHorizontalSpanPixels,
          screenMeanSignedVerticalRisePixels: sc.meanSignedVerticalRisePixels,
          verticalOrientationRadians: g.geometry.verticalOrientationRadians,
          screenFaceBoxAreaFraction: g.geometry.screenFaceBoxAreaFraction,
        }));
      } finally {
        prepared?.dispose();
        decoded.dispose();
      }
      if (
        geometry.pendingEvidenceCount() !== 0 || screenTilt.pendingEvidenceCount() !== 0
        || screenChord.pendingEvidenceCount() !== 0 || metricChord.pendingEvidenceCount() !== 0
      ) throw new Error(slot.label + ' retained transient evidence.');
    }
    report = buildFixedStillMetricEyeChordReportFR281({ generatedAt: new Date().toISOString(), observations });
    el.json.textContent = JSON.stringify(report, null, 2); el.card.hidden = false; el.status.textContent = '완료 · scalar-only FR281 6/6';
  } finally { ready(); }
}

for (const slot of SLOTS) document.querySelector('#' + slot.id)?.addEventListener('change', ready);
el.analyze.addEventListener('click', () => analyze().catch((error) => { el.status.textContent = '실패: ' + String(error?.message ?? error); ready(); }));
el.download.addEventListener('click', () => {
  if (report === null) return;
  const url = URL.createObjectURL(new Blob([JSON.stringify(report, null, 2) + '\n'], { type: 'application/json' }));
  const a = document.createElement('a'); a.href = url; a.download = 'myeongha-fr281-metric-eye-chord.json'; a.click(); URL.revokeObjectURL(url);
});
bootstrap().then((value) => { runtime = value; el.runtime.textContent = 'runtime 준비 완료 · FR76 canonical metric'; ready(); })
  .catch((error) => { el.runtime.textContent = 'runtime 준비 실패: ' + String(error?.message ?? error); });
