import { Buffer } from 'node:buffer';
import { createHash } from 'node:crypto';
import process from 'node:process';

import { orderClosedCycleProviderVerticesFR16 } from '../.face-reading-dist/provider-adapter-evidence-fr16.js';
import { FR65_MEDIAPIPE_LIPS_RELEASE_EDGES } from '../.face-reading-dist/mediapipe-lips-topology-admission-fr65.js';
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
  assessGovernedMetricLipsSurfaceReadinessFR78,
  projectIssuedGovernedMetricGeometryToLipsSurfaceFR78,
} from '../.face-reading-dist/governed-metric-lips-surface-fr78.js';

const RELEASE_COMMIT = 'f8ef212d5c962c0e853db7e59d217056b187084b';
const RAW_ROOT = `https://raw.githubusercontent.com/google-ai-edge/mediapipe/${RELEASE_COMMIT}`;
const TOLERANCE = 1e-4;
const PROVIDER_LANDMARK_COUNT = 478;
const GEOMETRY_LANDMARK_COUNT = 468;
const DIGEST = `sha256:${'8'.repeat(64)}`;

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
  topology: Object.freeze({
    path: 'mediapipe/tasks/web/vision/face_landmarker/face_landmarks_connections.ts',
    blobSha: '644de9d8c7cd90880d92b2393b4913fa93ace927',
  }),
});

function gitBlobSha(bytes) {
  const prefix = Buffer.from(`blob ${bytes.length}\0`, 'utf8');
  return createHash('sha1').update(prefix).update(bytes).digest('hex');
}

async function fetchExact(witness) {
  const response = await globalThis.fetch(`${RAW_ROOT}/${witness.path}`, {
    headers: { 'user-agent': 'myeongha-fr78-metric-lips-verifier' },
  });
  if (!response.ok) {
    throw new Error(`FR78 failed to fetch ${witness.path}: HTTP ${response.status}`);
  }
  const bytes = Buffer.from(await response.arrayBuffer());
  const actualSha = gitBlobSha(bytes);
  if (actualSha !== witness.blobSha) {
    throw new Error(`FR78 Git blob SHA mismatch for ${witness.path}: expected=${witness.blobSha} actual=${actualSha}`);
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
      throw new Error('FR78 upstream provider fixture contains a landmark without finite XYZ.');
    }
    landmarks.push({
      x,
      y,
      z,
      ...(visibilityMatch === undefined ? {} : { visibility: Number(visibilityMatch) }),
    });
  }
  if (landmarks.length !== PROVIDER_LANDMARK_COUNT) {
    throw new Error(`FR78 expected ${PROVIDER_LANDMARK_COUNT} provider landmarks; got ${landmarks.length}.`);
  }
  return landmarks;
}

function parseExpectedMetricLandmarks(text) {
  const vertexValues = numericMatches(text, /vertex_buffer:\s*([-+0-9.eE]+)/g);
  if (vertexValues.length < GEOMETRY_LANDMARK_COUNT * 5) {
    throw new Error(`FR78 expected face geometry mesh is too short: ${vertexValues.length}.`);
  }
  return Array.from({ length: GEOMETRY_LANDMARK_COUNT }, (_, index) => ({
    x: vertexValues[index * 5],
    y: vertexValues[index * 5 + 1],
    z: vertexValues[index * 5 + 2],
  }));
}

function parseUpstreamLipsEdges(text) {
  const block = /export const FACE_LANDMARKS_LIPS\s*=\s*convertToConnections\(([\s\S]*?)\);/.exec(text)?.[1];
  if (block === undefined) throw new Error('FR78 upstream topology source has no FACE_LANDMARKS_LIPS declaration.');
  const edges = [...block.matchAll(/\[(\d+)\s*,\s*(\d+)\]/g)].map((match) => ({
    start: Number(match[1]),
    end: Number(match[2]),
  }));
  if (edges.length !== 40) throw new Error(`FR78 upstream lips topology has ${edges.length} edges; expected 40.`);
  return edges;
}

