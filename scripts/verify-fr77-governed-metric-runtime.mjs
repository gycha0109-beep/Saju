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

const RELEASE_COMMIT = 'f8ef212d5c962c0e853db7e59d217056b187084b';
const RAW_ROOT = `https://raw.githubusercontent.com/google-ai-edge/mediapipe/${RELEASE_COMMIT}`;
const TOLERANCE = 1e-4;
const PROVIDER_LANDMARK_COUNT = 478;
const GEOMETRY_LANDMARK_COUNT = 468;
const DIGEST = `sha256:${'6'.repeat(64)}`;

const WITNESSES = Object.freeze({
  input: Object.freeze({
    path: 'mediapipe/tasks/testdata/vision/face_blendshapes_in_landmarks.prototxt',
    blobSha: 'ea2e60eefaf6a5c13aee4bb468384edab7e7d5d7',
  }),
  expected: Object.freeze({
    path: 'mediapipe/tasks/testdata/vision/face_geometry_expected_out.pbtxt',
    blobSha: 'df6eaaec358d1c0cda034db7b727bc7ce04f8a5b',
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
    headers: { 'user-agent': 'myeongha-fr77-runtime-verifier' },
  });
  if (!response.ok) {
    throw new Error(`FR77 failed to fetch ${witness.path}: HTTP ${response.status}`);
  }
  const bytes = Buffer.from(await response.arrayBuffer());
  const actualSha = gitBlobSha(bytes);
  if (actualSha !== witness.blobSha) {
    throw new Error(`FR77 Git blob SHA mismatch for ${witness.path}: expected=${witness.blobSha} actual=${actualSha}`);
  }
  return bytes.toString('utf8');
}

function numericMatches(text, expression) {
  return [...text.matchAll(expression)].map((match) => Number(match[1]));
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
      throw new Error('FR77 upstream provider fixture contains a landmark without finite XYZ.');
    }
    landmarks.push({
      x,
      y,
      z,
      ...(visibilityMatch === undefined ? {} : { visibility: Number(visibilityMatch) }),
    });
  }
  if (landmarks.length !== PROVIDER_LANDMARK_COUNT) {
    throw new Error(`FR77 expected ${PROVIDER_LANDMARK_COUNT} provider landmarks; got ${landmarks.length}.`);
  }
  return landmarks;
}

