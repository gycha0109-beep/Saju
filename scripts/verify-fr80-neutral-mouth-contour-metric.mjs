import { Buffer } from 'node:buffer';
import { createHash } from 'node:crypto';
import process from 'node:process';

import { runPhotoToLipsContourNeutralSurfaceFR66 } from '../.face-reading-dist/lips-contour-neutral-surface-fr66.js';
import { assessLipsPoseNormalizationRequirementsFR67 } from '../.face-reading-dist/lips-pose-normalization-requirements-fr67.js';
import { admitMediaPipeFaceGeometryTransformSemanticsFR68 } from '../.face-reading-dist/mediapipe-face-geometry-transform-semantics-fr68.js';
import { admitMediaPipeWebMetricGeometryGapFR69 } from '../.face-reading-dist/mediapipe-web-metric-geometry-gap-fr69.js';
import { admitMediaPipeReleaseExactMetricGeometryFR75 } from '../.face-reading-dist/mediapipe-release-exact-metric-geometry-admission-fr75.js';
import { admitMediaPipeScreenToMetricReimplementationParityFR76 } from '../.face-reading-dist/mediapipe-screen-to-metric-reimplementation-parity-fr76.js';
import {
  assertIssuedGovernedMetricGeometryFR77,
  runGovernedMetricGeometryFR77,
} from '../.face-reading-dist/governed-metric-geometry-runtime-fr77.js';
import {
  assertIssuedGovernedMetricLipsSurfaceFR78,
  projectIssuedGovernedMetricGeometryToLipsSurfaceFR78,
} from '../.face-reading-dist/governed-metric-lips-surface-fr78.js';
import {
  assertIssuedPoseNormalizedLipsGeometryFR79,
  projectMetricLipsSurfaceToPoseNormalized2DFR79,
} from '../.face-reading-dist/pose-normalized-lips-geometry-fr79.js';
import {
  assertIssuedNeutralMouthContourMetricFR80,
  computeNeutralMouthContourMetricFR80,
  getNeutralMouthContourMetricDefinitionFR80,
} from '../.face-reading-dist/neutral-mouth-contour-metric-fr80.js';

const RELEASE_COMMIT = 'f8ef212d5c962c0e853db7e59d217056b187084b';
const RAW_ROOT = `https://raw.githubusercontent.com/google-ai-edge/mediapipe/${RELEASE_COMMIT}`;
const PROVIDER_LANDMARK_COUNT = 478;
const DIGEST = `sha256:${'b'.repeat(64)}`;
const TOLERANCE = 1e-12;

const WITNESSES = Object.freeze({
  input: Object.freeze({
    path: 'mediapipe/tasks/testdata/vision/face_blendshapes_in_landmarks.prototxt',
    blobSha: 'ea2e60eefaf6a5c13aee4bb468384edab7e7d5d7',
  }),
  metadata: Object.freeze({
    path: 'mediapipe/tasks/cc/vision/face_geometry/data/geometry_pipeline_metadata_landmarks.pbtxt',
    blobSha: '252a7b05b24c5c43c5b94179393639f7c9a2fe8f',
  }),
  alignment: Object.freeze({
    path: 'mediapipe/tasks/cc/vision/face_geometry/libs/geometry_pipeline.cc',
    blobSha: '53c880bd5da524749c755acf9fc69dafe9cc49ef',
  }),
});

function gitBlobSha(bytes) {
  const prefix = Buffer.from(`blob ${bytes.length}\0`, 'utf8');
  return createHash('sha1').update(prefix).update(bytes).digest('hex');
}