function connectedComponents(edges) {
  const adjacency = new Map();
  for (const edge of edges) {
    const left = adjacency.get(edge.start) ?? new Set();
    left.add(edge.end);
    adjacency.set(edge.start, left);
    const right = adjacency.get(edge.end) ?? new Set();
    right.add(edge.start);
    adjacency.set(edge.end, right);
  }
  const remaining = new Set(adjacency.keys());
  const vertexComponents = [];
  while (remaining.size > 0) {
    const seed = Math.min(...remaining);
    const stack = [seed];
    const vertices = [];
    remaining.delete(seed);
    while (stack.length > 0) {
      const vertex = stack.pop();
      vertices.push(vertex);
      for (const neighbor of adjacency.get(vertex) ?? []) {
        if (remaining.delete(neighbor)) stack.push(neighbor);
      }
    }
    vertices.sort((left, right) => left - right);
    vertexComponents.push(vertices);
  }
  vertexComponents.sort((left, right) => left[0] - right[0]);
  return vertexComponents.map((vertices) => {
    const set = new Set(vertices);
    return edges.filter((edge) => set.has(edge.start) && set.has(edge.end));
  });
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
    throw new Error(`FR78 metric lips mismatch ${label}: actual=${actual} expected=${expected} absError=${error} tolerance=${TOLERANCE}`);
  }
  return error;
}

const [inputFixture, expectedFixture, metadataFixture, topologyFixture] = await Promise.all([
  fetchExact(WITNESSES.input),
  fetchExact(WITNESSES.expected),
  fetchExact(WITNESSES.metadata),
  fetchExact(WITNESSES.topology),
]);

const upstreamEdges = parseUpstreamLipsEdges(topologyFixture);
if (FR65_MEDIAPIPE_LIPS_RELEASE_EDGES.length !== upstreamEdges.length) {
  throw new Error('FR78 in-repo lips topology edge count differs from exact upstream source.');
}
for (let index = 0; index < upstreamEdges.length; index += 1) {
  const expectedEdge = upstreamEdges[index];
  const actualEdge = FR65_MEDIAPIPE_LIPS_RELEASE_EDGES[index];
  if (actualEdge.start !== expectedEdge.start || actualEdge.end !== expectedEdge.end) {
    throw new Error(`FR78 in-repo lips topology drift at edge ${index}.`);
  }
}

const providerLandmarks = parseProviderLandmarks(inputFixture);
const expectedMetricLandmarks = parseExpectedMetricLandmarks(expectedFixture);
const runtimeFactory = factory(providerLandmarks);
const fr61Request = {
  schemaVersion: 'fr61-production-neutral-observation-provider-request-v1',
  providerRunRef: 'fr78:exact-runtime-source',
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
  providerRunRef: 'fr78:exact-runtime-metric-source',
  canonicalAssetDigest: DIGEST,
  image: Object.freeze({ fixture: true }),
  frameWidth: 820,
  frameHeight: 1024,
  geometryMetadataPbtxt: metadataFixture,
}, fr76, runtimeFactory);
assertIssuedGovernedMetricGeometryFR77(fr77);

const readiness = assessGovernedMetricLipsSurfaceReadinessFR78();
if (
  readiness.sourceWitness.sourceBlobSha !== WITNESSES.topology.blobSha ||
  readiness.geometryLandmarkCount !== 468 ||
  readiness.contourCount !== 2 ||
  readiness.contourPointCounts[0] !== 20 ||
  readiness.contourPointCounts[1] !== 20 ||
  readiness.metricLipsGeometryProjectionAuthorized !== true ||
  readiness.providerVertexIndexOutputAllowed !== false ||
  readiness.outerInnerAnatomicalAssignmentAllowed !== false ||
  readiness.poseNormalized2DProjectionAuthorized !== false ||
  readiness.neutralMetricIssuanceAllowed !== false ||
  readiness.traditionalOperationalizationAllowed !== false
) {
  throw new Error('FR78 readiness authority or release witness drift.');
}

