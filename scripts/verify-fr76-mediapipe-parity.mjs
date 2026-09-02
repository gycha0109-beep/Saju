import { createHash } from 'node:crypto';

import { reimplementMediaPipeScreenToMetricFR76 } from '../.face-reading-dist/mediapipe-screen-to-metric-reimplementation-parity-fr76.js';

const RELEASE_COMMIT = 'f8ef212d5c962c0e853db7e59d217056b187084b';
const RAW_ROOT = `https://raw.githubusercontent.com/google-ai-edge/mediapipe/${RELEASE_COMMIT}`;
const TOLERANCE = 1e-4;
const LANDMARK_COUNT = 468;

const WITNESSES = Object.freeze({
  test: Object.freeze({
    path: 'mediapipe/tasks/cc/vision/face_geometry/face_geometry_from_landmarks_graph_test.cc',
    blobSha: '7fa79c5a6524e7907c4c69c4077b4e4d9d98ca96',
  }),
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
  const response = await fetch(`${RAW_ROOT}/${witness.path}`, {
    headers: { 'user-agent': 'myeongha-fr76-parity-verifier' },
  });
  if (!response.ok) {
    throw new Error(`FR76 failed to fetch ${witness.path}: HTTP ${response.status}`);
  }
  const bytes = Buffer.from(await response.arrayBuffer());
  const actualSha = gitBlobSha(bytes);
  if (actualSha !== witness.blobSha) {
    throw new Error(`FR76 Git blob SHA mismatch for ${witness.path}: expected=${witness.blobSha} actual=${actualSha}`);
  }
  return bytes.toString('utf8');
}

function numericMatches(text, expression) {
  return [...text.matchAll(expression)].map((match) => Number(match[1]));
}

function parseMetadata(text) {
  const weights = Array.from({ length: LANDMARK_COUNT }, () => 0);
  const basisPattern = /procrustes_landmark_basis\s*\{\s*landmark_id:\s*(\d+)\s*weight:\s*([-+0-9.eE]+)\s*\}/g;
  let basisCount = 0;
  for (const match of text.matchAll(basisPattern)) {
    const landmarkId = Number(match[1]);
    const weight = Number(match[2]);
    if (!Number.isInteger(landmarkId) || landmarkId < 0 || landmarkId >= LANDMARK_COUNT || !Number.isFinite(weight) || weight < 0) {
      throw new Error(`FR76 invalid Procrustes basis entry: ${match[0]}`);
    }
    weights[landmarkId] = weight;
    basisCount += 1;
  }
  if (basisCount !== 33) {
    throw new Error(`FR76 expected 33 non-zero Procrustes basis entries; got ${basisCount}`);
  }

  const vertexValues = numericMatches(text, /vertex_buffer:\s*([-+0-9.eE]+)/g);
  if (vertexValues.length < LANDMARK_COUNT * 5) {
    throw new Error(`FR76 metadata canonical mesh is too short: ${vertexValues.length} vertex values`);
  }
  const canonicalMetricLandmarks = Array.from({ length: LANDMARK_COUNT }, (_, index) => ({
    x: vertexValues[index * 5],
    y: vertexValues[index * 5 + 1],
    z: vertexValues[index * 5 + 2],
  }));
  return { weights, canonicalMetricLandmarks };
}

function parseLandmarks(text) {
  const landmarks = [];
  for (const match of text.matchAll(/landmark\s*\{([\s\S]*?)\}/g)) {
    const block = match[1];
    const x = Number(/\bx:\s*([-+0-9.eE]+)/.exec(block)?.[1]);
    const y = Number(/\by:\s*([-+0-9.eE]+)/.exec(block)?.[1]);
    const z = Number(/\bz:\s*([-+0-9.eE]+)/.exec(block)?.[1]);
    if (![x, y, z].every(Number.isFinite)) {
      throw new Error('FR76 input fixture contains a landmark without finite full XYZ coordinates.');
    }
    landmarks.push({ x, y, z });
  }
  if (landmarks.length < LANDMARK_COUNT) {
    throw new Error(`FR76 input fixture contains ${landmarks.length} landmarks; expected at least ${LANDMARK_COUNT}.`);
  }
  return landmarks.slice(0, LANDMARK_COUNT);
}

function parseExpectedFaceGeometry(text) {
  const vertexValues = numericMatches(text, /vertex_buffer:\s*([-+0-9.eE]+)/g);
  if (vertexValues.length < LANDMARK_COUNT * 5) {
    throw new Error(`FR76 expected face geometry mesh is too short: ${vertexValues.length} vertex values`);
  }
  const metricLandmarks = Array.from({ length: LANDMARK_COUNT }, (_, index) => ({
    x: vertexValues[index * 5],
    y: vertexValues[index * 5 + 1],
    z: vertexValues[index * 5 + 2],
  }));
  const poseBlock = /pose_transform_matrix\s*\{([\s\S]*?)\n\}/.exec(text)?.[1];
  if (!poseBlock) {
    throw new Error('FR76 expected face geometry has no pose_transform_matrix block.');
  }
  const pose = numericMatches(poseBlock, /packed_data:\s*([-+0-9.eE]+)/g);
  if (pose.length !== 16) {
    throw new Error(`FR76 expected pose matrix has ${pose.length} elements; expected 16.`);
  }
  return { metricLandmarks, pose };
}

function verifyUpstreamTestContract(text) {
  const requiredFragments = [
    'face_blendshapes_in_landmarks.prototxt',
    'face_geometry_expected_out.pbtxt',
    'geometry_pipeline_metadata_landmarks.binarypb',
    'std::make_pair(820, 1024)',
    '1e-4',
  ];
  for (const fragment of requiredFragments) {
    if (!text.includes(fragment)) {
      throw new Error(`FR76 upstream test contract drift: missing ${fragment}`);
    }
  }
}

function compareScalar(actual, expected, label) {
  const error = Math.abs(actual - expected);
  if (!Number.isFinite(error) || error > TOLERANCE) {
    throw new Error(`FR76 parity mismatch ${label}: actual=${actual} expected=${expected} absError=${error} tolerance=${TOLERANCE}`);
  }
  return error;
}

const [testSource, inputFixture, expectedFixture, metadataFixture] = await Promise.all([
  fetchExact(WITNESSES.test),
  fetchExact(WITNESSES.input),
  fetchExact(WITNESSES.expected),
  fetchExact(WITNESSES.metadata),
]);

verifyUpstreamTestContract(testSource);
const { weights, canonicalMetricLandmarks } = parseMetadata(metadataFixture);
const screenLandmarks = parseLandmarks(inputFixture);
const expected = parseExpectedFaceGeometry(expectedFixture);

const actual = reimplementMediaPipeScreenToMetricFR76({
  screenLandmarks,
  canonicalMetricLandmarks,
  landmarkWeights: weights,
  frameWidth: 820,
  frameHeight: 1024,
});

if (actual.metricLandmarks.length !== LANDMARK_COUNT) {
  throw new Error(`FR76 implementation returned ${actual.metricLandmarks.length} metric landmarks; expected ${LANDMARK_COUNT}.`);
}

let maximumMetricError = 0;
let maximumMetricLabel = '';
for (let index = 0; index < LANDMARK_COUNT; index += 1) {
  const actualPoint = actual.metricLandmarks[index];
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
    actual.poseTransformMatrixPackedColumnMajor[index],
    expected.pose[index],
    `pose[${index}]`,
  );
  if (error > maximumPoseError) {
    maximumPoseError = error;
    maximumPoseIndex = index;
  }
}

console.log(JSON.stringify({
  status: 'FR76_MEDIAPIPE_V0_10_35_SCREEN_TO_METRIC_PARITY_PASS',
  releaseCommit: RELEASE_COMMIT,
  geometryLandmarkCount: LANDMARK_COUNT,
  providerTolerance: TOLERANCE,
  maximumMetricError,
  maximumMetricLabel,
  maximumPoseError,
  maximumPoseIndex,
  firstIterationScale: actual.firstIterationScale,
  secondIterationScale: actual.secondIterationScale,
  totalScale: actual.totalScale,
}));
