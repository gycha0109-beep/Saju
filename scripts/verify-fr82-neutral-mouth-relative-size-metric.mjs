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
  assertIssuedNeutralMouthRelativeSizeMetricFR82,
  computeNeutralMouthRelativeSizeMetricFR82,
  getNeutralMouthRelativeSizeMetricDefinitionFR82,
} from '../.face-reading-dist/neutral-mouth-relative-size-metric-fr82.js';

const RELEASE_COMMIT = 'f8ef212d5c962c0e853db7e59d217056b187084b';
const RAW_ROOT = `https://raw.githubusercontent.com/google-ai-edge/mediapipe/${RELEASE_COMMIT}`;
const PROVIDER_LANDMARK_COUNT = 478;
const DIGEST = `sha256:${'c'.repeat(64)}`;
const OTHER_DIGEST = `sha256:${'d'.repeat(64)}`;
const RUN_REF = 'fr82:exact-runtime-metric-source';
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
    headers: { 'user-agent': 'myeongha-fr82-neutral-mouth-relative-size-verifier' },
  });
  if (!response.ok) throw new Error(`FR82 failed to fetch ${witness.path}: HTTP ${response.status}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  const actualSha = gitBlobSha(bytes);
  if (actualSha !== witness.blobSha) {
    throw new Error(`FR82 Git blob SHA mismatch for ${witness.path}: expected=${witness.blobSha} actual=${actualSha}`);
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
      throw new Error('FR82 exact provider fixture contains a landmark without finite XYZ.');
    }
    landmarks.push({
      x,
      y,
      z,
      ...(visibilityMatch === undefined ? {} : { visibility: Number(visibilityMatch) }),
    });
  }
  if (landmarks.length !== PROVIDER_LANDMARK_COUNT) {
    throw new Error(`FR82 expected ${PROVIDER_LANDMARK_COUNT} provider landmarks; got ${landmarks.length}.`);
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

async function expectFailure(label, action, pattern) {
  try {
    await action();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (!pattern.test(message)) {
      throw new Error(`FR82 ${label} failed with unexpected error: ${message}`, { cause: error });
    }
    return message;
  }
  throw new Error(`FR82 ${label} unexpectedly succeeded.`);
}

const [inputFixture, metadataFixture, alignmentSource] = await Promise.all([
  fetchExact(WITNESSES.input),
  fetchExact(WITNESSES.metadata),
  fetchExact(WITNESSES.alignment),
]);
if (!alignmentSource.includes('Multiply each of the metric landmarks by the inverse pose') ||
    !alignmentSource.includes('the canonical metric face landmarks')) {
  throw new Error('FR82 alignment witness no longer proves canonical inverse-pose alignment.');
}

const providerLandmarks = parseProviderLandmarks(inputFixture);
const runtimeFactory = factory(providerLandmarks);
const fr61Request = {
  schemaVersion: 'fr61-production-neutral-observation-provider-request-v1',
  providerRunRef: 'fr82:exact-runtime-source',
  canonicalAssetDigest: DIGEST,
  image: Object.freeze({ fixture: true }),
};
const fr66 = await runPhotoToLipsContourNeutralSurfaceFR66(fr61Request, runtimeFactory);
const fr67 = assessLipsPoseNormalizationRequirementsFR67(fr66);
const fr68 = admitMediaPipeFaceGeometryTransformSemanticsFR68(fr67);
const fr69 = admitMediaPipeWebMetricGeometryGapFR69(fr68);
const fr75 = admitMediaPipeReleaseExactMetricGeometryFR75(fr69);
const fr76 = admitMediaPipeScreenToMetricReimplementationParityFR76(fr75);

async function issueFR77(providerRunRef, canonicalAssetDigest) {
  const result = await runGovernedMetricGeometryFR77({
    schemaVersion: 'fr77-governed-metric-geometry-runtime-request-v1',
    providerRunRef,
    canonicalAssetDigest,
    image: Object.freeze({ fixture: true }),
    frameWidth: 820,
    frameHeight: 1024,
    geometryMetadataPbtxt: metadataFixture,
  }, fr76, runtimeFactory);
  assertIssuedGovernedMetricGeometryFR77(result);
  return result;
}

const fr77 = await issueFR77(RUN_REF, DIGEST);
const fr78 = projectIssuedGovernedMetricGeometryToLipsSurfaceFR78(fr77);
assertIssuedGovernedMetricLipsSurfaceFR78(fr78);
const fr79 = projectMetricLipsSurfaceToPoseNormalized2DFR79(fr78);
assertIssuedPoseNormalizedLipsGeometryFR79(fr79);

const definition = getNeutralMouthRelativeSizeMetricDefinitionFR82();
if (
  definition.metricRef !== 'neutral.mouth.contour_set.horizontal_span_to_full_mesh_horizontal_span_ratio@0.1.0' ||
  definition.numeratorCoordinateFrame !== 'pose_normalized_face_2d' ||
  definition.denominatorCoordinateFrame !== 'canonical_aligned_right_handed_metric_3d' ||
  definition.comparisonAxis !== 'shared_canonical_metric_x' ||
  definition.axisCompatibilityRule !== 'fr79_x_equals_fr77_canonical_metric_x_without_recenter_or_rescale' ||
  definition.unit !== 'ratio' ||
  definition.fullMeshLandmarkCount !== 468 ||
  definition.sameProviderRunRequired !== true ||
  definition.sameCanonicalAssetDigestRequired !== true ||
  definition.faceOvalTopologyRequired !== false ||
  definition.faceWidthAnatomicalRoleAssigned !== false ||
  definition.absoluteSpanValuesIssued !== false ||
  definition.physicalAnthropometricInterpretationAllowed !== false ||
  definition.traditionalCriterionBindingRef !== null ||
  definition.calibrationRef !== null
) throw new Error('FR82 metric definition authority drift.');

const lipsXs = fr79.contours.flatMap((contour) => contour.geometry.boundary.map((point) => point.x));
const meshXs = fr77.metricLandmarks.map((point) => point.x);
const mouthSpan = Math.max(...lipsXs) - Math.min(...lipsXs);
const meshSpan = Math.max(...meshXs) - Math.min(...meshXs);
if (mouthSpan <= 0 || meshSpan <= 0 || mouthSpan > meshSpan + TOLERANCE) {
  throw new Error(`FR82 exact source has invalid spans mouth=${mouthSpan} mesh=${meshSpan}.`);
}
const expectedRatio = mouthSpan / meshSpan;

const fr82 = computeNeutralMouthRelativeSizeMetricFR82(fr77, fr79);
assertIssuedNeutralMouthRelativeSizeMetricFR82(fr82);
const absoluteError = Math.abs(fr82.metric.value - expectedRatio);
if (!Number.isFinite(absoluteError) || absoluteError > TOLERANCE) {
  throw new Error(`FR82 relative-size mismatch actual=${fr82.metric.value} expected=${expectedRatio} error=${absoluteError}.`);
}
if (
  fr82.metric.metricRef !== definition.metricRef ||
  fr82.metric.unit !== 'ratio' ||
  fr82.metric.comparisonAxis !== 'shared_canonical_metric_x' ||
  fr82.metric.poseCompensated !== true ||
  fr82.metric.sourceMeshLandmarkCount !== 468 ||
  fr82.metric.classificationApplied !== false ||
  fr82.metric.calibrationApplied !== false ||
  fr82.metric.traditionalBindingApplied !== false ||
  fr82.relativeMouthSizeMetricIssued !== true ||
  fr82.absoluteMouthDimensionsIssued !== 0 ||
  fr82.anatomicalFaceWidthIssued !== false ||
  fr82.outerInnerLipRolesIssued !== false ||
  fr82.morphologyProduced !== false ||
  fr82.criterionStatesIssued !== 0 ||
  fr82.claimsIssued !== 0 ||
  fr82.traditionalMetricBindingReviewedForThisMetric !== false ||
  fr82.traditionalSemanticAuthority !== false
) throw new Error('FR82 neutral relative-size output authority drift.');
if (
  fr82.resolvedBlockers.length !== 1 ||
  fr82.resolvedBlockers[0] !== 'square_broad_relative_mouth_size_metric_not_defined' ||
  fr82.blockers.includes('square_broad_relative_mouth_size_metric_not_defined') ||
  !fr82.blockers.includes('square_broad_combined_metric_binding_not_reviewed') ||
  fr82.authorityBoundary.fullMeshSpanAsAnatomicalFaceWidthAllowed !== false ||
  fr82.authorityBoundary.absoluteSpanIssuanceAllowed !== false ||
  fr82.authorityBoundary.physicalAnthropometricInterpretationAllowed !== false ||
  fr82.authorityBoundary.traditionalBigMeaningAssignmentAllowed !== false ||
  fr82.authorityBoundary.traditionalCriterionMetricBindingAllowed !== false ||
  fr82.authorityBoundary.calibrationApplicationAllowed !== false ||
  fr82.authorityBoundary.criterionStateIssuanceAllowed !== false ||
  fr82.authorityBoundary.claimIssuanceAllowed !== false
) throw new Error('FR82 blocker or authority boundary widened unexpectedly.');

const otherRunFR77 = await issueFR77('fr82:other-provider-run', DIGEST);
const mixedRunMessage = await expectFailure(
  'mixed-provider-run guard',
  () => computeNeutralMouthRelativeSizeMetricFR82(otherRunFR77, fr79),
  /same providerRunRef/u,
);

const otherAssetFR77 = await issueFR77(RUN_REF, OTHER_DIGEST);
const mixedAssetMessage = await expectFailure(
  'mixed-canonical-asset guard',
  () => computeNeutralMouthRelativeSizeMetricFR82(otherAssetFR77, fr79),
  /same canonicalAssetDigest/u,
);

const serialized = JSON.stringify(fr82);
for (const forbiddenField of [
  'mouthSpanCm',
  'faceWidthCm',
  'fullMeshSpanCm',
  'outerLip',
  'innerLip',
  'criterionState',
  'claimText',
]) {
  if (serialized.includes(`"${forbiddenField}"`)) {
    throw new Error(`FR82 output exposed forbidden field ${forbiddenField}.`);
  }
}

process.stdout.write(`${JSON.stringify({
  status: 'FR82_NEUTRAL_MOUTH_RELATIVE_SIZE_METRIC_PASS',
  releaseCommit: RELEASE_COMMIT,
  alignmentBlobSha: WITNESSES.alignment.blobSha,
  metricRef: fr82.metric.metricRef,
  value: fr82.metric.value,
  expectedRatio,
  absoluteError,
  tolerance: TOLERANCE,
  sourceMeshLandmarkCount: fr82.metric.sourceMeshLandmarkCount,
  relativeMouthSizeMetricIssued: fr82.relativeMouthSizeMetricIssued,
  anatomicalFaceWidthIssued: fr82.anatomicalFaceWidthIssued,
  absoluteMouthDimensionsIssued: fr82.absoluteMouthDimensionsIssued,
  traditionalMetricBindingReviewedForThisMetric: fr82.traditionalMetricBindingReviewedForThisMetric,
  criterionStatesIssued: fr82.criterionStatesIssued,
  claimsIssued: fr82.claimsIssued,
  traditionalSemanticAuthority: fr82.traditionalSemanticAuthority,
  mixedRunGuard: mixedRunMessage,
  mixedAssetGuard: mixedAssetMessage,
})}\n`);