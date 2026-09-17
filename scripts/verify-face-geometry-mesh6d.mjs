import { Buffer } from 'node:buffer';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import process from 'node:process';

import { runPhotoToLipsContourNeutralSurfaceFR66 } from '../.face-reading-dist/lips-contour-neutral-surface-fr66.js';
import { assessLipsPoseNormalizationRequirementsFR67 } from '../.face-reading-dist/lips-pose-normalization-requirements-fr67.js';
import { admitMediaPipeFaceGeometryTransformSemanticsFR68 } from '../.face-reading-dist/mediapipe-face-geometry-transform-semantics-fr68.js';
import { admitMediaPipeWebMetricGeometryGapFR69 } from '../.face-reading-dist/mediapipe-web-metric-geometry-gap-fr69.js';
import { admitMediaPipeReleaseExactMetricGeometryFR75 } from '../.face-reading-dist/mediapipe-release-exact-metric-geometry-admission-fr75.js';
import { admitMediaPipeScreenToMetricReimplementationParityFR76 } from '../.face-reading-dist/mediapipe-screen-to-metric-reimplementation-parity-fr76.js';
import { runGovernedMetricGeometryFR77 } from '../.face-reading-dist/governed-metric-geometry-runtime-fr77.js';
import { buildMesh6ANeutralObservationFrame } from '../.face-reading-dist/mesh6a-neutral-observation-frame.js';
import {
  buildMesh6DMultiFramePoseSweepEvidence,
  computeMesh6DPoseEvidence,
} from '../.face-reading-dist/mesh6d-multi-frame-pose-sweep-evidence.js';

const RELEASE_COMMIT = 'f8ef212d5c962c0e853db7e59d217056b187084b';
const RAW_ROOT = `https://raw.githubusercontent.com/google-ai-edge/mediapipe/${RELEASE_COMMIT}`;
const DIGEST = `sha256:${'6'.repeat(64)}`;
const ALT_DIGEST = `sha256:${'7'.repeat(64)}`;
const WITNESSES = Object.freeze({
  input: Object.freeze({
    path: 'mediapipe/tasks/testdata/vision/face_blendshapes_in_landmarks.prototxt',
    blobSha: 'ea2e60eefaf6a5c13aee4bb468384edab7e7d5d7',
  }),
  metadata: Object.freeze({
    path: 'mediapipe/tasks/cc/vision/face_geometry/data/geometry_pipeline_metadata_landmarks.pbtxt',
    blobSha: '252a7b05b24c5c43c5b94179393639f7c9a2fe8f',
  }),
});

function gitBlobSha(bytes) {
  const prefix = Buffer.from(`blob ${bytes.length}\0`, 'utf8');
  return createHash('sha1').update(prefix).update(bytes).digest('hex');
}

