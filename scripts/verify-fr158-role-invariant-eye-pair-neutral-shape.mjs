import { Buffer } from 'node:buffer';
import { createHash } from 'node:crypto';
import process from 'node:process';

import {
  FR24_EYE_TOPOLOGY_SERIALIZATION_ORDER,
  FR24_EYE_TOPOLOGY_WITNESS_EDGES,
} from '../.face-reading-dist/face-eye-pair-research-bridge-fr24.js';
import { runPhotoToLipsContourNeutralSurfaceFR66 } from '../.face-reading-dist/lips-contour-neutral-surface-fr66.js';
import { assessLipsPoseNormalizationRequirementsFR67 } from '../.face-reading-dist/lips-pose-normalization-requirements-fr67.js';
import { admitMediaPipeFaceGeometryTransformSemanticsFR68 } from '../.face-reading-dist/mediapipe-face-geometry-transform-semantics-fr68.js';
import { admitMediaPipeWebMetricGeometryGapFR69 } from '../.face-reading-dist/mediapipe-web-metric-geometry-gap-fr69.js';
import { admitMediaPipeReleaseExactMetricGeometryFR75 } from '../.face-reading-dist/mediapipe-release-exact-metric-geometry-admission-fr75.js';
import { admitMediaPipeScreenToMetricReimplementationParityFR76 } from '../.face-reading-dist/mediapipe-screen-to-metric-reimplementation-parity-fr76.js';
import { runGovernedMetricGeometryFR77 } from '../.face-reading-dist/governed-metric-geometry-runtime-fr77.js';
import { orderClosedCycleProviderVerticesFR16 } from '../.face-reading-dist/provider-adapter-evidence-fr16.js';
import {
  assertIssuedRoleInvariantEyePairNeutralShapeMetricsFR158,
  computeRoleInvariantEyePairNeutralShapeMetricsFR158,
} from '../.face-reading-dist/role-invariant-eye-pair-neutral-shape-metric-runtime-fr158.js';