async function fetchExact(witness) {
  const response = await globalThis.fetch(`${RAW_ROOT}/${witness.path}`, {
    headers: { 'user-agent': 'myeongha-fr80-neutral-mouth-metric-verifier' },
  });
  if (!response.ok) throw new Error(`FR80 failed to fetch ${witness.path}: HTTP ${response.status}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  const actualSha = gitBlobSha(bytes);
  if (actualSha !== witness.blobSha) {
    throw new Error(`FR80 Git blob SHA mismatch for ${witness.path}: expected=${witness.blobSha} actual=${actualSha}`);
  }
  return bytes.toString('utf8');
}

function parseProviderLandmarks(text) {
  const landmarks = [];
  for (const match of text.matchAll(/landmark\s*\{([\s\S]*?)\}/g)) {
    const block = match[1];
    const x = Number(/\bx:\s*([-+0-9.eE]+)/.exec(block)?.[1]);
    const y = Number(/\by:\s*([-+0-9.eE]+)/.exec(block)?.[1]);
    const z = Number(/\bz:\s*([-+0-9.eE]+)/.exec(block)?.[1]);
    const visibilityMatch = /\bvisibility:\s*([-+0-9.eE]+)/.exec(block)?.[1];
    if (![x, y, z].every(Number.isFinite)) {
      throw new Error('FR80 exact provider fixture contains a landmark without finite XYZ.');
    }
    landmarks.push({
      x,
      y,
      z,
      ...(visibilityMatch === undefined ? {} : { visibility: Number(visibilityMatch) }),
    });
  }
  if (landmarks.length !== PROVIDER_LANDMARK_COUNT) {
    throw new Error(`FR80 expected ${PROVIDER_LANDMARK_COUNT} provider landmarks; got ${landmarks.length}.`);
  }
  return landmarks;
}

function factory(providerLandmarks) {
  return {
    async create() {
      return {
        detect() {
          return {
            faceLandmarks: [providerLandmarks],
            faceBlendshapes: [],
            facialTransformationMatrixes: [],
          };
        },
        close() {},
      };
    },
  };
}

const [inputFixture, metadataFixture, alignmentSource] = await Promise.all([
  fetchExact(WITNESSES.input),
  fetchExact(WITNESSES.metadata),
  fetchExact(WITNESSES.alignment),
]);
if (!alignmentSource.includes('Multiply each of the metric landmarks by the inverse pose') ||
    !alignmentSource.includes('the canonical metric face landmarks')) {
  throw new Error('FR80 alignment witness no longer proves canonical inverse-pose alignment.');
}

const providerLandmarks = parseProviderLandmarks(inputFixture);
const runtimeFactory = factory(providerLandmarks);
const fr61Request = {
  schemaVersion: 'fr61-production-neutral-observation-provider-request-v1',
  providerRunRef: 'fr80:exact-runtime-source',
  canonicalAssetDigest: DIGEST,
  image: Object.freeze({ fixture: true }),
};
const fr66 = await runPhotoToLipsContourNeutralSurfaceFR66(fr61Request, runtimeFactory);
const fr67 = assessLipsPoseNormalizationRequirementsFR67(fr66);
const fr68 = admitMediaPipeFaceGeometryTransformSemanticsFR68(fr67);
const fr69 = admitMediaPipeWebMetricGeometryGapFR69(fr68);
const fr75 = admitMediaPipeReleaseExactMetricGeometryFR75(fr69);
const fr76 = admitMediaPipeScreenToMetricReimplementationParityFR76(fr75);
const fr77 = await runGovernedMetricGeometryFR77({
  schemaVersion: 'fr77-governed-metric-geometry-runtime-request-v1',
  providerRunRef: 'fr80:exact-runtime-metric-source',
  canonicalAssetDigest: DIGEST,
  image: Object.freeze({ fixture: true }),
  frameWidth: 820,
  frameHeight: 1024,
  geometryMetadataPbtxt: metadataFixture,
}, fr76, runtimeFactory);
assertIssuedGovernedMetricGeometryFR77(fr77);
const fr78 = projectIssuedGovernedMetricGeometryToLipsSurfaceFR78(fr77);
assertIssuedGovernedMetricLipsSurfaceFR78(fr78);
const fr79 = projectMetricLipsSurfaceToPoseNormalized2DFR79(fr78);
assertIssuedPoseNormalizedLipsGeometryFR79(fr79);

const definition = getNeutralMouthContourMetricDefinitionFR80();
if (
  definition.metricRef !== 'neutral.mouth.contour_set.bounding_box_aspect_ratio@0.1.0' ||
  definition.coordinateFrame !== 'pose_normalized_face_2d' ||
  definition.unit !== 'ratio' ||
  definition.requiredGeometry !== 'two_unordered_pose_normalized_lips_contours' ||
  definition.outerInnerAnatomicalRoleRequired !== false ||
  definition.providerComponentOrderRequired !== false ||
  definition.absoluteWidthHeightIssued !== false ||
  definition.physicalAnthropometricInterpretationAllowed !== false ||
  definition.traditionalCriterionBindingRef !== null ||
  definition.calibrationRef !== null
) throw new Error('FR80 metric definition authority drift.');

const allPoints = fr79.contours.flatMap((contour) => contour.geometry.boundary);
const xs = allPoints.map((point) => point.x);
const ys = allPoints.map((point) => point.y);
const expectedWidth = Math.max(...xs) - Math.min(...xs);
const expectedHeight = Math.max(...ys) - Math.min(...ys);
if (expectedWidth <= 0 || expectedHeight <= 0) {
  throw new Error(`FR80 exact source has degenerate union bounds width=${expectedWidth} height=${expectedHeight}.`);
}
const expectedRatio = expectedWidth / expectedHeight;

const fr80 = computeNeutralMouthContourMetricFR80(fr79);
assertIssuedNeutralMouthContourMetricFR80(fr80);
const absoluteError = Math.abs(fr80.metric.value - expectedRatio);
if (!Number.isFinite(absoluteError) || absoluteError > TOLERANCE) {
  throw new Error(`FR80 aspect-ratio mismatch actual=${fr80.metric.value} expected=${expectedRatio} error=${absoluteError}.`);
}
if (
  fr80.metric.metricRef !== definition.metricRef ||
  fr80.metric.unit !== 'ratio' ||
  fr80.metric.coordinateFrame !== 'pose_normalized_face_2d' ||
  fr80.metric.poseCompensated !== true ||
  fr80.metric.classificationApplied !== false ||
  fr80.metric.calibrationApplied !== false ||
  fr80.metric.traditionalBindingApplied !== false ||
  fr80.neutralMetricDefinitionsIssued !== 1 ||
  fr80.neutralMetricValuesIssued !== 1 ||
  fr80.absoluteMouthDimensionsIssued !== 0 ||
  fr80.outerInnerLipRolesIssued !== false ||
  fr80.morphologyProduced !== false ||
  fr80.criterionStatesIssued !== 0 ||
  fr80.claimsIssued !== 0 ||
  fr80.traditionalMetricBindingReviewed !== false ||
  fr80.traditionalSemanticAuthority !== false
) throw new Error('FR80 neutral metric output authority drift.');
if (
  fr80.authorityBoundary.absoluteMouthDimensionIssuanceAllowed !== false ||
  fr80.authorityBoundary.physicalAnthropometricInterpretationAllowed !== false ||
  fr80.authorityBoundary.traditionalCriterionMetricBindingAllowed !== false ||
  fr80.authorityBoundary.calibrationApplicationAllowed !== false ||
  fr80.authorityBoundary.criterionStateIssuanceAllowed !== false ||
  fr80.authorityBoundary.claimIssuanceAllowed !== false
) throw new Error('FR80 authority boundary widened unexpectedly.');

const serialized = JSON.stringify(fr80);
for (const forbiddenField of ['widthCm', 'heightCm', 'outerLip', 'innerLip', 'criterionState', 'claimText']) {
  if (serialized.includes(`\"${forbiddenField}\"`)) {
    throw new Error(`FR80 output exposed forbidden field ${forbiddenField}.`);
  }
}

process.stdout.write(`${JSON.stringify({
  status: 'FR80_NEUTRAL_MOUTH_CONTOUR_METRIC_PASS',
  releaseCommit: RELEASE_COMMIT,
  alignmentBlobSha: WITNESSES.alignment.blobSha,
  metricRef: fr80.metric.metricRef,
  value: fr80.metric.value,
  expectedRatio,
  absoluteError,
  tolerance: TOLERANCE,
  neutralMetricDefinitionsIssued: fr80.neutralMetricDefinitionsIssued,
  neutralMetricValuesIssued: fr80.neutralMetricValuesIssued,
  absoluteMouthDimensionsIssued: fr80.absoluteMouthDimensionsIssued,
  outerInnerLipRolesIssued: fr80.outerInnerLipRolesIssued,
  morphologyProduced: fr80.morphologyProduced,
  criterionStatesIssued: fr80.criterionStatesIssued,
  claimsIssued: fr80.claimsIssued,
  traditionalMetricBindingReviewed: fr80.traditionalMetricBindingReviewed,
  traditionalSemanticAuthority: fr80.traditionalSemanticAuthority,
})}\n`);
