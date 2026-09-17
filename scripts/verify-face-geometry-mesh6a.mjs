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
  assertIssuedMesh6ANeutralObservationFrame,
  buildMesh6ANeutralObservationFrame,
} from '../.face-reading-dist/mesh6a-neutral-observation-frame.js';

const RELEASE_COMMIT = 'f8ef212d5c962c0e853db7e59d217056b187084b';
const RAW_ROOT = `https://raw.githubusercontent.com/google-ai-edge/mediapipe/${RELEASE_COMMIT}`;
const PROVIDER_LANDMARK_COUNT = 478;
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
    headers: { 'user-agent': 'myeongha-mesh6a-verifier' },
  });
  if (!response.ok) throw new Error(`MESH6A failed to fetch ${witness.path}: HTTP ${response.status}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  const actualSha = gitBlobSha(bytes);
  if (actualSha !== witness.blobSha) {
    throw new Error(`MESH6A Git blob SHA mismatch for ${witness.path}: expected=${witness.blobSha} actual=${actualSha}`);
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
    if (![x, y, z].every(Number.isFinite)) throw new Error('MESH6A fixture contains non-finite XYZ.');
    landmarks.push({ x, y, z, ...(visibilityMatch === undefined ? {} : { visibility: Number(visibilityMatch) }) });
  }
  if (landmarks.length !== PROVIDER_LANDMARK_COUNT) {
    throw new Error(`MESH6A expected ${PROVIDER_LANDMARK_COUNT} provider landmarks; got ${landmarks.length}.`);
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

const [inputFixture, metadataFixture] = await Promise.all([
  fetchExact(WITNESSES.input),
  fetchExact(WITNESSES.metadata),
]);
const providerLandmarks = parseProviderLandmarks(inputFixture);
const runtimeFactory = factory(providerLandmarks);

const fr66 = await runPhotoToLipsContourNeutralSurfaceFR66({
  schemaVersion: 'fr61-production-neutral-observation-provider-request-v1',
  providerRunRef: 'mesh6a:exact-runtime-source',
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
  providerRunRef: 'mesh6a:exact-runtime-metric-source',
  canonicalAssetDigest: DIGEST,
  image: Object.freeze({ fixture: true }),
  frameWidth: 820,
  frameHeight: 1024,
  geometryMetadataPbtxt: metadataFixture,
}, fr76, runtimeFactory);
assertIssuedGovernedMetricGeometryFR77(fr77);

const frame = buildMesh6ANeutralObservationFrame(fr77);
assertIssuedMesh6ANeutralObservationFrame(frame);

if (frame.metricLandmarks !== fr77.metricLandmarks) {
  throw new Error('MESH6A must preserve the exact FR77 metric landmark object without a second normalization pass.');
}
if (frame.poseTransformMatrixPackedColumnMajor !== fr77.poseTransformMatrixPackedColumnMajor) {
  throw new Error('MESH6A must preserve the exact FR77 pose transform evidence.');
}
if (
  frame.coordinateFrame !== 'canonical_aligned_right_handed_metric_3d' ||
  frame.unit !== 'centimeter' ||
  frame.metricLandmarks.length !== 468 ||
  frame.diagnostics.landmarkCount !== 468 ||
  frame.diagnostics.allCoordinatesFinite !== true ||
  frame.diagnostics.poseTransformFinite !== true ||
  frame.diagnostics.frameDimensionsPositive !== true ||
  frame.diagnostics.nonDegenerateAxisCount < 2 ||
  !Number.isFinite(frame.diagnostics.rmsRadiusCm) ||
  frame.diagnostics.rmsRadiusCm <= 0 ||
  !Number.isFinite(frame.diagnostics.poseLinearDeterminant)
) throw new Error('MESH6A threshold-free geometry diagnostics drift.');

if (
  frame.captureQuality.thresholdFreeDiagnosticsIssued !== true ||
  frame.captureQuality.captureQualityThresholdsDefined !== false ||
  frame.captureQuality.captureQualityPassFailIssued !== false ||
  frame.captureQuality.frontalPoseAdequacyVerified !== false ||
  frame.captureQuality.expressionNeutralityVerified !== false ||
  frame.captureQuality.occlusionValidityVerified !== false ||
  frame.captureQuality.repeatedCaptureStabilityVerified !== false ||
  frame.metricEligibility.candidateGeometryAvailable !== true ||
  frame.metricEligibility.weightedRegionAttachmentAllowedForResearchInspection !== true ||
  frame.metricEligibility.morphologyMetricEvaluationAllowed !== false ||
  frame.metricEligibility.productionMorphologyMetricAllowed !== false
) throw new Error('MESH6A quality/eligibility boundary drift.');

if (
  frame.authorityBoundary.fr77PoseNormalizationReimplemented !== false ||
  frame.authorityBoundary.canonicalInversePoseSemanticsInheritedFromFR77 !== true ||
  frame.authorityBoundary.frData05RawPixelsPromotedToQualityAuthority !== false ||
  frame.authorityBoundary.frData12EvaluationReadinessPromotedToRuntimeAuthority !== false ||
  frame.authorityBoundary.subjectSpecific3DReconstructionClaimed !== false ||
  frame.authorityBoundary.anatomicalDiagnosticClaimed !== false ||
  frame.authorityBoundary.traditionalSemanticAuthority !== false ||
  frame.authorityBoundary.morphologyProduced !== false ||
  frame.authorityBoundary.criterionStatesIssued !== 0 ||
  frame.authorityBoundary.claimsIssued !== 0
) throw new Error('MESH6A authority boundary widened unexpectedly.');

for (const blocker of [
  'capture_quality_thresholds_not_calibrated',
  'expression_neutrality_not_validated',
  'occlusion_validity_not_validated',
  'multi_capture_repeatability_not_validated',
  'morphology_metric_definitions_not_authorized',
]) {
  if (!frame.metricEligibility.blockers.includes(blocker)) {
    throw new Error(`MESH6A required blocker missing: ${blocker}`);
  }
}

process.stdout.write(`${JSON.stringify({
  status: 'MESH6A_NEUTRAL_OBSERVATION_FRAME_PASS',
  sourceSchemaVersion: frame.source.schemaVersion,
  coordinateFrame: frame.coordinateFrame,
  unit: frame.unit,
  landmarkCount: frame.diagnostics.landmarkCount,
  spansCm: frame.diagnostics.boundsCm.span,
  rmsRadiusCm: frame.diagnostics.rmsRadiusCm,
  poseLinearDeterminant: frame.diagnostics.poseLinearDeterminant,
  captureQualityThresholdsDefined: frame.captureQuality.captureQualityThresholdsDefined,
  morphologyMetricEvaluationAllowed: frame.metricEligibility.morphologyMetricEvaluationAllowed,
  productionMorphologyMetricAllowed: frame.metricEligibility.productionMorphologyMetricAllowed,
  blockerCount: frame.metricEligibility.blockers.length,
})}\n`);
