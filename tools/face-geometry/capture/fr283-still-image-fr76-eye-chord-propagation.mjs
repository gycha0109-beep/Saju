/* global Blob, File, Image, URL, document, fetch */

import { runPhotoToLipsContourNeutralSurfaceFR66 } from '/face/lips-contour-neutral-surface-fr66.js';
import { assessLipsPoseNormalizationRequirementsFR67 } from '/face/lips-pose-normalization-requirements-fr67.js';
import { admitMediaPipeFaceGeometryTransformSemanticsFR68 } from '/face/mediapipe-face-geometry-transform-semantics-fr68.js';
import { admitMediaPipeWebMetricGeometryGapFR69 } from '/face/mediapipe-web-metric-geometry-gap-fr69.js';
import { admitMediaPipeReleaseExactMetricGeometryFR75 } from '/face/mediapipe-release-exact-metric-geometry-admission-fr75.js';
import { admitMediaPipeScreenToMetricReimplementationParityFR76 } from '/face/mediapipe-screen-to-metric-reimplementation-parity-fr76.js';
import { issueMediaPipeGeometryProfileFR77 } from '/face/governed-metric-geometry-runtime-fr77.js';
import { createCaptureGeometryAttributionCollectorFR257 } from '/face/observable-morphology-capture-geometry-attribution-fr257.js';
import { createSameFrameEyeTiltDiagnosticCollectorFR269 } from '/face/observable-morphology-controlled-capture-geometry-sensitivity-fr269.js';
import { createSameFrameScreenEyeChordCollectorFR279 } from '/face/observable-morphology-fixed-still-screen-eye-chord-fr279.js';
import { createSameFrameMetricEyeChordCollectorFR281 } from '/face/observable-morphology-fixed-still-metric-eye-chord-fr281.js';
import {
  buildFixedStillFR76EyeChordPropagationReportFR283,
  createSameFrameFR76EyeChordPropagationCollectorFR283,
} from '/face/observable-morphology-fr76-eye-chord-propagation-fr283.js';

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

