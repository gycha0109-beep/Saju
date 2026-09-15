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
  assertIssuedEyePairGeometricYSpanMetricsFR178,
  computeEyePairGeometricYSpanMetricsFR178,
} from '../.face-reading-dist/eye-pair-geometric-y-span-runtime-fr178.js';

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
    headers: { 'user-agent': 'myeongha-fr178-eye-pair-geometric-y-span-verifier' },
  });
  if (!response.ok) throw new Error(`FR178 failed to fetch ${witness.path}: HTTP ${response.status}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  const actualSha = gitBlobSha(bytes);
  if (actualSha !== witness.blobSha) {
    throw new Error(`FR178 Git blob SHA mismatch for ${witness.path}: expected=${witness.blobSha} actual=${actualSha}`);
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
      throw new Error('FR178 exact provider fixture contains a landmark without finite XYZ.');
    }
    landmarks.push({
      x,
      y,
      z,
      ...(visibilityMatch === undefined ? {} : { visibility: Number(visibilityMatch) }),
    });
  }
  if (landmarks.length !== PROVIDER_LANDMARK_COUNT) {
    throw new Error(`FR178 expected ${PROVIDER_LANDMARK_COUNT} provider landmarks; got ${landmarks.length}.`);
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
    throw new Error('FR178 direct verifier requires exactly two 16-point FR24 Eye topology cycles.');
  }
  const cycles = vertexSets.map((vertices) => vertices.map((vertex) => fr77.metricLandmarks[vertex]));
  const meshXs = fr77.metricLandmarks.map((point) => point.x);
  if (!meshXs.every(Number.isFinite)) throw new Error('FR178 full-mesh X coordinates must be finite.');
  const fullMeshXSpan = Math.max(...meshXs) - Math.min(...meshXs);
  if (!Number.isFinite(fullMeshXSpan) || fullMeshXSpan <= 0) {
    throw new Error('FR178 direct verifier requires a finite positive full-mesh X span.');
  }

  const spans = cycles.map((points) => {
    const xs = points.map((point) => point.x);
    const ys = points.map((point) => point.y);
    if (![...xs, ...ys].every(Number.isFinite)) {
      throw new Error('FR178 direct verifier requires finite Eye-cycle X/Y coordinates.');
    }
    const xSpan = Math.max(...xs) - Math.min(...xs);
    const ySpan = Math.max(...ys) - Math.min(...ys);
    if (!Number.isFinite(xSpan) || xSpan <= 0) {
      throw new Error('FR178 direct verifier requires finite positive per-cycle X span.');
    }
    if (!Number.isFinite(ySpan) || ySpan < 0) {
      throw new Error('FR178 direct verifier requires finite non-negative per-cycle Y span.');
    }
    return { xSpan, ySpan };
  });

  return {
    'neutral.eye_pair.metric_3d.mean_cycle_y_span_to_full_mesh_x_span_ratio@0.1.0':
      ((spans[0].ySpan + spans[1].ySpan) / 2) / fullMeshXSpan,
    'neutral.eye_pair.metric_3d.mean_cycle_y_to_x_span_ratio@0.1.0':
      ((spans[0].ySpan / spans[0].xSpan) + (spans[1].ySpan / spans[1].xSpan)) / 2,
  };
}

function assertClose(actual, expected, tolerance = 1e-12) {
  for (const [metricRef, expectedValue] of Object.entries(expected)) {
    const actualValue = actual[metricRef];
    if (!Number.isFinite(actualValue) || Math.abs(actualValue - expectedValue) > tolerance) {
      throw new Error(`FR178 metric mismatch for ${metricRef}: actual=${actualValue} expected=${expectedValue}`);
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
  providerRunRef: 'fr178:exact-runtime-source',
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
  providerRunRef: 'fr178:exact-runtime-metric-source',
  canonicalAssetDigest: DIGEST,
  image: Object.freeze({ fixture: true }),
  frameWidth: 820,
  frameHeight: 1024,
  geometryMetadataPbtxt: metadataFixture,
}, fr76, runtimeFactory);

const fr178 = computeEyePairGeometricYSpanMetricsFR178(fr77);
assertIssuedEyePairGeometricYSpanMetricsFR178(fr178);

const actual = Object.fromEntries(fr178.metricValues.map((metric) => [metric.metricRef, metric.value]));
const expected = directMetricValues(fr77);
assertClose(actual, expected);

const expectedRefs = Object.keys(expected);
if (
  fr178.authorityState !== 'role_invariant_eye_pair_geometric_y_span_metrics_research_only'
  || fr178.source.fr77SchemaVersion !== 'fr77-governed-metric-geometry-candidate-v1'
  || fr178.source.fr177SchemaVersion !== 'fr177-eye-pair-geometric-y-span-aspect-ratio-feasibility-v1'
  || fr178.source.fr177Verdict !== 'NEUTRAL_GEOMETRY_METHODOLOGY_FEASIBLE_RUNTIME_NOT_ISSUED'
  || fr178.source.coordinateFrame !== 'canonical_aligned_right_handed_metric_3d'
  || fr178.source.geometryLandmarkCount !== 468
  || fr178.source.eyeTopologyWitnessPointCounts[0] !== 16
  || fr178.source.eyeTopologyWitnessPointCounts[1] !== 16
  || fr178.metricDefinitions.length !== 2
  || fr178.metricValues.length !== 2
  || fr178.metricValues.some((metric) => !expectedRefs.includes(metric.metricRef))
  || fr178.metricValues.some((metric) => metric.individualEyeValuesExposed !== false)
  || fr178.geometryBoundary.yAxisBoundingSpanOnly !== true
  || fr178.geometryBoundary.denominatorEpsilonUsed !== false
  || fr178.geometryBoundary.denominatorClampUsed !== false
  || fr178.geometryBoundary.denominatorImputationUsed !== false
  || fr178.geometryBoundary.denominatorFallbackUsed !== false
  || fr178.geometryBoundary.nonFiniteOperandFailsClosed !== true
  || fr178.geometryBoundary.nonPositiveFullMeshXSpanFailsClosed !== true
  || fr178.geometryBoundary.nonPositivePerCycleXSpanFailsClosed !== true
  || fr178.geometryBoundary.providerTopologySymbolsUsedAsSemanticSideLabels !== false
  || fr178.geometryBoundary.reviewed2DProjectionUsed !== false
  || fr178.geometryBoundary.metricXYZDroppedTo2D !== false
  || fr178.authorityBoundary.researchNeutralMetricDefinitionsIssued !== 2
  || fr178.authorityBoundary.researchNeutralMetricValuesIssued !== 2
  || fr178.authorityBoundary.productionNeutralObservationIssued !== false
  || fr178.authorityBoundary.upperLowerLidRolesIssued !== false
  || fr178.authorityBoundary.anatomicalLateralityResolved !== false
  || fr178.authorityBoundary.individualEyeAsymmetryIssued !== false
  || fr178.authorityBoundary.physiologicalApertureIssued !== false
  || fr178.authorityBoundary.eyeHeightSemanticLabelIssued !== false
  || fr178.authorityBoundary.identityMatchingPerformed !== false
  || fr178.authorityBoundary.biometricTemplateIssued !== false
  || fr178.authorityBoundary.classificationIssued !== false
  || fr178.authorityBoundary.calibrationIssued !== false
  || fr178.authorityBoundary.thresholdsIssued !== false
  || fr178.authorityBoundary.morphologyProduced !== false
  || fr178.authorityBoundary.criterionStatesIssued !== 0
  || fr178.authorityBoundary.structuredClaimsIssued !== 0
  || fr178.authorityBoundary.traditionalUnitMappingIssued !== false
  || fr178.authorityBoundary.traditionalBinding !== 'unresolved'
  || fr178.traditionalSemanticAuthority !== false
) throw new Error('FR178 authority, denominator, or semantic boundary drift.');

process.stdout.write(`${JSON.stringify({
  status: 'FR178_EYE_PAIR_GEOMETRIC_Y_SPAN_RUNTIME_PASS',
  releaseCommit: RELEASE_COMMIT,
  metricValues: actual,
  denominatorEpsilonUsed: fr178.geometryBoundary.denominatorEpsilonUsed,
  individualEyeAsymmetryIssued: fr178.authorityBoundary.individualEyeAsymmetryIssued,
  physiologicalApertureIssued: fr178.authorityBoundary.physiologicalApertureIssued,
  productionNeutralObservationIssued: fr178.authorityBoundary.productionNeutralObservationIssued,
  traditionalSemanticAuthority: fr178.traditionalSemanticAuthority,
  nextFrontier: fr178.nextFrontier,
})}\n`);
