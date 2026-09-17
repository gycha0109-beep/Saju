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
  buildMesh6BZygomaticRawMorphology,
  computeMesh6BZygomaticResearchKernel,
} from '../.face-reading-dist/mesh6b-zygomatic-raw-morphology.js';

const RELEASE_COMMIT = 'f8ef212d5c962c0e853db7e59d217056b187084b';
const RAW_ROOT = `https://raw.githubusercontent.com/google-ai-edge/mediapipe/${RELEASE_COMMIT}`;
const DIGEST = `sha256:${'6'.repeat(64)}`;
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
    headers: { 'user-agent': 'myeongha-mesh6b-verifier' },
  });
  if (!response.ok) throw new Error(`MESH6B failed to fetch ${witness.path}: HTTP ${response.status}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  const actualSha = gitBlobSha(bytes);
  if (actualSha !== witness.blobSha) throw new Error(`MESH6B Git blob SHA mismatch: ${witness.path}`);
  return bytes.toString('utf8');
}

function parseProviderLandmarks(text) {
  const landmarks = [];
  for (const match of text.matchAll(/landmark\s*\{([\s\S]*?)\}/g)) {
    const block = match[1];
    const x = Number(/\bx:\s*([-+0-9.eE]+)/.exec(block)?.[1]);
    const y = Number(/\by:\s*([-+0-9.eE]+)/.exec(block)?.[1]);
    const z = Number(/\bz:\s*([-+0-9.eE]+)/.exec(block)?.[1]);
    if (![x, y, z].every(Number.isFinite)) throw new Error('MESH6B provider fixture contains non-finite XYZ.');
    landmarks.push({ x, y, z });
  }
  if (landmarks.length !== 478) throw new Error(`MESH6B expected 478 provider landmarks; got ${landmarks.length}.`);
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

function assertFiniteObservables(result) {
  const values = [
    result.lateral.zygomaticSpanRatio,
    result.lateral.zygomaticTemporalFlareRatio,
    result.lateral.zygomaticCheekLateralReliefRatio,
    result.lateral.bilateralZygomaticAsymmetryRatio,
    result.depth2p5D.zygomaticRelativeDepthRatio,
  ];
  if (!values.every(Number.isFinite)) throw new Error('MESH6B emitted a non-finite research observable.');
}

function close(a, b, tolerance = 1e-10) {
  return Math.abs(a - b) <= tolerance;
}

function region(adapterRegionId, indices) {
  return {
    adapterRegionId,
    sourceRegionId: adapterRegionId,
    status: 'weighted_projected_authoring_candidate',
    vertexCount: indices.length,
    weightedVertices: indices.map((mediapipeIndex) => ({ mediapipeIndex, weight: 1, role: 'core' })),
  };
}

function syntheticAdapter() {
  return {
    schemaVersion: 'face-geometry-mediapipe468-weighted-region-adapter-v2',
    targetVertexCount: 468,
    assignment: {
      hardPartition: false,
      overlapAllowed: true,
      semanticSideAssignmentEncoded: false,
    },
    policy: {
      productNeutral: true,
      productionMetricAuthorized: false,
      anatomicalDiagnosticClaim: false,
    },
    regions: [
      region('zygomatic_negative_x', [0, 1]),
      region('zygomatic_positive_x', [2, 3]),
      region('temple_negative_x', [4, 5]),
      region('temple_positive_x', [6, 7]),
      region('cheek_negative_x', [8, 9]),
      region('cheek_positive_x', [10, 11]),
    ],
  };
}

function syntheticPoints() {
  const points = Array.from({ length: 468 }, (_, index) => ({
    x: ((index % 18) - 8.5) * 0.05,
    y: Math.floor(index / 18) * 0.03,
    z: 0,
  }));
  const set = (index, x, z) => { points[index] = { x, y: 0, z }; };
  set(0, -5.0, 1.0); set(1, -4.8, 1.0);
  set(2, 4.8, 1.0); set(3, 5.0, 1.0);
  set(4, -4.0, 0.0); set(5, -3.8, 0.0);
  set(6, 3.8, 0.0); set(7, 4.0, 0.0);
  set(8, -4.5, 0.2); set(9, -4.3, 0.2);
  set(10, 4.3, 0.2); set(11, 4.5, 0.2);
  return points;
}

function transformed(points, transform) {
  return points.map((point, index) => transform({ ...point }, index));
}

const adapterPath = process.argv[2];
if (!adapterPath) throw new Error('Usage: node scripts/verify-face-geometry-mesh6b.mjs <weighted-adapter.json>');
const actualAdapter = JSON.parse(readFileSync(adapterPath, 'utf8'));

const [inputFixture, metadataFixture] = await Promise.all([
  fetchExact(WITNESSES.input),
  fetchExact(WITNESSES.metadata),
]);
const providerLandmarks = parseProviderLandmarks(inputFixture);
const runtimeFactory = factory(providerLandmarks);
const fr66 = await runPhotoToLipsContourNeutralSurfaceFR66({
  schemaVersion: 'fr61-production-neutral-observation-provider-request-v1',
  providerRunRef: 'mesh6b:exact-runtime-source',
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
  providerRunRef: 'mesh6b:exact-runtime-metric-source',
  canonicalAssetDigest: DIGEST,
  image: Object.freeze({ fixture: true }),
  frameWidth: 820,
  frameHeight: 1024,
  geometryMetadataPbtxt: metadataFixture,
}, fr76, runtimeFactory);
const frame = buildMesh6ANeutralObservationFrame(fr77);
const actual = buildMesh6BZygomaticRawMorphology(frame, actualAdapter);
assertFiniteObservables(actual);
if (
  actual.authorityState !== 'research_raw_morphology_only' ||
  actual.eligibility.productRuntimeMorphologyAllowed !== false ||
  actual.eligibility.productionMetricAllowed !== false ||
  actual.eligibility.scoreOrClassificationIssued !== false ||
  actual.depth2p5D.authority !== 'research_diagnostic_only' ||
  actual.authorityBoundary.anatomicalZygionClaimed !== false ||
  actual.authorityBoundary.compositeCheekboneScoreIssued !== false ||
  actual.authorityBoundary.claimsIssued !== 0
) throw new Error('MESH6B authority boundary widened unexpectedly.');

const adapter = syntheticAdapter();
const baselinePoints = syntheticPoints();
const baseline = computeMesh6BZygomaticResearchKernel(baselinePoints, adapter);
assertFiniteObservables(baseline);

const translated = computeMesh6BZygomaticResearchKernel(
  transformed(baselinePoints, (point) => ({ x: point.x + 9.3, y: point.y - 4.7, z: point.z + 2.1 })),
  adapter,
);
const scaled = computeMesh6BZygomaticResearchKernel(
  transformed(baselinePoints, (point) => ({ x: point.x * 3.25, y: point.y * 3.25, z: point.z * 3.25 })),
  adapter,
);
for (const [name, candidate] of [['translation', translated], ['uniform_scale', scaled]]) {
  for (const key of Object.keys(baseline.lateral)) {
    if (!close(candidate.lateral[key], baseline.lateral[key])) {
      throw new Error(`MESH6B ${name} invariance failed for ${key}.`);
    }
  }
  if (!close(candidate.depth2p5D.zygomaticRelativeDepthRatio, baseline.depth2p5D.zygomaticRelativeDepthRatio)) {
    throw new Error(`MESH6B ${name} invariance failed for relative depth.`);
  }
}

const widened = computeMesh6BZygomaticResearchKernel(
  transformed(baselinePoints, (point, index) => {
    if (index === 0 || index === 1) point.x -= 0.6;
    if (index === 2 || index === 3) point.x += 0.6;
    return point;
  }),
  adapter,
);
if (!(widened.lateral.zygomaticSpanRatio > baseline.lateral.zygomaticSpanRatio)) {
  throw new Error('MESH6B synthetic zygomatic widening must increase zygomaticSpanRatio.');
}
if (!(widened.lateral.zygomaticTemporalFlareRatio > baseline.lateral.zygomaticTemporalFlareRatio)) {
  throw new Error('MESH6B synthetic zygomatic widening must increase temporal flare.');
}

const zygomaticDepthRaised = computeMesh6BZygomaticResearchKernel(
  transformed(baselinePoints, (point, index) => {
    if (index >= 0 && index <= 3) point.z += 0.6;
    return point;
  }),
  adapter,
);
if (!(zygomaticDepthRaised.depth2p5D.zygomaticRelativeDepthRatio > baseline.depth2p5D.zygomaticRelativeDepthRatio)) {
  throw new Error('MESH6B synthetic +Z zygomatic deformation must increase the canonical-Z relative-depth diagnostic.');
}

const cheekDepthRaised = computeMesh6BZygomaticResearchKernel(
  transformed(baselinePoints, (point, index) => {
    if (index >= 8 && index <= 11) point.z += 0.6;
    return point;
  }),
  adapter,
);
if (!(cheekDepthRaised.depth2p5D.zygomaticRelativeDepthRatio < baseline.depth2p5D.zygomaticRelativeDepthRatio)) {
  throw new Error('MESH6B synthetic +Z cheek deformation must reduce the zygomatic-vs-reference depth diagnostic.');
}

const asymmetric = computeMesh6BZygomaticResearchKernel(
  transformed(baselinePoints, (point, index) => {
    if (index === 2 || index === 3) point.x += 0.75;
    return point;
  }),
  adapter,
);
if (!(asymmetric.lateral.bilateralZygomaticAsymmetryRatio > baseline.lateral.bilateralZygomaticAsymmetryRatio)) {
  throw new Error('MESH6B unilateral zygomatic deformation must increase bilateral asymmetry.');
}

process.stdout.write(`${JSON.stringify({
  status: 'MESH6B_ZYGOMATIC_RAW_MORPHOLOGY_PASS',
  actualRegionEvidence: actual.regionEvidence,
  actualLateral: actual.lateral,
  actualDepth2p5D: actual.depth2p5D,
  synthetic: {
    baseline: { lateral: baseline.lateral, depth2p5D: baseline.depth2p5D },
    widened: { lateral: widened.lateral },
    zygomaticDepthRaised: zygomaticDepthRaised.depth2p5D,
    cheekDepthRaised: cheekDepthRaised.depth2p5D,
    asymmetric: { lateral: asymmetric.lateral },
    translationInvariant: true,
    uniformScaleInvariant: true,
  },
  authorityState: actual.authorityState,
})}\n`);
