import { Buffer } from 'node:buffer';
import { createHash } from 'node:crypto';
import process from 'node:process';

import { runPhotoToLipsContourNeutralSurfaceFR66 } from '../.face-reading-dist/lips-contour-neutral-surface-fr66.js';
import { assessLipsPoseNormalizationRequirementsFR67 } from '../.face-reading-dist/lips-pose-normalization-requirements-fr67.js';
import { admitMediaPipeFaceGeometryTransformSemanticsFR68 } from '../.face-reading-dist/mediapipe-face-geometry-transform-semantics-fr68.js';
import { admitMediaPipeWebMetricGeometryGapFR69 } from '../.face-reading-dist/mediapipe-web-metric-geometry-gap-fr69.js';
import { admitMediaPipeReleaseExactMetricGeometryFR75 } from '../.face-reading-dist/mediapipe-release-exact-metric-geometry-admission-fr75.js';
import { admitMediaPipeScreenToMetricReimplementationParityFR76 } from '../.face-reading-dist/mediapipe-screen-to-metric-reimplementation-parity-fr76.js';
import { runGovernedMetricGeometryFR77 } from '../.face-reading-dist/governed-metric-geometry-runtime-fr77.js';
import { projectIssuedGovernedMetricGeometryToLipsSurfaceFR78 } from '../.face-reading-dist/governed-metric-lips-surface-fr78.js';
import { projectMetricLipsSurfaceToPoseNormalized2DFR79 } from '../.face-reading-dist/pose-normalized-lips-geometry-fr79.js';
import {
  assertIssuedGovernedRoleFreeMinimumSetSeparationFR88,
  computeRoleFreeClosedPolylineMinimumSetSeparationFR88,
  evaluateIssuedPoseNormalizedLipsMinimumSetSeparationFR88,
} from '../.face-reading-dist/role-free-minimum-set-separation-runtime-fr88.js';

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
    headers: { 'user-agent': 'myeongha-fr88-role-free-minimum-set-separation-verifier' },
  });
  if (!response.ok) throw new Error(`FR88 failed to fetch ${witness.path}: HTTP ${response.status}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  const actualSha = gitBlobSha(bytes);
  if (actualSha !== witness.blobSha) {
    throw new Error(`FR88 Git blob SHA mismatch for ${witness.path}: expected=${witness.blobSha} actual=${actualSha}`);
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
      throw new Error('FR88 exact provider fixture contains a landmark without finite XYZ.');
    }
    landmarks.push({
      x,
      y,
      z,
      ...(visibilityMatch === undefined ? {} : { visibility: Number(visibilityMatch) }),
    });
  }
  if (landmarks.length !== PROVIDER_LANDMARK_COUNT) {
    throw new Error(`FR88 expected ${PROVIDER_LANDMARK_COUNT} provider landmarks; got ${landmarks.length}.`);
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

const fr61Request = {
  schemaVersion: 'fr61-production-neutral-observation-provider-request-v1',
  providerRunRef: 'fr88:exact-runtime-source',
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
  providerRunRef: 'fr88:exact-runtime-metric-source',
  canonicalAssetDigest: DIGEST,
  image: Object.freeze({ fixture: true }),
  frameWidth: 820,
  frameHeight: 1024,
  geometryMetadataPbtxt: metadataFixture,
}, fr76, runtimeFactory);
const fr78 = projectIssuedGovernedMetricGeometryToLipsSurfaceFR78(fr77);
const fr79 = projectMetricLipsSurfaceToPoseNormalized2DFR79(fr78);
const fr88 = evaluateIssuedPoseNormalizedLipsMinimumSetSeparationFR88(fr79);
assertIssuedGovernedRoleFreeMinimumSetSeparationFR88(fr88);

const direct = computeRoleFreeClosedPolylineMinimumSetSeparationFR88(
  { contourRef: fr79.contours[0].contourRef, points: fr79.contours[0].geometry.boundary },
  { contourRef: fr79.contours[1].contourRef, points: fr79.contours[1].geometry.boundary },
);

if (
  fr88.schemaVersion !== 'fr88-governed-role-free-minimum-set-separation-v1' ||
  fr88.authorityState !== 'governed_role_free_minimum_boundary_separation_geometry_only' ||
  fr88.source.fr79SchemaVersion !== 'fr79-pose-normalized-lips-geometry-v1' ||
  fr88.source.fr87SchemaVersion !== 'fr87-role-free-symmetric-set-distance-feasibility-review-v1' ||
  fr88.source.coordinateFrame !== 'pose_normalized_face_2d' ||
  fr88.source.coordinateUnit !== 'centimeter' ||
  fr88.source.contourPointCounts[0] !== 20 ||
  fr88.source.contourPointCounts[1] !== 20 ||
  fr88.computation.segmentPairCount !== 400 ||
  !Number.isFinite(fr88.computation.minimumSeparation) ||
  fr88.computation.minimumSeparation < 0 ||
  fr88.computation.minimumSeparation !== direct.minimumSeparation ||
  fr88.computation.discreteVertexOnlyApproximationUsed !== false ||
  fr88.computation.explicitPointPairCorrespondenceIssued !== false ||
  fr88.runtimeGeometryFunctionalDefinitionsIssued !== 1 ||
  fr88.runtimeGeometryValuesIssued !== 1 ||
  fr88.neutralMetricDefinitionsIssued !== 0 ||
  fr88.neutralMetricValuesIssued !== 0 ||
  fr88.anatomicalRolesIssued !== 0 ||
  fr88.crossContourCorrespondencePairsIssued !== 0 ||
  fr88.thicknessMetricIssued !== false ||
  fr88.physicalAnthropometricInterpretationAuthorized !== false ||
  fr88.morphologyProduced !== false ||
  fr88.criterionStatesIssued !== 0 ||
  fr88.claimsIssued !== 0 ||
  fr88.traditionalSemanticAuthority !== false ||
  fr88.recommendedNextFrontier.minimumGapAloneSufficient !== false
) throw new Error('FR88 exact governed minimum-set-separation authority drift.');

process.stdout.write(`${JSON.stringify({
  status: 'FR88_ROLE_FREE_MINIMUM_SET_SEPARATION_PASS',
  releaseCommit: RELEASE_COMMIT,
  minimumSeparation: fr88.computation.minimumSeparation,
  coordinateUnit: fr88.source.coordinateUnit,
  segmentPairCount: fr88.computation.segmentPairCount,
  runtimeGeometryValuesIssued: fr88.runtimeGeometryValuesIssued,
  neutralMetricValuesIssued: fr88.neutralMetricValuesIssued,
  anatomicalRolesIssued: fr88.anatomicalRolesIssued,
  crossContourCorrespondencePairsIssued: fr88.crossContourCorrespondencePairsIssued,
  thicknessMetricIssued: fr88.thicknessMetricIssued,
  criterionStatesIssued: fr88.criterionStatesIssued,
  claimsIssued: fr88.claimsIssued,
  traditionalSemanticAuthority: fr88.traditionalSemanticAuthority,
  nextFrontier: fr88.recommendedNextFrontier.frontierKey,
})}\n`);