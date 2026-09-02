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
  assertIssuedGovernedCertifiedRoleFreeSymmetricArclengthMeanFR96,
  evaluateIssuedPoseNormalizedLipsCertifiedSymmetricArclengthMeanFR96,
} from '../.face-reading-dist/certified-role-free-symmetric-arclength-mean-runtime-fr96.js';
import {
  assertIssuedGovernedRoleFreeArclengthMeanNeutralMetricFR98,
  bindIssuedFR96ToNeutralMetricValueFR98,
} from '../.face-reading-dist/role-free-arclength-mean-neutral-metric-value-runtime-fr98.js';

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
    headers: { 'user-agent': 'myeongha-fr98-neutral-metric-verifier' },
  });
  if (!response.ok) throw new Error(`FR98 failed to fetch ${witness.path}: HTTP ${response.status}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  const actualSha = gitBlobSha(bytes);
  if (actualSha !== witness.blobSha) {
    throw new Error(`FR98 Git blob SHA mismatch for ${witness.path}: expected=${witness.blobSha} actual=${actualSha}`);
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
    if (![x, y, z].every(Number.isFinite)) throw new Error('FR98 provider fixture contains non-finite XYZ.');
    landmarks.push({
      x,
      y,
      z,
      ...(visibilityMatch === undefined ? {} : { visibility: Number(visibilityMatch) }),
    });
  }
  if (landmarks.length !== PROVIDER_LANDMARK_COUNT) {
    throw new Error(`FR98 expected ${PROVIDER_LANDMARK_COUNT} provider landmarks; got ${landmarks.length}.`);
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
  providerRunRef: 'fr98:exact-runtime-source',
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
  providerRunRef: 'fr98:exact-runtime-metric-source',
  canonicalAssetDigest: DIGEST,
  image: Object.freeze({ fixture: true }),
  frameWidth: 820,
  frameHeight: 1024,
  geometryMetadataPbtxt: metadataFixture,
}, fr76, runtimeFactory);
assertIssuedGovernedMetricGeometryFR77(fr77);
const fr78 = projectIssuedGovernedMetricGeometryToLipsSurfaceFR78(fr77);
assertIssuedGovernedMetricLipsSurfaceFR78(fr78);
const fr79 = projectMetricLipsSurfaceToPoseNormalized2DFR79(fr78);
assertIssuedPoseNormalizedLipsGeometryFR79(fr79);

const fr96 = evaluateIssuedPoseNormalizedLipsCertifiedSymmetricArclengthMeanFR96(fr79);
assertIssuedGovernedCertifiedRoleFreeSymmetricArclengthMeanFR96(fr96);
const fr98 = bindIssuedFR96ToNeutralMetricValueFR98(fr96);
assertIssuedGovernedRoleFreeArclengthMeanNeutralMetricFR98(fr98);

if (
  fr98.metric.metricRef !== 'neutral.mouth.contour_set.symmetric_arclength_mean_nearest_set_distance@0.1.0' ||
  fr98.metric.sourceFunctionalRef !== 'fr96:role-free-symmetric-arclength-mean-nearest-set-distance@0.1.0' ||
  fr98.metric.unit !== 'canonical_metric_plane_distance' ||
  fr98.metric.coordinateFrame !== 'pose_normalized_face_2d' ||
  fr98.metric.exactTruthContainedInInterval !== true ||
  fr98.metric.fr91SymmetricBudgetCertified !== true ||
  fr98.metric.runtimeRecomputationPerformed !== false ||
  fr98.metric.explicitPointPairCorrespondenceApplied !== false ||
  fr98.metric.anatomicalRoleApplied !== false ||
  fr98.metric.physicalAnthropometricInterpretationApplied !== false ||
  fr98.metric.thicknessInterpretationApplied !== false ||
  fr98.metric.classificationApplied !== false ||
  fr98.metric.calibrationApplied !== false ||
  fr98.metric.traditionalBindingApplied !== false ||
  fr98.neutralMetricDefinitionRefsConsumed !== 1 ||
  fr98.neutralMetricDefinitionsIssued !== 0 ||
  fr98.neutralMetricValuesIssued !== 1 ||
  fr98.runtimeGeometryRecomputationPerformed !== false ||
  fr98.anatomicalRolesIssued !== 0 ||
  fr98.crossContourCorrespondencePairsIssued !== 0 ||
  fr98.thicknessMetricIssued !== false ||
  fr98.physicalAnthropometricInterpretationAuthorized !== false ||
  fr98.morphologyProduced !== false ||
  fr98.criterionStatesIssued !== 0 ||
  fr98.claimsIssued !== 0 ||
  fr98.traditionalSemanticAuthority !== false
) throw new Error('FR98 exact neutral metric value authority drift.');

if (
  fr98.metric.lower !== fr96.computation.symmetricLower ||
  fr98.metric.upper !== fr96.computation.symmetricUpper ||
  fr98.metric.pointEstimate !== fr96.computation.symmetricPointEstimate ||
  fr98.metric.absoluteErrorCertificate !== fr96.computation.symmetricAbsoluteErrorCertificate ||
  fr98.metric.conservativeFR91SymmetricBudget !== fr96.computation.conservativeFR91SymmetricBudget
) throw new Error('FR98 recomputed or replaced the issued FR96 certified rational value objects.');

process.stdout.write(`${JSON.stringify({
  status: 'FR98_ROLE_FREE_ARCLENGTH_MEAN_NEUTRAL_METRIC_PASS',
  releaseCommit: RELEASE_COMMIT,
  metricRef: fr98.metric.metricRef,
  sourceFunctionalRef: fr98.metric.sourceFunctionalRef,
  sourceContourRefs: fr98.metric.sourceContourRefs,
  runtimeRecomputationPerformed: fr98.runtimeGeometryRecomputationPerformed,
  neutralMetricDefinitionRefsConsumed: fr98.neutralMetricDefinitionRefsConsumed,
  neutralMetricDefinitionsIssued: fr98.neutralMetricDefinitionsIssued,
  neutralMetricValuesIssued: fr98.neutralMetricValuesIssued,
  anatomicalRolesIssued: fr98.anatomicalRolesIssued,
  crossContourCorrespondencePairsIssued: fr98.crossContourCorrespondencePairsIssued,
  thicknessMetricIssued: fr98.thicknessMetricIssued,
  morphologyProduced: fr98.morphologyProduced,
  criterionStatesIssued: fr98.criterionStatesIssued,
  claimsIssued: fr98.claimsIssued,
  traditionalSemanticAuthority: fr98.traditionalSemanticAuthority,
})}\n`);