const RELEASE_COMMIT = 'f8ef212d5c962c0e853db7e59d217056b187084b';
const RAW_ROOT = `https://raw.githubusercontent.com/google-ai-edge/mediapipe/${RELEASE_COMMIT}`;
const PROVIDER_LANDMARK_COUNT = 478;
const DIGEST = `sha256:${'8'.repeat(64)}`;
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
    headers: { 'user-agent': 'myeongha-fr158-eye-pair-metric-3d-verifier' },
  });
  if (!response.ok) throw new Error(`FR158 failed to fetch ${witness.path}: HTTP ${response.status}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  const actualSha = gitBlobSha(bytes);
  if (actualSha !== witness.blobSha) {
    throw new Error(`FR158 Git blob SHA mismatch for ${witness.path}: expected=${witness.blobSha} actual=${actualSha}`);
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
      throw new Error('FR158 exact provider fixture contains a landmark without finite XYZ.');
    }
    landmarks.push({
      x,
      y,
      z,
      ...(visibilityMatch === undefined ? {} : { visibility: Number(visibilityMatch) }),
    });
  }
  if (landmarks.length !== PROVIDER_LANDMARK_COUNT) {
    throw new Error(`FR158 expected ${PROVIDER_LANDMARK_COUNT} provider landmarks; got ${landmarks.length}.`);
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

function directMetricValues(fr77) {
  const vertexSets = FR24_EYE_TOPOLOGY_SERIALIZATION_ORDER.map((symbol) =>
    orderClosedCycleProviderVerticesFR16(FR24_EYE_TOPOLOGY_WITNESS_EDGES[symbol]));
  if (vertexSets.length !== 2 || vertexSets.some((cycle) => cycle.length !== 16)) {
    throw new Error('FR158 direct verifier requires exactly two 16-point FR24 eye topology cycles.');
  }
  const cycles = vertexSets.map((vertices) => vertices.map((vertex) => fr77.metricLandmarks[vertex]));
  const meshXs = fr77.metricLandmarks.map((point) => point.x);
  const meshXSpan = Math.max(...meshXs) - Math.min(...meshXs);
  if (!(meshXSpan > 0)) throw new Error('FR158 direct verifier requires a positive full-mesh X span.');

  function centroid(points) {
    const sum = points.reduce((accumulator, point) => ({
      x: accumulator.x + point.x,
      y: accumulator.y + point.y,
      z: accumulator.z + point.z,
    }), { x: 0, y: 0, z: 0 });
    return { x: sum.x / points.length, y: sum.y / points.length, z: sum.z / points.length };
  }

  function cycleStats(points) {
    const xs = points.map((point) => point.x);
    let perimeter = 0;
    let turnSum = 0;
    for (let index = 0; index < points.length; index += 1) {
      const previous = points[(index - 1 + points.length) % points.length];
      const current = points[index];
      const next = points[(index + 1) % points.length];
      const inVector = {
        x: current.x - previous.x,
        y: current.y - previous.y,
        z: current.z - previous.z,
      };
      const outVector = {
        x: next.x - current.x,
        y: next.y - current.y,
        z: next.z - current.z,
      };
      const inLength = Math.hypot(inVector.x, inVector.y, inVector.z);
      const outLength = Math.hypot(outVector.x, outVector.y, outVector.z);
      perimeter += outLength;
      const cosine = Math.max(-1, Math.min(1,
        ((inVector.x * outVector.x) + (inVector.y * outVector.y) + (inVector.z * outVector.z)) /
          (inLength * outLength),
      ));
      turnSum += Math.acos(cosine);
    }
    return {
      xSpan: Math.max(...xs) - Math.min(...xs),
      perimeter,
      meanTurningAngle: turnSum / points.length,
      centroid: centroid(points),
    };
  }

  const stats = cycles.map(cycleStats);
  const centroidDistance = Math.hypot(
    stats[0].centroid.x - stats[1].centroid.x,
    stats[0].centroid.y - stats[1].centroid.y,
    stats[0].centroid.z - stats[1].centroid.z,
  );
  return {
    'neutral.eye_pair.metric_3d.mean_cycle_x_span_to_full_mesh_x_span_ratio@0.1.0':
      ((stats[0].xSpan + stats[1].xSpan) / 2) / meshXSpan,
    'neutral.eye_pair.metric_3d.mean_cycle_perimeter_to_full_mesh_x_span_ratio@0.1.0':
      ((stats[0].perimeter + stats[1].perimeter) / 2) / meshXSpan,
    'neutral.eye_pair.metric_3d.centroid_separation_to_full_mesh_x_span_ratio@0.1.0':
      centroidDistance / meshXSpan,
    'neutral.eye_pair.metric_3d.mean_closed_cycle_absolute_turning_angle@0.1.0':
      (stats[0].meanTurningAngle + stats[1].meanTurningAngle) / 2,
  };
}

function assertClose(actual, expected, tolerance = 1e-12) {
  for (const [metricRef, expectedValue] of Object.entries(expected)) {
    const actualValue = actual[metricRef];
    if (!Number.isFinite(actualValue) || Math.abs(actualValue - expectedValue) > tolerance) {
      throw new Error(`FR158 metric mismatch for ${metricRef}: actual=${actualValue} expected=${expectedValue}`);
    }
  }
}

const [inputFixture, metadataFixture] = await Promise.all([
  fetchExact(WITNESSES.input),
  fetchExact(WITNESSES.metadata),
]);
const providerLandmarks = parseProviderLandmarks(inputFixture);
const runtimeFactory = factory(providerLandmarks);
const fr66 = await runPhotoToLipsContourNeutralSurfaceFR66({
  schemaVersion: 'fr61-production-neutral-observation-provider-request-v1',
  providerRunRef: 'fr158:exact-runtime-source',
  canonicalAssetDigest: DIGEST,
  image: Object.freeze({ fixture: true }),
}, runtimeFactory);
const fr67 = assessLipsPoseNormalizationRequirementsFR67(fr66);
const fr68 = admitMediaPipeFaceGeometryTransformSemanticsFR68(fr67);
const fr69 = admitMediaPipeWebMetricGeometryGapFR69(fr68);
const fr75 = admitMediaPipeReleaseExactMetricGeometryFR75(fr69);
const fr76 = admitMediaPipeScreenToMetricReimplementationParityFR76(fr75);
const fr77 = await runGovernedMetricGeometryFR77({
  schemaVersion: 'fr77-governed-metric-geometry-runtime-request-v1',
  providerRunRef: 'fr158:exact-runtime-metric-source',
  canonicalAssetDigest: DIGEST,
  image: Object.freeze({ fixture: true }),
  frameWidth: 820,
  frameHeight: 1024,
  geometryMetadataPbtxt: metadataFixture,
}, fr76, runtimeFactory);
const fr158 = computeRoleInvariantEyePairNeutralShapeMetricsFR158(fr77);
assertIssuedRoleInvariantEyePairNeutralShapeMetricsFR158(fr158);

const actual = Object.fromEntries(fr158.metricValues.map((metric) => [metric.metricRef, metric.value]));
const expected = directMetricValues(fr77);
assertClose(actual, expected);

if (
  fr158.authorityState !== 'role_invariant_eye_pair_metric_3d_candidates_research_only'
  || fr158.source.fr77SchemaVersion !== 'fr77-governed-metric-geometry-candidate-v1'
  || fr158.source.coordinateFrame !== 'canonical_aligned_right_handed_metric_3d'
  || fr158.source.geometryLandmarkCount !== 468
  || fr158.source.eyeTopologyWitnessPointCounts[0] !== 16
  || fr158.source.eyeTopologyWitnessPointCounts[1] !== 16
  || fr158.source.eyeTopologyReleaseExactForInstalledPackage !== false
  || fr158.source.anatomicalLateralityResolved !== false
  || fr158.geometryBoundary.reviewed2DProjectionUsed !== false
  || fr158.geometryBoundary.metricXYZDroppedTo2D !== false
  || fr158.geometryBoundary.providerTopologySymbolsUsedAsSemanticSideLabels !== false
  || fr158.metricValues.length !== 4
  || fr158.empiricalBoundary.candidateSelectionState !== 'exploratory_feature_definition_not_validation'
  || fr158.empiricalBoundary.currentDevelopmentCapturesCanEstablishValidation !== false
  || fr158.empiricalBoundary.prospectiveFreshCaptureEvaluationRequired !== true
  || fr158.empiricalBoundary.captureQualityValidated !== false
  || fr158.empiricalBoundary.empiricalRepeatabilityEstablished !== false
  || fr158.empiricalBoundary.captureQualityMeasurementConstructValidated !== false
  || fr158.empiricalBoundary.numericCaptureQualityThreshold !== null
  || fr158.empiricalBoundary.numericRepeatabilityAcceptanceThreshold !== null
  || fr158.empiricalBoundary.constructValidity !== 'unresolved'
  || fr158.authorityBoundary.anatomicalLateralityResolved !== false
  || fr158.authorityBoundary.identityMatchingPerformed !== false
  || fr158.authorityBoundary.biometricTemplateIssued !== false
  || fr158.authorityBoundary.classificationIssued !== false
  || fr158.authorityBoundary.calibrationIssued !== false
  || fr158.authorityBoundary.thresholdsIssued !== false
  || fr158.authorityBoundary.morphologyProduced !== false
  || fr158.authorityBoundary.traditionalBinding !== 'unresolved'
  || fr158.traditionalSemanticAuthority !== false
) throw new Error('FR158 authority or empirical boundary drift.');

process.stdout.write(`${JSON.stringify({
  status: 'FR158_ROLE_INVARIANT_EYE_PAIR_METRIC_3D_PASS',
  releaseCommit: RELEASE_COMMIT,
  metricValues: actual,
  exactGeometryMetadataBlobVerified: fr158.source.exactGeometryMetadataBlobVerified,
  reviewed2DProjectionUsed: fr158.geometryBoundary.reviewed2DProjectionUsed,
  metricXYZDroppedTo2D: fr158.geometryBoundary.metricXYZDroppedTo2D,
  prospectiveFreshCaptureEvaluationRequired: fr158.empiricalBoundary.prospectiveFreshCaptureEvaluationRequired,
  empiricalRepeatabilityEstablished: fr158.empiricalBoundary.empiricalRepeatabilityEstablished,
  constructValidity: fr158.empiricalBoundary.constructValidity,
  identityMatchingPerformed: fr158.authorityBoundary.identityMatchingPerformed,
  traditionalSemanticAuthority: fr158.traditionalSemanticAuthority,
  nextFrontier: fr158.nextFrontier,
})}\n`);