const surface = projectIssuedGovernedMetricGeometryToLipsSurfaceFR78(fr77);
assertIssuedGovernedMetricLipsSurfaceFR78(surface);
if (
  surface.coordinateFrame !== 'canonical_aligned_right_handed_metric_3d' ||
  surface.unit !== 'centimeter' ||
  surface.contourCount !== 2 ||
  surface.contours.length !== 2 ||
  surface.contourConsumptionState !== 'unordered_set_no_outer_inner_role' ||
  surface.metricLipsGeometryIssued !== true ||
  surface.canonicalAlignedMetric3DSurfaceIssued !== true ||
  surface.poseNormalizedLipsGeometryIssued !== false ||
  surface.reviewed2DProjectionRuleIssued !== false ||
  surface.neutralMetricDefinitionsIssued !== 0 ||
  surface.neutralMetricValuesIssued !== 0 ||
  surface.morphologyProduced !== false ||
  surface.criterionStatesIssued !== 0 ||
  surface.claimsIssued !== 0 ||
  surface.traditionalSemanticAuthority !== false ||
  surface.authorityBoundary.productionNeutralObservationIssued !== false ||
  surface.authorityBoundary.outerInnerAnatomicalAssignmentAllowed !== false ||
  surface.authorityBoundary.providerVertexIndexOutputAllowed !== false ||
  surface.authorityBoundary.poseNormalized2DIssuanceAllowed !== false ||
  surface.authorityBoundary.neutralMetricIssuanceAllowed !== false ||
  surface.source.providerTopologySourceBlobSha !== WITNESSES.topology.blobSha
) {
  throw new Error('FR78 governed metric lips surface authority drift.');
}

const components = connectedComponents(FR65_MEDIAPIPE_LIPS_RELEASE_EDGES);
if (components.length !== 2) throw new Error(`FR78 expected 2 topology components; got ${components.length}.`);
let maximumLipsMetricError = 0;
let maximumLipsMetricLabel = '';
for (let componentIndex = 0; componentIndex < components.length; componentIndex += 1) {
  const vertices = orderClosedCycleProviderVerticesFR16(components[componentIndex]);
  const contour = surface.contours[componentIndex];
  if (vertices.length !== 20 || contour.geometry.boundary.length !== 20) {
    throw new Error(`FR78 component ${componentIndex} must remain exactly 20 points.`);
  }
  if (
    contour.anatomicalRole !== null ||
    contour.traditionalRole !== null ||
    contour.sourceComponentAuthority !== 'unordered_provider_graph_component_only'
  ) throw new Error(`FR78 component ${componentIndex} semantic-role boundary drift.`);
  for (let pointIndex = 0; pointIndex < vertices.length; pointIndex += 1) {
    const vertex = vertices[pointIndex];
    const actualPoint = contour.geometry.boundary[pointIndex];
    const expectedPoint = expectedMetricLandmarks[vertex];
    if (Object.keys(actualPoint).some((key) => !['x', 'y', 'z'].includes(key))) {
      throw new Error(`FR78 contour ${componentIndex} point ${pointIndex} exposed an unauthorized field.`);
    }
    for (const axis of ['x', 'y', 'z']) {
      const error = compareScalar(
        actualPoint[axis],
        expectedPoint[axis],
        `component[${componentIndex}].point[${pointIndex}].${axis}`,
      );
      if (error > maximumLipsMetricError) {
        maximumLipsMetricError = error;
        maximumLipsMetricLabel = `component[${componentIndex}].point[${pointIndex}].${axis}`;
      }
    }
  }
}

const serializedSurface = JSON.stringify(surface);
if (serializedSurface.includes('providerGraphComponentOrdinal') || serializedSurface.includes('providerVertexIndices')) {
  throw new Error('FR78 surface exposed provider ordering/index internals.');
}

process.stdout.write(`${JSON.stringify({
  status: 'FR78_GOVERNED_METRIC_LIPS_SURFACE_PASS',
  releaseCommit: RELEASE_COMMIT,
  topologyBlobSha: WITNESSES.topology.blobSha,
  metadataBlobSha: WITNESSES.metadata.blobSha,
  geometryLandmarkCount: fr77.metricLandmarks.length,
  contourCount: surface.contours.length,
  contourPointCounts: surface.contours.map((contour) => contour.geometry.boundary.length),
  tolerance: TOLERANCE,
  maximumLipsMetricError,
  maximumLipsMetricLabel,
  metricLipsGeometryIssued: surface.metricLipsGeometryIssued,
  poseNormalizedLipsGeometryIssued: surface.poseNormalizedLipsGeometryIssued,
  neutralMetricDefinitionsIssued: surface.neutralMetricDefinitionsIssued,
  morphologyProduced: surface.morphologyProduced,
  criterionStatesIssued: surface.criterionStatesIssued,
  claimsIssued: surface.claimsIssued,
  traditionalSemanticAuthority: surface.traditionalSemanticAuthority,
})}\n`);