async function fetchExact(witness) {
  const response = await globalThis.fetch(`${RAW_ROOT}/${witness.path}`, {
    headers: { 'user-agent': 'myeongha-mesh6d-verifier' },
  });
  if (!response.ok) throw new Error(`MESH6D failed to fetch ${witness.path}: HTTP ${response.status}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  const actualSha = gitBlobSha(bytes);
  if (actualSha !== witness.blobSha) throw new Error(`MESH6D Git blob SHA mismatch: ${witness.path}`);
  return bytes.toString('utf8');
}

function parseProviderLandmarks(text) {
  const landmarks = [];
  for (const match of text.matchAll(/landmark\s*\{([\s\S]*?)\}/g)) {
    const block = match[1];
    const x = Number(/\bx:\s*([-+0-9.eE]+)/.exec(block)?.[1]);
    const y = Number(/\by:\s*([-+0-9.eE]+)/.exec(block)?.[1]);
    const z = Number(/\bz:\s*([-+0-9.eE]+)/.exec(block)?.[1]);
    if (![x, y, z].every(Number.isFinite)) throw new Error('MESH6D provider fixture contains non-finite XYZ.');
    landmarks.push({ x, y, z });
  }
  if (landmarks.length !== 478) throw new Error(`MESH6D expected 478 provider landmarks; got ${landmarks.length}.`);
  return landmarks;
}

function factory(providerLandmarks) {
  return {
    async create() {
      return {
        detect() {
          return { faceLandmarks: [providerLandmarks], faceBlendshapes: [], facialTransformationMatrixes: [] };
        },
        close() {},
      };
    },
  };
}

function close(actual, expected, tolerance = 1e-10) {
  return Math.abs(actual - expected) <= tolerance;
}

function packedAffine(rotation, { scale = 1, tx = 0, ty = 0, tz = 0 } = {}) {
  const rowMajor = [
    scale * rotation[0], scale * rotation[1], scale * rotation[2], tx,
    scale * rotation[3], scale * rotation[4], scale * rotation[5], ty,
    scale * rotation[6], scale * rotation[7], scale * rotation[8], tz,
    0, 0, 0, 1,
  ];
  return [
    rowMajor[0], rowMajor[4], rowMajor[8], rowMajor[12],
    rowMajor[1], rowMajor[5], rowMajor[9], rowMajor[13],
    rowMajor[2], rowMajor[6], rowMajor[10], rowMajor[14],
    rowMajor[3], rowMajor[7], rowMajor[11], rowMajor[15],
  ];
}

function yaw(angle) {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return [c, 0, s, 0, 1, 0, -s, 0, c];
}

function positiveVertical(angle) {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return [1, 0, 0, 0, c, s, 0, -s, c];
}

function expectFailure(label, callback) {
  try {
    callback();
  } catch {
    return;
  }
  throw new Error(`MESH6D expected fail-closed rejection: ${label}`);
}

function assertNoForbiddenAuthorityKeys(value) {
  const forbidden = new Set([
    'frontal',
    'threeQuarter',
    'capturePass',
    'confidenceScore',
    'productionEligible',
    'expressionNeutral',
    'occlusionValid',
  ]);
  const visit = (candidate) => {
    if (candidate === null || typeof candidate !== 'object') return;
    for (const [key, child] of Object.entries(candidate)) {
      if (forbidden.has(key)) throw new Error(`MESH6D prohibited authority field emitted: ${key}`);
      visit(child);
    }
  };
  visit(value);
}

async function issueFrame({ digest, providerRunRef, metadataFixture, providerLandmarks, fr76 }) {
  const fr77 = await runGovernedMetricGeometryFR77({
    schemaVersion: 'fr77-governed-metric-geometry-runtime-request-v1',
    providerRunRef,
    canonicalAssetDigest: digest,
    image: Object.freeze({ fixture: true }),
    frameWidth: 820,
    frameHeight: 1024,
    geometryMetadataPbtxt: metadataFixture,
  }, fr76, factory(providerLandmarks));
  return buildMesh6ANeutralObservationFrame(fr77);
}

const adapterPath = process.argv[2];
if (!adapterPath) throw new Error('Usage: node scripts/verify-face-geometry-mesh6d.mjs <weighted-adapter.json>');
const adapter = JSON.parse(readFileSync(adapterPath, 'utf8'));

const [inputFixture, metadataFixture] = await Promise.all([
  fetchExact(WITNESSES.input),
  fetchExact(WITNESSES.metadata),
]);
const providerLandmarks = parseProviderLandmarks(inputFixture);
const runtimeFactory = factory(providerLandmarks);
const fr66 = await runPhotoToLipsContourNeutralSurfaceFR66({
  schemaVersion: 'fr61-production-neutral-observation-provider-request-v1',
  providerRunRef: 'mesh6d:exact-runtime-source',
  canonicalAssetDigest: DIGEST,
  image: Object.freeze({ fixture: true }),
}, runtimeFactory);
const fr67 = assessLipsPoseNormalizationRequirementsFR67(fr66);
const fr68 = admitMediaPipeFaceGeometryTransformSemanticsFR68(fr67);
const fr69 = admitMediaPipeWebMetricGeometryGapFR69(fr68);
const fr75 = admitMediaPipeReleaseExactMetricGeometryFR75(fr69);
const fr76 = admitMediaPipeScreenToMetricReimplementationParityFR76(fr75);

const frame = await issueFrame({
  digest: DIGEST,
  providerRunRef: 'mesh6d:frame:0',
  metadataFixture,
  providerLandmarks,
  fr76,
});
const report = buildMesh6DMultiFramePoseSweepEvidence({
  frames: [
    { frame, timestampMs: 1000 },
    { frame, timestampMs: 1016 },
    { frame, timestampMs: 1032 },
  ],
  weightedRegionAdapter: adapter,
});

if (
  report.schemaVersion !== 'mesh6d-multi-frame-pose-sweep-evidence-v1' ||
  report.authorityState !== 'threshold_free_multi_frame_pose_morphology_evidence_only' ||
  report.sequence.frameCount !== 3 ||
  report.sequence.durationMs !== 32 ||
  report.adapterIdentity.sourceAssetId !== adapter.sourceAssetId ||
  report.adapterIdentity.targetAssetId !== adapter.targetAssetId
) throw new Error('MESH6D sequence or adapter identity evidence drift.');

for (const range of Object.values(report.poseSweep)) {
  if (!close(range.span, 0)) throw new Error('MESH6D identical frames must produce zero pose sweep.');
}
if (!close(report.poseSweep.relativeRotationFromFirstFrameRadians.max, 0)) {
  throw new Error('MESH6D identical frames must produce zero relative rotation.');
}
for (const [key, stat] of Object.entries(report.morphologyRepeatability.observables)) {
  if (!close(stat.mad, 0) || !close(stat.robustSpanP10P90, 0) || !close(stat.max - stat.min, 0)) {
    throw new Error(`MESH6D identical frames must produce zero morphology variation for ${key}.`);
  }
}

const identity = [1, 0, 0, 0, 1, 0, 0, 0, 1];
const identityPacked = packedAffine(identity, { scale: 2.5, tx: 1, ty: 2, tz: 3 });
const translatedPacked = packedAffine(identity, { scale: 2.5, tx: 99, ty: -47, tz: 13 });
const identityPose = computeMesh6DPoseEvidence(identityPacked, identityPacked);
const translatedPose = computeMesh6DPoseEvidence(translatedPacked, identityPacked);
if (
  JSON.stringify(identityPose.forwardAxisRuntime) !== JSON.stringify(translatedPose.forwardAxisRuntime) ||
  !close(identityPose.lateralOrientationRadians, translatedPose.lateralOrientationRadians) ||
  !close(identityPose.verticalOrientationRadians, translatedPose.verticalOrientationRadians) ||
  !close(translatedPose.relativeRotationFromFirstFrameRadians, 0)
) throw new Error('MESH6D translation-only transform changes must not affect orientation evidence.');

for (const angle of [0.35, -0.27]) {
  const pose = computeMesh6DPoseEvidence(packedAffine(yaw(angle), { scale: 3.2 }), packedAffine(identity));
  if (!close(pose.lateralOrientationRadians, angle) || !close(pose.verticalOrientationRadians, 0)) {
    throw new Error(`MESH6D lateral pure rotation sign/magnitude mismatch for ${angle}.`);
  }
  if (!close(pose.relativeRotationFromFirstFrameRadians, Math.abs(angle))) {
    throw new Error(`MESH6D lateral relative rotation magnitude mismatch for ${angle}.`);
  }
}
for (const angle of [0.22, -0.31]) {
  const pose = computeMesh6DPoseEvidence(packedAffine(positiveVertical(angle), { scale: 1.7 }), packedAffine(identity));
  if (!close(pose.verticalOrientationRadians, angle) || !close(pose.lateralOrientationRadians, 0)) {
    throw new Error(`MESH6D vertical pure rotation sign/magnitude mismatch for ${angle}.`);
  }
  if (!close(pose.relativeRotationFromFirstFrameRadians, Math.abs(angle))) {
    throw new Error(`MESH6D vertical relative rotation magnitude mismatch for ${angle}.`);
  }
}

for (const [label, frames] of [
  ['empty', []],
  ['nan', [{ frame, timestampMs: Number.NaN }]],
  ['infinity', [{ frame, timestampMs: Number.POSITIVE_INFINITY }]],
  ['duplicate', [{ frame, timestampMs: 10 }, { frame, timestampMs: 10 }]],
  ['descending', [{ frame, timestampMs: 11 }, { frame, timestampMs: 10 }]],
]) {
  expectFailure(`timestamp:${label}`, () => buildMesh6DMultiFramePoseSweepEvidence({
    frames,
    weightedRegionAdapter: adapter,
  }));
}

const incompatibleFrame = await issueFrame({
  digest: ALT_DIGEST,
  providerRunRef: 'mesh6d:incompatible-canonical-digest',
  metadataFixture,
  providerLandmarks,
  fr76,
});
expectFailure('source provenance mismatch', () => buildMesh6DMultiFramePoseSweepEvidence({
  frames: [{ frame, timestampMs: 1 }, { frame: incompatibleFrame, timestampMs: 2 }],
  weightedRegionAdapter: adapter,
}));

if (
  report.authorityBoundary.poseThresholdDefined !== false ||
  report.authorityBoundary.frontalClassificationIssued !== false ||
  report.authorityBoundary.threeQuarterClassificationIssued !== false ||
  report.authorityBoundary.captureQualityPassFailIssued !== false ||
  report.authorityBoundary.confidenceScoreIssued !== false ||
  report.authorityBoundary.productionMorphologyAuthorized !== false ||
  report.authorityBoundary.expressionNeutralityVerdictIssued !== false ||
  report.authorityBoundary.occlusionValidityVerdictIssued !== false ||
  report.authorityBoundary.claimsIssued !== 0
) throw new Error('MESH6D authority boundary widened unexpectedly.');
assertNoForbiddenAuthorityKeys(report);

process.stdout.write(`${JSON.stringify({
  status: 'MESH6D_MULTI_FRAME_POSE_SWEEP_EVIDENCE_PASS',
  sequence: report.sequence,
  adapterIdentity: report.adapterIdentity,
  poseSweep: report.poseSweep,
  morphologyRepeatability: report.morphologyRepeatability,
  identicalFramesZeroVariation: true,
  transformTranslationInvariant: true,
  signedPureRotationVerified: true,
  relativeRotationVerified: true,
  timestampFailClosedVerified: true,
  provenanceCompatibilityFailClosedVerified: true,
  authorityBoundaryVerified: true,
})}\n`);