const el = Object.freeze({
  runtime: document.querySelector('#runtime-status'),
  status: document.querySelector('#analysis-status'),
  analyze: document.querySelector('#analyze'),
  card: document.querySelector('#result-card'),
  json: document.querySelector('#result-json'),
  download: document.querySelector('#download'),
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
  return Object.freeze({
    async create() {
      return Object.freeze({
        detect() {
          return Object.freeze({
            faceLandmarks: [landmarks],
            faceBlendshapes: [],
            facialTransformationMatrixes: [],
          });
        },
        close() {},
      });
    },
  });
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
  ) {
    throw new Error('runtime authority boundary drift.');
  }
  const [geometryMetadataPbtxt, fixture] = await Promise.all([
    text('/runtime/geometry-metadata.pbtxt', 'geometry metadata'),
    text(PARITY_INPUT.route, 'FR76 parity input'),
  ]);

  const fr66 = await runPhotoToLipsContourNeutralSurfaceFR66({
    schemaVersion: 'fr61-production-neutral-observation-provider-request-v1',
    providerRunRef: 'fr283:parity-bootstrap',
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
  const profile = await issueMediaPipeGeometryProfileFR77(geometryMetadataPbtxt);
  return Object.freeze({ geometryMetadataPbtxt, parity, profile });
}

async function decode(file) {
  const bytes = new Uint8Array(await file.arrayBuffer());
  if (
    file.type !== 'image/jpeg'
    || bytes.byteLength < 4
    || bytes[0] !== 0xff
    || bytes[1] !== 0xd8
    || bytes[bytes.length - 2] !== 0xff
    || bytes[bytes.length - 1] !== 0xd9
  ) {
    throw new Error(file.name + ' must be a real JPEG.');
  }
  const url = URL.createObjectURL(new Blob([bytes], { type: 'image/jpeg' }));
  const image = new Image();
  image.decoding = 'sync';
  image.src = url;
  try {
    await image.decode();
    if (
      !Number.isInteger(image.naturalWidth)
      || image.naturalWidth <= 0
      || !Number.isInteger(image.naturalHeight)
      || image.naturalHeight <= 0
    ) {
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

function ready() {
  el.analyze.disabled = runtime === null
    || !SLOTS.every((slot) => document.querySelector('#' + slot.id)?.files?.length === 1);
}

function closeEnough(actual, expected) {
  const scale = Math.max(1, Math.abs(actual), Math.abs(expected));
  return Math.abs(actual - expected) <= 1e-12 * scale;
}

async function analyze() {
  if (runtime === null) throw new Error('runtime not ready.');
  el.analyze.disabled = true;
  el.card.hidden = true;
  report = null;

  const screenTilt = createSameFrameEyeTiltDiagnosticCollectorFR269();
  const screenChord = createSameFrameScreenEyeChordCollectorFR279();
  const metricChord = createSameFrameMetricEyeChordCollectorFR281();
  const propagation = createSameFrameFR76EyeChordPropagationCollectorFR283({
    canonicalMetricLandmarks: runtime.profile.canonicalMetricLandmarks,
    landmarkWeights: runtime.profile.landmarkWeights,
  });
  const geometry = createCaptureGeometryAttributionCollectorFR257({
    onEphemeralGeometry(observation) {
      screenTilt.observe(observation);
      screenChord.observe(observation);
      metricChord.observe(observation);
      propagation.observe(observation);
    },
  });

  const observations = [];
  try {
    for (let index = 0; index < SLOTS.length; index += 1) {
      const slot = SLOTS[index];
      el.status.textContent = slot.label + ' 단계별 추적 중…';
      const file = document.querySelector('#' + slot.id)?.files?.[0];
      if (!(file instanceof File)) throw new Error(slot.label + ' file required.');
      const decoded = await decode(file);
      const providerRunRef = 'fr283:still:' + String(index + 1);
      let prepared;
      try {
        prepared = await geometry.primaryMetricBindingPreparer.prepare({
          image: decoded.image,
          width: decoded.width,
          height: decoded.height,
          providerRunRef,
          jpegBytes: decoded.bytes,
          providerContext: {
            geometryMetadataPbtxt: runtime.geometryMetadataPbtxt,
            parity: runtime.parity,
          },
        });
        prepared.primaryMetricExtractor(decoded.bytes);

        const g = geometry.takeEvidence(providerRunRef);
        const s = screenTilt.takeEvidence(providerRunRef);
        const sc = screenChord.takeEvidence(providerRunRef);
        const mc = metricChord.takeEvidence(providerRunRef);
        const p = propagation.takeEvidence(providerRunRef);
        if (g === null || s === null || sc === null || mc === null || p === null) {
          throw new Error(slot.label + ' incomplete FR257/269/279/281/283 evidence.');
        }

        if (
          !closeEnough(
            p.stages[0].meanAngleDegrees,
            s.screenSpaceEyeOuterCornerTiltMeanDegrees,
          )
          || !closeEnough(
            p.stages[0].meanAngleDegrees,
            sc.reconstructedScreenSpaceEyeOuterCornerTiltMeanDegrees,
          )
          || !closeEnough(
            p.stages[5].meanAngleDegrees,
            mc.reconstructedFR76EyeOuterCornerTiltMeanDegrees,
          )
        ) {
          throw new Error(slot.label + ' stage identity drift.');
        }

        observations.push(Object.freeze({
          imageLabel: slot.label,
          condition: slot.condition,
          verticalOrientationRadians: g.geometry.verticalOrientationRadians,
          screenFaceBoxAreaFraction: g.geometry.screenFaceBoxAreaFraction,
          stages: p.stages,
          scales: p.scales,
        }));
      } finally {
        prepared?.dispose();
        decoded.dispose();
      }

      if (
        geometry.pendingEvidenceCount() !== 0
        || screenTilt.pendingEvidenceCount() !== 0
        || screenChord.pendingEvidenceCount() !== 0
        || metricChord.pendingEvidenceCount() !== 0
        || propagation.pendingEvidenceCount() !== 0
      ) {
        throw new Error(slot.label + ' retained unexpected transient evidence.');
      }
    }

    report = buildFixedStillFR76EyeChordPropagationReportFR283({
      generatedAt: new Date().toISOString(),
      observations,
    });
    el.json.textContent = JSON.stringify(report, null, 2);
    el.card.hidden = false;
    el.status.textContent = '완료 · scalar-only FR283 6/6';
  } finally {
    ready();
  }
}

for (const slot of SLOTS) {
  document.querySelector('#' + slot.id)?.addEventListener('change', ready);
}

el.analyze.addEventListener('click', () => {
  analyze().catch((error) => {
    el.status.textContent = '실패: ' + String(error?.message ?? error);
    ready();
  });
});

el.download.addEventListener('click', () => {
  if (report === null) return;
  const url = URL.createObjectURL(new Blob([
    JSON.stringify(report, null, 2) + '\n',
  ], { type: 'application/json' }));
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'myeongha-fr283-fr76-eye-chord-propagation.json';
  anchor.click();
  URL.revokeObjectURL(url);
});

bootstrap()
  .then((value) => {
    runtime = value;
    el.runtime.textContent = 'runtime 준비 완료 · FR76 stage trace';
    ready();
  })
  .catch((error) => {
    el.runtime.textContent = 'runtime 준비 실패: ' + String(error?.message ?? error);
  });