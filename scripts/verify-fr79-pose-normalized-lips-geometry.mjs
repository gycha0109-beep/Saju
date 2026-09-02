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
  getPoseNormalizedLipsProjectionRuleFR79,
  projectMetricLipsSurfaceToPoseNormalized2DFR79,
} from '../.face-reading-dist/pose-normalized-lips-geometry-fr79.js';

const RELEASE_COMMIT = 'f8ef212d5c962c0e853db7e59d217056b187084b';
const RAW_ROOT = `https://raw.githubusercontent.com/google-ai-edge/mediapipe/${RELEASE_COMMIT}`;
const PROVIDER_LANDMARK_COUNT = 478;
const DIGEST = `sha256:${'9'.repeat(64)}`;

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
    headers: { 'user-agent': 'myeongha-fr79-pose-normalized-lips-verifier' },
  });
  if (!response.ok) throw new Error(`FR79 failed to fetch ${witness.path}: HTTP ${response.status}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  const actualSha = gitBlobSha(bytes);
  if (actualSha !== witness.blobSha) {
    throw new Error(`FR79 Git blob SHA mismatch for ${witness.path}: expected=${witness.blobSha} actual=${actualSha}`);
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
      throw new Error('FR79 exact provider fixture contains a landmark without finite XYZ.');
    }
    landmarks.push({
      x,
      y,
      z,
      ...(visibilityMatch === undefined ? {} : { visibility: Number(visibilityMatch) }),
    });
  }
  if (landmarks.length !== PROVIDER_LANDMARK_COUNT) {
    throw new Error(`FR79 expected ${PROVIDER_LANDMARK_COUNT} provider landmarks; got ${landmarks.length}.`);
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
    !alignmentSource.includes('align the runtime metric face landmarks with') ||
    !alignmentSource.includes('the canonical metric face landmarks')) {
  throw new Error('FR79 exact alignment source no longer witnesses canonical inverse-pose alignment semantics.');
}

const providerLandmarks = parseProviderLandmarks(inputFixture);
const runtimeFactory = factory(providerLandmarks);
const fr61Request = {
  schemaVersion: 'fr61-production-neutral-observation-provider-request-v1',
  providerRunRef: 'fr79:exact-runtime-source',
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
  providerRunRef: 'fr79:exact-runtime-metric-source',
  canonicalAssetDigest: DIGEST,
  image: Object.freeze({ fixture: true }),
  frameWidth: 820,
  frameHeight: 1024,
  geometryMetadataPbtxt: metadataFixture,
}, fr76, runtimeFactory);
assertIssuedGovernedMetricGeometryFR77(fr77);
const fr78 = projectIssuedGovernedMetricGeometryToLipsSurfaceFR78(fr77);
assertIssuedGovernedMetricLipsSurfaceFR78(fr78);

const rule = getPoseNormalizedLipsProjectionRuleFR79();
if (
  rule.projectionRuleRef !== 'fr79:canonical-metric-xy-orthographic@0.1.0' ||
  rule.sourceCoordinateFrame !== 'canonical_aligned_right_handed_metric_3d' ||
  rule.targetCoordinateFrame !== 'pose_normalized_face_2d' ||
  rule.sourceUnit !== 'centimeter' ||
  rule.targetCoordinateUnit !== 'centimeter' ||
  rule.formula !== 'x2d=x3d;y2d=y3d' ||
  rule.depthTreatment !== 'drop_z_only_after_canonical_inverse_pose_alignment' ||
  rule.axisConvention !== 'retain_canonical_metric_x_right_y_up' ||
  rule.recenteringApplied !== false ||
  rule.rescalingApplied !== false ||
  rule.perspectiveReprojectionApplied !== false ||
  rule.screenCoordinateReconstructionApplied !== false ||
  rule.poseCompensated !== true ||
  rule.sourceAlignmentWitness.blobSha !== WITNESSES.alignment.blobSha ||
  rule.semanticAuthority !== false
) throw new Error('FR79 projection rule authority or source witness drift.');

const fr79 = projectMetricLipsSurfaceToPoseNormalized2DFR79(fr78);
assertIssuedPoseNormalizedLipsGeometryFR79(fr79);
if (
  fr79.coordinateFrame !== 'pose_normalized_face_2d' ||
  fr79.coordinateUnit !== 'centimeter' ||
  fr79.poseCompensated !== true ||
  fr79.contours.length !== 2 ||
  fr79.contourPointCounts[0] !== 20 ||
  fr79.contourPointCounts[1] !== 20 ||
  fr79.contourConsumptionState !== 'unordered_set_no_outer_inner_role' ||
  fr79.metricLipsGeometryConsumed !== true ||
  fr79.poseNormalizedLipsGeometryIssued !== true ||
  fr79.reviewed2DProjectionRuleIssued !== true ||
  fr79.depthOutputIssued !== false ||
  fr79.fr15ConsumerSlotIssued !== false ||
  fr79.neutralMetricDefinitionsIssued !== 0 ||
  fr79.neutralMetricValuesIssued !== 0 ||
  fr79.morphologyProduced !== false ||
  fr79.criterionStatesIssued !== 0 ||
  fr79.claimsIssued !== 0 ||
  fr79.traditionalSemanticAuthority !== false ||
  fr79.authorityBoundary.metricDefinitionIssuanceAllowed !== false ||
  fr79.authorityBoundary.metricValueIssuanceAllowed !== false ||
  fr79.authorityBoundary.outerInnerAnatomicalAssignmentAllowed !== false
) throw new Error('FR79 issued pose-normalized lips geometry authority drift.');

let maximumProjectionError = 0;
for (let contourIndex = 0; contourIndex < fr78.contours.length; contourIndex += 1) {
  const sourceContour = fr78.contours[contourIndex];
  const projectedContour = fr79.contours[contourIndex];
  if (sourceContour.geometry.boundary.length !== 20 || projectedContour.geometry.boundary.length !== 20) {
    throw new Error(`FR79 contour ${contourIndex} point-count drift.`);
  }
  if (projectedContour.anatomicalRole !== null || projectedContour.traditionalRole !== null) {
    throw new Error(`FR79 contour ${contourIndex} semantic role drift.`);
  }
  for (let pointIndex = 0; pointIndex < 20; pointIndex += 1) {
    const sourcePoint = sourceContour.geometry.boundary[pointIndex];
    const projectedPoint = projectedContour.geometry.boundary[pointIndex];
    const keys = Object.keys(projectedPoint);
    if (keys.length !== 2 || !keys.includes('x') || !keys.includes('y') || keys.includes('z')) {
      throw new Error(`FR79 contour ${contourIndex} point ${pointIndex} must expose exactly x/y and no z.`);
    }
    const xError = Math.abs(projectedPoint.x - sourcePoint.x);
    const yError = Math.abs(projectedPoint.y - sourcePoint.y);
    maximumProjectionError = Math.max(maximumProjectionError, xError, yError);
    if (xError !== 0 || yError !== 0) {
      throw new Error(`FR79 orthographic XY projection changed source coordinates at contour=${contourIndex} point=${pointIndex}.`);
    }
  }
}

const serialized = JSON.stringify(fr79);
for (const forbidden of ['providerVertexIndices', 'providerGraphComponentOrdinal', 'z":', 'square_broad', 'lips_substantial']) {
  if (serialized.includes(forbidden)) throw new Error(`FR79 output exposed forbidden token: ${forbidden}.`);
}

process.stdout.write(`${JSON.stringify({
  status: 'FR79_POSE_NORMALIZED_LIPS_GEOMETRY_PASS',
  releaseCommit: RELEASE_COMMIT,
  alignmentBlobSha: WITNESSES.alignment.blobSha,
  projectionRuleRef: rule.projectionRuleRef,
  contourCount: fr79.contours.length,
  contourPointCounts: fr79.contours.map((contour) => contour.geometry.boundary.length),
  maximumProjectionError,
  poseCompensated: fr79.poseCompensated,
  poseNormalizedLipsGeometryIssued: fr79.poseNormalizedLipsGeometryIssued,
  depthOutputIssued: fr79.depthOutputIssued,
  neutralMetricDefinitionsIssued: fr79.neutralMetricDefinitionsIssued,
  morphologyProduced: fr79.morphologyProduced,
  criterionStatesIssued: fr79.criterionStatesIssued,
  claimsIssued: fr79.claimsIssued,
  traditionalSemanticAuthority: fr79.traditionalSemanticAuthority,
})}\n`);