function parseExpectedFaceGeometry(text) {
  const vertexValues = numericMatches(text, /vertex_buffer:\s*([-+0-9.eE]+)/g);
  if (vertexValues.length < GEOMETRY_LANDMARK_COUNT * 5) {
    throw new Error(`FR77 expected face geometry mesh is too short: ${vertexValues.length}.`);
  }
  const metricLandmarks = Array.from({ length: GEOMETRY_LANDMARK_COUNT }, (_, index) => ({
    x: vertexValues[index * 5],
    y: vertexValues[index * 5 + 1],
    z: vertexValues[index * 5 + 2],
  }));
  const poseBlock = /pose_transform_matrix\s*\{([\s\S]*?)\n\}/.exec(text)?.[1];
  if (!poseBlock) throw new Error('FR77 expected face geometry has no pose_transform_matrix block.');
  const pose = numericMatches(poseBlock, /packed_data:\s*([-+0-9.eE]+)/g);
  if (pose.length !== 16) throw new Error(`FR77 expected pose matrix has ${pose.length} elements; expected 16.`);
  return { metricLandmarks, pose };
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

function compareScalar(actual, expected, label) {
  const error = Math.abs(actual - expected);
  if (!Number.isFinite(error) || error > TOLERANCE) {
    throw new Error(`FR77 runtime parity mismatch ${label}: actual=${actual} expected=${expected} absError=${error} tolerance=${TOLERANCE}`);
  }
  return error;
}

const [inputFixture, expectedFixture, metadataFixture] = await Promise.all([
  fetchExact(WITNESSES.input),
  fetchExact(WITNESSES.expected),
  fetchExact(WITNESSES.metadata),
]);
const providerLandmarks = parseProviderLandmarks(inputFixture);
const expected = parseExpectedFaceGeometry(expectedFixture);
const runtimeFactory = factory(providerLandmarks);

const fr61Request = {
  schemaVersion: 'fr61-production-neutral-observation-provider-request-v1',
  providerRunRef: 'fr77:exact-runtime-parity-source',
  canonicalAssetDigest: DIGEST,
  image: Object.freeze({ fixture: true }),
};
const fr66 = await runPhotoToLipsContourNeutralSurfaceFR66(fr61Request, runtimeFactory);
const fr67 = assessLipsPoseNormalizationRequirementsFR67(fr66);
const fr68 = admitMediaPipeFaceGeometryTransformSemanticsFR68(fr67);
const fr69 = admitMediaPipeWebMetricGeometryGapFR69(fr68);
const fr75 = admitMediaPipeReleaseExactMetricGeometryFR75(fr69);
const fr76 = admitMediaPipeScreenToMetricReimplementationParityFR76(fr75);

const candidate = await runGovernedMetricGeometryFR77({
  schemaVersion: 'fr77-governed-metric-geometry-runtime-request-v1',
  providerRunRef: 'fr77:exact-runtime-parity',
  canonicalAssetDigest: DIGEST,
  image: Object.freeze({ fixture: true }),
  frameWidth: 820,
  frameHeight: 1024,
  geometryMetadataPbtxt: metadataFixture,
}, fr76, runtimeFactory);
assertIssuedGovernedMetricGeometryFR77(candidate);

if (
  candidate.provider.providerLandmarkCount !== 478 ||
  candidate.provider.geometryLandmarkCount !== 468 ||
  candidate.provider.irisLandmarksExcluded !== true ||
  candidate.provider.providerDepthConsumedForMetricGeometry !== true ||
  candidate.provider.fr61ContractModified !== false ||
  candidate.coordinateFrame !== 'canonical_aligned_right_handed_metric_3d' ||
  candidate.unit !== 'centimeter' ||
  candidate.geometryProfile.exactGitBlobVerified !== true ||
  candidate.authorityBoundary.governedResearchMetricGeometryOutputAuthorized !== true ||
  candidate.authorityBoundary.productionNeutralObservationIssued !== false ||
  candidate.authorityBoundary.metricLipsGeometryIssued !== false ||
  candidate.authorityBoundary.poseNormalizedLipsGeometryIssued !== false ||
  candidate.authorityBoundary.reviewed2DProjectionRuleIssued !== false ||
  candidate.authorityBoundary.morphologyProduced !== false ||
  candidate.authorityBoundary.criterionStatesIssued !== 0 ||
  candidate.authorityBoundary.claimsIssued !== 0 ||
  candidate.authorityBoundary.traditionalSemanticAuthority !== false
) {
  throw new Error('FR77 governed authority boundary drifted during exact runtime verification.');
}

let maximumMetricError = 0;
let maximumMetricLabel = '';
for (let index = 0; index < GEOMETRY_LANDMARK_COUNT; index += 1) {
  const actualPoint = candidate.metricLandmarks[index];
  const expectedPoint = expected.metricLandmarks[index];
  for (const axis of ['x', 'y', 'z']) {
    const error = compareScalar(actualPoint[axis], expectedPoint[axis], `metric[${index}].${axis}`);
    if (error > maximumMetricError) {
      maximumMetricError = error;
      maximumMetricLabel = `metric[${index}].${axis}`;
    }
  }
}

let maximumPoseError = 0;
let maximumPoseIndex = -1;
for (let index = 0; index < 16; index += 1) {
  const error = compareScalar(
    candidate.poseTransformMatrixPackedColumnMajor[index],
    expected.pose[index],
    `pose[${index}]`,
  );
  if (error > maximumPoseError) {
    maximumPoseError = error;
    maximumPoseIndex = index;
  }
}

process.stdout.write(`${JSON.stringify({
  status: 'FR77_GOVERNED_METRIC_GEOMETRY_RUNTIME_PASS',
  releaseCommit: RELEASE_COMMIT,
  providerLandmarkCount: providerLandmarks.length,
  geometryLandmarkCount: candidate.metricLandmarks.length,
  metadataBlobSha: candidate.geometryProfile.metadataBlobSha,
  providerTolerance: TOLERANCE,
  maximumMetricError,
  maximumMetricLabel,
  maximumPoseError,
  maximumPoseIndex,
  productionNeutralObservationIssued: candidate.authorityBoundary.productionNeutralObservationIssued,
  metricLipsGeometryIssued: candidate.authorityBoundary.metricLipsGeometryIssued,
  poseNormalizedLipsGeometryIssued: candidate.authorityBoundary.poseNormalizedLipsGeometryIssued,
})}\n`);
